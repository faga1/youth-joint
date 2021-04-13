<template>
	<view class="all">
		<view class="searchBox">
			<view class="inputBox">
				<u-search class="search" v-model="searchPre.title" placeholder="请输入关键字" bg-color="#f2f2f2" clearabled
					:show-action="true" action-text="搜索" :animation="false" @search="search" @custom="search"
					@clear="search"></u-search>
			</view>
		</view>
		<view style="margin-top: 44px;">
			<view class="videoBox" v-for="(item,index) in videoList">
				<video class="videos" :id="item.fengcaiId" :src="item.shipinurl" @error="videoErrorCallback" controls
					show-fullscreen-btn :show-center-play-btn="false" :poster="item.fengmian"
					@play="playVideo(item.fengcaiId,index)" @fullscreenchange="fullscreenchanges">
					<cover-image class="img" v-if="(index!==clickIndex)&&playBtnShow"
						@click="playVideo(item.fengcaiId,index)" src="/pagesA/static/img/vipStyle/play.png">
					</cover-image>
				</video>
				<view @click="toDetail(item.shipinurl,item.fengmian,item.title,item.createtime)">
					<view class="contentText">
						{{item.title}}
					</view>
					<view class="controls">
						<view class="date">{{item.createtime}}</view>
						<view class="controlsItem">
							<!-- <view class="items" @click="wxShare(item.fengmian,item.title,item.shipinurl)">
								<u-image width="32rpx" height="32rpx" src="/pagesA/static/img/vipStyle/share.png"></u-image>
							</view> -->
						</view>
					</view>
				</view>
			</view>
		</view>
		<u-empty style="height: 180px;" v-if="emptyShow" text="暂无数据" mode="list"></u-empty>
		<u-loadmore v-if="loadShow" :status="status" :load-text="loadText" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				playBtnShow: true,
				searchPre: {
					title: "",
				},
				beforeVid: "",
				videoContext: {},
				videoList: [],
				clickIndex: -1,
				loadShow: false,
				pageNo: 1,
				pageSize: 10,
				total: 0,
				emptyShow: false,
				status: 'loadmore',
				loadText: {
					loadmore: '上拉加载更多',
					loading: '努力加载中',
					nomore: '实在没有了'
				}
			}
		},
		//上拉触底事件
		onReachBottom() {
			this.loadShow = true
			const len = this.videoList.length;
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
		onLoad(option) {
			if (option.fengcaiId) {}
		},
		/**
		 * @param {Object} e
		 * 输入框输入时
		 */
		onNavigationBarSearchInputChanged(e) {
			this.searchPre.title = e.text;
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

		/**
		 * 搜索按钮
		 */
		onNavigationBarButtonTap() {
			this.search()
		},
		methods: {
			/**
			 * @param {Object} e
			 * 前往详情
			 */
			toDetail(videoUrl, fengmian, title, createtime) {
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
				this.videoList = []
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
					let list = res.list
					that.total = res.total
					that.videoList = that.videoList.concat(list)
					res.total === 0 ? this.emptyShow = true : this.emptyShow = false
					that.loadShow = false
				})
			},
			/**
			 * @param {Object} e
			 * 播放
			 */
			playVideo(e, index) {
				if (this.beforeVid !== e) {
					uni.createVideoContext(`${this.beforeVid}`, this).pause()
					uni.createVideoContext(`${this.beforeVid}`, this).seek(0)
				}
				this.clickIndex = index
				this.beforeVid = e
				uni.createVideoContext(`${e}`, this).play()
			},
			/**
			 * @param {Object} e
			 * 全屏 非全屏
			 */
			fullscreenchanges(e) {
				if (e.detail.fullScreen) {
					this.playBtnShow = false
				} else {
					this.playBtnShow = true
				}
			},

			/**
			 * @param {Object} img
			 * @param {Object} text
			 * @param {Object} url
			 * 微信分享
			 * 需要appid 才可运行 
			 */
			// wxShare(img, text, url) {
			// 	// #ifdef APP-PLUS
			// 	uni.share({
			// 		provider: "weixin",
			// 		scene: "WXSceneSession",
			// 		type: 4,
			// 		mediaUrl: url,
			// 		title: "青企协",
			// 		summary: text,
			// 		imageUrl: img, //可不填
			// 		success: function(res) {
			// 			console.log("success:" + JSON.stringify(res));
			// 		},
			// 		fail: function(err) {
			// 			console.log("fail:" + JSON.stringify(err));
			// 		}
			// 	});
			// 	// #endif
			// 	// #ifdef MP-WEIXIN
			// 	// #endif
			// 	// #ifdef H5

			// 	// #endif

			// },
			/**
			 * @param {Object} e
			 * 视频错误
			 */
			videoErrorCallback: function(e) {
				console.log('视频错误信息:')
				console.log(e.target.errMsg)
			},
		},
		created() {
			this.getVideoList()
		},
		mounted() {

		}

	}
</script>

<style lang="scss">
	page {
		background-color: #f2f2f2;
	}

	cover-view,
	cover-image {
		display: inline-block;
	}

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
		z-index: 99;
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


	.all {
		padding: 0 30rpx;

		.videoBox {
			margin: 10rpx 0rpx;
			border: 1px solid #efefef;
			border-radius: 12rpx;
			overflow: hidden;
			box-shadow: 0px 0px 2px #efefef;
			position: relative;
			background: #fff;

			.videos {
				width: 100%;
				height: 380rpx;
				position: relative;

				.img {
					position: absolute;
					width: 100rpx;
					height: 100rpx;
					left: 39vw;
					top: 7vh;
				}
			}

			.contentText {
				background: #fff;
				padding: 20rpx 30rpx;
				font-size: 28rpx;
				font-weight: 600;
				color: #333333;
				word-wrap: break-word;
			}

			.controls {
				background: #fff;
				display: flex;
				padding: 8rpx 30rpx 20rpx 30rpx;
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
</style>
