// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'

//自己写的样式
import './assets/theme.css'

// 注册element-ui
Vue.use(ElementUI);
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
Vue.filter('moment', function (value, formatString) {
  formatString = formatString || 'YYYY-MM-DD HH:mm:ss';
  return moment(value).format(formatString); // value可以是普通日期 20170723
  //return moment.unix(value).format(formatString); // 这是时间戳转时间
});

axios.defaults.headers.post['Content-Type'] = 'application/json';
//设置axios为form-data
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.transformRequest = [function (data) {
  let ret = '';
  for (let it in data) {
    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
  }
  return ret
}];

router.beforeEach((to, from, next) => {

  //获取用户登录成功后储存的登录标志
  let getFlag = localStorage.getItem("Flag");

  //如果登录标志存在且为isLogin，即用户已登录
  if (getFlag === "isLogin") {
    //设置vuex登录状态为已登录
    store.state.isLogin = true;
    next();
    //如果已登录，还想想进入登录注册界面，则定向回首页
    if (!to.meta.isLogin) {
      //iViewUi友好提示
      this.$message.error('请先退出登录');
      next({
        path: '/home'
      })
    }

    //如果登录标志不存在，即未登录
  } else {

    //用户想进入需要登录的页面，则定向回登录界面
    if (to.meta.isLogin) {
      next({
        path: '/',
      });
      this.$message.error('请先登录')
      //用户进入无需登录的界面，则跳转继续
    } else {
      next()
    }

  }

});

router.afterEach(route => {
  window.scroll(0, 0);
});

new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>',
});
