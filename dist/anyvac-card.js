/* AnyVac Card — https://github.com/Michailjovic/anyvac-card */
function __decorate(e,o,s,l){var h,d=arguments.length,p=d<3?o:null===l?l=Object.getOwnPropertyDescriptor(o,s):l;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)p=Reflect.decorate(e,o,s,l);else for(var u=e.length-1;u>=0;u--)(h=e[u])&&(p=(d<3?h(p):d>3?h(o,s,p):h(o,s))||p);return d>3&&p&&Object.defineProperty(o,s,p),p}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=globalThis,o=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),l=new WeakMap;let h=class n{constructor(e,o,l){if(this._$cssResult$=!0,l!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=o}get styleSheet(){let e=this.o;const s=this.t;if(o&&void 0===e){const o=void 0!==s&&1===s.length;o&&(e=l.get(s)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),o&&l.set(s,e))}return e}toString(){return this.cssText}};const i$6=(e,...o)=>{const l=1===e.length?e[0]:o.reduce((o,s,l)=>o+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+e[l+1],e[0]);return new h(l,e,s)},d=o?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let o="";for(const s of e.cssRules)o+=s.cssText;return(e=>new h("string"==typeof e?e:e+"",void 0,s))(o)})(e):e,{is:p,defineProperty:u,getOwnPropertyDescriptor:m,getOwnPropertyNames:_,getOwnPropertySymbols:f,getPrototypeOf:v}=Object,b=globalThis,w=b.trustedTypes,$=w?w.emptyScript:"",C=b.reactiveElementPolyfillSupport,d$2=(e,o)=>e,A={toAttribute(e,o){switch(o){case Boolean:e=e?$:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,o){let s=e;switch(o){case Boolean:s=null!==e;break;case Number:s=null===e?null:Number(e);break;case Object:case Array:try{s=JSON.parse(e)}catch(e){s=null}}return s}},f$2=(e,o)=>!p(e,o),F={attribute:!0,type:String,converter:A,reflect:!1,useDefault:!1,hasChanged:f$2};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),b.litPropertyMetadata??=new WeakMap;let E=class y extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,o=F){if(o.state&&(o.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((o=Object.create(o)).wrapped=!0),this.elementProperties.set(e,o),!o.noAccessor){const s=Symbol(),l=this.getPropertyDescriptor(e,s,o);void 0!==l&&u(this.prototype,e,l)}}static getPropertyDescriptor(e,o,s){const{get:l,set:h}=m(this.prototype,e)??{get(){return this[o]},set(e){this[o]=e}};return{get:l,set(o){const d=l?.call(this);h?.call(this,o),this.requestUpdate(e,d,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??F}static _$Ei(){if(this.hasOwnProperty(d$2("elementProperties")))return;const e=v(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(d$2("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(d$2("properties"))){const e=this.properties,o=[..._(e),...f(e)];for(const s of o)this.createProperty(s,e[s])}const e=this[Symbol.metadata];if(null!==e){const o=litPropertyMetadata.get(e);if(void 0!==o)for(const[e,s]of o)this.elementProperties.set(e,s)}this._$Eh=new Map;for(const[e,o]of this.elementProperties){const s=this._$Eu(e,o);void 0!==s&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const o=[];if(Array.isArray(e)){const s=new Set(e.flat(1/0).reverse());for(const e of s)o.unshift(d(e))}else void 0!==e&&o.push(d(e));return o}static _$Eu(e,o){const s=o.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,o=this.constructor.elementProperties;for(const s of o.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const s=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((s,l)=>{if(o)s.adoptedStyleSheets=l.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const o of l){const l=document.createElement("style"),h=e.litNonce;void 0!==h&&l.setAttribute("nonce",h),l.textContent=o.cssText,s.appendChild(l)}})(s,this.constructor.elementStyles),s}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,o,s){this._$AK(e,s)}_$ET(e,o){const s=this.constructor.elementProperties.get(e),l=this.constructor._$Eu(e,s);if(void 0!==l&&!0===s.reflect){const h=(void 0!==s.converter?.toAttribute?s.converter:A).toAttribute(o,s.type);this._$Em=e,null==h?this.removeAttribute(l):this.setAttribute(l,h),this._$Em=null}}_$AK(e,o){const s=this.constructor,l=s._$Eh.get(e);if(void 0!==l&&this._$Em!==l){const e=s.getPropertyOptions(l),h="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:A;this._$Em=l;const d=h.fromAttribute(o,e.type);this[l]=d??this._$Ej?.get(l)??d,this._$Em=null}}requestUpdate(e,o,s,l=!1,h){if(void 0!==e){const d=this.constructor;if(!1===l&&(h=this[e]),s??=d.getPropertyOptions(e),!((s.hasChanged??f$2)(h,o)||s.useDefault&&s.reflect&&h===this._$Ej?.get(e)&&!this.hasAttribute(d._$Eu(e,s))))return;this.C(e,o,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,o,{useDefault:s,reflect:l,wrapped:h},d){s&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,d??o??this[e]),!0!==h||void 0!==d)||(this._$AL.has(e)||(this.hasUpdated||s||(o=void 0),this._$AL.set(e,o)),!0===l&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,o]of this._$Ep)this[e]=o;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[o,s]of e){const{wrapped:e}=s,l=this[o];!0!==e||this._$AL.has(o)||void 0===l||this.C(o,void 0,s,l)}}let e=!1;const o=this._$AL;try{e=this.shouldUpdate(o),e?(this.willUpdate(o),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(o)):this._$EM()}catch(o){throw e=!1,this._$EM(),o}e&&this._$AE(o)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};E.elementStyles=[],E.shadowRootOptions={mode:"open"},E[d$2("elementProperties")]=new Map,E[d$2("finalized")]=new Map,C?.({ReactiveElement:E}),(b.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const T=globalThis,i$4=e=>e,O=T.trustedTypes,B=O?O.createPolicy("lit-html",{createHTML:e=>e}):void 0,q="$lit$",j=`lit$${Math.random().toFixed(9).slice(2)}$`,G="?"+j,U=`<${G}>`,W=document,c$1=()=>W.createComment(""),a$1=e=>null===e||"object"!=typeof e&&"function"!=typeof e,Y=Array.isArray,K="[ \t\n\f\r]",X=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,J=/-->/g,Q=/>/g,tt=RegExp(`>|${K}(?:([^\\s"'>=/]+)(${K}*=${K}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),et=/'/g,ot=/"/g,it=/^(?:script|style|textarea|title)$/i,st=Symbol.for("lit-noChange"),nt=Symbol.for("lit-nothing"),rt=new WeakMap,lt=W.createTreeWalker(W,129);function V$1(e,o){if(!Y(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==B?B.createHTML(o):o}let ct=class S{constructor({strings:e,_$litType$:o},s){let l;this.parts=[];let h=0,d=0;const p=e.length-1,u=this.parts,[m,_]=((e,o)=>{const s=e.length-1,l=[];let h,d=2===o?"<svg>":3===o?"<math>":"",p=X;for(let o=0;o<s;o++){const s=e[o];let u,m,_=-1,f=0;for(;f<s.length&&(p.lastIndex=f,m=p.exec(s),null!==m);)f=p.lastIndex,p===X?"!--"===m[1]?p=J:void 0!==m[1]?p=Q:void 0!==m[2]?(it.test(m[2])&&(h=RegExp("</"+m[2],"g")),p=tt):void 0!==m[3]&&(p=tt):p===tt?">"===m[0]?(p=h??X,_=-1):void 0===m[1]?_=-2:(_=p.lastIndex-m[2].length,u=m[1],p=void 0===m[3]?tt:'"'===m[3]?ot:et):p===ot||p===et?p=tt:p===J||p===Q?p=X:(p=tt,h=void 0);const v=p===tt&&e[o+1].startsWith("/>")?" ":"";d+=p===X?s+U:_>=0?(l.push(u),s.slice(0,_)+q+s.slice(_)+j+v):s+j+(-2===_?o:v)}return[V$1(e,d+(e[s]||"<?>")+(2===o?"</svg>":3===o?"</math>":"")),l]})(e,o);if(this.el=S.createElement(m,s),lt.currentNode=this.el.content,2===o||3===o){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(l=lt.nextNode())&&u.length<p;){if(1===l.nodeType){if(l.hasAttributes())for(const e of l.getAttributeNames())if(e.endsWith(q)){const o=_[d++],s=l.getAttribute(e).split(j),p=/([.?@])?(.*)/.exec(o);u.push({type:1,index:h,name:p[2],strings:s,ctor:"."===p[1]?ut:"?"===p[1]?mt:"@"===p[1]?gt:pt}),l.removeAttribute(e)}else e.startsWith(j)&&(u.push({type:6,index:h}),l.removeAttribute(e));if(it.test(l.tagName)){const e=l.textContent.split(j),o=e.length-1;if(o>0){l.textContent=O?O.emptyScript:"";for(let s=0;s<o;s++)l.append(e[s],c$1()),lt.nextNode(),u.push({type:2,index:++h});l.append(e[o],c$1())}}}else if(8===l.nodeType)if(l.data===G)u.push({type:2,index:h});else{let e=-1;for(;-1!==(e=l.data.indexOf(j,e+1));)u.push({type:7,index:h}),e+=j.length-1}h++}}static createElement(e,o){const s=W.createElement("template");return s.innerHTML=e,s}};function M$1(e,o,s=e,l){if(o===st)return o;let h=void 0!==l?s._$Co?.[l]:s._$Cl;const d=a$1(o)?void 0:o._$litDirective$;return h?.constructor!==d&&(h?._$AO?.(!1),void 0===d?h=void 0:(h=new d(e),h._$AT(e,s,l)),void 0!==l?(s._$Co??=[])[l]=h:s._$Cl=h),void 0!==h&&(o=M$1(e,h._$AS(e,o.values),h,l)),o}let ht=class R{constructor(e,o){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=o}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:o},parts:s}=this._$AD,l=(e?.creationScope??W).importNode(o,!0);lt.currentNode=l;let h=lt.nextNode(),d=0,p=0,u=s[0];for(;void 0!==u;){if(d===u.index){let o;2===u.type?o=new dt(h,h.nextSibling,this,e):1===u.type?o=new u.ctor(h,u.name,u.strings,this,e):6===u.type&&(o=new _t(h,this,e)),this._$AV.push(o),u=s[++p]}d!==u?.index&&(h=lt.nextNode(),d++)}return lt.currentNode=W,l}p(e){let o=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(e,s,o),o+=s.strings.length-2):s._$AI(e[o])),o++}},dt=class k{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,o,s,l){this.type=2,this._$AH=nt,this._$AN=void 0,this._$AA=e,this._$AB=o,this._$AM=s,this.options=l,this._$Cv=l?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const o=this._$AM;return void 0!==o&&11===e?.nodeType&&(e=o.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,o=this){e=M$1(this,e,o),a$1(e)?e===nt||null==e||""===e?(this._$AH!==nt&&this._$AR(),this._$AH=nt):e!==this._$AH&&e!==st&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>Y(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==nt&&a$1(this._$AH)?this._$AA.nextSibling.data=e:this.T(W.createTextNode(e)),this._$AH=e}$(e){const{values:o,_$litType$:s}=e,l="number"==typeof s?this._$AC(e):(void 0===s.el&&(s.el=ct.createElement(V$1(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===l)this._$AH.p(o);else{const e=new ht(l,this),s=e.u(this.options);e.p(o),this.T(s),this._$AH=e}}_$AC(e){let o=rt.get(e.strings);return void 0===o&&rt.set(e.strings,o=new ct(e)),o}k(e){Y(this._$AH)||(this._$AH=[],this._$AR());const o=this._$AH;let s,l=0;for(const h of e)l===o.length?o.push(s=new k(this.O(c$1()),this.O(c$1()),this,this.options)):s=o[l],s._$AI(h),l++;l<o.length&&(this._$AR(s&&s._$AB.nextSibling,l),o.length=l)}_$AR(e=this._$AA.nextSibling,o){for(this._$AP?.(!1,!0,o);e!==this._$AB;){const o=i$4(e).nextSibling;i$4(e).remove(),e=o}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}},pt=class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,o,s,l,h){this.type=1,this._$AH=nt,this._$AN=void 0,this.element=e,this.name=o,this._$AM=l,this.options=h,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=nt}_$AI(e,o=this,s,l){const h=this.strings;let d=!1;if(void 0===h)e=M$1(this,e,o,0),d=!a$1(e)||e!==this._$AH&&e!==st,d&&(this._$AH=e);else{const l=e;let p,u;for(e=h[0],p=0;p<h.length-1;p++)u=M$1(this,l[s+p],o,p),u===st&&(u=this._$AH[p]),d||=!a$1(u)||u!==this._$AH[p],u===nt?e=nt:e!==nt&&(e+=(u??"")+h[p+1]),this._$AH[p]=u}d&&!l&&this.j(e)}j(e){e===nt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},ut=class I extends pt{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===nt?void 0:e}},mt=class L extends pt{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==nt)}},gt=class z extends pt{constructor(e,o,s,l,h){super(e,o,s,l,h),this.type=5}_$AI(e,o=this){if((e=M$1(this,e,o,0)??nt)===st)return;const s=this._$AH,l=e===nt&&s!==nt||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,h=e!==nt&&(s===nt||l);l&&this.element.removeEventListener(this.name,this,s),h&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},_t=class Z{constructor(e,o,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=o,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){M$1(this,e)}};const ft=T.litHtmlPolyfillSupport;ft?.(ct,dt),(T.litHtmlVersions??=[]).push("3.3.3");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const vt=globalThis,i$3=e=>e,bt=vt.trustedTypes,yt=bt?bt.createPolicy("lit-html",{createHTML:e=>e}):void 0,xt="$lit$",wt=`lit$${Math.random().toFixed(9).slice(2)}$`,$t="?"+wt,kt=`<${$t}>`,St=document,c=()=>St.createComment(""),a=e=>null===e||"object"!=typeof e&&"function"!=typeof e,Ct=Array.isArray,At="[ \t\n\f\r]",Mt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Rt=/-->/g,Pt=/>/g,Ft=RegExp(`>|${At}(?:([^\\s"'>=/]+)(${At}*=${At}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),zt=/'/g,Et=/"/g,Tt=/^(?:script|style|textarea|title)$/i,x=e=>(o,...s)=>({_$litType$:e,strings:o,values:s}),Dt=x(1),Nt=x(2),Ht=Symbol.for("lit-noChange"),It=Symbol.for("lit-nothing"),Ot=new WeakMap,Bt=St.createTreeWalker(St,129);function V(e,o){if(!Ct(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==yt?yt.createHTML(o):o}const N=(e,o)=>{const s=e.length-1,l=[];let h,d=2===o?"<svg>":3===o?"<math>":"",p=Mt;for(let o=0;o<s;o++){const s=e[o];let u,m,_=-1,f=0;for(;f<s.length&&(p.lastIndex=f,m=p.exec(s),null!==m);)f=p.lastIndex,p===Mt?"!--"===m[1]?p=Rt:void 0!==m[1]?p=Pt:void 0!==m[2]?(Tt.test(m[2])&&(h=RegExp("</"+m[2],"g")),p=Ft):void 0!==m[3]&&(p=Ft):p===Ft?">"===m[0]?(p=h??Mt,_=-1):void 0===m[1]?_=-2:(_=p.lastIndex-m[2].length,u=m[1],p=void 0===m[3]?Ft:'"'===m[3]?Et:zt):p===Et||p===zt?p=Ft:p===Rt||p===Pt?p=Mt:(p=Ft,h=void 0);const v=p===Ft&&e[o+1].startsWith("/>")?" ":"";d+=p===Mt?s+kt:_>=0?(l.push(u),s.slice(0,_)+xt+s.slice(_)+wt+v):s+wt+(-2===_?o:v)}return[V(e,d+(e[s]||"<?>")+(2===o?"</svg>":3===o?"</math>":"")),l]};class S{constructor({strings:e,_$litType$:o},s){let l;this.parts=[];let h=0,d=0;const p=e.length-1,u=this.parts,[m,_]=N(e,o);if(this.el=S.createElement(m,s),Bt.currentNode=this.el.content,2===o||3===o){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(l=Bt.nextNode())&&u.length<p;){if(1===l.nodeType){if(l.hasAttributes())for(const e of l.getAttributeNames())if(e.endsWith(xt)){const o=_[d++],s=l.getAttribute(e).split(wt),p=/([.?@])?(.*)/.exec(o);u.push({type:1,index:h,name:p[2],strings:s,ctor:"."===p[1]?I:"?"===p[1]?L:"@"===p[1]?z:H}),l.removeAttribute(e)}else e.startsWith(wt)&&(u.push({type:6,index:h}),l.removeAttribute(e));if(Tt.test(l.tagName)){const e=l.textContent.split(wt),o=e.length-1;if(o>0){l.textContent=bt?bt.emptyScript:"";for(let s=0;s<o;s++)l.append(e[s],c()),Bt.nextNode(),u.push({type:2,index:++h});l.append(e[o],c())}}}else if(8===l.nodeType)if(l.data===$t)u.push({type:2,index:h});else{let e=-1;for(;-1!==(e=l.data.indexOf(wt,e+1));)u.push({type:7,index:h}),e+=wt.length-1}h++}}static createElement(e,o){const s=St.createElement("template");return s.innerHTML=e,s}}function M(e,o,s=e,l){if(o===Ht)return o;let h=void 0!==l?s._$Co?.[l]:s._$Cl;const d=a(o)?void 0:o._$litDirective$;return h?.constructor!==d&&(h?._$AO?.(!1),void 0===d?h=void 0:(h=new d(e),h._$AT(e,s,l)),void 0!==l?(s._$Co??=[])[l]=h:s._$Cl=h),void 0!==h&&(o=M(e,h._$AS(e,o.values),h,l)),o}class R{constructor(e,o){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=o}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:o},parts:s}=this._$AD,l=(e?.creationScope??St).importNode(o,!0);Bt.currentNode=l;let h=Bt.nextNode(),d=0,p=0,u=s[0];for(;void 0!==u;){if(d===u.index){let o;2===u.type?o=new k(h,h.nextSibling,this,e):1===u.type?o=new u.ctor(h,u.name,u.strings,this,e):6===u.type&&(o=new Z(h,this,e)),this._$AV.push(o),u=s[++p]}d!==u?.index&&(h=Bt.nextNode(),d++)}return Bt.currentNode=St,l}p(e){let o=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(e,s,o),o+=s.strings.length-2):s._$AI(e[o])),o++}}class k{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,o,s,l){this.type=2,this._$AH=It,this._$AN=void 0,this._$AA=e,this._$AB=o,this._$AM=s,this.options=l,this._$Cv=l?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const o=this._$AM;return void 0!==o&&11===e?.nodeType&&(e=o.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,o=this){e=M(this,e,o),a(e)?e===It||null==e||""===e?(this._$AH!==It&&this._$AR(),this._$AH=It):e!==this._$AH&&e!==Ht&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>Ct(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==It&&a(this._$AH)?this._$AA.nextSibling.data=e:this.T(St.createTextNode(e)),this._$AH=e}$(e){const{values:o,_$litType$:s}=e,l="number"==typeof s?this._$AC(e):(void 0===s.el&&(s.el=S.createElement(V(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===l)this._$AH.p(o);else{const e=new R(l,this),s=e.u(this.options);e.p(o),this.T(s),this._$AH=e}}_$AC(e){let o=Ot.get(e.strings);return void 0===o&&Ot.set(e.strings,o=new S(e)),o}k(e){Ct(this._$AH)||(this._$AH=[],this._$AR());const o=this._$AH;let s,l=0;for(const h of e)l===o.length?o.push(s=new k(this.O(c()),this.O(c()),this,this.options)):s=o[l],s._$AI(h),l++;l<o.length&&(this._$AR(s&&s._$AB.nextSibling,l),o.length=l)}_$AR(e=this._$AA.nextSibling,o){for(this._$AP?.(!1,!0,o);e!==this._$AB;){const o=i$3(e).nextSibling;i$3(e).remove(),e=o}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,o,s,l,h){this.type=1,this._$AH=It,this._$AN=void 0,this.element=e,this.name=o,this._$AM=l,this.options=h,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=It}_$AI(e,o=this,s,l){const h=this.strings;let d=!1;if(void 0===h)e=M(this,e,o,0),d=!a(e)||e!==this._$AH&&e!==Ht,d&&(this._$AH=e);else{const l=e;let p,u;for(e=h[0],p=0;p<h.length-1;p++)u=M(this,l[s+p],o,p),u===Ht&&(u=this._$AH[p]),d||=!a(u)||u!==this._$AH[p],u===It?e=It:e!==It&&(e+=(u??"")+h[p+1]),this._$AH[p]=u}d&&!l&&this.j(e)}j(e){e===It?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class I extends H{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===It?void 0:e}}class L extends H{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==It)}}class z extends H{constructor(e,o,s,l,h){super(e,o,s,l,h),this.type=5}_$AI(e,o=this){if((e=M(this,e,o,0)??It)===Ht)return;const s=this._$AH,l=e===It&&s!==It||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,h=e!==It&&(s===It||l);l&&this.element.removeEventListener(this.name,this,s),h&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class Z{constructor(e,o,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=o,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){M(this,e)}}const qt=vt.litHtmlPolyfillSupport;qt?.(S,k),(vt.litHtmlVersions??=[]).push("3.3.3");const D=(e,o,s)=>{const l=s?.renderBefore??o;let h=l._$litPart$;if(void 0===h){const e=s?.renderBefore??null;l._$litPart$=h=new k(o.insertBefore(c(),e),e,void 0,s??{})}return h._$AI(e),h
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */},jt=globalThis;let Vt=class i extends E{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const o=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=D(o,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Ht}};Vt._$litElement$=!0,Vt.finalized=!0,jt.litElementHydrateSupport?.({LitElement:Vt});const Gt=jt.litElementPolyfillSupport;Gt?.({LitElement:Vt}),(jt.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1=e=>(o,s)=>{void 0!==s?s.addInitializer(()=>{customElements.define(e,o)}):customElements.define(e,o)},Ut={attribute:!0,type:String,converter:A,reflect:!1,hasChanged:f$2},r$1=(e=Ut,o,s)=>{const{kind:l,metadata:h}=s;let d=globalThis.litPropertyMetadata.get(h);if(void 0===d&&globalThis.litPropertyMetadata.set(h,d=new Map),"setter"===l&&((e=Object.create(e)).wrapped=!0),d.set(s.name,e),"accessor"===l){const{name:l}=s;return{set(s){const h=o.get.call(this);o.set.call(this,s),this.requestUpdate(l,h,e,!0,s)},init(o){return void 0!==o&&this.C(l,void 0,e,o),o}}}if("setter"===l){const{name:l}=s;return function(s){const h=this[l];o.call(this,s),this.requestUpdate(l,h,e,!0,s)}}throw Error("Unsupported decorator location: "+l)};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function n$1(e){return(o,s)=>"object"==typeof s?r$1(e,o,s):((e,o,s)=>{const l=o.hasOwnProperty(s);return o.constructor.createProperty(s,e),l?Object.getOwnPropertyDescriptor(o,s):void 0})(e,o,s)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function r(e){return n$1({...e,state:!0,attribute:!1})}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Lt=1;let Wt=class i{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,o,s){this._$Ct=e,this._$AM=o,this._$Ci=s}_$AS(e,o){return this.update(e,o)}update(e,o){return this.render(...o)}};
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Yt="important",Kt=" !"+Yt,Xt=(e=>(...o)=>({_$litDirective$:e,values:o}))(class extends Wt{constructor(e){if(super(e),e.type!==Lt||"style"!==e.name||e.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(e){return Object.keys(e).reduce((o,s)=>{const l=e[s];return null==l?o:o+`${s=s.includes("-")?s:s.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${l};`},"")}update(e,[o]){const{style:s}=e.element;if(void 0===this.ft)return this.ft=new Set(Object.keys(o)),this.render(o);for(const e of this.ft)null==o[e]&&(this.ft.delete(e),e.includes("-")?s.removeProperty(e):s[e]=null);for(const e in o){const l=o[e];if(null!=l){this.ft.add(e);const o="string"==typeof l&&l.endsWith(Kt);e.includes("-")||o?s.setProperty(e,o?l.slice(0,-11):l,o?Yt:""):s[e]=l}}return st}}),Zt="anyvac-card",Jt="anyvac-card-editor",Qt="1.62.0",te=600,ee={cleaning:["Cleaning","#52c41a","mdi:broom"],segment_cleaning:["Cleaning rooms","#52c41a","mdi:broom"],zoned_cleaning:["Zone cleaning","#52c41a","mdi:broom"],spot_cleaning:["Spot cleaning","#52c41a","mdi:target"],starting:["Starting","#52c41a","mdi:play"],segment_mopping:["Mopping rooms","#40a9ff","mdi:water"],zoned_mopping:["Zone mopping","#40a9ff","mdi:water"],robot_status_mopping:["Mopping","#40a9ff","mdi:water"],clean_mop_cleaning:["Vacuuming+mopping","#52c41a","mdi:water-plus"],clean_mop_mopping:["Vacuuming+mopping","#52c41a","mdi:water-plus"],segment_clean_mop_cleaning:["Rooms (vac)","#52c41a","mdi:water-plus"],segment_clean_mop_mopping:["Rooms (mop)","#52c41a","mdi:water-plus"],zoned_clean_mop_cleaning:["Zones (vac)","#52c41a","mdi:water-plus"],zoned_clean_mop_mopping:["Zones (mop)","#52c41a","mdi:water-plus"],washing_the_mop:["Washing mop","#9254de","mdi:shower-head"],washing_the_mop_2:["Washing mop","#9254de","mdi:shower-head"],going_to_wash_the_mop:["Going to wash mop","#9254de","mdi:shower-head"],air_drying_stopping:["Drying mop","#9254de","mdi:weather-windy"],back_to_dock_washing_duster:["Dock + washing","#faad14","mdi:home-import-outline"],returning_home:["Returning home","#faad14","mdi:home-import-outline"],docking:["Docking","#faad14","mdi:home-import-outline"],going_to_target:["Going to target","#40a9ff","mdi:target"],charging:["Charging","rgba(var(--avc-ink-rgb),0.75)","mdi:lightning-bolt"],charging_complete:["Fully charged","#52c41a","mdi:check-circle-outline"],docked:["Docked","rgba(var(--avc-ink-rgb),0.75)","mdi:check-circle-outline"],charger_disconnected:["Charger disconnected","#faad14","mdi:power-plug-off-outline"],emptying_the_bin:["Emptying bin","#faad14","mdi:delete-empty-outline"],idle:["Idle","rgba(var(--avc-ink-rgb),0.45)","mdi:sleep"],paused:["Paused","#faad14","mdi:pause"],mapping:["Mapping","#40a9ff","mdi:map-search-outline"],remote_control_active:["Remote control","#40a9ff","mdi:gamepad-variant-outline"],manual_mode:["Manual mode","#40a9ff","mdi:gamepad-variant-outline"],updating:["Updating","#faad14","mdi:update"],in_call:["In call","#faad14","mdi:phone"],shutting_down:["Shutting down","rgba(var(--avc-ink-rgb),0.4)","mdi:power"],error:["Error","#ff4d4f","mdi:alert-circle-outline"],charging_problem:["Charging problem","#ff4d4f","mdi:alert-outline"],locked:["Locked","#ff4d4f","mdi:lock-outline"],device_offline:["Offline","#ff4d4f","mdi:wifi-off"]},oe={"#52c41a":"#5DBB6A","#40a9ff":"#4DA3E8","#9254de":"#A48BE0","#faad14":"#E0A84A","#ff4d4f":"#E5675F"},ie={green:"#52c41a",blue:"#2196F3",orange:"#faad14"},ae=["#13c2c2","#eb2f96","#9254de","#ff7a45","#a0d911","#2f54eb","#c41d7f","#8c8c8c"],se={green:"rgba(46,204,113,0.18)",blue:"rgba(33,150,243,0.18)",orange:"rgba(250,173,20,0.18)"},ne={green:"rgba(46,204,113,0.30)",blue:"rgba(33,150,243,0.30)",orange:"rgba(250,173,20,0.30)"};const re="auto",le=[{id:"sage",label:"Sage",hex:"#6FBF73"},{id:"ocean",label:"Ocean",hex:"#4FA5C7"},{id:"terracotta",label:"Terracotta",hex:"#D98A6A"},{id:"plum",label:"Plum",hex:"#A87CC0"},{id:"amber",label:"Amber",hex:"#D9A441"},{id:"graphite",label:"Graphite",hex:"#8E97A8"}];const ce=new Set(["cleaning","segment_cleaning","zoned_cleaning","spot_cleaning","segment_mopping","zoned_mopping","robot_status_mopping","clean_mop_cleaning","clean_mop_mopping","segment_clean_mop_cleaning","segment_clean_mop_mopping","zoned_clean_mop_cleaning","zoned_clean_mop_mopping"]),shape=e=>e??{};function langOf(e){return String(shape(e).locale?.language??shape(e).language??"en").toLowerCase().startsWith("cs")?"cs":"en"}function intlTag(e){return shape(e).locale?.language||shape(e).language||void 0}function hour12Of(e){switch(shape(e).locale?.time_format){case"am_pm":return!0;case"twenty_four":return!1;default:return}}function fmtClock(e,o){if(null==o||""===o)return"";const s=o instanceof Date?o:new Date(o);return isNaN(s.getTime())?"":s.toLocaleTimeString(intlTag(e),{hour:"2-digit",minute:"2-digit",hour12:hour12Of(e)})}const he={"Dock error: {name}":"Chyba doku: {name}","Dry trail — tap to toggle, hold for rooms":"Suchá stopa – klepnutím přepneš, podržením zobrazíš místnosti","Wet trail — tap to toggle, hold for rooms":"Mokrá stopa – klepnutím přepneš, podržením zobrazíš místnosti","Show dry trail — tap to toggle":"Zobrazit suchou stopu – klepnutím přepneš","Show wet trail — tap to toggle":"Zobrazit mokrou stopu – klepnutím přepneš","Hold to trigger: {name}":"Podrž pro spuštění: {name}","Last clean {when}":"Poslední úklid {when}","Needs attention: {what}":"Vyžaduje pozornost: {what}","dock and care":"dok a údržba",dock:"dok",care:"údržba",check:"zkontrolovat","Next: {room}":"Další: {room}","Oldest room: {sub}":"Nejstarší místnost: {sub}","Open {name} in Home Assistant":"Otevřít {name} v Home Assistantu","Pause {name} (hold)":"Pozastavit {name} (podrž)","Pin ready for {n} {vacuums} — pick one on its status card below.":"Špendlík připraven pro {n} {vacuums} – vyber jeden na stavové kartě níže.","Zone ready for {n} {vacuums} — drag the box or its corners to adjust, then pick one on its status card below.":"Zóna připravena pro {n} {vacuums} – rámeček nebo rohy uprav tažením a pak vyber vysavač na stavové kartě níže.","vacuum|vacuums":"vysavač|vysavače|vysavačů","Reset {label}":"Resetovat {label}",START:"START","Stop {what}":"Zastavit {what}",today:"dnes","{n} d ago":"před {n} d","vacuumed {when}":"vysáto {when}","mopped {when}":"vytřeno {when}","{names} are cleaning":"{names} uklízejí","{names} is cleaning":"{names} uklízí","{name} controls":"Ovládání {name}","{name} sections":"Sekce {name}","{name} in {room}":"{name}: {room}","{name} mopping {room}":"{name} vytírá: {room}","{name} — open controls":"{name} – otevřít ovládání","{name} — tap for controls, hold to hide it on the map":"{name} – klepnutím ovládání, podržením skryješ robota na mapě","{name} — tap for controls, hold to show it on the map":"{name} – klepnutím ovládání, podržením zobrazíš robota na mapě",Cleaning:"Uklízí","Cleaning rooms":"Uklízí místnosti","Zone cleaning":"Úklid zóny","Spot cleaning":"Bodový úklid",Starting:"Startuje","Mopping rooms":"Vytírá místnosti","Zone mopping":"Vytírání zóny",Mopping:"Vytírá","Vacuuming+mopping":"Vysává a vytírá","Rooms (vac)":"Místnosti (vysávání)","Rooms (mop)":"Místnosti (vytírání)","Zones (vac)":"Zóny (vysávání)","Zones (mop)":"Zóny (vytírání)","Washing mop":"Pere mop","Going to wash mop":"Jede prát mop","Drying mop":"Suší mop","Dock + washing":"Dock + praní","Returning home":"Vrací se do doku",Docking:"Zajíždí do doku","Going to target":"Jede na místo",Charging:"Nabíjí se","Fully charged":"Nabito",Docked:"V doku","Charger disconnected":"Nabíječka odpojena","Emptying bin":"Vyprazdňuje koš",Idle:"Nečinný",Paused:"Pozastaveno",Mapping:"Mapuje","Charging problem":"Problém s nabíjením",Error:"Chyba","In call":"Probíhá hovor",Locked:"Zamčeno","Manual mode":"Ruční režim",Offline:"Offline","Remote control":"Dálkové ovládání","Shutting down":"Vypíná se",Updating:"Aktualizuje se","Start · hold":"Start · podrž","Cancel · hold":"Zrušit · podrž","Start · {scope} · hold":"Start · {scope} · podrž","whole home":"celý byt","Whole home":"Celý byt","Whole plan":"Celý plán",Clear:"Zrušit výběr","Clear · whole home":"Zrušit výběr · celý byt",Plan:"Plán","{done} of {total} passes":"{done} z {total} průchodů","Plan · {done} of {total} passes done":"Plán · hotovo {done} z {total} průchodů","Done around {time}":"Hotovo kolem {time}","~{min} min left":"zbývá ~{min} min","{min} min left":"zbývá {min} min","Selected · {n} {rooms}":"Vybráno · {n} {rooms}","Whole home · {n} {rooms}":"Celý byt · {n} {rooms}","{n} {rooms}":"{n} {rooms}","room|rooms":"místnost|místnosti|místností",Dry:"Suchý",Wet:"Mokrý",Both:"Oba",dry:"suchý",wet:"mokrý","dry {who}":"suchý {who}","wet {who}":"mokrý {who}",", then ":", poté ","Tap rooms on the map to pick them":"Místnosti vybereš klepnutím na mapu","{n} without a robot for this mode":"{n} bez robota pro tento režim","Clean type — tap to change":"Druh úklidu – klepnutím změníš","Requires the AnyVac integration":"Vyžaduje integraci AnyVac","Room selection is off while placing a pin/zone":"Výběr místností je vypnutý při umísťování špendlíku/zóny","Refresh map":"Obnovit mapu","Refresh maps":"Obnovit mapy","Flip map":"Otočit mapu","Flip map 180° for this screen (this session only)":"Otočit mapu o 180° na této obrazovce (jen pro tuto relaci)",Align:"Zarovnat","Align — full-screen manual floorplan seating":"Zarovnat – ruční usazení půdorysu na celou obrazovku","Dry trail":"Suchá stopa","Wet trail":"Mokrá stopa","Send here":"Poslat sem","Select rooms":"Vybrat místnosti","Pick rooms on the map first":"Nejdřív vyber místnosti na mapě","Send to dock":"Poslat do doku","Home Assistant details":"Detaily v Home Assistantu","Hold to pause":"Podrž pro pozastavení",Pause:"Pozastavit",Resume:"Pokračovat",Dock:"Dok",Close:"Zavřít",Clean:"Uklidit",Care:"Údržba",Rooms:"Místnosti",Refresh:"Obnovit",Cancel:"Zrušit",Zone:"Zóna","Zone clean":"Úklid zóny","Clean zone":"Uklidit zónu","Pin & Go":"Špendlík a jeď","Drag a rectangle on the map to set a cleaning zone.":"Tažením na mapě nakresli zónu úklidu.","Tap the map to drop a pin.":"Klepnutím na mapu umístíš špendlík.","Tap the map to send the robot there.":"Klepnutím na mapu pošleš robota na dané místo.","Clean this zone? Drag the box or its corners to adjust.":"Uklidit tuto zónu? Rámeček nebo jeho rohy můžeš upravit tažením.","Home is calm":"V bytě je klid","needs attention":"vyžaduje pozornost","Cleaning · done around {time}":"Úklid · hotovo kolem {time}","{n} min left":"zbývá {n} min","{n}/{total} rooms":"{n}/{total} místností","Emptying the bin":"Vyprazdňování koše","Washing the mop":"Praní mopu","Drying the mop":"Sušení mopu","The dock reports an error":"Dok hlásí chybu","Dock ready":"Dok připraven","Confirm the error is fixed, like Resolved in the Roborock app":"Potvrď, že je chyba odstraněna – jako Vyřešeno v aplikaci Roborock",Stop:"Stop",Resolved:"Vyřešeno",Check:"Zkontrolovat",Empty:"Vyprázdnit",Wash:"Mytí",Pump:"Čerpadlo","Self-clean":"Samočištění",Default:"Výchozí","Main brush":"Hlavní kartáč","Side brush":"Boční kartáč",Filter:"Filtr",Sensors:"Senzory","Dock brush":"Kartáč doku",Strainer:"Sítko","Dirty water tank":"Nádrž na špinavou vodu","Clean water tank":"Nádrž na čistou vodu","Cleaning fluid":"Čisticí prostředek","Whole home · ~{min} min":"Celý byt · ~{min} min","{n} {rooms} · ~{min} min":"{n} {rooms} · ~{min} min","~{h} h {m} min":"~{h} h {m} min","~{h} h":"~{h} h","~{n} min":"~{n} min","Today · {time}":"Dnes · {time}","Yesterday · {time}":"Včera · {time}","{date} · {time}":"{date} · {time}","Last clean":"Poslední úklid","Made for a bigger screen":"Určeno pro větší obrazovku","Open anyway":"Přesto otevřít","Visual editor":"Vizuální editor","No available robot for this room's {mode} pass — check that a vacuum is configured with the right role and knows this room.":"Pro {mode} průchod této místnosti není k dispozici robot – zkontroluj, že je vysavač nastaven s odpovídající rolí a zná tuto místnost.","No cleaning order set for this room — the time estimate may be off. Set the order in the card editor's Global tab.":"Pro tuto místnost není nastaveno pořadí úklidu – odhad času může být nepřesný. Pořadí nastavíš v editoru karty na záložce Global.","{n} selected {rooms} without an available robot for the {mode} pass — skipped. Check vacuum roles/config.":"{n} vybraných {rooms} bez dostupného robota pro {mode} průchod – budou přeskočeny. Zkontroluj role/konfiguraci vysavačů.","{n} selected {rooms} without a cleaning order — the time above may be off. Set the order in the card editor's Global tab.":"{n} vybraných {rooms} bez nastaveného pořadí úklidu – čas výše může být nepřesný. Pořadí nastavíš v editoru karty na záložce Global.","Add a room":"Přidat místnost","Add a service point":"Přidat servisní bod","Add to the queue":"Přidat do fronty","Already in the queue":"Už je ve frontě","At {name}":"Na bodě {name}","Available when {name} has finished its rooms":"Dostupné, až {name} dokončí své místnosti","Available when {name} has finished its rooms — going there now would end the room it is cleaning, and it could not continue where it stopped.":"Dostupné, až {name} dokončí své místnosti — cesta na bod teď by ukončila uklízenou místnost a robot by nemohl pokračovat, kde skončil.","Back to dock":"Zpět do doku",Delete:"Smazat","Give it to {name}":"Předat: {name}",Go:"Jet","Go to {point}":"Jet na {point}",Move:"Přesunout","Move down":"Posunout dolů","Move up":"Posunout nahoru","Move {point}":"Přesunout {point}",Name:"Název","New service point":"Nový servisní bod","Open the queue":"Otevřít frontu","Point placed — tap again to adjust":"Bod umístěn — dalším ťuknutím ho posuneš",Queue:"Fronta","Queue view":"Zobrazení fronty","Queue · {done} of {total} {rooms} done":"Fronta · hotovo {done} z {total} {rooms}","Remove from the queue":"Odebrat z fronty",Rename:"Přejmenovat","Rename {point}":"Přejmenovat {point}",Retry:"Znovu",Save:"Uložit","Service point":"Servisní bod","Service points":"Servisní body","Skip · hold":"Přeskočit · podrž","Stops this room and goes on with the next one":"Ukončí tuhle místnost a pokračuje další","Tap again to delete":"Ťukni znovu pro smazání","Tap the spot on the map where {name} should park — or save where it stands now.":"Ťukni do mapy, kde má {name} zaparkovat — nebo ulož místo, kde právě stojí.","Use where {name} stands":"Použít polohu {name}","Waiting — send it home when you're done":"Čeká — až budeš hotov, pošli ho domů","after {names}":"po {names}",blocked:"zablokováno","could not reach the room":"nedostal se do místnosti",done:"hotovo","done around {time}":"hotovo kolem {time}","or tap a room on the map":"nebo ťukni na místnost v mapě","outside the rooms":"mimo místnosti","robot error":"chyba robota","robot offline":"robot je offline",starting:"startuje","the command failed":"příkaz selhal","the robot did not take the command":"robot příkaz nepřevzal","the robot runs another clean":"robot uklízí něco jiného",waiting:"čeká","water tank empty":"prázdná nádrž na vodu","{done} of {total} {rooms} done":"hotovo {done} z {total} {rooms}","{name}: {room} ({kind}) — {reason}":"{name}: {room} ({kind}) — {reason}","{point} — rename, move or delete":"{point} — přejmenovat, přesunout, smazat"};function mapPxDims(e){if(!e)return null;const o=e.scale??1;let s=(e.width??0)*o,l=(e.height??0)*o;const h=e.rotation??0;if(90===h||270===h){const e=s;s=l,l=e}return s>0&&l>0?{NW:s,NH:l}:null}const de=Math.PI/180;function seatFromFrame(e,o,s,l,h,d,p){let u=Math.round(e/de)%360;return u<0&&(u+=360),{rotation:u,scale:100*o,offset_x:100*s.x-50,offset_y:s.y*l*100-50,residual_pct:100*h,anchors:d,raw_rotation:Math.round(p/de*10)/10}}function computeSeatFit(e,o,s){if(!(e.length&&o>0))return null;if(e.length>=2){const s=e.length,l={x:0,y:0},h={x:0,y:0};for(const o of e)l.x+=o.q.x,l.y+=o.q.y,h.x+=o.a.x,h.y+=o.a.y;l.x/=s,l.y/=s,h.x/=s,h.y/=s;let d=0,p=0,u=0;for(const o of e){const e=o.q.x-l.x,s=o.q.y-l.y,m=o.a.x-h.x,_=o.a.y-h.y;d+=e*m+s*_,p+=e*_-s*m,u+=e*e+s*s}if(u>1e-8){const m=Math.atan2(p,d),_=Math.round(m/(Math.PI/2))*(Math.PI/2),f=Math.cos(_),v=Math.sin(_);let b=0;for(const o of e){const e=o.q.x-l.x,s=o.q.y-l.y,d=v*e+f*s;b+=(f*e-v*s)*(o.a.x-h.x)+d*(o.a.y-h.y)}const w=b/u;if(w>1e-4){const d={x:h.x-w*(f*l.x-v*l.y),y:h.y-w*(v*l.x+f*l.y)};let p=0;for(const o of e){const e=d.x+w*(f*o.q.x-v*o.q.y)-o.a.x,s=d.y+w*(v*o.q.x+f*o.q.y)-o.a.y;p+=e*e+s*s}return seatFromFrame(_,w,d,o,Math.sqrt(p/s),s,m)}}}const l=e.find(e=>e.sizeQ&&e.sizeA)??null;if(!l||!l.sizeQ||!l.sizeA||l.sizeQ.w<1e-6||l.sizeQ.h<1e-6)return null;let h=null;for(const e of[0,1,2,3]){const o=e*(Math.PI/2),s=e%2==0?l.sizeQ.w:l.sizeQ.h,d=e%2==0?l.sizeQ.h:l.sizeQ.w,p=l.sizeA.w/s,u=l.sizeA.h/d;if(!(p>0&&u>0))continue;const m=Math.sqrt(p*u),_=Math.abs(Math.log(p/u));(!h||_<h.mism-1e-9)&&(h={theta:o,s:m,mism:_})}if(!h)return null;const d=Math.cos(h.theta),p=Math.sin(h.theta),u={x:l.a.x-h.s*(d*l.q.x-p*l.q.y),y:l.a.y-h.s*(p*l.q.x+d*l.q.y)};return seatFromFrame(h.theta,h.s,u,o,0,1,h.theta)}function resolveImageBaseSrc(e,o){const s="merged"===e.map_mode?e.image_base??(e.vacuums??[]).find(e=>e.image_base?.src)?.image_base:o?.image_base;return s?.src}function resolveStaticRooms(e,o){return(e.rooms?.length?e.rooms:o?.rooms)??[]}function resolveSeat(e,o,s,l){const h=o?.map,d={rotation:h?.rotation??0,scale:h?.scale??100,scaleY:h?.scale_y,offset_x:h?.offset_x??0,offset_y:h?.offset_y??0,auto:!1};if(!o||"manual"===h?.seat)return d;if(!resolveImageBaseSrc(e,o))return d;if(!s)return d;const p=computeSeatFit(function assembleAnchors(e,o,s){if(!o)return[];const l=mapPxDims(o.image_dims),h=Array.isArray(o.rooms)?o.rooms:[];if(!l||!h.length)return[];const{NW:d,NH:p}=l,u=[];for(const o of e){if(null==o.map_x||null==o.map_y)continue;const e=h.find(e=>e.name===o.key)??h.find(e=>e.name===o.name),l=e?.bbox_px;if(!l||[l.x0,l.y0,l.x1,l.y1].some(e=>null==e))continue;const m={q:{x:((l.x0+l.x1)/2-d/2)/d,y:((l.y0+l.y1)/2-p/2)/d},a:{x:o.map_x/100,y:o.map_y/100/s}};null!=o.map_w&&null!=o.map_h&&o.map_w>0&&o.map_h>0&&(m.sizeQ={w:(l.x1-l.x0)/d,h:(l.y1-l.y0)/d},m.sizeA={w:o.map_w/100,h:o.map_h/100/s}),u.push(m)}return u}(resolveStaticRooms(e,o),s,l),l);return p?{rotation:p.rotation,scale:p.scale,offset_x:p.offset_x,offset_y:p.offset_y,auto:!0,residual:p.residual_pct,anchorCount:p.anchors}:d}function placeRoomInCrop(e,o){const s=o.x1-o.x0,l=o.y1-o.y0;if(!(s>0&&l>0))return null;const h=(e.x0+e.x1)/2-o.x0,d=(e.y0+e.y1)/2-o.y0,p=e.x1-e.x0,u=e.y1-e.y0,clamp=(e,o,s)=>Math.min(s,Math.max(o,e));return{map_x:clamp(Math.round(h/s*1e3)/10,0,100),map_y:clamp(Math.round(d/l*1e3)/10,0,100),map_w:clamp(Math.round(p/s*1e3)/10,2,100),map_h:clamp(Math.round(u/l*1e3)/10,2,100)}}function buildCalibrationAnchors(e,o,s,l){const{NW:h,NH:d}=s;if(!(h>0&&d>0&&l>0))return[];const p=Math.min(e.length,o.length),u=[];for(let s=0;s<p;s++){const p=e[s],m=o[s];u.push({q:{x:(p.x-h/2)/h,y:(p.y-d/2)/h},a:{x:m.x/100,y:m.y/100/l}})}return u}function pctToCropPoint(e,o){const s=o.x1-o.x0,l=o.y1-o.y0;return s>0&&l>0?{x:o.x0+e.x/100*s,y:o.y0+e.y/100*l}:null}function outlineInCrop(e,o){if(!e?.length)return null;const s=o.x1-o.x0,l=o.y1-o.y0;return s>0&&l>0?e.map(e=>{const h=Array.isArray(e)?e[0]:e.x,d=Array.isArray(e)?e[1]:e.y;return{x:(h-o.x0)/s*100,y:(d-o.y0)/l*100}}):null}function recropFromGesture(e,o){const s=e.x1-e.x0,l=e.y1-e.y0,h=o.scale/100;if(!(s>0&&l>0&&h>1e-6))return null;const d=s/h,p=l/h,u=e.x0+s/100*(50*(1-1/h)-o.offset_x/h),m=e.y0+l/100*(50*(1-1/h)-o.offset_y/h);return{x0:u,y0:m,x1:u+d,y1:m+p}}function seatProjectPct(e,o,s){const l=o.scale/100,h=(o.scaleY??o.scale)/100,d=o.rotation*de,p=Math.cos(d),u=Math.sin(d),m=(50+o.offset_x)/100,_=(50+o.offset_y)/100/s,f=l*e.x,v=h*e.y;return{x:100*(m+(p*f-u*v)),y:(_+(u*f+p*v))*s*100}}function seatScaleYRatio(e,o){return null!=o&&o!==e&&e?o/e:1}function seatRotateScaleCss(e,o,s){const l="rotate("+e+"deg)",h=seatScaleYRatio(o,s);return 1===h?l:l+" scale(1,"+h+")"}function roomBboxToRect(e,o,s,l){const h=mapPxDims(o?.image_dims),d=e?.bbox_px;if(!h||!d||[d.x0,d.y0,d.x1,d.y1].some(e=>null==e))return null;const{NW:p,NH:u}=h,m={x:((d.x0+d.x1)/2-p/2)/p,y:((d.y0+d.y1)/2-u/2)/p},_=s.scale/100,f=(s.scaleY??s.scale)/100;let v=(d.x1-d.x0)/p*_,b=(d.y1-d.y0)/p*f;const w=seatProjectPct(m,s,l);if(function isRot90(e){return Math.round(e/90)%2!=0}(s.rotation)){const e=v;v=b,b=e}const clamp=(e,o,s)=>Math.min(s,Math.max(o,e));return{map_x:clamp(Math.round(10*w.x)/10,0,100),map_y:clamp(Math.round(10*w.y)/10,0,100),map_w:clamp(Math.round(1e3*v)/10,2,100),map_h:clamp(Math.round(b*l*1e3)/10,2,100)}}function homeAnchorFit(e,o,s){if(!e||e.length<2||!o)return null;const l=buildCalibrationAnchors(e.map(e=>e.home_px),e.map(e=>e.floor_pct),o,s);return computeSeatFit(l,s)}function projectHomePxThroughFit(e,o,s,l){return seatProjectPct({x:(e.x-o.NW/2)/o.NW,y:(e.y-o.NH/2)/o.NW},s,l)}function outlineThroughFit(e,o,s,l){return e?.length?e.map(e=>projectHomePxThroughFit({x:Array.isArray(e)?e[0]:e.x,y:Array.isArray(e)?e[1]:e.y},o,s,l)):null}const pe=Math.PI/180;function nudgeTierMultiplier(e){return"fine"===e?.1:"jump"===e?10:1}function seatCentreFrac(e,o){return{x:(50+e.offset_x)/100,y:(50+e.offset_y)/100/o}}function frameToOffset(e,o){return{offset_x:100*e.x-50,offset_y:e.y*o*100-50}}function pctToFrac(e,o){return{x:e.x/100,y:e.y/100/o}}function rotatePoint(e,o){const s=o*pe,l=Math.cos(s),h=Math.sin(s);return{x:l*e.x-h*e.y,y:h*e.x+l*e.y}}function normDeg$1(e){let o=e%360;return o<0&&(o+=360),o}function translateSeat(e,o,s){return{...e,offset_x:e.offset_x+o,offset_y:e.offset_y+s}}function scaleSeatAbout(e,o,s,l){const h=pctToFrac(s,l),d=seatCentreFrac(e,l),p=frameToOffset({x:h.x+o*(d.x-h.x),y:h.y+o*(d.y-h.y)},l),u={...e,scale:e.scale*o,offset_x:p.offset_x,offset_y:p.offset_y};return null!=e.scaleY&&(u.scaleY=e.scaleY*o),u}function rotateSeatAbout(e,o,s,l){const h=pctToFrac(s,l),d=seatCentreFrac(e,l),p=rotatePoint({x:d.x-h.x,y:d.y-h.y},o),u=frameToOffset({x:h.x+p.x,y:h.y+p.y},l);return{...e,rotation:normDeg$1(e.rotation+o),offset_x:u.offset_x,offset_y:u.offset_y}}function stretchSeatY(e,o){const s=e.scaleY??e.scale;return{...e,scaleY:s*o}}function stretchSeatX(e,o){const s=e.scaleY??e.scale;return{...e,scale:e.scale*o,scaleY:s}}function pinchSeat(e,o,s,l,h,d){const p=function similarityFromTwoPoints(e,o,s,l){const h=o.x-e.x,d=o.y-e.y,p=h*h+d*d;if(p<1e-12)return null;const u=l.x-s.x,m=l.y-s.y,_=(u*h+m*d)/p,f=(m*h-u*d)/p,v=Math.hypot(_,f);if(v<1e-6)return null;const b=Math.atan2(f,_)/pe,w=_*e.x-f*e.y,$=f*e.x+_*e.y;return{rotationDeg:b,scale:v,translate:{x:s.x-w,y:s.y-$}}}(pctToFrac(o,d),pctToFrac(s,d),pctToFrac(l,d),pctToFrac(h,d));if(!p)return e;const u=seatCentreFrac(e,d),m=p.scale*Math.cos(p.rotationDeg*pe),_=p.scale*Math.sin(p.rotationDeg*pe),f=frameToOffset({x:m*u.x-_*u.y+p.translate.x,y:_*u.x+m*u.y+p.translate.y},d),v={...e,rotation:normDeg$1(e.rotation+p.rotationDeg),scale:e.scale*p.scale,offset_x:f.offset_x,offset_y:f.offset_y};return null!=e.scaleY&&(v.scaleY=e.scaleY*p.scale),v}function nudgeOffset(e,o,s,l,h){const d=function fracToPct(e,o){return{x:100*e.x,y:e.y*o*100}}(rotatePoint(pctToFrac({x:o,y:s},h),-l),h);return translateSeat(e,d.x,d.y)}function nudgeRotation(e,o){return{...e,rotation:normDeg$1(e.rotation+o)}}function nudgeScale(e,o){const s=1+o/100,l={...e,scale:e.scale*s};return null!=e.scaleY&&(l.scaleY=e.scaleY*s),l}function effectiveAppearance(e){return{hide_map:e.hide_map??!1,overlay_opacity:e.overlay_opacity??55,overlay_blend:e.overlay_blend??"normal",path_color:e.path_color??null,path_width:e.path_width??100,mop_path_color:e.mop_path_color??null,mop_band_opacity:e.mop_band_opacity??28,mop_band_width:e.mop_band_width??100,robot_image_on_map:e.robot_image_on_map??!1,robot_size:e.robot_size??100,robot_image_rotation:e.robot_image_rotation??0}}function mergeRoomOverrides(e,o){if(!o)return e;const s=e?[...e]:[],l=new Map(s.map((e,o)=>[e.key,o]));let h=!1;for(const[e,d]of Object.entries(o)){if(!d)continue;h=!0;const o={};void 0!==d.map_x&&(o.map_x=d.map_x),void 0!==d.map_y&&(o.map_y=d.map_y),void 0!==d.map_w&&(o.map_w=d.map_w),void 0!==d.map_h&&(o.map_h=d.map_h),"area_id"in d&&(o.area_id=d.area_id??void 0);const p=l.get(e);void 0!==p?s[p]={...s[p],...o}:(l.set(e,s.length),s.push({key:e,...o}))}return h?s:e}const round1=e=>Math.round(10*e)/10,clampPct=e=>Math.min(100,Math.max(0,e)),clampSize=e=>Math.min(100,Math.max(2,e)),ue={nw:{sx:-1,sy:-1},ne:{sx:1,sy:-1},sw:{sx:-1,sy:1},se:{sx:1,sy:1}};const me="anyvac-visual-editor";class AnyVacVisualEditorHost extends HTMLElement{connectedCallback(){this.shadowRoot||this.attachShadow({mode:"open"})}}customElements.get(me)||customElements.define(me,AnyVacVisualEditorHost);const ge=["--primary-text-color","--secondary-text-color","--primary-background-color","--card-background-color","--primary-color","--accent-color","--divider-color","--paper-font-body1_-_font-family","--mdc-icon-font"];function unmountVisualEditor(e){e?.remove()}const _e=160;const fe={columns:[100],rows:["auto","minmax(0, 1fr)","auto","auto"],place:{hero:{row:1,col:1},map:{row:2,col:1},dock:{row:3,col:1,overflow:"auto"},start:{row:4,col:1}}},ve={landscape:{columns:["minmax(0, 1fr)","max-content"],rows:["auto","minmax(260px, 1fr)","auto","auto"],place:{badges:{row:1,col:"1/3"},map:{row:2,col:"1/3"},tools:{row:3,col:"1/3",align:"start"},status:{row:4,col:1,overflow:"auto"},dock:{row:4,col:2,overflow:"auto"}}},portrait:{columns:[72,28],rows:["auto","minmax(0, 1fr)","auto"],place:{hero:{row:1,col:"1/3"},map:{row:2,col:1},dock:{row:2,col:2,overflow:"auto"},start:{row:3,col:"1/3"}}}};function track(e){return"number"==typeof e?e+"fr":e}function trackList(e){return e.map(track).join(" ")}function resolveHeightCss(e){const o=e.height??"viewport";return"viewport"===o?"calc(100svh - var(--header-height, 0px))":"container"===o?"100%":o}function fmtPts(e,o){return e.map(e=>e.x.toFixed(o)+","+e.y.toFixed(o)).join(" ")}function arcLength(e){let o=0;for(let s=1;s<e.length;s++)o+=Math.hypot(e[s].x-e[s-1].x,e[s].y-e[s-1].y);return o}function trailTail(e,o){if(e.length<2||!(o>0))return[];const s=[e[e.length-1]];let l=o;for(let o=e.length-1;o>0;o--){const h=e[o-1],d=e[o],p=Math.hypot(d.x-h.x,d.y-h.y);if(p>=l){const e=p>0?l/p:0;return s.push({x:d.x+(h.x-d.x)*e,y:d.y+(h.y-d.y)*e}),s.reverse()}l-=p,s.push(h)}return s.reverse()}function closestOnEdge(e,o,s){const l=o.x-e.x,h=o.y-e.y,d=l*l+h*h,p=d>0?Math.max(0,Math.min(1,((s.x-e.x)*l+(s.y-e.y)*h)/d)):0,u={x:e.x+l*p,y:e.y+h*p};return{pt:u,d:Math.hypot(s.x-u.x,s.y-u.y)}}function pointAtFraction(e,o){const s=arcLength(e);if(0===e.length)return{pt:{x:0,y:0},next:0};if(!(s>0)||o<=0)return{pt:e[0],next:1};let l=Math.min(1,o)*s;for(let o=1;o<e.length;o++){const s=Math.hypot(e[o].x-e[o-1].x,e[o].y-e[o-1].y);if(s>=l){const h=s>0?l/s:0;return{pt:{x:e[o-1].x+(e[o].x-e[o-1].x)*h,y:e[o-1].y+(e[o].y-e[o-1].y)*h},next:o}}l-=s}return{pt:e[e.length-1],next:e.length}}function glideKeyframes(e,o,s=120){let l=e;if(l.length>s){const o=(l.length-1)/(s-1);l=Array.from({length:s},(s,l)=>e[Math.round(l*o)])}const h=arcLength(l);let d=0;return l.map((e,s)=>(s>0&&(d+=Math.hypot(e.x-l[s-1].x,e.y-l[s-1].y)),{transform:"translate("+e.x.toFixed(o)+"px, "+e.y.toFixed(o)+"px)",offset:h>0?d/h:s/Math.max(1,l.length-1)}))}function join(e,o,s){const l=Array.isArray(e)?e:[];if(!Array.isArray(o)||!o.length)return e;const h=o;return s&&l.length?[...l.slice(0,-1),[...l[l.length-1],...h[0]],...h.slice(1)]:[...l,...h]}const be=new WeakMap;function mergeLive(e){if(!e)return e;const o=e.live;if(!o||"object"!=typeof o||o.base_points!==e.path_points)return e;const s=be.get(e);if(s)return s;const l={...e,vacuum_position_px:o.pos_px??e.vacuum_position_px,vacuum_position_home_px:o.pos_home_px??e.vacuum_position_home_px,path_dry_px:join(e.path_dry_px,o.dry_px,o.dry_continues),path_wet_px:join(e.path_wet_px,o.wet_px,o.wet_continues),path_dry_home_px:join(e.path_dry_home_px,o.dry_home_px,o.dry_continues),path_wet_home_px:join(e.path_wet_home_px,o.wet_home_px,o.wet_continues)};return be.set(e,l),l}const ye=.5,round2=e=>Math.round(100*e)/100,num=(e,o)=>"number"==typeof e&&Number.isFinite(e)?e:o;function normalizeFurniture(e){if(!Array.isArray(e))return[];const o=[],s=new Set;return e.forEach((e,l)=>{if(!e||"object"!=typeof e)return;const h=e;if("string"!=typeof h.src||!h.src)return;const d=num(h.w,0),p=num(h.h,0);if(d<=0||p<=0)return;let u="string"==typeof h.id&&h.id?h.id:`item_${l+1}`;for(;s.has(u);)u+="_";s.add(u);const m={id:u,src:h.src,x:num(h.x,50),y:num(h.y,50),w:d,h:p},_=num(h.rot,0);_&&(m.rot=_),"number"==typeof h.opacity&&h.opacity>=0&&h.opacity<1&&(m.opacity=h.opacity),!0===h.flip&&(m.flip=!0),o.push(m)}),o}function toUnit(e,o){return{cx:e.x,cy:e.y/o,w:e.w,h:e.h/o,rot:e.rot??0}}function fromUnit(e,o,s){const l={...e,x:round2(o.cx),y:round2(o.cy*s),w:round2(o.w),h:round2(o.h*s)},h=round2(normDeg(o.rot));return h?l.rot=h:delete l.rot,l}function normDeg(e){let o=(e%360+360)%360;return o>180&&(o-=360),o}const rad=e=>e*Math.PI/180;function rotVec(e,o,s){const l=Math.cos(rad(s)),h=Math.sin(rad(s));return[e*l-o*h,e*h+o*l]}function cornerSign(e){return["ne"===e||"se"===e?1:-1,"sw"===e||"se"===e?1:-1]}function moveBox(e,o,s){return{...e,cx:e.cx+o,cy:e.cy+s}}function resizeBoxCorner(e,o,s,l){const[h,d]=cornerSign(o),p=h>0?d>0?"nw":"sw":d>0?"ne":"se",[u,m]=function cornerPoint(e,o){const[s,l]=cornerSign(o),[h,d]=rotVec(s*e.w/2,l*e.h/2,e.rot);return[e.cx+h,e.cy+d]}(e,p),[_,f]=rotVec(s[0]-u,s[1]-m,-e.rot);let v=Math.max(ye,_*h),b=Math.max(ye,f*d);if(l&&e.w>0&&e.h>0){const o=Math.max(v/e.w,b/e.h);v=Math.max(ye,e.w*o),b=Math.max(ye,e.h*o)}const[w,$]=rotVec(h*v/2,d*b/2,e.rot);return{...e,cx:u+w,cy:m+$,w:v,h:b}}function newFurnitureItem(e,o,s,l={}){const h=l.widthPct??15,d=h*(l.nw&&l.nh&&l.nw>0&&l.nh>0?l.nh/l.nw:1),p=l.centre??{x:50,y:50};return{id:uniqueId(slugFromSrc(e),s),src:e,x:round2(p.x),y:round2(p.y),w:round2(h),h:round2(d*o)}}function slugFromSrc(e){return decodeURIComponent((e.split("?")[0].split("/").pop()??"").replace(/\.[a-z0-9]+$/i,"")).toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"_").replace(/^_+|_+$/g,"")||"item"}function uniqueId(e,o){const s=new Set(o.map(e=>e.id));if(!s.has(e))return e;for(let o=2;;o++)if(!s.has(`${e}_${o}`))return`${e}_${o}`}function planOrder(e){const o=e?.timeline??{},s=new Map;for(const e of["dry","wet"])for(const[l,h]of Object.entries(o[e]??{}))"number"==typeof h&&s.set(l,Math.min(s.get(l)??1/0,h));const l=[...s.keys()].sort((e,o)=>s.get(e)-s.get(o)),h=new Map;for(const e of["dry","wet"])for(const[s,l]of Object.entries(o[e]??{}))"number"==typeof l&&h.set(s,Math.max(h.get(s)??-1/0,l));const d=new Map;for(const s of["dry","wet"])for(const[l,h]of Object.entries(e?.[s]??{})){if(d.has(l)||!Array.isArray(h)||!h.length)continue;const e=o[s]??{},p=[...h].sort((o,s)=>(e[o]??1/0)-(e[s]??1/0))[0];d.set(l,p)}return{order:l,first:d,finish:h}}function hexToRgb(e){const o=/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec((e??"").trim());return o?[parseInt(o[1],16),parseInt(o[2],16),parseInt(o[3],16)]:null}async function tintMapImage(e,o){const s=hexToRgb(o);if(!s)return null;try{const o=new Image;o.crossOrigin="anonymous",o.src=e,await o.decode();const l=o.naturalWidth,h=o.naturalHeight;if(!l||!h)return null;const d=document.createElement("canvas");d.width=l,d.height=h;const p=d.getContext("2d",{willReadFrequently:!0});if(!p)return null;p.drawImage(o,0,0);const u=p.getImageData(0,0,l,h);!function tintPixels(e,o,s,l=24){for(let h=0;h<e.length;h+=4){if(Math.abs(e[h]-o[0])+Math.abs(e[h+1]-o[1])+Math.abs(e[h+2]-o[2])<l||e[h+3]<10){e[h+3]=0;continue}const d=.35+(.3*e[h]+.59*e[h+1]+.11*e[h+2])/255*.9;e[h]=Math.min(255,s[0]*d),e[h+1]=Math.min(255,s[1]*d),e[h+2]=Math.min(255,s[2]*d)}}(u.data,function cornerBackground(e,o,s){const at=(s,l)=>{const h=4*(l*o+s);return[e[h],e[h+1],e[h+2]]},l=[at(0,0),at(o-1,0),at(0,s-1),at(o-1,s-1)];let h=l[0],d=0;for(const e of l){const o=l.filter(o=>o[0]===e[0]&&o[1]===e[1]&&o[2]===e[2]).length;o>d&&(h=e,d=o)}return h}(u.data,l,h),s),p.putImageData(u,0,0);const m=await new Promise(e=>d.toBlob(e,"image/png"));return m?URL.createObjectURL(m):null}catch{return null}}var xe;const we={main_brush_time_left:300,side_brush_time_left:200,filter_time_left:150,sensor_time_left:30};console.info(`%c ANYVAC-CARD %c v${Qt} `,"background:#2196F3;color:#fff;font-weight:700;padding:2px 4px;border-radius:3px 0 0 3px","background:#1a1a1a;color:#fff;font-weight:400;padding:2px 4px;border-radius:0 3px 3px 0");let $e=class AnyVacCard extends Vt{constructor(){super(...arguments),this.editMode=!1,this._shownSet=new Set([0]),this._holdId=null,this._mapMode="normal",this._inspectKey=null,this._robotSheet=null,this._robotSheetTab=null,this._veNotice=null,this._tileHoldFired=!1,this._modeSheetOpen=!1,this._careResetPending=new Map,this._modeEntity=null,this._dbg="",this._zoneDrag=null,this._zoneRectShown=null,this._zonePending=null,this._zoneMulti=!1,this._zoneEdit=null,this._pinPending=null,this._queueView=null,this._queueSel=null,this._queueAdd=null,this._queueSheet=!1,this._spSet=null,this._spMenu=null,this._spDelete=null,this._notice=null,this._noticeTimer=null,this._layers={dry:!0,wet:!1},this._layerMenu=null,this._layerHoldTimer=null,this._layerHeld=!1,this._localRoomSel=new Map,this._activePresets=new Map,this._planMode="both",this._activeGlobalPreset=null,this._cardW=0,this._mapAR=3.636,this._alignSession=null,this._alignView={zoom:1,panX:0,panY:0,rot:0},this._alignCancelConfirm=!1,this._alignCopiedFlash=!1,this._veTool="seat",this._roomsSession=null,this._furnSession=null,this._furnGesture=null,this._furnAssets=null,this._furnAssetsBusy=!1,this._furnAssetsError="",this._furnUrlDraft="",this._furnCopiedFlash=!1,this._furnSaveError="",this._furnShowReach=!0,this._furnScale=null,this._furnUploadBusy=!1,this._roomsGesture=null,this._roomsDrawGesture=null,this._roomsDeleteConfirm=null,this._roomsCopiedFlash=!1,this._floorplanCopiedFlash=!1,this._floorplanMode="geo",this._floorCalib=null,this._floorCalibRefNat=null,this._floorCalibResult=null,this._floorCalibError="",this._homeCalib=null,this._homeCalibBusy=!1,this._homeCalibError="",this._homeCalibResult=null,this._homeCalibSnapshotUrl="",this._homeCalibCrop=null,this._homeCalibFrameId="",this._fiducialSnapshotBusy=!1,this._fiducialSnapshotError="",this._fiducialSnapshotPath="",this._fiducialKnown=null,this._fiducialDetectBusy=!1,this._fiducialDetectError="",this._fiducialDetectResult=null,this._floorplanSnapshotBusy=!1,this._floorplanSnapshotError="",this._homeFrameSnapshotBusy=!1,this._homeFrameSnapshotError="",this._guideExportBusy=!1,this._guideExportError="",this._guideExportResult=null,this._placeRoomsResult=null,this._veToolSwitchTarget=null,this._floorplanSession=null,this._alignHost=null,this._alignGesture=null,this._floorGesture=null,this._recropDraft={rotation:0,scale:100,offset_x:0,offset_y:0},this._recropHistory=[],this._recropFuture=[],this._recropGesture=null,this._recropNat=null,this._alignMapNat=null,this._profile="landscape",this._mapRegW=0,this._mapRegH=0,this._mapAvailW=0,this._mapAvailH=0,this._lastStack=!1,this._lastPortraitFitW=0,this._fillJp=null,this._fillMap=null,this._doneSeen=null,this._sheenRooms=new Set,this._veTint=!0,this._tintCache=new Map,this._tintPending=new Set,this._startSeq=null,this._markerPrev=new Map,this._markerMoves=new Map,this._markerStops=new Set,this._markerAnims=new Map,this._gridGapPx=6,this._lastRotate=!0,this._flipLive=null,this._ro=null,this._onWinResize=null,this._measureRaf=0,this._measureTimer=null,this._settleTimer=null,this._panelViewMo=null,this._panelViewWarned=!1,this._panelViewNode=null,this._barMo=null,this._editBarRo=null,this._now=Date.now(),this._tickTimer=null,this._holdTimer=null,this._holdStartPos=null,this._initialized=!1,this._watched=null,this._intCache=new Map,this._mapCandCache=new Map,this._autoCache=new Map,this._careCache=new Map,this._memoMapAR=0,this._roomsMemo=new Map,this._seatMemo=new Map,this._homeFrameMemo=new Map,this._holdEnd=()=>{this._cancelHold()},this._holdMove=e=>{if(!this._holdStartPos||null===this._holdTimer)return;const o=e.clientX-this._holdStartPos.x,s=e.clientY-this._holdStartPos.y;o*o+s*s>144&&this._cancelHold()},this._planPreview=null,this._planFetchKey="",this._alignViewDrag=null,this._floorCalibDragStart=null,this._homeCalibDragStart=null,this._onFloorplanLoad=e=>{const o=e.target;if(o?.naturalWidth&&o.naturalHeight){const e=o.naturalWidth/o.naturalHeight;e>.1&&Math.abs(e-this._mapAR)>.01&&(this._mapAR=e)}}}static getConfigElement(){return document.createElement(Jt)}static getStubConfig(e){const o=e?Object.keys(e.states).filter(e=>e.startsWith("vacuum.")):[],s=e?.entities,l=s?o.filter(e=>"matter"!==s[e]?.platform):o,h=l.length>0?l:o;return 0===h.length?{type:`custom:${Zt}`,vacuums:[{entity:"vacuum.my_roborock",name:"Roborock",rooms:[],clean_action:{type:"native"}}]}:{type:`custom:${Zt}`,vacuums:h.map(o=>({entity:o,name:e.states[o]?.attributes.friendly_name??o.replace(/^vacuum\./,""),rooms:[],clean_action:{type:"native"}}))}}setConfig(e){if(!e.vacuums||!Array.isArray(e.vacuums)||0===e.vacuums.length)throw new Error("[anyvac-card] 'vacuums' must be a non-empty array");if(this._rawConfig=e,this._config=e,this._watched=null,this._intCache.clear(),this._mapCandCache.clear(),this._autoCache.clear(),this._careCache.clear(),this._roomsMemo.clear(),this._seatMemo.clear(),this._initialized){const o=new Set;for(const s of this._shownSet)s<e.vacuums.length&&o.add(s);this._shownSet=o.size>0?o:new Set(e.vacuums.map((e,o)=>o))}else this._initialized=!0,this._shownSet=this._loadShown(),this._localRoomSel=this._loadRoomSel(),this._flipLive=this._loadFlipLive(),this._queueView=this._loadQueueView()}getCardSize(){return 6}connectedCallback(){super.connectedCallback(),this.style.setProperty("--hold-ms",te+"ms"),this._ro||"undefined"==typeof ResizeObserver||(this._ro=new ResizeObserver(()=>this._scheduleMeasure()),this._ro.observe(this)),this._onWinResize||(this._onWinResize=()=>this._scheduleMeasure(),window.addEventListener("resize",this._onWinResize,{passive:!0}),window.addEventListener("orientationchange",this._onWinResize,{passive:!0})),this._setupPanelViewObserver(),this._scheduleMeasure(),this._tickTimer||(this._tickTimer=window.setInterval(()=>{this._config?.debug_room_progress&&(this._config.vacuums??[]).some(e=>this._isCleaning(e)||this._isPaused(e))&&(this._now=Date.now())},1e3))}_scheduleMeasure(){if(this._measureRaf||null!==this._measureTimer)return;const run=()=>{this._measureRaf=0,this._measureTimer=null,this._doMeasure()};"undefined"!=typeof document&&document.hidden?this._measureTimer=window.setTimeout(run,0):this._measureRaf=requestAnimationFrame(run)}_doMeasure(){const e=this.getBoundingClientRect(),o=Math.round(e.width);o&&Math.abs(o-this._cardW)>=2&&(this._cardW=o);const s=this._config?.layout;if(s){const l=function pickProfile(e,o,s){const l=e?.orientation;return"portrait"===l||"landscape"===l?l:o&&s&&o/s<(e?.threshold??1)?"portrait":"landscape"}(s,this._cardW||o||window.innerWidth,this._availableHeight(s,e));l!==this._profile&&(this._profile=l),this._refineGridHeight()}}_availableHeight(e,o){if("container"===(e.height??"viewport"))return o.height>1?Math.round(o.height):window.innerHeight;const s=o.top;return s>=0&&s<window.innerHeight?Math.max(1,Math.round(window.innerHeight-s-this._editBarHeight())):window.innerHeight}_editBarHeight(){try{const e=this._findCardOptionsAncestor();if(!e?.shadowRoot)return 0;const o=e.shadowRoot.querySelector(".card-actions");if(!o)return 0;const s=o.getBoundingClientRect();if(!(s.height>0))return 0;const l=getComputedStyle(o);return Math.ceil(s.height+(parseFloat(l.marginTop)||0)+(parseFloat(l.marginBottom)||0))}catch{return 0}}_findPanelViewAncestor(){let e=this.parentElement??this.getRootNode().host??null,o=0;for(;e&&o++<20;){if(e instanceof Element&&("HUI-PANEL-VIEW"===e.tagName||"HUI-VIEW"===e.tagName))return e;const o=e;e=o.parentElement??o.getRootNode()?.host??null}return null}_findCardOptionsAncestor(){let e=this.parentElement??this.getRootNode().host??null,o=0;for(;e&&o++<12;){if(e instanceof Element&&"HUI-CARD-OPTIONS"===e.tagName)return e;const o=e;e=o.parentElement??o.getRootNode()?.host??null}return null}_setupPanelViewObserver(){if("undefined"==typeof MutationObserver)return;if(this._panelViewMo&&this._panelViewNode?.isConnected)return;this._panelViewMo&&(this._panelViewMo.disconnect(),this._panelViewMo=null,this._panelViewNode=null);const e=this._findPanelViewAncestor();if(!e){if(!this._panelViewWarned){this._panelViewWarned=!0;try{console.warn("[anyvac-card] hui-panel-view/hui-view ancestor not found (HA internal DOM may have changed) — edit-mode layout refresh via MutationObserver is disabled; resize-based refresh still works.")}catch{}}return}const o=new MutationObserver(()=>{this._scheduleMeasure(),this._watchEditBar();const e=this._findCardOptionsAncestor();if(e?.shadowRoot)try{o.observe(e.shadowRoot,{childList:!0,subtree:!0})}catch{}});try{o.observe(e,{childList:!0,subtree:!0})}catch{}if(e.shadowRoot)try{o.observe(e.shadowRoot,{childList:!0,subtree:!0})}catch{}const s=this._findCardOptionsAncestor();if(s?.shadowRoot)try{o.observe(s.shadowRoot,{childList:!0,subtree:!0})}catch{}this._panelViewMo=o,this._panelViewNode=e,this._watchEditBar()}_watchEditBar(){this._barMo&&(this._barMo.disconnect(),this._barMo=null);const e=this._findCardOptionsAncestor();if(!e?.shadowRoot)return;const o=e.shadowRoot.querySelector(".card-actions");if(o)return void this._observeEditBar(o);const s=e.shadowRoot,l=new MutationObserver(()=>{const e=s.querySelector(".card-actions");e&&(l.disconnect(),this._barMo=null,this._observeEditBar(e))});try{l.observe(s,{childList:!0,subtree:!0})}catch{return}this._barMo=l}_observeEditBar(e){if(this._scheduleMeasure(),"undefined"==typeof ResizeObserver)return;this._editBarRo&&(this._editBarRo.disconnect(),this._editBarRo=null);const o=new ResizeObserver(()=>this._scheduleMeasure());try{o.observe(e)}catch{return}this._editBarRo=o}_refineGridHeight(){const e=this._config?.layout;if(!e)return;const o=this.renderRoot?.querySelector(".avc-grid");if(!o)return;if("viewport"===(e.height??"viewport")){const e=o.getBoundingClientRect().top;if(e>=0&&e<window.innerHeight){const s=Math.round(window.innerHeight-e-this._editBarHeight());s>120&&(o.style.height=s+"px")}}const s=this.renderRoot?.querySelector(".avc-region--map");if(s){const e=Math.round(s.clientWidth),o=Math.round(s.clientHeight);e&&Math.abs(e-this._mapRegW)>=2&&(this._mapRegW=e),o&&Math.abs(o-this._mapRegH)>=2&&(this._mapRegH=o)}if("portrait"===this._profile){const e=this.renderRoot?.querySelector(".avc-region--start"),s=this.renderRoot?.querySelector(".avc-region--hero"),l=parseFloat(getComputedStyle(o).rowGap||getComputedStyle(o).gap||"0")||0,h=e?Math.round(e.getBoundingClientRect().height):0,d=s?Math.round(s.getBoundingClientRect().height):0;this._gridGapPx=l;const p=Math.round(o.clientWidth),u=Math.round(o.clientHeight-h-(h?l:0)-d-(d?l:0));p&&Math.abs(p-this._mapAvailW)>=2&&(this._mapAvailW=p),u>0&&Math.abs(u-this._mapAvailH)>=2&&(this._mapAvailH=u)}}disconnectedCallback(){super.disconnectedCallback(),this._cancelHold(),this._measureRaf&&(cancelAnimationFrame(this._measureRaf),this._measureRaf=0),null!==this._measureTimer&&(clearTimeout(this._measureTimer),this._measureTimer=null),null!==this._settleTimer&&(clearTimeout(this._settleTimer),this._settleTimer=null),this._tickTimer&&(clearInterval(this._tickTimer),this._tickTimer=null),this._onWinResize&&(window.removeEventListener("resize",this._onWinResize),window.removeEventListener("orientationchange",this._onWinResize),this._onWinResize=null),this._ro&&(this._ro.disconnect(),this._ro=null),this._panelViewMo&&(this._panelViewMo.disconnect(),this._panelViewMo=null),this._panelViewNode=null,this._barMo&&(this._barMo.disconnect(),this._barMo=null),this._editBarRo&&(this._editBarRo.disconnect(),this._editBarRo=null),unmountVisualEditor(this._alignHost),this._alignHost=null}firstUpdated(){const e=Math.round(this.getBoundingClientRect().width);e&&(this._cardW=e),this._scheduleMeasure()}updated(){if(this._runMarkerGlides(),this._alignSession&&!this._alignHost){const e=this.constructor.elementStyles,o=[];for(const s of e){const e=s instanceof CSSStyleSheet?s:s.styleSheet;e&&o.push(e)}this._alignHost=function mountVisualEditor(e,o){const s=document.createElement(me);s.style.cssText="position:fixed;inset:0;z-index:2147483647;",document.body.appendChild(s);const l=s.shadowRoot;if(l){e.length&&"adoptedStyleSheets"in l&&(l.adoptedStyleSheets=e);const h=getComputedStyle(o);for(const e of ge){const o=h.getPropertyValue(e);o&&s.style.setProperty(e,o)}}return s}(o,this)}else!this._alignSession&&this._alignHost&&(unmountVisualEditor(this._alignHost),this._alignHost=null);if(this._alignHost?.shadowRoot&&D(this._renderVisualEditor(),this._alignHost.shadowRoot),this._careResetPending.size){let e=null;for(const[o,s]of this._careResetPending){const l=this.hass?.states[o],h=l?Date.parse(l.last_changed):NaN;Number.isFinite(h)&&h>s&&(e||(e=new Map(this._careResetPending)),e.delete(o))}e&&(this._careResetPending=e)}this._refineGridHeight(),this._refineGridColumns(),this._setupPanelViewObserver(),null!==this._settleTimer&&clearTimeout(this._settleTimer),this._settleTimer=window.setTimeout(()=>{this._settleTimer=null,this._scheduleMeasure()},250)}_refineGridColumns(){if("portrait"!==this._profile||!this._lastPortraitFitW)return;if(this._config.layout?.portrait?.columns?.length)return;if(this._stackTopology)return;const e=this.renderRoot?.querySelector(".avc-grid");if(!e)return;const o=e.clientWidth-(parseFloat(getComputedStyle(e).columnGap||"0")||0);let s=Math.round(this._lastPortraitFitW);o>0&&(s=Math.min(s,o)),this._isRail()&&o>2*_e&&(s=Math.min(s,o-_e));const l=Math.round(s)+"px 1fr";e.style.gridTemplateColumns!==l&&(e.style.gridTemplateColumns=l)}shouldUpdate(e){if(this._syncEffectiveConfig(),!e.has("hass")||e.size>1)return!0;const o=e.get("hass");if(!o||!this._config)return!0;for(const e of this._watchedEntities())if(o.states[e]!==this.hass.states[e])return!0;return!1}_syncEffectiveConfig(){if(!this._rawConfig||!this.hass)return;const e=this._floorplanSeatsRaw(),o=function applyFloorplanSeats(e,o){if(!o||!e?.vacuums?.length)return e;let s=!1;const l=e.vacuums.map(l=>{const h=resolveImageBaseSrc(e,l),d=h?o[h]?.vacuums?.[l.entity]:null;if(!d)return l;let p=l;if(d.map&&(s=!0,p={...p,map:{...d.map,seat:"manual"}}),d.appearance&&(s=!0,p={...p,...d.appearance}),d.rooms){const e=mergeRoomOverrides(p.rooms,d.rooms);e!==p.rooms&&(s=!0,p={...p,rooms:e})}return p});let h=e.image_base,d=e.rooms,p=e.room_border_normal,u=e.room_border_selected;if("merged"===e.map_mode&&e.image_base?.src){const l=o[e.image_base.src],m=l?.image_base;if(m&&(h={...e.image_base,...m},s=!0),l?.rooms){const e=mergeRoomOverrides(d,l.rooms);e!==d&&(s=!0,d=e)}l?.room_style&&(void 0!==l.room_style.border_normal&&(p=l.room_style.border_normal,s=!0),void 0!==l.room_style.border_selected&&(u=l.room_style.border_selected,s=!0))}return s?{...e,vacuums:l,image_base:h,rooms:d,room_border_normal:p,room_border_selected:u}:e}(this._rawConfig,e);o!==this._config&&JSON.stringify(o)!==JSON.stringify(this._config)&&(this._config=o,this._roomsMemo.clear(),this._seatMemo.clear())}_floorplanSeatsRaw(){for(const e of this._rawConfig?.vacuums??[]){const o=this._intAttrs(e),s=o?.floorplan_seats;if(s)return s}}_watchedEntities(){if(this._registry(),this._watched)return this._watched;const e=new Set;for(const o of this._config?.vacuums??[]){for(const s of[o.entity,o.status_entity,o.battery_entity,o.last_clean_entity,o.progress_entity,o.current_room_entity,o.error_entity,this._mapEntityFor(o),this._intEntity(o),...Object.values(this._autoEntities(o))])s&&e.add(s);for(const s of this._roomsFor(o))s.last_clean_entity&&e.add(s.last_clean_entity),s.clean_time_entity&&e.add(s.clean_time_entity);for(const s of this._careItems(o))s.entity&&e.add(s.entity),s.reset&&e.add(s.reset),s.binary&&e.add(s.binary)}for(const o of this._config?.global_actions??[])for(const s of o.watch_entities??[])s&&e.add(s);return this.hass?.entities&&(this._watched=e),e}_resolveColor(e,o){const s=e??o;return ie[s]??s}_resolveBg(e,o,s){return(s?ne:se)[e??o]??function hexToRgba(e,o){const s=/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(e);if(!s)return`rgba(255,255,255,${o})`;let l=s[1];return 3===l.length&&(l=l.split("").map(e=>e+e).join("")),`rgba(${parseInt(l.slice(0,2),16)},${parseInt(l.slice(2,4),16)},${parseInt(l.slice(4,6),16)},${o})`}(this._resolveColor(e,o),s?.3:.18)}_vacIndex(e){const o=this._config?.vacuums?.findIndex(o=>o.entity===e.entity)??-1;return o<0?0:o}_defaultColor(e){return ae[this._vacIndex(e)%ae.length]}_color(e){return this._resolveColor(e.color,this._defaultColor(e))}_colorBg(e){return this._resolveBg(e.color,this._defaultColor(e),!1)}_colorBgActive(e){return this._resolveBg(e.color,this._defaultColor(e),!0)}_registry(){const e=this.hass?.entities;return e!==this._regRef&&(this._regRef=e,this._intCache.clear(),this._mapCandCache.clear(),this._autoCache.clear(),this._careCache.clear(),this._watched=null),e}_intEntity(e){if(e.integration_entity)return e.integration_entity;const o=this._registry();if(!o||!e.entity)return;if(this._intCache.has(e.entity))return this._intCache.get(e.entity);const s=o[e.entity]?.device_id,l=s?Object.keys(o).find(e=>o[e]?.device_id===s&&"anyvac"===o[e]?.platform&&e.startsWith("sensor.")):void 0;return this._intCache.set(e.entity,l),l}_mapEntityFor(e){if(e.map?.entity)return e.map.entity;const o=this._registry();if(!o||!e.entity)return;let s=this._mapCandCache.get(e.entity);if(!s){const l=o[e.entity]?.device_id;if(!l)return;s=Object.keys(o).filter(e=>o[e]?.device_id===l&&e.startsWith("image.")),this._mapCandCache.set(e.entity,s)}if(1===s.length)return s[0];const l=s.filter(e=>{const o=this.hass.states[e];return!!o&&"unavailable"!==o.state&&"unknown"!==o.state&&!!o.attributes.entity_picture});return 1===l.length?l[0]:void 0}_reachUrl(e){const o=this._intAttrs(e)?.reach;if(!o?.entity_id||!o.updated||!Object.values(o.rooms??{}).some(e=>!e?.stale))return;const s=this.hass?.states?.[o.entity_id]?.attributes?.entity_picture;return s?this.hass.hassUrl?this.hass.hassUrl(s):s:void 0}_reachHomeUrl(e){const o=this._intAttrs(e)?.reach;if(!o?.home_entity_id||!o.home_ready||!Object.values(o.rooms??{}).some(e=>!e?.stale))return;const s=this.hass?.states?.[o.home_entity_id]?.attributes?.entity_picture;return s?this.hass.hassUrl?this.hass.hassUrl(s):s:void 0}_renderReachImg(e,o,s,l,h,d){const p=this._mapAR>.1?this._mapAR:3.636,u=this._homeFrameCropFor(e),m=u?null:this._homeAnchorFitFor(e,p),_=void 0!==d?{opacity:String(d)}:{};if(u||m){const o=this._reachHomeUrl(e),d=this._intAttrs(e)?.home_frame,f=m?m.dims.NW:d?.width_px??0,v=m?m.dims.NH:d?.height_px??0;if(!(o&&f>0&&v>0))return It;if(u){const e=u.x1-u.x0,s=u.y1-u.y0;return e>0&&s>0?Dt`<img class="reach-home-img ${h}" src=${o} alt="" style=${Xt({..._,position:"absolute",left:-u.x0/e*100+"%",top:-u.y0/s*100+"%",width:f/e*100+"%",height:v/s*100+"%",maxWidth:"none"})} />`:It}const b=m,P=(e,o)=>{const h=projectHomePxThroughFit({x:e,y:o},b.dims,b.fit,p);return{x:h.x/100*s,y:h.y/100*l}},w=P(0,0),$=P(f,0),C=P(0,v),A=[($.x-w.x)/f,($.y-w.y)/f,(C.x-w.x)/v,(C.y-w.y)/v,w.x,w.y];return Dt`<img class="reach-home-img ${h}" src=${o} alt="" style=${Xt({..._,position:"absolute",left:"0",top:"0",width:f+"px",height:v+"px",maxWidth:"none",transformOrigin:"0 0",transform:"matrix("+A.join(",")+")"})} />`}const f=this._reachUrl(e);return f?Dt`<img class="align-seat-img align-reach-img ${h}" src=${f} alt="" style=${Xt({..._,left:50+o.offset_x+"%",top:50+o.offset_y+"%",width:o.scale+"%",transform:"translate(-50%,-50%) "+seatRotateScaleCss(o.rotation,o.scale,o.scaleY)})} />`:It}_hasReach(e){const o=this._mapAR>.1?this._mapAR:3.636;return!!this._homeFrameCropFor(e)||!!this._homeAnchorFitFor(e,o)?!!this._reachHomeUrl(e):!!this._reachUrl(e)}_intAttrs(e){const o=this._intEntity(e),s=o?this.hass.states[o]?.attributes:void 0;if(s)return(s.schema_version??0)>=2?s:void 0}_schemaWarning(){for(const e of this._config?.vacuums??[]){const o=this._intEntity(e),s=o?this.hass.states[o]?.attributes:void 0;if(s&&(s.schema_version??0)<2)return`AnyVac integration is too old for this card (schema ${s.schema_version??1} < 2). Update the anyvac integration to ≥ 0.18.0.`}return null}_autoEntities(e){const o=this._registry();if(!o||!e.entity)return{};const s=this._autoCache.get(e.entity);if(s)return s;const l=o[e.entity]?.device_id;if(!l)return{};const h=Object.keys(o).filter(e=>o[e]?.device_id===l),byTk=e=>h.find(s=>o[s]?.translation_key===e),d={status:byTk("status"),battery:(e=>h.find(o=>this.hass.states[o]?.attributes?.device_class===e))("battery"),last_clean:byTk("last_clean_end"),progress:byTk("clean_percent"),current_room:byTk("current_room"),error:byTk("vacuum_error")};return this._autoCache.set(e.entity,d),d}_ent(e,o){return e[o+"_entity"]??this._autoEntities(e)[o]}_statusInfo(e){const o=this.hass.states[this._ent(e,"status")??e.entity]?.state??"unknown",s=ee[o]??[o,"rgba(var(--avc-ink-rgb),0.5)","mdi:robot-vacuum"],l=this._themed()?oe[s[1]]:void 0;return l?[this._t(s[0]),l,s[2]]:[this._t(s[0]),s[1],s[2]]}_careItems(e){const o=this._registry(),s=this.hass?.devices;if(!o||!s||!e.entity)return[];const l=this._dockCaps(e),h=e.entity+"|"+this._dockCapsKey(e);if(this._careCache.has(h))return this._careCache.get(h);const d=o[e.entity]?.device_id,p=d?s[d]:void 0,u=p?.identifiers?.find(([e])=>"roborock"===e)?.[1],m=u?Object.values(s).find(e=>e.identifiers?.some(([e,o])=>"roborock"===e&&o===`${u}_dock`)):void 0,_=m?.id,byTk=(e,s,l)=>e?Object.keys(o).find(h=>o[h]?.device_id===e&&o[h]?.translation_key===s&&h.startsWith(l+".")):void 0,f=[],consumable=(e,o,s,l)=>{const h=byTk(l,o,"sensor"),d=byTk(l,s,"button");(h||d)&&f.push({key:o,label:this._t(e),entity:h,reset:d,totalHours:we[o]})};if(consumable("Main brush","main_brush_time_left","reset_main_brush_consumable",d),consumable("Side brush","side_brush_time_left","reset_side_brush_consumable",d),consumable("Filter","filter_time_left","reset_air_filter_consumable",d),consumable("Sensors","sensor_time_left","reset_sensor_consumable",d),l.wash){consumable("Dock brush","cleaning_brush_time_left","reset_dock_cleaning_brush_consumable",_),consumable("Strainer","strainer_time_left","reset_dock_strainer_consumable",_);const binary=(e,o)=>{const s=byTk(_,o,"binary_sensor");s&&f.push({key:o,label:this._t(e),binary:s})};binary("Dirty water tank","dirty_box_full"),binary("Clean water tank","clean_box_empty"),binary("Cleaning fluid","clean_fluid_empty")}return this._careCache.set(h,f),f}_careValue(e){if(!e.entity)return"—";const o=this.hass.states[e.entity];if(!o||"unavailable"===o.state||"unknown"===o.state)return"—";const s=this._careHours(e);if(null===s)return o.state;const l=this._carePct(e);return null!==l?`${l} %`:`${Math.round(s)} h left`}_careHours(e){if(!e.entity)return null;const o=this.hass.states[e.entity];if(!o||"unavailable"===o.state||"unknown"===o.state)return null;const s=Number(o.state);if(Number.isNaN(s))return null;const l=o.attributes?.unit_of_measurement;return"s"===l?s/3600:"min"===l?s/60:s}_carePct(e){const o=this._careHours(e);return null!==o&&e.totalHours?Math.max(0,Math.min(100,Math.round(o/e.totalHours*100))):null}_careWarnPct(){const e=Number(this._config.care_warn_pct??10);return Number.isFinite(e)?Math.max(0,Math.min(100,e)):10}_vacAttention(e){const o=this._intAttrs(e)?.dock_status,s=o?.dock_error_status,l=this._careItems(e),h=l.some(e=>e.binary&&"on"===this.hass.states[e.binary]?.state),d=this._careWarnPct(),p=l.some(e=>{if(e.binary)return!1;const o=this._carePct(e);return null!==o&&o<=d});return{dock:null!=s&&0!==s&&"0"!==s||h,care:p}}_attnDot(e){const o=this._vacAttention(e);if(!o.dock&&!o.care)return It;const s=this._t(o.dock&&o.care?"dock and care":o.dock?"dock":"care"),l=this._t("Needs attention: {what}",{what:s});return Dt`<span class="vac-attn-dot" role="img" aria-label=${l} title=${l}></span>`}_openRobotSheet(e,o="clean"){this._robotSheet=e,this._robotSheetTab={idx:e,tab:o}}_isCleaning(e){return ce.has(this.hass.states[e.entity]?.state??"")}_hasError(e){const o=this._ent(e,"error"),s=o?this.hass.states[o]?.state:null;return!!s&&"none"!==s&&"unknown"!==s&&"unavailable"!==s}_isPaused(e){return"paused"===this.hass.states[e.entity]?.state}_battery(e){const o=this._ent(e,"battery");if(!o)return null;const s=parseInt(this.hass.states[o]?.state??"");return isNaN(s)?null:s}_lastCleanStr(e){const o=this._ent(e,"last_clean"),s=o?this.hass.states[o]?.state:void 0;if(!s||"unavailable"===s||"unknown"===s)return"—";const l=new Date(s),h=Math.floor((Date.now()-l.getTime())/864e5),d=fmtClock(this.hass,l);return 0===h?this._t("Today · {time}",{time:d}):1===h?this._t("Yesterday · {time}",{time:d}):this._t("{date} · {time}",{date:(p=this.hass,u=l,u.toLocaleDateString(intlTag(p),{day:"2-digit",month:"2-digit"})),time:d});var p,u}_progress(e){const o=this._ent(e,"progress");if(!o)return null;const s=parseInt(this.hass.states[o]?.state??"");return isNaN(s)||0===s?null:s}_selSensor(){for(const e of this._config.vacuums){const o=this._intEntity(e);if(o&&Array.isArray(this.hass.states[o]?.attributes?.selected_rooms))return o}}_backendSel(){const e=this._selSensor();return e?new Set(this.hass.states[e]?.attributes?.selected_rooms??[]):null}_setBackendSel(e,o){this._call("anyvac","select_rooms",{rooms:e,mode:o})}_isRoomSelected(e,o){const s=this._backendSel();return s?s.has(e.key):this._localRoomSel.get(o.entity+":"+e.key)??!1}_layersEff(){const e=this._selSensor(),o=e?this.hass.states[e]?.attributes?.view_layers:void 0;return o&&"boolean"==typeof o.dry&&"boolean"==typeof o.wet?{dry:o.dry,wet:o.wet}:this._layers}_staticRoomsFor(e){return resolveStaticRooms(this._config,e)}_memoSync(){this.hass===this._memoHass&&this._mapAR===this._memoMapAR||(this._memoHass=this.hass,this._memoMapAR=this._mapAR,this._roomsMemo.clear(),this._seatMemo.clear(),this._homeFrameMemo.clear())}_roomsFor(e){this._memoSync();const o=this._roomsMemo.get(e.entity);if(o)return o;const s=this._computeRoomsFor(e);return this._roomsMemo.set(e.entity,s),s}_computeRoomsFor(e){const o=this._intAttrs(e),s=Array.isArray(o?.rooms)?o.rooms:[];if(!o||!s.length)return this._staticRoomsFor(e);const l=this._homeFrameCropFor(e),h=this._wrapAspect(this._baseHeightFor(e)),d=l?null:this._homeAnchorFitFor(e,h),p=l||d?null:this._effectiveSeat(e),u=this._staticRoomsFor(e),m=new Map(u.filter(e=>e.key).map(e=>[e.key,e])),_=new Set,f=[];for(const e of s){const s=e?.name;if(!s)continue;_.add(s);const u=m.get(s);if(u&&null!=u.map_x&&null!=u.map_y){f.push(u);continue}const v=l?e?.bbox_home_px?placeRoomInCrop(e.bbox_home_px,l):null:d?e?.bbox_home_px?roomBboxToRect({bbox_px:e.bbox_home_px},{image_dims:{width:d.dims.NW,height:d.dims.NH,scale:1,rotation:0}},d.fit,h):null:roomBboxToRect(e,o,p,h);if(!v){u&&f.push(u);continue}const b=l?outlineInCrop(e?.outline_home_px,l):d?outlineThroughFit(e?.outline_home_px,d.dims,d.fit,h):null;f.push({...u??{key:s,name:s,icon:"mdi:floor-plan"},...v,outline_pct:b??void 0})}for(const e of u)e.key&&!_.has(e.key)&&f.push(e);return f}_hasSelectedRooms(e){return this._roomsFor(e).some(o=>this._isRoomSelected(o,e))}_liveCleanType(e){if((e.presets?.length??0)>=2){const o=this._activePreset(e);return null!=o.mop_intensity&&""!==o.mop_intensity&&"off"!==o.mop_intensity||null!=o.mop_mode&&""!==o.mop_mode?"wet":"dry"}const o=this._intAttrs(e),s=o?.clean_type;if(o?.in_cleaning&&("wet"===s||"dry"===s))return s;const l=o?.mode_signal??o?.clean_type;if("wet"===l||"dry"===l)return l;const h=this._vacCleanType(e);return h.wet&&!h.dry?"wet":"dry"}_backendEstimate(e,o,s){const l=this._intAttrs(e)?.rooms_estimate;if(!l)return null;const h=l[o.name??""]??l[o.key],d=h?h[s]:void 0;return"number"==typeof d&&d>0?d:null}_roomCleanMins(e,o){const s=this._vacCleanType(o),l=!(!s.wet||s.dry)||!(s.dry&&!s.wet)&&"wet"===this._liveCleanType(o),h=this._backendEstimate(o,e,l?"wet":"dry");if(null!=h)return h;const d=l?e.clean_time_wet:e.clean_time_dry;if(null!=d&&d>0)return d;const p=l?e.clean_time_dry:e.clean_time_wet;if(null!=p&&p>0)return p;if(e.clean_time_entity){const o=parseFloat(this.hass.states[e.clean_time_entity]?.state??"");if(!isNaN(o)&&o>0)return o}return e.clean_time_mins??0}_totalCleanMins(e){return this._roomsFor(e).reduce((o,s)=>this._isRoomSelected(s,e)?o+this._roomCleanMins(s,e):o,0)}_intRoomRec(e,o){const s=this._intAttrs(e)?.rooms_last_cleaned;return s?s[o.key]??s[o.name??""]??null:null}_roomCoverageRec(e,o){const s=this._intAttrs(e)?.rooms_coverage;return s?s[o.key]??s[o.name??""]??null:null}_ageDaysFromIso(e){if(!e)return null;const o=new Date(e).getTime();return isNaN(o)?null:(Date.now()-o)/864e5}_roomAgeDays(e,o){if(o){const s=this._intRoomRec(o,e);if(s){const e=this._ageDaysFromIso(s.dry),o=this._ageDaysFromIso(s.wet),l=this._ageDaysFromIso(s.any),h=this._layersEff(),d=h.dry,p=h.wet;let u;if(u=d&&p?Math.max(e??9999,o??9999):d?e:p?o:l,null!==u)return u}}if(!e.last_clean_entity)return null;const s=this.hass.states[e.last_clean_entity]?.state;return s&&"unavailable"!==s&&"unknown"!==s?(Date.now()-new Date(s).getTime())/864e5:null}_colorForAgeDays(e){if(null===e)return"rgba(255,77,77,0.85)";const o=[...this._config.room_thresholds??[{days:2,color:"rgba(46,204,113,0.85)"},{days:5,color:"rgba(250,173,20,0.85)"},{days:10,color:"rgba(255,152,0,0.85)"}]].sort((e,o)=>e.days-o.days);for(const s of o)if(e<=s.days)return s.color;return"rgba(255,77,77,0.85)"}_vacCleanType(e){if("dry"===e.clean_type)return{dry:!0,wet:!1};if("wet"===e.clean_type)return{dry:!1,wet:!0};if("both"===e.clean_type)return{dry:!0,wet:!0};const o=this._intAttrs(e)?.mop_signal;if(o){return{dry:!0,wet:null!=o.water_box_mode||!!o.water_mode_name}}const s=e.clean_action,l=!(!s||!(s.mop_mode||s.mop_mode_entity||s.mop_intensity||s.mop_intensity_entity));return{dry:!l||null!=s?.suction_level&&"off"!==s.suction_level,wet:l}}_roomProgress(e,o){const s=this._intAttrs(e)?.rooms_progress;return s?s[o.key]??s[o.name??""]??null:null}_roomProgForType(e,o,s){let l=null,h=null,d=!1,p=null;for(const u of o){const o=this._roomProgress(u,e);if(!o)continue;const m="dry"===s?o.dry_pct:o.wet_pct;if(null==m)continue;const _=!!("dry"===s?o.dry_calibrating:o.wet_calibrating);(null===l||d&&!_||d===_&&m>l)&&(l=m,h=u,d=_,p=o)}if(null===l||!h)return null;const u=p?.passes??null,m=("dry"===s?p?.dry_pass:p?.wet_pass)??null,_=("dry"===s?p?.dry_floor:p?.wet_floor)??null,f=null!=u&&u>1&&null!=m;return{pct:l,kind:"S",title:`${s} · ${l}% done`+(f?` · pass ${m} of ${u}`:"")+(null!=_?` · ${_}% of the reachable floor covered`:""),color:this._color(h),calibrating:d,pass:f?m:null,passes:f?u:null}}_renderCovBadge(e,o,s){const l=e?.[o],h=e?.[`${o}_floor`],d=null!=h&&h<80;return Dt`<small class="dock-cov" title=${`Last ${o} clean: ${(null==l?"":`${l}% of the ordered work done`)||"not measured yet"}`+(null!=h?` · ${h}% of the reachable floor covered`:"")}>${s(l)}</small>${d?Dt`<ha-icon class="dock-cov-warn" icon="mdi:alert-outline"
      title=${`Only ${h}% of the room's reachable floor was covered — was a door closed or part of the room blocked?`}></ha-icon>`:It}`}_progColor(e){return e>=90?"rgb(var(--avc-ok-rgb))":e>=50?"rgb(var(--avc-warn-rgb))":"rgb(var(--avc-info-rgb))"}_renderRoomGauge(e,o){if(!this._config.debug_room_progress)return It;const s=this._roomProgForType(o,e,"dry"),l=this._roomProgForType(o,e,"wet");if(!s&&!l)return It;const g=(e,o,s,l)=>Dt`
      <span class="room-gauge" title=${o}
        style=${Xt({background:`conic-gradient(${s} ${3.6*e}deg, rgba(255,255,255,0.12) 0)`})}>
        <span>${e}${l?"~":""}</span>
      </span>`;return Dt`<div class="room-gauges">
      ${s?g(s.pct,"dry · "+s.title,s.color,s.calibrating):It}
      ${l?g(l.pct,"wet · "+l.title,"#40a9ff",l.calibrating):It}
    </div>`}_renderProgChip(e){if(!e)return It;const o=e.passes?`${e.pass}/${e.passes}`:e.kind;return Dt`<span class="rl-prog" title=${e.title}
      style=${Xt({color:e.color??this._progColor(e.pct)})}>${e.pct}${e.calibrating?"~":""}%<small>${o}</small></span>`}_batIcon(e){return e>80?"mdi:battery":e>50?"mdi:battery-60":e>20?"mdi:battery-30":"mdi:battery-10"}_batColor(e){return e>50?"rgb(var(--avc-ok-rgb))":e>20?"rgb(var(--avc-warn-rgb))":"rgb(var(--avc-err-rgb))"}_mapUrl(e){const o=this.hass.states[e];if(!o)return"";const s=o.attributes.entity_picture;if(!s)return"";const l=new Date(o.last_updated).getTime(),h=s.includes("?")?"&":"?";return this.hass.hassUrl(s+h+"_t="+l)}_timeStr(e){const o=Math.round(e);if(o<=0)return"";if(o>=60){const e=Math.floor(o/60),s=o%60;return s>0?this._t("~{h} h {m} min",{h:e,m:s}):this._t("~{h} h",{h:e})}return this._t("~{n} min",{n:o})}_isGlobalActive(e){return(e.watch_entities??[]).some(e=>ce.has(this.hass.states[e]?.state??""))}async _triggerGlobal(e){const o=e.action;try{if("script"===o.type)await this.hass.callService("script","turn_on",{entity_id:o.entity_id,variables:o.variables??{}});else{const[e,s]=o.service.split(".");await this.hass.callService(e,s,o.data??{})}}catch(e){console.error("[anyvac-card] global action failed:",e)}}_cancelHold(){null!==this._holdTimer&&(clearTimeout(this._holdTimer),this._holdTimer=null),this._holdId=null,this._holdStartPos=null}_holdStart(e,o){return s=>{s.preventDefault(),this._cancelHold(),this._holdId=e,this._holdStartPos={x:s.clientX,y:s.clientY},this._holdTimer=setTimeout(()=>{this._holdTimer=null,this._holdId=null,this._holdStartPos=null,o()},te)}}_toggleShown(e){if(this._config.layout&&"portrait"===this._profile)return this._shownSet=new Set([e]),void this._saveShown();this._toggleShownMulti(e)}_toggleShownMulti(e){const o=new Set(this._shownSet);o.has(e)?o.size>1&&o.delete(e):o.add(e),this._shownSet=o,this._saveShown()}async _call(e,o,s){try{await this.hass.callService(e,o,s)}catch(s){console.error("[anyvac-card] "+e+"."+o+" failed:",s)}}_fireMoreInfo(e){this.dispatchEvent(new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:e}}))}_storeKey(e){const o=(this._config?.vacuums??[]).map(e=>e.entity).join(",");return`anyvac-card:${e}:${o}`}_readStored(e,o){try{return localStorage.getItem(this._storeKey(e))??localStorage.getItem(o)}catch{return null}}_saveShown(){try{const e=[...this._shownSet].map(e=>this._config.vacuums[e]?.entity).filter(Boolean);localStorage.setItem(this._storeKey("shown"),JSON.stringify(e))}catch{}}_loadShown(){try{const e=this._readStored("shown","roborock-card:shown");if(e){const o=JSON.parse(e).map(e=>this._config.vacuums.findIndex(o=>o.entity===e)).filter(e=>e>=0);if(o.length>0)return new Set(o)}}catch{}return new Set(this._config.vacuums.map((e,o)=>o))}_saveFlipLive(){try{null===this._flipLive?localStorage.removeItem(this._storeKey("flip")):localStorage.setItem(this._storeKey("flip"),JSON.stringify(this._flipLive))}catch{}}_loadFlipLive(){const e=this._readStored("flip","roborock-card:flip");if(null===e)return null;try{return!0===JSON.parse(e)}catch{return null}}_saveVeTool(e){try{localStorage.setItem(this._storeKey("ve-tool"),e)}catch{}}_loadVeTool(){try{const e=localStorage.getItem(this._storeKey("ve-tool"));if("seat"===e||"rooms"===e||"floorplan"===e||"furniture"===e)return e}catch{}return"seat"}_saveRoomSel(e){try{const o=e+":",s={};for(const[e,l]of this._localRoomSel.entries())e.startsWith(o)&&(s[e.slice(o.length)]=l);localStorage.setItem(this._storeKey("sel:"+e),JSON.stringify(s))}catch{}}_loadRoomSel(){const e=new Map;try{for(const o of this._config.vacuums){const s=this._readStored("sel:"+o.entity,"roborock-card:sel:"+o.entity);if(s){const l=JSON.parse(s);for(const[s,h]of Object.entries(l))h&&e.set(o.entity+":"+s,!0)}}}catch{}return e}_pause(e){this._call("vacuum","pause",{entity_id:e.entity})}_resume(e){this._call("vacuum","start",{entity_id:e.entity})}_dock(e){this._call("vacuum","return_to_base",{entity_id:e.entity})}_toggleRoom(e,o){if(this._backendSel())return void this._setBackendSel([e.key],"toggle");const s=o.entity+":"+e.key,l=new Map(this._localRoomSel);l.set(s,!l.get(s)),this._localRoomSel=l,this._saveRoomSel(o.entity)}_isRoomSelectedAny(e,o){const s=this._backendSel();return s?s.has(e):o.some(o=>this._localRoomSel.get(o.entity+":"+e)??!1)}_toggleRoomAcross(e,o){if(this._isRoomSelectedAny(e,o)&&o.some(e=>this._intAttrs(e))&&this._call("anyvac","pin_room",{room:e}),this._backendSel())return void this._setBackendSel([e],"toggle");const s=!this._isRoomSelectedAny(e,o),l=new Map(this._localRoomSel);for(const h of o)this._roomsFor(h).some(o=>o.key===e)&&l.set(h.entity+":"+e,s);this._localRoomSel=l;for(const e of o)this._saveRoomSel(e.entity)}_allRoomKeys(){const e=new Set;for(const o of this._config.vacuums)for(const s of this._roomsFor(o))e.add(s.key);return[...e]}_v2Vacuums(){const e=[],o=[];for(const s of this._config.vacuums){const l=this._vacCleanType(s);l.dry&&e.push(s.entity),l.wet&&o.push(s.entity)}return{dry:e,wet:o}}_unassignedRooms(e,o,s){if(!s||0===e.length)return[];const l=this._planPreview;if(!l||l.key!==this._planKey(e,o))return[];const h="wet"!==o,d="dry"!==o,p=[];for(const o of e)(h&&!l.dry.has(o)||d&&!l.wet.has(o))&&p.push(o);return p}_v2Settings(){const e={};for(const o of["dry","wet"])for(const s of this._config.vacuums){const l=this._vacCleanType(s);if(!("dry"===o?l.dry:l.wet))continue;const h=this._activePreset(s),d={};h.suction_level&&(d.fan_speed=h.suction_level),"wet"===o&&h.mop_mode&&(d.mop_mode=h.mop_mode),"wet"===o&&h.mop_intensity&&(d.mop_intensity=h.mop_intensity),h.repeat&&h.repeat>1&&(d.repeat=h.repeat),Object.keys(d).length&&((e[o]??(e[o]={}))[s.entity]=d)}return Object.keys(e).length?e:void 0}_planKey(e,o){return JSON.stringify([e,o,this._v2Vacuums(),this._pinsAttr()])}_fetchPlan(e,o){const s=this._planKey(e,o);s!==this._planFetchKey&&(this._planFetchKey=s,(async()=>{try{const l=await this.hass.callService("anyvac","plan",{rooms:e,mode:o,vacuums:this._v2Vacuums()},void 0,!1,!0);if(this._planFetchKey!==s)return;const h=l?.response?.plan??{},inv=e=>{const o=new Map;for(const[s,l]of Object.entries(e??{}))for(const e of l)o.set(e,s);return o};this._planPreview={key:s,dry:inv(h.dry),wet:inv(h.wet),eta:"number"==typeof h.eta_min?h.eta_min:null,unsequenced:Array.isArray(h.unsequenced)?h.unsequenced:[],...planOrder(h)}}catch(e){console.warn("[anyvac-card] anyvac.plan preview failed:",e),this._planFetchKey===s&&(this._planPreview={key:s,dry:new Map,wet:new Map,eta:null,unsequenced:[]})}})())}_etaFor(e,o,s){s&&e.length&&this._fetchPlan(e,o);const l=this._planPreview?.eta;return s&&null!=l?l:this._selEstMins(e)}async _runOrchestrated(e,o){if(!e.length)return;const s=this._call("anyvac","clean",{rooms:e,mode:o,vacuums:this._v2Vacuums(),...this._v2Settings()?{settings:this._v2Settings()}:{}});this._playStartSeq(e,o),await s}_playStartSeq(e,o){if(!this._themed()||this._reducedMotion())return;const s=this._planPreview;if(!s||s.key!==this._planKey(e,o)||!s.order?.length)return;const l=s.order.length,h=Math.min(.3,l>1?1.6/(l-1):.3),d=(this._startSeq?.id??0)+1;this._startSeq={id:d,delay:new Map(s.order.map((e,o)=>[e,+(o*h).toFixed(3)])),first:[...(s.first??new Map).entries()].map(([e,o])=>({entity:e,room:o}))},window.setTimeout(()=>{this._startSeq?.id===d&&(this._startSeq=null)},2600)}_reducedMotion(){if(this._config.reduce_motion)return!0;try{return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches??!1}catch{return!1}}_glideS(){if(this._reducedMotion())return 0;const e=Number(this._config.marker_glide_s??1.5);return Number.isFinite(e)?Math.min(25,Math.max(0,e)):1.5}_runMarkerGlides(){for(const e of this._markerStops)this._markerAnims.get(e)?.anim.cancel(),this._markerAnims.delete(e);if(this._markerStops.clear(),!this._markerMoves.size)return;const e=1e3*this._glideS();for(const[o,s]of this._markerMoves){const l=this.renderRoot.querySelector(`.avc-marker[data-mk="${CSS.escape(o)}"]`);if(!(l&&"function"==typeof l.animate&&e>0))continue;let h=s.route;const d=this._markerAnims.get(o);if(d){const o=d.anim.playState;if("running"===o||"paused"===o){const o=Number(d.anim.effect?.getTiming().duration)||e,s=pointAtFraction(d.route,Number(d.anim.currentTime??0)/o);h=[s.pt,...d.route.slice(s.next),...h]}d.anim.cancel()}const p=l.animate(glideKeyframes(h,s.digits),{duration:e,easing:"linear",fill:"none"});this._markerAnims.set(o,{anim:p,route:h})}this._markerMoves.clear()}_renderStartSeqAvatars(e){const o=this._startSeq;if(!o||!o.first.length)return It;const s=this._unrotateDelta(0,1),l=50+62*s.dx,h=50+62*s.dy,d=this._unrotateDelta(1,0),p=new Map;for(const e of o.first)p.set(e.room,(p.get(e.room)??0)+1);const u=new Map;return Dt`${o.first.map(({entity:o,room:s},m)=>{const _=this._config.vacuums.find(e=>e.entity===o),f=e.find(({r:e})=>e.key===s);if(!_||!f||void 0===f.r.map_x||void 0===f.r.map_y)return It;const v=u.get(s)??0;u.set(s,v+1);const b=40*(v-((p.get(s)??1)-1)/2);return Dt`<div class="seq-avatar" style=${Xt({"--fx":l.toFixed(2)+"%","--fy":h.toFixed(2)+"%","--tx":f.r.map_x+"%","--ty":f.r.map_y+"%",marginLeft:Math.round(d.dx*b)+"px",marginTop:Math.round(d.dy*b)+"px","--c":this._color(_),animationDelay:(.2+.12*m).toFixed(2)+"s"})} data-entity=${o} data-room=${s}>
        <span class="seq-avatar-in">${_.image?Dt`<img src=${_.image} alt="" />`:Dt`<ha-icon icon="mdi:robot-vacuum"></ha-icon>`}</span>
      </div>`})}`}_selectGlobalPreset(e){if(this._activeGlobalPreset=e.id,e.mode&&(this._planMode=e.mode),"all"===e.scope||Array.isArray(e.scope)){const o="all"===e.scope?this._allRoomKeys():e.scope;if(this._backendSel())return void this._setBackendSel(o,"set");const s=new Map(this._localRoomSel);for(const e of this._config.vacuums)for(const o of this._roomsFor(e))s.delete(e.entity+":"+o.key);for(const e of o)for(const o of this._config.vacuums)this._roomsFor(o).some(o=>o.key===e)&&s.set(o.entity+":"+e,!0);this._localRoomSel=s;for(const e of this._config.vacuums)this._saveRoomSel(e.entity)}}_vacAbbrev(e){return((e.name??e.entity.split(".")[1]??"").replace(/[^A-Za-z0-9]/g,"").slice(0,2)||"??").toUpperCase()}_renderPlanPreview(){if("auto"!==this._config.ui_mode)return It;const e=this._allRoomKeys().filter(e=>this._isRoomSelectedAny(e,this._config.vacuums));if(!e.length)return It;const o=this._planMode,s=(this._config.global_presets??[]).find(e=>e.id===this._activeGlobalPreset)?.label,l="dry"===o||"both"===o,h="wet"===o||"both"===o;this._fetchPlan(e,o);const d=this._planPreview?.dry??new Map,p=this._planPreview?.wet??new Map,roomDef=e=>{for(const o of this._config.vacuums){const s=this._roomsFor(o).find(o=>o.key===e);if(s)return s}},cell=e=>{const o=this._config.vacuums.find(o=>o.entity===e);if(!o)return Dt`<span style="font-size:var(--avc-th-fs-xs,11px);opacity:.25">—</span>`;const s=this._color(o);return Dt`<span style="display:inline-flex;align-items:center;justify-content:center;min-width:24px;height:17px;padding:0 5px;border-radius:var(--avc-th-r-pill,9px);font-size:var(--avc-th-fs-xs,10px);font-weight:700;color:rgb(var(--avc-ink-rgb));background:${s}30;border:1px solid ${s}">${this._vacAbbrev(o)}</span>`},modeBtn=(e,s)=>{const l=o===e;return Dt`<button @click=${o=>{o.stopPropagation(),this._planMode=e}}
        style="padding:2px 8px;border-radius:var(--avc-th-r-m,8px);font-size:var(--avc-th-fs-xs,10px);font-weight:700;cursor:pointer;font-family:inherit;border:1px solid ${l?"rgba(var(--avc-ink-rgb),0.5)":"rgba(var(--avc-ink-rgb),0.15)"};background:${l?"rgba(var(--avc-ink-rgb),0.12)":"transparent"};color:${l?"rgb(var(--avc-ink-rgb))":"rgba(var(--avc-ink-rgb),0.72)"}">${this._t(s)}</button>`},u="plan-run";return Dt`
      <div style="margin:0 4px 6px;padding:6px 8px;background:rgba(var(--avc-ink-rgb),0.03);border:1px solid rgba(var(--avc-ink-rgb),0.08);border-radius:var(--avc-th-r-l,12px);display:flex;flex-direction:column;gap:6px">
        <div style="display:flex;align-items:center;justify-content:space-between">
          <span style="font-size:var(--avc-th-fs-xs,9px);font-weight:600;letter-spacing:.6px;color:rgba(var(--avc-ink-rgb),.35)">CLEAN PLAN${s?" · "+s.toUpperCase():""}</span>
          <div style="display:flex;gap:4px">${modeBtn("dry","Dry")}${modeBtn("wet","Wet")}${modeBtn("both","Both")}</div>
        </div>
        <div style="display:flex;gap:6px;overflow-x:auto;align-items:center">
          <div style="display:flex;flex-direction:column;gap:3px;align-items:center;flex-shrink:0;padding-right:2px">
            <span style="height:18px"></span>
            ${l?Dt`<ha-icon icon="mdi:broom" style="--mdc-icon-size:14px;color:rgba(var(--avc-ink-rgb),.4)"></ha-icon>`:It}
            ${h?Dt`<ha-icon icon="mdi:water" style="--mdc-icon-size:14px;color:rgba(var(--avc-info-rgb),.7)"></ha-icon>`:It}
          </div>
          ${e.map(e=>{const o=roomDef(e);return Dt`<div style="display:flex;flex-direction:column;align-items:center;gap:3px;min-width:32px;flex-shrink:0" title=${o?.name??e}>
              <ha-icon icon=${o?.icon||"mdi:floor-plan"} style="--mdc-icon-size:18px;color:rgba(var(--avc-ink-rgb),.7)"></ha-icon>
              ${l?cell(d.get(e)):It}
              ${h?cell(p.get(e)):It}
            </div>`})}
        </div>
        <button class="action-btn ${this._holdId===u?"action-btn--holding":""}"
          style="flex:0 0 auto;align-self:flex-end;flex-direction:row;gap:6px;padding:7px 16px;background:rgba(var(--avc-ok-rgb),0.14);border:1px solid rgba(var(--avc-ok-rgb),0.55);color:rgb(var(--avc-ink-rgb))"
          @pointerdown=${this._holdStart(u,()=>this._runOrchestrated(e,this._planMode))}
          @pointermove=${this._holdMove}
          @pointerup=${this._holdEnd}
          @pointerleave=${this._holdEnd}
          @pointercancel=${this._holdEnd}>
          <div class="hold-ring"></div>
          <ha-icon icon="mdi:play" style="--mdc-icon-size:18px"></ha-icon>
          <span style="font-size:var(--avc-th-fs-s,12px)">Start · hold</span>
        </button>
      </div>
    `}_renderAutoBar(){if("auto"!==this._config.ui_mode)return It;const e=this._config.global_presets??[];return e.length?Dt`
      <div style="display:flex;flex-wrap:wrap;gap:8px;padding:2px 4px 4px">
        ${e.map(e=>{const o=this._activeGlobalPreset===e.id;return Dt`<button
            @click=${()=>this._selectGlobalPreset(e)}
            style="flex:0 1 auto;min-width:128px;display:flex;flex-direction:row;align-items:center;justify-content:flex-start;gap:10px;padding:9px 14px;border-radius:var(--avc-th-r-m,14px);cursor:pointer;font-family:inherit;color:rgb(var(--avc-ink-rgb));background:${o?"rgba(var(--avc-ok-rgb),0.14)":"rgba(var(--avc-ink-rgb),0.05)"};border:1px solid ${o?"rgba(var(--avc-ok-rgb),0.6)":"rgba(var(--avc-ink-rgb),0.12)"}">
            <ha-icon icon=${e.icon||"mdi:robot-vacuum-variant"} style="--mdc-icon-size:24px"></ha-icon>
            <div style="display:flex;flex-direction:column;align-items:flex-start;line-height:1.15">
              <span style="font-size:var(--avc-th-fs-m,13px);font-weight:700">${e.label}</span>
              <small style="font-size:var(--avc-th-fs-xs,9px);font-weight:600;letter-spacing:.4px;color:rgba(var(--avc-ink-rgb),0.4)">${"all"===e.scope?"WHOLE HOME":"select"===e.scope?"SELECTED":"ROOMS"}${e.mode?" · "+("dry"===e.mode?"DRY":"wet"===e.mode?"WET":"BOTH"):""}</small>
            </div>
          </button>`})}
      </div>
    `:It}_pinsAttr(){const e=this._selSensor(),o=e?this.hass.states[e]?.attributes?.room_pins:void 0;return o&&"object"==typeof o?o:{}}_pinCandidates(e,o){return this._config.vacuums.filter(s=>this._roomsFor(s).some(o=>o.key===e)&&this._vacCleanType(s)[o])}_cycleRoomPin(e,o,s){const l=this._pinCandidates(e,o);if(l.length<2)return;const h=l.findIndex(e=>e.entity===s),d=l[(h+1)%l.length];this._call("anyvac","pin_room",{room:e,kind:o,vacuum:d.entity})}_vacChip(e,o){const s=this._config.vacuums.find(o=>o.entity===e);if(!s)return Dt`<span class="dock-chip dock-chip--empty" @click=${o??It}>—</span>`;const l=this._color(s);return Dt`<span class="dock-chip"
      style="color:rgb(var(--avc-ink-rgb));background:${l}30;border-color:${l}"
      title=${(s.name??s.entity)+(o?" · tap to assign a different vacuum":"")}
      @click=${o??It}>${this._vacAbbrev(s)}</span>`}_selEstMins(e){let o=0;for(const s of e){let e=0;for(const o of this._config.vacuums){const l=this._roomsFor(o).find(e=>e.key===s);l&&(e=Math.max(e,this._roomCleanMins(l,o)))}o+=e}return Math.round(o)}_renderVacuumIconStrip(){if("portrait"!==this._profile)return It;const e=this._config.vacuums;return e.length?Dt`
      <div class="vac-icon-strip">
        ${e.map((e,o)=>{const s=this._shownSet.has(o),l="vacicon-"+o,h=this._holdId===l;return Dt`
            <div class="vac-icon-slot">
              <button class="vac-icon-btn ${h?"vac-icon-btn--holding":""} ${s?"":"vac-icon-btn--hidden"}"
                style=${Xt({borderColor:this._statusInfo(e)[1]})}
                @pointerdown=${e=>{e.preventDefault(),this._cancelHold(),this._holdId=l,this._holdTimer=setTimeout(()=>{this._holdTimer=null,this._holdId=null,this._toggleShownMulti(o)},te)}}
                @pointerup=${()=>{null!==this._holdTimer?(this._cancelHold(),this._robotSheet=o):this._holdId=null}}
                @pointerleave=${this._holdEnd}
                @pointercancel=${this._holdEnd}
                title=${e.name??e.entity} aria-label=${e.name??e.entity}
                aria-pressed=${s?"true":"false"}>
                <div class="hold-ring"></div>
                ${e.image?Dt`<img src=${e.image} alt="" />`:Dt`<ha-icon icon="mdi:robot-vacuum" style=${Xt({color:this._color(e)})}></ha-icon>`}
                ${this._attnDot(e)}
              </button>
            </div>
          `})}
      </div>
    `:It}_isRail(){return"portrait"===this._profile&&!!this._config.layout&&this._themed()&&!this._config.debug_dense_dock&&!this._stackTopology}_renderRail(e){return this._modeSheetOpen?Dt`<div class="dock rail rail--sheet">${this._renderModeSheet()}</div>`:Dt`
      <div class="dock rail">
        <div class="rail-tiles">${e.map((e,o)=>this._renderRailTile(e,o))}</div>
        ${this._renderRailPlan(e)}
        ${this._renderRailTools(e)}
      </div>`}_renderRailTile(e,o){const s=this._shownSet.has(o),l="vacicon-"+o,h=this._holdId===l,d=this._vacName(e),p=this._color(e),u=this._isCleaning(e),[m,_,f]=this._statusInfo(e),v=this._hasError(e)?this.hass.states[this._ent(e,"error")]?.state:null,b=(this._jobProgress()?.vacuums??{})[e.entity],w=this._ent(e,"current_room"),$=w?this.hass.states[w]?.state:void 0,C=b?.room??(u&&$&&"unknown"!==$&&"unavailable"!==$?$:void 0),A="number"==typeof b?.pct?b.pct:u?this._progress(e):null,F=this._battery(e),E=v||(C||(null!==F?F+" %":""));return Dt`
      <button class="rail-tile ${h?"rail-tile--holding":""} ${s?"":"rail-tile--hidden"} ${u?"rail-tile--live":""}"
        style=${Xt({"--vac":p})}
        @pointerdown=${e=>{e.preventDefault(),this._cancelHold(),this._holdId=l,this._holdTimer=setTimeout(()=>{this._holdTimer=null,this._holdId=null,this._toggleShownMulti(o)},te)}}
        @pointerup=${()=>{null!==this._holdTimer?(this._cancelHold(),this._robotSheet=o):this._holdId=null}}
        @keydown=${e=>{"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),this._robotSheet=o)}}
        @pointerleave=${this._holdEnd}
        @pointercancel=${this._holdEnd}
        title=${this._t(s?"{name} — tap for controls, hold to hide it on the map":"{name} — tap for controls, hold to show it on the map",{name:d})}
        aria-label=${this._t("{name} — open controls",{name:d})} aria-pressed=${s?"true":"false"}>
        <div class="hold-ring"></div>
        ${this._renderBattRing(e,36)}
        <span class="rail-tile-text">
          <span class="rail-tile-name">${d}${s?It:Dt`<ha-icon icon="mdi:eye-off-outline"></ha-icon>`}</span>
          <span class="tile-status" style=${Xt({color:v?"rgb(var(--avc-err-rgb))":_})}>
            <ha-icon icon=${v?"mdi:alert-circle-outline":f}></ha-icon>${m}
          </span>
          ${E?Dt`<span class="tile-sub">${E}</span>`:It}
        </span>
        ${u&&null!==A?Dt`<span class="rail-tile-bar"><span style=${Xt({width:Math.min(100,A)+"%"})}></span></span>`:It}
      </button>`}_renderRailPlan(e){const o=e.some(e=>this._intAttrs(e)),s=this._jobProgress(),l=new Map(this._config.vacuums.map(e=>[e.entity,e]));if(s&&Array.isArray(s.rooms)){const e=s.rooms,o=this._jobLanes(s)?()=>{this._queueSheet=!0}:void 0;return Dt`
        <div class="rail-card rail-plan ${o?"rail-plan--open":""}" role=${o?"button":It} tabindex=${o?"0":It}
          aria-label=${o?this._t("Open the queue"):It}
          @click=${o??It}
          @keydown=${o?e=>{"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),o())}:It}>
          <div class="rail-card-head"><ha-icon icon="mdi:format-list-checks"></ha-icon><span>${this._t("Plan")}</span>
            <small>${this._t("{done} of {total} passes",{done:s.passes_done??0,total:s.passes_total??e.length})}</small></div>
          ${e.map(e=>{const o=l.get(e.vacuum),s="done"===e.state?"done":"active"===e.state?"active":"queued";return Dt`
              <div class="rail-plan-row rail-plan-row--${s}">
                <ha-icon icon=${"wet"===e.kind?"mdi:water":"mdi:broom"} style=${Xt({color:o?this._color(o):"inherit"})}></ha-icon>
                <span class="rail-plan-name">${e.room}</span>
                ${"done"===s?Dt`<ha-icon class="rail-plan-state" icon="mdi:check"></ha-icon>`:"active"===s?Dt`<b>${Math.round(Number(e.pct??0))}\u2009%</b>`:It}
              </div>`})}
        </div>`}const h=this._allRoomKeys();if(!h.length)return It;const d=new Map(this._mergedRoomDefs(e).map(({r:e})=>[e.key,e.name??e.key])),p=h.filter(o=>this._isRoomSelectedAny(o,e)),u=p.length?p:h;o&&this._fetchPlan(u,this._planMode);const m=this._etaFor(u,this._planMode,o),_=this._unassignedRooms(u,this._planMode,o);return Dt`
      <div class="rail-card rail-sel">
        <div class="rail-card-head">
          <ha-icon icon=${p.length?"mdi:checkbox-multiple-marked-outline":"mdi:home-outline"}></ha-icon>
          <span>${p.length?this._t("{n} {rooms}",{n:p.length,rooms:this._pl(p.length,"room|rooms")}):this._t("Whole home")}</span>
          ${m?Dt`<small>${this._t("~{n} min",{n:m})}</small>`:It}
        </div>
        ${p.length?Dt`<div class="rail-chips">${p.map(e=>Dt`<span class="rail-chip">${d.get(e)??e}</span>`)}</div>
              <button class="mtbtn rail-clear" @click=${()=>this._clearRoomSelection()}>
                <ha-icon icon="mdi:close"></ha-icon><span>${this._t("Clear")}</span></button>`:Dt`<span class="rail-hint">${this._t("Tap rooms on the map to pick them")}</span>`}
        ${_.length&&p.length?Dt`<span class="rail-warn"><ha-icon icon="mdi:robot-off"></ha-icon>${this._t("{n} without a robot for this mode",{n:_.length})}</span>`:It}
      </div>`}_renderRailTools(e){const o=e.filter(e=>this._mapEntityFor(e)),s=this._alignCandidates(e);return Dt`
      <div class="rail-tools">
        ${this._renderLayerToggleCompact(e)}
        ${o.length?Dt`<button class="mtbtn mtbtn--icon" title=${this._t("Refresh map")} aria-label=${this._t("Refresh map")} @click=${e=>{const s=e.currentTarget;s.classList.remove("mtbtn--spin"),s.offsetWidth,s.classList.add("mtbtn--spin");for(const e of o)this._refreshMap(e)}}>
            <ha-icon icon="mdi:refresh"></ha-icon></button>`:It}
        ${this._config.layout?Dt`<button class="mtbtn mtbtn--icon ${this._flipEff?"on":""}"
            title=${this._t("Flip map 180° for this screen (this session only)")} aria-label=${this._t("Flip map")}
            aria-pressed=${this._flipEff?"true":"false"} @click=${()=>this._toggleFlipLive()}>
            <ha-icon icon="mdi:flip-vertical"></ha-icon></button>`:It}
        ${s.length?Dt`<button class="mtbtn mtbtn--icon" title=${this._t("Align — full-screen manual floorplan seating")} aria-label=${this._t("Align")}
            @click=${()=>this._requestVisualEditor(s[0])}>
            <ha-icon icon="mdi:vector-square-edit"></ha-icon></button>`:It}
      </div>`}_clearRoomSelection(){const e=this._config.vacuums,o=this._allRoomKeys().filter(o=>this._isRoomSelectedAny(o,e));if(o.length)if(this._backendSel()){if(e.some(e=>this._intAttrs(e)))for(const e of o)this._call("anyvac","pin_room",{room:e});this._setBackendSel([],"clear")}else for(const s of o)this._toggleRoomAcross(s,e)}_renderDock(e,o=!1){const s=this._config.vacuums;if(this._isRail())return this._renderRail(s);if(e&&this._usesPlanColumn())return this._renderPlanColumn(s);const l=this._mergedRoomDefs(s);if(!l.length)return Dt`${o?this._renderVacuumPicker():It}${this._renderVacuumIconStrip()}`;const h=s.some(e=>this._intAttrs(e)),d=this._planMode,p=this._allRoomKeys().filter(e=>this._isRoomSelectedAny(e,s)),u=p.length?p:this._allRoomKeys();h&&u.length&&this._fetchPlan(u,d);const m=this._planPreview?.dry??new Map,_=this._planPreview?.wet??new Map,f=new Set(h?this._planPreview?.unsequenced??[]:[]),v=new Set(this._unassignedRooms(u,d,h)),b="wet"!==d,w="dry"!==d,badge=e=>null===e?"—":e<1?"<1d":Math.round(e)+"d",modeBtn=(e,o,s)=>Dt`
      <button class="dock-mode ${d===e?"on":""}"
        @click=${o=>{o.stopPropagation(),this._planMode=e}}>
        <ha-icon icon=${o}></ha-icon><span>${this._t(s)}</span>
      </button>`,$="dock-run",C="portrait"!==this._profile||!!this._config.debug_dense_dock,A=this._themed();return Dt`
      <div class="dock">
        ${o?this._renderVacuumPicker():It}
        ${this._renderVacuumIconStrip()}
        ${"portrait"===this._profile?Dt`
            <div class="dock-layers">${this._renderLayerToggleCompact(s)}
              ${this._config.layout?Dt`<button class="mtbtn ${this._flipEff?"on":""}"
                  title=${this._t("Flip map 180° for this screen (this session only)")} aria-label=${this._t("Flip map")}
                  aria-pressed=${this._flipEff?"true":"false"}
                  @click=${()=>this._toggleFlipLive()}>
                <ha-icon icon="mdi:flip-vertical"></ha-icon>
              </button>`:It}
              ${(()=>{const e=this._alignCandidates(s);return e.length?Dt`<button class="mtbtn" title=${this._t("Align — full-screen manual floorplan seating")}
                    @click=${()=>this._requestVisualEditor(e[0])}>
                  <ha-icon icon="mdi:vector-square-edit"></ha-icon>
                </button>`:It})()}
            </div>
          `:It}
        ${e?Dt`
          <div class="dock-head">
            ${modeBtn("dry","mdi:broom","Dry")}${modeBtn("wet","mdi:water","Wet")}${modeBtn("both","mdi:water-plus","Both")}
          </div>`:It}
        ${this._renderModeSheet()}
        ${C?Dt`<div class="dock-rows">
          ${l.map(({r:e,v:o})=>{const l=this._intRoomRec(o,e),p=this._ageDaysFromIso(l?.dry),u=this._ageDaysFromIso(l?.wet),$=this._roomCoverageRec(o,e),covBadge=e=>A?null==e||e>=100?"":e+"%":null==e?"—":e+"%",C=this._isRoomSelectedAny(e.key,s),F=this._pinCandidates(e.key,"dry").length>1,E=this._pinCandidates(e.key,"wet").length>1,pinTap=(o,s)=>("dry"===o?F:E)?l=>{l.stopPropagation(),this._cycleRoomPin(e.key,o,s)}:void 0,T="normal"!==this._mapMode;return Dt`
              <button class="dock-row ${C?"on":""} ${T?"room-overlay--locked":""}" ?disabled=${T}
                title=${T?this._t("Room selection is off while placing a pin/zone"):""}
                @click=${()=>{T||this._toggleRoomAcross(e.key,s)}}>
                <ha-icon class="dock-ric" icon=${e.icon??"mdi:square"}></ha-icon>
                <span class="dock-name">${e.name??e.key}</span>
                <span class="dock-info">
                  ${C&&v.has(e.key)?Dt`<ha-icon class="dock-unassigned" icon="mdi:robot-off"
                    title=${this._t("No available robot for this room's {mode} pass — check that a vacuum is configured with the right role and knows this room.",{mode:this._t(d)})}></ha-icon>`:It}
                  ${C&&f.has(e.key)?Dt`<ha-icon class="dock-unseq" icon="mdi:sort-variant-off"
                    title=${this._t("No cleaning order set for this room — the time estimate may be off. Set the order in the card editor's Global tab.")}></ha-icon>`:It}
                  <span class="dock-ages">
                    <span class="dock-age">${this._renderProgChip(this._roomProgForType(e,s,"dry"))}<ha-icon icon="mdi:broom"></ha-icon><b style=${Xt({color:this._colorForAgeDays(p)})}>${badge(p)}</b>${this._renderCovBadge($,"dry",covBadge)}</span>
                    <span class="dock-age">${this._renderProgChip(this._roomProgForType(e,s,"wet"))}<ha-icon icon="mdi:water"></ha-icon><b style=${Xt({color:this._colorForAgeDays(u)})}>${badge(u)}</b>${this._renderCovBadge($,"wet",covBadge)}</span>
                  </span>
                  ${h&&C?Dt`
                    <span class="dock-avatars">
                      ${b?this._vacChip(m.get(e.key),pinTap("dry",m.get(e.key))):It}
                      ${w?this._vacChip(_.get(e.key),pinTap("wet",_.get(e.key))):It}
                    </span>`:It}
                </span>
              </button>`})}
        </div>`:It}
        ${e&&h?Dt`
          <div class="dock-foot">
            <span class="dock-est">${p.length?this._t("{n} {rooms} · ~{min} min",{n:p.length,rooms:this._pl(p.length,"room|rooms"),min:this._etaFor(u,d,h)??0}):this._t("Whole home · ~{min} min",{min:this._etaFor(u,d,h)??0})}
              ${v.size?Dt`<ha-icon class="dock-unassigned" icon="mdi:robot-off"
                title=${this._t("{n} selected {rooms} without an available robot for the {mode} pass — skipped. Check vacuum roles/config.",{n:v.size,rooms:this._pl(v.size,"room|rooms"),mode:this._t(d)})}></ha-icon>`:It}
              ${f.size?Dt`<ha-icon class="dock-unseq" icon="mdi:sort-variant-off"
                title=${this._t("{n} selected {rooms} without a cleaning order — the time above may be off. Set the order in the card editor's Global tab.",{n:f.size,rooms:this._pl(f.size,"room|rooms")})}></ha-icon>`:It}</span>
            <button class="action-btn dock-run ${this._holdId===$?"action-btn--holding":""}"
              ?disabled=${!u.length}
              @pointerdown=${u.length?this._holdStart($,()=>this._runOrchestrated(u,this._planMode)):It}
              @pointermove=${this._holdMove}
              @pointerup=${this._holdEnd}
              @pointerleave=${this._holdEnd}
              @pointercancel=${this._holdEnd}>
              <div class="hold-ring"></div>
              <ha-icon icon="mdi:play" style="--mdc-icon-size:16px"></ha-icon>
              <span style="font-size:var(--avc-th-fs-s,12px)">Start · hold</span>
            </button>
          </div>`:It}
      </div>
    `}_queueViewEff(){return this._queueView??("time"===this._config.queue_view?"time":"robots")}_setQueueView(e){this._queueView=e;try{localStorage.setItem(this._storeKey("queue-view"),e)}catch{}}_loadQueueView(){try{const e=localStorage.getItem(this._storeKey("queue-view"));return"robots"===e||"time"===e?e:null}catch{return null}}async _callNoted(e,o,s){try{return await this.hass.callService(e,o,s),!0}catch(s){console.error("[anyvac-card] "+e+"."+o+" failed:",s);const l=String(s?.message??s).replace(/^anyvac(\.[a-z_]+)?:\s*/,"");return this._notice=l,null!==this._noticeTimer&&window.clearTimeout(this._noticeTimer),this._noticeTimer=window.setTimeout(()=>{this._notice=null,this._noticeTimer=null},7e3),!1}}_renderNotice(){return this._notice?Dt`<div class="avc-notice" role="alert"><ha-icon icon="mdi:alert-circle-outline"></ha-icon><span>${this._notice}</span>
      <button class="avc-notice-x" aria-label=${this._t("Close")} @click=${()=>{this._notice=null}}><ha-icon icon="mdi:close"></ha-icon></button></div>`:It}_editJob(e){this._queueSel=null,this._callNoted("anyvac","edit_job",e)}_jobLanes(e){const o=e.queues;if(!o||"object"!=typeof o)return null;const s=new Map(this._config.vacuums.map((e,o)=>[e.entity,o]));return Object.entries(o).map(([e,o])=>({ent:e,vac:this._config.vacuums.find(o=>o.entity===e),items:o?.items??[]})).sort((e,o)=>(s.get(e.ent)??99)-(s.get(o.ent)??99))}_blockedReason(e){const o=String(e??"");return this._t({water_shortage:"water tank empty",error:"robot error",offline:"robot offline","command not accepted":"the robot did not take the command","command failed":"the command failed","could not reach the room":"could not reach the room","robot runs another clean":"the robot runs another clean"}[o]??(o.replace(/_/g," ")||"blocked"))}_roomLabel(e,o){return(Array.isArray(e.rooms)&&e.rooms.length?e.rooms:[e.room]).map(e=>o.get(e)??e).join(", ")}_renderQueueRow(e,o,s,l){const h=String(o.state??"queued"),d="wet"===o.kind?"wet":"dry",p=e.vac?this._color(e.vac):"rgb(var(--avc-accent-rgb))",u=this._queueSel===o.id,m=(!Array.isArray(o.rooms)||o.rooms.length<=1)&&("queued"===h||"sent"===h||"active"===h),_=String(o.room??(o.rooms??[])[0]??""),f=(Array.isArray(o.waits_for)?o.waits_for:[]).map(e=>{const o=this._config.vacuums.find(o=>o.entity===e);return o?this._vacName(o):e.split(".")[1]??e}),v=Math.round(Number(o.pct??0)),b="done"===h?Dt`<ha-icon class="q-lead q-lead--ok" icon="mdi:check"></ha-icon>`:"blocked"===h?Dt`<ha-icon class="q-lead q-lead--err" icon="mdi:alert-outline"></ha-icon>`:Dt`<ha-icon class="q-lead" icon=${"wet"===d?"mdi:water":"mdi:broom"}
          style=${Xt("active"===h||"sent"===h?{color:p}:{})}></ha-icon>`;let w;w="active"===h?Dt`<b class="q-pct">${v}&thinsp;%</b>`:"sent"===h?Dt`<span>${this._t("starting")}</span>`:"done"===h?Dt`<span>${o.finish_at?this._clockStr(o.finish_at):""}</span>`:"blocked"===h?Dt`<button class="q-retry" @click=${e=>{e.stopPropagation(),this._editJob({retry:[_],mode:d})}}>
        <ha-icon icon="mdi:refresh"></ha-icon><span>${this._t("Retry")}</span></button>`:f.length?Dt`<span class="q-wait"><ha-icon icon="mdi:lock-outline"></ha-icon>${this._t("after {names}",{names:f.join(", ")})}</span>`:Dt`<span>${o.start_at?this._clockStr(o.start_at):""}</span>`;const $=e.items.filter(e=>"queued"===e.state),C=$.findIndex(e=>e.id===o.id),A="queued"===h?this._pinCandidates(_,d).filter(o=>o.entity!==e.ent):[],F="qskip-"+o.id,E=u&&m?Dt`
      <div class="q-actions" @click=${e=>e.stopPropagation()}>
        ${"queued"===h?Dt`
          <button class="q-act" ?disabled=${C<=0} aria-label=${this._t("Move up")} title=${this._t("Move up")}
            @click=${()=>this._editJob({move:{room:_,kind:d,index:C-1}})}><ha-icon icon="mdi:arrow-up"></ha-icon></button>
          <button class="q-act" ?disabled=${C<0||C>=$.length-1} aria-label=${this._t("Move down")} title=${this._t("Move down")}
            @click=${()=>this._editJob({move:{room:_,kind:d,index:C+1}})}><ha-icon icon="mdi:arrow-down"></ha-icon></button>
          ${A.map(e=>Dt`<button class="q-act q-act--wide" title=${this._t("Give it to {name}",{name:this._vacName(e)})}
            @click=${()=>this._editJob({pin:{[_]:{[d]:e.entity}}})}><ha-icon icon="mdi:swap-horizontal"></ha-icon><span>${this._vacAbbrev(e)}</span></button>`)}
          <button class="q-act q-act--err" aria-label=${this._t("Remove from the queue")} title=${this._t("Remove from the queue")}
            @click=${()=>this._editJob({remove:[_],mode:d})}><ha-icon icon="mdi:delete-outline"></ha-icon></button>`:Dt`
          <button class="q-act q-act--wide q-act--err ${this._holdId===F?"action-btn--holding":""}"
            title=${this._t("Stops this room and goes on with the next one")}
            @pointerdown=${this._holdStart(F,()=>this._editJob({remove:[_],mode:d}))}
            @pointermove=${this._holdMove} @pointerup=${this._holdEnd} @pointerleave=${this._holdEnd} @pointercancel=${this._holdEnd}>
            <div class="hold-ring"></div><ha-icon icon="mdi:skip-next"></ha-icon><span>${this._t("Skip · hold")}</span></button>`}
      </div>`:It;return Dt`
      <div class="q-item ${u?"q-item--sel":""}">
        <div class="q-row q-row--${h}" role=${m?"button":It} tabindex=${m?"0":It}
          aria-expanded=${m?u?"true":"false":It}
          @click=${m?()=>{this._queueSel=u?null:String(o.id)}:It}
          @keydown=${m?e=>{"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),this._queueSel=u?null:String(o.id))}:It}>
          ${b}
          ${l?this._vacChip(e.ent):It}
          <span class="q-name">${this._roomLabel(o,s)}${l?Dt` <small>· ${this._t(d)}</small>`:It}
            ${"blocked"===h?Dt`<small class="q-reason">${this._blockedReason(o.reason)}</small>`:It}</span>
          <span class="q-right">${w}</span>
          ${"active"===h?Dt`<span class="q-bar"><span style=${Xt({width:Math.min(100,v)+"%",background:p})}></span></span>`:It}
        </div>
        ${E}
      </div>`}_renderQueueAdd(e,o){const s=this._queueAdd;if(!s)return It;const l=this._jobLanes(e)??[],has=(e,o)=>l.some(s=>s.items.some(s=>s.kind===o&&"removed"!==s.state&&"blocked"!==s.state&&(s.rooms??[s.room]).includes(e))),full=e=>"both"===s.mode?has(e,"dry")&&has(e,"wet"):has(e,s.mode),h=this._allRoomKeys(),d=s.room&&!full(s.room)?s.room:null,modeBtn=(e,o)=>Dt`
      <button class="dock-mode ${s.mode===e?"on":""}" aria-pressed=${s.mode===e?"true":"false"}
        @click=${o=>{o.stopPropagation(),this._queueAdd={...s,mode:e}}}><span>${this._t(o)}</span></button>`;return Dt`
      <div class="q-add" role="group" aria-label=${this._t("Add a room")} @click=${e=>e.stopPropagation()}>
        <div class="q-add-head"><b>${this._t("Add a room")}</b>
          <button class="robot-sheet-icon q-add-x" aria-label=${this._t("Close")} @click=${()=>{this._queueAdd=null}}><ha-icon icon="mdi:close"></ha-icon></button></div>
        <div class="dock-head">${modeBtn("dry","Dry")}${modeBtn("wet","Wet")}${modeBtn("both","Both")}</div>
        <div class="q-add-rooms">
          ${h.map(e=>Dt`<button class="q-room ${d===e?"on":""}" ?disabled=${full(e)} aria-pressed=${d===e?"true":"false"}
            title=${full(e)?this._t("Already in the queue"):""}
            @click=${()=>{this._queueAdd={...s,room:e}}}>${o.get(e)??e}</button>`)}
        </div>
        <span class="q-add-hint">${this._t("or tap a room on the map")}</span>
        <button class="action-btn dock-run q-add-go" ?disabled=${!d}
          @click=${()=>{d&&(this._queueAdd=null,this._callNoted("anyvac","edit_job",{add:[d],mode:s.mode}))}}>
          <ha-icon icon="mdi:plus"></ha-icon><span>${this._t("Add to the queue")}</span></button>
      </div>`}_renderQueueBody(e,o){const s=this._jobLanes(e);if(!s)return It;const l=new Map(this._mergedRoomDefs(this._config.vacuums).map(({r:e})=>[e.key,e.name??e.key]));if(this._queueAdd)return this._renderQueueAdd(e,l);const h=this._queueViewEff(),d=s.flatMap(e=>e.items.filter(e=>"blocked"===e.state).map(o=>({l:e,it:o}))),p=Array.isArray(e.warnings)?e.warnings:[],u=d.length||p.length?Dt`
      <div class="q-alerts" role="alert">
        ${d.map(({l:e,it:o})=>Dt`<span><ha-icon icon="mdi:alert-outline"></ha-icon>${this._t("{name}: {room} ({kind}) — {reason}",{name:e.vac?this._vacName(e.vac):e.ent,room:this._roomLabel(o,l),kind:this._t("wet"===o.kind?"wet":"dry"),reason:this._blockedReason(o.reason)})}</span>`)}
        ${p.map(e=>Dt`<span class="q-alert--warn"><ha-icon icon="mdi:information-outline"></ha-icon>${e}</span>`)}
      </div>`:It,visible=e=>e.items.filter(e=>"removed"!==e.state);if("robots"===h)return Dt`${u}
        <div class="q-lanes q-lanes--${o}">
          ${s.map(e=>{const o=visible(e);if(!o.length)return It;const s=[...new Set(o.map(e=>"wet"===e.kind?"wet":"dry"))],h=o.find(e=>"active"===e.state||"sent"===e.state),d=h?this._roomLabel(h,l):o.every(e=>"done"===e.state||"blocked"===e.state)?this._t("done"):this._t("waiting");return Dt`
              <div class="q-lane">
                <div class="q-lane-head">
                  ${this._vacChip(e.ent)}
                  <span class="q-lane-name">${e.vac?this._vacName(e.vac):e.ent}<small>${d}</small></span>
                  ${s.map(e=>Dt`<span class="q-kind">${this._t(e)}</span>`)}
                </div>
                ${o.map(o=>this._renderQueueRow(e,o,l,!1))}
              </div>`})}
        </div>`;const m=s.flatMap(e=>visible(e).map(o=>({l:e,it:o}))),t=(e,o)=>e.it[o]?Date.parse(e.it[o]):1/0,_=m.filter(e=>"active"===e.it.state||"sent"===e.it.state),f=m.filter(e=>"queued"===e.it.state||"blocked"===e.it.state).sort((e,o)=>("blocked"===e.it.state?-1:0)-("blocked"===o.it.state?-1:0)||t(e,"start_at")-t(o,"start_at")),v=m.filter(e=>"done"===e.it.state).sort((e,o)=>t(e,"finish_at")-t(o,"finish_at")),sec=(e,o)=>o.length?Dt`
      <div class="q-sec"><span class="q-sec-title">${this._t(e)}</span>
        ${o.map(({l:e,it:o})=>this._renderQueueRow(e,o,l,!0))}</div>`:It;return Dt`${u}
      <div class="q-time q-time--${o}">
        <div class="q-time-col">${sec("Now",_)}${"column"===o?sec("Done",v):It}</div>
        <div class="q-time-col">${sec("Next",f)}${"sheet"===o?sec("Done",v):It}</div>
      </div>`}_renderQueueViewToggle(){const e=this._queueViewEff(),b$1=(o,s,l)=>Dt`
      <button class="q-view ${e===o?"on":""}" aria-pressed=${e===o?"true":"false"}
        aria-label=${this._t(l)} title=${this._t(l)}
        @click=${e=>{e.stopPropagation(),this._setQueueView(o)}}><ha-icon icon=${s}></ha-icon></button>`;return Dt`<span class="q-views" role="group" aria-label=${this._t("Queue view")}>
      ${b$1("robots","mdi:view-column-outline","By robot")}${b$1("time","mdi:format-list-bulleted","By time")}</span>`}_renderQueueAddBtn(){return Dt`<button class="mtbtn q-add-btn" @click=${e=>{e.stopPropagation(),this._queueSel=null,this._queueAdd={room:null,mode:this._planMode}}}>
      <ha-icon icon="mdi:plus"></ha-icon><span>${this._t("Add a room")}</span></button>`}_renderQueueSheet(){if(!this._queueSheet)return It;const e=this._jobProgress(),close=()=>{this._queueSheet=!1,this._queueAdd=null,this._queueSel=null};if(!e||!this._jobLanes(e))return Promise.resolve().then(close),It;const o="number"==typeof e.eta_min_left?Math.round(e.eta_min_left):null,s="q-cancel";return Dt`
      <div class="robot-sheet-scrim" @click=${close}></div>
      <div class="robot-sheet q-sheet" role="dialog" aria-modal="true" aria-label=${this._t("Queue")}
        @keydown=${e=>{"Escape"===e.key&&close()}}>
        <span class="robot-sheet-grip" aria-hidden="true"></span>
        <div class="robot-sheet-head">
          <span class="robot-sheet-id">
            <span class="robot-sheet-name">${this._t("Queue")}</span>
            <span class="tile-sub">${this._t("{done} of {total} {rooms} done",{done:e.rooms_done??0,total:e.rooms_total??0,rooms:this._pl(Number(e.rooms_total??0),"room|rooms")})}${e.finish_at?" · "+this._t("done around {time}",{time:this._clockStr(e.finish_at)}):""}</span>
          </span>
          ${this._renderQueueViewToggle()}
          <button class="robot-sheet-icon" aria-label=${this._t("Close")} @click=${close}><ha-icon icon="mdi:close"></ha-icon></button>
        </div>
        ${this._renderNotice()}
        ${this._renderQueueBody(e,"sheet")}
        ${this._queueAdd?It:Dt`
          <div class="q-foot">
            ${this._renderQueueAddBtn()}
            <button class="action-btn dock-run plan-cancel ${this._holdId===s?"action-btn--holding":""}"
              @pointerdown=${this._holdStart(s,()=>{close(),this._call("anyvac","cancel",{})})}
              @pointermove=${this._holdMove} @pointerup=${this._holdEnd} @pointerleave=${this._holdEnd} @pointercancel=${this._holdEnd}>
              <div class="hold-ring"></div><ha-icon icon="mdi:stop"></ha-icon><span>${this._t("Cancel · hold")}</span></button>
          </div>
          ${null!==o?Dt`<span class="q-left">${this._t("~{min} min left",{min:o})}</span>`:It}`}
      </div>`}_servicePoints(e){const o=this._intAttrs(e)?.service_points;return Array.isArray(o)?o:[]}_spBusy(e){const o=this._jobProgress();return((o?.queues??{})[e.entity]?.items??[]).some(e=>"queued"===e.state||"sent"===e.state||"active"===e.state)}_spAt(e){const o=this._intAttrs(e),s=o?.vacuum_position_px,l=o?.image_dims,h=this.hass.states[e.entity]?.state;if(!s||!l||this._isCleaning(e)||"docked"===h||"returning"===h)return null;const d=Math.max(Number(l.width)||0,Number(l.height)||0)*(Number(l.scale)||1)/40;for(const o of this._servicePoints(e)){const e=o.px;if(e&&Math.hypot(e.x-s.x,e.y-s.y)<=d)return o}return null}_renderSpSection(e,o){if(!this.hass.services?.anyvac?.set_service_point||!this._intAttrs(e))return It;const s=this._servicePoints(e),l=this._spBusy(e),h=this._spAt(e),d=this._vacName(e),go=o=>{this._callNoted("anyvac","go_to_service_point",{entity_id:e.entity,name:o.name})};return Dt`
      <div class="sp-section">
        <span class="robot-sheet-label">${this._t(s.length>1?"Service points":"Service point")}</span>
        ${h?Dt`
          <div class="sp-here"><ha-icon icon="mdi:flag-variant"></ha-icon>
            <span><b>${this._t("At {name}",{name:h.name})}</b><small>${this._t("Waiting — send it home when you're done")}</small></span></div>
          <button class="action-btn dock-run sp-home" @click=${()=>this._dock(e)}><ha-icon icon="mdi:home-import-outline"></ha-icon><span>${this._t("Back to dock")}</span></button>`:It}
        ${s.map(s=>{const p=o+":"+s.name,u=this._spMenu===p,m=this._spDelete===p;return Dt`
            <div class="sp-row">
              <ha-icon class="sp-flag" icon="mdi:flag-variant"></ha-icon>
              <span class="sp-text"><b>${s.name}</b><small>${s.room??this._t("outside the rooms")}</small></span>
              <button class="sp-go" ?disabled=${l||h?.name===s.name} @click=${()=>go(s)}
                title=${l?this._t("Available when {name} has finished its rooms",{name:d}):this._t("Go to {point}",{point:s.name})}>
                <ha-icon icon="mdi:play"></ha-icon><span>${this._t("Go")}</span></button>
              <button class="robot-sheet-icon sp-more" aria-label=${this._t("{point} — rename, move or delete",{point:s.name})} aria-expanded=${u?"true":"false"}
                @click=${()=>{this._spMenu=u?null:p,this._spDelete=null}}><ha-icon icon="mdi:dots-vertical"></ha-icon></button>
            </div>
            ${u?Dt`
              <div class="sp-menu">
                <button class="mtbtn" @click=${()=>this._spStart(o,s.name,s.name,!0)}><ha-icon icon="mdi:pencil-outline"></ha-icon><span>${this._t("Rename")}</span></button>
                <button class="mtbtn" @click=${()=>this._spStart(o,s.name,s.name,!1)}><ha-icon icon="mdi:cursor-move"></ha-icon><span>${this._t("Move")}</span></button>
                <button class="mtbtn sp-del" @click=${()=>{m?(this._spMenu=null,this._spDelete=null,this._callNoted("anyvac","remove_service_point",{entity_id:e.entity,name:s.name})):this._spDelete=p}}><ha-icon icon="mdi:delete-outline"></ha-icon><span>${m?this._t("Tap again to delete"):this._t("Delete")}</span></button>
              </div>`:It}`})}
        ${l&&s.length?Dt`<span class="sp-why"><ha-icon icon="mdi:clock-outline"></ha-icon>${this._t("Available when {name} has finished its rooms — going there now would end the room it is cleaning, and it could not continue where it stopped.",{name:d})}</span>`:It}
        ${s.length<8?Dt`<button class="sp-add" @click=${()=>this._spStart(o,s.length?"":this._t("Service point"))}>
          <ha-icon icon="mdi:plus"></ha-icon><span>${this._t("Add a service point")}</span></button>`:It}
      </div>`}_spStart(e,o,s,l=!1){const h=this._config.vacuums[e];h&&(this._robotSheet=null,this._robotSheetTab=null,this._spMenu=null,this._spDelete=null,this._pinPending=null,this._spSet={idx:e,name:o,from:s,renameOnly:l},l||(this._mapMode="pin",this._modeEntity=h.entity))}_spEnd(){this._spSet=null,"pin"===this._mapMode&&(this._mapMode="normal",this._modeEntity=null)}async _spSave(e){const o=this._spSet;if(!o)return;const s=this._config.vacuums[o.idx],l=o.name.trim();if(!s||!l)return;const h={entity_id:s.entity,name:l};if(o.from&&(h.from_name=o.from),e)h.here=!0;else if(o.point)"home"===o.point.frame?Object.assign(h,{frame:"home",x_home_px:o.point.x,y_home_px:o.point.y}):Object.assign(h,{x_pct:o.point.x,y_pct:o.point.y});else if(!o.renameOnly)return;await this._callNoted("anyvac","set_service_point",h)&&this._spEnd()}_renderSpBar(){const e=this._spSet;if(!e)return It;const o=this._config.vacuums[e.idx];if(!o)return It;const s=this._vacName(o),l=e.renameOnly?this._t("Rename {point}",{point:e.from??""}):e.from?this._t("Move {point}",{point:e.from}):this._t("New service point");return Dt`
      <div class="sp-bar" role="dialog" aria-label=${l} @keydown=${e=>{"Escape"===e.key&&this._spEnd()}}>
        <div class="sp-bar-head">${this._vacChip(o.entity)}<b>${l}</b></div>
        ${this._renderNotice()}
        ${e.renameOnly?It:Dt`<span class="sp-bar-hint">${e.point?Dt`<ha-icon icon="mdi:flag-variant"></ha-icon>${this._t("Point placed — tap again to adjust")}`:this._t("Tap the spot on the map where {name} should park — or save where it stands now.",{name:s})}</span>`}
        <label class="sp-name"><span>${this._t("Name")}</span>
          <input class="sp-name-input" maxlength="40" .value=${e.name}
            @input=${o=>{this._spSet={...e,name:o.target.value}}}
            @keydown=${e=>{"Enter"===e.key&&this._spSave(!1)}}></label>
        <div class="sp-bar-btns">
          ${e.renameOnly?It:Dt`<button class="mtbtn" @click=${()=>{this._spSave(!0)}}>
            <ha-icon icon="mdi:crosshairs-gps"></ha-icon><span>${this._t("Use where {name} stands",{name:s})}</span></button>`}
          <span class="sp-bar-gap"></span>
          <button class="mtbtn" @click=${()=>this._spEnd()}><span>${this._t("Cancel")}</span></button>
          <button class="action-btn dock-run sp-save" ?disabled=${!e.renameOnly&&!e.point||!e.name.trim()} @click=${()=>{this._spSave(!1)}}>
            <span>${this._t("Save")}</span></button>
        </div>
      </div>`}_usesPlanColumn(){return"landscape"===this._profile&&!!this._config.layout&&this._themed()&&!this._config.debug_dense_dock&&this._config.vacuums.some(e=>this._intAttrs(e))}_renderPlanColumn(e){const o=this._planMode,s=this._allRoomKeys(),l=s.filter(o=>this._isRoomSelectedAny(o,e)),h=l.length?l:s;h.length&&this._fetchPlan(h,o);const d=this._planPreview&&this._planPreview.key===this._planKey(h,o)?this._planPreview:null,p=new Map(this._mergedRoomDefs(e).map(({r:e})=>[e.key,e.name??e.key])),u=new Map(this._config.vacuums.map(e=>[e.entity,e])),m=this._jobProgress(),_="dock-run",f=String(Math.min(6,Math.max(2,s.length))),holdBtn=(e,o,s,l,h)=>Dt`
      <button class="action-btn dock-run ${e} ${l&&this._holdId===_?"action-btn--holding":""}"
        ?disabled=${!l}
        @pointerdown=${l?this._holdStart(_,h):It}
        @pointermove=${this._holdMove}
        @pointerup=${this._holdEnd} @pointerleave=${this._holdEnd} @pointercancel=${this._holdEnd}>
        <div class="hold-ring"></div>
        <ha-icon icon=${o}></ha-icon><span>${s}</span>
      </button>`;if(m&&this._jobLanes(m)){const e="number"==typeof m.eta_min_left?Math.round(m.eta_min_left):null;return Dt`
        <div class="dock plan-col q-col">
          <div class="plan-head">
            <span>${this._t("Queue · {done} of {total} {rooms} done",{done:m.rooms_done??0,total:m.rooms_total??0,rooms:this._pl(Number(m.rooms_total??0),"room|rooms")})}</span>
            ${this._queueAdd?It:this._renderQueueViewToggle()}
          </div>
          ${this._renderNotice()}
          <div class="q-scroll">${this._renderQueueBody(m,"column")}</div>
          ${this._queueAdd?It:Dt`
          <div class="plan-foot">
            ${this._renderQueueAddBtn()}
            <span class="plan-sum">
              <b>${m.finish_at?this._t("Done around {time}",{time:this._clockStr(m.finish_at)}):this._t("Cleaning")}</b>
              <small>${null!==e?this._t("~{min} min left",{min:e}):""}</small>
            </span>
            ${holdBtn("plan-cancel","mdi:stop",this._t("Cancel · hold"),!0,()=>{this._call("anyvac","cancel",{})})}
          </div>`}
        </div>`}if(m&&Array.isArray(m.rooms)){const e=m.rooms,o="number"==typeof m.eta_min_left?Math.round(m.eta_min_left):null;return Dt`
        <div class="dock plan-col">
          <div class="plan-head">
            <span>${this._t("Plan · {done} of {total} passes done",{done:m.passes_done??0,total:m.passes_total??e.length})}</span>
          </div>
          <div class="plan-rows" style=${Xt({"--plan-n":f})}>
            ${e.map(e=>{const o=u.get(e.vacuum),s="done"===e.state?"done":"active"===e.state?"active":"queued";return Dt`
                <div class="plan-row plan-row--${s}">
                  <ha-icon class="plan-kind" icon=${"wet"===e.kind?"mdi:water":"mdi:broom"}></ha-icon>
                  <span class="plan-name">${p.get(e.room)??e.room}</span>
                  <span class="dock-avatars">${o?this._vacChip(o.entity):It}</span>
                  <span class="plan-when">${"done"===s?Dt`<ha-icon icon="mdi:check"></ha-icon>`:"active"===s?Dt`<b>${Math.round(Number(e.pct??0))} %</b>`:It}</span>
                </div>`})}
          </div>
          <div class="plan-foot">
            <span class="plan-sum">
              <b>${m.finish_at?this._t("Done around {time}",{time:this._clockStr(m.finish_at)}):this._t("Cleaning")}</b>
              <small>${null!==o?this._t("~{min} min left",{min:o}):""}</small>
            </span>
            ${holdBtn("plan-cancel","mdi:stop",this._t("Cancel · hold"),!0,()=>{this._call("anyvac","cancel",{})})}
          </div>
        </div>`}const v=d?.dry??new Map,b=d?.wet??new Map,w=new Set(d?.unsequenced??[]),$=new Set(this._unassignedRooms(h,o,!0)),C=d?.finish,A=[...h].sort((e,o)=>(C?.get(e)??1/0)-(C?.get(o)??1/0)),F=Date.now(),at=e=>void 0===e?"":this._clockStr(new Date(F+6e4*e).toISOString()),pinTap=(e,o,s)=>this._pinCandidates(e,o).length>1?l=>{l.stopPropagation(),this._cycleRoomPin(e,o,s)}:void 0,modeBtn=(e,s,l)=>Dt`
      <button class="dock-mode ${o===e?"on":""}" aria-pressed=${o===e?"true":"false"}
        @click=${o=>{o.stopPropagation(),this._planMode=e}}>
        <ha-icon icon=${s}></ha-icon><span>${this._t(l)}</span>
      </button>`,who=e=>[...new Set(h.map(o=>e.get(o)).filter(e=>!!e))].map(e=>u.get(e)?this._vacName(u.get(e)):e).join(" + "),E="wet"!==o?who(v):"",T="dry"!==o?who(b):"",O=[E&&this._t("dry {who}",{who:E}),T&&this._t("wet {who}",{who:T})].filter(Boolean).join(this._t(", then ")),B=d?.eta??null;return Dt`
      <div class="dock plan-col">
        <div class="dock-head">
          ${modeBtn("dry","mdi:broom","Dry")}${modeBtn("wet","mdi:water","Wet")}${modeBtn("both","mdi:water-plus","Both")}
        </div>
        <div class="plan-head">
          <span>${l.length?this._t("Selected · {n} {rooms}",{n:l.length,rooms:this._pl(l.length,"room|rooms")}):this._t("Whole home · {n} {rooms}",{n:s.length,rooms:this._pl(s.length,"room|rooms")})}</span>
          ${l.length?Dt`<button class="plan-clear" @click=${()=>this._clearRoomSelection()}>${this._t("Clear · whole home")}</button>`:It}
        </div>
        <div class="plan-rows" style=${Xt({"--plan-n":f})}>
          ${A.map(e=>Dt`
            <div class="plan-row">
              <span class="plan-name">${p.get(e)??e}</span>
              ${$.has(e)?Dt`<ha-icon class="dock-unassigned" icon="mdi:robot-off"
                title=${this._t("No available robot for this room's {mode} pass — check that a vacuum is configured with the right role and knows this room.",{mode:this._t(o)})}></ha-icon>`:It}
              ${w.has(e)?Dt`<ha-icon class="dock-unseq" icon="mdi:sort-variant-off"
                title=${this._t("No cleaning order set for this room — the time estimate may be off. Set the order in the card editor's Global tab.")}></ha-icon>`:It}
              <span class="dock-avatars">
                ${"wet"!==o?this._vacChip(v.get(e),pinTap(e,"dry",v.get(e))):It}
                ${"dry"!==o?this._vacChip(b.get(e),pinTap(e,"wet",b.get(e))):It}
              </span>
              <span class="plan-when">${at(C?.get(e))}</span>
            </div>`)}
        </div>
        <div class="plan-foot">
          <span class="plan-sum">
            <b>${null!==B?this._t("Done around {time}",{time:at(B)}):this._t("Whole plan")}</b>
            <small>${[O,null!==B?"~"+this._timeStr(B).replace(/^~/,""):""].filter(Boolean).join(" · ")}</small>
          </span>
          ${holdBtn("","mdi:play",this._t("Start · hold"),h.length>0,()=>this._runOrchestrated(h,this._planMode))}
        </div>
      </div>`}_dockTier(e){const o=this._intAttrs(e)?.dock_status?.dock_type;return null==o||0===o?"none":1===o||5===o?"empty":"full"}_dockCaps(e){const o=this._intAttrs(e)?.dock_status?.features;if(o&&null!==o.has_dock&&void 0!==o.has_dock)return{hasDock:!!o.has_dock,collect:!!o.is_collectable,wash:!!o.is_washable,dry:!!o.is_dryable};const s=this._dockTier(e);return{hasDock:"none"!==s,collect:"none"!==s,wash:"full"===s,dry:"full"===s}}_dockCapsKey(e){const o=this._dockCaps(e);return`${o.hasDock?1:0}${o.collect?1:0}${o.wash?1:0}${o.dry?1:0}`}_dockRunning(e,o){const s=this._intAttrs(e)?.dock_status?.running;if(!s)return null;const l=s[o];return null==l?null:!!l}_renderDockTab(e){const o=this._dockCaps(e),s=this._intAttrs(e)?.dock_status,act=(o,s)=>()=>{this._call("anyvac",o,{entity_id:e.entity,...s?{action:s}:{}})},cycle=(o,s,l,h)=>{const d=this._dockRunning(e,s);return Dt`
        <button class="dock-sheet-action ${d?"running":""}"
          title=${d?this._t("Stop {what}",{what:this._t(h).toLowerCase()}):this._t(h)}
          @click=${act(o,d?"stop":"start")}>
          <ha-icon icon=${d?"mdi:stop":l}></ha-icon>
          <span>${d?this._t("Stop"):this._t(h)}</span>
        </button>`},l=this._careItems(e).filter(e=>e.binary),h=l.filter(e=>"on"===this.hass.states[e.binary]?.state),d=s?.dock_error_status,p=null!=d&&0!==d&&"0"!==d,u=["empty","wash","dry"].filter(o=>this._dockRunning(e,o)).map(e=>this._t({empty:"Emptying the bin",wash:"Washing the mop",dry:"Drying the mop"}[e])),m=p||h.length>0,_="string"==typeof s?.dock_error?s.dock_error.replace(/_/g," "):"",f=p?_?this._t("Dock error: {name}",{name:_}):this._t("The dock reports an error"):h.length?h.map(e=>e.label).join(", ")+" — "+this._t("check"):u.length?u.join(" · "):this._t("Dock ready");return Dt`
      <div class="rs-pane">
        <div class="rs-dock-state ${m?"bad":""}">
          <ha-icon icon=${m?"mdi:alert-circle-outline":u.length?"mdi:progress-clock":"mdi:check-circle-outline"}></ha-icon>
          <span>${f}</span>
          ${p?Dt`
            <button class="rs-dock-resolve" title=${this._t("Confirm the error is fixed, like Resolved in the Roborock app")}
              @click=${act("dock_resolve_error")}>
              <ha-icon icon="mdi:check-circle-outline"></ha-icon><span>${this._t("Resolved")}</span>
            </button>`:It}
        </div>
        ${l.length?Dt`
          <div class="dock-sheet-care">
            ${l.map(e=>{const o="on"===this.hass.states[e.binary]?.state;return Dt`
                <div class="dock-sheet-care-row">
                  <span class="dock-sheet-care-label">${e.label}</span>
                  <span class="dock-sheet-care-badge ${o?"warn":""}">${o?this._t("Check"):"OK"}</span>
                </div>`})}
          </div>`:It}
        ${this._config.debug&&s?Dt`
          <div class="dock-sheet-debug">
            ${Object.entries(s).flatMap(([e,o])=>null===o||"object"!=typeof o||Array.isArray(o)?[[e,o]]:Object.entries(o).map(([o,s])=>[`${e}.${o}`,s])).filter(([e,o])=>void 0!==o&&(null!==o||e.includes("."))).map(([e,o])=>Dt`<span>${e}: ${null===o?"null":String(o)}</span>`)}
          </div>`:It}
        ${o.hasDock?Dt`
          <div class="dock-sheet-actions">
            ${o.collect?cycle("dock_empty","empty","mdi:delete-empty","Empty"):It}
            ${o.wash?cycle("dock_wash","wash","mdi:water","Wash"):It}
            ${o.dry?cycle("dock_dry","dry","mdi:hair-dryer","Dry"):It}
            ${o.wash?Dt`
              <button class="dock-sheet-action" @click=${act("dock_pump")}>
                <ha-icon icon="mdi:water-pump"></ha-icon><span>${this._t("Pump")}</span>
              </button>
              <button class="dock-sheet-action" @click=${act("dock_self_clean")}>
                <ha-icon icon="mdi:autorenew"></ha-icon><span>${this._t("Self-clean")}</span>
              </button>`:It}
          </div>`:It}
      </div>
    `}_renderCareTab(e){const o=this._careWarnPct(),s=this._careItems(e).filter(e=>!e.binary).map((e,o)=>({r:e,i:o,pct:this._carePct(e)})).sort((e,o)=>(e.pct??1e9)-(o.pct??1e9)||e.i-o.i),reset=e=>o=>{o.stopPropagation();const s=e.entity??e.reset,l=new Map(this._careResetPending);l.set(s,Date.now()),this._careResetPending=l,setTimeout(()=>{if(this._careResetPending.get(s)===l.get(s)){const e=new Map(this._careResetPending);e.delete(s),this._careResetPending=e}},4e4),this._call("button","press",{entity_id:e.reset})};return Dt`
      <div class="rs-pane">
        <div class="dock-sheet-care rs-care">
          ${s.map(({r:e,pct:s})=>{const l=null!==s&&s<=o,h=!!e.reset&&this._careResetPending.has(e.entity??e.reset);return Dt`
              <div class="dock-sheet-care-row ${l?"low":""}">
                <span class="rs-care-main">
                  <span class="rs-care-line">
                    ${l?Dt`<ha-icon class="rs-care-warn" icon="mdi:alert-outline"></ha-icon>`:It}
                    <span class="dock-sheet-care-label">${e.label}</span>
                    <span class="dock-sheet-care-value">${this._careValue(e)}</span>
                  </span>
                  ${null!==s?Dt`<span class="rs-care-bar"><span style=${Xt({width:s+"%"})}></span></span>`:It}
                </span>
                ${e.reset?Dt`
                  <button class="dock-sheet-care-reset ${h?"pending":""}"
                    title=${this._t("Reset {label}",{label:e.label})} aria-label=${this._t("Reset {label}",{label:e.label})} ?disabled=${h} @click=${reset(e)}>
                    <ha-icon icon=${h?"mdi:loading":"mdi:refresh"}></ha-icon>
                  </button>`:It}
              </div>`})}
        </div>
        <span class="rs-note">Worst first · marked at ${o} % or less</span>
      </div>
    `}_renderModeSheet(){if(!this._modeSheetOpen)return It;const e=this._planMode,pick=e=>o=>{o.stopPropagation(),this._planMode=e,this._modeSheetOpen=!1},modeBtn=(o,s,l)=>Dt`
      <button class="dock-mode ${e===o?"on":""}" @click=${pick(o)}>
        <ha-icon icon=${s}></ha-icon><span>${this._t(l)}</span>
      </button>`;return Dt`
      <div class="dock-sheet">
        <div class="dock-head">
          ${modeBtn("dry","mdi:broom","Dry")}${modeBtn("wet","mdi:water","Wet")}${modeBtn("both","mdi:water-plus","Both")}
        </div>
      </div>
    `}_renderStartBar(){const e=this._config.vacuums,o=e.some(e=>this._intAttrs(e)),s=this._allRoomKeys().filter(o=>this._isRoomSelectedAny(o,e)),l=s.length?s:this._allRoomKeys(),h=e.some(e=>this._isCleaning(e)),d="startbar",p={dry:"mdi:broom",wet:"mdi:water",both:"mdi:water-plus"}[this._planMode],u=this._t({dry:"Dry",wet:"Wet",both:"Both"}[this._planMode]),m=Dt`
      <button class="start-seg start-seg--mode ${this._modeSheetOpen?"on":""}"
        title=${this._t("Clean type — tap to change")}
        @click=${e=>{e.stopPropagation(),this._modeSheetOpen=!this._modeSheetOpen}}>
        <ha-icon icon=${p}></ha-icon>
        <span>${u}</span>
      </button>`;if(h)return Dt`
        <div class="start-row">
          ${m}
          <button class="start-bar start-bar--cancel ${this._holdId===d?"action-btn--holding":""}"
            @pointerdown=${this._holdStart(d,()=>{if(o)this._call("anyvac","cancel",{});else for(const o of e)this._isCleaning(o)&&this._pause(o)})}
            @pointermove=${this._holdMove}
            @pointerup=${this._holdEnd} @pointerleave=${this._holdEnd} @pointercancel=${this._holdEnd}>
            <div class="hold-ring"></div>
            <ha-icon icon="mdi:stop"></ha-icon>
            <span>${this._t("Cancel · hold")}</span>
          </button>
        </div>`;const _=o&&l.length>0,f=s.length?s.length+" "+this._pl(s.length,"room|rooms"):this._t("whole home");return Dt`
      <div class="start-row">
        ${m}
        <button class="start-bar ${_&&this._holdId===d?"action-btn--holding":""}"
          ?disabled=${!_}
          title=${o?"":this._t("Requires the AnyVac integration")}
          @pointerdown=${_?this._holdStart(d,()=>this._runOrchestrated(l,this._planMode)):It}
          @pointermove=${this._holdMove}
          @pointerup=${this._holdEnd} @pointerleave=${this._holdEnd} @pointercancel=${this._holdEnd}>
          <div class="hold-ring"></div>
          <ha-icon icon="mdi:play"></ha-icon>
          <span>${this._t("Start · {scope} · hold",{scope:f})}</span>
        </button>
      </div>`}_settingPresets(e){if(e.presets&&e.presets.length)return e.presets;const o=e.clean_action;return[{id:"default",label:this._t("Default"),suction_level:o?.suction_level,mop_mode:o?.mop_mode,mop_intensity:o?.mop_intensity,repeat:o?.repeat}]}_activePresetId(e){const o=this._settingPresets(e),s=this._activePresets.get(e.entity);return s&&o.some(e=>e.id===s)?s:o[0]?.id??"default"}_activePreset(e){const o=this._settingPresets(e),s=this._activePresetId(e);return o.find(e=>e.id===s)??o[0]}_setActivePreset(e,o){const s=new Map(this._activePresets);s.set(e.entity,o),this._activePresets=s}_renderPresetChips(e){const o=this._settingPresets(e);if(o.length<2)return It;const s=this._activePresetId(e),l=this._color(e);return Dt`
      <div class="preset-chip-row">
        ${o.map(o=>{const h=o.id===s;return Dt`<button
            @click=${s=>{s.stopPropagation(),this._setActivePreset(e,o.id)}}
            style=${Xt({display:"inline-flex",alignItems:"center",gap:"4px",flexShrink:"0",padding:"4px 10px",borderRadius:"var(--avc-th-r-pill, 14px)",cursor:"pointer",fontSize:"var(--avc-th-fs-s, 12px)",lineHeight:"1",border:"1px solid "+(h?l:"rgba(var(--avc-ink-rgb),0.15)"),background:h?this._colorBg(e):"rgba(var(--avc-ink-rgb),0.04)",color:h?"rgb(var(--avc-ink-rgb))":"rgba(var(--avc-ink-rgb),0.55)"})}
          >
            ${o.icon?Dt`<ha-icon icon=${o.icon} style="--mdc-icon-size:14px"></ha-icon>`:It}
            <span>${o.label}</span>
          </button>`})}
      </div>
    `}async _startClean(e){const o=this._roomsFor(e).filter(o=>this._isRoomSelected(o,e));if(0===o.length)return;if(this._intAttrs(e)){const s=this._activePreset(e),l=this._liveCleanType(e),h={};return s.suction_level&&(h.fan_speed=s.suction_level),"wet"===l&&s.mop_mode&&(h.mop_mode=s.mop_mode),"wet"===l&&s.mop_intensity&&(h.mop_intensity=s.mop_intensity),s.repeat&&s.repeat>1&&(h.repeat=s.repeat),void await this._call("anyvac","clean",{rooms:o.map(e=>e.key),mode:l,vacuums:[e.entity],...Object.keys(h).length?{settings:{[l]:{[e.entity]:h}}}:{}})}if(!e.clean_action)return;if("script"===e.clean_action.type){const s=e.clean_action,l={};for(const[h,d]of Object.entries(s.variables??{}))l[h]=d.replace("{{ entity }}",e.entity).replace("{{ selected_segments }}",JSON.stringify(o.map(e=>e.segment_id).filter(Boolean))).replace("{{ selected_room_keys }}",JSON.stringify(o.map(e=>e.key))).replace("{{ selected_area_ids }}",JSON.stringify(o.map(e=>e.area_id).filter(Boolean)));return void await this._call("script","turn_on",{entity_id:s.entity_id,variables:l})}const s=e.clean_action,l=this._activePreset(e),h=l.mop_mode??s.mop_mode,d=l.mop_intensity??s.mop_intensity,p=l.suction_level??s.suction_level;if(s.mop_mode_entity&&h&&await this._call("select","select_option",{entity_id:s.mop_mode_entity,option:h}),s.mop_intensity_entity&&d&&await this._call("select","select_option",{entity_id:s.mop_intensity_entity,option:d}),p&&await this._call("vacuum","set_fan_speed",{entity_id:e.entity,fan_speed:p}),"native-area"===e.clean_action.type)try{await this.hass.callService("vacuum","clean_area",{cleaning_area_id:o.map(e=>e.area_id??this._config.area_mappings?.[e.key]??e.key)},{entity_id:e.entity})}catch(e){console.error("[anyvac-card] vacuum.clean_area failed:",e)}else{const s=e.clean_action,l=o.map(e=>e.segment_id).filter(e=>void 0!==e);if(!l.length)return void console.error("[anyvac-card] no configured segment_ids for the selection; aborting");await this._call("vacuum","send_command",{entity_id:e.entity,command:"app_segment_clean",params:[{segments:l,repeat:s.repeat??1}]})}}_renderBadge(e,o){const s=this._shownSet.has(o),l=this._isCleaning(e),h=this._color(e),d=e.name??e.entity.split(".")[1]??e.entity,p=this._holdId==="badge-"+o,u=this._statusInfo(e)[1],m=l?this._colorBgActive(e):s?this._colorBg(e):"rgba(var(--avc-scrim-2-rgb),0.85)";return Dt`
      <button
        class="badge ${p?"badge--holding":""}"
        style=${Xt({background:m,border:l?"3px solid "+u:s?"2px solid "+u:"2px solid rgba(var(--avc-ink-rgb),0.18)",boxShadow:l?"0 0 18px "+u:s?"0 0 6px "+u:"none"})}
        @pointerdown=${e=>{e.preventDefault(),this._cancelHold(),this._holdId="badge-"+o,this._holdTimer=setTimeout(()=>{this._holdTimer=null,this._holdId=null,this._toggleShown(o)},te)}}
        @pointerup=${()=>{null!==this._holdTimer?(this._cancelHold(),this._shownSet=new Set([o]),this._saveShown()):this._holdId=null}}
        @pointerleave=${this._holdEnd}
        @pointercancel=${this._holdEnd}
        aria-pressed=${s?"true":"false"}
        aria-label=${d}
      >
        <div class="hold-ring"></div>
        ${e.image?Dt`<img class="badge-img" src=${e.image} alt=${d} />`:Dt`<ha-icon class="badge-icon" icon="mdi:robot-vacuum" style=${Xt({color:h})}></ha-icon>`}
        <span class="badge-name" style=${Xt({color:s?"rgb(var(--avc-ink-rgb))":"rgba(var(--avc-ink-rgb),0.55)"})}>
          ${d}
        </span>
      </button>
    `}_renderVacuumPicker(){const e=this._config.vacuums;return e.length?Dt`<div class="vac-picker">${e.map((e,o)=>this._renderBadge(e,o))}</div>`:It}_renderGlobalBadge(e,o){const s=this._isGlobalActive(e),l=this._resolveColor(e.color,"orange"),h="global-"+o,d=this._holdId===h,p=s?this._resolveBg(e.color,"orange",!0):"rgba(var(--avc-scrim-2-rgb),0.85)";return Dt`
      <button
        class="badge badge--global ${d?"badge--holding":""}"
        style=${Xt({background:p,border:s?"3px solid "+l:"2px solid rgba(var(--avc-ink-rgb),0.18)",boxShadow:s?"0 0 18px "+l+"B0":"none"})}
        @pointerdown=${this._holdStart(h,()=>this._triggerGlobal(e))}
        @pointermove=${this._holdMove}
        @pointerup=${this._holdEnd}
        @pointerleave=${this._holdEnd}
        @pointercancel=${this._holdEnd}
        aria-label=${e.name}
        title=${this._t("Hold to trigger: {name}",{name:e.name})}
      >
        <div class="hold-ring"></div>
        ${e.image?Dt`<img class="badge-img" src=${e.image} alt=${e.name} />`:Dt`<ha-icon class="badge-icon" icon="mdi:home-floor-a" style=${Xt({color:l})}></ha-icon>`}
        <span class="badge-name" style=${Xt({color:s?"rgb(var(--avc-ink-rgb))":"rgba(var(--avc-ink-rgb),0.55)"})}>
          ${e.name}
        </span>
      </button>
    `}_toggleMode(e,o){this._mapMode===o&&this._modeEntity===e?(this._mapMode="normal",this._modeEntity=null):(this._mapMode=o,this._modeEntity=e)}_armMode(e){this._mapMode===e&&"*"===this._modeEntity?(this._mapMode="normal",this._modeEntity=null):(this._mapMode=e,this._modeEntity="*",this._pinPending=null,this._zonePending=null,this._zoneRectShown=null,this._zoneEdit=null)}_modeCandidates(){return this._config.vacuums.filter(e=>this._intAttrs(e)&&this._mapEntityFor(e))}_isModeCandidate(e){return this._modeEntity===e.entity||"*"===this._modeEntity&&!!this._intAttrs(e)&&!!this._mapEntityFor(e)}_hasZoneEditTarget(e){return this._isModeCandidate(e)||!!this._zonePending?.[e.entity]}_zoneHit(e,o,s){const l=Math.min(e.x0,e.x1),h=Math.max(e.x0,e.x1),d=Math.min(e.y0,e.y1),p=Math.max(e.y0,e.y1),u=[["nw",l,d],["ne",h,d],["sw",l,p],["se",h,p]];for(const[e,l,h]of u)if(Math.abs(o-l)<=4&&Math.abs(s-h)<=4)return e;return o>=l&&o<=h&&s>=d&&s<=p?"move":null}_renderZoneHandles(){return Dt`
      <div class="zone-handle zone-handle--nw"></div>
      <div class="zone-handle zone-handle--ne"></div>
      <div class="zone-handle zone-handle--sw"></div>
      <div class="zone-handle zone-handle--se"></div>
    `}_zoneRectFor(e,o){return"zone"===this._mapMode&&this._isModeCandidate(e)&&this._zoneDrag?this._zoneDrag:this._zoneRectShown?"merged"===this._config.map_mode?o?this._zoneRectShown:null:this._zonePending?.[e.entity]?this._zoneRectShown:null:null}_refreshMap(e){const o=this._mapEntityFor(e);o&&this.hass.callService("homeassistant","update_entity",{entity_id:o})}_clampPct(e){return Math.min(100,Math.max(0,e))}_onMapClick(e,o){if("pin"!==this._mapMode)return;if(!this._isModeCandidate(e))return;const s=this._spSet;if(s&&this._config.vacuums[s.idx]?.entity===e.entity){const l=this._homeFrameCropFor(e),h=this._wrapAspect(this._baseHeightFor(e)),d=l?null:this._homeAnchorFitFor(e,h),p=l?this._clickToHomePx(l,o.clientX,o.clientY):d?this._clickToHomeAnchorPx(d.fit,d.dims,h,o.clientX,o.clientY):this._clickToContent(e,o.clientX,o.clientY);return void(p&&(this._spSet={...s,point:l||d?{x:p.x,y:p.y,frame:"home"}:{x:this._clampPct(p.x),y:this._clampPct(p.y)}}))}if("*"===this._modeEntity&&"merged"===this._config.map_mode){const e={};for(const s of this._modeCandidates()){const l=this._homeFrameCropFor(s);if(l){const h=this._clickToHomePx(l,o.clientX,o.clientY);h&&(e[s.entity]={x:h.x,y:h.y,frame:"home"});continue}const h=this._homeAnchorFitFor(s,this._wrapAspect(this._baseHeightFor(s)));if(h){const l=this._clickToHomeAnchorPx(h.fit,h.dims,this._wrapAspect(this._baseHeightFor(s)),o.clientX,o.clientY);l&&(e[s.entity]={x:l.x,y:l.y,frame:"home"});continue}const d=this._clickToContent(s,o.clientX,o.clientY);d&&(e[s.entity]={x:this._clampPct(d.x),y:this._clampPct(d.y)})}return this._pinPending=Object.keys(e).length?e:null,this._mapMode="normal",void(this._modeEntity=null)}const l=this._homeFrameCropFor(e),h=l?null:this._homeAnchorFitFor(e,this._wrapAspect(this._baseHeightFor(e))),d=!!l||!!h,p=l?this._clickToHomePx(l,o.clientX,o.clientY):h?this._clickToHomeAnchorPx(h.fit,h.dims,this._wrapAspect(this._baseHeightFor(e)),o.clientX,o.clientY):this._clickToContent(e,o.clientX,o.clientY);this._dbg=p?d?"goto (home) "+p.x.toFixed(1)+"px, "+p.y.toFixed(1)+"px":"goto "+p.x.toFixed(1)+"%, "+p.y.toFixed(1)+"%":"(map element not found)",p&&this._call("anyvac","goto",d?{entity_id:e.entity,frame:"home",x_home_px:p.x,y_home_px:p.y}:{entity_id:e.entity,x_pct:this._clampPct(p.x),y_pct:this._clampPct(p.y)}),this._mapMode="normal",this._modeEntity=null}_mapRotationDeg(){return this._config.layout?this._mapRegW<=4||this._mapRegH<=4?0:(this._narrow?90:0)+(this._flipEff?180:0):this._narrow?90:0}_unrotateDelta(e,o){const s=(this._mapRotationDeg()%360+360)%360;if(!s)return{dx:e,dy:o};const l=s*Math.PI/180,h=Math.cos(l),d=Math.sin(l);return{dx:h*e+d*o,dy:-d*e+h*o}}_wrapPct(e,o,s){const l=e.getBoundingClientRect(),h=this._unrotateDelta(o-(l.left+l.right)/2,s-(l.top+l.bottom)/2),d=e.offsetWidth||1,p=e.offsetHeight||1;return{x:100*(h.dx/d+.5),y:100*(h.dy/p+.5)}}_wrapPoint(e,o,s){const l=e.getBoundingClientRect(),h=(l.left+l.right)/2,d=(l.top+l.bottom)/2,p=(o/100-.5)*(e.offsetWidth||1),u=(s/100-.5)*(e.offsetHeight||1),m=(this._mapRotationDeg()%360+360)%360;if(!m)return{x:h+p,y:d+u};const _=m*Math.PI/180,f=Math.cos(_),v=Math.sin(_);return{x:h+(f*p-v*u),y:d+(v*p+f*u)}}_clickToContent(e,o,s){const l=this._mapEntityFor(e)?this.renderRoot?.querySelector(`.map-img[data-entity="${e.entity.replace(/"/g,'\\"')}"]`):null;if(!l)return null;const h=l.getBoundingClientRect(),d=(h.left+h.right)/2,p=(h.top+h.bottom)/2,u=getComputedStyle(l).transform,m=new DOMMatrix("none"===u?void 0:u),_=m.a*m.d-m.b*m.c;if(Math.abs(_)<1e-9)return null;const f=this._unrotateDelta(o-d,s-p),v=(m.d*f.dx-m.c*f.dy)/_,b=(-m.b*f.dx+m.a*f.dy)/_;return{x:100*(v/(l.offsetWidth||1)+.5),y:100*(b/(l.offsetHeight||1)+.5)}}_clickToHomePx(e,o,s){const l=this._clickToImageBasePct(o,s);return l?pctToCropPoint(l,e):null}_clickToImageBasePct(e,o){const s=this.renderRoot?.querySelector(".image-base-img");if(!s)return null;const l=s.getBoundingClientRect(),h=(l.left+l.right)/2,d=(l.top+l.bottom)/2,p=getComputedStyle(s).transform,u=new DOMMatrix("none"===p?void 0:p),m=u.a*u.d-u.b*u.c;if(Math.abs(m)<1e-9)return null;const _=this._unrotateDelta(e-h,o-d),f=(u.d*_.dx-u.c*_.dy)/m,v=(-u.b*_.dx+u.a*_.dy)/m;return{x:100*(f/(s.offsetWidth||1)+.5),y:100*(v/(s.offsetHeight||1)+.5)}}_clickToHomeAnchorPx(e,o,s,l,h){const d=this._clickToImageBasePct(l,h);return d?function unprojectPctThroughFit(e,o,s,l){const h=e.x/100,d=e.y/100/l,p=s.scale/100,u=s.rotation*de,m=Math.cos(u),_=Math.sin(u),f=h-(50+s.offset_x)/100,v=d-(50+s.offset_y)/100/l,b=(-_*f+m*v)/p;return{x:(m*f+_*v)/p*o.NW+o.NW/2,y:b*o.NW+o.NH/2}}(d,o,e,s):null}_onZoneDown(e,o){if(!(!!this._zoneRectShown&&this._hasZoneEditTarget(e)||"zone"===this._mapMode&&this._isModeCandidate(e)))return;const s=o.currentTarget;s.setPointerCapture?.(o.pointerId);const{x:l,y:h}=this._wrapPct(s,o.clientX,o.clientY);if(this._zoneRectShown){const e=this._zoneHit(this._zoneRectShown,l,h);if(e){const o=this._zoneRectShown,s=Math.min(o.x0,o.x1),d=Math.max(o.x0,o.x1),p=Math.min(o.y0,o.y1),u=Math.max(o.y0,o.y1);return this._zoneRectShown={x0:s,y0:p,x1:d,y1:u},void(this._zoneEdit="move"===e?{type:"move",offsetX:l-s,offsetY:h-p,width:d-s,height:u-p}:{type:e})}if("zone"!==this._mapMode)return}this._zonePending=null,this._zoneRectShown=null,this._zoneEdit=null,this._zoneMulti="*"===this._modeEntity&&"merged"===this._config.map_mode,this._zoneDrag={x0:l,y0:h,x1:l,y1:h}}_onZoneMove(e,o){if(this._zoneEdit&&this._zoneRectShown){const e=o.currentTarget,{x:s,y:l}=this._wrapPct(e,o.clientX,o.clientY),h=3,d=this._zoneEdit;if("move"===d.type){const{offsetX:e,offsetY:o,width:h,height:p}=d,u=Math.min(100-h,Math.max(0,s-e)),m=Math.min(100-p,Math.max(0,l-o));this._zoneRectShown={x0:u,y0:m,x1:u+h,y1:m+p}}else{let{x0:e,y0:o,x1:p,y1:u}=this._zoneRectShown;const m=this._clampPct(s),_=this._clampPct(l);"nw"===d.type?(e=Math.min(m,p-h),o=Math.min(_,u-h)):"ne"===d.type?(p=Math.max(m,e+h),o=Math.min(_,u-h)):"sw"===d.type?(e=Math.min(m,p-h),u=Math.max(_,o+h)):(p=Math.max(m,e+h),u=Math.max(_,o+h)),this._zoneRectShown={x0:e,y0:o,x1:p,y1:u}}return}if(!this._zoneDrag||"zone"!==this._mapMode||!this._isModeCandidate(e))return;const s=o.currentTarget,l=this._wrapPct(s,o.clientX,o.clientY);this._zoneDrag={x0:this._zoneDrag.x0,y0:this._zoneDrag.y0,x1:l.x,y1:l.y}}_onZoneUp(e,o){const s=o.currentTarget;if(this._zoneEdit)return this._zoneEdit=null,void this._commitZoneRect(e,s);if(!this._zoneDrag||"zone"!==this._mapMode||!this._isModeCandidate(e))return;const l=Math.abs(this._zoneDrag.x1-this._zoneDrag.x0)>2||Math.abs(this._zoneDrag.y1-this._zoneDrag.y0)>2;if(this._zoneRectShown=l?this._zoneDrag:null,this._zoneDrag=null,!l)return;this._zoneMulti&&(this._mapMode="normal",this._modeEntity=null),this._commitZoneRect(e,s)}_commitZoneRect(e,o){const s=this._zoneRectShown;if(!s)return;const l=this._wrapPoint(o,Math.min(s.x0,s.x1),Math.min(s.y0,s.y1)),h=this._wrapPoint(o,Math.max(s.x0,s.x1),Math.max(s.y0,s.y1)),d=l.x,p=l.y,u=h.x,m=h.y;if(this._zoneMulti){const e={};for(const o of this._modeCandidates()){const s=this._homeFrameCropFor(o);if(s){const l=this._clickToHomePx(s,d,p),h=this._clickToHomePx(s,u,m);l&&h&&(e[o.entity]={x1:Math.min(l.x,h.x),y1:Math.min(l.y,h.y),x2:Math.max(l.x,h.x),y2:Math.max(l.y,h.y),frame:"home"});continue}const l=this._wrapAspect(this._baseHeightFor(o)),h=this._homeAnchorFitFor(o,l);if(h){const s=this._clickToHomeAnchorPx(h.fit,h.dims,l,d,p),_=this._clickToHomeAnchorPx(h.fit,h.dims,l,u,m);s&&_&&(e[o.entity]={x1:Math.min(s.x,_.x),y1:Math.min(s.y,_.y),x2:Math.max(s.x,_.x),y2:Math.max(s.y,_.y),frame:"home"});continue}const _=this._clickToContent(o,d,p),f=this._clickToContent(o,u,m);_&&f&&(e[o.entity]={x1:this._clampPct(Math.min(_.x,f.x)),y1:this._clampPct(Math.min(_.y,f.y)),x2:this._clampPct(Math.max(_.x,f.x)),y2:this._clampPct(Math.max(_.y,f.y))})}return void(this._zonePending=Object.keys(e).length?e:null)}const _=this._homeFrameCropFor(e);if(_){const o=this._clickToHomePx(_,d,p),s=this._clickToHomePx(_,u,m);return void(o&&s&&(this._zonePending={[e.entity]:{x1:Math.min(o.x,s.x),y1:Math.min(o.y,s.y),x2:Math.max(o.x,s.x),y2:Math.max(o.y,s.y),frame:"home"}}))}const f=this._wrapAspect(this._baseHeightFor(e)),v=this._homeAnchorFitFor(e,f);if(v){const o=this._clickToHomeAnchorPx(v.fit,v.dims,f,d,p),s=this._clickToHomeAnchorPx(v.fit,v.dims,f,u,m);return void(o&&s&&(this._zonePending={[e.entity]:{x1:Math.min(o.x,s.x),y1:Math.min(o.y,s.y),x2:Math.max(o.x,s.x),y2:Math.max(o.y,s.y),frame:"home"}}))}const b=this._clickToContent(e,d,p),w=this._clickToContent(e,u,m);b&&w&&(this._zonePending={[e.entity]:{x1:this._clampPct(Math.min(b.x,w.x)),y1:this._clampPct(Math.min(b.y,w.y)),x2:this._clampPct(Math.max(b.x,w.x)),y2:this._clampPct(Math.max(b.y,w.y))}})}_confirmZone(e){const o=this._zonePending?.[e.entity];if(!o)return;const s=e.clean_action;if(this._call("anyvac","zone_clean","home"===o.frame?{entity_id:e.entity,frame:"home",x1_home_px:o.x1,y1_home_px:o.y1,x2_home_px:o.x2,y2_home_px:o.y2,repeat:s?.repeat??1}:{entity_id:e.entity,x1_pct:o.x1,y1_pct:o.y1,x2_pct:o.x2,y2_pct:o.y2,repeat:s?.repeat??1}),this._zonePending){const o={...this._zonePending};delete o[e.entity],this._zonePending=Object.keys(o).length?o:null,this._zonePending||(this._zoneRectShown=null)}this._zoneDrag=null,this._zoneEdit=null,this._mapMode="normal",this._modeEntity=null}_confirmPin(e){const o=this._pinPending?.[e.entity];if(o&&(this._call("anyvac","goto","home"===o.frame?{entity_id:e.entity,frame:"home",x_home_px:o.x,y_home_px:o.y}:{entity_id:e.entity,x_pct:o.x,y_pct:o.y}),this._pinPending)){const o={...this._pinPending};delete o[e.entity],this._pinPending=Object.keys(o).length?o:null}}_cancelPin(){this._pinPending=null}_cancelZone(){this._zonePending=null,this._zoneDrag=null,this._zoneRectShown=null,this._zoneEdit=null}_renderMetaBar(e){const o=e.filter(e=>this._mapEntityFor(e));if(!o.length){const o=this._renderHero(e);return o===It?It:Dt`<div class="meta-bar">${o}</div>`}const s=this._modeCandidates().length>0,l=s?"":"Requires the AnyVac integration (≥ 0.18) + map entity",h="*"===this._modeEntity?this._mapMode:"normal",d=this._allRoomKeys().filter(o=>this._isRoomSelectedAny(o,e)),p=d.length?d:this._allRoomKeys(),u=e.some(e=>this._intAttrs(e));u&&p.length&&this._fetchPlan(p,this._planMode);const m=u?this._planPreview?.unsequenced??[]:[],_=this._unassignedRooms(p,this._planMode,u),f=this._pinPending?Object.keys(this._pinPending).length:0,v=this._zonePending?Object.keys(this._zonePending).length:0;return Dt`
      <div class="meta-bar">
        ${this._renderHero(e)}
        <div class="meta-bar-cluster">
          <button class="mtbtn ${"pin"===h?"on":""}" ?disabled=${!s}
            @click=${()=>this._armMode("pin")} title=${l||this._t("Pin & Go")}>
            <ha-icon icon="mdi:map-marker-radius"></ha-icon><span>${this._t("Pin & Go")}</span>
          </button>
          <button class="mtbtn ${"zone"===h?"on":""}" ?disabled=${!s}
            @click=${()=>this._armMode("zone")} title=${l||this._t("Zone clean")}>
            <ha-icon icon="mdi:select-drag"></ha-icon><span>${this._t("Zone")}</span>
          </button>
        </div>
        <div class="meta-bar-spacer"></div>
        <div class="meta-bar-cluster meta-bar-cluster--right">
          ${_.length?Dt`<span class="mtbtn mtbtn--stat mtbtn--err"
              title="${_.length} selected room${_.length>1?"s have":" has"} no available robot for the ${this._planMode} pass — it/they will be silently skipped. Check vacuum roles/config.">
            <ha-icon icon="mdi:robot-off"></ha-icon><b>${_.length}</b>
          </span>`:It}
          ${m.length?Dt`<span class="mtbtn mtbtn--stat mtbtn--warn"
              title="${m.length} selected room${m.length>1?"s have":" has"} no cleaning order set — the time may be off. Set the order in the card editor's Global tab.">
            <ha-icon icon="mdi:sort-variant-off"></ha-icon><b>${m.length}</b>
          </span>`:It}
          ${this._renderLayerToggleCompact(e)}
          ${this._config.layout?Dt`<button class="mtbtn ${this._flipEff?"on":""}"
              title=${this._t("Flip map 180° for this screen (this session only)")} aria-label=${this._t("Flip map")}
              aria-pressed=${this._flipEff?"true":"false"}
              @click=${()=>this._toggleFlipLive()}>
            <ha-icon icon="mdi:flip-vertical"></ha-icon>
          </button>`:It}
          ${(()=>{const o=this._alignCandidates(e);return o.length?Dt`<button class="mtbtn" title=${this._t("Align — full-screen manual floorplan seating")}
                @click=${()=>this._requestVisualEditor(o[0])}>
              <ha-icon icon="mdi:vector-square-edit"></ha-icon>
            </button>`:It})()}
          <div class="meta-bar-divider"></div>
          <button class="mtbtn mtbtn--ghost" title=${this._t("Refresh maps")} @click=${e=>{const s=e.currentTarget;s.classList.remove("mtbtn--spin"),s.offsetWidth,s.classList.add("mtbtn--spin");for(const e of o)this._refreshMap(e)}}>
            <ha-icon icon="mdi:refresh"></ha-icon>
          </button>
        </div>
      </div>
      ${v?Dt`<div class="calib-panel">
          <div>${this._t("Zone ready for {n} {vacuums} — drag the box or its corners to adjust, then pick one on its status card below.",{n:v,vacuums:this._pl(v,"vacuum|vacuums")})}</div>
          <div class="calib-actions"><button class="mtbtn" @click=${()=>this._cancelZone()}>${this._t("Cancel")}</button></div>
        </div>`:"zone"===h?Dt`<div class="calib-panel">${this._t("Drag a rectangle on the map to set a cleaning zone.")}</div>`:It}
      ${f?Dt`<div class="calib-panel">
          <div>${this._t("Pin ready for {n} {vacuums} — pick one on its status card below.",{n:f,vacuums:this._pl(f,"vacuum|vacuums")})}</div>
          <div class="calib-actions"><button class="mtbtn" @click=${()=>this._cancelPin()}>${this._t("Cancel")}</button></div>
        </div>`:"pin"===h?Dt`<div class="calib-panel">${this._t("Tap the map to drop a pin.")}</div>`:It}
    `}_renderMapTools(e){if(!e.map&&!e.image_base&&!this._mapEntityFor(e))return It;const o=this._mapEntityFor(e),s=!!this._intAttrs(e)&&!!o,l=s?"":"Requires the AnyVac integration (≥ 0.18) + map entity",h=this._modeEntity===e.entity?this._mapMode:"normal";return Dt`
      <div class="map-tools">
        ${this._config.layout&&this._config.vacuums.length>1?Dt`<span class="map-tools-label">${e.name??e.entity}</span>`:It}
        ${o?Dt`<button class="mtbtn" @click=${()=>this._refreshMap(e)} title=${this._t("Refresh map")}>
          <ha-icon icon="mdi:refresh"></ha-icon><span>${this._t("Refresh")}</span>
        </button>`:It}
        <button class="mtbtn ${"pin"===h?"on":""}" ?disabled=${!s}
          @click=${()=>this._toggleMode(e.entity,"pin")} title=${l||this._t("Pin & Go")}>
          <ha-icon icon="mdi:map-marker-radius"></ha-icon><span>${this._t("Pin & Go")}</span>
        </button>
        <button class="mtbtn ${"zone"===h?"on":""}" ?disabled=${!s}
          @click=${()=>this._toggleMode(e.entity,"zone")} title=${l||this._t("Zone clean")}>
          <ha-icon icon="mdi:select-drag"></ha-icon><span>${this._t("Zone")}</span>
        </button>
        ${!this._dbg||!this._config.debug&&this._config.layout?It:Dt`<span style="font-size:var(--avc-th-fs-xs,11px);opacity:0.65;align-self:center;font-family:monospace">${this._dbg}</span>`}
      </div>
      ${"pin"===h?Dt`<div class="calib-panel">${this._t("Tap the map to send the robot there.")}</div>`:It}
      ${"zone"===h?Dt`<div class="calib-panel">
        ${this._zonePending?.[e.entity]?Dt`<div>${this._t("Clean this zone? Drag the box or its corners to adjust.")}</div>
              <div class="calib-actions">
                <button class="mtbtn on" @click=${()=>this._confirmZone(e)}>${this._t("Clean zone")}</button>
                <button class="mtbtn" @click=${()=>this._cancelZone()}>${this._t("Cancel")}</button>
              </div>`:Dt`${this._t("Drag a rectangle on the map to set a cleaning zone.")}`}
      </div>`:It}
    `}_baseHeightFor(e){return"merged"===this._config.map_mode?this._config.base_height??this._config.vacuums.find(e=>e.base_height)?.base_height:e.base_height}_wrapAspect(e){return"number"==typeof e&&e>0&&this._cardW>0?Math.max(.2,(this._cardW-16)/e):this._mapAR>.1?this._mapAR:3.636}_effectiveSeat(e){this._memoSync();const o=this._seatMemo.get(e.entity);if(o)return o;const s=resolveSeat(this._config,e,this._intAttrs(e),this._wrapAspect(this._baseHeightFor(e)));return this._seatMemo.set(e.entity,s),s}_alignCandidates(e){return!1===this._config.visual_editor_mode?[]:e.filter(e=>!!resolveImageBaseSrc(this._config,e)&&!!this._intAttrs(e))}_alignVac(){const e=this._alignSession;return e?this._config.vacuums.find(o=>o.entity===e.vacuum):void 0}_veFitsScreen(){try{if(window.innerWidth<760)return!1;const e=window.matchMedia?.bind(window);return!e||e("(any-pointer: fine)").matches}catch{return!0}}_requestVisualEditor(e){this._veFitsScreen()?this._openAlign(e):this._veNotice=e}_renderVeNotice(){const e=this._veNotice;if(!e)return It;const close=()=>{this._veNotice=null};return Dt`
      <div class="robot-sheet-scrim" @click=${close}></div>
      <div class="robot-sheet ve-notice" role="dialog" aria-modal="true" aria-label="Visual editor"
        @keydown=${e=>{"Escape"===e.key&&close()}}>
        <span class="robot-sheet-grip" aria-hidden="true"></span>
        <div class="ve-notice-head">
          <ha-icon icon="mdi:monitor-screenshot"></ha-icon>
          <span class="robot-sheet-name">Made for a bigger screen</span>
        </div>
        <p class="ve-notice-text">The Visual editor is precise mouse work — aligning maps, dragging room
          corners, typing exact values. Open this dashboard on a computer to use it.</p>
        <div class="robot-sheet-foot">
          <button class="mtbtn ve-notice-anyway" @click=${()=>{close(),this._openAlign(e)}}>
            <ha-icon icon="mdi:open-in-new"></ha-icon><span>Open anyway</span></button>
          <button class="mtbtn on ve-notice-ok" @click=${close}><span>OK</span></button>
        </div>
      </div>`}_openAlign(e){if(this._alignSession)return;this._alignMapNat=null;const o=resolveImageBaseSrc(this._config,e);if(!o||!this._intAttrs(e))return;const s=this._effectiveSeat(e),l={rotation:s.rotation,scale:s.scale,scaleY:s.scaleY,offset_x:s.offset_x,offset_y:s.offset_y},h=effectiveAppearance(e),d=resolveImageBaseSrc(this._rawConfig??this._config,e)??o;this._alignSession={vacuum:e.entity,floorplan:o,floorplanKey:d,start:{...l},draft:{...l},history:[],future:[],appearanceStart:{...h},appearanceDraft:{...h},layers:{floor:1,rawMap:1,reach:.6,dry:!0,wet:!0,rooms:!0,staticRooms:!0,others:!0},snap90:!1,nudgeTier:"normal"},this._alignView={zoom:1,panX:0,panY:0,rot:0},this._alignGesture=null,this._roomsSession=null,this._roomsGesture=null,this._roomsDrawGesture=null,this._roomsDeleteConfirm=null,this._floorplanSession=null,this._floorGesture=null,this._furnSession=null,this._furnGesture=null,this._resetFloorplanSubmodes(),this._veToolSwitchTarget=null,this._veTool=this._loadVeTool(),"rooms"===this._veTool?this._openRooms():"floorplan"===this._veTool?this._openFloorplan():"furniture"===this._veTool&&this._openFurniture(),requestAnimationFrame(()=>this._alignRefocusOverlay())}_alignRefocusOverlay(){const e=this._alignHost?.shadowRoot?.querySelector(".align-overlay");e?.focus()}_closeAlign(){this._alignSession=null,this._alignGesture=null,this._alignCancelConfirm=!1,this._roomsSession=null,this._roomsGesture=null,this._roomsDrawGesture=null,this._roomsDeleteConfirm=null,this._floorplanSession=null,this._floorGesture=null,this._furnSession=null,this._furnGesture=null,this._resetFloorplanSubmodes(),this._veToolSwitchTarget=null}_resetFloorplanSubmodes(){this._floorplanMode="geo",this._floorCalib=null,this._floorCalibRefNat=null,this._floorCalibResult=null,this._floorCalibError="",this._homeCalib=null,this._homeCalibBusy=!1,this._homeCalibError="",this._homeCalibResult=null,this._homeCalibSnapshotUrl="",this._homeCalibCrop=null,this._homeCalibFrameId="",this._fiducialSnapshotBusy=!1,this._fiducialSnapshotError="",this._fiducialSnapshotPath="",this._fiducialKnown=null,this._fiducialDetectBusy=!1,this._fiducialDetectError="",this._fiducialDetectResult=null,this._floorplanSnapshotBusy=!1,this._floorplanSnapshotError="",this._homeFrameSnapshotBusy=!1,this._homeFrameSnapshotError="",this._guideExportBusy=!1,this._guideExportError="",this._guideExportResult=null,this._placeRoomsResult=null,this._recropDraft={rotation:0,scale:100,offset_x:0,offset_y:0},this._recropHistory=[],this._recropFuture=[],this._recropGesture=null,this._recropNat=null}_alignReadOnly(){const e=this._alignVac();return!!e&&!!this._homeFrameCropFor(e)}_alignHasChanges(){const e=this._alignSession;if(!e)return!1;const o=e.draft,s=e.start;if(o.rotation!==s.rotation||o.scale!==s.scale||(o.scaleY??null)!==(s.scaleY??null)||o.offset_x!==s.offset_x||o.offset_y!==s.offset_y)return!0;const l=e.appearanceDraft,h=e.appearanceStart;return Object.keys(l).some(e=>(l[e]??null)!==(h[e]??null))}_alignCancel(){this._alignHasChanges()||this._roomsHasUnsavedChanges()||this._floorplanHasChanges()||this._furnHasUnsavedChanges()?(this._veToolSwitchTarget=null,this._alignCancelConfirm=!0):this._closeAlign()}_alignConfirmDiscard(){const e=this._veToolSwitchTarget;if(e){if("seat"===this._veTool&&this._alignSession){const e=this._alignSession;this._alignSession={...e,draft:{...e.start},appearanceDraft:{...e.appearanceStart},history:[],future:[]}}else"rooms"===this._veTool?this._roomsSession=null:"floorplan"===this._veTool?(this._floorplanSession=null,this._resetFloorplanSubmodes()):"furniture"===this._veTool&&(this._furnSession=null,this._furnGesture=null);this._veTool=e,this._saveVeTool(e),this._veToolSwitchTarget=null,this._alignCancelConfirm=!1,"rooms"!==e||this._roomsSession||this._openRooms(),"floorplan"!==e||this._floorplanSession||this._openFloorplan(),"furniture"!==e||this._furnSession||this._openFurniture()}else this._closeAlign()}_alignDismissCancelConfirm(){this._alignCancelConfirm=!1,this._veToolSwitchTarget=null}_alignReset(){const e=this._alignSession;e&&!this._alignReadOnly()&&(this._alignSession={...e,draft:{...e.start},history:[...e.history,e.draft],future:[],appearanceDraft:{...e.appearanceStart}})}async _alignCopyYaml(){const e=this._alignSession;if(!e)return;const o=function seatToYaml(e,o){const r2=e=>Math.round(100*e)/100,s=["map:",'  seat: "manual"',`  rotation: ${r2(e.rotation)}`,`  scale: ${r2(e.scale)}`];if(null!=e.scaleY&&s.push(`  scale_y: ${r2(e.scaleY)}`),s.push(`  offset_x: ${r2(e.offset_x)}`,`  offset_y: ${r2(e.offset_y)}`),o){const yamlVal=e=>void 0===e?null:null===e?"null":"string"==typeof e?`"${e}"`:String(e),e=["hide_map","overlay_opacity","overlay_blend","path_color","path_width","mop_path_color","mop_band_opacity","mop_band_width","robot_image_on_map","robot_size","robot_image_rotation"].map(e=>[e,yamlVal(o[e])]).filter(([,e])=>null!==e).map(([e,o])=>`  ${e}: ${o}`);e.length&&s.push("","appearance:",...e)}return s.join("\n")}(e.draft,e.appearanceDraft);try{await navigator.clipboard.writeText(o),this._alignCopiedFlash=!0,setTimeout(()=>{this._alignCopiedFlash=!1},1500)}catch(e){console.warn("[anyvac-card] Align: clipboard write failed",e)}}_alignServiceAvailable(){return!!this.hass.services?.anyvac?.set_floorplan_seat}async _alignSave(){const e=this._alignSession,o=this._alignVac();if(!e||!o||!this._alignServiceAvailable()||this._alignReadOnly())return;const s=e.draft,l={rotation:Math.round(100*s.rotation)/100,scale:Math.round(100*s.scale)/100,offset_x:Math.round(100*s.offset_x)/100,offset_y:Math.round(100*s.offset_y)/100};null!=s.scaleY&&(l.scale_y=Math.round(100*s.scaleY)/100);const h={...e.appearanceDraft};try{await this.hass.callService("anyvac","set_floorplan_seat",{floorplan:e.floorplanKey,vacuum:o.entity,map:l,appearance:h}),this._closeAlign()}catch(e){console.warn("[anyvac-card] Align: set_floorplan_seat call failed",e)}}_alignSetField(e,o){const s=this._alignSession;if(!s||this._alignReadOnly())return;const l=parseFloat(o);if(!Number.isFinite(l))return;const h=s.draft;if(h[e]===l)return;const d={...h,[e]:l};this._alignSession={...s,draft:d,history:[...s.history,h],future:[]}}_alignToggleScaleY(e){const o=this._alignSession;if(!o||this._alignReadOnly())return;const s=o.draft,l={...s};e?null==l.scaleY&&(l.scaleY=l.scale):delete l.scaleY,this._alignSession={...o,draft:l,history:[...o.history,s],future:[]}}_alignSetLayerOpacity(e,o){const s=this._alignSession;if(!s)return;const l=parseFloat(o);if(!Number.isFinite(l))return;const h=Math.min(1,Math.max(0,l/100));s.layers[e]!==h&&(this._alignSession={...s,layers:{...s.layers,[e]:h}})}_alignSceneSize(){const e=this._mapAR>.1?this._mapAR:3.636,o=Math.max(100,window.innerWidth-32),s=Math.max(100,window.innerHeight-140);let l=o,h=l/e;return h>s&&(h=s,l=h*e),{w:l,h:h}}_alignViewTransformCss(){const e=this._alignView;return`translate(${e.panX}px,${e.panY}px) scale(${e.zoom}) rotate(${e.rot}deg)`}_alignRotateView(){this._alignView={...this._alignView,rot:(this._alignView.rot+90)%360}}_alignPointToWrapPct(e,o){const s=this._alignHost?.shadowRoot?.querySelector(".align-scene");if(!s)return null;const l=s.getBoundingClientRect(),h=(l.left+l.right)/2,d=(l.top+l.bottom)/2,p=getComputedStyle(s).transform,u=new DOMMatrix("none"===p?void 0:p),m=u.a*u.d-u.b*u.c;if(Math.abs(m)<1e-9)return null;const _=e-h,f=o-d,v=(u.d*_-u.c*f)/m,b=(-u.b*_+u.a*f)/m;return{x:100*(v/(s.offsetWidth||1)+.5),y:100*(b/(s.offsetHeight||1)+.5)}}_alignCornerPct(e,o,s,l,h,d=1){const p=d>0&&Number.isFinite(d)?d:1,u=function seatToMatrix(e,o,s,l,h){const d=(50+e.offset_x)/100*o,p=(50+e.offset_y)/100*s,u=e.scale/100*(o/l),m=(e.scaleY??e.scale)/100*(o/l);return(new DOMMatrix).translate(d,p).rotate(e.rotation).scale(u,m).translate(-l/2,-h/2)}(e,l,h,1,p),m=u.transformPoint({x:o,y:s*p});return{x:m.x/l*100,y:m.y/h*100}}_alignMapAspect(e){const o=this._alignMapNat;if(o&&o.w>0&&o.h>0)return o.h/o.w;const s=mapPxDims(this._intAttrs(e)?.image_dims);return s?s.NH/s.NW:1}_alignContentBox(e){const o=this._intAttrs(e),s=mapPxDims(o?.image_dims);return s&&function contentBoxFrac(e,o,s){if(!(e?.length&&o>0&&s>0))return null;let l=1/0,h=1/0,d=-1/0,p=-1/0;for(const o of e){const e=o?.bbox_px;e&&null!=e.x0&&null!=e.y0&&null!=e.x1&&null!=e.y1&&(l=Math.min(l,e.x0,e.x1),d=Math.max(d,e.x0,e.x1),h=Math.min(h,e.y0,e.y1),p=Math.max(p,e.y0,e.y1))}if(!Number.isFinite(l)||d-l<1e-6||p-h<1e-6)return null;const c=e=>Math.min(1,Math.max(0,e)),u={x0:c(l/o),y0:c(h/s),x1:c(d/o),y1:c(p/s)};return u.x1-u.x0>1e-6&&u.y1-u.y0>1e-6?u:null}(o?.rooms,s.NW,s.NH)||{x0:0,y0:0,x1:1,y1:1}}_onAlignMapLoad(e){const o=e.currentTarget;o.naturalWidth&&o.naturalHeight&&(this._alignMapNat?.w===o.naturalWidth&&this._alignMapNat?.h===o.naturalHeight||(this._alignMapNat={w:o.naturalWidth,h:o.naturalHeight}))}_alignResizeCursor(e,o){const s=((e+o)%180+180)%180;return s<22.5||s>=157.5?"ew-resize":s<67.5?"nwse-resize":s<112.5?"ns-resize":"nesw-resize"}_alignFieldArrow(e,o){return Dt`<ha-icon class="align-field-arrow" icon=${e?"mdi:arrow-left-right":"mdi:arrow-up-down"}
      style=${Xt({transform:"rotate("+o+"deg)"})}></ha-icon>`}_alignIsoDist(e,o,s){return Math.hypot(e.x-o.x,(e.y-o.y)/s)}_alignIsoAngleDeg(e,o,s){return 180*Math.atan2((o.y-e.y)/s,o.x-e.x)/Math.PI}_alignStartGesture(e,o,s,l){const h=this._alignSession;if(!h||this._alignReadOnly())return;this._alignRefocusOverlay(),e.currentTarget.setPointerCapture(e.pointerId),e.stopPropagation(),e.preventDefault();const d=this._alignPointToWrapPct(e.clientX,e.clientY);if(!d)return;const p=this._alignGesture;if(p&&1===p.startPos.size&&!p.startPos.has(e.pointerId)){const[[o,s]]=p.startPos;return void(this._alignGesture={kind:"pinch",startSeat:{...h.draft},startPos:new Map([[o,p.livePos.get(o)??s],[e.pointerId,d]]),livePos:new Map([[o,p.livePos.get(o)??s],[e.pointerId,d]])})}this._alignPushHistory(h.draft),this._alignGesture={kind:o,startSeat:{...h.draft},pivotPct:s,altPivotPct:l,startPos:new Map([[e.pointerId,d]]),livePos:new Map([[e.pointerId,d]])}}_alignGestureMove(e){const o=this._alignSession,s=this._alignGesture;if(!o||!s||!s.startPos.has(e.pointerId))return;const l=this._alignPointToWrapPct(e.clientX,e.clientY);if(!l)return;s.livePos.set(e.pointerId,l);const h=this._mapAR>.1?this._mapAR:3.636;let d=null;if("drag"===s.kind){const o=e.pointerId,l=s.startPos.get(o),h=s.livePos.get(o);d=translateSeat(s.startSeat,h.x-l.x,h.y-l.y)}else if("scale"===s.kind&&s.pivotPct){const o=e.pointerId,l=s.startPos.get(o),p=s.livePos.get(o);if(null!=s.startSeat.scaleY)d=function scaleSeatCornerAniso(e,o,s,l,h){const d=pctToFrac(l,h),p=pctToFrac(o,h),u=pctToFrac(s,h),m=rotatePoint({x:p.x-d.x,y:p.y-d.y},-e.rotation),_=rotatePoint({x:u.x-d.x,y:u.y-d.y},-e.rotation),f=Math.abs(m.x)>1e-6?_.x/m.x:1,v=Math.abs(m.y)>1e-6?_.y/m.y:1,b=seatCentreFrac(e,h),w=rotatePoint({x:b.x-d.x,y:b.y-d.y},-e.rotation),$=rotatePoint({x:w.x*f,y:w.y*v},e.rotation),C=frameToOffset({x:d.x+$.x,y:d.y+$.y},h),A=e.scaleY??e.scale;return{...e,scale:e.scale*f,scaleY:A*v,offset_x:C.offset_x,offset_y:C.offset_y}}(s.startSeat,l,p,s.pivotPct,h);else{const e=this._alignIsoDist(l,s.pivotPct,h),o=this._alignIsoDist(p,s.pivotPct,h);e>1e-6&&(d=scaleSeatAbout(s.startSeat,o/e,s.pivotPct,h))}}else if("stretchX"===s.kind||"stretchY"===s.kind){const o=e.pointerId,l=s.startPos.get(o),p=s.livePos.get(o),u="stretchX"===s.kind?"x":"y",m=e.altKey?s.altPivotPct:s.pivotPct;if(m)d=function stretchSeatAxisAbout(e,o,s,l,h,d){const p=pctToFrac(h,d),u=pctToFrac(s,d),m=pctToFrac(l,d),_=rotatePoint({x:u.x-p.x,y:u.y-p.y},-e.rotation),f=rotatePoint({x:m.x-p.x,y:m.y-p.y},-e.rotation),v="x"===o?_.x:_.y,b="x"===o?f.x:f.y,w=Math.abs(v)>1e-6?b/v:1,$=seatCentreFrac(e,d),C=rotatePoint({x:$.x-p.x,y:$.y-p.y},-e.rotation),A=rotatePoint("x"===o?{x:C.x*w,y:C.y}:{x:C.x,y:C.y*w},e.rotation),F=frameToOffset({x:p.x+A.x,y:p.y+A.y},d);return{..."x"===o?stretchSeatX(e,w):stretchSeatY(e,w),offset_x:F.offset_x,offset_y:F.offset_y}}(s.startSeat,u,l,p,m,h);else{const e=function localAxisScaleRatio(e,o,s,l,h){const d=seatCentreFrac(e,h),p=pctToFrac(s,h),u=pctToFrac(l,h),m=rotatePoint({x:p.x-d.x,y:p.y-d.y},-e.rotation),_=rotatePoint({x:u.x-d.x,y:u.y-d.y},-e.rotation),f="x"===o?m.x:m.y,v="x"===o?_.x:_.y;return Math.abs(f)>1e-6?v/f:1}(s.startSeat,u,l,p,h);d="x"===u?stretchSeatX(s.startSeat,e):stretchSeatY(s.startSeat,e)}}else if("rotate"===s.kind&&s.pivotPct){const o=e.pointerId,l=s.startPos.get(o),p=s.livePos.get(o),u=this._alignIsoAngleDeg(s.pivotPct,l,h),m=this._alignIsoAngleDeg(s.pivotPct,p,h);d=rotateSeatAbout(s.startSeat,m-u,s.pivotPct,h)}else if("pinch"===s.kind&&2===s.startPos.size){const e=[...s.startPos.keys()],o=s.startPos.get(e[0]),l=s.startPos.get(e[1]),p=s.livePos.get(e[0]),u=s.livePos.get(e[1]);d=pinchSeat(s.startSeat,o,l,p,u,h)}d&&(this._alignSession={...o,draft:d})}_alignGestureEnd(e){const o=this._alignGesture;if(o)if(o.startPos.delete(e.pointerId),o.livePos.delete(e.pointerId),0===o.startPos.size)this._alignGesture=null;else if("pinch"===o.kind&&1===o.startPos.size){const[[e,s]]=o.startPos,l=this._alignSession;this._alignGesture={kind:"drag",startSeat:l?{...l.draft}:o.startSeat,startPos:new Map([[e,s]]),livePos:new Map([[e,s]])}}}_alignPushHistory(e){const o=this._alignSession;o&&(this._alignSession={...o,history:[...o.history,e],future:[]})}_alignUndo(){const e=this._alignSession;if(!e||!e.history.length)return;const o=e.history[e.history.length-1];this._alignSession={...e,draft:o,history:e.history.slice(0,-1),future:[e.draft,...e.future]}}_alignRedo(){const e=this._alignSession;if(!e||!e.future.length)return;const o=e.future[0];this._alignSession={...e,draft:o,history:[...e.history,e.draft],future:e.future.slice(1)}}_alignSetNudgeTier(e){const o=this._alignSession;o&&(this._alignSession={...o,nudgeTier:e})}_veToolHasUnsavedChanges(e){return"seat"===e?this._alignHasChanges():"rooms"===e?this._roomsHasUnsavedChanges():"floorplan"===e?this._floorplanHasChanges():"furniture"===e&&this._furnHasUnsavedChanges()}_setVeTool(e){if(this._veTool!==e){if(this._veToolHasUnsavedChanges(this._veTool))return this._veToolSwitchTarget=e,void(this._alignCancelConfirm=!0);this._veTool=e,this._saveVeTool(e),"rooms"!==e||this._roomsSession||this._openRooms(),"floorplan"!==e||this._floorplanSession||this._openFloorplan(),"furniture"!==e||this._furnSession||this._openFurniture()}}_alignEffectiveNudgeTier(e){return e.ctrlKey||e.metaKey?"fine":e.shiftKey?"jump":this._alignSession?.nudgeTier??"normal"}_alignKeyDown(e){if("floorplan"===this._veTool)return void this._floorplanKeyDown(e);if("furniture"===this._veTool)return void this._furnKeyDown(e);const o=this._alignSession;if(!o)return;const s=e.target,l=!!s&&("INPUT"===s.tagName||"TEXTAREA"===s.tagName);if("Escape"===e.key)return e.preventDefault(),void this._alignCancel();const h=e.ctrlKey||e.metaKey;if(h&&!e.shiftKey&&!e.altKey&&("z"===e.key||"Z"===e.key)){if(l)return;return e.preventDefault(),void this._alignUndo()}if(h&&!e.shiftKey&&!e.altKey&&("y"===e.key||"Y"===e.key)){if(l)return;return e.preventDefault(),void this._alignRedo()}if(l&&e.key.startsWith("Arrow"))return;if(this._alignReadOnly())return;const d=nudgeTierMultiplier(this._alignEffectiveNudgeTier(e)),p=this._mapAR>.1?this._mapAR:3.636,u=o.draft;let m=null;switch(e.key){case"ArrowUp":m=nudgeOffset(u,0,-.1*d,this._alignView.rot,p);break;case"ArrowDown":m=nudgeOffset(u,0,.1*d,this._alignView.rot,p);break;case"ArrowLeft":m=nudgeOffset(u,-.1*d,0,this._alignView.rot,p);break;case"ArrowRight":m=nudgeOffset(u,.1*d,0,this._alignView.rot,p);break;case"[":m=nudgeRotation(u,-.5*d);break;case"]":m=nudgeRotation(u,.5*d);break;case",":m=nudgeScale(u,-.5*d);break;case".":m=nudgeScale(u,.5*d);break;default:return}e.preventDefault();const _=e.repeat?o.history:[...o.history,u];this._alignSession={...o,draft:m,history:_,future:[]}}_floorplanKeyDown(e){if("Escape"===e.key)return e.preventDefault(),void this._alignCancel();if("calib"===this._floorplanMode||"home"===this._floorplanMode)return;const o=this._floorplanSession;if(!o)return;const s=e.target,l=!!s&&("INPUT"===s.tagName||"TEXTAREA"===s.tagName),h=e.ctrlKey||e.metaKey;if(h&&!e.shiftKey&&!e.altKey&&("z"===e.key||"Z"===e.key)){if(l)return;return e.preventDefault(),void this._floorGeoUndo()}if(h&&!e.shiftKey&&!e.altKey&&("y"===e.key||"Y"===e.key)){if(l)return;return e.preventDefault(),void this._floorGeoRedo()}if(l&&e.key.startsWith("Arrow"))return;const d=nudgeTierMultiplier(this._alignEffectiveNudgeTier(e)),p=this._mapAR>.1?this._mapAR:3.636,u=o.draft;let m=null;switch(e.key){case"ArrowUp":m=nudgeOffset(u,0,-.1*d,this._alignView.rot,p);break;case"ArrowDown":m=nudgeOffset(u,0,.1*d,this._alignView.rot,p);break;case"ArrowLeft":m=nudgeOffset(u,-.1*d,0,this._alignView.rot,p);break;case"ArrowRight":m=nudgeOffset(u,.1*d,0,this._alignView.rot,p);break;case"[":m=nudgeRotation(u,-.5*d);break;case"]":m=nudgeRotation(u,.5*d);break;case",":m=nudgeScale(u,-.5*d);break;case".":m=nudgeScale(u,.5*d);break;default:return}e.preventDefault();const _=e.repeat?o.history:[...o.history,u];this._floorplanSession={...o,draft:m,history:_,future:[]}}_alignBgPointerDown(e){this._alignGesture||(this._alignRefocusOverlay(),e.currentTarget.setPointerCapture(e.pointerId),this._alignViewDrag={pointerId:e.pointerId,x0:e.clientX,y0:e.clientY,panX0:this._alignView.panX,panY0:this._alignView.panY})}_alignBgPointerMove(e){const o=this._alignViewDrag;o&&o.pointerId===e.pointerId&&(this._alignView={...this._alignView,panX:o.panX0+(e.clientX-o.x0),panY:o.panY0+(e.clientY-o.y0)})}_alignBgPointerUp(e){this._alignViewDrag?.pointerId===e.pointerId&&(this._alignViewDrag=null)}_alignWheel(e){e.preventDefault();const o=this._alignView.zoom,s=Math.exp(.001*-e.deltaY),l=Math.min(8,Math.max(.25,o*s)),h=this._alignHost?.shadowRoot?.querySelector(".align-scene");if(!h||l===o)return void(this._alignView={...this._alignView,zoom:l});const d=h.getBoundingClientRect(),p=(d.left+d.right)/2,u=(d.top+d.bottom)/2,m=l/o,_=this._alignView.panX+(e.clientX-p)*(1-m),f=this._alignView.panY+(e.clientY-u)*(1-m);this._alignView={...this._alignView,zoom:l,panX:_,panY:f}}_openRooms(){const e=this._alignSession,o=this._alignVac();if(!e||!o)return;const s="merged"===this._config.map_mode,l=resolveStaticRooms(this._rawConfig??this._config,o),h=new Set(l.filter(e=>e.key).map(e=>e.key)),d={};for(const e of this._roomsFor(o))null!=e.map_x&&null!=e.map_y&&null!=e.map_w&&null!=e.map_h&&(d[e.key]={x:e.map_x,y:e.map_y,w:e.map_w,h:e.map_h,areaId:e.area_id??null,isNew:!h.has(e.key)});const p=function effectiveRoomStyle(e){return{border_normal:e.room_border_normal??2,border_selected:e.room_border_selected??4}}(this._config);this._roomsSession={floorplan:e.floorplan,floorplanKey:e.floorplanKey,vacuum:s?void 0:o.entity,rooms:d,start:{...d},selected:null,history:[],future:[],styleStart:{...p},styleDraft:{...p},drawingNew:!1},this._roomsGesture=null,this._roomsDrawGesture=null,this._roomsDeleteConfirm=null}_roomsHasUnsavedChanges(){const e=this._roomsSession;return!!e&&(JSON.stringify(e.rooms)!==JSON.stringify(e.start)||JSON.stringify(e.styleDraft)!==JSON.stringify(e.styleStart))}_roomsSelect(e){const o=this._roomsSession;o&&(this._roomsSession={...o,selected:e})}_roomsPushHistory(e){const o=this._roomsSession;o&&(this._roomsSession={...o,history:[...o.history,e],future:[]})}_roomsUndo(){const e=this._roomsSession;if(!e||!e.history.length)return;const o=e.history[e.history.length-1];this._roomsSession={...e,rooms:o,history:e.history.slice(0,-1),future:[e.rooms,...e.future]}}_roomsRedo(){const e=this._roomsSession;if(!e||!e.future.length)return;const o=e.future[0];this._roomsSession={...e,rooms:o,history:[...e.history,e.rooms],future:e.future.slice(1)}}_roomsReset(){const e=this._roomsSession;e&&(this._roomsSession={...e,rooms:{...e.start},history:[...e.history,e.rooms],future:[],styleDraft:{...e.styleStart}})}_roomsSetAreaId(e,o){const s=this._roomsSession,l=s?.rooms[e];if(!s||!l)return;const h=""===o?null:o;l.areaId!==h&&(this._roomsSession={...s,rooms:{...s.rooms,[e]:{...l,areaId:h}},history:[...s.history,s.rooms],future:[]})}_roomsSetGeom(e,o,s){const l=this._roomsSession,h=l?.rooms[e],d=parseFloat(s);if(!l||!h||!Number.isFinite(d))return;const p="w"===o||"h"===o?Math.min(100,Math.max(1,d)):Math.min(100,Math.max(0,d));h[o]!==p&&(this._roomsSession={...l,rooms:{...l.rooms,[e]:{...h,[o]:p}},history:[...l.history,l.rooms],future:[]})}_roomDisplayName(e){const o=[...this._config.rooms??[],...this._config.vacuums.flatMap(e=>e.rooms??[])];return o.find(o=>o.key===e)?.name||e}_roomsSetStyle(e,o){const s=this._roomsSession;if(!s)return;const l=parseFloat(o);!Number.isFinite(l)||l<0||l>12||s.styleDraft[e]!==l&&(this._roomsSession={...s,styleDraft:{...s.styleDraft,[e]:l}})}_roomsArmDraw(){const e=this._roomsSession;e&&(this._roomsSession={...e,drawingNew:!e.drawingNew},this._roomsDrawGesture=null)}_roomsGenerateKey(e){let o=1;for(;e.rooms["new_room_"+o];)o++;return"new_room_"+o}_roomsStartGesture(e,o,s,l){const h=this._roomsSession,d=h?.rooms[o];if(!h||!d)return;this._alignRefocusOverlay(),e.currentTarget.setPointerCapture(e.pointerId),e.stopPropagation(),e.preventDefault();const p=this._alignPointToWrapPct(e.clientX,e.clientY);p&&(this._roomsPushHistory(h.rooms),this._roomsSession={...this._roomsSession,selected:o},this._roomsGesture={key:o,mode:s,corner:l,orig:{x:d.x,y:d.y,w:d.w,h:d.h},startPt:p})}_roomsGestureMove(e){const o=this._roomsSession,s=this._roomsGesture;if(!o||!s)return;const l=this._alignPointToWrapPct(e.clientX,e.clientY);if(!l)return;const h=l.x-s.startPt.x,d=l.y-s.startPt.y,p=o.rooms[s.key];if(!p)return;let u;if("move"===s.mode){const e=function moveRect(e,o,s){return{map_x:round1(clampPct(e.x+o)),map_y:round1(clampPct(e.y+s))}}(s.orig,h,d);u={x:e.map_x,y:e.map_y}}else{const e=function resizeRect(e,o,s,l){const h=e.w/2,d=e.h/2,{sx:p,sy:u}=ue[o],m=e.x+p*h,_=e.y+u*d,f=e.x-p*h,v=e.y-u*d,b=m+s,w=_+l;return{map_x:round1(clampPct((b+f)/2)),map_y:round1(clampPct((w+v)/2)),map_w:round1(clampSize(Math.abs(b-f))),map_h:round1(clampSize(Math.abs(w-v)))}}(s.orig,s.corner,h,d);u={x:e.map_x,y:e.map_y,w:e.map_w,h:e.map_h}}this._roomsSession={...o,rooms:{...o.rooms,[s.key]:{...p,...u}}}}_roomsGestureEnd(){this._roomsGesture=null}_roomsCanvasPointerDown(e){const o=this._roomsSession;if(!o?.drawingNew)return void this._alignBgPointerDown(e);if(this._roomsGesture)return;const s=this._alignPointToWrapPct(e.clientX,e.clientY);s&&(this._alignRefocusOverlay(),e.currentTarget.setPointerCapture(e.pointerId),e.preventDefault(),this._roomsDrawGesture={startPt:s,curPt:s})}_roomsCanvasPointerMove(e){if(this._roomsDrawGesture){const o=this._alignPointToWrapPct(e.clientX,e.clientY);return void(o&&(this._roomsDrawGesture={...this._roomsDrawGesture,curPt:o}))}this._alignBgPointerMove(e)}_roomsCanvasPointerUp(e){const o=this._roomsDrawGesture,s=this._roomsSession;if(!o||!s)return void this._alignBgPointerUp(e);this._roomsDrawGesture=null;const l=o.startPt,h=o.curPt??o.startPt,d=round1(clampPct((l.x+h.x)/2)),p=round1(clampPct((l.y+h.y)/2)),u=round1(Math.min(100,Math.max(2,Math.abs(h.x-l.x)))),m=round1(Math.min(100,Math.max(2,Math.abs(h.y-l.y)))),_=this._roomsGenerateKey(s),f={x:d,y:p,w:u,h:m,areaId:null,isNew:!0};this._roomsSession={...s,drawingNew:!1,selected:_,rooms:{...s.rooms,[_]:f},history:[...s.history,s.rooms],future:[]}}_roomsRenameKey(e,o){const s=this._roomsSession,l=s?.rooms[e];if(!s||!l||!l.isNew)return;const h=o.trim().toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_+|_+$/g,"");if(!h||h===e||s.rooms[h])return;const d={...s.rooms};delete d[e],d[h]=l,this._roomsSession={...s,rooms:d,selected:h,history:[...s.history,s.rooms],future:[]}}_roomsRequestDelete(e){const o=this._roomsSession?.rooms[e];o?.isNew&&(this._roomsDeleteConfirm=e)}_roomsConfirmDelete(){const e=this._roomsSession,o=this._roomsDeleteConfirm;if(this._roomsDeleteConfirm=null,!e||!o||!e.rooms[o])return;const s={...e.rooms};delete s[o],this._roomsSession={...e,rooms:s,selected:e.selected===o?null:e.selected,history:[...e.history,e.rooms],future:[]}}_roomsDismissDelete(){this._roomsDeleteConfirm=null}async _roomsCopyYaml(){const e=this._roomsSession;if(!e)return;const o=function roomsSessionToYaml(e,o){const r1=e=>Math.round(10*e)/10,s=[],l=Object.keys(e).sort();if(l.length){s.push("rooms:");for(const o of l){const l=e[o];s.push(`  - key: "${o}"`),s.push(`    map_x: ${r1(l.x)}`),s.push(`    map_y: ${r1(l.y)}`),s.push(`    map_w: ${r1(l.w)}`),s.push(`    map_h: ${r1(l.h)}`),null!=l.areaId&&s.push(`    area_id: "${l.areaId}"`)}}return o&&(s.length&&s.push(""),s.push(`room_border_normal: ${o.border_normal}`),s.push(`room_border_selected: ${o.border_selected}`)),s.join("\n")}(e.rooms,e.styleDraft);try{await navigator.clipboard.writeText(o),this._roomsCopiedFlash=!0,setTimeout(()=>{this._roomsCopiedFlash=!1},1500)}catch(e){console.warn("[anyvac-card] Rooms: clipboard write failed",e)}}async _roomsSave(){const e=this._roomsSession;if(!e||!this._alignServiceAvailable())return;const o={};for(const s of Object.keys(e.rooms)){const l=e.rooms[s],h=e.start[s];h&&h.x===l.x&&h.y===l.y&&h.w===l.w&&h.h===l.h&&h.areaId===l.areaId||(o[s]={map_x:l.x,map_y:l.y,map_w:l.w,map_h:l.h,area_id:l.areaId})}for(const s of Object.keys(e.start))s in e.rooms||(o[s]=null);try{if(e.vacuum){const s=this._config.vacuums.find(o=>o.entity===e.vacuum);if(!s)return;const l=this._effectiveSeat(s),h={rotation:Math.round(100*l.rotation)/100,scale:Math.round(100*l.scale)/100,offset_x:Math.round(100*l.offset_x)/100,offset_y:Math.round(100*l.offset_y)/100};null!=l.scaleY&&(h.scale_y=Math.round(100*l.scaleY)/100);const d=effectiveAppearance(s);await this.hass.callService("anyvac","set_floorplan_seat",{floorplan:e.floorplanKey,vacuum:e.vacuum,map:h,appearance:d,rooms:o})}else{const s=this._floorplanSeatsRaw(),l=s?.[e.floorplanKey];await this.hass.callService("anyvac","set_floorplan_seat",{floorplan:e.floorplanKey,rooms:o,image_base:l?.image_base??null,room_style:{...e.styleDraft}})}this._roomsSession={...e,start:{...e.rooms},styleStart:{...e.styleDraft},history:[],future:[]}}catch(e){console.warn("[anyvac-card] Rooms: set_floorplan_seat call failed",e)}}_furnAr(){return this._mapAR>.1?this._mapAR:3.636}_liveFurniture(){const e=this._floorplanCardImageBase()?.furniture;return void 0===e?void 0:normalizeFurniture(e)}_withLiveFurniture(e,o){const{furniture:s,...l}=e;let h=this._liveFurniture();if(void 0===h)return l;if(o){const e=this._floorplanCardImageBase()?.crop_box;h=function remapFurnitureCrop(e,o,s){if(!e.length||!function cropsCompatible(e,o){return!!(e&&o&&(e.frame_id||o.frame_id?e.frame_id&&e.frame_id===o.frame_id:e.entity&&e.entity===o.entity))}(o,s))return e;const l=o,h=s,d=l.x1-l.x0,p=l.y1-l.y0,u=h.x1-h.x0,m=h.y1-h.y0;return d<=0||p<=0||u<=0||m<=0||l.x0===h.x0&&l.y0===h.y0&&l.x1===h.x1&&l.y1===h.y1?e:e.map(e=>({...e,x:round2((l.x0+e.x/100*d-h.x0)/u*100),y:round2((l.y0+e.y/100*p-h.y0)/m*100),w:round2(e.w*d/u),h:round2(e.h*p/m)}))}(h,e,o)}return{...l,furniture:h}}_openFurniture(){if(this._furnSession)return;const e=this._floorplanCardImageBase(),o=this._alignSession?.floorplan,s=this._alignSession?.floorplanKey;if(!e||!o||!s)return;const l=normalizeFurniture(e.furniture);this._furnSession={floorplan:o,floorplanKey:s,items:l,start:l,selected:null,history:[],future:[]},this._furnGesture=null,this._furnSaveError="",null!==this._furnAssets||this._furnAssetsBusy||this._furnLoadAssets(),this._furnLoadScale()}async _furnLoadScale(){this._furnScale=null;const e=this._floorplanCardImageBase();if(!e||!this.hass?.services?.anyvac?.floorplan_scale)return;const o={};if(e.crop_box&&(o.crop_box=e.crop_box),e.home_anchors?.length&&(o.home_anchors=e.home_anchors,o.aspect=this._furnAr(),e.home_anchors_frame_id&&(o.home_anchors_frame_id=e.home_anchors_frame_id)),o.crop_box||o.home_anchors)try{const e=await this.hass.callService("anyvac","floorplan_scale",o,void 0,!1,!0),s=e?.response?.mm_per_unit;this._furnScale="number"==typeof s&&s>0?s:null}catch(e){console.warn("[anyvac-card] Furniture: floorplan_scale failed",e)}}_furnCm(e,o){if(!this._furnScale)return null;const s="w"===o?e.w:e.h/this._furnAr();return Math.round(s*this._furnScale/10)}_furnSetCm(e,o,s){const l=parseFloat(s);if(!this._furnScale||!Number.isFinite(l)||l<=0)return;const h=10*l/this._furnScale,d=this._furnAr();this._furnUpdate(e,e=>({...e,[o]:Math.round(100*("w"===o?h:h*d))/100}))}async _furnUpload(e){if(e){this._furnUploadBusy=!0,this._furnAssetsError="";try{const o=await new Promise((o,s)=>{const l=new FileReader;l.onload=()=>o(String(l.result??"")),l.onerror=()=>s(l.error),l.readAsDataURL(e)}),s=await this.hass.callService("anyvac","upload_asset",{name:e.name,data:o},void 0,!1,!0),l=s?.response;if(!l?.url)throw new Error("no url in response");await this._furnLoadAssets(),await this._furnAdd(l.url,l.width,l.height)}catch(e){this._furnAssetsError="Upload failed — "+(e?.message??"see the log")+".",console.warn("[anyvac-card] Furniture: upload_asset failed",e)}finally{this._furnUploadBusy=!1}}}_furnHasUnsavedChanges(){const e=this._furnSession;return!!e&&JSON.stringify(e.items)!==JSON.stringify(e.start)}_furnCommit(e,o){const s=this._furnSession;s&&(this._furnSession={...s,items:e,history:[...s.history,s.items],future:[],selected:void 0===o?s.selected:o})}_furnUndo(){const e=this._furnSession;if(!e?.history.length)return;const o=e.history[e.history.length-1];this._furnSession={...e,items:o,history:e.history.slice(0,-1),future:[e.items,...e.future],selected:o.some(o=>o.id===e.selected)?e.selected:null}}_furnRedo(){const e=this._furnSession;if(!e?.future.length)return;const o=e.future[0];this._furnSession={...e,items:o,history:[...e.history,e.items],future:e.future.slice(1),selected:o.some(o=>o.id===e.selected)?e.selected:null}}_furnReset(){const e=this._furnSession;e&&JSON.stringify(e.items)!==JSON.stringify(e.start)&&this._furnCommit(e.start,e.start.some(o=>o.id===e.selected)?e.selected:null)}_furnSelect(e){const o=this._furnSession;o&&o.selected!==e&&(this._furnSession={...o,selected:e})}async _furnAdd(e,o,s){if(!this._furnSession||!e)return;if(!o||!s){const l=await new Promise(o=>{const s=new Image;s.onload=()=>o(s.naturalWidth&&s.naturalHeight?{w:s.naturalWidth,h:s.naturalHeight}:null),s.onerror=()=>o(null),s.src=e});o=l?.w??null,s=l?.h??null}const l=this._furnSession;if(!l)return;const h=newFurnitureItem(e,this._furnAr(),l.items,{nw:o,nh:s});this._furnCommit([...l.items,h],h.id)}_furnAddFromUrl(){const e=this._furnUrlDraft.trim();e&&(this._furnUrlDraft="",this._furnAdd(e))}_furnDelete(e){const o=this._furnSession;o&&this._furnCommit(o.items.filter(o=>o.id!==e),o.selected===e?null:o.selected)}_furnDuplicate(e){const o=this._furnSession,s=o?.items.find(o=>o.id===e);if(!o||!s)return;const l=newFurnitureItem(s.src,this._furnAr(),o.items,{}),h={...s,id:l.id,x:Math.round(100*(s.x+3))/100,y:Math.round(100*(s.y+3))/100};this._furnCommit([...o.items,h],h.id)}_furnReorder(e,o){const s=this._furnSession;if(!s)return;const l=s.items.findIndex(o=>o.id===e),h=l+o;if(l<0||h<0||h>=s.items.length)return;const d=[...s.items];[d[l],d[h]]=[d[h],d[l]],this._furnCommit(d)}_furnUpdate(e,o){const s=this._furnSession;if(!s)return;const l=s.items.map(s=>s.id===e?o(s):s);JSON.stringify(l)!==JSON.stringify(s.items)&&this._furnCommit(l)}_furnSetField(e,o,s){const l=parseFloat(s);Number.isFinite(l)&&this._furnUpdate(e,e=>{const s={...e};if("w"===o||"h"===o)s[o]=Math.max(.1,Math.round(100*l)/100);else if("opacity"===o){const e=Math.min(100,Math.max(0,l))/100;e>=1?delete s.opacity:s.opacity=Math.round(100*e)/100}else if("rot"===o){const e=Math.round(100*((l%360+540)%360-180))/100;e?s.rot=e:delete s.rot}else s[o]=Math.round(100*l)/100;return s})}_furnToggleFlip(e){this._furnUpdate(e,e=>{const o={...e};return e.flip?delete o.flip:o.flip=!0,o})}_furnClientToUnit(e,o){const s=this._alignHost?.shadowRoot?.querySelector(".furn-svg"),l=s?.getScreenCTM();if(!s||!l)return null;const h=new DOMPoint(e,o).matrixTransform(l.inverse());return[h.x,h.y]}_furnStartGesture(e,o,s,l){const h=this._furnSession,d=h?.items.find(e=>e.id===o);if(!h||!d||e.button>0)return;e.stopPropagation(),e.preventDefault(),this._alignRefocusOverlay();const p=this._furnClientToUnit(e.clientX,e.clientY);if(!p)return;const u=e.currentTarget.closest(".furn-item")??e.currentTarget;try{u.setPointerCapture(e.pointerId)}catch{}const m=toUnit(d,this._furnAr());this._furnSession={...h,selected:o,history:[...h.history,h.items],future:[]},this._furnGesture={pointerId:e.pointerId,kind:s,id:o,corner:l,startBox:m,startPt:p,moved:!1}}_furnGestureMove(e){const o=this._furnGesture,s=this._furnSession;if(!o||!s||o.pointerId!==e.pointerId)return;const l=this._furnClientToUnit(e.clientX,e.clientY);if(!l)return;let h;h="move"===o.kind?moveBox(o.startBox,l[0]-o.startPt[0],l[1]-o.startPt[1]):"resize"===o.kind&&o.corner?resizeBoxCorner(o.startBox,o.corner,l,!e.shiftKey):function rotateBoxTo(e,o,s){let l=180*Math.atan2(o[1]-e.cy,o[0]-e.cx)/Math.PI+90;return s&&(l=15*Math.round(l/15)),{...e,rot:normDeg(l)}}(o.startBox,l,!e.altKey);const d=this._furnAr();o.moved=!0,this._furnSession={...s,items:s.items.map(e=>e.id===o.id?fromUnit(e,h,d):e)}}_furnGestureEnd(e){const o=this._furnGesture;if(!o||o.pointerId!==e.pointerId)return;this._furnGesture=null;const s=this._furnSession;s&&!o.moved&&(this._furnSession={...s,history:s.history.slice(0,-1)})}_furnCanvasPointerDown(e){this._furnSelect(null),this._alignBgPointerDown(e)}_furnKeyDown(e){const o=this._furnSession,s=e.target,l=!!s&&("INPUT"===s.tagName||"TEXTAREA"===s.tagName||"SELECT"===s.tagName);if("Escape"===e.key)return e.preventDefault(),void this._alignCancel();if(!o||l)return;const h=e.ctrlKey||e.metaKey;if(h&&!e.shiftKey&&("z"===e.key||"Z"===e.key))return e.preventDefault(),void this._furnUndo();if(h&&("y"===e.key||"Y"===e.key||e.shiftKey&&("z"===e.key||"Z"===e.key)))return e.preventDefault(),void this._furnRedo();const d=o.selected;if(!d)return;if("Delete"===e.key||"Backspace"===e.key)return e.preventDefault(),void this._furnDelete(d);const p=.5*nudgeTierMultiplier(this._alignEffectiveNudgeTier(e)),u=this._furnAr();let m=0,_=0,f=0;if("ArrowLeft"===e.key)m=-p;else if("ArrowRight"===e.key)m=p;else if("ArrowUp"===e.key)_=-p;else if("ArrowDown"===e.key)_=p;else if("["===e.key)f=-Math.max(1,2*p);else{if("]"!==e.key)return;f=Math.max(1,2*p)}e.preventDefault(),this._furnUpdate(d,e=>{const o=toUnit(e,u);return fromUnit(e,{...moveBox(o,m,_),rot:o.rot+f},u)})}async _furnLoadAssets(){if(!this.hass?.services?.anyvac?.list_assets)return this._furnAssets=null,void(this._furnAssetsError="Update the AnyVac integration to 1.55.0 to list your files — or paste a /local/ URL below.");this._furnAssetsBusy=!0,this._furnAssetsError="";try{const e=await this.hass.callService("anyvac","list_assets",{kind:"furniture"},void 0,!1,!0);this._furnAssets=e?.response?.assets??[]}catch(e){this._furnAssets=null,this._furnAssetsError="Couldn't list the furniture folder (administrators only) — you can still paste a /local/ URL below.",console.warn("[anyvac-card] Furniture: list_assets failed",e)}finally{this._furnAssetsBusy=!1}}async _furnSave(){const e=this._furnSession,o=this._floorplanCardImageBase();if(!e||!o||!this._alignServiceAvailable())return;const s=this._floorplanSeatsRaw()?.[e.floorplanKey],l={...o,src:e.floorplan,furniture:e.items.map(e=>({...e}))},h={floorplan:e.floorplanKey,image_base:l};s?.room_style&&(h.room_style=s.room_style),this._furnSaveError="";try{await this.hass.callService("anyvac","set_floorplan_seat",h),this._furnSession={...e,start:e.items,history:[],future:[]}}catch(e){this._furnSaveError="Save failed — your changes are still here, try again.",console.warn("[anyvac-card] Furniture: set_floorplan_seat call failed",e)}}async _furnCopyYaml(){const e=this._furnSession;if(e)try{await navigator.clipboard.writeText(function furnitureToYaml(e){if(!e.length)return"image_base:\n  furniture: []";const o=["image_base:","  furniture:"];for(const s of e)o.push(`    - id: ${s.id}`),o.push(`      src: ${s.src}`),o.push(`      x: ${s.x}`,`      y: ${s.y}`,`      w: ${s.w}`,`      h: ${s.h}`),s.rot&&o.push(`      rot: ${s.rot}`),void 0!==s.opacity&&s.opacity<1&&o.push(`      opacity: ${s.opacity}`),s.flip&&o.push("      flip: true");return o.join("\n")}(e.items)),this._furnCopiedFlash=!0,setTimeout(()=>{this._furnCopiedFlash=!1},1200)}catch(e){console.warn("[anyvac-card] Furniture: clipboard write failed",e)}}_renderFurnitureTool(e,o){const s=this._furnSession,l=this._floorplanCardImageBase();if(!s||!l)return this._renderVePlaceholder("merged"!==this._config.map_mode?"Furniture is only available for a shared (merged-mode) floorplan.":"No card-level floorplan image to place furniture on — set one from the Config editor's Global tab → Floorplan section first.");const{w:h,h:d}=this._alignSceneSize(),p=this._furnAr(),u=7/Math.max(.01,h/100*(this._alignView.zoom||1)),m=s.items.find(e=>e.id===s.selected)??null,_=this._roomsFor(o).filter(e=>null!=e.map_x&&null!=e.map_y&&null!=e.map_w&&null!=e.map_h),f=this._furnAssets;return Dt`
        <div class="align-body">
          <div class="align-canvas"
            @wheel=${e=>this._alignWheel(e)}
            @pointerdown=${e=>this._furnCanvasPointerDown(e)}
            @pointermove=${e=>this._alignBgPointerMove(e)}
            @pointerup=${e=>this._alignBgPointerUp(e)}
            @pointercancel=${e=>this._alignBgPointerUp(e)}>
            <div class="align-scene" style=${Xt({width:h+"px",height:d+"px",transform:this._alignViewTransformCss()})}>
              <img class="align-floorplan-img" src=${l.src} alt="Floorplan"
                @load=${this._onFloorplanLoad}
                style=${Xt({transform:this._floorplanImgTransform(l)})} />
              ${this._furnShowReach?this._config.vacuums.map(e=>this._renderReachImg(e,this._effectiveSeat(e),h,d,"furn-reach-img")):It}
              ${_.map(e=>Dt`
                <div class="rooms-rect furn-room-ref" style=${Xt({left:e.map_x+"%",top:e.map_y+"%",width:e.map_w+"%",height:e.map_h+"%"})}><span class="rooms-rect-label">${e.name??e.key}</span></div>`)}
              <div class="furniture-layer furniture-layer--edit" style=${Xt({transform:this._floorplanImgTransform(l)})}>
                <svg class="furn-svg" viewBox="0 0 100 ${100/p}" preserveAspectRatio="xMidYMid meet">
                  ${s.items.map(e=>{const o=toUnit(e,p),l=e.id===s.selected,h=Nt`
                      <rect class="furn-hit" x=${-o.w/2} y=${-o.h/2} width=${o.w} height=${o.h}
                        @pointerdown=${o=>this._furnStartGesture(o,e.id,"move")}></rect>
                      ${l?Nt`
                        <rect class="furn-outline" x=${-o.w/2} y=${-o.h/2} width=${o.w} height=${o.h}></rect>
                        <line class="furn-rot-line" x1="0" y1=${-o.h/2} x2="0" y2=${-o.h/2-4*u}></line>
                        <circle class="furn-handle furn-handle--rot" cx="0" cy=${-o.h/2-4*u} r=${u}
                          @pointerdown=${o=>this._furnStartGesture(o,e.id,"rotate")}></circle>
                        ${["nw","ne","sw","se"].map(s=>{const[l,h]=cornerSign(s);return Nt`<circle class="furn-handle furn-handle--${s}" cx=${l*o.w/2} cy=${h*o.h/2} r=${u}
                            @pointerdown=${o=>this._furnStartGesture(o,e.id,"resize",s)}></circle>`})}
                      `:It}`;return Nt`<g class="furn-edit-item ${l?"furn-edit-item--sel":""}"
                      @pointermove=${e=>this._furnGestureMove(e)}
                      @pointerup=${e=>this._furnGestureEnd(e)}
                      @pointercancel=${e=>this._furnGestureEnd(e)}>
                      ${this._furnitureImage(e,o,h)}
                    </g>`})}
                </svg>
              </div>
            </div>
          </div>
          <div class="align-side-panel">
            <div class="section-title">Add furniture</div>
            <div class="rooms-side-note">Put .webp/.png files into <code>config/www/anyvac/furniture/</code>, then pick one here.</div>
            ${this._furnAssetsBusy?Dt`<div class="rooms-side-note">Loading…</div>`:It}
            ${this._furnAssetsError?Dt`<div class="rooms-side-note">${this._furnAssetsError}</div>`:It}
            ${f&&!f.length?Dt`<div class="rooms-side-note">The folder is empty.</div>`:It}
            ${f?.length?Dt`
              <div class="furn-assets">
                ${f.map(e=>Dt`
                  <button class="furn-asset" title=${"Add "+e.name}
                    @click=${()=>this._furnAdd(e.url,e.width,e.height)}>
                    <img src=${e.url} alt="" loading="lazy" /><span>${e.name}</span>
                  </button>`)}
              </div>`:It}
            ${this.hass?.services?.anyvac?.upload_asset?Dt`
              <label class="align-btn furn-upload" title="Upload an image into config/www/anyvac/furniture/ and add it">
                <ha-icon icon=${this._furnUploadBusy?"mdi:loading":"mdi:upload"}></ha-icon>
                <span>${this._furnUploadBusy?"Uploading…":"Upload image…"}</span>
                <input type="file" class="furn-file-input" accept=".webp,.png,.svg,.jpg,.jpeg,image/webp,image/png,image/svg+xml,image/jpeg"
                  ?disabled=${this._furnUploadBusy}
                  @change=${e=>{const o=e.target;this._furnUpload(o.files?.[0]),o.value=""}} />
              </label>`:It}
            <div class="furn-url-row">
              <input type="text" class="align-color-text" placeholder="/local/anyvac/furniture/sofa.webp"
                .value=${this._furnUrlDraft}
                @input=${e=>{this._furnUrlDraft=e.target.value}}
                @keydown=${e=>{"Enter"===e.key&&(e.preventDefault(),this._furnAddFromUrl())}} />
              <button class="align-btn" title="Add from URL" ?disabled=${!this._furnUrlDraft.trim()}
                @click=${()=>this._furnAddFromUrl()}><ha-icon icon="mdi:plus"></ha-icon></button>
              <button class="align-btn" title="Reload the file list" ?disabled=${this._furnAssetsBusy}
                @click=${()=>this._furnLoadAssets()}><ha-icon icon="mdi:refresh"></ha-icon></button>
            </div>
            ${this._config.vacuums.some(e=>this._hasReach(e))?Dt`
              <label class="furn-check" title="Where the vacuums' bodies have been in their last complete clean of each room — the holes are furniture">
                <input type="checkbox" .checked=${this._furnShowReach}
                  @change=${e=>{this._furnShowReach=e.target.checked}} /> Show reach
              </label>`:It}
            <div class="align-side-panel-divider"></div>
            ${m?Dt`
              <div class="section-title">${m.id}</div>
              <div class="rooms-side-note furn-file" title=${m.src}>${v=m.src,decodeURIComponent(v.split("?")[0].split("/").pop()??v)}</div>
              ${[["x","Centre X","%"],["y","Centre Y","%"],["w","Width","%"],["h","Height","%"],["rot","Rotation","°"]].map(([e,o,s])=>Dt`
                <div class="align-field-row">
                  <label>${o}<span>${s}</span></label>
                  <input type="number" step=${"rot"===e?1:.1}
                    .value=${String("rot"===e?m.rot??0:m[e])}
                    @change=${o=>this._furnSetField(m.id,e,o.target.value)} />
                </div>`)}
              ${this._furnScale?[["w","Width"],["h","Length"]].map(([e,o])=>Dt`
                <div class="align-field-row" title="Real size — from the floorplan's scale">
                  <label>${o}<span>cm</span></label>
                  <input type="number" step="1" min="1" .value=${String(this._furnCm(m,e)??"")}
                    @change=${o=>this._furnSetCm(m.id,e,o.target.value)} />
                </div>`):It}
              <div class="align-field-row">
                <label>Opacity<span>%</span></label>
                <input type="number" step="5" min="0" max="100" .value=${String(Math.round(100*(m.opacity??1)))}
                  @change=${e=>this._furnSetField(m.id,"opacity",e.target.value)} />
              </div>
              <label class="furn-check"><input type="checkbox" .checked=${!!m.flip}
                @change=${()=>this._furnToggleFlip(m.id)} /> Mirror</label>
              <div class="furn-actions">
                <button class="align-btn" title="Duplicate" @click=${()=>this._furnDuplicate(m.id)}><ha-icon icon="mdi:content-duplicate"></ha-icon></button>
                <button class="align-btn" title="Send backward" @click=${()=>this._furnReorder(m.id,-1)}><ha-icon icon="mdi:arrange-send-backward"></ha-icon></button>
                <button class="align-btn" title="Bring forward" @click=${()=>this._furnReorder(m.id,1)}><ha-icon icon="mdi:arrange-bring-forward"></ha-icon></button>
                <button class="align-btn" title="Delete (Del)" @click=${()=>this._furnDelete(m.id)}><ha-icon icon="mdi:delete"></ha-icon></button>
              </div>
              <div class="rooms-side-note">Drag to move, corners to resize (Shift = free proportions), top handle to rotate (Alt = no snap). Arrows nudge, [ ] rotate.</div>
            `:Dt`<div class="rooms-side-note">Click a piece on the map to edit it.</div>`}
            ${s.items.length?Dt`
              <div class="align-side-panel-divider"></div>
              <div class="section-title">Pieces</div>
              <div class="furn-list">
                ${[...s.items].reverse().map(e=>Dt`
                  <button class="furn-list-item ${e.id===s.selected?"on":""}" @click=${()=>this._furnSelect(e.id)}>
                    <img src=${e.src} alt="" /><span>${e.id}</span>
                  </button>`)}
              </div>`:It}
            ${this._furnSaveError?Dt`<div class="rooms-side-note furn-error">${this._furnSaveError}</div>`:It}
          </div>
        </div>
    `;var v}_floorplanCardImageBase(){const e=this._alignSession?.floorplan;if(!e||"merged"!==this._config.map_mode)return null;const o=this._config.image_base;return o?.src===e?o:null}_openFloorplan(){if(this._floorplanSession)return;const e=this._floorplanCardImageBase(),o=this._alignSession?.floorplan,s=this._alignSession?.floorplanKey;if(!e||!o||!s)return;const{src:l,rotation:h,scale:d,offset_x:p,offset_y:u,...m}=e,_=function effectiveFloorplanGeometry(e){return{rotation:e?.rotation??0,scale:e?.scale??100,offset_x:e?.offset_x??0,offset_y:e?.offset_y??0}}(e);this._floorplanSession={floorplan:o,floorplanKey:s,start:{..._},draft:{..._},history:[],future:[],rest:m},this._floorGesture=null}_floorplanHasChanges(){const e=this._floorplanSession;if(!e)return!1;const o=e.draft,s=e.start;if(o.rotation!==s.rotation||o.scale!==s.scale||o.offset_x!==s.offset_x||o.offset_y!==s.offset_y)return!0;const l=this._recropDraft;return 0!==l.offset_x||0!==l.offset_y||100!==l.scale}_floorplanReset(){const e=this._floorplanSession;e&&(this._floorplanSession={...e,draft:{...e.start},history:[...e.history,e.draft],future:[]})}async _floorplanCopyYaml(){const e=this._floorplanSession;if(e)try{await navigator.clipboard.writeText(function floorplanGeometryToYaml(e){const r2=e=>Math.round(100*e)/100;return["image_base:",`  rotation: ${r2(e.rotation)}`,`  scale: ${r2(e.scale)}`,`  offset_x: ${r2(e.offset_x)}`,`  offset_y: ${r2(e.offset_y)}`].join("\n")}(e.draft)),this._floorplanCopiedFlash=!0,setTimeout(()=>{this._floorplanCopiedFlash=!1},1500)}catch(e){console.warn("[anyvac-card] Floorplan: clipboard write failed",e)}}async _floorplanSave(){const e=this._floorplanSession;if(!e||!this._alignServiceAvailable())return;const o=e.draft,s={...this._withLiveFurniture(e.rest),src:e.floorplan,rotation:Math.round(100*o.rotation)/100,scale:Math.round(100*o.scale)/100,offset_x:Math.round(100*o.offset_x)/100,offset_y:Math.round(100*o.offset_y)/100},l=this._floorplanSeatsRaw()?.[e.floorplanKey],h={floorplan:e.floorplanKey,image_base:s};l?.room_style&&(h.room_style=l.room_style);try{await this.hass.callService("anyvac","set_floorplan_seat",h),this._closeAlign()}catch(e){console.warn("[anyvac-card] Floorplan: set_floorplan_seat call failed",e)}}_floorGeoStartGesture(e,o,s){const l=this._floorplanSession;if(!l)return;this._alignRefocusOverlay(),e.currentTarget.setPointerCapture(e.pointerId),e.stopPropagation(),e.preventDefault();const h=this._alignPointToWrapPct(e.clientX,e.clientY);h&&(this._floorGeoPushHistory(l.draft),this._floorGesture={kind:o,startSeat:{...l.draft},pivotPct:s,startPos:new Map([[e.pointerId,h]]),livePos:new Map([[e.pointerId,h]])})}_floorGeoGestureMove(e){const o=this._floorplanSession,s=this._floorGesture;if(!o||!s||!s.startPos.has(e.pointerId))return;const l=this._alignPointToWrapPct(e.clientX,e.clientY);if(!l)return;s.livePos.set(e.pointerId,l);const h=this._mapAR>.1?this._mapAR:3.636,d=e.pointerId,p=s.startPos.get(d),u=s.livePos.get(d);let m=null;if("drag"===s.kind)m=translateSeat(s.startSeat,u.x-p.x,u.y-p.y);else if("scale"===s.kind&&s.pivotPct){const e=this._alignIsoDist(p,s.pivotPct,h),o=this._alignIsoDist(u,s.pivotPct,h);e>1e-6&&(m=scaleSeatAbout(s.startSeat,o/e,s.pivotPct,h))}else if("rotate"===s.kind&&s.pivotPct){const e=this._alignIsoAngleDeg(s.pivotPct,p,h),o=this._alignIsoAngleDeg(s.pivotPct,u,h);m=rotateSeatAbout(s.startSeat,o-e,s.pivotPct,h)}m&&(this._floorplanSession={...o,draft:m})}_floorGeoGestureEnd(e){const o=this._floorGesture;o&&(o.startPos.delete(e.pointerId),o.livePos.delete(e.pointerId),0===o.startPos.size&&(this._floorGesture=null))}_floorGeoPushHistory(e){const o=this._floorplanSession;o&&(this._floorplanSession={...o,history:[...o.history,e],future:[]})}_floorGeoUndo(){const e=this._floorplanSession;if(!e||!e.history.length)return;const o=e.history[e.history.length-1];this._floorplanSession={...e,draft:o,history:e.history.slice(0,-1),future:[e.draft,...e.future]}}_floorGeoRedo(){const e=this._floorplanSession;if(!e||!e.future.length)return;const o=e.future[0];this._floorplanSession={...e,draft:o,history:[...e.history,e.draft],future:e.future.slice(1)}}_floorGeoSetField(e,o){const s=this._floorplanSession;if(!s)return;const l=parseFloat(o);if(!Number.isFinite(l))return;const h=s.draft;if(h[e]===l)return;const d={...h,[e]:l};this._floorplanSession={...s,draft:d,history:[...s.history,h],future:[]}}_recropOldCrop(e){const o=e.rest?.crop_box;return o?.frame_id&&null!=o.x0&&null!=o.y0&&null!=o.x1&&null!=o.y1?{frame_id:o.frame_id,x0:o.x0,y0:o.y0,x1:o.x1,y1:o.y1}:null}_recropEligible(e){return!!this._recropOldCrop(e)}_recropGhostVacuums(){return this._config.vacuums.filter(e=>this._homeFrameCropFor(e))}_recropHasChanges(){const e=this._recropDraft;return 0!==e.offset_x||0!==e.offset_y||100!==e.scale}_recropReset(){(this._recropHasChanges()||this._recropHistory.length||this._recropFuture.length)&&(this._recropHistory=[...this._recropHistory,this._recropDraft],this._recropFuture=[],this._recropDraft={rotation:0,scale:100,offset_x:0,offset_y:0})}async _recropCopyYaml(){const e=this._floorplanSession,o=e?this._recropOldCrop(e):null;if(!o)return;const s=recropFromGesture(o,this._recropDraft);if(s)try{await navigator.clipboard.writeText(function cropBoxToYaml(e){const r=e=>Math.round(e);return["image_base:","  crop_box:",`    frame_id: "${e.frame_id}"`,`    x0: ${r(e.x0)}`,`    y0: ${r(e.y0)}`,`    x1: ${r(e.x1)}`,`    y1: ${r(e.y1)}`].join("\n")}({...s,frame_id:o.frame_id})),this._floorplanCopiedFlash=!0,setTimeout(()=>{this._floorplanCopiedFlash=!1},1500)}catch(e){console.warn("[anyvac-card] Re-crop: clipboard write failed",e)}}async _recropSave(){const e=this._floorplanSession;if(!e||!this._alignServiceAvailable())return;const o=this._recropOldCrop(e);if(!o)return;const s=recropFromGesture(o,this._recropDraft);if(!s)return;const l=e.draft,h={frame_id:o.frame_id,x0:Math.round(s.x0),y0:Math.round(s.y0),x1:Math.round(s.x1),y1:Math.round(s.y1)},d={...this._withLiveFurniture(e.rest,h),crop_box:h,src:e.floorplan,rotation:Math.round(100*l.rotation)/100,scale:Math.round(100*l.scale)/100,offset_x:Math.round(100*l.offset_x)/100,offset_y:Math.round(100*l.offset_y)/100},p=this._floorplanSeatsRaw()?.[e.floorplanKey],u={floorplan:e.floorplanKey,image_base:d};p?.room_style&&(u.room_style=p.room_style);try{await this.hass.callService("anyvac","set_floorplan_seat",u),this._closeAlign()}catch(e){console.warn("[anyvac-card] Re-crop: set_floorplan_seat call failed",e)}}_recropStartGesture(e,o,s){this._alignRefocusOverlay(),e.currentTarget.setPointerCapture(e.pointerId),e.stopPropagation(),e.preventDefault();const l=this._alignPointToWrapPct(e.clientX,e.clientY);l&&(this._recropHistory=[...this._recropHistory,this._recropDraft],this._recropFuture=[],this._recropGesture={kind:o,startSeat:{...this._recropDraft},pivotPct:s,startPos:new Map([[e.pointerId,l]]),livePos:new Map([[e.pointerId,l]])})}_recropGestureMove(e){const o=this._recropGesture;if(!o||!o.startPos.has(e.pointerId))return;const s=this._alignPointToWrapPct(e.clientX,e.clientY);if(!s)return;o.livePos.set(e.pointerId,s);const l=this._mapAR>.1?this._mapAR:3.636,h=e.pointerId,d=o.startPos.get(h),p=o.livePos.get(h);let u=null;if("drag"===o.kind)u=translateSeat(o.startSeat,p.x-d.x,p.y-d.y);else if("scale"===o.kind&&o.pivotPct){const e=this._alignIsoDist(d,o.pivotPct,l),s=this._alignIsoDist(p,o.pivotPct,l);e>1e-6&&(u=scaleSeatAbout(o.startSeat,s/e,o.pivotPct,l))}u&&(this._recropDraft=u)}_recropGestureEnd(e){const o=this._recropGesture;o&&(o.startPos.delete(e.pointerId),o.livePos.delete(e.pointerId),0===o.startPos.size&&(this._recropGesture=null))}_recropUndo(){if(!this._recropHistory.length)return;const e=this._recropHistory[this._recropHistory.length-1];this._recropFuture=[this._recropDraft,...this._recropFuture],this._recropHistory=this._recropHistory.slice(0,-1),this._recropDraft=e}_recropRedo(){if(!this._recropFuture.length)return;const e=this._recropFuture[0];this._recropHistory=[...this._recropHistory,this._recropDraft],this._recropFuture=this._recropFuture.slice(1),this._recropDraft=e}_recropSetField(e,o){const s=parseFloat(o);if(!Number.isFinite(s))return;const l=this._recropDraft;l[e]!==s&&(this._recropHistory=[...this._recropHistory,l],this._recropFuture=[],this._recropDraft={...l,[e]:s})}_setFloorplanMode(e){"calib"===e&&this._alignReadOnly()||(this._floorplanMode=e,"calib"!==e||this._floorCalib||(this._floorCalib={phase:"raw",rawPts:[],floorPts:[]},this._floorCalibResult=null,this._floorCalibError=""))}_floorCalibCancel(){this._floorCalib=null,this._floorCalibRefNat=null,this._floorCalibResult=null,this._floorCalibError="",this._floorplanMode="geo"}_floorCalibRawClick(e){const o=this._floorCalib;if(!o||"raw"!==o.phase||!this._floorCalibRefNat||o.rawPts.length>=6)return;const s=e.currentTarget.getBoundingClientRect(),l=(e.clientX-s.left)/s.width,h=(e.clientY-s.top)/s.height,d={x:l*this._floorCalibRefNat.w,y:h*this._floorCalibRefNat.h};this._floorCalib={...o,rawPts:[...o.rawPts,d],phase:"floor"}}_floorCalibFloorClick(e){const o=this._floorCalib;if(!o||"floor"!==o.phase)return;const s=this._alignPointToWrapPct(e.clientX,e.clientY);if(!s)return;const l=round1(clampPct(s.x)),h=round1(clampPct(s.y));this._floorCalib={...o,floorPts:[...o.floorPts,{x:l,y:h}],phase:"raw"}}_floorCalibUndoPoint(){const e=this._floorCalib;e&&("floor"===e.phase&&e.rawPts.length>e.floorPts.length?this._floorCalib={...e,rawPts:e.rawPts.slice(0,-1),phase:"raw"}:e.floorPts.length>0&&(this._floorCalib={...e,floorPts:e.floorPts.slice(0,-1)}))}_floorCalibPreview(e){const o=Math.min(e.rawPts.length,e.floorPts.length);if(o<2||!this._floorCalibRefNat)return null;const s=this._mapAR>.1?this._mapAR:3.636,l=computeSeatFit(buildCalibrationAnchors(e.rawPts.slice(0,o),e.floorPts.slice(0,o),{NW:this._floorCalibRefNat.w,NH:this._floorCalibRefNat.h},s),s);return l?{residual_pct:Math.round(10*l.residual_pct)/10}:null}async _floorCalibSave(){const e=this._floorCalib,o=this._alignSession,s=this._alignVac();if(!e||!o||!s||!this._alignServiceAvailable()||this._alignReadOnly())return;const l=Math.min(e.rawPts.length,e.floorPts.length);if(!this._floorCalibRefNat||l<2)return void(this._floorCalibError="Need at least 2 complete point pairs — try again.");const h=this._mapAR>.1?this._mapAR:3.636,d=computeSeatFit(buildCalibrationAnchors(e.rawPts.slice(0,l),e.floorPts.slice(0,l),{NW:this._floorCalibRefNat.w,NH:this._floorCalibRefNat.h},h),h);if(!d)return void(this._floorCalibError="Couldn't compute a calibration from those points — make sure they're clearly apart, then try again.");this._floorCalibError="";const p={rotation:d.rotation,scale:Math.round(10*d.scale)/10,offset_x:Math.round(10*d.offset_x)/10,offset_y:Math.round(10*d.offset_y)/10},u={...o.appearanceDraft};try{await this.hass.callService("anyvac","set_floorplan_seat",{floorplan:o.floorplanKey,vacuum:s.entity,map:p,appearance:u}),this._closeAlign()}catch(e){console.warn("[anyvac-card] Floorplan calibration: set_floorplan_seat call failed",e)}}_homeCalibEligible(e){const o=e.rest?.crop_box;return(!o||!("frame_id"in o))&&!!this._anyHomeFrameCard()}_homeCalibServiceAvailable(){return!!this.hass.services?.anyvac?.snapshot_map_as_floorplan&&!!this.hass.services?.anyvac?.snap_wall_corner}_fiducialServiceAvailable(){return!!this.hass.services?.anyvac?.snapshot_map_as_floorplan&&!!this.hass.services?.anyvac?.detect_floorplan_fiducials}async _saveHomeAnchors(e,o){const s=this._floorplanSession;if(!s||!this._alignServiceAvailable())return!1;const l=s.draft,h={...this._withLiveFurniture(s.rest),src:s.floorplan,rotation:Math.round(100*l.rotation)/100,scale:Math.round(100*l.scale)/100,offset_x:Math.round(100*l.offset_x)/100,offset_y:Math.round(100*l.offset_y)/100,home_anchors:e,home_anchors_frame_id:o},d=this._floorplanSeatsRaw()?.[s.floorplanKey],p={floorplan:s.floorplanKey,image_base:h};d?.room_style&&(p.room_style=d.room_style);try{return await this.hass.callService("anyvac","set_floorplan_seat",p),!0}catch(e){return console.warn("[anyvac-card] Home calibration: set_floorplan_seat call failed",e),!1}}async _clearHomeAnchors(){const e=this._floorplanSession;if(!e||!this._alignServiceAvailable())return;const{home_anchors:o,home_anchors_frame_id:s,...l}=e.rest,h=e.draft,d={...this._withLiveFurniture(l),src:e.floorplan,rotation:Math.round(100*h.rotation)/100,scale:Math.round(100*h.scale)/100,offset_x:Math.round(100*h.offset_x)/100,offset_y:Math.round(100*h.offset_y)/100},p=this._floorplanSeatsRaw()?.[e.floorplanKey],u={floorplan:e.floorplanKey,image_base:d};p?.room_style&&(u.room_style=p.room_style);try{await this.hass.callService("anyvac","set_floorplan_seat",u),this._floorplanSession={...e,rest:l},this._homeCalibResult=null}catch(e){console.warn("[anyvac-card] Home calibration: clear failed",e)}}async _hideMapCascade(e){const o=this._floorplanSeatsRaw();for(const s of this._config.vacuums??[]){const l=o?.[e]?.vacuums?.[s.entity]?.map,h={...effectiveAppearance(s),hide_map:!0},d={floorplan:e,vacuum:s.entity,appearance:h};l&&(d.map=l);try{await this.hass.callService("anyvac","set_floorplan_seat",d)}catch(e){console.warn(`[anyvac-card] Home calibration: hide_map cascade failed for ${s.entity}`,e)}}}async _startHomeCalibration(){const e=this._floorplanSession;if(e&&this._homeCalibEligible(e)&&this._homeCalibServiceAvailable()){this._homeCalibError="",this._homeCalibResult=null,this._homeCalibBusy=!0;try{const e=await this.hass.callService("anyvac","snapshot_map_as_floorplan",{frame:"home",name:"home_frame_calib"},void 0,!1,!0),o=e?.response?.path,s=e?.response?.frame_id,l=e?.response?.crop;if(!o||!s||!l)throw new Error("incomplete response — integration too old?");this._homeCalibSnapshotUrl=o,this._homeCalibCrop=l,this._homeCalibFrameId=s,this._homeCalib={phase:"frame",homePts:[],floorPts:[]}}catch(e){this._homeCalibError="Couldn't snapshot the home frame for calibration — make sure at least one vacuum has a home-frame registration and the anyvac integration is at least 1.9.0, then try again.",console.warn("[anyvac-card] Home calibration: snapshot_map_as_floorplan failed",e)}finally{this._homeCalibBusy=!1}}}_cancelHomeCalibration(){this._homeCalib=null,this._homeCalibSnapshotUrl="",this._homeCalibCrop=null,this._homeCalibFrameId="",this._homeCalibError=""}async _onHomeCalibFrameClick(e){const o=this._homeCalib,s=this._homeCalibCrop;if(!o||"frame"!==o.phase||!s||o.homePts.length>=6||this._homeCalibBusy)return;const l=e.currentTarget.getBoundingClientRect(),h=pctToCropPoint({x:(e.clientX-l.left)/l.width*100,y:(e.clientY-l.top)/l.height*100},s);if(h){this._homeCalibBusy=!0;try{const e=await this.hass.callService("anyvac","snap_wall_corner",{frame_id:this._homeCalibFrameId,x_home_px:h.x,y_home_px:h.y},void 0,!1,!0),s=e?.response?.x_home_px??h.x,l=e?.response?.y_home_px??h.y;this._homeCalib={...o,homePts:[...o.homePts,{x:s,y:l}],phase:"floor"}}catch(e){this._homeCalib={...o,homePts:[...o.homePts,h],phase:"floor"},console.warn("[anyvac-card] Home calibration: snap_wall_corner failed, using unsnapped click",e)}finally{this._homeCalibBusy=!1}}}_onHomeCalibFloorClick(e){const o=this._homeCalib;if(!o||"floor"!==o.phase)return;const s=this._alignPointToWrapPct(e.clientX,e.clientY);if(!s)return;const l=round1(clampPct(s.x)),h=round1(clampPct(s.y));this._homeCalib={...o,floorPts:[...o.floorPts,{x:l,y:h}],phase:"frame"}}_undoHomeCalibPoint(){const e=this._homeCalib;e&&("floor"===e.phase&&e.homePts.length>e.floorPts.length?this._homeCalib={...e,homePts:e.homePts.slice(0,-1),phase:"frame"}:e.floorPts.length>0&&(this._homeCalib={...e,floorPts:e.floorPts.slice(0,-1)}))}_homeCalibPreview(e){const o=Math.min(e.homePts.length,e.floorPts.length),s=this._anyHomeFrameCard();if(o<2||!s)return null;const l=e.homePts.slice(0,o).map((o,s)=>({home_px:o,floor_pct:e.floorPts[s]})),h=this._mapAR>.1?this._mapAR:3.636,d=homeAnchorFit(l,{NW:s.w,NH:s.h},h);return d?{residual_pct:Math.round(10*d.residual_pct)/10}:null}async _finishHomeCalibration(){const e=this._homeCalib,o=this._floorplanSession;if(!e||!o)return;const s=Math.min(e.homePts.length,e.floorPts.length);if(s<2)return void(this._homeCalibError="Need at least 2 complete point pairs — try again.");const l=this._anyHomeFrameCard();if(!l)return void(this._homeCalibError="No home frame available anymore — try again.");const h=e.homePts.slice(0,s).map((o,s)=>({home_px:o,floor_pct:e.floorPts[s]})),d=this._mapAR>.1?this._mapAR:3.636,p=homeAnchorFit(h,{NW:l.w,NH:l.h},d);if(!p)return void(this._homeCalibError="Couldn't compute a calibration from those points — make sure they're clearly apart, then try again.");await this._saveHomeAnchors(h,l.id)?(await this._hideMapCascade(o.floorplanKey),this._homeCalib=null,this._homeCalibSnapshotUrl="",this._homeCalibCrop=null,this._homeCalibFrameId="",this._homeCalibError="",this._homeCalibResult={residual_pct:Math.round(10*p.residual_pct)/10}):this._homeCalibError="Couldn't save the calibration — try again."}async _snapshotHomeFrameWithFiducials(){if(this._fiducialServiceAvailable()){this._fiducialSnapshotBusy=!0,this._fiducialSnapshotError="",this._fiducialDetectResult=null;try{const e=await this.hass.callService("anyvac","snapshot_map_as_floorplan",{frame:"home",name:"home_frame_fiducial",fiducials:!0},void 0,!1,!0),o=e?.response?.path,s=e?.response?.frame_id,l=e?.response?.fiducials;if(!o||!s||!l?.length)throw new Error("incomplete response — integration too old?");this._fiducialKnown={frameId:s,markers:l},this._fiducialSnapshotPath=o}catch(e){this._fiducialSnapshotError="Couldn't snapshot the home frame with markers — requires anyvac integration ≥ 1.9.0 with at least one registered vacuum.",console.warn("[anyvac-card] Fiducials: snapshot_map_as_floorplan failed",e)}finally{this._fiducialSnapshotBusy=!1}}}async _detectFiducials(){const e=this._fiducialKnown,o=this._floorplanSession,s=this._floorplanCardImageBase()?.src??o?.floorplan;if(e&&o&&s){this._fiducialDetectBusy=!0,this._fiducialDetectError="",this._fiducialDetectResult=null;try{const l=await this.hass.callService("anyvac","detect_floorplan_fiducials",{path:s,fiducials:e.markers},void 0,!1,!0),h=l?.response?.home_anchors;if(!h?.length)throw new Error("no markers detected");if(!await this._saveHomeAnchors(h,e.frameId))throw new Error("couldn't save the detected anchors");await this._hideMapCascade(o.floorplanKey),this._fiducialDetectResult={found:l?.response?.found??h.length,missing:l?.response?.missing??[]}}catch(e){this._fiducialDetectError="Couldn't detect markers — make sure the file above still has its alpha channel (stayed PNG, wasn't flattened/re-exported as JPEG) and at least 2 of the 4 corners survived the crop.",console.warn("[anyvac-card] Fiducials: detect_floorplan_fiducials failed",e)}finally{this._fiducialDetectBusy=!1}}}_floorplanSnapshotServiceAvailable(){return!!this.hass.services?.anyvac?.snapshot_map_as_floorplan&&this._alignServiceAvailable()}_guideExportServiceAvailable(){return!!this.hass.services?.anyvac?.export_map_guide}async _snapshotMapAsFloorplan(){const e=this._alignSession,o=this._floorplanSession,s=this._alignVac();if(!(e&&o&&s&&"merged"===this._config.map_mode&&this._floorplanSnapshotServiceAvailable()))return;const l=this._mapEntityFor(s);if(l){this._floorplanSnapshotBusy=!0,this._floorplanSnapshotError="",this._placeRoomsResult=null;try{const h=await this.hass.callService("anyvac","snapshot_map_as_floorplan",{image_entity:l,name:s.name||s.entity},void 0,!1,!0),d=h?.response?.path;if(!d)throw new Error("no path in service response");const p=h?.response?.crop,u=o.draft,m={...this._withLiveFurniture(o.rest,p?{entity:s.entity,...p}:void 0),src:d,rotation:Math.round(100*u.rotation)/100,scale:Math.round(100*u.scale)/100,offset_x:Math.round(100*u.offset_x)/100,offset_y:Math.round(100*u.offset_y)/100,...p?{crop_box:{entity:s.entity,...p}}:{}},_={};let f=0,v=0;if(p){const e=this._intAttrs(s),o=Array.isArray(e?.rooms)?e.rooms:[],l=new Map((this._config.rooms??[]).map(e=>[e.key,e]));for(const e of o){const o=e?.name,s=e?.bbox_px;if(!o||!s)continue;const h=placeRoomInCrop(s,p);h&&(_[o]={...h,area_id:l.get(o)?.area_id??null},l.has(o)?f++:v++)}}const b=this._floorplanSeatsRaw()?.[e.floorplanKey],w={floorplan:e.floorplanKey,image_base:m};Object.keys(_).length&&(w.rooms=_),b?.room_style&&(w.room_style=b.room_style),await this.hass.callService("anyvac","set_floorplan_seat",w),this._alignSession={...e,floorplan:d},this._roomsSession&&(this._roomsSession={...this._roomsSession,floorplan:d});const{src:$,rotation:C,scale:A,offset_x:F,offset_y:E,...T}=m;this._floorplanSession={...o,floorplan:d,rest:T},p&&(this._placeRoomsResult={placed:f,added:v}),await this._hideMapCascade(e.floorplanKey)}catch(e){this._floorplanSnapshotError="Couldn't snapshot this vacuum's map — make sure the anyvac integration is updated to at least 0.88.0, then try again.",console.warn("[anyvac-card] Floorplan: snapshot_map_as_floorplan failed",e)}finally{this._floorplanSnapshotBusy=!1}}}async _snapshotHomeFrameAsFloorplan(){const e=this._alignSession,o=this._floorplanSession;if(e&&o&&"merged"===this._config.map_mode&&this._floorplanSnapshotServiceAvailable()){this._homeFrameSnapshotBusy=!0,this._homeFrameSnapshotError="";try{const s=await this.hass.callService("anyvac","snapshot_map_as_floorplan",{frame:"home",name:"home_frame"},void 0,!1,!0),l=s?.response?.path,h=s?.response?.frame_id,d=s?.response?.crop;if(!l||!h||!d)throw new Error("incomplete response — integration too old?");const p=o.draft,u={...this._withLiveFurniture(o.rest,{frame_id:h,...d}),src:l,crop_box:{frame_id:h,...d},rotation:Math.round(100*p.rotation)/100,scale:Math.round(100*p.scale)/100,offset_x:Math.round(100*p.offset_x)/100,offset_y:Math.round(100*p.offset_y)/100},m=this._floorplanSeatsRaw()?.[e.floorplanKey],_={floorplan:e.floorplanKey,image_base:u};m?.room_style&&(_.room_style=m.room_style),await this.hass.callService("anyvac","set_floorplan_seat",_),this._alignSession={...e,floorplan:l},this._roomsSession&&(this._roomsSession={...this._roomsSession,floorplan:l});const{src:f,rotation:v,scale:b,offset_x:w,offset_y:$,...C}=u;this._floorplanSession={...o,floorplan:l,rest:C},await this._hideMapCascade(e.floorplanKey)}catch(e){this._homeFrameSnapshotError="Couldn't snapshot the home frame — make sure at least two vacuums have a home-frame registration (integration ≥ 1.8.0, check the 'registration' sensor attribute), then try again.",console.warn("[anyvac-card] Floorplan: snapshot_map_as_floorplan (frame: home) failed",e)}finally{this._homeFrameSnapshotBusy=!1}}}async _exportGuideLayers(){const e=this._floorplanSession,o=this._alignVac();if(!e||!o||!this._guideExportServiceAvailable())return;const s=this._mapEntityFor(o);if(!s)return;this._guideExportBusy=!0,this._guideExportError="",this._guideExportResult=null;const l=e.rest?.crop_box,h=l&&l.entity===o.entity?{x0:l.x0,y0:l.y0,x1:l.x1,y1:l.y1}:void 0;try{const e={image_entity:s,name:o.name||o.entity};h&&(e.crop=h);const l=await this.hass.callService("anyvac","export_map_guide",e,void 0,!1,!0),d=l?.response?.paths,p=l?.response?.size;if(!d||!p||!Object.keys(d).length)throw new Error("no guide layers in service response");this._guideExportResult={paths:d,size:p}}catch(e){this._guideExportError="Couldn't export guide layers — make sure the anyvac integration is updated to at least 1.4.0, then try again.",console.warn("[anyvac-card] Floorplan: export_map_guide failed",e)}finally{this._guideExportBusy=!1}}_tinted(e,o){if(!this._veTint||!this._themed()||!hexToRgb(o))return e;const s=e+"|"+o.toLowerCase(),l=this._tintCache.get(s);return l||(null===l||this._tintPending.has(s)||(this._tintPending.add(s),tintMapImage(e,o).then(e=>{for(this._tintPending.delete(s),this._tintCache.set(s,e);this._tintCache.size>12;){const[e,o]=this._tintCache.entries().next().value;this._tintCache.delete(e),o&&URL.revokeObjectURL(o)}e&&this.requestUpdate()})),e)}_veAvatar(e){return e.image?Dt`<img class="ve-chip-avatar" src=${e.image} alt="" />`:Dt`<span class="ve-chip-avatar ve-chip-avatar--dot" style=${Xt({background:this._color(e)})}></span>`}_renderVisualEditor(){const e=this._alignSession;if(!e)return It;const o=this._alignVac();if(!o)return It;const s=this._alignCandidates(this._config.vacuums),l=this._alignReadOnly(),h=!l&&this._alignServiceAvailable(),d=e.history.length>0,p=e.future.length>0,u=this._roomsSession,m=!!u&&u.history.length>0,_=!!u&&u.future.length>0,f=!!u&&this._alignServiceAvailable(),v=this._floorplanSession,b=!!v&&this._recropEligible(v),w=b?this._recropHistory.length>0:!!v&&v.history.length>0,$=b?this._recropFuture.length>0:!!v&&v.future.length>0,C=!!v&&this._alignServiceAvailable(),A=this._floorCalib,F=A?Math.min(A.rawPts.length,A.floorPts.length):0,E=F>=2&&this._alignServiceAvailable()&&!this._alignReadOnly(),T=this._homeCalib,O=T?Math.min(T.homePts.length,T.floorPts.length):0,B=!!T&&O>=2&&this._alignServiceAvailable(),q=e.nudgeTier,tierBtn=(e,o,s)=>Dt`
      <button class="align-tier-btn ${q===e?"on":""}" title=${s}
        @click=${()=>this._alignSetNudgeTier(e)}>${o}</button>`,toolTab=(e,o,s)=>Dt`
      <button class="ve-tool-tab ${this._veTool===e?"on":""}" role="tab"
        aria-selected=${this._veTool===e?"true":"false"} title=${o}
        @click=${()=>this._setVeTool(e)}><ha-icon icon=${s}></ha-icon><span>${o}</span></button>`;return Dt`
      <div class="align-overlay ${this._rootClasses()}" tabindex="0" role="dialog" aria-label="Visual editor — ${o.name??o.entity}"
        @keydown=${e=>this._alignKeyDown(e)}>
        <div class="align-toolbar ve-topbar">
          <div class="align-vac-picker">
            ${s.length>1?s.map(e=>Dt`
              <button class="align-vac-chip ${e.entity===o.entity?"on":""}"
                aria-pressed=${e.entity===o.entity?"true":"false"}
                @click=${()=>{const o=this._veTool;this._closeAlign(),this._openAlign(e),this._veTool=o,"rooms"===o&&this._openRooms(),"floorplan"===o&&this._openFloorplan(),"furniture"===o&&this._openFurniture()}}>
                ${this._veAvatar(e)}<span>${e.name??e.entity}</span>
              </button>
            `):Dt`<span class="align-vac-chip align-vac-chip--static on">${this._veAvatar(o)}<span>${o.name??o.entity}</span></span>`}
          </div>
          <div class="ve-tool-row" role="tablist" aria-label="Tool">
            ${toolTab("seat","Seat & Appearance","mdi:vector-square-edit")}
            ${toolTab("rooms","Rooms","mdi:select-group")}
            ${toolTab("floorplan","Floorplan & Calibrate","mdi:image-edit-outline")}
            ${toolTab("furniture","Furniture","mdi:sofa-outline")}
          </div>
          <div class="ve-topbar-actions">
          ${"seat"===this._veTool?Dt`
            <div class="align-tier-group" title="Nudge step size — hold Ctrl for Fine, Shift for Jump">
              ${tierBtn("fine","Fine","Fine step (0,1×) — or hold Ctrl")}
              ${tierBtn("normal","Step","Normal step (1×)")}
              ${tierBtn("jump","Jump","Jump step (10×) — or hold Shift")}
            </div>
            <button class="align-btn" title="Undo (Ctrl+Z)" ?disabled=${!d} @click=${()=>this._alignUndo()}>
              <ha-icon icon="mdi:undo"></ha-icon>
            </button>
            <button class="align-btn" title="Redo (Ctrl+Y)" ?disabled=${!p} @click=${()=>this._alignRedo()}>
              <ha-icon icon="mdi:redo"></ha-icon>
            </button>
            <button class="align-btn" title="Rotate view 90°" @click=${()=>this._alignRotateView()}>
              <ha-icon icon="mdi:screen-rotation"></ha-icon>
            </button>
            <button class="align-btn" title="Reset to the values the editor was opened with"
              ?disabled=${l} @click=${()=>this._alignReset()}>
              <ha-icon icon="mdi:restore"></ha-icon>
            </button>
            <button class="align-btn ${this._alignCopiedFlash?"align-btn--flash":""}"
              title="Copy as YAML (map:/appearance: blocks, paste into the card config)" @click=${()=>this._alignCopyYaml()}>
              <ha-icon icon=${this._alignCopiedFlash?"mdi:check":"mdi:content-copy"}></ha-icon>
            </button>
          `:It}
          ${"rooms"===this._veTool?Dt`
            <button class="align-btn" title="Undo" ?disabled=${!m} @click=${()=>this._roomsUndo()}>
              <ha-icon icon="mdi:undo"></ha-icon>
            </button>
            <button class="align-btn" title="Redo" ?disabled=${!_} @click=${()=>this._roomsRedo()}>
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
          `:It}
          ${"furniture"===this._veTool&&this._furnSession?Dt`
            <button class="align-btn" title="Undo (Ctrl+Z)" ?disabled=${!this._furnSession.history.length} @click=${()=>this._furnUndo()}>
              <ha-icon icon="mdi:undo"></ha-icon>
            </button>
            <button class="align-btn" title="Redo (Ctrl+Y)" ?disabled=${!this._furnSession.future.length} @click=${()=>this._furnRedo()}>
              <ha-icon icon="mdi:redo"></ha-icon>
            </button>
            <button class="align-btn" title="Rotate view 90°" @click=${()=>this._alignRotateView()}>
              <ha-icon icon="mdi:screen-rotation"></ha-icon>
            </button>
            <button class="align-btn" title="Reset to the values this tab was opened with" @click=${()=>this._furnReset()}>
              <ha-icon icon="mdi:restore"></ha-icon>
            </button>
            <button class="align-btn ${this._furnCopiedFlash?"align-btn--flash":""}"
              title="Copy as YAML (image_base.furniture: block, paste into the card config)" @click=${()=>this._furnCopyYaml()}>
              <ha-icon icon=${this._furnCopiedFlash?"mdi:check":"mdi:content-copy"}></ha-icon>
            </button>
          `:It}
          ${"floorplan"===this._veTool&&v&&"geo"===this._floorplanMode?Dt`
            <button class="align-btn" title="Undo (Ctrl+Z)" ?disabled=${!w}
              @click=${()=>b?this._recropUndo():this._floorGeoUndo()}>
              <ha-icon icon="mdi:undo"></ha-icon>
            </button>
            <button class="align-btn" title="Redo (Ctrl+Y)" ?disabled=${!$}
              @click=${()=>b?this._recropRedo():this._floorGeoRedo()}>
              <ha-icon icon="mdi:redo"></ha-icon>
            </button>
            <button class="align-btn" title="Rotate view 90°" @click=${()=>this._alignRotateView()}>
              <ha-icon icon="mdi:screen-rotation"></ha-icon>
            </button>
            <button class="align-btn" title="Reset to the values this tab was opened with"
              @click=${()=>b?this._recropReset():this._floorplanReset()}>
              <ha-icon icon="mdi:restore"></ha-icon>
            </button>
            <button class="align-btn ${this._floorplanCopiedFlash?"align-btn--flash":""}"
              title=${b?"Copy as YAML (image_base.crop_box: block, paste into the card config)":"Copy as YAML (image_base: block, paste into the card config)"}
              @click=${()=>b?this._recropCopyYaml():this._floorplanCopyYaml()}>
              <ha-icon icon=${this._floorplanCopiedFlash?"mdi:check":"mdi:content-copy"}></ha-icon>
            </button>
          `:It}
          ${"floorplan"===this._veTool&&v&&"calib"===this._floorplanMode?Dt`
            <button class="align-btn" title="Rotate view 90°" @click=${()=>this._alignRotateView()}>
              <ha-icon icon="mdi:screen-rotation"></ha-icon>
            </button>
          `:It}
          ${"floorplan"===this._veTool&&v&&"home"===this._floorplanMode?Dt`
            <button class="align-btn" title="Rotate view 90°" @click=${()=>this._alignRotateView()}>
              <ha-icon icon="mdi:screen-rotation"></ha-icon>
            </button>
          `:It}
          <button class="align-btn align-close-btn" title="Cancel" @click=${()=>this._alignCancel()}>
            <ha-icon icon="mdi:close"></ha-icon>
          </button>
          ${"seat"===this._veTool?Dt`
            <button class="align-btn align-save-btn" ?disabled=${!h}
              title=${h?"Save":l?"Read-only — aligned by home frame":"Update the AnyVac integration to 2.0.0 — or Copy YAML"}
              @click=${()=>this._alignSave()}>
              <ha-icon icon="mdi:content-save"></ha-icon><span>Save</span>
            </button>
          `:It}
          ${"rooms"===this._veTool?Dt`
            <button class="align-btn align-save-btn" ?disabled=${!f}
              title=${f?"Save":"Update the AnyVac integration to 2.0.0 — or Copy YAML"}
              @click=${()=>this._roomsSave()}>
              <ha-icon icon="mdi:content-save"></ha-icon><span>Save</span>
            </button>
          `:It}
          ${"furniture"===this._veTool&&this._furnSession?Dt`
            <button class="align-btn align-save-btn" ?disabled=${!this._alignServiceAvailable()||!this._furnHasUnsavedChanges()}
              title=${this._alignServiceAvailable()?"Save":"Update the AnyVac integration — or Copy YAML"}
              @click=${()=>this._furnSave()}>
              <ha-icon icon="mdi:content-save"></ha-icon><span>Save</span>
            </button>
          `:It}
          ${"floorplan"===this._veTool&&v&&"geo"===this._floorplanMode?Dt`
            <button class="align-btn align-save-btn" ?disabled=${!C}
              title=${C?"Save":"Update the AnyVac integration to 2.0.0 — or Copy YAML"}
              @click=${()=>b?this._recropSave():this._floorplanSave()}>
              <ha-icon icon="mdi:content-save"></ha-icon><span>Save</span>
            </button>
          `:It}
          ${"floorplan"===this._veTool&&v&&"calib"===this._floorplanMode?Dt`
            <button class="align-btn align-save-btn" ?disabled=${!E}
              title=${E?"Save calibrated seat":this._alignReadOnly()?"Read-only — aligned by home frame":F<2?"Click at least 2 point pairs first":"Update the AnyVac integration to 2.0.0"}
              @click=${()=>this._floorCalibSave()}>
              <ha-icon icon="mdi:content-save"></ha-icon><span>Save</span>
            </button>
          `:It}
          ${"floorplan"===this._veTool&&v&&"home"===this._floorplanMode&&this._homeCalib?Dt`
            <button class="align-btn align-save-btn" ?disabled=${!B}
              title=${B?"Save calibration":O<2?"Click at least 2 point pairs first":"Update the AnyVac integration to 2.0.0"}
              @click=${()=>this._finishHomeCalibration()}>
              <ha-icon icon="mdi:content-save"></ha-icon><span>Save</span>
            </button>
          `:It}
          </div>
        </div>
        ${"seat"===this._veTool?this._renderSeatTool(e,o):"rooms"===this._veTool?this._renderRoomsTool(e,o):"furniture"===this._veTool?this._renderFurnitureTool(e,o):v?this._renderFloorplanTool(v):this._renderVePlaceholder("merged"!==this._config.map_mode?"Only available for a shared (merged-mode) floorplan right now — this config's own per-vacuum image_base stays editable from the Config editor's Vacuums tab → Map & floorplan section.":"No card-level floorplan image to edit — set one from the Config editor's Global tab → Floorplan section first.")}
        ${this._alignCancelConfirm?Dt`
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
        `:It}
      </div>
    `}_renderSeatTool(e,o){const{w:s,h:l}=this._alignSceneSize(),h=this._config.vacuums.filter(s=>s.entity!==o.entity&&resolveImageBaseSrc(this._config,s)===e.floorplan&&this._intAttrs(s)),d=this._config.image_base?.src===e.floorplan?this._config.image_base:this._config.vacuums.find(o=>o.image_base?.src===e.floorplan)?.image_base??o.image_base,p=this._mapEntityFor(o),u=p?this._mapUrl(p):null,m=this._hasReach(o),_=e.draft,f=e.appearanceDraft,v={...o,...f,path_color:f.path_color??void 0,mop_path_color:f.mop_path_color??void 0},b=this._alignMapAspect(o),w=this._alignContentBox(o),corner=(e,o)=>this._alignCornerPct(_,w.x0+e*(w.x1-w.x0),w.y0+o*(w.y1-w.y0),s,l,b),$=corner(0,0),C=corner(1,0),A=corner(0,1),F=corner(1,1),E=corner(.5,0),T=corner(.5,1),O=corner(0,.5),B=corner(1,.5),q=corner(.5,.5),j=corner(.5,(w.x1-w.x0)/(w.y1-w.y0)*-.18/b),G=this._alignReadOnly();return Dt`
        <div class="align-body">
          <div class="align-canvas"
            @wheel=${e=>this._alignWheel(e)}
            @pointerdown=${e=>this._alignBgPointerDown(e)}
            @pointermove=${e=>this._alignBgPointerMove(e)}
            @pointerup=${e=>this._alignBgPointerUp(e)}
            @pointercancel=${e=>this._alignBgPointerUp(e)}>
            <div class="align-scene" style=${Xt({width:s+"px",height:l+"px",transform:this._alignViewTransformCss()})}>
              ${d?.src?Dt`<img class="align-floorplan-img" src=${d.src} alt="Floorplan"
                  @load=${this._onFloorplanLoad}
                  style=${Xt({opacity:String(e.layers.floor),transform:"translate("+(d.offset_x??0)+"%,"+(d.offset_y??0)+"%) rotate("+(d.rotation??0)+"deg) scale("+(d.scale??100)/100+")"})} />`:It}
              ${h.map(e=>{const o=this._mapEntityFor(e),s=o?this._tinted(this._mapUrl(o),this._color(e)):null,l=this._effectiveSeat(e);return Dt`
                  <div class="align-ghost">
                    ${s?Dt`<img class="align-seat-img" src=${s} alt=""
                        style=${Xt({left:50+l.offset_x+"%",top:50+l.offset_y+"%",width:l.scale+"%",transform:"translate(-50%,-50%) "+seatRotateScaleCss(l.rotation,l.scale,l.scaleY)})} />`:It}
                    ${this._renderIntegrationOverlay(e,l,"both")}
                  </div>`})}
              <div class="align-seat-layer ${G?"align-seat-layer--readonly":""}"
                @pointerdown=${e=>this._alignStartGesture(e,"drag")}
                @pointermove=${e=>this._alignGestureMove(e)}
                @pointerup=${e=>this._alignGestureEnd(e)}
                @pointercancel=${e=>this._alignGestureEnd(e)}>
                ${u?Dt`<img class="align-seat-img" src=${this._tinted(u,this._color(o))} alt="Vacuum map"
                    @load=${e=>this._onAlignMapLoad(e)}
                    style=${Xt({opacity:String(e.layers.rawMap),left:50+_.offset_x+"%",top:50+_.offset_y+"%",width:_.scale+"%",transform:"translate(-50%,-50%) "+seatRotateScaleCss(_.rotation,_.scale,_.scaleY)})} />`:It}
                ${m&&e.layers.reach>0?this._renderReachImg(o,_,s,l,"",e.layers.reach):It}
                ${this._renderIntegrationOverlay(v,_,"both")}
              </div>
              ${G?Dt`
                <div class="align-readonly-note">
                  <ha-icon icon="mdi:lock-outline"></ha-icon>
                  <span>aligned by home frame — nothing to adjust</span>
                </div>
              `:Dt`
                <svg class="align-gizmo" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <line x1=${q.x} y1=${q.y} x2=${j.x} y2=${j.y} class="align-gizmo-arm" />
                  <polygon points="${$.x},${$.y} ${C.x},${C.y} ${F.x},${F.y} ${A.x},${A.y}" class="align-gizmo-box" />
                </svg>
                ${[["nw",$],["ne",C],["se",F],["sw",A]].map(([e,o])=>Dt`
                  <div class="align-handle align-handle--corner" data-corner=${e}
                    style=${Xt({left:o.x+"%",top:o.y+"%"})}
                    @pointerdown=${o=>{const s="nw"===e?F:"ne"===e?A:"se"===e?$:C;this._alignStartGesture(o,"scale",s)}}
                    @pointermove=${e=>this._alignGestureMove(e)}
                    @pointerup=${e=>this._alignGestureEnd(e)}
                    @pointercancel=${e=>this._alignGestureEnd(e)}>
                  </div>
                `)}
                ${[["n",E,T,"stretchY",90,"mdi:arrow-up-down"],["s",T,E,"stretchY",90,"mdi:arrow-up-down"],["w",O,B,"stretchX",0,"mdi:arrow-left-right"],["e",B,O,"stretchX",0,"mdi:arrow-left-right"]].map(([e,o,s,l,h,d])=>Dt`
                  <div class="align-handle align-handle--side align-handle--${e}" data-side=${e}
                    title=${("stretchX"===l?"Scale X":"Scale Y")+" — opposite edge stays put (hold Alt to scale from the centre)"}
                    style=${Xt({left:o.x+"%",top:o.y+"%",cursor:this._alignResizeCursor(h,_.rotation+this._alignView.rot)})}
                    @pointerdown=${e=>this._alignStartGesture(e,l,s,q)}
                    @pointermove=${e=>this._alignGestureMove(e)}
                    @pointerup=${e=>this._alignGestureEnd(e)}
                    @pointercancel=${e=>this._alignGestureEnd(e)}>
                    <ha-icon icon=${d} style=${Xt({transform:"rotate("+_.rotation+"deg)"})}></ha-icon>
                  </div>
                `)}
                <div class="align-axis-hint align-axis-hint--x" title="Offset X"
                  style=${Xt({left:q.x+7+"%",top:q.y+"%"})}>
                  <ha-icon icon="mdi:arrow-left-right"></ha-icon>
                </div>
                <div class="align-axis-hint align-axis-hint--y" title="Offset Y"
                  style=${Xt({left:q.x+"%",top:q.y-7+"%"})}>
                  <ha-icon icon="mdi:arrow-up-down"></ha-icon>
                </div>
                <div class="align-handle align-handle--rotate"
                  style=${Xt({left:j.x+"%",top:j.y+"%"})}
                  @pointerdown=${e=>this._alignStartGesture(e,"rotate",q)}
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
            ${m?Dt`
              <div class="align-field-row align-field-row--opacity" title="Where this vacuum's body has been in its last complete clean of each room — line its edges up with the walls, the holes are furniture">
                <label>Reach<span>%</span></label>
                <input type="range" min="0" max="100" step="5"
                  .value=${String(Math.round(100*e.layers.reach))}
                  @input=${e=>this._alignSetLayerOpacity("reach",e.target.value)}
                  @change=${()=>this._alignRefocusOverlay()} />
              </div>`:It}
            ${this._themed()?Dt`
              <div class="align-field-row align-field-row--check">
                <label title="Each vacuum's map in its own colour, background removed — easier to see what lines up with what">
                  <input type="checkbox" .checked=${this._veTint}
                    @change=${e=>{this._veTint=e.target.checked,this._alignRefocusOverlay()}} />
                  Tint maps in vacuum colour
                </label>
              </div>`:It}
            <div class="align-field-row">
              <label>Rotation<span>°</span></label>
              <input type="number" step="0.1" .value=${String(Math.round(100*_.rotation)/100)}
                ?disabled=${G} @change=${e=>this._alignSetField("rotation",e.target.value)} />
            </div>
            <div class="align-field-row">
              <label>Scale${null!=_.scaleY?this._alignFieldArrow(!0,_.rotation+this._alignView.rot):It}<span>%</span></label>
              <input type="number" step="0.1" min="1" .value=${String(Math.round(100*_.scale)/100)}
                ?disabled=${G} @change=${e=>this._alignSetField("scale",e.target.value)} />
            </div>
            <div class="align-field-row align-field-row--check">
              <label>
                <input type="checkbox" .checked=${null!=_.scaleY} ?disabled=${G}
                  @change=${e=>this._alignToggleScaleY(e.target.checked)} />
                Independent Y scale
              </label>
            </div>
            ${null!=_.scaleY?Dt`
              <div class="align-field-row">
                <label>Scale${this._alignFieldArrow(!1,_.rotation+this._alignView.rot)}<span>%</span></label>
                <input type="number" step="0.1" min="1" .value=${String(Math.round(100*_.scaleY)/100)}
                  ?disabled=${G} @change=${e=>this._alignSetField("scaleY",e.target.value)} />
              </div>
            `:It}
            <div class="align-field-row">
              <label>Offset${this._alignFieldArrow(!0,this._alignView.rot)}<span>%</span></label>
              <input type="number" step="0.01" .value=${String(Math.round(1e4*_.offset_x)/1e4)}
                ?disabled=${G} @change=${e=>this._alignSetField("offset_x",e.target.value)} />
            </div>
            <div class="align-field-row">
              <label>Offset${this._alignFieldArrow(!1,this._alignView.rot)}<span>%</span></label>
              <input type="number" step="0.01" .value=${String(Math.round(1e4*_.offset_y)/1e4)}
                ?disabled=${G} @change=${e=>this._alignSetField("offset_y",e.target.value)} />
            </div>
            <div class="align-side-panel-divider"></div>
            <div class="section-title">Appearance</div>
            <div class="align-field-row align-field-row--check">
              <label>
                <input type="checkbox" .checked=${!!f.hide_map} ?disabled=${G}
                  @change=${e=>this._alignSetAppearanceField("hide_map",e.target.checked)} />
                Hide vacuum map (show only floorplan + robot/path)
              </label>
            </div>
            <div class="align-field-row align-field-row--opacity">
              <label>Overlay opacity<span>%</span></label>
              <input type="range" min="0" max="100" step="5"
                ?disabled=${G} .value=${String(f.overlay_opacity??55)}
                @input=${e=>this._alignSetAppearanceField("overlay_opacity",Number(e.target.value))} />
            </div>
            <div class="align-field-row">
              <label>Overlay blend</label>
              <select ?disabled=${G} .value=${f.overlay_blend??"normal"}
                @change=${e=>this._alignSetAppearanceField("overlay_blend",e.target.value)}>
                <option value="normal">normal</option>
                <option value="lighten">lighten</option>
                <option value="screen">screen</option>
                <option value="plus-lighter">plus-lighter</option>
              </select>
            </div>
            ${this._veHexColorField("Path colour",f.path_color??void 0,G,e=>this._alignSetAppearanceField("path_color",e||null),this._color(o))}
            <div class="align-field-row align-field-row--opacity">
              <label>Path width<span>%</span></label>
              <input type="range" min="20" max="300" step="10"
                ?disabled=${G} .value=${String(f.path_width??100)}
                @input=${e=>this._alignSetAppearanceField("path_width",Number(e.target.value))} />
            </div>
            ${this._veHexColorField("Mop band colour",f.mop_path_color??void 0,G,e=>this._alignSetAppearanceField("mop_path_color",e||null),"#40a9ff")}
            <div class="align-field-row align-field-row--opacity">
              <label>Mop band opacity<span>%</span></label>
              <input type="range" min="0" max="100" step="5"
                ?disabled=${G} .value=${String(f.mop_band_opacity??28)}
                @input=${e=>this._alignSetAppearanceField("mop_band_opacity",Number(e.target.value))} />
            </div>
            <div class="align-field-row align-field-row--opacity">
              <label>Mop band width<span>%</span></label>
              <input type="range" min="20" max="400" step="10"
                ?disabled=${G} .value=${String(f.mop_band_width??100)}
                @input=${e=>this._alignSetAppearanceField("mop_band_width",Number(e.target.value))} />
            </div>
            ${o.image?Dt`
              <div class="align-field-row align-field-row--check">
                <label>
                  <input type="checkbox" .checked=${!!f.robot_image_on_map} ?disabled=${G}
                    @change=${e=>this._alignSetAppearanceField("robot_image_on_map",e.target.checked)} />
                  Robot image on map (uses status image)
                </label>
              </div>
              ${f.robot_image_on_map?Dt`
                <div class="align-field-row align-field-row--opacity">
                  <label>Robot image size<span>%</span></label>
                  <input type="range" min="40" max="220" step="10"
                    ?disabled=${G} .value=${String(f.robot_size??100)}
                    @input=${e=>this._alignSetAppearanceField("robot_size",Number(e.target.value))} />
                </div>
                <div class="align-field-row align-field-row--opacity">
                  <label>Robot image rotation<span>°</span></label>
                  <input type="range" min="-180" max="180" step="15"
                    ?disabled=${G} .value=${String(f.robot_image_rotation??0)}
                    @input=${e=>this._alignSetAppearanceField("robot_image_rotation",Number(e.target.value))} />
                </div>
              `:It}
            `:It}
          </div>
        </div>
    `}_renderRoomsTool(e,o){const{w:s,h:l}=this._alignSceneSize(),h=this._roomsSession;if(!h)return Dt`<div class="align-body"></div>`;const d=this._config.image_base?.src===e.floorplan?this._config.image_base:this._config.vacuums.find(o=>o.image_base?.src===e.floorplan)?.image_base??o.image_base,p=h.styleDraft,u=Object.values(this.hass?.areas??{}),m=h.selected,_=m?h.rooms[m]:void 0,f=this._roomsDrawGesture;return Dt`
        <div class="align-body">
          <div class="align-canvas"
            @wheel=${e=>this._alignWheel(e)}
            @pointerdown=${e=>this._roomsCanvasPointerDown(e)}
            @pointermove=${e=>this._roomsCanvasPointerMove(e)}
            @pointerup=${e=>this._roomsCanvasPointerUp(e)}
            @pointercancel=${e=>this._roomsCanvasPointerUp(e)}>
            <div class="align-scene ${h.drawingNew?"align-scene--drawing":""}" style=${Xt({width:s+"px",height:l+"px",transform:this._alignViewTransformCss()})}>
              ${d?.src?Dt`<img class="align-floorplan-img" src=${d.src} alt="Floorplan"
                  @load=${this._onFloorplanLoad}
                  style=${Xt({transform:"translate("+(d.offset_x??0)+"%,"+(d.offset_y??0)+"%) rotate("+(d.rotation??0)+"deg) scale("+(d.scale??100)/100+")"})} />`:It}
              ${Object.entries(h.rooms).map(([e,o])=>{const s=e===m,l=this._roomDisplayName(e);return Dt`
                  <div class="rooms-rect ${s?"rooms-rect--selected":""}" title=${l}
                    style=${Xt({left:o.x+"%",top:o.y+"%",width:o.w+"%",height:o.h+"%",borderWidth:(s?p.border_selected:p.border_normal)+"px"})}
                    @pointerdown=${o=>this._roomsStartGesture(o,e,"move")}
                    @pointermove=${e=>this._roomsGestureMove(e)}
                    @pointerup=${()=>this._roomsGestureEnd()}
                    @pointercancel=${()=>this._roomsGestureEnd()}>
                    <span class="rooms-rect-label">${l}</span>
                    ${s?["nw","ne","sw","se"].map(o=>Dt`
                      <div class="align-handle align-handle--corner rooms-handle--${o}"
                        @pointerdown=${s=>this._roomsStartGesture(s,e,"resize",o)}
                        @pointermove=${e=>this._roomsGestureMove(e)}
                        @pointerup=${()=>this._roomsGestureEnd()}
                        @pointercancel=${()=>this._roomsGestureEnd()}>
                      </div>
                    `):It}
                  </div>`})}
              ${f?(()=>{const e=f.startPt,o=f.curPt??f.startPt,s=(e.x+o.x)/2,l=(e.y+o.y)/2,h=Math.abs(o.x-e.x),d=Math.abs(o.y-e.y);return Dt`<div class="rooms-rect rooms-rect--drawing"
                  style=${Xt({left:s+"%",top:l+"%",width:h+"%",height:d+"%"})}></div>`})():It}
            </div>
          </div>
          <div class="align-side-panel">
            <button class="align-btn ${h.drawingNew?"align-btn--armed":""}"
              style="width:auto;align-self:flex-start;padding:0 10px;gap:6px" @click=${()=>this._roomsArmDraw()}>
              <ha-icon icon="mdi:vector-square-plus"></ha-icon>
              <span>${h.drawingNew?"Click-drag on the map…":"Add room"}</span>
            </button>
            <div class="align-side-panel-divider"></div>
            <div class="section-title">Border width</div>
            <div class="align-field-row">
              <label>Normal<span>px</span></label>
              <input type="number" step="0.5" min="0" max="12" .value=${String(p.border_normal)}
                @change=${e=>this._roomsSetStyle("border_normal",e.target.value)} />
            </div>
            <div class="align-field-row">
              <label>Selected<span>px</span></label>
              <input type="number" step="0.5" min="0" max="12" .value=${String(p.border_selected)}
                @change=${e=>this._roomsSetStyle("border_selected",e.target.value)} />
            </div>
            <div class="align-side-panel-divider"></div>
            ${m&&_?Dt`
              <div class="section-title">${this._roomDisplayName(m)}</div>
              ${["x","y","w","h"].map(e=>Dt`
                <div class="align-field-row">
                  <label>${{x:"Centre X",y:"Centre Y",w:"Width",h:"Height"}[e]}<span>%</span></label>
                  <input type="number" step="0.1" min=${"w"===e||"h"===e?1:0} max="100"
                    .value=${String(Math.round(10*_[e])/10)}
                    @change=${o=>this._roomsSetGeom(m,e,o.target.value)} />
                </div>`)}
              ${_.isNew?Dt`
                <div class="align-field-row align-field-row--color">
                  <label>Key</label>
                  <input type="text" class="align-color-text" .value=${m}
                    @change=${e=>this._roomsRenameKey(m,e.target.value)} />
                </div>
              `:It}
              <div class="align-field-row align-field-row--color">
                <label>Area</label>
                <select class="align-color-text"
                  @change=${e=>this._roomsSetAreaId(m,e.target.value)}>
                  <option value="">— not mapped —</option>
                  ${[...u].sort((e,o)=>e.name.localeCompare(o.name)).map(e=>Dt`
                    <option value=${e.area_id} ?selected=${e.area_id===_.areaId}>${e.name}</option>
                  `)}
                </select>
              </div>
              ${_.isNew?Dt`
                <button class="align-btn" style="width:auto;align-self:flex-start;padding:0 10px;gap:6px"
                  @click=${()=>this._roomsRequestDelete(m)}>
                  <ha-icon icon="mdi:delete"></ha-icon><span>Delete room</span>
                </button>
              `:Dt`<div class="rooms-side-note">A config-defined room's key can't be renamed or deleted here — use the Config editor.</div>`}
            `:Dt`<div class="rooms-side-note">Click a room to select it, or "Add room" to draw a new one.</div>`}
          </div>
        </div>
        ${this._roomsDeleteConfirm?Dt`
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
        `:It}
    `}_renderFloorplanTool(e){const o=this._floorplanMode,s=this._alignReadOnly(),l=this._homeCalibEligible(e),h=this._recropEligible(e);return Dt`
      <div class="ve-subtab-row">
        <button class="ve-subtab ${"geo"===o?"on":""}"
          @click=${()=>this._setFloorplanMode("geo")}>${h?"Re-crop":"Geometry"}</button>
        <button class="ve-subtab ${"calib"===o?"on":""}" ?disabled=${s}
          title=${s?"Read-only — aligned by home frame, nothing to calibrate":""}
          @click=${()=>this._setFloorplanMode("calib")}>Calibrate (2+ points)</button>
        ${l?Dt`
          <button class="ve-subtab ${"home"===o?"on":""}"
            @click=${()=>this._setFloorplanMode("home")}>Home frame</button>
        `:It}
      </div>
      ${"calib"===o?this._renderFloorplanCalibTool(e):"home"===o?this._renderFloorplanHomeTool(e):h?this._renderRecropTool(e):this._renderFloorplanGeoTool(e)}
    `}_renderFloorplanGeoTool(e){const{w:o,h:s}=this._alignSceneSize(),l=e.draft,h=s/o,corner=(e,d)=>this._alignCornerPct(l,e,d,o,s,h),d=corner(0,0),p=corner(1,0),u=corner(0,1),m=corner(1,1),_={x:50+l.offset_x,y:50+l.offset_y},f=this._alignCornerPct(l,.5,-.18/h,o,s,h),v=this._config.vacuums.filter(o=>resolveImageBaseSrc(this._config,o)===e.floorplan&&this._intAttrs(o));return Dt`
        <div class="align-body">
          <div class="align-canvas"
            @wheel=${e=>this._alignWheel(e)}
            @pointerdown=${e=>this._alignBgPointerDown(e)}
            @pointermove=${e=>this._alignBgPointerMove(e)}
            @pointerup=${e=>this._alignBgPointerUp(e)}
            @pointercancel=${e=>this._alignBgPointerUp(e)}>
            <div class="align-scene" style=${Xt({width:o+"px",height:s+"px",transform:this._alignViewTransformCss()})}>
              ${v.map(e=>{const o=this._mapEntityFor(e),s=o?this._tinted(this._mapUrl(o),this._color(e)):null,l=this._effectiveSeat(e);return Dt`
                  <div class="align-ghost">
                    ${s?Dt`<img class="align-seat-img" src=${s} alt=""
                        style=${Xt({left:50+l.offset_x+"%",top:50+l.offset_y+"%",width:l.scale+"%",transform:"translate(-50%,-50%) "+seatRotateScaleCss(l.rotation,l.scale,l.scaleY)})} />`:It}
                    ${this._renderIntegrationOverlay(e,l,"both")}
                  </div>`})}
              <div class="align-seat-layer"
                @pointerdown=${e=>this._floorGeoStartGesture(e,"drag")}
                @pointermove=${e=>this._floorGeoGestureMove(e)}
                @pointerup=${e=>this._floorGeoGestureEnd(e)}
                @pointercancel=${e=>this._floorGeoGestureEnd(e)}>
                <img class="align-seat-img" src=${e.floorplan} alt="Floorplan"
                  @load=${this._onFloorplanLoad}
                  style=${Xt({left:50+l.offset_x+"%",top:50+l.offset_y+"%",width:l.scale+"%",transform:"translate(-50%,-50%) rotate("+l.rotation+"deg)"})} />
              </div>
              <svg class="align-gizmo" viewBox="0 0 100 100" preserveAspectRatio="none">
                <line x1=${_.x} y1=${_.y} x2=${f.x} y2=${f.y} class="align-gizmo-arm" />
                <polygon points="${d.x},${d.y} ${p.x},${p.y} ${m.x},${m.y} ${u.x},${u.y}" class="align-gizmo-box" />
              </svg>
              ${[["nw",d],["ne",p],["se",m],["sw",u]].map(([e,o])=>Dt`
                <div class="align-handle align-handle--corner" data-corner=${e}
                  style=${Xt({left:o.x+"%",top:o.y+"%"})}
                  @pointerdown=${o=>{const s="nw"===e?m:"ne"===e?u:"se"===e?d:p;this._floorGeoStartGesture(o,"scale",s)}}
                  @pointermove=${e=>this._floorGeoGestureMove(e)}
                  @pointerup=${e=>this._floorGeoGestureEnd(e)}
                  @pointercancel=${e=>this._floorGeoGestureEnd(e)}>
                </div>
              `)}
              <div class="align-axis-hint align-axis-hint--x" title="Offset X"
                style=${Xt({left:_.x+7+"%",top:_.y+"%"})}>
                <ha-icon icon="mdi:arrow-left-right"></ha-icon>
              </div>
              <div class="align-axis-hint align-axis-hint--y" title="Offset Y"
                style=${Xt({left:_.x+"%",top:_.y-7+"%"})}>
                <ha-icon icon="mdi:arrow-up-down"></ha-icon>
              </div>
              <div class="align-handle align-handle--rotate"
                style=${Xt({left:f.x+"%",top:f.y+"%"})}
                @pointerdown=${e=>this._floorGeoStartGesture(e,"rotate",_)}
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
              <input type="number" step="0.1" .value=${String(Math.round(100*l.rotation)/100)}
                @change=${e=>this._floorGeoSetField("rotation",e.target.value)} />
            </div>
            <div class="align-field-row">
              <label>Scale<span>%</span></label>
              <input type="number" step="0.1" min="1" .value=${String(Math.round(100*l.scale)/100)}
                @change=${e=>this._floorGeoSetField("scale",e.target.value)} />
            </div>
            <div class="align-field-row">
              <label>Offset ↔<span>%</span></label>
              <input type="number" step="0.01" .value=${String(Math.round(1e4*l.offset_x)/1e4)}
                @change=${e=>this._floorGeoSetField("offset_x",e.target.value)} />
            </div>
            <div class="align-field-row">
              <label>Offset ↕<span>%</span></label>
              <input type="number" step="0.01" .value=${String(Math.round(1e4*l.offset_y)/1e4)}
                @change=${e=>this._floorGeoSetField("offset_y",e.target.value)} />
            </div>
            <div class="rooms-side-note">Drag the floorplan itself, or a corner/rotate handle. Every vacuum
              sharing this floorplan is shown dimmed underneath, unedited, as a reference.</div>
            ${this._renderFloorplanSnapshotSection(e)}
          </div>
        </div>
    `}_renderRecropTool(e){const{w:o,h:s}=this._alignSceneSize(),l=this._recropDraft,h=this._recropOldCrop(e),d=this._recropGhostVacuums(),p=d[0],u=p?this._roomsFor(p):[],corner=(e,h)=>this._alignCornerPct(l,e,h,o,s),m=corner(0,0),_=corner(1,0),f=corner(0,1),v=corner(1,1),b=h?function canvasScaleForCrop(e,o){if(!e||!o)return null;const s=o.x1-o.x0,l=o.y1-o.y0;if(!(s>0&&l>0&&e.w>0&&e.h>0))return null;if(Math.abs(e.w-s)<=2&&Math.abs(e.h-l)<=2)return 1;const h=e.w/e.h,d=s/l;return Math.abs(h/d-1)>.003?null:(e.w/s+e.h/l)/2}(this._recropNat,h):null;return Dt`
        <div class="align-body">
          <div class="align-canvas"
            @wheel=${e=>this._alignWheel(e)}
            @pointerdown=${e=>this._alignBgPointerDown(e)}
            @pointermove=${e=>this._alignBgPointerMove(e)}
            @pointerup=${e=>this._alignBgPointerUp(e)}
            @pointercancel=${e=>this._alignBgPointerUp(e)}>
            <div class="align-scene" style=${Xt({width:o+"px",height:s+"px",transform:this._alignViewTransformCss()})}>
              <img class="align-floorplan-img" src=${e.floorplan} alt="Floorplan"
                @load=${e=>{const o=e.target;o.naturalWidth&&o.naturalHeight&&(this._recropNat?.w!==o.naturalWidth||this._recropNat?.h!==o.naturalHeight)&&(this._recropNat={w:o.naturalWidth,h:o.naturalHeight})}} />
              ${h&&d.length?Dt`
                <div class="recrop-ghost"
                  style=${Xt({transform:`translate(${l.offset_x}%, ${l.offset_y}%) scale(${l.scale/100})`})}
                  @pointerdown=${e=>this._recropStartGesture(e,"drag")}
                  @pointermove=${e=>this._recropGestureMove(e)}
                  @pointerup=${e=>this._recropGestureEnd(e)}
                  @pointercancel=${e=>this._recropGestureEnd(e)}>
                  ${u.map(e=>null==e.map_x||null==e.map_y||null==e.map_w||null==e.map_h?It:Dt`
                    <div class="rooms-rect recrop-rect"
                      style=${Xt({left:e.map_x+"%",top:e.map_y+"%",width:e.map_w+"%",height:e.map_h+"%"})}>
                      <span class="rooms-rect-label">${e.name??e.key}</span>
                    </div>
                  `)}
                  ${d.map(e=>this._renderHomeFrameOverlay(e,h,"both"))}
                </div>
                <svg class="align-gizmo" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <polygon points="${m.x},${m.y} ${_.x},${_.y} ${v.x},${v.y} ${f.x},${f.y}" class="align-gizmo-box" />
                </svg>
                ${[["nw",m],["ne",_],["se",v],["sw",f]].map(([e,o])=>Dt`
                  <div class="align-handle align-handle--corner" data-corner=${e}
                    style=${Xt({left:o.x+"%",top:o.y+"%"})}
                    @pointerdown=${o=>{const s="nw"===e?v:"ne"===e?f:"se"===e?m:_;this._recropStartGesture(o,"scale",s)}}
                    @pointermove=${e=>this._recropGestureMove(e)}
                    @pointerup=${e=>this._recropGestureEnd(e)}
                    @pointercancel=${e=>this._recropGestureEnd(e)}>
                  </div>
                `)}
              `:It}
            </div>
          </div>
          <div class="align-side-panel">
            ${h?d.length?It:Dt`
              <div class="rooms-side-note">No vacuum is currently registered into this home frame — there's
                nothing live to drag against right now. Re-open this tool once at least one is back online.</div>
            `:Dt`
              <div class="rooms-side-note">No usable <code>crop_box</code> found on this floorplan — nothing
                to re-crop.</div>
            `}
            ${this._recropNat&&h?Dt`
              <div class="rooms-side-note">
                ${null==b?Dt`⚠️ This file (${this._recropNat.w}×${this._recropNat.h}px) no longer matches its
                      recorded crop (${Math.round(h.x1-h.x0)}×${Math.round(h.y1-h.y0)}px)
                      — it was re-cropped or re-exported at a different extent. Drag/scale the rooms below onto
                      their real spots in the picture, then Save.`:Math.abs(b-1)<.01?Dt`✅ This file still matches its recorded crop exactly.`:Dt`ℹ️ This file is a ${b.toFixed(2)}× uniform re-export of its recorded crop —
                        still valid, no re-crop needed.`}
              </div>
            `:It}
            <div class="align-field-row">
              <label>Shift ↔<span>%</span></label>
              <input type="number" step="0.01" .value=${String(Math.round(1e4*l.offset_x)/1e4)}
                @change=${e=>this._recropSetField("offset_x",e.target.value)} />
            </div>
            <div class="align-field-row">
              <label>Shift ↕<span>%</span></label>
              <input type="number" step="0.01" .value=${String(Math.round(1e4*l.offset_y)/1e4)}
                @change=${e=>this._recropSetField("offset_y",e.target.value)} />
            </div>
            <div class="align-field-row">
              <label>Scale<span>%</span></label>
              <input type="number" step="0.1" min="1" .value=${String(Math.round(100*l.scale)/100)}
                @change=${e=>this._recropSetField("scale",e.target.value)} />
            </div>
            <div class="rooms-side-note">The picture stays fixed — drag/scale the rooms &amp; robots on top of
              it instead, until they sit exactly where they really are, then Save. This recomputes
              <code>crop_box</code> alone; nothing else about this floorplan changes.</div>
            ${this._renderFloorplanSnapshotSection(e)}
          </div>
        </div>
    `}_renderFloorplanSnapshotSection(e){const o=this._alignVac(),s=o?.name||o?.entity||"this vacuum",l=this._floorplanSnapshotServiceAvailable();return Dt`
      <div class="align-side-panel-divider"></div>
      <div class="section-title">Snapshot / acquisition</div>
      <button class="align-btn" style="width:auto;padding:0 10px;gap:6px"
        ?disabled=${this._floorplanSnapshotBusy||!l||!o||!this._mapEntityFor(o)}
        @click=${()=>this._snapshotMapAsFloorplan()}>
        <ha-icon icon="mdi:camera"></ha-icon>
        <span>${this._floorplanSnapshotBusy?"Snapshotting…":`Re-snapshot ${s}'s map as floorplan`}</span>
      </button>
      <div class="rooms-side-note">Replaces this floorplan's Image src with a fresh capture of
        ${s}'s current map, re-places its own rooms onto the new crop by name, and turns
        "Hide vacuum map" on for every vacuum sharing this floorplan. Geometry above and any
        existing calibration are carried through unchanged — re-align/re-calibrate afterwards
        if the new capture doesn't line up.</div>
      ${this._floorplanSnapshotError?Dt`<div class="floor-calib-error">${this._floorplanSnapshotError}</div>`:It}
      ${this._placeRoomsResult?Dt`
        <div class="rooms-side-note">✅ Rooms placed: <strong>${this._placeRoomsResult.placed}</strong> updated,
          <strong>${this._placeRoomsResult.added}</strong> added.</div>
      `:It}
      <button class="align-btn" style="width:auto;padding:0 10px;gap:6px"
        ?disabled=${this._homeFrameSnapshotBusy||!l}
        @click=${()=>this._snapshotHomeFrameAsFloorplan()}>
        <ha-icon icon="mdi:home-map-marker"></ha-icon>
        <span>${this._homeFrameSnapshotBusy?"Snapshotting…":"Re-snapshot home frame as floorplan"}</span>
      </button>
      <div class="rooms-side-note">Replaces this floorplan's Image src with a fresh composite of every
        vacuum currently registered into the shared home frame. No room placement (home-frame rooms
        compute live) — just the image and its identity crop.</div>
      ${this._homeFrameSnapshotError?Dt`<div class="floor-calib-error">${this._homeFrameSnapshotError}</div>`:It}
      <div class="align-side-panel-divider"></div>
      <button class="align-btn" style="width:auto;padding:0 10px;gap:6px"
        ?disabled=${this._guideExportBusy||!this._guideExportServiceAvailable()||!o||!this._mapEntityFor(o)}
        @click=${()=>this._exportGuideLayers()}>
        <ha-icon icon="mdi:layers-outline"></ha-icon>
        <span>${this._guideExportBusy?"Exporting…":`Export ${s}'s guide layers`}</span>
      </button>
      <div class="rooms-side-note">Renders wall/floor guide layers for a photo overlay in an external
        image editor — no config changes at all.</div>
      ${this._guideExportError?Dt`<div class="floor-calib-error">${this._guideExportError}</div>`:It}
      ${this._guideExportResult?Dt`
        <div class="rooms-side-note">✅ ${Object.keys(this._guideExportResult.paths).length} layer(s) at
          ${this._guideExportResult.size.w}×${this._guideExportResult.size.h}px:
          ${Object.entries(this._guideExportResult.paths).map(([e,o])=>Dt`
            <div><code>${e}</code>: ${o}</div>
          `)}
        </div>
      `:It}
    `}_floorCalibCanvasPointerDown(e){"calib"===this._floorplanMode&&"floor"===this._floorCalib?.phase?(this._alignRefocusOverlay(),this._floorCalibDragStart={pointerId:e.pointerId,x0:e.clientX,y0:e.clientY},this._alignBgPointerDown(e)):this._alignBgPointerDown(e)}_floorCalibCanvasPointerMove(e){this._alignBgPointerMove(e)}_floorCalibCanvasPointerUp(e){const o=this._floorCalibDragStart;this._floorCalibDragStart=null,this._alignBgPointerUp(e),o&&o.pointerId===e.pointerId&&Math.hypot(e.clientX-o.x0,e.clientY-o.y0)<=12&&this._floorCalibFloorClick(e)}_homeCalibCanvasPointerDown(e){"home"===this._floorplanMode&&"floor"===this._homeCalib?.phase?(this._alignRefocusOverlay(),this._homeCalibDragStart={pointerId:e.pointerId,x0:e.clientX,y0:e.clientY},this._alignBgPointerDown(e)):this._alignBgPointerDown(e)}_homeCalibCanvasPointerMove(e){this._alignBgPointerMove(e)}_homeCalibCanvasPointerUp(e){const o=this._homeCalibDragStart;this._homeCalibDragStart=null,this._alignBgPointerUp(e),o&&o.pointerId===e.pointerId&&Math.hypot(e.clientX-o.x0,e.clientY-o.y0)<=12&&this._onHomeCalibFloorClick(e)}_renderFloorplanCalibTool(e){const{w:o,h:s}=this._alignSceneSize(),l=e.draft,h=this._floorCalib,d=this._alignVac(),p=d?this._mapEntityFor(d):void 0,u=p?this._mapUrl(p):null,m=this._alignReadOnly(),_=h?Math.min(h.rawPts.length,h.floorPts.length):0,f=h?this._floorCalibPreview(h):null,v=!!h&&h.rawPts.length>=6,b=!h||"raw"===h.phase;return Dt`
        <div class="align-body">
          <div class="align-canvas"
            @wheel=${e=>this._alignWheel(e)}
            @pointerdown=${e=>this._floorCalibCanvasPointerDown(e)}
            @pointermove=${e=>this._floorCalibCanvasPointerMove(e)}
            @pointerup=${e=>this._floorCalibCanvasPointerUp(e)}
            @pointercancel=${e=>this._floorCalibCanvasPointerUp(e)}>
            <div class="align-scene" style=${Xt({width:o+"px",height:s+"px",transform:this._alignViewTransformCss()})}>
              <img class="align-seat-img" src=${e.floorplan} alt="Floorplan"
                @load=${this._onFloorplanLoad}
                style=${Xt({left:50+l.offset_x+"%",top:50+l.offset_y+"%",width:l.scale+"%",transform:"translate(-50%,-50%) rotate("+l.rotation+"deg)"})} />
              ${(h?.floorPts??[]).map((e,o)=>Dt`
                <div class="calib-marker" style=${Xt({left:e.x+"%",top:e.y+"%"})}>${o+1}</div>
              `)}
            </div>
          </div>
          <div class="align-side-panel">
            ${m?Dt`
              <div class="rooms-side-note">Read-only — this vacuum is aligned by the home frame, there's
                nothing to calibrate here.</div>
            `:h?Dt`
              <div class="floor-calib-banner ${b?"floor-calib-banner--raw":"floor-calib-banner--floor"}">
                ${b?v?Dt`<strong>${6} points</strong> — that's the max. Save below, or undo a point.`:Dt`<strong>Point ${_+1}:</strong> click a distinctive spot (e.g. a room corner)
                        on this vacuum's OWN map below.`:Dt`<strong>Point ${_+1}:</strong> click the SAME physical point on the floorplan
                    on the left — zoom/pan it first if you need to.`}
                ${f?Dt`<div>Fit error with ${_} point${1===_?"":"s"}:
                  <strong>${f.residual_pct}%</strong></div>`:It}
              </div>
              <div class="section-title">This vacuum's own map</div>
              ${u?Dt`
                <div class="floor-calib-inset ${b?"floor-calib-inset--active":""}"
                  @click=${e=>this._floorCalibRawClick(e)}>
                  <img src=${u} alt="Vacuum map"
                    @load=${e=>{const o=e.target;o.naturalWidth&&o.naturalHeight&&(this._floorCalibRefNat?.w!==o.naturalWidth||this._floorCalibRefNat?.h!==o.naturalHeight)&&(this._floorCalibRefNat={w:o.naturalWidth,h:o.naturalHeight})}} />
                  ${h.rawPts.map((e,o)=>this._floorCalibRefNat?Dt`
                    <div class="calib-marker" style=${Xt({left:e.x/this._floorCalibRefNat.w*100+"%",top:e.y/this._floorCalibRefNat.h*100+"%"})}>${o+1}</div>
                  `:It)}
                </div>
              `:Dt`<div class="rooms-side-note">No map image for this vacuum right now.</div>`}
              <div class="align-side-panel-divider"></div>
              <div style="display:flex;gap:8px;flex-wrap:wrap">
                ${h.rawPts.length>0||h.floorPts.length>0?Dt`
                  <button class="align-btn" style="width:auto;padding:0 10px;gap:6px" @click=${()=>this._floorCalibUndoPoint()}>
                    <ha-icon icon="mdi:undo"></ha-icon><span>Undo point</span>
                  </button>
                `:It}
                <button class="align-btn" style="width:auto;padding:0 10px;gap:6px" @click=${()=>this._floorCalibCancel()}>
                  <ha-icon icon="mdi:close"></ha-icon><span>Cancel</span>
                </button>
              </div>
              ${this._floorCalibError?Dt`
                <div class="floor-calib-error">${this._floorCalibError}</div>
              `:It}
              <div class="align-side-panel-divider"></div>
              <div class="rooms-side-note">Click the SAME physical point twice — once on this vacuum's own
                map, once on the floorplan — for at least 2 pairs (up to ${6}). More,
                well-spread pairs average out click imprecision. Save writes a manual seat for THIS vacuum
                only — other vacuums sharing this floorplan are unaffected.</div>
            `:It}
          </div>
        </div>
    `}_renderFloorplanHomeTool(e){const{w:o,h:s}=this._alignSceneSize(),l=e.draft,h=this._homeCalib,d=this._floorplanCardImageBase(),p=d?.home_anchors,u=h?Math.min(h.homePts.length,h.floorPts.length):0,m=h?this._homeCalibPreview(h):null,_=!!h&&h.homePts.length>=6,f=!h||"frame"===h.phase,v=this._homeCalibCrop;return Dt`
        <div class="align-body">
          <div class="align-canvas"
            @wheel=${e=>this._alignWheel(e)}
            @pointerdown=${e=>this._homeCalibCanvasPointerDown(e)}
            @pointermove=${e=>this._homeCalibCanvasPointerMove(e)}
            @pointerup=${e=>this._homeCalibCanvasPointerUp(e)}
            @pointercancel=${e=>this._homeCalibCanvasPointerUp(e)}>
            <div class="align-scene" style=${Xt({width:o+"px",height:s+"px",transform:this._alignViewTransformCss()})}>
              <img class="align-seat-img" src=${e.floorplan} alt="Floorplan"
                @load=${this._onFloorplanLoad}
                style=${Xt({left:50+l.offset_x+"%",top:50+l.offset_y+"%",width:l.scale+"%",transform:"translate(-50%,-50%) rotate("+l.rotation+"deg)"})} />
              ${(h?.floorPts??[]).map((e,o)=>Dt`
                <div class="calib-marker" style=${Xt({left:e.x+"%",top:e.y+"%"})}>${o+1}</div>
              `)}
            </div>
          </div>
          <div class="align-side-panel">
            ${h?Dt`
              <div class="floor-calib-banner ${f?"floor-calib-banner--raw":"floor-calib-banner--floor"}">
                ${f?_?Dt`<strong>${6} points</strong> — that's the max. Save below, or undo a point.`:Dt`<strong>Point ${u+1}:</strong> click a distinctive spot (e.g. a wall corner)
                        on the home frame below.${this._homeCalibBusy?" Snapping…":""}`:Dt`<strong>Point ${u+1}:</strong> click the SAME physical point on the floorplan
                    on the left — zoom/pan it first if you need to.`}
                ${m?Dt`<div>Fit error with ${u} point${1===u?"":"s"}:
                  <strong>${m.residual_pct}%</strong></div>`:It}
              </div>
              <div class="section-title">Home frame (live snapshot)</div>
              <div class="floor-calib-inset ${f?"floor-calib-inset--active":""}"
                @click=${e=>this._onHomeCalibFrameClick(e)}>
                <img src=${this._homeCalibSnapshotUrl} alt="Home frame" />
                ${v?h.homePts.map((e,o)=>Dt`
                  <div class="calib-marker" style=${Xt({left:(e.x-v.x0)/(v.x1-v.x0)*100+"%",top:(e.y-v.y0)/(v.y1-v.y0)*100+"%"})}>${o+1}</div>
                `):It}
              </div>
              <div class="align-side-panel-divider"></div>
              <div style="display:flex;gap:8px;flex-wrap:wrap">
                ${h.homePts.length>0||h.floorPts.length>0?Dt`
                  <button class="align-btn" style="width:auto;padding:0 10px;gap:6px" @click=${()=>this._undoHomeCalibPoint()}>
                    <ha-icon icon="mdi:undo"></ha-icon><span>Undo point</span>
                  </button>
                `:It}
                <button class="align-btn" style="width:auto;padding:0 10px;gap:6px" @click=${()=>this._cancelHomeCalibration()}>
                  <ha-icon icon="mdi:close"></ha-icon><span>Cancel</span>
                </button>
              </div>
              ${this._homeCalibError?Dt`
                <div class="floor-calib-error">${this._homeCalibError}</div>
              `:It}
              <div class="align-side-panel-divider"></div>
              <div class="rooms-side-note">Click the SAME physical point twice — once on the home frame,
                once on the floorplan — for at least 2 pairs (up to ${6}). Save
                calibrates the WHOLE shared floorplan — every vacuum registered into this home frame draws
                through it automatically, no per-vacuum seating needed.</div>
            `:Dt`
              ${p?.length?Dt`
                <div class="rooms-side-note">Calibrated: <strong>${p.length}</strong>
                  anchor point${p.length>1?"s":""} against frame
                  <code>${d?.home_anchors_frame_id}</code>
                  <span class="footer-link" style="margin-left:6px" @click=${()=>this._clearHomeAnchors()}>Clear</span>
                </div>
              `:It}
              ${this._homeCalibResult?Dt`
                <div class="rooms-side-note">✅ Calibrated — fit error ${this._homeCalibResult.residual_pct}%.</div>
              `:It}
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
              ${this._homeCalibError?Dt`<div class="floor-calib-error">${this._homeCalibError}</div>`:It}
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
                ${this._fiducialSnapshotPath?Dt`If this floorplan's Image src isn't already
                  <code>${this._fiducialSnapshotPath}</code>, set it from the Config editor's Global tab
                  first.`:It}
                Then crop, resize and/or rotate that file in an external image editor as needed (GIMP etc.),
                keep it as PNG, don't flatten it, and run step 2.</div>
              ${this._fiducialSnapshotError?Dt`<div class="floor-calib-error">${this._fiducialSnapshotError}</div>`:It}
              ${this._fiducialKnown?Dt`
                <button class="align-btn" style="width:auto;padding:0 10px;gap:6px"
                  ?disabled=${this._fiducialDetectBusy}
                  @click=${()=>this._detectFiducials()}>
                  <ha-icon icon="mdi:crosshairs-gps"></ha-icon>
                  <span>${this._fiducialDetectBusy?"Detecting…":"2. Detect markers in edited file"}</span>
                </button>
                <div class="rooms-side-note">Scans the floorplan's current Image src for the markers step 1
                  embedded and, once at least 2 of the 4 are found, calibrates from them — no clicking.</div>
                ${this._fiducialDetectError?Dt`<div class="floor-calib-error">${this._fiducialDetectError}</div>`:It}
                ${this._fiducialDetectResult?Dt`
                  <div class="rooms-side-note">✅ Found ${this._fiducialDetectResult.found}/4
                    marker${1===this._fiducialDetectResult.found?"":"s"}${this._fiducialDetectResult.missing.length?Dt` (missing: ${this._fiducialDetectResult.missing.join(", ")})`:It}.</div>
                `:It}
              `:It}
            `}
          </div>
        </div>
    `}_renderVePlaceholder(e){return Dt`
      <div class="align-body ve-placeholder-body">
        <div class="ve-placeholder">
          <ha-icon icon="mdi:hammer-wrench"></ha-icon>
          <div class="ve-placeholder-title">Floorplan & Calibrate — not available here</div>
          <div class="ve-placeholder-sub">${e}</div>
        </div>
      </div>
    `}_veHexColorField(e,o,s,l,h){const d=/^#[0-9a-fA-F]{6}$/.test(o??"")?o:h;return Dt`
      <div class="align-field-row align-field-row--color">
        <label>${e}</label>
        <div class="align-color-row">
          <input type="color" class="align-color-swatch" .value=${d} ?disabled=${s}
            @input=${e=>l(e.target.value)} />
          <input type="text" class="align-color-text" .value=${o??""} placeholder=${h} ?disabled=${s}
            @change=${e=>l(e.target.value)} />
        </div>
      </div>`}_alignSetAppearanceField(e,o){const s=this._alignSession;s&&!this._alignReadOnly()&&s.appearanceDraft[e]!==o&&(this._alignSession={...s,appearanceDraft:{...s.appearanceDraft,[e]:o}})}_homeFrameCropFor(e){if(this._memoSync(),this._homeFrameMemo.has(e.entity))return this._homeFrameMemo.get(e.entity);const o=function homeFrameCropFor(e,o,s){const l="merged"===e.map_mode?e.image_base:o?.image_base,h=l?.crop_box;if(!h?.frame_id||null==h.x1||null==h.y1)return null;const d=s?.home_frame;return d?.id&&d.id===h.frame_id?{x0:h.x0,y0:h.y0,x1:h.x1,y1:h.y1}:null}(this._config,e,this._intAttrs(e));return this._homeFrameMemo.set(e.entity,o),o}_homeFrameDims(){const e=this._config.image_base?.home_anchors_frame_id,o=this._homeFrameRegistry();if(e){const s=o.get(e);if(s)return{NW:s.w,NH:s.h}}let s=null;for(const e of o.values())(!s||e.count>s.count)&&(s=e);return s?{NW:s.w,NH:s.h}:null}_homeFrameRegistry(){const e=new Map;for(const o of this._config.vacuums??[]){const s=this._intAttrs(o)?.home_frame;if(!(s?.id&&s.width_px>0&&s.height_px>0))continue;const l=e.get(s.id);l?l.count++:e.set(s.id,{w:s.width_px,h:s.height_px,count:1})}return e}_anyHomeFrameCard(){const e=this._homeFrameRegistry();let o=null;for(const[s,l]of e)(!o||l.count>o.count)&&(o={id:s,...l});return o?{id:o.id,w:o.w,h:o.h}:null}_homeAnchorFitFor(e,o){if("merged"!==this._config.map_mode)return null;if(this._homeFrameCropFor(e))return null;if(!this._intAttrs(e)?.home_frame)return null;const s=this._config.image_base?.home_anchors,l=this._homeFrameDims(),h=homeAnchorFit(s,l,o);return h&&l?{fit:h,dims:l}:null}_renderIntegrationOverlay(e,o,s="both"){const l=mergeLive(this._intAttrs(e));if(!l)return It;const h=l.image_dims;if(!h)return It;const d=h.scale??1;let p=(h.width??0)*d,u=(h.height??0)*d;const m=h.rotation??0;if(90===m||270===m){const e=p;p=u,u=e}if(!p||!u)return It;const _=Math.max(p,u)/55,f=l.vacuum_position_px,v=f?{x:f.x,y:f.y}:null;let b=null;if(v&&null!=f.a){const e=f.a*Math.PI/180;b={x:v.x+1.3*_*Math.cos(e),y:v.y-1.3*_*Math.sin(e)}}const w={left:50+(o?.offset_x??0)+"%",top:50+(o?.offset_y??0)+"%",width:(o?.scale??100)+"%",aspectRatio:p+" / "+u,transform:"translate(-50%,-50%) "+seatRotateScaleCss(o?.rotation??0,o?.scale??100,o?.scaleY)},$=this._renderVectorLayers(e,{dry:this._vecSegs(l.path_dry_px),wet:this._vecSegs(l.path_wet_px),rob:v,head:b,rr:_,digits:1,pose:f?f.x+","+f.y:"",imageRot:(f&&null!=f.a?f.a:0)+(e.robot_image_rotation??0),filterId:"avc-err-blur-"+e.entity.replace(/[^a-zA-Z0-9]/g,"-"),scaleYRatio:seatScaleYRatio(o?.scale??100,o?.scaleY),sp:this._spMarks(e,e=>e.px,e=>({x:e.x/100*p,y:e.y/100*u}))},s);return Dt`<svg class="map-vector" viewBox="0 0 ${p} ${u}" preserveAspectRatio="none" style=${Xt(w)}>${$}</svg>`}_spMarks(e,o,s,l=!1){const h=[],d=this._spSet,p=d&&this._config.vacuums[d.idx]?.entity===e.entity?d:null;for(const s of this._servicePoints(e)){if(p?.point&&p.from===s.name)continue;const e=o(s);e&&Number.isFinite(e.x)&&Number.isFinite(e.y)&&h.push({pt:{x:e.x,y:e.y},name:s.name})}return p?.point&&"home"===p.point.frame===l&&h.push({pt:s(p.point),pending:!0,name:p.name}),h}_vecSegs(e,o){return Array.isArray(e)?e.map(e=>Array.isArray(e)?o?e.map(o):e:[]):[]}_renderVectorLayers(e,o,s){const{rob:l,head:h,rr:d,digits:p}=o,u=(o.sp??[]).length&&"paths"!==s?Nt`${(o.sp??[]).map(({pt:e,pending:o,name:s})=>{const l=.95*d,h=1.25*l/24,u=-this._mapRotationDeg();return Nt`<g class="avc-sp ${o?"avc-sp--pending":""}" transform=${"translate("+e.x.toFixed(p)+" "+e.y.toFixed(p)+")"}>
            ${s?Nt`<title>${s}</title>`:It}
            ${o?Nt`<circle class="avc-sp-ring" r=${(1.6*l).toFixed(2)} fill="none" stroke="#E0A84A" stroke-width=${(.2*d).toFixed(2)}></circle>`:It}
            <circle r=${l.toFixed(2)} fill="#E0A84A" stroke="#ffffff" stroke-width=${(.16*d).toFixed(2)}></circle>
            <path d="M-5 9V-9M-5 -9h10l-2.5 4L5 -1H-5" transform=${"rotate("+u+") scale("+h.toFixed(4)+")"} fill="none" stroke="#2a1d05" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"></path>
          </g>`})}`:It,m=this._color(e),_=this._vacCleanType(e),f=this._layersEff(),v=f.dry&&_.dry?o.dry.map(e=>fmtPts(e,p)).filter(e=>e.length>0):[],b=f.wet&&_.wet?o.wet.map(e=>fmtPts(e,p)).filter(e=>e.length>0):[],w=.35*d*((e.path_width??100)/100),$=w.toFixed(2),C=(2.6*w*((e.mop_band_width??100)/100)).toFixed(2),A=((e.mop_band_opacity??28)/100).toFixed(2),F=e.mop_path_color||"#40a9ff",E=b.length?Nt`${b.map(e=>Nt`<polyline points=${e} fill="none" stroke=${F} stroke-width=${C} stroke-linejoin="round" stroke-linecap="round" opacity=${A}></polyline>`)}`:It,T=b.length?Nt`${b.map(e=>Nt`<polyline points=${e} fill="none" stroke=${F} stroke-width=${$} stroke-linejoin="round" stroke-linecap="round" opacity="0.9"></polyline>`)}`:It,O=e.path_color||m,B="legacy"!==(this._config.theme??re),q=(3*w).toFixed(2),j=v.length?Nt`${B?v.map(e=>Nt`<polyline points=${e} fill="none" stroke=${O} stroke-width=${q} stroke-linejoin="round" stroke-linecap="round" opacity="0.12"></polyline>`):It}${v.map(e=>Nt`<polyline points=${e} fill="none" stroke=${O} stroke-width=${$} stroke-linejoin="round" stroke-linecap="round" opacity="0.85"></polyline>`)}`:It,G=!(!e.robot_image_on_map||!e.image),U=2.6*d*((e.robot_size??100)/100),W=o.scaleYRatio??1;if(!this._themed()){const _=l?G?Nt`<image href=${e.image} x=${(l.x-U/2).toFixed(p)} y=${(l.y-U/2).toFixed(p)} width=${U.toFixed(p)} height=${U.toFixed(p)} preserveAspectRatio="xMidYMid meet" transform=${"rotate("+o.imageRot+" "+l.x.toFixed(p)+" "+l.y.toFixed(p)+")"}></image>`:Nt`${h?Nt`<line x1=${l.x.toFixed(p)} y1=${l.y.toFixed(p)} x2=${h.x.toFixed(p)} y2=${h.y.toFixed(p)} stroke="#ffffff" stroke-width=${(.3*d).toFixed(2)} stroke-linecap="round"></line>`:It}<circle cx=${l.x.toFixed(p)} cy=${l.y.toFixed(p)} r=${d.toFixed(p)} fill=${m} stroke="#ffffff" stroke-width=${(.18*d).toFixed(2)}></circle>`:It,f=l&&this._hasError(e)?Nt`<defs><filter id=${o.filterId} x="-150%" y="-150%" width="400%" height="400%">
              <feGaussianBlur stdDeviation=${(.5*d).toFixed(2)}></feGaussianBlur>
            </filter></defs>
            <circle class="avc-err-halo" cx=${l.x.toFixed(p)} cy=${l.y.toFixed(p)} r=${(2.2*d).toFixed(p)}
              fill="#ff3b30" filter=${"url(#"+o.filterId+")"}></circle>`:It,v=Nt`${f}${_}`,b=1!==W&&l?Nt`<g transform=${"translate("+l.x.toFixed(1)+","+l.y.toFixed(1)+") scale(1,"+(1/W).toFixed(4)+") translate("+(-l.x).toFixed(1)+","+(-l.y).toFixed(1)+")"}>${v}</g>`:v,w=Nt`${E}${T}${j}`;return"paths"===s?w:"marker"===s?Nt`${u}${b}`:Nt`${w}${u}${b}`}const Y=this._isCleaning(e),K=3.2*d,lastTail=e=>{for(let o=e.length-1;o>=0;o--)if(e[o].length>=2)return trailTail(e[o],K);return[]},headOf=(e,o)=>{if(e.length<2)return It;const s=fmtPts(e,p);return Nt`<polyline class="avc-trail-head-glow" points=${s} fill="none" stroke=${o} stroke-width=${(4*w).toFixed(2)} stroke-linejoin="round" stroke-linecap="round" opacity="0.3"></polyline><polyline class="avc-trail-head" points=${s} fill="none" stroke=${o} stroke-width=${(1.7*w).toFixed(2)} stroke-linejoin="round" stroke-linecap="round"></polyline>`},X=Y?Nt`${b.length?headOf(lastTail(o.wet),F):It}${v.length?headOf(lastTail(o.dry),O):It}`:It;let J=It;if(l&&"paths"!==s){const s=h?h.x-l.x:0,u=h?h.y-l.y:0,_=G?Nt`<image href=${e.image} x=${(-U/2).toFixed(p)} y=${(-U/2).toFixed(p)} width=${U.toFixed(p)} height=${U.toFixed(p)} preserveAspectRatio="xMidYMid meet" transform=${"rotate("+o.imageRot+")"}></image>`:Nt`${h?Nt`<line x1="0" y1="0" x2=${s.toFixed(p)} y2=${u.toFixed(p)} stroke="#ffffff" stroke-width=${(.3*d).toFixed(2)} stroke-linecap="round"></line>`:It}<circle class="avc-marker-dot" cx="0" cy="0" r=${d.toFixed(p)} fill=${m} stroke="#ffffff" stroke-width=${(.18*d).toFixed(2)}></circle>`,f=this._hasError(e)?Nt`<defs><filter id=${o.filterId} x="-150%" y="-150%" width="400%" height="400%">
                <feGaussianBlur stdDeviation=${(.5*d).toFixed(2)}></feGaussianBlur>
              </filter></defs>
              <circle class="avc-err-halo" cx="0" cy="0" r=${(2.2*d).toFixed(p)} fill="#ff3b30" filter=${"url(#"+o.filterId+")"}></circle>`:It,v=Y?Nt`<circle class="avc-sonar" cx="0" cy="0" r=${d.toFixed(p)} fill="none" stroke=${m} stroke-width=${(.22*d).toFixed(2)}></circle>`:It,b=Nt`${f}${v}${_}`,w=this._markerPrev.get(o.filterId),$=o.pose??"",C=!!w&&w.pose===$&&(Math.abs(w.x-l.x)>1e-6||Math.abs(w.y-l.y)>1e-6);let A=null,F=1/0;for(const[e,s]of[["dry",o.dry],["wet",o.wet]]){let o=s.length-1;for(;o>=0&&s[o].length<2;)o--;if(o<0)continue;const h=s[o],d=h[h.length-1],p=Math.hypot(d.x-l.x,d.y-l.y);p<F&&(F=p,A={layer:e,n:o+1,len:arcLength(h),seg:h})}if(C)this._markerStops.add(o.filterId);else if(w&&w.pose!==$&&this._glideS()>0){const e={x:w.x,y:w.y};let s=null;if(A){const o=w.trail,h=o&&o.layer===A.layer&&o.n===A.n?A.len-o.len:A.len;s=function traceSince(e,o,s,l,h){if(e.length<2||!(l>0))return null;let d=null,p=0;for(let s=e.length-1;s>0&&p<=l;s--){const l=closestOnEdge(e[s-1],e[s],o);(!d||l.d<d.d)&&(d={i:s,pt:l.pt,d:l.d}),p+=Math.hypot(e[s].x-e[s-1].x,e[s].y-e[s-1].y)}if(!d||d.d>h)return null;const u=[d.pt,...e.slice(d.i)],m=u[u.length-1];return Math.hypot(m.x-s.x,m.y-s.y)>1e-6&&u.push(s),u}(A.seg,e,l,Math.max(h,0)+2*d,.6*d)}this._markerMoves.set(o.filterId,{route:s??[e,{x:l.x,y:l.y}],digits:p})}this._markerPrev.set(o.filterId,{pose:$,x:l.x,y:l.y,trail:A?{layer:A.layer,n:A.n,len:A.len}:null}),J=Nt`<g class="avc-marker ${C?"avc-marker--jump":""}" data-mk=${o.filterId} style=${"transform: translate("+l.x.toFixed(p)+"px, "+l.y.toFixed(p)+"px)"}>${1!==W?Nt`<g transform=${"scale(1,"+(1/W).toFixed(4)+")"}>${b}</g>`:b}</g>`}const Q=Nt`${E}${T}${j}${X}`;return"paths"===s?Q:"marker"===s?Nt`${u}${J}`:Nt`${Q}${u}${J}`}_renderHomeFrameOverlay(e,o,s="both"){const l=mergeLive(this._intAttrs(e));if(!l)return It;const h=o.x1-o.x0,d=o.y1-o.y0;if(!(h>0&&d>0))return It;const p=Math.max(h,d)/55,local=e=>({x:e.x-o.x0,y:e.y-o.y0}),u=l.vacuum_position_home_px,m=u?local(u):null;let _=null;if(m&&null!=u.a){const e=u.a*Math.PI/180;_={x:m.x+1.3*p*Math.cos(e),y:m.y+1.3*p*Math.sin(e)}}const f=this._renderVectorLayers(e,{dry:this._vecSegs(l.path_dry_home_px,local),wet:this._vecSegs(l.path_wet_home_px,local),rob:m,head:_,rr:p,digits:1,pose:u?u.x+","+u.y:"",imageRot:(u&&null!=u.a?u.a:0)+(e.robot_image_rotation??0),filterId:"avc-hf-err-blur-"+e.entity.replace(/[^a-zA-Z0-9]/g,"-"),sp:this._spMarks(e,e=>e.home_px?local(e.home_px):null,e=>local(e),!0)},s);return Dt`<svg class="map-vector" viewBox="0 0 ${h} ${d}" preserveAspectRatio="none" style=${Xt({left:"0",top:"0",width:"100%",height:"100%"})}>${f}</svg>`}_renderHomeAnchorOverlay(e,o,s,l,h="both"){const d=mergeLive(this._intAttrs(e));if(!(d&&l>0))return It;const proj=e=>{const h=projectHomePxThroughFit(e,s,o,l);return{x:h.x,y:h.y/l}},p=Math.max(100,100/l)/55,u=d.vacuum_position_home_px,m=u?proj(u):null;let _=null;if(m&&null!=u.a){const e=(u.a+o.rotation)*Math.PI/180;_={x:m.x+1.3*p*Math.cos(e),y:m.y+1.3*p*Math.sin(e)}}const f=this._renderVectorLayers(e,{dry:this._vecSegs(d.path_dry_home_px,proj),wet:this._vecSegs(d.path_wet_home_px,proj),rob:m,head:_,rr:p,digits:2,pose:u?u.x+","+u.y:"",imageRot:(u&&null!=u.a?u.a+o.rotation:0)+(e.robot_image_rotation??0),filterId:"avc-ha-err-blur-"+e.entity.replace(/[^a-zA-Z0-9]/g,"-"),sp:this._spMarks(e,e=>e.home_px?proj(e.home_px):null,e=>proj(e),!0)},h);return Dt`<svg class="map-vector" viewBox=${"0 0 100 "+(100/l).toFixed(3)} preserveAspectRatio="none" style=${Xt({left:"0",top:"0",width:"100%",height:"100%"})}>${f}</svg>`}_onLayerDown(e){this._layerHeld=!1,this._layerHoldTimer=window.setTimeout(()=>{this._layerHeld=!0,this._layerMenu=this._layerMenu===e?null:e},380)}_onLayerUp(){null!==this._layerHoldTimer&&(window.clearTimeout(this._layerHoldTimer),this._layerHoldTimer=null)}_onLayerClick(e){if(this._layerHeld)return void(this._layerHeld=!1);const o=this._layersEff(),s={...o,[e]:!o[e]},l=this._selSensor();l&&this.hass.states[l]?.attributes?.view_layers?this._call("anyvac","set_layers",s):this._layers=s,this._layerMenu=null}_renderLayerMenu(e,o){const s=this._mergedRoomDefs(e);return Dt`
      <div class="layer-menu">
        <div class="layer-menu-head">
          <ha-icon icon=${"dry"===o?"mdi:broom":"mdi:water"}></ha-icon>
          <span>${"dry"===o?"Dry":"Wet"} \u00b7 last cleaned</span>
        </div>
        ${s.map(({r:s,v:l})=>{const h=this._intRoomRec(l,s),d=this._ageDaysFromIso(h?.[o]),p=this._isRoomSelectedAny(s.key,e);return Dt`
            <button class="layer-menu-row ${p?"on":""}" @click=${()=>this._toggleRoomAcross(s.key,e)}>
              <ha-icon icon=${s.icon??"mdi:square"}></ha-icon>
              <span class="lm-name">${s.name??s.key}</span>
              ${this._renderProgChip(this._roomProgForType(s,e,o))}
              <b style=${Xt({color:this._colorForAgeDays(d)})}>${(e=>null===e?"—":e<1?"<1d":Math.round(e)+"d")(d)}</b>
            </button>
          `})}
      </div>
    `}_oldestAgeDays(e,o){let s=null;for(const l of e){if(!this._intAttrs(l))continue;const e=this._intAttrs(l)?.rooms_last_cleaned;if(e)for(const l of Object.values(e)){const e=this._ageDaysFromIso(l?.[o]);null!==e&&(null===s||e>s)&&(s=e)}}return s}_ageBadgeStr(e){return null===e?"—":e<1?"<1d":Math.round(e)+"d"}_renderLayerToggleCompact(e){const o=e.filter(e=>this._intAttrs(e));if(!o.length)return It;const s=this._layersEff(),ageTip=e=>{const s=this._ageBadgeStr(this._oldestAgeDays(o,e));return s&&"—"!==s?` · oldest room ${s}`:""};return Dt`
      <button class="mtbtn mtbtn--icon ${s.dry?"on":""}" title="${this._t("Show dry trail — tap to toggle")}${ageTip("dry")}"
        aria-label=${this._t("Dry trail")} aria-pressed=${s.dry?"true":"false"}
        @click=${()=>this._onLayerClick("dry")}>
        <ha-icon icon="mdi:broom"></ha-icon>
      </button>
      <button class="mtbtn mtbtn--icon ${s.wet?"on":""}" title="${this._t("Show wet trail — tap to toggle")}${ageTip("wet")}"
        aria-label=${this._t("Wet trail")} aria-pressed=${s.wet?"true":"false"}
        @click=${()=>this._onLayerClick("wet")}>
        <ha-icon icon="mdi:water"></ha-icon>
      </button>
    `}_renderLayerToggles(e){const o=e.filter(e=>this._intAttrs(e));if(!o.length)return It;const oldestTip=e=>{const s=this._ageBadgeStr(this._oldestAgeDays(o,e));return s&&"—"!==s?` · oldest room ${s}`:""},s=this._layersEff();return Dt`
      <div class="layer-toggles">
        <button class="layer-btn ${s.dry?"on":""}" title="${this._t("Dry trail — tap to toggle, hold for rooms")}${oldestTip("dry")}" aria-label=${this._t("Dry trail")}
          @pointerdown=${()=>this._onLayerDown("dry")} @pointerup=${()=>this._onLayerUp()} @pointerleave=${()=>this._onLayerUp()}
          @click=${()=>this._onLayerClick("dry")}>
          <ha-icon icon="mdi:broom"></ha-icon>
        </button>
        <button class="layer-btn ${s.wet?"on":""}" title="${this._t("Wet trail — tap to toggle, hold for rooms")}${oldestTip("wet")}" aria-label=${this._t("Wet trail")}
          @pointerdown=${()=>this._onLayerDown("wet")} @pointerup=${()=>this._onLayerUp()} @pointerleave=${()=>this._onLayerUp()}
          @click=${()=>this._onLayerClick("wet")}>
          <ha-icon icon="mdi:water"></ha-icon>
        </button>
        ${this._layerMenu?this._renderLayerMenu(o,this._layerMenu):It}
      </div>
    `}_mergedRoomDefs(e){const o=e[0];if(this._config.rooms?.length&&o)return this._roomsFor(o).map(e=>({r:e,v:o}));const s=new Set,l=[];for(const o of e)for(const e of this._roomsFor(o))e.key&&!s.has(e.key)&&(s.add(e.key),l.push({r:e,v:o}));return l}_renderMergedRooms(e){const o=this._mergedRoomDefs(e),s=!o.some(({r:o})=>this._isRoomSelectedAny(o.key,e));return o.map(({r:o,v:l})=>this._renderRoomOverlay(o,l,{vacs:e,wholeHome:s}))}_renderRoomOutlines(e,o){const s=e.filter(({r:e})=>e.outline_pct&&e.outline_pct.length>=3);if(!s.length)return It;const l=Nt`${s.map(({r:e})=>{const s=this._isRoomSelectedAny(e.key,o),l=e.outline_pct.map(e=>e.x.toFixed(2)+","+e.y.toFixed(2)).join(" ");return Nt`<polygon points=${l}
        fill=${s?"rgba(255,255,255,0.12)":"rgba(255,255,255,0.05)"}
        stroke=${s?"#ffffff":"rgba(255,255,255,0.35)"}
        stroke-width="0.35" stroke-linejoin="round"></polygon>`})}`;return Dt`<svg class="room-outline-layer" viewBox="0 0 100 100" preserveAspectRatio="none"
      style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;">${l}</svg>`}get _narrow(){const e=this._config.mobile_rotate;if("off"===e)return!1;if("always"===e||"on"===e)return!0;if(this._config.layout){const e="portrait"===this._profile?this._config.layout.portrait:this._config.layout.landscape,o=e?.crop?.mapOrientation;if("normal"===o)return!1;if("rotated"===o)return!0;const s=function shouldRotateMap(e,o,s){if(o<=4||s<=4||e<=0)return;const l=Math.min(o/e,s);return Math.min(o,s/e)>l}(this._mapAR,this._mapRegW,this._mapRegH);return void 0!==s?(this._lastRotate=s,s):this._lastRotate}return this._cardW>0&&this._cardW<500}get _flipEff(){if(null!==this._flipLive)return this._flipLive;if(!this._config.layout)return!1;const e="portrait"===this._profile?this._config.layout.portrait:this._config.layout.landscape;return!0===e?.crop?.flip}_toggleFlipLive(){this._flipLive=!this._flipEff,this._saveFlipLive()}get _stackTopology(){if("portrait"!==this._profile||!this._config.layout)return!1;const e=this._config.layout.portrait;if("split"===e?.topology||"rail"===e?.topology)return!1;if("stack"===e?.topology)return!0;if(e?.columns?.length||e?.rows?.length||e?.place&&Object.keys(e.place).length)return!1;const o=this._mapAR>.1?this._mapAR:3.636,s=function shouldStackLayout(e,o,s,l={}){const{dockWidthFrac:h=.28,dockMinPx:d=_e,dockHeightPx:p=150,stackBias:u=1.1}=l;if(o<=4||s<=4||e<=0)return;const m=o-Math.max(o*h,d),_=Math.min(m/e,s),f=Math.max(s-p,0);return!(_>Math.min(o/e,f)*u)}(this._narrow?1/o:o,this._mapAvailW,this._mapAvailH,this._themed()?{}:{stackBias:1.5,dockMinPx:0});return void 0!==s?(this._lastStack=s,s):this._lastStack}_floorplanImgTransform(e){return"translate("+(e?.offset_x??0)+"%,"+(e?.offset_y??0)+"%) rotate("+(e?.rotation??0)+"deg) scale("+(e?.scale??100)/100+")"}_renderFurnitureLayer(e){const o=normalizeFurniture(e?.furniture);if(!e?.src||!o.length)return It;const s=this._mapAR>.1?this._mapAR:3.636;return Dt`
      <div class="furniture-layer" style=${Xt({transform:this._floorplanImgTransform(e)})}>
        <svg viewBox="0 0 100 ${100/s}" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
          ${o.map(e=>this._furnitureImage(e,toUnit(e,s)))}
        </svg>
      </div>`}_furnitureImage(e,o,s=It){return Nt`<g class="furn-item" data-id=${e.id} transform=${function groupTransform(e){return`translate(${e.cx} ${e.cy}) rotate(${e.rot})`}(o)}>
      <image href=${e.src} x=${-o.w/2} y=${-o.h/2} width=${o.w} height=${o.h}
        preserveAspectRatio="none" opacity=${e.opacity??1}
        transform=${e.flip?"scale(-1 1)":""}></image>
      ${s}
    </g>`}_renderResponsive(e){if(!this._config.layout){if(!this._narrow)return e;const o=this._mapAR>.1?this._mapAR:3.636,s=this._cardW||this.clientWidth||360,l=1.4*("undefined"!=typeof window?window.innerHeight:800),h=s*o,d=h>l?l/h:1,p=Math.round(s*d),u=Math.round(h*d);return Dt`
        <div class="avc-rot" style="position:relative;width:${p}px;height:${u}px;margin:0 auto;overflow:hidden;--map-rot:90deg">
          <div style="position:absolute;top:0;left:0;width:${u}px;height:${p}px;transform-origin:top left;transform:translateX(${p}px) rotate(90deg)">
            ${e}
          </div>
        </div>
      `}if(this._mapRegW<=4||this._mapRegH<=4)return e;const o=this._mapAR>.1?this._mapAR:3.636,s=this._mapRotationDeg(),l=90===s||270===s,h=l?1/o:o,d=this._config.layout[this._profile]?.crop,p="cover"===d?.fit;let u=this._mapRegW;const m=this._mapRegH;let _,f;this._isRail()&&this._mapAvailW>2*_e&&(u=Math.min(u,this._mapAvailW-this._gridGapPx-_e)),p?(_=Math.max(u,m*h),f=Math.max(m,_/h)):(_=Math.min(u,m*h),f=Math.min(m,_/h)),_=Math.floor(_),f=Math.floor(f);const v=-(_-u)/2+(d?.offset_x??0)/100*((_-u)/2),b=-(f-m)/2+(d?.offset_y??0)/100*((f-m)/2),w=!p&&"portrait"===this._profile,$=w?`width:${_}px;height:${f}px;margin:${Math.max(0,Math.floor((m-f)/2))}px auto 0`:`width:${u}px;height:${m}px;margin:0 auto`,C=w?"0px,0px":`${v}px,${b}px`;if(this._isRail()&&(this._lastPortraitFitW=_),0!==s){l&&(this._lastPortraitFitW=_);let o;return o=90===s?"transform-origin:top left;transform:translateX("+_+"px) rotate(90deg)":180===s?"transform-origin:center;transform:rotate(180deg)":"transform-origin:top left;transform:translateY("+f+"px) rotate(270deg)",Dt`
        <div class="avc-rot" style="position:relative;${$};overflow:hidden;--map-rot:${s}deg">
          <div style="position:absolute;top:0;left:0;width:100%;height:100%;transform:translate(${C})">
            <div style="position:absolute;top:0;left:0;width:${l?f:_}px;height:${l?_:f}px;${o}">
              ${e}
            </div>
          </div>
        </div>
      `}return Dt`
      <div style="position:relative;${$};overflow:hidden">
        <div style="position:absolute;top:0;left:0;width:${_}px;height:${f}px;transform:translate(${C})">
          ${e}
        </div>
      </div>
    `}_renderMergedMap(){const e=this._shownOrdered().map(e=>this._config.vacuums[e]);if(!e.length)return It;const o=e.find(e=>e.image_base?.src)??e[0],s=this._config.image_base??o.image_base,l=!!s?.src,h=this._config.base_height??o.base_height,d="number"==typeof h&&h>0,p=d?"map-wrap--fixed":l?"map-wrap--image":"",u=Xt(d?{height:(h??0)+"px"}:{});return Dt`
      <div class="map-wrap ${p}" style=${u}>
        ${l?Dt`
          <img class="${"image-base-img"+(d?" image-base-img--fit":"")}" src=${s.src} alt="Floorplan" @load=${this._onFloorplanLoad}
            style=${Xt({transform:this._floorplanImgTransform(s)})} />
        `:It}
        ${l?this._renderFurnitureLayer(s):It}
        ${e.map((e,o)=>{const s=this._mapEntityFor(e),h=s?this._mapUrl(s):null;if(!h)return It;const d=this._effectiveSeat(e),p=l||o>0;return Dt`<img class="map-img ${p?"map-img--overlay":""}" src=${h} alt="Vacuum map"
            data-entity=${e.entity}
            style=${Xt({left:50+d.offset_x+"%",top:50+d.offset_y+"%",width:d.scale+"%",transform:"translate(-50%,-50%) "+seatRotateScaleCss(d.rotation,d.scale,d.scaleY),opacity:e.hide_map?"0":String((e.overlay_opacity??(p?55:100))/100),mixBlendMode:e.overlay_blend??"normal"})} />`})}
        ${e.map(e=>{if(!this._intAttrs(e))return It;const o=this._homeFrameCropFor(e);if(o)return this._renderHomeFrameOverlay(e,o,"paths");const s=this._homeAnchorFitFor(e,this._wrapAspect(this._baseHeightFor(e)));return s?this._renderHomeAnchorOverlay(e,s.fit,s.dims,this._wrapAspect(this._baseHeightFor(e)),"paths"):this._renderIntegrationOverlay(e,this._effectiveSeat(e),"paths")})}
        ${e.map(e=>{if(!this._intAttrs(e))return It;const o=this._homeFrameCropFor(e);if(o)return this._renderHomeFrameOverlay(e,o,"marker");const s=this._homeAnchorFitFor(e,this._wrapAspect(this._baseHeightFor(e)));return s?this._renderHomeAnchorOverlay(e,s.fit,s.dims,this._wrapAspect(this._baseHeightFor(e)),"marker"):this._renderIntegrationOverlay(e,this._effectiveSeat(e),"marker")})}
        ${this._config.layout?It:this._renderLayerToggles(e)}
        ${this._renderRoomOutlines(this._mergedRoomDefs(e),e)}
        ${this._renderMergedRooms(e)}
        ${this._renderStartSeqAvatars(this._mergedRoomDefs(e))}
        ${e.map(e=>"normal"!==this._mapMode&&this._isModeCandidate(e)||this._zoneRectShown&&this._hasZoneEditTarget(e)?Dt`<div class="map-clickcatch" style="touch-action:none"
              @click=${o=>this._onMapClick(e,o)}
              @pointerdown=${o=>this._onZoneDown(e,o)}
              @pointermove=${o=>this._onZoneMove(e,o)}
              @pointerup=${o=>this._onZoneUp(e,o)}></div>`:It)}
        ${e.map((e,o)=>{const s=this._zoneRectFor(e,0===o);return s?Dt`<div class="zone-rect" style=${Xt({left:Math.min(s.x0,s.x1)+"%",top:Math.min(s.y0,s.y1)+"%",width:Math.abs(s.x1-s.x0)+"%",height:Math.abs(s.y1-s.y0)+"%"})}>${this._renderZoneHandles()}</div>`:It})}
      </div>
    `}_renderMap(e){const o=e.base??(e.image_base?.src&&!e.map?.entity?"image":"map"),s=e.image_base,l=s?.src,h=this._mapEntityFor(e),d=h?this._mapUrl(h):null,p=("image"===o||"combined"===o)&&!!l,u=("map"===o||"combined"===o)&&!!d;if(!p&&!u)return It;const m=this._effectiveSeat(e),_="number"==typeof e.base_height&&e.base_height>0,f=_?"map-wrap--fixed":p?"map-wrap--image":"",v=Xt(_?{height:(e.base_height??0)+"px"}:{});return Dt`
      <div class="map-wrap ${f}" style=${v}>
        ${p?Dt`
          <img class="${"image-base-img"+(_?" image-base-img--fit":"")}" src=${l} alt="Floorplan" @load=${this._onFloorplanLoad}
            style=${Xt({transform:this._floorplanImgTransform(s)})} />
        `:It}
        ${p?this._renderFurnitureLayer(s):It}
        ${u?Dt`
          <img class="map-img ${p?"map-img--overlay":""}" src=${d} alt="Vacuum map"
            data-entity=${e.entity}
            style=${Xt({left:50+m.offset_x+"%",top:50+m.offset_y+"%",width:m.scale+"%",transform:"translate(-50%,-50%) "+seatRotateScaleCss(m.rotation,m.scale,m.scaleY),...e.hide_map?{opacity:"0"}:p?{opacity:String((e.overlay_opacity??55)/100),mixBlendMode:e.overlay_blend??"normal"}:{}})} />
        `:It}
        ${u?this._renderIntegrationOverlay(e,m):It}
        ${this._config.layout?It:this._renderLayerToggles([e])}
        ${(()=>{const o=this._roomsFor(e),s=!o.some(o=>this._isRoomSelected(o,e));return o.map(o=>this._renderRoomOverlay(o,e,{wholeHome:s}))})()}
        ${"normal"!==this._mapMode&&this._isModeCandidate(e)||this._zoneRectShown&&this._hasZoneEditTarget(e)?Dt`<div class="map-clickcatch" style="touch-action:none"
              @click=${o=>this._onMapClick(e,o)}
              @pointerdown=${o=>this._onZoneDown(e,o)}
              @pointermove=${o=>this._onZoneMove(e,o)}
              @pointerup=${o=>this._onZoneUp(e,o)}></div>`:It}
        ${(()=>{const o=this._zoneRectFor(e,!0);return o?Dt`<div class="zone-rect" style=${Xt({left:Math.min(o.x0,o.x1)+"%",top:Math.min(o.y0,o.y1)+"%",width:Math.abs(o.x1-o.x0)+"%",height:Math.abs(o.y1-o.y0)+"%"})}>${this._renderZoneHandles()}</div>`:It})()}
      </div>
    `}_roomAgeDotColors(e,o,s){const l=this._intRoomRec(o,e);if(l){const e=(s?.length?s:[o]).map(e=>this._vacCleanType(e)).reduce((e,o)=>({dry:e.dry||o.dry,wet:e.wet||o.wet}),{dry:!1,wet:!1}),h=[];if(e.dry){const e=this._ageDaysFromIso(l.dry);h.push({kind:"dry",color:this._colorForAgeDays(e),days:e})}if(e.wet){const e=this._ageDaysFromIso(l.wet);h.push({kind:"wet",color:this._colorForAgeDays(e),days:e})}return h}if(!e.last_clean_entity)return[];const h=this._roomAgeDays(e);return[{kind:"any",color:this._colorForAgeDays(h),days:h}]}_renderRoomLabel(e,o,s,l){const h=this._roomAgeDotColors(e,o,l),d=this._mapRotationDeg()%180!=0,p="none"===s;if(p&&!h.length)return It;const u=h.map(e=>("any"===e.kind?"":e.kind+" ")+this._ageBadgeStr(e.days)).join(" · ");return Dt`
      <span class="room-label ${d?"room-label--q":""} ${p?"room-label--dots":""}" title=${u}>
        ${p||this._config.room_icon_hidden||!e.icon?It:Dt`<ha-icon icon=${e.icon}></ha-icon>`}
        ${p?It:Dt`<span class="room-label-name">${e.name??e.key}</span>`}
        ${h.length?Dt`<span class="room-label-dots">${h.map(e=>Dt`<span class="room-label-dot" style=${Xt({background:e.color})}></span>`)}</span>`:It}
      </span>`}_renderRoomAgeDots(e,o){const s=this._intRoomRec(o,e);if(s){const e=this._vacCleanType(o);if(!e.dry&&!e.wet)return It;const l=this._ageDaysFromIso(s.dry),h=this._ageDaysFromIso(s.wet);return Dt`
        <span class="room-age-dots">
          ${e.dry?Dt`<span class="room-age-dot" style=${Xt({background:this._colorForAgeDays(l)})}></span>`:It}
          ${e.wet?Dt`<span class="room-age-dot" style=${Xt({background:this._colorForAgeDays(h)})}></span>`:It}
        </span>
      `}return e.last_clean_entity?Dt`
      <span class="room-age-dots">
        <span class="room-age-dot" style=${Xt({background:this._colorForAgeDays(this._roomAgeDays(e))})}></span>
      </span>
    `:It}_onRoomPointerDown(e,o){return s=>{o||(s.preventDefault(),this._cancelHold(),this._holdId="room-"+e.key,this._holdTimer=setTimeout(()=>{this._holdTimer=null,this._holdId=null,this._inspectKey=this._inspectKey===e.key?null:e.key},te))}}_onRoomPointerUp(e,o,s,l){return()=>{if(!l)if(null!==this._holdTimer){if(this._cancelHold(),null!==this._inspectKey)return void(this._inspectKey=null);const l=this._jobProgress();if(l&&this._jobLanes(l)&&this.hass.services?.anyvac?.edit_job)return this._queueSel=null,this._queueAdd={room:e.key,mode:this._queueAdd?.mode??this._planMode},void(this._usesPlanColumn()||(this._queueSheet=!0));s?this._toggleRoomAcross(e.key,s):this._toggleRoom(e,o)}else this._holdId=null}}_renderRoomInspect(e,o,s,l){const h=this._intRoomRec(o,e),d=this._ageDaysFromIso(h?.dry),p=this._ageDaysFromIso(h?.wet),badge=e=>null===e?"—":e<1?"<1d":Math.round(e)+"d",u=this._roomCoverageRec(o,e),covFmt=e=>null==e||e>=100?"":e+"%",m=s?this._planPreview?.dry.get(e.key):void 0,_=s?this._planPreview?.wet.get(e.key):void 0,f=this._pinCandidates(e.key,"dry").length>1,v=this._pinCandidates(e.key,"wet").length>1,pinTap=(o,s)=>("dry"===o?f:v)?l=>{l.stopPropagation(),this._cycleRoomPin(e.key,o,s)}:void 0;return Dt`
      <div class="room-inspect" style=${Xt({left:(e.map_x??0)+"%",top:(e.map_y??0)+"%"})}
        @click=${e=>e.stopPropagation()}>
        <div class="room-inspect-inner">
          <div class="room-inspect-name">${e.name??e.key}</div>
          <div class="room-inspect-ages">
            <span class="dock-age"><ha-icon icon="mdi:broom"></ha-icon><b style=${Xt({color:this._colorForAgeDays(d)})}>${badge(d)}</b>${this._renderCovBadge(u,"dry",covFmt)}</span>
            <span class="dock-age"><ha-icon icon="mdi:water"></ha-icon><b style=${Xt({color:this._colorForAgeDays(p)})}>${badge(p)}</b>${this._renderCovBadge(u,"wet",covFmt)}</span>
          </div>
          ${m||_?Dt`
            <div class="dock-avatars">
              ${m?this._vacChip(m,pinTap("dry",m)):It}
              ${_?this._vacChip(_,pinTap("wet",_)):It}
            </div>`:It}
        </div>
      </div>
    `}_roomFill(){const e=this._jobProgress();if(e===this._fillJp&&this._fillMap)return this._fillMap;this._fillJp=e;const o=new Map;if(!e||!Array.isArray(e.rooms))return this._doneSeen=null,this._sheenRooms.clear(),this._fillMap=o,o;const s=new Map;for(const o of e.rooms){if("string"!=typeof o?.room)continue;const e=s.get(o.room)??[];e.push(o),s.set(o.room,e)}const colorOf=e=>{const o=this._config.vacuums.find(o=>o.entity===e);return o?this._color(o):"#8a8f98"},l=null===this._doneSeen,h=this._doneSeen??new Set;for(const[e,d]of s){const s=d.every(e=>"done"===e.state),p=d.reduce((e,o)=>e+("done"===o.state?100:Math.max(0,Math.min(100,Number(o.pct)||0))),0),u=d.find(e=>"active"===e.state)??[...d].reverse().find(e=>"done"===e.state)??d[0];s&&!h.has(e)&&(h.add(e),l||this._sheenRooms.add(e)),o.set(e,{frac:p/(100*d.length),done:s,color:colorOf(u?.vacuum),sheen:this._sheenRooms.has(e)})}return this._doneSeen=h,this._fillMap=o,o}_renderRoomFill(e){const o=this._roomFill().get(e.key)??(e.name?this._roomFill().get(e.name):void 0);if(!o||!o.done&&o.frac<=0)return It;const s=o.done?.22:.04+.18*o.frac;return Dt`<span class="room-fill ${o.done?"room-fill--done":""}" style=${Xt({background:o.color,opacity:s.toFixed(3)})}></span>${o.sheen?Dt`<span class="room-sheen"></span>`:It}`}_renderRoomOverlay(e,o,s){const l=s?.vacs?this._isRoomSelectedAny(e.key,s.vacs):this._isRoomSelected(e,o),h=!l&&!!s?.wholeHome,d="rgba(255,255,255,0.22)",p=e.icon_anchor??"c",u="normal"!==this._mapMode,m="#ffffff",_="linear-gradient(135deg, #ffffff 0%, #ffffff 46%, #8ecbff 50%, #ffffff 54%, #ffffff 100%) 1";if(void 0!==e.map_w&&void 0!==e.map_h){const f={tl:["flex-start","flex-start"],t:["center","flex-start"],tr:["flex-end","flex-start"],l:["flex-start","center"],c:["center","center"],r:["flex-end","center"],bl:["flex-start","flex-end"],b:["center","flex-end"],br:["flex-end","flex-end"]},[v,b]=f[p]??["center","center"],w=this._themed(),$=(l?this._config.room_border_selected??4:h&&!w?Math.max(3,this._config.room_border_normal??2):this._config.room_border_normal??2)+"px";let C=l?m+"E0":h?"rgba(255,255,255,0.75)":d,A=l?m+"22":h?"rgba(255,255,255,0.16)":"rgba(0,0,0,0.06)",F=l?"0 0 18px rgba(255,255,255,0.7)":h?"0 0 10px rgba(255,255,255,0.4)":"none";w&&(C=l?"rgb(var(--avc-accent-rgb))":d,A=l?"rgba(var(--avc-accent-rgb), 0.14)":"rgba(0,0,0,0.04)",F=l?"inset 0 0 22px rgba(var(--avc-accent-rgb), 0.32)":"none");const E=l?this._planPreview?.dry.get(e.key):void 0,T=l?this._planPreview?.wet.get(e.key):void 0,O="room-"+e.key;return Dt`
        <button
          class="room-overlay ${u?"room-overlay--locked":""} ${this._holdId===O?"room-overlay--holding":""}"
          ?disabled=${u}
          style=${Xt({left:(e.map_x??0)+"%",top:(e.map_y??0)+"%",width:e.map_w+"%",height:e.map_h+"%",border:$+" solid "+C,borderImage:l&&!w?_:"none",background:A,boxShadow:F,justifyContent:v,alignItems:b})}
          @pointerdown=${this._onRoomPointerDown(e,u)}
          @pointerup=${this._onRoomPointerUp(e,o,s?.vacs,u)}
          @pointerleave=${this._holdEnd}
          @pointercancel=${this._holdEnd}
          title=${u?this._t("Room selection is off while placing a pin/zone"):e.name} aria-label=${e.name}
          aria-pressed=${l?"true":"false"}
        >
          ${w?this._renderRoomFill(e):It}
          ${this._startSeq?.delay.has(e.key)?Dt`<span class="room-seq"
              style=${Xt({animationDelay:this._startSeq.delay.get(e.key)+"s"})}></span>`:It}
          <div class="hold-ring"></div>
          ${w?this._renderRoomLabel(e,o,p,s?.vacs):Dt`
            ${!this._config.room_icon_hidden&&"none"!==p&&e.icon?Dt`
              <ha-icon icon=${e.icon}
                style=${Xt({color:l?"white":"rgba(255,255,255,0.55)","--mdc-icon-size":"16px"})}>
              </ha-icon>
            `:It}
            ${this._renderRoomAgeDots(e,o)}`}
          ${E||T?(()=>{const e=this._mapRotationDeg(),o=90===e?{top:"0%",left:"100%"}:180===e?{top:"0%",left:"0%"}:270===e?{top:"100%",left:"0%"}:{top:"100%",left:"100%"},s=e*Math.PI/180,l=(-2*(Math.cos(s)+Math.sin(s))).toFixed(2),h=(-2*(Math.cos(s)-Math.sin(s))).toFixed(2);return Dt`
                <span class="room-overlay-assign-anchor ${e%180!=0?"room-overlay-assign-anchor--q":""}" style=${Xt(o)}>
                  <span class="room-overlay-assign"
                    style=${Xt({transform:`translate(${l}px, ${h}px) rotate(calc(-1 * var(--map-rot)))`})}>
                    ${E?this._vacChip(E):It}
                    ${T?this._vacChip(T):It}
                  </span>
                </span>
              `})():It}
          ${this._renderRoomGauge(s?.vacs??[o],e)}
        </button>
        ${this._inspectKey===e.key?this._renderRoomInspect(e,o,l,s):It}
      `}const f=l?m+"A8":h?"rgba(255,255,255,0.32)":"rgba(0,0,0,0.55)",v=l?"0 0 12px rgba(255,255,255,0.8)":h?"0 0 8px rgba(255,255,255,0.45)":"none",b="room-"+e.key;return Dt`
      <button
        class="room-btn ${u?"room-overlay--locked":""} ${this._holdId===b?"room-overlay--holding":""}"
        ?disabled=${u}
        style=${Xt({left:(e.map_x??0)+"%",top:(e.map_y??0)+"%",background:f,border:"4px solid "+(l?m:h?"rgba(255,255,255,0.7)":d),borderImage:l?_:"none",boxShadow:v})}
        @pointerdown=${this._onRoomPointerDown(e,u)}
        @pointerup=${this._onRoomPointerUp(e,o,s?.vacs,u)}
        @pointerleave=${this._holdEnd}
        @pointercancel=${this._holdEnd}
        title=${u?this._t("Room selection is off while placing a pin/zone"):e.name} aria-label=${e.name}
        aria-pressed=${l?"true":"false"}
      >
        <div class="hold-ring"></div>
        ${this._config.room_icon_hidden?It:Dt`
          <ha-icon icon=${e.icon||"mdi:square"}
            style=${Xt({color:l?"white":"rgba(255,255,255,0.5)"})}>
          </ha-icon>
        `}
        ${this._renderRoomAgeDots(e,o)}
        ${this._renderRoomGauge(s?.vacs??[o],e)}
      </button>
      ${this._inspectKey===e.key?this._renderRoomInspect(e,o,l,s):It}
    `}_renderStatusRow(e){const[o,s,l]=this._statusInfo(e),h=this._battery(e),d=this._lastCleanStr(e),p=e.name??e.entity.split(".")[1]??e.entity,u=this._progress(e),m=this._ent(e,"current_room"),_=m?this.hass.states[m]?.state:null,f=_&&"unknown"!==_&&"unavailable"!==_?_:null,v=this._ent(e,"error"),b=v?this.hass.states[v]?.state:null,w=this._hasError(e);return Dt`
      ${w?Dt`
        <div class="error-row">
          <ha-icon icon="mdi:alert-circle" style="color:rgb(var(--avc-err-rgb))"></ha-icon>
          <span style="color:rgb(var(--avc-err-rgb));font-size:var(--avc-th-fs-xs,11px);font-weight:600">${b}</span>
        </div>
      `:It}
      <div class="status-line1">
        <span class="model-label">${p}</span>
        <span class="status-label" style=${Xt({color:s})}>
          <ha-icon class="status-icon" icon=${l}></ha-icon>${o}${null!==u?Dt` &middot; ${u}&thinsp;%`:It}
        </span>
      </div>
      <div class="status-line2">
        ${f?Dt`
          <span class="current-room">
            <ha-icon icon="mdi:map-marker" style="--mdc-icon-size:12px;color:rgba(var(--avc-ink-rgb),0.4)"></ha-icon>
            ${f}
          </span>
        `:Dt`<span></span>`}
        <span class="status-meta">
          ${null!==h?Dt`
            <span class="battery">
              <ha-icon icon=${this._batIcon(h)} style=${Xt({color:this._batColor(h)})}></ha-icon>
              <span style=${Xt({color:this._batColor(h)})}>${h}&thinsp;%</span>
            </span>
          `:It}
          <span class="last-clean">
            <ha-icon icon="mdi:history"></ha-icon>
            <span>${d}</span>
          </span>
        </span>
      </div>
    `}_renderProgress(e){const o=this._progress(e);if(null===o)return It;const s=this._color(e);return Dt`
      <div class="progress">
        <div class="progress-track">
          <div class="progress-fill" style=${Xt({width:o+"%",background:s})}></div>
        </div>
        <span class="progress-label" style=${Xt({color:s})}>${o}&thinsp;%</span>
      </div>
    `}_renderActions(e,o){const s=this._color(e),l=this._pinPending?.[e.entity],h=this._zonePending?.[e.entity];if(l||h){const l="modeaction-"+o,d=h?"Clean zone":"Send here",p=h?"mdi:select-drag":"mdi:map-marker-radius",action=()=>{h?this._confirmZone(e):this._confirmPin(e)};return Dt`
        <div class="actions">
          <button
            class="action-btn ${this._holdId===l?"action-btn--holding":""}"
            style=${Xt({background:this._colorBg(e),border:"1px solid "+s+"80"})}
            @pointerdown=${this._holdStart(l,action)}
            @pointermove=${this._holdMove}
            @pointerup=${this._holdEnd}
            @pointerleave=${this._holdEnd}
            @pointercancel=${this._holdEnd}
          >
            <div class="hold-ring"></div>
            <ha-icon icon=${p} style=${Xt({color:s})}></ha-icon>
            <span>${d}</span>
          </button>
        </div>
      `}const d=this._isCleaning(e),p=this._isPaused(e),u=this._hasSelectedRooms(e),m=this._totalCleanMins(e),_=this._timeStr(m);if(p){const l="resume-"+o;return Dt`
        <div class="actions">
          <button
            class="action-btn ${this._holdId===l?"action-btn--holding":""}"
            style=${Xt({background:this._colorBg(e),border:"1px solid "+s+"80"})}
            @pointerdown=${this._holdStart(l,()=>this._resume(e))}
            @pointermove=${this._holdMove}
            @pointerup=${this._holdEnd}
            @pointerleave=${this._holdEnd}
            @pointercancel=${this._holdEnd}
          >
            <div class="hold-ring"></div>
            <ha-icon icon="mdi:play" style=${Xt({color:s})}></ha-icon>
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
      `}if(d){const s="pause-"+o;return Dt`
        <div class="actions">
          <button
            class="action-btn action-btn--warn ${this._holdId===s?"action-btn--holding":""}"
            @pointerdown=${this._holdStart(s,()=>this._pause(e))}
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
      `}const f="start-"+o,v=u?this._colorBg(e):"var(--avc-disabled)",b=u?"1px solid "+s+"80":"1px solid rgba(var(--avc-ink-rgb),0.1)",w=u?s:"rgba(var(--avc-ink-rgb),0.2)",$=u?"rgb(var(--avc-ink-rgb))":"rgba(var(--avc-ink-rgb),0.25)",C=this._roomsFor(e),A=C.filter(o=>this._isRoomSelected(o,e)).length,F=[C.length>0?`${A}/${C.length} ${this._pl(C.length,"room|rooms")}`:"",_].filter(Boolean).join(" · ");return Dt`
      <div class="actions actions--idle">
        ${this._renderPresetChips(e)}
        <button
          class="action-btn ${u&&this._holdId===f?"action-btn--holding":""}"
          style=${Xt({background:v,border:b,flex:"1"})}
          ?disabled=${!u}
          @pointerdown=${u?this._holdStart(f,()=>this._startClean(e)):It}
          @pointermove=${this._holdMove}
          @pointerup=${this._holdEnd}
          @pointerleave=${this._holdEnd}
          @pointercancel=${this._holdEnd}
        >
          <div class="hold-ring"></div>
          <ha-icon icon="mdi:play" style=${Xt({color:w})}></ha-icon>
          <div class="start-body">
            <span style=${Xt({color:$})}>${u?this._t("START"):this._t("Select rooms")}</span>
            ${F?Dt`<small style="color:rgba(var(--avc-ink-rgb),0.4)">${F}</small>`:It}
          </div>
        </button>
      </div>
    `}_jobProgress(){for(const e of this._config.vacuums){const o=this._intAttrs(e)?.job_progress;if(o?.active)return o}return null}_clockStr(e){return fmtClock(this.hass,e)}_t(e,o){return function tr(e,o,s){let l="cs"===langOf(e)?he[o]??o:o;return s&&(l=l.replace(/\{(\w+)\}/g,(e,o)=>o in s?String(s[o]):e)),l}(this.hass,e,o)}_pl(e,o){return function plural(e,o,s){const l=langOf(e),h=("cs"===l?he[s]??s:s).split("|");return"cs"===l&&3===h.length?1===o?h[0]:o>=2&&o<=4?h[1]:h[2]:1===o?h[0]:h[h.length-1]??h[0]}(this.hass,e,o)}_vacName(e){return e.name??e.entity.split(".")[1]??e.entity}_renderBattRing(e,o){const s=this._battery(e),l="charging"===(this.hass.states[this._ent(e,"status")??e.entity]?.state??""),h=o/2-2.5,d=2*Math.PI*h,p=s??0,u=null===s?"rgba(var(--avc-ink-rgb),0.2)":p<=20?"rgb(var(--avc-err-rgb))":p<=40?"rgb(var(--avc-warn-rgb))":"rgb(var(--avc-ok-rgb))",m=o-10;return Dt`
      <span class="batt-ring" style=${Xt({width:o+"px",height:o+"px"})}
        title=${null!==s?`Battery ${s} %`:""}>
        <svg width=${o} height=${o} viewBox="0 0 ${o} ${o}" aria-hidden="true">
          <circle cx=${o/2} cy=${o/2} r=${h} fill="none" style="stroke: rgba(var(--avc-ink-rgb),0.1)" stroke-width="3"></circle>
          ${null!==s?Nt`<circle class=${l?"batt-ring-arc batt-ring-arc--charging":"batt-ring-arc"} cx=${o/2} cy=${o/2} r=${h} fill="none"
            style=${"stroke: "+u} stroke-width="3" stroke-linecap="round"
            stroke-dasharray="${(d*p/100).toFixed(1)} ${d.toFixed(1)}"></circle>`:It}
        </svg>
        ${e.image?Dt`<img src=${e.image} alt="" style=${Xt({width:m+"px",height:m+"px"})}>`:Dt`<ha-icon icon="mdi:robot-vacuum" style=${Xt({color:this._color(e),"--mdc-icon-size":.6*m+"px"})}></ha-icon>`}
        ${l?Dt`<span class="batt-ring-bolt"><ha-icon icon="mdi:lightning-bolt"></ha-icon></span>`:It}
        ${this._attnDot(e)}
      </span>`}_renderHero(e){const o=e.filter(e=>this._intAttrs(e));if(!o.length)return It;const s=this._jobProgress();if(s){const e=Number(s.rooms_done??0),o=Math.max(1,Number(s.rooms_total??0)),l=Math.round(100*e/o),h=17,d=2*Math.PI*h,p=Object.entries(s.vacuums??{}).filter(([,e])=>e?.room).map(([e,o])=>{const s=this._config.vacuums.find(o=>o.entity===e),l=s?this._vacName(s):e.split(".")[1];return this._t("wet"===o.kind?"{name} mopping {room}":"{name} in {room}",{name:l,room:o.room})}),u=Math.round(Number(s.eta_min_left??0)),m=this._jobLanes(s)&&!this._usesPlanColumn()?()=>{this._queueSheet=!0}:void 0;return Dt`
        <div class="meta-hero ${m?"meta-hero--open":""}" role=${m?"button":It} tabindex=${m?"0":It}
          aria-label=${m?this._t("Open the queue"):It}
          @click=${m??It}
          @keydown=${m?e=>{"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),m())}:It}>
          <span class="hero-ring" aria-hidden="true">
            <svg width="40" height="40" viewBox="0 0 40 40">
              <circle cx="20" cy="20" r=${h} fill="none" style="stroke: rgba(var(--avc-ink-rgb),0.1)" stroke-width="3.5"></circle>
              <circle cx="20" cy="20" r=${h} fill="none" style="stroke: rgb(var(--avc-accent-rgb))" stroke-width="3.5" stroke-linecap="round"
                stroke-dasharray="${(d*l/100).toFixed(1)} ${d.toFixed(1)}" transform="rotate(-90 20 20)"></circle>
            </svg>
            <b>${e}/${s.rooms_total??0}</b>
          </span>
          <span class="hero-text">
            <span class="hero-title">${this._t("Cleaning · done around {time}",{time:this._clockStr(s.finish_at)})}</span>
            <span class="hero-sub">${this._t("{n} min left",{n:u})}${p.length?" · "+p.join(" · "):""}</span>
          </span>
        </div>`}const l=e.filter(e=>this._isCleaning(e)),age=e=>{const s=this._oldestAgeDays(o,e);return null===s?null:s<1?this._t("today"):this._t("{n} d ago",{n:Math.round(s)})},h=age("dry"),d=age("wet"),p=[h?this._t("vacuumed {when}",{when:h}):"",d?this._t("mopped {when}",{when:d}):""].filter(Boolean).join(" · ");return Dt`
      <div class="meta-hero">
        <span class="hero-badge"><ha-icon icon=${l.length?"mdi:broom":"mdi:home-outline"}></ha-icon></span>
        <span class="hero-text">
          <span class="hero-title">${l.length?this._t(l.length>1?"{names} are cleaning":"{names} is cleaning",{names:l.map(e=>this._vacName(e)).join(", ")}):this._t("Home is calm")}</span>
          ${p?Dt`<span class="hero-sub">${this._t("Oldest room: {sub}",{sub:p})}</span>`:It}
        </span>
      </div>`}_renderRobotSheet(){const e=this._robotSheet;if(null===e)return It;const o=this._config.vacuums[e];if(!o)return It;const s=this._vacName(o),[l,h,d]=this._statusInfo(o),p=this._battery(o),close=()=>{this._robotSheet=null,this._robotSheetTab=null},u=this._roomsFor(o).filter(e=>this._isRoomSelected(e,o)),m=this._totalCleanMins(o),_=this._dockCaps(o).hasDock,f=this._careItems(o).some(e=>!e.binary),v=this._vacAttention(o);let b=this._robotSheetTab?.idx===e?this._robotSheetTab.tab:"clean";("dock"===b&&!_||"care"===b&&!f)&&(b="clean");const tabBtn=(o,s,l,h)=>Dt`
      <button class="rs-tab ${b===o?"on":""}" role="tab" aria-selected=${b===o?"true":"false"}
        @click=${s=>{s.stopPropagation(),this._robotSheetTab={idx:e,tab:o}}}>
        <ha-icon icon=${l}></ha-icon><span>${s}</span>
        ${h?Dt`<span class="rs-tab-dot" role="img" aria-label=${this._t("needs attention")}></span>`:It}
      </button>`,w=Dt`
      <div class="robot-sheet-rooms">
        <span class="robot-sheet-label">${this._t("Rooms")}</span>
        <span>${u.length?Dt`${u.map(e=>e.name??e.key).join(", ")}${m?Dt` <small>· ${this._timeStr(m)}</small>`:It}`:Dt`<small>${this._t("Pick rooms on the map first")}</small>`}</span>
      </div>
      ${this._renderActions(o,e)}
      ${this._renderSpSection(o,e)}
      <div class="robot-sheet-foot">
        <button class="mtbtn" @click=${()=>this._dock(o)}><ha-icon icon="mdi:home-import-outline"></ha-icon><span>${this._t("Send to dock")}</span></button>
      </div>`;return Dt`
      <div class="robot-sheet-scrim" @click=${close}></div>
      <div class="robot-sheet" role="dialog" aria-modal="true" aria-label=${this._t("{name} controls",{name:s})}
        @keydown=${e=>{"Escape"===e.key&&close()}}>
        <span class="robot-sheet-grip" aria-hidden="true"></span>
        <div class="robot-sheet-head">
          ${this._renderBattRing(o,60)}
          <span class="robot-sheet-id">
            <span class="robot-sheet-name">${s}</span>
            <span class="tile-status" style=${Xt({color:h})}>
              <ha-icon icon=${d}></ha-icon>${l}${null!==p?Dt` · ${p}&thinsp;%`:It}
            </span>
            <span class="tile-sub">${this._t("Last clean {when}",{when:this._lastCleanStr(o)})}</span>
          </span>
          <button class="robot-sheet-icon" aria-label=${this._t("Open {name} in Home Assistant",{name:s})} title=${this._t("Home Assistant details")}
            @click=${()=>this._fireMoreInfo(o.entity)}><ha-icon icon="mdi:information-outline"></ha-icon></button>
          <button class="robot-sheet-icon" aria-label=${this._t("Close")} @click=${close}><ha-icon icon="mdi:close"></ha-icon></button>
        </div>
        ${_||f?Dt`
          <div class="rs-tabs" role="tablist" aria-label=${this._t("{name} sections",{name:s})}>
            ${tabBtn("clean",this._t("Clean"),"mdi:broom",!1)}
            ${_?tabBtn("dock",this._t("Dock"),"mdi:home-outline",v.dock):It}
            ${f?tabBtn("care",this._t("Care"),"mdi:toolbox-outline",v.care):It}
          </div>`:It}
        ${"dock"===b?this._renderDockTab(o):"care"===b?this._renderCareTab(o):w}
      </div>`}_renderStatusCard(e,o){const s=this._isCleaning(e),l=this._isPaused(e),h=this._color(e),d=this._vacName(e),[p,u,m]=this._statusInfo(e),_=this._battery(e),f=this._jobProgress(),v=(f?.vacuums??{})[e.entity],b=this._ent(e,"current_room"),w=b?this.hass.states[b]?.state:void 0,$=v?.room??(w&&"unknown"!==w&&"unavailable"!==w?w:void 0)??this._intAttrs(e)?.vacuum_room_name,C="number"==typeof v?.pct?v.pct:this._progress(e),A=this._ent(e,"error"),F=this._hasError(e)?this.hass.states[A]?.state:null,E=F||(s&&v?.next_room?this._t("Next: {room}",{room:v.next_room}):this._t("Last clean {when}",{when:this._lastCleanStr(e)})),T=!!(this._pinPending?.[e.entity]||this._zonePending?.[e.entity]||l),O="pause-"+o,B=s&&!T,q="tile-"+o,j=this._shownSet.has(o);return Dt`
      <div class="status-card status-tile ${s?"status-tile--live":""}" style=${Xt({border:s?"1.5px solid "+h:"1px solid var(--avc-panel-line)"})}>
        <div class="tile-row">
        <button class="tile-main ${this._holdId===q?"tile-main--holding":""} ${j?"":"tile-main--hidden"}"
          aria-label="${d} — open controls" aria-pressed=${j?"true":"false"}
          title="${d} — tap for controls, hold to ${j?"hide it on":"show it on"} the map"
          @pointerdown=${e=>{this._cancelHold(),this._tileHoldFired=!1,this._holdId=q,this._holdStartPos={x:e.clientX,y:e.clientY},this._holdTimer=setTimeout(()=>{this._holdTimer=null,this._holdId=null,this._tileHoldFired=!0,this._toggleShownMulti(o)},te)}}
          @pointermove=${this._holdMove}
          @pointerup=${()=>{this._holdId===q&&this._cancelHold()}}
          @pointerleave=${()=>{this._holdId===q&&this._cancelHold()}}
          @pointercancel=${()=>{this._holdId===q&&this._cancelHold()}}
          @click=${()=>{this._tileHoldFired?this._tileHoldFired=!1:this._robotSheet=o}}>
          <div class="hold-ring"></div>
          ${this._renderBattRing(e,50)}
          <span class="tile-text">
            <span class="tile-name"><span class="tile-dot" style=${Xt({background:h})}></span>${d}${j?It:Dt`<ha-icon class="tile-hidden-ico" icon="mdi:eye-off-outline"></ha-icon>`}</span>
            <span class="tile-status" style=${Xt({color:F?"rgb(var(--avc-err-rgb))":u})}>
              <ha-icon icon=${F?"mdi:alert-circle-outline":m}></ha-icon>${p}${$?Dt`<span class="tile-room"> · ${$}</span>`:It}
            </span>
            <span class="tile-sub">${E}</span>
          </span>
          <span class="tile-right">
            ${s&&null!==C?Dt`
              <b>${C}&thinsp;%</b>
              <span class="tile-bar"><span style=${Xt({width:Math.min(100,C)+"%",background:h})}></span></span>`:null!==_?Dt`<small>${_}&thinsp;%</small>`:It}
          </span>
          <ha-icon class="tile-chev" icon="mdi:chevron-right"></ha-icon>
        </button>
        ${B?Dt`<button class="tile-pause ${this._holdId===O?"action-btn--holding":""}"
            aria-label=${this._t("Pause {name} (hold)",{name:d})} title=${this._t("Hold to pause")}
            @pointerdown=${this._holdStart(O,()=>this._pause(e))}
            @pointermove=${this._holdMove}
            @pointerup=${this._holdEnd}
            @pointerleave=${this._holdEnd}
            @pointercancel=${this._holdEnd}>
            <div class="hold-ring"></div><ha-icon icon="mdi:pause"></ha-icon>
          </button>`:It}
        </div>
        ${T?this._renderActions(e,o):It}
        ${this._renderDebugProgress(e)}
      </div>
    `}_renderMiniGauge(e,o,s,l){return Dt`
      <span class="mini-gauge-wrap">
        <ha-icon class="mini-gauge-ico" icon=${s} style=${Xt({color:o})}></ha-icon>
        <span class="mini-gauge" style=${Xt({background:`conic-gradient(${o} ${3.6*e}deg, rgba(var(--avc-ink-rgb),0.12) 0)`})}>
          <span>${e}${l?"~":""}</span>
        </span>
      </span>`}_currentRoomName(e){return this._intAttrs(e)?.vacuum_room_name}_mmss(e){const o=Math.max(0,Math.round(e));return`${Math.floor(o/60)}:${String(o%60).padStart(2,"0")}`}_renderDebugProgress(e){if(!this._config.debug_room_progress)return It;const o=this._roomsFor(e).map(o=>({r:o,p:this._roomProgress(e,o)})).filter(e=>e.p&&(null!=e.p.dry_pct||null!=e.p.wet_pct||null!=e.p.elapsed_s));if(!o.length)return It;const s=this._color(e),l=this._intEntity(e),h=l?Date.parse(this.hass.states[l]?.last_updated??""):NaN,d=this._currentRoomName(e),p=this._isCleaning(e),u=this._isPaused(e),m=!p&&!u||isNaN(h)?0:Math.max(0,(this._now-h)/1e3);return Dt`
      <div class="dbg-prog">
        ${o.map(({r:e,p:o})=>{const l=(e.key===d||e.name===d)&&(p||u),h=(o.elapsed_s??0)+(l?m:0);let _=o.est_s??null;l&&u&&null!=_&&(_+=m);const f=null!=_?`${this._mmss(h)}/${this._mmss(_)}`:this._mmss(h),v=o.passes&&o.passes>1?o.dry_pass??o.wet_pass:null,b=[null!=o.dry_floor?`dry floor ${o.dry_floor}%`:"",null!=o.wet_floor?`wet floor ${o.wet_floor}%`:""].filter(Boolean).join(" · ");return Dt`
            <span class="dbg-prog-item" title=${`dry ${o.dry_pct??"—"}% · wet ${o.wet_pct??"—"}%${b?" · "+b:""}`}>
              ${e.icon?Dt`<ha-icon icon=${e.icon}></ha-icon>`:It}
              <span class="dbg-prog-name">${e.name??e.key}</span>
              ${null!=o.dry_pct?this._renderMiniGauge(o.dry_pct,s,"mdi:broom",!!o.dry_calibrating):It}
              ${null!=o.wet_pct?this._renderMiniGauge(o.wet_pct,"rgb(var(--avc-info-rgb))","mdi:water",!!o.wet_calibrating):It}
              ${null!=v?Dt`<small title="Pass">${v}/${o.passes}</small>`:It}
              ${null!=o.elapsed_s?Dt`<small>${f}</small>`:It}
            </span>
          `})}
      </div>
    `}_shownOrdered(){return[...this._shownSet].filter(e=>e<this._config.vacuums.length).sort((e,o)=>e-o)}_gridShown(){const e=this._shownOrdered();return"portrait"===this._profile&&"merged"!==this._config.map_mode&&e.length>1?e.slice(0,1):e}_regionTemplate(e,o){const s=this._gridShown(),l="merged"===this._config.map_mode,vacsOf=e=>e.map(e=>this._config.vacuums[e]);switch(e){case"badges":return Dt`<div class="badges-row badges-row--grid">
          ${"landscape"===this._profile?It:this._config.vacuums.map((e,o)=>this._renderBadge(e,o))}
          ${(this._config.global_actions??[]).map((e,o)=>this._renderGlobalBadge(e,o))}
        </div>`;case"autobar":return this._renderAutoBar();case"plan":return this._renderPlanPreview();case"picker":return this._renderVacuumPicker();case"map":return l?this._renderResponsive(this._renderMergedMap()):Dt`${s.map(e=>this._renderResponsive(this._renderMap(this._config.vacuums[e])))}`;case"tools":return this._renderMetaBar(vacsOf(s));case"hero":{const e=this._renderHero(this._config.vacuums);return e===It?It:Dt`<div class="meta-bar meta-bar--hero">${e}</div>`}case"dock":return this._renderDock(!("start"in o.place),"landscape"===this._profile&&!("picker"in o.place));case"start":return this._renderStartBar();case"status":return this._usesPlanColumn()?Dt`${this._config.vacuums.map((e,o)=>this._renderStatusCard(e,o))}`:Dt`${s.map(e=>this._renderStatusCard(this._config.vacuums[e],e))}`;default:return null}}_themed(){return"legacy"!==(this._config.theme??re)}_resolvedPalette(){const e=this._config.theme??re;if("light"===e)return"light";if("auto"!==e)return"dark";const o=this.hass?.themes?.darkMode;if("boolean"==typeof o)return o?"dark":"light";try{return window.matchMedia?.("(prefers-color-scheme: light)").matches?"light":"dark"}catch{return"dark"}}_rootClasses(){const e=this._config.theme??re,o=[];return"legacy"!==e&&(o.push("avc-theme","avc-theme--"+e),"auto"===e&&o.push("avc-theme--"+this._resolvedPalette())),this._config.reduce_motion&&o.push("avc-still"),this._isCalm()&&o.push("avc-calm"),o.join(" ")}_rootVars(){const e=this._config.accent;if(!e)return{};const o=function hexToRgbChannel(e){const o=/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(e.trim());if(!o)return null;let s=o[1];return 3===s.length&&(s=s.split("").map(e=>e+e).join("")),[0,2,4].map(e=>parseInt(s.slice(e,e+2),16)).join(", ")}(e);return o?{"--avc-accent-rgb":o}:{}}_isCalm(){if(!1===this._config.calm_state)return!1;if("normal"!==this._mapMode)return!1;if(this._modeSheetOpen)return!1;const e=this._config.vacuums;return!e.some(e=>this._isCleaning(e)||this._hasError(e))&&!this._allRoomKeys().some(o=>this._isRoomSelectedAny(o,e))}_renderGrid(e){const o="portrait"===this._profile&&this._stackTopology;let s=o?fe:function resolveProfile(e,o){const s=e[o]??{},l=ve[o];return{columns:s.columns?.length?s.columns:l.columns,rows:s.rows?.length?s.rows:l.rows,place:s.place&&Object.keys(s.place).length?s.place:l.place}}(e,this._profile);const l="hero"in s.place?this._regionTemplate("hero",s):It;null!=l&&l!==It||(s=function withoutRegion(e,o){const s=e.place[o];if(!s)return e;const l={...e.place};delete l[o];const h="number"==typeof s.row?s.row:Number(s.row);if(!Number.isInteger(h)||h<1||h>e.rows.length)return{...e,place:l};const lines=e=>{if(void 0===e)return null;const o=String(e).split("/").map(e=>Number(e.trim()));return o.every(e=>Number.isInteger(e)&&e>0)?o:null};for(const o of Object.values(l)){const s=lines(o.row);if(!s)return{...e,place:l};const d=s[0],p=s.length>1?s[1]:d+1;if(d<=h&&p>h)return{...e,place:l}}const shift=e=>e>h?e-1:e,d={};for(const[e,o]of Object.entries(l)){const s=lines(o.row);d[e]={...o,row:s.length>1?s.map(shift).join("/"):shift(s[0])}}return{...e,rows:e.rows.filter((e,o)=>o!==h-1),place:d}}(s,"hero"));const h=this._schemaWarning();return Dt`
      <ha-card class=${this._rootClasses()} style=${Xt({padding:"0",display:"block",...this._rootVars()})}>
        ${this.editMode?Dt`<div class="version-chip">
          <div>v${Qt} · ${Math.round(this._cardW)}w · ${this._profile}</div>
          ${this._config.debug?Dt`<div>${o?"stack":this._themed()?"rail":"split"} · box:${Math.round(this._mapAvailW)}x${Math.round(this._mapAvailH)}</div>`:It}
        </div>`:It}
        <div class="avc-grid avc-grid--${this._profile}" style=${Xt(function gridRootStyles(e,o){return{display:"grid",width:"100%",height:resolveHeightCss(e),alignContent:"start",gridTemplateColumns:trackList(o.columns),gridTemplateRows:trackList(o.rows),gap:e.gap??"6px",boxSizing:"border-box"}}(e,s))}>
          ${h?Dt`<div class="avc-schemawarn">
            <ha-icon icon="mdi:alert" style="--mdc-icon-size:18px"></ha-icon><span>${h}</span>
          </div>`:It}
          ${Object.entries(s.place).map(([e,o])=>{const h="hero"===e?l:this._regionTemplate(e,s);return null==h||h===It?It:Dt`<div class="avc-region avc-region--${e}" style=${Xt(function regionStyles(e){const o={gridRow:String(e.row??"auto"),gridColumn:String(e.col??"1"),overflow:e.overflow??"hidden",position:"relative",minWidth:"0",minHeight:"0"};return e.align&&"stretch"!==e.align&&(o.alignSelf=e.align),o}(o))}>${h}</div>`})}
        </div>
        ${this._renderRobotSheet()}${this._renderQueueSheet()}${this._renderSpBar()}${this._renderVeNotice()}
      </ha-card>
    `}render(){if(!this._config||!this.hass)return It;if(this._config.layout)return this._renderGrid(this._config.layout);const e=this._schemaWarning();return Dt`
      <ha-card class=${this._rootClasses()} style=${Xt(this._rootVars())}>
        ${this.editMode?Dt`<div class="version-chip">v${Qt} · ${Math.round(this._cardW)}w</div>`:It}
        ${e?Dt`<div style="margin:0 4px;padding:8px 12px;border-radius:var(--avc-th-r-l,12px);border:1px solid rgba(var(--avc-warn-rgb),0.55);background:rgba(var(--avc-warn-rgb),0.12);color:rgb(var(--avc-warn-rgb));font-size:var(--avc-th-fs-s,12px);display:flex;align-items:center;gap:8px">
          <ha-icon icon="mdi:alert" style="--mdc-icon-size:18px"></ha-icon><span>${e}</span>
        </div>`:It}
        <div class="badges-row">
          ${this._config.vacuums.map((e,o)=>this._renderBadge(e,o))}
          ${(this._config.global_actions??[]).map((e,o)=>this._renderGlobalBadge(e,o))}
        </div>
        ${this._renderAutoBar()}
        ${this._renderPlanPreview()}
        ${"merged"===this._config.map_mode?Dt`
              ${this._renderResponsive(this._renderMergedMap())}
              ${this._shownOrdered().map(e=>Dt`
                ${this._renderMapTools(this._config.vacuums[e])}
                ${this._renderStatusCard(this._config.vacuums[e],e)}
              `)}
            `:this._shownOrdered().map(e=>Dt`
                ${this._renderResponsive(this._renderMap(this._config.vacuums[e]))}
                ${this._renderMapTools(this._config.vacuums[e])}
                ${this._renderStatusCard(this._config.vacuums[e],e)}
              `)}
        ${this._renderRobotSheet()}${this._renderQueueSheet()}${this._renderSpBar()}${this._renderVeNotice()}
      </ha-card>
    `}};$e.styles=i$6`
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

    /* docs/49 E1: the card root carries its OWN ink. Titles and names that set
     * no colour used to inherit --primary-text-color from Home Assistant — white
     * on a dark HA theme, dark on a light one — whatever palette the card itself
     * was painting (measured: theme dark on a light HA gave unreadable titles).
     * rgb(var(--avc-ink-rgb)) is spelled out here, at the use site, on purpose
     * (see the channel note in :host). */
    ha-card.avc-theme { color: rgb(var(--avc-ink-rgb)); }
    /* ...and what is painted on the vacuum's own map bitmap stays white-on-dark:
     * .map-wrap resets the channels, this resets the colour that would otherwise
     * be inherited from the root. */
    .avc-theme .map-wrap { color: rgb(var(--avc-ink-rgb)); }

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
      background: rgba(var(--avc-err-rgb), 0.16);
      border-color: rgba(var(--avc-err-rgb), 0.6);
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
    .furniture-layer { position: absolute; inset: 0; pointer-events: none; transform-origin: center center; }
    .furniture-layer svg { display: block; width: 100%; height: 100%; overflow: visible; }
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
    /* docs/49 E2 (below, with the structural pass): the themed root paints its own
     * opaque base from --avc-scrim-rgb, so the palette never depends on what
     * dashboard colour happens to sit behind the card. */
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

    /* auto = the dark palette, or the light one: _resolvedPalette() adds the
     * matching .avc-theme--dark / .avc-theme--light class next to
     * .avc-theme--auto (Home Assistant's own dark-mode verdict first, the
     * browser's preference as the fallback), so no palette is restated here and
     * a transition is a class swap, not a media query (docs/49 E3). */

    /* ══ Structural pass — every theme except legacy ═════════════════════
     * The token flip above only changes colour. This is the part that changes
     * the card's genre: panels carry elevation instead of a hairline outline.
     * Corners and type sizes are NOT set here any more — they come from the
     * one K8 scale (--avc-th-*, see the token block at the top). legacy
     * simply never gets the .avc-theme class, so none of this applies to it. */
    ha-card.avc-theme { background: rgb(var(--avc-scrim-rgb)); }
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
    /* docs/49 F4: secondary text was tuned on the dark panel (ink at 0.5–0.6);
     * on a light panel that is 3.3–4.4:1. One step stronger there, same hue. */
    .avc-theme--light .tile-sub,
    .avc-theme--light .tile-room,
    .avc-theme--light .plan-when,
    .avc-theme--light .plan-sum small,
    .avc-theme--light .rail-hint,
    .avc-theme--light .rail-card-head small,
    .avc-theme--light .plan-kind { color: rgba(var(--avc-ink-rgb), 0.74); }
    .avc-theme--light .plan-row--done .plan-name { color: rgba(var(--avc-ink-rgb), 0.7); }
    .avc-theme--light .plan-row--done .plan-when,
    .avc-theme--light .plan-row--active .plan-when { color: rgb(var(--avc-ok-rgb)); }
    .avc-theme--light .plan-clear { color: rgb(var(--avc-ink-rgb)); text-decoration: underline; }

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
      min-height: 22px; display: flex; align-items: baseline; justify-content: space-between; gap: 8px; padding: 2px 4px 0;
      font-size: var(--avc-fs-m); font-weight: 600;
    }
    .plan-clear {
      border: none; background: none; padding: 0; cursor: pointer; font: inherit;
      font-size: var(--avc-fs-s); font-weight: 500; color: rgb(var(--avc-accent-rgb));
    }
    /* F1: a fixed height (rows reserved, docs/49), not one that follows the row
     * count — the map next to it must not move when the selection changes. */
    .plan-rows {
      display: flex; flex-direction: column; min-height: 0; overflow-y: auto;
      flex: 0 0 auto; height: calc(var(--plan-n, 3) * 35px);
    }
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
    /* ── docs/52 (card 1.62.0): the room-by-room queue ────────────────── */
    .q-col .plan-head { align-items: center; }
    /* A stable width: the column must not change size (and move the map) when
     * a row opens its actions, the view switches or the Add panel opens. */
    .q-col { width: 520px; max-width: 48vw; box-sizing: border-box; }
    .q-scroll { flex: 1 1 auto; min-height: 0; overflow-y: auto; display: flex; flex-direction: column; gap: 8px; }
    .q-views { display: inline-flex; gap: 2px; padding: 2px; border-radius: var(--avc-r-m); background: rgba(var(--avc-ink-rgb), 0.07); }
    .q-view {
      width: 32px; height: 28px; border: none; border-radius: var(--avc-r-s, 8px); cursor: pointer; padding: 0;
      display: flex; align-items: center; justify-content: center; --mdc-icon-size: 17px;
      background: transparent; color: rgba(var(--avc-ink-rgb), 0.6);
    }
    .q-view.on { background: rgba(var(--avc-ink-rgb), 0.14); color: rgb(var(--avc-ink-rgb)); }
    .q-lanes { display: flex; gap: 8px; min-height: 0; }
    .q-lanes--sheet { flex-direction: column; }
    .q-lane {
      flex: 1 1 0; min-width: 0; display: flex; flex-direction: column; gap: 2px;
      padding: 8px; border-radius: var(--avc-r-m); background: rgba(var(--avc-ink-rgb), 0.04);
    }
    .q-lane-head { display: flex; align-items: center; gap: 8px; padding: 0 2px 4px; }
    .q-lane-name { display: flex; flex-direction: column; min-width: 0; flex: 1; font-size: var(--avc-fs-m); font-weight: 600; }
    .q-lane-name small, .q-name small { font-size: var(--avc-fs-s); font-weight: 400; color: rgba(var(--avc-ink-rgb), 0.6); }
    .q-kind {
      font-size: var(--avc-fs-xs); padding: 1px 7px; border-radius: var(--avc-r-pill);
      background: rgba(var(--avc-ink-rgb), 0.08); color: rgba(var(--avc-ink-rgb), 0.7);
    }
    .q-item--sel { border-radius: var(--avc-r-m); background: rgba(var(--avc-ink-rgb), 0.06); box-shadow: inset 0 0 0 1px rgba(var(--avc-ink-rgb), 0.14); }
    .q-row {
      position: relative; display: flex; align-items: center; gap: 8px; min-height: 36px; padding: 0 8px;
      border-radius: var(--avc-r-m); font-size: var(--avc-fs-m); outline-offset: -2px;
    }
    .q-row[role="button"] { cursor: pointer; }
    .q-lead { --mdc-icon-size: 15px; flex-shrink: 0; color: rgba(var(--avc-ink-rgb), 0.5); }
    .q-lead--ok { color: rgb(var(--avc-ok-rgb)); }
    .q-lead--err { color: rgb(var(--avc-err-rgb)); }
    .q-name { flex: 1; min-width: 0; display: block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .q-row--done .q-name { color: rgba(var(--avc-ink-rgb), 0.5); }
    .q-row--active .q-name { font-weight: 600; }
    .q-row--blocked { background: rgba(var(--avc-err-rgb), 0.09); }
    small.q-reason { display: block; white-space: normal; color: rgb(var(--avc-err-rgb)); }
    .q-right {
      display: inline-flex; align-items: center; gap: 4px; white-space: nowrap; font-variant-numeric: tabular-nums;
      font-size: var(--avc-fs-s); color: rgba(var(--avc-ink-rgb), 0.62); --mdc-icon-size: 14px;
    }
    .q-pct { color: rgb(var(--avc-ok-rgb)); font-weight: 600; }
    .q-wait { display: inline-flex; align-items: center; gap: 3px; }
    .q-bar { position: absolute; left: 8px; right: 8px; bottom: 3px; height: 3px; border-radius: 2px; background: rgba(var(--avc-ink-rgb), 0.08); overflow: hidden; }
    .q-bar span { display: block; height: 100%; }
    .q-retry, .q-act {
      height: 30px; padding: 0 10px; border: none; border-radius: var(--avc-r-s, 8px); cursor: pointer;
      display: inline-flex; align-items: center; justify-content: center; gap: 5px; --mdc-icon-size: 16px;
      font: inherit; font-size: var(--avc-fs-s); font-weight: 600;
      background: rgba(var(--avc-ink-rgb), 0.1); color: rgb(var(--avc-ink-rgb));
    }
    .q-retry { background: rgba(var(--avc-err-rgb), 0.16); color: rgb(var(--avc-err-rgb)); }
    .q-act { width: 36px; padding: 0; position: relative; overflow: hidden; }
    .q-act--wide { width: auto; padding: 0 10px; flex: 1; }
    .q-act--err { background: rgba(var(--avc-err-rgb), 0.14); color: rgb(var(--avc-err-rgb)); }
    .q-act:disabled { opacity: 0.35; cursor: default; }
    .q-actions { display: flex; flex-wrap: wrap; gap: 4px; padding: 2px 6px 6px; }
    .q-alerts { display: flex; flex-direction: column; gap: 4px; padding: 8px 10px; border-radius: var(--avc-r-m); background: rgba(var(--avc-err-rgb), 0.12); font-size: var(--avc-fs-s); }
    .q-alerts span { display: flex; align-items: flex-start; gap: 6px; --mdc-icon-size: 15px; }
    .q-alerts ha-icon { color: rgb(var(--avc-err-rgb)); flex-shrink: 0; }
    .q-alerts .q-alert--warn ha-icon { color: rgb(var(--avc-warn-rgb, 224, 168, 74)); }
    .q-time { display: grid; grid-template-columns: 1fr 1fr; gap: 6px 14px; align-content: start; }
    .q-time--sheet { grid-template-columns: 1fr; }
    .q-time-col { display: flex; flex-direction: column; gap: 8px; min-width: 0; }
    .q-sec { display: flex; flex-direction: column; gap: 1px; }
    .q-sec-title { font-size: var(--avc-fs-xs); text-transform: uppercase; letter-spacing: 0.05em; color: rgba(var(--avc-ink-rgb), 0.5); padding: 0 8px 3px; }
    .q-add-btn { flex-shrink: 0; }
    .q-add { display: flex; flex-direction: column; gap: 10px; padding: 10px; border-radius: var(--avc-r-m); background: rgba(var(--avc-ink-rgb), 0.04); }
    .q-add-head { display: flex; align-items: center; justify-content: space-between; font-size: var(--avc-fs-m); }
    .q-add-x { width: 32px; height: 32px; }
    .q-add-rooms { display: flex; flex-wrap: wrap; gap: 6px; }
    .q-room {
      min-height: 34px; padding: 0 12px; border-radius: var(--avc-r-m); cursor: pointer; font: inherit; font-size: var(--avc-fs-m);
      border: 1px solid rgba(var(--avc-ink-rgb), 0.16); background: transparent; color: rgb(var(--avc-ink-rgb));
    }
    .q-room.on { border-color: rgb(var(--avc-accent-rgb)); background: rgba(var(--avc-accent-rgb), 0.16); font-weight: 600; }
    .q-room:disabled { opacity: 0.35; cursor: default; }
    .q-add-hint { font-size: var(--avc-fs-s); color: rgba(var(--avc-ink-rgb), 0.55); }
    .q-add-go { justify-content: center; }
    .q-foot { display: flex; align-items: center; gap: 8px; }
    .q-foot .dock-run { flex: 1; justify-content: center; padding: 12px 14px; }
    .q-left { font-size: var(--avc-fs-s); color: rgba(var(--avc-ink-rgb), 0.6); text-align: center; }
    .q-sheet .robot-sheet-head { align-items: center; }
    .rail-plan--open, .meta-hero--open { cursor: pointer; }
    .avc-notice {
      display: flex; align-items: center; gap: 8px; padding: 8px 10px; border-radius: var(--avc-r-m);
      background: rgba(var(--avc-err-rgb), 0.14); font-size: var(--avc-fs-s); --mdc-icon-size: 16px;
    }
    .avc-notice > ha-icon { color: rgb(var(--avc-err-rgb)); flex-shrink: 0; }
    .avc-notice span { flex: 1; }
    .avc-notice-x { border: none; background: none; color: inherit; cursor: pointer; padding: 2px; display: flex; }
    /* ── service points (docs/52 §5 item 7) ─────────────────────────────── */
    .sp-section { display: flex; flex-direction: column; gap: 8px; }
    .sp-row {
      display: flex; align-items: center; gap: 10px; padding: 8px 8px 8px 12px;
      border-radius: var(--avc-r-m); background: rgba(var(--avc-ink-rgb), 0.05);
    }
    .sp-flag { --mdc-icon-size: 20px; color: #E0A84A; flex-shrink: 0; }
    .sp-text { display: flex; flex-direction: column; flex: 1; min-width: 0; font-size: var(--avc-fs-m); }
    .sp-text small { font-size: var(--avc-fs-s); color: rgba(var(--avc-ink-rgb), 0.6); }
    .sp-go {
      height: 38px; padding: 0 14px; border: none; border-radius: var(--avc-r-m); cursor: pointer;
      display: inline-flex; align-items: center; gap: 5px; --mdc-icon-size: 16px;
      font: inherit; font-weight: 700; font-size: var(--avc-fs-m);
      background: rgba(224, 168, 74, 0.18); color: #E0A84A;
    }
    .avc-theme--light .sp-go { color: #8a5a00; }
    .sp-go:disabled { background: rgba(var(--avc-ink-rgb), 0.07); color: rgba(var(--avc-ink-rgb), 0.4); cursor: not-allowed; }
    .sp-more { width: 36px; height: 38px; background: transparent; }
    .sp-menu { display: flex; gap: 6px; flex-wrap: wrap; padding: 0 4px; }
    .sp-del { color: rgb(var(--avc-err-rgb)); }
    .sp-why { display: flex; gap: 7px; align-items: flex-start; font-size: var(--avc-fs-s); line-height: 1.4; color: rgba(var(--avc-ink-rgb), 0.6); --mdc-icon-size: 15px; }
    .sp-add {
      min-height: 40px; border: 1px dashed rgba(var(--avc-ink-rgb), 0.2); border-radius: var(--avc-r-m); cursor: pointer;
      background: transparent; color: rgba(var(--avc-ink-rgb), 0.7); font: inherit; font-size: var(--avc-fs-m);
      display: flex; align-items: center; justify-content: center; gap: 6px; --mdc-icon-size: 16px;
    }
    .sp-here {
      display: flex; align-items: center; gap: 12px; padding: 12px; border-radius: var(--avc-r-m);
      background: rgba(224, 168, 74, 0.1); box-shadow: inset 0 0 0 1px rgba(224, 168, 74, 0.35); --mdc-icon-size: 20px;
    }
    .sp-here > ha-icon { color: #E0A84A; }
    .sp-here span { display: flex; flex-direction: column; font-size: var(--avc-fs-m); }
    .sp-here small { font-size: var(--avc-fs-s); color: rgba(var(--avc-ink-rgb), 0.6); }
    .sp-home { justify-content: center; }
    .sp-bar {
      position: absolute; left: 50%; bottom: 0; z-index: 41; transform: translateX(-50%);
      width: min(520px, 100%); box-sizing: border-box; display: flex; flex-direction: column; gap: 10px;
      padding: 12px 16px 14px; border-radius: var(--avc-th-r-l, 22px) var(--avc-th-r-l, 22px) 0 0;
      background: rgb(var(--avc-scrim-2-rgb)); color: rgb(var(--avc-ink-rgb)); box-shadow: 0 -12px 40px rgba(0, 0, 0, 0.45);
    }
    .sp-bar-head { display: flex; align-items: center; gap: 8px; font-size: var(--avc-fs-l, 15px); }
    .sp-bar-hint { display: flex; align-items: center; gap: 6px; font-size: var(--avc-fs-s); color: rgba(var(--avc-ink-rgb), 0.7); --mdc-icon-size: 16px; }
    .sp-bar-hint ha-icon { color: #E0A84A; }
    .sp-name { display: flex; align-items: center; gap: 10px; font-size: var(--avc-fs-s); color: rgba(var(--avc-ink-rgb), 0.6); }
    .sp-name-input {
      flex: 1; height: 38px; box-sizing: border-box; padding: 0 10px; border-radius: var(--avc-r-m);
      border: 1px solid rgba(var(--avc-ink-rgb), 0.18); background: rgba(var(--avc-ink-rgb), 0.04);
      color: rgb(var(--avc-ink-rgb)); font: inherit; font-size: var(--avc-fs-m);
    }
    .sp-bar-btns { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
    .sp-bar-gap { flex: 1; }
    .sp-save { padding: 10px 18px; }
    .avc-sp-ring { animation: avc-sp-pulse 1.8s ease-out infinite; transform-box: fill-box; transform-origin: center; }
    @keyframes avc-sp-pulse { from { opacity: 0.9; transform: scale(0.7); } to { opacity: 0; transform: scale(1.4); } }
    @media (prefers-reduced-motion: reduce) { .avc-sp-ring { animation: none; } }
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
    .rail-clear { align-self: flex-start; padding: 4px 12px; min-height: 44px; }
    .rail-warn { display: flex; align-items: center; gap: 4px; color: rgb(var(--avc-err-rgb)); font-size: var(--avc-fs-xs); }
    .rail-warn ha-icon { --mdc-icon-size: 14px; flex-shrink: 0; }
    .rail-plan-row { display: flex; align-items: center; gap: 6px; min-width: 0; }
    .rail-plan-row ha-icon { --mdc-icon-size: 14px; flex-shrink: 0; }
    .rail-plan-name { flex: 1; min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .rail-plan-row b { font-size: var(--avc-fs-xs); font-variant-numeric: tabular-nums; }
    .rail-plan-row--done { opacity: 0.5; }
    .rail-plan-row--done .rail-plan-state { color: rgb(var(--avc-ok-rgb)); }
    .rail-plan-row--active .rail-plan-name { font-weight: 600; }
    .rail-tools { display: grid; grid-template-columns: repeat(auto-fit, minmax(44px, 1fr)); gap: 4px; margin-top: auto; flex-shrink: 0; }
    .rail-tools .mtbtn { justify-content: center; padding: 8px 0; min-width: 44px; min-height: 44px; box-sizing: border-box; } /* F5: touch target */
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
      background: linear-gradient(180deg, rgba(var(--avc-err-rgb), 0.28), rgba(var(--avc-err-rgb), 0.16));
      border-color: rgba(var(--avc-err-rgb), 0.55);
      box-shadow: 0 6px 18px rgba(var(--avc-err-rgb), 0.14);
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
    /* == Visual editor: Furniture tool (docs/51 §1.3) ===================== */
    .furn-room-ref { pointer-events: none; cursor: default; border-width: 1px; border-style: dashed; background: transparent; opacity: 0.55; }
    .furniture-layer--edit { pointer-events: none; }
    .furn-svg .furn-hit { fill: transparent; pointer-events: all; cursor: move; touch-action: none; }
    .furn-svg .furn-outline { fill: none; stroke: rgb(var(--avc-tool-rgb)); stroke-width: 1.5; vector-effect: non-scaling-stroke; pointer-events: none; }
    .furn-svg .furn-rot-line { stroke: rgb(var(--avc-tool-rgb)); stroke-width: 1.5; vector-effect: non-scaling-stroke; pointer-events: none; }
    .furn-svg .furn-handle { fill: #fff; stroke: rgb(var(--avc-tool-rgb)); stroke-width: 2; vector-effect: non-scaling-stroke; pointer-events: all; touch-action: none; }
    .furn-svg .furn-handle--nw, .furn-svg .furn-handle--se { cursor: nwse-resize; }
    .furn-svg .furn-handle--ne, .furn-svg .furn-handle--sw { cursor: nesw-resize; }
    .furn-svg .furn-handle--rot { cursor: grab; }
    .furn-svg image { pointer-events: none; }
    .align-seat-img.align-reach-img { pointer-events: none; cursor: default; }
    .furn-reach-img { opacity: 0.45; }
    .reach-home-img { pointer-events: none; }
    .furn-assets, .furn-list, .furn-url-row, .furn-actions, .furn-check { flex: 0 0 auto; }
    .furn-file { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .furn-assets { display: grid; grid-template-columns: repeat(auto-fill, minmax(84px, 1fr)); gap: 6px; max-height: 220px; overflow: auto; }
    .furn-asset, .furn-list-item {
      display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 6px; min-width: 0;
      border: 1px solid rgba(var(--avc-ink-rgb), 0.12); border-radius: var(--avc-th-r-s, 6px);
      background: rgba(var(--avc-ink-rgb), 0.04); color: inherit; font: inherit; font-size: var(--avc-th-fs-xs, 11px); cursor: pointer;
    }
    .furn-asset img, .furn-list-item img { width: 48px; height: 36px; object-fit: contain; }
    .furn-asset span, .furn-list-item span { max-width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .furn-list { display: flex; flex-direction: column; gap: 4px; }
    .furn-list-item { flex-direction: row; justify-content: flex-start; }
    .furn-list-item.on { border-color: rgb(var(--avc-tool-rgb)); background: rgba(var(--avc-tool-rgb), 0.12); }
    .furn-url-row { display: flex; gap: 6px; align-items: center; }
    .furn-url-row input { flex: 1 1 auto; min-width: 0; }
    .furn-actions { display: flex; gap: 6px; }
    .furn-upload { width: auto; align-self: flex-start; padding: 0 10px; gap: 6px; position: relative; cursor: pointer; flex: 0 0 auto; }
    .furn-file-input { position: absolute; inset: 0; opacity: 0; cursor: pointer; width: 100%; }
    .furn-check { display: flex; gap: 6px; align-items: center; font-size: var(--avc-th-fs-s, 12px); }
    .furn-error { color: rgb(var(--avc-err-rgb)); }
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
  `,__decorate([n$1({attribute:!1})],$e.prototype,"hass",void 0),__decorate([n$1({attribute:!1})],$e.prototype,"editMode",void 0),__decorate([r()],$e.prototype,"_config",void 0),__decorate([r()],$e.prototype,"_shownSet",void 0),__decorate([r()],$e.prototype,"_holdId",void 0),__decorate([r()],$e.prototype,"_mapMode",void 0),__decorate([r()],$e.prototype,"_inspectKey",void 0),__decorate([r()],$e.prototype,"_robotSheet",void 0),__decorate([r()],$e.prototype,"_robotSheetTab",void 0),__decorate([r()],$e.prototype,"_veNotice",void 0),__decorate([r()],$e.prototype,"_modeSheetOpen",void 0),__decorate([r()],$e.prototype,"_careResetPending",void 0),__decorate([r()],$e.prototype,"_modeEntity",void 0),__decorate([r()],$e.prototype,"_dbg",void 0),__decorate([r()],$e.prototype,"_zoneDrag",void 0),__decorate([r()],$e.prototype,"_zoneRectShown",void 0),__decorate([r()],$e.prototype,"_zonePending",void 0),__decorate([r()],$e.prototype,"_zoneEdit",void 0),__decorate([r()],$e.prototype,"_pinPending",void 0),__decorate([r()],$e.prototype,"_queueView",void 0),__decorate([r()],$e.prototype,"_queueSel",void 0),__decorate([r()],$e.prototype,"_queueAdd",void 0),__decorate([r()],$e.prototype,"_queueSheet",void 0),__decorate([r()],$e.prototype,"_spSet",void 0),__decorate([r()],$e.prototype,"_spMenu",void 0),__decorate([r()],$e.prototype,"_spDelete",void 0),__decorate([r()],$e.prototype,"_notice",void 0),__decorate([r()],$e.prototype,"_layers",void 0),__decorate([r()],$e.prototype,"_layerMenu",void 0),__decorate([r()],$e.prototype,"_localRoomSel",void 0),__decorate([r()],$e.prototype,"_activePresets",void 0),__decorate([r()],$e.prototype,"_planMode",void 0),__decorate([r()],$e.prototype,"_activeGlobalPreset",void 0),__decorate([r()],$e.prototype,"_cardW",void 0),__decorate([r()],$e.prototype,"_mapAR",void 0),__decorate([r()],$e.prototype,"_alignSession",void 0),__decorate([r()],$e.prototype,"_alignView",void 0),__decorate([r()],$e.prototype,"_alignCancelConfirm",void 0),__decorate([r()],$e.prototype,"_alignCopiedFlash",void 0),__decorate([r()],$e.prototype,"_veTool",void 0),__decorate([r()],$e.prototype,"_roomsSession",void 0),__decorate([r()],$e.prototype,"_furnSession",void 0),__decorate([r()],$e.prototype,"_furnAssets",void 0),__decorate([r()],$e.prototype,"_furnAssetsBusy",void 0),__decorate([r()],$e.prototype,"_furnAssetsError",void 0),__decorate([r()],$e.prototype,"_furnUrlDraft",void 0),__decorate([r()],$e.prototype,"_furnCopiedFlash",void 0),__decorate([r()],$e.prototype,"_furnSaveError",void 0),__decorate([r()],$e.prototype,"_furnShowReach",void 0),__decorate([r()],$e.prototype,"_furnScale",void 0),__decorate([r()],$e.prototype,"_furnUploadBusy",void 0),__decorate([r()],$e.prototype,"_roomsDeleteConfirm",void 0),__decorate([r()],$e.prototype,"_roomsCopiedFlash",void 0),__decorate([r()],$e.prototype,"_floorplanCopiedFlash",void 0),__decorate([r()],$e.prototype,"_floorplanMode",void 0),__decorate([r()],$e.prototype,"_floorCalib",void 0),__decorate([r()],$e.prototype,"_floorCalibRefNat",void 0),__decorate([r()],$e.prototype,"_floorCalibResult",void 0),__decorate([r()],$e.prototype,"_floorCalibError",void 0),__decorate([r()],$e.prototype,"_homeCalib",void 0),__decorate([r()],$e.prototype,"_homeCalibBusy",void 0),__decorate([r()],$e.prototype,"_homeCalibError",void 0),__decorate([r()],$e.prototype,"_homeCalibResult",void 0),__decorate([r()],$e.prototype,"_homeCalibSnapshotUrl",void 0),__decorate([r()],$e.prototype,"_homeCalibCrop",void 0),__decorate([r()],$e.prototype,"_homeCalibFrameId",void 0),__decorate([r()],$e.prototype,"_fiducialSnapshotBusy",void 0),__decorate([r()],$e.prototype,"_fiducialSnapshotError",void 0),__decorate([r()],$e.prototype,"_fiducialSnapshotPath",void 0),__decorate([r()],$e.prototype,"_fiducialKnown",void 0),__decorate([r()],$e.prototype,"_fiducialDetectBusy",void 0),__decorate([r()],$e.prototype,"_fiducialDetectError",void 0),__decorate([r()],$e.prototype,"_fiducialDetectResult",void 0),__decorate([r()],$e.prototype,"_floorplanSnapshotBusy",void 0),__decorate([r()],$e.prototype,"_floorplanSnapshotError",void 0),__decorate([r()],$e.prototype,"_homeFrameSnapshotBusy",void 0),__decorate([r()],$e.prototype,"_homeFrameSnapshotError",void 0),__decorate([r()],$e.prototype,"_guideExportBusy",void 0),__decorate([r()],$e.prototype,"_guideExportError",void 0),__decorate([r()],$e.prototype,"_guideExportResult",void 0),__decorate([r()],$e.prototype,"_placeRoomsResult",void 0),__decorate([r()],$e.prototype,"_veToolSwitchTarget",void 0),__decorate([r()],$e.prototype,"_floorplanSession",void 0),__decorate([r()],$e.prototype,"_recropDraft",void 0),__decorate([r()],$e.prototype,"_recropHistory",void 0),__decorate([r()],$e.prototype,"_recropFuture",void 0),__decorate([r()],$e.prototype,"_recropNat",void 0),__decorate([r()],$e.prototype,"_alignMapNat",void 0),__decorate([r()],$e.prototype,"_profile",void 0),__decorate([r()],$e.prototype,"_mapRegW",void 0),__decorate([r()],$e.prototype,"_mapRegH",void 0),__decorate([r()],$e.prototype,"_mapAvailW",void 0),__decorate([r()],$e.prototype,"_mapAvailH",void 0),__decorate([r()],$e.prototype,"_veTint",void 0),__decorate([r()],$e.prototype,"_startSeq",void 0),__decorate([r()],$e.prototype,"_flipLive",void 0),__decorate([r()],$e.prototype,"_now",void 0),__decorate([r()],$e.prototype,"_planPreview",void 0),$e=__decorate([t$1(Zt)],$e);const ke=(xe=window).customCards??(xe.customCards=[]);ke.some(e=>e.type===Zt)||ke.push({type:Zt,name:"AnyVac Card",description:"Feature-rich card for Roborock vacuums — map, room selection, multi-vacuum tabs, global actions.",preview:!1,documentationURL:"https://github.com/Michailjovic/anyvac-card"});const Se={entity:"",name:"",color:"green",rooms:[],clean_action:{type:"native"}},Ce={key:"",name:"",icon:"mdi:square",map_x:50,map_y:50},Ae=["mdi:numeric-1-circle","mdi:numeric-2-circle","mdi:numeric-3-circle","mdi:numeric-4-circle","mdi:numeric-5-circle","mdi:numeric-6-circle","mdi:numeric-7-circle","mdi:numeric-8-circle","mdi:numeric-9-circle","mdi:numeric-9-plus-circle"];function _roomIconFor(e){return Ae[Math.min(e,Ae.length-1)]}const Me={entity:"",rotation:0,scale:100,offset_x:0,offset_y:0},Re={name:"Whole flat",color:"orange",watch_entities:[],action:{type:"script",entity_id:""}},Pe=[{days:2,color:"#2ecc71"},{days:5,color:"#faad14"},{days:10,color:"#ff9800"}];let Fe=class AnyVacCardEditor extends Vt{constructor(){super(...arguments),this._tab="vacuums",this._dragRoom=null,this._openVac=null,this._openSensors=new Set,this._openMap=new Set,this._openPresets=new Set,this._openAction=new Set,this._openGlobal=new Set,this._openRoom=new Map,this._hvSwap=!1,this._pvAR=0,this._pvNat=null,this._floorplanSnapshotBusy=!1,this._floorplanSnapshotError="",this._guideExportBusy=!1,this._guideExportError="",this._guideExportResult=null,this._placeRoomsResult=null,this._initialized=!1,this._ha=null,this._menu=null,this._confirm=null,this._hintsOpen=new Set,this._hintSeq=0}connectedCallback(){super.connectedCallback(),this._ensureHaElements()}setConfig(e){this._config=e,this._initialized||(this._initialized=!0,this._openVac=1===(e.vacuums??[]).length?0:null)}updated(e){if((e.has("hass")||e.has("_ha"))&&this.hass&&!1===this._ha){const e=this.shadowRoot?.getElementById("ha-entities");e&&!e.options.length&&(e.innerHTML=Object.keys(this.hass.states).sort().map(e=>'<option value="'+e+'">').join(""))}}async _snapshotFloorplan(e){const o=this._mapEntityFor(e);if(o){this._floorplanSnapshotBusy=!0,this._floorplanSnapshotError="";try{const s=await this.hass.callService("anyvac","snapshot_map_as_floorplan",{image_entity:o,name:e.name||e.entity},void 0,!1,!0),l=s?.response?.path;if(!l)throw new Error("no path in service response");const h=s?.response?.crop,d=this._config.vacuums.findIndex(o=>o.entity===e.entity);if(this._setEditedImageBase(h?{src:l,crop_box:{entity:e.entity,...h}}:{src:l},d>=0?d:void 0),this._mergedEdit){const e=this._config.vacuums.map(e=>({...e,hide_map:!0}));this._setConfig({vacuums:e})}else{const o=this._config.vacuums.findIndex(o=>o.entity===e.entity);o>=0&&this._setVacuum(o,{hide_map:!0})}if(h){const o=this._config.vacuums.findIndex(o=>o.entity===e.entity);o>=0&&this._placeOwnRooms(o,h)}}catch(e){this._floorplanSnapshotError="Couldn't snapshot this vacuum's map — make sure the anyvac integration is updated to at least 0.88.0, then try again.",console.error("[anyvac-card] snapshot_map_as_floorplan failed:",e)}finally{this._floorplanSnapshotBusy=!1}}}async _exportMapGuide(e,o){const s=this._mapEntityFor(e);if(!s)return;this._guideExportBusy=!0,this._guideExportError="",this._guideExportResult=null;const l=this._currentImageBase(o)?.crop_box,h=l&&"entity"in l&&l.entity===e.entity?{x0:l.x0,y0:l.y0,x1:l.x1,y1:l.y1}:void 0;try{const o={image_entity:s,name:e.name||e.entity};h&&(o.crop=h);const l=await this.hass.callService("anyvac","export_map_guide",o,void 0,!1,!0),d=l?.response?.paths,p=l?.response?.size;if(!d||!p||!Object.keys(d).length)throw new Error("no guide layers in service response");this._guideExportResult={paths:d,size:p,crop:l?.response?.crop,entity:e.entity}}catch(e){this._guideExportError="Couldn't export guide layers — make sure the anyvac integration is updated to at least 1.4.0, then try again.",console.error("[anyvac-card] export_map_guide failed:",e)}finally{this._guideExportBusy=!1}}_fire(e){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}_setConfig(e){const o={...this._config,...e};this._config=o,this._fire(o)}_setVacuum(e,o){const s=[...this._config.vacuums];s[e]={...s[e],...o};const l={...this._config,vacuums:s};this._config=l,this._fire(l)}_setMap(e,o){const s=this._config.vacuums[e].map??{...Me};this._setVacuum(e,{map:{...s,...o}})}_setImageBase(e,o){const s=this._config.vacuums[e].image_base??{src:""};this._setVacuum(e,{image_base:{...s,...o}})}get _mergedEdit(){return"merged"===this._config.map_mode}_editRooms(e=0){if(this._mergedEdit)return this._config.rooms??[];const o=this._config.vacuums[Math.min(e,this._config.vacuums.length-1)];return o?.rooms??[]}_setEditedRoom(e,o,s=0){if(this._mergedEdit){const s=[...this._config.rooms??[]];s[e]={...s[e],...o},this._setConfig({rooms:s})}else this._setRoom(Math.min(s,this._config.vacuums.length-1),e,o)}_addEditedRoom(e=0){if(this._mergedEdit){const e=this._config.rooms??[],o=[...e,{...Ce,icon:_roomIconFor(e.length)}];this._setConfig({rooms:o})}else this._addRoom(Math.min(e,this._config.vacuums.length-1))}_deleteEditedRoom(e,o=0){if(this._mergedEdit){const o=(this._config.rooms??[]).filter((o,s)=>s!==e);this._setConfig({rooms:o})}else this._deleteRoom(Math.min(o,this._config.vacuums.length-1),e)}_setLayoutFlip(e,o){const s=this._config.layout??{},l=s[e]??{},h={...l.crop??{},flip:!!o||void 0};this._setConfig({layout:{...s,[e]:{...l,crop:h}}})}_setEditedImageBase(e,o){this._mergedEdit?this._setConfig({image_base:{...this._config.image_base??{src:""},...e}}):void 0!==o&&this._setImageBase(Math.min(o,this._config.vacuums.length-1),e)}_currentImageBase(e=0){const o=this._config.vacuums;if(!o.length)return;const s=Math.min(e,o.length-1);return this._mergedEdit?this._config.image_base:o[s].image_base}_editorAR(){return this._pvAR>.1?this._pvAR:3.636}_intEntityFor(e){if(!e)return;if(e.integration_entity)return e.integration_entity;const o=this.hass?.entities,s=o?.[e.entity]?.device_id;return s?Object.keys(o).find(e=>o[e]?.device_id===s&&"anyvac"===o[e]?.platform&&e.startsWith("sensor.")):void 0}_mapEntityFor(e){if(!e)return;if(e.map?.entity)return e.map.entity;const o=this.hass?.entities,s=o?.[e.entity]?.device_id;if(!s)return;const l=Object.keys(o).filter(e=>o[e]?.device_id===s&&e.startsWith("image.")),h=l.filter(e=>{const o=this.hass.states[e];return!!o&&"unavailable"!==o.state&&"unknown"!==o.state&&!!o.attributes.entity_picture});return 1===h.length?h[0]:1===l.length?l[0]:void 0}_anyHomeFrame(){const e=new Map;for(const o of this._config.vacuums??[]){const s=this._intEntityFor(o),l=(s?this.hass.states[s]?.attributes:void 0)?.home_frame;if(!(l?.id&&l.width_px>0&&l.height_px>0))continue;const h=e.get(l.id);h?h.count++:e.set(l.id,{w:l.width_px,h:l.height_px,count:1})}let o=null;for(const[s,l]of e)(!o||l.count>o.count)&&(o={id:s,...l});return o?{id:o.id,w:o.w,h:o.h}:null}_placeOwnRooms(e,o){const s=this._config.vacuums[e],l=this._intEntityFor(s),h=l?this.hass.states[l]?.attributes:void 0,d=Array.isArray(h?.rooms)?h.rooms:[];if(!d.length)return null;const p=this._mergedEdit?this._config.rooms??[]:s.rooms??[],{rooms:u,placed:m,added:_}=function placeRoomsInCrop(e,o,s,l){const h=s.map(e=>({...e})),d=new Map;h.forEach((e,o)=>d.set(e.key,o));let p=0,u=0;for(const s of e){const e=s?.name,m=s?.bbox_px;if(!e||!m)continue;const _=placeRoomInCrop(m,o);if(!_)continue;const f=d.get(e);if(void 0!==f)h[f]={...h[f],..._},p++;else{const o={key:e,name:e,icon:l(h.length),..._};h.push(o),d.set(e,h.length-1),u++}}return{rooms:h,placed:p,added:u}}(d,o,p,_roomIconFor);if(m||_){const o=u;this._mergedEdit?this._setConfig({rooms:o}):this._setVacuum(e,{rooms:o})}return{placed:m,added:_}}_placeRoomsFromCropBox(){const e=this._currentImageBase()?.crop_box;if(!e||!("entity"in e))return;const o=this._config.vacuums.findIndex(o=>o.entity===e.entity);if(o<0)return;const s=this._placeOwnRooms(o,e);s&&(this._placeRoomsResult=s)}_setRoom(e,o,s){const l=[...this._config.vacuums[e].rooms??[]];l[o]={...l[o],...s},this._setVacuum(e,{rooms:l})}_setCleanAction(e,o){const s=this._config.vacuums[e].clean_action??{type:"native"};this._setVacuum(e,{clean_action:{...s,...o}})}_setPreset(e,o,s){const l=[...this._config.vacuums[e].presets??[]];l[o]={...l[o],...s},this._setVacuum(e,{presets:l})}_addPreset(e){const o=this._config.vacuums[e].presets??[],s=[...o,{id:"preset"+(o.length+1),label:"New preset"}];this._setVacuum(e,{presets:s}),this._openPresets=new Set([...this._openPresets,e])}_deletePreset(e,o){const s=(this._config.vacuums[e].presets??[]).filter((e,s)=>s!==o);this._setVacuum(e,{presets:s})}_setGlobal(e,o){const s=[...this._config.global_actions??[]];s[e]={...s[e],...o};const l={...this._config,global_actions:s};this._config=l,this._fire(l)}_setGlobalAction(e,o){const s=this._config.global_actions?.[e]?.action??{type:"script",entity_id:""};this._setGlobal(e,{action:{...s,...o}})}_moveVacuum(e,o){const s=e+o,l=[...this._config.vacuums];if(s<0||s>=l.length)return;[l[e],l[s]]=[l[s],l[e]];const h={...this._config,vacuums:l};this._config=h,this._fire(h),this._openVac===e?this._openVac=s:this._openVac===s&&(this._openVac=e)}_addVacuum(){const e=[...this._config.vacuums,{...Se}],o={...this._config,vacuums:e};this._config=o,this._fire(o),this._openVac=e.length-1}_deleteVacuum(e){const o=this._config.vacuums.filter((o,s)=>s!==e),s={...this._config,vacuums:o};this._config=s,this._fire(s),this._openVac===e?this._openVac=null:null!==this._openVac&&this._openVac>e&&this._openVac--}_addRoom(e){const o=this._config.vacuums[e].rooms??[],s=[...o,{...Ce,icon:_roomIconFor(o.length)}];this._setVacuum(e,{rooms:s});const l=new Map(this._openRoom);l.set(e,s.length-1),this._openRoom=l}_moveRoom(e,o,s){if(o===s)return;const l=[...this._config.vacuums[e].rooms??[]];if(o<0||o>=l.length||s<0||s>=l.length)return;const[h]=l.splice(o,1);l.splice(s,0,h),this._setVacuum(e,{rooms:l})}_deleteRoom(e,o){const s=(this._config.vacuums[e].rooms??[]).filter((e,s)=>s!==o);this._setVacuum(e,{rooms:s});if(this._openRoom.get(e)===o){const o=new Map(this._openRoom);o.set(e,null),this._openRoom=o}}_setGlobalPreset(e,o){const s=[...this._config.global_presets??[]];s[e]={...s[e],...o},this._setConfig({global_presets:s})}_addGlobalPreset(){const e=this._config.global_presets??[],o=[...e,{id:"gp"+(e.length+1),label:"New clean",scope:"select"}];this._setConfig({global_presets:o})}_deleteGlobalPreset(e){const o=(this._config.global_presets??[]).filter((o,s)=>s!==e);this._setConfig({global_presets:o})}_addGlobal(){const e=[...this._config.global_actions??[],{...Re}],o={...this._config,global_actions:e};this._config=o,this._fire(o);const s=e.length-1;this._openGlobal=new Set([...this._openGlobal,s])}_deleteGlobal(e){const o=(this._config.global_actions??[]).filter((o,s)=>s!==e),s={...this._config,global_actions:o};this._config=s,this._fire(s);const l=new Set(this._openGlobal);l.delete(e),this._openGlobal=l}_toggleVac(e){this._openVac=this._openVac===e?null:e,this._menu=null}_toggleRoom(e,o){const s=new Map(this._openRoom),l=s.get(e)??null;s.set(e,l===o?null:o),this._openRoom=s}_toggleIn(e,o,s){const l=new Set(e);return s??!l.has(o)?l.add(o):l.delete(o),l}_toggleSensors(e,o){this._openSensors=this._toggleIn(this._openSensors,e,o)}_toggleMap(e,o){this._openMap=this._toggleIn(this._openMap,e,o)}_toggleAction(e,o){this._openAction=this._toggleIn(this._openAction,e,o)}_togglePresets(e,o){this._openPresets=this._toggleIn(this._openPresets,e,o)}_toggleGlobal(e){this._openGlobal=this._toggleIn(this._openGlobal,e)}async _ensureHaElements(){if(null!==this._ha)return;const ready=()=>!!customElements.get("ha-selector");if(ready())return void(this._ha=!0);const e=window;if("function"==typeof e.loadCardHelpers){try{const o=await e.loadCardHelpers();for(const e of["entities","tile"]){const s=await o.createCardElement({type:e,entities:[],entity:"sun.sun"});if(await(s?.constructor?.getConfigElement?.()),ready())break}await Promise.race([customElements.whenDefined("ha-selector"),new Promise(e=>setTimeout(e,4e3))])}catch(e){console.warn("[anyvac-card] couldn't load HA form elements, using plain inputs:",e)}this._ha=ready()}else this._ha=!1}_sel(e,o,s,l,h={}){return Dt`<ha-selector class="sel" .hass=${this.hass} .selector=${o} .value=${s}
      label=${e} .required=${!!h.required} .placeholder=${h.placeholder}
      @value-changed=${e=>{e.stopPropagation(),l(e.detail?.value)}}></ha-selector>`}_entityPicker(e,o,s,l,h=!1){if(this._ha)return this._sel(e,{entity:{domain:1===s.length?s[0]:s}},o||void 0,e=>l(e??""),{required:h});const d=s.length?s.join(" / "):"entity_id",p=1===s.length,u=p?"ha-ents-"+s[0]:"ha-entities",m=p?Object.keys(this.hass?.states??{}).filter(e=>e.startsWith(s[0]+".")).sort():null;return Dt`
      ${m?Dt`<datalist id=${u}>${m.map(e=>Dt`<option value=${e}>`)}</datalist>`:It}
      <div class="field">
        <label>${e}${h?Dt`<span class="required"> *</span>`:It}</label>
        <input class="text-input" type="text" list=${u}
          .value=${o??""} placeholder=${d}
          @input=${e=>{const o=e.target.value;(""===o||this.hass.states[o])&&l(o)}}
          @change=${e=>l(e.target.value)} />
      </div>`}_textField(e,o,s,l=""){return this._ha?this._sel(e,{text:{}},o??"",e=>s(e??""),{placeholder:l}):Dt`
      <div class="field">
        <label>${e}</label>
        <input class="text-input" type="text" .value=${o??""} placeholder=${l}
          @change=${e=>s(e.target.value)} />
      </div>`}_resolveColor(e,o){const s=e??o;return ie[s]??s}_colorField(e,o,s,l,h){const d=(o??"").toLowerCase(),p=/^#[0-9a-f]{6}$/.test(d)&&!s.some(e=>e.hex.toLowerCase()===d);return Dt`
      <div class="field">
        <span class="field-label">${e}</span>
        <div class="swatches" role="radiogroup" aria-label=${e}>
          ${s.map(e=>Dt`<button type="button" class="swatch ${e.hex.toLowerCase()===d?"swatch--on":""}"
              role="radio" aria-checked=${e.hex.toLowerCase()===d?"true":"false"}
              title=${e.label??e.hex} aria-label=${e.label??e.hex}
              style=${Xt({background:e.hex})} @click=${()=>l(e.hex)}></button>`)}
          <label class="swatch swatch--custom ${p?"swatch--on":""}" title="Custom colour"
            style=${Xt({background:p?d:"transparent"})}>
            ${p?It:Dt`<ha-icon icon="mdi:palette-outline"></ha-icon>`}
            <input type="color" .value=${/^#[0-9a-f]{6}$/.test(d)?d:h}
              @input=${e=>l(e.target.value)} />
          </label>
          ${o?Dt`<button type="button" class="link-btn" @click=${()=>l(void 0)}>Default</button>`:It}
        </div>
      </div>`}_numberSlider(e,o,s,l,h,d,p=""){const u=o??0;if(this._ha)return this._sel(e,{number:{min:s,max:l,step:h,mode:"slider",...p.trim()?{unit_of_measurement:p.trim()}:{}}},u,e=>{const o=Number(e);Number.isNaN(o)||d(Math.min(l,Math.max(s,o)))});return Dt`
      <div class="field field--row">
        <label>${e}</label>
        <div class="slider-wrap">
          <input type="range" class="slider" min=${s} max=${l} step=${h} .value=${String(u)}
            @input=${e=>d(Number(e.target.value))} />
          <span class="slider-val-wrap">
            <input type="number" class="slider-val-input" min=${s} max=${l} step=${h}
              .value=${String(u)}
              @change=${e=>(e=>{const o=Number(e);Number.isNaN(o)||d(Math.min(l,Math.max(s,o)))})(e.target.value)}
              @keydown=${e=>{"Enter"===e.key&&e.target.blur()}} />
            ${p?Dt`<span class="slider-val-suffix">${p}</span>`:It}
          </span>
        </div>
      </div>`}_numberBox(e,o,s,l={}){return this._ha?this._sel(e,{number:{mode:"box",step:1,...void 0!==l.min?{min:l.min}:{},...void 0!==l.max?{max:l.max}:{}}},o,e=>{const o="number"==typeof e?e:parseInt(String(e??""));s(Number.isNaN(o)?void 0:o)},{placeholder:l.placeholder}):Dt`
      <div class="field field--row">
        <label>${e}</label>
        <input class="text-input text-input--sm" type="number" min=${l.min??""} max=${l.max??""}
          .value=${String(o??"")} placeholder=${l.placeholder??""}
          @change=${e=>{const o=parseInt(e.target.value);s(isNaN(o)?void 0:o)}} />
      </div>`}_selectField(e,o,s,l){return this._ha?this._sel(e,{select:{mode:"dropdown",options:s}},o,e=>{null!=e&&l(e)},{required:!0}):Dt`
      <div class="field field--row">
        <label>${e}</label>
        <select class="select-input" @change=${e=>l(e.target.value)}>
          ${s.map(e=>Dt`<option value=${e.value} ?selected=${e.value===o}>${e.label}</option>`)}
        </select>
      </div>`}_segmented(e,o,s,l){return Dt`
      <div class="field">
        <span class="field-label">${e}</span>
        <div class="segmented" role="radiogroup" aria-label=${e}>
          ${s.map(e=>Dt`<button type="button" role="radio" aria-checked=${e.value===o?"true":"false"}
              class="seg ${e.value===o?"seg--on":""}" @click=${()=>{e.value!==o&&l(e.value)}}>
              ${e.icon?Dt`<ha-icon icon=${e.icon}></ha-icon>`:It}<span>${e.label}</span></button>`)}
        </div>
      </div>`}_optionSelectFromList(e,o,s,l){return this._ha?this._sel(e,{select:{mode:"dropdown",options:[{value:"",label:"— none —"},...o.map(e=>({value:e,label:e}))]}},s??"",e=>l(e??"")):Dt`
      <div class="field field--row">
        <label>${e}</label>
        <select class="select-input"
          @change=${e=>l(e.target.value)}>
          <option value="">— none —</option>
          ${o.map(e=>Dt`<option value=${e} ?selected=${e===s}>${e}</option>`)}
        </select>
      </div>`}_optionSelect(e,o,s,l){const h=o?this.hass.states[o]?.attributes.options??[]:[];return h.length?this._optionSelectFromList(e,h,s,l):this._textField(e,s,l,"e.g. balanced")}_iconPickerField(e,o,s="Icon"){return this._ha?this._sel(s,{icon:{}},e??"",e=>o(e??"")):Dt`
      <div class="field">
        <label>${s}</label>
        <ha-icon-picker .value=${e??"mdi:square"}
          @value-changed=${e=>o(e.detail.value)}
        ></ha-icon-picker>
      </div>`}_areaPicker(e,o,s){if(this._ha)return this._sel(e,{area:{}},o??"",e=>s(e??""));const l=Object.values(this.hass?.areas??{});return l.length?Dt`
      <div class="field field--row">
        <label>${e}</label>
        <select class="select-input"
          @change=${e=>s(e.target.value)}>
          <option value="">— not mapped —</option>
          ${[...l].sort((e,o)=>e.name.localeCompare(o.name)).map(e=>Dt`<option value=${e.area_id} ?selected=${e.area_id===o}>${e.name}</option>`)}
        </select>
      </div>`:this._textField(e,o,s,"e.g. living_room")}_toggle(e,o,s){return this._ha?this._sel(e,{boolean:{}},o,e=>s(!!e)):Dt`
      <div class="field field--row">
        <label>${e}</label>
        <label class="toggle-wrap">
          <input type="checkbox" class="toggle-input" .checked=${o}
            @change=${e=>s(e.target.checked)} />
          <span class="toggle-track"></span>
        </label>
      </div>`}_hint(e,o){if(!o)return Dt`<p class="hint">${e}</p>`;const s="string"==typeof e?e:String(this._hintSeq++),l=this._hintsOpen.has(s);return Dt`<p class="hint">${e}
      <button type="button" class="hint-more" aria-expanded=${l?"true":"false"} aria-label="More"
        @click=${()=>{const e=new Set(this._hintsOpen);l?e.delete(s):e.add(s),this._hintsOpen=e}}>
        <ha-icon icon=${l?"mdi:chevron-up":"mdi:information-outline"}></ha-icon></button>
      ${l?Dt`<span class="hint-long">${o}</span>`:It}</p>`}_panel(e,o,s,l,h){return this._ha&&customElements.get("ha-expansion-panel")?Dt`<ha-expansion-panel outlined class="panel" header=${e} secondary=${o??""}
          .expanded=${s}
          @expanded-will-change=${e=>{e.target===e.currentTarget&&l(!!e.detail?.expanded)}}
          @expanded-changed=${e=>{e.target===e.currentTarget&&!!e.detail?.expanded!==s&&l(!!e.detail?.expanded)}}>
        ${s?Dt`<div class="panel-body">${h()}</div>`:It}
      </ha-expansion-panel>`:Dt`
      <div class="collapsible">
        <div class="collapsible-header" @click=${()=>l(!s)}>
          <span class="collapsible-title">${e}</span>
          ${o?Dt`<span class="badge">${o}</span>`:It}
          <ha-icon icon=${s?"mdi:chevron-up":"mdi:chevron-down"} class="acc-chevron"></ha-icon>
        </div>
        ${s?Dt`<div class="collapsible-body">${h()}</div>`:It}
      </div>`}_rowMenu(e,o,s,l){const h=this._menu===e,d=this._confirm===e;return Dt`
      <span class="menu-wrap" @click=${e=>e.stopPropagation()}>
        <button type="button" class="icon-btn" aria-label="More actions" aria-haspopup="menu" aria-expanded=${h?"true":"false"}
          @click=${()=>{this._menu=h?null:e,this._confirm=null}}>
          <ha-icon icon="mdi:dots-vertical"></ha-icon>
        </button>
        ${h?Dt`
          <div class="menu" role="menu">
            ${d?Dt`
              <div class="menu-confirm">Delete ${o}?</div>
              <div class="menu-confirm-row">
                <button type="button" class="menu-btn" @click=${()=>{this._menu=null,this._confirm=null}}>Cancel</button>
                <button type="button" class="menu-btn menu-btn--danger"
                  @click=${()=>{this._menu=null,this._confirm=null,l?.()}}>Delete</button>
              </div>`:Dt`
              ${s.map(e=>Dt`<button type="button" role="menuitem" class="menu-item" ?disabled=${!!e.disabled}
                  @click=${()=>{this._menu=null,e.action()}}>
                  <ha-icon icon=${e.icon}></ha-icon><span>${e.label}</span></button>`)}
              ${l?Dt`<button type="button" role="menuitem" class="menu-item menu-item--danger"
                  @click=${()=>{this._confirm=e}}>
                  <ha-icon icon="mdi:delete-outline"></ha-icon><span>Delete</span></button>`:It}`}
          </div>`:It}
      </span>`}_renderVacuumsTab(){return Dt`
      <div class="tab-body">
        ${0===this._config.vacuums.length?this._hint("No vacuums yet. Add one below."):this._config.vacuums.map((e,o)=>this._renderVacuumAccordion(e,o))}
        <button class="btn btn--add" @click=${()=>this._addVacuum()}>
          <ha-icon icon="mdi:plus"></ha-icon> Add vacuum
        </button>
      </div>`}_roleLabel(e){return"dry"===e?"Dry":"wet"===e?"Wet":"both"===e?"Dry + wet":"Auto role"}_renderVacuumAccordion(e,o){const s=this._resolveColor(e.color,ae[o%ae.length]),l=this._openVac===o,h=this._config.vacuums.length-1,d=e.name||e.entity||"Unnamed vacuum";return Dt`
      <div class="acc-row ${l?"acc-row--open":""}">
        <div class="acc-header" role="button" tabindex="0" aria-expanded=${l?"true":"false"}
          @click=${()=>this._toggleVac(o)}
          @keydown=${e=>{"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),this._toggleVac(o))}}>
          <span class="acc-avatar" style=${Xt({borderColor:s})}>
            ${e.image?Dt`<img src=${e.image} alt="" />`:Dt`<ha-icon icon="mdi:robot-vacuum" style=${Xt({color:s})}></ha-icon>`}
          </span>
          <div class="acc-info">
            <span class="acc-name"><span class="acc-dot" style=${Xt({background:s})}></span>${d}</span>
            <span class="acc-sub">${this._roleLabel(e.clean_type)} · ${e.entity||"no entity"}</span>
          </div>
          ${this._rowMenu("vac-"+o,d,[{label:"Move up",icon:"mdi:arrow-up",action:()=>this._moveVacuum(o,-1),disabled:0===o},{label:"Move down",icon:"mdi:arrow-down",action:()=>this._moveVacuum(o,1),disabled:o===h}],()=>this._deleteVacuum(o))}
          <ha-icon icon=${l?"mdi:chevron-up":"mdi:chevron-down"} class="acc-chevron"></ha-icon>
        </div>

        ${l?Dt`
          <div class="acc-body">
            ${this._entityPicker("Vacuum entity",e.entity,["vacuum"],e=>this._setVacuum(o,{entity:e}),!0)}
            ${this._textField("Display name",e.name,e=>this._setVacuum(o,{name:e}),"e.g. S8")}
            ${this._textField("Image path",e.image,e=>this._setVacuum(o,{image:e}),"/local/...")}
            ${this._colorField("Colour",e.color?this._resolveColor(e.color,"green"):void 0,ae.map(e=>({hex:e})),e=>this._setVacuum(o,{color:e||void 0}),ae[o%ae.length])}
            ${this._segmented("Role",e.clean_type??"auto",[{value:"auto",label:"Auto"},{value:"dry",label:"Dry",icon:"mdi:broom"},{value:"wet",label:"Wet",icon:"mdi:water"},{value:"both",label:"Both",icon:"mdi:water-plus"}],e=>this._setVacuum(o,{clean_type:"auto"===e?void 0:e}))}
            ${this._hint("What this robot can do — not the Dry/Wet choice for a run.",Dt`Controls which time estimate and which dry/wet layer it uses. "Auto" detects it
                from the clean action; "Both" follows the live water mode (needs the integration
                sensor). The run-time Dry/Wet/Both choice is made on the card.`)}

            ${this._renderSensorsSection(o,e)}
            ${this._renderMapSection(o,e)}
            ${this._renderCleanActionSection(o,e)}
            ${this._renderPresetsSection(o,e)}

            ${this._mergedEdit?Dt`
              <p class="hint link" @click=${()=>{this._tab="global"}}>
                Rooms (shared) are edited once for all vacuums on the Global tab →
              </p>
            `:this._renderSplitRooms(o,e)}
          </div>
        `:It}
      </div>`}_renderSplitRooms(e,o){const s=o.rooms??[],l=!!this._intEntityFor(o);return Dt`
      <div class="section-title">Rooms (${s.length})</div>
      ${l?this._hint("Rooms come from this vacuum's map automatically.",Dt`Add a room here only to override its icon/display name, or to position it on a custom floorplan.`):this._hint("Add one entry per room this vacuum can clean.")}
      ${s.map((o,s)=>this._renderRoomAccordion(o,e,s))}
      <button class="btn btn--add" @click=${()=>this._addRoom(e)}>
        <ha-icon icon="mdi:plus"></ha-icon> Add room
      </button>`}_renderSensorsSection(e,o){const s=[o.status_entity,o.battery_entity,o.last_clean_entity,o.progress_entity,o.current_room_entity,o.error_entity].filter(Boolean).length;return this._panel("Sensors",s?`${s} set manually, the rest found automatically`:"Found automatically on the vacuum's device",this._openSensors.has(e),o=>this._toggleSensors(e,o),()=>Dt`
        ${this._hint("Leave blank to use the vacuum's own sensors.")}
        ${this._entityPicker("Status",o.status_entity,["sensor"],o=>this._setVacuum(e,{status_entity:o||void 0}))}
        ${this._entityPicker("Battery",o.battery_entity,["sensor"],o=>this._setVacuum(e,{battery_entity:o||void 0}))}
        ${this._entityPicker("Last clean end",o.last_clean_entity,["sensor"],o=>this._setVacuum(e,{last_clean_entity:o||void 0}))}
        ${this._entityPicker("Progress",o.progress_entity,["sensor"],o=>this._setVacuum(e,{progress_entity:o||void 0}))}
        ${this._entityPicker("Current room",o.current_room_entity,["sensor"],o=>this._setVacuum(e,{current_room_entity:o||void 0}))}
        ${this._entityPicker("Error",o.error_entity,["sensor"],o=>this._setVacuum(e,{error_entity:o||void 0}))}`)}_renderMapSection(e,o){const s=this._mapEntityFor(o),l=o.map?.entity?o.map.entity:s?`Found automatically: ${s}`:"No map image found";return this._panel("Map & floorplan",l,this._openMap.has(e),o=>this._toggleMap(e,o),()=>Dt`
        ${this._entityPicker("Map image entity (override)",o.map?.entity,["image"],o=>this._setMap(e,{entity:o}))}
        ${this._entityPicker("AnyVac sensor (override)",o.integration_entity,["sensor"],o=>this._setVacuum(e,{integration_entity:o||void 0}))}
        ${this._hint("Leave both blank to find them on the vacuum's device.")}
        ${this._mergedEdit?this._hint(Dt`Base layer and stage height are set once for the whole card —
            <strong>Global tab → Floorplan</strong>.`):Dt`
          ${this._selectField("Base layer",o.base??"map",[{value:"map",label:"Live map only"},{value:"image",label:"Custom floorplan image"},{value:"combined",label:"Floorplan + map overlay"}],o=>this._setVacuum(e,{base:o}))}
          ${this._numberSlider("Stage height (0 = auto)",o.base_height??0,0,1200,10,o=>this._setVacuum(e,{base_height:o>0?o:void 0})," px")}
          ${"image"===o.base||"combined"===o.base?this._renderFloorplanTools(e,o):It}
        `}`)}_renderFloorplanTools(e,o){const s=this._currentImageBase(e),l=s?.crop_box,h=l&&"entity"in l&&l.entity===o.entity?l:void 0,d=this._mapEntityFor(o),p=this._hvSwap,u=this._guideExportResult&&this._guideExportResult.entity===o.entity?this._guideExportResult:null;return Dt`
      <div class="sub-section">
        <div class="sub-title">Floorplan image</div>
        ${d?Dt`
          <button class="btn btn--sm" ?disabled=${this._floorplanSnapshotBusy}
            @click=${()=>this._snapshotFloorplan(o)}>
            <ha-icon icon="mdi:camera"></ha-icon>
            ${this._floorplanSnapshotBusy?"Snapshotting…":"Use this vacuum's current map as floorplan"}
          </button>
          ${this._floorplanSnapshotError?Dt`<p class="hint hint--error">${this._floorplanSnapshotError}</p>`:It}
        `:this._hint("No map image entity found for this vacuum — set one above.")}

        ${this._textField("Image src (URL)",s?.src,o=>this._setEditedImageBase({src:o},e),"/local/anyvac/flat.svg")}
        ${s?.src?Dt`
          <img class="fp-preview" src=${s.src} alt="Floorplan preview"
            @load=${e=>{const o=e.target;o.naturalWidth&&o.naturalHeight&&(this._pvNat?.w!==o.naturalWidth||this._pvNat?.h!==o.naturalHeight)&&(this._pvNat={w:o.naturalWidth,h:o.naturalHeight},this._pvAR=o.naturalHeight>0?o.naturalWidth/o.naturalHeight:0)}} />
        `:It}
        ${this._toggle("Swap ↔/↕ slider labels",p,e=>{this._hvSwap=e})}
        ${this._numberSlider("Rotation",s?.rotation??0,-180,180,1,o=>this._setEditedImageBase({rotation:o},e),"°")}
        ${this._numberSlider("Scale",s?.scale??100,10,400,1,o=>this._setEditedImageBase({scale:o},e),"%")}
        ${this._numberSlider(p?"Offset ↕":"Offset ↔",s?.offset_x??0,-100,100,.5,o=>this._setEditedImageBase({offset_x:o},e),"%")}
        ${this._numberSlider(p?"Offset ↔":"Offset ↕",s?.offset_y??0,-100,100,.5,o=>this._setEditedImageBase({offset_y:o},e),"%")}

        ${d?Dt`
          <div class="sub-title">Guide layers</div>
          ${this._hint("Room/path guides for tracing furniture in an image editor.",Dt`Drawn in the same pixel canvas as the floorplan snapshot above, as transparent PNGs.`)}
          <button class="btn btn--sm" ?disabled=${this._guideExportBusy}
            @click=${()=>this._exportMapGuide(o,e)}>
            <ha-icon icon="mdi:layers-outline"></ha-icon>
            ${this._guideExportBusy?"Exporting…":"Export guide layers"}
          </button>
          ${this._guideExportError?Dt`<p class="hint hint--error">${this._guideExportError}</p>`:It}
          ${u?Dt`
            <p class="hint">Exported (${u.size.w}×${u.size.h}px):
              ${Object.keys(u.paths).map(e=>Dt`<code>${e}</code> `)}
              — trace furniture over them, then set the traced file as the Image src above.</p>
            ${u.crop?Dt`
              <button type="button" class="link-btn"
                @click=${()=>this._setEditedImageBase({crop_box:{entity:o.entity,...u.crop}},e)}>
                Use this crop for the floorplan
              </button>
            `:It}
          `:It}
        `:It}

        ${h?Dt`
          <div class="sub-title">Crop box</div>
          <p class="hint">Cut from (${h.x0}, ${h.y0}) – (${h.x1}, ${h.y1})px of this vacuum's map.
            <button type="button" class="link-btn" @click=${()=>this._setEditedImageBase({crop_box:void 0},e)}>Clear</button>
          </p>
          ${!this._pvNat||Math.round(this._pvNat.w)===Math.round(h.x1-h.x0)&&Math.round(this._pvNat.h)===Math.round(h.y1-h.y0)?It:Dt`<p class="hint hint--error">The saved image (${this._pvNat.w}×${this._pvNat.h}px) doesn't
                match this crop box (${Math.round(h.x1-h.x0)}×${Math.round(h.y1-h.y0)}px) —
                re-snapshot or re-export the guide layers above.</p>`}
          <button class="btn btn--sm" @click=${()=>this._placeRoomsFromCropBox()}>
            Place rooms from crop box
          </button>
          ${this._placeRoomsResult?this._hint(`Placed ${this._placeRoomsResult.placed}, added ${this._placeRoomsResult.added} room(s).`):It}
        `:It}
      </div>`}_renderPresetsSection(e,o){const s=o.presets??[],l=this.hass.states[o.entity]?.attributes.fan_speed_list??[],h=o.clean_action,d=h?.mop_mode_entity,p=h?.mop_intensity_entity;return this._panel("Setting presets",s.length?`${s.length} preset${s.length>1?"s":""}`:"None — the clean action's defaults are used",this._openPresets.has(e),o=>this._togglePresets(e,o),()=>Dt`
        ${this._hint("Named “how” bundles picked on the robot sheet.",Dt`Mop entities come from Clean action above; presets only set the values. With fewer
            than 2 presets no chips are shown and the Clean action's defaults are used.`)}
        ${s.map((o,s)=>Dt`
          <div class="sub-section">
            <div class="sub-title sub-title--row">
              <span>${o.label||o.id}</span>
              ${this._rowMenu(`preset-${e}-${s}`,o.label||o.id,[],()=>this._deletePreset(e,s))}
            </div>
            ${this._textField("Label",o.label,o=>this._setPreset(e,s,{label:o}),"e.g. Dry")}
            ${this._iconPickerField(o.icon,o=>this._setPreset(e,s,{icon:o||void 0}))}
            ${l.length?this._optionSelectFromList("Suction",l,o.suction_level,o=>this._setPreset(e,s,{suction_level:o||void 0})):this._textField("Suction",o.suction_level,o=>this._setPreset(e,s,{suction_level:o||void 0}),"e.g. max")}
            ${d?this._optionSelect("Mop mode",d,o.mop_mode,o=>this._setPreset(e,s,{mop_mode:o||void 0})):It}
            ${p?this._optionSelect("Mop intensity",p,o.mop_intensity,o=>this._setPreset(e,s,{mop_intensity:o||void 0})):It}
            ${this._numberSlider("Repeat passes",o.repeat??1,1,3,1,o=>this._setPreset(e,s,{repeat:o}))}
          </div>
        `)}
        <button class="btn btn--add" @click=${()=>this._addPreset(e)}>
          <ha-icon icon="mdi:plus"></ha-icon> Add preset
        </button>`)}_actionSummary(e){return"script"===e.type?"Script"+(e.entity_id?": "+e.entity_id:""):"native-area"===e.type?"Native area (vacuum.clean_area)":"Native (segments)"}_renderCleanActionSection(e,o){const s=o.clean_action??{type:"native"};return this._panel("Clean action",this._actionSummary(s),this._openAction.has(e),o=>this._toggleAction(e,o),()=>this._renderCleanActionEditor(e,o))}_renderCleanActionEditor(e,o){const s=o.clean_action??{type:"native"};return Dt`
      ${this._selectField("Strategy","native-auto"===s.type?"native":s.type,[{value:"native",label:"Native (vacuum.send_command + segment IDs)"},{value:"native-area",label:"Native area (vacuum.clean_area)"},{value:"script",label:"Custom script"}],o=>{if("script"===o)return void this._setVacuum(e,{clean_action:{type:"script",entity_id:""}});const s=this._config.vacuums[e]?.clean_action,l={};if(s&&"script"!==s.type)for(const e of["repeat","suction_level","mop_mode_entity","mop_mode","mop_intensity_entity","mop_intensity"]){const o=s[e];void 0!==o&&(l[e]=o)}this._setVacuum(e,{clean_action:{type:o,...l}})})}
      ${"script"===s.type?this._renderScriptAction(e,s):this._renderNativeOptions(e,s)}`}_renderNativeOptions(e,o){const s="native-area"===o.type?this._hint(Dt`Used without the integration only — with it, START sends <code>anyvac.clean</code>.`,Dt`Calls <code>vacuum.clean_area</code>. No repeat; repeat lives server-side in <code>anyvac.clean</code>.`):this._hint(Dt`Used without the integration only — with it, START sends <code>anyvac.clean</code>.`,Dt`<code>anyvac.clean</code> resolves segments server-side.${"native-auto"===o.type?Dt` This vacuum still carries the retired value <code>native-auto</code>; it behaves exactly
                like Native and is rewritten the next time you pick a strategy.`:It}`),l=this.hass.states[this._config.vacuums[e]?.entity]?.attributes.fan_speed_list??[];return Dt`
      <div class="sub-section">
        ${s}
        ${this._numberSlider("Repeat passes",o.repeat??1,1,3,1,o=>this._setCleanAction(e,{repeat:o}))}
        ${l.length?this._optionSelectFromList("Suction (optional)",l,o.suction_level,o=>this._setCleanAction(e,{suction_level:o||void 0})):this._textField("Suction (optional)",o.suction_level,o=>this._setCleanAction(e,{suction_level:o||void 0}),"e.g. balanced")}
        ${this._entityPicker("Mop mode entity (optional)",o.mop_mode_entity,["select"],o=>this._setCleanAction(e,{mop_mode_entity:o||void 0}))}
        ${o.mop_mode_entity?this._optionSelect("Mop mode",o.mop_mode_entity,o.mop_mode,o=>this._setCleanAction(e,{mop_mode:o||void 0})):It}
        ${this._entityPicker("Mop intensity entity (optional)",o.mop_intensity_entity,["select"],o=>this._setCleanAction(e,{mop_intensity_entity:o||void 0}))}
        ${o.mop_intensity_entity?this._optionSelect("Mop intensity",o.mop_intensity_entity,o.mop_intensity,o=>this._setCleanAction(e,{mop_intensity:o||void 0})):It}
      </div>`}_renderScriptAction(e,o){const s=o.variables??{},l=Object.entries(s);return Dt`
      <div class="sub-section">
        ${this._entityPicker("Script entity",o.entity_id,["script"],o=>this._setCleanAction(e,{entity_id:o}))}
        ${this._hint("Variables passed to the script.",Dt`Tokens: {{ entity }}, {{ selected_segments }}, {{ selected_room_keys }}, {{ selected_area_ids }}`)}
        ${l.map(([o,h],d)=>Dt`
          <div class="var-row">
            ${this._textField("Name",o,o=>{const s=Object.fromEntries(l.map(([e,s],l)=>[l===d?o:e,s]));this._setCleanAction(e,{variables:s})},"name")}
            <span class="var-sep">&#8594;</span>
            ${this._textField("Value",h,l=>{this._setCleanAction(e,{variables:{...s,[o]:l}})},"{{ entity }}")}
            <button class="icon-btn icon-btn--sm" aria-label="Remove variable"
              @click=${()=>{const o=Object.fromEntries(l.filter((e,o)=>o!==d));this._setCleanAction(e,{variables:o})}}>
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          </div>`)}
        <button class="btn btn--add btn--sm"
          @click=${()=>this._setCleanAction(e,{variables:{...s,"":""}})}>
          <ha-icon icon="mdi:plus"></ha-icon> Add variable
        </button>
      </div>`}_renderRoomMetaFields(e,o){return Dt`
      ${this._iconPickerField(e.icon,e=>o({icon:e||void 0}))}
      ${this._selectField("Icon anchor",e.icon_anchor??"c",[{value:"none",label:"Hidden"},{value:"tl",label:"Top-left"},{value:"t",label:"Top"},{value:"tr",label:"Top-right"},{value:"l",label:"Left"},{value:"c",label:"Centre (default)"},{value:"r",label:"Right"},{value:"bl",label:"Bottom-left"},{value:"b",label:"Bottom"},{value:"br",label:"Bottom-right"}],e=>o({icon_anchor:"c"===e?void 0:e}))}
      ${this._numberSlider("Est. dry clean time",e.clean_time_dry??0,0,120,1,e=>o({clean_time_dry:e>0?e:void 0})," min")}
      ${this._numberSlider("Est. wet clean time",e.clean_time_wet??0,0,120,1,e=>o({clean_time_wet:e>0?e:void 0})," min")}
      ${this._hint("Leave at 0 to use the integration's learned estimate.",Dt`Used for this room's remaining time until the AnyVac integration has learned its own
          (or the legacy fallback below, for setups without it).`)}`}_renderRoomBackendFields(e,o,s,l){return o&&this._intEntityFor(o)?this._hint("Segments, timing and history are handled by the AnyVac integration."):"native-area"===o?.clean_action?.type?Dt`
        <div class="field field--row">
          <label>Effective area</label>
          <strong class="value">${e.area_id??this._config.area_mappings?.[e.key]??e.key}</strong>
        </div>
        ${l}`:Dt`
      ${this._numberBox("Segment ID",e.segment_id,e=>s({segment_id:e}),{min:0,placeholder:"e.g. 16"})}
      ${this._hint(Dt`Find IDs: Developer Tools → Actions → <code>roborock.get_maps</code>`)}
      ${this._numberSlider("Est. clean time (fallback)",e.clean_time_mins??0,0,120,1,e=>s({clean_time_mins:e>0?e:void 0})," min")}
      ${this._entityPicker("Clean time fallback (input_number, legacy)",e.clean_time_entity,["input_number"],e=>s({clean_time_entity:e||void 0}))}
      ${this._entityPicker("Last clean fallback (input_datetime, legacy)",e.last_clean_entity,["input_datetime"],e=>s({last_clean_entity:e||void 0}))}
      ${this._hint("Legacy read-only fallbacks for setups without the integration.")}`}_roomRow(e,o,s,l,h,d,p,u,m){const _=this._dragRoom&&this._dragRoom.vac===o&&this._dragRoom.idx!==s;return Dt`
      <div class="room-acc ${_?"room-acc--drop":""}"
        @dragover=${e=>{this._dragRoom&&this._dragRoom.vac===o&&e.preventDefault()}}
        @drop=${e=>{e.preventDefault(),this._dragRoom&&this._dragRoom.vac===o&&p(this._dragRoom.idx),this._dragRoom=null}}>
        <div class="room-acc-header" @click=${h}>
          <ha-icon class="drag" icon="mdi:drag-horizontal-variant" title="Drag to reorder"
            draggable="true"
            @click=${e=>e.stopPropagation()}
            @dragstart=${e=>{this._dragRoom={vac:o,idx:s},e.dataTransfer&&(e.dataTransfer.effectAllowed="move")}}
            @dragend=${()=>{this._dragRoom=null}}></ha-icon>
          <ha-icon class="room-acc-icon" icon=${e.icon||"mdi:square"}></ha-icon>
          <div class="room-acc-info">
            <span class="room-acc-name">${e.name||e.key||"Unnamed room"}</span>
            ${u}
          </div>
          ${this._rowMenu(`room-${o}-${s}`,e.name||e.key||"this room",[],d)}
          <ha-icon icon=${l?"mdi:chevron-up":"mdi:chevron-down"} class="acc-chevron"></ha-icon>
        </div>
        ${l?Dt`<div class="room-acc-body">${m()}</div>`:It}
      </div>`}_renderRoomAccordion(e,o,s){const l=(this._openRoom.get(o)??null)===s,h=this._config.vacuums[o],set=e=>this._setRoom(o,s,e);return this._roomRow(e,o,s,l,()=>this._toggleRoom(o,s),()=>this._deleteRoom(o,s),e=>this._moveRoom(o,e,s),void 0===e.segment_id||this._intEntityFor(h)?It:Dt`<span class="room-acc-meta">seg ${e.segment_id}</span>`,()=>Dt`
        ${this._textField("Key (unique ID)",e.key,e=>set({key:e}),"e.g. bedroom")}
        ${this._hint("Keep it identical to the room's name in the Roborock app.","The AnyVac integration matches rooms by this name (auto-seating, live positions, room pinning).")}
        ${this._textField("Display name",e.name,e=>set({name:e}),"e.g. Bedroom")}
        ${this._renderRoomMetaFields(e,set)}
        ${this._renderRoomBackendFields(e,h,set,Dt`<p class="hint link" @click=${()=>{this._tab="global"}}>Set in Global tab → Area mappings →</p>`)}
        ${this._hint("Position and size are set in the Visual editor's Rooms tool.")}`)}_renderMergedRoomAccordion(e,o){const s=(this._openRoom.get(-1)??null)===o,set=e=>this._setEditedRoom(o,e);return this._roomRow(e,-1,o,s,()=>this._toggleRoom(-1,o),()=>this._deleteEditedRoom(o),e=>this._moveMergedRoom(e,o),It,()=>Dt`
        ${this._textField("Key (unique ID)",e.key,e=>set({key:e}),"e.g. bedroom")}
        ${this._hint("Keep it identical to the room's name in the Roborock app.","The AnyVac integration matches rooms by this name (auto-seating, live positions, room pinning).")}
        ${this._textField("Display name",e.name,e=>set({name:e}),"e.g. Bedroom")}
        ${this._renderRoomMetaFields(e,set)}
        ${this._renderRoomBackendFields(e,this._config.vacuums[0],set,this._hint("Set in Area mappings, further down this tab."))}
        ${this._hint("Position and size are set in the Visual editor's Rooms tool.")}`)}_moveMergedRoom(e,o){if(e===o)return;const s=[...this._config.rooms??[]];if(e<0||e>=s.length||o<0||o>=s.length)return;const[l]=s.splice(e,1);s.splice(o,0,l),this._setConfig({rooms:s})}_dbgRow(e,o){return Dt`<div class="field field--row">
      <label>${e}</label>
      <span class="mono">${null==o||""===o?"—":String(o)}</span>
    </div>`}_renderDebugTab(){const fmt=e=>{try{return JSON.stringify(e,null,1)}catch{return String(e)}};return Dt`
      <div class="tab-body">
        ${this._hint("Live values from Home Assistant, read-only.")}
        ${this._toggle("Room progress gauges on map",this._config.debug_room_progress??!1,e=>this._setConfig({debug_room_progress:e||void 0}))}
        ${this._hint("A small % gauge on each room.","Spatial coverage — approximate: the room box includes furniture, so it plateaus below 100%.")}
        ${this._toggle("Dense portrait room list",this._config.debug_dense_dock??!1,e=>this._setConfig({debug_dense_dock:e||void 0}))}
        ${this._hint("The old portrait room list instead of the rail.","Name, age, pin and assigned vacuum per room. Independent of the gauges toggle above.")}
        ${this._config.vacuums.map(e=>{const o=this._intEntityFor(e),s=o?this.hass.states[o]:void 0,l=s?.attributes??{},h=l.mop_signal??{};return Dt`
            <div class="section-title">${e.name??e.entity}</div>
            <div class="sub-section">
              ${o?s?Dt`
                    ${this._dbgRow("sensor",`${o} = ${s.state}`)}
                    ${this._dbgRow("schema_version",l.schema_version)}
                    ${this._dbgRow("pipeline_ok",l.pipeline_ok)}
                    ${this._dbgRow("clean_type (run)",l.clean_type)}
                    ${this._dbgRow("clean_type_source",l.clean_type_source)}
                    ${this._dbgRow("mode_signal (knob)",l.mode_signal)}
                    ${this._dbgRow("last_run",l.last_run?`${l.last_run.kind??"—"} (${l.last_run.source??"—"}) ${l.last_run.finished_at??""}`:"—")}
                    ${this._dbgRow("in_cleaning",l.in_cleaning)}
                    ${this._dbgRow("vacuum_room_name",l.vacuum_room_name)}
                    ${this._dbgRow("water_mode_name",h.water_mode_name)}
                    ${this._dbgRow("fan_speed_name",h.fan_speed_name)}
                    ${this._dbgRow("path pts (decimated)",Array.isArray(l.path)?l.path.length:"—")}
                    ${this._dbgRow("path pts (raw)",l.path_points)}
                    ${this._dbgRow("mop pts (raw)",l.mop_path_points)}
                    <div class="sub-title">calib — last single-room decision</div>
                    <pre class="pre">${fmt(l.calib_debug)}</pre>
                    <div class="sub-title">rooms_estimate (per vacuum)</div>
                    <pre class="pre">${fmt(l.rooms_estimate)}</pre>
                    <div class="sub-title">rooms_last_cleaned (cross-vacuum)</div>
                    <pre class="pre">${fmt(l.rooms_last_cleaned)}</pre>
                    <div class="sub-title">rooms_progress — spatial % + time ratio (live)</div>
                    <pre class="pre">${fmt(l.rooms_progress)}</pre>
                    <div class="sub-title">job_progress (live)</div>
                    <pre class="pre">${fmt(l.job_progress)}</pre>
                    <div class="sub-title">rooms (geometry — for spatial coverage)</div>
                    <pre class="pre">${fmt((l.rooms??[]).map(e=>({name:e.name,bbox_px:e.bbox_px,x0:e.x0,y0:e.y0,x1:e.x1,y1:e.y1})))}</pre>
                    <details><summary class="hint">Raw attributes</summary><pre class="pre">${fmt(l)}</pre></details>
                  `:this._hint(Dt`Sensor <code>${o}</code> not found.`):this._hint("No AnyVac integration sensor found — backend values unavailable.")}
            </div>`})}
      </div>
    `}_renderGlobalTab(){const e=this._config.global_actions??[],o=this._config.room_thresholds??Pe;return Dt`
      <div class="tab-body">

        <div class="section-title">Appearance</div>
        ${this._selectField("Theme",this._config.theme??re,[{value:"dark",label:"Dark"},{value:"light",label:"Light"},{value:"auto",label:"Auto — follow the system"},{value:"legacy",label:"Legacy — the pre-1.2.0 look"}],e=>this._setConfig({theme:e===re?void 0:e}))}
        ${this._selectField("Queue while cleaning",this._config.queue_view??"robots",[{value:"robots",label:"By robot — one lane per vacuum"},{value:"time",label:"By time — Now / Next / Done"}],e=>this._setConfig({queue_view:"robots"===e?void 0:e}))}
        ${this._colorField("Accent colour",this._config.accent,le,e=>this._setConfig({accent:e||void 0}),"#6FBF73")}
        ${this._hint("START, room selection and focus rings.","Status colours are deliberately left alone — their saturation carries meaning (cleaning / mopping / error).")}
        ${this._toggle("Calm resting state",!1!==this._config.calm_state,e=>this._setConfig({calm_state:!!e&&void 0}))}
        ${this._hint("Idle: the leftover trace and secondary numbers step back.","Nothing is hidden or disabled — it's purely de-emphasis.")}
        ${this._toggle("Reduce motion",!!this._config.reduce_motion,e=>this._setConfig({reduce_motion:!!e||void 0}))}
        ${this._hint("Turns off animations on the map and the start sequence.",'The operating system\'s own "reduce motion" setting already does this — this is for switching them off without changing that.')}
        ${this._numberSlider("Robot marker glide",this._config.marker_glide_s??1.5,0,25,.5,e=>this._setConfig({marker_glide_s:1.5===e?void 0:e})," s")}
        ${this._hint("How long the robot takes to drive its new trail after each update. 0 = jump.","Positions arrive about every 30 s. Short (1–2 s) replays the new stretch quickly; long (up to 25 s) keeps the robot moving almost all the time, but it then trails reality by that long.")}
        ${this._numberSlider("Care warning at",this._config.care_warn_pct??10,0,50,1,e=>this._setConfig({care_warn_pct:10===e?void 0:e})," %")}
        ${this._hint("A brush, filter or sensor at or below this marks its robot with a dot.","The dot sits on the robot's avatar and on the Care tab of its sheet. Dock errors and tank warnings mark the Dock tab regardless of this value.")}

        <div class="section-title">Layout</div>
        ${this._toggle("Fit card to available screen space",!!this._config.layout,e=>this._setConfig({layout:e?this._config.layout??{}:void 0}))}
        ${this._hint("Recommended — portrait/landscape profiles sized to the screen.","Off keeps the older rendering that grows as tall as its content. Per-profile tuning (columns/rows, crop, orientation, topology) is YAML-only.")}
        ${this._config.layout?Dt`
          ${this._toggle("Flip portrait map 180°",!0===this._config.layout.portrait?.crop?.flip,e=>this._setLayoutFlip("portrait",e))}
          ${this._toggle("Flip landscape map 180°",!0===this._config.layout.landscape?.crop?.flip,e=>this._setLayoutFlip("landscape",e))}
          ${this._hint("A saved default; the map toolbar's Flip is a quick, unsaved try-out.")}
        `:It}

        <div class="section-title">Controller</div>
        ${this._segmented("Mode",this._config.ui_mode??"auto",[{value:"auto",label:"Auto — one START"},{value:"manual",label:"Manual — per robot"}],e=>this._setConfig({ui_mode:e}))}

        ${this._mergedEdit?Dt`
          <div class="section-title">Floorplan</div>
          ${this._textField("Image src (URL)",this._config.image_base?.src,e=>this._setConfig({image_base:{...this._config.image_base??{src:""},src:e}}),"/local/anyvac/flat.svg")}
          ${this._hint("Rotation, scale and room layout are set in the Visual editor.",this._config.image_base?.src?"This field is only for pointing at a new file (e.g. after snapshotting or tracing one externally).":"Set this once to bootstrap the shared floorplan — after that, the Visual editor's Snapshot buttons can replace it.")}
          ${this._numberSlider("Stage height (0 = auto)",this._config.base_height??0,0,1200,10,e=>this._setConfig({base_height:e>0?e:void 0})," px")}

          <div class="section-title">Rooms (shared)</div>
          ${this._config.vacuums.some(e=>this._intEntityFor(e))?this._hint("Rooms come from the integration automatically.","Add a room here only to override its icon/display name or clean-time estimates."):this._hint("One list for every vacuum — add one entry per room.")}
          ${(this._config.rooms??[]).map((e,o)=>this._renderMergedRoomAccordion(e,o))}
          <button class="btn btn--add" @click=${()=>this._addEditedRoom()}>
            <ha-icon icon="mdi:plus"></ha-icon> Add room
          </button>
        `:It}

        <div class="section-title">Global presets (Auto mode)</div>
        ${this._hint("Targeted whole-home cleans, e.g. “After dinner”.","The integration decides which robots and the order; you pick the scope and mode.")}
        ${(this._config.global_presets??[]).map((e,o)=>Dt`
          <div class="sub-section">
            <div class="sub-title sub-title--row">
              <span>${e.label||e.id}</span>
              ${this._rowMenu("gp-"+o,e.label||e.id,[],()=>this._deleteGlobalPreset(o))}
            </div>
            ${this._textField("Label",e.label,e=>this._setGlobalPreset(o,{label:e}),"e.g. After dinner")}
            ${this._iconPickerField(e.icon,e=>this._setGlobalPreset(o,{icon:e||void 0}))}
            ${this._segmented("Scope","all"===e.scope?"all":"select",[{value:"all",label:"Whole home"},{value:"select",label:"Pick on map"}],e=>this._setGlobalPreset(o,{scope:e}))}
            ${this._segmented("Mode",e.mode??"dry",[{value:"dry",label:"Dry",icon:"mdi:broom"},{value:"wet",label:"Wet",icon:"mdi:water"},{value:"both",label:"Both",icon:"mdi:water-plus"}],e=>this._setGlobalPreset(o,{mode:e}))}
          </div>
        `)}
        <button class="btn btn--add" @click=${()=>this._addGlobalPreset()}>
          <ha-icon icon="mdi:plus"></ha-icon> Add global preset
        </button>

        <div class="section-title">Global actions</div>
        ${this._hint("Badges that run a script across all vacuums.")}
        ${e.map((e,o)=>this._renderGlobalAccordion(e,o))}
        <button class="btn btn--add" @click=${()=>this._addGlobal()}>
          <ha-icon icon="mdi:plus"></ha-icon> Add global action
        </button>

        <div class="section-title">Room appearance</div>
        ${this._toggle("Hide room icons",this._config.room_icon_hidden??!1,e=>this._setConfig({room_icon_hidden:e||void 0}))}
        ${this._numberSlider("Border (idle)",this._config.room_border_normal??2,0,12,1,e=>this._setConfig({room_border_normal:e}),"px")}
        ${this._numberSlider("Border (selected)",this._config.room_border_selected??4,0,12,1,e=>this._setConfig({room_border_selected:e}),"px")}

        <div class="section-title">Thresholds</div>
        ${this._hint("Room age colours — first match wins, beyond the last is red.")}
        ${o.map((e,s)=>Dt`
          <div class="var-row threshold-row">
            <span class="threshold-label">≤</span>
            ${this._numberBox("Days",e.days,e=>{const l=o.map((o,l)=>l===s?{...o,days:e??o.days}:o);this._setConfig({room_thresholds:l})},{min:0,max:365})}
            <input type="color" class="threshold-color" aria-label="Colour" .value=${e.color}
              @input=${e=>{const l=e.target.value,h=o.map((e,o)=>o===s?{...e,color:l}:e);this._setConfig({room_thresholds:h})}} />
            <button class="icon-btn icon-btn--sm" aria-label="Remove threshold"
              @click=${()=>{const e=o.filter((e,o)=>o!==s);this._setConfig({room_thresholds:e.length?e:void 0})}}>
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          </div>`)}
        <div class="btn-row">
          <button class="btn btn--add btn--sm" @click=${()=>this._setConfig({room_thresholds:[...o,{days:14,color:"#ff4d4f"}]})}>
            <ha-icon icon="mdi:plus"></ha-icon> Add threshold
          </button>
          ${this._config.room_thresholds?Dt`
            <button class="btn btn--sm" @click=${()=>this._setConfig({room_thresholds:void 0})}>
              Reset to defaults
            </button>
          `:It}
        </div>

        <div class="section-title">Notifications</div>
        ${this._hint("Built from the integration's events with ready-made blueprints.",Dt`Settings → Automations → Create with blueprint: <strong>Clean finished</strong>
            (<code>anyvac_clean_finished</code>), <strong>Vacuum error</strong> (the Roborock error sensor)
            and <strong>Room overdue</strong> (hourly check against a day threshold).
            <code>anyvac_clean_started</code> and <code>anyvac_room_done</code> have no blueprint yet.`)}

        ${(()=>{const e=this._config.vacuums.some(e=>"native-area"===e.clean_action?.type);if(!e)return It;const o=[...new Set(this._config.vacuums.flatMap(e=>(e.rooms??[]).map(e=>e.key)).filter(Boolean))].sort(),s=this._config.area_mappings??{};return Dt`
            <div class="section-title">Area mappings</div>
            ${this._hint("Room key → HA area, for the native-area strategy.","Used without the AnyVac integration only. Applies to all vacuums.")}
            ${0===o.length?this._hint("No rooms configured yet."):o.map(e=>this._areaPicker(e,s[e],o=>{const l={...s};o?l[e]=o:delete l[e],this._setConfig({area_mappings:Object.keys(l).length?l:void 0})}))}
          `})()}

      </div>`}_renderGlobalAccordion(e,o){const s=this._resolveColor(e.color,"orange"),l=this._openGlobal.has(o),h=e.action,d=e.watch_entities??[];return Dt`
      <div class="acc-row ${l?"acc-row--open":""}">
        <div class="acc-header" role="button" tabindex="0" aria-expanded=${l?"true":"false"}
          @click=${()=>this._toggleGlobal(o)}
          @keydown=${e=>{"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),this._toggleGlobal(o))}}>
          <span class="acc-avatar" style=${Xt({borderColor:s})}>
            ${e.image?Dt`<img src=${e.image} alt="" />`:Dt`<ha-icon icon="mdi:home-floor-a" style=${Xt({color:s})}></ha-icon>`}
          </span>
          <div class="acc-info">
            <span class="acc-name">${e.name||"Unnamed action"}</span>
            <span class="acc-sub">${"script"===h.type?h.entity_id:h.service}</span>
          </div>
          ${this._rowMenu("ga-"+o,e.name||"this action",[],()=>this._deleteGlobal(o))}
          <ha-icon icon=${l?"mdi:chevron-up":"mdi:chevron-down"} class="acc-chevron"></ha-icon>
        </div>
        ${l?Dt`
          <div class="acc-body">
            ${this._textField("Display name",e.name,e=>this._setGlobal(o,{name:e}),"e.g. Whole flat")}
            ${this._textField("Image path",e.image,e=>this._setGlobal(o,{image:e||void 0}),"/local/...")}
            ${this._colorField("Colour",e.color?this._resolveColor(e.color,"orange"):void 0,ae.map(e=>({hex:e})),e=>this._setGlobal(o,{color:e||void 0}),"#faad14")}
            ${this._ha?this._sel("Watch entities (badge glows while any is cleaning)",{entity:{domain:"vacuum",multiple:!0}},d,e=>this._setGlobal(o,{watch_entities:(Array.isArray(e)?e:[]).filter(Boolean)})):Dt`
                <div class="sub-title">Watch entities (badge glows while any is cleaning)</div>
                ${d.map((e,s)=>Dt`
                  <div class="var-row">
                    ${this._entityPicker("Vacuum",e,["vacuum"],e=>{const l=[...d];l[s]=e,this._setGlobal(o,{watch_entities:l.filter(Boolean)})})}
                    <button class="icon-btn icon-btn--sm" aria-label="Remove"
                      @click=${()=>this._setGlobal(o,{watch_entities:d.filter((e,o)=>o!==s)})}>
                      <ha-icon icon="mdi:close"></ha-icon>
                    </button>
                  </div>`)}
                <button class="btn btn--add btn--sm"
                  @click=${()=>this._setGlobal(o,{watch_entities:[...d,""]})}>
                  <ha-icon icon="mdi:plus"></ha-icon> Add entity
                </button>`}

            <div class="sub-title">Action (hold to run)</div>
            ${this._segmented("Type",h.type,[{value:"script",label:"Script"},{value:"service",label:"Service call"}],e=>this._setGlobal(o,{action:"script"===e?{type:"script",entity_id:""}:{type:"service",service:""}}))}
            ${"script"===h.type?this._entityPicker("Script entity",h.entity_id,["script"],e=>this._setGlobalAction(o,{entity_id:e})):this._textField("Service",h.service,e=>this._setGlobalAction(o,{service:e}),"e.g. script.celkovy_uklid_bytu")}
          </div>
        `:It}
      </div>`}render(){return this._config?null===this._ha?Dt`<div class="loading">Loading…</div>`:(this._hintSeq=0,Dt`
      ${this._ha?It:Dt`<datalist id="ha-entities"></datalist>`}
      <div class="editor-root" @click=${()=>{this._menu&&(this._menu=null,this._confirm=null)}}>
        <div class="tabs-bar" role="tablist">
          ${["vacuums","global"].map(e=>Dt`
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
          <span>anyvac-card v${Qt}</span>
        </div>
      </div>`):It}};Fe.styles=i$6`
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
    .room-acc--drop { outline: 2px dashed var(--primary-color); outline-offset: -2px; }
    .room-acc-header { display: flex; align-items: center; gap: 8px; padding: 6px 6px 6px 8px; cursor: pointer; }
    .room-acc-icon { flex-shrink: 0; color: var(--secondary-text-color); }
    .room-acc-info { flex: 1; display: flex; flex-direction: column; min-width: 0; }
    .room-acc-name { font-weight: 500; font-size: 14px; color: var(--primary-text-color); }
    .room-acc-meta { font-size: 12px; color: var(--secondary-text-color); }
    .room-acc-body { padding: 12px; display: flex; flex-direction: column; gap: 12px; border-top: 1px solid var(--divider-color); }
    .drag { cursor: grab; color: var(--secondary-text-color); --mdc-icon-size: 18px; flex-shrink: 0; }

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
  `,__decorate([n$1({attribute:!1})],Fe.prototype,"hass",void 0),__decorate([r()],Fe.prototype,"_config",void 0),__decorate([r()],Fe.prototype,"_tab",void 0),__decorate([r()],Fe.prototype,"_dragRoom",void 0),__decorate([r()],Fe.prototype,"_openVac",void 0),__decorate([r()],Fe.prototype,"_openSensors",void 0),__decorate([r()],Fe.prototype,"_openMap",void 0),__decorate([r()],Fe.prototype,"_openPresets",void 0),__decorate([r()],Fe.prototype,"_openAction",void 0),__decorate([r()],Fe.prototype,"_openGlobal",void 0),__decorate([r()],Fe.prototype,"_openRoom",void 0),__decorate([r()],Fe.prototype,"_hvSwap",void 0),__decorate([r()],Fe.prototype,"_pvAR",void 0),__decorate([r()],Fe.prototype,"_pvNat",void 0),__decorate([r()],Fe.prototype,"_floorplanSnapshotBusy",void 0),__decorate([r()],Fe.prototype,"_floorplanSnapshotError",void 0),__decorate([r()],Fe.prototype,"_guideExportBusy",void 0),__decorate([r()],Fe.prototype,"_guideExportError",void 0),__decorate([r()],Fe.prototype,"_guideExportResult",void 0),__decorate([r()],Fe.prototype,"_placeRoomsResult",void 0),__decorate([r()],Fe.prototype,"_ha",void 0),__decorate([r()],Fe.prototype,"_menu",void 0),__decorate([r()],Fe.prototype,"_confirm",void 0),__decorate([r()],Fe.prototype,"_hintsOpen",void 0),Fe=__decorate([t$1(Jt)],Fe);export{$e as AnyVacCard,Fe as AnyVacCardEditor};
