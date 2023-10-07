<template>
	<view class="more">
		<view class="list"@click='godice' style="background-color: #EC9B15;">
			<view>掷骰子</view>
			<view style="font-size: 30rpx;margin-top: 10rpx;">比一比谁的骰子点数大</view>
		</view>
		<view class="list" @click="gofinger" style="background-color: #07E832;">
			<view>指尖轮盘</view>
			<view style="font-size: 30rpx;margin-top: 10rpx;">比一比手气</view>
		</view>
		<view class="list" @click="goNum" style="background-color: #08BCDB;">
			<view>生成随机数</view>
			<view style="font-size: 30rpx;margin-top: 10rpx;">不知道选哪个数字?我来帮你</view>
		</view>
		<view class="list" @click="goBall" style="background-color: #DB4A08;">
			<view>不要点炸弹</view>
			<view style="font-size: 30rpx;margin-top: 10rpx;">看谁先点到炸弹</view>
		</view>
		<view class="list" @click="goLogin" style="background-color: #DB4A08;">
			<view>微信登录</view>
			<view style="font-size: 30rpx;margin-top: 10rpx;">看谁先点到炸弹</view>
		</view>
		<view class="list" @click="goonLogin" style="background-color: #DB4A08;">
			<view>微信登录</view>
			<view style="font-size: 30rpx;margin-top: 10rpx;">看谁先点到炸弹</view>
		</view>
		<!-- <view class="list" @click="gocs">
			
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
			godice(){
				uni.navigateTo({
					url:'/pages/dice/dice'
				})
			},
			gofinger(){
				uni.navigateTo({
					url:"/pages/finger/finger"
				})
			},
			gocs(){
				uni.navigateTo({
					url:"/pages/cs/cs"
				})
			},
			goNum(){
				uni.navigateTo({
					url:"/pages/randomNum/randomNum"
				})
			},
			goBall(){
				uni.navigateTo({
					url:"/pages/ball/ball"
				})
			},
			goLogin(){
				uni.navigateTo({
					url:'/pages/wxLogin/wxLogin'
				})
			},
			goonLogin(){
				uni.navigateTo({
					url:'/pages/onLogin/onLogin'
				})
			}
		}
	}
</script>

<style>
.list{
	width: 48%;
	height: 170rpx;
	color: #fff;
	margin-top: 20rpx;
	background-color: red;
	padding: 20rpx;
	box-sizing: border-box;
	font-size: 35rpx;
	border-radius: 20rpx;
}
.more{
	
	padding: 15rpx;
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
}
</style>
