<template>
	<view>
		<u-image height="450" :src="activeDetail.fengmian"></u-image>
		<view class="content">
			<h4>{{activeDetail.name}}</h4>
			<p>时间:{{activeDetail.starttime}}~{{activeDetail.endtime}}</p>
			<p>地点:{{activeDetail.address}}</p>
			<u-parse class="innerh5" :html="h5Content" :show-with-animation="true" :lazy-load="true"></u-parse>
			<u-button shape="circle" size="mini" class="btn" type="primary" v-if="activeDetail.baomingstate==='2'"
				@click="joinIn(activeDetail.activityId)">立即报名</u-button>
			<u-button shape="circle" size="mini" class="btn" type="primary" v-if="activeDetail.baomingstate==='1'">已报名
			</u-button>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				aid: "",
				activeDetail: {},
				h5Content: "",
			};
		},
		onLoad: function(option) {
			if (option.aid) {
				this.aid = option.aid
				this.getActiveDetail()
			}
		},

		methods: {
			/**
			 * 获取活动详情
			 */
			getActiveDetail() {
				let obj = {
					"activityId": this.aid,
					"memberId": uni.getStorageSync('memberId')
				}
				let that = this
				that.$u.api.getActiveDetail(obj).then(res => {
					console.log(res);
					that.activeDetail = res.data
					uni.setNavigationBarTitle({
						title: res.data.name
					})
					if (res.data.tuiwen !== '') {
						that.h5Content = res.data.tuiwen
						return
					}
					that.h5Content = res.data.content
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
						that.getActiveDetail()
					} else {
						that.$refs.uToast.show({
							title: res.msg,
							type: 'warning ',
						})
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	.content {
		padding: 20rpx 30rpx;
		background: #fff;
		position: relative;

		p {
			font-size: 24rpx;
			color: #828282,
		}

		.btn {
			position: fixed;
			bottom: 60rpx;
			right: 60rpx
		}
	}
</style>
