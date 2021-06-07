<style>
	.u-cell {
		padding: 16rpx 32rpx
	}
</style>
<template>
	<view class="u-skeleton">
		<u-swiper class="u-skeleton-fillet" height="320" :list="bannerList" border-radius="0" :effect3d="false"
			duration="1200"></u-swiper>
		<u-grid class="grid" :col="4" :border="false" @click="gridClick">
			<u-grid-item :index="1">
				<u-image width="108rpx" height="108rpx" shape="circle" :lazy-load="true"
					src="/static/img/home/home_icon01.png"></u-image>
				<view class="grid-text">青联简介</view>
			</u-grid-item>
			<u-grid-item :index="2">
				<u-image width="108rpx" height="108rpx" shape="circle" :lazy-load="true"
					src="/static/img/home/home_icon02.png"></u-image>
				<view class="grid-text">界别活动</view>
			</u-grid-item>
			<u-grid-item :index="3">
				<u-image width="108rpx" height="108rpx" shape="circle" :lazy-load="true"
					src="/static/img/home/home_icon3.png"></u-image>
				<view class="grid-text">会员团体</view>
			</u-grid-item>
			<u-grid-item :index="4">
				<u-image width="108rpx" height="108rpx" shape="circle" :lazy-load="true"
					src="/static/img/home/home_icon05.png"></u-image>
				<view class="grid-text">青联规章</view>
			</u-grid-item>
		</u-grid>
		<u-gap height="10" bg-color="rgb(247,247,247)"></u-gap>
		<view class="noticeRow" v-if="noticeList.length>0" @click="toNotice">
			<view class="notL">
				<view class="notTab">通知</view>
			</view>
			<view class="notC">
				<u-notice-bar font-size="36" mode="vertical" :list="noticeList" type="none" :volume-icon="false">
				</u-notice-bar>
			</view>
			<view class="notR">
				<u-image width="32rpx" height="32rpx" src="/static/img/home/icon_right.png"></u-image>
			</view>
		</view>
		<!-- 	<u-gap height="10" bg-color="rgb(247,247,247)"></u-gap>
		<u-cell-group :border="false" :title-style="{'padding': '20rpx 32rpx'}" style="padding:'10px 16px'">
			<u-cell-item :border-bottom="false"
				:title-style="{'font-size': '36rpx','font-weight':'600','color':'#333333'}" :arrow="false" title="委员风采"
				value="更多" @click="toVipStyle">
				<u-image slot="icon" width="42rpx" height="42rpx" style="margin-right: 15rpx;"
					src="/static/img/home/icon_vip.png"></u-image>
				<u-image slot="right-icon" width="32rpx" height="32rpx" src="/static/img/home/icon_right.png"></u-image>
			</u-cell-item>
		</u-cell-group>
		<u-divider :use-slot="false" half-width="45%" />
		<u-swiper v-if="vipStyleImg.length>0" class="swiper2" :list="vipStyleImg" bg-color="#fff" height="400"
			:effect3d="true" @click="toVipStyle">
		</u-swiper> -->
		<u-gap height="10" bg-color="rgb(247,247,247)"></u-gap>
		<u-cell-group :border="false">
			<u-cell-item :border-bottom="false"
				:title-style="{'font-size': '36rpx','font-weight':'600','color':'#333333'}" :arrow="false" title="活动"
				value="更多" @click="toActive">
				<u-image slot="icon" width="40rpx" height="40rpx" style="margin-right: 15rpx;"
					src="/static/img/home/giftac.png"></u-image>
				<u-image slot="right-icon" width="32rpx" height="32rpx" src="/static/img/home/icon_right.png"></u-image>
			</u-cell-item>
		</u-cell-group>
		<u-divider :use-slot="false" half-width="45%" />
		<view class="activeBox">
			<template v-for="(item,index) in activeList">
				<view class="activeItem" @click="toDetail(item.activityId)">
					<view class="watchNum">
						<u-image width="34rpx" height="34rpx" src="/static/img/active/see.png"></u-image>
						<span style="margin-left:10rpx;">{{item.chakannum}}</span>
					</view>
					<view class="activeImg">
						<u-image width="230rpx" height="168rpx" border-radius="20" :src="item.fengmian"></u-image>
					</view>
					<view class="activeCont">
						<view class="actText">{{item.name}}</view>
						<view class="actType">{{item.leibie==="1"?"青联活动":"界别活动"+"--"+item.jiebie}}</view>
						<view class="actTime">{{item.createtime}}</view>
					</view>
					<u-button v-if="item.baomingstate==='2'" class="btn" type="primary" size="mini"
						@click="joinIn(item.activityId)">
						立即报名</u-button>
					<u-button v-if="item.baomingstate==='1'" class="btn" type="primary" size="mini">已报名</u-button>
				</view>
				<u-divider :use-slot="false" half-width="45%" />
			</template>
		</view>
		<u-gap height="10" bg-color="rgb(247,247,247)"></u-gap>
		<u-toast ref="uToast" />
		<!-- 骨架 -->
		<u-skeleton :loading="loading" :animation="true" bgColor="#FFF"></u-skeleton>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isMember: true,
				bannerList: [], //轮播图数据
				noticeList: [], //通知
				vipStyleList: [], //会员风采
				vipStyleImg: [], //会员风采
				activeList: [], //活动
				loading: true,
			};
		},
		onShow() {
			this.getNotice()
			this.isMembers()
			this.getActive()
		},
		methods: {
			/**
			 * @param {Object} e
			 * 前往详情
			 */
			toDetail(e) {
				uni.navigateTo({
					url: '../active/activeDetail?aid=' + e
				});
			},
			/**
			 * 前往活动
			 */
			toActive() {
				uni.setStorageSync('leibie', "0");
				uni.navigateTo({
					url: '../../pagesA/pages/home/active/active?leibieType=0'
				});
			},
			/**
			 * 前往通知公告
			 */
			toNotice() {
				uni.navigateTo({
					url: '../../pagesA/pages/home/notice/notice'
				});
			},
			/**
			 * 前往会员风采
			 */
			toVipStyle(e) {
				if (e !== '') {
					uni.navigateTo({
						url: '../../pagesA/pages/home/vipStyle/vipStyle?fengcaiId=' + this.vipStyleList[e]
							.fengcaiId +
							"&index=" + e
					});
				} else {
					uni.navigateTo({
						url: '../../pagesA/pages/home/vipStyle/vipStyle'
					});
				}

			},
			/**
			 * 九宫格点击事件
			 */
			gridClick(e) {
				if (e === 1) {
					uni.navigateTo({
						url: '../../pagesA/pages/home/societyIntro/societyIntro'
					})
				}
				if (e === 2) {
					if (this.isMember) {
						uni.navigateTo({
							url: '../../pagesA/pages/home/jiebieActive/jiebieActive'
						});
					} else {
						this.$refs.uToast.show({
							title: "您还不是会员",
							type: 'error',
						})
					}
				}
				if (e === 3) {
					if (this.isMember) {
						uni.navigateTo({
							url: '../../pagesA/pages/home/league/league'
						});
					} else {
						this.$refs.uToast.show({
							title: "您还不是会员",
							type: 'error',
						})
					}
				}

				if (e === 4) {
					uni.navigateTo({
						url: '../../pagesA/pages/home/regulation/regulation'
					});
				}
			},
			/**
			 * 获取轮播图
			 */
			getBanner() {
				let obj = {
					"xiehuiId": "1"
				}
				let that = this
				that.$u.api.getBanner(obj).then(res => {
					that.bannerList = []
					res.list.forEach(item => {
						that.bannerList.push(item.picurl)
					})
					that.loading = false
				})
			},
			/**
			 * 获取通知
			 */
			getNotice() {
				let obj = {
					"xiehuiId": "1"
				}
				let that = this
				that.noticeList = []
				that.$u.api.getNotice(obj).then(res => {
					res.list.forEach(item => {
						if (item.state === "1") {
							that.noticeList.push(item.title)
						}
					})
					// that.noticeList = res.list
				})
			},
			/**
			 * 获取会员风采
			 */
			getVipStyle() {
				let obj = {
					"xiehuiId": "1"
				}
				let that = this
				that.$u.api.getVipStyle(obj).then(res => {
					that.vipStyleList = res.list
					that.vipStyleImg = []
					res.list.forEach(item => {
						that.vipStyleImg.push(item.fengmian)
					})
				})
			},
			/**
			 * 获取活动列表
			 */
			getActive() {
				let obj = {
					"xiehuiId": "1",
					"memberId": uni.getStorageSync('memberId'),
					"state": "1",
					"leibie": '1',
					"pageNo": 1,
					"pageSize": 3,
				}
				let that = this
				that.$u.api.getActive(obj).then(res => {
					that.activeList = res.list
				})
			},
			getBusinessCircle() {
				let obj = {
					"xiehuiId": "1",
					"pageNo": 1,
					"pageSize": 3,
					"jiedanmemberId": uni.getStorageSync('memberId'),
					"state": "1"
				}
				let that = this
				that.$u.api.getBusinessCircle(obj).then(res => {
					that.businessCircle = res.list
				})
			},


			/**
			 * 报名
			 */
			joinIn(e) {
				let obj = {
					"activityId": e,
					"memberId": uni.getStorageSync('memberId'),
				}
				let that = this
				that.$u.api.joinInActive(obj).then(res => {
					console.log(res);
					if (res.error_code === 0) {
						that.$refs.uToast.show({
							title: res.data,
							type: 'success ',
						})
						that.getActive()
					} else {
						that.$refs.uToast.show({
							title: res.msg,
							type: 'warning ',
						})
					}
				})
			},
			/**
			 * @param {Object} companyId
			 * @param {Object} quanziId
			 * 我要接单
			 */
			acceptOrders(companyId, quanziId) {
				let that = this
				let obj = {
					companyId: companyId,
					quanziId: quanziId,
					memberId: uni.getStorageSync('memberId')
				}
				that.$u.api.acceptOrder(obj).then(res => {
					console.log(res);
					if (res.error_code === 0) {
						that.$refs.uToast.show({
							title: '接单成功',
							type: 'success',
						})
						that.getBusinessCircle()
					} else {
						that.$refs.uToast.show({
							title: res.msg,
							type: 'error',
						})
					}
				})
			},
			isMembers() {
				let that = this
				let obj = {
					memberId: uni.getStorageSync('memberId')
				}
				that.$u.api.getLeaderDetail(obj).then(res => {
					if (res.error_code === 0) {
						if (res.data.sfstate === "1") {
							that.isMember = true
							uni.setStorageSync('isMember', true);
						} else {
							that.isMember = false
							uni.setStorageSync('isMember', false);
						}
					} else {}
				})
			},
		},
		created() {
			this.isMembers()
			this.getBanner()
			this.getNotice()
			this.getVipStyle()
			this.getActive()
			// this.getBusinessCircle()
		}

	}
</script>

<style lang="scss">
	.grid {
		padding: 0 30rpx;
		background: #fff;
	}

	.grid-text {
		font-size: 34rpx;
		color: #666666;
		margin-top: 4rpx;
	}

	.noticeRow {
		background-color: #fff;
		padding: 10rpx 30rpx;
		display: flex;

		.notL {
			width: 49px;
			display: flex;
			flex-direction: column;
			justify-content: space-around;

			.notTab {
				width: 54px;
				padding: 5rpx 14rpx;
				color: #ffffff;
				border: 1px solid #d81e06;
				background: #d81e06;
				border-radius: 6px;
				font-size: 36rpx;
				text-align: center;
			}
		}

		.notC {
			flex-grow: 1;
			color: #666666;
		}

		.notR {
			display: flex;
			flex-direction: column;
			justify-content: space-around;
		}
	}

	.swiper2 {
		padding: 40rpx 0 55rpx 0;
		background: #fff;
	}

	.activeBox {
		background: #fff;

		.activeItem {
			display: flex;
			padding: 20rpx 30rpx;
			position: relative;

			.watchNum {
				display: flex;
				position: absolute;
				bottom: 10rpx;
				right: 34rpx;
				font-size: 24rpx;
			}

			.btn {
				position: absolute;
				right: 30rpx;
				bottom: 48rpx;
				font-size: 22rpx;
				height: 68rpx;
				line-height: 68rpx;
			}

			.activeImg {
				width: 230rpx;
			}

			.activeCont {
				flex-grow: 1;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				padding: 15rpx;

				.actText {
					// flex-grow: 1;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
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

	.circleBox {
		background: #fff;
		padding: 15px;
		position: relative;

		.msk {
			position: absolute;
			top: 0px;
			z-index: 999;
			left: 0px;
		}

		.circleBoxCard {
			background: #fff;
			box-shadow: 0px 0px 2px #efefef;
			border: 1px solid #efefef;
			border-radius: 12px;
			display: flex;
			flex-direction: column;
			position: relative;
			padding: 45rpx 40rpx;
			overflow: hidden;
			line-height: 50rpx;
			margin-bottom: 15px;

			.circleType {
				width: 160rpx;
				text-align: center;
				padding: 0rpx 20rpx;
				background: #ffe8e8;
				color: #ff8a8d;
				border-bottom-left-radius: 16px;
				position: absolute;
				top: 0px;
				right: 0px;
				font-size: 24rpx;
			}

			.circleTypes {
				width: 220rpx;
				text-align: center;
				padding: 0rpx 20rpx;
				background: #d7dff7;
				color: #355fd6;
				border-bottom-left-radius: 16px;
				position: absolute;
				top: 0px;
				right: 0px;
				font-size: 28rpx;
			}

			.name {
				font-size: 36rpx;
				font-weight: 600;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}

			.contentBox {
				display: flex;

				.infoTitle {
					min-width: 116rpx;
					font-size: 26rpx;
					color: #666666;
				}

				.info {
					flex-grow: 1;
					font-size: 26rpx;
					color: #666666;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
				}
			}

			.moneyBox {
				display: flex;

				.moneyTitle {
					width: 120rpx;
					font-size: 26rpx;
					color: #666666;
				}

				.money {
					flex-grow: 1;
					font-size: 26rpx;
					color: #355fd6;
				}
			}

			.companyBox {
				display: flex;

				.iconImg {
					width: 15px;
					height: 15px;
				}

				.companyName {
					padding: 0px 10rpx;
					flex-grow: 1;
					font-size: 26rpx;
					color: #666666;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
			}

			.btn {
				position: absolute;
				right: 30rpx;
				bottom: 44rpx;
				font-size: 28rpx;
			}
		}
	}
</style>
