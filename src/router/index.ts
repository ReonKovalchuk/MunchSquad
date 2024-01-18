import { createRouter, createWebHistory } from 'vue-router'
import PlannerView from '@/views/PlannerView.vue'
import { auth } from '@/firebase/init'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: PlannerView,
      props: {
        heroSubtitle: 'Munch squad - удобный способ спланировать меню для семьи'
      },
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/recipes',
      name: 'recipes',
      component: () => import('../views/LibraryView.vue'),
      props: {
        isRecipe: true,
        heroSubtitle: 'Munch squad поможет сохранить любимые рецепты'
      },
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/restaurants',
      name: 'restaurants',
      component: () => import('../views/LibraryView.vue'),
      props: {
        isRecipe: false,
        heroSubtitle: 'Munch squad - сохрани впечатления о ресторанах в одном месте'
      },
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/recipes/:id',
      name: 'recipe',
      component: () => import('../views/ItemView.vue'),
      props: {
        isRecipe: true,
        heroSubtitle: 'Munch squad поможет сохранить любимые рецепты'
      },
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/restaurants/:id',
      name: 'restaurant',
      component: () => import('../views/ItemView.vue'),
      props: {
        isRecipe: false,
        heroSubtitle: 'Munch squad - сохрани впечатления о ресторанах в одном месте'
      },
      meta: {
        requiresAuth: true
      }
    },

    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LogInView.vue')
    },

    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/SignUpView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: () => import('../views/NotFound.vue')
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        next()
      } else {
        next('/login')
      }
    })
  } else next()
})
export default router
