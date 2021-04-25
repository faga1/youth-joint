<template>
	<view class="user">
		<view class="user-wrap">
			<u-image v-if="!noEdit" class="iconfont setting" width="54rpx" height="48rpx"
				src="/pagesA/static/img/user/edit.png" @click="toEdit"></u-image>
			<view class="info">
				<u-avatar class="avatar" :src="userInfo.touxiang" :size="140"></u-avatar>
				<view class="nickname">{{ userInfo.name }}</view>
				<view class="nickname" v-if="userInfo.shehuizhiwulist&&userInfo.shehuizhiwulist.length>0">
					{{ userInfo.shehuizhiwulist[0].shehuizhiwu }}
				</view>
			</view>
		</view>

		<view class="infoBox">
			<view class="formBox">
				<u-form :label-width="noEdit?120:200" label-position="left" :label-style="labelStyle ">
					<u-form-item label="民族" prop="minzu" v-if="!noEdit">
						<p class="FormText">{{userInfo.minzu}}</p>
					</u-form-item>
					<u-form-item label="出生年月" prop="birthday" v-if="!noEdit">
						<p class="FormText">{{userInfo.birthday}}</p>
					</u-form-item>
					<u-form-item label="学历" prop="xueliText" v-if="!noEdit">
						<p class="FormText">{{userInfo.xueli}}</p>
					</u-form-item>
					<u-form-item label="籍贯" prop="jiguan" v-if="!noEdit">
						<p class="FormText">{{userInfo.jiguan}}</p>
					</u-form-item>
					<u-form-item label="政治面貌" prop="zzmmText" v-if="!noEdit">
						<p class="FormText">{{userInfo.zzmm}}</p>
					</u-form-item>
					<u-form-item label="身份证号" prop="idcard" v-if="!noEdit">
						<p class="FormText">{{userInfo.idcard}}</p>
					</u-form-item>
					<u-form-item label="联系电话(手机)" prop="shouji">
						<p class="FormText" @click="callTel(userInfo.shouji)">{{userInfo.shouji}}</p>
					</u-form-item>
					<u-form-item label="联系电话(固话)" prop="guhua">
						<p class="FormText" @click="callTel(userInfo.guhua)">{{userInfo.guhua}}</p>
					</u-form-item>
					<u-form-item label="个人电子邮箱" prop="youxiang">
						<p class="FormText">{{userInfo.youxiang}}</p>
					</u-form-item>
					<u-form-item label="界别" prop="jiebie">
						<p class="FormText">{{userInfo.jiebie}}</p>
					</u-form-item>
					<u-form-item label="微信" prop="weixin">
						<p class="FormText">{{userInfo.weixin}}</p>
					</u-form-item>
					<u-form-item label="QQ" prop="qq">
						<p class="FormText">{{userInfo.qq}}</p>
					</u-form-item>
					<u-form-item label="青联职务" prop="xhzw">
						<p class="FormText">{{userInfo.xhzw}}</p>
					</u-form-item>
					<u-form-item label="社会职务" prop="jianli">
						<view style="display: flex;flex-direction: column;text-align: end;width: 100%;">
							<p class="FormTexts" v-for="item in userInfo.shehuizhiwulist">{{item.shehuizhiwu}}</p>
						</view>
					</u-form-item>
					<u-form-item label="所获荣誉" prop="jianli">
						<view style="display: flex;flex-direction: column;width: 100%;">
							<view class="FormTexts" v-for="item in userInfo.gerenrongyulist">
								{{item.gerenrongyu}}
							</view>
						</view>
					</u-form-item>
					<u-form-item label="通讯地址" prop="tongxindizhi" v-if="!noEdit">
						<p class="FormText">{{userInfo.tongxindizhi}}</p>
					</u-form-item>
					<u-form-item label="邮编" prop="youbian" v-if="!noEdit">
						<p class="FormText">{{userInfo.youbian}}</p>
					</u-form-item>
					<u-form-item label="传真" prop="chuanzhen" v-if="!noEdit">
						<p class="FormText">{{userInfo.chuanzhen}}</p>
					</u-form-item>
				</u-form>
			</view>

		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				uid: "",
				noEdit: false,
				labelStyle: {
					fontSize: "24rpx",
					color: "#818181"
				},
				userInfo: {},
			};
		},
		onLoad(option) {
			this.uid = option.uid
			if (option.noEdit === "1") {
				this.noEdit = true
			} else {
				this.noEdit = false
			}
		},

		onShow() {
			this.getUserDetail()
		},
		methods: {
			/**
			 * @param {Object} tel
			 * 拨打电话
			 */
			callTel(tel) {
				console.log(tel);
				uni.makePhoneCall({
					phoneNumber: tel,
					success: (res) => {
						console.log('调用成功!')
					},
					fail: (res) => {
						console.log('调用失败!')
					}
				});
			},


			/**
			 * 前往编辑
			 */
			toEdit() {
				uni.navigateTo({
					url: "./editUserInfo"
				})
			},
			/**
			 * 获取个人信息
			 */
			getUserDetail() {
				let that = this
				let obj = {
					memberId: that.uid,
				}
				that.$u.api.getLeaderDetail(obj).then(res => {
					if (res.error_code === 0) {
						that.userInfo = res.data
						console.log(that.userInfo);
					} else {}
				})
			},
		},
	}
</script>

<style lang="scss">
	.user {
		background: #fff;
		min-height: 100vh;

		.infoBox {
			padding: 30rpx;

			.formBox {
				border: 1px solid #e4e7ed;
				border-radius: 20rpx;
				padding: 30rpx;
				box-shadow: 0px 0px 3px #e4e7ed;

				.FormText {
					font-size: 24rpx;
					width: 100%;
					text-align: end;
				}

				.FormTexts {
					font-size: 24rpx;
					width: 100%;
					text-align: start;
					margin: 10rpx 0;
					line-height: 1.5;
					padding-left: 8rpx;
					background: linear-gradient(to left, #ffffff, #68bdfd, #5676cc, #68bdfd, #ffffff);

				}

				.companys {
					margin: 10rpx 0;
					padding-left: 8rpx;
					text-align: start;
					line-height: 1.5;
					background: linear-gradient(to right, #ffffff, #68bdfd, #5676cc, #68bdfd, #ffffff);
				}
			}
		}

		.user-wrap {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 57vw;
			padding: 30rpx;
			z-index: 9;
			border-radius: 0 0 12% 12%;
			// background: url('https://youngbucket.oss-cn-hangzhou.aliyuncs.com/2e91dd46-b58f-4ba7-ab15-3be83a995558.jpg') no-repeat;
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
				}

				.nickname {
					color: #fff;
					font-size: 28rpx;
				}
			}
		}
	}
</style>
