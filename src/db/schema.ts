import {
  uuid,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  integer,
  pgEnum,
} from "drizzle-orm/pg-core";
import { Relation, relations } from "drizzle-orm";
import {createInsertSchema, createUpdateSchema, createSelectSchema}from "drizzle-zod"
export const users = pgTable(
  "user",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    clerkId: text("clerk_id").unique().notNull(),
    name: text("name").notNull(),
    imageUrl: text("image_url").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (t) => [uniqueIndex("clerk_id_idx").on(t.clerkId)]
);

export const userRelation = relations(users, ({ many }) => ({
  videos: many(videos),
}));

export const categories = pgTable("categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull().unique(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const categoryRelation = relations(categories, ({ many }) => ({
  videos: many(videos),
}));
export const  videoVisibility = pgEnum("visibility",["public", "private"])
export const videos = pgTable("videos", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description"),
  muxStatus: text("mux_status"),
  muxAssetId: text("mux_asset_id").unique(),
  muxUploadId: text("mux_upload_id").unique(),
  muxPlaybackId: text("mux_playback_id").unique(),
  muxTrackId:text("mux_track_id").unique(),
  muxTrackStatus: text("mux_track_status"),
  thumbnailUrl : text("thumbnail_url"),
  thumbnailKey: text("thumbnail_key"), 
  preivewUrl: text("preview_url"),
  previewKey: text("preview_key"),
  duration: integer("duration"),
  visibility: videoVisibility("visibility").default("private").notNull(),
  userId: uuid("user_id").references(() => users.id, {
    onDelete: "cascade",  
  }),
  categoryId: uuid("category_id").references(() => categories.id, {
    onDelete: "set null",
  }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const updateVideo = createUpdateSchema(videos)
export const insertVideo = createInsertSchema(videos)
export const selectVideo = createSelectSchema(videos)
export const videoRelation = relations(videos, ({ one }) => ({
  user: one(users, {
    fields: [videos.userId],
    references: [users.id],
  }),
  category: one(categories, {
    fields: [videos.categoryId],
    references: [categories.id],
  }),
}));
