import { z } from "zod";
import { adminProcedure, protectedProcedure, publicProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { trendFeeds, trendItems } from "../../drizzle/schema";
import { eq, desc, and, sql, or, gte } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

// ─── RSS Parser ───────────────────────────────────────────────────────────────

async function fetchRssFeed(url: string): Promise<Array<{
  title: string; description: string; link: string; pubDate: string;
}>> {
  const res = await fetch(url, {
    headers: { "User-Agent": "LR-Content-Hub/1.0 RSS-Reader" }
  });
  if (!res.ok) throw new Error(`RSS fetch error: ${res.status}`);
  const text = await res.text();

  const items: Array<{ title: string; description: string; link: string; pubDate: string }> = [];
  const itemMatches = text.matchAll(/<item>([\s\S]*?)<\/item>/gi);

  for (const match of itemMatches) {
    const item = match[1];
    const getTag = (tag: string) => {
      const m = item.match(new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\/${tag}>`, 'i'))
        ?? item.match(new RegExp(`<${tag}[^>]*>([^<]*)<\/${tag}>`, 'i'));
      return m ? m[1].trim() : "";
    };

    items.push({
      title: getTag("title"),
      description: getTag("description").substring(0, 500),
      link: getTag("link"),
      pubDate: getTag("pubDate"),
    });

    if (items.length >= 20) break;
  }

  return items;
}

// ─── Google Trends (via public API alternative) ───────────────────────────────

async function fetchGoogleTrends(keywords: string[]): Promise<Array<{
  title: string; traffic: string; imageUrl?: string;
}>> {
  const res = await fetch(
    `https://trends.google.com/trends/hottrends/atom/feed?pn=p23&hl=de`,
    { headers: { "User-Agent": "Mozilla/5.0" } }
  );
  if (!res.ok) return [];
  const text = await res.text();
  const items: Array<{ title: string; traffic: string }> = [];
  const matches = text.matchAll(/<ht:approx_traffic>([^<]*)<\/ht:approx_traffic>[\s\S]*?<title>([^<]*)<\/title>/gi);
  for (const match of matches) {
    items.push({ traffic: match[1], title: match[2] });
    if (items.length >= 10) break;
  }
  return items;
}

// ─── AI Score viral potential ─────────────────────────────────────────────────

function scoreViralPotential(title: string, description: string): number {
  let score = 50;
  const viralWords = ['geheimnis', 'viral', 'niemand', 'endlich', 'krass', 'wahnsinn',
    'luxus', 'erfolg', 'freiheit', 'auto', 'milliondär', 'passiv', 'reise', 'strandleben',
    'secret', 'amazing', 'shocking', 'unbelievable', 'this changed', 'nobody talks'];

  const combined = (title + description).toLowerCase();
  viralWords.forEach(w => { if (combined.includes(w)) score += 8; });
  if (title.length > 60) score += 5;
  if (/\d/.test(title)) score += 5;
  if (/\?/.test(title)) score += 8;
  if (/[!🔥💥🚀⚡]/.test(title)) score += 3;

  return Math.min(100, Math.max(10, score));
}

function generateHookFromTitle(title: string): string {
  const patterns = [
    `Das hier verändert alles: ${title}`,
    `Warum ${title} gerade viral geht 🔥`,
    `Diese Trend spielt dir in die Karten: ${title}`,
    `So nutzt du den Trend "${title}" für deinen Content`,
    `${title} — und was das für LR Partner bedeutet`,
  ];
  return patterns[Math.floor(Math.random() * patterns.length)];
}

// ─── ROUTER ──────────────────────────────────────────────────────────────────

export const trendsRouter = router({
  listFeeds: adminProcedure.query(async () => {
    const db = await getDb();
    if (!db) return [];
    return db.select().from(trendFeeds).orderBy(desc(trendFeeds.createdAt));
  }),

  addFeed: adminProcedure
    .input(z.object({
      name: z.string().min(1),
      type: z.enum([
        "rss", "tiktok_trending", "instagram_trending",
        "google_trends", "news_api", "reddit", "youtube_trending",
        "twitter_trending", "manual"
      ]),
      url: z.string().optional(),
      keywords: z.array(z.string()).default([]),
      category: z.string().optional(),
      fetchIntervalMinutes: z.number().default(60),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      await db.insert(trendFeeds).values({
        name: input.name,
        type: input.type,
        url: input.url,
        keywords: input.keywords,
        category: input.category,
        fetchIntervalMinutes: input.fetchIntervalMinutes,
        isActive: true,
      });

      return { success: true };
    }),

  fetchFeed: adminProcedure
    .input(z.object({ feedId: z.number() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      const feeds = await db.select().from(trendFeeds).where(eq(trendFeeds.id, input.feedId)).limit(1);
      if (!feeds[0]) throw new TRPCError({ code: "NOT_FOUND" });

      const feed = feeds[0];
      let fetchedItems: Array<{ title: string; description: string; link?: string; pubDate?: string }> = [];

      if (feed.type === "rss" && feed.url) {
        fetchedItems = await fetchRssFeed(feed.url);
      } else if (feed.type === "google_trends") {
        const trends = await fetchGoogleTrends(feed.keywords as string[]);
        fetchedItems = trends.map(t => ({ title: t.title, description: t.traffic }));
      } else if (feed.type === "manual") {
        return { count: 0, message: "Manueller Feed — bitte Items direkt hinzufügen" };
      }

      let insertedCount = 0;
      for (const item of fetchedItems) {
        if (!item.title) continue;
        const viralScore = scoreViralPotential(item.title, item.description);

        await db.insert(trendItems).values({
          feedId: feed.id,
          title: item.title,
          description: item.description,
          originalUrl: item.link,
          viralPotential: viralScore,
          suggestedHook: generateHookFromTitle(item.title),
          suggestedAngle: `Nutze diesen Trend um LR Produkte/Opportunity zu positionieren`,
          category: feed.category,
          tags: feed.keywords as string[],
          publishedAt: item.pubDate ? new Date(item.pubDate) : undefined,
        }).onDuplicateKeyUpdate?.({ set: {} }).catch(() => {});

        insertedCount++;
      }

      await db.update(trendFeeds)
        .set({ lastFetchedAt: new Date() })
        .where(eq(trendFeeds.id, feed.id));

      return { count: insertedCount, message: `${insertedCount} neue Trends gefunden` };
    }),

  fetchAll: adminProcedure.mutation(async () => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

    const feeds = await db.select().from(trendFeeds).where(eq(trendFeeds.isActive, true));
    let totalFetched = 0;

    for (const feed of feeds) {
      if (feed.type === "rss" && feed.url) {
        const items = await fetchRssFeed(feed.url).catch(() => []);
        for (const item of items) {
          if (!item.title) continue;
          const viralScore = scoreViralPotential(item.title, item.description);
          await db.insert(trendItems).values({
            feedId: feed.id,
            title: item.title,
            description: item.description,
            originalUrl: item.link,
            viralPotential: viralScore,
            suggestedHook: generateHookFromTitle(item.title),
            suggestedAngle: `Nutze diesen Trend für LR Content`,
            category: feed.category,
            tags: feed.keywords as string[],
          }).onDuplicateKeyUpdate?.({ set: {} }).catch(() => {});
          totalFetched++;
        }
        await db.update(trendFeeds).set({ lastFetchedAt: new Date() }).where(eq(trendFeeds.id, feed.id));
      }
    }

    return { totalFetched };
  }),

  listItems: protectedProcedure
    .input(z.object({
      limit: z.number().default(30),
      offset: z.number().default(0),
      category: z.string().optional(),
      onlyUnused: z.boolean().default(false),
      minViralScore: z.number().default(0),
    }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return [];

      const conditions = [];
      if (input.category) conditions.push(eq(trendItems.category, input.category));
      if (input.onlyUnused) conditions.push(eq(trendItems.isUsed, false));

      return db
        .select({
          id: trendItems.id,
          title: trendItems.title,
          description: trendItems.description,
          originalUrl: trendItems.originalUrl,
          viralPotential: trendItems.viralPotential,
          suggestedHook: trendItems.suggestedHook,
          suggestedAngle: trendItems.suggestedAngle,
          tags: trendItems.tags,
          category: trendItems.category,
          isUsed: trendItems.isUsed,
          usedCount: trendItems.usedCount,
          fetchedAt: trendItems.fetchedAt,
          feedName: trendFeeds.name,
          feedType: trendFeeds.type,
        })
        .from(trendItems)
        .innerJoin(trendFeeds, eq(trendItems.feedId, trendFeeds.id))
        .where(conditions.length > 0 ? and(...conditions) : undefined)
        .orderBy(desc(trendItems.viralPotential), desc(trendItems.fetchedAt))
        .limit(input.limit)
        .offset(input.offset);
    }),

  markUsed: protectedProcedure
    .input(z.object({ trendId: z.number() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      await db.update(trendItems)
        .set({
          isUsed: true,
          usedCount: sql`${trendItems.usedCount} + 1`,
        })
        .where(eq(trendItems.id, input.trendId));

      return { success: true };
    }),

  seedDefaultFeeds: adminProcedure.mutation(async () => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

    const defaultFeeds = [
      {
        name: "Google Trends Deutschland",
        type: "google_trends" as const,
        category: "Trending",
        keywords: ["business", "gesundheit", "lifestyle"],
        fetchIntervalMinutes: 60,
      },
      {
        name: "LR International News",
        type: "rss" as const,
        url: "https://www.lr-world.com/de/news/feed/",
        category: "LR Brand",
        keywords: ["LR", "Produkte", "Partner"],
        fetchIntervalMinutes: 120,
      },
      {
        name: "Network Marketing News",
        type: "rss" as const,
        url: "https://www.businessforsale.de/feed",
        category: "Business",
        keywords: ["netzwerk", "marketing", "direktvertrieb"],
        fetchIntervalMinutes: 240,
      },
      {
        name: "Gesundheit & Wellness RSS",
        type: "rss" as const,
        url: "https://www.gesundheit.de/feed",
        category: "Gesundheit",
        keywords: ["gesundheit", "wellness", "ernährung"],
        fetchIntervalMinutes: 120,
      },
      {
        name: "Social Media News",
        type: "rss" as const,
        url: "https://www.socialmediaexaminer.com/feed/",
        category: "Social Media",
        keywords: ["instagram", "tiktok", "viral", "content"],
        fetchIntervalMinutes: 120,
      },
    ];

    for (const feed of defaultFeeds) {
      await db.insert(trendFeeds).values(feed).catch(() => {});
    }

    return { count: defaultFeeds.length };
  }),
});
