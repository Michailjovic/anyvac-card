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
const t$2=globalThis,i$3=t=>t,s$1=t$2.trustedTypes,e$1=s$1?s$1.createPolicy("lit-html",{createHTML:t=>t}):void 0,h="$lit$",o$3=`lit$${Math.random().toFixed(9).slice(2)}$`,n$2="?"+o$3,r$2=`<${n$2}>`,l=document,c=()=>l.createComment(""),a=t=>null===t||"object"!=typeof t&&"function"!=typeof t,u=Array.isArray,d=t=>u(t)||"function"==typeof t?.[Symbol.iterator],f="[ \t\n\f\r]",v=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m=/>/g,p=RegExp(`>|${f}(?:([^\\s"'>=/]+)(${f}*=${f}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),g=/'/g,$=/"/g,y=/^(?:script|style|textarea|title)$/i,x=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),b=x(1),w=x(2),E=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),C=new WeakMap,P=l.createTreeWalker(l,129);function V(t,i){if(!u(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==e$1?e$1.createHTML(i):i}const N=(t,i)=>{const s=t.length-1,e=[];let n,l=2===i?"<svg>":3===i?"<math>":"",c=v;for(let i=0;i<s;i++){const s=t[i];let a,u,d=-1,f=0;for(;f<s.length&&(c.lastIndex=f,u=c.exec(s),null!==u);)f=c.lastIndex,c===v?"!--"===u[1]?c=_:void 0!==u[1]?c=m:void 0!==u[2]?(y.test(u[2])&&(n=RegExp("</"+u[2],"g")),c=p):void 0!==u[3]&&(c=p):c===p?">"===u[0]?(c=n??v,d=-1):void 0===u[1]?d=-2:(d=c.lastIndex-u[2].length,a=u[1],c=void 0===u[3]?p:'"'===u[3]?$:g):c===$||c===g?c=p:c===_||c===m?c=v:(c=p,n=void 0);const x=c===p&&t[i+1].startsWith("/>")?" ":"";l+=c===v?s+r$2:d>=0?(e.push(a),s.slice(0,d)+h+s.slice(d)+o$3+x):s+o$3+(-2===d?i:x);}return [V(t,l+(t[s]||"<?>")+(2===i?"</svg>":3===i?"</math>":"")),e]};class S{constructor({strings:t,_$litType$:i},e){let r;this.parts=[];let l=0,a=0;const u=t.length-1,d=this.parts,[f,v]=N(t,i);if(this.el=S.createElement(f,e),P.currentNode=this.el.content,2===i||3===i){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes);}for(;null!==(r=P.nextNode())&&d.length<u;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(h)){const i=v[a++],s=r.getAttribute(t).split(o$3),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:l,name:e[2],strings:s,ctor:"."===e[1]?I:"?"===e[1]?L:"@"===e[1]?z:H}),r.removeAttribute(t);}else t.startsWith(o$3)&&(d.push({type:6,index:l}),r.removeAttribute(t));if(y.test(r.tagName)){const t=r.textContent.split(o$3),i=t.length-1;if(i>0){r.textContent=s$1?s$1.emptyScript:"";for(let s=0;s<i;s++)r.append(t[s],c()),P.nextNode(),d.push({type:2,index:++l});r.append(t[i],c());}}}else if(8===r.nodeType)if(r.data===n$2)d.push({type:2,index:l});else {let t=-1;for(;-1!==(t=r.data.indexOf(o$3,t+1));)d.push({type:7,index:l}),t+=o$3.length-1;}l++;}}static createElement(t,i){const s=l.createElement("template");return s.innerHTML=t,s}}function M(t,i,s=t,e){if(i===E)return i;let h=void 0!==e?s._$Co?.[e]:s._$Cl;const o=a(i)?void 0:i._$litDirective$;return h?.constructor!==o&&(h?._$AO?.(false),void 0===o?h=void 0:(h=new o(t),h._$AT(t,s,e)),void 0!==e?(s._$Co??=[])[e]=h:s._$Cl=h),void 0!==h&&(i=M(t,h._$AS(t,i.values),h,e)),i}class R{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??l).importNode(i,true);P.currentNode=e;let h=P.nextNode(),o=0,n=0,r=s[0];for(;void 0!==r;){if(o===r.index){let i;2===r.type?i=new k(h,h.nextSibling,this,t):1===r.type?i=new r.ctor(h,r.name,r.strings,this,t):6===r.type&&(i=new Z(h,this,t)),this._$AV.push(i),r=s[++n];}o!==r?.index&&(h=P.nextNode(),o++);}return P.currentNode=l,e}p(t){let i=0;for(const s of this._$AV) void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class k{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??true;}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=M(this,t,i),a(t)?t===A||null==t||""===t?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==E&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):d(t)?this.k(t):this._(t);}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t));}_(t){this._$AH!==A&&a(this._$AH)?this._$AA.nextSibling.data=t:this.T(l.createTextNode(t)),this._$AH=t;}$(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=S.createElement(V(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else {const t=new R(e,this),s=t.u(this.options);t.p(i),this.T(s),this._$AH=t;}}_$AC(t){let i=C.get(t.strings);return void 0===i&&C.set(t.strings,i=new S(t)),i}k(t){u(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const h of t)e===i.length?i.push(s=new k(this.O(c()),this.O(c()),this,this.options)):s=i[e],s._$AI(h),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,s){for(this._$AP?.(false,true,s);t!==this._$AB;){const s=i$3(t).nextSibling;i$3(t).remove(),t=s;}}setConnected(t){ void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t));}}class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,h){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=h,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=A;}_$AI(t,i=this,s,e){const h=this.strings;let o=false;if(void 0===h)t=M(this,t,i,0),o=!a(t)||t!==this._$AH&&t!==E,o&&(this._$AH=t);else {const e=t;let n,r;for(t=h[0],n=0;n<h.length-1;n++)r=M(this,e[s+n],i,n),r===E&&(r=this._$AH[n]),o||=!a(r)||r!==this._$AH[n],r===A?t=A:t!==A&&(t+=(r??"")+h[n+1]),this._$AH[n]=r;}o&&!e&&this.j(t);}j(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"");}}class I extends H{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===A?void 0:t;}}class L extends H{constructor(){super(...arguments),this.type=4;}j(t){this.element.toggleAttribute(this.name,!!t&&t!==A);}}class z extends H{constructor(t,i,s,e,h){super(t,i,s,e,h),this.type=5;}_$AI(t,i=this){if((t=M(this,t,i,0)??A)===E)return;const s=this._$AH,e=t===A&&s!==A||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,h=t!==A&&(s===A||e);e&&this.element.removeEventListener(this.name,this,s),h&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t);}}class Z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){M(this,t);}}const B=t$2.litHtmlPolyfillSupport;B?.(S,k),(t$2.litHtmlVersions??=[]).push("3.3.3");const D=(t,i,s)=>{const e=s?.renderBefore??i;let h=e._$litPart$;if(void 0===h){const t=s?.renderBefore??null;e._$litPart$=h=new k(i.insertBefore(c(),t),t,void 0,s??{});}return h._$AI(t),h};

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

const CARD_NAME = "anyvac-card";
const EDITOR_NAME = "anyvac-card-editor";
const CARD_VERSION = "0.42.0";
/** Hold duration in ms required to trigger START / PAUSE actions */
const HOLD_DURATION_MS = 600;
/**
 * Maps Roborock status strings to [human-readable label, accent colour].
 * This unified map covers S6 / S7 / S8 MaxV Ultra.
 */
const STATUS_MAP = {
    // ── Dry cleaning ──────────────────────────────────────────────────────
    cleaning: ["🧹 Cleaning", "#52c41a"],
    segment_cleaning: ["🧹 Cleaning rooms", "#52c41a"],
    zoned_cleaning: ["🧹 Zone cleaning", "#52c41a"],
    spot_cleaning: ["🎯 Spot cleaning", "#52c41a"],
    starting: ["▶️ Starting", "#52c41a"],
    // ── Wet / mop ────────────────────────────────────────────────────────
    segment_mopping: ["🫧 Mopping rooms", "#40a9ff"],
    zoned_mopping: ["🫧 Zone mopping", "#40a9ff"],
    robot_status_mopping: ["🫧 Mopping", "#40a9ff"],
    // ── Combined dry + wet ───────────────────────────────────────────────
    clean_mop_cleaning: ["🧹🫧 Vacuuming+mopping", "#52c41a"],
    clean_mop_mopping: ["🧹🫧 Vacuuming+mopping", "#52c41a"],
    segment_clean_mop_cleaning: ["🧹🫧 Rooms (vac)", "#52c41a"],
    segment_clean_mop_mopping: ["🧹🫧 Rooms (mop)", "#52c41a"],
    zoned_clean_mop_cleaning: ["🧹🫧 Zones (vac)", "#52c41a"],
    zoned_clean_mop_mopping: ["🧹🫧 Zones (mop)", "#52c41a"],
    // ── Mop washing ──────────────────────────────────────────────────────
    washing_the_mop: ["🚿 Washing mop", "#9254de"],
    washing_the_mop_2: ["🚿 Washing mop", "#9254de"],
    going_to_wash_the_mop: ["🚿 Going to wash mop", "#9254de"],
    air_drying_stopping: ["💨 Drying mop", "#9254de"],
    back_to_dock_washing_duster: ["🏠 Dock + washing", "#faad14"],
    // ── Navigation ───────────────────────────────────────────────────────
    returning_home: ["🏠 Returning home", "#faad14"],
    docking: ["🏠 Docking", "#faad14"],
    going_to_target: ["🎯 Going to target", "#40a9ff"],
    // ── Docked / idle ────────────────────────────────────────────────────
    charging: ["⚡ Charging", "rgba(255,255,255,0.75)"],
    charging_complete: ["✅ Fully charged", "#52c41a"],
    docked: ["✅ Docked", "rgba(255,255,255,0.75)"],
    charger_disconnected: ["🔌 Charger disconnected", "#faad14"],
    emptying_the_bin: ["🗑️ Emptying bin", "#faad14"],
    idle: ["💤 Idle", "rgba(255,255,255,0.45)"],
    paused: ["⏸️ Paused", "#faad14"],
    // ── Special ──────────────────────────────────────────────────────────
    mapping: ["🗺️ Mapping", "#40a9ff"],
    remote_control_active: ["🕹️ Remote control", "#40a9ff"],
    manual_mode: ["🕹️ Manual mode", "#40a9ff"],
    updating: ["⬆️ Updating", "#faad14"],
    in_call: ["📞 In call", "#faad14"],
    shutting_down: ["⏹️ Shutting down", "rgba(255,255,255,0.4)"],
    // ── Error states ─────────────────────────────────────────────────────
    error: ["❌ Error", "#ff4d4f"],
    charging_problem: ["⚠️ Charging problem", "#ff4d4f"],
    locked: ["🔒 Locked", "#ff4d4f"],
    device_offline: ["📴 Offline", "#ff4d4f"],
};
/** Colour hex values for VacuumColor variants */
const COLOR_HEX = {
    green: "#52c41a",
    blue: "#2196F3",
    orange: "#faad14",
};
/** rgba versions with reduced opacity for backgrounds */
const COLOR_BG = {
    green: "rgba(46,204,113,0.18)",
    blue: "rgba(33,150,243,0.18)",
    orange: "rgba(250,173,20,0.18)",
};
const COLOR_BG_ACTIVE = {
    green: "rgba(46,204,113,0.30)",
    blue: "rgba(33,150,243,0.30)",
    orange: "rgba(250,173,20,0.30)",
};
/**
 * States that count as "actively cleaning".
 * NOTE (docs/14 rule 4): since HA 2025 the VACUUM ENTITY state is only ever a
 * VacuumActivity enum value — of these entries it can only match "cleaning", and a
 * mid-clean mop wash even reports "docked". Never use the vacuum entity state for
 * end-of-clean detection. The raw Roborock states below remain for STATUS SENSORS
 * watched via global_actions.watch_entities.
 */
const CLEANING_STATES = new Set([
    "cleaning",
    "segment_cleaning",
    "zoned_cleaning",
    "spot_cleaning",
    "segment_mopping",
    "zoned_mopping",
    "robot_status_mopping",
    "clean_mop_cleaning",
    "clean_mop_mopping",
    "segment_clean_mop_cleaning",
    "segment_clean_mop_mopping",
    "zoned_clean_mop_cleaning",
    "zoned_clean_mop_mopping",
]);

/**
 * Auto-seating maths (docs/15): fit each vacuum map onto the shared floorplan
 * automatically, using the card's room rectangles as anchors.
 *
 * Anchor pairing is by NAME (card room key == the room name in the Roborock app ==
 * the integration's room name), so no manual clicking is needed. Each vacuum is
 * fitted INDEPENDENTLY against the floorplan — hand-drawn room differences between
 * robots don't matter, they just yield slightly different per-robot transforms and
 * show up in the residual.
 *
 * Unit convention: all fitting happens in "wrap units" where the floorplan wrap is
 * 1.0 wide and 1/AR tall (AR = wrap width/height). Map pixels are normalised by the
 * rendered map width NW, so the fitted scale is directly the CSS `width` fraction.
 */
// ── Geometry helpers (kontrakt v2: the integration publishes px, no mm here) ──
/** Rendered map pixel dimensions (rotation-aware) from the sensor's image_dims. */
function mapPxDims(dims) {
    if (!dims)
        return null;
    const sc = dims.scale ?? 1;
    let NW = (dims.width ?? 0) * sc;
    let NH = (dims.height ?? 0) * sc;
    const rot = dims.rotation ?? 0;
    if (rot === 90 || rot === 270) {
        const t = NW;
        NW = NH;
        NH = t;
    }
    return NW > 0 && NH > 0 ? { NW, NH } : null;
}
/**
 * Build fit anchors by pairing the card's floorplan rooms with the integration
 * sensor's room bboxes. Kontrakt v2: bboxes come pre-transformed in rendered-map
 * pixels (`rooms[].bbox_px`, integration ≥ 0.18) — the card does no mm math.
 */
function assembleAnchors(cardRooms, at, ar) {
    if (!at)
        return [];
    const dims = mapPxDims(at.image_dims);
    const intRooms = Array.isArray(at.rooms) ? at.rooms : [];
    if (!dims || !intRooms.length)
        return [];
    const { NW, NH } = dims;
    const out = [];
    for (const cr of cardRooms) {
        if (cr.map_x == null || cr.map_y == null)
            continue;
        const ir = intRooms.find((r) => r.name === cr.key) ?? intRooms.find((r) => r.name === cr.name);
        const bp = ir?.bbox_px;
        if (!bp || [bp.x0, bp.y0, bp.x1, bp.y1].some((v) => v == null))
            continue;
        const cxPx = (bp.x0 + bp.x1) / 2;
        const cyPx = (bp.y0 + bp.y1) / 2;
        const anchor = {
            q: { x: (cxPx - NW / 2) / NW, y: (cyPx - NH / 2) / NW },
            a: { x: cr.map_x / 100, y: cr.map_y / 100 / ar },
        };
        if (cr.map_w != null && cr.map_h != null && cr.map_w > 0 && cr.map_h > 0) {
            anchor.sizeQ = { w: (bp.x1 - bp.x0) / NW, h: (bp.y1 - bp.y0) / NW };
            anchor.sizeA = { w: cr.map_w / 100, h: cr.map_h / 100 / ar };
        }
        out.push(anchor);
    }
    return out;
}
// ── The fit ───────────────────────────────────────────────────────────────────
const RAD = Math.PI / 180;
function seatFromFrame(theta, s, c, ar, residual, n, rawTheta) {
    let rot = Math.round(theta / RAD) % 360;
    if (rot < 0)
        rot += 360;
    return {
        rotation: rot,
        scale: s * 100,
        offset_x: c.x * 100 - 50,
        offset_y: c.y * ar * 100 - 50,
        residual_pct: residual * 100,
        anchors: n,
        raw_rotation: Math.round((rawTheta / RAD) * 10) / 10,
    };
}
/**
 * Least-squares similarity fit (rotation snapped to 90° steps) mapping map anchors
 * onto floorplan anchors. Returns null when the anchors cannot determine a seat.
 */
function computeSeatFit(anchors, ar) {
    if (!anchors.length || !(ar > 0))
        return null;
    if (anchors.length >= 2) {
        const n = anchors.length;
        const qm = { x: 0, y: 0 }, am = { x: 0, y: 0 };
        for (const p of anchors) {
            qm.x += p.q.x;
            qm.y += p.q.y;
            am.x += p.a.x;
            am.y += p.a.y;
        }
        qm.x /= n;
        qm.y /= n;
        am.x /= n;
        am.y /= n;
        let numCos = 0, numSin = 0, denom = 0;
        for (const p of anchors) {
            const dqx = p.q.x - qm.x, dqy = p.q.y - qm.y;
            const dax = p.a.x - am.x, day = p.a.y - am.y;
            numCos += dqx * dax + dqy * day;
            numSin += dqx * day - dqy * dax;
            denom += dqx * dqx + dqy * dqy;
        }
        if (denom > 1e-8) {
            const rawTheta = Math.atan2(numSin, numCos);
            // Snap to the nearest 90° (Roborock maps and floorplans are axis-aligned),
            // then refit scale + translation with the snapped rotation.
            const theta = Math.round(rawTheta / (Math.PI / 2)) * (Math.PI / 2);
            const cos = Math.cos(theta), sin = Math.sin(theta);
            let num = 0;
            for (const p of anchors) {
                const dqx = p.q.x - qm.x, dqy = p.q.y - qm.y;
                const rx = cos * dqx - sin * dqy, ry = sin * dqx + cos * dqy;
                num += rx * (p.a.x - am.x) + ry * (p.a.y - am.y);
            }
            const s = num / denom;
            if (s > 1e-4) {
                const c = { x: am.x - s * (cos * qm.x - sin * qm.y), y: am.y - s * (sin * qm.x + cos * qm.y) };
                let err = 0;
                for (const p of anchors) {
                    const rx = c.x + s * (cos * p.q.x - sin * p.q.y) - p.a.x;
                    const ry = c.y + s * (sin * p.q.x + cos * p.q.y) - p.a.y;
                    err += rx * rx + ry * ry;
                }
                return seatFromFrame(theta, s, c, ar, Math.sqrt(err / n), n, rawTheta);
            }
        }
        // Degenerate spread (coincident centres) → fall through to the 1-anchor path.
    }
    // Single usable anchor: translation from centres, scale from bbox↔rect sizes,
    // orientation by testing the four axis-aligned rotations for best size agreement.
    const p = anchors.find((x) => x.sizeQ && x.sizeA) ?? null;
    if (!p || !p.sizeQ || !p.sizeA || p.sizeQ.w < 1e-6 || p.sizeQ.h < 1e-6)
        return null;
    let best = null;
    for (const k of [0, 1, 2, 3]) {
        const theta = k * (Math.PI / 2);
        const w = k % 2 === 0 ? p.sizeQ.w : p.sizeQ.h;
        const h = k % 2 === 0 ? p.sizeQ.h : p.sizeQ.w;
        const sw = p.sizeA.w / w, sh = p.sizeA.h / h;
        if (!(sw > 0) || !(sh > 0))
            continue;
        const s = Math.sqrt(sw * sh);
        const mism = Math.abs(Math.log(sw / sh));
        if (!best || mism < best.mism - 1e-9)
            best = { theta, s, mism };
    }
    if (!best)
        return null;
    const cos = Math.cos(best.theta), sin = Math.sin(best.theta);
    const c = {
        x: p.a.x - best.s * (cos * p.q.x - sin * p.q.y),
        y: p.a.y - best.s * (sin * p.q.x + cos * p.q.y),
    };
    return seatFromFrame(best.theta, best.s, c, ar, 0, 1, best.theta);
}
// ── Forward transform (room import) ──────────────────────────────────────────
/**
 * Transform an integration room bbox (rendered-map px, `bbox_px`) into floorplan
 * rectangle percentages, given a seat (auto-fitted or manual) — used by the
 * editor's room import.
 */
function roomBboxToRect(ir, at, seat, ar) {
    const dims = mapPxDims(at?.image_dims);
    const bp = ir?.bbox_px;
    if (!dims || !bp || [bp.x0, bp.y0, bp.x1, bp.y1].some((v) => v == null))
        return null;
    const { NW, NH } = dims;
    const q = { x: ((bp.x0 + bp.x1) / 2 - NW / 2) / NW, y: ((bp.y0 + bp.y1) / 2 - NH / 2) / NW };
    let w = (bp.x1 - bp.x0) / NW;
    let h = (bp.y1 - bp.y0) / NW;
    const s = seat.scale / 100;
    const theta = seat.rotation * RAD;
    const cos = Math.cos(theta), sin = Math.sin(theta);
    const c = { x: (50 + seat.offset_x) / 100, y: (50 + seat.offset_y) / 100 / ar };
    const u = { x: c.x + s * (cos * q.x - sin * q.y), y: c.y + s * (sin * q.x + cos * q.y) };
    const rot90 = Math.round(seat.rotation / 90) % 2 !== 0;
    if (rot90) {
        const tmp = w;
        w = h;
        h = tmp;
    }
    const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
    return {
        map_x: clamp(Math.round(u.x * 1000) / 10, 0, 100),
        map_y: clamp(Math.round(u.y * ar * 1000) / 10, 0, 100),
        map_w: clamp(Math.round(s * w * 1000) / 10, 2, 100),
        map_h: clamp(Math.round(s * h * ar * 1000) / 10, 2, 100),
    };
}

/**
 * layout.ts — two-profile percentage-grid layout runtime (docs/18).
 *
 * Model: two complete layout profiles (portrait / landscape), picked by the
 * aspect ratio of the available viewport — never by device type and never by
 * width breakpoints. Each profile is a CSS grid whose tracks are percentages
 * of the available viewport; the UI is a set of named regions placed into the
 * grid per profile. A region not placed in a profile is not rendered there.
 */
/**
 * Canonical docs/18 §4 default profiles (Phase B). Landscape = cockpit: map left
 * (scrolls in split mode, §7b), dock (selection + plan + orchestrated run, §7d)
 * and per-robot status cards right. Portrait = docs/12: slim badges bar, tall
 * rotated map, right thumb dock, full-width START bar. Overridable per config.
 */
const DEFAULT_PROFILES = {
    landscape: {
        columns: [70, 30],
        rows: [9, 61, 30],
        place: {
            badges: { row: 1, col: 1 },
            map: { row: "2/4", col: 1, overflow: "auto" },
            dock: { row: "1/3", col: 2 },
            status: { row: 3, col: 2, overflow: "auto" },
        },
    },
    portrait: {
        columns: [72, 28],
        rows: [8, 82, 10],
        place: {
            badges: { row: 1, col: "1/3" },
            map: { row: 2, col: 1 },
            dock: { row: 2, col: 2 },
            start: { row: 3, col: "1/3" },
        },
    },
};
/** Pick the active profile from the available viewport. */
function pickProfile(cfg, availW, availH) {
    const o = cfg?.orientation;
    if (o === "portrait" || o === "landscape")
        return o;
    if (!availW || !availH)
        return "landscape";
    return availW / availH < (cfg?.threshold ?? 1.0) ? "portrait" : "landscape";
}
/** Read the HA header height (px) from the CSS variable, 0 when absent. */
function headerPx(el) {
    try {
        const raw = getComputedStyle(el).getPropertyValue("--header-height").trim();
        const n = parseFloat(raw);
        return Number.isFinite(n) && n > 0 ? n : 0;
    }
    catch {
        return 0;
    }
}
/** Merge the profile's grid config with the built-in defaults. */
function resolveProfile(cfg, profile) {
    const p = cfg[profile] ?? {};
    const d = DEFAULT_PROFILES[profile];
    return {
        columns: p.columns?.length ? p.columns : d.columns,
        rows: p.rows?.length ? p.rows : d.rows,
        place: p.place && Object.keys(p.place).length ? p.place : d.place,
    };
}
function track(v) {
    return typeof v === "number" ? v + "%" : v;
}
function trackList(list) {
    return list.map(track).join(" ");
}
/** CSS height for the grid root. The measured refinement (innerHeight − rootTop)
 *  is applied on top of this by the card; this is the declarative fallback.
 *  `svh` (not vh/dvh) so a mobile URL-bar show/hide doesn't make the layout jump. */
function resolveHeightCss(cfg) {
    const h = cfg.height ?? "viewport";
    if (h === "viewport")
        return "calc(100svh - var(--header-height, 0px))";
    if (h === "container")
        return "100%";
    return h;
}
/** Inline styles for the grid root (static styles can't express a dynamic grid). */
function gridRootStyles(cfg, prof) {
    return {
        display: "grid",
        width: "100%",
        height: resolveHeightCss(cfg),
        alignContent: "start",
        gridTemplateColumns: trackList(prof.columns),
        gridTemplateRows: trackList(prof.rows),
        gap: cfg.gap ?? "6px",
        boxSizing: "border-box",
    };
}
/** Inline styles for a region wrapper. `position:relative` keeps absolutely
 *  positioned children (map overlays, layer toggles) correct in both profiles. */
function regionStyles(place) {
    const s = {
        gridRow: String(place.row ?? "auto"),
        gridColumn: String(place.col ?? "1"),
        overflow: place.overflow ?? "hidden",
        position: "relative",
        minWidth: "0",
        minHeight: "0",
    };
    if (place.align && place.align !== "stretch")
        s.alignSelf = place.align;
    return s;
}

var _a;
console.info(`%c ANYVAC-CARD %c v${CARD_VERSION} `, "background:#2196F3;color:#fff;font-weight:700;padding:2px 4px;border-radius:3px 0 0 3px", "background:#1a1a1a;color:#fff;font-weight:400;padding:2px 4px;border-radius:0 3px 3px 0");
let AnyVacCard = class AnyVacCard extends i$2 {
    constructor() {
        super(...arguments);
        /** Set by Lovelace when the dashboard is in edit mode */
        this.editMode = false;
        this._shownSet = new Set([0]);
        /** ID of the button currently being held — drives the fill animation */
        this._holdId = null;
        this._mapMode = "normal";
        this._modeEntity = null;
        this._dbg = "";
        this._zoneDrag = null;
        this._zonePending = null;
        this._layers = { dry: true, wet: false };
        this._layerMenu = null;
        this._layerHoldTimer = null;
        this._layerHeld = false;
        /** Výběr místností — drží se lokálně v kartě (bez potřeby input_boolean helper entity) */
        this._localRoomSel = new Map();
        /** Active setting preset per vacuum (Manual mode): vac.entity -> preset id. */
        this._activePresets = new Map();
        /** Plan preview mode (Auto): which passes to plan/run. */
        this._planMode = "both";
        /** Currently selected global preset id (Auto): tiles select, the plan runs. */
        this._activeGlobalPreset = null;
        /** Responsive: measured card width + map aspect ratio (W/H) for portrait rotation. */
        this._cardW = 0;
        this._mapAR = 3.636;
        /** Active layout profile (docs/18) — picked by viewport aspect ratio. */
        this._profile = "landscape";
        /** Measured inner box of the map region (grid mode) for the exact rotated fit. */
        this._mapRegW = 0;
        this._mapRegH = 0;
        this._ro = null;
        this._onWinResize = null;
        this._measureRaf = 0;
        /** Per-second clock for the debug progress timers (mm:ss). Only ticks while a vacuum is
         *  cleaning/paused and debug_room_progress is on, so it does not re-render otherwise. */
        this._now = Date.now();
        this._tickTimer = null;
        // NOTE (docs/14 canon): the card holds NO cleaning-session state. Tracking, history,
        // estimates and room detection live in the anyvac integration — the card only renders
        // sensor data and sends intents.
        this._holdTimer = null;
        this._initialized = false;
        /** Entities whose state changes should trigger a re-render */
        this._watched = null;
        /** Integration sensor for a vacuum: explicit config, else auto-resolved from the
         *  entity registry — the AnyVac map sensor sits on the SAME device as the vacuum
         *  entity (platform "anyvac"), so no manual plumbing is needed (docs/14 Fáze 3). */
        this._intCache = new Map();
        this._autoCache = new Map();
        this._holdEnd = () => {
            this._cancelHold();
        };
        /** Backend plan preview (anyvac.plan, response-only): room key -> vacuum entity. */
        this._planPreview = null;
        this._planFetchKey = "";
        /** Learn the floorplan's aspect ratio once it loads, for the rotation maths. */
        this._onFloorplanLoad = (e) => {
            const img = e.target;
            if (img?.naturalWidth && img.naturalHeight) {
                const ar = img.naturalWidth / img.naturalHeight;
                if (ar > 0.1 && Math.abs(ar - this._mapAR) > 0.01)
                    this._mapAR = ar;
            }
        };
    }
    // ── Lovelace card API ───────────────────────────────────────────────────
    static getConfigElement() {
        return document.createElement(EDITOR_NAME);
    }
    static getStubConfig() {
        return {
            type: `custom:${CARD_NAME}`,
            vacuums: [
                {
                    entity: "vacuum.my_roborock",
                    name: "Roborock",
                    color: "green",
                    rooms: [],
                    clean_action: { type: "native" },
                },
            ],
        };
    }
    setConfig(config) {
        if (!config.vacuums || !Array.isArray(config.vacuums) || config.vacuums.length === 0) {
            throw new Error("[anyvac-card] 'vacuums' must be a non-empty array");
        }
        this._config = config;
        this._watched = null;
        if (!this._initialized) {
            this._initialized = true;
            this._shownSet = this._loadShown();
            this._localRoomSel = this._loadRoomSel();
        }
        else {
            const valid = new Set();
            for (const i of this._shownSet) {
                if (i < config.vacuums.length)
                    valid.add(i);
            }
            this._shownSet = valid.size > 0 ? valid : new Set(config.vacuums.map((_, i) => i));
        }
    }
    getCardSize() {
        return 6;
    }
    // ── Lifecycle ───────────────────────────────────────────────────────────
    connectedCallback() {
        super.connectedCallback();
        this.style.setProperty("--hold-ms", HOLD_DURATION_MS + "ms");
        if (!this._ro && typeof ResizeObserver !== "undefined") {
            this._ro = new ResizeObserver(() => this._scheduleMeasure());
            this._ro.observe(this);
        }
        if (!this._onWinResize) {
            this._onWinResize = () => this._scheduleMeasure();
            window.addEventListener("resize", this._onWinResize, { passive: true });
            window.addEventListener("orientationchange", this._onWinResize, { passive: true });
        }
        this._scheduleMeasure();
        if (!this._tickTimer) {
            this._tickTimer = window.setInterval(() => {
                // Only re-render (update the clock) when debug progress is on AND a vacuum is
                // mid-clean or paused — otherwise stay idle to avoid needless re-renders.
                if (this._config?.debug_room_progress &&
                    (this._config.vacuums ?? []).some((v) => this._isCleaning(v) || this._isPaused(v))) {
                    this._now = Date.now();
                }
            }, 1000);
        }
    }
    /** Coalesce all width re-measures into one rAF tick (RO + window resize +
     *  orientationchange). Also re-picks the layout profile (docs/18) from the
     *  available viewport ratio and refines the grid height. */
    _scheduleMeasure() {
        if (this._measureRaf)
            return;
        this._measureRaf = requestAnimationFrame(() => {
            this._measureRaf = 0;
            const w = Math.round(this.getBoundingClientRect().width);
            if (w && Math.abs(w - this._cardW) >= 2)
                this._cardW = w;
            const lay = this._config?.layout;
            if (lay) {
                const hh = headerPx(this);
                const p = pickProfile(lay, window.innerWidth, Math.max(1, window.innerHeight - hh));
                if (p !== this._profile)
                    this._profile = p;
                this._refineGridHeight();
            }
        });
    }
    /** Measured refinement of the grid height: innerHeight − rootTop beats the raw
     *  `calc(100svh − header)` when the root is offset (padding, safe-area). Applied
     *  directly to the element — no state, no re-render loop. */
    _refineGridHeight() {
        const lay = this._config?.layout;
        if (!lay)
            return;
        const root = this.renderRoot?.querySelector(".avc-grid");
        if (!root)
            return;
        if ((lay.height ?? "viewport") === "viewport") {
            const top = root.getBoundingClientRect().top;
            if (top >= 0 && top < window.innerHeight) {
                const h = Math.round(window.innerHeight - top);
                if (h > 120)
                    root.style.height = h + "px";
            }
        }
        // Measure the map region for the exact rotated-map fit (docs/18 §7). Guarded
        // by a ±2 px threshold so the update→measure cycle settles instead of looping.
        const reg = this.renderRoot?.querySelector(".avc-region--map");
        if (reg) {
            const w = Math.round(reg.clientWidth);
            const h2 = Math.round(reg.clientHeight);
            if (w && Math.abs(w - this._mapRegW) >= 2)
                this._mapRegW = w;
            if (h2 && Math.abs(h2 - this._mapRegH) >= 2)
                this._mapRegH = h2;
        }
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this._cancelHold();
        if (this._measureRaf) {
            cancelAnimationFrame(this._measureRaf);
            this._measureRaf = 0;
        }
        if (this._tickTimer) {
            clearInterval(this._tickTimer);
            this._tickTimer = null;
        }
        if (this._onWinResize) {
            window.removeEventListener("resize", this._onWinResize);
            window.removeEventListener("orientationchange", this._onWinResize);
            this._onWinResize = null;
        }
        if (this._ro) {
            this._ro.disconnect();
            this._ro = null;
        }
    }
    firstUpdated() {
        // Seed the width immediately; the ResizeObserver may not fire before the
        // first paint (and never fires if the host has no layout box yet).
        const w = Math.round(this.getBoundingClientRect().width);
        if (w)
            this._cardW = w;
        this._scheduleMeasure();
    }
    updated() {
        // Grid mode: re-apply the measured height after every render (the declarative
        // svh calc stays as the pre-measure fallback).
        this._refineGridHeight();
    }
    /**
     * Re-render only when a relevant entity changed — the hass object is
     * replaced on every state change anywhere in HA.
     */
    shouldUpdate(changed) {
        if (!changed.has("hass") || changed.size > 1)
            return true;
        const old = changed.get("hass");
        if (!old || !this._config)
            return true;
        for (const id of this._watchedEntities()) {
            if (old.states[id] !== this.hass.states[id])
                return true;
        }
        return false;
    }
    _watchedEntities() {
        if (this._watched)
            return this._watched;
        const s = new Set();
        for (const vac of this._config?.vacuums ?? []) {
            for (const id of [vac.entity, vac.status_entity, vac.battery_entity,
                vac.last_clean_entity, vac.progress_entity, vac.current_room_entity,
                vac.error_entity, vac.map?.entity, this._intEntity(vac),
                ...Object.values(this._autoEntities(vac))]) {
                if (id)
                    s.add(id);
            }
            for (const r of this._roomsFor(vac)) {
                if (r.last_clean_entity)
                    s.add(r.last_clean_entity);
                if (r.clean_time_entity)
                    s.add(r.clean_time_entity);
            }
        }
        for (const ga of this._config?.global_actions ?? []) {
            for (const e of ga.watch_entities ?? [])
                if (e)
                    s.add(e);
        }
        // Don't freeze the list before the entity registry is loaded — the auto-resolved
        // sibling sensors (status/battery/room/error) would otherwise never be watched.
        if (this.hass?.entities)
            this._watched = s;
        return s;
    }
    // ── Helpers ─────────────────────────────────────────────────────────────
    _color(vac) {
        return COLOR_HEX[vac.color ?? "green"] ?? COLOR_HEX["green"];
    }
    _colorKey(vac) {
        return vac.color ?? "green";
    }
    _intEntity(vac) {
        if (vac.integration_entity)
            return vac.integration_entity;
        const reg = this.hass?.entities;
        if (!reg || !vac.entity)
            return undefined;
        if (this._intCache.has(vac.entity))
            return this._intCache.get(vac.entity);
        const dev = reg[vac.entity]?.device_id;
        const found = dev
            ? Object.keys(reg).find((id) => reg[id]?.device_id === dev && reg[id]?.platform === "anyvac" && id.startsWith("sensor."))
            : undefined;
        this._intCache.set(vac.entity, found);
        return found;
    }
    /** Kontrakt v2 gate: attributes of the vacuum's integration sensor, only when the
     *  integration speaks schema_version ≥ 2. Older backends → smart features off. */
    _intAttrs(vac) {
        const ent = this._intEntity(vac);
        const at = ent ? this.hass.states[ent]?.attributes : undefined;
        if (!at)
            return undefined;
        return (at.schema_version ?? 0) >= 2 ? at : undefined;
    }
    /** Human-readable warning when an integration sensor exists but speaks an old schema. */
    _schemaWarning() {
        for (const v of this._config?.vacuums ?? []) {
            const ent = this._intEntity(v);
            const at = ent ? this.hass.states[ent]?.attributes : undefined;
            if (at && (at.schema_version ?? 0) < 2) {
                return `AnyVac integration is too old for this card (schema ${at.schema_version ?? 1} < 2). ` +
                    "Update the anyvac integration to ≥ 0.18.0.";
            }
        }
        return null;
    }
    /** Resolve a vacuum's sibling entities (battery/status/last-clean/progress/room/error) from its
     *  device, so the user does not have to fill them in. Matched by translation_key / device_class. */
    _autoEntities(vac) {
        const reg = this.hass?.entities;
        if (!reg || !vac.entity)
            return {};
        const cached = this._autoCache.get(vac.entity);
        if (cached)
            return cached;
        const dev = reg[vac.entity]?.device_id;
        if (!dev)
            return {};
        const sibs = Object.keys(reg).filter((id) => reg[id]?.device_id === dev);
        const byTk = (tk) => sibs.find((id) => reg[id]?.translation_key === tk);
        const byDc = (dc) => sibs.find((id) => this.hass.states[id]?.attributes?.device_class === dc);
        const out = {
            status: byTk("status"),
            battery: byDc("battery"),
            last_clean: byTk("last_clean_end"),
            progress: byTk("clean_percent"),
            current_room: byTk("current_room"),
            error: byTk("vacuum_error"),
        };
        this._autoCache.set(vac.entity, out);
        return out;
    }
    _ent(vac, kind) {
        const explicit = vac[kind + "_entity"];
        return explicit ?? this._autoEntities(vac)[kind];
    }
    _statusInfo(vac) {
        const raw = this.hass.states[this._ent(vac, "status") ?? vac.entity]?.state ?? "unknown";
        return STATUS_MAP[raw] ?? [raw, "rgba(255,255,255,0.5)"];
    }
    _isCleaning(vac) {
        return CLEANING_STATES.has(this.hass.states[vac.entity]?.state ?? "");
    }
    _isPaused(vac) {
        return this.hass.states[vac.entity]?.state === "paused";
    }
    _battery(vac) {
        const bid = this._ent(vac, "battery");
        if (!bid)
            return null;
        const n = parseInt(this.hass.states[bid]?.state ?? "");
        return isNaN(n) ? null : n;
    }
    _lastCleanStr(vac) {
        const lid = this._ent(vac, "last_clean");
        const raw = lid ? this.hass.states[lid]?.state : undefined;
        if (!raw || raw === "unavailable" || raw === "unknown")
            return "—";
        const d = new Date(raw);
        const diff = Math.floor((Date.now() - d.getTime()) / 86400000);
        const t = d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        if (diff === 0)
            return "Today · " + t;
        if (diff === 1)
            return "Yesterday · " + t;
        return d.toLocaleDateString([], { day: "2-digit", month: "2-digit" }) + " · " + t;
    }
    _progress(vac) {
        const pid = this._ent(vac, "progress");
        if (!pid)
            return null;
        const n = parseInt(this.hass.states[pid]?.state ?? "");
        return isNaN(n) || n === 0 ? null : n;
    }
    /** First integration sensor that exposes the shared (backend) selection. */
    _selSensor() {
        for (const v of this._config.vacuums) {
            const ent = this._intEntity(v);
            if (ent && Array.isArray(this.hass.states[ent]?.attributes?.selected_rooms))
                return ent;
        }
        return undefined;
    }
    /** Shared room selection (card-level, by room key) from the backend, or null when
     *  no integration is available (then the card falls back to local state). */
    _backendSel() {
        const ent = this._selSensor();
        if (!ent)
            return null;
        return new Set(this.hass.states[ent]?.attributes?.selected_rooms ?? []);
    }
    _setBackendSel(rooms, mode) {
        this._call("anyvac", "select_rooms", { rooms, mode });
    }
    _isRoomSelected(room, vac) {
        const be = this._backendSel();
        if (be)
            return be.has(room.key);
        return this._localRoomSel.get(vac.entity + ":" + room.key) ?? false;
    }
    /** Effective dry/wet layer visibility: the backend-shared state when the integration
     *  provides it (persists refreshes + syncs across devices, like the room selection),
     *  else the local component state. */
    _layersEff() {
        const ent = this._selSensor();
        const vl = ent ? this.hass.states[ent]?.attributes?.view_layers : undefined;
        if (vl && typeof vl.dry === "boolean" && typeof vl.wet === "boolean") {
            return { dry: vl.dry, wet: vl.wet };
        }
        return this._layers;
    }
    /** Rooms for a vacuum: card-level `rooms` if defined (merged config), else the vacuum's own. */
    _roomsFor(vac) {
        return (this._config.rooms?.length ? this._config.rooms : vac.rooms) ?? [];
    }
    _hasSelectedRooms(vac) {
        return (this._roomsFor(vac)).some((r) => this._isRoomSelected(r, vac));
    }
    /** Resolve a vacuum to a single current clean type ("dry"/"wet").
     *  Prefers the live backend signal (integration sensor `clean_type`, which
     *  follows the actual water mode), then the configured clean_action. This is
     *  what makes a dual-capable vacuum (clean_type: both) pick the right estimate. */
    _liveCleanType(vac) {
        // 1) When the vacuum has selectable presets, the active one is the user's
        //    current intent — derive its mode from its values (so picking "Mokrý"
        //    flips the estimate to wet immediately, before the clean even starts).
        if ((vac.presets?.length ?? 0) >= 2) {
            const ap = this._activePreset(vac);
            const wet = (ap.mop_intensity != null && ap.mop_intensity !== "" && ap.mop_intensity !== "off")
                || (ap.mop_mode != null && ap.mop_mode !== "");
            return wet ? "wet" : "dry";
        }
        // 2) Live backend signal (follows the actual water mode).
        const ct = this._intAttrs(vac)?.clean_type;
        if (ct === "wet" || ct === "dry")
            return ct;
        // 3) Fallback: the vacuum's configured role (wet-only robots default to wet).
        const role = this._vacCleanType(vac);
        return role.wet && !role.dry ? "wet" : "dry";
    }
    /** Self-calibrated clean-time estimate learned by the backend integration,
     *  per room name + type (dry/wet). Null when no integration / no learned value. */
    _backendEstimate(vac, room, kind) {
        const re = this._intAttrs(vac)?.rooms_estimate;
        if (!re)
            return null;
        const rec = re[room.name ?? ""] ?? re[room.key];
        const v = rec ? rec[kind] : undefined;
        return (typeof v === "number" && v > 0) ? v : null;
    }
    _roomCleanMins(room, vac) {
        const ct = this._vacCleanType(vac);
        // Dual-capable vacuum (both dry+wet) must resolve to the CURRENT live mode,
        // otherwise a dry run falls back to the wet estimate (and vice versa).
        const useWet = (ct.wet && !ct.dry) ? true
            : (ct.dry && !ct.wet) ? false
                : (this._liveCleanType(vac) === "wet");
        // 1) Backend self-calibrated estimate (learned from real single-room cleans).
        const learned = this._backendEstimate(vac, room, useWet ? "wet" : "dry");
        if (learned != null)
            return learned;
        // 2) Static config for the matching type, then the other type as a last resort.
        const primary = useWet ? room.clean_time_wet : room.clean_time_dry;
        if (primary != null && primary > 0)
            return primary;
        const alt = useWet ? room.clean_time_dry : room.clean_time_wet;
        if (alt != null && alt > 0)
            return alt;
        if (room.clean_time_entity) {
            const val = parseFloat(this.hass.states[room.clean_time_entity]?.state ?? "");
            if (!isNaN(val) && val > 0)
                return val;
        }
        return room.clean_time_mins ?? 0;
    }
    _totalCleanMins(vac) {
        return (this._roomsFor(vac)).reduce((sum, r) => {
            if (!this._isRoomSelected(r, vac))
                return sum;
            return sum + this._roomCleanMins(r, vac);
        }, 0);
    }
    _intRoomRec(vac, room) {
        const rlc = this._intAttrs(vac)?.rooms_last_cleaned;
        if (!rlc)
            return null;
        return (rlc[room.key] ?? rlc[room.name ?? ""] ?? null);
    }
    _ageDaysFromIso(iso) {
        if (!iso)
            return null;
        const t = new Date(iso).getTime();
        return isNaN(t) ? null : (Date.now() - t) / 86400000;
    }
    /** Room age in days. With an integration sensor, uses last_dry/last_wet/any per the active
     *  layer(s) (both on -> the worse/older); otherwise falls back to the last_clean helper entity. */
    _roomAgeDays(room, vac) {
        if (vac) {
            const rec = this._intRoomRec(vac, room);
            if (rec) {
                const dry = this._ageDaysFromIso(rec.dry);
                const wet = this._ageDaysFromIso(rec.wet);
                const any = this._ageDaysFromIso(rec.any);
                const L = this._layersEff();
                const dOn = L.dry, wOn = L.wet;
                let d;
                if (dOn && wOn)
                    d = Math.max(dry ?? 9999, wet ?? 9999);
                else if (dOn)
                    d = dry;
                else if (wOn)
                    d = wet;
                else
                    d = any;
                if (d !== null)
                    return d;
            }
        }
        if (!room.last_clean_entity)
            return null;
        const raw = this.hass.states[room.last_clean_entity]?.state;
        if (!raw || raw === "unavailable" || raw === "unknown")
            return null;
        return (Date.now() - new Date(raw).getTime()) / 86400000;
    }
    _colorForAgeDays(d) {
        if (d === null)
            return "rgba(255,77,77,0.85)";
        const ths = this._config.room_thresholds ?? [
            { days: 2, color: "rgba(46,204,113,0.85)" },
            { days: 5, color: "rgba(250,173,20,0.85)" },
            { days: 10, color: "rgba(255,152,0,0.85)" },
        ];
        const sorted = [...ths].sort((a, b) => a.days - b.days);
        for (const th of sorted) {
            if (d <= th.days)
                return th.color;
        }
        return "rgba(255,77,77,0.85)";
    }
    /** A vacuum's clean-type role (dry/wet) — explicit config, else derived from its clean_action. */
    _vacCleanType(vac) {
        if (vac.clean_type === "dry")
            return { dry: true, wet: false };
        if (vac.clean_type === "wet")
            return { dry: false, wet: true };
        if (vac.clean_type === "both")
            return { dry: true, wet: true };
        const ca = vac.clean_action;
        const wet = !!(ca && (ca.mop_mode || ca.mop_mode_entity || ca.mop_intensity || ca.mop_intensity_entity));
        const dry = !wet || (ca?.suction_level != null && ca.suction_level !== "off");
        return { dry, wet };
    }
    _roomBorderColor(room, vac) {
        return this._colorForAgeDays(this._roomAgeDays(room, vac));
    }
    /** Debug: per-room cleaning progress from the integration (rooms_progress). */
    _roomProgress(vac, room) {
        const rp = this._intAttrs(vac)?.rooms_progress;
        if (!rp)
            return null;
        return (rp[room.key] ?? rp[room.name ?? ""] ?? null);
    }
    /** Per-clean-type coverage for a room (dry from the vacuum trace, wet from the mop
     *  trace), taken from whichever vacuum has the highest value and coloured by it. Used
     *  by the per-layer (dry/wet) room menus. */
    _roomProgForType(room, vacs, type) {
        let best = null;
        let bestVac = null;
        let bestCal = false;
        for (const v of vacs) {
            const p = this._roomProgress(v, room);
            if (!p)
                continue;
            const val = type === "dry" ? p.dry_pct : p.wet_pct;
            if (val !== null && val !== undefined && (best === null || val > best)) {
                best = val;
                bestVac = v;
                bestCal = !!(type === "dry" ? p.dry_calibrating : p.wet_calibrating);
            }
        }
        if (best === null || !bestVac)
            return null;
        return { pct: best, kind: "S", title: `${type} coverage ${best}%`, color: this._color(bestVac), calibrating: bestCal };
    }
    _progColor(pct) {
        return pct >= 90 ? "#52c41a" : pct >= 50 ? "#faad14" : "#40a9ff";
    }
    /** Dry + wet mini gauges in the room's corner (debug_room_progress). Values are
     *  aggregated ACROSS the given vacuums — in merged mode the old single gauge read
     *  only the representative (first) vacuum, so most rooms showed nothing (docs/16 §1).
     *  Dry ring wears the best dry vacuum's colour; wet ring is always wet-blue. */
    _renderRoomGauge(vacs, room) {
        if (!this._config.debug_room_progress)
            return A;
        const dry = this._roomProgForType(room, vacs, "dry");
        const wet = this._roomProgForType(room, vacs, "wet");
        if (!dry && !wet)
            return A;
        const g = (pct, title, ring, calibrating) => b `
      <span class="room-gauge" title=${title}
        style=${o({ background: `conic-gradient(${ring} ${pct * 3.6}deg, rgba(255,255,255,0.12) 0)` })}>
        <span>${pct}${calibrating ? "~" : ""}</span>
      </span>`;
        return b `<div class="room-gauges">
      ${dry ? g(dry.pct, "dry · " + dry.title, dry.color, dry.calibrating) : A}
      ${wet ? g(wet.pct, "wet · " + wet.title, "#40a9ff", wet.calibrating) : A}
    </div>`;
    }
    /** Inline % chip for the room menus (debug only). Coloured by the vacuum when provided. */
    _renderProgChip(p) {
        if (!this._config.debug_room_progress || !p)
            return A;
        return b `<span class="rl-prog" title=${p.title}
      style=${o({ color: p.color ?? this._progColor(p.pct) })}>${p.pct}${p.calibrating ? "~" : ""}%<small>${p.kind}</small></span>`;
    }
    _batIcon(pct) {
        if (pct > 80)
            return "mdi:battery";
        if (pct > 50)
            return "mdi:battery-60";
        if (pct > 20)
            return "mdi:battery-30";
        return "mdi:battery-10";
    }
    _batColor(pct) {
        if (pct > 50)
            return "#52c41a";
        if (pct > 20)
            return "#faad14";
        return "#ff4d4f";
    }
    _mapUrl(entity) {
        const state = this.hass.states[entity];
        if (!state)
            return "";
        const pic = state.attributes["entity_picture"];
        if (!pic)
            return "";
        const ts = new Date(state.last_updated).getTime();
        const sep = pic.includes("?") ? "&" : "?";
        return this.hass.hassUrl(pic + sep + "_t=" + ts);
    }
    _timeStr(mins) {
        const total = Math.round(mins);
        if (total <= 0)
            return "";
        if (total >= 60) {
            const h = Math.floor(total / 60);
            const m = total % 60;
            return m > 0 ? "~" + h + " h " + m + " min" : "~" + h + " h";
        }
        return "~" + total + " min";
    }
    // ── Global action helpers ───────────────────────────────────────────────
    /** True if any watched entity is in a cleaning state */
    _isGlobalActive(ga) {
        return (ga.watch_entities ?? []).some((e) => CLEANING_STATES.has(this.hass.states[e]?.state ?? ""));
    }
    async _triggerGlobal(ga) {
        const action = ga.action;
        try {
            if (action.type === "script") {
                await this.hass.callService("script", "turn_on", {
                    entity_id: action.entity_id,
                    variables: action.variables ?? {},
                });
            }
            else {
                const [domain, svc] = action.service.split(".");
                await this.hass.callService(domain, svc, action.data ?? {});
            }
        }
        catch (err) {
            console.error("[anyvac-card] global action failed:", err);
        }
    }
    // ── Hold-action helpers ─────────────────────────────────────────────────
    _cancelHold() {
        if (this._holdTimer !== null) {
            clearTimeout(this._holdTimer);
            this._holdTimer = null;
        }
        this._holdId = null;
    }
    /**
     * Returns a pointerdown handler that:
     *  1. Sets _holdId to `id` (triggers fill animation)
     *  2. Fires `action` after HOLD_DURATION_MS
     */
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
    _toggleShown(index) {
        // Portrait grid = single-vacuum focus (docs/18 §7b): a badge tap SWITCHES the
        // focused vacuum instead of toggling set membership — no room for more on a phone.
        if (this._config.layout && this._profile === "portrait") {
            this._shownSet = new Set([index]);
            this._saveShown();
            return;
        }
        const next = new Set(this._shownSet);
        if (next.has(index)) {
            if (next.size > 1)
                next.delete(index);
        }
        else {
            next.add(index);
        }
        this._shownSet = next;
        this._saveShown();
    }
    // ── Service calls ───────────────────────────────────────────────────────
    async _call(domain, service, data) {
        try {
            await this.hass.callService(domain, service, data);
        }
        catch (err) {
            console.error("[anyvac-card] " + domain + "." + service + " failed:", err);
        }
    }
    _fireMoreInfo(entityId) {
        this.dispatchEvent(new CustomEvent("hass-more-info", {
            bubbles: true, composed: true, detail: { entityId },
        }));
    }
    // ── localStorage persistence ──────────────────────────────────────────────
    _saveShown() {
        try {
            const ids = [...this._shownSet].map(i => this._config.vacuums[i]?.entity).filter(Boolean);
            localStorage.setItem("roborock-card:shown", JSON.stringify(ids));
        }
        catch { /* storage unavailable */ }
    }
    _loadShown() {
        try {
            const raw = localStorage.getItem("roborock-card:shown");
            if (raw) {
                const ids = JSON.parse(raw);
                const indices = ids
                    .map(id => this._config.vacuums.findIndex(v => v.entity === id))
                    .filter(i => i >= 0);
                if (indices.length > 0)
                    return new Set(indices);
            }
        }
        catch { /* ignore */ }
        return new Set(this._config.vacuums.map((_, i) => i));
    }
    _saveRoomSel(vacEntity) {
        try {
            const prefix = vacEntity + ":";
            const sel = {};
            for (const [k, v] of this._localRoomSel.entries()) {
                if (k.startsWith(prefix))
                    sel[k.slice(prefix.length)] = v;
            }
            localStorage.setItem("roborock-card:sel:" + vacEntity, JSON.stringify(sel));
        }
        catch { /* ignore */ }
    }
    _loadRoomSel() {
        const map = new Map();
        try {
            for (const vac of this._config.vacuums) {
                const raw = localStorage.getItem("roborock-card:sel:" + vac.entity);
                if (raw) {
                    const sel = JSON.parse(raw);
                    for (const [k, v] of Object.entries(sel)) {
                        if (v)
                            map.set(vac.entity + ":" + k, true);
                    }
                }
            }
        }
        catch { /* ignore */ }
        return map;
    }
    _pause(vac) {
        this._call("vacuum", "pause", { entity_id: vac.entity });
    }
    _resume(vac) {
        this._call("vacuum", "start", { entity_id: vac.entity });
    }
    _dock(vac) {
        this._call("vacuum", "return_to_base", { entity_id: vac.entity });
    }
    _toggleRoom(room, vac) {
        if (this._backendSel()) {
            this._setBackendSel([room.key], "toggle");
            return;
        }
        const k = vac.entity + ":" + room.key;
        const next = new Map(this._localRoomSel);
        next.set(k, !(next.get(k) ?? false));
        this._localRoomSel = next;
        this._saveRoomSel(vac.entity);
    }
    _isRoomSelectedAny(key, vacs) {
        const be = this._backendSel();
        if (be)
            return be.has(key);
        return vacs.some((v) => this._localRoomSel.get(v.entity + ":" + key) ?? false);
    }
    /** Merged mode: toggle a room across every shown vacuum that has it (one rectangle -> both controllers). */
    _toggleRoomAcross(key, vacs) {
        if (this._backendSel()) {
            this._setBackendSel([key], "toggle");
            return;
        }
        const target = !this._isRoomSelectedAny(key, vacs);
        const next = new Map(this._localRoomSel);
        for (const v of vacs) {
            if (this._roomsFor(v).some((r) => r.key === key))
                next.set(v.entity + ":" + key, target);
        }
        this._localRoomSel = next;
        for (const v of vacs)
            this._saveRoomSel(v.entity);
    }
    _selectAll(vac) {
        const be = this._backendSel();
        if (be) {
            for (const r of this._roomsFor(vac))
                be.add(r.key);
            this._setBackendSel([...be], "set");
            return;
        }
        const next = new Map(this._localRoomSel);
        for (const r of this._roomsFor(vac))
            next.set(vac.entity + ":" + r.key, true);
        this._localRoomSel = next;
        this._saveRoomSel(vac.entity);
    }
    _deselectAll(vac) {
        const be = this._backendSel();
        if (be) {
            for (const r of this._roomsFor(vac))
                be.delete(r.key);
            this._setBackendSel([...be], "set");
            return;
        }
        const next = new Map(this._localRoomSel);
        for (const r of this._roomsFor(vac))
            next.delete(vac.entity + ":" + r.key);
        this._localRoomSel = next;
        this._saveRoomSel(vac.entity);
    }
    // ── Auto mode: orchestrated cleans (naive fan-out v1) ─────────────────────
    /** All distinct room keys across vacuums. */
    _allRoomKeys() {
        const keys = new Set();
        for (const v of this._config.vacuums)
            for (const r of this._roomsFor(v))
                keys.add(r.key);
        return [...keys];
    }
    /** Vacuums the plan/orchestrator may use = the currently shown (held) badges. */
    _planVacuums() {
        const shown = this._config.vacuums.filter((_, i) => this._shownSet.has(i));
        return shown.length ? shown : this._config.vacuums;
    }
    // ── Clean intent → backend planner (kontrakt v2, docs/14 §3.7) ─────────────
    /** Per-kind vacuum restriction for anyvac.clean/plan, from the configured roles —
     *  preserves the user's dry/wet split even when a robot is both-capable. */
    _v2Vacuums() {
        const dry = [], wet = [];
        for (const v of this._config.vacuums) {
            const role = this._vacCleanType(v);
            if (role.dry)
                dry.push(v.entity);
            if (role.wet)
                wet.push(v.entity);
        }
        return { dry, wet };
    }
    /** Per-kind settings for anyvac.clean, from the first capable vacuum's matching
     *  preset (fan speed / mop mode / mop intensity / repeat). */
    _v2Settings() {
        const isWet = (p) => (p.mop_intensity != null && p.mop_intensity !== "" && p.mop_intensity !== "off") || !!p.mop_mode;
        const out = {};
        for (const kind of ["dry", "wet"]) {
            for (const v of this._config.vacuums) {
                const role = this._vacCleanType(v);
                if (!(kind === "dry" ? role.dry : role.wet))
                    continue;
                const presets = this._settingPresets(v);
                const pick = presets.find((p) => (kind === "wet" ? isWet(p) : !isWet(p))) ?? presets[0];
                if (!pick)
                    continue;
                const s = {};
                if (pick.suction_level)
                    s.fan_speed = pick.suction_level;
                if (kind === "wet" && pick.mop_mode)
                    s.mop_mode = pick.mop_mode;
                if (kind === "wet" && pick.mop_intensity)
                    s.mop_intensity = pick.mop_intensity;
                if (pick.repeat && pick.repeat > 1)
                    s.repeat = pick.repeat;
                if (Object.keys(s).length) {
                    out[kind] = s;
                    break;
                }
            }
        }
        return Object.keys(out).length ? out : undefined;
    }
    _fetchPlan(selKeys, mode) {
        const key = JSON.stringify([selKeys, mode, this._v2Vacuums()]);
        if (key === this._planFetchKey)
            return;
        this._planFetchKey = key;
        void (async () => {
            try {
                const res = await this.hass.callService("anyvac", "plan", { rooms: selKeys, mode, vacuums: this._v2Vacuums() }, undefined, false, true);
                if (this._planFetchKey !== key)
                    return; // stale response
                const plan = res?.response?.plan ?? {};
                const inv = (m) => {
                    const out = new Map();
                    for (const [ent, rooms] of Object.entries(m ?? {}))
                        for (const r of rooms)
                            out.set(r, ent);
                    return out;
                };
                this._planPreview = { key, dry: inv(plan.dry), wet: inv(plan.wet) };
            }
            catch (err) {
                console.warn("[anyvac-card] anyvac.plan preview failed:", err);
                if (this._planFetchKey === key)
                    this._planPreview = { key, dry: new Map(), wet: new Map() };
            }
        })();
    }
    /** Send the clean intent — planning (capability, LPT assignment, segment resolve,
     *  dry→wet gating, repeat) is entirely backend-side now (anyvac.clean, docs/14
     *  §3.7). The old client-side plan builder + run_job assembly was deleted. */
    async _runOrchestrated(roomKeys, mode) {
        if (!roomKeys.length)
            return;
        await this._call("anyvac", "clean", {
            rooms: roomKeys,
            mode,
            vacuums: this._v2Vacuums(),
            ...(this._v2Settings() ? { settings: this._v2Settings() } : {}),
        });
    }
    /** Select a global preset (does NOT run): set the plan mode + apply its room scope,
     *  so the plan preview reflects it. The user runs it via the plan's "Spustit". */
    _selectGlobalPreset(gp) {
        this._activeGlobalPreset = gp.id;
        if (gp.mode)
            this._planMode = gp.mode;
        if (gp.scope === "all" || Array.isArray(gp.scope)) {
            const keys = gp.scope === "all" ? this._allRoomKeys() : gp.scope;
            // Backend-shared selection first (docs/14 §3.11); local only without integration.
            if (this._backendSel()) {
                this._setBackendSel(keys, "set");
                return;
            }
            const sel = new Map(this._localRoomSel);
            for (const v of this._config.vacuums)
                for (const r of this._roomsFor(v))
                    sel.delete(v.entity + ":" + r.key);
            for (const k of keys)
                for (const v of this._config.vacuums) {
                    if (this._roomsFor(v).some((r) => r.key === k))
                        sel.set(v.entity + ":" + k, true);
                }
            this._localRoomSel = sel;
            for (const v of this._config.vacuums)
                this._saveRoomSel(v.entity);
        }
        // scope "select" → keep the user's current room selection
    }
    /** Two-letter abbreviation for a vacuum (fallback when no icon). */
    _vacAbbrev(vac) {
        const n = vac.name ?? vac.entity.split(".")[1] ?? "";
        return (n.replace(/[^A-Za-z0-9]/g, "").slice(0, 2) || "??").toUpperCase();
    }
    /** Plan preview: per selected room, which vacuum cleans it dry / wet, with a
     *  dry/wet/both mode toggle and a hold-to-run button. Reacts to the selected
     *  (held) vacuum badges and the currently selected rooms. */
    _renderPlanPreview() {
        if (this._config.ui_mode !== "auto")
            return A;
        const selKeys = this._allRoomKeys().filter((k) => this._isRoomSelectedAny(k, this._config.vacuums));
        if (!selKeys.length)
            return A;
        const mode = this._planMode;
        const apLabel = (this._config.global_presets ?? []).find((g) => g.id === this._activeGlobalPreset)?.label;
        const showDry = mode === "dry" || mode === "both";
        const showWet = mode === "wet" || mode === "both";
        // The preview is the BACKEND's real assignment (anyvac.plan, response-only) —
        // the card no longer computes plans locally (docs/14 §3.7). Debounced by key;
        // until the response lands the cells show "—".
        this._fetchPlan(selKeys, mode);
        const dryOf = this._planPreview?.dry ?? new Map();
        const wetOf = this._planPreview?.wet ?? new Map();
        const roomDef = (k) => {
            for (const v of this._config.vacuums) {
                const r = this._roomsFor(v).find((x) => x.key === k);
                if (r)
                    return r;
            }
            return undefined;
        };
        const cell = (entity) => {
            const v = this._config.vacuums.find((x) => x.entity === entity);
            if (!v)
                return b `<span style="font-size:11px;opacity:.25">—</span>`;
            const c = this._color(v);
            return b `<span style="display:inline-flex;align-items:center;justify-content:center;min-width:24px;height:17px;padding:0 5px;border-radius:9px;font-size:10px;font-weight:700;color:#fff;background:${c}30;border:1px solid ${c}">${this._vacAbbrev(v)}</span>`;
        };
        const modeBtn = (m, label) => {
            const on = mode === m;
            return b `<button @click=${(e) => { e.stopPropagation(); this._planMode = m; }}
        style="padding:2px 8px;border-radius:8px;font-size:10px;font-weight:700;cursor:pointer;font-family:inherit;border:1px solid ${on ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.15)"};background:${on ? "rgba(255,255,255,0.12)" : "transparent"};color:${on ? "#fff" : "rgba(255,255,255,0.5)"}">${label}</button>`;
        };
        const runHid = "plan-run";
        return b `
      <div style="margin:0 4px 6px;padding:6px 8px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:12px;display:flex;flex-direction:column;gap:6px">
        <div style="display:flex;align-items:center;justify-content:space-between">
          <span style="font-size:9px;font-weight:600;letter-spacing:.6px;color:rgba(255,255,255,.35)">PLÁN ÚKLIDU${apLabel ? " · " + apLabel.toUpperCase() : ""}</span>
          <div style="display:flex;gap:4px">${modeBtn("dry", "Sucho")}${modeBtn("wet", "Mokro")}${modeBtn("both", "Obojí")}</div>
        </div>
        <div style="display:flex;gap:6px;overflow-x:auto;align-items:center">
          <div style="display:flex;flex-direction:column;gap:3px;align-items:center;flex-shrink:0;padding-right:2px">
            <span style="height:18px"></span>
            ${showDry ? b `<ha-icon icon="mdi:broom" style="--mdc-icon-size:14px;color:rgba(255,255,255,.4)"></ha-icon>` : A}
            ${showWet ? b `<ha-icon icon="mdi:water" style="--mdc-icon-size:14px;color:rgba(64,169,255,.7)"></ha-icon>` : A}
          </div>
          ${selKeys.map((k) => {
            const r = roomDef(k);
            return b `<div style="display:flex;flex-direction:column;align-items:center;gap:3px;min-width:32px;flex-shrink:0" title=${r?.name ?? k}>
              <ha-icon icon=${r?.icon || "mdi:floor-plan"} style="--mdc-icon-size:18px;color:rgba(255,255,255,.7)"></ha-icon>
              ${showDry ? cell(dryOf.get(k)) : A}
              ${showWet ? cell(wetOf.get(k)) : A}
            </div>`;
        })}
        </div>
        <button class="action-btn ${this._holdId === runHid ? "action-btn--holding" : ""}"
          style="flex:0 0 auto;align-self:flex-end;flex-direction:row;gap:6px;padding:7px 16px;background:rgba(82,196,26,0.14);border:1px solid rgba(82,196,26,0.55);color:#fff"
          @pointerdown=${this._holdStart(runHid, () => this._runOrchestrated(selKeys, this._planMode))}
          @pointerup=${this._holdEnd}
          @pointerleave=${this._holdEnd}
          @pointercancel=${this._holdEnd}>
          <div class="hold-ring"></div>
          <ha-icon icon="mdi:play" style="--mdc-icon-size:18px"></ha-icon>
          <span style="font-size:12px">Spustit · podrž</span>
        </button>
      </div>
    `;
    }
    _renderAutoBar() {
        if (this._config.ui_mode !== "auto")
            return A;
        const gps = this._config.global_presets ?? [];
        if (!gps.length)
            return A;
        return b `
      <div style="display:flex;flex-wrap:wrap;gap:8px;padding:2px 4px 4px">
        ${gps.map((gp) => {
            const active = this._activeGlobalPreset === gp.id;
            return b `<button
            @click=${() => this._selectGlobalPreset(gp)}
            style="flex:0 1 auto;min-width:128px;display:flex;flex-direction:row;align-items:center;justify-content:flex-start;gap:10px;padding:9px 14px;border-radius:14px;cursor:pointer;font-family:inherit;color:white;background:${active ? "rgba(82,196,26,0.14)" : "rgba(255,255,255,0.05)"};border:1px solid ${active ? "rgba(82,196,26,0.6)" : "rgba(255,255,255,0.12)"}">
            <ha-icon icon=${gp.icon || "mdi:robot-vacuum-variant"} style="--mdc-icon-size:24px"></ha-icon>
            <div style="display:flex;flex-direction:column;align-items:flex-start;line-height:1.15">
              <span style="font-size:13px;font-weight:700">${gp.label}</span>
              <small style="font-size:9px;font-weight:600;letter-spacing:.4px;color:rgba(255,255,255,0.4)">${gp.scope === "all" ? "CELÝ BYT" : gp.scope === "select" ? "VYBRANÉ" : "MÍSTNOSTI"}${gp.mode ? " · " + (gp.mode === "dry" ? "SUCHO" : gp.mode === "wet" ? "MOKRO" : "OBOJÍ") : ""}</small>
            </div>
          </button>`;
        })}
      </div>
    `;
    }
    // ── Dock & START regions (docs/18 Fáze B) ────────────────────────────────
    /** Shared per-room vacuum pins from the integration sensor (anyvac.pin_room). */
    _pinsAttr() {
        const ent = this._selSensor();
        const rp = ent ? this.hass.states[ent]?.attributes?.room_pins : undefined;
        return rp && typeof rp === "object" ? rp : {};
    }
    /** Vacuums that could clean this room at all (know the room key). */
    _pinCandidates(key) {
        return this._config.vacuums.filter((v) => this._roomsFor(v).some((r) => r.key === key));
    }
    /** Cycle the room's pin: auto → vac1 → vac2 → … → auto (docs/18 §7e). The pin is
     *  stored backend-side (anyvac.pin_room) so every browser sees the same override;
     *  the planner treats it as the default and it auto-clears after the clean. */
    _cycleRoomPin(key) {
        const cands = this._pinCandidates(key);
        if (cands.length < 2)
            return; // nothing to choose from
        const cur = this._pinsAttr()[key];
        const idx = cands.findIndex((v) => v.entity === cur);
        const next = idx < 0 ? cands[0] : idx + 1 < cands.length ? cands[idx + 1] : null;
        void this._call("anyvac", "pin_room", next ? { room: key, vacuum: next.entity } : { room: key });
    }
    /** Small vacuum-abbrev chip; `pinned` gets a solid ring + pin glyph. */
    _vacChip(entity, pinned, onTap) {
        const v = this._config.vacuums.find((x) => x.entity === entity);
        if (!v) {
            return b `<span class="dock-chip dock-chip--empty" @click=${onTap ?? A}>—</span>`;
        }
        const c = this._color(v);
        return b `<span class="dock-chip ${pinned ? "dock-chip--pinned" : ""}"
      style="color:#fff;background:${c}30;border-color:${c}"
      title=${(v.name ?? v.entity) + (pinned ? " · pinned — tap to change" : " · tap to pin")}
      @click=${onTap ?? A}>${pinned ? b `<ha-icon icon="mdi:pin" style="--mdc-icon-size:10px"></ha-icon>` : A}${this._vacAbbrev(v)}</span>`;
    }
    _batteryPct(vac) {
        if (vac.battery_entity) {
            const v = Number(this.hass.states[vac.battery_entity]?.state);
            if (Number.isFinite(v))
                return v;
        }
        const bl = Number(this.hass.states[vac.entity]?.attributes?.battery_level);
        return Number.isFinite(bl) ? bl : null;
    }
    /** Estimated minutes for the current selection: per room the worst (max) estimate
     *  across vacuums — a display aid only, the real plan is the backend's. */
    _selEstMins(selKeys) {
        let sum = 0;
        for (const k of selKeys) {
            let best = 0;
            for (const v of this._config.vacuums) {
                const r = this._roomsFor(v).find((x) => x.key === k);
                if (r)
                    best = Math.max(best, this._roomCleanMins(r, v));
            }
            sum += best;
        }
        return Math.round(sum);
    }
    /** Glanceable stats trio (grid badges region): selected rooms · est time · min battery. */
    _renderStatsTrio() {
        const vacs = this._config.vacuums;
        const selKeys = this._allRoomKeys().filter((k) => this._isRoomSelectedAny(k, vacs));
        const est = this._selEstMins(selKeys);
        const batts = vacs.map((v) => this._batteryPct(v)).filter((x) => x !== null);
        const minB = batts.length ? Math.min(...batts) : null;
        return b `
      <div class="stats-trio">
        <span class="stat"><ha-icon icon="mdi:floor-plan"></ha-icon><b>${selKeys.length}</b></span>
        ${est > 0 ? b `<span class="stat"><ha-icon icon="mdi:clock-outline"></ha-icon><b>${est}</b><small>min</small></span>` : A}
        ${minB !== null ? b `<span class="stat"><ha-icon icon="mdi:battery"></ha-icon><b>${Math.round(minB)}</b><small>%</small></span>` : A}
      </div>
    `;
    }
    /** Dock region (docs/12 §3 + docs/18 §3): selection, plan preview and pinning in
     *  one block. Row = room (tap toggles selection); the avatar shows the BACKEND's
     *  real assignment per pass; tapping the avatar cycles the room's vacuum pin.
     *  `withRun` adds the orchestrated run footer (landscape — no `start` region). */
    _renderDock(withRun) {
        const vacs = this._config.vacuums;
        const rooms = this._mergedRoomDefs(vacs);
        if (!rooms.length)
            return A;
        const hasInt = vacs.some((v) => this._intAttrs(v));
        const mode = this._planMode;
        const selKeys = this._allRoomKeys().filter((k) => this._isRoomSelectedAny(k, vacs));
        if (hasInt && selKeys.length)
            this._fetchPlan(selKeys, mode);
        const dryOf = this._planPreview?.dry ?? new Map();
        const wetOf = this._planPreview?.wet ?? new Map();
        const pins = this._pinsAttr();
        const showDry = mode !== "wet";
        const showWet = mode !== "dry";
        const badge = (d) => (d === null ? "—" : d < 1 ? "<1d" : Math.round(d) + "d");
        const modeBtn = (m, icon, label) => b `
      <button class="dock-mode ${mode === m ? "on" : ""}"
        @click=${(e) => { e.stopPropagation(); this._planMode = m; }}>
        <ha-icon icon=${icon}></ha-icon><span>${label}</span>
      </button>`;
        const runHid = "dock-run";
        return b `
      <div class="dock">
        <div class="dock-head">
          ${modeBtn("dry", "mdi:broom", "Dry")}${modeBtn("wet", "mdi:water", "Wet")}${modeBtn("both", "mdi:water-plus", "Both")}
        </div>
        <div class="dock-rows">
          ${rooms.map(({ r, v }) => {
            const rec = this._intRoomRec(v, r);
            const dry = this._ageDaysFromIso(rec?.dry);
            const wet = this._ageDaysFromIso(rec?.wet);
            const sel = this._isRoomSelectedAny(r.key, vacs);
            const pinned = pins[r.key];
            const pinTap = this._pinCandidates(r.key).length > 1
                ? (e) => { e.stopPropagation(); this._cycleRoomPin(r.key); }
                : undefined;
            return b `
              <button class="dock-row ${sel ? "on" : ""}" @click=${() => this._toggleRoomAcross(r.key, vacs)}>
                <ha-icon class="dock-ric" icon=${r.icon ?? "mdi:square"}></ha-icon>
                <span class="dock-name">${r.name ?? r.key}</span>
                <span class="dock-ages">
                  <span class="dock-age"><ha-icon icon="mdi:broom"></ha-icon><b style=${o({ color: this._colorForAgeDays(dry) })}>${badge(dry)}</b></span>
                  <span class="dock-age"><ha-icon icon="mdi:water"></ha-icon><b style=${o({ color: this._colorForAgeDays(wet) })}>${badge(wet)}</b></span>
                </span>
                ${hasInt && sel ? b `
                  <span class="dock-avatars">
                    ${showDry ? this._vacChip(dryOf.get(r.key), pinned === dryOf.get(r.key) && !!pinned, pinTap) : A}
                    ${showWet ? this._vacChip(wetOf.get(r.key), pinned === wetOf.get(r.key) && !!pinned, pinTap) : A}
                  </span>` : A}
              </button>`;
        })}
        </div>
        ${withRun && hasInt ? b `
          <div class="dock-foot">
            <span class="dock-est">${selKeys.length ? selKeys.length + " rooms · ~" + this._selEstMins(selKeys) + " min" : "Select rooms"}</span>
            <button class="action-btn ${this._holdId === runHid ? "action-btn--holding" : ""}"
              style="flex:0 0 auto;padding:7px 14px;background:rgba(82,196,26,0.14);border:1px solid rgba(82,196,26,0.55);color:#fff"
              ?disabled=${!selKeys.length}
              @pointerdown=${selKeys.length ? this._holdStart(runHid, () => this._runOrchestrated(selKeys, this._planMode)) : A}
              @pointerup=${this._holdEnd}
              @pointerleave=${this._holdEnd}
              @pointercancel=${this._holdEnd}>
              <div class="hold-ring"></div>
              <ha-icon icon="mdi:play" style="--mdc-icon-size:16px"></ha-icon>
              <span style="font-size:12px">Start · hold</span>
            </button>
          </div>` : A}
      </div>
    `;
    }
    /** START region (portrait bottom bar, docs/18 §7d): ALWAYS the orchestrated
     *  intent (anyvac.clean); while anything runs it flips to a cancel bar. */
    _renderStartBar() {
        const vacs = this._config.vacuums;
        const hasInt = vacs.some((v) => this._intAttrs(v));
        const selKeys = this._allRoomKeys().filter((k) => this._isRoomSelectedAny(k, vacs));
        const anyCleaning = vacs.some((v) => this._isCleaning(v));
        const hid = "startbar";
        if (anyCleaning) {
            return b `
        <button class="start-bar start-bar--cancel ${this._holdId === hid ? "action-btn--holding" : ""}"
          @pointerdown=${this._holdStart(hid, () => {
                if (hasInt)
                    void this._call("anyvac", "cancel", {});
                else
                    for (const v of vacs) {
                        if (this._isCleaning(v))
                            void this._pause(v);
                    }
            })}
          @pointerup=${this._holdEnd} @pointerleave=${this._holdEnd} @pointercancel=${this._holdEnd}>
          <div class="hold-ring"></div>
          <ha-icon icon="mdi:stop"></ha-icon>
          <span>CANCEL · hold</span>
        </button>`;
        }
        const canStart = hasInt && selKeys.length > 0;
        const est = this._selEstMins(selKeys);
        return b `
      <button class="start-bar ${canStart && this._holdId === hid ? "action-btn--holding" : ""}"
        ?disabled=${!canStart}
        title=${hasInt ? "" : "Requires the AnyVac integration"}
        @pointerdown=${canStart ? this._holdStart(hid, () => this._runOrchestrated(selKeys, this._planMode)) : A}
        @pointerup=${this._holdEnd} @pointerleave=${this._holdEnd} @pointercancel=${this._holdEnd}>
        <div class="hold-ring"></div>
        <ha-icon icon="mdi:rocket-launch"></ha-icon>
        <span>START${selKeys.length ? " · " + selKeys.length + (est ? " · ~" + est + " min" : "") : ""}</span>
      </button>`;
    }
    /** Setting presets for a vacuum; falls back to a single default synthesized from clean_action. */
    _settingPresets(vac) {
        if (vac.presets && vac.presets.length)
            return vac.presets;
        const ca = vac.clean_action;
        return [{
                id: "default",
                label: "Default",
                suction_level: ca?.suction_level,
                mop_mode: ca?.mop_mode,
                mop_intensity: ca?.mop_intensity,
                repeat: ca?.repeat,
            }];
    }
    _activePresetId(vac) {
        const presets = this._settingPresets(vac);
        const sel = this._activePresets.get(vac.entity);
        if (sel && presets.some((p) => p.id === sel))
            return sel;
        return presets[0]?.id ?? "default";
    }
    _activePreset(vac) {
        const presets = this._settingPresets(vac);
        const id = this._activePresetId(vac);
        return presets.find((p) => p.id === id) ?? presets[0];
    }
    _setActivePreset(vac, id) {
        const next = new Map(this._activePresets);
        next.set(vac.entity, id);
        this._activePresets = next;
    }
    _renderPresetChips(vac) {
        const presets = this._settingPresets(vac);
        if (presets.length < 2)
            return A; // only when there is a real choice
        const activeId = this._activePresetId(vac);
        const color = this._color(vac);
        return b `
      <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:8px;justify-content:center">
        ${presets.map((p) => {
            const active = p.id === activeId;
            return b `<button
            @click=${(e) => { e.stopPropagation(); this._setActivePreset(vac, p.id); }}
            style=${o({
                display: "inline-flex", alignItems: "center", gap: "4px",
                padding: "4px 10px", borderRadius: "14px", cursor: "pointer",
                fontSize: "12px", lineHeight: "1",
                border: "1px solid " + (active ? color : "rgba(255,255,255,0.15)"),
                background: active ? COLOR_BG[this._colorKey(vac)] : "rgba(255,255,255,0.04)",
                color: active ? "white" : "rgba(255,255,255,0.55)",
            })}
          >
            ${p.icon ? b `<ha-icon icon=${p.icon} style="--mdc-icon-size:14px"></ha-icon>` : A}
            <span>${p.label}</span>
          </button>`;
        })}
      </div>
    `;
    }
    async _startClean(vac) {
        const selected = (this._roomsFor(vac)).filter((r) => this._isRoomSelected(r, vac));
        if (selected.length === 0)
            return;
        // ── Kontrakt v2: with the integration present, the START button sends an
        // INTENT restricted to THIS vacuum — segment resolve, settings application and
        // session tracking are backend-side (anyvac.clean, docs/14 §3.7). No in-flight
        // tracking, events or notifications here (docs/14 §3.1, §3.10).
        if (this._intAttrs(vac)) {
            const ap = this._activePreset(vac);
            const mode = this._liveCleanType(vac);
            const s = {};
            if (ap.suction_level)
                s.fan_speed = ap.suction_level;
            if (mode === "wet" && ap.mop_mode)
                s.mop_mode = ap.mop_mode;
            if (mode === "wet" && ap.mop_intensity)
                s.mop_intensity = ap.mop_intensity;
            if (ap.repeat && ap.repeat > 1)
                s.repeat = ap.repeat;
            await this._call("anyvac", "clean", {
                rooms: selected.map((r) => r.key),
                mode,
                vacuums: [vac.entity],
                ...(Object.keys(s).length ? { settings: { [mode]: s } } : {}),
            });
            return;
        }
        // ── Degraded mode (no integration, docs/14 §8): dumb direct commands. ──
        if (!vac.clean_action)
            return;
        // Script strategy
        if (vac.clean_action.type === "script") {
            const action = vac.clean_action;
            const variables = {};
            for (const [key, template] of Object.entries(action.variables ?? {})) {
                variables[key] = template
                    .replace("{{ entity }}", vac.entity)
                    .replace("{{ selected_segments }}", JSON.stringify(selected.map((r) => r.segment_id).filter(Boolean)))
                    .replace("{{ selected_room_keys }}", JSON.stringify(selected.map((r) => r.key)))
                    .replace("{{ selected_area_ids }}", JSON.stringify(selected.map((r) => r.area_id).filter(Boolean)));
            }
            await this._call("script", "turn_on", { entity_id: action.entity_id, variables });
            return;
        }
        // Native variants: pre-set fan / mop from the active setting preset (default
        // preset = the values from clean_action, so behaviour is unchanged when no
        // custom presets are defined), then call vacuum.
        const nativeAction = vac.clean_action;
        const ap = this._activePreset(vac);
        const apMopMode = ap.mop_mode ?? nativeAction.mop_mode;
        const apMopInt = ap.mop_intensity ?? nativeAction.mop_intensity;
        const apSuction = ap.suction_level ?? nativeAction.suction_level;
        if (nativeAction.mop_mode_entity && apMopMode) {
            await this._call("select", "select_option", { entity_id: nativeAction.mop_mode_entity, option: apMopMode });
        }
        if (nativeAction.mop_intensity_entity && apMopInt) {
            await this._call("select", "select_option", { entity_id: nativeAction.mop_intensity_entity, option: apMopInt });
        }
        if (apSuction) {
            await this._call("vacuum", "set_fan_speed", { entity_id: vac.entity, fan_speed: apSuction });
        }
        if (vac.clean_action.type === "native-area") {
            // Uses HA vacuum.clean_area — area_id resolved via area_mappings. No repeat
            // (docs/13 A1); repeat lives server-side in anyvac.clean (docs/14 §3.8).
            try {
                await this.hass.callService("vacuum", "clean_area", { cleaning_area_id: selected.map((r) => r.area_id ?? this._config.area_mappings?.[r.key] ?? r.key) }, { entity_id: vac.entity });
            }
            catch (err) {
                console.error("[anyvac-card] vacuum.clean_area failed:", err);
            }
        }
        else {
            // "native" / "native-auto" — segment IDs from the room config. The old
            // native-auto dynamic resolve (roborock.get_maps) was DELETED with the plan
            // builder (docs/14 §3.7): with an integration the backend resolves segments,
            // without one the card only knows its configured segment_ids.
            const action = vac.clean_action;
            const segments = selected.map((r) => r.segment_id).filter((id) => id !== undefined);
            if (!segments.length) {
                console.error("[anyvac-card] no configured segment_ids for the selection; aborting");
                return;
            }
            await this._call("vacuum", "send_command", {
                entity_id: vac.entity,
                command: "app_segment_clean",
                params: [{ segments, repeat: action.repeat ?? 1 }],
            });
        }
    }
    // ── Render: badges ──────────────────────────────────────────────────────
    _renderBadge(vac, index) {
        const active = this._shownSet.has(index);
        const cleaning = this._isCleaning(vac);
        const color = this._color(vac);
        const ck = this._colorKey(vac);
        const name = vac.name ?? vac.entity.split(".")[1] ?? vac.entity;
        const holding = this._holdId === "badge-" + index;
        const bg = cleaning ? COLOR_BG_ACTIVE[ck] : active ? COLOR_BG[ck] : "rgba(30,30,30,0.85)";
        const border = cleaning
            ? "3px solid " + color
            : active
                ? "2px solid " + color + "80"
                : "2px solid rgba(255,255,255,0.18)";
        const shadow = cleaning
            ? "0 0 18px " + color + "B0"
            : active
                ? "0 0 8px " + color + "50"
                : "none";
        return b `
      <button
        class="badge ${holding ? "badge--holding" : ""}"
        style=${o({ background: bg, border, boxShadow: shadow })}
        @pointerdown=${(e) => {
            e.preventDefault();
            this._cancelHold();
            this._holdId = "badge-" + index;
            this._holdTimer = setTimeout(() => {
                this._holdTimer = null;
                this._holdId = null;
                this._toggleShown(index);
            }, HOLD_DURATION_MS);
        }}
        @pointerup=${() => {
            if (this._holdTimer !== null) {
                this._cancelHold();
                this._shownSet = new Set([index]);
                this._saveShown();
            }
            else {
                this._holdId = null;
            }
        }}
        @pointerleave=${this._holdEnd}
        @pointercancel=${this._holdEnd}
        aria-pressed=${active ? "true" : "false"}
        aria-label=${name}
      >
        <div class="hold-ring"></div>
        ${vac.image
            ? b `<img class="badge-img" src=${vac.image} alt=${name} />`
            : b `<ha-icon class="badge-icon" icon="mdi:robot-vacuum" style=${o({ color })}></ha-icon>`}
        <span class="badge-name" style=${o({ color: active ? "white" : "rgba(255,255,255,0.55)" })}>
          ${name}
        </span>
      </button>
    `;
    }
    _renderGlobalBadge(ga, idx) {
        const active = this._isGlobalActive(ga);
        const color = COLOR_HEX[ga.color ?? "orange"];
        const ck = ga.color ?? "orange";
        const holdId = "global-" + idx;
        const holding = this._holdId === holdId;
        const bg = active ? COLOR_BG_ACTIVE[ck] : "rgba(30,30,30,0.85)";
        const border = active ? "3px solid " + color : "2px solid rgba(255,255,255,0.18)";
        const shadow = active ? "0 0 18px " + color + "B0" : "none";
        return b `
      <button
        class="badge badge--global ${holding ? "badge--holding" : ""}"
        style=${o({ background: bg, border, boxShadow: shadow })}
        @pointerdown=${this._holdStart(holdId, () => this._triggerGlobal(ga))}
        @pointerup=${this._holdEnd}
        @pointerleave=${this._holdEnd}
        @pointercancel=${this._holdEnd}
        aria-label=${ga.name}
        title=${"Hold to trigger: " + ga.name}
      >
        <div class="hold-ring"></div>
        ${ga.image
            ? b `<img class="badge-img" src=${ga.image} alt=${ga.name} />`
            : b `<ha-icon class="badge-icon" icon="mdi:home-floor-a" style=${o({ color })}></ha-icon>`}
        <span class="badge-name" style=${o({ color: active ? "white" : "rgba(255,255,255,0.55)" })}>
          ${ga.name}
        </span>
      </button>
    `;
    }
    // ── Render: map ─────────────────────────────────────────────────────────
    // ── Pin & go / zone (integration-only; docs/14 §3.6, kontrakt v2) ────────────
    // The card sends clicks as PERCENT of the map image to anyvac.goto /
    // anyvac.zone_clean; the pct→px→mm conversion is backend-side. All client-side
    // affine math (solve3 / _affine / _intMapToVac / _gotoMm) was deleted — mm no
    // longer exist in the card.
    _toggleMode(entity, mode) {
        if (this._mapMode === mode && this._modeEntity === entity) {
            this._mapMode = "normal";
            this._modeEntity = null;
        }
        else {
            this._mapMode = mode;
            this._modeEntity = entity;
        }
    }
    _refreshMap(vac) {
        const ent = vac.map?.entity;
        if (ent)
            void this.hass.callService("homeassistant", "update_entity", { entity_id: ent });
    }
    _clampPct(v) {
        return Math.min(100, Math.max(0, v));
    }
    _onMapClick(vac, e) {
        const content = this._clickToContent(vac, e.clientX, e.clientY);
        if (this._mapMode === "pin") {
            this._dbg = content
                ? "goto " + content.x.toFixed(1) + "%, " + content.y.toFixed(1) + "%"
                : "(map element not found)";
            if (content) {
                void this._call("anyvac", "goto", {
                    entity_id: vac.entity,
                    x_pct: this._clampPct(content.x),
                    y_pct: this._clampPct(content.y),
                });
            }
            this._mapMode = "normal";
            this._modeEntity = null;
        }
    }
    // Map a viewport click into THIS vacuum's map content space (undo its
    // rotation/scale/offset) so pin&go / zones are seating-independent.
    _clickToContent(vac, clientX, clientY) {
        // The map is the coordinate authority (mm live there). Select this vacuum's own
        // map element — with several vacuums shown there are several .map-img and the
        // first one may belong to a different robot with different seating (docs/13 A4).
        // The floorplan is NOT a valid fallback: its content space has no mm mapping.
        const el = vac.map?.entity
            ? this.renderRoot?.querySelector(`.map-img[data-entity="${vac.entity.replace(/"/g, '\\"')}"]`)
            : null;
        if (!el)
            return null;
        const r = el.getBoundingClientRect();
        const cx = (r.left + r.right) / 2, cy = (r.top + r.bottom) / 2;
        const tr = getComputedStyle(el).transform;
        const m = new DOMMatrix(tr === "none" ? undefined : tr);
        const det = m.a * m.d - m.b * m.c;
        if (Math.abs(det) < 1e-9)
            return null;
        const dx = clientX - cx, dy = clientY - cy;
        const lx = (m.d * dx - m.c * dy) / det;
        const ly = (-m.b * dx + m.a * dy) / det;
        const w = el.offsetWidth || 1, h = el.offsetHeight || 1;
        return { x: (lx / w + 0.5) * 100, y: (ly / h + 0.5) * 100 };
    }
    _onZoneDown(vac, e) {
        if (this._mapMode !== "zone" || this._modeEntity !== vac.entity)
            return;
        const el = e.currentTarget;
        el.setPointerCapture?.(e.pointerId);
        const r = el.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width) * 100;
        const y = ((e.clientY - r.top) / r.height) * 100;
        this._zonePending = null;
        this._zoneDrag = { x0: x, y0: y, x1: x, y1: y };
    }
    _onZoneMove(vac, e) {
        if (!this._zoneDrag || this._mapMode !== "zone" || this._modeEntity !== vac.entity)
            return;
        const el = e.currentTarget;
        const r = el.getBoundingClientRect();
        this._zoneDrag = { x0: this._zoneDrag.x0, y0: this._zoneDrag.y0,
            x1: ((e.clientX - r.left) / r.width) * 100, y1: ((e.clientY - r.top) / r.height) * 100 };
    }
    _onZoneUp(vac, e) {
        if (!this._zoneDrag || this._mapMode !== "zone" || this._modeEntity !== vac.entity)
            return;
        const el = e.currentTarget;
        const r = el.getBoundingClientRect();
        const ax = r.left + (this._zoneDrag.x0 / 100) * r.width;
        const ay = r.top + (this._zoneDrag.y0 / 100) * r.height;
        // Both corners as PERCENT of the map image content (mm math is backend-side).
        const ca = this._clickToContent(vac, ax, ay);
        const cb = this._clickToContent(vac, e.clientX, e.clientY);
        const big = Math.abs(this._zoneDrag.x1 - this._zoneDrag.x0) > 2 || Math.abs(this._zoneDrag.y1 - this._zoneDrag.y0) > 2;
        if (ca && cb && big) {
            this._zonePending = {
                x1: this._clampPct(Math.min(ca.x, cb.x)), y1: this._clampPct(Math.min(ca.y, cb.y)),
                x2: this._clampPct(Math.max(ca.x, cb.x)), y2: this._clampPct(Math.max(ca.y, cb.y)),
            };
        }
        else {
            this._zoneDrag = null;
        }
    }
    _confirmZone(vac) {
        const z = this._zonePending;
        if (!z)
            return;
        void this._call("anyvac", "zone_clean", {
            entity_id: vac.entity,
            x1_pct: z.x1, y1_pct: z.y1, x2_pct: z.x2, y2_pct: z.y2,
            repeat: 1,
        });
        this._zonePending = null;
        this._zoneDrag = null;
        this._mapMode = "normal";
        this._modeEntity = null;
    }
    _cancelZone() { this._zonePending = null; this._zoneDrag = null; }
    _renderMapTools(vac, float = false, slot = 0) {
        if (!vac.map && !vac.image_base)
            return A;
        // Map commands need the integration's calibration AND this vacuum's map element
        // for the click geometry. Disabled in the rotated (narrow) view — the click
        // inversion does not account for the wrapper rotation yet (docs/13 A5).
        const canCmd = !!this._intAttrs(vac) && !!vac.map?.entity && !this._narrow;
        const cmdTitle = this._narrow
            ? "Not available in the rotated mobile view"
            : (!this._intAttrs(vac) || !vac.map?.entity)
                ? "Requires the AnyVac integration (≥ 0.18) + map entity"
                : "";
        const mode = this._modeEntity === vac.entity ? this._mapMode : "normal";
        // Floating variant (docs/18 §3): icon-only column overlaid on the map edge —
        // Roborock-app style. Panels/hints float along the bottom of the map region.
        const toolsStyle = float ? `right:${8 + slot * 44}px` : "";
        const panelClass = float ? "calib-panel calib-panel--float" : "calib-panel";
        return b `
      <div class="map-tools ${float ? "map-tools--float" : ""}" style=${toolsStyle}>
        ${vac.map?.entity ? b `<button class="mtbtn" @click=${() => this._refreshMap(vac)} title="Refresh map">
          <ha-icon icon="mdi:refresh"></ha-icon><span>Refresh</span>
        </button>` : A}
        <button class="mtbtn ${mode === "pin" ? "on" : ""}" ?disabled=${!canCmd}
          @click=${() => this._toggleMode(vac.entity, "pin")} title=${cmdTitle || "Pin & Go"}>
          <ha-icon icon="mdi:map-marker-radius"></ha-icon><span>Pin &amp; Go</span>
        </button>
        <button class="mtbtn ${mode === "zone" ? "on" : ""}" ?disabled=${!canCmd}
          @click=${() => this._toggleMode(vac.entity, "zone")} title=${cmdTitle || "Zone clean"}>
          <ha-icon icon="mdi:select-drag"></ha-icon><span>Zone</span>
        </button>
        ${this._dbg && (this._config.debug || !float) ? b `<span style="font-size:11px;opacity:0.65;align-self:center;font-family:monospace">${this._dbg}</span>` : A}
      </div>
      ${mode === "pin" ? b `<div class=${panelClass}>Tap the map to send the robot there.</div>` : A}
      ${mode === "zone" ? b `<div class=${panelClass}>
        ${this._zonePending
            ? b `<div>Clean this zone?</div>
              <div class="calib-actions">
                <button class="mtbtn on" @click=${() => this._confirmZone(vac)}>Clean zone</button>
                <button class="mtbtn" @click=${() => this._cancelZone()}>Cancel</button>
              </div>`
            : b `Drag a rectangle on the map to set a cleaning zone.`}
      </div>` : A}
    `;
    }
    // ── Auto-seating (docs/15) ──────────────────────────────────────────────
    /** Aspect ratio (W/H) of the map wrap, for the seat fit's unit conversions. */
    _wrapAspect(baseHeight) {
        if (typeof baseHeight === "number" && baseHeight > 0 && this._cardW > 0) {
            return Math.max(0.2, (this._cardW - 16) / baseHeight);
        }
        return this._mapAR > 0.1 ? this._mapAR : 3.636;
    }
    /** Effective map seating: auto-fitted from room anchors (rooms drawn on the
     *  floorplan matched by name against the integration's room bboxes) whenever
     *  possible, else the manual slider values. Recomputed from live attributes,
     *  so it self-heals when the robot remaps / the map trim changes. */
    _effectiveSeat(vac) {
        const m = vac.map;
        const manual = {
            rotation: m?.rotation ?? 0, scale: m?.scale ?? 100,
            offset_x: m?.offset_x ?? 0, offset_y: m?.offset_y ?? 0, auto: false,
        };
        if (m?.seat === "manual")
            return manual;
        const merged = this._config.map_mode === "merged";
        const ib = merged
            ? (this._config.image_base ?? this._config.vacuums.find((v) => v.image_base?.src)?.image_base)
            : vac.image_base;
        // Auto-seat only makes sense against a floorplan reference; a map-only base
        // IS the reference itself and keeps its manual (default) seat.
        if (!ib?.src)
            return manual;
        // Kontrakt v2: anchors come from rooms[].bbox_px (integration ≥ 0.18).
        const at = this._intAttrs(vac);
        if (!at)
            return manual;
        const bh = merged
            ? (this._config.base_height ?? this._config.vacuums.find((v) => v.base_height)?.base_height)
            : vac.base_height;
        const ar = this._wrapAspect(bh);
        const fit = computeSeatFit(assembleAnchors(this._roomsFor(vac), at, ar), ar);
        if (!fit)
            return manual;
        return {
            rotation: fit.rotation, scale: fit.scale,
            offset_x: fit.offset_x, offset_y: fit.offset_y,
            auto: true, residual: fit.residual_pct, anchorCount: fit.anchors,
        };
    }
    /** Integration mode: draw the robot + cleaning path as a vector overlay from the
     *  px-space attributes (kontrakt v2: vacuum_position_px, path_dry_px, path_wet_px
     *  — already in rendered-map pixels, no client-side mm math). */
    _renderIntegrationOverlay(vac, m) {
        const at = this._intAttrs(vac);
        if (!at)
            return A;
        const dims = at.image_dims;
        if (!dims)
            return A;
        const sc = dims.scale ?? 1;
        let NW = (dims.width ?? 0) * sc;
        let NH = (dims.height ?? 0) * sc;
        const rot = dims.rotation ?? 0;
        if (rot === 90 || rot === 270) {
            const tmp = NW;
            NW = NH;
            NH = tmp;
        }
        if (!NW || !NH)
            return A;
        const color = this._color(vac);
        const rr = Math.max(NW, NH) / 55;
        const toPts = (arr) => (Array.isArray(arr) ? arr : []).map((p) => p.x.toFixed(1) + "," + p.y.toFixed(1)).join(" ");
        const ct = this._vacCleanType(vac);
        // Dry layer draws the SEGMENTED dry trace (path_dry_px — cleaning-only points,
        // no transit / mop-wash driving). Wet layer draws the mop trace as a wider
        // translucent "wet sheen" band under the line.
        const layersOn = this._layersEff();
        const showDry = layersOn.dry && ct.dry;
        const showWet = layersOn.wet && ct.wet;
        const dryStr = showDry ? toPts(at.path_dry_px) : "";
        const wetStr = showWet ? toPts(at.path_wet_px) : "";
        const vp = at.vacuum_position_px;
        const rob = vp ? { x: vp.x, y: vp.y } : null;
        let head = null;
        if (rob && vp.a != null) {
            // Heading: the angle is reported in vacuum space; the mm→px transform flips
            // the y axis, so the px-space direction is (cos a, −sin a).
            const arad = (vp.a * Math.PI) / 180;
            head = { x: rob.x + rr * 1.3 * Math.cos(arad), y: rob.y - rr * 1.3 * Math.sin(arad) };
        }
        const seat = {
            left: (50 + (m?.offset_x ?? 0)) + "%",
            top: (50 + (m?.offset_y ?? 0)) + "%",
            width: (m?.scale ?? 100) + "%",
            aspectRatio: NW + " / " + NH,
            transform: "translate(-50%,-50%) rotate(" + (m?.rotation ?? 0) + "deg)",
        };
        const pw = rr * 0.35 * ((vac.path_width ?? 100) / 100);
        const sw = pw.toFixed(2);
        const bw = (pw * 2.6 * ((vac.mop_band_width ?? 100) / 100)).toFixed(2);
        const bandOp = ((vac.mop_band_opacity ?? 28) / 100).toFixed(2);
        const wetColor = vac.mop_path_color || "#40a9ff";
        const mopBand = wetStr
            ? w `<polyline points=${wetStr} fill="none" stroke=${wetColor} stroke-width=${bw} stroke-linejoin="round" stroke-linecap="round" opacity=${bandOp}></polyline>`
            : A;
        // Thin centre line down the mop band, so the wet trace reads as a path inside the sheen.
        const mopLine = wetStr
            ? w `<polyline points=${wetStr} fill="none" stroke=${wetColor} stroke-width=${sw} stroke-linejoin="round" stroke-linecap="round" opacity="0.9"></polyline>`
            : A;
        const traceT = dryStr
            ? w `<polyline points=${dryStr} fill="none" stroke=${vac.path_color || color} stroke-width=${sw} stroke-linejoin="round" stroke-linecap="round" opacity="0.85"></polyline>`
            : A;
        const useImg = !!(vac.robot_image_on_map && vac.image);
        const robSize = rr * 2.6 * ((vac.robot_size ?? 100) / 100);
        const robA = (vp && vp.a != null ? vp.a : 0) + (vac.robot_image_rotation ?? 0);
        const robotT = rob
            ? (useImg
                ? w `<image href=${vac.image} x=${(rob.x - robSize / 2).toFixed(1)} y=${(rob.y - robSize / 2).toFixed(1)} width=${robSize.toFixed(1)} height=${robSize.toFixed(1)} preserveAspectRatio="xMidYMid meet" transform=${"rotate(" + robA + " " + rob.x.toFixed(1) + " " + rob.y.toFixed(1) + ")"}></image>`
                : w `${head ? w `<line x1=${rob.x.toFixed(1)} y1=${rob.y.toFixed(1)} x2=${head.x.toFixed(1)} y2=${head.y.toFixed(1)} stroke="#ffffff" stroke-width=${(rr * 0.3).toFixed(2)} stroke-linecap="round"></line>` : A}<circle cx=${rob.x.toFixed(1)} cy=${rob.y.toFixed(1)} r=${rr.toFixed(1)} fill=${color} stroke="#ffffff" stroke-width=${(rr * 0.18).toFixed(2)}></circle>`)
            : A;
        return b `<svg class="map-vector" viewBox="0 0 ${NW} ${NH}" preserveAspectRatio="none" style=${o(seat)}>${mopBand}${mopLine}${traceT}${robotT}</svg>`;
    }
    _onLayerDown(type) {
        this._layerHeld = false;
        this._layerHoldTimer = window.setTimeout(() => {
            this._layerHeld = true;
            this._layerMenu = this._layerMenu === type ? null : type;
        }, 380);
    }
    _onLayerUp() {
        if (this._layerHoldTimer !== null) {
            window.clearTimeout(this._layerHoldTimer);
            this._layerHoldTimer = null;
        }
    }
    _onLayerClick(type) {
        if (this._layerHeld) {
            this._layerHeld = false;
            return;
        }
        const cur = this._layersEff();
        const next = { ...cur, [type]: !cur[type] };
        const ent = this._selSensor();
        if (ent && this.hass.states[ent]?.attributes?.view_layers) {
            // Backend-shared view state — persists refreshes, syncs across devices.
            this._call("anyvac", "set_layers", next);
        }
        else {
            this._layers = next;
        }
        this._layerMenu = null;
    }
    /** Hold-expanded per-room ages for one layer (dry/wet). */
    _renderLayerMenu(vacs, type) {
        const rooms = this._mergedRoomDefs(vacs);
        const badge = (d) => (d === null ? "\u2014" : d < 1 ? "<1d" : Math.round(d) + "d");
        return b `
      <div class="layer-menu">
        <div class="layer-menu-head">
          <ha-icon icon=${type === "dry" ? "mdi:broom" : "mdi:water"}></ha-icon>
          <span>${type === "dry" ? "Dry" : "Wet"} \u00b7 last cleaned</span>
        </div>
        ${rooms.map(({ r, v }) => {
            const rec = this._intRoomRec(v, r);
            const d = this._ageDaysFromIso(rec?.[type]);
            const sel = this._isRoomSelectedAny(r.key, vacs);
            return b `
            <button class="layer-menu-row ${sel ? "on" : ""}" @click=${() => this._toggleRoomAcross(r.key, vacs)}>
              <ha-icon icon=${r.icon ?? "mdi:square"}></ha-icon>
              <span class="lm-name">${r.name ?? r.key}</span>
              ${this._renderProgChip(this._roomProgForType(r, vacs, type))}
              <b style=${o({ color: this._colorForAgeDays(d) })}>${badge(d)}</b>
            </button>
          `;
        })}
      </div>
    `;
    }
    _renderLayerToggles(vacs) {
        const withInt = vacs.filter((v) => this._intAttrs(v));
        if (!withInt.length)
            return A;
        const oldest = (type) => {
            let max = null;
            for (const v of withInt) {
                const rlc = this._intAttrs(v)?.rooms_last_cleaned;
                if (!rlc)
                    continue;
                for (const rec of Object.values(rlc)) {
                    const d = this._ageDaysFromIso(rec?.[type]);
                    if (d !== null && (max === null || d > max))
                        max = d;
                }
            }
            return max;
        };
        const badge = (d) => (d === null ? "\u2014" : d < 1 ? "<1d" : Math.round(d) + "d");
        const L = this._layersEff();
        return b `
      <div class="layer-toggles">
        <button class="layer-btn ${L.dry ? "on" : ""}" title="Dry \u2014 tap to toggle, hold for rooms"
          @pointerdown=${() => this._onLayerDown("dry")} @pointerup=${() => this._onLayerUp()} @pointerleave=${() => this._onLayerUp()}
          @click=${() => this._onLayerClick("dry")}>
          <ha-icon icon="mdi:broom"></ha-icon><span>${badge(oldest("dry"))}</span>
        </button>
        <button class="layer-btn ${L.wet ? "on" : ""}" title="Wet \u2014 tap to toggle, hold for rooms"
          @pointerdown=${() => this._onLayerDown("wet")} @pointerup=${() => this._onLayerUp()} @pointerleave=${() => this._onLayerUp()}
          @click=${() => this._onLayerClick("wet")}>
          <ha-icon icon="mdi:water"></ha-icon><span>${badge(oldest("wet"))}</span>
        </button>
        ${this._layerMenu ? this._renderLayerMenu(withInt, this._layerMenu) : A}
      </div>
    `;
    }
    /** Per-room status list (dry + wet age), deduped across vacuums; click selects across all. */
    _renderRoomList(shown) {
        if (!shown.some((v) => this._intAttrs(v)))
            return A;
        const seen = new Set();
        const rooms = [];
        for (const v of shown)
            for (const r of v.rooms ?? []) {
                if (r.key && !seen.has(r.key)) {
                    seen.add(r.key);
                    rooms.push({ r, v });
                }
            }
        if (!rooms.length)
            return A;
        const badge = (d) => (d === null ? "\u2014" : d < 1 ? "<1d" : Math.round(d) + "d");
        return b `
      <div class="room-list">
        ${rooms.map(({ r, v }) => {
            const rec = this._intRoomRec(v, r);
            const dry = this._ageDaysFromIso(rec?.dry);
            const wet = this._ageDaysFromIso(rec?.wet);
            const sel = this._isRoomSelectedAny(r.key, shown);
            return b `
            <button class="room-row ${sel ? "on" : ""}" @click=${() => this._toggleRoomAcross(r.key, shown)}>
              <ha-icon class="rl-icon" icon=${r.icon ?? "mdi:square"}></ha-icon>
              <span class="rl-name">${r.name ?? r.key}</span>
              <span class="rl-age">${this._renderProgChip(this._roomProgForType(r, shown, "dry"))}<ha-icon icon="mdi:broom"></ha-icon><b style=${o({ color: this._colorForAgeDays(dry) })}>${badge(dry)}</b></span>
              <span class="rl-age">${this._renderProgChip(this._roomProgForType(r, shown, "wet"))}<ha-icon icon="mdi:water"></ha-icon><b style=${o({ color: this._colorForAgeDays(wet) })}>${badge(wet)}</b></span>
            </button>
          `;
        })}
      </div>
    `;
    }
    /** Merged mode rooms: one rectangle per room key (deduped across vacuums); click selects across all. */
    /** Deduped room defs for merged mode: card-level rooms (rep = first vacuum) or per-vacuum dedup by key. */
    _mergedRoomDefs(shown) {
        const rep = shown[0];
        if (this._config.rooms?.length && rep)
            return this._config.rooms.map((r) => ({ r, v: rep }));
        const seen = new Set();
        const out = [];
        for (const v of shown)
            for (const r of v.rooms ?? []) {
                if (r.key && !seen.has(r.key)) {
                    seen.add(r.key);
                    out.push({ r, v });
                }
            }
        return out;
    }
    _renderMergedRooms(shown) {
        return this._mergedRoomDefs(shown).map(({ r, v }) => this._renderRoomOverlay(r, v, { vacs: shown }));
    }
    /** Narrow (mobile) card → rotate the map to portrait (auto, unless disabled).
     *  With a layout: block the portrait PROFILE drives the rotation (docs/18);
     *  without one the legacy card-width heuristic applies. */
    get _narrow() {
        const mr = this._config.mobile_rotate;
        if (mr === "off")
            return false;
        if (mr === "always" || mr === "on")
            return true; // force (good for testing)
        if (this._config.layout)
            return this._profile === "portrait";
        return this._cardW > 0 && this._cardW < 500; // auto: by card width
    }
    /** Wrap a map render in a 90° portrait rotation when the card is narrow. The map
     *  fills the card width and goes tall (capped), so the floorplan is readable on a
     *  phone instead of a thin letterbox. Controls outside the map-wrap stay upright.
     *  In grid mode (docs/18 §7) the rotated map is fitted EXACTLY into the measured
     *  map-region box instead of the legacy width × cap heuristic — no scroll, no cap. */
    _renderResponsive(mapHtml) {
        if (!this._narrow)
            return mapHtml;
        const ar = this._mapAR > 0.1 ? this._mapAR : 3.636;
        let rW;
        let rH;
        if (this._config.layout && this._mapRegW > 4 && this._mapRegH > 4) {
            rW = Math.min(this._mapRegW, this._mapRegH / ar);
            rH = Math.min(this._mapRegH, rW * ar);
            rW = Math.floor(rW);
            rH = Math.floor(rH);
        }
        else {
            const W = this._cardW || this.clientWidth || 360;
            const capH = (typeof window !== "undefined" ? window.innerHeight : 800) * 1.4;
            const visH = W * ar;
            const scale = visH > capH ? capH / visH : 1;
            rW = Math.round(W * scale);
            rH = Math.round(visH * scale);
        }
        return b `
      <div style="position:relative;width:${rW}px;height:${rH}px;margin:0 auto;overflow:hidden">
        <div style="position:absolute;top:0;left:0;width:${rH}px;height:${rW}px;transform-origin:top left;transform:translateX(${rW}px) rotate(90deg)">
          ${mapHtml}
        </div>
      </div>
    `;
    }
    _renderMergedMap() {
        const shown = [...this._shownSet].filter((i) => i < this._config.vacuums.length).map((i) => this._config.vacuums[i]);
        if (!shown.length)
            return A;
        const primary = shown.find((v) => v.image_base?.src) ?? shown[0];
        const ib = this._config.image_base ?? primary.image_base;
        const hasImage = !!ib?.src;
        const bh = this._config.base_height ?? primary.base_height;
        const fixedH = typeof bh === "number" && bh > 0;
        const wrapClass = fixedH ? "map-wrap--fixed" : (hasImage ? "map-wrap--image" : "");
        const wrapStyle = o(fixedH ? { height: (bh ?? 0) + "px" } : {});
        const imgClass = "image-base-img" + (fixedH ? " image-base-img--fit" : "");
        return b `
      <div class="map-wrap ${wrapClass}" style=${wrapStyle}>
        ${hasImage ? b `
          <img class="${imgClass}" src=${ib.src} alt="Floorplan" @load=${this._onFloorplanLoad}
            style=${o({
            transform: "translate(" + (ib?.offset_x ?? 0) + "%," + (ib?.offset_y ?? 0) + "%) rotate(" + (ib?.rotation ?? 0) + "deg) scale(" + ((ib?.scale ?? 100) / 100) + ")",
        })} />
        ` : A}
        ${shown.map((v, idx) => {
            const mUrl = v.map?.entity ? this._mapUrl(v.map.entity) : null;
            if (!mUrl)
                return A;
            const seat = this._effectiveSeat(v);
            const overlay = hasImage || idx > 0;
            // hide_map renders the element at opacity 0 instead of skipping it — the
            // element IS the click-geometry anchor for pin&go / zones (docs/13 A4).
            return b `<img class="map-img ${overlay ? "map-img--overlay" : ""}" src=${mUrl} alt="Vacuum map"
            data-entity=${v.entity}
            style=${o({
                left: (50 + seat.offset_x) + "%",
                top: (50 + seat.offset_y) + "%",
                width: seat.scale + "%",
                transform: "translate(-50%,-50%) rotate(" + seat.rotation + "deg)",
                opacity: v.hide_map ? "0" : String((v.overlay_opacity ?? (overlay ? 55 : 100)) / 100),
                mixBlendMode: v.overlay_blend ?? "normal",
            })} />`;
        })}
        ${shown.map((v) => (this._intAttrs(v) ? this._renderIntegrationOverlay(v, this._effectiveSeat(v)) : A))}
        ${this._renderLayerToggles(shown)}
        ${this._renderMergedRooms(shown)}
      </div>
    `;
    }
    _renderMap(vac) {
        const base = vac.base ?? (vac.image_base?.src && !vac.map?.entity ? "image" : "map");
        const ib = vac.image_base;
        const imgSrc = ib?.src;
        const mapEntity = vac.map?.entity;
        const mapUrl = mapEntity ? this._mapUrl(mapEntity) : null;
        const showImage = (base === "image" || base === "combined") && !!imgSrc;
        const showMap = (base === "map" || base === "combined") && !!mapUrl;
        if (!showImage && !showMap)
            return A;
        const seat = this._effectiveSeat(vac);
        const fixedH = typeof vac.base_height === "number" && vac.base_height > 0;
        const wrapClass = fixedH ? "map-wrap--fixed" : (showImage ? "map-wrap--image" : "");
        const wrapStyle = o(fixedH ? { height: (vac.base_height ?? 0) + "px" } : {});
        const imgClass = "image-base-img" + (fixedH ? " image-base-img--fit" : "");
        return b `
      <div class="map-wrap ${wrapClass}" style=${wrapStyle}>
        ${showImage ? b `
          <img class="${imgClass}" src=${imgSrc} alt="Floorplan" @load=${this._onFloorplanLoad}
            style=${o({
            transform: "translate(" + (ib?.offset_x ?? 0) + "%," + (ib?.offset_y ?? 0) + "%) rotate(" + (ib?.rotation ?? 0) + "deg) scale(" + ((ib?.scale ?? 100) / 100) + ")",
        })} />
        ` : A}
        ${showMap ? b `
          <img class="map-img ${showImage ? "map-img--overlay" : ""}" src=${mapUrl} alt="Vacuum map"
            data-entity=${vac.entity}
            style=${o({
            left: (50 + seat.offset_x) + "%",
            top: (50 + seat.offset_y) + "%",
            width: seat.scale + "%",
            transform: "translate(-50%,-50%) rotate(" + seat.rotation + "deg)",
            ...(vac.hide_map ? { opacity: "0" } : (showImage ? { opacity: String((vac.overlay_opacity ?? 55) / 100), mixBlendMode: vac.overlay_blend ?? "normal" } : {})),
        })} />
        ` : A}
        ${showMap ? this._renderIntegrationOverlay(vac, seat) : A}
        ${this._renderLayerToggles([vac])}
        ${(this._roomsFor(vac)).map((r) => this._renderRoomOverlay(r, vac))}
        ${this._mapMode !== "normal" && this._modeEntity === vac.entity
            ? b `<div class="map-clickcatch" style="touch-action:none"
              @click=${(e) => this._onMapClick(vac, e)}
              @pointerdown=${(e) => this._onZoneDown(vac, e)}
              @pointermove=${(e) => this._onZoneMove(vac, e)}
              @pointerup=${(e) => this._onZoneUp(vac, e)}></div>`
            : A}
        ${this._mapMode === "zone" && this._modeEntity === vac.entity && this._zoneDrag
            ? b `<div class="zone-rect" style=${o({
                left: Math.min(this._zoneDrag.x0, this._zoneDrag.x1) + "%",
                top: Math.min(this._zoneDrag.y0, this._zoneDrag.y1) + "%",
                width: Math.abs(this._zoneDrag.x1 - this._zoneDrag.x0) + "%",
                height: Math.abs(this._zoneDrag.y1 - this._zoneDrag.y0) + "%",
            })}></div>`
            : A}
      </div>
    `;
    }
    _renderRoomOverlay(room, vac, opts) {
        const selected = opts?.vacs ? this._isRoomSelectedAny(room.key, opts.vacs) : this._isRoomSelected(room, vac);
        const color = this._color(vac);
        const ageColor = this._roomBorderColor(room, vac);
        const anchor = room.icon_anchor ?? "c";
        if (room.map_w !== undefined && room.map_h !== undefined) {
            // ── Rectangle mód ──────────────────────────────────────────
            const ANCHOR = {
                tl: ["flex-start", "flex-start"], t: ["center", "flex-start"], tr: ["flex-end", "flex-start"],
                l: ["flex-start", "center"], c: ["center", "center"], r: ["flex-end", "center"],
                bl: ["flex-start", "flex-end"], b: ["center", "flex-end"], br: ["flex-end", "flex-end"],
            };
            const [jc, ai] = ANCHOR[anchor] ?? ["center", "center"];
            const borderW = (selected
                ? (this._config.room_border_selected ?? 4)
                : (this._config.room_border_normal ?? 2)) + "px";
            const borderC = selected ? color + "E0" : ageColor;
            const bg = selected ? color + "44" : "rgba(0,0,0,0.06)";
            const shadow = selected ? "0 0 18px " + color + "60" : "none";
            return b `
        <button
          class="room-overlay"
          style=${o({
                left: room.map_x + "%", top: room.map_y + "%",
                width: room.map_w + "%", height: room.map_h + "%",
                border: borderW + " solid " + borderC,
                background: bg, boxShadow: shadow,
                justifyContent: jc, alignItems: ai,
            })}
          @click=${() => (opts?.vacs ? this._toggleRoomAcross(room.key, opts.vacs) : this._toggleRoom(room, vac))}
          title=${room.name} aria-label=${room.name}
          aria-pressed=${selected ? "true" : "false"}
        >
          ${!this._config.room_icon_hidden && anchor !== "none" && room.icon ? b `
            <ha-icon icon=${room.icon}
              style=${o({ color: selected ? "white" : ageColor, "--mdc-icon-size": "16px" })}>
            </ha-icon>
          ` : A}
          ${this._renderRoomGauge(opts?.vacs ?? [vac], room)}
        </button>
      `;
        }
        // ── Point mód (legacy) ──────────────────────────────────────
        const bg = selected ? color + "A8" : "rgba(0,0,0,0.55)";
        const shadow = selected ? "0 0 12px " + color + "80" : "none";
        return b `
      <button
        class="room-btn"
        style=${o({
            left: room.map_x + "%", top: room.map_y + "%",
            background: bg,
            border: "4px solid " + ageColor,
            boxShadow: shadow,
        })}
        @click=${() => (opts?.vacs ? this._toggleRoomAcross(room.key, opts.vacs) : this._toggleRoom(room, vac))}
        title=${room.name} aria-label=${room.name}
        aria-pressed=${selected ? "true" : "false"}
      >
        ${!this._config.room_icon_hidden ? b `
          <ha-icon icon=${room.icon || "mdi:square"}
            style=${o({ color: selected ? "white" : "rgba(255,255,255,0.5)" })}>
          </ha-icon>
        ` : A}
        ${this._renderRoomGauge(opts?.vacs ?? [vac], room)}
      </button>
    `;
    }
    // ── Render: status card ─────────────────────────────────────────────────
    _renderStatusRow(vac) {
        const [label, labelColor] = this._statusInfo(vac);
        const bat = this._battery(vac);
        const lastClean = this._lastCleanStr(vac);
        // Current room
        const crid = this._ent(vac, "current_room");
        const roomState = crid ? this.hass.states[crid]?.state : null;
        const currentRoom = roomState && roomState !== "unknown" && roomState !== "unavailable"
            ? roomState : null;
        // Error
        const erid = this._ent(vac, "error");
        const errState = erid ? this.hass.states[erid]?.state : null;
        const hasError = errState && errState !== "none" && errState !== "unknown" && errState !== "unavailable";
        return b `
      ${hasError ? b `
        <div class="error-row">
          <ha-icon icon="mdi:alert-circle" style="color:#ff4d4f"></ha-icon>
          <span style="color:#ff4d4f;font-size:12px;font-weight:600">${errState}</span>
        </div>
      ` : A}
      <div class="status-row">
        <div class="status-main">
          <span class="status-label" style=${o({ color: labelColor })}>${label}</span>
          ${currentRoom ? b `
            <span class="current-room">
              <ha-icon icon="mdi:map-marker" style="--mdc-icon-size:13px;color:rgba(255,255,255,0.4)"></ha-icon>
              ${currentRoom}
            </span>
          ` : A}
        </div>
        <div class="status-meta">
          ${bat !== null ? b `
            <div class="battery">
              <span style=${o({ color: this._batColor(bat) })}>${bat}&thinsp;%</span>
              <ha-icon icon=${this._batIcon(bat)} style=${o({ color: this._batColor(bat) })}></ha-icon>
            </div>
          ` : A}
          <div class="last-clean">
            <span>${lastClean}</span>
            <ha-icon icon="mdi:history"></ha-icon>
          </div>
        </div>
      </div>
    `;
    }
    _renderProgress(vac) {
        const prog = this._progress(vac);
        if (prog === null)
            return A;
        const color = this._color(vac);
        return b `
      <div class="progress">
        <div class="progress-track">
          <div class="progress-fill" style=${o({ width: prog + "%", background: color })}></div>
        </div>
        <span class="progress-label" style=${o({ color })}>${prog}&thinsp;%</span>
      </div>
    `;
    }
    _renderActions(vac, vacIdx) {
        const cleaning = this._isCleaning(vac);
        const paused = this._isPaused(vac);
        const hasRooms = this._hasSelectedRooms(vac);
        const color = this._color(vac);
        const ck = this._colorKey(vac);
        const mins = this._totalCleanMins(vac);
        const timeStr = this._timeStr(mins);
        if (paused) {
            const hId = "resume-" + vacIdx;
            return b `
        <div class="actions">
          <button
            class="action-btn ${this._holdId === hId ? "action-btn--holding" : ""}"
            style=${o({ background: COLOR_BG[ck], border: "1px solid " + color + "80" })}
            @pointerdown=${this._holdStart(hId, () => this._resume(vac))}
            @pointerup=${this._holdEnd}
            @pointerleave=${this._holdEnd}
            @pointercancel=${this._holdEnd}
          >
            <div class="hold-ring"></div>
            <ha-icon icon="mdi:play" style=${o({ color })}></ha-icon>
            <span>Resume</span>
          </button>
          <button
            class="action-btn action-btn--secondary"
            @click=${() => this._dock(vac)}
          >
            <ha-icon icon="mdi:home" style="color:rgba(64,169,255,0.6)"></ha-icon>
            <span>Dock</span>
          </button>
        </div>
      `;
        }
        if (cleaning) {
            const hId = "pause-" + vacIdx;
            return b `
        <div class="actions">
          <button
            class="action-btn action-btn--warn ${this._holdId === hId ? "action-btn--holding" : ""}"
            @pointerdown=${this._holdStart(hId, () => this._pause(vac))}
            @pointerup=${this._holdEnd}
            @pointerleave=${this._holdEnd}
            @pointercancel=${this._holdEnd}
          >
            <div class="hold-ring"></div>
            <ha-icon icon="mdi:pause" style="color:#faad14"></ha-icon>
            <span>Pause</span>
          </button>
        </div>
      `;
        }
        const hId = "start-" + vacIdx;
        const startBg = hasRooms ? COLOR_BG[ck] : "rgba(60,60,60,0.4)";
        const startBorder = hasRooms ? "1px solid " + color + "80" : "1px solid rgba(255,255,255,0.1)";
        const startIconColor = hasRooms ? color : "rgba(255,255,255,0.2)";
        const startTextColor = hasRooms ? "white" : "rgba(255,255,255,0.25)";
        return b `
      <div class="actions">
        ${this._renderPresetChips(vac)}
        <button
          class="action-btn ${hasRooms && this._holdId === hId ? "action-btn--holding" : ""}"
          style=${o({ background: startBg, border: startBorder })}
          ?disabled=${!hasRooms}
          @pointerdown=${hasRooms ? this._holdStart(hId, () => this._startClean(vac)) : A}
          @pointerup=${this._holdEnd}
          @pointerleave=${this._holdEnd}
          @pointercancel=${this._holdEnd}
        >
          <div class="hold-ring"></div>
          <ha-icon icon="mdi:rocket-launch" style=${o({ color: startIconColor })}></ha-icon>
          <div class="start-body">
            <span style=${o({ color: startTextColor })}>START</span>
            ${(this._roomsFor(vac)).length > 0 ? b `
              <div class="room-icons">
                ${(this._roomsFor(vac)).map(r => b `
                  <ha-icon
                    icon=${r.icon || "mdi:square"}
                    style=${o({ color: this._isRoomSelected(r, vac) ? color : "rgba(255,255,255,0.15)" })}
                  ></ha-icon>
                `)}
              </div>
            ` : A}
            ${timeStr ? b `<small style="color:rgba(255,255,255,0.4)">${timeStr}</small>` : A}
            ${(this._roomsFor(vac)).length > 1 ? b `
              <div class="sel-all-row">
                <button class="sel-link" @click=${(e) => { e.stopPropagation(); this._selectAll(vac); }}>all</button>
                <span style="color:rgba(255,255,255,0.2)">·</span>
                <button class="sel-link" @click=${(e) => { e.stopPropagation(); this._deselectAll(vac); }}>none</button>
              </div>
            ` : A}
          </div>
        </button>
      </div>
    `;
    }
    _renderStatusCard(vac, vacIdx) {
        const cleaning = this._isCleaning(vac);
        const color = this._color(vac);
        const name = vac.name ?? vac.entity.split(".")[1] ?? vac.entity;
        const cardBorder = cleaning ? "2px solid " + color : "1px solid rgba(255,255,255,0.08)";
        const cardShadow = cleaning ? "0 0 22px " + color + "40" : "none";
        const imgFilter = cleaning
            ? "drop-shadow(0 0 20px " + color + "D8)"
            : "drop-shadow(0 4px 12px " + color + "33)";
        return b `
      <div class="status-card" style=${o({ border: cardBorder, boxShadow: cardShadow })}>
        <div class="status-left" style="cursor:pointer"
          @click=${() => this._fireMoreInfo(vac.entity)}
          title="Open ${name} info">
          <div class="model-label">${name}</div>
          ${vac.image ? b `
            <img class="vac-img" src=${vac.image} alt=${name}
              style=${o({ opacity: cleaning ? "0.9" : "0.6", filter: imgFilter })}
            />
          ` : b `
            <ha-icon icon="mdi:robot-vacuum"
              style=${o({ color, fontSize: "80px", opacity: cleaning ? "0.9" : "0.5" })}
            ></ha-icon>
          `}
        </div>
        <div class="status-right">
          ${this._renderStatusRow(vac)}
          ${this._renderProgress(vac)}
          ${this._renderActions(vac, vacIdx)}
          ${this._renderDebugProgress(vac)}
        </div>
      </div>
    `;
    }
    /** Small circular gauge for the debug strip (dry / wet coverage). `calibrating` adds a
     *  ~ to mark that it is still the raw bbox % (no learned baseline yet). */
    _renderMiniGauge(pct, color, icon, calibrating) {
        return b `
      <span class="mini-gauge-wrap">
        <ha-icon class="mini-gauge-ico" icon=${icon} style=${o({ color })}></ha-icon>
        <span class="mini-gauge" style=${o({ background: `conic-gradient(${color} ${pct * 3.6}deg, rgba(255,255,255,0.12) 0)` })}>
          <span>${pct}${calibrating ? "~" : ""}</span>
        </span>
      </span>`;
    }
    /** Room the vacuum is currently in, per the integration (for live-ticking its timer). */
    _currentRoomName(vac) {
        return this._intAttrs(vac)?.vacuum_room_name;
    }
    _mmss(sec) {
        const s = Math.max(0, Math.round(sec));
        return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
    }
    /** Debug strip inside the status card: per-room dry + wet coverage gauges and the live
     *  time spent (mm:ss / mm:ss estimate). Shown whenever debug_room_progress is on. */
    _renderDebugProgress(vac) {
        if (!this._config.debug_room_progress)
            return A;
        const rows = (this._roomsFor(vac))
            .map((r) => ({ r, p: this._roomProgress(vac, r) }))
            .filter((x) => x.p && (x.p.dry_pct != null || x.p.wet_pct != null || x.p.elapsed_s != null));
        if (!rows.length)
            return A;
        const color = this._color(vac);
        const ent = this._intEntity(vac);
        const sensorTs = ent ? Date.parse(this.hass.states[ent]?.last_updated ?? "") : NaN;
        const curRoom = this._currentRoomName(vac);
        const cleaning = this._isCleaning(vac);
        const paused = this._isPaused(vac);
        // Seconds since the sensor last updated — while cleaning this is live cleaning time;
        // while paused the sensor is frozen so it measures the pause length.
        const since = (cleaning || paused) && !isNaN(sensorTs) ? Math.max(0, (this._now - sensorTs) / 1000) : 0;
        return b `
      <div class="dbg-prog">
        ${rows.map(({ r, p }) => {
            const isCur = (r.key === curRoom || r.name === curRoom) && (cleaning || paused);
            // Elapsed ticks every second for the active room (and keeps moving while paused);
            // the estimate grows equally during a pause so "remaining" stays put.
            const elapsed = (p.elapsed_s ?? 0) + (isCur ? since : 0);
            let est = p.est_s ?? null;
            if (isCur && paused && est != null)
                est = est + since;
            const timeStr = est != null ? `${this._mmss(elapsed)}/${this._mmss(est)}` : this._mmss(elapsed);
            return b `
            <span class="dbg-prog-item" title=${`dry ${p.dry_pct ?? "—"}% · wet ${p.wet_pct ?? "—"}%`}>
              ${r.icon ? b `<ha-icon icon=${r.icon}></ha-icon>` : A}
              <span class="dbg-prog-name">${r.name ?? r.key}</span>
              ${p.dry_pct != null ? this._renderMiniGauge(p.dry_pct, color, "mdi:broom", !!p.dry_calibrating) : A}
              ${p.wet_pct != null ? this._renderMiniGauge(p.wet_pct, "#40a9ff", "mdi:water", !!p.wet_calibrating) : A}
              ${p.elapsed_s != null ? b `<small>${timeStr}</small>` : A}
            </span>
          `;
        })}
      </div>
    `;
    }
    // ── Main render ─────────────────────────────────────────────────────────
    /** Vacuum indexes shown in the grid. Portrait split = single-vacuum focus
     *  (docs/18 §7b): only the first of the shown set renders; badges switch it. */
    _gridShown() {
        const shown = [...this._shownSet].filter((i) => i < this._config.vacuums.length);
        if (this._profile === "portrait" && this._config.map_mode !== "merged" && shown.length > 1) {
            return shown.slice(0, 1);
        }
        return shown;
    }
    /** Named region template (docs/18 §3), built on demand — a region not placed
     *  in the active profile is never even computed. */
    _regionTemplate(name, prof) {
        const shown = this._gridShown();
        const merged = this._config.map_mode === "merged";
        const vacsOf = (idxs) => idxs.map((i) => this._config.vacuums[i]);
        switch (name) {
            case "badges":
                return b `<div class="badges-row badges-row--grid">
          ${this._config.vacuums.map((v, i) => this._renderBadge(v, i))}
          ${(this._config.global_actions ?? []).map((ga, i) => this._renderGlobalBadge(ga, i))}
          ${this._renderStatsTrio()}
        </div>`;
            case "autobar":
                return this._renderAutoBar();
            case "plan":
                return this._renderPlanPreview();
            case "map": {
                // Map tools float over the map edge in grid mode (docs/18 §3) — the tools
                // region stays available for explicit old-style placement.
                const maps = merged
                    ? this._renderResponsive(this._renderMergedMap())
                    : b `${shown.map((i) => this._renderResponsive(this._renderMap(this._config.vacuums[i])))}`;
                return b `${maps}${vacsOf(shown).map((v, slot) => this._renderMapTools(v, true, slot))}`;
            }
            case "tools":
                return b `${vacsOf(shown).map((v) => this._renderMapTools(v))}`;
            case "dock":
                // The dock carries the orchestrated run footer when no `start` region is
                // placed in this profile (landscape, docs/18 §7d).
                return this._renderDock(!("start" in prof.place));
            case "start":
                return this._renderStartBar();
            case "status":
                return b `${shown.map((i) => this._renderStatusCard(this._config.vacuums[i], i))}`;
            default:
                return null;
        }
    }
    /** Grid render path (docs/18): active only with a `layout:` config block. */
    _renderGrid(lay) {
        const prof = resolveProfile(lay, this._profile);
        const schemaWarn = this._schemaWarning();
        return b `
      <ha-card style="padding:0;display:block">
        ${this.editMode ? b `<div class="version-chip">v${CARD_VERSION} · ${Math.round(this._cardW)}w · ${this._profile}</div>` : A}
        <div class="avc-grid" style=${o(gridRootStyles(lay, prof))}>
          ${schemaWarn ? b `<div class="avc-schemawarn">
            <ha-icon icon="mdi:alert" style="--mdc-icon-size:18px"></ha-icon><span>${schemaWarn}</span>
          </div>` : A}
          ${Object.entries(prof.place).map(([name, pl]) => {
            const tpl = this._regionTemplate(name, prof);
            if (tpl == null || tpl === A)
                return A;
            return b `<div class="avc-region avc-region--${name}" style=${o(regionStyles(pl))}>${tpl}</div>`;
        })}
        </div>
      </ha-card>
    `;
    }
    render() {
        if (!this._config || !this.hass)
            return A;
        if (this._config.layout)
            return this._renderGrid(this._config.layout);
        const schemaWarn = this._schemaWarning();
        return b `
      <ha-card>
        ${this.editMode ? b `<div class="version-chip">v${CARD_VERSION} · ${Math.round(this._cardW)}w</div>` : A}
        ${schemaWarn ? b `<div style="margin:0 4px;padding:8px 12px;border-radius:12px;border:1px solid rgba(250,173,20,0.55);background:rgba(250,173,20,0.12);color:#faad14;font-size:12px;display:flex;align-items:center;gap:8px">
          <ha-icon icon="mdi:alert" style="--mdc-icon-size:18px"></ha-icon><span>${schemaWarn}</span>
        </div>` : A}
        <div class="badges-row">
          ${this._config.vacuums.map((v, i) => this._renderBadge(v, i))}
          ${(this._config.global_actions ?? []).map((ga, i) => this._renderGlobalBadge(ga, i))}
        </div>
        ${this._renderAutoBar()}
        ${this._renderPlanPreview()}
        ${this._config.map_mode === "merged"
            ? b `
              ${this._renderResponsive(this._renderMergedMap())}
              ${[...this._shownSet].filter(i => i < this._config.vacuums.length).map(i => b `
                ${this._renderMapTools(this._config.vacuums[i])}
                ${this._renderStatusCard(this._config.vacuums[i], i)}
              `)}
            `
            : [...this._shownSet]
                .filter(i => i < this._config.vacuums.length)
                .map(i => b `
                ${this._renderResponsive(this._renderMap(this._config.vacuums[i]))}
                ${this._renderMapTools(this._config.vacuums[i])}
                ${this._renderStatusCard(this._config.vacuums[i], i)}
              `)}
      </ha-card>
    `;
    }
};
// ── Styles ──────────────────────────────────────────────────────────────
AnyVacCard.styles = i$5 `
    :host {
      display: block;
      width: 100%;
    }

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

    .version-chip {
      position: absolute;
      top: 0;
      right: 8px;
      font-size: 10px;
      font-weight: 600;
      color: rgba(255, 255, 255, 0.35);
      pointer-events: none;
      z-index: 2;
    }

    /* ── Grid layout (docs/18) ───────────────────────────────────────── */
    .badges-row--grid {
      align-items: center;
      padding: 4px 6px;
    }

    .stats-trio {
      display: flex;
      gap: 10px;
      margin-left: auto;
      align-items: center;
      padding-right: 4px;
    }
    .stat {
      display: inline-flex;
      align-items: center;
      gap: 3px;
      font-size: 12px;
      color: rgba(255, 255, 255, 0.75);
    }
    .stat ha-icon { --mdc-icon-size: 15px; color: rgba(255, 255, 255, 0.4); }
    .stat b { font-weight: 700; }
    .stat small { font-size: 10px; color: rgba(255, 255, 255, 0.4); }

    /* Dock (docs/12 §3): selection + plan + pinning in one column */
    .dock {
      display: flex;
      flex-direction: column;
      gap: 6px;
      height: 100%;
      padding: 6px;
      box-sizing: border-box;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 12px;
    }
    .dock-head { display: flex; gap: 4px; }
    .dock-mode {
      flex: 1;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      padding: 6px 4px;
      border-radius: 9px;
      cursor: pointer;
      font-family: inherit;
      font-size: 11px;
      font-weight: 700;
      color: rgba(255, 255, 255, 0.5);
      background: transparent;
      border: 1px solid rgba(255, 255, 255, 0.15);
    }
    .dock-mode ha-icon { --mdc-icon-size: 15px; }
    .dock-mode.on {
      color: #fff;
      background: rgba(255, 255, 255, 0.12);
      border-color: rgba(255, 255, 255, 0.5);
    }
    .dock-rows {
      display: flex;
      flex-direction: column;
      gap: 3px;
      overflow-y: auto;
      min-height: 0;
      flex: 1;
    }
    .dock-row {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 6px 7px;
      border-radius: 9px;
      cursor: pointer;
      font-family: inherit;
      text-align: left;
      color: rgba(255, 255, 255, 0.85);
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.07);
    }
    .dock-row.on {
      background: rgba(82, 196, 26, 0.1);
      border-color: rgba(82, 196, 26, 0.5);
    }
    .dock-ric { --mdc-icon-size: 16px; color: rgba(255, 255, 255, 0.55); flex-shrink: 0; }
    .dock-name {
      flex: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 12px;
      font-weight: 600;
    }
    .dock-ages { display: inline-flex; gap: 6px; flex-shrink: 0; }
    .dock-age { display: inline-flex; align-items: center; gap: 2px; font-size: 10px; }
    .dock-age ha-icon { --mdc-icon-size: 12px; color: rgba(255, 255, 255, 0.3); }
    .dock-avatars { display: inline-flex; gap: 3px; flex-shrink: 0; }
    .dock-chip {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 1px;
      min-width: 24px;
      height: 17px;
      padding: 0 5px;
      border-radius: 9px;
      font-size: 10px;
      font-weight: 700;
      border: 1px solid transparent;
      cursor: pointer;
    }
    .dock-chip--empty { color: rgba(255, 255, 255, 0.25); border-color: rgba(255, 255, 255, 0.15); }
    .dock-chip--pinned { box-shadow: 0 0 0 1.5px currentColor; }
    .dock-foot {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      padding-top: 6px;
    }
    .dock-est { font-size: 11px; color: rgba(255, 255, 255, 0.45); }

    /* START bar (portrait bottom, docs/18 §7d) */
    .start-bar {
      position: relative;
      overflow: hidden;
      width: 100%;
      height: 100%;
      min-height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      border-radius: 14px;
      cursor: pointer;
      font-family: inherit;
      font-size: 15px;
      font-weight: 800;
      color: #fff;
      background: rgba(82, 196, 26, 0.16);
      border: 1px solid rgba(82, 196, 26, 0.6);
    }
    .start-bar:disabled {
      cursor: default;
      color: rgba(255, 255, 255, 0.25);
      background: rgba(60, 60, 60, 0.4);
      border-color: rgba(255, 255, 255, 0.1);
    }
    .start-bar ha-icon { --mdc-icon-size: 22px; position: relative; z-index: 1; }
    .start-bar span { position: relative; z-index: 1; }
    .start-bar--cancel {
      background: rgba(250, 173, 20, 0.16);
      border-color: rgba(250, 173, 20, 0.6);
    }

    /* Floating map tools (grid mode) */
    .map-tools--float {
      position: absolute;
      top: 8px;
      z-index: 6;
      flex-direction: column;
      gap: 6px;
      margin: 0;
    }
    .map-tools--float .mtbtn {
      padding: 8px;
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      background: rgba(20, 20, 20, 0.55);
    }
    .map-tools--float .mtbtn span { display: none; }
    .calib-panel--float {
      position: absolute;
      left: 8px;
      right: 56px;
      bottom: 8px;
      z-index: 6;
      margin: 0;
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      background: rgba(20, 20, 30, 0.75);
    }

    .avc-schemawarn {
      position: absolute;
      top: 4px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 5;
      padding: 8px 12px;
      border-radius: 12px;
      border: 1px solid rgba(250, 173, 20, 0.55);
      background: rgba(250, 173, 20, 0.12);
      color: #faad14;
      font-size: 12px;
      display: flex;
      align-items: center;
      gap: 8px;
      max-width: 90%;
    }

    /* ── Badges ──────────────────────────────────────────────────────── */
    .badges-row {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .badge {
      position: relative;
      overflow: hidden;
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 6px 18px 6px 6px;
      border-radius: 99px;
      cursor: pointer;
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      transition: background 0.3s, border 0.3s, box-shadow 0.3s;
    }

    .badge-img {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      object-fit: cover;
      flex-shrink: 0;
      position: relative;
      z-index: 1;
    }

    .badge-icon {
      width: 44px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      z-index: 1;
    }

    .badge-name {
      font-size: 15px;
      font-weight: 700;
      white-space: nowrap;
      transition: color 0.3s;
      position: relative;
      z-index: 1;
    }

    /* ── Hold ring (shared by badges and action buttons) ─────────────── */
    .hold-ring {
      position: absolute;
      inset: 0;
      border-radius: inherit;
      background: rgba(255, 255, 255, 0.18);
      transform: scaleX(0);
      transform-origin: left;
      pointer-events: none;
      z-index: 0;
    }

    .action-btn--holding .hold-ring,
    .badge--holding .hold-ring {
      animation: hold-fill var(--hold-ms) linear forwards;
    }

    @keyframes hold-fill {
      from { transform: scaleX(0); }
      to   { transform: scaleX(1); }
    }

    /* ── Map ─────────────────────────────────────────────────────────── */
    .map-wrap {
      position: relative;
      width: 100%;
      padding-top: 27.5%;
      overflow: hidden;
      border-radius: 12px;
    }

    .map-img {
      position: absolute;
      transform-origin: center center;
      object-fit: cover;
    }

    .map-wrap--image { padding-top: 0; }
    .image-base-img { position: relative; display: block; width: 100%; height: auto; transform-origin: center center; }
    .map-img--overlay { opacity: 0.55; pointer-events: none; }
    .map-vector { position: absolute; transform-origin: center center; pointer-events: none; overflow: visible; }
    .zone-rect { position: absolute; border: 2px solid #fff; background: rgba(255,255,255,0.15); border-radius: 4px; pointer-events: none; box-shadow: 0 0 0 1px rgba(0,0,0,0.45); }
    .layer-toggles { position: absolute; top: 8px; right: 8px; display: flex; gap: 6px; z-index: 3; }
    .layer-btn { display: flex; align-items: center; gap: 3px; padding: 3px 8px; border-radius: 999px; border: 1px solid rgba(255,255,255,0.2); background: rgba(0,0,0,0.45); color: rgba(255,255,255,0.55); font-size: 11px; font-weight: 600; cursor: pointer; --mdc-icon-size: 16px; user-select: none; -webkit-touch-callout: none; touch-action: manipulation; }
    .layer-btn.on { color: #fff; border-color: rgba(255,255,255,0.55); background: rgba(0,0,0,0.7); }
    .layer-menu { position: absolute; top: 38px; right: 0; min-width: 200px; max-width: 86vw; max-height: 60vh; overflow-y: auto; display: flex; flex-direction: column; gap: 2px; padding: 6px; border-radius: 12px; background: rgba(15,15,18,0.96); border: 1px solid rgba(255,255,255,0.15); box-shadow: 0 8px 24px rgba(0,0,0,0.5); }
    .layer-menu-head { display: flex; align-items: center; gap: 6px; font-size: 11px; color: rgba(255,255,255,0.5); padding: 2px 6px 5px; --mdc-icon-size: 14px; }
    .layer-menu-row { display: flex; align-items: center; gap: 8px; padding: 6px 8px; border-radius: 8px; border: 1px solid transparent; background: transparent; color: rgba(255,255,255,0.88); cursor: pointer; font-size: 13px; --mdc-icon-size: 16px; }
    .layer-menu-row.on { background: rgba(255,255,255,0.12); border-color: rgba(255,255,255,0.4); }
    .lm-name { flex: 1; text-align: left; }
    .layer-menu-row b { font-weight: 700; }
    .room-list { display: flex; flex-direction: column; gap: 4px; }
    .room-row { display: flex; align-items: center; gap: 8px; padding: 6px 10px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.03); color: rgba(255,255,255,0.85); cursor: pointer; --mdc-icon-size: 18px; }
    .room-row.on { border-color: rgba(255,255,255,0.5); background: rgba(255,255,255,0.1); }
    .rl-icon { color: rgba(255,255,255,0.6); }
    .rl-name { flex: 1; text-align: left; font-size: 13px; }
    .rl-age { display: flex; align-items: center; gap: 3px; font-size: 12px; --mdc-icon-size: 14px; color: rgba(255,255,255,0.45); }
    .rl-age b { font-weight: 700; }
    .rl-prog { font-size: 12px; font-weight: 700; display: flex; align-items: baseline; gap: 1px; }
    .rl-prog small { font-size: 8px; opacity: 0.55; }
    .map-wrap--fixed { padding-top: 0; }
    .image-base-img--fit { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain; }

    /* ── Room buttons ────────────────────────────────────────────────── */
    .room-btn {
      position: absolute;
      width: 46px;
      height: 46px;
      border-radius: 12px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transform: translate(-50%, -50%);
      transition: background 0.2s, box-shadow 0.2s;
    }

    .room-btn ha-icon {
      --mdc-icon-size: 22px;
    }

    .room-overlay {
      position: absolute;
      transform: translate(-50%, -50%);
      border-radius: 6px;
      cursor: pointer;
      display: flex;
      padding: 3px;
      transition: background 0.2s, border 0.3s, box-shadow 0.3s;
    }

    /* ── Debug per-room progress gauges (dry + wet) ──────────────────── */
    .room-gauges {
      position: absolute;
      top: 2px;
      right: 2px;
      display: flex;
      gap: 2px;
      pointer-events: none;
      z-index: 4;
    }
    .room-gauge {
      width: 26px;
      height: 26px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .room-gauge span {
      width: 19px;
      height: 19px;
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.82);
      color: #fff;
      font-size: 9px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* ── Status card ─────────────────────────────────────────────────── */
    .status-card {
      display: grid;
      grid-template-columns: 150px 1fr;
      background: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-radius: 20px;
      overflow: hidden;
      transition: border 0.4s, box-shadow 0.4s;
    }

    .status-left {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      padding: 4px 0 0;
    }

    .model-label {
      font-size: 10px;
      letter-spacing: 3px;
      color: rgba(255, 255, 255, 0.3);
      text-transform: uppercase;
      text-align: center;
      margin-bottom: -10px;
    }

    .vac-img {
      width: 110%;
      margin-bottom: -15px;
      object-fit: contain;
      display: block;
      transition: opacity 0.5s, filter 0.5s;
    }

    .status-right {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    /* ── Status row ──────────────────────────────────────────────────── */
    .status-row {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      padding: 8px 12px 4px 16px;
    }

    .error-row {
      display: flex; align-items: center; gap: 6px;
      padding: 4px 12px 0 16px; animation: pulse-error 2s ease-in-out infinite;
    }
    @keyframes pulse-error { 0%,100% { opacity:1; } 50% { opacity:0.6; } }

    .status-main { display: flex; flex-direction: column; gap: 2px; }
    .status-label { font-size: 20px; font-weight: 700; }
    .current-room { display: flex; align-items: center; gap: 3px; font-size: 11px; color: rgba(255,255,255,0.45); }

    .status-meta {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 3px;
      flex-shrink: 0;
    }

    .battery { display: flex; align-items: center; gap: 3px; font-size: 11px; font-weight: 600; }
    .battery ha-icon { --mdc-icon-size: 15px; }

    .last-clean {
      display: flex; align-items: center; gap: 4px;
      font-size: 11px; color: rgba(255, 255, 255, 0.45);
    }
    .last-clean ha-icon { --mdc-icon-size: 12px; color: rgba(255, 255, 255, 0.25); }

    /* ── Progress bar ────────────────────────────────────────────────── */
    .progress { display: flex; align-items: center; gap: 8px; padding: 0 16px 4px; }
    .progress-track {
      flex: 1; height: 3px;
      background: rgba(255, 255, 255, 0.08); border-radius: 2px; overflow: hidden;
    }
    .progress-fill { height: 100%; border-radius: 2px; transition: width 0.5s ease; }
    .progress-label { font-size: 11px; font-weight: 600; flex-shrink: 0; }

    /* ── Debug per-room progress strip ───────────────────────────────── */
    .dbg-prog { display: flex; flex-wrap: wrap; gap: 6px 12px; padding: 0 16px 12px; }
    .dbg-prog-item { display: flex; align-items: center; gap: 3px; font-size: 11px; color: rgba(255,255,255,0.55); --mdc-icon-size: 14px; }
    .dbg-prog-name { color: rgba(255,255,255,0.45); }
    .dbg-prog-item b { font-weight: 700; }
    .dbg-prog-item small { color: rgba(255,255,255,0.4); font-size: 10px; }
    .mini-gauge-wrap { display: inline-flex; align-items: center; gap: 2px; }
    .mini-gauge-ico { --mdc-icon-size: 12px; opacity: 0.8; }
    .mini-gauge { width: 22px; height: 22px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; }
    .mini-gauge span { width: 16px; height: 16px; border-radius: 50%; background: rgba(0,0,0,0.82); color: #fff; font-size: 8px; font-weight: 700; display: flex; align-items: center; justify-content: center; }

    /* ── Action buttons ──────────────────────────────────────────────── */
    .actions { display: flex; gap: 8px; padding: 0 12px 14px; }

    .action-btn {
      position: relative;
      overflow: hidden;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 10px 14px;
      border-radius: 14px;
      cursor: pointer;
      transition: opacity 0.2s;
      font-family: inherit;
    }

    .action-btn:disabled { cursor: default; opacity: 0.7; }

    .action-btn ha-icon { --mdc-icon-size: 22px; flex-shrink: 0; position: relative; z-index: 1; }
    .action-btn span { font-size: 14px; font-weight: 700; color: white; position: relative; z-index: 1; }

    .action-btn--secondary {
      background: rgba(64, 169, 255, 0.08);
      border: 1px solid rgba(64, 169, 255, 0.2) !important;
    }

    .action-btn--warn {
      background: rgba(250, 173, 20, 0.18);
      border: 1px solid rgba(250, 173, 20, 0.5) !important;
    }

    /* ── Start button body ───────────────────────────────────────────── */
    .start-body {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 2px;
      position: relative;
      z-index: 1;
    }

    .start-body small { font-size: 10px; }

    .sel-all-row {
      display: flex; align-items: center; gap: 4px; margin-top: 1px;
    }
    .sel-link {
      background: none; border: none; cursor: pointer; padding: 0;
      font-size: 10px; font-family: inherit;
      color: rgba(255,255,255,0.3); transition: color .15s;
    }
    .sel-link:hover { color: rgba(255,255,255,0.7); }

    .room-icons {
      display: flex;
      align-items: center;
      gap: 4px;
      margin-top: 1px;
    }

    .room-icons ha-icon { --mdc-icon-size: 14px; }
    .map-clickcatch { position: absolute; inset: 0; cursor: crosshair; z-index: 5; }
    .map-tools { display: flex; gap: 6px; margin: 6px 0 0; }
    .mtbtn { display: inline-flex; align-items: center; gap: 4px; padding: 5px 10px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.18); background: rgba(255,255,255,0.06); color: inherit; cursor: pointer; font-size: 12px; font-weight: 600; }
    .mtbtn.on { background: rgba(59,130,246,0.25); border-color: #3b82f6; }
    .mtbtn:disabled { opacity: 0.4; cursor: default; }
    .mtbtn ha-icon { --mdc-icon-size: 16px; }
    .calib-panel { margin-top: 4px; font-size: 12px; opacity: 0.9; padding: 6px 8px; background: rgba(59,130,246,0.12); border-radius: 8px; }
    .calib-panel > div { margin-bottom: 4px; }
    .calib-actions { display: flex; gap: 6px; flex-wrap: wrap; }
  `;
__decorate([
    n$1({ attribute: false })
], AnyVacCard.prototype, "hass", void 0);
__decorate([
    n$1({ attribute: false })
], AnyVacCard.prototype, "editMode", void 0);
__decorate([
    r()
], AnyVacCard.prototype, "_config", void 0);
__decorate([
    r()
], AnyVacCard.prototype, "_shownSet", void 0);
__decorate([
    r()
], AnyVacCard.prototype, "_holdId", void 0);
__decorate([
    r()
], AnyVacCard.prototype, "_mapMode", void 0);
__decorate([
    r()
], AnyVacCard.prototype, "_modeEntity", void 0);
__decorate([
    r()
], AnyVacCard.prototype, "_dbg", void 0);
__decorate([
    r()
], AnyVacCard.prototype, "_zoneDrag", void 0);
__decorate([
    r()
], AnyVacCard.prototype, "_zonePending", void 0);
__decorate([
    r()
], AnyVacCard.prototype, "_layers", void 0);
__decorate([
    r()
], AnyVacCard.prototype, "_layerMenu", void 0);
__decorate([
    r()
], AnyVacCard.prototype, "_localRoomSel", void 0);
__decorate([
    r()
], AnyVacCard.prototype, "_activePresets", void 0);
__decorate([
    r()
], AnyVacCard.prototype, "_planMode", void 0);
__decorate([
    r()
], AnyVacCard.prototype, "_activeGlobalPreset", void 0);
__decorate([
    r()
], AnyVacCard.prototype, "_cardW", void 0);
__decorate([
    r()
], AnyVacCard.prototype, "_mapAR", void 0);
__decorate([
    r()
], AnyVacCard.prototype, "_profile", void 0);
__decorate([
    r()
], AnyVacCard.prototype, "_mapRegW", void 0);
__decorate([
    r()
], AnyVacCard.prototype, "_mapRegH", void 0);
__decorate([
    r()
], AnyVacCard.prototype, "_now", void 0);
__decorate([
    r()
], AnyVacCard.prototype, "_planPreview", void 0);
AnyVacCard = __decorate([
    t$1(CARD_NAME)
], AnyVacCard);
const customCards = ((_a = window).customCards ?? (_a.customCards = []));
if (!customCards.some((c) => c["type"] === CARD_NAME)) {
    customCards.push({
        type: CARD_NAME,
        name: "AnyVac Card",
        description: "Feature-rich card for Roborock vacuums — map, room selection, multi-vacuum tabs, global actions.",
        preview: false,
        documentationURL: "https://github.com/Michailjovic/anyvac-card",
    });
}

// ── Defaults ─────────────────────────────────────────────────────────────────
const DEFAULT_VACUUM = {
    entity: "", name: "", color: "green", rooms: [],
    clean_action: { type: "native" },
};
const DEFAULT_ROOM = {
    key: "", name: "", icon: "mdi:square", map_x: 50, map_y: 50,
};
const DEFAULT_MAP = {
    entity: "", rotation: 0, scale: 100, offset_x: 0, offset_y: 0,
};
const DEFAULT_GLOBAL = {
    name: "Whole flat", color: "orange",
    watch_entities: [],
    action: { type: "script", entity_id: "" },
};
/** Must match the card's built-in defaults in _roomBorderColor() */
const DEFAULT_THRESHOLDS = [
    { days: 2, color: "#2ecc71" },
    { days: 5, color: "#faad14" },
    { days: 10, color: "#ff9800" },
];
// ── Editor ───────────────────────────────────────────────────────────────────
let AnyVacCardEditor = class AnyVacCardEditor extends i$2 {
    constructor() {
        super(...arguments);
        // ── Navigation state ──────────────────────────────────────────────────────
        this._tab = "vacuums";
        this._dragRoom = null;
        // Accordion open state — always create new instances to trigger Lit reactivity
        this._openVac = new Set();
        this._openSensors = new Set();
        this._openPresets = new Set();
        this._openAction = new Set();
        this._openGlobal = new Set();
        // Per-vacuum: which roomIdx is open (null = none)
        this._openRoom = new Map();
        // Maps tab state
        this._mapVac = 0;
        this._mapRoom = null;
        /** Floorplan natural aspect ratio (W/H) learned from the preview image — used by
         *  the auto-seat fit and to give the preview the correct proportions. */
        this._pvAR = 0;
        this._initialized = false;
    }
    setConfig(config) {
        this._config = config;
        if (!this._initialized) {
            this._initialized = true;
            this._openVac = new Set((config.vacuums ?? []).map((_, i) => i));
        }
    }
    updated(changed) {
        if (changed.has("hass") && this.hass) {
            const dl = this.shadowRoot?.getElementById("ha-entities");
            if (dl && !dl.options.length) {
                dl.innerHTML = Object.keys(this.hass.states).sort()
                    .map(id => "<option value=\"" + id + "\">")
                    .join("");
            }
        }
    }
    // ── Config helpers ────────────────────────────────────────────────────────
    _fire(config) {
        this.dispatchEvent(new CustomEvent("config-changed", {
            detail: { config }, bubbles: true, composed: true,
        }));
    }
    _setConfig(updates) {
        const next = { ...this._config, ...updates };
        this._config = next;
        this._fire(next);
    }
    _setVacuum(idx, updates) {
        const vacuums = [...this._config.vacuums];
        vacuums[idx] = { ...vacuums[idx], ...updates };
        const next = { ...this._config, vacuums };
        this._config = next;
        this._fire(next);
    }
    _setMap(vacIdx, updates) {
        const existing = this._config.vacuums[vacIdx].map ?? { ...DEFAULT_MAP };
        this._setVacuum(vacIdx, { map: { ...existing, ...updates } });
    }
    _setImageBase(vacIdx, updates) {
        const existing = this._config.vacuums[vacIdx].image_base ?? { src: "" };
        this._setVacuum(vacIdx, { image_base: { ...existing, ...updates } });
    }
    get _mergedEdit() { return this._config.map_mode === "merged"; }
    _editRooms() {
        if (this._mergedEdit)
            return this._config.rooms ?? [];
        const vac = this._config.vacuums[Math.min(this._mapVac, this._config.vacuums.length - 1)];
        return vac?.rooms ?? [];
    }
    _setEditedRoom(roomIdx, updates) {
        if (this._mergedEdit) {
            const rooms = [...(this._config.rooms ?? [])];
            rooms[roomIdx] = { ...rooms[roomIdx], ...updates };
            this._setConfig({ rooms });
        }
        else {
            this._setRoom(Math.min(this._mapVac, this._config.vacuums.length - 1), roomIdx, updates);
        }
    }
    _addEditedRoom() {
        if (this._mergedEdit) {
            const rooms = [...(this._config.rooms ?? []), { ...DEFAULT_ROOM }];
            this._setConfig({ rooms });
            this._mapRoom = rooms.length - 1;
        }
        else {
            this._addRoom(Math.min(this._mapVac, this._config.vacuums.length - 1));
            this._mapRoom = (this._config.vacuums[this._mapVac]?.rooms?.length ?? 1) - 1;
        }
    }
    _deleteEditedRoom(roomIdx) {
        if (this._mergedEdit) {
            const rooms = (this._config.rooms ?? []).filter((_, i) => i !== roomIdx);
            this._setConfig({ rooms });
            if (this._mapRoom === roomIdx)
                this._mapRoom = null;
        }
        else {
            this._deleteRoom(Math.min(this._mapVac, this._config.vacuums.length - 1), roomIdx);
        }
    }
    _setEditedImageBase(updates) {
        if (this._mergedEdit) {
            this._setConfig({ image_base: { ...(this._config.image_base ?? { src: "" }), ...updates } });
        }
        else {
            this._setImageBase(Math.min(this._mapVac, this._config.vacuums.length - 1), updates);
        }
    }
    // ── Auto-seating (docs/15) ────────────────────────────────────────────────
    // NOTE: the old 3-point align tool (v0.17) was removed — it was orphaned code
    // (never wired into the UI, which is why it "never worked"). Its similarity-fit
    // maths lives on in seatfit.ts, now fed automatically by room anchors.
    _editorAR() {
        return this._pvAR > 0.1 ? this._pvAR : 3.636;
    }
    /** Integration sensor for a vacuum: explicit config, else auto-resolved from the
     *  entity registry — the AnyVac map sensor sits on the same device as the vacuum
     *  entity (platform "anyvac"; same rule as the card, docs/14 Fáze 3). */
    _intEntityFor(vac) {
        if (!vac)
            return undefined;
        if (vac.integration_entity)
            return vac.integration_entity;
        const reg = this.hass?.entities;
        const dev = reg?.[vac.entity]?.device_id;
        return dev
            ? Object.keys(reg).find((id) => reg[id]?.device_id === dev && reg[id]?.platform === "anyvac" && id.startsWith("sensor."))
            : undefined;
    }
    /** Editor-side view of the effective seat (mirrors the card's _effectiveSeat). */
    _editorSeat(vacIdx) {
        const vac = this._config.vacuums[vacIdx];
        const m = vac?.map;
        const manual = {
            rotation: m?.rotation ?? 0, scale: m?.scale ?? 100,
            offset_x: m?.offset_x ?? 0, offset_y: m?.offset_y ?? 0, auto: false,
        };
        if (!vac || m?.seat === "manual")
            return manual;
        const merged = this._config.map_mode === "merged";
        const ib = merged ? this._config.image_base : vac.image_base;
        if (!ib?.src)
            return manual;
        const ie = this._intEntityFor(vac);
        const at = ie ? this.hass?.states?.[ie]?.attributes : undefined;
        // Kontrakt v2: anchors need rooms[].bbox_px (integration ≥ 0.18).
        if (!at || (at.schema_version ?? 0) < 2)
            return manual;
        const ar = this._editorAR();
        const rooms = merged ? (this._config.rooms ?? []) : (vac.rooms ?? []);
        const fit = computeSeatFit(assembleAnchors(rooms, at, ar), ar);
        if (!fit)
            return manual;
        return {
            rotation: fit.rotation, scale: fit.scale,
            offset_x: fit.offset_x, offset_y: fit.offset_y,
            auto: true, residual: fit.residual_pct, anchorCount: fit.anchors,
        };
    }
    /** Import rooms this vacuum's map knows that are missing on the floorplan —
     *  placed through the vacuum's current (auto or manual) seat. Works both for the
     *  initial import from the reference robot and for supplementing rooms only
     *  another robot has (its seat must exist: shared rooms or manual seating). */
    _importRooms(vacIdx) {
        const vac = this._config.vacuums[vacIdx];
        const ie = this._intEntityFor(vac);
        const at = ie ? this.hass.states[ie]?.attributes : undefined;
        const intRooms = Array.isArray(at?.rooms) ? at.rooms : [];
        // Kontrakt v2: the import places rooms via bbox_px (integration ≥ 0.18).
        if (!at || (at.schema_version ?? 0) < 2 || !intRooms.length)
            return;
        const ar = this._editorAR();
        const seat = this._editorSeat(vacIdx);
        const target = this._mergedEdit ? [...(this._config.rooms ?? [])] : [...(vac.rooms ?? [])];
        const have = new Set(target.map((r) => r.key));
        let added = 0;
        for (const ir of intRooms) {
            const nm = ir?.name;
            if (!nm || have.has(nm))
                continue;
            const rect = roomBboxToRect(ir, at, seat, ar);
            if (!rect)
                continue;
            target.push({ key: nm, name: nm, icon: "mdi:floor-plan", ...rect });
            have.add(nm);
            added++;
        }
        if (!added)
            return;
        if (this._mergedEdit)
            this._setConfig({ rooms: target });
        else
            this._setVacuum(vacIdx, { rooms: target });
    }
    _setRoom(vacIdx, roomIdx, updates) {
        const rooms = [...(this._config.vacuums[vacIdx].rooms ?? [])];
        rooms[roomIdx] = { ...rooms[roomIdx], ...updates };
        this._setVacuum(vacIdx, { rooms });
    }
    _setCleanAction(vacIdx, updates) {
        const existing = this._config.vacuums[vacIdx].clean_action ?? { type: "native" };
        this._setVacuum(vacIdx, { clean_action: { ...existing, ...updates } });
    }
    _togglePresets(vacIdx) {
        const s = new Set(this._openPresets);
        if (s.has(vacIdx))
            s.delete(vacIdx);
        else
            s.add(vacIdx);
        this._openPresets = s;
    }
    _setPreset(vacIdx, presetIdx, updates) {
        const presets = [...(this._config.vacuums[vacIdx].presets ?? [])];
        presets[presetIdx] = { ...presets[presetIdx], ...updates };
        this._setVacuum(vacIdx, { presets });
    }
    _addPreset(vacIdx) {
        const existing = this._config.vacuums[vacIdx].presets ?? [];
        const presets = [...existing, { id: "preset" + (existing.length + 1), label: "New preset" }];
        this._setVacuum(vacIdx, { presets });
        this._openPresets = new Set([...this._openPresets, vacIdx]);
    }
    _deletePreset(vacIdx, presetIdx) {
        const presets = (this._config.vacuums[vacIdx].presets ?? []).filter((_, i) => i !== presetIdx);
        this._setVacuum(vacIdx, { presets });
    }
    _setGlobal(idx, updates) {
        const global_actions = [...(this._config.global_actions ?? [])];
        global_actions[idx] = { ...global_actions[idx], ...updates };
        const next = { ...this._config, global_actions };
        this._config = next;
        this._fire(next);
    }
    _setGlobalAction(idx, updates) {
        const existing = this._config.global_actions?.[idx]?.action ?? { type: "script", entity_id: "" };
        this._setGlobal(idx, { action: { ...existing, ...updates } });
    }
    // ── List mutations ────────────────────────────────────────────────────────
    _moveVacuum(idx, dir) {
        const target = idx + dir;
        const vacuums = [...this._config.vacuums];
        if (target < 0 || target >= vacuums.length)
            return;
        [vacuums[idx], vacuums[target]] = [vacuums[target], vacuums[idx]];
        const next = { ...this._config, vacuums };
        this._config = next;
        this._fire(next);
    }
    _addVacuum() {
        const vacuums = [...this._config.vacuums, { ...DEFAULT_VACUUM }];
        const next = { ...this._config, vacuums };
        this._config = next;
        this._fire(next);
        const newIdx = vacuums.length - 1;
        this._openVac = new Set([...this._openVac, newIdx]);
    }
    _deleteVacuum(idx) {
        const vacuums = this._config.vacuums.filter((_, i) => i !== idx);
        const next = { ...this._config, vacuums };
        this._config = next;
        this._fire(next);
        const s = new Set(this._openVac);
        s.delete(idx);
        this._openVac = s;
    }
    _addRoom(vacIdx) {
        const rooms = [...(this._config.vacuums[vacIdx].rooms ?? []), { ...DEFAULT_ROOM }];
        this._setVacuum(vacIdx, { rooms });
        const m = new Map(this._openRoom);
        m.set(vacIdx, rooms.length - 1);
        this._openRoom = m;
    }
    _moveRoom(vacIdx, from, to) {
        if (from === to)
            return;
        const rooms = [...(this._config.vacuums[vacIdx].rooms ?? [])];
        if (from < 0 || from >= rooms.length || to < 0 || to >= rooms.length)
            return;
        const [moved] = rooms.splice(from, 1);
        rooms.splice(to, 0, moved);
        this._setVacuum(vacIdx, { rooms });
    }
    _deleteRoom(vacIdx, roomIdx) {
        const rooms = (this._config.vacuums[vacIdx].rooms ?? []).filter((_, i) => i !== roomIdx);
        this._setVacuum(vacIdx, { rooms });
        const openIdx = this._openRoom.get(vacIdx);
        if (openIdx === roomIdx) {
            const m = new Map(this._openRoom);
            m.set(vacIdx, null);
            this._openRoom = m;
        }
        if (this._mapRoom === roomIdx)
            this._mapRoom = null;
    }
    _setGlobalPreset(idx, updates) {
        const global_presets = [...(this._config.global_presets ?? [])];
        global_presets[idx] = { ...global_presets[idx], ...updates };
        this._setConfig({ global_presets });
    }
    _addGlobalPreset() {
        const existing = this._config.global_presets ?? [];
        const global_presets = [...existing, { id: "gp" + (existing.length + 1), label: "New clean", scope: "select" }];
        this._setConfig({ global_presets });
    }
    _deleteGlobalPreset(idx) {
        const global_presets = (this._config.global_presets ?? []).filter((_, i) => i !== idx);
        this._setConfig({ global_presets });
    }
    _addGlobal() {
        const global_actions = [...(this._config.global_actions ?? []), { ...DEFAULT_GLOBAL }];
        const next = { ...this._config, global_actions };
        this._config = next;
        this._fire(next);
        const newIdx = global_actions.length - 1;
        this._openGlobal = new Set([...this._openGlobal, newIdx]);
    }
    _deleteGlobal(idx) {
        const global_actions = (this._config.global_actions ?? []).filter((_, i) => i !== idx);
        const next = { ...this._config, global_actions };
        this._config = next;
        this._fire(next);
        const s = new Set(this._openGlobal);
        s.delete(idx);
        this._openGlobal = s;
    }
    // ── Accordion toggle helpers ──────────────────────────────────────────────
    _toggleVac(idx) {
        const s = new Set(this._openVac);
        if (s.has(idx))
            s.delete(idx);
        else
            s.add(idx);
        this._openVac = s;
    }
    _toggleRoom(vacIdx, roomIdx) {
        const m = new Map(this._openRoom);
        const cur = m.get(vacIdx) ?? null;
        m.set(vacIdx, cur === roomIdx ? null : roomIdx);
        this._openRoom = m;
    }
    _toggleSensors(vacIdx) {
        const s = new Set(this._openSensors);
        if (s.has(vacIdx))
            s.delete(vacIdx);
        else
            s.add(vacIdx);
        this._openSensors = s;
    }
    _toggleAction(vacIdx) {
        const s = new Set(this._openAction);
        if (s.has(vacIdx))
            s.delete(vacIdx);
        else
            s.add(vacIdx);
        this._openAction = s;
    }
    _toggleGlobal(idx) {
        const s = new Set(this._openGlobal);
        if (s.has(idx))
            s.delete(idx);
        else
            s.add(idx);
        this._openGlobal = s;
    }
    // ── Shared field helpers ──────────────────────────────────────────────────
    _entityPicker(label, value, domains, onChange, required = false) {
        const ph = domains.length ? domains.join(" / ") : "entity_id";
        const isSingle = domains.length === 1;
        const listId = isSingle ? "ha-ents-" + domains[0] : "ha-entities";
        const filtered = isSingle
            ? Object.keys(this.hass?.states ?? {}).filter(id => id.startsWith(domains[0] + ".")).sort()
            : null;
        return b `
      ${filtered ? b `<datalist id=${listId}>${filtered.map(id => b `<option value=${id}>`)}</datalist>` : A}
      <div class="field">
        <label>${label}${required ? b `<span class="required"> *</span>` : A}</label>
        <input class="text-input" type="text" list=${listId}
          .value=${value ?? ""} placeholder=${ph}
          @input=${(e) => {
            const v = e.target.value;
            if (v === "" || this.hass.states[v])
                onChange(v);
        }}
          @change=${(e) => onChange(e.target.value)} />
      </div>`;
    }
    _textField(label, value, onChange, placeholder = "") {
        return b `
      <div class="field">
        <label>${label}</label>
        <input class="text-input" type="text" .value=${value ?? ""} placeholder=${placeholder}
          @change=${(e) => onChange(e.target.value)} />
      </div>`;
    }
    _numberSlider(label, value, min, max, step, onChange, suffix = "") {
        const cur = value ?? 0;
        return b `
      <div class="field field--row">
        <label>${label}</label>
        <div class="slider-wrap">
          <input type="range" class="slider" min=${min} max=${max} step=${step} .value=${String(cur)}
            @input=${(e) => onChange(Number(e.target.value))} />
          <span class="slider-val">${cur}${suffix}</span>
        </div>
      </div>`;
    }
    _selectField(label, value, options, onChange) {
        return b `
      <div class="field field--row">
        <label>${label}</label>
        <select class="select-input" @change=${(e) => onChange(e.target.value)}>
          ${options.map(o => b `<option value=${o.value} ?selected=${o.value === value}>${o.label}</option>`)}
        </select>
      </div>`;
    }
    _optionSelectFromList(label, opts, value, onChange) {
        return b `
      <div class="field field--row">
        <label>${label}</label>
        <select class="select-input"
          @change=${(e) => onChange(e.target.value)}>
          <option value="">— none —</option>
          ${opts.map(o => b `<option value=${o} ?selected=${o === value}>${o}</option>`)}
        </select>
      </div>`;
    }
    _optionSelect(label, entity, value, onChange) {
        const opts = entity
            ? (this.hass.states[entity]?.attributes["options"] ?? [])
            : [];
        if (!opts.length)
            return this._textField(label, value, onChange, "e.g. balanced");
        return b `
      <div class="field field--row">
        <label>${label}</label>
        <select class="select-input"
          @change=${(e) => onChange(e.target.value)}>
          <option value="">— none —</option>
          ${opts.map(o => b `<option value=${o} ?selected=${o === value}>${o}</option>`)}
        </select>
      </div>`;
    }
    _iconPickerField(value, onChange) {
        return b `
      <div class="field">
        <label>Icon</label>
        <ha-icon-picker .value=${value ?? "mdi:square"}
          @value-changed=${(e) => onChange(e.detail.value)}
        ></ha-icon-picker>
      </div>`;
    }
    _areaPicker(label, value, onChange) {
        const areas = Object.values(this.hass?.areas ?? {});
        if (!areas.length)
            return this._textField(label, value, onChange, "e.g. living_room");
        return b `
      <div class="field field--row">
        <label>${label}</label>
        <select class="select-input"
          @change=${(e) => onChange(e.target.value)}>
          <option value="">— not mapped —</option>
          ${[...areas].sort((a, b) => a.name.localeCompare(b.name)).map(a => b `<option value=${a.area_id} ?selected=${a.area_id === value}>${a.name}</option>`)}
        </select>
      </div>`;
    }
    // ── Tab: Vacuums ──────────────────────────────────────────────────────────
    _renderVacuumsTab() {
        return b `
      <div class="tab-body">
        ${this._config.vacuums.length === 0
            ? b `<p class="hint">No vacuums yet. Add one below.</p>`
            : this._config.vacuums.map((vac, i) => this._renderVacuumAccordion(vac, i))}
        <button class="btn btn--add" @click=${() => this._addVacuum()}>
          <ha-icon icon="mdi:plus"></ha-icon> Add vacuum
        </button>
      </div>`;
    }
    _renderVacuumAccordion(vac, idx) {
        const color = COLOR_HEX[vac.color ?? "green"];
        const isOpen = this._openVac.has(idx);
        return b `
      <div class="acc-row" style=${o({ borderLeft: "3px solid " + color })}>
        <div class="acc-header" @click=${() => this._toggleVac(idx)}>
          ${vac.image
            ? b `<img class="acc-img" src=${vac.image} alt=${vac.name ?? ""} />`
            : b `<ha-icon icon="mdi:robot-vacuum" style=${o({ color, width: "36px", height: "36px" })}></ha-icon>`}
          <div class="acc-info">
            <span class="acc-name">${vac.name || vac.entity || "Unnamed vacuum"}</span>
            <span class="acc-sub">${vac.entity}</span>
          </div>
          <button class="icon-btn" ?disabled=${idx === 0}
            @click=${(e) => { e.stopPropagation(); this._moveVacuum(idx, -1); }}>
            <ha-icon icon="mdi:arrow-up"></ha-icon>
          </button>
          <button class="icon-btn" ?disabled=${idx === this._config.vacuums.length - 1}
            @click=${(e) => { e.stopPropagation(); this._moveVacuum(idx, 1); }}>
            <ha-icon icon="mdi:arrow-down"></ha-icon>
          </button>
          <button class="icon-btn icon-btn--danger"
            @click=${(e) => { e.stopPropagation(); this._deleteVacuum(idx); }}>
            <ha-icon icon="mdi:delete"></ha-icon>
          </button>
          <ha-icon icon=${isOpen ? "mdi:chevron-up" : "mdi:chevron-down"} class="acc-chevron"></ha-icon>
        </div>

        ${isOpen ? b `
          <div class="acc-body">

            <div class="section-title">Basic</div>
            ${this._entityPicker("Vacuum entity", vac.entity, ["vacuum"], v => this._setVacuum(idx, { entity: v }), true)}
            ${this._textField("Display name", vac.name, v => this._setVacuum(idx, { name: v }), "e.g. S8")}
            ${this._textField("Image path", vac.image, v => this._setVacuum(idx, { image: v }), "/local/...")}
            ${this._selectField("Accent colour", vac.color ?? "green", [{ value: "green", label: "Green" }, { value: "blue", label: "Blue" }, { value: "orange", label: "Orange" }], v => this._setVacuum(idx, { color: v }))}
            ${this._selectField("Clean type (time estimate & layers)", vac.clean_type ?? "auto", [{ value: "auto", label: "Auto-detect from clean action" },
            { value: "dry", label: "Dry only" },
            { value: "wet", label: "Wet only" },
            { value: "both", label: "Both — follow live mode" }], v => this._setVacuum(idx, { clean_type: v === "auto" ? undefined : v }))}
            <p class="hint">Controls which time estimate and which dry/wet layer the vacuum uses. "Both" follows the live water mode (needs the integration sensor).</p>

            ${this._renderSensorsSection(idx, vac)}
            ${this._renderCleanActionSection(idx, vac)}
            ${this._renderPresetsSection(idx, vac)}

            <div class="section-title">Rooms (${(vac.rooms ?? []).length})</div>
            ${(vac.rooms ?? []).map((r, ri) => this._renderRoomAccordion(r, idx, ri))}
            <button class="btn btn--add" @click=${() => this._addRoom(idx)}>
              <ha-icon icon="mdi:plus"></ha-icon> Add room
            </button>

          </div>
        ` : A}
      </div>`;
    }
    _renderSensorsSection(vacIdx, vac) {
        const isOpen = this._openSensors.has(vacIdx);
        const configured = [vac.status_entity, vac.battery_entity, vac.last_clean_entity,
            vac.progress_entity, vac.current_room_entity, vac.error_entity].filter(Boolean).length;
        return b `
      <div class="collapsible">
        <div class="collapsible-header" @click=${() => this._toggleSensors(vacIdx)}>
          <span class="collapsible-title">Sensors</span>
          ${configured ? b `<span class="badge">${configured} configured</span>` : A}
          <ha-icon icon=${isOpen ? "mdi:chevron-up" : "mdi:chevron-down"} class="acc-chevron"></ha-icon>
        </div>
        ${isOpen ? b `
          <div class="collapsible-body">
            <p class="hint">Leave the sensors below blank to auto-fill them from the vacuum's device (battery, status, last clean, progress, current room, error).</p>
            ${this._entityPicker("Status", vac.status_entity, ["sensor"], v => this._setVacuum(vacIdx, { status_entity: v || undefined }))}
            ${this._entityPicker("Battery", vac.battery_entity, ["sensor"], v => this._setVacuum(vacIdx, { battery_entity: v || undefined }))}
            ${this._entityPicker("Last clean end", vac.last_clean_entity, ["sensor"], v => this._setVacuum(vacIdx, { last_clean_entity: v || undefined }))}
            ${this._entityPicker("Progress", vac.progress_entity, ["sensor"], v => this._setVacuum(vacIdx, { progress_entity: v || undefined }))}
            ${this._entityPicker("Current room", vac.current_room_entity, ["sensor"], v => this._setVacuum(vacIdx, { current_room_entity: v || undefined }))}
            ${this._entityPicker("Error", vac.error_entity, ["sensor"], v => this._setVacuum(vacIdx, { error_entity: v || undefined }))}
          </div>
        ` : A}
      </div>`;
    }
    _renderPresetsSection(vacIdx, vac) {
        const isOpen = this._openPresets.has(vacIdx);
        const presets = vac.presets ?? [];
        const speeds = this.hass.states[vac.entity]?.attributes["fan_speed_list"] ?? [];
        const ca = vac.clean_action;
        const mopModeEnt = ca?.mop_mode_entity;
        const mopIntEnt = ca?.mop_intensity_entity;
        return b `
      <div class="collapsible">
        <div class="collapsible-header" @click=${() => this._togglePresets(vacIdx)}>
          <span class="collapsible-title">Setting presets</span>
          ${presets.length ? b `<span class="badge">${presets.length}</span>` : A}
          <ha-icon icon=${isOpen ? "mdi:chevron-up" : "mdi:chevron-down"} class="acc-chevron"></ha-icon>
        </div>
        ${isOpen ? b `
          <div class="collapsible-body">
            <p class="hint">Named "how" bundles for Manual mode — the user picks one on the controller, then picks rooms. Mop entities come from Clean action above; presets only set the values. With fewer than 2 presets the controller shows no chips (a default from Clean action is used).</p>
            ${presets.map((p, pi) => b `
              <div class="sub-section">
                <div class="sub-title" style="display:flex;align-items:center;justify-content:space-between">
                  <span>${p.label || p.id}</span>
                  <button class="icon-btn icon-btn--danger" title="Delete preset"
                    @click=${() => this._deletePreset(vacIdx, pi)}>
                    <ha-icon icon="mdi:delete"></ha-icon>
                  </button>
                </div>
                ${this._textField("Label", p.label, v => this._setPreset(vacIdx, pi, { label: v }), "e.g. Suchý")}
                ${this._textField("Icon", p.icon, v => this._setPreset(vacIdx, pi, { icon: v || undefined }), "mdi:broom")}
                ${speeds.length
            ? this._optionSelectFromList("Suction", speeds, p.suction_level, v => this._setPreset(vacIdx, pi, { suction_level: v || undefined }))
            : this._textField("Suction", p.suction_level, v => this._setPreset(vacIdx, pi, { suction_level: v || undefined }), "e.g. max")}
                ${mopModeEnt ? this._optionSelect("Mop mode", mopModeEnt, p.mop_mode, v => this._setPreset(vacIdx, pi, { mop_mode: v || undefined })) : A}
                ${mopIntEnt ? this._optionSelect("Mop intensity", mopIntEnt, p.mop_intensity, v => this._setPreset(vacIdx, pi, { mop_intensity: v || undefined })) : A}
                ${this._numberSlider("Repeat passes", p.repeat ?? 1, 1, 3, 1, v => this._setPreset(vacIdx, pi, { repeat: v }))}
              </div>
            `)}
            <button class="btn btn--add" @click=${() => this._addPreset(vacIdx)}>
              <ha-icon icon="mdi:plus"></ha-icon> Add preset
            </button>
          </div>
        ` : A}
      </div>`;
    }
    _renderCleanActionSection(vacIdx, vac) {
        const isOpen = this._openAction.has(vacIdx);
        const action = vac.clean_action ?? { type: "native" };
        return b `
      <div class="collapsible">
        <div class="collapsible-header" @click=${() => this._toggleAction(vacIdx)}>
          <span class="collapsible-title">Clean action</span>
          <span class="badge">${action.type}</span>
          <ha-icon icon=${isOpen ? "mdi:chevron-up" : "mdi:chevron-down"} class="acc-chevron"></ha-icon>
        </div>
        ${isOpen ? b `
          <div class="collapsible-body">
            ${this._renderCleanActionEditor(vacIdx, vac)}
          </div>
        ` : A}
      </div>`;
    }
    _renderCleanActionEditor(vacIdx, vac) {
        const action = vac.clean_action ?? { type: "native" };
        return b `
      ${this._selectField("Strategy", action.type, [{ value: "native", label: "Native (vacuum.send_command + segment IDs)" },
            { value: "native-auto", label: "Native auto (deprecated — same as Native without the integration)" },
            { value: "native-area", label: "Native area (vacuum.clean_area)" },
            { value: "script", label: "Custom script" }], v => {
            if (v === "script") {
                this._setVacuum(vacIdx, { clean_action: { type: "script", entity_id: "" } });
                return;
            }
            // Carry shared settings over when switching between native variants
            const prev = this._config.vacuums[vacIdx]?.clean_action;
            const carry = {};
            if (prev && prev.type !== "script") {
                for (const k of ["repeat", "suction_level", "mop_mode_entity", "mop_mode",
                    "mop_intensity_entity", "mop_intensity"]) {
                    const val = prev[k];
                    if (val !== undefined)
                        carry[k] = val;
                }
            }
            this._setVacuum(vacIdx, { clean_action: { type: v, ...carry } });
        })}
      ${action.type === "script"
            ? this._renderScriptAction(vacIdx, action)
            : this._renderNativeOptions(vacIdx, action)}`;
    }
    /** Shared editor for all three native strategies — only the hint differs */
    _renderNativeOptions(vacIdx, action) {
        const hint = action.type === "native-area"
            ? b `<p class="hint">Calls <code>vacuum.clean_area</code> (degraded mode only — with the AnyVac integration the START button sends <code>anyvac.clean</code> instead). No repeat; repeat lives server-side in <code>anyvac.clean</code>.</p>`
            : action.type === "native-auto"
                ? b `<p class="hint">Deprecated: the <code>roborock.get_maps</code> auto-resolve was removed (docs/14 §3.7). With the AnyVac integration the backend resolves segments; without it this behaves like Native and needs configured <code>segment_id</code>s.</p>`
                : A;
        return b `
      <div class="sub-section">
        ${hint}
        ${this._numberSlider("Repeat passes", action.repeat ?? 1, 1, 3, 1, v => this._setCleanAction(vacIdx, { repeat: v }))}
        <div class="sub-title">Suction level (optional)</div>
        ${(() => {
            const speeds = this.hass.states[this._config.vacuums[vacIdx]?.entity]
                ?.attributes["fan_speed_list"] ?? [];
            return speeds.length
                ? this._optionSelectFromList("Suction option", speeds, action.suction_level, v => this._setCleanAction(vacIdx, { suction_level: v || undefined }))
                : this._textField("Suction option", action.suction_level, v => this._setCleanAction(vacIdx, { suction_level: v || undefined }), "e.g. balanced");
        })()}
        <div class="sub-title">Mop mode (optional)</div>
        ${this._entityPicker("Mop mode entity", action.mop_mode_entity, ["select"], v => this._setCleanAction(vacIdx, { mop_mode_entity: v || undefined }))}
        ${action.mop_mode_entity ? this._optionSelect("Mop mode option", action.mop_mode_entity, action.mop_mode, v => this._setCleanAction(vacIdx, { mop_mode: v || undefined })) : A}
        <div class="sub-title">Mop intensity (optional)</div>
        ${this._entityPicker("Mop intensity entity", action.mop_intensity_entity, ["select"], v => this._setCleanAction(vacIdx, { mop_intensity_entity: v || undefined }))}
        ${action.mop_intensity_entity ? this._optionSelect("Mop intensity option", action.mop_intensity_entity, action.mop_intensity, v => this._setCleanAction(vacIdx, { mop_intensity: v || undefined })) : A}
      </div>`;
    }
    _renderScriptAction(vacIdx, action) {
        const vars = action.variables ?? {};
        const entries = Object.entries(vars);
        return b `
      <div class="sub-section">
        ${this._entityPicker("Script entity", action.entity_id, ["script"], v => this._setCleanAction(vacIdx, { entity_id: v }))}
        <p class="hint">Tokens: {{ entity }}, {{ selected_segments }}, {{ selected_room_keys }}, {{ selected_area_ids }}</p>
        ${entries.map(([key, val], vi) => b `
          <div class="var-row">
            <input class="text-input text-input--half" .value=${key} placeholder="name"
              @change=${(e) => {
            const newKey = e.target.value;
            const newVars = Object.fromEntries(entries.map(([k, v], i) => [i === vi ? newKey : k, v]));
            this._setCleanAction(vacIdx, { variables: newVars });
        }} />
            <span class="var-sep">&#8594;</span>
            <input class="text-input text-input--half" .value=${val} placeholder="{{ entity }}"
              @change=${(e) => {
            const newVars = { ...vars, [key]: e.target.value };
            this._setCleanAction(vacIdx, { variables: newVars });
        }} />
            <button class="icon-btn icon-btn--danger icon-btn--sm"
              @click=${() => {
            const newVars = Object.fromEntries(entries.filter((_, i) => i !== vi));
            this._setCleanAction(vacIdx, { variables: newVars });
        }}>
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          </div>`)}
        <button class="btn btn--add btn--sm"
          @click=${() => this._setCleanAction(vacIdx, { variables: { ...vars, "": "" } })}>
          <ha-icon icon="mdi:plus"></ha-icon> Add variable
        </button>
      </div>`;
    }
    _renderRoomAccordion(room, vacIdx, roomIdx) {
        const isOpen = (this._openRoom.get(vacIdx) ?? null) === roomIdx;
        return b `
      <div class="room-acc"
        style=${this._dragRoom && this._dragRoom.vac === vacIdx && this._dragRoom.idx !== roomIdx
            ? o({ outline: "2px dashed var(--primary-color,#3b82f6)", outlineOffset: "-2px" }) : A}
        @dragover=${(e) => { if (this._dragRoom && this._dragRoom.vac === vacIdx)
            e.preventDefault(); }}
        @drop=${(e) => { e.preventDefault(); if (this._dragRoom && this._dragRoom.vac === vacIdx)
            this._moveRoom(vacIdx, this._dragRoom.idx, roomIdx); this._dragRoom = null; }}>
        <div class="room-acc-header" @click=${() => this._toggleRoom(vacIdx, roomIdx)}>
          <ha-icon icon="mdi:drag-horizontal-variant" title="Drag to reorder"
            draggable="true" style="cursor:grab;opacity:0.5;--mdc-icon-size:18px;flex-shrink:0"
            @click=${(e) => e.stopPropagation()}
            @dragstart=${(e) => { this._dragRoom = { vac: vacIdx, idx: roomIdx }; if (e.dataTransfer)
            e.dataTransfer.effectAllowed = "move"; }}
            @dragend=${() => { this._dragRoom = null; }}></ha-icon>
          <ha-icon class="room-acc-icon" icon=${room.icon || "mdi:square"}></ha-icon>
          <div class="room-acc-info">
            <span class="room-acc-name">${room.name || room.key || "Unnamed room"}</span>
            ${room.segment_id !== undefined
            ? b `<span class="room-acc-meta">seg ${room.segment_id}</span>` : A}
          </div>
          <button class="icon-btn icon-btn--danger icon-btn--sm"
            @click=${(e) => { e.stopPropagation(); this._deleteRoom(vacIdx, roomIdx); }}>
            <ha-icon icon="mdi:delete"></ha-icon>
          </button>
          <ha-icon icon=${isOpen ? "mdi:chevron-up" : "mdi:chevron-down"} class="acc-chevron"></ha-icon>
        </div>
        ${isOpen ? b `
          <div class="room-acc-body">
            ${this._textField("Key (unique ID)", room.key, v => this._setRoom(vacIdx, roomIdx, { key: v }), "e.g. bedroom")}
            <p class="hint">Tip: keep this identical to the room's name in the Roborock app — the <code>native-auto</code> strategy pairs rooms by this name.</p>
            ${this._textField("Display name", room.name, v => this._setRoom(vacIdx, roomIdx, { name: v }), "e.g. Bedroom")}
            <div class="field field--row">
              <label>Cleaning order</label>
              <input class="text-input text-input--sm" type="number" min="1"
                .value=${String(room.seq ?? "")} placeholder="e.g. 1"
                @change=${(e) => {
            const v = parseInt(e.target.value);
            this._setRoom(vacIdx, roomIdx, { seq: isNaN(v) || v < 1 ? undefined : v });
        }} />
            </div>
            <p class="hint">The order this room is cleaned in (match your Roborock app's room sequence). Used for multi-room progress and calibration.</p>
            ${(this._config.vacuums[vacIdx]?.clean_action?.type === "native-area" ||
            this._config.vacuums[vacIdx]?.clean_action?.type === "native-auto")
            ? b `
                <div class="field field--row">
                  <label>Effective area</label>
                  <strong style="font-size:13px">${
            /* must mirror the card's resolution order */
            room.area_id ?? this._config.area_mappings?.[room.key] ?? room.key}</strong>
                </div>
                <p class="hint map-hint" @click=${() => { this._tab = "global"; }}>
                  Set in <strong>Global tab → Area mappings</strong> →
                </p>`
            : b `
                <div class="field field--row">
                  <label>Segment ID</label>
                  <input class="text-input text-input--sm" type="number"
                    .value=${String(room.segment_id ?? "")} placeholder="e.g. 16"
                    @change=${(e) => {
                const v = parseInt(e.target.value);
                this._setRoom(vacIdx, roomIdx, { segment_id: isNaN(v) ? undefined : v });
            }} />
                </div>
                <p class="hint">Find IDs: Developer Tools → Actions → roborock.get_maps</p>`}
            ${this._numberSlider("Est. clean time (fallback)", room.clean_time_mins ?? 0, 0, 120, 1, v => this._setRoom(vacIdx, roomIdx, { clean_time_mins: v > 0 ? v : undefined }), " min")}
            ${this._entityPicker("Clean time fallback (input_number, legacy)", room.clean_time_entity, ["input_number"], v => this._setRoom(vacIdx, roomIdx, { clean_time_entity: v || undefined }))}
            ${this._entityPicker("Last clean fallback (input_datetime, legacy)", room.last_clean_entity, ["input_datetime"], v => this._setRoom(vacIdx, roomIdx, { last_clean_entity: v || undefined }))}
            <p class="hint">Legacy read-only fallbacks for setups without the AnyVac integration.
              With the integration, clean-time estimates and last-clean history are learned and
              stored server-side — the card never writes these helpers.</p>
            <p class="hint map-hint" @click=${() => { this._tab = "maps"; this._mapVac = vacIdx; this._mapRoom = roomIdx; }}>
              📍 Set position &amp; icon in the <strong>Maps tab</strong> →
            </p>
          </div>
        ` : A}
      </div>`;
    }
    // ── Tab: Maps ─────────────────────────────────────────────────────────────
    _renderMapsTab() {
        const vacuums = this._config.vacuums;
        if (!vacuums.length) {
            return b `<div class="tab-body"><p class="hint">No vacuums configured. Add one in the Vacuums tab.</p></div>`;
        }
        const mapVac = Math.min(this._mapVac, vacuums.length - 1);
        const vac = vacuums[mapVac];
        const map = vac.map ?? { ...DEFAULT_MAP };
        const mapUrl = map.entity
            ? (this.hass.states[map.entity]?.attributes["entity_picture"] ?? "") : "";
        const base = vac.base ?? "map";
        const ib = this._config.map_mode === "merged" ? this._config.image_base : vac.image_base;
        const useImg = this._config.map_mode === "merged" ? !!ib?.src : ((base === "image" || base === "combined") && !!ib?.src);
        const previewUrl = useImg ? (ib.src) : mapUrl;
        const pvRot = useImg ? (ib.rotation ?? 0) : (map.rotation ?? 0);
        const pvScale = useImg ? (ib.scale ?? 100) : (map.scale ?? 100);
        const pvOx = useImg ? (ib.offset_x ?? 0) : (map.offset_x ?? 0);
        const pvOy = useImg ? (ib.offset_y ?? 0) : (map.offset_y ?? 0);
        const rooms = this._editRooms();
        const es = this._editorSeat(mapVac);
        return b `
      <div class="tab-body">

        ${vacuums.length > 1 ? b `
          <div class="pill-row">
            ${vacuums.map((v, i) => b `
              <button class="vac-pill ${i === mapVac ? "vac-pill--active" : ""}"
                @click=${() => { this._mapVac = i; this._mapRoom = null; }}>
                ${v.name || v.entity || "Vacuum " + (i + 1)}
              </button>`)}
          </div>
        ` : A}

        ${this._selectField("Map mode (all vacuums)", this._config.map_mode ?? "split", [{ value: "split", label: "Split — one map per vacuum" }, { value: "merged", label: "Merged — all in one map" }], v => this._setConfig({ map_mode: v === "merged" ? "merged" : undefined }))}

        ${this._mergedEdit ? A : this._selectField("Base layer", (vac.base ?? "map"), [{ value: "map", label: "Vacuum map" }, { value: "combined", label: "Image + map" }], v => this._setVacuum(mapVac, { base: v }))}

        ${this._entityPicker("AnyVac integration sensor", vac.integration_entity, ["sensor"], v => this._setVacuum(mapVac, { integration_entity: v }))}

        ${(vac.integration_entity || this._config.map_mode === "merged") ? this._selectField("Hide vacuum map (show only floorplan + robot/path)", vac.hide_map ? "yes" : "no", [{ value: "no", label: "no" }, { value: "yes", label: "yes" }], v => this._setVacuum(mapVac, { hide_map: v === "yes" })) : A}

        ${vac.integration_entity ? b `
          ${this._textField("Path colour (hex)", vac.path_color, v => this._setVacuum(mapVac, { path_color: v || undefined }), "#69d2ff")}
          ${this._numberSlider("Path width", vac.path_width ?? 100, 20, 300, 10, v => this._setVacuum(mapVac, { path_width: v }), "%")}
          ${this._textField("Mop band colour (hex)", vac.mop_path_color, v => this._setVacuum(mapVac, { mop_path_color: v || undefined }), "#40a9ff")}
          ${this._numberSlider("Mop band opacity", vac.mop_band_opacity ?? 28, 0, 100, 5, v => this._setVacuum(mapVac, { mop_band_opacity: v }), "%")}
          ${this._numberSlider("Mop band width", vac.mop_band_width ?? 100, 20, 400, 10, v => this._setVacuum(mapVac, { mop_band_width: v }), "%")}
          ${vac.image ? this._selectField("Robot image on map (uses status image)", vac.robot_image_on_map ? "yes" : "no", [{ value: "no", label: "no" }, { value: "yes", label: "yes" }], v => this._setVacuum(mapVac, { robot_image_on_map: v === "yes" })) : A}
          ${vac.robot_image_on_map ? this._numberSlider("Robot image size", vac.robot_size ?? 100, 40, 220, 10, v => this._setVacuum(mapVac, { robot_size: v }), "%") : A}
          ${vac.robot_image_on_map ? this._numberSlider("Robot image rotation", vac.robot_image_rotation ?? 0, -180, 180, 15, v => this._setVacuum(mapVac, { robot_image_rotation: v }), "°") : A}
        ` : A}

        ${this._numberSlider("Card height (0=auto)", (this._config.map_mode === "merged" ? this._config.base_height : vac.base_height) ?? 0, 0, 700, 10, v => this._config.map_mode === "merged" ? this._setConfig({ base_height: v > 0 ? v : undefined }) : this._setVacuum(mapVac, { base_height: v > 0 ? v : undefined }), "px")}

        ${(vac.base === "combined" || this._config.map_mode === "merged") ? b `
          ${this._numberSlider("Overlay opacity", vac.overlay_opacity ?? 55, 0, 100, 5, v => this._setVacuum(mapVac, { overlay_opacity: v }), "%")}
          ${this._selectField("Overlay blend", (vac.overlay_blend ?? "normal"), [{ value: "normal", label: "normal" }, { value: "lighten", label: "lighten (isolate path)" }, { value: "screen", label: "screen" }, { value: "plus-lighter", label: "plus-lighter" }], v => this._setVacuum(mapVac, { overlay_blend: v }))}
        ` : A}

        ${vac.base === "image" || vac.base === "combined" || this._config.map_mode === "merged" ? b `
          ${this._config.map_mode === "merged" ? b `<div class="section-title">Shared floorplan (all vacuums)</div>` : A}
          ${this._textField("Image src (URL)", ib?.src, v => this._setEditedImageBase({ src: v }), "/local/anyvac/flat.svg")}
          ${this._numberSlider("Image rotation", ib?.rotation ?? 0, 0, 360, 90, v => this._setEditedImageBase({ rotation: v }), "°")}
          ${this._numberSlider("Image scale", ib?.scale ?? 100, 50, 200, 5, v => this._setEditedImageBase({ scale: v }), "%")}
          ${this._numberSlider("Image offset X", ib?.offset_x ?? 0, -50, 50, 1, v => this._setEditedImageBase({ offset_x: v }), "%")}
          ${this._numberSlider("Image offset Y", ib?.offset_y ?? 0, -50, 50, 1, v => this._setEditedImageBase({ offset_y: v }), "%")}
        ` : A}

        ${this._entityPicker("Map image entity", map.entity, ["image"], v => this._setMap(mapVac, { entity: v }))}

        ${previewUrl ? b `
          <div class="map-pos-container ${this._mapRoom !== null ? "map-pos-container--active" : ""}"
            @click=${(e) => {
            if (this._mapRoom === null)
                return;
            const rect = e.currentTarget.getBoundingClientRect();
            const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
            const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
            this._setEditedRoom(this._mapRoom, { map_x: x, map_y: y });
        }}>
            <div class="map-preview-wrap"
              style=${o(this._pvAR > 0.1 ? { paddingTop: (100 / this._pvAR).toFixed(2) + "%" } : {})}>
              <img class="map-preview-img" src=${previewUrl} alt="Map preview"
                @load=${(e) => {
            const im = e.target;
            if (useImg && im.naturalWidth && im.naturalHeight) {
                const arv = im.naturalWidth / im.naturalHeight;
                if (Math.abs(arv - this._pvAR) > 0.01)
                    this._pvAR = arv;
            }
        }}
                style=${o({
            left: (50 + pvOx) + "%",
            top: (50 + pvOy) + "%",
            width: pvScale + "%",
            transform: "translate(-50%,-50%) rotate(" + pvRot + "deg)",
        })} />
              ${this._mergedEdit && useImg && mapUrl ? b `<img class="map-preview-img" src=${mapUrl} alt="Native map"
                style=${o({
            left: (50 + es.offset_x) + "%",
            top: (50 + es.offset_y) + "%",
            width: es.scale + "%",
            transform: "translate(-50%,-50%) rotate(" + es.rotation + "deg)",
            opacity: "0.5",
        })} />` : A}
              ${rooms.map((r, ri) => b `
                <div class="pos-dot ${ri === this._mapRoom ? "pos-dot--active" : ""}"
                  style=${o({ left: r.map_x + "%", top: r.map_y + "%" })}
                  @click=${(e) => { e.stopPropagation(); this._mapRoom = ri === this._mapRoom ? null : ri; }}>
                  <ha-icon icon=${r.icon || "mdi:square"} style="--mdc-icon-size:14px"></ha-icon>
                </div>`)}
            </div>
          </div>

          <div class="section-title">Map seating ${this._mergedEdit ? "(this vacuum)" : ""}</div>
          ${this._selectField("Seating", (map.seat === "manual" ? "manual" : "auto"), [{ value: "auto", label: "Auto — fit from rooms" },
            { value: "manual", label: "Manual — sliders" }], v => this._setMap(mapVac, { seat: v === "manual" ? "manual" : undefined }))}
          ${map.seat !== "manual" ? (es.auto ? b `
            <p class="hint">✅ Auto-fit from <strong>${es.anchorCount}</strong> room${(es.anchorCount ?? 0) > 1 ? "s" : ""}:
              rot ${es.rotation}° · scale ${es.scale.toFixed(1)}% · offset ${es.offset_x.toFixed(1)}/${es.offset_y.toFixed(1)}%
              · fit error ${(es.residual ?? 0).toFixed(1)}%${(es.residual ?? 0) > 3 ? " ⚠️ check room rectangles / keys" : ""}${es.anchorCount === 1 ? " (single room — orientation estimated from its shape)" : ""}.
              Recomputed live — self-heals after the robot remaps.</p>
          ` : b `
            <p class="hint">Auto-fit inactive — it needs the integration sensor, a floorplan and at least one
              room rectangle whose key matches a room name on this robot's map. Using the manual values below.</p>
          `) : A}
          ${(map.seat === "manual" || !es.auto) ? b `
            ${this._numberSlider("Rotation", map.rotation ?? 0, 0, 360, 90, v => this._setMap(mapVac, { rotation: v }), "°")}
            ${this._numberSlider("Scale", map.scale ?? 100, 50, 200, 5, v => this._setMap(mapVac, { scale: v }), "%")}
            ${this._numberSlider("Offset X", map.offset_x ?? 0, -50, 50, 1, v => this._setMap(mapVac, { offset_x: v }), "%")}
            ${this._numberSlider("Offset Y", map.offset_y ?? 0, -50, 50, 1, v => this._setMap(mapVac, { offset_y: v }), "%")}
          ` : A}
          ${vac.integration_entity ? b `
            <button class="btn btn--add btn--sm" style="align-self:flex-start"
              @click=${() => this._importRooms(mapVac)}>
              <ha-icon icon="mdi:import"></ha-icon> Import missing rooms from this vacuum
            </button>
            <p class="hint">Adds rooms this robot's map knows that aren't on the floorplan yet
              (key = Roborock room name), placed through its current seat. Import from your
              reference (whole-home) robot first; then switch to another robot to supplement
              rooms only it has — it will be seated via the rooms you already share.</p>
          ` : A}

          ${this._config.map_mode === "merged" ? b `<button class="btn btn--add btn--sm" style="align-self:flex-start;margin-top:4px" @click=${() => this._addEditedRoom()}><ha-icon icon="mdi:plus"></ha-icon> Add room</button>` : A}
          ${rooms.length ? b `
            <div class="section-title">Room positions</div>
            <p class="hint">${this._mapRoom !== null
            ? "Click the map to move the selected room. Click the dot to deselect."
            : "Select a room below, then click the map to set its position."}</p>
            <div class="pill-row">
              ${rooms.map((r, ri) => b `
                <button class="room-pill ${ri === this._mapRoom ? "room-pill--active" : ""}"
                  @click=${() => { this._mapRoom = ri === this._mapRoom ? null : ri; }}>
                  <ha-icon icon=${r.icon || "mdi:square"} style="--mdc-icon-size:13px"></ha-icon>
                  ${r.name || r.key || "Room " + (ri + 1)}
                </button>`)}
            </div>

            ${this._mapRoom !== null ? b `
              ${this._config.map_mode === "merged" ? b `
                ${this._textField("Key (= Roborock room name)", rooms[this._mapRoom]?.key, v => this._setEditedRoom(this._mapRoom, { key: v }), "Kitchen")}
                ${this._textField("Name", rooms[this._mapRoom]?.name, v => this._setEditedRoom(this._mapRoom, { name: v }), "Kitchen")}
                <div class="field field--row">
                  <label>Cleaning order</label>
                  <input class="text-input text-input--sm" type="number" min="1"
                    .value=${String(rooms[this._mapRoom]?.seq ?? "")} placeholder="e.g. 1"
                    @change=${(e) => {
            const v = parseInt(e.target.value);
            this._setEditedRoom(this._mapRoom, { seq: isNaN(v) || v < 1 ? undefined : v });
        }} />
                </div>
                <p class="hint">Order this room is cleaned in (match your Roborock app sequence).</p>
                ${this._numberSlider("Dry clean time", rooms[this._mapRoom]?.clean_time_dry ?? 0, 0, 120, 1, v => this._setEditedRoom(this._mapRoom, { clean_time_dry: v > 0 ? v : undefined }), " min")}
                ${this._numberSlider("Wet clean time", rooms[this._mapRoom]?.clean_time_wet ?? 0, 0, 180, 1, v => this._setEditedRoom(this._mapRoom, { clean_time_wet: v > 0 ? v : undefined }), " min")}
              ` : A}
              <div class="section-title" style="margin-top:4px">Position</div>
              ${this._numberSlider("X", rooms[this._mapRoom]?.map_x ?? 50, 0, 100, 1, v => this._setEditedRoom(this._mapRoom, { map_x: v }), "%")}
              ${this._numberSlider("Y", rooms[this._mapRoom]?.map_y ?? 50, 0, 100, 1, v => this._setEditedRoom(this._mapRoom, { map_y: v }), "%")}

              <div class="section-title" style="margin-top:4px">Overlay mode</div>
              ${(() => {
            const room = rooms[this._mapRoom];
            return room?.map_w !== undefined ? b `
                  ${this._numberSlider("Width", room.map_w, 1, 100, 1, v => this._setEditedRoom(this._mapRoom, { map_w: v }), "%")}
                  ${this._numberSlider("Height", room.map_h ?? 15, 1, 100, 1, v => this._setEditedRoom(this._mapRoom, { map_h: v }), "%")}
                  <button class="btn btn--sm" style="align-self:flex-start"
                    @click=${() => this._setEditedRoom(this._mapRoom, { map_w: undefined, map_h: undefined })}>
                    Switch to point mode
                  </button>
                ` : b `
                  <button class="btn btn--add btn--sm" style="align-self:flex-start"
                    @click=${() => this._setEditedRoom(this._mapRoom, { map_w: 20, map_h: 15 })}>
                    <ha-icon icon="mdi:rectangle-outline"></ha-icon> Enable rectangle overlay
                  </button>
                `;
        })()}

              <div class="section-title" style="margin-top:4px">Icon</div>
              ${this._iconPickerField(rooms[this._mapRoom]?.icon, v => this._setEditedRoom(this._mapRoom, { icon: v }))}
              ${rooms[this._mapRoom]?.icon ? b `
                <div class="field">
                  <label>Icon position</label>
                  <div class="anchor-picker">
                    ${["tl", "t", "tr", "l", "c", "r", "bl", "b", "br"].map(pos => {
            const lbl = { tl: "↖", t: "↑", tr: "↗", l: "←", c: "·", r: "→", bl: "↙", b: "↓", br: "↘" };
            return b `<button
                        class="anchor-cell ${(rooms[this._mapRoom]?.icon_anchor ?? "c") === pos ? "anchor-cell--active" : ""}"
                        title=${pos}
                        @click=${() => this._setEditedRoom(this._mapRoom, { icon_anchor: pos })}>
                        ${lbl[pos]}
                      </button>`;
        })}
                  </div>
                  <button class="btn btn--sm" style="margin-top:4px;align-self:flex-start"
                    @click=${() => this._setEditedRoom(this._mapRoom, { icon_anchor: "none" })}>
                    Hide icon in overlay
                  </button>
                </div>
              ` : A}
              ${this._config.map_mode === "merged" ? b `<button class="btn btn--sm" style="align-self:flex-start;margin-top:6px" @click=${() => this._deleteEditedRoom(this._mapRoom)}><ha-icon icon="mdi:delete"></ha-icon> Delete room</button>` : A}
            ` : A}
          ` : b `${this._config.map_mode === "merged" ? b `<p class="hint">No rooms yet — use "Add room" above.</p>` : b `<p class="hint">Add rooms in the Vacuums tab to position them here.</p>`}`}
        ` : b `<p class="hint">Select a map or image above to enable the placement preview.</p>`}

      </div>`;
    }
    // ── Tab: Global ───────────────────────────────────────────────────────────
    _dbgRow(label, value) {
        return b `<div class="field field--row">
      <label>${label}</label>
      <span style="font-size:12px;font-family:monospace;word-break:break-all">${value === undefined || value === null || value === "" ? "—" : String(value)}</span>
    </div>`;
    }
    _renderDebugTab() {
        const fmt = (v) => { try {
            return JSON.stringify(v, null, 1);
        }
        catch {
            return String(v);
        } };
        const pre = "font-size:11px;font-family:monospace;white-space:pre-wrap;word-break:break-all;background:rgba(127,127,127,0.12);padding:6px;border-radius:6px;margin:0;max-height:220px;overflow:auto";
        return b `
      <div class="tab-body">
        <p class="hint">Live values from Home Assistant, read-only — to check the integration is writing data correctly.</p>
        <div class="field field--row">
          <label>Room progress gauges on map</label>
          <label class="toggle-wrap">
            <input type="checkbox" class="toggle-input"
              .checked=${this._config.debug_room_progress ?? false}
              @change=${(e) => this._setConfig({ debug_room_progress: e.target.checked || undefined })} />
            <span class="toggle-track"></span>
          </label>
        </div>
        <p class="hint">Draws a small % gauge on each room (spatial coverage). Spatial % is approximate — the room box includes furniture, so it plateaus below 100%.</p>
        ${this._config.vacuums.map((vac) => {
            const ie = this._intEntityFor(vac);
            const st = ie ? this.hass.states[ie] : undefined;
            const at = (st?.attributes ?? {});
            const ms = (at.mop_signal ?? {});
            return b `
            <div class="section-title">${vac.name ?? vac.entity}</div>
            <div class="sub-section">
              ${!ie
                ? b `<p class="hint">No AnyVac integration sensor found (config or auto-resolve) — backend values unavailable.</p>`
                : !st
                    ? b `<p class="hint">Sensor <code>${ie}</code> not found.</p>`
                    : b `
                    ${this._dbgRow("sensor", `${ie} = ${st.state}`)}
                    ${this._dbgRow("schema_version", at.schema_version)}
                    ${this._dbgRow("pipeline_ok", at.pipeline_ok)}
                    ${this._dbgRow("clean_type", at.clean_type)}
                    ${this._dbgRow("in_cleaning", at.in_cleaning)}
                    ${this._dbgRow("vacuum_room_name", at.vacuum_room_name)}
                    ${this._dbgRow("water_mode_name", ms.water_mode_name)}
                    ${this._dbgRow("fan_speed_name", ms.fan_speed_name)}
                    ${this._dbgRow("path pts (decimated)", Array.isArray(at.path) ? at.path.length : "—")}
                    ${this._dbgRow("path pts (raw)", at.path_points)}
                    ${this._dbgRow("mop pts (raw)", at.mop_path_points)}
                    <div class="sub-title">calib — last single-room decision</div>
                    <pre style=${pre}>${fmt(at.calib_debug)}</pre>
                    <div class="sub-title">rooms_estimate (per vacuum)</div>
                    <pre style=${pre}>${fmt(at.rooms_estimate)}</pre>
                    <div class="sub-title">rooms_last_cleaned (cross-vacuum)</div>
                    <pre style=${pre}>${fmt(at.rooms_last_cleaned)}</pre>
                    <div class="sub-title">rooms_progress — spatial % + time ratio (live)</div>
                    <pre style=${pre}>${fmt(at.rooms_progress)}</pre>
                    <div class="sub-title">rooms (geometry — for spatial coverage)</div>
                    <pre style=${pre}>${fmt((at.rooms ?? []).map((r) => ({ name: r.name, bbox_px: r.bbox_px, x0: r.x0, y0: r.y0, x1: r.x1, y1: r.y1 })))}</pre>
                    <details><summary class="hint" style="cursor:pointer">Raw attributes</summary><pre style=${pre}>${fmt(at)}</pre></details>
                  `}
            </div>`;
        })}
      </div>
    `;
    }
    _renderGlobalTab() {
        const globals = this._config.global_actions ?? [];
        const ths = this._config.room_thresholds ?? DEFAULT_THRESHOLDS;
        return b `
      <div class="tab-body">

        <div class="section-title">Controller</div>
        ${this._selectField("Mode", this._config.ui_mode ?? "auto", [{ value: "auto", label: "Auto — one orchestrated controller" },
            { value: "manual", label: "Manual — per-robot controllers" }], v => this._setConfig({ ui_mode: v }))}

        <div class="section-title" style="margin-top:4px">Global presets (Auto mode)</div>
        <p class="hint">Targeted whole-home cleans for Auto mode (e.g. "Po večeři", "Celý byt"). The integration decides which robots and the order; you pick the scope.</p>
        ${(this._config.global_presets ?? []).map((gp, i) => b `
          <div class="sub-section">
            <div class="sub-title" style="display:flex;align-items:center;justify-content:space-between">
              <span>${gp.label || gp.id}</span>
              <button class="icon-btn icon-btn--danger" title="Delete preset"
                @click=${() => this._deleteGlobalPreset(i)}>
                <ha-icon icon="mdi:delete"></ha-icon>
              </button>
            </div>
            ${this._textField("Label", gp.label, v => this._setGlobalPreset(i, { label: v }), "e.g. Po večeři")}
            ${this._textField("Icon", gp.icon, v => this._setGlobalPreset(i, { icon: v || undefined }), "mdi:silverware-fork-knife")}
            ${this._selectField("Scope", (gp.scope === "all" ? "all" : "select"), [{ value: "all", label: "Whole flat" }, { value: "select", label: "Pick rooms on map" }], v => this._setGlobalPreset(i, { scope: v }))}
            ${this._selectField("Mode", gp.mode ?? "dry", [{ value: "dry", label: "Dry only" },
            { value: "wet", label: "Wet only" },
            { value: "both", label: "Dry then wet (wet follows dry)" }], v => this._setGlobalPreset(i, { mode: v }))}
          </div>
        `)}
        <button class="btn btn--add" @click=${() => this._addGlobalPreset()}>
          <ha-icon icon="mdi:plus"></ha-icon> Add global preset
        </button>

        <div class="section-title" style="margin-top:4px">Global actions</div>
        <p class="hint">Badges that trigger a script across all vacuums (e.g. "Clean whole flat").</p>
        ${globals.length === 0
            ? b `<p class="hint">None configured.</p>`
            : globals.map((ga, i) => this._renderGlobalAccordion(ga, i))}
        <button class="btn btn--add" @click=${() => this._addGlobal()}>
          <ha-icon icon="mdi:plus"></ha-icon> Add global action
        </button>

        <div class="section-title" style="margin-top:4px">Room appearance</div>
        <p class="hint">Applies to all vacuums.</p>
        <div class="field field--row">
          <label>Hide room icons</label>
          <label class="toggle-wrap">
            <input type="checkbox" class="toggle-input"
              .checked=${this._config.room_icon_hidden ?? false}
              @change=${(e) => this._setConfig({ room_icon_hidden: e.target.checked || undefined })} />
            <span class="toggle-track"></span>
          </label>
        </div>
        ${this._numberSlider("Border (idle)", this._config.room_border_normal ?? 2, 0, 12, 1, v => this._setConfig({ room_border_normal: v }), "px")}
        ${this._numberSlider("Border (selected)", this._config.room_border_selected ?? 4, 0, 12, 1, v => this._setConfig({ room_border_selected: v }), "px")}

        <div class="section-title" style="margin-top:4px">Thresholds (border colour by last clean age)</div>
        <p class="hint">Rules ascending — first match wins. Beyond the last = red.</p>
        ${ths.map((th, ti) => b `
          <div class="var-row threshold-row">
            <span class="threshold-label">≤</span>
            <input type="number" class="text-input text-input--sm threshold-days"
              min="0" max="365" .value=${String(th.days)}
              @change=${(e) => {
            const days = parseInt(e.target.value);
            const next = ths.map((t, i) => i === ti ? { ...t, days: isNaN(days) ? t.days : days } : t);
            this._setConfig({ room_thresholds: next });
        }} />
            <span class="threshold-label">days</span>
            <input type="color" class="threshold-color" .value=${th.color}
              @input=${(e) => {
            const color = e.target.value;
            const next = ths.map((t, i) => i === ti ? { ...t, color } : t);
            this._setConfig({ room_thresholds: next });
        }} />
            <button class="icon-btn icon-btn--danger icon-btn--sm"
              @click=${() => {
            const next = ths.filter((_, i) => i !== ti);
            this._setConfig({ room_thresholds: next.length ? next : undefined });
        }}>
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          </div>`)}
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <button class="btn btn--add btn--sm" @click=${() => this._setConfig({ room_thresholds: [...ths, { days: 14, color: "#ff4d4f" }] })}>
            <ha-icon icon="mdi:plus"></ha-icon> Add threshold
          </button>
          ${this._config.room_thresholds ? b `
            <button class="btn btn--sm" @click=${() => this._setConfig({ room_thresholds: undefined })}>
              Reset to defaults
            </button>
          ` : A}
        </div>

        <div class="section-title" style="margin-top:4px">Notifications</div>
        <p class="hint">
          Notifications are built from the AnyVac integration's server-side events
          (<code>anyvac_clean_started</code>, <code>anyvac_clean_finished</code>,
          <code>anyvac_room_done</code>, <code>anyvac_vacuum_error</code>) — the
          integration ships ready-made automation blueprints for them
          (Settings → Automations → Create with blueprint). The card no longer sends
          notifications itself.
        </p>

        ${(() => {
            const usesAreaMappings = this._config.vacuums.some(v => v.clean_action?.type === "native-area" || v.clean_action?.type === "native-auto");
            if (!usesAreaMappings)
                return A;
            const allKeys = [...new Set(this._config.vacuums.flatMap(v => (v.rooms ?? []).map(r => r.key)).filter(Boolean))].sort();
            const mappings = this._config.area_mappings ?? {};
            return b `
            <div class="section-title" style="margin-top:4px">Area mappings</div>
            <p class="hint">Maps room keys to HA areas for the <strong>native-area</strong> and <strong>native-auto</strong> strategies. Set once here — applies to all vacuums.</p>
            ${allKeys.length === 0
                ? b `<p class="hint">No rooms configured yet.</p>`
                : allKeys.map(key => this._areaPicker(key, mappings[key], v => {
                    const next = { ...mappings };
                    if (v)
                        next[key] = v;
                    else
                        delete next[key];
                    this._setConfig({ area_mappings: Object.keys(next).length ? next : undefined });
                }))}
          `;
        })()}

      </div>`;
    }
    _renderGlobalAccordion(ga, idx) {
        const color = COLOR_HEX[ga.color ?? "orange"];
        const isOpen = this._openGlobal.has(idx);
        const action = ga.action;
        const watches = ga.watch_entities ?? [];
        return b `
      <div class="acc-row" style=${o({ borderLeft: "3px solid " + color })}>
        <div class="acc-header" @click=${() => this._toggleGlobal(idx)}>
          ${ga.image
            ? b `<img class="acc-img" src=${ga.image} alt=${ga.name} />`
            : b `<ha-icon icon="mdi:home-floor-a" style=${o({ color, width: "36px", height: "36px" })}></ha-icon>`}
          <div class="acc-info">
            <span class="acc-name">${ga.name || "Unnamed action"}</span>
            <span class="acc-sub">${action.type === "script" ? action.entity_id : action.service}</span>
          </div>
          <button class="icon-btn icon-btn--danger"
            @click=${(e) => { e.stopPropagation(); this._deleteGlobal(idx); }}>
            <ha-icon icon="mdi:delete"></ha-icon>
          </button>
          <ha-icon icon=${isOpen ? "mdi:chevron-up" : "mdi:chevron-down"} class="acc-chevron"></ha-icon>
        </div>
        ${isOpen ? b `
          <div class="acc-body">
            ${this._textField("Display name", ga.name, v => this._setGlobal(idx, { name: v }), "e.g. Whole flat")}
            ${this._textField("Image path", ga.image, v => this._setGlobal(idx, { image: v || undefined }), "/local/...")}
            ${this._selectField("Accent colour", ga.color ?? "orange", [{ value: "green", label: "Green" }, { value: "blue", label: "Blue" }, { value: "orange", label: "Orange" }], v => this._setGlobal(idx, { color: v }))}

            <div class="sub-title">Watch entities (badge glows when any is cleaning)</div>
            ${watches.map((e, wi) => b `
              <div class="var-row">
                <ha-entity-picker .hass=${this.hass} .value=${e} .includeDomains=${["vacuum"]}
                  allow-custom-entity style="flex:1"
                  @value-changed=${(ev) => {
            const updated = [...watches];
            updated[wi] = ev.detail.value;
            this._setGlobal(idx, { watch_entities: updated.filter(Boolean) });
        }}></ha-entity-picker>
                <button class="icon-btn icon-btn--danger icon-btn--sm"
                  @click=${() => this._setGlobal(idx, { watch_entities: watches.filter((_, i) => i !== wi) })}>
                  <ha-icon icon="mdi:close"></ha-icon>
                </button>
              </div>`)}
            <button class="btn btn--add btn--sm"
              @click=${() => this._setGlobal(idx, { watch_entities: [...watches, ""] })}>
              <ha-icon icon="mdi:plus"></ha-icon> Add entity
            </button>

            <div class="sub-title">Action (hold-to-activate)</div>
            ${this._selectField("Type", action.type, [{ value: "script", label: "Script" }, { value: "service", label: "Service call" }], v => this._setGlobal(idx, { action: v === "script"
                ? { type: "script", entity_id: "" }
                : { type: "service", service: "" } }))}
            ${action.type === "script"
            ? this._entityPicker("Script entity", action.entity_id, ["script"], v => this._setGlobalAction(idx, { entity_id: v }))
            : this._textField("Service", action.service, v => this._setGlobalAction(idx, { service: v }), "e.g. script.celkovy_uklid_bytu")}
          </div>
        ` : A}
      </div>`;
    }
    // ── Main render ───────────────────────────────────────────────────────────
    render() {
        if (!this._config)
            return A;
        return b `
      <datalist id="ha-entities"></datalist>
      <div class="editor-root">
        <div class="tabs-bar">
          ${["vacuums", "maps", "global", "debug"].map(t => b `
            <button class="tab-btn ${this._tab === t ? "tab-btn--active" : ""}"
              @click=${() => { this._tab = t; }}>
              ${{ vacuums: "🤖 Vacuums", maps: "🗺 Maps", global: "⚙ Global", debug: "🐞 Debug" }[t]}
            </button>`)}
        </div>
        ${this._tab === "vacuums" ? this._renderVacuumsTab()
            : this._tab === "maps" ? this._renderMapsTab()
                : this._tab === "debug" ? this._renderDebugTab()
                    : this._renderGlobalTab()}
        <div class="editor-footer">anyvac-card v${CARD_VERSION}</div>
      </div>`;
    }
};
// ── Styles ────────────────────────────────────────────────────────────────
AnyVacCardEditor.styles = i$5 `
    .editor-root { display:flex; flex-direction:column; }

    /* ── Tabs ── */
    .tabs-bar {
      display:flex;
      border-bottom:1px solid var(--divider-color,rgba(0,0,0,.12));
      margin-bottom:2px;
    }
    .tab-btn {
      flex:1; padding:10px 4px; background:none; border:none; cursor:pointer;
      font-size:12px; font-weight:600; font-family:inherit;
      color:var(--secondary-text-color);
      border-bottom:2px solid transparent;
      transition:color .15s, border-color .15s;
    }
    .tab-btn--active { color:var(--primary-color); border-bottom-color:var(--primary-color); }

    /* ── Tab body ── */
    .tab-body { display:flex; flex-direction:column; gap:8px; padding:10px 0 4px; }

    /* ── YAML preview ── */
    .yaml-preview {
      background:var(--code-editor-background-color,#1e1e1e);
      color:var(--code-editor-foreground-color,#d4d4d4);
      padding:12px;
      border-radius:6px;
      font-size:11px;
      line-height:1.6;
      overflow-x:auto;
      white-space:pre;
      margin:0;
      font-family:monospace;
    }

    /* ── Vacuum accordion ── */
    .acc-row {
      border-radius:10px;
      border:1px solid var(--divider-color,rgba(0,0,0,.12));
      background:var(--secondary-background-color);
      overflow:hidden;
    }
    .acc-header {
      display:flex; align-items:center; gap:8px;
      padding:10px 10px 10px 12px; cursor:pointer;
    }
    .acc-header:hover { background:rgba(0,0,0,.03); }
    .acc-img  { width:36px; height:36px; border-radius:50%; object-fit:cover; flex-shrink:0; }
    .acc-info { flex:1; display:flex; flex-direction:column; min-width:0; }
    .acc-name { font-weight:600; font-size:14px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
    .acc-sub  { font-size:11px; color:var(--secondary-text-color); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
    .acc-chevron { color:var(--secondary-text-color); flex-shrink:0; }
    .acc-body {
      padding:12px; display:flex; flex-direction:column; gap:8px;
      border-top:1px solid var(--divider-color,rgba(0,0,0,.12));
    }

    /* ── Collapsible (sensors / clean action) ── */
    .collapsible {
      border-radius:6px; border:1px solid var(--divider-color,rgba(0,0,0,.1)); overflow:hidden;
    }
    .collapsible-header {
      display:flex; align-items:center; gap:8px; padding:8px 10px; cursor:pointer;
      background:rgba(0,0,0,.02);
    }
    .collapsible-header:hover { background:rgba(0,0,0,.05); }
    .collapsible-title {
      flex:1; font-size:11px; font-weight:700; letter-spacing:.7px;
      text-transform:uppercase; color:var(--primary-color);
    }
    .collapsible-body { padding:10px; display:flex; flex-direction:column; gap:8px; }

    .badge {
      font-size:10px; font-weight:600; padding:2px 7px; border-radius:10px;
      background:rgba(0,0,0,.07); color:var(--secondary-text-color);
    }

    /* ── Room accordion ── */
    .room-acc {
      border-radius:6px; border:1px solid var(--divider-color,rgba(0,0,0,.1));
      background:rgba(0,0,0,.015); overflow:hidden;
    }
    .room-acc-header { display:flex; align-items:center; gap:8px; padding:8px 10px; cursor:pointer; }
    .room-acc-header:hover { background:rgba(0,0,0,.04); }
    .room-acc-icon { flex-shrink:0; }
    .room-acc-info { flex:1; display:flex; flex-direction:column; }
    .room-acc-name { font-weight:600; font-size:13px; }
    .room-acc-meta { font-size:11px; color:var(--secondary-text-color); }
    .room-acc-body {
      padding:10px; display:flex; flex-direction:column; gap:8px;
      border-top:1px solid var(--divider-color,rgba(0,0,0,.1));
    }

    /* ── Toggle switch ── */
    .toggle-wrap { position:relative; display:inline-flex; align-items:center; cursor:pointer; }
    .toggle-input { position:absolute; opacity:0; width:0; height:0; }
    .toggle-track {
      width:36px; height:20px; border-radius:10px;
      background:var(--divider-color,rgba(0,0,0,.2)); transition:background .2s; position:relative;
    }
    .toggle-track::after {
      content:""; position:absolute; top:2px; left:2px;
      width:16px; height:16px; border-radius:50%; background:white; transition:transform .2s;
    }
    .toggle-input:checked + .toggle-track { background:var(--primary-color); }
    .toggle-input:checked + .toggle-track::after { transform:translateX(16px); }

    /* ── Map hint link ── */
    .map-hint {
      cursor:pointer; color:var(--primary-color) !important;
      text-decoration:underline; text-underline-offset:2px;
    }
    .map-hint:hover { opacity:.8; }

    /* ── Pill rows (Maps tab vacuum/room selectors) ── */
    .pill-row { display:flex; gap:6px; flex-wrap:wrap; }
    .vac-pill {
      padding:5px 12px; border-radius:20px; font-size:12px; font-weight:600; cursor:pointer;
      border:1px solid var(--divider-color,rgba(0,0,0,.15));
      background:var(--secondary-background-color); color:var(--secondary-text-color);
      font-family:inherit;
    }
    .vac-pill--active { background:var(--primary-color); color:white; border-color:var(--primary-color); }
    .room-pill {
      display:flex; align-items:center; gap:4px;
      padding:4px 10px; border-radius:16px; font-size:12px; font-weight:500; cursor:pointer;
      border:1px solid var(--divider-color,rgba(0,0,0,.15));
      background:var(--secondary-background-color); color:var(--secondary-text-color);
      font-family:inherit;
    }
    .room-pill--active { background:rgba(33,150,243,.12); color:var(--primary-color); border-color:var(--primary-color); }

    /* ── Map preview ── */
    .map-pos-container { border-radius:8px; overflow:hidden; }
    .map-pos-container--active { cursor:crosshair; }
    .map-preview-wrap {
      position:relative; width:100%; padding-top:27.5%;
      overflow:hidden; border-radius:8px; background:rgba(0,0,0,.06);
    }
    .map-preview-img { position:absolute; transform-origin:center center; object-fit:cover; }

    .pos-dot {
      position:absolute; transform:translate(-50%,-50%);
      width:26px; height:26px; border-radius:6px;
      background:rgba(0,0,0,.55); border:2px solid rgba(255,255,255,.4);
      display:flex; align-items:center; justify-content:center;
      color:rgba(255,255,255,.7); cursor:pointer;
    }
    .pos-dot--active { background:rgba(33,150,243,.75); border-color:#2196F3; color:white; }

    .two-col { display:flex; gap:8px; }
    .two-col > * { flex:1; min-width:0; }

    /* ── Section title ── */
    .section-title {
      font-size:12px; font-weight:700; letter-spacing:.8px;
      text-transform:uppercase; color:var(--primary-color);
      border-bottom:1px solid var(--divider-color,rgba(0,0,0,.12));
      padding-bottom:4px; margin-bottom:2px;
    }
    .sub-section {
      display:flex; flex-direction:column; gap:8px;
      padding-left:8px; border-left:3px solid var(--divider-color,rgba(0,0,0,.1));
    }
    .sub-title { font-size:11px; font-weight:600; color:var(--secondary-text-color); margin-top:4px; }

    /* ── Fields ── */
    .field { display:flex; flex-direction:column; gap:4px; }
    .field--row { flex-direction:row; align-items:center; }
    .field--row label { width:130px; flex-shrink:0; }
    label { font-size:13px; color:var(--secondary-text-color); }
    .required { color:var(--error-color,#f44336); }

    .text-input {
      width:100%; box-sizing:border-box; padding:8px 10px;
      border:1px solid var(--divider-color,rgba(0,0,0,.2)); border-radius:6px;
      background:var(--card-background-color); color:var(--primary-text-color);
      font-size:13px; font-family:inherit;
    }
    .text-input--sm   { width:auto; flex:1; }
    .text-input--half { flex:1; min-width:0; }

    .select-input {
      flex:1; padding:6px 8px;
      border:1px solid var(--divider-color,rgba(0,0,0,.2)); border-radius:6px;
      background:var(--card-background-color); color:var(--primary-text-color);
      font-size:13px; font-family:inherit; cursor:pointer;
    }

    .slider-wrap { display:flex; align-items:center; gap:8px; flex:1; }
    .slider { flex:1; accent-color:var(--primary-color); }
    .slider-val { width:52px; text-align:right; font-size:13px; font-weight:600; color:var(--primary-color); flex-shrink:0; }

    /* ── Buttons ── */
    .btn {
      display:flex; align-items:center; gap:6px;
      padding:8px 14px; border-radius:8px;
      cursor:pointer; font-size:13px; font-weight:600; font-family:inherit; border:none;
    }
    .btn--add {
      background:rgba(33,150,243,.1); color:var(--primary-color);
      border:1px dashed var(--primary-color) !important;
    }
    .btn--sm { padding:4px 10px; font-size:12px; }

    .icon-btn {
      display:flex; align-items:center; justify-content:center;
      width:32px; height:32px; border-radius:6px;
      cursor:pointer; background:transparent; border:none; color:var(--secondary-text-color);
      flex-shrink:0;
    }
    .icon-btn:hover { background:rgba(0,0,0,.08); }
    .icon-btn:disabled { opacity:.35; cursor:default; }
    .icon-btn--danger { color:var(--error-color,#f44336); }
    .icon-btn--sm { width:24px; height:24px; }

    /* ── Misc ── */
    .hint { font-size:12px; color:var(--secondary-text-color); margin:0; }

    .editor-footer {
      margin-top:8px; padding-top:6px;
      border-top:1px solid var(--divider-color,rgba(0,0,0,.12));
      font-size:11px; text-align:right;
      color:var(--secondary-text-color); opacity:.7;
    }

    .var-row { display:flex; align-items:center; gap:6px; }
    .var-sep { color:var(--secondary-text-color); flex-shrink:0; }

    .anchor-picker { display:grid; grid-template-columns:repeat(3, 32px); gap:3px; }
    .anchor-cell {
      width:32px; height:32px; border-radius:6px; cursor:pointer;
      background:var(--secondary-background-color);
      border:1px solid var(--divider-color,rgba(0,0,0,.2));
      font-size:15px; display:flex; align-items:center; justify-content:center;
    }
    .anchor-cell--active { background:var(--primary-color); color:white; border-color:var(--primary-color); }

    .threshold-row { align-items:center; gap:6px; }
    .threshold-label { font-size:12px; color:var(--secondary-text-color); flex-shrink:0; }
    .threshold-days { width:56px !important; flex:none; padding:6px 8px; }
    .threshold-color {
      width:36px; height:28px; padding:2px; border-radius:6px;
      border:1px solid var(--divider-color,rgba(0,0,0,.2));
      background:var(--card-background-color); cursor:pointer;
    }
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
], AnyVacCardEditor.prototype, "_dragRoom", void 0);
__decorate([
    r()
], AnyVacCardEditor.prototype, "_openVac", void 0);
__decorate([
    r()
], AnyVacCardEditor.prototype, "_openSensors", void 0);
__decorate([
    r()
], AnyVacCardEditor.prototype, "_openPresets", void 0);
__decorate([
    r()
], AnyVacCardEditor.prototype, "_openAction", void 0);
__decorate([
    r()
], AnyVacCardEditor.prototype, "_openGlobal", void 0);
__decorate([
    r()
], AnyVacCardEditor.prototype, "_openRoom", void 0);
__decorate([
    r()
], AnyVacCardEditor.prototype, "_mapVac", void 0);
__decorate([
    r()
], AnyVacCardEditor.prototype, "_mapRoom", void 0);
__decorate([
    r()
], AnyVacCardEditor.prototype, "_pvAR", void 0);
AnyVacCardEditor = __decorate([
    t$1(EDITOR_NAME)
], AnyVacCardEditor);

export { AnyVacCard, AnyVacCardEditor };
