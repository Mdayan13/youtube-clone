"use client";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { trpc } from "@/trpc/client";
import {
  CopyCheckIcon,
  CopyIcon,
  Edit2Icon,
  EditIcon,
  Globe2Icon,
  LockIcon,
  MoreVerticalIcon,
  RotateCcwIcon,
  SparkleIcon,
  TrashIcon,
} from "lucide-react";
import { Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useForm } from "react-hook-form";
import { updateVideo, videos } from "@/db/schema";
import { THUBMNAIL_URL } from "@/constant";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { VideoPlayer } from "@/modules/videos/ui/components/video-player";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ThubmanilModel } from "../components/thubmnail-upload";
interface porops {
  videoId: string;
}

export const FormSection = ({ videoId }: porops) => {
  return (
    <Suspense fallback={<FormSkeleton />}>
      <ErrorBoundary fallback={<p>error.........</p>}>
        <FormSectionSuspense videoId={videoId} />
      </ErrorBoundary>
    </Suspense>
  );
};

const FormSkeleton = () => {
  return (
    <p className="w-full h-6 ">
      <Skeleton />
    </p>
  );
};
const FormSectionSuspense = ({ videoId }: porops) => {
  const [uploadThumbnail, setUploadThumbnail] = useState(false);
  const utils = trpc.useUtils();
  const [isCopied, setIsCopied] = useState(false);
  const router = useRouter();
  const [video] = trpc.studio.getOne.useSuspenseQuery({ id: videoId });
  console.log("VideoUrlVideoUrlVideoUrl", video.thumbnailUrl)
  const [categories] = trpc.categories.getMany.useSuspenseQuery();
  const originalUrl =
    process.env.VERCEL_URL ?? `${window.location.href}/videos/${videoId}`;
    const restoreThumnail = trpc.videos.restoreThumbnail.useMutation({
      onSuccess: () => {
        utils.studio.getMany.invalidate();
        utils.studio.getOne.invalidate({ id: videoId });
        toast.success("thubnail restored");
      },
      onError: () => {
        toast.error("something went wrong");
      },
    })
  const removed = trpc.videos.remove.useMutation({
    onSuccess: () => {
      utils.studio.getMany.invalidate();
      toast.success("Video Removed");
      router.push("/studio");
    },
    onError: () => {
      toast.error("Failed to delete");
    },
  });
  const update = trpc.videos.update.useMutation({
    onSuccess: () => {
      utils.studio.getMany.invalidate();
      utils.studio.getOne.invalidate({ id: videoId });
      toast.success("Video Udated Successfully");
    },
    onError: () => {
      toast.error("Failed To update video");
    },
  });
  const onCopy = async () => {
    await navigator.clipboard.writeText(originalUrl);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };
  const form = useForm<z.infer<typeof updateVideo>>({
    resolver: zodResolver(updateVideo),
    defaultValues: video,
  });
  const onSubmit = async (data: z.infer<typeof updateVideo>) => {
    update.mutate(data);
  };
  return (
    <>
      <ThubmanilModel
        open={uploadThumbnail}
        onOpenChange={setUploadThumbnail}
        videoID={video.id}
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex justify-between mb-5 items-center">
            <div className="">
              <h1 className="text-2xl font-bold">Video Detalis</h1>
              <p className="text-xs text-muted-foreground ">
                Manage yoour details here
              </p>
            </div>
            <div className="flex items-center gap-x-2">
              <Button type="submit" disabled={update.isPending}>
                Save
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVerticalIcon />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={() => removed.mutate({ id: videoId })}
                  >
                    <TrashIcon className="size-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-y-3">
            <div className="space-y-8  lg:col-span-3">
              <FormField
                name="title"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="add a title to your video"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="description"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>descrition</FormLabel>
                    <FormControl>
                      <Textarea
                        className="px-3 resize-none min-h-[120px]"
                        {...field}
                        value={field.value ?? ""}
                        placeholder="add a description  to your video"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="thumbnailUrl"
                control={form.control}
                render={() => (
                  <FormItem>
                    <FormLabel>Thumbnail</FormLabel>
                    <FormControl>
                      <div className="h-[90px] w-[169px] border group relative border-dashed p-1 ">
                        <Image
                          fill
                          
                          className="object-cover"
                          alt="thubnail"
                          src={video.thumbnailUrl || THUBMNAIL_URL}
                        />
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              type="button"
                              className="bg-black/50 top-1 right-1 absolute opacity-100 md:opacity-0 hover:opacity-100 hover:bg-black/80 duration-300 size-5 "
                            >
                              <MoreVerticalIcon className="text-white" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="start" side="right">
                            <DropdownMenuItem onClick={() => setUploadThumbnail(true)}>
                              <Edit2Icon className="size-4 mr-1" />
                              Change
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <SparkleIcon className="size-4 mr-1" />
                              Ai Generated
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => restoreThumnail.mutate({id: videoId})}>
                              <RotateCcwIcon  className="size-4 mr-1" />
                              Restore
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
              {/* add thubnail field here  */}
              <FormField
                name="categoryId"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value ?? undefined}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="select a vlaue" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-y-6 lg:col-span-2">
              <div className="flex flex-col gap-4 bg-white shadow-sm rounded-xl relative overflow-hidden p-4 border border-slate-200">
                {/* Video Player */}
                <div className="aspect-video overflow-hidden rounded-lg">
                  <VideoPlayer
                    thumbnailUrl={video.thumbnailUrl ?? ""}
                    playbackId={video.muxPlaybackId ?? ""}
                  />
                </div>

                {/* Video Link Section */}
                <div className="flex flex-col gap-y-2">
                  <p className="font-semibold text-sm text-gray-700">
                    🎬 Video Link
                  </p>
                  <div className="flex items-center justify-between gap-2 bg-slate-50 rounded-md px-2 py-1">
                    <Link
                      href={originalUrl}
                      className="truncate text-blue-600 underline flex-1 text-sm"
                    >
                      {originalUrl}
                    </Link>
                    <Button
                      onClick={onCopy}
                      type="button"
                      variant="ghost"
                      disabled={isCopied}
                      className="shrink-0"
                    >
                      {isCopied ? (
                        <CopyCheckIcon className="w-4 h-4" />
                      ) : (
                        <CopyIcon className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Status Section */}
                <div className="grid grid-cols-2 gap-3">
                  {/* Video Status */}
                  <div className="flex flex-col gap-1 bg-slate-50 rounded-md px-3 py-2">
                    <p className="flex items-center gap-1 font-medium text-xs text-gray-600">
                      ▶ Video Status
                    </p>
                    <span className="text-sm font-semibold text-gray-800">
                      {video.muxStatus}
                    </span>
                  </div>

                  {/* Subtitle Status */}
                  <div className="flex flex-col gap-1 bg-slate-50 rounded-md px-3 py-2">
                    <p className="flex items-center gap-1 font-medium text-xs text-gray-600">
                      📝 Subtitle Status
                    </p>
                    <span className="text-sm font-semibold text-gray-800">
                      {video.muxTrackStatus}
                    </span>
                  </div>
                </div>
              </div>
              <FormField
                name="visibility"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value ?? undefined}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="select a vlaue" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="public">
                          <div className="flex items-center">
                            <Globe2Icon className="size-4 mr-2" />
                            Public
                          </div>
                        </SelectItem>
                        <SelectItem value="private">
                          <div className="flex items-center">
                            <LockIcon className="size-4 mr-2" />
                            Private
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};
