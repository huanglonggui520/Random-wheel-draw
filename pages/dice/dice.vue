<template>
	<view class="dice">
		
		<view v-for="(p,index) in dices" id='pzid'>
			<dices :class='animationstrue'   class='animations' :style='{left:p.left,bottom:p.bottom}'  :nid='p.nid'></dices>
		</view>
		
		<view class="bot" >
			<view class="scores">
					点数：{{scores}}
			</view>
			<view class="add" @click="start">
					掷
			</view>
			
			<view  @click="set">
					<uni-icons type="gear" color='#595858' size="40"></uni-icons>
			</view>
		</view>
		
	</view>
</template>

<script>
	import dices from '../../components/dices/dices.vue'
	import nanoid from "../../utools/nanoid.js"
	import {mapState} from 'vuex'
	export default {
		components:{
		    dices	
		},
		data() {
			return {
				
				dices:[],
				animationstrue:'',
				scores:0
				// id
		
			}
		},
		computed:{
		    ...mapState(['diceNum','diceVoice'])
		},
		
		methods: {
			move(e){
				console.log(e.target.className);
				// let x=(e.touches[0].clientX - 72)*2
				// let y=(e.touches[0].clientY -65)*2
				// console.log(e);
				// this.dices.forEach((item)=>{
				// 	if(zid==item.zid){
				// 		item.left=x
				// 		item.bottom=y
				// 	}
				// })
				// console.log(this.dices);
			},
			
			set(){
				this.animationstrue=''
			    uni.navigateTo({
			    	url:'/pages/diceSet/diceSet'
			    })	
			},
			start(){
				console.log(this);
				let score=0
				this.scores=0
				this.animationstrue=''
				if(this.diceVoice){
					this.$Audio('ScanAudio')
					
				}
				this.dices=[]
				let count=0
				for(let i=0;i<this.diceNum;i++){
					let nid=Number(Math.floor(Math.random()*6+1))
					let left=Math.floor(Math.random()*600+30)
					let bottom=Math.floor(Math.random()*800+200)
					let zid=nanoid()
					let obj={
						left:'45%',
						bottom:'-150rpx',
						nid,
						zid
					}
					this.dices.push(obj)
					
					
					setTimeout(()=>{
						
						this.dices.forEach((item)=>{
							if(item.zid==zid){
								this.animationstrue='animationstrue'
								item.left=left+count+'rpx'
								item.bottom=bottom+count+'rpx'
								score+=nid
							}
						})
						
					},100)
					setTimeout(()=>{
						this.scores=score
					},600)
					console.log(this.dices);
					count+=10
				}
			
			}
		}
	}
</script>

<style lang="scss">
	@keyframes dice {
	  from {transform: rotateZ(0deg);}
	  to {transform: rotateZ(360deg);}
	  
	}
.animations{
	left: 44%;
	bottom: 0rpx;
	position: absolute;
	
}
.animationstrue{
	animation-name: dice;
	animation-duration: 1.4s;
	// transform: translatex(90rpx);
	transition: bottom 1.2s,left 1.2s;
}

.bot{
	position: fixed;
	padding-left: 30rpx;
	box-sizing: border-box;
	padding-right: 30rpx;
	// justify-content: center;
	align-items: center;
	width: 100%;
	bottom: 50rpx;
	display: flex;
	justify-content: space-between;
}
.dice{
	height: 100vh;
	position: relative;
	// padding-left: 100rpx;
	// padding-top: 100rpx;
	// /* background-position: center; */
	background-size:100% 100%;
	 // position: relative;
	background-repeat:no-repeat;
	background-position: center;
	overflow: hidden;
	background-image: url('https://pic.imgdb.cn/item/63b818fbbe43e0d30e0fe1a1.jpg');
}

.scores{
	
	color: #595858;
	font-size: 40rpx
}
.add{
	background-color: #232E80;
	color: #fff;
	/* font-size: 110rpx; */
	width: 100rpx;
	height: 100rpx;
	border-radius: 50%;
	font-size: 44rpx;
	text-align: center;
	line-height: 100rpx;
	
}
</style>
