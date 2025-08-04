import PrimeVue from 'primevue/config';

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Aura from '@primeuix/themes/aura';
import { createPinia } from 'pinia';

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)

app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  }

});


app.mount('#app')
