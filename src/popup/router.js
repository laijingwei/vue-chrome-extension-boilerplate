import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './views/Home.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'Home', component: Home },
  {
    path: '/setting',
    name: 'Setting',
    component: () => import('./views/Setting.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('./views/About.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

export default router
