<script setup lang="ts">
import { ref } from 'vue'
import { useRestaurantsStore } from '@/stores/restaurants'
import type { Restaurant } from '@/types/types'

const { addNewRestaurant } = useRestaurantsStore()
const newRestaurant = ref<Restaurant>({})

function addRestaurant() {
  addNewRestaurant(newRestaurant.value)
  newRestaurant.value.name = ''
  newRestaurant.value.link = ''
  newRestaurant.value.linkToImage = ''
  newRestaurant.value.review = ''
}
</script>

<template>
  <h2>Новый ресторан</h2>
  <form @submit.prevent="addRestaurant">
    <div class="input-group">
      <label for="restaurant-name" class="input-label"> Название ресторана </label>

      <input id="restaurant-name" type="text" v-model="newRestaurant.name" class="input" required />
    </div>
    <div class="input-group">
      <label for="restaurant-link" class="input-label">Ссылка на сайт ресторана </label>

      <input id="restaurant-link" type="text" v-model="newRestaurant.link" class="input" required />
    </div>
    <div class="input-group">
      <label for="restaurant-linkToImage" class="input-label"> Ссылка на картинку </label>

      <input
        id="restaurant-linkToImage"
        type="text"
        v-model="newRestaurant.linkToImage"
        class="input"
        required
      />
    </div>
    <div class="input-group">
      <label for="restaurant-review" class="input-label">Впечатления</label>
      <textarea
        id="restaurant-review"
        v-model="newRestaurant.review"
        rows="7"
        class="input"
      ></textarea>
    </div>
    <button type="submit" class="btn btn-primary">Добавить ресторан</button>
  </form>
</template>
