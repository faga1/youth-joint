<template>
	<view>
		<view class="videoBox">
			<video id="videos" class="videos" :src="videoUrl" @error="videoErrorCallback" controls
				:show-center-play-btn="false" :poster="fengmian" @play="playVideo" show-fullscreen-btn>
				<cover-image class="img" v-if="playBtnShow" @click="playVideo"
					src="/pagesA/static/img/vipStyle/play.png"></cover-image>
			</video>
			<view>
				<view class="contentText">
					{{title}}
				</view>
				<view class="controls">
					<view class="date">{{createtime}}</view>
					<view class="controlsItem">
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
				videoUrl: "",
				fengmian: "",
				createtime: "",
				title: "",
				playBtnShow: true,
			};
		},
		onLoad(option) {
			console.log(option.createtime);
			this.videoUrl = option.videoUrl
			this.createtime = option.createtime
			this.title = option.title
			this.fengmian = option.fengmian
		},
		onShareAppMessage: function() {
			return {
				title: this.title,
				desc: this.createtime,
				path: "pagesA/pages/home/vipStyle/styleDetail?videoUrl=" + this.videoUrl + "&fengmian=" + this
					.fengmian + "&title=" + this.title +
					"&createtime=" + this.createtime
			}
		},
		methods: {
			/**
			 * @param {Object} e
			 * 播放
			 */
			playVideo() {
				this.playBtnShow = false
				uni.createVideoContext("videos", this).play()
			},
			/**
			 * @param {Object} e
			 * 视频错误
			 */
			videoErrorCallback: function(e) {
				console.log('视频错误信息:')
				console.log(e.target.errMsg)
			},
		}
	}
</script>

<style lang="scss">
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
			height: 85vh;
			position: relative;

			.img {
				position: absolute;
				width: 100rpx;
				height: 100rpx;
				left: 45vw;
				top: 45vh;
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
</style>
