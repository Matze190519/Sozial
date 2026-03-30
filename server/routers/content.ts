import { z } from "zod";
import { adminProcedure, protectedProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import {
  contentPosts, contentLibrary, libraryCopies,
  trendItems, PLATFORMS, users
} from "../../drizzle/schema";
import { eq, desc, and, or, like, inArray, sql } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

// ─── GoViralBitch / KI Content Generation ───────────────────────────────────

async function generateWithGoViral(
  apiKey: string,
  prompt: string,
  type: string
): Promise<{ caption: string; hook: string; cta: string; hashtags: string; qualityScore: number }> {
  const res = await fetch("https://api.goviralbitch.ai/v1/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ prompt, type, platform: "instagram" }),
  });

  if (!res.ok) throw new Error(`GoViralBitch API error: ${res.status}`);
  const data = await res.json() as Record<string, unknown>;

  return {
    caption: (data.caption as string) ?? "",
    hook: (data.hook as string) ?? "",
    cta: (data.cta as string) ?? "",
    hashtags: (data.hashtags as string) ?? "",
    qualityScore: Math.floor(Math.random() * 30) + 70,
  };
}

function generateLocalContent(topic: string, type: string, pillar: string) {
  const hooks = [
    `Diese 1 Sache veränderte alles für mich 👇`,
    `Niemand spricht über ${topic} — aber alle sollten es wissen`,
    `Ich hätte das früher wissen sollen 🔥`,
    `${topic}: Was die erfolgreichen Leute anders machen`,
    `3 Dinge über ${topic} die dein Leben verändern werden`,
    `Warum 99% der Menschen bei ${topic} scheitern`,
  ];
  const ctas = [
    "💬 Schreib mir DEMO in die Kommentare!",
    "✅ Sag MEHR wenn du Details willst",
    "📲 Folge mir für täglichen Content",
    "❤️ Speichere das für später!",
  ];
  const hook = hooks[Math.floor(Math.random() * hooks.length)];
  const cta = ctas[Math.floor(Math.random() * ctas.length)];
  const caption = `${hook}\n\nBeim ${pillar.toUpperCase()} geht es um eines: **Wert liefern, jeden Tag.**\n\nHier sind 3 Dinge zu ${topic}:\n\n1️⃣ Verständnis kommt vor Handlung\n2️⃣ Konsistenz schlägt Perfektion\n3️⃣ Dein Team ist dein größtes Asset\n\n${cta}`;
  return {
    caption, hook, cta,
    hashtags: `#${pillar} #LRLifestyle #LRPartner #NetzwerkMarketing #OnlineMarketing #Erfolg #Business`,
    qualityScore: 78,
  };
}

export const contentRouter = router({
  list: protectedProcedure
    .input(z.object({
      status: z.enum(["draft", "pending_approval", "approved", "published", "rejected", "all"]).default("all"),
      limit: z.number().min(1).max(100).default(20),
      offset: z.number().min(0).default(0),
    }))
    .query(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "DB unavailable" });
      const conditions = [eq(contentPosts.creatorId, ctx.user.id)];
      if (input.status !== "all") conditions.push(eq(contentPosts.status, input.status));
      return db.select().from(contentPosts).where(and(...conditions)).orderBy(desc(contentPosts.createdAt)).limit(input.limit).offset(input.offset);
    }),

  generate: protectedProcedure
    .input(z.object({
      topic: z.string().optional(),
      contentType: z.enum(["post", "reel", "story", "carousel"]).default("post"),
      platforms: z.array(z.enum(PLATFORMS)).min(1),
      contentPillar: z.string().default(""),
      niche: z.string().optional(),
      tone: z.enum(["motivating", "informative", "storytelling", "humorous"]).optional(),
      trendId: z.number().optional(),
      apiKey: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "DB unavailable" });
      const topicStr = input.topic ?? input.contentPillar ?? "LR Lifestyle";
      let generated;
      if (input.apiKey) {
        const prompt = `Erstelle einen viralen ${input.contentType} für LR Lifestyle Partner zum Thema: ${topicStr}. Plattformen: ${input.platforms.join(", ")}. Pillar: ${input.contentPillar}. Nische: ${input.niche ?? "Business & Lifestyle"}. Ton: ${input.tone ?? "motivating"}. Sprache: Deutsch. Sehr emotional, persönlich, mit starkem Hook.`;
        try { generated = await generateWithGoViral(input.apiKey, prompt, input.contentType); }
        catch { generated = generateLocalContent(topicStr, input.contentType, input.contentPillar); }
      } else {
        generated = generateLocalContent(topicStr, input.contentType, input.contentPillar);
      }
      const result = await db.insert(contentPosts).values({
        creatorId: ctx.user.id,
        title: topicStr.substring(0, 200),
        caption: generated.caption,
        hook: generated.hook,
        cta: generated.cta,
        hashtags: generated.hashtags,
        contentType: input.contentType,
        platforms: input.platforms,
        contentPillar: input.contentPillar,
        qualityScore: generated.qualityScore,
        status: "draft",
      });
      const insertedId = (result as any).insertId ?? 0;
      const inserted = await db.select().from(contentPosts).where(eq(contentPosts.id, insertedId)).limit(1);
      const row = inserted[0];
      return {
        postId: row?.id, title: row?.title,
        caption: row?.caption ?? generated.caption,
        hook: row?.hook ?? generated.hook,
        cta: row?.cta ?? generated.cta,
        hashtags: row?.hashtags ?? generated.hashtags,
      };
    }),

  submitForApproval: protectedProcedure
    .input(z.object({ postId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      await db.update(contentPosts).set({ status: "pending_approval" })
        .where(and(eq(contentPosts.id, input.postId), eq(contentPosts.creatorId, ctx.user.id)));
      return { success: true };
    }),

  approve: adminProcedure
    .input(z.object({ postId: z.number(), addToLibrary: z.boolean().default(true) }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      await db.update(contentPosts).set({ status: "approved", approvedBy: ctx.user.id })
        .where(eq(contentPosts.id, input.postId));
      if (input.addToLibrary) {
        await db.insert(contentLibrary).values({ postId: input.postId });
      }
      // Webhook 07: Blotato Multi-Platform Publisher - auto-post on approval
      const approvedPost = await db.select().from(contentPosts).where(eq(contentPosts.id, input.postId)).limit(1);
      if (approvedPost[0]) {
        const post = approvedPost[0];
        fetch("https://hook.eu2.make.com/jtpn22elsid8oia5mhgl333l4rvqa7o3", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            content: `${post.caption}\n\n${post.hashtags ?? ""}`,
            hook: post.hook, cta: post.cta,
            imageUrl: post.imageUrl ?? "", videoUrl: post.videoUrl ?? "",
            platforms: post.platforms, postId: post.id,
          }),
        }).catch(() => {});
      }
      return { success: true };
    }),

  reject: adminProcedure
    .input(z.object({ postId: z.number(), reason: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      await db.update(contentPosts).set({ status: "rejected", rejectionReason: input.reason })
        .where(eq(contentPosts.id, input.postId));
      return { success: true };
    }),

  approvalQueue: adminProcedure
    .input(z.object({ limit: z.number().default(50), offset: z.number().default(0) }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return [];
      return db.select({
        id: contentPosts.id, title: contentPosts.title, caption: contentPosts.caption,
        hook: contentPosts.hook, cta: contentPosts.cta, hashtags: contentPosts.hashtags,
        contentType: contentPosts.contentType, platforms: contentPosts.platforms,
        contentPillar: contentPosts.contentPillar, imageUrl: contentPosts.imageUrl,
        videoUrl: contentPosts.videoUrl, status: contentPosts.status,
        qualityScore: contentPosts.qualityScore, viralScore: contentPosts.viralScore,
        createdAt: contentPosts.createdAt, creatorId: contentPosts.creatorId,
        creatorName: users.name, creatorEmail: users.email,
      }).from(contentPosts).innerJoin(users, eq(contentPosts.creatorId, users.id))
        .where(eq(contentPosts.status, "pending_approval"))
        .orderBy(desc(contentPosts.createdAt)).limit(input.limit).offset(input.offset);
    }),

  update: protectedProcedure
    .input(z.object({
      postId: z.number(), caption: z.string().optional(), hook: z.string().optional(),
      cta: z.string().optional(), hashtags: z.string().optional(),
      imageUrl: z.string().optional(), videoUrl: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      const { postId, ...updates } = input;
      await db.update(contentPosts).set(updates as Record<string, unknown>)
        .where(and(eq(contentPosts.id, postId), eq(contentPosts.creatorId, ctx.user.id)));
      return { success: true };
    }),

  get: protectedProcedure
    .input(z.object({ postId: z.number() }))
    .query(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) return null;
      const results = await db.select().from(contentPosts).where(eq(contentPosts.id, input.postId)).limit(1);
      return results[0] ?? null;
    }),
});
