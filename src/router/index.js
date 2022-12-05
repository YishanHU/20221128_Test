import Vue from 'vue'
import VueRouter from 'vue-router'
import Search from '../views/Search/Search.vue'
import Home from "@/views/Home/Home";
import Order from "@/views/Order/Order";
import Profile from "@/views/Profile/Profile";
import Login from "@/views/Login/Login";
import Shop from "@/views/Shops/Shop";
import ShopGoods from "@/views/Shops/ShopGoods/ShopGoods";
import ShopInfo from "@/views/Shops/ShopInfo/ShopInfo";
import ShopRatting from "@/views/Shops/ShopRatting/ShopRatting";

Vue.use(VueRouter)

export default new VueRouter({
  routes:[
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta:{
        showFooter:true//路由页面 和 路由页面的其它组件匹配，其它组件设置v-show="$route.meta.showFooter" 路由页面设置meta
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
      component:Login,
      meta:{
        showFooter:false
      }
    },
    {
      path:'/shop',
      component:Shop,
      children:[
        {
          path:'/shop/goods',
          name:'goods',
          component:ShopGoods
        },
        {
          path:'/shop/info',
          name:'info',
          component:ShopInfo
        },
        {
          path:'/shop/ratting',
          name:'ratting',
          component:ShopRatting
        },
        {
          path:'',
          redirect:'/shop/goods'
        },
      ],
    }
  ]
})
