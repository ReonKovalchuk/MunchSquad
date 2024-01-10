<script setup lang="ts">
import { computed, ref } from 'vue'
// import { storeToRefs } from 'pinia'
// import AppHero from '@/components/AppHero.vue'
// import NewRecipe from '@/components/NewRecipe.vue'
import ArrowIcon from '@/components/icons/ArrowIcon.vue'
import PlannerCard from '@/components/PlannerCard.vue'
import { DateTime } from 'luxon'
import { getTitle, isToday } from '@/functions'

const { showBreakfast } = defineProps(['showBreakfast'])
const firstDay = ref(DateTime.now().startOf('week').startOf('day'))
const currentWeek = computed(() => {
  let week = [firstDay.value]

  for (let index = 1; index < 7; index++) {
    week.push(firstDay.value.plus({ days: index }))
  }
  return week
})
// const today = computed(() => {
//   return DateTime.now().startOf('day')
// })
function getDayMonth(day: DateTime) {
  return day.setLocale('ru').toLocaleString({ day: 'numeric', month: 'short' })
}
const currentWeekTitle = computed(() => {
  return `${getDayMonth(firstDay.value)} - ${getDayMonth(currentWeek.value[6])}`
})

function handlePrevious() {
  firstDay.value = firstDay.value.minus({ weeks: 1 })
}
function handleNext() {
  firstDay.value = firstDay.value.plus({ weeks: 1 })
}
</script>

<template>
  <div class="week-pagination">
    <div class="control-btn">
      <button
        type="button"
        class="btn-icon previous"
        title="Предыдущая неделя"
        aria-label="Предыдущая неделя"
        @click="handlePrevious"
      >
        <ArrowIcon></ArrowIcon>
      </button>
    </div>
    <p class="week-title">
      {{ currentWeekTitle }}
    </p>
    <div class="control-btn">
      <button
        type="button"
        class="btn-icon next"
        title="Следующая неделя"
        aria-label="Следующая неделя"
        @click="handleNext"
      >
        <ArrowIcon></ArrowIcon>
      </button>
    </div>
  </div>
  <div class="planner">
    <div v-for="day in currentWeek" :key="day.toUnixInteger()" class="planner__card-wrapper">
      <planner-card
        :dayId="day.toUnixInteger().toString()"
        :title="getTitle(day)"
        :show-breakfast="showBreakfast"
        :is-today="isToday(day)"
      ></planner-card>
    </div>
  </div>
</template>

<style>
.week-pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
}
.week-title {
  font-size: 24px;
  font-weight: bold;
}
</style>
