<template>
	<view>
		<u-cell-group>
			<u-cell-item v-for="(item,index) in dataList" :title="item.title" @click="toDetail(item.id)"></u-cell-item>
		</u-cell-group>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataList: [],
			};
		},
		onShow() {
			this.getGuizhangList()
		},
		methods: {
			/**
			 * 获取规章列表
			 */
			getGuizhangList() {
				let that = this
				let obj = {}
				that.$u.api.guizhangList(obj).then(res => {
					console.log(res);
					that.dataList = res.list
				})
			},

			/**
			 * 前往详情
			 */
			toDetail(id) {
				uni.navigateTo({
					url: "./regulationDetail?id=" + id
				})
			},
		}

	}
</script>

<style lang="scss">
	.innerh5 {
		padding: 30rpx;
		background: #fff;
	}
</style>
