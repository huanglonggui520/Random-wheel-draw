<script>
	
	export default {
		onLaunch: function() {
			console.log('App Launch')
			// 模拟经纬度
			// 模拟经纬度
			
		},
		onShow: function() {
			console.log(this)
			this.$mockLocation({
			  latitude: 23.099994,
			  longitude: 113.324520
			});
			
			// 开始模拟
			this.$startMockLocation({
			  interval: 2000, // 定位间隔时间，单位毫秒
			  duration: 0 // 持续时间，0表示一直模拟位置
			});
			
			// 停止模拟
			this.$stopMockLocation();
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
	body{
		background-color: #EBEDEE;
	}
</style>
