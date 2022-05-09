import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import 'normalize.css'
import './assets/pub/public.css'
import * as API from './http/api'
import MBX from './components/MBX'
import moment from 'moment'
import VueQuillEditor from 'vue-quill-editor'
import 'nprogress/nprogress.css'
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import * as echarts from 'echarts'

Vue.use(VueQuillEditor)

Vue.prototype.$axios = axios
Vue.prototype.$echarts = echarts
Vue.prototype.$API = API
Vue.config.productionTip = false
Vue.component('MBX', MBX)
Vue.filter('GLQ', function (v) {
  return moment(v * 1000).format('YYYY-MM-DD hh:mm:ss')
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
