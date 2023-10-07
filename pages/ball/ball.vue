<template>
	<view class="ball">
		
		<view  class="balls" v-for="p in balls" :key="p.id" >
			<image v-if="p.isShow" src="../../static/qiu.png" mode="" @click="eliminateBall(p.id)"></image>
			<image class="bomb" v-else-if="p.isBomb" src="../../static/bz.png" mode="" @click="eliminateBall(p.id)"></image>
		</view>
		<view>
			<u-popup :closeOnClickOverlay='false'  round='5' :show="showBomb" mode='center' @close="close">
			    <view class="titlebomb">击中炸弹</view>
				<view class="bombNum" style="text-align: center;">
					<view style="margin-bottom: 30rpx;text-align: center;">您被炸弹击中了哦</view>
		
					<image style="width: 210rpx;height: 210rpx;" src="https://pic.imgdb.cn/item/63b7f745be43e0d30eb4e7ae.png"></image>
					<view style='margin-top: 15rpx;'><u-button type='success' :text="bombNum>0?'继续':'再来一次'" @click="again"></u-button></view>
				</view>
			</u-popup>
			<u-popup :closeOnClickOverlay='false'  round='5' :show="show" mode='center' @close="close">
			    <view class="title">炸弹设置</view>
				<view class="bombNum">
					<view>炸弹个数：{{bombNum}}个</view>
					<view style="width: 100%;">
						<u-slider style='transform: scale(1.1);' min="1" max="30"  v-model="bombNum"></u-slider>
					</view>
					<view style='margin-top: 15rpx;'><u-button type='success' text="确定" @click="close"></u-button></view>
				</view>
			</u-popup>
		</view>
		<!-- <view style="width: 200rpx;height: 162rpx;background-color: red;"></view> -->
	</view>
</template>

<script>
	import nanoid from '../../utools/nanoid.js'
	export default {
		data() {
			return {
				balls:[],
				bomb:{},
				bombNum:1,
				bombAgain:1,
				show:true,
				showBomb:false,
				numbers:[]

			}
		},
		onLoad() {
			
			uni.setNavigationBarTitle({
					title: `剩余炸弹${this.bombNum}个`
				});
			
		},
		watch:{
			bombNum(value){
				uni.setNavigationBarTitle({
					title: `剩余炸弹${this.bombNum}个`
				});
			},
			show(value){
				if(value==false){
					this.addBalls()
				}
			}
		},
		methods: {
			// 将px转rpx，便于计算小球数量
			rpxTopx(px) {
			 
			  let deviceWidth = uni.getSystemInfoSync().windowWidth; //获取设备屏幕宽度
			 
			  let rpx = (750 / deviceWidth) * Number(px)
			 
			  return Math.floor(rpx);
			 
			},
			eliminateBall(id){
			    	this.balls.forEach((item)=>{
						// 找到点击的小球并让其消失
						if(item.id===id){
							
							item.isShow=false
							// 小球为炸弹，播放声音
							if(item.isBomb==true){
								
								// // 播放爆炸声音
								
								this.$Audio('bomAudio')
								this.bombNum--
								setTimeout(()=>{
									item.isBomb=false
									this.showBomb=true
								},600)
								return
							}
							this.$Audio('gulu')
							
						}
						
					})
			},
			close() {
			    this.show = false
				this.bombAgain=this.bombNum
			   
			},
			again(){
				if(this.bombNum<=0){
					this.balls=[]
					this.bombNum=this.bombAgain
					this.addBalls()
				}
			    this.showBomb=false
			},
			iscfu(num){
					let count=0
					this.numbers.forEach((item)=>{
						if(num!=item){
							count++
						}
					})
					if(count>=this.numbers.length){
						return true
					}else{
						return false
					}
				
			},
			addBalls(){
				
				let res = uni.getSystemInfoSync()
				let navBarHeight = res.statusBarHeight + 44 //顶部状态栏+顶部导航，大部分机型默认44px
				let rhright=(uni.getWindowInfo().windowHeight-navBarHeight)
				rhright=this.rpxTopx(rhright)
				// 纵向多少个小球
				let num=Math.floor(rhright/140)+1
				// 横向上多少个小球
				let numw=Math.floor(this.rpxTopx(uni.getWindowInfo().windowWidth)/140)
				
				// 生成炸弹
				let bomb
				let ball={}
				for(let i=0;i<this.bombNum;i++){
					for(let j=0;j<200;j++){
						bomb=uni.$u.random(0,num*numw)
						
						if(this.iscfu(bomb)){
							this.bomb[bomb]=bomb
							this.numbers.push(bomb)
							
							break;
						}
					}
					
				}
			
				// 生成小球
				setTimeout(()=>{
					for(let i=0;i<num*numw;i++){
						
							ball={
								id:nanoid(),
								isBomb:this.bomb[i]?true:false,//是否为炸弹，bomb炸弹对象中有没有
								isShow:true,
								xuhao:i
							}
						
						this.balls.push(ball)
					}	
					
				},200)
				
			}
		}
	}
</script>

<style lang="scss">
$ballwh:140rpx;
@keyframes bom {
      
      0% { transform:scale(0) }
      50% { transform:scale(1.8) }
      // 100% { transform:scale(0) }
    }
.title{
	width: 500rpx;
	text-align: center;
	font-size: 36rpx;
	margin-top: 40rpx;
}
.titlebomb{
	width: 500rpx;
	text-align: center;
	font-size: 46rpx;
	margin-top: 40rpx;
}
.bombNum{
	padding: 25rpx;
	margin-bottom: 25rpx;
	// text-align: center;
}
.balls{
	width: $ballwh;
	height: $ballwh;
	border-radius: 50%;
}
.balls image{
	width: $ballwh;
	height: $ballwh;
	border-radius: 50%;
}
.ball{
	display: flex;
	
	flex-wrap: wrap;
	// padding-top: 20rpx;
	justify-content: center;
}
.bomb{
	animation-name: bom;
	animation-duration: 1s;
	transform: scale(1.8);
	// transform: scale(0.1);
	// animation-timing-function:linear;
}
</style>
