import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')


Vue.filter('toMoneda', function (value) {
  if (typeof value !== "number") {
      value = parseFloat(value)
  }
  var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
  });
  
  return formatter.format(value);
  
});