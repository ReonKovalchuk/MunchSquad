<script setup lang="js">
import AppHero from '@/components/AppHero.vue'
import { ref, watch } from 'vue'
import { useRecipesStore } from '@/stores/recipes'
import { useRestaurantsStore } from '@/stores/restaurants'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { handleImgError } from '@/functions'
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
const router = useRouter()
const { isRecipe, heroSubtitle } = defineProps(['heroSubtitle', 'isRecipe'])
const route = useRoute()
const id = route.params.id.toString()
const recipesStore = useRecipesStore()
const { editRecipe, findRecipeById } = recipesStore
const restaurantsStore = useRestaurantsStore()
const { editRestaurantInfo, findRestaurantById } = restaurantsStore
function getCurrentItem() {
  if (isRecipe) {
    return findRecipeById(id)
  } else {
    return findRestaurantById(id)
  }
}

const { loadingRes } = storeToRefs(restaurantsStore)
const { loadingRec } = storeToRefs(recipesStore)
const showInputs = ref({ links: false, description: false })
const currentItem = ref(getCurrentItem())
if (!currentItem.value.id) {
  router.push({ name: '404' })
}
watch(isRecipe ? loadingRec : loadingRes, (newValue) => {
  if (!newValue) {
    currentItem.value = getCurrentItem()
  }
})

const saveInfo = async () => {
  try {
    if (isRecipe) {
      await editRecipe(currentItem.value.id, currentItem.value)
    } else {
      await editRestaurantInfo(currentItem.value.id, currentItem.value)
    }
  } catch (error) {
    console.log(error)
  }

  showInputs.value.links = false
  showInputs.value.description = false
}

const cancel = () => {
  try {
    currentItem.value = getCurrentItem()
  } catch (error) {
    console.log(error)
  }
  showInputs.value.links = false
  showInputs.value.description = false
}
</script>

<template>
  <app-hero :subtitle="heroSubtitle" />
  <div class="container">
    <div class="page__wrapper">
      <img :src="currentItem.linkToImage" @error="handleImgError" class="recipe__image" />
      <div class="page__main-content">
        <div v-if="!showInputs.links" class="recipe__header">
          <div class="recipe__title">
            <h1>
              <a
                :href="currentItem.link"
                class="visible-link"
                target="_blank"
                :aria-label="`Открыть ${
                  isRecipe ? ' страницу рецепта' : 'сайт ресторана'
                } в новой вкладке`"
                tabindex="0"
              >
                {{ currentItem.name }}
              </a>
              <button
                type="button"
                class="btn-icon edit-btn"
                @click="showInputs.links = true"
                title="Редактировать основную информацию"
                aria-label="Редактировать основную информацию"
              >
                <edit-icon color="black" />
              </button>
            </h1>
            <!-- <div class="recipe__actions">
              <button class="btn-icon"><calendar-add-icon></calendar-add-icon></button>
            </div> -->
          </div>
        </div>

        <form
          v-if="showInputs.links"
          @submit.prevent="saveInfo"
          class="edit-recipe__form"
          role="изменения элемента"
        >
          <h2>Изменить информацию о рецепте</h2>
          <div class="inputs">
            <div class="input-group">
              <label for="recipe-name" class="input-label"> Название блюда </label>

              <input
                id="recipe-name"
                type="text"
                v-model="currentItem.name"
                class="input"
                required
              />
            </div>
            <div class="input-group">
              <label for="recipe-link" class="input-label"> Ссылка на рецепт </label>

              <input id="recipe-link" type="text" v-model="currentItem.link" class="input" />
            </div>
            <div class="input-group">
              <label for="recipe-link-to-image" class="input-label"> Ссылка на изображение </label>
              <input
                id="recipe-link-to-image"
                type="text"
                v-model="currentItem.linkToImage"
                class="input"
              />
            </div>
            <div v-if="isRecipe" class="input-group">
              <label for="recipe-course" class="input-label">Вид</label>

              <select id="recipe-course" v-model="currentItem.course" class="input" required>
                <option v-for="course in recipesStore.courseOptions" :value="course" :key="course">
                  {{ course }}
                </option>
              </select>
            </div>
          </div>
          <div v-if="showInputs.links && !showInputs.description" class="card__actions">
            <button type="submit" class="btn btn-primary">Сохранить</button>
            <button type="button" class="btn btn-secondary" @click="cancel">Отмена</button>
          </div>
        </form>

        <div v-if="!showInputs.description" class="recipe__body">
          <h3>
            Описание
            <button
              type="button"
              class="btn-icon edit-btn"
              title="Редактировать описание"
              aria-label="Редактировать описание"
              @click="showInputs.description = true"
            >
              <edit-icon color="black" />
            </button>
          </h3>
          <div class="recipe__description" v-html="currentItem.description"></div>
        </div>
        <div v-if="showInputs.description" class="editor-wrapper">
          <div class="card__actions">
            <button type="button" class="btn btn-primary" @click="saveInfo">Сохранить</button>
            <button type="button" class="btn btn-secondary" @click="cancel">Отмена</button>
          </div>
          <!-- <textarea class="input" v-model="currentItem.description"></textarea> -->
          <element-tiptap
            v-if="showInputs.description"
            v-model:content="currentItem.description"
            :extensions="extensions"
            output="html"
            width="100%"
            height="500"
            :locale="ru"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.page__main-content {
  flex-direction: column;
  flex-shrink: 1;
}
.page__main-content .btn-icon {
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
.recipe__title {
  // display: flex;
  // flex-grow: 1;
  // flex-direction: column;
  // justify-content: space-between;
  // gap: 24px;
  word-break: break-word;
}

.recipe__image {
  max-width: 250px;
}

.card__actions {
  margin-bottom: 12px;
}
</style>
