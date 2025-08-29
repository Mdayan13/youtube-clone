import { THUBMNAIL_URL } from "@/constant";
import MuxPlayer from "@mux/mux-player-react";

interface PlayerProps {
  thumbnailUrl?: string;
  playbackId?: string;
  autoPlay?: boolean;
  onPlay?: () => void;
}

export const VideoPlayer = ({
  thumbnailUrl,
  playbackId,
  autoPlay,
  onPlay,
}: PlayerProps) => {
  if (!playbackId) return;

  return (
    <MuxPlayer
      playbackId={playbackId}
      onPlay={onPlay}
      playerInitTime={0}
      thumbnailTime={0}
      poster={thumbnailUrl ?? THUBMNAIL_URL}
      accentColor="red"
      className="h-full w-full object-contain"
      autoPlay={autoPlay}
    />
  );
};
