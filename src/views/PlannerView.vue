<script setup lang="ts">
import { ref, watch } from 'vue'
import AppHero from '@/components/AppHero.vue'
import AppSwitch from '@/components/AppSwitch.vue'
import PlannerCarousel from '@/components/PlannerCarousel.vue'
import PlannerWeek from '@/components/PlannerWeek.vue'

const { heroSubtitle } = defineProps(['heroSubtitle'])

const showCarousel = ref(JSON.parse(localStorage.getItem('carousel')!))
const showBreakfast = ref(JSON.parse(localStorage.getItem('breakfast')!))
watch(showCarousel, (newValue) => {
  localStorage.setItem('carousel', JSON.stringify(newValue))
})
watch(showBreakfast, (newValue) => {
  localStorage.setItem('breakfast', JSON.stringify(newValue))
})
</script>

<template>
  <app-hero :subtitle="heroSubtitle" />

  <div class="container">
    <div class="planner-actions">
      <div class="view-toggle">
        <button
          type="button"
          class="view-toggle-btn btn"
          :class="{ active: showCarousel }"
          @click="showCarousel = true"
        >
          1 день
        </button>
        <button
          type="button"
          class="view-toggle-btn btn"
          :class="{ active: !showCarousel }"
          @click="showCarousel = false"
        >
          Неделя
        </button>
      </div>
      <app-switch v-model="showBreakfast" label="Завтрак"></app-switch>
    </div>

    <planner-carousel v-if="showCarousel" :show-breakfast="showBreakfast"> </planner-carousel>
    <planner-week v-else :show-breakfast="showBreakfast"> </planner-week>
  </div>
</template>

<style scoped>
.view-toggle {
  border-radius: var(--border-radius-primary);
}
.planner-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 24px;
  margin-bottom: 24px;
}
.view-toggle-btn {
  font-size: 15px;
  padding: 1px 6px;
  display: inline;
  border-color: var(--card-background);
  background-color: var(--card-background);
  font-weight: normal;
}
.active {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}
.view-toggle-btn:nth-child(1) {
  border-radius: var(--border-radius-primary) 0 0 var(--border-radius-primary);
}
.view-toggle-btn:nth-child(2) {
  border-radius: 0 var(--border-radius-primary) var(--border-radius-primary) 0;
}
</style>
