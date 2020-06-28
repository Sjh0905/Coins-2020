const root = {}
root.name = 'propertyAssets'
/*------------------------------ 组件 ------------------------------*/
root.components = {
  'Loading': resolve => require(['../../vue/Loading'], resolve),
  'PopupT': resolve => require(['../../vue/PopupT'], resolve),
  'PopupPrompt': resolve => require(['../../vue/PopupPrompt'], resolve),
}
/*------------------------------ data -------------------------------*/
root.data = function () {
  return {
    loading: false,

    limit: 10,
    limitNum: 10,

    records: [],

    loadingMoreShow: true,
    loadingMoreShowing: false,

    popType: 0,
    popText: '',
    popOpen: false,
    // 内部划转变量
    popWindowOpen1:false,
    assetAccountType:'wallet',//当前账户类型,默认显示币币账户
    // bibiAccount:'币币账户',
    // account:'我的钱包',
    itemInfo:{
      currency:''
    },

    currencyValue:'',// 输入框币种信息
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

  }
}
/*------------------------------ 生命周期 -------------------------------*/
root.created = function () {

}
root.mounted = function () {}
root.beforeDestroy = function () {}



/*------------------------------ 计算 -------------------------------*/
root.computed = {}

root.computed.computedRecord = function () {
  return this.records = [
    {
      id:'12',
      currency:'232323',
      amount:'99999',
      updatedAt:'990090'
    }
  ]
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
/*------------------------------ 观察 -------------------------------*/
// 监听
root.watch = {}
// 监听vuex中的变化
// root.watch.currencyChange = function (newVal, oldVal) {
//
//   // let accounts = [...this.$store.state.currency.values()];
//   let otcAccounts = [];
//   this.otcCurrencyList.map(v=>{
//     let item = this.$store.state.currency.get(v.currency);
//     otcAccounts.push(item)
//   })
//   this.accounts = otcAccounts
//   console.log('this.accounts zpy============== ',this.accounts)
// }
root.watch.loading = function (newVal, oldVal) {
  if (oldVal && !newVal) {
    if (this.$route.query.symbol) {
      let currencyArr = [...this.$store.state.currency.values()]
      for (let i = 0; i < currencyArr.length; i++) {
        if (this.$route.query.symbol === currencyArr[i].currency) {
          this.openRecharge(i)
          return
        }
      }
    }
  }
}
/*------------------------------ 方法 -------------------------------*/
root.methods = {}

// 划转弹窗关闭
root.methods.popWindowClose1 = function () {
  // this.popWindowOpen1 = false
  this.click_rel_em()
}
// 关闭划转弹窗
root.methods.click_rel_em = function () {
  this.popWindowOpen1 = false
}


// 划转
root.methods.unLockHouse = function (item) {
  this.popWindowOpen1 = true
}

// 关闭toast弹窗
root.methods.closePopupPrompt = function () {
  this.popupPromptOpen = false
}
// 点击全提
root.methods.allMention = function () {
  if( this.assetAccountType == 'wallet'){
    this.amountInput = this.transferCurrencyOTCAvailable
    return
  }
  this.amountInput = this.transferCurrencyAvailable
}

root.methods.changeTransferCurrency = function (currency){
  console.log('changeTransferCurrency==============',currency)
  // this.itemInfo = val
  this.transferCurrencyAvailable = this.transferCurrencyObj[currency].available || 0;
}

// 计算后的accounts，排序、筛选之类的放在这里！
// root.computed.accountsComputed = function () {
//   // 特殊处理
//   if (this.hideZeroAsset) {
//     return this.accounts.filter((val,inx) => {
//       val.currencyKey = val.currency+'-'+inx;
//
//       // this.transferCurrencyObj[val.currency] = val;
//       return val.total !== 0
//     })
//   }
//
//   this.accounts.map((val,inx) => {
//     val.currencyKey = val.currency+'-'+inx;
//   })
//   return this.accounts
// }

root.methods.openTransfer = function (index, item) {

  // 如果没有实名认证不允许打开划转
  if (!this.bindIdentify) {
    this.popWindowTitle = this.$t('popWindowTitleTransfer')
    this.popWindowPrompt = this.$t('popWindowPromptWithdrawals')
    this.popWindowStyle = '0'
    this.popWindowOpen = true
    return
  }

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

  // 法币可用余额
  this.transferCurrencyOTCAvailable = item.otcAvailable
  // 我的钱包可用余额
  this.transferCurrencyAvailable = item.available
  this.itemInfo = item
  this.currencyValue = this.itemInfo.currency
  // 再次打开清空输入框
  this.amountInput = ''
  this.transferAmountWA = ''

}

// root.methods.re_unLockHouse = function ( data ) {
//   typeof (data) === 'string' && (data = JSON.parse(data))
//   this.popOpen = true
//   if(data.errorCode){
//     if(data.errorCode == 1 ) {
//       this.popType = 0
//       this.popText = this.$t('unLockTips')
//       return
//     }
//     if(data.errorCode == 2 ) {
//       this.popType = 0
//       this.popText = this.$t('unLockTips_1')
//       return
//     }
//     if(data.errorCode == 3 ) {
//       this.popType = 0
//       this.popText = this.$t('unLockTips_2')
//       return
//     }
//     if(data.errorCode == 4 ) {
//       this.popType = 0
//       this.popText = this.$t('unLockTips_3')
//       return
//     }
//     if(data.errorCode == 5 ) {
//       this.popType = 0
//       this.popText = this.$t('unLockTips_4')
//       return
//     }
//
//     this.popType = 0
//     this.popText = this.$t('unLockTips_3')
//     return
//   }
//   if(data.result == 'SUCCESS') {
//     this.popType = 1
//     this.popText = this.$t('lockSuccess')
//     this.$eventBus.notify({key: 'UN_LOCK'})
//     this.getLockCur()
//     return
//   }
//
//   // console.log(data)
// }
// root.methods.error_unLockHouse = function ( err ) {
//   console.log(err)
// }

// 获取锁仓记录
root.methods.getLockCur = function () {
  // if (currency) {
  //
  // }
  this.$http.send("", {
    bind: this,
    query: {

      // currency: '',
      // limit: this.limit
    },
    callBack: this.re_getLockCur,
    errorHandler: this.error_getLockCur
  })
}
// 获取记录返回，类型为{}
root.methods.re_getLockCur = function (data) {
  typeof data === 'string' && (data = JSON.parse(data))
  if (!data) return
  console.log('获取记录', data)
  this.records = data

  if (this.records.length < this.limit) {
    this.loadingMoreShow = false
  }
  this.loadingMoreShowing = false
  // this.loading = false
}
// 获取记录出错
root.methods.error_getLockCur = function (err) {
  console.warn("充值获取记录出错！", err)
}

root.methods.loadingMore = function () {
  this.limit += this.limitNum
  this.loadingMoreShowing = true
  this.getLockCur()
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
