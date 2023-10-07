<template>
	<view class="index" :class="theme?'indexbj1':'indexbj2'">
		<login></login>
		<view class="set">
			
			<uni-icons type="gear" color="#fff" size="26" @click="goset"></uni-icons>
			<uni-icons type="compose" color="#fff" size="26" @click="golist"></uni-icons>
			
		</view>
		<view style="width: 100%;text-align: center;margin-top: 20rpx;margin-bottom: 40rpx;">
			<text style="color: #EBE6E6;font-size: 45rpx;">{{defaut.title}}</text>
		</view>
		<view style="width: 100%;text-align: center;margin-bottom: 80rpx;">
			<text style="font-size: 40rpx;color:#D81E06;padding: 10rpx 20rpx 10rpx 20rpx;border-radius: 15rpx;">{{result}}</text>
		</view>
	    <LuckyWheel
	      ref="myLucky"
	      width="600rpx"
	      height="600rpx"
	      :blocks="blocks"
	      :prizes="prizes"
		  :defaultConfig='defaultConfig'
	      :buttons="buttons"
	      :defaultStyle="defaultStyle"
	      @start="startCallBack"
	      @end="endCallBack"
	    />
		<view style="width: 100%;text-align: center;margin-top: 120rpx;">
			<text class="setbtn" @click="setbtn">重置转盘</text>
		</view>
	  </view>
</template>

<script>
	// #ifdef  MP-WEIXIN
	var plugin = requirePlugin("WechatSI")
	let manager = plugin.getRecordRecognitionManager()
	// #endif
	
	
	import LuckyWheel from '@lucky-canvas/uni/lucky-wheel'
	import {mapState} from 'vuex'
	let a=110
	// import uni-icons from '@/uni_modules/uni-icons/components/uni-icons/uni-icons.vue'
	import colors from '../../utools/color.js'
	  export default {
	    components: { LuckyWheel },
	    data () {
	      return {
			  numbers:[],
			  result:'准备中...',
			  
			  sjindex:null,
			  count:0,
			defaultConfig: {
			        stopRange: 0.9,
					accelerationTime:2000,
					decelerationTime:2500,
					gutter: '2px',
					speed:30
			 },
			defaultStyle:{
				fontColor:'#fff'
			},
	        blocks: [{ padding: '13px', background: '#ECECF1'}],
	        prizes: [],
			prize:[],
	        buttons: [
				{
				        radius: '45%',
				        imgs: [{
				          src: '/static/85.png',
				          width: '120%',
				          top: '-130%'
				        }]
				      }
	        ],
	      }
	    },
		computed:{
			// ...mapState(['cfu'])
			...mapState(['cfu','zdong','theme','defaut','voice']),
		},
		watch:{
		    defaut(){
				console.log('变量');
				this.prizes=this.defaut.prizes
			}	
		},
		onLoad() {
			// var plugin = requirePlugin("WechatSI")
			// let manager = plugin.getRecordRecognitionManager()
			
            this.$store.commit('SETDICEVOICE',true)
			console.log(this.$store.state);
			this.$store.commit('UNISETLIST',uni.getStorageSync('lists')?uni.getStorageSync('lists'):[])
			console.log(uni.getStorageSync('lists'));
			
			this.prizes=this.defaut.prizes
			
			// this.prizes.push({index:0, fonts: [{ text: '高兴', top: '20%',lengthLimit:'70%' }], background: colors[0],range:10 },)
		},
	    methods: {
		  say(){
			        console.log(a);
			        let _this = this;
			        plugin.textToSpeech({
			            lang: "zh_CN",
			            tts: true,
			            content: this.result,
			            success: function(res) {
			        		_this.pay = true
			                // let _this = this;
			                _this.innerAudioContext = uni.createInnerAudioContext();
			                _this.innerAudioContext.src = res.filename
			                _this.innerAudioContext.play()
			                _this.innerAudioContext.onPlay(() => {
			                  console.log('开始播放');
			                });
			                _this.innerAudioContext.onEnded(() => {
			                  console.log('播放结束');
			                  _this.pay = false
			                });
			        
			            },
			            fail: function(res) {
			                console.log("fail tts", res)
			            }
			        })
			        
		  },
		  golist(){
			uni.navigateTo({
				url:'/pages/list/list'
			})  
		  },
		  setbtn(){
			  
			  	this.numbers=[]
				this.prizes.forEach((item,index)=>{
					item.background=colors[index] || colors[1]
				})
			},
			goset(){
				this.setbtn()
			    uni.navigateTo({
			    	url:'/pages/set/set'
			    })	
			},
	      // 点击抽奖按钮触发回调
	      startCallBack () {
	        // 先开始旋转
			// console.log(data);
			if(!this.cfu){
				if(this.numbers.length>=this.prizes.length){
					uni.showToast({
						title:'没有选项了o(╥﹏╥)o'
					})
					return
				} 
			}
			if(this.zdong){
				uni.vibrateShort({
					success: function () {
						console.log('success');
					}
				});
			}
			
			this.result='准备中...'
	        this.$refs.myLucky.play()
	        // 使用定时器来模拟请求接口
	        
	          // 假设后端返回的中奖索引是0
			this.sjindex=Math.floor(Math.random()*this.prizes.length)
			//防止重复中奖
	       if(!this.cfu){
			   for(let i=0;i<this.prizes.length;i++){
			   	this.numbers.forEach((item)=>{
			   		if(item==this.sjindex){
			   			this.sjindex=Math.floor(Math.random()*this.prizes.length)
			   		}
			   	})
			   }
		   }
	          // 调用stop停止旋转并传递中奖索引
	        this.$refs.myLucky.stop(this.sjindex)
			
	       
	      },
	      // 抽奖结束触发回调
	      endCallBack (prize) {
	        // 奖品详情
			
			
			this.result=prize.fonts[0].text
			
			
			if(!this.cfu){
				this.numbers.push(this.sjindex)
				setTimeout(()=>{
					this.prizes[this.sjindex].background='#CAC5C7'
					
				},200)
				
			}
			// 是否播放结果
			// #ifdef  MP-WEIXIN
			if(this.voice){
				this.say()
			}
			// #endif
			
			
			// this.$forceUpdate()
			// this.$set(this.prizes[this.sjindex],'background','#CAC5C7')
	        console.log(prize.fonts[0].text)
	      }
	    }
	  }
</script>
<style>
	.setbtn{
		width: 200rpx;
		font-size: 35rpx;
		background-color: #EE3E90;
		padding: 15rpx 60rpx;
		color: #fff;
		border-radius: 50rpx;
		
	}
	.set{
		/* width: 100%; */
		/* background-color: red; */
		margin-top: 5rpx;
		height: 50rpx;
		padding-top: 10rpx;
		display: flex;
		padding-right: 20rpx;
		padding-left: 20rpx;
		justify-content: space-between;
	}
	.index{
		overflow: hidden;
		width: 100%;
		min-height: 100vh;
		/* padding-bottom: ; */
		/* background-repeat:repeat-y; */
		background-size:100% 100%;
		background-repeat:no-repeat;
	}
	.indexbj2{
		background-image: url('https://pic.imgdb.cn/item/63b04a972bbf0e7994641e9e.jpg');
	}
	.indexbj1{
		background-image: url('https://pic.imgdb.cn/item/63b04ef42bbf0e799469e562.jpg');
	}
</style>