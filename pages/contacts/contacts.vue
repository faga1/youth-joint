<template>
	<u-index-list :scrollTop="scrollTop" :index-list="indexList">
		<view v-for="(item, index) in list" :key="index">
			<u-index-anchor class="index-anchor" :index="item.letter" v-show="item.data.length>0" />
			<view class="list-cell u-border-bottom" v-for="(item1, index) in item.data" :key="index">
				<view style="width: 100%;" :id="item1.memberId" @click="toUserDetail">
					{{item1.name}}
				</view>
			</view>
		</view>
	</u-index-list>
</template>

<script>
	import indexList from "@/common/index.list.js";
	const letterArr = indexList.list.map(val => {
		return val.letter;
	})
	export default {
		data() {
			return {
				scrollTop: 0,
				indexList: [],
				list: [],
			}
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		onLoad() {
			this.getContacts()
		},
		methods: {
			/**
			 * 获取通讯信息
			 */
			getContacts() {
				let obj = {}
				let that = this
				that.$u.api.tongxunlu(obj).then(res => {
					let contactsList = JSON.parse(res.data)
					this.indexList = contactsList.map(val => {
						return val.letter;
					})
					this.list = contactsList
					let arr = []
					let arrs = []
					contactsList.forEach(item => {
						if (item.data.length > 0) {
							arr.push(item.letter)
							arrs.push(item)
						}
					})
					// this.indexList = arr
					// this.list = arrs
				})
			},

			/**
			 * 前往用户详情
			 */
			toUserDetail(e) {
				let mid = e.target.id
				uni.navigateTo({
					url: "../../pagesA/pages/user/userCenter/userCenter?uid=" + mid + "&noEdit=1"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.list-cell {
		display: flex;
		box-sizing: border-box;
		width: 100%;
		padding: 10px 24rpx;
		overflow: hidden;
		color: $u-content-color;
		font-size: 14px;
		line-height: 24px;
		background-color: #fff;
	}

	.index-anchor {
		background: red;
	}
</style>
