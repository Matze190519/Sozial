import { z } from "zod";
import { protectedProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { contentPosts, partnerProfiles, platformConnections, postingQueue, PLATFORMS } from "../../drizzle/schema";
import { eq, and, inArray } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

const WEEK_DAYS = ["Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag","Sonntag"];
const WEEK_HOOKS = ["Diese 1 Sache veraenderte alles fuer mich","Niemand spricht darueber - aber du solltest es wissen","Was die erfolgreichen Leute anders machen","3 Dinge die dein Leben veraendern werden","Warum 99% der Menschen das falsch machen","Der Fehler der mich Jahre gekostet hat","So generierst du 5k+ im Monat von zu Hause"];
const WEEK_CTAS = ["Schreib mir DEMO in die DMs!","Sag MEHR wenn du Details willst","Folge fuer taeglichen Content","Speichere das fuer spaeter!","Kommentiere STARTE wenn du bereit bist"];
const WEEK_PILLARS_SCHEDULE = [{pillar:"Motivation & Mindset",type:"reel" as const},{pillar:"Produkte vorstellen",type:"post" as const},{pillar:"Business Opportunity",type:"carousel" as const},{pillar:"Lifestyle & Freiheit",type:"reel" as const},{pillar:"Kundenergebnisse",type:"post" as const},{pillar:"Education & Tipps",type:"carousel" as const},{pillar:"Community & Team",type:"story" as const}];

function generateWeekPost(topic: string, pillar: string, type: string, idx: number) {
  const hook = WEEK_HOOKS[idx % WEEK_HOOKS.length];
  const cta = WEEK_CTAS[idx % WEEK_CTAS.length];
  const captions: Record<string,string> = {
    reel: hook+"\n\nIn diesem Reel: "+topic+"\n\nDas ist System, kein Zufall.\n\n"+cta,
    post: hook+"\n\n"+topic+":\n1. Verstehe warum\n2. Starte klein\n3. Bleib konsequent\n\n"+cta,
    carousel: hook+"\n\nSLIDE 1: Problem\nSLIDE 2: Loesung - "+topic+"\nSLIDE 3: Umsetzung\n\n"+cta,
    story: hook+"\n\n"+topic+" - meine Meinung.\n\n"+cta,
  };
  return { hook, cta, caption: captions[type]||captions.post, hashtags:"#LRLifestyle #LRPartner #NetzwerkMarketing #OnlineBusiness #Erfolg #NetworkMarketing", qualityScore: 75+Math.floor(Math.random()*20) };
}

export const weekplanRouter = router({
  generate: protectedProcedure.input(z.object({ topic:z.string().default("LR Lifestyle"), platforms:z.array(z.enum(PLATFORMS)).min(1), startDate:z.string(), postsPerDay:z.number().min(1).max(3).default(1), niche:z.string().default("Business & Erfolg") })).mutation(async({ctx,input})=>{
    const db = await getDb(); if(!db) throw new TRPCError({code:"INTERNAL_SERVER_ERROR"});
    const startDate = new Date(input.startDate);
    const posts: Array<{dayIndex:number;dayName:string;scheduledDate:string;postId:number;title:string;hook:string;caption:string;cta:string;hashtags:string;contentType:string;contentPillar:string;qualityScore:number}> = [];
    for(let day=0;day<7;day++){for(let slot=0;slot<input.postsPerDay;slot++){
      const si=(day*input.postsPerDay+slot)%WEEK_PILLARS_SCHEDULE.length;
      const {pillar,type}=WEEK_PILLARS_SCHEDULE[si];
      const g=generateWeekPost(input.topic,pillar,type,day*input.postsPerDay+slot);
      const sd=new Date(startDate); sd.setDate(startDate.getDate()+day); sd.setHours([9,12,18][slot]??9,0,0,0);
      const r=await db.insert(contentPosts).values({creatorId:ctx.user.id,title:WEEK_DAYS[day]+" - "+pillar,caption:g.caption,hook:g.hook,cta:g.cta,hashtags:g.hashtags,contentType:type,platforms:input.platforms,contentPillar:pillar,qualityScore:g.qualityScore,status:"draft"});
      posts.push({dayIndex:day,dayName:WEEK_DAYS[day],scheduledDate:sd.toISOString(),postId:(r as any).insertId??0,title:WEEK_DAYS[day]+" - "+pillar,hook:g.hook,caption:g.caption,cta:g.cta,hashtags:g.hashtags,contentType:type,contentPillar:pillar,qualityScore:g.qualityScore});
    }}
    return{success:true,totalPosts:posts.length,posts,weekOf:startDate.toISOString()};
  }),
  publishWeek: protectedProcedure.input(z.object({posts:z.array(z.object({postId:z.number(),scheduledDate:z.string(),platforms:z.array(z.enum(PLATFORMS))}))})).mutation(async({ctx,input})=>{
    const db=await getDb(); if(!db) throw new TRPCError({code:"INTERNAL_SERVER_ERROR"});
    const profile=await db.select().from(partnerProfiles).where(eq(partnerProfiles.userId,ctx.user.id)).limit(1);
    if(!profile[0]?.blotatoApiKey) throw new TRPCError({code:"PRECONDITION_FAILED",message:"Kein Blotato API Key."});
    const conns=await db.select().from(platformConnections).where(and(eq(platformConnections.userId,ctx.user.id),eq(platformConnections.isActive,true)));
    const results=[];
    for(const item of input.posts){const post=await db.select().from(contentPosts).where(eq(contentPosts.id,item.postId)).limit(1);if(!post[0])continue;
      for(const platform of item.platforms){const conn=conns.find(c=>c.platform===platform);if(!conn){results.push({postId:item.postId,platform,success:false,error:platform+" nicht verbunden"});continue;}
        try{const res=await fetch("https://api.blotato.com/v1/posts",{method:"POST",headers:{"Content-Type":"application/json","Authorization":"Bearer "+profile[0].blotatoApiKey},body:JSON.stringify({account_id:conn.blotatoAccountId,content:{text:post[0].caption+"\n\n"+(post[0].hashtags??"")},scheduled_at:item.scheduledDate})});
        const data=res.ok?await res.json() as {id:string}:null;
        await db.insert(postingQueue).values({userId:ctx.user.id,postId:item.postId,platform,scheduledFor:new Date(item.scheduledDate),blotatoJobId:data?.id,status:"scheduled"});
        await db.update(contentPosts).set({status:"approved"}).where(eq(contentPosts.id,item.postId));
        results.push({postId:item.postId,platform,success:true});
        }catch(err:unknown){results.push({postId:item.postId,platform,success:false,error:err instanceof Error?err.message:"Fehler"});}
      }
    }
    return{results,scheduled:results.filter(r=>r.success).length,failed:results.filter(r=>!r.success).length};
  }),
  submitWeekForApproval: protectedProcedure.input(z.object({postIds:z.array(z.number())})).mutation(async({ctx,input})=>{
    const db=await getDb(); if(!db) throw new TRPCError({code:"INTERNAL_SERVER_ERROR"});
    await db.update(contentPosts).set({status:"pending_approval"}).where(and(eq(contentPosts.creatorId,ctx.user.id),inArray(contentPosts.id,input.postIds)));
    return{success:true,submitted:input.postIds.length};
  }),
});
