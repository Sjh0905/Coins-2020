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


    ActivityRecord:[],

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

root.computed.computedRecord = function () {
  return this.records
}

root.computed.computedWithdraw = function () {
  return this.withdraws
}

root.computed.computedActivityRecord = function () {
  return this.ActivityRecord
}

// 获取userId
root.computed.userId = function () {
  return this.$store.state.authMessage.userId
}

root.methods = {}

root.methods.changeOpenTypeQuery = function () {
  // console.log('location',location.search.substr(1).split("=")[1])
  let num = this.$route.query.id || 1

  if (num == 2){
    this.openType = 2
    this.getWithdraw()
  }
  if(num == 1) {
    this.openType = 1
    this.getRecord()
  }
  if(num == 3) {
    this.openType = 3
    // this.getRecord()
    this.getRewardRecord()
  }

}

// 切换充值记录和提现记录头部
root.methods.changeOpenType = function(num){
  this.openType = num
  // console.log('this is store',this.$store.state.mobileHeaderTitle,this.$store.state.currencyChange)

  if(num===2){
    this.$router.push({'path':'/index/mobileAsset/MobileAssetRechargeAndWithdrawRecord',query:{id:2}})
    this.$store.commit('changeMobileHeaderTitle', '充提记录');

    // 获取withdraw值
    if(this.isFirstGetWithdrawFlag === true ){
      console.log('进入此',this.isFirstGetWithdrawFlag)
      this.getWithdraw()
    }
    return
  }
  if(num === 3) {
    this.$router.push({'path':'/index/mobileAsset/MobileAssetRechargeAndWithdrawRecord',query:{id:3}})
    this.$store.commit('changeMobileHeaderTitle', '充提记录');
    this.getRewardRecord()
  }

  if(num === 1){
    this.$router.push({'path':'/index/mobileAsset/MobileAssetRechargeAndWithdrawRecord',query:{id:1}})
    this.$store.commit('changeMobileHeaderTitle', '充提记录');
    this.getRecord()
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

  console.log('data有', data)
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



// 获取平台奖励记录
root.methods.getRewardRecord = function () {
  if(this.ajaxWithdrawFlag === true){
    return;
  }
  this.ajaxWithdrawFlag = true
  this.$http.send('GRC_ACTIVITYREWARDS', {
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
// 获取平台奖励记录回调
root.methods.re_getRewardRecord = function (data) {
  typeof data === 'string' && (data = JSON.parse(data))
  // console.log('提现记录',data)
  this.ajaxWithdrawFlag = false
  this.isFirstGetWithdrawFlag = false
  if (!data || data.dataMap.grcActivityRewardList.length === 0) {
    // console.log('data无',data)
    // if(this.ajaxWithdrawFlag === true){
    this.loading = false
    // }
    this.isWithdrawFlag = false
    return
  }

  if (data.dataMap.grcActivityRewardList.length < this.pageSize){
    this.isShowGetMoreWithdraw = false
  } else {
    this.pageSize += 10;
  }

  console.log('data有', data)
  this.ActivityRecord = data.dataMap.grcActivityRewardList

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
root.methods.error_getRewardRecord = function (err) {
  console.warn('获取平台奖励出错', err)
}



// 点击跳转充值详情页
root.methods.toRechargeDetailPath = function (type) {
  console.log(123123123,type)
  this.$store.commit('changeMobileRechargeRecordData',type)
  this.$router.push("/index/mobileAsset/mobileAssetRechargeRecordDetail/")
}
// 点击跳转提现详情页
root.methods.toWithdrawDetailPath = function (type) {
  this.$store.commit('changeMobileRechargeRecordData',type)
  this.$router.push("/index/mobileAsset/mobileAssetWithdrawRecordDetail/")
}

// // 点击跳转奖励详情页
// root.methods.toRewardRecord = function (type) {
//   this.$store.commit('changeMobileRechargeRecordData',type)
//   this.$router.push("/index/mobileAsset/mobileAssetWithdrawRecordDetail/")
// }

// 关闭pop提示
root.methods.popClose = function () {
  this.popOpen = false
}

// 保留小数点后8位
root.methods.toFixed = function (num, acc = 8) {
  return this.$globalFunc.accFixed(num, acc)
}


// 状态
// root.methods.state = function (item) {
//
//   let msg = ''
//
//   switch (item.status) {
//     case 'DONE':
//       msg = '等待区块确认' + `(${item.confirms}/${item.minimumConfirms})`
//       break;
//     case 'DEPOSITED':
//       msg = '充值成功'
//       break;
//     case 'CANCELLED':
//       msg = '废弃区块'
//       break;
//     case 'WAITING_FOR_APPROVAL':
//       msg = '等待审核'
//       break;
//     case 'DENIED':
//       msg = '审核未通过'
//       break;
//     default:
//       msg = '---'
//   }
//
//   return msg
// }



export default root
