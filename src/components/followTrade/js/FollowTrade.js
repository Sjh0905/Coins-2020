const root = {}
root.name = 'followTrade'
/*------------------------------ 组件 ------------------------------*/
root.components = {
  'Loading': resolve => require(['../../vue/Loading'], resolve),
  'PopupPrompt': resolve => require(['../../vue/PopupPrompt'], resolve),
  'PopupWindow': resolve => require(['../../vue/PopupWindow'], resolve),
}
/*------------------------------ data -------------------------------*/
root.data = function () {
  return {
    loading:true,
    listGod:[],
    godList:[],
    isFollow:false,

    // 弹框
    popType: 0,
    popText: '',
    popOpen: false,
    waitTime: 2000,

    popWindowOpenShiM: false, //弹窗开关
    popWindowTitle: '', //弹出提示标题
    popWindowPrompt: '',//弹出样式提示
    popWindowStyle: 0,//跳转 0表示实名认证，1表示手机或谷歌，2只有确定

    currentInterval:null,
    switchOrder: 'SPOT',

  }
}
/*------------------------------ 生命周期 -------------------------------*/
root.created = function () {

  this.GET_AUTH_STATE()

  this.getBigBrotherList()
  this.currentInterval1 && clearInterval(this.currentInterval1)
  this.currentInterval1 = setInterval(() => { this.getBigBrotherList() }, 4000)

  if(this.$route.query.isApp) {
    window.postMessage(JSON.stringify({
      method: 'setH5Back',
      parameters: {
        canGoH5Back:false
      }
    }))
  }
}

root.mounted = function () {
  // this.currentInterval1 && clearInterval(this.currentInterval1)
}
root.beforeDestroy = function () {
  this.currentInterval1 && clearInterval(this.currentInterval1)
}
/*------------------------------ 计算 -------------------------------*/
root.computed = {}
// root.computed.isFollow = function () {
//   this.godList.forEach(v=>{
//     if(this.listGod.indexOf(v) >= 0 ) {
//       console.info('v=======大神uid',v)
//       return true
//     }
//     return
//     if(this.listGod.indexOf(v) < 0 ) {
//       return false
//     }
//   })
// }

root.computed.isLogin = function () {
  return this.$store.state.isLogin;
}
//什么类型的跟单
root.computed.isSwitchOrder = function () {
  return this.switchOrder;
}

root.computed.userId = function () {
  return this.$store.state.authMessage.userId ? this.$store.state.authMessage.userId : 0
}

// 检验是否是APP
root.computed.isApp = function () {
  return this.$route.query.isApp ? true : false
}
// 检验是否是安卓
root.computed.isAndroid = function () {
  return this.$store.state.isAndroid
}

// 检验ios是否登录
root.computed.iosLogin = function () {
  return this.$route.query.iosLogin
}

// 获取屏幕宽度
root.computed.windowWidth = function () {
  return window.innerWidth
}

// 是否绑定手机
root.computed.bindMobile = function () {
  return this.$store.state.authState.sms
}
// 是否绑定谷歌验证码
root.computed.bindGA = function () {
  return this.$store.state.authState.ga
}
// 是否绑定邮箱
root.computed.bindEmail = function () {
  return this.$store.state.authState.email
}
// 是否实名认证
root.computed.bindIdentify = function () {
  return this.$store.state.authState.identity
}

/*------------------------------ 观察 -------------------------------*/
root.watch = {}
/*------------------------------ 方法 -------------------------------*/
root.methods = {}

// 认证状态
root.methods.GET_AUTH_STATE = function () {
  this.$http.send("GET_AUTH_STATE", {
    bind: this,
    callBack: this.RE_GET_AUTH_STATE,
    errorHandler: this.error_getCurrency
  })
}
root.methods.RE_GET_AUTH_STATE = function (res) {
  typeof res === 'string' && (res = JSON.parse(res));
  if (!res) return
  this.$store.commit('SET_AUTH_STATE', res.dataMap)
}

// 弹出绑定身份，跳转到实名认证界面
root.methods.goToBindIdentity = function () {
  this.popWindowOpenShiM = false
  this.$router.push({name: 'authenticate'})
}


// 弹框跳安全中心
root.methods.goToSecurityCenter = function () {
  this.popWindowOpenShiM = false
  this.$router.push({name: 'securityCenter'})
}
//切换跟单类型
root.methods.switchingOrders = function (orderType) {
  this.switchOrder = orderType
  this.$store.commit('IS_SWITCHORDER', orderType);
  // console.info('this.switchOrder=======',this.switchOrder,orderType)
  this.getBigBrotherList()
}

// 弹窗关闭
root.methods.popWindowCloseShiM = function () {
  this.popWindowOpenShiM = false
}

//跳转首页
root.methods.jumpToBack = function () {
  this.$router.push({'path':'/index/newH5homePage'})
}
//跳转个人镜像交易
root.methods.goTofollowTradeStrategy = function (switchOrder) {
  // // 如果没有实名认证不允许报名
  if (!this.bindIdentify) {
    this.popWindowTitle = this.$t('popWindowTitleWithdrawals')
    this.popWindowPrompt = this.$t('popWindowPromptWithdrawals')
    this.popWindowStyle = '0'
    this.popWindowOpenShiM = true
    return
  }

  // // PC如果没有绑定谷歌或手机，不允许报名(邮箱注册,手机注册无限制)
  if (!this.bindGA && !this.bindMobile) {
    this.popWindowTitle = this.$t('popWindowTitleWithdrawals')
    this.popWindowPrompt = this.$t('popWindowTitleBindGaWithdrawals')
    this.popWindowStyle = '1'
    this.popWindowOpenShiM = true
    return
  }
  // this.$router.push({'path':'/index/followTradeStrategy'})
  this.$router.push({name:'followTradeStrategy',query:{isSwitchOrder:this.switchOrder,}})

}
// 跳转我的镜像交易
root.methods.goToDocumentary = function (userId,fee,feeType) {

  // // 如果没有实名认证不允许报名
  if (!this.bindIdentify) {
    this.popWindowTitle = this.$t('popWindowTitleWithdrawals')
    this.popWindowPrompt = this.$t('popWindowPromptWithdrawals')
    this.popWindowStyle = '0'
    this.popWindowOpenShiM = true
    return
  }

  // // PC如果没有绑定谷歌或手机，不允许报名(邮箱注册,手机注册无限制)
  if (!this.bindGA && !this.bindMobile) {
    this.popWindowTitle = this.$t('popWindowTitleWithdrawals')
    this.popWindowPrompt = this.$t('popWindowTitleBindGaWithdrawals')
    this.popWindowStyle = '1'
    this.popWindowOpenShiM = true
    return
  }


  if(this.userId == userId){
    // 自己不能跟随自己哦
    this.openPop(this.$t('canNotFollowMyself'))
    return
  }
  // this.$router.push({name:'mobileDocumentary',params: {item:item}})
  this.$router.push({name:'documentaryGod',query:{userId:userId,feeType:feeType,fee:fee,days:this.days,isFollow:this.godList.indexOf(userId)}})
}
// // 去大神页面
// root.methods.goToDocumentaryGod = function () {
//   this.$router.push({name: 'mobileDocumentaryGod'})
// }
// 返回我的镜像交易，正在跟随
root.methods.goToMyFollowOrder = function (switchOrder) {
  // // 如果没有实名认证不允许报名
  if (!this.bindIdentify) {
    this.popWindowTitle = this.$t('popWindowTitleWithdrawals')
    this.popWindowPrompt = this.$t('popWindowPromptWithdrawals')
    this.popWindowStyle = '0'
    this.popWindowOpenShiM = true
    return
  }

  // // PC如果没有绑定谷歌或手机，不允许报名(邮箱注册,手机注册无限制)
  if (!this.bindGA && !this.bindMobile) {
    this.popWindowTitle = this.$t('popWindowTitleWithdrawals')
    this.popWindowPrompt = this.$t('popWindowTitleBindGaWithdrawals')
    this.popWindowStyle = '1'
    this.popWindowOpenShiM = true
    return
  }
  this.$router.push({name:'myFollowOrder',query:{isSwitchOrder:this.switchOrder}})
}


// 大佬列表
root.methods.getBigBrotherList = function () {
  // console.info('掉接口啦===',new Date().getTime())
  this.$http.send('BIG_BROTHER_LIST', {
    bind: this,
    params:{
      type: this.isSwitchOrder
    },
    callBack: this.re_getBigBrotherList,
    errorHandler:this.error_getBigBrotherList
  })
}
root.methods.re_getBigBrotherList = function (data) {
  typeof(data) == 'string' && (data = JSON.parse(data));
  if(!data && !data.dataMap)return
  this.loading = false
  this.listGod = data.dataMap.list || [] // 大神列表
  this.days = data.dataMap.days || '0'
  this.godList = data.dataMap.godList || []   // 已跟随大神列表
}
root.methods.error_getBigBrotherList = function (err) {
  console.log('err=====',err)
}

// 打开toast
root.methods.openPop = function (popText, popType, waitTime) {
  this.popText = popText
  this.popType = popType || 0
  this.popOpen = true
  this.waitTime = waitTime || 2000
}
// 关闭toast
root.methods.closePop = function () {
  this.popOpen = false;
}

// 保留小数点后8位
root.methods.toFixed = function (num, acc = 8) {
  return this.$globalFunc.accFixed(num, acc)
}
/*---------------------- 乘法运算 begin ---------------------*/
root.methods.accMul = function (num1, num2) {
  return this.$globalFunc.accMul(num1, num2)
}
/*---------------------- 乘法运算 end ---------------------*/
/*---------------------- 加法运算 begin ---------------------*/
root.methods.accAdd = function (num1, num2) {
  return this.$globalFunc.accAdd(num1, num2)
}
/*---------------------- 加法运算 end ---------------------*/

export default root
