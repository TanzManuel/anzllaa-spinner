import {redis,json} from './_lib.js';

export default async function handler(req,res){
  const history=await redis.lrange('spin:history',0,199);
  return json(res,200,{count:history.length,history});
}