<script setup lang="ts">
import { ref } from 'vue'
import AppHero from '@/components/AppHero.vue'

import PlannerCarousel from '@/components/PlannerCarousel.vue'
import PlannerWeek from '@/components/PlannerWeek.vue'

const { heroSubtitle } = defineProps(['heroSubtitle'])

const showCarousel = ref(true)
const showBreakfast = ref(true)
</script>

<template>
  <app-hero :subtitle="heroSubtitle" />

  <div class="container">
    <div class="planner-actions">
      <div class="view-toggle">
        <button
          type="button"
          class="view-toggle-btn"
          :class="{ active: showCarousel }"
          @click="showCarousel = true"
        >
          1 день
        </button>
        <button
          type="button"
          class="view-toggle-btn"
          :class="{ active: !showCarousel }"
          @click="showCarousel = false"
        >
          Неделя
        </button>
      </div>
      <label for="show-breakfast"
        ><input type="checkbox" id="show-breakfast" v-model="showBreakfast" /> Завтрак</label
      >
    </div>

    <planner-carousel v-if="showCarousel" :show-breakfast="showBreakfast"> </planner-carousel>
    <planner-week v-else :show-breakfast="showBreakfast"> </planner-week>
  </div>
</template>

<style scoped>
.view-toggle {
  border-radius: var(--border-radius-primary);
  background-color: var(--card-background);
  overflow: hidden;
}
.active {
  background-color: var(--primary-color);
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
  padding: 8px 6px;
}
</style>
