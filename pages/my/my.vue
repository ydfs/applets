<template>
	<u-cell-group>
		<view class="img">
			<u-avatar :src="src" size="150"></u-avatar>
			<view v-if="isLogin" class="user-name">
				{{ userInfo.nickName || '昵称'}}
			</view>
			<view v-else @click="logIn" class="userName">
				登录
			</view>
		</view>
		<u-cell-item icon="setting-fill" title="个人设置"></u-cell-item>
		<u-cell-item icon="file-text-fill" title="我的剧本"></u-cell-item>
		<u-cell-item icon="integral-fill" title="会员充值"></u-cell-item>
		<view @click="logOut" class="logoutContainer">
			<image class="logoutIcon" src="/static/pages/my/logout.png" mode="aspectFill"></image>
			<view class="logoutText">
				退出登录
			</view>
		</view>
		<view>
			<button class="loginBtn" type="default" open-type="getUserInfo" @getuserinfo="getUserInfo"
				withCredentials="true">点击授权获取用户信息</button>
		</view>
	</u-cell-group>
</template>

<script>
	import dramaLogin from "../../globals/service/drama.js";
	export default {
		data() {
			return {
				isLogin: false,
				src: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic4.zhimg.com%2Fv2-b6eae3250bb62fadb3d2527f466cf033_b.jpg&refer=http%3A%2F%2Fpic4.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1627549727&t=e41792f8c8229ece547548781156b385'
			}
		},
		onLoad() {
			this.getLocation(),
			this.getRecorderManager(),
			uni.showShareMenu({
				withShareTicket: true
			})
		},
		methods: {
			requestLogin(code) {
				let param = {
					code
				}
				dramaLogin.login(params).then(res => {
					console.log(res)
				})
				commonApi.login(param).then(res => {})
			},
			logOut: function() {
				this.$store.commit("LOGOUT")
				uni.reLaunch({
					url: '/pages/indexs/index'
				})
			},
			getLocation() {
				uni.authorize({
					scope: 'scope.userLocation',
					success() {
						uni.getLocation({
							success: function(res) {
								console.log('成功获取位置信息', res)
							},
							fail: function(error) {
								console.log('获取当前位置失败', error)
							},
							complete: function(com) {
								console.log('接口调用结束的回调函数（调用成功、失败都会执行）', com)
							}
						});
					}
				})
			},
			getRecorderManager() {
				uni.authorize({
					scope: 'scope.record',
					success() {
						uni.getRecorderManager({
							success: function(res) {
								console.log('成功获取录音功能', res)
							},
							fail: function(error) {
								console.log('获取录音功能失败', error)
							},
							complete: function(com) {
								console.log('接口调用结束的回调函数（调用成功、失败都会执行）', com)
							}
						});
					}
				})
			},
			getUserInfo() {
				console.log(123)
				uni.authorize({
					scope: 'scope.userInfo',
					success() {
						uni.getUserInfo({
							success: (res) => {
								if (!res.authSetting['scope.userInfo']) {
									console.log('未授权')
									uni.authorize({
										scope: "scope.userInfo",
										fail(res) {
											console.log(res)
										},
										success() {
											this.logIn()
										}
									})
								} else {
									this.logIn()
								}
							}
						})
					}
				})
				// uni.getSetting()
			},
			// getUserInfo(e){
			// 	let userInfo = e.detail.userInfo
			// 	console.log(userInfo)
			// },
			logIn() {
				uni.login({
					provider: "weixin",
					success(res) {
						let code = res.code;
						this.requestLogin(code)
					}
				})
			},
		},


	}
</script>

<style scoped lang="scss">
	.img {
		text-align: center;
		padding: 20px 0 20px 0;

		.user-name {
			padding-top: 5px;
		}
	}

	.logoutContainer {
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 50rpx 0 50rpx;

		.logoutIcon {
			width: 37rpx;
			height: 32rpx;
		}

		.logoutText {
			font-size: 26rpx;
			color: rgb(180, 180, 180);
			margin-bottom: 20rpx;
		}
	}
</style>
