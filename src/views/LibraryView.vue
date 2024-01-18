<script setup lang="ts">
import { ref, watch, toRefs } from 'vue'
import AppHero from '@/components/AppHero.vue'
import NewItem from '@/components/NewItem.vue'
import AppCard from '@/components/AppCard.vue'
import { useRecipesStore } from '@/stores/recipes'
import { storeToRefs } from 'pinia'
import { useRestaurantsStore } from '@/stores/restaurants'
import type { Recipe } from '@/types/types'
import { compareByName } from '@/functions'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const props = defineProps(['isRecipe', 'heroSubtitle'])
const { isRecipe, heroSubtitle } = toRefs(props)
const recipesStore = useRecipesStore()
const restaurantsStore = useRestaurantsStore()
const { recipes, loadingRec } = storeToRefs(recipesStore)
const { restaurants } = storeToRefs(restaurantsStore)
const { filterRecipesbyCourse, courseOptions } = recipesStore
const recFiltered = ref<Recipe[]>(recipes.value)
const activeFilter = ref('')
watch(loadingRec, (newValue) => {
  if (!newValue) {
    recFiltered.value = recipes.value
  }
})
watch(recipes, () => {
  filterRecipes()
})
watch(restaurants, () => {
  restaurants.value.sort(compareByName)
})

function remove(id: string) {
  if (isRecipe.value) {
    toast.promise(
      recipesStore.removeRecipe(id),
      {
        pending: 'Удаляем рецепт',
        success: 'Рецепт удален',
        error: 'Не удалось удалить рецепт'
      },
      { autoClose: 1000 }
    )
  } else {
    toast.promise(
      restaurantsStore.removeRestaurant(id),
      {
        pending: 'Удаляем ресторан',
        success: 'Ресторан удален',
        error: 'Не удалось удалить ресторан'
      },
      { autoClose: 1000 }
    )
  }
}
function applyActiveFilter(course: string = '') {
  activeFilter.value = course
  filterRecipes()
}
function filterRecipes() {
  if (activeFilter.value == '') {
    recFiltered.value = recipes.value
  } else {
    recFiltered.value = filterRecipesbyCourse(activeFilter.value)
  }
  recFiltered.value.sort(compareByName)
}
function isActiveFilter(option: string = '') {
  return activeFilter.value == option
}
</script>

<template>
  <app-hero :subtitle="heroSubtitle" />
  <div class="container">
    <div v-if="isRecipe" class="tabs__container">
      <div class="tabs" style="">
        <button
          type="button"
          class="course-btn"
          :class="[isActiveFilter() ? 'active-tab' : '']"
          @click="applyActiveFilter()"
        >
          Все
        </button>
        <button
          type="button"
          class="course-btn"
          v-for="option in courseOptions"
          :key="option"
          :class="[isActiveFilter(option) ? 'active-tab' : '']"
          @click="applyActiveFilter(option)"
        >
          {{ option }}
        </button>
      </div>
      <div class="filler"></div>
    </div>
    <div class="page__wrapper">
      <div class="page__main-content">
        <!-- v-for="item in isRecipe ? recipes : restaurants" -->
        <app-card
          v-for="item in isRecipe ? recFiltered : restaurants"
          :key="item.id"
          :object="item"
          :is-recipe="isRecipe"
          @remove="remove"
        ></app-card>
      </div>
      <aside class="new-x-form">
        <new-item :is-recipe="isRecipe"></new-item>
      </aside>
    </div>
  </div>
</template>

<style>
.tabs__container {
  display: flex;
  margin-bottom: 24px;
  gap: 24px;
  padding: 12px;
}
.tabs {
  display: flex;

  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
  flex-basis: 75%;
}
.course-btn {
  font-size: 20px;
  font-weight: 500;
  padding: 6px 18px;
}
.active-tab {
  background-color: var(--primary-color);
  border-radius: var(--border-radius-primary);
}
.filler {
  flex-basis: 25%;
  flex-shrink: 0;
}
@media (max-width: 720px) {
  .tabs {
    flex-basis: 100%;
    place-content: center;
  }
  .filler {
    display: none;
  }
}
</style>
