import { FormSection } from "../section/form-section";

interface idProps {
  videoId: string;
}

export const VideoView = ({ videoId }: idProps) => {
  return (
    <div className="px-2 text-sm py-2.5 max-w-screen-lg">
      <FormSection videoId={videoId} />
    </div>
  );
};
