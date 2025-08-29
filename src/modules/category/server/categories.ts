import { categories } from "@/db/schema";
import { baseProducer ,CreateTRPCRouter} from "@/trpc/init";
import { db } from "@/db";

export const categoriesRouter = CreateTRPCRouter({
    getMany: baseProducer.query(async() => {
        const data = await db.select().from(categories);
        return data;
    })
})