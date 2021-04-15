const install = (Vue, vm) => {
	// 数据字典
	let getDictionaryByKey = (params = {}) => vm.$u.post('app/getDictionaryByKey.htm', params);
	
	//密码登录
	let login = (params = {}) => vm.$u.post('app/member/login.htm', params);
	//重置密码
	let resetPassword = (params = {}) => vm.$u.post('app/member/forgetpassword.htm', params);
	//获取验证码
	let getCode = (params = {}) => vm.$u.post('app/getCode.htm', params);
	
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
	//我签到的协会活动
	let getMySignedActiveXH = (params = {}) => vm.$u.post('app/activity/myxiehuilist.htm', params);
	//我签到的公益活动
	let getMySignedActiveGY = (params = {}) => vm.$u.post('app/activity/mygongyilist.htm', params);

	//通讯录
	let tongxunlu = (params = {}) => vm.$u.post('app/member/tongxunlu.htm', params);


	//获取协会简介
	let getSocietyIntro = (params = {}) => vm.$u.post('app/xiehui/xiehuijianjie.htm', params);
	//获取协会章程
	let getSocietyCharter = (params = {}) => vm.$u.post('app/xiehui/xiehuizhangcheng.htm', params);
	//获取协会组织机构
	let getSocietyOrgan = (params = {}) => vm.$u.post('app/xiehui/xiehuizuzhijigou.htm', params);
	
	
	//委员团体
	let getSocieties = (params = {}) => vm.$u.post('app/shetuan/list.htm', params);
	//委员团体社团详情
	let getSocietiesInfo = (params = {}) => vm.$u.post('app/shetuan/info.htm', params);
	//社团活动列表
	let getSocietAtc = (params = {}) => vm.$u.post('app/shetuanhuodong/list.htm', params);
	//社团活动详情
	let getSocietAtcInfo = (params = {}) => vm.$u.post('app/shetuanhuodong/info.htm', params);
	
	//界别列表
	let jiebieList = (params = {}) => vm.$u.post('app/jiebie/list.htm', params);
	//界别详情
	let jiebieInfo = (params = {}) => vm.$u.post('app/jiebie/info.htm', params);
	
	vm.$u.api = {
		getCode,
		resetPassword,
		jiebieInfo,
		jiebieList,
		getSocietAtcInfo,
		getSocietAtc,
		getSocietiesInfo,
		getSocieties,
		getSocietyOrgan,
		getSocietyCharter,
		getSocietyIntro,
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
		getMySignedActiveXH,
		getMySignedActiveGY,
	};
}

export default {
	install
}
