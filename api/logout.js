import {json} from './_lib.js';
export default async function handler(req,res){res.setHeader('Set-Cookie','admin_session=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0');json(res,200,{ok:true})}
