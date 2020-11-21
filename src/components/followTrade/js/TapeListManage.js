const root = {}
root.name = 'tapeListManage'
/*------------------------------ 组件 ------------------------------*/
root.components = {
  // 'Loading': resolve => require(['../Loading/Loading.vue'], resolve),
  'PopupPrompt': resolve => require(['../../vue/PopupPrompt'], resolve),
  'PopupWindow': resolve => require(['../../vue/PopupWindow'], resolve),
}
/*------------------------------ data -------------------------------*/
root.data = function () {
  return {
    openMaskWindow:false,
    // 是否开启带单
    isTapeList: false,
    currencyPair:'', //跟单费用
    currencyPairFee:'', //修改跟单费用
    currencyPairFeeRATE:'',

    // 弹框
    popType: 0,
    popText: '',
    popOpen: false,
    waitTime: 2000,

    countFollower:0, //跟单人数
    sumFee:0, //累计收益
    todayFee:0, //今日收益
    userFollowFees:[], //收益明细
    followDay:'', // 跟单天数
    godInfo:{}, //是否开启带单
    godFee: '', //跟单保证金

    // 信息弹框
    popWindowOpen:false,
    fixedAmPr:2,  //默认固定金额

  }
}
/*------------------------------ 生命周期 -------------------------------*/
root.created = function () {

  this.postManage()
  this.postGodFee()
  // console.info('this.$store.state.isSwitchOrder',this.$store.state.isSwitchOrder)
  if(this.$route.query.isApp) {
    // window.postMessage(JSON.stringify({
    //     method: 'setTitle',
    //     parameters: '带单管理'
    //   })
    // );
    window.postMessage(JSON.stringify({
      method: 'setH5Back',
      parameters: {
        canGoH5Back:true
      }
    }))
  }
}
root.mounted = function () {}
root.beforeDestroy = function () {}
/*------------------------------ 计算 -------------------------------*/
root.computed = {}

root.computed.isHasItem = function () {
  if(JSON.stringify(this.godInfo) == '{}') {
    return false
  }
  return true
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
  return this.currencyPairFee || 0
}
root.computed.fixedAmountPr2 = function () {
  return this.toFixed(this.accMul(Number(this.currencyPair), 0.8),2)
}
root.computed.fixedAmountPr3 = function () {
  return this.accMinus(80,Number(this.currencyPairFee))
}
root.computed.fixedAmountPr4 = function () {
  return this.accMinus(80,Number(this.currencyPairFee))
}
//什么类型的跟单
root.computed.isSwitchOrder = function () {
  return this.$route.query.isSwitchOrder;
}
/*------------------------------ 观察 -------------------------------*/
root.watch = {}
/*------------------------------ 方法 -------------------------------*/
root.methods = {}

root.methods.goToZhuYe = function(isSwitchOrder) {
  this.$router.push({name:'followTradeStrategy',query:{isSwitchOrder:this.isSwitchOrder,}})

}

//固定比例-金额选择
root.methods.fixedAmountPr = function (type) {
  this.currencyPair = ''
  this.currencyPairFee=''
  this.fixedAmPr = type
}

// 跟单保证金
root.methods.postGodFee = function () {
  this.$http.send('POST_GOD_FEE', {
    bind: this,
    params:{
      type: this.isSwitchOrder,
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
//修改跟单
root.methods.goToModify = function (fee) {
  this.currencyPair = fee
  this.currencyPairFee = fee
  this.popWindowOpen = true
  this.fixedAmPr = this.godInfo.feeType == 'LOT' ? 1 : 2
}
// 关闭修改策略弹框
root.methods.popWindowClose= function () {
  this.popWindowOpen = false
}
// 返回个人页面
root.methods.jumpToFollowTradeStrategy = function () {
  this.$router.go(-1)
}
// 打开蒙层
root.methods.openMask = function () {
  this.openMaskWindow = true
}
// 关闭蒙层
root.methods.closeMaskWindow = function () {
  this.openMaskWindow = false
}
root.methods.testCurrencyPair = function () {
  if(this.currencyPair == ''){
    this.currencyPairText = this.$t('cannotBeBlank')
    return
  }
}


//修改大神
root.methods.postRevisionFee = function () {
  if (this.fixedAmPr != 1 && this.currencyPairFee == '') {
    this.openPop(this.$t('modificationFeeCannotBeBlank'))
    return
  }
  if (this.fixedAmPr == 1 && this.currencyPair == '') {
    this.openPop(this.$t('modificationFeeCannotBeBlank'))
    return
  }
  if (this.currencyPairFee > '60') {
    this.openPop(this.$t('分成比例超过了最大比例'))
    return
  }
  let params = {
    feeType: this.fixedAmPr == 1 ? 'LOT' : 'RATE',
    fee:this.fixedAmPr == 1 ? this.currencyPair : this.currencyPairFee,
    type: this.isSwitchOrder,
  }
  this.$http.send('POST_REVISION_FEE', {
    bind: this,
    params: params,
    callBack: this.re_postRevisionFee,
    errorHandler: this.error_postRevisionFee
  })
}
root.methods.re_postRevisionFee = function (data) {
  typeof data === 'string' && (data = JSON.parse(data))
  if(data.errorCode == 0) {
    this.openMaskWindow = false
    this.isTapeList = true
    this.openPop(this.$t('updateSuccess'),1)
    this.popWindowClose()
    this.postManage()
  }
  if(data.errorCode == 2) {
    this.openMaskWindow = false
    this.isTapeList = true
    this.openPop(this.$t('分成比例超过了最大比例'))
    return
  }
  if(data.errorCode != 0) {
    this.openMaskWindow = false
    this.isTapeList = true
    this.openPop(this.$t('systemError'))
  }

}
root.methods.error_postRevisionFee = function (err) {
  console.log("this.err=====",err)
}

//个人带单管理
root.methods.postManage = function () {
  this.$http.send('POST_MANAGE', {
    bind: this,
    // params: params,
    params:{
      type: this.isSwitchOrder,
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
  this.godInfo = data.dataMap.godInfo || {}
  this.followDay = data.dataMap.days || '0'
}
root.methods.error_postManage = function (err) {
  console.log("this.err=====",err)
}

//修改带单费用
root.methods.RevisionFee = function () {
  this.openMaskWindow = true
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
/*---------------------- 减法运算 begin ---------------------*/
root.methods.accMinus = function (num1, num2) {
  return this.$globalFunc.accMinus(num1, num2)
}
/*---------------------- 减法运算 end ---------------------*/
/*---------------------- 除法运算 begin ---------------------*/
root.methods.accDiv = function (num1, num2) {
  return this.$globalFunc.accDiv(num1, num2)
}
/*---------------------- 除法运算 end ---------------------*/
/*---------------------- 加法运算 begin ---------------------*/
root.methods.accAdd = function (num1, num2) {
  return this.$globalFunc.accAdd(num1, num2)
}
/*---------------------- 加法运算 end ---------------------*/


export default root
