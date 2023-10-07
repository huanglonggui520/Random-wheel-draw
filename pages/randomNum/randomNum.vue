<template>
	<view class="Num">
		<view class="numDiv">
			<view class="showNum">
				<view class="result" v-if="!numbers.length">结果展示区</view>
				<view class="Nums" v-for="p in numbers">{{p}}</view>
				
			</view>
			<view style="margin-top: 20rpx;">
				<u-line length="100%"></u-line>
			</view>
			<view class="set">
				<view style="display: flex;align-items: center;">
					<view style="margin-right: 8rpx;">不重复</view>
					<u-switch   size='18' inactiveColor='#F3F3F3'
					activeColor='#FF9900'  v-model="cfu"></u-switch>
				</view>
				<view style='display: flex;align-items: center;'>
					<view style="margin-right: 8rpx;">排序</view>
					<u-switch @change="change"  size='18' inactiveColor='#F3F3F3'
					activeColor='#FF9900'  v-model="paix"></u-switch>
				</view>
			</view>
			<view>
				<u-line length="100%"></u-line>
			</view>
			<view class="sc">
				<view class="ges">
					<view style="margin-right: 20rpx;">生成个数</view>
					<view style="width: 60%;">
						<u--input
						    type='number'
						    border="surround"
						    v-model="ges"
						    
						  ></u--input>
					</view>
				</view>
				<view class="ges" style="margin-top: 20rpx;">
					<view style="margin-right: 20rpx;">生成区间</view>
					<view style="width: 30%;margin-right: 20rpx;">
						<u--input
						    type='number'
						    border="surround"
						    v-model="min"
						    
						  ></u--input>
					</view>
					~
					<view style="width: 30%;margin-left: 20rpx;">
						<u--input
						    type='number'
						    border="surround"
						    v-model="max"
						    
						  ></u--input>
					</view>
				</view>
			</view>
			<!-- <u-line color="#2979ff"></u-line> -->
		</view>
		<view class="bot">
			<view style="width: 70%;margin-right: 20rpx;" @click="start"><u-button text="生成" type="primary"></u-button></view>
			<view style="width: 20%;" @click="end"><u-button text="重置" type="warning" plain ></u-button></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cfu:false,
				ges:1,
				min:1,
				max:10,
				paix:false,
				numbers:[],
				cfuNum:[-1]
			}
		},
		methods: {
			change(){
			    this.numbers.sort((a,b)=>{
					return a-b
				})
			},
			start(){
				this.paix=false
				if(!this.check()) return
				let num
				if(this.cfu){
					outer:
					for(let j=0;j<this.ges;j++){
						for(let i=0;i<=130;i++){
							num=uni.$u.random(Number(this.min), Number(this.max))
							this.cfuNum.unshift(num)
							if(this.isCfu(num)){
								this.numbers.push(num)
								break;
							}
							if(i>=130){
								uni.showToast({
									title:'已无不重复数字，建议重置',
									icon:"none"
								})
								break outer;
							}
						}
					}
				}else{
					for(let j=0;j<this.ges;j++){
							   num=uni.$u.random(Number(this.min), Number(this.max))
								this.numbers.push(num)
							}
						
					}
				
			},
			check(){
			    if(this.ges>120 || this.numbers.length>120){
					uni.showToast({
						title:'最多只能生成120个数!',
						icon:"none"
					})
					return false
				}
				if(this.cfu  && this.max-this.min+1<this.ges){
					uni.showToast({
						title:'该区间没有那么多可重复数字',
						icon:"none"
					})
					return false
				}
				if(this.ges<=0){
					uni.showToast({
						title:'生成的数字个数必须大于0',
						icon:"none"
					})
					return false
				}
				if(this.max<0 || this.min<0){
					uni.showToast({
						title:'生成区间暂不支持负数'
					})
				}
				if(this.min>this.max){
					uni.showToast({
						title:'区间设置有误,请重试',
						icon:"none"
					})
					return false
				}
				return true
			},
			isCfu(num){
				let count=1
			    this.cfuNum.forEach((item)=>{
					if(num!=item){
						count++
					}
				})
				if(count>=this.cfuNum.length){
					return true
				}else{
					return false
				}
			},
			end(){
				this.numbers=[]
				this.paix=false
				this.cfuNum=[]
			}
		}
	}
</script>

<style>
.bot{
	margin-top: 20rpx;
	display: flex;
}
.ges{
	display: flex;
	align-items: center;
}
.sc{
	padding: 25rpx 15rpx;
}
	.set{
		display: flex;
		justify-content: space-between;
		padding: 25rpx 15rpx;
		
		color: #7E8182;
	}
.numDiv{
	width: 100%;
	min-height:500rpx;
	/* max-height: ; */
	padding: 35rpx;
	box-sizing: border-box;
	background-color: #fff;
	border-radius: 15rpx;
	
}
.Nums{
	width: 60rpx;
	height: 60rpx;
	margin-top: 10rpx;
	background-color: red;
	border-radius: 50%;
	margin-right: 8rpx;
	color: #fff;
	text-align: center;
	line-height: 60rpx;
}
.result{
	margin-left: 50%;
	transform: translateX(-50%);
	font-size: 36rpx;
	line-height: 160rpx;
}
.showNum{
	width: 100%;
	min-height: 160rpx;
	display: flex;
	/* max-height: 400rpx; */
	
	text-align: center;
	/* justify-content: center; */
	flex-wrap: wrap;
}
.Num{
	padding: 20rpx;
}
</style>
