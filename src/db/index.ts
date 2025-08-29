import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";


const sql = neon("postgresql://neondb_owner:npg_p2lr3sJRzAnb@ep-curly-sun-adr53459-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require");
export const db = drizzle(sql);
