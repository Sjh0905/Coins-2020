const root = {}
root.name = 'contractRecord'
/*------------------------------ 组件 ------------------------------*/
root.components = {
  'Loading': resolve => require(['../../vue/Loading'], resolve),
  // 'PopupPrompt': resolve => require(['../../vue/PopupPrompt'], resolve),
  'PopupWindow': resolve => require(['../../vue/PopupWindow'], resolve),
  'ContractRiskWarning': resolve => require(['../../vue/ContractRiskWarning'], resolve),

}
/*------------------------------ data -------------------------------*/
root.data = function () {
  return {
    loading: false,
    totalWalletBalance:0, //全仓余额
    totalUnrealizedProfit:0, //未实现盈亏
    totalMarginBalance:0, //保证金
    popWindowContractRiskWarning: true, //合约账户未开通
    popWindowOpen:false,
  }
}
/*------------------------------ 生命周期 -------------------------------*/
root.created = function () {
  this.bianBalance()
}
root.mounted = function () {}
root.beforeDestroy = function () {}
/*------------------------------ 计算 -------------------------------*/
root.computed = {}
root.computed.serverTime = function () {
  return new Date().getTime();
}
//保证金余额换算成人民币的估值
root.computed.valuation = function () {
  return this.computedExchangeRate
}
//账户余额换算成人民币的估值
root.computed.valuationWall = function () {
  return this.computedTotalWalletBalance
}
//未实现盈亏换算成人民币的估值
root.computed.valuationFit = function () {
  return this.computedTotalUnrealizedProfit
}
// 计算汇率
root.computed.computedExchangeRate = function () {
  if (this.lang === 'CH') {
    if (this.totalMarginBalance) {
      return this.totalMarginBalance * this.$store.state.exchange_rate_dollar
    }
    return this.totalMarginBalance
  }
}
// 计算汇率
root.computed.computedTotalWalletBalance = function () {
  if (this.lang === 'CH') {
    if (this.totalWalletBalance) {
      return this.totalWalletBalance * this.$store.state.exchange_rate_dollar
    }
    return this.totalWalletBalance
  }
}
// 计算汇率
root.computed.computedTotalUnrealizedProfit = function () {
  if (this.lang === 'CH') {
    if (this.totalUnrealizedProfit) {
      return this.totalUnrealizedProfit * this.$store.state.exchange_rate_dollar
    }
    return this.totalUnrealizedProfit
  }
}
// 当前语言
root.computed.lang = function () {
  return this.$store.state.lang;
}
/*------------------------------ 观察 -------------------------------*/
root.watch = {}
/*------------------------------ 方法 -------------------------------*/
root.methods = {}
// root.methods.popWindowClose = function () {
//   this.popWindowOpen = false
// }
// 合约首次风险提示弹窗关闭确认按钮
root.methods.popCloseTemporarilyClosed = function () {
  this.popWindowOpen = false
  this.$router.push({'path':'/index/tradingHall?symbol=KK_USDT'})
}

root.methods.openAContract = function () {
  // this.popWindowOpen = false
  window.location.replace(this.$store.state.contract_url + 'index/tradingHall?symbol=KK_USDT');
}

// 资产
root.methods.bianBalance = function (item) {
  // console.log(item.id)
  this.$http.send("GET_BALAN_ACCOUNT", {
    bind: this,
    query: {
      timestamp: this.serverTime
    },
    callBack: this.re_bianBalance,
    errorHandler: this.error_bianBalance
  })
}

root.methods.re_bianBalance = function ( data ) {
  typeof (data) === 'string' && (data = JSON.parse(data))

  if (data.code == 1000) {
    this.popWindowOpen = true
  }

  // this.balance = data.data[0]
  // console.info('币安接口账户余额',this.balance)
  console.info('币安接口账户余额',data)
  this.totalWalletBalance = data.data.totalWalletBalance
  this.totalUnrealizedProfit = data.data.totalUnrealizedProfit
  this.totalMarginBalance = data.data.totalMarginBalance
}
root.methods.error_bianBalance = function ( err ) {
  console.log(err)
}

root.methods.popClose = function () {
  this.popOpen = false
}

/*---------------------- 保留小数 begin ---------------------*/
root.methods.toFixed = function (num, acc = 8) {
  return this.$globalFunc.accFixed(num, acc)
}
/*---------------------- 保留小数 end ---------------------*/


export default root
