import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios";
import {Button} from "mint-ui";
import './mock/mockServer'
axios.default.baseURL='/api'

Vue.component(Button.name,Button)//注册mitui全局组件
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
