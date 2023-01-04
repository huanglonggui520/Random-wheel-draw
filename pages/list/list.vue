<template>
	
		<view style="background-color: #EBEDEE;width: 100%;min-height: 100vh;">
			
			<view class="add" @click="add">
				<!-- <text class="add" > -->
					+
				<!-- </text> -->
			</view>
			<view style="width: 100%;padding: 20rpx;">
				<text style="">模板</text>
			</view>
			<view style="background-color: #fff;">
				<u-cell-group>
					<view @click='setdefaut(0)' :class="defaut.id==0?'defaut':''">
						<u-cell title="今晚吃什么" >
							
							
						</u-cell>
					</view>
				</u-cell-group>
			</view>
			<view style="width: 100%;padding: 20rpx;">
				<text style="">自定义转盘</text>
			</view>
			<view style="background-color: #fff;">
				<u-cell-group>
					<view :class="defaut.id==p.id?'defaut':''" @click='setdefaut(p.id)'  v-for="p in lists" :key="p.id">
						<u-cell :title="p.title">
							
							<view slot="right-icon" style="width: 150rpx;display: flex;justify-content: space-between;">
								<view @click.stop='setDetail(p.id)'>
									<uni-icons type="compose" size="22" ></uni-icons>
								</view>
								<view @click.stop="close(p.id)">
									<uni-icons type="closeempty" size="22" ></uni-icons>
								</view>
								
							</view>
						</u-cell>
					</view>
				</u-cell-group>
			</view>
			
		</view>
	
</template>

<script>
	import colors from '../../utools/color.js'
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
               
			}
		},
		computed:{
		    ...mapState(['lists','defaut'])	
		},
		methods: {
			add(){
				uni.navigateTo({
					url:"/pages/add/add"
				})
			},
			setDetail(value){
				console.log(value);
				uni.navigateTo({
					url:`/pages/add/add?id=${value}`
				})
			},
			setdefaut(id){
				console.log(id);
			    this.$store.commit('XIUGAIDEFAUT',id)	
			},
			close(id) {
				uni.showModal({
					title: '提示',
					content: '是否删除该项',
					success:  (res)=> {
						if (res.confirm) {
							this.$store.commit('CLOSELISTS',id)
							console.log('id',this.defaut.id);
							if(this.defaut.id==id){
								this.$store.commit('XIUGAIDEFAUT',0)
							}
						}
					}
				});
				
			}
		}
	}
</script>

<style>
.add{
	background-color: #232E80;
	color: #fff;
	font-size: 110rpx; 
	width: 100rpx;
	height: 100rpx;
	border-radius: 50%;
	position: fixed;
	bottom: 60rpx;
	right: 60rpx;
	text-align: center;
	line-height: 100rpx;
	
}
.defaut{
	background-color: #8DC2F7 !important;
}
</style>
