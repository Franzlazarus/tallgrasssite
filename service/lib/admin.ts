import {env} from "cloudflare:workers";
import {getChatGPTUser} from "../app/chatgpt-auth";
export async function getAdmin(){const user=await getChatGPTUser();const email=env.ADMIN_EMAIL?.trim().toLowerCase();return user&&email&&user.email.toLowerCase()===email?user:null;}
export function sameOrigin(request:Request){return request.headers.get("origin")===new URL(request.url).origin;}
