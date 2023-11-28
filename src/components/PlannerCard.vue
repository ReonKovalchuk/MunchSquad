<script setup lang="ts">
import AppCard from '@/components/AppCard.vue'
import { ref, watch } from 'vue'

import AppSearch from './AppSearch.vue'
import { usePlannerStore } from '@/stores/planner'
import { useRecipesStore } from '@/stores/recipes'
import { useRestaurantsStore } from '@/stores/restaurants'
import type { Recipe, Restaurant } from '@/types/types'
import { storeToRefs } from 'pinia'
import { useUserInfoStore } from '@/stores/userInfo'

const plannerStore = usePlannerStore()
const recipesStore = useRecipesStore()
const restaurantsStore = useRestaurantsStore()
const userStore = useUserInfoStore()
const { userInfo } = storeToRefs(userStore)
const { loading } = storeToRefs(plannerStore)
const { title, dayId } = defineProps(['title', 'dayId'])

watch(loading, (newValue) => {
  if (!newValue) {
    plannerDay.value = getPlannerDay()
    meals.value = {
      dinner: getObject(plannerDay.value.dinnerId),
      supper: getObject(plannerDay.value.supperId)
    }
  }
})

function getPlannerDay() {
  const result = plannerStore.findPlannerDayById(dayId)

  return result ? result : { id: dayId, uid: userInfo.value.uid, supperId: '', dinnerId: '' }
}
const plannerDay = ref(getPlannerDay())
const meals = ref({
  dinner: getObject(plannerDay.value.dinnerId),
  supper: getObject(plannerDay.value.supperId)
})
function isRecipe(id: string) {
  return id.includes('rec')
}

function getObject(id: string | undefined) {
  let obj = {}
  if (id) {
    if (isRecipe(id)) {
      obj = recipesStore.findRecipeById(id)
    } else {
      obj = restaurantsStore.findRestaurantById(id)
    }
  }
  return obj
}

const edit = async (mealType: string, mealId = '' as string, meal = {} as Recipe | Restaurant) => {
  type PlannerKey = keyof typeof plannerDay.value
  const propertyMealId = (mealType + 'Id') as PlannerKey
  plannerDay.value[propertyMealId] = mealId
  await plannerStore.editPlannerDay(plannerDay.value)

  type MealsKey = keyof typeof meals.value
  const propertyMeal = mealType as MealsKey
  meals.value[propertyMeal] = meal
}
</script>

<template>
  <div class="planner__day-of-week">
    {{ title }}
  </div>
  <suspense>
    <div class="planner__meals">
      <div class="planner__meal">
        <p class="planner__title">Обед</p>

        <app-card
          v-if="plannerDay.dinnerId && meals.dinner.id"
          :object="meals.dinner"
          :remove-from-planner="true"
          :is-recipe="isRecipe(plannerDay.dinnerId)"
          @removeFromPlanner="async () => await edit('dinner')"
          :key="plannerDay.dinnerId"
        ></app-card>
        <app-search
          v-else
          @selected="async (item) => await edit('dinner', item.id, item)"
        ></app-search>
      </div>
      <div class="planner__meal">
        <p class="planner__title">Ужин</p>
        <app-card
          v-if="plannerDay.supperId && meals.supper.id"
          :object="meals.supper"
          :remove-from-planner="true"
          :is-recipe="isRecipe(plannerDay.supperId)"
          @removeFromPlanner="edit('supper')"
          :key="plannerDay.supperId"
        ></app-card>

        <app-search
          v-else
          @selected="async (item) => await edit('supper', item.id, item)"
        ></app-search>
      </div>
    </div>
  </suspense>
</template>

<style scoped></style>
