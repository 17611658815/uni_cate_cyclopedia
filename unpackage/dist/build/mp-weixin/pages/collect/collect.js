(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/collect/collect"],{"1d15":function(t,e,a){},3130:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=n(a("5e3a"));function n(t){return t&&t.__esModule?t:{default:t}}var c={data:function(){return{height:"",CollectList:[],nvabarData:{showCapsule:0,title:"收藏"}}},onShow:function(){var t=wx.getStorageSync("CollectList")||[];this.height=2*i.default.globalData.height+20,this.CollectList=t},onLoad:function(){},methods:{delitem:function(t){var e=this;wx.showModal({title:"提示",content:"确认删除",success:function(a){a.confirm?(e.CollectList.splice(t,1),wx.setStorageSync("CollectList",e.CollectList),e.onShow()):a.cancel&&console.log("用户点击取消")}})},goDetaile:function(t){wx.navigateTo({url:"/pages/cateDetaile/cateDetaile?id="+t})}}};e.default=c},5358:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("view",{staticClass:"page"},[a("header-nav",{attrs:{"navbar-data":t.nvabarData,mpcomid:"a2bcd3b2-0"}}),a("view",{staticClass:"CollectList",style:"margin-top:"+t.height+"px"},[t.CollectList.length>0?a("view",{staticClass:"CollectList_Box"},t._l(t.CollectList,function(e,i){return a("view",{staticClass:"CollectList_Box_item",attrs:{eventid:"a2bcd3b2-1-"+i},on:{click:function(a){a.stopPropagation(),t.goDetaile(e.id)}}},[a("image",{staticClass:"imagesPic",attrs:{mode:"aspectFill",src:e.image}}),a("view",{staticClass:"CollectList_Box_item_title"},[a("text",{staticStyle:{"margin-left":"20rpx"}},[t._v(t._s(e.name))]),a("image",{staticClass:"del",attrs:{src:"../../static/icon/del.png",eventid:"a2bcd3b2-0-"+i},on:{click:function(e){e.stopPropagation(),t.delitem(i)}}})]),a("image",{staticClass:"sanjiao",attrs:{src:"../../static/icon/collect_sanjiao.png"}})])})):t._e(),t._m(0)])],1)},n=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("view",{staticClass:"none_box",attrs:{"wx:else":""}},[a("image",{attrs:{src:"../../static/icon/none.png"}}),a("view",[t._v("还没有收藏任何作品哦")])])}];a.d(e,"a",function(){return i}),a.d(e,"b",function(){return n})},5487:function(t,e,a){"use strict";var i=a("1d15"),n=a.n(i);n.a},"877d":function(t,e,a){"use strict";a("e5e6");var i=c(a("b0ce")),n=c(a("a0ad"));function c(t){return t&&t.__esModule?t:{default:t}}Page((0,i.default)(n.default))},a0ad:function(t,e,a){"use strict";a.r(e);var i=a("5358"),n=a("c358");for(var c in n)"default"!==c&&function(t){a.d(e,t,function(){return n[t]})}(c);a("5487");var o=a("2877"),s=Object(o["a"])(n["default"],i["a"],i["b"],!1,null,null,null);e["default"]=s.exports},c358:function(t,e,a){"use strict";a.r(e);var i=a("3130"),n=a.n(i);for(var c in i)"default"!==c&&function(t){a.d(e,t,function(){return i[t]})}(c);e["default"]=n.a}},[["877d","common/runtime","common/vendor"]]]);