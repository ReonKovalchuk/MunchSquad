<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination } from 'swiper/modules'
import SlideCustom from '@/components/SlideCustom.vue'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'
</script>

<template>
  <div class="description">
    <h1 class="about-title">Munch Squad - это</h1>

    <swiper
      :slides-per-view="1"
      :modules="[Autoplay, Pagination]"
      autoplay
      :pagination="{ clickable: true }"
    >
      <swiper-slide>
        <slide-custom
          slide-text="инструмент для планирования меню"
          slide-image="/src/assets/planner.png"
        />
      </swiper-slide>

      <swiper-slide>
        <slide-custom
          slide-text="способ сохранить любимые рецепты"
          slide-image="/src/assets/recipe-library.png"
        />
      </swiper-slide>

      <swiper-slide
        ><slide-custom
          slide-text="место для хранения ваших впечатлений о ресторанах"
          slide-image="/src/assets/restaurant-review.png"
        />
      </swiper-slide>
    </swiper>
  </div>
</template>
<style>
.description {
  background-color: #fff;
  border-radius: var(--border-radius-primary);
  padding: 30px 20px;
  margin-bottom: 24px;
}
.about-title {
  text-align: center;
  font-weight: 400;
  font-size: 40px;
}
</style>
