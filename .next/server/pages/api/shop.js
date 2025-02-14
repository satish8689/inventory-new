"use strict";(()=>{var e={};e.id=11,e.ids=[11],e.modules={5600:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},6762:(e,t)=>{Object.defineProperty(t,"M",{enumerable:!0,get:function(){return function e(t,r){return r in t?t[r]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,r)):"function"==typeof t&&"default"===r?t:void 0}}})},6632:(e,t,r)=>{r.r(t),r.d(t,{config:()=>l,default:()=>d,routeModule:()=>p});var s={};r.r(s),r.d(s,{default:()=>u});var o=r(9947),n=r(2706),i=r(6762),a=r(935);async function u(e,t){try{if("GET"===e.method){console.log("Fetching shops...");let{data:e,error:r}=await a.N.from("shops").select("*");if(r)throw r;return t.status(200).json(e)}if("POST"===e.method){let r=e.body,{data:s,error:o}=await a.N.from("shops").select("*").eq("name",r.name).maybeSingle();if(o)return t.status(500).json({error:"Error checking existing shop"});if(s)return t.status(400).json({error:"Shop with this name already exists"});let{data:n,error:i}=await a.N.from("shops").insert([r]).select().maybeSingle();if(i)return t.status(500).json({error:"Error inserting shop"});return t.status(200).json(n)}if("PUT"===e.method){let{id:r,...s}=await e.body,{data:o,error:n}=await a.N.from("shops").update(s).eq("id",r).select().single();if(n)throw n;return t.status(200).json(o)}if("DELETE"===e.method){let{id:r}=e.body;if(!r)return t.status(400).json({error:"Shop ID is required"});let{error:s}=await a.N.from("shops").delete().eq("id",r);if(s)return t.status(500).json({error:"Error deleting shop"});return t.status(200).json({message:"Shop deleted successfully"})}return t.status(405).json({error:"Method Not Allowed"})}catch(e){return t.status(400).json({error:e.message})}}let d=(0,i.M)(s,"default"),l=(0,i.M)(s,"config"),p=new o.PagesAPIRouteModule({definition:{kind:n.A.PAGES_API,page:"/api/shop",pathname:"/api/shop",bundlePath:"",filename:""},userland:s})},935:(e,t,r)=>{r.d(t,{N:()=>s});let s=(0,require("@supabase/supabase-js").createClient)("https://pdcerdfslaoixybnoaag.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBkY2VyZGZzbGFvaXh5Ym5vYWFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkzNTc0MTEsImV4cCI6MjA1NDkzMzQxMX0.QcLF4w-s98DAlELmx9uCN3PDO5fAH0f1xDJKDq89cP4")},2706:(e,t)=>{Object.defineProperty(t,"A",{enumerable:!0,get:function(){return r}});var r=function(e){return e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE",e.IMAGE="IMAGE",e}({})},9947:(e,t,r)=>{e.exports=r(5600)}};var t=require("../../webpack-api-runtime.js");t.C(e);var r=t(t.s=6632);module.exports=r})();