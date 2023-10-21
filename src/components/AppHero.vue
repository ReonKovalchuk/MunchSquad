<script setup>
const props = defineProps(['title', 'subtitle'])
</script>

<template>
  <div class="hero">
    <p class="hero__text">
      {{ props.subtitle }}
    </p>
    <h2 class="hero__title hero__text">
      {{ props.title }}
    </h2>
  </div>
</template>
