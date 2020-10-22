import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'

import App from './components/App.vue'
import Students from './components/Students.vue'
import StudentInfo from './components/StudentInfo.vue'
import Converter from './components/Converter.vue'
import NovaPoshta from './components/NovaPoshta.vue'

const routes = [
   { path: '/', component: Students },
   { path: '/student-info/:id', component: StudentInfo, props: true},
   { path: '/converter/', component: Converter },
   { path: '/nova-poshta/', component: NovaPoshta },
]

const router = new VueRouter({
   routes
})

Vue.use(VueRouter)
Vue.use(VueAxios, axios)

new Vue({
   render: h => h(App),
   el: '#app',
   router
})
