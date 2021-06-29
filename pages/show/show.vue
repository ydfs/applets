<template>
	<view class="classContent">
		<view class="cContent" v-for="item in content" :key="item.id">
			<image class="script-img" :src="item.cover_url" />
			<view class="script-world">
				<view class="script-name">{{item.name}}</view>
				<view class="script-peoples">{{item.peoples}}</view>
				<view class="script-content">{{item.content}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import ScriptContent from "../../globals/service/course.js";
	export default {
		data() {
			return {
				content: {},
			}
		},
		onLoad(options) {
			this.getData(options.id);
		},
		// onShow() {
		// 	this.getData();
		// },
		methods: {
			getData(id) {
				ScriptContent.dramaDetails()
					.then(res => {
						console.log(res)
						this.content = res.list
					})
			}
		}
	}
</script>

<style>
</style>
