import {
  VideoAssetCreatedWebhookEvent,
  VideoAssetErroredWebhookEvent,
  VideoAssetReadyWebhookEvent,
  VideoAssetTrackReadyWebhookEvent,
  VideoAssetDeletedWebhookEvent,
} from "@mux/mux-node/resources/webhooks";
import { headers } from "next/headers";
import { mux } from "@/lib/mux";
import { eq } from "drizzle-orm";
import { videos } from "@/db/schema";
import { db } from "@/db";
import { ApiError } from "next/dist/server/api-utils";
import { UTApi } from "uploadthing/server";
const SIGNING_SECRET = process.env.MUX_SIGNING_SECRET;

type WebhookEvent =
  | VideoAssetCreatedWebhookEvent
  | VideoAssetErroredWebhookEvent
  | VideoAssetReadyWebhookEvent
  | VideoAssetDeletedWebhookEvent
  | VideoAssetTrackReadyWebhookEvent;

export const POST = async (request: Request) => {
  if (!SIGNING_SECRET) {
    throw new Error("mux webHook secret Not Found");
  }

  const headerPayload = await headers();
  const muxSignature = headerPayload.get("mux-signature");

  if (!muxSignature) {
    throw new Error("mmux isgnature not found in error");
  }

  const payload = await request.json();
  const body = JSON.stringify(payload);

  mux.webhooks.verifySignature(
    body,
    {
      "mux-signature": muxSignature,
    },
    SIGNING_SECRET
  );

  switch (payload.type as WebhookEvent["type"]) {
    case "video.asset.created": {
      const data = payload.data as VideoAssetCreatedWebhookEvent["data"];

      if (!data.upload_id) {
        throw new Error("Uploaded video ID not found");
      }

      console.log("Creating VideoVideoVideoVideo:", !!data.upload_id);
      await db
        .update(videos)
        .set({
          muxAssetId: data.id,
          muxStatus: data.status,
        })
        .where(eq(videos.muxUploadId, data.upload_id));
      break;
    }

    case "video.asset.ready": {
      const data = payload.data as VideoAssetReadyWebhookEvent["data"];

      const playbackd = data.playback_ids?.[0].id;
      if (!data.upload_id) {
        throw new Error("videos Upload Id is not present");
      }
      if (!playbackd) {
        throw new Error("Playback Id is MIssing ");
      }
      const tempthumbnailUrl = `https://image.mux.com/${playbackd}/thumbnail.png`;
      const temppreivewUrl = `https://image.mux.com/${playbackd}/animated.gif`;
      const duration = data.duration;
      const utApi = new UTApi();
      const [uploadedThumbNail, uploadedPreview] = await utApi.uploadFilesFromUrl([tempthumbnailUrl, temppreivewUrl]);
      if(!uploadedThumbNail.data || !uploadedPreview.data){
        throw new Error("failed to upload thubnail or Preview ")
      }
      const {key: thumbnailKey, url: thumbnailUrl} =uploadedThumbNail.data 
      const {key: previewKey, url: preivewUrl} = uploadedPreview.data
      await db
        .update(videos)
        .set({
          muxStatus: data.status,
          muxPlaybackId: playbackd,
          thumbnailUrl,
          previewKey, 
          preivewUrl,
          thumbnailKey,
          duration: Math.floor(Number(duration)),
        })
        .where(eq(videos.muxUploadId, data.upload_id));
      break;
    }
    case "video.asset.errored": {
      const data = payload.data as VideoAssetErroredWebhookEvent["data"];

      if (!data.upload_id) {
        throw new Error("videos uplaoad Id not Found");
      }
      await db
        .update(videos)
        .set({
          muxStatus: data.status,
        })
        .where(eq(videos.muxUploadId, data.upload_id));

      break;
    }
    case "video.asset.deleted": {
      const data = payload.data as VideoAssetDeletedWebhookEvent["data"];
      if (!data.upload_id) {
        throw new Error("videos uplaoad Id not Found");
      }
      console.log("Deleting VideoVideoVideoVideo:", !!data.upload_id);
      await db.delete(videos).where(eq(videos.muxUploadId, data.upload_id));

      break;
    }
    case "video.asset.track.ready": {
      const data = payload.data as VideoAssetTrackReadyWebhookEvent["data"] & {
        asset_id: string;
      };
      if (!data.asset_id) {
        throw new Error("No Assert Id Is avaliable");
      }
      const track = data.id;
      const status = data.status;

      await db
        .update(videos)
        .set({
          muxTrackStatus: status,
          muxTrackId: track,
        })
        .where(eq(videos.muxAssetId, data.asset_id));
      break;
    }
  }
  return new Response("WebHook Recieved", { status: 200 });
};
