<template>
	<view class="all">
		<u-image class="img" width="100%" mode="widthFix" border-radius="8px" :src="logo" @click="toInfo"></u-image>
		<!-- <br> -->
		<u-cell-group :border="false">
			<u-cell-item :border-bottom="false" :title-style="{'font-size': '32rpx','font-weight':'600','color':'#333333'}"
			 :arrow="false" title="社团活动">
				<u-image slot="icon" width="42rpx" height="42rpx" style="margin-right: 15rpx;" src="/pagesA/static/img/society/active.png"></u-image>
			</u-cell-item>
			<u-divider :use-slot="false" half-width="45%" />
			<template v-for="item in societAtcList">
				<u-cell-item class="listItem" :border-bottom="false" :title-style="titleStyle" :arrow="false" :title="item.name"
				 :value="item.createtime.slice(0,10)" :value-style="valueStyle" @click="toDetail(item.huodongId,item.name)">
				</u-cell-item>
				<u-divider :use-slot="false" half-width="45%" />
			</template>
		</u-cell-group>
		<!-- <u-empty text="暂无数据" mode="data" :show="societAtcList.length===0"></u-empty> -->

	</view>
</template>

<script>
	export default {
		data() {
			return {
				titleStyle: {
					'font-size': '26rpx',
					'flex-grow': '1',
					'overflow': 'hidden',
					'white-space': 'nowrap',
					'text-overflow': 'ellipsis',
				},
				valueStyle: {
					'font-size': '20rpx',
					'min-width': '156rpx',
				},
				societAtcList: [],
				lid: "",
				title: "",
				logo: "",
				pageno: 1,
				pageSize: 10,

			};
		},
		onLoad: function(option) {
			uni.setNavigationBarTitle({
				title: option.title
			});
			this.title = option.title
			this.lid = option.lid
			this.logo = option.logo
			this.getSocietAtc()
		},
		methods: {
			/**
			 * @param {Object} e
			 * 前往活动详情
			 */
			toDetail(id, title) {
				console.log(id);
				uni.navigateTo({
					url: './leagueDetailInfo?aid=' + id + "&title=" + title
				});
			},
			/**
			 * 前往社团详情
			 */
			toInfo() {
				uni.navigateTo({
					url: './leagueDetailInfo?sid=' + this.lid + "&title=" + this.title + '详情'
				});
			},
			/**
			 * 获取列表数据
			 */
			getSocietAtc() {
				let obj = {
					// "xiehuiId": "1",
					"shetuanId": this.lid,
					"pageno": this.pageno,
					"pageSize": this.pageSize,
				}
				let that = this
				that.$u.api.getSocietAtc(obj).then(res => {
					that.societAtcList = res.list
				})
			},



		},
		created() {
			// this.getSocietAtc()
		}

	}
</script>

<style lang="scss">
	.all {
		.img {
			padding: 24rpx;
		}
	}
</style>
