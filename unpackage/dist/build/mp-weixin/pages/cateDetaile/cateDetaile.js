(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/cateDetaile/cateDetaile"],{"0be9":function(t,e,n){"use strict";n.r(e);var o=n("788d"),a=n.n(o);for(var i in o)"default"!==i&&function(t){n.d(e,t,(function(){return o[t]}))}(i);e["default"]=a.a},4021:function(t,e,n){"use strict";var o,a=function(){var t=this,e=t.$createElement;t._self._c},i=[];n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return o}))},"41b5":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=wx.getUpdateManager(),a={globalData:{text:"text"},onLaunch:function(t){var e=this;wx.getStorageSync("logs");1007==t.scene||1008==t.scene?this.$options.globalData.share=!0:this.$options.globalData.share=!1,wx.getSystemInfo({success:function(t){-1!=t.model.search("iPhone X")?e.$options.globalData.isIphoneX=!0:e.$options.globalData.isIphoneX=!1,e.$options.globalData.height=t.statusBarHeight},fail:function(t){console.log(t)}}),wx.canIUse("getUpdateManager")&&(o.onCheckForUpdate((function(t){console.log(t.hasUpdate)})),o.onUpdateReady((function(){wx.showModal({title:"更新提示",content:"新版本已经准备好，是否重启应用？",success:function(t){if(t.confirm)o.applyUpdate();else if(t.cancel)return!1}})})),o.onUpdateFailed((function(){wx.hideLoading(),wx.showModal({title:"升级失败",content:"新版本下载失败，请检查网络！",showCancel:!1})})))},loadingShow:function(){wx.showLoading({title:"加载中"})},hideLoading:function(){wx.hideLoading()},onShow:function(){console.log("App Show")},onHide:function(){console.log("App Hide")}};e.default=a},"430f":function(t,e,n){},4650:function(t,e,n){"use strict";n.r(e);var o=n("ef62");for(var a in o)"default"!==a&&function(t){n.d(e,t,(function(){return o[t]}))}(a);n("7a8e");var i,c,l,u,s=n("f0c5"),r=Object(s["a"])(o["default"],i,c,!1,null,null,null,!1,l,u);e["default"]=r.exports},"473b":function(t,e,n){"use strict";var o=n("bee6"),a=n.n(o);a.a},"4f77":function(t,e,n){"use strict";(function(t){n("4e25");o(n("66fd"));var e=o(n("9384"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},"788d":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=a(n("4650"));function a(t){return t&&t.__esModule?t:{default:t}}var i={data:function(){return{id:"",height:"",nvabarData:{showCapsule:1,title:""},detaileObj:{},writePosition:[80,90],writesize:[0,0],window:[0,0],write:[0,0],scrolltop:0}},methods:{loadList:function(){var t=this,e=this,n=new Object;n.is_weapp=1,n.weapp_src="xcf",n.id=e.id,o.default.loadingShow(),this.$Api.getCatedetaile(n).then((function(e){console.log(e),o.default.hideLoading(),t.detaileObj=e.data.content.recipe,t.nvabarData.title=e.data.content.recipe.name}))},addCollect:function(){var t=this,e=!0,n=t.detaileObj,o=wx.getStorageSync("CollectList")||[],a={name:n.name,id:n.id,image:n.photo};o.forEach((function(t){console.log(t.name.indexOf(a.name)),e=!(t.name.indexOf(a.name)>-1)})),e?(o.push(a),wx.showToast({icon:"success",title:"添加成功"})):wx.showToast({icon:"none",title:"不可重复添加"}),wx.setStorageSync("CollectList",o),console.log(o)},getSysdata:function(){}},onShow:function(){},onLoad:function(t){console.log(t);var e=this;e.id=t.id,e.height=2*o.default.globalData.height+20,e.loadList()},onShareAppMessage:function(){return{title:detaileObj.name,path:"/pages/cateDetaile/cateDetaile"}}};e.default=i},"7a8e":function(t,e,n){"use strict";var o=n("430f"),a=n.n(o);a.a},9384:function(t,e,n){"use strict";n.r(e);var o=n("4021"),a=n("0be9");for(var i in a)"default"!==i&&function(t){n.d(e,t,(function(){return a[t]}))}(i);n("473b");var c,l=n("f0c5"),u=Object(l["a"])(a["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],c);e["default"]=u.exports},bee6:function(t,e,n){},ef62:function(t,e,n){"use strict";n.r(e);var o=n("41b5"),a=n.n(o);for(var i in o)"default"!==i&&function(t){n.d(e,t,(function(){return o[t]}))}(i);e["default"]=a.a}},[["4f77","common/runtime","common/vendor"]]]);