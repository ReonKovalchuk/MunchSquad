<script setup lang="ts">
import { ref } from 'vue'
import { useRestaurantsStore } from '@/stores/restaurants'
import type { Restaurant } from '@/types/types'
import { useUserInfoStore } from '@/stores/userInfo'
import { storeToRefs } from 'pinia'

const userInfoStore = useUserInfoStore()
const { userInfo } = storeToRefs(userInfoStore)
const { addNewRestaurant } = useRestaurantsStore()
const newRestaurant = ref<Restaurant>({ id: '', uid: userInfo.value.uid })

function addRestaurant() {
  newRestaurant.value.uid = userInfo.value.uid
  addNewRestaurant(newRestaurant.value)
  newRestaurant.value.name = ''
  newRestaurant.value.link = ''
  newRestaurant.value.linkToImage = ''
  newRestaurant.value.review = ''
}
</script>

<template>
  <form @submit.prevent="addRestaurant">
    <h2>Новый ресторан</h2>
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
