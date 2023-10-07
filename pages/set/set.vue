<template>

	<view style="background-color: #EBEDEE;width: 100%;min-height: 100vh;">
		<view style="width: 100%;padding: 20rpx;">
			<text style="">转盘设置</text>
		</view>
		<view style="background-color: #fff;">
			<u-cell-group>
				<u-cell  title="应用主题" :isLink="true" @click='gochoicebg'></u-cell>
				<u-cell title="转盘触感">
					<u-switch slot="right-icon" @change='changezdong' size='20' inactiveColor='#F3F3F3'
						activeColor='#FF9900' v-model="zdong"></u-switch>
				</u-cell>
				<u-cell title="允许重复抽取">
					<u-switch @change='changecfu' slot="right-icon" size='20' inactiveColor='#F3F3F3'
						activeColor='#FF9900' v-model="cfu"></u-switch>
				</u-cell>
				<u-cell title="语音播报">
					<u-switch slot="right-icon" @change='setvoice' size='20' inactiveColor='#F3F3F3' activeColor='#FF9900' v-model="sy">
					</u-switch>
				</u-cell>
			</u-cell-group>
		</view>
		<view style="width: 100%;padding: 20rpx;">
			<text style="">关于</text>
		</view>
		<view style="background-color: #fff;">
			<u-cell-group>
				<u-cell title="用户反馈" value='2764564604@qq.com'></u-cell>
				<u-cell title="关于我们" :isLink="true"></u-cell>
				<u-cell title="版本号" value='1.0.1'></u-cell>
			</u-cell-group>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				zdong: true,
				cfu: true,
				sy:true
			}
		},
		onLoad() {
		    this.zdong=this.$store.state.zdong
			this.cfu=this.$store.state.cfu
			this.sy=this.$store.state.voice
		},
		methods: {

			leftClick() {
				uni.navigateTo({
					url:'/pages/index/index'
				})
			},
			changecfu(value) {
				this.$store.commit('SETCFU',value)
			},
			changezdong(value) {
				this.$store.commit('SETZDONG',value)
			},
			gochoicebg(){
				uni.navigateTo({
					url:'/pages/choicebg/choicebg'
				})
			},
			setvoice(){
				this.$store.commit('SETVOICE',this.sy)
			}
		}
	}
</script>

<style>

</style>
