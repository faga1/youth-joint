<template>
	<view class="user">
		<view class="com-item">
			<view class="com-wrap">
				<view class="cell" v-for="(item, index) in serverList" :key="index" @click="toPage(item.type)">
					<view class="cell-left">
						<view class="cell-text">{{ item.title }}</view>
					</view>
					<view class="version">{{item.value}}</view>
				<!-- 	<u-image class="iconfont" width="32rpx" height="32rpx"
						src="/static/img/home/icon_right.png"></u-image> -->
				</view>
			</view>
		</view>
		<u-toast ref="uToast" />
		<br>
		<view class="logOutBox">
			<u-button type="primary" width="75%" size="medium" shape="circle" @click="logOut">退出登录</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				serverList: [{
					title: '绑定手机',
					value: '',
					type: 1
				},{
					title: '当前版本',
					value: '0.0.1',
					type: 3
				}]
			};
		},
		onShow() {
			let memberId = uni.getStorageSync("memberId")
			if (!memberId) {
				uni.navigateTo({
					url: "../../login/login"
				})
			}
		},
		onLoad() {
			this.getUserDetail()
		},
		methods: {
			/**
			 * @param {Object} path
			 * 跳转
			 */
			toPage(type) {
				if (type === 1) {
					this.checkAndUpload()
				}
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
						that.serverList[0].value = res.data.shouji
						console.log(that.userInfo);
					} else {}
				})
			},

			logOut() {
				uni.removeStorageSync("memberId")
				uni.navigateTo({
					url: "/pages/login/login"
				})
			},
			/**
			 * 检测更新
			 */
			checkAndUpload() {
				let that = this
				// #ifdef APP-PLUS
				plus.runtime.getProperty(plus.runtime.appid, function(inf) {
					console.log("当前应用版本：" + inf.version);
					let obj = {
						version: inf.version
					}
					that.$u.api.checkAppVersion(obj).then(res => {
						console.log(res);
						if (res.error_code === 0) {
							let url = res.data
							uni.showModal({
								title: "更新提示",
								content: '检测到新的版本',
								success: (res) => {
									if (res.confirm) {
										plus.runtime.openURL(url);
									}
								}
							})
						} else {
							that.$refs.uToast.show({
								title: '暂无更新',
							})
						}
					})
				});
				// #endif
				// #ifdef MP-WEIXIN
				// #endif
				// #ifdef H5
				// #endif
			},
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
		.logOutBox {
			width: 100%;
			display: flex;
			justify-content: space-around;
			margin-top: 20rpx;
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
					font-size: 28rpx;
					margin-left: 20rpx;
				}
			}

			.version {
				font-size: 28rpx;
				color: #999;
			}

			.iconfont {
				color: #999;
			}
		}
	}
</style>
