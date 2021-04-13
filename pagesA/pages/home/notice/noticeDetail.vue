<template>
	<view>
		<u-image class="img" width="100%" mode="widthFix" border-radius="8px" :src="noticeDetail.fengmianurl"></u-image>
		<view class="infobox">
			<h3>{{noticeDetail.title}}</h3>
			<p class="timebox">{{noticeDetail.createtime}}</p>
			<u-parse class="innerh5" :html="noticeDetail.content" :show-with-animation="true" :lazy-load="true">
			</u-parse>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				nid: "",
				noticeDetail: {},
			};
		},
		onLoad(option) {
			this.nid = option.nid
			this.getNoticeDetail()
		},
		methods: {
			/**
			 * 获取通知公告详情
			 */
			getNoticeDetail() {
				let obj = {
					"id": this.nid
				}
				let that = this
				that.$u.api.getNoticeDetail(obj).then(res => {
					that.noticeDetail = res.data
				})
			},

		},

	}
</script>

<style lang="scss">
	.img {
		padding: 24rpx;
	}

	.infobox {
		padding: 24rpx;

		.timebox {
			font-size: 26rpx;
			color: #9a9a9a
		}
	}
</style>
