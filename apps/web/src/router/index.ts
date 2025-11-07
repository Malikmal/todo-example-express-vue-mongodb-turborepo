import { createRouter, createWebHistory } from 'vue-router'
import { authClient } from '../lib/auth'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import DashboardView from '../views/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
      meta: { requiresGuest: true }
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterView,
      meta: { requiresGuest: true }
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: DashboardView,
      meta: { requiresAuth: true }
    }
  ]
})

// Navigation guards
router.beforeEach(async (to, from, next) => {
  try {
    // Get current session
    const sessionResult = await authClient.getSession()
    const isAuthenticated = !!(sessionResult?.data?.user)

    // If route requires authentication and user is not authenticated
    if (to.meta.requiresAuth && !isAuthenticated) {
      next('/login')
      return
    }

    // If route requires guest (login/register) and user is authenticated
    if (to.meta.requiresGuest && isAuthenticated) {
      next('/dashboard')
      return
    }

    next()
  } catch (error) {
    console.error('Router guard error:', error)
    // If there's an error checking auth, assume not authenticated
    if (to.meta.requiresAuth) {
      next('/login')
    } else {
      next()
    }
  }
})

export default router
