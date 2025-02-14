"use strict";(()=>{var e={};e.id=642,e.ids=[642],e.modules={5600:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},6762:(e,t)=>{Object.defineProperty(t,"M",{enumerable:!0,get:function(){return function e(t,r){return r in t?t[r]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,r)):"function"==typeof t&&"default"===r?t:void 0}}})},4277:(e,t,r)=>{r.r(t),r.d(t,{config:()=>p,default:()=>a,routeModule:()=>c});var o={};r.r(o),r.d(o,{default:()=>u});var s=r(9947),i=r(2706),n=r(6762),d=r(935);async function u(e,t){console.log("req.method",e.method);try{if("GET"===e.method){console.log("Fetching shops_products...");let{data:e,error:r}=await d.N.from("shops_products").select("*");if(r)throw r;return t.status(200).json(e)}if("POST"===e.method){let r=e.body,{data:o,error:s}=await d.N.from("shops_products").select("*").eq("shop_id",r.shop_id).eq("product_id",r.product_id).maybeSingle();if(s)return t.status(500).json({error:"Error checking existing shop product"});if(o)return t.status(400).json({error:"Shop product with this shop_id and product_id already exists"});let{data:i,error:n}=await d.N.from("shops_products").insert([{shop_id:r.shop_id,product_id:r.product_id,price:r.price,type:r.type,note:r.note,description:r.description,position:r.position,availability:r.availability}]).select().maybeSingle();if(n)return t.status(500).json({error:"Error inserting shop product"});return t.status(200).json(i)}if("PUT"===e.method){let{id:r,...o}=e.body,{data:s,error:i}=await d.N.from("shops_products").update(o).eq("id",r).select().single();if(i)throw i;return t.status(200).json(s)}if("DELETE"===e.method){let{id:r}=e.body;if(!r)return t.status(400).json({error:"Shop product ID is required"});let{error:o}=await d.N.from("shops_products").delete().eq("id",r);if(o)return t.status(500).json({error:"Error deleting shop product"});return t.status(200).json({message:"Shop product deleted successfully"})}return t.status(405).json({error:"Method Not Allowed"})}catch(e){return t.status(400).json({error:e.message})}}let a=(0,n.M)(o,"default"),p=(0,n.M)(o,"config"),c=new s.PagesAPIRouteModule({definition:{kind:i.A.PAGES_API,page:"/api/shop_products",pathname:"/api/shop_products",bundlePath:"",filename:""},userland:o})},935:(e,t,r)=>{r.d(t,{N:()=>o});let o=(0,require("@supabase/supabase-js").createClient)("https://pdcerdfslaoixybnoaag.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBkY2VyZGZzbGFvaXh5Ym5vYWFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkzNTc0MTEsImV4cCI6MjA1NDkzMzQxMX0.QcLF4w-s98DAlELmx9uCN3PDO5fAH0f1xDJKDq89cP4")},2706:(e,t)=>{Object.defineProperty(t,"A",{enumerable:!0,get:function(){return r}});var r=function(e){return e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE",e.IMAGE="IMAGE",e}({})},9947:(e,t,r)=>{e.exports=r(5600)}};var t=require("../../webpack-api-runtime.js");t.C(e);var r=t(t.s=4277);module.exports=r})();