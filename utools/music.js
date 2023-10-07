var music = null;
// 音乐列表
var musics={
	duAudio:'/static/12663.mp3',
	ScanAudio:'/static/13019.mp3',
	bomAudio:'/static/15075.mp3',
	gulu:'/static/12899.mp3'
}
export default {
	Audio(id) {
	    music = uni.createInnerAudioContext(); //创建播放器对象
	 
	    music.src = musics[id];
	 
	    
		music.play(); //执行执行播放
		
	 
	    music.onEnded(() => {
	 
	        //音频播放结束
	 
	        music = null;
	 
	});},
	
		stop(){
			if(music!=null){
				music.stop()
			}
		},
		
	
}