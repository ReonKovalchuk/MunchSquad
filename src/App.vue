<script setup lang="ts">
import { RouterView } from 'vue-router'
import { watch, onMounted, ref } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import { storesInit, settingsInit } from '@/functions'
import { useRoute } from 'vue-router'

const route = useRoute()

onMounted(async () => {
  await storesInit()
  settingsInit()
})
const scroll = ref()
watch(route, () => {
  if (scroll.value) {
    scroll.value.scrollTop = 0
  }
})
</script>

<template>
  <!-- <perfect-scrollbar ref="scroll"> -->
  <app-header />

  <main id="page-wrap" role="главное содержимое">
    <!-- <Suspense> -->
    <RouterView />
    <!-- </Suspense> -->
  </main>

  <app-footer role="дополнительная информация" />
  <!-- </perfect-scrollbar> -->
</template>

<style>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
/* .ps {
  max-height: 100vh;
} */
</style>
