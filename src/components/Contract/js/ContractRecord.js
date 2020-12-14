const root = {}
root.name = 'contractRecord'
/*------------------------------ 组件 ------------------------------*/
root.components = {
  'Loading': resolve => require(['../../vue/Loading'], resolve),
  // 'PopupPrompt': resolve => require(['../../vue/PopupPrompt'], resolve),
  'PopupWindow': resolve => require(['../../vue/PopupWindow'], resolve),
  'ContractRiskWarning': resolve => require(['../../vue/ContractRiskWarning'], resolve),
  'PopupT': resolve => require(['../../vue/PopupT'], resolve),
  'PopupPrompt': resolve => require(['../../vue/PopupPrompt'], resolve),

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
    propertyType:'position',
    limit: 10,
    limitNum: 10,

    records: [],
    records1C:[],
    records1:[],

    loadingMoreShow: true,
    loadingMoreShowing: false,

    popType: 0,
    popText: '',
    popOpen: false,

    // 内部划转变量
    popWindowOpen1:false,
    popWindowOpenContract:false,
    assetAccountType:'wallet',//当前账户类型,默认显示币币账户
    itemInfo:{
      currency:''
    },

    currencyValue:'USDT',// 输入框币种信息
    transferCurrencyWA:'',// 币种错误提示
    amountInput:'',// 输入框划转的数量
    transferAmountWA:'',// 数量错误提示
    transferCurrencyAvailable:0,  //我的钱包可用余额
    transferCurrencyOTCAvailable:0, //法币账户可用余额
    transferCurrencyObj:{},
    sending:false,

    popWindowTitle: '', //弹出提示标题
    popWindowPrompt: '',//弹出样式提示
    popWindowStyle: 0,//跳转 0表示实名认证，1表示手机或谷歌，2只有确定

    // toast提示
    popupPromptOpen: false,
    popupPromptType: 0,
    popupPromptText: '',
    balance:[],
    accounts:[],
    hideZeroAsset: false, //隐藏零资产币种

    otcCurrencyList:[],
    contractSymbolArr:['BTCUSDT','ETHUSDT'], //合约展示币对


  }
}
/*------------------------------ 生命周期 -------------------------------*/
root.created = function () {
  this.bianBalance()
  this.getPositionRisk()
  this.currentInterval1 && clearInterval(this.currentInterval1)
  this.currentInterval1 = setInterval(this.bianBalance, 8000)
  this.GET_AUTH_STATE()
  this.getCurrency()
  if (this.$route.query.propertyType == 'propertyAssets') {
    this.propertyType = 'propertyAssets';
    this.popWindowOpen1 = true
  }
}
root.mounted = function () {}
root.beforeDestroy = function () {
  this.currentInterval1 && clearInterval(this.currentInterval1)
}
/*------------------------------ 计算 -------------------------------*/
root.computed = {}

// 判断是否是手机
root.computed.isMobile = function () {
  return this.$store.state.isMobile
}

root.computed.serverTime = function () {
  return new Date().getTime();
}
root.computed.computedRecord = function () {
  return this.records1C || []
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


// 账户可用
root.computed.available = function () {
  let available = 0
  for (let i = 0; i < this.accounts.length; i++) {
    available = this.accAdd(available, this.accounts[i].available)
    // console.info(this.accounts[i].rate)
  }
  return this.toFixed(available)
}

root.computed.currencyChange = function () {
  return this.$store.state.currencyChange
}
root.computed.computedRecord1 = function () {
  return this.records
}
// 计算后的accounts，排序、筛选之类的放在这里！
root.computed.accountsComputed = function () {
  // // 特殊处理
  if (this.hideZeroAsset) {
    return this.accounts.filter((val,inx) => {
      val.currencyKey = val.currency+'-'+inx;
      return val.total !== 0
    })
  }
  this.accounts.map((val,inx) => {
    val.currencyKey = val.currency+'-'+inx;
  })


  return this.accounts
}
// 是否绑定手机
root.computed.bindMobile = function () {
  return this.$store.state.authState && this.$store.state.authState.sms || false
}
// 是否绑定谷歌验证码
root.computed.bindGA = function () {
  return this.$store.state.authState && this.$store.state.authState.ga || false
}
// 是否绑定邮箱
root.computed.bindEmail = function () {
  return this.$store.state.authState && this.$store.state.authState.email || false
}
// 是否实名认证
root.computed.bindIdentify = function () {
  return this.$store.state.authState && this.$store.state.authState.identity || false
}
// 当前语言
root.computed.lang = function () {
  return this.$store.state.lang;
}
/*------------------------------ 观察 -------------------------------*/
root.watch = {}

// 监听vuex中的变化
root.watch.currencyChange = function (newVal, oldVal) {

  let otcAccounts = [];
  this.otcCurrencyList.map(v=>{
    let item = this.$store.state.currency.get(v.currency);
    otcAccounts.push(item)
  })
  this.accounts = otcAccounts
  // console.log('this.accounts zpy============== ',this.accounts)
}

/*------------------------------ 方法 -------------------------------*/
root.methods = {}
root.methods.clickProperty = function (type) {
  this.propertyType = type
  if (this.propertyType=='propertyAssets') {
    this.bianBalance()
  }
}
// 合约首次风险提示弹窗关闭确认按钮
root.methods.popCloseTemporarilyClosed = function () {
  this.popWindowOpenContract = false
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
    this.popWindowOpenContract = true
  }

  // this.balance = data.data[0]
  // console.info('币安接口账户余额',this.balance)
  // console.info('币安接口账户余额',data)
  this.totalWalletBalance = data.data.totalWalletBalance
  this.totalUnrealizedProfit = data.data.totalUnrealizedProfit
  this.totalMarginBalance = data.data.totalMarginBalance
  this.balance = data.data.assets[0]
}
root.methods.error_bianBalance = function ( err ) {
  console.log(err)
}

root.methods.popClose = function () {
  this.popOpen = false
}



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
  // console.log('获取记录', data)
  this.records = data.data
  let aa = []
  this.records.map((v,index)=>{
    if (v.positionAmt != 0 && this.contractSymbolArr.includes(v.symbol)) {
      aa.push(v)
    }
  })
  this.records1C = aa

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

root.methods.goToContractTransaction = function (item) {
  // window.location.replace(this.$store.state.domain_url + 'index/sign/login?ani=1&toUrl=c2c_url');
  // window.location.replace(process.env.CONTRACT_URL +'index/tradingHall?symbol=BTC_USDT');
  let symbol = item.symbol
  window.location.replace(this.$store.state.contract_url + 'index/tradingHall?symbol=' + symbol);

}

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

/*---------------------- 账户余额 begin ---------------------*/
root.methods.closeAccountBalance1= function () {
  $(".currencyer-header-box1").attr("style","display:none");
}
root.methods.openAccountBalance1 = function () {
  $(".currencyer-header-box1").attr("style","display:block");
}
/*---------------------- 账户余额 end ---------------------*/
/*---------------------- 未实现盈亏 begin ---------------------*/
root.methods.closeUnrealizedLooses1= function () {
  $(".detail-header-box1").attr("style","display:none");
}
root.methods.openUnrealizedLooses1 = function () {
  $(".detail-header-box1").attr("style","display:block");
}
/*---------------------- 未实现盈亏 end ---------------------*/
/*---------------------- 未实现盈亏 begin ---------------------*/
root.methods.closeAvailableOrderBalance1= function () {
  $(".lock-house-time-box1").attr("style","display:none");
}
root.methods.openAvailableOrderBalance1 = function () {
  $(".lock-house-time-box1").attr("style","display:block");
}
/*---------------------- 未实现盈亏 end ---------------------*/

// 划转弹窗关闭
root.methods.popWindowClose1 = function () {
  // this.popWindowOpen1 = false
  this.click_rel_em()
}
// 划转弹窗关闭
root.methods.popWindowClose = function () {
  // this.popWindowOpen1 = false
  this.popWindowOpen = false
}
// 关闭划转弹窗
root.methods.click_rel_em = function () {
  this.popWindowOpen1 = false
}


// 关闭toast弹窗
root.methods.closePopupPrompt = function () {
  this.popupPromptOpen = false
}
//切换我的钱包和币币账户
root.methods.changeAssetAccountType = function () {
  this.assetAccountType = this.assetAccountType == 'wallet' ? 'currency':'wallet'
}
// 点击全提
root.methods.allMention = function () {
  if( this.assetAccountType == 'wallet'){
    this.amountInput = this.balance.walletBalance
    return
  }
  this.amountInput = this.available
}


// 获取币种
root.methods.getCurrency = async function () {
  this.$http.send('GET_OTC_CURRENCY', {
    bind: this,
    callBack: this.re_getCurrency,
    errorHandler: this.error_getCurrency,
  })
}
// 获取币种的状态
root.methods.re_getCurrency = function (data) {
  typeof (data) === 'string' && (data = JSON.parse(data))
  if (!data) {
    return
  }
  // console.info('data====',data)
  this.otcCurrencyList = data;
  // this.$store.commit('CHANGE_CURRENCY', data)
  this.getAccounts()
}
// 获取币种失败
root.methods.error_getCurrency = function (err) {
}

root.methods.changeTransferCurrency = function (currency){
  // console.log('changeTransferCurrency==============',currency)
  // this.itemInfo = val
  this.transferCurrencyAvailable = this.transferCurrencyObj[currency].available || 0;
}

root.methods.openTransfer = function (balance) {

  // 如果没有实名认证不允许打开划转
  // if (!this.bindIdentify) {
  //   this.popWindowTitle = this.$t('popWindowTitleTransfer')
  //   this.popWindowPrompt = this.$t('popWindowPromptWithdrawals')
  //   this.popWindowStyle = '0'
  //   this.popWindowOpen = true
  //   return
  // }

  // 如果没有绑定邮箱，不允许打开划转
  if (!this.bindEmail) {
    this.popWindowTitle = this.$t('bind_email_pop_title')
    this.popWindowPrompt = this.$t('bind_email_pop_article')
    this.popWindowStyle = '3'
    this.popWindowOpen = true
    return
  }

  // 如果没有绑定谷歌或手机，不允许打开划转
  if (!this.bindGA && !this.bindMobile) {
    this.popWindowTitle = this.$t('popWindowTitleTransfer')
    this.popWindowPrompt = this.$t('popWindowTitleBindGaWithdrawals')
    this.popWindowStyle = '1'
    this.popWindowOpen = true
    return
  }


  //todo 修改密码后不能提现

  this.popWindowOpen1 = true

  // 合约可用余额
  this.transferCurrencyOTCAvailable = balance.walletBalance
  // 我的钱包可用余额
  // this.transferCurrencyAvailable = item.available
  // this.itemInfo = item
  this.currencyValue = balance.asset
  // 再次打开清空输入框
  this.amountInput = ''
  this.transferAmountWA = ''

}
// 弹出绑定身份，跳转到实名认证界面
root.methods.goToBindIdentity = function () {
  this.popWindowOpen = false
  this.$router.push({name: 'authenticate'})
}
// 弹框跳安全中心
root.methods.goToSecurityCenter = function () {
  this.popWindowOpen = false
  this.$router.push({name: 'securityCenter'})
}

// // 资产
// root.methods.bianBalance = function (item) {
//   this.loading = true
//   this.$http.send("GET_BALAN_ACCOUNT", {
//     bind: this,
//     query: {
//       timestamp: this.serverTime
//     },
//     callBack: this.re_bianBalance,
//     errorHandler: this.error_bianBalance
//   })
// }
//
// root.methods.re_bianBalance = function ( data ) {
//   typeof (data) === 'string' && (data = JSON.parse(data))
//   this.loading = false
//   this.balance = data.data.assets[0]
// }
// root.methods.error_bianBalance = function ( err ) {
//   // console.log(err)
// }

// 判断划转数量
root.methods.testTransferAmount  = function () {
  if (this.$globalFunc.testSpecial(this.amountInput)) {
    this.transferAmountWA = this.$t('请输入数字')
    return false
  }

  if(this.assetAccountType == ' currency'){
    if (Number(this.amountInput) > Number(this.transferCurrencyAvailable)) {
      this.transferAmountWA = this.$t('超出划转可用余额11')
      return false
    }
    return true
  }
  if(this.assetAccountType == 'wallet'){
    if (Number(this.amountInput) > Number(this.balance.walletBalance)) {
      this.transferAmountWA = this.$t('超出划转可用余额')
      return false
    }
    return true
  }

  if (Number(this.amountInput) <= 0) {
    this.amountInput = 0
    this.transferAmountWA = this.$t('低于划转最小额')
    return false
  }
  return true
}

// 可以提交
root.methods.canCommit = function () {
  let canSend = true
  canSend = this.testTransferAmount() && canSend
  if (this.currencyValue === '') {
    this.transferCurrencyWA = this.$t('请输入币种信息')
    return canSend = false
  }
  if (this.amountInput === '') {
    this.transferAmountWA = this.$t('请输入划转数量')
    return canSend = false
  }
  return canSend
}
// 划转提交
root.methods.transferCommit = function () {

  if (this.sending) return
  if (!this.canCommit()) {
    return
  }

  this.sending = true
  this.$http.send('GET_BALAN_FUTURE', {
    bind: this,
    params: {
      currency: this.currencyValue,
      amount: this.amountInput,
      transferFrom: this.assetAccountType == 'wallet' ? 'CONTRACTS':'WALLET',
      transferTo: this.assetAccountType != 'wallet' ? 'CONTRACTS':'WALLET'
    },
    callBack: this.re_transferCommit,
    errorHandler: this.error_transferCommit
  })
}
// 划转回调
root.methods.re_transferCommit = function (data){
  // console.log('发送成功====================')
  this.sending = false
  typeof data === 'string' && (data = JSON.parse(data))
  // console.log(data.errorCode)

  this.popupPromptOpen = true
  this.popupPromptType = 0

  if( data.errorCode ){
    data.errorCode == 1 &&  (this.popupPromptText = '用户未登录')
    data.errorCode == 2 &&  (this.popupPromptText = '数量错误')
    data.errorCode == 3 &&  (this.popupPromptText = '系统账户不存在')
    data.errorCode == 4 &&  (this.popupPromptText = '用户无权限')
    data.errorCode == 5 &&  (this.popupPromptText = '余额不足')
    data.errorCode == 6 &&  (this.popupPromptText = '您可能存在挂单或仓位，不支持资金划转')
  }
  if(data.errorCode == 0) {
    this.popupPromptText = '划转成功'
    this.popupPromptType = 1
    setTimeout(() => {
      this.popupPromptOpen = true
    }, 1000)
  }
  this.popWindowOpen1 = false
}
//划转错误回调
root.methods.error_transferCommit = function (err){
  console.log(err)
  this.sending = false
}



root.methods.popClose = function () {
  this.popOpen = false
}

// //获取账户信息
root.methods.getAccounts = function () {
  // 请求各项估值
  this.$http.send('RECHARGE_AND_WITHDRAWALS_RECORD', {
    bind: this,
    callBack: this.re_getAccount,
    errorHandler: this.error_getAccount
  })
}
// 获取账户信息回调
root.methods.re_getAccount = function (data) {
  typeof (data) === 'string' && (data = JSON.parse(data))
  if (!data || !data.accounts) {
    return
  }
  this.$store.commit('CHANGE_ACCOUNT', data.accounts)
}
// 获取账户信息失败
root.methods.error_getAccount = function (err) {
  // console.warn("获取账户内容失败", err)
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
  num1 = parseFloat(num1)
  num2 = parseFloat(num2)
  return this.$globalFunc.accAdd(num1, num2)
}

/*---------------------- 加法运算 end ---------------------*/


export default root
