<template>
	<view style="padding: 15rpx;display: flex;justify-content: space-around">
		<view class="list"@click='godice'>
			掷骰子
		</view>
		<view class="list" @click="gofinger">
			金手指
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
			}
		}
	}
</script>

<style>
.list{
	width: 46%;
	height: 250rpx;
	background-color: red;
	border-radius: 10rpx;
}
</style>
