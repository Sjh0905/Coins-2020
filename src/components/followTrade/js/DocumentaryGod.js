const root = {}
root.name = 'mobileDocumentaryGod'
/*------------------------------ 组件 ------------------------------*/
root.components = {
  'Loading': resolve => require(['../../vue/Loading'], resolve),
  'PopupPrompt': resolve => require(['../../vue/PopupPrompt'], resolve),
  'PopupWindow': resolve => require(['../../vue/PopupWindow'], resolve),
  'OpenTapeListDisable': resolve => require(['../../vue/OpenTapeListDisable'], resolve),
}
/*------------------------------ data -------------------------------*/
root.data = function () {
  return {
    loading:true,
    fixedFollow:2,
    followType:'RATE',
    strategyType:1,
    stopStrategyType:1,
    stopLossType:1,
    godHistorList:[],
    godInfo:{},
    followUserList:[],

    // 弹框
    popType: 0,
    popText: '',
    popOpen: false,
    waitTime: 1000,

    fixedAmountLot:'',

    follow:true,
    popWindowOpen: false,
    popWindowOpenContract:false,//禁用
    popWindowOpenContractBi:false,//禁用
    BDBInfo:true,//勾选
    isGod:true,//勾选
    strategyInput:100,
    stopStrategyInput:30,
    stopLossInput:30,
  }
}
/*------------------------------ 生命周期 -------------------------------*/
root.created = function () {
  // console.info('params: {item:item}',this.$route.query.userId ,this.$route.query.fee)

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
root.computed.isYuan = function () {
  return this.$route.query.isYuan;
}
root.computed.isHasGodInfo = function () {
  if(JSON.stringify(this.godInfo) == '{}') {
    return false
  }
  return true
}


root.computed.contractType = function () {

  return {
    'LIMIT': this.$t('limitCon'),
    'MARKET': this.$t('marketCon'),
    'STOP': this.$t('stopCon'),
    'STOP_MARKET': this.$t('stopMarketCon'),
    'TAKE_PROFIT': this.$t('takeProfitCon'),
    'TAKE_PROFIT_MARKET': this.$t('takeProfitMarketCon'),
    'TRAILING_STOP_MARKET': this.$t('trailingStopMarketCon'),
    'BUY_LIMIT': this.$t('buyIn'),
    'BUY_MARKET' : this.$t('buyOutshi'),
    'SELL_LIMIT': this.$t('selllOut'),
    'SELL_MARKET': this.$t('selllOutshi'),
  }
}
/*------------------------------ 观察 -------------------------------*/
root.watch = {}

// root.watch.strategyInput = function (newVal,oldVal) {
//
//   // if (this.strategyInput < 30) {
//   //   this.strategyInput = 30
//   // }
//   this.strategyInput = this.strategyInput < 30 ? this.strategyInput = 30 : newVal
//
//   return this.strategyInput
//   console.info('this.strategyInput',this.strategyInput)
// }
/*------------------------------ 方法 -------------------------------*/
root.methods = {}

root.methods.strategyInputBlur = function () {
  if (this.strategyInput < 30) {
    this.openPop(this.$t('比例不可以小于30%'),0,1000);
    this.strategyInput = 30
  }
}
root.methods.stopStrategyInputBlur = function () {
  if (this.stopStrategyInput < 30) {
    this.openPop(this.$t('止盈比例不可以小于30%'),0,1000);
    this.stopStrategyInput = 30
  }
}

root.methods.stopLossInputBlur = function () {
  if (this.stopLossInput < 30) {
    this.openPop(this.$t('止损比例不可以小于30%'),0,1000);
    this.stopLossInput = 30
  }
}


root.methods.clickToggle = function () {
  this.BDBInfo = false
}
root.methods.clickToggleTrue = function () {
  this.BDBInfo = true
}



// 切换历史跟单和跟单者
root.methods.toggleType = function (type) {
  this.fixedFollow = type
}
// 返回跟单首页
root.methods.jumpToFollowTrade = function () {
  this.$router.push({name:'mobileFollowTrade'})
}
// // 返回跟单首页
// root.methods.goToFollowTrade = function (isSwitchOrder) {
//   this.$router.push({name:'followTrade',query:{isSwitchOrder:this.isSwitchOrder}})
// }
// 点击跟单
root.methods.jumpToFollowDocumentary = function () {
  if(this.isGod){
    // 自己不能跟单自己哦
    this.openPop(this.$t('带单账号不可跟单'))
    return
  }
  this.popWindowOpenContractBi = true
  // this.$router.push({name:'mobileMyFollowOrder'})
  // this.$router.push({name:'mobileDocumentary',query:{userId:this.$route.query.userId,fee:this.$route.query.fee,days:this.$route.query.days}})
}// 点击跟单
root.methods.openAContractBi = function () {
  if(!this.BDBInfo) {
    this.openPop(this.$t('您尚未勾选'));
    return;
  }
  this.popWindowOpen = true
  this.popWindowOpenContractBi = false
  // this.$router.push({name:'mobileMyFollowOrder'})
  // this.$router.push({name:'mobileDocumentary',query:{userId:this.$route.query.userId,fee:this.$route.query.fee,days:this.$route.query.days}})
}
root.methods.openTapeListDisable = function () {
  if(this.isGod){
    // 大神不能跟单大神
    this.openPop(this.$t('带单账号不可跟单'))
    return
  }
  if (this.isYuan == true) {
    this.openPop(this.$t('不可同时跟随多人'))
    return
  }
  this.popWindowOpenContract = true
}
root.methods.popCloseTemporarilyClosed = function () {
  this.popWindowOpenContract = false
}
root.methods.popCloseTemporarilyClosedBi = function () {
  this.popWindowOpenContractBi = false
}
// 关闭跟单弹框
root.methods.popWindowClose= function () {
  this.popWindowOpen = false
}
root.methods.openAContract = function () {
  if(!this.BDBInfo) {
    this.openPop(this.$t('您尚未勾选'));
    return;
  }
  this.popWindowOpenContract = false
  this.popWindowOpen =true
}

// 切换固定金额和固定比例
root.methods.fixedType = function (type) {
  this.followType = type
}

root.methods.clickStrategy = function (type) {
  this.strategyType = type
}

root.methods.stopEarningStrategy = function (type) {
  this.stopStrategyType = type
}
root.methods.stopLossStrategy = function (type) {
  this.stopLossType = type
}

//立即跟单postDocumentaryImmediately
root.methods.postDocumentaryImmediately = function () {
  this.follow = false
  let canSend = true
  if (this.followType == 'LOT' && this.isSwitchOrder == 'SPOT' && this.fixedAmountLot == '') {
    this.openPop(this.$t('cannotBeEmpty'))
    this.follow = true
    return
  }
  if (!canSend) {
    return
  }

  let params = this.isSwitchOrder == 'SPOT' ? {
    followId: this.$route.query.userId,
    followType: this.followType ,    //固定金额LOT   固定比例RATE
    val: this.followType == 'LOT' ? this.fixedAmountLot : this.fixedAmountRate,
    type: this.isSwitchOrder,
  }:{
    followId: this.$route.query.userId,
    followType: 'RATE' ,    //固定金额LOT   固定比例RATE
    type: this.isSwitchOrder,
    followRate:this.strategyType==1?this.strategyInput:0, //仓位策略
    stopProfitRate:this.stopStrategyType==1?this.stopStrategyInput:0, //止盈策略
    stopLossRate:this.stopLossType==1?this.stopLossInput:0, //止损策略
  }
  this.$http.send('POST_ADDFOLLOWER', {
    bind: this,
    params: params,
    callBack: this.re_postDocumentaryImmediately,
    errorHandler: this.error_postDocumentaryImmediately
  })
}
root.methods.re_postDocumentaryImmediately = function (data) {
  typeof data === 'string' && (data = JSON.parse(data))
  this.follow = true
  // this.success = data.data.success
  // console.log("re_postJoinGroup + data=====",data)
  //


  if (data.errorCode == 0) {
    this.openPop(this.$t('followSuccess'),1)
    setTimeout(() => {
      this.popWindowOpen = false
      this.postBigBrotherHistory()
      this.postFollowUser()
      this.$route.query.isFollow = true
    }, 1000)
    return;
  }

  if (data.errorCode) {
    data.errorCode == 1 &&  this.openPop(this.$t('systemError'));
    data.errorCode == 3 &&  this.openPop(this.$t('canNotFollowMyself'));
    data.errorCode == 4 &&  this.openPop(this.$t('canNotFollowMyself2'));
    data.errorCode == 5 &&  this.openPop(this.$t('带单账号不可跟单'));
    data.errorCode == 6 &&  this.openPop(this.$t('不可同时跟随多人'));
    data.errorCode == 7 &&  this.openPop(this.$t('followDetails_4'));
    data.errorCode == 8 &&  this.openPop(this.$t('followDetails_1'));
    data.errorCode == 9 &&  this.openPop(this.$t('followDetails_2'));
    data.errorCode == 10 &&  this.openPop(this.$t('followDetails'));
    data.errorCode == 11 &&  this.openPop(this.$t('followDetails_5'));
    data.errorCode == 12 &&  this.openPop(this.$t('followDetails_1'));
    data.errorCode == 15 &&  this.openPop(this.$t('followDetails_3'));
    data.errorCode == 16 &&  this.openPop(this.$t('您已有仓位，暂不能跟单'));
    data.errorCode == 17 &&  this.openPop(this.$t('带单者有仓位，暂不能跟单'));
    data.errorCode == 18 &&  this.openPop(this.$t('跟单与带单的保证金模式不一致'));
    data.errorCode == 19 &&  this.openPop(this.$t('跟单与带单的持仓模式不一致'));
    data.errorCode == 20 &&  this.openPop(this.$t('带单者有委托，暂不能跟单'));
    data.errorCode == 21 &&  this.openPop(this.$t('清算中，请三分钟后再试。'));
    data.errorCode == 22 &&  this.openPop(this.$t('请先开通合约'));
    data.errorCode == 23 &&  this.openPop(this.$t('不能跟单'));
  }

}
root.methods.error_postDocumentaryImmediately = function (err) {
  console.log("this.err=====",err)
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
  // console.log("this.res=====",data)
  typeof data === 'string' && (data = JSON.parse(data))
  // console.info('data',data)
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
