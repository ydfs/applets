<template>
	<view class="content">
		<!-- 所有内容的容器 -->
		<view class="script-box" v-for="item in topics" :key="item.id" @click="detailsPage(item.id)">
			<image class="script-img" :src="item.cover_url" />
			<view class="script-world">
				<view class="script-name">{{item.name}}</view>
				<view class="script-peoples">{{item.peoples}}</view>
			</view>
		</view>
		<!-- 与包裹页面所有内容的元素u-page同级，且在它的下方 -->
	</view>
</template>

<script>
	import courseService from "../../globals/service/course.js";
	export default {
		data() {
			return {
				current: 0,
				topics: [],
				total: 0,
				pagination: "",
			};
		},
		onLoad(options) {
			this.getData();
		},
		// onShow() {
		// 	this.getData();
		// },
		methods: {
			getData() {
				let params = {};
				courseService.dramaList(params)
					.then(res => {
						console.log(res)
						this.topics = res.list
					})
			},
			detailsPage(id) {
				uni.navigateTo({
					url: "/pages/show/show",
				});
			}
		}
	}
</script>

<style>
	.content {
		/* 		display: flex; */
		background-color: #f5f5f5;
	}

	.u-page {}

	.script-box {
		position: relative;
		padding: 30px 10px 30px 30px;
		background-color: #fff;
		line-height: 40px;
		border-bottom: 1px solid #e4e4e4;
	}

	.script-img {
		width: 200rpx;
		height: 200rpx;
		border-radius: 4px;
		margin-right: 8px;
		background-color: #F5F5F5;
	}

	.script-world {}
</style>
