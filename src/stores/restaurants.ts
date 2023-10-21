import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Restaurant } from '@/types/types'

export const useRestaurantsStore = defineStore('restaurants', () => {
  function getRestaurants() {
    try {
      // @ts-ignore
      return JSON.parse(window.localStorage.getItem('restaurants')) || []
    } catch (error) {
      console.log('ошибка при получении данных из хранилища:', error)
      return []
    }
  }
  const restaurants = ref<Restaurant[]>(getRestaurants())

  function addNewRestaurant(restaurant: Restaurant) {
    const saved = getRestaurants()

    saved.push({
      id: Date.now().toString(),
      link: restaurant.link,
      name: restaurant.name,
      linkToImage: restaurant.linkToImage,
      review: restaurant.review
    })
    window.localStorage.setItem('restaurants', JSON.stringify(saved))
    restaurants.value = saved
  }

  function removeRestaurant(id: string) {
    const res = restaurants.value.filter((restaurant) => {
      return restaurant.id !== id
    })
    window.localStorage.setItem('restaurants', JSON.stringify(res))
    restaurants.value = res
  }
  return {
    restaurants,
    addNewRestaurant,
    removeRestaurant
  }
})
