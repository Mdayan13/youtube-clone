import { THUBMNAIL_URL } from "@/constant";
import { formatDuration } from "@/lib/utils";
import Image from "next/image";

interface Props {
  imageUrl: string | null;
  previewUrl: string | null;
  duration: number;
  title: string;
}

export const VideoThumbnail = ({
  title,
  imageUrl,
  previewUrl,
  duration,
}: Props) => {
  return (
    <div className="relative group">
      <div className="relative aspect-video w-full overflow-hidden rounded-xl">
        <Image
          src={imageUrl ?? THUBMNAIL_URL } // ✅ fallback to local
          fill
          alt={title}
          className="object-cover group-hover:opacity-0 "
        />
        <Image
          src={previewUrl ??THUBMNAIL_URL} // ✅ fallback to local
          fill
          unoptimized
          alt={title}
          className="object-cover opacity-0 group-hover:opacity-100"
        />
      </div>
      <div className="absolute bottom-2 right-2 px-1 py-0.5 rounded  bg-black/80 text-white text-sm font-medium">
        {formatDuration(duration)}
      </div>
    </div>
  );
};
