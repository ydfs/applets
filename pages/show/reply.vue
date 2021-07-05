<template>
	<view class="wrap">
		<view class="comment">
			<view class="top">
				<view class="left">
					<view class="heart-photo"><image :src="dramaDetail.user.avatar_url" mode=""></image></view>
					<view class="user-info">
						<view class="name">{{ dramaDetail.user.nickname  }}</view>
						<view class="date">{{ dramaDetail.created_at }}</view>
					</view>
				</view>
				<view class="right" :class="{ highlight: res.isLike }">
					{{ res.likeNum }}
					<u-icon v-if="!res.isLike" name="thumb-up" class="like" color="#9a9a9a" :size="30" @click="getLike"></u-icon>
					<u-icon v-if="res.isLike" name="thumb-up-fill" class="like" :size="30" @click="getLike"></u-icon>
				</view>
			</view>
			<view class="content">{{ dramaDetail.content }}</view>
		</view>
		<view class="all-reply">
			<view class="all-reply-top">全部回复（{{ dramaDetail.children.length }}）</view>
			<view class="item" v-for="child in item.children" :key="child.index">
				<view class="comment">
					<view class="top">
						<view class="left">
							<view class="heart-photo"><image :src="item.url" mode=""></image></view>
							<view class="user-info">
								<view class="name">{{ child.user.nickname }}</view>
								<view class="date">{{ item.created_at }}</view>
							</view>
						</view>
						<view class="right"  :class="{ highlight: item.isLike }">
							<view class="num">{{ item.likeNum }}</view>
							<u-icon v-if="!item.isLike" name="thumb-up" class="like" :size="30" color="#9a9a9a" @click="getLike(index)"></u-icon>
							<u-icon v-if="item.isLike" name="thumb-up-fill" class="like" :size="30" @click="getLike(index)"></u-icon>
						</view>
					</view>
					<view class="reply" v-if="item.reply">
						<view class="username">{{ item.reply.name }}</view>
						<view class="text">{{ item.reply.contentStr }}</view>
					</view>
					<view class="content">{{ item.contentText }}</view>
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
			dramaDetail: {},
			//comment: ''
		};
	},
	onLoad(options) {
		this.dramaDetails(options.id);
	},
	methods: {
		// 回复列表
		dramaDetails() {
			dramaContent.dramaDetails(id, {
				page: this.currentPage
			}).then(res => {
				this.dramaDetail = res;
				console.log(this.dramaDetail);
			});
		},
		// 点赞
		getLike(index) {
			if (index === 0 || index > 0) {
				this.commentList[index].isLike = !this.commentList[index].isLike;
				if (this.commentList[index].isLike == true) {
					this.commentList[index].likeNum++;
				} else {
					this.commentList[index].likeNum--;
				}
			} else {
				if (this.comment.isLike == true) {
					this.comment.isLike = !this.comment.isLike;
					this.comment.likeNum--;
				} else {
					this.comment.isLike = !this.comment.isLike;
					this.comment.likeNum++;
				}
			}
		},
	}
};
</script>

<style lang="scss" scoped>
page {
	background-color: #f2f2f2;
}
.comment {
	padding: 30rpx;
	font-size: 32rpx;
	background-color: #ffffff;
	.top {
		display: flex;
		justify-content: space-between;
	}
	.left {
		display: flex;
		.heart-photo {
			image {
				width: 64rpx;
				height: 64rpx;
				border-radius: 50%;
				background-color: #f2f2f2;
			}
		}
		.user-info {
			margin-left: 10rpx;
			.name {
				color: #5677fc;
				font-size: 28rpx;
				margin-bottom: 4rpx;
			}
			.date {
				font-size: 20rpx;
				color: $u-light-color;
			}
		}
	}
	.right {
		display: flex;
		font-size: 20rpx;
		align-items: center;
		color: #9a9a9a;
		.like {
			margin-left: 6rpx;
		}
		.num{
			font-size: 26rpx;
			color: #9a9a9a;
		}
	}
	.highlight {
		color: #5677fc;
		.num{
			color: #5677fc;
		}
	}
}
.all-reply {
	margin-top: 10rpx;
	padding-top: 20rpx;
	background-color: #ffffff;
	.all-reply-top {
		margin-left: 20rpx;
		padding-left: 20rpx;
		border-left: solid 4rpx #5677fc;
		font-size: 30rpx;
		font-weight: bold;
	}
	.item {
		border-bottom: solid 2rpx $u-border-color;
	}
	.reply {
		padding: 20rpx;
		background-color: rgb(242, 242, 242);
		border-radius: 12rpx;
		margin: 10rpx 0;
		.username {
			font-size: 24rpx;
			color: #7a7a7a;
		}
	}
}
</style>
