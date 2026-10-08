/* AnyVac Card — https://github.com/Michailjovic/anyvac-card */
function __decorate(t,e,o,s){var l,h=arguments.length,d=h<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,o):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)d=Reflect.decorate(t,e,o,s);else for(var p=t.length-1;p>=0;p--)(l=t[p])&&(d=(h<3?l(d):h>3?l(e,o,d):l(e,o))||d);return h>3&&d&&Object.defineProperty(e,o,d),d}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,o=Symbol(),s=new WeakMap;let l=class n{constructor(t,e,s){if(this._$cssResult$=!0,s!==o)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const o=this.t;if(e&&void 0===t){const e=void 0!==o&&1===o.length;e&&(t=s.get(o)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&s.set(o,t))}return t}toString(){return this.cssText}};const i$6=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,o,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+t[s+1],t[0]);return new l(s,t,o)},h=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const o of t.cssRules)e+=o.cssText;return(t=>new l("string"==typeof t?t:t+"",void 0,o))(e)})(t):t,{is:d,defineProperty:p,getOwnPropertyDescriptor:u,getOwnPropertyNames:m,getOwnPropertySymbols:_,getPrototypeOf:f}=Object,v=globalThis,b=v.trustedTypes,w=b?b.emptyScript:"",$=v.reactiveElementPolyfillSupport,d$2=(t,e)=>t,C={toAttribute(t,e){switch(e){case Boolean:t=t?w:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let o=t;switch(e){case Boolean:o=null!==t;break;case Number:o=null===t?null:Number(t);break;case Object:case Array:try{o=JSON.parse(t)}catch(t){o=null}}return o}},f$2=(t,e)=>!d(t,e),A={attribute:!0,type:String,converter:C,reflect:!1,useDefault:!1,hasChanged:f$2};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),v.litPropertyMetadata??=new WeakMap;let P=class y extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=A){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const o=Symbol(),s=this.getPropertyDescriptor(t,o,e);void 0!==s&&p(this.prototype,t,s)}}static getPropertyDescriptor(t,e,o){const{get:s,set:l}=u(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const h=s?.call(this);l?.call(this,e),this.requestUpdate(t,h,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??A}static _$Ei(){if(this.hasOwnProperty(d$2("elementProperties")))return;const t=f(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(d$2("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(d$2("properties"))){const t=this.properties,e=[...m(t),..._(t)];for(const o of e)this.createProperty(o,t[o])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,o]of e)this.elementProperties.set(t,o)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const o=this._$Eu(t,e);void 0!==o&&this._$Eh.set(o,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const o=new Set(t.flat(1/0).reverse());for(const t of o)e.unshift(h(t))}else void 0!==t&&e.push(h(t));return e}static _$Eu(t,e){const o=e.attribute;return!1===o?void 0:"string"==typeof o?o:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const o of e.keys())this.hasOwnProperty(o)&&(t.set(o,this[o]),delete this[o]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const o=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((o,s)=>{if(e)o.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of s){const s=document.createElement("style"),l=t.litNonce;void 0!==l&&s.setAttribute("nonce",l),s.textContent=e.cssText,o.appendChild(s)}})(o,this.constructor.elementStyles),o}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,o){this._$AK(t,o)}_$ET(t,e){const o=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,o);if(void 0!==s&&!0===o.reflect){const l=(void 0!==o.converter?.toAttribute?o.converter:C).toAttribute(e,o.type);this._$Em=t,null==l?this.removeAttribute(s):this.setAttribute(s,l),this._$Em=null}}_$AK(t,e){const o=this.constructor,s=o._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=o.getPropertyOptions(s),l="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:C;this._$Em=s;const h=l.fromAttribute(e,t.type);this[s]=h??this._$Ej?.get(s)??h,this._$Em=null}}requestUpdate(t,e,o,s=!1,l){if(void 0!==t){const h=this.constructor;if(!1===s&&(l=this[t]),o??=h.getPropertyOptions(t),!((o.hasChanged??f$2)(l,e)||o.useDefault&&o.reflect&&l===this._$Ej?.get(t)&&!this.hasAttribute(h._$Eu(t,o))))return;this.C(t,e,o)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:o,reflect:s,wrapped:l},h){o&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,h??e??this[t]),!0!==l||void 0!==h)||(this._$AL.has(t)||(this.hasUpdated||o||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,o]of t){const{wrapped:t}=o,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,o,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};P.elementStyles=[],P.shadowRootOptions={mode:"open"},P[d$2("elementProperties")]=new Map,P[d$2("finalized")]=new Map,$?.({ReactiveElement:P}),(v.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const F=globalThis,i$4=t=>t,E=F.trustedTypes,T=E?E.createPolicy("lit-html",{createHTML:t=>t}):void 0,O="$lit$",B=`lit$${Math.random().toFixed(9).slice(2)}$`,G="?"+B,j=`<${G}>`,q=document,c$1=()=>q.createComment(""),a$1=t=>null===t||"object"!=typeof t&&"function"!=typeof t,W=Array.isArray,U="[ \t\n\f\r]",Y=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,K=/-->/g,X=/>/g,J=RegExp(`>|${U}(?:([^\\s"'>=/]+)(${U}*=${U}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),Q=/'/g,tt=/"/g,et=/^(?:script|style|textarea|title)$/i,ot=Symbol.for("lit-noChange"),it=Symbol.for("lit-nothing"),st=new WeakMap,rt=q.createTreeWalker(q,129);function V$1(t,e){if(!W(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==T?T.createHTML(e):e}let nt=class S{constructor({strings:t,_$litType$:e},o){let s;this.parts=[];let l=0,h=0;const d=t.length-1,p=this.parts,[u,m]=((t,e)=>{const o=t.length-1,s=[];let l,h=2===e?"<svg>":3===e?"<math>":"",d=Y;for(let e=0;e<o;e++){const o=t[e];let p,u,m=-1,_=0;for(;_<o.length&&(d.lastIndex=_,u=d.exec(o),null!==u);)_=d.lastIndex,d===Y?"!--"===u[1]?d=K:void 0!==u[1]?d=X:void 0!==u[2]?(et.test(u[2])&&(l=RegExp("</"+u[2],"g")),d=J):void 0!==u[3]&&(d=J):d===J?">"===u[0]?(d=l??Y,m=-1):void 0===u[1]?m=-2:(m=d.lastIndex-u[2].length,p=u[1],d=void 0===u[3]?J:'"'===u[3]?tt:Q):d===tt||d===Q?d=J:d===K||d===X?d=Y:(d=J,l=void 0);const f=d===J&&t[e+1].startsWith("/>")?" ":"";h+=d===Y?o+j:m>=0?(s.push(p),o.slice(0,m)+O+o.slice(m)+B+f):o+B+(-2===m?e:f)}return[V$1(t,h+(t[o]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]})(t,e);if(this.el=S.createElement(u,o),rt.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=rt.nextNode())&&p.length<d;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(O)){const e=m[h++],o=s.getAttribute(t).split(B),d=/([.?@])?(.*)/.exec(e);p.push({type:1,index:l,name:d[2],strings:o,ctor:"."===d[1]?dt:"?"===d[1]?pt:"@"===d[1]?ut:ht}),s.removeAttribute(t)}else t.startsWith(B)&&(p.push({type:6,index:l}),s.removeAttribute(t));if(et.test(s.tagName)){const t=s.textContent.split(B),e=t.length-1;if(e>0){s.textContent=E?E.emptyScript:"";for(let o=0;o<e;o++)s.append(t[o],c$1()),rt.nextNode(),p.push({type:2,index:++l});s.append(t[e],c$1())}}}else if(8===s.nodeType)if(s.data===G)p.push({type:2,index:l});else{let t=-1;for(;-1!==(t=s.data.indexOf(B,t+1));)p.push({type:7,index:l}),t+=B.length-1}l++}}static createElement(t,e){const o=q.createElement("template");return o.innerHTML=t,o}};function M$1(t,e,o=t,s){if(e===ot)return e;let l=void 0!==s?o._$Co?.[s]:o._$Cl;const h=a$1(e)?void 0:e._$litDirective$;return l?.constructor!==h&&(l?._$AO?.(!1),void 0===h?l=void 0:(l=new h(t),l._$AT(t,o,s)),void 0!==s?(o._$Co??=[])[s]=l:o._$Cl=l),void 0!==l&&(e=M$1(t,l._$AS(t,e.values),l,s)),e}let lt=class R{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:o}=this._$AD,s=(t?.creationScope??q).importNode(e,!0);rt.currentNode=s;let l=rt.nextNode(),h=0,d=0,p=o[0];for(;void 0!==p;){if(h===p.index){let e;2===p.type?e=new ct(l,l.nextSibling,this,t):1===p.type?e=new p.ctor(l,p.name,p.strings,this,t):6===p.type&&(e=new mt(l,this,t)),this._$AV.push(e),p=o[++d]}h!==p?.index&&(l=rt.nextNode(),h++)}return rt.currentNode=q,s}p(t){let e=0;for(const o of this._$AV)void 0!==o&&(void 0!==o.strings?(o._$AI(t,o,e),e+=o.strings.length-2):o._$AI(t[e])),e++}},ct=class k{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,o,s){this.type=2,this._$AH=it,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=o,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=M$1(this,t,e),a$1(t)?t===it||null==t||""===t?(this._$AH!==it&&this._$AR(),this._$AH=it):t!==this._$AH&&t!==ot&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>W(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==it&&a$1(this._$AH)?this._$AA.nextSibling.data=t:this.T(q.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:o}=t,s="number"==typeof o?this._$AC(t):(void 0===o.el&&(o.el=nt.createElement(V$1(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new lt(s,this),o=t.u(this.options);t.p(e),this.T(o),this._$AH=t}}_$AC(t){let e=st.get(t.strings);return void 0===e&&st.set(t.strings,e=new nt(t)),e}k(t){W(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let o,s=0;for(const l of t)s===e.length?e.push(o=new k(this.O(c$1()),this.O(c$1()),this,this.options)):o=e[s],o._$AI(l),s++;s<e.length&&(this._$AR(o&&o._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=i$4(t).nextSibling;i$4(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}},ht=class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,o,s,l){this.type=1,this._$AH=it,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=l,o.length>2||""!==o[0]||""!==o[1]?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=it}_$AI(t,e=this,o,s){const l=this.strings;let h=!1;if(void 0===l)t=M$1(this,t,e,0),h=!a$1(t)||t!==this._$AH&&t!==ot,h&&(this._$AH=t);else{const s=t;let d,p;for(t=l[0],d=0;d<l.length-1;d++)p=M$1(this,s[o+d],e,d),p===ot&&(p=this._$AH[d]),h||=!a$1(p)||p!==this._$AH[d],p===it?t=it:t!==it&&(t+=(p??"")+l[d+1]),this._$AH[d]=p}h&&!s&&this.j(t)}j(t){t===it?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},dt=class I extends ht{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===it?void 0:t}},pt=class L extends ht{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==it)}},ut=class z extends ht{constructor(t,e,o,s,l){super(t,e,o,s,l),this.type=5}_$AI(t,e=this){if((t=M$1(this,t,e,0)??it)===ot)return;const o=this._$AH,s=t===it&&o!==it||t.capture!==o.capture||t.once!==o.once||t.passive!==o.passive,l=t!==it&&(o===it||s);s&&this.element.removeEventListener(this.name,this,o),l&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},mt=class Z{constructor(t,e,o){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(t){M$1(this,t)}};const gt=F.litHtmlPolyfillSupport;gt?.(nt,ct),(F.litHtmlVersions??=[]).push("3.3.3");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const _t=globalThis,i$3=t=>t,ft=_t.trustedTypes,vt=ft?ft.createPolicy("lit-html",{createHTML:t=>t}):void 0,bt="$lit$",yt=`lit$${Math.random().toFixed(9).slice(2)}$`,xt="?"+yt,wt=`<${xt}>`,$t=document,c=()=>$t.createComment(""),a=t=>null===t||"object"!=typeof t&&"function"!=typeof t,kt=Array.isArray,St="[ \t\n\f\r]",Ct=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Mt=/-->/g,Rt=/>/g,At=RegExp(`>|${St}(?:([^\\s"'>=/]+)(${St}*=${St}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),Pt=/'/g,Ft=/"/g,Et=/^(?:script|style|textarea|title)$/i,x=t=>(e,...o)=>({_$litType$:t,strings:e,values:o}),zt=x(1),Tt=x(2),Dt=Symbol.for("lit-noChange"),Ht=Symbol.for("lit-nothing"),It=new WeakMap,Nt=$t.createTreeWalker($t,129);function V(t,e){if(!kt(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==vt?vt.createHTML(e):e}const N=(t,e)=>{const o=t.length-1,s=[];let l,h=2===e?"<svg>":3===e?"<math>":"",d=Ct;for(let e=0;e<o;e++){const o=t[e];let p,u,m=-1,_=0;for(;_<o.length&&(d.lastIndex=_,u=d.exec(o),null!==u);)_=d.lastIndex,d===Ct?"!--"===u[1]?d=Mt:void 0!==u[1]?d=Rt:void 0!==u[2]?(Et.test(u[2])&&(l=RegExp("</"+u[2],"g")),d=At):void 0!==u[3]&&(d=At):d===At?">"===u[0]?(d=l??Ct,m=-1):void 0===u[1]?m=-2:(m=d.lastIndex-u[2].length,p=u[1],d=void 0===u[3]?At:'"'===u[3]?Ft:Pt):d===Ft||d===Pt?d=At:d===Mt||d===Rt?d=Ct:(d=At,l=void 0);const f=d===At&&t[e+1].startsWith("/>")?" ":"";h+=d===Ct?o+wt:m>=0?(s.push(p),o.slice(0,m)+bt+o.slice(m)+yt+f):o+yt+(-2===m?e:f)}return[V(t,h+(t[o]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class S{constructor({strings:t,_$litType$:e},o){let s;this.parts=[];let l=0,h=0;const d=t.length-1,p=this.parts,[u,m]=N(t,e);if(this.el=S.createElement(u,o),Nt.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=Nt.nextNode())&&p.length<d;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(bt)){const e=m[h++],o=s.getAttribute(t).split(yt),d=/([.?@])?(.*)/.exec(e);p.push({type:1,index:l,name:d[2],strings:o,ctor:"."===d[1]?I:"?"===d[1]?L:"@"===d[1]?z:H}),s.removeAttribute(t)}else t.startsWith(yt)&&(p.push({type:6,index:l}),s.removeAttribute(t));if(Et.test(s.tagName)){const t=s.textContent.split(yt),e=t.length-1;if(e>0){s.textContent=ft?ft.emptyScript:"";for(let o=0;o<e;o++)s.append(t[o],c()),Nt.nextNode(),p.push({type:2,index:++l});s.append(t[e],c())}}}else if(8===s.nodeType)if(s.data===xt)p.push({type:2,index:l});else{let t=-1;for(;-1!==(t=s.data.indexOf(yt,t+1));)p.push({type:7,index:l}),t+=yt.length-1}l++}}static createElement(t,e){const o=$t.createElement("template");return o.innerHTML=t,o}}function M(t,e,o=t,s){if(e===Dt)return e;let l=void 0!==s?o._$Co?.[s]:o._$Cl;const h=a(e)?void 0:e._$litDirective$;return l?.constructor!==h&&(l?._$AO?.(!1),void 0===h?l=void 0:(l=new h(t),l._$AT(t,o,s)),void 0!==s?(o._$Co??=[])[s]=l:o._$Cl=l),void 0!==l&&(e=M(t,l._$AS(t,e.values),l,s)),e}class R{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:o}=this._$AD,s=(t?.creationScope??$t).importNode(e,!0);Nt.currentNode=s;let l=Nt.nextNode(),h=0,d=0,p=o[0];for(;void 0!==p;){if(h===p.index){let e;2===p.type?e=new k(l,l.nextSibling,this,t):1===p.type?e=new p.ctor(l,p.name,p.strings,this,t):6===p.type&&(e=new Z(l,this,t)),this._$AV.push(e),p=o[++d]}h!==p?.index&&(l=Nt.nextNode(),h++)}return Nt.currentNode=$t,s}p(t){let e=0;for(const o of this._$AV)void 0!==o&&(void 0!==o.strings?(o._$AI(t,o,e),e+=o.strings.length-2):o._$AI(t[e])),e++}}class k{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,o,s){this.type=2,this._$AH=Ht,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=o,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=M(this,t,e),a(t)?t===Ht||null==t||""===t?(this._$AH!==Ht&&this._$AR(),this._$AH=Ht):t!==this._$AH&&t!==Dt&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>kt(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Ht&&a(this._$AH)?this._$AA.nextSibling.data=t:this.T($t.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:o}=t,s="number"==typeof o?this._$AC(t):(void 0===o.el&&(o.el=S.createElement(V(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new R(s,this),o=t.u(this.options);t.p(e),this.T(o),this._$AH=t}}_$AC(t){let e=It.get(t.strings);return void 0===e&&It.set(t.strings,e=new S(t)),e}k(t){kt(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let o,s=0;for(const l of t)s===e.length?e.push(o=new k(this.O(c()),this.O(c()),this,this.options)):o=e[s],o._$AI(l),s++;s<e.length&&(this._$AR(o&&o._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=i$3(t).nextSibling;i$3(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,o,s,l){this.type=1,this._$AH=Ht,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=l,o.length>2||""!==o[0]||""!==o[1]?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=Ht}_$AI(t,e=this,o,s){const l=this.strings;let h=!1;if(void 0===l)t=M(this,t,e,0),h=!a(t)||t!==this._$AH&&t!==Dt,h&&(this._$AH=t);else{const s=t;let d,p;for(t=l[0],d=0;d<l.length-1;d++)p=M(this,s[o+d],e,d),p===Dt&&(p=this._$AH[d]),h||=!a(p)||p!==this._$AH[d],p===Ht?t=Ht:t!==Ht&&(t+=(p??"")+l[d+1]),this._$AH[d]=p}h&&!s&&this.j(t)}j(t){t===Ht?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class I extends H{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Ht?void 0:t}}class L extends H{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Ht)}}class z extends H{constructor(t,e,o,s,l){super(t,e,o,s,l),this.type=5}_$AI(t,e=this){if((t=M(this,t,e,0)??Ht)===Dt)return;const o=this._$AH,s=t===Ht&&o!==Ht||t.capture!==o.capture||t.once!==o.once||t.passive!==o.passive,l=t!==Ht&&(o===Ht||s);s&&this.element.removeEventListener(this.name,this,o),l&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class Z{constructor(t,e,o){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(t){M(this,t)}}const Ot=_t.litHtmlPolyfillSupport;Ot?.(S,k),(_t.litHtmlVersions??=[]).push("3.3.3");const D=(t,e,o)=>{const s=o?.renderBefore??e;let l=s._$litPart$;if(void 0===l){const t=o?.renderBefore??null;s._$litPart$=l=new k(e.insertBefore(c(),t),t,void 0,o??{})}return l._$AI(t),l
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */},Bt=globalThis;let Gt=class i extends P{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=D(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Dt}};Gt._$litElement$=!0,Gt.finalized=!0,Bt.litElementHydrateSupport?.({LitElement:Gt});const Vt=Bt.litElementPolyfillSupport;Vt?.({LitElement:Gt}),(Bt.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1=t=>(e,o)=>{void 0!==o?o.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},jt={attribute:!0,type:String,converter:C,reflect:!1,hasChanged:f$2},r$1=(t=jt,e,o)=>{const{kind:s,metadata:l}=o;let h=globalThis.litPropertyMetadata.get(l);if(void 0===h&&globalThis.litPropertyMetadata.set(l,h=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),h.set(o.name,t),"accessor"===s){const{name:s}=o;return{set(o){const l=e.get.call(this);e.set.call(this,o),this.requestUpdate(s,l,t,!0,o)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=o;return function(o){const l=this[s];e.call(this,o),this.requestUpdate(s,l,t,!0,o)}}throw Error("Unsupported decorator location: "+s)};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function n$1(t){return(e,o)=>"object"==typeof o?r$1(t,e,o):((t,e,o)=>{const s=e.hasOwnProperty(o);return e.constructor.createProperty(o,t),s?Object.getOwnPropertyDescriptor(e,o):void 0})(t,e,o)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function r(t){return n$1({...t,state:!0,attribute:!1})}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const qt=1;let Wt=class i{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,o){this._$Ct=t,this._$AM=e,this._$Ci=o}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Lt="important",Ut=" !"+Lt,Yt=(t=>(...e)=>({_$litDirective$:t,values:e}))(class extends Wt{constructor(t){if(super(t),t.type!==qt||"style"!==t.name||t.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,o)=>{const s=t[o];return null==s?e:e+`${o=o.includes("-")?o:o.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`},"")}update(t,[e]){const{style:o}=t.element;if(void 0===this.ft)return this.ft=new Set(Object.keys(e)),this.render(e);for(const t of this.ft)null==e[t]&&(this.ft.delete(t),t.includes("-")?o.removeProperty(t):o[t]=null);for(const t in e){const s=e[t];if(null!=s){this.ft.add(t);const e="string"==typeof s&&s.endsWith(Ut);t.includes("-")||e?o.setProperty(t,e?s.slice(0,-11):s,e?Lt:""):o[t]=s}}return ot}}),Kt="anyvac-card",Xt="anyvac-card-editor",Zt="1.50.0",Jt=600,Qt={cleaning:["Cleaning","#52c41a","mdi:broom"],segment_cleaning:["Cleaning rooms","#52c41a","mdi:broom"],zoned_cleaning:["Zone cleaning","#52c41a","mdi:broom"],spot_cleaning:["Spot cleaning","#52c41a","mdi:target"],starting:["Starting","#52c41a","mdi:play"],segment_mopping:["Mopping rooms","#40a9ff","mdi:water"],zoned_mopping:["Zone mopping","#40a9ff","mdi:water"],robot_status_mopping:["Mopping","#40a9ff","mdi:water"],clean_mop_cleaning:["Vacuuming+mopping","#52c41a","mdi:water-plus"],clean_mop_mopping:["Vacuuming+mopping","#52c41a","mdi:water-plus"],segment_clean_mop_cleaning:["Rooms (vac)","#52c41a","mdi:water-plus"],segment_clean_mop_mopping:["Rooms (mop)","#52c41a","mdi:water-plus"],zoned_clean_mop_cleaning:["Zones (vac)","#52c41a","mdi:water-plus"],zoned_clean_mop_mopping:["Zones (mop)","#52c41a","mdi:water-plus"],washing_the_mop:["Washing mop","#9254de","mdi:shower-head"],washing_the_mop_2:["Washing mop","#9254de","mdi:shower-head"],going_to_wash_the_mop:["Going to wash mop","#9254de","mdi:shower-head"],air_drying_stopping:["Drying mop","#9254de","mdi:weather-windy"],back_to_dock_washing_duster:["Dock + washing","#faad14","mdi:home-import-outline"],returning_home:["Returning home","#faad14","mdi:home-import-outline"],docking:["Docking","#faad14","mdi:home-import-outline"],going_to_target:["Going to target","#40a9ff","mdi:target"],charging:["Charging","rgba(var(--avc-ink-rgb),0.75)","mdi:lightning-bolt"],charging_complete:["Fully charged","#52c41a","mdi:check-circle-outline"],docked:["Docked","rgba(var(--avc-ink-rgb),0.75)","mdi:check-circle-outline"],charger_disconnected:["Charger disconnected","#faad14","mdi:power-plug-off-outline"],emptying_the_bin:["Emptying bin","#faad14","mdi:delete-empty-outline"],idle:["Idle","rgba(var(--avc-ink-rgb),0.45)","mdi:sleep"],paused:["Paused","#faad14","mdi:pause"],mapping:["Mapping","#40a9ff","mdi:map-search-outline"],remote_control_active:["Remote control","#40a9ff","mdi:gamepad-variant-outline"],manual_mode:["Manual mode","#40a9ff","mdi:gamepad-variant-outline"],updating:["Updating","#faad14","mdi:update"],in_call:["In call","#faad14","mdi:phone"],shutting_down:["Shutting down","rgba(var(--avc-ink-rgb),0.4)","mdi:power"],error:["Error","#ff4d4f","mdi:alert-circle-outline"],charging_problem:["Charging problem","#ff4d4f","mdi:alert-outline"],locked:["Locked","#ff4d4f","mdi:lock-outline"],device_offline:["Offline","#ff4d4f","mdi:wifi-off"]},te={"#52c41a":"#5DBB6A","#40a9ff":"#4DA3E8","#9254de":"#A48BE0","#faad14":"#E0A84A","#ff4d4f":"#E5675F"},ee={green:"#52c41a",blue:"#2196F3",orange:"#faad14"},oe=["#52c41a","#2196F3","#faad14","#eb2f96","#722ed1","#13c2c2","#fa541c","#a0d911"],ie={green:"rgba(46,204,113,0.18)",blue:"rgba(33,150,243,0.18)",orange:"rgba(250,173,20,0.18)"},ae={green:"rgba(46,204,113,0.30)",blue:"rgba(33,150,243,0.30)",orange:"rgba(250,173,20,0.30)"};const se="dark",re=[{id:"sage",label:"Sage",hex:"#6FBF73"},{id:"ocean",label:"Ocean",hex:"#4FA5C7"},{id:"terracotta",label:"Terracotta",hex:"#D98A6A"},{id:"plum",label:"Plum",hex:"#A87CC0"},{id:"amber",label:"Amber",hex:"#D9A441"},{id:"graphite",label:"Graphite",hex:"#8E97A8"}];const ne=new Set(["cleaning","segment_cleaning","zoned_cleaning","spot_cleaning","segment_mopping","zoned_mopping","robot_status_mopping","clean_mop_cleaning","clean_mop_mopping","segment_clean_mop_cleaning","segment_clean_mop_mopping","zoned_clean_mop_cleaning","zoned_clean_mop_mopping"]);function mapPxDims(t){if(!t)return null;const e=t.scale??1;let o=(t.width??0)*e,s=(t.height??0)*e;const l=t.rotation??0;if(90===l||270===l){const t=o;o=s,s=t}return o>0&&s>0?{NW:o,NH:s}:null}const le=Math.PI/180;function seatFromFrame(t,e,o,s,l,h,d){let p=Math.round(t/le)%360;return p<0&&(p+=360),{rotation:p,scale:100*e,offset_x:100*o.x-50,offset_y:o.y*s*100-50,residual_pct:100*l,anchors:h,raw_rotation:Math.round(d/le*10)/10}}function computeSeatFit(t,e,o){if(!(t.length&&e>0))return null;if(t.length>=2){const o=t.length,s={x:0,y:0},l={x:0,y:0};for(const e of t)s.x+=e.q.x,s.y+=e.q.y,l.x+=e.a.x,l.y+=e.a.y;s.x/=o,s.y/=o,l.x/=o,l.y/=o;let h=0,d=0,p=0;for(const e of t){const t=e.q.x-s.x,o=e.q.y-s.y,u=e.a.x-l.x,m=e.a.y-l.y;h+=t*u+o*m,d+=t*m-o*u,p+=t*t+o*o}if(p>1e-8){const u=Math.atan2(d,h),m=Math.round(u/(Math.PI/2))*(Math.PI/2),_=Math.cos(m),f=Math.sin(m);let v=0;for(const e of t){const t=e.q.x-s.x,o=e.q.y-s.y,h=f*t+_*o;v+=(_*t-f*o)*(e.a.x-l.x)+h*(e.a.y-l.y)}const b=v/p;if(b>1e-4){const h={x:l.x-b*(_*s.x-f*s.y),y:l.y-b*(f*s.x+_*s.y)};let d=0;for(const e of t){const t=h.x+b*(_*e.q.x-f*e.q.y)-e.a.x,o=h.y+b*(f*e.q.x+_*e.q.y)-e.a.y;d+=t*t+o*o}return seatFromFrame(m,b,h,e,Math.sqrt(d/o),o,u)}}}const s=t.find(t=>t.sizeQ&&t.sizeA)??null;if(!s||!s.sizeQ||!s.sizeA||s.sizeQ.w<1e-6||s.sizeQ.h<1e-6)return null;let l=null;for(const t of[0,1,2,3]){const e=t*(Math.PI/2),o=t%2==0?s.sizeQ.w:s.sizeQ.h,h=t%2==0?s.sizeQ.h:s.sizeQ.w,d=s.sizeA.w/o,p=s.sizeA.h/h;if(!(d>0&&p>0))continue;const u=Math.sqrt(d*p),m=Math.abs(Math.log(d/p));(!l||m<l.mism-1e-9)&&(l={theta:e,s:u,mism:m})}if(!l)return null;const h=Math.cos(l.theta),d=Math.sin(l.theta),p={x:s.a.x-l.s*(h*s.q.x-d*s.q.y),y:s.a.y-l.s*(d*s.q.x+h*s.q.y)};return seatFromFrame(l.theta,l.s,p,e,0,1,l.theta)}function resolveImageBaseSrc(t,e){const o="merged"===t.map_mode?t.image_base??(t.vacuums??[]).find(t=>t.image_base?.src)?.image_base:e?.image_base;return o?.src}function resolveStaticRooms(t,e){return(t.rooms?.length?t.rooms:e?.rooms)??[]}function resolveSeat(t,e,o,s){const l=e?.map,h={rotation:l?.rotation??0,scale:l?.scale??100,scaleY:l?.scale_y,offset_x:l?.offset_x??0,offset_y:l?.offset_y??0,auto:!1};if(!e||"manual"===l?.seat)return h;if(!resolveImageBaseSrc(t,e))return h;if(!o)return h;const d=computeSeatFit(function assembleAnchors(t,e,o){if(!e)return[];const s=mapPxDims(e.image_dims),l=Array.isArray(e.rooms)?e.rooms:[];if(!s||!l.length)return[];const{NW:h,NH:d}=s,p=[];for(const e of t){if(null==e.map_x||null==e.map_y)continue;const t=l.find(t=>t.name===e.key)??l.find(t=>t.name===e.name),s=t?.bbox_px;if(!s||[s.x0,s.y0,s.x1,s.y1].some(t=>null==t))continue;const u={q:{x:((s.x0+s.x1)/2-h/2)/h,y:((s.y0+s.y1)/2-d/2)/h},a:{x:e.map_x/100,y:e.map_y/100/o}};null!=e.map_w&&null!=e.map_h&&e.map_w>0&&e.map_h>0&&(u.sizeQ={w:(s.x1-s.x0)/h,h:(s.y1-s.y0)/h},u.sizeA={w:e.map_w/100,h:e.map_h/100/o}),p.push(u)}return p}(resolveStaticRooms(t,e),o,s),s);return d?{rotation:d.rotation,scale:d.scale,offset_x:d.offset_x,offset_y:d.offset_y,auto:!0,residual:d.residual_pct,anchorCount:d.anchors}:h}function placeRoomInCrop(t,e){const o=e.x1-e.x0,s=e.y1-e.y0;if(!(o>0&&s>0))return null;const l=(t.x0+t.x1)/2-e.x0,h=(t.y0+t.y1)/2-e.y0,d=t.x1-t.x0,p=t.y1-t.y0,clamp=(t,e,o)=>Math.min(o,Math.max(e,t));return{map_x:clamp(Math.round(l/o*1e3)/10,0,100),map_y:clamp(Math.round(h/s*1e3)/10,0,100),map_w:clamp(Math.round(d/o*1e3)/10,2,100),map_h:clamp(Math.round(p/s*1e3)/10,2,100)}}function buildCalibrationAnchors(t,e,o,s){const{NW:l,NH:h}=o;if(!(l>0&&h>0&&s>0))return[];const d=Math.min(t.length,e.length),p=[];for(let o=0;o<d;o++){const d=t[o],u=e[o];p.push({q:{x:(d.x-l/2)/l,y:(d.y-h/2)/l},a:{x:u.x/100,y:u.y/100/s}})}return p}function pctToCropPoint(t,e){const o=e.x1-e.x0,s=e.y1-e.y0;return o>0&&s>0?{x:e.x0+t.x/100*o,y:e.y0+t.y/100*s}:null}function outlineInCrop(t,e){if(!t?.length)return null;const o=e.x1-e.x0,s=e.y1-e.y0;return o>0&&s>0?t.map(t=>{const l=Array.isArray(t)?t[0]:t.x,h=Array.isArray(t)?t[1]:t.y;return{x:(l-e.x0)/o*100,y:(h-e.y0)/s*100}}):null}function recropFromGesture(t,e){const o=t.x1-t.x0,s=t.y1-t.y0,l=e.scale/100;if(!(o>0&&s>0&&l>1e-6))return null;const h=o/l,d=s/l,p=t.x0+o/100*(50*(1-1/l)-e.offset_x/l),u=t.y0+s/100*(50*(1-1/l)-e.offset_y/l);return{x0:p,y0:u,x1:p+h,y1:u+d}}function seatProjectPct(t,e,o){const s=e.scale/100,l=(e.scaleY??e.scale)/100,h=e.rotation*le,d=Math.cos(h),p=Math.sin(h),u=(50+e.offset_x)/100,m=(50+e.offset_y)/100/o,_=s*t.x,f=l*t.y;return{x:100*(u+(d*_-p*f)),y:(m+(p*_+d*f))*o*100}}function seatScaleYRatio(t,e){return null!=e&&e!==t&&t?e/t:1}function seatRotateScaleCss(t,e,o){const s="rotate("+t+"deg)",l=seatScaleYRatio(e,o);return 1===l?s:s+" scale(1,"+l+")"}function roomBboxToRect(t,e,o,s){const l=mapPxDims(e?.image_dims),h=t?.bbox_px;if(!l||!h||[h.x0,h.y0,h.x1,h.y1].some(t=>null==t))return null;const{NW:d,NH:p}=l,u={x:((h.x0+h.x1)/2-d/2)/d,y:((h.y0+h.y1)/2-p/2)/d},m=o.scale/100,_=(o.scaleY??o.scale)/100;let f=(h.x1-h.x0)/d*m,v=(h.y1-h.y0)/d*_;const b=seatProjectPct(u,o,s);if(function isRot90(t){return Math.round(t/90)%2!=0}(o.rotation)){const t=f;f=v,v=t}const clamp=(t,e,o)=>Math.min(o,Math.max(e,t));return{map_x:clamp(Math.round(10*b.x)/10,0,100),map_y:clamp(Math.round(10*b.y)/10,0,100),map_w:clamp(Math.round(1e3*f)/10,2,100),map_h:clamp(Math.round(v*s*1e3)/10,2,100)}}function homeAnchorFit(t,e,o){if(!t||t.length<2||!e)return null;const s=buildCalibrationAnchors(t.map(t=>t.home_px),t.map(t=>t.floor_pct),e,o);return computeSeatFit(s,o)}function projectHomePxThroughFit(t,e,o,s){return seatProjectPct({x:(t.x-e.NW/2)/e.NW,y:(t.y-e.NH/2)/e.NW},o,s)}function outlineThroughFit(t,e,o,s){return t?.length?t.map(t=>projectHomePxThroughFit({x:Array.isArray(t)?t[0]:t.x,y:Array.isArray(t)?t[1]:t.y},e,o,s)):null}const ce=Math.PI/180;function nudgeTierMultiplier(t){return"fine"===t?.1:"jump"===t?10:1}function seatCentreFrac(t,e){return{x:(50+t.offset_x)/100,y:(50+t.offset_y)/100/e}}function frameToOffset(t,e){return{offset_x:100*t.x-50,offset_y:t.y*e*100-50}}function pctToFrac(t,e){return{x:t.x/100,y:t.y/100/e}}function rotatePoint(t,e){const o=e*ce,s=Math.cos(o),l=Math.sin(o);return{x:s*t.x-l*t.y,y:l*t.x+s*t.y}}function normDeg(t){let e=t%360;return e<0&&(e+=360),e}function translateSeat(t,e,o){return{...t,offset_x:t.offset_x+e,offset_y:t.offset_y+o}}function scaleSeatAbout(t,e,o,s){const l=pctToFrac(o,s),h=seatCentreFrac(t,s),d=frameToOffset({x:l.x+e*(h.x-l.x),y:l.y+e*(h.y-l.y)},s),p={...t,scale:t.scale*e,offset_x:d.offset_x,offset_y:d.offset_y};return null!=t.scaleY&&(p.scaleY=t.scaleY*e),p}function rotateSeatAbout(t,e,o,s){const l=pctToFrac(o,s),h=seatCentreFrac(t,s),d=rotatePoint({x:h.x-l.x,y:h.y-l.y},e),p=frameToOffset({x:l.x+d.x,y:l.y+d.y},s);return{...t,rotation:normDeg(t.rotation+e),offset_x:p.offset_x,offset_y:p.offset_y}}function localAxisScaleRatio(t,e,o,s,l){const h=seatCentreFrac(t,l),d=pctToFrac(o,l),p=pctToFrac(s,l),u=rotatePoint({x:d.x-h.x,y:d.y-h.y},-t.rotation),m=rotatePoint({x:p.x-h.x,y:p.y-h.y},-t.rotation),_="x"===e?u.x:u.y,f="x"===e?m.x:m.y;return Math.abs(_)>1e-6?f/_:1}function pinchSeat(t,e,o,s,l,h){const d=function similarityFromTwoPoints(t,e,o,s){const l=e.x-t.x,h=e.y-t.y,d=l*l+h*h;if(d<1e-12)return null;const p=s.x-o.x,u=s.y-o.y,m=(p*l+u*h)/d,_=(u*l-p*h)/d,f=Math.hypot(m,_);if(f<1e-6)return null;const v=Math.atan2(_,m)/ce,b=m*t.x-_*t.y,w=_*t.x+m*t.y;return{rotationDeg:v,scale:f,translate:{x:o.x-b,y:o.y-w}}}(pctToFrac(e,h),pctToFrac(o,h),pctToFrac(s,h),pctToFrac(l,h));if(!d)return t;const p=seatCentreFrac(t,h),u=d.scale*Math.cos(d.rotationDeg*ce),m=d.scale*Math.sin(d.rotationDeg*ce),_=frameToOffset({x:u*p.x-m*p.y+d.translate.x,y:m*p.x+u*p.y+d.translate.y},h),f={...t,rotation:normDeg(t.rotation+d.rotationDeg),scale:t.scale*d.scale,offset_x:_.offset_x,offset_y:_.offset_y};return null!=t.scaleY&&(f.scaleY=t.scaleY*d.scale),f}function nudgeOffset(t,e,o,s,l){const h=function fracToPct(t,e){return{x:100*t.x,y:t.y*e*100}}(rotatePoint(pctToFrac({x:e,y:o},l),-s),l);return translateSeat(t,h.x,h.y)}function nudgeRotation(t,e){return{...t,rotation:normDeg(t.rotation+e)}}function nudgeScale(t,e){const o=1+e/100,s={...t,scale:t.scale*o};return null!=t.scaleY&&(s.scaleY=t.scaleY*o),s}function effectiveAppearance(t){return{hide_map:t.hide_map??!1,overlay_opacity:t.overlay_opacity??55,overlay_blend:t.overlay_blend??"normal",path_color:t.path_color??null,path_width:t.path_width??100,mop_path_color:t.mop_path_color??null,mop_band_opacity:t.mop_band_opacity??28,mop_band_width:t.mop_band_width??100,robot_image_on_map:t.robot_image_on_map??!1,robot_size:t.robot_size??100,robot_image_rotation:t.robot_image_rotation??0}}function mergeRoomOverrides(t,e){if(!e)return t;const o=t?[...t]:[],s=new Map(o.map((t,e)=>[t.key,e]));let l=!1;for(const[t,h]of Object.entries(e)){if(!h)continue;l=!0;const e={};void 0!==h.map_x&&(e.map_x=h.map_x),void 0!==h.map_y&&(e.map_y=h.map_y),void 0!==h.map_w&&(e.map_w=h.map_w),void 0!==h.map_h&&(e.map_h=h.map_h),"area_id"in h&&(e.area_id=h.area_id??void 0);const d=s.get(t);void 0!==d?o[d]={...o[d],...e}:(s.set(t,o.length),o.push({key:t,...e}))}return l?o:t}const round1=t=>Math.round(10*t)/10,clampPct=t=>Math.min(100,Math.max(0,t)),clampSize=t=>Math.min(100,Math.max(2,t)),he={nw:{sx:-1,sy:-1},ne:{sx:1,sy:-1},sw:{sx:-1,sy:1},se:{sx:1,sy:1}};const de="anyvac-visual-editor";class AnyVacVisualEditorHost extends HTMLElement{connectedCallback(){this.shadowRoot||this.attachShadow({mode:"open"})}}customElements.get(de)||customElements.define(de,AnyVacVisualEditorHost);const pe=["--primary-text-color","--secondary-text-color","--primary-background-color","--card-background-color","--primary-color","--accent-color","--divider-color","--paper-font-body1_-_font-family","--mdc-icon-font"];function unmountVisualEditor(t){t?.remove()}const ue=160;const me={columns:[100],rows:["auto","minmax(0, 1fr)","auto","auto"],place:{hero:{row:1,col:1},map:{row:2,col:1},dock:{row:3,col:1,overflow:"auto"},start:{row:4,col:1}}},ge={landscape:{columns:["minmax(0, 1fr)","max-content"],rows:["auto","minmax(260px, 1fr)","auto","auto"],place:{badges:{row:1,col:"1/3"},map:{row:2,col:"1/3"},tools:{row:3,col:"1/3",align:"start"},status:{row:4,col:1,overflow:"auto"},dock:{row:4,col:2,overflow:"auto"}}},portrait:{columns:[72,28],rows:["auto","minmax(0, 1fr)","auto"],place:{hero:{row:1,col:"1/3"},map:{row:2,col:1},dock:{row:2,col:2,overflow:"auto"},start:{row:3,col:"1/3"}}}};function track(t){return"number"==typeof t?t+"fr":t}function trackList(t){return t.map(track).join(" ")}function resolveHeightCss(t){const e=t.height??"viewport";return"viewport"===e?"calc(100svh - var(--header-height, 0px))":"container"===e?"100%":e}function fmtPts(t,e){return t.map(t=>t.x.toFixed(e)+","+t.y.toFixed(e)).join(" ")}function arcLength(t){let e=0;for(let o=1;o<t.length;o++)e+=Math.hypot(t[o].x-t[o-1].x,t[o].y-t[o-1].y);return e}function trailTail(t,e){if(t.length<2||!(e>0))return[];const o=[t[t.length-1]];let s=e;for(let e=t.length-1;e>0;e--){const l=t[e-1],h=t[e],d=Math.hypot(h.x-l.x,h.y-l.y);if(d>=s){const t=d>0?s/d:0;return o.push({x:h.x+(l.x-h.x)*t,y:h.y+(l.y-h.y)*t}),o.reverse()}s-=d,o.push(l)}return o.reverse()}function closestOnEdge(t,e,o){const s=e.x-t.x,l=e.y-t.y,h=s*s+l*l,d=h>0?Math.max(0,Math.min(1,((o.x-t.x)*s+(o.y-t.y)*l)/h)):0,p={x:t.x+s*d,y:t.y+l*d};return{pt:p,d:Math.hypot(o.x-p.x,o.y-p.y)}}function pointAtFraction(t,e){const o=arcLength(t);if(0===t.length)return{pt:{x:0,y:0},next:0};if(!(o>0)||e<=0)return{pt:t[0],next:1};let s=Math.min(1,e)*o;for(let e=1;e<t.length;e++){const o=Math.hypot(t[e].x-t[e-1].x,t[e].y-t[e-1].y);if(o>=s){const l=o>0?s/o:0;return{pt:{x:t[e-1].x+(t[e].x-t[e-1].x)*l,y:t[e-1].y+(t[e].y-t[e-1].y)*l},next:e}}s-=o}return{pt:t[t.length-1],next:t.length}}function glideKeyframes(t,e,o=120){let s=t;if(s.length>o){const e=(s.length-1)/(o-1);s=Array.from({length:o},(o,s)=>t[Math.round(s*e)])}const l=arcLength(s);let h=0;return s.map((t,o)=>(o>0&&(h+=Math.hypot(t.x-s[o-1].x,t.y-s[o-1].y)),{transform:"translate("+t.x.toFixed(e)+"px, "+t.y.toFixed(e)+"px)",offset:l>0?h/l:o/Math.max(1,s.length-1)}))}function planOrder(t){const e=t?.timeline??{},o=new Map;for(const t of["dry","wet"])for(const[s,l]of Object.entries(e[t]??{}))"number"==typeof l&&o.set(s,Math.min(o.get(s)??1/0,l));const s=[...o.keys()].sort((t,e)=>o.get(t)-o.get(e)),l=new Map;for(const t of["dry","wet"])for(const[o,s]of Object.entries(e[t]??{}))"number"==typeof s&&l.set(o,Math.max(l.get(o)??-1/0,s));const h=new Map;for(const o of["dry","wet"])for(const[s,l]of Object.entries(t?.[o]??{})){if(h.has(s)||!Array.isArray(l)||!l.length)continue;const t=e[o]??{},d=[...l].sort((e,o)=>(t[e]??1/0)-(t[o]??1/0))[0];h.set(s,d)}return{order:s,first:h,finish:l}}function hexToRgb(t){const e=/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec((t??"").trim());return e?[parseInt(e[1],16),parseInt(e[2],16),parseInt(e[3],16)]:null}async function tintMapImage(t,e){const o=hexToRgb(e);if(!o)return null;try{const e=new Image;e.crossOrigin="anonymous",e.src=t,await e.decode();const s=e.naturalWidth,l=e.naturalHeight;if(!s||!l)return null;const h=document.createElement("canvas");h.width=s,h.height=l;const d=h.getContext("2d",{willReadFrequently:!0});if(!d)return null;d.drawImage(e,0,0);const p=d.getImageData(0,0,s,l);!function tintPixels(t,e,o,s=24){for(let l=0;l<t.length;l+=4){if(Math.abs(t[l]-e[0])+Math.abs(t[l+1]-e[1])+Math.abs(t[l+2]-e[2])<s||t[l+3]<10){t[l+3]=0;continue}const h=.35+(.3*t[l]+.59*t[l+1]+.11*t[l+2])/255*.9;t[l]=Math.min(255,o[0]*h),t[l+1]=Math.min(255,o[1]*h),t[l+2]=Math.min(255,o[2]*h)}}(p.data,function cornerBackground(t,e,o){const at=(o,s)=>{const l=4*(s*e+o);return[t[l],t[l+1],t[l+2]]},s=[at(0,0),at(e-1,0),at(0,o-1),at(e-1,o-1)];let l=s[0],h=0;for(const t of s){const e=s.filter(e=>e[0]===t[0]&&e[1]===t[1]&&e[2]===t[2]).length;e>h&&(l=t,h=e)}return l}(p.data,s,l),o),d.putImageData(p,0,0);const u=await new Promise(t=>h.toBlob(t,"image/png"));return u?URL.createObjectURL(u):null}catch{return null}}var _e;const fe={main_brush_time_left:300,side_brush_time_left:200,filter_time_left:150,sensor_time_left:30};console.info(`%c ANYVAC-CARD %c v${Zt} `,"background:#2196F3;color:#fff;font-weight:700;padding:2px 4px;border-radius:3px 0 0 3px","background:#1a1a1a;color:#fff;font-weight:400;padding:2px 4px;border-radius:0 3px 3px 0");let ve=class AnyVacCard extends Gt{constructor(){super(...arguments),this.editMode=!1,this._shownSet=new Set([0]),this._holdId=null,this._mapMode="normal",this._inspectKey=null,this._robotSheet=null,this._robotSheetTab=null,this._veNotice=null,this._tileHoldFired=!1,this._modeSheetOpen=!1,this._careResetPending=new Map,this._modeEntity=null,this._dbg="",this._zoneDrag=null,this._zoneRectShown=null,this._zonePending=null,this._zoneMulti=!1,this._zoneEdit=null,this._pinPending=null,this._layers={dry:!0,wet:!1},this._layerMenu=null,this._layerHoldTimer=null,this._layerHeld=!1,this._localRoomSel=new Map,this._activePresets=new Map,this._planMode="both",this._activeGlobalPreset=null,this._cardW=0,this._mapAR=3.636,this._alignSession=null,this._alignView={zoom:1,panX:0,panY:0,rot:0},this._alignCancelConfirm=!1,this._alignCopiedFlash=!1,this._veTool="seat",this._roomsSession=null,this._roomsGesture=null,this._roomsDrawGesture=null,this._roomsDeleteConfirm=null,this._roomsCopiedFlash=!1,this._floorplanCopiedFlash=!1,this._floorplanMode="geo",this._floorCalib=null,this._floorCalibRefNat=null,this._floorCalibResult=null,this._floorCalibError="",this._homeCalib=null,this._homeCalibBusy=!1,this._homeCalibError="",this._homeCalibResult=null,this._homeCalibSnapshotUrl="",this._homeCalibCrop=null,this._homeCalibFrameId="",this._fiducialSnapshotBusy=!1,this._fiducialSnapshotError="",this._fiducialSnapshotPath="",this._fiducialKnown=null,this._fiducialDetectBusy=!1,this._fiducialDetectError="",this._fiducialDetectResult=null,this._floorplanSnapshotBusy=!1,this._floorplanSnapshotError="",this._homeFrameSnapshotBusy=!1,this._homeFrameSnapshotError="",this._guideExportBusy=!1,this._guideExportError="",this._guideExportResult=null,this._placeRoomsResult=null,this._veToolSwitchTarget=null,this._floorplanSession=null,this._alignHost=null,this._alignGesture=null,this._floorGesture=null,this._recropDraft={rotation:0,scale:100,offset_x:0,offset_y:0},this._recropHistory=[],this._recropFuture=[],this._recropGesture=null,this._recropNat=null,this._profile="landscape",this._mapRegW=0,this._mapRegH=0,this._mapAvailW=0,this._mapAvailH=0,this._lastStack=!1,this._lastPortraitFitW=0,this._fillJp=null,this._fillMap=null,this._doneSeen=null,this._sheenRooms=new Set,this._veTint=!0,this._tintCache=new Map,this._tintPending=new Set,this._startSeq=null,this._markerPrev=new Map,this._markerMoves=new Map,this._markerStops=new Set,this._markerAnims=new Map,this._gridGapPx=6,this._lastRotate=!0,this._flipLive=null,this._ro=null,this._onWinResize=null,this._measureRaf=0,this._measureTimer=null,this._settleTimer=null,this._panelViewMo=null,this._panelViewWarned=!1,this._panelViewNode=null,this._barMo=null,this._editBarRo=null,this._now=Date.now(),this._tickTimer=null,this._holdTimer=null,this._holdStartPos=null,this._initialized=!1,this._watched=null,this._intCache=new Map,this._mapCandCache=new Map,this._autoCache=new Map,this._careCache=new Map,this._memoMapAR=0,this._roomsMemo=new Map,this._seatMemo=new Map,this._homeFrameMemo=new Map,this._holdEnd=()=>{this._cancelHold()},this._holdMove=t=>{if(!this._holdStartPos||null===this._holdTimer)return;const e=t.clientX-this._holdStartPos.x,o=t.clientY-this._holdStartPos.y;e*e+o*o>144&&this._cancelHold()},this._planPreview=null,this._planFetchKey="",this._alignViewDrag=null,this._floorCalibDragStart=null,this._homeCalibDragStart=null,this._onFloorplanLoad=t=>{const e=t.target;if(e?.naturalWidth&&e.naturalHeight){const t=e.naturalWidth/e.naturalHeight;t>.1&&Math.abs(t-this._mapAR)>.01&&(this._mapAR=t)}}}static getConfigElement(){return document.createElement(Xt)}static getStubConfig(t){const e=t?Object.keys(t.states).filter(t=>t.startsWith("vacuum.")):[],o=t?.entities,s=o?e.filter(t=>"matter"!==o[t]?.platform):e,l=s.length>0?s:e;return 0===l.length?{type:`custom:${Kt}`,vacuums:[{entity:"vacuum.my_roborock",name:"Roborock",rooms:[],clean_action:{type:"native"}}]}:{type:`custom:${Kt}`,vacuums:l.map(e=>({entity:e,name:t.states[e]?.attributes.friendly_name??e.replace(/^vacuum\./,""),rooms:[],clean_action:{type:"native"}}))}}setConfig(t){if(!t.vacuums||!Array.isArray(t.vacuums)||0===t.vacuums.length)throw new Error("[anyvac-card] 'vacuums' must be a non-empty array");if(this._rawConfig=t,this._config=t,this._watched=null,this._intCache.clear(),this._mapCandCache.clear(),this._autoCache.clear(),this._careCache.clear(),this._roomsMemo.clear(),this._seatMemo.clear(),this._initialized){const e=new Set;for(const o of this._shownSet)o<t.vacuums.length&&e.add(o);this._shownSet=e.size>0?e:new Set(t.vacuums.map((t,e)=>e))}else this._initialized=!0,this._shownSet=this._loadShown(),this._localRoomSel=this._loadRoomSel(),this._flipLive=this._loadFlipLive()}getCardSize(){return 6}connectedCallback(){super.connectedCallback(),this.style.setProperty("--hold-ms",Jt+"ms"),this._ro||"undefined"==typeof ResizeObserver||(this._ro=new ResizeObserver(()=>this._scheduleMeasure()),this._ro.observe(this)),this._onWinResize||(this._onWinResize=()=>this._scheduleMeasure(),window.addEventListener("resize",this._onWinResize,{passive:!0}),window.addEventListener("orientationchange",this._onWinResize,{passive:!0})),this._setupPanelViewObserver(),this._scheduleMeasure(),this._tickTimer||(this._tickTimer=window.setInterval(()=>{this._config?.debug_room_progress&&(this._config.vacuums??[]).some(t=>this._isCleaning(t)||this._isPaused(t))&&(this._now=Date.now())},1e3))}_scheduleMeasure(){if(this._measureRaf||null!==this._measureTimer)return;const run=()=>{this._measureRaf=0,this._measureTimer=null,this._doMeasure()};"undefined"!=typeof document&&document.hidden?this._measureTimer=window.setTimeout(run,0):this._measureRaf=requestAnimationFrame(run)}_doMeasure(){const t=this.getBoundingClientRect(),e=Math.round(t.width);e&&Math.abs(e-this._cardW)>=2&&(this._cardW=e);const o=this._config?.layout;if(o){const s=function pickProfile(t,e,o){const s=t?.orientation;return"portrait"===s||"landscape"===s?s:e&&o&&e/o<(t?.threshold??1)?"portrait":"landscape"}(o,this._cardW||e||window.innerWidth,this._availableHeight(o,t));s!==this._profile&&(this._profile=s),this._refineGridHeight()}}_availableHeight(t,e){if("container"===(t.height??"viewport"))return e.height>1?Math.round(e.height):window.innerHeight;const o=e.top;return o>=0&&o<window.innerHeight?Math.max(1,Math.round(window.innerHeight-o-this._editBarHeight())):window.innerHeight}_editBarHeight(){try{const t=this._findCardOptionsAncestor();if(!t?.shadowRoot)return 0;const e=t.shadowRoot.querySelector(".card-actions");if(!e)return 0;const o=e.getBoundingClientRect();if(!(o.height>0))return 0;const s=getComputedStyle(e);return Math.ceil(o.height+(parseFloat(s.marginTop)||0)+(parseFloat(s.marginBottom)||0))}catch{return 0}}_findPanelViewAncestor(){let t=this.parentElement??this.getRootNode().host??null,e=0;for(;t&&e++<20;){if(t instanceof Element&&("HUI-PANEL-VIEW"===t.tagName||"HUI-VIEW"===t.tagName))return t;const e=t;t=e.parentElement??e.getRootNode()?.host??null}return null}_findCardOptionsAncestor(){let t=this.parentElement??this.getRootNode().host??null,e=0;for(;t&&e++<12;){if(t instanceof Element&&"HUI-CARD-OPTIONS"===t.tagName)return t;const e=t;t=e.parentElement??e.getRootNode()?.host??null}return null}_setupPanelViewObserver(){if("undefined"==typeof MutationObserver)return;if(this._panelViewMo&&this._panelViewNode?.isConnected)return;this._panelViewMo&&(this._panelViewMo.disconnect(),this._panelViewMo=null,this._panelViewNode=null);const t=this._findPanelViewAncestor();if(!t){if(!this._panelViewWarned){this._panelViewWarned=!0;try{console.warn("[anyvac-card] hui-panel-view/hui-view ancestor not found (HA internal DOM may have changed) — edit-mode layout refresh via MutationObserver is disabled; resize-based refresh still works.")}catch{}}return}const e=new MutationObserver(()=>{this._scheduleMeasure(),this._watchEditBar();const t=this._findCardOptionsAncestor();if(t?.shadowRoot)try{e.observe(t.shadowRoot,{childList:!0,subtree:!0})}catch{}});try{e.observe(t,{childList:!0,subtree:!0})}catch{}if(t.shadowRoot)try{e.observe(t.shadowRoot,{childList:!0,subtree:!0})}catch{}const o=this._findCardOptionsAncestor();if(o?.shadowRoot)try{e.observe(o.shadowRoot,{childList:!0,subtree:!0})}catch{}this._panelViewMo=e,this._panelViewNode=t,this._watchEditBar()}_watchEditBar(){this._barMo&&(this._barMo.disconnect(),this._barMo=null);const t=this._findCardOptionsAncestor();if(!t?.shadowRoot)return;const e=t.shadowRoot.querySelector(".card-actions");if(e)return void this._observeEditBar(e);const o=t.shadowRoot,s=new MutationObserver(()=>{const t=o.querySelector(".card-actions");t&&(s.disconnect(),this._barMo=null,this._observeEditBar(t))});try{s.observe(o,{childList:!0,subtree:!0})}catch{return}this._barMo=s}_observeEditBar(t){if(this._scheduleMeasure(),"undefined"==typeof ResizeObserver)return;this._editBarRo&&(this._editBarRo.disconnect(),this._editBarRo=null);const e=new ResizeObserver(()=>this._scheduleMeasure());try{e.observe(t)}catch{return}this._editBarRo=e}_refineGridHeight(){const t=this._config?.layout;if(!t)return;const e=this.renderRoot?.querySelector(".avc-grid");if(!e)return;if("viewport"===(t.height??"viewport")){const t=e.getBoundingClientRect().top;if(t>=0&&t<window.innerHeight){const o=Math.round(window.innerHeight-t-this._editBarHeight());o>120&&(e.style.height=o+"px")}}const o=this.renderRoot?.querySelector(".avc-region--map");if(o){const t=Math.round(o.clientWidth),e=Math.round(o.clientHeight);t&&Math.abs(t-this._mapRegW)>=2&&(this._mapRegW=t),e&&Math.abs(e-this._mapRegH)>=2&&(this._mapRegH=e)}if("portrait"===this._profile){const t=this.renderRoot?.querySelector(".avc-region--start"),o=this.renderRoot?.querySelector(".avc-region--hero"),s=parseFloat(getComputedStyle(e).rowGap||getComputedStyle(e).gap||"0")||0,l=t?Math.round(t.getBoundingClientRect().height):0,h=o?Math.round(o.getBoundingClientRect().height):0;this._gridGapPx=s;const d=Math.round(e.clientWidth),p=Math.round(e.clientHeight-l-(l?s:0)-h-(h?s:0));d&&Math.abs(d-this._mapAvailW)>=2&&(this._mapAvailW=d),p>0&&Math.abs(p-this._mapAvailH)>=2&&(this._mapAvailH=p)}}disconnectedCallback(){super.disconnectedCallback(),this._cancelHold(),this._measureRaf&&(cancelAnimationFrame(this._measureRaf),this._measureRaf=0),null!==this._measureTimer&&(clearTimeout(this._measureTimer),this._measureTimer=null),null!==this._settleTimer&&(clearTimeout(this._settleTimer),this._settleTimer=null),this._tickTimer&&(clearInterval(this._tickTimer),this._tickTimer=null),this._onWinResize&&(window.removeEventListener("resize",this._onWinResize),window.removeEventListener("orientationchange",this._onWinResize),this._onWinResize=null),this._ro&&(this._ro.disconnect(),this._ro=null),this._panelViewMo&&(this._panelViewMo.disconnect(),this._panelViewMo=null),this._panelViewNode=null,this._barMo&&(this._barMo.disconnect(),this._barMo=null),this._editBarRo&&(this._editBarRo.disconnect(),this._editBarRo=null),unmountVisualEditor(this._alignHost),this._alignHost=null}firstUpdated(){const t=Math.round(this.getBoundingClientRect().width);t&&(this._cardW=t),this._scheduleMeasure()}updated(){if(this._runMarkerGlides(),this._alignSession&&!this._alignHost){const t=this.constructor.elementStyles,e=[];for(const o of t){const t=o instanceof CSSStyleSheet?o:o.styleSheet;t&&e.push(t)}this._alignHost=function mountVisualEditor(t,e){const o=document.createElement(de);o.style.cssText="position:fixed;inset:0;z-index:2147483647;",document.body.appendChild(o);const s=o.shadowRoot;if(s){t.length&&"adoptedStyleSheets"in s&&(s.adoptedStyleSheets=t);const l=getComputedStyle(e);for(const t of pe){const e=l.getPropertyValue(t);e&&o.style.setProperty(t,e)}}return o}(e,this)}else!this._alignSession&&this._alignHost&&(unmountVisualEditor(this._alignHost),this._alignHost=null);if(this._alignHost?.shadowRoot&&D(this._renderVisualEditor(),this._alignHost.shadowRoot),this._careResetPending.size){let t=null;for(const[e,o]of this._careResetPending){const s=this.hass?.states[e],l=s?Date.parse(s.last_changed):NaN;Number.isFinite(l)&&l>o&&(t||(t=new Map(this._careResetPending)),t.delete(e))}t&&(this._careResetPending=t)}this._refineGridHeight(),this._refineGridColumns(),this._setupPanelViewObserver(),null!==this._settleTimer&&clearTimeout(this._settleTimer),this._settleTimer=window.setTimeout(()=>{this._settleTimer=null,this._scheduleMeasure()},250)}_refineGridColumns(){if("portrait"!==this._profile||!this._lastPortraitFitW)return;if(this._config.layout?.portrait?.columns?.length)return;if(this._stackTopology)return;const t=this.renderRoot?.querySelector(".avc-grid");if(!t)return;const e=t.clientWidth-(parseFloat(getComputedStyle(t).columnGap||"0")||0);let o=Math.round(this._lastPortraitFitW);e>0&&(o=Math.min(o,e)),this._isRail()&&e>2*ue&&(o=Math.min(o,e-ue));const s=Math.round(o)+"px 1fr";t.style.gridTemplateColumns!==s&&(t.style.gridTemplateColumns=s)}shouldUpdate(t){if(this._syncEffectiveConfig(),!t.has("hass")||t.size>1)return!0;const e=t.get("hass");if(!e||!this._config)return!0;for(const t of this._watchedEntities())if(e.states[t]!==this.hass.states[t])return!0;return!1}_syncEffectiveConfig(){if(!this._rawConfig||!this.hass)return;const t=this._floorplanSeatsRaw(),e=function applyFloorplanSeats(t,e){if(!e||!t?.vacuums?.length)return t;let o=!1;const s=t.vacuums.map(s=>{const l=resolveImageBaseSrc(t,s),h=l?e[l]?.vacuums?.[s.entity]:null;if(!h)return s;let d=s;if(h.map&&(o=!0,d={...d,map:{...h.map,seat:"manual"}}),h.appearance&&(o=!0,d={...d,...h.appearance}),h.rooms){const t=mergeRoomOverrides(d.rooms,h.rooms);t!==d.rooms&&(o=!0,d={...d,rooms:t})}return d});let l=t.image_base,h=t.rooms,d=t.room_border_normal,p=t.room_border_selected;if("merged"===t.map_mode&&t.image_base?.src){const s=e[t.image_base.src],u=s?.image_base;if(u&&(l={...t.image_base,...u},o=!0),s?.rooms){const t=mergeRoomOverrides(h,s.rooms);t!==h&&(o=!0,h=t)}s?.room_style&&(void 0!==s.room_style.border_normal&&(d=s.room_style.border_normal,o=!0),void 0!==s.room_style.border_selected&&(p=s.room_style.border_selected,o=!0))}return o?{...t,vacuums:s,image_base:l,rooms:h,room_border_normal:d,room_border_selected:p}:t}(this._rawConfig,t);e!==this._config&&JSON.stringify(e)!==JSON.stringify(this._config)&&(this._config=e,this._roomsMemo.clear(),this._seatMemo.clear())}_floorplanSeatsRaw(){for(const t of this._rawConfig?.vacuums??[]){const e=this._intAttrs(t),o=e?.floorplan_seats;if(o)return o}}_watchedEntities(){if(this._registry(),this._watched)return this._watched;const t=new Set;for(const e of this._config?.vacuums??[]){for(const o of[e.entity,e.status_entity,e.battery_entity,e.last_clean_entity,e.progress_entity,e.current_room_entity,e.error_entity,this._mapEntityFor(e),this._intEntity(e),...Object.values(this._autoEntities(e))])o&&t.add(o);for(const o of this._roomsFor(e))o.last_clean_entity&&t.add(o.last_clean_entity),o.clean_time_entity&&t.add(o.clean_time_entity);for(const o of this._careItems(e))o.entity&&t.add(o.entity),o.reset&&t.add(o.reset),o.binary&&t.add(o.binary)}for(const e of this._config?.global_actions??[])for(const o of e.watch_entities??[])o&&t.add(o);return this.hass?.entities&&(this._watched=t),t}_resolveColor(t,e){const o=t??e;return ee[o]??o}_resolveBg(t,e,o){return(o?ae:ie)[t??e]??function hexToRgba(t,e){const o=/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(t);if(!o)return`rgba(255,255,255,${e})`;let s=o[1];return 3===s.length&&(s=s.split("").map(t=>t+t).join("")),`rgba(${parseInt(s.slice(0,2),16)},${parseInt(s.slice(2,4),16)},${parseInt(s.slice(4,6),16)},${e})`}(this._resolveColor(t,e),o?.3:.18)}_vacIndex(t){const e=this._config?.vacuums?.findIndex(e=>e.entity===t.entity)??-1;return e<0?0:e}_defaultColor(t){return oe[this._vacIndex(t)%oe.length]}_color(t){return this._resolveColor(t.color,this._defaultColor(t))}_colorBg(t){return this._resolveBg(t.color,this._defaultColor(t),!1)}_colorBgActive(t){return this._resolveBg(t.color,this._defaultColor(t),!0)}_registry(){const t=this.hass?.entities;return t!==this._regRef&&(this._regRef=t,this._intCache.clear(),this._mapCandCache.clear(),this._autoCache.clear(),this._careCache.clear(),this._watched=null),t}_intEntity(t){if(t.integration_entity)return t.integration_entity;const e=this._registry();if(!e||!t.entity)return;if(this._intCache.has(t.entity))return this._intCache.get(t.entity);const o=e[t.entity]?.device_id,s=o?Object.keys(e).find(t=>e[t]?.device_id===o&&"anyvac"===e[t]?.platform&&t.startsWith("sensor.")):void 0;return this._intCache.set(t.entity,s),s}_mapEntityFor(t){if(t.map?.entity)return t.map.entity;const e=this._registry();if(!e||!t.entity)return;let o=this._mapCandCache.get(t.entity);if(!o){const s=e[t.entity]?.device_id;if(!s)return;o=Object.keys(e).filter(t=>e[t]?.device_id===s&&t.startsWith("image.")),this._mapCandCache.set(t.entity,o)}if(1===o.length)return o[0];const s=o.filter(t=>{const e=this.hass.states[t];return!!e&&"unavailable"!==e.state&&"unknown"!==e.state&&!!e.attributes.entity_picture});return 1===s.length?s[0]:void 0}_intAttrs(t){const e=this._intEntity(t),o=e?this.hass.states[e]?.attributes:void 0;if(o)return(o.schema_version??0)>=2?o:void 0}_schemaWarning(){for(const t of this._config?.vacuums??[]){const e=this._intEntity(t),o=e?this.hass.states[e]?.attributes:void 0;if(o&&(o.schema_version??0)<2)return`AnyVac integration is too old for this card (schema ${o.schema_version??1} < 2). Update the anyvac integration to ≥ 0.18.0.`}return null}_autoEntities(t){const e=this._registry();if(!e||!t.entity)return{};const o=this._autoCache.get(t.entity);if(o)return o;const s=e[t.entity]?.device_id;if(!s)return{};const l=Object.keys(e).filter(t=>e[t]?.device_id===s),byTk=t=>l.find(o=>e[o]?.translation_key===t),h={status:byTk("status"),battery:(t=>l.find(e=>this.hass.states[e]?.attributes?.device_class===t))("battery"),last_clean:byTk("last_clean_end"),progress:byTk("clean_percent"),current_room:byTk("current_room"),error:byTk("vacuum_error")};return this._autoCache.set(t.entity,h),h}_ent(t,e){return t[e+"_entity"]??this._autoEntities(t)[e]}_statusInfo(t){const e=this.hass.states[this._ent(t,"status")??t.entity]?.state??"unknown",o=Qt[e]??[e,"rgba(var(--avc-ink-rgb),0.5)","mdi:robot-vacuum"],s=this._themed()?te[o[1]]:void 0;return s?[o[0],s,o[2]]:o}_careItems(t){const e=this._registry(),o=this.hass?.devices;if(!e||!o||!t.entity)return[];const s=this._dockCaps(t),l=t.entity+"|"+this._dockCapsKey(t);if(this._careCache.has(l))return this._careCache.get(l);const h=e[t.entity]?.device_id,d=h?o[h]:void 0,p=d?.identifiers?.find(([t])=>"roborock"===t)?.[1],u=p?Object.values(o).find(t=>t.identifiers?.some(([t,e])=>"roborock"===t&&e===`${p}_dock`)):void 0,m=u?.id,byTk=(t,o,s)=>t?Object.keys(e).find(l=>e[l]?.device_id===t&&e[l]?.translation_key===o&&l.startsWith(s+".")):void 0,_=[],consumable=(t,e,o,s)=>{const l=byTk(s,e,"sensor"),h=byTk(s,o,"button");(l||h)&&_.push({key:e,label:t,entity:l,reset:h,totalHours:fe[e]})};if(consumable("Main brush","main_brush_time_left","reset_main_brush_consumable",h),consumable("Side brush","side_brush_time_left","reset_side_brush_consumable",h),consumable("Filter","filter_time_left","reset_air_filter_consumable",h),consumable("Sensors","sensor_time_left","reset_sensor_consumable",h),s.wash){consumable("Dock brush","cleaning_brush_time_left","reset_dock_cleaning_brush_consumable",m),consumable("Strainer","strainer_time_left","reset_dock_strainer_consumable",m);const binary=(t,e)=>{const o=byTk(m,e,"binary_sensor");o&&_.push({key:e,label:t,binary:o})};binary("Dirty water tank","dirty_box_full"),binary("Clean water tank","clean_box_empty"),binary("Cleaning fluid","clean_fluid_empty")}return this._careCache.set(l,_),_}_careValue(t){if(!t.entity)return"—";const e=this.hass.states[t.entity];if(!e||"unavailable"===e.state||"unknown"===e.state)return"—";const o=this._careHours(t);if(null===o)return e.state;const s=this._carePct(t);return null!==s?`${s} %`:`${Math.round(o)} h left`}_careHours(t){if(!t.entity)return null;const e=this.hass.states[t.entity];if(!e||"unavailable"===e.state||"unknown"===e.state)return null;const o=Number(e.state);if(Number.isNaN(o))return null;const s=e.attributes?.unit_of_measurement;return"s"===s?o/3600:"min"===s?o/60:o}_carePct(t){const e=this._careHours(t);return null!==e&&t.totalHours?Math.max(0,Math.min(100,Math.round(e/t.totalHours*100))):null}_careWarnPct(){const t=Number(this._config.care_warn_pct??10);return Number.isFinite(t)?Math.max(0,Math.min(100,t)):10}_vacAttention(t){const e=this._intAttrs(t)?.dock_status,o=e?.dock_error_status,s=this._careItems(t),l=s.some(t=>t.binary&&"on"===this.hass.states[t.binary]?.state),h=this._careWarnPct(),d=s.some(t=>{if(t.binary)return!1;const e=this._carePct(t);return null!==e&&e<=h});return{dock:null!=o&&0!==o&&"0"!==o||l,care:d}}_attnDot(t){const e=this._vacAttention(t);if(!e.dock&&!e.care)return Ht;const o=e.dock&&e.care?"dock and care":e.dock?"dock":"care";return zt`<span class="vac-attn-dot" role="img" aria-label="Needs attention: ${o}" title="Needs attention: ${o}"></span>`}_openRobotSheet(t,e="clean"){this._robotSheet=t,this._robotSheetTab={idx:t,tab:e}}_isCleaning(t){return ne.has(this.hass.states[t.entity]?.state??"")}_hasError(t){const e=this._ent(t,"error"),o=e?this.hass.states[e]?.state:null;return!!o&&"none"!==o&&"unknown"!==o&&"unavailable"!==o}_isPaused(t){return"paused"===this.hass.states[t.entity]?.state}_battery(t){const e=this._ent(t,"battery");if(!e)return null;const o=parseInt(this.hass.states[e]?.state??"");return isNaN(o)?null:o}_lastCleanStr(t){const e=this._ent(t,"last_clean"),o=e?this.hass.states[e]?.state:void 0;if(!o||"unavailable"===o||"unknown"===o)return"—";const s=new Date(o),l=Math.floor((Date.now()-s.getTime())/864e5),h=s.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});return 0===l?"Today · "+h:1===l?"Yesterday · "+h:s.toLocaleDateString([],{day:"2-digit",month:"2-digit"})+" · "+h}_progress(t){const e=this._ent(t,"progress");if(!e)return null;const o=parseInt(this.hass.states[e]?.state??"");return isNaN(o)||0===o?null:o}_selSensor(){for(const t of this._config.vacuums){const e=this._intEntity(t);if(e&&Array.isArray(this.hass.states[e]?.attributes?.selected_rooms))return e}}_backendSel(){const t=this._selSensor();return t?new Set(this.hass.states[t]?.attributes?.selected_rooms??[]):null}_setBackendSel(t,e){this._call("anyvac","select_rooms",{rooms:t,mode:e})}_isRoomSelected(t,e){const o=this._backendSel();return o?o.has(t.key):this._localRoomSel.get(e.entity+":"+t.key)??!1}_layersEff(){const t=this._selSensor(),e=t?this.hass.states[t]?.attributes?.view_layers:void 0;return e&&"boolean"==typeof e.dry&&"boolean"==typeof e.wet?{dry:e.dry,wet:e.wet}:this._layers}_staticRoomsFor(t){return resolveStaticRooms(this._config,t)}_memoSync(){this.hass===this._memoHass&&this._mapAR===this._memoMapAR||(this._memoHass=this.hass,this._memoMapAR=this._mapAR,this._roomsMemo.clear(),this._seatMemo.clear(),this._homeFrameMemo.clear())}_roomsFor(t){this._memoSync();const e=this._roomsMemo.get(t.entity);if(e)return e;const o=this._computeRoomsFor(t);return this._roomsMemo.set(t.entity,o),o}_computeRoomsFor(t){const e=this._intAttrs(t),o=Array.isArray(e?.rooms)?e.rooms:[];if(!e||!o.length)return this._staticRoomsFor(t);const s=this._homeFrameCropFor(t),l=this._wrapAspect(this._baseHeightFor(t)),h=s?null:this._homeAnchorFitFor(t,l),d=s||h?null:this._effectiveSeat(t),p=this._staticRoomsFor(t),u=new Map(p.filter(t=>t.key).map(t=>[t.key,t])),m=new Set,_=[];for(const t of o){const o=t?.name;if(!o)continue;m.add(o);const p=u.get(o);if(p&&null!=p.map_x&&null!=p.map_y){_.push(p);continue}const f=s?t?.bbox_home_px?placeRoomInCrop(t.bbox_home_px,s):null:h?t?.bbox_home_px?roomBboxToRect({bbox_px:t.bbox_home_px},{image_dims:{width:h.dims.NW,height:h.dims.NH,scale:1,rotation:0}},h.fit,l):null:roomBboxToRect(t,e,d,l);if(!f){p&&_.push(p);continue}const v=s?outlineInCrop(t?.outline_home_px,s):h?outlineThroughFit(t?.outline_home_px,h.dims,h.fit,l):null;_.push({...p??{key:o,name:o,icon:"mdi:floor-plan"},...f,outline_pct:v??void 0})}for(const t of p)t.key&&!m.has(t.key)&&_.push(t);return _}_hasSelectedRooms(t){return this._roomsFor(t).some(e=>this._isRoomSelected(e,t))}_liveCleanType(t){if((t.presets?.length??0)>=2){const e=this._activePreset(t);return null!=e.mop_intensity&&""!==e.mop_intensity&&"off"!==e.mop_intensity||null!=e.mop_mode&&""!==e.mop_mode?"wet":"dry"}const e=this._intAttrs(t)?.clean_type;if("wet"===e||"dry"===e)return e;const o=this._vacCleanType(t);return o.wet&&!o.dry?"wet":"dry"}_backendEstimate(t,e,o){const s=this._intAttrs(t)?.rooms_estimate;if(!s)return null;const l=s[e.name??""]??s[e.key],h=l?l[o]:void 0;return"number"==typeof h&&h>0?h:null}_roomCleanMins(t,e){const o=this._vacCleanType(e),s=!(!o.wet||o.dry)||!(o.dry&&!o.wet)&&"wet"===this._liveCleanType(e),l=this._backendEstimate(e,t,s?"wet":"dry");if(null!=l)return l;const h=s?t.clean_time_wet:t.clean_time_dry;if(null!=h&&h>0)return h;const d=s?t.clean_time_dry:t.clean_time_wet;if(null!=d&&d>0)return d;if(t.clean_time_entity){const e=parseFloat(this.hass.states[t.clean_time_entity]?.state??"");if(!isNaN(e)&&e>0)return e}return t.clean_time_mins??0}_totalCleanMins(t){return this._roomsFor(t).reduce((e,o)=>this._isRoomSelected(o,t)?e+this._roomCleanMins(o,t):e,0)}_intRoomRec(t,e){const o=this._intAttrs(t)?.rooms_last_cleaned;return o?o[e.key]??o[e.name??""]??null:null}_roomCoverageRec(t,e){const o=this._intAttrs(t)?.rooms_coverage;return o?o[e.key]??o[e.name??""]??null:null}_ageDaysFromIso(t){if(!t)return null;const e=new Date(t).getTime();return isNaN(e)?null:(Date.now()-e)/864e5}_roomAgeDays(t,e){if(e){const o=this._intRoomRec(e,t);if(o){const t=this._ageDaysFromIso(o.dry),e=this._ageDaysFromIso(o.wet),s=this._ageDaysFromIso(o.any),l=this._layersEff(),h=l.dry,d=l.wet;let p;if(p=h&&d?Math.max(t??9999,e??9999):h?t:d?e:s,null!==p)return p}}if(!t.last_clean_entity)return null;const o=this.hass.states[t.last_clean_entity]?.state;return o&&"unavailable"!==o&&"unknown"!==o?(Date.now()-new Date(o).getTime())/864e5:null}_colorForAgeDays(t){if(null===t)return"rgba(255,77,77,0.85)";const e=[...this._config.room_thresholds??[{days:2,color:"rgba(46,204,113,0.85)"},{days:5,color:"rgba(250,173,20,0.85)"},{days:10,color:"rgba(255,152,0,0.85)"}]].sort((t,e)=>t.days-e.days);for(const o of e)if(t<=o.days)return o.color;return"rgba(255,77,77,0.85)"}_vacCleanType(t){if("dry"===t.clean_type)return{dry:!0,wet:!1};if("wet"===t.clean_type)return{dry:!1,wet:!0};if("both"===t.clean_type)return{dry:!0,wet:!0};const e=this._intAttrs(t)?.mop_signal;if(e){return{dry:!0,wet:null!=e.water_box_mode||!!e.water_mode_name}}const o=t.clean_action,s=!(!o||!(o.mop_mode||o.mop_mode_entity||o.mop_intensity||o.mop_intensity_entity));return{dry:!s||null!=o?.suction_level&&"off"!==o.suction_level,wet:s}}_roomProgress(t,e){const o=this._intAttrs(t)?.rooms_progress;return o?o[e.key]??o[e.name??""]??null:null}_roomProgForType(t,e,o){let s=null,l=null,h=!1,d=null;for(const p of e){const e=this._roomProgress(p,t);if(!e)continue;const u="dry"===o?e.dry_pct:e.wet_pct;if(null==u)continue;const m=!!("dry"===o?e.dry_calibrating:e.wet_calibrating);(null===s||h&&!m||h===m&&u>s)&&(s=u,l=p,h=m,d=e)}if(null===s||!l)return null;const p=d?.passes??null,u=("dry"===o?d?.dry_pass:d?.wet_pass)??null,m=("dry"===o?d?.dry_floor:d?.wet_floor)??null,_=null!=p&&p>1&&null!=u;return{pct:s,kind:"S",title:`${o} · ${s}% done`+(_?` · pass ${u} of ${p}`:"")+(null!=m?` · ${m}% of the reachable floor covered`:""),color:this._color(l),calibrating:h,pass:_?u:null,passes:_?p:null}}_renderCovBadge(t,e,o){const s=t?.[e],l=t?.[`${e}_floor`],h=null!=l&&l<80;return zt`<small class="dock-cov" title=${`Last ${e} clean: ${(null==s?"":`${s}% of the ordered work done`)||"not measured yet"}`+(null!=l?` · ${l}% of the reachable floor covered`:"")}>${o(s)}</small>${h?zt`<ha-icon class="dock-cov-warn" icon="mdi:alert-outline"
      title=${`Only ${l}% of the room's reachable floor was covered — was a door closed or part of the room blocked?`}></ha-icon>`:Ht}`}_progColor(t){return t>=90?"rgb(var(--avc-ok-rgb))":t>=50?"rgb(var(--avc-warn-rgb))":"rgb(var(--avc-info-rgb))"}_renderRoomGauge(t,e){if(!this._config.debug_room_progress)return Ht;const o=this._roomProgForType(e,t,"dry"),s=this._roomProgForType(e,t,"wet");if(!o&&!s)return Ht;const g=(t,e,o,s)=>zt`
      <span class="room-gauge" title=${e}
        style=${Yt({background:`conic-gradient(${o} ${3.6*t}deg, rgba(255,255,255,0.12) 0)`})}>
        <span>${t}${s?"~":""}</span>
      </span>`;return zt`<div class="room-gauges">
      ${o?g(o.pct,"dry · "+o.title,o.color,o.calibrating):Ht}
      ${s?g(s.pct,"wet · "+s.title,"#40a9ff",s.calibrating):Ht}
    </div>`}_renderProgChip(t){if(!t)return Ht;const e=t.passes?`${t.pass}/${t.passes}`:t.kind;return zt`<span class="rl-prog" title=${t.title}
      style=${Yt({color:t.color??this._progColor(t.pct)})}>${t.pct}${t.calibrating?"~":""}%<small>${e}</small></span>`}_batIcon(t){return t>80?"mdi:battery":t>50?"mdi:battery-60":t>20?"mdi:battery-30":"mdi:battery-10"}_batColor(t){return t>50?"rgb(var(--avc-ok-rgb))":t>20?"rgb(var(--avc-warn-rgb))":"rgb(var(--avc-err-rgb))"}_mapUrl(t){const e=this.hass.states[t];if(!e)return"";const o=e.attributes.entity_picture;if(!o)return"";const s=new Date(e.last_updated).getTime(),l=o.includes("?")?"&":"?";return this.hass.hassUrl(o+l+"_t="+s)}_timeStr(t){const e=Math.round(t);if(e<=0)return"";if(e>=60){const t=Math.floor(e/60),o=e%60;return o>0?"~"+t+" h "+o+" min":"~"+t+" h"}return"~"+e+" min"}_isGlobalActive(t){return(t.watch_entities??[]).some(t=>ne.has(this.hass.states[t]?.state??""))}async _triggerGlobal(t){const e=t.action;try{if("script"===e.type)await this.hass.callService("script","turn_on",{entity_id:e.entity_id,variables:e.variables??{}});else{const[t,o]=e.service.split(".");await this.hass.callService(t,o,e.data??{})}}catch(t){console.error("[anyvac-card] global action failed:",t)}}_cancelHold(){null!==this._holdTimer&&(clearTimeout(this._holdTimer),this._holdTimer=null),this._holdId=null,this._holdStartPos=null}_holdStart(t,e){return o=>{o.preventDefault(),this._cancelHold(),this._holdId=t,this._holdStartPos={x:o.clientX,y:o.clientY},this._holdTimer=setTimeout(()=>{this._holdTimer=null,this._holdId=null,this._holdStartPos=null,e()},Jt)}}_toggleShown(t){if(this._config.layout&&"portrait"===this._profile)return this._shownSet=new Set([t]),void this._saveShown();this._toggleShownMulti(t)}_toggleShownMulti(t){const e=new Set(this._shownSet);e.has(t)?e.size>1&&e.delete(t):e.add(t),this._shownSet=e,this._saveShown()}async _call(t,e,o){try{await this.hass.callService(t,e,o)}catch(o){console.error("[anyvac-card] "+t+"."+e+" failed:",o)}}_fireMoreInfo(t){this.dispatchEvent(new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:t}}))}_storeKey(t){const e=(this._config?.vacuums??[]).map(t=>t.entity).join(",");return`anyvac-card:${t}:${e}`}_readStored(t,e){try{return localStorage.getItem(this._storeKey(t))??localStorage.getItem(e)}catch{return null}}_saveShown(){try{const t=[...this._shownSet].map(t=>this._config.vacuums[t]?.entity).filter(Boolean);localStorage.setItem(this._storeKey("shown"),JSON.stringify(t))}catch{}}_loadShown(){try{const t=this._readStored("shown","roborock-card:shown");if(t){const e=JSON.parse(t).map(t=>this._config.vacuums.findIndex(e=>e.entity===t)).filter(t=>t>=0);if(e.length>0)return new Set(e)}}catch{}return new Set(this._config.vacuums.map((t,e)=>e))}_saveFlipLive(){try{null===this._flipLive?localStorage.removeItem(this._storeKey("flip")):localStorage.setItem(this._storeKey("flip"),JSON.stringify(this._flipLive))}catch{}}_loadFlipLive(){const t=this._readStored("flip","roborock-card:flip");if(null===t)return null;try{return!0===JSON.parse(t)}catch{return null}}_saveVeTool(t){try{localStorage.setItem(this._storeKey("ve-tool"),t)}catch{}}_loadVeTool(){try{const t=localStorage.getItem(this._storeKey("ve-tool"));if("seat"===t||"rooms"===t||"floorplan"===t)return t}catch{}return"seat"}_saveRoomSel(t){try{const e=t+":",o={};for(const[t,s]of this._localRoomSel.entries())t.startsWith(e)&&(o[t.slice(e.length)]=s);localStorage.setItem(this._storeKey("sel:"+t),JSON.stringify(o))}catch{}}_loadRoomSel(){const t=new Map;try{for(const e of this._config.vacuums){const o=this._readStored("sel:"+e.entity,"roborock-card:sel:"+e.entity);if(o){const s=JSON.parse(o);for(const[o,l]of Object.entries(s))l&&t.set(e.entity+":"+o,!0)}}}catch{}return t}_pause(t){this._call("vacuum","pause",{entity_id:t.entity})}_resume(t){this._call("vacuum","start",{entity_id:t.entity})}_dock(t){this._call("vacuum","return_to_base",{entity_id:t.entity})}_toggleRoom(t,e){if(this._backendSel())return void this._setBackendSel([t.key],"toggle");const o=e.entity+":"+t.key,s=new Map(this._localRoomSel);s.set(o,!s.get(o)),this._localRoomSel=s,this._saveRoomSel(e.entity)}_isRoomSelectedAny(t,e){const o=this._backendSel();return o?o.has(t):e.some(e=>this._localRoomSel.get(e.entity+":"+t)??!1)}_toggleRoomAcross(t,e){if(this._isRoomSelectedAny(t,e)&&e.some(t=>this._intAttrs(t))&&this._call("anyvac","pin_room",{room:t}),this._backendSel())return void this._setBackendSel([t],"toggle");const o=!this._isRoomSelectedAny(t,e),s=new Map(this._localRoomSel);for(const l of e)this._roomsFor(l).some(e=>e.key===t)&&s.set(l.entity+":"+t,o);this._localRoomSel=s;for(const t of e)this._saveRoomSel(t.entity)}_allRoomKeys(){const t=new Set;for(const e of this._config.vacuums)for(const o of this._roomsFor(e))t.add(o.key);return[...t]}_v2Vacuums(){const t=[],e=[];for(const o of this._config.vacuums){const s=this._vacCleanType(o);s.dry&&t.push(o.entity),s.wet&&e.push(o.entity)}return{dry:t,wet:e}}_unassignedRooms(t,e,o){if(!o||0===t.length)return[];const s=this._planPreview;if(!s||s.key!==this._planKey(t,e))return[];const l="wet"!==e,h="dry"!==e,d=[];for(const e of t)(l&&!s.dry.has(e)||h&&!s.wet.has(e))&&d.push(e);return d}_v2Settings(){const t={};for(const e of["dry","wet"])for(const o of this._config.vacuums){const s=this._vacCleanType(o);if(!("dry"===e?s.dry:s.wet))continue;const l=this._activePreset(o),h={};l.suction_level&&(h.fan_speed=l.suction_level),"wet"===e&&l.mop_mode&&(h.mop_mode=l.mop_mode),"wet"===e&&l.mop_intensity&&(h.mop_intensity=l.mop_intensity),l.repeat&&l.repeat>1&&(h.repeat=l.repeat),Object.keys(h).length&&((t[e]??(t[e]={}))[o.entity]=h)}return Object.keys(t).length?t:void 0}_planKey(t,e){return JSON.stringify([t,e,this._v2Vacuums(),this._pinsAttr()])}_fetchPlan(t,e){const o=this._planKey(t,e);o!==this._planFetchKey&&(this._planFetchKey=o,(async()=>{try{const s=await this.hass.callService("anyvac","plan",{rooms:t,mode:e,vacuums:this._v2Vacuums()},void 0,!1,!0);if(this._planFetchKey!==o)return;const l=s?.response?.plan??{},inv=t=>{const e=new Map;for(const[o,s]of Object.entries(t??{}))for(const t of s)e.set(t,o);return e};this._planPreview={key:o,dry:inv(l.dry),wet:inv(l.wet),eta:"number"==typeof l.eta_min?l.eta_min:null,unsequenced:Array.isArray(l.unsequenced)?l.unsequenced:[],...planOrder(l)}}catch(t){console.warn("[anyvac-card] anyvac.plan preview failed:",t),this._planFetchKey===o&&(this._planPreview={key:o,dry:new Map,wet:new Map,eta:null,unsequenced:[]})}})())}_etaFor(t,e,o){o&&t.length&&this._fetchPlan(t,e);const s=this._planPreview?.eta;return o&&null!=s?s:this._selEstMins(t)}async _runOrchestrated(t,e){if(!t.length)return;const o=this._call("anyvac","clean",{rooms:t,mode:e,vacuums:this._v2Vacuums(),...this._v2Settings()?{settings:this._v2Settings()}:{}});this._playStartSeq(t,e),await o}_playStartSeq(t,e){if(!this._themed()||this._reducedMotion())return;const o=this._planPreview;if(!o||o.key!==this._planKey(t,e)||!o.order?.length)return;const s=o.order.length,l=Math.min(.3,s>1?1.6/(s-1):.3),h=(this._startSeq?.id??0)+1;this._startSeq={id:h,delay:new Map(o.order.map((t,e)=>[t,+(e*l).toFixed(3)])),first:[...(o.first??new Map).entries()].map(([t,e])=>({entity:t,room:e}))},window.setTimeout(()=>{this._startSeq?.id===h&&(this._startSeq=null)},2600)}_reducedMotion(){if(this._config.reduce_motion)return!0;try{return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches??!1}catch{return!1}}_glideS(){if(this._reducedMotion())return 0;const t=Number(this._config.marker_glide_s??1.5);return Number.isFinite(t)?Math.min(25,Math.max(0,t)):1.5}_runMarkerGlides(){for(const t of this._markerStops)this._markerAnims.get(t)?.anim.cancel(),this._markerAnims.delete(t);if(this._markerStops.clear(),!this._markerMoves.size)return;const t=1e3*this._glideS();for(const[e,o]of this._markerMoves){const s=this.renderRoot.querySelector(`.avc-marker[data-mk="${CSS.escape(e)}"]`);if(!(s&&"function"==typeof s.animate&&t>0))continue;let l=o.route;const h=this._markerAnims.get(e);if(h){const e=h.anim.playState;if("running"===e||"paused"===e){const e=Number(h.anim.effect?.getTiming().duration)||t,o=pointAtFraction(h.route,Number(h.anim.currentTime??0)/e);l=[o.pt,...h.route.slice(o.next),...l]}h.anim.cancel()}const d=s.animate(glideKeyframes(l,o.digits),{duration:t,easing:"linear",fill:"none"});this._markerAnims.set(e,{anim:d,route:l})}this._markerMoves.clear()}_renderStartSeqAvatars(t){const e=this._startSeq;if(!e||!e.first.length)return Ht;const o=this._unrotateDelta(0,1),s=50+62*o.dx,l=50+62*o.dy,h=this._unrotateDelta(1,0),d=new Map;for(const t of e.first)d.set(t.room,(d.get(t.room)??0)+1);const p=new Map;return zt`${e.first.map(({entity:e,room:o},u)=>{const m=this._config.vacuums.find(t=>t.entity===e),_=t.find(({r:t})=>t.key===o);if(!m||!_||void 0===_.r.map_x||void 0===_.r.map_y)return Ht;const f=p.get(o)??0;p.set(o,f+1);const v=40*(f-((d.get(o)??1)-1)/2);return zt`<div class="seq-avatar" style=${Yt({"--fx":s.toFixed(2)+"%","--fy":l.toFixed(2)+"%","--tx":_.r.map_x+"%","--ty":_.r.map_y+"%",marginLeft:Math.round(h.dx*v)+"px",marginTop:Math.round(h.dy*v)+"px","--c":this._color(m),animationDelay:(.2+.12*u).toFixed(2)+"s"})} data-entity=${e} data-room=${o}>
        <span class="seq-avatar-in">${m.image?zt`<img src=${m.image} alt="" />`:zt`<ha-icon icon="mdi:robot-vacuum"></ha-icon>`}</span>
      </div>`})}`}_selectGlobalPreset(t){if(this._activeGlobalPreset=t.id,t.mode&&(this._planMode=t.mode),"all"===t.scope||Array.isArray(t.scope)){const e="all"===t.scope?this._allRoomKeys():t.scope;if(this._backendSel())return void this._setBackendSel(e,"set");const o=new Map(this._localRoomSel);for(const t of this._config.vacuums)for(const e of this._roomsFor(t))o.delete(t.entity+":"+e.key);for(const t of e)for(const e of this._config.vacuums)this._roomsFor(e).some(e=>e.key===t)&&o.set(e.entity+":"+t,!0);this._localRoomSel=o;for(const t of this._config.vacuums)this._saveRoomSel(t.entity)}}_vacAbbrev(t){return((t.name??t.entity.split(".")[1]??"").replace(/[^A-Za-z0-9]/g,"").slice(0,2)||"??").toUpperCase()}_renderPlanPreview(){if("auto"!==this._config.ui_mode)return Ht;const t=this._allRoomKeys().filter(t=>this._isRoomSelectedAny(t,this._config.vacuums));if(!t.length)return Ht;const e=this._planMode,o=(this._config.global_presets??[]).find(t=>t.id===this._activeGlobalPreset)?.label,s="dry"===e||"both"===e,l="wet"===e||"both"===e;this._fetchPlan(t,e);const h=this._planPreview?.dry??new Map,d=this._planPreview?.wet??new Map,roomDef=t=>{for(const e of this._config.vacuums){const o=this._roomsFor(e).find(e=>e.key===t);if(o)return o}},cell=t=>{const e=this._config.vacuums.find(e=>e.entity===t);if(!e)return zt`<span style="font-size:var(--avc-th-fs-xs,11px);opacity:.25">—</span>`;const o=this._color(e);return zt`<span style="display:inline-flex;align-items:center;justify-content:center;min-width:24px;height:17px;padding:0 5px;border-radius:var(--avc-th-r-pill,9px);font-size:var(--avc-th-fs-xs,10px);font-weight:700;color:rgb(var(--avc-ink-rgb));background:${o}30;border:1px solid ${o}">${this._vacAbbrev(e)}</span>`},modeBtn=(t,o)=>{const s=e===t;return zt`<button @click=${e=>{e.stopPropagation(),this._planMode=t}}
        style="padding:2px 8px;border-radius:var(--avc-th-r-m,8px);font-size:var(--avc-th-fs-xs,10px);font-weight:700;cursor:pointer;font-family:inherit;border:1px solid ${s?"rgba(var(--avc-ink-rgb),0.5)":"rgba(var(--avc-ink-rgb),0.15)"};background:${s?"rgba(var(--avc-ink-rgb),0.12)":"transparent"};color:${s?"#fff":"rgba(var(--avc-ink-rgb),0.5)"}">${o}</button>`},p="plan-run";return zt`
      <div style="margin:0 4px 6px;padding:6px 8px;background:rgba(var(--avc-ink-rgb),0.03);border:1px solid rgba(var(--avc-ink-rgb),0.08);border-radius:var(--avc-th-r-l,12px);display:flex;flex-direction:column;gap:6px">
        <div style="display:flex;align-items:center;justify-content:space-between">
          <span style="font-size:var(--avc-th-fs-xs,9px);font-weight:600;letter-spacing:.6px;color:rgba(var(--avc-ink-rgb),.35)">CLEAN PLAN${o?" · "+o.toUpperCase():""}</span>
          <div style="display:flex;gap:4px">${modeBtn("dry","Dry")}${modeBtn("wet","Wet")}${modeBtn("both","Both")}</div>
        </div>
        <div style="display:flex;gap:6px;overflow-x:auto;align-items:center">
          <div style="display:flex;flex-direction:column;gap:3px;align-items:center;flex-shrink:0;padding-right:2px">
            <span style="height:18px"></span>
            ${s?zt`<ha-icon icon="mdi:broom" style="--mdc-icon-size:14px;color:rgba(var(--avc-ink-rgb),.4)"></ha-icon>`:Ht}
            ${l?zt`<ha-icon icon="mdi:water" style="--mdc-icon-size:14px;color:rgba(var(--avc-info-rgb),.7)"></ha-icon>`:Ht}
          </div>
          ${t.map(t=>{const e=roomDef(t);return zt`<div style="display:flex;flex-direction:column;align-items:center;gap:3px;min-width:32px;flex-shrink:0" title=${e?.name??t}>
              <ha-icon icon=${e?.icon||"mdi:floor-plan"} style="--mdc-icon-size:18px;color:rgba(var(--avc-ink-rgb),.7)"></ha-icon>
              ${s?cell(h.get(t)):Ht}
              ${l?cell(d.get(t)):Ht}
            </div>`})}
        </div>
        <button class="action-btn ${this._holdId===p?"action-btn--holding":""}"
          style="flex:0 0 auto;align-self:flex-end;flex-direction:row;gap:6px;padding:7px 16px;background:rgba(var(--avc-ok-rgb),0.14);border:1px solid rgba(var(--avc-ok-rgb),0.55);color:rgb(var(--avc-ink-rgb))"
          @pointerdown=${this._holdStart(p,()=>this._runOrchestrated(t,this._planMode))}
          @pointermove=${this._holdMove}
          @pointerup=${this._holdEnd}
          @pointerleave=${this._holdEnd}
          @pointercancel=${this._holdEnd}>
          <div class="hold-ring"></div>
          <ha-icon icon="mdi:play" style="--mdc-icon-size:18px"></ha-icon>
          <span style="font-size:var(--avc-th-fs-s,12px)">Start · hold</span>
        </button>
      </div>
    `}_renderAutoBar(){if("auto"!==this._config.ui_mode)return Ht;const t=this._config.global_presets??[];return t.length?zt`
      <div style="display:flex;flex-wrap:wrap;gap:8px;padding:2px 4px 4px">
        ${t.map(t=>{const e=this._activeGlobalPreset===t.id;return zt`<button
            @click=${()=>this._selectGlobalPreset(t)}
            style="flex:0 1 auto;min-width:128px;display:flex;flex-direction:row;align-items:center;justify-content:flex-start;gap:10px;padding:9px 14px;border-radius:var(--avc-th-r-m,14px);cursor:pointer;font-family:inherit;color:white;background:${e?"rgba(var(--avc-ok-rgb),0.14)":"rgba(var(--avc-ink-rgb),0.05)"};border:1px solid ${e?"rgba(var(--avc-ok-rgb),0.6)":"rgba(var(--avc-ink-rgb),0.12)"}">
            <ha-icon icon=${t.icon||"mdi:robot-vacuum-variant"} style="--mdc-icon-size:24px"></ha-icon>
            <div style="display:flex;flex-direction:column;align-items:flex-start;line-height:1.15">
              <span style="font-size:var(--avc-th-fs-m,13px);font-weight:700">${t.label}</span>
              <small style="font-size:var(--avc-th-fs-xs,9px);font-weight:600;letter-spacing:.4px;color:rgba(var(--avc-ink-rgb),0.4)">${"all"===t.scope?"WHOLE HOME":"select"===t.scope?"SELECTED":"ROOMS"}${t.mode?" · "+("dry"===t.mode?"DRY":"wet"===t.mode?"WET":"BOTH"):""}</small>
            </div>
          </button>`})}
      </div>
    `:Ht}_pinsAttr(){const t=this._selSensor(),e=t?this.hass.states[t]?.attributes?.room_pins:void 0;return e&&"object"==typeof e?e:{}}_pinCandidates(t,e){return this._config.vacuums.filter(o=>this._roomsFor(o).some(e=>e.key===t)&&this._vacCleanType(o)[e])}_cycleRoomPin(t,e,o){const s=this._pinCandidates(t,e);if(s.length<2)return;const l=s.findIndex(t=>t.entity===o),h=s[(l+1)%s.length];this._call("anyvac","pin_room",{room:t,kind:e,vacuum:h.entity})}_vacChip(t,e){const o=this._config.vacuums.find(e=>e.entity===t);if(!o)return zt`<span class="dock-chip dock-chip--empty" @click=${e??Ht}>—</span>`;const s=this._color(o);return zt`<span class="dock-chip"
      style="color:rgb(var(--avc-ink-rgb));background:${s}30;border-color:${s}"
      title=${(o.name??o.entity)+(e?" · tap to assign a different vacuum":"")}
      @click=${e??Ht}>${this._vacAbbrev(o)}</span>`}_selEstMins(t){let e=0;for(const o of t){let t=0;for(const e of this._config.vacuums){const s=this._roomsFor(e).find(t=>t.key===o);s&&(t=Math.max(t,this._roomCleanMins(s,e)))}e+=t}return Math.round(e)}_renderVacuumIconStrip(){if("portrait"!==this._profile)return Ht;const t=this._config.vacuums;return t.length?zt`
      <div class="vac-icon-strip">
        ${t.map((t,e)=>{const o=this._shownSet.has(e),s="vacicon-"+e,l=this._holdId===s;return zt`
            <div class="vac-icon-slot">
              <button class="vac-icon-btn ${l?"vac-icon-btn--holding":""} ${o?"":"vac-icon-btn--hidden"}"
                style=${Yt({borderColor:this._statusInfo(t)[1]})}
                @pointerdown=${t=>{t.preventDefault(),this._cancelHold(),this._holdId=s,this._holdTimer=setTimeout(()=>{this._holdTimer=null,this._holdId=null,this._toggleShownMulti(e)},Jt)}}
                @pointerup=${()=>{null!==this._holdTimer?(this._cancelHold(),this._robotSheet=e):this._holdId=null}}
                @pointerleave=${this._holdEnd}
                @pointercancel=${this._holdEnd}
                title=${t.name??t.entity} aria-label=${t.name??t.entity}
                aria-pressed=${o?"true":"false"}>
                <div class="hold-ring"></div>
                ${t.image?zt`<img src=${t.image} alt="" />`:zt`<ha-icon icon="mdi:robot-vacuum" style=${Yt({color:this._color(t)})}></ha-icon>`}
                ${this._attnDot(t)}
              </button>
            </div>
          `})}
      </div>
    `:Ht}_isRail(){return"portrait"===this._profile&&!!this._config.layout&&this._themed()&&!this._config.debug_dense_dock&&!this._stackTopology}_renderRail(t){return this._modeSheetOpen?zt`<div class="dock rail rail--sheet">${this._renderModeSheet()}</div>`:zt`
      <div class="dock rail">
        <div class="rail-tiles">${t.map((t,e)=>this._renderRailTile(t,e))}</div>
        ${this._renderRailPlan(t)}
        ${this._renderRailTools(t)}
      </div>`}_renderRailTile(t,e){const o=this._shownSet.has(e),s="vacicon-"+e,l=this._holdId===s,h=this._vacName(t),d=this._color(t),p=this._isCleaning(t),[u,m,_]=this._statusInfo(t),f=this._hasError(t)?this.hass.states[this._ent(t,"error")]?.state:null,v=(this._jobProgress()?.vacuums??{})[t.entity],b=this._ent(t,"current_room"),w=b?this.hass.states[b]?.state:void 0,$=v?.room??(p&&w&&"unknown"!==w&&"unavailable"!==w?w:void 0),C="number"==typeof v?.pct?v.pct:p?this._progress(t):null,A=this._battery(t),P=f||($||(null!==A?A+" %":""));return zt`
      <button class="rail-tile ${l?"rail-tile--holding":""} ${o?"":"rail-tile--hidden"} ${p?"rail-tile--live":""}"
        style=${Yt({"--vac":d})}
        @pointerdown=${t=>{t.preventDefault(),this._cancelHold(),this._holdId=s,this._holdTimer=setTimeout(()=>{this._holdTimer=null,this._holdId=null,this._toggleShownMulti(e)},Jt)}}
        @pointerup=${()=>{null!==this._holdTimer?(this._cancelHold(),this._robotSheet=e):this._holdId=null}}
        @keydown=${t=>{"Enter"!==t.key&&" "!==t.key||(t.preventDefault(),this._robotSheet=e)}}
        @pointerleave=${this._holdEnd}
        @pointercancel=${this._holdEnd}
        title="${h} \u2014 tap for controls, hold to ${o?"hide it on":"show it on"} the map"
        aria-label="${h} \u2014 open controls" aria-pressed=${o?"true":"false"}>
        <div class="hold-ring"></div>
        ${this._renderBattRing(t,36)}
        <span class="rail-tile-text">
          <span class="rail-tile-name">${h}${o?Ht:zt`<ha-icon icon="mdi:eye-off-outline"></ha-icon>`}</span>
          <span class="tile-status" style=${Yt({color:f?"rgb(var(--avc-err-rgb))":m})}>
            <ha-icon icon=${f?"mdi:alert-circle-outline":_}></ha-icon>${u}
          </span>
          ${P?zt`<span class="tile-sub">${P}</span>`:Ht}
        </span>
        ${p&&null!==C?zt`<span class="rail-tile-bar"><span style=${Yt({width:Math.min(100,C)+"%"})}></span></span>`:Ht}
      </button>`}_renderRailPlan(t){const e=t.some(t=>this._intAttrs(t)),o=this._jobProgress(),s=new Map(this._config.vacuums.map(t=>[t.entity,t]));if(o&&Array.isArray(o.rooms)){const t=o.rooms;return zt`
        <div class="rail-card rail-plan">
          <div class="rail-card-head"><ha-icon icon="mdi:format-list-checks"></ha-icon><span>Plan</span>
            <small>${o.passes_done??0}/${o.passes_total??t.length}</small></div>
          ${t.map(t=>{const e=s.get(t.vacuum),o="done"===t.state?"done":"active"===t.state?"active":"queued";return zt`
              <div class="rail-plan-row rail-plan-row--${o}">
                <ha-icon icon=${"wet"===t.kind?"mdi:water":"mdi:broom"} style=${Yt({color:e?this._color(e):"inherit"})}></ha-icon>
                <span class="rail-plan-name">${t.room}</span>
                ${"done"===o?zt`<ha-icon class="rail-plan-state" icon="mdi:check"></ha-icon>`:"active"===o?zt`<b>${Math.round(Number(t.pct??0))}\u2009%</b>`:Ht}
              </div>`})}
        </div>`}const l=this._allRoomKeys();if(!l.length)return Ht;const h=new Map(this._mergedRoomDefs(t).map(({r:t})=>[t.key,t.name??t.key])),d=l.filter(e=>this._isRoomSelectedAny(e,t)),p=d.length?d:l;e&&this._fetchPlan(p,this._planMode);const u=this._etaFor(p,this._planMode,e),m=this._unassignedRooms(p,this._planMode,e);return zt`
      <div class="rail-card rail-sel">
        <div class="rail-card-head">
          <ha-icon icon=${d.length?"mdi:checkbox-multiple-marked-outline":"mdi:home-outline"}></ha-icon>
          <span>${d.length?`${d.length} ${1===d.length?"room":"rooms"}`:"Whole home"}</span>
          ${u?zt`<small>~${u} min</small>`:Ht}
        </div>
        ${d.length?zt`<div class="rail-chips">${d.map(t=>zt`<span class="rail-chip">${h.get(t)??t}</span>`)}</div>
              <button class="mtbtn rail-clear" @click=${()=>this._clearRoomSelection()}>
                <ha-icon icon="mdi:close"></ha-icon><span>Clear</span></button>`:zt`<span class="rail-hint">Tap rooms on the map to pick them</span>`}
        ${m.length?zt`<span class="rail-warn"><ha-icon icon="mdi:robot-off"></ha-icon>${m.length} without a robot for this mode</span>`:Ht}
      </div>`}_renderRailTools(t){const e=t.filter(t=>this._mapEntityFor(t)),o=this._alignCandidates(t);return zt`
      <div class="rail-tools">
        ${this._renderLayerToggleCompact(t)}
        ${e.length?zt`<button class="mtbtn mtbtn--icon" title="Refresh map" aria-label="Refresh map" @click=${t=>{const o=t.currentTarget;o.classList.remove("mtbtn--spin"),o.offsetWidth,o.classList.add("mtbtn--spin");for(const t of e)this._refreshMap(t)}}>
            <ha-icon icon="mdi:refresh"></ha-icon></button>`:Ht}
        ${this._config.layout?zt`<button class="mtbtn mtbtn--icon ${this._flipEff?"on":""}"
            title="Flip map 180° for this screen (this session only)" aria-label="Flip map"
            aria-pressed=${this._flipEff?"true":"false"} @click=${()=>this._toggleFlipLive()}>
            <ha-icon icon="mdi:flip-vertical"></ha-icon></button>`:Ht}
        ${o.length?zt`<button class="mtbtn mtbtn--icon" title="Align — full-screen manual floorplan seating" aria-label="Align"
            @click=${()=>this._requestVisualEditor(o[0])}>
            <ha-icon icon="mdi:vector-square-edit"></ha-icon></button>`:Ht}
      </div>`}_clearRoomSelection(){const t=this._config.vacuums,e=this._allRoomKeys().filter(e=>this._isRoomSelectedAny(e,t));if(e.length)if(this._backendSel()){if(t.some(t=>this._intAttrs(t)))for(const t of e)this._call("anyvac","pin_room",{room:t});this._setBackendSel([],"clear")}else for(const o of e)this._toggleRoomAcross(o,t)}_renderDock(t,e=!1){const o=this._config.vacuums;if(this._isRail())return this._renderRail(o);if(t&&this._usesPlanColumn())return this._renderPlanColumn(o);const s=this._mergedRoomDefs(o);if(!s.length)return zt`${e?this._renderVacuumPicker():Ht}${this._renderVacuumIconStrip()}`;const l=o.some(t=>this._intAttrs(t)),h=this._planMode,d=this._allRoomKeys().filter(t=>this._isRoomSelectedAny(t,o)),p=d.length?d:this._allRoomKeys();l&&p.length&&this._fetchPlan(p,h);const u=this._planPreview?.dry??new Map,m=this._planPreview?.wet??new Map,_=new Set(l?this._planPreview?.unsequenced??[]:[]),f=new Set(this._unassignedRooms(p,h,l)),v="wet"!==h,b="dry"!==h,badge=t=>null===t?"—":t<1?"<1d":Math.round(t)+"d",modeBtn=(t,e,o)=>zt`
      <button class="dock-mode ${h===t?"on":""}"
        @click=${e=>{e.stopPropagation(),this._planMode=t}}>
        <ha-icon icon=${e}></ha-icon><span>${o}</span>
      </button>`,w="dock-run",$="portrait"!==this._profile||!!this._config.debug_dense_dock,C=this._themed();return zt`
      <div class="dock">
        ${e?this._renderVacuumPicker():Ht}
        ${this._renderVacuumIconStrip()}
        ${"portrait"===this._profile?zt`
            <div class="dock-layers">${this._renderLayerToggleCompact(o)}
              ${this._config.layout?zt`<button class="mtbtn ${this._flipEff?"on":""}"
                  title="Flip map 180° for this screen (this session only)"
                  @click=${()=>this._toggleFlipLive()}>
                <ha-icon icon="mdi:flip-vertical"></ha-icon>
              </button>`:Ht}
              ${(()=>{const t=this._alignCandidates(o);return t.length?zt`<button class="mtbtn" title="Align — full-screen manual floorplan seating"
                    @click=${()=>this._requestVisualEditor(t[0])}>
                  <ha-icon icon="mdi:vector-square-edit"></ha-icon>
                </button>`:Ht})()}
            </div>
          `:Ht}
        ${t?zt`
          <div class="dock-head">
            ${modeBtn("dry","mdi:broom","Dry")}${modeBtn("wet","mdi:water","Wet")}${modeBtn("both","mdi:water-plus","Both")}
          </div>`:Ht}
        ${this._renderModeSheet()}
        ${$?zt`<div class="dock-rows">
          ${s.map(({r:t,v:e})=>{const s=this._intRoomRec(e,t),d=this._ageDaysFromIso(s?.dry),p=this._ageDaysFromIso(s?.wet),w=this._roomCoverageRec(e,t),covBadge=t=>C?null==t||t>=100?"":t+"%":null==t?"—":t+"%",$=this._isRoomSelectedAny(t.key,o),A=this._pinCandidates(t.key,"dry").length>1,P=this._pinCandidates(t.key,"wet").length>1,pinTap=(e,o)=>("dry"===e?A:P)?s=>{s.stopPropagation(),this._cycleRoomPin(t.key,e,o)}:void 0,F="normal"!==this._mapMode;return zt`
              <button class="dock-row ${$?"on":""} ${F?"room-overlay--locked":""}" ?disabled=${F}
                title=${F?"Room selection is off while placing a pin/zone":""}
                @click=${()=>{F||this._toggleRoomAcross(t.key,o)}}>
                <ha-icon class="dock-ric" icon=${t.icon??"mdi:square"}></ha-icon>
                <span class="dock-name">${t.name??t.key}</span>
                <span class="dock-info">
                  ${$&&f.has(t.key)?zt`<ha-icon class="dock-unassigned" icon="mdi:robot-off"
                    title="No available robot for this room's ${h} pass — check that a vacuum is configured with the right role and knows this room."></ha-icon>`:Ht}
                  ${$&&_.has(t.key)?zt`<ha-icon class="dock-unseq" icon="mdi:sort-variant-off"
                    title="No cleaning order set for this room — the time estimate may be off. Set the order in the card editor's Global tab."></ha-icon>`:Ht}
                  <span class="dock-ages">
                    <span class="dock-age">${this._renderProgChip(this._roomProgForType(t,o,"dry"))}<ha-icon icon="mdi:broom"></ha-icon><b style=${Yt({color:this._colorForAgeDays(d)})}>${badge(d)}</b>${this._renderCovBadge(w,"dry",covBadge)}</span>
                    <span class="dock-age">${this._renderProgChip(this._roomProgForType(t,o,"wet"))}<ha-icon icon="mdi:water"></ha-icon><b style=${Yt({color:this._colorForAgeDays(p)})}>${badge(p)}</b>${this._renderCovBadge(w,"wet",covBadge)}</span>
                  </span>
                  ${l&&$?zt`
                    <span class="dock-avatars">
                      ${v?this._vacChip(u.get(t.key),pinTap("dry",u.get(t.key))):Ht}
                      ${b?this._vacChip(m.get(t.key),pinTap("wet",m.get(t.key))):Ht}
                    </span>`:Ht}
                </span>
              </button>`})}
        </div>`:Ht}
        ${t&&l?zt`
          <div class="dock-foot">
            <span class="dock-est">${d.length?d.length+" rooms · ~"+this._etaFor(p,h,l)+" min":"Whole home · ~"+this._etaFor(p,h,l)+" min"}
              ${f.size?zt`<ha-icon class="dock-unassigned" icon="mdi:robot-off"
                title="${f.size} selected room${f.size>1?"s have":" has"} no available robot for the ${h} pass — it/they will be silently skipped. Check vacuum roles/config."></ha-icon>`:Ht}
              ${_.size?zt`<ha-icon class="dock-unseq" icon="mdi:sort-variant-off"
                title="${_.size} selected room${_.size>1?"s have":" has"} no cleaning order set — the time above may be off. Set the order in the card editor's Global tab."></ha-icon>`:Ht}</span>
            <button class="action-btn dock-run ${this._holdId===w?"action-btn--holding":""}"
              ?disabled=${!p.length}
              @pointerdown=${p.length?this._holdStart(w,()=>this._runOrchestrated(p,this._planMode)):Ht}
              @pointermove=${this._holdMove}
              @pointerup=${this._holdEnd}
              @pointerleave=${this._holdEnd}
              @pointercancel=${this._holdEnd}>
              <div class="hold-ring"></div>
              <ha-icon icon="mdi:play" style="--mdc-icon-size:16px"></ha-icon>
              <span style="font-size:var(--avc-th-fs-s,12px)">Start · hold</span>
            </button>
          </div>`:Ht}
      </div>
    `}_usesPlanColumn(){return"landscape"===this._profile&&!!this._config.layout&&this._themed()&&!this._config.debug_dense_dock&&this._config.vacuums.some(t=>this._intAttrs(t))}_renderPlanColumn(t){const e=this._planMode,o=this._allRoomKeys(),s=o.filter(e=>this._isRoomSelectedAny(e,t)),l=s.length?s:o;l.length&&this._fetchPlan(l,e);const h=this._planPreview&&this._planPreview.key===this._planKey(l,e)?this._planPreview:null,d=new Map(this._mergedRoomDefs(t).map(({r:t})=>[t.key,t.name??t.key])),p=new Map(this._config.vacuums.map(t=>[t.entity,t])),u=this._jobProgress(),m="dock-run",holdBtn=(t,e,o,s,l)=>zt`
      <button class="action-btn dock-run ${t} ${s&&this._holdId===m?"action-btn--holding":""}"
        ?disabled=${!s}
        @pointerdown=${s?this._holdStart(m,l):Ht}
        @pointermove=${this._holdMove}
        @pointerup=${this._holdEnd} @pointerleave=${this._holdEnd} @pointercancel=${this._holdEnd}>
        <div class="hold-ring"></div>
        <ha-icon icon=${e}></ha-icon><span>${o}</span>
      </button>`;if(u&&Array.isArray(u.rooms)){const t=u.rooms,e="number"==typeof u.eta_min_left?Math.round(u.eta_min_left):null;return zt`
        <div class="dock plan-col">
          <div class="plan-head">
            <span>Plan · ${u.passes_done??0} of ${u.passes_total??t.length} passes done</span>
          </div>
          <div class="plan-rows">
            ${t.map(t=>{const e=p.get(t.vacuum),o="done"===t.state?"done":"active"===t.state?"active":"queued";return zt`
                <div class="plan-row plan-row--${o}">
                  <ha-icon class="plan-kind" icon=${"wet"===t.kind?"mdi:water":"mdi:broom"}></ha-icon>
                  <span class="plan-name">${d.get(t.room)??t.room}</span>
                  <span class="dock-avatars">${e?this._vacChip(e.entity):Ht}</span>
                  <span class="plan-when">${"done"===o?zt`<ha-icon icon="mdi:check"></ha-icon>`:"active"===o?zt`<b>${Math.round(Number(t.pct??0))} %</b>`:Ht}</span>
                </div>`})}
          </div>
          <div class="plan-foot">
            <span class="plan-sum">
              <b>${u.finish_at?"Done around "+this._clockStr(u.finish_at):"Cleaning"}</b>
              <small>${null!==e?"~"+e+" min left":""}</small>
            </span>
            ${holdBtn("plan-cancel","mdi:stop","Cancel · hold",!0,()=>{this._call("anyvac","cancel",{})})}
          </div>
        </div>`}const _=h?.dry??new Map,f=h?.wet??new Map,v=new Set(h?.unsequenced??[]),b=new Set(this._unassignedRooms(l,e,!0)),w=h?.finish,$=[...l].sort((t,e)=>(w?.get(t)??1/0)-(w?.get(e)??1/0)),C=Date.now(),at=t=>void 0===t?"":this._clockStr(new Date(C+6e4*t).toISOString()),pinTap=(t,e,o)=>this._pinCandidates(t,e).length>1?s=>{s.stopPropagation(),this._cycleRoomPin(t,e,o)}:void 0,modeBtn=(t,o,s)=>zt`
      <button class="dock-mode ${e===t?"on":""}" aria-pressed=${e===t?"true":"false"}
        @click=${e=>{e.stopPropagation(),this._planMode=t}}>
        <ha-icon icon=${o}></ha-icon><span>${s}</span>
      </button>`,who=t=>[...new Set(l.map(e=>t.get(e)).filter(t=>!!t))].map(t=>p.get(t)?this._vacName(p.get(t)):t).join(" + "),A="wet"!==e?who(_):"",P="dry"!==e?who(f):"",F=[A&&"dry "+A,P&&"wet "+P].filter(Boolean).join(", then "),E=h?.eta??null;return zt`
      <div class="dock plan-col">
        <div class="dock-head">
          ${modeBtn("dry","mdi:broom","Dry")}${modeBtn("wet","mdi:water","Wet")}${modeBtn("both","mdi:water-plus","Both")}
        </div>
        <div class="plan-head">
          <span>${s.length?`Selected · ${s.length} room${1===s.length?"":"s"}`:`Whole home · ${o.length} room${1===o.length?"":"s"}`}</span>
          ${s.length?zt`<button class="plan-clear" @click=${()=>this._clearRoomSelection()}>Clear · whole home</button>`:Ht}
        </div>
        <div class="plan-rows">
          ${$.map(t=>zt`
            <div class="plan-row">
              <span class="plan-name">${d.get(t)??t}</span>
              ${b.has(t)?zt`<ha-icon class="dock-unassigned" icon="mdi:robot-off"
                title="No available robot for this room's ${e} pass — check that a vacuum is configured with the right role and knows this room."></ha-icon>`:Ht}
              ${v.has(t)?zt`<ha-icon class="dock-unseq" icon="mdi:sort-variant-off"
                title="No cleaning order set for this room — the time estimate may be off. Set the order in the card editor's Global tab."></ha-icon>`:Ht}
              <span class="dock-avatars">
                ${"wet"!==e?this._vacChip(_.get(t),pinTap(t,"dry",_.get(t))):Ht}
                ${"dry"!==e?this._vacChip(f.get(t),pinTap(t,"wet",f.get(t))):Ht}
              </span>
              <span class="plan-when">${at(w?.get(t))}</span>
            </div>`)}
        </div>
        <div class="plan-foot">
          <span class="plan-sum">
            <b>${null!==E?"Done around "+at(E):"Whole plan"}</b>
            <small>${[F,null!==E?"~"+this._timeStr(E).replace(/^~/,""):""].filter(Boolean).join(" · ")}</small>
          </span>
          ${holdBtn("","mdi:play","Hold to start",l.length>0,()=>this._runOrchestrated(l,this._planMode))}
        </div>
      </div>`}_dockTier(t){const e=this._intAttrs(t)?.dock_status?.dock_type;return null==e||0===e?"none":1===e||5===e?"empty":"full"}_dockCaps(t){const e=this._intAttrs(t)?.dock_status?.features;if(e&&null!==e.has_dock&&void 0!==e.has_dock)return{hasDock:!!e.has_dock,collect:!!e.is_collectable,wash:!!e.is_washable,dry:!!e.is_dryable};const o=this._dockTier(t);return{hasDock:"none"!==o,collect:"none"!==o,wash:"full"===o,dry:"full"===o}}_dockCapsKey(t){const e=this._dockCaps(t);return`${e.hasDock?1:0}${e.collect?1:0}${e.wash?1:0}${e.dry?1:0}`}_dockRunning(t,e){const o=this._intAttrs(t)?.dock_status?.running;if(!o)return null;const s=o[e];return null==s?null:!!s}_renderDockTab(t){const e=this._dockCaps(t),o=this._intAttrs(t)?.dock_status,act=(e,o)=>()=>{this._call("anyvac",e,{entity_id:t.entity,...o?{action:o}:{}})},cycle=(e,o,s,l)=>{const h=this._dockRunning(t,o);return zt`
        <button class="dock-sheet-action ${h?"running":""}"
          title=${h?`Stop ${l.toLowerCase()}`:l}
          @click=${act(e,h?"stop":"start")}>
          <ha-icon icon=${h?"mdi:stop":s}></ha-icon>
          <span>${h?"Stop":l}</span>
        </button>`},s=this._careItems(t).filter(t=>t.binary),l=s.filter(t=>"on"===this.hass.states[t.binary]?.state),h=o?.dock_error_status,d=null!=h&&0!==h&&"0"!==h,p=["empty","wash","dry"].filter(e=>this._dockRunning(t,e)).map(t=>({empty:"Emptying the bin",wash:"Washing the mop",dry:"Drying the mop"}[t])),u=d||l.length>0,m="string"==typeof o?.dock_error?o.dock_error.replace(/_/g," "):"",_=d?m?`Dock error: ${m}`:"The dock reports an error":l.length?l.map(t=>t.label).join(", ")+" — check":p.length?p.join(" · "):"Dock ready";return zt`
      <div class="rs-pane">
        <div class="rs-dock-state ${u?"bad":""}">
          <ha-icon icon=${u?"mdi:alert-circle-outline":p.length?"mdi:progress-clock":"mdi:check-circle-outline"}></ha-icon>
          <span>${_}</span>
          ${d?zt`
            <button class="rs-dock-resolve" title="Confirm the error is fixed, like Resolved in the Roborock app"
              @click=${act("dock_resolve_error")}>
              <ha-icon icon="mdi:check-circle-outline"></ha-icon><span>Resolved</span>
            </button>`:Ht}
        </div>
        ${s.length?zt`
          <div class="dock-sheet-care">
            ${s.map(t=>{const e="on"===this.hass.states[t.binary]?.state;return zt`
                <div class="dock-sheet-care-row">
                  <span class="dock-sheet-care-label">${t.label}</span>
                  <span class="dock-sheet-care-badge ${e?"warn":""}">${e?"Check":"OK"}</span>
                </div>`})}
          </div>`:Ht}
        ${this._config.debug&&o?zt`
          <div class="dock-sheet-debug">
            ${Object.entries(o).flatMap(([t,e])=>null===e||"object"!=typeof e||Array.isArray(e)?[[t,e]]:Object.entries(e).map(([e,o])=>[`${t}.${e}`,o])).filter(([t,e])=>void 0!==e&&(null!==e||t.includes("."))).map(([t,e])=>zt`<span>${t}: ${null===e?"null":String(e)}</span>`)}
          </div>`:Ht}
        ${e.hasDock?zt`
          <div class="dock-sheet-actions">
            ${e.collect?cycle("dock_empty","empty","mdi:delete-empty","Empty"):Ht}
            ${e.wash?cycle("dock_wash","wash","mdi:water","Wash"):Ht}
            ${e.dry?cycle("dock_dry","dry","mdi:hair-dryer","Dry"):Ht}
            ${e.wash?zt`
              <button class="dock-sheet-action" @click=${act("dock_pump")}>
                <ha-icon icon="mdi:water-pump"></ha-icon><span>Pump</span>
              </button>
              <button class="dock-sheet-action" @click=${act("dock_self_clean")}>
                <ha-icon icon="mdi:autorenew"></ha-icon><span>Self-clean</span>
              </button>`:Ht}
          </div>`:Ht}
      </div>
    `}_renderCareTab(t){const e=this._careWarnPct(),o=this._careItems(t).filter(t=>!t.binary).map((t,e)=>({r:t,i:e,pct:this._carePct(t)})).sort((t,e)=>(t.pct??1e9)-(e.pct??1e9)||t.i-e.i),reset=t=>e=>{e.stopPropagation();const o=t.entity??t.reset,s=new Map(this._careResetPending);s.set(o,Date.now()),this._careResetPending=s,setTimeout(()=>{if(this._careResetPending.get(o)===s.get(o)){const t=new Map(this._careResetPending);t.delete(o),this._careResetPending=t}},4e4),this._call("button","press",{entity_id:t.reset})};return zt`
      <div class="rs-pane">
        <div class="dock-sheet-care rs-care">
          ${o.map(({r:t,pct:o})=>{const s=null!==o&&o<=e,l=!!t.reset&&this._careResetPending.has(t.entity??t.reset);return zt`
              <div class="dock-sheet-care-row ${s?"low":""}">
                <span class="rs-care-main">
                  <span class="rs-care-line">
                    ${s?zt`<ha-icon class="rs-care-warn" icon="mdi:alert-outline"></ha-icon>`:Ht}
                    <span class="dock-sheet-care-label">${t.label}</span>
                    <span class="dock-sheet-care-value">${this._careValue(t)}</span>
                  </span>
                  ${null!==o?zt`<span class="rs-care-bar"><span style=${Yt({width:o+"%"})}></span></span>`:Ht}
                </span>
                ${t.reset?zt`
                  <button class="dock-sheet-care-reset ${l?"pending":""}"
                    title="Reset ${t.label}" aria-label="Reset ${t.label}" ?disabled=${l} @click=${reset(t)}>
                    <ha-icon icon=${l?"mdi:loading":"mdi:refresh"}></ha-icon>
                  </button>`:Ht}
              </div>`})}
        </div>
        <span class="rs-note">Worst first · marked at ${e} % or less</span>
      </div>
    `}_renderModeSheet(){if(!this._modeSheetOpen)return Ht;const t=this._planMode,pick=t=>e=>{e.stopPropagation(),this._planMode=t,this._modeSheetOpen=!1},modeBtn=(e,o,s)=>zt`
      <button class="dock-mode ${t===e?"on":""}" @click=${pick(e)}>
        <ha-icon icon=${o}></ha-icon><span>${s}</span>
      </button>`;return zt`
      <div class="dock-sheet">
        <div class="dock-head">
          ${modeBtn("dry","mdi:broom","Dry")}${modeBtn("wet","mdi:water","Wet")}${modeBtn("both","mdi:water-plus","Both")}
        </div>
      </div>
    `}_renderStartBar(){const t=this._config.vacuums,e=t.some(t=>this._intAttrs(t)),o=this._allRoomKeys().filter(e=>this._isRoomSelectedAny(e,t)),s=o.length?o:this._allRoomKeys(),l=t.some(t=>this._isCleaning(t)),h="startbar",d={dry:"mdi:broom",wet:"mdi:water",both:"mdi:water-plus"}[this._planMode],p={dry:"Dry",wet:"Wet",both:"Both"}[this._planMode],u=zt`
      <button class="start-seg start-seg--mode ${this._modeSheetOpen?"on":""}"
        title="Clean type — tap to change"
        @click=${t=>{t.stopPropagation(),this._modeSheetOpen=!this._modeSheetOpen}}>
        <ha-icon icon=${d}></ha-icon>
        <span>${p}</span>
      </button>`;if(l)return zt`
        <div class="start-row">
          ${u}
          <button class="start-bar start-bar--cancel ${this._holdId===h?"action-btn--holding":""}"
            @pointerdown=${this._holdStart(h,()=>{if(e)this._call("anyvac","cancel",{});else for(const e of t)this._isCleaning(e)&&this._pause(e)})}
            @pointermove=${this._holdMove}
            @pointerup=${this._holdEnd} @pointerleave=${this._holdEnd} @pointercancel=${this._holdEnd}>
            <div class="hold-ring"></div>
            <ha-icon icon="mdi:stop"></ha-icon>
            <span>CANCEL · hold</span>
          </button>
        </div>`;const m=e&&s.length>0,_=this._etaFor(s,this._planMode,e),f=o.length?o.length+(1===o.length?" room":" rooms"):"whole home";return zt`
      <div class="start-row">
        ${u}
        <button class="start-bar ${m&&this._holdId===h?"action-btn--holding":""}"
          ?disabled=${!m}
          title=${e?"":"Requires the AnyVac integration"}
          @pointerdown=${m?this._holdStart(h,()=>this._runOrchestrated(s,this._planMode)):Ht}
          @pointermove=${this._holdMove}
          @pointerup=${this._holdEnd} @pointerleave=${this._holdEnd} @pointercancel=${this._holdEnd}>
          <div class="hold-ring"></div>
          <ha-icon icon="mdi:play"></ha-icon>
          <span>START · ${f}${_?" · ~"+_+" min":""}</span>
        </button>
      </div>`}_settingPresets(t){if(t.presets&&t.presets.length)return t.presets;const e=t.clean_action;return[{id:"default",label:"Default",suction_level:e?.suction_level,mop_mode:e?.mop_mode,mop_intensity:e?.mop_intensity,repeat:e?.repeat}]}_activePresetId(t){const e=this._settingPresets(t),o=this._activePresets.get(t.entity);return o&&e.some(t=>t.id===o)?o:e[0]?.id??"default"}_activePreset(t){const e=this._settingPresets(t),o=this._activePresetId(t);return e.find(t=>t.id===o)??e[0]}_setActivePreset(t,e){const o=new Map(this._activePresets);o.set(t.entity,e),this._activePresets=o}_renderPresetChips(t){const e=this._settingPresets(t);if(e.length<2)return Ht;const o=this._activePresetId(t),s=this._color(t);return zt`
      <div class="preset-chip-row">
        ${e.map(e=>{const l=e.id===o;return zt`<button
            @click=${o=>{o.stopPropagation(),this._setActivePreset(t,e.id)}}
            style=${Yt({display:"inline-flex",alignItems:"center",gap:"4px",flexShrink:"0",padding:"4px 10px",borderRadius:"var(--avc-th-r-pill, 14px)",cursor:"pointer",fontSize:"var(--avc-th-fs-s, 12px)",lineHeight:"1",border:"1px solid "+(l?s:"rgba(var(--avc-ink-rgb),0.15)"),background:l?this._colorBg(t):"rgba(var(--avc-ink-rgb),0.04)",color:l?"rgb(var(--avc-ink-rgb))":"rgba(var(--avc-ink-rgb),0.55)"})}
          >
            ${e.icon?zt`<ha-icon icon=${e.icon} style="--mdc-icon-size:14px"></ha-icon>`:Ht}
            <span>${e.label}</span>
          </button>`})}
      </div>
    `}async _startClean(t){const e=this._roomsFor(t).filter(e=>this._isRoomSelected(e,t));if(0===e.length)return;if(this._intAttrs(t)){const o=this._activePreset(t),s=this._liveCleanType(t),l={};return o.suction_level&&(l.fan_speed=o.suction_level),"wet"===s&&o.mop_mode&&(l.mop_mode=o.mop_mode),"wet"===s&&o.mop_intensity&&(l.mop_intensity=o.mop_intensity),o.repeat&&o.repeat>1&&(l.repeat=o.repeat),void await this._call("anyvac","clean",{rooms:e.map(t=>t.key),mode:s,vacuums:[t.entity],...Object.keys(l).length?{settings:{[s]:{[t.entity]:l}}}:{}})}if(!t.clean_action)return;if("script"===t.clean_action.type){const o=t.clean_action,s={};for(const[l,h]of Object.entries(o.variables??{}))s[l]=h.replace("{{ entity }}",t.entity).replace("{{ selected_segments }}",JSON.stringify(e.map(t=>t.segment_id).filter(Boolean))).replace("{{ selected_room_keys }}",JSON.stringify(e.map(t=>t.key))).replace("{{ selected_area_ids }}",JSON.stringify(e.map(t=>t.area_id).filter(Boolean)));return void await this._call("script","turn_on",{entity_id:o.entity_id,variables:s})}const o=t.clean_action,s=this._activePreset(t),l=s.mop_mode??o.mop_mode,h=s.mop_intensity??o.mop_intensity,d=s.suction_level??o.suction_level;if(o.mop_mode_entity&&l&&await this._call("select","select_option",{entity_id:o.mop_mode_entity,option:l}),o.mop_intensity_entity&&h&&await this._call("select","select_option",{entity_id:o.mop_intensity_entity,option:h}),d&&await this._call("vacuum","set_fan_speed",{entity_id:t.entity,fan_speed:d}),"native-area"===t.clean_action.type)try{await this.hass.callService("vacuum","clean_area",{cleaning_area_id:e.map(t=>t.area_id??this._config.area_mappings?.[t.key]??t.key)},{entity_id:t.entity})}catch(t){console.error("[anyvac-card] vacuum.clean_area failed:",t)}else{const o=t.clean_action,s=e.map(t=>t.segment_id).filter(t=>void 0!==t);if(!s.length)return void console.error("[anyvac-card] no configured segment_ids for the selection; aborting");await this._call("vacuum","send_command",{entity_id:t.entity,command:"app_segment_clean",params:[{segments:s,repeat:o.repeat??1}]})}}_renderBadge(t,e){const o=this._shownSet.has(e),s=this._isCleaning(t),l=this._color(t),h=t.name??t.entity.split(".")[1]??t.entity,d=this._holdId==="badge-"+e,p=this._statusInfo(t)[1],u=s?this._colorBgActive(t):o?this._colorBg(t):"rgba(var(--avc-scrim-2-rgb),0.85)";return zt`
      <button
        class="badge ${d?"badge--holding":""}"
        style=${Yt({background:u,border:s?"3px solid "+p:o?"2px solid "+p:"2px solid rgba(var(--avc-ink-rgb),0.18)",boxShadow:s?"0 0 18px "+p:o?"0 0 6px "+p:"none"})}
        @pointerdown=${t=>{t.preventDefault(),this._cancelHold(),this._holdId="badge-"+e,this._holdTimer=setTimeout(()=>{this._holdTimer=null,this._holdId=null,this._toggleShown(e)},Jt)}}
        @pointerup=${()=>{null!==this._holdTimer?(this._cancelHold(),this._shownSet=new Set([e]),this._saveShown()):this._holdId=null}}
        @pointerleave=${this._holdEnd}
        @pointercancel=${this._holdEnd}
        aria-pressed=${o?"true":"false"}
        aria-label=${h}
      >
        <div class="hold-ring"></div>
        ${t.image?zt`<img class="badge-img" src=${t.image} alt=${h} />`:zt`<ha-icon class="badge-icon" icon="mdi:robot-vacuum" style=${Yt({color:l})}></ha-icon>`}
        <span class="badge-name" style=${Yt({color:o?"rgb(var(--avc-ink-rgb))":"rgba(var(--avc-ink-rgb),0.55)"})}>
          ${h}
        </span>
      </button>
    `}_renderVacuumPicker(){const t=this._config.vacuums;return t.length?zt`<div class="vac-picker">${t.map((t,e)=>this._renderBadge(t,e))}</div>`:Ht}_renderGlobalBadge(t,e){const o=this._isGlobalActive(t),s=this._resolveColor(t.color,"orange"),l="global-"+e,h=this._holdId===l,d=o?this._resolveBg(t.color,"orange",!0):"rgba(var(--avc-scrim-2-rgb),0.85)";return zt`
      <button
        class="badge badge--global ${h?"badge--holding":""}"
        style=${Yt({background:d,border:o?"3px solid "+s:"2px solid rgba(var(--avc-ink-rgb),0.18)",boxShadow:o?"0 0 18px "+s+"B0":"none"})}
        @pointerdown=${this._holdStart(l,()=>this._triggerGlobal(t))}
        @pointermove=${this._holdMove}
        @pointerup=${this._holdEnd}
        @pointerleave=${this._holdEnd}
        @pointercancel=${this._holdEnd}
        aria-label=${t.name}
        title=${"Hold to trigger: "+t.name}
      >
        <div class="hold-ring"></div>
        ${t.image?zt`<img class="badge-img" src=${t.image} alt=${t.name} />`:zt`<ha-icon class="badge-icon" icon="mdi:home-floor-a" style=${Yt({color:s})}></ha-icon>`}
        <span class="badge-name" style=${Yt({color:o?"rgb(var(--avc-ink-rgb))":"rgba(var(--avc-ink-rgb),0.55)"})}>
          ${t.name}
        </span>
      </button>
    `}_toggleMode(t,e){this._mapMode===e&&this._modeEntity===t?(this._mapMode="normal",this._modeEntity=null):(this._mapMode=e,this._modeEntity=t)}_armMode(t){this._mapMode===t&&"*"===this._modeEntity?(this._mapMode="normal",this._modeEntity=null):(this._mapMode=t,this._modeEntity="*",this._pinPending=null,this._zonePending=null,this._zoneRectShown=null,this._zoneEdit=null)}_modeCandidates(){return this._config.vacuums.filter(t=>this._intAttrs(t)&&this._mapEntityFor(t))}_isModeCandidate(t){return this._modeEntity===t.entity||"*"===this._modeEntity&&!!this._intAttrs(t)&&!!this._mapEntityFor(t)}_hasZoneEditTarget(t){return this._isModeCandidate(t)||!!this._zonePending?.[t.entity]}_zoneHit(t,e,o){const s=Math.min(t.x0,t.x1),l=Math.max(t.x0,t.x1),h=Math.min(t.y0,t.y1),d=Math.max(t.y0,t.y1),p=[["nw",s,h],["ne",l,h],["sw",s,d],["se",l,d]];for(const[t,s,l]of p)if(Math.abs(e-s)<=4&&Math.abs(o-l)<=4)return t;return e>=s&&e<=l&&o>=h&&o<=d?"move":null}_renderZoneHandles(){return zt`
      <div class="zone-handle zone-handle--nw"></div>
      <div class="zone-handle zone-handle--ne"></div>
      <div class="zone-handle zone-handle--sw"></div>
      <div class="zone-handle zone-handle--se"></div>
    `}_zoneRectFor(t,e){return"zone"===this._mapMode&&this._isModeCandidate(t)&&this._zoneDrag?this._zoneDrag:this._zoneRectShown?"merged"===this._config.map_mode?e?this._zoneRectShown:null:this._zonePending?.[t.entity]?this._zoneRectShown:null:null}_refreshMap(t){const e=this._mapEntityFor(t);e&&this.hass.callService("homeassistant","update_entity",{entity_id:e})}_clampPct(t){return Math.min(100,Math.max(0,t))}_onMapClick(t,e){if("pin"!==this._mapMode)return;if(!this._isModeCandidate(t))return;if("*"===this._modeEntity&&"merged"===this._config.map_mode){const t={};for(const o of this._modeCandidates()){const s=this._homeFrameCropFor(o);if(s){const l=this._clickToHomePx(s,e.clientX,e.clientY);l&&(t[o.entity]={x:l.x,y:l.y,frame:"home"});continue}const l=this._homeAnchorFitFor(o,this._wrapAspect(this._baseHeightFor(o)));if(l){const s=this._clickToHomeAnchorPx(l.fit,l.dims,this._wrapAspect(this._baseHeightFor(o)),e.clientX,e.clientY);s&&(t[o.entity]={x:s.x,y:s.y,frame:"home"});continue}const h=this._clickToContent(o,e.clientX,e.clientY);h&&(t[o.entity]={x:this._clampPct(h.x),y:this._clampPct(h.y)})}return this._pinPending=Object.keys(t).length?t:null,this._mapMode="normal",void(this._modeEntity=null)}const o=this._homeFrameCropFor(t),s=o?null:this._homeAnchorFitFor(t,this._wrapAspect(this._baseHeightFor(t))),l=!!o||!!s,h=o?this._clickToHomePx(o,e.clientX,e.clientY):s?this._clickToHomeAnchorPx(s.fit,s.dims,this._wrapAspect(this._baseHeightFor(t)),e.clientX,e.clientY):this._clickToContent(t,e.clientX,e.clientY);this._dbg=h?l?"goto (home) "+h.x.toFixed(1)+"px, "+h.y.toFixed(1)+"px":"goto "+h.x.toFixed(1)+"%, "+h.y.toFixed(1)+"%":"(map element not found)",h&&this._call("anyvac","goto",l?{entity_id:t.entity,frame:"home",x_home_px:h.x,y_home_px:h.y}:{entity_id:t.entity,x_pct:this._clampPct(h.x),y_pct:this._clampPct(h.y)}),this._mapMode="normal",this._modeEntity=null}_mapRotationDeg(){return this._config.layout?this._mapRegW<=4||this._mapRegH<=4?0:(this._narrow?90:0)+(this._flipEff?180:0):this._narrow?90:0}_unrotateDelta(t,e){const o=(this._mapRotationDeg()%360+360)%360;if(!o)return{dx:t,dy:e};const s=o*Math.PI/180,l=Math.cos(s),h=Math.sin(s);return{dx:l*t+h*e,dy:-h*t+l*e}}_wrapPct(t,e,o){const s=t.getBoundingClientRect(),l=this._unrotateDelta(e-(s.left+s.right)/2,o-(s.top+s.bottom)/2),h=t.offsetWidth||1,d=t.offsetHeight||1;return{x:100*(l.dx/h+.5),y:100*(l.dy/d+.5)}}_wrapPoint(t,e,o){const s=t.getBoundingClientRect(),l=(s.left+s.right)/2,h=(s.top+s.bottom)/2,d=(e/100-.5)*(t.offsetWidth||1),p=(o/100-.5)*(t.offsetHeight||1),u=(this._mapRotationDeg()%360+360)%360;if(!u)return{x:l+d,y:h+p};const m=u*Math.PI/180,_=Math.cos(m),f=Math.sin(m);return{x:l+(_*d-f*p),y:h+(f*d+_*p)}}_clickToContent(t,e,o){const s=this._mapEntityFor(t)?this.renderRoot?.querySelector(`.map-img[data-entity="${t.entity.replace(/"/g,'\\"')}"]`):null;if(!s)return null;const l=s.getBoundingClientRect(),h=(l.left+l.right)/2,d=(l.top+l.bottom)/2,p=getComputedStyle(s).transform,u=new DOMMatrix("none"===p?void 0:p),m=u.a*u.d-u.b*u.c;if(Math.abs(m)<1e-9)return null;const _=this._unrotateDelta(e-h,o-d),f=(u.d*_.dx-u.c*_.dy)/m,v=(-u.b*_.dx+u.a*_.dy)/m;return{x:100*(f/(s.offsetWidth||1)+.5),y:100*(v/(s.offsetHeight||1)+.5)}}_clickToHomePx(t,e,o){const s=this._clickToImageBasePct(e,o);return s?pctToCropPoint(s,t):null}_clickToImageBasePct(t,e){const o=this.renderRoot?.querySelector(".image-base-img");if(!o)return null;const s=o.getBoundingClientRect(),l=(s.left+s.right)/2,h=(s.top+s.bottom)/2,d=getComputedStyle(o).transform,p=new DOMMatrix("none"===d?void 0:d),u=p.a*p.d-p.b*p.c;if(Math.abs(u)<1e-9)return null;const m=this._unrotateDelta(t-l,e-h),_=(p.d*m.dx-p.c*m.dy)/u,f=(-p.b*m.dx+p.a*m.dy)/u;return{x:100*(_/(o.offsetWidth||1)+.5),y:100*(f/(o.offsetHeight||1)+.5)}}_clickToHomeAnchorPx(t,e,o,s,l){const h=this._clickToImageBasePct(s,l);return h?function unprojectPctThroughFit(t,e,o,s){const l=t.x/100,h=t.y/100/s,d=o.scale/100,p=o.rotation*le,u=Math.cos(p),m=Math.sin(p),_=l-(50+o.offset_x)/100,f=h-(50+o.offset_y)/100/s,v=(-m*_+u*f)/d;return{x:(u*_+m*f)/d*e.NW+e.NW/2,y:v*e.NW+e.NH/2}}(h,e,t,o):null}_onZoneDown(t,e){if(!(!!this._zoneRectShown&&this._hasZoneEditTarget(t)||"zone"===this._mapMode&&this._isModeCandidate(t)))return;const o=e.currentTarget;o.setPointerCapture?.(e.pointerId);const{x:s,y:l}=this._wrapPct(o,e.clientX,e.clientY);if(this._zoneRectShown){const t=this._zoneHit(this._zoneRectShown,s,l);if(t){const e=this._zoneRectShown,o=Math.min(e.x0,e.x1),h=Math.max(e.x0,e.x1),d=Math.min(e.y0,e.y1),p=Math.max(e.y0,e.y1);return this._zoneRectShown={x0:o,y0:d,x1:h,y1:p},void(this._zoneEdit="move"===t?{type:"move",offsetX:s-o,offsetY:l-d,width:h-o,height:p-d}:{type:t})}if("zone"!==this._mapMode)return}this._zonePending=null,this._zoneRectShown=null,this._zoneEdit=null,this._zoneMulti="*"===this._modeEntity&&"merged"===this._config.map_mode,this._zoneDrag={x0:s,y0:l,x1:s,y1:l}}_onZoneMove(t,e){if(this._zoneEdit&&this._zoneRectShown){const t=e.currentTarget,{x:o,y:s}=this._wrapPct(t,e.clientX,e.clientY),l=3,h=this._zoneEdit;if("move"===h.type){const{offsetX:t,offsetY:e,width:l,height:d}=h,p=Math.min(100-l,Math.max(0,o-t)),u=Math.min(100-d,Math.max(0,s-e));this._zoneRectShown={x0:p,y0:u,x1:p+l,y1:u+d}}else{let{x0:t,y0:e,x1:d,y1:p}=this._zoneRectShown;const u=this._clampPct(o),m=this._clampPct(s);"nw"===h.type?(t=Math.min(u,d-l),e=Math.min(m,p-l)):"ne"===h.type?(d=Math.max(u,t+l),e=Math.min(m,p-l)):"sw"===h.type?(t=Math.min(u,d-l),p=Math.max(m,e+l)):(d=Math.max(u,t+l),p=Math.max(m,e+l)),this._zoneRectShown={x0:t,y0:e,x1:d,y1:p}}return}if(!this._zoneDrag||"zone"!==this._mapMode||!this._isModeCandidate(t))return;const o=e.currentTarget,s=this._wrapPct(o,e.clientX,e.clientY);this._zoneDrag={x0:this._zoneDrag.x0,y0:this._zoneDrag.y0,x1:s.x,y1:s.y}}_onZoneUp(t,e){const o=e.currentTarget;if(this._zoneEdit)return this._zoneEdit=null,void this._commitZoneRect(t,o);if(!this._zoneDrag||"zone"!==this._mapMode||!this._isModeCandidate(t))return;const s=Math.abs(this._zoneDrag.x1-this._zoneDrag.x0)>2||Math.abs(this._zoneDrag.y1-this._zoneDrag.y0)>2;if(this._zoneRectShown=s?this._zoneDrag:null,this._zoneDrag=null,!s)return;this._zoneMulti&&(this._mapMode="normal",this._modeEntity=null),this._commitZoneRect(t,o)}_commitZoneRect(t,e){const o=this._zoneRectShown;if(!o)return;const s=this._wrapPoint(e,Math.min(o.x0,o.x1),Math.min(o.y0,o.y1)),l=this._wrapPoint(e,Math.max(o.x0,o.x1),Math.max(o.y0,o.y1)),h=s.x,d=s.y,p=l.x,u=l.y;if(this._zoneMulti){const t={};for(const e of this._modeCandidates()){const o=this._homeFrameCropFor(e);if(o){const s=this._clickToHomePx(o,h,d),l=this._clickToHomePx(o,p,u);s&&l&&(t[e.entity]={x1:Math.min(s.x,l.x),y1:Math.min(s.y,l.y),x2:Math.max(s.x,l.x),y2:Math.max(s.y,l.y),frame:"home"});continue}const s=this._wrapAspect(this._baseHeightFor(e)),l=this._homeAnchorFitFor(e,s);if(l){const o=this._clickToHomeAnchorPx(l.fit,l.dims,s,h,d),m=this._clickToHomeAnchorPx(l.fit,l.dims,s,p,u);o&&m&&(t[e.entity]={x1:Math.min(o.x,m.x),y1:Math.min(o.y,m.y),x2:Math.max(o.x,m.x),y2:Math.max(o.y,m.y),frame:"home"});continue}const m=this._clickToContent(e,h,d),_=this._clickToContent(e,p,u);m&&_&&(t[e.entity]={x1:this._clampPct(Math.min(m.x,_.x)),y1:this._clampPct(Math.min(m.y,_.y)),x2:this._clampPct(Math.max(m.x,_.x)),y2:this._clampPct(Math.max(m.y,_.y))})}return void(this._zonePending=Object.keys(t).length?t:null)}const m=this._homeFrameCropFor(t);if(m){const e=this._clickToHomePx(m,h,d),o=this._clickToHomePx(m,p,u);return void(e&&o&&(this._zonePending={[t.entity]:{x1:Math.min(e.x,o.x),y1:Math.min(e.y,o.y),x2:Math.max(e.x,o.x),y2:Math.max(e.y,o.y),frame:"home"}}))}const _=this._wrapAspect(this._baseHeightFor(t)),f=this._homeAnchorFitFor(t,_);if(f){const e=this._clickToHomeAnchorPx(f.fit,f.dims,_,h,d),o=this._clickToHomeAnchorPx(f.fit,f.dims,_,p,u);return void(e&&o&&(this._zonePending={[t.entity]:{x1:Math.min(e.x,o.x),y1:Math.min(e.y,o.y),x2:Math.max(e.x,o.x),y2:Math.max(e.y,o.y),frame:"home"}}))}const v=this._clickToContent(t,h,d),b=this._clickToContent(t,p,u);v&&b&&(this._zonePending={[t.entity]:{x1:this._clampPct(Math.min(v.x,b.x)),y1:this._clampPct(Math.min(v.y,b.y)),x2:this._clampPct(Math.max(v.x,b.x)),y2:this._clampPct(Math.max(v.y,b.y))}})}_confirmZone(t){const e=this._zonePending?.[t.entity];if(!e)return;const o=t.clean_action;if(this._call("anyvac","zone_clean","home"===e.frame?{entity_id:t.entity,frame:"home",x1_home_px:e.x1,y1_home_px:e.y1,x2_home_px:e.x2,y2_home_px:e.y2,repeat:o?.repeat??1}:{entity_id:t.entity,x1_pct:e.x1,y1_pct:e.y1,x2_pct:e.x2,y2_pct:e.y2,repeat:o?.repeat??1}),this._zonePending){const e={...this._zonePending};delete e[t.entity],this._zonePending=Object.keys(e).length?e:null,this._zonePending||(this._zoneRectShown=null)}this._zoneDrag=null,this._zoneEdit=null,this._mapMode="normal",this._modeEntity=null}_confirmPin(t){const e=this._pinPending?.[t.entity];if(e&&(this._call("anyvac","goto","home"===e.frame?{entity_id:t.entity,frame:"home",x_home_px:e.x,y_home_px:e.y}:{entity_id:t.entity,x_pct:e.x,y_pct:e.y}),this._pinPending)){const e={...this._pinPending};delete e[t.entity],this._pinPending=Object.keys(e).length?e:null}}_cancelPin(){this._pinPending=null}_cancelZone(){this._zonePending=null,this._zoneDrag=null,this._zoneRectShown=null,this._zoneEdit=null}_renderMetaBar(t){const e=t.filter(t=>this._mapEntityFor(t));if(!e.length){const e=this._renderHero(t);return e===Ht?Ht:zt`<div class="meta-bar">${e}</div>`}const o=this._modeCandidates().length>0,s=o?"":"Requires the AnyVac integration (≥ 0.18) + map entity",l="*"===this._modeEntity?this._mapMode:"normal",h=this._allRoomKeys().filter(e=>this._isRoomSelectedAny(e,t)),d=h.length?h:this._allRoomKeys(),p=t.some(t=>this._intAttrs(t));p&&d.length&&this._fetchPlan(d,this._planMode);const u=p?this._planPreview?.unsequenced??[]:[],m=this._unassignedRooms(d,this._planMode,p),_=this._pinPending?Object.keys(this._pinPending).length:0,f=this._zonePending?Object.keys(this._zonePending).length:0;return zt`
      <div class="meta-bar">
        ${this._renderHero(t)}
        <div class="meta-bar-cluster">
          <button class="mtbtn ${"pin"===l?"on":""}" ?disabled=${!o}
            @click=${()=>this._armMode("pin")} title=${s||"Pin & Go"}>
            <ha-icon icon="mdi:map-marker-radius"></ha-icon><span>Pin &amp; Go</span>
          </button>
          <button class="mtbtn ${"zone"===l?"on":""}" ?disabled=${!o}
            @click=${()=>this._armMode("zone")} title=${s||"Zone clean"}>
            <ha-icon icon="mdi:select-drag"></ha-icon><span>Zone</span>
          </button>
        </div>
        <div class="meta-bar-spacer"></div>
        <div class="meta-bar-cluster meta-bar-cluster--right">
          ${m.length?zt`<span class="mtbtn mtbtn--stat mtbtn--err"
              title="${m.length} selected room${m.length>1?"s have":" has"} no available robot for the ${this._planMode} pass — it/they will be silently skipped. Check vacuum roles/config.">
            <ha-icon icon="mdi:robot-off"></ha-icon><b>${m.length}</b>
          </span>`:Ht}
          ${u.length?zt`<span class="mtbtn mtbtn--stat mtbtn--warn"
              title="${u.length} selected room${u.length>1?"s have":" has"} no cleaning order set — the time may be off. Set the order in the card editor's Global tab.">
            <ha-icon icon="mdi:sort-variant-off"></ha-icon><b>${u.length}</b>
          </span>`:Ht}
          ${this._renderLayerToggleCompact(t)}
          ${this._config.layout?zt`<button class="mtbtn ${this._flipEff?"on":""}"
              title="Flip map 180° for this screen (this session only — the card editor's Layout section sets a permanent default)"
              @click=${()=>this._toggleFlipLive()}>
            <ha-icon icon="mdi:flip-vertical"></ha-icon>
          </button>`:Ht}
          ${(()=>{const e=this._alignCandidates(t);return e.length?zt`<button class="mtbtn" title="Align — full-screen manual floorplan seating"
                @click=${()=>this._requestVisualEditor(e[0])}>
              <ha-icon icon="mdi:vector-square-edit"></ha-icon>
            </button>`:Ht})()}
          <div class="meta-bar-divider"></div>
          <button class="mtbtn mtbtn--ghost" title="Refresh maps" @click=${t=>{const o=t.currentTarget;o.classList.remove("mtbtn--spin"),o.offsetWidth,o.classList.add("mtbtn--spin");for(const t of e)this._refreshMap(t)}}>
            <ha-icon icon="mdi:refresh"></ha-icon>
          </button>
        </div>
      </div>
      ${f?zt`<div class="calib-panel">
          <div>Zone ready for ${f} vacuum${f>1?"s":""} — drag the box or its corners to adjust, then pick one on its status card below.</div>
          <div class="calib-actions"><button class="mtbtn" @click=${()=>this._cancelZone()}>Cancel</button></div>
        </div>`:"zone"===l?zt`<div class="calib-panel">Drag a rectangle on the map to set a cleaning zone.</div>`:Ht}
      ${_?zt`<div class="calib-panel">
          <div>Pin ready for ${_} vacuum${_>1?"s":""} — pick one on its status card below.</div>
          <div class="calib-actions"><button class="mtbtn" @click=${()=>this._cancelPin()}>Cancel</button></div>
        </div>`:"pin"===l?zt`<div class="calib-panel">Tap the map to drop a pin.</div>`:Ht}
    `}_renderMapTools(t){if(!t.map&&!t.image_base&&!this._mapEntityFor(t))return Ht;const e=this._mapEntityFor(t),o=!!this._intAttrs(t)&&!!e,s=o?"":"Requires the AnyVac integration (≥ 0.18) + map entity",l=this._modeEntity===t.entity?this._mapMode:"normal";return zt`
      <div class="map-tools">
        ${this._config.layout&&this._config.vacuums.length>1?zt`<span class="map-tools-label">${t.name??t.entity}</span>`:Ht}
        ${e?zt`<button class="mtbtn" @click=${()=>this._refreshMap(t)} title="Refresh map">
          <ha-icon icon="mdi:refresh"></ha-icon><span>Refresh</span>
        </button>`:Ht}
        <button class="mtbtn ${"pin"===l?"on":""}" ?disabled=${!o}
          @click=${()=>this._toggleMode(t.entity,"pin")} title=${s||"Pin & Go"}>
          <ha-icon icon="mdi:map-marker-radius"></ha-icon><span>Pin &amp; Go</span>
        </button>
        <button class="mtbtn ${"zone"===l?"on":""}" ?disabled=${!o}
          @click=${()=>this._toggleMode(t.entity,"zone")} title=${s||"Zone clean"}>
          <ha-icon icon="mdi:select-drag"></ha-icon><span>Zone</span>
        </button>
        ${!this._dbg||!this._config.debug&&this._config.layout?Ht:zt`<span style="font-size:var(--avc-th-fs-xs,11px);opacity:0.65;align-self:center;font-family:monospace">${this._dbg}</span>`}
      </div>
      ${"pin"===l?zt`<div class="calib-panel">Tap the map to send the robot there.</div>`:Ht}
      ${"zone"===l?zt`<div class="calib-panel">
        ${this._zonePending?.[t.entity]?zt`<div>Clean this zone? Drag the box or its corners to adjust.</div>
              <div class="calib-actions">
                <button class="mtbtn on" @click=${()=>this._confirmZone(t)}>Clean zone</button>
                <button class="mtbtn" @click=${()=>this._cancelZone()}>Cancel</button>
              </div>`:zt`Drag a rectangle on the map to set a cleaning zone.`}
      </div>`:Ht}
    `}_baseHeightFor(t){return"merged"===this._config.map_mode?this._config.base_height??this._config.vacuums.find(t=>t.base_height)?.base_height:t.base_height}_wrapAspect(t){return"number"==typeof t&&t>0&&this._cardW>0?Math.max(.2,(this._cardW-16)/t):this._mapAR>.1?this._mapAR:3.636}_effectiveSeat(t){this._memoSync();const e=this._seatMemo.get(t.entity);if(e)return e;const o=resolveSeat(this._config,t,this._intAttrs(t),this._wrapAspect(this._baseHeightFor(t)));return this._seatMemo.set(t.entity,o),o}_alignCandidates(t){return!1===this._config.visual_editor_mode?[]:t.filter(t=>!!resolveImageBaseSrc(this._config,t)&&!!this._intAttrs(t))}_alignVac(){const t=this._alignSession;return t?this._config.vacuums.find(e=>e.entity===t.vacuum):void 0}_veFitsScreen(){try{if(window.innerWidth<760)return!1;const t=window.matchMedia?.bind(window);return!t||t("(any-pointer: fine)").matches}catch{return!0}}_requestVisualEditor(t){this._veFitsScreen()?this._openAlign(t):this._veNotice=t}_renderVeNotice(){const t=this._veNotice;if(!t)return Ht;const close=()=>{this._veNotice=null};return zt`
      <div class="robot-sheet-scrim" @click=${close}></div>
      <div class="robot-sheet ve-notice" role="dialog" aria-modal="true" aria-label="Visual editor"
        @keydown=${t=>{"Escape"===t.key&&close()}}>
        <span class="robot-sheet-grip" aria-hidden="true"></span>
        <div class="ve-notice-head">
          <ha-icon icon="mdi:monitor-screenshot"></ha-icon>
          <span class="robot-sheet-name">Made for a bigger screen</span>
        </div>
        <p class="ve-notice-text">The Visual editor is precise mouse work — aligning maps, dragging room
          corners, typing exact values. Open this dashboard on a computer to use it.</p>
        <div class="robot-sheet-foot">
          <button class="mtbtn ve-notice-anyway" @click=${()=>{close(),this._openAlign(t)}}>
            <ha-icon icon="mdi:open-in-new"></ha-icon><span>Open anyway</span></button>
          <button class="mtbtn on ve-notice-ok" @click=${close}><span>OK</span></button>
        </div>
      </div>`}_openAlign(t){if(this._alignSession)return;const e=resolveImageBaseSrc(this._config,t);if(!e||!this._intAttrs(t))return;const o=this._effectiveSeat(t),s={rotation:o.rotation,scale:o.scale,scaleY:o.scaleY,offset_x:o.offset_x,offset_y:o.offset_y},l=effectiveAppearance(t),h=resolveImageBaseSrc(this._rawConfig??this._config,t)??e;this._alignSession={vacuum:t.entity,floorplan:e,floorplanKey:h,start:{...s},draft:{...s},history:[],future:[],appearanceStart:{...l},appearanceDraft:{...l},layers:{floor:1,rawMap:1,dry:!0,wet:!0,rooms:!0,staticRooms:!0,others:!0},snap90:!1,nudgeTier:"normal"},this._alignView={zoom:1,panX:0,panY:0,rot:0},this._alignGesture=null,this._roomsSession=null,this._roomsGesture=null,this._roomsDrawGesture=null,this._roomsDeleteConfirm=null,this._floorplanSession=null,this._floorGesture=null,this._resetFloorplanSubmodes(),this._veToolSwitchTarget=null,this._veTool=this._loadVeTool(),"rooms"===this._veTool?this._openRooms():"floorplan"===this._veTool&&this._openFloorplan(),requestAnimationFrame(()=>this._alignRefocusOverlay())}_alignRefocusOverlay(){const t=this._alignHost?.shadowRoot?.querySelector(".align-overlay");t?.focus()}_closeAlign(){this._alignSession=null,this._alignGesture=null,this._alignCancelConfirm=!1,this._roomsSession=null,this._roomsGesture=null,this._roomsDrawGesture=null,this._roomsDeleteConfirm=null,this._floorplanSession=null,this._floorGesture=null,this._resetFloorplanSubmodes(),this._veToolSwitchTarget=null}_resetFloorplanSubmodes(){this._floorplanMode="geo",this._floorCalib=null,this._floorCalibRefNat=null,this._floorCalibResult=null,this._floorCalibError="",this._homeCalib=null,this._homeCalibBusy=!1,this._homeCalibError="",this._homeCalibResult=null,this._homeCalibSnapshotUrl="",this._homeCalibCrop=null,this._homeCalibFrameId="",this._fiducialSnapshotBusy=!1,this._fiducialSnapshotError="",this._fiducialSnapshotPath="",this._fiducialKnown=null,this._fiducialDetectBusy=!1,this._fiducialDetectError="",this._fiducialDetectResult=null,this._floorplanSnapshotBusy=!1,this._floorplanSnapshotError="",this._homeFrameSnapshotBusy=!1,this._homeFrameSnapshotError="",this._guideExportBusy=!1,this._guideExportError="",this._guideExportResult=null,this._placeRoomsResult=null,this._recropDraft={rotation:0,scale:100,offset_x:0,offset_y:0},this._recropHistory=[],this._recropFuture=[],this._recropGesture=null,this._recropNat=null}_alignReadOnly(){const t=this._alignVac();return!!t&&!!this._homeFrameCropFor(t)}_alignHasChanges(){const t=this._alignSession;if(!t)return!1;const e=t.draft,o=t.start;if(e.rotation!==o.rotation||e.scale!==o.scale||(e.scaleY??null)!==(o.scaleY??null)||e.offset_x!==o.offset_x||e.offset_y!==o.offset_y)return!0;const s=t.appearanceDraft,l=t.appearanceStart;return Object.keys(s).some(t=>(s[t]??null)!==(l[t]??null))}_alignCancel(){this._alignHasChanges()||this._roomsHasUnsavedChanges()||this._floorplanHasChanges()?(this._veToolSwitchTarget=null,this._alignCancelConfirm=!0):this._closeAlign()}_alignConfirmDiscard(){const t=this._veToolSwitchTarget;if(t){if("seat"===this._veTool&&this._alignSession){const t=this._alignSession;this._alignSession={...t,draft:{...t.start},appearanceDraft:{...t.appearanceStart},history:[],future:[]}}else"rooms"===this._veTool?this._roomsSession=null:"floorplan"===this._veTool&&(this._floorplanSession=null,this._resetFloorplanSubmodes());this._veTool=t,this._saveVeTool(t),this._veToolSwitchTarget=null,this._alignCancelConfirm=!1,"rooms"!==t||this._roomsSession||this._openRooms(),"floorplan"!==t||this._floorplanSession||this._openFloorplan()}else this._closeAlign()}_alignDismissCancelConfirm(){this._alignCancelConfirm=!1,this._veToolSwitchTarget=null}_alignReset(){const t=this._alignSession;t&&!this._alignReadOnly()&&(this._alignSession={...t,draft:{...t.start},history:[...t.history,t.draft],future:[],appearanceDraft:{...t.appearanceStart}})}async _alignCopyYaml(){const t=this._alignSession;if(!t)return;const e=function seatToYaml(t,e){const r2=t=>Math.round(100*t)/100,o=["map:",'  seat: "manual"',`  rotation: ${r2(t.rotation)}`,`  scale: ${r2(t.scale)}`];if(null!=t.scaleY&&o.push(`  scale_y: ${r2(t.scaleY)}`),o.push(`  offset_x: ${r2(t.offset_x)}`,`  offset_y: ${r2(t.offset_y)}`),e){const yamlVal=t=>void 0===t?null:null===t?"null":"string"==typeof t?`"${t}"`:String(t),t=["hide_map","overlay_opacity","overlay_blend","path_color","path_width","mop_path_color","mop_band_opacity","mop_band_width","robot_image_on_map","robot_size","robot_image_rotation"].map(t=>[t,yamlVal(e[t])]).filter(([,t])=>null!==t).map(([t,e])=>`  ${t}: ${e}`);t.length&&o.push("","appearance:",...t)}return o.join("\n")}(t.draft,t.appearanceDraft);try{await navigator.clipboard.writeText(e),this._alignCopiedFlash=!0,setTimeout(()=>{this._alignCopiedFlash=!1},1500)}catch(t){console.warn("[anyvac-card] Align: clipboard write failed",t)}}_alignServiceAvailable(){return!!this.hass.services?.anyvac?.set_floorplan_seat}async _alignSave(){const t=this._alignSession,e=this._alignVac();if(!t||!e||!this._alignServiceAvailable()||this._alignReadOnly())return;const o=t.draft,s={rotation:Math.round(100*o.rotation)/100,scale:Math.round(100*o.scale)/100,offset_x:Math.round(100*o.offset_x)/100,offset_y:Math.round(100*o.offset_y)/100};null!=o.scaleY&&(s.scale_y=Math.round(100*o.scaleY)/100);const l={...t.appearanceDraft};try{await this.hass.callService("anyvac","set_floorplan_seat",{floorplan:t.floorplanKey,vacuum:e.entity,map:s,appearance:l}),this._closeAlign()}catch(t){console.warn("[anyvac-card] Align: set_floorplan_seat call failed",t)}}_alignSetField(t,e){const o=this._alignSession;if(!o||this._alignReadOnly())return;const s=parseFloat(e);if(!Number.isFinite(s))return;const l=o.draft;if(l[t]===s)return;const h={...l,[t]:s};this._alignSession={...o,draft:h,history:[...o.history,l],future:[]}}_alignToggleScaleY(t){const e=this._alignSession;if(!e||this._alignReadOnly())return;const o=e.draft,s={...o};t?null==s.scaleY&&(s.scaleY=s.scale):delete s.scaleY,this._alignSession={...e,draft:s,history:[...e.history,o],future:[]}}_alignSetLayerOpacity(t,e){const o=this._alignSession;if(!o)return;const s=parseFloat(e);if(!Number.isFinite(s))return;const l=Math.min(1,Math.max(0,s/100));o.layers[t]!==l&&(this._alignSession={...o,layers:{...o.layers,[t]:l}})}_alignSceneSize(){const t=this._mapAR>.1?this._mapAR:3.636,e=Math.max(100,window.innerWidth-32),o=Math.max(100,window.innerHeight-140);let s=e,l=s/t;return l>o&&(l=o,s=l*t),{w:s,h:l}}_alignViewTransformCss(){const t=this._alignView;return`translate(${t.panX}px,${t.panY}px) scale(${t.zoom}) rotate(${t.rot}deg)`}_alignRotateView(){this._alignView={...this._alignView,rot:(this._alignView.rot+90)%360}}_alignPointToWrapPct(t,e){const o=this._alignHost?.shadowRoot?.querySelector(".align-scene");if(!o)return null;const s=o.getBoundingClientRect(),l=(s.left+s.right)/2,h=(s.top+s.bottom)/2,d=getComputedStyle(o).transform,p=new DOMMatrix("none"===d?void 0:d),u=p.a*p.d-p.b*p.c;if(Math.abs(u)<1e-9)return null;const m=t-l,_=e-h,f=(p.d*m-p.c*_)/u,v=(-p.b*m+p.a*_)/u;return{x:100*(f/(o.offsetWidth||1)+.5),y:100*(v/(o.offsetHeight||1)+.5)}}_alignCornerPct(t,e,o,s,l){const h=function seatToMatrix(t,e,o,s,l){const h=(50+t.offset_x)/100*e,d=(50+t.offset_y)/100*o,p=t.scale/100*(e/s),u=(t.scaleY??t.scale)/100*(e/s);return(new DOMMatrix).translate(h,d).rotate(t.rotation).scale(p,u).translate(-s/2,-.5)}(t,s,l,1),d=h.transformPoint({x:e,y:o});return{x:d.x/s*100,y:d.y/l*100}}_alignResizeCursor(t,e){const o=((t+e)%180+180)%180;return o<22.5||o>=157.5?"ew-resize":o<67.5?"nwse-resize":o<112.5?"ns-resize":"nesw-resize"}_alignFieldArrow(t,e){return zt`<ha-icon class="align-field-arrow" icon=${t?"mdi:arrow-left-right":"mdi:arrow-up-down"}
      style=${Yt({transform:"rotate("+e+"deg)"})}></ha-icon>`}_alignIsoDist(t,e,o){return Math.hypot(t.x-e.x,(t.y-e.y)/o)}_alignIsoAngleDeg(t,e,o){return 180*Math.atan2((e.y-t.y)/o,e.x-t.x)/Math.PI}_alignStartGesture(t,e,o){const s=this._alignSession;if(!s||this._alignReadOnly())return;this._alignRefocusOverlay(),t.currentTarget.setPointerCapture(t.pointerId),t.stopPropagation(),t.preventDefault();const l=this._alignPointToWrapPct(t.clientX,t.clientY);if(!l)return;const h=this._alignGesture;if(h&&1===h.startPos.size&&!h.startPos.has(t.pointerId)){const[[e,o]]=h.startPos;return void(this._alignGesture={kind:"pinch",startSeat:{...s.draft},startPos:new Map([[e,h.livePos.get(e)??o],[t.pointerId,l]]),livePos:new Map([[e,h.livePos.get(e)??o],[t.pointerId,l]])})}this._alignPushHistory(s.draft),this._alignGesture={kind:e,startSeat:{...s.draft},pivotPct:o,startPos:new Map([[t.pointerId,l]]),livePos:new Map([[t.pointerId,l]])}}_alignGestureMove(t){const e=this._alignSession,o=this._alignGesture;if(!e||!o||!o.startPos.has(t.pointerId))return;const s=this._alignPointToWrapPct(t.clientX,t.clientY);if(!s)return;o.livePos.set(t.pointerId,s);const l=this._mapAR>.1?this._mapAR:3.636;let h=null;if("drag"===o.kind){const e=t.pointerId,s=o.startPos.get(e),l=o.livePos.get(e);h=translateSeat(o.startSeat,l.x-s.x,l.y-s.y)}else if("scale"===o.kind&&o.pivotPct){const e=t.pointerId,s=o.startPos.get(e),d=o.livePos.get(e);if(null!=o.startSeat.scaleY)h=function scaleSeatCornerAniso(t,e,o,s,l){const h=pctToFrac(s,l),d=pctToFrac(e,l),p=pctToFrac(o,l),u=rotatePoint({x:d.x-h.x,y:d.y-h.y},-t.rotation),m=rotatePoint({x:p.x-h.x,y:p.y-h.y},-t.rotation),_=Math.abs(u.x)>1e-6?m.x/u.x:1,f=Math.abs(u.y)>1e-6?m.y/u.y:1,v=seatCentreFrac(t,l),b=rotatePoint({x:v.x-h.x,y:v.y-h.y},-t.rotation),w=rotatePoint({x:b.x*_,y:b.y*f},t.rotation),$=frameToOffset({x:h.x+w.x,y:h.y+w.y},l),C=t.scaleY??t.scale;return{...t,scale:t.scale*_,scaleY:C*f,offset_x:$.offset_x,offset_y:$.offset_y}}(o.startSeat,s,d,o.pivotPct,l);else{const t=this._alignIsoDist(s,o.pivotPct,l),e=this._alignIsoDist(d,o.pivotPct,l);t>1e-6&&(h=scaleSeatAbout(o.startSeat,e/t,o.pivotPct,l))}}else if("stretchY"===o.kind){const e=t.pointerId,s=o.startPos.get(e),d=o.livePos.get(e);h=function stretchSeatY(t,e){const o=t.scaleY??t.scale;return{...t,scaleY:o*e}}(o.startSeat,localAxisScaleRatio(o.startSeat,"y",s,d,l))}else if("stretchX"===o.kind){const e=t.pointerId,s=o.startPos.get(e),d=o.livePos.get(e);h=function stretchSeatX(t,e){const o=t.scaleY??t.scale;return{...t,scale:t.scale*e,scaleY:o}}(o.startSeat,localAxisScaleRatio(o.startSeat,"x",s,d,l))}else if("rotate"===o.kind&&o.pivotPct){const e=t.pointerId,s=o.startPos.get(e),d=o.livePos.get(e),p=this._alignIsoAngleDeg(o.pivotPct,s,l),u=this._alignIsoAngleDeg(o.pivotPct,d,l);h=rotateSeatAbout(o.startSeat,u-p,o.pivotPct,l)}else if("pinch"===o.kind&&2===o.startPos.size){const t=[...o.startPos.keys()],e=o.startPos.get(t[0]),s=o.startPos.get(t[1]),d=o.livePos.get(t[0]),p=o.livePos.get(t[1]);h=pinchSeat(o.startSeat,e,s,d,p,l)}h&&(this._alignSession={...e,draft:h})}_alignGestureEnd(t){const e=this._alignGesture;if(e)if(e.startPos.delete(t.pointerId),e.livePos.delete(t.pointerId),0===e.startPos.size)this._alignGesture=null;else if("pinch"===e.kind&&1===e.startPos.size){const[[t,o]]=e.startPos,s=this._alignSession;this._alignGesture={kind:"drag",startSeat:s?{...s.draft}:e.startSeat,startPos:new Map([[t,o]]),livePos:new Map([[t,o]])}}}_alignPushHistory(t){const e=this._alignSession;e&&(this._alignSession={...e,history:[...e.history,t],future:[]})}_alignUndo(){const t=this._alignSession;if(!t||!t.history.length)return;const e=t.history[t.history.length-1];this._alignSession={...t,draft:e,history:t.history.slice(0,-1),future:[t.draft,...t.future]}}_alignRedo(){const t=this._alignSession;if(!t||!t.future.length)return;const e=t.future[0];this._alignSession={...t,draft:e,history:[...t.history,t.draft],future:t.future.slice(1)}}_alignSetNudgeTier(t){const e=this._alignSession;e&&(this._alignSession={...e,nudgeTier:t})}_veToolHasUnsavedChanges(t){return"seat"===t?this._alignHasChanges():"rooms"===t?this._roomsHasUnsavedChanges():"floorplan"===t&&this._floorplanHasChanges()}_setVeTool(t){if(this._veTool!==t){if(this._veToolHasUnsavedChanges(this._veTool))return this._veToolSwitchTarget=t,void(this._alignCancelConfirm=!0);this._veTool=t,this._saveVeTool(t),"rooms"!==t||this._roomsSession||this._openRooms(),"floorplan"!==t||this._floorplanSession||this._openFloorplan()}}_alignEffectiveNudgeTier(t){return t.ctrlKey||t.metaKey?"fine":t.shiftKey?"jump":this._alignSession?.nudgeTier??"normal"}_alignKeyDown(t){if("floorplan"===this._veTool)return void this._floorplanKeyDown(t);const e=this._alignSession;if(!e)return;const o=t.target,s=!!o&&("INPUT"===o.tagName||"TEXTAREA"===o.tagName);if("Escape"===t.key)return t.preventDefault(),void this._alignCancel();const l=t.ctrlKey||t.metaKey;if(l&&!t.shiftKey&&!t.altKey&&("z"===t.key||"Z"===t.key)){if(s)return;return t.preventDefault(),void this._alignUndo()}if(l&&!t.shiftKey&&!t.altKey&&("y"===t.key||"Y"===t.key)){if(s)return;return t.preventDefault(),void this._alignRedo()}if(s&&t.key.startsWith("Arrow"))return;if(this._alignReadOnly())return;const h=nudgeTierMultiplier(this._alignEffectiveNudgeTier(t)),d=this._mapAR>.1?this._mapAR:3.636,p=e.draft;let u=null;switch(t.key){case"ArrowUp":u=nudgeOffset(p,0,-.1*h,this._alignView.rot,d);break;case"ArrowDown":u=nudgeOffset(p,0,.1*h,this._alignView.rot,d);break;case"ArrowLeft":u=nudgeOffset(p,-.1*h,0,this._alignView.rot,d);break;case"ArrowRight":u=nudgeOffset(p,.1*h,0,this._alignView.rot,d);break;case"[":u=nudgeRotation(p,-.5*h);break;case"]":u=nudgeRotation(p,.5*h);break;case",":u=nudgeScale(p,-.5*h);break;case".":u=nudgeScale(p,.5*h);break;default:return}t.preventDefault();const m=t.repeat?e.history:[...e.history,p];this._alignSession={...e,draft:u,history:m,future:[]}}_floorplanKeyDown(t){if("Escape"===t.key)return t.preventDefault(),void this._alignCancel();if("calib"===this._floorplanMode||"home"===this._floorplanMode)return;const e=this._floorplanSession;if(!e)return;const o=t.target,s=!!o&&("INPUT"===o.tagName||"TEXTAREA"===o.tagName),l=t.ctrlKey||t.metaKey;if(l&&!t.shiftKey&&!t.altKey&&("z"===t.key||"Z"===t.key)){if(s)return;return t.preventDefault(),void this._floorGeoUndo()}if(l&&!t.shiftKey&&!t.altKey&&("y"===t.key||"Y"===t.key)){if(s)return;return t.preventDefault(),void this._floorGeoRedo()}if(s&&t.key.startsWith("Arrow"))return;const h=nudgeTierMultiplier(this._alignEffectiveNudgeTier(t)),d=this._mapAR>.1?this._mapAR:3.636,p=e.draft;let u=null;switch(t.key){case"ArrowUp":u=nudgeOffset(p,0,-.1*h,this._alignView.rot,d);break;case"ArrowDown":u=nudgeOffset(p,0,.1*h,this._alignView.rot,d);break;case"ArrowLeft":u=nudgeOffset(p,-.1*h,0,this._alignView.rot,d);break;case"ArrowRight":u=nudgeOffset(p,.1*h,0,this._alignView.rot,d);break;case"[":u=nudgeRotation(p,-.5*h);break;case"]":u=nudgeRotation(p,.5*h);break;case",":u=nudgeScale(p,-.5*h);break;case".":u=nudgeScale(p,.5*h);break;default:return}t.preventDefault();const m=t.repeat?e.history:[...e.history,p];this._floorplanSession={...e,draft:u,history:m,future:[]}}_alignBgPointerDown(t){this._alignGesture||(this._alignRefocusOverlay(),t.currentTarget.setPointerCapture(t.pointerId),this._alignViewDrag={pointerId:t.pointerId,x0:t.clientX,y0:t.clientY,panX0:this._alignView.panX,panY0:this._alignView.panY})}_alignBgPointerMove(t){const e=this._alignViewDrag;e&&e.pointerId===t.pointerId&&(this._alignView={...this._alignView,panX:e.panX0+(t.clientX-e.x0),panY:e.panY0+(t.clientY-e.y0)})}_alignBgPointerUp(t){this._alignViewDrag?.pointerId===t.pointerId&&(this._alignViewDrag=null)}_alignWheel(t){t.preventDefault();const e=this._alignView.zoom,o=Math.exp(.001*-t.deltaY),s=Math.min(8,Math.max(.25,e*o)),l=this._alignHost?.shadowRoot?.querySelector(".align-scene");if(!l||s===e)return void(this._alignView={...this._alignView,zoom:s});const h=l.getBoundingClientRect(),d=(h.left+h.right)/2,p=(h.top+h.bottom)/2,u=s/e,m=this._alignView.panX+(t.clientX-d)*(1-u),_=this._alignView.panY+(t.clientY-p)*(1-u);this._alignView={...this._alignView,zoom:s,panX:m,panY:_}}_openRooms(){const t=this._alignSession,e=this._alignVac();if(!t||!e)return;const o="merged"===this._config.map_mode,s=resolveStaticRooms(this._rawConfig??this._config,e),l=new Set(s.filter(t=>t.key).map(t=>t.key)),h={};for(const t of this._roomsFor(e))null!=t.map_x&&null!=t.map_y&&null!=t.map_w&&null!=t.map_h&&(h[t.key]={x:t.map_x,y:t.map_y,w:t.map_w,h:t.map_h,areaId:t.area_id??null,isNew:!l.has(t.key)});const d=function effectiveRoomStyle(t){return{border_normal:t.room_border_normal??2,border_selected:t.room_border_selected??4}}(this._config);this._roomsSession={floorplan:t.floorplan,floorplanKey:t.floorplanKey,vacuum:o?void 0:e.entity,rooms:h,start:{...h},selected:null,history:[],future:[],styleStart:{...d},styleDraft:{...d},drawingNew:!1},this._roomsGesture=null,this._roomsDrawGesture=null,this._roomsDeleteConfirm=null}_roomsHasUnsavedChanges(){const t=this._roomsSession;return!!t&&(JSON.stringify(t.rooms)!==JSON.stringify(t.start)||JSON.stringify(t.styleDraft)!==JSON.stringify(t.styleStart))}_roomsSelect(t){const e=this._roomsSession;e&&(this._roomsSession={...e,selected:t})}_roomsPushHistory(t){const e=this._roomsSession;e&&(this._roomsSession={...e,history:[...e.history,t],future:[]})}_roomsUndo(){const t=this._roomsSession;if(!t||!t.history.length)return;const e=t.history[t.history.length-1];this._roomsSession={...t,rooms:e,history:t.history.slice(0,-1),future:[t.rooms,...t.future]}}_roomsRedo(){const t=this._roomsSession;if(!t||!t.future.length)return;const e=t.future[0];this._roomsSession={...t,rooms:e,history:[...t.history,t.rooms],future:t.future.slice(1)}}_roomsReset(){const t=this._roomsSession;t&&(this._roomsSession={...t,rooms:{...t.start},history:[...t.history,t.rooms],future:[],styleDraft:{...t.styleStart}})}_roomsSetAreaId(t,e){const o=this._roomsSession,s=o?.rooms[t];if(!o||!s)return;const l=""===e?null:e;s.areaId!==l&&(this._roomsSession={...o,rooms:{...o.rooms,[t]:{...s,areaId:l}},history:[...o.history,o.rooms],future:[]})}_roomsSetGeom(t,e,o){const s=this._roomsSession,l=s?.rooms[t],h=parseFloat(o);if(!s||!l||!Number.isFinite(h))return;const d="w"===e||"h"===e?Math.min(100,Math.max(1,h)):Math.min(100,Math.max(0,h));l[e]!==d&&(this._roomsSession={...s,rooms:{...s.rooms,[t]:{...l,[e]:d}},history:[...s.history,s.rooms],future:[]})}_roomDisplayName(t){const e=[...this._config.rooms??[],...this._config.vacuums.flatMap(t=>t.rooms??[])];return e.find(e=>e.key===t)?.name||t}_roomsSetStyle(t,e){const o=this._roomsSession;if(!o)return;const s=parseFloat(e);!Number.isFinite(s)||s<0||s>12||o.styleDraft[t]!==s&&(this._roomsSession={...o,styleDraft:{...o.styleDraft,[t]:s}})}_roomsArmDraw(){const t=this._roomsSession;t&&(this._roomsSession={...t,drawingNew:!t.drawingNew},this._roomsDrawGesture=null)}_roomsGenerateKey(t){let e=1;for(;t.rooms["new_room_"+e];)e++;return"new_room_"+e}_roomsStartGesture(t,e,o,s){const l=this._roomsSession,h=l?.rooms[e];if(!l||!h)return;this._alignRefocusOverlay(),t.currentTarget.setPointerCapture(t.pointerId),t.stopPropagation(),t.preventDefault();const d=this._alignPointToWrapPct(t.clientX,t.clientY);d&&(this._roomsPushHistory(l.rooms),this._roomsSession={...this._roomsSession,selected:e},this._roomsGesture={key:e,mode:o,corner:s,orig:{x:h.x,y:h.y,w:h.w,h:h.h},startPt:d})}_roomsGestureMove(t){const e=this._roomsSession,o=this._roomsGesture;if(!e||!o)return;const s=this._alignPointToWrapPct(t.clientX,t.clientY);if(!s)return;const l=s.x-o.startPt.x,h=s.y-o.startPt.y,d=e.rooms[o.key];if(!d)return;let p;if("move"===o.mode){const t=function moveRect(t,e,o){return{map_x:round1(clampPct(t.x+e)),map_y:round1(clampPct(t.y+o))}}(o.orig,l,h);p={x:t.map_x,y:t.map_y}}else{const t=function resizeRect(t,e,o,s){const l=t.w/2,h=t.h/2,{sx:d,sy:p}=he[e],u=t.x+d*l,m=t.y+p*h,_=t.x-d*l,f=t.y-p*h,v=u+o,b=m+s;return{map_x:round1(clampPct((v+_)/2)),map_y:round1(clampPct((b+f)/2)),map_w:round1(clampSize(Math.abs(v-_))),map_h:round1(clampSize(Math.abs(b-f)))}}(o.orig,o.corner,l,h);p={x:t.map_x,y:t.map_y,w:t.map_w,h:t.map_h}}this._roomsSession={...e,rooms:{...e.rooms,[o.key]:{...d,...p}}}}_roomsGestureEnd(){this._roomsGesture=null}_roomsCanvasPointerDown(t){const e=this._roomsSession;if(!e?.drawingNew)return void this._alignBgPointerDown(t);if(this._roomsGesture)return;const o=this._alignPointToWrapPct(t.clientX,t.clientY);o&&(this._alignRefocusOverlay(),t.currentTarget.setPointerCapture(t.pointerId),t.preventDefault(),this._roomsDrawGesture={startPt:o,curPt:o})}_roomsCanvasPointerMove(t){if(this._roomsDrawGesture){const e=this._alignPointToWrapPct(t.clientX,t.clientY);return void(e&&(this._roomsDrawGesture={...this._roomsDrawGesture,curPt:e}))}this._alignBgPointerMove(t)}_roomsCanvasPointerUp(t){const e=this._roomsDrawGesture,o=this._roomsSession;if(!e||!o)return void this._alignBgPointerUp(t);this._roomsDrawGesture=null;const s=e.startPt,l=e.curPt??e.startPt,h=round1(clampPct((s.x+l.x)/2)),d=round1(clampPct((s.y+l.y)/2)),p=round1(Math.min(100,Math.max(2,Math.abs(l.x-s.x)))),u=round1(Math.min(100,Math.max(2,Math.abs(l.y-s.y)))),m=this._roomsGenerateKey(o),_={x:h,y:d,w:p,h:u,areaId:null,isNew:!0};this._roomsSession={...o,drawingNew:!1,selected:m,rooms:{...o.rooms,[m]:_},history:[...o.history,o.rooms],future:[]}}_roomsRenameKey(t,e){const o=this._roomsSession,s=o?.rooms[t];if(!o||!s||!s.isNew)return;const l=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_+|_+$/g,"");if(!l||l===t||o.rooms[l])return;const h={...o.rooms};delete h[t],h[l]=s,this._roomsSession={...o,rooms:h,selected:l,history:[...o.history,o.rooms],future:[]}}_roomsRequestDelete(t){const e=this._roomsSession?.rooms[t];e?.isNew&&(this._roomsDeleteConfirm=t)}_roomsConfirmDelete(){const t=this._roomsSession,e=this._roomsDeleteConfirm;if(this._roomsDeleteConfirm=null,!t||!e||!t.rooms[e])return;const o={...t.rooms};delete o[e],this._roomsSession={...t,rooms:o,selected:t.selected===e?null:t.selected,history:[...t.history,t.rooms],future:[]}}_roomsDismissDelete(){this._roomsDeleteConfirm=null}async _roomsCopyYaml(){const t=this._roomsSession;if(!t)return;const e=function roomsSessionToYaml(t,e){const r1=t=>Math.round(10*t)/10,o=[],s=Object.keys(t).sort();if(s.length){o.push("rooms:");for(const e of s){const s=t[e];o.push(`  - key: "${e}"`),o.push(`    map_x: ${r1(s.x)}`),o.push(`    map_y: ${r1(s.y)}`),o.push(`    map_w: ${r1(s.w)}`),o.push(`    map_h: ${r1(s.h)}`),null!=s.areaId&&o.push(`    area_id: "${s.areaId}"`)}}return e&&(o.length&&o.push(""),o.push(`room_border_normal: ${e.border_normal}`),o.push(`room_border_selected: ${e.border_selected}`)),o.join("\n")}(t.rooms,t.styleDraft);try{await navigator.clipboard.writeText(e),this._roomsCopiedFlash=!0,setTimeout(()=>{this._roomsCopiedFlash=!1},1500)}catch(t){console.warn("[anyvac-card] Rooms: clipboard write failed",t)}}async _roomsSave(){const t=this._roomsSession;if(!t||!this._alignServiceAvailable())return;const e={};for(const o of Object.keys(t.rooms)){const s=t.rooms[o],l=t.start[o];l&&l.x===s.x&&l.y===s.y&&l.w===s.w&&l.h===s.h&&l.areaId===s.areaId||(e[o]={map_x:s.x,map_y:s.y,map_w:s.w,map_h:s.h,area_id:s.areaId})}for(const o of Object.keys(t.start))o in t.rooms||(e[o]=null);try{if(t.vacuum){const o=this._config.vacuums.find(e=>e.entity===t.vacuum);if(!o)return;const s=this._effectiveSeat(o),l={rotation:Math.round(100*s.rotation)/100,scale:Math.round(100*s.scale)/100,offset_x:Math.round(100*s.offset_x)/100,offset_y:Math.round(100*s.offset_y)/100};null!=s.scaleY&&(l.scale_y=Math.round(100*s.scaleY)/100);const h=effectiveAppearance(o);await this.hass.callService("anyvac","set_floorplan_seat",{floorplan:t.floorplanKey,vacuum:t.vacuum,map:l,appearance:h,rooms:e})}else{const o=this._floorplanSeatsRaw(),s=o?.[t.floorplanKey];await this.hass.callService("anyvac","set_floorplan_seat",{floorplan:t.floorplanKey,rooms:e,image_base:s?.image_base??null,room_style:{...t.styleDraft}})}this._roomsSession={...t,start:{...t.rooms},styleStart:{...t.styleDraft},history:[],future:[]}}catch(t){console.warn("[anyvac-card] Rooms: set_floorplan_seat call failed",t)}}_floorplanCardImageBase(){const t=this._alignSession?.floorplan;if(!t||"merged"!==this._config.map_mode)return null;const e=this._config.image_base;return e?.src===t?e:null}_openFloorplan(){if(this._floorplanSession)return;const t=this._floorplanCardImageBase(),e=this._alignSession?.floorplan,o=this._alignSession?.floorplanKey;if(!t||!e||!o)return;const{src:s,rotation:l,scale:h,offset_x:d,offset_y:p,...u}=t,m=function effectiveFloorplanGeometry(t){return{rotation:t?.rotation??0,scale:t?.scale??100,offset_x:t?.offset_x??0,offset_y:t?.offset_y??0}}(t);this._floorplanSession={floorplan:e,floorplanKey:o,start:{...m},draft:{...m},history:[],future:[],rest:u},this._floorGesture=null}_floorplanHasChanges(){const t=this._floorplanSession;if(!t)return!1;const e=t.draft,o=t.start;if(e.rotation!==o.rotation||e.scale!==o.scale||e.offset_x!==o.offset_x||e.offset_y!==o.offset_y)return!0;const s=this._recropDraft;return 0!==s.offset_x||0!==s.offset_y||100!==s.scale}_floorplanReset(){const t=this._floorplanSession;t&&(this._floorplanSession={...t,draft:{...t.start},history:[...t.history,t.draft],future:[]})}async _floorplanCopyYaml(){const t=this._floorplanSession;if(t)try{await navigator.clipboard.writeText(function floorplanGeometryToYaml(t){const r2=t=>Math.round(100*t)/100;return["image_base:",`  rotation: ${r2(t.rotation)}`,`  scale: ${r2(t.scale)}`,`  offset_x: ${r2(t.offset_x)}`,`  offset_y: ${r2(t.offset_y)}`].join("\n")}(t.draft)),this._floorplanCopiedFlash=!0,setTimeout(()=>{this._floorplanCopiedFlash=!1},1500)}catch(t){console.warn("[anyvac-card] Floorplan: clipboard write failed",t)}}async _floorplanSave(){const t=this._floorplanSession;if(!t||!this._alignServiceAvailable())return;const e=t.draft,o={...t.rest,src:t.floorplan,rotation:Math.round(100*e.rotation)/100,scale:Math.round(100*e.scale)/100,offset_x:Math.round(100*e.offset_x)/100,offset_y:Math.round(100*e.offset_y)/100},s=this._floorplanSeatsRaw()?.[t.floorplanKey],l={floorplan:t.floorplanKey,image_base:o};s?.room_style&&(l.room_style=s.room_style);try{await this.hass.callService("anyvac","set_floorplan_seat",l),this._closeAlign()}catch(t){console.warn("[anyvac-card] Floorplan: set_floorplan_seat call failed",t)}}_floorGeoStartGesture(t,e,o){const s=this._floorplanSession;if(!s)return;this._alignRefocusOverlay(),t.currentTarget.setPointerCapture(t.pointerId),t.stopPropagation(),t.preventDefault();const l=this._alignPointToWrapPct(t.clientX,t.clientY);l&&(this._floorGeoPushHistory(s.draft),this._floorGesture={kind:e,startSeat:{...s.draft},pivotPct:o,startPos:new Map([[t.pointerId,l]]),livePos:new Map([[t.pointerId,l]])})}_floorGeoGestureMove(t){const e=this._floorplanSession,o=this._floorGesture;if(!e||!o||!o.startPos.has(t.pointerId))return;const s=this._alignPointToWrapPct(t.clientX,t.clientY);if(!s)return;o.livePos.set(t.pointerId,s);const l=this._mapAR>.1?this._mapAR:3.636,h=t.pointerId,d=o.startPos.get(h),p=o.livePos.get(h);let u=null;if("drag"===o.kind)u=translateSeat(o.startSeat,p.x-d.x,p.y-d.y);else if("scale"===o.kind&&o.pivotPct){const t=this._alignIsoDist(d,o.pivotPct,l),e=this._alignIsoDist(p,o.pivotPct,l);t>1e-6&&(u=scaleSeatAbout(o.startSeat,e/t,o.pivotPct,l))}else if("rotate"===o.kind&&o.pivotPct){const t=this._alignIsoAngleDeg(o.pivotPct,d,l),e=this._alignIsoAngleDeg(o.pivotPct,p,l);u=rotateSeatAbout(o.startSeat,e-t,o.pivotPct,l)}u&&(this._floorplanSession={...e,draft:u})}_floorGeoGestureEnd(t){const e=this._floorGesture;e&&(e.startPos.delete(t.pointerId),e.livePos.delete(t.pointerId),0===e.startPos.size&&(this._floorGesture=null))}_floorGeoPushHistory(t){const e=this._floorplanSession;e&&(this._floorplanSession={...e,history:[...e.history,t],future:[]})}_floorGeoUndo(){const t=this._floorplanSession;if(!t||!t.history.length)return;const e=t.history[t.history.length-1];this._floorplanSession={...t,draft:e,history:t.history.slice(0,-1),future:[t.draft,...t.future]}}_floorGeoRedo(){const t=this._floorplanSession;if(!t||!t.future.length)return;const e=t.future[0];this._floorplanSession={...t,draft:e,history:[...t.history,t.draft],future:t.future.slice(1)}}_floorGeoSetField(t,e){const o=this._floorplanSession;if(!o)return;const s=parseFloat(e);if(!Number.isFinite(s))return;const l=o.draft;if(l[t]===s)return;const h={...l,[t]:s};this._floorplanSession={...o,draft:h,history:[...o.history,l],future:[]}}_recropOldCrop(t){const e=t.rest?.crop_box;return e?.frame_id&&null!=e.x0&&null!=e.y0&&null!=e.x1&&null!=e.y1?{frame_id:e.frame_id,x0:e.x0,y0:e.y0,x1:e.x1,y1:e.y1}:null}_recropEligible(t){return!!this._recropOldCrop(t)}_recropGhostVacuums(){return this._config.vacuums.filter(t=>this._homeFrameCropFor(t))}_recropHasChanges(){const t=this._recropDraft;return 0!==t.offset_x||0!==t.offset_y||100!==t.scale}_recropReset(){(this._recropHasChanges()||this._recropHistory.length||this._recropFuture.length)&&(this._recropHistory=[...this._recropHistory,this._recropDraft],this._recropFuture=[],this._recropDraft={rotation:0,scale:100,offset_x:0,offset_y:0})}async _recropCopyYaml(){const t=this._floorplanSession,e=t?this._recropOldCrop(t):null;if(!e)return;const o=recropFromGesture(e,this._recropDraft);if(o)try{await navigator.clipboard.writeText(function cropBoxToYaml(t){const r=t=>Math.round(t);return["image_base:","  crop_box:",`    frame_id: "${t.frame_id}"`,`    x0: ${r(t.x0)}`,`    y0: ${r(t.y0)}`,`    x1: ${r(t.x1)}`,`    y1: ${r(t.y1)}`].join("\n")}({...o,frame_id:e.frame_id})),this._floorplanCopiedFlash=!0,setTimeout(()=>{this._floorplanCopiedFlash=!1},1500)}catch(t){console.warn("[anyvac-card] Re-crop: clipboard write failed",t)}}async _recropSave(){const t=this._floorplanSession;if(!t||!this._alignServiceAvailable())return;const e=this._recropOldCrop(t);if(!e)return;const o=recropFromGesture(e,this._recropDraft);if(!o)return;const s=t.draft,l={...t.rest,crop_box:{frame_id:e.frame_id,x0:Math.round(o.x0),y0:Math.round(o.y0),x1:Math.round(o.x1),y1:Math.round(o.y1)},src:t.floorplan,rotation:Math.round(100*s.rotation)/100,scale:Math.round(100*s.scale)/100,offset_x:Math.round(100*s.offset_x)/100,offset_y:Math.round(100*s.offset_y)/100},h=this._floorplanSeatsRaw()?.[t.floorplanKey],d={floorplan:t.floorplanKey,image_base:l};h?.room_style&&(d.room_style=h.room_style);try{await this.hass.callService("anyvac","set_floorplan_seat",d),this._closeAlign()}catch(t){console.warn("[anyvac-card] Re-crop: set_floorplan_seat call failed",t)}}_recropStartGesture(t,e,o){this._alignRefocusOverlay(),t.currentTarget.setPointerCapture(t.pointerId),t.stopPropagation(),t.preventDefault();const s=this._alignPointToWrapPct(t.clientX,t.clientY);s&&(this._recropHistory=[...this._recropHistory,this._recropDraft],this._recropFuture=[],this._recropGesture={kind:e,startSeat:{...this._recropDraft},pivotPct:o,startPos:new Map([[t.pointerId,s]]),livePos:new Map([[t.pointerId,s]])})}_recropGestureMove(t){const e=this._recropGesture;if(!e||!e.startPos.has(t.pointerId))return;const o=this._alignPointToWrapPct(t.clientX,t.clientY);if(!o)return;e.livePos.set(t.pointerId,o);const s=this._mapAR>.1?this._mapAR:3.636,l=t.pointerId,h=e.startPos.get(l),d=e.livePos.get(l);let p=null;if("drag"===e.kind)p=translateSeat(e.startSeat,d.x-h.x,d.y-h.y);else if("scale"===e.kind&&e.pivotPct){const t=this._alignIsoDist(h,e.pivotPct,s),o=this._alignIsoDist(d,e.pivotPct,s);t>1e-6&&(p=scaleSeatAbout(e.startSeat,o/t,e.pivotPct,s))}p&&(this._recropDraft=p)}_recropGestureEnd(t){const e=this._recropGesture;e&&(e.startPos.delete(t.pointerId),e.livePos.delete(t.pointerId),0===e.startPos.size&&(this._recropGesture=null))}_recropUndo(){if(!this._recropHistory.length)return;const t=this._recropHistory[this._recropHistory.length-1];this._recropFuture=[this._recropDraft,...this._recropFuture],this._recropHistory=this._recropHistory.slice(0,-1),this._recropDraft=t}_recropRedo(){if(!this._recropFuture.length)return;const t=this._recropFuture[0];this._recropHistory=[...this._recropHistory,this._recropDraft],this._recropFuture=this._recropFuture.slice(1),this._recropDraft=t}_recropSetField(t,e){const o=parseFloat(e);if(!Number.isFinite(o))return;const s=this._recropDraft;s[t]!==o&&(this._recropHistory=[...this._recropHistory,s],this._recropFuture=[],this._recropDraft={...s,[t]:o})}_setFloorplanMode(t){"calib"===t&&this._alignReadOnly()||(this._floorplanMode=t,"calib"!==t||this._floorCalib||(this._floorCalib={phase:"raw",rawPts:[],floorPts:[]},this._floorCalibResult=null,this._floorCalibError=""))}_floorCalibCancel(){this._floorCalib=null,this._floorCalibRefNat=null,this._floorCalibResult=null,this._floorCalibError="",this._floorplanMode="geo"}_floorCalibRawClick(t){const e=this._floorCalib;if(!e||"raw"!==e.phase||!this._floorCalibRefNat||e.rawPts.length>=6)return;const o=t.currentTarget.getBoundingClientRect(),s=(t.clientX-o.left)/o.width,l=(t.clientY-o.top)/o.height,h={x:s*this._floorCalibRefNat.w,y:l*this._floorCalibRefNat.h};this._floorCalib={...e,rawPts:[...e.rawPts,h],phase:"floor"}}_floorCalibFloorClick(t){const e=this._floorCalib;if(!e||"floor"!==e.phase)return;const o=this._alignPointToWrapPct(t.clientX,t.clientY);if(!o)return;const s=round1(clampPct(o.x)),l=round1(clampPct(o.y));this._floorCalib={...e,floorPts:[...e.floorPts,{x:s,y:l}],phase:"raw"}}_floorCalibUndoPoint(){const t=this._floorCalib;t&&("floor"===t.phase&&t.rawPts.length>t.floorPts.length?this._floorCalib={...t,rawPts:t.rawPts.slice(0,-1),phase:"raw"}:t.floorPts.length>0&&(this._floorCalib={...t,floorPts:t.floorPts.slice(0,-1)}))}_floorCalibPreview(t){const e=Math.min(t.rawPts.length,t.floorPts.length);if(e<2||!this._floorCalibRefNat)return null;const o=this._mapAR>.1?this._mapAR:3.636,s=computeSeatFit(buildCalibrationAnchors(t.rawPts.slice(0,e),t.floorPts.slice(0,e),{NW:this._floorCalibRefNat.w,NH:this._floorCalibRefNat.h},o),o);return s?{residual_pct:Math.round(10*s.residual_pct)/10}:null}async _floorCalibSave(){const t=this._floorCalib,e=this._alignSession,o=this._alignVac();if(!t||!e||!o||!this._alignServiceAvailable()||this._alignReadOnly())return;const s=Math.min(t.rawPts.length,t.floorPts.length);if(!this._floorCalibRefNat||s<2)return void(this._floorCalibError="Need at least 2 complete point pairs — try again.");const l=this._mapAR>.1?this._mapAR:3.636,h=computeSeatFit(buildCalibrationAnchors(t.rawPts.slice(0,s),t.floorPts.slice(0,s),{NW:this._floorCalibRefNat.w,NH:this._floorCalibRefNat.h},l),l);if(!h)return void(this._floorCalibError="Couldn't compute a calibration from those points — make sure they're clearly apart, then try again.");this._floorCalibError="";const d={rotation:h.rotation,scale:Math.round(10*h.scale)/10,offset_x:Math.round(10*h.offset_x)/10,offset_y:Math.round(10*h.offset_y)/10},p={...e.appearanceDraft};try{await this.hass.callService("anyvac","set_floorplan_seat",{floorplan:e.floorplanKey,vacuum:o.entity,map:d,appearance:p}),this._closeAlign()}catch(t){console.warn("[anyvac-card] Floorplan calibration: set_floorplan_seat call failed",t)}}_homeCalibEligible(t){const e=t.rest?.crop_box;return(!e||!("frame_id"in e))&&!!this._anyHomeFrameCard()}_homeCalibServiceAvailable(){return!!this.hass.services?.anyvac?.snapshot_map_as_floorplan&&!!this.hass.services?.anyvac?.snap_wall_corner}_fiducialServiceAvailable(){return!!this.hass.services?.anyvac?.snapshot_map_as_floorplan&&!!this.hass.services?.anyvac?.detect_floorplan_fiducials}async _saveHomeAnchors(t,e){const o=this._floorplanSession;if(!o||!this._alignServiceAvailable())return!1;const s=o.draft,l={...o.rest,src:o.floorplan,rotation:Math.round(100*s.rotation)/100,scale:Math.round(100*s.scale)/100,offset_x:Math.round(100*s.offset_x)/100,offset_y:Math.round(100*s.offset_y)/100,home_anchors:t,home_anchors_frame_id:e},h=this._floorplanSeatsRaw()?.[o.floorplanKey],d={floorplan:o.floorplanKey,image_base:l};h?.room_style&&(d.room_style=h.room_style);try{return await this.hass.callService("anyvac","set_floorplan_seat",d),!0}catch(t){return console.warn("[anyvac-card] Home calibration: set_floorplan_seat call failed",t),!1}}async _clearHomeAnchors(){const t=this._floorplanSession;if(!t||!this._alignServiceAvailable())return;const{home_anchors:e,home_anchors_frame_id:o,...s}=t.rest,l=t.draft,h={...s,src:t.floorplan,rotation:Math.round(100*l.rotation)/100,scale:Math.round(100*l.scale)/100,offset_x:Math.round(100*l.offset_x)/100,offset_y:Math.round(100*l.offset_y)/100},d=this._floorplanSeatsRaw()?.[t.floorplanKey],p={floorplan:t.floorplanKey,image_base:h};d?.room_style&&(p.room_style=d.room_style);try{await this.hass.callService("anyvac","set_floorplan_seat",p),this._floorplanSession={...t,rest:s},this._homeCalibResult=null}catch(t){console.warn("[anyvac-card] Home calibration: clear failed",t)}}async _hideMapCascade(t){const e=this._floorplanSeatsRaw();for(const o of this._config.vacuums??[]){const s=e?.[t]?.vacuums?.[o.entity]?.map,l={...effectiveAppearance(o),hide_map:!0},h={floorplan:t,vacuum:o.entity,appearance:l};s&&(h.map=s);try{await this.hass.callService("anyvac","set_floorplan_seat",h)}catch(t){console.warn(`[anyvac-card] Home calibration: hide_map cascade failed for ${o.entity}`,t)}}}async _startHomeCalibration(){const t=this._floorplanSession;if(t&&this._homeCalibEligible(t)&&this._homeCalibServiceAvailable()){this._homeCalibError="",this._homeCalibResult=null,this._homeCalibBusy=!0;try{const t=await this.hass.callService("anyvac","snapshot_map_as_floorplan",{frame:"home",name:"home_frame_calib"},void 0,!1,!0),e=t?.response?.path,o=t?.response?.frame_id,s=t?.response?.crop;if(!e||!o||!s)throw new Error("incomplete response — integration too old?");this._homeCalibSnapshotUrl=e,this._homeCalibCrop=s,this._homeCalibFrameId=o,this._homeCalib={phase:"frame",homePts:[],floorPts:[]}}catch(t){this._homeCalibError="Couldn't snapshot the home frame for calibration — make sure at least one vacuum has a home-frame registration and the anyvac integration is at least 1.9.0, then try again.",console.warn("[anyvac-card] Home calibration: snapshot_map_as_floorplan failed",t)}finally{this._homeCalibBusy=!1}}}_cancelHomeCalibration(){this._homeCalib=null,this._homeCalibSnapshotUrl="",this._homeCalibCrop=null,this._homeCalibFrameId="",this._homeCalibError=""}async _onHomeCalibFrameClick(t){const e=this._homeCalib,o=this._homeCalibCrop;if(!e||"frame"!==e.phase||!o||e.homePts.length>=6||this._homeCalibBusy)return;const s=t.currentTarget.getBoundingClientRect(),l=pctToCropPoint({x:(t.clientX-s.left)/s.width*100,y:(t.clientY-s.top)/s.height*100},o);if(l){this._homeCalibBusy=!0;try{const t=await this.hass.callService("anyvac","snap_wall_corner",{frame_id:this._homeCalibFrameId,x_home_px:l.x,y_home_px:l.y},void 0,!1,!0),o=t?.response?.x_home_px??l.x,s=t?.response?.y_home_px??l.y;this._homeCalib={...e,homePts:[...e.homePts,{x:o,y:s}],phase:"floor"}}catch(t){this._homeCalib={...e,homePts:[...e.homePts,l],phase:"floor"},console.warn("[anyvac-card] Home calibration: snap_wall_corner failed, using unsnapped click",t)}finally{this._homeCalibBusy=!1}}}_onHomeCalibFloorClick(t){const e=this._homeCalib;if(!e||"floor"!==e.phase)return;const o=this._alignPointToWrapPct(t.clientX,t.clientY);if(!o)return;const s=round1(clampPct(o.x)),l=round1(clampPct(o.y));this._homeCalib={...e,floorPts:[...e.floorPts,{x:s,y:l}],phase:"frame"}}_undoHomeCalibPoint(){const t=this._homeCalib;t&&("floor"===t.phase&&t.homePts.length>t.floorPts.length?this._homeCalib={...t,homePts:t.homePts.slice(0,-1),phase:"frame"}:t.floorPts.length>0&&(this._homeCalib={...t,floorPts:t.floorPts.slice(0,-1)}))}_homeCalibPreview(t){const e=Math.min(t.homePts.length,t.floorPts.length),o=this._anyHomeFrameCard();if(e<2||!o)return null;const s=t.homePts.slice(0,e).map((e,o)=>({home_px:e,floor_pct:t.floorPts[o]})),l=this._mapAR>.1?this._mapAR:3.636,h=homeAnchorFit(s,{NW:o.w,NH:o.h},l);return h?{residual_pct:Math.round(10*h.residual_pct)/10}:null}async _finishHomeCalibration(){const t=this._homeCalib,e=this._floorplanSession;if(!t||!e)return;const o=Math.min(t.homePts.length,t.floorPts.length);if(o<2)return void(this._homeCalibError="Need at least 2 complete point pairs — try again.");const s=this._anyHomeFrameCard();if(!s)return void(this._homeCalibError="No home frame available anymore — try again.");const l=t.homePts.slice(0,o).map((e,o)=>({home_px:e,floor_pct:t.floorPts[o]})),h=this._mapAR>.1?this._mapAR:3.636,d=homeAnchorFit(l,{NW:s.w,NH:s.h},h);if(!d)return void(this._homeCalibError="Couldn't compute a calibration from those points — make sure they're clearly apart, then try again.");await this._saveHomeAnchors(l,s.id)?(await this._hideMapCascade(e.floorplanKey),this._homeCalib=null,this._homeCalibSnapshotUrl="",this._homeCalibCrop=null,this._homeCalibFrameId="",this._homeCalibError="",this._homeCalibResult={residual_pct:Math.round(10*d.residual_pct)/10}):this._homeCalibError="Couldn't save the calibration — try again."}async _snapshotHomeFrameWithFiducials(){if(this._fiducialServiceAvailable()){this._fiducialSnapshotBusy=!0,this._fiducialSnapshotError="",this._fiducialDetectResult=null;try{const t=await this.hass.callService("anyvac","snapshot_map_as_floorplan",{frame:"home",name:"home_frame_fiducial",fiducials:!0},void 0,!1,!0),e=t?.response?.path,o=t?.response?.frame_id,s=t?.response?.fiducials;if(!e||!o||!s?.length)throw new Error("incomplete response — integration too old?");this._fiducialKnown={frameId:o,markers:s},this._fiducialSnapshotPath=e}catch(t){this._fiducialSnapshotError="Couldn't snapshot the home frame with markers — requires anyvac integration ≥ 1.9.0 with at least one registered vacuum.",console.warn("[anyvac-card] Fiducials: snapshot_map_as_floorplan failed",t)}finally{this._fiducialSnapshotBusy=!1}}}async _detectFiducials(){const t=this._fiducialKnown,e=this._floorplanSession,o=this._floorplanCardImageBase()?.src??e?.floorplan;if(t&&e&&o){this._fiducialDetectBusy=!0,this._fiducialDetectError="",this._fiducialDetectResult=null;try{const s=await this.hass.callService("anyvac","detect_floorplan_fiducials",{path:o,fiducials:t.markers},void 0,!1,!0),l=s?.response?.home_anchors;if(!l?.length)throw new Error("no markers detected");if(!await this._saveHomeAnchors(l,t.frameId))throw new Error("couldn't save the detected anchors");await this._hideMapCascade(e.floorplanKey),this._fiducialDetectResult={found:s?.response?.found??l.length,missing:s?.response?.missing??[]}}catch(t){this._fiducialDetectError="Couldn't detect markers — make sure the file above still has its alpha channel (stayed PNG, wasn't flattened/re-exported as JPEG) and at least 2 of the 4 corners survived the crop.",console.warn("[anyvac-card] Fiducials: detect_floorplan_fiducials failed",t)}finally{this._fiducialDetectBusy=!1}}}_floorplanSnapshotServiceAvailable(){return!!this.hass.services?.anyvac?.snapshot_map_as_floorplan&&this._alignServiceAvailable()}_guideExportServiceAvailable(){return!!this.hass.services?.anyvac?.export_map_guide}async _snapshotMapAsFloorplan(){const t=this._alignSession,e=this._floorplanSession,o=this._alignVac();if(!(t&&e&&o&&"merged"===this._config.map_mode&&this._floorplanSnapshotServiceAvailable()))return;const s=this._mapEntityFor(o);if(s){this._floorplanSnapshotBusy=!0,this._floorplanSnapshotError="",this._placeRoomsResult=null;try{const l=await this.hass.callService("anyvac","snapshot_map_as_floorplan",{image_entity:s,name:o.name||o.entity},void 0,!1,!0),h=l?.response?.path;if(!h)throw new Error("no path in service response");const d=l?.response?.crop,p=e.draft,u={...e.rest,src:h,rotation:Math.round(100*p.rotation)/100,scale:Math.round(100*p.scale)/100,offset_x:Math.round(100*p.offset_x)/100,offset_y:Math.round(100*p.offset_y)/100,...d?{crop_box:{entity:o.entity,...d}}:{}},m={};let _=0,f=0;if(d){const t=this._intAttrs(o),e=Array.isArray(t?.rooms)?t.rooms:[],s=new Map((this._config.rooms??[]).map(t=>[t.key,t]));for(const t of e){const e=t?.name,o=t?.bbox_px;if(!e||!o)continue;const l=placeRoomInCrop(o,d);l&&(m[e]={...l,area_id:s.get(e)?.area_id??null},s.has(e)?_++:f++)}}const v=this._floorplanSeatsRaw()?.[t.floorplanKey],b={floorplan:t.floorplanKey,image_base:u};Object.keys(m).length&&(b.rooms=m),v?.room_style&&(b.room_style=v.room_style),await this.hass.callService("anyvac","set_floorplan_seat",b),this._alignSession={...t,floorplan:h},this._roomsSession&&(this._roomsSession={...this._roomsSession,floorplan:h});const{src:w,rotation:$,scale:C,offset_x:A,offset_y:P,...F}=u;this._floorplanSession={...e,floorplan:h,rest:F},d&&(this._placeRoomsResult={placed:_,added:f}),await this._hideMapCascade(t.floorplanKey)}catch(t){this._floorplanSnapshotError="Couldn't snapshot this vacuum's map — make sure the anyvac integration is updated to at least 0.88.0, then try again.",console.warn("[anyvac-card] Floorplan: snapshot_map_as_floorplan failed",t)}finally{this._floorplanSnapshotBusy=!1}}}async _snapshotHomeFrameAsFloorplan(){const t=this._alignSession,e=this._floorplanSession;if(t&&e&&"merged"===this._config.map_mode&&this._floorplanSnapshotServiceAvailable()){this._homeFrameSnapshotBusy=!0,this._homeFrameSnapshotError="";try{const o=await this.hass.callService("anyvac","snapshot_map_as_floorplan",{frame:"home",name:"home_frame"},void 0,!1,!0),s=o?.response?.path,l=o?.response?.frame_id,h=o?.response?.crop;if(!s||!l||!h)throw new Error("incomplete response — integration too old?");const d=e.draft,p={...e.rest,src:s,crop_box:{frame_id:l,...h},rotation:Math.round(100*d.rotation)/100,scale:Math.round(100*d.scale)/100,offset_x:Math.round(100*d.offset_x)/100,offset_y:Math.round(100*d.offset_y)/100},u=this._floorplanSeatsRaw()?.[t.floorplanKey],m={floorplan:t.floorplanKey,image_base:p};u?.room_style&&(m.room_style=u.room_style),await this.hass.callService("anyvac","set_floorplan_seat",m),this._alignSession={...t,floorplan:s},this._roomsSession&&(this._roomsSession={...this._roomsSession,floorplan:s});const{src:_,rotation:f,scale:v,offset_x:b,offset_y:w,...$}=p;this._floorplanSession={...e,floorplan:s,rest:$},await this._hideMapCascade(t.floorplanKey)}catch(t){this._homeFrameSnapshotError="Couldn't snapshot the home frame — make sure at least two vacuums have a home-frame registration (integration ≥ 1.8.0, check the 'registration' sensor attribute), then try again.",console.warn("[anyvac-card] Floorplan: snapshot_map_as_floorplan (frame: home) failed",t)}finally{this._homeFrameSnapshotBusy=!1}}}async _exportGuideLayers(){const t=this._floorplanSession,e=this._alignVac();if(!t||!e||!this._guideExportServiceAvailable())return;const o=this._mapEntityFor(e);if(!o)return;this._guideExportBusy=!0,this._guideExportError="",this._guideExportResult=null;const s=t.rest?.crop_box,l=s&&s.entity===e.entity?{x0:s.x0,y0:s.y0,x1:s.x1,y1:s.y1}:void 0;try{const t={image_entity:o,name:e.name||e.entity};l&&(t.crop=l);const s=await this.hass.callService("anyvac","export_map_guide",t,void 0,!1,!0),h=s?.response?.paths,d=s?.response?.size;if(!h||!d||!Object.keys(h).length)throw new Error("no guide layers in service response");this._guideExportResult={paths:h,size:d}}catch(t){this._guideExportError="Couldn't export guide layers — make sure the anyvac integration is updated to at least 1.4.0, then try again.",console.warn("[anyvac-card] Floorplan: export_map_guide failed",t)}finally{this._guideExportBusy=!1}}_tinted(t,e){if(!this._veTint||!this._themed()||!hexToRgb(e))return t;const o=t+"|"+e.toLowerCase(),s=this._tintCache.get(o);return s||(null===s||this._tintPending.has(o)||(this._tintPending.add(o),tintMapImage(t,e).then(t=>{for(this._tintPending.delete(o),this._tintCache.set(o,t);this._tintCache.size>12;){const[t,e]=this._tintCache.entries().next().value;this._tintCache.delete(t),e&&URL.revokeObjectURL(e)}t&&this.requestUpdate()})),t)}_veAvatar(t){return t.image?zt`<img class="ve-chip-avatar" src=${t.image} alt="" />`:zt`<span class="ve-chip-avatar ve-chip-avatar--dot" style=${Yt({background:this._color(t)})}></span>`}_renderVisualEditor(){const t=this._alignSession;if(!t)return Ht;const e=this._alignVac();if(!e)return Ht;const o=this._alignCandidates(this._config.vacuums),s=this._alignReadOnly(),l=!s&&this._alignServiceAvailable(),h=t.history.length>0,d=t.future.length>0,p=this._roomsSession,u=!!p&&p.history.length>0,m=!!p&&p.future.length>0,_=!!p&&this._alignServiceAvailable(),f=this._floorplanSession,v=!!f&&this._recropEligible(f),b=v?this._recropHistory.length>0:!!f&&f.history.length>0,w=v?this._recropFuture.length>0:!!f&&f.future.length>0,$=!!f&&this._alignServiceAvailable(),C=this._floorCalib,A=C?Math.min(C.rawPts.length,C.floorPts.length):0,P=A>=2&&this._alignServiceAvailable()&&!this._alignReadOnly(),F=this._homeCalib,E=F?Math.min(F.homePts.length,F.floorPts.length):0,T=!!F&&E>=2&&this._alignServiceAvailable(),O=t.nudgeTier,tierBtn=(t,e,o)=>zt`
      <button class="align-tier-btn ${O===t?"on":""}" title=${o}
        @click=${()=>this._alignSetNudgeTier(t)}>${e}</button>`,toolTab=(t,e,o)=>zt`
      <button class="ve-tool-tab ${this._veTool===t?"on":""}" role="tab"
        aria-selected=${this._veTool===t?"true":"false"} title=${e}
        @click=${()=>this._setVeTool(t)}><ha-icon icon=${o}></ha-icon><span>${e}</span></button>`;return zt`
      <div class="align-overlay ${this._rootClasses()}" tabindex="0" role="dialog" aria-label="Visual editor — ${e.name??e.entity}"
        @keydown=${t=>this._alignKeyDown(t)}>
        <div class="align-toolbar ve-topbar">
          <div class="align-vac-picker">
            ${o.length>1?o.map(t=>zt`
              <button class="align-vac-chip ${t.entity===e.entity?"on":""}"
                aria-pressed=${t.entity===e.entity?"true":"false"}
                @click=${()=>{const e=this._veTool;this._closeAlign(),this._openAlign(t),this._veTool=e,"rooms"===e&&this._openRooms(),"floorplan"===e&&this._openFloorplan()}}>
                ${this._veAvatar(t)}<span>${t.name??t.entity}</span>
              </button>
            `):zt`<span class="align-vac-chip align-vac-chip--static on">${this._veAvatar(e)}<span>${e.name??e.entity}</span></span>`}
          </div>
          <div class="ve-tool-row" role="tablist" aria-label="Tool">
            ${toolTab("seat","Seat & Appearance","mdi:vector-square-edit")}
            ${toolTab("rooms","Rooms","mdi:select-group")}
            ${toolTab("floorplan","Floorplan & Calibrate","mdi:image-edit-outline")}
          </div>
          <div class="ve-topbar-actions">
          ${"seat"===this._veTool?zt`
            <div class="align-tier-group" title="Nudge step size — hold Ctrl for Fine, Shift for Jump">
              ${tierBtn("fine","Fine","Fine step (0,1×) — or hold Ctrl")}
              ${tierBtn("normal","Step","Normal step (1×)")}
              ${tierBtn("jump","Jump","Jump step (10×) — or hold Shift")}
            </div>
            <button class="align-btn" title="Undo (Ctrl+Z)" ?disabled=${!h} @click=${()=>this._alignUndo()}>
              <ha-icon icon="mdi:undo"></ha-icon>
            </button>
            <button class="align-btn" title="Redo (Ctrl+Y)" ?disabled=${!d} @click=${()=>this._alignRedo()}>
              <ha-icon icon="mdi:redo"></ha-icon>
            </button>
            <button class="align-btn" title="Rotate view 90°" @click=${()=>this._alignRotateView()}>
              <ha-icon icon="mdi:screen-rotation"></ha-icon>
            </button>
            <button class="align-btn" title="Reset to the values the editor was opened with"
              ?disabled=${s} @click=${()=>this._alignReset()}>
              <ha-icon icon="mdi:restore"></ha-icon>
            </button>
            <button class="align-btn ${this._alignCopiedFlash?"align-btn--flash":""}"
              title="Copy as YAML (map:/appearance: blocks, paste into the card config)" @click=${()=>this._alignCopyYaml()}>
              <ha-icon icon=${this._alignCopiedFlash?"mdi:check":"mdi:content-copy"}></ha-icon>
            </button>
          `:Ht}
          ${"rooms"===this._veTool?zt`
            <button class="align-btn" title="Undo" ?disabled=${!u} @click=${()=>this._roomsUndo()}>
              <ha-icon icon="mdi:undo"></ha-icon>
            </button>
            <button class="align-btn" title="Redo" ?disabled=${!m} @click=${()=>this._roomsRedo()}>
              <ha-icon icon="mdi:redo"></ha-icon>
            </button>
            <button class="align-btn" title="Rotate view 90°" @click=${()=>this._alignRotateView()}>
              <ha-icon icon="mdi:screen-rotation"></ha-icon>
            </button>
            <button class="align-btn" title="Reset to the values this tab was opened with" @click=${()=>this._roomsReset()}>
              <ha-icon icon="mdi:restore"></ha-icon>
            </button>
            <button class="align-btn ${this._roomsCopiedFlash?"align-btn--flash":""}"
              title="Copy as YAML (rooms: block, paste into the card config)" @click=${()=>this._roomsCopyYaml()}>
              <ha-icon icon=${this._roomsCopiedFlash?"mdi:check":"mdi:content-copy"}></ha-icon>
            </button>
          `:Ht}
          ${"floorplan"===this._veTool&&f&&"geo"===this._floorplanMode?zt`
            <button class="align-btn" title="Undo (Ctrl+Z)" ?disabled=${!b}
              @click=${()=>v?this._recropUndo():this._floorGeoUndo()}>
              <ha-icon icon="mdi:undo"></ha-icon>
            </button>
            <button class="align-btn" title="Redo (Ctrl+Y)" ?disabled=${!w}
              @click=${()=>v?this._recropRedo():this._floorGeoRedo()}>
              <ha-icon icon="mdi:redo"></ha-icon>
            </button>
            <button class="align-btn" title="Rotate view 90°" @click=${()=>this._alignRotateView()}>
              <ha-icon icon="mdi:screen-rotation"></ha-icon>
            </button>
            <button class="align-btn" title="Reset to the values this tab was opened with"
              @click=${()=>v?this._recropReset():this._floorplanReset()}>
              <ha-icon icon="mdi:restore"></ha-icon>
            </button>
            <button class="align-btn ${this._floorplanCopiedFlash?"align-btn--flash":""}"
              title=${v?"Copy as YAML (image_base.crop_box: block, paste into the card config)":"Copy as YAML (image_base: block, paste into the card config)"}
              @click=${()=>v?this._recropCopyYaml():this._floorplanCopyYaml()}>
              <ha-icon icon=${this._floorplanCopiedFlash?"mdi:check":"mdi:content-copy"}></ha-icon>
            </button>
          `:Ht}
          ${"floorplan"===this._veTool&&f&&"calib"===this._floorplanMode?zt`
            <button class="align-btn" title="Rotate view 90°" @click=${()=>this._alignRotateView()}>
              <ha-icon icon="mdi:screen-rotation"></ha-icon>
            </button>
          `:Ht}
          ${"floorplan"===this._veTool&&f&&"home"===this._floorplanMode?zt`
            <button class="align-btn" title="Rotate view 90°" @click=${()=>this._alignRotateView()}>
              <ha-icon icon="mdi:screen-rotation"></ha-icon>
            </button>
          `:Ht}
          <button class="align-btn align-close-btn" title="Cancel" @click=${()=>this._alignCancel()}>
            <ha-icon icon="mdi:close"></ha-icon>
          </button>
          ${"seat"===this._veTool?zt`
            <button class="align-btn align-save-btn" ?disabled=${!l}
              title=${l?"Save":s?"Read-only — aligned by home frame":"Update the AnyVac integration to 2.0.0 — or Copy YAML"}
              @click=${()=>this._alignSave()}>
              <ha-icon icon="mdi:content-save"></ha-icon><span>Save</span>
            </button>
          `:Ht}
          ${"rooms"===this._veTool?zt`
            <button class="align-btn align-save-btn" ?disabled=${!_}
              title=${_?"Save":"Update the AnyVac integration to 2.0.0 — or Copy YAML"}
              @click=${()=>this._roomsSave()}>
              <ha-icon icon="mdi:content-save"></ha-icon><span>Save</span>
            </button>
          `:Ht}
          ${"floorplan"===this._veTool&&f&&"geo"===this._floorplanMode?zt`
            <button class="align-btn align-save-btn" ?disabled=${!$}
              title=${$?"Save":"Update the AnyVac integration to 2.0.0 — or Copy YAML"}
              @click=${()=>v?this._recropSave():this._floorplanSave()}>
              <ha-icon icon="mdi:content-save"></ha-icon><span>Save</span>
            </button>
          `:Ht}
          ${"floorplan"===this._veTool&&f&&"calib"===this._floorplanMode?zt`
            <button class="align-btn align-save-btn" ?disabled=${!P}
              title=${P?"Save calibrated seat":this._alignReadOnly()?"Read-only — aligned by home frame":A<2?"Click at least 2 point pairs first":"Update the AnyVac integration to 2.0.0"}
              @click=${()=>this._floorCalibSave()}>
              <ha-icon icon="mdi:content-save"></ha-icon><span>Save</span>
            </button>
          `:Ht}
          ${"floorplan"===this._veTool&&f&&"home"===this._floorplanMode&&this._homeCalib?zt`
            <button class="align-btn align-save-btn" ?disabled=${!T}
              title=${T?"Save calibration":E<2?"Click at least 2 point pairs first":"Update the AnyVac integration to 2.0.0"}
              @click=${()=>this._finishHomeCalibration()}>
              <ha-icon icon="mdi:content-save"></ha-icon><span>Save</span>
            </button>
          `:Ht}
          </div>
        </div>
        ${"seat"===this._veTool?this._renderSeatTool(t,e):"rooms"===this._veTool?this._renderRoomsTool(t,e):f?this._renderFloorplanTool(f):this._renderVePlaceholder("merged"!==this._config.map_mode?"Only available for a shared (merged-mode) floorplan right now — this config's own per-vacuum image_base stays editable from the Config editor's Vacuums tab → Map & floorplan section.":"No card-level floorplan image to edit — set one from the Config editor's Global tab → Floorplan section first.")}
        ${this._alignCancelConfirm?zt`
          <div class="align-confirm-backdrop">
            <div class="align-confirm-panel">
              <div class="align-confirm-title">Discard changes?</div>
              <div class="align-confirm-body">
                ${this._veToolSwitchTarget?"The edits you made in this tab haven't been saved.":"The edits you made in this session haven't been saved."}
              </div>
              <div class="align-confirm-actions">
                <button class="align-btn align-confirm-keep" @click=${()=>this._alignDismissCancelConfirm()}>Keep editing</button>
                <button class="align-btn align-confirm-discard" @click=${()=>this._alignConfirmDiscard()}>Discard</button>
              </div>
            </div>
          </div>
        `:Ht}
      </div>
    `}_renderSeatTool(t,e){const{w:o,h:s}=this._alignSceneSize(),l=this._config.vacuums.filter(o=>o.entity!==e.entity&&resolveImageBaseSrc(this._config,o)===t.floorplan&&this._intAttrs(o)),h=this._config.image_base?.src===t.floorplan?this._config.image_base:this._config.vacuums.find(e=>e.image_base?.src===t.floorplan)?.image_base??e.image_base,d=this._mapEntityFor(e),p=d?this._mapUrl(d):null,u=t.draft,m=t.appearanceDraft,_={...e,...m,path_color:m.path_color??void 0,mop_path_color:m.mop_path_color??void 0},corner=(t,e)=>this._alignCornerPct(u,t,e,o,s),f=corner(0,0),v=corner(1,0),b=corner(0,1),w=corner(1,1),$=corner(.5,0),C=corner(.5,1),A=corner(0,.5),P=corner(1,.5),F={x:50+u.offset_x,y:50+u.offset_y},E=this._alignCornerPct(u,.5,-.18,o,s),T=this._alignReadOnly();return zt`
        <div class="align-body">
          <div class="align-canvas"
            @wheel=${t=>this._alignWheel(t)}
            @pointerdown=${t=>this._alignBgPointerDown(t)}
            @pointermove=${t=>this._alignBgPointerMove(t)}
            @pointerup=${t=>this._alignBgPointerUp(t)}
            @pointercancel=${t=>this._alignBgPointerUp(t)}>
            <div class="align-scene" style=${Yt({width:o+"px",height:s+"px",transform:this._alignViewTransformCss()})}>
              ${h?.src?zt`<img class="align-floorplan-img" src=${h.src} alt="Floorplan"
                  @load=${this._onFloorplanLoad}
                  style=${Yt({opacity:String(t.layers.floor),transform:"translate("+(h.offset_x??0)+"%,"+(h.offset_y??0)+"%) rotate("+(h.rotation??0)+"deg) scale("+(h.scale??100)/100+")"})} />`:Ht}
              ${l.map(t=>{const e=this._mapEntityFor(t),o=e?this._tinted(this._mapUrl(e),this._color(t)):null,s=this._effectiveSeat(t);return zt`
                  <div class="align-ghost">
                    ${o?zt`<img class="align-seat-img" src=${o} alt=""
                        style=${Yt({left:50+s.offset_x+"%",top:50+s.offset_y+"%",width:s.scale+"%",transform:"translate(-50%,-50%) "+seatRotateScaleCss(s.rotation,s.scale,s.scaleY)})} />`:Ht}
                    ${this._renderIntegrationOverlay(t,s,"both")}
                  </div>`})}
              <div class="align-seat-layer ${T?"align-seat-layer--readonly":""}"
                @pointerdown=${t=>this._alignStartGesture(t,"drag")}
                @pointermove=${t=>this._alignGestureMove(t)}
                @pointerup=${t=>this._alignGestureEnd(t)}
                @pointercancel=${t=>this._alignGestureEnd(t)}>
                ${p?zt`<img class="align-seat-img" src=${this._tinted(p,this._color(e))} alt="Vacuum map"
                    style=${Yt({opacity:String(t.layers.rawMap),left:50+u.offset_x+"%",top:50+u.offset_y+"%",width:u.scale+"%",transform:"translate(-50%,-50%) "+seatRotateScaleCss(u.rotation,u.scale,u.scaleY)})} />`:Ht}
                ${this._renderIntegrationOverlay(_,u,"both")}
              </div>
              ${T?zt`
                <div class="align-readonly-note">
                  <ha-icon icon="mdi:lock-outline"></ha-icon>
                  <span>aligned by home frame — nothing to adjust</span>
                </div>
              `:zt`
                <svg class="align-gizmo" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <line x1=${F.x} y1=${F.y} x2=${E.x} y2=${E.y} class="align-gizmo-arm" />
                  <polygon points="${f.x},${f.y} ${v.x},${v.y} ${w.x},${w.y} ${b.x},${b.y}" class="align-gizmo-box" />
                </svg>
                ${[["nw",f],["ne",v],["se",w],["sw",b]].map(([t,e])=>zt`
                  <div class="align-handle align-handle--corner" data-corner=${t}
                    style=${Yt({left:e.x+"%",top:e.y+"%"})}
                    @pointerdown=${e=>{const o="nw"===t?w:"ne"===t?b:"se"===t?f:v;this._alignStartGesture(e,"scale",o)}}
                    @pointermove=${t=>this._alignGestureMove(t)}
                    @pointerup=${t=>this._alignGestureEnd(t)}
                    @pointercancel=${t=>this._alignGestureEnd(t)}>
                  </div>
                `)}
                ${[["n",$,"stretchY",90,"mdi:arrow-up-down"],["s",C,"stretchY",90,"mdi:arrow-up-down"],["w",A,"stretchX",0,"mdi:arrow-left-right"],["e",P,"stretchX",0,"mdi:arrow-left-right"]].map(([t,e,o,s,l])=>zt`
                  <div class="align-handle align-handle--side align-handle--${t}" data-side=${t}
                    title=${"stretchX"===o?"Scale X":"Scale Y"}
                    style=${Yt({left:e.x+"%",top:e.y+"%",cursor:this._alignResizeCursor(s,u.rotation+this._alignView.rot)})}
                    @pointerdown=${t=>this._alignStartGesture(t,o)}
                    @pointermove=${t=>this._alignGestureMove(t)}
                    @pointerup=${t=>this._alignGestureEnd(t)}
                    @pointercancel=${t=>this._alignGestureEnd(t)}>
                    <ha-icon icon=${l} style=${Yt({transform:"rotate("+u.rotation+"deg)"})}></ha-icon>
                  </div>
                `)}
                <div class="align-axis-hint align-axis-hint--x" title="Offset X"
                  style=${Yt({left:F.x+7+"%",top:F.y+"%"})}>
                  <ha-icon icon="mdi:arrow-left-right"></ha-icon>
                </div>
                <div class="align-axis-hint align-axis-hint--y" title="Offset Y"
                  style=${Yt({left:F.x+"%",top:F.y-7+"%"})}>
                  <ha-icon icon="mdi:arrow-up-down"></ha-icon>
                </div>
                <div class="align-handle align-handle--rotate"
                  style=${Yt({left:E.x+"%",top:E.y+"%"})}
                  @pointerdown=${t=>this._alignStartGesture(t,"rotate",F)}
                  @pointermove=${t=>this._alignGestureMove(t)}
                  @pointerup=${t=>this._alignGestureEnd(t)}
                  @pointercancel=${t=>this._alignGestureEnd(t)}>
                  <ha-icon icon="mdi:rotate-3d-variant"></ha-icon>
                </div>
              `}
            </div>
          </div>
          <div class="align-side-panel">
            <div class="align-field-row align-field-row--opacity">
              <label>Floorplan<span>%</span></label>
              <input type="range" min="0" max="100" step="5"
                .value=${String(Math.round(100*t.layers.floor))}
                @input=${t=>this._alignSetLayerOpacity("floor",t.target.value)}
                @change=${()=>this._alignRefocusOverlay()} />
            </div>
            <div class="align-field-row align-field-row--opacity">
              <label>Vacuum map<span>%</span></label>
              <input type="range" min="0" max="100" step="5"
                .value=${String(Math.round(100*t.layers.rawMap))}
                @input=${t=>this._alignSetLayerOpacity("rawMap",t.target.value)}
                @change=${()=>this._alignRefocusOverlay()} />
            </div>
            ${this._themed()?zt`
              <div class="align-field-row align-field-row--check">
                <label title="Each vacuum's map in its own colour, background removed — easier to see what lines up with what">
                  <input type="checkbox" .checked=${this._veTint}
                    @change=${t=>{this._veTint=t.target.checked,this._alignRefocusOverlay()}} />
                  Tint maps in vacuum colour
                </label>
              </div>`:Ht}
            <div class="align-field-row">
              <label>Rotation<span>°</span></label>
              <input type="number" step="0.1" .value=${String(Math.round(100*u.rotation)/100)}
                ?disabled=${T} @change=${t=>this._alignSetField("rotation",t.target.value)} />
            </div>
            <div class="align-field-row">
              <label>Scale${null!=u.scaleY?this._alignFieldArrow(!0,u.rotation+this._alignView.rot):Ht}<span>%</span></label>
              <input type="number" step="0.1" min="1" .value=${String(Math.round(100*u.scale)/100)}
                ?disabled=${T} @change=${t=>this._alignSetField("scale",t.target.value)} />
            </div>
            <div class="align-field-row align-field-row--check">
              <label>
                <input type="checkbox" .checked=${null!=u.scaleY} ?disabled=${T}
                  @change=${t=>this._alignToggleScaleY(t.target.checked)} />
                Independent Y scale
              </label>
            </div>
            ${null!=u.scaleY?zt`
              <div class="align-field-row">
                <label>Scale${this._alignFieldArrow(!1,u.rotation+this._alignView.rot)}<span>%</span></label>
                <input type="number" step="0.1" min="1" .value=${String(Math.round(100*u.scaleY)/100)}
                  ?disabled=${T} @change=${t=>this._alignSetField("scaleY",t.target.value)} />
              </div>
            `:Ht}
            <div class="align-field-row">
              <label>Offset${this._alignFieldArrow(!0,this._alignView.rot)}<span>%</span></label>
              <input type="number" step="0.01" .value=${String(Math.round(1e4*u.offset_x)/1e4)}
                ?disabled=${T} @change=${t=>this._alignSetField("offset_x",t.target.value)} />
            </div>
            <div class="align-field-row">
              <label>Offset${this._alignFieldArrow(!1,this._alignView.rot)}<span>%</span></label>
              <input type="number" step="0.01" .value=${String(Math.round(1e4*u.offset_y)/1e4)}
                ?disabled=${T} @change=${t=>this._alignSetField("offset_y",t.target.value)} />
            </div>
            <div class="align-side-panel-divider"></div>
            <div class="section-title">Appearance</div>
            <div class="align-field-row align-field-row--check">
              <label>
                <input type="checkbox" .checked=${!!m.hide_map} ?disabled=${T}
                  @change=${t=>this._alignSetAppearanceField("hide_map",t.target.checked)} />
                Hide vacuum map (show only floorplan + robot/path)
              </label>
            </div>
            <div class="align-field-row align-field-row--opacity">
              <label>Overlay opacity<span>%</span></label>
              <input type="range" min="0" max="100" step="5"
                ?disabled=${T} .value=${String(m.overlay_opacity??55)}
                @input=${t=>this._alignSetAppearanceField("overlay_opacity",Number(t.target.value))} />
            </div>
            <div class="align-field-row">
              <label>Overlay blend</label>
              <select ?disabled=${T} .value=${m.overlay_blend??"normal"}
                @change=${t=>this._alignSetAppearanceField("overlay_blend",t.target.value)}>
                <option value="normal">normal</option>
                <option value="lighten">lighten</option>
                <option value="screen">screen</option>
                <option value="plus-lighter">plus-lighter</option>
              </select>
            </div>
            ${this._veHexColorField("Path colour",m.path_color??void 0,T,t=>this._alignSetAppearanceField("path_color",t||null),this._color(e))}
            <div class="align-field-row align-field-row--opacity">
              <label>Path width<span>%</span></label>
              <input type="range" min="20" max="300" step="10"
                ?disabled=${T} .value=${String(m.path_width??100)}
                @input=${t=>this._alignSetAppearanceField("path_width",Number(t.target.value))} />
            </div>
            ${this._veHexColorField("Mop band colour",m.mop_path_color??void 0,T,t=>this._alignSetAppearanceField("mop_path_color",t||null),"#40a9ff")}
            <div class="align-field-row align-field-row--opacity">
              <label>Mop band opacity<span>%</span></label>
              <input type="range" min="0" max="100" step="5"
                ?disabled=${T} .value=${String(m.mop_band_opacity??28)}
                @input=${t=>this._alignSetAppearanceField("mop_band_opacity",Number(t.target.value))} />
            </div>
            <div class="align-field-row align-field-row--opacity">
              <label>Mop band width<span>%</span></label>
              <input type="range" min="20" max="400" step="10"
                ?disabled=${T} .value=${String(m.mop_band_width??100)}
                @input=${t=>this._alignSetAppearanceField("mop_band_width",Number(t.target.value))} />
            </div>
            ${e.image?zt`
              <div class="align-field-row align-field-row--check">
                <label>
                  <input type="checkbox" .checked=${!!m.robot_image_on_map} ?disabled=${T}
                    @change=${t=>this._alignSetAppearanceField("robot_image_on_map",t.target.checked)} />
                  Robot image on map (uses status image)
                </label>
              </div>
              ${m.robot_image_on_map?zt`
                <div class="align-field-row align-field-row--opacity">
                  <label>Robot image size<span>%</span></label>
                  <input type="range" min="40" max="220" step="10"
                    ?disabled=${T} .value=${String(m.robot_size??100)}
                    @input=${t=>this._alignSetAppearanceField("robot_size",Number(t.target.value))} />
                </div>
                <div class="align-field-row align-field-row--opacity">
                  <label>Robot image rotation<span>°</span></label>
                  <input type="range" min="-180" max="180" step="15"
                    ?disabled=${T} .value=${String(m.robot_image_rotation??0)}
                    @input=${t=>this._alignSetAppearanceField("robot_image_rotation",Number(t.target.value))} />
                </div>
              `:Ht}
            `:Ht}
          </div>
        </div>
    `}_renderRoomsTool(t,e){const{w:o,h:s}=this._alignSceneSize(),l=this._roomsSession;if(!l)return zt`<div class="align-body"></div>`;const h=this._config.image_base?.src===t.floorplan?this._config.image_base:this._config.vacuums.find(e=>e.image_base?.src===t.floorplan)?.image_base??e.image_base,d=l.styleDraft,p=Object.values(this.hass?.areas??{}),u=l.selected,m=u?l.rooms[u]:void 0,_=this._roomsDrawGesture;return zt`
        <div class="align-body">
          <div class="align-canvas"
            @wheel=${t=>this._alignWheel(t)}
            @pointerdown=${t=>this._roomsCanvasPointerDown(t)}
            @pointermove=${t=>this._roomsCanvasPointerMove(t)}
            @pointerup=${t=>this._roomsCanvasPointerUp(t)}
            @pointercancel=${t=>this._roomsCanvasPointerUp(t)}>
            <div class="align-scene ${l.drawingNew?"align-scene--drawing":""}" style=${Yt({width:o+"px",height:s+"px",transform:this._alignViewTransformCss()})}>
              ${h?.src?zt`<img class="align-floorplan-img" src=${h.src} alt="Floorplan"
                  @load=${this._onFloorplanLoad}
                  style=${Yt({transform:"translate("+(h.offset_x??0)+"%,"+(h.offset_y??0)+"%) rotate("+(h.rotation??0)+"deg) scale("+(h.scale??100)/100+")"})} />`:Ht}
              ${Object.entries(l.rooms).map(([t,e])=>{const o=t===u,s=this._roomDisplayName(t);return zt`
                  <div class="rooms-rect ${o?"rooms-rect--selected":""}" title=${s}
                    style=${Yt({left:e.x+"%",top:e.y+"%",width:e.w+"%",height:e.h+"%",borderWidth:(o?d.border_selected:d.border_normal)+"px"})}
                    @pointerdown=${e=>this._roomsStartGesture(e,t,"move")}
                    @pointermove=${t=>this._roomsGestureMove(t)}
                    @pointerup=${()=>this._roomsGestureEnd()}
                    @pointercancel=${()=>this._roomsGestureEnd()}>
                    <span class="rooms-rect-label">${s}</span>
                    ${o?["nw","ne","sw","se"].map(e=>zt`
                      <div class="align-handle align-handle--corner rooms-handle--${e}"
                        @pointerdown=${o=>this._roomsStartGesture(o,t,"resize",e)}
                        @pointermove=${t=>this._roomsGestureMove(t)}
                        @pointerup=${()=>this._roomsGestureEnd()}
                        @pointercancel=${()=>this._roomsGestureEnd()}>
                      </div>
                    `):Ht}
                  </div>`})}
              ${_?(()=>{const t=_.startPt,e=_.curPt??_.startPt,o=(t.x+e.x)/2,s=(t.y+e.y)/2,l=Math.abs(e.x-t.x),h=Math.abs(e.y-t.y);return zt`<div class="rooms-rect rooms-rect--drawing"
                  style=${Yt({left:o+"%",top:s+"%",width:l+"%",height:h+"%"})}></div>`})():Ht}
            </div>
          </div>
          <div class="align-side-panel">
            <button class="align-btn ${l.drawingNew?"align-btn--armed":""}"
              style="width:auto;align-self:flex-start;padding:0 10px;gap:6px" @click=${()=>this._roomsArmDraw()}>
              <ha-icon icon="mdi:vector-square-plus"></ha-icon>
              <span>${l.drawingNew?"Click-drag on the map…":"Add room"}</span>
            </button>
            <div class="align-side-panel-divider"></div>
            <div class="section-title">Border width</div>
            <div class="align-field-row">
              <label>Normal<span>px</span></label>
              <input type="number" step="0.5" min="0" max="12" .value=${String(d.border_normal)}
                @change=${t=>this._roomsSetStyle("border_normal",t.target.value)} />
            </div>
            <div class="align-field-row">
              <label>Selected<span>px</span></label>
              <input type="number" step="0.5" min="0" max="12" .value=${String(d.border_selected)}
                @change=${t=>this._roomsSetStyle("border_selected",t.target.value)} />
            </div>
            <div class="align-side-panel-divider"></div>
            ${u&&m?zt`
              <div class="section-title">${this._roomDisplayName(u)}</div>
              ${["x","y","w","h"].map(t=>zt`
                <div class="align-field-row">
                  <label>${{x:"Centre X",y:"Centre Y",w:"Width",h:"Height"}[t]}<span>%</span></label>
                  <input type="number" step="0.1" min=${"w"===t||"h"===t?1:0} max="100"
                    .value=${String(Math.round(10*m[t])/10)}
                    @change=${e=>this._roomsSetGeom(u,t,e.target.value)} />
                </div>`)}
              ${m.isNew?zt`
                <div class="align-field-row align-field-row--color">
                  <label>Key</label>
                  <input type="text" class="align-color-text" .value=${u}
                    @change=${t=>this._roomsRenameKey(u,t.target.value)} />
                </div>
              `:Ht}
              <div class="align-field-row align-field-row--color">
                <label>Area</label>
                <select class="align-color-text"
                  @change=${t=>this._roomsSetAreaId(u,t.target.value)}>
                  <option value="">— not mapped —</option>
                  ${[...p].sort((t,e)=>t.name.localeCompare(e.name)).map(t=>zt`
                    <option value=${t.area_id} ?selected=${t.area_id===m.areaId}>${t.name}</option>
                  `)}
                </select>
              </div>
              ${m.isNew?zt`
                <button class="align-btn" style="width:auto;align-self:flex-start;padding:0 10px;gap:6px"
                  @click=${()=>this._roomsRequestDelete(u)}>
                  <ha-icon icon="mdi:delete"></ha-icon><span>Delete room</span>
                </button>
              `:zt`<div class="rooms-side-note">A config-defined room's key can't be renamed or deleted here — use the Config editor.</div>`}
            `:zt`<div class="rooms-side-note">Click a room to select it, or "Add room" to draw a new one.</div>`}
          </div>
        </div>
        ${this._roomsDeleteConfirm?zt`
          <div class="align-confirm-backdrop">
            <div class="align-confirm-panel">
              <div class="align-confirm-title">Delete room?</div>
              <div class="align-confirm-body">"${this._roomsDeleteConfirm}" will be removed once you Save.</div>
              <div class="align-confirm-actions">
                <button class="align-btn align-confirm-keep" @click=${()=>this._roomsDismissDelete()}>Cancel</button>
                <button class="align-btn align-confirm-discard" @click=${()=>this._roomsConfirmDelete()}>Delete</button>
              </div>
            </div>
          </div>
        `:Ht}
    `}_renderFloorplanTool(t){const e=this._floorplanMode,o=this._alignReadOnly(),s=this._homeCalibEligible(t),l=this._recropEligible(t);return zt`
      <div class="ve-subtab-row">
        <button class="ve-subtab ${"geo"===e?"on":""}"
          @click=${()=>this._setFloorplanMode("geo")}>${l?"Re-crop":"Geometry"}</button>
        <button class="ve-subtab ${"calib"===e?"on":""}" ?disabled=${o}
          title=${o?"Read-only — aligned by home frame, nothing to calibrate":""}
          @click=${()=>this._setFloorplanMode("calib")}>Calibrate (2+ points)</button>
        ${s?zt`
          <button class="ve-subtab ${"home"===e?"on":""}"
            @click=${()=>this._setFloorplanMode("home")}>Home frame</button>
        `:Ht}
      </div>
      ${"calib"===e?this._renderFloorplanCalibTool(t):"home"===e?this._renderFloorplanHomeTool(t):l?this._renderRecropTool(t):this._renderFloorplanGeoTool(t)}
    `}_renderFloorplanGeoTool(t){const{w:e,h:o}=this._alignSceneSize(),s=t.draft,corner=(t,l)=>this._alignCornerPct(s,t,l,e,o),l=corner(0,0),h=corner(1,0),d=corner(0,1),p=corner(1,1),u={x:50+s.offset_x,y:50+s.offset_y},m=this._alignCornerPct(s,.5,-.18,e,o),_=this._config.vacuums.filter(e=>resolveImageBaseSrc(this._config,e)===t.floorplan&&this._intAttrs(e));return zt`
        <div class="align-body">
          <div class="align-canvas"
            @wheel=${t=>this._alignWheel(t)}
            @pointerdown=${t=>this._alignBgPointerDown(t)}
            @pointermove=${t=>this._alignBgPointerMove(t)}
            @pointerup=${t=>this._alignBgPointerUp(t)}
            @pointercancel=${t=>this._alignBgPointerUp(t)}>
            <div class="align-scene" style=${Yt({width:e+"px",height:o+"px",transform:this._alignViewTransformCss()})}>
              ${_.map(t=>{const e=this._mapEntityFor(t),o=e?this._tinted(this._mapUrl(e),this._color(t)):null,s=this._effectiveSeat(t);return zt`
                  <div class="align-ghost">
                    ${o?zt`<img class="align-seat-img" src=${o} alt=""
                        style=${Yt({left:50+s.offset_x+"%",top:50+s.offset_y+"%",width:s.scale+"%",transform:"translate(-50%,-50%) "+seatRotateScaleCss(s.rotation,s.scale,s.scaleY)})} />`:Ht}
                    ${this._renderIntegrationOverlay(t,s,"both")}
                  </div>`})}
              <div class="align-seat-layer"
                @pointerdown=${t=>this._floorGeoStartGesture(t,"drag")}
                @pointermove=${t=>this._floorGeoGestureMove(t)}
                @pointerup=${t=>this._floorGeoGestureEnd(t)}
                @pointercancel=${t=>this._floorGeoGestureEnd(t)}>
                <img class="align-seat-img" src=${t.floorplan} alt="Floorplan"
                  @load=${this._onFloorplanLoad}
                  style=${Yt({left:50+s.offset_x+"%",top:50+s.offset_y+"%",width:s.scale+"%",transform:"translate(-50%,-50%) rotate("+s.rotation+"deg)"})} />
              </div>
              <svg class="align-gizmo" viewBox="0 0 100 100" preserveAspectRatio="none">
                <line x1=${u.x} y1=${u.y} x2=${m.x} y2=${m.y} class="align-gizmo-arm" />
                <polygon points="${l.x},${l.y} ${h.x},${h.y} ${p.x},${p.y} ${d.x},${d.y}" class="align-gizmo-box" />
              </svg>
              ${[["nw",l],["ne",h],["se",p],["sw",d]].map(([t,e])=>zt`
                <div class="align-handle align-handle--corner" data-corner=${t}
                  style=${Yt({left:e.x+"%",top:e.y+"%"})}
                  @pointerdown=${e=>{const o="nw"===t?p:"ne"===t?d:"se"===t?l:h;this._floorGeoStartGesture(e,"scale",o)}}
                  @pointermove=${t=>this._floorGeoGestureMove(t)}
                  @pointerup=${t=>this._floorGeoGestureEnd(t)}
                  @pointercancel=${t=>this._floorGeoGestureEnd(t)}>
                </div>
              `)}
              <div class="align-axis-hint align-axis-hint--x" title="Offset X"
                style=${Yt({left:u.x+7+"%",top:u.y+"%"})}>
                <ha-icon icon="mdi:arrow-left-right"></ha-icon>
              </div>
              <div class="align-axis-hint align-axis-hint--y" title="Offset Y"
                style=${Yt({left:u.x+"%",top:u.y-7+"%"})}>
                <ha-icon icon="mdi:arrow-up-down"></ha-icon>
              </div>
              <div class="align-handle align-handle--rotate"
                style=${Yt({left:m.x+"%",top:m.y+"%"})}
                @pointerdown=${t=>this._floorGeoStartGesture(t,"rotate",u)}
                @pointermove=${t=>this._floorGeoGestureMove(t)}
                @pointerup=${t=>this._floorGeoGestureEnd(t)}
                @pointercancel=${t=>this._floorGeoGestureEnd(t)}>
                <ha-icon icon="mdi:rotate-3d-variant"></ha-icon>
              </div>
            </div>
          </div>
          <div class="align-side-panel">
            <div class="align-field-row">
              <label>Rotation<span>°</span></label>
              <input type="number" step="0.1" .value=${String(Math.round(100*s.rotation)/100)}
                @change=${t=>this._floorGeoSetField("rotation",t.target.value)} />
            </div>
            <div class="align-field-row">
              <label>Scale<span>%</span></label>
              <input type="number" step="0.1" min="1" .value=${String(Math.round(100*s.scale)/100)}
                @change=${t=>this._floorGeoSetField("scale",t.target.value)} />
            </div>
            <div class="align-field-row">
              <label>Offset ↔<span>%</span></label>
              <input type="number" step="0.01" .value=${String(Math.round(1e4*s.offset_x)/1e4)}
                @change=${t=>this._floorGeoSetField("offset_x",t.target.value)} />
            </div>
            <div class="align-field-row">
              <label>Offset ↕<span>%</span></label>
              <input type="number" step="0.01" .value=${String(Math.round(1e4*s.offset_y)/1e4)}
                @change=${t=>this._floorGeoSetField("offset_y",t.target.value)} />
            </div>
            <div class="rooms-side-note">Drag the floorplan itself, or a corner/rotate handle. Every vacuum
              sharing this floorplan is shown dimmed underneath, unedited, as a reference.</div>
            ${this._renderFloorplanSnapshotSection(t)}
          </div>
        </div>
    `}_renderRecropTool(t){const{w:e,h:o}=this._alignSceneSize(),s=this._recropDraft,l=this._recropOldCrop(t),h=this._recropGhostVacuums(),d=h[0],p=d?this._roomsFor(d):[],corner=(t,l)=>this._alignCornerPct(s,t,l,e,o),u=corner(0,0),m=corner(1,0),_=corner(0,1),f=corner(1,1),v=l?function canvasScaleForCrop(t,e){if(!t||!e)return null;const o=e.x1-e.x0,s=e.y1-e.y0;if(!(o>0&&s>0&&t.w>0&&t.h>0))return null;if(Math.abs(t.w-o)<=2&&Math.abs(t.h-s)<=2)return 1;const l=t.w/t.h,h=o/s;return Math.abs(l/h-1)>.003?null:(t.w/o+t.h/s)/2}(this._recropNat,l):null;return zt`
        <div class="align-body">
          <div class="align-canvas"
            @wheel=${t=>this._alignWheel(t)}
            @pointerdown=${t=>this._alignBgPointerDown(t)}
            @pointermove=${t=>this._alignBgPointerMove(t)}
            @pointerup=${t=>this._alignBgPointerUp(t)}
            @pointercancel=${t=>this._alignBgPointerUp(t)}>
            <div class="align-scene" style=${Yt({width:e+"px",height:o+"px",transform:this._alignViewTransformCss()})}>
              <img class="align-floorplan-img" src=${t.floorplan} alt="Floorplan"
                @load=${t=>{const e=t.target;e.naturalWidth&&e.naturalHeight&&(this._recropNat?.w!==e.naturalWidth||this._recropNat?.h!==e.naturalHeight)&&(this._recropNat={w:e.naturalWidth,h:e.naturalHeight})}} />
              ${l&&h.length?zt`
                <div class="recrop-ghost"
                  style=${Yt({transform:`translate(${s.offset_x}%, ${s.offset_y}%) scale(${s.scale/100})`})}
                  @pointerdown=${t=>this._recropStartGesture(t,"drag")}
                  @pointermove=${t=>this._recropGestureMove(t)}
                  @pointerup=${t=>this._recropGestureEnd(t)}
                  @pointercancel=${t=>this._recropGestureEnd(t)}>
                  ${p.map(t=>null==t.map_x||null==t.map_y||null==t.map_w||null==t.map_h?Ht:zt`
                    <div class="rooms-rect recrop-rect"
                      style=${Yt({left:t.map_x+"%",top:t.map_y+"%",width:t.map_w+"%",height:t.map_h+"%"})}>
                      <span class="rooms-rect-label">${t.name??t.key}</span>
                    </div>
                  `)}
                  ${h.map(t=>this._renderHomeFrameOverlay(t,l,"both"))}
                </div>
                <svg class="align-gizmo" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <polygon points="${u.x},${u.y} ${m.x},${m.y} ${f.x},${f.y} ${_.x},${_.y}" class="align-gizmo-box" />
                </svg>
                ${[["nw",u],["ne",m],["se",f],["sw",_]].map(([t,e])=>zt`
                  <div class="align-handle align-handle--corner" data-corner=${t}
                    style=${Yt({left:e.x+"%",top:e.y+"%"})}
                    @pointerdown=${e=>{const o="nw"===t?f:"ne"===t?_:"se"===t?u:m;this._recropStartGesture(e,"scale",o)}}
                    @pointermove=${t=>this._recropGestureMove(t)}
                    @pointerup=${t=>this._recropGestureEnd(t)}
                    @pointercancel=${t=>this._recropGestureEnd(t)}>
                  </div>
                `)}
              `:Ht}
            </div>
          </div>
          <div class="align-side-panel">
            ${l?h.length?Ht:zt`
              <div class="rooms-side-note">No vacuum is currently registered into this home frame — there's
                nothing live to drag against right now. Re-open this tool once at least one is back online.</div>
            `:zt`
              <div class="rooms-side-note">No usable <code>crop_box</code> found on this floorplan — nothing
                to re-crop.</div>
            `}
            ${this._recropNat&&l?zt`
              <div class="rooms-side-note">
                ${null==v?zt`⚠️ This file (${this._recropNat.w}×${this._recropNat.h}px) no longer matches its
                      recorded crop (${Math.round(l.x1-l.x0)}×${Math.round(l.y1-l.y0)}px)
                      — it was re-cropped or re-exported at a different extent. Drag/scale the rooms below onto
                      their real spots in the picture, then Save.`:Math.abs(v-1)<.01?zt`✅ This file still matches its recorded crop exactly.`:zt`ℹ️ This file is a ${v.toFixed(2)}× uniform re-export of its recorded crop —
                        still valid, no re-crop needed.`}
              </div>
            `:Ht}
            <div class="align-field-row">
              <label>Shift ↔<span>%</span></label>
              <input type="number" step="0.01" .value=${String(Math.round(1e4*s.offset_x)/1e4)}
                @change=${t=>this._recropSetField("offset_x",t.target.value)} />
            </div>
            <div class="align-field-row">
              <label>Shift ↕<span>%</span></label>
              <input type="number" step="0.01" .value=${String(Math.round(1e4*s.offset_y)/1e4)}
                @change=${t=>this._recropSetField("offset_y",t.target.value)} />
            </div>
            <div class="align-field-row">
              <label>Scale<span>%</span></label>
              <input type="number" step="0.1" min="1" .value=${String(Math.round(100*s.scale)/100)}
                @change=${t=>this._recropSetField("scale",t.target.value)} />
            </div>
            <div class="rooms-side-note">The picture stays fixed — drag/scale the rooms &amp; robots on top of
              it instead, until they sit exactly where they really are, then Save. This recomputes
              <code>crop_box</code> alone; nothing else about this floorplan changes.</div>
            ${this._renderFloorplanSnapshotSection(t)}
          </div>
        </div>
    `}_renderFloorplanSnapshotSection(t){const e=this._alignVac(),o=e?.name||e?.entity||"this vacuum",s=this._floorplanSnapshotServiceAvailable();return zt`
      <div class="align-side-panel-divider"></div>
      <div class="section-title">Snapshot / acquisition</div>
      <button class="align-btn" style="width:auto;padding:0 10px;gap:6px"
        ?disabled=${this._floorplanSnapshotBusy||!s||!e||!this._mapEntityFor(e)}
        @click=${()=>this._snapshotMapAsFloorplan()}>
        <ha-icon icon="mdi:camera"></ha-icon>
        <span>${this._floorplanSnapshotBusy?"Snapshotting…":`Re-snapshot ${o}'s map as floorplan`}</span>
      </button>
      <div class="rooms-side-note">Replaces this floorplan's Image src with a fresh capture of
        ${o}'s current map, re-places its own rooms onto the new crop by name, and turns
        "Hide vacuum map" on for every vacuum sharing this floorplan. Geometry above and any
        existing calibration are carried through unchanged — re-align/re-calibrate afterwards
        if the new capture doesn't line up.</div>
      ${this._floorplanSnapshotError?zt`<div class="floor-calib-error">${this._floorplanSnapshotError}</div>`:Ht}
      ${this._placeRoomsResult?zt`
        <div class="rooms-side-note">✅ Rooms placed: <strong>${this._placeRoomsResult.placed}</strong> updated,
          <strong>${this._placeRoomsResult.added}</strong> added.</div>
      `:Ht}
      <button class="align-btn" style="width:auto;padding:0 10px;gap:6px"
        ?disabled=${this._homeFrameSnapshotBusy||!s}
        @click=${()=>this._snapshotHomeFrameAsFloorplan()}>
        <ha-icon icon="mdi:home-map-marker"></ha-icon>
        <span>${this._homeFrameSnapshotBusy?"Snapshotting…":"Re-snapshot home frame as floorplan"}</span>
      </button>
      <div class="rooms-side-note">Replaces this floorplan's Image src with a fresh composite of every
        vacuum currently registered into the shared home frame. No room placement (home-frame rooms
        compute live) — just the image and its identity crop.</div>
      ${this._homeFrameSnapshotError?zt`<div class="floor-calib-error">${this._homeFrameSnapshotError}</div>`:Ht}
      <div class="align-side-panel-divider"></div>
      <button class="align-btn" style="width:auto;padding:0 10px;gap:6px"
        ?disabled=${this._guideExportBusy||!this._guideExportServiceAvailable()||!e||!this._mapEntityFor(e)}
        @click=${()=>this._exportGuideLayers()}>
        <ha-icon icon="mdi:layers-outline"></ha-icon>
        <span>${this._guideExportBusy?"Exporting…":`Export ${o}'s guide layers`}</span>
      </button>
      <div class="rooms-side-note">Renders wall/floor guide layers for a photo overlay in an external
        image editor — no config changes at all.</div>
      ${this._guideExportError?zt`<div class="floor-calib-error">${this._guideExportError}</div>`:Ht}
      ${this._guideExportResult?zt`
        <div class="rooms-side-note">✅ ${Object.keys(this._guideExportResult.paths).length} layer(s) at
          ${this._guideExportResult.size.w}×${this._guideExportResult.size.h}px:
          ${Object.entries(this._guideExportResult.paths).map(([t,e])=>zt`
            <div><code>${t}</code>: ${e}</div>
          `)}
        </div>
      `:Ht}
    `}_floorCalibCanvasPointerDown(t){"calib"===this._floorplanMode&&"floor"===this._floorCalib?.phase?(this._alignRefocusOverlay(),this._floorCalibDragStart={pointerId:t.pointerId,x0:t.clientX,y0:t.clientY},this._alignBgPointerDown(t)):this._alignBgPointerDown(t)}_floorCalibCanvasPointerMove(t){this._alignBgPointerMove(t)}_floorCalibCanvasPointerUp(t){const e=this._floorCalibDragStart;this._floorCalibDragStart=null,this._alignBgPointerUp(t),e&&e.pointerId===t.pointerId&&Math.hypot(t.clientX-e.x0,t.clientY-e.y0)<=12&&this._floorCalibFloorClick(t)}_homeCalibCanvasPointerDown(t){"home"===this._floorplanMode&&"floor"===this._homeCalib?.phase?(this._alignRefocusOverlay(),this._homeCalibDragStart={pointerId:t.pointerId,x0:t.clientX,y0:t.clientY},this._alignBgPointerDown(t)):this._alignBgPointerDown(t)}_homeCalibCanvasPointerMove(t){this._alignBgPointerMove(t)}_homeCalibCanvasPointerUp(t){const e=this._homeCalibDragStart;this._homeCalibDragStart=null,this._alignBgPointerUp(t),e&&e.pointerId===t.pointerId&&Math.hypot(t.clientX-e.x0,t.clientY-e.y0)<=12&&this._onHomeCalibFloorClick(t)}_renderFloorplanCalibTool(t){const{w:e,h:o}=this._alignSceneSize(),s=t.draft,l=this._floorCalib,h=this._alignVac(),d=h?this._mapEntityFor(h):void 0,p=d?this._mapUrl(d):null,u=this._alignReadOnly(),m=l?Math.min(l.rawPts.length,l.floorPts.length):0,_=l?this._floorCalibPreview(l):null,f=!!l&&l.rawPts.length>=6,v=!l||"raw"===l.phase;return zt`
        <div class="align-body">
          <div class="align-canvas"
            @wheel=${t=>this._alignWheel(t)}
            @pointerdown=${t=>this._floorCalibCanvasPointerDown(t)}
            @pointermove=${t=>this._floorCalibCanvasPointerMove(t)}
            @pointerup=${t=>this._floorCalibCanvasPointerUp(t)}
            @pointercancel=${t=>this._floorCalibCanvasPointerUp(t)}>
            <div class="align-scene" style=${Yt({width:e+"px",height:o+"px",transform:this._alignViewTransformCss()})}>
              <img class="align-seat-img" src=${t.floorplan} alt="Floorplan"
                @load=${this._onFloorplanLoad}
                style=${Yt({left:50+s.offset_x+"%",top:50+s.offset_y+"%",width:s.scale+"%",transform:"translate(-50%,-50%) rotate("+s.rotation+"deg)"})} />
              ${(l?.floorPts??[]).map((t,e)=>zt`
                <div class="calib-marker" style=${Yt({left:t.x+"%",top:t.y+"%"})}>${e+1}</div>
              `)}
            </div>
          </div>
          <div class="align-side-panel">
            ${u?zt`
              <div class="rooms-side-note">Read-only — this vacuum is aligned by the home frame, there's
                nothing to calibrate here.</div>
            `:l?zt`
              <div class="floor-calib-banner ${v?"floor-calib-banner--raw":"floor-calib-banner--floor"}">
                ${v?f?zt`<strong>${6} points</strong> — that's the max. Save below, or undo a point.`:zt`<strong>Point ${m+1}:</strong> click a distinctive spot (e.g. a room corner)
                        on this vacuum's OWN map below.`:zt`<strong>Point ${m+1}:</strong> click the SAME physical point on the floorplan
                    on the left — zoom/pan it first if you need to.`}
                ${_?zt`<div>Fit error with ${m} point${1===m?"":"s"}:
                  <strong>${_.residual_pct}%</strong></div>`:Ht}
              </div>
              <div class="section-title">This vacuum's own map</div>
              ${p?zt`
                <div class="floor-calib-inset ${v?"floor-calib-inset--active":""}"
                  @click=${t=>this._floorCalibRawClick(t)}>
                  <img src=${p} alt="Vacuum map"
                    @load=${t=>{const e=t.target;e.naturalWidth&&e.naturalHeight&&(this._floorCalibRefNat?.w!==e.naturalWidth||this._floorCalibRefNat?.h!==e.naturalHeight)&&(this._floorCalibRefNat={w:e.naturalWidth,h:e.naturalHeight})}} />
                  ${l.rawPts.map((t,e)=>this._floorCalibRefNat?zt`
                    <div class="calib-marker" style=${Yt({left:t.x/this._floorCalibRefNat.w*100+"%",top:t.y/this._floorCalibRefNat.h*100+"%"})}>${e+1}</div>
                  `:Ht)}
                </div>
              `:zt`<div class="rooms-side-note">No map image for this vacuum right now.</div>`}
              <div class="align-side-panel-divider"></div>
              <div style="display:flex;gap:8px;flex-wrap:wrap">
                ${l.rawPts.length>0||l.floorPts.length>0?zt`
                  <button class="align-btn" style="width:auto;padding:0 10px;gap:6px" @click=${()=>this._floorCalibUndoPoint()}>
                    <ha-icon icon="mdi:undo"></ha-icon><span>Undo point</span>
                  </button>
                `:Ht}
                <button class="align-btn" style="width:auto;padding:0 10px;gap:6px" @click=${()=>this._floorCalibCancel()}>
                  <ha-icon icon="mdi:close"></ha-icon><span>Cancel</span>
                </button>
              </div>
              ${this._floorCalibError?zt`
                <div class="floor-calib-error">${this._floorCalibError}</div>
              `:Ht}
              <div class="align-side-panel-divider"></div>
              <div class="rooms-side-note">Click the SAME physical point twice — once on this vacuum's own
                map, once on the floorplan — for at least 2 pairs (up to ${6}). More,
                well-spread pairs average out click imprecision. Save writes a manual seat for THIS vacuum
                only — other vacuums sharing this floorplan are unaffected.</div>
            `:Ht}
          </div>
        </div>
    `}_renderFloorplanHomeTool(t){const{w:e,h:o}=this._alignSceneSize(),s=t.draft,l=this._homeCalib,h=this._floorplanCardImageBase(),d=h?.home_anchors,p=l?Math.min(l.homePts.length,l.floorPts.length):0,u=l?this._homeCalibPreview(l):null,m=!!l&&l.homePts.length>=6,_=!l||"frame"===l.phase,f=this._homeCalibCrop;return zt`
        <div class="align-body">
          <div class="align-canvas"
            @wheel=${t=>this._alignWheel(t)}
            @pointerdown=${t=>this._homeCalibCanvasPointerDown(t)}
            @pointermove=${t=>this._homeCalibCanvasPointerMove(t)}
            @pointerup=${t=>this._homeCalibCanvasPointerUp(t)}
            @pointercancel=${t=>this._homeCalibCanvasPointerUp(t)}>
            <div class="align-scene" style=${Yt({width:e+"px",height:o+"px",transform:this._alignViewTransformCss()})}>
              <img class="align-seat-img" src=${t.floorplan} alt="Floorplan"
                @load=${this._onFloorplanLoad}
                style=${Yt({left:50+s.offset_x+"%",top:50+s.offset_y+"%",width:s.scale+"%",transform:"translate(-50%,-50%) rotate("+s.rotation+"deg)"})} />
              ${(l?.floorPts??[]).map((t,e)=>zt`
                <div class="calib-marker" style=${Yt({left:t.x+"%",top:t.y+"%"})}>${e+1}</div>
              `)}
            </div>
          </div>
          <div class="align-side-panel">
            ${l?zt`
              <div class="floor-calib-banner ${_?"floor-calib-banner--raw":"floor-calib-banner--floor"}">
                ${_?m?zt`<strong>${6} points</strong> — that's the max. Save below, or undo a point.`:zt`<strong>Point ${p+1}:</strong> click a distinctive spot (e.g. a wall corner)
                        on the home frame below.${this._homeCalibBusy?" Snapping…":""}`:zt`<strong>Point ${p+1}:</strong> click the SAME physical point on the floorplan
                    on the left — zoom/pan it first if you need to.`}
                ${u?zt`<div>Fit error with ${p} point${1===p?"":"s"}:
                  <strong>${u.residual_pct}%</strong></div>`:Ht}
              </div>
              <div class="section-title">Home frame (live snapshot)</div>
              <div class="floor-calib-inset ${_?"floor-calib-inset--active":""}"
                @click=${t=>this._onHomeCalibFrameClick(t)}>
                <img src=${this._homeCalibSnapshotUrl} alt="Home frame" />
                ${f?l.homePts.map((t,e)=>zt`
                  <div class="calib-marker" style=${Yt({left:(t.x-f.x0)/(f.x1-f.x0)*100+"%",top:(t.y-f.y0)/(f.y1-f.y0)*100+"%"})}>${e+1}</div>
                `):Ht}
              </div>
              <div class="align-side-panel-divider"></div>
              <div style="display:flex;gap:8px;flex-wrap:wrap">
                ${l.homePts.length>0||l.floorPts.length>0?zt`
                  <button class="align-btn" style="width:auto;padding:0 10px;gap:6px" @click=${()=>this._undoHomeCalibPoint()}>
                    <ha-icon icon="mdi:undo"></ha-icon><span>Undo point</span>
                  </button>
                `:Ht}
                <button class="align-btn" style="width:auto;padding:0 10px;gap:6px" @click=${()=>this._cancelHomeCalibration()}>
                  <ha-icon icon="mdi:close"></ha-icon><span>Cancel</span>
                </button>
              </div>
              ${this._homeCalibError?zt`
                <div class="floor-calib-error">${this._homeCalibError}</div>
              `:Ht}
              <div class="align-side-panel-divider"></div>
              <div class="rooms-side-note">Click the SAME physical point twice — once on the home frame,
                once on the floorplan — for at least 2 pairs (up to ${6}). Save
                calibrates the WHOLE shared floorplan — every vacuum registered into this home frame draws
                through it automatically, no per-vacuum seating needed.</div>
            `:zt`
              ${d?.length?zt`
                <div class="rooms-side-note">Calibrated: <strong>${d.length}</strong>
                  anchor point${d.length>1?"s":""} against frame
                  <code>${h?.home_anchors_frame_id}</code>
                  <span class="footer-link" style="margin-left:6px" @click=${()=>this._clearHomeAnchors()}>Clear</span>
                </div>
              `:Ht}
              ${this._homeCalibResult?zt`
                <div class="rooms-side-note">✅ Calibrated — fit error ${this._homeCalibResult.residual_pct}%.</div>
              `:Ht}
              <div class="section-title">Calibrate against home frame</div>
              <button class="align-btn" style="width:auto;padding:0 10px;gap:6px"
                ?disabled=${this._homeCalibBusy||!this._homeCalibServiceAvailable()}
                @click=${()=>this._startHomeCalibration()}>
                <ha-icon icon="mdi:crosshairs-gps"></ha-icon>
                <span>${this._homeCalibBusy?"Snapshotting…":"Calibrate against home frame"}</span>
              </button>
              <div class="rooms-side-note">Click the same physical point once on a live snapshot of the
                shared home frame (each click snaps to the nearest wall corner automatically) and once on
                the floorplan, repeated for at least 2 points — corners of different rooms work well. This
                re-fits itself automatically as the home frame grows over time, so there's no need to
                re-click later. Also turns "Hide vacuum map" on for every vacuum sharing this floorplan.</div>
              ${this._homeCalibError?zt`<div class="floor-calib-error">${this._homeCalibError}</div>`:Ht}
              <div class="align-side-panel-divider"></div>
              <div class="section-title">or, fiducial markers (advanced)</div>
              <button class="align-btn" style="width:auto;padding:0 10px;gap:6px"
                ?disabled=${this._fiducialSnapshotBusy||!this._fiducialServiceAvailable()}
                @click=${()=>this._snapshotHomeFrameWithFiducials()}>
                <ha-icon icon="mdi:crosshairs"></ha-icon>
                <span>${this._fiducialSnapshotBusy?"Snapshotting…":"1. Snapshot home frame with markers"}</span>
              </button>
              <div class="rooms-side-note">A third way to calibrate — skip this unless clicking through
                calibration above isn't precise enough (e.g. you need to rotate the file, not just crop or
                resize it). Saves a home-frame snapshot with 4 invisible markers baked into its border.
                ${this._fiducialSnapshotPath?zt`If this floorplan's Image src isn't already
                  <code>${this._fiducialSnapshotPath}</code>, set it from the Config editor's Global tab
                  first.`:Ht}
                Then crop, resize and/or rotate that file in an external image editor as needed (GIMP etc.),
                keep it as PNG, don't flatten it, and run step 2.</div>
              ${this._fiducialSnapshotError?zt`<div class="floor-calib-error">${this._fiducialSnapshotError}</div>`:Ht}
              ${this._fiducialKnown?zt`
                <button class="align-btn" style="width:auto;padding:0 10px;gap:6px"
                  ?disabled=${this._fiducialDetectBusy}
                  @click=${()=>this._detectFiducials()}>
                  <ha-icon icon="mdi:crosshairs-gps"></ha-icon>
                  <span>${this._fiducialDetectBusy?"Detecting…":"2. Detect markers in edited file"}</span>
                </button>
                <div class="rooms-side-note">Scans the floorplan's current Image src for the markers step 1
                  embedded and, once at least 2 of the 4 are found, calibrates from them — no clicking.</div>
                ${this._fiducialDetectError?zt`<div class="floor-calib-error">${this._fiducialDetectError}</div>`:Ht}
                ${this._fiducialDetectResult?zt`
                  <div class="rooms-side-note">✅ Found ${this._fiducialDetectResult.found}/4
                    marker${1===this._fiducialDetectResult.found?"":"s"}${this._fiducialDetectResult.missing.length?zt` (missing: ${this._fiducialDetectResult.missing.join(", ")})`:Ht}.</div>
                `:Ht}
              `:Ht}
            `}
          </div>
        </div>
    `}_renderVePlaceholder(t){return zt`
      <div class="align-body ve-placeholder-body">
        <div class="ve-placeholder">
          <ha-icon icon="mdi:hammer-wrench"></ha-icon>
          <div class="ve-placeholder-title">Floorplan & Calibrate — not available here</div>
          <div class="ve-placeholder-sub">${t}</div>
        </div>
      </div>
    `}_veHexColorField(t,e,o,s,l){const h=/^#[0-9a-fA-F]{6}$/.test(e??"")?e:l;return zt`
      <div class="align-field-row align-field-row--color">
        <label>${t}</label>
        <div class="align-color-row">
          <input type="color" class="align-color-swatch" .value=${h} ?disabled=${o}
            @input=${t=>s(t.target.value)} />
          <input type="text" class="align-color-text" .value=${e??""} placeholder=${l} ?disabled=${o}
            @change=${t=>s(t.target.value)} />
        </div>
      </div>`}_alignSetAppearanceField(t,e){const o=this._alignSession;o&&!this._alignReadOnly()&&o.appearanceDraft[t]!==e&&(this._alignSession={...o,appearanceDraft:{...o.appearanceDraft,[t]:e}})}_homeFrameCropFor(t){if(this._memoSync(),this._homeFrameMemo.has(t.entity))return this._homeFrameMemo.get(t.entity);const e=function homeFrameCropFor(t,e,o){const s="merged"===t.map_mode?t.image_base:e?.image_base,l=s?.crop_box;if(!l?.frame_id||null==l.x1||null==l.y1)return null;const h=o?.home_frame;return h?.id&&h.id===l.frame_id?{x0:l.x0,y0:l.y0,x1:l.x1,y1:l.y1}:null}(this._config,t,this._intAttrs(t));return this._homeFrameMemo.set(t.entity,e),e}_homeFrameDims(){const t=this._config.image_base?.home_anchors_frame_id,e=this._homeFrameRegistry();if(t){const o=e.get(t);if(o)return{NW:o.w,NH:o.h}}let o=null;for(const t of e.values())(!o||t.count>o.count)&&(o=t);return o?{NW:o.w,NH:o.h}:null}_homeFrameRegistry(){const t=new Map;for(const e of this._config.vacuums??[]){const o=this._intAttrs(e)?.home_frame;if(!(o?.id&&o.width_px>0&&o.height_px>0))continue;const s=t.get(o.id);s?s.count++:t.set(o.id,{w:o.width_px,h:o.height_px,count:1})}return t}_anyHomeFrameCard(){const t=this._homeFrameRegistry();let e=null;for(const[o,s]of t)(!e||s.count>e.count)&&(e={id:o,...s});return e?{id:e.id,w:e.w,h:e.h}:null}_homeAnchorFitFor(t,e){if("merged"!==this._config.map_mode)return null;if(this._homeFrameCropFor(t))return null;if(!this._intAttrs(t)?.home_frame)return null;const o=this._config.image_base?.home_anchors,s=this._homeFrameDims(),l=homeAnchorFit(o,s,e);return l&&s?{fit:l,dims:s}:null}_renderIntegrationOverlay(t,e,o="both"){const s=this._intAttrs(t);if(!s)return Ht;const l=s.image_dims;if(!l)return Ht;const h=l.scale??1;let d=(l.width??0)*h,p=(l.height??0)*h;const u=l.rotation??0;if(90===u||270===u){const t=d;d=p,p=t}if(!d||!p)return Ht;const m=Math.max(d,p)/55,_=s.vacuum_position_px,f=_?{x:_.x,y:_.y}:null;let v=null;if(f&&null!=_.a){const t=_.a*Math.PI/180;v={x:f.x+1.3*m*Math.cos(t),y:f.y-1.3*m*Math.sin(t)}}const b={left:50+(e?.offset_x??0)+"%",top:50+(e?.offset_y??0)+"%",width:(e?.scale??100)+"%",aspectRatio:d+" / "+p,transform:"translate(-50%,-50%) "+seatRotateScaleCss(e?.rotation??0,e?.scale??100,e?.scaleY)},w=this._renderVectorLayers(t,{dry:this._vecSegs(s.path_dry_px),wet:this._vecSegs(s.path_wet_px),rob:f,head:v,rr:m,digits:1,pose:_?_.x+","+_.y:"",imageRot:(_&&null!=_.a?_.a:0)+(t.robot_image_rotation??0),filterId:"avc-err-blur-"+t.entity.replace(/[^a-zA-Z0-9]/g,"-"),scaleYRatio:seatScaleYRatio(e?.scale??100,e?.scaleY)},o);return zt`<svg class="map-vector" viewBox="0 0 ${d} ${p}" preserveAspectRatio="none" style=${Yt(b)}>${w}</svg>`}_vecSegs(t,e){return Array.isArray(t)?t.map(t=>Array.isArray(t)?e?t.map(e):t:[]):[]}_renderVectorLayers(t,e,o){const{rob:s,head:l,rr:h,digits:d}=e,p=this._color(t),u=this._vacCleanType(t),m=this._layersEff(),_=m.dry&&u.dry?e.dry.map(t=>fmtPts(t,d)).filter(t=>t.length>0):[],f=m.wet&&u.wet?e.wet.map(t=>fmtPts(t,d)).filter(t=>t.length>0):[],v=.35*h*((t.path_width??100)/100),b=v.toFixed(2),w=(2.6*v*((t.mop_band_width??100)/100)).toFixed(2),$=((t.mop_band_opacity??28)/100).toFixed(2),C=t.mop_path_color||"#40a9ff",A=f.length?Tt`${f.map(t=>Tt`<polyline points=${t} fill="none" stroke=${C} stroke-width=${w} stroke-linejoin="round" stroke-linecap="round" opacity=${$}></polyline>`)}`:Ht,P=f.length?Tt`${f.map(t=>Tt`<polyline points=${t} fill="none" stroke=${C} stroke-width=${b} stroke-linejoin="round" stroke-linecap="round" opacity="0.9"></polyline>`)}`:Ht,F=t.path_color||p,E="legacy"!==(this._config.theme??se),T=(3*v).toFixed(2),O=_.length?Tt`${E?_.map(t=>Tt`<polyline points=${t} fill="none" stroke=${F} stroke-width=${T} stroke-linejoin="round" stroke-linecap="round" opacity="0.12"></polyline>`):Ht}${_.map(t=>Tt`<polyline points=${t} fill="none" stroke=${F} stroke-width=${b} stroke-linejoin="round" stroke-linecap="round" opacity="0.85"></polyline>`)}`:Ht,B=!(!t.robot_image_on_map||!t.image),G=2.6*h*((t.robot_size??100)/100),j=e.scaleYRatio??1;if(!this._themed()){const u=s?B?Tt`<image href=${t.image} x=${(s.x-G/2).toFixed(d)} y=${(s.y-G/2).toFixed(d)} width=${G.toFixed(d)} height=${G.toFixed(d)} preserveAspectRatio="xMidYMid meet" transform=${"rotate("+e.imageRot+" "+s.x.toFixed(d)+" "+s.y.toFixed(d)+")"}></image>`:Tt`${l?Tt`<line x1=${s.x.toFixed(d)} y1=${s.y.toFixed(d)} x2=${l.x.toFixed(d)} y2=${l.y.toFixed(d)} stroke="#ffffff" stroke-width=${(.3*h).toFixed(2)} stroke-linecap="round"></line>`:Ht}<circle cx=${s.x.toFixed(d)} cy=${s.y.toFixed(d)} r=${h.toFixed(d)} fill=${p} stroke="#ffffff" stroke-width=${(.18*h).toFixed(2)}></circle>`:Ht,m=s&&this._hasError(t)?Tt`<defs><filter id=${e.filterId} x="-150%" y="-150%" width="400%" height="400%">
              <feGaussianBlur stdDeviation=${(.5*h).toFixed(2)}></feGaussianBlur>
            </filter></defs>
            <circle class="avc-err-halo" cx=${s.x.toFixed(d)} cy=${s.y.toFixed(d)} r=${(2.2*h).toFixed(d)}
              fill="#ff3b30" filter=${"url(#"+e.filterId+")"}></circle>`:Ht,_=Tt`${m}${u}`,f=1!==j&&s?Tt`<g transform=${"translate("+s.x.toFixed(1)+","+s.y.toFixed(1)+") scale(1,"+(1/j).toFixed(4)+") translate("+(-s.x).toFixed(1)+","+(-s.y).toFixed(1)+")"}>${_}</g>`:_,v=Tt`${A}${P}${O}`;return"paths"===o?v:"marker"===o?f:Tt`${v}${f}`}const q=this._isCleaning(t),W=3.2*h,lastTail=t=>{for(let e=t.length-1;e>=0;e--)if(t[e].length>=2)return trailTail(t[e],W);return[]},headOf=(t,e)=>{if(t.length<2)return Ht;const o=fmtPts(t,d);return Tt`<polyline class="avc-trail-head-glow" points=${o} fill="none" stroke=${e} stroke-width=${(4*v).toFixed(2)} stroke-linejoin="round" stroke-linecap="round" opacity="0.3"></polyline><polyline class="avc-trail-head" points=${o} fill="none" stroke=${e} stroke-width=${(1.7*v).toFixed(2)} stroke-linejoin="round" stroke-linecap="round"></polyline>`},U=q?Tt`${f.length?headOf(lastTail(e.wet),C):Ht}${_.length?headOf(lastTail(e.dry),F):Ht}`:Ht;let Y=Ht;if(s&&"paths"!==o){const o=l?l.x-s.x:0,u=l?l.y-s.y:0,m=B?Tt`<image href=${t.image} x=${(-G/2).toFixed(d)} y=${(-G/2).toFixed(d)} width=${G.toFixed(d)} height=${G.toFixed(d)} preserveAspectRatio="xMidYMid meet" transform=${"rotate("+e.imageRot+")"}></image>`:Tt`${l?Tt`<line x1="0" y1="0" x2=${o.toFixed(d)} y2=${u.toFixed(d)} stroke="#ffffff" stroke-width=${(.3*h).toFixed(2)} stroke-linecap="round"></line>`:Ht}<circle class="avc-marker-dot" cx="0" cy="0" r=${h.toFixed(d)} fill=${p} stroke="#ffffff" stroke-width=${(.18*h).toFixed(2)}></circle>`,_=this._hasError(t)?Tt`<defs><filter id=${e.filterId} x="-150%" y="-150%" width="400%" height="400%">
                <feGaussianBlur stdDeviation=${(.5*h).toFixed(2)}></feGaussianBlur>
              </filter></defs>
              <circle class="avc-err-halo" cx="0" cy="0" r=${(2.2*h).toFixed(d)} fill="#ff3b30" filter=${"url(#"+e.filterId+")"}></circle>`:Ht,f=q?Tt`<circle class="avc-sonar" cx="0" cy="0" r=${h.toFixed(d)} fill="none" stroke=${p} stroke-width=${(.22*h).toFixed(2)}></circle>`:Ht,v=Tt`${_}${f}${m}`,b=this._markerPrev.get(e.filterId),w=e.pose??"",$=!!b&&b.pose===w&&(Math.abs(b.x-s.x)>1e-6||Math.abs(b.y-s.y)>1e-6);let C=null,A=1/0;for(const[t,o]of[["dry",e.dry],["wet",e.wet]]){let e=o.length-1;for(;e>=0&&o[e].length<2;)e--;if(e<0)continue;const l=o[e],h=l[l.length-1],d=Math.hypot(h.x-s.x,h.y-s.y);d<A&&(A=d,C={layer:t,n:e+1,len:arcLength(l),seg:l})}if($)this._markerStops.add(e.filterId);else if(b&&b.pose!==w&&this._glideS()>0){const t={x:b.x,y:b.y};let o=null;if(C){const e=b.trail,l=e&&e.layer===C.layer&&e.n===C.n?C.len-e.len:C.len;o=function traceSince(t,e,o,s,l){if(t.length<2||!(s>0))return null;let h=null,d=0;for(let o=t.length-1;o>0&&d<=s;o--){const s=closestOnEdge(t[o-1],t[o],e);(!h||s.d<h.d)&&(h={i:o,pt:s.pt,d:s.d}),d+=Math.hypot(t[o].x-t[o-1].x,t[o].y-t[o-1].y)}if(!h||h.d>l)return null;const p=[h.pt,...t.slice(h.i)],u=p[p.length-1];return Math.hypot(u.x-o.x,u.y-o.y)>1e-6&&p.push(o),p}(C.seg,t,s,Math.max(l,0)+2*h,.6*h)}this._markerMoves.set(e.filterId,{route:o??[t,{x:s.x,y:s.y}],digits:d})}this._markerPrev.set(e.filterId,{pose:w,x:s.x,y:s.y,trail:C?{layer:C.layer,n:C.n,len:C.len}:null}),Y=Tt`<g class="avc-marker ${$?"avc-marker--jump":""}" data-mk=${e.filterId} style=${"transform: translate("+s.x.toFixed(d)+"px, "+s.y.toFixed(d)+"px)"}>${1!==j?Tt`<g transform=${"scale(1,"+(1/j).toFixed(4)+")"}>${v}</g>`:v}</g>`}const K=Tt`${A}${P}${O}${U}`;return"paths"===o?K:"marker"===o?Y:Tt`${K}${Y}`}_renderHomeFrameOverlay(t,e,o="both"){const s=this._intAttrs(t);if(!s)return Ht;const l=e.x1-e.x0,h=e.y1-e.y0;if(!(l>0&&h>0))return Ht;const d=Math.max(l,h)/55,local=t=>({x:t.x-e.x0,y:t.y-e.y0}),p=s.vacuum_position_home_px,u=p?local(p):null;let m=null;if(u&&null!=p.a){const t=p.a*Math.PI/180;m={x:u.x+1.3*d*Math.cos(t),y:u.y+1.3*d*Math.sin(t)}}const _=this._renderVectorLayers(t,{dry:this._vecSegs(s.path_dry_home_px,local),wet:this._vecSegs(s.path_wet_home_px,local),rob:u,head:m,rr:d,digits:1,pose:p?p.x+","+p.y:"",imageRot:(p&&null!=p.a?p.a:0)+(t.robot_image_rotation??0),filterId:"avc-hf-err-blur-"+t.entity.replace(/[^a-zA-Z0-9]/g,"-")},o);return zt`<svg class="map-vector" viewBox="0 0 ${l} ${h}" preserveAspectRatio="none" style=${Yt({left:"0",top:"0",width:"100%",height:"100%"})}>${_}</svg>`}_renderHomeAnchorOverlay(t,e,o,s,l="both"){const h=this._intAttrs(t);if(!(h&&s>0))return Ht;const proj=t=>{const l=projectHomePxThroughFit(t,o,e,s);return{x:l.x,y:l.y/s}},d=Math.max(100,100/s)/55,p=h.vacuum_position_home_px,u=p?proj(p):null;let m=null;if(u&&null!=p.a){const t=(p.a+e.rotation)*Math.PI/180;m={x:u.x+1.3*d*Math.cos(t),y:u.y+1.3*d*Math.sin(t)}}const _=this._renderVectorLayers(t,{dry:this._vecSegs(h.path_dry_home_px,proj),wet:this._vecSegs(h.path_wet_home_px,proj),rob:u,head:m,rr:d,digits:2,pose:p?p.x+","+p.y:"",imageRot:(p&&null!=p.a?p.a+e.rotation:0)+(t.robot_image_rotation??0),filterId:"avc-ha-err-blur-"+t.entity.replace(/[^a-zA-Z0-9]/g,"-")},l);return zt`<svg class="map-vector" viewBox=${"0 0 100 "+(100/s).toFixed(3)} preserveAspectRatio="none" style=${Yt({left:"0",top:"0",width:"100%",height:"100%"})}>${_}</svg>`}_onLayerDown(t){this._layerHeld=!1,this._layerHoldTimer=window.setTimeout(()=>{this._layerHeld=!0,this._layerMenu=this._layerMenu===t?null:t},380)}_onLayerUp(){null!==this._layerHoldTimer&&(window.clearTimeout(this._layerHoldTimer),this._layerHoldTimer=null)}_onLayerClick(t){if(this._layerHeld)return void(this._layerHeld=!1);const e=this._layersEff(),o={...e,[t]:!e[t]},s=this._selSensor();s&&this.hass.states[s]?.attributes?.view_layers?this._call("anyvac","set_layers",o):this._layers=o,this._layerMenu=null}_renderLayerMenu(t,e){const o=this._mergedRoomDefs(t);return zt`
      <div class="layer-menu">
        <div class="layer-menu-head">
          <ha-icon icon=${"dry"===e?"mdi:broom":"mdi:water"}></ha-icon>
          <span>${"dry"===e?"Dry":"Wet"} \u00b7 last cleaned</span>
        </div>
        ${o.map(({r:o,v:s})=>{const l=this._intRoomRec(s,o),h=this._ageDaysFromIso(l?.[e]),d=this._isRoomSelectedAny(o.key,t);return zt`
            <button class="layer-menu-row ${d?"on":""}" @click=${()=>this._toggleRoomAcross(o.key,t)}>
              <ha-icon icon=${o.icon??"mdi:square"}></ha-icon>
              <span class="lm-name">${o.name??o.key}</span>
              ${this._renderProgChip(this._roomProgForType(o,t,e))}
              <b style=${Yt({color:this._colorForAgeDays(h)})}>${(t=>null===t?"—":t<1?"<1d":Math.round(t)+"d")(h)}</b>
            </button>
          `})}
      </div>
    `}_oldestAgeDays(t,e){let o=null;for(const s of t){if(!this._intAttrs(s))continue;const t=this._intAttrs(s)?.rooms_last_cleaned;if(t)for(const s of Object.values(t)){const t=this._ageDaysFromIso(s?.[e]);null!==t&&(null===o||t>o)&&(o=t)}}return o}_ageBadgeStr(t){return null===t?"—":t<1?"<1d":Math.round(t)+"d"}_renderLayerToggleCompact(t){const e=t.filter(t=>this._intAttrs(t));if(!e.length)return Ht;const o=this._layersEff(),ageTip=t=>{const o=this._ageBadgeStr(this._oldestAgeDays(e,t));return o&&"—"!==o?` · oldest room ${o}`:""};return zt`
      <button class="mtbtn mtbtn--icon ${o.dry?"on":""}" title="Show dry trail \u2014 tap to toggle${ageTip("dry")}"
        aria-label="Dry trail" aria-pressed=${o.dry?"true":"false"}
        @click=${()=>this._onLayerClick("dry")}>
        <ha-icon icon="mdi:broom"></ha-icon>
      </button>
      <button class="mtbtn mtbtn--icon ${o.wet?"on":""}" title="Show wet trail \u2014 tap to toggle${ageTip("wet")}"
        aria-label="Wet trail" aria-pressed=${o.wet?"true":"false"}
        @click=${()=>this._onLayerClick("wet")}>
        <ha-icon icon="mdi:water"></ha-icon>
      </button>
    `}_renderLayerToggles(t){const e=t.filter(t=>this._intAttrs(t));if(!e.length)return Ht;const oldestTip=t=>{const o=this._ageBadgeStr(this._oldestAgeDays(e,t));return o&&"—"!==o?` · oldest room ${o}`:""},o=this._layersEff();return zt`
      <div class="layer-toggles">
        <button class="layer-btn ${o.dry?"on":""}" title="Dry trail \u2014 tap to toggle, hold for rooms${oldestTip("dry")}" aria-label="Dry trail"
          @pointerdown=${()=>this._onLayerDown("dry")} @pointerup=${()=>this._onLayerUp()} @pointerleave=${()=>this._onLayerUp()}
          @click=${()=>this._onLayerClick("dry")}>
          <ha-icon icon="mdi:broom"></ha-icon>
        </button>
        <button class="layer-btn ${o.wet?"on":""}" title="Wet trail \u2014 tap to toggle, hold for rooms${oldestTip("wet")}" aria-label="Wet trail"
          @pointerdown=${()=>this._onLayerDown("wet")} @pointerup=${()=>this._onLayerUp()} @pointerleave=${()=>this._onLayerUp()}
          @click=${()=>this._onLayerClick("wet")}>
          <ha-icon icon="mdi:water"></ha-icon>
        </button>
        ${this._layerMenu?this._renderLayerMenu(e,this._layerMenu):Ht}
      </div>
    `}_mergedRoomDefs(t){const e=t[0];if(this._config.rooms?.length&&e)return this._roomsFor(e).map(t=>({r:t,v:e}));const o=new Set,s=[];for(const e of t)for(const t of this._roomsFor(e))t.key&&!o.has(t.key)&&(o.add(t.key),s.push({r:t,v:e}));return s}_renderMergedRooms(t){const e=this._mergedRoomDefs(t),o=!e.some(({r:e})=>this._isRoomSelectedAny(e.key,t));return e.map(({r:e,v:s})=>this._renderRoomOverlay(e,s,{vacs:t,wholeHome:o}))}_renderRoomOutlines(t,e){const o=t.filter(({r:t})=>t.outline_pct&&t.outline_pct.length>=3);if(!o.length)return Ht;const s=Tt`${o.map(({r:t})=>{const o=this._isRoomSelectedAny(t.key,e),s=t.outline_pct.map(t=>t.x.toFixed(2)+","+t.y.toFixed(2)).join(" ");return Tt`<polygon points=${s}
        fill=${o?"rgba(255,255,255,0.12)":"rgba(255,255,255,0.05)"}
        stroke=${o?"#ffffff":"rgba(255,255,255,0.35)"}
        stroke-width="0.35" stroke-linejoin="round"></polygon>`})}`;return zt`<svg class="room-outline-layer" viewBox="0 0 100 100" preserveAspectRatio="none"
      style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;">${s}</svg>`}get _narrow(){const t=this._config.mobile_rotate;if("off"===t)return!1;if("always"===t||"on"===t)return!0;if(this._config.layout){const t="portrait"===this._profile?this._config.layout.portrait:this._config.layout.landscape,e=t?.crop?.mapOrientation;if("normal"===e)return!1;if("rotated"===e)return!0;const o=function shouldRotateMap(t,e,o){if(e<=4||o<=4||t<=0)return;const s=Math.min(e/t,o);return Math.min(e,o/t)>s}(this._mapAR,this._mapRegW,this._mapRegH);return void 0!==o?(this._lastRotate=o,o):this._lastRotate}return this._cardW>0&&this._cardW<500}get _flipEff(){if(null!==this._flipLive)return this._flipLive;if(!this._config.layout)return!1;const t="portrait"===this._profile?this._config.layout.portrait:this._config.layout.landscape;return!0===t?.crop?.flip}_toggleFlipLive(){this._flipLive=!this._flipEff,this._saveFlipLive()}get _stackTopology(){if("portrait"!==this._profile||!this._config.layout)return!1;const t=this._config.layout.portrait;if("split"===t?.topology||"rail"===t?.topology)return!1;if("stack"===t?.topology)return!0;if(t?.columns?.length||t?.rows?.length||t?.place&&Object.keys(t.place).length)return!1;const e=this._mapAR>.1?this._mapAR:3.636,o=function shouldStackLayout(t,e,o,s={}){const{dockWidthFrac:l=.28,dockMinPx:h=ue,dockHeightPx:d=150,stackBias:p=1.1}=s;if(e<=4||o<=4||t<=0)return;const u=e-Math.max(e*l,h),m=Math.min(u/t,o),_=Math.max(o-d,0);return!(m>Math.min(e/t,_)*p)}(this._narrow?1/e:e,this._mapAvailW,this._mapAvailH,this._themed()?{}:{stackBias:1.5,dockMinPx:0});return void 0!==o?(this._lastStack=o,o):this._lastStack}_renderResponsive(t){if(!this._config.layout){if(!this._narrow)return t;const e=this._mapAR>.1?this._mapAR:3.636,o=this._cardW||this.clientWidth||360,s=1.4*("undefined"!=typeof window?window.innerHeight:800),l=o*e,h=l>s?s/l:1,d=Math.round(o*h),p=Math.round(l*h);return zt`
        <div class="avc-rot" style="position:relative;width:${d}px;height:${p}px;margin:0 auto;overflow:hidden;--map-rot:90deg">
          <div style="position:absolute;top:0;left:0;width:${p}px;height:${d}px;transform-origin:top left;transform:translateX(${d}px) rotate(90deg)">
            ${t}
          </div>
        </div>
      `}if(this._mapRegW<=4||this._mapRegH<=4)return t;const e=this._mapAR>.1?this._mapAR:3.636,o=this._mapRotationDeg(),s=90===o||270===o,l=s?1/e:e,h=this._config.layout[this._profile]?.crop,d="cover"===h?.fit;let p=this._mapRegW;const u=this._mapRegH;let m,_;this._isRail()&&this._mapAvailW>2*ue&&(p=Math.min(p,this._mapAvailW-this._gridGapPx-ue)),d?(m=Math.max(p,u*l),_=Math.max(u,m/l)):(m=Math.min(p,u*l),_=Math.min(u,m/l)),m=Math.floor(m),_=Math.floor(_);const f=-(m-p)/2+(h?.offset_x??0)/100*((m-p)/2),v=-(_-u)/2+(h?.offset_y??0)/100*((_-u)/2),b=!d&&"portrait"===this._profile,w=b?`width:${m}px;height:${_}px;margin:${Math.max(0,Math.floor((u-_)/2))}px auto 0`:`width:${p}px;height:${u}px;margin:0 auto`,$=b?"0px,0px":`${f}px,${v}px`;if(this._isRail()&&(this._lastPortraitFitW=m),0!==o){s&&(this._lastPortraitFitW=m);let e;return e=90===o?"transform-origin:top left;transform:translateX("+m+"px) rotate(90deg)":180===o?"transform-origin:center;transform:rotate(180deg)":"transform-origin:top left;transform:translateY("+_+"px) rotate(270deg)",zt`
        <div class="avc-rot" style="position:relative;${w};overflow:hidden;--map-rot:${o}deg">
          <div style="position:absolute;top:0;left:0;width:100%;height:100%;transform:translate(${$})">
            <div style="position:absolute;top:0;left:0;width:${s?_:m}px;height:${s?m:_}px;${e}">
              ${t}
            </div>
          </div>
        </div>
      `}return zt`
      <div style="position:relative;${w};overflow:hidden">
        <div style="position:absolute;top:0;left:0;width:${m}px;height:${_}px;transform:translate(${$})">
          ${t}
        </div>
      </div>
    `}_renderMergedMap(){const t=this._shownOrdered().map(t=>this._config.vacuums[t]);if(!t.length)return Ht;const e=t.find(t=>t.image_base?.src)??t[0],o=this._config.image_base??e.image_base,s=!!o?.src,l=this._config.base_height??e.base_height,h="number"==typeof l&&l>0,d=h?"map-wrap--fixed":s?"map-wrap--image":"",p=Yt(h?{height:(l??0)+"px"}:{});return zt`
      <div class="map-wrap ${d}" style=${p}>
        ${s?zt`
          <img class="${"image-base-img"+(h?" image-base-img--fit":"")}" src=${o.src} alt="Floorplan" @load=${this._onFloorplanLoad}
            style=${Yt({transform:"translate("+(o?.offset_x??0)+"%,"+(o?.offset_y??0)+"%) rotate("+(o?.rotation??0)+"deg) scale("+(o?.scale??100)/100+")"})} />
        `:Ht}
        ${t.map((t,e)=>{const o=this._mapEntityFor(t),l=o?this._mapUrl(o):null;if(!l)return Ht;const h=this._effectiveSeat(t),d=s||e>0;return zt`<img class="map-img ${d?"map-img--overlay":""}" src=${l} alt="Vacuum map"
            data-entity=${t.entity}
            style=${Yt({left:50+h.offset_x+"%",top:50+h.offset_y+"%",width:h.scale+"%",transform:"translate(-50%,-50%) "+seatRotateScaleCss(h.rotation,h.scale,h.scaleY),opacity:t.hide_map?"0":String((t.overlay_opacity??(d?55:100))/100),mixBlendMode:t.overlay_blend??"normal"})} />`})}
        ${t.map(t=>{if(!this._intAttrs(t))return Ht;const e=this._homeFrameCropFor(t);if(e)return this._renderHomeFrameOverlay(t,e,"paths");const o=this._homeAnchorFitFor(t,this._wrapAspect(this._baseHeightFor(t)));return o?this._renderHomeAnchorOverlay(t,o.fit,o.dims,this._wrapAspect(this._baseHeightFor(t)),"paths"):this._renderIntegrationOverlay(t,this._effectiveSeat(t),"paths")})}
        ${t.map(t=>{if(!this._intAttrs(t))return Ht;const e=this._homeFrameCropFor(t);if(e)return this._renderHomeFrameOverlay(t,e,"marker");const o=this._homeAnchorFitFor(t,this._wrapAspect(this._baseHeightFor(t)));return o?this._renderHomeAnchorOverlay(t,o.fit,o.dims,this._wrapAspect(this._baseHeightFor(t)),"marker"):this._renderIntegrationOverlay(t,this._effectiveSeat(t),"marker")})}
        ${this._config.layout?Ht:this._renderLayerToggles(t)}
        ${this._renderRoomOutlines(this._mergedRoomDefs(t),t)}
        ${this._renderMergedRooms(t)}
        ${this._renderStartSeqAvatars(this._mergedRoomDefs(t))}
        ${t.map(t=>"normal"!==this._mapMode&&this._isModeCandidate(t)||this._zoneRectShown&&this._hasZoneEditTarget(t)?zt`<div class="map-clickcatch" style="touch-action:none"
              @click=${e=>this._onMapClick(t,e)}
              @pointerdown=${e=>this._onZoneDown(t,e)}
              @pointermove=${e=>this._onZoneMove(t,e)}
              @pointerup=${e=>this._onZoneUp(t,e)}></div>`:Ht)}
        ${t.map((t,e)=>{const o=this._zoneRectFor(t,0===e);return o?zt`<div class="zone-rect" style=${Yt({left:Math.min(o.x0,o.x1)+"%",top:Math.min(o.y0,o.y1)+"%",width:Math.abs(o.x1-o.x0)+"%",height:Math.abs(o.y1-o.y0)+"%"})}>${this._renderZoneHandles()}</div>`:Ht})}
      </div>
    `}_renderMap(t){const e=t.base??(t.image_base?.src&&!t.map?.entity?"image":"map"),o=t.image_base,s=o?.src,l=this._mapEntityFor(t),h=l?this._mapUrl(l):null,d=("image"===e||"combined"===e)&&!!s,p=("map"===e||"combined"===e)&&!!h;if(!d&&!p)return Ht;const u=this._effectiveSeat(t),m="number"==typeof t.base_height&&t.base_height>0,_=m?"map-wrap--fixed":d?"map-wrap--image":"",f=Yt(m?{height:(t.base_height??0)+"px"}:{});return zt`
      <div class="map-wrap ${_}" style=${f}>
        ${d?zt`
          <img class="${"image-base-img"+(m?" image-base-img--fit":"")}" src=${s} alt="Floorplan" @load=${this._onFloorplanLoad}
            style=${Yt({transform:"translate("+(o?.offset_x??0)+"%,"+(o?.offset_y??0)+"%) rotate("+(o?.rotation??0)+"deg) scale("+(o?.scale??100)/100+")"})} />
        `:Ht}
        ${p?zt`
          <img class="map-img ${d?"map-img--overlay":""}" src=${h} alt="Vacuum map"
            data-entity=${t.entity}
            style=${Yt({left:50+u.offset_x+"%",top:50+u.offset_y+"%",width:u.scale+"%",transform:"translate(-50%,-50%) "+seatRotateScaleCss(u.rotation,u.scale,u.scaleY),...t.hide_map?{opacity:"0"}:d?{opacity:String((t.overlay_opacity??55)/100),mixBlendMode:t.overlay_blend??"normal"}:{}})} />
        `:Ht}
        ${p?this._renderIntegrationOverlay(t,u):Ht}
        ${this._config.layout?Ht:this._renderLayerToggles([t])}
        ${(()=>{const e=this._roomsFor(t),o=!e.some(e=>this._isRoomSelected(e,t));return e.map(e=>this._renderRoomOverlay(e,t,{wholeHome:o}))})()}
        ${"normal"!==this._mapMode&&this._isModeCandidate(t)||this._zoneRectShown&&this._hasZoneEditTarget(t)?zt`<div class="map-clickcatch" style="touch-action:none"
              @click=${e=>this._onMapClick(t,e)}
              @pointerdown=${e=>this._onZoneDown(t,e)}
              @pointermove=${e=>this._onZoneMove(t,e)}
              @pointerup=${e=>this._onZoneUp(t,e)}></div>`:Ht}
        ${(()=>{const e=this._zoneRectFor(t,!0);return e?zt`<div class="zone-rect" style=${Yt({left:Math.min(e.x0,e.x1)+"%",top:Math.min(e.y0,e.y1)+"%",width:Math.abs(e.x1-e.x0)+"%",height:Math.abs(e.y1-e.y0)+"%"})}>${this._renderZoneHandles()}</div>`:Ht})()}
      </div>
    `}_roomAgeDotColors(t,e,o){const s=this._intRoomRec(e,t);if(s){const t=(o?.length?o:[e]).map(t=>this._vacCleanType(t)).reduce((t,e)=>({dry:t.dry||e.dry,wet:t.wet||e.wet}),{dry:!1,wet:!1}),l=[];if(t.dry){const t=this._ageDaysFromIso(s.dry);l.push({kind:"dry",color:this._colorForAgeDays(t),days:t})}if(t.wet){const t=this._ageDaysFromIso(s.wet);l.push({kind:"wet",color:this._colorForAgeDays(t),days:t})}return l}if(!t.last_clean_entity)return[];const l=this._roomAgeDays(t);return[{kind:"any",color:this._colorForAgeDays(l),days:l}]}_renderRoomLabel(t,e,o,s){const l=this._roomAgeDotColors(t,e,s),h=this._mapRotationDeg()%180!=0,d="none"===o;if(d&&!l.length)return Ht;const p=l.map(t=>("any"===t.kind?"":t.kind+" ")+this._ageBadgeStr(t.days)).join(" · ");return zt`
      <span class="room-label ${h?"room-label--q":""} ${d?"room-label--dots":""}" title=${p}>
        ${d||this._config.room_icon_hidden||!t.icon?Ht:zt`<ha-icon icon=${t.icon}></ha-icon>`}
        ${d?Ht:zt`<span class="room-label-name">${t.name??t.key}</span>`}
        ${l.length?zt`<span class="room-label-dots">${l.map(t=>zt`<span class="room-label-dot" style=${Yt({background:t.color})}></span>`)}</span>`:Ht}
      </span>`}_renderRoomAgeDots(t,e){const o=this._intRoomRec(e,t);if(o){const t=this._vacCleanType(e);if(!t.dry&&!t.wet)return Ht;const s=this._ageDaysFromIso(o.dry),l=this._ageDaysFromIso(o.wet);return zt`
        <span class="room-age-dots">
          ${t.dry?zt`<span class="room-age-dot" style=${Yt({background:this._colorForAgeDays(s)})}></span>`:Ht}
          ${t.wet?zt`<span class="room-age-dot" style=${Yt({background:this._colorForAgeDays(l)})}></span>`:Ht}
        </span>
      `}return t.last_clean_entity?zt`
      <span class="room-age-dots">
        <span class="room-age-dot" style=${Yt({background:this._colorForAgeDays(this._roomAgeDays(t))})}></span>
      </span>
    `:Ht}_onRoomPointerDown(t,e){return o=>{e||(o.preventDefault(),this._cancelHold(),this._holdId="room-"+t.key,this._holdTimer=setTimeout(()=>{this._holdTimer=null,this._holdId=null,this._inspectKey=this._inspectKey===t.key?null:t.key},Jt))}}_onRoomPointerUp(t,e,o,s){return()=>{if(!s)if(null!==this._holdTimer){if(this._cancelHold(),null!==this._inspectKey)return void(this._inspectKey=null);o?this._toggleRoomAcross(t.key,o):this._toggleRoom(t,e)}else this._holdId=null}}_renderRoomInspect(t,e,o,s){const l=this._intRoomRec(e,t),h=this._ageDaysFromIso(l?.dry),d=this._ageDaysFromIso(l?.wet),badge=t=>null===t?"—":t<1?"<1d":Math.round(t)+"d",p=this._roomCoverageRec(e,t),covFmt=t=>null==t||t>=100?"":t+"%",u=o?this._planPreview?.dry.get(t.key):void 0,m=o?this._planPreview?.wet.get(t.key):void 0,_=this._pinCandidates(t.key,"dry").length>1,f=this._pinCandidates(t.key,"wet").length>1,pinTap=(e,o)=>("dry"===e?_:f)?s=>{s.stopPropagation(),this._cycleRoomPin(t.key,e,o)}:void 0;return zt`
      <div class="room-inspect" style=${Yt({left:(t.map_x??0)+"%",top:(t.map_y??0)+"%"})}
        @click=${t=>t.stopPropagation()}>
        <div class="room-inspect-inner">
          <div class="room-inspect-name">${t.name??t.key}</div>
          <div class="room-inspect-ages">
            <span class="dock-age"><ha-icon icon="mdi:broom"></ha-icon><b style=${Yt({color:this._colorForAgeDays(h)})}>${badge(h)}</b>${this._renderCovBadge(p,"dry",covFmt)}</span>
            <span class="dock-age"><ha-icon icon="mdi:water"></ha-icon><b style=${Yt({color:this._colorForAgeDays(d)})}>${badge(d)}</b>${this._renderCovBadge(p,"wet",covFmt)}</span>
          </div>
          ${u||m?zt`
            <div class="dock-avatars">
              ${u?this._vacChip(u,pinTap("dry",u)):Ht}
              ${m?this._vacChip(m,pinTap("wet",m)):Ht}
            </div>`:Ht}
        </div>
      </div>
    `}_roomFill(){const t=this._jobProgress();if(t===this._fillJp&&this._fillMap)return this._fillMap;this._fillJp=t;const e=new Map;if(!t||!Array.isArray(t.rooms))return this._doneSeen=null,this._sheenRooms.clear(),this._fillMap=e,e;const o=new Map;for(const e of t.rooms){if("string"!=typeof e?.room)continue;const t=o.get(e.room)??[];t.push(e),o.set(e.room,t)}const colorOf=t=>{const e=this._config.vacuums.find(e=>e.entity===t);return e?this._color(e):"#8a8f98"},s=null===this._doneSeen,l=this._doneSeen??new Set;for(const[t,h]of o){const o=h.every(t=>"done"===t.state),d=h.reduce((t,e)=>t+("done"===e.state?100:Math.max(0,Math.min(100,Number(e.pct)||0))),0),p=h.find(t=>"active"===t.state)??[...h].reverse().find(t=>"done"===t.state)??h[0];o&&!l.has(t)&&(l.add(t),s||this._sheenRooms.add(t)),e.set(t,{frac:d/(100*h.length),done:o,color:colorOf(p?.vacuum),sheen:this._sheenRooms.has(t)})}return this._doneSeen=l,this._fillMap=e,e}_renderRoomFill(t){const e=this._roomFill().get(t.key)??(t.name?this._roomFill().get(t.name):void 0);if(!e||!e.done&&e.frac<=0)return Ht;const o=e.done?.22:.04+.18*e.frac;return zt`<span class="room-fill ${e.done?"room-fill--done":""}" style=${Yt({background:e.color,opacity:o.toFixed(3)})}></span>${e.sheen?zt`<span class="room-sheen"></span>`:Ht}`}_renderRoomOverlay(t,e,o){const s=o?.vacs?this._isRoomSelectedAny(t.key,o.vacs):this._isRoomSelected(t,e),l=!s&&!!o?.wholeHome,h="rgba(255,255,255,0.22)",d=t.icon_anchor??"c",p="normal"!==this._mapMode,u="#ffffff",m="linear-gradient(135deg, #ffffff 0%, #ffffff 46%, #8ecbff 50%, #ffffff 54%, #ffffff 100%) 1";if(void 0!==t.map_w&&void 0!==t.map_h){const _={tl:["flex-start","flex-start"],t:["center","flex-start"],tr:["flex-end","flex-start"],l:["flex-start","center"],c:["center","center"],r:["flex-end","center"],bl:["flex-start","flex-end"],b:["center","flex-end"],br:["flex-end","flex-end"]},[f,v]=_[d]??["center","center"],b=this._themed(),w=(s?this._config.room_border_selected??4:l&&!b?Math.max(3,this._config.room_border_normal??2):this._config.room_border_normal??2)+"px";let $=s?u+"E0":l?"rgba(255,255,255,0.75)":h,C=s?u+"22":l?"rgba(255,255,255,0.16)":"rgba(0,0,0,0.06)",A=s?"0 0 18px rgba(255,255,255,0.7)":l?"0 0 10px rgba(255,255,255,0.4)":"none";b&&($=s?"rgb(var(--avc-accent-rgb))":h,C=s?"rgba(var(--avc-accent-rgb), 0.14)":"rgba(0,0,0,0.04)",A=s?"inset 0 0 22px rgba(var(--avc-accent-rgb), 0.32)":"none");const P=s?this._planPreview?.dry.get(t.key):void 0,F=s?this._planPreview?.wet.get(t.key):void 0,E="room-"+t.key;return zt`
        <button
          class="room-overlay ${p?"room-overlay--locked":""} ${this._holdId===E?"room-overlay--holding":""}"
          ?disabled=${p}
          style=${Yt({left:(t.map_x??0)+"%",top:(t.map_y??0)+"%",width:t.map_w+"%",height:t.map_h+"%",border:w+" solid "+$,borderImage:s&&!b?m:"none",background:C,boxShadow:A,justifyContent:f,alignItems:v})}
          @pointerdown=${this._onRoomPointerDown(t,p)}
          @pointerup=${this._onRoomPointerUp(t,e,o?.vacs,p)}
          @pointerleave=${this._holdEnd}
          @pointercancel=${this._holdEnd}
          title=${p?"Room selection is off while placing a pin/zone":t.name} aria-label=${t.name}
          aria-pressed=${s?"true":"false"}
        >
          ${b?this._renderRoomFill(t):Ht}
          ${this._startSeq?.delay.has(t.key)?zt`<span class="room-seq"
              style=${Yt({animationDelay:this._startSeq.delay.get(t.key)+"s"})}></span>`:Ht}
          <div class="hold-ring"></div>
          ${b?this._renderRoomLabel(t,e,d,o?.vacs):zt`
            ${!this._config.room_icon_hidden&&"none"!==d&&t.icon?zt`
              <ha-icon icon=${t.icon}
                style=${Yt({color:s?"white":"rgba(255,255,255,0.55)","--mdc-icon-size":"16px"})}>
              </ha-icon>
            `:Ht}
            ${this._renderRoomAgeDots(t,e)}`}
          ${P||F?(()=>{const t=this._mapRotationDeg(),e=90===t?{top:"0%",left:"100%"}:180===t?{top:"0%",left:"0%"}:270===t?{top:"100%",left:"0%"}:{top:"100%",left:"100%"},o=t*Math.PI/180,s=(-2*(Math.cos(o)+Math.sin(o))).toFixed(2),l=(-2*(Math.cos(o)-Math.sin(o))).toFixed(2);return zt`
                <span class="room-overlay-assign-anchor ${t%180!=0?"room-overlay-assign-anchor--q":""}" style=${Yt(e)}>
                  <span class="room-overlay-assign"
                    style=${Yt({transform:`translate(${s}px, ${l}px) rotate(calc(-1 * var(--map-rot)))`})}>
                    ${P?this._vacChip(P):Ht}
                    ${F?this._vacChip(F):Ht}
                  </span>
                </span>
              `})():Ht}
          ${this._renderRoomGauge(o?.vacs??[e],t)}
        </button>
        ${this._inspectKey===t.key?this._renderRoomInspect(t,e,s,o):Ht}
      `}const _=s?u+"A8":l?"rgba(255,255,255,0.32)":"rgba(0,0,0,0.55)",f=s?"0 0 12px rgba(255,255,255,0.8)":l?"0 0 8px rgba(255,255,255,0.45)":"none",v="room-"+t.key;return zt`
      <button
        class="room-btn ${p?"room-overlay--locked":""} ${this._holdId===v?"room-overlay--holding":""}"
        ?disabled=${p}
        style=${Yt({left:(t.map_x??0)+"%",top:(t.map_y??0)+"%",background:_,border:"4px solid "+(s?u:l?"rgba(255,255,255,0.7)":h),borderImage:s?m:"none",boxShadow:f})}
        @pointerdown=${this._onRoomPointerDown(t,p)}
        @pointerup=${this._onRoomPointerUp(t,e,o?.vacs,p)}
        @pointerleave=${this._holdEnd}
        @pointercancel=${this._holdEnd}
        title=${p?"Room selection is off while placing a pin/zone":t.name} aria-label=${t.name}
        aria-pressed=${s?"true":"false"}
      >
        <div class="hold-ring"></div>
        ${this._config.room_icon_hidden?Ht:zt`
          <ha-icon icon=${t.icon||"mdi:square"}
            style=${Yt({color:s?"white":"rgba(255,255,255,0.5)"})}>
          </ha-icon>
        `}
        ${this._renderRoomAgeDots(t,e)}
        ${this._renderRoomGauge(o?.vacs??[e],t)}
      </button>
      ${this._inspectKey===t.key?this._renderRoomInspect(t,e,s,o):Ht}
    `}_renderStatusRow(t){const[e,o,s]=this._statusInfo(t),l=this._battery(t),h=this._lastCleanStr(t),d=t.name??t.entity.split(".")[1]??t.entity,p=this._progress(t),u=this._ent(t,"current_room"),m=u?this.hass.states[u]?.state:null,_=m&&"unknown"!==m&&"unavailable"!==m?m:null,f=this._ent(t,"error"),v=f?this.hass.states[f]?.state:null,b=this._hasError(t);return zt`
      ${b?zt`
        <div class="error-row">
          <ha-icon icon="mdi:alert-circle" style="color:rgb(var(--avc-err-rgb))"></ha-icon>
          <span style="color:rgb(var(--avc-err-rgb));font-size:var(--avc-th-fs-xs,11px);font-weight:600">${v}</span>
        </div>
      `:Ht}
      <div class="status-line1">
        <span class="model-label">${d}</span>
        <span class="status-label" style=${Yt({color:o})}>
          <ha-icon class="status-icon" icon=${s}></ha-icon>${e}${null!==p?zt` &middot; ${p}&thinsp;%`:Ht}
        </span>
      </div>
      <div class="status-line2">
        ${_?zt`
          <span class="current-room">
            <ha-icon icon="mdi:map-marker" style="--mdc-icon-size:12px;color:rgba(var(--avc-ink-rgb),0.4)"></ha-icon>
            ${_}
          </span>
        `:zt`<span></span>`}
        <span class="status-meta">
          ${null!==l?zt`
            <span class="battery">
              <ha-icon icon=${this._batIcon(l)} style=${Yt({color:this._batColor(l)})}></ha-icon>
              <span style=${Yt({color:this._batColor(l)})}>${l}&thinsp;%</span>
            </span>
          `:Ht}
          <span class="last-clean">
            <ha-icon icon="mdi:history"></ha-icon>
            <span>${h}</span>
          </span>
        </span>
      </div>
    `}_renderProgress(t){const e=this._progress(t);if(null===e)return Ht;const o=this._color(t);return zt`
      <div class="progress">
        <div class="progress-track">
          <div class="progress-fill" style=${Yt({width:e+"%",background:o})}></div>
        </div>
        <span class="progress-label" style=${Yt({color:o})}>${e}&thinsp;%</span>
      </div>
    `}_renderActions(t,e){const o=this._color(t),s=this._pinPending?.[t.entity],l=this._zonePending?.[t.entity];if(s||l){const s="modeaction-"+e,h=l?"Clean zone":"Send here",d=l?"mdi:select-drag":"mdi:map-marker-radius",action=()=>{l?this._confirmZone(t):this._confirmPin(t)};return zt`
        <div class="actions">
          <button
            class="action-btn ${this._holdId===s?"action-btn--holding":""}"
            style=${Yt({background:this._colorBg(t),border:"1px solid "+o+"80"})}
            @pointerdown=${this._holdStart(s,action)}
            @pointermove=${this._holdMove}
            @pointerup=${this._holdEnd}
            @pointerleave=${this._holdEnd}
            @pointercancel=${this._holdEnd}
          >
            <div class="hold-ring"></div>
            <ha-icon icon=${d} style=${Yt({color:o})}></ha-icon>
            <span>${h}</span>
          </button>
        </div>
      `}const h=this._isCleaning(t),d=this._isPaused(t),p=this._hasSelectedRooms(t),u=this._totalCleanMins(t),m=this._timeStr(u);if(d){const s="resume-"+e;return zt`
        <div class="actions">
          <button
            class="action-btn ${this._holdId===s?"action-btn--holding":""}"
            style=${Yt({background:this._colorBg(t),border:"1px solid "+o+"80"})}
            @pointerdown=${this._holdStart(s,()=>this._resume(t))}
            @pointermove=${this._holdMove}
            @pointerup=${this._holdEnd}
            @pointerleave=${this._holdEnd}
            @pointercancel=${this._holdEnd}
          >
            <div class="hold-ring"></div>
            <ha-icon icon="mdi:play" style=${Yt({color:o})}></ha-icon>
            <span>Resume</span>
          </button>
          <button
            class="action-btn action-btn--secondary"
            @click=${()=>this._dock(t)}
          >
            <ha-icon icon="mdi:home" style="color:rgba(var(--avc-info-rgb),0.6)"></ha-icon>
            <span>Dock</span>
          </button>
        </div>
      `}if(h){const o="pause-"+e;return zt`
        <div class="actions">
          <button
            class="action-btn action-btn--warn ${this._holdId===o?"action-btn--holding":""}"
            @pointerdown=${this._holdStart(o,()=>this._pause(t))}
            @pointermove=${this._holdMove}
            @pointerup=${this._holdEnd}
            @pointerleave=${this._holdEnd}
            @pointercancel=${this._holdEnd}
          >
            <div class="hold-ring"></div>
            <ha-icon icon="mdi:pause" style="color:rgb(var(--avc-warn-rgb))"></ha-icon>
            <span>Pause</span>
          </button>
        </div>
      `}const _="start-"+e,f=p?this._colorBg(t):"var(--avc-disabled)",v=p?"1px solid "+o+"80":"1px solid rgba(var(--avc-ink-rgb),0.1)",b=p?o:"rgba(var(--avc-ink-rgb),0.2)",w=p?"rgb(var(--avc-ink-rgb))":"rgba(var(--avc-ink-rgb),0.25)",$=this._roomsFor(t),C=$.filter(e=>this._isRoomSelected(e,t)).length,A=[$.length>0?`${C}/${$.length} rooms`:"",m].filter(Boolean).join(" · ");return zt`
      <div class="actions actions--idle">
        ${this._renderPresetChips(t)}
        <button
          class="action-btn ${p&&this._holdId===_?"action-btn--holding":""}"
          style=${Yt({background:f,border:v,flex:"1"})}
          ?disabled=${!p}
          @pointerdown=${p?this._holdStart(_,()=>this._startClean(t)):Ht}
          @pointermove=${this._holdMove}
          @pointerup=${this._holdEnd}
          @pointerleave=${this._holdEnd}
          @pointercancel=${this._holdEnd}
        >
          <div class="hold-ring"></div>
          <ha-icon icon="mdi:play" style=${Yt({color:b})}></ha-icon>
          <div class="start-body">
            <span style=${Yt({color:w})}>${p?"START":"Select rooms"}</span>
            ${A?zt`<small style="color:rgba(var(--avc-ink-rgb),0.4)">${A}</small>`:Ht}
          </div>
        </button>
      </div>
    `}_jobProgress(){for(const t of this._config.vacuums){const e=this._intAttrs(t)?.job_progress;if(e?.active)return e}return null}_clockStr(t){if(!t)return"";const e=new Date(t);return isNaN(e.getTime())?"":e.toLocaleTimeString(this.hass?.language||[],{hour:"2-digit",minute:"2-digit"})}_vacName(t){return t.name??t.entity.split(".")[1]??t.entity}_renderBattRing(t,e){const o=this._battery(t),s="charging"===(this.hass.states[this._ent(t,"status")??t.entity]?.state??""),l=e/2-2.5,h=2*Math.PI*l,d=o??0,p=null===o?"rgba(var(--avc-ink-rgb),0.2)":d<=20?"rgb(var(--avc-err-rgb))":d<=40?"rgb(var(--avc-warn-rgb))":"rgb(var(--avc-ok-rgb))",u=e-10;return zt`
      <span class="batt-ring" style=${Yt({width:e+"px",height:e+"px"})}
        title=${null!==o?`Battery ${o} %`:""}>
        <svg width=${e} height=${e} viewBox="0 0 ${e} ${e}" aria-hidden="true">
          <circle cx=${e/2} cy=${e/2} r=${l} fill="none" style="stroke: rgba(var(--avc-ink-rgb),0.1)" stroke-width="3"></circle>
          ${null!==o?Tt`<circle class=${s?"batt-ring-arc batt-ring-arc--charging":"batt-ring-arc"} cx=${e/2} cy=${e/2} r=${l} fill="none"
            style=${"stroke: "+p} stroke-width="3" stroke-linecap="round"
            stroke-dasharray="${(h*d/100).toFixed(1)} ${h.toFixed(1)}"></circle>`:Ht}
        </svg>
        ${t.image?zt`<img src=${t.image} alt="" style=${Yt({width:u+"px",height:u+"px"})}>`:zt`<ha-icon icon="mdi:robot-vacuum" style=${Yt({color:this._color(t),"--mdc-icon-size":.6*u+"px"})}></ha-icon>`}
        ${s?zt`<span class="batt-ring-bolt"><ha-icon icon="mdi:lightning-bolt"></ha-icon></span>`:Ht}
        ${this._attnDot(t)}
      </span>`}_renderHero(t){const e=t.filter(t=>this._intAttrs(t));if(!e.length)return Ht;const o=this._jobProgress();if(o){const t=Number(o.rooms_done??0),e=Math.max(1,Number(o.rooms_total??0)),s=Math.round(100*t/e),l=17,h=2*Math.PI*l,d=Object.entries(o.vacuums??{}).filter(([,t])=>t?.room).map(([t,e])=>{const o=this._config.vacuums.find(e=>e.entity===t);return`${o?this._vacName(o):t.split(".")[1]} ${"wet"===e.kind?"mopping":"in"} ${e.room}`}),p=Math.round(Number(o.eta_min_left??0));return zt`
        <div class="meta-hero">
          <span class="hero-ring" aria-hidden="true">
            <svg width="40" height="40" viewBox="0 0 40 40">
              <circle cx="20" cy="20" r=${l} fill="none" style="stroke: rgba(var(--avc-ink-rgb),0.1)" stroke-width="3.5"></circle>
              <circle cx="20" cy="20" r=${l} fill="none" style="stroke: rgb(var(--avc-accent-rgb))" stroke-width="3.5" stroke-linecap="round"
                stroke-dasharray="${(h*s/100).toFixed(1)} ${h.toFixed(1)}" transform="rotate(-90 20 20)"></circle>
            </svg>
            <b>${t}/${o.rooms_total??0}</b>
          </span>
          <span class="hero-text">
            <span class="hero-title">Cleaning · done around ${this._clockStr(o.finish_at)}</span>
            <span class="hero-sub">${p} min left${d.length?" · "+d.join(" · "):""}</span>
          </span>
        </div>`}const s=t.filter(t=>this._isCleaning(t)),age=t=>{const o=this._oldestAgeDays(e,t);return null===o?null:o<1?"today":Math.round(o)+" d ago"},l=age("dry"),h=age("wet"),d=[l?"vacuumed "+l:"",h?"mopped "+h:""].filter(Boolean).join(" · ");return zt`
      <div class="meta-hero">
        <span class="hero-badge"><ha-icon icon=${s.length?"mdi:broom":"mdi:home-outline"}></ha-icon></span>
        <span class="hero-text">
          <span class="hero-title">${s.length?s.map(t=>this._vacName(t)).join(", ")+(s.length>1?" are":" is")+" cleaning":"Home is calm"}</span>
          ${d?zt`<span class="hero-sub">Oldest room: ${d}</span>`:Ht}
        </span>
      </div>`}_renderRobotSheet(){const t=this._robotSheet;if(null===t)return Ht;const e=this._config.vacuums[t];if(!e)return Ht;const o=this._vacName(e),[s,l,h]=this._statusInfo(e),d=this._battery(e),close=()=>{this._robotSheet=null,this._robotSheetTab=null},p=this._roomsFor(e).filter(t=>this._isRoomSelected(t,e)),u=this._totalCleanMins(e),m=this._dockCaps(e).hasDock,_=this._careItems(e).some(t=>!t.binary),f=this._vacAttention(e);let v=this._robotSheetTab?.idx===t?this._robotSheetTab.tab:"clean";("dock"===v&&!m||"care"===v&&!_)&&(v="clean");const tabBtn=(e,o,s,l)=>zt`
      <button class="rs-tab ${v===e?"on":""}" role="tab" aria-selected=${v===e?"true":"false"}
        @click=${o=>{o.stopPropagation(),this._robotSheetTab={idx:t,tab:e}}}>
        <ha-icon icon=${s}></ha-icon><span>${o}</span>
        ${l?zt`<span class="rs-tab-dot" role="img" aria-label="needs attention"></span>`:Ht}
      </button>`,b=zt`
      <div class="robot-sheet-rooms">
        <span class="robot-sheet-label">Rooms</span>
        <span>${p.length?zt`${p.map(t=>t.name??t.key).join(", ")}${u?zt` <small>· ${this._timeStr(u)}</small>`:Ht}`:zt`<small>Pick rooms on the map first</small>`}</span>
      </div>
      ${this._renderActions(e,t)}
      <div class="robot-sheet-foot">
        <button class="mtbtn" @click=${()=>this._dock(e)}><ha-icon icon="mdi:home-import-outline"></ha-icon><span>Send to dock</span></button>
      </div>`;return zt`
      <div class="robot-sheet-scrim" @click=${close}></div>
      <div class="robot-sheet" role="dialog" aria-modal="true" aria-label="${o} controls"
        @keydown=${t=>{"Escape"===t.key&&close()}}>
        <span class="robot-sheet-grip" aria-hidden="true"></span>
        <div class="robot-sheet-head">
          ${this._renderBattRing(e,60)}
          <span class="robot-sheet-id">
            <span class="robot-sheet-name">${o}</span>
            <span class="tile-status" style=${Yt({color:l})}>
              <ha-icon icon=${h}></ha-icon>${s}${null!==d?zt` · ${d}&thinsp;%`:Ht}
            </span>
            <span class="tile-sub">Last clean ${this._lastCleanStr(e)}</span>
          </span>
          <button class="robot-sheet-icon" aria-label="Open ${o} in Home Assistant" title="Home Assistant details"
            @click=${()=>this._fireMoreInfo(e.entity)}><ha-icon icon="mdi:information-outline"></ha-icon></button>
          <button class="robot-sheet-icon" aria-label="Close" @click=${close}><ha-icon icon="mdi:close"></ha-icon></button>
        </div>
        ${m||_?zt`
          <div class="rs-tabs" role="tablist" aria-label="${o} sections">
            ${tabBtn("clean","Clean","mdi:broom",!1)}
            ${m?tabBtn("dock","Dock","mdi:home-outline",f.dock):Ht}
            ${_?tabBtn("care","Care","mdi:toolbox-outline",f.care):Ht}
          </div>`:Ht}
        ${"dock"===v?this._renderDockTab(e):"care"===v?this._renderCareTab(e):b}
      </div>`}_renderStatusCard(t,e){const o=this._isCleaning(t),s=this._isPaused(t),l=this._color(t),h=this._vacName(t),[d,p,u]=this._statusInfo(t),m=this._battery(t),_=this._jobProgress(),f=(_?.vacuums??{})[t.entity],v=this._ent(t,"current_room"),b=v?this.hass.states[v]?.state:void 0,w=f?.room??(b&&"unknown"!==b&&"unavailable"!==b?b:void 0)??this._intAttrs(t)?.vacuum_room_name,$="number"==typeof f?.pct?f.pct:this._progress(t),C=this._ent(t,"error"),A=this._hasError(t)?this.hass.states[C]?.state:null,P=A||(o&&f?.next_room?"Next: "+f.next_room:"Last clean "+this._lastCleanStr(t)),F=!!(this._pinPending?.[t.entity]||this._zonePending?.[t.entity]||s),E="pause-"+e,T=o&&!F,O="tile-"+e,B=this._shownSet.has(e);return zt`
      <div class="status-card status-tile ${o?"status-tile--live":""}" style=${Yt({border:o?"1.5px solid "+l:"1px solid var(--avc-panel-line)"})}>
        <div class="tile-row">
        <button class="tile-main ${this._holdId===O?"tile-main--holding":""} ${B?"":"tile-main--hidden"}"
          aria-label="${h} — open controls" aria-pressed=${B?"true":"false"}
          title="${h} — tap for controls, hold to ${B?"hide it on":"show it on"} the map"
          @pointerdown=${t=>{this._cancelHold(),this._tileHoldFired=!1,this._holdId=O,this._holdStartPos={x:t.clientX,y:t.clientY},this._holdTimer=setTimeout(()=>{this._holdTimer=null,this._holdId=null,this._tileHoldFired=!0,this._toggleShownMulti(e)},Jt)}}
          @pointermove=${this._holdMove}
          @pointerup=${()=>{this._holdId===O&&this._cancelHold()}}
          @pointerleave=${()=>{this._holdId===O&&this._cancelHold()}}
          @pointercancel=${()=>{this._holdId===O&&this._cancelHold()}}
          @click=${()=>{this._tileHoldFired?this._tileHoldFired=!1:this._robotSheet=e}}>
          <div class="hold-ring"></div>
          ${this._renderBattRing(t,50)}
          <span class="tile-text">
            <span class="tile-name"><span class="tile-dot" style=${Yt({background:l})}></span>${h}${B?Ht:zt`<ha-icon class="tile-hidden-ico" icon="mdi:eye-off-outline"></ha-icon>`}</span>
            <span class="tile-status" style=${Yt({color:A?"rgb(var(--avc-err-rgb))":p})}>
              <ha-icon icon=${A?"mdi:alert-circle-outline":u}></ha-icon>${d}${w?zt`<span class="tile-room"> · ${w}</span>`:Ht}
            </span>
            <span class="tile-sub">${P}</span>
          </span>
          <span class="tile-right">
            ${o&&null!==$?zt`
              <b>${$}&thinsp;%</b>
              <span class="tile-bar"><span style=${Yt({width:Math.min(100,$)+"%",background:l})}></span></span>`:null!==m?zt`<small>${m}&thinsp;%</small>`:Ht}
          </span>
          <ha-icon class="tile-chev" icon="mdi:chevron-right"></ha-icon>
        </button>
        ${T?zt`<button class="tile-pause ${this._holdId===E?"action-btn--holding":""}"
            aria-label="Pause ${h} (hold)" title="Hold to pause"
            @pointerdown=${this._holdStart(E,()=>this._pause(t))}
            @pointermove=${this._holdMove}
            @pointerup=${this._holdEnd}
            @pointerleave=${this._holdEnd}
            @pointercancel=${this._holdEnd}>
            <div class="hold-ring"></div><ha-icon icon="mdi:pause"></ha-icon>
          </button>`:Ht}
        </div>
        ${F?this._renderActions(t,e):Ht}
        ${this._renderDebugProgress(t)}
      </div>
    `}_renderMiniGauge(t,e,o,s){return zt`
      <span class="mini-gauge-wrap">
        <ha-icon class="mini-gauge-ico" icon=${o} style=${Yt({color:e})}></ha-icon>
        <span class="mini-gauge" style=${Yt({background:`conic-gradient(${e} ${3.6*t}deg, rgba(var(--avc-ink-rgb),0.12) 0)`})}>
          <span>${t}${s?"~":""}</span>
        </span>
      </span>`}_currentRoomName(t){return this._intAttrs(t)?.vacuum_room_name}_mmss(t){const e=Math.max(0,Math.round(t));return`${Math.floor(e/60)}:${String(e%60).padStart(2,"0")}`}_renderDebugProgress(t){if(!this._config.debug_room_progress)return Ht;const e=this._roomsFor(t).map(e=>({r:e,p:this._roomProgress(t,e)})).filter(t=>t.p&&(null!=t.p.dry_pct||null!=t.p.wet_pct||null!=t.p.elapsed_s));if(!e.length)return Ht;const o=this._color(t),s=this._intEntity(t),l=s?Date.parse(this.hass.states[s]?.last_updated??""):NaN,h=this._currentRoomName(t),d=this._isCleaning(t),p=this._isPaused(t),u=!d&&!p||isNaN(l)?0:Math.max(0,(this._now-l)/1e3);return zt`
      <div class="dbg-prog">
        ${e.map(({r:t,p:e})=>{const s=(t.key===h||t.name===h)&&(d||p),l=(e.elapsed_s??0)+(s?u:0);let m=e.est_s??null;s&&p&&null!=m&&(m+=u);const _=null!=m?`${this._mmss(l)}/${this._mmss(m)}`:this._mmss(l),f=e.passes&&e.passes>1?e.dry_pass??e.wet_pass:null,v=[null!=e.dry_floor?`dry floor ${e.dry_floor}%`:"",null!=e.wet_floor?`wet floor ${e.wet_floor}%`:""].filter(Boolean).join(" · ");return zt`
            <span class="dbg-prog-item" title=${`dry ${e.dry_pct??"—"}% · wet ${e.wet_pct??"—"}%${v?" · "+v:""}`}>
              ${t.icon?zt`<ha-icon icon=${t.icon}></ha-icon>`:Ht}
              <span class="dbg-prog-name">${t.name??t.key}</span>
              ${null!=e.dry_pct?this._renderMiniGauge(e.dry_pct,o,"mdi:broom",!!e.dry_calibrating):Ht}
              ${null!=e.wet_pct?this._renderMiniGauge(e.wet_pct,"rgb(var(--avc-info-rgb))","mdi:water",!!e.wet_calibrating):Ht}
              ${null!=f?zt`<small title="Pass">${f}/${e.passes}</small>`:Ht}
              ${null!=e.elapsed_s?zt`<small>${_}</small>`:Ht}
            </span>
          `})}
      </div>
    `}_shownOrdered(){return[...this._shownSet].filter(t=>t<this._config.vacuums.length).sort((t,e)=>t-e)}_gridShown(){const t=this._shownOrdered();return"portrait"===this._profile&&"merged"!==this._config.map_mode&&t.length>1?t.slice(0,1):t}_regionTemplate(t,e){const o=this._gridShown(),s="merged"===this._config.map_mode,vacsOf=t=>t.map(t=>this._config.vacuums[t]);switch(t){case"badges":return zt`<div class="badges-row badges-row--grid">
          ${"landscape"===this._profile?Ht:this._config.vacuums.map((t,e)=>this._renderBadge(t,e))}
          ${(this._config.global_actions??[]).map((t,e)=>this._renderGlobalBadge(t,e))}
        </div>`;case"autobar":return this._renderAutoBar();case"plan":return this._renderPlanPreview();case"picker":return this._renderVacuumPicker();case"map":return s?this._renderResponsive(this._renderMergedMap()):zt`${o.map(t=>this._renderResponsive(this._renderMap(this._config.vacuums[t])))}`;case"tools":return this._renderMetaBar(vacsOf(o));case"hero":{const t=this._renderHero(this._config.vacuums);return t===Ht?Ht:zt`<div class="meta-bar meta-bar--hero">${t}</div>`}case"dock":return this._renderDock(!("start"in e.place),"landscape"===this._profile&&!("picker"in e.place));case"start":return this._renderStartBar();case"status":return this._usesPlanColumn()?zt`${this._config.vacuums.map((t,e)=>this._renderStatusCard(t,e))}`:zt`${o.map(t=>this._renderStatusCard(this._config.vacuums[t],t))}`;default:return null}}_themed(){return"legacy"!==(this._config.theme??se)}_rootClasses(){const t=this._config.theme??se,e=[];return"legacy"!==t&&e.push("avc-theme","avc-theme--"+t),this._config.reduce_motion&&e.push("avc-still"),this._isCalm()&&e.push("avc-calm"),e.join(" ")}_rootVars(){const t=this._config.accent;if(!t)return{};const e=function hexToRgbChannel(t){const e=/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(t.trim());if(!e)return null;let o=e[1];return 3===o.length&&(o=o.split("").map(t=>t+t).join("")),[0,2,4].map(t=>parseInt(o.slice(t,t+2),16)).join(", ")}(t);return e?{"--avc-accent-rgb":e}:{}}_isCalm(){if(!1===this._config.calm_state)return!1;if("normal"!==this._mapMode)return!1;if(this._modeSheetOpen)return!1;const t=this._config.vacuums;return!t.some(t=>this._isCleaning(t)||this._hasError(t))&&!this._allRoomKeys().some(e=>this._isRoomSelectedAny(e,t))}_renderGrid(t){const e="portrait"===this._profile&&this._stackTopology;let o=e?me:function resolveProfile(t,e){const o=t[e]??{},s=ge[e];return{columns:o.columns?.length?o.columns:s.columns,rows:o.rows?.length?o.rows:s.rows,place:o.place&&Object.keys(o.place).length?o.place:s.place}}(t,this._profile);const s="hero"in o.place?this._regionTemplate("hero",o):Ht;null!=s&&s!==Ht||(o=function withoutRegion(t,e){const o=t.place[e];if(!o)return t;const s={...t.place};delete s[e];const l="number"==typeof o.row?o.row:Number(o.row);if(!Number.isInteger(l)||l<1||l>t.rows.length)return{...t,place:s};const lines=t=>{if(void 0===t)return null;const e=String(t).split("/").map(t=>Number(t.trim()));return e.every(t=>Number.isInteger(t)&&t>0)?e:null};for(const e of Object.values(s)){const o=lines(e.row);if(!o)return{...t,place:s};const h=o[0],d=o.length>1?o[1]:h+1;if(h<=l&&d>l)return{...t,place:s}}const shift=t=>t>l?t-1:t,h={};for(const[t,e]of Object.entries(s)){const o=lines(e.row);h[t]={...e,row:o.length>1?o.map(shift).join("/"):shift(o[0])}}return{...t,rows:t.rows.filter((t,e)=>e!==l-1),place:h}}(o,"hero"));const l=this._schemaWarning();return zt`
      <ha-card class=${this._rootClasses()} style=${Yt({padding:"0",display:"block",...this._rootVars()})}>
        ${this.editMode?zt`<div class="version-chip">
          <div>v${Zt} · ${Math.round(this._cardW)}w · ${this._profile}</div>
          ${this._config.debug?zt`<div>${e?"stack":this._themed()?"rail":"split"} · box:${Math.round(this._mapAvailW)}x${Math.round(this._mapAvailH)}</div>`:Ht}
        </div>`:Ht}
        <div class="avc-grid avc-grid--${this._profile}" style=${Yt(function gridRootStyles(t,e){return{display:"grid",width:"100%",height:resolveHeightCss(t),alignContent:"start",gridTemplateColumns:trackList(e.columns),gridTemplateRows:trackList(e.rows),gap:t.gap??"6px",boxSizing:"border-box"}}(t,o))}>
          ${l?zt`<div class="avc-schemawarn">
            <ha-icon icon="mdi:alert" style="--mdc-icon-size:18px"></ha-icon><span>${l}</span>
          </div>`:Ht}
          ${Object.entries(o.place).map(([t,e])=>{const l="hero"===t?s:this._regionTemplate(t,o);return null==l||l===Ht?Ht:zt`<div class="avc-region avc-region--${t}" style=${Yt(function regionStyles(t){const e={gridRow:String(t.row??"auto"),gridColumn:String(t.col??"1"),overflow:t.overflow??"hidden",position:"relative",minWidth:"0",minHeight:"0"};return t.align&&"stretch"!==t.align&&(e.alignSelf=t.align),e}(e))}>${l}</div>`})}
        </div>
        ${this._renderRobotSheet()}${this._renderVeNotice()}
      </ha-card>
    `}render(){if(!this._config||!this.hass)return Ht;if(this._config.layout)return this._renderGrid(this._config.layout);const t=this._schemaWarning();return zt`
      <ha-card class=${this._rootClasses()} style=${Yt(this._rootVars())}>
        ${this.editMode?zt`<div class="version-chip">v${Zt} · ${Math.round(this._cardW)}w</div>`:Ht}
        ${t?zt`<div style="margin:0 4px;padding:8px 12px;border-radius:var(--avc-th-r-l,12px);border:1px solid rgba(var(--avc-warn-rgb),0.55);background:rgba(var(--avc-warn-rgb),0.12);color:rgb(var(--avc-warn-rgb));font-size:var(--avc-th-fs-s,12px);display:flex;align-items:center;gap:8px">
          <ha-icon icon="mdi:alert" style="--mdc-icon-size:18px"></ha-icon><span>${t}</span>
        </div>`:Ht}
        <div class="badges-row">
          ${this._config.vacuums.map((t,e)=>this._renderBadge(t,e))}
          ${(this._config.global_actions??[]).map((t,e)=>this._renderGlobalBadge(t,e))}
        </div>
        ${this._renderAutoBar()}
        ${this._renderPlanPreview()}
        ${"merged"===this._config.map_mode?zt`
              ${this._renderResponsive(this._renderMergedMap())}
              ${this._shownOrdered().map(t=>zt`
                ${this._renderMapTools(this._config.vacuums[t])}
                ${this._renderStatusCard(this._config.vacuums[t],t)}
              `)}
            `:this._shownOrdered().map(t=>zt`
                ${this._renderResponsive(this._renderMap(this._config.vacuums[t]))}
                ${this._renderMapTools(this._config.vacuums[t])}
                ${this._renderStatusCard(this._config.vacuums[t],t)}
              `)}
        ${this._renderRobotSheet()}${this._renderVeNotice()}
      </ha-card>
    `}};ve.styles=i$6`
    /* ══ Design tokens (v1.2.0, docs/35) ═══════════════════════════════════
     * Every colour in this stylesheet resolves through one of the channel
     * bases below, so a theme is a handful of numbers rather than the ~130
     * literals this file used to carry — and, more importantly, a theme can
     * no longer MISS a spot the way a find-and-replace pass would.
     *
     * :host holds the LEGACY values verbatim: with no theme class applied
     * the card renders exactly as 1.1.0 did. .avc-theme-* further down
     * layers the real themes on top of that baseline, so theme: legacy
     * costs nothing but the absence of a class name.
     *
     * The one deliberate exception is .map-wrap, which pins the ink/shade
     * channels back to white-on-black regardless of theme — everything
     * inside it is painted on the vacuum's own map bitmap, not on the card's
     * surface, so a light theme must not reach in there (it would turn every
     * on-map label invisible). Derived tokens re-resolve per element, so
     * that one reset covers all of them without listing any.
     */
    :host {
      display: block;
      width: 100%;

      /* docs/44 K8 (card 1.46.0): ONE type and ONE radius scale.
       *
       * --avc-fs-* / --avc-r-* are the scale itself, live in every theme
       * (hero, tiles, rail and sheets are structural, not a theme choice).
       *
       * Every older rule states BOTH values in one place:
       *   font-size: var(--avc-th-fs-xs, 10px);
       * --avc-th-* is defined ONLY under .avc-theme (right below :host), so
       * theme: legacy falls through to the literal — the exact 1.1.0 value —
       * and every other theme lands on a scale step. That keeps legacy
       * pixel-identical without a second set of override selectors, and
       * tests/type-scale.spec.ts walks the rendered card to prove no themed
       * element sits off the scale.
       *
       * micro (10px) is for numerals and chips painted ON the map or inside
       * a gauge ring, where 11px does not fit a small room; nothing else. */
      --avc-fs-micro: 10px;
      --avc-fs-xs: 11px;
      --avc-fs-s: 12px;
      --avc-fs-m: 13px;
      --avc-fs-l: 15px;
      --avc-fs-xl: 20px;
      --avc-r-s: 6px;
      --avc-r-m: 10px;
      --avc-r-l: 16px;
      --avc-r-pill: 999px;

      /* Channel bases */
      --avc-ink-rgb: 255, 255, 255;
      --avc-shade-rgb: 0, 0, 0;
      --avc-scrim-rgb: 18, 18, 18;
      --avc-scrim-2-rgb: 30, 30, 30;

      /* Semantic palette. accent is intent (START, selection, focus);
       * ok/warn/err/hint/tool/info are meaning and stay out of the accent's
       * reach on purpose (docs/25 §6). */
      --avc-accent-rgb: 111, 191, 115;
      --avc-ok-rgb: 82, 196, 26;
      --avc-warn-rgb: 250, 173, 20;
      --avc-err-rgb: 255, 77, 79;
      --avc-hint-rgb: 212, 160, 23;
      --avc-tool-rgb: 59, 130, 246;
      --avc-info-rgb: 64, 169, 255;
      /* Only the CHANNELS live here, never a ready-made
       * --avc-ink: rgb(var(--avc-ink-rgb)) alias. A custom property whose
       * value contains var() is substituted at computed-value time on the
       * element it is DECLARED on, and the already-substituted result is what
       * inherits — so such an alias would freeze at the :host value and quietly
       * ignore both the theme classes and the .map-wrap reset below. Rules
       * therefore spell out rgb(var(--avc-x-rgb)) at the point of use, where it
       * resolves against that element's channels. Caught by
       * tests/theme.spec.ts, not by reading the spec. */

      /* Surfaces — named separately from the raw shade channel so a theme can
       * LIFT a panel off the background instead of only tinting it. */
      --avc-surface: rgba(var(--avc-shade-rgb), 0.6);
      --avc-panel: rgba(var(--avc-ink-rgb), 0.03);
      --avc-panel-line: rgba(var(--avc-ink-rgb), 0.08);
      --avc-panel-strong: rgba(var(--avc-ink-rgb), 0.06);
      --avc-panel-strong-line: rgba(var(--avc-ink-rgb), 0.16);
      --avc-sunken: rgba(var(--avc-shade-rgb), 0.25);
      --avc-disabled: rgba(60, 60, 60, 0.4);

      /* Elevation. Legacy has none: hairline borders did the whole job, which
       * is the single loudest "instrument panel" tell in the old look. */
      --avc-elev-1: none;
      --avc-elev-2: none;

      /* Motion. --avc-press is the scale a pressable element takes while
       * held — 1 means no feedback at all, i.e. 1.1.0's behaviour. */
      --avc-ease: cubic-bezier(0.2, 0.8, 0.2, 1);
      --avc-press: 1;
      --avc-press-ms: 0s;
      --avc-live: none;
    }

    /* K8 scale switch (see the --avc-fs-* comment in :host). Only themed
     * roots define these, so legacy rules fall back to their literal. */
    .avc-theme {
      --avc-th-fs-micro: var(--avc-fs-micro);
      --avc-th-fs-xs: var(--avc-fs-xs);
      --avc-th-fs-s: var(--avc-fs-s);
      --avc-th-fs-m: var(--avc-fs-m);
      --avc-th-fs-l: var(--avc-fs-l);
      --avc-th-fs-xl: var(--avc-fs-xl);
      --avc-th-r-s: var(--avc-r-s);
      --avc-th-r-m: var(--avc-r-m);
      --avc-th-r-l: var(--avc-r-l);
      --avc-th-r-pill: var(--avc-r-pill);
    }
    /* micro numerals need a slightly larger disc than legacy's 8px did. */
    .avc-theme .mini-gauge span { width: 18px; height: 18px; }

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
      top: 4px;
      right: 8px;
      max-width: calc(100% - 16px);
      text-align: right;
      font-size: var(--avc-th-fs-xs, 10px);
      line-height: 1.5;
      font-weight: 600;
      color: rgba(var(--avc-ink-rgb), 0.85);
      background: rgba(var(--avc-shade-rgb), 0.75);
      border-radius: var(--avc-th-r-s, 6px);
      padding: 3px 6px;
      pointer-events: none;
      z-index: 20;
    }

    /* ── Grid layout (docs/18) ───────────────────────────────────────── */
    .badges-row--grid {
      align-items: center;
      padding: 4px 6px;
    }

    /* Emergency manual-control icon strip (docs/19 follow-up, portrait only).
       Full-width, one flex slot per vacuum (mirrors .dock-head/.dock-mode
       below it). The slot shares available width equally (n=2 → wide slots,
       n=4 → narrower) and the button fills its slot (width: 100%, capped by
       min/max-width) with aspect-ratio 1:1 keeping it a circle at any size —
       so the strip actually uses the space it has instead of staying pinned
       at a fixed 34px regardless of vacuum count (field feedback
       2026-07-17). */
    .vac-icon-strip { display: flex; gap: 6px; margin-bottom: 6px; }
    .vac-icon-slot { flex: 1; min-width: 0; display: flex; justify-content: center; }
    .vac-icon-btn {
      position: relative;
      width: 100%; min-width: 28px; max-width: 64px; aspect-ratio: 1 / 1; height: auto;
      border-radius: 50%; padding: 0; overflow: hidden;
      display: flex; align-items: center; justify-content: center;
      /* docs/25 §6: thinner ring (was 2px) — reads calmer, still clearly a
       * status indicator, without competing for visual weight with START. */
      background: rgba(var(--avc-ink-rgb), 0.05); border: 1.5px solid rgba(var(--avc-ink-rgb), 0.2); cursor: pointer;
      transition: opacity 0.15s ease;
      /* Mobile hold-gesture fix: without these, iOS/Android WebViews race our
       * 600ms pointerdown timer against their own long-press affordances
       * (image-save callout, text selection, Haptic Touch preview) — the
       * native gesture wins right at the deadline, firing pointercancel a
       * moment before our setTimeout callback, so the ring animation still
       * visually completes but _toggleShownMulti() never runs. Mirrors the
       * fix already applied to .layer-btn. */
      touch-action: manipulation;
      -webkit-touch-callout: none;
      user-select: none;
    }
    .vac-icon-btn img { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; -webkit-touch-callout: none; user-select: none; pointer-events: none; }
    .vac-icon-btn ha-icon { --mdc-icon-size: 20px; }
    .vac-icon-btn--hidden { opacity: 0.35; }

    /* Vacuum picker (docs/19 A5): landscape's vertical replacement for the
     *  horizontal badge-row tabs, sits right above the dock room-list. */
    .vac-picker {
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding: 5px;
      box-sizing: border-box;
      background: var(--avc-panel);
      border: 1px solid var(--avc-panel-line);
      border-radius: var(--avc-th-r-l, 12px);
    }
    /* v1.1.0 follow-up (2026-08-03): field feedback that the picker column's
     * full-size badges (same .badge used by the legacy/portrait horizontal
     * badge row, 44px avatar + generous padding) were too large for what's
     * just a vertical vacuum switcher, right above an already-compact dock.
     * Scoped to .vac-picker only — the legacy/portrait badge row keeps its
     * established size unchanged. */
    .vac-picker .badge { width: 100%; box-sizing: border-box; padding: 4px 12px 4px 4px; gap: 8px; }
    .vac-picker .badge-img, .vac-picker .badge-icon { width: 26px; height: 26px; --mdc-icon-size: 18px; }
    .vac-picker .badge-name { font-size: var(--avc-th-fs-s, 12px); }

    /* Dock (docs/12 §3): selection + plan + pinning in one column */
    .dock {
      display: flex;
      flex-direction: column;
      /* docs/25 §6 (visual language pass, 2026-07-24): a bit more breathing
       * room between the icon strip / layer toggle / mode row — "generous
       * whitespace" was one of the agreed directions, mocked up and
       * confirmed against the card's actual dark theme before landing here. */
      gap: 9px;
      height: 100%;
      padding: 8px;
      box-sizing: border-box;
      background: var(--avc-panel);
      border: 1px solid var(--avc-panel-line);
      border-radius: var(--avc-th-r-l, 12px);
    }
    /* Portrait-only dry/wet path visibility row (see _renderDock) — reuses
       .mtbtn from the meta bar, wrapped to full width like .dock-head below. */
    .dock-layers { display: flex; gap: 4px; margin-bottom: 4px; }
    .dock-layers .mtbtn { flex: 1; justify-content: center; }
    .dock-head { display: flex; gap: 4px; }
    .dock-mode {
      flex: 1;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      padding: 7px 4px;
      border-radius: var(--avc-th-r-m, 10px);
      cursor: pointer;
      font-family: inherit;
      font-size: var(--avc-th-fs-xs, 11px);
      /* docs/25 §6: 700 read as one more hard-edged/technical accent among
       * several — the mode row is a secondary control next to START, not a
       * second primary action, so its resting weight steps down a notch.
       * The .on state keeps its own distinct (bolder) weight below, so the
       * active/inactive contrast doesn't shrink. */
      font-weight: 600;
      color: rgba(var(--avc-ink-rgb), 0.5);
      background: transparent;
      border: 1px solid rgba(var(--avc-ink-rgb), 0.15);
    }
    .dock-mode ha-icon { --mdc-icon-size: 15px; }
    .dock-mode.on {
      color: rgb(var(--avc-ink-rgb));
      font-weight: 700;
      background: rgba(var(--avc-ink-rgb), 0.12);
      border-color: rgba(var(--avc-ink-rgb), 0.5);
    }
    .dock-sheet {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 8px;
      background: var(--avc-sunken);
      border: 1px solid var(--avc-panel-line);
      border-radius: var(--avc-th-r-l, 10px);
    }
    /* ── docs/46 G1: robot sheet tabs (Clean / Dock / Care) ─────────────── */
    .rs-tabs {
      display: flex; gap: 2px; padding: 3px; border-radius: var(--avc-r-m);
      background: rgba(var(--avc-ink-rgb), 0.06);
    }
    .rs-tab {
      flex: 1; display: flex; align-items: center; justify-content: center; gap: 6px;
      min-height: 38px; border: none; border-radius: var(--avc-r-m); cursor: pointer;
      background: transparent; color: rgba(var(--avc-ink-rgb), 0.6);
      font-family: inherit; font-size: var(--avc-fs-m); font-weight: 500; --mdc-icon-size: 16px;
    }
    .rs-tab.on {
      background: rgba(var(--avc-ink-rgb), 0.12); color: rgb(var(--avc-ink-rgb)); font-weight: 600;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    }
    .rs-tab-dot, .vac-attn-dot {
      width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0;
      background: rgb(var(--avc-err-rgb));
    }
    .vac-attn-dot {
      position: absolute; top: 0; right: 0; width: 11px; height: 11px;
      box-shadow: 0 0 0 2px var(--avc-surface, rgb(var(--avc-scrim-2-rgb)));
    }
    .vac-icon-btn .vac-attn-dot { top: 12%; right: 12%; }
    .rs-pane { display: flex; flex-direction: column; gap: 10px; }
    .rs-dock-state {
      display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: var(--avc-r-m);
      background: rgba(var(--avc-ink-rgb), 0.05); font-size: var(--avc-fs-m); --mdc-icon-size: 18px;
    }
    .rs-dock-state ha-icon { color: rgb(var(--avc-ok-rgb)); }
    .rs-dock-state.bad ha-icon { color: rgb(var(--avc-err-rgb)); }
    /* docs/47 §3: confirm a latched dock error. */
    .rs-dock-resolve {
      margin-left: auto; display: inline-flex; align-items: center; gap: 6px; flex-shrink: 0;
      padding: 6px 12px; border-radius: var(--avc-r-pill); border: 1px solid rgba(var(--avc-ink-rgb), 0.16);
      background: rgba(var(--avc-ink-rgb), 0.06); color: inherit; font: inherit; font-size: var(--avc-fs-m);
      cursor: pointer; --mdc-icon-size: 16px;
    }
    .rs-dock-state .rs-dock-resolve ha-icon { color: rgb(var(--avc-ok-rgb)); }
    .rs-dock-resolve:active { transform: scale(0.97); }
    .rs-care { gap: 0; }
    .rs-care .dock-sheet-care-row { padding: 8px 2px; border-bottom: 1px solid rgba(var(--avc-ink-rgb), 0.06); }
    .rs-care-main { display: flex; flex-direction: column; gap: 5px; flex: 1; min-width: 0; }
    .rs-care-line { display: flex; align-items: center; gap: 6px; }
    .rs-care-line .dock-sheet-care-label { flex: 1; }
    .rs-care-warn { color: rgb(var(--avc-err-rgb)); --mdc-icon-size: 14px; }
    .rs-care .low .dock-sheet-care-value { color: rgb(var(--avc-err-rgb)); font-weight: 600; }
    .rs-care-bar { display: block; height: 4px; border-radius: var(--avc-r-pill); background: rgba(var(--avc-ink-rgb), 0.08); overflow: hidden; }
    .rs-care-bar > span { display: block; height: 100%; border-radius: inherit; background: rgb(var(--avc-ok-rgb)); }
    .rs-care .low .rs-care-bar > span { background: rgb(var(--avc-err-rgb)); }
    .rs-note { font-size: var(--avc-fs-s); color: rgba(var(--avc-ink-rgb), 0.55); }
    .dock-sheet-debug {
      display: flex;
      flex-direction: column;
      gap: 2px;
      font-size: var(--avc-th-fs-xs, 10px);
      color: rgba(var(--avc-ink-rgb), 0.4);
    }
    .dock-sheet-actions { display: flex; flex-wrap: wrap; gap: 8px; }
    .dock-sheet-action {
      flex: 1 1 27%;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      padding: 10px 0;
      border-radius: var(--avc-th-r-m, 9px);
      cursor: pointer;
      font-family: inherit;
      font-size: var(--avc-th-fs-xs, 11px);
      color: rgba(var(--avc-ink-rgb), 0.8);
      background: rgba(var(--avc-ink-rgb), 0.05);
      border: 1px solid rgba(var(--avc-ink-rgb), 0.12);
    }
    .dock-sheet-action ha-icon { --mdc-icon-size: 18px; }
    /* A dock cycle that is currently running: the button now stops it, so it
       reads as active rather than as another thing to start. */
    .dock-sheet-action.running {
      color: rgba(var(--avc-ink-rgb), 0.95);
      background: rgba(var(--avc-accent-rgb), 0.18);
      border-color: rgba(var(--avc-accent-rgb), 0.5);
    }
    .dock-sheet-care {
      display: flex;
      flex-direction: column;
      gap: 6px;
      margin-top: 10px;
      padding-top: 10px;
      border-top: 1px solid rgba(var(--avc-ink-rgb), 0.08);
    }
    .dock-sheet-care-row {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: var(--avc-th-fs-s, 12px);
    }
    .dock-sheet-care-label {
      flex: 1;
      color: rgba(var(--avc-ink-rgb), 0.75);
    }
    .dock-sheet-care-value {
      color: rgba(var(--avc-ink-rgb), 0.5);
      font-variant-numeric: tabular-nums;
    }
    .dock-sheet-care-badge {
      font-size: var(--avc-th-fs-xs, 10px);
      font-weight: 600;
      padding: 2px 7px;
      border-radius: var(--avc-th-r-pill, 20px);
      background: rgba(var(--avc-ok-rgb), 0.18);
      color: rgb(var(--avc-ok-rgb));
    }
    .dock-sheet-care-badge.warn {
      background: rgba(var(--avc-warn-rgb), 0.2);
      color: rgb(var(--avc-warn-rgb));
    }
    .dock-sheet-care-reset {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 26px;
      height: 26px;
      border-radius: 50%;
      cursor: pointer;
      color: rgba(var(--avc-ink-rgb), 0.6);
      background: rgba(var(--avc-ink-rgb), 0.06);
      border: 1px solid rgba(var(--avc-ink-rgb), 0.1);
    }
    .dock-sheet-care-reset ha-icon { --mdc-icon-size: 14px; }
    /* docs/25 §10 field-caught (2026-07-25): spinner while waiting for the
     * roborock integration's own poll to reflect the reset — see
     * _careResetPending's doc comment for why this is needed. */
    .dock-sheet-care-reset.pending { cursor: default; opacity: 0.55; }
    .dock-sheet-care-reset.pending ha-icon { animation: avc-spin 0.9s linear infinite; }
    @keyframes avc-spin { to { transform: rotate(360deg); } }
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
      border-radius: var(--avc-th-r-m, 9px);
      cursor: pointer;
      font-family: inherit;
      text-align: left;
      color: rgba(var(--avc-ink-rgb), 0.85);
      background: rgba(var(--avc-ink-rgb), 0.03);
      border: 1px solid rgba(var(--avc-ink-rgb), 0.07);
    }
    .dock-row.on {
      background: rgba(var(--avc-ok-rgb), 0.1);
      border-color: rgba(var(--avc-ok-rgb), 0.5);
    }
    .dock-ric { --mdc-icon-size: 16px; color: rgba(var(--avc-ink-rgb), 0.55); flex-shrink: 0; }
    /* docs/28 §4: wraps to a second line instead of truncating — an unusually
     * long room name stays fully readable, it just costs that one row a bit
     * more height. Deliberately NOT flex:1 (that would make this the
     * growable part of the row, fighting the landscape column's own
     * content-driven max-content sizing, docs/28 §4) — a fixed max-width
     * bounds this element's own max-content contribution, which is what lets
     * the grid column settle on the row's TYPICAL width instead of whatever
     * the single longest name would need unwrapped. */
    .dock-name {
      flex: 0 1 auto;
      max-width: 128px;
      min-width: 0;
      overflow-wrap: break-word;
      white-space: normal;
      font-size: var(--avc-th-fs-s, 12px);
      font-weight: 600;
      line-height: 1.25;
    }
    /* Sequence hint (docs/19 follow-up, TODO #2) — amber, not red: it's a
       heads-up about ETA accuracy, not an error blocking the clean. */
    .dock-unseq { --mdc-icon-size: 13px; color: rgb(var(--avc-hint-rgb)); flex-shrink: 0; margin: 0 2px; }
    .dock-unassigned { --mdc-icon-size: 13px; color: rgb(var(--avc-err-rgb)); flex-shrink: 0; margin: 0 2px; }
    /* 2026-07-25 field feedback: the trailing warning icons + ages + avatars
     * used to be flat siblings of .dock-ric/.dock-name in the row's own
     * flex flow — with no growing element and no justify-content, they
     * packed left along with the name instead of anchoring to the row's
     * right edge, so a room WITHOUT the optional unassigned/unsequenced
     * icon (extra width before .dock-ages) landed its avatars at a
     * different x-position than a room WITH one, and a short room name left
     * a gap before the info block on rows narrower than the column's
     * settled width (docs/28 §4) — looked "scattered" row-to-row instead of
     * two clean columns. Grouping them into one .dock-info block with
     * margin-left: auto makes icon+name the fixed left column and
     * everything else one right-anchored block, regardless of which
     * optional icons are present or how long the name is. */
    .dock-info { display: inline-flex; align-items: center; gap: 6px; margin-left: auto; flex-shrink: 0; }
    .dock-ages { display: inline-flex; gap: 6px; flex-shrink: 0; }
    .dock-age { display: inline-flex; align-items: center; gap: 2px; font-size: var(--avc-th-fs-xs, 10px); }
    .dock-age ha-icon { --mdc-icon-size: 12px; color: rgba(var(--avc-ink-rgb), 0.3); }
    /* Persistent last-clean coverage % (docs/29) — deliberately dimmer/smaller than the
       age badge next to it: age is the primary "should I clean this?" signal, coverage
       is supporting detail. */
    .dock-cov { font-size: var(--avc-th-fs-micro, 9px); opacity: 0.45; margin-left: 1px; }
    /* docs/45: finished, but part of the reachable floor was never reached. */
    .dock-age ha-icon.dock-cov-warn { --mdc-icon-size: 11px; color: rgb(var(--avc-warn-rgb)); }
    .dock-avatars { display: inline-flex; gap: 3px; flex-shrink: 0; }
    .dock-chip {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 1px;
      min-width: 24px;
      height: 17px;
      padding: 0 5px;
      border-radius: var(--avc-th-r-pill, 9px);
      font-size: var(--avc-th-fs-xs, 10px);
      font-weight: 700;
      border: 1px solid transparent;
      cursor: pointer;
    }
    .dock-chip--empty { color: rgba(var(--avc-ink-rgb), 0.25); border-color: rgba(var(--avc-ink-rgb), 0.15); }
    .dock-foot {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      border-top: 1px solid rgba(var(--avc-ink-rgb), 0.08);
      padding-top: 6px;
    }
    .dock-est { font-size: var(--avc-th-fs-xs, 11px); color: rgba(var(--avc-ink-rgb), 0.45); }
    .dock-run {
      flex: 0 0 auto;
      padding: 7px 14px;
      background: rgba(var(--avc-accent-rgb), 0.24);
      border: 1px solid rgba(var(--avc-accent-rgb), 0.65);
      color: rgb(var(--avc-ink-rgb));
    }

    /* START bar (portrait bottom, docs/18 §7d). docs/25 §6 (visual language
     * pass, 2026-07-24): the one thing this whole screen is FOR, so it
     * should read as unambiguously the heaviest element on it — bigger,
     * rounder, and a calmer sage green instead of the same saturated
     * "technical" green used for status accents elsewhere (cleaning state,
     * battery, etc.) — reserving that vivid green for status meaning and
     * giving START its own, purely intentional color instead of borrowing
     * one. Mocked up and confirmed against the actual dark card theme
     * before landing here; the room-count/ETA text stays inline in the
     * button (already was — the mockup's separate line under the button
     * was an artifact of the mockup, not a real proposal to split it out). */
    /* docs/25 §10 follow-up (2026-07-25): the START bar is now a 3-segment
     * row (mode / START / Dock, mirrors the manufacturer app's bottom bar) —
     * .start-row is the flex container, .start-bar keeps its own look
     * but stretches to fill the middle slot instead of the whole region. */
    .start-row {
      display: flex;
      align-items: stretch;
      width: 100%;
      height: 100%;
      min-height: 52px;
      gap: 8px;
    }
    .start-row .start-bar { width: auto; flex: 1; min-width: 0; }
    .start-bar {
      position: relative;
      overflow: hidden;
      width: 100%;
      height: 100%;
      min-height: 52px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      border-radius: var(--avc-th-r-l, 18px);
      cursor: pointer;
      font-family: inherit;
      font-size: var(--avc-th-fs-l, 16px);
      font-weight: 700;
      color: rgb(var(--avc-ink-rgb));
      background: rgba(var(--avc-accent-rgb), 0.24);
      border: 1px solid rgba(var(--avc-accent-rgb), 0.65);
    }
    .start-bar:disabled {
      cursor: default;
      color: rgba(var(--avc-ink-rgb), 0.25);
      background: var(--avc-disabled);
      border-color: rgba(var(--avc-ink-rgb), 0.1);
    }
    .start-bar ha-icon { --mdc-icon-size: 22px; position: relative; z-index: 1; }
    .start-bar span { position: relative; z-index: 1; }
    .start-bar--cancel {
      background: rgba(var(--avc-warn-rgb), 0.16);
      border-color: rgba(var(--avc-warn-rgb), 0.6);
    }
    /* Side segments (mode / dock) — same family as .start-bar but a fixed
     * narrow width so the middle START segment keeps most of the bar. */
    .start-seg {
      flex: 0 0 auto;
      width: 54px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 2px;
      border-radius: var(--avc-th-r-l, 16px);
      cursor: pointer;
      font-family: inherit;
      font-size: var(--avc-th-fs-xs, 10px);
      font-weight: 600;
      color: rgba(var(--avc-ink-rgb), 0.65);
      background: rgba(var(--avc-ink-rgb), 0.05);
      border: 1px solid rgba(var(--avc-ink-rgb), 0.15);
    }
    .start-seg ha-icon { --mdc-icon-size: 20px; }
    .start-seg.on {
      color: rgb(var(--avc-ink-rgb));
      font-weight: 700;
      background: rgba(var(--avc-ink-rgb), 0.14);
      border-color: rgba(var(--avc-ink-rgb), 0.5);
    }

    .map-tools-label {
      font-size: var(--avc-th-fs-xs, 11px);
      font-weight: 700;
      color: rgba(var(--avc-ink-rgb), 0.45);
      align-self: center;
      min-width: 64px;
    }

    /* Counter-rotate small on-map chips inside the rotated map so their text
     *  stays upright (the rotation wrapper adds .avc-rot). --map-rot is set
     *  inline on the .avc-rot wrapper to the actual total angle (docs/32 —
     *  90/180/270 degrees, not just the old fixed 90° case), so one rule now
     *  covers all of them instead of a hardcoded -90deg. */
    .avc-rot .room-gauge { transform: rotate(calc(-1 * var(--map-rot))); }
    .avc-rot .rl-prog { transform: rotate(calc(-1 * var(--map-rot))); }
    .avc-rot .room-btn > ha-icon,
    .avc-rot .room-overlay > ha-icon { transform: rotate(calc(-1 * var(--map-rot))); }
    /* Field-caught 2026-08-03, superseded 1.0.7: the assign chip used to be
     * counter-rotated via this shared .avc-rot rule like every other on-map
     * label (room-gauge, rl-prog, room icons above). That's fine for SQUARE
     * elements (a 90° self-rotation doesn't change a square's footprint),
     * but the assign chip is a non-square pill row — a 90°/270° self-
     * rotation swaps its own width/height before the ambient rotation
     * carries it further, which broke its edge-anchored position (see the
     * render fn's comment for the full story). Now handled by an inline
     * transform (translate + rotate together) computed per-render, so this
     * shared rule no longer applies to it. */

    /* Portrait grid: compact badges (horizontal scroll, no wrap) + compact dock */
    .avc-grid--portrait .badges-row--grid {
      flex-wrap: nowrap;
      overflow-x: auto;
      scrollbar-width: none;
    }
    .avc-grid--portrait .badges-row--grid::-webkit-scrollbar { display: none; }
    .avc-grid--portrait .badge { padding: 4px 10px 4px 4px; gap: 6px; flex-shrink: 0; }
    .avc-grid--portrait .badge-img { width: 30px; height: 30px; }
    .avc-grid--portrait .badge-icon { --mdc-icon-size: 26px; }
    .avc-grid--portrait .badge-name { font-size: var(--avc-th-fs-s, 11px); }
    .avc-grid--portrait .dock { padding: 4px; gap: 4px; }
    .avc-grid--portrait .dock-mode { padding: 6px 2px; }
    .avc-grid--portrait .dock-mode span { display: none; }
    .avc-grid--portrait .dock-name { display: none; }
    .avc-grid--portrait .dock-row { padding: 5px 5px; gap: 4px; flex-wrap: wrap; justify-content: center; }
    /* .dock-name is hidden in portrait (below), so .dock-info's
     * margin-left: auto has no left column to push away from — with
     * justify-content: center on the row, an auto margin would eat the
     * would-be-centered free space and shove the block hard right instead.
     * Neutralised here; portrait's own centered-wrap look is unaffected. */
    .avc-grid--portrait .dock-info { margin-left: 0; }
    .avc-grid--portrait .dock-ages { gap: 3px; }
    .avc-grid--portrait .dock-age { font-size: var(--avc-th-fs-micro, 9px); }
    .avc-grid--portrait .dock-age ha-icon { --mdc-icon-size: 10px; }
    .avc-grid--portrait .dock-cov { font-size: var(--avc-th-fs-micro, 8px); }

    .avc-schemawarn {
      position: absolute;
      top: 4px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 5;
      padding: 8px 12px;
      border-radius: var(--avc-th-r-l, 12px);
      border: 1px solid rgba(var(--avc-warn-rgb), 0.55);
      background: rgba(var(--avc-warn-rgb), 0.12);
      color: rgb(var(--avc-warn-rgb));
      font-size: var(--avc-th-fs-s, 12px);
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
      border-radius: var(--avc-th-r-pill, 99px);
      cursor: pointer;
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      transition: background 0.3s, border 0.3s, box-shadow 0.3s;
      /* Same mobile hold-gesture fix as .vac-icon-btn — badges use the
       * identical tap-vs-hold pointer pattern (short tap = focus, hold =
       * show/hide toggle). */
      touch-action: manipulation;
      -webkit-touch-callout: none;
      user-select: none;
    }

    .badge-img {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      object-fit: cover;
      flex-shrink: 0;
      position: relative;
      z-index: 1;
      -webkit-touch-callout: none;
      user-select: none;
      pointer-events: none;
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
      font-size: var(--avc-th-fs-l, 15px);
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
      background: rgba(var(--avc-ink-rgb), 0.18);
      transform: scaleX(0);
      transform-origin: left;
      pointer-events: none;
      z-index: 0;
    }

    .action-btn--holding .hold-ring,
    .badge--holding .hold-ring,
    .vac-icon-btn--holding .hold-ring,
    .rail-tile--holding .hold-ring,
    .tile-main--holding .hold-ring,
    .room-overlay--holding .hold-ring {
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
      border-radius: var(--avc-th-r-l, 12px);
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
    .avc-err-halo { animation: avc-err-pulse 1.3s ease-in-out infinite; }
    @keyframes avc-err-pulse { 0%,100% { opacity: 0.18; } 50% { opacity: 0.6; } }
    .zone-rect { position: absolute; border: 2px solid rgb(var(--avc-ink-rgb)); background: rgba(var(--avc-ink-rgb), 0.15); border-radius: var(--avc-th-r-s, 4px); pointer-events: none; box-shadow: 0 0 0 1px rgba(var(--avc-shade-rgb), 0.45); }
    /* Move/resize handles (docs/19 follow-up) — decoration only, no pointer
       handlers: the overlaying .map-clickcatch does the actual hit-testing
       (_zoneHit) so a drag anywhere near a corner resizes, and inside the box
       moves the whole rectangle. */
    .zone-handle { position: absolute; width: 12px; height: 12px; margin: -6px; border-radius: 50%; background: rgb(var(--avc-ink-rgb)); border: 2px solid rgba(var(--avc-shade-rgb), 0.45); pointer-events: none; }
    .zone-handle--nw { left: 0; top: 0; }
    .zone-handle--ne { left: 100%; top: 0; }
    .zone-handle--sw { left: 0; top: 100%; }
    .zone-handle--se { left: 100%; top: 100%; }
    .layer-toggles { position: absolute; top: 8px; right: 8px; display: flex; gap: 6px; z-index: 3; }
    .layer-btn { display: flex; align-items: center; gap: 3px; padding: 3px 8px; border-radius: var(--avc-th-r-pill, 999px); border: 1px solid rgba(var(--avc-ink-rgb), 0.2); background: rgba(var(--avc-shade-rgb), 0.45); color: rgba(var(--avc-ink-rgb), 0.55); font-size: var(--avc-th-fs-xs, 11px); font-weight: 600; cursor: pointer; --mdc-icon-size: 16px; user-select: none; -webkit-touch-callout: none; touch-action: manipulation; }
    .layer-btn.on { color: rgb(var(--avc-ink-rgb)); border-color: rgba(var(--avc-ink-rgb), 0.55); background: rgba(var(--avc-shade-rgb), 0.7); }
    .layer-menu { position: absolute; top: 38px; right: 0; min-width: 200px; max-width: 86vw; max-height: 60vh; overflow-y: auto; display: flex; flex-direction: column; gap: 2px; padding: 6px; border-radius: var(--avc-th-r-l, 12px); background: rgba(var(--avc-scrim-rgb), 0.96); border: 1px solid rgba(var(--avc-ink-rgb), 0.15); box-shadow: 0 8px 24px rgba(var(--avc-shade-rgb), 0.5); }
    .layer-menu-head { display: flex; align-items: center; gap: 6px; font-size: var(--avc-th-fs-xs, 11px); color: rgba(var(--avc-ink-rgb), 0.5); padding: 2px 6px 5px; --mdc-icon-size: 14px; }
    .layer-menu-row { display: flex; align-items: center; gap: 8px; padding: 6px 8px; border-radius: var(--avc-th-r-m, 8px); border: 1px solid transparent; background: transparent; color: rgba(var(--avc-ink-rgb), 0.88); cursor: pointer; font-size: var(--avc-th-fs-m, 13px); --mdc-icon-size: 16px; }
    .layer-menu-row.on { background: rgba(var(--avc-ink-rgb), 0.12); border-color: rgba(var(--avc-ink-rgb), 0.4); }
    .lm-name { flex: 1; text-align: left; }
    .layer-menu-row b { font-weight: 700; }
    /* .rl-prog is the live coverage chip (_renderProgChip) and is still used —
       the rest of the old .room-list/.rl-* set went with _renderRoomList
       (dead since docs/19 A4, deleted 2026-08-08). */
    .rl-prog { font-size: var(--avc-th-fs-s, 12px); font-weight: 700; display: flex; align-items: baseline; gap: 1px; }
    .rl-prog small { font-size: var(--avc-th-fs-micro, 8px); opacity: 0.55; }
    .map-wrap--fixed { padding-top: 0; }
    .image-base-img--fit { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain; }

    /* ── Room buttons ────────────────────────────────────────────────── */
    .room-btn {
      position: absolute;
      width: 46px;
      height: 46px;
      border-radius: var(--avc-th-r-m, 12px);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transform: translate(-50%, -50%);
      transition: background 0.2s, box-shadow 0.2s;
      /* Same mobile hold-gesture fix as .vac-icon-btn/.badge (field-caught
       * 2026-07-24, docs/25 §7b): without this the browser's own long-press
       * handling (context menu / scroll-intent detection) can win the race
       * against our JS hold timer and fire pointercancel before it completes
       * — the room's own hold-to-inspect gesture then silently does nothing,
       * reported specifically on large (near full-map-width) rooms, where a
       * bigger touch target makes that native-gesture race more likely to
       * be won by the browser. */
      touch-action: manipulation;
      -webkit-touch-callout: none;
      user-select: none;
    }

    .room-btn ha-icon {
      --mdc-icon-size: 22px;
      pointer-events: none;
    }

    .room-overlay {
      position: absolute;
      transform: translate(-50%, -50%);
      border-radius: var(--avc-th-r-m, 6px);
      cursor: pointer;
      display: flex;
      padding: 3px;
      transition: background 0.2s, border 0.3s, box-shadow 0.3s;
      /* Same mobile hold-gesture fix as .room-btn above. */
      touch-action: manipulation;
      -webkit-touch-callout: none;
      user-select: none;
    }
    .room-overlay > ha-icon { pointer-events: none; }
    /* Mutual exclusion: room selection disabled while Pin & Go / Zone is active
       (docs/19 A3) — dim + not-allowed cursor, no color-only distinction so it
       reads even on the age-gradient border colors. */
    .room-overlay--locked { opacity: 0.4; cursor: not-allowed; }
    /* docs/25 §7d: room age lives here now, not in the border/icon color —
       those are reserved for interaction state (normal/whole-home/selected)
       so a stable, always-recognizable icon doesn't get repainted by how
       long ago the room was cleaned. Two small dots (dry/wet, same order as
       everywhere else in the card) in the corner instead — a double ring
       around the whole room was tried and rejected (splits into one blurry
       edge at real room size, field-tested). */
    .room-age-dots { position: absolute; top: -3px; right: -3px; display: flex; gap: 1.5px; }
    .room-age-dot { width: 7px; height: 7px; border-radius: 50%; border: 1px solid rgba(var(--avc-shade-rgb), 0.5); }
    /* Who's assigned to a selected room (docs/19 A1) — small chips, not area
       tinting, so assignment doesn't fight with the selection highlight or the
       age-gradient colors. */
    /* Field feedback (2026-08-03): moved from bottom-left to bottom-right —
     * user's judgment call after seeing it live, no functional reason for
     * either corner. Also given a drop shadow (.room-overlay-assign
     * .dock-chip) since the chip's own background is a fairly transparent
     * color30-alpha (works fine in the dense dock list it's shared with,
     * but needed more contrast sitting directly on top of busy path
     * colors on the map). */
    /* Rotation-proof anchoring (1.0.7, see render fn comment for the full
     * derivation/history): .room-overlay-assign-anchor is a zero-size point
     * positioned (via the render fn's inline top/left) at the local room
     * corner that maps to visual bottom-right, for whichever of the four
     * right angles is currently active. .room-overlay-assign itself pins to
     * that point via its OWN bottom-right corner as transform-origin — the
     * pivot a rotation turns around never moves under that SAME rotation,
     * so this stays correct regardless of the chip's own self-rotation
     * swapping its width/height (the thing that broke the old edge-anchored
     * 2px insets specifically for 90°/270°). The actual rotate()+translate()
     * is set inline per-render (computed from totalRot), not here. */
    .room-overlay-assign-anchor {
      position: absolute;
      pointer-events: none;
      z-index: 4;
    }
    .room-overlay-assign {
      position: absolute;
      bottom: 0;
      right: 0;
      transform-origin: 100% 100%;
      display: flex;
      gap: 2px;
      pointer-events: none;
      z-index: 4;
    }
    .room-overlay-assign .dock-chip { box-shadow: 0 1px 4px rgba(var(--avc-shade-rgb), 0.7); }

    /* docs/25 §7b: hold-to-inspect popup — per-room detail moved out of the
       (now hidden-by-default) portrait dock room list. cursor:default plus
       its own click stopPropagation (in the render fn) so tapping the
       popup itself doesn't re-toggle the room underneath it. */
    /* .room-inspect is a bare positioning wrapper (anchor + centering
       transform only) — NO border/background/padding here. Field-caught
       bug (0.72.1 first pass): those were on this outer div while only
       -inner rotated in .avc-rot, so the visible box (border/background)
       stayed in its pre-rotation wide/short shape while the text inside
       visually rotated within it, badly mismatched. Fix: the whole visual
       box (border/background/padding included) lives on -inner instead, so
       it rotates as one rigid unit — box and text always agree, upright or
       rotated. Anchored dead-center on the room (see the render fn's doc
       comment, 0.72.3) rather than below/above it — the only anchor that
       stays correct at any room size under the map's rotation.
       left/top come from an inline style (the room's own map_x/map_y, same
       coordinates its <button> uses) — this div is now a SIBLING of that
       button, not a child (0.72.5 field fix, see the render fn's doc
       comment), so it needs its own absolute position rather than
       inheriting one relative to the button's box. */
    .room-inspect {
      position: absolute;
      transform: translate(-50%, -50%);
      z-index: 20;
      cursor: default;
      pointer-events: auto;
    }
    .room-inspect-inner {
      min-width: 84px;
      /* Field-caught (2026-07-24): 0.94 opacity let the selected room's
       * white gradient border/glow (box-shadow 0 0 18px, painted on the
       * same button this popup sits centered on top of) bleed faintly
       * through the background, reading as "the ring crosses the popup"
       * even though the popup is already the topmost paint layer
       * (z-index: 20). Bumped near-opaque + isolation:isolate so no
       * ancestor glow/blend can show through at all. */
      background: rgba(var(--avc-scrim-rgb), 0.99);
      border: 1px solid rgba(var(--avc-ink-rgb), 0.25);
      border-radius: var(--avc-th-r-m, 8px);
      padding: 6px 8px;
      font-size: var(--avc-th-fs-xs, 11px);
      white-space: nowrap;
      box-shadow: 0 4px 14px rgba(var(--avc-shade-rgb), 0.45);
      isolation: isolate;
    }
    .room-inspect-name { font-weight: 600; margin-bottom: 4px; color: rgb(var(--avc-ink-rgb)); }
    .room-inspect-ages { display: flex; gap: 8px; margin-bottom: 4px; }
    /* Unlike the small icon/gauges, a whole popup of TEXT read sideways is
       genuinely unreadable, not just a minor legibility ding — worth the
       counter-rotation the icon/gauges already get elsewhere in .avc-rot
       (rotated portrait map). Whole box (see -inner above), not just text,
       so border/background rotate together with the content they wrap.
       --map-rot (docs/32) — same one variable as the other counter-rotation
       rules, covers all four total angles, not just the old fixed 90 degrees. */
    .avc-rot .room-inspect-inner { transform: rotate(calc(-1 * var(--map-rot))); }

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
      background: rgba(var(--avc-shade-rgb), 0.82);
      color: rgb(var(--avc-ink-rgb));
      font-size: var(--avc-th-fs-micro, 9px);
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* ── Status card (v1.1.0, 2026-08-03 — compact redesign, docs/33) ──── */
    .status-card {
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding: 10px 12px;
      background: var(--avc-surface);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-radius: var(--avc-th-r-l, 16px);
      overflow: hidden;
      transition: border 0.4s, box-shadow 0.4s;
    }

    .status-header { display: flex; align-items: center; gap: 10px; }

    /* Mirrors .vac-icon-btn's established circular-avatar look (docs/25 §7)
     * — same ring/fallback-icon language, reused here so the two places a
     * vacuum gets a small round portrait in this card stay visually
     * consistent. The info badge marks the "tap for HA's native more-info
     * dialog" escape hatch (user-requested "rescue control" — shrinking the
     * avatar shouldn't make this less discoverable, just smaller). */
    .status-avatar {
      position: relative;
      flex-shrink: 0;
      width: 44px; height: 44px;
      border-radius: 50%;
      border: 1.5px solid rgba(var(--avc-ink-rgb), 0.2);
      background: rgba(var(--avc-ink-rgb), 0.05);
      display: flex; align-items: center; justify-content: center;
      overflow: hidden;
      cursor: pointer;
    }
    .status-avatar img {
      width: 100%; height: 100%; object-fit: cover;
      transition: opacity 0.5s, filter 0.5s;
    }
    .avatar-info-badge {
      position: absolute; bottom: -2px; right: -2px;
      width: 14px; height: 14px; border-radius: 50%;
      background: rgba(var(--avc-scrim-2-rgb), 0.95); border: 1px solid rgba(var(--avc-shade-rgb), 0.6);
      display: flex; align-items: center; justify-content: center;
    }
    .avatar-info-badge ha-icon { --mdc-icon-size: 9px; color: rgba(var(--avc-ink-rgb), 0.6); }

    .status-info { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; }

    .error-row {
      display: flex; align-items: center; gap: 6px;
      padding-bottom: 2px; animation: pulse-error 2s ease-in-out infinite;
    }
    @keyframes pulse-error { 0%,100% { opacity:1; } 50% { opacity:0.6; } }

    .status-line1 { display: flex; align-items: baseline; justify-content: space-between; gap: 8px; }
    .model-label { font-size: var(--avc-th-fs-m, 13px); font-weight: 500; color: rgba(var(--avc-ink-rgb), 0.85); }
    .status-label { font-size: var(--avc-th-fs-s, 12px); font-weight: 600; text-align: right; }

    .status-line2 { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
    .current-room { display: flex; align-items: center; gap: 3px; font-size: var(--avc-th-fs-xs, 11px); color: rgba(var(--avc-ink-rgb), 0.45); }

    .status-meta { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
    .battery { display: flex; align-items: center; gap: 3px; font-size: var(--avc-th-fs-xs, 11px); font-weight: 600; }
    .battery ha-icon { --mdc-icon-size: 13px; }
    .last-clean { display: flex; align-items: center; gap: 3px; font-size: var(--avc-th-fs-xs, 11px); color: rgba(var(--avc-ink-rgb), 0.45); }
    .last-clean ha-icon { --mdc-icon-size: 11px; color: rgba(var(--avc-ink-rgb), 0.25); }

    /* ── Progress bar ────────────────────────────────────────────────── */
    .progress { display: flex; align-items: center; gap: 8px; }
    .progress-track {
      flex: 1; height: 3px;
      background: rgba(var(--avc-ink-rgb), 0.08); border-radius: var(--avc-th-r-pill, 2px); overflow: hidden;
    }
    .progress-fill { height: 100%; border-radius: var(--avc-th-r-pill, 2px); transition: width 0.5s ease; }
    .progress-label { font-size: var(--avc-th-fs-xs, 11px); font-weight: 600; flex-shrink: 0; }

    /* ── Debug per-room progress strip ───────────────────────────────── */
    .dbg-prog { display: flex; flex-wrap: wrap; gap: 6px 12px; padding-top: 2px; }
    .dbg-prog-item { display: flex; align-items: center; gap: 3px; font-size: var(--avc-th-fs-xs, 11px); color: rgba(var(--avc-ink-rgb), 0.55); --mdc-icon-size: 14px; }
    .dbg-prog-name { color: rgba(var(--avc-ink-rgb), 0.45); }
    .dbg-prog-item b { font-weight: 700; }
    .dbg-prog-item small { color: rgba(var(--avc-ink-rgb), 0.4); font-size: var(--avc-th-fs-xs, 10px); }
    .mini-gauge-wrap { display: inline-flex; align-items: center; gap: 2px; }
    .mini-gauge-ico { --mdc-icon-size: 12px; opacity: 0.8; }
    .mini-gauge { width: 22px; height: 22px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; }
    .mini-gauge span { width: 16px; height: 16px; border-radius: 50%; background: rgba(var(--avc-shade-rgb), 0.82); color: rgb(var(--avc-ink-rgb)); font-size: var(--avc-th-fs-micro, 8px); font-weight: 700; display: flex; align-items: center; justify-content: center; }

    /* ── Action buttons ──────────────────────────────────────────────── */
    .actions { display: flex; gap: 8px; }
    /* v1.1.0: preset chips sit INLINE beside START (was its own stacked row
     * above it) — overflow-x:auto lets a long preset list scroll instead
     * of wrapping to a second row, which is exactly the extra height this
     * redesign removes. flex-shrink:0 keeps it from being squeezed by
     * START's flex:1 on narrow cards; a hard max-width caps how much of
     * the row it can claim even when there's room, so START never shrinks
     * to an unreadable sliver with many presets. */
    .preset-chip-row {
      display: flex; gap: 6px; flex-shrink: 0; max-width: 45%;
      overflow-x: auto; scrollbar-width: none;
    }
    .preset-chip-row::-webkit-scrollbar { display: none; }

    .action-btn {
      position: relative;
      overflow: hidden;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 8px 12px;
      border-radius: var(--avc-th-r-l, 12px);
      cursor: pointer;
      transition: opacity 0.2s;
      font-family: inherit;
    }

    .action-btn:disabled { cursor: default; opacity: 0.7; }

    .action-btn ha-icon { --mdc-icon-size: 18px; flex-shrink: 0; position: relative; z-index: 1; }
    .action-btn span { font-size: var(--avc-th-fs-m, 13px); font-weight: 700; color: rgb(var(--avc-ink-rgb)); position: relative; z-index: 1; }

    .action-btn--secondary {
      background: rgba(var(--avc-info-rgb), 0.08);
      border: 1px solid rgba(var(--avc-info-rgb), 0.2) !important;
    }

    .action-btn--warn {
      background: rgba(var(--avc-warn-rgb), 0.18);
      border: 1px solid rgba(var(--avc-warn-rgb), 0.5) !important;
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

    .start-body small { font-size: var(--avc-th-fs-xs, 10px); }

    .map-clickcatch { position: absolute; inset: 0; cursor: crosshair; z-index: 5; }
    .map-tools { display: flex; gap: 6px; margin: 6px 0 0; }
    .mtbtn { display: inline-flex; align-items: center; gap: 4px; padding: 5px 10px; border-radius: var(--avc-th-r-m, 8px); border: 1px solid rgba(var(--avc-ink-rgb), 0.18); background: rgba(var(--avc-ink-rgb), 0.06); color: inherit; cursor: pointer; font-size: var(--avc-th-fs-s, 12px); font-weight: 600; }
    .mtbtn.on { background: rgba(var(--avc-tool-rgb), 0.25); border-color: rgb(var(--avc-tool-rgb)); }
    .mtbtn:disabled { opacity: 0.4; cursor: default; }
    .mtbtn ha-icon { --mdc-icon-size: 16px; }
    .mtbtn--stat { cursor: default; background: transparent; border-color: transparent; gap: 3px; padding: 5px 6px; }
    .mtbtn--stat b { font-weight: 700; }
    .mtbtn--stat small { opacity: 0.7; font-weight: 500; }
    /* Sequence hint (docs/19 follow-up, TODO #2) — amber to read as "heads up",
       distinct from the neutral stat pills either side of it. */
    .mtbtn--warn { color: rgb(var(--avc-hint-rgb)); }
    .mtbtn--warn ha-icon { color: rgb(var(--avc-hint-rgb)); }
    .mtbtn--err { color: rgb(var(--avc-err-rgb)); }
    .mtbtn--err ha-icon { color: rgb(var(--avc-err-rgb)); }
    /* docs/28 §2: own panel (was transparent, flush with the map above and the
     * dock below) — background + radius visually lifts it off both neighbors
     * instead of reading as a loose row of same-weight buttons. */
    /* docs/28 §2 follow-up (field-verified 2026-07-25, live A/B via Claude in
     * Chrome on the user's own dashboard against a "modest"/"strong"/
     * "hairline-only" candidate — see docs/28 for the comparison): the
     * original 0.03/0.08 values (shared with .vac-picker/.dock elsewhere)
     * were too subtle against a near-black card background to read as a
     * distinct panel at all — the specific goal this section was built for.
     * Bumped just for .meta-bar/.meta-bar-divider, not the other panels,
     * which weren't reported as a problem. */
    .meta-bar { display: flex; align-items: center; gap: 4px; flex-wrap: wrap; padding: 6px 8px; background: var(--avc-panel-strong); border: 1px solid var(--avc-panel-strong-line); border-radius: var(--avc-th-r-l, 12px); }
    .meta-bar-cluster { display: flex; align-items: center; gap: 4px; }
    .meta-bar-spacer { flex: 1 1 auto; }
    .meta-bar-divider { width: 0.5px; align-self: stretch; background: rgba(var(--avc-ink-rgb), 0.22); margin: 0 4px; }
    /* Refresh: a quiet icon, not a bordered button on par with Pin & Go/Zone —
     * it shouldn't compete with the actual map-interaction tools for attention. */
    .mtbtn--ghost { border: none; background: transparent; color: rgba(var(--avc-ink-rgb), 0.45); padding: 5px; }
    .mtbtn--ghost:hover { color: rgba(var(--avc-ink-rgb), 0.75); }
    .mtbtn--spin ha-icon { animation: avc-refresh-spin 0.6s ease; }
    @keyframes avc-refresh-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    .mode-action { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 6px; }
    .mode-action .mtbtn { width: 100%; justify-content: center; box-sizing: border-box; animation: avc-mode-action-pulse 1.6s ease-in-out infinite; }
    @keyframes avc-mode-action-pulse { 0%,100% { box-shadow: 0 0 0 rgba(var(--avc-tool-rgb), 0); } 50% { box-shadow: 0 0 12px rgba(var(--avc-tool-rgb), 0.55); } }
    .calib-panel { margin-top: 4px; font-size: var(--avc-th-fs-s, 12px); opacity: 0.9; padding: 6px 8px; background: rgba(var(--avc-tool-rgb), 0.12); border-radius: var(--avc-th-r-m, 8px); }
    .calib-panel > div { margin-bottom: 4px; }
    .calib-actions { display: flex; gap: 6px; flex-wrap: wrap; }

    /* ══ On-map channel reset ══════════════════════════════════════════════
     * Everything inside .map-wrap is painted on the vacuum's own map bitmap,
     * not on the card's surface, so it must keep white-on-black regardless of
     * the card's theme — a light theme reaching in here would erase every
     * on-map label. Derived tokens (--avc-ink, the panel/surface set) re-
     * resolve per element against these, so resetting the three channel bases
     * is enough; nothing has to be listed individually. */
    .map-wrap {
      --avc-ink-rgb: 255, 255, 255;
      --avc-shade-rgb: 0, 0, 0;
      --avc-scrim-rgb: 18, 18, 18;
    }

    /* ══ Theme: dark (the v1.2.0 default) ══════════════════════════════════
     * Off pure black and off pure white: a near-black surface swallows any
     * low-alpha accent laid over it, which is exactly why docs/25 §6's sage
     * START read as "no change" in the field. Surfaces are lifted, the ink is
     * very slightly cool, and the semantic palette steps down from the Ant
     * Design defaults it inherited — same hues, same meanings, less shout. */
    .avc-theme--dark,
    .avc-theme--auto {
      --avc-ink-rgb: 234, 238, 245;
      --avc-shade-rgb: 5, 7, 12;
      --avc-scrim-rgb: 24, 26, 33;
      --avc-scrim-2-rgb: 38, 41, 51;

      --avc-ok-rgb: 108, 197, 118;
      --avc-warn-rgb: 226, 170, 82;
      --avc-err-rgb: 230, 110, 116;
      --avc-hint-rgb: 208, 168, 96;
      --avc-tool-rgb: 116, 158, 232;
      --avc-info-rgb: 112, 176, 224;

      --avc-surface: rgba(30, 33, 42, 0.78);
      --avc-panel: rgba(var(--avc-ink-rgb), 0.05);
      --avc-panel-line: transparent;
      --avc-panel-strong: rgba(var(--avc-ink-rgb), 0.075);
      --avc-panel-strong-line: transparent;
      --avc-sunken: rgba(var(--avc-shade-rgb), 0.45);
      --avc-disabled: rgba(var(--avc-ink-rgb), 0.07);

      --avc-elev-1: 0 1px 2px rgba(0, 0, 0, 0.45), 0 8px 22px rgba(0, 0, 0, 0.3);
      --avc-elev-2: 0 2px 6px rgba(0, 0, 0, 0.5), 0 18px 44px rgba(0, 0, 0, 0.38);

      --avc-press: 0.972;
      --avc-press-ms: 0.12s;
      --avc-live: avc-live-breathe 3.4s ease-in-out infinite;
    }

    /* ══ Theme: light ══════════════════════════════════════════════════════
     * Before 1.2.0 the card painted white text and white-alpha panels
     * unconditionally, so on a light HA theme it was not merely ugly but
     * unreadable. The palette darkens rather than just inverting: the same
     * hue at the same lightness that reads as "calm" on near-black reads as
     * "washed out" on porcelain. */
    .avc-theme--light {
      --avc-ink-rgb: 26, 29, 37;
      --avc-shade-rgb: 30, 36, 48;
      --avc-scrim-rgb: 252, 252, 253;
      --avc-scrim-2-rgb: 244, 245, 248;

      --avc-ok-rgb: 52, 131, 70;
      --avc-warn-rgb: 154, 106, 21;
      --avc-err-rgb: 197, 58, 66;
      --avc-hint-rgb: 147, 110, 28;
      --avc-tool-rgb: 42, 104, 210;
      --avc-info-rgb: 34, 121, 184;

      --avc-surface: rgba(255, 255, 255, 0.93);
      --avc-panel: rgba(255, 255, 255, 0.68);
      --avc-panel-line: rgba(var(--avc-ink-rgb), 0.07);
      --avc-panel-strong: rgba(255, 255, 255, 0.94);
      --avc-panel-strong-line: rgba(var(--avc-ink-rgb), 0.09);
      --avc-sunken: rgba(var(--avc-ink-rgb), 0.045);
      --avc-disabled: rgba(var(--avc-ink-rgb), 0.06);

      --avc-elev-1: 0 1px 2px rgba(24, 30, 45, 0.06), 0 8px 20px rgba(24, 30, 45, 0.08);
      --avc-elev-2: 0 2px 6px rgba(24, 30, 45, 0.08), 0 18px 40px rgba(24, 30, 45, 0.12);

      --avc-press: 0.972;
      --avc-press-ms: 0.12s;
      --avc-live: avc-live-breathe 3.4s ease-in-out infinite;
    }

    /* auto = dark, flipped by the OS/browser preference. The light values
     * are restated rather than shared because CSS custom properties have no
     * conditional aliasing — a media query can only re-declare them. Kept
     * adjacent to the block above so the two never drift apart unnoticed. */
    @media (prefers-color-scheme: light) {
      .avc-theme--auto {
        --avc-ink-rgb: 26, 29, 37;
        --avc-shade-rgb: 30, 36, 48;
        --avc-scrim-rgb: 252, 252, 253;
        --avc-scrim-2-rgb: 244, 245, 248;

        --avc-ok-rgb: 52, 131, 70;
        --avc-warn-rgb: 154, 106, 21;
        --avc-err-rgb: 197, 58, 66;
        --avc-hint-rgb: 147, 110, 28;
        --avc-tool-rgb: 42, 104, 210;
        --avc-info-rgb: 34, 121, 184;

        --avc-surface: rgba(255, 255, 255, 0.93);
        --avc-panel: rgba(255, 255, 255, 0.68);
        --avc-panel-line: rgba(var(--avc-ink-rgb), 0.07);
        --avc-panel-strong: rgba(255, 255, 255, 0.94);
        --avc-panel-strong-line: rgba(var(--avc-ink-rgb), 0.09);
        --avc-sunken: rgba(var(--avc-ink-rgb), 0.045);
        --avc-disabled: rgba(var(--avc-ink-rgb), 0.06);

        --avc-elev-1: 0 1px 2px rgba(24, 30, 45, 0.06), 0 8px 20px rgba(24, 30, 45, 0.08);
        --avc-elev-2: 0 2px 6px rgba(24, 30, 45, 0.08), 0 18px 40px rgba(24, 30, 45, 0.12);
      }
    }

    /* ══ Structural pass — every theme except legacy ═════════════════════
     * The token flip above only changes colour. This is the part that changes
     * the card's genre: panels carry elevation instead of a hairline outline.
     * Corners and type sizes are NOT set here any more — they come from the
     * one K8 scale (--avc-th-*, see the token block at the top). legacy
     * simply never gets the .avc-theme class, so none of this applies to it. */
    .avc-theme .status-card { box-shadow: var(--avc-elev-1); }
    .avc-theme .dock,
    .avc-theme .vac-picker { box-shadow: var(--avc-elev-1); }
    .avc-theme .meta-bar { box-shadow: var(--avc-elev-1); }
    .avc-theme .map-wrap { box-shadow: var(--avc-elev-1); }
    .avc-theme .room-inspect-inner { box-shadow: var(--avc-elev-2); }
    .avc-theme .layer-menu { box-shadow: var(--avc-elev-2); }

    /* ── docs/44 F1: calm map ─────────────────────────────────────────
     * Room label pill (name + dry/wet freshness dots) replaces the bare icon
     * and corner dots in every non-legacy theme. Sizes are queried on the
     * room itself (container-type: size — the room already has an explicit
     * size, so containment changes nothing about its own layout). On a
     * quarter-turned map the ON-SCREEN width is the room's local height,
     * hence the --q variants querying height. */
    .avc-theme .room-overlay { container-type: size; }
    .room-label {
      display: inline-flex; align-items: center; gap: 5px;
      max-width: calc(100cqw - 8px);
      padding: 3px 8px; box-sizing: border-box;
      border-radius: var(--avc-r-pill);
      background: rgba(10, 12, 15, 0.8);
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.35);
      color: rgba(255, 255, 255, 0.92);
      font-size: var(--avc-fs-s); font-weight: 500; line-height: 1.25;
      white-space: nowrap; pointer-events: none;
    }
    .room-label--q { max-width: calc(100cqh - 8px); }
    .room-label ha-icon { --mdc-icon-size: 14px; color: rgba(255, 255, 255, 0.72); flex-shrink: 0; }
    .room-label-name { overflow: hidden; text-overflow: ellipsis; min-width: 0; }
    .room-label-dots { display: inline-flex; gap: 3px; flex-shrink: 0; }
    .room-label-dot { width: 7px; height: 7px; border-radius: 50%; box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.35); }
    .room-label--dots { padding: 4px 6px; }
    .avc-rot .room-overlay > .room-label { transform: rotate(calc(-1 * var(--map-rot))); }
    @container (max-width: 92px) {
      .room-label:not(.room-label--q) ha-icon,
      .room-label:not(.room-label--q) .room-label-name { display: none; }
      .room-label:not(.room-label--q) { padding: 4px 6px; }
      .room-overlay-assign-anchor:not(.room-overlay-assign-anchor--q) { display: none; }
    }
    @container (max-height: 92px) {
      .room-label--q ha-icon,
      .room-label--q .room-label-name { display: none; }
      .room-label--q { padding: 4px 6px; }
      .room-overlay-assign-anchor--q { display: none; }
    }
    @container (max-width: 28px) { .room-label:not(.room-label--q) { display: none; } }
    @container (max-height: 28px) { .room-label--q { display: none; } }

    /* Status icon replaces the emoji that used to prefix every status label. */
    .status-icon { --mdc-icon-size: 14px; margin-right: 4px; vertical-align: -2px; }

    /* Icon-only trail toggles (K5). */
    .mtbtn--icon { padding: 5px 9px; }

    /* ── docs/44 F2: hero, robot tiles, robot sheet ──────────────────── */
    .meta-hero { display: flex; align-items: center; gap: 10px; min-width: 0; margin-right: 10px; }
    .hero-badge {
      width: 36px; height: 36px; border-radius: var(--avc-r-m); flex-shrink: 0;
      display: flex; align-items: center; justify-content: center;
      background: rgba(var(--avc-accent-rgb), 0.14); color: rgb(var(--avc-accent-rgb));
    }
    .hero-badge ha-icon { --mdc-icon-size: 20px; }
    .hero-ring { position: relative; width: 40px; height: 40px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
    .hero-ring svg { position: absolute; inset: 0; }
    .hero-ring b { position: relative; font-size: var(--avc-fs-xs); font-variant-numeric: tabular-nums; }
    .hero-text { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
    .hero-title { font-size: var(--avc-fs-l); font-weight: 600; white-space: nowrap; }
    .hero-sub {
      font-size: var(--avc-fs-s); color: rgba(var(--avc-ink-rgb), 0.62);
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-variant-numeric: tabular-nums;
    }

    .status-tile { padding: 8px 10px; gap: 8px; }
    .tile-main {
      display: flex; align-items: center; gap: 12px; width: 100%;
      padding: 0; border: none; background: none; color: inherit; font: inherit;
      text-align: left; cursor: pointer;
    }
    .tile-text { display: flex; flex-direction: column; gap: 2px; min-width: 0; flex: 1; }
    .tile-name { display: flex; align-items: center; gap: 7px; font-size: var(--avc-fs-l); font-weight: 600; }
    .tile-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
    .tile-status {
      display: flex; align-items: center; gap: 4px; min-width: 0;
      font-size: var(--avc-fs-s); font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .tile-status ha-icon { --mdc-icon-size: 14px; flex-shrink: 0; }
    .tile-room { color: rgba(var(--avc-ink-rgb), 0.6); font-weight: 500; }
    .tile-sub { font-size: var(--avc-fs-s); color: rgba(var(--avc-ink-rgb), 0.55); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .tile-right { display: flex; flex-direction: column; align-items: flex-end; gap: 6px; width: 96px; flex-shrink: 0; font-variant-numeric: tabular-nums; }
    .tile-right b { font-size: var(--avc-fs-m); }
    .tile-right small { font-size: var(--avc-fs-s); color: rgba(var(--avc-ink-rgb), 0.6); }
    .tile-bar { display: block; width: 100%; height: 4px; border-radius: var(--avc-r-pill); background: rgba(var(--avc-ink-rgb), 0.1); overflow: hidden; }
    .tile-bar > span { display: block; height: 100%; border-radius: inherit; transition: width 0.6s var(--avc-ease, ease); }
    .tile-chev { --mdc-icon-size: 18px; color: rgba(var(--avc-ink-rgb), 0.4); flex-shrink: 0; }
    .status-tile .actions { margin-top: 0; }
    .tile-row { display: flex; align-items: center; gap: 10px; }
    .tile-row .tile-main { flex: 1; min-width: 0; }
    .tile-pause {
      position: relative; overflow: hidden; flex-shrink: 0;
      width: 44px; height: 44px; border-radius: var(--avc-r-m); cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      border: 1px solid rgba(var(--avc-warn-rgb), 0.45);
      background: rgba(var(--avc-warn-rgb), 0.12); color: rgb(var(--avc-warn-rgb));
      touch-action: manipulation; -webkit-touch-callout: none; user-select: none;
    }

    .batt-ring { position: relative; display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .batt-ring svg { position: absolute; inset: 0; transform: rotate(-90deg); }
    .batt-ring img { border-radius: 50%; object-fit: cover; }
    .batt-ring-bolt {
      position: absolute; right: -2px; bottom: -2px; width: 18px; height: 18px; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      background: var(--avc-surface); color: rgb(var(--avc-warn-rgb));
    }
    .batt-ring-bolt ha-icon { --mdc-icon-size: 12px; }
    .batt-ring-arc--charging { animation: avc-charge 2.2s ease-in-out infinite; }
    @keyframes avc-charge { 0%, 100% { opacity: 1; } 50% { opacity: 0.45; } }

    .robot-sheet-scrim { position: absolute; inset: 0; z-index: 40; background: rgba(0, 0, 0, 0.5); }
    .ve-notice-head { display: flex; align-items: center; gap: 10px; --mdc-icon-size: 24px; }
    .ve-notice-head ha-icon { color: rgb(var(--avc-accent-rgb)); }
    .ve-notice-text { margin: 0; font-size: var(--avc-fs-m); line-height: 1.45; color: rgba(var(--avc-ink-rgb), 0.75); }
    .ve-notice .robot-sheet-foot { justify-content: flex-end; }
    .robot-sheet {
      position: absolute; left: 50%; bottom: 0; z-index: 41;
      width: min(480px, 100%); box-sizing: border-box; transform: translateX(-50%);
      display: flex; flex-direction: column; gap: 14px; padding: 10px 16px 16px;
      border-radius: var(--avc-th-r-l, 22px) var(--avc-th-r-l, 22px) 0 0;
      background: rgb(var(--avc-scrim-2-rgb)); color: rgb(var(--avc-ink-rgb));
      box-shadow: 0 -12px 40px rgba(0, 0, 0, 0.45);
      animation: avc-sheet-in 0.22s var(--avc-ease, ease-out);
      max-height: 100%; overflow-y: auto; overscroll-behavior: contain;
    }
    @keyframes avc-sheet-in { from { transform: translate(-50%, 24px); opacity: 0; } to { transform: translate(-50%, 0); opacity: 1; } }
    .robot-sheet-grip { align-self: center; width: 38px; height: 4px; border-radius: var(--avc-r-pill); background: rgba(var(--avc-ink-rgb), 0.18); }
    .robot-sheet-head { display: flex; align-items: center; gap: 14px; }
    .robot-sheet-id { display: flex; flex-direction: column; gap: 3px; flex: 1; min-width: 0; }
    .robot-sheet-name { font-size: var(--avc-fs-xl); font-weight: 600; }
    .robot-sheet-icon {
      width: 40px; height: 40px; flex-shrink: 0; border: none; border-radius: var(--avc-r-m); cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      background: rgba(var(--avc-ink-rgb), 0.06); color: rgba(var(--avc-ink-rgb), 0.7);
    }
    .robot-sheet-rooms { display: flex; flex-direction: column; gap: 4px; font-size: var(--avc-fs-m); }
    .robot-sheet-rooms small { color: rgba(var(--avc-ink-rgb), 0.6); font-size: var(--avc-fs-s); }
    .robot-sheet-label { font-size: var(--avc-fs-s); color: rgba(var(--avc-ink-rgb), 0.6); }
    .robot-sheet-foot { display: flex; gap: 8px; flex-wrap: wrap; padding-top: 10px; border-top: 1px solid rgba(var(--avc-ink-rgb), 0.08); }
    .robot-sheet .actions { margin: 0; }
    .avc-still .robot-sheet, .avc-still .batt-ring-arc--charging { animation: none; }
    @media (prefers-reduced-motion: reduce) {
      .robot-sheet, .batt-ring-arc--charging { animation: none; }
    }
    /* Status colours are tuned for dark surfaces; on light themes darken them
     * as text (the same approach docs/35 §9b took for the age colours). */
    .avc-theme--light .status-label,
    .avc-theme--light .tile-status { filter: brightness(0.6) saturate(1.2); }
    @media (prefers-color-scheme: light) {
      .avc-theme--auto .status-label,
      .avc-theme--auto .tile-status { filter: brightness(0.6) saturate(1.2); }
    }

    /* ── docs/44 F4: living map ───────────────────────────────────────── */
    /* The marker's glide is a Web Animation along the trail (1.47.0,
     * _runMarkerGlides), not a CSS transition — a transition could only
     * cut straight across the room. */
    .avc-sonar {
      transform-box: fill-box; transform-origin: center;
      animation: avc-sonar 2.4s ease-out infinite;
    }
    @keyframes avc-sonar {
      0% { transform: scale(1); opacity: 0.75; }
      100% { transform: scale(3.4); opacity: 0; }
    }
    .room-fill {
      position: absolute; inset: 0; border-radius: inherit; pointer-events: none;
      transition: opacity 1.2s ease, background-color 0.6s ease;
    }
    .room-sheen { position: absolute; inset: 0; border-radius: inherit; overflow: hidden; pointer-events: none; }
    .room-sheen::after {
      content: ""; position: absolute; inset: 0;
      background: linear-gradient(105deg, transparent 25%, rgba(255, 255, 255, 0.5) 50%, transparent 75%);
      transform: translateX(-110%); opacity: 0;
      animation: avc-sheen 1.3s ease-out 1 forwards;
    }
    @keyframes avc-sheen {
      0% { transform: translateX(-110%); opacity: 1; }
      85% { opacity: 1; }
      100% { transform: translateX(110%); opacity: 0; }
    }
    .avc-theme .room-overlay > .room-label { position: relative; z-index: 1; }
    .avc-still .avc-sonar, .avc-still .room-sheen { display: none; }
    @media (prefers-reduced-motion: reduce) {
      .avc-sonar, .room-sheen { display: none; }
    }

    /* ── docs/44 F5: start sequence ──────────────────────────────────── */
    .room-seq {
      position: absolute; inset: 0; border-radius: inherit; pointer-events: none; opacity: 0;
      background: rgba(var(--avc-accent-rgb), 0.2);
      box-shadow: inset 0 0 0 2px rgb(var(--avc-accent-rgb)), inset 0 0 26px rgba(var(--avc-accent-rgb), 0.55);
      animation: avc-seq-light 0.9s ease-out 1 both;
    }
    @keyframes avc-seq-light { 0% { opacity: 0; } 30% { opacity: 1; } 100% { opacity: 0; } }
    .seq-avatar {
      position: absolute; z-index: 6; width: 34px; height: 34px; pointer-events: none;
      transform: translate(-50%, -50%); left: var(--tx); top: var(--ty); opacity: 0;
      animation: avc-seq-fly 1.9s cubic-bezier(0.22, 0.8, 0.3, 1) 1 both;
    }
    @keyframes avc-seq-fly {
      0% { left: var(--fx); top: var(--fy); opacity: 0; transform: translate(-50%, -50%) scale(0.6); }
      15% { opacity: 1; }
      60% { left: var(--tx); top: var(--ty); transform: translate(-50%, -50%) scale(1.1); }
      70% { transform: translate(-50%, -50%) scale(1); }
      85% { opacity: 1; }
      100% { left: var(--tx); top: var(--ty); opacity: 0; transform: translate(-50%, -50%) scale(1); }
    }
    .seq-avatar-in {
      display: flex; align-items: center; justify-content: center; width: 100%; height: 100%;
      border-radius: 50%; overflow: hidden; box-sizing: border-box;
      background: rgb(var(--avc-scrim-2-rgb)); border: 2px solid var(--c);
      box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.25), 0 4px 14px rgba(0, 0, 0, 0.45);
    }
    .seq-avatar-in img { width: 100%; height: 100%; object-fit: cover; }
    .seq-avatar-in ha-icon { --mdc-icon-size: 20px; color: var(--c); }
    .avc-rot .seq-avatar-in { transform: rotate(calc(-1 * var(--map-rot))); }
    .avc-still .room-seq, .avc-still .seq-avatar { display: none; }
    @media (prefers-reduced-motion: reduce) { .room-seq, .seq-avatar { display: none; } }

    /* ── docs/44 F3: portrait hero bar + rail ─────────────────────────── */
    .meta-bar--hero { flex-wrap: nowrap; min-height: 52px; box-sizing: border-box; }
    .meta-bar--hero .meta-hero { flex: 1; margin-right: 0; }
    .meta-bar--hero .hero-title { overflow: hidden; text-overflow: ellipsis; }
    .avc-grid--portrait .rail { padding: 6px; gap: 8px; overflow: hidden; }
    .rail-tiles { display: flex; flex-direction: column; gap: 6px; }
    .rail-tile {
      position: relative; overflow: hidden;
      display: flex; align-items: center; gap: 8px;
      width: 100%; min-height: 52px; padding: 6px 8px; box-sizing: border-box;
      border-radius: var(--avc-r-m); border: 1px solid var(--avc-panel-line);
      background: rgba(var(--avc-ink-rgb), 0.04); color: inherit; font: inherit;
      text-align: left; cursor: pointer; transition: opacity 0.15s ease, border-color 0.2s ease;
      touch-action: manipulation; -webkit-touch-callout: none; user-select: none;
    }
    .rail-tile > :not(.hold-ring) { position: relative; z-index: 1; }
    .rail-tile--live { border-color: var(--vac); }
    .rail-tile--hidden { opacity: 0.4; }
    /* docs/46 G2: landscape tile hold = hide/show on the map */
    .tile-main { position: relative; border-radius: var(--avc-r-m); touch-action: manipulation; -webkit-touch-callout: none; user-select: none; }
    .tile-main--hidden { opacity: 0.45; }
    .tile-hidden-ico { --mdc-icon-size: 14px; color: rgba(var(--avc-ink-rgb), 0.55); }
    /* ── docs/46 G2: the landscape plan column ─────────────────────────── */
    .plan-col { gap: 10px; min-width: 340px; }
    .plan-head {
      display: flex; align-items: baseline; justify-content: space-between; gap: 8px; padding: 2px 4px 0;
      font-size: var(--avc-fs-m); font-weight: 600;
    }
    .plan-clear {
      border: none; background: none; padding: 0; cursor: pointer; font: inherit;
      font-size: var(--avc-fs-s); font-weight: 500; color: rgb(var(--avc-accent-rgb));
    }
    .plan-rows { display: flex; flex-direction: column; min-height: 0; overflow-y: auto; }
    .plan-row {
      display: flex; align-items: center; gap: 8px; min-height: 34px; padding: 0 4px;
      border-bottom: 1px solid rgba(var(--avc-ink-rgb), 0.06); font-size: var(--avc-fs-m);
    }
    .plan-name { flex: 1; min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .plan-kind { --mdc-icon-size: 15px; color: rgba(var(--avc-ink-rgb), 0.55); flex-shrink: 0; }
    .plan-when {
      min-width: 52px; display: flex; justify-content: flex-end; text-align: right;
      font-size: var(--avc-fs-s); color: rgba(var(--avc-ink-rgb), 0.6); font-variant-numeric: tabular-nums; --mdc-icon-size: 16px;
    }
    .plan-row--done .plan-name { color: rgba(var(--avc-ink-rgb), 0.5); }
    .plan-row--done .plan-when, .plan-row--active .plan-when { color: rgb(var(--avc-ok-rgb)); font-weight: 600; }
    .plan-foot { margin-top: auto; display: flex; align-items: center; justify-content: space-between; gap: 12px; }
    .plan-sum { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
    .plan-sum b { font-size: var(--avc-fs-m); font-weight: 600; }
    .plan-sum small { font-size: var(--avc-fs-s); color: rgba(var(--avc-ink-rgb), 0.6); }
    .plan-foot .dock-run { flex: 0 0 auto; min-width: 180px; }
    .plan-foot .dock-run span { font-size: var(--avc-fs-m); }
    .plan-foot .dock-run { padding: 12px 18px; justify-content: center; }
    .avc-theme .dock-run.plan-cancel:not(:disabled) {
      background: rgba(var(--avc-err-rgb), 0.16); border-color: rgba(var(--avc-err-rgb), 0.5);
      color: rgb(var(--avc-err-rgb)); box-shadow: none;
    }
    .rail-tile-text { display: flex; flex-direction: column; gap: 1px; min-width: 0; flex: 1; }
    .rail-tile-name {
      display: flex; align-items: center; gap: 4px; min-width: 0;
      font-size: var(--avc-fs-m); font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .rail-tile-name ha-icon { --mdc-icon-size: 14px; opacity: 0.7; flex-shrink: 0; }
    .rail-tile .tile-status, .rail-tile .tile-sub { font-size: var(--avc-fs-xs); }
    .rail-tile .tile-status ha-icon { --mdc-icon-size: 12px; }
    .rail-tile-bar {
      position: absolute !important; left: 8px; right: 8px; bottom: 3px; height: 3px;
      border-radius: var(--avc-r-pill); background: rgba(var(--avc-ink-rgb), 0.1); overflow: hidden;
    }
    .rail-tile-bar > span { display: block; height: 100%; background: var(--vac); border-radius: inherit; transition: width 0.6s var(--avc-ease, ease); }
    .rail-card {
      display: flex; flex-direction: column; gap: 6px; min-height: 0; overflow: auto;
      padding: 8px; border-radius: var(--avc-r-m);
      background: var(--avc-sunken); border: 1px solid var(--avc-panel-line);
      font-size: var(--avc-fs-s); scrollbar-width: none;
    }
    .rail-card::-webkit-scrollbar { display: none; }
    .rail-card-head { display: flex; align-items: center; gap: 6px; font-size: var(--avc-fs-m); font-weight: 600; }
    .rail-card-head ha-icon { --mdc-icon-size: 16px; color: rgb(var(--avc-accent-rgb)); flex-shrink: 0; }
    .rail-card-head small { margin-left: auto; font-size: var(--avc-fs-xs); font-weight: 500; color: rgba(var(--avc-ink-rgb), 0.6); font-variant-numeric: tabular-nums; white-space: nowrap; }
    .rail-chips { display: flex; flex-wrap: wrap; gap: 4px; }
    .rail-chip {
      max-width: 100%; box-sizing: border-box; padding: 2px 8px; border-radius: var(--avc-r-pill);
      background: rgba(var(--avc-accent-rgb), 0.16); font-size: var(--avc-fs-xs);
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .rail-hint { color: rgba(var(--avc-ink-rgb), 0.55); font-size: var(--avc-fs-xs); }
    .rail-clear { align-self: flex-start; padding: 4px 8px; }
    .rail-warn { display: flex; align-items: center; gap: 4px; color: rgb(var(--avc-err-rgb)); font-size: var(--avc-fs-xs); }
    .rail-warn ha-icon { --mdc-icon-size: 14px; flex-shrink: 0; }
    .rail-plan-row { display: flex; align-items: center; gap: 6px; min-width: 0; }
    .rail-plan-row ha-icon { --mdc-icon-size: 14px; flex-shrink: 0; }
    .rail-plan-name { flex: 1; min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .rail-plan-row b { font-size: var(--avc-fs-xs); font-variant-numeric: tabular-nums; }
    .rail-plan-row--done { opacity: 0.5; }
    .rail-plan-row--done .rail-plan-state { color: rgb(var(--avc-ok-rgb)); }
    .rail-plan-row--active .rail-plan-name { font-weight: 600; }
    .rail-tools { display: grid; grid-template-columns: repeat(auto-fit, minmax(38px, 1fr)); gap: 4px; margin-top: auto; flex-shrink: 0; }
    .rail-tools .mtbtn { justify-content: center; padding: 8px 0; min-width: 0; }
    .rail--sheet { overflow: auto; }
    .rail--sheet .dock-mode span { display: inline; }
    .rail--sheet .dock-head { flex-direction: column; }

    /* Dock rows without a box per row (K6): hairline separators, selection is
     * a soft accent wash, and the list fades out instead of showing a
     * platform scrollbar (wheel/touch scrolling unchanged). */
    .avc-theme .dock-rows {
      scrollbar-width: none;
      padding-bottom: 10px;
      -webkit-mask-image: linear-gradient(to bottom, #000 calc(100% - 16px), transparent);
      mask-image: linear-gradient(to bottom, #000 calc(100% - 16px), transparent);
    }
    .avc-theme .dock-rows::-webkit-scrollbar { display: none; }
    .avc-theme .dock-row {
      background: transparent;
      border: none;
      border-bottom: 1px solid rgba(var(--avc-ink-rgb), 0.06);
    }
    /* The age dots were the most instrument-like detail on the map: two 7px
     * discs with a hard 1px black stroke. Same information, softer edge. */
    .avc-theme .room-age-dot {
      width: 8px; height: 8px; border: none;
      box-shadow: 0 0 0 1.5px rgba(0, 0, 0, 0.5), 0 1px 3px rgba(0, 0, 0, 0.45);
    }

    /* START is the one thing the whole screen exists for. docs/25 §6 gave it
     * its own sage green but at 24% over near-black, where the hue simply
     * disappeared (the user's verdict at the time: "looks unchanged"). On the
     * lifted surface it can finally carry a gradient, a stronger edge and a
     * soft cast without shouting. */
    .avc-theme .start-bar:not(:disabled) {
      background: linear-gradient(180deg, rgba(var(--avc-accent-rgb), 0.34), rgba(var(--avc-accent-rgb), 0.2));
      border-color: rgba(var(--avc-accent-rgb), 0.55);
      box-shadow: 0 6px 18px rgba(var(--avc-accent-rgb), 0.14);
      letter-spacing: 0.2px;
    }
    .avc-theme .start-bar--cancel:not(:disabled) {
      background: linear-gradient(180deg, rgba(var(--avc-warn-rgb), 0.28), rgba(var(--avc-warn-rgb), 0.16));
      border-color: rgba(var(--avc-warn-rgb), 0.55);
      box-shadow: 0 6px 18px rgba(var(--avc-warn-rgb), 0.14);
      animation: var(--avc-live);
    }
    /* Landscape's primary action lives in the dock footer, not in the START
     * bar (that one is portrait's). Same promotion, same reason. */
    .avc-theme .dock-run:not(:disabled) {
      background: linear-gradient(180deg, rgba(var(--avc-accent-rgb), 0.34), rgba(var(--avc-accent-rgb), 0.2));
      border-color: rgba(var(--avc-accent-rgb), 0.55);
      box-shadow: 0 4px 14px rgba(var(--avc-accent-rgb), 0.16);
    }
    .avc-theme.avc-calm .dock-run:not(:disabled) {
      box-shadow: 0 0 0 1px rgba(var(--avc-accent-rgb), 0.4),
                  0 8px 20px rgba(var(--avc-accent-rgb), 0.16);
    }

    .avc-theme .dock-row.on {
      background: rgba(var(--avc-accent-rgb), 0.14);
      border-bottom-color: transparent;
    }

    /* Everything whose value ticks gets tabular figures, so a live ETA or
     * battery reading stops shoving its neighbours sideways on every poll.
     * (The type floor that used to live here is now the K8 scale.) */
    .avc-theme .dock-age,
    .avc-theme .dock-est,
    .avc-theme .dock-cov,
    .avc-theme .battery,
    .avc-theme .status-label,
    .avc-theme .progress-label,
    .avc-theme .last-clean,
    .avc-theme .rl-prog,
    .avc-theme .mtbtn--stat { font-variant-numeric: tabular-nums; }

    /* ══ Micro-interactions (docs/35 §5) ═══════════════════════════════════
     * Transform/opacity only, declarative only — no JS, nothing per frame.
     * The mobile companion app has real crash history around anything that
     * takes imperative ownership of layout (docs/21 §5b), so this stays
     * entirely in CSS.
     *
     * Deliberately NOT applied to .room-btn / .room-overlay: those carry a
     * positioning transform of their own (translate(-50%, -50%)), and a
     * scale() here would replace it and throw the room off its anchor. */
    .avc-theme .action-btn,
    .avc-theme .start-bar,
    .avc-theme .start-seg,
    .avc-theme .dock-mode,
    .avc-theme .dock-row,
    .avc-theme .dock-sheet-action,
    .avc-theme .rs-tab,
    .avc-theme .dock-sheet-care-reset,
    .avc-theme .mtbtn,
    .avc-theme .badge,
    .avc-theme .vac-icon-btn,
    .avc-theme .layer-btn {
      transition: transform var(--avc-press-ms) var(--avc-ease),
                  opacity 0.15s ease,
                  background 0.25s var(--avc-ease),
                  border-color 0.25s var(--avc-ease),
                  box-shadow 0.25s var(--avc-ease);
    }
    .avc-theme .action-btn:active:not(:disabled),
    .avc-theme .start-bar:active:not(:disabled),
    .avc-theme .start-seg:active,
    .avc-theme .dock-mode:active,
    .avc-theme .dock-row:active:not(:disabled),
    .avc-theme .dock-sheet-action:active,
    .avc-theme .rs-tab:active,
    .avc-theme .dock-sheet-care-reset:active:not(.pending),
    .avc-theme .mtbtn:active:not(:disabled),
    .avc-theme .badge:active,
    .avc-theme .vac-icon-btn:active,
    .avc-theme .layer-btn:active { transform: scale(var(--avc-press)); }

    /* Keyboard focus. The card had no focus styling at all before 1.2.0 — not
     * suppressed, just never considered, so keyboard users got the browser's
     * default ring over a design that had moved on. :focus-visible is the
     * right primitive: it matches keyboard focus and stays out of the way on
     * tap and click, where the press feedback above already answers.
     *
     * outline (not box-shadow) on purpose. Several of these elements carry a
     * box-shadow of their own, some of it set inline — the selected room's
     * glow, START's cast, the panels' elevation — and an inline value wins,
     * so a box-shadow ring would be silently missing exactly on the elements
     * that matter most. outline also never disturbs layout, which is why it
     * is safe here on .room-btn/.room-overlay, unlike the scale() press
     * feedback (those carry their own positioning transform).
     *
     * Scoped to .avc-theme like every other 1.2.0 rule, so legacy keeps the
     * browser default — unstyled, but accessible on its own. */
    .avc-theme .action-btn:focus-visible,
    .avc-theme .tile-main:focus-visible,
    .avc-theme .rail-tile:focus-visible,
    .avc-theme .tile-pause:focus-visible,
    .avc-theme .robot-sheet-icon:focus-visible,
    .avc-theme .start-bar:focus-visible,
    .avc-theme .start-seg:focus-visible,
    .avc-theme .dock-mode:focus-visible,
    .avc-theme .dock-row:focus-visible,
    .avc-theme .dock-chip:focus-visible,
    .avc-theme .dock-sheet-action:focus-visible,
    .avc-theme .rs-tab:focus-visible,
    .avc-theme .dock-sheet-care-reset:focus-visible,
    .avc-theme .mtbtn:focus-visible,
    .avc-theme .badge:focus-visible,
    .avc-theme .vac-icon-btn:focus-visible,
    .avc-theme .layer-btn:focus-visible,
    .avc-theme .layer-menu-row:focus-visible,
    .avc-theme .room-btn:focus-visible,
    .avc-theme .room-overlay:focus-visible {
      outline: 2px solid rgb(var(--avc-accent-rgb));
      outline-offset: 2px;
    }
    /* On the map the accent can land on anything the floorplan happens to be,
     * so the ring switches to the on-map ink channel — which the .map-wrap
     * reset already guarantees is white, in every theme — and steps further
     * off the element so it reads against a busy path underneath. */
    .avc-theme .map-wrap .room-btn:focus-visible,
    .avc-theme .map-wrap .room-overlay:focus-visible,
    .avc-theme .map-wrap .layer-btn:focus-visible,
    .avc-theme .map-wrap .layer-menu-row:focus-visible {
      outline: 3px solid rgb(var(--avc-ink-rgb));
      outline-offset: 3px;
    }

    @keyframes avc-live-breathe {
      0%, 100% { box-shadow: 0 6px 18px rgba(var(--avc-warn-rgb), 0.12); }
      50%      { box-shadow: 0 6px 26px rgba(var(--avc-warn-rgb), 0.3); }
    }

    /* A slow highlight travelling along the progress bar — the difference
     * between "a bar that happens to be partly filled" and "something is
     * happening right now". White on purpose: it is a specular highlight on
     * a coloured bar, not ink, so it does not follow the theme. */
    .avc-theme .progress-track { height: 4px; }
    .avc-theme .progress-fill { position: relative; overflow: hidden; }
    .avc-theme .progress-fill::after {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.45), transparent);
      transform: translateX(-100%);
      animation: avc-sheen 2.6s ease-in-out infinite;
    }
    @keyframes avc-sheen {
      0%        { transform: translateX(-100%); }
      60%, 100% { transform: translateX(100%); }
    }

    /* ══ Calm resting state (docs/35 §7) ═══════════════════════════════════
     * Applied when nothing is running, nothing is selected and no map tool is
     * armed — which is most of the time. Purely de-emphasis: every control
     * stays present, tappable and in place, the leftover trace and the
     * secondary metadata just stop competing with the one thing worth
     * touching. calm_state: false opts out. */
    .avc-calm .map-vector { opacity: 0.5; }
    .avc-calm .room-age-dots { opacity: 0.55; }
    .avc-calm .dock-cov { opacity: 0.35; }
    .avc-calm .dbg-prog { opacity: 0.55; }
    .avc-theme.avc-calm .meta-bar { background: var(--avc-panel); box-shadow: none; }
    .avc-theme.avc-calm .start-bar:not(:disabled) {
      box-shadow: 0 0 0 1px rgba(var(--avc-accent-rgb), 0.4),
                  0 10px 26px rgba(var(--avc-accent-rgb), 0.16);
    }
    .avc-theme .map-vector,
    .avc-theme .room-age-dots { transition: opacity 0.6s var(--avc-ease); }


    /* ══ Light-theme legibility (docs/35 §9b) ══════════════════════════════
     * The dim ink tiers were tuned as white-on-near-black, where 45% still
     * reads. Flipped to black-on-porcelain the same 45% lands at 2.8:1 —
     * below WCAG AA for the 11px text it is used on. Rather than change ~40
     * shared use sites (and with them the dark theme they were tuned for),
     * the light themes lift the tiers on the elements that actually carry
     * text. Measured, not eyeballed: 0.61 alpha is where black-on-panel
     * crosses 4.5:1, 0.68 leaves headroom for the lighter dashboards a user
     * might sit the card on.
     *
     * The threshold colours are a separate problem: they come from
     * room_thresholds, a documented user-editable default, and from inline
     * styles, so they cannot be re-mapped here without overriding what the
     * user configured. They are also correct where they are primarily used —
     * on the map, which stays dark in every theme. Darkening them at the
     * point of use keeps the configured hue and the map untouched, and only
     * fixes the one place they are unreadable. brightness(0.45) is the value
     * at which all four defaults clear 4.5:1 (amber is the binding one). */
    .avc-theme--light .dock-est,
    .avc-theme--light .last-clean,
    .avc-theme--light .current-room,
    .avc-theme--light .map-tools-label,
    .avc-theme--light .mtbtn--ghost,
    .avc-theme--light .dock-mode,
    .avc-theme--light .dock-sheet-debug,
    .avc-theme--light .dock-sheet-care-value,
    .avc-theme--light .dbg-prog-item,
    .avc-theme--light .dbg-prog-name,
    .avc-theme--light .layer-menu-head { color: rgba(var(--avc-ink-rgb), 0.68); }
    .avc-theme--light .last-clean ha-icon,
    .avc-theme--light .dock-age ha-icon,
    .avc-theme--light .dbg-prog-item small { color: rgba(var(--avc-ink-rgb), 0.55); }
    .avc-theme--light .dock-cov { opacity: 0.72; }
    .avc-theme--light.avc-calm .dock-cov { opacity: 0.6; }
    .avc-theme--light .dock-age b,
    .avc-theme--light .dock-cov,
    .avc-theme--light .dbg-prog-item b { filter: brightness(0.45) saturate(1.4); }

    @media (prefers-color-scheme: light) {
      .avc-theme--auto .dock-est,
      .avc-theme--auto .last-clean,
      .avc-theme--auto .current-room,
      .avc-theme--auto .map-tools-label,
      .avc-theme--auto .mtbtn--ghost,
      .avc-theme--auto .dock-mode,
      .avc-theme--auto .dock-sheet-debug,
      .avc-theme--auto .dock-sheet-care-value,
      .avc-theme--auto .dbg-prog-item,
      .avc-theme--auto .dbg-prog-name,
      .avc-theme--auto .layer-menu-head { color: rgba(var(--avc-ink-rgb), 0.68); }
      .avc-theme--auto .last-clean ha-icon,
      .avc-theme--auto .dock-age ha-icon,
      .avc-theme--auto .dbg-prog-item small { color: rgba(var(--avc-ink-rgb), 0.55); }
      .avc-theme--auto .dock-cov { opacity: 0.72; }
      .avc-theme--auto.avc-calm .dock-cov { opacity: 0.6; }
      .avc-theme--auto .dock-age b,
      .avc-theme--auto .dock-cov,
      .avc-theme--auto .dbg-prog-item b { filter: brightness(0.45) saturate(1.4); }
    }

    /* Motion opt-outs. The OS preference wins unconditionally; .avc-still
     * is the config-level equivalent (reduce_motion: true) for people who
     * want them off without changing an OS setting. */
    .avc-still,
    .avc-still .start-bar--cancel { --avc-press: 1; --avc-press-ms: 0s; --avc-live: none; }
    .avc-still .progress-fill::after { display: none; }
    @media (prefers-reduced-motion: reduce) {
      .avc-theme,
      .avc-theme .start-bar--cancel { --avc-press: 1; --avc-press-ms: 0s; --avc-live: none; }
      .avc-theme .progress-fill::after { display: none; }
      .avc-theme .avc-err-halo { animation: none; opacity: 0.45; }
      .avc-theme .error-row { animation: none; }
      .avc-theme .mode-action .mtbtn { animation: none; }
    }

    /* == Align mode overlay (docs/41, Faze C - C2a batch) ==================
     * Rendered inside the document.body portal (visual-editor.ts), NOT
     * inside this card's own shadow root -- the SAME adopted stylesheet
     * reaches both (docs/14 rule 1: one stylesheet), so these rules just
     * need to exist once, here. .align-overlay carries the SAME theme
     * class this card's own <ha-card> does (_rootClasses()), so every
     * --avc-* token above resolves identically inside the portal. */
    .align-overlay {
      position: fixed; inset: 0; display: flex; flex-direction: column;
      background: rgba(var(--avc-shade-rgb), 0.92);
      color: rgb(var(--avc-ink-rgb));
      font-family: inherit;
      touch-action: none;
    }
    .align-toolbar {
      display: flex; align-items: center; gap: 8px;
      padding: max(10px, env(safe-area-inset-top)) 12px 10px 12px;
      background: var(--avc-surface);
      box-shadow: var(--avc-elev-1);
      flex-wrap: wrap;
    }
    .align-toolbar-title {
      display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: var(--avc-th-fs-m, 13px);
    }
    .align-toolbar-spacer { flex: 1 1 auto; }
    .align-vac-picker { display: flex; gap: 6px; flex-wrap: wrap; }
    .align-vac-chip {
      font: inherit; font-size: var(--avc-th-fs-xs, 11px); font-weight: 600; cursor: pointer;
      padding: 5px 10px; border-radius: var(--avc-th-r-pill, 999px); color: rgb(var(--avc-ink-rgb));
      background: var(--avc-panel); border: 1px solid var(--avc-panel-line);
    }
    .align-vac-chip.on { background: rgba(var(--avc-tool-rgb), 0.22); border-color: rgba(var(--avc-tool-rgb), 0.6); }
    .align-btn {
      display: inline-flex; align-items: center; justify-content: center;
      width: 34px; height: 34px; border-radius: var(--avc-th-r-m, 10px); cursor: pointer;
      color: rgb(var(--avc-ink-rgb)); background: var(--avc-panel);
      border: 1px solid var(--avc-panel-line);
    }
    .align-close-btn:hover { background: rgba(var(--avc-err-rgb), 0.18); border-color: rgba(var(--avc-err-rgb), 0.5); }
    .align-canvas {
      position: relative; flex: 1 1 auto; overflow: hidden;
      display: flex; align-items: center; justify-content: center;
      touch-action: none; user-select: none; -webkit-user-select: none;
      padding-bottom: env(safe-area-inset-bottom);
    }
    .align-scene {
      position: relative; flex: 0 0 auto; transform-origin: center center;
    }
    .align-floorplan-img {
      position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain;
      transform-origin: center center; pointer-events: none; -webkit-touch-callout: none;
    }
    .align-ghost { position: absolute; inset: 0; opacity: 0.28; pointer-events: none; }
    /* == Floorplan & Calibrate tool: Re-crop (docs/42 §9 fáze N) =========== */
    .recrop-ghost { position: absolute; inset: 0; cursor: grab; touch-action: none; }
    .recrop-rect { pointer-events: none; cursor: inherit; }
    .align-seat-layer { position: absolute; inset: 0; pointer-events: none; }
    .align-seat-img {
      position: absolute; height: auto; pointer-events: auto; touch-action: none;
      -webkit-touch-callout: none; -webkit-user-select: none; user-select: none;
      cursor: grab;
    }
    .align-gizmo { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; overflow: visible; }
    .align-gizmo-box { fill: none; stroke: rgb(var(--avc-tool-rgb)); stroke-width: 0.4; vector-effect: non-scaling-stroke; }
    .align-gizmo-arm { stroke: rgb(var(--avc-tool-rgb)); stroke-width: 0.3; stroke-dasharray: 1.2 1; vector-effect: non-scaling-stroke; }
    .align-handle {
      position: absolute; width: 26px; height: 26px; margin: -13px 0 0 -13px;
      border-radius: 50%; background: rgb(var(--avc-tool-rgb)); border: 2px solid rgb(var(--avc-ink-rgb));
      box-shadow: var(--avc-elev-1); touch-action: none; cursor: pointer;
      display: flex; align-items: center; justify-content: center; color: rgb(var(--avc-ink-rgb));
      --mdc-icon-size: 16px;
    }
    .align-handle--rotate { background: rgba(var(--avc-tool-rgb), 0.85); }
    .align-handle--side {
      width: 20px; height: 20px; margin: -10px 0 0 -10px; opacity: 0.85;
      --mdc-icon-size: 13px;
    }
    .align-handle--side ha-icon { pointer-events: none; }
    .align-axis-hint {
      position: absolute; margin: -8px 0 0 -8px; width: 16px; height: 16px;
      display: flex; align-items: center; justify-content: center;
      color: rgba(var(--avc-ink-rgb), 0.55); pointer-events: none;
      --mdc-icon-size: 13px;
    }
    .align-btn[disabled] { opacity: 0.35; cursor: default; pointer-events: none; }
    .align-btn--flash { background: rgba(var(--avc-ok-rgb), 0.22); border-color: rgba(var(--avc-ok-rgb), 0.6); }
    .align-save-btn {
      width: auto; padding: 0 12px; gap: 6px; font-weight: 700; font-size: var(--avc-th-fs-s, 12px);
      background: rgba(var(--avc-tool-rgb), 0.22); border-color: rgba(var(--avc-tool-rgb), 0.6);
    }
    .align-tier-group {
      display: flex; border-radius: var(--avc-th-r-m, 10px); overflow: hidden;
      border: 1px solid var(--avc-panel-line);
    }
    .align-tier-btn {
      font: inherit; font-size: var(--avc-th-fs-xs, 11px); font-weight: 600; cursor: pointer;
      padding: 0 10px; height: 34px; color: rgba(var(--avc-ink-rgb), 0.6);
      background: var(--avc-panel); border: none; border-right: 1px solid var(--avc-panel-line);
    }
    .align-tier-btn:last-child { border-right: none; }
    .align-tier-btn.on {
      color: rgb(var(--avc-ink-rgb)); font-weight: 700;
      background: rgba(var(--avc-tool-rgb), 0.22);
    }
    /* == Align mode: body row (canvas + numeric side panel, C2b) ========= */
    .align-body { display: flex; flex: 1 1 auto; min-height: 0; }
    .align-side-panel {
      flex: 0 0 208px; display: flex; flex-direction: column; gap: 10px;
      padding: 14px 12px; overflow-y: auto;
      background: var(--avc-surface); box-shadow: var(--avc-elev-1);
    }
    .align-field-row { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
    .align-field-row label {
      font-size: var(--avc-th-fs-s, 12px); font-weight: 600; color: rgba(var(--avc-ink-rgb), 0.75);
      display: flex; align-items: center; gap: 3px;
    }
    .align-field-row label span { font-size: var(--avc-th-fs-xs, 10.5px); font-weight: 500; color: rgba(var(--avc-ink-rgb), 0.5); }
    .align-field-arrow {
      --mdc-icon-size: 13px; color: rgb(var(--avc-tool-rgb));
      flex-shrink: 0;
    }
    .align-field-row input[type="number"] {
      width: 84px; font: inherit; font-size: var(--avc-th-fs-s, 12px); text-align: right;
      color: rgb(var(--avc-ink-rgb)); background: var(--avc-panel);
      border: 1px solid var(--avc-panel-line); border-radius: var(--avc-th-r-m, 8px); padding: 5px 7px;
    }
    .align-field-row input[disabled] { opacity: 0.4; }
    .align-field-row--opacity { flex-direction: column; align-items: stretch; gap: 2px; }
    .align-field-row--opacity input[type="range"] {
      width: 100%; accent-color: rgb(var(--avc-tool-rgb)); cursor: pointer;
    }
    .align-field-row--check label { flex: 1 1 auto; display: flex; align-items: center; gap: 6px; }
    .align-field-row--check input[type="checkbox"] { width: 15px; height: 15px; }
    @media (max-width: 700px) {
      .align-body { flex-direction: column-reverse; }
      .align-side-panel {
        flex: 0 0 auto; width: 100%; max-height: 32vh;
        flex-direction: row; flex-wrap: wrap; align-items: center;
      }
      .align-field-row { flex: 1 1 45%; }
    }
    /* == Align mode: home-frame degradation (docs/41 §4.8) =============== */
    /* == Visual editor: tool-switcher row (docs/42 §9 fáze H) ============ */
    .ve-tool-row {
      display: flex; gap: 6px; padding: 8px 12px;
      background: var(--avc-surface); border-top: 1px solid var(--avc-panel-line);
      flex-wrap: wrap;
    }
    .ve-tool-tab {
      font: inherit; font-size: var(--avc-th-fs-s, 12px); font-weight: 600; cursor: pointer;
      padding: 7px 14px; border-radius: var(--avc-th-r-pill, 999px); color: rgba(var(--avc-ink-rgb), 0.7);
      background: var(--avc-panel); border: 1px solid var(--avc-panel-line);
    }
    .ve-tool-tab.on {
      color: rgb(var(--avc-ink-rgb)); font-weight: 700;
      background: rgba(var(--avc-tool-rgb), 0.22); border-color: rgba(var(--avc-tool-rgb), 0.6);
    }
    .ve-placeholder-body { align-items: center; justify-content: center; }
    .ve-placeholder {
      display: flex; flex-direction: column; align-items: center; gap: 8px;
      color: rgba(var(--avc-ink-rgb), 0.6); text-align: center; padding: 24px;
      --mdc-icon-size: 40px;
    }
    .ve-placeholder-title { font-size: var(--avc-th-fs-l, 15px); font-weight: 700; color: rgb(var(--avc-ink-rgb)); }
    .ve-placeholder-sub { font-size: var(--avc-th-fs-s, 12px); }
    /* == Visual editor: Floorplan & Calibrate tool's sub-tabs (fáze J2) ==== */
    .ve-subtab-row {
      display: flex; gap: 6px; padding: 8px 12px 0;
    }
    .ve-subtab {
      font: inherit; font-size: var(--avc-th-fs-s, 11.5px); font-weight: 600; cursor: pointer;
      padding: 5px 12px; border-radius: var(--avc-th-r-pill, 999px); color: rgba(var(--avc-ink-rgb), 0.65);
      background: transparent; border: 1px solid var(--avc-panel-line);
    }
    .ve-subtab.on {
      color: rgb(var(--avc-ink-rgb)); font-weight: 700;
      background: rgba(var(--avc-warn-rgb), 0.2); border-color: rgba(var(--avc-warn-rgb), 0.55);
    }
    .ve-subtab:disabled { opacity: 0.4; cursor: not-allowed; }
    /* == Visual editor: 2/N-point calibration sub-view (docs/39, fáze J2) = */
    .calib-marker {
      position: absolute; transform: translate(-50%, -50%);
      width: 24px; height: 24px; border-radius: 50%;
      background: rgba(var(--avc-warn-rgb), 0.9); border: 2px solid white;
      display: flex; align-items: center; justify-content: center;
      color: #000; font-size: var(--avc-th-fs-s, 12px); font-weight: 700;
      pointer-events: none; z-index: 2;
    }
    .floor-calib-banner {
      font-size: var(--avc-th-fs-s, 12px); line-height: 1.4; padding: 8px 10px; border-radius: var(--avc-th-r-m, 8px);
      background: rgba(var(--avc-warn-rgb), 0.14); border: 1px solid rgba(var(--avc-warn-rgb), 0.4);
      display: flex; flex-direction: column; gap: 4px;
    }
    .floor-calib-inset {
      position: relative; border-radius: var(--avc-th-r-m, 8px); overflow: hidden; cursor: crosshair;
      background: rgba(var(--avc-ink-rgb), 0.06); border: 1px solid var(--avc-panel-line);
    }
    .floor-calib-inset:not(.floor-calib-inset--active) { cursor: default; opacity: 0.55; }
    .floor-calib-inset img { display: block; width: 100%; height: auto; pointer-events: none; }
    .floor-calib-error { font-size: var(--avc-th-fs-s, 12px); color: rgb(var(--avc-err-rgb)); }
    /* == Visual editor: Seat & Appearance tool's Appearance section ======= */
    .align-side-panel-divider {
      height: 1px; background: var(--avc-panel-line); margin: 4px 0;
    }
    .align-side-panel .section-title {
      font-size: var(--avc-th-fs-xs, 11px); font-weight: 700; letter-spacing: 0.03em; text-transform: uppercase;
      color: rgba(var(--avc-ink-rgb), 0.5);
    }
    .align-field-row--color { flex-direction: column; align-items: stretch; gap: 4px; }
    .align-color-row { display: flex; gap: 6px; align-items: center; }
    .align-color-swatch {
      width: 30px; height: 30px; padding: 0; border-radius: var(--avc-th-r-m, 8px); cursor: pointer;
      border: 1px solid var(--avc-panel-line); background: none;
    }
    .align-color-text {
      flex: 1 1 auto; font: inherit; font-size: var(--avc-th-fs-s, 12px); color: rgb(var(--avc-ink-rgb));
      background: var(--avc-panel); border: 1px solid var(--avc-panel-line);
      border-radius: var(--avc-th-r-m, 8px); padding: 5px 7px;
    }
    .align-field-row select {
      font: inherit; font-size: var(--avc-th-fs-s, 12px); color: rgb(var(--avc-ink-rgb)); background: var(--avc-panel);
      border: 1px solid var(--avc-panel-line); border-radius: var(--avc-th-r-m, 8px); padding: 5px 7px;
    }
    /* == Rooms tool (docs/42 §9 fáze I) ==================================== */
    .align-btn--armed { background: rgba(var(--avc-tool-rgb), 0.28); border-color: rgba(var(--avc-tool-rgb), 0.7); }
    .align-scene--drawing { cursor: crosshair; }
    .rooms-rect {
      position: absolute; box-sizing: border-box; transform: translate(-50%, -50%);
      border-style: solid; border-color: rgb(var(--avc-tool-rgb));
      background: rgba(var(--avc-tool-rgb), 0.1); cursor: move; touch-action: none;
    }
    .rooms-rect--selected { background: rgba(var(--avc-tool-rgb), 0.2); }
    .rooms-rect--drawing {
      border: 2px dashed rgb(var(--avc-tool-rgb)); background: rgba(var(--avc-tool-rgb), 0.14);
      pointer-events: none;
    }
    .rooms-rect-label {
      position: absolute; top: 2px; left: 4px; max-width: calc(100% - 8px);
      font-size: var(--avc-th-fs-xs, 11px); font-weight: 700; color: rgb(var(--avc-ink-rgb)); background: var(--avc-surface);
      padding: 1px 5px; border-radius: var(--avc-th-r-s, 6px); pointer-events: none; white-space: nowrap; overflow: hidden;
      text-overflow: ellipsis;
    }
    .rooms-handle--nw { left: 0; top: 0; }
    .rooms-handle--ne { left: 100%; top: 0; }
    .rooms-handle--sw { left: 0; top: 100%; }
    .rooms-handle--se { left: 100%; top: 100%; }
    .rooms-side-note { font-size: var(--avc-th-fs-s, 12px); color: rgba(var(--avc-ink-rgb), 0.6); line-height: 1.4; }
    /* == docs/44 F7: Visual editor — canvas, top bar, room labels ========= */
    /* V1: an opaque canvas with a fine dot grid — the dashboard no longer
     * shows through behind the editor. Themed only; legacy keeps its scrim. */
    .avc-theme.align-overlay { background: rgb(var(--avc-scrim-2-rgb)); }
    .avc-theme .align-canvas {
      background-image: radial-gradient(rgba(var(--avc-ink-rgb), 0.09) 1px, transparent 1.4px);
      background-size: 22px 22px;
    }
    /* One top bar: vacuums left, tools centre, actions right (wraps to two
     * rows on narrow screens, tools then take the whole second row). */
    .ve-topbar {
      display: grid; grid-template-columns: auto minmax(0, 1fr) auto;
      align-items: center; gap: 8px 12px;
    }
    .ve-topbar .ve-tool-row { justify-self: center; }
    .ve-topbar .align-vac-picker { justify-self: start; min-width: 0; flex-wrap: nowrap; overflow-x: auto; scrollbar-width: none; }
    .ve-topbar .align-vac-picker::-webkit-scrollbar { display: none; }
    .ve-topbar-actions { justify-self: end; display: flex; align-items: center; gap: 6px; flex-wrap: nowrap; }
    .align-vac-chip {
      display: inline-flex; align-items: center; gap: 6px; flex-shrink: 0;
      padding: 3px 12px 3px 3px; font-size: var(--avc-th-fs-s, 12px);
    }
    .align-vac-chip--static { cursor: default; }
    .ve-chip-avatar { width: 24px; height: 24px; border-radius: 50%; object-fit: cover; flex-shrink: 0; }
    .ve-chip-avatar--dot { display: inline-block; width: 12px; height: 12px; margin: 0 2px 0 6px; }
    .ve-topbar .ve-tool-row {
      padding: 3px; gap: 2px; border: 1px solid var(--avc-panel-line); border-top: 1px solid var(--avc-panel-line);
      border-radius: var(--avc-th-r-pill, 999px); background: var(--avc-panel); flex-wrap: nowrap;
    }
    .ve-topbar .ve-tool-tab {
      display: inline-flex; align-items: center; gap: 6px; border: none; background: transparent;
      padding: 6px 14px; white-space: nowrap;
    }
    .ve-topbar .ve-tool-tab ha-icon { --mdc-icon-size: 16px; }
    .ve-topbar .ve-tool-tab.on { background: rgba(var(--avc-accent-rgb), 0.2); color: rgb(var(--avc-ink-rgb)); }
    @media (max-width: 1180px) {
      .ve-topbar { grid-template-columns: minmax(0, 1fr) auto; }
      .ve-topbar .ve-tool-row { grid-column: 1 / -1; grid-row: 2; justify-self: stretch; }
      .ve-topbar .ve-tool-tab { flex: 1; justify-content: center; }
    }
    @media (max-width: 520px) {
      .ve-topbar .ve-tool-tab span { display: none; }
    }
    /* V2: room labels whole — inside the room at the top; a room too narrow
     * for its name shows it on hover/selection above the rectangle, and
     * always as a tooltip (title). */
    .rooms-rect { container-type: size; }
    .rooms-rect-label { max-width: none; overflow: visible; text-overflow: clip; }
    @container (max-width: 76px) {
      .rooms-rect-label { display: none; }
      .rooms-rect--selected > .rooms-rect-label, .rooms-rect:hover > .rooms-rect-label {
        /* clear of the 26 px corner handles a selected room carries */
        display: block; top: auto; bottom: calc(100% + 18px); left: 50%; transform: translateX(-50%);
        box-shadow: var(--avc-elev-1); z-index: 2;
      }
    }
    /* == Align mode: home-frame degradation (docs/41 §4.8) =============== */
    .align-seat-layer--readonly { cursor: default; }
    .align-seat-layer--readonly .align-seat-img { cursor: default; }
    .align-readonly-note {
      position: absolute; left: 50%; bottom: 6%; transform: translateX(-50%);
      display: flex; align-items: center; gap: 6px; font-size: var(--avc-th-fs-s, 12px); font-weight: 600;
      padding: 7px 12px; border-radius: var(--avc-th-r-pill, 999px); white-space: nowrap;
      color: rgb(var(--avc-ink-rgb)); background: var(--avc-surface); box-shadow: var(--avc-elev-1);
    }
    /* == Align mode: Cancel confirmation (docs/41 §4.4, Esc/X row) ======== */
    .align-confirm-backdrop {
      position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
      background: rgba(var(--avc-shade-rgb), 0.55); z-index: 1;
    }
    .align-confirm-panel {
      width: min(320px, 86vw); padding: 18px; border-radius: var(--avc-th-r-l, 14px);
      background: var(--avc-surface); box-shadow: var(--avc-elev-1);
      color: rgb(var(--avc-ink-rgb));
    }
    .align-confirm-title { font-size: var(--avc-th-fs-l, 14px); font-weight: 700; margin-bottom: 6px; }
    .align-confirm-body { font-size: var(--avc-th-fs-m, 12.5px); color: rgba(var(--avc-ink-rgb), 0.7); margin-bottom: 14px; }
    .align-confirm-actions { display: flex; justify-content: flex-end; gap: 8px; }
    .align-confirm-keep, .align-confirm-discard {
      width: auto; height: 32px; padding: 0 12px; font-size: var(--avc-th-fs-s, 12px); font-weight: 700;
    }
    .align-confirm-discard { background: rgba(var(--avc-err-rgb), 0.18); border-color: rgba(var(--avc-err-rgb), 0.5); }
  `,__decorate([n$1({attribute:!1})],ve.prototype,"hass",void 0),__decorate([n$1({attribute:!1})],ve.prototype,"editMode",void 0),__decorate([r()],ve.prototype,"_config",void 0),__decorate([r()],ve.prototype,"_shownSet",void 0),__decorate([r()],ve.prototype,"_holdId",void 0),__decorate([r()],ve.prototype,"_mapMode",void 0),__decorate([r()],ve.prototype,"_inspectKey",void 0),__decorate([r()],ve.prototype,"_robotSheet",void 0),__decorate([r()],ve.prototype,"_robotSheetTab",void 0),__decorate([r()],ve.prototype,"_veNotice",void 0),__decorate([r()],ve.prototype,"_modeSheetOpen",void 0),__decorate([r()],ve.prototype,"_careResetPending",void 0),__decorate([r()],ve.prototype,"_modeEntity",void 0),__decorate([r()],ve.prototype,"_dbg",void 0),__decorate([r()],ve.prototype,"_zoneDrag",void 0),__decorate([r()],ve.prototype,"_zoneRectShown",void 0),__decorate([r()],ve.prototype,"_zonePending",void 0),__decorate([r()],ve.prototype,"_zoneEdit",void 0),__decorate([r()],ve.prototype,"_pinPending",void 0),__decorate([r()],ve.prototype,"_layers",void 0),__decorate([r()],ve.prototype,"_layerMenu",void 0),__decorate([r()],ve.prototype,"_localRoomSel",void 0),__decorate([r()],ve.prototype,"_activePresets",void 0),__decorate([r()],ve.prototype,"_planMode",void 0),__decorate([r()],ve.prototype,"_activeGlobalPreset",void 0),__decorate([r()],ve.prototype,"_cardW",void 0),__decorate([r()],ve.prototype,"_mapAR",void 0),__decorate([r()],ve.prototype,"_alignSession",void 0),__decorate([r()],ve.prototype,"_alignView",void 0),__decorate([r()],ve.prototype,"_alignCancelConfirm",void 0),__decorate([r()],ve.prototype,"_alignCopiedFlash",void 0),__decorate([r()],ve.prototype,"_veTool",void 0),__decorate([r()],ve.prototype,"_roomsSession",void 0),__decorate([r()],ve.prototype,"_roomsDeleteConfirm",void 0),__decorate([r()],ve.prototype,"_roomsCopiedFlash",void 0),__decorate([r()],ve.prototype,"_floorplanCopiedFlash",void 0),__decorate([r()],ve.prototype,"_floorplanMode",void 0),__decorate([r()],ve.prototype,"_floorCalib",void 0),__decorate([r()],ve.prototype,"_floorCalibRefNat",void 0),__decorate([r()],ve.prototype,"_floorCalibResult",void 0),__decorate([r()],ve.prototype,"_floorCalibError",void 0),__decorate([r()],ve.prototype,"_homeCalib",void 0),__decorate([r()],ve.prototype,"_homeCalibBusy",void 0),__decorate([r()],ve.prototype,"_homeCalibError",void 0),__decorate([r()],ve.prototype,"_homeCalibResult",void 0),__decorate([r()],ve.prototype,"_homeCalibSnapshotUrl",void 0),__decorate([r()],ve.prototype,"_homeCalibCrop",void 0),__decorate([r()],ve.prototype,"_homeCalibFrameId",void 0),__decorate([r()],ve.prototype,"_fiducialSnapshotBusy",void 0),__decorate([r()],ve.prototype,"_fiducialSnapshotError",void 0),__decorate([r()],ve.prototype,"_fiducialSnapshotPath",void 0),__decorate([r()],ve.prototype,"_fiducialKnown",void 0),__decorate([r()],ve.prototype,"_fiducialDetectBusy",void 0),__decorate([r()],ve.prototype,"_fiducialDetectError",void 0),__decorate([r()],ve.prototype,"_fiducialDetectResult",void 0),__decorate([r()],ve.prototype,"_floorplanSnapshotBusy",void 0),__decorate([r()],ve.prototype,"_floorplanSnapshotError",void 0),__decorate([r()],ve.prototype,"_homeFrameSnapshotBusy",void 0),__decorate([r()],ve.prototype,"_homeFrameSnapshotError",void 0),__decorate([r()],ve.prototype,"_guideExportBusy",void 0),__decorate([r()],ve.prototype,"_guideExportError",void 0),__decorate([r()],ve.prototype,"_guideExportResult",void 0),__decorate([r()],ve.prototype,"_placeRoomsResult",void 0),__decorate([r()],ve.prototype,"_veToolSwitchTarget",void 0),__decorate([r()],ve.prototype,"_floorplanSession",void 0),__decorate([r()],ve.prototype,"_recropDraft",void 0),__decorate([r()],ve.prototype,"_recropHistory",void 0),__decorate([r()],ve.prototype,"_recropFuture",void 0),__decorate([r()],ve.prototype,"_recropNat",void 0),__decorate([r()],ve.prototype,"_profile",void 0),__decorate([r()],ve.prototype,"_mapRegW",void 0),__decorate([r()],ve.prototype,"_mapRegH",void 0),__decorate([r()],ve.prototype,"_mapAvailW",void 0),__decorate([r()],ve.prototype,"_mapAvailH",void 0),__decorate([r()],ve.prototype,"_veTint",void 0),__decorate([r()],ve.prototype,"_startSeq",void 0),__decorate([r()],ve.prototype,"_flipLive",void 0),__decorate([r()],ve.prototype,"_now",void 0),__decorate([r()],ve.prototype,"_planPreview",void 0),ve=__decorate([t$1(Kt)],ve);const be=(_e=window).customCards??(_e.customCards=[]);be.some(t=>t.type===Kt)||be.push({type:Kt,name:"AnyVac Card",description:"Feature-rich card for Roborock vacuums — map, room selection, multi-vacuum tabs, global actions.",preview:!1,documentationURL:"https://github.com/Michailjovic/anyvac-card"});const ye={entity:"",name:"",color:"green",rooms:[],clean_action:{type:"native"}},xe={key:"",name:"",icon:"mdi:square",map_x:50,map_y:50},we=["mdi:numeric-1-circle","mdi:numeric-2-circle","mdi:numeric-3-circle","mdi:numeric-4-circle","mdi:numeric-5-circle","mdi:numeric-6-circle","mdi:numeric-7-circle","mdi:numeric-8-circle","mdi:numeric-9-circle","mdi:numeric-9-plus-circle"];function _roomIconFor(t){return we[Math.min(t,we.length-1)]}const $e={entity:"",rotation:0,scale:100,offset_x:0,offset_y:0},ke={name:"Whole flat",color:"orange",watch_entities:[],action:{type:"script",entity_id:""}},Se=[{days:2,color:"#2ecc71"},{days:5,color:"#faad14"},{days:10,color:"#ff9800"}];let Ce=class AnyVacCardEditor extends Gt{constructor(){super(...arguments),this._tab="vacuums",this._dragRoom=null,this._dragSeq=null,this._openVac=null,this._openSensors=new Set,this._openMap=new Set,this._openPresets=new Set,this._openAction=new Set,this._openGlobal=new Set,this._openRoom=new Map,this._hvSwap=!1,this._pvAR=0,this._pvNat=null,this._floorplanSnapshotBusy=!1,this._floorplanSnapshotError="",this._guideExportBusy=!1,this._guideExportError="",this._guideExportResult=null,this._placeRoomsResult=null,this._initialized=!1,this._ha=null,this._menu=null,this._confirm=null,this._hintsOpen=new Set,this._hintSeq=0}connectedCallback(){super.connectedCallback(),this._ensureHaElements()}setConfig(t){this._config=t,this._initialized||(this._initialized=!0,this._openVac=1===(t.vacuums??[]).length?0:null)}updated(t){if((t.has("hass")||t.has("_ha"))&&this.hass&&!1===this._ha){const t=this.shadowRoot?.getElementById("ha-entities");t&&!t.options.length&&(t.innerHTML=Object.keys(this.hass.states).sort().map(t=>'<option value="'+t+'">').join(""))}}async _snapshotFloorplan(t){const e=this._mapEntityFor(t);if(e){this._floorplanSnapshotBusy=!0,this._floorplanSnapshotError="";try{const o=await this.hass.callService("anyvac","snapshot_map_as_floorplan",{image_entity:e,name:t.name||t.entity},void 0,!1,!0),s=o?.response?.path;if(!s)throw new Error("no path in service response");const l=o?.response?.crop,h=this._config.vacuums.findIndex(e=>e.entity===t.entity);if(this._setEditedImageBase(l?{src:s,crop_box:{entity:t.entity,...l}}:{src:s},h>=0?h:void 0),this._mergedEdit){const t=this._config.vacuums.map(t=>({...t,hide_map:!0}));this._setConfig({vacuums:t})}else{const e=this._config.vacuums.findIndex(e=>e.entity===t.entity);e>=0&&this._setVacuum(e,{hide_map:!0})}if(l){const e=this._config.vacuums.findIndex(e=>e.entity===t.entity);e>=0&&this._placeOwnRooms(e,l)}}catch(t){this._floorplanSnapshotError="Couldn't snapshot this vacuum's map — make sure the anyvac integration is updated to at least 0.88.0, then try again.",console.error("[anyvac-card] snapshot_map_as_floorplan failed:",t)}finally{this._floorplanSnapshotBusy=!1}}}async _exportMapGuide(t,e){const o=this._mapEntityFor(t);if(!o)return;this._guideExportBusy=!0,this._guideExportError="",this._guideExportResult=null;const s=this._currentImageBase(e)?.crop_box,l=s&&"entity"in s&&s.entity===t.entity?{x0:s.x0,y0:s.y0,x1:s.x1,y1:s.y1}:void 0;try{const e={image_entity:o,name:t.name||t.entity};l&&(e.crop=l);const s=await this.hass.callService("anyvac","export_map_guide",e,void 0,!1,!0),h=s?.response?.paths,d=s?.response?.size;if(!h||!d||!Object.keys(h).length)throw new Error("no guide layers in service response");this._guideExportResult={paths:h,size:d,crop:s?.response?.crop,entity:t.entity}}catch(t){this._guideExportError="Couldn't export guide layers — make sure the anyvac integration is updated to at least 1.4.0, then try again.",console.error("[anyvac-card] export_map_guide failed:",t)}finally{this._guideExportBusy=!1}}_fire(t){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}_setConfig(t){const e={...this._config,...t};this._config=e,this._fire(e)}_setVacuum(t,e){const o=[...this._config.vacuums];o[t]={...o[t],...e};const s={...this._config,vacuums:o};this._config=s,this._fire(s)}_setMap(t,e){const o=this._config.vacuums[t].map??{...$e};this._setVacuum(t,{map:{...o,...e}})}_setImageBase(t,e){const o=this._config.vacuums[t].image_base??{src:""};this._setVacuum(t,{image_base:{...o,...e}})}get _mergedEdit(){return"merged"===this._config.map_mode}_editRooms(t=0){if(this._mergedEdit)return this._config.rooms??[];const e=this._config.vacuums[Math.min(t,this._config.vacuums.length-1)];return e?.rooms??[]}_setEditedRoom(t,e,o=0){if(this._mergedEdit){const o=[...this._config.rooms??[]];o[t]={...o[t],...e},this._setConfig({rooms:o})}else this._setRoom(Math.min(o,this._config.vacuums.length-1),t,e)}_addEditedRoom(t=0){if(this._mergedEdit){const t=this._config.rooms??[],e=[...t,{...xe,icon:_roomIconFor(t.length)}];this._setConfig({rooms:e})}else this._addRoom(Math.min(t,this._config.vacuums.length-1))}_deleteEditedRoom(t,e=0){if(this._mergedEdit){const e=(this._config.rooms??[]).filter((e,o)=>o!==t);this._setConfig({rooms:e})}else this._deleteRoom(Math.min(e,this._config.vacuums.length-1),t)}_setLayoutFlip(t,e){const o=this._config.layout??{},s=o[t]??{},l={...s.crop??{},flip:!!e||void 0};this._setConfig({layout:{...o,[t]:{...s,crop:l}}})}_setEditedImageBase(t,e){this._mergedEdit?this._setConfig({image_base:{...this._config.image_base??{src:""},...t}}):void 0!==e&&this._setImageBase(Math.min(e,this._config.vacuums.length-1),t)}_currentImageBase(t=0){const e=this._config.vacuums;if(!e.length)return;const o=Math.min(t,e.length-1);return this._mergedEdit?this._config.image_base:e[o].image_base}_editorAR(){return this._pvAR>.1?this._pvAR:3.636}_intEntityFor(t){if(!t)return;if(t.integration_entity)return t.integration_entity;const e=this.hass?.entities,o=e?.[t.entity]?.device_id;return o?Object.keys(e).find(t=>e[t]?.device_id===o&&"anyvac"===e[t]?.platform&&t.startsWith("sensor.")):void 0}_mapEntityFor(t){if(!t)return;if(t.map?.entity)return t.map.entity;const e=this.hass?.entities,o=e?.[t.entity]?.device_id;if(!o)return;const s=Object.keys(e).filter(t=>e[t]?.device_id===o&&t.startsWith("image.")),l=s.filter(t=>{const e=this.hass.states[t];return!!e&&"unavailable"!==e.state&&"unknown"!==e.state&&!!e.attributes.entity_picture});return 1===l.length?l[0]:1===s.length?s[0]:void 0}_anyHomeFrame(){const t=new Map;for(const e of this._config.vacuums??[]){const o=this._intEntityFor(e),s=(o?this.hass.states[o]?.attributes:void 0)?.home_frame;if(!(s?.id&&s.width_px>0&&s.height_px>0))continue;const l=t.get(s.id);l?l.count++:t.set(s.id,{w:s.width_px,h:s.height_px,count:1})}let e=null;for(const[o,s]of t)(!e||s.count>e.count)&&(e={id:o,...s});return e?{id:e.id,w:e.w,h:e.h}:null}_roomSequence(t){const e=this._intEntityFor(t),o=e?this.hass?.states?.[e]?.attributes:void 0;return o?.room_sequence??{}}_roomsInSequenceOrder(t,e){return t.map((t,o)=>({r:t,i:o,s:t.key?e[t.key]??1/0:1/0})).sort((t,e)=>t.s!==e.s?t.s-e.s:t.i-e.i).map(t=>t.r)}_moveSequence(t,e,o,s){if(o===s)return;const l=e.map(t=>t.key).filter(t=>!!t);if(o<0||o>=l.length||s<0||s>=l.length)return;const[h]=l.splice(o,1);l.splice(s,0,h),this.hass.callService("anyvac","set_room_sequence",{rooms:l})}_placeOwnRooms(t,e){const o=this._config.vacuums[t],s=this._intEntityFor(o),l=s?this.hass.states[s]?.attributes:void 0,h=Array.isArray(l?.rooms)?l.rooms:[];if(!h.length)return null;const d=this._mergedEdit?this._config.rooms??[]:o.rooms??[],{rooms:p,placed:u,added:m}=function placeRoomsInCrop(t,e,o,s){const l=o.map(t=>({...t})),h=new Map;l.forEach((t,e)=>h.set(t.key,e));let d=0,p=0;for(const o of t){const t=o?.name,u=o?.bbox_px;if(!t||!u)continue;const m=placeRoomInCrop(u,e);if(!m)continue;const _=h.get(t);if(void 0!==_)l[_]={...l[_],...m},d++;else{const e={key:t,name:t,icon:s(l.length),...m};l.push(e),h.set(t,l.length-1),p++}}return{rooms:l,placed:d,added:p}}(h,e,d,_roomIconFor);if(u||m){const e=p;this._mergedEdit?this._setConfig({rooms:e}):this._setVacuum(t,{rooms:e})}return{placed:u,added:m}}_placeRoomsFromCropBox(){const t=this._currentImageBase()?.crop_box;if(!t||!("entity"in t))return;const e=this._config.vacuums.findIndex(e=>e.entity===t.entity);if(e<0)return;const o=this._placeOwnRooms(e,t);o&&(this._placeRoomsResult=o)}_setRoom(t,e,o){const s=[...this._config.vacuums[t].rooms??[]];s[e]={...s[e],...o},this._setVacuum(t,{rooms:s})}_setCleanAction(t,e){const o=this._config.vacuums[t].clean_action??{type:"native"};this._setVacuum(t,{clean_action:{...o,...e}})}_setPreset(t,e,o){const s=[...this._config.vacuums[t].presets??[]];s[e]={...s[e],...o},this._setVacuum(t,{presets:s})}_addPreset(t){const e=this._config.vacuums[t].presets??[],o=[...e,{id:"preset"+(e.length+1),label:"New preset"}];this._setVacuum(t,{presets:o}),this._openPresets=new Set([...this._openPresets,t])}_deletePreset(t,e){const o=(this._config.vacuums[t].presets??[]).filter((t,o)=>o!==e);this._setVacuum(t,{presets:o})}_setGlobal(t,e){const o=[...this._config.global_actions??[]];o[t]={...o[t],...e};const s={...this._config,global_actions:o};this._config=s,this._fire(s)}_setGlobalAction(t,e){const o=this._config.global_actions?.[t]?.action??{type:"script",entity_id:""};this._setGlobal(t,{action:{...o,...e}})}_moveVacuum(t,e){const o=t+e,s=[...this._config.vacuums];if(o<0||o>=s.length)return;[s[t],s[o]]=[s[o],s[t]];const l={...this._config,vacuums:s};this._config=l,this._fire(l),this._openVac===t?this._openVac=o:this._openVac===o&&(this._openVac=t)}_addVacuum(){const t=[...this._config.vacuums,{...ye}],e={...this._config,vacuums:t};this._config=e,this._fire(e),this._openVac=t.length-1}_deleteVacuum(t){const e=this._config.vacuums.filter((e,o)=>o!==t),o={...this._config,vacuums:e};this._config=o,this._fire(o),this._openVac===t?this._openVac=null:null!==this._openVac&&this._openVac>t&&this._openVac--}_addRoom(t){const e=this._config.vacuums[t].rooms??[],o=[...e,{...xe,icon:_roomIconFor(e.length)}];this._setVacuum(t,{rooms:o});const s=new Map(this._openRoom);s.set(t,o.length-1),this._openRoom=s}_moveRoom(t,e,o){if(e===o)return;const s=[...this._config.vacuums[t].rooms??[]];if(e<0||e>=s.length||o<0||o>=s.length)return;const[l]=s.splice(e,1);s.splice(o,0,l),this._setVacuum(t,{rooms:s})}_deleteRoom(t,e){const o=(this._config.vacuums[t].rooms??[]).filter((t,o)=>o!==e);this._setVacuum(t,{rooms:o});if(this._openRoom.get(t)===e){const e=new Map(this._openRoom);e.set(t,null),this._openRoom=e}}_setGlobalPreset(t,e){const o=[...this._config.global_presets??[]];o[t]={...o[t],...e},this._setConfig({global_presets:o})}_addGlobalPreset(){const t=this._config.global_presets??[],e=[...t,{id:"gp"+(t.length+1),label:"New clean",scope:"select"}];this._setConfig({global_presets:e})}_deleteGlobalPreset(t){const e=(this._config.global_presets??[]).filter((e,o)=>o!==t);this._setConfig({global_presets:e})}_addGlobal(){const t=[...this._config.global_actions??[],{...ke}],e={...this._config,global_actions:t};this._config=e,this._fire(e);const o=t.length-1;this._openGlobal=new Set([...this._openGlobal,o])}_deleteGlobal(t){const e=(this._config.global_actions??[]).filter((e,o)=>o!==t),o={...this._config,global_actions:e};this._config=o,this._fire(o);const s=new Set(this._openGlobal);s.delete(t),this._openGlobal=s}_toggleVac(t){this._openVac=this._openVac===t?null:t,this._menu=null}_toggleRoom(t,e){const o=new Map(this._openRoom),s=o.get(t)??null;o.set(t,s===e?null:e),this._openRoom=o}_toggleIn(t,e,o){const s=new Set(t);return o??!s.has(e)?s.add(e):s.delete(e),s}_toggleSensors(t,e){this._openSensors=this._toggleIn(this._openSensors,t,e)}_toggleMap(t,e){this._openMap=this._toggleIn(this._openMap,t,e)}_toggleAction(t,e){this._openAction=this._toggleIn(this._openAction,t,e)}_togglePresets(t,e){this._openPresets=this._toggleIn(this._openPresets,t,e)}_toggleGlobal(t){this._openGlobal=this._toggleIn(this._openGlobal,t)}async _ensureHaElements(){if(null!==this._ha)return;const ready=()=>!!customElements.get("ha-selector");if(ready())return void(this._ha=!0);const t=window;if("function"==typeof t.loadCardHelpers){try{const e=await t.loadCardHelpers();for(const t of["entities","tile"]){const o=await e.createCardElement({type:t,entities:[],entity:"sun.sun"});if(await(o?.constructor?.getConfigElement?.()),ready())break}await Promise.race([customElements.whenDefined("ha-selector"),new Promise(t=>setTimeout(t,4e3))])}catch(t){console.warn("[anyvac-card] couldn't load HA form elements, using plain inputs:",t)}this._ha=ready()}else this._ha=!1}_sel(t,e,o,s,l={}){return zt`<ha-selector class="sel" .hass=${this.hass} .selector=${e} .value=${o}
      label=${t} .required=${!!l.required} .placeholder=${l.placeholder}
      @value-changed=${t=>{t.stopPropagation(),s(t.detail?.value)}}></ha-selector>`}_entityPicker(t,e,o,s,l=!1){if(this._ha)return this._sel(t,{entity:{domain:1===o.length?o[0]:o}},e||void 0,t=>s(t??""),{required:l});const h=o.length?o.join(" / "):"entity_id",d=1===o.length,p=d?"ha-ents-"+o[0]:"ha-entities",u=d?Object.keys(this.hass?.states??{}).filter(t=>t.startsWith(o[0]+".")).sort():null;return zt`
      ${u?zt`<datalist id=${p}>${u.map(t=>zt`<option value=${t}>`)}</datalist>`:Ht}
      <div class="field">
        <label>${t}${l?zt`<span class="required"> *</span>`:Ht}</label>
        <input class="text-input" type="text" list=${p}
          .value=${e??""} placeholder=${h}
          @input=${t=>{const e=t.target.value;(""===e||this.hass.states[e])&&s(e)}}
          @change=${t=>s(t.target.value)} />
      </div>`}_textField(t,e,o,s=""){return this._ha?this._sel(t,{text:{}},e??"",t=>o(t??""),{placeholder:s}):zt`
      <div class="field">
        <label>${t}</label>
        <input class="text-input" type="text" .value=${e??""} placeholder=${s}
          @change=${t=>o(t.target.value)} />
      </div>`}_resolveColor(t,e){const o=t??e;return ee[o]??o}_colorField(t,e,o,s,l){const h=(e??"").toLowerCase(),d=/^#[0-9a-f]{6}$/.test(h)&&!o.some(t=>t.hex.toLowerCase()===h);return zt`
      <div class="field">
        <span class="field-label">${t}</span>
        <div class="swatches" role="radiogroup" aria-label=${t}>
          ${o.map(t=>zt`<button type="button" class="swatch ${t.hex.toLowerCase()===h?"swatch--on":""}"
              role="radio" aria-checked=${t.hex.toLowerCase()===h?"true":"false"}
              title=${t.label??t.hex} aria-label=${t.label??t.hex}
              style=${Yt({background:t.hex})} @click=${()=>s(t.hex)}></button>`)}
          <label class="swatch swatch--custom ${d?"swatch--on":""}" title="Custom colour"
            style=${Yt({background:d?h:"transparent"})}>
            ${d?Ht:zt`<ha-icon icon="mdi:palette-outline"></ha-icon>`}
            <input type="color" .value=${/^#[0-9a-f]{6}$/.test(h)?h:l}
              @input=${t=>s(t.target.value)} />
          </label>
          ${e?zt`<button type="button" class="link-btn" @click=${()=>s(void 0)}>Default</button>`:Ht}
        </div>
      </div>`}_numberSlider(t,e,o,s,l,h,d=""){const p=e??0;if(this._ha)return this._sel(t,{number:{min:o,max:s,step:l,mode:"slider",...d.trim()?{unit_of_measurement:d.trim()}:{}}},p,t=>{const e=Number(t);Number.isNaN(e)||h(Math.min(s,Math.max(o,e)))});return zt`
      <div class="field field--row">
        <label>${t}</label>
        <div class="slider-wrap">
          <input type="range" class="slider" min=${o} max=${s} step=${l} .value=${String(p)}
            @input=${t=>h(Number(t.target.value))} />
          <span class="slider-val-wrap">
            <input type="number" class="slider-val-input" min=${o} max=${s} step=${l}
              .value=${String(p)}
              @change=${t=>(t=>{const e=Number(t);Number.isNaN(e)||h(Math.min(s,Math.max(o,e)))})(t.target.value)}
              @keydown=${t=>{"Enter"===t.key&&t.target.blur()}} />
            ${d?zt`<span class="slider-val-suffix">${d}</span>`:Ht}
          </span>
        </div>
      </div>`}_numberBox(t,e,o,s={}){return this._ha?this._sel(t,{number:{mode:"box",step:1,...void 0!==s.min?{min:s.min}:{},...void 0!==s.max?{max:s.max}:{}}},e,t=>{const e="number"==typeof t?t:parseInt(String(t??""));o(Number.isNaN(e)?void 0:e)},{placeholder:s.placeholder}):zt`
      <div class="field field--row">
        <label>${t}</label>
        <input class="text-input text-input--sm" type="number" min=${s.min??""} max=${s.max??""}
          .value=${String(e??"")} placeholder=${s.placeholder??""}
          @change=${t=>{const e=parseInt(t.target.value);o(isNaN(e)?void 0:e)}} />
      </div>`}_selectField(t,e,o,s){return this._ha?this._sel(t,{select:{mode:"dropdown",options:o}},e,t=>{null!=t&&s(t)},{required:!0}):zt`
      <div class="field field--row">
        <label>${t}</label>
        <select class="select-input" @change=${t=>s(t.target.value)}>
          ${o.map(t=>zt`<option value=${t.value} ?selected=${t.value===e}>${t.label}</option>`)}
        </select>
      </div>`}_segmented(t,e,o,s){return zt`
      <div class="field">
        <span class="field-label">${t}</span>
        <div class="segmented" role="radiogroup" aria-label=${t}>
          ${o.map(t=>zt`<button type="button" role="radio" aria-checked=${t.value===e?"true":"false"}
              class="seg ${t.value===e?"seg--on":""}" @click=${()=>{t.value!==e&&s(t.value)}}>
              ${t.icon?zt`<ha-icon icon=${t.icon}></ha-icon>`:Ht}<span>${t.label}</span></button>`)}
        </div>
      </div>`}_optionSelectFromList(t,e,o,s){return this._ha?this._sel(t,{select:{mode:"dropdown",options:[{value:"",label:"— none —"},...e.map(t=>({value:t,label:t}))]}},o??"",t=>s(t??"")):zt`
      <div class="field field--row">
        <label>${t}</label>
        <select class="select-input"
          @change=${t=>s(t.target.value)}>
          <option value="">— none —</option>
          ${e.map(t=>zt`<option value=${t} ?selected=${t===o}>${t}</option>`)}
        </select>
      </div>`}_optionSelect(t,e,o,s){const l=e?this.hass.states[e]?.attributes.options??[]:[];return l.length?this._optionSelectFromList(t,l,o,s):this._textField(t,o,s,"e.g. balanced")}_iconPickerField(t,e,o="Icon"){return this._ha?this._sel(o,{icon:{}},t??"",t=>e(t??"")):zt`
      <div class="field">
        <label>${o}</label>
        <ha-icon-picker .value=${t??"mdi:square"}
          @value-changed=${t=>e(t.detail.value)}
        ></ha-icon-picker>
      </div>`}_areaPicker(t,e,o){if(this._ha)return this._sel(t,{area:{}},e??"",t=>o(t??""));const s=Object.values(this.hass?.areas??{});return s.length?zt`
      <div class="field field--row">
        <label>${t}</label>
        <select class="select-input"
          @change=${t=>o(t.target.value)}>
          <option value="">— not mapped —</option>
          ${[...s].sort((t,e)=>t.name.localeCompare(e.name)).map(t=>zt`<option value=${t.area_id} ?selected=${t.area_id===e}>${t.name}</option>`)}
        </select>
      </div>`:this._textField(t,e,o,"e.g. living_room")}_toggle(t,e,o){return this._ha?this._sel(t,{boolean:{}},e,t=>o(!!t)):zt`
      <div class="field field--row">
        <label>${t}</label>
        <label class="toggle-wrap">
          <input type="checkbox" class="toggle-input" .checked=${e}
            @change=${t=>o(t.target.checked)} />
          <span class="toggle-track"></span>
        </label>
      </div>`}_hint(t,e){if(!e)return zt`<p class="hint">${t}</p>`;const o="string"==typeof t?t:String(this._hintSeq++),s=this._hintsOpen.has(o);return zt`<p class="hint">${t}
      <button type="button" class="hint-more" aria-expanded=${s?"true":"false"} aria-label="More"
        @click=${()=>{const t=new Set(this._hintsOpen);s?t.delete(o):t.add(o),this._hintsOpen=t}}>
        <ha-icon icon=${s?"mdi:chevron-up":"mdi:information-outline"}></ha-icon></button>
      ${s?zt`<span class="hint-long">${e}</span>`:Ht}</p>`}_panel(t,e,o,s,l){return this._ha&&customElements.get("ha-expansion-panel")?zt`<ha-expansion-panel outlined class="panel" header=${t} secondary=${e??""}
          .expanded=${o}
          @expanded-will-change=${t=>{t.target===t.currentTarget&&s(!!t.detail?.expanded)}}
          @expanded-changed=${t=>{t.target===t.currentTarget&&!!t.detail?.expanded!==o&&s(!!t.detail?.expanded)}}>
        ${o?zt`<div class="panel-body">${l()}</div>`:Ht}
      </ha-expansion-panel>`:zt`
      <div class="collapsible">
        <div class="collapsible-header" @click=${()=>s(!o)}>
          <span class="collapsible-title">${t}</span>
          ${e?zt`<span class="badge">${e}</span>`:Ht}
          <ha-icon icon=${o?"mdi:chevron-up":"mdi:chevron-down"} class="acc-chevron"></ha-icon>
        </div>
        ${o?zt`<div class="collapsible-body">${l()}</div>`:Ht}
      </div>`}_rowMenu(t,e,o,s){const l=this._menu===t,h=this._confirm===t;return zt`
      <span class="menu-wrap" @click=${t=>t.stopPropagation()}>
        <button type="button" class="icon-btn" aria-label="More actions" aria-haspopup="menu" aria-expanded=${l?"true":"false"}
          @click=${()=>{this._menu=l?null:t,this._confirm=null}}>
          <ha-icon icon="mdi:dots-vertical"></ha-icon>
        </button>
        ${l?zt`
          <div class="menu" role="menu">
            ${h?zt`
              <div class="menu-confirm">Delete ${e}?</div>
              <div class="menu-confirm-row">
                <button type="button" class="menu-btn" @click=${()=>{this._menu=null,this._confirm=null}}>Cancel</button>
                <button type="button" class="menu-btn menu-btn--danger"
                  @click=${()=>{this._menu=null,this._confirm=null,s?.()}}>Delete</button>
              </div>`:zt`
              ${o.map(t=>zt`<button type="button" role="menuitem" class="menu-item" ?disabled=${!!t.disabled}
                  @click=${()=>{this._menu=null,t.action()}}>
                  <ha-icon icon=${t.icon}></ha-icon><span>${t.label}</span></button>`)}
              ${s?zt`<button type="button" role="menuitem" class="menu-item menu-item--danger"
                  @click=${()=>{this._confirm=t}}>
                  <ha-icon icon="mdi:delete-outline"></ha-icon><span>Delete</span></button>`:Ht}`}
          </div>`:Ht}
      </span>`}_renderVacuumsTab(){return zt`
      <div class="tab-body">
        ${0===this._config.vacuums.length?this._hint("No vacuums yet. Add one below."):this._config.vacuums.map((t,e)=>this._renderVacuumAccordion(t,e))}
        <button class="btn btn--add" @click=${()=>this._addVacuum()}>
          <ha-icon icon="mdi:plus"></ha-icon> Add vacuum
        </button>
      </div>`}_roleLabel(t){return"dry"===t?"Dry":"wet"===t?"Wet":"both"===t?"Dry + wet":"Auto role"}_renderVacuumAccordion(t,e){const o=this._resolveColor(t.color,oe[e%oe.length]),s=this._openVac===e,l=this._config.vacuums.length-1,h=t.name||t.entity||"Unnamed vacuum";return zt`
      <div class="acc-row ${s?"acc-row--open":""}">
        <div class="acc-header" role="button" tabindex="0" aria-expanded=${s?"true":"false"}
          @click=${()=>this._toggleVac(e)}
          @keydown=${t=>{"Enter"!==t.key&&" "!==t.key||(t.preventDefault(),this._toggleVac(e))}}>
          <span class="acc-avatar" style=${Yt({borderColor:o})}>
            ${t.image?zt`<img src=${t.image} alt="" />`:zt`<ha-icon icon="mdi:robot-vacuum" style=${Yt({color:o})}></ha-icon>`}
          </span>
          <div class="acc-info">
            <span class="acc-name"><span class="acc-dot" style=${Yt({background:o})}></span>${h}</span>
            <span class="acc-sub">${this._roleLabel(t.clean_type)} · ${t.entity||"no entity"}</span>
          </div>
          ${this._rowMenu("vac-"+e,h,[{label:"Move up",icon:"mdi:arrow-up",action:()=>this._moveVacuum(e,-1),disabled:0===e},{label:"Move down",icon:"mdi:arrow-down",action:()=>this._moveVacuum(e,1),disabled:e===l}],()=>this._deleteVacuum(e))}
          <ha-icon icon=${s?"mdi:chevron-up":"mdi:chevron-down"} class="acc-chevron"></ha-icon>
        </div>

        ${s?zt`
          <div class="acc-body">
            ${this._entityPicker("Vacuum entity",t.entity,["vacuum"],t=>this._setVacuum(e,{entity:t}),!0)}
            ${this._textField("Display name",t.name,t=>this._setVacuum(e,{name:t}),"e.g. S8")}
            ${this._textField("Image path",t.image,t=>this._setVacuum(e,{image:t}),"/local/...")}
            ${this._colorField("Colour",t.color?this._resolveColor(t.color,"green"):void 0,oe.map(t=>({hex:t})),t=>this._setVacuum(e,{color:t||void 0}),oe[e%oe.length])}
            ${this._segmented("Role",t.clean_type??"auto",[{value:"auto",label:"Auto"},{value:"dry",label:"Dry",icon:"mdi:broom"},{value:"wet",label:"Wet",icon:"mdi:water"},{value:"both",label:"Both",icon:"mdi:water-plus"}],t=>this._setVacuum(e,{clean_type:"auto"===t?void 0:t}))}
            ${this._hint("What this robot can do — not the Dry/Wet choice for a run.",zt`Controls which time estimate and which dry/wet layer it uses. "Auto" detects it
                from the clean action; "Both" follows the live water mode (needs the integration
                sensor). The run-time Dry/Wet/Both choice is made on the card.`)}

            ${this._renderSensorsSection(e,t)}
            ${this._renderMapSection(e,t)}
            ${this._renderCleanActionSection(e,t)}
            ${this._renderPresetsSection(e,t)}

            ${this._mergedEdit?zt`
              <p class="hint link" @click=${()=>{this._tab="global"}}>
                Rooms (shared) are edited once for all vacuums on the Global tab →
              </p>
            `:this._renderSplitRooms(e,t)}
          </div>
        `:Ht}
      </div>`}_renderSplitRooms(t,e){const o=e.rooms??[],s=!!this._intEntityFor(e);return zt`
      <div class="section-title">Rooms (${o.length})</div>
      ${s?this._hint("Rooms come from this vacuum's map automatically.",zt`Add a room here only to override its icon/display name, or to position it on a custom floorplan.`):this._hint("Add one entry per room this vacuum can clean.")}
      ${o.map((e,o)=>this._renderRoomAccordion(e,t,o))}
      <button class="btn btn--add" @click=${()=>this._addRoom(t)}>
        <ha-icon icon="mdi:plus"></ha-icon> Add room
      </button>`}_renderSensorsSection(t,e){const o=[e.status_entity,e.battery_entity,e.last_clean_entity,e.progress_entity,e.current_room_entity,e.error_entity].filter(Boolean).length;return this._panel("Sensors",o?`${o} set manually, the rest found automatically`:"Found automatically on the vacuum's device",this._openSensors.has(t),e=>this._toggleSensors(t,e),()=>zt`
        ${this._hint("Leave blank to use the vacuum's own sensors.")}
        ${this._entityPicker("Status",e.status_entity,["sensor"],e=>this._setVacuum(t,{status_entity:e||void 0}))}
        ${this._entityPicker("Battery",e.battery_entity,["sensor"],e=>this._setVacuum(t,{battery_entity:e||void 0}))}
        ${this._entityPicker("Last clean end",e.last_clean_entity,["sensor"],e=>this._setVacuum(t,{last_clean_entity:e||void 0}))}
        ${this._entityPicker("Progress",e.progress_entity,["sensor"],e=>this._setVacuum(t,{progress_entity:e||void 0}))}
        ${this._entityPicker("Current room",e.current_room_entity,["sensor"],e=>this._setVacuum(t,{current_room_entity:e||void 0}))}
        ${this._entityPicker("Error",e.error_entity,["sensor"],e=>this._setVacuum(t,{error_entity:e||void 0}))}`)}_renderMapSection(t,e){const o=this._mapEntityFor(e),s=e.map?.entity?e.map.entity:o?`Found automatically: ${o}`:"No map image found";return this._panel("Map & floorplan",s,this._openMap.has(t),e=>this._toggleMap(t,e),()=>zt`
        ${this._entityPicker("Map image entity (override)",e.map?.entity,["image"],e=>this._setMap(t,{entity:e}))}
        ${this._entityPicker("AnyVac sensor (override)",e.integration_entity,["sensor"],e=>this._setVacuum(t,{integration_entity:e||void 0}))}
        ${this._hint("Leave both blank to find them on the vacuum's device.")}
        ${this._mergedEdit?this._hint(zt`Base layer and stage height are set once for the whole card —
            <strong>Global tab → Floorplan</strong>.`):zt`
          ${this._selectField("Base layer",e.base??"map",[{value:"map",label:"Live map only"},{value:"image",label:"Custom floorplan image"},{value:"combined",label:"Floorplan + map overlay"}],e=>this._setVacuum(t,{base:e}))}
          ${this._numberSlider("Stage height (0 = auto)",e.base_height??0,0,1200,10,e=>this._setVacuum(t,{base_height:e>0?e:void 0})," px")}
          ${"image"===e.base||"combined"===e.base?this._renderFloorplanTools(t,e):Ht}
        `}`)}_renderFloorplanTools(t,e){const o=this._currentImageBase(t),s=o?.crop_box,l=s&&"entity"in s&&s.entity===e.entity?s:void 0,h=this._mapEntityFor(e),d=this._hvSwap,p=this._guideExportResult&&this._guideExportResult.entity===e.entity?this._guideExportResult:null;return zt`
      <div class="sub-section">
        <div class="sub-title">Floorplan image</div>
        ${h?zt`
          <button class="btn btn--sm" ?disabled=${this._floorplanSnapshotBusy}
            @click=${()=>this._snapshotFloorplan(e)}>
            <ha-icon icon="mdi:camera"></ha-icon>
            ${this._floorplanSnapshotBusy?"Snapshotting…":"Use this vacuum's current map as floorplan"}
          </button>
          ${this._floorplanSnapshotError?zt`<p class="hint hint--error">${this._floorplanSnapshotError}</p>`:Ht}
        `:this._hint("No map image entity found for this vacuum — set one above.")}

        ${this._textField("Image src (URL)",o?.src,e=>this._setEditedImageBase({src:e},t),"/local/anyvac/flat.svg")}
        ${o?.src?zt`
          <img class="fp-preview" src=${o.src} alt="Floorplan preview"
            @load=${t=>{const e=t.target;e.naturalWidth&&e.naturalHeight&&(this._pvNat?.w!==e.naturalWidth||this._pvNat?.h!==e.naturalHeight)&&(this._pvNat={w:e.naturalWidth,h:e.naturalHeight},this._pvAR=e.naturalHeight>0?e.naturalWidth/e.naturalHeight:0)}} />
        `:Ht}
        ${this._toggle("Swap ↔/↕ slider labels",d,t=>{this._hvSwap=t})}
        ${this._numberSlider("Rotation",o?.rotation??0,-180,180,1,e=>this._setEditedImageBase({rotation:e},t),"°")}
        ${this._numberSlider("Scale",o?.scale??100,10,400,1,e=>this._setEditedImageBase({scale:e},t),"%")}
        ${this._numberSlider(d?"Offset ↕":"Offset ↔",o?.offset_x??0,-100,100,.5,e=>this._setEditedImageBase({offset_x:e},t),"%")}
        ${this._numberSlider(d?"Offset ↔":"Offset ↕",o?.offset_y??0,-100,100,.5,e=>this._setEditedImageBase({offset_y:e},t),"%")}

        ${h?zt`
          <div class="sub-title">Guide layers</div>
          ${this._hint("Room/path guides for tracing furniture in an image editor.",zt`Drawn in the same pixel canvas as the floorplan snapshot above, as transparent PNGs.`)}
          <button class="btn btn--sm" ?disabled=${this._guideExportBusy}
            @click=${()=>this._exportMapGuide(e,t)}>
            <ha-icon icon="mdi:layers-outline"></ha-icon>
            ${this._guideExportBusy?"Exporting…":"Export guide layers"}
          </button>
          ${this._guideExportError?zt`<p class="hint hint--error">${this._guideExportError}</p>`:Ht}
          ${p?zt`
            <p class="hint">Exported (${p.size.w}×${p.size.h}px):
              ${Object.keys(p.paths).map(t=>zt`<code>${t}</code> `)}
              — trace furniture over them, then set the traced file as the Image src above.</p>
            ${p.crop?zt`
              <button type="button" class="link-btn"
                @click=${()=>this._setEditedImageBase({crop_box:{entity:e.entity,...p.crop}},t)}>
                Use this crop for the floorplan
              </button>
            `:Ht}
          `:Ht}
        `:Ht}

        ${l?zt`
          <div class="sub-title">Crop box</div>
          <p class="hint">Cut from (${l.x0}, ${l.y0}) – (${l.x1}, ${l.y1})px of this vacuum's map.
            <button type="button" class="link-btn" @click=${()=>this._setEditedImageBase({crop_box:void 0},t)}>Clear</button>
          </p>
          ${!this._pvNat||Math.round(this._pvNat.w)===Math.round(l.x1-l.x0)&&Math.round(this._pvNat.h)===Math.round(l.y1-l.y0)?Ht:zt`<p class="hint hint--error">The saved image (${this._pvNat.w}×${this._pvNat.h}px) doesn't
                match this crop box (${Math.round(l.x1-l.x0)}×${Math.round(l.y1-l.y0)}px) —
                re-snapshot or re-export the guide layers above.</p>`}
          <button class="btn btn--sm" @click=${()=>this._placeRoomsFromCropBox()}>
            Place rooms from crop box
          </button>
          ${this._placeRoomsResult?this._hint(`Placed ${this._placeRoomsResult.placed}, added ${this._placeRoomsResult.added} room(s).`):Ht}
        `:Ht}
      </div>`}_renderPresetsSection(t,e){const o=e.presets??[],s=this.hass.states[e.entity]?.attributes.fan_speed_list??[],l=e.clean_action,h=l?.mop_mode_entity,d=l?.mop_intensity_entity;return this._panel("Setting presets",o.length?`${o.length} preset${o.length>1?"s":""}`:"None — the clean action's defaults are used",this._openPresets.has(t),e=>this._togglePresets(t,e),()=>zt`
        ${this._hint("Named “how” bundles picked on the robot sheet.",zt`Mop entities come from Clean action above; presets only set the values. With fewer
            than 2 presets no chips are shown and the Clean action's defaults are used.`)}
        ${o.map((e,o)=>zt`
          <div class="sub-section">
            <div class="sub-title sub-title--row">
              <span>${e.label||e.id}</span>
              ${this._rowMenu(`preset-${t}-${o}`,e.label||e.id,[],()=>this._deletePreset(t,o))}
            </div>
            ${this._textField("Label",e.label,e=>this._setPreset(t,o,{label:e}),"e.g. Dry")}
            ${this._iconPickerField(e.icon,e=>this._setPreset(t,o,{icon:e||void 0}))}
            ${s.length?this._optionSelectFromList("Suction",s,e.suction_level,e=>this._setPreset(t,o,{suction_level:e||void 0})):this._textField("Suction",e.suction_level,e=>this._setPreset(t,o,{suction_level:e||void 0}),"e.g. max")}
            ${h?this._optionSelect("Mop mode",h,e.mop_mode,e=>this._setPreset(t,o,{mop_mode:e||void 0})):Ht}
            ${d?this._optionSelect("Mop intensity",d,e.mop_intensity,e=>this._setPreset(t,o,{mop_intensity:e||void 0})):Ht}
            ${this._numberSlider("Repeat passes",e.repeat??1,1,3,1,e=>this._setPreset(t,o,{repeat:e}))}
          </div>
        `)}
        <button class="btn btn--add" @click=${()=>this._addPreset(t)}>
          <ha-icon icon="mdi:plus"></ha-icon> Add preset
        </button>`)}_actionSummary(t){return"script"===t.type?"Script"+(t.entity_id?": "+t.entity_id:""):"native-area"===t.type?"Native area (vacuum.clean_area)":"Native (segments)"}_renderCleanActionSection(t,e){const o=e.clean_action??{type:"native"};return this._panel("Clean action",this._actionSummary(o),this._openAction.has(t),e=>this._toggleAction(t,e),()=>this._renderCleanActionEditor(t,e))}_renderCleanActionEditor(t,e){const o=e.clean_action??{type:"native"};return zt`
      ${this._selectField("Strategy","native-auto"===o.type?"native":o.type,[{value:"native",label:"Native (vacuum.send_command + segment IDs)"},{value:"native-area",label:"Native area (vacuum.clean_area)"},{value:"script",label:"Custom script"}],e=>{if("script"===e)return void this._setVacuum(t,{clean_action:{type:"script",entity_id:""}});const o=this._config.vacuums[t]?.clean_action,s={};if(o&&"script"!==o.type)for(const t of["repeat","suction_level","mop_mode_entity","mop_mode","mop_intensity_entity","mop_intensity"]){const e=o[t];void 0!==e&&(s[t]=e)}this._setVacuum(t,{clean_action:{type:e,...s}})})}
      ${"script"===o.type?this._renderScriptAction(t,o):this._renderNativeOptions(t,o)}`}_renderNativeOptions(t,e){const o="native-area"===e.type?this._hint(zt`Used without the integration only — with it, START sends <code>anyvac.clean</code>.`,zt`Calls <code>vacuum.clean_area</code>. No repeat; repeat lives server-side in <code>anyvac.clean</code>.`):this._hint(zt`Used without the integration only — with it, START sends <code>anyvac.clean</code>.`,zt`<code>anyvac.clean</code> resolves segments server-side.${"native-auto"===e.type?zt` This vacuum still carries the retired value <code>native-auto</code>; it behaves exactly
                like Native and is rewritten the next time you pick a strategy.`:Ht}`),s=this.hass.states[this._config.vacuums[t]?.entity]?.attributes.fan_speed_list??[];return zt`
      <div class="sub-section">
        ${o}
        ${this._numberSlider("Repeat passes",e.repeat??1,1,3,1,e=>this._setCleanAction(t,{repeat:e}))}
        ${s.length?this._optionSelectFromList("Suction (optional)",s,e.suction_level,e=>this._setCleanAction(t,{suction_level:e||void 0})):this._textField("Suction (optional)",e.suction_level,e=>this._setCleanAction(t,{suction_level:e||void 0}),"e.g. balanced")}
        ${this._entityPicker("Mop mode entity (optional)",e.mop_mode_entity,["select"],e=>this._setCleanAction(t,{mop_mode_entity:e||void 0}))}
        ${e.mop_mode_entity?this._optionSelect("Mop mode",e.mop_mode_entity,e.mop_mode,e=>this._setCleanAction(t,{mop_mode:e||void 0})):Ht}
        ${this._entityPicker("Mop intensity entity (optional)",e.mop_intensity_entity,["select"],e=>this._setCleanAction(t,{mop_intensity_entity:e||void 0}))}
        ${e.mop_intensity_entity?this._optionSelect("Mop intensity",e.mop_intensity_entity,e.mop_intensity,e=>this._setCleanAction(t,{mop_intensity:e||void 0})):Ht}
      </div>`}_renderScriptAction(t,e){const o=e.variables??{},s=Object.entries(o);return zt`
      <div class="sub-section">
        ${this._entityPicker("Script entity",e.entity_id,["script"],e=>this._setCleanAction(t,{entity_id:e}))}
        ${this._hint("Variables passed to the script.",zt`Tokens: {{ entity }}, {{ selected_segments }}, {{ selected_room_keys }}, {{ selected_area_ids }}`)}
        ${s.map(([e,l],h)=>zt`
          <div class="var-row">
            ${this._textField("Name",e,e=>{const o=Object.fromEntries(s.map(([t,o],s)=>[s===h?e:t,o]));this._setCleanAction(t,{variables:o})},"name")}
            <span class="var-sep">&#8594;</span>
            ${this._textField("Value",l,s=>{this._setCleanAction(t,{variables:{...o,[e]:s}})},"{{ entity }}")}
            <button class="icon-btn icon-btn--sm" aria-label="Remove variable"
              @click=${()=>{const e=Object.fromEntries(s.filter((t,e)=>e!==h));this._setCleanAction(t,{variables:e})}}>
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          </div>`)}
        <button class="btn btn--add btn--sm"
          @click=${()=>this._setCleanAction(t,{variables:{...o,"":""}})}>
          <ha-icon icon="mdi:plus"></ha-icon> Add variable
        </button>
      </div>`}_renderRoomMetaFields(t,e){return zt`
      ${this._iconPickerField(t.icon,t=>e({icon:t||void 0}))}
      ${this._selectField("Icon anchor",t.icon_anchor??"c",[{value:"none",label:"Hidden"},{value:"tl",label:"Top-left"},{value:"t",label:"Top"},{value:"tr",label:"Top-right"},{value:"l",label:"Left"},{value:"c",label:"Centre (default)"},{value:"r",label:"Right"},{value:"bl",label:"Bottom-left"},{value:"b",label:"Bottom"},{value:"br",label:"Bottom-right"}],t=>e({icon_anchor:"c"===t?void 0:t}))}
      ${this._numberSlider("Est. dry clean time",t.clean_time_dry??0,0,120,1,t=>e({clean_time_dry:t>0?t:void 0})," min")}
      ${this._numberSlider("Est. wet clean time",t.clean_time_wet??0,0,120,1,t=>e({clean_time_wet:t>0?t:void 0})," min")}
      ${this._hint("Leave at 0 to use the integration's learned estimate.",zt`Used for this room's remaining time until the AnyVac integration has learned its own
          (or the legacy fallback below, for setups without it).`)}`}_renderRoomBackendFields(t,e,o,s){return e&&this._intEntityFor(e)?this._hint("Segments, timing and history are handled by the AnyVac integration."):"native-area"===e?.clean_action?.type?zt`
        <div class="field field--row">
          <label>Effective area</label>
          <strong class="value">${t.area_id??this._config.area_mappings?.[t.key]??t.key}</strong>
        </div>
        ${s}`:zt`
      ${this._numberBox("Segment ID",t.segment_id,t=>o({segment_id:t}),{min:0,placeholder:"e.g. 16"})}
      ${this._hint(zt`Find IDs: Developer Tools → Actions → <code>roborock.get_maps</code>`)}
      ${this._numberSlider("Est. clean time (fallback)",t.clean_time_mins??0,0,120,1,t=>o({clean_time_mins:t>0?t:void 0})," min")}
      ${this._entityPicker("Clean time fallback (input_number, legacy)",t.clean_time_entity,["input_number"],t=>o({clean_time_entity:t||void 0}))}
      ${this._entityPicker("Last clean fallback (input_datetime, legacy)",t.last_clean_entity,["input_datetime"],t=>o({last_clean_entity:t||void 0}))}
      ${this._hint("Legacy read-only fallbacks for setups without the integration.")}`}_roomRow(t,e,o,s,l,h,d,p,u){const m=this._dragRoom&&this._dragRoom.vac===e&&this._dragRoom.idx!==o;return zt`
      <div class="room-acc ${m?"room-acc--drop":""}"
        @dragover=${t=>{this._dragRoom&&this._dragRoom.vac===e&&t.preventDefault()}}
        @drop=${t=>{t.preventDefault(),this._dragRoom&&this._dragRoom.vac===e&&d(this._dragRoom.idx),this._dragRoom=null}}>
        <div class="room-acc-header" @click=${l}>
          <ha-icon class="drag" icon="mdi:drag-horizontal-variant" title="Drag to reorder"
            draggable="true"
            @click=${t=>t.stopPropagation()}
            @dragstart=${t=>{this._dragRoom={vac:e,idx:o},t.dataTransfer&&(t.dataTransfer.effectAllowed="move")}}
            @dragend=${()=>{this._dragRoom=null}}></ha-icon>
          <ha-icon class="room-acc-icon" icon=${t.icon||"mdi:square"}></ha-icon>
          <div class="room-acc-info">
            <span class="room-acc-name">${t.name||t.key||"Unnamed room"}</span>
            ${p}
          </div>
          ${this._rowMenu(`room-${e}-${o}`,t.name||t.key||"this room",[],h)}
          <ha-icon icon=${s?"mdi:chevron-up":"mdi:chevron-down"} class="acc-chevron"></ha-icon>
        </div>
        ${s?zt`<div class="room-acc-body">${u()}</div>`:Ht}
      </div>`}_renderRoomAccordion(t,e,o){const s=(this._openRoom.get(e)??null)===o,l=this._config.vacuums[e],set=t=>this._setRoom(e,o,t);return this._roomRow(t,e,o,s,()=>this._toggleRoom(e,o),()=>this._deleteRoom(e,o),t=>this._moveRoom(e,t,o),void 0===t.segment_id||this._intEntityFor(l)?Ht:zt`<span class="room-acc-meta">seg ${t.segment_id}</span>`,()=>zt`
        ${this._textField("Key (unique ID)",t.key,t=>set({key:t}),"e.g. bedroom")}
        ${this._hint("Keep it identical to the room's name in the Roborock app.","The AnyVac integration matches rooms by this name (auto-seating, live positions, room pinning).")}
        ${this._textField("Display name",t.name,t=>set({name:t}),"e.g. Bedroom")}
        ${this._renderRoomMetaFields(t,set)}
        ${this._renderRoomBackendFields(t,l,set,zt`<p class="hint link" @click=${()=>{this._tab="global"}}>Set in Global tab → Area mappings →</p>`)}
        ${this._hint("Position and size are set in the Visual editor's Rooms tool.","The cleaning sequence is shared and backend-owned — reorder it on the Global tab in merged mode, or in the Roborock app.")}`)}_renderMergedRoomAccordion(t,e){const o=(this._openRoom.get(-1)??null)===e,set=t=>this._setEditedRoom(e,t);return this._roomRow(t,-1,e,o,()=>this._toggleRoom(-1,e),()=>this._deleteEditedRoom(e),t=>this._moveMergedRoom(t,e),Ht,()=>zt`
        ${this._textField("Key (unique ID)",t.key,t=>set({key:t}),"e.g. bedroom")}
        ${this._hint("Keep it identical to the room's name in the Roborock app.","The AnyVac integration matches rooms by this name (auto-seating, live positions, room pinning).")}
        ${this._textField("Display name",t.name,t=>set({name:t}),"e.g. Bedroom")}
        ${this._renderRoomMetaFields(t,set)}
        ${this._renderRoomBackendFields(t,this._config.vacuums[0],set,this._hint("Set in Area mappings, further down this tab."))}
        ${this._hint("Position and size are set in the Visual editor's Rooms tool.")}`)}_moveMergedRoom(t,e){if(t===e)return;const o=[...this._config.rooms??[]];if(t<0||t>=o.length||e<0||e>=o.length)return;const[s]=o.splice(t,1);o.splice(e,0,s),this._setConfig({rooms:o})}_renderSequenceSection(){const t=this._config.vacuums.find(t=>this._intEntityFor(t));if(!t)return Ht;const e=this._config.rooms??[];if(!e.length)return Ht;const o=this._roomSequence(t),s=this._roomsInSequenceOrder(e,o);return zt`
      <div class="section-title">Cleaning sequence</div>
      ${this._hint("Shared by every vacuum — drag to reorder.","Backend-owned; the Roborock app's room order is the same list.")}
      <div class="seq-list">
        ${s.map((e,o)=>zt`
          <div class="seq-row ${null!==this._dragSeq&&this._dragSeq!==o?"seq-row--drop":""}"
            @dragover=${t=>{null!==this._dragSeq&&t.preventDefault()}}
            @drop=${e=>{e.preventDefault(),null!==this._dragSeq&&this._moveSequence(t,s,this._dragSeq,o),this._dragSeq=null}}>
            <ha-icon class="drag" icon="mdi:drag-horizontal-variant" title="Drag to reorder"
              draggable="true"
              @dragstart=${t=>{this._dragSeq=o,t.dataTransfer&&(t.dataTransfer.effectAllowed="move")}}
              @dragend=${()=>{this._dragSeq=null}}></ha-icon>
            <ha-icon class="seq-icon" icon=${e.icon||"mdi:square"}></ha-icon>
            <span class="seq-name">${e.name||e.key}</span>
            <span class="seq-pos">${o+1}</span>
          </div>
        `)}
      </div>`}_dbgRow(t,e){return zt`<div class="field field--row">
      <label>${t}</label>
      <span class="mono">${null==e||""===e?"—":String(e)}</span>
    </div>`}_renderDebugTab(){const fmt=t=>{try{return JSON.stringify(t,null,1)}catch{return String(t)}};return zt`
      <div class="tab-body">
        ${this._hint("Live values from Home Assistant, read-only.")}
        ${this._toggle("Room progress gauges on map",this._config.debug_room_progress??!1,t=>this._setConfig({debug_room_progress:t||void 0}))}
        ${this._hint("A small % gauge on each room.","Spatial coverage — approximate: the room box includes furniture, so it plateaus below 100%.")}
        ${this._toggle("Dense portrait room list",this._config.debug_dense_dock??!1,t=>this._setConfig({debug_dense_dock:t||void 0}))}
        ${this._hint("The old portrait room list instead of the rail.","Name, age, pin and assigned vacuum per room. Independent of the gauges toggle above.")}
        ${this._config.vacuums.map(t=>{const e=this._intEntityFor(t),o=e?this.hass.states[e]:void 0,s=o?.attributes??{},l=s.mop_signal??{};return zt`
            <div class="section-title">${t.name??t.entity}</div>
            <div class="sub-section">
              ${e?o?zt`
                    ${this._dbgRow("sensor",`${e} = ${o.state}`)}
                    ${this._dbgRow("schema_version",s.schema_version)}
                    ${this._dbgRow("pipeline_ok",s.pipeline_ok)}
                    ${this._dbgRow("clean_type",s.clean_type)}
                    ${this._dbgRow("in_cleaning",s.in_cleaning)}
                    ${this._dbgRow("vacuum_room_name",s.vacuum_room_name)}
                    ${this._dbgRow("water_mode_name",l.water_mode_name)}
                    ${this._dbgRow("fan_speed_name",l.fan_speed_name)}
                    ${this._dbgRow("path pts (decimated)",Array.isArray(s.path)?s.path.length:"—")}
                    ${this._dbgRow("path pts (raw)",s.path_points)}
                    ${this._dbgRow("mop pts (raw)",s.mop_path_points)}
                    <div class="sub-title">calib — last single-room decision</div>
                    <pre class="pre">${fmt(s.calib_debug)}</pre>
                    <div class="sub-title">rooms_estimate (per vacuum)</div>
                    <pre class="pre">${fmt(s.rooms_estimate)}</pre>
                    <div class="sub-title">rooms_last_cleaned (cross-vacuum)</div>
                    <pre class="pre">${fmt(s.rooms_last_cleaned)}</pre>
                    <div class="sub-title">rooms_progress — spatial % + time ratio (live)</div>
                    <pre class="pre">${fmt(s.rooms_progress)}</pre>
                    <div class="sub-title">job_progress (live)</div>
                    <pre class="pre">${fmt(s.job_progress)}</pre>
                    <div class="sub-title">rooms (geometry — for spatial coverage)</div>
                    <pre class="pre">${fmt((s.rooms??[]).map(t=>({name:t.name,bbox_px:t.bbox_px,x0:t.x0,y0:t.y0,x1:t.x1,y1:t.y1})))}</pre>
                    <details><summary class="hint">Raw attributes</summary><pre class="pre">${fmt(s)}</pre></details>
                  `:this._hint(zt`Sensor <code>${e}</code> not found.`):this._hint("No AnyVac integration sensor found — backend values unavailable.")}
            </div>`})}
      </div>
    `}_renderGlobalTab(){const t=this._config.global_actions??[],e=this._config.room_thresholds??Se;return zt`
      <div class="tab-body">

        <div class="section-title">Appearance</div>
        ${this._selectField("Theme",this._config.theme??se,[{value:"dark",label:"Dark"},{value:"light",label:"Light"},{value:"auto",label:"Auto — follow the system"},{value:"legacy",label:"Legacy — the pre-1.2.0 look"}],t=>this._setConfig({theme:t===se?void 0:t}))}
        ${this._colorField("Accent colour",this._config.accent,re,t=>this._setConfig({accent:t||void 0}),"#6FBF73")}
        ${this._hint("START, room selection and focus rings.","Status colours are deliberately left alone — their saturation carries meaning (cleaning / mopping / error).")}
        ${this._toggle("Calm resting state",!1!==this._config.calm_state,t=>this._setConfig({calm_state:!!t&&void 0}))}
        ${this._hint("Idle: the leftover trace and secondary numbers step back.","Nothing is hidden or disabled — it's purely de-emphasis.")}
        ${this._toggle("Reduce motion",!!this._config.reduce_motion,t=>this._setConfig({reduce_motion:!!t||void 0}))}
        ${this._hint("Turns off animations on the map and the start sequence.",'The operating system\'s own "reduce motion" setting already does this — this is for switching them off without changing that.')}
        ${this._numberSlider("Robot marker glide",this._config.marker_glide_s??1.5,0,25,.5,t=>this._setConfig({marker_glide_s:1.5===t?void 0:t})," s")}
        ${this._hint("How long the robot takes to drive its new trail after each update. 0 = jump.","Positions arrive about every 30 s. Short (1–2 s) replays the new stretch quickly; long (up to 25 s) keeps the robot moving almost all the time, but it then trails reality by that long.")}
        ${this._numberSlider("Care warning at",this._config.care_warn_pct??10,0,50,1,t=>this._setConfig({care_warn_pct:10===t?void 0:t})," %")}
        ${this._hint("A brush, filter or sensor at or below this marks its robot with a dot.","The dot sits on the robot's avatar and on the Care tab of its sheet. Dock errors and tank warnings mark the Dock tab regardless of this value.")}

        <div class="section-title">Layout</div>
        ${this._toggle("Fit card to available screen space",!!this._config.layout,t=>this._setConfig({layout:t?this._config.layout??{}:void 0}))}
        ${this._hint("Recommended — portrait/landscape profiles sized to the screen.","Off keeps the older rendering that grows as tall as its content. Per-profile tuning (columns/rows, crop, orientation, topology) is YAML-only.")}
        ${this._config.layout?zt`
          ${this._toggle("Flip portrait map 180°",!0===this._config.layout.portrait?.crop?.flip,t=>this._setLayoutFlip("portrait",t))}
          ${this._toggle("Flip landscape map 180°",!0===this._config.layout.landscape?.crop?.flip,t=>this._setLayoutFlip("landscape",t))}
          ${this._hint("A saved default; the map toolbar's Flip is a quick, unsaved try-out.")}
        `:Ht}

        <div class="section-title">Controller</div>
        ${this._segmented("Mode",this._config.ui_mode??"auto",[{value:"auto",label:"Auto — one START"},{value:"manual",label:"Manual — per robot"}],t=>this._setConfig({ui_mode:t}))}

        ${this._mergedEdit?zt`
          <div class="section-title">Floorplan</div>
          ${this._textField("Image src (URL)",this._config.image_base?.src,t=>this._setConfig({image_base:{...this._config.image_base??{src:""},src:t}}),"/local/anyvac/flat.svg")}
          ${this._hint("Rotation, scale and room layout are set in the Visual editor.",this._config.image_base?.src?"This field is only for pointing at a new file (e.g. after snapshotting or tracing one externally).":"Set this once to bootstrap the shared floorplan — after that, the Visual editor's Snapshot buttons can replace it.")}
          ${this._numberSlider("Stage height (0 = auto)",this._config.base_height??0,0,1200,10,t=>this._setConfig({base_height:t>0?t:void 0})," px")}

          <div class="section-title">Rooms (shared)</div>
          ${this._config.vacuums.some(t=>this._intEntityFor(t))?this._hint("Rooms come from the integration automatically.","Add a room here only to override its icon/display name or clean-time estimates."):this._hint("One list for every vacuum — add one entry per room.")}
          ${(this._config.rooms??[]).map((t,e)=>this._renderMergedRoomAccordion(t,e))}
          <button class="btn btn--add" @click=${()=>this._addEditedRoom()}>
            <ha-icon icon="mdi:plus"></ha-icon> Add room
          </button>
          ${this._renderSequenceSection()}
        `:Ht}

        <div class="section-title">Global presets (Auto mode)</div>
        ${this._hint("Targeted whole-home cleans, e.g. “After dinner”.","The integration decides which robots and the order; you pick the scope and mode.")}
        ${(this._config.global_presets??[]).map((t,e)=>zt`
          <div class="sub-section">
            <div class="sub-title sub-title--row">
              <span>${t.label||t.id}</span>
              ${this._rowMenu("gp-"+e,t.label||t.id,[],()=>this._deleteGlobalPreset(e))}
            </div>
            ${this._textField("Label",t.label,t=>this._setGlobalPreset(e,{label:t}),"e.g. After dinner")}
            ${this._iconPickerField(t.icon,t=>this._setGlobalPreset(e,{icon:t||void 0}))}
            ${this._segmented("Scope","all"===t.scope?"all":"select",[{value:"all",label:"Whole home"},{value:"select",label:"Pick on map"}],t=>this._setGlobalPreset(e,{scope:t}))}
            ${this._segmented("Mode",t.mode??"dry",[{value:"dry",label:"Dry",icon:"mdi:broom"},{value:"wet",label:"Wet",icon:"mdi:water"},{value:"both",label:"Both",icon:"mdi:water-plus"}],t=>this._setGlobalPreset(e,{mode:t}))}
          </div>
        `)}
        <button class="btn btn--add" @click=${()=>this._addGlobalPreset()}>
          <ha-icon icon="mdi:plus"></ha-icon> Add global preset
        </button>

        <div class="section-title">Global actions</div>
        ${this._hint("Badges that run a script across all vacuums.")}
        ${t.map((t,e)=>this._renderGlobalAccordion(t,e))}
        <button class="btn btn--add" @click=${()=>this._addGlobal()}>
          <ha-icon icon="mdi:plus"></ha-icon> Add global action
        </button>

        <div class="section-title">Room appearance</div>
        ${this._toggle("Hide room icons",this._config.room_icon_hidden??!1,t=>this._setConfig({room_icon_hidden:t||void 0}))}
        ${this._numberSlider("Border (idle)",this._config.room_border_normal??2,0,12,1,t=>this._setConfig({room_border_normal:t}),"px")}
        ${this._numberSlider("Border (selected)",this._config.room_border_selected??4,0,12,1,t=>this._setConfig({room_border_selected:t}),"px")}

        <div class="section-title">Thresholds</div>
        ${this._hint("Room age colours — first match wins, beyond the last is red.")}
        ${e.map((t,o)=>zt`
          <div class="var-row threshold-row">
            <span class="threshold-label">≤</span>
            ${this._numberBox("Days",t.days,t=>{const s=e.map((e,s)=>s===o?{...e,days:t??e.days}:e);this._setConfig({room_thresholds:s})},{min:0,max:365})}
            <input type="color" class="threshold-color" aria-label="Colour" .value=${t.color}
              @input=${t=>{const s=t.target.value,l=e.map((t,e)=>e===o?{...t,color:s}:t);this._setConfig({room_thresholds:l})}} />
            <button class="icon-btn icon-btn--sm" aria-label="Remove threshold"
              @click=${()=>{const t=e.filter((t,e)=>e!==o);this._setConfig({room_thresholds:t.length?t:void 0})}}>
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          </div>`)}
        <div class="btn-row">
          <button class="btn btn--add btn--sm" @click=${()=>this._setConfig({room_thresholds:[...e,{days:14,color:"#ff4d4f"}]})}>
            <ha-icon icon="mdi:plus"></ha-icon> Add threshold
          </button>
          ${this._config.room_thresholds?zt`
            <button class="btn btn--sm" @click=${()=>this._setConfig({room_thresholds:void 0})}>
              Reset to defaults
            </button>
          `:Ht}
        </div>

        <div class="section-title">Notifications</div>
        ${this._hint("Built from the integration's events with ready-made blueprints.",zt`Settings → Automations → Create with blueprint: <strong>Clean finished</strong>
            (<code>anyvac_clean_finished</code>), <strong>Vacuum error</strong> (the Roborock error sensor)
            and <strong>Room overdue</strong> (hourly check against a day threshold).
            <code>anyvac_clean_started</code> and <code>anyvac_room_done</code> have no blueprint yet.`)}

        ${(()=>{const t=this._config.vacuums.some(t=>"native-area"===t.clean_action?.type);if(!t)return Ht;const e=[...new Set(this._config.vacuums.flatMap(t=>(t.rooms??[]).map(t=>t.key)).filter(Boolean))].sort(),o=this._config.area_mappings??{};return zt`
            <div class="section-title">Area mappings</div>
            ${this._hint("Room key → HA area, for the native-area strategy.","Used without the AnyVac integration only. Applies to all vacuums.")}
            ${0===e.length?this._hint("No rooms configured yet."):e.map(t=>this._areaPicker(t,o[t],e=>{const s={...o};e?s[t]=e:delete s[t],this._setConfig({area_mappings:Object.keys(s).length?s:void 0})}))}
          `})()}

      </div>`}_renderGlobalAccordion(t,e){const o=this._resolveColor(t.color,"orange"),s=this._openGlobal.has(e),l=t.action,h=t.watch_entities??[];return zt`
      <div class="acc-row ${s?"acc-row--open":""}">
        <div class="acc-header" role="button" tabindex="0" aria-expanded=${s?"true":"false"}
          @click=${()=>this._toggleGlobal(e)}
          @keydown=${t=>{"Enter"!==t.key&&" "!==t.key||(t.preventDefault(),this._toggleGlobal(e))}}>
          <span class="acc-avatar" style=${Yt({borderColor:o})}>
            ${t.image?zt`<img src=${t.image} alt="" />`:zt`<ha-icon icon="mdi:home-floor-a" style=${Yt({color:o})}></ha-icon>`}
          </span>
          <div class="acc-info">
            <span class="acc-name">${t.name||"Unnamed action"}</span>
            <span class="acc-sub">${"script"===l.type?l.entity_id:l.service}</span>
          </div>
          ${this._rowMenu("ga-"+e,t.name||"this action",[],()=>this._deleteGlobal(e))}
          <ha-icon icon=${s?"mdi:chevron-up":"mdi:chevron-down"} class="acc-chevron"></ha-icon>
        </div>
        ${s?zt`
          <div class="acc-body">
            ${this._textField("Display name",t.name,t=>this._setGlobal(e,{name:t}),"e.g. Whole flat")}
            ${this._textField("Image path",t.image,t=>this._setGlobal(e,{image:t||void 0}),"/local/...")}
            ${this._colorField("Colour",t.color?this._resolveColor(t.color,"orange"):void 0,oe.map(t=>({hex:t})),t=>this._setGlobal(e,{color:t||void 0}),"#faad14")}
            ${this._ha?this._sel("Watch entities (badge glows while any is cleaning)",{entity:{domain:"vacuum",multiple:!0}},h,t=>this._setGlobal(e,{watch_entities:(Array.isArray(t)?t:[]).filter(Boolean)})):zt`
                <div class="sub-title">Watch entities (badge glows while any is cleaning)</div>
                ${h.map((t,o)=>zt`
                  <div class="var-row">
                    ${this._entityPicker("Vacuum",t,["vacuum"],t=>{const s=[...h];s[o]=t,this._setGlobal(e,{watch_entities:s.filter(Boolean)})})}
                    <button class="icon-btn icon-btn--sm" aria-label="Remove"
                      @click=${()=>this._setGlobal(e,{watch_entities:h.filter((t,e)=>e!==o)})}>
                      <ha-icon icon="mdi:close"></ha-icon>
                    </button>
                  </div>`)}
                <button class="btn btn--add btn--sm"
                  @click=${()=>this._setGlobal(e,{watch_entities:[...h,""]})}>
                  <ha-icon icon="mdi:plus"></ha-icon> Add entity
                </button>`}

            <div class="sub-title">Action (hold to run)</div>
            ${this._segmented("Type",l.type,[{value:"script",label:"Script"},{value:"service",label:"Service call"}],t=>this._setGlobal(e,{action:"script"===t?{type:"script",entity_id:""}:{type:"service",service:""}}))}
            ${"script"===l.type?this._entityPicker("Script entity",l.entity_id,["script"],t=>this._setGlobalAction(e,{entity_id:t})):this._textField("Service",l.service,t=>this._setGlobalAction(e,{service:t}),"e.g. script.celkovy_uklid_bytu")}
          </div>
        `:Ht}
      </div>`}render(){return this._config?null===this._ha?zt`<div class="loading">Loading…</div>`:(this._hintSeq=0,zt`
      ${this._ha?Ht:zt`<datalist id="ha-entities"></datalist>`}
      <div class="editor-root" @click=${()=>{this._menu&&(this._menu=null,this._confirm=null)}}>
        <div class="tabs-bar" role="tablist">
          ${["vacuums","global"].map(t=>zt`
            <button class="tab-btn ${this._tab===t?"tab-btn--active":""}" role="tab"
              aria-selected=${this._tab===t?"true":"false"}
              @click=${()=>{this._tab=t}}>
              <ha-icon icon=${"vacuums"===t?"mdi:robot-vacuum":"mdi:tune-variant"}></ha-icon>
              ${{vacuums:"Vacuums",global:"Global"}[t]}
            </button>`)}
        </div>
        ${"vacuums"===this._tab?this._renderVacuumsTab():"debug"===this._tab?this._renderDebugTab():this._renderGlobalTab()}
        <div class="editor-footer">
          <button type="button" class="link-btn" @click=${()=>{this._tab="debug"===this._tab?"vacuums":"debug"}}>
            ${"debug"===this._tab?"← Back":"Debug info"}
          </button>
          <span>anyvac-card v${Zt}</span>
        </div>
      </div>`):Ht}};Ce.styles=i$6`
    :host { display: block; }
    .editor-root { display: flex; flex-direction: column; }
    .loading { padding: 16px 0; color: var(--secondary-text-color); font-size: 14px; }

    /* ── Tabs ── */
    .tabs-bar { display: flex; border-bottom: 1px solid var(--divider-color); margin-bottom: 4px; }
    .tab-btn {
      flex: 1; display: flex; align-items: center; justify-content: center; gap: 6px;
      padding: 12px 4px; background: none; border: none; cursor: pointer;
      font: inherit; font-size: 14px; font-weight: 500;
      color: var(--secondary-text-color);
      border-bottom: 2px solid transparent;
    }
    .tab-btn ha-icon { --mdc-icon-size: 18px; }
    .tab-btn--active { color: var(--primary-color); border-bottom-color: var(--primary-color); }

    .tab-body { display: flex; flex-direction: column; gap: 12px; padding: 12px 0 4px; }

    /* ── Vacuum / global-action rows ── */
    .acc-row {
      border-radius: var(--ha-card-border-radius, 12px);
      border: 1px solid var(--divider-color);
      background: var(--card-background-color);
    }
    .acc-row--open { border-color: var(--primary-color); }
    .acc-header {
      display: flex; align-items: center; gap: 12px;
      padding: 10px 8px 10px 12px; cursor: pointer; border-radius: inherit;
    }
    .acc-header:focus-visible { outline: 2px solid var(--primary-color); outline-offset: -2px; }
    .acc-avatar {
      width: 40px; height: 40px; border-radius: 50%; flex-shrink: 0; overflow: hidden;
      display: flex; align-items: center; justify-content: center;
      border: 2px solid var(--divider-color); box-sizing: border-box;
      background: var(--secondary-background-color);
    }
    .acc-avatar img { width: 100%; height: 100%; object-fit: cover; }
    .acc-info { flex: 1; display: flex; flex-direction: column; min-width: 0; gap: 2px; }
    .acc-name { display: flex; align-items: center; gap: 6px; font-weight: 500; font-size: 15px;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: var(--primary-text-color); }
    .acc-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
    .acc-sub { font-size: 12px; color: var(--secondary-text-color); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .acc-chevron { color: var(--secondary-text-color); flex-shrink: 0; }
    .acc-body {
      padding: 12px; display: flex; flex-direction: column; gap: 12px;
      border-top: 1px solid var(--divider-color);
    }

    /* ── Sub-panels ── */
    .panel { display: block; --expansion-panel-summary-padding: 0 12px; }
    .panel-body { display: flex; flex-direction: column; gap: 12px; padding: 4px 0 8px; }
    .collapsible { border-radius: 8px; border: 1px solid var(--divider-color); }
    .collapsible-header { display: flex; align-items: center; gap: 8px; padding: 10px 12px; cursor: pointer; }
    .collapsible-title { flex: 1; font-size: 14px; font-weight: 500; color: var(--primary-text-color); }
    .collapsible-body { padding: 4px 12px 12px; display: flex; flex-direction: column; gap: 12px; }
    .badge {
      font-size: 12px; padding: 2px 8px; border-radius: 10px; max-width: 55%;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
      background: var(--secondary-background-color); color: var(--secondary-text-color);
    }

    /* ── ⋮ menu ── */
    .menu-wrap { position: relative; display: inline-flex; }
    .menu {
      position: absolute; right: 0; top: 100%; z-index: 10; min-width: 170px;
      display: flex; flex-direction: column; padding: 4px 0;
      background: var(--card-background-color); color: var(--primary-text-color);
      border: 1px solid var(--divider-color); border-radius: 8px;
      box-shadow: var(--ha-card-box-shadow, none);
    }
    .menu-item {
      display: flex; align-items: center; gap: 12px; padding: 10px 14px;
      background: none; border: none; cursor: pointer; text-align: left;
      font: inherit; font-size: 14px; color: inherit;
    }
    .menu-item ha-icon { --mdc-icon-size: 20px; color: var(--secondary-text-color); }
    .menu-item:hover:not(:disabled) { background: var(--secondary-background-color); }
    .menu-item:disabled { opacity: 0.4; cursor: default; }
    .menu-item--danger, .menu-item--danger ha-icon { color: var(--error-color); }
    .menu-confirm { padding: 10px 14px 6px; font-size: 14px; }
    .menu-confirm-row { display: flex; justify-content: flex-end; gap: 4px; padding: 4px 8px 6px; }
    .menu-btn { padding: 6px 12px; border: none; border-radius: 6px; background: none; cursor: pointer;
      font: inherit; font-size: 14px; font-weight: 500; color: var(--primary-color); }
    .menu-btn--danger { color: var(--error-color); }

    /* ── Rooms ── */
    .room-acc { border-radius: 8px; border: 1px solid var(--divider-color); }
    .room-acc--drop, .seq-row--drop { outline: 2px dashed var(--primary-color); outline-offset: -2px; }
    .room-acc-header { display: flex; align-items: center; gap: 8px; padding: 6px 6px 6px 8px; cursor: pointer; }
    .room-acc-icon { flex-shrink: 0; color: var(--secondary-text-color); }
    .room-acc-info { flex: 1; display: flex; flex-direction: column; min-width: 0; }
    .room-acc-name { font-weight: 500; font-size: 14px; color: var(--primary-text-color); }
    .room-acc-meta { font-size: 12px; color: var(--secondary-text-color); }
    .room-acc-body { padding: 12px; display: flex; flex-direction: column; gap: 12px; border-top: 1px solid var(--divider-color); }
    .drag { cursor: grab; color: var(--secondary-text-color); --mdc-icon-size: 18px; flex-shrink: 0; }

    .seq-list { display: flex; flex-direction: column; gap: 4px; }
    .seq-row { display: flex; align-items: center; gap: 8px; padding: 6px 8px; border-radius: 8px; border: 1px solid var(--divider-color); }
    .seq-icon { --mdc-icon-size: 18px; flex-shrink: 0; color: var(--secondary-text-color); }
    .seq-name { flex: 1; font-size: 14px; }
    .seq-pos { font-size: 12px; color: var(--secondary-text-color); }

    /* ── Fields ── */
    .sel { display: block; }
    .field { display: flex; flex-direction: column; gap: 6px; }
    .field--row { flex-direction: row; align-items: center; gap: 8px; }
    .field--row label { width: 130px; flex-shrink: 0; }
    label, .field-label { font-size: 14px; color: var(--secondary-text-color); }
    .required { color: var(--error-color); }
    .value { font-size: 14px; color: var(--primary-text-color); }
    .mono { font-size: 12px; font-family: var(--code-font-family, monospace); word-break: break-all; }
    .pre {
      font-size: 11px; font-family: var(--code-font-family, monospace); white-space: pre-wrap; word-break: break-all;
      background: var(--secondary-background-color); padding: 6px; border-radius: 6px; margin: 0; max-height: 220px; overflow: auto;
    }

    .segmented {
      display: flex; border: 1px solid var(--divider-color); border-radius: 8px; overflow: hidden;
    }
    .seg {
      flex: 1; display: flex; align-items: center; justify-content: center; gap: 6px;
      padding: 8px 6px; border: none; background: none; cursor: pointer;
      font: inherit; font-size: 13px; color: var(--primary-text-color);
    }
    .seg + .seg { border-left: 1px solid var(--divider-color); }
    .seg ha-icon { --mdc-icon-size: 16px; }
    .seg--on { background: rgba(var(--rgb-primary-color, 3, 169, 244), 0.15); color: var(--primary-color); font-weight: 500; }
    .seg:focus-visible, .swatch:focus-visible, .link-btn:focus-visible, .icon-btn:focus-visible, .hint-more:focus-visible {
      outline: 2px solid var(--primary-color); outline-offset: 1px;
    }

    .swatches { display: flex; align-items: center; flex-wrap: wrap; gap: 8px; }
    .swatch {
      position: relative; width: 28px; height: 28px; border-radius: 50%; padding: 0; cursor: pointer;
      border: 2px solid transparent; box-shadow: 0 0 0 1px var(--divider-color); box-sizing: border-box;
      display: inline-flex; align-items: center; justify-content: center; overflow: hidden;
    }
    .swatch--on { border-color: var(--card-background-color); box-shadow: 0 0 0 2px var(--primary-color); }
    .swatch--custom ha-icon { --mdc-icon-size: 16px; color: var(--secondary-text-color); }
    .swatch--custom input { position: absolute; inset: 0; opacity: 0; cursor: pointer; width: 100%; height: 100%; }

    /* Plain-input fallback (no HA form elements) */
    .text-input {
      width: 100%; box-sizing: border-box; padding: 8px 10px;
      border: 1px solid var(--divider-color); border-radius: 6px;
      background: var(--card-background-color); color: var(--primary-text-color);
      font: inherit; font-size: 14px;
    }
    .text-input--sm { width: auto; flex: 1; }
    .select-input {
      flex: 1; padding: 6px 8px; border: 1px solid var(--divider-color); border-radius: 6px;
      background: var(--card-background-color); color: var(--primary-text-color); font: inherit; font-size: 14px;
    }
    .slider-wrap { display: flex; align-items: center; gap: 8px; flex: 1; }
    .slider { flex: 1; accent-color: var(--primary-color); }
    .slider-val-wrap { display: flex; align-items: center; gap: 2px; flex-shrink: 0; }
    .slider-val-input {
      width: 48px; text-align: right; font: inherit; font-size: 14px; font-weight: 500; color: var(--primary-color);
      border: none; border-radius: 4px; background: transparent; padding: 2px 3px; -moz-appearance: textfield;
    }
    .slider-val-input:hover, .slider-val-input:focus { background: var(--secondary-background-color); outline: none; }
    .slider-val-input::-webkit-outer-spin-button,
    .slider-val-input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
    .slider-val-suffix { font-size: 14px; font-weight: 500; color: var(--primary-color); }
    .toggle-wrap { position: relative; display: inline-flex; align-items: center; cursor: pointer; }
    .toggle-input { position: absolute; opacity: 0; width: 0; height: 0; }
    .toggle-track { width: 36px; height: 20px; border-radius: 10px; background: var(--divider-color); position: relative; }
    .toggle-track::after {
      content: ""; position: absolute; top: 2px; left: 2px; width: 16px; height: 16px; border-radius: 50%;
      background: var(--card-background-color); transition: transform 0.2s;
    }
    .toggle-input:checked + .toggle-track { background: var(--primary-color); }
    .toggle-input:checked + .toggle-track::after { transform: translateX(16px); }

    /* ── Sections ── */
    .section-title {
      font-size: 14px; font-weight: 500; color: var(--primary-text-color);
      padding-top: 8px; border-top: 1px solid var(--divider-color);
    }
    .tab-body > .section-title:first-child { border-top: none; padding-top: 0; }
    .sub-section { display: flex; flex-direction: column; gap: 12px; padding-left: 12px; border-left: 2px solid var(--divider-color); }
    .sub-title { font-size: 13px; font-weight: 500; color: var(--secondary-text-color); }
    .sub-title--row { display: flex; align-items: center; justify-content: space-between; }
    .fp-preview { max-width: 100%; border-radius: 8px; display: block; }

    /* ── Buttons ── */
    .btn {
      display: flex; align-items: center; gap: 6px; align-self: flex-start;
      padding: 8px 14px; border-radius: 8px; cursor: pointer;
      font: inherit; font-size: 14px; font-weight: 500;
      border: 1px solid var(--divider-color); background: none; color: var(--primary-text-color);
    }
    .btn:disabled { opacity: 0.5; cursor: default; }
    .btn--add { color: var(--primary-color); border-style: dashed; border-color: var(--primary-color); }
    .btn--sm { padding: 6px 10px; font-size: 13px; }
    .btn-row { display: flex; gap: 8px; flex-wrap: wrap; }
    .icon-btn {
      display: flex; align-items: center; justify-content: center; width: 36px; height: 36px; border-radius: 50%;
      cursor: pointer; background: transparent; border: none; color: var(--secondary-text-color); flex-shrink: 0;
    }
    .icon-btn:hover { background: var(--secondary-background-color); }
    .icon-btn--sm { width: 28px; height: 28px; }
    .link-btn {
      background: none; border: none; padding: 0; cursor: pointer; font: inherit; font-size: 13px;
      color: var(--primary-color); text-decoration: underline; text-underline-offset: 2px;
    }

    /* ── Hints ── */
    .hint { font-size: 13px; line-height: 1.4; color: var(--secondary-text-color); margin: 0; }
    .hint--error { color: var(--error-color); }
    .hint.link { cursor: pointer; color: var(--primary-color); }
    .hint-more {
      display: inline-flex; vertical-align: middle; padding: 0; margin-left: 2px; border: none; background: none;
      cursor: pointer; color: var(--secondary-text-color); border-radius: 50%;
    }
    .hint-more ha-icon { --mdc-icon-size: 16px; }
    .hint-long { display: block; margin-top: 4px; }
    summary.hint { cursor: pointer; }

    .editor-footer {
      margin-top: 12px; padding-top: 8px; border-top: 1px solid var(--divider-color);
      font-size: 12px; color: var(--secondary-text-color);
      display: flex; align-items: center; justify-content: space-between; gap: 8px;
    }

    .var-row { display: flex; align-items: center; gap: 6px; }
    .var-row > .sel, .var-row > .field { flex: 1; min-width: 0; }
    .var-sep { color: var(--secondary-text-color); flex-shrink: 0; }
    .threshold-row .sel, .threshold-row .field { flex: 1; }
    .threshold-label { font-size: 14px; color: var(--secondary-text-color); flex-shrink: 0; }
    .threshold-color {
      width: 40px; height: 32px; padding: 2px; border-radius: 6px; cursor: pointer;
      border: 1px solid var(--divider-color); background: var(--card-background-color);
    }
  `,__decorate([n$1({attribute:!1})],Ce.prototype,"hass",void 0),__decorate([r()],Ce.prototype,"_config",void 0),__decorate([r()],Ce.prototype,"_tab",void 0),__decorate([r()],Ce.prototype,"_dragRoom",void 0),__decorate([r()],Ce.prototype,"_dragSeq",void 0),__decorate([r()],Ce.prototype,"_openVac",void 0),__decorate([r()],Ce.prototype,"_openSensors",void 0),__decorate([r()],Ce.prototype,"_openMap",void 0),__decorate([r()],Ce.prototype,"_openPresets",void 0),__decorate([r()],Ce.prototype,"_openAction",void 0),__decorate([r()],Ce.prototype,"_openGlobal",void 0),__decorate([r()],Ce.prototype,"_openRoom",void 0),__decorate([r()],Ce.prototype,"_hvSwap",void 0),__decorate([r()],Ce.prototype,"_pvAR",void 0),__decorate([r()],Ce.prototype,"_pvNat",void 0),__decorate([r()],Ce.prototype,"_floorplanSnapshotBusy",void 0),__decorate([r()],Ce.prototype,"_floorplanSnapshotError",void 0),__decorate([r()],Ce.prototype,"_guideExportBusy",void 0),__decorate([r()],Ce.prototype,"_guideExportError",void 0),__decorate([r()],Ce.prototype,"_guideExportResult",void 0),__decorate([r()],Ce.prototype,"_placeRoomsResult",void 0),__decorate([r()],Ce.prototype,"_ha",void 0),__decorate([r()],Ce.prototype,"_menu",void 0),__decorate([r()],Ce.prototype,"_confirm",void 0),__decorate([r()],Ce.prototype,"_hintsOpen",void 0),Ce=__decorate([t$1(Xt)],Ce);export{ve as AnyVacCard,Ce as AnyVacCardEditor};
