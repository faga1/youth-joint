const install = (Vue, vm) => {
	// 数据字典
	let getDictionaryByKey = (params = {}) => vm.$u.post('app/getDictionaryByKey.htm', params);
	
	//密码登录
	let login = (params = {}) => vm.$u.post('app/member/login.htm', params);
	//获取用户信息
	let getLeaderDetail = (params = {}) => vm.$u.post('app/member/info.htm', params);
	//编辑用户信息
	let memberEdit = (params = {}) => vm.$u.post('app/member/edit.htm', params);
	
	//获取轮播图
	let getBanner = (params = {}) => vm.$u.post('app/banner/list.htm', params);
	
	
	//获取通知公告
	let getNotice = (params = {}) => vm.$u.post('app/article/tongzhigonggaolist.htm', params);
	//获取通知公告详情
	let getNoticeDetail = (params = {}) => vm.$u.post('app/article/info.htm', params);
	
	
	//获取会员风采
	let getVipStyle = (params = {}) => vm.$u.post('app/huiyuanfengcai/list.htm', params);
	
	
	//获取活动
	let getActive = (params = {}) => vm.$u.post('app/activity/list.htm', params);
	//活动详情
	let getActiveDetail = (params = {}) => vm.$u.post('app/activity/info.htm', params);
	//活动报名
	let joinInActive = (params = {}) => vm.$u.post('app/activity/baoming.htm', params);
	//活动签到
	let signedActive = (params = {}) => vm.$u.post('app/activity/qiandao.htm', params);
	//图集列表
	let getImgList = (params = {}) => vm.$u.post('app/activityTuji/list.htm', params);
	//图集详情
	let getImgDetail = (params = {}) => vm.$u.post('app/activityPic/detail.htm', params);
	
	

	//通讯录
	let tongxunlu = (params = {}) => vm.$u.post('app/member/tongxunlu.htm', params);


	// 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
	vm.$u.api = {
		getDictionaryByKey,
		login,
		getLeaderDetail,
		memberEdit,
		getBanner,
		getNotice,
		getNoticeDetail,
		getVipStyle,
		getActive,
		getActiveDetail,
		joinInActive,
		signedActive,
		getImgList,
		getImgDetail,
		tongxunlu,
	};
}

export default {
	install
}
