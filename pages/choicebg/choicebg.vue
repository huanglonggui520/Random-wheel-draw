<template>
	<view style="padding: 30rpx;display: flex;justify-content: space-between;">
		<view class="bg" :class="!theme?'bgr':'bgc'" @click="bg(0)">
			<image src="https://pic.imgdb.cn/item/63b04a972bbf0e7994641e9e.jpg"></image>
		</view>
		<view class="bg" :class="theme?'bgr':'bgc'"  @click="bg(1)">
			<image src="https://pic.imgdb.cn/item/63b04ef42bbf0e799469e562.jpg"></image>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				
			}
		},
		computed:{
		    ...mapState(['theme'])	
		},
		methods: {
			bg(value){
				this.$store.commit('SETTHEME',value)
			},
			
		}
	}
</script>

<style>
.bg{
	width: 300rpx;
	height: 430rpx;
	
	border-radius: 15rpx;
}
image{
	width: 100%;
	height: 100%;
	/* border-radius: 15rpx; */
}
.bgr{
	border: 10rpx solid #D2E50D;
}
.bgc{
	border: 10rpx solid #fff;
}
</style>
