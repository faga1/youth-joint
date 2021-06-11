<template>
	<view class="all">
		<!-- 	<u-row gutter="12">
			<u-col span="6" v-for="item in societiesList">
				<view class="swiper-item1" @click="toDetail(item.shetuanId,item.name,item.logo)">
					<view class="infoBox1" :style="{'background-image':'url('+item.logo+')'}">
						{{item.name}}
					</view>
				</view>
			</u-col>
		</u-row> -->

		<u-cell-group>
			<u-cell-item v-for="item in societiesList" :title="item.name"
				@click="toDetail(item.shetuanId,item.name,item.jianjie)"></u-cell-item>
		</u-cell-group>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				societiesList: [],
			};
		},
		methods: {

			/**
			 * 获取协会团体
			 */
			getSocieties() {
				let obj = {
					"xiehuiId": "1"
				}
				let that = this
				that.$u.api.getSocieties(obj).then(res => {
					that.societiesList = res.list
					that.loading = false
				})
			},
			/**
			 * 前往详情
			 */
			toDetail(id, title, jianjie) {
				uni.navigateTo({
					url: './leagueDetail/leagueDetail?lid=' + id + "&title=" + title + "&jianjie=" + jianjie
				});
			},
		},
		created() {
			this.getSocieties()
		}
	}
</script>

<style lang="scss">
	.all {
		padding: 0 12rpx;
		// background-color: #fff;
	}

	.u-col {
		margin: 8rpx 0;
	}

	.swiper-item1 {
		padding: 7rpx
	}

	.infoBox1 {
		border-radius: 8px;
		box-shadow: 0px 0px 7px #eff1f8;
		overflow: hidden;
		padding: 20rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		text-align: center;
		height: 220rpx;
		background-position: center;
		background-size: 100% 100%;
		font-size: 30rpx;
		color: #fff;
		font-weight: 600;
	}
</style>
