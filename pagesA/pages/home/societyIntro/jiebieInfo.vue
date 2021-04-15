<template>
	<view>
		<div class="topLine"></div>
		<u-parse class="innerh5" :html="content" :show-with-animation="true" :lazy-load="true"></u-parse>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				jiebieId: "",
				content: "",
			}
		},
		onLoad: function(option) {
			uni.setNavigationBarTitle({
				title: option.jiebie
			});
			if (option.jiebieId) {
				this.jiebieId = option.jiebieId
				this.getJiebieInfo()
			}

		},
		methods: {
			/**
			 * 获取党建活动详情
			 */
			getJiebieInfo() {
				let obj = {
					"jiebieId": this.jiebieId
				}
				let that = this
				that.$u.api.jiebieInfo(obj).then(res => {
					that.content = res.data.remark
				})
			},
		}
	}
</script>

<style lang="scss">
	.topLine {
		width: 100%;
		height: 1px;
		position: fixed;
		// #ifdef APP-PLUS
		top: 0px;
		// #endif
		// #ifdef MP-WEIXIN
		top: 0px;
		// #endif
		// #ifdef H5
		top: 44px;
		// #endif
		background: #f7f7f7;
		z-index: 1;
	}

	.innerh5 {
		padding: 30rpx;
		background: #fff;
		/* margin-top: 80rpx; */
	}
</style>
