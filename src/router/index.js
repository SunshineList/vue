import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login_old'
import Home from '@/components/home'
import register from "@/components/register";

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Login,
      meta: {
        isLogin: false
      }
    },
    {
      path: '/home',
      component: Home,
      meta: {
        isLogin: true
      }
    },
    {
      path: '/register',
      component: register,
      meta: {
        isLogin: false
      }
    }
  ]
})
