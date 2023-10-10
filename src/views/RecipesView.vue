<script setup lang="ts">
import { ref } from 'vue'
const courses = ['Первое', 'Второе', 'Салат', 'Десерт']
type Cource = (typeof courses)[number]

interface Recipe {
  id?: string
  link?: string
  name?: string
  course?: Cource
}
const newRecipe = ref<Recipe>({})
const recipeList = ref<Recipe[]>([])

function addRecipe() {
  const date = new Date()
  const nr = newRecipe.value
  recipeList.value.push({
    id: date.toString(),
    link: nr.link,
    name: nr.name,
    course: nr.course
  })
}
</script>

<template>
  <main>
    <h2>Рецепты</h2>
    <form @submit.prevent="addRecipe">
      <div class="input-group">
        <label for="recipe-name">Название блюда</label>
        <input id="recipe-name" type="text" v-model="newRecipe.name" />
      </div>
      <div class="input-group">
        <label for="recipe-link">Ссылка на рецепт</label>
        <input id="recipe-link" type="text" v-model="newRecipe.link" />
      </div>
      <div class="input-group">
        <label for="recipe-course">Вид</label>
        <select id="recipe-course" v-model="newRecipe.course">
          <option v-for="course in courses" :value="course" :key="course">
            {{ course }}
          </option>
        </select>
      </div>
      <button type="submit">Добавить рецепт</button>
    </form>
  </main>
</template>
