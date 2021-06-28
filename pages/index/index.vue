<template>
	<view class="content">
		<view class="u-page">
			<!-- 所有内容的容器 -->
			<div class="script-box" v-for="item in topics" :key="item.id">
				<imgge class="script-img" :src="item.cover_url" />
				<view class="script-world">
					<view class="script-name">{{item.name}}</view>
					<view class="script-peoples">人数</view>
				</view>
			</div>
			<div class="script-box" v-for="item in topics" :key="item.id">
				<image class="script-img" src="{{}}"></image>
				<view class="script-world">
					<view class="script-name">{{item.name}}</view>
					<view class="script-peoples">人数</view>
				</view>
			</div>

		</view>
		<!-- 与包裹页面所有内容的元素u-page同级，且在它的下方 -->
		<u-tabbar v-model="current" :list="list"></u-tabbar>
	</view>
</template>

<script>
	import courseService from "../../globals/service/course.js";
	export default {
		data() {
			return {
				list: [{
						iconPath: "home",
						selectedIconPath: "home-fill",
						text: '首页',
						count: 2,
						isDot: true,
						customIcon: false,

					},
					{
						iconPath: "account",
						selectedIconPath: "account-fill",
						text: '我的',
						count: 23,
						isDot: false,
						customIcon: false,
					},
				],
				current: 0
			};
			total: 0;
			pagination: "";
			topics: [];
		},
		onLoad(options) {
			this.getData();
		},
		methods: {
			getData() {
			let params = {};
				courseService.dramaList(params)
					.then(res => {
						console.log(res)
						this.topics = res.data.list
					})
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
