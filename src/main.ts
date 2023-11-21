import './assets/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { VueFire, VueFireAuth } from 'vuefire'
import { firebaseApp } from '@/firebase/init'

import ElementPlus from 'element-plus'
import ElementTiptapPlugin from 'element-tiptap'

import 'element-tiptap/lib/style.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueFire, {
  firebaseApp,
  modules: [VueFireAuth()]
})
// use ElementPlus's plugin
app.use(ElementPlus)
// use this package's plugin
app.use(ElementTiptapPlugin)

app.mount('#app')
