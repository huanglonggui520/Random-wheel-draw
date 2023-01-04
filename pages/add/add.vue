<template>
	<view style="background-color: #EBEDEE;width: 100%;min-height: 100vh;padding-top: 20rpx;padding-bottom: 20rpx;">
		 
		 <u-sticky>
			 <view style="width: 100%;background-color: #fff;height: 70rpx;line-height: 60rpx;display: flex;align-items: center;padding: 10rpx;">
			 			 <input  placeholder="请输入标题" v-model="title"/>
			 </view>
			 <view style="display: flex;background-color: #EBEDEE;justify-content: space-between;height: 60rpx;align-items: center;;padding: 10rpx;">
			 			 <text>转盘选项</text>
			 			 <text style="color: red;" @click="add">添加选项</text>
			 </view>
		 </u-sticky>
		 <view v-for="(p,index) in listdatas" style="width: 100%;background-color: #fff;height: 70rpx;line-height: 60rpx;display: flex;align-items: center;padding: 10rpx;margin-bottom: 2rpx;">
		 			<view style="width: 90%;">
						<view style="width: 70%;">
							<input  placeholder="选项" v-model="listdatas[index]"/>
						</view>
						
					</view>
					
					<uni-icons type="closeempty" color='red' size='20' @click="close(index)"></uni-icons>
					
		 </view>
		 <view class="add" @click="baoc">

		 		保存
		 	
		 </view>
		 <!-- <u-button color='#232E80' @click='baoc' style='border-radius: 50%;width: 100rpx;height: 100rpx;position: fixed;bottom: 80rpx;right: 80rpx;' type="primary" shape="circle"  text="保存"></u-button> -->
		 <!-- <view style="margin-top: 40rpx;width: 50%;margin-left: 50%;transform: translateX(-50%);">
			 <u-button type="error" :plain="true" text="保存" @click='baoc'></u-button>
		 </view> -->
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				title:'',
				listdatas:[
					'选项1',
					'选项2'
				],
				count:3,
				type:0,
				id:''
			}
		},
		onLoad(obj) {
			// 点击修改进入该页面
			
			if(obj.id){
				this.type=1
				this.id=obj.id
				console.log(this.$store.state.lists);
				this.listdatas=[]
				this.$store.state.lists.forEach((item,index)=>{
					
					if(item.id==obj.id){
						this.title=item.title
						this.count=this.$store.state.lists[index].prizes.length+1
						item.prizes.forEach((itemChren)=>{
							this.listdatas.push(itemChren.fonts[0].text)
						})
					}
				})
					
			}
			
		},
		computed: {
		    ...mapState(['defaut'])	
		},
		methods: {
			 change(e) {
			          console.log('change', e);
			        },
			add(){
				let str='选项'+this.count
				this.listdatas.push(str)
				this.count++
				console.log(this.listdatas);
			},
			close(index){
				uni.showModal({
					title: '提示',
					content: '是否删除该项',
					success:  (res)=> {
						if (res.confirm) {
							if(this.listdatas.length<=2) {
								uni.showToast({
									title:'至少有两个选项',
									icon:"none"
								})
								return
							}
							this.listdatas.splice(index,1)
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
				
			},
			baoc(){
				if(this.title.length<=0){
					uni.showToast({
						title:'标题不能为空哟',
						icon:"none"
					})
					return
				}
				
				let data={
					title:this.title,
					datas:this.listdatas
				}
				let xiugaiData={
					title:this.title,
					datas:this.listdatas,
					id:this.id
				}
				if(!this.type){
					this.$store.commit('SETLISTS',data)
				}else{
					this.$store.commit('XIUGAILISTS',xiugaiData)
				}
				if(this.defaut.id==this.id){
					console.log('我只写了');
					
					this.$store.commit('XIUGAIDEFAUT',this.id)
					
				}
				uni.showToast({
					title:'保存成功',
					icon:'none'
				})
				setTimeout(()=>{
					uni.navigateBack()
				},1000)
			}
		}
	}
</script>

<style>
.add{
	background-color: #232E80;
	color: #fff;
	/* font-size: 110rpx; */
	width: 100rpx;
	height: 100rpx;
	border-radius: 50%;
	position: fixed;
	bottom: 60rpx;
	right: 60rpx;
	text-align: center;
	line-height: 100rpx;
	
}
</style>
