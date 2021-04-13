<template>
	<view class="user">
		<!-- 头部 -->
		<view class="user-wrap">
			<view class="setting" @click="scanCode()">
				<u-image src="/static/img/user/scan.png" width="45rpx" height="45rpx"></u-image>
			</view>
			<view class="info">
				<u-avatar class="avatar" :src="userInfo.touxiang" :size="140" @click="toUserCenter"></u-avatar>
				<view class="nickname">{{ userInfo.name }}</view>
				<view class="nickname" v-if="userInfo.shehuizhiwulist&&userInfo.shehuizhiwulist.length>0">
					{{ userInfo.shehuizhiwulist[0].shehuizhiwu }}
				</view>
			</view>
		</view>

		<!-- 用户功能 -->
		<view class="com-item">
			<view class="com-wrap">
				<view class="cell" v-for="(item, index) in userList" :key="index" @click="toPage(item.path)">
					<view class="cell-left">
						<u-image width="50rpx" height="50rpx" class="cell-icon" :src="item.icon" mode="aspectFill">
						</u-image>
						<view class="cell-text">{{ item.title }}</view>
					</view>
					<u-image class="iconfont" width="32rpx" height="32rpx" src="/static/img/home/icon_right.png">
					</u-image>
				</view>
			</view>
		</view>

		<br>
		<u-toast ref="uToast" />
		<u-modal v-model="modShow" :show-title="false" :content="content"></u-modal>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				modShow: false,
				content: "签到成功",
				isMember: true,
				uid: uni.getStorageSync('memberId'),
				userInfo: {},
				userList: [{
						title: '个人中心',
						icon: '/static/img/user/icon-00.png',
						path: 'userCenter'
					},
					{
						title: '我的活动',
						icon: '/static/img/user/icon-07.png',
						path: 'myActive'
					}, {
						title: '系统通知',
						icon: '/static/img/user/icon-08.png',
						path: 'kefu'
					},
					{
						title: '系统设置',
						icon: '/static/img/user/icon-09.png',
						path: 'systemSet'
					},
				],
			};
		},
		onLoad() {
			this.uid = uni.getStorageSync('memberId')
			this.getUserDetail()
		},
		onShow() {
			this.getUserDetail()
		},
		methods: {
			/**
			 * @param {Object} path
			 * 跳转
			 */
			toPage(path) {
				if (path === 'userCenter') {
					this.uid = uni.getStorageSync('memberId')
					uni.navigateTo({
						url: "/pagesA/pages/user/userCenter/userCenter?uid=" + this.uid
					})
				} else {
					uni.navigateTo({
						url: "/pagesA/pages/user/" + path + "/" + path
					})
				}

			},
			/**
			 * 跳转用户中心
			 */
			toUserCenter() {
				this.uid = uni.getStorageSync('memberId')
				uni.navigateTo({
					url: "/pagesA/pages/user/userCenter/userCenter?uid=" + this.uid
				})
			},
			/**
			 * 扫码
			 */
			scanCode() {
				let that = this
				uni.scanCode({
					onlyFromCamera: true,
					success: function(res) {
						that.getActiveDetail(res.result)
					}
				});
			},
			/**
			 * @param {Object} e
			 * 活动类容判断
			 */
			getActiveDetail(e) {
				uni.showLoading({
					title: '签到中...'
				})
				let obj = {
					"activityId": e,
					"memberId": uni.getStorageSync('memberId'),
				}
				let that = this
				that.$u.api.getActiveDetail(obj).then(res => {
					if (res.data) {
						that.signedActive(e)
					} else {
						uni.hideLoading()
						that.content = "活动不存在"
						that.modShow = true
					}
				})
			},
			/**
			 * @param {Object} e
			 * 活动签到
			 */
			signedActive(e) {
				let obj = {
					"activityId": e,
					"memberId": uni.getStorageSync('memberId'),
				}
				let that = this
				that.$u.api.signedActive(obj).then(res => {
					uni.hideLoading()
					if (res.error_code === 0) {
						that.content = "签到成功"
						that.modShow = true
					} else {
						that.modShow = true
						that.content = res.msg
					}
				})
			},
			
			/**
			 * 获取个人信息
			 */
			getUserDetail() {
				let that = this
				let obj = {
					memberId: uni.getStorageSync('memberId'),
				}
				that.$u.api.getLeaderDetail(obj).then(res => {
					if (res.error_code === 0) {
						that.userInfo = res.data
						if (res.data.sfstate === "1") {
							that.isMember = true
							uni.setStorageSync('isMember', true);
						} else {
							that.isMember = false
							uni.setStorageSync('isMember', false);
						}
					} else {}
				})
			}
		}
	};
</script>

<style lang="scss">
	page {
		background-color: #f2f2f2;
	}

	.btn-hover {
		background: #f2f2f2 !important;
	}

	.user {
		.user-wrap {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 57vw;
			padding: 30rpx;
			z-index: 9;
			border-radius: 0 0 12% 12%;
			// background: url('https://youngbucket.oss-cn-hangzhou.aliyuncs.com/0eb96bca-fd31-4f72-9386-f82c67da8894.jpg') no-repeat;
			background: url('https://youngbucket.oss-cn-hangzhou.aliyuncs.com/0b0fa999-6657-4da9-94a4-c1e8d05ba252.jpg') no-repeat;
			background-size: cover;

			.setting {
				color: #fff;
				position: absolute;
				top: 24rpx;
				right: 24rpx;
			}

			.info {
				position: absolute;
				text-align: center;

				.avatar {
					margin: 0 auto;
					// width: 150rpx;
					// height: 150rpx;
					// border-radius: 50%;
				}

				.nickname {
					color: #fff;
					font-size: 32rpx;
				}
			}
		}

		.order-status {
			padding: 0 20rpx;
			margin-top: -10vw;

			.status-wrap {
				border-radius: 25rpx;
				overflow: hidden;

				.status-list {
					display: flex;
					justify-content: space-evenly;
					align-items: center;
					background: #fff;
					padding-top: 30rpx;
					padding-bottom: 30rpx;

					.status-item {
						flex: 1;
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;

						.item-icon {
							line-height: 1;
							font-size: 65rpx;
							color: #bbb;
						}

						.item-text {
							font-size: 28rpx;
							color: #666;
							margin-top: 5rpx;
						}
					}
				}
			}
		}

		.com-item {
			padding-left: 20rpx;
			padding-right: 20rpx;
			margin-top: 20rpx;

			.com-wrap {
				border-radius: 25rpx;
				overflow: hidden;
			}
		}

		.cell {
			height: 80rpx;
			padding-left: 20rpx;
			padding-right: 20rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			background: #fff;
			border-bottom: 1px solid #f8f8f8;

			&:active {
				background: #f2f2f2;
			}

			&:last-child {
				border-bottom: none !important;
			}

			.cell-left {
				display: flex;
				align-items: center;

				.cell-icon {
					width: 50rpx;
					height: 50rpx;
				}

				.cell-text {
					color: #666;
					font-size: 32rpx;
					margin-left: 20rpx;
				}
			}

			.iconfont {
				color: #999;
			}
		}
	}
</style>
