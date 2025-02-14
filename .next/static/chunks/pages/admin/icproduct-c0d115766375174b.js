(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[13],{1507:(e,t,r)=>{(window.__NEXT_P=window.__NEXT_P||[]).push(["/admin/icproduct",function(){return r(266)}])},266:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>u});var i=r(4848),n=r(6373),a=r.n(n),o=r(6540),l=r(7037),c=r(1301),s=r.n(c);function u(){let[e,t]=(0,o.useState)([]),[r,n]=(0,o.useState)({title:"",image_url:""}),[c,u]=(0,o.useState)(""),[d,h]=(0,o.useState)(null);async function p(){let e=await fetch("/api/ic_product"),r=await e.json();r&&r.length>0&&t(r)}(0,o.useEffect)(()=>{p()},[]);let g=async e=>{e.preventDefault(),r.id=d||"";let t=await fetch("/api/ic_product",{method:d?"PUT":"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)});t.ok?(p(),n({title:"",image_url:""}),h(null)):400==t.status&&u("Product already exists")},f=e=>{n(e),h(e.id)},m=async r=>{(await fetch("/api/ic_product",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:r})})).ok&&t(e.filter(e=>e.id!==r))};return(0,i.jsxs)("div",{className:a().container,children:[(0,i.jsx)("h1",{className:a().title,children:"Manage Shop Products"}),(0,i.jsxs)("p",{className:a().error,children:[" ",c," "]}),(0,i.jsxs)("form",{onSubmit:g,className:a().form,children:[r.image_url&&(0,i.jsx)("img",{src:r.image_url,alt:"Preview",className:a().previewImage}),(0,i.jsx)("input",{type:"file",accept:"image/*",onChange:e=>{let t=e.target.files[0];t&&s().imageFileResizer(t,150,150,"JPEG",100,0,e=>{n({...r,image_url:e})},"base64")}}),(0,i.jsx)("input",{name:"title",placeholder:"Title",value:r.title,onChange:e=>{n({...r,[e.target.name]:e.target.value})}}),(0,i.jsx)("button",{type:"submit",className:a().addproduct,children:d?"Update":"Add"})]}),(0,i.jsxs)("table",{className:a().table,children:[(0,i.jsx)("thead",{children:(0,i.jsxs)("tr",{children:[(0,i.jsx)("th",{children:"ID"}),(0,i.jsx)("th",{children:"Image"}),(0,i.jsx)("th",{children:"Title"}),(0,i.jsx)("th",{children:"Actions"})]})}),(0,i.jsx)("tbody",{children:e.length>0&&e.map(e=>(0,i.jsxs)("tr",{children:[(0,i.jsx)("td",{children:e.id}),(0,i.jsx)("td",{children:(0,i.jsx)("img",{src:e.image_url,alt:e.title,className:a().productImage})}),(0,i.jsx)("td",{children:e.title}),(0,i.jsxs)("td",{children:[(0,i.jsxs)("button",{onClick:()=>f(e),className:a().editbtn,children:[" ",(0,i.jsx)(l.uO9,{})]}),(0,i.jsxs)("button",{onClick:()=>m(e.id),className:a().deletebtn,children:[" ",(0,i.jsx)(l.qbC,{})]})]})]},e.id))})]})]})}},6373:e=>{e.exports={container:"icproduct_container__Xv4Hu",title:"icproduct_title__MjZkT",error:"icproduct_error___jRIi",form:"icproduct_form__nSVRL",previewImage:"icproduct_previewImage__0HFmB",addproduct:"icproduct_addproduct__L3aXh",table:"icproduct_table__jd6in",productImage:"icproduct_productImage__YLku4",editbtn:"icproduct_editbtn__thPyR",deletebtn:"icproduct_deletebtn__spUjl"}},1301:e=>{(()=>{"use strict";var t={d:(e,r)=>{for(var i in r)t.o(r,i)&&!t.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:r[i]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},r={};t.r(r),t.d(r,{default:()=>n});var i=function(){var e;function t(){!function(e,t){if(!(e instanceof t))throw TypeError("Cannot call a class as a function")}(this,t)}return e=[{key:"changeHeightWidth",value:function(e,t,r,i,n,a){return r>i&&(e=Math.round(e*i/r),r=i),e>t&&(r=Math.round(r*t/e),e=t),n&&r<n&&(e=Math.round(e*n/r),r=n),a&&e<a&&(r=Math.round(r*a/e),e=a),{height:e,width:r}}},{key:"resizeAndRotateImage",value:function(e,t,r,i,n){var a=arguments.length>5&&void 0!==arguments[5]?arguments[5]:"jpeg",o=arguments.length>6&&void 0!==arguments[6]?arguments[6]:100,l=arguments.length>7&&void 0!==arguments[7]?arguments[7]:0,c=document.createElement("canvas"),s=e.width,u=e.height,d=this.changeHeightWidth(u,r,s,t,i,n);l&&(90===l||270===l)?(c.width=d.height,c.height=d.width):(c.width=d.width,c.height=d.height),s=d.width,u=d.height;var h=c.getContext("2d");return h.fillStyle="rgba(0, 0, 0, 0)",h.fillRect(0,0,s,u),h.imageSmoothingEnabled&&h.imageSmoothingQuality&&(h.imageSmoothingQuality="high"),l&&(h.rotate(l*Math.PI/180),90===l?h.translate(0,-c.width):180===l?h.translate(-c.width,-c.height):270===l?h.translate(-c.height,0):0!==l&&360!==l||h.translate(0,0)),h.drawImage(e,0,0,s,u),c.toDataURL("image/".concat(a),o/100)}},{key:"b64toByteArrays",value:function(e,t){t=t||"image/jpeg";for(var r=atob(e.toString().replace(/^data:image\/(png|jpeg|jpg|webp);base64,/,"")),i=[],n=0;n<r.length;n+=512){for(var a=r.slice(n,n+512),o=Array(a.length),l=0;l<a.length;l++)o[l]=a.charCodeAt(l);var c=new Uint8Array(o);i.push(c)}return i}},{key:"b64toBlob",value:function(e,t){return new Blob(this.b64toByteArrays(e,t),{type:t,lastModified:new Date})}},{key:"b64toFile",value:function(e,t,r){return new File(this.b64toByteArrays(e,r),t,{type:r,lastModified:new Date})}},{key:"createResizedImage",value:function(e,r,i,n,a,o,l){var c=arguments.length>7&&void 0!==arguments[7]?arguments[7]:"base64",s=arguments.length>8&&void 0!==arguments[8]?arguments[8]:null,u=arguments.length>9&&void 0!==arguments[9]?arguments[9]:null,d=new FileReader;if(!e)throw Error("File Not Found!");if(e.type&&!e.type.includes("image"))throw Error("File Is NOT Image!");d.readAsDataURL(e),d.onload=function(){var h=new Image;h.src=d.result,h.onload=function(){var d=t.resizeAndRotateImage(h,r,i,s,u,n,a,o),p="image/".concat(n);switch(c){case"blob":l(t.b64toBlob(d,p));break;case"base64":default:l(d);break;case"file":var g=e.name.toString().replace(/(png|jpeg|jpg|webp)$/i,"").concat(n.toString());l(t.b64toFile(d,g,p))}}},d.onerror=function(e){throw Error(e)}}}],function(e,t){for(var r=0;r<t.length;r++){var i=t[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}(t,e),t}();let n={imageFileResizer:function(e,t,r,n,a,o,l,c,s,u){return i.createResizedImage(e,t,r,n,a,o,l,c,s,u)}};e.exports=r})()},5787:(e,t,r)=>{"use strict";r.d(t,{k5:()=>u});var i=r(6540),n={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},a=i.createContext&&i.createContext(n),o=["attr","size","title"];function l(){return(l=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var i in r)Object.prototype.hasOwnProperty.call(r,i)&&(e[i]=r[i])}return e}).apply(this,arguments)}function c(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,i)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?c(Object(r),!0).forEach(function(t){var i,n;i=t,n=r[t],(i=function(e){var t=function(e,t){if("object"!=typeof e||!e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var i=r.call(e,t||"default");if("object"!=typeof i)return i;throw TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==typeof t?t:t+""}(i))in e?Object.defineProperty(e,i,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[i]=n}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):c(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}function u(e){return t=>i.createElement(d,l({attr:s({},e.attr)},t),function e(t){return t&&t.map((t,r)=>i.createElement(t.tag,s({key:r},t.attr),e(t.child)))}(e.child))}function d(e){var t=t=>{var r,{attr:n,size:a,title:c}=e,u=function(e,t){if(null==e)return{};var r,i,n=function(e,t){if(null==e)return{};var r={};for(var i in e)if(Object.prototype.hasOwnProperty.call(e,i)){if(t.indexOf(i)>=0)continue;r[i]=e[i]}return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(i=0;i<a.length;i++)r=a[i],!(t.indexOf(r)>=0)&&Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}(e,o),d=a||t.size||"1em";return t.className&&(r=t.className),e.className&&(r=(r?r+" ":"")+e.className),i.createElement("svg",l({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},t.attr,n,u,{className:r,style:s(s({color:e.color||t.color},t.style),e.style),height:d,width:d,xmlns:"http://www.w3.org/2000/svg"}),c&&i.createElement("title",null,c),e.children)};return void 0!==a?i.createElement(a.Consumer,null,e=>t(e)):t(n)}}},e=>{var t=t=>e(e.s=t);e.O(0,[563,636,593,792],()=>t(1507)),_N_E=e.O()}]);