<script setup>
const props = defineProps(['subtitle'])
</script>

<template>
  <div class="hero">
    <p class="hero__text">
      {{ props.subtitle }}
    </p>
  </div>
</template>
