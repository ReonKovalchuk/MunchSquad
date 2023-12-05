<script setup>
const props = defineProps(['subtitle'])
</script>

<template>
  <div class="hero" role="баннер">
    <p class="hero__text">
      {{ props.subtitle }}
    </p>
  </div>
</template>
