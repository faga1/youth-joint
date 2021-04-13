<template>
	<view class="all">
		<view class="topLine"></view>
		<u-tabs class="topBtn" :list="list" :is-scroll="false" :current="current" @change="change"></u-tabs>
		<view class="activeBox">
			<template v-for="(item,index) in activeList">
				<view class="activeItem" @click.stop="toDetail(item.activityId)">
					<view class="activeImg">
						<u-image width="230rpx" height="168rpx" border-radius="20" :src="item.fengmian"></u-image>
					</view>
					<view class="activeCont">
						<view class="actText">{{item.name}}</view>
						<view class="actType">{{item.leibie==="1"?"协会活动":"公益活动"}}</view>
						<view class="actTime">{{item.createtime}}</view>
					</view>
					<!-- <u-button size="mini" v-if="item.qiandaostate==='0'" class="btn" type="warning">已报名</u-button>
					<u-button size="mini" v-if="item.qiandaostate==='1'" class="btn" type="success">签到完成</u-button> -->
				</view>
				<u-divider :use-slot="false" half-width="45%" />
			</template>
		</view>
		<u-toast ref="uToast" />
		<u-empty style="height: 180px;" v-if="emptyShow" text="暂无数据" mode="list"></u-empty>
		<u-loadmore v-if="loadShow" :status="status" :load-text="loadText" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					name: '协会活动'
				}, {
					name: '公益活动'
				}],
				current: 0,
				activeList: [],
				pageNo: 1,
				pageSize: 10,
				total: 0,
				emptyShow: false,
				loadShow: false,
				status: 'loadmore',
				loadText: {
					loadmore: '上拉加载更多',
					loading: '努力加载中',
					nomore: '实在没有了'
				}
			};
		},
		onShow() {
			this.pageNo = 1
			this.activeList = []
			this.total = 0
			this.getMySignedActiveXH()
		},
		//上拉触底事件
		onReachBottom() {
			this.loadShow = true
			const len = this.activeList.length
			if (len < this.total) {
				this.status = 'loading'
					++this.pageNo
				this.current === 0 ? this.getMySignedActiveXH() : this.getMySignedActiveGY()
			} else {
				this.status = 'nomore'
				let that = this
				setTimeout(function() {
					that.loadShow = false
				}, 1000)
			}
		},
		methods: {
			/**
			 * @param {Object} index
			 * 切换
			 */
			change(index) {
				this.current = index;
				this.pageNo = 1
				this.activeList = []
				this.total = 0
				if (this.current === 0) {
					this.getMySignedActiveXH()
				} else if (this.current === 1) {
					this.getMySignedActiveGY()
				}
			},
			/**
			 * @param {Object} e
			 * 前往详情
			 */
			toDetail(e) {
				console.log(e);
				uni.navigateTo({
					url: './myActiveDetail?aid=' + e
				});
			},

			/**
			 * 获取我签到的公益活动
			 */
			getMySignedActiveGY() {
				let obj = {
					"memberId": uni.getStorageSync('memberId'),
					"pageNo": this.pageNo,
					"pageSize": this.pageSize,
				}
				let that = this
				that.$u.api.getMySignedActiveGY(obj).then(res => {
					let list = res.list
					that.total = res.total
					that.activeList = that.activeList.concat(list);
					res.total === 0 ? this.emptyShow = true : this.emptyShow = false,
						this.loadShow = false

				})

			},
			/**
			 * 获取我签到的协会活动
			 */
			getMySignedActiveXH() {
				let obj = {
					"memberId": uni.getStorageSync('memberId'),
					"pageNo": this.pageNo,
					"pageSize": this.pageSize,
				}
				let that = this
				that.$u.api.getMySignedActiveXH(obj).then(res => {
					let list = res.list
					that.total = res.total
					that.activeList = that.activeList.concat(list);
					res.total === 0 ? this.emptyShow = true : this.emptyShow = false,
						this.loadShow = false

				})
			},
		},

	}
</script>

<style lang="scss">
	.all {
		padding: 0px 30rpx;
	}

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

	.topBtn {
		width: 100%;
		position: fixed;
		// #ifdef APP-PLUS
		top: 1px;
		// #endif
		// #ifdef MP-WEIXIN
		top: 1px;
		// #endif
		// #ifdef H5
		top: 44px;
		// #endif
		z-index: 1;
	}

	.infoBox {
		margin-top: 88rpx;
		padding: 15rpx;
		background: #f2f2f2;
		border-radius: 8px;
		display: flex;
		flex-direction: column;

		.year {
			font-size: 16px;
			color: #990055;
		}

		.info {
			display: flex;
			justify-content: space-around;

			.texts {
				flex-grow: 1;
			}
		}
	}

	.activeBox {
		margin-top: 98rpx;
		background: #fff;

		.activeItem {
			display: flex;
			padding: 20rpx 0rpx;
			position: relative;

			.btn {
				position: absolute;
				right: 30rpx;
				bottom: 44rpx;
				font-size: 22rpx;
				// height: 68rpx;
				// line-height: 68rpx;
			}

			.activeImg {
				width: 230rpx;
			}

			.activeCont {
				flex-grow: 1;
				display: flex;
				flex-direction: column;
				padding: 15rpx;

				.actText {
					flex-grow: 1;
					word-wrap: break-word;
					word-break: normal;
					font-size: 30rpx;
					font-weight: 600;
				}

				.actType {
					height: 44rpx;
					font-size: 24rpx;
					color: #ffaa00;
				}

				.actTime {
					height: 44rpx;
					font-size: 22rpx;
					color: #999;
				}
			}
		}
	}
</style>
