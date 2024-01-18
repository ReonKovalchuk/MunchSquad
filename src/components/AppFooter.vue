<script setup>
import AppLogo from './AppLogo.vue'
</script>
<template>
  <footer>
    <div class="container footer__container">
      <app-logo></app-logo>
      <div>
        <p>
          Сайт создан
          <a href="https://github.com/ReonKovalchuk/" class="visible-link" target="_blank"
            >Реон Ковальчук</a
          >
        </p>
        <p>
          <a
            class="visible-link"
            href="https://www.figma.com/file/fuEkLM8LQIvASS9PeiDWnb/Food-recipes-website-UI---Del%C3%ADcias-%C3%A0-Mesa-(Community)"
            target="_blank"
            >Макет</a
          >, взятый за основу дизайна
        </p>
        <p>
          <a class="visible-link" href="https://www.svgrepo.com/svg/245256/dinner" target="_blank">
            Иконка
          </a>
          с тарелкой
        </p>

        <p>
          Фон от
          <a class="visible-link" href="https://ru.freepik.com/author/kamranaydinov" target="_blank"
            >KamranAydinov</a
          >
          на Freepik
        </p>
      </div>
    </div>
  </footer>
</template>

<style>
.footer__container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 24px;
}
</style>
