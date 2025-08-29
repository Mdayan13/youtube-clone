import { ResponsiveModal } from "@/components/responsive-modal";
import { UploadDropzone } from "@/lib/uploadthing";
import { trpc } from "@/trpc/client";

interface ThumbnailProps {
  videoID: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ThubmanilModel = ({
  open,
  videoID,
  onOpenChange,
}: ThumbnailProps) => {
  const utils = trpc.useUtils();
  const onUploadComplete = () => {
    utils.studio.getOne.invalidate({ id: videoID });
    utils.studio.getMany.invalidate();
    onOpenChange(false);
  };
  return (
    <ResponsiveModal
      open={open}
      onOpenChange={onOpenChange}
      title="Upload an Thumbnail"
    >
      <UploadDropzone
        onClientUploadComplete={onUploadComplete}
        input={{ videoId: videoID }}
        endpoint="uploadThumbnail"
      />
    </ResponsiveModal>
  );
};
