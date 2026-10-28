import {getDb} from "../db";
import {siteSettings} from "../db/schema";
import {eq} from "drizzle-orm";
import {configSchema,defaultConfig} from "./config";
export async function readSettings(){const row=await getDb().select().from(siteSettings).where(eq(siteSettings.id,1)).get();return {config:row?configSchema.parse(JSON.parse(row.json)):defaultConfig,revision:row?.revision??0,previous:row?.previousJson?configSchema.parse(JSON.parse(row.previousJson)):null};}
