import express from "express";
import cookieParser from "cookie-parser";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "./routers";
import { createContext } from "./_core/trpc";
import { getDb } from "./db";
import { users, sessions, contentPosts, contentLibrary } from "../drizzle/schema";
import { eq, desc } from "drizzle-orm";
import { COOKIE_NAME, SESSION_EXPIRY_DAYS } from "../shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import path from "path";

const app = express();

app.use(express.json());
app.use(cookieParser());

// ─── Auth endpoints ──────────────────────────────────────────────────────────

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body ?? {};
  if (!email || !password) {
    return res.status(400).json({ message: "E-Mail und Passwort erforderlich" });
  }

  const db = await getDb();
  if (!db) return res.status(503).json({ message: "Datenbank nicht verfügbar" });

  const userRows = await db
    .select()
    .from(users)
    .where(eq(users.email, email.toLowerCase().trim()))
    .limit(1);

  const user = userRows[0];
  if (!user || !user.passwordHash) {
    return res.status(401).json({ message: "Ungültige Anmeldedaten" });
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return res.status(401).json({ message: "Ungültige Anmeldedaten" });
  }

  const token = crypto.randomBytes(48).toString("hex");
  const expiresAt = new Date(Date.now() + SESSION_EXPIRY_DAYS * 24 * 60 * 60 * 1000);

  await db.insert(sessions).values({ userId: user.id, token, expiresAt });

  res.cookie(COOKIE_NAME, token, getSessionCookieOptions(req));
  res.json({ success: true, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
});

app.post("/api/auth/register", async (req, res) => {
  const { name, email, password, inviteCode } = req.body ?? {};

  const INVITE_CODE = process.env.INVITE_CODE;
  if (INVITE_CODE && inviteCode !== INVITE_CODE) {
    return res.status(403).json({ message: "Ungültiger Einladungscode" });
  }

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, E-Mail und Passwort erforderlich" });
  }

  const db = await getDb();
  if (!db) return res.status(503).json({ message: "Datenbank nicht verfügbar" });

  const existing = await db.select({ id: users.id }).from(users).where(eq(users.email, email.toLowerCase().trim())).limit(1);
  if (existing.length > 0) {
    return res.status(409).json({ message: "E-Mail bereits registriert" });
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const result = await db.insert(users).values({
    name: name.trim(),
    email: email.toLowerCase().trim(),
    passwordHash,
    role: "partner",
  });

  const userId = (result as any).insertId ?? 0;
  const token = crypto.randomBytes(48).toString("hex");
  const expiresAt = new Date(Date.now() + SESSION_EXPIRY_DAYS * 24 * 60 * 60 * 1000);

  await db.insert(sessions).values({ userId, token, expiresAt });
  res.cookie(COOKIE_NAME, token, getSessionCookieOptions(req));
  res.json({ success: true });
});

// ─── Lina Public API (kein Auth nötig, für Botpress) ─────────────────────────

app.get("/api/lina/status", async (_req, res) => {
  const db = await getDb();
  if (!db) return res.json({ success: false, message: "DB unavailable" });
  res.json({ success: true, message: "LR Content Hub läuft", version: "2.0", timestamp: new Date().toISOString() });
});

app.get("/api/lina/content", async (req, res) => {
  const db = await getDb();
  if (!db) return res.json({ success: false, count: 0, posts: [] });

  const limit = Math.min(parseInt(String(req.query.limit ?? "1"), 10), 10);

  const posts = await db
    .select()
    .from(contentPosts)
    .where(eq(contentPosts.status, "approved"))
    .orderBy(desc(contentPosts.createdAt))
    .limit(limit);

  res.json({
    success: true,
    count: posts.length,
    posts: posts.map(p => ({
      id: p.id,
      text: p.caption,
      hook: p.hook,
      cta: p.cta,
      hashtags: p.hashtags,
      imageUrl: p.imageUrl ?? "",
      videoUrl: p.videoUrl ?? "",
      topic: p.title,
      contentType: p.contentType,
      platforms: p.platforms,
    })),
  });
});

app.get("/api/lina/library", async (req, res) => {
  const db = await getDb();
  if (!db) return res.json({ success: false, count: 0, posts: [] });

  const limit = Math.min(parseInt(String(req.query.limit ?? "3"), 10), 20);

  const posts = await db
    .select({
      id: contentPosts.id,
      text: contentPosts.caption,
      hook: contentPosts.hook,
      cta: contentPosts.cta,
      hashtags: contentPosts.hashtags,
      imageUrl: contentPosts.imageUrl,
      videoUrl: contentPosts.videoUrl,
      topic: contentPosts.title,
      contentType: contentPosts.contentType,
    })
    .from(contentLibrary)
    .innerJoin(contentPosts, eq(contentLibrary.postId, contentPosts.id))
    .orderBy(desc(contentLibrary.id))
    .limit(limit);

  res.json({ success: true, count: posts.length, posts });
});

app.get("/api/lina/products", async (req, res) => {
  const db = await getDb();
  if (!db) return res.json({ success: false, count: 0, products: [] });

  const limit = Math.min(parseInt(String(req.query.limit ?? "5"), 10), 20);

  const posts = await db
    .select()
    .from(contentPosts)
    .where(eq(contentPosts.contentPillar, "Produkte"))
    .orderBy(desc(contentPosts.createdAt))
    .limit(limit);

  res.json({
    success: true,
    count: posts.length,
    products: posts.map(p => ({
      id: p.id,
      name: p.title,
      description: p.caption,
      imageUrl: p.imageUrl ?? "",
    })),
  });
});

// ─── tRPC ────────────────────────────────────────────────────────────────────

app.use(
  "/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext,
    onError: ({ error }) => {
      if (error.code !== "UNAUTHORIZED" && error.code !== "FORBIDDEN") {
        console.error("[tRPC Error]", error);
      }
    },
  })
);

// ─── Static files (production) ───────────────────────────────────────────────

if (process.env.NODE_ENV === "production") {
  const distPath = path.resolve(__dirname, "../client/dist");
  app.use(express.static(distPath));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

// ─── Start ───────────────────────────────────────────────────────────────────

const PORT = parseInt(process.env.PORT ?? "3001", 10);
app.listen(PORT, () => {
  console.log("\n🚀 LR Content Hub läuft auf Port " + PORT);
  console.log("   Mode: " + (process.env.NODE_ENV ?? "development"));
  console.log("   DB: " + (process.env.DATABASE_URL ? "✓ verbunden" : "✗ nicht konfiguriert") + "\n");
});

export type { AppRouter } from "./routers";
