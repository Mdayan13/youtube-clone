import { VideoSection } from "../section/videoSection";
export const Studioview = () => {
  return (
    <div className="flex flex-col pt-4 mb-5">
      <div className="px-4">
        <h4 className="font-bold">Channel Content</h4>
        <p>you channel content is nice</p>
      </div>

      <VideoSection />
    </div>
  );
};
