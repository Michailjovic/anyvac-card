/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$3=globalThis,e$3=t$3.ShadowRoot&&(void 0===t$3.ShadyCSS||t$3.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$2=Symbol(),o$5=new WeakMap;let n$4 = class n{constructor(t,e,o){if(this._$cssResult$=true,o!==s$2)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$3&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=o$5.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&o$5.set(s,t));}return t}toString(){return this.cssText}};const r$4=t=>new n$4("string"==typeof t?t:t+"",void 0,s$2),i$5=(t,...e)=>{const o=1===t.length?t[0]:e.reduce((e,s,o)=>e+(t=>{if(true===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[o+1],t[0]);return new n$4(o,t,s$2)},S$1=(s,o)=>{if(e$3)s.adoptedStyleSheets=o.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of o){const o=document.createElement("style"),n=t$3.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=e.cssText,s.appendChild(o);}},c$2=e$3?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$4(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:i$4,defineProperty:e$2,getOwnPropertyDescriptor:h$1,getOwnPropertyNames:r$3,getOwnPropertySymbols:o$4,getPrototypeOf:n$3}=Object,a$1=globalThis,c$1=a$1.trustedTypes,l$1=c$1?c$1.emptyScript:"",p$1=a$1.reactiveElementPolyfillSupport,d$1=(t,s)=>t,u$1={toAttribute(t,s){switch(s){case Boolean:t=t?l$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,s){let i=t;switch(s){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t);}catch(t){i=null;}}return i}},f$1=(t,s)=>!i$4(t,s),b$1={attribute:true,type:String,converter:u$1,reflect:false,useDefault:false,hasChanged:f$1};Symbol.metadata??=Symbol("metadata"),a$1.litPropertyMetadata??=new WeakMap;let y$1 = class y extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t);}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,s=b$1){if(s.state&&(s.attribute=false),this._$Ei(),this.prototype.hasOwnProperty(t)&&((s=Object.create(s)).wrapped=true),this.elementProperties.set(t,s),!s.noAccessor){const i=Symbol(),h=this.getPropertyDescriptor(t,i,s);void 0!==h&&e$2(this.prototype,t,h);}}static getPropertyDescriptor(t,s,i){const{get:e,set:r}=h$1(this.prototype,t)??{get(){return this[s]},set(t){this[s]=t;}};return {get:e,set(s){const h=e?.call(this);r?.call(this,s),this.requestUpdate(t,h,i);},configurable:true,enumerable:true}}static getPropertyOptions(t){return this.elementProperties.get(t)??b$1}static _$Ei(){if(this.hasOwnProperty(d$1("elementProperties")))return;const t=n$3(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties);}static finalize(){if(this.hasOwnProperty(d$1("finalized")))return;if(this.finalized=true,this._$Ei(),this.hasOwnProperty(d$1("properties"))){const t=this.properties,s=[...r$3(t),...o$4(t)];for(const i of s)this.createProperty(i,t[i]);}const t=this[Symbol.metadata];if(null!==t){const s=litPropertyMetadata.get(t);if(void 0!==s)for(const[t,i]of s)this.elementProperties.set(t,i);}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);void 0!==i&&this._$Eh.set(i,t);}this.elementStyles=this.finalizeStyles(this.styles);}static finalizeStyles(s){const i=[];if(Array.isArray(s)){const e=new Set(s.flat(1/0).reverse());for(const s of e)i.unshift(c$2(s));}else void 0!==s&&i.push(c$2(s));return i}static _$Eu(t,s){const i=s.attribute;return  false===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=false,this.hasUpdated=false,this._$Em=null,this._$Ev();}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this));}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.();}removeController(t){this._$EO?.delete(t);}_$E_(){const t=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t);}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return S$1(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(true),this._$EO?.forEach(t=>t.hostConnected?.());}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.());}attributeChangedCallback(t,s,i){this._$AK(t,i);}_$ET(t,s){const i=this.constructor.elementProperties.get(t),e=this.constructor._$Eu(t,i);if(void 0!==e&&true===i.reflect){const h=(void 0!==i.converter?.toAttribute?i.converter:u$1).toAttribute(s,i.type);this._$Em=t,null==h?this.removeAttribute(e):this.setAttribute(e,h),this._$Em=null;}}_$AK(t,s){const i=this.constructor,e=i._$Eh.get(t);if(void 0!==e&&this._$Em!==e){const t=i.getPropertyOptions(e),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:u$1;this._$Em=e;const r=h.fromAttribute(s,t.type);this[e]=r??this._$Ej?.get(e)??r,this._$Em=null;}}requestUpdate(t,s,i,e=false,h){if(void 0!==t){const r=this.constructor;if(false===e&&(h=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??f$1)(h,s)||i.useDefault&&i.reflect&&h===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,s,i);} false===this.isUpdatePending&&(this._$ES=this._$EP());}C(t,s,{useDefault:i,reflect:e,wrapped:h},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??s??this[t]),true!==h||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(s=void 0),this._$AL.set(t,s)),true===e&&this._$Em!==t&&(this._$Eq??=new Set).add(t));}async _$EP(){this.isUpdatePending=true;try{await this._$ES;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,s]of this._$Ep)this[t]=s;this._$Ep=void 0;}const t=this.constructor.elementProperties;if(t.size>0)for(const[s,i]of t){const{wrapped:t}=i,e=this[s];true!==t||this._$AL.has(s)||void 0===e||this.C(s,void 0,i,e);}}let t=false;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(s)):this._$EM();}catch(s){throw t=false,this._$EM(),s}t&&this._$AE(s);}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=true,this.firstUpdated(t)),this.updated(t);}_$EM(){this._$AL=new Map,this.isUpdatePending=false;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return  true}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM();}updated(t){}firstUpdated(t){}};y$1.elementStyles=[],y$1.shadowRootOptions={mode:"open"},y$1[d$1("elementProperties")]=new Map,y$1[d$1("finalized")]=new Map,p$1?.({ReactiveElement:y$1}),(a$1.reactiveElementVersions??=[]).push("2.1.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$2=globalThis,i$3=t=>t,s$1=t$2.trustedTypes,e$1=s$1?s$1.createPolicy("lit-html",{createHTML:t=>t}):void 0,h="$lit$",o$3=`lit$${Math.random().toFixed(9).slice(2)}$`,n$2="?"+o$3,r$2=`<${n$2}>`,l=document,c=()=>l.createComment(""),a=t=>null===t||"object"!=typeof t&&"function"!=typeof t,u=Array.isArray,d=t=>u(t)||"function"==typeof t?.[Symbol.iterator],f="[ \t\n\f\r]",v=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m=/>/g,p=RegExp(`>|${f}(?:([^\\s"'>=/]+)(${f}*=${f}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),g=/'/g,$=/"/g,y=/^(?:script|style|textarea|title)$/i,x=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),b=x(1),E=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),C=new WeakMap,P=l.createTreeWalker(l,129);function V(t,i){if(!u(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==e$1?e$1.createHTML(i):i}const N=(t,i)=>{const s=t.length-1,e=[];let n,l=2===i?"<svg>":3===i?"<math>":"",c=v;for(let i=0;i<s;i++){const s=t[i];let a,u,d=-1,f=0;for(;f<s.length&&(c.lastIndex=f,u=c.exec(s),null!==u);)f=c.lastIndex,c===v?"!--"===u[1]?c=_:void 0!==u[1]?c=m:void 0!==u[2]?(y.test(u[2])&&(n=RegExp("</"+u[2],"g")),c=p):void 0!==u[3]&&(c=p):c===p?">"===u[0]?(c=n??v,d=-1):void 0===u[1]?d=-2:(d=c.lastIndex-u[2].length,a=u[1],c=void 0===u[3]?p:'"'===u[3]?$:g):c===$||c===g?c=p:c===_||c===m?c=v:(c=p,n=void 0);const x=c===p&&t[i+1].startsWith("/>")?" ":"";l+=c===v?s+r$2:d>=0?(e.push(a),s.slice(0,d)+h+s.slice(d)+o$3+x):s+o$3+(-2===d?i:x);}return [V(t,l+(t[s]||"<?>")+(2===i?"</svg>":3===i?"</math>":"")),e]};class S{constructor({strings:t,_$litType$:i},e){let r;this.parts=[];let l=0,a=0;const u=t.length-1,d=this.parts,[f,v]=N(t,i);if(this.el=S.createElement(f,e),P.currentNode=this.el.content,2===i||3===i){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes);}for(;null!==(r=P.nextNode())&&d.length<u;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(h)){const i=v[a++],s=r.getAttribute(t).split(o$3),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:l,name:e[2],strings:s,ctor:"."===e[1]?I:"?"===e[1]?L:"@"===e[1]?z:H}),r.removeAttribute(t);}else t.startsWith(o$3)&&(d.push({type:6,index:l}),r.removeAttribute(t));if(y.test(r.tagName)){const t=r.textContent.split(o$3),i=t.length-1;if(i>0){r.textContent=s$1?s$1.emptyScript:"";for(let s=0;s<i;s++)r.append(t[s],c()),P.nextNode(),d.push({type:2,index:++l});r.append(t[i],c());}}}else if(8===r.nodeType)if(r.data===n$2)d.push({type:2,index:l});else {let t=-1;for(;-1!==(t=r.data.indexOf(o$3,t+1));)d.push({type:7,index:l}),t+=o$3.length-1;}l++;}}static createElement(t,i){const s=l.createElement("template");return s.innerHTML=t,s}}function M(t,i,s=t,e){if(i===E)return i;let h=void 0!==e?s._$Co?.[e]:s._$Cl;const o=a(i)?void 0:i._$litDirective$;return h?.constructor!==o&&(h?._$AO?.(false),void 0===o?h=void 0:(h=new o(t),h._$AT(t,s,e)),void 0!==e?(s._$Co??=[])[e]=h:s._$Cl=h),void 0!==h&&(i=M(t,h._$AS(t,i.values),h,e)),i}class R{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??l).importNode(i,true);P.currentNode=e;let h=P.nextNode(),o=0,n=0,r=s[0];for(;void 0!==r;){if(o===r.index){let i;2===r.type?i=new k(h,h.nextSibling,this,t):1===r.type?i=new r.ctor(h,r.name,r.strings,this,t):6===r.type&&(i=new Z(h,this,t)),this._$AV.push(i),r=s[++n];}o!==r?.index&&(h=P.nextNode(),o++);}return P.currentNode=l,e}p(t){let i=0;for(const s of this._$AV) void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class k{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??true;}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=M(this,t,i),a(t)?t===A||null==t||""===t?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==E&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):d(t)?this.k(t):this._(t);}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t));}_(t){this._$AH!==A&&a(this._$AH)?this._$AA.nextSibling.data=t:this.T(l.createTextNode(t)),this._$AH=t;}$(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=S.createElement(V(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else {const t=new R(e,this),s=t.u(this.options);t.p(i),this.T(s),this._$AH=t;}}_$AC(t){let i=C.get(t.strings);return void 0===i&&C.set(t.strings,i=new S(t)),i}k(t){u(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const h of t)e===i.length?i.push(s=new k(this.O(c()),this.O(c()),this,this.options)):s=i[e],s._$AI(h),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,s){for(this._$AP?.(false,true,s);t!==this._$AB;){const s=i$3(t).nextSibling;i$3(t).remove(),t=s;}}setConnected(t){ void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t));}}class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,h){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=h,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=A;}_$AI(t,i=this,s,e){const h=this.strings;let o=false;if(void 0===h)t=M(this,t,i,0),o=!a(t)||t!==this._$AH&&t!==E,o&&(this._$AH=t);else {const e=t;let n,r;for(t=h[0],n=0;n<h.length-1;n++)r=M(this,e[s+n],i,n),r===E&&(r=this._$AH[n]),o||=!a(r)||r!==this._$AH[n],r===A?t=A:t!==A&&(t+=(r??"")+h[n+1]),this._$AH[n]=r;}o&&!e&&this.j(t);}j(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"");}}class I extends H{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===A?void 0:t;}}class L extends H{constructor(){super(...arguments),this.type=4;}j(t){this.element.toggleAttribute(this.name,!!t&&t!==A);}}class z extends H{constructor(t,i,s,e,h){super(t,i,s,e,h),this.type=5;}_$AI(t,i=this){if((t=M(this,t,i,0)??A)===E)return;const s=this._$AH,e=t===A&&s!==A||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,h=t!==A&&(s===A||e);e&&this.element.removeEventListener(this.name,this,s),h&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t);}}class Z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){M(this,t);}}const B=t$2.litHtmlPolyfillSupport;B?.(S,k),(t$2.litHtmlVersions??=[]).push("3.3.3");const D=(t,i,s)=>{const e=s?.renderBefore??i;let h=e._$litPart$;if(void 0===h){const t=s?.renderBefore??null;e._$litPart$=h=new k(i.insertBefore(c(),t),t,void 0,s??{});}return h._$AI(t),h};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const s=globalThis;let i$2 = class i extends y$1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=D(r,this.renderRoot,this.renderOptions);}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(true);}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(false);}render(){return E}};i$2._$litElement$=true,i$2["finalized"]=true,s.litElementHydrateSupport?.({LitElement:i$2});const o$2=s.litElementPolyfillSupport;o$2?.({LitElement:i$2});(s.litElementVersions??=[]).push("4.2.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1=t=>(e,o)=>{ void 0!==o?o.addInitializer(()=>{customElements.define(t,e);}):customElements.define(t,e);};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const o$1={attribute:true,type:String,converter:u$1,reflect:false,hasChanged:f$1},r$1=(t=o$1,e,r)=>{const{kind:n,metadata:i}=r;let s=globalThis.litPropertyMetadata.get(i);if(void 0===s&&globalThis.litPropertyMetadata.set(i,s=new Map),"setter"===n&&((t=Object.create(t)).wrapped=true),s.set(r.name,t),"accessor"===n){const{name:o}=r;return {set(r){const n=e.get.call(this);e.set.call(this,r),this.requestUpdate(o,n,t,true,r);},init(e){return void 0!==e&&this.C(o,void 0,t,e),e}}}if("setter"===n){const{name:o}=r;return function(r){const n=this[o];e.call(this,r),this.requestUpdate(o,n,t,true,r);}}throw Error("Unsupported decorator location: "+n)};function n$1(t){return (e,o)=>"object"==typeof o?r$1(t,e,o):((t,e,o)=>{const r=e.hasOwnProperty(o);return e.constructor.createProperty(o,t),r?Object.getOwnPropertyDescriptor(e,o):void 0})(t,e,o)}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function r(r){return n$1({...r,state:true,attribute:false})}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t={ATTRIBUTE:1},e=t=>(...e)=>({_$litDirective$:t,values:e});let i$1 = class i{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i;}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const n="important",i=" !"+n,o=e(class extends i$1{constructor(t$1){if(super(t$1),t$1.type!==t.ATTRIBUTE||"style"!==t$1.name||t$1.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,r)=>{const s=t[r];return null==s?e:e+`${r=r.includes("-")?r:r.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`},"")}update(e,[r]){const{style:s}=e.element;if(void 0===this.ft)return this.ft=new Set(Object.keys(r)),this.render(r);for(const t of this.ft)null==r[t]&&(this.ft.delete(t),t.includes("-")?s.removeProperty(t):s[t]=null);for(const t in r){const e=r[t];if(null!=e){this.ft.add(t);const r="string"==typeof e&&e.endsWith(i);t.includes("-")||r?s.setProperty(t,r?e.slice(0,-11):e,r?n:""):s[t]=e;}}return E}});

/** Card build version — must match card/package.json. */
const CARD_VERSION = "0.1.0";
/** Custom element tags. */
const CARD_TAG = "anyvac-card";
const EDITOR_TAG = "anyvac-card-editor";
/** Human-friendly name shown in the card picker. */
const CARD_NAME = "AnyVac Card";
const CARD_DESCRIPTION = "Modern, universal card for robot vacuums — configurable image base, interactive map, value-add insights.";
/** Default accent colour. */
const ACCENT = "#3b82f6";
/** Hold duration (ms) reserved for hold-to-confirm actions. */
const HOLD_DURATION_MS = 500;
/**
 * Raw vendor status string -> [label, accent colour].
 * Roborock-centric for the MVP (S6 / S7 / S8). Unknown statuses fall back to
 * the raw string + default accent.
 */
const STATUS_MAP = {
    cleaning: ["Cleaning", "#52c41a"],
    segment_cleaning: ["Cleaning rooms", "#52c41a"],
    zoned_cleaning: ["Zone cleaning", "#52c41a"],
    spot_cleaning: ["Spot cleaning", "#52c41a"],
    starting: ["Starting", "#52c41a"],
    segment_mopping: ["Mopping rooms", "#40a9ff"],
    zoned_mopping: ["Zone mopping", "#40a9ff"],
    robot_status_mopping: ["Mopping", "#40a9ff"],
    clean_mop_cleaning: ["Vacuuming + mopping", "#52c41a"],
    clean_mop_mopping: ["Vacuuming + mopping", "#52c41a"],
    washing_the_mop: ["Washing mop", "#9254de"],
    going_to_wash_the_mop: ["Going to wash mop", "#9254de"],
    air_drying_stopping: ["Drying mop", "#9254de"],
    returning_home: ["Returning home", "#faad14"],
    docking: ["Docking", "#faad14"],
    going_to_target: ["Going to target", "#40a9ff"],
    charging: ["Charging", "rgba(160,160,160,0.9)"],
    charging_complete: ["Fully charged", "#52c41a"],
    docked: ["Docked", "rgba(160,160,160,0.9)"],
    emptying_the_bin: ["Emptying bin", "#faad14"],
    idle: ["Idle", "rgba(160,160,160,0.7)"],
    paused: ["Paused", "#faad14"],
    mapping: ["Mapping", "#40a9ff"],
    updating: ["Updating", "#faad14"],
    error: ["Error", "#ff4d4f"],
    charging_problem: ["Charging problem", "#ff4d4f"],
    locked: ["Locked", "#ff4d4f"],
    device_offline: ["Offline", "#ff4d4f"],
};
/** Vendor states that count as "actively cleaning". */
const CLEANING_STATES = new Set([
    "cleaning", "segment_cleaning", "zoned_cleaning", "spot_cleaning",
    "segment_mopping", "zoned_mopping", "robot_status_mopping",
    "clean_mop_cleaning", "clean_mop_mopping", "starting",
]);
/** Map a raw vendor status onto the normalized VacuumActivity. */
function normalizeActivity(status) {
    if (CLEANING_STATES.has(status))
        return "cleaning";
    switch (status) {
        case "paused":
            return "paused";
        case "returning_home":
        case "docking":
        case "going_to_wash_the_mop":
            return "returning";
        case "charging":
        case "charging_complete":
            return "charging";
        case "docked":
            return "docked";
        case "idle":
            return "idle";
        case "error":
        case "charging_problem":
        case "locked":
        case "device_offline":
            return "error";
        default:
            return "unknown";
    }
}

const BADGE_BG = "rgba(30,30,30,0.85)";
const ACCENT_BG = "rgba(59,130,246,0.18)";
const ACCENT_BG_ACTIVE = "rgba(59,130,246,0.30)";
console.info(`%c ${CARD_NAME} %c v${CARD_VERSION} `, "color:#fff;background:#3b82f6;font-weight:700;border-radius:3px 0 0 3px;padding:2px 4px;", "color:#3b82f6;background:#0f172a;border-radius:0 3px 3px 0;padding:2px 4px;");
let AnyVacCard = class AnyVacCard extends i$2 {
    constructor() {
        super(...arguments);
        this._selected = {};
        this._preset = {};
        this._shown = 0;
        this._holdId = null;
        this._holdTimer = null;
        this._holdEnd = () => {
            this._cancelHold();
            this._holdId = null;
        };
    }
    static getConfigElement() {
        return document.createElement(EDITOR_TAG);
    }
    static getStubConfig() {
        return { type: `custom:${CARD_TAG}`, base: "image", vacuums: [] };
    }
    setConfig(config) {
        if (!config)
            throw new Error("Invalid configuration");
        this._config = config;
    }
    getCardSize() {
        return 7;
    }
    // ── hold-to-activate ────────────────────────────────────────────────────────
    _holdStart(id, action) {
        return (e) => {
            e.preventDefault();
            this._cancelHold();
            this._holdId = id;
            this._holdTimer = setTimeout(() => {
                this._holdTimer = null;
                this._holdId = null;
                action();
            }, HOLD_DURATION_MS);
        };
    }
    _cancelHold() {
        if (this._holdTimer !== null) {
            clearTimeout(this._holdTimer);
            this._holdTimer = null;
        }
    }
    // ── selection / preset state ───────────────────────────────────────────────
    _selectedIds(vac) {
        return this._selected[vac.entity] ?? [];
    }
    _hasSelection(vac) {
        return this._selectedIds(vac).length > 0;
    }
    _toggleRegion(vac, region) {
        const cur = new Set(this._selectedIds(vac));
        if (cur.has(region.id))
            cur.delete(region.id);
        else
            cur.add(region.id);
        this._selected = { ...this._selected, [vac.entity]: [...cur] };
    }
    _selectAll(vac) {
        this._selected = { ...this._selected, [vac.entity]: (vac.regions ?? []).map((r) => r.id) };
    }
    _clearSel(vac) {
        this._selected = { ...this._selected, [vac.entity]: [] };
    }
    _isRegionSelected(vac, region) {
        return this._selectedIds(vac).includes(region.id);
    }
    _activePresetId(vac) {
        const explicit = this._preset[vac.entity];
        if (explicit)
            return explicit;
        const ps = vac.presets ?? [];
        return (ps.find((p) => p.default) ?? ps[0])?.id ?? "";
    }
    _setPreset(vac, id) {
        this._preset = { ...this._preset, [vac.entity]: id };
    }
    _currentPreset(vac) {
        const ps = vac.presets ?? [];
        const id = this._activePresetId(vac);
        return ps.find((p) => p.id === id) ?? ps.find((p) => p.default) ?? ps[0];
    }
    // ── commands ────────────────────────────────────────────────────────────────
    async _svc(domain, service, data, target) {
        if (!this.hass)
            return;
        try {
            await this.hass.callService(domain, service, data, target);
        }
        catch (err) {
            console.error(`[anyvac-card] ${domain}.${service} failed:`, err);
        }
    }
    async _applyPreset(vac, preset) {
        if (!preset)
            return;
        if (preset.suction)
            await this._svc("vacuum", "set_fan_speed", { entity_id: vac.entity, fan_speed: preset.suction });
        if (preset.mop_mode && preset.mop_mode_entity)
            await this._svc("select", "select_option", { entity_id: preset.mop_mode_entity, option: preset.mop_mode });
        if (preset.mop_intensity && preset.mop_intensity_entity)
            await this._svc("select", "select_option", { entity_id: preset.mop_intensity_entity, option: preset.mop_intensity });
        if (preset.water && preset.water_entity)
            await this._svc("select", "select_option", { entity_id: preset.water_entity, option: preset.water });
    }
    async _clean(vac, regions, preset) {
        const strategy = vac.clean_strategy ?? "area";
        const repeat = preset?.repeats ?? 1;
        if (strategy === "script" && vac.clean_script) {
            await this._svc("script", "turn_on", {}, { entity_id: vac.clean_script });
            return;
        }
        if (strategy === "segment") {
            const segments = regions.map((r) => r.segment_id).filter((n) => typeof n === "number");
            if (!segments.length)
                return;
            await this._svc("vacuum", "send_command", {
                entity_id: vac.entity,
                command: "app_segment_clean",
                params: [{ segments, repeat }],
            });
            return;
        }
        const areaIds = regions.map((r) => r.area_id ?? r.id);
        if (!areaIds.length)
            return;
        await this._svc("vacuum", "clean_area", { cleaning_area_id: areaIds }, { entity_id: vac.entity });
    }
    async _startClean(vac) {
        const regions = (vac.regions ?? []).filter((r) => this._selectedIds(vac).includes(r.id));
        const preset = this._currentPreset(vac);
        await this._applyPreset(vac, preset);
        if (regions.length)
            await this._clean(vac, regions, preset);
        else
            await this._svc("vacuum", "start", {}, { entity_id: vac.entity });
    }
    _pause(vac) { void this._svc("vacuum", "pause", {}, { entity_id: vac.entity }); }
    _resume(vac) { void this._svc("vacuum", "start", {}, { entity_id: vac.entity }); }
    _dock(vac) { void this._svc("vacuum", "return_to_base", {}, { entity_id: vac.entity }); }
    _locate(vac) { void this._svc("vacuum", "locate", {}, { entity_id: vac.entity }); }
    // ── derived state ─────────────────────────────────────────────────────────
    _statusInfo(vac) {
        const ent = vac.status_entity ?? vac.entity;
        const s = this.hass?.states[ent]?.state ?? "unknown";
        const m = STATUS_MAP[s];
        return m ? [m[0], m[1]] : [s, ACCENT];
    }
    _isCleaning(vac) {
        return normalizeActivity(this.hass?.states[vac.entity]?.state ?? "") === "cleaning";
    }
    _isPaused(vac) {
        return (this.hass?.states[vac.entity]?.state ?? "") === "paused";
    }
    _battery(vac) {
        if (vac.battery_entity) {
            const v = Number(this.hass?.states[vac.battery_entity]?.state);
            return isNaN(v) ? null : v;
        }
        const lvl = this.hass?.states[vac.entity]?.attributes["battery_level"];
        const n = Number(lvl);
        return lvl != null && lvl !== "" && !isNaN(n) ? n : null;
    }
    _batColor(b) {
        if (b <= 20)
            return "#ff4d4f";
        if (b <= 50)
            return "#faad14";
        return "#52c41a";
    }
    _batIcon(b) {
        const r = Math.round(b / 10) * 10;
        if (r <= 0)
            return "mdi:battery-outline";
        if (r >= 100)
            return "mdi:battery";
        return `mdi:battery-${r}`;
    }
    _currentRoom(vac) {
        if (!vac.current_room_entity)
            return null;
        const s = this.hass?.states[vac.current_room_entity]?.state;
        return s && s !== "unknown" && s !== "unavailable" ? s : null;
    }
    _error(vac) {
        if (!vac.error_entity)
            return null;
        const s = this.hass?.states[vac.error_entity]?.state;
        return s && !["none", "unknown", "unavailable", ""].includes(s) ? s : null;
    }
    _progress(vac) {
        if (!vac.progress_entity)
            return null;
        const v = Number(this.hass?.states[vac.progress_entity]?.state);
        return isNaN(v) ? null : Math.max(0, Math.min(100, v));
    }
    _imageBaseSrc(vac) {
        return vac.image_base?.src;
    }
    _mapUrl(vac) {
        const ms = vac.map_source;
        if (!ms)
            return undefined;
        const ep = this.hass?.states[ms.entity]?.attributes["entity_picture"];
        return typeof ep === "string" ? ep : undefined;
    }
    _imgTransform(t) {
        const r = t?.rotation ?? 0, s = t?.scale ?? 100, ox = t?.offset_x ?? 0, oy = t?.offset_y ?? 0;
        return `translate(${ox}%, ${oy}%) rotate(${r}deg) scale(${s / 100})`;
    }
    _mapStyle(ms) {
        const r = ms?.rotation ?? 0, s = ms?.scale ?? 100, ox = ms?.offset_x ?? 0, oy = ms?.offset_y ?? 0;
        return {
            left: 50 + ox + "%",
            top: 50 + oy + "%",
            width: s + "%",
            transform: `translate(-50%, -50%) rotate(${r}deg)`,
        };
    }
    // ── render ────────────────────────────────────────────────────────────────
    render() {
        if (!this._config || !this.hass)
            return A;
        const vacuums = this._config.vacuums ?? [];
        if (!vacuums.length) {
            return b `<ha-card><div class="empty">${CARD_NAME}: add a vacuum in the editor.</div></ha-card>`;
        }
        const shownIdx = Math.min(this._shown, vacuums.length - 1);
        const vac = vacuums[shownIdx];
        return b `
      <ha-card>
        ${vacuums.length > 1
            ? b `<div class="badges-row">${vacuums.map((v, i) => this._renderBadge(v, i, shownIdx))}</div>`
            : A}
        ${this._renderBase(vac)}
        ${this._renderStatusCard(vac, shownIdx)}
      </ha-card>
    `;
    }
    _renderBadge(vac, i, shownIdx) {
        const active = i === shownIdx;
        const cleaning = this._isCleaning(vac);
        const name = vac.name ?? vac.entity.split(".")[1] ?? vac.entity;
        const bg = cleaning ? ACCENT_BG_ACTIVE : active ? ACCENT_BG : BADGE_BG;
        const border = cleaning
            ? `3px solid ${ACCENT}`
            : active
                ? `2px solid ${ACCENT}80`
                : "2px solid rgba(255,255,255,0.18)";
        const shadow = cleaning ? `0 0 18px ${ACCENT}B0` : active ? `0 0 8px ${ACCENT}50` : "none";
        return b `
      <button
        class="badge"
        style=${o({ background: bg, border, boxShadow: shadow })}
        @click=${() => (this._shown = i)}
        aria-pressed=${active ? "true" : "false"}
        aria-label=${name}
      >
        ${vac.image
            ? b `<img class="badge-img" src=${vac.image} alt=${name} />`
            : b `<ha-icon class="badge-icon" icon="mdi:robot-vacuum" style=${o({ color: ACCENT })}></ha-icon>`}
        <span class="badge-name" style=${o({ color: active ? "white" : "rgba(255,255,255,0.55)" })}>${name}</span>
      </button>
    `;
    }
    _renderBase(vac) {
        const base = vac.base ?? this._config?.base ?? "image";
        const imgSrc = this._imageBaseSrc(vac);
        const mapUrl = this._mapUrl(vac);
        const showImage = (base === "image" || base === "combined") && !!imgSrc;
        const showMap = (base === "map" || base === "combined") && !!mapUrl;
        if (!showImage && !showMap) {
            return b `<div class="map-wrap framed placeholder">
        <ha-icon icon="mdi:floor-plan"></ha-icon>
        <span>Set an image base or map source</span>
      </div>`;
        }
        const framed = !showImage;
        return b `
      <div class="map-wrap ${framed ? "framed" : ""}">
        ${showImage
            ? b `<img class="layer primary" src=${imgSrc} alt="floorplan"
              style=${o({ transform: this._imgTransform(vac.image_base) })} />`
            : A}
        ${showMap
            ? b `<img class="layer map ${showImage ? "overlay" : "seat"}" src=${mapUrl} alt="vacuum map"
              style=${o(this._mapStyle(vac.map_source))} />`
            : A}
        <div class="regions">${(vac.regions ?? []).map((r) => this._renderRegion(vac, r))}</div>
      </div>
    `;
    }
    _renderRegion(vac, region) {
        const selected = this._isRegionSelected(vac, region);
        const bn = this._config?.region_border_normal ?? 2;
        const bs = this._config?.region_border_selected ?? 4;
        const bw = (selected ? bs : bn) + "px";
        const bc = selected ? ACCENT : "rgba(255,255,255,0.5)";
        const iconHidden = this._config?.region_icon_hidden ?? false;
        const shape = region.shape;
        if (shape.kind === "rect") {
            return b `
        <button class="room-overlay" style=${o({
                left: shape.x + "%", top: shape.y + "%", width: shape.w + "%", height: shape.h + "%",
                border: `${bw} solid ${bc}`,
                background: selected ? ACCENT + "44" : "rgba(0,0,0,0.04)",
                boxShadow: selected ? `0 0 16px ${ACCENT}60` : "none",
            })}
          @click=${() => this._toggleRegion(vac, region)} title=${region.name}
          aria-pressed=${selected ? "true" : "false"}>
          ${!iconHidden && region.icon
                ? b `<ha-icon icon=${region.icon} style=${o({ color: selected ? "#fff" : bc })}></ha-icon>`
                : A}
        </button>
      `;
        }
        return b `
      <button class="room-btn" style=${o({
            left: shape.x + "%", top: shape.y + "%",
            border: `${bw} solid ${bc}`,
            background: selected ? ACCENT + "cc" : "rgba(0,0,0,0.55)",
            boxShadow: selected ? `0 0 12px ${ACCENT}80` : "none",
        })}
        @click=${() => this._toggleRegion(vac, region)} title=${region.name}
        aria-pressed=${selected ? "true" : "false"}>
        ${!iconHidden ? b `<ha-icon icon=${region.icon ?? "mdi:map-marker"}></ha-icon>` : A}
      </button>
    `;
    }
    _renderStatusCard(vac, idx) {
        const cleaning = this._isCleaning(vac);
        const name = vac.name ?? vac.entity.split(".")[1] ?? vac.entity;
        const cardBorder = cleaning ? `2px solid ${ACCENT}` : "1px solid rgba(255,255,255,0.08)";
        const cardShadow = cleaning ? `0 0 22px ${ACCENT}40` : "none";
        const imgFilter = cleaning ? `drop-shadow(0 0 20px ${ACCENT}D8)` : `drop-shadow(0 4px 12px ${ACCENT}33)`;
        return b `
      <div class="status-card" style=${o({ border: cardBorder, boxShadow: cardShadow })}>
        <div class="status-left" @click=${() => this._fireMoreInfo(vac.entity)} title="Open ${name}">
          <div class="model-label">${name}</div>
          ${vac.image
            ? b `<img class="vac-img" src=${vac.image} alt=${name}
                style=${o({ opacity: cleaning ? "0.9" : "0.6", filter: imgFilter })} />`
            : b `<ha-icon class="vac-icon" icon="mdi:robot-vacuum"
                style=${o({ color: ACCENT, opacity: cleaning ? "0.9" : "0.5" })}></ha-icon>`}
        </div>
        <div class="status-right">
          ${this._renderStatusRow(vac)}
          ${this._renderProgress(vac)}
          ${this._renderPresets(vac)}
          ${this._renderActions(vac, idx)}
        </div>
      </div>
    `;
    }
    _fireMoreInfo(entity) {
        this.dispatchEvent(new CustomEvent("hass-more-info", { detail: { entityId: entity }, bubbles: true, composed: true }));
    }
    _renderStatusRow(vac) {
        const [label, labelColor] = this._statusInfo(vac);
        const bat = this._battery(vac);
        const room = this._currentRoom(vac);
        const err = this._error(vac);
        return b `
      ${err
            ? b `<div class="error-row">
            <ha-icon icon="mdi:alert-circle" style="color:#ff4d4f"></ha-icon>
            <span style="color:#ff4d4f;font-size:12px;font-weight:600">${err}</span>
          </div>`
            : A}
      <div class="status-row">
        <div class="status-main">
          <span class="status-label" style=${o({ color: labelColor })}>${label}</span>
          ${room
            ? b `<span class="current-room">
                <ha-icon icon="mdi:map-marker" style="--mdc-icon-size:13px;color:rgba(255,255,255,0.4)"></ha-icon>${room}
              </span>`
            : A}
        </div>
        <div class="status-meta">
          ${bat !== null
            ? b `<div class="battery">
                <span style=${o({ color: this._batColor(bat) })}>${bat}&thinsp;%</span>
                <ha-icon icon=${this._batIcon(bat)} style=${o({ color: this._batColor(bat) })}></ha-icon>
              </div>`
            : A}
        </div>
      </div>
    `;
    }
    _renderProgress(vac) {
        const prog = this._progress(vac);
        if (prog === null)
            return A;
        return b `
      <div class="progress">
        <div class="progress-track">
          <div class="progress-fill" style=${o({ width: prog + "%", background: ACCENT })}></div>
        </div>
        <span class="progress-label" style=${o({ color: ACCENT })}>${prog}&thinsp;%</span>
      </div>
    `;
    }
    _renderPresets(vac) {
        const ps = vac.presets ?? [];
        if (!ps.length)
            return A;
        const activeId = this._activePresetId(vac);
        return b `
      <div class="presets">
        ${ps.map((p) => {
            const on = p.id === activeId;
            const col = p.color ?? ACCENT;
            return b `
            <button class="chip ${on ? "active" : ""}"
              style=${on ? o({ borderColor: col, color: "#fff", background: col + "33" }) : A}
              @click=${() => this._setPreset(vac, p.id)} title=${p.name}>
              ${p.icon ? b `<ha-icon icon=${p.icon}></ha-icon>` : A}<span>${p.name}</span>
            </button>
          `;
        })}
      </div>
    `;
    }
    _renderActions(vac, idx) {
        const holdMs = o({ "--hold-ms": HOLD_DURATION_MS + "ms" });
        if (this._isPaused(vac)) {
            const hId = "resume-" + idx;
            return b `
        <div class="actions">
          <button class="action-btn ${this._holdId === hId ? "action-btn--holding" : ""}"
            style=${o({ background: ACCENT_BG, border: `1px solid ${ACCENT}80`, "--hold-ms": HOLD_DURATION_MS + "ms" })}
            @pointerdown=${this._holdStart(hId, () => this._resume(vac))}
            @pointerup=${this._holdEnd} @pointerleave=${this._holdEnd} @pointercancel=${this._holdEnd}>
            <div class="hold-ring"></div>
            <ha-icon icon="mdi:play" style=${o({ color: ACCENT })}></ha-icon><span>Resume</span>
          </button>
          <button class="action-btn action-btn--secondary" @click=${() => this._dock(vac)}>
            <ha-icon icon="mdi:home" style="color:rgba(64,169,255,0.6)"></ha-icon><span>Dock</span>
          </button>
        </div>
      `;
        }
        if (this._isCleaning(vac)) {
            const hId = "pause-" + idx;
            return b `
        <div class="actions">
          <button class="action-btn action-btn--warn ${this._holdId === hId ? "action-btn--holding" : ""}"
            style=${holdMs}
            @pointerdown=${this._holdStart(hId, () => this._pause(vac))}
            @pointerup=${this._holdEnd} @pointerleave=${this._holdEnd} @pointercancel=${this._holdEnd}>
            <div class="hold-ring"></div>
            <ha-icon icon="mdi:pause" style="color:#faad14"></ha-icon><span>Pause</span>
          </button>
          <button class="action-btn action-btn--secondary" @click=${() => this._dock(vac)}>
            <ha-icon icon="mdi:home" style="color:rgba(64,169,255,0.6)"></ha-icon><span>Dock</span>
          </button>
        </div>
      `;
        }
        // idle / docked
        const hId = "start-" + idx;
        const regions = vac.regions ?? [];
        const hasRegions = regions.length > 0;
        const hasSel = this._hasSelection(vac);
        const enabled = hasRegions ? hasSel : true;
        const startBg = enabled ? ACCENT_BG : "rgba(60,60,60,0.4)";
        const startBorder = enabled ? `1px solid ${ACCENT}80` : "1px solid rgba(255,255,255,0.1)";
        const startIconColor = enabled ? ACCENT : "rgba(255,255,255,0.2)";
        const startTextColor = enabled ? "white" : "rgba(255,255,255,0.25)";
        return b `
      <div class="actions">
        <button class="action-btn ${enabled && this._holdId === hId ? "action-btn--holding" : ""}"
          style=${o({ background: startBg, border: startBorder, "--hold-ms": HOLD_DURATION_MS + "ms" })}
          ?disabled=${!enabled}
          @pointerdown=${enabled ? this._holdStart(hId, () => this._startClean(vac)) : A}
          @pointerup=${this._holdEnd} @pointerleave=${this._holdEnd} @pointercancel=${this._holdEnd}>
          <div class="hold-ring"></div>
          <ha-icon icon="mdi:rocket-launch" style=${o({ color: startIconColor })}></ha-icon>
          <div class="start-body">
            <span style=${o({ color: startTextColor })}>START</span>
            ${hasRegions
            ? b `<div class="room-icons">
                  ${regions.map((r) => b `<ha-icon icon=${r.icon || "mdi:square"}
                    style=${o({ color: this._isRegionSelected(vac, r) ? ACCENT : "rgba(255,255,255,0.15)" })}></ha-icon>`)}
                </div>`
            : A}
            ${regions.length > 1
            ? b `<div class="sel-all-row">
                  <button class="sel-link" @click=${(e) => { e.stopPropagation(); this._selectAll(vac); }}>all</button>
                  <span style="color:rgba(255,255,255,0.2)">·</span>
                  <button class="sel-link" @click=${(e) => { e.stopPropagation(); this._clearSel(vac); }}>none</button>
                </div>`
            : A}
          </div>
        </button>
        <button class="action-btn action-btn--secondary" @click=${() => this._locate(vac)} title="Locate">
          <ha-icon icon="mdi:map-marker" style="color:rgba(64,169,255,0.6)"></ha-icon>
        </button>
        <button class="action-btn action-btn--secondary" @click=${() => this._dock(vac)} title="Dock">
          <ha-icon icon="mdi:home" style="color:rgba(64,169,255,0.6)"></ha-icon>
        </button>
      </div>
    `;
    }
};
AnyVacCard.styles = i$5 `
    :host { --hold-ms: 500ms; }
    ha-card {
      position: relative;
      background: transparent;
      border: none;
      box-shadow: none;
      padding: 8px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .empty { padding: 24px; text-align: center; opacity: 0.7; }

    /* ── Badges ─────────────────────────────────────────────────────────── */
    .badges-row { display: flex; flex-wrap: wrap; gap: 8px; }
    .badge {
      position: relative; overflow: hidden; display: flex; align-items: center; gap: 10px;
      padding: 6px 18px 6px 6px; border-radius: 99px; cursor: pointer;
      backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
      transition: background 0.3s, border 0.3s, box-shadow 0.3s;
    }
    .badge-img { width: 44px; height: 44px; border-radius: 50%; object-fit: cover; flex-shrink: 0; }
    .badge-icon { width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; }
    .badge-name { font-size: 15px; font-weight: 700; white-space: nowrap; transition: color 0.3s; }

    /* ── Map / base ─────────────────────────────────────────────────────── */
    .map-wrap {
      position: relative; width: 100%; overflow: hidden; border-radius: 12px;
      background: rgba(127,127,127,0.06);
    }
    .map-wrap.framed { padding-top: 60%; }
    .map-wrap.placeholder {
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      gap: 6px; opacity: 0.55;
    }
    .map-wrap.placeholder.framed { padding-top: 0; min-height: 150px; }
    .map-wrap.placeholder ha-icon { --mdc-icon-size: 40px; }
    .layer { transform-origin: center center; }
    .layer.primary { position: relative; display: block; width: 100%; height: auto; }
    .layer.map { position: absolute; }
    .layer.map.overlay { opacity: 0.55; pointer-events: none; }
    .regions { position: absolute; inset: 0; }

    .room-overlay {
      position: absolute; border-radius: 8px; cursor: pointer;
      display: flex; align-items: center; justify-content: center; padding: 0;
      transition: background 0.2s, border 0.3s, box-shadow 0.3s;
    }
    .room-overlay ha-icon { --mdc-icon-size: 18px; }
    .room-btn {
      position: absolute; width: 40px; height: 40px; border-radius: 50%; cursor: pointer;
      display: flex; align-items: center; justify-content: center; padding: 0;
      transform: translate(-50%, -50%);
      transition: background 0.2s, box-shadow 0.2s;
    }
    .room-btn ha-icon { --mdc-icon-size: 20px; color: #fff; }

    /* ── Status card ────────────────────────────────────────────────────── */
    .status-card {
      display: grid; grid-template-columns: 140px 1fr;
      background: rgba(0,0,0,0.6);
      backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
      border-radius: 20px; overflow: hidden;
      transition: border 0.4s, box-shadow 0.4s;
    }
    .status-left {
      display: flex; flex-direction: column; align-items: center; justify-content: flex-start;
      padding: 6px 0 8px; cursor: pointer;
    }
    .model-label {
      font-size: 10px; letter-spacing: 3px; color: rgba(255,255,255,0.3);
      text-transform: uppercase; text-align: center;
    }
    .vac-img { width: 105%; object-fit: contain; display: block; transition: opacity 0.5s, filter 0.5s; }
    .vac-icon { --mdc-icon-size: 76px; margin-top: 10px; }
    .status-right { display: flex; flex-direction: column; gap: 4px; padding-top: 4px; }

    .status-row { display: flex; align-items: flex-start; justify-content: space-between; padding: 8px 12px 4px 16px; }
    .error-row { display: flex; align-items: center; gap: 6px; padding: 4px 12px 0 16px; animation: pulse-error 2s ease-in-out infinite; }
    @keyframes pulse-error { 0%,100% { opacity:1; } 50% { opacity:0.6; } }
    .status-main { display: flex; flex-direction: column; gap: 2px; }
    .status-label { font-size: 20px; font-weight: 700; }
    .current-room { display: flex; align-items: center; gap: 3px; font-size: 11px; color: rgba(255,255,255,0.45); }
    .status-meta { display: flex; flex-direction: column; align-items: flex-end; gap: 3px; flex-shrink: 0; }
    .battery { display: flex; align-items: center; gap: 3px; font-size: 11px; font-weight: 600; }
    .battery ha-icon { --mdc-icon-size: 15px; }

    /* ── Progress ───────────────────────────────────────────────────────── */
    .progress { display: flex; align-items: center; gap: 8px; padding: 0 16px 4px; }
    .progress-track { flex: 1; height: 3px; background: rgba(255,255,255,0.08); border-radius: 2px; overflow: hidden; }
    .progress-fill { height: 100%; border-radius: 2px; transition: width 0.5s ease; }
    .progress-label { font-size: 11px; font-weight: 600; flex-shrink: 0; }

    /* ── Presets ────────────────────────────────────────────────────────── */
    .presets { display: flex; flex-wrap: wrap; gap: 6px; padding: 2px 12px 4px; }
    .chip {
      display: inline-flex; align-items: center; gap: 4px; padding: 5px 10px; border-radius: 999px;
      border: 1px solid rgba(255,255,255,0.18); background: rgba(255,255,255,0.06);
      color: rgba(255,255,255,0.7); font-size: 12px; font-weight: 600; cursor: pointer;
      transition: background 0.2s, border 0.2s, color 0.2s;
    }
    .chip ha-icon { --mdc-icon-size: 15px; }

    /* ── Hold ring ──────────────────────────────────────────────────────── */
    .hold-ring {
      position: absolute; inset: 0; border-radius: inherit; background: rgba(255,255,255,0.18);
      transform: scaleX(0); transform-origin: left; pointer-events: none; z-index: 0;
    }
    .action-btn--holding .hold-ring { animation: hold-fill var(--hold-ms) linear forwards; }
    @keyframes hold-fill { from { transform: scaleX(0); } to { transform: scaleX(1); } }

    /* ── Actions ────────────────────────────────────────────────────────── */
    .actions { display: flex; gap: 8px; padding: 0 12px 14px; }
    .action-btn {
      position: relative; overflow: hidden; flex: 1;
      display: flex; align-items: center; justify-content: center; gap: 8px;
      padding: 10px 14px; border-radius: 14px; cursor: pointer; transition: opacity 0.2s;
      font-family: inherit; background: rgba(127,127,127,0.14); border: 1px solid rgba(255,255,255,0.08);
    }
    .action-btn:disabled { cursor: default; opacity: 0.7; }
    .action-btn ha-icon { --mdc-icon-size: 22px; flex-shrink: 0; position: relative; z-index: 1; }
    .action-btn span { font-size: 14px; font-weight: 700; color: white; position: relative; z-index: 1; }
    .action-btn--secondary { flex: 0 0 auto; background: rgba(64,169,255,0.08); border: 1px solid rgba(64,169,255,0.2); }
    .action-btn--warn { background: rgba(250,173,20,0.18); border: 1px solid rgba(250,173,20,0.5); }

    .start-body { display: flex; flex-direction: column; align-items: flex-start; gap: 2px; position: relative; z-index: 1; }
    .sel-all-row { display: flex; align-items: center; gap: 4px; margin-top: 1px; }
    .sel-link {
      background: none; border: none; cursor: pointer; padding: 0; font-size: 10px; font-family: inherit;
      color: rgba(255,255,255,0.3); transition: color .15s;
    }
    .sel-link:hover { color: rgba(255,255,255,0.7); }
    .room-icons { display: flex; align-items: center; gap: 4px; margin-top: 1px; }
    .room-icons ha-icon { --mdc-icon-size: 14px; }
  `;
__decorate([
    n$1({ attribute: false })
], AnyVacCard.prototype, "hass", void 0);
__decorate([
    r()
], AnyVacCard.prototype, "_config", void 0);
__decorate([
    r()
], AnyVacCard.prototype, "_selected", void 0);
__decorate([
    r()
], AnyVacCard.prototype, "_preset", void 0);
__decorate([
    r()
], AnyVacCard.prototype, "_shown", void 0);
__decorate([
    r()
], AnyVacCard.prototype, "_holdId", void 0);
AnyVacCard = __decorate([
    t$1(CARD_TAG)
], AnyVacCard);
window.customCards = window.customCards || [];
if (!window.customCards.some((c) => c.type === CARD_TAG)) {
    window.customCards.push({
        type: CARD_TAG,
        name: CARD_NAME,
        description: CARD_DESCRIPTION,
        preview: true,
        documentationURL: "https://github.com/Michailjovic/anyvac-card",
    });
}

let AnyVacCardEditor = class AnyVacCardEditor extends i$2 {
    constructor() {
        super(...arguments);
        this._tab = "vacuums";
        this._vacIndex = 0;
    }
    setConfig(config) {
        this._config = config;
    }
    // ── config mutation ─────────────────────────────────────────────────────────
    _emit(config) {
        this._config = config;
        this.dispatchEvent(new CustomEvent("config-changed", { detail: { config }, bubbles: true, composed: true }));
    }
    _update(patch) {
        this._emit({ ...this._config, ...patch });
    }
    _vacs() {
        return this._config?.vacuums ?? [];
    }
    _cfgVac(i) {
        return this._vacs()[i];
    }
    _updateVac(i, patch) {
        const vacs = [...this._vacs()];
        vacs[i] = { ...vacs[i], ...patch };
        this._update({ vacuums: vacs });
    }
    _addVac() {
        const vacs = [...this._vacs(), { entity: "" }];
        this._update({ vacuums: vacs });
        this._vacIndex = vacs.length - 1;
    }
    _removeVac(i) {
        const vacs = [...this._vacs()];
        vacs.splice(i, 1);
        this._update({ vacuums: vacs });
        if (this._vacIndex >= vacs.length)
            this._vacIndex = Math.max(0, vacs.length - 1);
    }
    _updateMapSource(i, patch) {
        const v = this._cfgVac(i);
        const ms = { kind: "roborock_image", entity: "", ...(v.map_source ?? {}), ...patch };
        this._updateVac(i, { map_source: ms });
    }
    _updateImageBase(i, patch) {
        const v = this._cfgVac(i);
        const ib = { src: "", ...(v.image_base ?? {}), ...patch };
        this._updateVac(i, { image_base: ib });
    }
    // regions
    _regions(vi) {
        return this._cfgVac(vi)?.regions ?? [];
    }
    _updateRegion(vi, ri, patch) {
        const regs = [...this._regions(vi)];
        regs[ri] = { ...regs[ri], ...patch };
        this._updateVac(vi, { regions: regs });
    }
    _setShapeKind(vi, ri, kind) {
        const cur = this._regions(vi)[ri].shape;
        const shape = kind === "rect"
            ? { kind: "rect", x: cur.x, y: cur.y, w: cur.kind === "rect" ? cur.w : 20, h: cur.kind === "rect" ? cur.h : 20 }
            : { kind: "point", x: cur.x, y: cur.y };
        this._updateRegion(vi, ri, { shape });
    }
    _setShapeCoord(vi, ri, key, val) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const sh = { ...this._regions(vi)[ri].shape };
        sh[key] = val;
        this._updateRegion(vi, ri, { shape: sh });
    }
    _addRegion(vi) {
        const regs = [...this._regions(vi)];
        const n = regs.length + 1;
        regs.push({ id: `room_${n}`, name: `Room ${n}`, shape: { kind: "rect", x: 10, y: 10, w: 25, h: 25 } });
        this._updateVac(vi, { regions: regs });
    }
    _removeRegion(vi, ri) {
        const regs = [...this._regions(vi)];
        regs.splice(ri, 1);
        this._updateVac(vi, { regions: regs });
    }
    // presets
    _presets(vi) {
        return this._cfgVac(vi)?.presets ?? [];
    }
    _updatePreset(vi, pi, patch) {
        const ps = [...this._presets(vi)];
        ps[pi] = { ...ps[pi], ...patch };
        this._updateVac(vi, { presets: ps });
    }
    _addPreset(vi) {
        const ps = [...this._presets(vi)];
        const n = ps.length + 1;
        ps.push({ id: `preset_${n}`, name: `Preset ${n}`, default: ps.length === 0 });
        this._updateVac(vi, { presets: ps });
    }
    _removePreset(vi, pi) {
        const ps = [...this._presets(vi)];
        ps.splice(pi, 1);
        this._updateVac(vi, { presets: ps });
    }
    // ── input helpers ───────────────────────────────────────────────────────────
    _val(e) {
        return e.target.value;
    }
    _checked(e) {
        return e.target.checked;
    }
    _num(e) {
        const n = Number(e.target.value);
        return isNaN(n) ? 0 : n;
    }
    // ── render ──────────────────────────────────────────────────────────────────
    render() {
        if (!this._config)
            return A;
        return b `
      <div class="editor">
        <div class="tabs">
          ${["vacuums", "map", "presets", "global"].map((t) => b `<button class="tab ${this._tab === t ? "on" : ""}" @click=${() => (this._tab = t)}>${t}</button>`)}
          <span class="ver">v${CARD_VERSION}</span>
        </div>
        ${this._tab === "vacuums" ? this._renderVacuums() : A}
        ${this._tab === "map" ? this._renderMap() : A}
        ${this._tab === "presets" ? this._renderPresets() : A}
        ${this._tab === "global" ? this._renderGlobal() : A}
      </div>
    `;
    }
    _vacPicker() {
        const vacs = this._vacs();
        if (vacs.length <= 1)
            return A;
        return b `
      <label class="row">
        <span>Vacuum</span>
        <select @change=${(e) => (this._vacIndex = Number(this._val(e)))}>
          ${vacs.map((v, i) => b `<option value=${i} ?selected=${i === this._vacIndex}>${v.name ?? v.entity}</option>`)}
        </select>
      </label>
    `;
    }
    _renderVacuums() {
        const vacs = this._vacs();
        return b `
      ${vacs.map((v, i) => b `
          <div class="block">
            <div class="block-head">
              <strong>${v.name ?? (v.entity || `Vacuum ${i + 1}`)}</strong>
              <button class="mini danger" @click=${() => this._removeVac(i)}>Remove</button>
            </div>
            <label class="row"><span>Entity</span>
              <input type="text" .value=${v.entity ?? ""} placeholder="vacuum.s8"
                @input=${(e) => this._updateVac(i, { entity: this._val(e) })} /></label>
            <label class="row"><span>Name</span>
              <input type="text" .value=${v.name ?? ""}
                @input=${(e) => this._updateVac(i, { name: this._val(e) })} /></label>
            <label class="row"><span>Base</span>
              <select @change=${(e) => this._updateVac(i, { base: this._val(e) })}>
                ${["image", "map", "combined"].map((b$1) => b `<option value=${b$1} ?selected=${(v.base ?? "image") === b$1}>${b$1}</option>`)}
              </select></label>
            <label class="row"><span>Image src</span>
              <input type="text" .value=${v.image_base?.src ?? ""} placeholder="/local/anyvac/flat.svg"
                @input=${(e) => this._updateImageBase(i, { src: this._val(e) })} /></label>
            <label class="row"><span>Map entity</span>
              <input type="text" .value=${v.map_source?.entity ?? ""} placeholder="camera.s8_map"
                @input=${(e) => this._updateMapSource(i, { entity: this._val(e) })} /></label>
            <label class="row"><span>Map kind</span>
              <select @change=${(e) => this._updateMapSource(i, { kind: this._val(e) })}>
                ${["roborock_image", "camera", "image_entity", "cloud_extractor", "valetudo"].map((k) => b `<option value=${k} ?selected=${(v.map_source?.kind ?? "roborock_image") === k}>${k}</option>`)}
              </select></label>
            <label class="row"><span>Clean strategy</span>
              <select @change=${(e) => this._updateVac(i, { clean_strategy: this._val(e) })}>
                ${["area", "segment", "script"].map((s) => b `<option value=${s} ?selected=${(v.clean_strategy ?? "area") === s}>${s}</option>`)}
              </select></label>
            ${(v.clean_strategy ?? "area") === "script"
            ? b `<label class="row"><span>Clean script</span>
                  <input type="text" .value=${v.clean_script ?? ""} placeholder="script.clean_s8"
                    @input=${(e) => this._updateVac(i, { clean_script: this._val(e) })} /></label>`
            : A}
          </div>
        `)}
      <button class="add" @click=${() => this._addVac()}>+ Add vacuum</button>
    `;
    }
    _renderMap() {
        if (!this._vacs().length)
            return b `<p class="hint">Add a vacuum first.</p>`;
        const vi = this._vacIndex;
        const ms = this._cfgVac(vi)?.map_source;
        const regs = this._regions(vi);
        return b `
      ${this._vacPicker()}
      <div class="block">
        <div class="block-head"><strong>Map transform — rotate &amp; seat</strong></div>
        <p class="hint">Live preview on the right updates as you change these.</p>
        <div class="grid4">
          <label><span>rotation°</span><input type="number" .value=${String(ms?.rotation ?? 0)}
            @input=${(e) => this._updateMapSource(vi, { rotation: this._num(e) })} /></label>
          <label><span>scale %</span><input type="number" .value=${String(ms?.scale ?? 100)}
            @input=${(e) => this._updateMapSource(vi, { scale: this._num(e) })} /></label>
          <label><span>offset x %</span><input type="number" .value=${String(ms?.offset_x ?? 0)}
            @input=${(e) => this._updateMapSource(vi, { offset_x: this._num(e) })} /></label>
          <label><span>offset y %</span><input type="number" .value=${String(ms?.offset_y ?? 0)}
            @input=${(e) => this._updateMapSource(vi, { offset_y: this._num(e) })} /></label>
        </div>
      </div>
      <p class="hint">Place clickable rooms on the base (percent of width/height). Map each to a HA Area for calibration-free cleaning.</p>
      ${regs.map((r, ri) => b `
          <div class="block">
            <div class="block-head">
              <strong>${r.name || r.id}</strong>
              <button class="mini danger" @click=${() => this._removeRegion(vi, ri)}>Remove</button>
            </div>
            <label class="row"><span>Id</span>
              <input type="text" .value=${r.id}
                @input=${(e) => this._updateRegion(vi, ri, { id: this._val(e) })} /></label>
            <label class="row"><span>Name</span>
              <input type="text" .value=${r.name}
                @input=${(e) => this._updateRegion(vi, ri, { name: this._val(e) })} /></label>
            <label class="row"><span>HA Area id</span>
              <input type="text" .value=${r.area_id ?? ""} placeholder="kitchen"
                @input=${(e) => this._updateRegion(vi, ri, { area_id: this._val(e) })} /></label>
            <label class="row"><span>Segment id</span>
              <input type="number" .value=${r.segment_id ?? ""} placeholder="(fallback)"
                @input=${(e) => this._updateRegion(vi, ri, { segment_id: this._num(e) })} /></label>
            <label class="row"><span>Icon</span>
              <input type="text" .value=${r.icon ?? ""} placeholder="mdi:silverware-fork-knife"
                @input=${(e) => this._updateRegion(vi, ri, { icon: this._val(e) })} /></label>
            <label class="row"><span>Shape</span>
              <select @change=${(e) => this._setShapeKind(vi, ri, this._val(e))}>
                <option value="rect" ?selected=${r.shape.kind === "rect"}>rect</option>
                <option value="point" ?selected=${r.shape.kind === "point"}>point</option>
              </select></label>
            <div class="grid4">
              <label><span>x%</span><input type="number" .value=${String(r.shape.x)}
                @input=${(e) => this._setShapeCoord(vi, ri, "x", this._num(e))} /></label>
              <label><span>y%</span><input type="number" .value=${String(r.shape.y)}
                @input=${(e) => this._setShapeCoord(vi, ri, "y", this._num(e))} /></label>
              ${r.shape.kind === "rect"
            ? b `
                    <label><span>w%</span><input type="number" .value=${String(r.shape.w)}
                      @input=${(e) => this._setShapeCoord(vi, ri, "w", this._num(e))} /></label>
                    <label><span>h%</span><input type="number" .value=${String(r.shape.h)}
                      @input=${(e) => this._setShapeCoord(vi, ri, "h", this._num(e))} /></label>
                  `
            : A}
            </div>
          </div>
        `)}
      <button class="add" @click=${() => this._addRegion(vi)}>+ Add room</button>
    `;
    }
    _renderPresets() {
        if (!this._vacs().length)
            return b `<p class="hint">Add a vacuum first.</p>`;
        const vi = this._vacIndex;
        const ps = this._presets(vi);
        return b `
      ${this._vacPicker()}
      <p class="hint">1–3 presets per vacuum. "How" to clean, prepared once. Mark one as default.</p>
      ${ps.map((p, pi) => b `
          <div class="block">
            <div class="block-head">
              <strong>${p.name || p.id}</strong>
              <button class="mini danger" @click=${() => this._removePreset(vi, pi)}>Remove</button>
            </div>
            <label class="row"><span>Name</span>
              <input type="text" .value=${p.name}
                @input=${(e) => this._updatePreset(vi, pi, { name: this._val(e) })} /></label>
            <label class="row"><span>Icon</span>
              <input type="text" .value=${p.icon ?? ""} placeholder="mdi:water"
                @input=${(e) => this._updatePreset(vi, pi, { icon: this._val(e) })} /></label>
            <label class="row"><span>Suction (fan_speed)</span>
              <input type="text" .value=${p.suction ?? ""} placeholder="max"
                @input=${(e) => this._updatePreset(vi, pi, { suction: this._val(e) })} /></label>
            <label class="row"><span>Mop mode</span>
              <input type="text" .value=${p.mop_mode ?? ""}
                @input=${(e) => this._updatePreset(vi, pi, { mop_mode: this._val(e) })} /></label>
            <label class="row"><span>Mop mode entity</span>
              <input type="text" .value=${p.mop_mode_entity ?? ""} placeholder="select.s8_mop_mode"
                @input=${(e) => this._updatePreset(vi, pi, { mop_mode_entity: this._val(e) })} /></label>
            <label class="row"><span>Water</span>
              <input type="text" .value=${p.water ?? ""}
                @input=${(e) => this._updatePreset(vi, pi, { water: this._val(e) })} /></label>
            <label class="row"><span>Water entity</span>
              <input type="text" .value=${p.water_entity ?? ""} placeholder="select.s8_water"
                @input=${(e) => this._updatePreset(vi, pi, { water_entity: this._val(e) })} /></label>
            <label class="row"><span>Repeats</span>
              <input type="number" min="1" .value=${String(p.repeats ?? 1)}
                @input=${(e) => this._updatePreset(vi, pi, { repeats: this._num(e) })} /></label>
            <label class="row check"><span>Default</span>
              <input type="checkbox" .checked=${p.default ?? false}
                @change=${(e) => this._updatePreset(vi, pi, { default: this._checked(e) })} /></label>
          </div>
        `)}
      <button class="add" @click=${() => this._addPreset(vi)}>+ Add preset</button>
    `;
    }
    _renderGlobal() {
        const c = this._config;
        return b `
      <label class="row"><span>Region border (normal)</span>
        <input type="number" .value=${String(c.region_border_normal ?? 2)}
          @input=${(e) => this._update({ region_border_normal: this._num(e) })} /></label>
      <label class="row"><span>Region border (selected)</span>
        <input type="number" .value=${String(c.region_border_selected ?? 4)}
          @input=${(e) => this._update({ region_border_selected: this._num(e) })} /></label>
      <label class="row check"><span>Hide region icons</span>
        <input type="checkbox" .checked=${c.region_icon_hidden ?? false}
          @change=${(e) => this._update({ region_icon_hidden: this._checked(e) })} /></label>
    `;
    }
};
AnyVacCardEditor.styles = i$5 `
    .editor { display: flex; flex-direction: column; gap: 10px; padding: 4px; }
    .tabs { display: flex; gap: 4px; align-items: center; border-bottom: 1px solid rgba(127,127,127,0.25); padding-bottom: 6px; }
    .tab { text-transform: capitalize; background: transparent; border: none; padding: 6px 10px; border-radius: 8px; cursor: pointer; font-weight: 600; color: inherit; opacity: 0.6; }
    .tab.on { opacity: 1; background: rgba(59,130,246,0.12); }
    .ver { margin-left: auto; font-size: 11px; opacity: 0.5; }
    .block { border: 1px solid rgba(127,127,127,0.22); border-radius: 10px; padding: 10px; display: flex; flex-direction: column; gap: 6px; }
    .block-head { display: flex; align-items: center; justify-content: space-between; }
    .row { display: flex; align-items: center; gap: 8px; }
    .row > span { flex: 0 0 130px; font-size: 13px; opacity: 0.85; }
    .row.check { justify-content: flex-start; }
    input, select { flex: 1 1 auto; padding: 6px 8px; border-radius: 7px; border: 1px solid rgba(127,127,127,0.35); background: var(--card-background-color, #fff); color: inherit; font: inherit; }
    input[type="checkbox"] { flex: 0 0 auto; }
    .grid4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; }
    .grid4 label { display: flex; flex-direction: column; gap: 2px; font-size: 12px; }
    .grid4 span { opacity: 0.7; }
    .add { align-self: flex-start; padding: 7px 12px; border-radius: 8px; border: 1px dashed rgba(127,127,127,0.5); background: transparent; color: inherit; cursor: pointer; font-weight: 600; }
    .mini { padding: 3px 8px; border-radius: 6px; border: none; cursor: pointer; font-size: 12px; }
    .mini.danger { background: rgba(255,77,79,0.15); color: #ff4d4f; }
    .hint { margin: 0; font-size: 12px; opacity: 0.7; }
  `;
__decorate([
    n$1({ attribute: false })
], AnyVacCardEditor.prototype, "hass", void 0);
__decorate([
    r()
], AnyVacCardEditor.prototype, "_config", void 0);
__decorate([
    r()
], AnyVacCardEditor.prototype, "_tab", void 0);
__decorate([
    r()
], AnyVacCardEditor.prototype, "_vacIndex", void 0);
AnyVacCardEditor = __decorate([
    t$1(EDITOR_TAG)
], AnyVacCardEditor);
