<script setup lang="ts">
// import { ref } from 'vue'
import CloseIcon from '@/components/icons/CloseIcon.vue'
import LinkIcon from './icons/LinkIcon.vue'
import { handleImgError } from '@/functions'
import { toRefs } from 'vue'

const props = defineProps(['object', 'removeFromPlanner', 'isRecipe'])

const { object, removeFromPlanner, isRecipe } = toRefs(props)
// const showModal = ref(false)

const emit = defineEmits(['removeFromPlanner', 'remove'])

function remove() {
  if (removeFromPlanner.value) {
    emit('removeFromPlanner')
  } else {
    emit('removeFromPlanner')
    emit('remove', object.value.id)
  }
}
</script>

<template>
  <div class="card">
    <button
      class="card__remove-btn"
      :title="removeFromPlanner ? 'удалить из планировщика' : 'удалить'"
      :aria-label="removeFromPlanner ? 'удалить из планировщика' : 'удалить'"
      @click="remove()"
    >
      <close-icon color="red"></close-icon>
    </button>
    <a
      :href="`/${isRecipe ? 'recipes' : 'restaurants'}/${object.id}`"
      class="card__link image-link"
      target="”_blank”"
    >
      <img
        :src="object.linkToImage || '/placeholder-image.png'"
        @error="handleImgError"
        class="card__image"
      />
    </a>
    <div class="card__content">
      <strong class="card__title">{{ object.name }}</strong>
      <div class="card__actions">
        <a
          :href="object.link"
          class="card__link"
          target="_blank"
          :aria-label="`Открыть ${
            isRecipe ? ' страницу рецепта' : 'сайт ресторана'
          } в новой вкладке`"
          tabindex="0"
        >
          <link-icon v-if="object.link"></link-icon>
        </a>
        <RouterLink
          :to="`/${isRecipe ? 'recipes' : 'restaurants'}/${object.id}`"
          class="btn btn-secondary"
          tabindex="0"
        >
          {{ isRecipe ? 'Мой рецепт' : 'Ресторан' }}
        </RouterLink>
      </div>
    </div>
  </div>

  <!-- <teleport to="body">
    <app-card-modal :show="showModal" :object="object" @close="showModal = false"> </app-card-modal>
  </teleport> -->
</template>

<style>
.card {
  display: flex;
  position: relative;
  flex-direction: column;
  flex-grow: 1;
  border-radius: var(--border-radius-primary);
  box-shadow: var(--shadow);
  background-color: var(--card-background);
  overflow: hidden;
  max-width: 250px;
}
.card__image {
  min-width: 100%;
  height: 250px;
  width: 250px;
  object-fit: cover;
}
.card__content {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-between;
  padding: 12px;
}
.card__title {
  display: block;
  margin-bottom: 12px;
  line-height: 1.5;
  font-size: 18px;
  font-weight: 700;
  word-break: break-word;
}
.card__actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.card__remove-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  transition: opacity ease-in 0.1s;
  opacity: 0;
  border: none;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  line-height: 0;
}
.card:hover .card__remove-btn {
  opacity: 1;
}
.card__link {
  line-height: 0;
}
.image-link {
  outline: none !important;
  opacity: 1 !important;
}
</style>
