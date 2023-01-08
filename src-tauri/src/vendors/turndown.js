var TurndownService=function(){"use strict";function u(e,n){return Array(n+1).join(e)}var n=["ADDRESS","ARTICLE","ASIDE","AUDIO","BLOCKQUOTE","BODY","CANVAS","CENTER","DD","DIR","DIV","DL","DT","FIELDSET","FIGCAPTION","FIGURE","FOOTER","FORM","FRAMESET","H1","H2","H3","H4","H5","H6","HEADER","HGROUP","HR","HTML","ISINDEX","LI","MAIN","MENU","NAV","NOFRAMES","NOSCRIPT","OL","OUTPUT","P","PRE","SECTION","TABLE","TBODY","TD","TFOOT","TH","THEAD","TR","UL"];function o(e){return l(e,n)}var r=["AREA","BASE","BR","COL","COMMAND","EMBED","HR","IMG","INPUT","KEYGEN","LINK","META","PARAM","SOURCE","TRACK","WBR"];function i(e){return l(e,r)}var a=["A","TABLE","THEAD","TBODY","TFOOT","TH","TD","IFRAME","SCRIPT","AUDIO","VIDEO"];function l(e,n){return 0<=n.indexOf(e.nodeName)}function c(n,e){return n.getElementsByTagName&&e.some(function(e){return n.getElementsByTagName(e).length})}var t={};function s(e){return e?e.replace(/(\n+\s*)+/g,"\n"):""}function f(e){for(var n in this.options=e,this._keep=[],this._remove=[],this.blankRule={replacement:e.blankReplacement},this.keepReplacement=e.keepReplacement,this.defaultRule={replacement:e.defaultReplacement},this.array=[],e.rules)this.array.push(e.rules[n])}function d(e,n,t){for(var r=0;r<e.length;r++){var i=e[r];if(function(e,n,t){var r=e.filter;if("string"==typeof r){if(r===n.nodeName.toLowerCase())return!0}else if(Array.isArray(r)){if(-1<r.indexOf(n.nodeName.toLowerCase()))return!0}else{if("function"!=typeof r)throw new TypeError("`filter` needs to be a string, array, or function");if(r.call(e,n,t))return!0}}(i,n,t))return i}}function p(e){var n=e.nextSibling||e.parentNode;return e.parentNode.removeChild(e),n}function h(e,n,t){return e&&e.parentNode===n||t(n)?n.nextSibling||n.parentNode:n.firstChild||n.nextSibling||n.parentNode}t.paragraph={filter:"p",replacement:function(e){return"\n\n"+e+"\n\n"}},t.lineBreak={filter:"br",replacement:function(e,n,t){return t.br+"\n"}},t.heading={filter:["h1","h2","h3","h4","h5","h6"],replacement:function(e,n,t){n=Number(n.nodeName.charAt(1));return"setext"===t.headingStyle&&n<3?"\n\n"+e+"\n"+u(1===n?"=":"-",e.length)+"\n\n":"\n\n"+u("#",n)+" "+e+"\n\n"}},t.blockquote={filter:"blockquote",replacement:function(e){return"\n\n"+(e=(e=e.replace(/^\n+|\n+$/g,"")).replace(/^/gm,"> "))+"\n\n"}},t.list={filter:["ul","ol"],replacement:function(e,n){var t=n.parentNode;return"LI"===t.nodeName&&t.lastElementChild===n?"\n"+e:"\n\n"+e+"\n\n"}},t.listItem={filter:"li",replacement:function(e,n,t){e=e.replace(/^\n+/,"").replace(/\n+$/,"\n").replace(/\n/gm,"\n    ");var r=t.bulletListMarker+"   ",i=n.parentNode;return"OL"===i.nodeName&&(t=i.getAttribute("start"),i=Array.prototype.indexOf.call(i.children,n),r=(t?Number(t)+i:i+1)+".  "),r+e+(n.nextSibling&&!/\n$/.test(e)?"\n":"")}},t.indentedCodeBlock={filter:function(e,n){return"indented"===n.codeBlockStyle&&"PRE"===e.nodeName&&e.firstChild&&"CODE"===e.firstChild.nodeName},replacement:function(e,n,t){return"\n\n    "+n.firstChild.textContent.replace(/\n/g,"\n    ")+"\n\n"}},t.fencedCodeBlock={filter:function(e,n){return"fenced"===n.codeBlockStyle&&"PRE"===e.nodeName&&e.firstChild&&"CODE"===e.firstChild.nodeName},replacement:function(e,n,t){for(var r,i=((n.firstChild.getAttribute("class")||"").match(/language-(\S+)/)||[null,""])[1],o=n.firstChild.textContent,t=t.fence.charAt(0),a=3,l=new RegExp("^"+t+"{3,}","gm");r=l.exec(o);)r[0].length>=a&&(a=r[0].length+1);t=u(t,a);return"\n\n"+t+i+"\n"+o.replace(/\n$/,"")+"\n"+t+"\n\n"}},t.horizontalRule={filter:"hr",replacement:function(e,n,t){return"\n\n"+t.hr+"\n\n"}},t.inlineLink={filter:function(e,n){return"inlined"===n.linkStyle&&"A"===e.nodeName&&e.getAttribute("href")},replacement:function(e,n){var t=n.getAttribute("href"),n=s(n.getAttribute("title"));return"["+e+"]("+t+(n=n&&' "'+n+'"')+")"}},t.referenceLink={filter:function(e,n){return"referenced"===n.linkStyle&&"A"===e.nodeName&&e.getAttribute("href")},replacement:function(e,n,t){var r=n.getAttribute("href"),i=(i=s(n.getAttribute("title")))&&' "'+i+'"';switch(t.linkReferenceStyle){case"collapsed":a="["+e+"][]",l="["+e+"]: "+r+i;break;case"shortcut":a="["+e+"]",l="["+e+"]: "+r+i;break;default:var o=this.references.length+1,a="["+e+"]["+o+"]",l="["+o+"]: "+r+i}return this.references.push(l),a},references:[],append:function(e){var n="";return this.references.length&&(n="\n\n"+this.references.join("\n")+"\n\n",this.references=[]),n}},t.emphasis={filter:["em","i"],replacement:function(e,n,t){return e.trim()?t.emDelimiter+e+t.emDelimiter:""}},t.strong={filter:["strong","b"],replacement:function(e,n,t){return e.trim()?t.strongDelimiter+e+t.strongDelimiter:""}},t.code={filter:function(e){var n=e.previousSibling||e.nextSibling,n="PRE"===e.parentNode.nodeName&&!n;return"CODE"===e.nodeName&&!n},replacement:function(e){if(!e)return"";e=e.replace(/\r?\n|\r/g," ");for(var n=/^`|^ .*?[^ ].* $|`$/.test(e)?" ":"",t="`",r=e.match(/`+/gm)||[];-1!==r.indexOf(t);)t+="`";return t+n+e+n+t}},t.image={filter:"img",replacement:function(e,n){var t=s(n.getAttribute("alt")),r=n.getAttribute("src")||"",n=s(n.getAttribute("title"));return r?"!["+t+"]("+r+(n?' "'+n+'"':"")+")":""}},f.prototype={add:function(e,n){this.array.unshift(n)},keep:function(e){this._keep.unshift({filter:e,replacement:this.keepReplacement})},remove:function(e){this._remove.unshift({filter:e,replacement:function(){return""}})},forNode:function(e){return e.isBlank?this.blankRule:(n=d(this.array,e,this.options))||(n=d(this._keep,e,this.options))||(n=d(this._remove,e,this.options))?n:this.defaultRule;var n},forEach:function(e){for(var n=0;n<this.array.length;n++)e(this.array[n],n)}};var g="undefined"!=typeof window?window:{};var m,A=function(){var e=g.DOMParser,n=!1;try{(new e).parseFromString("","text/html")&&(n=!0)}catch(e){}return n}()?g.DOMParser:(!function(){var n=!1;try{document.implementation.createHTMLDocument("").open()}catch(e){window.ActiveXObject&&(n=!0)}return n}()?e.prototype.parseFromString=function(e){var n=document.implementation.createHTMLDocument("");return n.open(),n.write(e),n.close(),n}:e.prototype.parseFromString=function(e){var n=new window.ActiveXObject("htmlfile");return n.designMode="on",n.open(),n.write(e),n.close(),n},e);function e(){}function v(e,n){return function(e){var n=e.element,t=e.isBlock,r=e.isVoid,i=e.isPre||function(e){return"PRE"===e.nodeName};if(n.firstChild&&!i(n)){for(var o=null,a=!1,l=h(c=null,n,i);l!==n;){if(3===l.nodeType||4===l.nodeType){var u=l.data.replace(/[ \r\n\t]+/g," ");if(!(u=!(o&&!/ $/.test(o.data)||a||" "!==u[0])?u.substr(1):u)){l=p(l);continue}l.data=u,o=l}else{if(1!==l.nodeType){l=p(l);continue}t(l)||"BR"===l.nodeName?(o&&(o.data=o.data.replace(/ $/,"")),o=null,a=!1):r(l)||i(l)?a=!(o=null):o&&(a=!1)}var u=h(c,l,i),c=l,l=u}o&&(o.data=o.data.replace(/ $/,""),o.data||p(o))}}({element:e="string"==typeof e?(m=m||new A).parseFromString('<x-turndown id="turndown-root">'+e+"</x-turndown>","text/html").getElementById("turndown-root"):e.cloneNode(!0),isBlock:o,isVoid:i,isPre:n.preformattedCode?y:null}),e}function y(e){return"PRE"===e.nodeName||"CODE"===e.nodeName}function N(e,n){var t;return e.isBlock=o(e),e.isCode="CODE"===e.nodeName||e.parentNode.isCode,e.isBlank=!i(t=e)&&!function(e){return l(e,a)}(t)&&/^\s*$/i.test(t.textContent)&&!function(e){return c(e,r)}(t)&&!function(e){return c(e,a)}(t),e.flankingWhitespace=function(e,n){if(e.isBlock||n.preformattedCode&&e.isCode)return{leading:"",trailing:""};var t=function(e){e=e.match(/^(([ \t\r\n]*)(\s*))[\s\S]*?((\s*?)([ \t\r\n]*))$/);return{leading:e[1],leadingAscii:e[2],leadingNonAscii:e[3],trailing:e[4],trailingNonAscii:e[5],trailingAscii:e[6]}}(e.textContent);t.leadingAscii&&E("left",e,n)&&(t.leading=t.leadingNonAscii);t.trailingAscii&&E("right",e,n)&&(t.trailing=t.trailingNonAscii);return{leading:t.leading,trailing:t.trailing}}(e,n),e}function E(e,n,t){var r,i,n="left"===e?(r=n.previousSibling,/ $/):(r=n.nextSibling,/^ /);return r&&(3===r.nodeType?i=n.test(r.nodeValue):t.preformattedCode&&"CODE"===r.nodeName?i=!1:1!==r.nodeType||o(r)||(i=n.test(r.textContent))),i}var T=Array.prototype.reduce,R=[[/\\/g,"\\\\"],[/\*/g,"\\*"],[/^-/g,"\\-"],[/^\+ /g,"\\+ "],[/^(=+)/g,"\\$1"],[/^(#{1,6}) /g,"\\$1 "],[/`/g,"\\`"],[/^~~~/g,"\\~~~"],[/\[/g,"\\["],[/\]/g,"\\]"],[/^>/g,"\\>"],[/_/g,"\\_"],[/^(\d+)\. /g,"$1\\. "]];function C(e){if(!(this instanceof C))return new C(e);this.options=function(e){for(var n=1;n<arguments.length;n++){var t,r=arguments[n];for(t in r)r.hasOwnProperty(t)&&(e[t]=r[t])}return e}({},{rules:t,headingStyle:"setext",hr:"* * *",bulletListMarker:"*",codeBlockStyle:"indented",fence:"```",emDelimiter:"_",strongDelimiter:"**",linkStyle:"inlined",linkReferenceStyle:"full",br:"  ",preformattedCode:!1,blankReplacement:function(e,n){return n.isBlock?"\n\n":""},keepReplacement:function(e,n){return n.isBlock?"\n\n"+n.outerHTML+"\n\n":n.outerHTML},defaultReplacement:function(e,n){return n.isBlock?"\n\n"+e+"\n\n":e}},e),this.rules=new f(this.options)}function k(e){var r=this;return T.call(e.childNodes,function(e,n){var t="";return 3===(n=new N(n,r.options)).nodeType?t=n.isCode?n.nodeValue:r.escape(n.nodeValue):1===n.nodeType&&(t=function(e){var n=this.rules.forNode(e),t=k.call(this,e),r=e.flankingWhitespace;(r.leading||r.trailing)&&(t=t.trim());return r.leading+n.replacement(t,e,this.options)+r.trailing}.call(r,n)),b(e,t)},"")}function b(e,n){var t=function(e){for(var n=e.length;0<n&&"\n"===e[n-1];)n--;return e.substring(0,n)}(e),r=n.replace(/^\n*/,""),n=Math.max(e.length-t.length,n.length-r.length);return t+"\n\n".substring(0,n)+r}return C.prototype={turndown:function(e){if(null==(n=e)||"string"!=typeof n&&(!n.nodeType||1!==n.nodeType&&9!==n.nodeType&&11!==n.nodeType))throw new TypeError(e+" is not a string, or an element/document/fragment node.");var n;if(""===e)return"";e=k.call(this,new v(e,this.options));return function(n){var t=this;return this.rules.forEach(function(e){"function"==typeof e.append&&(n=b(n,e.append(t.options)))}),n.replace(/^[\t\r\n]+/,"").replace(/[\t\r\n\s]+$/,"")}.call(this,e)},use:function(e){if(Array.isArray(e))for(var n=0;n<e.length;n++)this.use(e[n]);else{if("function"!=typeof e)throw new TypeError("plugin must be a Function or an Array of Functions");e(this)}return this},addRule:function(e,n){return this.rules.add(e,n),this},keep:function(e){return this.rules.keep(e),this},remove:function(e){return this.rules.remove(e),this},escape:function(e){return R.reduce(function(e,n){return e.replace(n[0],n[1])},e)}},C}();