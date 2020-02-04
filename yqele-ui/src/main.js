import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


Vue.config.productionTip = false

Vue.use(ElementUI); //use 注册组件，注册的前提是组件里面有一个install方法，它会调用install方法


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
