(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/cateDetaile/cateDetaile","common/main"],{"0bdd":function(e,t,a){"use strict";a.r(t);var n=a("e421"),o=a.n(n);for(var i in n)"default"!==i&&function(e){a.d(t,e,function(){return n[e]})}(i);t["default"]=o.a},"0c24":function(e,t,a){"use strict";a.r(t);var n=a("ca74"),o=a("0bdd");for(var i in o)"default"!==i&&function(e){a.d(t,e,function(){return o[e]})}(i);a("f2f8");var c=a("2877"),l=Object(c["a"])(o["default"],n["a"],n["b"],!1,null,null,null);t["default"]=l.exports},"48be":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=wx.getUpdateManager(),o={globalData:{text:"text"},onLaunch:function(e){var t=this;wx.getStorageSync("logs");1007==e.scene||1008==e.scene?this.$options.globalData.share=!0:this.$options.globalData.share=!1,wx.getSystemInfo({success:function(e){-1!=e.model.search("iPhone X")?t.$options.globalData.isIphoneX=!0:t.$options.globalData.isIphoneX=!1,t.$options.globalData.height=e.statusBarHeight},fail:function(e){console.log(e," at App.vue:30")}}),wx.canIUse("getUpdateManager")&&(n.onCheckForUpdate(function(e){console.log(e.hasUpdate," at App.vue:37")}),n.onUpdateReady(function(){wx.showModal({title:"更新提示",content:"新版本已经准备好，是否重启应用？",success:function(e){if(e.confirm)n.applyUpdate();else if(e.cancel)return!1}})}),n.onUpdateFailed(function(){wx.hideLoading(),wx.showModal({title:"升级失败",content:"新版本下载失败，请检查网络！",showCancel:!1})}))},loadingShow:function(){wx.showLoading({title:"加载中"})},hideLoading:function(){wx.hideLoading()},onShow:function(){console.log("App Show"," at App.vue:73")},onHide:function(){console.log("App Hide"," at App.vue:76")}};t.default=o},"60a1":function(e,t,a){"use strict";a.r(t);var n=a("48be"),o=a.n(n);for(var i in n)"default"!==i&&function(e){a.d(t,e,function(){return n[e]})}(i);t["default"]=o.a},"6b1c":function(e,t,a){},bdc7:function(e,t,a){"use strict";a.r(t);var n=a("60a1");for(var o in n)"default"!==o&&function(e){a.d(t,e,function(){return n[e]})}(o);a("e5f9");var i,c,l=a("2877"),u=Object(l["a"])(n["default"],i,c,!1,null,null,null);t["default"]=u.exports},ca74:function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement;e._self._c},o=[];a.d(t,"a",function(){return n}),a.d(t,"b",function(){return o})},e421:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=o(a("bdc7"));function o(e){return e&&e.__esModule?e:{default:e}}var i={data:function(){return{id:"",height:"",nvabarData:{showCapsule:1,title:""},detaileObj:{},writePosition:[80,90],writesize:[0,0],window:[0,0],write:[0,0],scrolltop:0}},methods:{loadList:function(){var e=this,t=this,a=new Object;a.is_weapp=1,a.weapp_src="xcf",a.id=t.id,n.default.loadingShow(),this.$Api.getCatedetaile(a).then(function(t){console.log(t," at pages\\cateDetaile\\cateDetaile.vue:74"),n.default.hideLoading(),e.detaileObj=t.data.content.recipe,e.nvabarData.title=t.data.content.recipe.name})},addCollect:function(){var e=this,t=!0,a=e.detaileObj,n=wx.getStorageSync("CollectList")||[],o={name:a.name,id:a.id,image:a.photo};n.forEach(function(e){console.log(e.name.indexOf(o.name)," at pages\\cateDetaile\\cateDetaile.vue:91"),t=!(e.name.indexOf(o.name)>-1)}),t?(n.push(o),wx.showToast({icon:"success",title:"添加成功"})):wx.showToast({icon:"none",title:"不可重复添加"}),wx.setStorageSync("CollectList",n),console.log(n," at pages\\cateDetaile\\cateDetaile.vue:112")},getSysdata:function(){}},onShow:function(){},onLoad:function(e){console.log(e," at pages\\cateDetaile\\cateDetaile.vue:149");var t=this;t.id=e.id,t.height=2*n.default.globalData.height+20,t.loadList()}};t.default=i},e5f9:function(e,t,a){"use strict";var n=a("e8d7"),o=a.n(n);o.a},e8d7:function(e,t,a){},f2f8:function(e,t,a){"use strict";var n=a("6b1c"),o=a.n(n);o.a}},[["7105","common/runtime","common/vendor"]]]);