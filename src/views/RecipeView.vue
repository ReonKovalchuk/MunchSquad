<script setup lang="js">
import AppHero from '@/components/AppHero.vue'
import { ref, watch } from 'vue'
import { useRecipesStore } from '@/stores/recipes'
import { useRoute } from 'vue-router'
// import type { Recipe } from '@/types/types'
import NewRecipe from '@/components/NewRecipe.vue'
import { storeToRefs } from 'pinia'

import {
  // necessary extensions
  ElementTiptap,
  Document,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Strike,
  BulletList,
  OrderedList
} from 'element-tiptap'

// editor extensions
// they will be added to menubar and bubble menu by the order you declare.
const extensions = [
  Document,
  Text,
  Paragraph,
  Heading.configure({ level: 5 }),
  Bold.configure({ bubble: true }), // render command-button in bubble menu.
  Underline.configure({ bubble: true, menubar: false }), // render command-button in bubble menu but not in menubar.
  Italic,
  Strike,
  BulletList,
  OrderedList
]
const route = useRoute()

const recipesStore = useRecipesStore()
const { loading } = storeToRefs(recipesStore)

const currentRecipe = ref(recipesStore.findRecipeById(route.params.id.toString()))
watch(loading, (newValue) => {
  if (!newValue) {
    currentRecipe.value = recipesStore.findRecipeById(route.params.id.toString())
  }
})
const heroSubtitle = 'Munch squad поможет сохранить любимые рецепты'
</script>

<template>
  <app-hero :subtitle="heroSubtitle" />
  <div class="container">
    <div class="page__wrapper">
      <div class="page__main-content">
        <h2>{{ currentRecipe.name }}</h2>
        <!--<div class="editor-wrapper">
           <element-tiptap
            v-model:content="currentRecipe.description"
            :extensions="extensions"
            width="100%"
            height="700"
          /> 
        </div>-->
      </div>
      <aside class="new-x-form">
        <new-recipe></new-recipe>
      </aside>
    </div>
  </div>
</template>

<style lang="scss">
.tiptap {
  > * + * {
    margin-top: 0.75em;
  }
}

.editor-wrapper {
  min-width: 100%;
}
</style>
