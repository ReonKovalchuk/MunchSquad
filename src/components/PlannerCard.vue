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
import { isRecipe } from '@/functions'

const plannerStore = usePlannerStore()
const recipesStore = useRecipesStore()
const restaurantsStore = useRestaurantsStore()
const userStore = useUserInfoStore()
const { userInfo } = storeToRefs(userStore)
const { loading } = storeToRefs(plannerStore)
const { title, dayId, isToday, showBreakfast } = defineProps([
  'title',
  'dayId',
  'isToday',
  'showBreakfast'
])
console.log('day id ', dayId)

watch(loading, (newValue) => {
  if (!newValue) {
    plannerDay.value = getPlannerDay()
    meals.value = {
      breakfast: getObject(plannerDay.value.breakfastId),
      dinner: getObject(plannerDay.value.dinnerId),
      supper: getObject(plannerDay.value.supperId)
    }
  }
})

function getPlannerDay() {
  const result = plannerStore.findPlannerDayById(dayId)
  console.log('found planner day', result, 'by ID', dayId)

  return result
    ? result
    : { id: dayId, uid: userInfo.value.uid, breakfastId: '', supperId: '', dinnerId: '' }
}
const plannerDay = ref(getPlannerDay())
const meals = ref({
  breakfast: getObject(plannerDay.value.breakfastId),
  dinner: getObject(plannerDay.value.dinnerId),
  supper: getObject(plannerDay.value.supperId)
})

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
  <div class="planner__day-of-week" :class="{ today: isToday }">
    {{ title }}
  </div>

  <div class="planner__meals">
    <div v-if="showBreakfast" class="planner__meal">
      <p class="planner__title">Завтрак</p>
      <suspense>
        <app-card
          v-if="!loading && plannerDay.breakfastId && meals.breakfast.id"
          :object="meals.breakfast"
          :remove-from-planner="true"
          :is-recipe="isRecipe(plannerDay.breakfastId)"
          @removeFromPlanner="async () => await edit('breakfast')"
          :key="plannerDay.breakfastId"
        ></app-card>

        <app-search
          v-else-if="!loading"
          @selected="async (item) => await edit('breakfast', item.id, item)"
        ></app-search>
        <div v-else class="card">ГРУЗИМСЯ</div>
      </suspense>
    </div>
    <div class="planner__meal">
      <p class="planner__title">Обед</p>
      <suspense>
        <app-card
          v-if="!loading && plannerDay.dinnerId && meals.dinner.id"
          :object="meals.dinner"
          :remove-from-planner="true"
          :is-recipe="isRecipe(plannerDay.dinnerId)"
          @removeFromPlanner="async () => await edit('dinner')"
          :key="plannerDay.dinnerId"
        ></app-card>
        <app-search
          v-else-if="!loading"
          @selected="async (item) => await edit('dinner', item.id, item)"
        ></app-search>
        <div v-else class="card">ГРУЗИМСЯ</div>
      </suspense>
    </div>
    <div class="planner__meal">
      <p class="planner__title">Ужин</p>
      <suspense>
        <app-card
          v-if="!loading && plannerDay.supperId && meals.supper.id"
          :object="meals.supper"
          :remove-from-planner="true"
          :is-recipe="isRecipe(plannerDay.supperId)"
          @removeFromPlanner="edit('supper')"
          :key="plannerDay.supperId"
        ></app-card>

        <app-search
          v-else-if="!loading"
          @selected="async (item) => await edit('supper', item.id, item)"
        ></app-search>
        <div v-else class="card card-placeholder">ГРУЗИМСЯ</div>
      </suspense>
    </div>
  </div>
</template>

<style scoped>
.card {
  max-width: unset;
}
.card-placeholder {
  min-width: 200px;
  min-height: 200px;
  flex-shrink: 0;
  flex-grow: 1;
}
</style>
