<template>
	<view class="wrap">
		<view class="top"></view>
		<view class="content">
			<view class="title">欢迎登录剧本杀</view>
			<input class="u-border-bottom" type="number" v-model="formLabelAlign.phone" placeholder="请输入手机号" />
			<view class="tips">未注册的手机号验证后自动创建剧本杀账号</view>
			<!-- <button @tap="submit" :style="[inputStyle]" class="getCaptcha">获取短信验证码</button> -->
			<view :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
				<view label="验证码" prop="code" :rules="[{ required: true, message: '验证码不能为空' }]">
					<view class="gain">
						<input v-model="formLabelAlign.code" maxlength="6" placeholder="请输入验证码">
						</input>
						<button v-show="show" class="button" type="text" @click="getCode">获取验证码</button>
						<button v-show="!show" class="time" type="text">{{time}}</button>
					</view>
				</view>
				<view>
					<button style="font-size: 16px" type="primary" @click="getReg">登录</button>
				</view>
			</view>
			<view class="alternative">
				<view class="password">密码登录</view>
				<view class="issue">遇到问题</view>
			</view>
		</view>
		<view class="buttom">
			<!-- 			<view class="loginType">
				<view class="wechat item">
					<view class="icon"><u-icon size="70" name="weixin-fill" color="rgb(83,194,64)"></u-icon></view>
					微信
				</view>
				<view class="QQ item">
					<view class="icon"><u-icon size="70" name="qq-fill" color="rgb(17,183,233)"></u-icon></view>
					QQ
				</view>
			</view> -->
			<view class="hint">
				登录代表同意
				<text class="link">剧本杀用户协议、隐私政策，</text>
				并授权使用您的剧本杀账号信息（如昵称、头像、地址）以便您统一管理
			</view>
		</view>
	</view>
</template>

<script>
	import smsService from "../../globals/service/drama.js";
	export default {
		data() {
			return {
				show: true,
				labelPosition: "top",
				key: "",
				time: 60,
				formLabelAlign: {
					type: "",
					code: "",
					phone: ""
				}
			}
		},
		computed: {
			inputStyle() {
				let style = {};
				if (this.formLabelAlign.code) {
					style.color = "#fff";
					style.backgroundColor = this.$u.color['warning'];
				}
				return style;
			}
		},
		methods: {
			getCode() {
				smsService.smsCode({
					phone: this.formLabelAlign.phone
				}).then(res => {
					console.log(res)
					this.key = res.key;
					this.show = false;
					var myVar = setInterval(() => {
						this.time -= 1;
						if (this.time == 0) {
							clearInterval(myVar);
							this.show = true;
							this.time = 60;
						}
					}, 1000);
				});
			},
			getReg() {
				smsService
					.smsRegister({
						key: this.key,
						code: this.formLabelAlign.code,
						phone: this.formLabelAlign.phone
					})
					.then(() => {
						uni.switchTab({
							url: '/pages/my/my'
						})
					});
			}
		}
	};
</script>

<style lang="scss" scoped>
	.wrap {
		font-size: 28rpx;

		.content {
			width: 600rpx;
			margin: 80rpx auto 0;

			.title {
				text-align: left;
				font-size: 55rpx;
				font-weight: 500;
				margin-bottom: 100rpx;
			}

			.input {
				text-align: left;
				margin-bottom: 10rpx;
				padding-bottom: 6rpx;
			}

			.tips {
				color: $u-type-info;
				margin-bottom: 60rpx;
				margin-top: 8rpx;
			}

			.gain {
				display: flex;

				.button {
					// position: absolute;
					// right: 10px;
				}

				.time {
					// position: absolute;
					// right: 25px;
					// cursor: default;
				}
			}



			.alternative {
				color: $u-tips-color;
				display: flex;
				justify-content: space-between;
				margin-top: 30rpx;
			}
		}

		.buttom {
			.loginType {
				display: flex;
				padding: 150rpx 150rpx 150rpx 150rpx;
				justify-content: space-between;

				.item {
					display: flex;
					flex-direction: column;
					align-items: center;
					color: $u-content-color;
					font-size: 28rpx;
				}
			}

			.hint {
				padding: 80rpx 40rpx;
				font-size: 20rpx;
				color: $u-tips-color;

				.link {
					color: $u-type-warning;
				}
			}
		}
	}
</style>
