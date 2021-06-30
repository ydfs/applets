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
	</view>
</template>

<script>
	import dramaContent from "../../globals/service/drama.js";
	export default {
		data() {
			return {
				content: {},
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
		},
		methods: {
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

<style>
	.classContent{
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
	.script-content{
		padding-bottom: 10px;
	}
</style>
