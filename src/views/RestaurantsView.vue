<script setup lang="ts">
import { ref } from 'vue'
import type { Restaurant } from '@/types/types'
import AppHero from '@/components/AppHero.vue'
import NewRestaurant from '@/components/NewRestaurant.vue'
import AppCard from '@/components/AppCard.vue'
import { getRestaurants } from '@/stores/restaurantsData'
// import { storeToRefs } from 'pinia'
import { removeRestaurant } from '@/stores/restaurantsData'

const restaurants = ref<Restaurant[]>(await getRestaurants())

const heroSubtitle = 'Munch squad - сохрани впечатления о ресторанах в одном месте'
const remove = (id: string) => {
  removeRestaurant(id)
  restaurants.value = restaurants.value.filter((res) => {
    return res.id !== id
  })
}
</script>
<template>
  <app-hero :subtitle="heroSubtitle" />
  <div class="container">
    <div class="page__wrapper">
      <div class="page__main-content">
        <app-card
          v-for="restaurant in restaurants"
          :key="restaurant.id"
          :object="restaurant"
          :is-recipe="false"
          @remove="remove"
        ></app-card>
      </div>
      <aside class="new-x-form">
        <new-restaurant></new-restaurant>
      </aside>
    </div>
  </div>
</template>
