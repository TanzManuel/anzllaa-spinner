import {redis,requireAdmin,json} from './_lib.js';
async function scan(key){let cur=0,out=[];do{const r=await redis.sscan(key,cur);cur=Number(r[0]);out.push(...(r[1]||[]))}while(cur!==0);return out}
export default async function handler(req,res){if(!requireAdmin(req,res))return;const [available,used,history]=await Promise.all([scan('spin:available'),scan('spin:used'),redis.lrange('spin:history',0,199)]);json(res,200,{ok:true,available,used,history:history.map(x=>{try{return JSON.parse(x)}catch{return null}}).filter(Boolean)})}
