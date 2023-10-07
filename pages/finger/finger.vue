<template>
	<!-- touchmove.stop.prevent 防止拖动卡顿 -->
	<view class="finger" @touchstart='start' @touchend="end" @touchmove.stop.prevent="move">

		<fingers class='fingers' :show='p.show' :bgColor='bgcolor[index]' :zid='p.id' v-for="(p,index) in fingersList"
			:style="{top:p.y+'rpx',left:p.x+'rpx'}">
		</fingers>
		<view class="rule" v-show="showRule">
			<text>
				1，每位玩家用手指按住屏幕（最多支持5位玩家）
				2，等待2秒倒计时结束后听到嘟嘟声开始游戏
				3，游戏结束后由系统随机选择一位"幸运玩家"
			</text>
		</view>
	</view>
</template>

<script>
	import fingers from '../../components/fingers/fingers.vue'
	import nanoid from '../../utools/nanoid.js'
	let timeid=null
	let timeid2=null
	export default {
		data() {
			return {
				x: 0,
				y: 0,
				showRule:true,
				fingersList: [],
				ids:[],
				clear: false,
				bgcolor: ['#5460EF', '#18B536', '#EE3E14', '#E363F8', '#1497EE']
			}
		},
		components: {
			fingers
		},
		watch:{
			fingersList(){
				if(this.fingersList.length){
					this.showRule=false
					return
				}
				this.showRule=true
			}
		},
		methods: {
			move(e) {
				// console.log(e);

				// this.fingersList.forEach((item, index) => {
				// 	if (item.identifier == e.changedTouches[0].identifier) {
				// 		this.$nextTick(() => {
							this.fingersList[e.changedTouches[0].identifier].x = (e.touches[e.changedTouches[0].identifier].clientX - 72) * 2
							this.fingersList[e.changedTouches[0].identifier].y = (e.touches[e.changedTouches[0].identifier].clientY - 65) * 2
				// 		})

				// 	}
				// })
			},
			end(e) {
				console.log('离开了', e.changedTouches);
				this.stop()
				clearTimeout(timeid)
				clearTimeout(timeid2)
				this.starttime(e)
				
				if (!e.touches.length) {
					this.fingersList = []
					
				}
				this.fingersList.forEach((item, index) => {
					if (item.identifier == e.changedTouches[0].identifier) {
						this.fingersList.splice(index, 1)
					}
				})
			},
			// 开始抽人
			starttime(e) {
				let who
				if(timeid2){
					clearTimeout(timeid2)
				}
				this.stop()
				console.log('手指', e);
				timeid2=setTimeout(()=>{
					if (e.touches.length >= 2) {
						
						if(timeid){
							clearTimeout(timeid)
						}
						this.$Audio('duAudio')//播放开始的嘟嘟声
						timeid=setTimeout(() => {
							who = uni.$u.random(0, e.touches.length-1)
							this.fingersList.forEach((item, index) => {
								if (item.identifier == who) {
									item.show = true
								}
							})
							
						}, 3000)
					}
				},2000)
			},
			start(e) {

                this.starttime(e)
				this.x = (e.changedTouches[0].clientX - 72) * 2
				this.y = (e.changedTouches[0].clientY - 65) * 2
                let id=nanoid()
				let obj = {
					x: this.x,
					y: this.y,
					id:id ,
					show: false,
					// bgColor:this.bgcolor[]
					identifier: e.changedTouches[0].identifier

				}
				this.ids.push(id)
				this.fingersList.push(obj)

				console.log(this.fingersList)
			}

		}
	}
</script>

<style lang="scss">
	.fingers {
		position: fixed;




	}
    .rule{
		color: #fff;
		position: fixed;
		bottom: 45%;
		left: 5%;
	}
	.finger {
		height: 100vh;
		// position: relative;
		background-color: #000;
		/* width: 100; */
	}
</style>
