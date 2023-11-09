<script setup lang="ts">
import AppCard from '@/components/AppCard.vue'
import { ref } from 'vue'

import AppSearch from './AppSearch.vue'
import { findPlannerDayById, editPlannerDay } from '@/stores/plannerData'
import { findRecipeById } from '@/stores/recipesData'
import { findRestaurantById } from '@/stores/restaurantsData'
import type { PlannerDay, Recipe, Restaurant } from '@/types/types'

const { title, dayId } = defineProps(['title', 'dayId'])

// const plannerDay = ref<PlannerDay>(await findPlannerDayById(dayId))
const plannerDay = ref<PlannerDay>(await findPlannerDayById('' + dayId))
const meals = ref({
  dinner: await getObject(plannerDay.value.dinnerId),
  supper: await getObject(plannerDay.value.supperId)
})
function isRecipe(id: string) {
  return id.includes('rec')
}

async function getObject(id: string | undefined) {
  let obj = {}
  if (id) {
    if (isRecipe(id)) {
      obj = await findRecipeById(id)
    } else {
      obj = await findRestaurantById(id)
    }
  }
  return obj
}

const edit = async (mealType: string, mealId = '' as string, meal = {} as Recipe | Restaurant) => {
  type PlannerKey = keyof typeof plannerDay.value
  const propertyMealId = (mealType + 'Id') as PlannerKey
  plannerDay.value[propertyMealId] = mealId
  await editPlannerDay(plannerDay.value)

  type MealsKey = keyof typeof meals.value
  const propertyMeal = mealType as MealsKey
  meals.value[propertyMeal] = meal
}

console.log(plannerDay.value.dinnerId, plannerDay.value.supperId)
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
