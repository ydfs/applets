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
			<input class="inputComment" @confirm="handleComment" type="text" placeholder="发表你的看法"
				v-model="releaseContent" />
			<view class="submit-btn" @click="handleComment">
				发送
			</view>
		</view>
		<view class="item-number">
			<h3 style="padding-left: 5px;">共{{ filterRoutesLength }}条评论</h3>
		</view>
		<view class="comment" v-for="item in dramaDetail" :key="item.index">
			<view class="left">
				<image class="head-portrait" :src="item.user.avatar_url" mode="aspectFill">
				</image>
			</view>
			<view class="right">
				<view class="top">
					<view class="name">{{ item.user.nickname }}</view>
					<view class="like" :class="{ highlight: res.isLike }">
						<view class="num">{{ res.likeNum }}</view>
						<u-icon v-if="!res.isLike" name="thumb-up" :size="30" color="#9a9a9a" @click="getLike(index)">
						</u-icon>
						<u-icon v-if="res.isLike" name="thumb-up-fill" :size="30" @click="getLike(index)"></u-icon>
					</view>
				</view>
				<view class="content">{{ item.content }}</view>
				<view class="reply-box">
					<view class="item" v-for="child in item.children" :key="child.index">
						<view class="username">{{ child.user.nickname }}</view>
						<view class="text">{{ child.content }}</view>
					</view>
		<!-- 			<view>{{ child.created_at.substring(0, 10) }}</view> -->
					<view class="all-reply" @tap="toAllReply" v-if="res.replyList != undefined">
						共{{ child.length }}条回复
						<u-icon class="more" name="arrow-right" :size="26"></u-icon>
					</view>
				</view>
				<view class="bottom">
					{{ res }}
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
				dramaDetail: {},
				//commentList: [],
				releaseContent: '',
				id: '3',
				filterRoutesLength: 0,
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
			//this.getComment();
			this.dramaDetails();
		},
		onShow() {
			//this.getCommentList(this.articleId)
		},
		methods: {
			// 评论列表
			dramaDetails() {
				dramaContent.dramaDetails('3', {
					page: this.currentPage
				}).then(res => {
					this.dramaDetail = res.comments;
					console.log(this.dramaDetail);
					this.filterRoutes = this.filterNavigator(res.comments);
					let filterRoutesLength = 0;
					this.filterRoutes.forEach(item => {
						if (item.children) filterRoutesLength += item.children.length;
					});
					this.filterRoutesLength = filterRoutesLength += this.filterRoutes
						.length;
				});
			},
			filterNavigator(array) {
				let result = [];
				array.forEach(comments => {
					if (comments.content && comments.id) {
						let item = {
							content: comments.content,
							id: comments.id,
							user: comments.user
						};
						if (comments.children && comments.children.length) {
							item.children = this.filterNavigator(comments.children);
						}
						result.push(item);
					}
				});
				return result;
			},
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
				})
			},
			
			// getComment() {
			// 	this.dramaDetail = [{
			// 		date: 'child.created_at.substring(0, 10)',
			// 	}];
			// },
			//剧本内容
			getData(id) {
				console.log(id)
				dramaContent.dramaDetails(3)
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
		margin: 20px 0;
		width: 100%;
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
