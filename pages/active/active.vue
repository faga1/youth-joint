<template>
	<view style="min-height: 300px;">
		<view class="searchBox">
			<view class="sxBox">
				<u-dropdown :close-on-click-mask="false" border-radius="8">
					<u-dropdown-item v-model="searchPre.leibie" :title="options[tabIndex].label" :options="options"
						@change="chooseType"></u-dropdown-item>
				</u-dropdown>
			</view>
			<view class="inputBox">
				<u-search class="search" v-model="searchPre.title" placeholder="请输入关键字" bg-color="#fff" clearabled
					:show-action="true" action-text="搜索" :animation="false" @search="search" @custom="search"
					@clear="search"></u-search>
			</view>
		</view>
		<!-- <u-divider :use-slot="false" half-width="45%" /> -->
		<view class="activeBox" v-if="searchPre.leibie!==3">
			<template v-for="(item,index) in activeList">
				<view class="activeItem" @click.stop="toDetail(item.activityId)">
					<view class="watchNum">
						<u-image width="34rpx" height="34rpx" src="/static/img/active/see.png"></u-image>
						<span style="margin-left:10rpx;">{{item.chakannum}}</span>
					</view>
					<view class="activeImg">
						<u-image width="230rpx" height="168rpx" border-radius="20" :src="item.fengmian"></u-image>
					</view>
					<view class="activeCont">
						<view class="actText">{{item.name}}</view>
						<view class="actType">{{item.leibie==="1"?"青联活动":"界别活动"}}</view>
						<view class="actTime">{{item.createtime}}</view>
					</view>
					<u-button v-if="item.baomingstate==='2'" class="btn" type="primary" size="mini"
						@click="joinIn(item.activityId)">
						立即报名</u-button>
					<u-button v-if="item.baomingstate==='1'" class="btn" type="primary" size="mini">已报名</u-button>
				</view>
				<u-divider :use-slot="false" half-width="45%" />
			</template>
		</view>
		<view class="activeBoxS" v-if="searchPre.leibie==3">
			<u-row gutter="16">
				<u-col span="6" v-for="item in imgList">
					<view class="imgBox" @click="imgView(item.tujiId)">
						<u-image height="132px" :src="item.fengmian"></u-image>
						<view class="title">
							{{item.name}}
						</view>
					</view>
				</u-col>
			</u-row>
		</view>
		<u-toast ref="uToast" />
		<u-empty style="height: 180px;" v-if="emptyShow" text="暂无数据" mode="list"></u-empty>
		<u-loadmore v-if="loadShow" :status="status" :load-text="loadText" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabIndex: 0,
				searchPre: {
					leibie: 0,
					title: "",
				},
				options: [{
						label: '全部',
						value: 0,
					},
					{
						label: '青联',
						value: 1,
					},
					{
						label: '界别',
						value: 2,
					},
					{
						label: '图集',
						value: 3,
					}
				],
				activeList: [],
				imgList: [],
				pageNo: 1,
				pageSize: 10,
				total: 0,
				emptyShow: false,
				loadShow: false,
				status: 'loadmore',
				loadText: {
					loadmore: '上拉加载更多',
					loading: '努力加载中',
					nomore: '实在没有了'
				}
			}
		},
		onShow() {
			if (this.searchPre.leibie !== 3) {
				this.chooseType(this.searchPre.leibie)
			}
		},
		//上拉触底事件
		onReachBottom() {
			this.loadShow = true
			const len = this.searchPre.leibie !== 3 ? this.activeList.length : this.imgList.length;
			if (len < this.total) {
				this.status = 'loading'
					++this.pageNo
				this.searchPre.leibie !== 3 ? this.getActive() : this.getImgList()
			} else {
				this.status = 'nomore'
				let that = this
				setTimeout(function() {
					that.loadShow = false
				}, 1000)
			}
		},
		methods: {
			init() {
				this.searchPre = {
					leibie: 0,
					title: "",
				}
				this.pageNo = 1
				this.pageSize = 10
				this.total = 0
			},
			/**
			 * @param {Object} e
			 * 前往详情
			 */
			toDetail(e) {
				console.log(e);
				uni.navigateTo({
					url: './activeDetail?aid=' + e
				});
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
						that.search()
					} else {
						that.$refs.uToast.show({
							title: res.msg,
							type: 'warning ',
						})
					}
				})
			},
			/**
			 * @param {Object} e
			 * 切换
			 */
			chooseType(e) {
				if (e === 3) {
					this.tabIndex = 2
				} else {
					this.tabIndex = e
				}
				this.pageNo = 1
				this.searchPre.title = ""
				this.activeList = []
				this.imgList = []
				if (e !== 3) {
					this.getActive()
				} else {
					this.getImgList()
				}
			},
			/**
			 * 搜索
			 */
			search() {
				this.pageNo = 1
				this.activeList = []
				this.imgList = []
				this.searchPre.leibie !== 3 ? this.getActive() : this.getImgList()
			},
			/**
			 * 获取活动列表
			 */
			getActive() {
				let obj = {
					"xiehuiId": "1",
					"memberId": uni.getStorageSync('memberId'),
					"state": "1",
					"name": this.searchPre.title,
					"leibie": '' + this.searchPre.leibie,
					"pageNo": this.pageNo,
					"pageSize": this.pageSize,
				}
				let that = this
				that.$u.api.getActive(obj).then(res => {
					let list = res.list
					that.total = res.total
					that.activeList = that.activeList.concat(list);
					res.total === 0 ? this.emptyShow = true : this.emptyShow = false,
						this.loadShow = false

				})
			},

			/**
			 * 获取图集列表
			 */
			getImgList() {
				let obj = {
					"xiehuiId": "1",
					"memberId": uni.getStorageSync('memberId'),
					"name": this.searchPre.title,
					"pageNo": this.pageNo,
					"pageSize": this.pageSize,
				}
				let that = this
				that.$u.api.getImgList(obj).then(res => {
					let list = res.list
					that.total = res.total
					that.imgList = that.imgList.concat(list);
					console.log(res.total);
					res.total === 0 ? this.emptyShow = true : this.emptyShow = false
					this.loadShow = false

				})
			},


			imgView(tjid) {
				let that = this
				let obj = {
					xiehuiId: "1",
					memberId: uni.getStorageSync('memberId'),
					tujiId: tjid
				}
				that.$u.api.getImgDetail(obj).then(res => {
					let imgArr = []
					res.list.forEach(item => {
						imgArr.push(item.picurl)
					})
					if (imgArr.length > 0) {
						uni.previewImage({
							urls: imgArr,
							current: 0,
							indicator: "number"
						});
					} else {
						this.$refs.uToast.show({
							title: '暂无图片可供浏览',
							type: 'warning ',
						})
					}
				})
			},
		},
		created() {}
	}
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
		z-index: 99;
		background-color: #f2f2f2;
		display: flex;
		// padding: 6rpx 0;

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

	.search {}

	.activeBox {
		margin-top: 88rpx;
		background: #fff;

		.activeItem {
			display: flex;
			padding: 20rpx 30rpx;
			position: relative;

			.watchNum {
				display: flex;
				position: absolute;
				bottom: 10rpx;
				right: 34rpx;
				font-size: 24rpx;
			}

			.btn {
				position: absolute;
				right: 30rpx;
				bottom: 48rpx;
				font-size: 22rpx;
				height: 68rpx;
				line-height: 68rpx;
			}

			.activeImg {
				width: 230rpx;
			}

			.activeCont {
				flex-grow: 1;
				display: flex;
				flex-direction: column;
				padding: 15rpx;

				.actText {
					flex-grow: 1;
					word-wrap: break-word;
					word-break: normal;
					font-size: 30rpx;
					font-weight: 600;
				}

				.actType {
					height: 44rpx;
					font-size: 24rpx;
					color: #ffaa00;
				}

				.actTime {
					height: 44rpx;
					font-size: 22rpx;
					color: #999;
				}
			}
		}
	}

	.activeBoxS {
		margin-top: 90rpx;
		// background: #fff;
		padding: 10rpx 20rpx;

		.imgBox {
			border-radius: 6px;
			overflow: hidden;
			margin-bottom: 10rpx;
			position: relative;
			box-shadow: 0px 0px 3px #b0b0b0;

			.title {
				position: absolute;
				bottom: 0px;
				width: 100%;
				background: rgba(0, 0, 0, 0.6);
				padding: 10rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				color: #fff;
				font-size: 24rpx;
			}
		}
	}
</style>
