<template>
	<view>
		<u-cell-group>
			<u-cell-item v-for="item in noticeList" :title="item.title" @click="toDetail(item.id)"></u-cell-item>
		</u-cell-group>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				noticeList: [],
			};
		},
		onLoad() {
			this.getNotice()
		},
		methods: {
			/**
			 * 获取通知
			 */
			getNotice() {
				let obj = {
					"xiehuiId": "1"
				}
				let that = this
				that.$u.api.getNotice(obj).then(res => {
					that.noticeList = res.list
				})
			},
			/**
			 * 前往详情
			 */
			toDetail(e) {
				uni.navigateTo({
					url: './noticeDetail?nid=' + e
				});
			},
		},

	}
</script>

<style lang="scss">

</style>
