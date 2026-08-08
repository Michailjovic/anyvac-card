/* AnyVac Card — https://github.com/Michailjovic/anyvac-card */
function t(t,e,o,i){var s,n=arguments.length,a=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,o,i);else for(var r=t.length-1;r>=0;r--)(s=t[r])&&(a=(n<3?s(a):n>3?s(e,o,a):s(e,o))||a);return n>3&&a&&Object.defineProperty(e,o,a),a}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=globalThis,o=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;let n=class{constructor(t,e,o){if(this._$cssResult$=!0,o!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(o&&void 0===t){const o=void 0!==e&&1===e.length;o&&(t=s.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),o&&s.set(e,t))}return t}toString(){return this.cssText}};const a=(t,...e)=>{const o=1===t.length?t[0]:e.reduce((e,o,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+t[i+1],t[0]);return new n(o,t,i)},r=o?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const o of t.cssRules)e+=o.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:l,defineProperty:c,getOwnPropertyDescriptor:d,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:m}=Object,u=globalThis,_=u.trustedTypes,g=_?_.emptyScript:"",f=u.reactiveElementPolyfillSupport,b=(t,e)=>t,y={toAttribute(t,e){switch(e){case Boolean:t=t?g:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let o=t;switch(e){case Boolean:o=null!==t;break;case Number:o=null===t?null:Number(t);break;case Object:case Array:try{o=JSON.parse(t)}catch(t){o=null}}return o}},v=(t,e)=>!l(t,e),x={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:v};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=x){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const o=Symbol(),i=this.getPropertyDescriptor(t,o,e);void 0!==i&&c(this.prototype,t,i)}}static getPropertyDescriptor(t,e,o){const{get:i,set:s}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const n=i?.call(this);s?.call(this,e),this.requestUpdate(t,n,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??x}static _$Ei(){if(this.hasOwnProperty(b("elementProperties")))return;const t=m(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(b("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(b("properties"))){const t=this.properties,e=[...h(t),...p(t)];for(const o of e)this.createProperty(o,t[o])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,o]of e)this.elementProperties.set(t,o)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const o=this._$Eu(t,e);void 0!==o&&this._$Eh.set(o,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const o=new Set(t.flat(1/0).reverse());for(const t of o)e.unshift(r(t))}else void 0!==t&&e.push(r(t));return e}static _$Eu(t,e){const o=e.attribute;return!1===o?void 0:"string"==typeof o?o:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const o of e.keys())this.hasOwnProperty(o)&&(t.set(o,this[o]),delete this[o]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,i)=>{if(o)t.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const o of i){const i=document.createElement("style"),s=e.litNonce;void 0!==s&&i.setAttribute("nonce",s),i.textContent=o.cssText,t.appendChild(i)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,o){this._$AK(t,o)}_$ET(t,e){const o=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,o);if(void 0!==i&&!0===o.reflect){const s=(void 0!==o.converter?.toAttribute?o.converter:y).toAttribute(e,o.type);this._$Em=t,null==s?this.removeAttribute(i):this.setAttribute(i,s),this._$Em=null}}_$AK(t,e){const o=this.constructor,i=o._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=o.getPropertyOptions(i),s="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:y;this._$Em=i;const n=s.fromAttribute(e,t.type);this[i]=n??this._$Ej?.get(i)??n,this._$Em=null}}requestUpdate(t,e,o,i=!1,s){if(void 0!==t){const n=this.constructor;if(!1===i&&(s=this[t]),o??=n.getPropertyOptions(t),!((o.hasChanged??v)(s,e)||o.useDefault&&o.reflect&&s===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,o))))return;this.C(t,e,o)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:o,reflect:i,wrapped:s},n){o&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==s||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||o||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,o]of t){const{wrapped:t}=o,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,o,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[b("elementProperties")]=new Map,w[b("finalized")]=new Map,f?.({ReactiveElement:w}),(u.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $=globalThis,k=t=>t,S=$.trustedTypes,R=S?S.createPolicy("lit-html",{createHTML:t=>t}):void 0,M="$lit$",A=`lit$${Math.random().toFixed(9).slice(2)}$`,z="?"+A,P=`<${z}>`,C=document,E=()=>C.createComment(""),T=t=>null===t||"object"!=typeof t&&"function"!=typeof t,F=Array.isArray,D="[ \t\n\f\r]",O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,I=/-->/g,V=/>/g,N=RegExp(`>|${D}(?:([^\\s"'>=/]+)(${D}*=${D}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),H=/'/g,B=/"/g,j=/^(?:script|style|textarea|title)$/i,W=t=>(e,...o)=>({_$litType$:t,strings:e,values:o}),q=W(1),L=W(2),U=Symbol.for("lit-noChange"),G=Symbol.for("lit-nothing"),Z=new WeakMap,K=C.createTreeWalker(C,129);function Y(t,e){if(!F(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==R?R.createHTML(e):e}const X=(t,e)=>{const o=t.length-1,i=[];let s,n=2===e?"<svg>":3===e?"<math>":"",a=O;for(let e=0;e<o;e++){const o=t[e];let r,l,c=-1,d=0;for(;d<o.length&&(a.lastIndex=d,l=a.exec(o),null!==l);)d=a.lastIndex,a===O?"!--"===l[1]?a=I:void 0!==l[1]?a=V:void 0!==l[2]?(j.test(l[2])&&(s=RegExp("</"+l[2],"g")),a=N):void 0!==l[3]&&(a=N):a===N?">"===l[0]?(a=s??O,c=-1):void 0===l[1]?c=-2:(c=a.lastIndex-l[2].length,r=l[1],a=void 0===l[3]?N:'"'===l[3]?B:H):a===B||a===H?a=N:a===I||a===V?a=O:(a=N,s=void 0);const h=a===N&&t[e+1].startsWith("/>")?" ":"";n+=a===O?o+P:c>=0?(i.push(r),o.slice(0,c)+M+o.slice(c)+A+h):o+A+(-2===c?e:h)}return[Y(t,n+(t[o]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]};class J{constructor({strings:t,_$litType$:e},o){let i;this.parts=[];let s=0,n=0;const a=t.length-1,r=this.parts,[l,c]=X(t,e);if(this.el=J.createElement(l,o),K.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=K.nextNode())&&r.length<a;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(M)){const e=c[n++],o=i.getAttribute(t).split(A),a=/([.?@])?(.*)/.exec(e);r.push({type:1,index:s,name:a[2],strings:o,ctor:"."===a[1]?it:"?"===a[1]?st:"@"===a[1]?nt:ot}),i.removeAttribute(t)}else t.startsWith(A)&&(r.push({type:6,index:s}),i.removeAttribute(t));if(j.test(i.tagName)){const t=i.textContent.split(A),e=t.length-1;if(e>0){i.textContent=S?S.emptyScript:"";for(let o=0;o<e;o++)i.append(t[o],E()),K.nextNode(),r.push({type:2,index:++s});i.append(t[e],E())}}}else if(8===i.nodeType)if(i.data===z)r.push({type:2,index:s});else{let t=-1;for(;-1!==(t=i.data.indexOf(A,t+1));)r.push({type:7,index:s}),t+=A.length-1}s++}}static createElement(t,e){const o=C.createElement("template");return o.innerHTML=t,o}}function Q(t,e,o=t,i){if(e===U)return e;let s=void 0!==i?o._$Co?.[i]:o._$Cl;const n=T(e)?void 0:e._$litDirective$;return s?.constructor!==n&&(s?._$AO?.(!1),void 0===n?s=void 0:(s=new n(t),s._$AT(t,o,i)),void 0!==i?(o._$Co??=[])[i]=s:o._$Cl=s),void 0!==s&&(e=Q(t,s._$AS(t,e.values),s,i)),e}class tt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:o}=this._$AD,i=(t?.creationScope??C).importNode(e,!0);K.currentNode=i;let s=K.nextNode(),n=0,a=0,r=o[0];for(;void 0!==r;){if(n===r.index){let e;2===r.type?e=new et(s,s.nextSibling,this,t):1===r.type?e=new r.ctor(s,r.name,r.strings,this,t):6===r.type&&(e=new at(s,this,t)),this._$AV.push(e),r=o[++a]}n!==r?.index&&(s=K.nextNode(),n++)}return K.currentNode=C,i}p(t){let e=0;for(const o of this._$AV)void 0!==o&&(void 0!==o.strings?(o._$AI(t,o,e),e+=o.strings.length-2):o._$AI(t[e])),e++}}class et{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,o,i){this.type=2,this._$AH=G,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=o,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Q(this,t,e),T(t)?t===G||null==t||""===t?(this._$AH!==G&&this._$AR(),this._$AH=G):t!==this._$AH&&t!==U&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>F(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==G&&T(this._$AH)?this._$AA.nextSibling.data=t:this.T(C.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:o}=t,i="number"==typeof o?this._$AC(t):(void 0===o.el&&(o.el=J.createElement(Y(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new tt(i,this),o=t.u(this.options);t.p(e),this.T(o),this._$AH=t}}_$AC(t){let e=Z.get(t.strings);return void 0===e&&Z.set(t.strings,e=new J(t)),e}k(t){F(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let o,i=0;for(const s of t)i===e.length?e.push(o=new et(this.O(E()),this.O(E()),this,this.options)):o=e[i],o._$AI(s),i++;i<e.length&&(this._$AR(o&&o._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=k(t).nextSibling;k(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class ot{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,o,i,s){this.type=1,this._$AH=G,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=s,o.length>2||""!==o[0]||""!==o[1]?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=G}_$AI(t,e=this,o,i){const s=this.strings;let n=!1;if(void 0===s)t=Q(this,t,e,0),n=!T(t)||t!==this._$AH&&t!==U,n&&(this._$AH=t);else{const i=t;let a,r;for(t=s[0],a=0;a<s.length-1;a++)r=Q(this,i[o+a],e,a),r===U&&(r=this._$AH[a]),n||=!T(r)||r!==this._$AH[a],r===G?t=G:t!==G&&(t+=(r??"")+s[a+1]),this._$AH[a]=r}n&&!i&&this.j(t)}j(t){t===G?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class it extends ot{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===G?void 0:t}}class st extends ot{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==G)}}class nt extends ot{constructor(t,e,o,i,s){super(t,e,o,i,s),this.type=5}_$AI(t,e=this){if((t=Q(this,t,e,0)??G)===U)return;const o=this._$AH,i=t===G&&o!==G||t.capture!==o.capture||t.once!==o.once||t.passive!==o.passive,s=t!==G&&(o===G||i);i&&this.element.removeEventListener(this.name,this,o),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class at{constructor(t,e,o){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}}const rt=$.litHtmlPolyfillSupport;rt?.(J,et),($.litHtmlVersions??=[]).push("3.3.3");const lt=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let ct=class extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,o)=>{const i=o?.renderBefore??e;let s=i._$litPart$;if(void 0===s){const t=o?.renderBefore??null;i._$litPart$=s=new et(e.insertBefore(E(),t),t,void 0,o??{})}return s._$AI(t),s})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return U}};ct._$litElement$=!0,ct.finalized=!0,lt.litElementHydrateSupport?.({LitElement:ct});const dt=lt.litElementPolyfillSupport;dt?.({LitElement:ct}),(lt.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ht=t=>(e,o)=>{void 0!==o?o.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},pt={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:v},mt=(t=pt,e,o)=>{const{kind:i,metadata:s}=o;let n=globalThis.litPropertyMetadata.get(s);if(void 0===n&&globalThis.litPropertyMetadata.set(s,n=new Map),"setter"===i&&((t=Object.create(t)).wrapped=!0),n.set(o.name,t),"accessor"===i){const{name:i}=o;return{set(o){const s=e.get.call(this);e.set.call(this,o),this.requestUpdate(i,s,t,!0,o)},init(e){return void 0!==e&&this.C(i,void 0,t,e),e}}}if("setter"===i){const{name:i}=o;return function(o){const s=this[i];e.call(this,o),this.requestUpdate(i,s,t,!0,o)}}throw Error("Unsupported decorator location: "+i)};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ut(t){return(e,o)=>"object"==typeof o?mt(t,e,o):((t,e,o)=>{const i=e.hasOwnProperty(o);return e.constructor.createProperty(o,t),i?Object.getOwnPropertyDescriptor(e,o):void 0})(t,e,o)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function _t(t){return ut({...t,state:!0,attribute:!1})}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const gt=1;let ft=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,o){this._$Ct=t,this._$AM=e,this._$Ci=o}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const bt="important",yt=" !"+bt,vt=(t=>(...e)=>({_$litDirective$:t,values:e}))(class extends ft{constructor(t){if(super(t),t.type!==gt||"style"!==t.name||t.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,o)=>{const i=t[o];return null==i?e:e+`${o=o.includes("-")?o:o.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${i};`},"")}update(t,[e]){const{style:o}=t.element;if(void 0===this.ft)return this.ft=new Set(Object.keys(e)),this.render(e);for(const t of this.ft)null==e[t]&&(this.ft.delete(t),t.includes("-")?o.removeProperty(t):o[t]=null);for(const t in e){const i=e[t];if(null!=i){this.ft.add(t);const e="string"==typeof i&&i.endsWith(yt);t.includes("-")||e?o.setProperty(t,e?i.slice(0,-11):i,e?bt:""):o[t]=i}}return U}}),xt="anyvac-card",wt="anyvac-card-editor",$t="1.1.0",kt=600,St={cleaning:["🧹 Cleaning","#52c41a"],segment_cleaning:["🧹 Cleaning rooms","#52c41a"],zoned_cleaning:["🧹 Zone cleaning","#52c41a"],spot_cleaning:["🎯 Spot cleaning","#52c41a"],starting:["▶️ Starting","#52c41a"],segment_mopping:["🫧 Mopping rooms","#40a9ff"],zoned_mopping:["🫧 Zone mopping","#40a9ff"],robot_status_mopping:["🫧 Mopping","#40a9ff"],clean_mop_cleaning:["🧹🫧 Vacuuming+mopping","#52c41a"],clean_mop_mopping:["🧹🫧 Vacuuming+mopping","#52c41a"],segment_clean_mop_cleaning:["🧹🫧 Rooms (vac)","#52c41a"],segment_clean_mop_mopping:["🧹🫧 Rooms (mop)","#52c41a"],zoned_clean_mop_cleaning:["🧹🫧 Zones (vac)","#52c41a"],zoned_clean_mop_mopping:["🧹🫧 Zones (mop)","#52c41a"],washing_the_mop:["🚿 Washing mop","#9254de"],washing_the_mop_2:["🚿 Washing mop","#9254de"],going_to_wash_the_mop:["🚿 Going to wash mop","#9254de"],air_drying_stopping:["💨 Drying mop","#9254de"],back_to_dock_washing_duster:["🏠 Dock + washing","#faad14"],returning_home:["🏠 Returning home","#faad14"],docking:["🏠 Docking","#faad14"],going_to_target:["🎯 Going to target","#40a9ff"],charging:["⚡ Charging","rgba(255,255,255,0.75)"],charging_complete:["✅ Fully charged","#52c41a"],docked:["✅ Docked","rgba(255,255,255,0.75)"],charger_disconnected:["🔌 Charger disconnected","#faad14"],emptying_the_bin:["🗑️ Emptying bin","#faad14"],idle:["💤 Idle","rgba(255,255,255,0.45)"],paused:["⏸️ Paused","#faad14"],mapping:["🗺️ Mapping","#40a9ff"],remote_control_active:["🕹️ Remote control","#40a9ff"],manual_mode:["🕹️ Manual mode","#40a9ff"],updating:["⬆️ Updating","#faad14"],in_call:["📞 In call","#faad14"],shutting_down:["⏹️ Shutting down","rgba(255,255,255,0.4)"],error:["❌ Error","#ff4d4f"],charging_problem:["⚠️ Charging problem","#ff4d4f"],locked:["🔒 Locked","#ff4d4f"],device_offline:["📴 Offline","#ff4d4f"]},Rt={green:"#52c41a",blue:"#2196F3",orange:"#faad14"},Mt=["#52c41a","#2196F3","#faad14","#eb2f96","#722ed1","#13c2c2","#fa541c","#a0d911"],At={green:"rgba(46,204,113,0.18)",blue:"rgba(33,150,243,0.18)",orange:"rgba(250,173,20,0.18)"},zt={green:"rgba(46,204,113,0.30)",blue:"rgba(33,150,243,0.30)",orange:"rgba(250,173,20,0.30)"};const Pt=new Set(["cleaning","segment_cleaning","zoned_cleaning","spot_cleaning","segment_mopping","zoned_mopping","robot_status_mopping","clean_mop_cleaning","clean_mop_mopping","segment_clean_mop_cleaning","segment_clean_mop_mopping","zoned_clean_mop_cleaning","zoned_clean_mop_mopping"]);function Ct(t){if(!t)return null;const e=t.scale??1;let o=(t.width??0)*e,i=(t.height??0)*e;const s=t.rotation??0;if(90===s||270===s){const t=o;o=i,i=t}return o>0&&i>0?{NW:o,NH:i}:null}const Et=Math.PI/180;function Tt(t,e,o,i,s,n,a){let r=Math.round(t/Et)%360;return r<0&&(r+=360),{rotation:r,scale:100*e,offset_x:100*o.x-50,offset_y:o.y*i*100-50,residual_pct:100*s,anchors:n,raw_rotation:Math.round(a/Et*10)/10}}function Ft(t,e){return(t.rooms?.length?t.rooms:e?.rooms)??[]}function Dt(t,e,o,i){const s=e?.map,n={rotation:s?.rotation??0,scale:s?.scale??100,offset_x:s?.offset_x??0,offset_y:s?.offset_y??0,auto:!1};if(!e||"manual"===s?.seat)return n;if(!function(t,e){const o="merged"===t.map_mode?t.image_base??(t.vacuums??[]).find(t=>t.image_base?.src)?.image_base:e?.image_base;return o?.src}(t,e))return n;if(!o)return n;const a=function(t,e){if(!(t.length&&e>0))return null;if(t.length>=2){const o=t.length,i={x:0,y:0},s={x:0,y:0};for(const e of t)i.x+=e.q.x,i.y+=e.q.y,s.x+=e.a.x,s.y+=e.a.y;i.x/=o,i.y/=o,s.x/=o,s.y/=o;let n=0,a=0,r=0;for(const e of t){const t=e.q.x-i.x,o=e.q.y-i.y,l=e.a.x-s.x,c=e.a.y-s.y;n+=t*l+o*c,a+=t*c-o*l,r+=t*t+o*o}if(r>1e-8){const l=Math.atan2(a,n),c=Math.round(l/(Math.PI/2))*(Math.PI/2),d=Math.cos(c),h=Math.sin(c);let p=0;for(const e of t){const t=e.q.x-i.x,o=e.q.y-i.y,n=h*t+d*o;p+=(d*t-h*o)*(e.a.x-s.x)+n*(e.a.y-s.y)}const m=p/r;if(m>1e-4){const n={x:s.x-m*(d*i.x-h*i.y),y:s.y-m*(h*i.x+d*i.y)};let a=0;for(const e of t){const t=n.x+m*(d*e.q.x-h*e.q.y)-e.a.x,o=n.y+m*(h*e.q.x+d*e.q.y)-e.a.y;a+=t*t+o*o}return Tt(c,m,n,e,Math.sqrt(a/o),o,l)}}}const o=t.find(t=>t.sizeQ&&t.sizeA)??null;if(!o||!o.sizeQ||!o.sizeA||o.sizeQ.w<1e-6||o.sizeQ.h<1e-6)return null;let i=null;for(const t of[0,1,2,3]){const e=t*(Math.PI/2),s=t%2==0?o.sizeQ.w:o.sizeQ.h,n=t%2==0?o.sizeQ.h:o.sizeQ.w,a=o.sizeA.w/s,r=o.sizeA.h/n;if(!(a>0&&r>0))continue;const l=Math.sqrt(a*r),c=Math.abs(Math.log(a/r));(!i||c<i.mism-1e-9)&&(i={theta:e,s:l,mism:c})}if(!i)return null;const s=Math.cos(i.theta),n=Math.sin(i.theta),a={x:o.a.x-i.s*(s*o.q.x-n*o.q.y),y:o.a.y-i.s*(n*o.q.x+s*o.q.y)};return Tt(i.theta,i.s,a,e,0,1,i.theta)}(function(t,e,o){if(!e)return[];const i=Ct(e.image_dims),s=Array.isArray(e.rooms)?e.rooms:[];if(!i||!s.length)return[];const{NW:n,NH:a}=i,r=[];for(const e of t){if(null==e.map_x||null==e.map_y)continue;const t=s.find(t=>t.name===e.key)??s.find(t=>t.name===e.name),i=t?.bbox_px;if(!i||[i.x0,i.y0,i.x1,i.y1].some(t=>null==t))continue;const l={q:{x:((i.x0+i.x1)/2-n/2)/n,y:((i.y0+i.y1)/2-a/2)/n},a:{x:e.map_x/100,y:e.map_y/100/o}};null!=e.map_w&&null!=e.map_h&&e.map_w>0&&e.map_h>0&&(l.sizeQ={w:(i.x1-i.x0)/n,h:(i.y1-i.y0)/n},l.sizeA={w:e.map_w/100,h:e.map_h/100/o}),r.push(l)}return r}(Ft(t,e),o,i),i);return a?{rotation:a.rotation,scale:a.scale,offset_x:a.offset_x,offset_y:a.offset_y,auto:!0,residual:a.residual_pct,anchorCount:a.anchors}:n}function Ot(t,e){const o=e.x1-e.x0,i=e.y1-e.y0;if(!(o>0&&i>0))return null;const s=(t.x0+t.x1)/2-e.x0,n=(t.y0+t.y1)/2-e.y0,a=t.x1-t.x0,r=t.y1-t.y0,l=(t,e,o)=>Math.min(o,Math.max(e,t));return{map_x:l(Math.round(s/o*1e3)/10,0,100),map_y:l(Math.round(n/i*1e3)/10,0,100),map_w:l(Math.round(a/o*1e3)/10,2,100),map_h:l(Math.round(r/i*1e3)/10,2,100)}}function It(t,e,o,i){const s=Ct(e?.image_dims),n=t?.bbox_px;if(!s||!n||[n.x0,n.y0,n.x1,n.y1].some(t=>null==t))return null;const{NW:a,NH:r}=s,l=((n.x0+n.x1)/2-a/2)/a,c=((n.y0+n.y1)/2-r/2)/a;let d=(n.x1-n.x0)/a,h=(n.y1-n.y0)/a;const p=o.scale/100,m=o.rotation*Et,u=Math.cos(m),_=Math.sin(m),g=(50+o.offset_x)/100+p*(u*l-_*c),f=(50+o.offset_y)/100/i+p*(_*l+u*c);if(Math.round(o.rotation/90)%2!=0){const t=d;d=h,h=t}const b=(t,e,o)=>Math.min(o,Math.max(e,t));return{map_x:b(Math.round(1e3*g)/10,0,100),map_y:b(Math.round(f*i*1e3)/10,0,100),map_w:b(Math.round(p*d*1e3)/10,2,100),map_h:b(Math.round(p*h*i*1e3)/10,2,100)}}const Vt={columns:[100],rows:["minmax(0, 1fr)","auto","auto"],place:{map:{row:1,col:1},dock:{row:2,col:1,overflow:"auto"},start:{row:3,col:1}}},Nt={landscape:{columns:["minmax(0, 1fr)","max-content"],rows:["auto","minmax(260px, 1fr)","auto","auto"],place:{badges:{row:1,col:"1/3"},map:{row:2,col:"1/3"},tools:{row:3,col:"1/3",align:"start"},status:{row:4,col:1,overflow:"auto"},dock:{row:4,col:2,overflow:"auto"}}},portrait:{columns:[72,28],rows:[90,10],place:{map:{row:1,col:1},dock:{row:1,col:2,overflow:"auto"},start:{row:2,col:"1/3"}}}};function Ht(t){return"number"==typeof t?t+"fr":t}function Bt(t){return t.map(Ht).join(" ")}function jt(t){const e=t.height??"viewport";return"viewport"===e?"calc(100svh - var(--header-height, 0px))":"container"===e?"100%":e}var Wt;const qt={main_brush_time_left:300,side_brush_time_left:200,filter_time_left:150,sensor_time_left:30};console.info(`%c ANYVAC-CARD %c v${$t} `,"background:#2196F3;color:#fff;font-weight:700;padding:2px 4px;border-radius:3px 0 0 3px","background:#1a1a1a;color:#fff;font-weight:400;padding:2px 4px;border-radius:0 3px 3px 0");let Lt=class extends ct{constructor(){super(...arguments),this.editMode=!1,this._shownSet=new Set([0]),this._holdId=null,this._mapMode="normal",this._inspectKey=null,this._dockSheetOpen=!1,this._dockSheetIdx=0,this._modeSheetOpen=!1,this._careResetPending=new Map,this._modeEntity=null,this._dbg="",this._zoneDrag=null,this._zoneRectShown=null,this._zonePending=null,this._zoneMulti=!1,this._zoneEdit=null,this._pinPending=null,this._layers={dry:!0,wet:!1},this._layerMenu=null,this._layerHoldTimer=null,this._layerHeld=!1,this._localRoomSel=new Map,this._activePresets=new Map,this._planMode="both",this._activeGlobalPreset=null,this._cardW=0,this._mapAR=3.636,this._profile="landscape",this._mapRegW=0,this._mapRegH=0,this._mapAvailW=0,this._mapAvailH=0,this._lastStack=!1,this._lastPortraitFitW=0,this._lastRotate=!0,this._flipLive=null,this._ro=null,this._onWinResize=null,this._measureRaf=0,this._measureTimer=null,this._settleTimer=null,this._panelViewMo=null,this._panelViewWarned=!1,this._panelViewNode=null,this._barMo=null,this._editBarRo=null,this._now=Date.now(),this._tickTimer=null,this._holdTimer=null,this._holdStartPos=null,this._initialized=!1,this._watched=null,this._intCache=new Map,this._mapCandCache=new Map,this._autoCache=new Map,this._careCache=new Map,this._roomsMemo=new Map,this._seatMemo=new Map,this._holdEnd=()=>{this._cancelHold()},this._holdMove=t=>{if(!this._holdStartPos||null===this._holdTimer)return;const e=t.clientX-this._holdStartPos.x,o=t.clientY-this._holdStartPos.y;e*e+o*o>144&&this._cancelHold()},this._planPreview=null,this._planFetchKey="",this._onFloorplanLoad=t=>{const e=t.target;if(e?.naturalWidth&&e.naturalHeight){const t=e.naturalWidth/e.naturalHeight;t>.1&&Math.abs(t-this._mapAR)>.01&&(this._mapAR=t)}}}static getConfigElement(){return document.createElement(wt)}static getStubConfig(t){const e=t?Object.keys(t.states).filter(t=>t.startsWith("vacuum.")):[],o=t?.entities,i=o?e.filter(t=>"matter"!==o[t]?.platform):e,s=i.length>0?i:e;return 0===s.length?{type:`custom:${xt}`,vacuums:[{entity:"vacuum.my_roborock",name:"Roborock",rooms:[],clean_action:{type:"native"}}]}:{type:`custom:${xt}`,vacuums:s.map(e=>({entity:e,name:t.states[e]?.attributes.friendly_name??e.replace(/^vacuum\./,""),rooms:[],clean_action:{type:"native"}}))}}setConfig(t){if(!t.vacuums||!Array.isArray(t.vacuums)||0===t.vacuums.length)throw new Error("[anyvac-card] 'vacuums' must be a non-empty array");if(this._config=t,this._watched=null,this._intCache.clear(),this._mapCandCache.clear(),this._autoCache.clear(),this._careCache.clear(),this._roomsMemo.clear(),this._seatMemo.clear(),this._initialized){const e=new Set;for(const o of this._shownSet)o<t.vacuums.length&&e.add(o);this._shownSet=e.size>0?e:new Set(t.vacuums.map((t,e)=>e))}else this._initialized=!0,this._shownSet=this._loadShown(),this._localRoomSel=this._loadRoomSel(),this._flipLive=this._loadFlipLive()}getCardSize(){return 6}connectedCallback(){super.connectedCallback(),this.style.setProperty("--hold-ms",kt+"ms"),this._ro||"undefined"==typeof ResizeObserver||(this._ro=new ResizeObserver(()=>this._scheduleMeasure()),this._ro.observe(this)),this._onWinResize||(this._onWinResize=()=>this._scheduleMeasure(),window.addEventListener("resize",this._onWinResize,{passive:!0}),window.addEventListener("orientationchange",this._onWinResize,{passive:!0})),this._setupPanelViewObserver(),this._scheduleMeasure(),this._tickTimer||(this._tickTimer=window.setInterval(()=>{this._config?.debug_room_progress&&(this._config.vacuums??[]).some(t=>this._isCleaning(t)||this._isPaused(t))&&(this._now=Date.now())},1e3))}_scheduleMeasure(){if(this._measureRaf||null!==this._measureTimer)return;const t=()=>{this._measureRaf=0,this._measureTimer=null,this._doMeasure()};"undefined"!=typeof document&&document.hidden?this._measureTimer=window.setTimeout(t,0):this._measureRaf=requestAnimationFrame(t)}_doMeasure(){const t=this.getBoundingClientRect(),e=Math.round(t.width);e&&Math.abs(e-this._cardW)>=2&&(this._cardW=e);const o=this._config?.layout;if(o){const i=function(t,e,o){const i=t?.orientation;return"portrait"===i||"landscape"===i?i:e&&o&&e/o<(t?.threshold??1)?"portrait":"landscape"}(o,this._cardW||e||window.innerWidth,this._availableHeight(o,t));i!==this._profile&&(this._profile=i),this._refineGridHeight()}}_availableHeight(t,e){if("container"===(t.height??"viewport"))return e.height>1?Math.round(e.height):window.innerHeight;const o=e.top;return o>=0&&o<window.innerHeight?Math.max(1,Math.round(window.innerHeight-o-this._editBarHeight())):window.innerHeight}_editBarHeight(){try{const t=this._findCardOptionsAncestor();if(!t?.shadowRoot)return 0;const e=t.shadowRoot.querySelector(".card-actions");if(!e)return 0;const o=e.getBoundingClientRect();if(!(o.height>0))return 0;const i=getComputedStyle(e);return Math.ceil(o.height+(parseFloat(i.marginTop)||0)+(parseFloat(i.marginBottom)||0))}catch{return 0}}_findPanelViewAncestor(){let t=this.parentElement??this.getRootNode().host??null,e=0;for(;t&&e++<20;){if(t instanceof Element&&("HUI-PANEL-VIEW"===t.tagName||"HUI-VIEW"===t.tagName))return t;const e=t;t=e.parentElement??e.getRootNode()?.host??null}return null}_findCardOptionsAncestor(){let t=this.parentElement??this.getRootNode().host??null,e=0;for(;t&&e++<12;){if(t instanceof Element&&"HUI-CARD-OPTIONS"===t.tagName)return t;const e=t;t=e.parentElement??e.getRootNode()?.host??null}return null}_setupPanelViewObserver(){if("undefined"==typeof MutationObserver)return;if(this._panelViewMo&&this._panelViewNode?.isConnected)return;this._panelViewMo&&(this._panelViewMo.disconnect(),this._panelViewMo=null,this._panelViewNode=null);const t=this._findPanelViewAncestor();if(!t){if(!this._panelViewWarned){this._panelViewWarned=!0;try{console.warn("[anyvac-card] hui-panel-view/hui-view ancestor not found (HA internal DOM may have changed) — edit-mode layout refresh via MutationObserver is disabled; resize-based refresh still works.")}catch{}}return}const e=new MutationObserver(()=>{this._scheduleMeasure(),this._watchEditBar();const t=this._findCardOptionsAncestor();if(t?.shadowRoot)try{e.observe(t.shadowRoot,{childList:!0,subtree:!0})}catch{}});try{e.observe(t,{childList:!0,subtree:!0})}catch{}if(t.shadowRoot)try{e.observe(t.shadowRoot,{childList:!0,subtree:!0})}catch{}const o=this._findCardOptionsAncestor();if(o?.shadowRoot)try{e.observe(o.shadowRoot,{childList:!0,subtree:!0})}catch{}this._panelViewMo=e,this._panelViewNode=t,this._watchEditBar()}_watchEditBar(){this._barMo&&(this._barMo.disconnect(),this._barMo=null);const t=this._findCardOptionsAncestor();if(!t?.shadowRoot)return;const e=t.shadowRoot.querySelector(".card-actions");if(e)return void this._observeEditBar(e);const o=t.shadowRoot,i=new MutationObserver(()=>{const t=o.querySelector(".card-actions");t&&(i.disconnect(),this._barMo=null,this._observeEditBar(t))});try{i.observe(o,{childList:!0,subtree:!0})}catch{return}this._barMo=i}_observeEditBar(t){if(this._scheduleMeasure(),"undefined"==typeof ResizeObserver)return;this._editBarRo&&(this._editBarRo.disconnect(),this._editBarRo=null);const e=new ResizeObserver(()=>this._scheduleMeasure());try{e.observe(t)}catch{return}this._editBarRo=e}_refineGridHeight(){const t=this._config?.layout;if(!t)return;const e=this.renderRoot?.querySelector(".avc-grid");if(!e)return;if("viewport"===(t.height??"viewport")){const t=e.getBoundingClientRect().top;if(t>=0&&t<window.innerHeight){const o=Math.round(window.innerHeight-t-this._editBarHeight());o>120&&(e.style.height=o+"px")}}const o=this.renderRoot?.querySelector(".avc-region--map");if(o){const t=Math.round(o.clientWidth),e=Math.round(o.clientHeight);t&&Math.abs(t-this._mapRegW)>=2&&(this._mapRegW=t),e&&Math.abs(e-this._mapRegH)>=2&&(this._mapRegH=e)}if("portrait"===this._profile){const t=this.renderRoot?.querySelector(".avc-region--start"),o=parseFloat(getComputedStyle(e).rowGap||getComputedStyle(e).gap||"0")||0,i=t?Math.round(t.getBoundingClientRect().height):0,s=Math.round(e.clientWidth),n=Math.round(e.clientHeight-i-(i?o:0));s&&Math.abs(s-this._mapAvailW)>=2&&(this._mapAvailW=s),n>0&&Math.abs(n-this._mapAvailH)>=2&&(this._mapAvailH=n)}}disconnectedCallback(){super.disconnectedCallback(),this._cancelHold(),this._measureRaf&&(cancelAnimationFrame(this._measureRaf),this._measureRaf=0),null!==this._measureTimer&&(clearTimeout(this._measureTimer),this._measureTimer=null),null!==this._settleTimer&&(clearTimeout(this._settleTimer),this._settleTimer=null),this._tickTimer&&(clearInterval(this._tickTimer),this._tickTimer=null),this._onWinResize&&(window.removeEventListener("resize",this._onWinResize),window.removeEventListener("orientationchange",this._onWinResize),this._onWinResize=null),this._ro&&(this._ro.disconnect(),this._ro=null),this._panelViewMo&&(this._panelViewMo.disconnect(),this._panelViewMo=null),this._panelViewNode=null,this._barMo&&(this._barMo.disconnect(),this._barMo=null),this._editBarRo&&(this._editBarRo.disconnect(),this._editBarRo=null)}firstUpdated(){const t=Math.round(this.getBoundingClientRect().width);t&&(this._cardW=t),this._scheduleMeasure()}updated(){if(this._careResetPending.size){let t=null;for(const[e,o]of this._careResetPending){const i=this.hass?.states[e],s=i?Date.parse(i.last_changed):NaN;Number.isFinite(s)&&s>o&&(t||(t=new Map(this._careResetPending)),t.delete(e))}t&&(this._careResetPending=t)}this._refineGridHeight(),this._refineGridColumns(),this._setupPanelViewObserver(),null!==this._settleTimer&&clearTimeout(this._settleTimer),this._settleTimer=window.setTimeout(()=>{this._settleTimer=null,this._scheduleMeasure()},250)}_refineGridColumns(){if("portrait"!==this._profile||!this._lastPortraitFitW)return;if(this._config.layout?.portrait?.columns?.length)return;if(this._stackTopology)return;const t=this.renderRoot?.querySelector(".avc-grid");if(!t)return;const e=t.clientWidth-(parseFloat(getComputedStyle(t).columnGap||"0")||0);let o=Math.round(this._lastPortraitFitW);e>0&&(o=Math.min(o,e));const i=Math.round(o)+"px 1fr";t.style.gridTemplateColumns!==i&&(t.style.gridTemplateColumns=i)}shouldUpdate(t){if(!t.has("hass")||t.size>1)return!0;const e=t.get("hass");if(!e||!this._config)return!0;for(const t of this._watchedEntities())if(e.states[t]!==this.hass.states[t])return!0;return!1}_watchedEntities(){if(this._registry(),this._watched)return this._watched;const t=new Set;for(const e of this._config?.vacuums??[]){for(const o of[e.entity,e.status_entity,e.battery_entity,e.last_clean_entity,e.progress_entity,e.current_room_entity,e.error_entity,this._mapEntityFor(e),this._intEntity(e),...Object.values(this._autoEntities(e))])o&&t.add(o);for(const o of this._roomsFor(e))o.last_clean_entity&&t.add(o.last_clean_entity),o.clean_time_entity&&t.add(o.clean_time_entity);for(const o of this._careItems(e))o.entity&&t.add(o.entity),o.reset&&t.add(o.reset),o.binary&&t.add(o.binary)}for(const e of this._config?.global_actions??[])for(const o of e.watch_entities??[])o&&t.add(o);return this.hass?.entities&&(this._watched=t),t}_resolveColor(t,e){const o=t??e;return Rt[o]??o}_resolveBg(t,e,o){return(o?zt:At)[t??e]??function(t,e){const o=/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(t);if(!o)return`rgba(255,255,255,${e})`;let i=o[1];return 3===i.length&&(i=i.split("").map(t=>t+t).join("")),`rgba(${parseInt(i.slice(0,2),16)},${parseInt(i.slice(2,4),16)},${parseInt(i.slice(4,6),16)},${e})`}(this._resolveColor(t,e),o?.3:.18)}_vacIndex(t){const e=this._config?.vacuums?.findIndex(e=>e.entity===t.entity)??-1;return e<0?0:e}_defaultColor(t){return Mt[this._vacIndex(t)%Mt.length]}_color(t){return this._resolveColor(t.color,this._defaultColor(t))}_colorBg(t){return this._resolveBg(t.color,this._defaultColor(t),!1)}_colorBgActive(t){return this._resolveBg(t.color,this._defaultColor(t),!0)}_registry(){const t=this.hass?.entities;return t!==this._regRef&&(this._regRef=t,this._intCache.clear(),this._mapCandCache.clear(),this._autoCache.clear(),this._careCache.clear(),this._watched=null),t}_intEntity(t){if(t.integration_entity)return t.integration_entity;const e=this._registry();if(!e||!t.entity)return;if(this._intCache.has(t.entity))return this._intCache.get(t.entity);const o=e[t.entity]?.device_id,i=o?Object.keys(e).find(t=>e[t]?.device_id===o&&"anyvac"===e[t]?.platform&&t.startsWith("sensor.")):void 0;return this._intCache.set(t.entity,i),i}_mapEntityFor(t){if(t.map?.entity)return t.map.entity;const e=this._registry();if(!e||!t.entity)return;let o=this._mapCandCache.get(t.entity);if(!o){const i=e[t.entity]?.device_id;if(!i)return;o=Object.keys(e).filter(t=>e[t]?.device_id===i&&t.startsWith("image.")),this._mapCandCache.set(t.entity,o)}if(1===o.length)return o[0];const i=o.filter(t=>{const e=this.hass.states[t];return!!e&&"unavailable"!==e.state&&"unknown"!==e.state&&!!e.attributes.entity_picture});return 1===i.length?i[0]:void 0}_intAttrs(t){const e=this._intEntity(t),o=e?this.hass.states[e]?.attributes:void 0;if(o)return(o.schema_version??0)>=2?o:void 0}_schemaWarning(){for(const t of this._config?.vacuums??[]){const e=this._intEntity(t),o=e?this.hass.states[e]?.attributes:void 0;if(o&&(o.schema_version??0)<2)return`AnyVac integration is too old for this card (schema ${o.schema_version??1} < 2). Update the anyvac integration to ≥ 0.18.0.`}return null}_autoEntities(t){const e=this._registry();if(!e||!t.entity)return{};const o=this._autoCache.get(t.entity);if(o)return o;const i=e[t.entity]?.device_id;if(!i)return{};const s=Object.keys(e).filter(t=>e[t]?.device_id===i),n=t=>s.find(o=>e[o]?.translation_key===t),a={status:n("status"),battery:(t=>s.find(e=>this.hass.states[e]?.attributes?.device_class===t))("battery"),last_clean:n("last_clean_end"),progress:n("clean_percent"),current_room:n("current_room"),error:n("vacuum_error")};return this._autoCache.set(t.entity,a),a}_ent(t,e){return t[e+"_entity"]??this._autoEntities(t)[e]}_statusInfo(t){const e=this.hass.states[this._ent(t,"status")??t.entity]?.state??"unknown";return St[e]??[e,"rgba(255,255,255,0.5)"]}_careItems(t){const e=this._registry(),o=this.hass?.devices;if(!e||!o||!t.entity)return[];const i=this._dockTier(t),s=t.entity+"|"+i;if(this._careCache.has(s))return this._careCache.get(s);const n=e[t.entity]?.device_id,a=n?o[n]:void 0,r=a?.identifiers?.find(([t])=>"roborock"===t)?.[1],l=r?Object.values(o).find(t=>t.identifiers?.some(([t,e])=>"roborock"===t&&e===`${r}_dock`)):void 0,c=l?.id,d=(t,o,i)=>t?Object.keys(e).find(s=>e[s]?.device_id===t&&e[s]?.translation_key===o&&s.startsWith(i+".")):void 0,h=[],p=(t,e,o,i)=>{const s=d(i,e,"sensor"),n=d(i,o,"button");(s||n)&&h.push({key:e,label:t,entity:s,reset:n,totalHours:qt[e]})};if(p("Main brush","main_brush_time_left","reset_main_brush_consumable",n),p("Side brush","side_brush_time_left","reset_side_brush_consumable",n),p("Filter","filter_time_left","reset_air_filter_consumable",n),p("Sensors","sensor_time_left","reset_sensor_consumable",n),"full"===i){p("Dock brush","cleaning_brush_time_left","reset_dock_cleaning_brush_consumable",c),p("Strainer","strainer_time_left","reset_dock_strainer_consumable",c);const t=(t,e)=>{const o=d(c,e,"binary_sensor");o&&h.push({key:e,label:t,binary:o})};t("Dirty water tank","dirty_box_full"),t("Clean water tank","clean_box_empty"),t("Cleaning fluid","clean_fluid_empty")}return this._careCache.set(s,h),h}_careValue(t){if(!t.entity)return"—";const e=this.hass.states[t.entity];if(!e||"unavailable"===e.state||"unknown"===e.state)return"—";const o=Number(e.state);if(Number.isNaN(o))return e.state;const i=e.attributes?.unit_of_measurement,s="s"===i?o/3600:"min"===i?o/60:o;if(t.totalHours){return`${Math.max(0,Math.min(100,Math.round(s/t.totalHours*100)))} %`}return`${Math.round(s)} h`}_isCleaning(t){return Pt.has(this.hass.states[t.entity]?.state??"")}_hasError(t){const e=this._ent(t,"error"),o=e?this.hass.states[e]?.state:null;return!!o&&"none"!==o&&"unknown"!==o&&"unavailable"!==o}_isPaused(t){return"paused"===this.hass.states[t.entity]?.state}_battery(t){const e=this._ent(t,"battery");if(!e)return null;const o=parseInt(this.hass.states[e]?.state??"");return isNaN(o)?null:o}_lastCleanStr(t){const e=this._ent(t,"last_clean"),o=e?this.hass.states[e]?.state:void 0;if(!o||"unavailable"===o||"unknown"===o)return"—";const i=new Date(o),s=Math.floor((Date.now()-i.getTime())/864e5),n=i.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});return 0===s?"Today · "+n:1===s?"Yesterday · "+n:i.toLocaleDateString([],{day:"2-digit",month:"2-digit"})+" · "+n}_progress(t){const e=this._ent(t,"progress");if(!e)return null;const o=parseInt(this.hass.states[e]?.state??"");return isNaN(o)||0===o?null:o}_selSensor(){for(const t of this._config.vacuums){const e=this._intEntity(t);if(e&&Array.isArray(this.hass.states[e]?.attributes?.selected_rooms))return e}}_backendSel(){const t=this._selSensor();return t?new Set(this.hass.states[t]?.attributes?.selected_rooms??[]):null}_setBackendSel(t,e){this._call("anyvac","select_rooms",{rooms:t,mode:e})}_isRoomSelected(t,e){const o=this._backendSel();return o?o.has(t.key):this._localRoomSel.get(e.entity+":"+t.key)??!1}_layersEff(){const t=this._selSensor(),e=t?this.hass.states[t]?.attributes?.view_layers:void 0;return e&&"boolean"==typeof e.dry&&"boolean"==typeof e.wet?{dry:e.dry,wet:e.wet}:this._layers}_staticRoomsFor(t){return Ft(this._config,t)}_memoSync(){this.hass!==this._memoHass&&(this._memoHass=this.hass,this._roomsMemo.clear(),this._seatMemo.clear())}_roomsFor(t){this._memoSync();const e=this._roomsMemo.get(t.entity);if(e)return e;const o=this._computeRoomsFor(t);return this._roomsMemo.set(t.entity,o),o}_computeRoomsFor(t){const e=this._intAttrs(t),o=Array.isArray(e?.rooms)?e.rooms:[];if(!e||!o.length)return this._staticRoomsFor(t);const i=this._effectiveSeat(t),s=this._wrapAspect(this._baseHeightFor(t)),n=this._staticRoomsFor(t),a=new Map(n.filter(t=>t.key).map(t=>[t.key,t])),r=new Set,l=[];for(const t of o){const o=t?.name;if(!o)continue;r.add(o);const n=a.get(o);if(n&&null!=n.map_x&&null!=n.map_y){l.push(n);continue}const c=It(t,e,i,s);c?l.push({...n??{key:o,name:o,icon:"mdi:floor-plan"},...c}):n&&l.push(n)}for(const t of n)t.key&&!r.has(t.key)&&l.push(t);return l}_hasSelectedRooms(t){return this._roomsFor(t).some(e=>this._isRoomSelected(e,t))}_liveCleanType(t){if((t.presets?.length??0)>=2){const e=this._activePreset(t);return null!=e.mop_intensity&&""!==e.mop_intensity&&"off"!==e.mop_intensity||null!=e.mop_mode&&""!==e.mop_mode?"wet":"dry"}const e=this._intAttrs(t)?.clean_type;if("wet"===e||"dry"===e)return e;const o=this._vacCleanType(t);return o.wet&&!o.dry?"wet":"dry"}_backendEstimate(t,e,o){const i=this._intAttrs(t)?.rooms_estimate;if(!i)return null;const s=i[e.name??""]??i[e.key],n=s?s[o]:void 0;return"number"==typeof n&&n>0?n:null}_roomCleanMins(t,e){const o=this._vacCleanType(e),i=!(!o.wet||o.dry)||!(o.dry&&!o.wet)&&"wet"===this._liveCleanType(e),s=this._backendEstimate(e,t,i?"wet":"dry");if(null!=s)return s;const n=i?t.clean_time_wet:t.clean_time_dry;if(null!=n&&n>0)return n;const a=i?t.clean_time_dry:t.clean_time_wet;if(null!=a&&a>0)return a;if(t.clean_time_entity){const e=parseFloat(this.hass.states[t.clean_time_entity]?.state??"");if(!isNaN(e)&&e>0)return e}return t.clean_time_mins??0}_totalCleanMins(t){return this._roomsFor(t).reduce((e,o)=>this._isRoomSelected(o,t)?e+this._roomCleanMins(o,t):e,0)}_intRoomRec(t,e){const o=this._intAttrs(t)?.rooms_last_cleaned;return o?o[e.key]??o[e.name??""]??null:null}_roomCoverageRec(t,e){const o=this._intAttrs(t)?.rooms_coverage;return o?o[e.key]??o[e.name??""]??null:null}_ageDaysFromIso(t){if(!t)return null;const e=new Date(t).getTime();return isNaN(e)?null:(Date.now()-e)/864e5}_roomAgeDays(t,e){if(e){const o=this._intRoomRec(e,t);if(o){const t=this._ageDaysFromIso(o.dry),e=this._ageDaysFromIso(o.wet),i=this._ageDaysFromIso(o.any),s=this._layersEff(),n=s.dry,a=s.wet;let r;if(r=n&&a?Math.max(t??9999,e??9999):n?t:a?e:i,null!==r)return r}}if(!t.last_clean_entity)return null;const o=this.hass.states[t.last_clean_entity]?.state;return o&&"unavailable"!==o&&"unknown"!==o?(Date.now()-new Date(o).getTime())/864e5:null}_colorForAgeDays(t){if(null===t)return"rgba(255,77,77,0.85)";const e=[...this._config.room_thresholds??[{days:2,color:"rgba(46,204,113,0.85)"},{days:5,color:"rgba(250,173,20,0.85)"},{days:10,color:"rgba(255,152,0,0.85)"}]].sort((t,e)=>t.days-e.days);for(const o of e)if(t<=o.days)return o.color;return"rgba(255,77,77,0.85)"}_vacCleanType(t){if("dry"===t.clean_type)return{dry:!0,wet:!1};if("wet"===t.clean_type)return{dry:!1,wet:!0};if("both"===t.clean_type)return{dry:!0,wet:!0};const e=this._intAttrs(t)?.mop_signal;if(e){return{dry:!0,wet:null!=e.water_box_mode||!!e.water_mode_name}}const o=t.clean_action,i=!(!o||!(o.mop_mode||o.mop_mode_entity||o.mop_intensity||o.mop_intensity_entity));return{dry:!i||null!=o?.suction_level&&"off"!==o.suction_level,wet:i}}_roomProgress(t,e){const o=this._intAttrs(t)?.rooms_progress;return o?o[e.key]??o[e.name??""]??null:null}_roomProgForType(t,e,o){let i=null,s=null,n=!1;for(const a of e){const e=this._roomProgress(a,t);if(!e)continue;const r="dry"===o?e.dry_pct:e.wet_pct;null!=r&&(null===i||r>i)&&(i=r,s=a,n=!!("dry"===o?e.dry_calibrating:e.wet_calibrating))}return null!==i&&s?{pct:i,kind:"S",title:`${o} coverage ${i}%`,color:this._color(s),calibrating:n}:null}_progColor(t){return t>=90?"#52c41a":t>=50?"#faad14":"#40a9ff"}_renderRoomGauge(t,e){if(!this._config.debug_room_progress)return G;const o=this._roomProgForType(e,t,"dry"),i=this._roomProgForType(e,t,"wet");if(!o&&!i)return G;const s=(t,e,o,i)=>q`
      <span class="room-gauge" title=${e}
        style=${vt({background:`conic-gradient(${o} ${3.6*t}deg, rgba(255,255,255,0.12) 0)`})}>
        <span>${t}${i?"~":""}</span>
      </span>`;return q`<div class="room-gauges">
      ${o?s(o.pct,"dry · "+o.title,o.color,o.calibrating):G}
      ${i?s(i.pct,"wet · "+i.title,"#40a9ff",i.calibrating):G}
    </div>`}_renderProgChip(t){return t?q`<span class="rl-prog" title=${t.title}
      style=${vt({color:t.color??this._progColor(t.pct)})}>${t.pct}${t.calibrating?"~":""}%<small>${t.kind}</small></span>`:G}_batIcon(t){return t>80?"mdi:battery":t>50?"mdi:battery-60":t>20?"mdi:battery-30":"mdi:battery-10"}_batColor(t){return t>50?"#52c41a":t>20?"#faad14":"#ff4d4f"}_mapUrl(t){const e=this.hass.states[t];if(!e)return"";const o=e.attributes.entity_picture;if(!o)return"";const i=new Date(e.last_updated).getTime(),s=o.includes("?")?"&":"?";return this.hass.hassUrl(o+s+"_t="+i)}_timeStr(t){const e=Math.round(t);if(e<=0)return"";if(e>=60){const t=Math.floor(e/60),o=e%60;return o>0?"~"+t+" h "+o+" min":"~"+t+" h"}return"~"+e+" min"}_isGlobalActive(t){return(t.watch_entities??[]).some(t=>Pt.has(this.hass.states[t]?.state??""))}async _triggerGlobal(t){const e=t.action;try{if("script"===e.type)await this.hass.callService("script","turn_on",{entity_id:e.entity_id,variables:e.variables??{}});else{const[t,o]=e.service.split(".");await this.hass.callService(t,o,e.data??{})}}catch(t){console.error("[anyvac-card] global action failed:",t)}}_cancelHold(){null!==this._holdTimer&&(clearTimeout(this._holdTimer),this._holdTimer=null),this._holdId=null,this._holdStartPos=null}_holdStart(t,e){return o=>{o.preventDefault(),this._cancelHold(),this._holdId=t,this._holdStartPos={x:o.clientX,y:o.clientY},this._holdTimer=setTimeout(()=>{this._holdTimer=null,this._holdId=null,this._holdStartPos=null,e()},kt)}}_toggleShown(t){if(this._config.layout&&"portrait"===this._profile)return this._shownSet=new Set([t]),void this._saveShown();this._toggleShownMulti(t)}_toggleShownMulti(t){const e=new Set(this._shownSet);e.has(t)?e.size>1&&e.delete(t):e.add(t),this._shownSet=e,this._saveShown()}async _call(t,e,o){try{await this.hass.callService(t,e,o)}catch(o){console.error("[anyvac-card] "+t+"."+e+" failed:",o)}}_fireMoreInfo(t){this.dispatchEvent(new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:t}}))}_storeKey(t){const e=(this._config?.vacuums??[]).map(t=>t.entity).join(",");return`anyvac-card:${t}:${e}`}_readStored(t,e){try{return localStorage.getItem(this._storeKey(t))??localStorage.getItem(e)}catch{return null}}_saveShown(){try{const t=[...this._shownSet].map(t=>this._config.vacuums[t]?.entity).filter(Boolean);localStorage.setItem(this._storeKey("shown"),JSON.stringify(t))}catch{}}_loadShown(){try{const t=this._readStored("shown","roborock-card:shown");if(t){const e=JSON.parse(t).map(t=>this._config.vacuums.findIndex(e=>e.entity===t)).filter(t=>t>=0);if(e.length>0)return new Set(e)}}catch{}return new Set(this._config.vacuums.map((t,e)=>e))}_saveFlipLive(){try{null===this._flipLive?localStorage.removeItem(this._storeKey("flip")):localStorage.setItem(this._storeKey("flip"),JSON.stringify(this._flipLive))}catch{}}_loadFlipLive(){const t=this._readStored("flip","roborock-card:flip");if(null===t)return null;try{return!0===JSON.parse(t)}catch{return null}}_saveRoomSel(t){try{const e=t+":",o={};for(const[t,i]of this._localRoomSel.entries())t.startsWith(e)&&(o[t.slice(e.length)]=i);localStorage.setItem(this._storeKey("sel:"+t),JSON.stringify(o))}catch{}}_loadRoomSel(){const t=new Map;try{for(const e of this._config.vacuums){const o=this._readStored("sel:"+e.entity,"roborock-card:sel:"+e.entity);if(o){const i=JSON.parse(o);for(const[o,s]of Object.entries(i))s&&t.set(e.entity+":"+o,!0)}}}catch{}return t}_pause(t){this._call("vacuum","pause",{entity_id:t.entity})}_resume(t){this._call("vacuum","start",{entity_id:t.entity})}_dock(t){this._call("vacuum","return_to_base",{entity_id:t.entity})}_toggleRoom(t,e){if(this._backendSel())return void this._setBackendSel([t.key],"toggle");const o=e.entity+":"+t.key,i=new Map(this._localRoomSel);i.set(o,!i.get(o)),this._localRoomSel=i,this._saveRoomSel(e.entity)}_isRoomSelectedAny(t,e){const o=this._backendSel();return o?o.has(t):e.some(e=>this._localRoomSel.get(e.entity+":"+t)??!1)}_toggleRoomAcross(t,e){if(this._isRoomSelectedAny(t,e)&&e.some(t=>this._intAttrs(t))&&this._call("anyvac","pin_room",{room:t}),this._backendSel())return void this._setBackendSel([t],"toggle");const o=!this._isRoomSelectedAny(t,e),i=new Map(this._localRoomSel);for(const s of e)this._roomsFor(s).some(e=>e.key===t)&&i.set(s.entity+":"+t,o);this._localRoomSel=i;for(const t of e)this._saveRoomSel(t.entity)}_allRoomKeys(){const t=new Set;for(const e of this._config.vacuums)for(const o of this._roomsFor(e))t.add(o.key);return[...t]}_v2Vacuums(){const t=[],e=[];for(const o of this._config.vacuums){const i=this._vacCleanType(o);i.dry&&t.push(o.entity),i.wet&&e.push(o.entity)}return{dry:t,wet:e}}_unassignedRooms(t,e,o){if(!o||0===t.length)return[];const i=this._planPreview;if(!i||i.key!==this._planKey(t,e))return[];const s="wet"!==e,n="dry"!==e,a=[];for(const e of t)(s&&!i.dry.has(e)||n&&!i.wet.has(e))&&a.push(e);return a}_v2Settings(){const t={};for(const e of["dry","wet"])for(const o of this._config.vacuums){const i=this._vacCleanType(o);if(!("dry"===e?i.dry:i.wet))continue;const s=this._activePreset(o),n={};s.suction_level&&(n.fan_speed=s.suction_level),"wet"===e&&s.mop_mode&&(n.mop_mode=s.mop_mode),"wet"===e&&s.mop_intensity&&(n.mop_intensity=s.mop_intensity),s.repeat&&s.repeat>1&&(n.repeat=s.repeat),Object.keys(n).length&&((t[e]??(t[e]={}))[o.entity]=n)}return Object.keys(t).length?t:void 0}_planKey(t,e){return JSON.stringify([t,e,this._v2Vacuums(),this._pinsAttr()])}_fetchPlan(t,e){const o=this._planKey(t,e);o!==this._planFetchKey&&(this._planFetchKey=o,(async()=>{try{const i=await this.hass.callService("anyvac","plan",{rooms:t,mode:e,vacuums:this._v2Vacuums()},void 0,!1,!0);if(this._planFetchKey!==o)return;const s=i?.response?.plan??{},n=t=>{const e=new Map;for(const[o,i]of Object.entries(t??{}))for(const t of i)e.set(t,o);return e};this._planPreview={key:o,dry:n(s.dry),wet:n(s.wet),eta:"number"==typeof s.eta_min?s.eta_min:null,unsequenced:Array.isArray(s.unsequenced)?s.unsequenced:[]}}catch(t){console.warn("[anyvac-card] anyvac.plan preview failed:",t),this._planFetchKey===o&&(this._planPreview={key:o,dry:new Map,wet:new Map,eta:null,unsequenced:[]})}})())}_etaFor(t,e,o){o&&t.length&&this._fetchPlan(t,e);const i=this._planPreview?.eta;return o&&null!=i?i:this._selEstMins(t)}async _runOrchestrated(t,e){t.length&&await this._call("anyvac","clean",{rooms:t,mode:e,vacuums:this._v2Vacuums(),...this._v2Settings()?{settings:this._v2Settings()}:{}})}_selectGlobalPreset(t){if(this._activeGlobalPreset=t.id,t.mode&&(this._planMode=t.mode),"all"===t.scope||Array.isArray(t.scope)){const e="all"===t.scope?this._allRoomKeys():t.scope;if(this._backendSel())return void this._setBackendSel(e,"set");const o=new Map(this._localRoomSel);for(const t of this._config.vacuums)for(const e of this._roomsFor(t))o.delete(t.entity+":"+e.key);for(const t of e)for(const e of this._config.vacuums)this._roomsFor(e).some(e=>e.key===t)&&o.set(e.entity+":"+t,!0);this._localRoomSel=o;for(const t of this._config.vacuums)this._saveRoomSel(t.entity)}}_vacAbbrev(t){return((t.name??t.entity.split(".")[1]??"").replace(/[^A-Za-z0-9]/g,"").slice(0,2)||"??").toUpperCase()}_renderPlanPreview(){if("auto"!==this._config.ui_mode)return G;const t=this._allRoomKeys().filter(t=>this._isRoomSelectedAny(t,this._config.vacuums));if(!t.length)return G;const e=this._planMode,o=(this._config.global_presets??[]).find(t=>t.id===this._activeGlobalPreset)?.label,i="dry"===e||"both"===e,s="wet"===e||"both"===e;this._fetchPlan(t,e);const n=this._planPreview?.dry??new Map,a=this._planPreview?.wet??new Map,r=t=>{for(const e of this._config.vacuums){const o=this._roomsFor(e).find(e=>e.key===t);if(o)return o}},l=t=>{const e=this._config.vacuums.find(e=>e.entity===t);if(!e)return q`<span style="font-size:11px;opacity:.25">—</span>`;const o=this._color(e);return q`<span style="display:inline-flex;align-items:center;justify-content:center;min-width:24px;height:17px;padding:0 5px;border-radius:9px;font-size:10px;font-weight:700;color:#fff;background:${o}30;border:1px solid ${o}">${this._vacAbbrev(e)}</span>`},c=(t,o)=>{const i=e===t;return q`<button @click=${e=>{e.stopPropagation(),this._planMode=t}}
        style="padding:2px 8px;border-radius:8px;font-size:10px;font-weight:700;cursor:pointer;font-family:inherit;border:1px solid ${i?"rgba(255,255,255,0.5)":"rgba(255,255,255,0.15)"};background:${i?"rgba(255,255,255,0.12)":"transparent"};color:${i?"#fff":"rgba(255,255,255,0.5)"}">${o}</button>`},d="plan-run";return q`
      <div style="margin:0 4px 6px;padding:6px 8px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:12px;display:flex;flex-direction:column;gap:6px">
        <div style="display:flex;align-items:center;justify-content:space-between">
          <span style="font-size:9px;font-weight:600;letter-spacing:.6px;color:rgba(255,255,255,.35)">CLEAN PLAN${o?" · "+o.toUpperCase():""}</span>
          <div style="display:flex;gap:4px">${c("dry","Dry")}${c("wet","Wet")}${c("both","Both")}</div>
        </div>
        <div style="display:flex;gap:6px;overflow-x:auto;align-items:center">
          <div style="display:flex;flex-direction:column;gap:3px;align-items:center;flex-shrink:0;padding-right:2px">
            <span style="height:18px"></span>
            ${i?q`<ha-icon icon="mdi:broom" style="--mdc-icon-size:14px;color:rgba(255,255,255,.4)"></ha-icon>`:G}
            ${s?q`<ha-icon icon="mdi:water" style="--mdc-icon-size:14px;color:rgba(64,169,255,.7)"></ha-icon>`:G}
          </div>
          ${t.map(t=>{const e=r(t);return q`<div style="display:flex;flex-direction:column;align-items:center;gap:3px;min-width:32px;flex-shrink:0" title=${e?.name??t}>
              <ha-icon icon=${e?.icon||"mdi:floor-plan"} style="--mdc-icon-size:18px;color:rgba(255,255,255,.7)"></ha-icon>
              ${i?l(n.get(t)):G}
              ${s?l(a.get(t)):G}
            </div>`})}
        </div>
        <button class="action-btn ${this._holdId===d?"action-btn--holding":""}"
          style="flex:0 0 auto;align-self:flex-end;flex-direction:row;gap:6px;padding:7px 16px;background:rgba(82,196,26,0.14);border:1px solid rgba(82,196,26,0.55);color:#fff"
          @pointerdown=${this._holdStart(d,()=>this._runOrchestrated(t,this._planMode))}
          @pointermove=${this._holdMove}
          @pointerup=${this._holdEnd}
          @pointerleave=${this._holdEnd}
          @pointercancel=${this._holdEnd}>
          <div class="hold-ring"></div>
          <ha-icon icon="mdi:play" style="--mdc-icon-size:18px"></ha-icon>
          <span style="font-size:12px">Start · hold</span>
        </button>
      </div>
    `}_renderAutoBar(){if("auto"!==this._config.ui_mode)return G;const t=this._config.global_presets??[];return t.length?q`
      <div style="display:flex;flex-wrap:wrap;gap:8px;padding:2px 4px 4px">
        ${t.map(t=>{const e=this._activeGlobalPreset===t.id;return q`<button
            @click=${()=>this._selectGlobalPreset(t)}
            style="flex:0 1 auto;min-width:128px;display:flex;flex-direction:row;align-items:center;justify-content:flex-start;gap:10px;padding:9px 14px;border-radius:14px;cursor:pointer;font-family:inherit;color:white;background:${e?"rgba(82,196,26,0.14)":"rgba(255,255,255,0.05)"};border:1px solid ${e?"rgba(82,196,26,0.6)":"rgba(255,255,255,0.12)"}">
            <ha-icon icon=${t.icon||"mdi:robot-vacuum-variant"} style="--mdc-icon-size:24px"></ha-icon>
            <div style="display:flex;flex-direction:column;align-items:flex-start;line-height:1.15">
              <span style="font-size:13px;font-weight:700">${t.label}</span>
              <small style="font-size:9px;font-weight:600;letter-spacing:.4px;color:rgba(255,255,255,0.4)">${"all"===t.scope?"WHOLE HOME":"select"===t.scope?"SELECTED":"ROOMS"}${t.mode?" · "+("dry"===t.mode?"DRY":"wet"===t.mode?"WET":"BOTH"):""}</small>
            </div>
          </button>`})}
      </div>
    `:G}_pinsAttr(){const t=this._selSensor(),e=t?this.hass.states[t]?.attributes?.room_pins:void 0;return e&&"object"==typeof e?e:{}}_pinCandidates(t,e){return this._config.vacuums.filter(o=>this._roomsFor(o).some(e=>e.key===t)&&this._vacCleanType(o)[e])}_cycleRoomPin(t,e,o){const i=this._pinCandidates(t,e);if(i.length<2)return;const s=i.findIndex(t=>t.entity===o),n=i[(s+1)%i.length];this._call("anyvac","pin_room",{room:t,kind:e,vacuum:n.entity})}_vacChip(t,e){const o=this._config.vacuums.find(e=>e.entity===t);if(!o)return q`<span class="dock-chip dock-chip--empty" @click=${e??G}>—</span>`;const i=this._color(o);return q`<span class="dock-chip"
      style="color:#fff;background:${i}30;border-color:${i}"
      title=${(o.name??o.entity)+(e?" · tap to assign a different vacuum":"")}
      @click=${e??G}>${this._vacAbbrev(o)}</span>`}_batteryPct(t){if(t.battery_entity){const e=Number(this.hass.states[t.battery_entity]?.state);if(Number.isFinite(e))return e}const e=Number(this.hass.states[t.entity]?.attributes?.battery_level);return Number.isFinite(e)?e:null}_selEstMins(t){let e=0;for(const o of t){let t=0;for(const e of this._config.vacuums){const i=this._roomsFor(e).find(t=>t.key===o);i&&(t=Math.max(t,this._roomCleanMins(i,e)))}e+=t}return Math.round(e)}_renderVacuumIconStrip(){if("portrait"!==this._profile)return G;const t=this._config.vacuums;return t.length?q`
      <div class="vac-icon-strip">
        ${t.map((t,e)=>{const o=this._shownSet.has(e),i="vacicon-"+e,s=this._holdId===i;return q`
            <div class="vac-icon-slot">
              <button class="vac-icon-btn ${s?"vac-icon-btn--holding":""} ${o?"":"vac-icon-btn--hidden"}"
                style=${vt({borderColor:this._statusInfo(t)[1]})}
                @pointerdown=${t=>{t.preventDefault(),this._cancelHold(),this._holdId=i,this._holdTimer=setTimeout(()=>{this._holdTimer=null,this._holdId=null,this._toggleShownMulti(e)},kt)}}
                @pointerup=${()=>{null!==this._holdTimer?(this._cancelHold(),this._fireMoreInfo(t.entity)):this._holdId=null}}
                @pointerleave=${this._holdEnd}
                @pointercancel=${this._holdEnd}
                title=${t.name??t.entity} aria-label=${t.name??t.entity}
                aria-pressed=${o?"true":"false"}>
                <div class="hold-ring"></div>
                ${t.image?q`<img src=${t.image} alt="" />`:q`<ha-icon icon="mdi:robot-vacuum" style=${vt({color:this._color(t)})}></ha-icon>`}
              </button>
            </div>
          `})}
      </div>
    `:G}_renderDock(t,e=!1){const o=this._config.vacuums,i=this._mergedRoomDefs(o);if(!i.length)return q`${e?this._renderVacuumPicker():G}${this._renderVacuumIconStrip()}`;const s=o.some(t=>this._intAttrs(t)),n=this._planMode,a=this._allRoomKeys().filter(t=>this._isRoomSelectedAny(t,o)),r=a.length?a:this._allRoomKeys();s&&r.length&&this._fetchPlan(r,n);const l=this._planPreview?.dry??new Map,c=this._planPreview?.wet??new Map,d=new Set(s?this._planPreview?.unsequenced??[]:[]),h=new Set(this._unassignedRooms(r,n,s)),p="wet"!==n,m="dry"!==n,u=t=>null===t?"—":t<1?"<1d":Math.round(t)+"d",_=(t,e,o)=>q`
      <button class="dock-mode ${n===t?"on":""}"
        @click=${e=>{e.stopPropagation(),this._planMode=t}}>
        <ha-icon icon=${e}></ha-icon><span>${o}</span>
      </button>`,g="dock-run",f="portrait"!==this._profile||!!this._config.debug_dense_dock;return q`
      <div class="dock">
        ${e?this._renderVacuumPicker():G}
        ${this._renderVacuumIconStrip()}
        ${"portrait"===this._profile?q`
            <div class="dock-layers">${this._renderLayerToggleCompact(o)}
              ${this._config.layout?q`<button class="mtbtn ${this._flipEff?"on":""}"
                  title="Flip map 180° for this screen (this session only)"
                  @click=${()=>this._toggleFlipLive()}>
                <ha-icon icon="mdi:flip-vertical"></ha-icon>
              </button>`:G}
            </div>
          `:G}
        ${t?q`
          <div class="dock-head">
            ${_("dry","mdi:broom","Dry")}${_("wet","mdi:water","Wet")}${_("both","mdi:water-plus","Both")}
            ${o.some(t=>"none"!==this._dockTier(t)||this._careItems(t).length>0)?q`
              <button class="dock-mode dock-mode--dock ${this._dockSheetOpen?"on":""}"
                @click=${t=>{t.stopPropagation(),this._dockSheetOpen=!this._dockSheetOpen}}>
                <ha-icon icon="mdi:home-outline"></ha-icon><span>Dock</span>
                ${this._dockNeedsAttention()?q`<span class="dock-mode-dot"></span>`:G}
              </button>`:G}
          </div>`:G}
        ${this._renderModeSheet()}
        ${this._renderDockSheet()}
        ${f?q`<div class="dock-rows">
          ${i.map(({r:t,v:e})=>{const i=this._intRoomRec(e,t),a=this._ageDaysFromIso(i?.dry),r=this._ageDaysFromIso(i?.wet),_=this._roomCoverageRec(e,t),g=t=>null==t?"—":t+"%",f=this._isRoomSelectedAny(t.key,o),b=this._pinCandidates(t.key,"dry").length>1,y=this._pinCandidates(t.key,"wet").length>1,v=(e,o)=>("dry"===e?b:y)?i=>{i.stopPropagation(),this._cycleRoomPin(t.key,e,o)}:void 0,x="normal"!==this._mapMode;return q`
              <button class="dock-row ${f?"on":""} ${x?"room-overlay--locked":""}" ?disabled=${x}
                title=${x?"Room selection is off while placing a pin/zone":""}
                @click=${()=>{x||this._toggleRoomAcross(t.key,o)}}>
                <ha-icon class="dock-ric" icon=${t.icon??"mdi:square"}></ha-icon>
                <span class="dock-name">${t.name??t.key}</span>
                <span class="dock-info">
                  ${f&&h.has(t.key)?q`<ha-icon class="dock-unassigned" icon="mdi:robot-off"
                    title="No available robot for this room's ${n} pass — check that a vacuum is configured with the right role and knows this room."></ha-icon>`:G}
                  ${f&&d.has(t.key)?q`<ha-icon class="dock-unseq" icon="mdi:sort-variant-off"
                    title="No cleaning order set for this room — the time estimate may be off. Set the order in the card editor's Maps tab."></ha-icon>`:G}
                  <span class="dock-ages">
                    <span class="dock-age">${this._renderProgChip(this._roomProgForType(t,o,"dry"))}<ha-icon icon="mdi:broom"></ha-icon><b style=${vt({color:this._colorForAgeDays(a)})}>${u(a)}</b><small class="dock-cov" title="Last completed dry clean's coverage">${g(_?.dry)}</small></span>
                    <span class="dock-age">${this._renderProgChip(this._roomProgForType(t,o,"wet"))}<ha-icon icon="mdi:water"></ha-icon><b style=${vt({color:this._colorForAgeDays(r)})}>${u(r)}</b><small class="dock-cov" title="Last completed wet clean's coverage">${g(_?.wet)}</small></span>
                  </span>
                  ${s&&f?q`
                    <span class="dock-avatars">
                      ${p?this._vacChip(l.get(t.key),v("dry",l.get(t.key))):G}
                      ${m?this._vacChip(c.get(t.key),v("wet",c.get(t.key))):G}
                    </span>`:G}
                </span>
              </button>`})}
        </div>`:G}
        ${t&&s?q`
          <div class="dock-foot">
            <span class="dock-est">${a.length?a.length+" rooms · ~"+this._etaFor(r,n,s)+" min":"Whole home · ~"+this._etaFor(r,n,s)+" min"}
              ${h.size?q`<ha-icon class="dock-unassigned" icon="mdi:robot-off"
                title="${h.size} selected room${h.size>1?"s have":" has"} no available robot for the ${n} pass — it/they will be silently skipped. Check vacuum roles/config."></ha-icon>`:G}
              ${d.size?q`<ha-icon class="dock-unseq" icon="mdi:sort-variant-off"
                title="${d.size} selected room${d.size>1?"s have":" has"} no cleaning order set — the time above may be off. Set the order in the card editor's Maps tab."></ha-icon>`:G}</span>
            <button class="action-btn ${this._holdId===g?"action-btn--holding":""}"
              style="flex:0 0 auto;padding:7px 14px;background:rgba(111,191,115,0.24);border:1px solid rgba(111,191,115,0.65);color:#fff"
              ?disabled=${!r.length}
              @pointerdown=${r.length?this._holdStart(g,()=>this._runOrchestrated(r,this._planMode)):G}
              @pointermove=${this._holdMove}
              @pointerup=${this._holdEnd}
              @pointerleave=${this._holdEnd}
              @pointercancel=${this._holdEnd}>
              <div class="hold-ring"></div>
              <ha-icon icon="mdi:play" style="--mdc-icon-size:16px"></ha-icon>
              <span style="font-size:12px">Start · hold</span>
            </button>
          </div>`:G}
      </div>
    `}_dockNeedsAttention(){return this._config.vacuums.some(t=>{const e=this._intAttrs(t)?.dock_status,o=e?.dock_error_status;return null!=o&&0!==o&&"0"!==o})}_dockTier(t){const e=this._intAttrs(t)?.dock_status?.dock_type;return null==e||0===e?"none":1===e||5===e?"empty":"full"}_renderDockSheet(){if(!this._dockSheetOpen)return G;const t=this._config.vacuums.filter(t=>"none"!==this._dockTier(t)||this._careItems(t).length>0);if(!t.length)return G;const e=Math.min(this._dockSheetIdx,t.length-1),o=t[e],i=this._dockTier(o),s=this._intAttrs(o)?.dock_status,n=t=>()=>{this._call("anyvac",t,{entity_id:o.entity})},a=this._careItems(o),r=t=>e=>{e.stopPropagation();const o=t.entity??t.reset,i=new Map(this._careResetPending);i.set(o,Date.now()),this._careResetPending=i,setTimeout(()=>{if(this._careResetPending.get(o)===i.get(o)){const t=new Map(this._careResetPending);t.delete(o),this._careResetPending=t}},4e4),this._call("button","press",{entity_id:t.reset})};return q`
      <div class="dock-sheet">
        ${t.length>1?q`
          <div class="dock-sheet-tabs">
            ${t.map((t,o)=>q`
              <button class="dock-sheet-tab ${o===e?"on":""}"
                style=${vt({borderColor:this._color(t)})}
                title=${t.name??t.entity}
                @click=${t=>{t.stopPropagation(),this._dockSheetIdx=o}}>
                ${t.image?q`<img src=${t.image} alt="" />`:q`<ha-icon icon="mdi:robot-vacuum" style=${vt({color:this._color(t)})}></ha-icon>`}
              </button>`)}
          </div>`:G}
        ${this._config.debug&&s?q`
          <div class="dock-sheet-debug">
            ${Object.entries(s).filter(([,t])=>null!=t).map(([t,e])=>q`<span>${t}: ${String(e)}</span>`)}
          </div>`:G}
        ${"none"!==i?q`
          <div class="dock-sheet-actions">
            <button class="dock-sheet-action" @click=${n("dock_empty")}>
              <ha-icon icon="mdi:delete-empty"></ha-icon><span>Empty</span>
            </button>
            ${"full"===i?q`
              <button class="dock-sheet-action" @click=${n("dock_wash")}>
                <ha-icon icon="mdi:water"></ha-icon><span>Wash</span>
              </button>
              <button class="dock-sheet-action" @click=${n("dock_dry")}>
                <ha-icon icon="mdi:hair-dryer"></ha-icon><span>Dry</span>
              </button>
              <button class="dock-sheet-action" @click=${n("dock_pump")}>
                <ha-icon icon="mdi:water-pump"></ha-icon><span>Pump</span>
              </button>
              <button class="dock-sheet-action" @click=${n("dock_self_clean")}>
                <ha-icon icon="mdi:autorenew"></ha-icon><span>Self-clean</span>
              </button>`:G}
          </div>`:G}
        ${a.length?q`
          <div class="dock-sheet-care">
            ${a.map(t=>q`
              <div class="dock-sheet-care-row">
                <span class="dock-sheet-care-label">${t.label}</span>
                ${t.binary?q`<span class="dock-sheet-care-badge ${"on"===this.hass.states[t.binary]?.state?"warn":""}">
                      ${"on"===this.hass.states[t.binary]?.state?"⚠":"OK"}
                    </span>`:q`<span class="dock-sheet-care-value">${this._careValue(t)}</span>`}
                ${t.reset?(()=>{const e=this._careResetPending.has(t.entity??t.reset);return q`
                    <button class="dock-sheet-care-reset ${e?"pending":""}"
                      title="Reset" ?disabled=${e} @click=${r(t)}>
                      <ha-icon icon=${e?"mdi:loading":"mdi:refresh"}></ha-icon>
                    </button>`})():G}
              </div>`)}
          </div>`:G}
      </div>
    `}_renderModeSheet(){if(!this._modeSheetOpen)return G;const t=this._planMode,e=t=>e=>{e.stopPropagation(),this._planMode=t,this._modeSheetOpen=!1},o=(o,i,s)=>q`
      <button class="dock-mode ${t===o?"on":""}" @click=${e(o)}>
        <ha-icon icon=${i}></ha-icon><span>${s}</span>
      </button>`;return q`
      <div class="dock-sheet">
        <div class="dock-head">
          ${o("dry","mdi:broom","Dry")}${o("wet","mdi:water","Wet")}${o("both","mdi:water-plus","Both")}
        </div>
      </div>
    `}_renderStartBar(){const t=this._config.vacuums,e=t.some(t=>this._intAttrs(t)),o=this._allRoomKeys().filter(e=>this._isRoomSelectedAny(e,t)),i=o.length?o:this._allRoomKeys(),s=t.some(t=>this._isCleaning(t)),n="startbar",a={dry:"mdi:broom",wet:"mdi:water",both:"mdi:water-plus"}[this._planMode],r={dry:"Dry",wet:"Wet",both:"Both"}[this._planMode],l=q`
      <button class="start-seg start-seg--mode ${this._modeSheetOpen?"on":""}"
        title="Clean type — tap to change"
        @click=${t=>{t.stopPropagation(),this._dockSheetOpen=!1,this._modeSheetOpen=!this._modeSheetOpen}}>
        <ha-icon icon=${a}></ha-icon>
        <span>${r}</span>
      </button>`,c=t.some(t=>"none"!==this._dockTier(t)||this._careItems(t).length>0),d=c?q`
      <button class="start-seg start-seg--dock ${this._dockSheetOpen?"on":""}"
        title="Dock control"
        @click=${t=>{t.stopPropagation(),this._modeSheetOpen=!1,this._dockSheetOpen=!this._dockSheetOpen}}>
        <ha-icon icon="mdi:home-outline"></ha-icon>
        ${this._dockNeedsAttention()?q`<span class="dock-mode-dot"></span>`:G}
      </button>`:G;if(s)return q`
        <div class="start-row">
          ${l}
          <button class="start-bar start-bar--cancel ${this._holdId===n?"action-btn--holding":""}"
            @pointerdown=${this._holdStart(n,()=>{if(e)this._call("anyvac","cancel",{});else for(const e of t)this._isCleaning(e)&&this._pause(e)})}
            @pointermove=${this._holdMove}
            @pointerup=${this._holdEnd} @pointerleave=${this._holdEnd} @pointercancel=${this._holdEnd}>
            <div class="hold-ring"></div>
            <ha-icon icon="mdi:stop"></ha-icon>
            <span>CANCEL · hold</span>
          </button>
          ${d}
        </div>`;const h=e&&i.length>0,p=this._etaFor(i,this._planMode,e),m=o.length?o.length+(1===o.length?" room":" rooms"):"whole home";return q`
      <div class="start-row">
        ${l}
        <button class="start-bar ${h&&this._holdId===n?"action-btn--holding":""}"
          ?disabled=${!h}
          title=${e?"":"Requires the AnyVac integration"}
          @pointerdown=${h?this._holdStart(n,()=>this._runOrchestrated(i,this._planMode)):G}
          @pointermove=${this._holdMove}
          @pointerup=${this._holdEnd} @pointerleave=${this._holdEnd} @pointercancel=${this._holdEnd}>
          <div class="hold-ring"></div>
          <ha-icon icon="mdi:play"></ha-icon>
          <span>START · ${m}${p?" · ~"+p+" min":""}</span>
        </button>
        ${d}
      </div>`}_settingPresets(t){if(t.presets&&t.presets.length)return t.presets;const e=t.clean_action;return[{id:"default",label:"Default",suction_level:e?.suction_level,mop_mode:e?.mop_mode,mop_intensity:e?.mop_intensity,repeat:e?.repeat}]}_activePresetId(t){const e=this._settingPresets(t),o=this._activePresets.get(t.entity);return o&&e.some(t=>t.id===o)?o:e[0]?.id??"default"}_activePreset(t){const e=this._settingPresets(t),o=this._activePresetId(t);return e.find(t=>t.id===o)??e[0]}_setActivePreset(t,e){const o=new Map(this._activePresets);o.set(t.entity,e),this._activePresets=o}_renderPresetChips(t){const e=this._settingPresets(t);if(e.length<2)return G;const o=this._activePresetId(t),i=this._color(t);return q`
      <div class="preset-chip-row">
        ${e.map(e=>{const s=e.id===o;return q`<button
            @click=${o=>{o.stopPropagation(),this._setActivePreset(t,e.id)}}
            style=${vt({display:"inline-flex",alignItems:"center",gap:"4px",flexShrink:"0",padding:"4px 10px",borderRadius:"14px",cursor:"pointer",fontSize:"12px",lineHeight:"1",border:"1px solid "+(s?i:"rgba(255,255,255,0.15)"),background:s?this._colorBg(t):"rgba(255,255,255,0.04)",color:s?"white":"rgba(255,255,255,0.55)"})}
          >
            ${e.icon?q`<ha-icon icon=${e.icon} style="--mdc-icon-size:14px"></ha-icon>`:G}
            <span>${e.label}</span>
          </button>`})}
      </div>
    `}async _startClean(t){const e=this._roomsFor(t).filter(e=>this._isRoomSelected(e,t));if(0===e.length)return;if(this._intAttrs(t)){const o=this._activePreset(t),i=this._liveCleanType(t),s={};return o.suction_level&&(s.fan_speed=o.suction_level),"wet"===i&&o.mop_mode&&(s.mop_mode=o.mop_mode),"wet"===i&&o.mop_intensity&&(s.mop_intensity=o.mop_intensity),o.repeat&&o.repeat>1&&(s.repeat=o.repeat),void await this._call("anyvac","clean",{rooms:e.map(t=>t.key),mode:i,vacuums:[t.entity],...Object.keys(s).length?{settings:{[i]:{[t.entity]:s}}}:{}})}if(!t.clean_action)return;if("script"===t.clean_action.type){const o=t.clean_action,i={};for(const[s,n]of Object.entries(o.variables??{}))i[s]=n.replace("{{ entity }}",t.entity).replace("{{ selected_segments }}",JSON.stringify(e.map(t=>t.segment_id).filter(Boolean))).replace("{{ selected_room_keys }}",JSON.stringify(e.map(t=>t.key))).replace("{{ selected_area_ids }}",JSON.stringify(e.map(t=>t.area_id).filter(Boolean)));return void await this._call("script","turn_on",{entity_id:o.entity_id,variables:i})}const o=t.clean_action,i=this._activePreset(t),s=i.mop_mode??o.mop_mode,n=i.mop_intensity??o.mop_intensity,a=i.suction_level??o.suction_level;if(o.mop_mode_entity&&s&&await this._call("select","select_option",{entity_id:o.mop_mode_entity,option:s}),o.mop_intensity_entity&&n&&await this._call("select","select_option",{entity_id:o.mop_intensity_entity,option:n}),a&&await this._call("vacuum","set_fan_speed",{entity_id:t.entity,fan_speed:a}),"native-area"===t.clean_action.type)try{await this.hass.callService("vacuum","clean_area",{cleaning_area_id:e.map(t=>t.area_id??this._config.area_mappings?.[t.key]??t.key)},{entity_id:t.entity})}catch(t){console.error("[anyvac-card] vacuum.clean_area failed:",t)}else{const o=t.clean_action,i=e.map(t=>t.segment_id).filter(t=>void 0!==t);if(!i.length)return void console.error("[anyvac-card] no configured segment_ids for the selection; aborting");await this._call("vacuum","send_command",{entity_id:t.entity,command:"app_segment_clean",params:[{segments:i,repeat:o.repeat??1}]})}}_renderBadge(t,e){const o=this._shownSet.has(e),i=this._isCleaning(t),s=this._color(t),n=t.name??t.entity.split(".")[1]??t.entity,a=this._holdId==="badge-"+e,r=this._statusInfo(t)[1],l=i?this._colorBgActive(t):o?this._colorBg(t):"rgba(30,30,30,0.85)";return q`
      <button
        class="badge ${a?"badge--holding":""}"
        style=${vt({background:l,border:i?"3px solid "+r:o?"2px solid "+r:"2px solid rgba(255,255,255,0.18)",boxShadow:i?"0 0 18px "+r:o?"0 0 6px "+r:"none"})}
        @pointerdown=${t=>{t.preventDefault(),this._cancelHold(),this._holdId="badge-"+e,this._holdTimer=setTimeout(()=>{this._holdTimer=null,this._holdId=null,this._toggleShown(e)},kt)}}
        @pointerup=${()=>{null!==this._holdTimer?(this._cancelHold(),this._shownSet=new Set([e]),this._saveShown()):this._holdId=null}}
        @pointerleave=${this._holdEnd}
        @pointercancel=${this._holdEnd}
        aria-pressed=${o?"true":"false"}
        aria-label=${n}
      >
        <div class="hold-ring"></div>
        ${t.image?q`<img class="badge-img" src=${t.image} alt=${n} />`:q`<ha-icon class="badge-icon" icon="mdi:robot-vacuum" style=${vt({color:s})}></ha-icon>`}
        <span class="badge-name" style=${vt({color:o?"white":"rgba(255,255,255,0.55)"})}>
          ${n}
        </span>
      </button>
    `}_renderVacuumPicker(){const t=this._config.vacuums;return t.length?q`<div class="vac-picker">${t.map((t,e)=>this._renderBadge(t,e))}</div>`:G}_renderGlobalBadge(t,e){const o=this._isGlobalActive(t),i=this._resolveColor(t.color,"orange"),s="global-"+e,n=this._holdId===s,a=o?this._resolveBg(t.color,"orange",!0):"rgba(30,30,30,0.85)";return q`
      <button
        class="badge badge--global ${n?"badge--holding":""}"
        style=${vt({background:a,border:o?"3px solid "+i:"2px solid rgba(255,255,255,0.18)",boxShadow:o?"0 0 18px "+i+"B0":"none"})}
        @pointerdown=${this._holdStart(s,()=>this._triggerGlobal(t))}
        @pointermove=${this._holdMove}
        @pointerup=${this._holdEnd}
        @pointerleave=${this._holdEnd}
        @pointercancel=${this._holdEnd}
        aria-label=${t.name}
        title=${"Hold to trigger: "+t.name}
      >
        <div class="hold-ring"></div>
        ${t.image?q`<img class="badge-img" src=${t.image} alt=${t.name} />`:q`<ha-icon class="badge-icon" icon="mdi:home-floor-a" style=${vt({color:i})}></ha-icon>`}
        <span class="badge-name" style=${vt({color:o?"white":"rgba(255,255,255,0.55)"})}>
          ${t.name}
        </span>
      </button>
    `}_toggleMode(t,e){this._mapMode===e&&this._modeEntity===t?(this._mapMode="normal",this._modeEntity=null):(this._mapMode=e,this._modeEntity=t)}_armMode(t){this._mapMode===t&&"*"===this._modeEntity?(this._mapMode="normal",this._modeEntity=null):(this._mapMode=t,this._modeEntity="*",this._pinPending=null,this._zonePending=null,this._zoneRectShown=null,this._zoneEdit=null)}_modeCandidates(){return this._config.vacuums.filter(t=>this._intAttrs(t)&&this._mapEntityFor(t))}_isModeCandidate(t){return this._modeEntity===t.entity||"*"===this._modeEntity&&!!this._intAttrs(t)&&!!this._mapEntityFor(t)}_hasZoneEditTarget(t){return this._isModeCandidate(t)||!!this._zonePending?.[t.entity]}_zoneHit(t,e,o){const i=Math.min(t.x0,t.x1),s=Math.max(t.x0,t.x1),n=Math.min(t.y0,t.y1),a=Math.max(t.y0,t.y1),r=[["nw",i,n],["ne",s,n],["sw",i,a],["se",s,a]];for(const[t,i,s]of r)if(Math.abs(e-i)<=4&&Math.abs(o-s)<=4)return t;return e>=i&&e<=s&&o>=n&&o<=a?"move":null}_renderZoneHandles(){return q`
      <div class="zone-handle zone-handle--nw"></div>
      <div class="zone-handle zone-handle--ne"></div>
      <div class="zone-handle zone-handle--sw"></div>
      <div class="zone-handle zone-handle--se"></div>
    `}_zoneRectFor(t,e){return"zone"===this._mapMode&&this._isModeCandidate(t)&&this._zoneDrag?this._zoneDrag:this._zoneRectShown?"merged"===this._config.map_mode?e?this._zoneRectShown:null:this._zonePending?.[t.entity]?this._zoneRectShown:null:null}_refreshMap(t){const e=this._mapEntityFor(t);e&&this.hass.callService("homeassistant","update_entity",{entity_id:e})}_clampPct(t){return Math.min(100,Math.max(0,t))}_onMapClick(t,e){if("pin"!==this._mapMode)return;if(!this._isModeCandidate(t))return;if("*"===this._modeEntity&&"merged"===this._config.map_mode){const t={};for(const o of this._modeCandidates()){const i=this._clickToContent(o,e.clientX,e.clientY);i&&(t[o.entity]={x:this._clampPct(i.x),y:this._clampPct(i.y)})}return this._pinPending=Object.keys(t).length?t:null,this._mapMode="normal",void(this._modeEntity=null)}const o=this._clickToContent(t,e.clientX,e.clientY);this._dbg=o?"goto "+o.x.toFixed(1)+"%, "+o.y.toFixed(1)+"%":"(map element not found)",o&&this._call("anyvac","goto",{entity_id:t.entity,x_pct:this._clampPct(o.x),y_pct:this._clampPct(o.y)}),this._mapMode="normal",this._modeEntity=null}_clickToContent(t,e,o){const i=this._mapEntityFor(t)?this.renderRoot?.querySelector(`.map-img[data-entity="${t.entity.replace(/"/g,'\\"')}"]`):null;if(!i)return null;const s=i.getBoundingClientRect(),n=(s.left+s.right)/2,a=(s.top+s.bottom)/2,r=getComputedStyle(i).transform,l=new DOMMatrix("none"===r?void 0:r),c=l.a*l.d-l.b*l.c;if(Math.abs(c)<1e-9)return null;const d=e-n,h=o-a,p=(l.d*d-l.c*h)/c,m=(-l.b*d+l.a*h)/c;return{x:100*(p/(i.offsetWidth||1)+.5),y:100*(m/(i.offsetHeight||1)+.5)}}_onZoneDown(t,e){if(!(!!this._zoneRectShown&&this._hasZoneEditTarget(t)||"zone"===this._mapMode&&this._isModeCandidate(t)))return;const o=e.currentTarget;o.setPointerCapture?.(e.pointerId);const i=o.getBoundingClientRect(),s=(e.clientX-i.left)/i.width*100,n=(e.clientY-i.top)/i.height*100;if(this._zoneRectShown){const t=this._zoneHit(this._zoneRectShown,s,n);if(t){const e=this._zoneRectShown,o=Math.min(e.x0,e.x1),i=Math.max(e.x0,e.x1),a=Math.min(e.y0,e.y1),r=Math.max(e.y0,e.y1);return this._zoneRectShown={x0:o,y0:a,x1:i,y1:r},void(this._zoneEdit="move"===t?{type:"move",offsetX:s-o,offsetY:n-a,width:i-o,height:r-a}:{type:t})}if("zone"!==this._mapMode)return}this._zonePending=null,this._zoneRectShown=null,this._zoneEdit=null,this._zoneMulti="*"===this._modeEntity&&"merged"===this._config.map_mode,this._zoneDrag={x0:s,y0:n,x1:s,y1:n}}_onZoneMove(t,e){if(this._zoneEdit&&this._zoneRectShown){const t=e.currentTarget.getBoundingClientRect(),o=(e.clientX-t.left)/t.width*100,i=(e.clientY-t.top)/t.height*100,s=3,n=this._zoneEdit;if("move"===n.type){const{offsetX:t,offsetY:e,width:s,height:a}=n,r=Math.min(100-s,Math.max(0,o-t)),l=Math.min(100-a,Math.max(0,i-e));this._zoneRectShown={x0:r,y0:l,x1:r+s,y1:l+a}}else{let{x0:t,y0:e,x1:a,y1:r}=this._zoneRectShown;const l=this._clampPct(o),c=this._clampPct(i);"nw"===n.type?(t=Math.min(l,a-s),e=Math.min(c,r-s)):"ne"===n.type?(a=Math.max(l,t+s),e=Math.min(c,r-s)):"sw"===n.type?(t=Math.min(l,a-s),r=Math.max(c,e+s)):(a=Math.max(l,t+s),r=Math.max(c,e+s)),this._zoneRectShown={x0:t,y0:e,x1:a,y1:r}}return}if(!this._zoneDrag||"zone"!==this._mapMode||!this._isModeCandidate(t))return;const o=e.currentTarget.getBoundingClientRect();this._zoneDrag={x0:this._zoneDrag.x0,y0:this._zoneDrag.y0,x1:(e.clientX-o.left)/o.width*100,y1:(e.clientY-o.top)/o.height*100}}_onZoneUp(t,e){const o=e.currentTarget;if(this._zoneEdit)return this._zoneEdit=null,void this._commitZoneRect(t,o);if(!this._zoneDrag||"zone"!==this._mapMode||!this._isModeCandidate(t))return;const i=Math.abs(this._zoneDrag.x1-this._zoneDrag.x0)>2||Math.abs(this._zoneDrag.y1-this._zoneDrag.y0)>2;if(this._zoneRectShown=i?this._zoneDrag:null,this._zoneDrag=null,!i)return;this._zoneMulti&&(this._mapMode="normal",this._modeEntity=null),this._commitZoneRect(t,o)}_commitZoneRect(t,e){const o=this._zoneRectShown;if(!o)return;const i=e.getBoundingClientRect(),s=i.left+Math.min(o.x0,o.x1)/100*i.width,n=i.top+Math.min(o.y0,o.y1)/100*i.height,a=i.left+Math.max(o.x0,o.x1)/100*i.width,r=i.top+Math.max(o.y0,o.y1)/100*i.height;if(this._zoneMulti){const t={};for(const e of this._modeCandidates()){const o=this._clickToContent(e,s,n),i=this._clickToContent(e,a,r);o&&i&&(t[e.entity]={x1:this._clampPct(Math.min(o.x,i.x)),y1:this._clampPct(Math.min(o.y,i.y)),x2:this._clampPct(Math.max(o.x,i.x)),y2:this._clampPct(Math.max(o.y,i.y))})}return void(this._zonePending=Object.keys(t).length?t:null)}const l=this._clickToContent(t,s,n),c=this._clickToContent(t,a,r);l&&c&&(this._zonePending={[t.entity]:{x1:this._clampPct(Math.min(l.x,c.x)),y1:this._clampPct(Math.min(l.y,c.y)),x2:this._clampPct(Math.max(l.x,c.x)),y2:this._clampPct(Math.max(l.y,c.y))}})}_confirmZone(t){const e=this._zonePending?.[t.entity];if(!e)return;const o=t.clean_action;if(this._call("anyvac","zone_clean",{entity_id:t.entity,x1_pct:e.x1,y1_pct:e.y1,x2_pct:e.x2,y2_pct:e.y2,repeat:o?.repeat??1}),this._zonePending){const e={...this._zonePending};delete e[t.entity],this._zonePending=Object.keys(e).length?e:null,this._zonePending||(this._zoneRectShown=null)}this._zoneDrag=null,this._zoneEdit=null,this._mapMode="normal",this._modeEntity=null}_confirmPin(t){const e=this._pinPending?.[t.entity];if(e&&(this._call("anyvac","goto",{entity_id:t.entity,x_pct:e.x,y_pct:e.y}),this._pinPending)){const e={...this._pinPending};delete e[t.entity],this._pinPending=Object.keys(e).length?e:null}}_cancelPin(){this._pinPending=null}_cancelZone(){this._zonePending=null,this._zoneDrag=null,this._zoneRectShown=null,this._zoneEdit=null}_renderMetaBar(t){const e=t.filter(t=>this._mapEntityFor(t));if(!e.length)return G;const o=this._modeCandidates().length>0&&!this._narrow,i=this._narrow?"Not available while the map is rotated":o?"":"Requires the AnyVac integration (≥ 0.18) + map entity",s="*"===this._modeEntity?this._mapMode:"normal",n=this._allRoomKeys().filter(e=>this._isRoomSelectedAny(e,t)),a=n.length?n:this._allRoomKeys(),r=t.some(t=>this._intAttrs(t));r&&a.length&&this._fetchPlan(a,this._planMode);const l=r?this._planPreview?.unsequenced??[]:[],c=this._unassignedRooms(a,this._planMode,r),d=this._pinPending?Object.keys(this._pinPending).length:0,h=this._zonePending?Object.keys(this._zonePending).length:0;return q`
      <div class="meta-bar">
        <div class="meta-bar-cluster">
          <button class="mtbtn ${"pin"===s?"on":""}" ?disabled=${!o}
            @click=${()=>this._armMode("pin")} title=${i||"Pin & Go"}>
            <ha-icon icon="mdi:map-marker-radius"></ha-icon><span>Pin &amp; Go</span>
          </button>
          <button class="mtbtn ${"zone"===s?"on":""}" ?disabled=${!o}
            @click=${()=>this._armMode("zone")} title=${i||"Zone clean"}>
            <ha-icon icon="mdi:select-drag"></ha-icon><span>Zone</span>
          </button>
        </div>
        <div class="meta-bar-spacer"></div>
        <div class="meta-bar-cluster meta-bar-cluster--right">
          ${c.length?q`<span class="mtbtn mtbtn--stat mtbtn--err"
              title="${c.length} selected room${c.length>1?"s have":" has"} no available robot for the ${this._planMode} pass — it/they will be silently skipped. Check vacuum roles/config.">
            <ha-icon icon="mdi:robot-off"></ha-icon><b>${c.length}</b>
          </span>`:G}
          ${l.length?q`<span class="mtbtn mtbtn--stat mtbtn--warn"
              title="${l.length} selected room${l.length>1?"s have":" has"} no cleaning order set — the time may be off. Set the order in the card editor's Maps tab.">
            <ha-icon icon="mdi:sort-variant-off"></ha-icon><b>${l.length}</b>
          </span>`:G}
          ${this._renderLayerToggleCompact(t)}
          ${this._config.layout?q`<button class="mtbtn ${this._flipEff?"on":""}"
              title="Flip map 180° for this screen (this session only — the card editor's Layout section sets a permanent default)"
              @click=${()=>this._toggleFlipLive()}>
            <ha-icon icon="mdi:flip-vertical"></ha-icon>
          </button>`:G}
          <div class="meta-bar-divider"></div>
          <button class="mtbtn mtbtn--ghost" title="Refresh maps" @click=${t=>{const o=t.currentTarget;o.classList.remove("mtbtn--spin"),o.offsetWidth,o.classList.add("mtbtn--spin");for(const t of e)this._refreshMap(t)}}>
            <ha-icon icon="mdi:refresh"></ha-icon>
          </button>
        </div>
      </div>
      ${h?q`<div class="calib-panel">
          <div>Zone ready for ${h} vacuum${h>1?"s":""} — drag the box or its corners to adjust, then pick one on its status card below.</div>
          <div class="calib-actions"><button class="mtbtn" @click=${()=>this._cancelZone()}>Cancel</button></div>
        </div>`:"zone"===s?q`<div class="calib-panel">Drag a rectangle on the map to set a cleaning zone.</div>`:G}
      ${d?q`<div class="calib-panel">
          <div>Pin ready for ${d} vacuum${d>1?"s":""} — pick one on its status card below.</div>
          <div class="calib-actions"><button class="mtbtn" @click=${()=>this._cancelPin()}>Cancel</button></div>
        </div>`:"pin"===s?q`<div class="calib-panel">Tap the map to drop a pin.</div>`:G}
    `}_renderMapTools(t){if(!t.map&&!t.image_base&&!this._mapEntityFor(t))return G;const e=this._mapEntityFor(t),o=!!this._intAttrs(t)&&!!e&&!this._narrow,i=this._narrow?"Not available while the map is rotated":this._intAttrs(t)&&e?"":"Requires the AnyVac integration (≥ 0.18) + map entity",s=this._modeEntity===t.entity?this._mapMode:"normal";return q`
      <div class="map-tools">
        ${this._config.layout&&this._config.vacuums.length>1?q`<span class="map-tools-label">${t.name??t.entity}</span>`:G}
        ${e?q`<button class="mtbtn" @click=${()=>this._refreshMap(t)} title="Refresh map">
          <ha-icon icon="mdi:refresh"></ha-icon><span>Refresh</span>
        </button>`:G}
        <button class="mtbtn ${"pin"===s?"on":""}" ?disabled=${!o}
          @click=${()=>this._toggleMode(t.entity,"pin")} title=${i||"Pin & Go"}>
          <ha-icon icon="mdi:map-marker-radius"></ha-icon><span>Pin &amp; Go</span>
        </button>
        <button class="mtbtn ${"zone"===s?"on":""}" ?disabled=${!o}
          @click=${()=>this._toggleMode(t.entity,"zone")} title=${i||"Zone clean"}>
          <ha-icon icon="mdi:select-drag"></ha-icon><span>Zone</span>
        </button>
        ${!this._dbg||!this._config.debug&&this._config.layout?G:q`<span style="font-size:11px;opacity:0.65;align-self:center;font-family:monospace">${this._dbg}</span>`}
      </div>
      ${"pin"===s?q`<div class="calib-panel">Tap the map to send the robot there.</div>`:G}
      ${"zone"===s?q`<div class="calib-panel">
        ${this._zonePending?.[t.entity]?q`<div>Clean this zone? Drag the box or its corners to adjust.</div>
              <div class="calib-actions">
                <button class="mtbtn on" @click=${()=>this._confirmZone(t)}>Clean zone</button>
                <button class="mtbtn" @click=${()=>this._cancelZone()}>Cancel</button>
              </div>`:q`Drag a rectangle on the map to set a cleaning zone.`}
      </div>`:G}
    `}_baseHeightFor(t){return"merged"===this._config.map_mode?this._config.base_height??this._config.vacuums.find(t=>t.base_height)?.base_height:t.base_height}_wrapAspect(t){return"number"==typeof t&&t>0&&this._cardW>0?Math.max(.2,(this._cardW-16)/t):this._mapAR>.1?this._mapAR:3.636}_effectiveSeat(t){this._memoSync();const e=this._seatMemo.get(t.entity);if(e)return e;const o=Dt(this._config,t,this._intAttrs(t),this._wrapAspect(this._baseHeightFor(t)));return this._seatMemo.set(t.entity,o),o}_renderIntegrationOverlay(t,e,o="both"){const i=this._intAttrs(t);if(!i)return G;const s=i.image_dims;if(!s)return G;const n=s.scale??1;let a=(s.width??0)*n,r=(s.height??0)*n;const l=s.rotation??0;if(90===l||270===l){const t=a;a=r,r=t}if(!a||!r)return G;const c=this._color(t),d=Math.max(a,r)/55,h=t=>(Array.isArray(t)?t:[]).map(t=>t.x.toFixed(1)+","+t.y.toFixed(1)).join(" "),p=this._vacCleanType(t),m=this._layersEff(),u=m.dry&&p.dry,_=m.wet&&p.wet,g=u&&Array.isArray(i.path_dry_px)?i.path_dry_px.map(t=>h(t)).filter(t=>t.length>0):[],f=_&&Array.isArray(i.path_wet_px)?i.path_wet_px.map(t=>h(t)).filter(t=>t.length>0):[],b=i.vacuum_position_px,y=b?{x:b.x,y:b.y}:null;let v=null;if(y&&null!=b.a){const t=b.a*Math.PI/180;v={x:y.x+1.3*d*Math.cos(t),y:y.y-1.3*d*Math.sin(t)}}const x={left:50+(e?.offset_x??0)+"%",top:50+(e?.offset_y??0)+"%",width:(e?.scale??100)+"%",aspectRatio:a+" / "+r,transform:"translate(-50%,-50%) rotate("+(e?.rotation??0)+"deg)"},w=.35*d*((t.path_width??100)/100),$=w.toFixed(2),k=(2.6*w*((t.mop_band_width??100)/100)).toFixed(2),S=((t.mop_band_opacity??28)/100).toFixed(2),R=t.mop_path_color||"#40a9ff",M=f.length?L`${f.map(t=>L`<polyline points=${t} fill="none" stroke=${R} stroke-width=${k} stroke-linejoin="round" stroke-linecap="round" opacity=${S}></polyline>`)}`:G,A=f.length?L`${f.map(t=>L`<polyline points=${t} fill="none" stroke=${R} stroke-width=${$} stroke-linejoin="round" stroke-linecap="round" opacity="0.9"></polyline>`)}`:G,z=g.length?L`${g.map(e=>L`<polyline points=${e} fill="none" stroke=${t.path_color||c} stroke-width=${$} stroke-linejoin="round" stroke-linecap="round" opacity="0.85"></polyline>`)}`:G,P=!(!t.robot_image_on_map||!t.image),C=2.6*d*((t.robot_size??100)/100),E=(b&&null!=b.a?b.a:0)+(t.robot_image_rotation??0),T=y?P?L`<image href=${t.image} x=${(y.x-C/2).toFixed(1)} y=${(y.y-C/2).toFixed(1)} width=${C.toFixed(1)} height=${C.toFixed(1)} preserveAspectRatio="xMidYMid meet" transform=${"rotate("+E+" "+y.x.toFixed(1)+" "+y.y.toFixed(1)+")"}></image>`:L`${v?L`<line x1=${y.x.toFixed(1)} y1=${y.y.toFixed(1)} x2=${v.x.toFixed(1)} y2=${v.y.toFixed(1)} stroke="#ffffff" stroke-width=${(.3*d).toFixed(2)} stroke-linecap="round"></line>`:G}<circle cx=${y.x.toFixed(1)} cy=${y.y.toFixed(1)} r=${d.toFixed(1)} fill=${c} stroke="#ffffff" stroke-width=${(.18*d).toFixed(2)}></circle>`:G,F=y&&this._hasError(t),D="avc-err-blur-"+t.entity.replace(/[^a-zA-Z0-9]/g,"-"),O=F?L`<defs><filter id=${D} x="-150%" y="-150%" width="400%" height="400%">
              <feGaussianBlur stdDeviation=${(.5*d).toFixed(2)}></feGaussianBlur>
            </filter></defs>
            <circle class="avc-err-halo" cx=${y.x.toFixed(1)} cy=${y.y.toFixed(1)} r=${(2.2*d).toFixed(1)}
              fill="#ff3b30" filter=${"url(#"+D+")"}></circle>`:G,I=L`${M}${A}${z}`,V=L`${O}${T}`,N="paths"===o?I:"marker"===o?V:L`${I}${V}`;return q`<svg class="map-vector" viewBox="0 0 ${a} ${r}" preserveAspectRatio="none" style=${vt(x)}>${N}</svg>`}_onLayerDown(t){this._layerHeld=!1,this._layerHoldTimer=window.setTimeout(()=>{this._layerHeld=!0,this._layerMenu=this._layerMenu===t?null:t},380)}_onLayerUp(){null!==this._layerHoldTimer&&(window.clearTimeout(this._layerHoldTimer),this._layerHoldTimer=null)}_onLayerClick(t){if(this._layerHeld)return void(this._layerHeld=!1);const e=this._layersEff(),o={...e,[t]:!e[t]},i=this._selSensor();i&&this.hass.states[i]?.attributes?.view_layers?this._call("anyvac","set_layers",o):this._layers=o,this._layerMenu=null}_renderLayerMenu(t,e){const o=this._mergedRoomDefs(t);return q`
      <div class="layer-menu">
        <div class="layer-menu-head">
          <ha-icon icon=${"dry"===e?"mdi:broom":"mdi:water"}></ha-icon>
          <span>${"dry"===e?"Dry":"Wet"} \u00b7 last cleaned</span>
        </div>
        ${o.map(({r:o,v:i})=>{const s=this._intRoomRec(i,o),n=this._ageDaysFromIso(s?.[e]),a=this._isRoomSelectedAny(o.key,t);return q`
            <button class="layer-menu-row ${a?"on":""}" @click=${()=>this._toggleRoomAcross(o.key,t)}>
              <ha-icon icon=${o.icon??"mdi:square"}></ha-icon>
              <span class="lm-name">${o.name??o.key}</span>
              ${this._renderProgChip(this._roomProgForType(o,t,e))}
              <b style=${vt({color:this._colorForAgeDays(n)})}>${(t=>null===t?"—":t<1?"<1d":Math.round(t)+"d")(n)}</b>
            </button>
          `})}
      </div>
    `}_oldestAgeDays(t,e){let o=null;for(const i of t){if(!this._intAttrs(i))continue;const t=this._intAttrs(i)?.rooms_last_cleaned;if(t)for(const i of Object.values(t)){const t=this._ageDaysFromIso(i?.[e]);null!==t&&(null===o||t>o)&&(o=t)}}return o}_ageBadgeStr(t){return null===t?"—":t<1?"<1d":Math.round(t)+"d"}_renderLayerToggleCompact(t){const e=t.filter(t=>this._intAttrs(t));if(!e.length)return G;const o=this._layersEff();return q`
      <button class="mtbtn ${o.dry?"on":""}" title="Dry layer visibility \u2014 tap to toggle"
        @click=${()=>this._onLayerClick("dry")}>
        <ha-icon icon="mdi:broom"></ha-icon><span>${this._ageBadgeStr(this._oldestAgeDays(e,"dry"))}</span>
      </button>
      <button class="mtbtn ${o.wet?"on":""}" title="Wet layer visibility \u2014 tap to toggle"
        @click=${()=>this._onLayerClick("wet")}>
        <ha-icon icon="mdi:water"></ha-icon><span>${this._ageBadgeStr(this._oldestAgeDays(e,"wet"))}</span>
      </button>
    `}_renderLayerToggles(t){const e=t.filter(t=>this._intAttrs(t));if(!e.length)return G;const o=t=>this._oldestAgeDays(e,t),i=t=>this._ageBadgeStr(t),s=this._layersEff();return q`
      <div class="layer-toggles">
        <button class="layer-btn ${s.dry?"on":""}" title="Dry \u2014 tap to toggle, hold for rooms"
          @pointerdown=${()=>this._onLayerDown("dry")} @pointerup=${()=>this._onLayerUp()} @pointerleave=${()=>this._onLayerUp()}
          @click=${()=>this._onLayerClick("dry")}>
          <ha-icon icon="mdi:broom"></ha-icon><span>${i(o("dry"))}</span>
        </button>
        <button class="layer-btn ${s.wet?"on":""}" title="Wet \u2014 tap to toggle, hold for rooms"
          @pointerdown=${()=>this._onLayerDown("wet")} @pointerup=${()=>this._onLayerUp()} @pointerleave=${()=>this._onLayerUp()}
          @click=${()=>this._onLayerClick("wet")}>
          <ha-icon icon="mdi:water"></ha-icon><span>${i(o("wet"))}</span>
        </button>
        ${this._layerMenu?this._renderLayerMenu(e,this._layerMenu):G}
      </div>
    `}_mergedRoomDefs(t){const e=t[0];if(this._config.rooms?.length&&e)return this._roomsFor(e).map(t=>({r:t,v:e}));const o=new Set,i=[];for(const e of t)for(const t of this._roomsFor(e))t.key&&!o.has(t.key)&&(o.add(t.key),i.push({r:t,v:e}));return i}_renderMergedRooms(t){const e=this._mergedRoomDefs(t),o=!e.some(({r:e})=>this._isRoomSelectedAny(e.key,t));return e.map(({r:e,v:i})=>this._renderRoomOverlay(e,i,{vacs:t,wholeHome:o}))}get _narrow(){const t=this._config.mobile_rotate;if("off"===t)return!1;if("always"===t||"on"===t)return!0;if(this._config.layout){const t="portrait"===this._profile?this._config.layout.portrait:this._config.layout.landscape,e=t?.crop?.mapOrientation;if("normal"===e)return!1;if("rotated"===e)return!0;const o=function(t,e,o){if(e<=4||o<=4||t<=0)return;const i=Math.min(e/t,o);return Math.min(e,o/t)>i}(this._mapAR,this._mapRegW,this._mapRegH);return void 0!==o?(this._lastRotate=o,o):this._lastRotate}return this._cardW>0&&this._cardW<500}get _flipEff(){if(null!==this._flipLive)return this._flipLive;if(!this._config.layout)return!1;const t="portrait"===this._profile?this._config.layout.portrait:this._config.layout.landscape;return!0===t?.crop?.flip}_toggleFlipLive(){this._flipLive=!this._flipEff,this._saveFlipLive()}get _stackTopology(){if("portrait"!==this._profile||!this._config.layout)return!1;const t=this._config.layout.portrait;if("split"===t?.topology)return!1;if("stack"===t?.topology)return!0;if(t?.columns?.length||t?.rows?.length||t?.place&&Object.keys(t.place).length)return!1;const e=this._mapAR>.1?this._mapAR:3.636,o=function(t,e,o,i={}){const{dockWidthFrac:s=.28,dockHeightPx:n=150,stackBias:a=1.5}=i;if(e<=4||o<=4||t<=0)return;const r=e*(1-s),l=Math.min(r/t,o),c=Math.max(o-n,0);return!(l>Math.min(e/t,c)*a)}(this._narrow?1/e:e,this._mapAvailW,this._mapAvailH);return void 0!==o?(this._lastStack=o,o):this._lastStack}_renderResponsive(t){if(!this._config.layout){if(!this._narrow)return t;const e=this._mapAR>.1?this._mapAR:3.636,o=this._cardW||this.clientWidth||360,i=1.4*("undefined"!=typeof window?window.innerHeight:800),s=o*e,n=s>i?i/s:1,a=Math.round(o*n),r=Math.round(s*n);return q`
        <div class="avc-rot" style="position:relative;width:${a}px;height:${r}px;margin:0 auto;overflow:hidden;--map-rot:90deg">
          <div style="position:absolute;top:0;left:0;width:${r}px;height:${a}px;transform-origin:top left;transform:translateX(${a}px) rotate(90deg)">
            ${t}
          </div>
        </div>
      `}if(this._mapRegW<=4||this._mapRegH<=4)return t;const e=this._mapAR>.1?this._mapAR:3.636,o=this._narrow,i=o?1/e:e,s=this._config.layout[this._profile]?.crop,n="cover"===s?.fit,a=this._mapRegW,r=this._mapRegH;let l,c;n?(l=Math.max(a,r*i),c=Math.max(r,l/i)):(l=Math.min(a,r*i),c=Math.min(r,l/i)),l=Math.floor(l),c=Math.floor(c);const d=-(l-a)/2+(s?.offset_x??0)/100*((l-a)/2),h=-(c-r)/2+(s?.offset_y??0)/100*((c-r)/2),p=(o?90:0)+(this._flipEff?180:0);if(0!==p){o&&(this._lastPortraitFitW=l);let e;return e=90===p?"transform-origin:top left;transform:translateX("+l+"px) rotate(90deg)":180===p?"transform-origin:center;transform:rotate(180deg)":"transform-origin:top left;transform:translateY("+c+"px) rotate(270deg)",q`
        <div class="avc-rot" style="position:relative;width:${a}px;height:${r}px;margin:0 auto;overflow:hidden;--map-rot:${p}deg">
          <div style="position:absolute;top:0;left:0;width:100%;height:100%;transform:translate(${d}px,${h}px)">
            <div style="position:absolute;top:0;left:0;width:${o?c:l}px;height:${o?l:c}px;${e}">
              ${t}
            </div>
          </div>
        </div>
      `}return q`
      <div style="position:relative;width:${a}px;height:${r}px;margin:0 auto;overflow:hidden">
        <div style="position:absolute;top:0;left:0;width:${l}px;height:${c}px;transform:translate(${d}px,${h}px)">
          ${t}
        </div>
      </div>
    `}_renderMergedMap(){const t=this._shownOrdered().map(t=>this._config.vacuums[t]);if(!t.length)return G;const e=t.find(t=>t.image_base?.src)??t[0],o=this._config.image_base??e.image_base,i=!!o?.src,s=this._config.base_height??e.base_height,n="number"==typeof s&&s>0,a=n?"map-wrap--fixed":i?"map-wrap--image":"",r=vt(n?{height:(s??0)+"px"}:{});return q`
      <div class="map-wrap ${a}" style=${r}>
        ${i?q`
          <img class="${"image-base-img"+(n?" image-base-img--fit":"")}" src=${o.src} alt="Floorplan" @load=${this._onFloorplanLoad}
            style=${vt({transform:"translate("+(o?.offset_x??0)+"%,"+(o?.offset_y??0)+"%) rotate("+(o?.rotation??0)+"deg) scale("+(o?.scale??100)/100+")"})} />
        `:G}
        ${t.map((t,e)=>{const o=this._mapEntityFor(t),s=o?this._mapUrl(o):null;if(!s)return G;const n=this._effectiveSeat(t),a=i||e>0;return q`<img class="map-img ${a?"map-img--overlay":""}" src=${s} alt="Vacuum map"
            data-entity=${t.entity}
            style=${vt({left:50+n.offset_x+"%",top:50+n.offset_y+"%",width:n.scale+"%",transform:"translate(-50%,-50%) rotate("+n.rotation+"deg)",opacity:t.hide_map?"0":String((t.overlay_opacity??(a?55:100))/100),mixBlendMode:t.overlay_blend??"normal"})} />`})}
        ${t.map(t=>this._intAttrs(t)?this._renderIntegrationOverlay(t,this._effectiveSeat(t),"paths"):G)}
        ${t.map(t=>this._intAttrs(t)?this._renderIntegrationOverlay(t,this._effectiveSeat(t),"marker"):G)}
        ${this._config.layout?G:this._renderLayerToggles(t)}
        ${this._renderMergedRooms(t)}
        ${t.map(t=>"normal"!==this._mapMode&&this._isModeCandidate(t)||this._zoneRectShown&&this._hasZoneEditTarget(t)?q`<div class="map-clickcatch" style="touch-action:none"
              @click=${e=>this._onMapClick(t,e)}
              @pointerdown=${e=>this._onZoneDown(t,e)}
              @pointermove=${e=>this._onZoneMove(t,e)}
              @pointerup=${e=>this._onZoneUp(t,e)}></div>`:G)}
        ${t.map((t,e)=>{const o=this._zoneRectFor(t,0===e);return o?q`<div class="zone-rect" style=${vt({left:Math.min(o.x0,o.x1)+"%",top:Math.min(o.y0,o.y1)+"%",width:Math.abs(o.x1-o.x0)+"%",height:Math.abs(o.y1-o.y0)+"%"})}>${this._renderZoneHandles()}</div>`:G})}
      </div>
    `}_renderMap(t){const e=t.base??(t.image_base?.src&&!t.map?.entity?"image":"map"),o=t.image_base,i=o?.src,s=this._mapEntityFor(t),n=s?this._mapUrl(s):null,a=("image"===e||"combined"===e)&&!!i,r=("map"===e||"combined"===e)&&!!n;if(!a&&!r)return G;const l=this._effectiveSeat(t),c="number"==typeof t.base_height&&t.base_height>0,d=c?"map-wrap--fixed":a?"map-wrap--image":"",h=vt(c?{height:(t.base_height??0)+"px"}:{});return q`
      <div class="map-wrap ${d}" style=${h}>
        ${a?q`
          <img class="${"image-base-img"+(c?" image-base-img--fit":"")}" src=${i} alt="Floorplan" @load=${this._onFloorplanLoad}
            style=${vt({transform:"translate("+(o?.offset_x??0)+"%,"+(o?.offset_y??0)+"%) rotate("+(o?.rotation??0)+"deg) scale("+(o?.scale??100)/100+")"})} />
        `:G}
        ${r?q`
          <img class="map-img ${a?"map-img--overlay":""}" src=${n} alt="Vacuum map"
            data-entity=${t.entity}
            style=${vt({left:50+l.offset_x+"%",top:50+l.offset_y+"%",width:l.scale+"%",transform:"translate(-50%,-50%) rotate("+l.rotation+"deg)",...t.hide_map?{opacity:"0"}:a?{opacity:String((t.overlay_opacity??55)/100),mixBlendMode:t.overlay_blend??"normal"}:{}})} />
        `:G}
        ${r?this._renderIntegrationOverlay(t,l):G}
        ${this._config.layout?G:this._renderLayerToggles([t])}
        ${(()=>{const e=this._roomsFor(t),o=!e.some(e=>this._isRoomSelected(e,t));return e.map(e=>this._renderRoomOverlay(e,t,{wholeHome:o}))})()}
        ${"normal"!==this._mapMode&&this._isModeCandidate(t)||this._zoneRectShown&&this._hasZoneEditTarget(t)?q`<div class="map-clickcatch" style="touch-action:none"
              @click=${e=>this._onMapClick(t,e)}
              @pointerdown=${e=>this._onZoneDown(t,e)}
              @pointermove=${e=>this._onZoneMove(t,e)}
              @pointerup=${e=>this._onZoneUp(t,e)}></div>`:G}
        ${(()=>{const e=this._zoneRectFor(t,!0);return e?q`<div class="zone-rect" style=${vt({left:Math.min(e.x0,e.x1)+"%",top:Math.min(e.y0,e.y1)+"%",width:Math.abs(e.x1-e.x0)+"%",height:Math.abs(e.y1-e.y0)+"%"})}>${this._renderZoneHandles()}</div>`:G})()}
      </div>
    `}_renderRoomAgeDots(t,e){const o=this._intRoomRec(e,t);if(o){const t=this._vacCleanType(e);if(!t.dry&&!t.wet)return G;const i=this._ageDaysFromIso(o.dry),s=this._ageDaysFromIso(o.wet);return q`
        <span class="room-age-dots">
          ${t.dry?q`<span class="room-age-dot" style=${vt({background:this._colorForAgeDays(i)})}></span>`:G}
          ${t.wet?q`<span class="room-age-dot" style=${vt({background:this._colorForAgeDays(s)})}></span>`:G}
        </span>
      `}return t.last_clean_entity?q`
      <span class="room-age-dots">
        <span class="room-age-dot" style=${vt({background:this._colorForAgeDays(this._roomAgeDays(t))})}></span>
      </span>
    `:G}_onRoomPointerDown(t,e){return o=>{e||(o.preventDefault(),this._cancelHold(),this._holdId="room-"+t.key,this._holdTimer=setTimeout(()=>{this._holdTimer=null,this._holdId=null,this._inspectKey=this._inspectKey===t.key?null:t.key},kt))}}_onRoomPointerUp(t,e,o,i){return()=>{if(!i)if(null!==this._holdTimer){if(this._cancelHold(),null!==this._inspectKey)return void(this._inspectKey=null);o?this._toggleRoomAcross(t.key,o):this._toggleRoom(t,e)}else this._holdId=null}}_renderRoomInspect(t,e,o,i){const s=this._intRoomRec(e,t),n=this._ageDaysFromIso(s?.dry),a=this._ageDaysFromIso(s?.wet),r=t=>null===t?"—":t<1?"<1d":Math.round(t)+"d",l=o?this._planPreview?.dry.get(t.key):void 0,c=o?this._planPreview?.wet.get(t.key):void 0,d=this._pinCandidates(t.key,"dry").length>1,h=this._pinCandidates(t.key,"wet").length>1,p=(e,o)=>("dry"===e?d:h)?i=>{i.stopPropagation(),this._cycleRoomPin(t.key,e,o)}:void 0;return q`
      <div class="room-inspect" style=${vt({left:(t.map_x??0)+"%",top:(t.map_y??0)+"%"})}
        @click=${t=>t.stopPropagation()}>
        <div class="room-inspect-inner">
          <div class="room-inspect-name">${t.name??t.key}</div>
          <div class="room-inspect-ages">
            <span class="dock-age"><ha-icon icon="mdi:broom"></ha-icon><b style=${vt({color:this._colorForAgeDays(n)})}>${r(n)}</b></span>
            <span class="dock-age"><ha-icon icon="mdi:water"></ha-icon><b style=${vt({color:this._colorForAgeDays(a)})}>${r(a)}</b></span>
          </div>
          ${l||c?q`
            <div class="dock-avatars">
              ${l?this._vacChip(l,p("dry",l)):G}
              ${c?this._vacChip(c,p("wet",c)):G}
            </div>`:G}
        </div>
      </div>
    `}_renderRoomOverlay(t,e,o){const i=o?.vacs?this._isRoomSelectedAny(t.key,o.vacs):this._isRoomSelected(t,e),s=!i&&!!o?.wholeHome,n="rgba(255,255,255,0.22)",a=t.icon_anchor??"c",r="normal"!==this._mapMode,l="#ffffff",c="linear-gradient(135deg, #ffffff 0%, #ffffff 46%, #8ecbff 50%, #ffffff 54%, #ffffff 100%) 1";if(void 0!==t.map_w&&void 0!==t.map_h){const d={tl:["flex-start","flex-start"],t:["center","flex-start"],tr:["flex-end","flex-start"],l:["flex-start","center"],c:["center","center"],r:["flex-end","center"],bl:["flex-start","flex-end"],b:["center","flex-end"],br:["flex-end","flex-end"]},[h,p]=d[a]??["center","center"],m=(i?this._config.room_border_selected??4:s?Math.max(3,this._config.room_border_normal??2):this._config.room_border_normal??2)+"px",u=i?l+"E0":s?"rgba(255,255,255,0.75)":n,_=i?l+"22":s?"rgba(255,255,255,0.16)":"rgba(0,0,0,0.06)",g=i?"0 0 18px rgba(255,255,255,0.7)":s?"0 0 10px rgba(255,255,255,0.4)":"none",f=i?this._planPreview?.dry.get(t.key):void 0,b=i?this._planPreview?.wet.get(t.key):void 0,y="room-"+t.key;return q`
        <button
          class="room-overlay ${r?"room-overlay--locked":""} ${this._holdId===y?"room-overlay--holding":""}"
          ?disabled=${r}
          style=${vt({left:(t.map_x??0)+"%",top:(t.map_y??0)+"%",width:t.map_w+"%",height:t.map_h+"%",border:m+" solid "+u,borderImage:i?c:"none",background:_,boxShadow:g,justifyContent:h,alignItems:p})}
          @pointerdown=${this._onRoomPointerDown(t,r)}
          @pointerup=${this._onRoomPointerUp(t,e,o?.vacs,r)}
          @pointerleave=${this._holdEnd}
          @pointercancel=${this._holdEnd}
          title=${r?"Room selection is off while placing a pin/zone":t.name} aria-label=${t.name}
          aria-pressed=${i?"true":"false"}
        >
          <div class="hold-ring"></div>
          ${!this._config.room_icon_hidden&&"none"!==a&&t.icon?q`
            <ha-icon icon=${t.icon}
              style=${vt({color:i?"white":"rgba(255,255,255,0.55)","--mdc-icon-size":"16px"})}>
            </ha-icon>
          `:G}
          ${this._renderRoomAgeDots(t,e)}
          ${f||b?(()=>{const t=(this._narrow?90:0)+(this._flipEff?180:0),e=90===t?{top:"0%",left:"100%"}:180===t?{top:"0%",left:"0%"}:270===t?{top:"100%",left:"0%"}:{top:"100%",left:"100%"},o=t*Math.PI/180,i=(-2*(Math.cos(o)+Math.sin(o))).toFixed(2),s=(-2*(Math.cos(o)-Math.sin(o))).toFixed(2);return q`
                <span class="room-overlay-assign-anchor" style=${vt(e)}>
                  <span class="room-overlay-assign"
                    style=${vt({transform:`translate(${i}px, ${s}px) rotate(calc(-1 * var(--map-rot)))`})}>
                    ${f?this._vacChip(f):G}
                    ${b?this._vacChip(b):G}
                  </span>
                </span>
              `})():G}
          ${this._renderRoomGauge(o?.vacs??[e],t)}
        </button>
        ${this._inspectKey===t.key?this._renderRoomInspect(t,e,i,o):G}
      `}const d=i?l+"A8":s?"rgba(255,255,255,0.32)":"rgba(0,0,0,0.55)",h=i?"0 0 12px rgba(255,255,255,0.8)":s?"0 0 8px rgba(255,255,255,0.45)":"none",p="room-"+t.key;return q`
      <button
        class="room-btn ${r?"room-overlay--locked":""} ${this._holdId===p?"room-overlay--holding":""}"
        ?disabled=${r}
        style=${vt({left:(t.map_x??0)+"%",top:(t.map_y??0)+"%",background:d,border:"4px solid "+(i?l:s?"rgba(255,255,255,0.7)":n),borderImage:i?c:"none",boxShadow:h})}
        @pointerdown=${this._onRoomPointerDown(t,r)}
        @pointerup=${this._onRoomPointerUp(t,e,o?.vacs,r)}
        @pointerleave=${this._holdEnd}
        @pointercancel=${this._holdEnd}
        title=${r?"Room selection is off while placing a pin/zone":t.name} aria-label=${t.name}
        aria-pressed=${i?"true":"false"}
      >
        <div class="hold-ring"></div>
        ${this._config.room_icon_hidden?G:q`
          <ha-icon icon=${t.icon||"mdi:square"}
            style=${vt({color:i?"white":"rgba(255,255,255,0.5)"})}>
          </ha-icon>
        `}
        ${this._renderRoomAgeDots(t,e)}
        ${this._renderRoomGauge(o?.vacs??[e],t)}
      </button>
      ${this._inspectKey===t.key?this._renderRoomInspect(t,e,i,o):G}
    `}_renderStatusRow(t){const[e,o]=this._statusInfo(t),i=this._battery(t),s=this._lastCleanStr(t),n=t.name??t.entity.split(".")[1]??t.entity,a=this._progress(t),r=this._ent(t,"current_room"),l=r?this.hass.states[r]?.state:null,c=l&&"unknown"!==l&&"unavailable"!==l?l:null,d=this._ent(t,"error"),h=d?this.hass.states[d]?.state:null,p=this._hasError(t);return q`
      ${p?q`
        <div class="error-row">
          <ha-icon icon="mdi:alert-circle" style="color:#ff4d4f"></ha-icon>
          <span style="color:#ff4d4f;font-size:11px;font-weight:600">${h}</span>
        </div>
      `:G}
      <div class="status-line1">
        <span class="model-label">${n}</span>
        <span class="status-label" style=${vt({color:o})}>
          ${e}${null!==a?q` &middot; ${a}&thinsp;%`:G}
        </span>
      </div>
      <div class="status-line2">
        ${c?q`
          <span class="current-room">
            <ha-icon icon="mdi:map-marker" style="--mdc-icon-size:12px;color:rgba(255,255,255,0.4)"></ha-icon>
            ${c}
          </span>
        `:q`<span></span>`}
        <span class="status-meta">
          ${null!==i?q`
            <span class="battery">
              <ha-icon icon=${this._batIcon(i)} style=${vt({color:this._batColor(i)})}></ha-icon>
              <span style=${vt({color:this._batColor(i)})}>${i}&thinsp;%</span>
            </span>
          `:G}
          <span class="last-clean">
            <ha-icon icon="mdi:history"></ha-icon>
            <span>${s}</span>
          </span>
        </span>
      </div>
    `}_renderProgress(t){const e=this._progress(t);if(null===e)return G;const o=this._color(t);return q`
      <div class="progress">
        <div class="progress-track">
          <div class="progress-fill" style=${vt({width:e+"%",background:o})}></div>
        </div>
        <span class="progress-label" style=${vt({color:o})}>${e}&thinsp;%</span>
      </div>
    `}_renderActions(t,e){const o=this._color(t),i=this._pinPending?.[t.entity],s=this._zonePending?.[t.entity];if(i||s){const i="modeaction-"+e,n=s?"Clean zone":"Send here",a=s?"mdi:select-drag":"mdi:map-marker-radius",r=()=>{s?this._confirmZone(t):this._confirmPin(t)};return q`
        <div class="actions">
          <button
            class="action-btn ${this._holdId===i?"action-btn--holding":""}"
            style=${vt({background:this._colorBg(t),border:"1px solid "+o+"80"})}
            @pointerdown=${this._holdStart(i,r)}
            @pointermove=${this._holdMove}
            @pointerup=${this._holdEnd}
            @pointerleave=${this._holdEnd}
            @pointercancel=${this._holdEnd}
          >
            <div class="hold-ring"></div>
            <ha-icon icon=${a} style=${vt({color:o})}></ha-icon>
            <span>${n}</span>
          </button>
        </div>
      `}const n=this._isCleaning(t),a=this._isPaused(t),r=this._hasSelectedRooms(t),l=this._totalCleanMins(t),c=this._timeStr(l);if(a){const i="resume-"+e;return q`
        <div class="actions">
          <button
            class="action-btn ${this._holdId===i?"action-btn--holding":""}"
            style=${vt({background:this._colorBg(t),border:"1px solid "+o+"80"})}
            @pointerdown=${this._holdStart(i,()=>this._resume(t))}
            @pointermove=${this._holdMove}
            @pointerup=${this._holdEnd}
            @pointerleave=${this._holdEnd}
            @pointercancel=${this._holdEnd}
          >
            <div class="hold-ring"></div>
            <ha-icon icon="mdi:play" style=${vt({color:o})}></ha-icon>
            <span>Resume</span>
          </button>
          <button
            class="action-btn action-btn--secondary"
            @click=${()=>this._dock(t)}
          >
            <ha-icon icon="mdi:home" style="color:rgba(64,169,255,0.6)"></ha-icon>
            <span>Dock</span>
          </button>
        </div>
      `}if(n){const o="pause-"+e;return q`
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
            <ha-icon icon="mdi:pause" style="color:#faad14"></ha-icon>
            <span>Pause</span>
          </button>
        </div>
      `}const d="start-"+e,h=r?this._colorBg(t):"rgba(60,60,60,0.4)",p=r?"1px solid "+o+"80":"1px solid rgba(255,255,255,0.1)",m=r?o:"rgba(255,255,255,0.2)",u=r?"white":"rgba(255,255,255,0.25)",_=this._roomsFor(t),g=_.filter(e=>this._isRoomSelected(e,t)).length,f=[_.length>0?`${g}/${_.length} rooms`:"",c].filter(Boolean).join(" · ");return q`
      <div class="actions actions--idle">
        ${this._renderPresetChips(t)}
        <button
          class="action-btn ${r&&this._holdId===d?"action-btn--holding":""}"
          style=${vt({background:h,border:p,flex:"1"})}
          ?disabled=${!r}
          @pointerdown=${r?this._holdStart(d,()=>this._startClean(t)):G}
          @pointermove=${this._holdMove}
          @pointerup=${this._holdEnd}
          @pointerleave=${this._holdEnd}
          @pointercancel=${this._holdEnd}
        >
          <div class="hold-ring"></div>
          <ha-icon icon="mdi:play" style=${vt({color:m})}></ha-icon>
          <div class="start-body">
            <span style=${vt({color:u})}>${r?"START":"Select rooms"}</span>
            ${f?q`<small style="color:rgba(255,255,255,0.4)">${f}</small>`:G}
          </div>
        </button>
      </div>
    `}_renderStatusCard(t,e){const o=this._isCleaning(t),i=this._color(t),s=t.name??t.entity.split(".")[1]??t.entity,n=o?"drop-shadow(0 0 8px "+i+"D8)":"drop-shadow(0 2px 5px "+i+"33)";return q`
      <div class="status-card" style=${vt({border:o?"2px solid "+i:"1px solid rgba(255,255,255,0.08)",boxShadow:o?"0 0 22px "+i+"40":"none"})}>
        <div class="status-header">
          <div class="status-avatar" style=${vt({borderColor:i})}
            @click=${()=>this._fireMoreInfo(t.entity)}
            title="Open ${s} info — native controls, in case this card can't do something">
            ${t.image?q`
              <img src=${t.image} alt=${s}
                style=${vt({opacity:o?"0.9":"0.6",filter:n})}
              />
            `:q`
              <ha-icon icon="mdi:robot-vacuum"
                style=${vt({color:i,fontSize:"22px",opacity:o?"0.9":"0.5"})}
              ></ha-icon>
            `}
            <span class="avatar-info-badge"><ha-icon icon="mdi:information-outline"></ha-icon></span>
          </div>
          <div class="status-info">
            ${this._renderStatusRow(t)}
          </div>
        </div>
        ${this._renderProgress(t)}
        ${this._renderActions(t,e)}
        ${this._renderDebugProgress(t)}
      </div>
    `}_renderMiniGauge(t,e,o,i){return q`
      <span class="mini-gauge-wrap">
        <ha-icon class="mini-gauge-ico" icon=${o} style=${vt({color:e})}></ha-icon>
        <span class="mini-gauge" style=${vt({background:`conic-gradient(${e} ${3.6*t}deg, rgba(255,255,255,0.12) 0)`})}>
          <span>${t}${i?"~":""}</span>
        </span>
      </span>`}_currentRoomName(t){return this._intAttrs(t)?.vacuum_room_name}_mmss(t){const e=Math.max(0,Math.round(t));return`${Math.floor(e/60)}:${String(e%60).padStart(2,"0")}`}_renderDebugProgress(t){if(!this._config.debug_room_progress)return G;const e=this._roomsFor(t).map(e=>({r:e,p:this._roomProgress(t,e)})).filter(t=>t.p&&(null!=t.p.dry_pct||null!=t.p.wet_pct||null!=t.p.elapsed_s));if(!e.length)return G;const o=this._color(t),i=this._intEntity(t),s=i?Date.parse(this.hass.states[i]?.last_updated??""):NaN,n=this._currentRoomName(t),a=this._isCleaning(t),r=this._isPaused(t),l=!a&&!r||isNaN(s)?0:Math.max(0,(this._now-s)/1e3);return q`
      <div class="dbg-prog">
        ${e.map(({r:t,p:e})=>{const i=(t.key===n||t.name===n)&&(a||r),s=(e.elapsed_s??0)+(i?l:0);let c=e.est_s??null;i&&r&&null!=c&&(c+=l);const d=null!=c?`${this._mmss(s)}/${this._mmss(c)}`:this._mmss(s);return q`
            <span class="dbg-prog-item" title=${`dry ${e.dry_pct??"—"}% · wet ${e.wet_pct??"—"}%`}>
              ${t.icon?q`<ha-icon icon=${t.icon}></ha-icon>`:G}
              <span class="dbg-prog-name">${t.name??t.key}</span>
              ${null!=e.dry_pct?this._renderMiniGauge(e.dry_pct,o,"mdi:broom",!!e.dry_calibrating):G}
              ${null!=e.wet_pct?this._renderMiniGauge(e.wet_pct,"#40a9ff","mdi:water",!!e.wet_calibrating):G}
              ${null!=e.elapsed_s?q`<small>${d}</small>`:G}
            </span>
          `})}
      </div>
    `}_shownOrdered(){return[...this._shownSet].filter(t=>t<this._config.vacuums.length).sort((t,e)=>t-e)}_gridShown(){const t=this._shownOrdered();return"portrait"===this._profile&&"merged"!==this._config.map_mode&&t.length>1?t.slice(0,1):t}_regionTemplate(t,e){const o=this._gridShown(),i="merged"===this._config.map_mode,s=t=>t.map(t=>this._config.vacuums[t]);switch(t){case"badges":return q`<div class="badges-row badges-row--grid">
          ${"landscape"===this._profile?G:this._config.vacuums.map((t,e)=>this._renderBadge(t,e))}
          ${(this._config.global_actions??[]).map((t,e)=>this._renderGlobalBadge(t,e))}
        </div>`;case"autobar":return this._renderAutoBar();case"plan":return this._renderPlanPreview();case"picker":return this._renderVacuumPicker();case"map":return i?this._renderResponsive(this._renderMergedMap()):q`${o.map(t=>this._renderResponsive(this._renderMap(this._config.vacuums[t])))}`;case"tools":return this._renderMetaBar(s(o));case"dock":return this._renderDock(!("start"in e.place),"landscape"===this._profile&&!("picker"in e.place));case"start":return this._renderStartBar();case"status":return q`${o.map(t=>this._renderStatusCard(this._config.vacuums[t],t))}`;default:return null}}_renderGrid(t){const e="portrait"===this._profile&&this._stackTopology,o=e?Vt:function(t,e){const o=t[e]??{},i=Nt[e];return{columns:o.columns?.length?o.columns:i.columns,rows:o.rows?.length?o.rows:i.rows,place:o.place&&Object.keys(o.place).length?o.place:i.place}}(t,this._profile),i=this._schemaWarning();return q`
      <ha-card style="padding:0;display:block">
        ${this.editMode?q`<div class="version-chip">
          <div>v${$t} · ${Math.round(this._cardW)}w · ${this._profile}</div>
          ${this._config.debug?q`<div>${e?"stack":"split"} · box:${Math.round(this._mapAvailW)}x${Math.round(this._mapAvailH)}</div>`:G}
        </div>`:G}
        <div class="avc-grid avc-grid--${this._profile}" style=${vt(function(t,e){return{display:"grid",width:"100%",height:jt(t),alignContent:"start",gridTemplateColumns:Bt(e.columns),gridTemplateRows:Bt(e.rows),gap:t.gap??"6px",boxSizing:"border-box"}}(t,o))}>
          ${i?q`<div class="avc-schemawarn">
            <ha-icon icon="mdi:alert" style="--mdc-icon-size:18px"></ha-icon><span>${i}</span>
          </div>`:G}
          ${Object.entries(o.place).map(([t,e])=>{const i=this._regionTemplate(t,o);return null==i||i===G?G:q`<div class="avc-region avc-region--${t}" style=${vt(function(t){const e={gridRow:String(t.row??"auto"),gridColumn:String(t.col??"1"),overflow:t.overflow??"hidden",position:"relative",minWidth:"0",minHeight:"0"};return t.align&&"stretch"!==t.align&&(e.alignSelf=t.align),e}(e))}>${i}</div>`})}
        </div>
      </ha-card>
    `}render(){if(!this._config||!this.hass)return G;if(this._config.layout)return this._renderGrid(this._config.layout);const t=this._schemaWarning();return q`
      <ha-card>
        ${this.editMode?q`<div class="version-chip">v${$t} · ${Math.round(this._cardW)}w</div>`:G}
        ${t?q`<div style="margin:0 4px;padding:8px 12px;border-radius:12px;border:1px solid rgba(250,173,20,0.55);background:rgba(250,173,20,0.12);color:#faad14;font-size:12px;display:flex;align-items:center;gap:8px">
          <ha-icon icon="mdi:alert" style="--mdc-icon-size:18px"></ha-icon><span>${t}</span>
        </div>`:G}
        <div class="badges-row">
          ${this._config.vacuums.map((t,e)=>this._renderBadge(t,e))}
          ${(this._config.global_actions??[]).map((t,e)=>this._renderGlobalBadge(t,e))}
        </div>
        ${this._renderAutoBar()}
        ${this._renderPlanPreview()}
        ${"merged"===this._config.map_mode?q`
              ${this._renderResponsive(this._renderMergedMap())}
              ${this._shownOrdered().map(t=>q`
                ${this._renderMapTools(this._config.vacuums[t])}
                ${this._renderStatusCard(this._config.vacuums[t],t)}
              `)}
            `:this._shownOrdered().map(t=>q`
                ${this._renderResponsive(this._renderMap(this._config.vacuums[t]))}
                ${this._renderMapTools(this._config.vacuums[t])}
                ${this._renderStatusCard(this._config.vacuums[t],t)}
              `)}
      </ha-card>
    `}};Lt.styles=a`
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
      top: 4px;
      right: 8px;
      max-width: calc(100% - 16px);
      text-align: right;
      font-size: 10px;
      line-height: 1.5;
      font-weight: 600;
      color: rgba(255, 255, 255, 0.85);
      background: rgba(0, 0, 0, 0.75);
      border-radius: 6px;
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
      background: rgba(255,255,255,0.05); border: 1.5px solid rgba(255,255,255,0.2); cursor: pointer;
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
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 12px;
    }
    /* v1.1.0 follow-up (2026-08-03): field feedback that the picker column's
     * full-size badges (same .badge used by the legacy/portrait horizontal
     * badge row, 44px avatar + generous padding) were too large for what's
     * just a vertical vacuum switcher, right above an already-compact dock.
     * Scoped to .vac-picker only — the legacy/portrait badge row keeps its
     * established size unchanged. */
    .vac-picker .badge { width: 100%; box-sizing: border-box; padding: 4px 12px 4px 4px; gap: 8px; }
    .vac-picker .badge-img, .vac-picker .badge-icon { width: 26px; height: 26px; --mdc-icon-size: 18px; }
    .vac-picker .badge-name { font-size: 12px; }

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
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 12px;
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
      border-radius: 10px;
      cursor: pointer;
      font-family: inherit;
      font-size: 11px;
      /* docs/25 §6: 700 read as one more hard-edged/technical accent among
       * several — the mode row is a secondary control next to START, not a
       * second primary action, so its resting weight steps down a notch.
       * The .on state keeps its own distinct (bolder) weight below, so the
       * active/inactive contrast doesn't shrink. */
      font-weight: 600;
      color: rgba(255, 255, 255, 0.5);
      background: transparent;
      border: 1px solid rgba(255, 255, 255, 0.15);
    }
    .dock-mode ha-icon { --mdc-icon-size: 15px; }
    .dock-mode.on {
      color: #fff;
      font-weight: 700;
      background: rgba(255, 255, 255, 0.12);
      border-color: rgba(255, 255, 255, 0.5);
    }
    /* docs/25 §7 field follow-up: Dock button — same base as the mode
     * buttons (visually one row), but a flex-0 fixed width since it's an
     * icon + short label, not a mode choice competing for equal space. */
    .dock-mode--dock { flex: 0 0 auto; padding: 7px 10px; position: relative; }
    .dock-mode-dot {
      position: absolute;
      top: 4px;
      right: 4px;
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #e0994a;
    }
    .dock-sheet {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 8px;
      background: rgba(0, 0, 0, 0.25);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 10px;
    }
    .dock-sheet-tabs { display: flex; gap: 6px; }
    .dock-sheet-tab {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      overflow: hidden;
      padding: 0;
      cursor: pointer;
      background: rgba(255, 255, 255, 0.05);
      border: 1.5px solid rgba(255, 255, 255, 0.2);
      opacity: 0.55;
    }
    .dock-sheet-tab.on { opacity: 1; }
    .dock-sheet-tab img { width: 100%; height: 100%; object-fit: cover; display: block; }
    .dock-sheet-tab ha-icon { --mdc-icon-size: 16px; }
    .dock-sheet-debug {
      display: flex;
      flex-direction: column;
      gap: 2px;
      font-size: 10px;
      color: rgba(255, 255, 255, 0.4);
    }
    .dock-sheet-actions { display: flex; flex-wrap: wrap; gap: 8px; }
    .dock-sheet-action {
      flex: 1 1 27%;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      padding: 10px 0;
      border-radius: 9px;
      cursor: pointer;
      font-family: inherit;
      font-size: 11px;
      color: rgba(255, 255, 255, 0.8);
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.12);
    }
    .dock-sheet-action ha-icon { --mdc-icon-size: 18px; }
    .dock-sheet-care {
      display: flex;
      flex-direction: column;
      gap: 6px;
      margin-top: 10px;
      padding-top: 10px;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
    }
    .dock-sheet-care-row {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 12px;
    }
    .dock-sheet-care-label {
      flex: 1;
      color: rgba(255, 255, 255, 0.75);
    }
    .dock-sheet-care-value {
      color: rgba(255, 255, 255, 0.5);
      font-variant-numeric: tabular-nums;
    }
    .dock-sheet-care-badge {
      font-size: 10px;
      font-weight: 600;
      padding: 2px 7px;
      border-radius: 20px;
      background: rgba(82, 196, 26, 0.18);
      color: #52c41a;
    }
    .dock-sheet-care-badge.warn {
      background: rgba(250, 173, 20, 0.2);
      color: #faad14;
    }
    .dock-sheet-care-reset {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 26px;
      height: 26px;
      border-radius: 50%;
      cursor: pointer;
      color: rgba(255, 255, 255, 0.6);
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.1);
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
      font-size: 12px;
      font-weight: 600;
      line-height: 1.25;
    }
    /* Sequence hint (docs/19 follow-up, TODO #2) — amber, not red: it's a
       heads-up about ETA accuracy, not an error blocking the clean. */
    .dock-unseq { --mdc-icon-size: 13px; color: #d4a017; flex-shrink: 0; margin: 0 2px; }
    .dock-unassigned { --mdc-icon-size: 13px; color: #ff4d4f; flex-shrink: 0; margin: 0 2px; }
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
    .dock-age { display: inline-flex; align-items: center; gap: 2px; font-size: 10px; }
    .dock-age ha-icon { --mdc-icon-size: 12px; color: rgba(255, 255, 255, 0.3); }
    /* Persistent last-clean coverage % (docs/29) — deliberately dimmer/smaller than the
       age badge next to it: age is the primary "should I clean this?" signal, coverage
       is supporting detail. */
    .dock-cov { font-size: 9px; opacity: 0.45; margin-left: 1px; }
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
    .dock-foot {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      padding-top: 6px;
    }
    .dock-est { font-size: 11px; color: rgba(255, 255, 255, 0.45); }

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
      border-radius: 18px;
      cursor: pointer;
      font-family: inherit;
      font-size: 16px;
      font-weight: 700;
      color: #fff;
      background: rgba(111, 191, 115, 0.24);
      border: 1px solid rgba(111, 191, 115, 0.65);
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
      border-radius: 16px;
      cursor: pointer;
      font-family: inherit;
      font-size: 10px;
      font-weight: 600;
      color: rgba(255, 255, 255, 0.65);
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.15);
    }
    .start-seg ha-icon { --mdc-icon-size: 20px; }
    .start-seg.on {
      color: #fff;
      font-weight: 700;
      background: rgba(255, 255, 255, 0.14);
      border-color: rgba(255, 255, 255, 0.5);
    }
    .start-seg--dock { position: relative; }

    .map-tools-label {
      font-size: 11px;
      font-weight: 700;
      color: rgba(255, 255, 255, 0.45);
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
    .avc-grid--portrait .badge-name { font-size: 11px; }
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
    .avc-grid--portrait .dock-age { font-size: 9px; }
    .avc-grid--portrait .dock-age ha-icon { --mdc-icon-size: 10px; }
    .avc-grid--portrait .dock-cov { font-size: 8px; }

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
    .badge--holding .hold-ring,
    .vac-icon-btn--holding .hold-ring,
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
    .avc-err-halo { animation: avc-err-pulse 1.3s ease-in-out infinite; }
    @keyframes avc-err-pulse { 0%,100% { opacity: 0.18; } 50% { opacity: 0.6; } }
    .zone-rect { position: absolute; border: 2px solid #fff; background: rgba(255,255,255,0.15); border-radius: 4px; pointer-events: none; box-shadow: 0 0 0 1px rgba(0,0,0,0.45); }
    /* Move/resize handles (docs/19 follow-up) — decoration only, no pointer
       handlers: the overlaying .map-clickcatch does the actual hit-testing
       (_zoneHit) so a drag anywhere near a corner resizes, and inside the box
       moves the whole rectangle. */
    .zone-handle { position: absolute; width: 12px; height: 12px; margin: -6px; border-radius: 50%; background: #fff; border: 2px solid rgba(0,0,0,0.45); pointer-events: none; }
    .zone-handle--nw { left: 0; top: 0; }
    .zone-handle--ne { left: 100%; top: 0; }
    .zone-handle--sw { left: 0; top: 100%; }
    .zone-handle--se { left: 100%; top: 100%; }
    .layer-toggles { position: absolute; top: 8px; right: 8px; display: flex; gap: 6px; z-index: 3; }
    .layer-btn { display: flex; align-items: center; gap: 3px; padding: 3px 8px; border-radius: 999px; border: 1px solid rgba(255,255,255,0.2); background: rgba(0,0,0,0.45); color: rgba(255,255,255,0.55); font-size: 11px; font-weight: 600; cursor: pointer; --mdc-icon-size: 16px; user-select: none; -webkit-touch-callout: none; touch-action: manipulation; }
    .layer-btn.on { color: #fff; border-color: rgba(255,255,255,0.55); background: rgba(0,0,0,0.7); }
    .layer-menu { position: absolute; top: 38px; right: 0; min-width: 200px; max-width: 86vw; max-height: 60vh; overflow-y: auto; display: flex; flex-direction: column; gap: 2px; padding: 6px; border-radius: 12px; background: rgba(15,15,18,0.96); border: 1px solid rgba(255,255,255,0.15); box-shadow: 0 8px 24px rgba(0,0,0,0.5); }
    .layer-menu-head { display: flex; align-items: center; gap: 6px; font-size: 11px; color: rgba(255,255,255,0.5); padding: 2px 6px 5px; --mdc-icon-size: 14px; }
    .layer-menu-row { display: flex; align-items: center; gap: 8px; padding: 6px 8px; border-radius: 8px; border: 1px solid transparent; background: transparent; color: rgba(255,255,255,0.88); cursor: pointer; font-size: 13px; --mdc-icon-size: 16px; }
    .layer-menu-row.on { background: rgba(255,255,255,0.12); border-color: rgba(255,255,255,0.4); }
    .lm-name { flex: 1; text-align: left; }
    .layer-menu-row b { font-weight: 700; }
    /* .rl-prog is the live coverage chip (_renderProgChip) and is still used —
       the rest of the old .room-list/.rl-* set went with _renderRoomList
       (dead since docs/19 A4, deleted 2026-08-08). */
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
      border-radius: 6px;
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
    .room-age-dot { width: 7px; height: 7px; border-radius: 50%; border: 1px solid rgba(0,0,0,0.5); }
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
    .room-overlay-assign .dock-chip { box-shadow: 0 1px 4px rgba(0,0,0,0.7); }

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
      background: rgba(18, 18, 18, 0.99);
      border: 1px solid rgba(255, 255, 255, 0.25);
      border-radius: 8px;
      padding: 6px 8px;
      font-size: 11px;
      white-space: nowrap;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.45);
      isolation: isolate;
    }
    .room-inspect-name { font-weight: 600; margin-bottom: 4px; color: #fff; }
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
      background: rgba(0, 0, 0, 0.82);
      color: #fff;
      font-size: 9px;
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
      background: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-radius: 16px;
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
      border: 1.5px solid rgba(255,255,255,0.2);
      background: rgba(255,255,255,0.05);
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
      background: rgba(30,30,30,0.95); border: 1px solid rgba(0,0,0,0.6);
      display: flex; align-items: center; justify-content: center;
    }
    .avatar-info-badge ha-icon { --mdc-icon-size: 9px; color: rgba(255,255,255,0.6); }

    .status-info { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; }

    .error-row {
      display: flex; align-items: center; gap: 6px;
      padding-bottom: 2px; animation: pulse-error 2s ease-in-out infinite;
    }
    @keyframes pulse-error { 0%,100% { opacity:1; } 50% { opacity:0.6; } }

    .status-line1 { display: flex; align-items: baseline; justify-content: space-between; gap: 8px; }
    .model-label { font-size: 13px; font-weight: 500; color: rgba(255,255,255,0.85); }
    .status-label { font-size: 12px; font-weight: 600; text-align: right; }

    .status-line2 { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
    .current-room { display: flex; align-items: center; gap: 3px; font-size: 11px; color: rgba(255,255,255,0.45); }

    .status-meta { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
    .battery { display: flex; align-items: center; gap: 3px; font-size: 11px; font-weight: 600; }
    .battery ha-icon { --mdc-icon-size: 13px; }
    .last-clean { display: flex; align-items: center; gap: 3px; font-size: 11px; color: rgba(255, 255, 255, 0.45); }
    .last-clean ha-icon { --mdc-icon-size: 11px; color: rgba(255, 255, 255, 0.25); }

    /* ── Progress bar ────────────────────────────────────────────────── */
    .progress { display: flex; align-items: center; gap: 8px; }
    .progress-track {
      flex: 1; height: 3px;
      background: rgba(255, 255, 255, 0.08); border-radius: 2px; overflow: hidden;
    }
    .progress-fill { height: 100%; border-radius: 2px; transition: width 0.5s ease; }
    .progress-label { font-size: 11px; font-weight: 600; flex-shrink: 0; }

    /* ── Debug per-room progress strip ───────────────────────────────── */
    .dbg-prog { display: flex; flex-wrap: wrap; gap: 6px 12px; padding-top: 2px; }
    .dbg-prog-item { display: flex; align-items: center; gap: 3px; font-size: 11px; color: rgba(255,255,255,0.55); --mdc-icon-size: 14px; }
    .dbg-prog-name { color: rgba(255,255,255,0.45); }
    .dbg-prog-item b { font-weight: 700; }
    .dbg-prog-item small { color: rgba(255,255,255,0.4); font-size: 10px; }
    .mini-gauge-wrap { display: inline-flex; align-items: center; gap: 2px; }
    .mini-gauge-ico { --mdc-icon-size: 12px; opacity: 0.8; }
    .mini-gauge { width: 22px; height: 22px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; }
    .mini-gauge span { width: 16px; height: 16px; border-radius: 50%; background: rgba(0,0,0,0.82); color: #fff; font-size: 8px; font-weight: 700; display: flex; align-items: center; justify-content: center; }

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
      border-radius: 12px;
      cursor: pointer;
      transition: opacity 0.2s;
      font-family: inherit;
    }

    .action-btn:disabled { cursor: default; opacity: 0.7; }

    .action-btn ha-icon { --mdc-icon-size: 18px; flex-shrink: 0; position: relative; z-index: 1; }
    .action-btn span { font-size: 13px; font-weight: 700; color: white; position: relative; z-index: 1; }

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

    .map-clickcatch { position: absolute; inset: 0; cursor: crosshair; z-index: 5; }
    .map-tools { display: flex; gap: 6px; margin: 6px 0 0; }
    .mtbtn { display: inline-flex; align-items: center; gap: 4px; padding: 5px 10px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.18); background: rgba(255,255,255,0.06); color: inherit; cursor: pointer; font-size: 12px; font-weight: 600; }
    .mtbtn.on { background: rgba(59,130,246,0.25); border-color: #3b82f6; }
    .mtbtn:disabled { opacity: 0.4; cursor: default; }
    .mtbtn ha-icon { --mdc-icon-size: 16px; }
    .mtbtn--stat { cursor: default; background: transparent; border-color: transparent; gap: 3px; padding: 5px 6px; }
    .mtbtn--stat b { font-weight: 700; }
    .mtbtn--stat small { opacity: 0.7; font-weight: 500; }
    /* Sequence hint (docs/19 follow-up, TODO #2) — amber to read as "heads up",
       distinct from the neutral stat pills either side of it. */
    .mtbtn--warn { color: #d4a017; }
    .mtbtn--warn ha-icon { color: #d4a017; }
    .mtbtn--err { color: #ff4d4f; }
    .mtbtn--err ha-icon { color: #ff4d4f; }
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
    .meta-bar { display: flex; align-items: center; gap: 4px; flex-wrap: wrap; padding: 6px 8px; background: rgba(255, 255, 255, 0.06); border: 1px solid rgba(255, 255, 255, 0.16); border-radius: 12px; }
    .meta-bar-cluster { display: flex; align-items: center; gap: 4px; }
    .meta-bar-spacer { flex: 1 1 auto; }
    .meta-bar-divider { width: 0.5px; align-self: stretch; background: rgba(255, 255, 255, 0.22); margin: 0 4px; }
    /* Refresh: a quiet icon, not a bordered button on par with Pin & Go/Zone —
     * it shouldn't compete with the actual map-interaction tools for attention. */
    .mtbtn--ghost { border: none; background: transparent; color: rgba(255, 255, 255, 0.45); padding: 5px; }
    .mtbtn--ghost:hover { color: rgba(255, 255, 255, 0.75); }
    .mtbtn--spin ha-icon { animation: avc-refresh-spin 0.6s ease; }
    @keyframes avc-refresh-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    .mode-action { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 6px; }
    .mode-action .mtbtn { width: 100%; justify-content: center; box-sizing: border-box; animation: avc-mode-action-pulse 1.6s ease-in-out infinite; }
    @keyframes avc-mode-action-pulse { 0%,100% { box-shadow: 0 0 0 rgba(59,130,246,0); } 50% { box-shadow: 0 0 12px rgba(59,130,246,0.55); } }
    .calib-panel { margin-top: 4px; font-size: 12px; opacity: 0.9; padding: 6px 8px; background: rgba(59,130,246,0.12); border-radius: 8px; }
    .calib-panel > div { margin-bottom: 4px; }
    .calib-actions { display: flex; gap: 6px; flex-wrap: wrap; }
  `,t([ut({attribute:!1})],Lt.prototype,"hass",void 0),t([ut({attribute:!1})],Lt.prototype,"editMode",void 0),t([_t()],Lt.prototype,"_config",void 0),t([_t()],Lt.prototype,"_shownSet",void 0),t([_t()],Lt.prototype,"_holdId",void 0),t([_t()],Lt.prototype,"_mapMode",void 0),t([_t()],Lt.prototype,"_inspectKey",void 0),t([_t()],Lt.prototype,"_dockSheetOpen",void 0),t([_t()],Lt.prototype,"_dockSheetIdx",void 0),t([_t()],Lt.prototype,"_modeSheetOpen",void 0),t([_t()],Lt.prototype,"_careResetPending",void 0),t([_t()],Lt.prototype,"_modeEntity",void 0),t([_t()],Lt.prototype,"_dbg",void 0),t([_t()],Lt.prototype,"_zoneDrag",void 0),t([_t()],Lt.prototype,"_zoneRectShown",void 0),t([_t()],Lt.prototype,"_zonePending",void 0),t([_t()],Lt.prototype,"_zoneEdit",void 0),t([_t()],Lt.prototype,"_pinPending",void 0),t([_t()],Lt.prototype,"_layers",void 0),t([_t()],Lt.prototype,"_layerMenu",void 0),t([_t()],Lt.prototype,"_localRoomSel",void 0),t([_t()],Lt.prototype,"_activePresets",void 0),t([_t()],Lt.prototype,"_planMode",void 0),t([_t()],Lt.prototype,"_activeGlobalPreset",void 0),t([_t()],Lt.prototype,"_cardW",void 0),t([_t()],Lt.prototype,"_mapAR",void 0),t([_t()],Lt.prototype,"_profile",void 0),t([_t()],Lt.prototype,"_mapRegW",void 0),t([_t()],Lt.prototype,"_mapRegH",void 0),t([_t()],Lt.prototype,"_mapAvailW",void 0),t([_t()],Lt.prototype,"_mapAvailH",void 0),t([_t()],Lt.prototype,"_flipLive",void 0),t([_t()],Lt.prototype,"_now",void 0),t([_t()],Lt.prototype,"_planPreview",void 0),Lt=t([ht(xt)],Lt);const Ut=(Wt=window).customCards??(Wt.customCards=[]);Ut.some(t=>t.type===xt)||Ut.push({type:xt,name:"AnyVac Card",description:"Feature-rich card for Roborock vacuums — map, room selection, multi-vacuum tabs, global actions.",preview:!1,documentationURL:"https://github.com/Michailjovic/anyvac-card"});const Gt={entity:"",name:"",color:"green",rooms:[],clean_action:{type:"native"}},Zt={key:"",name:"",icon:"mdi:square",map_x:50,map_y:50},Kt=["mdi:numeric-1-circle","mdi:numeric-2-circle","mdi:numeric-3-circle","mdi:numeric-4-circle","mdi:numeric-5-circle","mdi:numeric-6-circle","mdi:numeric-7-circle","mdi:numeric-8-circle","mdi:numeric-9-circle","mdi:numeric-9-plus-circle"];function Yt(t){return Kt[Math.min(t,Kt.length-1)]}const Xt={entity:"",rotation:0,scale:100,offset_x:0,offset_y:0},Jt={name:"Whole flat",color:"orange",watch_entities:[],action:{type:"script",entity_id:""}},Qt=[{days:2,color:"#2ecc71"},{days:5,color:"#faad14"},{days:10,color:"#ff9800"}];function te(t){return Math.min(100,Math.max(0,t))}let ee=class extends ct{constructor(){super(...arguments),this._tab="vacuums",this._dragRoom=null,this._dragSeq=null,this._openVac=new Set,this._openSensors=new Set,this._openPresets=new Set,this._openAction=new Set,this._openGlobal=new Set,this._openRoom=new Map,this._mapVac=0,this._mapRoom=null,this._pvAR=0,this._refMapUrl="",this._refMapVac=-1,this._floorplanSnapshotBusy=!1,this._floorplanSnapshotError="",this._rectDrag=null,this._initialized=!1}setConfig(t){this._config=t,this._initialized||(this._initialized=!0,this._openVac=new Set((t.vacuums??[]).map((t,e)=>e)))}updated(t){if(t.has("hass")&&this.hass){const t=this.shadowRoot?.getElementById("ha-entities");t&&!t.options.length&&(t.innerHTML=Object.keys(this.hass.states).sort().map(t=>'<option value="'+t+'">').join(""))}"maps"===this._tab&&(t.has("_tab")||t.has("_mapVac"))&&this._snapshotRefMap()}_snapshotRefMap(){const t=this._config.vacuums;if(!t.length)return this._refMapUrl="",void(this._refMapVac=-1);const e=Math.min(this._mapVac,t.length-1),o=this._mapEntityFor(t[e]);this._refMapUrl=o?this.hass.states[o]?.attributes.entity_picture??"":"",this._refMapVac=e}async _snapshotFloorplan(t){const e=this._mapEntityFor(t);if(e){this._floorplanSnapshotBusy=!0,this._floorplanSnapshotError="";try{const o=await this.hass.callService("anyvac","snapshot_map_as_floorplan",{image_entity:e,name:t.name||t.entity},void 0,!1,!0),i=o?.response?.path;if(!i)throw new Error("no path in service response");if(this._setEditedImageBase({src:i}),this._mergedEdit){const t=this._config.vacuums.map(t=>({...t,hide_map:!0}));this._setConfig({vacuums:t})}else{const e=this._config.vacuums.findIndex(e=>e.entity===t.entity);e>=0&&this._setVacuum(e,{hide_map:!0})}const s=o?.response?.crop;if(s){const e=this._config.vacuums.findIndex(e=>e.entity===t.entity);e>=0&&this._autoPlaceOwnRooms(e,s)}}catch(t){this._floorplanSnapshotError="Couldn't snapshot this vacuum's map — make sure the anyvac integration is updated to at least 0.88.0, then try again.",console.error("[anyvac-card] snapshot_map_as_floorplan failed:",t)}finally{this._floorplanSnapshotBusy=!1}}}_fire(t){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}_setConfig(t){const e={...this._config,...t};this._config=e,this._fire(e)}_setVacuum(t,e){const o=[...this._config.vacuums];o[t]={...o[t],...e};const i={...this._config,vacuums:o};this._config=i,this._fire(i)}_setMap(t,e){const o=this._config.vacuums[t].map??{...Xt};this._setVacuum(t,{map:{...o,...e}})}_setImageBase(t,e){const o=this._config.vacuums[t].image_base??{src:""};this._setVacuum(t,{image_base:{...o,...e}})}get _mergedEdit(){return"merged"===this._config.map_mode}_editRooms(){if(this._mergedEdit)return this._config.rooms??[];const t=this._config.vacuums[Math.min(this._mapVac,this._config.vacuums.length-1)];return t?.rooms??[]}_setEditedRoom(t,e){if(this._mergedEdit){const o=[...this._config.rooms??[]];o[t]={...o[t],...e},this._setConfig({rooms:o})}else this._setRoom(Math.min(this._mapVac,this._config.vacuums.length-1),t,e)}_onRoomPointerDown(t,e,o,i){i.stopPropagation();const s=i.currentTarget.closest(".map-pos-container");if(!s)return;const n=s.getBoundingClientRect(),a=this._mapRoom===t;this._mapRoom=t;let r=e;if("move"===e&&null!=o.map_w){const t=(i.clientX-n.left)/n.width*100,e=(i.clientY-n.top)/n.height*100,s=o.map_x??50,a=o.map_y??50,l=o.map_w/2,c=(o.map_h??15)/2,d=16/n.width*100,h=16/n.height*100,p=Math.abs(t-(s-l))<=d,m=Math.abs(t-(s+l))<=d,u=Math.abs(e-(a-c))<=h,_=Math.abs(e-(a+c))<=h;p&&u?r="resize-nw":m&&u?r="resize-ne":p&&_?r="resize-sw":m&&_&&(r="resize-se")}this._rectDrag={ri:t,mode:r,container:n,orig:{x:o.map_x??50,y:o.map_y??50,w:o.map_w??0,h:o.map_h??0},startClientX:i.clientX,startClientY:i.clientY,moved:!1,wasSelected:a},i.currentTarget.setPointerCapture(i.pointerId)}_onRoomPointerMove(t){const e=this._rectDrag;if(!e)return;if(!e.moved){if(Math.hypot(t.clientX-e.startClientX,t.clientY-e.startClientY)<3)return;e.moved=!0}const o=e.container,i=te((t.clientX-o.left)/o.width*100),s=te((t.clientY-o.top)/o.height*100);if("move"===e.mode)return void this._setEditedRoom(e.ri,{map_x:Math.round(i),map_y:Math.round(s)});const n=e.orig.w/2,a=e.orig.h/2,r={"resize-nw":{ox:e.orig.x+n,oy:e.orig.y+a},"resize-ne":{ox:e.orig.x-n,oy:e.orig.y+a},"resize-sw":{ox:e.orig.x+n,oy:e.orig.y-a},"resize-se":{ox:e.orig.x-n,oy:e.orig.y-a}}[e.mode],l=Math.max(2,Math.min(100,Math.abs(i-r.ox))),c=Math.max(2,Math.min(100,Math.abs(s-r.oy)));this._setEditedRoom(e.ri,{map_x:Math.round(te((i+r.ox)/2)),map_y:Math.round(te((s+r.oy)/2)),map_w:Math.round(l),map_h:Math.round(c)})}_onRoomPointerUp(){const t=this._rectDrag;t&&!t.moved&&t.wasSelected&&(this._mapRoom=null),this._rectDrag=null}_addEditedRoom(){if(this._mergedEdit){const t=this._config.rooms??[],e=[...t,{...Zt,icon:Yt(t.length)}];this._setConfig({rooms:e}),this._mapRoom=e.length-1}else this._addRoom(Math.min(this._mapVac,this._config.vacuums.length-1)),this._mapRoom=(this._config.vacuums[this._mapVac]?.rooms?.length??1)-1}_deleteEditedRoom(t){if(this._mergedEdit){const e=(this._config.rooms??[]).filter((e,o)=>o!==t);this._setConfig({rooms:e}),this._mapRoom===t&&(this._mapRoom=null)}else this._deleteRoom(Math.min(this._mapVac,this._config.vacuums.length-1),t)}_setLayoutFlip(t,e){const o=this._config.layout??{},i=o[t]??{},s={...i.crop??{},flip:!!e||void 0};this._setConfig({layout:{...o,[t]:{...i,crop:s}}})}_setEditedImageBase(t){this._mergedEdit?this._setConfig({image_base:{...this._config.image_base??{src:""},...t}}):this._setImageBase(Math.min(this._mapVac,this._config.vacuums.length-1),t)}_editorAR(){return this._pvAR>.1?this._pvAR:3.636}_intEntityFor(t){if(!t)return;if(t.integration_entity)return t.integration_entity;const e=this.hass?.entities,o=e?.[t.entity]?.device_id;return o?Object.keys(e).find(t=>e[t]?.device_id===o&&"anyvac"===e[t]?.platform&&t.startsWith("sensor.")):void 0}_mapEntityFor(t){if(!t)return;if(t.map?.entity)return t.map.entity;const e=this.hass?.entities,o=e?.[t.entity]?.device_id;if(!o)return;const i=Object.keys(e).filter(t=>e[t]?.device_id===o&&t.startsWith("image.")),s=i.filter(t=>{const e=this.hass.states[t];return!!e&&"unavailable"!==e.state&&"unknown"!==e.state&&!!e.attributes.entity_picture});return 1===s.length?s[0]:1===i.length?i[0]:void 0}_roomSequence(t){const e=this._intEntityFor(t),o=e?this.hass?.states?.[e]?.attributes:void 0;return o?.room_sequence??{}}_roomsInSequenceOrder(t,e){return t.map((t,o)=>({r:t,i:o,s:t.key?e[t.key]??1/0:1/0})).sort((t,e)=>t.s!==e.s?t.s-e.s:t.i-e.i).map(t=>t.r)}_moveSequence(t,e,o,i){if(o===i)return;const s=e.map(t=>t.key).filter(t=>!!t);if(o<0||o>=s.length||i<0||i>=s.length)return;const[n]=s.splice(o,1);s.splice(i,0,n),this.hass.callService("anyvac","set_room_sequence",{rooms:s})}_editorSeat(t){const e=this._config.vacuums[t],o=this._intEntityFor(e),i=o?this.hass?.states?.[o]?.attributes:void 0,s=i&&(i.schema_version??0)>=2?i:void 0;return Dt(this._config,e,s,this._editorAR())}_importRooms(t){const e=this._config.vacuums[t],o=this._intEntityFor(e),i=o?this.hass.states[o]?.attributes:void 0,s=Array.isArray(i?.rooms)?i.rooms:[];if(!i||(i.schema_version??0)<2||!s.length)return;const n=this._editorAR(),a=this._editorSeat(t),r=this._mergedEdit?[...this._config.rooms??[]]:[...e.rooms??[]],l=new Set(r.map(t=>t.key));let c=0;for(const t of s){const e=t?.name;if(!e||l.has(e))continue;const o=It(t,i,a,n);o&&(r.push({key:e,name:e,icon:Yt(r.length),...o}),l.add(e),c++)}c&&(this._mergedEdit?this._setConfig({rooms:r}):this._setVacuum(t,{rooms:r}))}_autoPlaceOwnRooms(t,e){const o=this._config.vacuums[t],i=this._intEntityFor(o),s=i?this.hass.states[i]?.attributes:void 0,n=Array.isArray(s?.rooms)?s.rooms:[];if(!n.length)return;const a=this._mergedEdit?[...this._config.rooms??[]]:[...o.rooms??[]],r=new Set(a.map(t=>t.key));let l=0;for(const t of n){const o=t?.name,i=t?.bbox_px;if(!o||r.has(o)||!i)continue;const s=Ot(i,e);s&&(a.push({key:o,name:o,icon:Yt(a.length),...s}),r.add(o),l++)}l&&(this._mergedEdit?this._setConfig({rooms:a}):this._setVacuum(t,{rooms:a}))}_unmatchedOwnRoomNames(t){const e=this._config.vacuums[t],o=this._intEntityFor(e),i=o?this.hass.states[o]?.attributes:void 0,s=Array.isArray(i?.rooms)?i.rooms:[];if(!s.length)return[];const n=new Set(this._editRooms().map(t=>t.key)),a=[];for(const t of s){const e=t?.name;e&&!n.has(e)&&a.push(e)}return a}_setRoom(t,e,o){const i=[...this._config.vacuums[t].rooms??[]];i[e]={...i[e],...o},this._setVacuum(t,{rooms:i})}_setCleanAction(t,e){const o=this._config.vacuums[t].clean_action??{type:"native"};this._setVacuum(t,{clean_action:{...o,...e}})}_togglePresets(t){const e=new Set(this._openPresets);e.has(t)?e.delete(t):e.add(t),this._openPresets=e}_setPreset(t,e,o){const i=[...this._config.vacuums[t].presets??[]];i[e]={...i[e],...o},this._setVacuum(t,{presets:i})}_addPreset(t){const e=this._config.vacuums[t].presets??[],o=[...e,{id:"preset"+(e.length+1),label:"New preset"}];this._setVacuum(t,{presets:o}),this._openPresets=new Set([...this._openPresets,t])}_deletePreset(t,e){const o=(this._config.vacuums[t].presets??[]).filter((t,o)=>o!==e);this._setVacuum(t,{presets:o})}_setGlobal(t,e){const o=[...this._config.global_actions??[]];o[t]={...o[t],...e};const i={...this._config,global_actions:o};this._config=i,this._fire(i)}_setGlobalAction(t,e){const o=this._config.global_actions?.[t]?.action??{type:"script",entity_id:""};this._setGlobal(t,{action:{...o,...e}})}_moveVacuum(t,e){const o=t+e,i=[...this._config.vacuums];if(o<0||o>=i.length)return;[i[t],i[o]]=[i[o],i[t]];const s={...this._config,vacuums:i};this._config=s,this._fire(s)}_addVacuum(){const t=[...this._config.vacuums,{...Gt}],e={...this._config,vacuums:t};this._config=e,this._fire(e);const o=t.length-1;this._openVac=new Set([...this._openVac,o])}_deleteVacuum(t){const e=this._config.vacuums.filter((e,o)=>o!==t),o={...this._config,vacuums:e};this._config=o,this._fire(o);const i=new Set(this._openVac);i.delete(t),this._openVac=i}_addRoom(t){const e=this._config.vacuums[t].rooms??[],o=[...e,{...Zt,icon:Yt(e.length)}];this._setVacuum(t,{rooms:o});const i=new Map(this._openRoom);i.set(t,o.length-1),this._openRoom=i}_moveRoom(t,e,o){if(e===o)return;const i=[...this._config.vacuums[t].rooms??[]];if(e<0||e>=i.length||o<0||o>=i.length)return;const[s]=i.splice(e,1);i.splice(o,0,s),this._setVacuum(t,{rooms:i})}_deleteRoom(t,e){const o=(this._config.vacuums[t].rooms??[]).filter((t,o)=>o!==e);this._setVacuum(t,{rooms:o});if(this._openRoom.get(t)===e){const e=new Map(this._openRoom);e.set(t,null),this._openRoom=e}this._mapRoom===e&&(this._mapRoom=null)}_setGlobalPreset(t,e){const o=[...this._config.global_presets??[]];o[t]={...o[t],...e},this._setConfig({global_presets:o})}_addGlobalPreset(){const t=this._config.global_presets??[],e=[...t,{id:"gp"+(t.length+1),label:"New clean",scope:"select"}];this._setConfig({global_presets:e})}_deleteGlobalPreset(t){const e=(this._config.global_presets??[]).filter((e,o)=>o!==t);this._setConfig({global_presets:e})}_addGlobal(){const t=[...this._config.global_actions??[],{...Jt}],e={...this._config,global_actions:t};this._config=e,this._fire(e);const o=t.length-1;this._openGlobal=new Set([...this._openGlobal,o])}_deleteGlobal(t){const e=(this._config.global_actions??[]).filter((e,o)=>o!==t),o={...this._config,global_actions:e};this._config=o,this._fire(o);const i=new Set(this._openGlobal);i.delete(t),this._openGlobal=i}_toggleVac(t){const e=new Set(this._openVac);e.has(t)?e.delete(t):e.add(t),this._openVac=e}_toggleRoom(t,e){const o=new Map(this._openRoom),i=o.get(t)??null;o.set(t,i===e?null:e),this._openRoom=o}_toggleSensors(t){const e=new Set(this._openSensors);e.has(t)?e.delete(t):e.add(t),this._openSensors=e}_toggleAction(t){const e=new Set(this._openAction);e.has(t)?e.delete(t):e.add(t),this._openAction=e}_toggleGlobal(t){const e=new Set(this._openGlobal);e.has(t)?e.delete(t):e.add(t),this._openGlobal=e}_entityPicker(t,e,o,i,s=!1){const n=o.length?o.join(" / "):"entity_id",a=1===o.length,r=a?"ha-ents-"+o[0]:"ha-entities",l=a?Object.keys(this.hass?.states??{}).filter(t=>t.startsWith(o[0]+".")).sort():null;return q`
      ${l?q`<datalist id=${r}>${l.map(t=>q`<option value=${t}>`)}</datalist>`:G}
      <div class="field">
        <label>${t}${s?q`<span class="required"> *</span>`:G}</label>
        <input class="text-input" type="text" list=${r}
          .value=${e??""} placeholder=${n}
          @input=${t=>{const e=t.target.value;(""===e||this.hass.states[e])&&i(e)}}
          @change=${t=>i(t.target.value)} />
      </div>`}_textField(t,e,o,i=""){return q`
      <div class="field">
        <label>${t}</label>
        <input class="text-input" type="text" .value=${e??""} placeholder=${i}
          @change=${t=>o(t.target.value)} />
      </div>`}_resolveColor(t,e){const o=t??e;return Rt[o]??o}_hexColorField(t,e,o,i){const s=/^#[0-9a-fA-F]{6}$/.test(e??"")?e:i;return q`
      <div class="field">
        <label>${t} (hex)</label>
        <div class="hex-color-row">
          <input type="color" class="threshold-color" .value=${s}
            @input=${t=>o(t.target.value)} />
          <input class="text-input" type="text" .value=${e??""} placeholder=${i}
            @change=${t=>o(t.target.value)} />
        </div>
      </div>`}_numberSlider(t,e,o,i,s,n,a=""){const r=e??0;return q`
      <div class="field field--row">
        <label>${t}</label>
        <div class="slider-wrap">
          <input type="range" class="slider" min=${o} max=${i} step=${s} .value=${String(r)}
            @input=${t=>n(Number(t.target.value))} />
          <span class="slider-val">${r}${a}</span>
        </div>
      </div>`}_selectField(t,e,o,i){return q`
      <div class="field field--row">
        <label>${t}</label>
        <select class="select-input" @change=${t=>i(t.target.value)}>
          ${o.map(t=>q`<option value=${t.value} ?selected=${t.value===e}>${t.label}</option>`)}
        </select>
      </div>`}_optionSelectFromList(t,e,o,i){return q`
      <div class="field field--row">
        <label>${t}</label>
        <select class="select-input"
          @change=${t=>i(t.target.value)}>
          <option value="">— none —</option>
          ${e.map(t=>q`<option value=${t} ?selected=${t===o}>${t}</option>`)}
        </select>
      </div>`}_optionSelect(t,e,o,i){const s=e?this.hass.states[e]?.attributes.options??[]:[];return s.length?q`
      <div class="field field--row">
        <label>${t}</label>
        <select class="select-input"
          @change=${t=>i(t.target.value)}>
          <option value="">— none —</option>
          ${s.map(t=>q`<option value=${t} ?selected=${t===o}>${t}</option>`)}
        </select>
      </div>`:this._textField(t,o,i,"e.g. balanced")}_iconPickerField(t,e){return q`
      <div class="field">
        <label>Icon</label>
        <ha-icon-picker .value=${t??"mdi:square"}
          @value-changed=${t=>e(t.detail.value)}
        ></ha-icon-picker>
      </div>`}_areaPicker(t,e,o){const i=Object.values(this.hass?.areas??{});return i.length?q`
      <div class="field field--row">
        <label>${t}</label>
        <select class="select-input"
          @change=${t=>o(t.target.value)}>
          <option value="">— not mapped —</option>
          ${[...i].sort((t,e)=>t.name.localeCompare(e.name)).map(t=>q`<option value=${t.area_id} ?selected=${t.area_id===e}>${t.name}</option>`)}
        </select>
      </div>`:this._textField(t,e,o,"e.g. living_room")}_renderVacuumsTab(){return q`
      <div class="tab-body">
        ${0===this._config.vacuums.length?q`<p class="hint">No vacuums yet. Add one below.</p>`:this._config.vacuums.map((t,e)=>this._renderVacuumAccordion(t,e))}
        <button class="btn btn--add" @click=${()=>this._addVacuum()}>
          <ha-icon icon="mdi:plus"></ha-icon> Add vacuum
        </button>
      </div>`}_renderVacuumAccordion(t,e){const o=this._resolveColor(t.color,"green"),i=this._openVac.has(e);return q`
      <div class="acc-row" style=${vt({borderLeft:"3px solid "+o})}>
        <div class="acc-header" @click=${()=>this._toggleVac(e)}>
          ${t.image?q`<img class="acc-img" src=${t.image} alt=${t.name??""} />`:q`<ha-icon icon="mdi:robot-vacuum" style=${vt({color:o,width:"36px",height:"36px"})}></ha-icon>`}
          <div class="acc-info">
            <span class="acc-name">${t.name||t.entity||"Unnamed vacuum"}</span>
            <span class="acc-sub">${t.entity}</span>
          </div>
          <button class="icon-btn" ?disabled=${0===e}
            @click=${t=>{t.stopPropagation(),this._moveVacuum(e,-1)}}>
            <ha-icon icon="mdi:arrow-up"></ha-icon>
          </button>
          <button class="icon-btn" ?disabled=${e===this._config.vacuums.length-1}
            @click=${t=>{t.stopPropagation(),this._moveVacuum(e,1)}}>
            <ha-icon icon="mdi:arrow-down"></ha-icon>
          </button>
          <button class="icon-btn icon-btn--danger"
            @click=${t=>{t.stopPropagation(),this._deleteVacuum(e)}}>
            <ha-icon icon="mdi:delete"></ha-icon>
          </button>
          <ha-icon icon=${i?"mdi:chevron-up":"mdi:chevron-down"} class="acc-chevron"></ha-icon>
        </div>

        ${i?q`
          <div class="acc-body">

            <div class="section-title">Basic</div>
            ${this._entityPicker("Vacuum entity",t.entity,["vacuum"],t=>this._setVacuum(e,{entity:t}),!0)}
            ${this._textField("Display name",t.name,t=>this._setVacuum(e,{name:t}),"e.g. S8")}
            ${this._textField("Image path",t.image,t=>this._setVacuum(e,{image:t}),"/local/...")}
            ${this._hexColorField("Accent colour",t.color?this._resolveColor(t.color,"green"):void 0,t=>this._setVacuum(e,{color:t||void 0}),Mt[e%Mt.length])}
            ${this._selectField("Role",t.clean_type??"auto",[{value:"auto",label:"Auto-detect from clean action"},{value:"dry",label:"Dry only"},{value:"wet",label:"Wet only"},{value:"both",label:"Both — follow live mode"}],t=>this._setVacuum(e,{clean_type:"auto"===t?void 0:t}))}
            <p class="hint">This vacuum's capability — controls which time estimate and which dry/wet layer it uses. Not the run-time Dry/Wet/Both choice (that's made on the controller). "Both" follows the live water mode (needs the integration sensor).</p>

            ${this._renderSensorsSection(e,t)}
            ${this._renderCleanActionSection(e,t)}
            ${this._renderPresetsSection(e,t)}

            <div class="section-title">Rooms (${(t.rooms??[]).length})</div>
            ${this._intEntityFor(t)?q`<p class="hint">With the AnyVac integration, rooms appear automatically from
                  this vacuum's own map — you don't need to add them here. Add a room below only to
                  override its icon/display name, or to position it on a custom floorplan (Maps tab).</p>`:q`<p class="hint">Add one entry per room this vacuum can clean.</p>`}
            ${(t.rooms??[]).map((t,o)=>this._renderRoomAccordion(t,e,o))}
            <button class="btn btn--add" @click=${()=>this._addRoom(e)}>
              <ha-icon icon="mdi:plus"></ha-icon> Add room
            </button>

          </div>
        `:G}
      </div>`}_renderSensorsSection(t,e){const o=this._openSensors.has(t),i=[e.status_entity,e.battery_entity,e.last_clean_entity,e.progress_entity,e.current_room_entity,e.error_entity].filter(Boolean).length;return q`
      <div class="collapsible">
        <div class="collapsible-header" @click=${()=>this._toggleSensors(t)}>
          <span class="collapsible-title">Sensors</span>
          ${i?q`<span class="badge">${i} configured</span>`:G}
          <ha-icon icon=${o?"mdi:chevron-up":"mdi:chevron-down"} class="acc-chevron"></ha-icon>
        </div>
        ${o?q`
          <div class="collapsible-body">
            <p class="hint">Leave the sensors below blank to auto-fill them from the vacuum's device (battery, status, last clean, progress, current room, error).</p>
            ${this._entityPicker("Status",e.status_entity,["sensor"],e=>this._setVacuum(t,{status_entity:e||void 0}))}
            ${this._entityPicker("Battery",e.battery_entity,["sensor"],e=>this._setVacuum(t,{battery_entity:e||void 0}))}
            ${this._entityPicker("Last clean end",e.last_clean_entity,["sensor"],e=>this._setVacuum(t,{last_clean_entity:e||void 0}))}
            ${this._entityPicker("Progress",e.progress_entity,["sensor"],e=>this._setVacuum(t,{progress_entity:e||void 0}))}
            ${this._entityPicker("Current room",e.current_room_entity,["sensor"],e=>this._setVacuum(t,{current_room_entity:e||void 0}))}
            ${this._entityPicker("Error",e.error_entity,["sensor"],e=>this._setVacuum(t,{error_entity:e||void 0}))}
          </div>
        `:G}
      </div>`}_renderPresetsSection(t,e){const o=this._openPresets.has(t),i=e.presets??[],s=this.hass.states[e.entity]?.attributes.fan_speed_list??[],n=e.clean_action,a=n?.mop_mode_entity,r=n?.mop_intensity_entity;return q`
      <div class="collapsible">
        <div class="collapsible-header" @click=${()=>this._togglePresets(t)}>
          <span class="collapsible-title">Setting presets</span>
          ${i.length?q`<span class="badge">${i.length}</span>`:G}
          <ha-icon icon=${o?"mdi:chevron-up":"mdi:chevron-down"} class="acc-chevron"></ha-icon>
        </div>
        ${o?q`
          <div class="collapsible-body">
            <p class="hint">Named "how" bundles for Manual mode — the user picks one on the controller, then picks rooms. Mop entities come from Clean action above; presets only set the values. With fewer than 2 presets the controller shows no chips (a default from Clean action is used).</p>
            ${i.map((e,o)=>q`
              <div class="sub-section">
                <div class="sub-title" style="display:flex;align-items:center;justify-content:space-between">
                  <span>${e.label||e.id}</span>
                  <button class="icon-btn icon-btn--danger" title="Delete preset"
                    @click=${()=>this._deletePreset(t,o)}>
                    <ha-icon icon="mdi:delete"></ha-icon>
                  </button>
                </div>
                ${this._textField("Label",e.label,e=>this._setPreset(t,o,{label:e}),"e.g. Dry")}
                ${this._textField("Icon",e.icon,e=>this._setPreset(t,o,{icon:e||void 0}),"mdi:broom")}
                ${s.length?this._optionSelectFromList("Suction",s,e.suction_level,e=>this._setPreset(t,o,{suction_level:e||void 0})):this._textField("Suction",e.suction_level,e=>this._setPreset(t,o,{suction_level:e||void 0}),"e.g. max")}
                ${a?this._optionSelect("Mop mode",a,e.mop_mode,e=>this._setPreset(t,o,{mop_mode:e||void 0})):G}
                ${r?this._optionSelect("Mop intensity",r,e.mop_intensity,e=>this._setPreset(t,o,{mop_intensity:e||void 0})):G}
                ${this._numberSlider("Repeat passes",e.repeat??1,1,3,1,e=>this._setPreset(t,o,{repeat:e}))}
              </div>
            `)}
            <button class="btn btn--add" @click=${()=>this._addPreset(t)}>
              <ha-icon icon="mdi:plus"></ha-icon> Add preset
            </button>
          </div>
        `:G}
      </div>`}_renderCleanActionSection(t,e){const o=this._openAction.has(t),i=e.clean_action??{type:"native"};return q`
      <div class="collapsible">
        <div class="collapsible-header" @click=${()=>this._toggleAction(t)}>
          <span class="collapsible-title">Clean action</span>
          <span class="badge">${i.type}</span>
          <ha-icon icon=${o?"mdi:chevron-up":"mdi:chevron-down"} class="acc-chevron"></ha-icon>
        </div>
        ${o?q`
          <div class="collapsible-body">
            ${this._renderCleanActionEditor(t,e)}
          </div>
        `:G}
      </div>`}_renderCleanActionEditor(t,e){const o=e.clean_action??{type:"native"};return q`
      ${this._selectField("Strategy","native-auto"===o.type?"native":o.type,[{value:"native",label:"Native (vacuum.send_command + segment IDs)"},{value:"native-area",label:"Native area (vacuum.clean_area)"},{value:"script",label:"Custom script"}],e=>{if("script"===e)return void this._setVacuum(t,{clean_action:{type:"script",entity_id:""}});const o=this._config.vacuums[t]?.clean_action,i={};if(o&&"script"!==o.type)for(const t of["repeat","suction_level","mop_mode_entity","mop_mode","mop_intensity_entity","mop_intensity"]){const e=o[t];void 0!==e&&(i[t]=e)}this._setVacuum(t,{clean_action:{type:e,...i}})})}
      ${"script"===o.type?this._renderScriptAction(t,o):this._renderNativeOptions(t,o)}`}_renderNativeOptions(t,e){const o="native-area"===e.type?q`<p class="hint">Calls <code>vacuum.clean_area</code> (degraded mode only — with the AnyVac integration the START button sends <code>anyvac.clean</code> instead). No repeat; repeat lives server-side in <code>anyvac.clean</code>.</p>`:"native-auto"===e.type?q`<p class="hint">Legacy value, no longer offered above — behaves identically to <strong>Native</strong> (segment-based) both with and without the integration. Safe to leave as-is; re-selecting "Native" above rewrites it.</p>`:q`<p class="hint">Degraded mode only — with the AnyVac integration the START button always sends <code>anyvac.clean</code> instead, which resolves segments server-side.</p>`;return q`
      <div class="sub-section">
        ${o}
        ${this._numberSlider("Repeat passes",e.repeat??1,1,3,1,e=>this._setCleanAction(t,{repeat:e}))}
        <div class="sub-title">Suction level (optional)</div>
        ${(()=>{const o=this.hass.states[this._config.vacuums[t]?.entity]?.attributes.fan_speed_list??[];return o.length?this._optionSelectFromList("Suction option",o,e.suction_level,e=>this._setCleanAction(t,{suction_level:e||void 0})):this._textField("Suction option",e.suction_level,e=>this._setCleanAction(t,{suction_level:e||void 0}),"e.g. balanced")})()}
        <div class="sub-title">Mop mode (optional)</div>
        ${this._entityPicker("Mop mode entity",e.mop_mode_entity,["select"],e=>this._setCleanAction(t,{mop_mode_entity:e||void 0}))}
        ${e.mop_mode_entity?this._optionSelect("Mop mode option",e.mop_mode_entity,e.mop_mode,e=>this._setCleanAction(t,{mop_mode:e||void 0})):G}
        <div class="sub-title">Mop intensity (optional)</div>
        ${this._entityPicker("Mop intensity entity",e.mop_intensity_entity,["select"],e=>this._setCleanAction(t,{mop_intensity_entity:e||void 0}))}
        ${e.mop_intensity_entity?this._optionSelect("Mop intensity option",e.mop_intensity_entity,e.mop_intensity,e=>this._setCleanAction(t,{mop_intensity:e||void 0})):G}
      </div>`}_renderScriptAction(t,e){const o=e.variables??{},i=Object.entries(o);return q`
      <div class="sub-section">
        ${this._entityPicker("Script entity",e.entity_id,["script"],e=>this._setCleanAction(t,{entity_id:e}))}
        <p class="hint">Tokens: {{ entity }}, {{ selected_segments }}, {{ selected_room_keys }}, {{ selected_area_ids }}</p>
        ${i.map(([e,s],n)=>q`
          <div class="var-row">
            <input class="text-input text-input--half" .value=${e} placeholder="name"
              @change=${e=>{const o=e.target.value,s=Object.fromEntries(i.map(([t,e],i)=>[i===n?o:t,e]));this._setCleanAction(t,{variables:s})}} />
            <span class="var-sep">&#8594;</span>
            <input class="text-input text-input--half" .value=${s} placeholder="{{ entity }}"
              @change=${i=>{const s={...o,[e]:i.target.value};this._setCleanAction(t,{variables:s})}} />
            <button class="icon-btn icon-btn--danger icon-btn--sm"
              @click=${()=>{const e=Object.fromEntries(i.filter((t,e)=>e!==n));this._setCleanAction(t,{variables:e})}}>
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          </div>`)}
        <button class="btn btn--add btn--sm"
          @click=${()=>this._setCleanAction(t,{variables:{...o,"":""}})}>
          <ha-icon icon="mdi:plus"></ha-icon> Add variable
        </button>
      </div>`}_renderRoomAccordion(t,e,o){const i=(this._openRoom.get(e)??null)===o;return q`
      <div class="room-acc"
        style=${this._dragRoom&&this._dragRoom.vac===e&&this._dragRoom.idx!==o?vt({outline:"2px dashed var(--primary-color,#3b82f6)",outlineOffset:"-2px"}):G}
        @dragover=${t=>{this._dragRoom&&this._dragRoom.vac===e&&t.preventDefault()}}
        @drop=${t=>{t.preventDefault(),this._dragRoom&&this._dragRoom.vac===e&&this._moveRoom(e,this._dragRoom.idx,o),this._dragRoom=null}}>
        <div class="room-acc-header" @click=${()=>this._toggleRoom(e,o)}>
          <ha-icon icon="mdi:drag-horizontal-variant" title="Drag to reorder"
            draggable="true" style="cursor:grab;opacity:0.5;--mdc-icon-size:18px;flex-shrink:0"
            @click=${t=>t.stopPropagation()}
            @dragstart=${t=>{this._dragRoom={vac:e,idx:o},t.dataTransfer&&(t.dataTransfer.effectAllowed="move")}}
            @dragend=${()=>{this._dragRoom=null}}></ha-icon>
          <ha-icon class="room-acc-icon" icon=${t.icon||"mdi:square"}></ha-icon>
          <div class="room-acc-info">
            <span class="room-acc-name">${t.name||t.key||"Unnamed room"}</span>
            ${void 0===t.segment_id||this._intEntityFor(this._config.vacuums[e])?G:q`<span class="room-acc-meta">seg ${t.segment_id}</span>`}
          </div>
          <button class="icon-btn icon-btn--danger icon-btn--sm"
            @click=${t=>{t.stopPropagation(),this._deleteRoom(e,o)}}>
            <ha-icon icon="mdi:delete"></ha-icon>
          </button>
          <ha-icon icon=${i?"mdi:chevron-up":"mdi:chevron-down"} class="acc-chevron"></ha-icon>
        </div>
        ${i?q`
          <div class="room-acc-body">
            ${this._textField("Key (unique ID)",t.key,t=>this._setRoom(e,o,{key:t}),"e.g. bedroom")}
            <p class="hint">Tip: keep this identical to the room's name in the Roborock app — the AnyVac integration matches rooms by this name (auto-seating, live positions from the integration, room pinning).</p>
            ${this._textField("Display name",t.name,t=>this._setRoom(e,o,{name:t}),"e.g. Bedroom")}
            <p class="hint">Cleaning sequence moved to a shared, backend-owned reorderable
              list — see the <strong>Maps tab</strong> (requires the AnyVac integration + merged mode).</p>
            ${this._intEntityFor(this._config.vacuums[e])?q`<p class="hint">Segment resolution, timing and clean history are handled
                  server-side by the AnyVac integration for this vacuum — nothing to set here.</p>`:"native-area"===this._config.vacuums[e]?.clean_action?.type?q`
                  <div class="field field--row">
                    <label>Effective area</label>
                    <strong style="font-size:13px">${t.area_id??this._config.area_mappings?.[t.key]??t.key}</strong>
                  </div>
                  <p class="hint map-hint" @click=${()=>{this._tab="global"}}>
                    Set in <strong>Global tab → Area mappings</strong> →
                  </p>`:q`
                  <div class="field field--row">
                    <label>Segment ID</label>
                    <input class="text-input text-input--sm" type="number"
                      .value=${String(t.segment_id??"")} placeholder="e.g. 16"
                      @change=${t=>{const i=parseInt(t.target.value);this._setRoom(e,o,{segment_id:isNaN(i)?void 0:i})}} />
                  </div>
                  <p class="hint">Find IDs: Developer Tools → Actions → roborock.get_maps</p>
                  ${this._numberSlider("Est. clean time (fallback)",t.clean_time_mins??0,0,120,1,t=>this._setRoom(e,o,{clean_time_mins:t>0?t:void 0})," min")}
                  ${this._entityPicker("Clean time fallback (input_number, legacy)",t.clean_time_entity,["input_number"],t=>this._setRoom(e,o,{clean_time_entity:t||void 0}))}
                  ${this._entityPicker("Last clean fallback (input_datetime, legacy)",t.last_clean_entity,["input_datetime"],t=>this._setRoom(e,o,{last_clean_entity:t||void 0}))}
                  <p class="hint">Legacy read-only fallbacks for setups without the AnyVac
                    integration — the card never writes these helpers.</p>`}
            <p class="hint map-hint" @click=${()=>{this._tab="maps",this._mapVac=e,this._mapRoom=o}}>
              📍 Set position &amp; icon in the <strong>Maps tab</strong> →
            </p>
          </div>
        `:G}
      </div>`}_renderMapsTab(){const t=this._config.vacuums;if(!t.length)return q`<div class="tab-body"><p class="hint">No vacuums configured. Add one in the Vacuums tab.</p></div>`;const e=Math.min(this._mapVac,t.length-1),o=t[e],i=o.map??{...Xt},s=this._refMapVac===e?this._refMapUrl:"",n=o.base??"map",a="merged"===this._config.map_mode?this._config.image_base:o.image_base,r=("merged"===this._config.map_mode||"image"===n||"combined"===n)&&!!a?.src,l=r?a.src:s,c=r?a.rotation??0:i.rotation??0,d=r?a.scale??100:i.scale??100,h=r?a.offset_x??0:i.offset_x??0,p=r?a.offset_y??0:i.offset_y??0,m=this._editRooms(),u=this._editorSeat(e);return q`
      <div class="tab-body">

        ${t.length>1?q`
          <div class="pill-row">
            ${t.map((t,o)=>q`
              <button class="vac-pill ${o===e?"vac-pill--active":""}"
                @click=${()=>{this._mapVac=o,this._mapRoom=null}}>
                ${t.name||t.entity||"Vacuum "+(o+1)}
              </button>`)}
          </div>
        `:G}

        ${this._selectField("Map mode (all vacuums)",this._config.map_mode??"split",[{value:"split",label:"Split — one map per vacuum"},{value:"merged",label:"Merged — all in one map"}],t=>this._setConfig({map_mode:"merged"===t?"merged":void 0}))}

        ${this._mergedEdit&&!this._config.image_base?.src?q`
          <p class="hint">Merged needs a shared floorplan below or vacuums' raw maps just get laid on top of
            each other unaligned. No photo of your own? Pick a vacuum, scroll to "Shared floorplan" and use
            "Use this vacuum's current map as floorplan" — its own rooms place themselves automatically; every
            other vacuum whose room names match then auto-fits too, with nothing else to set.</p>
        `:G}

        ${this._mergedEdit?G:this._selectField("Base layer",o.base??"map",[{value:"map",label:"Vacuum map"},{value:"combined",label:"Image + map"}],t=>this._setVacuum(e,{base:t}))}

        ${this._entityPicker("AnyVac integration sensor",o.integration_entity,["sensor"],t=>this._setVacuum(e,{integration_entity:t}))}

        ${this._intEntityFor(o)||"merged"===this._config.map_mode?this._selectField("Hide vacuum map (show only floorplan + robot/path)",o.hide_map?"yes":"no",[{value:"no",label:"no"},{value:"yes",label:"yes"}],t=>this._setVacuum(e,{hide_map:"yes"===t})):G}

        ${"combined"===o.base||"merged"===this._config.map_mode?q`
          ${this._numberSlider("Overlay opacity",o.overlay_opacity??55,0,100,5,t=>this._setVacuum(e,{overlay_opacity:t}),"%")}
          ${this._selectField("Overlay blend",o.overlay_blend??"normal",[{value:"normal",label:"normal"},{value:"lighten",label:"lighten (isolate path)"},{value:"screen",label:"screen"},{value:"plus-lighter",label:"plus-lighter"}],t=>this._setVacuum(e,{overlay_blend:t}))}
        `:G}

        ${"image"===o.base||"combined"===o.base||"merged"===this._config.map_mode?q`
          ${"merged"===this._config.map_mode?q`<div class="section-title">Shared floorplan (all vacuums)</div>`:G}
          ${this._mapEntityFor(o)?q`
            <button class="btn btn--sm" style="align-self:flex-start"
              ?disabled=${this._floorplanSnapshotBusy}
              @click=${()=>this._snapshotFloorplan(o)}>
              <ha-icon icon="mdi:camera"></ha-icon>
              ${this._floorplanSnapshotBusy?"Snapshotting…":"Use this vacuum's current map as floorplan"}
            </button>
            <p class="hint">No floor plan photo of your own? This saves ${o.name||o.entity}'s
              current map as a static image and sets it as the floorplan below — the easiest way to
              get auto-fit working across multiple vacuums. Also places ${o.name||o.entity}'s own
              rooms on it automatically (no dragging needed) and turns "Hide vacuum map" on for
              ${"merged"===this._config.map_mode?"every vacuum sharing this floorplan":"this vacuum"}.
              Pick your fullest-coverage vacuum for this step, then switch to each other vacuum below —
              any of its rooms whose name matches one already placed auto-fits with nothing else to do;
              use "Import" only for rooms exclusive to that vacuum. Requires anyvac integration ≥ 0.88.0.</p>
            ${this._floorplanSnapshotError?q`<p class="hint" style="color:#ff6b6b">${this._floorplanSnapshotError}</p>`:G}
          `:G}
          ${this._textField("Image src (URL)",a?.src,t=>this._setEditedImageBase({src:t}),"/local/anyvac/flat.svg")}
          ${this._numberSlider("Image rotation",a?.rotation??0,0,360,90,t=>this._setEditedImageBase({rotation:t}),"°")}
          ${this._numberSlider("Image scale",a?.scale??100,50,200,5,t=>this._setEditedImageBase({scale:t}),"%")}
          ${this._numberSlider("Image offset X",a?.offset_x??0,-50,50,1,t=>this._setEditedImageBase({offset_x:t}),"%")}
          ${this._numberSlider("Image offset Y",a?.offset_y??0,-50,50,1,t=>this._setEditedImageBase({offset_y:t}),"%")}
        `:G}

        ${this._entityPicker("Map image entity",i.entity,["image"],t=>this._setMap(e,{entity:t}))}
        ${!i.entity&&this._mapEntityFor(o)?q`
          <p class="hint">Leave blank to auto-use <code>${this._mapEntityFor(o)}</code> —
            found automatically on this vacuum's device. Set it explicitly only to
            override (e.g. a multi-map vacuum where the wrong floor's image was picked).</p>
        `:G}
        ${this._mapEntityFor(o)?q`
          <button class="btn btn--sm" style="align-self:flex-start"
            @click=${()=>this._snapshotRefMap()}>
            <ha-icon icon="mdi:refresh"></ha-icon> Refresh reference map
          </button>
          <p class="hint">The preview below is a frozen snapshot, not live — it used to
            reload (and visibly flash) on every edit, since Home Assistant refreshes this
            image's URL on nearly every state update. Use this button after the robot
            explores/remaps to update it.</p>
        `:G}

        ${l?q`
          <div class="map-pos-container ${null!==this._mapRoom?"map-pos-container--active":""}"
            @click=${t=>{if(null===this._mapRoom)return;const e=t.currentTarget.getBoundingClientRect(),o=Math.round((t.clientX-e.left)/e.width*100),i=Math.round((t.clientY-e.top)/e.height*100);this._setEditedRoom(this._mapRoom,{map_x:o,map_y:i})}}>
            <div class="map-preview-wrap"
              style=${vt(this._pvAR>.1?{paddingTop:(100/this._pvAR).toFixed(2)+"%"}:{})}>
              <img class="map-preview-img" src=${l} alt="Map preview"
                @load=${t=>{const e=t.target;if(r&&e.naturalWidth&&e.naturalHeight){const t=e.naturalWidth/e.naturalHeight;Math.abs(t-this._pvAR)>.01&&(this._pvAR=t)}}}
                style=${vt({left:50+h+"%",top:50+p+"%",width:d+"%",transform:"translate(-50%,-50%) rotate("+c+"deg)"})} />
              ${this._mergedEdit&&r&&s?q`<img class="map-preview-img" src=${s} alt="Native map"
                style=${vt({left:50+u.offset_x+"%",top:50+u.offset_y+"%",width:u.scale+"%",transform:"translate(-50%,-50%) rotate("+u.rotation+"deg)",opacity:"0.5"})} />`:G}
              ${m.map((t,e)=>{const o=e===this._mapRoom,i=t.map_x??50,s=t.map_y??50;if(null!=t.map_w){const n=t.map_w,a=t.map_h??15;return q`
                    <div class="room-rect ${o?"room-rect--active":""}"
                      style=${vt({left:i+"%",top:s+"%",width:n+"%",height:a+"%"})}
                      @pointerdown=${o=>this._onRoomPointerDown(e,"move",t,o)}
                      @pointermove=${t=>this._onRoomPointerMove(t)}
                      @pointerup=${()=>this._onRoomPointerUp()}
                      @click=${t=>t.stopPropagation()}>
                      <ha-icon icon=${t.icon||"mdi:square"} style="--mdc-icon-size:14px"></ha-icon>
                      ${o?["nw","ne","sw","se"].map(o=>q`
                        <div class="room-rect-handle room-rect-handle--${o}"
                          @pointerdown=${i=>this._onRoomPointerDown(e,"resize-"+o,t,i)}
                          @pointermove=${t=>this._onRoomPointerMove(t)}
                          @pointerup=${()=>this._onRoomPointerUp()}
                          @click=${t=>t.stopPropagation()}></div>
                      `):G}
                    </div>`}return q`
                  <div class="pos-dot ${o?"pos-dot--active":""}"
                    style=${vt({left:i+"%",top:s+"%"})}
                    @pointerdown=${o=>this._onRoomPointerDown(e,"move",t,o)}
                    @pointermove=${t=>this._onRoomPointerMove(t)}
                    @pointerup=${()=>this._onRoomPointerUp()}
                    @click=${t=>t.stopPropagation()}>
                    <ha-icon icon=${t.icon||"mdi:square"} style="--mdc-icon-size:14px"></ha-icon>
                  </div>`})}
            </div>
          </div>

          <div class="section-title">Map seating ${this._mergedEdit?"(this vacuum)":""}</div>
          ${this._selectField("Seating","manual"===i.seat?"manual":"auto",[{value:"auto",label:"Auto — fit from rooms"},{value:"manual",label:"Manual — sliders"}],t=>this._setMap(e,{seat:"manual"===t?"manual":void 0}))}
          ${"manual"!==i.seat?u.auto?q`
            <p class="hint">✅ Auto-fit from <strong>${u.anchorCount}</strong> room${(u.anchorCount??0)>1?"s":""}:
              rot ${u.rotation}° · scale ${u.scale.toFixed(1)}% · offset ${u.offset_x.toFixed(1)}/${u.offset_y.toFixed(1)}%
              · fit error ${(u.residual??0).toFixed(1)}%${(u.residual??0)>3?" ⚠️ check room rectangles / keys":""}${1===u.anchorCount?" (single room — orientation estimated from its shape)":""}.
              Recomputed live — self-heals after the robot remaps.</p>
          `:q`
            <p class="hint">Auto-fit inactive — it needs the integration sensor, a floorplan and at least one
              room rectangle whose key matches a room name on this robot's map. Using the manual values below.</p>
          `:G}
          ${t.length>1&&m.length>0?(()=>{const t=this._unmatchedOwnRoomNames(e);return t.length?q`
              <p class="hint" style="color:#faad14">⚠️ This vacuum reports room${t.length>1?"s":""}
                not on the shared floorplan yet: <strong>${t.join(", ")}</strong>. If any of these are the
                same physical room as one already listed above under a different name, rename it to match in the
                Roborock app (room pairing is by exact name across vacuums) — otherwise use Import below to add it.</p>
            `:G})():G}
          ${"manual"!==i.seat&&u.auto?G:q`
            ${this._numberSlider("Rotation",i.rotation??0,0,360,90,t=>this._setMap(e,{rotation:t}),"°")}
            ${this._numberSlider("Scale",i.scale??100,50,200,5,t=>this._setMap(e,{scale:t}),"%")}
            ${this._numberSlider("Offset X",i.offset_x??0,-50,50,1,t=>this._setMap(e,{offset_x:t}),"%")}
            ${this._numberSlider("Offset Y",i.offset_y??0,-50,50,1,t=>this._setMap(e,{offset_y:t}),"%")}
          `}
          ${this._intEntityFor(o)?q`
            <button class="btn btn--add btn--sm" style="align-self:flex-start"
              @click=${()=>this._importRooms(e)}>
              <ha-icon icon="mdi:import"></ha-icon> Import missing rooms from this vacuum
            </button>
            <p class="hint">Adds rooms this robot's map knows that aren't on the floorplan yet
              (key = Roborock room name), placed through its current seat. Import from your
              reference (whole-home) robot first; then switch to another robot to supplement
              rooms only it has — it will be seated via the rooms you already share.</p>
          `:G}

          ${"merged"===this._config.map_mode&&this._intEntityFor(o)&&m.length?(()=>{const t=this._roomSequence(o),e=this._roomsInSequenceOrder(m,t),i=m.filter(e=>!e.key||void 0===t[e.key]).length;return q`
              <div class="section-title">Cleaning sequence</div>
              <p class="hint">The order configured in the Roborock app — it's dominant regardless of
                what HA sends, so the backend needs to know it to predict wet-clean timing correctly
                (docs/19). Drag to match your app's order. Shared across all vacuums/dashboards
                (backend-owned, like room pinning) — not saved in this card's config.</p>
              ${i?q`<p class="hint" style="color:#faad14">⚠ ${i}
                room${i>1?"s":""} not yet sequenced — dragged to the end,
                ETA will be a rough estimate for ${i>1?"them":"it"} until set.</p>`:G}
              <div class="seq-list">
                ${e.map((i,s)=>q`
                  <div class="seq-row ${this._dragSeq===s?"seq-row--dragging":""}"
                    @dragover=${t=>{null!==this._dragSeq&&t.preventDefault()}}
                    @drop=${t=>{t.preventDefault(),null!==this._dragSeq&&this._moveSequence(o,e,this._dragSeq,s),this._dragSeq=null}}>
                    <ha-icon icon="mdi:drag-horizontal-variant" title="Drag to reorder"
                      draggable="true" style="cursor:grab;opacity:0.5;--mdc-icon-size:18px;flex-shrink:0"
                      @dragstart=${t=>{this._dragSeq=s,t.dataTransfer&&(t.dataTransfer.effectAllowed="move")}}
                      @dragend=${()=>{this._dragSeq=null}}></ha-icon>
                    <span class="seq-pos">${s+1}</span>
                    <ha-icon icon=${i.icon||"mdi:square"} style="--mdc-icon-size:15px"></ha-icon>
                    <span class="seq-name">${i.name||i.key||"Room "+(s+1)}</span>
                    ${i.key&&void 0!==t[i.key]?G:q`<span class="seq-flag" title="Not yet sequenced">?</span>`}
                  </div>`)}
              </div>
            `})():G}

          ${"merged"===this._config.map_mode?q`<button class="btn btn--add btn--sm" style="align-self:flex-start;margin-top:4px" @click=${()=>this._addEditedRoom()}><ha-icon icon="mdi:plus"></ha-icon> Add room</button>`:G}
          ${m.length?q`
            <div class="section-title">Room positions</div>
            <p class="hint">${null!==this._mapRoom?"Drag the dot/rectangle to move it (rectangle mode: drag a corner to resize). Tap it again to deselect, or click elsewhere on the map to jump the selected room there.":"Select a room below, then drag it on the map — or click the map to jump the selected room there."}</p>
            <div class="pill-row">
              ${m.map((t,e)=>q`
                <button class="room-pill ${e===this._mapRoom?"room-pill--active":""}"
                  @click=${()=>{this._mapRoom=e===this._mapRoom?null:e}}>
                  <ha-icon icon=${t.icon||"mdi:square"} style="--mdc-icon-size:13px"></ha-icon>
                  ${t.name||t.key||"Room "+(e+1)}
                </button>`)}
            </div>

            ${null!==this._mapRoom?q`
              ${"merged"===this._config.map_mode?q`
                ${this._textField("Key (= Roborock room name)",m[this._mapRoom]?.key,t=>this._setEditedRoom(this._mapRoom,{key:t}),"Kitchen")}
                ${this._textField("Name",m[this._mapRoom]?.name,t=>this._setEditedRoom(this._mapRoom,{name:t}),"Kitchen")}
                ${this._numberSlider("Dry clean time",m[this._mapRoom]?.clean_time_dry??0,0,120,1,t=>this._setEditedRoom(this._mapRoom,{clean_time_dry:t>0?t:void 0})," min")}
                ${this._numberSlider("Wet clean time",m[this._mapRoom]?.clean_time_wet??0,0,180,1,t=>this._setEditedRoom(this._mapRoom,{clean_time_wet:t>0?t:void 0})," min")}
              `:G}
              <div class="section-title" style="margin-top:4px">Position</div>
              ${this._numberSlider("X",m[this._mapRoom]?.map_x??50,0,100,1,t=>this._setEditedRoom(this._mapRoom,{map_x:t}),"%")}
              ${this._numberSlider("Y",m[this._mapRoom]?.map_y??50,0,100,1,t=>this._setEditedRoom(this._mapRoom,{map_y:t}),"%")}

              <div class="section-title" style="margin-top:4px">Overlay mode</div>
              ${(()=>{const t=m[this._mapRoom];return void 0!==t?.map_w?q`
                  ${this._numberSlider("Width",t.map_w,1,100,1,t=>this._setEditedRoom(this._mapRoom,{map_w:t}),"%")}
                  ${this._numberSlider("Height",t.map_h??15,1,100,1,t=>this._setEditedRoom(this._mapRoom,{map_h:t}),"%")}
                  <button class="btn btn--sm" style="align-self:flex-start"
                    @click=${()=>this._setEditedRoom(this._mapRoom,{map_w:void 0,map_h:void 0})}>
                    Switch to point mode
                  </button>
                `:q`
                  <button class="btn btn--add btn--sm" style="align-self:flex-start"
                    @click=${()=>this._setEditedRoom(this._mapRoom,{map_w:20,map_h:15})}>
                    <ha-icon icon="mdi:rectangle-outline"></ha-icon> Enable rectangle overlay
                  </button>
                `})()}

              <div class="section-title" style="margin-top:4px">Icon</div>
              ${this._iconPickerField(m[this._mapRoom]?.icon,t=>this._setEditedRoom(this._mapRoom,{icon:t}))}
              ${m[this._mapRoom]?.icon?q`
                <div class="field">
                  <label>Icon position</label>
                  <div class="anchor-picker">
                    ${["tl","t","tr","l","c","r","bl","b","br"].map(t=>q`<button
                        class="anchor-cell ${(m[this._mapRoom]?.icon_anchor??"c")===t?"anchor-cell--active":""}"
                        title=${t}
                        @click=${()=>this._setEditedRoom(this._mapRoom,{icon_anchor:t})}>
                        ${{tl:"↖",t:"↑",tr:"↗",l:"←",c:"·",r:"→",bl:"↙",b:"↓",br:"↘"}[t]}
                      </button>`)}
                  </div>
                  <button class="btn btn--sm" style="margin-top:4px;align-self:flex-start"
                    @click=${()=>this._setEditedRoom(this._mapRoom,{icon_anchor:"none"})}>
                    Hide icon in overlay
                  </button>
                </div>
              `:G}
              ${"merged"===this._config.map_mode?q`<button class="btn btn--sm" style="align-self:flex-start;margin-top:6px" @click=${()=>this._deleteEditedRoom(this._mapRoom)}><ha-icon icon="mdi:delete"></ha-icon> Delete room</button>`:G}
            `:G}
          `:q`${"merged"===this._config.map_mode?q`<p class="hint">No rooms yet — use "Add room" above.</p>`:q`<p class="hint">Add rooms in the Vacuums tab to position them here.</p>`}`}
        `:q`<p class="hint">Select a map or image above to enable the placement preview.</p>`}

        ${this._intEntityFor(o)?q`
          <div class="section-title" style="margin-top:4px">Appearance</div>
          ${this._hexColorField("Path colour",o.path_color,t=>this._setVacuum(e,{path_color:t||void 0}),o.color?this._resolveColor(o.color,"green"):Mt[e%Mt.length])}
          ${this._numberSlider("Path width",o.path_width??100,20,300,10,t=>this._setVacuum(e,{path_width:t}),"%")}
          ${this._hexColorField("Mop band colour",o.mop_path_color,t=>this._setVacuum(e,{mop_path_color:t||void 0}),"#40a9ff")}
          ${this._numberSlider("Mop band opacity",o.mop_band_opacity??28,0,100,5,t=>this._setVacuum(e,{mop_band_opacity:t}),"%")}
          ${this._numberSlider("Mop band width",o.mop_band_width??100,20,400,10,t=>this._setVacuum(e,{mop_band_width:t}),"%")}
          ${o.image?this._selectField("Robot image on map (uses status image)",o.robot_image_on_map?"yes":"no",[{value:"no",label:"no"},{value:"yes",label:"yes"}],t=>this._setVacuum(e,{robot_image_on_map:"yes"===t})):G}
          ${o.robot_image_on_map?this._numberSlider("Robot image size",o.robot_size??100,40,220,10,t=>this._setVacuum(e,{robot_size:t}),"%"):G}
          ${o.robot_image_on_map?this._numberSlider("Robot image rotation",o.robot_image_rotation??0,-180,180,15,t=>this._setVacuum(e,{robot_image_rotation:t}),"°"):G}
        `:G}

        ${this._numberSlider("Card height (0=auto)",("merged"===this._config.map_mode?this._config.base_height:o.base_height)??0,0,700,10,t=>"merged"===this._config.map_mode?this._setConfig({base_height:t>0?t:void 0}):this._setVacuum(e,{base_height:t>0?t:void 0}),"px")}

      </div>`}_dbgRow(t,e){return q`<div class="field field--row">
      <label>${t}</label>
      <span style="font-size:12px;font-family:monospace;word-break:break-all">${null==e||""===e?"—":String(e)}</span>
    </div>`}_renderDebugTab(){const t=t=>{try{return JSON.stringify(t,null,1)}catch{return String(t)}},e="font-size:11px;font-family:monospace;white-space:pre-wrap;word-break:break-all;background:rgba(127,127,127,0.12);padding:6px;border-radius:6px;margin:0;max-height:220px;overflow:auto";return q`
      <div class="tab-body">
        <p class="hint">Live values from Home Assistant, read-only — to check the integration is writing data correctly.</p>
        <div class="field field--row">
          <label>Room progress gauges on map</label>
          <label class="toggle-wrap">
            <input type="checkbox" class="toggle-input"
              .checked=${this._config.debug_room_progress??!1}
              @change=${t=>this._setConfig({debug_room_progress:t.target.checked||void 0})} />
            <span class="toggle-track"></span>
          </label>
        </div>
        <p class="hint">Draws a small % gauge on each room (spatial coverage). Spatial % is approximate — the room box includes furniture, so it plateaus below 100%.</p>
        <div class="field field--row">
          <label>Dense portrait room list</label>
          <label class="toggle-wrap">
            <input type="checkbox" class="toggle-input"
              .checked=${this._config.debug_dense_dock??!1}
              @change=${t=>this._setConfig({debug_dense_dock:t.target.checked||void 0})} />
            <span class="toggle-track"></span>
          </label>
        </div>
        <p class="hint">Brings back the old portrait room list (name, age, pin, assigned vacuum) below the map — the minimalist cockpit (docs/25 §7c) drops it in favor of map-tap selection. Independent of the gauges toggle above — you can debug coverage % (which shows on the map either way) without this.</p>
        ${this._config.vacuums.map(o=>{const i=this._intEntityFor(o),s=i?this.hass.states[i]:void 0,n=s?.attributes??{},a=n.mop_signal??{};return q`
            <div class="section-title">${o.name??o.entity}</div>
            <div class="sub-section">
              ${i?s?q`
                    ${this._dbgRow("sensor",`${i} = ${s.state}`)}
                    ${this._dbgRow("schema_version",n.schema_version)}
                    ${this._dbgRow("pipeline_ok",n.pipeline_ok)}
                    ${this._dbgRow("clean_type",n.clean_type)}
                    ${this._dbgRow("in_cleaning",n.in_cleaning)}
                    ${this._dbgRow("vacuum_room_name",n.vacuum_room_name)}
                    ${this._dbgRow("water_mode_name",a.water_mode_name)}
                    ${this._dbgRow("fan_speed_name",a.fan_speed_name)}
                    ${this._dbgRow("path pts (decimated)",Array.isArray(n.path)?n.path.length:"—")}
                    ${this._dbgRow("path pts (raw)",n.path_points)}
                    ${this._dbgRow("mop pts (raw)",n.mop_path_points)}
                    <div class="sub-title">calib — last single-room decision</div>
                    <pre style=${e}>${t(n.calib_debug)}</pre>
                    <div class="sub-title">rooms_estimate (per vacuum)</div>
                    <pre style=${e}>${t(n.rooms_estimate)}</pre>
                    <div class="sub-title">rooms_last_cleaned (cross-vacuum)</div>
                    <pre style=${e}>${t(n.rooms_last_cleaned)}</pre>
                    <div class="sub-title">rooms_progress — spatial % + time ratio (live)</div>
                    <pre style=${e}>${t(n.rooms_progress)}</pre>
                    <div class="sub-title">rooms (geometry — for spatial coverage)</div>
                    <pre style=${e}>${t((n.rooms??[]).map(t=>({name:t.name,bbox_px:t.bbox_px,x0:t.x0,y0:t.y0,x1:t.x1,y1:t.y1})))}</pre>
                    <details><summary class="hint" style="cursor:pointer">Raw attributes</summary><pre style=${e}>${t(n)}</pre></details>
                  `:q`<p class="hint">Sensor <code>${i}</code> not found.</p>`:q`<p class="hint">No AnyVac integration sensor found (config or auto-resolve) — backend values unavailable.</p>`}
            </div>`})}
      </div>
    `}_renderGlobalTab(){const t=this._config.global_actions??[],e=this._config.room_thresholds??Qt;return q`
      <div class="tab-body">

        <div class="section-title">Layout</div>
        <div class="field field--row">
          <label>Fit card to available screen space</label>
          <label class="toggle-wrap">
            <input type="checkbox" class="toggle-input"
              .checked=${!!this._config.layout}
              @change=${t=>this._setConfig({layout:t.target.checked?this._config.layout??{}:void 0})} />
            <span class="toggle-track"></span>
          </label>
        </div>
        <p class="hint">Recommended for most dashboards — the card sizes itself to fit the space
          it's given (portrait/landscape profiles, tuned spacing, responsive map rotation)
          instead of growing as tall as its content needs. Off keeps the older, simpler
          rendering for dashboards already tuned around it. Advanced per-profile tuning
          (column/row overrides, map crop, orientation) is still YAML-only — this toggle
          turns the system on with its built-in defaults; switch to YAML mode to fine-tune.</p>

        ${this._config.layout?q`
          <div class="field field--row">
            <label>Flip portrait map 180°</label>
            <label class="toggle-wrap">
              <input type="checkbox" class="toggle-input"
                .checked=${!0===this._config.layout.portrait?.crop?.flip}
                @change=${t=>this._setLayoutFlip("portrait",t.target.checked)} />
              <span class="toggle-track"></span>
            </label>
          </div>
          <div class="field field--row">
            <label>Flip landscape map 180°</label>
            <label class="toggle-wrap">
              <input type="checkbox" class="toggle-input"
                .checked=${!0===this._config.layout.landscape?.crop?.flip}
                @change=${t=>this._setLayoutFlip("landscape",t.target.checked)} />
              <span class="toggle-track"></span>
            </label>
          </div>
          <p class="hint">Turns the map upside down if it doesn't match the compass direction
            you're used to (docs/32) — a persisted default for this card. There's also a
            "Flip map" button in the running card's map toolbar for a quick, unsaved
            per-screen try-out that doesn't touch this setting.</p>
        `:G}

        <div class="section-title" style="margin-top:4px">Controller</div>
        ${this._selectField("Mode",this._config.ui_mode??"auto",[{value:"auto",label:"Auto — one orchestrated controller"},{value:"manual",label:"Manual — per-robot controllers"}],t=>this._setConfig({ui_mode:t}))}

        <div class="section-title" style="margin-top:4px">Global presets (Auto mode)</div>
        <p class="hint">Targeted whole-home cleans for Auto mode (e.g. "After dinner", "Whole home"). The integration decides which robots and the order; you pick the scope.</p>
        ${(this._config.global_presets??[]).map((t,e)=>q`
          <div class="sub-section">
            <div class="sub-title" style="display:flex;align-items:center;justify-content:space-between">
              <span>${t.label||t.id}</span>
              <button class="icon-btn icon-btn--danger" title="Delete preset"
                @click=${()=>this._deleteGlobalPreset(e)}>
                <ha-icon icon="mdi:delete"></ha-icon>
              </button>
            </div>
            ${this._textField("Label",t.label,t=>this._setGlobalPreset(e,{label:t}),"e.g. After dinner")}
            ${this._textField("Icon",t.icon,t=>this._setGlobalPreset(e,{icon:t||void 0}),"mdi:silverware-fork-knife")}
            ${this._selectField("Scope","all"===t.scope?"all":"select",[{value:"all",label:"Whole flat"},{value:"select",label:"Pick rooms on map"}],t=>this._setGlobalPreset(e,{scope:t}))}
            ${this._selectField("Mode",t.mode??"dry",[{value:"dry",label:"Dry only"},{value:"wet",label:"Wet only"},{value:"both",label:"Dry then wet (wet follows dry)"}],t=>this._setGlobalPreset(e,{mode:t}))}
          </div>
        `)}
        <button class="btn btn--add" @click=${()=>this._addGlobalPreset()}>
          <ha-icon icon="mdi:plus"></ha-icon> Add global preset
        </button>

        <div class="section-title" style="margin-top:4px">Global actions</div>
        <p class="hint">Badges that trigger a script across all vacuums (e.g. "Clean whole flat").</p>
        ${0===t.length?q`<p class="hint">None configured.</p>`:t.map((t,e)=>this._renderGlobalAccordion(t,e))}
        <button class="btn btn--add" @click=${()=>this._addGlobal()}>
          <ha-icon icon="mdi:plus"></ha-icon> Add global action
        </button>

        <div class="section-title" style="margin-top:4px">Room appearance</div>
        <p class="hint">Applies to all vacuums.</p>
        <div class="field field--row">
          <label>Hide room icons</label>
          <label class="toggle-wrap">
            <input type="checkbox" class="toggle-input"
              .checked=${this._config.room_icon_hidden??!1}
              @change=${t=>this._setConfig({room_icon_hidden:t.target.checked||void 0})} />
            <span class="toggle-track"></span>
          </label>
        </div>
        ${this._numberSlider("Border (idle)",this._config.room_border_normal??2,0,12,1,t=>this._setConfig({room_border_normal:t}),"px")}
        ${this._numberSlider("Border (selected)",this._config.room_border_selected??4,0,12,1,t=>this._setConfig({room_border_selected:t}),"px")}

        <div class="section-title" style="margin-top:4px">Thresholds (border colour by last clean age)</div>
        <p class="hint">Rules ascending — first match wins. Beyond the last = red.</p>
        ${e.map((t,o)=>q`
          <div class="var-row threshold-row">
            <span class="threshold-label">≤</span>
            <input type="number" class="text-input text-input--sm threshold-days"
              min="0" max="365" .value=${String(t.days)}
              @change=${t=>{const i=parseInt(t.target.value),s=e.map((t,e)=>e===o?{...t,days:isNaN(i)?t.days:i}:t);this._setConfig({room_thresholds:s})}} />
            <span class="threshold-label">days</span>
            <input type="color" class="threshold-color" .value=${t.color}
              @input=${t=>{const i=t.target.value,s=e.map((t,e)=>e===o?{...t,color:i}:t);this._setConfig({room_thresholds:s})}} />
            <button class="icon-btn icon-btn--danger icon-btn--sm"
              @click=${()=>{const t=e.filter((t,e)=>e!==o);this._setConfig({room_thresholds:t.length?t:void 0})}}>
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          </div>`)}
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <button class="btn btn--add btn--sm" @click=${()=>this._setConfig({room_thresholds:[...e,{days:14,color:"#ff4d4f"}]})}>
            <ha-icon icon="mdi:plus"></ha-icon> Add threshold
          </button>
          ${this._config.room_thresholds?q`
            <button class="btn btn--sm" @click=${()=>this._setConfig({room_thresholds:void 0})}>
              Reset to defaults
            </button>
          `:G}
        </div>

        <div class="section-title" style="margin-top:4px">Notifications</div>
        <p class="hint">
          Notifications are built from the AnyVac integration's server-side events
          three ready-made automation blueprints (Settings → Automations →
          Create with blueprint) — the card no longer sends notifications itself:
        </p>
        <ul style="margin:0;padding-left:18px;font-size:12px;color:var(--secondary-text-color);display:flex;flex-direction:column;gap:2px">
          <li><strong>Clean finished</strong> — fires on the integration's <code>anyvac_clean_finished</code> event.</li>
          <li><strong>Vacuum error</strong> — watches the official Roborock error sensor's state directly (not an AnyVac event).</li>
          <li><strong>Room overdue</strong> — polls an AnyVac per-room "last cleaned" timestamp sensor hourly against a day threshold you set.</li>
        </ul>
        <p class="hint">The integration also fires <code>anyvac_clean_started</code> and
          <code>anyvac_room_done</code> events, but neither has a shipped blueprint yet —
          build a custom automation on the event if you need one.</p>

        ${(()=>{const t=this._config.vacuums.some(t=>"native-area"===t.clean_action?.type);if(!t)return G;const e=[...new Set(this._config.vacuums.flatMap(t=>(t.rooms??[]).map(t=>t.key)).filter(Boolean))].sort(),o=this._config.area_mappings??{};return q`
            <div class="section-title" style="margin-top:4px">Area mappings</div>
            <p class="hint">Maps room keys to HA areas for the <strong>native-area</strong> strategy (degraded mode only — irrelevant once the AnyVac integration is active for a vacuum). Set once here — applies to all vacuums.</p>
            ${0===e.length?q`<p class="hint">No rooms configured yet.</p>`:e.map(t=>this._areaPicker(t,o[t],e=>{const i={...o};e?i[t]=e:delete i[t],this._setConfig({area_mappings:Object.keys(i).length?i:void 0})}))}
          `})()}

      </div>`}_renderGlobalAccordion(t,e){const o=this._resolveColor(t.color,"orange"),i=this._openGlobal.has(e),s=t.action,n=t.watch_entities??[];return q`
      <div class="acc-row" style=${vt({borderLeft:"3px solid "+o})}>
        <div class="acc-header" @click=${()=>this._toggleGlobal(e)}>
          ${t.image?q`<img class="acc-img" src=${t.image} alt=${t.name} />`:q`<ha-icon icon="mdi:home-floor-a" style=${vt({color:o,width:"36px",height:"36px"})}></ha-icon>`}
          <div class="acc-info">
            <span class="acc-name">${t.name||"Unnamed action"}</span>
            <span class="acc-sub">${"script"===s.type?s.entity_id:s.service}</span>
          </div>
          <button class="icon-btn icon-btn--danger"
            @click=${t=>{t.stopPropagation(),this._deleteGlobal(e)}}>
            <ha-icon icon="mdi:delete"></ha-icon>
          </button>
          <ha-icon icon=${i?"mdi:chevron-up":"mdi:chevron-down"} class="acc-chevron"></ha-icon>
        </div>
        ${i?q`
          <div class="acc-body">
            ${this._textField("Display name",t.name,t=>this._setGlobal(e,{name:t}),"e.g. Whole flat")}
            ${this._textField("Image path",t.image,t=>this._setGlobal(e,{image:t||void 0}),"/local/...")}
            ${this._hexColorField("Accent colour",t.color?this._resolveColor(t.color,"orange"):void 0,t=>this._setGlobal(e,{color:t||void 0}),"#faad14")}

            <div class="sub-title">Watch entities (badge glows when any is cleaning)</div>
            ${n.map((t,o)=>q`
              <div class="var-row">
                <ha-entity-picker .hass=${this.hass} .value=${t} .includeDomains=${["vacuum"]}
                  allow-custom-entity style="flex:1"
                  @value-changed=${t=>{const i=[...n];i[o]=t.detail.value,this._setGlobal(e,{watch_entities:i.filter(Boolean)})}}></ha-entity-picker>
                <button class="icon-btn icon-btn--danger icon-btn--sm"
                  @click=${()=>this._setGlobal(e,{watch_entities:n.filter((t,e)=>e!==o)})}>
                  <ha-icon icon="mdi:close"></ha-icon>
                </button>
              </div>`)}
            <button class="btn btn--add btn--sm"
              @click=${()=>this._setGlobal(e,{watch_entities:[...n,""]})}>
              <ha-icon icon="mdi:plus"></ha-icon> Add entity
            </button>

            <div class="sub-title">Action (hold-to-activate)</div>
            ${this._selectField("Type",s.type,[{value:"script",label:"Script"},{value:"service",label:"Service call"}],t=>this._setGlobal(e,{action:"script"===t?{type:"script",entity_id:""}:{type:"service",service:""}}))}
            ${"script"===s.type?this._entityPicker("Script entity",s.entity_id,["script"],t=>this._setGlobalAction(e,{entity_id:t})):this._textField("Service",s.service,t=>this._setGlobalAction(e,{service:t}),"e.g. script.celkovy_uklid_bytu")}
          </div>
        `:G}
      </div>`}render(){return this._config?q`
      <datalist id="ha-entities"></datalist>
      <div class="editor-root">
        <div class="tabs-bar">
          ${["vacuums","maps","global"].map(t=>q`
            <button class="tab-btn ${this._tab===t?"tab-btn--active":""}"
              @click=${()=>{this._tab=t}}>
              ${{vacuums:"🤖 Vacuums",maps:"🗺 Maps",global:"⚙ Global"}[t]}
            </button>`)}
        </div>
        ${"vacuums"===this._tab?this._renderVacuumsTab():"maps"===this._tab?this._renderMapsTab():"debug"===this._tab?this._renderDebugTab():this._renderGlobalTab()}
        <div class="editor-footer">
          <span class="footer-link" @click=${()=>{this._tab="debug"===this._tab?"vacuums":"debug"}}>
            ${"debug"===this._tab?"← Back":"🐞 Show debug info"}
          </span>
          <span>anyvac-card v${$t}</span>
        </div>
      </div>`:G}};ee.styles=a`
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

    /* ── Cleaning sequence list (docs/19) ── */
    .seq-list { display:flex; flex-direction:column; gap:2px; }
    .seq-row {
      display:flex; align-items:center; gap:8px; padding:6px 8px;
      border-radius:6px; border:1px solid var(--divider-color,rgba(0,0,0,.1));
      background:rgba(0,0,0,.015);
    }
    .seq-row--dragging { opacity:0.4; }
    .seq-pos {
      flex-shrink:0; width:20px; text-align:center; font-size:12px; font-weight:700;
      color:var(--secondary-text-color);
    }
    .seq-name { flex:1; font-size:13px; }
    .seq-flag {
      flex-shrink:0; width:16px; height:16px; border-radius:50%; background:#faad14;
      color:#000; font-size:11px; font-weight:700; display:flex; align-items:center;
      justify-content:center;
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
      color:rgba(255,255,255,.7); cursor:grab;
      touch-action:none; -webkit-user-select:none; user-select:none;
    }
    .pos-dot--active { background:rgba(33,150,243,.75); border-color:#2196F3; color:white; }

    /* Rectangle overlay mode (map_w/map_h set) — draws the actual box instead of
       just a centre dot, with drag-to-move + corner handles to drag-to-resize
       (2026-07-26: sliders used to move a box nobody could see). */
    .room-rect {
      position:absolute; box-sizing:border-box; transform:translate(-50%,-50%);
      border:2px solid rgba(255,255,255,.55); border-radius:4px;
      background:rgba(0,0,0,.25);
      display:flex; align-items:center; justify-content:center;
      color:rgba(255,255,255,.8); cursor:grab;
      touch-action:none; -webkit-user-select:none; user-select:none;
    }
    .room-rect--active { border-color:#2196F3; background:rgba(33,150,243,.25); color:white; }
    .room-rect-handle {
      position:absolute; transform:translate(-50%,-50%);
      width:14px; height:14px; border-radius:50%;
      background:#2196F3; border:2px solid white;
      touch-action:none;
    }
    .room-rect-handle--nw { left:0%;   top:0%;   cursor:nwse-resize; }
    .room-rect-handle--se { left:100%; top:100%; cursor:nwse-resize; }
    .room-rect-handle--ne { left:100%; top:0%;   cursor:nesw-resize; }
    .room-rect-handle--sw { left:0%;   top:100%; cursor:nesw-resize; }

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
      font-size:11px;
      color:var(--secondary-text-color); opacity:.7;
      display:flex; align-items:center; justify-content:space-between; gap:8px;
    }
    .footer-link { cursor:pointer; text-decoration:underline; text-underline-offset:2px; }
    .footer-link:hover { opacity:.8; }

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

    .hex-color-row { display:flex; align-items:center; gap:6px; }
    .hex-color-row .text-input { flex:1; }
  `,t([ut({attribute:!1})],ee.prototype,"hass",void 0),t([_t()],ee.prototype,"_config",void 0),t([_t()],ee.prototype,"_tab",void 0),t([_t()],ee.prototype,"_dragRoom",void 0),t([_t()],ee.prototype,"_dragSeq",void 0),t([_t()],ee.prototype,"_openVac",void 0),t([_t()],ee.prototype,"_openSensors",void 0),t([_t()],ee.prototype,"_openPresets",void 0),t([_t()],ee.prototype,"_openAction",void 0),t([_t()],ee.prototype,"_openGlobal",void 0),t([_t()],ee.prototype,"_openRoom",void 0),t([_t()],ee.prototype,"_mapVac",void 0),t([_t()],ee.prototype,"_mapRoom",void 0),t([_t()],ee.prototype,"_pvAR",void 0),t([_t()],ee.prototype,"_refMapUrl",void 0),t([_t()],ee.prototype,"_floorplanSnapshotBusy",void 0),t([_t()],ee.prototype,"_floorplanSnapshotError",void 0),ee=t([ht(wt)],ee);export{Lt as AnyVacCard,ee as AnyVacCardEditor};
//# sourceMappingURL=anyvac-card.js.map
