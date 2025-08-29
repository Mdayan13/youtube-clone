import { DEFAULT_LIMIT } from "@/constant";
import { Studioview } from "@/modules/studio/ui/view/studio-view";
import { HydrateClient, trpc } from "@/trpc/server";
import React from "react";

const studio = () => {
  void trpc.studio.getMany.prefetchInfinite({ limit: DEFAULT_LIMIT });
  return (
    <HydrateClient>
      <Studioview />
    </HydrateClient>
  );
};

export default studio;
