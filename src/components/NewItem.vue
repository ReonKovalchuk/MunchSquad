<script setup lang="ts">
import { ref, toRefs } from 'vue'
import { useRecipesStore } from '@/stores/recipes'
import type { Recipe } from '@/types/types'
import { useRestaurantsStore } from '@/stores/restaurants'
import type { Restaurant } from '@/types/types'
import { useUserInfoStore } from '@/stores/userInfo'
import { storeToRefs } from 'pinia'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const props = defineProps(['isRecipe'])
const { isRecipe } = toRefs(props)
const userInfoStore = useUserInfoStore()
const { userInfo } = storeToRefs(userInfoStore)
const { addNewRecipe, courseOptions } = useRecipesStore()
const { addNewRestaurant } = useRestaurantsStore()

const newItem = ref<Recipe & Restaurant>({ id: '', uid: userInfo.value.uid })

//TODO: get rid of repeats
function addItem() {
  if (isRecipe.value) {
    console.log('adding new recipe')
    addNewRecipe(newItem.value)
      .then(() => {
        toast.success('Рецепт добавлен!')
      })
      .catch((e) => {
        toast.error('Не удалось добавить рецепт')
        console.log(e)
      })
    newItem.value.course = undefined
  } else {
    console.log('adding new restaurant')
    addNewRestaurant(newItem.value)
      .then(() => {
        toast.success('Ресторан добавлен!')
      })
      .catch((e) => {
        toast.error('Не удалось добавить ресторан')
        console.log(e)
      })
  }
  newItem.value.uid = userInfo.value.uid
  newItem.value.link = ''
  newItem.value.linkToImage = ''
  newItem.value.name = ''
  newItem.value.description = ''
}
</script>

<template>
  <form @submit.prevent="addItem" class="new-recipe__form" role="форма добавления элемента">
    <h2>Новый {{ isRecipe ? 'рецепт' : 'ресторан' }}</h2>

    <div class="input-group">
      <label for="item-name" class="input-label"> Название </label>

      <input id="item-name" type="text" v-model="newItem.name" class="input" required />
    </div>
    <div class="input-group">
      <label for="item-link" class="input-label"> Ссылка </label>

      <input id="item-link" type="text" v-model="newItem.link" class="input" />
    </div>
    <div class="input-group">
      <label for="item-link-to-image" class="input-label"> Ссылка на изображение </label>
      <input id="item-link-to-image" type="text" v-model="newItem.linkToImage" class="input" />
    </div>
    <div v-if="isRecipe" class="input-group">
      <label for="item-course" class="input-label">Вид</label>

      <select id="item-course" v-model="newItem.course" class="input" required>
        <option v-for="course in courseOptions" :value="course" :key="course">
          {{ course }}
        </option>
      </select>
    </div>

    <div class="input-group">
      <label for="item-description" class="input-label">Описание</label>
      <textarea
        id="item-description"
        v-model="newItem.description"
        rows="7"
        class="input"
      ></textarea>
    </div>

    <button type="submit" class="btn btn-primary">Добавить</button>
  </form>
</template>
