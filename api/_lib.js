import crypto from 'node:crypto';
import { Redis } from '@upstash/redis';
export const redis=Redis.fromEnv();
export const defaultPrizes=[{name:'Rp10.000',weight:25},{name:'Rp20.000',weight:18},{name:'Rp50.000',weight:10},{name:'Voucher',weight:15},{name:'Pulsa 10K',weight:15},{name:'Coba Lagi',weight:10},{name:'Rp100.000',weight:5},{name:'Hadiah Spesial',weight:2}];
export async function getPrizes(){const saved=await redis.get('spin:prizes');return Array.isArray(saved)&&saved.length?saved:defaultPrizes}
export function json(res,status,data){res.status(status).setHeader('Content-Type','application/json; charset=utf-8').json(data)}
function b64(s){return Buffer.from(s).toString('base64url')}
export function makeToken(){const body=b64(JSON.stringify({exp:Date.now()+43200000,n:crypto.randomBytes(8).toString('hex')}));const sig=crypto.createHmac('sha256',process.env.SESSION_SECRET||'change-me').update(body).digest('base64url');return body+'.'+sig}
export function verifyToken(t){try{const [b,s]=String(t||'').split('.');const e=crypto.createHmac('sha256',process.env.SESSION_SECRET||'change-me').update(b).digest('base64url');return !!b&&!!s&&crypto.timingSafeEqual(Buffer.from(s),Buffer.from(e))&&JSON.parse(Buffer.from(b,'base64url')).exp>Date.now()}catch{return false}}
export function requireAdmin(req,res){const m=String(req.headers.cookie||'').match(/(?:^|;\s*)admin_session=([^;]+)/);if(!verifyToken(m?.[1])){json(res,401,{ok:false,error:'Belum login sebagai admin.'});return false}return true}
export function pickPrize(list){let total=list.reduce((a,p)=>a+Number(p.weight),0),r=Math.random()*total;for(let i=0;i<list.length;i++){r-=Number(list[i].weight);if(r<0)return i}return list.length-1}
export function randomCode(){const c='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';let s='SPIN-';for(let i=0;i<8;i++)s+=c[Math.floor(Math.random()*c.length)];return s}