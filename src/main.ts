import './assets/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { VueFire, VueFireAuth } from 'vuefire'
import { firebaseApp } from '@/firebase/init'

import ElementPlus from 'element-plus'
import ElementTiptapPlugin from 'element-tiptap-vue3-fixed'
// import ElementTiptap's styles
import 'element-tiptap-vue3-fixed/lib/style.css'
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify'
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

app.use(Vue3Toastify, {
  autoClose: 1500
} as ToastContainerOptions)

app.mount('#app')
