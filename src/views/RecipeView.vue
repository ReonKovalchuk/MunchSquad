<script setup lang="ts">
import AppHero from '@/components/AppHero.vue'
import { ref } from 'vue'
import { useRecipesStore } from '@/stores/recipes'
import { useRoute } from 'vue-router'
import type { Recipe } from '@/types/types'
import NewRecipe from '@/components/NewRecipe.vue'

const route = useRoute()

const recipesStore = useRecipesStore()

const currentRecipe = ref<Recipe>(recipesStore.findRecipeById(route.params.id.toString()))

const heroSubtitle = 'Munch squad поможет сохранить любимые рецепты'
</script>

<template>
  <app-hero :subtitle="heroSubtitle" />
  <div class="container">
    <div class="page__wrapper">
      <div class="page__main-content">
        <h2>{{ currentRecipe.name }}</h2>
      </div>
      <aside class="new-x-form">
        <new-recipe></new-recipe>
      </aside>
    </div>
  </div>
</template>
