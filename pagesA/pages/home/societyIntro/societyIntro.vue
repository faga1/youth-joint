<template>
	<view>
		<view class="topLine"></view>
		<u-tabs class="topBtn" :list="list" :is-scroll="false" :current="current" @change="change"></u-tabs>
		<u-parse 
			v-if="current===0" 
			class="innerh5" 
			:html="content" 
			:show-with-animation="true" 
			:lazy-load="true" 
			:selectable='true'
			:tag-style="{
						 h5:'line-height:50rpx!important',
						 span:'font-size:28rpx!important'
			           }"
			 >
		</u-parse>
		<view class="imgBoxs" v-if="current===1">
			<template v-for="item in jiebieLists">
				<u-cell-item class="listItem" :border-bottom="false" :title-style="titleStyle" :arrow="false"
					:title="item.jiebie" @click="toDetail(item.jiebieId,item.jiebie)">
				</u-cell-item>
				<u-divider :use-slot="false" half-width="45%" />
			</template>
		</view>
		<view class="imgBox" v-if="current===2">
			<u-image width="100%" :src="organUrl" mode="widthFix" @click="imgView(organUrl)"></u-image>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					name: '青联简介'
				}, {
					name: '界别分组'
				}, {
					name: '组织机构'
				}],
				current: 0,
				content: "",
				organUrl: "",
				jiebieLists: [],
				titleStyle: {
					'font-size': '26rpx',
					'flex-grow': '1',
					'overflow': 'hidden',
					'white-space': 'nowrap',
					'text-overflow': 'ellipsis',
				},
				
			}
		},
		methods: {
			/**
			 * @param {Object} index
			 * 切换
			 */
			change(index) {
				this.current = index;
				if (this.current === 0) {
					this.getSocietyIntro()
				} else if (this.current === 1) {
					this.getJiebieList()
				} else if (this.current === 2) {
					this.getSocietyOrgan()
				}
			},
			/**
			 * 获取协会简介
			 */
			getSocietyIntro() {
				let obj = {
					"xiehuiId": "1"
				}
				let that = this
				that.$u.api.getSocietyIntro(obj).then(res => {
					that.content = res.data.xiehuijianjie
					console.log(that.content)
				})
				
			},
			/**
			 * 获取界别列表
			 */
			getJiebieList() {
				let obj = {}
				let that = this
				that.$u.api.jiebieList(obj).then(res => {
					that.jiebieLists = res.list
				})
			},
			/**
			 * 获取协会阻止机构
			 */
			getSocietyOrgan() {
				let obj = {
					"xiehuiId": "1"
				}
				let that = this
				that.$u.api.getSocietyOrgan(obj).then(res => {
					that.organUrl = res.data.xiehuizuzhijigou
				})
			},
			/**
			 * @param {Object} imgUrl
			 * 图片预览
			 */
			imgView(imgUrl) {
				uni.previewImage({
					urls: [imgUrl],
					current: 0,
					indicator: "number"
				});
			},
			/**
			 * @param {Object} jiebieId
			 * @param {Object} jiebie
			 * 前往界别详情
			 */
			toDetail(jiebieId, jiebie) {
				uni.navigateTo({
					url: './jiebieInfo?jiebieId=' + jiebieId + "&jiebie=" + jiebie
				});
			},
		},
		created() {
			this.getSocietyIntro()
		}
	}
</script>

<style lang="scss">
	.topLine {
		width: 100%;
		height: 1px;
		position: fixed;
		// #ifdef APP-PLUS
		top: 0px;
		// #endif
		// #ifdef MP-WEIXIN
		top: 44px;
		// #endif
		// #ifdef H5
		top: 44px;
		// #endif
		background: #f7f7f7;
		// background: #ff0000;
		z-index: 999;
	}

	.topBtn {
		width: 100%;
		position: fixed;
		// #ifdef MP-WEIXIN
		top: 0px;
		// #endif
		// #ifdef H5
		top: 44px;
		// #endif
		// #ifdef APP-PLUS
		top: 0px;
		// #endif
		z-index: 999;
	}

	.innerh5 {
		padding: 30rpx;
		background: #fff;
		margin-top: 80rpx;
		.interlayer{
			font-size:14rpx !important;
		}
	}
	
	.imgBox {
		padding: 30rpx;
		background: #fff;
		margin-top: 80rpx;
	}

	.imgBoxs {
		padding: 30rpx 0px;
		background: #fff;
		margin-top: 80rpx;
	}
</style>
