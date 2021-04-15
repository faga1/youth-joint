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
				sid: "",
				aid: "",
				content: "",
			}
		},
		onLoad: function(option) {
			uni.setNavigationBarTitle({
				title: option.title
			});
			if (option.aid) {
				this.aid = option.aid
				this.getSocietAtcInfo()
			} else if (option.sid) {
				this.sid = option.sid
				this.getSocietiesInfo()
			}

		},
		methods: {
			/**
			 * 获取党建活动详情
			 */
			getSocietAtcInfo() {
				let obj = {
					"huodongId": this.aid
				}
				let that = this
				that.$u.api.getSocietAtcInfo(obj).then(res => {
					that.content = res.data.content
				})
			},

			/**
			 * 获取社团简介
			 */
			getSocietiesInfo() {
				let obj = {
					"shetuanId": this.sid,
				}
				let that = this
				that.$u.api.getSocietiesInfo(obj).then(res => {
					that.content = res.data.jianjie
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
