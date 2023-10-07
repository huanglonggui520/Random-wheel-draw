<template>
	<view>
		<u-popup :show="show" :round="5" mode='center' @close="close" >
			<view class="wxLogin">
				<view>
					<view style="font-size: 35rpx;">微信登录授权</view>
				</view>
				<view style="width: 100%;text-align: center;">
					<!-- 获取头像 -->
					<view class="bg-gray padding-top-sm">
						<button class="avatar-button" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
							<image
								:src="avatarUrl?avatarUrl:'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'">
							</image>
						</button>
					</view>
					<!-- 输入用户名 -->
					<view class="nickname-code">
						<u--input type="nickname" placeholder="请填写昵称" border="surround" v-model="nickname"
							inputAlign='center'></u--input>
					</view>
					<view class="nickname-code" style="display: flex;">
						<view style="margin-right: 10rpx;">
							<u-button text="不同意" @click='noAgree'></u-button>
						</view>
						<view style="width: 100%;">
							<u-button type="success" text="同意" @click='login'></u-button>
						</view>
					</view>
					
				</view>
			</view>
		</u-popup>

	</view>
</template>

<script>
	var COS = require('../../COS/cos-wx-sdk-v5.min.js')
	import nanoid from '../../utools/nanoid.js'
	import request from '../../utools/request.js'
	export default {
		name: 'avatar',
		data() {
			return {
				// 头像
				avatarUrl: "",
				// 用户名
				nickname: "",
				show: true,
				err: null,
				cosURL:''

			}
		},
		computed: {
			explainName() {
				let name = ""
				if (this.avatarUrl == '') {
					name = "请授权用户头像"
					return false;
				}
				if (this.nickname == '') {
					name = "请填写昵称"
					return name;
				}
				return false;
			}
		},
		onLoad() {
			this.userCode()
		},
		methods: {

			//获取用户头像
			onChooseAvatar(e) {
				console.log(e.detail);

				this.avatarUrl = e.detail.avatarUrl
			},
			//获取用户手机号
			noAgree() {
				request('/gg')
			},
			close() {
				this.show = false
				// console.log('close');
			},
			async login() {
				if (this.explainName) {
					uni.showToast({
						title: this.explainName,
						icon: 'error'
					})
					return
				}
				try{
					await this.upload()
				}
				catch(err){
					console.log(err);
				}
				uni.login({
					provider: 'weixin',
					onlyAuthorize: true,
					success: async (loginRes)=> {
						
						let res = await request('/onLogin', {
							nickname: this.nickname,
							code: loginRes.code,
							avatarUrl:this.cosURL
						}, 'POST')
						console.log(res);
						if(res.status===200){
							uni.setStorageSync('token',res.token)
							uni.setStorageSync('nickname',this.nickname)
						}


					}
				});

			},
			// 选择图片函数
			upload(){
			  var that = this;
			  var onlineImageList = [];
			  var that = this;
			  var cos = new COS({
			    SecretId: 'AKIDd2B5k9G6gz1mFSN7fx35vYxX5VIo6B5j', //这一块不懂可以看同系列博客 01_python+腾讯云发送短信
			    SecretKey: 'TgdJiqj4HEvNyNVP2Pr3bvBCxRoAVf1H',
			  });
			  // 循环异步上传图片，从imageList中取出完整的包含路径的文件名
			  
			    cos.postObject({
			      Bucket: 'choice-1306687843', // 你配置的桶名
			      Region: 'ap-nanjing',   // 你配置的对象存储服务的域
			      Key: nanoid()+".jpg",   // 放到服务器上时的文件名，自己配置可以避免文件重复，一旦文件重复就会形成覆盖
			      FilePath: this.avatarUrl,       // 完整的文件名
			      onProgress: function (info) { // 上传过程中返回的信息，可以用于只做进度条
			        console.log('进度条', JSON.stringify(info));
			      }
			    },  (err, data) =>{
					this.cosURL=data?data.Location:''
					console.log(data,err);
			      // onlineImageList.push(data.Location);
				  
			    });
			  // wx.chooseImage({
			  //   count:9,
			  //   sizeType: ['original', 'compressed'],
			  //   sourceType: ['album', 'camera'],
			  //   success:function(res){
			  //     // 默认图片 + 选择的图片； 
			  //     console.log(res);
				    
				    
				    
				  
			  //   }
			  // });
			},
			// 上传文件的函数
			
		}
	}
</script>
<style>
	page {
		background-color: #fff;
	}
</style>
<style lang="scss" scoped>
	// 用户头像
	.wxLogin {
		width: 550rpx;
		overflow-x: scroll;
		text-align: center;
		padding: 45rpx;
		box-sizing: border-box;
	}

	.avatar-button {
		width: 120rpx;
		padding: 0;
		border-radius: 50%;
		margin: 30rpx auto 0 auto;

		image {
			width: 120rpx;
			height: 120rpx;
			border-radius: 50%;
			display: block;
			// border: 4rpx solid #d8bf9f;
		}
	}

	//用户昵称
	.nickname-code {
		// display: flex;
		width: 400rpx;
		margin-left: 30rpx;
		margin-top: 25rpx;
		background-color: #ffffff;
		// border-radius: 50rpx 50rpx 0 0;

	}
</style>
