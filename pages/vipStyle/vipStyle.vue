<template>
	<view class="">
		<!-- 热门视频 -->
		<view class="searchBox">
			<view class="inputBox">
				<u-search class="search" v-model="searchPre.title" placeholder="请输入关键字" bg-color="#f2f2f2" clearabled
					:show-action="true" action-text="搜索" :animation="false" @search="search" @custom="search"
					@clear="search"></u-search>
			</view>
		</view>
		<view class="hot_video" style="margin-top: 44px;">

			<!-- 热门视频 -->
			<view class="videoBox">
				<view class="video_info" v-for="(item, index) in hot_video" :key="index">
					<!-- 图片 -->
					<view v-if="item.isShowImage" class="video_img">
						<image class="fm" :src="item.fengmian" mode=""></image>
						<view class="anNiuBox">
							<image @tap="boFang($event,item)" :data-id="item.fengcaiId" class="anNiu"
								src="/static/img/home/play.png" mode=""></image>
						</view>
					</view>
					<!-- 视频 -->
					<view v-else class="video_video">
						<video @pause="pauseVideo" @play='playVideo' :id='`t${item.fengcaiId}`'
							:data-id="item.fengcaiId" :src="item.shipinurl"
							controls show-fullscreen-btn :show-center-play-btn="false"></video>
					</view>
					<view @click="toDetail(item.shipinurl,item.fengmian,item.title,item.createtime)">
						<view class="contentText">
							{{item.title}}
						</view>
						<view class="controls">
							<view class="date">{{item.createtime}}</view>
							<view class="controlsItem">
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				isVideo: 1, //判断到底显示视频还是图片
				newPerson: false,
				hot_video: [], //热门视频
				searchPre: {
					title: "",
				},
				pageNo: 1,
				pageSize: 10,
				total: 0,
			};
		},

		//上拉触底事件
		onReachBottom() {
			this.loadShow = true
			const len = this.hot_video.length;
			if (len < this.total) {
				this.status = 'loading'
					++this.pageNo
				this.getVideoList()
			} else {
				this.status = 'nomore'
				let that = this
				setTimeout(function() {
					that.loadShow = false
				}, 1000)
			}
		},

		/**
		 * 按钮回车时
		 */
		onNavigationBarSearchInputConfirmed() {
			uni.hideKeyboard(); //隐藏软键盘
			if (this.searchPre.title.trim().length == 0) {
				//搜索框内容为空
				this.search()
				return;
			}
			//搜索框内容不为空时操作
			this.search()
		},

		created() {
			this.getVideoList()
		},
		methods: {
			/**
			 * @param {Object} e
			 * 前往详情
			 */
			toDetail(videoUrl, fengmian, title, createtime) {
				this.hot_video.forEach(item => {
					let temp = item.fengcaiId
					uni.createVideoContext('t' + temp).pause();
					uni.createVideoContext('t' + temp).seek(0)
				})
				uni.navigateTo({
					url: "./styleDetail?videoUrl=" + videoUrl + "&fengmian=" + fengmian + "&title=" + title +
						"&createtime=" + createtime
				})
			},
			/**
			 * 搜索
			 */
			search() {
				this.pageNo = 1
				this.hot_video = []
				this.getVideoList()
			},
			/**
			 * 获取会员风采
			 */
			getVideoList() {
				let that = this
				let obj = {
					xiehuiId: "1",
					pageNo: that.pageNo,
					pageSize: that.pageSize,
					title: that.searchPre.title,
				}
				that.$u.api.getVipStyle(obj).then(res => {
					res.list.forEach(item => {
						item.isShowImage = true;
					})
					let list = res.list
					that.total = res.total
					that.hot_video = that.hot_video.concat(list)
					res.total === 0 ? this.emptyShow = true : this.emptyShow = false
					that.loadShow = false
				})
			},


			/* 视频暂停 */
			pauseVideo() {
				//console.log('点击了暂停');
				//this.isVideo=2
			},
			/* 视频播放 */
			playVideo(e) {
				let currentId = e.target.dataset.id
				this.hot_video.forEach(item => {
					let temp = item.fengcaiId
					if (temp !== currentId) {
						uni.createVideoContext('t' + temp).pause();
						uni.createVideoContext('t' + temp).seek(0)
					}
				})
			},
			/* 点击图片的播放按钮 */
			boFang(e, item) {
				let currentId = e.target.dataset.id
				item.isShowImage = false;
				this.hot_video.forEach(items => {
					let temp = items.fengcaiId
					if (temp !== currentId) {
						uni.createVideoContext('t' + temp).pause();
						uni.createVideoContext('t' + temp).seek(0)
					}
				})
				uni.createVideoContext('t' + currentId).play();
			},




		}
	};
</script>
<style lang="scss">
	.searchBox {
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
		width: -webkit-fill-available;
		right: 0px;
		z-index: 999;
		background-color: #ffffff;
		display: flex;
		padding: 8rpx 10rpx;
	
		.sxBox {
			width: 120rpx;
		}
	
		.inputBox {
			flex-grow: 1;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
		}
	}
	.yinYing2 {
		width: 100%;
		position: absolute;
		height: 80upx;
		// background-image: url(../../static/yinYing.png);
		background-size: 100% 100%;
		z-index: 444;
		transform: rotate(180deg);
		bottom: 0;
		display: flex;
		align-items: center;

		/* 头像昵称 */
		.touXiang {
			height: 45upx;
			display: flex;
			z-index: 666;
			color: #FFFFFF;
			font-size: 28upx;
			transform: rotate(180deg);
			width: 320rpx;

			image {
				width: 41upx;
				height: 41upx;
				border-radius: 50%;
				margin-right: 10upx;
			}
		}

	}




	// 热门视频
	.hot_video {
		width: 95vw;
		margin: 0 auto;

		.videoBox {
			width: 100%;

			.video_info {
				width: 100%;
				margin: 10rpx 0rpx;
				border: 1px solid #bbbbbb;
				border-radius: 16rpx;
				overflow: hidden;
				box-shadow: 0px 0px 2px #bbbbbb;
				position: relative;
				background: #fff;

				/* 视频 */
				.video_video {
					width: 100%;
					height: 400rpx;
					border-radius: 16rpx;

					video {
						width: 100%;
						height: 400rpx;
						border-radius: 16rpx;
					}
				}

				/* 视频图片 */
				.video_img {
					width: 100%;
					height: 400upx;
					position: relative;
					border-radius: 15upx;
					overflow: hidden;
					box-shadow: 0 0 10upx #ccc;
					position: relative;
					overflow: hidden;

					.fm {
						width: 100%;
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate(-50%, -50%);
					}

					.anNiuBox {
						position: absolute;
						z-index: 666;
						margin: auto;
						top: 0;
						bottom: 0;
						left: 0;
						right: 0;
						width: 90upx;
						height: 90upx;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						align-items: center;

						.anNiu {
							width: 80upx;
							height: 80upx;
							border-radius: 50%;
						}
					}

					.yanBox {
						position: absolute;
						z-index: 666;
						top: 25upx;
						display: flex;
						align-items: center;
						font-size: 26upx;

						.yan {
							width: 24upx;
							height: 20upx;
							margin-right: 10upx;
							margin-left: 10rpx;
						}
					}

					.user_avatar {
						width: 41upx;
						height: 41upx;
						border-radius: 50%;
						position: absolute;
						left: 15upx;
						bottom: 15upx;
						z-index: 666;
					}
				}

				.contentText {
					background: #fff;
					padding: 26rpx 32rpx 16rpx;
					font-size: 28rpx;
					color: #333333;
					word-wrap: break-word;
				}

				.controls {
					background: #fff;
					display: flex;
					padding: 0 32rpx 24rpx;
					justify-content: space-between;

					.date {
						font-size: 22rpx;
						color: #999999;

					}

					.controlsItem {
						display: flex;

						.items {
							display: flex;
							padding: 0rpx 20rpx;
							font-size: 18rpx;
							color: #999999;

							span {
								line-height: 30rpx;
							}
						}

						.items1 {
							display: flex;
							padding: 0rpx 20rpx;
							font-size: 18rpx;
							color: #999999;
							border-right: 2px solid #999;

							span {
								line-height: 30rpx;
							}
						}
					}
				}
			}
		}
	}
</style>
