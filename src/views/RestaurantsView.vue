<script setup lang="ts">
import { ref } from 'vue'
interface RestaurantInfo {
  id?: string
  name?: string
  dishes?: string
  // status?: RestaurantStatus
  address?: string
}
// type RestaurantStatus = 'Хотим попробовать' | 'Порекомендовали' | 'Не рекомендуем'
const restaurantList = ref<Array<RestaurantInfo>>([])
const newRestaurant = ref<RestaurantInfo>({})

// const newRestaurantName = ref('');
// const newRestaurantCuisine = ref('');
// const newResturantAddress = ref('');

function addRestaurant() {
  const date = new Date()
  const nr = newRestaurant.value
  restaurantList.value.push({
    name: nr.name,
    dishes: nr.dishes,
    id: date.toString(),
    address: nr.address
  })
}
</script>

<template>
  <main>
    <h2>Рестораны</h2>
    <form @submit.prevent="addRestaurant">
      <div class="input-group">
        <label for="restaurant-name">Название ресторана</label>
        <input id="restaurant-name" v-model="newRestaurant.name" type="text" />
      </div>
      <div class="input-group">
        <label for="restaurant-dishes">Блюда</label>
        <input id="restaurant-dishes" v-model="newRestaurant.dishes" type="text" />
      </div>
      <div class="input-group">
        <label for="restaurant-address">Адрес</label>
        <input id="restaurant-address" v-model="newRestaurant.address" type="text" />
      </div>
      <button type="submit">Добавить ресторан</button>
    </form>

    <ul>
      <li v-for="restaurant in restaurantList" :key="restaurant.id">
        {{ restaurant.name }} : {{ restaurant.dishes }}
      </li>
    </ul>
  </main>
</template>
