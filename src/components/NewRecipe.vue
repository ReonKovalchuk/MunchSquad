<script setup lang="ts">
import { ref } from 'vue'
import { useRecipesStore } from '@/stores/recipes'
import type { Recipe } from '@/types/types'
import { useUserInfoStore } from '@/stores/userInfo'
import { storeToRefs } from 'pinia'

const userInfoStore = useUserInfoStore()
const { userInfo } = storeToRefs(userInfoStore)
const recipesStore = useRecipesStore()
const newRecipe = ref<Recipe>({ id: '', uid: userInfo.value.uid })
function addRecipe() {
  recipesStore.addNewRecipe(newRecipe.value)
  newRecipe.value.uid = userInfo.value.uid

  newRecipe.value.course = undefined
  newRecipe.value.link = ''
  newRecipe.value.linkToImage = ''
  newRecipe.value.name = ''
  newRecipe.value.description = ''
}
</script>

<template>
  <form @submit.prevent="addRecipe" class="new-recipe__form">
    <h2>Новый рецепт</h2>

    <div class="input-group">
      <label for="recipe-name" class="input-label"> Название блюда </label>

      <input id="recipe-name" type="text" v-model="newRecipe.name" class="input" required />
    </div>
    <div class="input-group">
      <label for="recipe-link" class="input-label"> Ссылка на рецепт </label>

      <input id="recipe-link" type="text" v-model="newRecipe.link" class="input" />
    </div>
    <div class="input-group">
      <label for="recipe-link-to-image" class="input-label"> Ссылка на изображение </label>
      <input id="recipe-link-to-image" type="text" v-model="newRecipe.linkToImage" class="input" />
    </div>
    <div class="input-group">
      <label for="recipe-course" class="input-label">Вид</label>

      <select id="recipe-course" v-model="newRecipe.course" class="input" required>
        <option v-for="course in recipesStore.courseOptions" :value="course" :key="course">
          {{ course }}
        </option>
      </select>
    </div>

    <div class="input-group">
      <label for="recipe-description" class="input-label">Описание</label>
      <textarea
        id="recipe-description"
        v-model="newRecipe.description"
        rows="7"
        class="input"
      ></textarea>
    </div>

    <button type="submit" class="btn btn-primary">Добавить рецепт</button>
  </form>
</template>
