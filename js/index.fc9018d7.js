(function(e){function t(t){for(var n,o,i=t[0],u=t[1],s=t[2],l=0,d=[];l<i.length;l++)o=i[l],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&d.push(a[o][0]),a[o]=0;for(n in u)Object.prototype.hasOwnProperty.call(u,n)&&(e[n]=u[n]);f&&f(t);while(d.length)d.shift()();return c.push.apply(c,s||[]),r()}function r(){for(var e,t=0;t<c.length;t++){for(var r=c[t],n=!0,o=1;o<r.length;o++){var i=r[o];0!==a[i]&&(n=!1)}n&&(c.splice(t--,1),e=u(u.s=r[0]))}return e}var n={},o={index:0},a={index:0},c=[];function i(e){return u.p+"js/"+({}[e]||e)+"."+{"chunk-07825dce":"c13749d1","chunk-300718b1":"09d25c3f"}[e]+".js"}function u(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,u),r.l=!0,r.exports}u.e=function(e){var t=[],r={"chunk-07825dce":1,"chunk-300718b1":1};o[e]?t.push(o[e]):0!==o[e]&&r[e]&&t.push(o[e]=new Promise((function(t,r){for(var n="css/"+({}[e]||e)+"."+{"chunk-07825dce":"63a4cd77","chunk-300718b1":"c81e7669"}[e]+".css",a=u.p+n,c=document.getElementsByTagName("link"),i=0;i<c.length;i++){var s=c[i],l=s.getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(l===n||l===a))return t()}var d=document.getElementsByTagName("style");for(i=0;i<d.length;i++){s=d[i],l=s.getAttribute("data-href");if(l===n||l===a)return t()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=t,f.onerror=function(t){var n=t&&t.target&&t.target.src||a,c=new Error("Loading CSS chunk "+e+" failed.\n("+n+")");c.code="CSS_CHUNK_LOAD_FAILED",c.request=n,delete o[e],f.parentNode.removeChild(f),r(c)},f.href=a;var p=document.getElementsByTagName("head")[0];p.appendChild(f)})).then((function(){o[e]=0})));var n=a[e];if(0!==n)if(n)t.push(n[2]);else{var c=new Promise((function(t,r){n=a[e]=[t,r]}));t.push(n[2]=c);var s,l=document.createElement("script");l.charset="utf-8",l.timeout=120,u.nc&&l.setAttribute("nonce",u.nc),l.src=i(e);var d=new Error;s=function(t){l.onerror=l.onload=null,clearTimeout(f);var r=a[e];if(0!==r){if(r){var n=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src;d.message="Loading chunk "+e+" failed.\n("+n+": "+o+")",d.name="ChunkLoadError",d.type=n,d.request=o,r[1](d)}a[e]=void 0}};var f=setTimeout((function(){s({type:"timeout",target:l})}),12e4);l.onerror=l.onload=s,document.head.appendChild(l)}return Promise.all(t)},u.m=e,u.c=n,u.d=function(e,t,r){u.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},u.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,t){if(1&t&&(e=u(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(u.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)u.d(r,n,function(t){return e[t]}.bind(null,n));return r},u.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return u.d(t,"a",t),t},u.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},u.p="/characters/",u.oe=function(e){throw console.error(e),e};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=t,s=s.slice();for(var d=0;d<s.length;d++)t(s[d]);var f=l;c.push([1,"chunk-vendors"]),r()})({"034f":function(e,t,r){"use strict";var n=r("85ec"),o=r.n(n);o.a},1:function(e,t,r){e.exports=r("b635")},"3dfd":function(e,t,r){"use strict";var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"app"}},[e.weeks?r("Index",{attrs:{weeks:e.weeks}}):[r("CharacterSheets"),r("div",{staticClass:"clear text-smaller popover-container"},[r("font-awesome-icon",{staticClass:"icon",style:{color:"var(--border-color)"},attrs:{icon:["fas","info-circle"]}}),r("div",{staticClass:"popover"},[e._v(" Changes may take up to five minutes to reflect in the sheet. "),r("br"),e._v("Please report any issues to #hacklab or #meta in the TRG Discord. "),r("br"),r("span",{staticClass:"text-smaller"},[e._v("Site creds: Xan (@xankuroi).")])])],1)]],2)},o=[],a=(r("d3b7"),{name:"App",components:{CharacterSheets:function(){return r.e("chunk-07825dce").then(r.bind(null,"c180"))},Index:function(){return r.e("chunk-300718b1").then(r.bind(null,"8b24"))}},data:function(){return{weeks:JSON.parse(window.weeks)}},beforeMount:function(){var e=window.matchMedia("(prefers-color-scheme: dark)").matches;"light"===localStorage.theme&&(e=!1),document.body.setAttribute("data-theme",e?"dark":"light")}}),c=a,i=(r("034f"),r("2877")),u=Object(i["a"])(c,n,o,!1,null,null,null);t["a"]=u.exports},"85ec":function(e,t,r){},b635:function(e,t,r){"use strict";r.r(t);r("e260"),r("e6cf"),r("cca6"),r("a79d");var n=r("2b0e"),o=r("3dfd");n["a"].config.productionTip=!1,new n["a"]({render:function(e){return e(o["a"])}}).$mount("#app")}});
//# sourceMappingURL=index.fc9018d7.js.map