import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { router } from './route';


createApp(App)
	.use(router)
	.directive('focus', {
		mounted(el) {
			el.focus();
		}
	})
	.mount('#app');
