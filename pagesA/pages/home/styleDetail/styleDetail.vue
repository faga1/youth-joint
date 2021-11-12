<template>
	<view>
		<view class="videoBox">
			<view class="video_info">
				<!-- 视频 -->
				<view class="video_video">
					<video id='myVideos' show-fullscreen-btn data-id="myVideos" :src="videoUrl"
						controls></video>
				</view>
				<view class="allText">
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
		methods: {}
	}
</script>

<style lang="scss">
	.videoBox {
		width: 100%;

		.video_info {
			width: 100%;
			height: 100vh;
			// margin: 10rpx 0rpx;
			border: 1px solid #efefef;
			border-radius: 12rpx;
			overflow: hidden;
			box-shadow: 0px 0px 2px #efefef;
			position: relative;
			background: #fff;
			display: flex;
			flex-direction: column;
			/* 视频 */
			.video_video {
				width: 100%;
				flex-grow: 1;
				border-radius: 15upx;
				
				video {
					width: 100%;
					height: 100%;
					border-radius: 15upx;
				}
			}
			.allText{
				height: 73px;
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
	}
</style>
