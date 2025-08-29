"use client";
import { ResponsiveModal } from "@/components/responsive-modal";
import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc/client";
import { Loader2Icon, PlusIcon } from "lucide-react";
import { toast } from "sonner";
import { MuxStudioUploader } from "./studio-uploader";
import { Router } from "next/router";
import { useRouter } from "next/navigation";

export const StudioUpload = () => {
  const router = useRouter()
  const utils = trpc.useUtils();
  const createVideo = trpc.videos.create.useMutation({
    onSuccess: () => {
      utils.studio.getMany.invalidate();
      toast.success("zvideo ");
    },
    onError: () => {
      toast.error("Something Went wrong");
    },
  });
const onSuccess = () => {
  if(!createVideo.data?.video.id) return 
  createVideo.reset()
  router.push(`/studio/videos/${createVideo.data.video.id}`)
}
  const handleCreateVideo = () => {
    createVideo.mutate();
  };

  return (
    <>
      <ResponsiveModal
        open={!!createVideo.data?.url}
        onOpenChange={() => createVideo.reset()}
        title="Upload the Video"
      >
        {createVideo.data?.url ? (
          <MuxStudioUploader
            endpoint={createVideo.data?.url}
            onSuccess={onSuccess}
          />
        ) : (
          <Loader2Icon />
          
        )}
      </ResponsiveModal>
      <Button
        variant="secondary"
        onClick={handleCreateVideo}
        disabled={createVideo.isPending}
      >
        {createVideo.isPending ? (
          <Loader2Icon className="animate-spin" />
        ) : (
          <PlusIcon className="mr-2 h-4 w-4" />
        )}
        create
      </Button>
    </>
  );
};
