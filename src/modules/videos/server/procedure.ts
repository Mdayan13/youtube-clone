import { db } from "@/db";
import { eq, and } from "drizzle-orm";
import { updateVideo, videos } from "@/db/schema";
import { z } from "zod";
import { mux } from "@/lib/mux";
import { CreateTRPCRouter, protectedProducer } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { CarTaxiFront } from "lucide-react";
import { UTApi } from "uploadthing/server";

export const videoRouter = CreateTRPCRouter({
  restoreThumbnail: protectedProducer
    .input(
      z.object({
        id: z.string().uuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id: userId } = ctx.user;

      const [existingVideo] = await db
        .select()
        .from(videos)
        .where(and(eq(videos.userId, userId), eq(videos.id, input.id)));

      if (!existingVideo) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }
      const utApi = new UTApi();
      if (existingVideo.thumbnailKey) {
        await utApi.deleteFiles(existingVideo.thumbnailKey);
        await db
          .update(videos)
          .set({
            thumbnailUrl: null,
            thumbnailKey: null,
          })
          .where(and(eq(videos.id, input.id), eq(videos.userId, userId)));
      }
      const newThumbNailUrl = `https://image.mux.com/${existingVideo.muxPlaybackId}/thumbnail.png`;
      const [uploadThumbnail] = await utApi.uploadFilesFromUrl([
        newThumbNailUrl,
      ]);
      if (!uploadThumbnail.data) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }
      const { key: thumbnailKey, url: thumbnailUrl } = uploadThumbnail.data;
      const [updatedVideo] = await db
        .update(videos)
        .set({
          thumbnailUrl,
          thumbnailKey,
        })
        .where(and(eq(videos.userId, userId), eq(videos.id, input.id)))
        .returning();
      return updatedVideo;
    }),
  remove: protectedProducer
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      const { id: userId } = ctx.user;

      const [removeVideo] = await db
        .delete(videos)
        .where(and(eq(videos.id, input.id), eq(videos.userId, userId)))
        .returning();
      if (!removeVideo) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }
      return removeVideo;
    }),
  update: protectedProducer
    .input(updateVideo)
    .mutation(async ({ ctx, input }) => {
      const { id: userId } = ctx.user;
      const { id } = input;
      if (!id) {
        throw new Error("Video Id Isn't available");
      }
      const [updatedVideo] = await db
        .update(videos)
        .set({
          title: input.title,
          description: input.description,
          categoryId: input.categoryId,
          visibility: input.visibility,
          updatedAt: new Date(),
        })
        .where(and(eq(videos.id, id), eq(videos.userId, userId)))
        .returning();

      return {
        updatedVideo,
      };
    }),
  create: protectedProducer.mutation(async ({ ctx }) => {
    try {
      const { id: userId } = ctx.user;
      const upload = await mux.video.uploads.create({
        new_asset_settings: {
          passthrough: userId,
          playback_policies: ["public"],
          inputs: [
            {
              generated_subtitles: [
                {
                  language_code: "en",
                  name: "English",
                },
              ],
            },
          ],
        },
        cors_origin: "*",
      });

      const [video] = await db
        .insert(videos)
        .values({
          userId,
          title: "Untitled Video",
          description: "No description provided",
          muxStatus: "waiting",
          muxUploadId: upload.id,
        })
        .returning();

      return {
        video: video,
        url: upload.url,
      };
    } catch (error) {
      console.error("Error creating video:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create video",
        cause: error,
      });
    }
  }),
});
