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
    followType:'LOT',
    fixedAmount:'',//输入的固定金额
    fixedDescription:'',

    isModify:false,

    // 弹框
    popType: 0,
    popText: '',
    popOpen: false,
    waitTime: 2000,

    delFollowOpen:false,
    // 确认弹窗
  }
}
/*------------------------------ 生命周期 -------------------------------*/
root.created = function () {
console.info('quey: {item:item}',this.$route.query.item)

  if(this.$route.query.isApp) {
    window.postMessage(JSON.stringify({
        method: 'setTitle',
        parameters: '跟单'
      })
    );
    window.postMessage(JSON.stringify({
      method: 'setH5Back',
      parameters: {
        canGoH5Back:false
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
root.computed.queryItem = function () {
  return JSON.parse(this.$route.query.item) || {}
}
// 判断是否为修改
root.computed.isHasItem = function () {
  if(this.queryItem) {
    return true
  }
  return false
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

// 检验ios是否登录
root.computed.iosLogin = function () {
  return this.$route.query.iosLogin
}

// 获取屏幕宽度
root.computed.windowWidth = function () {
  return window.innerWidth
}
/*------------------------------ 观察 -------------------------------*/
root.watch = {}
/*------------------------------ 方法 -------------------------------*/
root.methods = {}
// 确定修改跟单币比例
root.methods.commitModify = function () {
  this.$http.send('POST_UPDATE_RATEORLOT', {
    bind: this,
    params: params,
    callBack: this.re_commitModify,
    errorHandler: this.error_commitModify
  })

  this.delFollowClose()
}
root.methods.re_commitModify = function (data) {
  typeof data === 'string' && (data = JSON.parse(data))
  if(!data) return
  this.delFollowClose()
}
root.methods.error_commitModify = function (err){
  console.info('err==========',err)
}
// 打开确认修改弹框
root.methods.openModifyWindow = function (){
this.delFollowOpen = true
}
// 关闭修改跟单弹窗
root.methods.delFollowClose = function () {
  this.delFollowOpen = false
}
//跳转个人策略跟单
root.methods.goToFollowTrade = function () {
  this.$router.push({'path':'/index/mobileFollowTrade'})
}

// 切换固定金额和固定比例
root.methods.fixedType = function (type) {
  this.followType = type
}

//立即跟单postDocumentaryImmediately
root.methods.postDocumentaryImmediately = function () {

  let canSend = true
  if (this.fixedAmount == '') {
    this.openPop('固定金额/固定比例不可为空')
    return
  }
  if (!canSend) {
    return
  }

  let params = {
    followId: this.$route.query.userId,
    followType: this.followType ,    //固定金额LOT   固定比例RATE
    val: this.fixedAmount,
  }
  this.$http.send('POST_ADDFOLLOWER', {
    bind: this,
    params: params,
    callBack: this.re_postDocumentaryImmediately,
    errorHandler: this.error_postDocumentaryImmediately
  })
}
root.methods.re_postDocumentaryImmediately = function (data) {
  console.log("this.res=====",data)
  typeof data === 'string' && (data = JSON.parse(data))
  //
  // this.success = data.data.success
  // console.log("re_postJoinGroup + data=====",data)
  //
  if (data.errorCode == 0) {
    this.openPop('跟单成功',1)
    setTimeout(() => {
      this.$router.push({'path':'/index/mobileMyFollowOrder'})
    }, 1000)
    return;
  }
  // if (data.errorCode) {
  //   if (
  //     data.errorCode == 1 && (this.popText = this.$t('exist')) ||//账户不存在
  //     data.errorCode == 2 && (this.popText = this.$t('资产')) || // 团长剩余比例不足
  //     data.errorCode == 3 && (this.popText = this.$t('modified')) || // 团长职位不能修改
  //     data.errorCode == 4 && (this.popText = this.$t('Wrong')) || // 成员类型有误
  //     data.errorCode == 5 && (this.popText = this.$t('changed')) || // 联席团长职位不可更换
  //     data.errorCode == 6 && (this.popText = this.$t('Setting')) || // 设置比例折扣不能为0
  //     data.errorCode == 400 && (this.popText = this.$t('parameter_error')) //参数有误
  //   ) {
  //     this.popOpen = true
  //     this.popType = 0
  //     setTimeout(() => {
  //       this.popOpen = true
  //     }, 100)
  //     return;
  //   }
  // }



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
export default root
