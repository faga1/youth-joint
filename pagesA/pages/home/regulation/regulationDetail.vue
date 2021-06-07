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
		onLoad(option) {
			let optionId = option.id
			this.getGuizhangInfo(optionId)
		},
		methods: {
			/**
			 * 获取协会章程
			 */
			getGuizhangInfo(e) {
				let obj = {
					"id": e
				}
				let that = this
				that.$u.api.guizhangInfo(obj).then(res => {
					that.content = res.data.content
				})
			},
		}

	}
</script>

<style lang="scss">

</style>
