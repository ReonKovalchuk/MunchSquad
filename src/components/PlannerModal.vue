<script setup>
import { ref, computed } from 'vue'
// import { useRestaurantsStore } from '@/stores/restaurants'
import CloseIcon from './icons/CloseIcon.vue'
import { editRestaurantInfo } from '@/stores/restaurantsData'
// import { Restaurant } from '@/types/types'
const { show, object } = defineProps(['show', 'object'])
// const { editRestaurantInfo } = useRestaurantsStore()
const thisObj = ref(object)
const emit = defineEmits(['close'])
const changeDescription = async () => {
  await editRestaurantInfo(object.id, thisObj.value)
  emit('close')
}
</script>

<template>
  <transition name="modal">
    <div v-if="show" class="modal__mask">
      <div class="modal__outer-container">
        <!-- <div> -->
        <button class="modal-default-button" @click="$emit('close')" tabindex="0">
          <close-icon color="black"></close-icon>
        </button>
        <!-- </div> -->
        <div class="modal__inner-container">
          <div class="modal__header">
            <h3>{{ object.name }}</h3>
          </div>

          <div class="modal__body">
            <form @submit.prevent="changeDescription()">
              <div class="input-group">
                <label for="description" class="input-label"> Впечатления: </label>

                <textarea id="description" rows="5" class="input" v-model="thisObj.review">
                </textarea>
              </div>
              <button type="submit" class="btn btn-secondary">Сохранить</button>
            </form>
          </div>

          <!-- <div class="modal__footer">
            <slot name="footer"> -->

          <!-- </slot>
          </div> -->
          <!-- </div> -->
        </div>
      </div>
    </div>
    <!-- </div> -->
  </transition>
</template>

<style>
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
  /* overflow-y: scroll; */
}
.modal__inner-container {
  background-color: var(--card-background);
  border-radius: var(--border-radius-primary) var(--border-radius-primary) 0 0;
  overflow: hidden;
  /* overflow-y: scroll; */
  /*  */
}

.modal__header h3 {
  /* padding: 12px; */
  margin-bottom: 12px;
  font-weight: 700;
}

.modal__image {
  max-height: 200px;
  min-width: 100%;
  object-fit: cover;
  /* border-radius: var(--border-radius-primary); */
}

.modal-default-button {
  height: 16px;
  width: 16px;
  padding: 0;
  position: absolute;
  top: 18px;
  right: 15px;
  cursor: pointer;
  border: none;
  background-color: transparent;
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
