const root = {}
root.name = 'warehousePosition'
/*------------------------------ 组件 ------------------------------*/
root.components = {
  'Loading': resolve => require(['../../vue/Loading'], resolve),
  // 'PopupPrompt': resolve => require(['../../vue/PopupPrompt'], resolve),
}
/*------------------------------ data -------------------------------*/
root.data = function () {
  return {
    loading: false,

    limit: 10,
    limitNum: 10,

    records: [],
    records1:[],

    loadingMoreShow: true,
    loadingMoreShowing: false,

    popType: 0,
    popText: '',
    popOpen: false
  }
}
/*------------------------------ 生命周期 -------------------------------*/
root.created = function () {
  this.getPositionRisk()
}
root.mounted = function () {}
root.beforeDestroy = function () {}
/*------------------------------ 计算 -------------------------------*/
root.computed = {}

root.computed.computedRecord = function () {
  return this.records1
}
root.computed.serverTime = function () {
  return new Date().getTime();
}
/*------------------------------ 观察 -------------------------------*/
root.watch = {}
/*------------------------------ 方法 -------------------------------*/
root.methods = {}

/*---------------------- 开仓价格 begin ---------------------*/
root.methods.closeOpeningPrice = function () {
  $(".detail-header-box").attr("style","display:none");
}
root.methods.openOpeningPrice = function () {
  $(".detail-header-box").attr("style","display:block");
}
/*---------------------- 开仓价格 end ---------------------*/
/*---------------------- 标记价格 begin ---------------------*/
root.methods.closeMarkedPrice = function () {
  $(".lock-house-time-box").attr("style","display:none");
}
root.methods.openMarkedPrice = function () {
  $(".lock-house-time-box").attr("style","display:block");
}
/*---------------------- 标记价格 end ---------------------*/
/*---------------------- 未实现盈亏 (回报率) begin ---------------------*/
root.methods.closeRateOfReturn = function () {
  $(".income-yesterday-box").attr("style","display:none");
}
root.methods.openRateOfReturn = function () {
  $(".income-yesterday-box").attr("style","display:block");
}
/*---------------------- 未实现盈亏 (回报率) end ---------------------*/




// 仓位
root.methods.getPositionRisk = function () {

  this.$http.send("GET_BALAN_POSITIONRISK", {
    bind: this,
    query: {
      timestamp: this.serverTime
    },
    callBack: this.re_getPositionRisk,
    errorHandler: this.error_getPositionRisk
  })
}
// 获取记录返回，类型为{}
root.methods.re_getPositionRisk = function (data) {
  typeof data === 'string' && (data = JSON.parse(data))
  if (!data) return
  console.log('获取记录', data)
  this.records = data.data
  this.records.map((v,index)=>{
    if (v.positionAmt != 0) {
      let aa = []
      aa.push(v)
      this.records1 = aa
    }
  })

  if (this.records1.length < this.limit) {
    this.loadingMoreShow = false
  }
  this.loadingMoreShowing = false
  // this.loading = false
}
// 获取记录出错
root.methods.error_getPositionRisk = function (err) {
  console.warn("充值获取记录出错！", err)
}

root.methods.loadingMore = function () {
  this.limit += this.limitNum
  this.loadingMoreShowing = true
  this.getPositionRisk()
}


root.methods.popClose = function () {
  this.popOpen = false
}

root.methods.goToContractTransaction = function () {
  // window.location.replace(this.$store.state.domain_url + 'index/sign/login?ani=1&toUrl=c2c_url');
  // window.location.replace( process.env.CONTRACT_URL +'index/tradingHall?symbol=BTC_USDT');

}

/*---------------------- 保留小数 begin ---------------------*/
root.methods.toFixed = function (num, acc = 8) {
  return this.$globalFunc.accFixed(num, acc)
}
/*---------------------- 保留小数 end ---------------------*/


export default root
