import{r as h,a as E,u as w,L,R as g,b as P,d as S,e as z,f as O}from"./vendor-013e6b60.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function n(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerpolicy&&(o.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?o.credentials="include":r.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(r){if(r.ep)return;r.ep=!0;const o=n(r);fetch(r.href,o)}})();const $="vh";function N(e){let t;const n="--"+$;function s(){const r=e.clientHeight;r!==t&&requestAnimationFrame(function(){e.style.setProperty(n,r*.01+"px"),t=r})}return s(),s}window.addEventListener("resize",N(document.documentElement));var u={},C={get exports(){return u},set exports(e){u=e}},_={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var T=h,B=Symbol.for("react.element"),j=Symbol.for("react.fragment"),I=Object.prototype.hasOwnProperty,A=T.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,D={key:!0,ref:!0,__self:!0,__source:!0};function k(e,t,n){var s,r={},o=null,a=null;n!==void 0&&(o=""+n),t.key!==void 0&&(o=""+t.key),t.ref!==void 0&&(a=t.ref);for(s in t)I.call(t,s)&&!D.hasOwnProperty(s)&&(r[s]=t[s]);if(e&&e.defaultProps)for(s in t=e.defaultProps,t)r[s]===void 0&&(r[s]=t[s]);return{$$typeof:B,type:e,key:o,ref:a,props:r,_owner:A.current}}_.Fragment=j;_.jsx=k;_.jsxs=k;(function(e){e.exports=_})(C);const p=u.Fragment,i=u.jsx,f=u.jsxs;var b,y=E;b=y.createRoot,y.hydrateRoot;const F=h.createContext({}),R="theme-choice";var W=(e=>(e.Dark="dark",e.Light="light",e))(W||{});const H=(e,t)=>t==="dark"?"dark":"light",we=e=>{try{if(typeof(localStorage==null?void 0:localStorage.setItem)!="function")throw new Error("Local Storage not supported");localStorage.setItem(R,e)}catch(t){console.error(`Could not persistChosenTheme ${t}`)}},M=()=>{var n;const e=localStorage==null?void 0:localStorage.getItem(R);return e||(((n=window.matchMedia("(prefers-color-scheme: dark)"))==null?void 0:n.matches)?"dark":"light")},V=({children:e})=>{const[t,n]=h.useReducer(H,M());return i(F.Provider,{value:{state:t,dispatch:n},children:e})},q="modulepreload",U=function(e){return"/"+e},x={},K=function(t,n,s){if(!n||n.length===0)return t();const r=document.getElementsByTagName("link");return Promise.all(n.map(o=>{if(o=U(o),o in x)return;x[o]=!0;const a=o.endsWith(".css"),v=a?'[rel="stylesheet"]':"";if(!!s)for(let d=r.length-1;d>=0;d--){const m=r[d];if(m.href===o&&(!a||m.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${o}"]${v}`))return;const l=document.createElement("link");if(l.rel=a?"stylesheet":q,a||(l.as="script",l.crossOrigin=""),l.href=o,document.head.appendChild(l),a)return new Promise((d,m)=>{l.addEventListener("load",d),l.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${o}`)))})})).then(()=>t())},X="_main_7s2op_1",Y="_error-wrapper_7s2op_7",G="_title_7s2op_9",J="_leader_7s2op_13",Q="_message_7s2op_20",Z="_highlight_7s2op_21",ee="_link-back-message_7s2op_26",c={main:X,errorWrapper:Y,title:G,leader:J,message:Q,highlight:Z,linkBackMessage:ee},te="_h1_xdbz4_10",re="_h2_xdbz4_20",oe="_h3_xdbz4_31",se="_h4_xdbz4_41",ne="_leader_xdbz4_52",ie="_prose-wrapper_xdbz4_63",ae="_prose_xdbz4_63",le="_prose-base_xdbz4_1",ce="_md:prose-sm_xdbz4_1",de="_lg:prose-base_xdbz4_1",ue="_xl:prose-lg_xdbz4_1",he="_body_xdbz4_76",me="_link_xdbz4_86",pe="_externalLink_xdbz4_87",_e={default:"_default_xdbz4_1",h1:te,h2:re,h3:oe,h4:se,leader:ne,proseWrapper:ie,prose:ae,proseBase:le,mdProseSm:ce,lgProseBase:de,xlProseLg:ue,"2XlProseXl":"_2xl:prose-xl_xdbz4_1",body:he,link:me,externalLink:pe};function fe(){const e=w();let t="Oops!",n,s=i(p,{children:"Sorry, something went wrong."});if((e==null?void 0:e.status)===404){console.log("Route not found");const r=window.location.pathname;t="Where are you going?",n="This is embarrassing",s=f(p,{children:["The page at ",i("span",{className:c.highlight,children:r})," isn't there anymore."]})}return console.error(e),i("main",{className:`${c.main}`,children:f("article",{className:`${c.errorWrapper}`,children:[i("h1",{className:`${c.title}`,children:t}),n&&i("p",{className:`${c.leader}`,children:n}),i("p",{className:`${c.message}`,children:s}),f("p",{className:`${c.linkBackMessage}`,children:["My guess is you want to go"," ",i(L,{to:"/",className:`${_e.link}`,children:"Home"}),"."]})]})})}const ge=h.lazy(()=>K(()=>import("./Home-d0aca9f7.js"),["assets/Home-d0aca9f7.js","assets/lodash-ef5ca2f2.js","assets/vendor-013e6b60.js","assets/Home-07eec84f.css"])),ye=i(p,{children:i(g,{errorElement:i(fe,{}),children:i(g,{path:"/",element:i(ge,{})})})}),xe=P(S(ye));function ke(){return i(V,{children:i(h.Suspense,{fallback:i(p,{children:"..."}),children:i(z,{router:xe})})})}const be=document.getElementById("root"),Re=b(be);Re.render(i(O.StrictMode,{children:i(ke,{})}));export{p as F,F as T,f as a,W as b,i as j,we as p,_e as t};