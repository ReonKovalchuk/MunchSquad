<script setup>
const { show, object } = defineProps(['show', 'object'])
</script>

<template>
  <transition name="modal">
    <div v-if="show" class="modal__mask">
      <div class="modal__container">
        <img
          v-if="object.linkToImage"
          :src="object.linkToImage"
          :alt="object.name"
          class="modal__image"
        />
        <div class="modal__header">
          <!-- <slot name="header">default header</slot> -->

          {{ object.name }}
        </div>

        <div class="modal__body">
          {{ object.description ? object.description : object.review }}
          <!-- <slot name="body">default body</slot> -->
        </div>

        <div class="modal__footer">
          <slot name="footer">
            default footer
            <button class="btn btn-secondary modal-default-button" @click="$emit('close')">
              OK
            </button>
          </slot>
        </div>
      </div>
    </div>
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

.modal__container {
  width: fit-content;
  margin: auto;
  padding: 20px 30px;
  background-color: var(--card-background);
  border-radius: var(--border-radius-primary);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal__header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal__body {
  margin: 20px 0;
  overflow-y: scroll;
}

.modal__default-button {
  float: right;
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
