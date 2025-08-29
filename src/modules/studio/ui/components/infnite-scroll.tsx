import { Button } from "@/components/ui/button";
import { useInteractionObserver } from "@/hooks/useInteractionObserver";
import { useEffect } from "react";

interface infiniteScrollProps {
  ismanual: boolean;
  hasNextPage: boolean;
  isFetchingNextpage: boolean;
  fetchnextpage: () => void;
}

export const InfiniteScroll = ({
  ismanual = false,
  hasNextPage,
  isFetchingNextpage,
  fetchnextpage,
}: infiniteScrollProps) => {
  const { targeetRef, isInteraction } = useInteractionObserver({
    threshold: 0.1, // Lower threshold for better detection
    rootMargin: "200px", // Increased root margin
  });

  useEffect(() => {
    if (isInteraction && !ismanual && !isFetchingNextpage && hasNextPage) {
      fetchnextpage();
    }
  }, [hasNextPage, isFetchingNextpage, isInteraction, fetchnextpage, ismanual]);

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div
        ref={targeetRef}
        className="h-20 w-full flex items-center justify-center"
      >
        {hasNextPage ? (
          <Button
            variant="secondary"
            disabled={!hasNextPage || isFetchingNextpage}
            onClick={() => fetchnextpage()}
          >
            {isFetchingNextpage ? "Loading..." : "Load More"}
          </Button>
        ) : (
          <p className="text-xs text-muted-foreground">
            You have reached the end of the Finding Function
          </p>
        )}
      </div>
    </div>
  );
};
