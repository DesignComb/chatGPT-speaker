import { createApp } from 'vue'
import { createPinia } from 'pinia'

import './style.css'
import App from './App.vue'

import index from './router'
import 'boxicons'
import 'boxicons/css/boxicons.min.css';

createApp(App)
    .use(index)
    .use(createPinia())
    .mount('#app')
