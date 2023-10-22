<script setup lang="ts">
import { ref } from 'vue'
import type { Restaurant } from '@/types/types'
import AppHero from '@/components/AppHero.vue'
import NewRestaurant from '@/components/NewRestaurant.vue'
import AppCard from '@/components/AppCard.vue'
import { useRestaurantsStore } from '@/stores/restaurants'
import { storeToRefs } from 'pinia'

const store = useRestaurantsStore()
const { restaurants } = storeToRefs(store)

const newRestaurant = ref<Restaurant>({})

const heroSubtitle = 'Munch squad - сохрани впечатления о ресторанах в одном месте'
</script>

<template>
  <main>
    <app-hero :subtitle="heroSubtitle" />
    <div class="container">
      <div class="page__wrapper">
        <div class="page__main-content">
          <app-card
            v-for="restaurant in restaurants"
            :key="restaurant.id"
            :object="restaurant"
          ></app-card>
        </div>
        <aside class="new-x-form">
          <new-restaurant></new-restaurant>
        </aside>
      </div>
    </div>
  </main>
</template>
