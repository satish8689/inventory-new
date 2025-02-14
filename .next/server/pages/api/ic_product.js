"use strict";(()=>{var e={};e.id=255,e.ids=[255],e.modules={5600:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},6762:(e,t)=>{Object.defineProperty(t,"M",{enumerable:!0,get:function(){return function e(t,r){return r in t?t[r]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,r)):"function"==typeof t&&"default"===r?t:void 0}}})},3982:(e,t,r)=>{r.r(t),r.d(t,{config:()=>c,default:()=>d,routeModule:()=>l});var i={};r.r(i),r.d(i,{default:()=>a});var s=r(9947),o=r(2706),n=r(6762),u=r(935);async function a(e,t){try{if("GET"===e.method){console.log("Fetching ic_products...");let{data:e,error:r}=await u.N.from("ic_products").select("*");if(r)throw r;return t.status(200).json(e)}if("POST"===e.method){let r=e.body,{data:i,error:s}=await u.N.from("ic_products").select("*").eq("title",r.title).maybeSingle();if(s)return t.status(500).json({error:"Error checking existing product"});if(i)return t.status(400).json({error:"Product with this title already exists"});let{data:o,error:n}=await u.N.from("ic_products").insert([r]).select().maybeSingle();if(n)return t.status(500).json({error:"Error inserting product"});return t.status(200).json(o)}if("PUT"===e.method){let{id:r,...i}=await e.body,{data:s,error:o}=await u.N.from("ic_products").update(i).eq("id",r).select().single();if(o)throw o;return t.status(200).json(s)}if("DELETE"===e.method){let{id:r}=e.body;if(!r)return t.status(400).json({error:"Product ID is required"});let{error:i}=await u.N.from("ic_products").delete().eq("id",r);if(i)return t.status(500).json({error:"Error deleting product"});return t.status(200).json({message:"Product deleted successfully"})}return t.status(405).json({error:"Method Not Allowed"})}catch(e){return t.status(400).json({error:e.message})}}let d=(0,n.M)(i,"default"),c=(0,n.M)(i,"config"),l=new s.PagesAPIRouteModule({definition:{kind:o.A.PAGES_API,page:"/api/ic_product",pathname:"/api/ic_product",bundlePath:"",filename:""},userland:i})},935:(e,t,r)=>{r.d(t,{N:()=>i});let i=(0,require("@supabase/supabase-js").createClient)("https://pdcerdfslaoixybnoaag.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBkY2VyZGZzbGFvaXh5Ym5vYWFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkzNTc0MTEsImV4cCI6MjA1NDkzMzQxMX0.QcLF4w-s98DAlELmx9uCN3PDO5fAH0f1xDJKDq89cP4")},2706:(e,t)=>{Object.defineProperty(t,"A",{enumerable:!0,get:function(){return r}});var r=function(e){return e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE",e.IMAGE="IMAGE",e}({})},9947:(e,t,r)=>{e.exports=r(5600)}};var t=require("../../webpack-api-runtime.js");t.C(e);var r=t(t.s=3982);module.exports=r})();