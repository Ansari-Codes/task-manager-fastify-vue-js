import { createRouter, createWebHistory } from 'vue-router'

import PageHome from '../Pages/PageHome.vue'
import PageLogin from '../Pages/PageAuth/PageLogin.vue'
import PageSignup from '../Pages/PageAuth/PageSignup.vue'

import PageDashboard from '../Pages/PageDashboard/PageDashboard.vue'

import SubPageHome from '../Pages/PageDashboard/SubPages/SubPageHome.vue'
import SubPageTasks from '../Pages/PageDashboard/SubPages/SubPageTasks.vue'
import SubPageAnalytics from '../Pages/PageDashboard/SubPages/SubPageAnalytics.vue'
import SubPageTrash from '../Pages/PageDashboard/SubPages/SubPageTrash.vue'
import SubPageSettings from '../Pages/PageDashboard/SubPages/SubPageSettings.vue'

import { checkAuth } from '../Functions/funAuth.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      name: 'home',
      component: PageHome
    },

    {
      path: '/signup',
      name: 'signup',
      component: PageSignup,
      meta: {
        guestOnly: true
      }
    },

    {
      path: '/login',
      name: 'login',
      component: PageLogin,
      meta: {
        guestOnly: true
      }
    },

    {
      path: '/dashboard',
      component: PageDashboard,
      meta: {
        requiresAuth: true
      },

      children: [
        {
          path: '',
          redirect: '/dashboard/home'
        },

        {
          path: 'home',
          name: 'dashboard-home',
          component: SubPageHome
        },

        {
          path: 'tasks',
          name: 'dashboard-tasks',
          component: SubPageTasks
        },

        {
          path: 'analytics',
          name: 'dashboard-analytics',
          component: SubPageAnalytics
        },

        {
          path: 'trash',
          name: 'dashboard-trash',
          component: SubPageTrash
        },

        {
          path: 'settings',
          name: 'dashboard-settings',
          component: SubPageSettings
        }
      ]
    }
  ]
})

router.beforeEach(async (to) => {

  const isLoggedIn = await checkAuth()

  if (to.meta.requiresAuth && !isLoggedIn) {
    return '/login'
  }

  if (to.meta.guestOnly && isLoggedIn) {
    return '/dashboard'
  }

  return true

})

export default router