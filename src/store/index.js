import Vue from 'vue'
import Vuex from 'vuex'

//挂载Vuex
Vue.use(Vuex);

//创建VueX对象
const store = new Vuex.Store({
  state: {
    //存放的键值对就是所要管理的状态
    isLogin: false,
  },

  // 获取属性的状态
  getters: {
    //获取登录状态
    isLogin: state => state.isLogin,
  },

  // 设置属性状态
  mutations: {
    //保存登录状态
    userStatus(state, flag) {
      state.isLogin = flag
    },
  },

  // 应用mutations
  actions: {
    //获取登录状态
    userLogin({commit}, flag) {
      commit("userStatus", flag)
    },
  }
});
export default store
