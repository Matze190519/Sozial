import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { contentLibrary, contentPosts, libraryCopies, PLATFORMS } from "../../drizzle/schema";
import { eq, desc, and, sql } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

export const libraryRouter = router({
  listPublic: publicProcedure
    .input(z.object({
      limit: z.number().min(1).max(100).default(50),
      offset: z.number().min(0).default(0),
      category: z.string().optional(),
      isFeatured: z.boolean().optional(),
      isEvergreen: z.boolean().optional(),
    }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return [];
      const conditions = [];
      if (input.category) conditions.push(eq(contentLibrary.category, input.category));
      if (input.isFeatured !== undefined) conditions.push(eq(contentLibrary.isFeatured, input.isFeatured));
      if (input.isEvergreen !== undefined) conditions.push(eq(contentLibrary.isEvergreen, input.isEvergreen));
      return db
        .select({
          libraryId: contentLibrary.id,
          postId: contentLibrary.postId,
          category: contentLibrary.category,
          tags: contentLibrary.tags,
          isFeatured: contentLibrary.isFeatured,
          isEvergreen: contentLibrary.isEvergreen,
          totalCopies: contentLibrary.totalCopies,
          totalPublishes: contentLibrary.totalPublishes,
          addedAt: contentLibrary.addedAt,
          caption: contentPosts.caption,
          hook: contentPosts.hook,
          cta: contentPosts.cta,
          hashtags: contentPosts.hashtags,
          contentType: contentPosts.contentType,
          platforms: contentPosts.platforms,
          contentPillar: contentPosts.contentPillar,
          imageUrl: contentPosts.imageUrl,
          videoUrl: contentPosts.videoUrl,
          qualityScore: contentPosts.qualityScore,
          viralScore: contentPosts.viralScore,
          title: contentPosts.title,
        })
        .from(contentLibrary)
        .innerJoin(contentPosts, eq(contentLibrary.postId, contentPosts.id))
        .where(conditions.length > 0 ? and(...conditions) : undefined)
        .orderBy(desc(contentLibrary.isFeatured), desc(contentLibrary.totalCopies), desc(contentLibrary.addedAt))
        .limit(input.limit)
        .offset(input.offset);
    }),

  recordCopy: protectedProcedure
    .input(z.object({ libraryItemId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      await db.insert(libraryCopies).values({ libraryItemId: input.libraryItemId, userId: ctx.user.id });
      await db.update(contentLibrary).set({ totalCopies: sql`${contentLibrary.totalCopies} + 1` }).where(eq(contentLibrary.id, input.libraryItemId));
      return { success: true };
    }),

  myCopies: protectedProcedure
    .input(z.object({ limit: z.number().default(20), offset: z.number().default(0) }))
    .query(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) return [];
      return db
        .select({ copyId: libraryCopies.id, copiedAt: libraryCopies.copiedAt, caption: contentPosts.caption, hook: contentPosts.hook, hashtags: contentPosts.hashtags, imageUrl: contentPosts.imageUrl })
        .from(libraryCopies)
        .innerJoin(contentLibrary, eq(libraryCopies.libraryItemId, contentLibrary.id))
        .innerJoin(contentPosts, eq(contentLibrary.postId, contentPosts.id))
        .where(eq(libraryCopies.userId, ctx.user.id))
        .orderBy(desc(libraryCopies.copiedAt))
        .limit(input.limit)
        .offset(input.offset);
    }),

  setFeatured: protectedProcedure
    .input(z.object({ libraryItemId: z.number(), featured: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      await db.update(contentLibrary).set({ isFeatured: input.featured }).where(eq(contentLibrary.id, input.libraryItemId));
      return { success: true };
    }),

  setEvergreen: protectedProcedure
    .input(z.object({ libraryItemId: z.number(), evergreen: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      await db.update(contentLibrary).set({ isEvergreen: input.evergreen }).where(eq(contentLibrary.id, input.libraryItemId));
      return { success: true };
    }),

  stats: protectedProcedure.query(async () => {
    const db = await getDb();
    if (!db) return { totalItems: 0, totalCopies: 0, totalPublishes: 0, topItems: [] };
    const [totals] = await db.select({ totalItems: sql<number>`count(*)`, totalCopies: sql<number>`sum(${contentLibrary.totalCopies})`, totalPublishes: sql<number>`sum(${contentLibrary.totalPublishes})` }).from(contentLibrary);
    const topItems = await db.select({ id: contentLibrary.id, totalCopies: contentLibrary.totalCopies, caption: contentPosts.caption, contentType: contentPosts.contentType }).from(contentLibrary).innerJoin(contentPosts, eq(contentLibrary.postId, contentPosts.id)).orderBy(desc(contentLibrary.totalCopies)).limit(5);
    return { ...totals, topItems };
  }),
});
