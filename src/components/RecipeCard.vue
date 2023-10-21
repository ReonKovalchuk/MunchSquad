<script setup lang="ts">
import type { Recipe } from '@/types/types'

const { recipe } = defineProps<{
  recipe: Recipe
}>()
</script>

<template>
  <div class="recipe__card">
    <img :src="recipe.linkToImage" class="recipe__image" />
    <div class="recipe__content">
      <strong class="recipe__title">{{ recipe.name }}</strong>
      <a :href="recipe.link" class="recipe__link btn-primary">Рецепт</a>
    </div>
  </div>
</template>
