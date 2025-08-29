import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  const signingSecret = process.env.CLERK_WEBHOOK_SECRET; // ✅ correct env
  console.log("📌 Clerk Webhook Secret loaded?", !!signingSecret);
  if (!signingSecret) {
    return new Response("Error: Clerk signing secret missing", { status: 500 });
  }

  const wh = new Webhook(signingSecret);

  const headersList = await headers();
  const svixId = headersList.get("svix-id");
  const svixTimestamp = headersList.get("svix-timestamp");
  const svixSignature = headersList.get("svix-signature");


  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response("Error: missing svix headers", { status: 400 });
  }

  // ✅ Raw body (not JSON)
  const body = await req.text();

  let evt: WebhookEvent;
  try {
    evt = wh.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as WebhookEvent;
    console.log("✅ Webhook verified:", !!evt.type);
  } catch (error) {
    console.error("❌ Could not verify webhook:", error);
    return new Response("Error verifying webhook", { status: 400 });
  }

  const eventType = evt.type;

  if (eventType === "user.created") {
    console.log("🟢 Handling user.created");
    const { data } = evt;
    await db.insert(users).values({
      clerkId: data.id,
      name: `${data.first_name} ${data.last_name}`,
      imageUrl: data.image_url,
    });
  }

  if (eventType === "user.deleted") {
    console.log("🟠 Handling user.deleted");
    const { data } = evt;
    if (!data.id)
      return new Response("Missing user ID for deletion", { status: 400 });
    await db.delete(users).where(eq(users.clerkId, data.id));
  }

  if (eventType === "user.updated") {
    console.log("🔵 Handling user.updated");
    const { data } = evt;
    await db
      .update(users)
      .set({
        name: `${data.first_name} ${data.last_name}`,
        imageUrl: data.image_url,
      })
      .where(eq(users.clerkId, data.id));
  }

  return new Response("✅ Webhook received", { status: 200 });
}
