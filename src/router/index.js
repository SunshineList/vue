import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Home from '@/components/home'

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
    }
  ]
})
