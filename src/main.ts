import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles.css'
import './project-artwork.css'

// A missing image leaves its frame's surface showing instead of the browser's broken-image icon.
document.addEventListener('error', (event) => {
  if (event.target instanceof HTMLImageElement) event.target.classList.add('image-error')
}, true)

createApp(App).use(router).mount('#app')
