import { initTRPC } from "@trpc/server";
import { cache } from "react";

export const createTRPCcontext = cache(async () => {});
const t = initTRPC.create();

export const router = t.router;
export const procedure = t.procedure;
export const baseProducer = t.createCallerFactory;
