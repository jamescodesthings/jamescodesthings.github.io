import{r as u,a as A,u as O,L as f,R as v,b as W,d as I,e as M,f as G}from"./vendor-199ec543.js";import{l as U}from"./lodash-3072711b.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function c(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerpolicy&&(a.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?a.credentials="include":o.crossorigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(o){if(o.ep)return;o.ep=!0;const a=c(o);fetch(o.href,a)}})();const V="vh";function q(t){let r;const c="--"+V;function s(){const o=t.clientHeight;o!==r&&requestAnimationFrame(function(){t.style.setProperty(c,o*.01+"px"),r=o})}return s(),s}window.addEventListener("resize",q(document.documentElement));var k={},J={get exports(){return k},set exports(t){k=t}},P={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var K=u,X=Symbol.for("react.element"),Y=Symbol.for("react.fragment"),Q=Object.prototype.hasOwnProperty,Z=K.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,ee={key:!0,ref:!0,__self:!0,__source:!0};function R(t,r,c){var s,o={},a=null,i=null;c!==void 0&&(a=""+c),r.key!==void 0&&(a=""+r.key),r.ref!==void 0&&(i=r.ref);for(s in r)Q.call(r,s)&&!ee.hasOwnProperty(s)&&(o[s]=r[s]);if(t&&t.defaultProps)for(s in r=t.defaultProps,r)o[s]===void 0&&(o[s]=r[s]);return{$$typeof:X,type:t,key:a,ref:i,props:o,_owner:Z.current}}P.Fragment=Y;P.jsx=R;P.jsxs=R;(function(t){t.exports=P})(J);const p=k.Fragment,e=k.jsx,n=k.jsxs;var D,N=A;D=N.createRoot,N.hydrateRoot;const E=u.createContext({}),S="theme-choice";var _=(t=>(t.Dark="dark",t.Light="light",t))(_||{});const te=(t,r)=>r==="dark"?"dark":"light",dr=t=>{try{if(typeof(localStorage==null?void 0:localStorage.setItem)!="function")throw new Error("Local Storage not supported");localStorage.setItem(S,t)}catch(r){console.error(`Could not persistChosenTheme ${r}`)}},re=()=>{var c;const t=localStorage==null?void 0:localStorage.getItem(S);return t||(((c=window.matchMedia("(prefers-color-scheme: dark)"))==null?void 0:c.matches)?"dark":"light")},oe=({children:t})=>{const[r,c]=u.useReducer(te,re());return e(E.Provider,{value:{state:r,dispatch:c},children:t})},se="modulepreload",ae=function(t){return"/"+t},z={},ne=function(r,c,s){if(!c||c.length===0)return r();const o=document.getElementsByTagName("link");return Promise.all(c.map(a=>{if(a=ae(a),a in z)return;z[a]=!0;const i=a.endsWith(".css"),j=i?'[rel="stylesheet"]':"";if(!!s)for(let g=o.length-1;g>=0;g--){const b=o[g];if(b.href===a&&(!i||b.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${a}"]${j}`))return;const d=document.createElement("link");if(d.rel=i?"stylesheet":se,i||(d.as="script",d.crossOrigin=""),d.href=a,document.head.appendChild(d),i)return new Promise((g,b)=>{d.addEventListener("load",g),d.addEventListener("error",()=>b(new Error(`Unable to preload CSS for ${a}`)))})})).then(()=>r())},ce="_main_7s2op_1",ie="_error-wrapper_7s2op_7",le="_title_7s2op_9",_e="_leader_7s2op_13",pe="_message_7s2op_20",de="_highlight_7s2op_21",me="_link-back-message_7s2op_26",m={main:ce,errorWrapper:ie,title:le,leader:_e,message:pe,highlight:de,linkBackMessage:me},he="_title_1m190_13",ue="_h1_1m190_23",fe="_h2_1m190_33",ge="_h3_1m190_43",ke="_h4_1m190_52",ye="_leader_1m190_62",be="_prose-wrapper_1m190_72",ve="_prose_1m190_72",Pe="_prose-base_1m190_1",xe="_md:prose-sm_1m190_1",$e="_lg:prose-base_1m190_1",Le="_xl:prose-lg_1m190_1",we="_body_1m190_87",Ne="_link_1m190_96",ze="_externalLink_1m190_97",y={default:"_default_1m190_1",title:he,h1:ue,h2:fe,h3:ge,h4:ke,leader:ye,proseWrapper:be,prose:ve,proseBase:Pe,mdProseSm:xe,lgProseBase:$e,xlProseLg:Le,"2XlProseXl":"_2xl:prose-xl_1m190_1",body:we,link:Ne,externalLink:ze};function Ce(){const t=O();let r="Oops!",c,s=e(p,{children:"Sorry, something went wrong."});if((t==null?void 0:t.status)===404){console.log("Route not found");const o=window.location.pathname;r="Where are you going?",c="This is embarrassing",s=n(p,{children:["The page at ",e("span",{className:m.highlight,children:o})," isn't there anymore."]})}return console.error(t),e("main",{className:`${m.main}`,children:n("article",{className:`${m.errorWrapper}`,children:[e("h1",{className:`${m.title}`,children:r}),c&&e("p",{className:`${m.leader}`,children:c}),e("p",{className:`${m.message}`,children:s}),n("p",{className:`${m.linkBackMessage}`,children:["My guess is you want to go"," ",e(f,{to:"/",className:`${y.link}`,children:"Home"}),"."]})]})})}function L(t,r){return!r||!t?"":r.split(" ").map(s=>{const o=U.camelCase(s);return t[o]||s||""}).join(" ")}const T=({children:t,className:r})=>e("article",{className:`${y.proseWrapper} ${L({},r)}`,children:t}),Re="_texture-preview_9uk4y_1",De="_texture_9uk4y_1",Ee="_beige-paper_9uk4y_18",Se="_black-paper_9uk4y_22",Te="_cardboard-flat_9uk4y_26",He="_cardboard_9uk4y_26",Fe="_clean-gray-paper_9uk4y_34",Be="_cream-paper_9uk4y_38",je="_exclusive-paper_9uk4y_42",Ae="_fabric-dark_9uk4y_46",Oe="_fabric-light_9uk4y_50",We="_groovepaper_9uk4y_55",Ie="_handmade-paper_9uk4y_59",Me="_light-paper-fibers_9uk4y_63",Ge="_lined-paper-2_9uk4y_67",Ue="_natural-paper_9uk4y_71",Ve="_notebook-dark_9uk4y_75",qe="_notebook_9uk4y_75",Je="_paper-1_9uk4y_83",Ke="_paper-2_9uk4y_87",Xe="_paper-3_9uk4y_91",Ye="_paper-fibers_9uk4y_95",Qe="_paper_9uk4y_83",Ze="_rice-paper-2_9uk4y_103",et="_rice-paper-3_9uk4y_107",tt="_rice-paper_9uk4y_103",rt="_sandpaper_9uk4y_115",ot="_soft-wallpaper_9uk4y_119",st="_textured-paper_9uk4y_123",x={texturePreview:Re,texture:De,beigePaper:Ee,blackPaper:Se,cardboardFlat:Te,cardboard:He,cleanGrayPaper:Fe,creamPaper:Be,exclusivePaper:je,fabricDark:Ae,fabricLight:Oe,groovepaper:We,handmadePaper:Ie,lightPaperFibers:Me,linedPaper2:Ge,naturalPaper:Ue,notebookDark:Ve,notebook:qe,paper1:Je,paper2:Ke,paper3:Xe,paperFibers:Ye,paper:Qe,ricePaper2:Ze,ricePaper3:et,ricePaper:tt,sandpaper:rt,softWallpaper:ot,texturedPaper:st},at=({name:t="fabric-light",className:r=""})=>e(p,{children:e("div",{className:`${x.texture} ${L(x,t)} ${L(x,r)}`})}),nt="_page-break_1yyxs_2",ct={pageBreak:nt},it=()=>e(p,{children:e("div",{className:`${ct.pageBreak}`})}),lt="_mall_1aztv_4",_t="_mx_1aztv_7",pt="_my_1aztv_10",dt="_my-double_1aztv_13",mt="_my-half_1aztv_16",ht="_mb_1aztv_19",ut="_mb-half_1aztv_22",ft="_mb-almost-double_1aztv_25",gt="_mb-double_1aztv_28",kt="_mt_1aztv_31",yt="_mt-half_1aztv_34",bt="_mt-double_1aztv_37",vt="_mt-sidebar-first_1aztv_40",Pt="_ml_1aztv_44",xt="_ml-half_1aztv_47",$t="_mr_1aztv_50",Lt="_mr-half_1aztv_53",wt="_pall_1aztv_58",Nt="_px_1aztv_61",zt="_px-half_1aztv_64",Ct="_py_1aztv_67",Rt="_pb_1aztv_70",Dt="_pt_1aztv_73",Et="_pt-half_1aztv_76",St="_first:pt_1aztv_81",Tt="_pl_1aztv_84",Ht="_pl-half_1aztv_87",Ft="_pr_1aztv_93",Bt="_pr-half_1aztv_97",l={mall:lt,mx:_t,my:pt,myDouble:dt,myHalf:mt,mb:ht,mbHalf:ut,mbAlmostDouble:ft,mbDouble:gt,mt:kt,mtHalf:yt,mtDouble:bt,mtSidebarFirst:vt,ml:Pt,mlHalf:xt,mr:$t,mrHalf:Lt,pall:wt,px:Nt,pxHalf:zt,py:Ct,pb:Rt,pt:Dt,ptHalf:Et,firstPt:St,pl:Tt,plHalf:Ht,pr:Ft,prHalf:Bt},jt="_page_1fs0w_1",At="_print-dark_1fs0w_5",Ot="_not-fixed_1fs0w_22",Wt="_content_1fs0w_37",$={page:jt,printDark:At,notFixed:Ot,content:Wt},It="_contain_1jzc5_1",Mt="_screen_1jzc5_9",Gt="_hr_1jzc5_13",w={contain:It,screen:Mt,hr:Gt},H=({children:t,screen:r,hideInPrint:c})=>{let s=`${w.contain} ${l.pb} ${l.firstPt}`;return r&&(s+=` ${w.screen}`),c&&(s+=" print:hidden"),e("div",{className:s,children:t})},F=({children:t,textureName:r="textured-paper",fixedToPaper:c=!0,className:s=`rounded-lg ${l.mb} ${l.pall}`})=>n(p,{children:[e(H,{children:n("div",{className:`${$.page} ${y.default} ${c?"":$.notFixed} ${s}`,children:[r&&e(at,{name:r}),e("div",{className:`${$.content}`,children:t})]})}),e(it,{})]}),Ut="_footer_f4btv_1",Vt="_logo-and-name_f4btv_11",qt="_name_f4btv_13",Jt="_copyright_f4btv_18",Kt="_footer-links_f4btv_22",Xt="_footer-link_f4btv_22",h={footer:Ut,logoAndName:Vt,name:qt,copyright:Jt,footerLinks:Kt,footerLink:Xt},B=()=>e(H,{hideInPrint:!0,children:n("footer",{className:`${h.footer}`,children:[n("div",{className:"sm:flex sm:items-center sm:justify-between",children:[n(f,{to:"/",className:`${h.logoAndName} ${l.mb} sm:!m-0`,children:[e("img",{src:"/assets/icons/favicon-color.svg",alt:"Logo",className:`${l.mrHalf} w-8`}),e("span",{className:`${h.name}`,children:"CodesThings.com"})]}),n("ul",{className:`${h.footerLinks} ${l.mb} sm:!m-0`,children:[e("li",{children:e(f,{to:"/about-cookies",className:`${h.footerLink} ${l.mrHalf}`,children:"About Cookies"})}),e("li",{children:e(f,{to:"/privacy-notice",className:`${h.footerLink}`,children:"Privacy Notice"})})]})]}),e("hr",{className:`${w.hr} ${l.myHalf}`}),e("span",{className:`${h.copyright}`,children:"© 2023 James Macmillan. All Rights Reserved."})]})}),Yt="https://ico.org.uk/for-organisations/guide-to-pecr/guidance-on-the-use-of-cookies-and-similar-technologies/what-are-cookies-and-similar-technologies/",Qt=()=>n(p,{children:[n(F,{fixedToPaper:!1,children:[e(f,{to:"/",className:`${y.link} ${l.mb} block`,children:"< Go Back"}),n(T,{children:[n("h1",{children:["About Cookies ",e("small",{className:"opacity-60",children:"and Similar Technologies."})]}),e("h2",{children:"Summary"}),e("p",{children:"This website only uses Cookies and Similar Technologies to provide essential functionality only."}),e("h2",{children:"What are Cookies?"}),e("p",{children:"Cookies are small files saved on your phone, tablet or computer when you visit a website. We use cookies to make CodesThings.com work."}),e("h2",{children:"Essential cookies"}),e("p",{children:"Essential cookies store your preferences while you browse CodesThings.com. We do not need to ask permission to use them."}),n("table",{className:"table-auto",children:[e("thead",{children:n("tr",{children:[e("td",{children:"Name"}),e("td",{children:"Mechanism"}),e("td",{children:"Purpose"})]})}),n("tbody",{children:[n("tr",{children:[e("td",{children:"theme-choice"}),e("td",{children:"LocalStorage"}),e("td",{children:"Used to store your theme choice, if you manually change the website's theme."})]}),n("tr",{children:[e("td",{children:"redirect-path"}),e("td",{children:"LocalStorage"}),e("td",{children:"Used to provide a useful error message, if you navigate to a page that does not exist."})]})]})]}),e("h2",{children:"Where can I find out more?"}),n("p",{children:["The"," ",e("a",{href:Yt,target:"_blank",rel:"noreferrer",children:"Information Commissioner's office"})," ","provides up to date information regarding the use of Cookies and Similar Technologies."]})]})]}),e(B,{})]}),C="https://github.com/jamescodesthings/jamescodesthings.github.io",Zt=()=>n(p,{children:[n(F,{fixedToPaper:!1,children:[e(f,{to:"/",className:`${y.link} ${l.mb} block`,children:"< Go Back"}),n(T,{children:[e("h1",{children:"Privacy Notice"}),e("h2",{children:"Summary"}),e("p",{children:"I do not collect, store or process any personal data."}),e("h2",{children:"Detail"}),n("p",{children:["CodesThings.com is the personal website of James Macmillan. I do not collect any personal data on this website, no analytics or tracking are performed. Great care has been taken to ensure this is possible. The source code to this website is publicly available here:"," ",e("a",{href:C,target:"_blank",rel:"noreferrer",children:C}),"."]}),e("h2",{children:"Cookies"}),n("p",{children:["Please see the ",e(f,{to:"/about-cookies",children:"Cookie Policy"}),"."]}),e("h2",{children:"Contact"}),e("p",{children:"For any questions or concerns you may contact:"}),n("ul",{className:"list-none pl-0 ml-0",children:[e("li",{className:"pl-0",children:"James Macmillan"}),e("li",{className:"pl-0",children:"+44 7736 667 115"}),e("li",{className:"pl-0",children:"james@codesthings.com"})]})]})]}),e(B,{})]}),er=u.lazy(()=>ne(()=>import("./Home-8c34513a.js"),["assets/Home-8c34513a.js","assets/vendor-199ec543.js","assets/usehooks-ts-d8544e54.js","assets/lodash-3072711b.js","assets/Home-76a2784d.css"])),tr=e(p,{children:n(v,{errorElement:e(Ce,{}),children:[e(v,{path:"/",element:e(er,{})}),e(v,{path:"/about-cookies",element:e(Qt,{})}),e(v,{path:"/privacy-notice",element:e(Zt,{})})]})}),rr=W(I(tr));function or(){document.body.classList.contains(_.Dark)||document.body.classList.add(_.Dark),document.body.classList.contains(_.Light)&&document.body.classList.remove(_.Light)}function sr(){document.body.classList.contains(_.Light)||document.body.classList.add(_.Light),document.body.classList.contains(_.Dark)&&document.body.classList.remove(_.Dark)}function ar(){const{state:t}=u.useContext(E),r=t===_.Dark;return u.useEffect(()=>{r?or():sr()},[r]),e(u.Suspense,{fallback:e(p,{children:"..."}),children:e(M,{router:rr})})}const nr=()=>e(oe,{children:e(ar,{})});const cr=document.getElementById("root"),ir=D(cr);ir.render(e(G.StrictMode,{children:e(nr,{})}));export{H as C,p as F,T as P,at as T,e as a,F as b,E as c,_ as d,B as e,L as g,n as j,dr as p,l as s,y as t,w as u};