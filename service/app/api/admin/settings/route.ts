import {getAdmin,sameOrigin} from "../../../../lib/admin";
import {readSettings} from "../../../../lib/settings";
import {configSchema} from "../../../../lib/config";
import {getDb} from "../../../../db";
import {siteSettings} from "../../../../db/schema";
import {and,eq} from "drizzle-orm";
import {readJson} from "../../../../lib/http";
const reply=(body:unknown,status=200)=>Response.json(body,{status,headers:{"Cache-Control":"no-store"}});
export async function GET(){if(!await getAdmin())return reply({error:"Geen toegang."},403);return reply(await readSettings());}
export async function POST(request:Request){const user=await getAdmin();if(!user||!sameOrigin(request))return reply({error:"Geen toegang."},403);let body;try{body=await readJson(request,32000);}catch{return reply({error:"Ongeldige instellingen."},400);}const parsed=configSchema.safeParse(body.config);if(!parsed.success)return reply({error:parsed.error.issues[0]?.message||"Controleer de instellingen."},400);if(!Number.isInteger(body.revision)||body.revision<0)return reply({error:"Ongeldige versie."},400);const current=await readSettings();if(body.revision!==current.revision)return reply({error:"De site is intussen gewijzigd. Laad de opgeslagen versie opnieuw."},409);const next={json:JSON.stringify(parsed.data),previousJson:JSON.stringify(current.config),revision:current.revision+1,updatedAt:new Date().toISOString(),updatedBy:user.userId};const db=getDb();const result=current.revision===0?await db.insert(siteSettings).values({id:1,...next}).onConflictDoNothing().returning({id:siteSettings.id}):await db.update(siteSettings).set(next).where(and(eq(siteSettings.id,1),eq(siteSettings.revision,current.revision))).returning({id:siteSettings.id});if(!result.length)return reply({error:"De site is intussen gewijzigd. Laad opnieuw."},409);return reply({config:parsed.data,revision:next.revision,previous:current.config});}
