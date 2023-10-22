<script setup lang="ts">
import { ref } from 'vue'
import AppCardModal from './AppCardModal.vue'
const { object } = defineProps(['object'])
const showModal = ref(false)
</script>

<template>
  <div class="card">
    <img :src="object.linkToImage" class="card__image" />
    <div class="card__content">
      <strong class="card__title">{{ object.name }}</strong>
      <div class="card__actions">
        <a :href="object.link" class="card__link btn btn-primary" target="_blank"> Сайт </a>
        <button type="button" class="btn btn-secondary" @click="showModal = true">Инфо</button>
      </div>
    </div>
  </div>

  <teleport to="body">
    <!-- use the modal component, pass in the prop -->
    <app-card-modal :show="showModal" :object="object" @close="showModal = false">
      <!-- <template #header>
        <h3>custom header</h3>
      </template> -->
    </app-card-modal>
  </teleport>
</template>
