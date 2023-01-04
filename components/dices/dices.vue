<template>
	<!-- <view> -->
		
		<view class="diceOut">
			
			<view class="diceN diceN1" v-if="nid===1">
				<view class="dice1">
					
				</view>
			</view>
			<view class="diceN diceN2" v-if="nid==2">
				<view class="dice26" style="align-self: flex-end;">
					
				</view>
				<view class="dice26"></view>
			</view>
			<view class="diceN diceN3" v-if="nid==3">
				<view class="dice26" style="align-self: flex-end;"></view>
				<view class="dice26" style="align-self: center;"></view>
				<view class="dice26"></view>
			</view>
			<view class="diceN diceN4" v-if="nid==4">
				<view class="dice26 dice4" style="margin-right: 20rpx;"></view>
				<view class="dice26 dice4"></view>
				<view class="dice26 dice4" style="margin-right: 20rpx;align-self: flex-end;"></view>
				<view class="dice26 dice4" style="align-self: flex-end;"></view>
			</view>
			<view class="diceN diceN5" v-if="nid==5">
				<view style="display: flex;justify-content: space-around;width: 90rpx;">
					<view class="dice26" style=""></view>
					<view class="dice26"></view>
				</view>
				<view class="dice26" style="align-self: center;"></view>
				<view style="display: flex;justify-content: space-around;width: 90rpx;">
					<view class="dice26" style="align-self: flex-end;"></view>
					<view class="dice26" style="align-self: flex-end;"></view>
				</view>
			</view>
			<view class="diceN diceN4" v-if="nid==6">
				<view class="dice26" style="margin-right: 20rpx;"></view>
				<view class="dice26"></view>
				<view class="dice26" style="margin-right: 20rpx;"></view>
				<view class="dice26" ></view>
				<view class="dice26" style="margin-right: 20rpx;"></view>
				<view class="dice26"></view>
				
			</view>
		</view>
		
	<!-- </view> -->
</template>
<script>
	export default {
		name:"dices",
		props:{
			nid:{
				type:Number,
				default:0
			}
		},
		data() {
			return {
				
			};
		},
		mounted() {
			console.log('id',this.nid);
		},
		
		
	}
</script>

<style lang="scss">
$dice2356:#2626C4;
$dicehwidth:90rpx;
$dicepad:15rpx;

.diceOut{
	/* margin: 100px; */
	width: $dicehwidth;
	border: 0.5rpx solid rgba(0,0,0,0.1);
	// position: absolute;
	// box-shadow: 1rpx 1rpx 1rpx #E4E5E8;
	box-shadow: 0px 0px 15px 5px rgba(0,0,0,0.1);
	height: $dicehwidth;
	// bottom: 100rpx;
	// right: 0rpx;
	border-radius: 16rpx;
	background-color: #E4E5E8;
	animation-name: dice;
	animation-duration: 0.9s;
}
.diceN{
	position: absolute;
	width: $dicehwidth;
	height: $dicehwidth;
	background-color: #fff;
	border-radius: 50%;
}
.diceN1{
	display: flex;
		justify-content: center;
		align-items: center;
	
}
.diceN2{
	display: flex;
	flex-direction: column;
	padding: $dicepad;
	box-sizing: border-box;
	justify-content: space-around; 
	
	/* align-items: center; */
}
/* .diceN2:nth-child(2){
	align-self: flex-end;
} */
.diceN3{
	display: flex;
	justify-content: space-around;
	flex-direction: column;
	/* align-items: center; */
	padding: $dicepad;
	box-sizing: border-box;
}
.diceN4{
	display: flex;
	justify-content: space-around;
	flex-wrap: wrap;
	
	/* align-items: ; */
	/* flex-direction: column; */
	/* align-items: center; */
	padding: $dicepad;
	box-sizing: border-box;
}
.diceN5{
	display: flex;
	justify-content: space-around;
	// flex-wrap: wrap;
	
	flex-direction: column;
	align-items: center;
	// /* align-items: center; */
	padding: $dicepad;
	box-sizing: border-box;
}

.dice1{
	width: 30rpx;
	height: 30rpx;
	border-radius: 50rpx;
	background-color: red;
}
.dice4{
	background-color: red !important;
}
.dice26{
	width: 20rpx;
	height: 20rpx;
	border-radius: 50%;
	background-color: $dice2356;
}


</style>
