<script setup lang="ts">
import AppHero from '@/components/AppHero.vue'
import NewRecipe from '@/components/NewRecipe.vue'
import AppCard from '@/components/AppCard.vue'
import { getRecipes, removeRecipe } from '@/stores/recipesData'
import { ref } from 'vue'
import type { Recipe } from '@/types/types'

const recipes = ref<Recipe[]>(await getRecipes())
const remove = (id: string) => {
  removeRecipe(id)
  recipes.value = recipes.value.filter((rec) => {
    return rec.id !== id
  })
}
const heroSubtitle = 'Munch squad поможет сохранить любимые рецепты'
</script>

<template>
  <app-hero :subtitle="heroSubtitle" />
  <div class="container">
    <div class="page__wrapper">
      <div class="page__main-content">
        <app-card
          v-for="recipe in recipes"
          :key="recipe.id"
          :object="recipe"
          :is-recipe="true"
          @remove="remove"
        ></app-card>
      </div>
      <aside class="new-x-form">
        <new-recipe></new-recipe>
      </aside>
    </div>
  </div>
</template>
