import { createRouter, createWebHistory } from 'vue-router'
import PlannerView from '@/views/PlannerView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: PlannerView
    },
    {
      path: '/recipes',
      name: 'recipes',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/LibraryView.vue'),
      props: {
        isRecipe: true,
        heroSubtitle: 'Munch squad поможет сохранить любимые рецепты'
      }
    },
    {
      path: '/restaurants',
      name: 'restaurants',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/LibraryView.vue'),
      props: {
        isRecipe: false,
        heroSubtitle: 'Munch squad - сохрани впечатления о ресторанах в одном месте'
      }
    },
    {
      path: '/recipes/:id',
      name: 'recipe',
      component: () => import('../views/ItemView.vue'),
      props: {
        isRecipe: true,
        heroSubtitle: 'Munch squad поможет сохранить любимые рецепты'
      }
    },
    {
      path: '/restaurants/:id',
      name: 'restaurant',
      component: () => import('../views/ItemView.vue'),
      props: {
        isRecipe: false,
        heroSubtitle: 'Munch squad - сохрани впечатления о ресторанах в одном месте'
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
    }
  ]
})

export default router
