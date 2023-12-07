<script setup>
import { ref } from 'vue'
import CloseIcon from './icons/CloseIcon.vue'
import { useRestaurantsStore } from '@/stores/restaurants'
import EditIcon from './icons/EditIcon.vue'
// import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import { handleImgError } from '@/functions'

// import LinkIcon from './icons/LinkIcon.vue'
const { show, object } = defineProps(['show', 'object'])
const { editRestaurantInfo, findRestaurantById } = useRestaurantsStore()
const thisObj = ref(object)
// const emit = defineEmits(['close'])
const showInputs = ref(false)
const saveInfo = async () => {
  await editRestaurantInfo(object.id, thisObj.value)
  showInputs.value = false
}

const cancel = () => {
  thisObj.value = findRestaurantById(thisObj.value.id)
  showInputs.value = false
}
</script>

<template>
  <transition name="modal">
    <div v-if="show" class="modal__mask">
      <div class="modal__outer-container">
        <button
          class="btn-icon modal-default-button"
          title="Закрыть модальное окно"
          @click="$emit('close')"
          tabindex="0"
        >
          <close-icon color="black"></close-icon>
        </button>

        <!-- <perfect-scrollbar> -->
        <div class="modal__inner-container">
          <form @submit.prevent="saveInfo" role="форма">
            <img
              v-if="!showInputs"
              :src="object.linkToImage"
              :alt="object.name"
              @error="handleImgError"
              class="modal__image"
            />
            <div v-if="!showInputs" class="modal__header">
              <h3>
                <a :href="object.link" class="visible-link" target="_blank">
                  {{ object.name }}
                </a>
              </h3>
              <button
                type="button"
                class="btn-icon edit-btn"
                title="Редактировать"
                @click="showInputs = true"
              >
                <edit-icon color="black" />
              </button>
            </div>

            <div class="modal__body">
              <div v-if="showInputs">
                <div class="input-group">
                  <label for="restaurant-linkToImage" class="input-label">
                    Ссылка на картинку
                  </label>

                  <input
                    id="restaurant-linkToImage"
                    type="text"
                    v-model="thisObj.linkToImage"
                    class="input"
                    required
                  />
                </div>
                <div class="input-group">
                  <label for="restaurant-name" class="input-label"> Название ресторана </label>

                  <input
                    id="restaurant-name"
                    type="text"
                    v-model="thisObj.name"
                    class="input"
                    required
                  />
                </div>
                <div class="input-group">
                  <label for="restaurant-link" class="input-label">Ссылка на сайт ресторана </label>

                  <input
                    id="restaurant-link"
                    type="text"
                    v-model="thisObj.link"
                    class="input"
                    required
                  />
                </div>
              </div>
              <div class="input-group">
                <label for="description" class="input-label"> Впечатления: </label>

                <textarea id="description" rows="5" class="input" v-model="thisObj.review">
                </textarea>
              </div>
              <div class="card__actions">
                <button type="submit" class="btn btn-primary">Сохранить</button>
                <button v-if="showInputs" type="button" class="btn btn-secondary" @click="cancel">
                  Отмена
                </button>
              </div>
            </div>
          </form>
        </div>
        <!-- </perfect-scrollbar> -->
      </div>
    </div>
  </transition>
</template>

<style scoped>
.modal__mask {
  position: fixed;

  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
}

.modal__outer-container {
  position: relative;
  max-width: 700px;
  min-width: 320px;
  margin: auto;
  padding: 30px;
  background-color: var(--card-background);
  border-radius: var(--border-radius-primary);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}
.modal__inner-container {
  background-color: var(--card-background);
  max-height: 90vh;
}

/* .ps {
  max-height: 700px;
} */

.modal__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 6px;
  margin-bottom: 12px;
  max-width: 245px;
}
.modal__header h3 {
  font-weight: 700;
  flex-grow: 1;
  word-break: break-word;
}

.edit-btn {
  flex-grow: 0;
}

.modal__image {
  max-height: 200px;
  min-width: 100%;
  object-fit: cover;
  border-radius: var(--border-radius-primary) var(--border-radius-primary) 0 0;
}

.modal-default-button {
  position: absolute;
  top: 18px;
  right: 15px;
}
/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
