<script setup lang="ts">
import AppHero from '@/components/AppHero.vue'
import NewItem from '@/components/NewItem.vue'
import AppCard from '@/components/AppCard.vue'

import { storeToRefs } from 'pinia'

const heroSubtitle = 'Munch squad - сохрани впечатления о ресторанах в одном месте'
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
        <new-item></new-item>
      </aside>
    </div>
  </div>
</template>
