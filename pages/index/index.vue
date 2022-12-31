<template>
	<view>
		<view class="set">
			<uni-icons type="gear" size="26" @click="goset"></uni-icons>
			<uni-icons type="compose" size="26"></uni-icons>
		</view>
		<view style="width: 100%;text-align: center;margin-top: 20rpx;margin-bottom: 40rpx;">
			<text style="color: #878A87;font-size: 45rpx;">晚上吃什么?</text>
		</view>
		<view style="width: 100%;text-align: center;margin-bottom: 80rpx;">
			<text style="font-size: 35rpx;color:#288FF5;padding: 10rpx 20rpx 10rpx 20rpx;border-radius: 15rpx;">{{result}}</text>
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
	import LuckyWheel from '@lucky-canvas/uni/lucky-wheel'
	let that
	// import uni-icons from '@/uni_modules/uni-icons/components/uni-icons/uni-icons.vue'
	import colors from '../../utools/color.js'
	  export default {
	    components: { LuckyWheel },
	    data () {
	      return {
			  numbers:[],
			  result:'准备中...',
			  sjindex:null,
			  zdong:true,
			  cfu:true,
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
	        prizes: [
	          {index:0, fonts: [{ text: '大白菜', top: '20%',lengthLimit:'70%' }], background: colors[0],range:10 },
	          { index:1,fonts: [{ text: '火锅', top: '10%' }], background: colors[1],range:10 },
	          { index:2,fonts: [{ text: '汉堡', top: '10%' }], background: colors[2],range:10 },
	          { index:3,fonts: [{ text: '白米饭', top: '10%' }], background: colors[3] ,range:10},
			  { index:3,fonts: [{ text: '烤串', top: '10%' }], background: colors[4] ,range:10},
	        ],
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
		onLoad() {
			
			console.log(uni.getStorageSync('cfu'));
			uni.setStorageSync('cfu',true)
			uni.setStorageSync('zdong',true)
			uni.setStorageSync('sy',true)
			uni.$on('getset',(value)=>{
				console.log('cc',value);
				this.cfu=value
			})
			uni.$on('getsetzdong',(value)=>{
				this.zdong=value
			})
			// this.prizes.push({index:0, fonts: [{ text: '高兴', top: '20%',lengthLimit:'70%' }], background: colors[0],range:10 },)
		},
	    methods: {
		  say(){
			        const synth = window.speechSynthesis
			        const msg = new SpeechSynthesisUtterance()
			        msg.text = this.result
			        msg.lang = 'zh-CN'
			        synth.speak(msg)
			        
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
			this.say()
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
		display: flex;
		padding-right: 20rpx;
		padding-left: 20rpx;
		justify-content: space-between;
	}
</style>