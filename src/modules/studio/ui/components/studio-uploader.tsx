import { Button } from "@/components/ui/button";
import MuxUploader, {
  MuxUploaderDrop,
  MuxUploaderFileSelect,
  MuxUploaderProgress,
  MuxUploaderStatus,
} from "@mux/mux-uploader-react";
import { UploadIcon } from "lucide-react";

interface StudioUpladerProps {
  endpoint: string | null;
  onSuccess: () => void;
}
const UPLOADER_ID = "video-uploader";
export const MuxStudioUploader = ({
  endpoint,
  onSuccess,
}: StudioUpladerProps) => {
  return (
    <div>
      <MuxUploader
        id={UPLOADER_ID}
        className="hidden group/uploader"
        endpoint={endpoint}
      />
      <MuxUploaderDrop className="group/drop" muxUploader={UPLOADER_ID}>
        <div slot="heading" className="flex flex-col items-center gap-6 ">
          <div className=" h-32 w-32 rounded-full bg-muted flex items-center justify-center">
            <UploadIcon className="size-10 transition-all duration-300" />
          </div>
          <div className="flex flex-col gap-2 text-center">
            <p className="font-medium">Drap and Drop videos To upload</p>
            <p className="font-bold text-xs">
              your videos be Privateduntil you don't publish them{" "}
            </p>
          </div>
          <MuxUploaderFileSelect muxUploader={UPLOADER_ID}>
            <Button className="rounded-full " type="button">
              Select File
            </Button>
          </MuxUploaderFileSelect>
        </div>
        <span slot="separator" className="hidden" />
        <MuxUploaderStatus muxUploader={UPLOADER_ID} className="text-sm" />
        <MuxUploaderProgress
          muxUploader={UPLOADER_ID}
          className="text-sm"
          type="percentage"
        />
        <MuxUploaderProgress muxUploader={UPLOADER_ID} type="bar" />
      </MuxUploaderDrop>
    </div>
  );
};
