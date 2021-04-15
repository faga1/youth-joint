<template>
	<view class="wrap">
		<view class="top"></view>
		<u-toast ref="uToast"></u-toast>
		<u-verification-code :seconds="seconds" ref="uCode" @change="codeChange"></u-verification-code>
		<view class="content">
			<view class="title">重置密码</view>
			<view>
				<input type="number" v-model="phoneNumber" placeholder="请输入手机号" />
			</view>
			<u-line color="#f2f2f2" />
			<view class="code">
				<input type="number" v-model="code" placeholder="请输入验证码" />
				<u-button class="codeBtn" size="mini" type="primary" @click="getCode">{{tips}}</u-button>
			</view>
			<u-line color="#f2f2f2" />
			<view style="margin: 70rpx 0 15rpx 0;">
				<input type="password" v-model="password" placeholder="设置密码" />
			</view>
			<u-line color="#f2f2f2" />
			<view style="margin: 70rpx 0 15rpx 0;">
				<input type="password" v-model="passwordCopy" placeholder="确认密码" />
			</view>
			<u-line color="#f2f2f2" />

			<!-- <view class="alternative">
				<view class="password"></view>
				<view class="issue" @click="backLogin">已有账号？返回登录</view>
			</view> -->

			<view class="loginBtn">
				<u-button shape="circle" size="default" type="primary" @click="reset">重置</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phoneNumber: '',
				code: '',
				password: '',
				passwordCopy: '',

				tips: '',
				seconds: 60,
			}
		},
		methods: {



			/**
			 * @param {Object} text
			 * 倒计时
			 */
			codeChange(text) {
				this.tips = text;
			},
			/**
			 * 获取验证码
			 */
			getCode() {
				if (this.$refs.uCode.canGetCode) {
					if (!this.phoneNumber) {
						this.$u.toast('请填写手机号');
						return
					}
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在获取验证码'
					})
					let obj = {
						tel: this.phoneNumber
					}
					let that = this
					that.$u.api.getCode(obj).then(res => {
						if (res.error_code === 0) {
							that.$u.toast('验证码已发送');
							that.$refs.uCode.start();
						} else {
							this.$u.toast(res.msg);
						}
					})
				} else {
					this.$u.toast('倒计时结束后再发送');
				}
			},
			/**
			 * 重置
			 */
			reset() {
				if (this.$u.test.mobile(this.phoneNumber)) {
					if (!this.code) {
						this.$u.toast('请填写验证码');
						return
					}
					if (!this.password) {
						this.$u.toast('请填写密码');
						return
					}
					if (this.password !== this.passwordCopy) {
						this.$u.toast('两次密码不一致');
						this.passwordCopy = ''
						return
					}
					let that = this
					let obj = {
						code: that.code,
						phoneNumber: that.phoneNumber,
						password: that.password,
					}
					that.$u.api.resetPassword(obj).then(res => {
						if (res.error_code === 0) {
							that.$refs.uToast.show({
								title: '重置成功',
								type: 'success',
								duration: 2000,
							})
							setTimeout(() => {
								uni.navigateBack(1)
							}, 2000)
						}
					})
				} else {
					this.$u.toast('手机号格式不正确');
				}
			},

		}
	};
</script>

<style lang="scss" scoped>
	.wrap {
		font-size: 28rpx;
		background-color: #fff;

		.content {
			width: 600rpx;
			padding-top: 80rpx;
			margin: 0rpx auto 0;

			.loginBtn {
				padding: 250rpx 0 150rpx 0;
			}

			.code {
				display: flex;
				margin: 70rpx 0 15rpx 0;
				position: relative;

				.codeBtn {
					position: absolute;
					right: 10rpx;
					top: 5rpx;
				}
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

			.tips {
				color: $u-type-info;
				margin-bottom: 60rpx;
				margin-top: 8rpx;
			}

			.getCaptcha {
				background-color: rgb(253, 243, 208);
				color: $u-tips-color;
				border: none;
				font-size: 30rpx;
				padding: 12rpx 0;

				&::after {
					border: none;
				}
			}

			.alternative {
				color: $u-tips-color;
				display: flex;
				justify-content: space-between;
				margin-top: 30rpx;
			}
		}

		.buttom {
			.loginType {
				display: flex;
				padding: 150rpx 150rpx 150rpx 150rpx;
				justify-content: space-between;

				.item {
					display: flex;
					flex-direction: column;
					align-items: center;
					color: $u-content-color;
					font-size: 28rpx;
				}
			}

			.hint {
				padding: 20rpx 40rpx;
				font-size: 20rpx;
				color: $u-tips-color;

				.link {
					color: $u-type-warning;
				}
			}
		}
	}
</style>
