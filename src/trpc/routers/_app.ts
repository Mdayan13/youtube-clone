import { CreateTRPCRouter } from "../init";
import { categoriesRouter } from "@/modules/category/server/categories";
import { studioRouter } from "@/modules/studio/server/procedure";
import { videoRouter } from "@/modules/videos/server/procedure";
export const appRouter = CreateTRPCRouter({
  studio: studioRouter,
  categories: categoriesRouter,
  videos: videoRouter
});

export type AppRouter = typeof appRouter;
