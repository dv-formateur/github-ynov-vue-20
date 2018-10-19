import Vue from 'vue'
import App from './App.vue'
import VueRangedatePicker from 'vue-rangedate-picker'

Vue.use(VueRangedatePicker)
Vue.component('DatePicker', VueRangedatePicker)
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
