import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import uView from "uview-ui";
import store from './store'
import mockLocation from 'mock-location';
Vue.use(mockLocation);
Vue.use(uView);
Vue.config.productionTip = false
import music from 'utools/music.js'
// 将声音挂在到Vue
Vue.prototype.stop=music.stop
Vue.prototype.$Audio = music.Audio
App.mpType = 'app'
const app = new Vue({
    ...App,
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif