<template>
	<view class="wrap">
		<view class="top"></view>
		<view class="content">
			<view class="title">三秦青年云平台</view>
			<view>
				<input type="number" v-model="phoneNumber" placeholder="请输入手机号" />
			</view>
			<u-line color="#f2f2f2" />
			<view style="margin: 70rpx 0 15rpx 0;">
				<input type="password" v-model="password" placeholder="请输入密码" />
			</view>
			<u-line color="#f2f2f2" />

			<view class="alternative">
				<view class="issue" @click="toForget">忘记密码</view>
			</view>

			<view class="loginBtn">
				<u-button shape="circle" size="default" type="primary" @click="login">登录</u-button>
			</view>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phoneNumber: '',
				password: '',
			}
		},
		computed: {},

		onShow() {
			if (uni.getStorageSync('memberId')) {
				// this.loginresults(uni.getStorageSync('memberId'))
				uni.switchTab({
					url: "../home/home"
				})
			}
		},

		methods: {
			/**
			 * 忘记密码
			 */
			toForget() {
				uni.navigateTo({
					url: "../../pagesA/pages/login/forget"
				})
			},

			/**
			 * 登录
			 */
			login() {
				if (this.$u.test.mobile(this.phoneNumber)) {
					if (!this.password) {
						this.$u.toast('请填写密码');
						return
					}
					let that = this
					let obj = {
						phoneNumber: that.phoneNumber,
						password: that.password
					}
					that.$u.api.login(obj).then(res => {
						if (res.error_code === 0) {
							// that.loginresults(res.data.memberId)
							uni.setStorageSync('memberId', res.data.memberId);
							uni.switchTab({
								url: "../home/home"
							})
						} else {
							this.$u.toast(res.msg);
						}
					})
				} else {
					this.$u.toast('手机号格式不正确');
				}
			},

			/**
			 * 登录记录
			 */
			// loginresults(memberId) {
			// 	let that = this
			// 	let obj = {
			// 		memberId: memberId,
			// 	}
			// 	that.$u.api.loginresult(obj).then(res => {
			// 		if (res.error_code === 0) {

			// 		} else {
			// 			this.$u.toast(res.msg);
			// 		}
			// 	})
			// },
		}
	};
</script>

<style lang="scss" scoped>
	.wrap {
		font-size: 28rpx;
		background-color: #fff;
		position: relative;



		.content {
			width: 600rpx;
			padding-top: 80rpx;
			margin: 0rpx auto 0;

			.loginBtn {
				margin-top: 250rpx;
			}



			.title {
				text-align: left;
				font-size: 60rpx;
				font-weight: 500;
				margin-bottom: 100rpx;
			}

			input {
				text-align: left;
				margin-bottom: 10rpx;
				padding-bottom: 6rpx;
			}





			.alternative {
				color: $u-tips-color;
				display: flex;
				justify-content: space-between;
				margin-top: 30rpx;
			}
		}
	}
</style>
