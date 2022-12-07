import Vue from 'vue'
import vueDebounce from 'vue-debounce'

Vue.use(vueDebounce)


// Setting a different event to listen to
Vue.use(vueDebounce, {
  listenTo: 'input'
})

// Listening to multiple events
Vue.use(vueDebounce, {
  listenTo: ['input', 'keyup']
})
