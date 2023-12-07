<template>
  <label class="switch__container">
    <input
      class="switch__input"
      type="checkbox"
      :checked="modelValue"
      @change="$emit('update:modelValue', $event.target.checked)"
    />
    <span class="switch"></span>
    <span class="switch__label">{{ label }}</span>
  </label>
</template>

<script setup>
defineOptions({
  inheritAttrs: false
})
const { label, modelValue } = defineProps(['label', 'modelValue'])
defineEmits(['update:modelValue'])
</script>

<style scoped>
.switch__container {
  cursor: pointer;
  display: flex;
  align-items: center;
}
.switch__label {
  margin-left: 12px;
  color: var(--color-text);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 110px;
}
.switch__input {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
.switch {
  --light-gray: #e2e8f0;
  --gray: #cbd5e0;
  --dark-gray: #a0aec0;
  --teal: #4fd1c5;
  --dark-teal: #319795;
  --switch-container-width: 50px;
  --switch-size: calc(var(--switch-container-width) / 2);

  /* Vertically center the inner circle */
  display: flex;
  flex-shrink: 0;
  align-items: center;
  position: relative;
  height: var(--switch-size);
  flex-basis: var(--switch-container-width);
  /* Make the container element rounded */
  border-radius: var(--switch-size);
  background-color: var(--card-background);
  transition: background-color 0.25s ease-in-out;
  border: 2px solid var(--card-background);
}

.switch::before {
  content: '';
  position: absolute;
  /* Move a little bit the inner circle to the right */
  left: 1px;
  height: calc(var(--switch-size) - 4px);
  width: calc(var(--switch-size) - 4px);
  /* Make the inner circle fully rounded */
  border-radius: 9999px;
  border: 2px solid var(--card-background);
  background-color: white;
  transition: transform 0.375s ease-in-out;
}
.switch__input:checked + .switch {
  background-color: var(--primary-color);
  border: 2px solid var(--primary-color);
}

.switch__input:checked + .switch::before {
  border-color: var(--primary-color);
  /* Move the inner circle to the right */
  transform: translateX(calc(var(--switch-container-width) - var(--switch-size)));
}

.switch__input:focus + .switch/*,
 .switch__input:focus-visible + .switch  */ {
  border: 2px solid var(--card-background);
  background-color: transparent;
}
.switch__input:checked:focus + .switch/* ,
.switch__input:checked:focus-visible + .switch  */ {
  border: 2px solid var(--primary-color);
  background-color: transparent;
}

.input:focus + .switch::before {
  border-color: var(--dark-gray);
}

.input:focus:checked + .switch::before {
  border-color: var(--primary-color);
}
</style>
