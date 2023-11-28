<script setup lang="js">
import AppHero from '@/components/AppHero.vue'
import { ref, watch } from 'vue'
import { useRecipesStore } from '@/stores/recipes'
import { useRoute } from 'vue-router'
import NewRecipe from '@/components/NewRecipe.vue'
import { storeToRefs } from 'pinia'
import { handleImgError } from '@/functions'
import CalendarAddIcon from '@/components/icons/CalendarAddIcon.vue'
import EditIcon from '@/components/icons/EditIcon.vue'
import ru from 'element-tiptap-vue3-fixed/lib/locales/ru'
import {
  // necessary extensions
  ElementTiptap,
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Strike,
  BulletList,
  OrderedList,
  Fullscreen,
  TextAlign
} from 'element-tiptap-vue3-fixed'

// editor extensions
// they will be added to menubar and bubble menu by the order you declare.
const extensions = [
  Doc,
  Text,
  Paragraph,
  Heading.configure({ level: 5 }),
  Bold.configure({ bubble: true }), // render command-button in bubble menu.
  Underline.configure({ bubble: true, menubar: false }), // render command-button in bubble menu but not in menubar.
  Italic,
  Strike,
  TextAlign.configure({ bubble: true }),
  BulletList,
  OrderedList,
  Fullscreen
]
const route = useRoute()

const recipesStore = useRecipesStore()
const { editRecipe, findRecipeById } = recipesStore
const { loading } = storeToRefs(recipesStore)
const showInputs = ref({ links: false, description: false })

const currentRecipe = ref(findRecipeById(route.params.id.toString()))
watch(loading, (newValue) => {
  if (!newValue) {
    currentRecipe.value = findRecipeById(route.params.id.toString())
  }
})

const saveInfo = async () => {
  console.log('saving')
  try {
    await editRecipe(currentRecipe.value.id, currentRecipe.value)
  } catch (error) {
    console.log(error)
  }

  showInputs.value.links = false
  showInputs.value.description = false
}

const cancel = () => {
  console.log('canselling')
  try {
    currentRecipe.value = findRecipeById(currentRecipe.value.id)
  } catch (error) {
    console.log(error)
  }
  showInputs.value.links = false
  showInputs.value.description = false
}

const heroSubtitle = 'Munch squad поможет сохранить любимые рецепты'
</script>

<template>
  <app-hero :subtitle="heroSubtitle" />
  <div class="container">
    <div class="page__wrapper">
      <div class="page__main-content">
        <div v-if="!showInputs.links" class="recipe__header">
          <img :src="currentRecipe.linkToImage" @error="handleImgError" class="recipe__image" />
          <div class="recipe__title">
            <a :href="currentRecipe.link" class="visible-link">
              <h2>{{ currentRecipe.name }}</h2>
            </a>
            <div class="recipe__actions">
              <button class="btn-icon"><calendar-add-icon></calendar-add-icon></button>
              <button type="button" class="btn-icon edit-btn" @click="showInputs.links = true">
                <edit-icon color="black" />
              </button>
            </div>
          </div>
        </div>

        <form v-if="showInputs.links" @submit.prevent="saveInfo" class="edit-recipe__form">
          <h2>Изменить информацию о рецепте</h2>
          <div class="inputs">
            <div class="input-group">
              <label for="recipe-name" class="input-label"> Название блюда </label>

              <input
                id="recipe-name"
                type="text"
                v-model="currentRecipe.name"
                class="input"
                required
              />
            </div>
            <div class="input-group">
              <label for="recipe-link" class="input-label"> Ссылка на рецепт </label>

              <input id="recipe-link" type="text" v-model="currentRecipe.link" class="input" />
            </div>
            <div class="input-group">
              <label for="recipe-link-to-image" class="input-label"> Ссылка на изображение </label>
              <input
                id="recipe-link-to-image"
                type="text"
                v-model="currentRecipe.linkToImage"
                class="input"
              />
            </div>
            <div class="input-group">
              <label for="recipe-course" class="input-label">Вид</label>

              <select id="recipe-course" v-model="currentRecipe.course" class="input" required>
                <option v-for="course in recipesStore.courseOptions" :value="course" :key="course">
                  {{ course }}
                </option>
              </select>
            </div>
          </div>
          <div class="card__actions">
            <button type="submit" class="btn btn-primary">Сохранить</button>
            <button type="button" class="btn btn-secondary" @click="cancel">Отмена</button>
          </div>
        </form>

        <div v-if="!showInputs.description" class="recipe__body">
          <h3>
            Описание
            <button type="button" class="btn-icon edit-btn" @click="showInputs.description = true">
              <edit-icon color="black" />
            </button>
          </h3>
          <div class="recipe__description" v-html="currentRecipe.description"></div>
        </div>
        <div v-if="showInputs.description" class="editor-wrapper">
          <div class="card__actions">
            <button type="button" class="btn btn-primary" @click="saveInfo">Сохранить</button>
            <button type="button" class="btn btn-secondary" @click="cancel">Отмена</button>
          </div>
          <!-- <textarea class="input" v-model="currentRecipe.description"></textarea> -->
          <element-tiptap
            v-if="showInputs.description"
            v-model:content="currentRecipe.description"
            :extensions="extensions"
            output="html"
            width="100%"
            height="500"
            :locale="ru"
          />
        </div>
      </div>
      <aside class="new-x-form">
        <new-recipe></new-recipe>
      </aside>
    </div>
  </div>
</template>

<style scoped lang="scss">
.page__main-content {
  display: unset;
}
.btn-icon {
  width: 24px;
  height: 24px;
  margin-right: 12px;
}

.inputs {
  display: flex;
  flex-direction: row;
  gap: 12px;
  flex-wrap: wrap;
}

.input-group {
  flex-basis: calc(50% - 24px);
}
.tiptap {
  > * + * {
    margin-top: 0.75em;
  }
}

.editor-wrapper {
  min-width: 100%;
}

.recipe__header {
  display: flex;
  align-items: center;
  gap: 24px;
}
.recipe__title {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;
}

.recipe__image {
  max-width: 250px;
}

.card__actions {
  margin-bottom: 12px;
}
</style>
