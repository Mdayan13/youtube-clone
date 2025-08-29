"use client";
import { DEFAULT_LIMIT } from "@/constant";
import { trpc } from "@/trpc/client";
import { format } from "date-fns";
import { InfiniteScroll } from "../components/infnite-scroll";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { VideoThumbnail } from "@/components/videoThubmnail";
import { snakeToTitle } from "@/lib/utils";
import { Globe2Icon, LockIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
export const VideoSection = () => {
  return (
    <Suspense fallback={<VideoSectionSkeleton />}>
      <ErrorBoundary fallback={<p>Error........</p>}>
        <VideoSectionSuspence />
      </ErrorBoundary>
    </Suspense>
  );
};

const VideoSectionSkeleton = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="font-medium pi-6 w-[510px]">Video</TableHead>
          <TableHead>Visibility</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Data</TableHead>
          <TableHead className="text-right ">Views</TableHead>
          <TableHead className="text-right ">Comments</TableHead>
          <TableHead className="text-right pr-3">Likes</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 5 }).map((_, index) => (
          <TableRow key={index}>
            <TableCell className="pl-6">
              <div className="flex items-center gap-4 ">
                <Skeleton className="aspect-video  h-20" />
                <div className="flex flex-col gap-2 ">
                  <Skeleton className="h-4 w-[100px]" />
                  <Skeleton className="h-4 w-[100px]" />
                </div>
              </div>
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-20" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-16" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-24" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-12" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-12" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-12" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
const VideoSectionSuspence = () => {
  const [videos, query] = trpc.studio.getMany.useSuspenseInfiniteQuery(
    {
      limit: DEFAULT_LIMIT,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );
  return (
    <div>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-medium pi-6 w-[510px]">
                Video
              </TableHead>
              <TableHead>Visibility</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Data</TableHead>
              <TableHead className="text-right ">Views</TableHead>
              <TableHead className="text-right ">Comments</TableHead>
              <TableHead className="text-right pr-3">Likes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {videos.pages
              .flatMap((page) => page.items)
              .map((video) => (
                <Link
                  key={video.id}
                  className="cursor-pointer"
                  legacyBehavior
                  href={`/studio/videos/${video.id}`}
                >
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center gap-4 ">
                        <div className="relative aspect-video w-40 shrink-0">
                          <VideoThumbnail
                            title={video.title}
                            duration={video.duration ?? 0}
                            imageUrl={video.thumbnailUrl}
                            previewUrl={video.preivewUrl}
                          />
                        </div>
                        <div className="flex flex-col overflow-hidden ml-3 gap-y-2">
                          <p className="font-medium text-sm line-clamp-1">
                            {video.title}
                          </p>
                          <p className="text-xs line-clamp-1 text-muted-foreground">
                            {video.description || "No description"}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {video.visibility === "private" ? (
                          <LockIcon className="size-4 mr-2" />
                        ) : (
                          <Globe2Icon className="size-4 mr-2" />
                        )}
                        {snakeToTitle(video.visibility)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex text-sm font-normal">
                        {snakeToTitle(video.muxStatus || "Failed")}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-start truncate text-sm font-medium">
                        {format(new Date(video.createdAt), "dd mm yyyy")}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="truncate flex justify-start text-sm ">
                        View
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="truncate flex justify-start text-sm ">
                        Comments
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="truncate flex justify-start text-sm ">
                        Likes
                      </div>
                    </TableCell>
                  </TableRow>
                </Link>
              ))}
          </TableBody>
        </Table>
      </div>

      <InfiniteScroll
        hasNextPage={query.hasNextPage}
        fetchnextpage={query.fetchNextPage}
        isFetchingNextpage={query.isFetchingNextPage}
        ismanual
      />
    </div>
  );
};
