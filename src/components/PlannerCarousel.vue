<script setup lang="ts">
import { ref, computed } from 'vue'
// import AppHero from '@/components/AppHero.vue'
import PlannerCard from '@/components/PlannerCard.vue'
import { DateTime } from 'luxon'
import ArrowIcon from '@/components/icons/ArrowIcon.vue'
import { getTitle, isToday } from '@/functions'
const { showBreakfast } = defineProps(['showBreakfast'])

const currentDayIndex = ref(0)
const days = ref([DateTime.now().startOf('day')])
const currentDay = computed(() => {
  console.log('computed current day', days.value[currentDayIndex.value])

  return days.value[currentDayIndex.value]
})
const dayId = computed(() => {
  console.log('computed dayId', currentDay.value.toUnixInteger().toString())

  return currentDay.value.toUnixInteger().toString()
})
// console.log(currentDay.value.toUnixInteger().toString())

// const getTitle = (day: DateTime) => {
//   return day.setLocale('ru').toLocaleString({ day: 'numeric', month: 'short', weekday: 'long' })
// }

function handlePrevious() {
  if (currentDayIndex.value == 0) {
    days.value.unshift(currentDay.value.minus({ days: 1 }))
  } else {
    currentDayIndex.value--
  }
}
function handleNext() {
  if (currentDayIndex.value == days.value.length - 1) {
    days.value.push(currentDay.value.plus({ days: 1 }))
    currentDayIndex.value++
  } else {
    currentDayIndex.value++
  }
  console.log(currentDay.value.toUnixInteger().toString())
}
// const showCarousel = ref(true)
</script>

<template>
  <div class="week-pagination">
    <div class="control-btn">
      <button type="button" class="btn-icon previous" @click="handlePrevious">
        <ArrowIcon></ArrowIcon>
      </button>
    </div>
    <div class="control-btn">
      <button type="button" class="btn-icon next" @click="handleNext">
        <ArrowIcon></ArrowIcon>
      </button>
    </div>
  </div>
  <div class="planner-wrapper">
    <!-- <div class="control-btn">
      <button type="button" class="btn-icon previous" @click="handlePrevious">
        <ArrowIcon></ArrowIcon>
      </button>
    </div> -->
    <div class="planner__card-wrapper">
      <planner-card
        :key="dayId"
        :show-breakfast="showBreakfast"
        :dayId="dayId"
        :title="getTitle(currentDay)"
        :is-today="isToday(currentDay)"
      ></planner-card>
    </div>
    <!-- <div class="control-btn">
      <button type="button" class="btn-icon next" @click="handleNext">
        <ArrowIcon></ArrowIcon>
      </button>
    </div> -->
  </div>
</template>

<style scoped>
.planner-wrapper {
  display: flex;
  flex-direction: row;
  place-items: center;
  flex-wrap: nowrap;
  gap: 12px;
}

.control-btn {
  width: 40px;
}
.next {
  transform: rotate(180deg);
}

.next,
.previous {
  height: 40px;
  width: 40px;
}
</style>
