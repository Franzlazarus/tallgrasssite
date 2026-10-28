import {readSettings} from "../../../lib/settings";
import {response,preflight} from "../../../lib/http";
export async function GET(request:Request){try{const {config}=await readSettings();return response(request,config);}catch{return response(request,{error:"Formulier kon niet geladen worden."},503);}}
export const OPTIONS=preflight;
