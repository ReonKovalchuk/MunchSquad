<script setup lang="ts">
import { ref, watch } from 'vue'
import AppHero from '@/components/AppHero.vue'
import NewItem from '@/components/NewItem.vue'
import AppCard from '@/components/AppCard.vue'
import { useRecipesStore } from '@/stores/recipes'
import { storeToRefs } from 'pinia'
import { useRestaurantsStore } from '@/stores/restaurants'
import type { Recipe, Restaurant } from '@/types/types'

const { isRecipe, heroSubtitle } = defineProps(['isRecipe', 'heroSubtitle'])
const items = ref<Recipe[] | Restaurant[]>([])
const recipesStore = useRecipesStore()
const restaurantsStore = useRestaurantsStore()
const { recipes } = storeToRefs(recipesStore)
const { restaurants } = storeToRefs(restaurantsStore)
if (isRecipe) {
  const { recipes } = storeToRefs(recipesStore)
  items.value = recipes.value
} else {
  const { restaurants } = storeToRefs(restaurantsStore)
  items.value = restaurants.value
}
const remove = (id: string) => {
  if (isRecipe) {
    recipesStore.removeRecipe(id)
  } else {
    restaurantsStore.removeRestaurant(id)
  }
  items.value = items.value.filter((rec) => {
    return rec.id !== id
  })
}

// watch(isRecipe ? loadingRec : loadingRes, (newValue) => {
//   if (!newValue) {

//   }
// })
// const heroSubtitle = 'Munch squad поможет сохранить любимые рецепты'
</script>

<template>
  <app-hero :subtitle="heroSubtitle" />
  <div class="container">
    <div class="page__wrapper">
      <div class="page__main-content">
        <app-card
          v-for="item in isRecipe ? recipes : restaurants"
          :key="item.id"
          :object="item"
          :is-recipe="isRecipe"
          @remove="remove"
        ></app-card>
      </div>
      <aside class="new-x-form">
        <new-item is-recipe="true"></new-item>
      </aside>
    </div>
  </div>
</template>
