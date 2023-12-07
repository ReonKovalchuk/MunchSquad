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
  return days.value[currentDayIndex.value]
})
const dayId = computed(() => {
  return currentDay.value.toUnixInteger().toString()
})

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
}
// const showCarousel = ref(true)
</script>

<template>
  <div class="planner-wrapper">
    <div class="control-btn control-previous">
      <button
        type="button"
        class="btn-icon previous"
        title="Предыдущий день"
        aria-label="Предыдущий день"
        @click="handlePrevious"
      >
        <ArrowIcon></ArrowIcon>
      </button>
    </div>
    <div class="planner__card-wrapper">
      <planner-card
        :key="dayId"
        :show-breakfast="showBreakfast"
        :dayId="dayId"
        :title="getTitle(currentDay)"
        :is-today="isToday(currentDay)"
      ></planner-card>
    </div>
    <div class="control-btn control-next">
      <button
        type="button"
        class="btn-icon next"
        title="Следующий день"
        aria-label="Следующий день"
        @click="handleNext"
      >
        <ArrowIcon></ArrowIcon>
      </button>
    </div>
  </div>
</template>

<style scoped>
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
