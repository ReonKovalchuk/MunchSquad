<!-- <script setup>
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'

const editor = useEditor({
  content: '<p>I’m running Tiptap with Vue.js. 🎉</p>',
  extensions: [StarterKit, Document, Paragraph, Text]
})

</script>

<template>
  <editor-content :editor="editor" />
</template> -->

<template>
  <el-tiptap v-model:content="content" :extensions="extensions" output="html" :locale="ru" />
</template>

<script setup>
import { ref } from 'vue'
import ru from 'element-tiptap/lib/locales/en'
import {
  // necessary extensions
  Doc,
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
  Doc,
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

// editor's content
const content = ref(`
  <h1>Heading</h1>
  <p>This Editor is awesome!</p>
`)
</script>
