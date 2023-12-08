<script setup lang="ts">
import { ref, watch } from 'vue'
import AppHero from '@/components/AppHero.vue'
import NewItem from '@/components/NewItem.vue'
import AppCard from '@/components/AppCard.vue'
import { useRecipesStore } from '@/stores/recipes'
import { storeToRefs } from 'pinia'
import { useRestaurantsStore } from '@/stores/restaurants'
import type { Recipe } from '@/types/types'

const { isRecipe, heroSubtitle } = defineProps(['isRecipe', 'heroSubtitle'])
const recFiltered = ref<Recipe[]>([])
const recipesStore = useRecipesStore()
const restaurantsStore = useRestaurantsStore()
const { recipes, loadingRec } = storeToRefs(recipesStore)
const { restaurants, loadingRes } = storeToRefs(restaurantsStore)
const { filterRecipesbyCourse, courseOptions } = recipesStore
const activeFilter = ref('Все')
watch(isRecipe ? loadingRec : loadingRes, (newValue) => {
  if (!newValue) {
    recFiltered.value = recipes.value
  }
})

if (isRecipe) {
  recFiltered.value = recipes.value
}
const remove = (id: string) => {
  if (isRecipe) {
    recipesStore.removeRecipe(id)
  } else {
    restaurantsStore.removeRestaurant(id)
  }
  recFiltered.value = recFiltered.value.filter((i) => {
    return i.id !== id
  })
}
const filterRecipes = (course: string) => {
  recFiltered.value = filterRecipesbyCourse(course)
  activeFilter.value = course
}
const clearFilters = () => {
  recFiltered.value = recipes.value
  activeFilter.value = 'Все'
}
const isActiveFilter = (option: string) => {
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
          :class="[isActiveFilter('Все') ? 'active-tab' : '']"
          @click="clearFilters"
        >
          Все
        </button>
        <button
          type="button"
          class="course-btn"
          v-for="option in courseOptions"
          :key="option"
          :class="[isActiveFilter(option) ? 'active-tab' : '']"
          @click="filterRecipes(option)"
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
