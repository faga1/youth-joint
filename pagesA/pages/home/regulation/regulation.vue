<template>
	<view>
		<u-parse class="innerh5" :html="content" :show-with-animation="true" :lazy-load="true"></u-parse>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: "",
			};
		},
		onShow() {
			this.getSocietyCharter()
		},
		methods: {
			/**
			 * 获取协会章程
			 */
			getSocietyCharter() {
				console.log(">>>>>>>>>>");
				let obj = {
					"xiehuiId": "1"
				}
				let that = this
				that.$u.api.getSocietyCharter(obj).then(res => {
					that.content = res.data.xiehuizhangcheng
				})
			}
		}

	}
</script>

<style lang="scss">
	.innerh5 {
		padding: 30rpx;
		background: #fff;
	}
</style>
