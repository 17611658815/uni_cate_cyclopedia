(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/advertising/advertising"],{3389:function(t,a,e){"use strict";var n=e("641a"),i=e.n(n);i.a},5209:function(t,a,e){"use strict";e.r(a);var n=e("8db3"),i=e("9aba");for(var u in i)"default"!==u&&function(t){e.d(a,t,function(){return i[t]})}(u);e("3389");var o=e("2877"),r=Object(o["a"])(i["default"],n["a"],n["b"],!1,null,null,null);a["default"]=r.exports},"641a":function(t,a,e){},"8db3":function(t,a,e){"use strict";var n=function(){var t=this,a=t.$createElement;t._self._c},i=[];e.d(a,"a",function(){return n}),e.d(a,"b",function(){return i})},"9aba":function(t,a,e){"use strict";e.r(a);var n=e("a22c"),i=e.n(n);for(var u in n)"default"!==u&&function(t){e.d(a,t,function(){return n[t]})}(u);a["default"]=i.a},a22c:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var n=u(e("fe6d")),i=u(e("a7b1"));function u(t){return t&&t.__esModule?t:{default:t}}var o={data:function(){return{miao:5,time:"",title:"",imagePath:"",height:"",nvabarData:{showCapsule:0,title:"食典录"}}},onLoad:function(t){console.log(i.default," at pages\\advertising\\advertising.vue:34");var a=this;a.time=setInterval(function(){a.miao=a.miao-1,0==a.miao&&(clearInterval(a.time),wx.switchTab({url:"../index/index"}))},1e3)},methods:{cliadv:function(){clearInterval(this.time),wx.switchTab({url:"../index/index"})}},onShow:function(){this.imagePath=i.default[Math.floor(Math.random()*i.default.length)],this.title=n.default[Math.floor(Math.random()*n.default.length)]}};a.default=o}},[["248a","common/runtime","common/vendor"]]]);