const root = {}
root.name = 'mobileFollowTrade'
/*------------------------------ 组件 ------------------------------*/
root.components = {
 'Loading': resolve => require(['../../vue/Loading'], resolve),
  'PopupPrompt': resolve => require(['../../vue/PopupPrompt'], resolve),
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

    popIdenOpen: false,

    currentInterval:null,
    switchOrder: 'CONTRACT',
    godInfo: true,
  }
}
/*------------------------------ 生命周期 -------------------------------*/
// root.beforeRouteEnter = function (to, from, next) {
  // next(vm => {
  //   console.log('beforeRouteEnter  ',to)
  //   if(to.name == "mobileFollowTrade" && vm.$route.query.isApp){
  //     window.postMessage(JSON.stringify({
  //       method: 'setH5Back',
  //       parameters: {
  //         canGoH5Back:false
  //       }
  //     }))
  //   }
  // });
// }
root.created = function () {
  if(this.$route.query.isSwitchOrder == 'SPOT'){
    this.switchOrder = 'SPOT'
  }

  this.GET_AUTH_STATE()

  this.getBigBrotherList()
  this.currentInterval1 && clearInterval(this.currentInterval1)
  this.currentInterval1 = setInterval(this.getBigBrotherList, 4000)

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
//什么类型的跟单
root.computed.isSwitchOrder = function () {
  return this.switchOrder;
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
//切换跟单类型
root.methods.switchingOrders = function (orderType) {
  this.switchOrder = orderType
  this.$store.commit('IS_SWITCHORDER', orderType);
  this.$router.push({name:'followTrade',query:{isSwitchOrder:orderType}})
  // console.info('this.switchOrder=======',this.switchOrder,orderType)
  this.getBigBrotherList()
}

// 关闭弹窗
root.methods.popIdenClose = function () {
  this.popIdenOpen = false
}
//跳转首页
root.methods.jumpToBack = function () {

  if(this.$route.query.isApp){
    window.postMessage(JSON.stringify({
      method: 'toHomePage'
    }))
    return
  }

  // this.$router.go(-1)
  this.$router.push({'path':'/index/newH5homePage'})
}
//跳转个人镜像交易
root.methods.goToMobileFollowTradeStrategy = function (switchOrder) {
  if (!this.bindIdentify) {
    this.popIdenOpen = true
    return
  }

  // H5判断是否绑定谷歌或手机，如果都没绑定
  if (!this.bindGA && !this.bindMobile) {
    // this.$eventBus.notify({key: 'BIND_AUTH_POP'})
    this.popText = '请绑定谷歌或手机';
    this.popType = 0;
    this.popOpen = true;
    return
  }

  this.$router.push({name:'mobileFollowTradeStrategy',query:{isSwitchOrder:this.switchOrder}})
}//跳转个人镜像交易
root.methods.goToManagementiWthBill = function (switchOrder) {
  if (!this.bindIdentify) {
    this.popIdenOpen = true
    return
  }

  // H5判断是否绑定谷歌或手机，如果都没绑定
  if (!this.bindGA && !this.bindMobile) {
    // this.$eventBus.notify({key: 'BIND_AUTH_POP'})
    this.popText = '请绑定谷歌或手机';
    this.popType = 0;
    this.popOpen = true;
    return
  }

  this.$router.push({name:'mobileTapeListManage',query:{isSwitchOrder:this.switchOrder}})
}
// 跳转我的镜像交易
root.methods.goToDocumentary = function (item,switchOrder) {

  // if (!this.bindIdentify) {
  //   this.popIdenOpen = true
  //   return
  // }

  // H5判断是否绑定谷歌或手机，如果都没绑定
  if (!this.bindGA && !this.bindMobile) {
    // this.$eventBus.notify({key: 'BIND_AUTH_POP'})
    this.popText = '请绑定谷歌或手机';
    this.popType = 0;
    this.popOpen = true;
    return
  }

  if(this.userId == item.userId){
    this.openPop('不能跟随自己哦')
    return
  }
  if(this.godInfo){
    // 自己不能跟随自己哦
    this.openPop('大神不能跟单大神')
    return
  }

  // this.$router.push({name:'mobileDocumentary',params: {item:item}})
  this.$router.push({name:'mobileDocumentaryGod',query:{userId:item.userId,feeType:item.feeType,fee:item.fee,days:this.days,isFollow:this.godList.indexOf(item.userId),isSwitchOrder:this.switchOrder}})
}// 跳转我的镜像交易
root.methods.goToDocumentary1 = function (item,switchOrder) {

  // H5判断是否绑定谷歌或手机，如果都没绑定
  if (!this.bindGA && !this.bindMobile) {
    // this.$eventBus.notify({key: 'BIND_AUTH_POP'})
    this.popText = '请绑定谷歌或手机';
    this.popType = 0;
    this.popOpen = true;
    return
  }

  if(this.userId == item.userId){
    this.$router.push({name:'mobileFollowTradeStrategy',query:{isSwitchOrder:this.switchOrder}})
    return
  }
  this.$router.push({name:'mobileDocumentaryGod',query:{userId:item.userId,feeType:item.feeType,fee:item.fee,days:this.days,isFollow:this.godList.indexOf(item.userId),isSwitchOrder:this.switchOrder}})
}
// // 去大神页面
// root.methods.goToDocumentaryGod = function () {
//   this.$router.push({name: 'mobileDocumentaryGod'})
// }
// 返回我的镜像交易，正在跟随
root.methods.goToMobileMyFollowOrder = function (switchOrder) {
  // if (!this.bindIdentify) {
  //   this.popIdenOpen = true
  //   return
  // }

  // H5判断是否绑定谷歌或手机，如果都没绑定
  if (!this.bindGA && !this.bindMobile) {
    // this.$eventBus.notify({key: 'BIND_AUTH_POP'})
    this.popText = '请绑定谷歌或手机';
    this.popType = 0;
    this.popOpen = true;
    return
  }

  this.$router.push({name:'mobileMyFollowOrder',query:{isSwitchOrder:this.switchOrder}})
}


// 大佬列表
root.methods.getBigBrotherList = function () {
  this.$http.send('BIG_BROTHER_LIST', {
    bind: this,
    params:{
      type: this.isSwitchOrder,
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
  this.godInfo = data.dataMap.godInfo || ''   // 已跟随大神列表
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
