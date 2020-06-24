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

  this.getBigBrotherList()

  if(this.$route.query.isApp) {
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
/*------------------------------ 观察 -------------------------------*/
root.watch = {}
/*------------------------------ 方法 -------------------------------*/
root.methods = {}
//跳转首页
root.methods.jumpToBack = function () {

  if(this.$route.query.isApp){
    window.postMessage(JSON.stringify({
      method: 'toHomePage'
    }))
    return
  }

  this.$router.go(-1)
  // this.$router.push({'path':'/index/newH5homePage'})
}
//跳转个人镜像交易
root.methods.goToMobileFollowTradeStrategy = function () {
  this.$router.push({'path':'/index/mobileFollowTradeStrategy'})
}
// 跳转我的镜像交易
root.methods.goToDocumentary = function (item) {
  if(this.userId == item.userId){
    this.openPop('不能跟随自己哦')
    return
  }
  // this.$router.push({name:'mobileDocumentary',params: {item:item}})
  this.$router.push({name:'mobileDocumentaryGod',query:{userId:item.userId,fee:item.fee,days:this.days,isFollow:this.godList.indexOf(item.userId)}})
}
// // 去大神页面
// root.methods.goToDocumentaryGod = function () {
//   this.$router.push({name: 'mobileDocumentaryGod'})
// }
// 返回我的镜像交易，正在跟随
root.methods.goToMobileMyFollowOrder = function () {
  this.$router.push({name:'mobileMyFollowOrder'})
}


// 大佬列表
root.methods.getBigBrotherList = function () {
  this.$http.send('BIG_BROTHER_LIST', {
    bind: this,
    // query:{},
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

export default root
