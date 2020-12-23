const root = {}
root.name = 'mobileDocumentaryGod'
/*------------------------------ 组件 ------------------------------*/
root.components = {
  'Loading': resolve => require(['../../vue/Loading'], resolve),
  'PopupPrompt': resolve => require(['../../vue/PopupPrompt'], resolve),
}
/*------------------------------ data -------------------------------*/
root.data = function () {
  return {
    loading:true,
    // 弹框
    popType: 0,
    popText: '',
    popOpen: false,
    waitTime: 2000,
    followType:1,
    godHistorList:[],
    godInfo:{},
    followUserList:[],
    delFollowOpenDisable:false,
    delFollowOpenDisableBi:false,
    BDBInfo:true,
    isGod:true,
    isYuan1:[],
  }
}
/*------------------------------ 生命周期 -------------------------------*/
root.created = function () {

  this.postBigBrotherHistory()
  this.postFollowUser()
  if(this.$route.query.isApp) {
    // window.postMessage(JSON.stringify({
    //     method: 'setTitle',
    //     parameters: '区块恋' // TODO     这里需要大神的UID，最新方案先不要这段代码了
    //   })
    // );
    window.postMessage(JSON.stringify({
      method: 'setH5Back',
      parameters: {
        canGoH5Back:true
      }
    }))
  }

  console.info('this.mobileDocumentaryGod',this.isYuan)
}
root.mounted = function () {}
root.beforeDestroy = function () {}
/*------------------------------ 计算 -------------------------------*/
root.computed = {}
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
root.computed.isYuan = function () {
  return this.$route.query.isYuan;
}
root.computed.isHasGodInfo = function () {
  if(JSON.stringify(this.godInfo) == '{}') {
    return false
  }
  return true
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
// 切换历史跟单和跟单者
root.methods.toggleType = function (type) {
  this.followType = type
}
// 返回跟单首页
root.methods.jumpToFollowTrade = function () {
  // this.$router.go(-1)
  this.$router.push({name:'mobileFollowTrade',query:{isSwitchOrder:this.isSwitchOrder}})

}
// 点击跟单
root.methods.jumpToFollowDocumentary = function () {
  // this.$router.push({name:'mobileMyFollowOrder'})
  if(this.isGod){
    // 自己不能跟单自己哦
    this.openPop(this.$t('带单账号不可跟单'))
    return
  }
  this.delFollowOpenDisableBi = true
}
// 点击跟单
root.methods.jumpToFollowDocumentaryBi = function () {
  // this.$router.push({name:'mobileMyFollowOrder'})
  this.delFollowOpenDisableBi = false
  this.$router.push({name:'mobileDocumentary',query:{userId:this.$route.query.userId,feeType:this.$route.query.feeType,fee:this.$route.query.fee,days:this.$route.query.days,isYuan:this.$route.query.isYuan,isSwitchOrder:this.$route.query.isSwitchOrder}})
}
// 点击跟单
root.methods.jumpToFollowDocumentaryHe = function () {
  // this.$router.push({name:'mobileMyFollowOrder'})
  this.delFollowOpenDisable = false
  this.$router.push({name:'mobileDocumentary',query:{userId:this.$route.query.userId,feeType:this.$route.query.feeType,fee:this.$route.query.fee,days:this.$route.query.days,isYuan:this.$route.query.isYuan,isSwitchOrder:this.$route.query.isSwitchOrder}})
}

root.methods.popCloseTemporarilyClosedBi = function () {
  this.delFollowOpenDisableBi = false
}

root.methods.openDocumentaryWindowDisable = function () {
  if(this.isGod){
    // 自己不能跟单自己哦
    this.openPop(this.$t('带单账号不可跟单'))
    return
  }
  if (this.isYuan==true) {
    this.openPop(this.$t('不可同时跟随多人'))
    return
  }
  this.delFollowOpenDisable = true
}


root.methods.popCloseTemporarilyClosed = function () {
  this.delFollowOpenDisable = false
}
// 关闭修改跟单弹窗
root.methods.delFollowClose = function () {
  this.delFollowOpenDisable = false
}

//大神操作记录
root.methods.postBigBrotherHistory = function () {
  let params = {
    followId: this.$route.query.userId,
    type: this.isSwitchOrder,
  }
  this.$http.send('POST_BROTHER_ORDER', {
    bind: this,
    params: params,
    callBack: this.re_postBigBrotherHistory,
    errorHandler: this.error_postBigBrotherHistory
  })
}
root.methods.re_postBigBrotherHistory = function (data) {
  // console.log("this.res=====",data)
  typeof data === 'string' && (data = JSON.parse(data))
  // console.info('data',data)
  this.loading = false
  this.godInfo = data.dataMap.godInfo || {}
  this.godHistorList = data.dataMap.list || []
}
root.methods.error_postBigBrotherHistory = function (err) {
  console.log("this.err=====",err)
}


//大佬跟单者
root.methods.postFollowUser = function () {
  let params = {
    followId: this.$route.query.userId ,
    type: this.isSwitchOrder,
  }
  this.$http.send('POST_FOLLOWUSER', {
    bind: this,
    params: params,
    callBack: this.re_postFollowUser,
    errorHandler: this.error_postFollowUser
  })
}
root.methods.re_postFollowUser = function (data) {
  typeof data === 'string' && (data = JSON.parse(data))
  this.followUserList = data.dataMap.list || []
  this.isGod = data.dataMap.isGod || ''
}
root.methods.error_postFollowUser = function (err) {
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



/*---------------------- 保留小数 begin ---------------------*/
root.methods.toFixed = function (num, acc = 8) {
  return this.$globalFunc.accFixed(num, acc)
}
/*---------------------- 保留小数 end ---------------------*/
/*---------------------- 除法运算 begin ---------------------*/
root.methods.accDiv = function (num1, num2) {
  return this.$globalFunc.accDiv(num1, num2)
}
/*---------------------- 除法运算 end ---------------------*/
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
