<script setup lang="ts">
import { computed } from 'vue'
// import { storeToRefs } from 'pinia'
import AppHero from '@/components/AppHero.vue'
// import NewRecipe from '@/components/NewRecipe.vue'
import PlannerCard from '@/components/PlannerCard.vue'
import { DateTime } from 'luxon'

// const firstDay = computed(() => {
//   const curr = new Date() // get current date
//   const first = curr.getDate() - curr.getDay() + 1 // First day is the day of the month - the day of the week
//   return new Date(curr.setDate(first))
// })

const currentWeek = computed(() => {
  const firsDay = DateTime.now().startOf('week').startOf('day')

  let week = [firsDay]

  for (let index = 1; index < 7; index++) {
    week.push(firsDay.plus({ days: index }))
  }
  // const last = first + 6 // last day is the first day + 6

  // const formatOptions: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' }
  // const firstday = new Date(curr.setDate(first)).toLocaleDateString('ru-RU', formatOptions)
  // const lastday = new Date(curr.setDate(last)).toLocaleDateString('ru-RU', formatOptions)

  return week
})
const getTitle = (day: DateTime) => {
  return day.setLocale('ru').toLocaleString({ day: 'numeric', month: 'short', weekday: 'long' })
}
const heroSubtitle = 'Munch squad - удобный способ спланировать меню для вашей семьи!'
</script>

<template>
  <main>
    <app-hero :subtitle="heroSubtitle" /><!-- :title="currentWeek" -->

    <div class="container">
      <!-- <recipes-soups /> -->
      <div class="planner">
        <div v-for="day in currentWeek" :key="day.toUnixInteger()" class="planner__card-wrapper">
          <suspense>
            <planner-card :dayId="day.toUnixInteger()" :title="getTitle(day)"></planner-card>
            <template #fallback>
              <p>грузимся</p>
            </template>
          </suspense>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
