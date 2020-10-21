const root = {}
root.name = 'FollowTradeStrategy'
/*------------------------------ 组件 ------------------------------*/
root.components = {
 // 'Loading': resolve => require(['../Loading/Loading.vue'], resolve),
  'PopupPrompt': resolve => require(['../../vue/PopupPrompt'], resolve),
  'PopupWindow': resolve => require(['../../vue/PopupWindow'], resolve),
}
/*------------------------------ data -------------------------------*/
root.data = function () {
  return {
    followType: 1,
    godInfo:{},
    godHistorList:[],
    followUserList:[],
    isTapeList:false,
    currencyPair:'',
    // 弹框
    popType: 0,
    popText: '',
    popOpen: false,
    waitTime: 2000,

    godInfoList:{},
    countFollower:'',
    sumFee :'',
    todayFee:'',
    userFollowFees:[],

    followDay :'',
    godFee: '', //跟单保证金

    // 信息弹框
    popWindowOpen:false,
    fixedAmPr:1,  //默认固定金额
  }
}
/*------------------------------ 生命周期 -------------------------------*/
root.created = function () {
  if(this.$route.query.isApp) {
    /*window.postMessage(JSON.stringify({
        method: 'setTitle',
        parameters: this.userId
      })
    );*/
    window.postMessage(JSON.stringify({
      method: 'setH5Back',
      parameters: {
        canGoH5Back:true
      }
    }))
  }
  this.postManage()
  this.isOpenFollow()
  this.postPersonalFollowUser()
  this.postPersonalrHistory()
  this.postGodFee()
  // console.info('==============',this.$store.state.isSwitchOrder)
}
root.mounted = function () {}
root.beforeDestroy = function () {}
/*------------------------------ 计算 -------------------------------*/
root.computed = {}

root.computed.isHasItem = function () {
  if(JSON.stringify(this.godInfoList) == '{}') {
    return false
  }
  return true
}
// 获取本人的userId
root.computed.userId = function () {
  return this.$store.state.authMessage.userId
}
// 检验是否是APP
root.computed.isApp = function () {
  return this.$route.query.isApp ? true : false
}
// 检验是否是安卓
root.computed.isAndroid = function () {
  return this.$store.state.isAndroid
}
//
root.computed.fixedAmountPr1 = function () {
  return this.currencyPair || 0
}
root.computed.fixedAmountPr2 = function () {
  return this.toFixed(this.accMul(Number(this.currencyPair), 0.8),2)
}
root.computed.fixedAmountPr3 = function () {
  return this.accMinus(80,Number(this.currencyPair))
}
//什么类型的跟单
root.computed.isSwitchOrder = function () {
  return this.$store.state.isSwitchOrder;
}
/*------------------------------ 观察 -------------------------------*/
root.watch = {}
/*------------------------------ 方法 -------------------------------*/
root.methods = {}

//固定比例-金额选择
root.methods.fixedAmountPr = function (type) {
  this.currencyPair = ''
  this.fixedAmPr = type
}


// 跟单保证金
root.methods.postGodFee = function () {
  this.$http.send('POST_GOD_FEE', {
    bind: this,
    params: {
      type: this.isSwitchOrder
    },
    callBack: this.re_postGodFee,
    errorHandler: this.error_postGodFee
  })
}
root.methods.re_postGodFee = function (data) {
  typeof data === 'string' && (data = JSON.parse(data))
  if(!data && !data.dataMap) return
  this.godFee = data.dataMap.godFee || 0
}
root.methods.error_postGodFee = function (err) {
  console.log('err===',err)
}

//个人带单管理
root.methods.postManage = function () {
  this.$http.send('POST_MANAGE', {
    bind: this,
    params: {
      type: this.isSwitchOrder
    },
    callBack: this.re_postManage,
    errorHandler: this.error_postManage
  })
}
root.methods.re_postManage = function (data) {
  typeof data === 'string' && (data = JSON.parse(data))
  this.countFollower = data.dataMap.countFollower || '0'
  this.sumFee = data.dataMap.sumFee || '0'
  this.todayFee = data.dataMap.todayFee || '0'
  this.userFollowFees = data.dataMap.userFollowFees || []
  this.godInfoList = data.dataMap.godInfo || {}
  this.followDay = data.dataMap.days || '0'
}
root.methods.error_postManage = function (err) {
  console.log("this.err=====",err)
}
// 成为大神弹框
root.methods.openTapeList = function () {
  this.popWindowOpen =true
}

// 关闭修改策略弹框
root.methods.popWindowClose= function () {
  this.popWindowOpen = false
}

//成为大神
root.methods.postCommitFee = function () {
  if(this.currencyPair == ''){
    this.openPop (this.$t('cannotBeBlank'))
    return
  }
  // if(this.currencyPair == 0){
  //   this.openPop ('跟单费用不能为0')
  //   return
  // }
  let params = {
    feeType: this.fixedAmPr == 1 ? 'LOT' : 'RATE',
    fee: this.currencyPair,
    type: this.isSwitchOrder
  }
  this.$http.send('POST_GOD', {
    bind: this,
    params: params,
    callBack: this.re_postCommitFee,
    errorHandler: this.error_postCommitFee
  })
}
root.methods.re_postCommitFee = function (data) {
  typeof data === 'string' && (data = JSON.parse(data))
  if(data.errorCode == 0) {
    this.openMaskWindow = false
    this.isTapeList = true
    this.openPop(this.$t('subscriptionSuccessful'),1)
    this.popWindowClose()
    this.postManage()
  }
  if(data.errorCode == 1) {
    this.openPop(this.$t('systemError'))
    return;
  }
  if(data.errorCode == 2) {
    this.openPop(this.$t('insufficient'))
    return;
  }
  if(data.errorCode == 3) {
    this.openPop(this.$t('securityDeposit'))
    return;
  }
  if(data.errorCode == 4) {
    this.openPop(this.$t('分成比例超过了最大比例'))
    return;
  }

  if(data.errorCode == 5) {
    this.openPop('已经有仓位了，不能成为大神')
    return;
  }
  if(data.errorCode != 0) {
    this.openPop(this.$t('systemError'))
  }
}
root.methods.error_postCommitFee = function (err) {
  console.log("this.err=====",err)
}

// 跳转到带单管理
root.methods.goToTapeListManage = function () {
  this.$router.push({name:'tapeListManage'})
}

// 切换历史跟单和跟随者
root.methods.toggleType = function (type) {
  this.followType = type
}

// 是否开启带单
root.methods.isOpenFollow = function () {
  this.$http.send('POST_GOD_BY_USERID', {
    bind: this,
    params: {
      type: this.isSwitchOrder
    },
    callBack: this.re_isOpenFollow,
    errorHandler: this.error_isOpenFollow
  })
}
root.methods.re_isOpenFollow = function (data) {
  typeof data === 'string' && (data = JSON.parse(data))
  if(!data) return
  if(JSON.stringify(data.dataMap) != '{}' && JSON.stringify(data.dataMap.godInfo) != '{}') {
    this.isTapeList = true
    return
  }
  this.isTapeList = false
}
root.methods.error_isOpenFollow = function (err) {
  console.log("this.err=====",err)
}
//个人操作记录
root.methods.postPersonalrHistory = function () {
  let params = {
    followId: this.userId,
    type: this.isSwitchOrder,
  }
  this.$http.send('POST_BROTHER_ORDER_SELF', {
    bind: this,
    params: params,
    callBack: this.re_postPersonalrHistory,
    errorHandler: this.error_postPersonalrHistory
  })
}
root.methods.re_postPersonalrHistory = function (data) {
  typeof data === 'string' && (data = JSON.parse(data))
  this.loading = false
  this.godInfo = data.dataMap.godInfo || {}
  this.godHistorList = data.dataMap.list || []
}
root.methods.error_postPersonalrHistory = function (err) {
  console.log("this.err=====",err)
}


//个人跟随者
root.methods.postPersonalFollowUser = function () {
  // let params = {
  //   followId: this.userId ,
  // }
  this.$http.send('POST_FOLLOWUSER_LIST', {
    bind: this,
    // params: params,
    params:{
      type: this.isSwitchOrder
    },
    callBack: this.re_postPersonalFollowUser,
    errorHandler: this.error_postPersonalFollowUser
  })
}
root.methods.re_postPersonalFollowUser = function (data) {
  typeof data === 'string' && (data = JSON.parse(data))
  this.followUserList = data.dataMap.list || []
}
root.methods.error_postPersonalFollowUser = function (err) {
  console.log("this.err=====",err)
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
// 个人设置
root.methods.personalSetting = function () {
  this.$router.push({name:'tapeListManage'})
}

/*---------------------- 保留小数 begin ---------------------*/
root.methods.toFixed = function (num, acc = 8) {
  return this.$globalFunc.accFixed(num, acc)
}
/*---------------------- 保留小数 end ---------------------*/

/*---------------------- 乘法运算 begin ---------------------*/
root.methods.accMul = function (num1, num2) {
  return this.$globalFunc.accMul(num1, num2)
}
/*---------------------- 乘法运算 end ---------------------*/
/*---------------------- 减法运算 begin ---------------------*/
root.methods.accMinus = function (num1, num2) {
  return this.$globalFunc.accMinus(num1, num2)
}
/*---------------------- 减法运算 end ---------------------*/

export default root
