<script setup>
import AppHero from '@/components/AppHero.vue'
import NewRecipe from '@/components/NewRecipe.vue'
import AppCard from '@/components/AppCard.vue'
// import { ref, computed } from 'vue'

import { useRecipesStore } from '@/stores/recipes'
import { storeToRefs } from 'pinia'

const store = useRecipesStore()
const { recipes } = storeToRefs(store)

const heroSubtitle = 'Munch squad поможет сохранить любимые рецепты'
</script>

<template>
  <main>
    <app-hero :subtitle="heroSubtitle" />
    <div class="container">
      <div class="page__wrapper">
        <div class="page__main-content">
          <!-- <div class="card__wrapper" > -->
          <app-card v-for="recipe in recipes" :key="recipe.id" :object="recipe"></app-card>
          <!-- </div> -->
        </div>
        <aside class="new-x-form">
          <new-recipe></new-recipe>
        </aside>
      </div>
    </div>
  </main>
</template>
