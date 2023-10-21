<script setup>
import RecipeCard from '@/components/RecipeCard.vue'
// import { useRecipesStore } from '@/stores/recipes'
// import { storeToRefs } from 'pinia'
const props = defineProps(['day'])
// const store = useRecipesStore()
// const { recipes } = storeToRefs(store)
const recipe1 = {
  course: 'Первое',
  id: 'Sun Oct 15 2023 14:50:29 GMT+0400 (Самарское стандартное время)',
  link: 'https://1000.menu/cooking/276-sup-gorohovji-s-kopchenostyami',
  linkToImage:
    'https://static.1000.menu/res/640/img/content-v2/45/29/276/sup-gorohovji-s-kopchenostyami_1592818097_16_max.jpg',
  name: 'Суп Гороховый с копченостями'
}
</script>

<template>
  <!-- <div class="planner__card-wrapper"> -->
  <div class="planner__day-of-week">
    {{ props.day }}
  </div>
  <div class="planner__meals">
    <div class="planner__meal">
      <p class="planner__title">Обед</p>
      <recipe-card :recipe="recipe1"></recipe-card>
    </div>
    <div class="planner__meal">
      <p class="planner__title">Ужин</p>
      <recipe-card :recipe="recipe1"></recipe-card>
    </div>
  </div>
  <!-- </div> -->
</template>
