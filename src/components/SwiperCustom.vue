<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination } from 'swiper/modules'
import SlideCustom from '@/components/SlideCustom.vue'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'
import slide1 from '/src/assets/planner.png'
import slide2 from '/src/assets/recipe-library.png'
import slide3 from '/src/assets/restaurant-review.png'
</script>

<template>
  <div class="description">
    <h1 class="swiper-title">Munch Squad - это</h1>

    <swiper
      :slides-per-view="1"
      :modules="[Autoplay, Pagination]"
      :autoplay="{ delay: '5000', disableOnInteraction: true }"
      :pagination="{ clickable: true }"
    >
      <swiper-slide>
        <slide-custom slide-text="инструмент для планирования меню" :slide-image="slide1" />
      </swiper-slide>

      <swiper-slide>
        <slide-custom slide-text="способ сохранить любимые рецепты" :slide-image="slide2" />
      </swiper-slide>

      <swiper-slide
        ><slide-custom
          slide-text="место для хранения ваших впечатлений о ресторанах"
          :slide-image="slide3"
        />
      </swiper-slide>
    </swiper>
  </div>
</template>
<style></style>
