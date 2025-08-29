import * as trpcNext from "@trpc/server/adapters/next";
import { appRouter } from "@/trpc/routers/_app";
import {createTRPCcontext} from "@/trpc/init";
import {fetchRequestHandler} from "@trpc/server/adapters/fetch";

const handler = (req: Request) => fetchRequestHandler({
    endpoint: "/api/trpc",
    req, 
    router: appRouter,
    createContext: createTRPCcontext
})

export {handler as GET, handler as POST};