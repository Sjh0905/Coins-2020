const root = {}
root.name = 'mobileDocumentary'
/*------------------------------ 组件 ------------------------------*/
root.components = {
 // 'Loading': resolve => require(['../../vue/Loading'], resolve),
  'PopupPrompt': resolve => require(['../../vue/PopupPrompt'], resolve),
}
/*------------------------------ data -------------------------------*/
root.data = function () {
  return {
    loading:true,
    follow:true,
    followType:'RATE',
    fixedLotAmount: '',//输入的固定金额
    fixedRateAmount: '',//输入的固定比例
    fixedAmountLot:'',//修改输入的固定金额
    fixedAmountRate:'',//修改输入的固定金额
    fixedDescription:'',

    isModify:false,

    // 弹框
    popType: 0,
    popText: '',
    popOpen: false,
    waitTime: 2000,

    delFollowOpen:false,
    delFollowOpenDisable:false,
    // 确认弹窗
  }
}
/*------------------------------ 生命周期 -------------------------------*/
root.created = function () {


  if(this.isHasItem) {
    this.followType = this.queryItem.followType ||'LOT'
  }
  if(this.queryItem.lot) {
    this.fixedAmountLot = this.queryItem.lot
  }else {
    this.fixedAmountLot = ''
  }

  // if(this.queryItem.rate){
  //   this.fixedAmountRate = this.queryItem.rate
  // }else{
  //   this.fixedAmountRate = ''
  // }



  if(this.$route.query.isApp) {
    // window.postMessage(JSON.stringify({
    //     method: 'setTitle',
    //     parameters: '跟单'
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
// // 处理是否为修改的输入框的值
// root.computed.fixedAmount = function () {
//   if(this.isHasItem && this.followType == 'LOT') {
//     return this.fixedAmount = this.$route.query.item.lot
//   }
//   if(this.isHasItem && this.followType == 'RATE') {
//     return this.fixedAmount = this.$route.query.item.lot
//   }
//   return this.fixedAmount
// }
// // 修改固定金额
// root.methods.fixedAmountModify = function () {
//   if(this.isHasItem && this.queryItem.followType == 'LOT'){
//     return this.queryItem.lot
//   }
//   if(this.isHasItem && this.queryItem.followType == 'RATE'){
//     return this.queryItem.rate
//   }
// }
root.computed.queryItem = function () {
  let queryItem = this.$route.query.item
  return typeof queryItem == 'string' && JSON.parse(queryItem) || {}
}
// 判断是否为修改
root.computed.isHasItem = function () {
  if(JSON.stringify(this.queryItem) == '{}') {
    return false
  }
  return true
}
root.computed.followId = function () {
  return this.$route.query.item.followId
}

root.computed.isLogin = function () {
  return this.$store.state.isLogin;
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
//什么类型的跟单
root.computed.isSwitchOrder = function () {
  return this.$route.query.isSwitchOrder;
}
/*------------------------------ 观察 -------------------------------*/
root.watch = {}
/*------------------------------ 方法 -------------------------------*/
root.methods = {}
root.methods.openDocumentaryWindow = function () {
  if ( this.followType == 'LOT' && this.fixedAmountLot == '') {
    this.openPop('请输入金额')
    this.follow = true
    return
  }
  this.delFollowOpen = true
}

root.methods.openDocumentaryWindowDisable = function () {
  this.delFollowOpenDisable = true
}
root.methods.popCloseTemporarilyClosed = function () {
  this.delFollowOpenDisable = false
}
root.methods.postDocumentaryImmediatelyDisable = function () {
  this.delFollowOpenDisable = false
  this.delFollowOpen = true
}
// 确认修改
root.methods.commitModify = function (){
  this.$http.send('POST_UPDATE_RATEORLOT', {
    bind: this,
    params: {
      followId: this.queryItem.followId,
      followType: this.followType,
      val: this.followType == 'LOT' ? this.fixedAmountLot:this.fixedAmountRate,
      type: this.isSwitchOrder,
    },
    callBack: this.re_commitModify,
    errorHandler: this.error_commitModify
  })
}
root.methods.re_commitModify = function (data) {
  typeof data === 'string' && (data = JSON.parse(data))
  if(data.errorCode == 0) {
    this.openPop('修改跟单成功',1)
    setTimeout(() => {
      this.$router.go(-1)
    }, 2000)
  }
  if(data.errorCode == 1) {
    this.openPop('系统错误',0)
    return
  }
  if(data.errorCode == 4) {
    this.openPop('余额不足',0)
    return
  }

}
root.methods.error_commitModify = function (err) {
  console.log('err======',err)
}
// 关闭修改跟单弹窗
root.methods.delFollowClose = function () {
  this.delFollowOpen = false
}
//跳转个人镜像交易
root.methods.goToFollowTrade = function () {
  this.$router.go(-1)
}

// 切换固定金额和固定比例
root.methods.fixedType = function (type) {
  this.followType = type
}


//立即跟单postDocumentaryImmediately
root.methods.postDocumentaryImmediately = function () {
  this.follow = false
  let canSend = true
  if (this.followType == 'LOT' && this.fixedAmountLot == '') {
    this.openPop('请输入金额')
    this.follow = true
    return
  }
  if (!canSend) {
    return
  }

  let params = {
    followId: this.$route.query.userId,
    followType: this.followType ,    //固定金额LOT   固定比例RATE
    val: this.followType == 'LOT' ? this.fixedAmountLot : this.fixedAmountRate,
    type: this.isSwitchOrder,
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

  if (data.errorCode == 0) {
    this.openPop('跟单成功',1)
    setTimeout(() => {
      this.$router.push({'name':'mobileMyFollowOrder',params:{fromPageType:'addFollower',isSwitchOrder:this.isSwitchOrder}})
    }, 1000)
    return;
  }
  if (data.errorCode) {
    data.errorCode == 1 &&  this.openPop(this.$t('系统错误'));
    data.errorCode == 3 &&  this.openPop(this.$t('不能自己跟单自己哦'));
    data.errorCode == 4 &&  this.openPop(this.$t('余额不足'));
    data.errorCode == 5 &&  this.openPop(this.$t('大神不能跟单大神'));
    data.errorCode == 6 &&  this.openPop(this.$t('用户合约跟单只能跟单一个大神'));
    data.errorCode == 7 &&  this.openPop(this.$t('超出单比额度限制'));
    data.errorCode == 8 &&  this.openPop(this.$t('用户余额不足'));
    data.errorCode == 9 &&  this.openPop(this.$t('转账不能为负值'));
    data.errorCode == 10 &&  this.openPop(this.$t('跟单失败'));
    data.errorCode == 11 &&  this.openPop(this.$t('24小时转账金额必须要在范围内'));
    data.errorCode == 12 &&  this.openPop(this.$t('用户余额不足'));
    data.errorCode == 15 &&  this.openPop(this.$t('冻结失败'));
    data.errorCode == 16 &&  this.openPop(this.$t('用户已经有仓位了不能跟单大神'));
    data.errorCode == 17 &&  this.openPop(this.$t('大神有仓位，暂不能跟单'));
    data.errorCode == 18 &&  this.openPop(this.$t('用户和大神的逐全仓模式不一致'));
    data.errorCode == 19 &&  this.openPop(this.$t('用户和大神的单双仓模式不一致'));
    data.errorCode == 20 &&  this.openPop(this.$t('大神有挂单，暂不能跟单'));
    data.errorCode == 21 &&  this.openPop(this.$t('清算中，请三分钟后再试。'));
    data.errorCode == 22 &&  this.openPop(this.$t('请先开通合约'));
    data.errorCode == 23 &&  this.openPop(this.$t('不能跟单'));
  }

}
root.methods.error_postDocumentaryImmediately = function (err) {
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

/*---------------------- 加法运算 begin ---------------------*/
root.methods.accAdd = function (num1, num2) {
  return this.$globalFunc.accAdd(num1, num2)
}
/*---------------------- 加法运算 end ---------------------*/

export default root
