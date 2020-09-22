import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  {
    path: '/',
    component: () => import('../components/Home'),
    name: 'index'
  }
]

const router = new Router({
  routes
})

export default router
