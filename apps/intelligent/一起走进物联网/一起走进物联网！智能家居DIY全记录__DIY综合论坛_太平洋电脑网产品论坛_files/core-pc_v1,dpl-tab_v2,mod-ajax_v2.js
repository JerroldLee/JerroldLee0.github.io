(function(c,f){if(c.PCgroup){return}var b,d=Object.prototype.toString,e=Array.prototype.slice,a=c.document;b=function(){return b.dom.quick.apply(this,arguments)};b.add=function(g,h){if(typeof g!="string"){var i=g;for(var g in i){b.add(g,i[g])}return}if(b[g]==f){b[g]=h}else{throw new Error("PCgroup Lib：模块名"+g+"已被占用")}};b.version="1.0";b.add({isFunction:function(g){return d.call(g)==="[object Function]"},isArray:function(g){return d.call(g)==="[object Array]"},isPlainObject:function(g){return g&&d.call(g)==="[object Object]"&&!g.nodeType&&!g.setInterval},isBoolean:function(g){return d.call(g)==="[object Boolean]"},isUndefined:function(g){return g===f},isString:function(g){return d.call(g)==="[object String]"},isNumber:function(g){return d.call(g)==="[object Number]"},trim:function(g){if(String.prototype.trim){return g.trim()}return g.replace(/^\s+/g,"").replace(/\s+$/g,"")},each:function(h,l){if(f===h.length){for(var k in h){if(false===l.call(h,h[k],k)){break}}}else{for(var j=0,g=h.length;j<g;j++){if(j in h){if(false===l.call(h,h[j],j)){break}}}}},extend:function(g,k,i,h){if(i===f){i=true}for(var j in k){if(i||!(j in g)){if(h){h(j)}else{g[j]=k[j]}}}return g},merge:function(){var j={},h,g=arguments.length;for(h=0;h<g;++h){b.extend(j,arguments[h])}return j},bindFn:function(g){return function(){var i=e.call(arguments,0),h;i.unshift(this);h=g.apply(this,i);if(h===f){return this}else{if(h&&h.nodeType&&h.nodeType==1){return b.element(h)}else{return h}}}}});b.add("dom",function(h){var g=false,l=[],i=function(){if(!g){g=true;if(l){b.each(l,function(m){m.call(a,b)});l=null}}},k=false;bindReady=function(){if(k){return}k=true;if(a.addEventListener){a.addEventListener("DOMContentLoaded",function(){a.removeEventListener("DOMContentLoaded",arguments.callee,false);i()},false)}else{if(a.attachEvent){a.attachEvent("onreadystatechange",function(){if(a.readyState==="complete"){a.detachEvent("onreadystatechange",arguments.callee);i()}});if(a.documentElement.doScroll&&c==c.top){(function(){if(g){return}try{a.documentElement.doScroll("left")}catch(m){setTimeout(arguments.callee,0);return}i()})()}}}b.addEvent(c,"load",i)};var j={getElems:function(m,n){return b.selector(m,n)},getElem:function(m,o){var n=b.dom.getElems(m,o);return n.length?n[0]:null},quick:function(p,o){var n,m;if(!p){return null}if(b.isString(p)){var n=b.dom.getElems(p,o);return b.dom.quick(n)}if(b.isFunction(p)){return b.dom.ready(p)}if(b.isArray(p)){b.each(p,function(q){b.dom.quick(q)});if(p.length>1){p.each=b.bindFn(b.each)}else{p=p[0];p[0]=p;p.each=function(q){q(p)}}return p}if(p.nodeType){return b.dom.element(p)}return null},ready:function(m){bindReady();if(g){m.call(a,b)}else{l.push(function(){return m.call(a,b)})}return this},element:function(m){b.extend(m,b.dom.methods);return m},extend:function(p,o){if(!b.isString(p)){var q={};if(o){b.each(o,function(s){var t=p[s];if(t){q[s]=t}})}else{q=p}b.each(q,function(t,s){b.dom.extend(s,t)})}else{var m=b.dom.methods,n=p,r=o;if(b.isFunction(r)){m[n]=b.bindFn(r)}else{m[n]=r}}},methods:{}};return j}(b));b.getElem=b.dom.getElem;b.getElems=b.dom.getElems;b.ready=b.dom.ready;b.element=b.dom.element;b.add("loader",{getScript:function(h,k,j){var i=a.getElementsByTagName("head")[0]||a.documentElement,g=a.createElement("script");g.src=h;j&&(g.charset=j);g.onload=g.onreadystatechange=function(){if((!this.readyState||this.readyState==="loaded"||this.readyState==="complete")){k&&k();g.onload=g.onreadystatechange=null;if(i&&g.parentNode){i.removeChild(g)}}};i.appendChild(g);return g},need:function(){var g=b.loader,h=e.call(arguments,0),i=h.pop();if(!b.isFunction(i)){return}var j=function(){i.call(b,b)};j.depth=h.length;b.each(h,function(o){var l,n=g.__mods[o];if(n){l=o;o=n}if(o){var m=function(){!--j.depth&&j()},k=g.__log[o]||(g.__log[o]={});if(l&&b[l]){k.status="loaded"}if(k.status=="sent"){k.callbaks.push(m)}else{if(k.status=="loaded"){m()}else{k.status="sent";k.callbaks=[m];g.getScript(o,function(){b.each(k.callbaks,function(p){p.call(c,b)});k.status="loaded"})}}}})},__log:{},__mods:{ajax:"http://js.3conline.com/min/temp/v2/mod-ajax.js",cookie:"http://js.3conline.com/min/temp/v2/mod-cookie.js",tab:"http://js.3conline.com/min/temp/v2/dpl-tab.js"}});b.need=b.loader.need;b.getScript=b.loader.getScript;c.pc=c.PCgroup=b})(window);PCgroup.add("selector",(function(f){var g=/^(?:[\w\-_]+)?\.([\w\-_]+)/,e=/^(?:[\w\-_]+)?#([\w\-_]+)/,k=/^([\w\*\-_]+)/,h=/^(?:[\w\-_]+)?\[([\w]+)(=(\w+))?\]/,i=[null,null,null,null];function c(p,n){n=n||document;var l=/^[\w\-_#]+$/.test(p);if(!l&&n.querySelectorAll){return b(n.querySelectorAll(p))}if(p.indexOf(",")>-1){var z=p.split(/,/g),w=[],v=0,u=z.length;for(;v<u;++v){w=w.concat(c(z[v],n))}return d(w)}p=p.replace(" > ",">").replace(">"," > ");var r=p.split(/ /g),o=r.pop(),m=(o.match(e)||i)[1],x=!m&&(o.match(g)||i)[1],A=!m&&(o.match(k)||i)[1],q=o.match(h)||i,y=q[1]||null,t=q[3]||null,s;if(x&&!A&&n.getElementsByClassName){s=b(n.getElementsByClassName(x))}else{s=!m&&b(n.getElementsByTagName(A||"*"));if(x){s=j(s,"className",x)
}if(y){s=j(s,y,t)}if(m){var B=n.getElementById(m);return B?[B]:[]}}return r[0]&&s[0]?a(r,s):s}function b(p){try{return slice.call(p)}catch(o){var m=[],n=0,l=p.length;for(;n<l;++n){m[n]=p[n]}return m}}function a(x,q,o){var s=x.pop();if(s===">"){return a(x,q,true)}var t=[],l=-1,m=(s.match(e)||i)[1],u=!m&&(s.match(g)||i)[1],w=!m&&(s.match(k)||i)[1],v=-1,n,y,p;w=w&&w.toLowerCase();while((n=q[++v])){y=n.parentNode;do{p=!w||w==="*"||w===y.nodeName.toLowerCase();p=p&&(!m||y.id===m);p=p&&(!u||RegExp("(^|\\s)"+u+"(\\s|$)").test(y.className));if(o||p){break}}while((y=y.parentNode));if(p){t[++l]=n}}return x[0]&&t[0]?a(x,t):t}var d=(function(){var l=new Date().getTime();var m=(function(){var o=1;return function(q){var p=q[l],n=o++;if(!p){q[l]=n;return true}return false}})();return function(n){var t=n.length,o=[],s=-1,p=0,q;for(;p<t;++p){q=n[p];if(m(q)){o[++s]=q}}l+=1;return o}})();function j(p,s,u){var m=RegExp("(^|\\s)"+u+"(\\s|$)");var t=function(w){var r=s=="className"?w.className:w.getAttribute(s);if(r){if(u){if(m.test(r)){return true}}else{return true}}return false};var o=-1,n,l=-1,q=[];while((n=p[++o])){if(t(n)){q[++l]=n}}return q}return c})(PCgroup));PCgroup.add("browser",(function(e){var c={msie:/msie/.test(e)&&!/opera/.test(e),opera:/opera/.test(e),safari:/webkit/.test(e)&&!/chrome/.test(e),firefox:/firefox/.test(e),chrome:/chrome/.test(e),ipad:(/ipad/).test(e),iphone:(/iphone/).test(e)};var a="";for(var d in c){if(c[d]){a="safari"==d?"version":d;break}}c.version=a&&RegExp("(?:"+a+")[\\/: ]([\\d.]+)").test(e)?RegExp.$1:"0";c.ie=c.msie;c.ie6=c.msie&&parseInt(c.version,10)==6;c.ie7=c.msie&&parseInt(c.version,10)==7;c.ie8=c.msie&&parseInt(c.version,10)==8;c.ie9=c.msie&&parseInt(c.version,10)==9;c.support=function(){var f=document.createElement("div");f.style.display="none";f.innerHTML="<a href='#' style='color:red;float:left;opacity:.55;'>a</a>";var b=f.getElementsByTagName("a")[0];return{opacity:/^0.55$/.test(b.style.opacity),cssFloat:!!b.style.cssFloat}}();return c})(window.navigator.userAgent.toLowerCase()));(function(h,d){var f=/alpha\([^)]*\)/,e=/float/i,n=/opacity=([^)]*)/,i=h.browser.support.cssFloat?"cssFloat":"styleFloat",m=/([A-Z])/g,b=/-([a-z])/ig,c=function(o,p){return p.toUpperCase()},a=document.defaultView&&document.defaultView.getComputedStyle,g=/^-?\d+(?:px)?$/i,l=/^-?\d/;h.add({cssHooks:{},getStyle:function(u,r,v,p){var q,t=u.style,s,o=PCgroup.cssHooks[r];if(!h.browser.support.opacity&&r==="opacity"&&u.currentStyle){q=n.test(u.currentStyle.filter||"")?(parseFloat(RegExp.$1)/100)+"":"";return q===""?"1":q}if(e.test(r)){r=i}if(o&&"get" in o&&(q=o.get(u,p))!==d){return q}else{if(!v&&t&&t[r]){q=t[r]}else{q=k(u,r,v)}}return q},setStyle:function(){var t=arguments,r=t[0];if(typeof t[1]!="string"){for(var w in t[1]){h.setStyle.apply(h,[r,w,t[1][w]])}return}var p=t[1],v=t[2];var o=r.style||r,u=v!==d;if(!h.browser.support.opacity&&p==="opacity"){if(u){o.zoom=1;var s=parseInt(v,10)+""==="NaN"?"":"alpha(opacity="+v*100+")";if(v>=1){s=""}var q=o.filter||"";o.filter=f.test(q)?q.replace(f,s):s}return o.filter&&o.filter.indexOf("opacity=")>=0?(parseFloat(n.exec(o.filter)[1])/100)+"":""}if(e.test(p)){p=i}p=p.replace(b,c);if(u){o[p]=v}}});function j(s,q,p){var u=q==="width"?s.offsetWidth:s.offsetHeight,t=q==="width"?["Left","Right"]:["Top","Bottom"],r=0,o=t.length;if(u>0){if(p!=="border"){for(;r<o;r++){if(!p){u-=parseFloat(PCgroup.getStyle(s,"padding"+t[r]))||0}if(p==="margin"){u+=parseFloat(PCgroup.getStyle(s,p+t[r]))||0}else{u-=parseFloat(PCgroup.getStyle(s,"border"+t[r]+"Width"))||0}}}return u+"px"}u=k(s,q,q);if(u<0||u==null){u=s.style[q]||0}u=parseFloat(u)||0;if(p){for(;r<o;r++){u+=parseFloat(PCgroup.getStyle(s,"padding"+t[r]))||0;if(p!=="padding"){u+=parseFloat(PCgroup.getStyle(s,"border"+t[r]+"Width"))||0}if(p==="margin"){u+=parseFloat(PCgroup.getStyle(s,p+t[r]))||0}}}return u+"px"}function k(s,p,q){var o=s.style,w;if(a){if(e.test(p)){p="float"}p=p.replace(m,"-$1").toLowerCase();var v=s.ownerDocument.defaultView;if(!v){return null}var x=v.getComputedStyle(s,null);if(x){w=x.getPropertyValue(p)}if(p==="opacity"&&w===""){w="1"}}else{if(s.currentStyle){var t=p.replace(b,c);w=s.currentStyle[p]||s.currentStyle[t];if(!g.test(w)&&l.test(w)){var r=o.left,u=s.runtimeStyle.left;s.runtimeStyle.left=s.currentStyle.left;o.left=t==="fontSize"?"1em":(w||0);w=o.pixelLeft+"px";o.left=r;s.runtimeStyle.left=u}}}return w}PCgroup.each(["height","width"],function(o){PCgroup.cssHooks[o]={get:function(q,p){return j(q,o,p)}}});PCgroup.dom.extend(PCgroup,["getStyle","setStyle"])})(PCgroup);(function(f,d){var j=/\s+/,e=/[\n\t\r]/g;var b=function(n,k,m){k=k||1;var l=0;for(;n;n=n[m]){if(n.nodeType==1&&++l==k){break}}return n},g=function(m,l){var k=[];for(;m;m=m.nextSibling){if(m.nodeType==1&&m!=l){k.push(m)}}return k};var c={},i="PCgroup",a=0;var h=document.documentElement.textContent!==d?"textContent":"innerText";f.add({isContain:function(l,k){try{return l.contains?l!=k&&l.contains(k):!!(l.compareDocumentPosition(k)&16)}catch(m){return false
}},createElem:function(n,l,o){var o=o||document;var k=o.createElement(n);if(l){for(var m in l){var p=l[m];if(m=="className"){f.addClass(k,p);continue}k.setAttribute(m,p)}}return k},prependChild:function(l,k){if(l.nodeType==1){l.insertBefore(k,l.firstChild)}},insertAfter:function(n,k){var l=n.parentNode,m=l.lastChild;if(m==n){l.appendChild(k)}else{l.insertBefore(k,n.nextSibling)}},hasClass:function(m,k){var l=" ",n=l+m.className+l;return n.indexOf(l+k+l)!=-1},addClass:function(l,k){if(!pc.hasClass(l,k)){l.className=pc.trim(l.className+" "+k)}},removeClass:function(n,l){var m=(" "+n.className+" ").replace(e," "),o=l.split(j);for(var p=0,k=o.length;p<k;p++){m=m.replace(" "+o[p]+" "," ")}n.className=pc.trim(m)},nextElem:function(k){return b(k,2,"nextSibling")},prevElem:function(k){return b(k,2,"previousSibling")},parentElems:function(k){return pc.walk(k,"parentNode")},nextElems:function(k){return pc.walk(k,"nextSibling")},prevElems:function(k){return pc.walk(k,"previousSibling")},siblings:function(k){return g(k.parentNode.firstChild,k)},walk:function(n,l,m){var k=[],p=n[l];while(p&&p.nodeType!==9){if(p.nodeType===1){if(m){var o=m(p);if(o===false){p=p[l];continue}}k.push(p)}p=p[l]}return k},childElems:function(k){return g(k.firstChild)},getText:function(k){return k[h]},setText:function(k,l){if(l!==d){k[h]=l}},setData:function(l,k,m){var n=l[i];if(n===d){n=a++;l[i]=n}if(c[n]===d){c[n]={}}return c[n][k]=m},getData:function(l,k){var n=l[i],m=c[n]&&c[n][k];if(m===d){m=null}return m},removeData:function(l,k){var m=l[i];if(m!==d&&c[m]){delete c[m][k]}}});pc.create=pc.createElem;PCgroup.dom.extend(PCgroup,["prependChild","insertAfter","hasClass","addClass","removeClass","nextElem","prevElem","parentElems","nextElems","prevElems","siblings","childElems","setData","getData","removeData","walk","getText","setText"])})(PCgroup);(function(e,f){var c=0,d="PCgroupEventID",b="PCgroupEvents",a=[];e.add({addEvent:function(l,k,j){var h;if(!e.getData(l,b)){e.setData(l,b,{})}h=e.getData(l,b);if(!h[k]){h[k]={}}var g=function(p){var p=p||window.event,n=this;if(p!==f){var o=PCgroup.extend({},p);p=pc.eventTarget(p)}j.apply(l,[p,o])};var m=function(s){var p=function(u,t){try{return u.contains?u!=t&&u.contains(t):!!(u.compareDocumentPosition(t)&16)}catch(v){}};var s=s||window.event,o=this;if(s!==f){var q=PCgroup.extend({},s);s=pc.eventTarget(s);var r=s.target,n=s.relatedTarget;if(!p(o,n)&&o!=n){j.apply(l,[s,q])}}};g.fn=j;j[b]=g;var i=c++;g[d]=i;h[k][i]=g;if(l.attachEvent){l.attachEvent("on"+k,g)}else{if(k=="mouseenter"){l.addEventListener("mouseover",m,false)}else{if(k=="mouseleave"){l.addEventListener("mouseout",m,false)}else{l.addEventListener(k,g,false)}}}},removeEvent:function(l,k,j){var g=e.getData(l,b);if(!k&&!j){var i=e.getEvent(l);if(i){pc.each(i,function(m,n){e.removeEvent(l,n)})}}if(!j){var i=e.getEvent(l,k);if(i){pc.each(i,function(m){e.removeEvent(l,k,m.fn)})}return}var h=j[b][d];j=g[k][h];if(l.detachEvent){l.detachEvent("on"+k,j)}else{l.removeEventListener(k,j,false)}delete g[k][h]},getEvent:function(k,j,l){var i={},g,h=false;if(!e.getData(k,b)){e.setData(k,b,{})}g=e.getData(k,b);if(g){e.each(g,function(n,m){if(j&&j!=m){return true}i[m]=i[m]||[];e.each(n,function(o){h=true;i[m].push(o)})})}return h?(j?i[j]:i):null},cloneEvent:function(j,i,h){var g=e.getEvent(j,h);if(g){if(h){pc.each(g,function(k){pc.addEvent(i,h,k.fn)})}else{pc.each(g,function(k,l){pc.each(k,function(m){pc.addEvent(i,l,m.fn)})})}}},eventTarget:function(i){if(!i.target){i.target=i.srcElement||document}if(i.target.nodeType===3){i.target=i.target.parentNode}if(!i.relatedTarget&&i.fromElement){i.relatedTarget=(i.fromElement===i.target)?i.toElement:i.fromElement}if(i.which===f){i.which=(i.charCode!==f)?i.charCode:i.keyCode}if(i.pageX==null&&i.clientX!=null){var h=document.documentElement,g=document.body;i.pageX=i.clientX+(h&&h.scrollLeft||g&&g.scrollLeft||0)-(h&&h.clientLeft||g&&g.clientLeft||0);i.pageY=i.clientY+(h&&h.scrollTop||g&&g.scrollTop||0)-(h&&h.clientTop||g&&g.clientTop||0)}if(!i.preventDefault){i.preventDefault=function(){i.returnValue=false}}if(!i.stopPropagation){i.stopPropagation=function(j){i.cancelBubble=true}}return i}});PCgroup.dom.extend(PCgroup,["addEvent","removeEvent","getEvent","cloneEvent"])})(PCgroup);(function(a,b){a.add({timers:{},stopTimer:function(){a.each(this.timers,function(c){c.stop()})},startTimer:function(){a.each(this.timers,function(c){c.start()})},pauseTimer:function(){a.each(this.timers,function(c){c.pause()})},addTimer:function(g,e,h,f){var d=this,f=f||[],c={fn:g,repeatCount:0,start:function(){if(h!==b&&this.run===false){this.startTime+=d.now()-this.restTime}else{this.startTime=d.now()}this.run=true},pause:function(){if(this.run!=false&&h!==b){this.restTime=d.now()}this.run=false},stop:function(){window.clearInterval(this.id);delete d.timers[this.id]},__init:function(){c.id=window.setInterval(function(){if(c.run===false){return}g.apply(c,f);c.repeatCount++;if(h){var i=d.now()-c.startTime;if(i>h){c.oncomplete&&c.oncomplete();
c.stop()}}},e);c.start();d.timers[c.id]=c}};c.__init();return c},now:function(){return new Date().getTime()}})})(PCgroup);(function(d,g){var f=document,c=encodeURIComponent,e=decodeURIComponent;var a={get:function(j){var i,h;if(b(j)){if((h=f.cookie.match("(?:^| )"+j+"(?:(?:=([^;]*))|;|$)"))){i=h[1]?e(h[1]):""}}return i},set:function(j,o,h,k,m,l){var n=c(o),i=h;if(typeof i==="number"){i=new Date();i.setTime(i.getTime()+h*86400000)}if(i instanceof Date){n+="; expires="+i.toUTCString()}if(b(k)){n+="; domain="+k}if(b(m)){n+="; path="+m}if(l){n+="; secure"}f.cookie=j+"="+n},remove:function(h,i,k,j){d.setCookie(h,"",0,i,k,j)}};d.add({cookie:a,getCookie:a.get,setCookie:a.set,removeCookie:a.remove});function b(h){return d.isString(h)&&h!==""}})(PCgroup);(function(c,h){var g=Array.prototype.slice,f=Object.prototype.toString,d=function(i,j,l,k){this.elem=i;this.duration=j;this.easing=l;this.callback=function(){var m=c.getData(i,"timers");if(c.isArray(m)&&m.length>0){m.shift()}k&&k.call(this);c.dequeue(i)};this.clips=[]},b=function(l,m,i,j,k){this.elem=l;this.start=m;this.end=i;this.name=j;this.unit=k};var e={visibility:"hidden",display:"block"};var a=function(j,l,k){var i;if(c.isNumber(j)&&c.isFunction(l)){k=l;l=i}else{if(c.isString(j)){if(c.isFunction(l)){k=l}l=j;j=i}else{if(c.isFunction(j)){k=j;j=i;l=i}}}return{duration:j,easing:l,callback:k}};c.add({animate:function(l,j,m,s,t,o){var k=arguments,u=[],r,q;for(var n=2;n<k.length;n++){if(c.isNumber(k[n])){r=k[n]}if(c.isString(k[n])){q=k[n]}if(c.isFunction(k[n])){u.push(k[n])}}t=u[0];o=u[1];m=r||1000;s=q||"swing";c.queue(l,function(){if(o&&c.isFunction(o)){if(o()===false){c.dequeue(l);return}}var i=new d(l,m,s,t);c.each(j,function(A,C){var y=A.toString().match(/^([+-]=)?([\d+-.]+)(.*)$/);if(y){var p,z=C.toLowerCase();if(z=="scrollleft"||z=="scrolltop"){p=true}var x=parseFloat(y[2]),B=y[3],v=p?l[C]:parseFloat(c.getStyle(l,C));if(!B){if(C.search(/opacity/i)==-1){B="px"}}var w=new b(l,v,x,C,B);w.nonStyle=p;i.clips.push(w);lastProp=C}});i.init()});return l},easing:{linear:function(k,l,i,j){return i+j*k},swing:function(k,l,i,j){return((-Math.cos(k*Math.PI)/2)+0.5)*j+i},quadIn:function(k,l,i,j){return k*k*j+i},quadOut:function(k,l,i,j){return -k*k*j+2*k*j+i},cubicIn:function(k,l,i,j){return k*k*k*j+i},cubicOut:function(k,l,i,j){return j*((k-=1)*k*k+1)+i},easeOutBounce:function(k,l,i,j){if(k<(1/2.75)){return j*7.5625*k*k+i}else{if(k<(2/2.75)){return j*(7.5625*(k-=(1.5/2.75))*k+0.75)+i}else{if(k<(2.5/2.75)){return j*(7.5625*(k-=(2.25/2.75))*k+0.9375)+i}else{return j*(7.5625*(k-=(2.625/2.75))*k+0.984375)+i}}}}},queue:function(j,k){var i=c.getData(j,"queue");if(c.isArray(i)){i.push(k)}else{i=[k];c.setData(j,"queue",i)}if(i[0]!=="inprogress"){this.dequeue(j)}return i},dequeue:function(l){var j=this;var i=c.getData(l,"queue"),k=i&&i.shift();if(k==="inprogress"){k=i.shift()}if(k){i.unshift("inprogress");k.call(l,function(){j.dequeue(l)})}},pause:function(i){var j=c.getData(i,"timers");if(c.isArray(j)&&j[0]){j[0].pause()}},begin:function(i){var j=c.getData(i,"timers");if(c.isArray(j)&&j[0]){j[0].start()}},end:function(i){c.setData(i,"queue",[]);var j=c.getData(i,"timers");if(c.isArray(j)&&j[0]){j[0].stop()}c.removeData(i,"timers")},fadeTo:function(j,i,k,l){c.animate(j,{opacity:i},k,"linear",l)},show:function(i,j,k){c.setStyle(i,"display","block");if(!j||!c.isNumber(j)){return}c.fadeTo(i,1,j,k)},hide:function(i,j,k){if(!j||!c.isNumber(j)){c.setStyle(i,"display","none");return}c.fadeTo(i,0,j,function(){c.setStyle(i,"display","none");k&&k.call(i)})},slideUp:function(k,l,o,n){var i;var j=a(l,o,n);l=j.duration;o=j.easing;n=j.callback;c.animate(k,{height:0},l,o,function(){c.setStyle(k,{display:"none",height:i});c.setStyle(k,"overflow","visible");if(n&&c.isFunction(n)){n.call(k)}},m);function m(){if(c.getStyle(k,"display")=="none"){return false}i=c.getStyle(k,"height");c.setStyle(k,"overflow","hidden")}},slideDown:function(i,j,l,n){if(c.getStyle(i,"display")!="none"){return}var p=a(j,l,n);j=p.duration;l=p.easing;n=p.callback;var o,q={height:0,overflow:"hidden"},k={},m={overflow:c.getStyle(i,"overflow")};c.each(e,function(s,r){k[r]=c.getStyle(i,r)});c.setStyle(i,e);o=c.getStyle(i,"height");c.setStyle(i,k);c.setStyle(i,q);c.setStyle(i,"display","block");c.animate(i,{height:o},j,l,function(){c.setStyle(i,m);if(n&&c.isFunction(n)){n.call(i)}})}});d.prototype={init:function(){var i=this;i.timer=c.addTimer(function(k){var m=c.now()-this.startTime,l=m/i.duration;c.each(i.clips,function(o,n){var p=c.easing[i.easing](l,m,0,1);o.pos=o.start+((o.end-o.start)*p)});i.update()},13,i.duration);i.timer.oncomplete=function(){c.each(i.clips,function(k){k.pos=k.end});i.update();i.callback.call(i.elem)};var j=c.getData(i.elem,"timers");if(c.isArray(j)){j.push(i.timer)}else{c.setData(i.elem,"timers",[i.timer])}},update:function(){c.each(this.clips,function(i){if(i.nonStyle){i.elem[i.name]=i.pos}else{c.setStyle(i.elem,i.name,i.pos+i.unit)}})}};PCgroup.dom.extend(PCgroup,["animate","show","hide","slideUp","slideDown","fadeTo","begin","pause","end"])
})(PCgroup);pc.add("tab",function(b){var a=function(c){this.config=pc.extend(c,a.config,false);this.init()};a.config={effect:"base",isIpad:typeof(window.ontouchstart)!=="undefined",direction:"x",autoPlay:false,playTo:0,type:"mouseover",curClass:"current",link:false,stay:2000,delay:200,lazy:false,merge:false,animateTime:300,easing:"swing",oninit:function(){},onchange:function(){}};a.prototype={init:function(){var e=this,k=e.config;if(!k.target.length||k.target.length<=1){return}e.target=k.target;e.length=k.target.length;e.effect=a.effect[k.effect];e.wrap=k.target[0].parentNode;if(/(:?ul|ol|dl)/i.test(e.wrap.tagName)){e.content=e.wrap;e.wrap=e.wrap.parentNode}else{var j=pc.create("div",{className:"tabContent"});pc.each(k.target,function(c){j.appendChild(c)});e.content=e.wrap.appendChild(j)}if(k.control!==false){k.control=k.control||pc.getElems(".control",e.wrap);if(!k.control||k.control.length<1){var g=pc.create("ul",{className:"control"}),h="";for(var f=0;f<e.length;f++){h+='<li><a href="#">'+(f+1)+"</a></li>"}g.innerHTML=h;g=e.wrap.appendChild(g);k.control=pc.childElems(g)}var d=[];pc.each(k.control,function(l,c){if(pc.hasClass(l,"next")){e.nextBtn=l}else{if(pc.hasClass(l,"prev")){e.prevBtn=l}else{d.push(l)}}});e.control=d}if(k.nextBtn){e.nextBtn=k.nextBtn}if(k.prevBtn){e.prevBtn=k.prevBtn}k.oninit.call(e);if(e.effect){e.effect.oninit.call(e)}e.playTo(k.playTo);if(k.autoPlay){e.play()}e.attach()},attach:function(){var f=this,h=f.config;if(h.autoPlay){var e=[f.wrap],d=f.control&&f.control[0].parentNode;if(d){e.push(d)}pc.each(e,function(c){pc.addEvent(c,"mouseover",function(i){f.stop()});pc.addEvent(c,"mouseout",function(i){f.play()})})}if(h.effect==="slide"&&h.isIpad){pc.each(f.target,function(c){c.addEventListener("touchstart",function(i){f.stop();f.iPadDistance=(h.direction==="x"?i.touches[0].pageX:i.touches[0].pageY);f.srcScrollNum=f.contentWrap[f.prop]},false);c.addEventListener("touchmove",function(j){f.iPadLastDistance=(h.direction==="x"?j.touches[0].pageX:j.touches[0].pageY);var i=f.iPadLastDistance-f.iPadDistance;f.contentWrap[f.prop]=f.srcScrollNum-i;j.preventDefault()},false);c.addEventListener("touchend",function(k){if(f.iPadLastDistance===undefined){return}var l=f.iPadLastDistance-f.iPadDistance>0?false:true;var i=f.curPage===0,j=f.curPage===f.length-1;if(l&&(f.config.merge||!j)){f.next()}else{if(!l&&(f.config.merge||!i)){f.prev()}}f.play();k.preventDefault();f.iPadLastDistance=undefined},false)})}var g=h.type=="mouseover";if(h.control){pc.each(f.control,function(j,c){pc.addEvent(j,h.type,function(){var i=g?h.delay:0;if(f.delayTimer){window.clearTimeout(f.delayTimer)}f.delayTimer=window.setTimeout(function(){f.playTo(c)},i)});if(g){pc.addEvent(j,"mouseout",function(){if(f.delayTimer){window.clearTimeout(f.delayTimer)}});pc.addEvent(j,"click",function(){f.playTo(c)})}if(!f.config.link){pc.addEvent(j,"click",function(i){i.preventDefault()})}})}if(f.nextBtn){pc.addEvent(f.nextBtn,"click",function(c){f.next();c.preventDefault()})}if(f.prevBtn){pc.addEvent(f.prevBtn,"click",function(c){f.prev();c.preventDefault()})}},playTo:function(j){var m=this,k=m.config,h=m.curPage!==window.undefined,i;if(h&&m.curPage===j){return}m.prevPage=m.curPage;if(k.effect=="slide"&&k.merge){i=g(m.curPage);m.curPage=j;j=g(j)}else{i=m.curPage;j=m.curPage=g(j)}if(m.control&&j!==i){var d=m.control[j],l=m.control[i];if(d){pc.addClass(d,m.config.curClass)}if(l){pc.removeClass(l,m.config.curClass)}}if(k.lazy){var e=m.curPage;if(k.merge&&e<0){e=m.target.length-1}var f=m.target[e];if(f&&!f.parsed){m._lazyload(f)}}if(m.effect){m.effect.onchange.call(m)}m.config.onchange.call(m,j);function g(n){if(n>=m.length){n%=m.length}if(n<0){var c=n%m.length;n=c===0?0:(c+m.length)}return n}},next:function(){this.playTo(this.curPage+1)},prev:function(){this.playTo(this.curPage-1)},play:function(){var d=this,e=d.config;if(d.timer){d.stop()}d.timer=window.setInterval(function(){var c=d.curPage+1;d.playTo(c)},e.stay)},stop:function(){window.clearInterval(this.timer)},_lazyload:function(d){var c=pc.getElem("textarea",d);if(c){d.innerHTML=c.value;d.parsed=true}}};a.effect={};return a}(pc));pc.extend(pc.tab.effect,{base:{oninit:function(){var a=this,b=a.config;pc.each(a.target,function(c){if(a.target[b.playTo]!=c){pc.setStyle(c,"display","none")}})},onchange:function(){var b=this,a=b.prevPage===window.undefined?null:b.target[b.prevPage],c=b.target[b.curPage];if(a){pc.setStyle(a,"display","none")}pc.setStyle(c,"display","block")}},fade:{oninit:function(){var a=this,b=a.config;pc.setStyle(a.content,"position","relative");pc.each(a.target,function(d,c){pc.setData(d,"index",c);pc.setStyle(d,{opacity:0,position:"absolute",zIndex:c})})},onchange:function(){var b=this,a=b.prevPage===window.undefined?null:b.target[b.prevPage],c=b.target[b.curPage];if(a){pc.setStyle(a,"zIndex",pc.getData(c,"index"))}pc.setStyle(c,"zIndex",b.length);pc.setStyle(c,"opacity",0);pc.show(c,b.config.animateTime,function(){pc.each(b.target,function(d){if(d!=c){pc.setStyle(d,"opacity",0)
}})});if(a){pc.hide(a,b.config.animateTime)}pc.each(b.target,function(d){if(d!=c){pc.end(d)}})}},slide:{oninit:function(){var a=this,g=a.config;var f=a.target[g.playTo];var e=pc.create("div",{className:"contentWrap"});pc.setStyle(e,{overflow:"hidden",position:"relative"});e.appendChild(a.content);a.contentWrap=a.wrap.appendChild(e);pc.setStyle(a.wrap,"overflow","hidden");if(pc.browser.ie){pc.setStyle(a.contentWrap,"zoom","1")}var b=function(c){return parseFloat(pc.getStyle(f,c))||0};if(g.direction=="x"){a.prop="scrollLeft";a.boxProp="width";a.step=g.width||f.offsetWidth+b("marginLeft")+b("marginRight")}else{a.prop="scrollTop";a.boxProp="height";a.step=g.height||f.offsetHeight+b("marginTop")+b("marginBottom")}pc.setStyle(a.contentWrap,a.boxProp,"100%");a.showNum=Math.floor(parseFloat(pc.getStyle(a.wrap,a.boxProp))/a.step);if(g.merge){a.showNum=Math.ceil(parseFloat(pc.getStyle(a.wrap,a.boxProp))/a.step);var d=[];pc.each(a.target,function(c){var h=c.cloneNode(true);h=a.content.appendChild(h);pc.cloneEvent(c,h);d.push(h)});a.target=g.target.concat(d);a.plus=0}if(g.direction=="x"){pc.setStyle(a.content,"width",(g.totalWidth||a.step*a.target.length)+"px");pc.each(a.target,function(c){pc.setStyle(c,"float","left")})}},onchange:function(){var m=this,h=m.config,k=m.prevPage===window.undefined?0:m.prevPage,l=m.curPage,j;merge:if(h.merge){var g=l-k,f=Math.abs(g);if(m.realCurPage===undefined){m.realCurPage=l;m.realPrevPage=k}if(g===0){break merge}if(g<0){if(l>m.showNum&&m.realCurPage>0){m.realPrevPage=m.realCurPage;m.realCurPage--}else{m.realPrevPage=1;m.realCurPage=0}if(l>=m.plus){break merge}for(var e=0;e<f;e++){var b=m.target.pop();pc.prependChild(m.content,b);m.target.unshift(b)}}else{if(g>0){if(l<=m.target.length+m.plus-m.showNum){var d=m.realCurPage;m.realCurPage=m.plus==0?l:m.realCurPage+1;m.realPrevPage=d;break merge}m.realCurPage=m.target.length-m.showNum;m.realPrevPage=m.realCurPage-1;for(var e=0;e<f;e++){var b=m.target.shift();m.content.appendChild(b);m.target.push(b)}}}m.plus+=g;m.contentWrap[m.prop]-=g*m.step}if(h.merge){j=(l-m.plus)*m.step}else{if(l+m.showNum>m.length){l=m.length-m.showNum}j=l*m.step}var a={};a[m.prop]=j;pc.end(m.contentWrap);pc.animate(m.contentWrap,a,m.config.animateTime,m.config.easing);if(h.merge){pc.each(m.target,function(c){pc.removeClass(c,h.curClass)});pc.addClass(m.target[m.realCurPage],h.curClass)}}}});var focus=pc.tab.focus=function(a){return new pc.tab(pc.merge(focus.config,a))};focus.prototype=pc.tab.prototype;focus.config={autoPlay:true,effect:"fade"};var marquee=pc.tab.marquee=function(a){return new pc.tab(pc.merge(marquee.config,a))};marquee.prototype=pc.tab.prototype;marquee.config={effect:"slide",easing:"linear",merge:"true",control:false,direction:"y",autoPlay:true};var tabScroll=pc.tab.scroll=function(a){return new pc.tab(pc.merge(tabScroll.config,a))};tabScroll.prototype=pc.tab.prototype;tabScroll.config={effect:"slide",merge:"true",control:false};(function(e,c){var f=function(){var p=[function(){return new XMLHttpRequest()},function(){return new ActiveXObject("Msxml2.XMLHTTP.5.0")},function(){return new ActiveXObject("Msxml2.XMLHTTP")},function(){return new ActiveXObject("Microsoft.XMLHTTP")}];for(var o=0,r=p.length;o<r;o++){try{p[o]();f=p[o];break}catch(q){}}return f()};var g=window,l=function(){},d={type:"get",contentType:"application/x-www-form-urlencoded; charset=UTF-8",async:true,xhr:f,jsonp:"callback",accepts:{xml:"application/xml, text/xml",html:"text/html",script:"text/javascript, application/javascript",json:"application/json, text/javascript",text:"text/plain",_default:"*/*"},headers:{"X-Requested-With":"XMLHttpRequest"}};var j=/^(?:GET|HEAD)$/;var i=function(o){var r="success",t,x=(o.type||d.type).toUpperCase(),u;var y=!j.test(x)||o.contentType;var w=e.extend(o,d,false);w.headers=e.merge(d.headers,o.headers);if(!w.url){return}if(w.data){if(e.isString(w.data)){if(x==="GET"){w.url=m(w.url,w.data)}}else{if(x==="GET"){for(var n in w.data){if(w.data.hasOwnProperty(n)){w.url=m(w.url,n+"="+w.data[n])}}}else{w.data=a(w.data)}}}if(w.dataType==="scriptp"){var q=w.jsonpCallback||"pcgroup"+encodeURIComponent(w.url).replace(/[^\w\$]/g,"");if(w.fresh===true){q+=new Date().getTime()}w.url=m(w.url,w.jsonp+"="+q);g[q]=g[q]||function(A){h(["success","complete"],A,r,z,w)};e.need(w.url,function(){});return}if(w.dataType==="script"){u=e.getScript(w.url,function(){h(["success","complete"],"",r,z,w)});return u}var p=false,z=w.xhr();z.open(x,w.url,w.async);try{if(y){z.setRequestHeader("Content-Type",w.contentType)}z.setRequestHeader("Accept",w.dataType&&w.accepts[w.dataType]?w.accepts[w.dataType]+", */*; q=0.01":w.accepts._default);if(w.headers){for(var s in w.headers){if(w.headers.hasOwnProperty(s)){z.setRequestHeader(s,w.headers[s])}}}}catch(v){}z.onreadystatechange=function(A){if(!z||z.readyState===0||A==="abort"){if(!p){h("complete",null,"error",z,w)}p=true;if(z){z.onreadystatechange=l}}else{if(!p&&z&&(z.readyState===4||A==="timeout")){p=true;z.onreadystatechange=l;r=(A==="timeout")?"timeout":k(z)?"success":"error";
try{t=b(z,w.dataType)}catch(B){r="error";t="parseError"}h([r==="success"?"success":"error","complete"],t,r,z,w);if(A==="timeout"){z.abort()}if(w.async){z=null}}}};try{z.send(x==="POST"?w.data:null)}catch(v){h(["error","complete"],t,"error",z,w)}if(!w.async){h("complete",t,r,z,w)}return z};function k(o){try{return o.status>=200&&o.status<300||o.status===304||o.status===1223}catch(n){}return false}function m(n,o){return n+(n.indexOf("?")===-1?"?":"&")+o}function a(o){var n=[];for(var p in o){if(o.hasOwnProperty(p)){n.push(p+"="+o[p])}}return n.join("&")}function h(o,p,n,q,r){if(e.isArray(o)){e.each(o,function(s){h(s,p,n,q,r)})}else{if(n===o&&r[o]){r[o].call(r.context,p,n,q)}}}function b(v,s){var q="",p,o=v;var n=/^[\],:{}\s]*$/,t=/(?:^|:|,)(?:\s*\[)+/g,r=/\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,u=/"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g;if(!e.isString(o)){q=v.getResponseHeader("Content-Type")||"";p=s==="xml"||!s&&q.indexOf("xml")>=0;o=p?v.responseXML:v.responseText;if(p&&o.documentElement.nodeName==="parsererror"){throw"parsererror"}if(s==="json"){if(window.JSON&&typeof window.JSON.parse==="function"){o=window.JSON.parse(o)}else{o=e.trim(o);if(o){if(n.test(o.replace(r,"@").replace(u,"]").replace(t,""))){o=(new Function("return "+o))()}else{throw"parsererror"}}}}}return o}e.add({ajax:i,get:function(o,p,n){return PCgroup.ajax({type:"GET",url:o,success:function(q,s,r){p&&p.call(this,q,s,r)},dataType:n})},post:function(o,p,q,n){if(e.isFunction(p)){n=q;q=p;p=c}return PCgroup.ajax({type:"POST",data:p,url:o,success:function(r,t,s){q&&q.call(this,r,t,s)},dataType:n})},load:function(n,o){return PCgroup.ajax({url:n,fresh:false,success:function(p,r,q){o&&o.call(this,p,r,q)},dataType:"scriptp"})}})})(PCgroup);