<script setup lang="ts">
import { computed } from 'vue'
// import { storeToRefs } from 'pinia'
import AppHero from '@/components/AppHero.vue'
// import NewRecipe from '@/components/NewRecipe.vue'
import PlannerCard from '@/components/PlannerCard.vue'

import { DaysOfWeek } from '@/types/types'

// const firstDay = computed(() => {
//   const curr = new Date() // get current date
//   const first = curr.getDate() - curr.getDay() + 1 // First day is the day of the month - the day of the week
//   return new Date(curr.setDate(first))
// })

const currentWeek = computed(() => {
  const curr = new Date()
  const first = curr.getDate() - curr.getDay() + 1
  // const daysOfWeek = [new Date(curr.setDate(first))]
  // for (let index = 0; index < 7; index++) {
  //   // daysOfWeek.push
  // }
  const last = first + 6 // last day is the first day + 6

  const formatOptions: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' }
  const firstday = new Date(curr.setDate(first)).toLocaleDateString('ru-RU', formatOptions)
  const lastday = new Date(curr.setDate(last)).toLocaleDateString('ru-RU', formatOptions)
  return `${firstday} - ${lastday}`
})

const heroSubtitle = 'Munch squad - удобный способ спланировать обеды и ужины для вашей семьи!'
</script>

<template>
  <main>
    <app-hero :title="currentWeek" :subtitle="heroSubtitle" />

    <div class="container">
      <!-- <recipes-soups /> -->
      <div class="planner">
        <div v-for="day in DaysOfWeek" :key="day" class="planner__card-wrapper">
          <planner-card :day="day"></planner-card>
          <!-- :date="" -->
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.recipe__card {
  min-height: auto;
}
</style>
