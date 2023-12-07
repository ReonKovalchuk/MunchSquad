<script setup>
import AppLogo from './AppLogo.vue'
</script>
<template>
  <footer>
    <div class="container footer__container">
      <app-logo></app-logo>
      <div>
        <p>
          <a
            class="visible-link"
            href="https://www.figma.com/file/fuEkLM8LQIvASS9PeiDWnb/Food-recipes-website-UI---Del%C3%ADcias-%C3%A0-Mesa-(Community)"
            target="_blank"
            tabindex="0"
            >Макет</a
          >, взятый за основу дизайна
        </p>
        <p>
          <a
            class="visible-link"
            href="https://www.svgrepo.com/svg/245256/dinner"
            target="_blank"
            tabindex="0"
          >
            иконка
          </a>
          с тарелкой
        </p>

        <p>
          <a
            class="visible-link"
            href="https://ru.freepik.com/free-photo/top-view-wooden-bowls-with-corn-seeds-on-table-with-copy-space_17236423.htm#query=top-view-seeds-and-herbs-for-cooking_5511902&position=0&from_view=search&track=ais"
            target="_blank"
            tabindex="0"
            >Изображение от KamranAydinov</a
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
