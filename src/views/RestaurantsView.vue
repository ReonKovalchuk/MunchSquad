<script setup lang="ts">
import AppHero from '@/components/AppHero.vue'
import NewRestaurant from '@/components/NewRestaurant.vue'
import AppCard from '@/components/AppCard.vue'
import { useRestaurantsStore } from '@/stores/restaurants'
import { storeToRefs } from 'pinia'

const restaurantsStore = useRestaurantsStore()
const { restaurants } = storeToRefs(restaurantsStore)

const heroSubtitle = 'Munch squad - сохрани впечатления о ресторанах в одном месте'
const remove = (id: string) => {
  restaurantsStore.removeRestaurant(id)
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
