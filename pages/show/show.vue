<template>
	<view class="classContent">
		<view class="cContent">
			<image class="script-img" :src="content.cover_url" />
			<view class="script-world">
				<view class="script-name">剧本名：{{content.name}}</view>
				<view class="script-peoples">类型：{{typeWord(content.category_id)}}</view>
				<view class="script-content">可参与人数：{{content.peoples}}</view>
				<view v-html="content.content"> </view>

			</view>
		</view>
		<!-- <view class="comment-box">评论</view> -->
		<view class="input-container">
			<input class="inputComment" @confirm="handleComment" type="text" placeholder="发表你的看法" v-model="releaseContent" />
			<view class="submit-btn" @click="handleComment">
				发送
			</view>
		</view>
		<view class="comment" v-for="(res, index) in commentList" :key="res.id">
			<view class="left">
				<image :src="res.url" mode="aspectFill"></image>
			</view>
			<view class="right">
				<view class="top">
					<view class="name">{{ res.name }}</view>
					<view class="like" :class="{ highlight: res.isLike }">
						<view class="num">{{ res.likeNum }}</view>
						<u-icon v-if="!res.isLike" name="thumb-up" :size="30" color="#9a9a9a" @click="getLike(index)">
						</u-icon>
						<u-icon v-if="res.isLike" name="thumb-up-fill" :size="30" @click="getLike(index)"></u-icon>
					</view>
				</view>
				<view class="content">{{ res.contentText }}</view>
				<view class="reply-box">
					<view class="item" v-for="(item, index) in res.replyList" :key="item.index">
						<view class="username">{{ item.name }}</view>
						<view class="text">{{ item.contentStr }}</view>
					</view>
					<view class="all-reply" @tap="toAllReply" v-if="res.replyList != undefined">
						共{{ res.allReply }}条回复
						<u-icon class="more" name="arrow-right" :size="26"></u-icon>
					</view>
				</view>
				<view class="bottom">
					{{ res.date }}
					<view @click="clickReply()" class="reply">回复</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import dramaContent from "../../globals/service/drama.js";
	export default {
		data() {
			return {
				content: {},
				commentList: [],
				releaseContent: '',
				id: '3',
				//articleId: '',
				words: {
					3: "欢乐",
					4: "悬疑",
					6: "恐怖",
					11: "未来",
					12: "情感",
					13: "科幻",
					14: "推理",
					15: "cp"
				}
			}
		},
		onLoad(options) {
			this.getData(options.id);
			uni.showShareMenu({
				withShareTicket: true
			});
			this.getComment();
		},
		onShow() {
			//this.getCommentList(this.articleId)
		},
		methods: {
			// 跳转到全部回复
			toAllReply() {
				uni.navigateTo({
					url: '/pages/template/comment/reply'
				});
			},
			// 点赞
			getLike(index) {
				this.commentList[index].isLike = !this.commentList[index].isLike;
				if (this.commentList[index].isLike == true) {
					this.commentList[index].likeNum++;
				} else {
					this.commentList[index].likeNum--;
				}
			},
			// 发表评论
			handleComment() {
				if (!this.releaseContent) {
					uni.showToast({
						title: '请输入评论内容',
						icon: 'none'
					})
					return
				}
				dramaContent.dramaComment('3', {
					content: this.releaseContent,
				}).then(res => {
					this.releaseContent = "";
					this.dramaDetails();
				})
				// if (suc) {
				// 	this.getCommentList(this.articleId)
				// 	this.comment = ''
				// }
			},
			// 评论列表
			getComment() {
				this.commentList = [{
						id: 1,
						name: '叶轻眉',
						date: '12-25 18:58',
						contentText: '我不信伊朗会没有后续反应，美国肯定会为今天的事情付出代价的',
						url: 'https://cdn.uviewui.com/uview/template/SmilingDog.jpg',
						allReply: 12,
						likeNum: 33,
						isLike: false,
						replyList: [{
								name: 'uview',
								contentStr: 'uview是基于uniapp的一个UI框架，代码优美简洁，宇宙超级无敌彩虹旋转好用，用它！'
							},
							{
								name: '粘粘',
								contentStr: '今天吃什么，明天吃什么，晚上吃什么，我只是一只小猫咪为什么要烦恼这么多'
							}
						]
					},
					{
						id: 2,
						name: '叶轻眉1',
						date: '01-25 13:58',
						contentText: '我不信伊朗会没有后续反应，美国肯定会为今天的事情付出代价的',
						allReply: 0,
						likeNum: 11,
						isLike: false,
						url: 'https://cdn.uviewui.com/uview/template/niannian.jpg',
					},
					{
						id: 3,
						name: '叶轻眉2',
						date: '03-25 13:58',
						contentText: '我不信伊朗会没有后续反应，美国肯定会为今天的事情付出代价的',
						allReply: 0,
						likeNum: 21,
						isLike: false,
						allReply: 2,
						url: '../../../static/logo.png',
						replyList: [{
								name: 'uview',
								contentStr: 'uview是基于uniapp的一个UI框架，代码优美简洁，宇宙超级无敌彩虹旋转好用，用它！'
							},
							{
								name: '豆包',
								contentStr: '想吃冰糖葫芦粘豆包，但没钱5555.........'
							}
						]
					},
					{
						id: 4,
						name: '叶轻眉3',
						date: '06-20 13:58',
						contentText: '我不信伊朗会没有后续反应，美国肯定会为今天的事情付出代价的',
						url: 'https://cdn.uviewui.com/uview/template/SmilingDog.jpg',
						allReply: 0,
						likeNum: 150,
						isLike: false
					}
				];
			},
			getData(id) {
				console.log(id)
				dramaContent.dramaDetails(id)
					.then(res => {
						console.log(res)
						this.content = res
					})
			},
			typeWord(key) {
				let word = this.words;
				return word[key];
			},
		}
	}
</script>

<style lang="scss" scoped>
	.classContent {
		padding: 20px;
	}

	.u-page {}

	.script-box {
		position: relative;
		padding: 30px 10px 30px 30px;
		background-color: #fff;
		line-height: 40px;
		border-bottom: 1px solid #e4e4e4;
	}

	.script-content {
		padding-bottom: 10px;
	}

	.input-container {
		width: 334rpx;
		height: 76rpx;
		border: 1rpx solid rgb(229, 229, 229);
		border-radius: 15rpx;
		position: relative;
	}

	.submit-btn {
		position: absolute;
		right: 10rpx;
		top: 50%;
		transform: translateY(-50%);
		background-color: rgb(229, 87, 38);
		width: 82rpx;
		height: 50rpx;
		text-align: center;
		line-height: 50rpx;
		color: #FFFFFF;
		font-size: 26rpx;
		border-radius: 30rpx;
	}

	.inputComment {
		width: 175rpx;
		height: 76rpx;
		padding: 0 25rpx;
		line-height: 76rpx;
	}

	.comment-box {
		text-align: center;
		padding: 5px;
		margin: 20px 0;
		font-size: 20px;
		border-bottom: 1px solid #e4e4e4;
		border-top: 1px solid #e4e4e4;
		background-color: #f4f4f4;
	}

	.comment {
		display: flex;
		padding: 30rpx;

		.left {
			image {
				width: 64rpx;
				height: 64rpx;
				border-radius: 50%;
				background-color: #f2f2f2;
			}
		}

		.right {
			flex: 1;
			padding-left: 20rpx;
			font-size: 30rpx;

			.top {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 10rpx;

				.name {
					color: #5677fc;
				}

				.like {
					display: flex;
					align-items: center;
					color: #9a9a9a;
					font-size: 26rpx;

					.num {
						margin-right: 4rpx;
						color: #9a9a9a;
					}
				}

				.highlight {
					color: #5677fc;

					.num {
						color: #5677fc;
					}
				}
			}

			.content {
				margin-bottom: 10rpx;
			}

			.reply-box {
				background-color: rgb(242, 242, 242);
				border-radius: 12rpx;

				.item {
					padding: 20rpx;
					border-bottom: solid 2rpx $u-border-color;

					.username {
						font-size: 24rpx;
						color: #999999;
					}
				}

				.all-reply {
					padding: 20rpx;
					display: flex;
					color: #5677fc;
					align-items: center;

					.more {
						margin-left: 6rpx;
					}
				}
			}

			.bottom {
				margin-top: 20rpx;
				display: flex;
				font-size: 24rpx;
				color: #9a9a9a;

				.reply {
					color: #5677fc;
					margin-left: 10rpx;
				}
			}
		}
	}
</style>
