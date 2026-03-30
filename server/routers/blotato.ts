import { z } from "zod";
import { protectedProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import {
  partnerProfiles, platformConnections, postingQueue, contentPosts, PLATFORMS
} from "../../drizzle/schema";
import { eq, and, desc } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

// ─── Blotato API Client ───────────────────────────────────────────────────────

const BLOTATO_BASE = "https://api.blotato.com/v1";

async function blotatoRequest(
  apiKey: string,
  endpoint: string,
  method: "GET" | "POST" | "DELETE" = "GET",
  body?: unknown
) {
  const res = await fetch(`${BLOTATO_BASE}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Blotato API Fehler (${res.status}): ${errText}`,
    });
  }

  return res.json();
}

// ─── PLATFORM NAME MAP ────────────────────────────────────────────────────────

const BLOTATO_PLATFORM_MAP: Record<string, string> = {
  instagram: "Instagram",
  tiktok: "TikTok",
  facebook: "Facebook",
  linkedin: "LinkedIn",
  twitter: "X (Twitter)",
  youtube: "YouTube",
  pinterest: "Pinterest",
  threads: "Threads",
  snapchat: "Snapchat",
};

// ─── ROUTER ──────────────────────────────────────────────────────────────────

export const blotatoRouter = router({
  saveApiKey: protectedProcedure
    .input(z.object({ apiKey: z.string().min(10) }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      try { await blotatoRequest(input.apiKey, "/accounts"); } catch {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Ungültiger Blotato API Key" });
      }
      const existing = await db.select().from(partnerProfiles).where(eq(partnerProfiles.userId, ctx.user.id)).limit(1);
      if (existing.length > 0) {
        await db.update(partnerProfiles).set({ blotatoApiKey: input.apiKey, blotatoEnabled: true }).where(eq(partnerProfiles.userId, ctx.user.id));
      } else {
        await db.insert(partnerProfiles).values({ userId: ctx.user.id, blotatoApiKey: input.apiKey, blotatoEnabled: true });
      }
      return { success: true };
    }),

  removeApiKey: protectedProcedure.mutation(async ({ ctx }) => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    await db.update(partnerProfiles).set({ blotatoApiKey: null, blotatoEnabled: false }).where(eq(partnerProfiles.userId, ctx.user.id));
    return { success: true };
  }),

  getAccounts: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return { accounts: [], platforms: [] };
    const profile = await db.select().from(partnerProfiles).where(eq(partnerProfiles.userId, ctx.user.id)).limit(1);
    if (!profile[0]?.blotatoApiKey) return { accounts: [], platforms: [] };
    try {
      const data = await blotatoRequest(profile[0].blotatoApiKey, "/accounts") as { accounts?: Array<{ id: string; platform: string; name: string }> };
      const accounts = data.accounts ?? [];
      const platforms = accounts.map((acc) => ({
        blotatoAccountId: acc.id,
        platform: Object.keys(BLOTATO_PLATFORM_MAP).find(p => BLOTATO_PLATFORM_MAP[p].toLowerCase() === acc.platform.toLowerCase()) ?? acc.platform.toLowerCase(),
        accountName: acc.name,
      }));
      return { accounts, platforms };
    } catch { return { accounts: [], platforms: [], error: "Konnte Accounts nicht laden" }; }
  }),

  savePlatformConnections: protectedProcedure
    .input(z.object({ connections: z.array(z.object({ platform: z.enum(PLATFORMS), blotatoAccountId: z.string(), accountName: z.string(), isActive: z.boolean().default(true) })) }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      await db.delete(platformConnections).where(eq(platformConnections.userId, ctx.user.id));
      if (input.connections.length > 0) {
        await db.insert(platformConnections).values(input.connections.map(c => ({ userId: ctx.user.id, ...c })));
      }
      return { success: true, count: input.connections.length };
    }),

  getConnections: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return [];
    return db.select().from(platformConnections).where(and(eq(platformConnections.userId, ctx.user.id), eq(platformConnections.isActive, true)));
  }),

  status: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return { hasApiKey: false, platformCount: 0 };
    const profile = await db.select({ hasKey: partnerProfiles.blotatoEnabled }).from(partnerProfiles).where(eq(partnerProfiles.userId, ctx.user.id)).limit(1);
    const platformCount = await db.select().from(platformConnections).where(and(eq(platformConnections.userId, ctx.user.id), eq(platformConnections.isActive, true)));
    return { hasApiKey: profile[0]?.hasKey ?? false, platformCount: platformCount.length, platforms: platformCount.map(p => p.platform) };
  }),
});
