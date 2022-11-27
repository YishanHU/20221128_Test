import Vue from 'vue'
import VueRouter from 'vue-router'
import Search from '../views/Search/Search.vue'
import Home from "@/views/Home/Home";
import Order from "@/views/Order/Order";
import Profile from "@/views/Profile/Profile";
import Login from "@/views/Login/Login";

Vue.use(VueRouter)

export default new VueRouter({
  routes:[
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta:{
        showFooter:true
      }
    },
    {
      path: '/order',
      name: 'order',
      component: Order,
      meta:{
        showFooter:true
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta:{
        showFooter:true
      }
    },
    {
      path: '/search',
      name: 'search',
      component: Search,
      meta:{
        showFooter:true
      }
    },
    {
      path:'/',
      redirect:'/home'
    },
    {
      path:'/login',
      name:'login',
      component:Login
    }
  ]
})
