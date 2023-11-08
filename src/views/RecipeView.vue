<script setup lang="ts">
import AppHero from '@/components/AppHero.vue'
import { ref } from 'vue'
import { findRecipeById } from '@/stores/recipesData'
import { useRoute } from 'vue-router'
import type { Recipe } from '@/types/types'
import NewRecipe from '@/components/NewRecipe.vue'

const route = useRoute()

const currentRecipe = ref<Recipe>(await findRecipeById(route.params.id.toString()))

const heroSubtitle = 'Munch squad поможет сохранить любимые рецепты'
</script>

<template>
  <main>
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
  </main>
</template>
