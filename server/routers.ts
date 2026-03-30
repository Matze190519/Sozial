import { COOKIE_NAME } from "../shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { contentRouter } from "./routers/content";
import { libraryRouter } from "./routers/library";
import { blotatoRouter } from "./routers/blotato";
import { trendsRouter } from "./routers/trends";
import { partnerRouter } from "./routers/partner";
import { weekplanRouter } from "./routers/weekplan";

export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  // ── Feature Routers ─────────────────────────────────────────────
  content: contentRouter,
  library: libraryRouter,
  blotato: blotatoRouter,
  trends: trendsRouter,
  partner: partnerRouter,
  weekplan: weekplanRouter,
});

export type AppRouter = typeof appRouter;
