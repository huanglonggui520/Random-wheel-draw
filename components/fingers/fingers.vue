<template>
	<view class="big1" 
	:class="{'bg0':bgColor==='#5460EF','bg1':bgColor==='#18B536','bg2':bgColor==='#EE3E14','bg3':bgColor==='#E363F8','bg4':bgColor==='#1497EE','show':show==true}"
	>
		<view 
		class="big2" 
		:style="{backgroundColor:bgColor}"
		>
			<view class="big3" :style="{backgroundColor:bgColor}"></view>
			<view class="big3 big301" :style="{backgroundColor:bgColor}"></view>
			<view class="big3 big302" :style="{backgroundColor:bgColor}"></view>
			<view class="big3 big303" :style="{backgroundColor:bgColor}"></view>
			<view class="big3 big304" :style="{backgroundColor:bgColor}"></view>
			<view class="big3 big305" :style="{backgroundColor:bgColor}"></view>
			<view class="big3 big306" :style="{backgroundColor:bgColor}"></view>
			<view class="big3 big307" :style="{backgroundColor:bgColor}"></view>
			<view class="big3 big308" :style="{backgroundColor:bgColor}"></view>
			<view class="big3 big309" :style="{backgroundColor:bgColor}"></view>
			<view class="big3 big3010" :style="{backgroundColor:bgColor}"></view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "fingers",
		data() {
			return {
				
				boder6:'15rpx solid red'
			};
		},
		computed:{
			// boder6(){
			// 	return '15rpx solid'+this.bgColor
			// }
		},
		methods:{
		    
		},
		props:{
			bgColor:{
				type:String,
				default:()=>{
					return ''
				}
			},
			show:{
				type:Boolean,
				default:()=>{
					return false
				}
			}
		}
		
	}
</script>

<style lang="scss">
	$big1wh:260rpx;
	$big2wh:180rpx;
	$big3wh:20rpx;
    @keyframes finger {
      
      0% { transform:rotate(0) scale(0.8) }
      50% { transform:rotate(60deg) scale(1.2) }
      100% { transform:rotate(100deg) scale(0.8) }
    }
	.big3 {
		width: $big3wh;
		height: $big3wh;
		position: absolute;
		border-radius: 50%;
		// background-color: red;
	}

	.big301 {
		bottom: 50rpx;
		left: -26rpx;
	}

	.big302 {
		bottom: -0rpx;
		left: 4rpx;

	}

	.big303 {
		bottom: -26rpx;
		left: 56rpx;
	}

	.big304 {
		bottom: -24rpx;
		left: 120rpx;
	}

	.big305 {
		bottom: 16rpx;
		left: 170rpx;
	}

	.big306 {
		bottom: 74rpx;
		left: 190rpx;
	}

	.big307 {
		bottom: 140rpx;
		left: 170rpx;
	}

	.big308 {
		bottom: 182rpx;
		left: 120rpx;
	}
    .bg0{
		border: 15rpx solid #5460EF;
	}
	.bg1{
		border: 15rpx solid #18B536;
	}
	.show{
		box-shadow: 0px 0px 50px 15px #F8E806;
	}
	.bg2{
		border: 15rpx solid #EE3E14;
	}
	.bg3{
		border: 15rpx solid #E363F8;
	}
	.bg4{
		border: 15rpx solid #1497EE;
	}
	.big309 {
		bottom: 188rpx;
		left: 56rpx;
	}

	.big3010 {
		bottom: 110rpx;
		left: -26rpx;
	}

	.big2 {
		width: $big2wh;
		position: relative;
		height: $big2wh;
		background-color: red;
		// box-shadow: 0px 0px 800px #F8E806;
		border-radius: 50%;
	}
    .color1{
		background-color: red;
	}
	.color2{
		background-color: #1E06F8;
		
	}
	.big1 {
		width: $big1wh;
		animation-name: finger;
		animation-duration: 1.5s;
		// transform: scale(0.1);
		animation-timing-function:linear;
		height: $big1wh;
		
		transform: scale(0.6);
		display: flex;
		animation-iteration-count: infinite;
		justify-content: center;
		
		align-items: center;
		border-radius: 50%;
		// border: 15rpx solid red;
		background-color: transparent;
	}
</style>
