import Vue from 'vue'
import Router from 'vue-router'
import store from './store.js'
import * as views from '../components/views'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/home',
      alias: '/',
      component: views.VViewHome,
      meta: {
        profiles: [
          'guest',
          'user'
        ]
      }
    },
    {
      path: '/dashboard',
      alias: '/',
      component: views.VViewDashboard,
      meta: {
        profiles: [
          'user'
        ]
      }
    },
    {
      path: '/login',
      component: views.VViewLogin,
      meta: {
        profiles: [
          'guest'
        ]
      }
    },
    {
      path: '/search',
      component: views.VViewSearch,
      meta: {
        profiles: [
          'guest',
          'user'
        ]
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  let { user, profile } = store.getters
  let permission = (to.meta.profiles.indexOf(profile) > -1)

  if (user !== undefined && !permission)
    return next((profile === 'guest') ? '/login' : '/dashboard')

  next()
})

export default router
