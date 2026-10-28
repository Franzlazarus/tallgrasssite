import {getAdmin} from "../../lib/admin";
import {chatGPTSignInPath} from "../chatgpt-auth";
import Editor from "./editor";
export const dynamic="force-dynamic";
export default async function Admin(){if(!await getAdmin())return <main><h1>Tall Grass beheer</h1><p>Log in met het eigenaarsaccount om de site te bewerken.</p><a href={chatGPTSignInPath('/beheer')} target="_top">Inloggen met ChatGPT</a><p><a href="https://www.tallgrass.band/">Terug naar de website</a></p></main>;return <Editor/>;}
