import { HydrateClient, trpc } from "@/trpc/server";
import { auth } from "@clerk/nextjs/server";
import { Suspense } from "react";
import HomeView from "@/modules/home/ui/view/homeView";
import { ErrorBoundary } from "react-error-boundary";
interface homeProps {
  searchParams: Promise<{
    categoryId?: string;
  }>
}
const page = async ({ searchParams }: homeProps) => {
  const { categoryId } = await searchParams;
  const { userId } = await auth();

  void trpc.categories.getMany.prefetch();

  return (
    <>
      <HydrateClient>
        <HomeView categoryId={categoryId} />
      </HydrateClient>
    </>
  );
};

export default page;
