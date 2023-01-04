import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import uView from "uview-ui";
import store from './store'
Vue.use(uView);
Vue.config.productionTip = false
var music = null;
Vue.prototype.stop=function(){
	if(music!=null){
		music.stop()
	}
}
Vue.prototype.duAudio = function() {
 
    music = uni.createInnerAudioContext(); //创建播放器对象
 
    music.src = "/static/12663.mp3";
 
    
	music.play(); //执行执行播放
	
 
    music.onEnded(() => {
 
        //音频播放结束
 
        music = null;
 
});}
Vue.prototype.ScanAudio = function() {
 
    var music = null;
 
    music = uni.createInnerAudioContext(); //创建播放器对象
 
    music.src = "/static/13019.mp3";
 
    music.play(); //执行执行播放
 
    music.onEnded(() => {
 
        //音频播放结束
 
        music = null;
 
    });}
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