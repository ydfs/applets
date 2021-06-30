<template>

	<u-cell-group>
		<view class="img">
			<u-avatar :src="src" size="150"></u-avatar>
			<view v-if="isLogin" class="userName">
				{{ userInfo.nickName || '昵称'}}
			</view>
			<view v-else @click="logIn()" class="userName">
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
	</u-cell-group>

</template>

<script>
	export default {
		data() {
			return {
				isLogin: false,
				src: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic4.zhimg.com%2Fv2-b6eae3250bb62fadb3d2527f466cf033_b.jpg&refer=http%3A%2F%2Fpic4.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1627549727&t=e41792f8c8229ece547548781156b385'
			}
		},
		methods: {
			logIn() {
				uni.login({
					provider: "weixin",
					success(res) {
						let code = res.code;
						this.requestLogin(code)
					}
				})
			},
			requestLogin(code) {
				let param = { code }
				commonApi.login(param).then(res => {})
			},
			logOut: function() {
				this.$store.commit("LOGOUT")
				uni.reLaunch({
					url: '/pages/indexs/index'
				})
			},
			
		}
	}
</script>

<style scoped lang="scss">
	.img {
		text-align: center;
		padding: 20px 0 20px 0;

		.userName {
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
