import Vue from 'vue'
import App from './App.vue'
import './plugins/formulate'
import './plugins/vselect'
import './plugins/axios'
import "tailwindcss/tailwind.css"
import "./assets/formulate.scss"
import './registerServiceWorker'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
