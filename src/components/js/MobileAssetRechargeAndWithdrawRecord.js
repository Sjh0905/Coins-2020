const root = {}
root.name = 'MobileAssetRechargeAndWithdrawRecord'

root.props = {}


root.data = function () {
  return {
    // 选择的是充值记录还是提现记录 1为充值记录 2为提现记录 3为活动奖励
    openType: 1,
    // 显示loading true为显示loading
    loading: true,
    // 获取多少条消息
    recordsLimit: 10,
    withdrawsLimit: 10,
    limit: 10,
    // 获取的record
    records: [],
    // 是否Record获取ajax结果 默认为false
    ajaxRecordFlag: false,
    // 是否Withdraw获取ajax结果 默认为false
    ajaxWithdrawFlag: false,
    // 是否Record有数据 true为没有数据，显示没有数据
    isRecordFlag: false,

    // 是否第一次请求withdraw
    isFirstGetWithdrawFlag: true,

    // 是否withdraw有数据 true为没有数据，显示没有数据
    isWithdrawFlag: false,
    // 获取的withdraw
    withdraws: [],

    // 是否显示充值记录加载更多
    isShowGetMoreRecord: true,

    // 是否显示提现记录加载更多
    isShowGetMoreWithdraw: true,


    ActivityRecord:[], // 挖矿奖励
    EventRewards:[], // 活动奖励

    fundListLists:[], //基金奖励
    fundHeatReward:[], //基金奖励



    // 获取多少条消息
    capitalTransferLimit: 10,
    //是否Transfer获取ajax结果 默认为false
    ajaxCapitalTransferFlag:false,
    //划转记录
    capitalTransferLists:[],
    // 是否显示划转记录加载更多
    isShowGetMoreCapitalTransfer: true,

    // 获取多少条消息
    internalTransferLimit: 10,
    //是否Transfer获取ajax结果 默认为false
    ajaxInternalTransferFlag:false,
    //划转记录
    internalTransferLists:[],
    //月度返现
    monthlyCashBackLists:[],
    // 是否显示划转记录加载更多
    isShowGetMoreInternalTransfer: true,

    // 弹窗
    popOpen: false,
    popType: 0,
    popText: '系统繁忙',

    pageSize:30,
    lastId:0

  }
}

root.components = {
  'Loading': resolve => require(['../vue/Loading'], resolve),
  'PopupPrompt': resolve => require(['../vue/PopupPrompt'], resolve),
}

root.created = function () {

  // 修改顶部标题
  this.$store.commit('changeMobileHeaderTitle', '充提记录');

  // if(this.)
  this.changeOpenTypeQuery()
  // 获取record值
  // this.getRecord()
  // 获取withdraw值
  // this.getWithdraw()

}

root.computed = {}

root.computed.transferType = function () {
  return {
    'OTC_WALLET': '从法币到钱包',
    'WALLET_OTC':'从钱包到法币',
    'BINANCE_WALLET': '从现货到钱包',
    'WALLET_BINANCE': '从钱包到现货',
    'SPOTS_WALLET':'从现货到钱包',
    'WALLET_SPOTS':'从钱包到现货',
    'MARGIN_WALLET': '从杠杆到钱包',
    'WALLET_MARGIN': '从钱包到杠杆',
    'CONTRACTS_WALLET' : '从合约到钱包',
    'WALLET_CONTRACTS': '从钱包到合约',
    'PURCHASE': '申购',
  }
}

root.computed.computedRecord = function () {
  return this.records
}

root.computed.computedWithdraw = function () {
  return this.withdraws
}

// 挖矿奖励
root.computed.computedActivityRecord = function () {
  return this.ActivityRecord
}
// 活动奖励
root.computed.computedEventRewards = function () {
  return this.EventRewards
}

root.computed.computedCapitalTransfer = function () {
  return this.capitalTransferLists
}

root.computed.computedInternalTransfer = function () {
  return this.internalTransferLists
}

//月度奖励
// root.computed.computedmMnthlyCashBack = function () {
//   return this.monthlyCashBackLists
// }

// 获取userId
root.computed.userId = function () {
  return this.$store.state.authMessage.userId
}

root.methods = {}

root.methods.changeOpenTypeQuery = function () {
  // console.log('location',location.search.substr(1).split("=")[1])
  let num = this.$route.query.id || 1
  this.openType = num

  if(num == 1) {
    this.getRecord()
  }
  if (num == 2){
    this.getWithdraw()
  }
  if(num == 3) {
    this.getEventRewards()
  }
  if(num == 4) {
    this.getCapitalTransferList()
  }
  if(num == 5) {
    this.getInternalTransferList()
  }
  if(num == 6) {
    this.getRewardRecord()
  }
  if(num == 7) {
    this.getFundList()
  }
  if(num == 8) {
    this.getHeatReward()
  }
  if(num == 9) {
    this.monthlyCashBack()
  }

}

// 切换充值记录和提现记录头部
root.methods.changeOpenType = function(num){
  this.openType = num
  // console.log('this is store',this.$store.state.mobileHeaderTitle,this.$store.state.currencyChange)

  if(num === 1){
    this.$router.push({'path':'/index/mobileAsset/MobileAssetRechargeAndWithdrawRecord',query:{id:1}})
    this.$store.commit('changeMobileHeaderTitle', '');
    this.getRecord()
  }

  if(num===2){
    this.$router.push({'path':'/index/mobileAsset/MobileAssetRechargeAndWithdrawRecord',query:{id:2}})

    this.$store.commit('changeMobileHeaderTitle', '');
    // 获取withdraw值
    if(this.isFirstGetWithdrawFlag === true ){
      // console.log('进入此',this.isFirstGetWithdrawFlag)
      this.getWithdraw()
    }
    return
  }

  if(num === 3) {
    this.$router.push({'path':'/index/mobileAsset/MobileAssetRechargeAndWithdrawRecord',query:{id:3}})
    this.$store.commit('changeMobileHeaderTitle', '');
    this.getEventRewards()
  }

  if(num === 4) {
    this.$router.push({'path':'/index/mobileAsset/MobileAssetRechargeAndWithdrawRecord',query:{id:4}})
    this.$store.commit('changeMobileHeaderTitle', '');
    this.getCapitalTransferList()
  }

  if(num === 5) {
    this.$router.push({'path':'/index/mobileAsset/MobileAssetRechargeAndWithdrawRecord',query:{id:5}})
    this.$store.commit('changeMobileHeaderTitle', '');
    this.getInternalTransferList()
  }

  if(num === 6) {
    this.$router.push({'path':'/index/mobileAsset/MobileAssetRechargeAndWithdrawRecord',query:{id:6}})
    this.$store.commit('changeMobileHeaderTitle', '');
    this.getRewardRecord()
  }
  if(num === 7) {
    this.$router.push({'path':'/index/mobileAsset/MobileAssetRechargeAndWithdrawRecord',query:{id:7}})
    this.$store.commit('changeMobileHeaderTitle', '');
    this.getFundList()
  }
  if(num === 8) {
    this.$router.push({'path':'/index/mobileAsset/MobileAssetRechargeAndWithdrawRecord',query:{id:8}})
    this.$store.commit('changeMobileHeaderTitle', '');
    this.getHeatReward()
  }

  if(num === 9) {
    this.$router.push({'path':'/index/mobileAsset/MobileAssetRechargeAndWithdrawRecord',query:{id:9}})
    this.$store.commit('changeMobileHeaderTitle', '');
    this.monthlyCashBack()
  }

}

// 获取record值
root.methods.getRecord = function () {
  // if (currency) {
  //
  // }
  if (this.ajaxRecordFlag === true || this.isShowGetMoreRecord === false) {
    return
  }
  this.ajaxRecordFlag = true
  // this.loading = true
  // 充值查询
  // console.log('充值查询')
  this.$http.send("RECHARGE_LOG", {
    bind: this,
    params: {
      currency: '',
      limit: this.recordsLimit
    },
    callBack: this.re_getRecord,
    errorHandler: this.error_getRecord
  })
}
// 获取记录返回，类型为{}
root.methods.re_getRecord = function (data) {
  typeof data === 'string' && (data = JSON.parse(data))
  this.ajaxRecordFlag = false
  // console.log('充值记录',data)
  if (!data || data.dataMap.deposits.length === 0) {
    // if(this.ajaxRecordFlag === true){
      this.loading = false
    // }
    this.isRecordFlag = true
    return
  }
  // console.log('进入此步')
  if (data.dataMap.deposits.length < this.recordsLimit){
    this.isShowGetMoreRecord = false
  } else {
    this.recordsLimit += 10;
  }

  // console.warn('获取记录', data)
  this.records = data.dataMap.deposits

  // if(this.ajaxRecordFlag === true){
    this.loading = false
  // }
  this.isRecordFlag = false
}
// 获取记录出错
root.methods.error_getRecord = function (err) {
  this.ajaxRecordFlag = true
  this.isRecordFlag = true
  this.loading = false
  console.warn("充值获取记录出错！", err)
}


// 初始获取withdraw值
root.methods.getWithdraw = function () {
  if(this.ajaxWithdrawFlag === true){
    return;
  }
  this.ajaxWithdrawFlag = true
  // this.loading = true
  this.$http.send("WITHDRAWS_LOG", {
    bind: this,
    params: {
      currency:'',
      limit: this.withdrawsLimit
    },
    callBack: this.re_getWithdraw,
    errorHandler: this.error_getWithdraw
  })
}
// 获取记录返回，类型为{}
root.methods.re_getWithdraw = function (data) {
  typeof data === 'string' && (data = JSON.parse(data))
  // console.log('提现记录',data)
  this.ajaxWithdrawFlag = false
  this.isFirstGetWithdrawFlag = false
  if (!data || data.dataMap.requests.length === 0) {
    // console.log('data无',data)
    // if(this.ajaxWithdrawFlag === true){
      this.loading = false
    // }
    this.isWithdrawFlag = false
    return
  }

  if (data.dataMap.requests.length < this.withdrawsLimit){
    this.isShowGetMoreWithdraw = false
  } else {
    this.withdrawsLimit += 10;
  }

  // console.log('data有', data)
  this.withdraws = data.dataMap.requests

  // if(this.ajaxWithdrawFlag === true){
    this.loading = false
  // }
  this.isWithdrawFlag = true
}
// 获取记录出错
root.methods.error_getWithdraw = function (err) {
  this.isWithdrawFlag = true
  this.ajaxWithdrawFlag = true
  if(this.ajaxWithdrawFlag === true){
    this.loading = false
  }
}

// 获取挖矿奖励记录
root.methods.getRewardRecord = function () {
  if(this.ajaxWithdrawFlag === true){
    return;
  }
  this.ajaxWithdrawFlag = true
  this.$http.send('KK_ACTIVITYREWARDS', {
    bind: this,
    params: {
      rewardId:this.lastId,
      pageSize:this.pageSize
      // currentPage:this.selectIndex,
      // pageSize:this.pageSize
      // fromIndex: this.fromIndex,
      // toIndex: this.toIndex
    },
    callBack: this.re_getRewardRecord,
    errorHandler: this.error_getRewardRecord,
  })
}
// 获取挖矿奖励记录回调
root.methods.re_getRewardRecord = function (data) {
  typeof data === 'string' && (data = JSON.parse(data))
  // console.log('提现记录',data)
  this.ajaxWithdrawFlag = false
  this.isFirstGetWithdrawFlag = false
  if (!data || data.dataMap.kkActivityRewardList.length === 0) {
    // console.log('data无',data)
    // if(this.ajaxWithdrawFlag === true){
    this.loading = false
    // }
    this.isWithdrawFlag = false
    return
  }

  if (data.dataMap.kkActivityRewardList.length < this.pageSize){
    this.isShowGetMoreWithdraw = false
  } else {
    this.pageSize += 10;
  }

  // console.log('data有', data)
  this.ActivityRecord = data.dataMap.kkActivityRewardList

  // if(this.ajaxWithdrawFlag === true){
  this.loading = false
  // }
  this.isWithdrawFlag = true




  // typeof data === 'string' && (data = JSON.parse(data))
  // this.loading = false
  // this.firstLoad = true
  // this.loadingNext = false
  // console.warn('this is data', data)
  // if (data.errorCode) return
  // this.ActivityRecord = data.dataMap.grcActivityRewardList
  // this.size = data.dataMap.size
  // this.records.push(...this.records)
  // for (let i = 0; i < 8; i++) {
  //   this.records.push(this.records[0])
  // }
}
// 获取挖矿奖励记录出错
root.methods.error_getRewardRecord = function (err) {
  console.warn('获取平台奖励出错', err)
}


// 获取平台奖励记录
root.methods.getEventRewards = function () {
  if(this.ajaxWithdrawFlag === true){
    return;
  }
  this.ajaxWithdrawFlag = true
  this.$http.send('INITIAL_REWARD', {
    bind: this,
    // params: {
    //   rewardId:this.lastId,
    //   pageSize:this.pageSize
      // currentPage:this.selectIndex,
      // pageSize:this.pageSize
      // fromIndex: this.fromIndex,
      // toIndex: this.toIndex
    // },
    callBack: this.re_getEventRewards,
    errorHandler: this.error_getEventRewards,
  })
}
// 获取平台奖励记录回调
root.methods.re_getEventRewards = function (data) {
  typeof data === 'string' && (data = JSON.parse(data))
  // console.log('提现记录',data)
  this.ajaxWithdrawFlag = false
  this.isFirstGetWithdrawFlag = false
  if (!data || data.dataMap.registerInviteRewards.length === 0) {
    // console.log('data无',data)
    // if(this.ajaxWithdrawFlag === true){
    this.loading = false
    // }
    this.isWithdrawFlag = false
    return
  }

  if (data.dataMap.registerInviteRewards.length < this.pageSize){
    this.isShowGetMoreWithdraw = false
  } else {
    this.pageSize += 10;
  }

  // console.log('data有', data)
  this.EventRewards = data.dataMap.registerInviteRewards

  // if(this.ajaxWithdrawFlag === true){
  this.loading = false
  // }
  this.isWithdrawFlag = true




  // typeof data === 'string' && (data = JSON.parse(data))
  // this.loading = false
  // this.firstLoad = true
  // this.loadingNext = false
  // console.warn('this is data', data)
  // if (data.errorCode) return
  // this.ActivityRecord = data.dataMap.grcActivityRewardList
  // this.size = data.dataMap.size
  // this.records.push(...this.records)
  // for (let i = 0; i < 8; i++) {
  //   this.records.push(this.records[0])
  // }
}
// 获取平台奖励记录出错
root.methods.error_getEventRewards = function (err) {
  console.warn('获取平台奖励出错', err)
}

// 获取划转记录
root.methods.getCapitalTransferList = function () {
  if(this.ajaxCapitalTransferFlag === true){
    return;
  }
  this.ajaxCapitalTransferFlag = true

  this.$http.send("GET_TRANSFER_SPOT_LIST", {
    bind: this,
    query:{
      status:0,//默认0 全部，1 失败，2 成功
      currency:'',
      pageSize:this.capitalTransferLimit
    },
    callBack: this.re_getCapitalTransferList,
    errorHandler: this.error_getCapitalTransferList
  })
}
// 获取划转记录回调
root.methods.re_getCapitalTransferList = function (data) {
  // data = {
  //     "dataMap": {
  //     "userTransferRecordList": [
  //       {
  //         "amount": 40233881.602273375,
  //         "createdAt": 39774113.55728635,
  //         "currency": "USDT",
  //         "timestamp": "ut",
  //         "transferType": "consectetur elit voluptate non ullamco",
  //         "userId": -9238746.754895285,
  //         "id": -86783273.65578213,
  //         "status": "FAILED",
  //         "transferId": "20191123143701",
  //         "transferFrom": "",
  //         "transferTo": "WALLET",
  //         "updatedAt": 1578226647197,
  //         "version": -56367974.38596788
  //       },{
  //         "amount": 40233881.602273375,
  //         "createdAt": 39774113.55728635,
  //         "currency": "EOS",
  //         "timestamp": "ut",
  //         "transferType": "consectetur elit voluptate non ullamco",
  //         "userId": -9238746.754895285,
  //         "id": -86783273.65578213,
  //         "status": "FAILED",
  //         "transferId": "20191123143702",
  //         "transferFrom": "occaecat et irure dolor eiusmod",
  //         "transferTo": "SPOTS",
  //         "updatedAt": 1578226647197,
  //         "version": -56367974.38596788
  //       },{
  //         "amount": 40233881.602273375,
  //         "createdAt": 39774113.55728635,
  //         "currency": "ETH",
  //         "timestamp": "ut",
  //         "transferType": "consectetur elit voluptate non ullamco",
  //         "userId": -9238746.754895285,
  //         "id": -86783273.65578213,
  //         "status": "SUCCESS",
  //         "transferId": "20191123143703",
  //         "transferFrom": "",
  //         "transferTo": "WALLET",
  //         "updatedAt": 1578226647197,
  //         "version": -56367974.38596788
  //       }
  //     ]
  //   },
  //   "errorCode": 0,
  //   "result": "ut Ut mollit in fugiat"
  // }

  this.ajaxCapitalTransferFlag = false
  typeof data === 'string' && (data = JSON.parse(data))

  if (!data) return
  // console.log('获取划转记录', data)
  this.capitalTransferLists = data.dataMap.userTransferRecordList


  if (this.capitalTransferLists.length < this.capitalTransferLimit){
    this.isShowGetMoreCapitalTransfer = false
  } else {
    this.capitalTransferLimit += 10;
  }

  this.loading = false
}
// 获取划转记录出错
root.methods.error_getCapitalTransferList = function (err) {
  this.ajaxCapitalTransferFlag = true
  if(this.ajaxCapitalTransferFlag === true){
    this.loading = false
  }
  console.warn("转账获取记录出错！", err)
}

// 获取内部转账记录
root.methods.getInternalTransferList = function () {
  if(this.ajaxInternalTransferFlag === true){
    return;
  }
  this.ajaxInternalTransferFlag = true

  this.$http.send("GET_TRANSFER_LIST", {
    bind: this,
    query:{
      status:0,//0全部，1 失败，2 成功
      currency:'',
      type:'',//转账类型 0全部 1转账 2收款
      fromTime:'',//查询起始时间 时间戳
      toTime:'',//查询结束时间 时间戳
      pageSize:this.internalTransferLimit
    },
    callBack: this.re_getInternalTransferList,
    errorHandler: this.error_getInternalTransferList
  })
}
// 获取内部转账记录返回，类型为{}
root.methods.re_getInternalTransferList = function (data) {
  // data = {
  //   "dataMap": {
  //   "userTransferRecordList": [
  //     {
  //       "amount": 99102492.29972367,
  //       "createdAt": -67236617.9753992,//是毫秒
  //       "currency": "EOS",
  //       "dateTime": "do proident ex aute",
  //       "description": "ut consequat",
  //       "fee": 59822729.33552468,//还有手续费？×多余预留字段
  //       "flowType": "ipsum",
  //       "fromEmail": "proident",
  //       "fromUserId": 100002,
  //       "id": 19424641.65654689,
  //       "name": "jack",
  //       "status": "SUCCESS",
  //       "toEmail": "enim pariatur",
  //       "toUserId": 17017505.532742217,
  //       "transferId": "20200123143701",
  //       "updatedAt": 1578226647197,
  //       "version": 44518193.95575386
  //     },
  //     {
  //       "amount": 38305184.36958821,
  //       "createdAt": 50407408.0127503,
  //       "currency": "USDT",
  //       "dateTime": "ut eu aliqua nisi",
  //       "description": "velit proident",
  //       "fee": 5515030.240045607,
  //       "flowType": "eiusmod exercitation est culpa mollit",
  //       "fromEmail": "dolore proident adipisicing",
  //       "fromUserId": 10003,
  //       "id": 98574061.35561192,
  //       "name": "tom",
  //       "status": "FAILED",
  //       "toEmail": "aute reprehenderit",
  //       "toUserId": -61289931.75798434,
  //       "transferId": "20200123143702",
  //       "updatedAt": 1578208180984,
  //       "version": 16172230.43511355
  //     }
  //   ]
  // },
  //   "errorCode": -44435161.791536435,
  //   "result": "ut"
  // }

  this.ajaxInternalTransferFlag = false
  typeof data === 'string' && (data = JSON.parse(data))
  if (!data) return
  // console.log('获取内部转账记录', data)
  this.internalTransferLists = data.dataMap.userTransferRecordList

  if (this.internalTransferLists.length < this.internalTransferLimit){
    this.isShowGetMoreInternalTransfer = false
  } else {
    this.internalTransferLimit += 10;
  }

  this.loading = false
}
// 获取记录出错
root.methods.error_getInternalTransferList = function (err) {
  console.warn("转账获取记录出错！", err)
  this.ajaxInternalTransferFlag = true
  if(this.ajaxInternalTransferFlag === true){
    this.loading = false
  }
}


// 获取理财记录
root.methods.getFundList = function () {
  if(this.ajaxInternalTransferFlag === true){
    return;
  }
  this.ajaxInternalTransferFlag = true

  this.$http.send("FUND_RECORDS_LISTS", {
    bind: this,
    callBack: this.re_getFundList,
    errorHandler: this.error_getFundList
  })
}
// 获取理财记录返回，类型为{}
root.methods.re_getFundList = function (data) {
  this.ajaxInternalTransferFlag = false
  typeof data === 'string' && (data = JSON.parse(data))
  if (!data) return
  this.fundListLists = data.dataMap.list

  if (this.fundListLists.length < this.fundListLists){
    this.isShowGetMoreInternalTransfer = false
  } else {
    this.internalTransferLimit += 10;
  }

  this.loading = false
}
// 获取理财记录出错
root.methods.error_getFundList = function (err) {
  console.warn("转账获取记录出错！", err)
  this.ajaxInternalTransferFlag = true
  if(this.ajaxInternalTransferFlag === true){
    this.loading = false
  }
}

// 点击跳转充值详情页
root.methods.toRechargeDetailPath = function (type) {
  // console.log(123123123,type)
  this.$store.commit('changeMobileRechargeRecordData',type)
  this.$router.push("/index/mobileAsset/mobileAssetRechargeRecordDetail/")
}
// 点击跳转提现详情页
root.methods.toWithdrawDetailPath = function (type) {
  this.$store.commit('changeMobileRechargeRecordData',type)
  this.$router.push("/index/mobileAsset/mobileAssetWithdrawRecordDetail/")
}

// 点击跳转挖矿奖励详情页
root.methods.toRewardDetailPath = function (item) {
  this.$store.commit('changeMobileRechargeRecordData',item)
  this.$router.push("/index/mobileAsset/mobileAssetRewardRecordDetail/")
}


// 点击跳转奖励详情页
root.methods.toEventRewardsRecordPath = function (item) {
  this.$store.commit('changeMobileRechargeRecordData',item)
  this.$router.push("/index/mobileAsset/mobileAssetEventRewardsRecordDetail/")
}

// 点击跳进划转详情页
root.methods.toCapitalTransferDetailPath = function (item) {
  this.$store.commit('changeMobileRechargeRecordData',item)
  this.$router.push("/index/mobileAsset/mobileAssetCapitalTransferRecordDetail/")
}
// 点击跳进内部转账详情页
root.methods.toInternalTransferDetailPath = function (item) {
  this.$store.commit('changeMobileRechargeRecordData',item)
  this.$router.push("/index/mobileAsset/mobileAssetInternalTransferRecordDetail/")
}
// 点击跳进基金详情页
root.methods.tofundDetailsPath = function (item) {
  this.$store.commit('changeMobileRechargeRecordData',item)
  this.$router.push("/index/mobileAsset/mobileAssetInternalTransferRecordDetail/?openType=7")
}
// 点击跳进基金详情页
root.methods.tofundDetailsPath1 = function (item) {
  this.$store.commit('changeMobileRechargeRecordData',item)
  this.$router.push("/index/mobileAsset/mobileAssetInternalTransferRecordDetail/?openType=8")
}
// 点击跳进基金详情页
root.methods.monthlyDetailsPath = function (item) {
  this.$store.commit('changeMobileRechargeRecordData',item)
  this.$router.push("/index/mobileAsset/mobileAssetInternalTransferRecordDetail/?openType=9")
}
// 获取周热度记录
root.methods.getHeatReward = function (limit) {
  this.$http.send('GET_HEATREWARD', {
    bind: this,
    callBack: this.re_getHeatReward,
    errorHandler: this.error_getHeatReward,
  })
}
// 获取周热度记录回调
root.methods.re_getHeatReward = function (data) {
  typeof data === 'string' && (data = JSON.parse(data))
  this.loading = false
  this.firstLoad = true
  this.loadingNext = false
  // console.log('this is data', data.dataMap.lists)
  if (data.errorCode) return

  this.fundHeatReward = data.dataMap.lists
  this.fundHeatReward.length < this.limit && (this.loadingMoreShow = false)
  this.fundHeatReward.length >= this.limit && (this.loadingMoreShow = true)
  this.loadingMoreShowing = false
  this.loading = false
  // this.page_size = data.dataMap.size   // 总页数
}
// 获取周热度记录出错
root.methods.error_getHeatReward = function (err) {
  console.warn('获取平台奖励出错', err)
}

// 获取阅读返现记录
root.methods.monthlyCashBack = function (limit) {
  this.$http.send('GET_PURCHASE', {
    bind: this,
    callBack: this.re_monthlyCashBack,
    errorHandler: this.error_monthlyCashBack,
  })
}
// 获取周热度记录回调
root.methods.re_monthlyCashBack = function (data) {
  typeof data === 'string' && (data = JSON.parse(data))
  this.loading = false
  this.firstLoad = true
  this.loadingNext = false
  // console.log('this is data', data.dataMap.lists)
  if (data.errorCode) return

  this.monthlyCashBackLists = data.dataMap.lists
  console.info('阅读返现',this.monthlyCashBackLists)
  // // this.rewCycle = this.fundListLists.rewCycle.split('_')
  // this.fundListLists.map(v=>{
  //   let rewCycleSplit = v.rewCycle.split('_');
  //   this.rewSplit = rewCycleSplit[0]
  //   this.rewTow = rewCycleSplit[1]
  // })
  // this.fundListLists.length < this.limit && (this.loadingMoreShow = false)
  // this.fundListLists.length >= this.limit && (this.loadingMoreShow = true)
  // this.loadingMoreShowing = false
  this.loading = false
  // this.page_size = data.dataMap.size   // 总页数
}
// 获取周热度记录出错
root.methods.error_monthlyCashBack = function (err) {
  console.warn('获取平台奖励出错', err)
}


// 关闭pop提示
root.methods.popClose = function () {
  this.popOpen = false
}

// 保留小数点后8位
root.methods.toFixed = function (num, acc = 8) {
  return this.$globalFunc.accFixed(num, acc)
}


// 状态
root.methods.state = function (item) {

  let msg = ''

  switch (item.status) {
    case 'DONE':
      msg = '等待区块确认' + `(${item.confirms}/${item.minimumConfirms})`
      break;
    case 'DEPOSITED':
      msg = '充值成功'
      break;
    case 'CANCELLED':
      msg = '废弃区块'
      break;
    case 'WAITING_FOR_APPROVAL':
      msg = '等待审核'
      break;
    case 'DENIED':
      msg = '审核未通过'
      break;
    default:
      msg = '---'
  }

  return msg
}



export default root
