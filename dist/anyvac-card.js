/* AnyVac Card — https://github.com/Michailjovic/anyvac-card */
function __decorate(e,t,o,s){var l,h=arguments.length,d=h<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,o):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)d=Reflect.decorate(e,t,o,s);else for(var p=e.length-1;p>=0;p--)(l=e[p])&&(d=(h<3?l(d):h>3?l(t,o,d):l(t,o))||d);return h>3&&d&&Object.defineProperty(t,o,d),d}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=globalThis,t=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,o=Symbol(),s=new WeakMap;let l=class n{constructor(e,t,s){if(this._$cssResult$=!0,s!==o)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const o=this.t;if(t&&void 0===e){const t=void 0!==o&&1===o.length;t&&(e=s.get(o)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&s.set(o,e))}return e}toString(){return this.cssText}};const i$6=(e,...t)=>{const s=1===e.length?e[0]:t.reduce((t,o,s)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+e[s+1],e[0]);return new l(s,e,o)},h=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const o of e.cssRules)t+=o.cssText;return(e=>new l("string"==typeof e?e:e+"",void 0,o))(t)})(e):e,{is:d,defineProperty:p,getOwnPropertyDescriptor:u,getOwnPropertyNames:m,getOwnPropertySymbols:_,getPrototypeOf:f}=Object,v=globalThis,b=v.trustedTypes,w=b?b.emptyScript:"",$=v.reactiveElementPolyfillSupport,d$2=(e,t)=>e,C={toAttribute(e,t){switch(t){case Boolean:e=e?w:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let o=e;switch(t){case Boolean:o=null!==e;break;case Number:o=null===e?null:Number(e);break;case Object:case Array:try{o=JSON.parse(e)}catch(e){o=null}}return o}},f$2=(e,t)=>!d(e,t),A={attribute:!0,type:String,converter:C,reflect:!1,useDefault:!1,hasChanged:f$2};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),v.litPropertyMetadata??=new WeakMap;let P=class y extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=A){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const o=Symbol(),s=this.getPropertyDescriptor(e,o,t);void 0!==s&&p(this.prototype,e,s)}}static getPropertyDescriptor(e,t,o){const{get:s,set:l}=u(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:s,set(t){const h=s?.call(this);l?.call(this,t),this.requestUpdate(e,h,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??A}static _$Ei(){if(this.hasOwnProperty(d$2("elementProperties")))return;const e=f(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(d$2("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(d$2("properties"))){const e=this.properties,t=[...m(e),..._(e)];for(const o of t)this.createProperty(o,e[o])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,o]of t)this.elementProperties.set(e,o)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const o=this._$Eu(e,t);void 0!==o&&this._$Eh.set(o,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const o=new Set(e.flat(1/0).reverse());for(const e of o)t.unshift(h(e))}else void 0!==e&&t.push(h(e));return t}static _$Eu(e,t){const o=t.attribute;return!1===o?void 0:"string"==typeof o?o:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const o of t.keys())this.hasOwnProperty(o)&&(e.set(o,this[o]),delete this[o]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const o=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((o,s)=>{if(t)o.adoptedStyleSheets=s.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const t of s){const s=document.createElement("style"),l=e.litNonce;void 0!==l&&s.setAttribute("nonce",l),s.textContent=t.cssText,o.appendChild(s)}})(o,this.constructor.elementStyles),o}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,o){this._$AK(e,o)}_$ET(e,t){const o=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,o);if(void 0!==s&&!0===o.reflect){const l=(void 0!==o.converter?.toAttribute?o.converter:C).toAttribute(t,o.type);this._$Em=e,null==l?this.removeAttribute(s):this.setAttribute(s,l),this._$Em=null}}_$AK(e,t){const o=this.constructor,s=o._$Eh.get(e);if(void 0!==s&&this._$Em!==s){const e=o.getPropertyOptions(s),l="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:C;this._$Em=s;const h=l.fromAttribute(t,e.type);this[s]=h??this._$Ej?.get(s)??h,this._$Em=null}}requestUpdate(e,t,o,s=!1,l){if(void 0!==e){const h=this.constructor;if(!1===s&&(l=this[e]),o??=h.getPropertyOptions(e),!((o.hasChanged??f$2)(l,t)||o.useDefault&&o.reflect&&l===this._$Ej?.get(e)&&!this.hasAttribute(h._$Eu(e,o))))return;this.C(e,t,o)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:o,reflect:s,wrapped:l},h){o&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,h??t??this[e]),!0!==l||void 0!==h)||(this._$AL.has(e)||(this.hasUpdated||o||(t=void 0),this._$AL.set(e,t)),!0===s&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,o]of e){const{wrapped:e}=o,s=this[t];!0!==e||this._$AL.has(t)||void 0===s||this.C(t,void 0,o,s)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};P.elementStyles=[],P.shadowRootOptions={mode:"open"},P[d$2("elementProperties")]=new Map,P[d$2("finalized")]=new Map,$?.({ReactiveElement:P}),(v.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const F=globalThis,i$4=e=>e,E=F.trustedTypes,T=E?E.createPolicy("lit-html",{createHTML:e=>e}):void 0,O="$lit$",B=`lit$${Math.random().toFixed(9).slice(2)}$`,G="?"+B,j=`<${G}>`,q=document,c$1=()=>q.createComment(""),a$1=e=>null===e||"object"!=typeof e&&"function"!=typeof e,W=Array.isArray,U="[ \t\n\f\r]",Y=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,K=/-->/g,X=/>/g,J=RegExp(`>|${U}(?:([^\\s"'>=/]+)(${U}*=${U}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),Q=/'/g,ee=/"/g,te=/^(?:script|style|textarea|title)$/i,oe=Symbol.for("lit-noChange"),ie=Symbol.for("lit-nothing"),ae=new WeakMap,se=q.createTreeWalker(q,129);function V$1(e,t){if(!W(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==T?T.createHTML(t):t}let ne=class S{constructor({strings:e,_$litType$:t},o){let s;this.parts=[];let l=0,h=0;const d=e.length-1,p=this.parts,[u,m]=((e,t)=>{const o=e.length-1,s=[];let l,h=2===t?"<svg>":3===t?"<math>":"",d=Y;for(let t=0;t<o;t++){const o=e[t];let p,u,m=-1,_=0;for(;_<o.length&&(d.lastIndex=_,u=d.exec(o),null!==u);)_=d.lastIndex,d===Y?"!--"===u[1]?d=K:void 0!==u[1]?d=X:void 0!==u[2]?(te.test(u[2])&&(l=RegExp("</"+u[2],"g")),d=J):void 0!==u[3]&&(d=J):d===J?">"===u[0]?(d=l??Y,m=-1):void 0===u[1]?m=-2:(m=d.lastIndex-u[2].length,p=u[1],d=void 0===u[3]?J:'"'===u[3]?ee:Q):d===ee||d===Q?d=J:d===K||d===X?d=Y:(d=J,l=void 0);const f=d===J&&e[t+1].startsWith("/>")?" ":"";h+=d===Y?o+j:m>=0?(s.push(p),o.slice(0,m)+O+o.slice(m)+B+f):o+B+(-2===m?t:f)}return[V$1(e,h+(e[o]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),s]})(e,t);if(this.el=S.createElement(u,o),se.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(s=se.nextNode())&&p.length<d;){if(1===s.nodeType){if(s.hasAttributes())for(const e of s.getAttributeNames())if(e.endsWith(O)){const t=m[h++],o=s.getAttribute(e).split(B),d=/([.?@])?(.*)/.exec(t);p.push({type:1,index:l,name:d[2],strings:o,ctor:"."===d[1]?he:"?"===d[1]?de:"@"===d[1]?pe:ce}),s.removeAttribute(e)}else e.startsWith(B)&&(p.push({type:6,index:l}),s.removeAttribute(e));if(te.test(s.tagName)){const e=s.textContent.split(B),t=e.length-1;if(t>0){s.textContent=E?E.emptyScript:"";for(let o=0;o<t;o++)s.append(e[o],c$1()),se.nextNode(),p.push({type:2,index:++l});s.append(e[t],c$1())}}}else if(8===s.nodeType)if(s.data===G)p.push({type:2,index:l});else{let e=-1;for(;-1!==(e=s.data.indexOf(B,e+1));)p.push({type:7,index:l}),e+=B.length-1}l++}}static createElement(e,t){const o=q.createElement("template");return o.innerHTML=e,o}};function M$1(e,t,o=e,s){if(t===oe)return t;let l=void 0!==s?o._$Co?.[s]:o._$Cl;const h=a$1(t)?void 0:t._$litDirective$;return l?.constructor!==h&&(l?._$AO?.(!1),void 0===h?l=void 0:(l=new h(e),l._$AT(e,o,s)),void 0!==s?(o._$Co??=[])[s]=l:o._$Cl=l),void 0!==l&&(t=M$1(e,l._$AS(e,t.values),l,s)),t}let re=class R{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:o}=this._$AD,s=(e?.creationScope??q).importNode(t,!0);se.currentNode=s;let l=se.nextNode(),h=0,d=0,p=o[0];for(;void 0!==p;){if(h===p.index){let t;2===p.type?t=new le(l,l.nextSibling,this,e):1===p.type?t=new p.ctor(l,p.name,p.strings,this,e):6===p.type&&(t=new ue(l,this,e)),this._$AV.push(t),p=o[++d]}h!==p?.index&&(l=se.nextNode(),h++)}return se.currentNode=q,s}p(e){let t=0;for(const o of this._$AV)void 0!==o&&(void 0!==o.strings?(o._$AI(e,o,t),t+=o.strings.length-2):o._$AI(e[t])),t++}},le=class k{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,o,s){this.type=2,this._$AH=ie,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=o,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=M$1(this,e,t),a$1(e)?e===ie||null==e||""===e?(this._$AH!==ie&&this._$AR(),this._$AH=ie):e!==this._$AH&&e!==oe&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>W(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==ie&&a$1(this._$AH)?this._$AA.nextSibling.data=e:this.T(q.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:o}=e,s="number"==typeof o?this._$AC(e):(void 0===o.el&&(o.el=ne.createElement(V$1(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===s)this._$AH.p(t);else{const e=new re(s,this),o=e.u(this.options);e.p(t),this.T(o),this._$AH=e}}_$AC(e){let t=ae.get(e.strings);return void 0===t&&ae.set(e.strings,t=new ne(e)),t}k(e){W(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let o,s=0;for(const l of e)s===t.length?t.push(o=new k(this.O(c$1()),this.O(c$1()),this,this.options)):o=t[s],o._$AI(l),s++;s<t.length&&(this._$AR(o&&o._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=i$4(e).nextSibling;i$4(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}},ce=class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,o,s,l){this.type=1,this._$AH=ie,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=l,o.length>2||""!==o[0]||""!==o[1]?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=ie}_$AI(e,t=this,o,s){const l=this.strings;let h=!1;if(void 0===l)e=M$1(this,e,t,0),h=!a$1(e)||e!==this._$AH&&e!==oe,h&&(this._$AH=e);else{const s=e;let d,p;for(e=l[0],d=0;d<l.length-1;d++)p=M$1(this,s[o+d],t,d),p===oe&&(p=this._$AH[d]),h||=!a$1(p)||p!==this._$AH[d],p===ie?e=ie:e!==ie&&(e+=(p??"")+l[d+1]),this._$AH[d]=p}h&&!s&&this.j(e)}j(e){e===ie?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},he=class I extends ce{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===ie?void 0:e}},de=class L extends ce{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==ie)}},pe=class z extends ce{constructor(e,t,o,s,l){super(e,t,o,s,l),this.type=5}_$AI(e,t=this){if((e=M$1(this,e,t,0)??ie)===oe)return;const o=this._$AH,s=e===ie&&o!==ie||e.capture!==o.capture||e.once!==o.once||e.passive!==o.passive,l=e!==ie&&(o===ie||s);s&&this.element.removeEventListener(this.name,this,o),l&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},ue=class Z{constructor(e,t,o){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(e){M$1(this,e)}};const me=F.litHtmlPolyfillSupport;me?.(ne,le),(F.litHtmlVersions??=[]).push("3.3.3");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ge=globalThis,i$3=e=>e,_e=ge.trustedTypes,fe=_e?_e.createPolicy("lit-html",{createHTML:e=>e}):void 0,ve="$lit$",be=`lit$${Math.random().toFixed(9).slice(2)}$`,ye="?"+be,xe=`<${ye}>`,we=document,c=()=>we.createComment(""),a=e=>null===e||"object"!=typeof e&&"function"!=typeof e,$e=Array.isArray,ke="[ \t\n\f\r]",Se=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ce=/-->/g,Ae=/>/g,Re=RegExp(`>|${ke}(?:([^\\s"'>=/]+)(${ke}*=${ke}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),Me=/'/g,Pe=/"/g,Fe=/^(?:script|style|textarea|title)$/i,x=e=>(t,...o)=>({_$litType$:e,strings:t,values:o}),Ee=x(1),ze=x(2),Te=Symbol.for("lit-noChange"),De=Symbol.for("lit-nothing"),He=new WeakMap,Ie=we.createTreeWalker(we,129);function V(e,t){if(!$e(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==fe?fe.createHTML(t):t}const N=(e,t)=>{const o=e.length-1,s=[];let l,h=2===t?"<svg>":3===t?"<math>":"",d=Se;for(let t=0;t<o;t++){const o=e[t];let p,u,m=-1,_=0;for(;_<o.length&&(d.lastIndex=_,u=d.exec(o),null!==u);)_=d.lastIndex,d===Se?"!--"===u[1]?d=Ce:void 0!==u[1]?d=Ae:void 0!==u[2]?(Fe.test(u[2])&&(l=RegExp("</"+u[2],"g")),d=Re):void 0!==u[3]&&(d=Re):d===Re?">"===u[0]?(d=l??Se,m=-1):void 0===u[1]?m=-2:(m=d.lastIndex-u[2].length,p=u[1],d=void 0===u[3]?Re:'"'===u[3]?Pe:Me):d===Pe||d===Me?d=Re:d===Ce||d===Ae?d=Se:(d=Re,l=void 0);const f=d===Re&&e[t+1].startsWith("/>")?" ":"";h+=d===Se?o+xe:m>=0?(s.push(p),o.slice(0,m)+ve+o.slice(m)+be+f):o+be+(-2===m?t:f)}return[V(e,h+(e[o]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),s]};class S{constructor({strings:e,_$litType$:t},o){let s;this.parts=[];let l=0,h=0;const d=e.length-1,p=this.parts,[u,m]=N(e,t);if(this.el=S.createElement(u,o),Ie.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(s=Ie.nextNode())&&p.length<d;){if(1===s.nodeType){if(s.hasAttributes())for(const e of s.getAttributeNames())if(e.endsWith(ve)){const t=m[h++],o=s.getAttribute(e).split(be),d=/([.?@])?(.*)/.exec(t);p.push({type:1,index:l,name:d[2],strings:o,ctor:"."===d[1]?I:"?"===d[1]?L:"@"===d[1]?z:H}),s.removeAttribute(e)}else e.startsWith(be)&&(p.push({type:6,index:l}),s.removeAttribute(e));if(Fe.test(s.tagName)){const e=s.textContent.split(be),t=e.length-1;if(t>0){s.textContent=_e?_e.emptyScript:"";for(let o=0;o<t;o++)s.append(e[o],c()),Ie.nextNode(),p.push({type:2,index:++l});s.append(e[t],c())}}}else if(8===s.nodeType)if(s.data===ye)p.push({type:2,index:l});else{let e=-1;for(;-1!==(e=s.data.indexOf(be,e+1));)p.push({type:7,index:l}),e+=be.length-1}l++}}static createElement(e,t){const o=we.createElement("template");return o.innerHTML=e,o}}function M(e,t,o=e,s){if(t===Te)return t;let l=void 0!==s?o._$Co?.[s]:o._$Cl;const h=a(t)?void 0:t._$litDirective$;return l?.constructor!==h&&(l?._$AO?.(!1),void 0===h?l=void 0:(l=new h(e),l._$AT(e,o,s)),void 0!==s?(o._$Co??=[])[s]=l:o._$Cl=l),void 0!==l&&(t=M(e,l._$AS(e,t.values),l,s)),t}class R{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:o}=this._$AD,s=(e?.creationScope??we).importNode(t,!0);Ie.currentNode=s;let l=Ie.nextNode(),h=0,d=0,p=o[0];for(;void 0!==p;){if(h===p.index){let t;2===p.type?t=new k(l,l.nextSibling,this,e):1===p.type?t=new p.ctor(l,p.name,p.strings,this,e):6===p.type&&(t=new Z(l,this,e)),this._$AV.push(t),p=o[++d]}h!==p?.index&&(l=Ie.nextNode(),h++)}return Ie.currentNode=we,s}p(e){let t=0;for(const o of this._$AV)void 0!==o&&(void 0!==o.strings?(o._$AI(e,o,t),t+=o.strings.length-2):o._$AI(e[t])),t++}}class k{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,o,s){this.type=2,this._$AH=De,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=o,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=M(this,e,t),a(e)?e===De||null==e||""===e?(this._$AH!==De&&this._$AR(),this._$AH=De):e!==this._$AH&&e!==Te&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>$e(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==De&&a(this._$AH)?this._$AA.nextSibling.data=e:this.T(we.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:o}=e,s="number"==typeof o?this._$AC(e):(void 0===o.el&&(o.el=S.createElement(V(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===s)this._$AH.p(t);else{const e=new R(s,this),o=e.u(this.options);e.p(t),this.T(o),this._$AH=e}}_$AC(e){let t=He.get(e.strings);return void 0===t&&He.set(e.strings,t=new S(e)),t}k(e){$e(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let o,s=0;for(const l of e)s===t.length?t.push(o=new k(this.O(c()),this.O(c()),this,this.options)):o=t[s],o._$AI(l),s++;s<t.length&&(this._$AR(o&&o._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=i$3(e).nextSibling;i$3(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,o,s,l){this.type=1,this._$AH=De,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=l,o.length>2||""!==o[0]||""!==o[1]?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=De}_$AI(e,t=this,o,s){const l=this.strings;let h=!1;if(void 0===l)e=M(this,e,t,0),h=!a(e)||e!==this._$AH&&e!==Te,h&&(this._$AH=e);else{const s=e;let d,p;for(e=l[0],d=0;d<l.length-1;d++)p=M(this,s[o+d],t,d),p===Te&&(p=this._$AH[d]),h||=!a(p)||p!==this._$AH[d],p===De?e=De:e!==De&&(e+=(p??"")+l[d+1]),this._$AH[d]=p}h&&!s&&this.j(e)}j(e){e===De?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class I extends H{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===De?void 0:e}}class L extends H{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==De)}}class z extends H{constructor(e,t,o,s,l){super(e,t,o,s,l),this.type=5}_$AI(e,t=this){if((e=M(this,e,t,0)??De)===Te)return;const o=this._$AH,s=e===De&&o!==De||e.capture!==o.capture||e.once!==o.once||e.passive!==o.passive,l=e!==De&&(o===De||s);s&&this.element.removeEventListener(this.name,this,o),l&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class Z{constructor(e,t,o){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(e){M(this,e)}}const Oe=ge.litHtmlPolyfillSupport;Oe?.(S,k),(ge.litHtmlVersions??=[]).push("3.3.3");const D=(e,t,o)=>{const s=o?.renderBefore??t;let l=s._$litPart$;if(void 0===l){const e=o?.renderBefore??null;s._$litPart$=l=new k(t.insertBefore(c(),e),e,void 0,o??{})}return l._$AI(e),l
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */},Ne=globalThis;let Be=class i extends P{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=D(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Te}};Be._$litElement$=!0,Be.finalized=!0,Ne.litElementHydrateSupport?.({LitElement:Be});const Ge=Ne.litElementPolyfillSupport;Ge?.({LitElement:Be}),(Ne.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1=e=>(t,o)=>{void 0!==o?o.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},Ve={attribute:!0,type:String,converter:C,reflect:!1,hasChanged:f$2},r$1=(e=Ve,t,o)=>{const{kind:s,metadata:l}=o;let h=globalThis.litPropertyMetadata.get(l);if(void 0===h&&globalThis.litPropertyMetadata.set(l,h=new Map),"setter"===s&&((e=Object.create(e)).wrapped=!0),h.set(o.name,e),"accessor"===s){const{name:s}=o;return{set(o){const l=t.get.call(this);t.set.call(this,o),this.requestUpdate(s,l,e,!0,o)},init(t){return void 0!==t&&this.C(s,void 0,e,t),t}}}if("setter"===s){const{name:s}=o;return function(o){const l=this[s];t.call(this,o),this.requestUpdate(s,l,e,!0,o)}}throw Error("Unsupported decorator location: "+s)};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function n$1(e){return(t,o)=>"object"==typeof o?r$1(e,t,o):((e,t,o)=>{const s=t.hasOwnProperty(o);return t.constructor.createProperty(o,e),s?Object.getOwnPropertyDescriptor(t,o):void 0})(e,t,o)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function r(e){return n$1({...e,state:!0,attribute:!1})}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const je=1;let qe=class i{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,o){this._$Ct=e,this._$AM=t,this._$Ci=o}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const We="important",Le=" !"+We,Ue=(e=>(...t)=>({_$litDirective$:e,values:t}))(class extends qe{constructor(e){if(super(e),e.type!==je||"style"!==e.name||e.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(e){return Object.keys(e).reduce((t,o)=>{const s=e[o];return null==s?t:t+`${o=o.includes("-")?o:o.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`},"")}update(e,[t]){const{style:o}=e.element;if(void 0===this.ft)return this.ft=new Set(Object.keys(t)),this.render(t);for(const e of this.ft)null==t[e]&&(this.ft.delete(e),e.includes("-")?o.removeProperty(e):o[e]=null);for(const e in t){const s=t[e];if(null!=s){this.ft.add(e);const t="string"==typeof s&&s.endsWith(Le);e.includes("-")||t?o.setProperty(e,t?s.slice(0,-11):s,t?We:""):o[e]=s}}return oe}}),Ye="anyvac-card",Ke="anyvac-card-editor",Xe="1.43.0",Ze=600,Je={cleaning:["Cleaning","#52c41a","mdi:broom"],segment_cleaning:["Cleaning rooms","#52c41a","mdi:broom"],zoned_cleaning:["Zone cleaning","#52c41a","mdi:broom"],spot_cleaning:["Spot cleaning","#52c41a","mdi:target"],starting:["Starting","#52c41a","mdi:play"],segment_mopping:["Mopping rooms","#40a9ff","mdi:water"],zoned_mopping:["Zone mopping","#40a9ff","mdi:water"],robot_status_mopping:["Mopping","#40a9ff","mdi:water"],clean_mop_cleaning:["Vacuuming+mopping","#52c41a","mdi:water-plus"],clean_mop_mopping:["Vacuuming+mopping","#52c41a","mdi:water-plus"],segment_clean_mop_cleaning:["Rooms (vac)","#52c41a","mdi:water-plus"],segment_clean_mop_mopping:["Rooms (mop)","#52c41a","mdi:water-plus"],zoned_clean_mop_cleaning:["Zones (vac)","#52c41a","mdi:water-plus"],zoned_clean_mop_mopping:["Zones (mop)","#52c41a","mdi:water-plus"],washing_the_mop:["Washing mop","#9254de","mdi:shower-head"],washing_the_mop_2:["Washing mop","#9254de","mdi:shower-head"],going_to_wash_the_mop:["Going to wash mop","#9254de","mdi:shower-head"],air_drying_stopping:["Drying mop","#9254de","mdi:weather-windy"],back_to_dock_washing_duster:["Dock + washing","#faad14","mdi:home-import-outline"],returning_home:["Returning home","#faad14","mdi:home-import-outline"],docking:["Docking","#faad14","mdi:home-import-outline"],going_to_target:["Going to target","#40a9ff","mdi:target"],charging:["Charging","rgba(var(--avc-ink-rgb),0.75)","mdi:lightning-bolt"],charging_complete:["Fully charged","#52c41a","mdi:check-circle-outline"],docked:["Docked","rgba(var(--avc-ink-rgb),0.75)","mdi:check-circle-outline"],charger_disconnected:["Charger disconnected","#faad14","mdi:power-plug-off-outline"],emptying_the_bin:["Emptying bin","#faad14","mdi:delete-empty-outline"],idle:["Idle","rgba(var(--avc-ink-rgb),0.45)","mdi:sleep"],paused:["Paused","#faad14","mdi:pause"],mapping:["Mapping","#40a9ff","mdi:map-search-outline"],remote_control_active:["Remote control","#40a9ff","mdi:gamepad-variant-outline"],manual_mode:["Manual mode","#40a9ff","mdi:gamepad-variant-outline"],updating:["Updating","#faad14","mdi:update"],in_call:["In call","#faad14","mdi:phone"],shutting_down:["Shutting down","rgba(var(--avc-ink-rgb),0.4)","mdi:power"],error:["Error","#ff4d4f","mdi:alert-circle-outline"],charging_problem:["Charging problem","#ff4d4f","mdi:alert-outline"],locked:["Locked","#ff4d4f","mdi:lock-outline"],device_offline:["Offline","#ff4d4f","mdi:wifi-off"]},Qe={"#52c41a":"#5DBB6A","#40a9ff":"#4DA3E8","#9254de":"#A48BE0","#faad14":"#E0A84A","#ff4d4f":"#E5675F"},et={green:"#52c41a",blue:"#2196F3",orange:"#faad14"},tt=["#52c41a","#2196F3","#faad14","#eb2f96","#722ed1","#13c2c2","#fa541c","#a0d911"],ot={green:"rgba(46,204,113,0.18)",blue:"rgba(33,150,243,0.18)",orange:"rgba(250,173,20,0.18)"},it={green:"rgba(46,204,113,0.30)",blue:"rgba(33,150,243,0.30)",orange:"rgba(250,173,20,0.30)"};const at="dark",st=[{id:"sage",label:"Sage",hex:"#6FBF73"},{id:"ocean",label:"Ocean",hex:"#4FA5C7"},{id:"terracotta",label:"Terracotta",hex:"#D98A6A"},{id:"plum",label:"Plum",hex:"#A87CC0"},{id:"amber",label:"Amber",hex:"#D9A441"},{id:"graphite",label:"Graphite",hex:"#8E97A8"}];const nt=new Set(["cleaning","segment_cleaning","zoned_cleaning","spot_cleaning","segment_mopping","zoned_mopping","robot_status_mopping","clean_mop_cleaning","clean_mop_mopping","segment_clean_mop_cleaning","segment_clean_mop_mopping","zoned_clean_mop_cleaning","zoned_clean_mop_mopping"]);function mapPxDims(e){if(!e)return null;const t=e.scale??1;let o=(e.width??0)*t,s=(e.height??0)*t;const l=e.rotation??0;if(90===l||270===l){const e=o;o=s,s=e}return o>0&&s>0?{NW:o,NH:s}:null}const rt=Math.PI/180;function seatFromFrame(e,t,o,s,l,h,d){let p=Math.round(e/rt)%360;return p<0&&(p+=360),{rotation:p,scale:100*t,offset_x:100*o.x-50,offset_y:o.y*s*100-50,residual_pct:100*l,anchors:h,raw_rotation:Math.round(d/rt*10)/10}}function computeSeatFit(e,t,o){if(!(e.length&&t>0))return null;if(e.length>=2){const o=e.length,s={x:0,y:0},l={x:0,y:0};for(const t of e)s.x+=t.q.x,s.y+=t.q.y,l.x+=t.a.x,l.y+=t.a.y;s.x/=o,s.y/=o,l.x/=o,l.y/=o;let h=0,d=0,p=0;for(const t of e){const e=t.q.x-s.x,o=t.q.y-s.y,u=t.a.x-l.x,m=t.a.y-l.y;h+=e*u+o*m,d+=e*m-o*u,p+=e*e+o*o}if(p>1e-8){const u=Math.atan2(d,h),m=Math.round(u/(Math.PI/2))*(Math.PI/2),_=Math.cos(m),f=Math.sin(m);let v=0;for(const t of e){const e=t.q.x-s.x,o=t.q.y-s.y,h=f*e+_*o;v+=(_*e-f*o)*(t.a.x-l.x)+h*(t.a.y-l.y)}const b=v/p;if(b>1e-4){const h={x:l.x-b*(_*s.x-f*s.y),y:l.y-b*(f*s.x+_*s.y)};let d=0;for(const t of e){const e=h.x+b*(_*t.q.x-f*t.q.y)-t.a.x,o=h.y+b*(f*t.q.x+_*t.q.y)-t.a.y;d+=e*e+o*o}return seatFromFrame(m,b,h,t,Math.sqrt(d/o),o,u)}}}const s=e.find(e=>e.sizeQ&&e.sizeA)??null;if(!s||!s.sizeQ||!s.sizeA||s.sizeQ.w<1e-6||s.sizeQ.h<1e-6)return null;let l=null;for(const e of[0,1,2,3]){const t=e*(Math.PI/2),o=e%2==0?s.sizeQ.w:s.sizeQ.h,h=e%2==0?s.sizeQ.h:s.sizeQ.w,d=s.sizeA.w/o,p=s.sizeA.h/h;if(!(d>0&&p>0))continue;const u=Math.sqrt(d*p),m=Math.abs(Math.log(d/p));(!l||m<l.mism-1e-9)&&(l={theta:t,s:u,mism:m})}if(!l)return null;const h=Math.cos(l.theta),d=Math.sin(l.theta),p={x:s.a.x-l.s*(h*s.q.x-d*s.q.y),y:s.a.y-l.s*(d*s.q.x+h*s.q.y)};return seatFromFrame(l.theta,l.s,p,t,0,1,l.theta)}function resolveImageBaseSrc(e,t){const o="merged"===e.map_mode?e.image_base??(e.vacuums??[]).find(e=>e.image_base?.src)?.image_base:t?.image_base;return o?.src}function resolveStaticRooms(e,t){return(e.rooms?.length?e.rooms:t?.rooms)??[]}function resolveSeat(e,t,o,s){const l=t?.map,h={rotation:l?.rotation??0,scale:l?.scale??100,scaleY:l?.scale_y,offset_x:l?.offset_x??0,offset_y:l?.offset_y??0,auto:!1};if(!t||"manual"===l?.seat)return h;if(!resolveImageBaseSrc(e,t))return h;if(!o)return h;const d=computeSeatFit(function assembleAnchors(e,t,o){if(!t)return[];const s=mapPxDims(t.image_dims),l=Array.isArray(t.rooms)?t.rooms:[];if(!s||!l.length)return[];const{NW:h,NH:d}=s,p=[];for(const t of e){if(null==t.map_x||null==t.map_y)continue;const e=l.find(e=>e.name===t.key)??l.find(e=>e.name===t.name),s=e?.bbox_px;if(!s||[s.x0,s.y0,s.x1,s.y1].some(e=>null==e))continue;const u={q:{x:((s.x0+s.x1)/2-h/2)/h,y:((s.y0+s.y1)/2-d/2)/h},a:{x:t.map_x/100,y:t.map_y/100/o}};null!=t.map_w&&null!=t.map_h&&t.map_w>0&&t.map_h>0&&(u.sizeQ={w:(s.x1-s.x0)/h,h:(s.y1-s.y0)/h},u.sizeA={w:t.map_w/100,h:t.map_h/100/o}),p.push(u)}return p}(resolveStaticRooms(e,t),o,s),s);return d?{rotation:d.rotation,scale:d.scale,offset_x:d.offset_x,offset_y:d.offset_y,auto:!0,residual:d.residual_pct,anchorCount:d.anchors}:h}function placeRoomInCrop(e,t){const o=t.x1-t.x0,s=t.y1-t.y0;if(!(o>0&&s>0))return null;const l=(e.x0+e.x1)/2-t.x0,h=(e.y0+e.y1)/2-t.y0,d=e.x1-e.x0,p=e.y1-e.y0,clamp=(e,t,o)=>Math.min(o,Math.max(t,e));return{map_x:clamp(Math.round(l/o*1e3)/10,0,100),map_y:clamp(Math.round(h/s*1e3)/10,0,100),map_w:clamp(Math.round(d/o*1e3)/10,2,100),map_h:clamp(Math.round(p/s*1e3)/10,2,100)}}function buildCalibrationAnchors(e,t,o,s){const{NW:l,NH:h}=o;if(!(l>0&&h>0&&s>0))return[];const d=Math.min(e.length,t.length),p=[];for(let o=0;o<d;o++){const d=e[o],u=t[o];p.push({q:{x:(d.x-l/2)/l,y:(d.y-h/2)/l},a:{x:u.x/100,y:u.y/100/s}})}return p}function pctToCropPoint(e,t){const o=t.x1-t.x0,s=t.y1-t.y0;return o>0&&s>0?{x:t.x0+e.x/100*o,y:t.y0+e.y/100*s}:null}function outlineInCrop(e,t){if(!e?.length)return null;const o=t.x1-t.x0,s=t.y1-t.y0;return o>0&&s>0?e.map(e=>{const l=Array.isArray(e)?e[0]:e.x,h=Array.isArray(e)?e[1]:e.y;return{x:(l-t.x0)/o*100,y:(h-t.y0)/s*100}}):null}function recropFromGesture(e,t){const o=e.x1-e.x0,s=e.y1-e.y0,l=t.scale/100;if(!(o>0&&s>0&&l>1e-6))return null;const h=o/l,d=s/l,p=e.x0+o/100*(50*(1-1/l)-t.offset_x/l),u=e.y0+s/100*(50*(1-1/l)-t.offset_y/l);return{x0:p,y0:u,x1:p+h,y1:u+d}}function seatProjectPct(e,t,o){const s=t.scale/100,l=(t.scaleY??t.scale)/100,h=t.rotation*rt,d=Math.cos(h),p=Math.sin(h),u=(50+t.offset_x)/100,m=(50+t.offset_y)/100/o,_=s*e.x,f=l*e.y;return{x:100*(u+(d*_-p*f)),y:(m+(p*_+d*f))*o*100}}function seatScaleYRatio(e,t){return null!=t&&t!==e&&e?t/e:1}function seatRotateScaleCss(e,t,o){const s="rotate("+e+"deg)",l=seatScaleYRatio(t,o);return 1===l?s:s+" scale(1,"+l+")"}function roomBboxToRect(e,t,o,s){const l=mapPxDims(t?.image_dims),h=e?.bbox_px;if(!l||!h||[h.x0,h.y0,h.x1,h.y1].some(e=>null==e))return null;const{NW:d,NH:p}=l,u={x:((h.x0+h.x1)/2-d/2)/d,y:((h.y0+h.y1)/2-p/2)/d},m=o.scale/100,_=(o.scaleY??o.scale)/100;let f=(h.x1-h.x0)/d*m,v=(h.y1-h.y0)/d*_;const b=seatProjectPct(u,o,s);if(function isRot90(e){return Math.round(e/90)%2!=0}(o.rotation)){const e=f;f=v,v=e}const clamp=(e,t,o)=>Math.min(o,Math.max(t,e));return{map_x:clamp(Math.round(10*b.x)/10,0,100),map_y:clamp(Math.round(10*b.y)/10,0,100),map_w:clamp(Math.round(1e3*f)/10,2,100),map_h:clamp(Math.round(v*s*1e3)/10,2,100)}}function homeAnchorFit(e,t,o){if(!e||e.length<2||!t)return null;const s=buildCalibrationAnchors(e.map(e=>e.home_px),e.map(e=>e.floor_pct),t,o);return computeSeatFit(s,o)}function projectHomePxThroughFit(e,t,o,s){return seatProjectPct({x:(e.x-t.NW/2)/t.NW,y:(e.y-t.NH/2)/t.NW},o,s)}function outlineThroughFit(e,t,o,s){return e?.length?e.map(e=>projectHomePxThroughFit({x:Array.isArray(e)?e[0]:e.x,y:Array.isArray(e)?e[1]:e.y},t,o,s)):null}const lt=Math.PI/180;function nudgeTierMultiplier(e){return"fine"===e?.1:"jump"===e?10:1}function seatCentreFrac(e,t){return{x:(50+e.offset_x)/100,y:(50+e.offset_y)/100/t}}function frameToOffset(e,t){return{offset_x:100*e.x-50,offset_y:e.y*t*100-50}}function pctToFrac(e,t){return{x:e.x/100,y:e.y/100/t}}function rotatePoint(e,t){const o=t*lt,s=Math.cos(o),l=Math.sin(o);return{x:s*e.x-l*e.y,y:l*e.x+s*e.y}}function normDeg(e){let t=e%360;return t<0&&(t+=360),t}function translateSeat(e,t,o){return{...e,offset_x:e.offset_x+t,offset_y:e.offset_y+o}}function scaleSeatAbout(e,t,o,s){const l=pctToFrac(o,s),h=seatCentreFrac(e,s),d=frameToOffset({x:l.x+t*(h.x-l.x),y:l.y+t*(h.y-l.y)},s),p={...e,scale:e.scale*t,offset_x:d.offset_x,offset_y:d.offset_y};return null!=e.scaleY&&(p.scaleY=e.scaleY*t),p}function rotateSeatAbout(e,t,o,s){const l=pctToFrac(o,s),h=seatCentreFrac(e,s),d=rotatePoint({x:h.x-l.x,y:h.y-l.y},t),p=frameToOffset({x:l.x+d.x,y:l.y+d.y},s);return{...e,rotation:normDeg(e.rotation+t),offset_x:p.offset_x,offset_y:p.offset_y}}function localAxisScaleRatio(e,t,o,s,l){const h=seatCentreFrac(e,l),d=pctToFrac(o,l),p=pctToFrac(s,l),u=rotatePoint({x:d.x-h.x,y:d.y-h.y},-e.rotation),m=rotatePoint({x:p.x-h.x,y:p.y-h.y},-e.rotation),_="x"===t?u.x:u.y,f="x"===t?m.x:m.y;return Math.abs(_)>1e-6?f/_:1}function pinchSeat(e,t,o,s,l,h){const d=function similarityFromTwoPoints(e,t,o,s){const l=t.x-e.x,h=t.y-e.y,d=l*l+h*h;if(d<1e-12)return null;const p=s.x-o.x,u=s.y-o.y,m=(p*l+u*h)/d,_=(u*l-p*h)/d,f=Math.hypot(m,_);if(f<1e-6)return null;const v=Math.atan2(_,m)/lt,b=m*e.x-_*e.y,w=_*e.x+m*e.y;return{rotationDeg:v,scale:f,translate:{x:o.x-b,y:o.y-w}}}(pctToFrac(t,h),pctToFrac(o,h),pctToFrac(s,h),pctToFrac(l,h));if(!d)return e;const p=seatCentreFrac(e,h),u=d.scale*Math.cos(d.rotationDeg*lt),m=d.scale*Math.sin(d.rotationDeg*lt),_=frameToOffset({x:u*p.x-m*p.y+d.translate.x,y:m*p.x+u*p.y+d.translate.y},h),f={...e,rotation:normDeg(e.rotation+d.rotationDeg),scale:e.scale*d.scale,offset_x:_.offset_x,offset_y:_.offset_y};return null!=e.scaleY&&(f.scaleY=e.scaleY*d.scale),f}function nudgeOffset(e,t,o,s,l){const h=function fracToPct(e,t){return{x:100*e.x,y:e.y*t*100}}(rotatePoint(pctToFrac({x:t,y:o},l),-s),l);return translateSeat(e,h.x,h.y)}function nudgeRotation(e,t){return{...e,rotation:normDeg(e.rotation+t)}}function nudgeScale(e,t){const o=1+t/100,s={...e,scale:e.scale*o};return null!=e.scaleY&&(s.scaleY=e.scaleY*o),s}function effectiveAppearance(e){return{hide_map:e.hide_map??!1,overlay_opacity:e.overlay_opacity??55,overlay_blend:e.overlay_blend??"normal",path_color:e.path_color??null,path_width:e.path_width??100,mop_path_color:e.mop_path_color??null,mop_band_opacity:e.mop_band_opacity??28,mop_band_width:e.mop_band_width??100,robot_image_on_map:e.robot_image_on_map??!1,robot_size:e.robot_size??100,robot_image_rotation:e.robot_image_rotation??0}}function mergeRoomOverrides(e,t){if(!t)return e;const o=e?[...e]:[],s=new Map(o.map((e,t)=>[e.key,t]));let l=!1;for(const[e,h]of Object.entries(t)){if(!h)continue;l=!0;const t={};void 0!==h.map_x&&(t.map_x=h.map_x),void 0!==h.map_y&&(t.map_y=h.map_y),void 0!==h.map_w&&(t.map_w=h.map_w),void 0!==h.map_h&&(t.map_h=h.map_h),"area_id"in h&&(t.area_id=h.area_id??void 0);const d=s.get(e);void 0!==d?o[d]={...o[d],...t}:(s.set(e,o.length),o.push({key:e,...t}))}return l?o:e}const round1=e=>Math.round(10*e)/10,clampPct=e=>Math.min(100,Math.max(0,e)),clampSize=e=>Math.min(100,Math.max(2,e)),ct={nw:{sx:-1,sy:-1},ne:{sx:1,sy:-1},sw:{sx:-1,sy:1},se:{sx:1,sy:1}};const ht="anyvac-visual-editor";class AnyVacVisualEditorHost extends HTMLElement{connectedCallback(){this.shadowRoot||this.attachShadow({mode:"open"})}}customElements.get(ht)||customElements.define(ht,AnyVacVisualEditorHost);const dt=["--primary-text-color","--secondary-text-color","--primary-background-color","--card-background-color","--primary-color","--accent-color","--divider-color","--paper-font-body1_-_font-family","--mdc-icon-font"];function unmountVisualEditor(e){e?.remove()}const pt=160;const ut={columns:[100],rows:["auto","minmax(0, 1fr)","auto","auto"],place:{hero:{row:1,col:1},map:{row:2,col:1},dock:{row:3,col:1,overflow:"auto"},start:{row:4,col:1}}},mt={landscape:{columns:["minmax(0, 1fr)","max-content"],rows:["auto","minmax(260px, 1fr)","auto","auto"],place:{badges:{row:1,col:"1/3"},map:{row:2,col:"1/3"},tools:{row:3,col:"1/3",align:"start"},status:{row:4,col:1,overflow:"auto"},dock:{row:4,col:2,overflow:"auto"}}},portrait:{columns:[72,28],rows:["auto","minmax(0, 1fr)","auto"],place:{hero:{row:1,col:"1/3"},map:{row:2,col:1},dock:{row:2,col:2,overflow:"auto"},start:{row:3,col:"1/3"}}}};function track(e){return"number"==typeof e?e+"fr":e}function trackList(e){return e.map(track).join(" ")}function resolveHeightCss(e){const t=e.height??"viewport";return"viewport"===t?"calc(100svh - var(--header-height, 0px))":"container"===t?"100%":t}function fmtPts(e,t){return e.map(e=>e.x.toFixed(t)+","+e.y.toFixed(t)).join(" ")}function trailTail(e,t){if(e.length<2||!(t>0))return[];const o=[e[e.length-1]];let s=t;for(let t=e.length-1;t>0;t--){const l=e[t-1],h=e[t],d=Math.hypot(h.x-l.x,h.y-l.y);if(d>=s){const e=d>0?s/d:0;return o.push({x:h.x+(l.x-h.x)*e,y:h.y+(l.y-h.y)*e}),o.reverse()}s-=d,o.push(l)}return o.reverse()}function planOrder(e){const t=e?.timeline??{},o=new Map;for(const e of["dry","wet"])for(const[s,l]of Object.entries(t[e]??{}))"number"==typeof l&&o.set(s,Math.min(o.get(s)??1/0,l));const s=[...o.keys()].sort((e,t)=>o.get(e)-o.get(t)),l=new Map;for(const o of["dry","wet"])for(const[s,h]of Object.entries(e?.[o]??{})){if(l.has(s)||!Array.isArray(h)||!h.length)continue;const e=t[o]??{},d=[...h].sort((t,o)=>(e[t]??1/0)-(e[o]??1/0))[0];l.set(s,d)}return{order:s,first:l}}var gt;const _t={main_brush_time_left:300,side_brush_time_left:200,filter_time_left:150,sensor_time_left:30};console.info(`%c ANYVAC-CARD %c v${Xe} `,"background:#2196F3;color:#fff;font-weight:700;padding:2px 4px;border-radius:3px 0 0 3px","background:#1a1a1a;color:#fff;font-weight:400;padding:2px 4px;border-radius:0 3px 3px 0");let ft=class AnyVacCard extends Be{constructor(){super(...arguments),this.editMode=!1,this._shownSet=new Set([0]),this._holdId=null,this._mapMode="normal",this._inspectKey=null,this._dockSheetOpen=!1,this._robotSheet=null,this._dockSheetIdx=0,this._modeSheetOpen=!1,this._careResetPending=new Map,this._modeEntity=null,this._dbg="",this._zoneDrag=null,this._zoneRectShown=null,this._zonePending=null,this._zoneMulti=!1,this._zoneEdit=null,this._pinPending=null,this._layers={dry:!0,wet:!1},this._layerMenu=null,this._layerHoldTimer=null,this._layerHeld=!1,this._localRoomSel=new Map,this._activePresets=new Map,this._planMode="both",this._activeGlobalPreset=null,this._cardW=0,this._mapAR=3.636,this._alignSession=null,this._alignView={zoom:1,panX:0,panY:0,rot:0},this._alignCancelConfirm=!1,this._alignCopiedFlash=!1,this._veTool="seat",this._roomsSession=null,this._roomsGesture=null,this._roomsDrawGesture=null,this._roomsDeleteConfirm=null,this._roomsCopiedFlash=!1,this._floorplanCopiedFlash=!1,this._floorplanMode="geo",this._floorCalib=null,this._floorCalibRefNat=null,this._floorCalibResult=null,this._floorCalibError="",this._homeCalib=null,this._homeCalibBusy=!1,this._homeCalibError="",this._homeCalibResult=null,this._homeCalibSnapshotUrl="",this._homeCalibCrop=null,this._homeCalibFrameId="",this._fiducialSnapshotBusy=!1,this._fiducialSnapshotError="",this._fiducialSnapshotPath="",this._fiducialKnown=null,this._fiducialDetectBusy=!1,this._fiducialDetectError="",this._fiducialDetectResult=null,this._floorplanSnapshotBusy=!1,this._floorplanSnapshotError="",this._homeFrameSnapshotBusy=!1,this._homeFrameSnapshotError="",this._guideExportBusy=!1,this._guideExportError="",this._guideExportResult=null,this._placeRoomsResult=null,this._veToolSwitchTarget=null,this._floorplanSession=null,this._alignHost=null,this._alignGesture=null,this._floorGesture=null,this._recropDraft={rotation:0,scale:100,offset_x:0,offset_y:0},this._recropHistory=[],this._recropFuture=[],this._recropGesture=null,this._recropNat=null,this._profile="landscape",this._mapRegW=0,this._mapRegH=0,this._mapAvailW=0,this._mapAvailH=0,this._lastStack=!1,this._lastPortraitFitW=0,this._fillJp=null,this._fillMap=null,this._doneSeen=null,this._sheenRooms=new Set,this._startSeq=null,this._markerPrev=new Map,this._gridGapPx=6,this._lastRotate=!0,this._flipLive=null,this._ro=null,this._onWinResize=null,this._measureRaf=0,this._measureTimer=null,this._settleTimer=null,this._panelViewMo=null,this._panelViewWarned=!1,this._panelViewNode=null,this._barMo=null,this._editBarRo=null,this._now=Date.now(),this._tickTimer=null,this._holdTimer=null,this._holdStartPos=null,this._initialized=!1,this._watched=null,this._intCache=new Map,this._mapCandCache=new Map,this._autoCache=new Map,this._careCache=new Map,this._memoMapAR=0,this._roomsMemo=new Map,this._seatMemo=new Map,this._homeFrameMemo=new Map,this._holdEnd=()=>{this._cancelHold()},this._holdMove=e=>{if(!this._holdStartPos||null===this._holdTimer)return;const t=e.clientX-this._holdStartPos.x,o=e.clientY-this._holdStartPos.y;t*t+o*o>144&&this._cancelHold()},this._planPreview=null,this._planFetchKey="",this._alignViewDrag=null,this._floorCalibDragStart=null,this._homeCalibDragStart=null,this._onFloorplanLoad=e=>{const t=e.target;if(t?.naturalWidth&&t.naturalHeight){const e=t.naturalWidth/t.naturalHeight;e>.1&&Math.abs(e-this._mapAR)>.01&&(this._mapAR=e)}}}static getConfigElement(){return document.createElement(Ke)}static getStubConfig(e){const t=e?Object.keys(e.states).filter(e=>e.startsWith("vacuum.")):[],o=e?.entities,s=o?t.filter(e=>"matter"!==o[e]?.platform):t,l=s.length>0?s:t;return 0===l.length?{type:`custom:${Ye}`,vacuums:[{entity:"vacuum.my_roborock",name:"Roborock",rooms:[],clean_action:{type:"native"}}]}:{type:`custom:${Ye}`,vacuums:l.map(t=>({entity:t,name:e.states[t]?.attributes.friendly_name??t.replace(/^vacuum\./,""),rooms:[],clean_action:{type:"native"}}))}}setConfig(e){if(!e.vacuums||!Array.isArray(e.vacuums)||0===e.vacuums.length)throw new Error("[anyvac-card] 'vacuums' must be a non-empty array");if(this._rawConfig=e,this._config=e,this._watched=null,this._intCache.clear(),this._mapCandCache.clear(),this._autoCache.clear(),this._careCache.clear(),this._roomsMemo.clear(),this._seatMemo.clear(),this._initialized){const t=new Set;for(const o of this._shownSet)o<e.vacuums.length&&t.add(o);this._shownSet=t.size>0?t:new Set(e.vacuums.map((e,t)=>t))}else this._initialized=!0,this._shownSet=this._loadShown(),this._localRoomSel=this._loadRoomSel(),this._flipLive=this._loadFlipLive()}getCardSize(){return 6}connectedCallback(){super.connectedCallback(),this.style.setProperty("--hold-ms",Ze+"ms"),this._ro||"undefined"==typeof ResizeObserver||(this._ro=new ResizeObserver(()=>this._scheduleMeasure()),this._ro.observe(this)),this._onWinResize||(this._onWinResize=()=>this._scheduleMeasure(),window.addEventListener("resize",this._onWinResize,{passive:!0}),window.addEventListener("orientationchange",this._onWinResize,{passive:!0})),this._setupPanelViewObserver(),this._scheduleMeasure(),this._tickTimer||(this._tickTimer=window.setInterval(()=>{this._config?.debug_room_progress&&(this._config.vacuums??[]).some(e=>this._isCleaning(e)||this._isPaused(e))&&(this._now=Date.now())},1e3))}_scheduleMeasure(){if(this._measureRaf||null!==this._measureTimer)return;const run=()=>{this._measureRaf=0,this._measureTimer=null,this._doMeasure()};"undefined"!=typeof document&&document.hidden?this._measureTimer=window.setTimeout(run,0):this._measureRaf=requestAnimationFrame(run)}_doMeasure(){const e=this.getBoundingClientRect(),t=Math.round(e.width);t&&Math.abs(t-this._cardW)>=2&&(this._cardW=t);const o=this._config?.layout;if(o){const s=function pickProfile(e,t,o){const s=e?.orientation;return"portrait"===s||"landscape"===s?s:t&&o&&t/o<(e?.threshold??1)?"portrait":"landscape"}(o,this._cardW||t||window.innerWidth,this._availableHeight(o,e));s!==this._profile&&(this._profile=s),this._refineGridHeight()}}_availableHeight(e,t){if("container"===(e.height??"viewport"))return t.height>1?Math.round(t.height):window.innerHeight;const o=t.top;return o>=0&&o<window.innerHeight?Math.max(1,Math.round(window.innerHeight-o-this._editBarHeight())):window.innerHeight}_editBarHeight(){try{const e=this._findCardOptionsAncestor();if(!e?.shadowRoot)return 0;const t=e.shadowRoot.querySelector(".card-actions");if(!t)return 0;const o=t.getBoundingClientRect();if(!(o.height>0))return 0;const s=getComputedStyle(t);return Math.ceil(o.height+(parseFloat(s.marginTop)||0)+(parseFloat(s.marginBottom)||0))}catch{return 0}}_findPanelViewAncestor(){let e=this.parentElement??this.getRootNode().host??null,t=0;for(;e&&t++<20;){if(e instanceof Element&&("HUI-PANEL-VIEW"===e.tagName||"HUI-VIEW"===e.tagName))return e;const t=e;e=t.parentElement??t.getRootNode()?.host??null}return null}_findCardOptionsAncestor(){let e=this.parentElement??this.getRootNode().host??null,t=0;for(;e&&t++<12;){if(e instanceof Element&&"HUI-CARD-OPTIONS"===e.tagName)return e;const t=e;e=t.parentElement??t.getRootNode()?.host??null}return null}_setupPanelViewObserver(){if("undefined"==typeof MutationObserver)return;if(this._panelViewMo&&this._panelViewNode?.isConnected)return;this._panelViewMo&&(this._panelViewMo.disconnect(),this._panelViewMo=null,this._panelViewNode=null);const e=this._findPanelViewAncestor();if(!e){if(!this._panelViewWarned){this._panelViewWarned=!0;try{console.warn("[anyvac-card] hui-panel-view/hui-view ancestor not found (HA internal DOM may have changed) — edit-mode layout refresh via MutationObserver is disabled; resize-based refresh still works.")}catch{}}return}const t=new MutationObserver(()=>{this._scheduleMeasure(),this._watchEditBar();const e=this._findCardOptionsAncestor();if(e?.shadowRoot)try{t.observe(e.shadowRoot,{childList:!0,subtree:!0})}catch{}});try{t.observe(e,{childList:!0,subtree:!0})}catch{}if(e.shadowRoot)try{t.observe(e.shadowRoot,{childList:!0,subtree:!0})}catch{}const o=this._findCardOptionsAncestor();if(o?.shadowRoot)try{t.observe(o.shadowRoot,{childList:!0,subtree:!0})}catch{}this._panelViewMo=t,this._panelViewNode=e,this._watchEditBar()}_watchEditBar(){this._barMo&&(this._barMo.disconnect(),this._barMo=null);const e=this._findCardOptionsAncestor();if(!e?.shadowRoot)return;const t=e.shadowRoot.querySelector(".card-actions");if(t)return void this._observeEditBar(t);const o=e.shadowRoot,s=new MutationObserver(()=>{const e=o.querySelector(".card-actions");e&&(s.disconnect(),this._barMo=null,this._observeEditBar(e))});try{s.observe(o,{childList:!0,subtree:!0})}catch{return}this._barMo=s}_observeEditBar(e){if(this._scheduleMeasure(),"undefined"==typeof ResizeObserver)return;this._editBarRo&&(this._editBarRo.disconnect(),this._editBarRo=null);const t=new ResizeObserver(()=>this._scheduleMeasure());try{t.observe(e)}catch{return}this._editBarRo=t}_refineGridHeight(){const e=this._config?.layout;if(!e)return;const t=this.renderRoot?.querySelector(".avc-grid");if(!t)return;if("viewport"===(e.height??"viewport")){const e=t.getBoundingClientRect().top;if(e>=0&&e<window.innerHeight){const o=Math.round(window.innerHeight-e-this._editBarHeight());o>120&&(t.style.height=o+"px")}}const o=this.renderRoot?.querySelector(".avc-region--map");if(o){const e=Math.round(o.clientWidth),t=Math.round(o.clientHeight);e&&Math.abs(e-this._mapRegW)>=2&&(this._mapRegW=e),t&&Math.abs(t-this._mapRegH)>=2&&(this._mapRegH=t)}if("portrait"===this._profile){const e=this.renderRoot?.querySelector(".avc-region--start"),o=this.renderRoot?.querySelector(".avc-region--hero"),s=parseFloat(getComputedStyle(t).rowGap||getComputedStyle(t).gap||"0")||0,l=e?Math.round(e.getBoundingClientRect().height):0,h=o?Math.round(o.getBoundingClientRect().height):0;this._gridGapPx=s;const d=Math.round(t.clientWidth),p=Math.round(t.clientHeight-l-(l?s:0)-h-(h?s:0));d&&Math.abs(d-this._mapAvailW)>=2&&(this._mapAvailW=d),p>0&&Math.abs(p-this._mapAvailH)>=2&&(this._mapAvailH=p)}}disconnectedCallback(){super.disconnectedCallback(),this._cancelHold(),this._measureRaf&&(cancelAnimationFrame(this._measureRaf),this._measureRaf=0),null!==this._measureTimer&&(clearTimeout(this._measureTimer),this._measureTimer=null),null!==this._settleTimer&&(clearTimeout(this._settleTimer),this._settleTimer=null),this._tickTimer&&(clearInterval(this._tickTimer),this._tickTimer=null),this._onWinResize&&(window.removeEventListener("resize",this._onWinResize),window.removeEventListener("orientationchange",this._onWinResize),this._onWinResize=null),this._ro&&(this._ro.disconnect(),this._ro=null),this._panelViewMo&&(this._panelViewMo.disconnect(),this._panelViewMo=null),this._panelViewNode=null,this._barMo&&(this._barMo.disconnect(),this._barMo=null),this._editBarRo&&(this._editBarRo.disconnect(),this._editBarRo=null),unmountVisualEditor(this._alignHost),this._alignHost=null}firstUpdated(){const e=Math.round(this.getBoundingClientRect().width);e&&(this._cardW=e),this._scheduleMeasure()}updated(){if(this._alignSession&&!this._alignHost){const e=this.constructor.elementStyles,t=[];for(const o of e){const e=o instanceof CSSStyleSheet?o:o.styleSheet;e&&t.push(e)}this._alignHost=function mountVisualEditor(e,t){const o=document.createElement(ht);o.style.cssText="position:fixed;inset:0;z-index:2147483647;",document.body.appendChild(o);const s=o.shadowRoot;if(s){e.length&&"adoptedStyleSheets"in s&&(s.adoptedStyleSheets=e);const l=getComputedStyle(t);for(const e of dt){const t=l.getPropertyValue(e);t&&o.style.setProperty(e,t)}}return o}(t,this)}else!this._alignSession&&this._alignHost&&(unmountVisualEditor(this._alignHost),this._alignHost=null);if(this._alignHost?.shadowRoot&&D(this._renderVisualEditor(),this._alignHost.shadowRoot),this._careResetPending.size){let e=null;for(const[t,o]of this._careResetPending){const s=this.hass?.states[t],l=s?Date.parse(s.last_changed):NaN;Number.isFinite(l)&&l>o&&(e||(e=new Map(this._careResetPending)),e.delete(t))}e&&(this._careResetPending=e)}this._refineGridHeight(),this._refineGridColumns(),this._setupPanelViewObserver(),null!==this._settleTimer&&clearTimeout(this._settleTimer),this._settleTimer=window.setTimeout(()=>{this._settleTimer=null,this._scheduleMeasure()},250)}_refineGridColumns(){if("portrait"!==this._profile||!this._lastPortraitFitW)return;if(this._config.layout?.portrait?.columns?.length)return;if(this._stackTopology)return;const e=this.renderRoot?.querySelector(".avc-grid");if(!e)return;const t=e.clientWidth-(parseFloat(getComputedStyle(e).columnGap||"0")||0);let o=Math.round(this._lastPortraitFitW);t>0&&(o=Math.min(o,t)),this._isRail()&&t>2*pt&&(o=Math.min(o,t-pt));const s=Math.round(o)+"px 1fr";e.style.gridTemplateColumns!==s&&(e.style.gridTemplateColumns=s)}shouldUpdate(e){if(this._syncEffectiveConfig(),!e.has("hass")||e.size>1)return!0;const t=e.get("hass");if(!t||!this._config)return!0;for(const e of this._watchedEntities())if(t.states[e]!==this.hass.states[e])return!0;return!1}_syncEffectiveConfig(){if(!this._rawConfig||!this.hass)return;const e=this._floorplanSeatsRaw(),t=function applyFloorplanSeats(e,t){if(!t||!e?.vacuums?.length)return e;let o=!1;const s=e.vacuums.map(s=>{const l=resolveImageBaseSrc(e,s),h=l?t[l]?.vacuums?.[s.entity]:null;if(!h)return s;let d=s;if(h.map&&(o=!0,d={...d,map:{...h.map,seat:"manual"}}),h.appearance&&(o=!0,d={...d,...h.appearance}),h.rooms){const e=mergeRoomOverrides(d.rooms,h.rooms);e!==d.rooms&&(o=!0,d={...d,rooms:e})}return d});let l=e.image_base,h=e.rooms,d=e.room_border_normal,p=e.room_border_selected;if("merged"===e.map_mode&&e.image_base?.src){const s=t[e.image_base.src],u=s?.image_base;if(u&&(l={...e.image_base,...u},o=!0),s?.rooms){const e=mergeRoomOverrides(h,s.rooms);e!==h&&(o=!0,h=e)}s?.room_style&&(void 0!==s.room_style.border_normal&&(d=s.room_style.border_normal,o=!0),void 0!==s.room_style.border_selected&&(p=s.room_style.border_selected,o=!0))}return o?{...e,vacuums:s,image_base:l,rooms:h,room_border_normal:d,room_border_selected:p}:e}(this._rawConfig,e);t!==this._config&&JSON.stringify(t)!==JSON.stringify(this._config)&&(this._config=t,this._roomsMemo.clear(),this._seatMemo.clear())}_floorplanSeatsRaw(){for(const e of this._rawConfig?.vacuums??[]){const t=this._intAttrs(e),o=t?.floorplan_seats;if(o)return o}}_watchedEntities(){if(this._registry(),this._watched)return this._watched;const e=new Set;for(const t of this._config?.vacuums??[]){for(const o of[t.entity,t.status_entity,t.battery_entity,t.last_clean_entity,t.progress_entity,t.current_room_entity,t.error_entity,this._mapEntityFor(t),this._intEntity(t),...Object.values(this._autoEntities(t))])o&&e.add(o);for(const o of this._roomsFor(t))o.last_clean_entity&&e.add(o.last_clean_entity),o.clean_time_entity&&e.add(o.clean_time_entity);for(const o of this._careItems(t))o.entity&&e.add(o.entity),o.reset&&e.add(o.reset),o.binary&&e.add(o.binary)}for(const t of this._config?.global_actions??[])for(const o of t.watch_entities??[])o&&e.add(o);return this.hass?.entities&&(this._watched=e),e}_resolveColor(e,t){const o=e??t;return et[o]??o}_resolveBg(e,t,o){return(o?it:ot)[e??t]??function hexToRgba(e,t){const o=/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(e);if(!o)return`rgba(255,255,255,${t})`;let s=o[1];return 3===s.length&&(s=s.split("").map(e=>e+e).join("")),`rgba(${parseInt(s.slice(0,2),16)},${parseInt(s.slice(2,4),16)},${parseInt(s.slice(4,6),16)},${t})`}(this._resolveColor(e,t),o?.3:.18)}_vacIndex(e){const t=this._config?.vacuums?.findIndex(t=>t.entity===e.entity)??-1;return t<0?0:t}_defaultColor(e){return tt[this._vacIndex(e)%tt.length]}_color(e){return this._resolveColor(e.color,this._defaultColor(e))}_colorBg(e){return this._resolveBg(e.color,this._defaultColor(e),!1)}_colorBgActive(e){return this._resolveBg(e.color,this._defaultColor(e),!0)}_registry(){const e=this.hass?.entities;return e!==this._regRef&&(this._regRef=e,this._intCache.clear(),this._mapCandCache.clear(),this._autoCache.clear(),this._careCache.clear(),this._watched=null),e}_intEntity(e){if(e.integration_entity)return e.integration_entity;const t=this._registry();if(!t||!e.entity)return;if(this._intCache.has(e.entity))return this._intCache.get(e.entity);const o=t[e.entity]?.device_id,s=o?Object.keys(t).find(e=>t[e]?.device_id===o&&"anyvac"===t[e]?.platform&&e.startsWith("sensor.")):void 0;return this._intCache.set(e.entity,s),s}_mapEntityFor(e){if(e.map?.entity)return e.map.entity;const t=this._registry();if(!t||!e.entity)return;let o=this._mapCandCache.get(e.entity);if(!o){const s=t[e.entity]?.device_id;if(!s)return;o=Object.keys(t).filter(e=>t[e]?.device_id===s&&e.startsWith("image.")),this._mapCandCache.set(e.entity,o)}if(1===o.length)return o[0];const s=o.filter(e=>{const t=this.hass.states[e];return!!t&&"unavailable"!==t.state&&"unknown"!==t.state&&!!t.attributes.entity_picture});return 1===s.length?s[0]:void 0}_intAttrs(e){const t=this._intEntity(e),o=t?this.hass.states[t]?.attributes:void 0;if(o)return(o.schema_version??0)>=2?o:void 0}_schemaWarning(){for(const e of this._config?.vacuums??[]){const t=this._intEntity(e),o=t?this.hass.states[t]?.attributes:void 0;if(o&&(o.schema_version??0)<2)return`AnyVac integration is too old for this card (schema ${o.schema_version??1} < 2). Update the anyvac integration to ≥ 0.18.0.`}return null}_autoEntities(e){const t=this._registry();if(!t||!e.entity)return{};const o=this._autoCache.get(e.entity);if(o)return o;const s=t[e.entity]?.device_id;if(!s)return{};const l=Object.keys(t).filter(e=>t[e]?.device_id===s),byTk=e=>l.find(o=>t[o]?.translation_key===e),h={status:byTk("status"),battery:(e=>l.find(t=>this.hass.states[t]?.attributes?.device_class===e))("battery"),last_clean:byTk("last_clean_end"),progress:byTk("clean_percent"),current_room:byTk("current_room"),error:byTk("vacuum_error")};return this._autoCache.set(e.entity,h),h}_ent(e,t){return e[t+"_entity"]??this._autoEntities(e)[t]}_statusInfo(e){const t=this.hass.states[this._ent(e,"status")??e.entity]?.state??"unknown",o=Je[t]??[t,"rgba(var(--avc-ink-rgb),0.5)","mdi:robot-vacuum"],s=this._themed()?Qe[o[1]]:void 0;return s?[o[0],s,o[2]]:o}_careItems(e){const t=this._registry(),o=this.hass?.devices;if(!t||!o||!e.entity)return[];const s=this._dockCaps(e),l=e.entity+"|"+this._dockCapsKey(e);if(this._careCache.has(l))return this._careCache.get(l);const h=t[e.entity]?.device_id,d=h?o[h]:void 0,p=d?.identifiers?.find(([e])=>"roborock"===e)?.[1],u=p?Object.values(o).find(e=>e.identifiers?.some(([e,t])=>"roborock"===e&&t===`${p}_dock`)):void 0,m=u?.id,byTk=(e,o,s)=>e?Object.keys(t).find(l=>t[l]?.device_id===e&&t[l]?.translation_key===o&&l.startsWith(s+".")):void 0,_=[],consumable=(e,t,o,s)=>{const l=byTk(s,t,"sensor"),h=byTk(s,o,"button");(l||h)&&_.push({key:t,label:e,entity:l,reset:h,totalHours:_t[t]})};if(consumable("Main brush","main_brush_time_left","reset_main_brush_consumable",h),consumable("Side brush","side_brush_time_left","reset_side_brush_consumable",h),consumable("Filter","filter_time_left","reset_air_filter_consumable",h),consumable("Sensors","sensor_time_left","reset_sensor_consumable",h),s.wash){consumable("Dock brush","cleaning_brush_time_left","reset_dock_cleaning_brush_consumable",m),consumable("Strainer","strainer_time_left","reset_dock_strainer_consumable",m);const binary=(e,t)=>{const o=byTk(m,t,"binary_sensor");o&&_.push({key:t,label:e,binary:o})};binary("Dirty water tank","dirty_box_full"),binary("Clean water tank","clean_box_empty"),binary("Cleaning fluid","clean_fluid_empty")}return this._careCache.set(l,_),_}_careValue(e){if(!e.entity)return"—";const t=this.hass.states[e.entity];if(!t||"unavailable"===t.state||"unknown"===t.state)return"—";const o=Number(t.state);if(Number.isNaN(o))return t.state;const s=t.attributes?.unit_of_measurement,l="s"===s?o/3600:"min"===s?o/60:o;if(e.totalHours){return`${Math.max(0,Math.min(100,Math.round(l/e.totalHours*100)))} %`}return`${Math.round(l)} h`}_isCleaning(e){return nt.has(this.hass.states[e.entity]?.state??"")}_hasError(e){const t=this._ent(e,"error"),o=t?this.hass.states[t]?.state:null;return!!o&&"none"!==o&&"unknown"!==o&&"unavailable"!==o}_isPaused(e){return"paused"===this.hass.states[e.entity]?.state}_battery(e){const t=this._ent(e,"battery");if(!t)return null;const o=parseInt(this.hass.states[t]?.state??"");return isNaN(o)?null:o}_lastCleanStr(e){const t=this._ent(e,"last_clean"),o=t?this.hass.states[t]?.state:void 0;if(!o||"unavailable"===o||"unknown"===o)return"—";const s=new Date(o),l=Math.floor((Date.now()-s.getTime())/864e5),h=s.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});return 0===l?"Today · "+h:1===l?"Yesterday · "+h:s.toLocaleDateString([],{day:"2-digit",month:"2-digit"})+" · "+h}_progress(e){const t=this._ent(e,"progress");if(!t)return null;const o=parseInt(this.hass.states[t]?.state??"");return isNaN(o)||0===o?null:o}_selSensor(){for(const e of this._config.vacuums){const t=this._intEntity(e);if(t&&Array.isArray(this.hass.states[t]?.attributes?.selected_rooms))return t}}_backendSel(){const e=this._selSensor();return e?new Set(this.hass.states[e]?.attributes?.selected_rooms??[]):null}_setBackendSel(e,t){this._call("anyvac","select_rooms",{rooms:e,mode:t})}_isRoomSelected(e,t){const o=this._backendSel();return o?o.has(e.key):this._localRoomSel.get(t.entity+":"+e.key)??!1}_layersEff(){const e=this._selSensor(),t=e?this.hass.states[e]?.attributes?.view_layers:void 0;return t&&"boolean"==typeof t.dry&&"boolean"==typeof t.wet?{dry:t.dry,wet:t.wet}:this._layers}_staticRoomsFor(e){return resolveStaticRooms(this._config,e)}_memoSync(){this.hass===this._memoHass&&this._mapAR===this._memoMapAR||(this._memoHass=this.hass,this._memoMapAR=this._mapAR,this._roomsMemo.clear(),this._seatMemo.clear(),this._homeFrameMemo.clear())}_roomsFor(e){this._memoSync();const t=this._roomsMemo.get(e.entity);if(t)return t;const o=this._computeRoomsFor(e);return this._roomsMemo.set(e.entity,o),o}_computeRoomsFor(e){const t=this._intAttrs(e),o=Array.isArray(t?.rooms)?t.rooms:[];if(!t||!o.length)return this._staticRoomsFor(e);const s=this._homeFrameCropFor(e),l=this._wrapAspect(this._baseHeightFor(e)),h=s?null:this._homeAnchorFitFor(e,l),d=s||h?null:this._effectiveSeat(e),p=this._staticRoomsFor(e),u=new Map(p.filter(e=>e.key).map(e=>[e.key,e])),m=new Set,_=[];for(const e of o){const o=e?.name;if(!o)continue;m.add(o);const p=u.get(o);if(p&&null!=p.map_x&&null!=p.map_y){_.push(p);continue}const f=s?e?.bbox_home_px?placeRoomInCrop(e.bbox_home_px,s):null:h?e?.bbox_home_px?roomBboxToRect({bbox_px:e.bbox_home_px},{image_dims:{width:h.dims.NW,height:h.dims.NH,scale:1,rotation:0}},h.fit,l):null:roomBboxToRect(e,t,d,l);if(!f){p&&_.push(p);continue}const v=s?outlineInCrop(e?.outline_home_px,s):h?outlineThroughFit(e?.outline_home_px,h.dims,h.fit,l):null;_.push({...p??{key:o,name:o,icon:"mdi:floor-plan"},...f,outline_pct:v??void 0})}for(const e of p)e.key&&!m.has(e.key)&&_.push(e);return _}_hasSelectedRooms(e){return this._roomsFor(e).some(t=>this._isRoomSelected(t,e))}_liveCleanType(e){if((e.presets?.length??0)>=2){const t=this._activePreset(e);return null!=t.mop_intensity&&""!==t.mop_intensity&&"off"!==t.mop_intensity||null!=t.mop_mode&&""!==t.mop_mode?"wet":"dry"}const t=this._intAttrs(e)?.clean_type;if("wet"===t||"dry"===t)return t;const o=this._vacCleanType(e);return o.wet&&!o.dry?"wet":"dry"}_backendEstimate(e,t,o){const s=this._intAttrs(e)?.rooms_estimate;if(!s)return null;const l=s[t.name??""]??s[t.key],h=l?l[o]:void 0;return"number"==typeof h&&h>0?h:null}_roomCleanMins(e,t){const o=this._vacCleanType(t),s=!(!o.wet||o.dry)||!(o.dry&&!o.wet)&&"wet"===this._liveCleanType(t),l=this._backendEstimate(t,e,s?"wet":"dry");if(null!=l)return l;const h=s?e.clean_time_wet:e.clean_time_dry;if(null!=h&&h>0)return h;const d=s?e.clean_time_dry:e.clean_time_wet;if(null!=d&&d>0)return d;if(e.clean_time_entity){const t=parseFloat(this.hass.states[e.clean_time_entity]?.state??"");if(!isNaN(t)&&t>0)return t}return e.clean_time_mins??0}_totalCleanMins(e){return this._roomsFor(e).reduce((t,o)=>this._isRoomSelected(o,e)?t+this._roomCleanMins(o,e):t,0)}_intRoomRec(e,t){const o=this._intAttrs(e)?.rooms_last_cleaned;return o?o[t.key]??o[t.name??""]??null:null}_roomCoverageRec(e,t){const o=this._intAttrs(e)?.rooms_coverage;return o?o[t.key]??o[t.name??""]??null:null}_ageDaysFromIso(e){if(!e)return null;const t=new Date(e).getTime();return isNaN(t)?null:(Date.now()-t)/864e5}_roomAgeDays(e,t){if(t){const o=this._intRoomRec(t,e);if(o){const e=this._ageDaysFromIso(o.dry),t=this._ageDaysFromIso(o.wet),s=this._ageDaysFromIso(o.any),l=this._layersEff(),h=l.dry,d=l.wet;let p;if(p=h&&d?Math.max(e??9999,t??9999):h?e:d?t:s,null!==p)return p}}if(!e.last_clean_entity)return null;const o=this.hass.states[e.last_clean_entity]?.state;return o&&"unavailable"!==o&&"unknown"!==o?(Date.now()-new Date(o).getTime())/864e5:null}_colorForAgeDays(e){if(null===e)return"rgba(255,77,77,0.85)";const t=[...this._config.room_thresholds??[{days:2,color:"rgba(46,204,113,0.85)"},{days:5,color:"rgba(250,173,20,0.85)"},{days:10,color:"rgba(255,152,0,0.85)"}]].sort((e,t)=>e.days-t.days);for(const o of t)if(e<=o.days)return o.color;return"rgba(255,77,77,0.85)"}_vacCleanType(e){if("dry"===e.clean_type)return{dry:!0,wet:!1};if("wet"===e.clean_type)return{dry:!1,wet:!0};if("both"===e.clean_type)return{dry:!0,wet:!0};const t=this._intAttrs(e)?.mop_signal;if(t){return{dry:!0,wet:null!=t.water_box_mode||!!t.water_mode_name}}const o=e.clean_action,s=!(!o||!(o.mop_mode||o.mop_mode_entity||o.mop_intensity||o.mop_intensity_entity));return{dry:!s||null!=o?.suction_level&&"off"!==o.suction_level,wet:s}}_roomProgress(e,t){const o=this._intAttrs(e)?.rooms_progress;return o?o[t.key]??o[t.name??""]??null:null}_roomProgForType(e,t,o){let s=null,l=null,h=!1;for(const d of t){const t=this._roomProgress(d,e);if(!t)continue;const p="dry"===o?t.dry_pct:t.wet_pct;if(null==p)continue;const u=!!("dry"===o?t.dry_calibrating:t.wet_calibrating);(null===s||h&&!u||h===u&&p>s)&&(s=p,l=d,h=u)}return null!==s&&l?{pct:s,kind:"S",title:`${o} coverage ${s}%`,color:this._color(l),calibrating:h}:null}_progColor(e){return e>=90?"rgb(var(--avc-ok-rgb))":e>=50?"rgb(var(--avc-warn-rgb))":"rgb(var(--avc-info-rgb))"}_renderRoomGauge(e,t){if(!this._config.debug_room_progress)return De;const o=this._roomProgForType(t,e,"dry"),s=this._roomProgForType(t,e,"wet");if(!o&&!s)return De;const g=(e,t,o,s)=>Ee`
      <span class="room-gauge" title=${t}
        style=${Ue({background:`conic-gradient(${o} ${3.6*e}deg, rgba(255,255,255,0.12) 0)`})}>
        <span>${e}${s?"~":""}</span>
      </span>`;return Ee`<div class="room-gauges">
      ${o?g(o.pct,"dry · "+o.title,o.color,o.calibrating):De}
      ${s?g(s.pct,"wet · "+s.title,"#40a9ff",s.calibrating):De}
    </div>`}_renderProgChip(e){return e?Ee`<span class="rl-prog" title=${e.title}
      style=${Ue({color:e.color??this._progColor(e.pct)})}>${e.pct}${e.calibrating?"~":""}%<small>${e.kind}</small></span>`:De}_batIcon(e){return e>80?"mdi:battery":e>50?"mdi:battery-60":e>20?"mdi:battery-30":"mdi:battery-10"}_batColor(e){return e>50?"rgb(var(--avc-ok-rgb))":e>20?"rgb(var(--avc-warn-rgb))":"rgb(var(--avc-err-rgb))"}_mapUrl(e){const t=this.hass.states[e];if(!t)return"";const o=t.attributes.entity_picture;if(!o)return"";const s=new Date(t.last_updated).getTime(),l=o.includes("?")?"&":"?";return this.hass.hassUrl(o+l+"_t="+s)}_timeStr(e){const t=Math.round(e);if(t<=0)return"";if(t>=60){const e=Math.floor(t/60),o=t%60;return o>0?"~"+e+" h "+o+" min":"~"+e+" h"}return"~"+t+" min"}_isGlobalActive(e){return(e.watch_entities??[]).some(e=>nt.has(this.hass.states[e]?.state??""))}async _triggerGlobal(e){const t=e.action;try{if("script"===t.type)await this.hass.callService("script","turn_on",{entity_id:t.entity_id,variables:t.variables??{}});else{const[e,o]=t.service.split(".");await this.hass.callService(e,o,t.data??{})}}catch(e){console.error("[anyvac-card] global action failed:",e)}}_cancelHold(){null!==this._holdTimer&&(clearTimeout(this._holdTimer),this._holdTimer=null),this._holdId=null,this._holdStartPos=null}_holdStart(e,t){return o=>{o.preventDefault(),this._cancelHold(),this._holdId=e,this._holdStartPos={x:o.clientX,y:o.clientY},this._holdTimer=setTimeout(()=>{this._holdTimer=null,this._holdId=null,this._holdStartPos=null,t()},Ze)}}_toggleShown(e){if(this._config.layout&&"portrait"===this._profile)return this._shownSet=new Set([e]),void this._saveShown();this._toggleShownMulti(e)}_toggleShownMulti(e){const t=new Set(this._shownSet);t.has(e)?t.size>1&&t.delete(e):t.add(e),this._shownSet=t,this._saveShown()}async _call(e,t,o){try{await this.hass.callService(e,t,o)}catch(o){console.error("[anyvac-card] "+e+"."+t+" failed:",o)}}_fireMoreInfo(e){this.dispatchEvent(new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:e}}))}_storeKey(e){const t=(this._config?.vacuums??[]).map(e=>e.entity).join(",");return`anyvac-card:${e}:${t}`}_readStored(e,t){try{return localStorage.getItem(this._storeKey(e))??localStorage.getItem(t)}catch{return null}}_saveShown(){try{const e=[...this._shownSet].map(e=>this._config.vacuums[e]?.entity).filter(Boolean);localStorage.setItem(this._storeKey("shown"),JSON.stringify(e))}catch{}}_loadShown(){try{const e=this._readStored("shown","roborock-card:shown");if(e){const t=JSON.parse(e).map(e=>this._config.vacuums.findIndex(t=>t.entity===e)).filter(e=>e>=0);if(t.length>0)return new Set(t)}}catch{}return new Set(this._config.vacuums.map((e,t)=>t))}_saveFlipLive(){try{null===this._flipLive?localStorage.removeItem(this._storeKey("flip")):localStorage.setItem(this._storeKey("flip"),JSON.stringify(this._flipLive))}catch{}}_loadFlipLive(){const e=this._readStored("flip","roborock-card:flip");if(null===e)return null;try{return!0===JSON.parse(e)}catch{return null}}_saveVeTool(e){try{localStorage.setItem(this._storeKey("ve-tool"),e)}catch{}}_loadVeTool(){try{const e=localStorage.getItem(this._storeKey("ve-tool"));if("seat"===e||"rooms"===e||"floorplan"===e)return e}catch{}return"seat"}_saveRoomSel(e){try{const t=e+":",o={};for(const[e,s]of this._localRoomSel.entries())e.startsWith(t)&&(o[e.slice(t.length)]=s);localStorage.setItem(this._storeKey("sel:"+e),JSON.stringify(o))}catch{}}_loadRoomSel(){const e=new Map;try{for(const t of this._config.vacuums){const o=this._readStored("sel:"+t.entity,"roborock-card:sel:"+t.entity);if(o){const s=JSON.parse(o);for(const[o,l]of Object.entries(s))l&&e.set(t.entity+":"+o,!0)}}}catch{}return e}_pause(e){this._call("vacuum","pause",{entity_id:e.entity})}_resume(e){this._call("vacuum","start",{entity_id:e.entity})}_dock(e){this._call("vacuum","return_to_base",{entity_id:e.entity})}_toggleRoom(e,t){if(this._backendSel())return void this._setBackendSel([e.key],"toggle");const o=t.entity+":"+e.key,s=new Map(this._localRoomSel);s.set(o,!s.get(o)),this._localRoomSel=s,this._saveRoomSel(t.entity)}_isRoomSelectedAny(e,t){const o=this._backendSel();return o?o.has(e):t.some(t=>this._localRoomSel.get(t.entity+":"+e)??!1)}_toggleRoomAcross(e,t){if(this._isRoomSelectedAny(e,t)&&t.some(e=>this._intAttrs(e))&&this._call("anyvac","pin_room",{room:e}),this._backendSel())return void this._setBackendSel([e],"toggle");const o=!this._isRoomSelectedAny(e,t),s=new Map(this._localRoomSel);for(const l of t)this._roomsFor(l).some(t=>t.key===e)&&s.set(l.entity+":"+e,o);this._localRoomSel=s;for(const e of t)this._saveRoomSel(e.entity)}_allRoomKeys(){const e=new Set;for(const t of this._config.vacuums)for(const o of this._roomsFor(t))e.add(o.key);return[...e]}_v2Vacuums(){const e=[],t=[];for(const o of this._config.vacuums){const s=this._vacCleanType(o);s.dry&&e.push(o.entity),s.wet&&t.push(o.entity)}return{dry:e,wet:t}}_unassignedRooms(e,t,o){if(!o||0===e.length)return[];const s=this._planPreview;if(!s||s.key!==this._planKey(e,t))return[];const l="wet"!==t,h="dry"!==t,d=[];for(const t of e)(l&&!s.dry.has(t)||h&&!s.wet.has(t))&&d.push(t);return d}_v2Settings(){const e={};for(const t of["dry","wet"])for(const o of this._config.vacuums){const s=this._vacCleanType(o);if(!("dry"===t?s.dry:s.wet))continue;const l=this._activePreset(o),h={};l.suction_level&&(h.fan_speed=l.suction_level),"wet"===t&&l.mop_mode&&(h.mop_mode=l.mop_mode),"wet"===t&&l.mop_intensity&&(h.mop_intensity=l.mop_intensity),l.repeat&&l.repeat>1&&(h.repeat=l.repeat),Object.keys(h).length&&((e[t]??(e[t]={}))[o.entity]=h)}return Object.keys(e).length?e:void 0}_planKey(e,t){return JSON.stringify([e,t,this._v2Vacuums(),this._pinsAttr()])}_fetchPlan(e,t){const o=this._planKey(e,t);o!==this._planFetchKey&&(this._planFetchKey=o,(async()=>{try{const s=await this.hass.callService("anyvac","plan",{rooms:e,mode:t,vacuums:this._v2Vacuums()},void 0,!1,!0);if(this._planFetchKey!==o)return;const l=s?.response?.plan??{},inv=e=>{const t=new Map;for(const[o,s]of Object.entries(e??{}))for(const e of s)t.set(e,o);return t};this._planPreview={key:o,dry:inv(l.dry),wet:inv(l.wet),eta:"number"==typeof l.eta_min?l.eta_min:null,unsequenced:Array.isArray(l.unsequenced)?l.unsequenced:[],...planOrder(l)}}catch(e){console.warn("[anyvac-card] anyvac.plan preview failed:",e),this._planFetchKey===o&&(this._planPreview={key:o,dry:new Map,wet:new Map,eta:null,unsequenced:[]})}})())}_etaFor(e,t,o){o&&e.length&&this._fetchPlan(e,t);const s=this._planPreview?.eta;return o&&null!=s?s:this._selEstMins(e)}async _runOrchestrated(e,t){if(!e.length)return;const o=this._call("anyvac","clean",{rooms:e,mode:t,vacuums:this._v2Vacuums(),...this._v2Settings()?{settings:this._v2Settings()}:{}});this._playStartSeq(e,t),await o}_playStartSeq(e,t){if(!this._themed()||this._reducedMotion())return;const o=this._planPreview;if(!o||o.key!==this._planKey(e,t)||!o.order?.length)return;const s=o.order.length,l=Math.min(.3,s>1?1.6/(s-1):.3),h=(this._startSeq?.id??0)+1;this._startSeq={id:h,delay:new Map(o.order.map((e,t)=>[e,+(t*l).toFixed(3)])),first:[...(o.first??new Map).entries()].map(([e,t])=>({entity:e,room:t}))},window.setTimeout(()=>{this._startSeq?.id===h&&(this._startSeq=null)},2600)}_reducedMotion(){if(this._config.reduce_motion)return!0;try{return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches??!1}catch{return!1}}_renderStartSeqAvatars(e){const t=this._startSeq;if(!t||!t.first.length)return De;const o=this._unrotateDelta(0,1),s=50+62*o.dx,l=50+62*o.dy,h=this._unrotateDelta(1,0),d=new Map;for(const e of t.first)d.set(e.room,(d.get(e.room)??0)+1);const p=new Map;return Ee`${t.first.map(({entity:t,room:o},u)=>{const m=this._config.vacuums.find(e=>e.entity===t),_=e.find(({r:e})=>e.key===o);if(!m||!_||void 0===_.r.map_x||void 0===_.r.map_y)return De;const f=p.get(o)??0;p.set(o,f+1);const v=40*(f-((d.get(o)??1)-1)/2);return Ee`<div class="seq-avatar" style=${Ue({"--fx":s.toFixed(2)+"%","--fy":l.toFixed(2)+"%","--tx":_.r.map_x+"%","--ty":_.r.map_y+"%",marginLeft:Math.round(h.dx*v)+"px",marginTop:Math.round(h.dy*v)+"px","--c":this._color(m),animationDelay:(.2+.12*u).toFixed(2)+"s"})} data-entity=${t} data-room=${o}>
        <span class="seq-avatar-in">${m.image?Ee`<img src=${m.image} alt="" />`:Ee`<ha-icon icon="mdi:robot-vacuum"></ha-icon>`}</span>
      </div>`})}`}_selectGlobalPreset(e){if(this._activeGlobalPreset=e.id,e.mode&&(this._planMode=e.mode),"all"===e.scope||Array.isArray(e.scope)){const t="all"===e.scope?this._allRoomKeys():e.scope;if(this._backendSel())return void this._setBackendSel(t,"set");const o=new Map(this._localRoomSel);for(const e of this._config.vacuums)for(const t of this._roomsFor(e))o.delete(e.entity+":"+t.key);for(const e of t)for(const t of this._config.vacuums)this._roomsFor(t).some(t=>t.key===e)&&o.set(t.entity+":"+e,!0);this._localRoomSel=o;for(const e of this._config.vacuums)this._saveRoomSel(e.entity)}}_vacAbbrev(e){return((e.name??e.entity.split(".")[1]??"").replace(/[^A-Za-z0-9]/g,"").slice(0,2)||"??").toUpperCase()}_renderPlanPreview(){if("auto"!==this._config.ui_mode)return De;const e=this._allRoomKeys().filter(e=>this._isRoomSelectedAny(e,this._config.vacuums));if(!e.length)return De;const t=this._planMode,o=(this._config.global_presets??[]).find(e=>e.id===this._activeGlobalPreset)?.label,s="dry"===t||"both"===t,l="wet"===t||"both"===t;this._fetchPlan(e,t);const h=this._planPreview?.dry??new Map,d=this._planPreview?.wet??new Map,roomDef=e=>{for(const t of this._config.vacuums){const o=this._roomsFor(t).find(t=>t.key===e);if(o)return o}},cell=e=>{const t=this._config.vacuums.find(t=>t.entity===e);if(!t)return Ee`<span style="font-size:11px;opacity:.25">—</span>`;const o=this._color(t);return Ee`<span style="display:inline-flex;align-items:center;justify-content:center;min-width:24px;height:17px;padding:0 5px;border-radius:9px;font-size:10px;font-weight:700;color:rgb(var(--avc-ink-rgb));background:${o}30;border:1px solid ${o}">${this._vacAbbrev(t)}</span>`},modeBtn=(e,o)=>{const s=t===e;return Ee`<button @click=${t=>{t.stopPropagation(),this._planMode=e}}
        style="padding:2px 8px;border-radius:8px;font-size:10px;font-weight:700;cursor:pointer;font-family:inherit;border:1px solid ${s?"rgba(var(--avc-ink-rgb),0.5)":"rgba(var(--avc-ink-rgb),0.15)"};background:${s?"rgba(var(--avc-ink-rgb),0.12)":"transparent"};color:${s?"#fff":"rgba(var(--avc-ink-rgb),0.5)"}">${o}</button>`},p="plan-run";return Ee`
      <div style="margin:0 4px 6px;padding:6px 8px;background:rgba(var(--avc-ink-rgb),0.03);border:1px solid rgba(var(--avc-ink-rgb),0.08);border-radius:12px;display:flex;flex-direction:column;gap:6px">
        <div style="display:flex;align-items:center;justify-content:space-between">
          <span style="font-size:9px;font-weight:600;letter-spacing:.6px;color:rgba(var(--avc-ink-rgb),.35)">CLEAN PLAN${o?" · "+o.toUpperCase():""}</span>
          <div style="display:flex;gap:4px">${modeBtn("dry","Dry")}${modeBtn("wet","Wet")}${modeBtn("both","Both")}</div>
        </div>
        <div style="display:flex;gap:6px;overflow-x:auto;align-items:center">
          <div style="display:flex;flex-direction:column;gap:3px;align-items:center;flex-shrink:0;padding-right:2px">
            <span style="height:18px"></span>
            ${s?Ee`<ha-icon icon="mdi:broom" style="--mdc-icon-size:14px;color:rgba(var(--avc-ink-rgb),.4)"></ha-icon>`:De}
            ${l?Ee`<ha-icon icon="mdi:water" style="--mdc-icon-size:14px;color:rgba(var(--avc-info-rgb),.7)"></ha-icon>`:De}
          </div>
          ${e.map(e=>{const t=roomDef(e);return Ee`<div style="display:flex;flex-direction:column;align-items:center;gap:3px;min-width:32px;flex-shrink:0" title=${t?.name??e}>
              <ha-icon icon=${t?.icon||"mdi:floor-plan"} style="--mdc-icon-size:18px;color:rgba(var(--avc-ink-rgb),.7)"></ha-icon>
              ${s?cell(h.get(e)):De}
              ${l?cell(d.get(e)):De}
            </div>`})}
        </div>
        <button class="action-btn ${this._holdId===p?"action-btn--holding":""}"
          style="flex:0 0 auto;align-self:flex-end;flex-direction:row;gap:6px;padding:7px 16px;background:rgba(var(--avc-ok-rgb),0.14);border:1px solid rgba(var(--avc-ok-rgb),0.55);color:rgb(var(--avc-ink-rgb))"
          @pointerdown=${this._holdStart(p,()=>this._runOrchestrated(e,this._planMode))}
          @pointermove=${this._holdMove}
          @pointerup=${this._holdEnd}
          @pointerleave=${this._holdEnd}
          @pointercancel=${this._holdEnd}>
          <div class="hold-ring"></div>
          <ha-icon icon="mdi:play" style="--mdc-icon-size:18px"></ha-icon>
          <span style="font-size:12px">Start · hold</span>
        </button>
      </div>
    `}_renderAutoBar(){if("auto"!==this._config.ui_mode)return De;const e=this._config.global_presets??[];return e.length?Ee`
      <div style="display:flex;flex-wrap:wrap;gap:8px;padding:2px 4px 4px">
        ${e.map(e=>{const t=this._activeGlobalPreset===e.id;return Ee`<button
            @click=${()=>this._selectGlobalPreset(e)}
            style="flex:0 1 auto;min-width:128px;display:flex;flex-direction:row;align-items:center;justify-content:flex-start;gap:10px;padding:9px 14px;border-radius:14px;cursor:pointer;font-family:inherit;color:white;background:${t?"rgba(var(--avc-ok-rgb),0.14)":"rgba(var(--avc-ink-rgb),0.05)"};border:1px solid ${t?"rgba(var(--avc-ok-rgb),0.6)":"rgba(var(--avc-ink-rgb),0.12)"}">
            <ha-icon icon=${e.icon||"mdi:robot-vacuum-variant"} style="--mdc-icon-size:24px"></ha-icon>
            <div style="display:flex;flex-direction:column;align-items:flex-start;line-height:1.15">
              <span style="font-size:13px;font-weight:700">${e.label}</span>
              <small style="font-size:9px;font-weight:600;letter-spacing:.4px;color:rgba(var(--avc-ink-rgb),0.4)">${"all"===e.scope?"WHOLE HOME":"select"===e.scope?"SELECTED":"ROOMS"}${e.mode?" · "+("dry"===e.mode?"DRY":"wet"===e.mode?"WET":"BOTH"):""}</small>
            </div>
          </button>`})}
      </div>
    `:De}_pinsAttr(){const e=this._selSensor(),t=e?this.hass.states[e]?.attributes?.room_pins:void 0;return t&&"object"==typeof t?t:{}}_pinCandidates(e,t){return this._config.vacuums.filter(o=>this._roomsFor(o).some(t=>t.key===e)&&this._vacCleanType(o)[t])}_cycleRoomPin(e,t,o){const s=this._pinCandidates(e,t);if(s.length<2)return;const l=s.findIndex(e=>e.entity===o),h=s[(l+1)%s.length];this._call("anyvac","pin_room",{room:e,kind:t,vacuum:h.entity})}_vacChip(e,t){const o=this._config.vacuums.find(t=>t.entity===e);if(!o)return Ee`<span class="dock-chip dock-chip--empty" @click=${t??De}>—</span>`;const s=this._color(o);return Ee`<span class="dock-chip"
      style="color:rgb(var(--avc-ink-rgb));background:${s}30;border-color:${s}"
      title=${(o.name??o.entity)+(t?" · tap to assign a different vacuum":"")}
      @click=${t??De}>${this._vacAbbrev(o)}</span>`}_selEstMins(e){let t=0;for(const o of e){let e=0;for(const t of this._config.vacuums){const s=this._roomsFor(t).find(e=>e.key===o);s&&(e=Math.max(e,this._roomCleanMins(s,t)))}t+=e}return Math.round(t)}_renderVacuumIconStrip(){if("portrait"!==this._profile)return De;const e=this._config.vacuums;return e.length?Ee`
      <div class="vac-icon-strip">
        ${e.map((e,t)=>{const o=this._shownSet.has(t),s="vacicon-"+t,l=this._holdId===s;return Ee`
            <div class="vac-icon-slot">
              <button class="vac-icon-btn ${l?"vac-icon-btn--holding":""} ${o?"":"vac-icon-btn--hidden"}"
                style=${Ue({borderColor:this._statusInfo(e)[1]})}
                @pointerdown=${e=>{e.preventDefault(),this._cancelHold(),this._holdId=s,this._holdTimer=setTimeout(()=>{this._holdTimer=null,this._holdId=null,this._toggleShownMulti(t)},Ze)}}
                @pointerup=${()=>{null!==this._holdTimer?(this._cancelHold(),this._robotSheet=t):this._holdId=null}}
                @pointerleave=${this._holdEnd}
                @pointercancel=${this._holdEnd}
                title=${e.name??e.entity} aria-label=${e.name??e.entity}
                aria-pressed=${o?"true":"false"}>
                <div class="hold-ring"></div>
                ${e.image?Ee`<img src=${e.image} alt="" />`:Ee`<ha-icon icon="mdi:robot-vacuum" style=${Ue({color:this._color(e)})}></ha-icon>`}
              </button>
            </div>
          `})}
      </div>
    `:De}_isRail(){return"portrait"===this._profile&&!!this._config.layout&&this._themed()&&!this._config.debug_dense_dock&&!this._stackTopology}_renderRail(e){return this._modeSheetOpen||this._dockSheetOpen?Ee`<div class="dock rail rail--sheet">${this._renderModeSheet()}${this._renderDockSheet()}</div>`:Ee`
      <div class="dock rail">
        <div class="rail-tiles">${e.map((e,t)=>this._renderRailTile(e,t))}</div>
        ${this._renderRailPlan(e)}
        ${this._renderRailTools(e)}
      </div>`}_renderRailTile(e,t){const o=this._shownSet.has(t),s="vacicon-"+t,l=this._holdId===s,h=this._vacName(e),d=this._color(e),p=this._isCleaning(e),[u,m,_]=this._statusInfo(e),f=this._hasError(e)?this.hass.states[this._ent(e,"error")]?.state:null,v=(this._jobProgress()?.vacuums??{})[e.entity],b=this._ent(e,"current_room"),w=b?this.hass.states[b]?.state:void 0,$=v?.room??(p&&w&&"unknown"!==w&&"unavailable"!==w?w:void 0),C="number"==typeof v?.pct?v.pct:p?this._progress(e):null,A=this._battery(e),P=f||($||(null!==A?A+" %":""));return Ee`
      <button class="rail-tile ${l?"rail-tile--holding":""} ${o?"":"rail-tile--hidden"} ${p?"rail-tile--live":""}"
        style=${Ue({"--vac":d})}
        @pointerdown=${e=>{e.preventDefault(),this._cancelHold(),this._holdId=s,this._holdTimer=setTimeout(()=>{this._holdTimer=null,this._holdId=null,this._toggleShownMulti(t)},Ze)}}
        @pointerup=${()=>{null!==this._holdTimer?(this._cancelHold(),this._robotSheet=t):this._holdId=null}}
        @keydown=${e=>{"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),this._robotSheet=t)}}
        @pointerleave=${this._holdEnd}
        @pointercancel=${this._holdEnd}
        title="${h} \u2014 tap for controls, hold to ${o?"hide it on":"show it on"} the map"
        aria-label="${h} \u2014 open controls" aria-pressed=${o?"true":"false"}>
        <div class="hold-ring"></div>
        ${this._renderBattRing(e,36)}
        <span class="rail-tile-text">
          <span class="rail-tile-name">${h}${o?De:Ee`<ha-icon icon="mdi:eye-off-outline"></ha-icon>`}</span>
          <span class="tile-status" style=${Ue({color:f?"rgb(var(--avc-err-rgb))":m})}>
            <ha-icon icon=${f?"mdi:alert-circle-outline":_}></ha-icon>${u}
          </span>
          ${P?Ee`<span class="tile-sub">${P}</span>`:De}
        </span>
        ${p&&null!==C?Ee`<span class="rail-tile-bar"><span style=${Ue({width:Math.min(100,C)+"%"})}></span></span>`:De}
      </button>`}_renderRailPlan(e){const t=e.some(e=>this._intAttrs(e)),o=this._jobProgress(),s=new Map(this._config.vacuums.map(e=>[e.entity,e]));if(o&&Array.isArray(o.rooms)){const e=o.rooms;return Ee`
        <div class="rail-card rail-plan">
          <div class="rail-card-head"><ha-icon icon="mdi:format-list-checks"></ha-icon><span>Plan</span>
            <small>${o.passes_done??0}/${o.passes_total??e.length}</small></div>
          ${e.map(e=>{const t=s.get(e.vacuum),o="done"===e.state?"done":"active"===e.state?"active":"queued";return Ee`
              <div class="rail-plan-row rail-plan-row--${o}">
                <ha-icon icon=${"wet"===e.kind?"mdi:water":"mdi:broom"} style=${Ue({color:t?this._color(t):"inherit"})}></ha-icon>
                <span class="rail-plan-name">${e.room}</span>
                ${"done"===o?Ee`<ha-icon class="rail-plan-state" icon="mdi:check"></ha-icon>`:"active"===o?Ee`<b>${Math.round(Number(e.pct??0))}\u2009%</b>`:De}
              </div>`})}
        </div>`}const l=this._allRoomKeys();if(!l.length)return De;const h=new Map(this._mergedRoomDefs(e).map(({r:e})=>[e.key,e.name??e.key])),d=l.filter(t=>this._isRoomSelectedAny(t,e)),p=d.length?d:l;t&&this._fetchPlan(p,this._planMode);const u=this._etaFor(p,this._planMode,t),m=this._unassignedRooms(p,this._planMode,t);return Ee`
      <div class="rail-card rail-sel">
        <div class="rail-card-head">
          <ha-icon icon=${d.length?"mdi:checkbox-multiple-marked-outline":"mdi:home-outline"}></ha-icon>
          <span>${d.length?`${d.length} ${1===d.length?"room":"rooms"}`:"Whole home"}</span>
          ${u?Ee`<small>~${u} min</small>`:De}
        </div>
        ${d.length?Ee`<div class="rail-chips">${d.map(e=>Ee`<span class="rail-chip">${h.get(e)??e}</span>`)}</div>
              <button class="mtbtn rail-clear" @click=${()=>this._clearRoomSelection()}>
                <ha-icon icon="mdi:close"></ha-icon><span>Clear</span></button>`:Ee`<span class="rail-hint">Tap rooms on the map to pick them</span>`}
        ${m.length?Ee`<span class="rail-warn"><ha-icon icon="mdi:robot-off"></ha-icon>${m.length} without a robot for this mode</span>`:De}
      </div>`}_renderRailTools(e){const t=e.filter(e=>this._mapEntityFor(e)),o=this._alignCandidates(e);return Ee`
      <div class="rail-tools">
        ${this._renderLayerToggleCompact(e)}
        ${t.length?Ee`<button class="mtbtn mtbtn--icon" title="Refresh map" aria-label="Refresh map" @click=${e=>{const o=e.currentTarget;o.classList.remove("mtbtn--spin"),o.offsetWidth,o.classList.add("mtbtn--spin");for(const e of t)this._refreshMap(e)}}>
            <ha-icon icon="mdi:refresh"></ha-icon></button>`:De}
        ${this._config.layout?Ee`<button class="mtbtn mtbtn--icon ${this._flipEff?"on":""}"
            title="Flip map 180° for this screen (this session only)" aria-label="Flip map"
            aria-pressed=${this._flipEff?"true":"false"} @click=${()=>this._toggleFlipLive()}>
            <ha-icon icon="mdi:flip-vertical"></ha-icon></button>`:De}
        ${o.length?Ee`<button class="mtbtn mtbtn--icon" title="Align — full-screen manual floorplan seating" aria-label="Align"
            @click=${()=>this._openAlign(o[0])}>
            <ha-icon icon="mdi:vector-square-edit"></ha-icon></button>`:De}
      </div>`}_clearRoomSelection(){const e=this._config.vacuums,t=this._allRoomKeys().filter(t=>this._isRoomSelectedAny(t,e));if(t.length)if(this._backendSel()){if(e.some(e=>this._intAttrs(e)))for(const e of t)this._call("anyvac","pin_room",{room:e});this._setBackendSel([],"clear")}else for(const o of t)this._toggleRoomAcross(o,e)}_renderDock(e,t=!1){const o=this._config.vacuums;if(this._isRail())return this._renderRail(o);const s=this._mergedRoomDefs(o);if(!s.length)return Ee`${t?this._renderVacuumPicker():De}${this._renderVacuumIconStrip()}${this._renderDockSheet()}`;const l=o.some(e=>this._intAttrs(e)),h=this._planMode,d=this._allRoomKeys().filter(e=>this._isRoomSelectedAny(e,o)),p=d.length?d:this._allRoomKeys();l&&p.length&&this._fetchPlan(p,h);const u=this._planPreview?.dry??new Map,m=this._planPreview?.wet??new Map,_=new Set(l?this._planPreview?.unsequenced??[]:[]),f=new Set(this._unassignedRooms(p,h,l)),v="wet"!==h,b="dry"!==h,badge=e=>null===e?"—":e<1?"<1d":Math.round(e)+"d",modeBtn=(e,t,o)=>Ee`
      <button class="dock-mode ${h===e?"on":""}"
        @click=${t=>{t.stopPropagation(),this._planMode=e}}>
        <ha-icon icon=${t}></ha-icon><span>${o}</span>
      </button>`,w="dock-run",$="portrait"!==this._profile||!!this._config.debug_dense_dock,C=this._themed();return Ee`
      <div class="dock">
        ${t?this._renderVacuumPicker():De}
        ${this._renderVacuumIconStrip()}
        ${"portrait"===this._profile?Ee`
            <div class="dock-layers">${this._renderLayerToggleCompact(o)}
              ${this._config.layout?Ee`<button class="mtbtn ${this._flipEff?"on":""}"
                  title="Flip map 180° for this screen (this session only)"
                  @click=${()=>this._toggleFlipLive()}>
                <ha-icon icon="mdi:flip-vertical"></ha-icon>
              </button>`:De}
              ${(()=>{const e=this._alignCandidates(o);return e.length?Ee`<button class="mtbtn" title="Align — full-screen manual floorplan seating"
                    @click=${()=>this._openAlign(e[0])}>
                  <ha-icon icon="mdi:vector-square-edit"></ha-icon>
                </button>`:De})()}
            </div>
          `:De}
        ${e?Ee`
          <div class="dock-head">
            ${modeBtn("dry","mdi:broom","Dry")}${modeBtn("wet","mdi:water","Wet")}${modeBtn("both","mdi:water-plus","Both")}
            ${o.some(e=>this._dockCaps(e).hasDock||this._careItems(e).length>0)?Ee`
              <button class="dock-mode dock-mode--dock ${this._dockSheetOpen?"on":""}"
                @click=${e=>{e.stopPropagation(),this._dockSheetOpen=!this._dockSheetOpen}}>
                <ha-icon icon="mdi:home-outline"></ha-icon><span>Dock</span>
                ${this._dockNeedsAttention()?Ee`<span class="dock-mode-dot"></span>`:De}
              </button>`:De}
          </div>`:De}
        ${this._renderModeSheet()}
        ${this._renderDockSheet()}
        ${$?Ee`<div class="dock-rows">
          ${s.map(({r:e,v:t})=>{const s=this._intRoomRec(t,e),d=this._ageDaysFromIso(s?.dry),p=this._ageDaysFromIso(s?.wet),w=this._roomCoverageRec(t,e),covBadge=e=>C?null==e||e>=100?"":e+"%":null==e?"—":e+"%",$=this._isRoomSelectedAny(e.key,o),A=this._pinCandidates(e.key,"dry").length>1,P=this._pinCandidates(e.key,"wet").length>1,pinTap=(t,o)=>("dry"===t?A:P)?s=>{s.stopPropagation(),this._cycleRoomPin(e.key,t,o)}:void 0,F="normal"!==this._mapMode;return Ee`
              <button class="dock-row ${$?"on":""} ${F?"room-overlay--locked":""}" ?disabled=${F}
                title=${F?"Room selection is off while placing a pin/zone":""}
                @click=${()=>{F||this._toggleRoomAcross(e.key,o)}}>
                <ha-icon class="dock-ric" icon=${e.icon??"mdi:square"}></ha-icon>
                <span class="dock-name">${e.name??e.key}</span>
                <span class="dock-info">
                  ${$&&f.has(e.key)?Ee`<ha-icon class="dock-unassigned" icon="mdi:robot-off"
                    title="No available robot for this room's ${h} pass — check that a vacuum is configured with the right role and knows this room."></ha-icon>`:De}
                  ${$&&_.has(e.key)?Ee`<ha-icon class="dock-unseq" icon="mdi:sort-variant-off"
                    title="No cleaning order set for this room — the time estimate may be off. Set the order in the card editor's Global tab."></ha-icon>`:De}
                  <span class="dock-ages">
                    <span class="dock-age">${this._renderProgChip(this._roomProgForType(e,o,"dry"))}<ha-icon icon="mdi:broom"></ha-icon><b style=${Ue({color:this._colorForAgeDays(d)})}>${badge(d)}</b><small class="dock-cov" title="Last completed dry clean's coverage">${covBadge(w?.dry)}</small></span>
                    <span class="dock-age">${this._renderProgChip(this._roomProgForType(e,o,"wet"))}<ha-icon icon="mdi:water"></ha-icon><b style=${Ue({color:this._colorForAgeDays(p)})}>${badge(p)}</b><small class="dock-cov" title="Last completed wet clean's coverage">${covBadge(w?.wet)}</small></span>
                  </span>
                  ${l&&$?Ee`
                    <span class="dock-avatars">
                      ${v?this._vacChip(u.get(e.key),pinTap("dry",u.get(e.key))):De}
                      ${b?this._vacChip(m.get(e.key),pinTap("wet",m.get(e.key))):De}
                    </span>`:De}
                </span>
              </button>`})}
        </div>`:De}
        ${e&&l?Ee`
          <div class="dock-foot">
            <span class="dock-est">${d.length?d.length+" rooms · ~"+this._etaFor(p,h,l)+" min":"Whole home · ~"+this._etaFor(p,h,l)+" min"}
              ${f.size?Ee`<ha-icon class="dock-unassigned" icon="mdi:robot-off"
                title="${f.size} selected room${f.size>1?"s have":" has"} no available robot for the ${h} pass — it/they will be silently skipped. Check vacuum roles/config."></ha-icon>`:De}
              ${_.size?Ee`<ha-icon class="dock-unseq" icon="mdi:sort-variant-off"
                title="${_.size} selected room${_.size>1?"s have":" has"} no cleaning order set — the time above may be off. Set the order in the card editor's Global tab."></ha-icon>`:De}</span>
            <button class="action-btn dock-run ${this._holdId===w?"action-btn--holding":""}"
              ?disabled=${!p.length}
              @pointerdown=${p.length?this._holdStart(w,()=>this._runOrchestrated(p,this._planMode)):De}
              @pointermove=${this._holdMove}
              @pointerup=${this._holdEnd}
              @pointerleave=${this._holdEnd}
              @pointercancel=${this._holdEnd}>
              <div class="hold-ring"></div>
              <ha-icon icon="mdi:play" style="--mdc-icon-size:16px"></ha-icon>
              <span style="font-size:12px">Start · hold</span>
            </button>
          </div>`:De}
      </div>
    `}_dockNeedsAttention(){return this._config.vacuums.some(e=>{const t=this._intAttrs(e)?.dock_status,o=t?.dock_error_status;return null!=o&&0!==o&&"0"!==o})}_dockTier(e){const t=this._intAttrs(e)?.dock_status?.dock_type;return null==t||0===t?"none":1===t||5===t?"empty":"full"}_dockCaps(e){const t=this._intAttrs(e)?.dock_status?.features;if(t&&null!==t.has_dock&&void 0!==t.has_dock)return{hasDock:!!t.has_dock,collect:!!t.is_collectable,wash:!!t.is_washable,dry:!!t.is_dryable};const o=this._dockTier(e);return{hasDock:"none"!==o,collect:"none"!==o,wash:"full"===o,dry:"full"===o}}_dockCapsKey(e){const t=this._dockCaps(e);return`${t.hasDock?1:0}${t.collect?1:0}${t.wash?1:0}${t.dry?1:0}`}_dockRunning(e,t){const o=this._intAttrs(e)?.dock_status?.running;if(!o)return null;const s=o[t];return null==s?null:!!s}_renderDockSheet(){if(!this._dockSheetOpen)return De;const e=this._config.vacuums.filter(e=>this._dockCaps(e).hasDock||this._careItems(e).length>0);if(!e.length)return De;const t=Math.min(this._dockSheetIdx,e.length-1),o=e[t],s=this._dockCaps(o),l=this._intAttrs(o)?.dock_status,act=(e,t)=>()=>{this._call("anyvac",e,{entity_id:o.entity,...t?{action:t}:{}})},cycle=(e,t,s,l)=>{const h=this._dockRunning(o,t);return Ee`
        <button class="dock-sheet-action ${h?"running":""}"
          title=${h?`Stop ${l.toLowerCase()}`:l}
          @click=${act(e,h?"stop":"start")}>
          <ha-icon icon=${h?"mdi:stop":s}></ha-icon>
          <span>${h?"Stop":l}</span>
        </button>`},h=this._careItems(o),reset=e=>t=>{t.stopPropagation();const o=e.entity??e.reset,s=new Map(this._careResetPending);s.set(o,Date.now()),this._careResetPending=s,setTimeout(()=>{if(this._careResetPending.get(o)===s.get(o)){const e=new Map(this._careResetPending);e.delete(o),this._careResetPending=e}},4e4),this._call("button","press",{entity_id:e.reset})};return Ee`
      <div class="dock-sheet">
        ${e.length>1?Ee`
          <div class="dock-sheet-tabs">
            ${e.map((e,o)=>Ee`
              <button class="dock-sheet-tab ${o===t?"on":""}"
                style=${Ue({borderColor:this._color(e)})}
                title=${e.name??e.entity}
                @click=${e=>{e.stopPropagation(),this._dockSheetIdx=o}}>
                ${e.image?Ee`<img src=${e.image} alt="" />`:Ee`<ha-icon icon="mdi:robot-vacuum" style=${Ue({color:this._color(e)})}></ha-icon>`}
              </button>`)}
          </div>`:De}
        ${this._config.debug&&l?Ee`
          <div class="dock-sheet-debug">
            ${Object.entries(l).flatMap(([e,t])=>null===t||"object"!=typeof t||Array.isArray(t)?[[e,t]]:Object.entries(t).map(([t,o])=>[`${e}.${t}`,o])).filter(([e,t])=>void 0!==t&&(null!==t||e.includes("."))).map(([e,t])=>Ee`<span>${e}: ${null===t?"null":String(t)}</span>`)}
          </div>`:De}
        ${s.hasDock?Ee`
          <div class="dock-sheet-actions">
            ${s.collect?cycle("dock_empty","empty","mdi:delete-empty","Empty"):De}
            ${s.wash?cycle("dock_wash","wash","mdi:water","Wash"):De}
            ${s.dry?cycle("dock_dry","dry","mdi:hair-dryer","Dry"):De}
            ${s.wash?Ee`
              <button class="dock-sheet-action" @click=${act("dock_pump")}>
                <ha-icon icon="mdi:water-pump"></ha-icon><span>Pump</span>
              </button>
              <button class="dock-sheet-action" @click=${act("dock_self_clean")}>
                <ha-icon icon="mdi:autorenew"></ha-icon><span>Self-clean</span>
              </button>`:De}
          </div>`:De}
        ${h.length?Ee`
          <div class="dock-sheet-care">
            ${h.map(e=>Ee`
              <div class="dock-sheet-care-row">
                <span class="dock-sheet-care-label">${e.label}</span>
                ${e.binary?Ee`<span class="dock-sheet-care-badge ${"on"===this.hass.states[e.binary]?.state?"warn":""}">
                      ${"on"===this.hass.states[e.binary]?.state?"⚠":"OK"}
                    </span>`:Ee`<span class="dock-sheet-care-value">${this._careValue(e)}</span>`}
                ${e.reset?(()=>{const t=this._careResetPending.has(e.entity??e.reset);return Ee`
                    <button class="dock-sheet-care-reset ${t?"pending":""}"
                      title="Reset" ?disabled=${t} @click=${reset(e)}>
                      <ha-icon icon=${t?"mdi:loading":"mdi:refresh"}></ha-icon>
                    </button>`})():De}
              </div>`)}
          </div>`:De}
      </div>
    `}_renderModeSheet(){if(!this._modeSheetOpen)return De;const e=this._planMode,pick=e=>t=>{t.stopPropagation(),this._planMode=e,this._modeSheetOpen=!1},modeBtn=(t,o,s)=>Ee`
      <button class="dock-mode ${e===t?"on":""}" @click=${pick(t)}>
        <ha-icon icon=${o}></ha-icon><span>${s}</span>
      </button>`;return Ee`
      <div class="dock-sheet">
        <div class="dock-head">
          ${modeBtn("dry","mdi:broom","Dry")}${modeBtn("wet","mdi:water","Wet")}${modeBtn("both","mdi:water-plus","Both")}
        </div>
      </div>
    `}_renderStartBar(){const e=this._config.vacuums,t=e.some(e=>this._intAttrs(e)),o=this._allRoomKeys().filter(t=>this._isRoomSelectedAny(t,e)),s=o.length?o:this._allRoomKeys(),l=e.some(e=>this._isCleaning(e)),h="startbar",d={dry:"mdi:broom",wet:"mdi:water",both:"mdi:water-plus"}[this._planMode],p={dry:"Dry",wet:"Wet",both:"Both"}[this._planMode],u=Ee`
      <button class="start-seg start-seg--mode ${this._modeSheetOpen?"on":""}"
        title="Clean type — tap to change"
        @click=${e=>{e.stopPropagation(),this._dockSheetOpen=!1,this._modeSheetOpen=!this._modeSheetOpen}}>
        <ha-icon icon=${d}></ha-icon>
        <span>${p}</span>
      </button>`,m=e.some(e=>this._dockCaps(e).hasDock||this._careItems(e).length>0),_=m?Ee`
      <button class="start-seg start-seg--dock ${this._dockSheetOpen?"on":""}"
        title="Dock control"
        @click=${e=>{e.stopPropagation(),this._modeSheetOpen=!1,this._dockSheetOpen=!this._dockSheetOpen}}>
        <ha-icon icon="mdi:home-outline"></ha-icon>
        ${this._dockNeedsAttention()?Ee`<span class="dock-mode-dot"></span>`:De}
      </button>`:De;if(l)return Ee`
        <div class="start-row">
          ${u}
          <button class="start-bar start-bar--cancel ${this._holdId===h?"action-btn--holding":""}"
            @pointerdown=${this._holdStart(h,()=>{if(t)this._call("anyvac","cancel",{});else for(const t of e)this._isCleaning(t)&&this._pause(t)})}
            @pointermove=${this._holdMove}
            @pointerup=${this._holdEnd} @pointerleave=${this._holdEnd} @pointercancel=${this._holdEnd}>
            <div class="hold-ring"></div>
            <ha-icon icon="mdi:stop"></ha-icon>
            <span>CANCEL · hold</span>
          </button>
          ${_}
        </div>`;const f=t&&s.length>0,v=this._etaFor(s,this._planMode,t),b=o.length?o.length+(1===o.length?" room":" rooms"):"whole home";return Ee`
      <div class="start-row">
        ${u}
        <button class="start-bar ${f&&this._holdId===h?"action-btn--holding":""}"
          ?disabled=${!f}
          title=${t?"":"Requires the AnyVac integration"}
          @pointerdown=${f?this._holdStart(h,()=>this._runOrchestrated(s,this._planMode)):De}
          @pointermove=${this._holdMove}
          @pointerup=${this._holdEnd} @pointerleave=${this._holdEnd} @pointercancel=${this._holdEnd}>
          <div class="hold-ring"></div>
          <ha-icon icon="mdi:play"></ha-icon>
          <span>START · ${b}${v?" · ~"+v+" min":""}</span>
        </button>
        ${_}
      </div>`}_settingPresets(e){if(e.presets&&e.presets.length)return e.presets;const t=e.clean_action;return[{id:"default",label:"Default",suction_level:t?.suction_level,mop_mode:t?.mop_mode,mop_intensity:t?.mop_intensity,repeat:t?.repeat}]}_activePresetId(e){const t=this._settingPresets(e),o=this._activePresets.get(e.entity);return o&&t.some(e=>e.id===o)?o:t[0]?.id??"default"}_activePreset(e){const t=this._settingPresets(e),o=this._activePresetId(e);return t.find(e=>e.id===o)??t[0]}_setActivePreset(e,t){const o=new Map(this._activePresets);o.set(e.entity,t),this._activePresets=o}_renderPresetChips(e){const t=this._settingPresets(e);if(t.length<2)return De;const o=this._activePresetId(e),s=this._color(e);return Ee`
      <div class="preset-chip-row">
        ${t.map(t=>{const l=t.id===o;return Ee`<button
            @click=${o=>{o.stopPropagation(),this._setActivePreset(e,t.id)}}
            style=${Ue({display:"inline-flex",alignItems:"center",gap:"4px",flexShrink:"0",padding:"4px 10px",borderRadius:"14px",cursor:"pointer",fontSize:"12px",lineHeight:"1",border:"1px solid "+(l?s:"rgba(var(--avc-ink-rgb),0.15)"),background:l?this._colorBg(e):"rgba(var(--avc-ink-rgb),0.04)",color:l?"rgb(var(--avc-ink-rgb))":"rgba(var(--avc-ink-rgb),0.55)"})}
          >
            ${t.icon?Ee`<ha-icon icon=${t.icon} style="--mdc-icon-size:14px"></ha-icon>`:De}
            <span>${t.label}</span>
          </button>`})}
      </div>
    `}async _startClean(e){const t=this._roomsFor(e).filter(t=>this._isRoomSelected(t,e));if(0===t.length)return;if(this._intAttrs(e)){const o=this._activePreset(e),s=this._liveCleanType(e),l={};return o.suction_level&&(l.fan_speed=o.suction_level),"wet"===s&&o.mop_mode&&(l.mop_mode=o.mop_mode),"wet"===s&&o.mop_intensity&&(l.mop_intensity=o.mop_intensity),o.repeat&&o.repeat>1&&(l.repeat=o.repeat),void await this._call("anyvac","clean",{rooms:t.map(e=>e.key),mode:s,vacuums:[e.entity],...Object.keys(l).length?{settings:{[s]:{[e.entity]:l}}}:{}})}if(!e.clean_action)return;if("script"===e.clean_action.type){const o=e.clean_action,s={};for(const[l,h]of Object.entries(o.variables??{}))s[l]=h.replace("{{ entity }}",e.entity).replace("{{ selected_segments }}",JSON.stringify(t.map(e=>e.segment_id).filter(Boolean))).replace("{{ selected_room_keys }}",JSON.stringify(t.map(e=>e.key))).replace("{{ selected_area_ids }}",JSON.stringify(t.map(e=>e.area_id).filter(Boolean)));return void await this._call("script","turn_on",{entity_id:o.entity_id,variables:s})}const o=e.clean_action,s=this._activePreset(e),l=s.mop_mode??o.mop_mode,h=s.mop_intensity??o.mop_intensity,d=s.suction_level??o.suction_level;if(o.mop_mode_entity&&l&&await this._call("select","select_option",{entity_id:o.mop_mode_entity,option:l}),o.mop_intensity_entity&&h&&await this._call("select","select_option",{entity_id:o.mop_intensity_entity,option:h}),d&&await this._call("vacuum","set_fan_speed",{entity_id:e.entity,fan_speed:d}),"native-area"===e.clean_action.type)try{await this.hass.callService("vacuum","clean_area",{cleaning_area_id:t.map(e=>e.area_id??this._config.area_mappings?.[e.key]??e.key)},{entity_id:e.entity})}catch(e){console.error("[anyvac-card] vacuum.clean_area failed:",e)}else{const o=e.clean_action,s=t.map(e=>e.segment_id).filter(e=>void 0!==e);if(!s.length)return void console.error("[anyvac-card] no configured segment_ids for the selection; aborting");await this._call("vacuum","send_command",{entity_id:e.entity,command:"app_segment_clean",params:[{segments:s,repeat:o.repeat??1}]})}}_renderBadge(e,t){const o=this._shownSet.has(t),s=this._isCleaning(e),l=this._color(e),h=e.name??e.entity.split(".")[1]??e.entity,d=this._holdId==="badge-"+t,p=this._statusInfo(e)[1],u=s?this._colorBgActive(e):o?this._colorBg(e):"rgba(var(--avc-scrim-2-rgb),0.85)";return Ee`
      <button
        class="badge ${d?"badge--holding":""}"
        style=${Ue({background:u,border:s?"3px solid "+p:o?"2px solid "+p:"2px solid rgba(var(--avc-ink-rgb),0.18)",boxShadow:s?"0 0 18px "+p:o?"0 0 6px "+p:"none"})}
        @pointerdown=${e=>{e.preventDefault(),this._cancelHold(),this._holdId="badge-"+t,this._holdTimer=setTimeout(()=>{this._holdTimer=null,this._holdId=null,this._toggleShown(t)},Ze)}}
        @pointerup=${()=>{null!==this._holdTimer?(this._cancelHold(),this._shownSet=new Set([t]),this._saveShown()):this._holdId=null}}
        @pointerleave=${this._holdEnd}
        @pointercancel=${this._holdEnd}
        aria-pressed=${o?"true":"false"}
        aria-label=${h}
      >
        <div class="hold-ring"></div>
        ${e.image?Ee`<img class="badge-img" src=${e.image} alt=${h} />`:Ee`<ha-icon class="badge-icon" icon="mdi:robot-vacuum" style=${Ue({color:l})}></ha-icon>`}
        <span class="badge-name" style=${Ue({color:o?"rgb(var(--avc-ink-rgb))":"rgba(var(--avc-ink-rgb),0.55)"})}>
          ${h}
        </span>
      </button>
    `}_renderVacuumPicker(){const e=this._config.vacuums;return e.length?Ee`<div class="vac-picker">${e.map((e,t)=>this._renderBadge(e,t))}</div>`:De}_renderGlobalBadge(e,t){const o=this._isGlobalActive(e),s=this._resolveColor(e.color,"orange"),l="global-"+t,h=this._holdId===l,d=o?this._resolveBg(e.color,"orange",!0):"rgba(var(--avc-scrim-2-rgb),0.85)";return Ee`
      <button
        class="badge badge--global ${h?"badge--holding":""}"
        style=${Ue({background:d,border:o?"3px solid "+s:"2px solid rgba(var(--avc-ink-rgb),0.18)",boxShadow:o?"0 0 18px "+s+"B0":"none"})}
        @pointerdown=${this._holdStart(l,()=>this._triggerGlobal(e))}
        @pointermove=${this._holdMove}
        @pointerup=${this._holdEnd}
        @pointerleave=${this._holdEnd}
        @pointercancel=${this._holdEnd}
        aria-label=${e.name}
        title=${"Hold to trigger: "+e.name}
      >
        <div class="hold-ring"></div>
        ${e.image?Ee`<img class="badge-img" src=${e.image} alt=${e.name} />`:Ee`<ha-icon class="badge-icon" icon="mdi:home-floor-a" style=${Ue({color:s})}></ha-icon>`}
        <span class="badge-name" style=${Ue({color:o?"rgb(var(--avc-ink-rgb))":"rgba(var(--avc-ink-rgb),0.55)"})}>
          ${e.name}
        </span>
      </button>
    `}_toggleMode(e,t){this._mapMode===t&&this._modeEntity===e?(this._mapMode="normal",this._modeEntity=null):(this._mapMode=t,this._modeEntity=e)}_armMode(e){this._mapMode===e&&"*"===this._modeEntity?(this._mapMode="normal",this._modeEntity=null):(this._mapMode=e,this._modeEntity="*",this._pinPending=null,this._zonePending=null,this._zoneRectShown=null,this._zoneEdit=null)}_modeCandidates(){return this._config.vacuums.filter(e=>this._intAttrs(e)&&this._mapEntityFor(e))}_isModeCandidate(e){return this._modeEntity===e.entity||"*"===this._modeEntity&&!!this._intAttrs(e)&&!!this._mapEntityFor(e)}_hasZoneEditTarget(e){return this._isModeCandidate(e)||!!this._zonePending?.[e.entity]}_zoneHit(e,t,o){const s=Math.min(e.x0,e.x1),l=Math.max(e.x0,e.x1),h=Math.min(e.y0,e.y1),d=Math.max(e.y0,e.y1),p=[["nw",s,h],["ne",l,h],["sw",s,d],["se",l,d]];for(const[e,s,l]of p)if(Math.abs(t-s)<=4&&Math.abs(o-l)<=4)return e;return t>=s&&t<=l&&o>=h&&o<=d?"move":null}_renderZoneHandles(){return Ee`
      <div class="zone-handle zone-handle--nw"></div>
      <div class="zone-handle zone-handle--ne"></div>
      <div class="zone-handle zone-handle--sw"></div>
      <div class="zone-handle zone-handle--se"></div>
    `}_zoneRectFor(e,t){return"zone"===this._mapMode&&this._isModeCandidate(e)&&this._zoneDrag?this._zoneDrag:this._zoneRectShown?"merged"===this._config.map_mode?t?this._zoneRectShown:null:this._zonePending?.[e.entity]?this._zoneRectShown:null:null}_refreshMap(e){const t=this._mapEntityFor(e);t&&this.hass.callService("homeassistant","update_entity",{entity_id:t})}_clampPct(e){return Math.min(100,Math.max(0,e))}_onMapClick(e,t){if("pin"!==this._mapMode)return;if(!this._isModeCandidate(e))return;if("*"===this._modeEntity&&"merged"===this._config.map_mode){const e={};for(const o of this._modeCandidates()){const s=this._homeFrameCropFor(o);if(s){const l=this._clickToHomePx(s,t.clientX,t.clientY);l&&(e[o.entity]={x:l.x,y:l.y,frame:"home"});continue}const l=this._homeAnchorFitFor(o,this._wrapAspect(this._baseHeightFor(o)));if(l){const s=this._clickToHomeAnchorPx(l.fit,l.dims,this._wrapAspect(this._baseHeightFor(o)),t.clientX,t.clientY);s&&(e[o.entity]={x:s.x,y:s.y,frame:"home"});continue}const h=this._clickToContent(o,t.clientX,t.clientY);h&&(e[o.entity]={x:this._clampPct(h.x),y:this._clampPct(h.y)})}return this._pinPending=Object.keys(e).length?e:null,this._mapMode="normal",void(this._modeEntity=null)}const o=this._homeFrameCropFor(e),s=o?null:this._homeAnchorFitFor(e,this._wrapAspect(this._baseHeightFor(e))),l=!!o||!!s,h=o?this._clickToHomePx(o,t.clientX,t.clientY):s?this._clickToHomeAnchorPx(s.fit,s.dims,this._wrapAspect(this._baseHeightFor(e)),t.clientX,t.clientY):this._clickToContent(e,t.clientX,t.clientY);this._dbg=h?l?"goto (home) "+h.x.toFixed(1)+"px, "+h.y.toFixed(1)+"px":"goto "+h.x.toFixed(1)+"%, "+h.y.toFixed(1)+"%":"(map element not found)",h&&this._call("anyvac","goto",l?{entity_id:e.entity,frame:"home",x_home_px:h.x,y_home_px:h.y}:{entity_id:e.entity,x_pct:this._clampPct(h.x),y_pct:this._clampPct(h.y)}),this._mapMode="normal",this._modeEntity=null}_mapRotationDeg(){return this._config.layout?this._mapRegW<=4||this._mapRegH<=4?0:(this._narrow?90:0)+(this._flipEff?180:0):this._narrow?90:0}_unrotateDelta(e,t){const o=(this._mapRotationDeg()%360+360)%360;if(!o)return{dx:e,dy:t};const s=o*Math.PI/180,l=Math.cos(s),h=Math.sin(s);return{dx:l*e+h*t,dy:-h*e+l*t}}_wrapPct(e,t,o){const s=e.getBoundingClientRect(),l=this._unrotateDelta(t-(s.left+s.right)/2,o-(s.top+s.bottom)/2),h=e.offsetWidth||1,d=e.offsetHeight||1;return{x:100*(l.dx/h+.5),y:100*(l.dy/d+.5)}}_wrapPoint(e,t,o){const s=e.getBoundingClientRect(),l=(s.left+s.right)/2,h=(s.top+s.bottom)/2,d=(t/100-.5)*(e.offsetWidth||1),p=(o/100-.5)*(e.offsetHeight||1),u=(this._mapRotationDeg()%360+360)%360;if(!u)return{x:l+d,y:h+p};const m=u*Math.PI/180,_=Math.cos(m),f=Math.sin(m);return{x:l+(_*d-f*p),y:h+(f*d+_*p)}}_clickToContent(e,t,o){const s=this._mapEntityFor(e)?this.renderRoot?.querySelector(`.map-img[data-entity="${e.entity.replace(/"/g,'\\"')}"]`):null;if(!s)return null;const l=s.getBoundingClientRect(),h=(l.left+l.right)/2,d=(l.top+l.bottom)/2,p=getComputedStyle(s).transform,u=new DOMMatrix("none"===p?void 0:p),m=u.a*u.d-u.b*u.c;if(Math.abs(m)<1e-9)return null;const _=this._unrotateDelta(t-h,o-d),f=(u.d*_.dx-u.c*_.dy)/m,v=(-u.b*_.dx+u.a*_.dy)/m;return{x:100*(f/(s.offsetWidth||1)+.5),y:100*(v/(s.offsetHeight||1)+.5)}}_clickToHomePx(e,t,o){const s=this._clickToImageBasePct(t,o);return s?pctToCropPoint(s,e):null}_clickToImageBasePct(e,t){const o=this.renderRoot?.querySelector(".image-base-img");if(!o)return null;const s=o.getBoundingClientRect(),l=(s.left+s.right)/2,h=(s.top+s.bottom)/2,d=getComputedStyle(o).transform,p=new DOMMatrix("none"===d?void 0:d),u=p.a*p.d-p.b*p.c;if(Math.abs(u)<1e-9)return null;const m=this._unrotateDelta(e-l,t-h),_=(p.d*m.dx-p.c*m.dy)/u,f=(-p.b*m.dx+p.a*m.dy)/u;return{x:100*(_/(o.offsetWidth||1)+.5),y:100*(f/(o.offsetHeight||1)+.5)}}_clickToHomeAnchorPx(e,t,o,s,l){const h=this._clickToImageBasePct(s,l);return h?function unprojectPctThroughFit(e,t,o,s){const l=e.x/100,h=e.y/100/s,d=o.scale/100,p=o.rotation*rt,u=Math.cos(p),m=Math.sin(p),_=l-(50+o.offset_x)/100,f=h-(50+o.offset_y)/100/s,v=(-m*_+u*f)/d;return{x:(u*_+m*f)/d*t.NW+t.NW/2,y:v*t.NW+t.NH/2}}(h,t,e,o):null}_onZoneDown(e,t){if(!(!!this._zoneRectShown&&this._hasZoneEditTarget(e)||"zone"===this._mapMode&&this._isModeCandidate(e)))return;const o=t.currentTarget;o.setPointerCapture?.(t.pointerId);const{x:s,y:l}=this._wrapPct(o,t.clientX,t.clientY);if(this._zoneRectShown){const e=this._zoneHit(this._zoneRectShown,s,l);if(e){const t=this._zoneRectShown,o=Math.min(t.x0,t.x1),h=Math.max(t.x0,t.x1),d=Math.min(t.y0,t.y1),p=Math.max(t.y0,t.y1);return this._zoneRectShown={x0:o,y0:d,x1:h,y1:p},void(this._zoneEdit="move"===e?{type:"move",offsetX:s-o,offsetY:l-d,width:h-o,height:p-d}:{type:e})}if("zone"!==this._mapMode)return}this._zonePending=null,this._zoneRectShown=null,this._zoneEdit=null,this._zoneMulti="*"===this._modeEntity&&"merged"===this._config.map_mode,this._zoneDrag={x0:s,y0:l,x1:s,y1:l}}_onZoneMove(e,t){if(this._zoneEdit&&this._zoneRectShown){const e=t.currentTarget,{x:o,y:s}=this._wrapPct(e,t.clientX,t.clientY),l=3,h=this._zoneEdit;if("move"===h.type){const{offsetX:e,offsetY:t,width:l,height:d}=h,p=Math.min(100-l,Math.max(0,o-e)),u=Math.min(100-d,Math.max(0,s-t));this._zoneRectShown={x0:p,y0:u,x1:p+l,y1:u+d}}else{let{x0:e,y0:t,x1:d,y1:p}=this._zoneRectShown;const u=this._clampPct(o),m=this._clampPct(s);"nw"===h.type?(e=Math.min(u,d-l),t=Math.min(m,p-l)):"ne"===h.type?(d=Math.max(u,e+l),t=Math.min(m,p-l)):"sw"===h.type?(e=Math.min(u,d-l),p=Math.max(m,t+l)):(d=Math.max(u,e+l),p=Math.max(m,t+l)),this._zoneRectShown={x0:e,y0:t,x1:d,y1:p}}return}if(!this._zoneDrag||"zone"!==this._mapMode||!this._isModeCandidate(e))return;const o=t.currentTarget,s=this._wrapPct(o,t.clientX,t.clientY);this._zoneDrag={x0:this._zoneDrag.x0,y0:this._zoneDrag.y0,x1:s.x,y1:s.y}}_onZoneUp(e,t){const o=t.currentTarget;if(this._zoneEdit)return this._zoneEdit=null,void this._commitZoneRect(e,o);if(!this._zoneDrag||"zone"!==this._mapMode||!this._isModeCandidate(e))return;const s=Math.abs(this._zoneDrag.x1-this._zoneDrag.x0)>2||Math.abs(this._zoneDrag.y1-this._zoneDrag.y0)>2;if(this._zoneRectShown=s?this._zoneDrag:null,this._zoneDrag=null,!s)return;this._zoneMulti&&(this._mapMode="normal",this._modeEntity=null),this._commitZoneRect(e,o)}_commitZoneRect(e,t){const o=this._zoneRectShown;if(!o)return;const s=this._wrapPoint(t,Math.min(o.x0,o.x1),Math.min(o.y0,o.y1)),l=this._wrapPoint(t,Math.max(o.x0,o.x1),Math.max(o.y0,o.y1)),h=s.x,d=s.y,p=l.x,u=l.y;if(this._zoneMulti){const e={};for(const t of this._modeCandidates()){const o=this._homeFrameCropFor(t);if(o){const s=this._clickToHomePx(o,h,d),l=this._clickToHomePx(o,p,u);s&&l&&(e[t.entity]={x1:Math.min(s.x,l.x),y1:Math.min(s.y,l.y),x2:Math.max(s.x,l.x),y2:Math.max(s.y,l.y),frame:"home"});continue}const s=this._wrapAspect(this._baseHeightFor(t)),l=this._homeAnchorFitFor(t,s);if(l){const o=this._clickToHomeAnchorPx(l.fit,l.dims,s,h,d),m=this._clickToHomeAnchorPx(l.fit,l.dims,s,p,u);o&&m&&(e[t.entity]={x1:Math.min(o.x,m.x),y1:Math.min(o.y,m.y),x2:Math.max(o.x,m.x),y2:Math.max(o.y,m.y),frame:"home"});continue}const m=this._clickToContent(t,h,d),_=this._clickToContent(t,p,u);m&&_&&(e[t.entity]={x1:this._clampPct(Math.min(m.x,_.x)),y1:this._clampPct(Math.min(m.y,_.y)),x2:this._clampPct(Math.max(m.x,_.x)),y2:this._clampPct(Math.max(m.y,_.y))})}return void(this._zonePending=Object.keys(e).length?e:null)}const m=this._homeFrameCropFor(e);if(m){const t=this._clickToHomePx(m,h,d),o=this._clickToHomePx(m,p,u);return void(t&&o&&(this._zonePending={[e.entity]:{x1:Math.min(t.x,o.x),y1:Math.min(t.y,o.y),x2:Math.max(t.x,o.x),y2:Math.max(t.y,o.y),frame:"home"}}))}const _=this._wrapAspect(this._baseHeightFor(e)),f=this._homeAnchorFitFor(e,_);if(f){const t=this._clickToHomeAnchorPx(f.fit,f.dims,_,h,d),o=this._clickToHomeAnchorPx(f.fit,f.dims,_,p,u);return void(t&&o&&(this._zonePending={[e.entity]:{x1:Math.min(t.x,o.x),y1:Math.min(t.y,o.y),x2:Math.max(t.x,o.x),y2:Math.max(t.y,o.y),frame:"home"}}))}const v=this._clickToContent(e,h,d),b=this._clickToContent(e,p,u);v&&b&&(this._zonePending={[e.entity]:{x1:this._clampPct(Math.min(v.x,b.x)),y1:this._clampPct(Math.min(v.y,b.y)),x2:this._clampPct(Math.max(v.x,b.x)),y2:this._clampPct(Math.max(v.y,b.y))}})}_confirmZone(e){const t=this._zonePending?.[e.entity];if(!t)return;const o=e.clean_action;if(this._call("anyvac","zone_clean","home"===t.frame?{entity_id:e.entity,frame:"home",x1_home_px:t.x1,y1_home_px:t.y1,x2_home_px:t.x2,y2_home_px:t.y2,repeat:o?.repeat??1}:{entity_id:e.entity,x1_pct:t.x1,y1_pct:t.y1,x2_pct:t.x2,y2_pct:t.y2,repeat:o?.repeat??1}),this._zonePending){const t={...this._zonePending};delete t[e.entity],this._zonePending=Object.keys(t).length?t:null,this._zonePending||(this._zoneRectShown=null)}this._zoneDrag=null,this._zoneEdit=null,this._mapMode="normal",this._modeEntity=null}_confirmPin(e){const t=this._pinPending?.[e.entity];if(t&&(this._call("anyvac","goto","home"===t.frame?{entity_id:e.entity,frame:"home",x_home_px:t.x,y_home_px:t.y}:{entity_id:e.entity,x_pct:t.x,y_pct:t.y}),this._pinPending)){const t={...this._pinPending};delete t[e.entity],this._pinPending=Object.keys(t).length?t:null}}_cancelPin(){this._pinPending=null}_cancelZone(){this._zonePending=null,this._zoneDrag=null,this._zoneRectShown=null,this._zoneEdit=null}_renderMetaBar(e){const t=e.filter(e=>this._mapEntityFor(e));if(!t.length){const t=this._renderHero(e);return t===De?De:Ee`<div class="meta-bar">${t}</div>`}const o=this._modeCandidates().length>0,s=o?"":"Requires the AnyVac integration (≥ 0.18) + map entity",l="*"===this._modeEntity?this._mapMode:"normal",h=this._allRoomKeys().filter(t=>this._isRoomSelectedAny(t,e)),d=h.length?h:this._allRoomKeys(),p=e.some(e=>this._intAttrs(e));p&&d.length&&this._fetchPlan(d,this._planMode);const u=p?this._planPreview?.unsequenced??[]:[],m=this._unassignedRooms(d,this._planMode,p),_=this._pinPending?Object.keys(this._pinPending).length:0,f=this._zonePending?Object.keys(this._zonePending).length:0;return Ee`
      <div class="meta-bar">
        ${this._renderHero(e)}
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
          ${m.length?Ee`<span class="mtbtn mtbtn--stat mtbtn--err"
              title="${m.length} selected room${m.length>1?"s have":" has"} no available robot for the ${this._planMode} pass — it/they will be silently skipped. Check vacuum roles/config.">
            <ha-icon icon="mdi:robot-off"></ha-icon><b>${m.length}</b>
          </span>`:De}
          ${u.length?Ee`<span class="mtbtn mtbtn--stat mtbtn--warn"
              title="${u.length} selected room${u.length>1?"s have":" has"} no cleaning order set — the time may be off. Set the order in the card editor's Global tab.">
            <ha-icon icon="mdi:sort-variant-off"></ha-icon><b>${u.length}</b>
          </span>`:De}
          ${this._renderLayerToggleCompact(e)}
          ${this._config.layout?Ee`<button class="mtbtn ${this._flipEff?"on":""}"
              title="Flip map 180° for this screen (this session only — the card editor's Layout section sets a permanent default)"
              @click=${()=>this._toggleFlipLive()}>
            <ha-icon icon="mdi:flip-vertical"></ha-icon>
          </button>`:De}
          ${(()=>{const t=this._alignCandidates(e);return t.length?Ee`<button class="mtbtn" title="Align — full-screen manual floorplan seating"
                @click=${()=>this._openAlign(t[0])}>
              <ha-icon icon="mdi:vector-square-edit"></ha-icon>
            </button>`:De})()}
          <div class="meta-bar-divider"></div>
          <button class="mtbtn mtbtn--ghost" title="Refresh maps" @click=${e=>{const o=e.currentTarget;o.classList.remove("mtbtn--spin"),o.offsetWidth,o.classList.add("mtbtn--spin");for(const e of t)this._refreshMap(e)}}>
            <ha-icon icon="mdi:refresh"></ha-icon>
          </button>
        </div>
      </div>
      ${f?Ee`<div class="calib-panel">
          <div>Zone ready for ${f} vacuum${f>1?"s":""} — drag the box or its corners to adjust, then pick one on its status card below.</div>
          <div class="calib-actions"><button class="mtbtn" @click=${()=>this._cancelZone()}>Cancel</button></div>
        </div>`:"zone"===l?Ee`<div class="calib-panel">Drag a rectangle on the map to set a cleaning zone.</div>`:De}
      ${_?Ee`<div class="calib-panel">
          <div>Pin ready for ${_} vacuum${_>1?"s":""} — pick one on its status card below.</div>
          <div class="calib-actions"><button class="mtbtn" @click=${()=>this._cancelPin()}>Cancel</button></div>
        </div>`:"pin"===l?Ee`<div class="calib-panel">Tap the map to drop a pin.</div>`:De}
    `}_renderMapTools(e){if(!e.map&&!e.image_base&&!this._mapEntityFor(e))return De;const t=this._mapEntityFor(e),o=!!this._intAttrs(e)&&!!t,s=o?"":"Requires the AnyVac integration (≥ 0.18) + map entity",l=this._modeEntity===e.entity?this._mapMode:"normal";return Ee`
      <div class="map-tools">
        ${this._config.layout&&this._config.vacuums.length>1?Ee`<span class="map-tools-label">${e.name??e.entity}</span>`:De}
        ${t?Ee`<button class="mtbtn" @click=${()=>this._refreshMap(e)} title="Refresh map">
          <ha-icon icon="mdi:refresh"></ha-icon><span>Refresh</span>
        </button>`:De}
        <button class="mtbtn ${"pin"===l?"on":""}" ?disabled=${!o}
          @click=${()=>this._toggleMode(e.entity,"pin")} title=${s||"Pin & Go"}>
          <ha-icon icon="mdi:map-marker-radius"></ha-icon><span>Pin &amp; Go</span>
        </button>
        <button class="mtbtn ${"zone"===l?"on":""}" ?disabled=${!o}
          @click=${()=>this._toggleMode(e.entity,"zone")} title=${s||"Zone clean"}>
          <ha-icon icon="mdi:select-drag"></ha-icon><span>Zone</span>
        </button>
        ${!this._dbg||!this._config.debug&&this._config.layout?De:Ee`<span style="font-size:11px;opacity:0.65;align-self:center;font-family:monospace">${this._dbg}</span>`}
      </div>
      ${"pin"===l?Ee`<div class="calib-panel">Tap the map to send the robot there.</div>`:De}
      ${"zone"===l?Ee`<div class="calib-panel">
        ${this._zonePending?.[e.entity]?Ee`<div>Clean this zone? Drag the box or its corners to adjust.</div>
              <div class="calib-actions">
                <button class="mtbtn on" @click=${()=>this._confirmZone(e)}>Clean zone</button>
                <button class="mtbtn" @click=${()=>this._cancelZone()}>Cancel</button>
              </div>`:Ee`Drag a rectangle on the map to set a cleaning zone.`}
      </div>`:De}
    `}_baseHeightFor(e){return"merged"===this._config.map_mode?this._config.base_height??this._config.vacuums.find(e=>e.base_height)?.base_height:e.base_height}_wrapAspect(e){return"number"==typeof e&&e>0&&this._cardW>0?Math.max(.2,(this._cardW-16)/e):this._mapAR>.1?this._mapAR:3.636}_effectiveSeat(e){this._memoSync();const t=this._seatMemo.get(e.entity);if(t)return t;const o=resolveSeat(this._config,e,this._intAttrs(e),this._wrapAspect(this._baseHeightFor(e)));return this._seatMemo.set(e.entity,o),o}_alignCandidates(e){return!1===this._config.visual_editor_mode?[]:e.filter(e=>!!resolveImageBaseSrc(this._config,e)&&!!this._intAttrs(e))}_alignVac(){const e=this._alignSession;return e?this._config.vacuums.find(t=>t.entity===e.vacuum):void 0}_openAlign(e){if(this._alignSession)return;const t=resolveImageBaseSrc(this._config,e);if(!t||!this._intAttrs(e))return;const o=this._effectiveSeat(e),s={rotation:o.rotation,scale:o.scale,scaleY:o.scaleY,offset_x:o.offset_x,offset_y:o.offset_y},l=effectiveAppearance(e),h=resolveImageBaseSrc(this._rawConfig??this._config,e)??t;this._alignSession={vacuum:e.entity,floorplan:t,floorplanKey:h,start:{...s},draft:{...s},history:[],future:[],appearanceStart:{...l},appearanceDraft:{...l},layers:{floor:1,rawMap:1,dry:!0,wet:!0,rooms:!0,staticRooms:!0,others:!0},snap90:!1,nudgeTier:"normal"},this._alignView={zoom:1,panX:0,panY:0,rot:0},this._alignGesture=null,this._roomsSession=null,this._roomsGesture=null,this._roomsDrawGesture=null,this._roomsDeleteConfirm=null,this._floorplanSession=null,this._floorGesture=null,this._resetFloorplanSubmodes(),this._veToolSwitchTarget=null,this._veTool=this._loadVeTool(),"rooms"===this._veTool?this._openRooms():"floorplan"===this._veTool&&this._openFloorplan(),requestAnimationFrame(()=>this._alignRefocusOverlay())}_alignRefocusOverlay(){const e=this._alignHost?.shadowRoot?.querySelector(".align-overlay");e?.focus()}_closeAlign(){this._alignSession=null,this._alignGesture=null,this._alignCancelConfirm=!1,this._roomsSession=null,this._roomsGesture=null,this._roomsDrawGesture=null,this._roomsDeleteConfirm=null,this._floorplanSession=null,this._floorGesture=null,this._resetFloorplanSubmodes(),this._veToolSwitchTarget=null}_resetFloorplanSubmodes(){this._floorplanMode="geo",this._floorCalib=null,this._floorCalibRefNat=null,this._floorCalibResult=null,this._floorCalibError="",this._homeCalib=null,this._homeCalibBusy=!1,this._homeCalibError="",this._homeCalibResult=null,this._homeCalibSnapshotUrl="",this._homeCalibCrop=null,this._homeCalibFrameId="",this._fiducialSnapshotBusy=!1,this._fiducialSnapshotError="",this._fiducialSnapshotPath="",this._fiducialKnown=null,this._fiducialDetectBusy=!1,this._fiducialDetectError="",this._fiducialDetectResult=null,this._floorplanSnapshotBusy=!1,this._floorplanSnapshotError="",this._homeFrameSnapshotBusy=!1,this._homeFrameSnapshotError="",this._guideExportBusy=!1,this._guideExportError="",this._guideExportResult=null,this._placeRoomsResult=null,this._recropDraft={rotation:0,scale:100,offset_x:0,offset_y:0},this._recropHistory=[],this._recropFuture=[],this._recropGesture=null,this._recropNat=null}_alignReadOnly(){const e=this._alignVac();return!!e&&!!this._homeFrameCropFor(e)}_alignHasChanges(){const e=this._alignSession;if(!e)return!1;const t=e.draft,o=e.start;if(t.rotation!==o.rotation||t.scale!==o.scale||(t.scaleY??null)!==(o.scaleY??null)||t.offset_x!==o.offset_x||t.offset_y!==o.offset_y)return!0;const s=e.appearanceDraft,l=e.appearanceStart;return Object.keys(s).some(e=>(s[e]??null)!==(l[e]??null))}_alignCancel(){this._alignHasChanges()||this._roomsHasUnsavedChanges()||this._floorplanHasChanges()?(this._veToolSwitchTarget=null,this._alignCancelConfirm=!0):this._closeAlign()}_alignConfirmDiscard(){const e=this._veToolSwitchTarget;if(e){if("seat"===this._veTool&&this._alignSession){const e=this._alignSession;this._alignSession={...e,draft:{...e.start},appearanceDraft:{...e.appearanceStart},history:[],future:[]}}else"rooms"===this._veTool?this._roomsSession=null:"floorplan"===this._veTool&&(this._floorplanSession=null,this._resetFloorplanSubmodes());this._veTool=e,this._saveVeTool(e),this._veToolSwitchTarget=null,this._alignCancelConfirm=!1,"rooms"!==e||this._roomsSession||this._openRooms(),"floorplan"!==e||this._floorplanSession||this._openFloorplan()}else this._closeAlign()}_alignDismissCancelConfirm(){this._alignCancelConfirm=!1,this._veToolSwitchTarget=null}_alignReset(){const e=this._alignSession;e&&!this._alignReadOnly()&&(this._alignSession={...e,draft:{...e.start},history:[...e.history,e.draft],future:[],appearanceDraft:{...e.appearanceStart}})}async _alignCopyYaml(){const e=this._alignSession;if(!e)return;const t=function seatToYaml(e,t){const r2=e=>Math.round(100*e)/100,o=["map:",'  seat: "manual"',`  rotation: ${r2(e.rotation)}`,`  scale: ${r2(e.scale)}`];if(null!=e.scaleY&&o.push(`  scale_y: ${r2(e.scaleY)}`),o.push(`  offset_x: ${r2(e.offset_x)}`,`  offset_y: ${r2(e.offset_y)}`),t){const yamlVal=e=>void 0===e?null:null===e?"null":"string"==typeof e?`"${e}"`:String(e),e=["hide_map","overlay_opacity","overlay_blend","path_color","path_width","mop_path_color","mop_band_opacity","mop_band_width","robot_image_on_map","robot_size","robot_image_rotation"].map(e=>[e,yamlVal(t[e])]).filter(([,e])=>null!==e).map(([e,t])=>`  ${e}: ${t}`);e.length&&o.push("","appearance:",...e)}return o.join("\n")}(e.draft,e.appearanceDraft);try{await navigator.clipboard.writeText(t),this._alignCopiedFlash=!0,setTimeout(()=>{this._alignCopiedFlash=!1},1500)}catch(e){console.warn("[anyvac-card] Align: clipboard write failed",e)}}_alignServiceAvailable(){return!!this.hass.services?.anyvac?.set_floorplan_seat}async _alignSave(){const e=this._alignSession,t=this._alignVac();if(!e||!t||!this._alignServiceAvailable()||this._alignReadOnly())return;const o=e.draft,s={rotation:Math.round(100*o.rotation)/100,scale:Math.round(100*o.scale)/100,offset_x:Math.round(100*o.offset_x)/100,offset_y:Math.round(100*o.offset_y)/100};null!=o.scaleY&&(s.scale_y=Math.round(100*o.scaleY)/100);const l={...e.appearanceDraft};try{await this.hass.callService("anyvac","set_floorplan_seat",{floorplan:e.floorplanKey,vacuum:t.entity,map:s,appearance:l}),this._closeAlign()}catch(e){console.warn("[anyvac-card] Align: set_floorplan_seat call failed",e)}}_alignSetField(e,t){const o=this._alignSession;if(!o||this._alignReadOnly())return;const s=parseFloat(t);if(!Number.isFinite(s))return;const l=o.draft;if(l[e]===s)return;const h={...l,[e]:s};this._alignSession={...o,draft:h,history:[...o.history,l],future:[]}}_alignToggleScaleY(e){const t=this._alignSession;if(!t||this._alignReadOnly())return;const o=t.draft,s={...o};e?null==s.scaleY&&(s.scaleY=s.scale):delete s.scaleY,this._alignSession={...t,draft:s,history:[...t.history,o],future:[]}}_alignSetLayerOpacity(e,t){const o=this._alignSession;if(!o)return;const s=parseFloat(t);if(!Number.isFinite(s))return;const l=Math.min(1,Math.max(0,s/100));o.layers[e]!==l&&(this._alignSession={...o,layers:{...o.layers,[e]:l}})}_alignSceneSize(){const e=this._mapAR>.1?this._mapAR:3.636,t=Math.max(100,window.innerWidth-32),o=Math.max(100,window.innerHeight-140);let s=t,l=s/e;return l>o&&(l=o,s=l*e),{w:s,h:l}}_alignViewTransformCss(){const e=this._alignView;return`translate(${e.panX}px,${e.panY}px) scale(${e.zoom}) rotate(${e.rot}deg)`}_alignRotateView(){this._alignView={...this._alignView,rot:(this._alignView.rot+90)%360}}_alignPointToWrapPct(e,t){const o=this._alignHost?.shadowRoot?.querySelector(".align-scene");if(!o)return null;const s=o.getBoundingClientRect(),l=(s.left+s.right)/2,h=(s.top+s.bottom)/2,d=getComputedStyle(o).transform,p=new DOMMatrix("none"===d?void 0:d),u=p.a*p.d-p.b*p.c;if(Math.abs(u)<1e-9)return null;const m=e-l,_=t-h,f=(p.d*m-p.c*_)/u,v=(-p.b*m+p.a*_)/u;return{x:100*(f/(o.offsetWidth||1)+.5),y:100*(v/(o.offsetHeight||1)+.5)}}_alignCornerPct(e,t,o,s,l){const h=function seatToMatrix(e,t,o,s,l){const h=(50+e.offset_x)/100*t,d=(50+e.offset_y)/100*o,p=e.scale/100*(t/s),u=(e.scaleY??e.scale)/100*(t/s);return(new DOMMatrix).translate(h,d).rotate(e.rotation).scale(p,u).translate(-s/2,-.5)}(e,s,l,1),d=h.transformPoint({x:t,y:o});return{x:d.x/s*100,y:d.y/l*100}}_alignResizeCursor(e,t){const o=((e+t)%180+180)%180;return o<22.5||o>=157.5?"ew-resize":o<67.5?"nwse-resize":o<112.5?"ns-resize":"nesw-resize"}_alignFieldArrow(e,t){return Ee`<ha-icon class="align-field-arrow" icon=${e?"mdi:arrow-left-right":"mdi:arrow-up-down"}
      style=${Ue({transform:"rotate("+t+"deg)"})}></ha-icon>`}_alignIsoDist(e,t,o){return Math.hypot(e.x-t.x,(e.y-t.y)/o)}_alignIsoAngleDeg(e,t,o){return 180*Math.atan2((t.y-e.y)/o,t.x-e.x)/Math.PI}_alignStartGesture(e,t,o){const s=this._alignSession;if(!s||this._alignReadOnly())return;this._alignRefocusOverlay(),e.currentTarget.setPointerCapture(e.pointerId),e.stopPropagation(),e.preventDefault();const l=this._alignPointToWrapPct(e.clientX,e.clientY);if(!l)return;const h=this._alignGesture;if(h&&1===h.startPos.size&&!h.startPos.has(e.pointerId)){const[[t,o]]=h.startPos;return void(this._alignGesture={kind:"pinch",startSeat:{...s.draft},startPos:new Map([[t,h.livePos.get(t)??o],[e.pointerId,l]]),livePos:new Map([[t,h.livePos.get(t)??o],[e.pointerId,l]])})}this._alignPushHistory(s.draft),this._alignGesture={kind:t,startSeat:{...s.draft},pivotPct:o,startPos:new Map([[e.pointerId,l]]),livePos:new Map([[e.pointerId,l]])}}_alignGestureMove(e){const t=this._alignSession,o=this._alignGesture;if(!t||!o||!o.startPos.has(e.pointerId))return;const s=this._alignPointToWrapPct(e.clientX,e.clientY);if(!s)return;o.livePos.set(e.pointerId,s);const l=this._mapAR>.1?this._mapAR:3.636;let h=null;if("drag"===o.kind){const t=e.pointerId,s=o.startPos.get(t),l=o.livePos.get(t);h=translateSeat(o.startSeat,l.x-s.x,l.y-s.y)}else if("scale"===o.kind&&o.pivotPct){const t=e.pointerId,s=o.startPos.get(t),d=o.livePos.get(t);if(null!=o.startSeat.scaleY)h=function scaleSeatCornerAniso(e,t,o,s,l){const h=pctToFrac(s,l),d=pctToFrac(t,l),p=pctToFrac(o,l),u=rotatePoint({x:d.x-h.x,y:d.y-h.y},-e.rotation),m=rotatePoint({x:p.x-h.x,y:p.y-h.y},-e.rotation),_=Math.abs(u.x)>1e-6?m.x/u.x:1,f=Math.abs(u.y)>1e-6?m.y/u.y:1,v=seatCentreFrac(e,l),b=rotatePoint({x:v.x-h.x,y:v.y-h.y},-e.rotation),w=rotatePoint({x:b.x*_,y:b.y*f},e.rotation),$=frameToOffset({x:h.x+w.x,y:h.y+w.y},l),C=e.scaleY??e.scale;return{...e,scale:e.scale*_,scaleY:C*f,offset_x:$.offset_x,offset_y:$.offset_y}}(o.startSeat,s,d,o.pivotPct,l);else{const e=this._alignIsoDist(s,o.pivotPct,l),t=this._alignIsoDist(d,o.pivotPct,l);e>1e-6&&(h=scaleSeatAbout(o.startSeat,t/e,o.pivotPct,l))}}else if("stretchY"===o.kind){const t=e.pointerId,s=o.startPos.get(t),d=o.livePos.get(t);h=function stretchSeatY(e,t){const o=e.scaleY??e.scale;return{...e,scaleY:o*t}}(o.startSeat,localAxisScaleRatio(o.startSeat,"y",s,d,l))}else if("stretchX"===o.kind){const t=e.pointerId,s=o.startPos.get(t),d=o.livePos.get(t);h=function stretchSeatX(e,t){const o=e.scaleY??e.scale;return{...e,scale:e.scale*t,scaleY:o}}(o.startSeat,localAxisScaleRatio(o.startSeat,"x",s,d,l))}else if("rotate"===o.kind&&o.pivotPct){const t=e.pointerId,s=o.startPos.get(t),d=o.livePos.get(t),p=this._alignIsoAngleDeg(o.pivotPct,s,l),u=this._alignIsoAngleDeg(o.pivotPct,d,l);h=rotateSeatAbout(o.startSeat,u-p,o.pivotPct,l)}else if("pinch"===o.kind&&2===o.startPos.size){const e=[...o.startPos.keys()],t=o.startPos.get(e[0]),s=o.startPos.get(e[1]),d=o.livePos.get(e[0]),p=o.livePos.get(e[1]);h=pinchSeat(o.startSeat,t,s,d,p,l)}h&&(this._alignSession={...t,draft:h})}_alignGestureEnd(e){const t=this._alignGesture;if(t)if(t.startPos.delete(e.pointerId),t.livePos.delete(e.pointerId),0===t.startPos.size)this._alignGesture=null;else if("pinch"===t.kind&&1===t.startPos.size){const[[e,o]]=t.startPos,s=this._alignSession;this._alignGesture={kind:"drag",startSeat:s?{...s.draft}:t.startSeat,startPos:new Map([[e,o]]),livePos:new Map([[e,o]])}}}_alignPushHistory(e){const t=this._alignSession;t&&(this._alignSession={...t,history:[...t.history,e],future:[]})}_alignUndo(){const e=this._alignSession;if(!e||!e.history.length)return;const t=e.history[e.history.length-1];this._alignSession={...e,draft:t,history:e.history.slice(0,-1),future:[e.draft,...e.future]}}_alignRedo(){const e=this._alignSession;if(!e||!e.future.length)return;const t=e.future[0];this._alignSession={...e,draft:t,history:[...e.history,e.draft],future:e.future.slice(1)}}_alignSetNudgeTier(e){const t=this._alignSession;t&&(this._alignSession={...t,nudgeTier:e})}_veToolHasUnsavedChanges(e){return"seat"===e?this._alignHasChanges():"rooms"===e?this._roomsHasUnsavedChanges():"floorplan"===e&&this._floorplanHasChanges()}_setVeTool(e){if(this._veTool!==e){if(this._veToolHasUnsavedChanges(this._veTool))return this._veToolSwitchTarget=e,void(this._alignCancelConfirm=!0);this._veTool=e,this._saveVeTool(e),"rooms"!==e||this._roomsSession||this._openRooms(),"floorplan"!==e||this._floorplanSession||this._openFloorplan()}}_alignEffectiveNudgeTier(e){return e.ctrlKey||e.metaKey?"fine":e.shiftKey?"jump":this._alignSession?.nudgeTier??"normal"}_alignKeyDown(e){if("floorplan"===this._veTool)return void this._floorplanKeyDown(e);const t=this._alignSession;if(!t)return;const o=e.target,s=!!o&&("INPUT"===o.tagName||"TEXTAREA"===o.tagName);if("Escape"===e.key)return e.preventDefault(),void this._alignCancel();const l=e.ctrlKey||e.metaKey;if(l&&!e.shiftKey&&!e.altKey&&("z"===e.key||"Z"===e.key)){if(s)return;return e.preventDefault(),void this._alignUndo()}if(l&&!e.shiftKey&&!e.altKey&&("y"===e.key||"Y"===e.key)){if(s)return;return e.preventDefault(),void this._alignRedo()}if(s&&e.key.startsWith("Arrow"))return;if(this._alignReadOnly())return;const h=nudgeTierMultiplier(this._alignEffectiveNudgeTier(e)),d=this._mapAR>.1?this._mapAR:3.636,p=t.draft;let u=null;switch(e.key){case"ArrowUp":u=nudgeOffset(p,0,-.1*h,this._alignView.rot,d);break;case"ArrowDown":u=nudgeOffset(p,0,.1*h,this._alignView.rot,d);break;case"ArrowLeft":u=nudgeOffset(p,-.1*h,0,this._alignView.rot,d);break;case"ArrowRight":u=nudgeOffset(p,.1*h,0,this._alignView.rot,d);break;case"[":u=nudgeRotation(p,-.5*h);break;case"]":u=nudgeRotation(p,.5*h);break;case",":u=nudgeScale(p,-.5*h);break;case".":u=nudgeScale(p,.5*h);break;default:return}e.preventDefault();const m=e.repeat?t.history:[...t.history,p];this._alignSession={...t,draft:u,history:m,future:[]}}_floorplanKeyDown(e){if("Escape"===e.key)return e.preventDefault(),void this._alignCancel();if("calib"===this._floorplanMode||"home"===this._floorplanMode)return;const t=this._floorplanSession;if(!t)return;const o=e.target,s=!!o&&("INPUT"===o.tagName||"TEXTAREA"===o.tagName),l=e.ctrlKey||e.metaKey;if(l&&!e.shiftKey&&!e.altKey&&("z"===e.key||"Z"===e.key)){if(s)return;return e.preventDefault(),void this._floorGeoUndo()}if(l&&!e.shiftKey&&!e.altKey&&("y"===e.key||"Y"===e.key)){if(s)return;return e.preventDefault(),void this._floorGeoRedo()}if(s&&e.key.startsWith("Arrow"))return;const h=nudgeTierMultiplier(this._alignEffectiveNudgeTier(e)),d=this._mapAR>.1?this._mapAR:3.636,p=t.draft;let u=null;switch(e.key){case"ArrowUp":u=nudgeOffset(p,0,-.1*h,this._alignView.rot,d);break;case"ArrowDown":u=nudgeOffset(p,0,.1*h,this._alignView.rot,d);break;case"ArrowLeft":u=nudgeOffset(p,-.1*h,0,this._alignView.rot,d);break;case"ArrowRight":u=nudgeOffset(p,.1*h,0,this._alignView.rot,d);break;case"[":u=nudgeRotation(p,-.5*h);break;case"]":u=nudgeRotation(p,.5*h);break;case",":u=nudgeScale(p,-.5*h);break;case".":u=nudgeScale(p,.5*h);break;default:return}e.preventDefault();const m=e.repeat?t.history:[...t.history,p];this._floorplanSession={...t,draft:u,history:m,future:[]}}_alignBgPointerDown(e){this._alignGesture||(this._alignRefocusOverlay(),e.currentTarget.setPointerCapture(e.pointerId),this._alignViewDrag={pointerId:e.pointerId,x0:e.clientX,y0:e.clientY,panX0:this._alignView.panX,panY0:this._alignView.panY})}_alignBgPointerMove(e){const t=this._alignViewDrag;t&&t.pointerId===e.pointerId&&(this._alignView={...this._alignView,panX:t.panX0+(e.clientX-t.x0),panY:t.panY0+(e.clientY-t.y0)})}_alignBgPointerUp(e){this._alignViewDrag?.pointerId===e.pointerId&&(this._alignViewDrag=null)}_alignWheel(e){e.preventDefault();const t=this._alignView.zoom,o=Math.exp(.001*-e.deltaY),s=Math.min(8,Math.max(.25,t*o)),l=this._alignHost?.shadowRoot?.querySelector(".align-scene");if(!l||s===t)return void(this._alignView={...this._alignView,zoom:s});const h=l.getBoundingClientRect(),d=(h.left+h.right)/2,p=(h.top+h.bottom)/2,u=s/t,m=this._alignView.panX+(e.clientX-d)*(1-u),_=this._alignView.panY+(e.clientY-p)*(1-u);this._alignView={...this._alignView,zoom:s,panX:m,panY:_}}_openRooms(){const e=this._alignSession,t=this._alignVac();if(!e||!t)return;const o="merged"===this._config.map_mode,s=resolveStaticRooms(this._rawConfig??this._config,t),l=new Set(s.filter(e=>e.key).map(e=>e.key)),h={};for(const e of this._roomsFor(t))null!=e.map_x&&null!=e.map_y&&null!=e.map_w&&null!=e.map_h&&(h[e.key]={x:e.map_x,y:e.map_y,w:e.map_w,h:e.map_h,areaId:e.area_id??null,isNew:!l.has(e.key)});const d=function effectiveRoomStyle(e){return{border_normal:e.room_border_normal??2,border_selected:e.room_border_selected??4}}(this._config);this._roomsSession={floorplan:e.floorplan,floorplanKey:e.floorplanKey,vacuum:o?void 0:t.entity,rooms:h,start:{...h},selected:null,history:[],future:[],styleStart:{...d},styleDraft:{...d},drawingNew:!1},this._roomsGesture=null,this._roomsDrawGesture=null,this._roomsDeleteConfirm=null}_roomsHasUnsavedChanges(){const e=this._roomsSession;return!!e&&(JSON.stringify(e.rooms)!==JSON.stringify(e.start)||JSON.stringify(e.styleDraft)!==JSON.stringify(e.styleStart))}_roomsSelect(e){const t=this._roomsSession;t&&(this._roomsSession={...t,selected:e})}_roomsPushHistory(e){const t=this._roomsSession;t&&(this._roomsSession={...t,history:[...t.history,e],future:[]})}_roomsUndo(){const e=this._roomsSession;if(!e||!e.history.length)return;const t=e.history[e.history.length-1];this._roomsSession={...e,rooms:t,history:e.history.slice(0,-1),future:[e.rooms,...e.future]}}_roomsRedo(){const e=this._roomsSession;if(!e||!e.future.length)return;const t=e.future[0];this._roomsSession={...e,rooms:t,history:[...e.history,e.rooms],future:e.future.slice(1)}}_roomsReset(){const e=this._roomsSession;e&&(this._roomsSession={...e,rooms:{...e.start},history:[...e.history,e.rooms],future:[],styleDraft:{...e.styleStart}})}_roomsSetAreaId(e,t){const o=this._roomsSession,s=o?.rooms[e];if(!o||!s)return;const l=""===t?null:t;s.areaId!==l&&(this._roomsSession={...o,rooms:{...o.rooms,[e]:{...s,areaId:l}},history:[...o.history,o.rooms],future:[]})}_roomsSetStyle(e,t){const o=this._roomsSession;if(!o)return;const s=parseFloat(t);!Number.isFinite(s)||s<0||s>12||o.styleDraft[e]!==s&&(this._roomsSession={...o,styleDraft:{...o.styleDraft,[e]:s}})}_roomsArmDraw(){const e=this._roomsSession;e&&(this._roomsSession={...e,drawingNew:!e.drawingNew},this._roomsDrawGesture=null)}_roomsGenerateKey(e){let t=1;for(;e.rooms["new_room_"+t];)t++;return"new_room_"+t}_roomsStartGesture(e,t,o,s){const l=this._roomsSession,h=l?.rooms[t];if(!l||!h)return;this._alignRefocusOverlay(),e.currentTarget.setPointerCapture(e.pointerId),e.stopPropagation(),e.preventDefault();const d=this._alignPointToWrapPct(e.clientX,e.clientY);d&&(this._roomsPushHistory(l.rooms),this._roomsSession={...this._roomsSession,selected:t},this._roomsGesture={key:t,mode:o,corner:s,orig:{x:h.x,y:h.y,w:h.w,h:h.h},startPt:d})}_roomsGestureMove(e){const t=this._roomsSession,o=this._roomsGesture;if(!t||!o)return;const s=this._alignPointToWrapPct(e.clientX,e.clientY);if(!s)return;const l=s.x-o.startPt.x,h=s.y-o.startPt.y,d=t.rooms[o.key];if(!d)return;let p;if("move"===o.mode){const e=function moveRect(e,t,o){return{map_x:round1(clampPct(e.x+t)),map_y:round1(clampPct(e.y+o))}}(o.orig,l,h);p={x:e.map_x,y:e.map_y}}else{const e=function resizeRect(e,t,o,s){const l=e.w/2,h=e.h/2,{sx:d,sy:p}=ct[t],u=e.x+d*l,m=e.y+p*h,_=e.x-d*l,f=e.y-p*h,v=u+o,b=m+s;return{map_x:round1(clampPct((v+_)/2)),map_y:round1(clampPct((b+f)/2)),map_w:round1(clampSize(Math.abs(v-_))),map_h:round1(clampSize(Math.abs(b-f)))}}(o.orig,o.corner,l,h);p={x:e.map_x,y:e.map_y,w:e.map_w,h:e.map_h}}this._roomsSession={...t,rooms:{...t.rooms,[o.key]:{...d,...p}}}}_roomsGestureEnd(){this._roomsGesture=null}_roomsCanvasPointerDown(e){const t=this._roomsSession;if(!t?.drawingNew)return void this._alignBgPointerDown(e);if(this._roomsGesture)return;const o=this._alignPointToWrapPct(e.clientX,e.clientY);o&&(this._alignRefocusOverlay(),e.currentTarget.setPointerCapture(e.pointerId),e.preventDefault(),this._roomsDrawGesture={startPt:o,curPt:o})}_roomsCanvasPointerMove(e){if(this._roomsDrawGesture){const t=this._alignPointToWrapPct(e.clientX,e.clientY);return void(t&&(this._roomsDrawGesture={...this._roomsDrawGesture,curPt:t}))}this._alignBgPointerMove(e)}_roomsCanvasPointerUp(e){const t=this._roomsDrawGesture,o=this._roomsSession;if(!t||!o)return void this._alignBgPointerUp(e);this._roomsDrawGesture=null;const s=t.startPt,l=t.curPt??t.startPt,h=round1(clampPct((s.x+l.x)/2)),d=round1(clampPct((s.y+l.y)/2)),p=round1(Math.min(100,Math.max(2,Math.abs(l.x-s.x)))),u=round1(Math.min(100,Math.max(2,Math.abs(l.y-s.y)))),m=this._roomsGenerateKey(o),_={x:h,y:d,w:p,h:u,areaId:null,isNew:!0};this._roomsSession={...o,drawingNew:!1,selected:m,rooms:{...o.rooms,[m]:_},history:[...o.history,o.rooms],future:[]}}_roomsRenameKey(e,t){const o=this._roomsSession,s=o?.rooms[e];if(!o||!s||!s.isNew)return;const l=t.trim().toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_+|_+$/g,"");if(!l||l===e||o.rooms[l])return;const h={...o.rooms};delete h[e],h[l]=s,this._roomsSession={...o,rooms:h,selected:l,history:[...o.history,o.rooms],future:[]}}_roomsRequestDelete(e){const t=this._roomsSession?.rooms[e];t?.isNew&&(this._roomsDeleteConfirm=e)}_roomsConfirmDelete(){const e=this._roomsSession,t=this._roomsDeleteConfirm;if(this._roomsDeleteConfirm=null,!e||!t||!e.rooms[t])return;const o={...e.rooms};delete o[t],this._roomsSession={...e,rooms:o,selected:e.selected===t?null:e.selected,history:[...e.history,e.rooms],future:[]}}_roomsDismissDelete(){this._roomsDeleteConfirm=null}async _roomsCopyYaml(){const e=this._roomsSession;if(!e)return;const t=function roomsSessionToYaml(e,t){const r1=e=>Math.round(10*e)/10,o=[],s=Object.keys(e).sort();if(s.length){o.push("rooms:");for(const t of s){const s=e[t];o.push(`  - key: "${t}"`),o.push(`    map_x: ${r1(s.x)}`),o.push(`    map_y: ${r1(s.y)}`),o.push(`    map_w: ${r1(s.w)}`),o.push(`    map_h: ${r1(s.h)}`),null!=s.areaId&&o.push(`    area_id: "${s.areaId}"`)}}return t&&(o.length&&o.push(""),o.push(`room_border_normal: ${t.border_normal}`),o.push(`room_border_selected: ${t.border_selected}`)),o.join("\n")}(e.rooms,e.styleDraft);try{await navigator.clipboard.writeText(t),this._roomsCopiedFlash=!0,setTimeout(()=>{this._roomsCopiedFlash=!1},1500)}catch(e){console.warn("[anyvac-card] Rooms: clipboard write failed",e)}}async _roomsSave(){const e=this._roomsSession;if(!e||!this._alignServiceAvailable())return;const t={};for(const o of Object.keys(e.rooms)){const s=e.rooms[o],l=e.start[o];l&&l.x===s.x&&l.y===s.y&&l.w===s.w&&l.h===s.h&&l.areaId===s.areaId||(t[o]={map_x:s.x,map_y:s.y,map_w:s.w,map_h:s.h,area_id:s.areaId})}for(const o of Object.keys(e.start))o in e.rooms||(t[o]=null);try{if(e.vacuum){const o=this._config.vacuums.find(t=>t.entity===e.vacuum);if(!o)return;const s=this._effectiveSeat(o),l={rotation:Math.round(100*s.rotation)/100,scale:Math.round(100*s.scale)/100,offset_x:Math.round(100*s.offset_x)/100,offset_y:Math.round(100*s.offset_y)/100};null!=s.scaleY&&(l.scale_y=Math.round(100*s.scaleY)/100);const h=effectiveAppearance(o);await this.hass.callService("anyvac","set_floorplan_seat",{floorplan:e.floorplanKey,vacuum:e.vacuum,map:l,appearance:h,rooms:t})}else{const o=this._floorplanSeatsRaw(),s=o?.[e.floorplanKey];await this.hass.callService("anyvac","set_floorplan_seat",{floorplan:e.floorplanKey,rooms:t,image_base:s?.image_base??null,room_style:{...e.styleDraft}})}this._roomsSession={...e,start:{...e.rooms},styleStart:{...e.styleDraft},history:[],future:[]}}catch(e){console.warn("[anyvac-card] Rooms: set_floorplan_seat call failed",e)}}_floorplanCardImageBase(){const e=this._alignSession?.floorplan;if(!e||"merged"!==this._config.map_mode)return null;const t=this._config.image_base;return t?.src===e?t:null}_openFloorplan(){if(this._floorplanSession)return;const e=this._floorplanCardImageBase(),t=this._alignSession?.floorplan,o=this._alignSession?.floorplanKey;if(!e||!t||!o)return;const{src:s,rotation:l,scale:h,offset_x:d,offset_y:p,...u}=e,m=function effectiveFloorplanGeometry(e){return{rotation:e?.rotation??0,scale:e?.scale??100,offset_x:e?.offset_x??0,offset_y:e?.offset_y??0}}(e);this._floorplanSession={floorplan:t,floorplanKey:o,start:{...m},draft:{...m},history:[],future:[],rest:u},this._floorGesture=null}_floorplanHasChanges(){const e=this._floorplanSession;if(!e)return!1;const t=e.draft,o=e.start;if(t.rotation!==o.rotation||t.scale!==o.scale||t.offset_x!==o.offset_x||t.offset_y!==o.offset_y)return!0;const s=this._recropDraft;return 0!==s.offset_x||0!==s.offset_y||100!==s.scale}_floorplanReset(){const e=this._floorplanSession;e&&(this._floorplanSession={...e,draft:{...e.start},history:[...e.history,e.draft],future:[]})}async _floorplanCopyYaml(){const e=this._floorplanSession;if(e)try{await navigator.clipboard.writeText(function floorplanGeometryToYaml(e){const r2=e=>Math.round(100*e)/100;return["image_base:",`  rotation: ${r2(e.rotation)}`,`  scale: ${r2(e.scale)}`,`  offset_x: ${r2(e.offset_x)}`,`  offset_y: ${r2(e.offset_y)}`].join("\n")}(e.draft)),this._floorplanCopiedFlash=!0,setTimeout(()=>{this._floorplanCopiedFlash=!1},1500)}catch(e){console.warn("[anyvac-card] Floorplan: clipboard write failed",e)}}async _floorplanSave(){const e=this._floorplanSession;if(!e||!this._alignServiceAvailable())return;const t=e.draft,o={...e.rest,src:e.floorplan,rotation:Math.round(100*t.rotation)/100,scale:Math.round(100*t.scale)/100,offset_x:Math.round(100*t.offset_x)/100,offset_y:Math.round(100*t.offset_y)/100},s=this._floorplanSeatsRaw()?.[e.floorplanKey],l={floorplan:e.floorplanKey,image_base:o};s?.room_style&&(l.room_style=s.room_style);try{await this.hass.callService("anyvac","set_floorplan_seat",l),this._closeAlign()}catch(e){console.warn("[anyvac-card] Floorplan: set_floorplan_seat call failed",e)}}_floorGeoStartGesture(e,t,o){const s=this._floorplanSession;if(!s)return;this._alignRefocusOverlay(),e.currentTarget.setPointerCapture(e.pointerId),e.stopPropagation(),e.preventDefault();const l=this._alignPointToWrapPct(e.clientX,e.clientY);l&&(this._floorGeoPushHistory(s.draft),this._floorGesture={kind:t,startSeat:{...s.draft},pivotPct:o,startPos:new Map([[e.pointerId,l]]),livePos:new Map([[e.pointerId,l]])})}_floorGeoGestureMove(e){const t=this._floorplanSession,o=this._floorGesture;if(!t||!o||!o.startPos.has(e.pointerId))return;const s=this._alignPointToWrapPct(e.clientX,e.clientY);if(!s)return;o.livePos.set(e.pointerId,s);const l=this._mapAR>.1?this._mapAR:3.636,h=e.pointerId,d=o.startPos.get(h),p=o.livePos.get(h);let u=null;if("drag"===o.kind)u=translateSeat(o.startSeat,p.x-d.x,p.y-d.y);else if("scale"===o.kind&&o.pivotPct){const e=this._alignIsoDist(d,o.pivotPct,l),t=this._alignIsoDist(p,o.pivotPct,l);e>1e-6&&(u=scaleSeatAbout(o.startSeat,t/e,o.pivotPct,l))}else if("rotate"===o.kind&&o.pivotPct){const e=this._alignIsoAngleDeg(o.pivotPct,d,l),t=this._alignIsoAngleDeg(o.pivotPct,p,l);u=rotateSeatAbout(o.startSeat,t-e,o.pivotPct,l)}u&&(this._floorplanSession={...t,draft:u})}_floorGeoGestureEnd(e){const t=this._floorGesture;t&&(t.startPos.delete(e.pointerId),t.livePos.delete(e.pointerId),0===t.startPos.size&&(this._floorGesture=null))}_floorGeoPushHistory(e){const t=this._floorplanSession;t&&(this._floorplanSession={...t,history:[...t.history,e],future:[]})}_floorGeoUndo(){const e=this._floorplanSession;if(!e||!e.history.length)return;const t=e.history[e.history.length-1];this._floorplanSession={...e,draft:t,history:e.history.slice(0,-1),future:[e.draft,...e.future]}}_floorGeoRedo(){const e=this._floorplanSession;if(!e||!e.future.length)return;const t=e.future[0];this._floorplanSession={...e,draft:t,history:[...e.history,e.draft],future:e.future.slice(1)}}_floorGeoSetField(e,t){const o=this._floorplanSession;if(!o)return;const s=parseFloat(t);if(!Number.isFinite(s))return;const l=o.draft;if(l[e]===s)return;const h={...l,[e]:s};this._floorplanSession={...o,draft:h,history:[...o.history,l],future:[]}}_recropOldCrop(e){const t=e.rest?.crop_box;return t?.frame_id&&null!=t.x0&&null!=t.y0&&null!=t.x1&&null!=t.y1?{frame_id:t.frame_id,x0:t.x0,y0:t.y0,x1:t.x1,y1:t.y1}:null}_recropEligible(e){return!!this._recropOldCrop(e)}_recropGhostVacuums(){return this._config.vacuums.filter(e=>this._homeFrameCropFor(e))}_recropHasChanges(){const e=this._recropDraft;return 0!==e.offset_x||0!==e.offset_y||100!==e.scale}_recropReset(){(this._recropHasChanges()||this._recropHistory.length||this._recropFuture.length)&&(this._recropHistory=[...this._recropHistory,this._recropDraft],this._recropFuture=[],this._recropDraft={rotation:0,scale:100,offset_x:0,offset_y:0})}async _recropCopyYaml(){const e=this._floorplanSession,t=e?this._recropOldCrop(e):null;if(!t)return;const o=recropFromGesture(t,this._recropDraft);if(o)try{await navigator.clipboard.writeText(function cropBoxToYaml(e){const r=e=>Math.round(e);return["image_base:","  crop_box:",`    frame_id: "${e.frame_id}"`,`    x0: ${r(e.x0)}`,`    y0: ${r(e.y0)}`,`    x1: ${r(e.x1)}`,`    y1: ${r(e.y1)}`].join("\n")}({...o,frame_id:t.frame_id})),this._floorplanCopiedFlash=!0,setTimeout(()=>{this._floorplanCopiedFlash=!1},1500)}catch(e){console.warn("[anyvac-card] Re-crop: clipboard write failed",e)}}async _recropSave(){const e=this._floorplanSession;if(!e||!this._alignServiceAvailable())return;const t=this._recropOldCrop(e);if(!t)return;const o=recropFromGesture(t,this._recropDraft);if(!o)return;const s=e.draft,l={...e.rest,crop_box:{frame_id:t.frame_id,x0:Math.round(o.x0),y0:Math.round(o.y0),x1:Math.round(o.x1),y1:Math.round(o.y1)},src:e.floorplan,rotation:Math.round(100*s.rotation)/100,scale:Math.round(100*s.scale)/100,offset_x:Math.round(100*s.offset_x)/100,offset_y:Math.round(100*s.offset_y)/100},h=this._floorplanSeatsRaw()?.[e.floorplanKey],d={floorplan:e.floorplanKey,image_base:l};h?.room_style&&(d.room_style=h.room_style);try{await this.hass.callService("anyvac","set_floorplan_seat",d),this._closeAlign()}catch(e){console.warn("[anyvac-card] Re-crop: set_floorplan_seat call failed",e)}}_recropStartGesture(e,t,o){this._alignRefocusOverlay(),e.currentTarget.setPointerCapture(e.pointerId),e.stopPropagation(),e.preventDefault();const s=this._alignPointToWrapPct(e.clientX,e.clientY);s&&(this._recropHistory=[...this._recropHistory,this._recropDraft],this._recropFuture=[],this._recropGesture={kind:t,startSeat:{...this._recropDraft},pivotPct:o,startPos:new Map([[e.pointerId,s]]),livePos:new Map([[e.pointerId,s]])})}_recropGestureMove(e){const t=this._recropGesture;if(!t||!t.startPos.has(e.pointerId))return;const o=this._alignPointToWrapPct(e.clientX,e.clientY);if(!o)return;t.livePos.set(e.pointerId,o);const s=this._mapAR>.1?this._mapAR:3.636,l=e.pointerId,h=t.startPos.get(l),d=t.livePos.get(l);let p=null;if("drag"===t.kind)p=translateSeat(t.startSeat,d.x-h.x,d.y-h.y);else if("scale"===t.kind&&t.pivotPct){const e=this._alignIsoDist(h,t.pivotPct,s),o=this._alignIsoDist(d,t.pivotPct,s);e>1e-6&&(p=scaleSeatAbout(t.startSeat,o/e,t.pivotPct,s))}p&&(this._recropDraft=p)}_recropGestureEnd(e){const t=this._recropGesture;t&&(t.startPos.delete(e.pointerId),t.livePos.delete(e.pointerId),0===t.startPos.size&&(this._recropGesture=null))}_recropUndo(){if(!this._recropHistory.length)return;const e=this._recropHistory[this._recropHistory.length-1];this._recropFuture=[this._recropDraft,...this._recropFuture],this._recropHistory=this._recropHistory.slice(0,-1),this._recropDraft=e}_recropRedo(){if(!this._recropFuture.length)return;const e=this._recropFuture[0];this._recropHistory=[...this._recropHistory,this._recropDraft],this._recropFuture=this._recropFuture.slice(1),this._recropDraft=e}_recropSetField(e,t){const o=parseFloat(t);if(!Number.isFinite(o))return;const s=this._recropDraft;s[e]!==o&&(this._recropHistory=[...this._recropHistory,s],this._recropFuture=[],this._recropDraft={...s,[e]:o})}_setFloorplanMode(e){"calib"===e&&this._alignReadOnly()||(this._floorplanMode=e,"calib"!==e||this._floorCalib||(this._floorCalib={phase:"raw",rawPts:[],floorPts:[]},this._floorCalibResult=null,this._floorCalibError=""))}_floorCalibCancel(){this._floorCalib=null,this._floorCalibRefNat=null,this._floorCalibResult=null,this._floorCalibError="",this._floorplanMode="geo"}_floorCalibRawClick(e){const t=this._floorCalib;if(!t||"raw"!==t.phase||!this._floorCalibRefNat||t.rawPts.length>=6)return;const o=e.currentTarget.getBoundingClientRect(),s=(e.clientX-o.left)/o.width,l=(e.clientY-o.top)/o.height,h={x:s*this._floorCalibRefNat.w,y:l*this._floorCalibRefNat.h};this._floorCalib={...t,rawPts:[...t.rawPts,h],phase:"floor"}}_floorCalibFloorClick(e){const t=this._floorCalib;if(!t||"floor"!==t.phase)return;const o=this._alignPointToWrapPct(e.clientX,e.clientY);if(!o)return;const s=round1(clampPct(o.x)),l=round1(clampPct(o.y));this._floorCalib={...t,floorPts:[...t.floorPts,{x:s,y:l}],phase:"raw"}}_floorCalibUndoPoint(){const e=this._floorCalib;e&&("floor"===e.phase&&e.rawPts.length>e.floorPts.length?this._floorCalib={...e,rawPts:e.rawPts.slice(0,-1),phase:"raw"}:e.floorPts.length>0&&(this._floorCalib={...e,floorPts:e.floorPts.slice(0,-1)}))}_floorCalibPreview(e){const t=Math.min(e.rawPts.length,e.floorPts.length);if(t<2||!this._floorCalibRefNat)return null;const o=this._mapAR>.1?this._mapAR:3.636,s=computeSeatFit(buildCalibrationAnchors(e.rawPts.slice(0,t),e.floorPts.slice(0,t),{NW:this._floorCalibRefNat.w,NH:this._floorCalibRefNat.h},o),o);return s?{residual_pct:Math.round(10*s.residual_pct)/10}:null}async _floorCalibSave(){const e=this._floorCalib,t=this._alignSession,o=this._alignVac();if(!e||!t||!o||!this._alignServiceAvailable()||this._alignReadOnly())return;const s=Math.min(e.rawPts.length,e.floorPts.length);if(!this._floorCalibRefNat||s<2)return void(this._floorCalibError="Need at least 2 complete point pairs — try again.");const l=this._mapAR>.1?this._mapAR:3.636,h=computeSeatFit(buildCalibrationAnchors(e.rawPts.slice(0,s),e.floorPts.slice(0,s),{NW:this._floorCalibRefNat.w,NH:this._floorCalibRefNat.h},l),l);if(!h)return void(this._floorCalibError="Couldn't compute a calibration from those points — make sure they're clearly apart, then try again.");this._floorCalibError="";const d={rotation:h.rotation,scale:Math.round(10*h.scale)/10,offset_x:Math.round(10*h.offset_x)/10,offset_y:Math.round(10*h.offset_y)/10},p={...t.appearanceDraft};try{await this.hass.callService("anyvac","set_floorplan_seat",{floorplan:t.floorplanKey,vacuum:o.entity,map:d,appearance:p}),this._closeAlign()}catch(e){console.warn("[anyvac-card] Floorplan calibration: set_floorplan_seat call failed",e)}}_homeCalibEligible(e){const t=e.rest?.crop_box;return(!t||!("frame_id"in t))&&!!this._anyHomeFrameCard()}_homeCalibServiceAvailable(){return!!this.hass.services?.anyvac?.snapshot_map_as_floorplan&&!!this.hass.services?.anyvac?.snap_wall_corner}_fiducialServiceAvailable(){return!!this.hass.services?.anyvac?.snapshot_map_as_floorplan&&!!this.hass.services?.anyvac?.detect_floorplan_fiducials}async _saveHomeAnchors(e,t){const o=this._floorplanSession;if(!o||!this._alignServiceAvailable())return!1;const s=o.draft,l={...o.rest,src:o.floorplan,rotation:Math.round(100*s.rotation)/100,scale:Math.round(100*s.scale)/100,offset_x:Math.round(100*s.offset_x)/100,offset_y:Math.round(100*s.offset_y)/100,home_anchors:e,home_anchors_frame_id:t},h=this._floorplanSeatsRaw()?.[o.floorplanKey],d={floorplan:o.floorplanKey,image_base:l};h?.room_style&&(d.room_style=h.room_style);try{return await this.hass.callService("anyvac","set_floorplan_seat",d),!0}catch(e){return console.warn("[anyvac-card] Home calibration: set_floorplan_seat call failed",e),!1}}async _clearHomeAnchors(){const e=this._floorplanSession;if(!e||!this._alignServiceAvailable())return;const{home_anchors:t,home_anchors_frame_id:o,...s}=e.rest,l=e.draft,h={...s,src:e.floorplan,rotation:Math.round(100*l.rotation)/100,scale:Math.round(100*l.scale)/100,offset_x:Math.round(100*l.offset_x)/100,offset_y:Math.round(100*l.offset_y)/100},d=this._floorplanSeatsRaw()?.[e.floorplanKey],p={floorplan:e.floorplanKey,image_base:h};d?.room_style&&(p.room_style=d.room_style);try{await this.hass.callService("anyvac","set_floorplan_seat",p),this._floorplanSession={...e,rest:s},this._homeCalibResult=null}catch(e){console.warn("[anyvac-card] Home calibration: clear failed",e)}}async _hideMapCascade(e){const t=this._floorplanSeatsRaw();for(const o of this._config.vacuums??[]){const s=t?.[e]?.vacuums?.[o.entity]?.map,l={...effectiveAppearance(o),hide_map:!0},h={floorplan:e,vacuum:o.entity,appearance:l};s&&(h.map=s);try{await this.hass.callService("anyvac","set_floorplan_seat",h)}catch(e){console.warn(`[anyvac-card] Home calibration: hide_map cascade failed for ${o.entity}`,e)}}}async _startHomeCalibration(){const e=this._floorplanSession;if(e&&this._homeCalibEligible(e)&&this._homeCalibServiceAvailable()){this._homeCalibError="",this._homeCalibResult=null,this._homeCalibBusy=!0;try{const e=await this.hass.callService("anyvac","snapshot_map_as_floorplan",{frame:"home",name:"home_frame_calib"},void 0,!1,!0),t=e?.response?.path,o=e?.response?.frame_id,s=e?.response?.crop;if(!t||!o||!s)throw new Error("incomplete response — integration too old?");this._homeCalibSnapshotUrl=t,this._homeCalibCrop=s,this._homeCalibFrameId=o,this._homeCalib={phase:"frame",homePts:[],floorPts:[]}}catch(e){this._homeCalibError="Couldn't snapshot the home frame for calibration — make sure at least one vacuum has a home-frame registration and the anyvac integration is at least 1.9.0, then try again.",console.warn("[anyvac-card] Home calibration: snapshot_map_as_floorplan failed",e)}finally{this._homeCalibBusy=!1}}}_cancelHomeCalibration(){this._homeCalib=null,this._homeCalibSnapshotUrl="",this._homeCalibCrop=null,this._homeCalibFrameId="",this._homeCalibError=""}async _onHomeCalibFrameClick(e){const t=this._homeCalib,o=this._homeCalibCrop;if(!t||"frame"!==t.phase||!o||t.homePts.length>=6||this._homeCalibBusy)return;const s=e.currentTarget.getBoundingClientRect(),l=pctToCropPoint({x:(e.clientX-s.left)/s.width*100,y:(e.clientY-s.top)/s.height*100},o);if(l){this._homeCalibBusy=!0;try{const e=await this.hass.callService("anyvac","snap_wall_corner",{frame_id:this._homeCalibFrameId,x_home_px:l.x,y_home_px:l.y},void 0,!1,!0),o=e?.response?.x_home_px??l.x,s=e?.response?.y_home_px??l.y;this._homeCalib={...t,homePts:[...t.homePts,{x:o,y:s}],phase:"floor"}}catch(e){this._homeCalib={...t,homePts:[...t.homePts,l],phase:"floor"},console.warn("[anyvac-card] Home calibration: snap_wall_corner failed, using unsnapped click",e)}finally{this._homeCalibBusy=!1}}}_onHomeCalibFloorClick(e){const t=this._homeCalib;if(!t||"floor"!==t.phase)return;const o=this._alignPointToWrapPct(e.clientX,e.clientY);if(!o)return;const s=round1(clampPct(o.x)),l=round1(clampPct(o.y));this._homeCalib={...t,floorPts:[...t.floorPts,{x:s,y:l}],phase:"frame"}}_undoHomeCalibPoint(){const e=this._homeCalib;e&&("floor"===e.phase&&e.homePts.length>e.floorPts.length?this._homeCalib={...e,homePts:e.homePts.slice(0,-1),phase:"frame"}:e.floorPts.length>0&&(this._homeCalib={...e,floorPts:e.floorPts.slice(0,-1)}))}_homeCalibPreview(e){const t=Math.min(e.homePts.length,e.floorPts.length),o=this._anyHomeFrameCard();if(t<2||!o)return null;const s=e.homePts.slice(0,t).map((t,o)=>({home_px:t,floor_pct:e.floorPts[o]})),l=this._mapAR>.1?this._mapAR:3.636,h=homeAnchorFit(s,{NW:o.w,NH:o.h},l);return h?{residual_pct:Math.round(10*h.residual_pct)/10}:null}async _finishHomeCalibration(){const e=this._homeCalib,t=this._floorplanSession;if(!e||!t)return;const o=Math.min(e.homePts.length,e.floorPts.length);if(o<2)return void(this._homeCalibError="Need at least 2 complete point pairs — try again.");const s=this._anyHomeFrameCard();if(!s)return void(this._homeCalibError="No home frame available anymore — try again.");const l=e.homePts.slice(0,o).map((t,o)=>({home_px:t,floor_pct:e.floorPts[o]})),h=this._mapAR>.1?this._mapAR:3.636,d=homeAnchorFit(l,{NW:s.w,NH:s.h},h);if(!d)return void(this._homeCalibError="Couldn't compute a calibration from those points — make sure they're clearly apart, then try again.");await this._saveHomeAnchors(l,s.id)?(await this._hideMapCascade(t.floorplanKey),this._homeCalib=null,this._homeCalibSnapshotUrl="",this._homeCalibCrop=null,this._homeCalibFrameId="",this._homeCalibError="",this._homeCalibResult={residual_pct:Math.round(10*d.residual_pct)/10}):this._homeCalibError="Couldn't save the calibration — try again."}async _snapshotHomeFrameWithFiducials(){if(this._fiducialServiceAvailable()){this._fiducialSnapshotBusy=!0,this._fiducialSnapshotError="",this._fiducialDetectResult=null;try{const e=await this.hass.callService("anyvac","snapshot_map_as_floorplan",{frame:"home",name:"home_frame_fiducial",fiducials:!0},void 0,!1,!0),t=e?.response?.path,o=e?.response?.frame_id,s=e?.response?.fiducials;if(!t||!o||!s?.length)throw new Error("incomplete response — integration too old?");this._fiducialKnown={frameId:o,markers:s},this._fiducialSnapshotPath=t}catch(e){this._fiducialSnapshotError="Couldn't snapshot the home frame with markers — requires anyvac integration ≥ 1.9.0 with at least one registered vacuum.",console.warn("[anyvac-card] Fiducials: snapshot_map_as_floorplan failed",e)}finally{this._fiducialSnapshotBusy=!1}}}async _detectFiducials(){const e=this._fiducialKnown,t=this._floorplanSession,o=this._floorplanCardImageBase()?.src??t?.floorplan;if(e&&t&&o){this._fiducialDetectBusy=!0,this._fiducialDetectError="",this._fiducialDetectResult=null;try{const s=await this.hass.callService("anyvac","detect_floorplan_fiducials",{path:o,fiducials:e.markers},void 0,!1,!0),l=s?.response?.home_anchors;if(!l?.length)throw new Error("no markers detected");if(!await this._saveHomeAnchors(l,e.frameId))throw new Error("couldn't save the detected anchors");await this._hideMapCascade(t.floorplanKey),this._fiducialDetectResult={found:s?.response?.found??l.length,missing:s?.response?.missing??[]}}catch(e){this._fiducialDetectError="Couldn't detect markers — make sure the file above still has its alpha channel (stayed PNG, wasn't flattened/re-exported as JPEG) and at least 2 of the 4 corners survived the crop.",console.warn("[anyvac-card] Fiducials: detect_floorplan_fiducials failed",e)}finally{this._fiducialDetectBusy=!1}}}_floorplanSnapshotServiceAvailable(){return!!this.hass.services?.anyvac?.snapshot_map_as_floorplan&&this._alignServiceAvailable()}_guideExportServiceAvailable(){return!!this.hass.services?.anyvac?.export_map_guide}async _snapshotMapAsFloorplan(){const e=this._alignSession,t=this._floorplanSession,o=this._alignVac();if(!(e&&t&&o&&"merged"===this._config.map_mode&&this._floorplanSnapshotServiceAvailable()))return;const s=this._mapEntityFor(o);if(s){this._floorplanSnapshotBusy=!0,this._floorplanSnapshotError="",this._placeRoomsResult=null;try{const l=await this.hass.callService("anyvac","snapshot_map_as_floorplan",{image_entity:s,name:o.name||o.entity},void 0,!1,!0),h=l?.response?.path;if(!h)throw new Error("no path in service response");const d=l?.response?.crop,p=t.draft,u={...t.rest,src:h,rotation:Math.round(100*p.rotation)/100,scale:Math.round(100*p.scale)/100,offset_x:Math.round(100*p.offset_x)/100,offset_y:Math.round(100*p.offset_y)/100,...d?{crop_box:{entity:o.entity,...d}}:{}},m={};let _=0,f=0;if(d){const e=this._intAttrs(o),t=Array.isArray(e?.rooms)?e.rooms:[],s=new Map((this._config.rooms??[]).map(e=>[e.key,e]));for(const e of t){const t=e?.name,o=e?.bbox_px;if(!t||!o)continue;const l=placeRoomInCrop(o,d);l&&(m[t]={...l,area_id:s.get(t)?.area_id??null},s.has(t)?_++:f++)}}const v=this._floorplanSeatsRaw()?.[e.floorplanKey],b={floorplan:e.floorplanKey,image_base:u};Object.keys(m).length&&(b.rooms=m),v?.room_style&&(b.room_style=v.room_style),await this.hass.callService("anyvac","set_floorplan_seat",b),this._alignSession={...e,floorplan:h},this._roomsSession&&(this._roomsSession={...this._roomsSession,floorplan:h});const{src:w,rotation:$,scale:C,offset_x:A,offset_y:P,...F}=u;this._floorplanSession={...t,floorplan:h,rest:F},d&&(this._placeRoomsResult={placed:_,added:f}),await this._hideMapCascade(e.floorplanKey)}catch(e){this._floorplanSnapshotError="Couldn't snapshot this vacuum's map — make sure the anyvac integration is updated to at least 0.88.0, then try again.",console.warn("[anyvac-card] Floorplan: snapshot_map_as_floorplan failed",e)}finally{this._floorplanSnapshotBusy=!1}}}async _snapshotHomeFrameAsFloorplan(){const e=this._alignSession,t=this._floorplanSession;if(e&&t&&"merged"===this._config.map_mode&&this._floorplanSnapshotServiceAvailable()){this._homeFrameSnapshotBusy=!0,this._homeFrameSnapshotError="";try{const o=await this.hass.callService("anyvac","snapshot_map_as_floorplan",{frame:"home",name:"home_frame"},void 0,!1,!0),s=o?.response?.path,l=o?.response?.frame_id,h=o?.response?.crop;if(!s||!l||!h)throw new Error("incomplete response — integration too old?");const d=t.draft,p={...t.rest,src:s,crop_box:{frame_id:l,...h},rotation:Math.round(100*d.rotation)/100,scale:Math.round(100*d.scale)/100,offset_x:Math.round(100*d.offset_x)/100,offset_y:Math.round(100*d.offset_y)/100},u=this._floorplanSeatsRaw()?.[e.floorplanKey],m={floorplan:e.floorplanKey,image_base:p};u?.room_style&&(m.room_style=u.room_style),await this.hass.callService("anyvac","set_floorplan_seat",m),this._alignSession={...e,floorplan:s},this._roomsSession&&(this._roomsSession={...this._roomsSession,floorplan:s});const{src:_,rotation:f,scale:v,offset_x:b,offset_y:w,...$}=p;this._floorplanSession={...t,floorplan:s,rest:$},await this._hideMapCascade(e.floorplanKey)}catch(e){this._homeFrameSnapshotError="Couldn't snapshot the home frame — make sure at least two vacuums have a home-frame registration (integration ≥ 1.8.0, check the 'registration' sensor attribute), then try again.",console.warn("[anyvac-card] Floorplan: snapshot_map_as_floorplan (frame: home) failed",e)}finally{this._homeFrameSnapshotBusy=!1}}}async _exportGuideLayers(){const e=this._floorplanSession,t=this._alignVac();if(!e||!t||!this._guideExportServiceAvailable())return;const o=this._mapEntityFor(t);if(!o)return;this._guideExportBusy=!0,this._guideExportError="",this._guideExportResult=null;const s=e.rest?.crop_box,l=s&&s.entity===t.entity?{x0:s.x0,y0:s.y0,x1:s.x1,y1:s.y1}:void 0;try{const e={image_entity:o,name:t.name||t.entity};l&&(e.crop=l);const s=await this.hass.callService("anyvac","export_map_guide",e,void 0,!1,!0),h=s?.response?.paths,d=s?.response?.size;if(!h||!d||!Object.keys(h).length)throw new Error("no guide layers in service response");this._guideExportResult={paths:h,size:d}}catch(e){this._guideExportError="Couldn't export guide layers — make sure the anyvac integration is updated to at least 1.4.0, then try again.",console.warn("[anyvac-card] Floorplan: export_map_guide failed",e)}finally{this._guideExportBusy=!1}}_renderVisualEditor(){const e=this._alignSession;if(!e)return De;const t=this._alignVac();if(!t)return De;const o=this._alignCandidates(this._config.vacuums),s=this._alignReadOnly(),l=!s&&this._alignServiceAvailable(),h=e.history.length>0,d=e.future.length>0,p=this._roomsSession,u=!!p&&p.history.length>0,m=!!p&&p.future.length>0,_=!!p&&this._alignServiceAvailable(),f=this._floorplanSession,v=!!f&&this._recropEligible(f),b=v?this._recropHistory.length>0:!!f&&f.history.length>0,w=v?this._recropFuture.length>0:!!f&&f.future.length>0,$=!!f&&this._alignServiceAvailable(),C=this._floorCalib,A=C?Math.min(C.rawPts.length,C.floorPts.length):0,P=A>=2&&this._alignServiceAvailable()&&!this._alignReadOnly(),F=this._homeCalib,E=F?Math.min(F.homePts.length,F.floorPts.length):0,T=!!F&&E>=2&&this._alignServiceAvailable(),O=e.nudgeTier,tierBtn=(e,t,o)=>Ee`
      <button class="align-tier-btn ${O===e?"on":""}" title=${o}
        @click=${()=>this._alignSetNudgeTier(e)}>${t}</button>`,toolTab=(e,t)=>Ee`
      <button class="ve-tool-tab ${this._veTool===e?"on":""}"
        @click=${()=>this._setVeTool(e)}>${t}</button>`;return Ee`
      <div class="align-overlay ${this._rootClasses()}" tabindex="0" @keydown=${e=>this._alignKeyDown(e)}>
        <div class="align-toolbar">
          <div class="align-toolbar-title">
            <ha-icon icon="mdi:vector-square-edit"></ha-icon>
            <span>Visual editor — ${t.name??t.entity}</span>
          </div>
          ${o.length>1?Ee`<div class="align-vac-picker">
            ${o.map(e=>Ee`
              <button class="align-vac-chip ${e.entity===t.entity?"on":""}"
                @click=${()=>{const t=this._veTool;this._closeAlign(),this._openAlign(e),this._veTool=t,"rooms"===t&&this._openRooms(),"floorplan"===t&&this._openFloorplan()}}>
                ${e.name??e.entity}
              </button>
            `)}
          </div>`:De}
          <div class="align-toolbar-spacer"></div>
          ${"seat"===this._veTool?Ee`
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
          `:De}
          ${"rooms"===this._veTool?Ee`
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
          `:De}
          ${"floorplan"===this._veTool&&f&&"geo"===this._floorplanMode?Ee`
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
          `:De}
          ${"floorplan"===this._veTool&&f&&"calib"===this._floorplanMode?Ee`
            <button class="align-btn" title="Rotate view 90°" @click=${()=>this._alignRotateView()}>
              <ha-icon icon="mdi:screen-rotation"></ha-icon>
            </button>
          `:De}
          ${"floorplan"===this._veTool&&f&&"home"===this._floorplanMode?Ee`
            <button class="align-btn" title="Rotate view 90°" @click=${()=>this._alignRotateView()}>
              <ha-icon icon="mdi:screen-rotation"></ha-icon>
            </button>
          `:De}
          <button class="align-btn align-close-btn" title="Cancel" @click=${()=>this._alignCancel()}>
            <ha-icon icon="mdi:close"></ha-icon>
          </button>
          ${"seat"===this._veTool?Ee`
            <button class="align-btn align-save-btn" ?disabled=${!l}
              title=${l?"Save":s?"Read-only — aligned by home frame":"Update the AnyVac integration to 2.0.0 — or Copy YAML"}
              @click=${()=>this._alignSave()}>
              <ha-icon icon="mdi:content-save"></ha-icon><span>Save</span>
            </button>
          `:De}
          ${"rooms"===this._veTool?Ee`
            <button class="align-btn align-save-btn" ?disabled=${!_}
              title=${_?"Save":"Update the AnyVac integration to 2.0.0 — or Copy YAML"}
              @click=${()=>this._roomsSave()}>
              <ha-icon icon="mdi:content-save"></ha-icon><span>Save</span>
            </button>
          `:De}
          ${"floorplan"===this._veTool&&f&&"geo"===this._floorplanMode?Ee`
            <button class="align-btn align-save-btn" ?disabled=${!$}
              title=${$?"Save":"Update the AnyVac integration to 2.0.0 — or Copy YAML"}
              @click=${()=>v?this._recropSave():this._floorplanSave()}>
              <ha-icon icon="mdi:content-save"></ha-icon><span>Save</span>
            </button>
          `:De}
          ${"floorplan"===this._veTool&&f&&"calib"===this._floorplanMode?Ee`
            <button class="align-btn align-save-btn" ?disabled=${!P}
              title=${P?"Save calibrated seat":this._alignReadOnly()?"Read-only — aligned by home frame":A<2?"Click at least 2 point pairs first":"Update the AnyVac integration to 2.0.0"}
              @click=${()=>this._floorCalibSave()}>
              <ha-icon icon="mdi:content-save"></ha-icon><span>Save</span>
            </button>
          `:De}
          ${"floorplan"===this._veTool&&f&&"home"===this._floorplanMode&&this._homeCalib?Ee`
            <button class="align-btn align-save-btn" ?disabled=${!T}
              title=${T?"Save calibration":E<2?"Click at least 2 point pairs first":"Update the AnyVac integration to 2.0.0"}
              @click=${()=>this._finishHomeCalibration()}>
              <ha-icon icon="mdi:content-save"></ha-icon><span>Save</span>
            </button>
          `:De}
        </div>
        <div class="ve-tool-row">
          ${toolTab("seat","Seat & Appearance")}
          ${toolTab("rooms","Rooms")}
          ${toolTab("floorplan","Floorplan & Calibrate")}
        </div>
        ${"seat"===this._veTool?this._renderSeatTool(e,t):"rooms"===this._veTool?this._renderRoomsTool(e,t):f?this._renderFloorplanTool(f):this._renderVePlaceholder("merged"!==this._config.map_mode?"Only available for a shared (merged-mode) floorplan right now — this config's own per-vacuum image_base stays editable from the Config editor's Vacuums tab → Map & floorplan section.":"No card-level floorplan image to edit — set one from the Config editor's Global tab → Floorplan section first.")}
        ${this._alignCancelConfirm?Ee`
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
        `:De}
      </div>
    `}_renderSeatTool(e,t){const{w:o,h:s}=this._alignSceneSize(),l=this._config.vacuums.filter(o=>o.entity!==t.entity&&resolveImageBaseSrc(this._config,o)===e.floorplan&&this._intAttrs(o)),h=this._config.image_base?.src===e.floorplan?this._config.image_base:this._config.vacuums.find(t=>t.image_base?.src===e.floorplan)?.image_base??t.image_base,d=this._mapEntityFor(t),p=d?this._mapUrl(d):null,u=e.draft,m=e.appearanceDraft,_={...t,...m,path_color:m.path_color??void 0,mop_path_color:m.mop_path_color??void 0},corner=(e,t)=>this._alignCornerPct(u,e,t,o,s),f=corner(0,0),v=corner(1,0),b=corner(0,1),w=corner(1,1),$=corner(.5,0),C=corner(.5,1),A=corner(0,.5),P=corner(1,.5),F={x:50+u.offset_x,y:50+u.offset_y},E=this._alignCornerPct(u,.5,-.18,o,s),T=this._alignReadOnly();return Ee`
        <div class="align-body">
          <div class="align-canvas"
            @wheel=${e=>this._alignWheel(e)}
            @pointerdown=${e=>this._alignBgPointerDown(e)}
            @pointermove=${e=>this._alignBgPointerMove(e)}
            @pointerup=${e=>this._alignBgPointerUp(e)}
            @pointercancel=${e=>this._alignBgPointerUp(e)}>
            <div class="align-scene" style=${Ue({width:o+"px",height:s+"px",transform:this._alignViewTransformCss()})}>
              ${h?.src?Ee`<img class="align-floorplan-img" src=${h.src} alt="Floorplan"
                  @load=${this._onFloorplanLoad}
                  style=${Ue({opacity:String(e.layers.floor),transform:"translate("+(h.offset_x??0)+"%,"+(h.offset_y??0)+"%) rotate("+(h.rotation??0)+"deg) scale("+(h.scale??100)/100+")"})} />`:De}
              ${l.map(e=>{const t=this._mapEntityFor(e),o=t?this._mapUrl(t):null,s=this._effectiveSeat(e);return Ee`
                  <div class="align-ghost">
                    ${o?Ee`<img class="align-seat-img" src=${o} alt=""
                        style=${Ue({left:50+s.offset_x+"%",top:50+s.offset_y+"%",width:s.scale+"%",transform:"translate(-50%,-50%) "+seatRotateScaleCss(s.rotation,s.scale,s.scaleY)})} />`:De}
                    ${this._renderIntegrationOverlay(e,s,"both")}
                  </div>`})}
              <div class="align-seat-layer ${T?"align-seat-layer--readonly":""}"
                @pointerdown=${e=>this._alignStartGesture(e,"drag")}
                @pointermove=${e=>this._alignGestureMove(e)}
                @pointerup=${e=>this._alignGestureEnd(e)}
                @pointercancel=${e=>this._alignGestureEnd(e)}>
                ${p?Ee`<img class="align-seat-img" src=${p} alt="Vacuum map"
                    style=${Ue({opacity:String(e.layers.rawMap),left:50+u.offset_x+"%",top:50+u.offset_y+"%",width:u.scale+"%",transform:"translate(-50%,-50%) "+seatRotateScaleCss(u.rotation,u.scale,u.scaleY)})} />`:De}
                ${this._renderIntegrationOverlay(_,u,"both")}
              </div>
              ${T?Ee`
                <div class="align-readonly-note">
                  <ha-icon icon="mdi:lock-outline"></ha-icon>
                  <span>aligned by home frame — nothing to adjust</span>
                </div>
              `:Ee`
                <svg class="align-gizmo" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <line x1=${F.x} y1=${F.y} x2=${E.x} y2=${E.y} class="align-gizmo-arm" />
                  <polygon points="${f.x},${f.y} ${v.x},${v.y} ${w.x},${w.y} ${b.x},${b.y}" class="align-gizmo-box" />
                </svg>
                ${[["nw",f],["ne",v],["se",w],["sw",b]].map(([e,t])=>Ee`
                  <div class="align-handle align-handle--corner" data-corner=${e}
                    style=${Ue({left:t.x+"%",top:t.y+"%"})}
                    @pointerdown=${t=>{const o="nw"===e?w:"ne"===e?b:"se"===e?f:v;this._alignStartGesture(t,"scale",o)}}
                    @pointermove=${e=>this._alignGestureMove(e)}
                    @pointerup=${e=>this._alignGestureEnd(e)}
                    @pointercancel=${e=>this._alignGestureEnd(e)}>
                  </div>
                `)}
                ${[["n",$,"stretchY",90,"mdi:arrow-up-down"],["s",C,"stretchY",90,"mdi:arrow-up-down"],["w",A,"stretchX",0,"mdi:arrow-left-right"],["e",P,"stretchX",0,"mdi:arrow-left-right"]].map(([e,t,o,s,l])=>Ee`
                  <div class="align-handle align-handle--side align-handle--${e}" data-side=${e}
                    title=${"stretchX"===o?"Scale X":"Scale Y"}
                    style=${Ue({left:t.x+"%",top:t.y+"%",cursor:this._alignResizeCursor(s,u.rotation+this._alignView.rot)})}
                    @pointerdown=${e=>this._alignStartGesture(e,o)}
                    @pointermove=${e=>this._alignGestureMove(e)}
                    @pointerup=${e=>this._alignGestureEnd(e)}
                    @pointercancel=${e=>this._alignGestureEnd(e)}>
                    <ha-icon icon=${l} style=${Ue({transform:"rotate("+u.rotation+"deg)"})}></ha-icon>
                  </div>
                `)}
                <div class="align-axis-hint align-axis-hint--x" title="Offset X"
                  style=${Ue({left:F.x+7+"%",top:F.y+"%"})}>
                  <ha-icon icon="mdi:arrow-left-right"></ha-icon>
                </div>
                <div class="align-axis-hint align-axis-hint--y" title="Offset Y"
                  style=${Ue({left:F.x+"%",top:F.y-7+"%"})}>
                  <ha-icon icon="mdi:arrow-up-down"></ha-icon>
                </div>
                <div class="align-handle align-handle--rotate"
                  style=${Ue({left:E.x+"%",top:E.y+"%"})}
                  @pointerdown=${e=>this._alignStartGesture(e,"rotate",F)}
                  @pointermove=${e=>this._alignGestureMove(e)}
                  @pointerup=${e=>this._alignGestureEnd(e)}
                  @pointercancel=${e=>this._alignGestureEnd(e)}>
                  <ha-icon icon="mdi:rotate-3d-variant"></ha-icon>
                </div>
              `}
            </div>
          </div>
          <div class="align-side-panel">
            <div class="align-field-row align-field-row--opacity">
              <label>Floorplan<span>%</span></label>
              <input type="range" min="0" max="100" step="5"
                .value=${String(Math.round(100*e.layers.floor))}
                @input=${e=>this._alignSetLayerOpacity("floor",e.target.value)}
                @change=${()=>this._alignRefocusOverlay()} />
            </div>
            <div class="align-field-row align-field-row--opacity">
              <label>Vacuum map<span>%</span></label>
              <input type="range" min="0" max="100" step="5"
                .value=${String(Math.round(100*e.layers.rawMap))}
                @input=${e=>this._alignSetLayerOpacity("rawMap",e.target.value)}
                @change=${()=>this._alignRefocusOverlay()} />
            </div>
            <div class="align-field-row">
              <label>Rotation<span>°</span></label>
              <input type="number" step="0.1" .value=${String(Math.round(100*u.rotation)/100)}
                ?disabled=${T} @change=${e=>this._alignSetField("rotation",e.target.value)} />
            </div>
            <div class="align-field-row">
              <label>Scale${null!=u.scaleY?this._alignFieldArrow(!0,u.rotation+this._alignView.rot):De}<span>%</span></label>
              <input type="number" step="0.1" min="1" .value=${String(Math.round(100*u.scale)/100)}
                ?disabled=${T} @change=${e=>this._alignSetField("scale",e.target.value)} />
            </div>
            <div class="align-field-row align-field-row--check">
              <label>
                <input type="checkbox" .checked=${null!=u.scaleY} ?disabled=${T}
                  @change=${e=>this._alignToggleScaleY(e.target.checked)} />
                Independent Y scale
              </label>
            </div>
            ${null!=u.scaleY?Ee`
              <div class="align-field-row">
                <label>Scale${this._alignFieldArrow(!1,u.rotation+this._alignView.rot)}<span>%</span></label>
                <input type="number" step="0.1" min="1" .value=${String(Math.round(100*u.scaleY)/100)}
                  ?disabled=${T} @change=${e=>this._alignSetField("scaleY",e.target.value)} />
              </div>
            `:De}
            <div class="align-field-row">
              <label>Offset${this._alignFieldArrow(!0,this._alignView.rot)}<span>%</span></label>
              <input type="number" step="0.01" .value=${String(Math.round(1e4*u.offset_x)/1e4)}
                ?disabled=${T} @change=${e=>this._alignSetField("offset_x",e.target.value)} />
            </div>
            <div class="align-field-row">
              <label>Offset${this._alignFieldArrow(!1,this._alignView.rot)}<span>%</span></label>
              <input type="number" step="0.01" .value=${String(Math.round(1e4*u.offset_y)/1e4)}
                ?disabled=${T} @change=${e=>this._alignSetField("offset_y",e.target.value)} />
            </div>
            <div class="align-side-panel-divider"></div>
            <div class="section-title">Appearance</div>
            <div class="align-field-row align-field-row--check">
              <label>
                <input type="checkbox" .checked=${!!m.hide_map} ?disabled=${T}
                  @change=${e=>this._alignSetAppearanceField("hide_map",e.target.checked)} />
                Hide vacuum map (show only floorplan + robot/path)
              </label>
            </div>
            <div class="align-field-row align-field-row--opacity">
              <label>Overlay opacity<span>%</span></label>
              <input type="range" min="0" max="100" step="5"
                ?disabled=${T} .value=${String(m.overlay_opacity??55)}
                @input=${e=>this._alignSetAppearanceField("overlay_opacity",Number(e.target.value))} />
            </div>
            <div class="align-field-row">
              <label>Overlay blend</label>
              <select ?disabled=${T} .value=${m.overlay_blend??"normal"}
                @change=${e=>this._alignSetAppearanceField("overlay_blend",e.target.value)}>
                <option value="normal">normal</option>
                <option value="lighten">lighten</option>
                <option value="screen">screen</option>
                <option value="plus-lighter">plus-lighter</option>
              </select>
            </div>
            ${this._veHexColorField("Path colour",m.path_color??void 0,T,e=>this._alignSetAppearanceField("path_color",e||null),this._color(t))}
            <div class="align-field-row align-field-row--opacity">
              <label>Path width<span>%</span></label>
              <input type="range" min="20" max="300" step="10"
                ?disabled=${T} .value=${String(m.path_width??100)}
                @input=${e=>this._alignSetAppearanceField("path_width",Number(e.target.value))} />
            </div>
            ${this._veHexColorField("Mop band colour",m.mop_path_color??void 0,T,e=>this._alignSetAppearanceField("mop_path_color",e||null),"#40a9ff")}
            <div class="align-field-row align-field-row--opacity">
              <label>Mop band opacity<span>%</span></label>
              <input type="range" min="0" max="100" step="5"
                ?disabled=${T} .value=${String(m.mop_band_opacity??28)}
                @input=${e=>this._alignSetAppearanceField("mop_band_opacity",Number(e.target.value))} />
            </div>
            <div class="align-field-row align-field-row--opacity">
              <label>Mop band width<span>%</span></label>
              <input type="range" min="20" max="400" step="10"
                ?disabled=${T} .value=${String(m.mop_band_width??100)}
                @input=${e=>this._alignSetAppearanceField("mop_band_width",Number(e.target.value))} />
            </div>
            ${t.image?Ee`
              <div class="align-field-row align-field-row--check">
                <label>
                  <input type="checkbox" .checked=${!!m.robot_image_on_map} ?disabled=${T}
                    @change=${e=>this._alignSetAppearanceField("robot_image_on_map",e.target.checked)} />
                  Robot image on map (uses status image)
                </label>
              </div>
              ${m.robot_image_on_map?Ee`
                <div class="align-field-row align-field-row--opacity">
                  <label>Robot image size<span>%</span></label>
                  <input type="range" min="40" max="220" step="10"
                    ?disabled=${T} .value=${String(m.robot_size??100)}
                    @input=${e=>this._alignSetAppearanceField("robot_size",Number(e.target.value))} />
                </div>
                <div class="align-field-row align-field-row--opacity">
                  <label>Robot image rotation<span>°</span></label>
                  <input type="range" min="-180" max="180" step="15"
                    ?disabled=${T} .value=${String(m.robot_image_rotation??0)}
                    @input=${e=>this._alignSetAppearanceField("robot_image_rotation",Number(e.target.value))} />
                </div>
              `:De}
            `:De}
          </div>
        </div>
    `}_renderRoomsTool(e,t){const{w:o,h:s}=this._alignSceneSize(),l=this._roomsSession;if(!l)return Ee`<div class="align-body"></div>`;const h=this._config.image_base?.src===e.floorplan?this._config.image_base:this._config.vacuums.find(t=>t.image_base?.src===e.floorplan)?.image_base??t.image_base,d=l.styleDraft,p=Object.values(this.hass?.areas??{}),u=l.selected,m=u?l.rooms[u]:void 0,_=this._roomsDrawGesture;return Ee`
        <div class="align-body">
          <div class="align-canvas"
            @wheel=${e=>this._alignWheel(e)}
            @pointerdown=${e=>this._roomsCanvasPointerDown(e)}
            @pointermove=${e=>this._roomsCanvasPointerMove(e)}
            @pointerup=${e=>this._roomsCanvasPointerUp(e)}
            @pointercancel=${e=>this._roomsCanvasPointerUp(e)}>
            <div class="align-scene ${l.drawingNew?"align-scene--drawing":""}" style=${Ue({width:o+"px",height:s+"px",transform:this._alignViewTransformCss()})}>
              ${h?.src?Ee`<img class="align-floorplan-img" src=${h.src} alt="Floorplan"
                  @load=${this._onFloorplanLoad}
                  style=${Ue({transform:"translate("+(h.offset_x??0)+"%,"+(h.offset_y??0)+"%) rotate("+(h.rotation??0)+"deg) scale("+(h.scale??100)/100+")"})} />`:De}
              ${Object.entries(l.rooms).map(([e,t])=>{const o=e===u;return Ee`
                  <div class="rooms-rect ${o?"rooms-rect--selected":""}"
                    style=${Ue({left:t.x+"%",top:t.y+"%",width:t.w+"%",height:t.h+"%",borderWidth:(o?d.border_selected:d.border_normal)+"px"})}
                    @pointerdown=${t=>this._roomsStartGesture(t,e,"move")}
                    @pointermove=${e=>this._roomsGestureMove(e)}
                    @pointerup=${()=>this._roomsGestureEnd()}
                    @pointercancel=${()=>this._roomsGestureEnd()}>
                    <span class="rooms-rect-label">${e}</span>
                    ${o?["nw","ne","sw","se"].map(t=>Ee`
                      <div class="align-handle align-handle--corner rooms-handle--${t}"
                        @pointerdown=${o=>this._roomsStartGesture(o,e,"resize",t)}
                        @pointermove=${e=>this._roomsGestureMove(e)}
                        @pointerup=${()=>this._roomsGestureEnd()}
                        @pointercancel=${()=>this._roomsGestureEnd()}>
                      </div>
                    `):De}
                  </div>`})}
              ${_?(()=>{const e=_.startPt,t=_.curPt??_.startPt,o=(e.x+t.x)/2,s=(e.y+t.y)/2,l=Math.abs(t.x-e.x),h=Math.abs(t.y-e.y);return Ee`<div class="rooms-rect rooms-rect--drawing"
                  style=${Ue({left:o+"%",top:s+"%",width:l+"%",height:h+"%"})}></div>`})():De}
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
                @change=${e=>this._roomsSetStyle("border_normal",e.target.value)} />
            </div>
            <div class="align-field-row">
              <label>Selected<span>px</span></label>
              <input type="number" step="0.5" min="0" max="12" .value=${String(d.border_selected)}
                @change=${e=>this._roomsSetStyle("border_selected",e.target.value)} />
            </div>
            <div class="align-side-panel-divider"></div>
            ${u&&m?Ee`
              <div class="section-title">${u}</div>
              ${m.isNew?Ee`
                <div class="align-field-row align-field-row--color">
                  <label>Key</label>
                  <input type="text" class="align-color-text" .value=${u}
                    @change=${e=>this._roomsRenameKey(u,e.target.value)} />
                </div>
              `:De}
              <div class="align-field-row align-field-row--color">
                <label>Area</label>
                <select class="align-color-text"
                  @change=${e=>this._roomsSetAreaId(u,e.target.value)}>
                  <option value="">— not mapped —</option>
                  ${[...p].sort((e,t)=>e.name.localeCompare(t.name)).map(e=>Ee`
                    <option value=${e.area_id} ?selected=${e.area_id===m.areaId}>${e.name}</option>
                  `)}
                </select>
              </div>
              ${m.isNew?Ee`
                <button class="align-btn" style="width:auto;align-self:flex-start;padding:0 10px;gap:6px"
                  @click=${()=>this._roomsRequestDelete(u)}>
                  <ha-icon icon="mdi:delete"></ha-icon><span>Delete room</span>
                </button>
              `:Ee`<div class="rooms-side-note">A config-defined room's key can't be renamed or deleted here — use the Config editor.</div>`}
            `:Ee`<div class="rooms-side-note">Click a room to select it, or "Add room" to draw a new one.</div>`}
          </div>
        </div>
        ${this._roomsDeleteConfirm?Ee`
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
        `:De}
    `}_renderFloorplanTool(e){const t=this._floorplanMode,o=this._alignReadOnly(),s=this._homeCalibEligible(e),l=this._recropEligible(e);return Ee`
      <div class="ve-subtab-row">
        <button class="ve-subtab ${"geo"===t?"on":""}"
          @click=${()=>this._setFloorplanMode("geo")}>${l?"Re-crop":"Geometry"}</button>
        <button class="ve-subtab ${"calib"===t?"on":""}" ?disabled=${o}
          title=${o?"Read-only — aligned by home frame, nothing to calibrate":""}
          @click=${()=>this._setFloorplanMode("calib")}>Calibrate (2+ points)</button>
        ${s?Ee`
          <button class="ve-subtab ${"home"===t?"on":""}"
            @click=${()=>this._setFloorplanMode("home")}>Home frame</button>
        `:De}
      </div>
      ${"calib"===t?this._renderFloorplanCalibTool(e):"home"===t?this._renderFloorplanHomeTool(e):l?this._renderRecropTool(e):this._renderFloorplanGeoTool(e)}
    `}_renderFloorplanGeoTool(e){const{w:t,h:o}=this._alignSceneSize(),s=e.draft,corner=(e,l)=>this._alignCornerPct(s,e,l,t,o),l=corner(0,0),h=corner(1,0),d=corner(0,1),p=corner(1,1),u={x:50+s.offset_x,y:50+s.offset_y},m=this._alignCornerPct(s,.5,-.18,t,o),_=this._config.vacuums.filter(t=>resolveImageBaseSrc(this._config,t)===e.floorplan&&this._intAttrs(t));return Ee`
        <div class="align-body">
          <div class="align-canvas"
            @wheel=${e=>this._alignWheel(e)}
            @pointerdown=${e=>this._alignBgPointerDown(e)}
            @pointermove=${e=>this._alignBgPointerMove(e)}
            @pointerup=${e=>this._alignBgPointerUp(e)}
            @pointercancel=${e=>this._alignBgPointerUp(e)}>
            <div class="align-scene" style=${Ue({width:t+"px",height:o+"px",transform:this._alignViewTransformCss()})}>
              ${_.map(e=>{const t=this._mapEntityFor(e),o=t?this._mapUrl(t):null,s=this._effectiveSeat(e);return Ee`
                  <div class="align-ghost">
                    ${o?Ee`<img class="align-seat-img" src=${o} alt=""
                        style=${Ue({left:50+s.offset_x+"%",top:50+s.offset_y+"%",width:s.scale+"%",transform:"translate(-50%,-50%) "+seatRotateScaleCss(s.rotation,s.scale,s.scaleY)})} />`:De}
                    ${this._renderIntegrationOverlay(e,s,"both")}
                  </div>`})}
              <div class="align-seat-layer"
                @pointerdown=${e=>this._floorGeoStartGesture(e,"drag")}
                @pointermove=${e=>this._floorGeoGestureMove(e)}
                @pointerup=${e=>this._floorGeoGestureEnd(e)}
                @pointercancel=${e=>this._floorGeoGestureEnd(e)}>
                <img class="align-seat-img" src=${e.floorplan} alt="Floorplan"
                  @load=${this._onFloorplanLoad}
                  style=${Ue({left:50+s.offset_x+"%",top:50+s.offset_y+"%",width:s.scale+"%",transform:"translate(-50%,-50%) rotate("+s.rotation+"deg)"})} />
              </div>
              <svg class="align-gizmo" viewBox="0 0 100 100" preserveAspectRatio="none">
                <line x1=${u.x} y1=${u.y} x2=${m.x} y2=${m.y} class="align-gizmo-arm" />
                <polygon points="${l.x},${l.y} ${h.x},${h.y} ${p.x},${p.y} ${d.x},${d.y}" class="align-gizmo-box" />
              </svg>
              ${[["nw",l],["ne",h],["se",p],["sw",d]].map(([e,t])=>Ee`
                <div class="align-handle align-handle--corner" data-corner=${e}
                  style=${Ue({left:t.x+"%",top:t.y+"%"})}
                  @pointerdown=${t=>{const o="nw"===e?p:"ne"===e?d:"se"===e?l:h;this._floorGeoStartGesture(t,"scale",o)}}
                  @pointermove=${e=>this._floorGeoGestureMove(e)}
                  @pointerup=${e=>this._floorGeoGestureEnd(e)}
                  @pointercancel=${e=>this._floorGeoGestureEnd(e)}>
                </div>
              `)}
              <div class="align-axis-hint align-axis-hint--x" title="Offset X"
                style=${Ue({left:u.x+7+"%",top:u.y+"%"})}>
                <ha-icon icon="mdi:arrow-left-right"></ha-icon>
              </div>
              <div class="align-axis-hint align-axis-hint--y" title="Offset Y"
                style=${Ue({left:u.x+"%",top:u.y-7+"%"})}>
                <ha-icon icon="mdi:arrow-up-down"></ha-icon>
              </div>
              <div class="align-handle align-handle--rotate"
                style=${Ue({left:m.x+"%",top:m.y+"%"})}
                @pointerdown=${e=>this._floorGeoStartGesture(e,"rotate",u)}
                @pointermove=${e=>this._floorGeoGestureMove(e)}
                @pointerup=${e=>this._floorGeoGestureEnd(e)}
                @pointercancel=${e=>this._floorGeoGestureEnd(e)}>
                <ha-icon icon="mdi:rotate-3d-variant"></ha-icon>
              </div>
            </div>
          </div>
          <div class="align-side-panel">
            <div class="align-field-row">
              <label>Rotation<span>°</span></label>
              <input type="number" step="0.1" .value=${String(Math.round(100*s.rotation)/100)}
                @change=${e=>this._floorGeoSetField("rotation",e.target.value)} />
            </div>
            <div class="align-field-row">
              <label>Scale<span>%</span></label>
              <input type="number" step="0.1" min="1" .value=${String(Math.round(100*s.scale)/100)}
                @change=${e=>this._floorGeoSetField("scale",e.target.value)} />
            </div>
            <div class="align-field-row">
              <label>Offset ↔<span>%</span></label>
              <input type="number" step="0.01" .value=${String(Math.round(1e4*s.offset_x)/1e4)}
                @change=${e=>this._floorGeoSetField("offset_x",e.target.value)} />
            </div>
            <div class="align-field-row">
              <label>Offset ↕<span>%</span></label>
              <input type="number" step="0.01" .value=${String(Math.round(1e4*s.offset_y)/1e4)}
                @change=${e=>this._floorGeoSetField("offset_y",e.target.value)} />
            </div>
            <div class="rooms-side-note">Drag the floorplan itself, or a corner/rotate handle. Every vacuum
              sharing this floorplan is shown dimmed underneath, unedited, as a reference.</div>
            ${this._renderFloorplanSnapshotSection(e)}
          </div>
        </div>
    `}_renderRecropTool(e){const{w:t,h:o}=this._alignSceneSize(),s=this._recropDraft,l=this._recropOldCrop(e),h=this._recropGhostVacuums(),d=h[0],p=d?this._roomsFor(d):[],corner=(e,l)=>this._alignCornerPct(s,e,l,t,o),u=corner(0,0),m=corner(1,0),_=corner(0,1),f=corner(1,1),v=l?function canvasScaleForCrop(e,t){if(!e||!t)return null;const o=t.x1-t.x0,s=t.y1-t.y0;if(!(o>0&&s>0&&e.w>0&&e.h>0))return null;if(Math.abs(e.w-o)<=2&&Math.abs(e.h-s)<=2)return 1;const l=e.w/e.h,h=o/s;return Math.abs(l/h-1)>.003?null:(e.w/o+e.h/s)/2}(this._recropNat,l):null;return Ee`
        <div class="align-body">
          <div class="align-canvas"
            @wheel=${e=>this._alignWheel(e)}
            @pointerdown=${e=>this._alignBgPointerDown(e)}
            @pointermove=${e=>this._alignBgPointerMove(e)}
            @pointerup=${e=>this._alignBgPointerUp(e)}
            @pointercancel=${e=>this._alignBgPointerUp(e)}>
            <div class="align-scene" style=${Ue({width:t+"px",height:o+"px",transform:this._alignViewTransformCss()})}>
              <img class="align-floorplan-img" src=${e.floorplan} alt="Floorplan"
                @load=${e=>{const t=e.target;t.naturalWidth&&t.naturalHeight&&(this._recropNat?.w!==t.naturalWidth||this._recropNat?.h!==t.naturalHeight)&&(this._recropNat={w:t.naturalWidth,h:t.naturalHeight})}} />
              ${l&&h.length?Ee`
                <div class="recrop-ghost"
                  style=${Ue({transform:`translate(${s.offset_x}%, ${s.offset_y}%) scale(${s.scale/100})`})}
                  @pointerdown=${e=>this._recropStartGesture(e,"drag")}
                  @pointermove=${e=>this._recropGestureMove(e)}
                  @pointerup=${e=>this._recropGestureEnd(e)}
                  @pointercancel=${e=>this._recropGestureEnd(e)}>
                  ${p.map(e=>null==e.map_x||null==e.map_y||null==e.map_w||null==e.map_h?De:Ee`
                    <div class="rooms-rect recrop-rect"
                      style=${Ue({left:e.map_x+"%",top:e.map_y+"%",width:e.map_w+"%",height:e.map_h+"%"})}>
                      <span class="rooms-rect-label">${e.name??e.key}</span>
                    </div>
                  `)}
                  ${h.map(e=>this._renderHomeFrameOverlay(e,l,"both"))}
                </div>
                <svg class="align-gizmo" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <polygon points="${u.x},${u.y} ${m.x},${m.y} ${f.x},${f.y} ${_.x},${_.y}" class="align-gizmo-box" />
                </svg>
                ${[["nw",u],["ne",m],["se",f],["sw",_]].map(([e,t])=>Ee`
                  <div class="align-handle align-handle--corner" data-corner=${e}
                    style=${Ue({left:t.x+"%",top:t.y+"%"})}
                    @pointerdown=${t=>{const o="nw"===e?f:"ne"===e?_:"se"===e?u:m;this._recropStartGesture(t,"scale",o)}}
                    @pointermove=${e=>this._recropGestureMove(e)}
                    @pointerup=${e=>this._recropGestureEnd(e)}
                    @pointercancel=${e=>this._recropGestureEnd(e)}>
                  </div>
                `)}
              `:De}
            </div>
          </div>
          <div class="align-side-panel">
            ${l?h.length?De:Ee`
              <div class="rooms-side-note">No vacuum is currently registered into this home frame — there's
                nothing live to drag against right now. Re-open this tool once at least one is back online.</div>
            `:Ee`
              <div class="rooms-side-note">No usable <code>crop_box</code> found on this floorplan — nothing
                to re-crop.</div>
            `}
            ${this._recropNat&&l?Ee`
              <div class="rooms-side-note">
                ${null==v?Ee`⚠️ This file (${this._recropNat.w}×${this._recropNat.h}px) no longer matches its
                      recorded crop (${Math.round(l.x1-l.x0)}×${Math.round(l.y1-l.y0)}px)
                      — it was re-cropped or re-exported at a different extent. Drag/scale the rooms below onto
                      their real spots in the picture, then Save.`:Math.abs(v-1)<.01?Ee`✅ This file still matches its recorded crop exactly.`:Ee`ℹ️ This file is a ${v.toFixed(2)}× uniform re-export of its recorded crop —
                        still valid, no re-crop needed.`}
              </div>
            `:De}
            <div class="align-field-row">
              <label>Shift ↔<span>%</span></label>
              <input type="number" step="0.01" .value=${String(Math.round(1e4*s.offset_x)/1e4)}
                @change=${e=>this._recropSetField("offset_x",e.target.value)} />
            </div>
            <div class="align-field-row">
              <label>Shift ↕<span>%</span></label>
              <input type="number" step="0.01" .value=${String(Math.round(1e4*s.offset_y)/1e4)}
                @change=${e=>this._recropSetField("offset_y",e.target.value)} />
            </div>
            <div class="align-field-row">
              <label>Scale<span>%</span></label>
              <input type="number" step="0.1" min="1" .value=${String(Math.round(100*s.scale)/100)}
                @change=${e=>this._recropSetField("scale",e.target.value)} />
            </div>
            <div class="rooms-side-note">The picture stays fixed — drag/scale the rooms &amp; robots on top of
              it instead, until they sit exactly where they really are, then Save. This recomputes
              <code>crop_box</code> alone; nothing else about this floorplan changes.</div>
            ${this._renderFloorplanSnapshotSection(e)}
          </div>
        </div>
    `}_renderFloorplanSnapshotSection(e){const t=this._alignVac(),o=t?.name||t?.entity||"this vacuum",s=this._floorplanSnapshotServiceAvailable();return Ee`
      <div class="align-side-panel-divider"></div>
      <div class="section-title">Snapshot / acquisition</div>
      <button class="align-btn" style="width:auto;padding:0 10px;gap:6px"
        ?disabled=${this._floorplanSnapshotBusy||!s||!t||!this._mapEntityFor(t)}
        @click=${()=>this._snapshotMapAsFloorplan()}>
        <ha-icon icon="mdi:camera"></ha-icon>
        <span>${this._floorplanSnapshotBusy?"Snapshotting…":`Re-snapshot ${o}'s map as floorplan`}</span>
      </button>
      <div class="rooms-side-note">Replaces this floorplan's Image src with a fresh capture of
        ${o}'s current map, re-places its own rooms onto the new crop by name, and turns
        "Hide vacuum map" on for every vacuum sharing this floorplan. Geometry above and any
        existing calibration are carried through unchanged — re-align/re-calibrate afterwards
        if the new capture doesn't line up.</div>
      ${this._floorplanSnapshotError?Ee`<div class="floor-calib-error">${this._floorplanSnapshotError}</div>`:De}
      ${this._placeRoomsResult?Ee`
        <div class="rooms-side-note">✅ Rooms placed: <strong>${this._placeRoomsResult.placed}</strong> updated,
          <strong>${this._placeRoomsResult.added}</strong> added.</div>
      `:De}
      <button class="align-btn" style="width:auto;padding:0 10px;gap:6px"
        ?disabled=${this._homeFrameSnapshotBusy||!s}
        @click=${()=>this._snapshotHomeFrameAsFloorplan()}>
        <ha-icon icon="mdi:home-map-marker"></ha-icon>
        <span>${this._homeFrameSnapshotBusy?"Snapshotting…":"Re-snapshot home frame as floorplan"}</span>
      </button>
      <div class="rooms-side-note">Replaces this floorplan's Image src with a fresh composite of every
        vacuum currently registered into the shared home frame. No room placement (home-frame rooms
        compute live) — just the image and its identity crop.</div>
      ${this._homeFrameSnapshotError?Ee`<div class="floor-calib-error">${this._homeFrameSnapshotError}</div>`:De}
      <div class="align-side-panel-divider"></div>
      <button class="align-btn" style="width:auto;padding:0 10px;gap:6px"
        ?disabled=${this._guideExportBusy||!this._guideExportServiceAvailable()||!t||!this._mapEntityFor(t)}
        @click=${()=>this._exportGuideLayers()}>
        <ha-icon icon="mdi:layers-outline"></ha-icon>
        <span>${this._guideExportBusy?"Exporting…":`Export ${o}'s guide layers`}</span>
      </button>
      <div class="rooms-side-note">Renders wall/floor guide layers for a photo overlay in an external
        image editor — no config changes at all.</div>
      ${this._guideExportError?Ee`<div class="floor-calib-error">${this._guideExportError}</div>`:De}
      ${this._guideExportResult?Ee`
        <div class="rooms-side-note">✅ ${Object.keys(this._guideExportResult.paths).length} layer(s) at
          ${this._guideExportResult.size.w}×${this._guideExportResult.size.h}px:
          ${Object.entries(this._guideExportResult.paths).map(([e,t])=>Ee`
            <div><code>${e}</code>: ${t}</div>
          `)}
        </div>
      `:De}
    `}_floorCalibCanvasPointerDown(e){"calib"===this._floorplanMode&&"floor"===this._floorCalib?.phase?(this._alignRefocusOverlay(),this._floorCalibDragStart={pointerId:e.pointerId,x0:e.clientX,y0:e.clientY},this._alignBgPointerDown(e)):this._alignBgPointerDown(e)}_floorCalibCanvasPointerMove(e){this._alignBgPointerMove(e)}_floorCalibCanvasPointerUp(e){const t=this._floorCalibDragStart;this._floorCalibDragStart=null,this._alignBgPointerUp(e),t&&t.pointerId===e.pointerId&&Math.hypot(e.clientX-t.x0,e.clientY-t.y0)<=12&&this._floorCalibFloorClick(e)}_homeCalibCanvasPointerDown(e){"home"===this._floorplanMode&&"floor"===this._homeCalib?.phase?(this._alignRefocusOverlay(),this._homeCalibDragStart={pointerId:e.pointerId,x0:e.clientX,y0:e.clientY},this._alignBgPointerDown(e)):this._alignBgPointerDown(e)}_homeCalibCanvasPointerMove(e){this._alignBgPointerMove(e)}_homeCalibCanvasPointerUp(e){const t=this._homeCalibDragStart;this._homeCalibDragStart=null,this._alignBgPointerUp(e),t&&t.pointerId===e.pointerId&&Math.hypot(e.clientX-t.x0,e.clientY-t.y0)<=12&&this._onHomeCalibFloorClick(e)}_renderFloorplanCalibTool(e){const{w:t,h:o}=this._alignSceneSize(),s=e.draft,l=this._floorCalib,h=this._alignVac(),d=h?this._mapEntityFor(h):void 0,p=d?this._mapUrl(d):null,u=this._alignReadOnly(),m=l?Math.min(l.rawPts.length,l.floorPts.length):0,_=l?this._floorCalibPreview(l):null,f=!!l&&l.rawPts.length>=6,v=!l||"raw"===l.phase;return Ee`
        <div class="align-body">
          <div class="align-canvas"
            @wheel=${e=>this._alignWheel(e)}
            @pointerdown=${e=>this._floorCalibCanvasPointerDown(e)}
            @pointermove=${e=>this._floorCalibCanvasPointerMove(e)}
            @pointerup=${e=>this._floorCalibCanvasPointerUp(e)}
            @pointercancel=${e=>this._floorCalibCanvasPointerUp(e)}>
            <div class="align-scene" style=${Ue({width:t+"px",height:o+"px",transform:this._alignViewTransformCss()})}>
              <img class="align-seat-img" src=${e.floorplan} alt="Floorplan"
                @load=${this._onFloorplanLoad}
                style=${Ue({left:50+s.offset_x+"%",top:50+s.offset_y+"%",width:s.scale+"%",transform:"translate(-50%,-50%) rotate("+s.rotation+"deg)"})} />
              ${(l?.floorPts??[]).map((e,t)=>Ee`
                <div class="calib-marker" style=${Ue({left:e.x+"%",top:e.y+"%"})}>${t+1}</div>
              `)}
            </div>
          </div>
          <div class="align-side-panel">
            ${u?Ee`
              <div class="rooms-side-note">Read-only — this vacuum is aligned by the home frame, there's
                nothing to calibrate here.</div>
            `:l?Ee`
              <div class="floor-calib-banner ${v?"floor-calib-banner--raw":"floor-calib-banner--floor"}">
                ${v?f?Ee`<strong>${6} points</strong> — that's the max. Save below, or undo a point.`:Ee`<strong>Point ${m+1}:</strong> click a distinctive spot (e.g. a room corner)
                        on this vacuum's OWN map below.`:Ee`<strong>Point ${m+1}:</strong> click the SAME physical point on the floorplan
                    on the left — zoom/pan it first if you need to.`}
                ${_?Ee`<div>Fit error with ${m} point${1===m?"":"s"}:
                  <strong>${_.residual_pct}%</strong></div>`:De}
              </div>
              <div class="section-title">This vacuum's own map</div>
              ${p?Ee`
                <div class="floor-calib-inset ${v?"floor-calib-inset--active":""}"
                  @click=${e=>this._floorCalibRawClick(e)}>
                  <img src=${p} alt="Vacuum map"
                    @load=${e=>{const t=e.target;t.naturalWidth&&t.naturalHeight&&(this._floorCalibRefNat?.w!==t.naturalWidth||this._floorCalibRefNat?.h!==t.naturalHeight)&&(this._floorCalibRefNat={w:t.naturalWidth,h:t.naturalHeight})}} />
                  ${l.rawPts.map((e,t)=>this._floorCalibRefNat?Ee`
                    <div class="calib-marker" style=${Ue({left:e.x/this._floorCalibRefNat.w*100+"%",top:e.y/this._floorCalibRefNat.h*100+"%"})}>${t+1}</div>
                  `:De)}
                </div>
              `:Ee`<div class="rooms-side-note">No map image for this vacuum right now.</div>`}
              <div class="align-side-panel-divider"></div>
              <div style="display:flex;gap:8px;flex-wrap:wrap">
                ${l.rawPts.length>0||l.floorPts.length>0?Ee`
                  <button class="align-btn" style="width:auto;padding:0 10px;gap:6px" @click=${()=>this._floorCalibUndoPoint()}>
                    <ha-icon icon="mdi:undo"></ha-icon><span>Undo point</span>
                  </button>
                `:De}
                <button class="align-btn" style="width:auto;padding:0 10px;gap:6px" @click=${()=>this._floorCalibCancel()}>
                  <ha-icon icon="mdi:close"></ha-icon><span>Cancel</span>
                </button>
              </div>
              ${this._floorCalibError?Ee`
                <div class="floor-calib-error">${this._floorCalibError}</div>
              `:De}
              <div class="align-side-panel-divider"></div>
              <div class="rooms-side-note">Click the SAME physical point twice — once on this vacuum's own
                map, once on the floorplan — for at least 2 pairs (up to ${6}). More,
                well-spread pairs average out click imprecision. Save writes a manual seat for THIS vacuum
                only — other vacuums sharing this floorplan are unaffected.</div>
            `:De}
          </div>
        </div>
    `}_renderFloorplanHomeTool(e){const{w:t,h:o}=this._alignSceneSize(),s=e.draft,l=this._homeCalib,h=this._floorplanCardImageBase(),d=h?.home_anchors,p=l?Math.min(l.homePts.length,l.floorPts.length):0,u=l?this._homeCalibPreview(l):null,m=!!l&&l.homePts.length>=6,_=!l||"frame"===l.phase,f=this._homeCalibCrop;return Ee`
        <div class="align-body">
          <div class="align-canvas"
            @wheel=${e=>this._alignWheel(e)}
            @pointerdown=${e=>this._homeCalibCanvasPointerDown(e)}
            @pointermove=${e=>this._homeCalibCanvasPointerMove(e)}
            @pointerup=${e=>this._homeCalibCanvasPointerUp(e)}
            @pointercancel=${e=>this._homeCalibCanvasPointerUp(e)}>
            <div class="align-scene" style=${Ue({width:t+"px",height:o+"px",transform:this._alignViewTransformCss()})}>
              <img class="align-seat-img" src=${e.floorplan} alt="Floorplan"
                @load=${this._onFloorplanLoad}
                style=${Ue({left:50+s.offset_x+"%",top:50+s.offset_y+"%",width:s.scale+"%",transform:"translate(-50%,-50%) rotate("+s.rotation+"deg)"})} />
              ${(l?.floorPts??[]).map((e,t)=>Ee`
                <div class="calib-marker" style=${Ue({left:e.x+"%",top:e.y+"%"})}>${t+1}</div>
              `)}
            </div>
          </div>
          <div class="align-side-panel">
            ${l?Ee`
              <div class="floor-calib-banner ${_?"floor-calib-banner--raw":"floor-calib-banner--floor"}">
                ${_?m?Ee`<strong>${6} points</strong> — that's the max. Save below, or undo a point.`:Ee`<strong>Point ${p+1}:</strong> click a distinctive spot (e.g. a wall corner)
                        on the home frame below.${this._homeCalibBusy?" Snapping…":""}`:Ee`<strong>Point ${p+1}:</strong> click the SAME physical point on the floorplan
                    on the left — zoom/pan it first if you need to.`}
                ${u?Ee`<div>Fit error with ${p} point${1===p?"":"s"}:
                  <strong>${u.residual_pct}%</strong></div>`:De}
              </div>
              <div class="section-title">Home frame (live snapshot)</div>
              <div class="floor-calib-inset ${_?"floor-calib-inset--active":""}"
                @click=${e=>this._onHomeCalibFrameClick(e)}>
                <img src=${this._homeCalibSnapshotUrl} alt="Home frame" />
                ${f?l.homePts.map((e,t)=>Ee`
                  <div class="calib-marker" style=${Ue({left:(e.x-f.x0)/(f.x1-f.x0)*100+"%",top:(e.y-f.y0)/(f.y1-f.y0)*100+"%"})}>${t+1}</div>
                `):De}
              </div>
              <div class="align-side-panel-divider"></div>
              <div style="display:flex;gap:8px;flex-wrap:wrap">
                ${l.homePts.length>0||l.floorPts.length>0?Ee`
                  <button class="align-btn" style="width:auto;padding:0 10px;gap:6px" @click=${()=>this._undoHomeCalibPoint()}>
                    <ha-icon icon="mdi:undo"></ha-icon><span>Undo point</span>
                  </button>
                `:De}
                <button class="align-btn" style="width:auto;padding:0 10px;gap:6px" @click=${()=>this._cancelHomeCalibration()}>
                  <ha-icon icon="mdi:close"></ha-icon><span>Cancel</span>
                </button>
              </div>
              ${this._homeCalibError?Ee`
                <div class="floor-calib-error">${this._homeCalibError}</div>
              `:De}
              <div class="align-side-panel-divider"></div>
              <div class="rooms-side-note">Click the SAME physical point twice — once on the home frame,
                once on the floorplan — for at least 2 pairs (up to ${6}). Save
                calibrates the WHOLE shared floorplan — every vacuum registered into this home frame draws
                through it automatically, no per-vacuum seating needed.</div>
            `:Ee`
              ${d?.length?Ee`
                <div class="rooms-side-note">Calibrated: <strong>${d.length}</strong>
                  anchor point${d.length>1?"s":""} against frame
                  <code>${h?.home_anchors_frame_id}</code>
                  <span class="footer-link" style="margin-left:6px" @click=${()=>this._clearHomeAnchors()}>Clear</span>
                </div>
              `:De}
              ${this._homeCalibResult?Ee`
                <div class="rooms-side-note">✅ Calibrated — fit error ${this._homeCalibResult.residual_pct}%.</div>
              `:De}
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
              ${this._homeCalibError?Ee`<div class="floor-calib-error">${this._homeCalibError}</div>`:De}
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
                ${this._fiducialSnapshotPath?Ee`If this floorplan's Image src isn't already
                  <code>${this._fiducialSnapshotPath}</code>, set it from the Config editor's Global tab
                  first.`:De}
                Then crop, resize and/or rotate that file in an external image editor as needed (GIMP etc.),
                keep it as PNG, don't flatten it, and run step 2.</div>
              ${this._fiducialSnapshotError?Ee`<div class="floor-calib-error">${this._fiducialSnapshotError}</div>`:De}
              ${this._fiducialKnown?Ee`
                <button class="align-btn" style="width:auto;padding:0 10px;gap:6px"
                  ?disabled=${this._fiducialDetectBusy}
                  @click=${()=>this._detectFiducials()}>
                  <ha-icon icon="mdi:crosshairs-gps"></ha-icon>
                  <span>${this._fiducialDetectBusy?"Detecting…":"2. Detect markers in edited file"}</span>
                </button>
                <div class="rooms-side-note">Scans the floorplan's current Image src for the markers step 1
                  embedded and, once at least 2 of the 4 are found, calibrates from them — no clicking.</div>
                ${this._fiducialDetectError?Ee`<div class="floor-calib-error">${this._fiducialDetectError}</div>`:De}
                ${this._fiducialDetectResult?Ee`
                  <div class="rooms-side-note">✅ Found ${this._fiducialDetectResult.found}/4
                    marker${1===this._fiducialDetectResult.found?"":"s"}${this._fiducialDetectResult.missing.length?Ee` (missing: ${this._fiducialDetectResult.missing.join(", ")})`:De}.</div>
                `:De}
              `:De}
            `}
          </div>
        </div>
    `}_renderVePlaceholder(e){return Ee`
      <div class="align-body ve-placeholder-body">
        <div class="ve-placeholder">
          <ha-icon icon="mdi:hammer-wrench"></ha-icon>
          <div class="ve-placeholder-title">Floorplan & Calibrate — not available here</div>
          <div class="ve-placeholder-sub">${e}</div>
        </div>
      </div>
    `}_veHexColorField(e,t,o,s,l){const h=/^#[0-9a-fA-F]{6}$/.test(t??"")?t:l;return Ee`
      <div class="align-field-row align-field-row--color">
        <label>${e}</label>
        <div class="align-color-row">
          <input type="color" class="align-color-swatch" .value=${h} ?disabled=${o}
            @input=${e=>s(e.target.value)} />
          <input type="text" class="align-color-text" .value=${t??""} placeholder=${l} ?disabled=${o}
            @change=${e=>s(e.target.value)} />
        </div>
      </div>`}_alignSetAppearanceField(e,t){const o=this._alignSession;o&&!this._alignReadOnly()&&o.appearanceDraft[e]!==t&&(this._alignSession={...o,appearanceDraft:{...o.appearanceDraft,[e]:t}})}_homeFrameCropFor(e){if(this._memoSync(),this._homeFrameMemo.has(e.entity))return this._homeFrameMemo.get(e.entity);const t=function homeFrameCropFor(e,t,o){const s="merged"===e.map_mode?e.image_base:t?.image_base,l=s?.crop_box;if(!l?.frame_id||null==l.x1||null==l.y1)return null;const h=o?.home_frame;return h?.id&&h.id===l.frame_id?{x0:l.x0,y0:l.y0,x1:l.x1,y1:l.y1}:null}(this._config,e,this._intAttrs(e));return this._homeFrameMemo.set(e.entity,t),t}_homeFrameDims(){const e=this._config.image_base?.home_anchors_frame_id,t=this._homeFrameRegistry();if(e){const o=t.get(e);if(o)return{NW:o.w,NH:o.h}}let o=null;for(const e of t.values())(!o||e.count>o.count)&&(o=e);return o?{NW:o.w,NH:o.h}:null}_homeFrameRegistry(){const e=new Map;for(const t of this._config.vacuums??[]){const o=this._intAttrs(t)?.home_frame;if(!(o?.id&&o.width_px>0&&o.height_px>0))continue;const s=e.get(o.id);s?s.count++:e.set(o.id,{w:o.width_px,h:o.height_px,count:1})}return e}_anyHomeFrameCard(){const e=this._homeFrameRegistry();let t=null;for(const[o,s]of e)(!t||s.count>t.count)&&(t={id:o,...s});return t?{id:t.id,w:t.w,h:t.h}:null}_homeAnchorFitFor(e,t){if("merged"!==this._config.map_mode)return null;if(this._homeFrameCropFor(e))return null;if(!this._intAttrs(e)?.home_frame)return null;const o=this._config.image_base?.home_anchors,s=this._homeFrameDims(),l=homeAnchorFit(o,s,t);return l&&s?{fit:l,dims:s}:null}_renderIntegrationOverlay(e,t,o="both"){const s=this._intAttrs(e);if(!s)return De;const l=s.image_dims;if(!l)return De;const h=l.scale??1;let d=(l.width??0)*h,p=(l.height??0)*h;const u=l.rotation??0;if(90===u||270===u){const e=d;d=p,p=e}if(!d||!p)return De;const m=Math.max(d,p)/55,_=s.vacuum_position_px,f=_?{x:_.x,y:_.y}:null;let v=null;if(f&&null!=_.a){const e=_.a*Math.PI/180;v={x:f.x+1.3*m*Math.cos(e),y:f.y-1.3*m*Math.sin(e)}}const b={left:50+(t?.offset_x??0)+"%",top:50+(t?.offset_y??0)+"%",width:(t?.scale??100)+"%",aspectRatio:d+" / "+p,transform:"translate(-50%,-50%) "+seatRotateScaleCss(t?.rotation??0,t?.scale??100,t?.scaleY)},w=this._renderVectorLayers(e,{dry:this._vecSegs(s.path_dry_px),wet:this._vecSegs(s.path_wet_px),rob:f,head:v,rr:m,digits:1,pose:_?_.x+","+_.y:"",imageRot:(_&&null!=_.a?_.a:0)+(e.robot_image_rotation??0),filterId:"avc-err-blur-"+e.entity.replace(/[^a-zA-Z0-9]/g,"-"),scaleYRatio:seatScaleYRatio(t?.scale??100,t?.scaleY)},o);return Ee`<svg class="map-vector" viewBox="0 0 ${d} ${p}" preserveAspectRatio="none" style=${Ue(b)}>${w}</svg>`}_vecSegs(e,t){return Array.isArray(e)?e.map(e=>Array.isArray(e)?t?e.map(t):e:[]):[]}_renderVectorLayers(e,t,o){const{rob:s,head:l,rr:h,digits:d}=t,p=this._color(e),u=this._vacCleanType(e),m=this._layersEff(),_=m.dry&&u.dry?t.dry.map(e=>fmtPts(e,d)).filter(e=>e.length>0):[],f=m.wet&&u.wet?t.wet.map(e=>fmtPts(e,d)).filter(e=>e.length>0):[],v=.35*h*((e.path_width??100)/100),b=v.toFixed(2),w=(2.6*v*((e.mop_band_width??100)/100)).toFixed(2),$=((e.mop_band_opacity??28)/100).toFixed(2),C=e.mop_path_color||"#40a9ff",A=f.length?ze`${f.map(e=>ze`<polyline points=${e} fill="none" stroke=${C} stroke-width=${w} stroke-linejoin="round" stroke-linecap="round" opacity=${$}></polyline>`)}`:De,P=f.length?ze`${f.map(e=>ze`<polyline points=${e} fill="none" stroke=${C} stroke-width=${b} stroke-linejoin="round" stroke-linecap="round" opacity="0.9"></polyline>`)}`:De,F=e.path_color||p,E="legacy"!==(this._config.theme??at),T=(3*v).toFixed(2),O=_.length?ze`${E?_.map(e=>ze`<polyline points=${e} fill="none" stroke=${F} stroke-width=${T} stroke-linejoin="round" stroke-linecap="round" opacity="0.12"></polyline>`):De}${_.map(e=>ze`<polyline points=${e} fill="none" stroke=${F} stroke-width=${b} stroke-linejoin="round" stroke-linecap="round" opacity="0.85"></polyline>`)}`:De,B=!(!e.robot_image_on_map||!e.image),G=2.6*h*((e.robot_size??100)/100),j=t.scaleYRatio??1;if(!this._themed()){const u=s?B?ze`<image href=${e.image} x=${(s.x-G/2).toFixed(d)} y=${(s.y-G/2).toFixed(d)} width=${G.toFixed(d)} height=${G.toFixed(d)} preserveAspectRatio="xMidYMid meet" transform=${"rotate("+t.imageRot+" "+s.x.toFixed(d)+" "+s.y.toFixed(d)+")"}></image>`:ze`${l?ze`<line x1=${s.x.toFixed(d)} y1=${s.y.toFixed(d)} x2=${l.x.toFixed(d)} y2=${l.y.toFixed(d)} stroke="#ffffff" stroke-width=${(.3*h).toFixed(2)} stroke-linecap="round"></line>`:De}<circle cx=${s.x.toFixed(d)} cy=${s.y.toFixed(d)} r=${h.toFixed(d)} fill=${p} stroke="#ffffff" stroke-width=${(.18*h).toFixed(2)}></circle>`:De,m=s&&this._hasError(e)?ze`<defs><filter id=${t.filterId} x="-150%" y="-150%" width="400%" height="400%">
              <feGaussianBlur stdDeviation=${(.5*h).toFixed(2)}></feGaussianBlur>
            </filter></defs>
            <circle class="avc-err-halo" cx=${s.x.toFixed(d)} cy=${s.y.toFixed(d)} r=${(2.2*h).toFixed(d)}
              fill="#ff3b30" filter=${"url(#"+t.filterId+")"}></circle>`:De,_=ze`${m}${u}`,f=1!==j&&s?ze`<g transform=${"translate("+s.x.toFixed(1)+","+s.y.toFixed(1)+") scale(1,"+(1/j).toFixed(4)+") translate("+(-s.x).toFixed(1)+","+(-s.y).toFixed(1)+")"}>${_}</g>`:_,v=ze`${A}${P}${O}`;return"paths"===o?v:"marker"===o?f:ze`${v}${f}`}const q=this._isCleaning(e),W=3.2*h,lastTail=e=>{for(let t=e.length-1;t>=0;t--)if(e[t].length>=2)return trailTail(e[t],W);return[]},headOf=(e,t)=>{if(e.length<2)return De;const o=fmtPts(e,d);return ze`<polyline class="avc-trail-head-glow" points=${o} fill="none" stroke=${t} stroke-width=${(4*v).toFixed(2)} stroke-linejoin="round" stroke-linecap="round" opacity="0.3"></polyline><polyline class="avc-trail-head" points=${o} fill="none" stroke=${t} stroke-width=${(1.7*v).toFixed(2)} stroke-linejoin="round" stroke-linecap="round"></polyline>`},U=q?ze`${f.length?headOf(lastTail(t.wet),C):De}${_.length?headOf(lastTail(t.dry),F):De}`:De;let Y=De;if(s&&"paths"!==o){const o=l?l.x-s.x:0,u=l?l.y-s.y:0,m=B?ze`<image href=${e.image} x=${(-G/2).toFixed(d)} y=${(-G/2).toFixed(d)} width=${G.toFixed(d)} height=${G.toFixed(d)} preserveAspectRatio="xMidYMid meet" transform=${"rotate("+t.imageRot+")"}></image>`:ze`${l?ze`<line x1="0" y1="0" x2=${o.toFixed(d)} y2=${u.toFixed(d)} stroke="#ffffff" stroke-width=${(.3*h).toFixed(2)} stroke-linecap="round"></line>`:De}<circle class="avc-marker-dot" cx="0" cy="0" r=${h.toFixed(d)} fill=${p} stroke="#ffffff" stroke-width=${(.18*h).toFixed(2)}></circle>`,_=this._hasError(e)?ze`<defs><filter id=${t.filterId} x="-150%" y="-150%" width="400%" height="400%">
                <feGaussianBlur stdDeviation=${(.5*h).toFixed(2)}></feGaussianBlur>
              </filter></defs>
              <circle class="avc-err-halo" cx="0" cy="0" r=${(2.2*h).toFixed(d)} fill="#ff3b30" filter=${"url(#"+t.filterId+")"}></circle>`:De,f=q?ze`<circle class="avc-sonar" cx="0" cy="0" r=${h.toFixed(d)} fill="none" stroke=${p} stroke-width=${(.22*h).toFixed(2)}></circle>`:De,v=ze`${_}${f}${m}`,b=this._markerPrev.get(t.filterId),w=!!b&&b.pose===(t.pose??"")&&(Math.abs(b.x-s.x)>1e-6||Math.abs(b.y-s.y)>1e-6);this._markerPrev.set(t.filterId,{pose:t.pose??"",x:s.x,y:s.y}),Y=ze`<g class="avc-marker ${w?"avc-marker--jump":""}" style=${"transform: translate("+s.x.toFixed(d)+"px, "+s.y.toFixed(d)+"px)"}>${1!==j?ze`<g transform=${"scale(1,"+(1/j).toFixed(4)+")"}>${v}</g>`:v}</g>`}const K=ze`${A}${P}${O}${U}`;return"paths"===o?K:"marker"===o?Y:ze`${K}${Y}`}_renderHomeFrameOverlay(e,t,o="both"){const s=this._intAttrs(e);if(!s)return De;const l=t.x1-t.x0,h=t.y1-t.y0;if(!(l>0&&h>0))return De;const d=Math.max(l,h)/55,local=e=>({x:e.x-t.x0,y:e.y-t.y0}),p=s.vacuum_position_home_px,u=p?local(p):null;let m=null;if(u&&null!=p.a){const e=p.a*Math.PI/180;m={x:u.x+1.3*d*Math.cos(e),y:u.y+1.3*d*Math.sin(e)}}const _=this._renderVectorLayers(e,{dry:this._vecSegs(s.path_dry_home_px,local),wet:this._vecSegs(s.path_wet_home_px,local),rob:u,head:m,rr:d,digits:1,pose:p?p.x+","+p.y:"",imageRot:(p&&null!=p.a?p.a:0)+(e.robot_image_rotation??0),filterId:"avc-hf-err-blur-"+e.entity.replace(/[^a-zA-Z0-9]/g,"-")},o);return Ee`<svg class="map-vector" viewBox="0 0 ${l} ${h}" preserveAspectRatio="none" style=${Ue({left:"0",top:"0",width:"100%",height:"100%"})}>${_}</svg>`}_renderHomeAnchorOverlay(e,t,o,s,l="both"){const h=this._intAttrs(e);if(!(h&&s>0))return De;const proj=e=>{const l=projectHomePxThroughFit(e,o,t,s);return{x:l.x,y:l.y/s}},d=Math.max(100,100/s)/55,p=h.vacuum_position_home_px,u=p?proj(p):null;let m=null;if(u&&null!=p.a){const e=(p.a+t.rotation)*Math.PI/180;m={x:u.x+1.3*d*Math.cos(e),y:u.y+1.3*d*Math.sin(e)}}const _=this._renderVectorLayers(e,{dry:this._vecSegs(h.path_dry_home_px,proj),wet:this._vecSegs(h.path_wet_home_px,proj),rob:u,head:m,rr:d,digits:2,pose:p?p.x+","+p.y:"",imageRot:(p&&null!=p.a?p.a+t.rotation:0)+(e.robot_image_rotation??0),filterId:"avc-ha-err-blur-"+e.entity.replace(/[^a-zA-Z0-9]/g,"-")},l);return Ee`<svg class="map-vector" viewBox=${"0 0 100 "+(100/s).toFixed(3)} preserveAspectRatio="none" style=${Ue({left:"0",top:"0",width:"100%",height:"100%"})}>${_}</svg>`}_onLayerDown(e){this._layerHeld=!1,this._layerHoldTimer=window.setTimeout(()=>{this._layerHeld=!0,this._layerMenu=this._layerMenu===e?null:e},380)}_onLayerUp(){null!==this._layerHoldTimer&&(window.clearTimeout(this._layerHoldTimer),this._layerHoldTimer=null)}_onLayerClick(e){if(this._layerHeld)return void(this._layerHeld=!1);const t=this._layersEff(),o={...t,[e]:!t[e]},s=this._selSensor();s&&this.hass.states[s]?.attributes?.view_layers?this._call("anyvac","set_layers",o):this._layers=o,this._layerMenu=null}_renderLayerMenu(e,t){const o=this._mergedRoomDefs(e);return Ee`
      <div class="layer-menu">
        <div class="layer-menu-head">
          <ha-icon icon=${"dry"===t?"mdi:broom":"mdi:water"}></ha-icon>
          <span>${"dry"===t?"Dry":"Wet"} \u00b7 last cleaned</span>
        </div>
        ${o.map(({r:o,v:s})=>{const l=this._intRoomRec(s,o),h=this._ageDaysFromIso(l?.[t]),d=this._isRoomSelectedAny(o.key,e);return Ee`
            <button class="layer-menu-row ${d?"on":""}" @click=${()=>this._toggleRoomAcross(o.key,e)}>
              <ha-icon icon=${o.icon??"mdi:square"}></ha-icon>
              <span class="lm-name">${o.name??o.key}</span>
              ${this._renderProgChip(this._roomProgForType(o,e,t))}
              <b style=${Ue({color:this._colorForAgeDays(h)})}>${(e=>null===e?"—":e<1?"<1d":Math.round(e)+"d")(h)}</b>
            </button>
          `})}
      </div>
    `}_oldestAgeDays(e,t){let o=null;for(const s of e){if(!this._intAttrs(s))continue;const e=this._intAttrs(s)?.rooms_last_cleaned;if(e)for(const s of Object.values(e)){const e=this._ageDaysFromIso(s?.[t]);null!==e&&(null===o||e>o)&&(o=e)}}return o}_ageBadgeStr(e){return null===e?"—":e<1?"<1d":Math.round(e)+"d"}_renderLayerToggleCompact(e){const t=e.filter(e=>this._intAttrs(e));if(!t.length)return De;const o=this._layersEff(),ageTip=e=>{const o=this._ageBadgeStr(this._oldestAgeDays(t,e));return o&&"—"!==o?` · oldest room ${o}`:""};return Ee`
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
    `}_renderLayerToggles(e){const t=e.filter(e=>this._intAttrs(e));if(!t.length)return De;const oldestTip=e=>{const o=this._ageBadgeStr(this._oldestAgeDays(t,e));return o&&"—"!==o?` · oldest room ${o}`:""},o=this._layersEff();return Ee`
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
        ${this._layerMenu?this._renderLayerMenu(t,this._layerMenu):De}
      </div>
    `}_mergedRoomDefs(e){const t=e[0];if(this._config.rooms?.length&&t)return this._roomsFor(t).map(e=>({r:e,v:t}));const o=new Set,s=[];for(const t of e)for(const e of this._roomsFor(t))e.key&&!o.has(e.key)&&(o.add(e.key),s.push({r:e,v:t}));return s}_renderMergedRooms(e){const t=this._mergedRoomDefs(e),o=!t.some(({r:t})=>this._isRoomSelectedAny(t.key,e));return t.map(({r:t,v:s})=>this._renderRoomOverlay(t,s,{vacs:e,wholeHome:o}))}_renderRoomOutlines(e,t){const o=e.filter(({r:e})=>e.outline_pct&&e.outline_pct.length>=3);if(!o.length)return De;const s=ze`${o.map(({r:e})=>{const o=this._isRoomSelectedAny(e.key,t),s=e.outline_pct.map(e=>e.x.toFixed(2)+","+e.y.toFixed(2)).join(" ");return ze`<polygon points=${s}
        fill=${o?"rgba(255,255,255,0.12)":"rgba(255,255,255,0.05)"}
        stroke=${o?"#ffffff":"rgba(255,255,255,0.35)"}
        stroke-width="0.35" stroke-linejoin="round"></polygon>`})}`;return Ee`<svg class="room-outline-layer" viewBox="0 0 100 100" preserveAspectRatio="none"
      style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;">${s}</svg>`}get _narrow(){const e=this._config.mobile_rotate;if("off"===e)return!1;if("always"===e||"on"===e)return!0;if(this._config.layout){const e="portrait"===this._profile?this._config.layout.portrait:this._config.layout.landscape,t=e?.crop?.mapOrientation;if("normal"===t)return!1;if("rotated"===t)return!0;const o=function shouldRotateMap(e,t,o){if(t<=4||o<=4||e<=0)return;const s=Math.min(t/e,o);return Math.min(t,o/e)>s}(this._mapAR,this._mapRegW,this._mapRegH);return void 0!==o?(this._lastRotate=o,o):this._lastRotate}return this._cardW>0&&this._cardW<500}get _flipEff(){if(null!==this._flipLive)return this._flipLive;if(!this._config.layout)return!1;const e="portrait"===this._profile?this._config.layout.portrait:this._config.layout.landscape;return!0===e?.crop?.flip}_toggleFlipLive(){this._flipLive=!this._flipEff,this._saveFlipLive()}get _stackTopology(){if("portrait"!==this._profile||!this._config.layout)return!1;const e=this._config.layout.portrait;if("split"===e?.topology||"rail"===e?.topology)return!1;if("stack"===e?.topology)return!0;if(e?.columns?.length||e?.rows?.length||e?.place&&Object.keys(e.place).length)return!1;const t=this._mapAR>.1?this._mapAR:3.636,o=function shouldStackLayout(e,t,o,s={}){const{dockWidthFrac:l=.28,dockMinPx:h=pt,dockHeightPx:d=150,stackBias:p=1.1}=s;if(t<=4||o<=4||e<=0)return;const u=t-Math.max(t*l,h),m=Math.min(u/e,o),_=Math.max(o-d,0);return!(m>Math.min(t/e,_)*p)}(this._narrow?1/t:t,this._mapAvailW,this._mapAvailH,this._themed()?{}:{stackBias:1.5,dockMinPx:0});return void 0!==o?(this._lastStack=o,o):this._lastStack}_renderResponsive(e){if(!this._config.layout){if(!this._narrow)return e;const t=this._mapAR>.1?this._mapAR:3.636,o=this._cardW||this.clientWidth||360,s=1.4*("undefined"!=typeof window?window.innerHeight:800),l=o*t,h=l>s?s/l:1,d=Math.round(o*h),p=Math.round(l*h);return Ee`
        <div class="avc-rot" style="position:relative;width:${d}px;height:${p}px;margin:0 auto;overflow:hidden;--map-rot:90deg">
          <div style="position:absolute;top:0;left:0;width:${p}px;height:${d}px;transform-origin:top left;transform:translateX(${d}px) rotate(90deg)">
            ${e}
          </div>
        </div>
      `}if(this._mapRegW<=4||this._mapRegH<=4)return e;const t=this._mapAR>.1?this._mapAR:3.636,o=this._mapRotationDeg(),s=90===o||270===o,l=s?1/t:t,h=this._config.layout[this._profile]?.crop,d="cover"===h?.fit;let p=this._mapRegW;const u=this._mapRegH;let m,_;this._isRail()&&this._mapAvailW>2*pt&&(p=Math.min(p,this._mapAvailW-this._gridGapPx-pt)),d?(m=Math.max(p,u*l),_=Math.max(u,m/l)):(m=Math.min(p,u*l),_=Math.min(u,m/l)),m=Math.floor(m),_=Math.floor(_);const f=-(m-p)/2+(h?.offset_x??0)/100*((m-p)/2),v=-(_-u)/2+(h?.offset_y??0)/100*((_-u)/2),b=!d&&"portrait"===this._profile,w=b?`width:${m}px;height:${_}px;margin:${Math.max(0,Math.floor((u-_)/2))}px auto 0`:`width:${p}px;height:${u}px;margin:0 auto`,$=b?"0px,0px":`${f}px,${v}px`;if(this._isRail()&&(this._lastPortraitFitW=m),0!==o){s&&(this._lastPortraitFitW=m);let t;return t=90===o?"transform-origin:top left;transform:translateX("+m+"px) rotate(90deg)":180===o?"transform-origin:center;transform:rotate(180deg)":"transform-origin:top left;transform:translateY("+_+"px) rotate(270deg)",Ee`
        <div class="avc-rot" style="position:relative;${w};overflow:hidden;--map-rot:${o}deg">
          <div style="position:absolute;top:0;left:0;width:100%;height:100%;transform:translate(${$})">
            <div style="position:absolute;top:0;left:0;width:${s?_:m}px;height:${s?m:_}px;${t}">
              ${e}
            </div>
          </div>
        </div>
      `}return Ee`
      <div style="position:relative;${w};overflow:hidden">
        <div style="position:absolute;top:0;left:0;width:${m}px;height:${_}px;transform:translate(${$})">
          ${e}
        </div>
      </div>
    `}_renderMergedMap(){const e=this._shownOrdered().map(e=>this._config.vacuums[e]);if(!e.length)return De;const t=e.find(e=>e.image_base?.src)??e[0],o=this._config.image_base??t.image_base,s=!!o?.src,l=this._config.base_height??t.base_height,h="number"==typeof l&&l>0,d=h?"map-wrap--fixed":s?"map-wrap--image":"",p=Ue(h?{height:(l??0)+"px"}:{});return Ee`
      <div class="map-wrap ${d}" style=${p}>
        ${s?Ee`
          <img class="${"image-base-img"+(h?" image-base-img--fit":"")}" src=${o.src} alt="Floorplan" @load=${this._onFloorplanLoad}
            style=${Ue({transform:"translate("+(o?.offset_x??0)+"%,"+(o?.offset_y??0)+"%) rotate("+(o?.rotation??0)+"deg) scale("+(o?.scale??100)/100+")"})} />
        `:De}
        ${e.map((e,t)=>{const o=this._mapEntityFor(e),l=o?this._mapUrl(o):null;if(!l)return De;const h=this._effectiveSeat(e),d=s||t>0;return Ee`<img class="map-img ${d?"map-img--overlay":""}" src=${l} alt="Vacuum map"
            data-entity=${e.entity}
            style=${Ue({left:50+h.offset_x+"%",top:50+h.offset_y+"%",width:h.scale+"%",transform:"translate(-50%,-50%) "+seatRotateScaleCss(h.rotation,h.scale,h.scaleY),opacity:e.hide_map?"0":String((e.overlay_opacity??(d?55:100))/100),mixBlendMode:e.overlay_blend??"normal"})} />`})}
        ${e.map(e=>{if(!this._intAttrs(e))return De;const t=this._homeFrameCropFor(e);if(t)return this._renderHomeFrameOverlay(e,t,"paths");const o=this._homeAnchorFitFor(e,this._wrapAspect(this._baseHeightFor(e)));return o?this._renderHomeAnchorOverlay(e,o.fit,o.dims,this._wrapAspect(this._baseHeightFor(e)),"paths"):this._renderIntegrationOverlay(e,this._effectiveSeat(e),"paths")})}
        ${e.map(e=>{if(!this._intAttrs(e))return De;const t=this._homeFrameCropFor(e);if(t)return this._renderHomeFrameOverlay(e,t,"marker");const o=this._homeAnchorFitFor(e,this._wrapAspect(this._baseHeightFor(e)));return o?this._renderHomeAnchorOverlay(e,o.fit,o.dims,this._wrapAspect(this._baseHeightFor(e)),"marker"):this._renderIntegrationOverlay(e,this._effectiveSeat(e),"marker")})}
        ${this._config.layout?De:this._renderLayerToggles(e)}
        ${this._renderRoomOutlines(this._mergedRoomDefs(e),e)}
        ${this._renderMergedRooms(e)}
        ${this._renderStartSeqAvatars(this._mergedRoomDefs(e))}
        ${e.map(e=>"normal"!==this._mapMode&&this._isModeCandidate(e)||this._zoneRectShown&&this._hasZoneEditTarget(e)?Ee`<div class="map-clickcatch" style="touch-action:none"
              @click=${t=>this._onMapClick(e,t)}
              @pointerdown=${t=>this._onZoneDown(e,t)}
              @pointermove=${t=>this._onZoneMove(e,t)}
              @pointerup=${t=>this._onZoneUp(e,t)}></div>`:De)}
        ${e.map((e,t)=>{const o=this._zoneRectFor(e,0===t);return o?Ee`<div class="zone-rect" style=${Ue({left:Math.min(o.x0,o.x1)+"%",top:Math.min(o.y0,o.y1)+"%",width:Math.abs(o.x1-o.x0)+"%",height:Math.abs(o.y1-o.y0)+"%"})}>${this._renderZoneHandles()}</div>`:De})}
      </div>
    `}_renderMap(e){const t=e.base??(e.image_base?.src&&!e.map?.entity?"image":"map"),o=e.image_base,s=o?.src,l=this._mapEntityFor(e),h=l?this._mapUrl(l):null,d=("image"===t||"combined"===t)&&!!s,p=("map"===t||"combined"===t)&&!!h;if(!d&&!p)return De;const u=this._effectiveSeat(e),m="number"==typeof e.base_height&&e.base_height>0,_=m?"map-wrap--fixed":d?"map-wrap--image":"",f=Ue(m?{height:(e.base_height??0)+"px"}:{});return Ee`
      <div class="map-wrap ${_}" style=${f}>
        ${d?Ee`
          <img class="${"image-base-img"+(m?" image-base-img--fit":"")}" src=${s} alt="Floorplan" @load=${this._onFloorplanLoad}
            style=${Ue({transform:"translate("+(o?.offset_x??0)+"%,"+(o?.offset_y??0)+"%) rotate("+(o?.rotation??0)+"deg) scale("+(o?.scale??100)/100+")"})} />
        `:De}
        ${p?Ee`
          <img class="map-img ${d?"map-img--overlay":""}" src=${h} alt="Vacuum map"
            data-entity=${e.entity}
            style=${Ue({left:50+u.offset_x+"%",top:50+u.offset_y+"%",width:u.scale+"%",transform:"translate(-50%,-50%) "+seatRotateScaleCss(u.rotation,u.scale,u.scaleY),...e.hide_map?{opacity:"0"}:d?{opacity:String((e.overlay_opacity??55)/100),mixBlendMode:e.overlay_blend??"normal"}:{}})} />
        `:De}
        ${p?this._renderIntegrationOverlay(e,u):De}
        ${this._config.layout?De:this._renderLayerToggles([e])}
        ${(()=>{const t=this._roomsFor(e),o=!t.some(t=>this._isRoomSelected(t,e));return t.map(t=>this._renderRoomOverlay(t,e,{wholeHome:o}))})()}
        ${"normal"!==this._mapMode&&this._isModeCandidate(e)||this._zoneRectShown&&this._hasZoneEditTarget(e)?Ee`<div class="map-clickcatch" style="touch-action:none"
              @click=${t=>this._onMapClick(e,t)}
              @pointerdown=${t=>this._onZoneDown(e,t)}
              @pointermove=${t=>this._onZoneMove(e,t)}
              @pointerup=${t=>this._onZoneUp(e,t)}></div>`:De}
        ${(()=>{const t=this._zoneRectFor(e,!0);return t?Ee`<div class="zone-rect" style=${Ue({left:Math.min(t.x0,t.x1)+"%",top:Math.min(t.y0,t.y1)+"%",width:Math.abs(t.x1-t.x0)+"%",height:Math.abs(t.y1-t.y0)+"%"})}>${this._renderZoneHandles()}</div>`:De})()}
      </div>
    `}_roomAgeDotColors(e,t,o){const s=this._intRoomRec(t,e);if(s){const e=(o?.length?o:[t]).map(e=>this._vacCleanType(e)).reduce((e,t)=>({dry:e.dry||t.dry,wet:e.wet||t.wet}),{dry:!1,wet:!1}),l=[];if(e.dry){const e=this._ageDaysFromIso(s.dry);l.push({kind:"dry",color:this._colorForAgeDays(e),days:e})}if(e.wet){const e=this._ageDaysFromIso(s.wet);l.push({kind:"wet",color:this._colorForAgeDays(e),days:e})}return l}if(!e.last_clean_entity)return[];const l=this._roomAgeDays(e);return[{kind:"any",color:this._colorForAgeDays(l),days:l}]}_renderRoomLabel(e,t,o,s){const l=this._roomAgeDotColors(e,t,s),h=this._mapRotationDeg()%180!=0,d="none"===o;if(d&&!l.length)return De;const p=l.map(e=>("any"===e.kind?"":e.kind+" ")+this._ageBadgeStr(e.days)).join(" · ");return Ee`
      <span class="room-label ${h?"room-label--q":""} ${d?"room-label--dots":""}" title=${p}>
        ${d||this._config.room_icon_hidden||!e.icon?De:Ee`<ha-icon icon=${e.icon}></ha-icon>`}
        ${d?De:Ee`<span class="room-label-name">${e.name??e.key}</span>`}
        ${l.length?Ee`<span class="room-label-dots">${l.map(e=>Ee`<span class="room-label-dot" style=${Ue({background:e.color})}></span>`)}</span>`:De}
      </span>`}_renderRoomAgeDots(e,t){const o=this._intRoomRec(t,e);if(o){const e=this._vacCleanType(t);if(!e.dry&&!e.wet)return De;const s=this._ageDaysFromIso(o.dry),l=this._ageDaysFromIso(o.wet);return Ee`
        <span class="room-age-dots">
          ${e.dry?Ee`<span class="room-age-dot" style=${Ue({background:this._colorForAgeDays(s)})}></span>`:De}
          ${e.wet?Ee`<span class="room-age-dot" style=${Ue({background:this._colorForAgeDays(l)})}></span>`:De}
        </span>
      `}return e.last_clean_entity?Ee`
      <span class="room-age-dots">
        <span class="room-age-dot" style=${Ue({background:this._colorForAgeDays(this._roomAgeDays(e))})}></span>
      </span>
    `:De}_onRoomPointerDown(e,t){return o=>{t||(o.preventDefault(),this._cancelHold(),this._holdId="room-"+e.key,this._holdTimer=setTimeout(()=>{this._holdTimer=null,this._holdId=null,this._inspectKey=this._inspectKey===e.key?null:e.key},Ze))}}_onRoomPointerUp(e,t,o,s){return()=>{if(!s)if(null!==this._holdTimer){if(this._cancelHold(),null!==this._inspectKey)return void(this._inspectKey=null);o?this._toggleRoomAcross(e.key,o):this._toggleRoom(e,t)}else this._holdId=null}}_renderRoomInspect(e,t,o,s){const l=this._intRoomRec(t,e),h=this._ageDaysFromIso(l?.dry),d=this._ageDaysFromIso(l?.wet),badge=e=>null===e?"—":e<1?"<1d":Math.round(e)+"d",p=o?this._planPreview?.dry.get(e.key):void 0,u=o?this._planPreview?.wet.get(e.key):void 0,m=this._pinCandidates(e.key,"dry").length>1,_=this._pinCandidates(e.key,"wet").length>1,pinTap=(t,o)=>("dry"===t?m:_)?s=>{s.stopPropagation(),this._cycleRoomPin(e.key,t,o)}:void 0;return Ee`
      <div class="room-inspect" style=${Ue({left:(e.map_x??0)+"%",top:(e.map_y??0)+"%"})}
        @click=${e=>e.stopPropagation()}>
        <div class="room-inspect-inner">
          <div class="room-inspect-name">${e.name??e.key}</div>
          <div class="room-inspect-ages">
            <span class="dock-age"><ha-icon icon="mdi:broom"></ha-icon><b style=${Ue({color:this._colorForAgeDays(h)})}>${badge(h)}</b></span>
            <span class="dock-age"><ha-icon icon="mdi:water"></ha-icon><b style=${Ue({color:this._colorForAgeDays(d)})}>${badge(d)}</b></span>
          </div>
          ${p||u?Ee`
            <div class="dock-avatars">
              ${p?this._vacChip(p,pinTap("dry",p)):De}
              ${u?this._vacChip(u,pinTap("wet",u)):De}
            </div>`:De}
        </div>
      </div>
    `}_roomFill(){const e=this._jobProgress();if(e===this._fillJp&&this._fillMap)return this._fillMap;this._fillJp=e;const t=new Map;if(!e||!Array.isArray(e.rooms))return this._doneSeen=null,this._sheenRooms.clear(),this._fillMap=t,t;const o=new Map;for(const t of e.rooms){if("string"!=typeof t?.room)continue;const e=o.get(t.room)??[];e.push(t),o.set(t.room,e)}const colorOf=e=>{const t=this._config.vacuums.find(t=>t.entity===e);return t?this._color(t):"#8a8f98"},s=null===this._doneSeen,l=this._doneSeen??new Set;for(const[e,h]of o){const o=h.every(e=>"done"===e.state),d=h.reduce((e,t)=>e+("done"===t.state?100:Math.max(0,Math.min(100,Number(t.pct)||0))),0),p=h.find(e=>"active"===e.state)??[...h].reverse().find(e=>"done"===e.state)??h[0];o&&!l.has(e)&&(l.add(e),s||this._sheenRooms.add(e)),t.set(e,{frac:d/(100*h.length),done:o,color:colorOf(p?.vacuum),sheen:this._sheenRooms.has(e)})}return this._doneSeen=l,this._fillMap=t,t}_renderRoomFill(e){const t=this._roomFill().get(e.key)??(e.name?this._roomFill().get(e.name):void 0);if(!t||!t.done&&t.frac<=0)return De;const o=t.done?.22:.04+.18*t.frac;return Ee`<span class="room-fill ${t.done?"room-fill--done":""}" style=${Ue({background:t.color,opacity:o.toFixed(3)})}></span>${t.sheen?Ee`<span class="room-sheen"></span>`:De}`}_renderRoomOverlay(e,t,o){const s=o?.vacs?this._isRoomSelectedAny(e.key,o.vacs):this._isRoomSelected(e,t),l=!s&&!!o?.wholeHome,h="rgba(255,255,255,0.22)",d=e.icon_anchor??"c",p="normal"!==this._mapMode,u="#ffffff",m="linear-gradient(135deg, #ffffff 0%, #ffffff 46%, #8ecbff 50%, #ffffff 54%, #ffffff 100%) 1";if(void 0!==e.map_w&&void 0!==e.map_h){const _={tl:["flex-start","flex-start"],t:["center","flex-start"],tr:["flex-end","flex-start"],l:["flex-start","center"],c:["center","center"],r:["flex-end","center"],bl:["flex-start","flex-end"],b:["center","flex-end"],br:["flex-end","flex-end"]},[f,v]=_[d]??["center","center"],b=this._themed(),w=(s?this._config.room_border_selected??4:l&&!b?Math.max(3,this._config.room_border_normal??2):this._config.room_border_normal??2)+"px";let $=s?u+"E0":l?"rgba(255,255,255,0.75)":h,C=s?u+"22":l?"rgba(255,255,255,0.16)":"rgba(0,0,0,0.06)",A=s?"0 0 18px rgba(255,255,255,0.7)":l?"0 0 10px rgba(255,255,255,0.4)":"none";b&&($=s?"rgb(var(--avc-accent-rgb))":h,C=s?"rgba(var(--avc-accent-rgb), 0.14)":"rgba(0,0,0,0.04)",A=s?"inset 0 0 22px rgba(var(--avc-accent-rgb), 0.32)":"none");const P=s?this._planPreview?.dry.get(e.key):void 0,F=s?this._planPreview?.wet.get(e.key):void 0,E="room-"+e.key;return Ee`
        <button
          class="room-overlay ${p?"room-overlay--locked":""} ${this._holdId===E?"room-overlay--holding":""}"
          ?disabled=${p}
          style=${Ue({left:(e.map_x??0)+"%",top:(e.map_y??0)+"%",width:e.map_w+"%",height:e.map_h+"%",border:w+" solid "+$,borderImage:s&&!b?m:"none",background:C,boxShadow:A,justifyContent:f,alignItems:v})}
          @pointerdown=${this._onRoomPointerDown(e,p)}
          @pointerup=${this._onRoomPointerUp(e,t,o?.vacs,p)}
          @pointerleave=${this._holdEnd}
          @pointercancel=${this._holdEnd}
          title=${p?"Room selection is off while placing a pin/zone":e.name} aria-label=${e.name}
          aria-pressed=${s?"true":"false"}
        >
          ${b?this._renderRoomFill(e):De}
          ${this._startSeq?.delay.has(e.key)?Ee`<span class="room-seq"
              style=${Ue({animationDelay:this._startSeq.delay.get(e.key)+"s"})}></span>`:De}
          <div class="hold-ring"></div>
          ${b?this._renderRoomLabel(e,t,d,o?.vacs):Ee`
            ${!this._config.room_icon_hidden&&"none"!==d&&e.icon?Ee`
              <ha-icon icon=${e.icon}
                style=${Ue({color:s?"white":"rgba(255,255,255,0.55)","--mdc-icon-size":"16px"})}>
              </ha-icon>
            `:De}
            ${this._renderRoomAgeDots(e,t)}`}
          ${P||F?(()=>{const e=this._mapRotationDeg(),t=90===e?{top:"0%",left:"100%"}:180===e?{top:"0%",left:"0%"}:270===e?{top:"100%",left:"0%"}:{top:"100%",left:"100%"},o=e*Math.PI/180,s=(-2*(Math.cos(o)+Math.sin(o))).toFixed(2),l=(-2*(Math.cos(o)-Math.sin(o))).toFixed(2);return Ee`
                <span class="room-overlay-assign-anchor ${e%180!=0?"room-overlay-assign-anchor--q":""}" style=${Ue(t)}>
                  <span class="room-overlay-assign"
                    style=${Ue({transform:`translate(${s}px, ${l}px) rotate(calc(-1 * var(--map-rot)))`})}>
                    ${P?this._vacChip(P):De}
                    ${F?this._vacChip(F):De}
                  </span>
                </span>
              `})():De}
          ${this._renderRoomGauge(o?.vacs??[t],e)}
        </button>
        ${this._inspectKey===e.key?this._renderRoomInspect(e,t,s,o):De}
      `}const _=s?u+"A8":l?"rgba(255,255,255,0.32)":"rgba(0,0,0,0.55)",f=s?"0 0 12px rgba(255,255,255,0.8)":l?"0 0 8px rgba(255,255,255,0.45)":"none",v="room-"+e.key;return Ee`
      <button
        class="room-btn ${p?"room-overlay--locked":""} ${this._holdId===v?"room-overlay--holding":""}"
        ?disabled=${p}
        style=${Ue({left:(e.map_x??0)+"%",top:(e.map_y??0)+"%",background:_,border:"4px solid "+(s?u:l?"rgba(255,255,255,0.7)":h),borderImage:s?m:"none",boxShadow:f})}
        @pointerdown=${this._onRoomPointerDown(e,p)}
        @pointerup=${this._onRoomPointerUp(e,t,o?.vacs,p)}
        @pointerleave=${this._holdEnd}
        @pointercancel=${this._holdEnd}
        title=${p?"Room selection is off while placing a pin/zone":e.name} aria-label=${e.name}
        aria-pressed=${s?"true":"false"}
      >
        <div class="hold-ring"></div>
        ${this._config.room_icon_hidden?De:Ee`
          <ha-icon icon=${e.icon||"mdi:square"}
            style=${Ue({color:s?"white":"rgba(255,255,255,0.5)"})}>
          </ha-icon>
        `}
        ${this._renderRoomAgeDots(e,t)}
        ${this._renderRoomGauge(o?.vacs??[t],e)}
      </button>
      ${this._inspectKey===e.key?this._renderRoomInspect(e,t,s,o):De}
    `}_renderStatusRow(e){const[t,o,s]=this._statusInfo(e),l=this._battery(e),h=this._lastCleanStr(e),d=e.name??e.entity.split(".")[1]??e.entity,p=this._progress(e),u=this._ent(e,"current_room"),m=u?this.hass.states[u]?.state:null,_=m&&"unknown"!==m&&"unavailable"!==m?m:null,f=this._ent(e,"error"),v=f?this.hass.states[f]?.state:null,b=this._hasError(e);return Ee`
      ${b?Ee`
        <div class="error-row">
          <ha-icon icon="mdi:alert-circle" style="color:rgb(var(--avc-err-rgb))"></ha-icon>
          <span style="color:rgb(var(--avc-err-rgb));font-size:11px;font-weight:600">${v}</span>
        </div>
      `:De}
      <div class="status-line1">
        <span class="model-label">${d}</span>
        <span class="status-label" style=${Ue({color:o})}>
          <ha-icon class="status-icon" icon=${s}></ha-icon>${t}${null!==p?Ee` &middot; ${p}&thinsp;%`:De}
        </span>
      </div>
      <div class="status-line2">
        ${_?Ee`
          <span class="current-room">
            <ha-icon icon="mdi:map-marker" style="--mdc-icon-size:12px;color:rgba(var(--avc-ink-rgb),0.4)"></ha-icon>
            ${_}
          </span>
        `:Ee`<span></span>`}
        <span class="status-meta">
          ${null!==l?Ee`
            <span class="battery">
              <ha-icon icon=${this._batIcon(l)} style=${Ue({color:this._batColor(l)})}></ha-icon>
              <span style=${Ue({color:this._batColor(l)})}>${l}&thinsp;%</span>
            </span>
          `:De}
          <span class="last-clean">
            <ha-icon icon="mdi:history"></ha-icon>
            <span>${h}</span>
          </span>
        </span>
      </div>
    `}_renderProgress(e){const t=this._progress(e);if(null===t)return De;const o=this._color(e);return Ee`
      <div class="progress">
        <div class="progress-track">
          <div class="progress-fill" style=${Ue({width:t+"%",background:o})}></div>
        </div>
        <span class="progress-label" style=${Ue({color:o})}>${t}&thinsp;%</span>
      </div>
    `}_renderActions(e,t){const o=this._color(e),s=this._pinPending?.[e.entity],l=this._zonePending?.[e.entity];if(s||l){const s="modeaction-"+t,h=l?"Clean zone":"Send here",d=l?"mdi:select-drag":"mdi:map-marker-radius",action=()=>{l?this._confirmZone(e):this._confirmPin(e)};return Ee`
        <div class="actions">
          <button
            class="action-btn ${this._holdId===s?"action-btn--holding":""}"
            style=${Ue({background:this._colorBg(e),border:"1px solid "+o+"80"})}
            @pointerdown=${this._holdStart(s,action)}
            @pointermove=${this._holdMove}
            @pointerup=${this._holdEnd}
            @pointerleave=${this._holdEnd}
            @pointercancel=${this._holdEnd}
          >
            <div class="hold-ring"></div>
            <ha-icon icon=${d} style=${Ue({color:o})}></ha-icon>
            <span>${h}</span>
          </button>
        </div>
      `}const h=this._isCleaning(e),d=this._isPaused(e),p=this._hasSelectedRooms(e),u=this._totalCleanMins(e),m=this._timeStr(u);if(d){const s="resume-"+t;return Ee`
        <div class="actions">
          <button
            class="action-btn ${this._holdId===s?"action-btn--holding":""}"
            style=${Ue({background:this._colorBg(e),border:"1px solid "+o+"80"})}
            @pointerdown=${this._holdStart(s,()=>this._resume(e))}
            @pointermove=${this._holdMove}
            @pointerup=${this._holdEnd}
            @pointerleave=${this._holdEnd}
            @pointercancel=${this._holdEnd}
          >
            <div class="hold-ring"></div>
            <ha-icon icon="mdi:play" style=${Ue({color:o})}></ha-icon>
            <span>Resume</span>
          </button>
          <button
            class="action-btn action-btn--secondary"
            @click=${()=>this._dock(e)}
          >
            <ha-icon icon="mdi:home" style="color:rgba(var(--avc-info-rgb),0.6)"></ha-icon>
            <span>Dock</span>
          </button>
        </div>
      `}if(h){const o="pause-"+t;return Ee`
        <div class="actions">
          <button
            class="action-btn action-btn--warn ${this._holdId===o?"action-btn--holding":""}"
            @pointerdown=${this._holdStart(o,()=>this._pause(e))}
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
      `}const _="start-"+t,f=p?this._colorBg(e):"var(--avc-disabled)",v=p?"1px solid "+o+"80":"1px solid rgba(var(--avc-ink-rgb),0.1)",b=p?o:"rgba(var(--avc-ink-rgb),0.2)",w=p?"rgb(var(--avc-ink-rgb))":"rgba(var(--avc-ink-rgb),0.25)",$=this._roomsFor(e),C=$.filter(t=>this._isRoomSelected(t,e)).length,A=[$.length>0?`${C}/${$.length} rooms`:"",m].filter(Boolean).join(" · ");return Ee`
      <div class="actions actions--idle">
        ${this._renderPresetChips(e)}
        <button
          class="action-btn ${p&&this._holdId===_?"action-btn--holding":""}"
          style=${Ue({background:f,border:v,flex:"1"})}
          ?disabled=${!p}
          @pointerdown=${p?this._holdStart(_,()=>this._startClean(e)):De}
          @pointermove=${this._holdMove}
          @pointerup=${this._holdEnd}
          @pointerleave=${this._holdEnd}
          @pointercancel=${this._holdEnd}
        >
          <div class="hold-ring"></div>
          <ha-icon icon="mdi:play" style=${Ue({color:b})}></ha-icon>
          <div class="start-body">
            <span style=${Ue({color:w})}>${p?"START":"Select rooms"}</span>
            ${A?Ee`<small style="color:rgba(var(--avc-ink-rgb),0.4)">${A}</small>`:De}
          </div>
        </button>
      </div>
    `}_jobProgress(){for(const e of this._config.vacuums){const t=this._intAttrs(e)?.job_progress;if(t?.active)return t}return null}_clockStr(e){if(!e)return"";const t=new Date(e);return isNaN(t.getTime())?"":t.toLocaleTimeString(this.hass?.language||[],{hour:"2-digit",minute:"2-digit"})}_vacName(e){return e.name??e.entity.split(".")[1]??e.entity}_renderBattRing(e,t){const o=this._battery(e),s="charging"===(this.hass.states[this._ent(e,"status")??e.entity]?.state??""),l=t/2-2.5,h=2*Math.PI*l,d=o??0,p=null===o?"rgba(var(--avc-ink-rgb),0.2)":d<=20?"rgb(var(--avc-err-rgb))":d<=40?"rgb(var(--avc-warn-rgb))":"rgb(var(--avc-ok-rgb))",u=t-10;return Ee`
      <span class="batt-ring" style=${Ue({width:t+"px",height:t+"px"})}
        title=${null!==o?`Battery ${o} %`:""}>
        <svg width=${t} height=${t} viewBox="0 0 ${t} ${t}" aria-hidden="true">
          <circle cx=${t/2} cy=${t/2} r=${l} fill="none" style="stroke: rgba(var(--avc-ink-rgb),0.1)" stroke-width="3"></circle>
          ${null!==o?ze`<circle class=${s?"batt-ring-arc batt-ring-arc--charging":"batt-ring-arc"} cx=${t/2} cy=${t/2} r=${l} fill="none"
            style=${"stroke: "+p} stroke-width="3" stroke-linecap="round"
            stroke-dasharray="${(h*d/100).toFixed(1)} ${h.toFixed(1)}"></circle>`:De}
        </svg>
        ${e.image?Ee`<img src=${e.image} alt="" style=${Ue({width:u+"px",height:u+"px"})}>`:Ee`<ha-icon icon="mdi:robot-vacuum" style=${Ue({color:this._color(e),"--mdc-icon-size":.6*u+"px"})}></ha-icon>`}
        ${s?Ee`<span class="batt-ring-bolt"><ha-icon icon="mdi:lightning-bolt"></ha-icon></span>`:De}
      </span>`}_renderHero(e){const t=e.filter(e=>this._intAttrs(e));if(!t.length)return De;const o=this._jobProgress();if(o){const e=Number(o.rooms_done??0),t=Math.max(1,Number(o.rooms_total??0)),s=Math.round(100*e/t),l=17,h=2*Math.PI*l,d=Object.entries(o.vacuums??{}).filter(([,e])=>e?.room).map(([e,t])=>{const o=this._config.vacuums.find(t=>t.entity===e);return`${o?this._vacName(o):e.split(".")[1]} ${"wet"===t.kind?"mopping":"in"} ${t.room}`}),p=Math.round(Number(o.eta_min_left??0));return Ee`
        <div class="meta-hero">
          <span class="hero-ring" aria-hidden="true">
            <svg width="40" height="40" viewBox="0 0 40 40">
              <circle cx="20" cy="20" r=${l} fill="none" style="stroke: rgba(var(--avc-ink-rgb),0.1)" stroke-width="3.5"></circle>
              <circle cx="20" cy="20" r=${l} fill="none" style="stroke: rgb(var(--avc-accent-rgb))" stroke-width="3.5" stroke-linecap="round"
                stroke-dasharray="${(h*s/100).toFixed(1)} ${h.toFixed(1)}" transform="rotate(-90 20 20)"></circle>
            </svg>
            <b>${e}/${o.rooms_total??0}</b>
          </span>
          <span class="hero-text">
            <span class="hero-title">Cleaning · done around ${this._clockStr(o.finish_at)}</span>
            <span class="hero-sub">${p} min left${d.length?" · "+d.join(" · "):""}</span>
          </span>
        </div>`}const s=e.filter(e=>this._isCleaning(e)),age=e=>{const o=this._oldestAgeDays(t,e);return null===o?null:o<1?"today":Math.round(o)+" d ago"},l=age("dry"),h=age("wet"),d=[l?"vacuumed "+l:"",h?"mopped "+h:""].filter(Boolean).join(" · ");return Ee`
      <div class="meta-hero">
        <span class="hero-badge"><ha-icon icon=${s.length?"mdi:broom":"mdi:home-outline"}></ha-icon></span>
        <span class="hero-text">
          <span class="hero-title">${s.length?s.map(e=>this._vacName(e)).join(", ")+(s.length>1?" are":" is")+" cleaning":"Home is calm"}</span>
          ${d?Ee`<span class="hero-sub">Oldest room: ${d}</span>`:De}
        </span>
      </div>`}_renderRobotSheet(){const e=this._robotSheet;if(null===e)return De;const t=this._config.vacuums[e];if(!t)return De;const o=this._vacName(t),[s,l,h]=this._statusInfo(t),d=this._battery(t),close=()=>{this._robotSheet=null},p=this._roomsFor(t).filter(e=>this._isRoomSelected(e,t)),u=this._totalCleanMins(t),m=this._dockCaps(t).hasDock||this._careItems(t).length>0;return Ee`
      <div class="robot-sheet-scrim" @click=${close}></div>
      <div class="robot-sheet" role="dialog" aria-modal="true" aria-label="${o} controls"
        @keydown=${e=>{"Escape"===e.key&&close()}}>
        <span class="robot-sheet-grip" aria-hidden="true"></span>
        <div class="robot-sheet-head">
          ${this._renderBattRing(t,60)}
          <span class="robot-sheet-id">
            <span class="robot-sheet-name">${o}</span>
            <span class="tile-status" style=${Ue({color:l})}>
              <ha-icon icon=${h}></ha-icon>${s}${null!==d?Ee` · ${d}&thinsp;%`:De}
            </span>
            <span class="tile-sub">Last clean ${this._lastCleanStr(t)}</span>
          </span>
          <button class="robot-sheet-icon" aria-label="Open ${o} in Home Assistant" title="Home Assistant details"
            @click=${()=>this._fireMoreInfo(t.entity)}><ha-icon icon="mdi:information-outline"></ha-icon></button>
          <button class="robot-sheet-icon" aria-label="Close" @click=${close}><ha-icon icon="mdi:close"></ha-icon></button>
        </div>
        <div class="robot-sheet-rooms">
          <span class="robot-sheet-label">Rooms</span>
          <span>${p.length?Ee`${p.map(e=>e.name??e.key).join(", ")}${u?Ee` <small>· ${this._timeStr(u)}</small>`:De}`:Ee`<small>Pick rooms on the map first</small>`}</span>
        </div>
        ${this._renderActions(t,e)}
        <div class="robot-sheet-foot">
          <button class="mtbtn" @click=${()=>this._dock(t)}><ha-icon icon="mdi:home-import-outline"></ha-icon><span>Send to dock</span></button>
          ${m?Ee`<button class="mtbtn" @click=${()=>{const e=this._config.vacuums.filter(e=>this._dockCaps(e).hasDock||this._careItems(e).length>0);this._dockSheetIdx=Math.max(0,e.indexOf(t)),this._dockSheetOpen=!0,close()}}>
            <ha-icon icon="mdi:toolbox-outline"></ha-icon><span>Care &amp; dock</span></button>`:De}
        </div>
      </div>`}_renderStatusCard(e,t){const o=this._isCleaning(e),s=this._isPaused(e),l=this._color(e),h=this._vacName(e),[d,p,u]=this._statusInfo(e),m=this._battery(e),_=this._jobProgress(),f=(_?.vacuums??{})[e.entity],v=this._ent(e,"current_room"),b=v?this.hass.states[v]?.state:void 0,w=f?.room??(b&&"unknown"!==b&&"unavailable"!==b?b:void 0)??this._intAttrs(e)?.vacuum_room_name,$="number"==typeof f?.pct?f.pct:this._progress(e),C=this._ent(e,"error"),A=this._hasError(e)?this.hass.states[C]?.state:null,P=A||(o&&f?.next_room?"Next: "+f.next_room:"Last clean "+this._lastCleanStr(e)),F=!!(this._pinPending?.[e.entity]||this._zonePending?.[e.entity]||s),E="pause-"+t,T=o&&!F;return Ee`
      <div class="status-card status-tile ${o?"status-tile--live":""}" style=${Ue({border:o?"1.5px solid "+l:"1px solid var(--avc-panel-line)"})}>
        <div class="tile-row">
        <button class="tile-main" aria-label="${h} — open controls" @click=${()=>{this._robotSheet=t}}>
          ${this._renderBattRing(e,50)}
          <span class="tile-text">
            <span class="tile-name"><span class="tile-dot" style=${Ue({background:l})}></span>${h}</span>
            <span class="tile-status" style=${Ue({color:A?"rgb(var(--avc-err-rgb))":p})}>
              <ha-icon icon=${A?"mdi:alert-circle-outline":u}></ha-icon>${d}${w?Ee`<span class="tile-room"> · ${w}</span>`:De}
            </span>
            <span class="tile-sub">${P}</span>
          </span>
          <span class="tile-right">
            ${o&&null!==$?Ee`
              <b>${$}&thinsp;%</b>
              <span class="tile-bar"><span style=${Ue({width:Math.min(100,$)+"%",background:l})}></span></span>`:null!==m?Ee`<small>${m}&thinsp;%</small>`:De}
          </span>
          <ha-icon class="tile-chev" icon="mdi:chevron-right"></ha-icon>
        </button>
        ${T?Ee`<button class="tile-pause ${this._holdId===E?"action-btn--holding":""}"
            aria-label="Pause ${h} (hold)" title="Hold to pause"
            @pointerdown=${this._holdStart(E,()=>this._pause(e))}
            @pointermove=${this._holdMove}
            @pointerup=${this._holdEnd}
            @pointerleave=${this._holdEnd}
            @pointercancel=${this._holdEnd}>
            <div class="hold-ring"></div><ha-icon icon="mdi:pause"></ha-icon>
          </button>`:De}
        </div>
        ${F?this._renderActions(e,t):De}
        ${this._renderDebugProgress(e)}
      </div>
    `}_renderMiniGauge(e,t,o,s){return Ee`
      <span class="mini-gauge-wrap">
        <ha-icon class="mini-gauge-ico" icon=${o} style=${Ue({color:t})}></ha-icon>
        <span class="mini-gauge" style=${Ue({background:`conic-gradient(${t} ${3.6*e}deg, rgba(var(--avc-ink-rgb),0.12) 0)`})}>
          <span>${e}${s?"~":""}</span>
        </span>
      </span>`}_currentRoomName(e){return this._intAttrs(e)?.vacuum_room_name}_mmss(e){const t=Math.max(0,Math.round(e));return`${Math.floor(t/60)}:${String(t%60).padStart(2,"0")}`}_renderDebugProgress(e){if(!this._config.debug_room_progress)return De;const t=this._roomsFor(e).map(t=>({r:t,p:this._roomProgress(e,t)})).filter(e=>e.p&&(null!=e.p.dry_pct||null!=e.p.wet_pct||null!=e.p.elapsed_s));if(!t.length)return De;const o=this._color(e),s=this._intEntity(e),l=s?Date.parse(this.hass.states[s]?.last_updated??""):NaN,h=this._currentRoomName(e),d=this._isCleaning(e),p=this._isPaused(e),u=!d&&!p||isNaN(l)?0:Math.max(0,(this._now-l)/1e3);return Ee`
      <div class="dbg-prog">
        ${t.map(({r:e,p:t})=>{const s=(e.key===h||e.name===h)&&(d||p),l=(t.elapsed_s??0)+(s?u:0);let m=t.est_s??null;s&&p&&null!=m&&(m+=u);const _=null!=m?`${this._mmss(l)}/${this._mmss(m)}`:this._mmss(l);return Ee`
            <span class="dbg-prog-item" title=${`dry ${t.dry_pct??"—"}% · wet ${t.wet_pct??"—"}%`}>
              ${e.icon?Ee`<ha-icon icon=${e.icon}></ha-icon>`:De}
              <span class="dbg-prog-name">${e.name??e.key}</span>
              ${null!=t.dry_pct?this._renderMiniGauge(t.dry_pct,o,"mdi:broom",!!t.dry_calibrating):De}
              ${null!=t.wet_pct?this._renderMiniGauge(t.wet_pct,"rgb(var(--avc-info-rgb))","mdi:water",!!t.wet_calibrating):De}
              ${null!=t.elapsed_s?Ee`<small>${_}</small>`:De}
            </span>
          `})}
      </div>
    `}_shownOrdered(){return[...this._shownSet].filter(e=>e<this._config.vacuums.length).sort((e,t)=>e-t)}_gridShown(){const e=this._shownOrdered();return"portrait"===this._profile&&"merged"!==this._config.map_mode&&e.length>1?e.slice(0,1):e}_regionTemplate(e,t){const o=this._gridShown(),s="merged"===this._config.map_mode,vacsOf=e=>e.map(e=>this._config.vacuums[e]);switch(e){case"badges":return Ee`<div class="badges-row badges-row--grid">
          ${"landscape"===this._profile?De:this._config.vacuums.map((e,t)=>this._renderBadge(e,t))}
          ${(this._config.global_actions??[]).map((e,t)=>this._renderGlobalBadge(e,t))}
        </div>`;case"autobar":return this._renderAutoBar();case"plan":return this._renderPlanPreview();case"picker":return this._renderVacuumPicker();case"map":return s?this._renderResponsive(this._renderMergedMap()):Ee`${o.map(e=>this._renderResponsive(this._renderMap(this._config.vacuums[e])))}`;case"tools":return this._renderMetaBar(vacsOf(o));case"hero":{const e=this._renderHero(this._config.vacuums);return e===De?De:Ee`<div class="meta-bar meta-bar--hero">${e}</div>`}case"dock":return this._renderDock(!("start"in t.place),"landscape"===this._profile&&!("picker"in t.place));case"start":return this._renderStartBar();case"status":return Ee`${o.map(e=>this._renderStatusCard(this._config.vacuums[e],e))}`;default:return null}}_themed(){return"legacy"!==(this._config.theme??at)}_rootClasses(){const e=this._config.theme??at,t=[];return"legacy"!==e&&t.push("avc-theme","avc-theme--"+e),this._config.reduce_motion&&t.push("avc-still"),this._isCalm()&&t.push("avc-calm"),t.join(" ")}_rootVars(){const e=this._config.accent;if(!e)return{};const t=function hexToRgbChannel(e){const t=/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(e.trim());if(!t)return null;let o=t[1];return 3===o.length&&(o=o.split("").map(e=>e+e).join("")),[0,2,4].map(e=>parseInt(o.slice(e,e+2),16)).join(", ")}(e);return t?{"--avc-accent-rgb":t}:{}}_isCalm(){if(!1===this._config.calm_state)return!1;if("normal"!==this._mapMode)return!1;if(this._dockSheetOpen||this._modeSheetOpen)return!1;const e=this._config.vacuums;return!e.some(e=>this._isCleaning(e)||this._hasError(e))&&!this._allRoomKeys().some(t=>this._isRoomSelectedAny(t,e))}_renderGrid(e){const t="portrait"===this._profile&&this._stackTopology;let o=t?ut:function resolveProfile(e,t){const o=e[t]??{},s=mt[t];return{columns:o.columns?.length?o.columns:s.columns,rows:o.rows?.length?o.rows:s.rows,place:o.place&&Object.keys(o.place).length?o.place:s.place}}(e,this._profile);const s="hero"in o.place?this._regionTemplate("hero",o):De;null!=s&&s!==De||(o=function withoutRegion(e,t){const o=e.place[t];if(!o)return e;const s={...e.place};delete s[t];const l="number"==typeof o.row?o.row:Number(o.row);if(!Number.isInteger(l)||l<1||l>e.rows.length)return{...e,place:s};const lines=e=>{if(void 0===e)return null;const t=String(e).split("/").map(e=>Number(e.trim()));return t.every(e=>Number.isInteger(e)&&e>0)?t:null};for(const t of Object.values(s)){const o=lines(t.row);if(!o)return{...e,place:s};const h=o[0],d=o.length>1?o[1]:h+1;if(h<=l&&d>l)return{...e,place:s}}const shift=e=>e>l?e-1:e,h={};for(const[e,t]of Object.entries(s)){const o=lines(t.row);h[e]={...t,row:o.length>1?o.map(shift).join("/"):shift(o[0])}}return{...e,rows:e.rows.filter((e,t)=>t!==l-1),place:h}}(o,"hero"));const l=this._schemaWarning();return Ee`
      <ha-card class=${this._rootClasses()} style=${Ue({padding:"0",display:"block",...this._rootVars()})}>
        ${this.editMode?Ee`<div class="version-chip">
          <div>v${Xe} · ${Math.round(this._cardW)}w · ${this._profile}</div>
          ${this._config.debug?Ee`<div>${t?"stack":this._themed()?"rail":"split"} · box:${Math.round(this._mapAvailW)}x${Math.round(this._mapAvailH)}</div>`:De}
        </div>`:De}
        <div class="avc-grid avc-grid--${this._profile}" style=${Ue(function gridRootStyles(e,t){return{display:"grid",width:"100%",height:resolveHeightCss(e),alignContent:"start",gridTemplateColumns:trackList(t.columns),gridTemplateRows:trackList(t.rows),gap:e.gap??"6px",boxSizing:"border-box"}}(e,o))}>
          ${l?Ee`<div class="avc-schemawarn">
            <ha-icon icon="mdi:alert" style="--mdc-icon-size:18px"></ha-icon><span>${l}</span>
          </div>`:De}
          ${Object.entries(o.place).map(([e,t])=>{const l="hero"===e?s:this._regionTemplate(e,o);return null==l||l===De?De:Ee`<div class="avc-region avc-region--${e}" style=${Ue(function regionStyles(e){const t={gridRow:String(e.row??"auto"),gridColumn:String(e.col??"1"),overflow:e.overflow??"hidden",position:"relative",minWidth:"0",minHeight:"0"};return e.align&&"stretch"!==e.align&&(t.alignSelf=e.align),t}(t))}>${l}</div>`})}
        </div>
        ${this._renderRobotSheet()}
      </ha-card>
    `}render(){if(!this._config||!this.hass)return De;if(this._config.layout)return this._renderGrid(this._config.layout);const e=this._schemaWarning();return Ee`
      <ha-card class=${this._rootClasses()} style=${Ue(this._rootVars())}>
        ${this.editMode?Ee`<div class="version-chip">v${Xe} · ${Math.round(this._cardW)}w</div>`:De}
        ${e?Ee`<div style="margin:0 4px;padding:8px 12px;border-radius:12px;border:1px solid rgba(var(--avc-warn-rgb),0.55);background:rgba(var(--avc-warn-rgb),0.12);color:rgb(var(--avc-warn-rgb));font-size:12px;display:flex;align-items:center;gap:8px">
          <ha-icon icon="mdi:alert" style="--mdc-icon-size:18px"></ha-icon><span>${e}</span>
        </div>`:De}
        <div class="badges-row">
          ${this._config.vacuums.map((e,t)=>this._renderBadge(e,t))}
          ${(this._config.global_actions??[]).map((e,t)=>this._renderGlobalBadge(e,t))}
        </div>
        ${this._renderAutoBar()}
        ${this._renderPlanPreview()}
        ${"merged"===this._config.map_mode?Ee`
              ${this._renderResponsive(this._renderMergedMap())}
              ${this._shownOrdered().map(e=>Ee`
                ${this._renderMapTools(this._config.vacuums[e])}
                ${this._renderStatusCard(this._config.vacuums[e],e)}
              `)}
            `:this._shownOrdered().map(e=>Ee`
                ${this._renderResponsive(this._renderMap(this._config.vacuums[e]))}
                ${this._renderMapTools(this._config.vacuums[e])}
                ${this._renderStatusCard(this._config.vacuums[e],e)}
              `)}
        ${this._renderRobotSheet()}
      </ha-card>
    `}};ft.styles=i$6`
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

      /* docs/44 F1 (K8): one type and one radius scale for everything new;
       * older rules migrate to these as later phases touch them. */
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
      color: rgba(var(--avc-ink-rgb), 0.85);
      background: rgba(var(--avc-shade-rgb), 0.75);
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
      background: var(--avc-panel);
      border: 1px solid var(--avc-panel-line);
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
      background: rgb(var(--avc-warn-rgb));
    }
    .dock-sheet {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 8px;
      background: var(--avc-sunken);
      border: 1px solid var(--avc-panel-line);
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
      background: rgba(var(--avc-ink-rgb), 0.05);
      border: 1.5px solid rgba(var(--avc-ink-rgb), 0.2);
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
      border-radius: 9px;
      cursor: pointer;
      font-family: inherit;
      font-size: 11px;
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
      font-size: 12px;
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
      font-size: 10px;
      font-weight: 600;
      padding: 2px 7px;
      border-radius: 20px;
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
      border-radius: 9px;
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
      font-size: 12px;
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
    .dock-age { display: inline-flex; align-items: center; gap: 2px; font-size: 10px; }
    .dock-age ha-icon { --mdc-icon-size: 12px; color: rgba(var(--avc-ink-rgb), 0.3); }
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
    .dock-chip--empty { color: rgba(var(--avc-ink-rgb), 0.25); border-color: rgba(var(--avc-ink-rgb), 0.15); }
    .dock-foot {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      border-top: 1px solid rgba(var(--avc-ink-rgb), 0.08);
      padding-top: 6px;
    }
    .dock-est { font-size: 11px; color: rgba(var(--avc-ink-rgb), 0.45); }
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
      border-radius: 18px;
      cursor: pointer;
      font-family: inherit;
      font-size: 16px;
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
      border-radius: 16px;
      cursor: pointer;
      font-family: inherit;
      font-size: 10px;
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
    .start-seg--dock { position: relative; }

    .map-tools-label {
      font-size: 11px;
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
      border: 1px solid rgba(var(--avc-warn-rgb), 0.55);
      background: rgba(var(--avc-warn-rgb), 0.12);
      color: rgb(var(--avc-warn-rgb));
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
    .zone-rect { position: absolute; border: 2px solid rgb(var(--avc-ink-rgb)); background: rgba(var(--avc-ink-rgb), 0.15); border-radius: 4px; pointer-events: none; box-shadow: 0 0 0 1px rgba(var(--avc-shade-rgb), 0.45); }
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
    .layer-btn { display: flex; align-items: center; gap: 3px; padding: 3px 8px; border-radius: 999px; border: 1px solid rgba(var(--avc-ink-rgb), 0.2); background: rgba(var(--avc-shade-rgb), 0.45); color: rgba(var(--avc-ink-rgb), 0.55); font-size: 11px; font-weight: 600; cursor: pointer; --mdc-icon-size: 16px; user-select: none; -webkit-touch-callout: none; touch-action: manipulation; }
    .layer-btn.on { color: rgb(var(--avc-ink-rgb)); border-color: rgba(var(--avc-ink-rgb), 0.55); background: rgba(var(--avc-shade-rgb), 0.7); }
    .layer-menu { position: absolute; top: 38px; right: 0; min-width: 200px; max-width: 86vw; max-height: 60vh; overflow-y: auto; display: flex; flex-direction: column; gap: 2px; padding: 6px; border-radius: 12px; background: rgba(var(--avc-scrim-rgb), 0.96); border: 1px solid rgba(var(--avc-ink-rgb), 0.15); box-shadow: 0 8px 24px rgba(var(--avc-shade-rgb), 0.5); }
    .layer-menu-head { display: flex; align-items: center; gap: 6px; font-size: 11px; color: rgba(var(--avc-ink-rgb), 0.5); padding: 2px 6px 5px; --mdc-icon-size: 14px; }
    .layer-menu-row { display: flex; align-items: center; gap: 8px; padding: 6px 8px; border-radius: 8px; border: 1px solid transparent; background: transparent; color: rgba(var(--avc-ink-rgb), 0.88); cursor: pointer; font-size: 13px; --mdc-icon-size: 16px; }
    .layer-menu-row.on { background: rgba(var(--avc-ink-rgb), 0.12); border-color: rgba(var(--avc-ink-rgb), 0.4); }
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
      border-radius: 8px;
      padding: 6px 8px;
      font-size: 11px;
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
      background: var(--avc-surface);
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
    .model-label { font-size: 13px; font-weight: 500; color: rgba(var(--avc-ink-rgb), 0.85); }
    .status-label { font-size: 12px; font-weight: 600; text-align: right; }

    .status-line2 { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
    .current-room { display: flex; align-items: center; gap: 3px; font-size: 11px; color: rgba(var(--avc-ink-rgb), 0.45); }

    .status-meta { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
    .battery { display: flex; align-items: center; gap: 3px; font-size: 11px; font-weight: 600; }
    .battery ha-icon { --mdc-icon-size: 13px; }
    .last-clean { display: flex; align-items: center; gap: 3px; font-size: 11px; color: rgba(var(--avc-ink-rgb), 0.45); }
    .last-clean ha-icon { --mdc-icon-size: 11px; color: rgba(var(--avc-ink-rgb), 0.25); }

    /* ── Progress bar ────────────────────────────────────────────────── */
    .progress { display: flex; align-items: center; gap: 8px; }
    .progress-track {
      flex: 1; height: 3px;
      background: rgba(var(--avc-ink-rgb), 0.08); border-radius: 2px; overflow: hidden;
    }
    .progress-fill { height: 100%; border-radius: 2px; transition: width 0.5s ease; }
    .progress-label { font-size: 11px; font-weight: 600; flex-shrink: 0; }

    /* ── Debug per-room progress strip ───────────────────────────────── */
    .dbg-prog { display: flex; flex-wrap: wrap; gap: 6px 12px; padding-top: 2px; }
    .dbg-prog-item { display: flex; align-items: center; gap: 3px; font-size: 11px; color: rgba(var(--avc-ink-rgb), 0.55); --mdc-icon-size: 14px; }
    .dbg-prog-name { color: rgba(var(--avc-ink-rgb), 0.45); }
    .dbg-prog-item b { font-weight: 700; }
    .dbg-prog-item small { color: rgba(var(--avc-ink-rgb), 0.4); font-size: 10px; }
    .mini-gauge-wrap { display: inline-flex; align-items: center; gap: 2px; }
    .mini-gauge-ico { --mdc-icon-size: 12px; opacity: 0.8; }
    .mini-gauge { width: 22px; height: 22px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; }
    .mini-gauge span { width: 16px; height: 16px; border-radius: 50%; background: rgba(var(--avc-shade-rgb), 0.82); color: rgb(var(--avc-ink-rgb)); font-size: 8px; font-weight: 700; display: flex; align-items: center; justify-content: center; }

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
    .action-btn span { font-size: 13px; font-weight: 700; color: rgb(var(--avc-ink-rgb)); position: relative; z-index: 1; }

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

    .start-body small { font-size: 10px; }

    .map-clickcatch { position: absolute; inset: 0; cursor: crosshair; z-index: 5; }
    .map-tools { display: flex; gap: 6px; margin: 6px 0 0; }
    .mtbtn { display: inline-flex; align-items: center; gap: 4px; padding: 5px 10px; border-radius: 8px; border: 1px solid rgba(var(--avc-ink-rgb), 0.18); background: rgba(var(--avc-ink-rgb), 0.06); color: inherit; cursor: pointer; font-size: 12px; font-weight: 600; }
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
    .meta-bar { display: flex; align-items: center; gap: 4px; flex-wrap: wrap; padding: 6px 8px; background: var(--avc-panel-strong); border: 1px solid var(--avc-panel-strong-line); border-radius: 12px; }
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
    .calib-panel { margin-top: 4px; font-size: 12px; opacity: 0.9; padding: 6px 8px; background: rgba(var(--avc-tool-rgb), 0.12); border-radius: 8px; }
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
     * the card's genre: panels carry elevation instead of a hairline outline,
     * and corners step up one notch. legacy simply never gets the
     * .avc-theme class, so none of this applies to it. */
    .avc-theme .status-card { border-radius: 20px; box-shadow: var(--avc-elev-1); }
    .avc-theme .dock,
    .avc-theme .vac-picker { border-radius: 18px; box-shadow: var(--avc-elev-1); }
    .avc-theme .meta-bar { border-radius: 16px; box-shadow: var(--avc-elev-1); }
    .avc-theme .map-wrap { border-radius: 18px; box-shadow: var(--avc-elev-1); }
    .avc-theme .dock-sheet { border-radius: 14px; }
    .avc-theme .dock-row,
    .avc-theme .dock-mode,
    .avc-theme .dock-sheet-action { border-radius: 12px; }
    .avc-theme .action-btn { border-radius: 14px; }
    .avc-theme .mtbtn { border-radius: 10px; }
    .avc-theme .start-bar { border-radius: 22px; }
    .avc-theme .start-seg { border-radius: 18px; }
    .avc-theme .room-inspect-inner { border-radius: 12px; box-shadow: var(--avc-elev-2); }
    .avc-theme .layer-menu { border-radius: 16px; box-shadow: var(--avc-elev-2); }
    /* Rounder rooms read softer without touching the field-tuned selection
     * ring itself (0.52/0.53 spent real effort landing that gradient). */
    .avc-theme .room-overlay { border-radius: 10px; }

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
    .robot-sheet {
      position: absolute; left: 50%; bottom: 0; z-index: 41;
      width: min(480px, 100%); box-sizing: border-box; transform: translateX(-50%);
      display: flex; flex-direction: column; gap: 14px; padding: 10px 16px 16px;
      border-radius: 22px 22px 0 0;
      background: rgb(var(--avc-scrim-2-rgb)); color: rgb(var(--avc-ink-rgb));
      box-shadow: 0 -12px 40px rgba(0, 0, 0, 0.45);
      animation: avc-sheet-in 0.22s var(--avc-ease, ease-out);
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
    .avc-marker { transition: transform 1.5s linear; }
    .avc-marker--jump { transition: none; }
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
    .avc-still .avc-marker { transition: none; }
    .avc-still .avc-sonar, .avc-still .room-sheen { display: none; }
    @media (prefers-reduced-motion: reduce) {
      .avc-marker { transition: none; }
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
    .rail-card-head small { margin-left: auto; font-weight: 500; color: rgba(var(--avc-ink-rgb), 0.6); font-variant-numeric: tabular-nums; white-space: nowrap; }
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
      border-radius: var(--avc-r-m);
    }
    .avc-theme .room-btn { border-radius: 14px; }
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

    /* Type floor (docs/35 §4). 8–10px is instrument sizing; nothing sits
     * below 10px any more, and everything whose value ticks gets tabular
     * figures so a live ETA or battery reading stops shoving its neighbours
     * sideways on every poll. */
    .avc-theme .dock-age,
    .avc-theme .dock-chip,
    .avc-theme .start-seg,
    .avc-theme .dock-sheet-debug,
    .avc-theme .dock-sheet-care-badge,
    .avc-theme .start-body small,
    .avc-theme .dbg-prog-item small,
    .avc-theme .version-chip { font-size: 11px; }
    .avc-theme .dock-cov { font-size: 10px; }
    .avc-theme .rl-prog small { font-size: 9px; }
    .avc-theme .room-gauge span { font-size: 10px; }
    .avc-theme .mini-gauge span { font-size: 9px; }
    /* Portrait keeps its own tighter scale, just lifted off the floor too —
     * these need one more class than the .avc-grid--portrait rules above to
     * win, hence the doubled prefix rather than a plain override. */
    .avc-theme .avc-grid--portrait .dock-age { font-size: 10px; }
    .avc-theme .avc-grid--portrait .dock-cov { font-size: 9px; }
    .avc-theme .avc-grid--portrait .badge-name { font-size: 12px; }
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
    .avc-theme .dock-sheet-tab,
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
    .avc-theme .dock-sheet-tab:active,
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
    .avc-theme .dock-sheet-tab:focus-visible,
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
    .avc-theme .progress-track { height: 4px; border-radius: 3px; }
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
      display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 13px;
    }
    .align-toolbar-spacer { flex: 1 1 auto; }
    .align-vac-picker { display: flex; gap: 6px; flex-wrap: wrap; }
    .align-vac-chip {
      font: inherit; font-size: 11px; font-weight: 600; cursor: pointer;
      padding: 5px 10px; border-radius: 999px; color: rgb(var(--avc-ink-rgb));
      background: var(--avc-panel); border: 1px solid var(--avc-panel-line);
    }
    .align-vac-chip.on { background: rgba(var(--avc-tool-rgb), 0.22); border-color: rgba(var(--avc-tool-rgb), 0.6); }
    .align-btn {
      display: inline-flex; align-items: center; justify-content: center;
      width: 34px; height: 34px; border-radius: 10px; cursor: pointer;
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
      width: auto; padding: 0 12px; gap: 6px; font-weight: 700; font-size: 12px;
      background: rgba(var(--avc-tool-rgb), 0.22); border-color: rgba(var(--avc-tool-rgb), 0.6);
    }
    .align-tier-group {
      display: flex; border-radius: 10px; overflow: hidden;
      border: 1px solid var(--avc-panel-line);
    }
    .align-tier-btn {
      font: inherit; font-size: 11px; font-weight: 600; cursor: pointer;
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
      font-size: 12px; font-weight: 600; color: rgba(var(--avc-ink-rgb), 0.75);
      display: flex; align-items: center; gap: 3px;
    }
    .align-field-row label span { font-size: 10.5px; font-weight: 500; color: rgba(var(--avc-ink-rgb), 0.5); }
    .align-field-arrow {
      --mdc-icon-size: 13px; color: rgb(var(--avc-tool-rgb));
      flex-shrink: 0;
    }
    .align-field-row input[type="number"] {
      width: 84px; font: inherit; font-size: 12px; text-align: right;
      color: rgb(var(--avc-ink-rgb)); background: var(--avc-panel);
      border: 1px solid var(--avc-panel-line); border-radius: 8px; padding: 5px 7px;
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
      font: inherit; font-size: 12px; font-weight: 600; cursor: pointer;
      padding: 7px 14px; border-radius: 999px; color: rgba(var(--avc-ink-rgb), 0.7);
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
    .ve-placeholder-title { font-size: 15px; font-weight: 700; color: rgb(var(--avc-ink-rgb)); }
    .ve-placeholder-sub { font-size: 12px; }
    /* == Visual editor: Floorplan & Calibrate tool's sub-tabs (fáze J2) ==== */
    .ve-subtab-row {
      display: flex; gap: 6px; padding: 8px 12px 0;
    }
    .ve-subtab {
      font: inherit; font-size: 11.5px; font-weight: 600; cursor: pointer;
      padding: 5px 12px; border-radius: 999px; color: rgba(var(--avc-ink-rgb), 0.65);
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
      color: #000; font-size: 12px; font-weight: 700;
      pointer-events: none; z-index: 2;
    }
    .floor-calib-banner {
      font-size: 12px; line-height: 1.4; padding: 8px 10px; border-radius: 8px;
      background: rgba(var(--avc-warn-rgb), 0.14); border: 1px solid rgba(var(--avc-warn-rgb), 0.4);
      display: flex; flex-direction: column; gap: 4px;
    }
    .floor-calib-inset {
      position: relative; border-radius: 8px; overflow: hidden; cursor: crosshair;
      background: rgba(var(--avc-ink-rgb), 0.06); border: 1px solid var(--avc-panel-line);
    }
    .floor-calib-inset:not(.floor-calib-inset--active) { cursor: default; opacity: 0.55; }
    .floor-calib-inset img { display: block; width: 100%; height: auto; pointer-events: none; }
    .floor-calib-error { font-size: 12px; color: rgb(var(--avc-err-rgb)); }
    /* == Visual editor: Seat & Appearance tool's Appearance section ======= */
    .align-side-panel-divider {
      height: 1px; background: var(--avc-panel-line); margin: 4px 0;
    }
    .align-side-panel .section-title {
      font-size: 11px; font-weight: 700; letter-spacing: 0.03em; text-transform: uppercase;
      color: rgba(var(--avc-ink-rgb), 0.5);
    }
    .align-field-row--color { flex-direction: column; align-items: stretch; gap: 4px; }
    .align-color-row { display: flex; gap: 6px; align-items: center; }
    .align-color-swatch {
      width: 30px; height: 30px; padding: 0; border-radius: 8px; cursor: pointer;
      border: 1px solid var(--avc-panel-line); background: none;
    }
    .align-color-text {
      flex: 1 1 auto; font: inherit; font-size: 12px; color: rgb(var(--avc-ink-rgb));
      background: var(--avc-panel); border: 1px solid var(--avc-panel-line);
      border-radius: 8px; padding: 5px 7px;
    }
    .align-field-row select {
      font: inherit; font-size: 12px; color: rgb(var(--avc-ink-rgb)); background: var(--avc-panel);
      border: 1px solid var(--avc-panel-line); border-radius: 8px; padding: 5px 7px;
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
      font-size: 11px; font-weight: 700; color: rgb(var(--avc-ink-rgb)); background: var(--avc-surface);
      padding: 1px 5px; border-radius: 6px; pointer-events: none; white-space: nowrap; overflow: hidden;
      text-overflow: ellipsis;
    }
    .rooms-handle--nw { left: 0; top: 0; }
    .rooms-handle--ne { left: 100%; top: 0; }
    .rooms-handle--sw { left: 0; top: 100%; }
    .rooms-handle--se { left: 100%; top: 100%; }
    .rooms-side-note { font-size: 12px; color: rgba(var(--avc-ink-rgb), 0.6); line-height: 1.4; }
    /* == Align mode: home-frame degradation (docs/41 §4.8) =============== */
    .align-seat-layer--readonly { cursor: default; }
    .align-seat-layer--readonly .align-seat-img { cursor: default; }
    .align-readonly-note {
      position: absolute; left: 50%; bottom: 6%; transform: translateX(-50%);
      display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 600;
      padding: 7px 12px; border-radius: 999px; white-space: nowrap;
      color: rgb(var(--avc-ink-rgb)); background: var(--avc-surface); box-shadow: var(--avc-elev-1);
    }
    /* == Align mode: Cancel confirmation (docs/41 §4.4, Esc/X row) ======== */
    .align-confirm-backdrop {
      position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
      background: rgba(var(--avc-shade-rgb), 0.55); z-index: 1;
    }
    .align-confirm-panel {
      width: min(320px, 86vw); padding: 18px; border-radius: 14px;
      background: var(--avc-surface); box-shadow: var(--avc-elev-1);
      color: rgb(var(--avc-ink-rgb));
    }
    .align-confirm-title { font-size: 14px; font-weight: 700; margin-bottom: 6px; }
    .align-confirm-body { font-size: 12.5px; color: rgba(var(--avc-ink-rgb), 0.7); margin-bottom: 14px; }
    .align-confirm-actions { display: flex; justify-content: flex-end; gap: 8px; }
    .align-confirm-keep, .align-confirm-discard {
      width: auto; height: 32px; padding: 0 12px; font-size: 12px; font-weight: 700;
    }
    .align-confirm-discard { background: rgba(var(--avc-err-rgb), 0.18); border-color: rgba(var(--avc-err-rgb), 0.5); }
  `,__decorate([n$1({attribute:!1})],ft.prototype,"hass",void 0),__decorate([n$1({attribute:!1})],ft.prototype,"editMode",void 0),__decorate([r()],ft.prototype,"_config",void 0),__decorate([r()],ft.prototype,"_shownSet",void 0),__decorate([r()],ft.prototype,"_holdId",void 0),__decorate([r()],ft.prototype,"_mapMode",void 0),__decorate([r()],ft.prototype,"_inspectKey",void 0),__decorate([r()],ft.prototype,"_dockSheetOpen",void 0),__decorate([r()],ft.prototype,"_robotSheet",void 0),__decorate([r()],ft.prototype,"_dockSheetIdx",void 0),__decorate([r()],ft.prototype,"_modeSheetOpen",void 0),__decorate([r()],ft.prototype,"_careResetPending",void 0),__decorate([r()],ft.prototype,"_modeEntity",void 0),__decorate([r()],ft.prototype,"_dbg",void 0),__decorate([r()],ft.prototype,"_zoneDrag",void 0),__decorate([r()],ft.prototype,"_zoneRectShown",void 0),__decorate([r()],ft.prototype,"_zonePending",void 0),__decorate([r()],ft.prototype,"_zoneEdit",void 0),__decorate([r()],ft.prototype,"_pinPending",void 0),__decorate([r()],ft.prototype,"_layers",void 0),__decorate([r()],ft.prototype,"_layerMenu",void 0),__decorate([r()],ft.prototype,"_localRoomSel",void 0),__decorate([r()],ft.prototype,"_activePresets",void 0),__decorate([r()],ft.prototype,"_planMode",void 0),__decorate([r()],ft.prototype,"_activeGlobalPreset",void 0),__decorate([r()],ft.prototype,"_cardW",void 0),__decorate([r()],ft.prototype,"_mapAR",void 0),__decorate([r()],ft.prototype,"_alignSession",void 0),__decorate([r()],ft.prototype,"_alignView",void 0),__decorate([r()],ft.prototype,"_alignCancelConfirm",void 0),__decorate([r()],ft.prototype,"_alignCopiedFlash",void 0),__decorate([r()],ft.prototype,"_veTool",void 0),__decorate([r()],ft.prototype,"_roomsSession",void 0),__decorate([r()],ft.prototype,"_roomsDeleteConfirm",void 0),__decorate([r()],ft.prototype,"_roomsCopiedFlash",void 0),__decorate([r()],ft.prototype,"_floorplanCopiedFlash",void 0),__decorate([r()],ft.prototype,"_floorplanMode",void 0),__decorate([r()],ft.prototype,"_floorCalib",void 0),__decorate([r()],ft.prototype,"_floorCalibRefNat",void 0),__decorate([r()],ft.prototype,"_floorCalibResult",void 0),__decorate([r()],ft.prototype,"_floorCalibError",void 0),__decorate([r()],ft.prototype,"_homeCalib",void 0),__decorate([r()],ft.prototype,"_homeCalibBusy",void 0),__decorate([r()],ft.prototype,"_homeCalibError",void 0),__decorate([r()],ft.prototype,"_homeCalibResult",void 0),__decorate([r()],ft.prototype,"_homeCalibSnapshotUrl",void 0),__decorate([r()],ft.prototype,"_homeCalibCrop",void 0),__decorate([r()],ft.prototype,"_homeCalibFrameId",void 0),__decorate([r()],ft.prototype,"_fiducialSnapshotBusy",void 0),__decorate([r()],ft.prototype,"_fiducialSnapshotError",void 0),__decorate([r()],ft.prototype,"_fiducialSnapshotPath",void 0),__decorate([r()],ft.prototype,"_fiducialKnown",void 0),__decorate([r()],ft.prototype,"_fiducialDetectBusy",void 0),__decorate([r()],ft.prototype,"_fiducialDetectError",void 0),__decorate([r()],ft.prototype,"_fiducialDetectResult",void 0),__decorate([r()],ft.prototype,"_floorplanSnapshotBusy",void 0),__decorate([r()],ft.prototype,"_floorplanSnapshotError",void 0),__decorate([r()],ft.prototype,"_homeFrameSnapshotBusy",void 0),__decorate([r()],ft.prototype,"_homeFrameSnapshotError",void 0),__decorate([r()],ft.prototype,"_guideExportBusy",void 0),__decorate([r()],ft.prototype,"_guideExportError",void 0),__decorate([r()],ft.prototype,"_guideExportResult",void 0),__decorate([r()],ft.prototype,"_placeRoomsResult",void 0),__decorate([r()],ft.prototype,"_veToolSwitchTarget",void 0),__decorate([r()],ft.prototype,"_floorplanSession",void 0),__decorate([r()],ft.prototype,"_recropDraft",void 0),__decorate([r()],ft.prototype,"_recropHistory",void 0),__decorate([r()],ft.prototype,"_recropFuture",void 0),__decorate([r()],ft.prototype,"_recropNat",void 0),__decorate([r()],ft.prototype,"_profile",void 0),__decorate([r()],ft.prototype,"_mapRegW",void 0),__decorate([r()],ft.prototype,"_mapRegH",void 0),__decorate([r()],ft.prototype,"_mapAvailW",void 0),__decorate([r()],ft.prototype,"_mapAvailH",void 0),__decorate([r()],ft.prototype,"_startSeq",void 0),__decorate([r()],ft.prototype,"_flipLive",void 0),__decorate([r()],ft.prototype,"_now",void 0),__decorate([r()],ft.prototype,"_planPreview",void 0),ft=__decorate([t$1(Ye)],ft);const vt=(gt=window).customCards??(gt.customCards=[]);vt.some(e=>e.type===Ye)||vt.push({type:Ye,name:"AnyVac Card",description:"Feature-rich card for Roborock vacuums — map, room selection, multi-vacuum tabs, global actions.",preview:!1,documentationURL:"https://github.com/Michailjovic/anyvac-card"});const bt={entity:"",name:"",color:"green",rooms:[],clean_action:{type:"native"}},yt={key:"",name:"",icon:"mdi:square",map_x:50,map_y:50},xt=["mdi:numeric-1-circle","mdi:numeric-2-circle","mdi:numeric-3-circle","mdi:numeric-4-circle","mdi:numeric-5-circle","mdi:numeric-6-circle","mdi:numeric-7-circle","mdi:numeric-8-circle","mdi:numeric-9-circle","mdi:numeric-9-plus-circle"];function _roomIconFor(e){return xt[Math.min(e,xt.length-1)]}const wt={entity:"",rotation:0,scale:100,offset_x:0,offset_y:0},$t={name:"Whole flat",color:"orange",watch_entities:[],action:{type:"script",entity_id:""}},kt=[{days:2,color:"#2ecc71"},{days:5,color:"#faad14"},{days:10,color:"#ff9800"}];let St=class AnyVacCardEditor extends Be{constructor(){super(...arguments),this._tab="vacuums",this._dragRoom=null,this._dragSeq=null,this._openVac=null,this._openSensors=new Set,this._openMap=new Set,this._openPresets=new Set,this._openAction=new Set,this._openGlobal=new Set,this._openRoom=new Map,this._hvSwap=!1,this._pvAR=0,this._pvNat=null,this._floorplanSnapshotBusy=!1,this._floorplanSnapshotError="",this._guideExportBusy=!1,this._guideExportError="",this._guideExportResult=null,this._placeRoomsResult=null,this._initialized=!1,this._ha=null,this._menu=null,this._confirm=null,this._hintsOpen=new Set,this._hintSeq=0}connectedCallback(){super.connectedCallback(),this._ensureHaElements()}setConfig(e){this._config=e,this._initialized||(this._initialized=!0,this._openVac=1===(e.vacuums??[]).length?0:null)}updated(e){if((e.has("hass")||e.has("_ha"))&&this.hass&&!1===this._ha){const e=this.shadowRoot?.getElementById("ha-entities");e&&!e.options.length&&(e.innerHTML=Object.keys(this.hass.states).sort().map(e=>'<option value="'+e+'">').join(""))}}async _snapshotFloorplan(e){const t=this._mapEntityFor(e);if(t){this._floorplanSnapshotBusy=!0,this._floorplanSnapshotError="";try{const o=await this.hass.callService("anyvac","snapshot_map_as_floorplan",{image_entity:t,name:e.name||e.entity},void 0,!1,!0),s=o?.response?.path;if(!s)throw new Error("no path in service response");const l=o?.response?.crop,h=this._config.vacuums.findIndex(t=>t.entity===e.entity);if(this._setEditedImageBase(l?{src:s,crop_box:{entity:e.entity,...l}}:{src:s},h>=0?h:void 0),this._mergedEdit){const e=this._config.vacuums.map(e=>({...e,hide_map:!0}));this._setConfig({vacuums:e})}else{const t=this._config.vacuums.findIndex(t=>t.entity===e.entity);t>=0&&this._setVacuum(t,{hide_map:!0})}if(l){const t=this._config.vacuums.findIndex(t=>t.entity===e.entity);t>=0&&this._placeOwnRooms(t,l)}}catch(e){this._floorplanSnapshotError="Couldn't snapshot this vacuum's map — make sure the anyvac integration is updated to at least 0.88.0, then try again.",console.error("[anyvac-card] snapshot_map_as_floorplan failed:",e)}finally{this._floorplanSnapshotBusy=!1}}}async _exportMapGuide(e,t){const o=this._mapEntityFor(e);if(!o)return;this._guideExportBusy=!0,this._guideExportError="",this._guideExportResult=null;const s=this._currentImageBase(t)?.crop_box,l=s&&"entity"in s&&s.entity===e.entity?{x0:s.x0,y0:s.y0,x1:s.x1,y1:s.y1}:void 0;try{const t={image_entity:o,name:e.name||e.entity};l&&(t.crop=l);const s=await this.hass.callService("anyvac","export_map_guide",t,void 0,!1,!0),h=s?.response?.paths,d=s?.response?.size;if(!h||!d||!Object.keys(h).length)throw new Error("no guide layers in service response");this._guideExportResult={paths:h,size:d,crop:s?.response?.crop,entity:e.entity}}catch(e){this._guideExportError="Couldn't export guide layers — make sure the anyvac integration is updated to at least 1.4.0, then try again.",console.error("[anyvac-card] export_map_guide failed:",e)}finally{this._guideExportBusy=!1}}_fire(e){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}_setConfig(e){const t={...this._config,...e};this._config=t,this._fire(t)}_setVacuum(e,t){const o=[...this._config.vacuums];o[e]={...o[e],...t};const s={...this._config,vacuums:o};this._config=s,this._fire(s)}_setMap(e,t){const o=this._config.vacuums[e].map??{...wt};this._setVacuum(e,{map:{...o,...t}})}_setImageBase(e,t){const o=this._config.vacuums[e].image_base??{src:""};this._setVacuum(e,{image_base:{...o,...t}})}get _mergedEdit(){return"merged"===this._config.map_mode}_editRooms(e=0){if(this._mergedEdit)return this._config.rooms??[];const t=this._config.vacuums[Math.min(e,this._config.vacuums.length-1)];return t?.rooms??[]}_setEditedRoom(e,t,o=0){if(this._mergedEdit){const o=[...this._config.rooms??[]];o[e]={...o[e],...t},this._setConfig({rooms:o})}else this._setRoom(Math.min(o,this._config.vacuums.length-1),e,t)}_addEditedRoom(e=0){if(this._mergedEdit){const e=this._config.rooms??[],t=[...e,{...yt,icon:_roomIconFor(e.length)}];this._setConfig({rooms:t})}else this._addRoom(Math.min(e,this._config.vacuums.length-1))}_deleteEditedRoom(e,t=0){if(this._mergedEdit){const t=(this._config.rooms??[]).filter((t,o)=>o!==e);this._setConfig({rooms:t})}else this._deleteRoom(Math.min(t,this._config.vacuums.length-1),e)}_setLayoutFlip(e,t){const o=this._config.layout??{},s=o[e]??{},l={...s.crop??{},flip:!!t||void 0};this._setConfig({layout:{...o,[e]:{...s,crop:l}}})}_setEditedImageBase(e,t){this._mergedEdit?this._setConfig({image_base:{...this._config.image_base??{src:""},...e}}):void 0!==t&&this._setImageBase(Math.min(t,this._config.vacuums.length-1),e)}_currentImageBase(e=0){const t=this._config.vacuums;if(!t.length)return;const o=Math.min(e,t.length-1);return this._mergedEdit?this._config.image_base:t[o].image_base}_editorAR(){return this._pvAR>.1?this._pvAR:3.636}_intEntityFor(e){if(!e)return;if(e.integration_entity)return e.integration_entity;const t=this.hass?.entities,o=t?.[e.entity]?.device_id;return o?Object.keys(t).find(e=>t[e]?.device_id===o&&"anyvac"===t[e]?.platform&&e.startsWith("sensor.")):void 0}_mapEntityFor(e){if(!e)return;if(e.map?.entity)return e.map.entity;const t=this.hass?.entities,o=t?.[e.entity]?.device_id;if(!o)return;const s=Object.keys(t).filter(e=>t[e]?.device_id===o&&e.startsWith("image.")),l=s.filter(e=>{const t=this.hass.states[e];return!!t&&"unavailable"!==t.state&&"unknown"!==t.state&&!!t.attributes.entity_picture});return 1===l.length?l[0]:1===s.length?s[0]:void 0}_anyHomeFrame(){const e=new Map;for(const t of this._config.vacuums??[]){const o=this._intEntityFor(t),s=(o?this.hass.states[o]?.attributes:void 0)?.home_frame;if(!(s?.id&&s.width_px>0&&s.height_px>0))continue;const l=e.get(s.id);l?l.count++:e.set(s.id,{w:s.width_px,h:s.height_px,count:1})}let t=null;for(const[o,s]of e)(!t||s.count>t.count)&&(t={id:o,...s});return t?{id:t.id,w:t.w,h:t.h}:null}_roomSequence(e){const t=this._intEntityFor(e),o=t?this.hass?.states?.[t]?.attributes:void 0;return o?.room_sequence??{}}_roomsInSequenceOrder(e,t){return e.map((e,o)=>({r:e,i:o,s:e.key?t[e.key]??1/0:1/0})).sort((e,t)=>e.s!==t.s?e.s-t.s:e.i-t.i).map(e=>e.r)}_moveSequence(e,t,o,s){if(o===s)return;const l=t.map(e=>e.key).filter(e=>!!e);if(o<0||o>=l.length||s<0||s>=l.length)return;const[h]=l.splice(o,1);l.splice(s,0,h),this.hass.callService("anyvac","set_room_sequence",{rooms:l})}_placeOwnRooms(e,t){const o=this._config.vacuums[e],s=this._intEntityFor(o),l=s?this.hass.states[s]?.attributes:void 0,h=Array.isArray(l?.rooms)?l.rooms:[];if(!h.length)return null;const d=this._mergedEdit?this._config.rooms??[]:o.rooms??[],{rooms:p,placed:u,added:m}=function placeRoomsInCrop(e,t,o,s){const l=o.map(e=>({...e})),h=new Map;l.forEach((e,t)=>h.set(e.key,t));let d=0,p=0;for(const o of e){const e=o?.name,u=o?.bbox_px;if(!e||!u)continue;const m=placeRoomInCrop(u,t);if(!m)continue;const _=h.get(e);if(void 0!==_)l[_]={...l[_],...m},d++;else{const t={key:e,name:e,icon:s(l.length),...m};l.push(t),h.set(e,l.length-1),p++}}return{rooms:l,placed:d,added:p}}(h,t,d,_roomIconFor);if(u||m){const t=p;this._mergedEdit?this._setConfig({rooms:t}):this._setVacuum(e,{rooms:t})}return{placed:u,added:m}}_placeRoomsFromCropBox(){const e=this._currentImageBase()?.crop_box;if(!e||!("entity"in e))return;const t=this._config.vacuums.findIndex(t=>t.entity===e.entity);if(t<0)return;const o=this._placeOwnRooms(t,e);o&&(this._placeRoomsResult=o)}_setRoom(e,t,o){const s=[...this._config.vacuums[e].rooms??[]];s[t]={...s[t],...o},this._setVacuum(e,{rooms:s})}_setCleanAction(e,t){const o=this._config.vacuums[e].clean_action??{type:"native"};this._setVacuum(e,{clean_action:{...o,...t}})}_setPreset(e,t,o){const s=[...this._config.vacuums[e].presets??[]];s[t]={...s[t],...o},this._setVacuum(e,{presets:s})}_addPreset(e){const t=this._config.vacuums[e].presets??[],o=[...t,{id:"preset"+(t.length+1),label:"New preset"}];this._setVacuum(e,{presets:o}),this._openPresets=new Set([...this._openPresets,e])}_deletePreset(e,t){const o=(this._config.vacuums[e].presets??[]).filter((e,o)=>o!==t);this._setVacuum(e,{presets:o})}_setGlobal(e,t){const o=[...this._config.global_actions??[]];o[e]={...o[e],...t};const s={...this._config,global_actions:o};this._config=s,this._fire(s)}_setGlobalAction(e,t){const o=this._config.global_actions?.[e]?.action??{type:"script",entity_id:""};this._setGlobal(e,{action:{...o,...t}})}_moveVacuum(e,t){const o=e+t,s=[...this._config.vacuums];if(o<0||o>=s.length)return;[s[e],s[o]]=[s[o],s[e]];const l={...this._config,vacuums:s};this._config=l,this._fire(l),this._openVac===e?this._openVac=o:this._openVac===o&&(this._openVac=e)}_addVacuum(){const e=[...this._config.vacuums,{...bt}],t={...this._config,vacuums:e};this._config=t,this._fire(t),this._openVac=e.length-1}_deleteVacuum(e){const t=this._config.vacuums.filter((t,o)=>o!==e),o={...this._config,vacuums:t};this._config=o,this._fire(o),this._openVac===e?this._openVac=null:null!==this._openVac&&this._openVac>e&&this._openVac--}_addRoom(e){const t=this._config.vacuums[e].rooms??[],o=[...t,{...yt,icon:_roomIconFor(t.length)}];this._setVacuum(e,{rooms:o});const s=new Map(this._openRoom);s.set(e,o.length-1),this._openRoom=s}_moveRoom(e,t,o){if(t===o)return;const s=[...this._config.vacuums[e].rooms??[]];if(t<0||t>=s.length||o<0||o>=s.length)return;const[l]=s.splice(t,1);s.splice(o,0,l),this._setVacuum(e,{rooms:s})}_deleteRoom(e,t){const o=(this._config.vacuums[e].rooms??[]).filter((e,o)=>o!==t);this._setVacuum(e,{rooms:o});if(this._openRoom.get(e)===t){const t=new Map(this._openRoom);t.set(e,null),this._openRoom=t}}_setGlobalPreset(e,t){const o=[...this._config.global_presets??[]];o[e]={...o[e],...t},this._setConfig({global_presets:o})}_addGlobalPreset(){const e=this._config.global_presets??[],t=[...e,{id:"gp"+(e.length+1),label:"New clean",scope:"select"}];this._setConfig({global_presets:t})}_deleteGlobalPreset(e){const t=(this._config.global_presets??[]).filter((t,o)=>o!==e);this._setConfig({global_presets:t})}_addGlobal(){const e=[...this._config.global_actions??[],{...$t}],t={...this._config,global_actions:e};this._config=t,this._fire(t);const o=e.length-1;this._openGlobal=new Set([...this._openGlobal,o])}_deleteGlobal(e){const t=(this._config.global_actions??[]).filter((t,o)=>o!==e),o={...this._config,global_actions:t};this._config=o,this._fire(o);const s=new Set(this._openGlobal);s.delete(e),this._openGlobal=s}_toggleVac(e){this._openVac=this._openVac===e?null:e,this._menu=null}_toggleRoom(e,t){const o=new Map(this._openRoom),s=o.get(e)??null;o.set(e,s===t?null:t),this._openRoom=o}_toggleIn(e,t,o){const s=new Set(e);return o??!s.has(t)?s.add(t):s.delete(t),s}_toggleSensors(e,t){this._openSensors=this._toggleIn(this._openSensors,e,t)}_toggleMap(e,t){this._openMap=this._toggleIn(this._openMap,e,t)}_toggleAction(e,t){this._openAction=this._toggleIn(this._openAction,e,t)}_togglePresets(e,t){this._openPresets=this._toggleIn(this._openPresets,e,t)}_toggleGlobal(e){this._openGlobal=this._toggleIn(this._openGlobal,e)}async _ensureHaElements(){if(null!==this._ha)return;const ready=()=>!!customElements.get("ha-selector");if(ready())return void(this._ha=!0);const e=window;if("function"==typeof e.loadCardHelpers){try{const t=await e.loadCardHelpers();for(const e of["entities","tile"]){const o=await t.createCardElement({type:e,entities:[],entity:"sun.sun"});if(await(o?.constructor?.getConfigElement?.()),ready())break}await Promise.race([customElements.whenDefined("ha-selector"),new Promise(e=>setTimeout(e,4e3))])}catch(e){console.warn("[anyvac-card] couldn't load HA form elements, using plain inputs:",e)}this._ha=ready()}else this._ha=!1}_sel(e,t,o,s,l={}){return Ee`<ha-selector class="sel" .hass=${this.hass} .selector=${t} .value=${o}
      label=${e} .required=${!!l.required} .placeholder=${l.placeholder}
      @value-changed=${e=>{e.stopPropagation(),s(e.detail?.value)}}></ha-selector>`}_entityPicker(e,t,o,s,l=!1){if(this._ha)return this._sel(e,{entity:{domain:1===o.length?o[0]:o}},t||void 0,e=>s(e??""),{required:l});const h=o.length?o.join(" / "):"entity_id",d=1===o.length,p=d?"ha-ents-"+o[0]:"ha-entities",u=d?Object.keys(this.hass?.states??{}).filter(e=>e.startsWith(o[0]+".")).sort():null;return Ee`
      ${u?Ee`<datalist id=${p}>${u.map(e=>Ee`<option value=${e}>`)}</datalist>`:De}
      <div class="field">
        <label>${e}${l?Ee`<span class="required"> *</span>`:De}</label>
        <input class="text-input" type="text" list=${p}
          .value=${t??""} placeholder=${h}
          @input=${e=>{const t=e.target.value;(""===t||this.hass.states[t])&&s(t)}}
          @change=${e=>s(e.target.value)} />
      </div>`}_textField(e,t,o,s=""){return this._ha?this._sel(e,{text:{}},t??"",e=>o(e??""),{placeholder:s}):Ee`
      <div class="field">
        <label>${e}</label>
        <input class="text-input" type="text" .value=${t??""} placeholder=${s}
          @change=${e=>o(e.target.value)} />
      </div>`}_resolveColor(e,t){const o=e??t;return et[o]??o}_colorField(e,t,o,s,l){const h=(t??"").toLowerCase(),d=/^#[0-9a-f]{6}$/.test(h)&&!o.some(e=>e.hex.toLowerCase()===h);return Ee`
      <div class="field">
        <span class="field-label">${e}</span>
        <div class="swatches" role="radiogroup" aria-label=${e}>
          ${o.map(e=>Ee`<button type="button" class="swatch ${e.hex.toLowerCase()===h?"swatch--on":""}"
              role="radio" aria-checked=${e.hex.toLowerCase()===h?"true":"false"}
              title=${e.label??e.hex} aria-label=${e.label??e.hex}
              style=${Ue({background:e.hex})} @click=${()=>s(e.hex)}></button>`)}
          <label class="swatch swatch--custom ${d?"swatch--on":""}" title="Custom colour"
            style=${Ue({background:d?h:"transparent"})}>
            ${d?De:Ee`<ha-icon icon="mdi:palette-outline"></ha-icon>`}
            <input type="color" .value=${/^#[0-9a-f]{6}$/.test(h)?h:l}
              @input=${e=>s(e.target.value)} />
          </label>
          ${t?Ee`<button type="button" class="link-btn" @click=${()=>s(void 0)}>Default</button>`:De}
        </div>
      </div>`}_numberSlider(e,t,o,s,l,h,d=""){const p=t??0;if(this._ha)return this._sel(e,{number:{min:o,max:s,step:l,mode:"slider",...d.trim()?{unit_of_measurement:d.trim()}:{}}},p,e=>{const t=Number(e);Number.isNaN(t)||h(Math.min(s,Math.max(o,t)))});return Ee`
      <div class="field field--row">
        <label>${e}</label>
        <div class="slider-wrap">
          <input type="range" class="slider" min=${o} max=${s} step=${l} .value=${String(p)}
            @input=${e=>h(Number(e.target.value))} />
          <span class="slider-val-wrap">
            <input type="number" class="slider-val-input" min=${o} max=${s} step=${l}
              .value=${String(p)}
              @change=${e=>(e=>{const t=Number(e);Number.isNaN(t)||h(Math.min(s,Math.max(o,t)))})(e.target.value)}
              @keydown=${e=>{"Enter"===e.key&&e.target.blur()}} />
            ${d?Ee`<span class="slider-val-suffix">${d}</span>`:De}
          </span>
        </div>
      </div>`}_numberBox(e,t,o,s={}){return this._ha?this._sel(e,{number:{mode:"box",step:1,...void 0!==s.min?{min:s.min}:{},...void 0!==s.max?{max:s.max}:{}}},t,e=>{const t="number"==typeof e?e:parseInt(String(e??""));o(Number.isNaN(t)?void 0:t)},{placeholder:s.placeholder}):Ee`
      <div class="field field--row">
        <label>${e}</label>
        <input class="text-input text-input--sm" type="number" min=${s.min??""} max=${s.max??""}
          .value=${String(t??"")} placeholder=${s.placeholder??""}
          @change=${e=>{const t=parseInt(e.target.value);o(isNaN(t)?void 0:t)}} />
      </div>`}_selectField(e,t,o,s){return this._ha?this._sel(e,{select:{mode:"dropdown",options:o}},t,e=>{null!=e&&s(e)},{required:!0}):Ee`
      <div class="field field--row">
        <label>${e}</label>
        <select class="select-input" @change=${e=>s(e.target.value)}>
          ${o.map(e=>Ee`<option value=${e.value} ?selected=${e.value===t}>${e.label}</option>`)}
        </select>
      </div>`}_segmented(e,t,o,s){return Ee`
      <div class="field">
        <span class="field-label">${e}</span>
        <div class="segmented" role="radiogroup" aria-label=${e}>
          ${o.map(e=>Ee`<button type="button" role="radio" aria-checked=${e.value===t?"true":"false"}
              class="seg ${e.value===t?"seg--on":""}" @click=${()=>{e.value!==t&&s(e.value)}}>
              ${e.icon?Ee`<ha-icon icon=${e.icon}></ha-icon>`:De}<span>${e.label}</span></button>`)}
        </div>
      </div>`}_optionSelectFromList(e,t,o,s){return this._ha?this._sel(e,{select:{mode:"dropdown",options:[{value:"",label:"— none —"},...t.map(e=>({value:e,label:e}))]}},o??"",e=>s(e??"")):Ee`
      <div class="field field--row">
        <label>${e}</label>
        <select class="select-input"
          @change=${e=>s(e.target.value)}>
          <option value="">— none —</option>
          ${t.map(e=>Ee`<option value=${e} ?selected=${e===o}>${e}</option>`)}
        </select>
      </div>`}_optionSelect(e,t,o,s){const l=t?this.hass.states[t]?.attributes.options??[]:[];return l.length?this._optionSelectFromList(e,l,o,s):this._textField(e,o,s,"e.g. balanced")}_iconPickerField(e,t,o="Icon"){return this._ha?this._sel(o,{icon:{}},e??"",e=>t(e??"")):Ee`
      <div class="field">
        <label>${o}</label>
        <ha-icon-picker .value=${e??"mdi:square"}
          @value-changed=${e=>t(e.detail.value)}
        ></ha-icon-picker>
      </div>`}_areaPicker(e,t,o){if(this._ha)return this._sel(e,{area:{}},t??"",e=>o(e??""));const s=Object.values(this.hass?.areas??{});return s.length?Ee`
      <div class="field field--row">
        <label>${e}</label>
        <select class="select-input"
          @change=${e=>o(e.target.value)}>
          <option value="">— not mapped —</option>
          ${[...s].sort((e,t)=>e.name.localeCompare(t.name)).map(e=>Ee`<option value=${e.area_id} ?selected=${e.area_id===t}>${e.name}</option>`)}
        </select>
      </div>`:this._textField(e,t,o,"e.g. living_room")}_toggle(e,t,o){return this._ha?this._sel(e,{boolean:{}},t,e=>o(!!e)):Ee`
      <div class="field field--row">
        <label>${e}</label>
        <label class="toggle-wrap">
          <input type="checkbox" class="toggle-input" .checked=${t}
            @change=${e=>o(e.target.checked)} />
          <span class="toggle-track"></span>
        </label>
      </div>`}_hint(e,t){if(!t)return Ee`<p class="hint">${e}</p>`;const o="string"==typeof e?e:String(this._hintSeq++),s=this._hintsOpen.has(o);return Ee`<p class="hint">${e}
      <button type="button" class="hint-more" aria-expanded=${s?"true":"false"} aria-label="More"
        @click=${()=>{const e=new Set(this._hintsOpen);s?e.delete(o):e.add(o),this._hintsOpen=e}}>
        <ha-icon icon=${s?"mdi:chevron-up":"mdi:information-outline"}></ha-icon></button>
      ${s?Ee`<span class="hint-long">${t}</span>`:De}</p>`}_panel(e,t,o,s,l){return this._ha&&customElements.get("ha-expansion-panel")?Ee`<ha-expansion-panel outlined class="panel" header=${e} secondary=${t??""}
          .expanded=${o}
          @expanded-will-change=${e=>{e.target===e.currentTarget&&s(!!e.detail?.expanded)}}
          @expanded-changed=${e=>{e.target===e.currentTarget&&!!e.detail?.expanded!==o&&s(!!e.detail?.expanded)}}>
        ${o?Ee`<div class="panel-body">${l()}</div>`:De}
      </ha-expansion-panel>`:Ee`
      <div class="collapsible">
        <div class="collapsible-header" @click=${()=>s(!o)}>
          <span class="collapsible-title">${e}</span>
          ${t?Ee`<span class="badge">${t}</span>`:De}
          <ha-icon icon=${o?"mdi:chevron-up":"mdi:chevron-down"} class="acc-chevron"></ha-icon>
        </div>
        ${o?Ee`<div class="collapsible-body">${l()}</div>`:De}
      </div>`}_rowMenu(e,t,o,s){const l=this._menu===e,h=this._confirm===e;return Ee`
      <span class="menu-wrap" @click=${e=>e.stopPropagation()}>
        <button type="button" class="icon-btn" aria-label="More actions" aria-haspopup="menu" aria-expanded=${l?"true":"false"}
          @click=${()=>{this._menu=l?null:e,this._confirm=null}}>
          <ha-icon icon="mdi:dots-vertical"></ha-icon>
        </button>
        ${l?Ee`
          <div class="menu" role="menu">
            ${h?Ee`
              <div class="menu-confirm">Delete ${t}?</div>
              <div class="menu-confirm-row">
                <button type="button" class="menu-btn" @click=${()=>{this._menu=null,this._confirm=null}}>Cancel</button>
                <button type="button" class="menu-btn menu-btn--danger"
                  @click=${()=>{this._menu=null,this._confirm=null,s?.()}}>Delete</button>
              </div>`:Ee`
              ${o.map(e=>Ee`<button type="button" role="menuitem" class="menu-item" ?disabled=${!!e.disabled}
                  @click=${()=>{this._menu=null,e.action()}}>
                  <ha-icon icon=${e.icon}></ha-icon><span>${e.label}</span></button>`)}
              ${s?Ee`<button type="button" role="menuitem" class="menu-item menu-item--danger"
                  @click=${()=>{this._confirm=e}}>
                  <ha-icon icon="mdi:delete-outline"></ha-icon><span>Delete</span></button>`:De}`}
          </div>`:De}
      </span>`}_renderVacuumsTab(){return Ee`
      <div class="tab-body">
        ${0===this._config.vacuums.length?this._hint("No vacuums yet. Add one below."):this._config.vacuums.map((e,t)=>this._renderVacuumAccordion(e,t))}
        <button class="btn btn--add" @click=${()=>this._addVacuum()}>
          <ha-icon icon="mdi:plus"></ha-icon> Add vacuum
        </button>
      </div>`}_roleLabel(e){return"dry"===e?"Dry":"wet"===e?"Wet":"both"===e?"Dry + wet":"Auto role"}_renderVacuumAccordion(e,t){const o=this._resolveColor(e.color,tt[t%tt.length]),s=this._openVac===t,l=this._config.vacuums.length-1,h=e.name||e.entity||"Unnamed vacuum";return Ee`
      <div class="acc-row ${s?"acc-row--open":""}">
        <div class="acc-header" role="button" tabindex="0" aria-expanded=${s?"true":"false"}
          @click=${()=>this._toggleVac(t)}
          @keydown=${e=>{"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),this._toggleVac(t))}}>
          <span class="acc-avatar" style=${Ue({borderColor:o})}>
            ${e.image?Ee`<img src=${e.image} alt="" />`:Ee`<ha-icon icon="mdi:robot-vacuum" style=${Ue({color:o})}></ha-icon>`}
          </span>
          <div class="acc-info">
            <span class="acc-name"><span class="acc-dot" style=${Ue({background:o})}></span>${h}</span>
            <span class="acc-sub">${this._roleLabel(e.clean_type)} · ${e.entity||"no entity"}</span>
          </div>
          ${this._rowMenu("vac-"+t,h,[{label:"Move up",icon:"mdi:arrow-up",action:()=>this._moveVacuum(t,-1),disabled:0===t},{label:"Move down",icon:"mdi:arrow-down",action:()=>this._moveVacuum(t,1),disabled:t===l}],()=>this._deleteVacuum(t))}
          <ha-icon icon=${s?"mdi:chevron-up":"mdi:chevron-down"} class="acc-chevron"></ha-icon>
        </div>

        ${s?Ee`
          <div class="acc-body">
            ${this._entityPicker("Vacuum entity",e.entity,["vacuum"],e=>this._setVacuum(t,{entity:e}),!0)}
            ${this._textField("Display name",e.name,e=>this._setVacuum(t,{name:e}),"e.g. S8")}
            ${this._textField("Image path",e.image,e=>this._setVacuum(t,{image:e}),"/local/...")}
            ${this._colorField("Colour",e.color?this._resolveColor(e.color,"green"):void 0,tt.map(e=>({hex:e})),e=>this._setVacuum(t,{color:e||void 0}),tt[t%tt.length])}
            ${this._segmented("Role",e.clean_type??"auto",[{value:"auto",label:"Auto"},{value:"dry",label:"Dry",icon:"mdi:broom"},{value:"wet",label:"Wet",icon:"mdi:water"},{value:"both",label:"Both",icon:"mdi:water-plus"}],e=>this._setVacuum(t,{clean_type:"auto"===e?void 0:e}))}
            ${this._hint("What this robot can do — not the Dry/Wet choice for a run.",Ee`Controls which time estimate and which dry/wet layer it uses. "Auto" detects it
                from the clean action; "Both" follows the live water mode (needs the integration
                sensor). The run-time Dry/Wet/Both choice is made on the card.`)}

            ${this._renderSensorsSection(t,e)}
            ${this._renderMapSection(t,e)}
            ${this._renderCleanActionSection(t,e)}
            ${this._renderPresetsSection(t,e)}

            ${this._mergedEdit?Ee`
              <p class="hint link" @click=${()=>{this._tab="global"}}>
                Rooms (shared) are edited once for all vacuums on the Global tab →
              </p>
            `:this._renderSplitRooms(t,e)}
          </div>
        `:De}
      </div>`}_renderSplitRooms(e,t){const o=t.rooms??[],s=!!this._intEntityFor(t);return Ee`
      <div class="section-title">Rooms (${o.length})</div>
      ${s?this._hint("Rooms come from this vacuum's map automatically.",Ee`Add a room here only to override its icon/display name, or to position it on a custom floorplan.`):this._hint("Add one entry per room this vacuum can clean.")}
      ${o.map((t,o)=>this._renderRoomAccordion(t,e,o))}
      <button class="btn btn--add" @click=${()=>this._addRoom(e)}>
        <ha-icon icon="mdi:plus"></ha-icon> Add room
      </button>`}_renderSensorsSection(e,t){const o=[t.status_entity,t.battery_entity,t.last_clean_entity,t.progress_entity,t.current_room_entity,t.error_entity].filter(Boolean).length;return this._panel("Sensors",o?`${o} set manually, the rest found automatically`:"Found automatically on the vacuum's device",this._openSensors.has(e),t=>this._toggleSensors(e,t),()=>Ee`
        ${this._hint("Leave blank to use the vacuum's own sensors.")}
        ${this._entityPicker("Status",t.status_entity,["sensor"],t=>this._setVacuum(e,{status_entity:t||void 0}))}
        ${this._entityPicker("Battery",t.battery_entity,["sensor"],t=>this._setVacuum(e,{battery_entity:t||void 0}))}
        ${this._entityPicker("Last clean end",t.last_clean_entity,["sensor"],t=>this._setVacuum(e,{last_clean_entity:t||void 0}))}
        ${this._entityPicker("Progress",t.progress_entity,["sensor"],t=>this._setVacuum(e,{progress_entity:t||void 0}))}
        ${this._entityPicker("Current room",t.current_room_entity,["sensor"],t=>this._setVacuum(e,{current_room_entity:t||void 0}))}
        ${this._entityPicker("Error",t.error_entity,["sensor"],t=>this._setVacuum(e,{error_entity:t||void 0}))}`)}_renderMapSection(e,t){const o=this._mapEntityFor(t),s=t.map?.entity?t.map.entity:o?`Found automatically: ${o}`:"No map image found";return this._panel("Map & floorplan",s,this._openMap.has(e),t=>this._toggleMap(e,t),()=>Ee`
        ${this._entityPicker("Map image entity (override)",t.map?.entity,["image"],t=>this._setMap(e,{entity:t}))}
        ${this._entityPicker("AnyVac sensor (override)",t.integration_entity,["sensor"],t=>this._setVacuum(e,{integration_entity:t||void 0}))}
        ${this._hint("Leave both blank to find them on the vacuum's device.")}
        ${this._mergedEdit?this._hint(Ee`Base layer and stage height are set once for the whole card —
            <strong>Global tab → Floorplan</strong>.`):Ee`
          ${this._selectField("Base layer",t.base??"map",[{value:"map",label:"Live map only"},{value:"image",label:"Custom floorplan image"},{value:"combined",label:"Floorplan + map overlay"}],t=>this._setVacuum(e,{base:t}))}
          ${this._numberSlider("Stage height (0 = auto)",t.base_height??0,0,1200,10,t=>this._setVacuum(e,{base_height:t>0?t:void 0})," px")}
          ${"image"===t.base||"combined"===t.base?this._renderFloorplanTools(e,t):De}
        `}`)}_renderFloorplanTools(e,t){const o=this._currentImageBase(e),s=o?.crop_box,l=s&&"entity"in s&&s.entity===t.entity?s:void 0,h=this._mapEntityFor(t),d=this._hvSwap,p=this._guideExportResult&&this._guideExportResult.entity===t.entity?this._guideExportResult:null;return Ee`
      <div class="sub-section">
        <div class="sub-title">Floorplan image</div>
        ${h?Ee`
          <button class="btn btn--sm" ?disabled=${this._floorplanSnapshotBusy}
            @click=${()=>this._snapshotFloorplan(t)}>
            <ha-icon icon="mdi:camera"></ha-icon>
            ${this._floorplanSnapshotBusy?"Snapshotting…":"Use this vacuum's current map as floorplan"}
          </button>
          ${this._floorplanSnapshotError?Ee`<p class="hint hint--error">${this._floorplanSnapshotError}</p>`:De}
        `:this._hint("No map image entity found for this vacuum — set one above.")}

        ${this._textField("Image src (URL)",o?.src,t=>this._setEditedImageBase({src:t},e),"/local/anyvac/flat.svg")}
        ${o?.src?Ee`
          <img class="fp-preview" src=${o.src} alt="Floorplan preview"
            @load=${e=>{const t=e.target;t.naturalWidth&&t.naturalHeight&&(this._pvNat?.w!==t.naturalWidth||this._pvNat?.h!==t.naturalHeight)&&(this._pvNat={w:t.naturalWidth,h:t.naturalHeight},this._pvAR=t.naturalHeight>0?t.naturalWidth/t.naturalHeight:0)}} />
        `:De}
        ${this._toggle("Swap ↔/↕ slider labels",d,e=>{this._hvSwap=e})}
        ${this._numberSlider("Rotation",o?.rotation??0,-180,180,1,t=>this._setEditedImageBase({rotation:t},e),"°")}
        ${this._numberSlider("Scale",o?.scale??100,10,400,1,t=>this._setEditedImageBase({scale:t},e),"%")}
        ${this._numberSlider(d?"Offset ↕":"Offset ↔",o?.offset_x??0,-100,100,.5,t=>this._setEditedImageBase({offset_x:t},e),"%")}
        ${this._numberSlider(d?"Offset ↔":"Offset ↕",o?.offset_y??0,-100,100,.5,t=>this._setEditedImageBase({offset_y:t},e),"%")}

        ${h?Ee`
          <div class="sub-title">Guide layers</div>
          ${this._hint("Room/path guides for tracing furniture in an image editor.",Ee`Drawn in the same pixel canvas as the floorplan snapshot above, as transparent PNGs.`)}
          <button class="btn btn--sm" ?disabled=${this._guideExportBusy}
            @click=${()=>this._exportMapGuide(t,e)}>
            <ha-icon icon="mdi:layers-outline"></ha-icon>
            ${this._guideExportBusy?"Exporting…":"Export guide layers"}
          </button>
          ${this._guideExportError?Ee`<p class="hint hint--error">${this._guideExportError}</p>`:De}
          ${p?Ee`
            <p class="hint">Exported (${p.size.w}×${p.size.h}px):
              ${Object.keys(p.paths).map(e=>Ee`<code>${e}</code> `)}
              — trace furniture over them, then set the traced file as the Image src above.</p>
            ${p.crop?Ee`
              <button type="button" class="link-btn"
                @click=${()=>this._setEditedImageBase({crop_box:{entity:t.entity,...p.crop}},e)}>
                Use this crop for the floorplan
              </button>
            `:De}
          `:De}
        `:De}

        ${l?Ee`
          <div class="sub-title">Crop box</div>
          <p class="hint">Cut from (${l.x0}, ${l.y0}) – (${l.x1}, ${l.y1})px of this vacuum's map.
            <button type="button" class="link-btn" @click=${()=>this._setEditedImageBase({crop_box:void 0},e)}>Clear</button>
          </p>
          ${!this._pvNat||Math.round(this._pvNat.w)===Math.round(l.x1-l.x0)&&Math.round(this._pvNat.h)===Math.round(l.y1-l.y0)?De:Ee`<p class="hint hint--error">The saved image (${this._pvNat.w}×${this._pvNat.h}px) doesn't
                match this crop box (${Math.round(l.x1-l.x0)}×${Math.round(l.y1-l.y0)}px) —
                re-snapshot or re-export the guide layers above.</p>`}
          <button class="btn btn--sm" @click=${()=>this._placeRoomsFromCropBox()}>
            Place rooms from crop box
          </button>
          ${this._placeRoomsResult?this._hint(`Placed ${this._placeRoomsResult.placed}, added ${this._placeRoomsResult.added} room(s).`):De}
        `:De}
      </div>`}_renderPresetsSection(e,t){const o=t.presets??[],s=this.hass.states[t.entity]?.attributes.fan_speed_list??[],l=t.clean_action,h=l?.mop_mode_entity,d=l?.mop_intensity_entity;return this._panel("Setting presets",o.length?`${o.length} preset${o.length>1?"s":""}`:"None — the clean action's defaults are used",this._openPresets.has(e),t=>this._togglePresets(e,t),()=>Ee`
        ${this._hint("Named “how” bundles picked on the robot sheet.",Ee`Mop entities come from Clean action above; presets only set the values. With fewer
            than 2 presets no chips are shown and the Clean action's defaults are used.`)}
        ${o.map((t,o)=>Ee`
          <div class="sub-section">
            <div class="sub-title sub-title--row">
              <span>${t.label||t.id}</span>
              ${this._rowMenu(`preset-${e}-${o}`,t.label||t.id,[],()=>this._deletePreset(e,o))}
            </div>
            ${this._textField("Label",t.label,t=>this._setPreset(e,o,{label:t}),"e.g. Dry")}
            ${this._iconPickerField(t.icon,t=>this._setPreset(e,o,{icon:t||void 0}))}
            ${s.length?this._optionSelectFromList("Suction",s,t.suction_level,t=>this._setPreset(e,o,{suction_level:t||void 0})):this._textField("Suction",t.suction_level,t=>this._setPreset(e,o,{suction_level:t||void 0}),"e.g. max")}
            ${h?this._optionSelect("Mop mode",h,t.mop_mode,t=>this._setPreset(e,o,{mop_mode:t||void 0})):De}
            ${d?this._optionSelect("Mop intensity",d,t.mop_intensity,t=>this._setPreset(e,o,{mop_intensity:t||void 0})):De}
            ${this._numberSlider("Repeat passes",t.repeat??1,1,3,1,t=>this._setPreset(e,o,{repeat:t}))}
          </div>
        `)}
        <button class="btn btn--add" @click=${()=>this._addPreset(e)}>
          <ha-icon icon="mdi:plus"></ha-icon> Add preset
        </button>`)}_actionSummary(e){return"script"===e.type?"Script"+(e.entity_id?": "+e.entity_id:""):"native-area"===e.type?"Native area (vacuum.clean_area)":"Native (segments)"}_renderCleanActionSection(e,t){const o=t.clean_action??{type:"native"};return this._panel("Clean action",this._actionSummary(o),this._openAction.has(e),t=>this._toggleAction(e,t),()=>this._renderCleanActionEditor(e,t))}_renderCleanActionEditor(e,t){const o=t.clean_action??{type:"native"};return Ee`
      ${this._selectField("Strategy","native-auto"===o.type?"native":o.type,[{value:"native",label:"Native (vacuum.send_command + segment IDs)"},{value:"native-area",label:"Native area (vacuum.clean_area)"},{value:"script",label:"Custom script"}],t=>{if("script"===t)return void this._setVacuum(e,{clean_action:{type:"script",entity_id:""}});const o=this._config.vacuums[e]?.clean_action,s={};if(o&&"script"!==o.type)for(const e of["repeat","suction_level","mop_mode_entity","mop_mode","mop_intensity_entity","mop_intensity"]){const t=o[e];void 0!==t&&(s[e]=t)}this._setVacuum(e,{clean_action:{type:t,...s}})})}
      ${"script"===o.type?this._renderScriptAction(e,o):this._renderNativeOptions(e,o)}`}_renderNativeOptions(e,t){const o="native-area"===t.type?this._hint(Ee`Used without the integration only — with it, START sends <code>anyvac.clean</code>.`,Ee`Calls <code>vacuum.clean_area</code>. No repeat; repeat lives server-side in <code>anyvac.clean</code>.`):this._hint(Ee`Used without the integration only — with it, START sends <code>anyvac.clean</code>.`,Ee`<code>anyvac.clean</code> resolves segments server-side.${"native-auto"===t.type?Ee` This vacuum still carries the retired value <code>native-auto</code>; it behaves exactly
                like Native and is rewritten the next time you pick a strategy.`:De}`),s=this.hass.states[this._config.vacuums[e]?.entity]?.attributes.fan_speed_list??[];return Ee`
      <div class="sub-section">
        ${o}
        ${this._numberSlider("Repeat passes",t.repeat??1,1,3,1,t=>this._setCleanAction(e,{repeat:t}))}
        ${s.length?this._optionSelectFromList("Suction (optional)",s,t.suction_level,t=>this._setCleanAction(e,{suction_level:t||void 0})):this._textField("Suction (optional)",t.suction_level,t=>this._setCleanAction(e,{suction_level:t||void 0}),"e.g. balanced")}
        ${this._entityPicker("Mop mode entity (optional)",t.mop_mode_entity,["select"],t=>this._setCleanAction(e,{mop_mode_entity:t||void 0}))}
        ${t.mop_mode_entity?this._optionSelect("Mop mode",t.mop_mode_entity,t.mop_mode,t=>this._setCleanAction(e,{mop_mode:t||void 0})):De}
        ${this._entityPicker("Mop intensity entity (optional)",t.mop_intensity_entity,["select"],t=>this._setCleanAction(e,{mop_intensity_entity:t||void 0}))}
        ${t.mop_intensity_entity?this._optionSelect("Mop intensity",t.mop_intensity_entity,t.mop_intensity,t=>this._setCleanAction(e,{mop_intensity:t||void 0})):De}
      </div>`}_renderScriptAction(e,t){const o=t.variables??{},s=Object.entries(o);return Ee`
      <div class="sub-section">
        ${this._entityPicker("Script entity",t.entity_id,["script"],t=>this._setCleanAction(e,{entity_id:t}))}
        ${this._hint("Variables passed to the script.",Ee`Tokens: {{ entity }}, {{ selected_segments }}, {{ selected_room_keys }}, {{ selected_area_ids }}`)}
        ${s.map(([t,l],h)=>Ee`
          <div class="var-row">
            ${this._textField("Name",t,t=>{const o=Object.fromEntries(s.map(([e,o],s)=>[s===h?t:e,o]));this._setCleanAction(e,{variables:o})},"name")}
            <span class="var-sep">&#8594;</span>
            ${this._textField("Value",l,s=>{this._setCleanAction(e,{variables:{...o,[t]:s}})},"{{ entity }}")}
            <button class="icon-btn icon-btn--sm" aria-label="Remove variable"
              @click=${()=>{const t=Object.fromEntries(s.filter((e,t)=>t!==h));this._setCleanAction(e,{variables:t})}}>
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          </div>`)}
        <button class="btn btn--add btn--sm"
          @click=${()=>this._setCleanAction(e,{variables:{...o,"":""}})}>
          <ha-icon icon="mdi:plus"></ha-icon> Add variable
        </button>
      </div>`}_renderRoomMetaFields(e,t){return Ee`
      ${this._iconPickerField(e.icon,e=>t({icon:e||void 0}))}
      ${this._selectField("Icon anchor",e.icon_anchor??"c",[{value:"none",label:"Hidden"},{value:"tl",label:"Top-left"},{value:"t",label:"Top"},{value:"tr",label:"Top-right"},{value:"l",label:"Left"},{value:"c",label:"Centre (default)"},{value:"r",label:"Right"},{value:"bl",label:"Bottom-left"},{value:"b",label:"Bottom"},{value:"br",label:"Bottom-right"}],e=>t({icon_anchor:"c"===e?void 0:e}))}
      ${this._numberSlider("Est. dry clean time",e.clean_time_dry??0,0,120,1,e=>t({clean_time_dry:e>0?e:void 0})," min")}
      ${this._numberSlider("Est. wet clean time",e.clean_time_wet??0,0,120,1,e=>t({clean_time_wet:e>0?e:void 0})," min")}
      ${this._hint("Leave at 0 to use the integration's learned estimate.",Ee`Used for this room's remaining time until the AnyVac integration has learned its own
          (or the legacy fallback below, for setups without it).`)}`}_renderRoomBackendFields(e,t,o,s){return t&&this._intEntityFor(t)?this._hint("Segments, timing and history are handled by the AnyVac integration."):"native-area"===t?.clean_action?.type?Ee`
        <div class="field field--row">
          <label>Effective area</label>
          <strong class="value">${e.area_id??this._config.area_mappings?.[e.key]??e.key}</strong>
        </div>
        ${s}`:Ee`
      ${this._numberBox("Segment ID",e.segment_id,e=>o({segment_id:e}),{min:0,placeholder:"e.g. 16"})}
      ${this._hint(Ee`Find IDs: Developer Tools → Actions → <code>roborock.get_maps</code>`)}
      ${this._numberSlider("Est. clean time (fallback)",e.clean_time_mins??0,0,120,1,e=>o({clean_time_mins:e>0?e:void 0})," min")}
      ${this._entityPicker("Clean time fallback (input_number, legacy)",e.clean_time_entity,["input_number"],e=>o({clean_time_entity:e||void 0}))}
      ${this._entityPicker("Last clean fallback (input_datetime, legacy)",e.last_clean_entity,["input_datetime"],e=>o({last_clean_entity:e||void 0}))}
      ${this._hint("Legacy read-only fallbacks for setups without the integration.")}`}_roomRow(e,t,o,s,l,h,d,p,u){const m=this._dragRoom&&this._dragRoom.vac===t&&this._dragRoom.idx!==o;return Ee`
      <div class="room-acc ${m?"room-acc--drop":""}"
        @dragover=${e=>{this._dragRoom&&this._dragRoom.vac===t&&e.preventDefault()}}
        @drop=${e=>{e.preventDefault(),this._dragRoom&&this._dragRoom.vac===t&&d(this._dragRoom.idx),this._dragRoom=null}}>
        <div class="room-acc-header" @click=${l}>
          <ha-icon class="drag" icon="mdi:drag-horizontal-variant" title="Drag to reorder"
            draggable="true"
            @click=${e=>e.stopPropagation()}
            @dragstart=${e=>{this._dragRoom={vac:t,idx:o},e.dataTransfer&&(e.dataTransfer.effectAllowed="move")}}
            @dragend=${()=>{this._dragRoom=null}}></ha-icon>
          <ha-icon class="room-acc-icon" icon=${e.icon||"mdi:square"}></ha-icon>
          <div class="room-acc-info">
            <span class="room-acc-name">${e.name||e.key||"Unnamed room"}</span>
            ${p}
          </div>
          ${this._rowMenu(`room-${t}-${o}`,e.name||e.key||"this room",[],h)}
          <ha-icon icon=${s?"mdi:chevron-up":"mdi:chevron-down"} class="acc-chevron"></ha-icon>
        </div>
        ${s?Ee`<div class="room-acc-body">${u()}</div>`:De}
      </div>`}_renderRoomAccordion(e,t,o){const s=(this._openRoom.get(t)??null)===o,l=this._config.vacuums[t],set=e=>this._setRoom(t,o,e);return this._roomRow(e,t,o,s,()=>this._toggleRoom(t,o),()=>this._deleteRoom(t,o),e=>this._moveRoom(t,e,o),void 0===e.segment_id||this._intEntityFor(l)?De:Ee`<span class="room-acc-meta">seg ${e.segment_id}</span>`,()=>Ee`
        ${this._textField("Key (unique ID)",e.key,e=>set({key:e}),"e.g. bedroom")}
        ${this._hint("Keep it identical to the room's name in the Roborock app.","The AnyVac integration matches rooms by this name (auto-seating, live positions, room pinning).")}
        ${this._textField("Display name",e.name,e=>set({name:e}),"e.g. Bedroom")}
        ${this._renderRoomMetaFields(e,set)}
        ${this._renderRoomBackendFields(e,l,set,Ee`<p class="hint link" @click=${()=>{this._tab="global"}}>Set in Global tab → Area mappings →</p>`)}
        ${this._hint("Position and size are set in the Visual editor's Rooms tool.","The cleaning sequence is shared and backend-owned — reorder it on the Global tab in merged mode, or in the Roborock app.")}`)}_renderMergedRoomAccordion(e,t){const o=(this._openRoom.get(-1)??null)===t,set=e=>this._setEditedRoom(t,e);return this._roomRow(e,-1,t,o,()=>this._toggleRoom(-1,t),()=>this._deleteEditedRoom(t),e=>this._moveMergedRoom(e,t),De,()=>Ee`
        ${this._textField("Key (unique ID)",e.key,e=>set({key:e}),"e.g. bedroom")}
        ${this._hint("Keep it identical to the room's name in the Roborock app.","The AnyVac integration matches rooms by this name (auto-seating, live positions, room pinning).")}
        ${this._textField("Display name",e.name,e=>set({name:e}),"e.g. Bedroom")}
        ${this._renderRoomMetaFields(e,set)}
        ${this._renderRoomBackendFields(e,this._config.vacuums[0],set,this._hint("Set in Area mappings, further down this tab."))}
        ${this._hint("Position and size are set in the Visual editor's Rooms tool.")}`)}_moveMergedRoom(e,t){if(e===t)return;const o=[...this._config.rooms??[]];if(e<0||e>=o.length||t<0||t>=o.length)return;const[s]=o.splice(e,1);o.splice(t,0,s),this._setConfig({rooms:o})}_renderSequenceSection(){const e=this._config.vacuums.find(e=>this._intEntityFor(e));if(!e)return De;const t=this._config.rooms??[];if(!t.length)return De;const o=this._roomSequence(e),s=this._roomsInSequenceOrder(t,o);return Ee`
      <div class="section-title">Cleaning sequence</div>
      ${this._hint("Shared by every vacuum — drag to reorder.","Backend-owned; the Roborock app's room order is the same list.")}
      <div class="seq-list">
        ${s.map((t,o)=>Ee`
          <div class="seq-row ${null!==this._dragSeq&&this._dragSeq!==o?"seq-row--drop":""}"
            @dragover=${e=>{null!==this._dragSeq&&e.preventDefault()}}
            @drop=${t=>{t.preventDefault(),null!==this._dragSeq&&this._moveSequence(e,s,this._dragSeq,o),this._dragSeq=null}}>
            <ha-icon class="drag" icon="mdi:drag-horizontal-variant" title="Drag to reorder"
              draggable="true"
              @dragstart=${e=>{this._dragSeq=o,e.dataTransfer&&(e.dataTransfer.effectAllowed="move")}}
              @dragend=${()=>{this._dragSeq=null}}></ha-icon>
            <ha-icon class="seq-icon" icon=${t.icon||"mdi:square"}></ha-icon>
            <span class="seq-name">${t.name||t.key}</span>
            <span class="seq-pos">${o+1}</span>
          </div>
        `)}
      </div>`}_dbgRow(e,t){return Ee`<div class="field field--row">
      <label>${e}</label>
      <span class="mono">${null==t||""===t?"—":String(t)}</span>
    </div>`}_renderDebugTab(){const fmt=e=>{try{return JSON.stringify(e,null,1)}catch{return String(e)}};return Ee`
      <div class="tab-body">
        ${this._hint("Live values from Home Assistant, read-only.")}
        ${this._toggle("Room progress gauges on map",this._config.debug_room_progress??!1,e=>this._setConfig({debug_room_progress:e||void 0}))}
        ${this._hint("A small % gauge on each room.","Spatial coverage — approximate: the room box includes furniture, so it plateaus below 100%.")}
        ${this._toggle("Dense portrait room list",this._config.debug_dense_dock??!1,e=>this._setConfig({debug_dense_dock:e||void 0}))}
        ${this._hint("The old portrait room list instead of the rail.","Name, age, pin and assigned vacuum per room. Independent of the gauges toggle above.")}
        ${this._config.vacuums.map(e=>{const t=this._intEntityFor(e),o=t?this.hass.states[t]:void 0,s=o?.attributes??{},l=s.mop_signal??{};return Ee`
            <div class="section-title">${e.name??e.entity}</div>
            <div class="sub-section">
              ${t?o?Ee`
                    ${this._dbgRow("sensor",`${t} = ${o.state}`)}
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
                    <pre class="pre">${fmt((s.rooms??[]).map(e=>({name:e.name,bbox_px:e.bbox_px,x0:e.x0,y0:e.y0,x1:e.x1,y1:e.y1})))}</pre>
                    <details><summary class="hint">Raw attributes</summary><pre class="pre">${fmt(s)}</pre></details>
                  `:this._hint(Ee`Sensor <code>${t}</code> not found.`):this._hint("No AnyVac integration sensor found — backend values unavailable.")}
            </div>`})}
      </div>
    `}_renderGlobalTab(){const e=this._config.global_actions??[],t=this._config.room_thresholds??kt;return Ee`
      <div class="tab-body">

        <div class="section-title">Appearance</div>
        ${this._selectField("Theme",this._config.theme??at,[{value:"dark",label:"Dark"},{value:"light",label:"Light"},{value:"auto",label:"Auto — follow the system"},{value:"legacy",label:"Legacy — the pre-1.2.0 look"}],e=>this._setConfig({theme:e===at?void 0:e}))}
        ${this._colorField("Accent colour",this._config.accent,st,e=>this._setConfig({accent:e||void 0}),"#6FBF73")}
        ${this._hint("START, room selection and focus rings.","Status colours are deliberately left alone — their saturation carries meaning (cleaning / mopping / error).")}
        ${this._toggle("Calm resting state",!1!==this._config.calm_state,e=>this._setConfig({calm_state:!!e&&void 0}))}
        ${this._hint("Idle: the leftover trace and secondary numbers step back.","Nothing is hidden or disabled — it's purely de-emphasis.")}
        ${this._toggle("Reduce motion",!!this._config.reduce_motion,e=>this._setConfig({reduce_motion:!!e||void 0}))}
        ${this._hint("Turns off animations on the map and the start sequence.",'The operating system\'s own "reduce motion" setting already does this — this is for switching them off without changing that.')}

        <div class="section-title">Layout</div>
        ${this._toggle("Fit card to available screen space",!!this._config.layout,e=>this._setConfig({layout:e?this._config.layout??{}:void 0}))}
        ${this._hint("Recommended — portrait/landscape profiles sized to the screen.","Off keeps the older rendering that grows as tall as its content. Per-profile tuning (columns/rows, crop, orientation, topology) is YAML-only.")}
        ${this._config.layout?Ee`
          ${this._toggle("Flip portrait map 180°",!0===this._config.layout.portrait?.crop?.flip,e=>this._setLayoutFlip("portrait",e))}
          ${this._toggle("Flip landscape map 180°",!0===this._config.layout.landscape?.crop?.flip,e=>this._setLayoutFlip("landscape",e))}
          ${this._hint("A saved default; the map toolbar's Flip is a quick, unsaved try-out.")}
        `:De}

        <div class="section-title">Controller</div>
        ${this._segmented("Mode",this._config.ui_mode??"auto",[{value:"auto",label:"Auto — one START"},{value:"manual",label:"Manual — per robot"}],e=>this._setConfig({ui_mode:e}))}

        ${this._mergedEdit?Ee`
          <div class="section-title">Floorplan</div>
          ${this._textField("Image src (URL)",this._config.image_base?.src,e=>this._setConfig({image_base:{...this._config.image_base??{src:""},src:e}}),"/local/anyvac/flat.svg")}
          ${this._hint("Rotation, scale and room layout are set in the Visual editor.",this._config.image_base?.src?"This field is only for pointing at a new file (e.g. after snapshotting or tracing one externally).":"Set this once to bootstrap the shared floorplan — after that, the Visual editor's Snapshot buttons can replace it.")}
          ${this._numberSlider("Stage height (0 = auto)",this._config.base_height??0,0,1200,10,e=>this._setConfig({base_height:e>0?e:void 0})," px")}

          <div class="section-title">Rooms (shared)</div>
          ${this._config.vacuums.some(e=>this._intEntityFor(e))?this._hint("Rooms come from the integration automatically.","Add a room here only to override its icon/display name or clean-time estimates."):this._hint("One list for every vacuum — add one entry per room.")}
          ${(this._config.rooms??[]).map((e,t)=>this._renderMergedRoomAccordion(e,t))}
          <button class="btn btn--add" @click=${()=>this._addEditedRoom()}>
            <ha-icon icon="mdi:plus"></ha-icon> Add room
          </button>
          ${this._renderSequenceSection()}
        `:De}

        <div class="section-title">Global presets (Auto mode)</div>
        ${this._hint("Targeted whole-home cleans, e.g. “After dinner”.","The integration decides which robots and the order; you pick the scope and mode.")}
        ${(this._config.global_presets??[]).map((e,t)=>Ee`
          <div class="sub-section">
            <div class="sub-title sub-title--row">
              <span>${e.label||e.id}</span>
              ${this._rowMenu("gp-"+t,e.label||e.id,[],()=>this._deleteGlobalPreset(t))}
            </div>
            ${this._textField("Label",e.label,e=>this._setGlobalPreset(t,{label:e}),"e.g. After dinner")}
            ${this._iconPickerField(e.icon,e=>this._setGlobalPreset(t,{icon:e||void 0}))}
            ${this._segmented("Scope","all"===e.scope?"all":"select",[{value:"all",label:"Whole home"},{value:"select",label:"Pick on map"}],e=>this._setGlobalPreset(t,{scope:e}))}
            ${this._segmented("Mode",e.mode??"dry",[{value:"dry",label:"Dry",icon:"mdi:broom"},{value:"wet",label:"Wet",icon:"mdi:water"},{value:"both",label:"Both",icon:"mdi:water-plus"}],e=>this._setGlobalPreset(t,{mode:e}))}
          </div>
        `)}
        <button class="btn btn--add" @click=${()=>this._addGlobalPreset()}>
          <ha-icon icon="mdi:plus"></ha-icon> Add global preset
        </button>

        <div class="section-title">Global actions</div>
        ${this._hint("Badges that run a script across all vacuums.")}
        ${e.map((e,t)=>this._renderGlobalAccordion(e,t))}
        <button class="btn btn--add" @click=${()=>this._addGlobal()}>
          <ha-icon icon="mdi:plus"></ha-icon> Add global action
        </button>

        <div class="section-title">Room appearance</div>
        ${this._toggle("Hide room icons",this._config.room_icon_hidden??!1,e=>this._setConfig({room_icon_hidden:e||void 0}))}
        ${this._numberSlider("Border (idle)",this._config.room_border_normal??2,0,12,1,e=>this._setConfig({room_border_normal:e}),"px")}
        ${this._numberSlider("Border (selected)",this._config.room_border_selected??4,0,12,1,e=>this._setConfig({room_border_selected:e}),"px")}

        <div class="section-title">Thresholds</div>
        ${this._hint("Room age colours — first match wins, beyond the last is red.")}
        ${t.map((e,o)=>Ee`
          <div class="var-row threshold-row">
            <span class="threshold-label">≤</span>
            ${this._numberBox("Days",e.days,e=>{const s=t.map((t,s)=>s===o?{...t,days:e??t.days}:t);this._setConfig({room_thresholds:s})},{min:0,max:365})}
            <input type="color" class="threshold-color" aria-label="Colour" .value=${e.color}
              @input=${e=>{const s=e.target.value,l=t.map((e,t)=>t===o?{...e,color:s}:e);this._setConfig({room_thresholds:l})}} />
            <button class="icon-btn icon-btn--sm" aria-label="Remove threshold"
              @click=${()=>{const e=t.filter((e,t)=>t!==o);this._setConfig({room_thresholds:e.length?e:void 0})}}>
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          </div>`)}
        <div class="btn-row">
          <button class="btn btn--add btn--sm" @click=${()=>this._setConfig({room_thresholds:[...t,{days:14,color:"#ff4d4f"}]})}>
            <ha-icon icon="mdi:plus"></ha-icon> Add threshold
          </button>
          ${this._config.room_thresholds?Ee`
            <button class="btn btn--sm" @click=${()=>this._setConfig({room_thresholds:void 0})}>
              Reset to defaults
            </button>
          `:De}
        </div>

        <div class="section-title">Notifications</div>
        ${this._hint("Built from the integration's events with ready-made blueprints.",Ee`Settings → Automations → Create with blueprint: <strong>Clean finished</strong>
            (<code>anyvac_clean_finished</code>), <strong>Vacuum error</strong> (the Roborock error sensor)
            and <strong>Room overdue</strong> (hourly check against a day threshold).
            <code>anyvac_clean_started</code> and <code>anyvac_room_done</code> have no blueprint yet.`)}

        ${(()=>{const e=this._config.vacuums.some(e=>"native-area"===e.clean_action?.type);if(!e)return De;const t=[...new Set(this._config.vacuums.flatMap(e=>(e.rooms??[]).map(e=>e.key)).filter(Boolean))].sort(),o=this._config.area_mappings??{};return Ee`
            <div class="section-title">Area mappings</div>
            ${this._hint("Room key → HA area, for the native-area strategy.","Used without the AnyVac integration only. Applies to all vacuums.")}
            ${0===t.length?this._hint("No rooms configured yet."):t.map(e=>this._areaPicker(e,o[e],t=>{const s={...o};t?s[e]=t:delete s[e],this._setConfig({area_mappings:Object.keys(s).length?s:void 0})}))}
          `})()}

      </div>`}_renderGlobalAccordion(e,t){const o=this._resolveColor(e.color,"orange"),s=this._openGlobal.has(t),l=e.action,h=e.watch_entities??[];return Ee`
      <div class="acc-row ${s?"acc-row--open":""}">
        <div class="acc-header" role="button" tabindex="0" aria-expanded=${s?"true":"false"}
          @click=${()=>this._toggleGlobal(t)}
          @keydown=${e=>{"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),this._toggleGlobal(t))}}>
          <span class="acc-avatar" style=${Ue({borderColor:o})}>
            ${e.image?Ee`<img src=${e.image} alt="" />`:Ee`<ha-icon icon="mdi:home-floor-a" style=${Ue({color:o})}></ha-icon>`}
          </span>
          <div class="acc-info">
            <span class="acc-name">${e.name||"Unnamed action"}</span>
            <span class="acc-sub">${"script"===l.type?l.entity_id:l.service}</span>
          </div>
          ${this._rowMenu("ga-"+t,e.name||"this action",[],()=>this._deleteGlobal(t))}
          <ha-icon icon=${s?"mdi:chevron-up":"mdi:chevron-down"} class="acc-chevron"></ha-icon>
        </div>
        ${s?Ee`
          <div class="acc-body">
            ${this._textField("Display name",e.name,e=>this._setGlobal(t,{name:e}),"e.g. Whole flat")}
            ${this._textField("Image path",e.image,e=>this._setGlobal(t,{image:e||void 0}),"/local/...")}
            ${this._colorField("Colour",e.color?this._resolveColor(e.color,"orange"):void 0,tt.map(e=>({hex:e})),e=>this._setGlobal(t,{color:e||void 0}),"#faad14")}
            ${this._ha?this._sel("Watch entities (badge glows while any is cleaning)",{entity:{domain:"vacuum",multiple:!0}},h,e=>this._setGlobal(t,{watch_entities:(Array.isArray(e)?e:[]).filter(Boolean)})):Ee`
                <div class="sub-title">Watch entities (badge glows while any is cleaning)</div>
                ${h.map((e,o)=>Ee`
                  <div class="var-row">
                    ${this._entityPicker("Vacuum",e,["vacuum"],e=>{const s=[...h];s[o]=e,this._setGlobal(t,{watch_entities:s.filter(Boolean)})})}
                    <button class="icon-btn icon-btn--sm" aria-label="Remove"
                      @click=${()=>this._setGlobal(t,{watch_entities:h.filter((e,t)=>t!==o)})}>
                      <ha-icon icon="mdi:close"></ha-icon>
                    </button>
                  </div>`)}
                <button class="btn btn--add btn--sm"
                  @click=${()=>this._setGlobal(t,{watch_entities:[...h,""]})}>
                  <ha-icon icon="mdi:plus"></ha-icon> Add entity
                </button>`}

            <div class="sub-title">Action (hold to run)</div>
            ${this._segmented("Type",l.type,[{value:"script",label:"Script"},{value:"service",label:"Service call"}],e=>this._setGlobal(t,{action:"script"===e?{type:"script",entity_id:""}:{type:"service",service:""}}))}
            ${"script"===l.type?this._entityPicker("Script entity",l.entity_id,["script"],e=>this._setGlobalAction(t,{entity_id:e})):this._textField("Service",l.service,e=>this._setGlobalAction(t,{service:e}),"e.g. script.celkovy_uklid_bytu")}
          </div>
        `:De}
      </div>`}render(){return this._config?null===this._ha?Ee`<div class="loading">Loading…</div>`:(this._hintSeq=0,Ee`
      ${this._ha?De:Ee`<datalist id="ha-entities"></datalist>`}
      <div class="editor-root" @click=${()=>{this._menu&&(this._menu=null,this._confirm=null)}}>
        <div class="tabs-bar" role="tablist">
          ${["vacuums","global"].map(e=>Ee`
            <button class="tab-btn ${this._tab===e?"tab-btn--active":""}" role="tab"
              aria-selected=${this._tab===e?"true":"false"}
              @click=${()=>{this._tab=e}}>
              <ha-icon icon=${"vacuums"===e?"mdi:robot-vacuum":"mdi:tune-variant"}></ha-icon>
              ${{vacuums:"Vacuums",global:"Global"}[e]}
            </button>`)}
        </div>
        ${"vacuums"===this._tab?this._renderVacuumsTab():"debug"===this._tab?this._renderDebugTab():this._renderGlobalTab()}
        <div class="editor-footer">
          <button type="button" class="link-btn" @click=${()=>{this._tab="debug"===this._tab?"vacuums":"debug"}}>
            ${"debug"===this._tab?"← Back":"Debug info"}
          </button>
          <span>anyvac-card v${Xe}</span>
        </div>
      </div>`):De}};St.styles=i$6`
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
  `,__decorate([n$1({attribute:!1})],St.prototype,"hass",void 0),__decorate([r()],St.prototype,"_config",void 0),__decorate([r()],St.prototype,"_tab",void 0),__decorate([r()],St.prototype,"_dragRoom",void 0),__decorate([r()],St.prototype,"_dragSeq",void 0),__decorate([r()],St.prototype,"_openVac",void 0),__decorate([r()],St.prototype,"_openSensors",void 0),__decorate([r()],St.prototype,"_openMap",void 0),__decorate([r()],St.prototype,"_openPresets",void 0),__decorate([r()],St.prototype,"_openAction",void 0),__decorate([r()],St.prototype,"_openGlobal",void 0),__decorate([r()],St.prototype,"_openRoom",void 0),__decorate([r()],St.prototype,"_hvSwap",void 0),__decorate([r()],St.prototype,"_pvAR",void 0),__decorate([r()],St.prototype,"_pvNat",void 0),__decorate([r()],St.prototype,"_floorplanSnapshotBusy",void 0),__decorate([r()],St.prototype,"_floorplanSnapshotError",void 0),__decorate([r()],St.prototype,"_guideExportBusy",void 0),__decorate([r()],St.prototype,"_guideExportError",void 0),__decorate([r()],St.prototype,"_guideExportResult",void 0),__decorate([r()],St.prototype,"_placeRoomsResult",void 0),__decorate([r()],St.prototype,"_ha",void 0),__decorate([r()],St.prototype,"_menu",void 0),__decorate([r()],St.prototype,"_confirm",void 0),__decorate([r()],St.prototype,"_hintsOpen",void 0),St=__decorate([t$1(Ke)],St);export{ft as AnyVacCard,St as AnyVacCardEditor};
