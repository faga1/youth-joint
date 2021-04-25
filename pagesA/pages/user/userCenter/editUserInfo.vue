<template>
	<view class="all">
		<u-form :model="form" ref="uForm" label-width="140" label-position="left">
			<u-form-item required label="姓名" prop="name">
				<u-input v-model="form.name" />
			</u-form-item>
			<u-form-item required label="性别" prop="sex">
				<u-radio-group v-model="form.sex">
					<u-radio name="男">男</u-radio>
					<u-radio name="女">女</u-radio>
				</u-radio-group>
			</u-form-item>
			<u-form-item required label="相片" prop="touxiang">
				<u-upload :action="action" :file-list="fileList" max-count="1" @on-change="chooseImg"
					@on-remove="removeImg"></u-upload>
			</u-form-item>
			<u-form-item required label="身份证号" prop="idcard">
				<u-input v-model="form.idcard" />
			</u-form-item>
			<u-form-item required label="联系电话(手机)" prop="shouji">
				<u-input v-model="form.shouji" />
			</u-form-item>
			<u-form-item label="民族" prop="minzu">
				<u-input v-model="form.minzu" />
			</u-form-item>
			<u-form-item label="出生年月" prop="birthday">
				<u-input v-model="form.birthday" type="select" @click="calendarShow=true" />
				<u-calendar v-model="calendarShow" mode="date" @change="change"></u-calendar>
			</u-form-item>
			<u-form-item label="学历" prop="xueli">
				<u-input v-model="form.xueli" type="select" placeholder="请选择学历" @click="show = true" />
				<u-action-sheet :list="xueliList" v-model="show" @click="chooseXueli"></u-action-sheet>
			</u-form-item>
			<u-form-item label="籍贯" prop="jiguan">
				<u-input v-model="form.jiguan" type="select" placeholder="请选择" @click="jiguanShow = true" />
				<u-picker v-model="jiguanShow" mode="region" :params="params" @confirm="chooseJiGuan"></u-picker>
			</u-form-item>
			<u-form-item label="政治面貌" prop="zzmm">
				<u-input v-model="form.zzmm" type="select" placeholder="请选择" @click="zzmmShow = true" />
				<u-action-sheet :list="zzmmList" v-model="zzmmShow" @click="chooseZzmm"></u-action-sheet>
			</u-form-item>
			<u-form-item label="联系电话(固话)" prop="guhua">
				<u-input v-model="form.guhua" />
			</u-form-item>
			<u-form-item label="个人电子邮箱地址" prop="youxiang">
				<u-input v-model="form.youxiang" />
			</u-form-item>
			<u-form-item label="微信" prop="weixin">
				<u-input v-model="form.weixin" />
			</u-form-item>
			<u-form-item label="QQ" prop="qq">
				<u-input v-model="form.qq" />
			</u-form-item>
			<u-form-item label="通讯地址" prop="tongxindizhi">
				<u-input v-model="form.tongxindizhi" />
			</u-form-item>
			<u-form-item label="邮编" prop="youbian">
				<u-input v-model="form.youbian" />
			</u-form-item>
			<u-form-item label="传真" prop="chuanzhen">
				<u-input v-model="form.chuanzhen" />
			</u-form-item>
			<u-form-item label="社会职务" prop="shehuizhiwulist">
				<view style="width:100%;display: flex;flex-direction: column;">
					<view style="display: flex;" v-for="(item,index) in form.shehuizhiwulist">
						<u-input v-model="item.shehuizhiwu" />
						<u-button type="error" :plain="true" size="mini" @click="delSHZW(index)">删除</u-button>
					</view>
					<u-button style="width: 100%;" type="primary" size="mini" @click="addSHZW">添加</u-button>
				</view>
			</u-form-item>
			<u-form-item label="个人荣誉" prop="gerenrongyulist">
				<view style="width:100%;display: flex;flex-direction: column;">
					<view style="display: flex;" v-for="(item,index) in form.gerenrongyulist">
						<u-input v-model="item.gerenrongyu" />
						<u-button type="error" :plain="true" size="mini" @click="delGRRY(index)">删除</u-button>
					</view>
					<u-button style="width: 100%;" type="primary" size="mini" @click="addGRRY">添加</u-button>
				</view>
			</u-form-item>
		</u-form>

		<view class="subBtn">
			<u-button @click="submit" type="primary" shape="square" size="medium" :ripple="true">完成
			</u-button>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				fileList: [],
				params: {
					province: true,
					city: true,
					area: false,
				},
				zzmmShow: false,
				jiguanShow: false,
				calendarShow: false,
				show: false,
				zzmmList: [],
				xueliList: [],
				form: {
					name: "",
					sex: "男",
					birthday: "",
					zzmm: "",
					shouji: "",
					guhua: "",
					minzu: "",
					xueli: "",
					jiguan: "",
					idcard: "",
					youxiang: "",
					weixin: "",
					qq: "",
					tongxindizhi: "",
					youbian: "",
					chuanzhen: "",
					touxiang: "",
					shehuizhiwulist: [{
						shehuizhiwu: "",
						zhiwuId: "",
					}],
					gerenrongyulist: [{
						gerenrongyu: "",
						rongyuId: "",
					}],
				},
				action: 'https://qqx.xaruibo.com/qinglian/app/uploadFile.htm',
				rules: {
					name: [{
						required: true,
						message: '请输入姓名',
						trigger: 'blur',
					}],
					touxiang: [{
						required: true,
						message: '请上传头像',
						trigger: 'blur,change'
					}],
					idcard: [{
							required: true,
							message: '请输入身份证号',
							trigger: 'blur',
						},
						{
							pattern: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/g,
							// 正则检验前先将值转为字符串
							transform(value) {
								return String(value);
							},
							message: '身份证号格式不正确'
						},
					],
					shouji: [{
							required: true,
							message: '请输入手机号',
							trigger: 'blur',
						},
						{
							validator: (rule, value, callback) => {
								return this.$u.test.mobile(value);
							},
							message: '手机号码不正确',
							trigger: 'blur',
						}
					],
				},
			};
		},
		onLoad() {
			this.getDictionaryByKey1()
			this.getDictionaryByKey2()
			this.getUserDetail()
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		methods: {
			/**
			 * 获取个人信息
			 */
			getUserDetail() {
				let that = this
				let obj = {
					memberId: uni.getStorageSync('memberId'),
				}
				that.$u.api.getLeaderDetail(obj).then(res => {
					if (res.error_code === 0) {
						that.fileList = [{
							url: res.data.touxiang
						}]
						that.form = res.data
						delete that.form.unionId
						delete that.form.openId
						delete that.form.companylist
						delete that.form.password
					} else {}
				})
			},
			/**
			 * 获取政治面貌
			 */
			getDictionaryByKey1() {
				let that = this
				that.$u.api.getDictionaryByKey({
					key: "political"
				}).then(res => {
					if (res.error_code === 0) {
						let arr = []
						res.list.forEach((item, index) => {
							arr.push({
								// id: item.parentId,
								text: item.datavalue
							})
						})
						that.zzmmList = arr
					} else {}
				})
			},
			/**
			 * 获取学历列表
			 */
			getDictionaryByKey2() {
				let that = this
				that.$u.api.getDictionaryByKey({
					key: "education"
				}).then(res => {
					if (res.error_code === 0) {
						let arr = []
						res.list.forEach((item, index) => {
							arr.push({
								// id: item.parentId,
								text: item.datavalue
							})
						})
						that.xueliList = arr
					} else {}
				})
			},


			/**
			 * 选择图片
			 */
			chooseImg(e) {
				console.log(e);
				if (e.statusCode == 200) {
					this.form.touxiang = JSON.parse(e.data).data.businessId
				}
			},
			/**
			 * 删除图片
			 */
			removeImg(e) {
				this.form.touxiang = ""
			},
			/**
			 * @param {Object} e
			 * 选择日期
			 */
			change(e) {
				console.log(e.result);
				this.form.birthday = e.result
			},
			/**
			 * @param {Object} e
			 * 选择籍贯
			 */
			chooseJiGuan(e) {
				console.log(e);
				this.form.jiguan = e.province.label + '-' + e.city.label
			},
			/**
			 * 选择学历
			 */
			chooseXueli(index) {
				this.form.xueli = this.xueliList[index].text;
			},
			/**
			 * @param {Object} index
			 * 选择政治面貌
			 */
			chooseZzmm(index) {
				this.form.zzmm = this.zzmmList[index].text;
			},
			/**
			 * 添加职务列表
			 */
			addSHZW() {
				this.form.shehuizhiwulist.push({
					shehuizhiwu: "",
					zhiwuId: "",
				})
			},
			/**
			 * 删除职务列表
			 */
			delSHZW(e) {
				let delId = this.form.shehuizhiwulist[e].zhiwuId
				if (delId) {
					let that = this
					that.$u.api.deleteMember({
						id: delId,
						type: "zhiwu",
					}).then(res => {
						if (res.error_code === 0) {
							that.form.shehuizhiwulist.splice(e, 1)
						} else {}
					})
				} else {
					this.form.shehuizhiwulist.splice(e, 1)
				}
			},
			/**
			 * 添加个人荣誉
			 */
			addGRRY() {
				this.form.gerenrongyulist.push({
					gerenrongyu: "",
					rongyuId: "",
				})
			},
			/**
			 * 删除职务列表
			 */
			delGRRY(e) {
				let delId = this.form.gerenrongyulist[e].rongyuId
				if (delId) {
					let that = this
					that.$u.api.deleteMember({
						id: delId,
						type: "rongyu",
					}).then(res => {
						if (res.error_code === 0) {
							that.form.gerenrongyulist.splice(e, 1)
						} else {}
					})
				} else {
					this.form.gerenrongyulist.splice(e, 1)
				}
			},
			submit() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						console.log(this.form);
						if (this.form.shehuizhiwulist.length == 0) {
							this.$refs.uToast.show({
								title: '至少填写一个社会职务',
								type: 'error',
							})
							return
						} else {
							this.form.shehuizhiwulist.forEach((item, index) => {
								if (item.shehuizhiwu == "") {
									this.form.shehuizhiwulist.splice(index, 1)
								}
							})
						}

						if (this.form.gerenrongyulist.length == 0) {
							this.$refs.uToast.show({
								title: '至少填写一个个人荣誉',
								type: 'error',
							})
							return
						} else {
							this.form.gerenrongyulist.forEach((item, index) => {
								if (item.gerenrongyu == "") {
									this.form.gerenrongyulist.splice(index, 1)
								}
							})
						}
						this.memberEdit()
					} else {
						console.log('验证失败');
					}
				});
			},


			/**
			 * 提交编辑
			 */
			memberEdit() {
				let that = this
				let obj = {}
				obj = that.form
				delete obj.lingdaoId
				delete obj.lishizhiwulist
				delete obj.tuijianren
				delete obj.xhzw
				delete obj.zhiwu
				that.$u.api.memberEdit(obj).then(res => {
					if (res.error_code === 0) {
						uni.navigateBack(1);
					} else {}
				})
			},
		},
	}
</script>

<style lang="scss">
	.all {
		background-color: #fff;
		padding: 30rpx;
	}

	.subBtn {
		margin-top: 20rpx;
		width: 100%;
		display: flex;
		justify-content: space-around;
	}
</style>
