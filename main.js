import Vue from 'vue'
import App from './App'
import {
	Api
} from './API/API.js'

// 公共组件
import headerNav from "./components/headerNav.vue"
import loading from "./components/loading.vue"

Vue.config.productionTip = false
App.mpType = 'app'
Vue.prototype.$Api = Api; //定义全局变量(请求)

// 全局公共组件
Vue.component('header-nav',headerNav)
Vue.component('loading',loading)
const app = new Vue({
	...App
})
app.$mount()
