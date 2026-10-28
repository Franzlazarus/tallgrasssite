import {getDb} from "../../../db";
import {gigSubscribers} from "../../../db/schema";
import {eq} from "drizzle-orm";
import {sameOrigin} from "../../../lib/admin";
import {readJson} from "../../../lib/http";
export async function POST(request:Request){if(!sameOrigin(request))return Response.json({error:"Geen toegang."},{status:403});let b;try{b=await readJson(request,1000);}catch{return Response.json({error:"Ongeldige link."},{status:400});}if(typeof b.token!=="string"||!b.token.match(/^[a-f0-9-]{72}$/))return Response.json({error:"Ongeldige link."},{status:400});await getDb().update(gigSubscribers).set({unsubscribedAt:new Date().toISOString()}).where(eq(gigSubscribers.unsubscribeToken,b.token));return Response.json({ok:true},{headers:{"Cache-Control":"no-store"}});}
