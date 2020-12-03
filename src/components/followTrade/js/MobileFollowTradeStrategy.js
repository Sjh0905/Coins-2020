const root = {}
root.name = 'mobileFollowTradeStrategy'
/*------------------------------ 组件 ------------------------------*/
//root.components = {
//  'Loading': resolve => require(['../Loading/Loading.vue'], resolve),
//}
/*------------------------------ data -------------------------------*/
root.data = function () {
  return {
    followType: 1,
    godInfo:{},
    godHistorList:[],
    followUserList:[],
    isTapeList:false,
    delFollowOpenDisable:false,
    delFollowOpenDisableBi:false,
    BDBInfo:true,
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
  this.isOpenFollow()
  this.postPersonalFollowUser()
  this.postPersonalrHistory()
}
root.mounted = function () {}
root.beforeDestroy = function () {}
/*------------------------------ 计算 -------------------------------*/
root.computed = {}
root.computed.isHasGodInfo = function () {
  if(JSON.stringify(this.godInfo) == '{}') {
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
//什么类型的跟单
root.computed.isSwitchOrder = function () {
  return this.$route.query.isSwitchOrder;
}

root.computed.contractType = function () {

  return {
    'LIMIT': this.$t('限价单'),
    'MARKET': this.$t('市价单'),
    'STOP': this.$t('止损限价单'),
    'STOP_MARKET': this.$t('止损市价单'),
    'TAKE_PROFIT': this.$t('止盈限价单'),
    'TAKE_PROFIT_MARKET': this.$t('止盈市价单'),
    'TRAILING_STOP_MARKET': this.$t('跟踪止损单'),
    'BUY_LIMIT': this.$t('限价买入'),
    'BUY_MARKET' : this.$t('市价买入'),
    'SELL_LIMIT': this.$t('限价卖出'),
    'SELL_MARKET': this.$t('市价卖出'),
  }
}
/*------------------------------ 观察 -------------------------------*/
root.watch = {}
/*------------------------------ 方法 -------------------------------*/
root.methods = {}

root.methods.clickToggle = function () {
  this.BDBInfo = false
}
root.methods.clickToggleTrue = function () {
  this.BDBInfo = true
}

// 切换历史跟单和跟随者
root.methods.toggleType = function (type) {
  this.followType = type
}

// 是否开启带单
root.methods.isOpenFollow = function () {
  this.$http.send('POST_GOD_BY_USERID', {
    bind: this,
    params:{
      type: this.isSwitchOrder,
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
      type: this.isSwitchOrder,
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


// 返回跟单首页
root.methods.jumpToFollowTrade = function () {
  this.$router.go(-1)
}
// 个人设置
root.methods.personalSetting = function (isSwitchOrder) {
  this.delFollowOpenDisableBi = true
  // this.$router.push({name:'mobileTapeListManage',query:{isSwitchOrder:this.isSwitchOrder}})
}


// 个人设置
root.methods.personalSettingBi = function (isSwitchOrder) {
  this.delFollowOpenDisableBi = false
  this.$router.push({name:'mobileTapeListManage',query:{isSwitchOrder:this.isSwitchOrder}})
}


root.methods.openMaskDisable = function () {
  this.delFollowOpenDisable = true
}
root.methods.postDocumentaryImmediatelyDisable = function () {
  this.delFollowOpenDisable = false
  this.openMaskWindow = true
}
root.methods.popCloseTemporarilyClosed = function () {
  this.delFollowOpenDisable = false
}

root.methods.popCloseTemporarilyClosedBi = function () {
  this.delFollowOpenDisableBi = false
}

/*---------------------- 保留小数 begin ---------------------*/
root.methods.toFixed = function (num, acc = 8) {
  return this.$globalFunc.accFixed(num, acc)
}
/*---------------------- 保留小数 end ---------------------*/
export default root
