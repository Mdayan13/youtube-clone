import { db } from "@/db";
import { auth } from "@clerk/nextjs/server";
import { users } from "@/db/schema";
import { initTRPC, TRPCError } from "@trpc/server";
import { cache } from "react";
import superjson from "superjson";
import { eq } from "drizzle-orm";
import { ratelimit } from "@/lib/ratelimit";

export const createTRPCcontext = cache(async () => {
  const { userId } = await auth();

  return { clerkUserId: userId };
});

export type Context = Awaited<ReturnType<typeof createTRPCcontext>>;

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

export const CreateTRPCRouter = t.router;
export const baseProducer = t.procedure;
export const publicProcedure = t.procedure;
export const createCallerFactory = t.createCallerFactory;

export const protectedProducer = t.procedure.use(async function isAuth(opts) {
  const { ctx } = opts;

  // 🔍 Debug log for context
  console.log("[protectedProducer] Context:", !!ctx);

  if (!ctx.clerkUserId) {
    console.warn("[protectedProducer] No Clerk userId found → UNAUTHORIZED");
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  // 🔍 DB lookup log
  console.log(
    `[protectedProducer] Looking up user in DB with clerkId=${!!ctx.clerkUserId}`
  );

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.clerkId, ctx.clerkUserId))
    .limit(1);

  console.log("[protectedProducer] DB user result:", !!user);

  if (!user) {
    console.warn(
      `[protectedProducer] No matching user in DB for clerkId=${ctx.clerkUserId} → UNAUTHORIZED`
    );
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  const { success } = await ratelimit.limit(user.id);
  if (!success) {
    throw new TRPCError({ code: "TOO_MANY_REQUESTS" });
  }

  console.log("[protectedProducer] User authenticated:", !!user);

  return opts.next({
    ctx: {
      ...ctx,
      user,
    },
  });
});
