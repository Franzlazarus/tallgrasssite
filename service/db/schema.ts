import { sqliteTable,text,integer } from "drizzle-orm/sqlite-core";
export const interests=sqliteTable("interests",{
 id:text("id").primaryKey(),createdAt:text("created_at").notNull(),name:text("name").notNull(),email:text("email").notNull().unique(),
 epQuantity:integer("ep_quantity").notNull().default(0),epBudget:integer("ep_max_eur_incl_shipping"),
 shirtQuantity:integer("shirt_quantity").notNull().default(0),shirtSize:text("shirt_size"),shirtBudget:integer("shirt_max_eur_incl_shipping"),
 notes:text("notes"),answers:text("answers"),country:text("country").notNull().default("NL"),noticeVersion:text("notice_version").notNull()
});

export const siteSettings=sqliteTable("site_settings",{id:integer("id").primaryKey(),json:text("json").notNull(),previousJson:text("previous_json"),revision:integer("revision").notNull(),updatedAt:text("updated_at").notNull(),updatedBy:text("updated_by").notNull()});
export const gigSubscribers=sqliteTable("gig_subscribers",{id:text("id").primaryKey(),email:text("email").notNull().unique(),createdAt:text("created_at").notNull(),consent:text("consent").notNull(),unsubscribeToken:text("unsubscribe_token").notNull().unique(),unsubscribedAt:text("unsubscribed_at")});
