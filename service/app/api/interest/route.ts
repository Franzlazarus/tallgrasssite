import {getDb} from "../../../db";
import {interests} from "../../../db/schema";
import {z} from "zod";
import {readSettings} from "../../../lib/settings";
import {response,preflight,allowedOrigin,readJson} from "../../../lib/http";
const quantity=z.coerce.number().int().min(1).max(10);
const schema=z.object({name:z.string().trim().min(1).max(100),email:z.string().trim().email().max(254),ep:z.boolean(),shirt:z.boolean(),epQuantity:quantity.optional(),epBudget:z.string().optional(),shirtQuantity:quantity.optional(),shirtBudget:z.string().optional(),shirtSize:z.string().max(240).optional(),notes:z.string().trim().max(500).optional(),nl:z.literal("yes"),website:z.string().max(1000).optional(),answers:z.record(z.string().max(1000)).optional()});
export const OPTIONS=preflight;
export async function POST(request:Request){
 if(!allowedOrigin(request))return response(request,{error:"Ververs de pagina en probeer opnieuw."},403);
 let input;try{input=await readJson(request);}catch{return response(request,{error:"Ongeldig formulier."},400);}
 const parsed=schema.safeParse(input);if(!parsed.success)return response(request,{error:"Controleer je naam, e-mailadres en productkeuzes."},400);const v=parsed.data;if(v.website)return response(request,{ok:true});
 try{const {config:c}=await readSettings();
 const budgetValid=(s:string|undefined,prices:number[])=>s==="unknown"||!!s&&prices.includes(Number(s));
 if((!v.ep&&!v.shirt)||(v.ep&&(!c.epEnabled||!v.epQuantity||(c.epBudgetEnabled&&!budgetValid(v.epBudget,c.epPrices))))||(v.shirt&&(!c.shirtEnabled||!v.shirtQuantity||!v.shirtSize||!c.sizes.includes(v.shirtSize)||(c.shirtBudgetEnabled&&!budgetValid(v.shirtBudget,c.shirtPrices)))))return response(request,{error:"Controleer je productkeuzes. Ververs de pagina als de opties zijn gewijzigd."},400);
 const answers:Record<string,{question:string,answer:string}>={};for(const q of c.extraQuestions){const answer=v.answers?.[q.id]?.trim()||"";if((q.required&&!answer)||(answer&&q.type==="select"&&!q.options.includes(answer)))return response(request,{error:`Controleer: ${q.label}`},400);answers[q.id]={question:q.label,answer};}
 await getDb().insert(interests).values({id:crypto.randomUUID(),createdAt:new Date().toISOString(),name:v.name,email:v.email.toLowerCase(),epQuantity:v.ep?v.epQuantity!:0,epBudget:v.ep&&c.epBudgetEnabled&&v.epBudget!=="unknown"?Number(v.epBudget):null,shirtQuantity:v.shirt?v.shirtQuantity!:0,shirtSize:v.shirt?v.shirtSize:null,shirtBudget:v.shirt&&c.shirtBudgetEnabled&&v.shirtBudget!=="unknown"?Number(v.shirtBudget):null,notes:v.shirt&&c.notesEnabled?v.notes||null:null,answers:JSON.stringify(answers),country:"NL",noticeVersion:"interest-2026-10-28-v2"}).onConflictDoNothing({target:interests.email});return response(request,{ok:true});
 }catch{return response(request,{error:"Opslaan lukt even niet. Je aanmelding is nog niet bevestigd."},503);}
}
