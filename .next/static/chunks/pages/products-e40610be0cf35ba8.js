(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[268],{939:(t,e,c)=>{(window.__NEXT_P=window.__NEXT_P||[]).push(["/products",function(){return c(19)}])},19:(t,e,c)=>{"use strict";c.r(e),c.d(e,{default:()=>s});var r=c(4848),d=c(4863),i=c.n(d),o=c(6540);function s(){let[t,e]=(0,o.useState)([]),[c,d]=(0,o.useState)({}),[s,a]=(0,o.useState)(""),[l,u]=(0,o.useState)([]);async function n(){let t=await fetch("/api/ic_product"),e=await t.json();e&&e.length>0&&u(e)}async function p(){let t=await fetch("/api/products"),c=await t.json();c&&c.length>0&&e(c)}(0,o.useEffect)(()=>{n(),p()},[]);let _=(t,e)=>{d(c=>({...c,[t]:e}))},h=t.filter(t=>!s||t.title&&t.title.toLowerCase().includes(s.toLowerCase()));return(0,r.jsxs)("div",{className:i().container,children:[(0,r.jsx)("h1",{className:i().title,children:"Select Products"}),(0,r.jsx)("input",{type:"text",placeholder:"Search products...",value:s,onChange:t=>a(t.target.value),className:i().searchBox}),(0,r.jsx)("div",{className:i().productList,children:h.length>0?h.map(t=>{var e,c,d,o,s;return(0,r.jsxs)("div",{className:i().productCard,children:[(null===(e=l.find(e=>e.id===t.product_id))||void 0===e?void 0:e.image_url)&&(0,r.jsx)("img",{src:null===(c=l.find(e=>e.id===t.product_id))||void 0===c?void 0:c.image_url,alt:null===(d=l.find(e=>e.id===t.product_id))||void 0===d?void 0:d.title,className:i().productImage}),(0,r.jsxs)("div",{className:i().productDetails,children:[(0,r.jsxs)("h2",{className:i().productTitle,children:[" ",(null===(o=l.find(e=>e.id===t.product_id))||void 0===o?void 0:o.title)||"N/A"," "]}),(0,r.jsxs)("p",{className:i().productPrice,children:["Price: ",t.price]}),(0,r.jsx)("p",{className:i().productNote,children:t.note}),(0,r.jsx)("label",{children:"Quantity:"}),(0,r.jsxs)("select",{onChange:e=>_(t.id,e.target.value),className:i().quantitySelect,children:[(0,r.jsx)("option",{value:"",children:"Select Quantity"}),null===(s=t.availability)||void 0===s?void 0:s.map((t,e)=>(0,r.jsx)("option",{value:t,children:t},e))]})]})]},t.id)}):(0,r.jsx)("p",{children:"No products available"})}),(0,r.jsx)("button",{onClick:()=>{console.log("Selected Products:",c)},className:i().orderButton,children:"Place Order"})]})}},4863:t=>{t.exports={container:"products_container__Nk86u",title:"products_title__7QTZt",searchBox:"products_searchBox__HSflH",productList:"products_productList__CGdhV",productCard:"products_productCard__p5i2p",productImage:"products_productImage___BNjx",productDetails:"products_productDetails__J84Mt",productTitle:"products_productTitle__YXzfX",productPrice:"products_productPrice__gN0WR",productNote:"products_productNote__Q4NgS",quantitySelect:"products_quantitySelect__jnRM_",orderButton:"products_orderButton__COebp"}}},t=>{var e=e=>t(t.s=e);t.O(0,[636,593,792],()=>e(939)),_N_E=t.O()}]);