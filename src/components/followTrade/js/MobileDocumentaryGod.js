const root = {}
root.name = 'mobileDocumentaryGod'
/*------------------------------ 组件 ------------------------------*/
root.components = {
  'Loading': resolve => require(['../../vue/Loading'], resolve),
}
/*------------------------------ data -------------------------------*/
root.data = function () {
  return {
    loading:true,
    followType:1,
    godHistorList:[],
    godInfo:{},
    followUserList:[]
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
  return this.$store.state.isSwitchOrder;
}
/*------------------------------ 观察 -------------------------------*/
root.watch = {}
/*------------------------------ 方法 -------------------------------*/
root.methods = {}
// 切换历史跟单和跟随者
root.methods.toggleType = function (type) {
  this.followType = type
}
// 返回跟单首页
root.methods.jumpToFollowTrade = function () {
  this.$router.go(-1)
}
// 点击跟单
root.methods.jumpToFollowDocumentary = function () {
  // this.$router.push({name:'mobileMyFollowOrder'})
  this.$router.push({name:'mobileDocumentary',query:{userId:this.$route.query.userId,feeType:this.$route.query.feeType,fee:this.$route.query.fee,days:this.$route.query.days}})
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


//大佬跟随者
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
}
root.methods.error_postFollowUser = function (err) {
  console.log("this.err=====",err)
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
