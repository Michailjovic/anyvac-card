/* AnyVac Card — https://github.com/Michailjovic/anyvac-card */
function __decorate(t,e,o,s){var l,h=arguments.length,d=h<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,o):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)d=Reflect.decorate(t,e,o,s);else for(var p=t.length-1;p>=0;p--)(l=t[p])&&(d=(h<3?l(d):h>3?l(e,o,d):l(e,o))||d);return h>3&&d&&Object.defineProperty(e,o,d),d}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,o=Symbol(),s=new WeakMap;let l=class n{constructor(t,e,s){if(this._$cssResult$=!0,s!==o)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const o=this.t;if(e&&void 0===t){const e=void 0!==o&&1===o.length;e&&(t=s.get(o)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&s.set(o,t))}return t}toString(){return this.cssText}};const i$6=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,o,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+t[s+1],t[0]);return new l(s,t,o)},h=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const o of t.cssRules)e+=o.cssText;return(t=>new l("string"==typeof t?t:t+"",void 0,o))(e)})(t):t,{is:d,defineProperty:p,getOwnPropertyDescriptor:m,getOwnPropertyNames:u,getOwnPropertySymbols:_,getPrototypeOf:f}=Object,b=globalThis,v=b.trustedTypes,w=v?v.emptyScript:"",$=b.reactiveElementPolyfillSupport,d$2=(t,e)=>t,A={toAttribute(t,e){switch(e){case Boolean:t=t?w:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let o=t;switch(e){case Boolean:o=null!==t;break;case Number:o=null===t?null:Number(t);break;case Object:case Array:try{o=JSON.parse(t)}catch(t){o=null}}return o}},f$2=(t,e)=>!d(t,e),C={attribute:!0,type:String,converter:A,reflect:!1,useDefault:!1,hasChanged:f$2};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),b.litPropertyMetadata??=new WeakMap;let P=class y extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=C){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const o=Symbol(),s=this.getPropertyDescriptor(t,o,e);void 0!==s&&p(this.prototype,t,s)}}static getPropertyDescriptor(t,e,o){const{get:s,set:l}=m(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const h=s?.call(this);l?.call(this,e),this.requestUpdate(t,h,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??C}static _$Ei(){if(this.hasOwnProperty(d$2("elementProperties")))return;const t=f(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(d$2("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(d$2("properties"))){const t=this.properties,e=[...u(t),..._(t)];for(const o of e)this.createProperty(o,t[o])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,o]of e)this.elementProperties.set(t,o)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const o=this._$Eu(t,e);void 0!==o&&this._$Eh.set(o,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const o=new Set(t.flat(1/0).reverse());for(const t of o)e.unshift(h(t))}else void 0!==t&&e.push(h(t));return e}static _$Eu(t,e){const o=e.attribute;return!1===o?void 0:"string"==typeof o?o:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const o of e.keys())this.hasOwnProperty(o)&&(t.set(o,this[o]),delete this[o]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const o=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((o,s)=>{if(e)o.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of s){const s=document.createElement("style"),l=t.litNonce;void 0!==l&&s.setAttribute("nonce",l),s.textContent=e.cssText,o.appendChild(s)}})(o,this.constructor.elementStyles),o}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,o){this._$AK(t,o)}_$ET(t,e){const o=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,o);if(void 0!==s&&!0===o.reflect){const l=(void 0!==o.converter?.toAttribute?o.converter:A).toAttribute(e,o.type);this._$Em=t,null==l?this.removeAttribute(s):this.setAttribute(s,l),this._$Em=null}}_$AK(t,e){const o=this.constructor,s=o._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=o.getPropertyOptions(s),l="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:A;this._$Em=s;const h=l.fromAttribute(e,t.type);this[s]=h??this._$Ej?.get(s)??h,this._$Em=null}}requestUpdate(t,e,o,s=!1,l){if(void 0!==t){const h=this.constructor;if(!1===s&&(l=this[t]),o??=h.getPropertyOptions(t),!((o.hasChanged??f$2)(l,e)||o.useDefault&&o.reflect&&l===this._$Ej?.get(t)&&!this.hasAttribute(h._$Eu(t,o))))return;this.C(t,e,o)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:o,reflect:s,wrapped:l},h){o&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,h??e??this[t]),!0!==l||void 0!==h)||(this._$AL.has(t)||(this.hasUpdated||o||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,o]of t){const{wrapped:t}=o,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,o,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};P.elementStyles=[],P.shadowRootOptions={mode:"open"},P[d$2("elementProperties")]=new Map,P[d$2("finalized")]=new Map,$?.({ReactiveElement:P}),(b.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const F=globalThis,i$4=t=>t,E=F.trustedTypes,T=E?E.createPolicy("lit-html",{createHTML:t=>t}):void 0,O="$lit$",B=`lit$${Math.random().toFixed(9).slice(2)}$`,j="?"+B,W=`<${j}>`,G=document,c$1=()=>G.createComment(""),a$1=t=>null===t||"object"!=typeof t&&"function"!=typeof t,q=Array.isArray,U="[ \t\n\f\r]",Y=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,K=/-->/g,X=/>/g,J=RegExp(`>|${U}(?:([^\\s"'>=/]+)(${U}*=${U}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),Q=/'/g,tt=/"/g,et=/^(?:script|style|textarea|title)$/i,it=Symbol.for("lit-noChange"),ot=Symbol.for("lit-nothing"),at=new WeakMap,st=G.createTreeWalker(G,129);function V$1(t,e){if(!q(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==T?T.createHTML(e):e}let nt=class S{constructor({strings:t,_$litType$:e},o){let s;this.parts=[];let l=0,h=0;const d=t.length-1,p=this.parts,[m,u]=((t,e)=>{const o=t.length-1,s=[];let l,h=2===e?"<svg>":3===e?"<math>":"",d=Y;for(let e=0;e<o;e++){const o=t[e];let p,m,u=-1,_=0;for(;_<o.length&&(d.lastIndex=_,m=d.exec(o),null!==m);)_=d.lastIndex,d===Y?"!--"===m[1]?d=K:void 0!==m[1]?d=X:void 0!==m[2]?(et.test(m[2])&&(l=RegExp("</"+m[2],"g")),d=J):void 0!==m[3]&&(d=J):d===J?">"===m[0]?(d=l??Y,u=-1):void 0===m[1]?u=-2:(u=d.lastIndex-m[2].length,p=m[1],d=void 0===m[3]?J:'"'===m[3]?tt:Q):d===tt||d===Q?d=J:d===K||d===X?d=Y:(d=J,l=void 0);const f=d===J&&t[e+1].startsWith("/>")?" ":"";h+=d===Y?o+W:u>=0?(s.push(p),o.slice(0,u)+O+o.slice(u)+B+f):o+B+(-2===u?e:f)}return[V$1(t,h+(t[o]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]})(t,e);if(this.el=S.createElement(m,o),st.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=st.nextNode())&&p.length<d;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(O)){const e=u[h++],o=s.getAttribute(t).split(B),d=/([.?@])?(.*)/.exec(e);p.push({type:1,index:l,name:d[2],strings:o,ctor:"."===d[1]?ht:"?"===d[1]?dt:"@"===d[1]?pt:ct}),s.removeAttribute(t)}else t.startsWith(B)&&(p.push({type:6,index:l}),s.removeAttribute(t));if(et.test(s.tagName)){const t=s.textContent.split(B),e=t.length-1;if(e>0){s.textContent=E?E.emptyScript:"";for(let o=0;o<e;o++)s.append(t[o],c$1()),st.nextNode(),p.push({type:2,index:++l});s.append(t[e],c$1())}}}else if(8===s.nodeType)if(s.data===j)p.push({type:2,index:l});else{let t=-1;for(;-1!==(t=s.data.indexOf(B,t+1));)p.push({type:7,index:l}),t+=B.length-1}l++}}static createElement(t,e){const o=G.createElement("template");return o.innerHTML=t,o}};function M$1(t,e,o=t,s){if(e===it)return e;let l=void 0!==s?o._$Co?.[s]:o._$Cl;const h=a$1(e)?void 0:e._$litDirective$;return l?.constructor!==h&&(l?._$AO?.(!1),void 0===h?l=void 0:(l=new h(t),l._$AT(t,o,s)),void 0!==s?(o._$Co??=[])[s]=l:o._$Cl=l),void 0!==l&&(e=M$1(t,l._$AS(t,e.values),l,s)),e}let rt=class R{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:o}=this._$AD,s=(t?.creationScope??G).importNode(e,!0);st.currentNode=s;let l=st.nextNode(),h=0,d=0,p=o[0];for(;void 0!==p;){if(h===p.index){let e;2===p.type?e=new lt(l,l.nextSibling,this,t):1===p.type?e=new p.ctor(l,p.name,p.strings,this,t):6===p.type&&(e=new mt(l,this,t)),this._$AV.push(e),p=o[++d]}h!==p?.index&&(l=st.nextNode(),h++)}return st.currentNode=G,s}p(t){let e=0;for(const o of this._$AV)void 0!==o&&(void 0!==o.strings?(o._$AI(t,o,e),e+=o.strings.length-2):o._$AI(t[e])),e++}},lt=class k{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,o,s){this.type=2,this._$AH=ot,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=o,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=M$1(this,t,e),a$1(t)?t===ot||null==t||""===t?(this._$AH!==ot&&this._$AR(),this._$AH=ot):t!==this._$AH&&t!==it&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>q(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==ot&&a$1(this._$AH)?this._$AA.nextSibling.data=t:this.T(G.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:o}=t,s="number"==typeof o?this._$AC(t):(void 0===o.el&&(o.el=nt.createElement(V$1(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new rt(s,this),o=t.u(this.options);t.p(e),this.T(o),this._$AH=t}}_$AC(t){let e=at.get(t.strings);return void 0===e&&at.set(t.strings,e=new nt(t)),e}k(t){q(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let o,s=0;for(const l of t)s===e.length?e.push(o=new k(this.O(c$1()),this.O(c$1()),this,this.options)):o=e[s],o._$AI(l),s++;s<e.length&&(this._$AR(o&&o._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=i$4(t).nextSibling;i$4(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}},ct=class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,o,s,l){this.type=1,this._$AH=ot,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=l,o.length>2||""!==o[0]||""!==o[1]?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=ot}_$AI(t,e=this,o,s){const l=this.strings;let h=!1;if(void 0===l)t=M$1(this,t,e,0),h=!a$1(t)||t!==this._$AH&&t!==it,h&&(this._$AH=t);else{const s=t;let d,p;for(t=l[0],d=0;d<l.length-1;d++)p=M$1(this,s[o+d],e,d),p===it&&(p=this._$AH[d]),h||=!a$1(p)||p!==this._$AH[d],p===ot?t=ot:t!==ot&&(t+=(p??"")+l[d+1]),this._$AH[d]=p}h&&!s&&this.j(t)}j(t){t===ot?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},ht=class I extends ct{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===ot?void 0:t}},dt=class L extends ct{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==ot)}},pt=class z extends ct{constructor(t,e,o,s,l){super(t,e,o,s,l),this.type=5}_$AI(t,e=this){if((t=M$1(this,t,e,0)??ot)===it)return;const o=this._$AH,s=t===ot&&o!==ot||t.capture!==o.capture||t.once!==o.once||t.passive!==o.passive,l=t!==ot&&(o===ot||s);s&&this.element.removeEventListener(this.name,this,o),l&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},mt=class Z{constructor(t,e,o){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(t){M$1(this,t)}};const ut=F.litHtmlPolyfillSupport;ut?.(nt,lt),(F.litHtmlVersions??=[]).push("3.3.3");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const gt=globalThis,i$3=t=>t,_t=gt.trustedTypes,ft=_t?_t.createPolicy("lit-html",{createHTML:t=>t}):void 0,bt="$lit$",vt=`lit$${Math.random().toFixed(9).slice(2)}$`,yt="?"+vt,xt=`<${yt}>`,wt=document,c=()=>wt.createComment(""),a=t=>null===t||"object"!=typeof t&&"function"!=typeof t,$t=Array.isArray,kt="[ \t\n\f\r]",St=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,At=/-->/g,Rt=/>/g,Mt=RegExp(`>|${kt}(?:([^\\s"'>=/]+)(${kt}*=${kt}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),Ct=/'/g,Pt=/"/g,Ft=/^(?:script|style|textarea|title)$/i,x=t=>(e,...o)=>({_$litType$:t,strings:e,values:o}),Et=x(1),zt=x(2),Tt=Symbol.for("lit-noChange"),Dt=Symbol.for("lit-nothing"),Ht=new WeakMap,It=wt.createTreeWalker(wt,129);function V(t,e){if(!$t(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==ft?ft.createHTML(e):e}const N=(t,e)=>{const o=t.length-1,s=[];let l,h=2===e?"<svg>":3===e?"<math>":"",d=St;for(let e=0;e<o;e++){const o=t[e];let p,m,u=-1,_=0;for(;_<o.length&&(d.lastIndex=_,m=d.exec(o),null!==m);)_=d.lastIndex,d===St?"!--"===m[1]?d=At:void 0!==m[1]?d=Rt:void 0!==m[2]?(Ft.test(m[2])&&(l=RegExp("</"+m[2],"g")),d=Mt):void 0!==m[3]&&(d=Mt):d===Mt?">"===m[0]?(d=l??St,u=-1):void 0===m[1]?u=-2:(u=d.lastIndex-m[2].length,p=m[1],d=void 0===m[3]?Mt:'"'===m[3]?Pt:Ct):d===Pt||d===Ct?d=Mt:d===At||d===Rt?d=St:(d=Mt,l=void 0);const f=d===Mt&&t[e+1].startsWith("/>")?" ":"";h+=d===St?o+xt:u>=0?(s.push(p),o.slice(0,u)+bt+o.slice(u)+vt+f):o+vt+(-2===u?e:f)}return[V(t,h+(t[o]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class S{constructor({strings:t,_$litType$:e},o){let s;this.parts=[];let l=0,h=0;const d=t.length-1,p=this.parts,[m,u]=N(t,e);if(this.el=S.createElement(m,o),It.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=It.nextNode())&&p.length<d;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(bt)){const e=u[h++],o=s.getAttribute(t).split(vt),d=/([.?@])?(.*)/.exec(e);p.push({type:1,index:l,name:d[2],strings:o,ctor:"."===d[1]?I:"?"===d[1]?L:"@"===d[1]?z:H}),s.removeAttribute(t)}else t.startsWith(vt)&&(p.push({type:6,index:l}),s.removeAttribute(t));if(Ft.test(s.tagName)){const t=s.textContent.split(vt),e=t.length-1;if(e>0){s.textContent=_t?_t.emptyScript:"";for(let o=0;o<e;o++)s.append(t[o],c()),It.nextNode(),p.push({type:2,index:++l});s.append(t[e],c())}}}else if(8===s.nodeType)if(s.data===yt)p.push({type:2,index:l});else{let t=-1;for(;-1!==(t=s.data.indexOf(vt,t+1));)p.push({type:7,index:l}),t+=vt.length-1}l++}}static createElement(t,e){const o=wt.createElement("template");return o.innerHTML=t,o}}function M(t,e,o=t,s){if(e===Tt)return e;let l=void 0!==s?o._$Co?.[s]:o._$Cl;const h=a(e)?void 0:e._$litDirective$;return l?.constructor!==h&&(l?._$AO?.(!1),void 0===h?l=void 0:(l=new h(t),l._$AT(t,o,s)),void 0!==s?(o._$Co??=[])[s]=l:o._$Cl=l),void 0!==l&&(e=M(t,l._$AS(t,e.values),l,s)),e}class R{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:o}=this._$AD,s=(t?.creationScope??wt).importNode(e,!0);It.currentNode=s;let l=It.nextNode(),h=0,d=0,p=o[0];for(;void 0!==p;){if(h===p.index){let e;2===p.type?e=new k(l,l.nextSibling,this,t):1===p.type?e=new p.ctor(l,p.name,p.strings,this,t):6===p.type&&(e=new Z(l,this,t)),this._$AV.push(e),p=o[++d]}h!==p?.index&&(l=It.nextNode(),h++)}return It.currentNode=wt,s}p(t){let e=0;for(const o of this._$AV)void 0!==o&&(void 0!==o.strings?(o._$AI(t,o,e),e+=o.strings.length-2):o._$AI(t[e])),e++}}class k{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,o,s){this.type=2,this._$AH=Dt,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=o,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=M(this,t,e),a(t)?t===Dt||null==t||""===t?(this._$AH!==Dt&&this._$AR(),this._$AH=Dt):t!==this._$AH&&t!==Tt&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>$t(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Dt&&a(this._$AH)?this._$AA.nextSibling.data=t:this.T(wt.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:o}=t,s="number"==typeof o?this._$AC(t):(void 0===o.el&&(o.el=S.createElement(V(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new R(s,this),o=t.u(this.options);t.p(e),this.T(o),this._$AH=t}}_$AC(t){let e=Ht.get(t.strings);return void 0===e&&Ht.set(t.strings,e=new S(t)),e}k(t){$t(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let o,s=0;for(const l of t)s===e.length?e.push(o=new k(this.O(c()),this.O(c()),this,this.options)):o=e[s],o._$AI(l),s++;s<e.length&&(this._$AR(o&&o._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=i$3(t).nextSibling;i$3(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,o,s,l){this.type=1,this._$AH=Dt,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=l,o.length>2||""!==o[0]||""!==o[1]?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=Dt}_$AI(t,e=this,o,s){const l=this.strings;let h=!1;if(void 0===l)t=M(this,t,e,0),h=!a(t)||t!==this._$AH&&t!==Tt,h&&(this._$AH=t);else{const s=t;let d,p;for(t=l[0],d=0;d<l.length-1;d++)p=M(this,s[o+d],e,d),p===Tt&&(p=this._$AH[d]),h||=!a(p)||p!==this._$AH[d],p===Dt?t=Dt:t!==Dt&&(t+=(p??"")+l[d+1]),this._$AH[d]=p}h&&!s&&this.j(t)}j(t){t===Dt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class I extends H{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Dt?void 0:t}}class L extends H{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Dt)}}class z extends H{constructor(t,e,o,s,l){super(t,e,o,s,l),this.type=5}_$AI(t,e=this){if((t=M(this,t,e,0)??Dt)===Tt)return;const o=this._$AH,s=t===Dt&&o!==Dt||t.capture!==o.capture||t.once!==o.once||t.passive!==o.passive,l=t!==Dt&&(o===Dt||s);s&&this.element.removeEventListener(this.name,this,o),l&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class Z{constructor(t,e,o){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(t){M(this,t)}}const Ot=gt.litHtmlPolyfillSupport;Ot?.(S,k),(gt.litHtmlVersions??=[]).push("3.3.3");const D=(t,e,o)=>{const s=o?.renderBefore??e;let l=s._$litPart$;if(void 0===l){const t=o?.renderBefore??null;s._$litPart$=l=new k(e.insertBefore(c(),t),t,void 0,o??{})}return l._$AI(t),l
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */},Nt=globalThis;let Bt=class i extends P{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=D(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Tt}};Bt._$litElement$=!0,Bt.finalized=!0,Nt.litElementHydrateSupport?.({LitElement:Bt});const Vt=Nt.litElementPolyfillSupport;Vt?.({LitElement:Bt}),(Nt.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1=t=>(e,o)=>{void 0!==o?o.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},jt={attribute:!0,type:String,converter:A,reflect:!1,hasChanged:f$2},r$1=(t=jt,e,o)=>{const{kind:s,metadata:l}=o;let h=globalThis.litPropertyMetadata.get(l);if(void 0===h&&globalThis.litPropertyMetadata.set(l,h=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),h.set(o.name,t),"accessor"===s){const{name:s}=o;return{set(o){const l=e.get.call(this);e.set.call(this,o),this.requestUpdate(s,l,t,!0,o)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=o;return function(o){const l=this[s];e.call(this,o),this.requestUpdate(s,l,t,!0,o)}}throw Error("Unsupported decorator location: "+s)};
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
 */const Wt=1;let Lt=class i{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,o){this._$Ct=t,this._$AM=e,this._$Ci=o}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Gt="important",qt=" !"+Gt,Ut=(t=>(...e)=>({_$litDirective$:t,values:e}))(class extends Lt{constructor(t){if(super(t),t.type!==Wt||"style"!==t.name||t.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,o)=>{const s=t[o];return null==s?e:e+`${o=o.includes("-")?o:o.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`},"")}update(t,[e]){const{style:o}=t.element;if(void 0===this.ft)return this.ft=new Set(Object.keys(e)),this.render(e);for(const t of this.ft)null==e[t]&&(this.ft.delete(t),t.includes("-")?o.removeProperty(t):o[t]=null);for(const t in e){const s=e[t];if(null!=s){this.ft.add(t);const e="string"==typeof s&&s.endsWith(qt);t.includes("-")||e?o.setProperty(t,e?s.slice(0,-11):s,e?Gt:""):o[t]=s}}return it}}),Yt="anyvac-card",Kt="anyvac-card-editor",Xt="1.11.2",Zt=600,Jt={cleaning:["🧹 Cleaning","#52c41a"],segment_cleaning:["🧹 Cleaning rooms","#52c41a"],zoned_cleaning:["🧹 Zone cleaning","#52c41a"],spot_cleaning:["🎯 Spot cleaning","#52c41a"],starting:["▶️ Starting","#52c41a"],segment_mopping:["🫧 Mopping rooms","#40a9ff"],zoned_mopping:["🫧 Zone mopping","#40a9ff"],robot_status_mopping:["🫧 Mopping","#40a9ff"],clean_mop_cleaning:["🧹🫧 Vacuuming+mopping","#52c41a"],clean_mop_mopping:["🧹🫧 Vacuuming+mopping","#52c41a"],segment_clean_mop_cleaning:["🧹🫧 Rooms (vac)","#52c41a"],segment_clean_mop_mopping:["🧹🫧 Rooms (mop)","#52c41a"],zoned_clean_mop_cleaning:["🧹🫧 Zones (vac)","#52c41a"],zoned_clean_mop_mopping:["🧹🫧 Zones (mop)","#52c41a"],washing_the_mop:["🚿 Washing mop","#9254de"],washing_the_mop_2:["🚿 Washing mop","#9254de"],going_to_wash_the_mop:["🚿 Going to wash mop","#9254de"],air_drying_stopping:["💨 Drying mop","#9254de"],back_to_dock_washing_duster:["🏠 Dock + washing","#faad14"],returning_home:["🏠 Returning home","#faad14"],docking:["🏠 Docking","#faad14"],going_to_target:["🎯 Going to target","#40a9ff"],charging:["⚡ Charging","rgba(var(--avc-ink-rgb),0.75)"],charging_complete:["✅ Fully charged","#52c41a"],docked:["✅ Docked","rgba(var(--avc-ink-rgb),0.75)"],charger_disconnected:["🔌 Charger disconnected","#faad14"],emptying_the_bin:["🗑️ Emptying bin","#faad14"],idle:["💤 Idle","rgba(var(--avc-ink-rgb),0.45)"],paused:["⏸️ Paused","#faad14"],mapping:["🗺️ Mapping","#40a9ff"],remote_control_active:["🕹️ Remote control","#40a9ff"],manual_mode:["🕹️ Manual mode","#40a9ff"],updating:["⬆️ Updating","#faad14"],in_call:["📞 In call","#faad14"],shutting_down:["⏹️ Shutting down","rgba(var(--avc-ink-rgb),0.4)"],error:["❌ Error","#ff4d4f"],charging_problem:["⚠️ Charging problem","#ff4d4f"],locked:["🔒 Locked","#ff4d4f"],device_offline:["📴 Offline","#ff4d4f"]},Qt={green:"#52c41a",blue:"#2196F3",orange:"#faad14"},te=["#52c41a","#2196F3","#faad14","#eb2f96","#722ed1","#13c2c2","#fa541c","#a0d911"],ee={green:"rgba(46,204,113,0.18)",blue:"rgba(33,150,243,0.18)",orange:"rgba(250,173,20,0.18)"},ie={green:"rgba(46,204,113,0.30)",blue:"rgba(33,150,243,0.30)",orange:"rgba(250,173,20,0.30)"};const oe="dark",ae=[{id:"sage",label:"Sage",hex:"#6FBF73"},{id:"ocean",label:"Ocean",hex:"#4FA5C7"},{id:"terracotta",label:"Terracotta",hex:"#D98A6A"},{id:"plum",label:"Plum",hex:"#A87CC0"},{id:"amber",label:"Amber",hex:"#D9A441"},{id:"graphite",label:"Graphite",hex:"#8E97A8"}],se="#6FBF73";const ne=new Set(["cleaning","segment_cleaning","zoned_cleaning","spot_cleaning","segment_mopping","zoned_mopping","robot_status_mopping","clean_mop_cleaning","clean_mop_mopping","segment_clean_mop_cleaning","segment_clean_mop_mopping","zoned_clean_mop_cleaning","zoned_clean_mop_mopping"]);function mapPxDims(t){if(!t)return null;const e=t.scale??1;let o=(t.width??0)*e,s=(t.height??0)*e;const l=t.rotation??0;if(90===l||270===l){const t=o;o=s,s=t}return o>0&&s>0?{NW:o,NH:s}:null}const re=Math.PI/180;function seatFromFrame(t,e,o,s,l,h,d){let p=Math.round(t/re)%360;return p<0&&(p+=360),{rotation:p,scale:100*e,offset_x:100*o.x-50,offset_y:o.y*s*100-50,residual_pct:100*l,anchors:h,raw_rotation:Math.round(d/re*10)/10}}function computeSeatFit(t,e,o){if(!(t.length&&e>0))return null;if(t.length>=2){const o=t.length,s={x:0,y:0},l={x:0,y:0};for(const e of t)s.x+=e.q.x,s.y+=e.q.y,l.x+=e.a.x,l.y+=e.a.y;s.x/=o,s.y/=o,l.x/=o,l.y/=o;let h=0,d=0,p=0;for(const e of t){const t=e.q.x-s.x,o=e.q.y-s.y,m=e.a.x-l.x,u=e.a.y-l.y;h+=t*m+o*u,d+=t*u-o*m,p+=t*t+o*o}if(p>1e-8){const m=Math.atan2(d,h),u=Math.round(m/(Math.PI/2))*(Math.PI/2),_=Math.cos(u),f=Math.sin(u);let b=0;for(const e of t){const t=e.q.x-s.x,o=e.q.y-s.y,h=f*t+_*o;b+=(_*t-f*o)*(e.a.x-l.x)+h*(e.a.y-l.y)}const v=b/p;if(v>1e-4){const h={x:l.x-v*(_*s.x-f*s.y),y:l.y-v*(f*s.x+_*s.y)};let d=0;for(const e of t){const t=h.x+v*(_*e.q.x-f*e.q.y)-e.a.x,o=h.y+v*(f*e.q.x+_*e.q.y)-e.a.y;d+=t*t+o*o}return seatFromFrame(u,v,h,e,Math.sqrt(d/o),o,m)}}}const s=t.find(t=>t.sizeQ&&t.sizeA)??null;if(!s||!s.sizeQ||!s.sizeA||s.sizeQ.w<1e-6||s.sizeQ.h<1e-6)return null;let l=null;for(const t of[0,1,2,3]){const e=t*(Math.PI/2),o=t%2==0?s.sizeQ.w:s.sizeQ.h,h=t%2==0?s.sizeQ.h:s.sizeQ.w,d=s.sizeA.w/o,p=s.sizeA.h/h;if(!(d>0&&p>0))continue;const m=Math.sqrt(d*p),u=Math.abs(Math.log(d/p));(!l||u<l.mism-1e-9)&&(l={theta:e,s:m,mism:u})}if(!l)return null;const h=Math.cos(l.theta),d=Math.sin(l.theta),p={x:s.a.x-l.s*(h*s.q.x-d*s.q.y),y:s.a.y-l.s*(d*s.q.x+h*s.q.y)};return seatFromFrame(l.theta,l.s,p,e,0,1,l.theta)}function resolveImageBaseSrc(t,e){const o="merged"===t.map_mode?t.image_base??(t.vacuums??[]).find(t=>t.image_base?.src)?.image_base:e?.image_base;return o?.src}function resolveStaticRooms(t,e){return(t.rooms?.length?t.rooms:e?.rooms)??[]}function resolveSeat(t,e,o,s){const l=e?.map,h={rotation:l?.rotation??0,scale:l?.scale??100,scaleY:l?.scale_y,offset_x:l?.offset_x??0,offset_y:l?.offset_y??0,auto:!1};if(!e||"manual"===l?.seat)return h;if(!resolveImageBaseSrc(t,e))return h;if(!o)return h;const d=computeSeatFit(function assembleAnchors(t,e,o){if(!e)return[];const s=mapPxDims(e.image_dims),l=Array.isArray(e.rooms)?e.rooms:[];if(!s||!l.length)return[];const{NW:h,NH:d}=s,p=[];for(const e of t){if(null==e.map_x||null==e.map_y)continue;const t=l.find(t=>t.name===e.key)??l.find(t=>t.name===e.name),s=t?.bbox_px;if(!s||[s.x0,s.y0,s.x1,s.y1].some(t=>null==t))continue;const m={q:{x:((s.x0+s.x1)/2-h/2)/h,y:((s.y0+s.y1)/2-d/2)/h},a:{x:e.map_x/100,y:e.map_y/100/o}};null!=e.map_w&&null!=e.map_h&&e.map_w>0&&e.map_h>0&&(m.sizeQ={w:(s.x1-s.x0)/h,h:(s.y1-s.y0)/h},m.sizeA={w:e.map_w/100,h:e.map_h/100/o}),p.push(m)}return p}(resolveStaticRooms(t,e),o,s),s);return d?{rotation:d.rotation,scale:d.scale,offset_x:d.offset_x,offset_y:d.offset_y,auto:!0,residual:d.residual_pct,anchorCount:d.anchors}:h}function placeRoomInCrop(t,e){const o=e.x1-e.x0,s=e.y1-e.y0;if(!(o>0&&s>0))return null;const l=(t.x0+t.x1)/2-e.x0,h=(t.y0+t.y1)/2-e.y0,d=t.x1-t.x0,p=t.y1-t.y0,clamp=(t,e,o)=>Math.min(o,Math.max(e,t));return{map_x:clamp(Math.round(l/o*1e3)/10,0,100),map_y:clamp(Math.round(h/s*1e3)/10,0,100),map_w:clamp(Math.round(d/o*1e3)/10,2,100),map_h:clamp(Math.round(p/s*1e3)/10,2,100)}}function buildCalibrationAnchors(t,e,o,s){const{NW:l,NH:h}=o;if(!(l>0&&h>0&&s>0))return[];const d=Math.min(t.length,e.length),p=[];for(let o=0;o<d;o++){const d=t[o],m=e[o];p.push({q:{x:(d.x-l/2)/l,y:(d.y-h/2)/l},a:{x:m.x/100,y:m.y/100/s}})}return p}function pctToCropPoint(t,e){const o=e.x1-e.x0,s=e.y1-e.y0;return o>0&&s>0?{x:e.x0+t.x/100*o,y:e.y0+t.y/100*s}:null}function outlineInCrop(t,e){if(!t?.length)return null;const o=e.x1-e.x0,s=e.y1-e.y0;return o>0&&s>0?t.map(t=>{const l=Array.isArray(t)?t[0]:t.x,h=Array.isArray(t)?t[1]:t.y;return{x:(l-e.x0)/o*100,y:(h-e.y0)/s*100}}):null}function canvasScaleForCrop(t,e){if(!t||!e)return null;const o=e.x1-e.x0,s=e.y1-e.y0;if(!(o>0&&s>0&&t.w>0&&t.h>0))return null;if(Math.abs(t.w-o)<=2&&Math.abs(t.h-s)<=2)return 1;const l=t.w/t.h,h=o/s;return Math.abs(l/h-1)>.003?null:(t.w/o+t.h/s)/2}function seatProjectPct(t,e,o){const s=e.scale/100,l=(e.scaleY??e.scale)/100,h=e.rotation*re,d=Math.cos(h),p=Math.sin(h),m=(50+e.offset_x)/100,u=(50+e.offset_y)/100/o,_=s*t.x,f=l*t.y;return{x:100*(m+(d*_-p*f)),y:(u+(p*_+d*f))*o*100}}function isRot90(t){return Math.round(t/90)%2!=0}function seatScaleYRatio(t,e){return null!=e&&e!==t&&t?e/t:1}function seatRotateScaleCss(t,e,o){const s="rotate("+t+"deg)",l=seatScaleYRatio(e,o);return 1===l?s:s+" scale(1,"+l+")"}function roomBboxToRect(t,e,o,s){const l=mapPxDims(e?.image_dims),h=t?.bbox_px;if(!l||!h||[h.x0,h.y0,h.x1,h.y1].some(t=>null==t))return null;const{NW:d,NH:p}=l,m={x:((h.x0+h.x1)/2-d/2)/d,y:((h.y0+h.y1)/2-p/2)/d},u=o.scale/100,_=(o.scaleY??o.scale)/100;let f=(h.x1-h.x0)/d*u,b=(h.y1-h.y0)/d*_;const v=seatProjectPct(m,o,s);if(isRot90(o.rotation)){const t=f;f=b,b=t}const clamp=(t,e,o)=>Math.min(o,Math.max(e,t));return{map_x:clamp(Math.round(10*v.x)/10,0,100),map_y:clamp(Math.round(10*v.y)/10,0,100),map_w:clamp(Math.round(1e3*f)/10,2,100),map_h:clamp(Math.round(b*s*1e3)/10,2,100)}}function homeAnchorFit(t,e,o){if(!t||t.length<2||!e)return null;const s=buildCalibrationAnchors(t.map(t=>t.home_px),t.map(t=>t.floor_pct),e,o);return computeSeatFit(s,o)}function projectHomePxThroughFit(t,e,o,s){return seatProjectPct({x:(t.x-e.NW/2)/e.NW,y:(t.y-e.NH/2)/e.NW},o,s)}function outlineThroughFit(t,e,o,s){return t?.length?t.map(t=>projectHomePxThroughFit({x:Array.isArray(t)?t[0]:t.x,y:Array.isArray(t)?t[1]:t.y},e,o,s)):null}const le=Math.PI/180;function seatCentreFrac(t,e){return{x:(50+t.offset_x)/100,y:(50+t.offset_y)/100/e}}function frameToOffset(t,e){return{offset_x:100*t.x-50,offset_y:t.y*e*100-50}}function pctToFrac(t,e){return{x:t.x/100,y:t.y/100/e}}function rotatePoint(t,e){const o=e*le,s=Math.cos(o),l=Math.sin(o);return{x:s*t.x-l*t.y,y:l*t.x+s*t.y}}function normDeg(t){let e=t%360;return e<0&&(e+=360),e}function translateSeat(t,e,o){return{...t,offset_x:t.offset_x+e,offset_y:t.offset_y+o}}function localAxisScaleRatio(t,e,o,s,l){const h=seatCentreFrac(t,l),d=pctToFrac(o,l),p=pctToFrac(s,l),m=rotatePoint({x:d.x-h.x,y:d.y-h.y},-t.rotation),u=rotatePoint({x:p.x-h.x,y:p.y-h.y},-t.rotation),_="x"===e?m.x:m.y,f="x"===e?u.x:u.y;return Math.abs(_)>1e-6?f/_:1}function pinchSeat(t,e,o,s,l,h){const d=function similarityFromTwoPoints(t,e,o,s){const l=e.x-t.x,h=e.y-t.y,d=l*l+h*h;if(d<1e-12)return null;const p=s.x-o.x,m=s.y-o.y,u=(p*l+m*h)/d,_=(m*l-p*h)/d,f=Math.hypot(u,_);if(f<1e-6)return null;const b=Math.atan2(_,u)/le,v=u*t.x-_*t.y,w=_*t.x+u*t.y;return{rotationDeg:b,scale:f,translate:{x:o.x-v,y:o.y-w}}}(pctToFrac(e,h),pctToFrac(o,h),pctToFrac(s,h),pctToFrac(l,h));if(!d)return t;const p=seatCentreFrac(t,h),m=d.scale*Math.cos(d.rotationDeg*le),u=d.scale*Math.sin(d.rotationDeg*le),_=frameToOffset({x:m*p.x-u*p.y+d.translate.x,y:u*p.x+m*p.y+d.translate.y},h),f={...t,rotation:normDeg(t.rotation+d.rotationDeg),scale:t.scale*d.scale,offset_x:_.offset_x,offset_y:_.offset_y};return null!=t.scaleY&&(f.scaleY=t.scaleY*d.scale),f}function nudgeOffset(t,e,o,s,l){const h=function fracToPct(t,e){return{x:100*t.x,y:t.y*e*100}}(rotatePoint(pctToFrac({x:e,y:o},l),-s),l);return translateSeat(t,h.x,h.y)}function nudgeRotation(t,e){return{...t,rotation:normDeg(t.rotation+e)}}function nudgeScale(t,e){const o=1+e/100,s={...t,scale:t.scale*o};return null!=t.scaleY&&(s.scaleY=t.scaleY*o),s}const ce="anyvac-align-overlay";class AnyVacAlignOverlayHost extends HTMLElement{connectedCallback(){this.shadowRoot||this.attachShadow({mode:"open"})}}customElements.get(ce)||customElements.define(ce,AnyVacAlignOverlayHost);const he=["--primary-text-color","--secondary-text-color","--primary-background-color","--card-background-color","--primary-color","--accent-color","--divider-color","--paper-font-body1_-_font-family","--mdc-icon-font"];function unmountAlignOverlay(t){t?.remove()}const de={columns:[100],rows:["minmax(0, 1fr)","auto","auto"],place:{map:{row:1,col:1},dock:{row:2,col:1,overflow:"auto"},start:{row:3,col:1}}},pe={landscape:{columns:["minmax(0, 1fr)","max-content"],rows:["auto","minmax(260px, 1fr)","auto","auto"],place:{badges:{row:1,col:"1/3"},map:{row:2,col:"1/3"},tools:{row:3,col:"1/3",align:"start"},status:{row:4,col:1,overflow:"auto"},dock:{row:4,col:2,overflow:"auto"}}},portrait:{columns:[72,28],rows:[90,10],place:{map:{row:1,col:1},dock:{row:1,col:2,overflow:"auto"},start:{row:2,col:"1/3"}}}};function track(t){return"number"==typeof t?t+"fr":t}function trackList(t){return t.map(track).join(" ")}function resolveHeightCss(t){const e=t.height??"viewport";return"viewport"===e?"calc(100svh - var(--header-height, 0px))":"container"===e?"100%":e}var me;const ue={main_brush_time_left:300,side_brush_time_left:200,filter_time_left:150,sensor_time_left:30};console.info(`%c ANYVAC-CARD %c v${Xt} `,"background:#2196F3;color:#fff;font-weight:700;padding:2px 4px;border-radius:3px 0 0 3px","background:#1a1a1a;color:#fff;font-weight:400;padding:2px 4px;border-radius:0 3px 3px 0");let ge=class AnyVacCard extends Bt{constructor(){super(...arguments),this.editMode=!1,this._shownSet=new Set([0]),this._holdId=null,this._mapMode="normal",this._inspectKey=null,this._dockSheetOpen=!1,this._dockSheetIdx=0,this._modeSheetOpen=!1,this._careResetPending=new Map,this._modeEntity=null,this._dbg="",this._zoneDrag=null,this._zoneRectShown=null,this._zonePending=null,this._zoneMulti=!1,this._zoneEdit=null,this._pinPending=null,this._layers={dry:!0,wet:!1},this._layerMenu=null,this._layerHoldTimer=null,this._layerHeld=!1,this._localRoomSel=new Map,this._activePresets=new Map,this._planMode="both",this._activeGlobalPreset=null,this._cardW=0,this._mapAR=3.636,this._alignSession=null,this._alignView={zoom:1,panX:0,panY:0,rot:0},this._alignCancelConfirm=!1,this._alignCopiedFlash=!1,this._alignHost=null,this._alignGesture=null,this._profile="landscape",this._mapRegW=0,this._mapRegH=0,this._mapAvailW=0,this._mapAvailH=0,this._lastStack=!1,this._lastPortraitFitW=0,this._lastRotate=!0,this._flipLive=null,this._ro=null,this._onWinResize=null,this._measureRaf=0,this._measureTimer=null,this._settleTimer=null,this._panelViewMo=null,this._panelViewWarned=!1,this._panelViewNode=null,this._barMo=null,this._editBarRo=null,this._now=Date.now(),this._tickTimer=null,this._holdTimer=null,this._holdStartPos=null,this._initialized=!1,this._watched=null,this._intCache=new Map,this._mapCandCache=new Map,this._autoCache=new Map,this._careCache=new Map,this._memoMapAR=0,this._roomsMemo=new Map,this._seatMemo=new Map,this._homeFrameMemo=new Map,this._holdEnd=()=>{this._cancelHold()},this._holdMove=t=>{if(!this._holdStartPos||null===this._holdTimer)return;const e=t.clientX-this._holdStartPos.x,o=t.clientY-this._holdStartPos.y;e*e+o*o>144&&this._cancelHold()},this._planPreview=null,this._planFetchKey="",this._alignViewDrag=null,this._onFloorplanLoad=t=>{const e=t.target;if(e?.naturalWidth&&e.naturalHeight){const t=e.naturalWidth/e.naturalHeight;t>.1&&Math.abs(t-this._mapAR)>.01&&(this._mapAR=t)}}}static getConfigElement(){return document.createElement(Kt)}static getStubConfig(t){const e=t?Object.keys(t.states).filter(t=>t.startsWith("vacuum.")):[],o=t?.entities,s=o?e.filter(t=>"matter"!==o[t]?.platform):e,l=s.length>0?s:e;return 0===l.length?{type:`custom:${Yt}`,vacuums:[{entity:"vacuum.my_roborock",name:"Roborock",rooms:[],clean_action:{type:"native"}}]}:{type:`custom:${Yt}`,vacuums:l.map(e=>({entity:e,name:t.states[e]?.attributes.friendly_name??e.replace(/^vacuum\./,""),rooms:[],clean_action:{type:"native"}}))}}setConfig(t){if(!t.vacuums||!Array.isArray(t.vacuums)||0===t.vacuums.length)throw new Error("[anyvac-card] 'vacuums' must be a non-empty array");if(this._rawConfig=t,this._config=t,this._watched=null,this._intCache.clear(),this._mapCandCache.clear(),this._autoCache.clear(),this._careCache.clear(),this._roomsMemo.clear(),this._seatMemo.clear(),this._initialized){const e=new Set;for(const o of this._shownSet)o<t.vacuums.length&&e.add(o);this._shownSet=e.size>0?e:new Set(t.vacuums.map((t,e)=>e))}else this._initialized=!0,this._shownSet=this._loadShown(),this._localRoomSel=this._loadRoomSel(),this._flipLive=this._loadFlipLive()}getCardSize(){return 6}connectedCallback(){super.connectedCallback(),this.style.setProperty("--hold-ms",Zt+"ms"),this._ro||"undefined"==typeof ResizeObserver||(this._ro=new ResizeObserver(()=>this._scheduleMeasure()),this._ro.observe(this)),this._onWinResize||(this._onWinResize=()=>this._scheduleMeasure(),window.addEventListener("resize",this._onWinResize,{passive:!0}),window.addEventListener("orientationchange",this._onWinResize,{passive:!0})),this._setupPanelViewObserver(),this._scheduleMeasure(),this._tickTimer||(this._tickTimer=window.setInterval(()=>{this._config?.debug_room_progress&&(this._config.vacuums??[]).some(t=>this._isCleaning(t)||this._isPaused(t))&&(this._now=Date.now())},1e3))}_scheduleMeasure(){if(this._measureRaf||null!==this._measureTimer)return;const run=()=>{this._measureRaf=0,this._measureTimer=null,this._doMeasure()};"undefined"!=typeof document&&document.hidden?this._measureTimer=window.setTimeout(run,0):this._measureRaf=requestAnimationFrame(run)}_doMeasure(){const t=this.getBoundingClientRect(),e=Math.round(t.width);e&&Math.abs(e-this._cardW)>=2&&(this._cardW=e);const o=this._config?.layout;if(o){const s=function pickProfile(t,e,o){const s=t?.orientation;return"portrait"===s||"landscape"===s?s:e&&o&&e/o<(t?.threshold??1)?"portrait":"landscape"}(o,this._cardW||e||window.innerWidth,this._availableHeight(o,t));s!==this._profile&&(this._profile=s),this._refineGridHeight()}}_availableHeight(t,e){if("container"===(t.height??"viewport"))return e.height>1?Math.round(e.height):window.innerHeight;const o=e.top;return o>=0&&o<window.innerHeight?Math.max(1,Math.round(window.innerHeight-o-this._editBarHeight())):window.innerHeight}_editBarHeight(){try{const t=this._findCardOptionsAncestor();if(!t?.shadowRoot)return 0;const e=t.shadowRoot.querySelector(".card-actions");if(!e)return 0;const o=e.getBoundingClientRect();if(!(o.height>0))return 0;const s=getComputedStyle(e);return Math.ceil(o.height+(parseFloat(s.marginTop)||0)+(parseFloat(s.marginBottom)||0))}catch{return 0}}_findPanelViewAncestor(){let t=this.parentElement??this.getRootNode().host??null,e=0;for(;t&&e++<20;){if(t instanceof Element&&("HUI-PANEL-VIEW"===t.tagName||"HUI-VIEW"===t.tagName))return t;const e=t;t=e.parentElement??e.getRootNode()?.host??null}return null}_findCardOptionsAncestor(){let t=this.parentElement??this.getRootNode().host??null,e=0;for(;t&&e++<12;){if(t instanceof Element&&"HUI-CARD-OPTIONS"===t.tagName)return t;const e=t;t=e.parentElement??e.getRootNode()?.host??null}return null}_setupPanelViewObserver(){if("undefined"==typeof MutationObserver)return;if(this._panelViewMo&&this._panelViewNode?.isConnected)return;this._panelViewMo&&(this._panelViewMo.disconnect(),this._panelViewMo=null,this._panelViewNode=null);const t=this._findPanelViewAncestor();if(!t){if(!this._panelViewWarned){this._panelViewWarned=!0;try{console.warn("[anyvac-card] hui-panel-view/hui-view ancestor not found (HA internal DOM may have changed) — edit-mode layout refresh via MutationObserver is disabled; resize-based refresh still works.")}catch{}}return}const e=new MutationObserver(()=>{this._scheduleMeasure(),this._watchEditBar();const t=this._findCardOptionsAncestor();if(t?.shadowRoot)try{e.observe(t.shadowRoot,{childList:!0,subtree:!0})}catch{}});try{e.observe(t,{childList:!0,subtree:!0})}catch{}if(t.shadowRoot)try{e.observe(t.shadowRoot,{childList:!0,subtree:!0})}catch{}const o=this._findCardOptionsAncestor();if(o?.shadowRoot)try{e.observe(o.shadowRoot,{childList:!0,subtree:!0})}catch{}this._panelViewMo=e,this._panelViewNode=t,this._watchEditBar()}_watchEditBar(){this._barMo&&(this._barMo.disconnect(),this._barMo=null);const t=this._findCardOptionsAncestor();if(!t?.shadowRoot)return;const e=t.shadowRoot.querySelector(".card-actions");if(e)return void this._observeEditBar(e);const o=t.shadowRoot,s=new MutationObserver(()=>{const t=o.querySelector(".card-actions");t&&(s.disconnect(),this._barMo=null,this._observeEditBar(t))});try{s.observe(o,{childList:!0,subtree:!0})}catch{return}this._barMo=s}_observeEditBar(t){if(this._scheduleMeasure(),"undefined"==typeof ResizeObserver)return;this._editBarRo&&(this._editBarRo.disconnect(),this._editBarRo=null);const e=new ResizeObserver(()=>this._scheduleMeasure());try{e.observe(t)}catch{return}this._editBarRo=e}_refineGridHeight(){const t=this._config?.layout;if(!t)return;const e=this.renderRoot?.querySelector(".avc-grid");if(!e)return;if("viewport"===(t.height??"viewport")){const t=e.getBoundingClientRect().top;if(t>=0&&t<window.innerHeight){const o=Math.round(window.innerHeight-t-this._editBarHeight());o>120&&(e.style.height=o+"px")}}const o=this.renderRoot?.querySelector(".avc-region--map");if(o){const t=Math.round(o.clientWidth),e=Math.round(o.clientHeight);t&&Math.abs(t-this._mapRegW)>=2&&(this._mapRegW=t),e&&Math.abs(e-this._mapRegH)>=2&&(this._mapRegH=e)}if("portrait"===this._profile){const t=this.renderRoot?.querySelector(".avc-region--start"),o=parseFloat(getComputedStyle(e).rowGap||getComputedStyle(e).gap||"0")||0,s=t?Math.round(t.getBoundingClientRect().height):0,l=Math.round(e.clientWidth),h=Math.round(e.clientHeight-s-(s?o:0));l&&Math.abs(l-this._mapAvailW)>=2&&(this._mapAvailW=l),h>0&&Math.abs(h-this._mapAvailH)>=2&&(this._mapAvailH=h)}}disconnectedCallback(){super.disconnectedCallback(),this._cancelHold(),this._measureRaf&&(cancelAnimationFrame(this._measureRaf),this._measureRaf=0),null!==this._measureTimer&&(clearTimeout(this._measureTimer),this._measureTimer=null),null!==this._settleTimer&&(clearTimeout(this._settleTimer),this._settleTimer=null),this._tickTimer&&(clearInterval(this._tickTimer),this._tickTimer=null),this._onWinResize&&(window.removeEventListener("resize",this._onWinResize),window.removeEventListener("orientationchange",this._onWinResize),this._onWinResize=null),this._ro&&(this._ro.disconnect(),this._ro=null),this._panelViewMo&&(this._panelViewMo.disconnect(),this._panelViewMo=null),this._panelViewNode=null,this._barMo&&(this._barMo.disconnect(),this._barMo=null),this._editBarRo&&(this._editBarRo.disconnect(),this._editBarRo=null),unmountAlignOverlay(this._alignHost),this._alignHost=null}firstUpdated(){const t=Math.round(this.getBoundingClientRect().width);t&&(this._cardW=t),this._scheduleMeasure()}updated(){if(this._alignSession&&!this._alignHost){const t=this.constructor.elementStyles,e=[];for(const o of t){const t=o instanceof CSSStyleSheet?o:o.styleSheet;t&&e.push(t)}this._alignHost=function mountAlignOverlay(t,e){const o=document.createElement(ce);o.style.cssText="position:fixed;inset:0;z-index:2147483647;",document.body.appendChild(o);const s=o.shadowRoot;if(s){t.length&&"adoptedStyleSheets"in s&&(s.adoptedStyleSheets=t);const l=getComputedStyle(e);for(const t of he){const e=l.getPropertyValue(t);e&&o.style.setProperty(t,e)}}return o}(e,this)}else!this._alignSession&&this._alignHost&&(unmountAlignOverlay(this._alignHost),this._alignHost=null);if(this._alignHost?.shadowRoot&&D(this._renderAlignOverlay(),this._alignHost.shadowRoot),this._careResetPending.size){let t=null;for(const[e,o]of this._careResetPending){const s=this.hass?.states[e],l=s?Date.parse(s.last_changed):NaN;Number.isFinite(l)&&l>o&&(t||(t=new Map(this._careResetPending)),t.delete(e))}t&&(this._careResetPending=t)}this._refineGridHeight(),this._refineGridColumns(),this._setupPanelViewObserver(),null!==this._settleTimer&&clearTimeout(this._settleTimer),this._settleTimer=window.setTimeout(()=>{this._settleTimer=null,this._scheduleMeasure()},250)}_refineGridColumns(){if("portrait"!==this._profile||!this._lastPortraitFitW)return;if(this._config.layout?.portrait?.columns?.length)return;if(this._stackTopology)return;const t=this.renderRoot?.querySelector(".avc-grid");if(!t)return;const e=t.clientWidth-(parseFloat(getComputedStyle(t).columnGap||"0")||0);let o=Math.round(this._lastPortraitFitW);e>0&&(o=Math.min(o,e));const s=Math.round(o)+"px 1fr";t.style.gridTemplateColumns!==s&&(t.style.gridTemplateColumns=s)}shouldUpdate(t){if(this._syncEffectiveConfig(),!t.has("hass")||t.size>1)return!0;const e=t.get("hass");if(!e||!this._config)return!0;for(const t of this._watchedEntities())if(e.states[t]!==this.hass.states[t])return!0;return!1}_syncEffectiveConfig(){if(!this._rawConfig||!this.hass)return;let t;for(const e of this._rawConfig.vacuums){const o=this._intAttrs(e),s=o?.floorplan_seats;if(s){t=s;break}}const e=function applyFloorplanSeats(t,e){if(!e||!t?.vacuums?.length)return t;let o=!1;const s=t.vacuums.map(s=>{const l=resolveImageBaseSrc(t,s),h=l?e[l]?.vacuums?.[s.entity]:null;return h?(o=!0,{...s,map:{...h,seat:"manual"}}):s});let l=t.image_base;if("merged"===t.map_mode&&t.image_base?.src){const s=e[t.image_base.src]?.image_base;s&&(l={...t.image_base,...s},o=!0)}return o?{...t,vacuums:s,image_base:l}:t}(this._rawConfig,t);e!==this._config&&JSON.stringify(e)!==JSON.stringify(this._config)&&(this._config=e,this._roomsMemo.clear(),this._seatMemo.clear())}_watchedEntities(){if(this._registry(),this._watched)return this._watched;const t=new Set;for(const e of this._config?.vacuums??[]){for(const o of[e.entity,e.status_entity,e.battery_entity,e.last_clean_entity,e.progress_entity,e.current_room_entity,e.error_entity,this._mapEntityFor(e),this._intEntity(e),...Object.values(this._autoEntities(e))])o&&t.add(o);for(const o of this._roomsFor(e))o.last_clean_entity&&t.add(o.last_clean_entity),o.clean_time_entity&&t.add(o.clean_time_entity);for(const o of this._careItems(e))o.entity&&t.add(o.entity),o.reset&&t.add(o.reset),o.binary&&t.add(o.binary)}for(const e of this._config?.global_actions??[])for(const o of e.watch_entities??[])o&&t.add(o);return this.hass?.entities&&(this._watched=t),t}_resolveColor(t,e){const o=t??e;return Qt[o]??o}_resolveBg(t,e,o){return(o?ie:ee)[t??e]??function hexToRgba(t,e){const o=/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(t);if(!o)return`rgba(255,255,255,${e})`;let s=o[1];return 3===s.length&&(s=s.split("").map(t=>t+t).join("")),`rgba(${parseInt(s.slice(0,2),16)},${parseInt(s.slice(2,4),16)},${parseInt(s.slice(4,6),16)},${e})`}(this._resolveColor(t,e),o?.3:.18)}_vacIndex(t){const e=this._config?.vacuums?.findIndex(e=>e.entity===t.entity)??-1;return e<0?0:e}_defaultColor(t){return te[this._vacIndex(t)%te.length]}_color(t){return this._resolveColor(t.color,this._defaultColor(t))}_colorBg(t){return this._resolveBg(t.color,this._defaultColor(t),!1)}_colorBgActive(t){return this._resolveBg(t.color,this._defaultColor(t),!0)}_registry(){const t=this.hass?.entities;return t!==this._regRef&&(this._regRef=t,this._intCache.clear(),this._mapCandCache.clear(),this._autoCache.clear(),this._careCache.clear(),this._watched=null),t}_intEntity(t){if(t.integration_entity)return t.integration_entity;const e=this._registry();if(!e||!t.entity)return;if(this._intCache.has(t.entity))return this._intCache.get(t.entity);const o=e[t.entity]?.device_id,s=o?Object.keys(e).find(t=>e[t]?.device_id===o&&"anyvac"===e[t]?.platform&&t.startsWith("sensor.")):void 0;return this._intCache.set(t.entity,s),s}_mapEntityFor(t){if(t.map?.entity)return t.map.entity;const e=this._registry();if(!e||!t.entity)return;let o=this._mapCandCache.get(t.entity);if(!o){const s=e[t.entity]?.device_id;if(!s)return;o=Object.keys(e).filter(t=>e[t]?.device_id===s&&t.startsWith("image.")),this._mapCandCache.set(t.entity,o)}if(1===o.length)return o[0];const s=o.filter(t=>{const e=this.hass.states[t];return!!e&&"unavailable"!==e.state&&"unknown"!==e.state&&!!e.attributes.entity_picture});return 1===s.length?s[0]:void 0}_intAttrs(t){const e=this._intEntity(t),o=e?this.hass.states[e]?.attributes:void 0;if(o)return(o.schema_version??0)>=2?o:void 0}_schemaWarning(){for(const t of this._config?.vacuums??[]){const e=this._intEntity(t),o=e?this.hass.states[e]?.attributes:void 0;if(o&&(o.schema_version??0)<2)return`AnyVac integration is too old for this card (schema ${o.schema_version??1} < 2). Update the anyvac integration to ≥ 0.18.0.`}return null}_autoEntities(t){const e=this._registry();if(!e||!t.entity)return{};const o=this._autoCache.get(t.entity);if(o)return o;const s=e[t.entity]?.device_id;if(!s)return{};const l=Object.keys(e).filter(t=>e[t]?.device_id===s),byTk=t=>l.find(o=>e[o]?.translation_key===t),h={status:byTk("status"),battery:(t=>l.find(e=>this.hass.states[e]?.attributes?.device_class===t))("battery"),last_clean:byTk("last_clean_end"),progress:byTk("clean_percent"),current_room:byTk("current_room"),error:byTk("vacuum_error")};return this._autoCache.set(t.entity,h),h}_ent(t,e){return t[e+"_entity"]??this._autoEntities(t)[e]}_statusInfo(t){const e=this.hass.states[this._ent(t,"status")??t.entity]?.state??"unknown";return Jt[e]??[e,"rgba(var(--avc-ink-rgb),0.5)"]}_careItems(t){const e=this._registry(),o=this.hass?.devices;if(!e||!o||!t.entity)return[];const s=this._dockCaps(t),l=t.entity+"|"+this._dockCapsKey(t);if(this._careCache.has(l))return this._careCache.get(l);const h=e[t.entity]?.device_id,d=h?o[h]:void 0,p=d?.identifiers?.find(([t])=>"roborock"===t)?.[1],m=p?Object.values(o).find(t=>t.identifiers?.some(([t,e])=>"roborock"===t&&e===`${p}_dock`)):void 0,u=m?.id,byTk=(t,o,s)=>t?Object.keys(e).find(l=>e[l]?.device_id===t&&e[l]?.translation_key===o&&l.startsWith(s+".")):void 0,_=[],consumable=(t,e,o,s)=>{const l=byTk(s,e,"sensor"),h=byTk(s,o,"button");(l||h)&&_.push({key:e,label:t,entity:l,reset:h,totalHours:ue[e]})};if(consumable("Main brush","main_brush_time_left","reset_main_brush_consumable",h),consumable("Side brush","side_brush_time_left","reset_side_brush_consumable",h),consumable("Filter","filter_time_left","reset_air_filter_consumable",h),consumable("Sensors","sensor_time_left","reset_sensor_consumable",h),s.wash){consumable("Dock brush","cleaning_brush_time_left","reset_dock_cleaning_brush_consumable",u),consumable("Strainer","strainer_time_left","reset_dock_strainer_consumable",u);const binary=(t,e)=>{const o=byTk(u,e,"binary_sensor");o&&_.push({key:e,label:t,binary:o})};binary("Dirty water tank","dirty_box_full"),binary("Clean water tank","clean_box_empty"),binary("Cleaning fluid","clean_fluid_empty")}return this._careCache.set(l,_),_}_careValue(t){if(!t.entity)return"—";const e=this.hass.states[t.entity];if(!e||"unavailable"===e.state||"unknown"===e.state)return"—";const o=Number(e.state);if(Number.isNaN(o))return e.state;const s=e.attributes?.unit_of_measurement,l="s"===s?o/3600:"min"===s?o/60:o;if(t.totalHours){return`${Math.max(0,Math.min(100,Math.round(l/t.totalHours*100)))} %`}return`${Math.round(l)} h`}_isCleaning(t){return ne.has(this.hass.states[t.entity]?.state??"")}_hasError(t){const e=this._ent(t,"error"),o=e?this.hass.states[e]?.state:null;return!!o&&"none"!==o&&"unknown"!==o&&"unavailable"!==o}_isPaused(t){return"paused"===this.hass.states[t.entity]?.state}_battery(t){const e=this._ent(t,"battery");if(!e)return null;const o=parseInt(this.hass.states[e]?.state??"");return isNaN(o)?null:o}_lastCleanStr(t){const e=this._ent(t,"last_clean"),o=e?this.hass.states[e]?.state:void 0;if(!o||"unavailable"===o||"unknown"===o)return"—";const s=new Date(o),l=Math.floor((Date.now()-s.getTime())/864e5),h=s.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});return 0===l?"Today · "+h:1===l?"Yesterday · "+h:s.toLocaleDateString([],{day:"2-digit",month:"2-digit"})+" · "+h}_progress(t){const e=this._ent(t,"progress");if(!e)return null;const o=parseInt(this.hass.states[e]?.state??"");return isNaN(o)||0===o?null:o}_selSensor(){for(const t of this._config.vacuums){const e=this._intEntity(t);if(e&&Array.isArray(this.hass.states[e]?.attributes?.selected_rooms))return e}}_backendSel(){const t=this._selSensor();return t?new Set(this.hass.states[t]?.attributes?.selected_rooms??[]):null}_setBackendSel(t,e){this._call("anyvac","select_rooms",{rooms:t,mode:e})}_isRoomSelected(t,e){const o=this._backendSel();return o?o.has(t.key):this._localRoomSel.get(e.entity+":"+t.key)??!1}_layersEff(){const t=this._selSensor(),e=t?this.hass.states[t]?.attributes?.view_layers:void 0;return e&&"boolean"==typeof e.dry&&"boolean"==typeof e.wet?{dry:e.dry,wet:e.wet}:this._layers}_staticRoomsFor(t){return resolveStaticRooms(this._config,t)}_memoSync(){this.hass===this._memoHass&&this._mapAR===this._memoMapAR||(this._memoHass=this.hass,this._memoMapAR=this._mapAR,this._roomsMemo.clear(),this._seatMemo.clear(),this._homeFrameMemo.clear())}_roomsFor(t){this._memoSync();const e=this._roomsMemo.get(t.entity);if(e)return e;const o=this._computeRoomsFor(t);return this._roomsMemo.set(t.entity,o),o}_computeRoomsFor(t){const e=this._intAttrs(t),o=Array.isArray(e?.rooms)?e.rooms:[];if(!e||!o.length)return this._staticRoomsFor(t);const s=this._homeFrameCropFor(t),l=this._wrapAspect(this._baseHeightFor(t)),h=s?null:this._homeAnchorFitFor(t,l),d=s||h?null:this._effectiveSeat(t),p=this._staticRoomsFor(t),m=new Map(p.filter(t=>t.key).map(t=>[t.key,t])),u=new Set,_=[];for(const t of o){const o=t?.name;if(!o)continue;u.add(o);const p=m.get(o);if(p&&null!=p.map_x&&null!=p.map_y){_.push(p);continue}const f=s?t?.bbox_home_px?placeRoomInCrop(t.bbox_home_px,s):null:h?t?.bbox_home_px?roomBboxToRect({bbox_px:t.bbox_home_px},{image_dims:{width:h.dims.NW,height:h.dims.NH,scale:1,rotation:0}},h.fit,l):null:roomBboxToRect(t,e,d,l);if(!f){p&&_.push(p);continue}const b=s?outlineInCrop(t?.outline_home_px,s):h?outlineThroughFit(t?.outline_home_px,h.dims,h.fit,l):null;_.push({...p??{key:o,name:o,icon:"mdi:floor-plan"},...f,outline_pct:b??void 0})}for(const t of p)t.key&&!u.has(t.key)&&_.push(t);return _}_hasSelectedRooms(t){return this._roomsFor(t).some(e=>this._isRoomSelected(e,t))}_liveCleanType(t){if((t.presets?.length??0)>=2){const e=this._activePreset(t);return null!=e.mop_intensity&&""!==e.mop_intensity&&"off"!==e.mop_intensity||null!=e.mop_mode&&""!==e.mop_mode?"wet":"dry"}const e=this._intAttrs(t)?.clean_type;if("wet"===e||"dry"===e)return e;const o=this._vacCleanType(t);return o.wet&&!o.dry?"wet":"dry"}_backendEstimate(t,e,o){const s=this._intAttrs(t)?.rooms_estimate;if(!s)return null;const l=s[e.name??""]??s[e.key],h=l?l[o]:void 0;return"number"==typeof h&&h>0?h:null}_roomCleanMins(t,e){const o=this._vacCleanType(e),s=!(!o.wet||o.dry)||!(o.dry&&!o.wet)&&"wet"===this._liveCleanType(e),l=this._backendEstimate(e,t,s?"wet":"dry");if(null!=l)return l;const h=s?t.clean_time_wet:t.clean_time_dry;if(null!=h&&h>0)return h;const d=s?t.clean_time_dry:t.clean_time_wet;if(null!=d&&d>0)return d;if(t.clean_time_entity){const e=parseFloat(this.hass.states[t.clean_time_entity]?.state??"");if(!isNaN(e)&&e>0)return e}return t.clean_time_mins??0}_totalCleanMins(t){return this._roomsFor(t).reduce((e,o)=>this._isRoomSelected(o,t)?e+this._roomCleanMins(o,t):e,0)}_intRoomRec(t,e){const o=this._intAttrs(t)?.rooms_last_cleaned;return o?o[e.key]??o[e.name??""]??null:null}_roomCoverageRec(t,e){const o=this._intAttrs(t)?.rooms_coverage;return o?o[e.key]??o[e.name??""]??null:null}_ageDaysFromIso(t){if(!t)return null;const e=new Date(t).getTime();return isNaN(e)?null:(Date.now()-e)/864e5}_roomAgeDays(t,e){if(e){const o=this._intRoomRec(e,t);if(o){const t=this._ageDaysFromIso(o.dry),e=this._ageDaysFromIso(o.wet),s=this._ageDaysFromIso(o.any),l=this._layersEff(),h=l.dry,d=l.wet;let p;if(p=h&&d?Math.max(t??9999,e??9999):h?t:d?e:s,null!==p)return p}}if(!t.last_clean_entity)return null;const o=this.hass.states[t.last_clean_entity]?.state;return o&&"unavailable"!==o&&"unknown"!==o?(Date.now()-new Date(o).getTime())/864e5:null}_colorForAgeDays(t){if(null===t)return"rgba(255,77,77,0.85)";const e=[...this._config.room_thresholds??[{days:2,color:"rgba(46,204,113,0.85)"},{days:5,color:"rgba(250,173,20,0.85)"},{days:10,color:"rgba(255,152,0,0.85)"}]].sort((t,e)=>t.days-e.days);for(const o of e)if(t<=o.days)return o.color;return"rgba(255,77,77,0.85)"}_vacCleanType(t){if("dry"===t.clean_type)return{dry:!0,wet:!1};if("wet"===t.clean_type)return{dry:!1,wet:!0};if("both"===t.clean_type)return{dry:!0,wet:!0};const e=this._intAttrs(t)?.mop_signal;if(e){return{dry:!0,wet:null!=e.water_box_mode||!!e.water_mode_name}}const o=t.clean_action,s=!(!o||!(o.mop_mode||o.mop_mode_entity||o.mop_intensity||o.mop_intensity_entity));return{dry:!s||null!=o?.suction_level&&"off"!==o.suction_level,wet:s}}_roomProgress(t,e){const o=this._intAttrs(t)?.rooms_progress;return o?o[e.key]??o[e.name??""]??null:null}_roomProgForType(t,e,o){let s=null,l=null,h=!1;for(const d of e){const e=this._roomProgress(d,t);if(!e)continue;const p="dry"===o?e.dry_pct:e.wet_pct;if(null==p)continue;const m=!!("dry"===o?e.dry_calibrating:e.wet_calibrating);(null===s||h&&!m||h===m&&p>s)&&(s=p,l=d,h=m)}return null!==s&&l?{pct:s,kind:"S",title:`${o} coverage ${s}%`,color:this._color(l),calibrating:h}:null}_progColor(t){return t>=90?"rgb(var(--avc-ok-rgb))":t>=50?"rgb(var(--avc-warn-rgb))":"rgb(var(--avc-info-rgb))"}_renderRoomGauge(t,e){if(!this._config.debug_room_progress)return Dt;const o=this._roomProgForType(e,t,"dry"),s=this._roomProgForType(e,t,"wet");if(!o&&!s)return Dt;const g=(t,e,o,s)=>Et`
      <span class="room-gauge" title=${e}
        style=${Ut({background:`conic-gradient(${o} ${3.6*t}deg, rgba(255,255,255,0.12) 0)`})}>
        <span>${t}${s?"~":""}</span>
      </span>`;return Et`<div class="room-gauges">
      ${o?g(o.pct,"dry · "+o.title,o.color,o.calibrating):Dt}
      ${s?g(s.pct,"wet · "+s.title,"#40a9ff",s.calibrating):Dt}
    </div>`}_renderProgChip(t){return t?Et`<span class="rl-prog" title=${t.title}
      style=${Ut({color:t.color??this._progColor(t.pct)})}>${t.pct}${t.calibrating?"~":""}%<small>${t.kind}</small></span>`:Dt}_batIcon(t){return t>80?"mdi:battery":t>50?"mdi:battery-60":t>20?"mdi:battery-30":"mdi:battery-10"}_batColor(t){return t>50?"rgb(var(--avc-ok-rgb))":t>20?"rgb(var(--avc-warn-rgb))":"rgb(var(--avc-err-rgb))"}_mapUrl(t){const e=this.hass.states[t];if(!e)return"";const o=e.attributes.entity_picture;if(!o)return"";const s=new Date(e.last_updated).getTime(),l=o.includes("?")?"&":"?";return this.hass.hassUrl(o+l+"_t="+s)}_timeStr(t){const e=Math.round(t);if(e<=0)return"";if(e>=60){const t=Math.floor(e/60),o=e%60;return o>0?"~"+t+" h "+o+" min":"~"+t+" h"}return"~"+e+" min"}_isGlobalActive(t){return(t.watch_entities??[]).some(t=>ne.has(this.hass.states[t]?.state??""))}async _triggerGlobal(t){const e=t.action;try{if("script"===e.type)await this.hass.callService("script","turn_on",{entity_id:e.entity_id,variables:e.variables??{}});else{const[t,o]=e.service.split(".");await this.hass.callService(t,o,e.data??{})}}catch(t){console.error("[anyvac-card] global action failed:",t)}}_cancelHold(){null!==this._holdTimer&&(clearTimeout(this._holdTimer),this._holdTimer=null),this._holdId=null,this._holdStartPos=null}_holdStart(t,e){return o=>{o.preventDefault(),this._cancelHold(),this._holdId=t,this._holdStartPos={x:o.clientX,y:o.clientY},this._holdTimer=setTimeout(()=>{this._holdTimer=null,this._holdId=null,this._holdStartPos=null,e()},Zt)}}_toggleShown(t){if(this._config.layout&&"portrait"===this._profile)return this._shownSet=new Set([t]),void this._saveShown();this._toggleShownMulti(t)}_toggleShownMulti(t){const e=new Set(this._shownSet);e.has(t)?e.size>1&&e.delete(t):e.add(t),this._shownSet=e,this._saveShown()}async _call(t,e,o){try{await this.hass.callService(t,e,o)}catch(o){console.error("[anyvac-card] "+t+"."+e+" failed:",o)}}_fireMoreInfo(t){this.dispatchEvent(new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:t}}))}_storeKey(t){const e=(this._config?.vacuums??[]).map(t=>t.entity).join(",");return`anyvac-card:${t}:${e}`}_readStored(t,e){try{return localStorage.getItem(this._storeKey(t))??localStorage.getItem(e)}catch{return null}}_saveShown(){try{const t=[...this._shownSet].map(t=>this._config.vacuums[t]?.entity).filter(Boolean);localStorage.setItem(this._storeKey("shown"),JSON.stringify(t))}catch{}}_loadShown(){try{const t=this._readStored("shown","roborock-card:shown");if(t){const e=JSON.parse(t).map(t=>this._config.vacuums.findIndex(e=>e.entity===t)).filter(t=>t>=0);if(e.length>0)return new Set(e)}}catch{}return new Set(this._config.vacuums.map((t,e)=>e))}_saveFlipLive(){try{null===this._flipLive?localStorage.removeItem(this._storeKey("flip")):localStorage.setItem(this._storeKey("flip"),JSON.stringify(this._flipLive))}catch{}}_loadFlipLive(){const t=this._readStored("flip","roborock-card:flip");if(null===t)return null;try{return!0===JSON.parse(t)}catch{return null}}_saveRoomSel(t){try{const e=t+":",o={};for(const[t,s]of this._localRoomSel.entries())t.startsWith(e)&&(o[t.slice(e.length)]=s);localStorage.setItem(this._storeKey("sel:"+t),JSON.stringify(o))}catch{}}_loadRoomSel(){const t=new Map;try{for(const e of this._config.vacuums){const o=this._readStored("sel:"+e.entity,"roborock-card:sel:"+e.entity);if(o){const s=JSON.parse(o);for(const[o,l]of Object.entries(s))l&&t.set(e.entity+":"+o,!0)}}}catch{}return t}_pause(t){this._call("vacuum","pause",{entity_id:t.entity})}_resume(t){this._call("vacuum","start",{entity_id:t.entity})}_dock(t){this._call("vacuum","return_to_base",{entity_id:t.entity})}_toggleRoom(t,e){if(this._backendSel())return void this._setBackendSel([t.key],"toggle");const o=e.entity+":"+t.key,s=new Map(this._localRoomSel);s.set(o,!s.get(o)),this._localRoomSel=s,this._saveRoomSel(e.entity)}_isRoomSelectedAny(t,e){const o=this._backendSel();return o?o.has(t):e.some(e=>this._localRoomSel.get(e.entity+":"+t)??!1)}_toggleRoomAcross(t,e){if(this._isRoomSelectedAny(t,e)&&e.some(t=>this._intAttrs(t))&&this._call("anyvac","pin_room",{room:t}),this._backendSel())return void this._setBackendSel([t],"toggle");const o=!this._isRoomSelectedAny(t,e),s=new Map(this._localRoomSel);for(const l of e)this._roomsFor(l).some(e=>e.key===t)&&s.set(l.entity+":"+t,o);this._localRoomSel=s;for(const t of e)this._saveRoomSel(t.entity)}_allRoomKeys(){const t=new Set;for(const e of this._config.vacuums)for(const o of this._roomsFor(e))t.add(o.key);return[...t]}_v2Vacuums(){const t=[],e=[];for(const o of this._config.vacuums){const s=this._vacCleanType(o);s.dry&&t.push(o.entity),s.wet&&e.push(o.entity)}return{dry:t,wet:e}}_unassignedRooms(t,e,o){if(!o||0===t.length)return[];const s=this._planPreview;if(!s||s.key!==this._planKey(t,e))return[];const l="wet"!==e,h="dry"!==e,d=[];for(const e of t)(l&&!s.dry.has(e)||h&&!s.wet.has(e))&&d.push(e);return d}_v2Settings(){const t={};for(const e of["dry","wet"])for(const o of this._config.vacuums){const s=this._vacCleanType(o);if(!("dry"===e?s.dry:s.wet))continue;const l=this._activePreset(o),h={};l.suction_level&&(h.fan_speed=l.suction_level),"wet"===e&&l.mop_mode&&(h.mop_mode=l.mop_mode),"wet"===e&&l.mop_intensity&&(h.mop_intensity=l.mop_intensity),l.repeat&&l.repeat>1&&(h.repeat=l.repeat),Object.keys(h).length&&((t[e]??(t[e]={}))[o.entity]=h)}return Object.keys(t).length?t:void 0}_planKey(t,e){return JSON.stringify([t,e,this._v2Vacuums(),this._pinsAttr()])}_fetchPlan(t,e){const o=this._planKey(t,e);o!==this._planFetchKey&&(this._planFetchKey=o,(async()=>{try{const s=await this.hass.callService("anyvac","plan",{rooms:t,mode:e,vacuums:this._v2Vacuums()},void 0,!1,!0);if(this._planFetchKey!==o)return;const l=s?.response?.plan??{},inv=t=>{const e=new Map;for(const[o,s]of Object.entries(t??{}))for(const t of s)e.set(t,o);return e};this._planPreview={key:o,dry:inv(l.dry),wet:inv(l.wet),eta:"number"==typeof l.eta_min?l.eta_min:null,unsequenced:Array.isArray(l.unsequenced)?l.unsequenced:[]}}catch(t){console.warn("[anyvac-card] anyvac.plan preview failed:",t),this._planFetchKey===o&&(this._planPreview={key:o,dry:new Map,wet:new Map,eta:null,unsequenced:[]})}})())}_etaFor(t,e,o){o&&t.length&&this._fetchPlan(t,e);const s=this._planPreview?.eta;return o&&null!=s?s:this._selEstMins(t)}async _runOrchestrated(t,e){t.length&&await this._call("anyvac","clean",{rooms:t,mode:e,vacuums:this._v2Vacuums(),...this._v2Settings()?{settings:this._v2Settings()}:{}})}_selectGlobalPreset(t){if(this._activeGlobalPreset=t.id,t.mode&&(this._planMode=t.mode),"all"===t.scope||Array.isArray(t.scope)){const e="all"===t.scope?this._allRoomKeys():t.scope;if(this._backendSel())return void this._setBackendSel(e,"set");const o=new Map(this._localRoomSel);for(const t of this._config.vacuums)for(const e of this._roomsFor(t))o.delete(t.entity+":"+e.key);for(const t of e)for(const e of this._config.vacuums)this._roomsFor(e).some(e=>e.key===t)&&o.set(e.entity+":"+t,!0);this._localRoomSel=o;for(const t of this._config.vacuums)this._saveRoomSel(t.entity)}}_vacAbbrev(t){return((t.name??t.entity.split(".")[1]??"").replace(/[^A-Za-z0-9]/g,"").slice(0,2)||"??").toUpperCase()}_renderPlanPreview(){if("auto"!==this._config.ui_mode)return Dt;const t=this._allRoomKeys().filter(t=>this._isRoomSelectedAny(t,this._config.vacuums));if(!t.length)return Dt;const e=this._planMode,o=(this._config.global_presets??[]).find(t=>t.id===this._activeGlobalPreset)?.label,s="dry"===e||"both"===e,l="wet"===e||"both"===e;this._fetchPlan(t,e);const h=this._planPreview?.dry??new Map,d=this._planPreview?.wet??new Map,roomDef=t=>{for(const e of this._config.vacuums){const o=this._roomsFor(e).find(e=>e.key===t);if(o)return o}},cell=t=>{const e=this._config.vacuums.find(e=>e.entity===t);if(!e)return Et`<span style="font-size:11px;opacity:.25">—</span>`;const o=this._color(e);return Et`<span style="display:inline-flex;align-items:center;justify-content:center;min-width:24px;height:17px;padding:0 5px;border-radius:9px;font-size:10px;font-weight:700;color:rgb(var(--avc-ink-rgb));background:${o}30;border:1px solid ${o}">${this._vacAbbrev(e)}</span>`},modeBtn=(t,o)=>{const s=e===t;return Et`<button @click=${e=>{e.stopPropagation(),this._planMode=t}}
        style="padding:2px 8px;border-radius:8px;font-size:10px;font-weight:700;cursor:pointer;font-family:inherit;border:1px solid ${s?"rgba(var(--avc-ink-rgb),0.5)":"rgba(var(--avc-ink-rgb),0.15)"};background:${s?"rgba(var(--avc-ink-rgb),0.12)":"transparent"};color:${s?"#fff":"rgba(var(--avc-ink-rgb),0.5)"}">${o}</button>`},p="plan-run";return Et`
      <div style="margin:0 4px 6px;padding:6px 8px;background:rgba(var(--avc-ink-rgb),0.03);border:1px solid rgba(var(--avc-ink-rgb),0.08);border-radius:12px;display:flex;flex-direction:column;gap:6px">
        <div style="display:flex;align-items:center;justify-content:space-between">
          <span style="font-size:9px;font-weight:600;letter-spacing:.6px;color:rgba(var(--avc-ink-rgb),.35)">CLEAN PLAN${o?" · "+o.toUpperCase():""}</span>
          <div style="display:flex;gap:4px">${modeBtn("dry","Dry")}${modeBtn("wet","Wet")}${modeBtn("both","Both")}</div>
        </div>
        <div style="display:flex;gap:6px;overflow-x:auto;align-items:center">
          <div style="display:flex;flex-direction:column;gap:3px;align-items:center;flex-shrink:0;padding-right:2px">
            <span style="height:18px"></span>
            ${s?Et`<ha-icon icon="mdi:broom" style="--mdc-icon-size:14px;color:rgba(var(--avc-ink-rgb),.4)"></ha-icon>`:Dt}
            ${l?Et`<ha-icon icon="mdi:water" style="--mdc-icon-size:14px;color:rgba(var(--avc-info-rgb),.7)"></ha-icon>`:Dt}
          </div>
          ${t.map(t=>{const e=roomDef(t);return Et`<div style="display:flex;flex-direction:column;align-items:center;gap:3px;min-width:32px;flex-shrink:0" title=${e?.name??t}>
              <ha-icon icon=${e?.icon||"mdi:floor-plan"} style="--mdc-icon-size:18px;color:rgba(var(--avc-ink-rgb),.7)"></ha-icon>
              ${s?cell(h.get(t)):Dt}
              ${l?cell(d.get(t)):Dt}
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
          <span style="font-size:12px">Start · hold</span>
        </button>
      </div>
    `}_renderAutoBar(){if("auto"!==this._config.ui_mode)return Dt;const t=this._config.global_presets??[];return t.length?Et`
      <div style="display:flex;flex-wrap:wrap;gap:8px;padding:2px 4px 4px">
        ${t.map(t=>{const e=this._activeGlobalPreset===t.id;return Et`<button
            @click=${()=>this._selectGlobalPreset(t)}
            style="flex:0 1 auto;min-width:128px;display:flex;flex-direction:row;align-items:center;justify-content:flex-start;gap:10px;padding:9px 14px;border-radius:14px;cursor:pointer;font-family:inherit;color:white;background:${e?"rgba(var(--avc-ok-rgb),0.14)":"rgba(var(--avc-ink-rgb),0.05)"};border:1px solid ${e?"rgba(var(--avc-ok-rgb),0.6)":"rgba(var(--avc-ink-rgb),0.12)"}">
            <ha-icon icon=${t.icon||"mdi:robot-vacuum-variant"} style="--mdc-icon-size:24px"></ha-icon>
            <div style="display:flex;flex-direction:column;align-items:flex-start;line-height:1.15">
              <span style="font-size:13px;font-weight:700">${t.label}</span>
              <small style="font-size:9px;font-weight:600;letter-spacing:.4px;color:rgba(var(--avc-ink-rgb),0.4)">${"all"===t.scope?"WHOLE HOME":"select"===t.scope?"SELECTED":"ROOMS"}${t.mode?" · "+("dry"===t.mode?"DRY":"wet"===t.mode?"WET":"BOTH"):""}</small>
            </div>
          </button>`})}
      </div>
    `:Dt}_pinsAttr(){const t=this._selSensor(),e=t?this.hass.states[t]?.attributes?.room_pins:void 0;return e&&"object"==typeof e?e:{}}_pinCandidates(t,e){return this._config.vacuums.filter(o=>this._roomsFor(o).some(e=>e.key===t)&&this._vacCleanType(o)[e])}_cycleRoomPin(t,e,o){const s=this._pinCandidates(t,e);if(s.length<2)return;const l=s.findIndex(t=>t.entity===o),h=s[(l+1)%s.length];this._call("anyvac","pin_room",{room:t,kind:e,vacuum:h.entity})}_vacChip(t,e){const o=this._config.vacuums.find(e=>e.entity===t);if(!o)return Et`<span class="dock-chip dock-chip--empty" @click=${e??Dt}>—</span>`;const s=this._color(o);return Et`<span class="dock-chip"
      style="color:rgb(var(--avc-ink-rgb));background:${s}30;border-color:${s}"
      title=${(o.name??o.entity)+(e?" · tap to assign a different vacuum":"")}
      @click=${e??Dt}>${this._vacAbbrev(o)}</span>`}_selEstMins(t){let e=0;for(const o of t){let t=0;for(const e of this._config.vacuums){const s=this._roomsFor(e).find(t=>t.key===o);s&&(t=Math.max(t,this._roomCleanMins(s,e)))}e+=t}return Math.round(e)}_renderVacuumIconStrip(){if("portrait"!==this._profile)return Dt;const t=this._config.vacuums;return t.length?Et`
      <div class="vac-icon-strip">
        ${t.map((t,e)=>{const o=this._shownSet.has(e),s="vacicon-"+e,l=this._holdId===s;return Et`
            <div class="vac-icon-slot">
              <button class="vac-icon-btn ${l?"vac-icon-btn--holding":""} ${o?"":"vac-icon-btn--hidden"}"
                style=${Ut({borderColor:this._statusInfo(t)[1]})}
                @pointerdown=${t=>{t.preventDefault(),this._cancelHold(),this._holdId=s,this._holdTimer=setTimeout(()=>{this._holdTimer=null,this._holdId=null,this._toggleShownMulti(e)},Zt)}}
                @pointerup=${()=>{null!==this._holdTimer?(this._cancelHold(),this._fireMoreInfo(t.entity)):this._holdId=null}}
                @pointerleave=${this._holdEnd}
                @pointercancel=${this._holdEnd}
                title=${t.name??t.entity} aria-label=${t.name??t.entity}
                aria-pressed=${o?"true":"false"}>
                <div class="hold-ring"></div>
                ${t.image?Et`<img src=${t.image} alt="" />`:Et`<ha-icon icon="mdi:robot-vacuum" style=${Ut({color:this._color(t)})}></ha-icon>`}
              </button>
            </div>
          `})}
      </div>
    `:Dt}_renderDock(t,e=!1){const o=this._config.vacuums,s=this._mergedRoomDefs(o);if(!s.length)return Et`${e?this._renderVacuumPicker():Dt}${this._renderVacuumIconStrip()}${this._renderDockSheet()}`;const l=o.some(t=>this._intAttrs(t)),h=this._planMode,d=this._allRoomKeys().filter(t=>this._isRoomSelectedAny(t,o)),p=d.length?d:this._allRoomKeys();l&&p.length&&this._fetchPlan(p,h);const m=this._planPreview?.dry??new Map,u=this._planPreview?.wet??new Map,_=new Set(l?this._planPreview?.unsequenced??[]:[]),f=new Set(this._unassignedRooms(p,h,l)),b="wet"!==h,v="dry"!==h,badge=t=>null===t?"—":t<1?"<1d":Math.round(t)+"d",modeBtn=(t,e,o)=>Et`
      <button class="dock-mode ${h===t?"on":""}"
        @click=${e=>{e.stopPropagation(),this._planMode=t}}>
        <ha-icon icon=${e}></ha-icon><span>${o}</span>
      </button>`,w="dock-run",$="portrait"!==this._profile||!!this._config.debug_dense_dock;return Et`
      <div class="dock">
        ${e?this._renderVacuumPicker():Dt}
        ${this._renderVacuumIconStrip()}
        ${"portrait"===this._profile?Et`
            <div class="dock-layers">${this._renderLayerToggleCompact(o)}
              ${this._config.layout?Et`<button class="mtbtn ${this._flipEff?"on":""}"
                  title="Flip map 180° for this screen (this session only)"
                  @click=${()=>this._toggleFlipLive()}>
                <ha-icon icon="mdi:flip-vertical"></ha-icon>
              </button>`:Dt}
              ${(()=>{const t=this._alignCandidates(o);return t.length?Et`<button class="mtbtn" title="Align — full-screen manual floorplan seating"
                    @click=${()=>this._openAlign(t[0])}>
                  <ha-icon icon="mdi:vector-square-edit"></ha-icon>
                </button>`:Dt})()}
            </div>
          `:Dt}
        ${t?Et`
          <div class="dock-head">
            ${modeBtn("dry","mdi:broom","Dry")}${modeBtn("wet","mdi:water","Wet")}${modeBtn("both","mdi:water-plus","Both")}
            ${o.some(t=>this._dockCaps(t).hasDock||this._careItems(t).length>0)?Et`
              <button class="dock-mode dock-mode--dock ${this._dockSheetOpen?"on":""}"
                @click=${t=>{t.stopPropagation(),this._dockSheetOpen=!this._dockSheetOpen}}>
                <ha-icon icon="mdi:home-outline"></ha-icon><span>Dock</span>
                ${this._dockNeedsAttention()?Et`<span class="dock-mode-dot"></span>`:Dt}
              </button>`:Dt}
          </div>`:Dt}
        ${this._renderModeSheet()}
        ${this._renderDockSheet()}
        ${$?Et`<div class="dock-rows">
          ${s.map(({r:t,v:e})=>{const s=this._intRoomRec(e,t),d=this._ageDaysFromIso(s?.dry),p=this._ageDaysFromIso(s?.wet),w=this._roomCoverageRec(e,t),covBadge=t=>null==t?"—":t+"%",$=this._isRoomSelectedAny(t.key,o),A=this._pinCandidates(t.key,"dry").length>1,C=this._pinCandidates(t.key,"wet").length>1,pinTap=(e,o)=>("dry"===e?A:C)?s=>{s.stopPropagation(),this._cycleRoomPin(t.key,e,o)}:void 0,P="normal"!==this._mapMode;return Et`
              <button class="dock-row ${$?"on":""} ${P?"room-overlay--locked":""}" ?disabled=${P}
                title=${P?"Room selection is off while placing a pin/zone":""}
                @click=${()=>{P||this._toggleRoomAcross(t.key,o)}}>
                <ha-icon class="dock-ric" icon=${t.icon??"mdi:square"}></ha-icon>
                <span class="dock-name">${t.name??t.key}</span>
                <span class="dock-info">
                  ${$&&f.has(t.key)?Et`<ha-icon class="dock-unassigned" icon="mdi:robot-off"
                    title="No available robot for this room's ${h} pass — check that a vacuum is configured with the right role and knows this room."></ha-icon>`:Dt}
                  ${$&&_.has(t.key)?Et`<ha-icon class="dock-unseq" icon="mdi:sort-variant-off"
                    title="No cleaning order set for this room — the time estimate may be off. Set the order in the card editor's Maps tab."></ha-icon>`:Dt}
                  <span class="dock-ages">
                    <span class="dock-age">${this._renderProgChip(this._roomProgForType(t,o,"dry"))}<ha-icon icon="mdi:broom"></ha-icon><b style=${Ut({color:this._colorForAgeDays(d)})}>${badge(d)}</b><small class="dock-cov" title="Last completed dry clean's coverage">${covBadge(w?.dry)}</small></span>
                    <span class="dock-age">${this._renderProgChip(this._roomProgForType(t,o,"wet"))}<ha-icon icon="mdi:water"></ha-icon><b style=${Ut({color:this._colorForAgeDays(p)})}>${badge(p)}</b><small class="dock-cov" title="Last completed wet clean's coverage">${covBadge(w?.wet)}</small></span>
                  </span>
                  ${l&&$?Et`
                    <span class="dock-avatars">
                      ${b?this._vacChip(m.get(t.key),pinTap("dry",m.get(t.key))):Dt}
                      ${v?this._vacChip(u.get(t.key),pinTap("wet",u.get(t.key))):Dt}
                    </span>`:Dt}
                </span>
              </button>`})}
        </div>`:Dt}
        ${t&&l?Et`
          <div class="dock-foot">
            <span class="dock-est">${d.length?d.length+" rooms · ~"+this._etaFor(p,h,l)+" min":"Whole home · ~"+this._etaFor(p,h,l)+" min"}
              ${f.size?Et`<ha-icon class="dock-unassigned" icon="mdi:robot-off"
                title="${f.size} selected room${f.size>1?"s have":" has"} no available robot for the ${h} pass — it/they will be silently skipped. Check vacuum roles/config."></ha-icon>`:Dt}
              ${_.size?Et`<ha-icon class="dock-unseq" icon="mdi:sort-variant-off"
                title="${_.size} selected room${_.size>1?"s have":" has"} no cleaning order set — the time above may be off. Set the order in the card editor's Maps tab."></ha-icon>`:Dt}</span>
            <button class="action-btn dock-run ${this._holdId===w?"action-btn--holding":""}"
              ?disabled=${!p.length}
              @pointerdown=${p.length?this._holdStart(w,()=>this._runOrchestrated(p,this._planMode)):Dt}
              @pointermove=${this._holdMove}
              @pointerup=${this._holdEnd}
              @pointerleave=${this._holdEnd}
              @pointercancel=${this._holdEnd}>
              <div class="hold-ring"></div>
              <ha-icon icon="mdi:play" style="--mdc-icon-size:16px"></ha-icon>
              <span style="font-size:12px">Start · hold</span>
            </button>
          </div>`:Dt}
      </div>
    `}_dockNeedsAttention(){return this._config.vacuums.some(t=>{const e=this._intAttrs(t)?.dock_status,o=e?.dock_error_status;return null!=o&&0!==o&&"0"!==o})}_dockTier(t){const e=this._intAttrs(t)?.dock_status?.dock_type;return null==e||0===e?"none":1===e||5===e?"empty":"full"}_dockCaps(t){const e=this._intAttrs(t)?.dock_status?.features;if(e&&null!==e.has_dock&&void 0!==e.has_dock)return{hasDock:!!e.has_dock,collect:!!e.is_collectable,wash:!!e.is_washable,dry:!!e.is_dryable};const o=this._dockTier(t);return{hasDock:"none"!==o,collect:"none"!==o,wash:"full"===o,dry:"full"===o}}_dockCapsKey(t){const e=this._dockCaps(t);return`${e.hasDock?1:0}${e.collect?1:0}${e.wash?1:0}${e.dry?1:0}`}_dockRunning(t,e){const o=this._intAttrs(t)?.dock_status?.running;if(!o)return null;const s=o[e];return null==s?null:!!s}_renderDockSheet(){if(!this._dockSheetOpen)return Dt;const t=this._config.vacuums.filter(t=>this._dockCaps(t).hasDock||this._careItems(t).length>0);if(!t.length)return Dt;const e=Math.min(this._dockSheetIdx,t.length-1),o=t[e],s=this._dockCaps(o),l=this._intAttrs(o)?.dock_status,act=(t,e)=>()=>{this._call("anyvac",t,{entity_id:o.entity,...e?{action:e}:{}})},cycle=(t,e,s,l)=>{const h=this._dockRunning(o,e);return Et`
        <button class="dock-sheet-action ${h?"running":""}"
          title=${h?`Stop ${l.toLowerCase()}`:l}
          @click=${act(t,h?"stop":"start")}>
          <ha-icon icon=${h?"mdi:stop":s}></ha-icon>
          <span>${h?"Stop":l}</span>
        </button>`},h=this._careItems(o),reset=t=>e=>{e.stopPropagation();const o=t.entity??t.reset,s=new Map(this._careResetPending);s.set(o,Date.now()),this._careResetPending=s,setTimeout(()=>{if(this._careResetPending.get(o)===s.get(o)){const t=new Map(this._careResetPending);t.delete(o),this._careResetPending=t}},4e4),this._call("button","press",{entity_id:t.reset})};return Et`
      <div class="dock-sheet">
        ${t.length>1?Et`
          <div class="dock-sheet-tabs">
            ${t.map((t,o)=>Et`
              <button class="dock-sheet-tab ${o===e?"on":""}"
                style=${Ut({borderColor:this._color(t)})}
                title=${t.name??t.entity}
                @click=${t=>{t.stopPropagation(),this._dockSheetIdx=o}}>
                ${t.image?Et`<img src=${t.image} alt="" />`:Et`<ha-icon icon="mdi:robot-vacuum" style=${Ut({color:this._color(t)})}></ha-icon>`}
              </button>`)}
          </div>`:Dt}
        ${this._config.debug&&l?Et`
          <div class="dock-sheet-debug">
            ${Object.entries(l).flatMap(([t,e])=>null===e||"object"!=typeof e||Array.isArray(e)?[[t,e]]:Object.entries(e).map(([e,o])=>[`${t}.${e}`,o])).filter(([t,e])=>void 0!==e&&(null!==e||t.includes("."))).map(([t,e])=>Et`<span>${t}: ${null===e?"null":String(e)}</span>`)}
          </div>`:Dt}
        ${s.hasDock?Et`
          <div class="dock-sheet-actions">
            ${s.collect?cycle("dock_empty","empty","mdi:delete-empty","Empty"):Dt}
            ${s.wash?cycle("dock_wash","wash","mdi:water","Wash"):Dt}
            ${s.dry?cycle("dock_dry","dry","mdi:hair-dryer","Dry"):Dt}
            ${s.wash?Et`
              <button class="dock-sheet-action" @click=${act("dock_pump")}>
                <ha-icon icon="mdi:water-pump"></ha-icon><span>Pump</span>
              </button>
              <button class="dock-sheet-action" @click=${act("dock_self_clean")}>
                <ha-icon icon="mdi:autorenew"></ha-icon><span>Self-clean</span>
              </button>`:Dt}
          </div>`:Dt}
        ${h.length?Et`
          <div class="dock-sheet-care">
            ${h.map(t=>Et`
              <div class="dock-sheet-care-row">
                <span class="dock-sheet-care-label">${t.label}</span>
                ${t.binary?Et`<span class="dock-sheet-care-badge ${"on"===this.hass.states[t.binary]?.state?"warn":""}">
                      ${"on"===this.hass.states[t.binary]?.state?"⚠":"OK"}
                    </span>`:Et`<span class="dock-sheet-care-value">${this._careValue(t)}</span>`}
                ${t.reset?(()=>{const e=this._careResetPending.has(t.entity??t.reset);return Et`
                    <button class="dock-sheet-care-reset ${e?"pending":""}"
                      title="Reset" ?disabled=${e} @click=${reset(t)}>
                      <ha-icon icon=${e?"mdi:loading":"mdi:refresh"}></ha-icon>
                    </button>`})():Dt}
              </div>`)}
          </div>`:Dt}
      </div>
    `}_renderModeSheet(){if(!this._modeSheetOpen)return Dt;const t=this._planMode,pick=t=>e=>{e.stopPropagation(),this._planMode=t,this._modeSheetOpen=!1},modeBtn=(e,o,s)=>Et`
      <button class="dock-mode ${t===e?"on":""}" @click=${pick(e)}>
        <ha-icon icon=${o}></ha-icon><span>${s}</span>
      </button>`;return Et`
      <div class="dock-sheet">
        <div class="dock-head">
          ${modeBtn("dry","mdi:broom","Dry")}${modeBtn("wet","mdi:water","Wet")}${modeBtn("both","mdi:water-plus","Both")}
        </div>
      </div>
    `}_renderStartBar(){const t=this._config.vacuums,e=t.some(t=>this._intAttrs(t)),o=this._allRoomKeys().filter(e=>this._isRoomSelectedAny(e,t)),s=o.length?o:this._allRoomKeys(),l=t.some(t=>this._isCleaning(t)),h="startbar",d={dry:"mdi:broom",wet:"mdi:water",both:"mdi:water-plus"}[this._planMode],p={dry:"Dry",wet:"Wet",both:"Both"}[this._planMode],m=Et`
      <button class="start-seg start-seg--mode ${this._modeSheetOpen?"on":""}"
        title="Clean type — tap to change"
        @click=${t=>{t.stopPropagation(),this._dockSheetOpen=!1,this._modeSheetOpen=!this._modeSheetOpen}}>
        <ha-icon icon=${d}></ha-icon>
        <span>${p}</span>
      </button>`,u=t.some(t=>this._dockCaps(t).hasDock||this._careItems(t).length>0),_=u?Et`
      <button class="start-seg start-seg--dock ${this._dockSheetOpen?"on":""}"
        title="Dock control"
        @click=${t=>{t.stopPropagation(),this._modeSheetOpen=!1,this._dockSheetOpen=!this._dockSheetOpen}}>
        <ha-icon icon="mdi:home-outline"></ha-icon>
        ${this._dockNeedsAttention()?Et`<span class="dock-mode-dot"></span>`:Dt}
      </button>`:Dt;if(l)return Et`
        <div class="start-row">
          ${m}
          <button class="start-bar start-bar--cancel ${this._holdId===h?"action-btn--holding":""}"
            @pointerdown=${this._holdStart(h,()=>{if(e)this._call("anyvac","cancel",{});else for(const e of t)this._isCleaning(e)&&this._pause(e)})}
            @pointermove=${this._holdMove}
            @pointerup=${this._holdEnd} @pointerleave=${this._holdEnd} @pointercancel=${this._holdEnd}>
            <div class="hold-ring"></div>
            <ha-icon icon="mdi:stop"></ha-icon>
            <span>CANCEL · hold</span>
          </button>
          ${_}
        </div>`;const f=e&&s.length>0,b=this._etaFor(s,this._planMode,e),v=o.length?o.length+(1===o.length?" room":" rooms"):"whole home";return Et`
      <div class="start-row">
        ${m}
        <button class="start-bar ${f&&this._holdId===h?"action-btn--holding":""}"
          ?disabled=${!f}
          title=${e?"":"Requires the AnyVac integration"}
          @pointerdown=${f?this._holdStart(h,()=>this._runOrchestrated(s,this._planMode)):Dt}
          @pointermove=${this._holdMove}
          @pointerup=${this._holdEnd} @pointerleave=${this._holdEnd} @pointercancel=${this._holdEnd}>
          <div class="hold-ring"></div>
          <ha-icon icon="mdi:play"></ha-icon>
          <span>START · ${v}${b?" · ~"+b+" min":""}</span>
        </button>
        ${_}
      </div>`}_settingPresets(t){if(t.presets&&t.presets.length)return t.presets;const e=t.clean_action;return[{id:"default",label:"Default",suction_level:e?.suction_level,mop_mode:e?.mop_mode,mop_intensity:e?.mop_intensity,repeat:e?.repeat}]}_activePresetId(t){const e=this._settingPresets(t),o=this._activePresets.get(t.entity);return o&&e.some(t=>t.id===o)?o:e[0]?.id??"default"}_activePreset(t){const e=this._settingPresets(t),o=this._activePresetId(t);return e.find(t=>t.id===o)??e[0]}_setActivePreset(t,e){const o=new Map(this._activePresets);o.set(t.entity,e),this._activePresets=o}_renderPresetChips(t){const e=this._settingPresets(t);if(e.length<2)return Dt;const o=this._activePresetId(t),s=this._color(t);return Et`
      <div class="preset-chip-row">
        ${e.map(e=>{const l=e.id===o;return Et`<button
            @click=${o=>{o.stopPropagation(),this._setActivePreset(t,e.id)}}
            style=${Ut({display:"inline-flex",alignItems:"center",gap:"4px",flexShrink:"0",padding:"4px 10px",borderRadius:"14px",cursor:"pointer",fontSize:"12px",lineHeight:"1",border:"1px solid "+(l?s:"rgba(var(--avc-ink-rgb),0.15)"),background:l?this._colorBg(t):"rgba(var(--avc-ink-rgb),0.04)",color:l?"rgb(var(--avc-ink-rgb))":"rgba(var(--avc-ink-rgb),0.55)"})}
          >
            ${e.icon?Et`<ha-icon icon=${e.icon} style="--mdc-icon-size:14px"></ha-icon>`:Dt}
            <span>${e.label}</span>
          </button>`})}
      </div>
    `}async _startClean(t){const e=this._roomsFor(t).filter(e=>this._isRoomSelected(e,t));if(0===e.length)return;if(this._intAttrs(t)){const o=this._activePreset(t),s=this._liveCleanType(t),l={};return o.suction_level&&(l.fan_speed=o.suction_level),"wet"===s&&o.mop_mode&&(l.mop_mode=o.mop_mode),"wet"===s&&o.mop_intensity&&(l.mop_intensity=o.mop_intensity),o.repeat&&o.repeat>1&&(l.repeat=o.repeat),void await this._call("anyvac","clean",{rooms:e.map(t=>t.key),mode:s,vacuums:[t.entity],...Object.keys(l).length?{settings:{[s]:{[t.entity]:l}}}:{}})}if(!t.clean_action)return;if("script"===t.clean_action.type){const o=t.clean_action,s={};for(const[l,h]of Object.entries(o.variables??{}))s[l]=h.replace("{{ entity }}",t.entity).replace("{{ selected_segments }}",JSON.stringify(e.map(t=>t.segment_id).filter(Boolean))).replace("{{ selected_room_keys }}",JSON.stringify(e.map(t=>t.key))).replace("{{ selected_area_ids }}",JSON.stringify(e.map(t=>t.area_id).filter(Boolean)));return void await this._call("script","turn_on",{entity_id:o.entity_id,variables:s})}const o=t.clean_action,s=this._activePreset(t),l=s.mop_mode??o.mop_mode,h=s.mop_intensity??o.mop_intensity,d=s.suction_level??o.suction_level;if(o.mop_mode_entity&&l&&await this._call("select","select_option",{entity_id:o.mop_mode_entity,option:l}),o.mop_intensity_entity&&h&&await this._call("select","select_option",{entity_id:o.mop_intensity_entity,option:h}),d&&await this._call("vacuum","set_fan_speed",{entity_id:t.entity,fan_speed:d}),"native-area"===t.clean_action.type)try{await this.hass.callService("vacuum","clean_area",{cleaning_area_id:e.map(t=>t.area_id??this._config.area_mappings?.[t.key]??t.key)},{entity_id:t.entity})}catch(t){console.error("[anyvac-card] vacuum.clean_area failed:",t)}else{const o=t.clean_action,s=e.map(t=>t.segment_id).filter(t=>void 0!==t);if(!s.length)return void console.error("[anyvac-card] no configured segment_ids for the selection; aborting");await this._call("vacuum","send_command",{entity_id:t.entity,command:"app_segment_clean",params:[{segments:s,repeat:o.repeat??1}]})}}_renderBadge(t,e){const o=this._shownSet.has(e),s=this._isCleaning(t),l=this._color(t),h=t.name??t.entity.split(".")[1]??t.entity,d=this._holdId==="badge-"+e,p=this._statusInfo(t)[1],m=s?this._colorBgActive(t):o?this._colorBg(t):"rgba(var(--avc-scrim-2-rgb),0.85)";return Et`
      <button
        class="badge ${d?"badge--holding":""}"
        style=${Ut({background:m,border:s?"3px solid "+p:o?"2px solid "+p:"2px solid rgba(var(--avc-ink-rgb),0.18)",boxShadow:s?"0 0 18px "+p:o?"0 0 6px "+p:"none"})}
        @pointerdown=${t=>{t.preventDefault(),this._cancelHold(),this._holdId="badge-"+e,this._holdTimer=setTimeout(()=>{this._holdTimer=null,this._holdId=null,this._toggleShown(e)},Zt)}}
        @pointerup=${()=>{null!==this._holdTimer?(this._cancelHold(),this._shownSet=new Set([e]),this._saveShown()):this._holdId=null}}
        @pointerleave=${this._holdEnd}
        @pointercancel=${this._holdEnd}
        aria-pressed=${o?"true":"false"}
        aria-label=${h}
      >
        <div class="hold-ring"></div>
        ${t.image?Et`<img class="badge-img" src=${t.image} alt=${h} />`:Et`<ha-icon class="badge-icon" icon="mdi:robot-vacuum" style=${Ut({color:l})}></ha-icon>`}
        <span class="badge-name" style=${Ut({color:o?"rgb(var(--avc-ink-rgb))":"rgba(var(--avc-ink-rgb),0.55)"})}>
          ${h}
        </span>
      </button>
    `}_renderVacuumPicker(){const t=this._config.vacuums;return t.length?Et`<div class="vac-picker">${t.map((t,e)=>this._renderBadge(t,e))}</div>`:Dt}_renderGlobalBadge(t,e){const o=this._isGlobalActive(t),s=this._resolveColor(t.color,"orange"),l="global-"+e,h=this._holdId===l,d=o?this._resolveBg(t.color,"orange",!0):"rgba(var(--avc-scrim-2-rgb),0.85)";return Et`
      <button
        class="badge badge--global ${h?"badge--holding":""}"
        style=${Ut({background:d,border:o?"3px solid "+s:"2px solid rgba(var(--avc-ink-rgb),0.18)",boxShadow:o?"0 0 18px "+s+"B0":"none"})}
        @pointerdown=${this._holdStart(l,()=>this._triggerGlobal(t))}
        @pointermove=${this._holdMove}
        @pointerup=${this._holdEnd}
        @pointerleave=${this._holdEnd}
        @pointercancel=${this._holdEnd}
        aria-label=${t.name}
        title=${"Hold to trigger: "+t.name}
      >
        <div class="hold-ring"></div>
        ${t.image?Et`<img class="badge-img" src=${t.image} alt=${t.name} />`:Et`<ha-icon class="badge-icon" icon="mdi:home-floor-a" style=${Ut({color:s})}></ha-icon>`}
        <span class="badge-name" style=${Ut({color:o?"rgb(var(--avc-ink-rgb))":"rgba(var(--avc-ink-rgb),0.55)"})}>
          ${t.name}
        </span>
      </button>
    `}_toggleMode(t,e){this._mapMode===e&&this._modeEntity===t?(this._mapMode="normal",this._modeEntity=null):(this._mapMode=e,this._modeEntity=t)}_armMode(t){this._mapMode===t&&"*"===this._modeEntity?(this._mapMode="normal",this._modeEntity=null):(this._mapMode=t,this._modeEntity="*",this._pinPending=null,this._zonePending=null,this._zoneRectShown=null,this._zoneEdit=null)}_modeCandidates(){return this._config.vacuums.filter(t=>this._intAttrs(t)&&this._mapEntityFor(t))}_isModeCandidate(t){return this._modeEntity===t.entity||"*"===this._modeEntity&&!!this._intAttrs(t)&&!!this._mapEntityFor(t)}_hasZoneEditTarget(t){return this._isModeCandidate(t)||!!this._zonePending?.[t.entity]}_zoneHit(t,e,o){const s=Math.min(t.x0,t.x1),l=Math.max(t.x0,t.x1),h=Math.min(t.y0,t.y1),d=Math.max(t.y0,t.y1),p=[["nw",s,h],["ne",l,h],["sw",s,d],["se",l,d]];for(const[t,s,l]of p)if(Math.abs(e-s)<=4&&Math.abs(o-l)<=4)return t;return e>=s&&e<=l&&o>=h&&o<=d?"move":null}_renderZoneHandles(){return Et`
      <div class="zone-handle zone-handle--nw"></div>
      <div class="zone-handle zone-handle--ne"></div>
      <div class="zone-handle zone-handle--sw"></div>
      <div class="zone-handle zone-handle--se"></div>
    `}_zoneRectFor(t,e){return"zone"===this._mapMode&&this._isModeCandidate(t)&&this._zoneDrag?this._zoneDrag:this._zoneRectShown?"merged"===this._config.map_mode?e?this._zoneRectShown:null:this._zonePending?.[t.entity]?this._zoneRectShown:null:null}_refreshMap(t){const e=this._mapEntityFor(t);e&&this.hass.callService("homeassistant","update_entity",{entity_id:e})}_clampPct(t){return Math.min(100,Math.max(0,t))}_onMapClick(t,e){if("pin"!==this._mapMode)return;if(!this._isModeCandidate(t))return;if("*"===this._modeEntity&&"merged"===this._config.map_mode){const t={};for(const o of this._modeCandidates()){const s=this._homeFrameCropFor(o);if(s){const l=this._clickToHomePx(s,e.clientX,e.clientY);l&&(t[o.entity]={x:l.x,y:l.y,frame:"home"});continue}const l=this._homeAnchorFitFor(o,this._wrapAspect(this._baseHeightFor(o)));if(l){const s=this._clickToHomeAnchorPx(l.fit,l.dims,this._wrapAspect(this._baseHeightFor(o)),e.clientX,e.clientY);s&&(t[o.entity]={x:s.x,y:s.y,frame:"home"});continue}const h=this._clickToContent(o,e.clientX,e.clientY);h&&(t[o.entity]={x:this._clampPct(h.x),y:this._clampPct(h.y)})}return this._pinPending=Object.keys(t).length?t:null,this._mapMode="normal",void(this._modeEntity=null)}const o=this._homeFrameCropFor(t),s=o?null:this._homeAnchorFitFor(t,this._wrapAspect(this._baseHeightFor(t))),l=!!o||!!s,h=o?this._clickToHomePx(o,e.clientX,e.clientY):s?this._clickToHomeAnchorPx(s.fit,s.dims,this._wrapAspect(this._baseHeightFor(t)),e.clientX,e.clientY):this._clickToContent(t,e.clientX,e.clientY);this._dbg=h?l?"goto (home) "+h.x.toFixed(1)+"px, "+h.y.toFixed(1)+"px":"goto "+h.x.toFixed(1)+"%, "+h.y.toFixed(1)+"%":"(map element not found)",h&&this._call("anyvac","goto",l?{entity_id:t.entity,frame:"home",x_home_px:h.x,y_home_px:h.y}:{entity_id:t.entity,x_pct:this._clampPct(h.x),y_pct:this._clampPct(h.y)}),this._mapMode="normal",this._modeEntity=null}_mapRotationDeg(){return this._config.layout?this._mapRegW<=4||this._mapRegH<=4?0:(this._narrow?90:0)+(this._flipEff?180:0):this._narrow?90:0}_unrotateDelta(t,e){const o=(this._mapRotationDeg()%360+360)%360;if(!o)return{dx:t,dy:e};const s=o*Math.PI/180,l=Math.cos(s),h=Math.sin(s);return{dx:l*t+h*e,dy:-h*t+l*e}}_wrapPct(t,e,o){const s=t.getBoundingClientRect(),l=this._unrotateDelta(e-(s.left+s.right)/2,o-(s.top+s.bottom)/2),h=t.offsetWidth||1,d=t.offsetHeight||1;return{x:100*(l.dx/h+.5),y:100*(l.dy/d+.5)}}_wrapPoint(t,e,o){const s=t.getBoundingClientRect(),l=(s.left+s.right)/2,h=(s.top+s.bottom)/2,d=(e/100-.5)*(t.offsetWidth||1),p=(o/100-.5)*(t.offsetHeight||1),m=(this._mapRotationDeg()%360+360)%360;if(!m)return{x:l+d,y:h+p};const u=m*Math.PI/180,_=Math.cos(u),f=Math.sin(u);return{x:l+(_*d-f*p),y:h+(f*d+_*p)}}_clickToContent(t,e,o){const s=this._mapEntityFor(t)?this.renderRoot?.querySelector(`.map-img[data-entity="${t.entity.replace(/"/g,'\\"')}"]`):null;if(!s)return null;const l=s.getBoundingClientRect(),h=(l.left+l.right)/2,d=(l.top+l.bottom)/2,p=getComputedStyle(s).transform,m=new DOMMatrix("none"===p?void 0:p),u=m.a*m.d-m.b*m.c;if(Math.abs(u)<1e-9)return null;const _=this._unrotateDelta(e-h,o-d),f=(m.d*_.dx-m.c*_.dy)/u,b=(-m.b*_.dx+m.a*_.dy)/u;return{x:100*(f/(s.offsetWidth||1)+.5),y:100*(b/(s.offsetHeight||1)+.5)}}_clickToHomePx(t,e,o){const s=this._clickToImageBasePct(e,o);return s?pctToCropPoint(s,t):null}_clickToImageBasePct(t,e){const o=this.renderRoot?.querySelector(".image-base-img");if(!o)return null;const s=o.getBoundingClientRect(),l=(s.left+s.right)/2,h=(s.top+s.bottom)/2,d=getComputedStyle(o).transform,p=new DOMMatrix("none"===d?void 0:d),m=p.a*p.d-p.b*p.c;if(Math.abs(m)<1e-9)return null;const u=this._unrotateDelta(t-l,e-h),_=(p.d*u.dx-p.c*u.dy)/m,f=(-p.b*u.dx+p.a*u.dy)/m;return{x:100*(_/(o.offsetWidth||1)+.5),y:100*(f/(o.offsetHeight||1)+.5)}}_clickToHomeAnchorPx(t,e,o,s,l){const h=this._clickToImageBasePct(s,l);return h?function unprojectPctThroughFit(t,e,o,s){const l=t.x/100,h=t.y/100/s,d=o.scale/100,p=o.rotation*re,m=Math.cos(p),u=Math.sin(p),_=l-(50+o.offset_x)/100,f=h-(50+o.offset_y)/100/s,b=(-u*_+m*f)/d;return{x:(m*_+u*f)/d*e.NW+e.NW/2,y:b*e.NW+e.NH/2}}(h,e,t,o):null}_onZoneDown(t,e){if(!(!!this._zoneRectShown&&this._hasZoneEditTarget(t)||"zone"===this._mapMode&&this._isModeCandidate(t)))return;const o=e.currentTarget;o.setPointerCapture?.(e.pointerId);const{x:s,y:l}=this._wrapPct(o,e.clientX,e.clientY);if(this._zoneRectShown){const t=this._zoneHit(this._zoneRectShown,s,l);if(t){const e=this._zoneRectShown,o=Math.min(e.x0,e.x1),h=Math.max(e.x0,e.x1),d=Math.min(e.y0,e.y1),p=Math.max(e.y0,e.y1);return this._zoneRectShown={x0:o,y0:d,x1:h,y1:p},void(this._zoneEdit="move"===t?{type:"move",offsetX:s-o,offsetY:l-d,width:h-o,height:p-d}:{type:t})}if("zone"!==this._mapMode)return}this._zonePending=null,this._zoneRectShown=null,this._zoneEdit=null,this._zoneMulti="*"===this._modeEntity&&"merged"===this._config.map_mode,this._zoneDrag={x0:s,y0:l,x1:s,y1:l}}_onZoneMove(t,e){if(this._zoneEdit&&this._zoneRectShown){const t=e.currentTarget,{x:o,y:s}=this._wrapPct(t,e.clientX,e.clientY),l=3,h=this._zoneEdit;if("move"===h.type){const{offsetX:t,offsetY:e,width:l,height:d}=h,p=Math.min(100-l,Math.max(0,o-t)),m=Math.min(100-d,Math.max(0,s-e));this._zoneRectShown={x0:p,y0:m,x1:p+l,y1:m+d}}else{let{x0:t,y0:e,x1:d,y1:p}=this._zoneRectShown;const m=this._clampPct(o),u=this._clampPct(s);"nw"===h.type?(t=Math.min(m,d-l),e=Math.min(u,p-l)):"ne"===h.type?(d=Math.max(m,t+l),e=Math.min(u,p-l)):"sw"===h.type?(t=Math.min(m,d-l),p=Math.max(u,e+l)):(d=Math.max(m,t+l),p=Math.max(u,e+l)),this._zoneRectShown={x0:t,y0:e,x1:d,y1:p}}return}if(!this._zoneDrag||"zone"!==this._mapMode||!this._isModeCandidate(t))return;const o=e.currentTarget,s=this._wrapPct(o,e.clientX,e.clientY);this._zoneDrag={x0:this._zoneDrag.x0,y0:this._zoneDrag.y0,x1:s.x,y1:s.y}}_onZoneUp(t,e){const o=e.currentTarget;if(this._zoneEdit)return this._zoneEdit=null,void this._commitZoneRect(t,o);if(!this._zoneDrag||"zone"!==this._mapMode||!this._isModeCandidate(t))return;const s=Math.abs(this._zoneDrag.x1-this._zoneDrag.x0)>2||Math.abs(this._zoneDrag.y1-this._zoneDrag.y0)>2;if(this._zoneRectShown=s?this._zoneDrag:null,this._zoneDrag=null,!s)return;this._zoneMulti&&(this._mapMode="normal",this._modeEntity=null),this._commitZoneRect(t,o)}_commitZoneRect(t,e){const o=this._zoneRectShown;if(!o)return;const s=this._wrapPoint(e,Math.min(o.x0,o.x1),Math.min(o.y0,o.y1)),l=this._wrapPoint(e,Math.max(o.x0,o.x1),Math.max(o.y0,o.y1)),h=s.x,d=s.y,p=l.x,m=l.y;if(this._zoneMulti){const t={};for(const e of this._modeCandidates()){const o=this._homeFrameCropFor(e);if(o){const s=this._clickToHomePx(o,h,d),l=this._clickToHomePx(o,p,m);s&&l&&(t[e.entity]={x1:Math.min(s.x,l.x),y1:Math.min(s.y,l.y),x2:Math.max(s.x,l.x),y2:Math.max(s.y,l.y),frame:"home"});continue}const s=this._wrapAspect(this._baseHeightFor(e)),l=this._homeAnchorFitFor(e,s);if(l){const o=this._clickToHomeAnchorPx(l.fit,l.dims,s,h,d),u=this._clickToHomeAnchorPx(l.fit,l.dims,s,p,m);o&&u&&(t[e.entity]={x1:Math.min(o.x,u.x),y1:Math.min(o.y,u.y),x2:Math.max(o.x,u.x),y2:Math.max(o.y,u.y),frame:"home"});continue}const u=this._clickToContent(e,h,d),_=this._clickToContent(e,p,m);u&&_&&(t[e.entity]={x1:this._clampPct(Math.min(u.x,_.x)),y1:this._clampPct(Math.min(u.y,_.y)),x2:this._clampPct(Math.max(u.x,_.x)),y2:this._clampPct(Math.max(u.y,_.y))})}return void(this._zonePending=Object.keys(t).length?t:null)}const u=this._homeFrameCropFor(t);if(u){const e=this._clickToHomePx(u,h,d),o=this._clickToHomePx(u,p,m);return void(e&&o&&(this._zonePending={[t.entity]:{x1:Math.min(e.x,o.x),y1:Math.min(e.y,o.y),x2:Math.max(e.x,o.x),y2:Math.max(e.y,o.y),frame:"home"}}))}const _=this._wrapAspect(this._baseHeightFor(t)),f=this._homeAnchorFitFor(t,_);if(f){const e=this._clickToHomeAnchorPx(f.fit,f.dims,_,h,d),o=this._clickToHomeAnchorPx(f.fit,f.dims,_,p,m);return void(e&&o&&(this._zonePending={[t.entity]:{x1:Math.min(e.x,o.x),y1:Math.min(e.y,o.y),x2:Math.max(e.x,o.x),y2:Math.max(e.y,o.y),frame:"home"}}))}const b=this._clickToContent(t,h,d),v=this._clickToContent(t,p,m);b&&v&&(this._zonePending={[t.entity]:{x1:this._clampPct(Math.min(b.x,v.x)),y1:this._clampPct(Math.min(b.y,v.y)),x2:this._clampPct(Math.max(b.x,v.x)),y2:this._clampPct(Math.max(b.y,v.y))}})}_confirmZone(t){const e=this._zonePending?.[t.entity];if(!e)return;const o=t.clean_action;if(this._call("anyvac","zone_clean","home"===e.frame?{entity_id:t.entity,frame:"home",x1_home_px:e.x1,y1_home_px:e.y1,x2_home_px:e.x2,y2_home_px:e.y2,repeat:o?.repeat??1}:{entity_id:t.entity,x1_pct:e.x1,y1_pct:e.y1,x2_pct:e.x2,y2_pct:e.y2,repeat:o?.repeat??1}),this._zonePending){const e={...this._zonePending};delete e[t.entity],this._zonePending=Object.keys(e).length?e:null,this._zonePending||(this._zoneRectShown=null)}this._zoneDrag=null,this._zoneEdit=null,this._mapMode="normal",this._modeEntity=null}_confirmPin(t){const e=this._pinPending?.[t.entity];if(e&&(this._call("anyvac","goto","home"===e.frame?{entity_id:t.entity,frame:"home",x_home_px:e.x,y_home_px:e.y}:{entity_id:t.entity,x_pct:e.x,y_pct:e.y}),this._pinPending)){const e={...this._pinPending};delete e[t.entity],this._pinPending=Object.keys(e).length?e:null}}_cancelPin(){this._pinPending=null}_cancelZone(){this._zonePending=null,this._zoneDrag=null,this._zoneRectShown=null,this._zoneEdit=null}_renderMetaBar(t){const e=t.filter(t=>this._mapEntityFor(t));if(!e.length)return Dt;const o=this._modeCandidates().length>0,s=o?"":"Requires the AnyVac integration (≥ 0.18) + map entity",l="*"===this._modeEntity?this._mapMode:"normal",h=this._allRoomKeys().filter(e=>this._isRoomSelectedAny(e,t)),d=h.length?h:this._allRoomKeys(),p=t.some(t=>this._intAttrs(t));p&&d.length&&this._fetchPlan(d,this._planMode);const m=p?this._planPreview?.unsequenced??[]:[],u=this._unassignedRooms(d,this._planMode,p),_=this._pinPending?Object.keys(this._pinPending).length:0,f=this._zonePending?Object.keys(this._zonePending).length:0;return Et`
      <div class="meta-bar">
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
          ${u.length?Et`<span class="mtbtn mtbtn--stat mtbtn--err"
              title="${u.length} selected room${u.length>1?"s have":" has"} no available robot for the ${this._planMode} pass — it/they will be silently skipped. Check vacuum roles/config.">
            <ha-icon icon="mdi:robot-off"></ha-icon><b>${u.length}</b>
          </span>`:Dt}
          ${m.length?Et`<span class="mtbtn mtbtn--stat mtbtn--warn"
              title="${m.length} selected room${m.length>1?"s have":" has"} no cleaning order set — the time may be off. Set the order in the card editor's Maps tab.">
            <ha-icon icon="mdi:sort-variant-off"></ha-icon><b>${m.length}</b>
          </span>`:Dt}
          ${this._renderLayerToggleCompact(t)}
          ${this._config.layout?Et`<button class="mtbtn ${this._flipEff?"on":""}"
              title="Flip map 180° for this screen (this session only — the card editor's Layout section sets a permanent default)"
              @click=${()=>this._toggleFlipLive()}>
            <ha-icon icon="mdi:flip-vertical"></ha-icon>
          </button>`:Dt}
          ${(()=>{const e=this._alignCandidates(t);return e.length?Et`<button class="mtbtn" title="Align — full-screen manual floorplan seating"
                @click=${()=>this._openAlign(e[0])}>
              <ha-icon icon="mdi:vector-square-edit"></ha-icon>
            </button>`:Dt})()}
          <div class="meta-bar-divider"></div>
          <button class="mtbtn mtbtn--ghost" title="Refresh maps" @click=${t=>{const o=t.currentTarget;o.classList.remove("mtbtn--spin"),o.offsetWidth,o.classList.add("mtbtn--spin");for(const t of e)this._refreshMap(t)}}>
            <ha-icon icon="mdi:refresh"></ha-icon>
          </button>
        </div>
      </div>
      ${f?Et`<div class="calib-panel">
          <div>Zone ready for ${f} vacuum${f>1?"s":""} — drag the box or its corners to adjust, then pick one on its status card below.</div>
          <div class="calib-actions"><button class="mtbtn" @click=${()=>this._cancelZone()}>Cancel</button></div>
        </div>`:"zone"===l?Et`<div class="calib-panel">Drag a rectangle on the map to set a cleaning zone.</div>`:Dt}
      ${_?Et`<div class="calib-panel">
          <div>Pin ready for ${_} vacuum${_>1?"s":""} — pick one on its status card below.</div>
          <div class="calib-actions"><button class="mtbtn" @click=${()=>this._cancelPin()}>Cancel</button></div>
        </div>`:"pin"===l?Et`<div class="calib-panel">Tap the map to drop a pin.</div>`:Dt}
    `}_renderMapTools(t){if(!t.map&&!t.image_base&&!this._mapEntityFor(t))return Dt;const e=this._mapEntityFor(t),o=!!this._intAttrs(t)&&!!e,s=o?"":"Requires the AnyVac integration (≥ 0.18) + map entity",l=this._modeEntity===t.entity?this._mapMode:"normal";return Et`
      <div class="map-tools">
        ${this._config.layout&&this._config.vacuums.length>1?Et`<span class="map-tools-label">${t.name??t.entity}</span>`:Dt}
        ${e?Et`<button class="mtbtn" @click=${()=>this._refreshMap(t)} title="Refresh map">
          <ha-icon icon="mdi:refresh"></ha-icon><span>Refresh</span>
        </button>`:Dt}
        <button class="mtbtn ${"pin"===l?"on":""}" ?disabled=${!o}
          @click=${()=>this._toggleMode(t.entity,"pin")} title=${s||"Pin & Go"}>
          <ha-icon icon="mdi:map-marker-radius"></ha-icon><span>Pin &amp; Go</span>
        </button>
        <button class="mtbtn ${"zone"===l?"on":""}" ?disabled=${!o}
          @click=${()=>this._toggleMode(t.entity,"zone")} title=${s||"Zone clean"}>
          <ha-icon icon="mdi:select-drag"></ha-icon><span>Zone</span>
        </button>
        ${!this._dbg||!this._config.debug&&this._config.layout?Dt:Et`<span style="font-size:11px;opacity:0.65;align-self:center;font-family:monospace">${this._dbg}</span>`}
      </div>
      ${"pin"===l?Et`<div class="calib-panel">Tap the map to send the robot there.</div>`:Dt}
      ${"zone"===l?Et`<div class="calib-panel">
        ${this._zonePending?.[t.entity]?Et`<div>Clean this zone? Drag the box or its corners to adjust.</div>
              <div class="calib-actions">
                <button class="mtbtn on" @click=${()=>this._confirmZone(t)}>Clean zone</button>
                <button class="mtbtn" @click=${()=>this._cancelZone()}>Cancel</button>
              </div>`:Et`Drag a rectangle on the map to set a cleaning zone.`}
      </div>`:Dt}
    `}_baseHeightFor(t){return"merged"===this._config.map_mode?this._config.base_height??this._config.vacuums.find(t=>t.base_height)?.base_height:t.base_height}_wrapAspect(t){return"number"==typeof t&&t>0&&this._cardW>0?Math.max(.2,(this._cardW-16)/t):this._mapAR>.1?this._mapAR:3.636}_effectiveSeat(t){this._memoSync();const e=this._seatMemo.get(t.entity);if(e)return e;const o=resolveSeat(this._config,t,this._intAttrs(t),this._wrapAspect(this._baseHeightFor(t)));return this._seatMemo.set(t.entity,o),o}_alignCandidates(t){return!1===this._config.align_mode?[]:t.filter(t=>!!resolveImageBaseSrc(this._config,t)&&!!this._intAttrs(t))}_alignVac(){const t=this._alignSession;return t?this._config.vacuums.find(e=>e.entity===t.vacuum):void 0}_openAlign(t){if(this._alignSession)return;const e=resolveImageBaseSrc(this._config,t);if(!e||!this._intAttrs(t))return;const o=this._effectiveSeat(t),s={rotation:o.rotation,scale:o.scale,scaleY:o.scaleY,offset_x:o.offset_x,offset_y:o.offset_y};this._alignSession={vacuum:t.entity,floorplan:e,start:{...s},draft:{...s},history:[],future:[],layers:{floor:1,rawMap:1,dry:!0,wet:!0,rooms:!0,staticRooms:!0,others:!0},snap90:!1,nudgeTier:"normal"},this._alignView={zoom:1,panX:0,panY:0,rot:0},this._alignGesture=null,requestAnimationFrame(()=>{const t=this._alignHost?.shadowRoot?.querySelector(".align-overlay");t?.focus()})}_closeAlign(){this._alignSession=null,this._alignGesture=null,this._alignCancelConfirm=!1}_alignReadOnly(){const t=this._alignVac();return!!t&&!!this._homeFrameCropFor(t)}_alignHasChanges(){const t=this._alignSession;if(!t)return!1;const e=t.draft,o=t.start;return e.rotation!==o.rotation||e.scale!==o.scale||(e.scaleY??null)!==(o.scaleY??null)||e.offset_x!==o.offset_x||e.offset_y!==o.offset_y}_alignCancel(){this._alignHasChanges()?this._alignCancelConfirm=!0:this._closeAlign()}_alignConfirmDiscard(){this._closeAlign()}_alignDismissCancelConfirm(){this._alignCancelConfirm=!1}_alignReset(){const t=this._alignSession;t&&!this._alignReadOnly()&&(this._alignSession={...t,draft:{...t.start},history:[...t.history,t.draft],future:[]})}async _alignCopyYaml(){const t=this._alignSession;if(!t)return;const e=function seatToYaml(t){const r2=t=>Math.round(100*t)/100,e=["map:",'  seat: "manual"',`  rotation: ${r2(t.rotation)}`,`  scale: ${r2(t.scale)}`];return null!=t.scaleY&&e.push(`  scale_y: ${r2(t.scaleY)}`),e.push(`  offset_x: ${r2(t.offset_x)}`,`  offset_y: ${r2(t.offset_y)}`),e.join("\n")}(t.draft);try{await navigator.clipboard.writeText(e),this._alignCopiedFlash=!0,setTimeout(()=>{this._alignCopiedFlash=!1},1500)}catch(t){console.warn("[anyvac-card] Align: clipboard write failed",t)}}_alignServiceAvailable(){return!!this.hass.services?.anyvac?.set_floorplan_seat}async _alignSave(){const t=this._alignSession,e=this._alignVac();if(!t||!e||!this._alignServiceAvailable()||this._alignReadOnly())return;const o=t.draft,s={rotation:Math.round(100*o.rotation)/100,scale:Math.round(100*o.scale)/100,offset_x:Math.round(100*o.offset_x)/100,offset_y:Math.round(100*o.offset_y)/100};null!=o.scaleY&&(s.scale_y=Math.round(100*o.scaleY)/100);try{await this.hass.callService("anyvac","set_floorplan_seat",{floorplan:t.floorplan,vacuum:e.entity,map:s}),this._closeAlign()}catch(t){console.warn("[anyvac-card] Align: set_floorplan_seat call failed",t)}}_alignSetField(t,e){const o=this._alignSession;if(!o||this._alignReadOnly())return;const s=parseFloat(e);if(!Number.isFinite(s))return;const l=o.draft;if(l[t]===s)return;const h={...l,[t]:s};this._alignSession={...o,draft:h,history:[...o.history,l],future:[]}}_alignToggleScaleY(t){const e=this._alignSession;if(!e||this._alignReadOnly())return;const o=e.draft,s={...o};t?null==s.scaleY&&(s.scaleY=s.scale):delete s.scaleY,this._alignSession={...e,draft:s,history:[...e.history,o],future:[]}}_alignSetLayerOpacity(t,e){const o=this._alignSession;if(!o)return;const s=parseFloat(e);if(!Number.isFinite(s))return;const l=Math.min(1,Math.max(0,s/100));o.layers[t]!==l&&(this._alignSession={...o,layers:{...o.layers,[t]:l}})}_alignSceneSize(){const t=this._mapAR>.1?this._mapAR:3.636,e=Math.max(100,window.innerWidth-32),o=Math.max(100,window.innerHeight-140);let s=e,l=s/t;return l>o&&(l=o,s=l*t),{w:s,h:l}}_alignViewTransformCss(){const t=this._alignView;return`translate(${t.panX}px,${t.panY}px) scale(${t.zoom}) rotate(${t.rot}deg)`}_alignRotateView(){this._alignView={...this._alignView,rot:(this._alignView.rot+90)%360}}_alignPointToWrapPct(t,e){const o=this._alignHost?.shadowRoot?.querySelector(".align-scene");if(!o)return null;const s=o.getBoundingClientRect(),l=(s.left+s.right)/2,h=(s.top+s.bottom)/2,d=getComputedStyle(o).transform,p=new DOMMatrix("none"===d?void 0:d),m=p.a*p.d-p.b*p.c;if(Math.abs(m)<1e-9)return null;const u=t-l,_=e-h,f=(p.d*u-p.c*_)/m,b=(-p.b*u+p.a*_)/m;return{x:100*(f/(o.offsetWidth||1)+.5),y:100*(b/(o.offsetHeight||1)+.5)}}_alignCornerPct(t,e,o,s,l){const h=function seatToMatrix(t,e,o,s,l){const h=(50+t.offset_x)/100*e,d=(50+t.offset_y)/100*o,p=t.scale/100*(e/s),m=(t.scaleY??t.scale)/100*(e/s);return(new DOMMatrix).translate(h,d).rotate(t.rotation).scale(p,m).translate(-s/2,-.5)}(t,s,l,1),d=h.transformPoint({x:e,y:o});return{x:d.x/s*100,y:d.y/l*100}}_alignIsoDist(t,e,o){return Math.hypot(t.x-e.x,(t.y-e.y)/o)}_alignIsoAngleDeg(t,e,o){return 180*Math.atan2((e.y-t.y)/o,e.x-t.x)/Math.PI}_alignStartGesture(t,e,o){const s=this._alignSession;if(!s||this._alignReadOnly())return;t.currentTarget.setPointerCapture(t.pointerId),t.stopPropagation(),t.preventDefault();const l=this._alignPointToWrapPct(t.clientX,t.clientY);if(!l)return;const h=this._alignGesture;if(h&&1===h.startPos.size&&!h.startPos.has(t.pointerId)){const[[e,o]]=h.startPos;return void(this._alignGesture={kind:"pinch",startSeat:{...s.draft},startPos:new Map([[e,h.livePos.get(e)??o],[t.pointerId,l]]),livePos:new Map([[e,h.livePos.get(e)??o],[t.pointerId,l]])})}this._alignPushHistory(s.draft),this._alignGesture={kind:e,startSeat:{...s.draft},pivotPct:o,startPos:new Map([[t.pointerId,l]]),livePos:new Map([[t.pointerId,l]])}}_alignGestureMove(t){const e=this._alignSession,o=this._alignGesture;if(!e||!o||!o.startPos.has(t.pointerId))return;const s=this._alignPointToWrapPct(t.clientX,t.clientY);if(!s)return;o.livePos.set(t.pointerId,s);const l=this._mapAR>.1?this._mapAR:3.636;let h=null;if("drag"===o.kind){const e=t.pointerId,s=o.startPos.get(e),l=o.livePos.get(e);h=translateSeat(o.startSeat,l.x-s.x,l.y-s.y)}else if("scale"===o.kind&&o.pivotPct){const e=t.pointerId,s=o.startPos.get(e),d=o.livePos.get(e);if(null!=o.startSeat.scaleY)h=function scaleSeatCornerAniso(t,e,o,s,l){const h=pctToFrac(s,l),d=pctToFrac(e,l),p=pctToFrac(o,l),m=rotatePoint({x:d.x-h.x,y:d.y-h.y},-t.rotation),u=rotatePoint({x:p.x-h.x,y:p.y-h.y},-t.rotation),_=Math.abs(m.x)>1e-6?u.x/m.x:1,f=Math.abs(m.y)>1e-6?u.y/m.y:1,b=seatCentreFrac(t,l),v=rotatePoint({x:b.x-h.x,y:b.y-h.y},-t.rotation),w=rotatePoint({x:v.x*_,y:v.y*f},t.rotation),$=frameToOffset({x:h.x+w.x,y:h.y+w.y},l),A=t.scaleY??t.scale;return{...t,scale:t.scale*_,scaleY:A*f,offset_x:$.offset_x,offset_y:$.offset_y}}(o.startSeat,s,d,o.pivotPct,l);else{const t=this._alignIsoDist(s,o.pivotPct,l),e=this._alignIsoDist(d,o.pivotPct,l);t>1e-6&&(h=function scaleSeatAbout(t,e,o,s){const l=pctToFrac(o,s),h=seatCentreFrac(t,s),d=frameToOffset({x:l.x+e*(h.x-l.x),y:l.y+e*(h.y-l.y)},s),p={...t,scale:t.scale*e,offset_x:d.offset_x,offset_y:d.offset_y};return null!=t.scaleY&&(p.scaleY=t.scaleY*e),p}(o.startSeat,e/t,o.pivotPct,l))}}else if("stretchY"===o.kind){const e=t.pointerId,s=o.startPos.get(e),d=o.livePos.get(e);h=function stretchSeatY(t,e){const o=t.scaleY??t.scale;return{...t,scaleY:o*e}}(o.startSeat,localAxisScaleRatio(o.startSeat,"y",s,d,l))}else if("stretchX"===o.kind){const e=t.pointerId,s=o.startPos.get(e),d=o.livePos.get(e);h=function stretchSeatX(t,e){const o=t.scaleY??t.scale;return{...t,scale:t.scale*e,scaleY:o}}(o.startSeat,localAxisScaleRatio(o.startSeat,"x",s,d,l))}else if("rotate"===o.kind&&o.pivotPct){const e=t.pointerId,s=o.startPos.get(e),d=o.livePos.get(e),p=this._alignIsoAngleDeg(o.pivotPct,s,l),m=this._alignIsoAngleDeg(o.pivotPct,d,l);h=function rotateSeatAbout(t,e,o,s){const l=pctToFrac(o,s),h=seatCentreFrac(t,s),d=rotatePoint({x:h.x-l.x,y:h.y-l.y},e),p=frameToOffset({x:l.x+d.x,y:l.y+d.y},s);return{...t,rotation:normDeg(t.rotation+e),offset_x:p.offset_x,offset_y:p.offset_y}}(o.startSeat,m-p,o.pivotPct,l)}else if("pinch"===o.kind&&2===o.startPos.size){const t=[...o.startPos.keys()],e=o.startPos.get(t[0]),s=o.startPos.get(t[1]),d=o.livePos.get(t[0]),p=o.livePos.get(t[1]);h=pinchSeat(o.startSeat,e,s,d,p,l)}h&&(this._alignSession={...e,draft:h})}_alignGestureEnd(t){const e=this._alignGesture;if(e)if(e.startPos.delete(t.pointerId),e.livePos.delete(t.pointerId),0===e.startPos.size)this._alignGesture=null;else if("pinch"===e.kind&&1===e.startPos.size){const[[t,o]]=e.startPos,s=this._alignSession;this._alignGesture={kind:"drag",startSeat:s?{...s.draft}:e.startSeat,startPos:new Map([[t,o]]),livePos:new Map([[t,o]])}}}_alignPushHistory(t){const e=this._alignSession;e&&(this._alignSession={...e,history:[...e.history,t],future:[]})}_alignUndo(){const t=this._alignSession;if(!t||!t.history.length)return;const e=t.history[t.history.length-1];this._alignSession={...t,draft:e,history:t.history.slice(0,-1),future:[t.draft,...t.future]}}_alignRedo(){const t=this._alignSession;if(!t||!t.future.length)return;const e=t.future[0];this._alignSession={...t,draft:e,history:[...t.history,t.draft],future:t.future.slice(1)}}_alignSetNudgeTier(t){const e=this._alignSession;e&&(this._alignSession={...e,nudgeTier:t})}_alignEffectiveNudgeTier(t){return t.ctrlKey||t.metaKey?"fine":t.shiftKey?"jump":this._alignSession?.nudgeTier??"normal"}_alignKeyDown(t){const e=this._alignSession;if(!e)return;const o=t.target,s=!!o&&("INPUT"===o.tagName||"TEXTAREA"===o.tagName);if("Escape"===t.key)return t.preventDefault(),void this._alignCancel();const l=t.ctrlKey||t.metaKey;if(l&&!t.shiftKey&&!t.altKey&&("z"===t.key||"Z"===t.key)){if(s)return;return t.preventDefault(),void this._alignUndo()}if(l&&!t.shiftKey&&!t.altKey&&("y"===t.key||"Y"===t.key)){if(s)return;return t.preventDefault(),void this._alignRedo()}if(s)return;if(this._alignReadOnly())return;const h=function nudgeTierMultiplier(t){return"fine"===t?.1:"jump"===t?10:1}(this._alignEffectiveNudgeTier(t)),d=this._mapAR>.1?this._mapAR:3.636,p=e.draft;let m=null;switch(t.key){case"ArrowUp":m=nudgeOffset(p,0,-.1*h,this._alignView.rot,d);break;case"ArrowDown":m=nudgeOffset(p,0,.1*h,this._alignView.rot,d);break;case"ArrowLeft":m=nudgeOffset(p,-.1*h,0,this._alignView.rot,d);break;case"ArrowRight":m=nudgeOffset(p,.1*h,0,this._alignView.rot,d);break;case"[":m=nudgeRotation(p,-.5*h);break;case"]":m=nudgeRotation(p,.5*h);break;case",":m=nudgeScale(p,-.5*h);break;case".":m=nudgeScale(p,.5*h);break;default:return}t.preventDefault();const u=t.repeat?e.history:[...e.history,p];this._alignSession={...e,draft:m,history:u,future:[]}}_alignBgPointerDown(t){this._alignGesture||(t.currentTarget.setPointerCapture(t.pointerId),this._alignViewDrag={pointerId:t.pointerId,x0:t.clientX,y0:t.clientY,panX0:this._alignView.panX,panY0:this._alignView.panY})}_alignBgPointerMove(t){const e=this._alignViewDrag;e&&e.pointerId===t.pointerId&&(this._alignView={...this._alignView,panX:e.panX0+(t.clientX-e.x0),panY:e.panY0+(t.clientY-e.y0)})}_alignBgPointerUp(t){this._alignViewDrag?.pointerId===t.pointerId&&(this._alignViewDrag=null)}_alignWheel(t){t.preventDefault();const e=Math.exp(.001*-t.deltaY),o=Math.min(8,Math.max(.25,this._alignView.zoom*e));this._alignView={...this._alignView,zoom:o}}_renderAlignOverlay(){const t=this._alignSession;if(!t)return Dt;const e=this._alignVac();if(!e)return Dt;const{w:o,h:s}=this._alignSceneSize(),l=this._config.vacuums.filter(o=>o.entity!==e.entity&&resolveImageBaseSrc(this._config,o)===t.floorplan&&this._intAttrs(o)),h=this._config.image_base?.src===t.floorplan?this._config.image_base:this._config.vacuums.find(e=>e.image_base?.src===t.floorplan)?.image_base??e.image_base,d=this._mapEntityFor(e),p=d?this._mapUrl(d):null,m=t.draft,corner=(t,e)=>this._alignCornerPct(m,t,e,o,s),u=corner(0,0),_=corner(1,0),f=corner(0,1),b=corner(1,1),v=corner(.5,0),w=corner(.5,1),$=corner(0,.5),A=corner(1,.5),C={x:50+m.offset_x,y:50+m.offset_y},P=this._alignCornerPct(m,.5,-.18,o,s),F=this._alignCandidates(this._config.vacuums),E=this._alignReadOnly(),T=!E&&this._alignServiceAvailable(),O=t.history.length>0,B=t.future.length>0,j=t.nudgeTier,tierBtn=(t,e,o)=>Et`
      <button class="align-tier-btn ${j===t?"on":""}" title=${o}
        @click=${()=>this._alignSetNudgeTier(t)}>${e}</button>`;return Et`
      <div class="align-overlay ${this._rootClasses()}" tabindex="0" @keydown=${t=>this._alignKeyDown(t)}>
        <div class="align-toolbar">
          <div class="align-toolbar-title">
            <ha-icon icon="mdi:vector-square-edit"></ha-icon>
            <span>Align — ${e.name??e.entity}</span>
          </div>
          ${F.length>1?Et`<div class="align-vac-picker">
            ${F.map(t=>Et`
              <button class="align-vac-chip ${t.entity===e.entity?"on":""}"
                @click=${()=>{this._closeAlign(),this._openAlign(t)}}>
                ${t.name??t.entity}
              </button>
            `)}
          </div>`:Dt}
          <div class="align-toolbar-spacer"></div>
          <div class="align-tier-group" title="Nudge step size — hold Ctrl for Jemně, Shift for Skok">
            ${tierBtn("fine","Jemně","Fine step (0,1×) — or hold Ctrl")}
            ${tierBtn("normal","Krok","Normal step (1×)")}
            ${tierBtn("jump","Skok","Jump step (10×) — or hold Shift")}
          </div>
          <button class="align-btn" title="Undo (Ctrl+Z)" ?disabled=${!O} @click=${()=>this._alignUndo()}>
            <ha-icon icon="mdi:undo"></ha-icon>
          </button>
          <button class="align-btn" title="Redo (Ctrl+Y)" ?disabled=${!B} @click=${()=>this._alignRedo()}>
            <ha-icon icon="mdi:redo"></ha-icon>
          </button>
          <button class="align-btn" title="Rotate view 90°" @click=${()=>this._alignRotateView()}>
            <ha-icon icon="mdi:screen-rotate"></ha-icon>
          </button>
          <button class="align-btn" title="Reset to the values Align mode was opened with"
            ?disabled=${E} @click=${()=>this._alignReset()}>
            <ha-icon icon="mdi:restore"></ha-icon>
          </button>
          <button class="align-btn ${this._alignCopiedFlash?"align-btn--flash":""}"
            title="Copy as YAML (map: block, paste into the card config)" @click=${()=>this._alignCopyYaml()}>
            <ha-icon icon=${this._alignCopiedFlash?"mdi:check":"mdi:content-copy"}></ha-icon>
          </button>
          <button class="align-btn align-close-btn" title="Cancel" @click=${()=>this._alignCancel()}>
            <ha-icon icon="mdi:close"></ha-icon>
          </button>
          <button class="align-btn align-save-btn" ?disabled=${!T}
            title=${T?"Save":E?"Read-only — aligned by home frame":"Update the AnyVac integration to 2.0.0 — or Copy YAML"}
            @click=${()=>this._alignSave()}>
            <ha-icon icon="mdi:content-save"></ha-icon><span>Save</span>
          </button>
        </div>
        <div class="align-body">
          <div class="align-canvas"
            @wheel=${t=>this._alignWheel(t)}
            @pointerdown=${t=>this._alignBgPointerDown(t)}
            @pointermove=${t=>this._alignBgPointerMove(t)}
            @pointerup=${t=>this._alignBgPointerUp(t)}
            @pointercancel=${t=>this._alignBgPointerUp(t)}>
            <div class="align-scene" style=${Ut({width:o+"px",height:s+"px",transform:this._alignViewTransformCss()})}>
              ${h?.src?Et`<img class="align-floorplan-img" src=${h.src} alt="Floorplan"
                  @load=${this._onFloorplanLoad}
                  style=${Ut({opacity:String(t.layers.floor),transform:"translate("+(h.offset_x??0)+"%,"+(h.offset_y??0)+"%) rotate("+(h.rotation??0)+"deg) scale("+(h.scale??100)/100+")"})} />`:Dt}
              ${l.map(t=>{const e=this._mapEntityFor(t),o=e?this._mapUrl(e):null,s=this._effectiveSeat(t);return Et`
                  <div class="align-ghost">
                    ${o?Et`<img class="align-seat-img" src=${o} alt=""
                        style=${Ut({left:50+s.offset_x+"%",top:50+s.offset_y+"%",width:s.scale+"%",transform:"translate(-50%,-50%) "+seatRotateScaleCss(s.rotation,s.scale,s.scaleY)})} />`:Dt}
                    ${this._renderIntegrationOverlay(t,s,"both")}
                  </div>`})}
              <div class="align-seat-layer ${E?"align-seat-layer--readonly":""}"
                @pointerdown=${t=>this._alignStartGesture(t,"drag")}
                @pointermove=${t=>this._alignGestureMove(t)}
                @pointerup=${t=>this._alignGestureEnd(t)}
                @pointercancel=${t=>this._alignGestureEnd(t)}>
                ${p?Et`<img class="align-seat-img" src=${p} alt="Vacuum map"
                    style=${Ut({opacity:String(t.layers.rawMap),left:50+m.offset_x+"%",top:50+m.offset_y+"%",width:m.scale+"%",transform:"translate(-50%,-50%) "+seatRotateScaleCss(m.rotation,m.scale,m.scaleY)})} />`:Dt}
                ${this._renderIntegrationOverlay(e,m,"both")}
              </div>
              ${E?Et`
                <div class="align-readonly-note">
                  <ha-icon icon="mdi:lock-outline"></ha-icon>
                  <span>aligned by home frame — nothing to adjust</span>
                </div>
              `:Et`
                <svg class="align-gizmo" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <line x1=${C.x} y1=${C.y} x2=${P.x} y2=${P.y} class="align-gizmo-arm" />
                  <polygon points="${u.x},${u.y} ${_.x},${_.y} ${b.x},${b.y} ${f.x},${f.y}" class="align-gizmo-box" />
                </svg>
                ${[["nw",u],["ne",_],["se",b],["sw",f]].map(([t,e])=>Et`
                  <div class="align-handle align-handle--corner" data-corner=${t}
                    style=${Ut({left:e.x+"%",top:e.y+"%"})}
                    @pointerdown=${e=>{const o="nw"===t?b:"ne"===t?f:"se"===t?u:_;this._alignStartGesture(e,"scale",o)}}
                    @pointermove=${t=>this._alignGestureMove(t)}
                    @pointerup=${t=>this._alignGestureEnd(t)}
                    @pointercancel=${t=>this._alignGestureEnd(t)}>
                  </div>
                `)}
                ${[["n",v,"stretchY"],["s",w,"stretchY"],["w",$,"stretchX"],["e",A,"stretchX"]].map(([t,e,o])=>Et`
                  <div class="align-handle align-handle--side align-handle--${t}" data-side=${t}
                    style=${Ut({left:e.x+"%",top:e.y+"%"})}
                    @pointerdown=${t=>this._alignStartGesture(t,o)}
                    @pointermove=${t=>this._alignGestureMove(t)}
                    @pointerup=${t=>this._alignGestureEnd(t)}
                    @pointercancel=${t=>this._alignGestureEnd(t)}>
                  </div>
                `)}
                <div class="align-handle align-handle--rotate"
                  style=${Ut({left:P.x+"%",top:P.y+"%"})}
                  @pointerdown=${t=>this._alignStartGesture(t,"rotate",C)}
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
                @input=${t=>this._alignSetLayerOpacity("floor",t.target.value)} />
            </div>
            <div class="align-field-row align-field-row--opacity">
              <label>Vacuum map<span>%</span></label>
              <input type="range" min="0" max="100" step="5"
                .value=${String(Math.round(100*t.layers.rawMap))}
                @input=${t=>this._alignSetLayerOpacity("rawMap",t.target.value)} />
            </div>
            <div class="align-field-row">
              <label>Rotation<span>°</span></label>
              <input type="number" step="0.1" .value=${String(Math.round(100*m.rotation)/100)}
                ?disabled=${E} @change=${t=>this._alignSetField("rotation",t.target.value)} />
            </div>
            <div class="align-field-row">
              <label>${null!=m.scaleY?"Scale X":"Scale"}<span>%</span></label>
              <input type="number" step="0.1" min="1" .value=${String(Math.round(100*m.scale)/100)}
                ?disabled=${E} @change=${t=>this._alignSetField("scale",t.target.value)} />
            </div>
            <div class="align-field-row align-field-row--check">
              <label>
                <input type="checkbox" .checked=${null!=m.scaleY} ?disabled=${E}
                  @change=${t=>this._alignToggleScaleY(t.target.checked)} />
                Independent Y scale
              </label>
            </div>
            ${null!=m.scaleY?Et`
              <div class="align-field-row">
                <label>Scale Y<span>%</span></label>
                <input type="number" step="0.1" min="1" .value=${String(Math.round(100*m.scaleY)/100)}
                  ?disabled=${E} @change=${t=>this._alignSetField("scaleY",t.target.value)} />
              </div>
            `:Dt}
            <div class="align-field-row">
              <label>Offset X<span>%</span></label>
              <input type="number" step="0.01" .value=${String(Math.round(1e4*m.offset_x)/1e4)}
                ?disabled=${E} @change=${t=>this._alignSetField("offset_x",t.target.value)} />
            </div>
            <div class="align-field-row">
              <label>Offset Y<span>%</span></label>
              <input type="number" step="0.01" .value=${String(Math.round(1e4*m.offset_y)/1e4)}
                ?disabled=${E} @change=${t=>this._alignSetField("offset_y",t.target.value)} />
            </div>
          </div>
        </div>
        ${this._alignCancelConfirm?Et`
          <div class="align-confirm-backdrop">
            <div class="align-confirm-panel">
              <div class="align-confirm-title">Discard changes?</div>
              <div class="align-confirm-body">The alignment you made in this session hasn't been saved.</div>
              <div class="align-confirm-actions">
                <button class="align-btn align-confirm-keep" @click=${()=>this._alignDismissCancelConfirm()}>Keep editing</button>
                <button class="align-btn align-confirm-discard" @click=${()=>this._alignConfirmDiscard()}>Discard</button>
              </div>
            </div>
          </div>
        `:Dt}
      </div>
    `}_homeFrameCropFor(t){if(this._memoSync(),this._homeFrameMemo.has(t.entity))return this._homeFrameMemo.get(t.entity);const e=function homeFrameCropFor(t,e,o){const s="merged"===t.map_mode?t.image_base:e?.image_base,l=s?.crop_box;if(!l?.frame_id||null==l.x1||null==l.y1)return null;const h=o?.home_frame;return h?.id&&h.id===l.frame_id?{x0:l.x0,y0:l.y0,x1:l.x1,y1:l.y1}:null}(this._config,t,this._intAttrs(t));return this._homeFrameMemo.set(t.entity,e),e}_homeFrameDims(){const t=this._config.image_base?.home_anchors_frame_id,e=new Map;for(const t of this._config.vacuums??[]){const o=this._intAttrs(t)?.home_frame;if(!(o?.id&&o.width_px>0&&o.height_px>0))continue;const s=e.get(o.id);s?s.count++:e.set(o.id,{w:o.width_px,h:o.height_px,count:1})}if(t){const o=e.get(t);if(o)return{NW:o.w,NH:o.h}}let o=null;for(const t of e.values())(!o||t.count>o.count)&&(o=t);return o?{NW:o.w,NH:o.h}:null}_homeAnchorFitFor(t,e){if("merged"!==this._config.map_mode)return null;if(this._homeFrameCropFor(t))return null;if(!this._intAttrs(t)?.home_frame)return null;const o=this._config.image_base?.home_anchors,s=this._homeFrameDims(),l=homeAnchorFit(o,s,e);return l&&s?{fit:l,dims:s}:null}_renderIntegrationOverlay(t,e,o="both"){const s=this._intAttrs(t);if(!s)return Dt;const l=s.image_dims;if(!l)return Dt;const h=l.scale??1;let d=(l.width??0)*h,p=(l.height??0)*h;const m=l.rotation??0;if(90===m||270===m){const t=d;d=p,p=t}if(!d||!p)return Dt;const u=this._color(t),_=Math.max(d,p)/55,toPts=t=>(Array.isArray(t)?t:[]).map(t=>t.x.toFixed(1)+","+t.y.toFixed(1)).join(" "),f=this._vacCleanType(t),b=this._layersEff(),v=b.dry&&f.dry,w=b.wet&&f.wet,$=v&&Array.isArray(s.path_dry_px)?s.path_dry_px.map(t=>toPts(t)).filter(t=>t.length>0):[],A=w&&Array.isArray(s.path_wet_px)?s.path_wet_px.map(t=>toPts(t)).filter(t=>t.length>0):[],C=s.vacuum_position_px,P=C?{x:C.x,y:C.y}:null;let F=null;if(P&&null!=C.a){const t=C.a*Math.PI/180;F={x:P.x+1.3*_*Math.cos(t),y:P.y-1.3*_*Math.sin(t)}}const E={left:50+(e?.offset_x??0)+"%",top:50+(e?.offset_y??0)+"%",width:(e?.scale??100)+"%",aspectRatio:d+" / "+p,transform:"translate(-50%,-50%) "+seatRotateScaleCss(e?.rotation??0,e?.scale??100,e?.scaleY)},T=.35*_*((t.path_width??100)/100),O=T.toFixed(2),B=(2.6*T*((t.mop_band_width??100)/100)).toFixed(2),j=((t.mop_band_opacity??28)/100).toFixed(2),W=t.mop_path_color||"#40a9ff",G=A.length?zt`${A.map(t=>zt`<polyline points=${t} fill="none" stroke=${W} stroke-width=${B} stroke-linejoin="round" stroke-linecap="round" opacity=${j}></polyline>`)}`:Dt,q=A.length?zt`${A.map(t=>zt`<polyline points=${t} fill="none" stroke=${W} stroke-width=${O} stroke-linejoin="round" stroke-linecap="round" opacity="0.9"></polyline>`)}`:Dt,U=t.path_color||u,Y="legacy"!==(this._config.theme??oe),K=(3*T).toFixed(2),X=$.length?zt`${Y?$.map(t=>zt`<polyline points=${t} fill="none" stroke=${U} stroke-width=${K} stroke-linejoin="round" stroke-linecap="round" opacity="0.12"></polyline>`):Dt}${$.map(t=>zt`<polyline points=${t} fill="none" stroke=${U} stroke-width=${O} stroke-linejoin="round" stroke-linecap="round" opacity="0.85"></polyline>`)}`:Dt,J=!(!t.robot_image_on_map||!t.image),Q=2.6*_*((t.robot_size??100)/100),tt=(C&&null!=C.a?C.a:0)+(t.robot_image_rotation??0),et=P?J?zt`<image href=${t.image} x=${(P.x-Q/2).toFixed(1)} y=${(P.y-Q/2).toFixed(1)} width=${Q.toFixed(1)} height=${Q.toFixed(1)} preserveAspectRatio="xMidYMid meet" transform=${"rotate("+tt+" "+P.x.toFixed(1)+" "+P.y.toFixed(1)+")"}></image>`:zt`${F?zt`<line x1=${P.x.toFixed(1)} y1=${P.y.toFixed(1)} x2=${F.x.toFixed(1)} y2=${F.y.toFixed(1)} stroke="#ffffff" stroke-width=${(.3*_).toFixed(2)} stroke-linecap="round"></line>`:Dt}<circle cx=${P.x.toFixed(1)} cy=${P.y.toFixed(1)} r=${_.toFixed(1)} fill=${u} stroke="#ffffff" stroke-width=${(.18*_).toFixed(2)}></circle>`:Dt,it=P&&this._hasError(t),ot="avc-err-blur-"+t.entity.replace(/[^a-zA-Z0-9]/g,"-"),at=it?zt`<defs><filter id=${ot} x="-150%" y="-150%" width="400%" height="400%">
              <feGaussianBlur stdDeviation=${(.5*_).toFixed(2)}></feGaussianBlur>
            </filter></defs>
            <circle class="avc-err-halo" cx=${P.x.toFixed(1)} cy=${P.y.toFixed(1)} r=${(2.2*_).toFixed(1)}
              fill="#ff3b30" filter=${"url(#"+ot+")"}></circle>`:Dt,st=seatScaleYRatio(e?.scale??100,e?.scaleY),nt=zt`${at}${et}`,rt=1!==st&&P?zt`<g transform=${"translate("+P.x.toFixed(1)+","+P.y.toFixed(1)+") scale(1,"+(1/st).toFixed(4)+") translate("+(-P.x).toFixed(1)+","+(-P.y).toFixed(1)+")"}>${nt}</g>`:nt,lt=zt`${G}${q}${X}`,ct="paths"===o?lt:"marker"===o?rt:zt`${lt}${rt}`;return Et`<svg class="map-vector" viewBox="0 0 ${d} ${p}" preserveAspectRatio="none" style=${Ut(E)}>${ct}</svg>`}_renderHomeFrameOverlay(t,e,o="both"){const s=this._intAttrs(t);if(!s)return Dt;const l=e.x1-e.x0,h=e.y1-e.y0;if(!(l>0&&h>0))return Dt;const d=this._color(t),p=Math.max(l,h)/55,local=t=>({x:t.x-e.x0,y:t.y-e.y0}),toPts=t=>(Array.isArray(t)?t:[]).map(t=>{const e=local(t);return e.x.toFixed(1)+","+e.y.toFixed(1)}).join(" "),m=this._vacCleanType(t),u=this._layersEff(),_=u.dry&&m.dry,f=u.wet&&m.wet,b=_&&Array.isArray(s.path_dry_home_px)?s.path_dry_home_px.map(t=>toPts(t)).filter(t=>t.length>0):[],v=f&&Array.isArray(s.path_wet_home_px)?s.path_wet_home_px.map(t=>toPts(t)).filter(t=>t.length>0):[],w=s.vacuum_position_home_px,$=w?local(w):null;let A=null;if($&&null!=w.a){const t=w.a*Math.PI/180;A={x:$.x+1.3*p*Math.cos(t),y:$.y+1.3*p*Math.sin(t)}}const C=.35*p*((t.path_width??100)/100),P=C.toFixed(2),F=(2.6*C*((t.mop_band_width??100)/100)).toFixed(2),E=((t.mop_band_opacity??28)/100).toFixed(2),T=t.mop_path_color||"#40a9ff",O=v.length?zt`${v.map(t=>zt`<polyline points=${t} fill="none" stroke=${T} stroke-width=${F} stroke-linejoin="round" stroke-linecap="round" opacity=${E}></polyline>`)}`:Dt,B=v.length?zt`${v.map(t=>zt`<polyline points=${t} fill="none" stroke=${T} stroke-width=${P} stroke-linejoin="round" stroke-linecap="round" opacity="0.9"></polyline>`)}`:Dt,j=t.path_color||d,W="legacy"!==(this._config.theme??oe),G=(3*C).toFixed(2),q=b.length?zt`${W?b.map(t=>zt`<polyline points=${t} fill="none" stroke=${j} stroke-width=${G} stroke-linejoin="round" stroke-linecap="round" opacity="0.12"></polyline>`):Dt}${b.map(t=>zt`<polyline points=${t} fill="none" stroke=${j} stroke-width=${P} stroke-linejoin="round" stroke-linecap="round" opacity="0.85"></polyline>`)}`:Dt,U=!(!t.robot_image_on_map||!t.image),Y=2.6*p*((t.robot_size??100)/100),K=(w&&null!=w.a?w.a:0)+(t.robot_image_rotation??0),X=$?U?zt`<image href=${t.image} x=${($.x-Y/2).toFixed(1)} y=${($.y-Y/2).toFixed(1)} width=${Y.toFixed(1)} height=${Y.toFixed(1)} preserveAspectRatio="xMidYMid meet" transform=${"rotate("+K+" "+$.x.toFixed(1)+" "+$.y.toFixed(1)+")"}></image>`:zt`${A?zt`<line x1=${$.x.toFixed(1)} y1=${$.y.toFixed(1)} x2=${A.x.toFixed(1)} y2=${A.y.toFixed(1)} stroke="#ffffff" stroke-width=${(.3*p).toFixed(2)} stroke-linecap="round"></line>`:Dt}<circle cx=${$.x.toFixed(1)} cy=${$.y.toFixed(1)} r=${p.toFixed(1)} fill=${d} stroke="#ffffff" stroke-width=${(.18*p).toFixed(2)}></circle>`:Dt,J=$&&this._hasError(t),Q="avc-hf-err-blur-"+t.entity.replace(/[^a-zA-Z0-9]/g,"-"),tt=J?zt`<defs><filter id=${Q} x="-150%" y="-150%" width="400%" height="400%">
              <feGaussianBlur stdDeviation=${(.5*p).toFixed(2)}></feGaussianBlur>
            </filter></defs>
            <circle class="avc-err-halo" cx=${$.x.toFixed(1)} cy=${$.y.toFixed(1)} r=${(2.2*p).toFixed(1)}
              fill="#ff3b30" filter=${"url(#"+Q+")"}></circle>`:Dt,et=zt`${O}${B}${q}`,it=zt`${tt}${X}`,ot="paths"===o?et:"marker"===o?it:zt`${et}${it}`;return Et`<svg class="map-vector" viewBox="0 0 ${l} ${h}" preserveAspectRatio="none" style=${Ut({left:"0",top:"0",width:"100%",height:"100%"})}>${ot}</svg>`}_renderHomeAnchorOverlay(t,e,o,s,l="both"){const h=this._intAttrs(t);if(!(h&&s>0))return Dt;const d=this._color(t),proj=t=>{const l=projectHomePxThroughFit(t,o,e,s);return{x:l.x,y:l.y/s}},p=Math.max(100,100/s)/55,toPts=t=>(Array.isArray(t)?t:[]).map(t=>{const e=proj(t);return e.x.toFixed(2)+","+e.y.toFixed(2)}).join(" "),m=this._vacCleanType(t),u=this._layersEff(),_=u.dry&&m.dry,f=u.wet&&m.wet,b=_&&Array.isArray(h.path_dry_home_px)?h.path_dry_home_px.map(t=>toPts(t)).filter(t=>t.length>0):[],v=f&&Array.isArray(h.path_wet_home_px)?h.path_wet_home_px.map(t=>toPts(t)).filter(t=>t.length>0):[],w=h.vacuum_position_home_px,$=w?proj(w):null;let A=null;if($&&null!=w.a){const t=(w.a+e.rotation)*Math.PI/180;A={x:$.x+1.3*p*Math.cos(t),y:$.y+1.3*p*Math.sin(t)}}const C=.35*p*((t.path_width??100)/100),P=C.toFixed(2),F=(2.6*C*((t.mop_band_width??100)/100)).toFixed(2),E=((t.mop_band_opacity??28)/100).toFixed(2),T=t.mop_path_color||"#40a9ff",O=v.length?zt`${v.map(t=>zt`<polyline points=${t} fill="none" stroke=${T} stroke-width=${F} stroke-linejoin="round" stroke-linecap="round" opacity=${E}></polyline>`)}`:Dt,B=v.length?zt`${v.map(t=>zt`<polyline points=${t} fill="none" stroke=${T} stroke-width=${P} stroke-linejoin="round" stroke-linecap="round" opacity="0.9"></polyline>`)}`:Dt,j=t.path_color||d,W="legacy"!==(this._config.theme??oe),G=(3*C).toFixed(2),q=b.length?zt`${W?b.map(t=>zt`<polyline points=${t} fill="none" stroke=${j} stroke-width=${G} stroke-linejoin="round" stroke-linecap="round" opacity="0.12"></polyline>`):Dt}${b.map(t=>zt`<polyline points=${t} fill="none" stroke=${j} stroke-width=${P} stroke-linejoin="round" stroke-linecap="round" opacity="0.85"></polyline>`)}`:Dt,U=!(!t.robot_image_on_map||!t.image),Y=2.6*p*((t.robot_size??100)/100),K=(w&&null!=w.a?w.a+e.rotation:0)+(t.robot_image_rotation??0),X=$?U?zt`<image href=${t.image} x=${($.x-Y/2).toFixed(2)} y=${($.y-Y/2).toFixed(2)} width=${Y.toFixed(2)} height=${Y.toFixed(2)} preserveAspectRatio="xMidYMid meet" transform=${"rotate("+K+" "+$.x.toFixed(2)+" "+$.y.toFixed(2)+")"}></image>`:zt`${A?zt`<line x1=${$.x.toFixed(2)} y1=${$.y.toFixed(2)} x2=${A.x.toFixed(2)} y2=${A.y.toFixed(2)} stroke="#ffffff" stroke-width=${(.3*p).toFixed(2)} stroke-linecap="round"></line>`:Dt}<circle cx=${$.x.toFixed(2)} cy=${$.y.toFixed(2)} r=${p.toFixed(2)} fill=${d} stroke="#ffffff" stroke-width=${(.18*p).toFixed(2)}></circle>`:Dt,J=$&&this._hasError(t),Q="avc-ha-err-blur-"+t.entity.replace(/[^a-zA-Z0-9]/g,"-"),tt=J?zt`<defs><filter id=${Q} x="-150%" y="-150%" width="400%" height="400%">
              <feGaussianBlur stdDeviation=${(.5*p).toFixed(2)}></feGaussianBlur>
            </filter></defs>
            <circle class="avc-err-halo" cx=${$.x.toFixed(2)} cy=${$.y.toFixed(2)} r=${(2.2*p).toFixed(2)}
              fill="#ff3b30" filter=${"url(#"+Q+")"}></circle>`:Dt,et=zt`${O}${B}${q}`,it=zt`${tt}${X}`,ot="paths"===l?et:"marker"===l?it:zt`${et}${it}`;return Et`<svg class="map-vector" viewBox=${"0 0 100 "+(100/s).toFixed(3)} preserveAspectRatio="none" style=${Ut({left:"0",top:"0",width:"100%",height:"100%"})}>${ot}</svg>`}_onLayerDown(t){this._layerHeld=!1,this._layerHoldTimer=window.setTimeout(()=>{this._layerHeld=!0,this._layerMenu=this._layerMenu===t?null:t},380)}_onLayerUp(){null!==this._layerHoldTimer&&(window.clearTimeout(this._layerHoldTimer),this._layerHoldTimer=null)}_onLayerClick(t){if(this._layerHeld)return void(this._layerHeld=!1);const e=this._layersEff(),o={...e,[t]:!e[t]},s=this._selSensor();s&&this.hass.states[s]?.attributes?.view_layers?this._call("anyvac","set_layers",o):this._layers=o,this._layerMenu=null}_renderLayerMenu(t,e){const o=this._mergedRoomDefs(t);return Et`
      <div class="layer-menu">
        <div class="layer-menu-head">
          <ha-icon icon=${"dry"===e?"mdi:broom":"mdi:water"}></ha-icon>
          <span>${"dry"===e?"Dry":"Wet"} \u00b7 last cleaned</span>
        </div>
        ${o.map(({r:o,v:s})=>{const l=this._intRoomRec(s,o),h=this._ageDaysFromIso(l?.[e]),d=this._isRoomSelectedAny(o.key,t);return Et`
            <button class="layer-menu-row ${d?"on":""}" @click=${()=>this._toggleRoomAcross(o.key,t)}>
              <ha-icon icon=${o.icon??"mdi:square"}></ha-icon>
              <span class="lm-name">${o.name??o.key}</span>
              ${this._renderProgChip(this._roomProgForType(o,t,e))}
              <b style=${Ut({color:this._colorForAgeDays(h)})}>${(t=>null===t?"—":t<1?"<1d":Math.round(t)+"d")(h)}</b>
            </button>
          `})}
      </div>
    `}_oldestAgeDays(t,e){let o=null;for(const s of t){if(!this._intAttrs(s))continue;const t=this._intAttrs(s)?.rooms_last_cleaned;if(t)for(const s of Object.values(t)){const t=this._ageDaysFromIso(s?.[e]);null!==t&&(null===o||t>o)&&(o=t)}}return o}_ageBadgeStr(t){return null===t?"—":t<1?"<1d":Math.round(t)+"d"}_renderLayerToggleCompact(t){const e=t.filter(t=>this._intAttrs(t));if(!e.length)return Dt;const o=this._layersEff();return Et`
      <button class="mtbtn ${o.dry?"on":""}" title="Dry layer visibility \u2014 tap to toggle"
        @click=${()=>this._onLayerClick("dry")}>
        <ha-icon icon="mdi:broom"></ha-icon><span>${this._ageBadgeStr(this._oldestAgeDays(e,"dry"))}</span>
      </button>
      <button class="mtbtn ${o.wet?"on":""}" title="Wet layer visibility \u2014 tap to toggle"
        @click=${()=>this._onLayerClick("wet")}>
        <ha-icon icon="mdi:water"></ha-icon><span>${this._ageBadgeStr(this._oldestAgeDays(e,"wet"))}</span>
      </button>
    `}_renderLayerToggles(t){const e=t.filter(t=>this._intAttrs(t));if(!e.length)return Dt;const oldest=t=>this._oldestAgeDays(e,t),badge=t=>this._ageBadgeStr(t),o=this._layersEff();return Et`
      <div class="layer-toggles">
        <button class="layer-btn ${o.dry?"on":""}" title="Dry \u2014 tap to toggle, hold for rooms"
          @pointerdown=${()=>this._onLayerDown("dry")} @pointerup=${()=>this._onLayerUp()} @pointerleave=${()=>this._onLayerUp()}
          @click=${()=>this._onLayerClick("dry")}>
          <ha-icon icon="mdi:broom"></ha-icon><span>${badge(oldest("dry"))}</span>
        </button>
        <button class="layer-btn ${o.wet?"on":""}" title="Wet \u2014 tap to toggle, hold for rooms"
          @pointerdown=${()=>this._onLayerDown("wet")} @pointerup=${()=>this._onLayerUp()} @pointerleave=${()=>this._onLayerUp()}
          @click=${()=>this._onLayerClick("wet")}>
          <ha-icon icon="mdi:water"></ha-icon><span>${badge(oldest("wet"))}</span>
        </button>
        ${this._layerMenu?this._renderLayerMenu(e,this._layerMenu):Dt}
      </div>
    `}_mergedRoomDefs(t){const e=t[0];if(this._config.rooms?.length&&e)return this._roomsFor(e).map(t=>({r:t,v:e}));const o=new Set,s=[];for(const e of t)for(const t of this._roomsFor(e))t.key&&!o.has(t.key)&&(o.add(t.key),s.push({r:t,v:e}));return s}_renderMergedRooms(t){const e=this._mergedRoomDefs(t),o=!e.some(({r:e})=>this._isRoomSelectedAny(e.key,t));return e.map(({r:e,v:s})=>this._renderRoomOverlay(e,s,{vacs:t,wholeHome:o}))}_renderRoomOutlines(t,e){const o=t.filter(({r:t})=>t.outline_pct&&t.outline_pct.length>=3);if(!o.length)return Dt;const s=zt`${o.map(({r:t})=>{const o=this._isRoomSelectedAny(t.key,e),s=t.outline_pct.map(t=>t.x.toFixed(2)+","+t.y.toFixed(2)).join(" ");return zt`<polygon points=${s}
        fill=${o?"rgba(255,255,255,0.12)":"rgba(255,255,255,0.05)"}
        stroke=${o?"#ffffff":"rgba(255,255,255,0.35)"}
        stroke-width="0.35" stroke-linejoin="round"></polygon>`})}`;return Et`<svg class="room-outline-layer" viewBox="0 0 100 100" preserveAspectRatio="none"
      style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;">${s}</svg>`}get _narrow(){const t=this._config.mobile_rotate;if("off"===t)return!1;if("always"===t||"on"===t)return!0;if(this._config.layout){const t="portrait"===this._profile?this._config.layout.portrait:this._config.layout.landscape,e=t?.crop?.mapOrientation;if("normal"===e)return!1;if("rotated"===e)return!0;const o=function shouldRotateMap(t,e,o){if(e<=4||o<=4||t<=0)return;const s=Math.min(e/t,o);return Math.min(e,o/t)>s}(this._mapAR,this._mapRegW,this._mapRegH);return void 0!==o?(this._lastRotate=o,o):this._lastRotate}return this._cardW>0&&this._cardW<500}get _flipEff(){if(null!==this._flipLive)return this._flipLive;if(!this._config.layout)return!1;const t="portrait"===this._profile?this._config.layout.portrait:this._config.layout.landscape;return!0===t?.crop?.flip}_toggleFlipLive(){this._flipLive=!this._flipEff,this._saveFlipLive()}get _stackTopology(){if("portrait"!==this._profile||!this._config.layout)return!1;const t=this._config.layout.portrait;if("split"===t?.topology)return!1;if("stack"===t?.topology)return!0;if(t?.columns?.length||t?.rows?.length||t?.place&&Object.keys(t.place).length)return!1;const e=this._mapAR>.1?this._mapAR:3.636,o=function shouldStackLayout(t,e,o,s={}){const{dockWidthFrac:l=.28,dockHeightPx:h=150,stackBias:d=1.5}=s;if(e<=4||o<=4||t<=0)return;const p=e*(1-l),m=Math.min(p/t,o),u=Math.max(o-h,0);return!(m>Math.min(e/t,u)*d)}(this._narrow?1/e:e,this._mapAvailW,this._mapAvailH);return void 0!==o?(this._lastStack=o,o):this._lastStack}_renderResponsive(t){if(!this._config.layout){if(!this._narrow)return t;const e=this._mapAR>.1?this._mapAR:3.636,o=this._cardW||this.clientWidth||360,s=1.4*("undefined"!=typeof window?window.innerHeight:800),l=o*e,h=l>s?s/l:1,d=Math.round(o*h),p=Math.round(l*h);return Et`
        <div class="avc-rot" style="position:relative;width:${d}px;height:${p}px;margin:0 auto;overflow:hidden;--map-rot:90deg">
          <div style="position:absolute;top:0;left:0;width:${p}px;height:${d}px;transform-origin:top left;transform:translateX(${d}px) rotate(90deg)">
            ${t}
          </div>
        </div>
      `}if(this._mapRegW<=4||this._mapRegH<=4)return t;const e=this._mapAR>.1?this._mapAR:3.636,o=this._mapRotationDeg(),s=90===o||270===o,l=s?1/e:e,h=this._config.layout[this._profile]?.crop,d="cover"===h?.fit,p=this._mapRegW,m=this._mapRegH;let u,_;d?(u=Math.max(p,m*l),_=Math.max(m,u/l)):(u=Math.min(p,m*l),_=Math.min(m,u/l)),u=Math.floor(u),_=Math.floor(_);const f=-(u-p)/2+(h?.offset_x??0)/100*((u-p)/2),b=-(_-m)/2+(h?.offset_y??0)/100*((_-m)/2);if(0!==o){s&&(this._lastPortraitFitW=u);let e;return e=90===o?"transform-origin:top left;transform:translateX("+u+"px) rotate(90deg)":180===o?"transform-origin:center;transform:rotate(180deg)":"transform-origin:top left;transform:translateY("+_+"px) rotate(270deg)",Et`
        <div class="avc-rot" style="position:relative;width:${p}px;height:${m}px;margin:0 auto;overflow:hidden;--map-rot:${o}deg">
          <div style="position:absolute;top:0;left:0;width:100%;height:100%;transform:translate(${f}px,${b}px)">
            <div style="position:absolute;top:0;left:0;width:${s?_:u}px;height:${s?u:_}px;${e}">
              ${t}
            </div>
          </div>
        </div>
      `}return Et`
      <div style="position:relative;width:${p}px;height:${m}px;margin:0 auto;overflow:hidden">
        <div style="position:absolute;top:0;left:0;width:${u}px;height:${_}px;transform:translate(${f}px,${b}px)">
          ${t}
        </div>
      </div>
    `}_renderMergedMap(){const t=this._shownOrdered().map(t=>this._config.vacuums[t]);if(!t.length)return Dt;const e=t.find(t=>t.image_base?.src)??t[0],o=this._config.image_base??e.image_base,s=!!o?.src,l=this._config.base_height??e.base_height,h="number"==typeof l&&l>0,d=h?"map-wrap--fixed":s?"map-wrap--image":"",p=Ut(h?{height:(l??0)+"px"}:{});return Et`
      <div class="map-wrap ${d}" style=${p}>
        ${s?Et`
          <img class="${"image-base-img"+(h?" image-base-img--fit":"")}" src=${o.src} alt="Floorplan" @load=${this._onFloorplanLoad}
            style=${Ut({transform:"translate("+(o?.offset_x??0)+"%,"+(o?.offset_y??0)+"%) rotate("+(o?.rotation??0)+"deg) scale("+(o?.scale??100)/100+")"})} />
        `:Dt}
        ${t.map((t,e)=>{const o=this._mapEntityFor(t),l=o?this._mapUrl(o):null;if(!l)return Dt;const h=this._effectiveSeat(t),d=s||e>0;return Et`<img class="map-img ${d?"map-img--overlay":""}" src=${l} alt="Vacuum map"
            data-entity=${t.entity}
            style=${Ut({left:50+h.offset_x+"%",top:50+h.offset_y+"%",width:h.scale+"%",transform:"translate(-50%,-50%) "+seatRotateScaleCss(h.rotation,h.scale,h.scaleY),opacity:t.hide_map?"0":String((t.overlay_opacity??(d?55:100))/100),mixBlendMode:t.overlay_blend??"normal"})} />`})}
        ${t.map(t=>{if(!this._intAttrs(t))return Dt;const e=this._homeFrameCropFor(t);if(e)return this._renderHomeFrameOverlay(t,e,"paths");const o=this._homeAnchorFitFor(t,this._wrapAspect(this._baseHeightFor(t)));return o?this._renderHomeAnchorOverlay(t,o.fit,o.dims,this._wrapAspect(this._baseHeightFor(t)),"paths"):this._renderIntegrationOverlay(t,this._effectiveSeat(t),"paths")})}
        ${t.map(t=>{if(!this._intAttrs(t))return Dt;const e=this._homeFrameCropFor(t);if(e)return this._renderHomeFrameOverlay(t,e,"marker");const o=this._homeAnchorFitFor(t,this._wrapAspect(this._baseHeightFor(t)));return o?this._renderHomeAnchorOverlay(t,o.fit,o.dims,this._wrapAspect(this._baseHeightFor(t)),"marker"):this._renderIntegrationOverlay(t,this._effectiveSeat(t),"marker")})}
        ${this._config.layout?Dt:this._renderLayerToggles(t)}
        ${this._renderRoomOutlines(this._mergedRoomDefs(t),t)}
        ${this._renderMergedRooms(t)}
        ${t.map(t=>"normal"!==this._mapMode&&this._isModeCandidate(t)||this._zoneRectShown&&this._hasZoneEditTarget(t)?Et`<div class="map-clickcatch" style="touch-action:none"
              @click=${e=>this._onMapClick(t,e)}
              @pointerdown=${e=>this._onZoneDown(t,e)}
              @pointermove=${e=>this._onZoneMove(t,e)}
              @pointerup=${e=>this._onZoneUp(t,e)}></div>`:Dt)}
        ${t.map((t,e)=>{const o=this._zoneRectFor(t,0===e);return o?Et`<div class="zone-rect" style=${Ut({left:Math.min(o.x0,o.x1)+"%",top:Math.min(o.y0,o.y1)+"%",width:Math.abs(o.x1-o.x0)+"%",height:Math.abs(o.y1-o.y0)+"%"})}>${this._renderZoneHandles()}</div>`:Dt})}
      </div>
    `}_renderMap(t){const e=t.base??(t.image_base?.src&&!t.map?.entity?"image":"map"),o=t.image_base,s=o?.src,l=this._mapEntityFor(t),h=l?this._mapUrl(l):null,d=("image"===e||"combined"===e)&&!!s,p=("map"===e||"combined"===e)&&!!h;if(!d&&!p)return Dt;const m=this._effectiveSeat(t),u="number"==typeof t.base_height&&t.base_height>0,_=u?"map-wrap--fixed":d?"map-wrap--image":"",f=Ut(u?{height:(t.base_height??0)+"px"}:{});return Et`
      <div class="map-wrap ${_}" style=${f}>
        ${d?Et`
          <img class="${"image-base-img"+(u?" image-base-img--fit":"")}" src=${s} alt="Floorplan" @load=${this._onFloorplanLoad}
            style=${Ut({transform:"translate("+(o?.offset_x??0)+"%,"+(o?.offset_y??0)+"%) rotate("+(o?.rotation??0)+"deg) scale("+(o?.scale??100)/100+")"})} />
        `:Dt}
        ${p?Et`
          <img class="map-img ${d?"map-img--overlay":""}" src=${h} alt="Vacuum map"
            data-entity=${t.entity}
            style=${Ut({left:50+m.offset_x+"%",top:50+m.offset_y+"%",width:m.scale+"%",transform:"translate(-50%,-50%) "+seatRotateScaleCss(m.rotation,m.scale,m.scaleY),...t.hide_map?{opacity:"0"}:d?{opacity:String((t.overlay_opacity??55)/100),mixBlendMode:t.overlay_blend??"normal"}:{}})} />
        `:Dt}
        ${p?this._renderIntegrationOverlay(t,m):Dt}
        ${this._config.layout?Dt:this._renderLayerToggles([t])}
        ${(()=>{const e=this._roomsFor(t),o=!e.some(e=>this._isRoomSelected(e,t));return e.map(e=>this._renderRoomOverlay(e,t,{wholeHome:o}))})()}
        ${"normal"!==this._mapMode&&this._isModeCandidate(t)||this._zoneRectShown&&this._hasZoneEditTarget(t)?Et`<div class="map-clickcatch" style="touch-action:none"
              @click=${e=>this._onMapClick(t,e)}
              @pointerdown=${e=>this._onZoneDown(t,e)}
              @pointermove=${e=>this._onZoneMove(t,e)}
              @pointerup=${e=>this._onZoneUp(t,e)}></div>`:Dt}
        ${(()=>{const e=this._zoneRectFor(t,!0);return e?Et`<div class="zone-rect" style=${Ut({left:Math.min(e.x0,e.x1)+"%",top:Math.min(e.y0,e.y1)+"%",width:Math.abs(e.x1-e.x0)+"%",height:Math.abs(e.y1-e.y0)+"%"})}>${this._renderZoneHandles()}</div>`:Dt})()}
      </div>
    `}_renderRoomAgeDots(t,e){const o=this._intRoomRec(e,t);if(o){const t=this._vacCleanType(e);if(!t.dry&&!t.wet)return Dt;const s=this._ageDaysFromIso(o.dry),l=this._ageDaysFromIso(o.wet);return Et`
        <span class="room-age-dots">
          ${t.dry?Et`<span class="room-age-dot" style=${Ut({background:this._colorForAgeDays(s)})}></span>`:Dt}
          ${t.wet?Et`<span class="room-age-dot" style=${Ut({background:this._colorForAgeDays(l)})}></span>`:Dt}
        </span>
      `}return t.last_clean_entity?Et`
      <span class="room-age-dots">
        <span class="room-age-dot" style=${Ut({background:this._colorForAgeDays(this._roomAgeDays(t))})}></span>
      </span>
    `:Dt}_onRoomPointerDown(t,e){return o=>{e||(o.preventDefault(),this._cancelHold(),this._holdId="room-"+t.key,this._holdTimer=setTimeout(()=>{this._holdTimer=null,this._holdId=null,this._inspectKey=this._inspectKey===t.key?null:t.key},Zt))}}_onRoomPointerUp(t,e,o,s){return()=>{if(!s)if(null!==this._holdTimer){if(this._cancelHold(),null!==this._inspectKey)return void(this._inspectKey=null);o?this._toggleRoomAcross(t.key,o):this._toggleRoom(t,e)}else this._holdId=null}}_renderRoomInspect(t,e,o,s){const l=this._intRoomRec(e,t),h=this._ageDaysFromIso(l?.dry),d=this._ageDaysFromIso(l?.wet),badge=t=>null===t?"—":t<1?"<1d":Math.round(t)+"d",p=o?this._planPreview?.dry.get(t.key):void 0,m=o?this._planPreview?.wet.get(t.key):void 0,u=this._pinCandidates(t.key,"dry").length>1,_=this._pinCandidates(t.key,"wet").length>1,pinTap=(e,o)=>("dry"===e?u:_)?s=>{s.stopPropagation(),this._cycleRoomPin(t.key,e,o)}:void 0;return Et`
      <div class="room-inspect" style=${Ut({left:(t.map_x??0)+"%",top:(t.map_y??0)+"%"})}
        @click=${t=>t.stopPropagation()}>
        <div class="room-inspect-inner">
          <div class="room-inspect-name">${t.name??t.key}</div>
          <div class="room-inspect-ages">
            <span class="dock-age"><ha-icon icon="mdi:broom"></ha-icon><b style=${Ut({color:this._colorForAgeDays(h)})}>${badge(h)}</b></span>
            <span class="dock-age"><ha-icon icon="mdi:water"></ha-icon><b style=${Ut({color:this._colorForAgeDays(d)})}>${badge(d)}</b></span>
          </div>
          ${p||m?Et`
            <div class="dock-avatars">
              ${p?this._vacChip(p,pinTap("dry",p)):Dt}
              ${m?this._vacChip(m,pinTap("wet",m)):Dt}
            </div>`:Dt}
        </div>
      </div>
    `}_renderRoomOverlay(t,e,o){const s=o?.vacs?this._isRoomSelectedAny(t.key,o.vacs):this._isRoomSelected(t,e),l=!s&&!!o?.wholeHome,h="rgba(255,255,255,0.22)",d=t.icon_anchor??"c",p="normal"!==this._mapMode,m="#ffffff",u="linear-gradient(135deg, #ffffff 0%, #ffffff 46%, #8ecbff 50%, #ffffff 54%, #ffffff 100%) 1";if(void 0!==t.map_w&&void 0!==t.map_h){const _={tl:["flex-start","flex-start"],t:["center","flex-start"],tr:["flex-end","flex-start"],l:["flex-start","center"],c:["center","center"],r:["flex-end","center"],bl:["flex-start","flex-end"],b:["center","flex-end"],br:["flex-end","flex-end"]},[f,b]=_[d]??["center","center"],v=(s?this._config.room_border_selected??4:l?Math.max(3,this._config.room_border_normal??2):this._config.room_border_normal??2)+"px",w=s?m+"E0":l?"rgba(255,255,255,0.75)":h,$=s?m+"22":l?"rgba(255,255,255,0.16)":"rgba(0,0,0,0.06)",A=s?"0 0 18px rgba(255,255,255,0.7)":l?"0 0 10px rgba(255,255,255,0.4)":"none",C=s?this._planPreview?.dry.get(t.key):void 0,P=s?this._planPreview?.wet.get(t.key):void 0,F="room-"+t.key;return Et`
        <button
          class="room-overlay ${p?"room-overlay--locked":""} ${this._holdId===F?"room-overlay--holding":""}"
          ?disabled=${p}
          style=${Ut({left:(t.map_x??0)+"%",top:(t.map_y??0)+"%",width:t.map_w+"%",height:t.map_h+"%",border:v+" solid "+w,borderImage:s?u:"none",background:$,boxShadow:A,justifyContent:f,alignItems:b})}
          @pointerdown=${this._onRoomPointerDown(t,p)}
          @pointerup=${this._onRoomPointerUp(t,e,o?.vacs,p)}
          @pointerleave=${this._holdEnd}
          @pointercancel=${this._holdEnd}
          title=${p?"Room selection is off while placing a pin/zone":t.name} aria-label=${t.name}
          aria-pressed=${s?"true":"false"}
        >
          <div class="hold-ring"></div>
          ${!this._config.room_icon_hidden&&"none"!==d&&t.icon?Et`
            <ha-icon icon=${t.icon}
              style=${Ut({color:s?"white":"rgba(255,255,255,0.55)","--mdc-icon-size":"16px"})}>
            </ha-icon>
          `:Dt}
          ${this._renderRoomAgeDots(t,e)}
          ${C||P?(()=>{const t=this._mapRotationDeg(),e=90===t?{top:"0%",left:"100%"}:180===t?{top:"0%",left:"0%"}:270===t?{top:"100%",left:"0%"}:{top:"100%",left:"100%"},o=t*Math.PI/180,s=(-2*(Math.cos(o)+Math.sin(o))).toFixed(2),l=(-2*(Math.cos(o)-Math.sin(o))).toFixed(2);return Et`
                <span class="room-overlay-assign-anchor" style=${Ut(e)}>
                  <span class="room-overlay-assign"
                    style=${Ut({transform:`translate(${s}px, ${l}px) rotate(calc(-1 * var(--map-rot)))`})}>
                    ${C?this._vacChip(C):Dt}
                    ${P?this._vacChip(P):Dt}
                  </span>
                </span>
              `})():Dt}
          ${this._renderRoomGauge(o?.vacs??[e],t)}
        </button>
        ${this._inspectKey===t.key?this._renderRoomInspect(t,e,s,o):Dt}
      `}const _=s?m+"A8":l?"rgba(255,255,255,0.32)":"rgba(0,0,0,0.55)",f=s?"0 0 12px rgba(255,255,255,0.8)":l?"0 0 8px rgba(255,255,255,0.45)":"none",b="room-"+t.key;return Et`
      <button
        class="room-btn ${p?"room-overlay--locked":""} ${this._holdId===b?"room-overlay--holding":""}"
        ?disabled=${p}
        style=${Ut({left:(t.map_x??0)+"%",top:(t.map_y??0)+"%",background:_,border:"4px solid "+(s?m:l?"rgba(255,255,255,0.7)":h),borderImage:s?u:"none",boxShadow:f})}
        @pointerdown=${this._onRoomPointerDown(t,p)}
        @pointerup=${this._onRoomPointerUp(t,e,o?.vacs,p)}
        @pointerleave=${this._holdEnd}
        @pointercancel=${this._holdEnd}
        title=${p?"Room selection is off while placing a pin/zone":t.name} aria-label=${t.name}
        aria-pressed=${s?"true":"false"}
      >
        <div class="hold-ring"></div>
        ${this._config.room_icon_hidden?Dt:Et`
          <ha-icon icon=${t.icon||"mdi:square"}
            style=${Ut({color:s?"white":"rgba(255,255,255,0.5)"})}>
          </ha-icon>
        `}
        ${this._renderRoomAgeDots(t,e)}
        ${this._renderRoomGauge(o?.vacs??[e],t)}
      </button>
      ${this._inspectKey===t.key?this._renderRoomInspect(t,e,s,o):Dt}
    `}_renderStatusRow(t){const[e,o]=this._statusInfo(t),s=this._battery(t),l=this._lastCleanStr(t),h=t.name??t.entity.split(".")[1]??t.entity,d=this._progress(t),p=this._ent(t,"current_room"),m=p?this.hass.states[p]?.state:null,u=m&&"unknown"!==m&&"unavailable"!==m?m:null,_=this._ent(t,"error"),f=_?this.hass.states[_]?.state:null,b=this._hasError(t);return Et`
      ${b?Et`
        <div class="error-row">
          <ha-icon icon="mdi:alert-circle" style="color:rgb(var(--avc-err-rgb))"></ha-icon>
          <span style="color:rgb(var(--avc-err-rgb));font-size:11px;font-weight:600">${f}</span>
        </div>
      `:Dt}
      <div class="status-line1">
        <span class="model-label">${h}</span>
        <span class="status-label" style=${Ut({color:o})}>
          ${e}${null!==d?Et` &middot; ${d}&thinsp;%`:Dt}
        </span>
      </div>
      <div class="status-line2">
        ${u?Et`
          <span class="current-room">
            <ha-icon icon="mdi:map-marker" style="--mdc-icon-size:12px;color:rgba(var(--avc-ink-rgb),0.4)"></ha-icon>
            ${u}
          </span>
        `:Et`<span></span>`}
        <span class="status-meta">
          ${null!==s?Et`
            <span class="battery">
              <ha-icon icon=${this._batIcon(s)} style=${Ut({color:this._batColor(s)})}></ha-icon>
              <span style=${Ut({color:this._batColor(s)})}>${s}&thinsp;%</span>
            </span>
          `:Dt}
          <span class="last-clean">
            <ha-icon icon="mdi:history"></ha-icon>
            <span>${l}</span>
          </span>
        </span>
      </div>
    `}_renderProgress(t){const e=this._progress(t);if(null===e)return Dt;const o=this._color(t);return Et`
      <div class="progress">
        <div class="progress-track">
          <div class="progress-fill" style=${Ut({width:e+"%",background:o})}></div>
        </div>
        <span class="progress-label" style=${Ut({color:o})}>${e}&thinsp;%</span>
      </div>
    `}_renderActions(t,e){const o=this._color(t),s=this._pinPending?.[t.entity],l=this._zonePending?.[t.entity];if(s||l){const s="modeaction-"+e,h=l?"Clean zone":"Send here",d=l?"mdi:select-drag":"mdi:map-marker-radius",action=()=>{l?this._confirmZone(t):this._confirmPin(t)};return Et`
        <div class="actions">
          <button
            class="action-btn ${this._holdId===s?"action-btn--holding":""}"
            style=${Ut({background:this._colorBg(t),border:"1px solid "+o+"80"})}
            @pointerdown=${this._holdStart(s,action)}
            @pointermove=${this._holdMove}
            @pointerup=${this._holdEnd}
            @pointerleave=${this._holdEnd}
            @pointercancel=${this._holdEnd}
          >
            <div class="hold-ring"></div>
            <ha-icon icon=${d} style=${Ut({color:o})}></ha-icon>
            <span>${h}</span>
          </button>
        </div>
      `}const h=this._isCleaning(t),d=this._isPaused(t),p=this._hasSelectedRooms(t),m=this._totalCleanMins(t),u=this._timeStr(m);if(d){const s="resume-"+e;return Et`
        <div class="actions">
          <button
            class="action-btn ${this._holdId===s?"action-btn--holding":""}"
            style=${Ut({background:this._colorBg(t),border:"1px solid "+o+"80"})}
            @pointerdown=${this._holdStart(s,()=>this._resume(t))}
            @pointermove=${this._holdMove}
            @pointerup=${this._holdEnd}
            @pointerleave=${this._holdEnd}
            @pointercancel=${this._holdEnd}
          >
            <div class="hold-ring"></div>
            <ha-icon icon="mdi:play" style=${Ut({color:o})}></ha-icon>
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
      `}if(h){const o="pause-"+e;return Et`
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
      `}const _="start-"+e,f=p?this._colorBg(t):"var(--avc-disabled)",b=p?"1px solid "+o+"80":"1px solid rgba(var(--avc-ink-rgb),0.1)",v=p?o:"rgba(var(--avc-ink-rgb),0.2)",w=p?"rgb(var(--avc-ink-rgb))":"rgba(var(--avc-ink-rgb),0.25)",$=this._roomsFor(t),A=$.filter(e=>this._isRoomSelected(e,t)).length,C=[$.length>0?`${A}/${$.length} rooms`:"",u].filter(Boolean).join(" · ");return Et`
      <div class="actions actions--idle">
        ${this._renderPresetChips(t)}
        <button
          class="action-btn ${p&&this._holdId===_?"action-btn--holding":""}"
          style=${Ut({background:f,border:b,flex:"1"})}
          ?disabled=${!p}
          @pointerdown=${p?this._holdStart(_,()=>this._startClean(t)):Dt}
          @pointermove=${this._holdMove}
          @pointerup=${this._holdEnd}
          @pointerleave=${this._holdEnd}
          @pointercancel=${this._holdEnd}
        >
          <div class="hold-ring"></div>
          <ha-icon icon="mdi:play" style=${Ut({color:v})}></ha-icon>
          <div class="start-body">
            <span style=${Ut({color:w})}>${p?"START":"Select rooms"}</span>
            ${C?Et`<small style="color:rgba(var(--avc-ink-rgb),0.4)">${C}</small>`:Dt}
          </div>
        </button>
      </div>
    `}_renderStatusCard(t,e){const o=this._isCleaning(t),s=this._color(t),l=t.name??t.entity.split(".")[1]??t.entity,h=o?"drop-shadow(0 0 8px "+s+"D8)":"drop-shadow(0 2px 5px "+s+"33)";return Et`
      <div class="status-card" style=${Ut({border:o?"2px solid "+s:"1px solid var(--avc-panel-line)",boxShadow:o?"0 0 22px "+s+"40":"var(--avc-elev-1)"})}>
        <div class="status-header">
          <div class="status-avatar" style=${Ut({borderColor:s})}
            @click=${()=>this._fireMoreInfo(t.entity)}
            title="Open ${l} info — native controls, in case this card can't do something">
            ${t.image?Et`
              <img src=${t.image} alt=${l}
                style=${Ut({opacity:o?"0.9":"0.6",filter:h})}
              />
            `:Et`
              <ha-icon icon="mdi:robot-vacuum"
                style=${Ut({color:s,fontSize:"22px",opacity:o?"0.9":"0.5"})}
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
    `}_renderMiniGauge(t,e,o,s){return Et`
      <span class="mini-gauge-wrap">
        <ha-icon class="mini-gauge-ico" icon=${o} style=${Ut({color:e})}></ha-icon>
        <span class="mini-gauge" style=${Ut({background:`conic-gradient(${e} ${3.6*t}deg, rgba(var(--avc-ink-rgb),0.12) 0)`})}>
          <span>${t}${s?"~":""}</span>
        </span>
      </span>`}_currentRoomName(t){return this._intAttrs(t)?.vacuum_room_name}_mmss(t){const e=Math.max(0,Math.round(t));return`${Math.floor(e/60)}:${String(e%60).padStart(2,"0")}`}_renderDebugProgress(t){if(!this._config.debug_room_progress)return Dt;const e=this._roomsFor(t).map(e=>({r:e,p:this._roomProgress(t,e)})).filter(t=>t.p&&(null!=t.p.dry_pct||null!=t.p.wet_pct||null!=t.p.elapsed_s));if(!e.length)return Dt;const o=this._color(t),s=this._intEntity(t),l=s?Date.parse(this.hass.states[s]?.last_updated??""):NaN,h=this._currentRoomName(t),d=this._isCleaning(t),p=this._isPaused(t),m=!d&&!p||isNaN(l)?0:Math.max(0,(this._now-l)/1e3);return Et`
      <div class="dbg-prog">
        ${e.map(({r:t,p:e})=>{const s=(t.key===h||t.name===h)&&(d||p),l=(e.elapsed_s??0)+(s?m:0);let u=e.est_s??null;s&&p&&null!=u&&(u+=m);const _=null!=u?`${this._mmss(l)}/${this._mmss(u)}`:this._mmss(l);return Et`
            <span class="dbg-prog-item" title=${`dry ${e.dry_pct??"—"}% · wet ${e.wet_pct??"—"}%`}>
              ${t.icon?Et`<ha-icon icon=${t.icon}></ha-icon>`:Dt}
              <span class="dbg-prog-name">${t.name??t.key}</span>
              ${null!=e.dry_pct?this._renderMiniGauge(e.dry_pct,o,"mdi:broom",!!e.dry_calibrating):Dt}
              ${null!=e.wet_pct?this._renderMiniGauge(e.wet_pct,"rgb(var(--avc-info-rgb))","mdi:water",!!e.wet_calibrating):Dt}
              ${null!=e.elapsed_s?Et`<small>${_}</small>`:Dt}
            </span>
          `})}
      </div>
    `}_shownOrdered(){return[...this._shownSet].filter(t=>t<this._config.vacuums.length).sort((t,e)=>t-e)}_gridShown(){const t=this._shownOrdered();return"portrait"===this._profile&&"merged"!==this._config.map_mode&&t.length>1?t.slice(0,1):t}_regionTemplate(t,e){const o=this._gridShown(),s="merged"===this._config.map_mode,vacsOf=t=>t.map(t=>this._config.vacuums[t]);switch(t){case"badges":return Et`<div class="badges-row badges-row--grid">
          ${"landscape"===this._profile?Dt:this._config.vacuums.map((t,e)=>this._renderBadge(t,e))}
          ${(this._config.global_actions??[]).map((t,e)=>this._renderGlobalBadge(t,e))}
        </div>`;case"autobar":return this._renderAutoBar();case"plan":return this._renderPlanPreview();case"picker":return this._renderVacuumPicker();case"map":return s?this._renderResponsive(this._renderMergedMap()):Et`${o.map(t=>this._renderResponsive(this._renderMap(this._config.vacuums[t])))}`;case"tools":return this._renderMetaBar(vacsOf(o));case"dock":return this._renderDock(!("start"in e.place),"landscape"===this._profile&&!("picker"in e.place));case"start":return this._renderStartBar();case"status":return Et`${o.map(t=>this._renderStatusCard(this._config.vacuums[t],t))}`;default:return null}}_rootClasses(){const t=this._config.theme??oe,e=[];return"legacy"!==t&&e.push("avc-theme","avc-theme--"+t),this._config.reduce_motion&&e.push("avc-still"),this._isCalm()&&e.push("avc-calm"),e.join(" ")}_rootVars(){const t=this._config.accent;if(!t)return{};const e=function hexToRgbChannel(t){const e=/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(t.trim());if(!e)return null;let o=e[1];return 3===o.length&&(o=o.split("").map(t=>t+t).join("")),[0,2,4].map(t=>parseInt(o.slice(t,t+2),16)).join(", ")}(t);return e?{"--avc-accent-rgb":e}:{}}_isCalm(){if(!1===this._config.calm_state)return!1;if("normal"!==this._mapMode)return!1;if(this._dockSheetOpen||this._modeSheetOpen)return!1;const t=this._config.vacuums;return!t.some(t=>this._isCleaning(t)||this._hasError(t))&&!this._allRoomKeys().some(e=>this._isRoomSelectedAny(e,t))}_renderGrid(t){const e="portrait"===this._profile&&this._stackTopology,o=e?de:function resolveProfile(t,e){const o=t[e]??{},s=pe[e];return{columns:o.columns?.length?o.columns:s.columns,rows:o.rows?.length?o.rows:s.rows,place:o.place&&Object.keys(o.place).length?o.place:s.place}}(t,this._profile),s=this._schemaWarning();return Et`
      <ha-card class=${this._rootClasses()} style=${Ut({padding:"0",display:"block",...this._rootVars()})}>
        ${this.editMode?Et`<div class="version-chip">
          <div>v${Xt} · ${Math.round(this._cardW)}w · ${this._profile}</div>
          ${this._config.debug?Et`<div>${e?"stack":"split"} · box:${Math.round(this._mapAvailW)}x${Math.round(this._mapAvailH)}</div>`:Dt}
        </div>`:Dt}
        <div class="avc-grid avc-grid--${this._profile}" style=${Ut(function gridRootStyles(t,e){return{display:"grid",width:"100%",height:resolveHeightCss(t),alignContent:"start",gridTemplateColumns:trackList(e.columns),gridTemplateRows:trackList(e.rows),gap:t.gap??"6px",boxSizing:"border-box"}}(t,o))}>
          ${s?Et`<div class="avc-schemawarn">
            <ha-icon icon="mdi:alert" style="--mdc-icon-size:18px"></ha-icon><span>${s}</span>
          </div>`:Dt}
          ${Object.entries(o.place).map(([t,e])=>{const s=this._regionTemplate(t,o);return null==s||s===Dt?Dt:Et`<div class="avc-region avc-region--${t}" style=${Ut(function regionStyles(t){const e={gridRow:String(t.row??"auto"),gridColumn:String(t.col??"1"),overflow:t.overflow??"hidden",position:"relative",minWidth:"0",minHeight:"0"};return t.align&&"stretch"!==t.align&&(e.alignSelf=t.align),e}(e))}>${s}</div>`})}
        </div>
      </ha-card>
    `}render(){if(!this._config||!this.hass)return Dt;if(this._config.layout)return this._renderGrid(this._config.layout);const t=this._schemaWarning();return Et`
      <ha-card class=${this._rootClasses()} style=${Ut(this._rootVars())}>
        ${this.editMode?Et`<div class="version-chip">v${Xt} · ${Math.round(this._cardW)}w</div>`:Dt}
        ${t?Et`<div style="margin:0 4px;padding:8px 12px;border-radius:12px;border:1px solid rgba(var(--avc-warn-rgb),0.55);background:rgba(var(--avc-warn-rgb),0.12);color:rgb(var(--avc-warn-rgb));font-size:12px;display:flex;align-items:center;gap:8px">
          <ha-icon icon="mdi:alert" style="--mdc-icon-size:18px"></ha-icon><span>${t}</span>
        </div>`:Dt}
        <div class="badges-row">
          ${this._config.vacuums.map((t,e)=>this._renderBadge(t,e))}
          ${(this._config.global_actions??[]).map((t,e)=>this._renderGlobalBadge(t,e))}
        </div>
        ${this._renderAutoBar()}
        ${this._renderPlanPreview()}
        ${"merged"===this._config.map_mode?Et`
              ${this._renderResponsive(this._renderMergedMap())}
              ${this._shownOrdered().map(t=>Et`
                ${this._renderMapTools(this._config.vacuums[t])}
                ${this._renderStatusCard(this._config.vacuums[t],t)}
              `)}
            `:this._shownOrdered().map(t=>Et`
                ${this._renderResponsive(this._renderMap(this._config.vacuums[t]))}
                ${this._renderMapTools(this._config.vacuums[t])}
                ${this._renderStatusCard(this._config.vacuums[t],t)}
              `)}
      </ha-card>
    `}};ge.styles=i$6`
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
      border-color: rgba(var(--avc-accent-rgb), 0.5);
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
     * Rendered inside the document.body portal (align-overlay.ts), NOT
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
    .align-handle--side { width: 20px; height: 20px; margin: -10px 0 0 -10px; opacity: 0.85; }
    .align-handle--n, .align-handle--s { cursor: ns-resize; }
    .align-handle--w, .align-handle--e { cursor: ew-resize; }
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
      display: flex; align-items: baseline; gap: 3px;
    }
    .align-field-row label span { font-size: 10.5px; font-weight: 500; color: rgba(var(--avc-ink-rgb), 0.5); }
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
  `,__decorate([n$1({attribute:!1})],ge.prototype,"hass",void 0),__decorate([n$1({attribute:!1})],ge.prototype,"editMode",void 0),__decorate([r()],ge.prototype,"_config",void 0),__decorate([r()],ge.prototype,"_shownSet",void 0),__decorate([r()],ge.prototype,"_holdId",void 0),__decorate([r()],ge.prototype,"_mapMode",void 0),__decorate([r()],ge.prototype,"_inspectKey",void 0),__decorate([r()],ge.prototype,"_dockSheetOpen",void 0),__decorate([r()],ge.prototype,"_dockSheetIdx",void 0),__decorate([r()],ge.prototype,"_modeSheetOpen",void 0),__decorate([r()],ge.prototype,"_careResetPending",void 0),__decorate([r()],ge.prototype,"_modeEntity",void 0),__decorate([r()],ge.prototype,"_dbg",void 0),__decorate([r()],ge.prototype,"_zoneDrag",void 0),__decorate([r()],ge.prototype,"_zoneRectShown",void 0),__decorate([r()],ge.prototype,"_zonePending",void 0),__decorate([r()],ge.prototype,"_zoneEdit",void 0),__decorate([r()],ge.prototype,"_pinPending",void 0),__decorate([r()],ge.prototype,"_layers",void 0),__decorate([r()],ge.prototype,"_layerMenu",void 0),__decorate([r()],ge.prototype,"_localRoomSel",void 0),__decorate([r()],ge.prototype,"_activePresets",void 0),__decorate([r()],ge.prototype,"_planMode",void 0),__decorate([r()],ge.prototype,"_activeGlobalPreset",void 0),__decorate([r()],ge.prototype,"_cardW",void 0),__decorate([r()],ge.prototype,"_mapAR",void 0),__decorate([r()],ge.prototype,"_alignSession",void 0),__decorate([r()],ge.prototype,"_alignView",void 0),__decorate([r()],ge.prototype,"_alignCancelConfirm",void 0),__decorate([r()],ge.prototype,"_alignCopiedFlash",void 0),__decorate([r()],ge.prototype,"_profile",void 0),__decorate([r()],ge.prototype,"_mapRegW",void 0),__decorate([r()],ge.prototype,"_mapRegH",void 0),__decorate([r()],ge.prototype,"_mapAvailW",void 0),__decorate([r()],ge.prototype,"_mapAvailH",void 0),__decorate([r()],ge.prototype,"_flipLive",void 0),__decorate([r()],ge.prototype,"_now",void 0),__decorate([r()],ge.prototype,"_planPreview",void 0),ge=__decorate([t$1(Yt)],ge);const _e=(me=window).customCards??(me.customCards=[]);_e.some(t=>t.type===Yt)||_e.push({type:Yt,name:"AnyVac Card",description:"Feature-rich card for Roborock vacuums — map, room selection, multi-vacuum tabs, global actions.",preview:!1,documentationURL:"https://github.com/Michailjovic/anyvac-card"});const round1=t=>Math.round(10*t)/10,clampPct=t=>Math.min(100,Math.max(0,t)),clampSize=t=>Math.min(100,Math.max(2,t)),fe={nw:{sx:-1,sy:-1},ne:{sx:1,sy:-1},sw:{sx:-1,sy:1},se:{sx:1,sy:1}};const be={entity:"",name:"",color:"green",rooms:[],clean_action:{type:"native"}},ve={key:"",name:"",icon:"mdi:square",map_x:50,map_y:50},ye=["mdi:numeric-1-circle","mdi:numeric-2-circle","mdi:numeric-3-circle","mdi:numeric-4-circle","mdi:numeric-5-circle","mdi:numeric-6-circle","mdi:numeric-7-circle","mdi:numeric-8-circle","mdi:numeric-9-circle","mdi:numeric-9-plus-circle"];function _roomIconFor(t){return ye[Math.min(t,ye.length-1)]}const xe={entity:"",rotation:0,scale:100,offset_x:0,offset_y:0},we={name:"Whole flat",color:"orange",watch_entities:[],action:{type:"script",entity_id:""}},$e=[{days:2,color:"#2ecc71"},{days:5,color:"#faad14"},{days:10,color:"#ff9800"}];let ke=class AnyVacCardEditor extends Bt{constructor(){super(...arguments),this._tab="vacuums",this._dragRoom=null,this._dragSeq=null,this._openVac=new Set,this._openSensors=new Set,this._openPresets=new Set,this._openAction=new Set,this._openGlobal=new Set,this._openRoom=new Map,this._mapVac=0,this._mapRoom=null,this._hvSwap=!1,this._pvAR=0,this._pvNat=null,this._refMapUrl="",this._refMapVac=-1,this._floorplanSnapshotBusy=!1,this._floorplanSnapshotError="",this._homeFrameSnapshotBusy=!1,this._homeFrameSnapshotError="",this._guideExportBusy=!1,this._guideExportError="",this._guideExportResult=null,this._placeRoomsResult=null,this._calib=null,this._refNat=null,this._calibResult=null,this._calibError="",this._homeCalib=null,this._homeCalibSnapshotUrl="",this._homeCalibCrop=null,this._homeCalibFrameId="",this._homeCalibBusy=!1,this._homeCalibError="",this._homeCalibResult=null,this._fiducialKnown=null,this._fiducialSnapshotBusy=!1,this._fiducialSnapshotError="",this._fiducialDetectBusy=!1,this._fiducialDetectError="",this._fiducialDetectResult=null,this._rectDrag=null,this._initialized=!1}setConfig(t){this._config=t,this._initialized||(this._initialized=!0,this._openVac=new Set((t.vacuums??[]).map((t,e)=>e)))}updated(t){if(t.has("hass")&&this.hass){const t=this.shadowRoot?.getElementById("ha-entities");t&&!t.options.length&&(t.innerHTML=Object.keys(this.hass.states).sort().map(t=>'<option value="'+t+'">').join(""))}"maps"===this._tab&&(t.has("_tab")||t.has("_mapVac"))&&this._snapshotRefMap(),(t.has("_tab")||t.has("_mapVac"))&&this._calib&&(this._calib=null),t.has("_tab")&&this._homeCalib&&(this._homeCalib=null),t.has("_tab")&&this._fiducialKnown&&(this._fiducialKnown=null)}_snapshotRefMap(){const t=this._config.vacuums;if(!t.length)return this._refMapUrl="",void(this._refMapVac=-1);const e=Math.min(this._mapVac,t.length-1),o=this._mapEntityFor(t[e]);this._refMapUrl=o?this.hass.states[o]?.attributes.entity_picture??"":"",this._refMapVac=e}async _snapshotFloorplan(t){const e=this._mapEntityFor(t);if(e){this._floorplanSnapshotBusy=!0,this._floorplanSnapshotError="";try{const o=await this.hass.callService("anyvac","snapshot_map_as_floorplan",{image_entity:e,name:t.name||t.entity},void 0,!1,!0),s=o?.response?.path;if(!s)throw new Error("no path in service response");const l=o?.response?.crop;if(this._setEditedImageBase(l?{src:s,crop_box:{entity:t.entity,...l}}:{src:s}),this._mergedEdit){const t=this._config.vacuums.map(t=>({...t,hide_map:!0}));this._setConfig({vacuums:t})}else{const e=this._config.vacuums.findIndex(e=>e.entity===t.entity);e>=0&&this._setVacuum(e,{hide_map:!0})}if(l){const e=this._config.vacuums.findIndex(e=>e.entity===t.entity);e>=0&&this._placeOwnRooms(e,l)}}catch(t){this._floorplanSnapshotError="Couldn't snapshot this vacuum's map — make sure the anyvac integration is updated to at least 0.88.0, then try again.",console.error("[anyvac-card] snapshot_map_as_floorplan failed:",t)}finally{this._floorplanSnapshotBusy=!1}}}async _snapshotHomeFrame(){this._homeFrameSnapshotBusy=!0,this._homeFrameSnapshotError="";try{const t=await this.hass.callService("anyvac","snapshot_map_as_floorplan",{frame:"home",name:"home_frame"},void 0,!1,!0),e=t?.response?.path,o=t?.response?.frame_id,s=t?.response?.crop;if(!e||!o||!s)throw new Error("incomplete response — integration too old?");this._setEditedImageBase({src:e,crop_box:{frame_id:o,...s}});const l=this._config.vacuums.map(t=>({...t,hide_map:!0}));this._setConfig({vacuums:l})}catch(t){this._homeFrameSnapshotError="Couldn't snapshot the home frame — make sure at least two vacuums have a home-frame registration (integration ≥ 1.8.0, check the 'registration' sensor attribute), then try again.",console.error("[anyvac-card] snapshot_map_as_floorplan (frame: home) failed:",t)}finally{this._homeFrameSnapshotBusy=!1}}async _snapshotHomeFrameWithFiducials(){this._fiducialSnapshotBusy=!0,this._fiducialSnapshotError="",this._fiducialDetectResult=null;try{const t=await this.hass.callService("anyvac","snapshot_map_as_floorplan",{frame:"home",name:"home_frame_fiducial",fiducials:!0},void 0,!1,!0),e=t?.response?.path,o=t?.response?.frame_id,s=t?.response?.fiducials;if(!e||!o||!s?.length)throw new Error("incomplete response — integration too old?");this._fiducialKnown={frameId:o,markers:s},this._setEditedImageBase({src:e})}catch(t){this._fiducialSnapshotError="Couldn't snapshot the home frame with markers — requires anyvac integration ≥ 1.9.0 with at least one registered vacuum.",console.error("[anyvac-card] snapshot_map_as_floorplan (fiducials) failed:",t)}finally{this._fiducialSnapshotBusy=!1}}async _detectFiducials(){const t=this._fiducialKnown,e=this._config.image_base?.src;if(t&&e){this._fiducialDetectBusy=!0,this._fiducialDetectError="",this._fiducialDetectResult=null;try{const o=await this.hass.callService("anyvac","detect_floorplan_fiducials",{path:e,fiducials:t.markers},void 0,!1,!0),s=o?.response?.home_anchors;if(!s?.length)throw new Error("no markers detected");this._setEditedImageBase({home_anchors:s,home_anchors_frame_id:t.frameId});const l=this._config.vacuums.map(t=>({...t,hide_map:!0}));this._setConfig({vacuums:l}),this._fiducialDetectResult={found:o?.response?.found??s.length,missing:o?.response?.missing??[]}}catch(t){this._fiducialDetectError="Couldn't detect markers — make sure the file above still has its alpha channel (stayed PNG, wasn't flattened/re-exported as JPEG) and at least 2 of the 4 corners survived the crop.",console.error("[anyvac-card] detect_floorplan_fiducials failed:",t)}finally{this._fiducialDetectBusy=!1}}}async _exportMapGuide(t){const e=this._mapEntityFor(t);if(!e)return;this._guideExportBusy=!0,this._guideExportError="",this._guideExportResult=null;const o=this._currentImageBase()?.crop_box,s=o&&"entity"in o&&o.entity===t.entity?{x0:o.x0,y0:o.y0,x1:o.x1,y1:o.y1}:void 0;try{const o={image_entity:e,name:t.name||t.entity};s&&(o.crop=s);const l=await this.hass.callService("anyvac","export_map_guide",o,void 0,!1,!0),h=l?.response?.paths,d=l?.response?.size;if(!h||!d||!Object.keys(h).length)throw new Error("no guide layers in service response");this._guideExportResult={paths:h,size:d,crop:l?.response?.crop,entity:t.entity}}catch(t){this._guideExportError="Couldn't export guide layers — make sure the anyvac integration is updated to at least 1.4.0, then try again.",console.error("[anyvac-card] export_map_guide failed:",t)}finally{this._guideExportBusy=!1}}_fire(t){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}_setConfig(t){const e={...this._config,...t};this._config=e,this._fire(e)}_setVacuum(t,e){const o=[...this._config.vacuums];o[t]={...o[t],...e};const s={...this._config,vacuums:o};this._config=s,this._fire(s)}_setMap(t,e){const o=this._config.vacuums[t].map??{...xe};this._setVacuum(t,{map:{...o,...e}})}_setImageBase(t,e){const o=this._config.vacuums[t].image_base??{src:""};this._setVacuum(t,{image_base:{...o,...e}})}get _mergedEdit(){return"merged"===this._config.map_mode}_editRooms(){if(this._mergedEdit)return this._config.rooms??[];const t=this._config.vacuums[Math.min(this._mapVac,this._config.vacuums.length-1)];return t?.rooms??[]}_setEditedRoom(t,e){if(this._mergedEdit){const o=[...this._config.rooms??[]];o[t]={...o[t],...e},this._setConfig({rooms:o})}else this._setRoom(Math.min(this._mapVac,this._config.vacuums.length-1),t,e)}_onRoomPointerDown(t,e,o,s){s.stopPropagation();const l=s.currentTarget.closest(".map-pos-container");if(!l)return;const h=l.getBoundingClientRect(),d=this._mapRoom===t;this._mapRoom=t;let p=e;if("move"===e&&null!=o.map_w){const t=(s.clientX-h.left)/h.width*100,e=(s.clientY-h.top)/h.height*100,l=o.map_x??50,d=o.map_y??50,m=o.map_w/2,u=(o.map_h??15)/2,_=16/h.width*100,f=16/h.height*100,b=Math.abs(t-(l-m))<=_,v=Math.abs(t-(l+m))<=_,w=Math.abs(e-(d-u))<=f,$=Math.abs(e-(d+u))<=f;b&&w?p="resize-nw":v&&w?p="resize-ne":b&&$?p="resize-sw":v&&$&&(p="resize-se")}const m=Math.min(this._mapVac,this._config.vacuums.length-1);this._rectDrag={ri:t,mode:p,container:h,orig:{x:o.map_x??50,y:o.map_y??50,w:o.map_w??0,h:o.map_h??0},startClientX:s.clientX,startClientY:s.clientY,moved:!1,wasSelected:d,seat:this._editorSeat(m)},s.currentTarget.setPointerCapture(s.pointerId)}_onRoomPointerMove(t){const e=this._rectDrag;if(!e)return;if(!e.moved){if(Math.hypot(t.clientX-e.startClientX,t.clientY-e.startClientY)<3)return;e.moved=!0}const o=(t.clientX-e.startClientX)/e.container.width*100,s=(t.clientY-e.startClientY)/e.container.height*100;if("move"===e.mode){const{map_x:t,map_y:l}=function moveRect(t,e,o){return{map_x:round1(clampPct(t.x+e)),map_y:round1(clampPct(t.y+o))}}(e.orig,o,s);return void this._setEditedRoom(e.ri,{map_x:t,map_y:l})}const l=e.mode.slice(7),{map_x:h,map_y:d,map_w:p,map_h:m}=function resizeRect(t,e,o,s){const l=t.w/2,h=t.h/2,{sx:d,sy:p}=fe[e],m=t.x+d*l,u=t.y+p*h,_=t.x-d*l,f=t.y-p*h,b=m+o,v=u+s;return{map_x:round1(clampPct((b+_)/2)),map_y:round1(clampPct((v+f)/2)),map_w:round1(clampSize(Math.abs(b-_))),map_h:round1(clampSize(Math.abs(v-f)))}}(e.orig,l,o,s);this._setEditedRoom(e.ri,{map_x:h,map_y:d,map_w:p,map_h:m})}_onRoomPointerUp(){const t=this._rectDrag;t&&!t.moved&&t.wasSelected&&(this._mapRoom=null),t?.moved&&this.requestUpdate(),this._rectDrag=null}_addEditedRoom(){if(this._mergedEdit){const t=this._config.rooms??[],e=[...t,{...ve,icon:_roomIconFor(t.length)}];this._setConfig({rooms:e}),this._mapRoom=e.length-1}else this._addRoom(Math.min(this._mapVac,this._config.vacuums.length-1)),this._mapRoom=(this._config.vacuums[this._mapVac]?.rooms?.length??1)-1}_deleteEditedRoom(t){if(this._mergedEdit){const e=(this._config.rooms??[]).filter((e,o)=>o!==t);this._setConfig({rooms:e}),this._mapRoom===t&&(this._mapRoom=null)}else this._deleteRoom(Math.min(this._mapVac,this._config.vacuums.length-1),t)}_setLayoutFlip(t,e){const o=this._config.layout??{},s=o[t]??{},l={...s.crop??{},flip:!!e||void 0};this._setConfig({layout:{...o,[t]:{...s,crop:l}}})}_setEditedImageBase(t){this._mergedEdit?this._setConfig({image_base:{...this._config.image_base??{src:""},...t}}):this._setImageBase(Math.min(this._mapVac,this._config.vacuums.length-1),t)}_currentImageBase(){const t=this._config.vacuums;if(!t.length)return;const e=Math.min(this._mapVac,t.length-1);return this._mergedEdit?this._config.image_base:t[e].image_base}_editorAR(){return this._pvAR>.1?this._pvAR:3.636}_intEntityFor(t){if(!t)return;if(t.integration_entity)return t.integration_entity;const e=this.hass?.entities,o=e?.[t.entity]?.device_id;return o?Object.keys(e).find(t=>e[t]?.device_id===o&&"anyvac"===e[t]?.platform&&t.startsWith("sensor.")):void 0}_mapEntityFor(t){if(!t)return;if(t.map?.entity)return t.map.entity;const e=this.hass?.entities,o=e?.[t.entity]?.device_id;if(!o)return;const s=Object.keys(e).filter(t=>e[t]?.device_id===o&&t.startsWith("image.")),l=s.filter(t=>{const e=this.hass.states[t];return!!e&&"unavailable"!==e.state&&"unknown"!==e.state&&!!e.attributes.entity_picture});return 1===l.length?l[0]:1===s.length?s[0]:void 0}_anyHomeFrame(){const t=new Map;for(const e of this._config.vacuums??[]){const o=this._intEntityFor(e),s=(o?this.hass.states[o]?.attributes:void 0)?.home_frame;if(!(s?.id&&s.width_px>0&&s.height_px>0))continue;const l=t.get(s.id);l?l.count++:t.set(s.id,{w:s.width_px,h:s.height_px,count:1})}let e=null;for(const[o,s]of t)(!e||s.count>e.count)&&(e={id:o,...s});return e?{id:e.id,w:e.w,h:e.h}:null}_roomSequence(t){const e=this._intEntityFor(t),o=e?this.hass?.states?.[e]?.attributes:void 0;return o?.room_sequence??{}}_roomsInSequenceOrder(t,e){return t.map((t,o)=>({r:t,i:o,s:t.key?e[t.key]??1/0:1/0})).sort((t,e)=>t.s!==e.s?t.s-e.s:t.i-e.i).map(t=>t.r)}_moveSequence(t,e,o,s){if(o===s)return;const l=e.map(t=>t.key).filter(t=>!!t);if(o<0||o>=l.length||s<0||s>=l.length)return;const[h]=l.splice(o,1);l.splice(s,0,h),this.hass.callService("anyvac","set_room_sequence",{rooms:l})}_editorSeat(t){const e=this._config.vacuums[t],o=this._intEntityFor(e),s=o?this.hass?.states?.[o]?.attributes:void 0,l=s&&(s.schema_version??0)>=2?s:void 0;return resolveSeat(this._config,e,l,this._editorAR())}_importRooms(t){const e=this._config.vacuums[t],o=this._intEntityFor(e),s=o?this.hass.states[o]?.attributes:void 0,l=Array.isArray(s?.rooms)?s.rooms:[];if(!s||(s.schema_version??0)<2||!l.length)return;const h=this._editorAR(),d=this._editorSeat(t),p=this._mergedEdit?[...this._config.rooms??[]]:[...e.rooms??[]],m=new Set(p.map(t=>t.key));let u=0;for(const t of l){const e=t?.name;if(!e||m.has(e))continue;const o=roomBboxToRect(t,s,d,h);o&&(p.push({key:e,name:e,icon:_roomIconFor(p.length),...o}),m.add(e),u++)}u&&(this._mergedEdit?this._setConfig({rooms:p}):this._setVacuum(t,{rooms:p}))}_startCalibration(t){this._calib={vacIdx:t,phase:"raw",rawPts:[],floorPts:[]},this._calibResult=null,this._calibError="",this._mapRoom=null}_cancelCalibration(){this._calib=null}_onCalibRawClick(t){const e=this._calib;if(!e||"raw"!==e.phase||!this._refNat||e.rawPts.length>=6)return;const o=t.currentTarget.getBoundingClientRect(),s=(t.clientX-o.left)/o.width,l=(t.clientY-o.top)/o.height,h={x:s*this._refNat.w,y:l*this._refNat.h};this._calib={...e,rawPts:[...e.rawPts,h],phase:"floor"}}_onCalibFloorClick(t){const e=this._calib;if(!e||"floor"!==e.phase)return;const o=t.currentTarget.getBoundingClientRect(),s=round1(clampPct((t.clientX-o.left)/o.width*100)),l=round1(clampPct((t.clientY-o.top)/o.height*100));this._calib={...e,floorPts:[...e.floorPts,{x:s,y:l}],phase:"raw"}}_undoCalibPoint(){const t=this._calib;t&&("floor"===t.phase&&t.rawPts.length>t.floorPts.length?this._calib={...t,rawPts:t.rawPts.slice(0,-1),phase:"raw"}:t.floorPts.length>0&&(this._calib={...t,floorPts:t.floorPts.slice(0,-1)}))}_calibPreview(t){const e=Math.min(t.rawPts.length,t.floorPts.length);if(e<2||!this._refNat)return null;const o=this._editorAR(),s=computeSeatFit(buildCalibrationAnchors(t.rawPts.slice(0,e),t.floorPts.slice(0,e),{NW:this._refNat.w,NH:this._refNat.h},o),o);return s?{residual_pct:Math.round(10*s.residual_pct)/10}:null}_finishCalibration(){const t=this._calib;if(!t)return;const e=Math.min(t.rawPts.length,t.floorPts.length);if(this._calib=null,!this._refNat||e<2)return void(this._calibError="Need at least 2 complete point pairs — try again.");const o=this._editorAR(),s=computeSeatFit(buildCalibrationAnchors(t.rawPts.slice(0,e),t.floorPts.slice(0,e),{NW:this._refNat.w,NH:this._refNat.h},o),o);s?(this._calibError="",this._setMap(t.vacIdx,{seat:"manual",rotation:s.rotation,scale:Math.round(10*s.scale)/10,offset_x:Math.round(10*s.offset_x)/10,offset_y:Math.round(10*s.offset_y)/10}),this._calibResult={residual_pct:Math.round(10*s.residual_pct)/10}):this._calibError="Couldn't compute a calibration from those points — make sure they're clearly apart, then try again."}_renderCalibStep(t,e,o,s,l,h,d){const p="raw"===t.phase,m=Math.min(t.rawPts.length,t.floorPts.length),u=m+1,_=this._calibPreview(t),f=this._refNat&&this._refNat.h>0?this._refNat.w/this._refNat.h:0,b=p?f:this._pvAR,v=t.rawPts.length>=6;return Et`
      <div class="calib-overlay">
        <div class="calib-banner">
          <span>
            ${p?v?Et`<strong>${6} points</strong> — that's the max. Save below, or Cancel.`:Et`<strong>Point ${u}</strong> — click a distinctive spot (e.g. a room corner)
                    on this vacuum's OWN map${m>0?", away from the points already placed":""}.`:Et`<strong>Point ${m+1}</strong> — click the SAME physical point on the floorplan.`}
            ${_?Et` Current fit error with ${m} point${m>1?"s":""}:
              <strong>${_.residual_pct}%</strong>.`:Dt}
          </span>
          <span style="display:flex;gap:6px;flex-shrink:0">
            ${t.rawPts.length>0||t.floorPts.length>0?Et`
              <button class="btn btn--sm" @click=${()=>this._undoCalibPoint()}>Undo point</button>
            `:Dt}
            ${m>=2?Et`
              <button class="btn btn--add btn--sm" @click=${()=>this._finishCalibration()}>Save</button>
            `:Dt}
            <button class="btn btn--sm" @click=${()=>this._cancelCalibration()}>Cancel</button>
          </span>
        </div>
        <div class="calib-stage" style=${Ut({"--calib-ar":String(b>.1?b:1.5)})}>
          ${p?Et`
            <div class="map-pos-container">
              <div class="map-preview-wrap">
                <img class="map-preview-img" src=${e} alt="Raw vacuum map"
                  @load=${t=>{const e=t.target;e.naturalWidth&&e.naturalHeight&&(this._refNat?.w!==e.naturalWidth||this._refNat?.h!==e.naturalHeight)&&(this._refNat={w:e.naturalWidth,h:e.naturalHeight})}}
                  style=${Ut({left:"0",top:"0",width:"100%",transform:"none"})}
                  @click=${t=>this._onCalibRawClick(t)} />
                ${t.rawPts.map((t,e)=>this._refNat?Et`
                  <div class="calib-marker"
                    style=${Ut({left:t.x/this._refNat.w*100+"%",top:t.y/this._refNat.h*100+"%"})}>${e+1}</div>
                `:Dt)}
              </div>
            </div>
          `:Et`
            <div class="map-pos-container" @click=${t=>this._onCalibFloorClick(t)}>
              <div class="map-preview-wrap">
                <img class="map-preview-img" src=${o} alt="Floorplan"
                  style=${Ut({left:50+s+"%",top:50+l+"%",width:h+"%",transform:"translate(-50%,-50%) rotate("+d+"deg)"})} />
                ${t.floorPts.map((t,e)=>Et`
                  <div class="calib-marker" style=${Ut({left:t.x+"%",top:t.y+"%"})}>${e+1}</div>
                `)}
              </div>
            </div>
          `}
        </div>
      </div>
    `}async _startHomeCalibration(){if(this._anyHomeFrame()){this._homeCalibError="",this._homeCalibResult=null,this._homeCalibBusy=!0;try{const t=await this.hass.callService("anyvac","snapshot_map_as_floorplan",{frame:"home",name:"home_frame_calib"},void 0,!1,!0),e=t?.response?.path,o=t?.response?.frame_id,s=t?.response?.crop;if(!e||!o||!s)throw new Error("incomplete response — integration too old?");this._homeCalibSnapshotUrl=e,this._homeCalibCrop=s,this._homeCalibFrameId=o,this._homeCalib={phase:"frame",homePts:[],floorPts:[]},this._mapRoom=null}catch(t){this._homeCalibError="Couldn't snapshot the home frame for calibration — make sure at least one vacuum has a home-frame registration (check its 'home_frame' sensor attribute) and the anyvac integration is at least 1.9.0, then try again.",console.error("[anyvac-card] snapshot_map_as_floorplan (frame: home, calib) failed:",t)}finally{this._homeCalibBusy=!1}}}_cancelHomeCalibration(){this._homeCalib=null}async _onHomeCalibFrameClick(t){const e=this._homeCalib,o=this._homeCalibCrop;if(!e||"frame"!==e.phase||!o||e.homePts.length>=6||this._homeCalibBusy)return;const s=t.currentTarget.getBoundingClientRect(),l=pctToCropPoint({x:(t.clientX-s.left)/s.width*100,y:(t.clientY-s.top)/s.height*100},o);if(l){this._homeCalibBusy=!0;try{const t=await this.hass.callService("anyvac","snap_wall_corner",{frame_id:this._homeCalibFrameId,x_home_px:l.x,y_home_px:l.y},void 0,!1,!0),o=t?.response?.x_home_px??l.x,s=t?.response?.y_home_px??l.y;this._homeCalib={...e,homePts:[...e.homePts,{x:o,y:s}],phase:"floor"}}catch(t){this._homeCalib={...e,homePts:[...e.homePts,l],phase:"floor"},console.error("[anyvac-card] snap_wall_corner failed, using unsnapped click:",t)}finally{this._homeCalibBusy=!1}}}_onHomeCalibFloorClick(t){const e=this._homeCalib;if(!e||"floor"!==e.phase)return;const o=t.currentTarget.getBoundingClientRect(),s=round1(clampPct((t.clientX-o.left)/o.width*100)),l=round1(clampPct((t.clientY-o.top)/o.height*100));this._homeCalib={...e,floorPts:[...e.floorPts,{x:s,y:l}],phase:"frame"}}_undoHomeCalibPoint(){const t=this._homeCalib;t&&("floor"===t.phase&&t.homePts.length>t.floorPts.length?this._homeCalib={...t,homePts:t.homePts.slice(0,-1),phase:"frame"}:t.floorPts.length>0&&(this._homeCalib={...t,floorPts:t.floorPts.slice(0,-1)}))}_homeCalibPreview(t){const e=Math.min(t.homePts.length,t.floorPts.length),o=this._anyHomeFrame();if(e<2||!o)return null;const s=t.homePts.slice(0,e).map((e,o)=>({home_px:e,floor_pct:t.floorPts[o]})),l=homeAnchorFit(s,{NW:o.w,NH:o.h},this._editorAR());return l?{residual_pct:Math.round(10*l.residual_pct)/10}:null}_finishHomeCalibration(){const t=this._homeCalib;if(!t)return;const e=Math.min(t.homePts.length,t.floorPts.length);if(this._homeCalib=null,e<2)return void(this._homeCalibError="Need at least 2 complete point pairs — try again.");const o=this._anyHomeFrame();if(!o)return void(this._homeCalibError="No home frame available anymore — try again.");const s=t.homePts.slice(0,e).map((e,o)=>({home_px:e,floor_pct:t.floorPts[o]})),l=homeAnchorFit(s,{NW:o.w,NH:o.h},this._editorAR());if(!l)return void(this._homeCalibError="Couldn't compute a calibration from those points — make sure they're clearly apart, then try again.");this._setEditedImageBase({home_anchors:s,home_anchors_frame_id:o.id});const h=this._config.vacuums.map(t=>({...t,hide_map:!0}));this._setConfig({vacuums:h}),this._homeCalibError="",this._homeCalibResult={residual_pct:Math.round(10*l.residual_pct)/10}}_renderHomeCalibStep(t,e,o,s,l,h){const d="frame"===t.phase,p=Math.min(t.homePts.length,t.floorPts.length),m=p+1,u=this._homeCalibPreview(t),_=this._homeCalibCrop,f=_&&_.y1-_.y0>0?(_.x1-_.x0)/(_.y1-_.y0):0,b=d?f:this._pvAR,v=t.homePts.length>=6;return Et`
      <div class="calib-overlay">
        <div class="calib-banner">
          <span>
            ${d?v?Et`<strong>${6} points</strong> — that's the max. Save below, or Cancel.`:Et`<strong>Point ${m}</strong> — click a distinctive spot (e.g. a wall corner) on
                    the home frame${p>0?", away from the points already placed":""}.
                    ${this._homeCalibBusy?" Snapping…":""}`:Et`<strong>Point ${p+1}</strong> — click the SAME physical point on the floorplan.`}
            ${u?Et` Current fit error with ${p} point${p>1?"s":""}:
              <strong>${u.residual_pct}%</strong>.`:Dt}
          </span>
          <span style="display:flex;gap:6px;flex-shrink:0">
            ${t.homePts.length>0||t.floorPts.length>0?Et`
              <button class="btn btn--sm" @click=${()=>this._undoHomeCalibPoint()}>Undo point</button>
            `:Dt}
            ${p>=2?Et`
              <button class="btn btn--add btn--sm" @click=${()=>this._finishHomeCalibration()}>Save</button>
            `:Dt}
            <button class="btn btn--sm" @click=${()=>this._cancelHomeCalibration()}>Cancel</button>
          </span>
        </div>
        <div class="calib-stage" style=${Ut({"--calib-ar":String(b>.1?b:1.5)})}>
          ${d?Et`
            <div class="map-pos-container">
              <div class="map-preview-wrap">
                <img class="map-preview-img" src=${this._homeCalibSnapshotUrl} alt="Home frame"
                  style=${Ut({left:"0",top:"0",width:"100%",transform:"none"})}
                  @click=${t=>this._onHomeCalibFrameClick(t)} />
                ${t.homePts.map((t,e)=>_?Et`
                  <div class="calib-marker"
                    style=${Ut({left:(t.x-_.x0)/(_.x1-_.x0)*100+"%",top:(t.y-_.y0)/(_.y1-_.y0)*100+"%"})}>${e+1}</div>
                `:Dt)}
              </div>
            </div>
          `:Et`
            <div class="map-pos-container" @click=${t=>this._onHomeCalibFloorClick(t)}>
              <div class="map-preview-wrap">
                <img class="map-preview-img" src=${e} alt="Floorplan"
                  style=${Ut({left:50+o+"%",top:50+s+"%",width:l+"%",transform:"translate(-50%,-50%) rotate("+h+"deg)"})} />
                ${t.floorPts.map((t,e)=>Et`
                  <div class="calib-marker" style=${Ut({left:t.x+"%",top:t.y+"%"})}>${e+1}</div>
                `)}
              </div>
            </div>
          `}
        </div>
      </div>
    `}_placeOwnRooms(t,e){const o=this._config.vacuums[t],s=this._intEntityFor(o),l=s?this.hass.states[s]?.attributes:void 0,h=Array.isArray(l?.rooms)?l.rooms:[];if(!h.length)return null;const d=this._mergedEdit?this._config.rooms??[]:o.rooms??[],{rooms:p,placed:m,added:u}=function placeRoomsInCrop(t,e,o,s){const l=o.map(t=>({...t})),h=new Map;l.forEach((t,e)=>h.set(t.key,e));let d=0,p=0;for(const o of t){const t=o?.name,m=o?.bbox_px;if(!t||!m)continue;const u=placeRoomInCrop(m,e);if(!u)continue;const _=h.get(t);if(void 0!==_)l[_]={...l[_],...u},d++;else{const e={key:t,name:t,icon:s(l.length),...u};l.push(e),h.set(t,l.length-1),p++}}return{rooms:l,placed:d,added:p}}(h,e,d,_roomIconFor);if(m||u){const e=p;this._mergedEdit?this._setConfig({rooms:e}):this._setVacuum(t,{rooms:e})}return{placed:m,added:u}}_placeRoomsFromCropBox(){const t=this._currentImageBase()?.crop_box;if(!t||!("entity"in t))return;const e=this._config.vacuums.findIndex(e=>e.entity===t.entity);if(e<0)return;const o=this._placeOwnRooms(e,t);o&&(this._placeRoomsResult=o)}_unmatchedOwnRoomNames(t){const e=this._config.vacuums[t],o=this._intEntityFor(e),s=o?this.hass.states[o]?.attributes:void 0,l=Array.isArray(s?.rooms)?s.rooms:[];if(!l.length)return[];const h=new Set(this._editRooms().map(t=>t.key)),d=[];for(const t of l){const e=t?.name;e&&!h.has(e)&&d.push(e)}return d}_setRoom(t,e,o){const s=[...this._config.vacuums[t].rooms??[]];s[e]={...s[e],...o},this._setVacuum(t,{rooms:s})}_setCleanAction(t,e){const o=this._config.vacuums[t].clean_action??{type:"native"};this._setVacuum(t,{clean_action:{...o,...e}})}_togglePresets(t){const e=new Set(this._openPresets);e.has(t)?e.delete(t):e.add(t),this._openPresets=e}_setPreset(t,e,o){const s=[...this._config.vacuums[t].presets??[]];s[e]={...s[e],...o},this._setVacuum(t,{presets:s})}_addPreset(t){const e=this._config.vacuums[t].presets??[],o=[...e,{id:"preset"+(e.length+1),label:"New preset"}];this._setVacuum(t,{presets:o}),this._openPresets=new Set([...this._openPresets,t])}_deletePreset(t,e){const o=(this._config.vacuums[t].presets??[]).filter((t,o)=>o!==e);this._setVacuum(t,{presets:o})}_setGlobal(t,e){const o=[...this._config.global_actions??[]];o[t]={...o[t],...e};const s={...this._config,global_actions:o};this._config=s,this._fire(s)}_setGlobalAction(t,e){const o=this._config.global_actions?.[t]?.action??{type:"script",entity_id:""};this._setGlobal(t,{action:{...o,...e}})}_moveVacuum(t,e){const o=t+e,s=[...this._config.vacuums];if(o<0||o>=s.length)return;[s[t],s[o]]=[s[o],s[t]];const l={...this._config,vacuums:s};this._config=l,this._fire(l)}_addVacuum(){const t=[...this._config.vacuums,{...be}],e={...this._config,vacuums:t};this._config=e,this._fire(e);const o=t.length-1;this._openVac=new Set([...this._openVac,o])}_deleteVacuum(t){const e=this._config.vacuums.filter((e,o)=>o!==t),o={...this._config,vacuums:e};this._config=o,this._fire(o);const s=new Set(this._openVac);s.delete(t),this._openVac=s}_addRoom(t){const e=this._config.vacuums[t].rooms??[],o=[...e,{...ve,icon:_roomIconFor(e.length)}];this._setVacuum(t,{rooms:o});const s=new Map(this._openRoom);s.set(t,o.length-1),this._openRoom=s}_moveRoom(t,e,o){if(e===o)return;const s=[...this._config.vacuums[t].rooms??[]];if(e<0||e>=s.length||o<0||o>=s.length)return;const[l]=s.splice(e,1);s.splice(o,0,l),this._setVacuum(t,{rooms:s})}_deleteRoom(t,e){const o=(this._config.vacuums[t].rooms??[]).filter((t,o)=>o!==e);this._setVacuum(t,{rooms:o});if(this._openRoom.get(t)===e){const e=new Map(this._openRoom);e.set(t,null),this._openRoom=e}this._mapRoom===e&&(this._mapRoom=null)}_setGlobalPreset(t,e){const o=[...this._config.global_presets??[]];o[t]={...o[t],...e},this._setConfig({global_presets:o})}_addGlobalPreset(){const t=this._config.global_presets??[],e=[...t,{id:"gp"+(t.length+1),label:"New clean",scope:"select"}];this._setConfig({global_presets:e})}_deleteGlobalPreset(t){const e=(this._config.global_presets??[]).filter((e,o)=>o!==t);this._setConfig({global_presets:e})}_addGlobal(){const t=[...this._config.global_actions??[],{...we}],e={...this._config,global_actions:t};this._config=e,this._fire(e);const o=t.length-1;this._openGlobal=new Set([...this._openGlobal,o])}_deleteGlobal(t){const e=(this._config.global_actions??[]).filter((e,o)=>o!==t),o={...this._config,global_actions:e};this._config=o,this._fire(o);const s=new Set(this._openGlobal);s.delete(t),this._openGlobal=s}_toggleVac(t){const e=new Set(this._openVac);e.has(t)?e.delete(t):e.add(t),this._openVac=e}_toggleRoom(t,e){const o=new Map(this._openRoom),s=o.get(t)??null;o.set(t,s===e?null:e),this._openRoom=o}_toggleSensors(t){const e=new Set(this._openSensors);e.has(t)?e.delete(t):e.add(t),this._openSensors=e}_toggleAction(t){const e=new Set(this._openAction);e.has(t)?e.delete(t):e.add(t),this._openAction=e}_toggleGlobal(t){const e=new Set(this._openGlobal);e.has(t)?e.delete(t):e.add(t),this._openGlobal=e}_entityPicker(t,e,o,s,l=!1){const h=o.length?o.join(" / "):"entity_id",d=1===o.length,p=d?"ha-ents-"+o[0]:"ha-entities",m=d?Object.keys(this.hass?.states??{}).filter(t=>t.startsWith(o[0]+".")).sort():null;return Et`
      ${m?Et`<datalist id=${p}>${m.map(t=>Et`<option value=${t}>`)}</datalist>`:Dt}
      <div class="field">
        <label>${t}${l?Et`<span class="required"> *</span>`:Dt}</label>
        <input class="text-input" type="text" list=${p}
          .value=${e??""} placeholder=${h}
          @input=${t=>{const e=t.target.value;(""===e||this.hass.states[e])&&s(e)}}
          @change=${t=>s(t.target.value)} />
      </div>`}_textField(t,e,o,s=""){return Et`
      <div class="field">
        <label>${t}</label>
        <input class="text-input" type="text" .value=${e??""} placeholder=${s}
          @change=${t=>o(t.target.value)} />
      </div>`}_resolveColor(t,e){const o=t??e;return Qt[o]??o}_hexColorField(t,e,o,s){const l=/^#[0-9a-fA-F]{6}$/.test(e??"")?e:s;return Et`
      <div class="field">
        <label>${t} (hex)</label>
        <div class="hex-color-row">
          <input type="color" class="threshold-color" .value=${l}
            @input=${t=>o(t.target.value)} />
          <input class="text-input" type="text" .value=${e??""} placeholder=${s}
            @change=${t=>o(t.target.value)} />
        </div>
      </div>`}_numberSlider(t,e,o,s,l,h,d=""){const p=e??0;return Et`
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
            ${d?Et`<span class="slider-val-suffix">${d}</span>`:Dt}
          </span>
        </div>
      </div>`}_selectField(t,e,o,s){return Et`
      <div class="field field--row">
        <label>${t}</label>
        <select class="select-input" @change=${t=>s(t.target.value)}>
          ${o.map(t=>Et`<option value=${t.value} ?selected=${t.value===e}>${t.label}</option>`)}
        </select>
      </div>`}_optionSelectFromList(t,e,o,s){return Et`
      <div class="field field--row">
        <label>${t}</label>
        <select class="select-input"
          @change=${t=>s(t.target.value)}>
          <option value="">— none —</option>
          ${e.map(t=>Et`<option value=${t} ?selected=${t===o}>${t}</option>`)}
        </select>
      </div>`}_optionSelect(t,e,o,s){const l=e?this.hass.states[e]?.attributes.options??[]:[];return l.length?Et`
      <div class="field field--row">
        <label>${t}</label>
        <select class="select-input"
          @change=${t=>s(t.target.value)}>
          <option value="">— none —</option>
          ${l.map(t=>Et`<option value=${t} ?selected=${t===o}>${t}</option>`)}
        </select>
      </div>`:this._textField(t,o,s,"e.g. balanced")}_iconPickerField(t,e){return Et`
      <div class="field">
        <label>Icon</label>
        <ha-icon-picker .value=${t??"mdi:square"}
          @value-changed=${t=>e(t.detail.value)}
        ></ha-icon-picker>
      </div>`}_areaPicker(t,e,o){const s=Object.values(this.hass?.areas??{});return s.length?Et`
      <div class="field field--row">
        <label>${t}</label>
        <select class="select-input"
          @change=${t=>o(t.target.value)}>
          <option value="">— not mapped —</option>
          ${[...s].sort((t,e)=>t.name.localeCompare(e.name)).map(t=>Et`<option value=${t.area_id} ?selected=${t.area_id===e}>${t.name}</option>`)}
        </select>
      </div>`:this._textField(t,e,o,"e.g. living_room")}_renderVacuumsTab(){return Et`
      <div class="tab-body">
        ${0===this._config.vacuums.length?Et`<p class="hint">No vacuums yet. Add one below.</p>`:this._config.vacuums.map((t,e)=>this._renderVacuumAccordion(t,e))}
        <button class="btn btn--add" @click=${()=>this._addVacuum()}>
          <ha-icon icon="mdi:plus"></ha-icon> Add vacuum
        </button>
      </div>`}_renderVacuumAccordion(t,e){const o=this._resolveColor(t.color,"green"),s=this._openVac.has(e);return Et`
      <div class="acc-row" style=${Ut({borderLeft:"3px solid "+o})}>
        <div class="acc-header" @click=${()=>this._toggleVac(e)}>
          ${t.image?Et`<img class="acc-img" src=${t.image} alt=${t.name??""} />`:Et`<ha-icon icon="mdi:robot-vacuum" style=${Ut({color:o,width:"36px",height:"36px"})}></ha-icon>`}
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
          <ha-icon icon=${s?"mdi:chevron-up":"mdi:chevron-down"} class="acc-chevron"></ha-icon>
        </div>

        ${s?Et`
          <div class="acc-body">

            <div class="section-title">Basic</div>
            ${this._entityPicker("Vacuum entity",t.entity,["vacuum"],t=>this._setVacuum(e,{entity:t}),!0)}
            ${this._textField("Display name",t.name,t=>this._setVacuum(e,{name:t}),"e.g. S8")}
            ${this._textField("Image path",t.image,t=>this._setVacuum(e,{image:t}),"/local/...")}
            ${this._hexColorField("Accent colour",t.color?this._resolveColor(t.color,"green"):void 0,t=>this._setVacuum(e,{color:t||void 0}),te[e%te.length])}
            ${this._selectField("Role",t.clean_type??"auto",[{value:"auto",label:"Auto-detect from clean action"},{value:"dry",label:"Dry only"},{value:"wet",label:"Wet only"},{value:"both",label:"Both — follow live mode"}],t=>this._setVacuum(e,{clean_type:"auto"===t?void 0:t}))}
            <p class="hint">This vacuum's capability — controls which time estimate and which dry/wet layer it uses. Not the run-time Dry/Wet/Both choice (that's made on the controller). "Both" follows the live water mode (needs the integration sensor).</p>

            ${this._renderSensorsSection(e,t)}
            ${this._renderCleanActionSection(e,t)}
            ${this._renderPresetsSection(e,t)}

            <div class="section-title">Rooms (${(t.rooms??[]).length})</div>
            ${this._intEntityFor(t)?Et`<p class="hint">With the AnyVac integration, rooms appear automatically from
                  this vacuum's own map — you don't need to add them here. Add a room below only to
                  override its icon/display name, or to position it on a custom floorplan (Maps tab).</p>`:Et`<p class="hint">Add one entry per room this vacuum can clean.</p>`}
            ${(t.rooms??[]).map((t,o)=>this._renderRoomAccordion(t,e,o))}
            <button class="btn btn--add" @click=${()=>this._addRoom(e)}>
              <ha-icon icon="mdi:plus"></ha-icon> Add room
            </button>

          </div>
        `:Dt}
      </div>`}_renderSensorsSection(t,e){const o=this._openSensors.has(t),s=[e.status_entity,e.battery_entity,e.last_clean_entity,e.progress_entity,e.current_room_entity,e.error_entity].filter(Boolean).length;return Et`
      <div class="collapsible">
        <div class="collapsible-header" @click=${()=>this._toggleSensors(t)}>
          <span class="collapsible-title">Sensors</span>
          ${s?Et`<span class="badge">${s} configured</span>`:Dt}
          <ha-icon icon=${o?"mdi:chevron-up":"mdi:chevron-down"} class="acc-chevron"></ha-icon>
        </div>
        ${o?Et`
          <div class="collapsible-body">
            <p class="hint">Leave the sensors below blank to auto-fill them from the vacuum's device (battery, status, last clean, progress, current room, error).</p>
            ${this._entityPicker("Status",e.status_entity,["sensor"],e=>this._setVacuum(t,{status_entity:e||void 0}))}
            ${this._entityPicker("Battery",e.battery_entity,["sensor"],e=>this._setVacuum(t,{battery_entity:e||void 0}))}
            ${this._entityPicker("Last clean end",e.last_clean_entity,["sensor"],e=>this._setVacuum(t,{last_clean_entity:e||void 0}))}
            ${this._entityPicker("Progress",e.progress_entity,["sensor"],e=>this._setVacuum(t,{progress_entity:e||void 0}))}
            ${this._entityPicker("Current room",e.current_room_entity,["sensor"],e=>this._setVacuum(t,{current_room_entity:e||void 0}))}
            ${this._entityPicker("Error",e.error_entity,["sensor"],e=>this._setVacuum(t,{error_entity:e||void 0}))}
          </div>
        `:Dt}
      </div>`}_renderPresetsSection(t,e){const o=this._openPresets.has(t),s=e.presets??[],l=this.hass.states[e.entity]?.attributes.fan_speed_list??[],h=e.clean_action,d=h?.mop_mode_entity,p=h?.mop_intensity_entity;return Et`
      <div class="collapsible">
        <div class="collapsible-header" @click=${()=>this._togglePresets(t)}>
          <span class="collapsible-title">Setting presets</span>
          ${s.length?Et`<span class="badge">${s.length}</span>`:Dt}
          <ha-icon icon=${o?"mdi:chevron-up":"mdi:chevron-down"} class="acc-chevron"></ha-icon>
        </div>
        ${o?Et`
          <div class="collapsible-body">
            <p class="hint">Named "how" bundles for Manual mode — the user picks one on the controller, then picks rooms. Mop entities come from Clean action above; presets only set the values. With fewer than 2 presets the controller shows no chips (a default from Clean action is used).</p>
            ${s.map((e,o)=>Et`
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
                ${l.length?this._optionSelectFromList("Suction",l,e.suction_level,e=>this._setPreset(t,o,{suction_level:e||void 0})):this._textField("Suction",e.suction_level,e=>this._setPreset(t,o,{suction_level:e||void 0}),"e.g. max")}
                ${d?this._optionSelect("Mop mode",d,e.mop_mode,e=>this._setPreset(t,o,{mop_mode:e||void 0})):Dt}
                ${p?this._optionSelect("Mop intensity",p,e.mop_intensity,e=>this._setPreset(t,o,{mop_intensity:e||void 0})):Dt}
                ${this._numberSlider("Repeat passes",e.repeat??1,1,3,1,e=>this._setPreset(t,o,{repeat:e}))}
              </div>
            `)}
            <button class="btn btn--add" @click=${()=>this._addPreset(t)}>
              <ha-icon icon="mdi:plus"></ha-icon> Add preset
            </button>
          </div>
        `:Dt}
      </div>`}_renderCleanActionSection(t,e){const o=this._openAction.has(t),s=e.clean_action??{type:"native"};return Et`
      <div class="collapsible">
        <div class="collapsible-header" @click=${()=>this._toggleAction(t)}>
          <span class="collapsible-title">Clean action</span>
          <span class="badge">${s.type}</span>
          <ha-icon icon=${o?"mdi:chevron-up":"mdi:chevron-down"} class="acc-chevron"></ha-icon>
        </div>
        ${o?Et`
          <div class="collapsible-body">
            ${this._renderCleanActionEditor(t,e)}
          </div>
        `:Dt}
      </div>`}_renderCleanActionEditor(t,e){const o=e.clean_action??{type:"native"};return Et`
      ${this._selectField("Strategy","native-auto"===o.type?"native":o.type,[{value:"native",label:"Native (vacuum.send_command + segment IDs)"},{value:"native-area",label:"Native area (vacuum.clean_area)"},{value:"script",label:"Custom script"}],e=>{if("script"===e)return void this._setVacuum(t,{clean_action:{type:"script",entity_id:""}});const o=this._config.vacuums[t]?.clean_action,s={};if(o&&"script"!==o.type)for(const t of["repeat","suction_level","mop_mode_entity","mop_mode","mop_intensity_entity","mop_intensity"]){const e=o[t];void 0!==e&&(s[t]=e)}this._setVacuum(t,{clean_action:{type:e,...s}})})}
      ${"script"===o.type?this._renderScriptAction(t,o):this._renderNativeOptions(t,o)}`}_renderNativeOptions(t,e){const o="native-area"===e.type?Et`<p class="hint">Calls <code>vacuum.clean_area</code> (degraded mode only — with the AnyVac integration the START button sends <code>anyvac.clean</code> instead). No repeat; repeat lives server-side in <code>anyvac.clean</code>.</p>`:"native-auto"===e.type?Et`<p class="hint">Legacy value, no longer offered above — behaves identically to <strong>Native</strong> (segment-based) both with and without the integration. Safe to leave as-is; re-selecting "Native" above rewrites it.</p>`:Et`<p class="hint">Degraded mode only — with the AnyVac integration the START button always sends <code>anyvac.clean</code> instead, which resolves segments server-side.</p>`;return Et`
      <div class="sub-section">
        ${o}
        ${this._numberSlider("Repeat passes",e.repeat??1,1,3,1,e=>this._setCleanAction(t,{repeat:e}))}
        <div class="sub-title">Suction level (optional)</div>
        ${(()=>{const o=this.hass.states[this._config.vacuums[t]?.entity]?.attributes.fan_speed_list??[];return o.length?this._optionSelectFromList("Suction option",o,e.suction_level,e=>this._setCleanAction(t,{suction_level:e||void 0})):this._textField("Suction option",e.suction_level,e=>this._setCleanAction(t,{suction_level:e||void 0}),"e.g. balanced")})()}
        <div class="sub-title">Mop mode (optional)</div>
        ${this._entityPicker("Mop mode entity",e.mop_mode_entity,["select"],e=>this._setCleanAction(t,{mop_mode_entity:e||void 0}))}
        ${e.mop_mode_entity?this._optionSelect("Mop mode option",e.mop_mode_entity,e.mop_mode,e=>this._setCleanAction(t,{mop_mode:e||void 0})):Dt}
        <div class="sub-title">Mop intensity (optional)</div>
        ${this._entityPicker("Mop intensity entity",e.mop_intensity_entity,["select"],e=>this._setCleanAction(t,{mop_intensity_entity:e||void 0}))}
        ${e.mop_intensity_entity?this._optionSelect("Mop intensity option",e.mop_intensity_entity,e.mop_intensity,e=>this._setCleanAction(t,{mop_intensity:e||void 0})):Dt}
      </div>`}_renderScriptAction(t,e){const o=e.variables??{},s=Object.entries(o);return Et`
      <div class="sub-section">
        ${this._entityPicker("Script entity",e.entity_id,["script"],e=>this._setCleanAction(t,{entity_id:e}))}
        <p class="hint">Tokens: {{ entity }}, {{ selected_segments }}, {{ selected_room_keys }}, {{ selected_area_ids }}</p>
        ${s.map(([e,l],h)=>Et`
          <div class="var-row">
            <input class="text-input text-input--half" .value=${e} placeholder="name"
              @change=${e=>{const o=e.target.value,l=Object.fromEntries(s.map(([t,e],s)=>[s===h?o:t,e]));this._setCleanAction(t,{variables:l})}} />
            <span class="var-sep">&#8594;</span>
            <input class="text-input text-input--half" .value=${l} placeholder="{{ entity }}"
              @change=${s=>{const l={...o,[e]:s.target.value};this._setCleanAction(t,{variables:l})}} />
            <button class="icon-btn icon-btn--danger icon-btn--sm"
              @click=${()=>{const e=Object.fromEntries(s.filter((t,e)=>e!==h));this._setCleanAction(t,{variables:e})}}>
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          </div>`)}
        <button class="btn btn--add btn--sm"
          @click=${()=>this._setCleanAction(t,{variables:{...o,"":""}})}>
          <ha-icon icon="mdi:plus"></ha-icon> Add variable
        </button>
      </div>`}_renderRoomAccordion(t,e,o){const s=(this._openRoom.get(e)??null)===o;return Et`
      <div class="room-acc"
        style=${this._dragRoom&&this._dragRoom.vac===e&&this._dragRoom.idx!==o?Ut({outline:"2px dashed var(--primary-color,#3b82f6)",outlineOffset:"-2px"}):Dt}
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
            ${void 0===t.segment_id||this._intEntityFor(this._config.vacuums[e])?Dt:Et`<span class="room-acc-meta">seg ${t.segment_id}</span>`}
          </div>
          <button class="icon-btn icon-btn--danger icon-btn--sm"
            @click=${t=>{t.stopPropagation(),this._deleteRoom(e,o)}}>
            <ha-icon icon="mdi:delete"></ha-icon>
          </button>
          <ha-icon icon=${s?"mdi:chevron-up":"mdi:chevron-down"} class="acc-chevron"></ha-icon>
        </div>
        ${s?Et`
          <div class="room-acc-body">
            ${this._textField("Key (unique ID)",t.key,t=>this._setRoom(e,o,{key:t}),"e.g. bedroom")}
            <p class="hint">Tip: keep this identical to the room's name in the Roborock app — the AnyVac integration matches rooms by this name (auto-seating, live positions from the integration, room pinning).</p>
            ${this._textField("Display name",t.name,t=>this._setRoom(e,o,{name:t}),"e.g. Bedroom")}
            <p class="hint">Cleaning sequence moved to a shared, backend-owned reorderable
              list — see the <strong>Maps tab</strong> (requires the AnyVac integration + merged mode).</p>
            ${this._intEntityFor(this._config.vacuums[e])?Et`<p class="hint">Segment resolution, timing and clean history are handled
                  server-side by the AnyVac integration for this vacuum — nothing to set here.</p>`:"native-area"===this._config.vacuums[e]?.clean_action?.type?Et`
                  <div class="field field--row">
                    <label>Effective area</label>
                    <strong style="font-size:13px">${t.area_id??this._config.area_mappings?.[t.key]??t.key}</strong>
                  </div>
                  <p class="hint map-hint" @click=${()=>{this._tab="global"}}>
                    Set in <strong>Global tab → Area mappings</strong> →
                  </p>`:Et`
                  <div class="field field--row">
                    <label>Segment ID</label>
                    <input class="text-input text-input--sm" type="number"
                      .value=${String(t.segment_id??"")} placeholder="e.g. 16"
                      @change=${t=>{const s=parseInt(t.target.value);this._setRoom(e,o,{segment_id:isNaN(s)?void 0:s})}} />
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
        `:Dt}
      </div>`}_renderMapsTab(){const t=this._config.vacuums;if(!t.length)return Et`<div class="tab-body"><p class="hint">No vacuums configured. Add one in the Vacuums tab.</p></div>`;const e=Math.min(this._mapVac,t.length-1),o=t[e],s=o.map??{...xe},l=this._refMapVac===e?this._refMapUrl:"",h=o.base??"map",d=this._currentImageBase(),p=("merged"===this._config.map_mode||"image"===h||"combined"===h)&&!!d?.src,m=p?d.src:l,u=p?d.rotation??0:s.rotation??0,_=p?d.scale??100:s.scale??100,f=p?void 0:s.scale_y,b=p?d.offset_x??0:s.offset_x??0,v=p?d.offset_y??0:s.offset_y??0,w=this._editRooms(),$=this._editorSeat(e),A=this._rectDrag?.seat??$,C=d?.crop_box,P=C&&"frame_id"in C?C:void 0,F=C&&"entity"in C?C:void 0,E=this._intEntityFor(o)?this.hass.states[this._intEntityFor(o)]?.attributes?.home_frame:void 0,T=!!P&&!!E?.id&&E.id===P.frame_id,O=this._intEntityFor(o)?this.hass.states[this._intEntityFor(o)]?.attributes?.registration:void 0,B=F?canvasScaleForCrop(this._pvNat,F):null,j=!!F&&!!this._pvNat&&null===B,W=P?canvasScaleForCrop(this._pvNat,P):null,G=!!P&&!!this._pvNat&&null===W,q=!!F&&this._config.vacuums.some(t=>t.entity===F.entity)&&(()=>{const t=this._config.vacuums.find(t=>t.entity===F.entity),e=this._intEntityFor(t),o=e?this.hass.states[e]?.attributes:void 0;return Array.isArray(o?.rooms)&&o.rooms.some(t=>!!t?.bbox_px)})();return Et`
      <div class="tab-body">

        ${t.length>1?Et`
          <div class="pill-row">
            ${t.map((t,o)=>Et`
              <button class="vac-pill ${o===e?"vac-pill--active":""}"
                @click=${()=>{this._mapVac=o,this._mapRoom=null}}>
                ${t.name||t.entity||"Vacuum "+(o+1)}
              </button>`)}
          </div>
        `:Dt}

        <div class="field field--row">
          <label>Swap ↔/↕ everywhere below</label>
          <label class="toggle-wrap">
            <input type="checkbox" class="toggle-input"
              .checked=${this._hvSwap}
              @change=${t=>{this._hvSwap=t.target.checked}} />
            <span class="toggle-track"></span>
          </label>
        </div>
        <p class="hint">HA's own edit-card dialog can render the preview above (and below) at a
          different width than your real dashboard — which can flip whether the map auto-rotates
          90°, independently of any Rotation field. If dragging a slider marked ↔ (horizontal)
          visibly moves something vertically — judge by your <strong>real dashboard</strong>, not
          this dialog — turn this on to fix every ↔/↕ label in this tab at once (Scale, Offset,
          Image offset, Room position/size).</p>

        ${this._selectField("Map mode (all vacuums)",this._config.map_mode??"split",[{value:"split",label:"Split — one map per vacuum"},{value:"merged",label:"Merged — all in one map"}],t=>this._setConfig({map_mode:"merged"===t?"merged":void 0}))}

        ${this._mergedEdit&&!this._config.image_base?.src?Et`
          <p class="hint">Merged needs a shared floorplan below or vacuums' raw maps just get laid on top of
            each other unaligned. No photo of your own? Pick a vacuum, scroll to "Shared floorplan" and use
            "Use this vacuum's current map as floorplan" — its own rooms place themselves automatically; every
            other vacuum whose room names match then auto-fits too, with nothing else to set.</p>
        `:Dt}

        ${this._mergedEdit?Dt:this._selectField("Base layer",o.base??"map",[{value:"map",label:"Vacuum map"},{value:"combined",label:"Image + map"}],t=>this._setVacuum(e,{base:t}))}

        ${this._entityPicker("AnyVac integration sensor",o.integration_entity,["sensor"],t=>this._setVacuum(e,{integration_entity:t}))}

        ${this._intEntityFor(o)||"merged"===this._config.map_mode?this._selectField("Hide vacuum map (show only floorplan + robot/path)",o.hide_map?"yes":"no",[{value:"no",label:"no"},{value:"yes",label:"yes"}],t=>this._setVacuum(e,{hide_map:"yes"===t})):Dt}

        ${"combined"===o.base||"merged"===this._config.map_mode?Et`
          ${this._numberSlider("Overlay opacity",o.overlay_opacity??55,0,100,5,t=>this._setVacuum(e,{overlay_opacity:t}),"%")}
          ${this._selectField("Overlay blend",o.overlay_blend??"normal",[{value:"normal",label:"normal"},{value:"lighten",label:"lighten (isolate path)"},{value:"screen",label:"screen"},{value:"plus-lighter",label:"plus-lighter"}],t=>this._setVacuum(e,{overlay_blend:t}))}
        `:Dt}

        ${"image"===o.base||"combined"===o.base||"merged"===this._config.map_mode?Et`
          ${"merged"===this._config.map_mode?Et`<div class="section-title">Shared floorplan (all vacuums)</div>`:Dt}
          ${"merged"===this._config.map_mode?Et`
            <button class="btn btn--sm" style="align-self:flex-start"
              ?disabled=${this._homeFrameSnapshotBusy}
              @click=${()=>this._snapshotHomeFrame()}>
              <ha-icon icon="mdi:vector-combine"></ha-icon>
              ${this._homeFrameSnapshotBusy?"Snapshotting…":"Snapshot home frame as floorplan"}
            </button>
            <p class="hint">Docs/40 Fáze 3 — the recommended way to set up merged mode with 2+ vacuums:
              renders a composite of every vacuum currently registered into the shared "home frame"
              (see each vacuum's <code>registration</code> sensor attribute) and turns it into the
              floorplan below. No per-vacuum seating needed afterwards — a vacuum registered into this
              frame draws its robot/path/rooms at their exact real position automatically, and a vacuum
              that ISN'T (different floor, just restarted) falls back to the seating controls below on
              its own. Requires anyvac integration ≥ 1.8.0.</p>
            ${this._homeFrameSnapshotError?Et`<p class="hint" style="color:#ff6b6b">${this._homeFrameSnapshotError}</p>`:Dt}
            ${P?Et`
              <p class="hint">Home frame: <code>${P.frame_id}</code> ·
                ${P.x0},${P.y0}–${P.x1},${P.y1}
                (${P.x1-P.x0}×${P.y1-P.y0}px)
                <span class="footer-link" style="margin-left:6px" @click=${()=>this._setEditedImageBase({crop_box:void 0})}>Clear</span>
              </p>
              ${G&&this._pvNat?Et`
                <p class="hint" style="color:#faad14">⚠️ The saved floorplan file is
                  ${this._pvNat.w}×${this._pvNat.h}px, which doesn't match this home frame's
                  ${P.x1-P.x0}×${P.y1-P.y0}px — rooms and
                  markers placed on it won't line up. Re-snapshot the home frame, or Clear it above.</p>
              `:null!==W&&Math.abs(W-1)>.01?Et`
                <p class="hint">ℹ️ File is a ${W.toFixed(2)}× export of this home frame
                  (same shape, different resolution) — recognized automatically, no need to re-snapshot.</p>
              `:Dt}
            `:Dt}
            <div class="section-title">or, a floorplan photo of your own</div>
          `:Dt}

          ${this._mapEntityFor(o)?Et`
            <button class="btn btn--sm" style="align-self:flex-start"
              ?disabled=${this._floorplanSnapshotBusy}
              @click=${()=>this._snapshotFloorplan(o)}>
              <ha-icon icon="mdi:camera"></ha-icon>
              ${this._floorplanSnapshotBusy?"Snapshotting…":"Use this vacuum's current map as floorplan"}
            </button>
            <p class="hint">No floor plan photo of your own, and no home frame yet either? This saves
              ${o.name||o.entity}'s current map as a static image and sets it as the floorplan
              below — the easiest way to get auto-fit working across multiple vacuums. Also places
              ${o.name||o.entity}'s own rooms on it automatically (no dragging needed) and turns
              "Hide vacuum map" on for
              ${"merged"===this._config.map_mode?"every vacuum sharing this floorplan":"this vacuum"}.
              Pick your fullest-coverage vacuum for this step, then switch to each other vacuum below —
              any of its rooms whose name matches one already placed auto-fits with nothing else to do;
              use "Import" only for rooms exclusive to that vacuum. Requires anyvac integration ≥ 0.88.0.</p>
            ${this._floorplanSnapshotError?Et`<p class="hint" style="color:#ff6b6b">${this._floorplanSnapshotError}</p>`:Dt}
          `:Dt}

          ${this._mapEntityFor(o)&&!P?Et`
            <div class="section-title">Custom floorplan helper</div>
            <button class="btn btn--sm" style="align-self:flex-start"
              ?disabled=${this._guideExportBusy}
              @click=${()=>this._exportMapGuide(o)}>
              <ha-icon icon="mdi:layers-outline"></ha-icon>
              ${this._guideExportBusy?"Exporting…":"Export guide layers"}
            </button>
            <p class="hint">Opens as layers over the floorplan snapshot in any image editor —
              the gaps inside the path are where your furniture stands. Requires anyvac
              integration ≥ 1.4.0.</p>
            ${this._guideExportError?Et`<p class="hint" style="color:#ff6b6b">${this._guideExportError}</p>`:Dt}
            ${this._guideExportResult?Et`
              <p class="hint">${this._guideExportResult.size.w}×${this._guideExportResult.size.h}px${this._guideExportResult.crop?Et` · crop ${this._guideExportResult.crop.x0},${this._guideExportResult.crop.y0}–${this._guideExportResult.crop.x1},${this._guideExportResult.crop.y1}`:Dt} —
                ${Object.entries(this._guideExportResult.paths).map(([t,e],o)=>Et`${o>0?" · ":""}<a href=${e} target="_blank" rel="noopener">${t}</a>`)}
              </p>
              ${!this._guideExportResult.crop||F&&F.entity===this._guideExportResult.entity?Dt:Et`
                <button class="btn btn--sm" style="align-self:flex-start"
                  @click=${()=>this._setEditedImageBase({crop_box:{entity:this._guideExportResult.entity,...this._guideExportResult.crop}})}>
                  <ha-icon icon="mdi:crop"></ha-icon> Use this crop for the floorplan
                </button>
              `}
            `:Dt}

            ${F?Et`
              <p class="hint">Crop box: <code>${F.entity}</code> ·
                ${F.x0},${F.y0}–${F.x1},${F.y1}
                (${F.x1-F.x0}×${F.y1-F.y0}px)
                <span class="footer-link" style="margin-left:6px" @click=${()=>this._setEditedImageBase({crop_box:void 0})}>Clear</span>
              </p>
              ${j&&this._pvNat?Et`
                <p class="hint" style="color:#faad14">⚠️ The saved floorplan file is
                  ${this._pvNat.w}×${this._pvNat.h}px, which doesn't match this crop box's
                  ${F.x1-F.x0}×${F.y1-F.y0}px — rooms placed from it
                  won't line up. Re-snapshot the floorplan, or Clear the crop box above.</p>
              `:null!==B&&Math.abs(B-1)>.01?Et`
                <p class="hint">ℹ️ File is a ${B.toFixed(2)}× export of this crop
                  (same shape, different resolution) — recognized automatically, no need to re-snapshot.</p>
              `:Dt}
              <button class="btn btn--sm" style="align-self:flex-start"
                ?disabled=${!q}
                title=${q?"":"Needs the crop's own vacuum configured here, with the integration reporting at least one room"}
                @click=${()=>this._placeRoomsFromCropBox()}>
                <ha-icon icon="mdi:vector-square"></ha-icon> Place rooms from crop box
              </button>
              ${this._placeRoomsResult?Et`
                <p class="hint">Placed ${this._placeRoomsResult.placed} room${1===this._placeRoomsResult.placed?"":"s"}
                  (${this._placeRoomsResult.added} added).</p>
              `:Dt}
            `:Et`
              <p class="hint">No crop box yet — use "Use this vacuum's current map as floorplan" above
                (integration ≥ 1.5.0), or "Use this crop for the floorplan" after exporting guide layers below.</p>
            `}
          `:Dt}

          ${this._textField("Image src (URL)",d?.src,t=>this._setEditedImageBase({src:t}),"/local/anyvac/flat.svg")}
          ${this._numberSlider("Image rotation",d?.rotation??0,0,360,90,t=>this._setEditedImageBase({rotation:t}),"°")}
          ${this._numberSlider("Image scale",d?.scale??100,50,200,5,t=>this._setEditedImageBase({scale:t}),"%")}
          ${(()=>{const t=this._hvSwap?"offset_y":"offset_x",e=this._hvSwap?"offset_x":"offset_y",o=this._hvSwap?d?.offset_y??0:d?.offset_x??0,s=this._hvSwap?d?.offset_x??0:d?.offset_y??0;return Et`
              ${this._numberSlider("Image offset ↔ (horizontal)",o,-50,50,1,e=>this._setEditedImageBase({[t]:e}),"%")}
              ${this._numberSlider("Image offset ↕ (vertical)",s,-50,50,1,t=>this._setEditedImageBase({[e]:t}),"%")}
            `})()}

          ${"merged"===this._config.map_mode&&!P&&d?.src&&this._anyHomeFrame()?Et`
            <div class="section-title">Calibrate against home frame (docs/40 §5.B)</div>
            <button class="btn btn--sm" style="align-self:flex-start"
              ?disabled=${this._homeCalibBusy}
              @click=${()=>this._startHomeCalibration()}>
              <ha-icon icon="mdi:crosshairs-gps"></ha-icon>
              ${this._homeCalibBusy?"Snapshotting…":"Calibrate floorplan against home frame"}
            </button>
            <p class="hint">For a floorplan of your own (photo/drawing) rather than a home-frame
              snapshot: click the same physical point once on a live snapshot of the shared home
              frame (each click snaps to the nearest wall corner automatically) and once on the
              floorplan above, repeated for at least 2 points — spread them out, corners of
              different rooms work well. Unlike the floorplan photo itself, this calibration
              re-fits itself automatically as the home frame's canvas grows over time (the robots
              exploring further), so there's no need to re-click later. Also turns "Hide vacuum
              map" on for every vacuum, same as the snapshot button above. Requires anyvac
              integration ≥ 1.9.0 (the <code>anyvac.snap_wall_corner</code> service).</p>
            ${this._homeCalibError?Et`<p class="hint" style="color:#ff6b6b">${this._homeCalibError}</p>`:Dt}
            ${d?.home_anchors?.length?Et`
              <p class="hint">Calibrated: <strong>${d.home_anchors.length}</strong> anchor point${d.home_anchors.length>1?"s":""}
                against frame <code>${d.home_anchors_frame_id}</code>
                <span class="footer-link" style="margin-left:6px"
                  @click=${()=>this._setEditedImageBase({home_anchors:void 0,home_anchors_frame_id:void 0})}>Clear</span>
              </p>
            `:Dt}
            ${this._homeCalibResult?Et`
              <p class="hint">✅ Calibrated — fit error ${this._homeCalibResult.residual_pct}%.</p>
            `:Dt}
          `:Dt}

          ${"merged"===this._config.map_mode&&!P&&this._anyHomeFrame()?Et`
            <div class="section-title">or, fiducial markers (docs/40 §5.A.2, advanced)</div>
            <button class="btn btn--sm" style="align-self:flex-start"
              ?disabled=${this._fiducialSnapshotBusy}
              @click=${()=>this._snapshotHomeFrameWithFiducials()}>
              <ha-icon icon="mdi:crosshairs"></ha-icon>
              ${this._fiducialSnapshotBusy?"Snapshotting…":"1. Snapshot home frame with markers"}
            </button>
            <p class="hint">A third way to calibrate a floorplan of your own — skip this unless the
              tolerance check above and clicking through calibration both aren't enough (e.g. you
              need to rotate the file, not just crop/resize it). Saves a home-frame snapshot with 4
              invisible markers baked into its border, sets it as the floorplan below — now crop,
              resize and/or rotate that file in an external image editor as needed (GIMP etc.), keep
              it as PNG, and don't flatten it. Then set the floorplan src to your edited file (or
              overwrite the same file) and run step 2. Requires anyvac integration ≥ 1.9.0.</p>
            ${this._fiducialSnapshotError?Et`<p class="hint" style="color:#ff6b6b">${this._fiducialSnapshotError}</p>`:Dt}
            ${this._fiducialKnown?Et`
              <button class="btn btn--sm" style="align-self:flex-start"
                ?disabled=${this._fiducialDetectBusy||!d?.src}
                @click=${()=>this._detectFiducials()}>
                <ha-icon icon="mdi:crosshairs-gps"></ha-icon>
                ${this._fiducialDetectBusy?"Detecting…":"2. Detect markers in edited file"}
              </button>
              <p class="hint">Scans the floorplan src above (as it is now) for the markers step 1
                embedded and, once at least 2 of the 4 are found, calibrates from them — no
                clicking. Same self-healing <code>home_anchors</code> as manual calibration above,
                so it also survives the home frame's canvas growing later.</p>
              ${this._fiducialDetectError?Et`<p class="hint" style="color:#ff6b6b">${this._fiducialDetectError}</p>`:Dt}
              ${this._fiducialDetectResult?Et`
                <p class="hint">✅ Found ${this._fiducialDetectResult.found}/4 marker${1===this._fiducialDetectResult.found?"":"s"}${this._fiducialDetectResult.missing.length?Et` (missing: ${this._fiducialDetectResult.missing.join(", ")})`:Dt}.</p>
              `:Dt}
            `:Dt}
            ${d?.home_anchors?.length?Et`
              <p class="hint">Calibrated: <strong>${d.home_anchors.length}</strong> anchor point${d.home_anchors.length>1?"s":""}
                against frame <code>${d.home_anchors_frame_id}</code>
                <span class="footer-link" style="margin-left:6px"
                  @click=${()=>this._setEditedImageBase({home_anchors:void 0,home_anchors_frame_id:void 0})}>Clear</span>
              </p>
            `:Dt}
          `:Dt}
        `:Dt}

        ${this._entityPicker("Map image entity",s.entity,["image"],t=>this._setMap(e,{entity:t}))}
        ${!s.entity&&this._mapEntityFor(o)?Et`
          <p class="hint">Leave blank to auto-use <code>${this._mapEntityFor(o)}</code> —
            found automatically on this vacuum's device. Set it explicitly only to
            override (e.g. a multi-map vacuum where the wrong floor's image was picked).</p>
        `:Dt}
        ${this._mapEntityFor(o)?Et`
          <button class="btn btn--sm" style="align-self:flex-start"
            @click=${()=>this._snapshotRefMap()}>
            <ha-icon icon="mdi:refresh"></ha-icon> Refresh reference map
          </button>
          <p class="hint">The preview below is a frozen snapshot, not live — it used to
            reload (and visibly flash) on every edit, since Home Assistant refreshes this
            image's URL on nearly every state update. Use this button after the robot
            explores/remaps to update it.</p>
        `:Dt}

        ${this._homeCalib?this._renderHomeCalibStep(this._homeCalib,m,b,v,_,u):this._calib&&this._calib.vacIdx===e?this._renderCalibStep(this._calib,l,m,b,v,_,u):m?Et`
          <div class="map-pos-container ${null!==this._mapRoom?"map-pos-container--active":""}"
            @click=${t=>{if(null===this._mapRoom)return;const e=t.currentTarget.getBoundingClientRect(),o=round1(clampPct((t.clientX-e.left)/e.width*100)),s=round1(clampPct((t.clientY-e.top)/e.height*100));this._setEditedRoom(this._mapRoom,{map_x:o,map_y:s})}}>
            <div class="map-preview-wrap"
              style=${Ut(this._pvAR>.1?{paddingTop:(100/this._pvAR).toFixed(2)+"%"}:{})}>
              <img class="map-preview-img" src=${m} alt="Map preview"
                @load=${t=>{const e=t.target;if(p&&e.naturalWidth&&e.naturalHeight){const t=e.naturalWidth/e.naturalHeight;Math.abs(t-this._pvAR)>.01&&(this._pvAR=t),this._pvNat?.w===e.naturalWidth&&this._pvNat?.h===e.naturalHeight||(this._pvNat={w:e.naturalWidth,h:e.naturalHeight})}}}
                style=${Ut({left:50+b+"%",top:50+v+"%",width:_+"%",transform:"translate(-50%,-50%) "+seatRotateScaleCss(u,_,f)})} />
              ${this._mergedEdit&&p&&l?Et`<img class="map-preview-img" src=${l} alt="Native map"
                style=${Ut({left:50+A.offset_x+"%",top:50+A.offset_y+"%",width:A.scale+"%",transform:"translate(-50%,-50%) "+seatRotateScaleCss(A.rotation,A.scale,A.scaleY),opacity:"0.5"})} />`:Dt}
              ${w.map((t,e)=>{const o=e===this._mapRoom,s=t.map_x??50,l=t.map_y??50;if(null!=t.map_w){const h=t.map_w,d=t.map_h??15;return Et`
                    <div class="room-rect ${o?"room-rect--active":""}"
                      style=${Ut({left:s+"%",top:l+"%",width:h+"%",height:d+"%"})}
                      @pointerdown=${o=>this._onRoomPointerDown(e,"move",t,o)}
                      @pointermove=${t=>this._onRoomPointerMove(t)}
                      @pointerup=${()=>this._onRoomPointerUp()}
                      @click=${t=>t.stopPropagation()}>
                      <ha-icon icon=${t.icon||"mdi:square"} style="--mdc-icon-size:14px"></ha-icon>
                      ${o?["nw","ne","sw","se"].map(o=>Et`
                        <div class="room-rect-handle room-rect-handle--${o}"
                          @pointerdown=${s=>this._onRoomPointerDown(e,"resize-"+o,t,s)}
                          @pointermove=${t=>this._onRoomPointerMove(t)}
                          @pointerup=${()=>this._onRoomPointerUp()}
                          @click=${t=>t.stopPropagation()}></div>
                      `):Dt}
                    </div>`}return Et`
                  <div class="pos-dot ${o?"pos-dot--active":""}"
                    style=${Ut({left:s+"%",top:l+"%"})}
                    @pointerdown=${o=>this._onRoomPointerDown(e,"move",t,o)}
                    @pointermove=${t=>this._onRoomPointerMove(t)}
                    @pointerup=${()=>this._onRoomPointerUp()}
                    @click=${t=>t.stopPropagation()}>
                    <ha-icon icon=${t.icon||"mdi:square"} style="--mdc-icon-size:14px"></ha-icon>
                  </div>`})}
            </div>
          </div>

          <div class="section-title">Map seating ${this._mergedEdit?"(this vacuum)":""}</div>
          ${T?Et`
            <p class="hint">✅ Rendered via the shared home frame — no seating needed. Status:
              <strong>${O?.status??"aligned"}</strong>${null!=O?.rotation_deg?Et` · rot ${O.rotation_deg}°`:Dt}${null!=O?.score?Et` · score ${(100*O.score).toFixed(0)}%`:Dt}.
              Its rooms, robot position and cleaning path are drawn at their exact real position
              automatically (docs/40 kontrakt v3) — the auto/manual seating and room-import controls
              below don't apply to it while this stays true.</p>
          `:Et`
            ${P?Et`
              <p class="hint">This vacuum isn't currently registered into the <code>${P.frame_id}</code>
                home frame the floorplan above was snapshotted from${O?.status?Et` (status:
                <strong>${O.status}</strong>)`:Dt} — falling back to its own seating below.</p>
            `:Dt}
            ${this._selectField("Seating","manual"===s.seat?"manual":"auto",[{value:"auto",label:"Auto — fit from rooms"},{value:"manual",label:"Manual — sliders"}],t=>this._setMap(e,{seat:"manual"===t?"manual":void 0}))}
            ${"manual"!==s.seat?$.auto?Et`
              <p class="hint">✅ Auto-fit from <strong>${$.anchorCount}</strong> room${($.anchorCount??0)>1?"s":""}:
                rot ${$.rotation}° · scale ${$.scale.toFixed(1)}% · offset ${$.offset_x.toFixed(1)}/${$.offset_y.toFixed(1)}%
                · fit error ${($.residual??0).toFixed(1)}%${($.residual??0)>3?" ⚠️ check room rectangles / keys":""}${1===$.anchorCount?" (single room — orientation estimated from its shape)":""}.
                Recomputed live — self-heals after the robot remaps.${this._rectDrag?" (overlay preview above is frozen until you release the drag)":""}</p>
            `:Et`
              <p class="hint">Auto-fit inactive — it needs the integration sensor, a floorplan and at least one
                room rectangle whose key matches a room name on this robot's map. Using the manual values below.</p>
            `:Dt}
            ${l&&m&&p?Et`
              <button class="btn btn--sm" style="align-self:flex-start"
                @click=${()=>this._startCalibration(e)}>
                <ha-icon icon="mdi:crosshairs-gps"></ha-icon> Calibrate from clicked points
              </button>
              <p class="hint">If auto-fit's fit error stays high no matter how the room rectangles are tuned,
                the rectangles' shapes likely don't match this robot's real rooms yet — no amount of rotation/
                scale can fix that. This bootstraps a correct seat instead: click the same physical point once
                on this vacuum's own map and once on the floorplan, repeated for at least 2 points — each pair
                you add shows its effect on the fit error live, so click a couple more if it's not tight enough
                yet (spread them out — corners of different rooms work well). Save once you're happy with the
                number, then use "Import missing rooms" below to place this vacuum's rooms correctly; other
                vacuums often auto-fit correctly too, once the floorplan's rectangles are accurate.</p>
            `:Dt}
            ${this._calibResult?Et`
              <p class="hint">✅ Calibrated — fit error ${this._calibResult.residual_pct}%. Now use
                "Import missing rooms from this vacuum" below to place its rooms.</p>
            `:Dt}
            ${this._calibError?Et`<p class="hint" style="color:#ff6b6b">${this._calibError}</p>`:Dt}
            ${t.length>1&&w.length>0?(()=>{const t=this._unmatchedOwnRoomNames(e);return t.length?Et`
                <p class="hint" style="color:#faad14">⚠️ This vacuum reports room${t.length>1?"s":""}
                  not on the shared floorplan yet: <strong>${t.join(", ")}</strong>. If any of these are the
                  same physical room as one already listed above under a different name, rename it to match in the
                  Roborock app (room pairing is by exact name across vacuums) — otherwise use Import below to add it.</p>
              `:Dt})():Dt}
            ${"manual"!==s.seat&&$.auto?Dt:(()=>{const t=isRot90(s.rotation??0)!==this._hvSwap,o=t?"scale_y":"scale",l=t?"scale":"scale_y",h=t?s.scale_y??s.scale??100:s.scale??100,d=t?s.scale??100:s.scale_y??s.scale??100,p=this._hvSwap?"offset_y":"offset_x",m=this._hvSwap?"offset_x":"offset_y",u=this._hvSwap?s.offset_y??0:s.offset_x??0,_=this._hvSwap?s.offset_x??0:s.offset_y??0;return Et`
                ${this._numberSlider("Rotation",s.rotation??0,0,360,90,t=>this._setMap(e,{rotation:t}),"°")}
                ${Dt}
                ${this._numberSlider("Scale ↔ (horizontal)",h,20,800,5,t=>this._setMap(e,{[o]:t}),"%")}
                ${this._numberSlider("Scale ↕ (vertical)",d,20,800,5,t=>this._setMap(e,{[l]:t}),"%")}
                ${this._numberSlider("Offset ↔ (horizontal)",u,-150,150,1,t=>this._setMap(e,{[p]:t}),"%")}
                ${this._numberSlider("Offset ↕ (vertical)",_,-150,150,1,t=>this._setMap(e,{[m]:t}),"%")}
              `})()}
            ${this._intEntityFor(o)?Et`
              <button class="btn btn--add btn--sm" style="align-self:flex-start"
                @click=${()=>this._importRooms(e)}>
                <ha-icon icon="mdi:import"></ha-icon> Import missing rooms from this vacuum
              </button>
              <p class="hint">Adds rooms this robot's map knows that aren't on the floorplan yet
                (key = Roborock room name), placed through its current seat. Import from your
                reference (whole-home) robot first; then switch to another robot to supplement
                rooms only it has — it will be seated via the rooms you already share.</p>
            `:Dt}
          `}

          ${"merged"===this._config.map_mode&&this._intEntityFor(o)&&w.length?(()=>{const t=this._roomSequence(o),e=this._roomsInSequenceOrder(w,t),s=w.filter(e=>!e.key||void 0===t[e.key]).length;return Et`
              <div class="section-title">Cleaning sequence</div>
              <p class="hint">The order configured in the Roborock app — it's dominant regardless of
                what HA sends, so the backend needs to know it to predict wet-clean timing correctly
                (docs/19). Drag to match your app's order. Shared across all vacuums/dashboards
                (backend-owned, like room pinning) — not saved in this card's config.</p>
              ${s?Et`<p class="hint" style="color:#faad14">⚠ ${s}
                room${s>1?"s":""} not yet sequenced — dragged to the end,
                ETA will be a rough estimate for ${s>1?"them":"it"} until set.</p>`:Dt}
              <div class="seq-list">
                ${e.map((s,l)=>Et`
                  <div class="seq-row ${this._dragSeq===l?"seq-row--dragging":""}"
                    @dragover=${t=>{null!==this._dragSeq&&t.preventDefault()}}
                    @drop=${t=>{t.preventDefault(),null!==this._dragSeq&&this._moveSequence(o,e,this._dragSeq,l),this._dragSeq=null}}>
                    <ha-icon icon="mdi:drag-horizontal-variant" title="Drag to reorder"
                      draggable="true" style="cursor:grab;opacity:0.5;--mdc-icon-size:18px;flex-shrink:0"
                      @dragstart=${t=>{this._dragSeq=l,t.dataTransfer&&(t.dataTransfer.effectAllowed="move")}}
                      @dragend=${()=>{this._dragSeq=null}}></ha-icon>
                    <span class="seq-pos">${l+1}</span>
                    <ha-icon icon=${s.icon||"mdi:square"} style="--mdc-icon-size:15px"></ha-icon>
                    <span class="seq-name">${s.name||s.key||"Room "+(l+1)}</span>
                    ${s.key&&void 0!==t[s.key]?Dt:Et`<span class="seq-flag" title="Not yet sequenced">?</span>`}
                  </div>`)}
              </div>
            `})():Dt}

          ${"merged"===this._config.map_mode?Et`<button class="btn btn--add btn--sm" style="align-self:flex-start;margin-top:4px" @click=${()=>this._addEditedRoom()}><ha-icon icon="mdi:plus"></ha-icon> Add room</button>`:Dt}
          ${w.length?Et`
            <div class="section-title">Room positions</div>
            <p class="hint">${null!==this._mapRoom?"Drag the dot/rectangle to move it (rectangle mode: drag a corner to resize). Tap it again to deselect, or click elsewhere on the map to jump the selected room there.":"Select a room below, then drag it on the map — or click the map to jump the selected room there."}</p>
            <div class="pill-row">
              ${w.map((t,e)=>Et`
                <button class="room-pill ${e===this._mapRoom?"room-pill--active":""}"
                  @click=${()=>{this._mapRoom=e===this._mapRoom?null:e}}>
                  <ha-icon icon=${t.icon||"mdi:square"} style="--mdc-icon-size:13px"></ha-icon>
                  ${t.name||t.key||"Room "+(e+1)}
                </button>`)}
            </div>

            ${null!==this._mapRoom?Et`
              ${"merged"===this._config.map_mode?Et`
                ${this._textField("Key (= Roborock room name)",w[this._mapRoom]?.key,t=>this._setEditedRoom(this._mapRoom,{key:t}),"Kitchen")}
                ${this._textField("Name",w[this._mapRoom]?.name,t=>this._setEditedRoom(this._mapRoom,{name:t}),"Kitchen")}
                ${this._numberSlider("Dry clean time",w[this._mapRoom]?.clean_time_dry??0,0,120,1,t=>this._setEditedRoom(this._mapRoom,{clean_time_dry:t>0?t:void 0})," min")}
                ${this._numberSlider("Wet clean time",w[this._mapRoom]?.clean_time_wet??0,0,180,1,t=>this._setEditedRoom(this._mapRoom,{clean_time_wet:t>0?t:void 0})," min")}
              `:Dt}
              <div class="section-title" style="margin-top:4px">Position</div>
              ${(()=>{const t=w[this._mapRoom],e=this._hvSwap?"map_y":"map_x",o=this._hvSwap?"map_x":"map_y",s=this._hvSwap?t?.map_y??50:t?.map_x??50,l=this._hvSwap?t?.map_x??50:t?.map_y??50;return Et`
                  ${this._numberSlider("X ↔ (horizontal)",s,0,100,.1,t=>this._setEditedRoom(this._mapRoom,{[e]:round1(t)}),"%")}
                  ${this._numberSlider("Y ↕ (vertical)",l,0,100,.1,t=>this._setEditedRoom(this._mapRoom,{[o]:round1(t)}),"%")}
                `})()}

              <div class="section-title" style="margin-top:4px">Overlay mode</div>
              ${(()=>{const t=w[this._mapRoom];if(void 0===t?.map_w)return Et`
                  <button class="btn btn--add btn--sm" style="align-self:flex-start"
                    @click=${()=>this._setEditedRoom(this._mapRoom,{map_w:20,map_h:15})}>
                    <ha-icon icon="mdi:rectangle-outline"></ha-icon> Enable rectangle overlay
                  </button>
                `;const e=this._hvSwap?"map_h":"map_w",o=this._hvSwap?"map_w":"map_h",s=this._hvSwap?t.map_h??15:t.map_w,l=this._hvSwap?t.map_w:t.map_h??15;return Et`
                  ${this._numberSlider("Width ↔ (horizontal)",s,1,100,.1,t=>this._setEditedRoom(this._mapRoom,{[e]:round1(t)}),"%")}
                  ${this._numberSlider("Height ↕ (vertical)",l,1,100,.1,t=>this._setEditedRoom(this._mapRoom,{[o]:round1(t)}),"%")}
                  <button class="btn btn--sm" style="align-self:flex-start"
                    @click=${()=>this._setEditedRoom(this._mapRoom,{map_w:void 0,map_h:void 0})}>
                    Switch to point mode
                  </button>
                `})()}

              <div class="section-title" style="margin-top:4px">Icon</div>
              ${this._iconPickerField(w[this._mapRoom]?.icon,t=>this._setEditedRoom(this._mapRoom,{icon:t}))}
              ${w[this._mapRoom]?.icon?Et`
                <div class="field">
                  <label>Icon position</label>
                  <div class="anchor-picker">
                    ${["tl","t","tr","l","c","r","bl","b","br"].map(t=>Et`<button
                        class="anchor-cell ${(w[this._mapRoom]?.icon_anchor??"c")===t?"anchor-cell--active":""}"
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
              `:Dt}
              ${"merged"===this._config.map_mode?Et`<button class="btn btn--sm" style="align-self:flex-start;margin-top:6px" @click=${()=>this._deleteEditedRoom(this._mapRoom)}><ha-icon icon="mdi:delete"></ha-icon> Delete room</button>`:Dt}
            `:Dt}
          `:Et`${"merged"===this._config.map_mode?Et`<p class="hint">No rooms yet — use "Add room" above.</p>`:Et`<p class="hint">Add rooms in the Vacuums tab to position them here.</p>`}`}
        `:Et`<p class="hint">Select a map or image above to enable the placement preview.</p>`}

        ${this._intEntityFor(o)?Et`
          <div class="section-title" style="margin-top:4px">Appearance</div>
          ${this._hexColorField("Path colour",o.path_color,t=>this._setVacuum(e,{path_color:t||void 0}),o.color?this._resolveColor(o.color,"green"):te[e%te.length])}
          ${this._numberSlider("Path width",o.path_width??100,20,300,10,t=>this._setVacuum(e,{path_width:t}),"%")}
          ${this._hexColorField("Mop band colour",o.mop_path_color,t=>this._setVacuum(e,{mop_path_color:t||void 0}),"#40a9ff")}
          ${this._numberSlider("Mop band opacity",o.mop_band_opacity??28,0,100,5,t=>this._setVacuum(e,{mop_band_opacity:t}),"%")}
          ${this._numberSlider("Mop band width",o.mop_band_width??100,20,400,10,t=>this._setVacuum(e,{mop_band_width:t}),"%")}
          ${o.image?this._selectField("Robot image on map (uses status image)",o.robot_image_on_map?"yes":"no",[{value:"no",label:"no"},{value:"yes",label:"yes"}],t=>this._setVacuum(e,{robot_image_on_map:"yes"===t})):Dt}
          ${o.robot_image_on_map?this._numberSlider("Robot image size",o.robot_size??100,40,220,10,t=>this._setVacuum(e,{robot_size:t}),"%"):Dt}
          ${o.robot_image_on_map?this._numberSlider("Robot image rotation",o.robot_image_rotation??0,-180,180,15,t=>this._setVacuum(e,{robot_image_rotation:t}),"°"):Dt}
        `:Dt}

        ${this._numberSlider("Card height (0=auto)",("merged"===this._config.map_mode?this._config.base_height:o.base_height)??0,0,700,10,t=>"merged"===this._config.map_mode?this._setConfig({base_height:t>0?t:void 0}):this._setVacuum(e,{base_height:t>0?t:void 0}),"px")}

      </div>`}_dbgRow(t,e){return Et`<div class="field field--row">
      <label>${t}</label>
      <span style="font-size:12px;font-family:monospace;word-break:break-all">${null==e||""===e?"—":String(e)}</span>
    </div>`}_renderDebugTab(){const fmt=t=>{try{return JSON.stringify(t,null,1)}catch{return String(t)}},t="font-size:11px;font-family:monospace;white-space:pre-wrap;word-break:break-all;background:rgba(127,127,127,0.12);padding:6px;border-radius:6px;margin:0;max-height:220px;overflow:auto";return Et`
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
        ${this._config.vacuums.map(e=>{const o=this._intEntityFor(e),s=o?this.hass.states[o]:void 0,l=s?.attributes??{},h=l.mop_signal??{};return Et`
            <div class="section-title">${e.name??e.entity}</div>
            <div class="sub-section">
              ${o?s?Et`
                    ${this._dbgRow("sensor",`${o} = ${s.state}`)}
                    ${this._dbgRow("schema_version",l.schema_version)}
                    ${this._dbgRow("pipeline_ok",l.pipeline_ok)}
                    ${this._dbgRow("clean_type",l.clean_type)}
                    ${this._dbgRow("in_cleaning",l.in_cleaning)}
                    ${this._dbgRow("vacuum_room_name",l.vacuum_room_name)}
                    ${this._dbgRow("water_mode_name",h.water_mode_name)}
                    ${this._dbgRow("fan_speed_name",h.fan_speed_name)}
                    ${this._dbgRow("path pts (decimated)",Array.isArray(l.path)?l.path.length:"—")}
                    ${this._dbgRow("path pts (raw)",l.path_points)}
                    ${this._dbgRow("mop pts (raw)",l.mop_path_points)}
                    <div class="sub-title">calib — last single-room decision</div>
                    <pre style=${t}>${fmt(l.calib_debug)}</pre>
                    <div class="sub-title">rooms_estimate (per vacuum)</div>
                    <pre style=${t}>${fmt(l.rooms_estimate)}</pre>
                    <div class="sub-title">rooms_last_cleaned (cross-vacuum)</div>
                    <pre style=${t}>${fmt(l.rooms_last_cleaned)}</pre>
                    <div class="sub-title">rooms_progress — spatial % + time ratio (live)</div>
                    <pre style=${t}>${fmt(l.rooms_progress)}</pre>
                    <div class="sub-title">rooms (geometry — for spatial coverage)</div>
                    <pre style=${t}>${fmt((l.rooms??[]).map(t=>({name:t.name,bbox_px:t.bbox_px,x0:t.x0,y0:t.y0,x1:t.x1,y1:t.y1})))}</pre>
                    <details><summary class="hint" style="cursor:pointer">Raw attributes</summary><pre style=${t}>${fmt(l)}</pre></details>
                  `:Et`<p class="hint">Sensor <code>${o}</code> not found.</p>`:Et`<p class="hint">No AnyVac integration sensor found (config or auto-resolve) — backend values unavailable.</p>`}
            </div>`})}
      </div>
    `}_renderGlobalTab(){const t=this._config.global_actions??[],e=this._config.room_thresholds??$e;return Et`
      <div class="tab-body">

        <div class="section-title">Appearance</div>
        ${this._selectField("Theme",this._config.theme??oe,[{value:"dark",label:"Dark — lifted surfaces, soft elevation"},{value:"light",label:"Light — for a light HA theme"},{value:"auto",label:"Auto — follow the system setting"},{value:"legacy",label:"Legacy — the pre-1.2.0 look"}],t=>this._setConfig({theme:t===oe?void 0:t}))}
        <p class="hint">Before 1.2.0 the card was dark-only and unreadable on a light dashboard.
          "Legacy" is the exact previous appearance, kept as a way back if a dashboard was
          tuned around it.</p>

        ${this._hexColorField("Accent colour",this._config.accent,t=>this._setConfig({accent:t||void 0}),se)}
        <div class="hex-color-row" style="flex-wrap:wrap;gap:6px;margin:-4px 0 0">
          ${ae.map(t=>{const e=(this._config.accent??se).toLowerCase()===t.hex.toLowerCase();return Et`<button type="button" title=${t.label}
              style=${"width:24px;height:24px;padding:0;border-radius:50%;cursor:pointer;background:"+t.hex+";border:2px solid "+(e?"#fff":"transparent")+";box-shadow:0 0 0 1px rgba(0,0,0,0.35)"}
              @click=${()=>this._setConfig({accent:t.hex})}></button>`})}
        </div>
        <p class="hint">Drives the primary action (START), room selection and focus rings.
          Status colours are deliberately left alone — their saturation carries meaning
          (cleaning / mopping / error), not taste.</p>

        <div class="field field--row">
          <label>Calm resting state</label>
          <label class="toggle-wrap">
            <input type="checkbox" class="toggle-input"
              .checked=${!1!==this._config.calm_state}
              @change=${t=>this._setConfig({calm_state:!!t.target.checked&&void 0})} />
            <span class="toggle-track"></span>
          </label>
        </div>
        <p class="hint">When nothing is running and nothing is selected, the leftover map trace
          and the secondary numbers step back so the one thing worth touching stands out.
          Nothing is hidden or disabled — it's purely de-emphasis.</p>

        <div class="field field--row">
          <label>Reduce motion</label>
          <label class="toggle-wrap">
            <input type="checkbox" class="toggle-input"
              .checked=${!!this._config.reduce_motion}
              @change=${t=>this._setConfig({reduce_motion:!!t.target.checked||void 0})} />
            <span class="toggle-track"></span>
          </label>
        </div>
        <p class="hint">Turns off the press feedback and the live pulses. Your operating
          system's own "reduce motion" setting already does this on its own — this is for
          switching them off without changing that.</p>

        <div class="section-title" style="margin-top:4px">Layout</div>
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

        ${this._config.layout?Et`
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
        `:Dt}

        <div class="section-title" style="margin-top:4px">Controller</div>
        ${this._selectField("Mode",this._config.ui_mode??"auto",[{value:"auto",label:"Auto — one orchestrated controller"},{value:"manual",label:"Manual — per-robot controllers"}],t=>this._setConfig({ui_mode:t}))}

        <div class="section-title" style="margin-top:4px">Global presets (Auto mode)</div>
        <p class="hint">Targeted whole-home cleans for Auto mode (e.g. "After dinner", "Whole home"). The integration decides which robots and the order; you pick the scope.</p>
        ${(this._config.global_presets??[]).map((t,e)=>Et`
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
        ${0===t.length?Et`<p class="hint">None configured.</p>`:t.map((t,e)=>this._renderGlobalAccordion(t,e))}
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
        ${e.map((t,o)=>Et`
          <div class="var-row threshold-row">
            <span class="threshold-label">≤</span>
            <input type="number" class="text-input text-input--sm threshold-days"
              min="0" max="365" .value=${String(t.days)}
              @change=${t=>{const s=parseInt(t.target.value),l=e.map((t,e)=>e===o?{...t,days:isNaN(s)?t.days:s}:t);this._setConfig({room_thresholds:l})}} />
            <span class="threshold-label">days</span>
            <input type="color" class="threshold-color" .value=${t.color}
              @input=${t=>{const s=t.target.value,l=e.map((t,e)=>e===o?{...t,color:s}:t);this._setConfig({room_thresholds:l})}} />
            <button class="icon-btn icon-btn--danger icon-btn--sm"
              @click=${()=>{const t=e.filter((t,e)=>e!==o);this._setConfig({room_thresholds:t.length?t:void 0})}}>
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          </div>`)}
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <button class="btn btn--add btn--sm" @click=${()=>this._setConfig({room_thresholds:[...e,{days:14,color:"#ff4d4f"}]})}>
            <ha-icon icon="mdi:plus"></ha-icon> Add threshold
          </button>
          ${this._config.room_thresholds?Et`
            <button class="btn btn--sm" @click=${()=>this._setConfig({room_thresholds:void 0})}>
              Reset to defaults
            </button>
          `:Dt}
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

        ${(()=>{const t=this._config.vacuums.some(t=>"native-area"===t.clean_action?.type);if(!t)return Dt;const e=[...new Set(this._config.vacuums.flatMap(t=>(t.rooms??[]).map(t=>t.key)).filter(Boolean))].sort(),o=this._config.area_mappings??{};return Et`
            <div class="section-title" style="margin-top:4px">Area mappings</div>
            <p class="hint">Maps room keys to HA areas for the <strong>native-area</strong> strategy (degraded mode only — irrelevant once the AnyVac integration is active for a vacuum). Set once here — applies to all vacuums.</p>
            ${0===e.length?Et`<p class="hint">No rooms configured yet.</p>`:e.map(t=>this._areaPicker(t,o[t],e=>{const s={...o};e?s[t]=e:delete s[t],this._setConfig({area_mappings:Object.keys(s).length?s:void 0})}))}
          `})()}

      </div>`}_renderGlobalAccordion(t,e){const o=this._resolveColor(t.color,"orange"),s=this._openGlobal.has(e),l=t.action,h=t.watch_entities??[];return Et`
      <div class="acc-row" style=${Ut({borderLeft:"3px solid "+o})}>
        <div class="acc-header" @click=${()=>this._toggleGlobal(e)}>
          ${t.image?Et`<img class="acc-img" src=${t.image} alt=${t.name} />`:Et`<ha-icon icon="mdi:home-floor-a" style=${Ut({color:o,width:"36px",height:"36px"})}></ha-icon>`}
          <div class="acc-info">
            <span class="acc-name">${t.name||"Unnamed action"}</span>
            <span class="acc-sub">${"script"===l.type?l.entity_id:l.service}</span>
          </div>
          <button class="icon-btn icon-btn--danger"
            @click=${t=>{t.stopPropagation(),this._deleteGlobal(e)}}>
            <ha-icon icon="mdi:delete"></ha-icon>
          </button>
          <ha-icon icon=${s?"mdi:chevron-up":"mdi:chevron-down"} class="acc-chevron"></ha-icon>
        </div>
        ${s?Et`
          <div class="acc-body">
            ${this._textField("Display name",t.name,t=>this._setGlobal(e,{name:t}),"e.g. Whole flat")}
            ${this._textField("Image path",t.image,t=>this._setGlobal(e,{image:t||void 0}),"/local/...")}
            ${this._hexColorField("Accent colour",t.color?this._resolveColor(t.color,"orange"):void 0,t=>this._setGlobal(e,{color:t||void 0}),"#faad14")}

            <div class="sub-title">Watch entities (badge glows when any is cleaning)</div>
            ${h.map((t,o)=>Et`
              <div class="var-row">
                <ha-entity-picker .hass=${this.hass} .value=${t} .includeDomains=${["vacuum"]}
                  allow-custom-entity style="flex:1"
                  @value-changed=${t=>{const s=[...h];s[o]=t.detail.value,this._setGlobal(e,{watch_entities:s.filter(Boolean)})}}></ha-entity-picker>
                <button class="icon-btn icon-btn--danger icon-btn--sm"
                  @click=${()=>this._setGlobal(e,{watch_entities:h.filter((t,e)=>e!==o)})}>
                  <ha-icon icon="mdi:close"></ha-icon>
                </button>
              </div>`)}
            <button class="btn btn--add btn--sm"
              @click=${()=>this._setGlobal(e,{watch_entities:[...h,""]})}>
              <ha-icon icon="mdi:plus"></ha-icon> Add entity
            </button>

            <div class="sub-title">Action (hold-to-activate)</div>
            ${this._selectField("Type",l.type,[{value:"script",label:"Script"},{value:"service",label:"Service call"}],t=>this._setGlobal(e,{action:"script"===t?{type:"script",entity_id:""}:{type:"service",service:""}}))}
            ${"script"===l.type?this._entityPicker("Script entity",l.entity_id,["script"],t=>this._setGlobalAction(e,{entity_id:t})):this._textField("Service",l.service,t=>this._setGlobalAction(e,{service:t}),"e.g. script.celkovy_uklid_bytu")}
          </div>
        `:Dt}
      </div>`}render(){return this._config?Et`
      <datalist id="ha-entities"></datalist>
      <div class="editor-root">
        <div class="tabs-bar">
          ${["vacuums","maps","global"].map(t=>Et`
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
          <span>anyvac-card v${Xt}</span>
        </div>
      </div>`:Dt}};ke.styles=i$6`
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

    /* ── Manual calibration from clicked points (docs/39) ──
       docs/39 §9: the click target needs to be BIG on screen — the editor's
       own column can be a few hundred px wide (or less on mobile), which
       turns any click imprecision into a proportionally large geometric
       error no amount of averaging fully cures. Rendered as a fixed
       full-viewport overlay instead of inline, so the image is as large as
       the whole screen allows regardless of how narrow the surrounding form
       is — the click-handling math (_onCalibRawClick/_onCalibFloorClick)
       is a plain ratio of the clicked element's own boundingClientRect, so
       it's completely unaffected by how big that rect actually renders. */
    .calib-overlay {
      position:fixed; inset:0; z-index:1000;
      background:rgba(0,0,0,.85);
      display:flex; flex-direction:column; gap:10px;
      padding:14px; box-sizing:border-box; overflow:auto;
    }
    .calib-banner {
      flex:0 0 auto;
      display:flex; align-items:center; justify-content:space-between; gap:8px;
      padding:8px 10px; border-radius:8px;
      background:rgba(250,173,20,.15); border:1px solid rgba(250,173,20,.4);
      font-size:12px; color:#fff;
    }
    .calib-stage {
      flex:1 1 auto; min-height:0;
      display:flex; align-items:center; justify-content:center;
    }
    /* Sized from the image's own aspect ratio (--calib-ar, set inline per
       render) via CSS alone — as wide/tall as the viewport allows (92vw by
       92vh, whichever the aspect ratio hits first), no JS measurement needed. */
    .calib-stage .map-preview-wrap {
      position:relative; overflow:hidden; border-radius:8px;
      background:rgba(255,255,255,.06);
      width:min(92vw, calc(88vh * var(--calib-ar, 1.5)));
      /* Overrides the base rule's padding-top aspect-ratio hack — this one
         uses the aspect-ratio property instead, driven by --calib-ar, so
         width can be computed from viewport units without any JS measuring. */
      padding-top:0;
      aspect-ratio:var(--calib-ar, 1.5);
    }
    .calib-marker {
      position:absolute; transform:translate(-50%,-50%);
      width:28px; height:28px; border-radius:50%;
      background:rgba(250,173,20,.85); border:2px solid white;
      display:flex; align-items:center; justify-content:center;
      color:#000; font-size:14px; font-weight:700;
      pointer-events:none;
    }

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
    .slider-val-wrap { display:flex; align-items:center; gap:2px; flex-shrink:0; }
    .slider-val-input {
      width:48px; text-align:right; font-size:13px; font-weight:600; color:var(--primary-color);
      font-family:inherit; border:none; border-radius:4px; background:transparent; padding:2px 3px;
      -moz-appearance:textfield;
    }
    .slider-val-input:hover, .slider-val-input:focus {
      background:var(--secondary-background-color,rgba(127,127,127,.15)); outline:none;
    }
    .slider-val-input::-webkit-outer-spin-button,
    .slider-val-input::-webkit-inner-spin-button { -webkit-appearance:none; margin:0; }
    .slider-val-suffix { font-size:13px; font-weight:600; color:var(--primary-color); }

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
  `,__decorate([n$1({attribute:!1})],ke.prototype,"hass",void 0),__decorate([r()],ke.prototype,"_config",void 0),__decorate([r()],ke.prototype,"_tab",void 0),__decorate([r()],ke.prototype,"_dragRoom",void 0),__decorate([r()],ke.prototype,"_dragSeq",void 0),__decorate([r()],ke.prototype,"_openVac",void 0),__decorate([r()],ke.prototype,"_openSensors",void 0),__decorate([r()],ke.prototype,"_openPresets",void 0),__decorate([r()],ke.prototype,"_openAction",void 0),__decorate([r()],ke.prototype,"_openGlobal",void 0),__decorate([r()],ke.prototype,"_openRoom",void 0),__decorate([r()],ke.prototype,"_mapVac",void 0),__decorate([r()],ke.prototype,"_mapRoom",void 0),__decorate([r()],ke.prototype,"_hvSwap",void 0),__decorate([r()],ke.prototype,"_pvAR",void 0),__decorate([r()],ke.prototype,"_pvNat",void 0),__decorate([r()],ke.prototype,"_refMapUrl",void 0),__decorate([r()],ke.prototype,"_floorplanSnapshotBusy",void 0),__decorate([r()],ke.prototype,"_floorplanSnapshotError",void 0),__decorate([r()],ke.prototype,"_homeFrameSnapshotBusy",void 0),__decorate([r()],ke.prototype,"_homeFrameSnapshotError",void 0),__decorate([r()],ke.prototype,"_guideExportBusy",void 0),__decorate([r()],ke.prototype,"_guideExportError",void 0),__decorate([r()],ke.prototype,"_guideExportResult",void 0),__decorate([r()],ke.prototype,"_placeRoomsResult",void 0),__decorate([r()],ke.prototype,"_calib",void 0),__decorate([r()],ke.prototype,"_refNat",void 0),__decorate([r()],ke.prototype,"_calibResult",void 0),__decorate([r()],ke.prototype,"_calibError",void 0),__decorate([r()],ke.prototype,"_homeCalib",void 0),__decorate([r()],ke.prototype,"_homeCalibSnapshotUrl",void 0),__decorate([r()],ke.prototype,"_homeCalibCrop",void 0),__decorate([r()],ke.prototype,"_homeCalibFrameId",void 0),__decorate([r()],ke.prototype,"_homeCalibBusy",void 0),__decorate([r()],ke.prototype,"_homeCalibError",void 0),__decorate([r()],ke.prototype,"_homeCalibResult",void 0),__decorate([r()],ke.prototype,"_fiducialKnown",void 0),__decorate([r()],ke.prototype,"_fiducialSnapshotBusy",void 0),__decorate([r()],ke.prototype,"_fiducialSnapshotError",void 0),__decorate([r()],ke.prototype,"_fiducialDetectBusy",void 0),__decorate([r()],ke.prototype,"_fiducialDetectError",void 0),__decorate([r()],ke.prototype,"_fiducialDetectResult",void 0),ke=__decorate([t$1(Kt)],ke);export{ge as AnyVacCard,ke as AnyVacCardEditor};
