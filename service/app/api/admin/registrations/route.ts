import {getAdmin} from "../../../../lib/admin";
import {getDb} from "../../../../db";
import {interests,gigSubscribers} from "../../../../db/schema";
import {desc} from "drizzle-orm";
export async function GET(){if(!await getAdmin())return Response.json({error:"Geen toegang."},{status:403});const db=getDb();const [merch,gigs]=await Promise.all([db.select().from(interests).orderBy(desc(interests.createdAt)),db.select().from(gigSubscribers).orderBy(desc(gigSubscribers.createdAt))]);return Response.json({merch,gigs},{headers:{"Cache-Control":"no-store"}});}
