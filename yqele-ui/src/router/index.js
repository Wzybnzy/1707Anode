import Vue from 'vue'
import VueRouter from 'vue-router'  //
import routes from './routerconfig'
Vue.use(VueRouter) // 注册了router-view,router-link  ,往原型上挂载了$router和$route


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
