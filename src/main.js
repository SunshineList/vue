// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
//自己写的样式
import './assets/theme.css'

// 注册element-ui
Vue.use(ElementUI);
Vue.prototype.$axios = axios;
// Vue.use(axios);
Vue.config.productionTip = false;
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

new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
});
