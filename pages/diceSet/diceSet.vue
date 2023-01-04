<template>
	<view>

		<u-cell-group>
			<u-cell title="骰子个数" :value="diceNum" :isLink="true" @click="show = true"></u-cell>
			<u-cell title="音效">
				<u-switch  slot="right-icon" size='20' inactiveColor='#F3F3F3'
					activeColor='#FF9900' @change='setVoice' v-model="diceVoiceSet"></u-switch>
			</u-cell>
		</u-cell-group>
		<u-popup :closeable='true' mode="center" :round="5" :show="show" @close="close" @open="open">
			<text style="font-size: 36rpx;padding: 20rpx;width: 600rpx;">选择骰子个数</text>
			<u-cell-group >
				<u-cell :title="p" v-for="p in list" @click='close(p)'></u-cell>
			</u-cell-group>
		</u-popup>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				show: false,
				list:[1,2,3,4,5,6],
				diceVoiceSet:true
			}
		},
		computed:{
			...mapState(['diceNum','diceVoice'])
		},
		onLoad() {
			this.diceVoiceSet=this.diceVoice
		},
		methods: {
			open() {
				// console.log('open');
			},
			setVoice(){
				this.$store.commit('SETDICEVOICE',this.diceVoiceSet)
			},
			close(num) {
				this.$store.commit('SETDICENUM',num)
				this.show = false
				// console.log(p);
			}
		}
	}
</script>

<style>
.choice{
	width: 500rpx;
	height: 40rpx;
}
</style>
