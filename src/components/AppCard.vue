<script setup lang="ts">
import { ref } from 'vue'
import AppCardModal from '@/components/AppCardModal.vue'
import CloseIcon from '@/components/icons/CloseIcon.vue'
import LinkIcon from './icons/LinkIcon.vue'

const { object, removeFromPlanner, isRecipe } = defineProps([
  'object',
  'removeFromPlanner',
  'isRecipe'
])
const showModal = ref(false)

const emit = defineEmits(['removeFromPlanner', 'remove'])

const remove = () => {
  if (removeFromPlanner) {
    emit('removeFromPlanner')
  } else {
    emit('removeFromPlanner')
    emit('remove', object.id)
  }
}
</script>

<template>
  <div class="card">
    <button class="card__remove-btn" @click="remove()">
      <close-icon color="red"></close-icon>
    </button>
    <img :src="object.linkToImage" class="card__image" />
    <div class="card__content">
      <strong class="card__title">{{ object.name }}</strong>
      <div class="card__actions">
        <a :href="object.link" class="card__link" target="_blank">
          <link-icon></link-icon>
        </a>
        <RouterLink v-if="isRecipe" :to="`/recipes/${object.id}`" class="btn btn-secondary">
          Рецепт
        </RouterLink>
        <button v-else type="button" class="btn btn-secondary" @click="showModal = true">
          Впечатления
        </button>
      </div>
    </div>
  </div>

  <teleport to="body">
    <app-card-modal :show="showModal" :object="object" @close="showModal = false"> </app-card-modal>
  </teleport>
</template>
