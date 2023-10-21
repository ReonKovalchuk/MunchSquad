<script setup lang="ts">
// import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
// import 'vue3-carousel/dist/carousel.css'
// import RecipesCard from './RecipesCard.vue'
// import { useRecipesStore } from '@/stores/recipes'
// import { ref, watch } from 'vue'
// import { storeToRefs } from 'pinia'

// const store = useRecipesStore()
// const { recipes } = storeToRefs(store)
// const soups = ref(store.filterRecipesbyCourse('Первое'))

// watch(recipes, () => {
//   soups.value = store.filterRecipesbyCourse('Первое')
// })
</script>

<template>
  <!-- <h2>Суп недели</h2>
  <Carousel :itemsToShow="3.95" :wrapAround="true" :transition="500">
    <Slide v-for="recipe in soups" :key="recipe.id">
      <recipes-card :recipe="recipe"></recipes-card>
    </Slide>
    <template #addons>
      <Navigation />
      <Pagination />
    </template>
  </Carousel>
</template> -->

  <style>
    /* .carousel__item {
  height: 200px;
  width: 100%;
  background-color: teal;
} */
    .carousel__slide {
      padding: 5px;
    }

    .carousel__viewport {
      perspective: 2000px;
    }

    .carousel__track {
      transform-style: preserve-3d;
    }

    .carousel__slide--sliding {
      transition: 0.5s;
    }

    .carousel__slide {
      opacity: 0.9;
      transform: rotateY(-20deg) scale(0.9);
    }

    .carousel__slide--active ~ .carousel__slide {
      transform: rotateY(20deg) scale(0.9);
    }

    .carousel__slide--prev {
      opacity: 1;
      transform: rotateY(-10deg) scale(0.95);
    }

    .carousel__slide--next {
      opacity: 1;
      transform: rotateY(10deg) scale(0.95);
    }

    .carousel__slide--active {
      opacity: 1;
      transform: rotateY(0) scale(1.1);
    }

    .carousel__prev,
    .carousel__next {
      background-color: #808080e5;
      height: 100%;
      margin: 0;
    }

    .carousel__icon {
      fill: white;
    }
  </style>
</template>
