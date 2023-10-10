var present = (function(t){var e=t.performance||{},n=function(){for(var t=["now","webkitNow","msNow","mozNow","oNow"];t.length;){var n=t.shift();if(n in e)return e[n].bind(e)}var r=Date.now||function(){return new Date().getTime()},i=(e.timing||{}).navigationStart||r();return function(){return r()-i}}();return n.performanceNow=e.now,n.noConflict=function(){e.now=n.performanceNow},n.conflict=function(){e.now=n},n.conflict(),n}).call(this,"undefined"!=typeof self?self:"undefined"!=typeof window?window:{});
var driftless = (function(){let t=(...t)=>present(...t),e=(...t)=>setTimeout(...t),n=(...t)=>clearTimeout(...t),r={},i=0;function s(n,i){let{atMs:f,fn:o,thresholdMs:l=1,aggression:u=1.1,customNow:c=t,customSetTimeout:a=e}=i,w=f-c(),p=w>l?a(()=>{s.apply(this,arguments)},w/u):a(()=>{o()},0);r[n]=p}function f(...t){return f.setDriftlessSpyable(...t)}function o(t){return"function"==typeof t?t:Function(t)}return f.setDriftlessSpyable=t=>{let e=i;return i+=1,s(e,t),e},{setDriftlessTimeout:function e(n,r,...i){let s=o(n);return f({atMs:t()+r,fn(...t){return s.call(this,...t,...i)}})},setDriftlessInterval:function e(n,r,...i){let l=o(n),u,c={atMs:t()+r,fn(...t){return c.atMs+=r,s(u,c),l.call(this,...t,...i)}};return u=f(c)},clearDriftless:function t(e,i={}){let{customClearTimeout:s=n}=i;s(r[e])}}})();

export { present, driftless };