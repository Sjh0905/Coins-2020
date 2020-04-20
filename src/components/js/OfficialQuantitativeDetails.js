const root = {}
root.name = 'officialQuantitativeDetails'
/*------------------------------ 组件 ------------------------------*/
root.components = {
  'Loading': resolve => require(['../vue/Loading'], resolve),
  'PopupArticle': resolve => require(['../vue/PopupArticle'], resolve),
}
/*------------------------------ data -------------------------------*/
root.data = () => {
  return {
    loading: true, // 加载中
    buyConfirmSuccess:false,
    transaction:[], // 当前挖矿记录
    records: [], //报名记录
    historyRecords: [], //历史记录
    historicalDetails: [], //历史挖矿记录详情

    totalAmount:'', //挖矿总数
    reward:'',     //挖矿奖励
    createdate:'',    //挖矿日期
    quantStartEndTime:'',     //量化起止时间
    fut_amt:'',    //配套总量
    miningProgress:'',   //挖矿进度 0.95
    doSendReward:'',  //已释放的矿源奖励
    showLoadingMore: true,//是否显示加载更多
    showLoadingMore1: true,//是否显示加载更多
    // loadingMoreIng: false, //是否正在加载更多
    loadingMoreShow:false,
    loadingMoreShow1:false,
    currPage:1,
    pageSize:5,
    fdesc:'',
    fstatus:'',

    isApp:false,
    isIOS:false,
    cardType:1,
    historicalMining: false,
    clickThis:-1,
    id:'',
    numminingProgress:''
  }
}

root.created = function () {
  this.getRegistrationRecord()
  this.getHistoryRecord()

  this.getQuantifyransactions()
  this.getQuantifyBasicInformation()
  this.isAppQuery()
  this.isIOSQuery()
}

root.computed = {}

// 判断是否是手机
root.computed.isMobile = function () {
  return this.$store.state.isMobile
}
// 用户名
root.computed.userName = function () {
  if (this.userType === 0) {
    return this.$globalFunc.formatUserName(this.$store.state.authMessage.mobile)
  }
  if (!this.$store.state.authMessage.email) {
    return '****@****'
  }
  return this.$globalFunc.formatUserName(this.$store.state.authMessage.email)
}

// 用户类型，如果是手机用户，为0，如果是邮箱用户，为1
root.computed.userType = function () {
  return this.$store.state.authMessage && this.$store.state.authMessage.province === 'mobile' ? 0 : 1
}

// 获取userId
root.computed.userId = function () {
  return this.$store.state.authMessage.userId
}

//报名记录
root.computed.computedRecord = function (item,index) {
  return this.records
}
//历史挖矿记录
root.computed.computedHistoryRecords = function (item,index) {
  return this.historyRecords
}
//历史挖矿记录详情
root.computed.computedHistoricalDetails = function (item,index) {
  return this.historicalDetails
}
//当前挖矿记录
root.computed.transactionRecording = function (item,index) {
  return this.transaction
}

root.methods = {}

root.methods.postWithd1 = function (cardType) {
  this.cardType = cardType

  console.log("cardType  ===== ",this.cardType)

  // this.postBuyCard(cardType)
}

// 点击加载更多
root.methods.clickLoadingMore = function () {
  this.loadingMoreIng = true
  this.getQuantifyransactions(this.userId)
}

// 点击加载更多
root.methods.clickLoadingMoreHistory = function () {
  this.loadingMoreIng1 = true
  this.getHistoricalDetails()
}
root.methods.buyConfirmSuccessClose = function () {
  this.buyConfirmSuccess=false

}

//查询报名记录get
root.methods.getRegistrationRecord = function () {

  this.$http.send('GET_GETREG_DATA', {
    bind: this,
    urlFragment:this.userId,
    // query:{
    //   userId:this.uuid
    // },
    callBack: this.re_getRegistrationRecord,
    errorHandler: this.error_getRegistrationRecord
  })
}
root.methods.re_getRegistrationRecord = function (data) {

  typeof data === 'string' && (data = JSON.parse(data))
  if (!data) {return}
  console.log("this.re_getRegistrationRecord查询报名记录get=====",data)
  this.records = data.data


  if (this.records.length == 0 ) {
    this.buyConfirmSuccess=true
    return;
  }
  let E2 = this.records[0]
  this.fstatus = E2.fstatus

  if ((this.records.length == 1 && this.fstatus != '已报名')) {
    this.buyConfirmSuccess=true
    return;
  }
  // if (this.fstatus != '已报名') {
  //   this.buyConfirmSuccess=true
  //   return;
  // }
  this.buyConfirmSuccess=false
}
root.methods.error_getRegistrationRecord = function (err) {
  console.log("this.err=====",err)
}


//查询历史挖矿记录get
root.methods.getHistoryRecord = function () {

  this.$http.send('GET_HISTORY', {
    bind: this,
    urlFragment:this.userId,
    // query:{
    //   userId:this.uuid
    // },
    callBack: this.re_getHistoryRecord,
    errorHandler: this.error_getHistoryRecord
  })
}
root.methods.re_getHistoryRecord = function (data) {
  typeof data === 'string' && (data = JSON.parse(data))
  if (!data) {return}
  this.historyRecords = data.data
  console.log("this.re_getHistoryRecord查询历史挖矿记录=====",this.historyRecords)
  data.data.forEach((v,index)=> {
    if (v.id) {
      console.log('查询历史挖矿记录id  index', index)
      console.log('查询历史挖矿记录id  index', v.id)
      this.id = Number(v.id)
    }
  })

  console.log('this.id=========',this.id)

}
root.methods.error_getHistoryRecord = function (err) {
  console.log("this.err=====",err)
}


root.methods.showDetail = function (id) {
  if (this.clickThis == id) {
    this.clickThis = -1
    return
  }
  this.clickThis = id
  this.getHistoricalDetails(id)
}

//查询历史挖矿记录详情get
root.methods.getHistoricalDetails = function (id) {

  this.$http.send('GET_HISTORICAL_DETAILS', {
    bind: this,
    urlFragment:(Number(id)),
    // query:{
    //   currPage: this.currPage,
    //   pageSize: this.pageSize
    // },
    callBack: this.re_getHistoricalDetails,
    errorHandler: this.error_getHistoricalDetails
  })
}
root.methods.re_getHistoricalDetails = function (data) {

  typeof data === 'string' && (data = JSON.parse(data))
  if (!data) {return}
  console.log("this.re_getHistoricalDetails查询历史挖矿记录详情=====",data)
  this.historicalDetails = data.data.data

  // this.transaction = data.data.data
  // this.historicalDetails.push(...data.data.data)
  //
  //
  // if (data.data.data.length < this.pageSize) {
  //   this.showLoadingMore1 = false
  // }
  //
  //
  // this.currPage = this.currPage + 1
  // this.pageSize = this.pageSize + 1
  //
  // this.loading = false
  // this.loadingMoreIng1 = false

}
root.methods.error_getHistoricalDetails = function (err) {
  console.log("this.err=====",err)
}

root.methods.goToDelails = function () {
  // this.$router.push({name: 'MobileLockHouseRecord'})
  this.$router.push({name:'officialQuantitativeRegistration'})
}

//量化展示_量化交易记录get (query:{})  未完成
root.methods.getQuantifyransactions = function () {

  // var data = {
  //   "data": [
  //     {
  //       "createDate": "2020-03-23",
  //       "totalAmount": "34334.0000",
  //       "reward": "24.0000",
  //       "surplus": "900.0000"
  //     }
  //   ],
  //     "errorCode": "0",
  //     "message": "success"
  // }
  this.$http.send('GET_USER_TRADE', {
    bind: this,
    urlFragment:this.userId,
    // query:{userId:this.uuid},
    query:{
      // groupId: this.groupId,
      //ssssssssss
      currPage: this.currPage,
      pageSize: this.pageSize
    },
    callBack: this.re_getQuantifyransactions,
    errorHandler: this.error_getQuantifyransactions
  })
}
root.methods.re_getQuantifyransactions = function (data) {
  typeof data === 'string' && (data = JSON.parse(data))
  if (!data) {return}
  console.log("量化展示_量化交易记录get=====",data)

  // this.transaction = data.data.data
  this.transaction.push(...data.data.data)
  //
  //
  if (data.data.data.length < this.pageSize) {
    this.showLoadingMore = false
  }
  //
  //
  this.currPage = this.currPage + 1
  // this.pageSize = this.pageSize + 1
  //
  // this.loading = false
  this.loadingMoreIng = false
}

root.methods.error_getQuantifyransactions = function (err) {
  console.log("this.error_getQuantifyransactions=====",err)
}

//量化展示_量化基本信息get (query:{})  未完成
root.methods.getQuantifyBasicInformation = function () {
  // var data = {
  //   "data": {
  //     "totalReward": "0",
  //     "recode": {
  //       "reward": 0,
  //       "totalAmount": 0,
  //       "surplus": 10000,
  //       "quantStartEndTime": "03/23 04:00 - 03/24 03:59",
  //       "createdate": "2020-03-23",
  //       "currency": "KK",
  //       "userId": "100013",
  //       "account": "2570167180@qq.com",
  //       "fut_amt": "10000",
  //       "fcode": "yy100",
  //       "prevSurplus":133,
  //       "miningProgress": 0.85
  //     }
  //   },
  //   "errorCode": "0",
  //   "message": "success"
  // }
  this.$http.send('GET_TRADE', {
    bind: this,
    urlFragment:this.userId,
    // query:{
    //   userId:this.uuid
    // },
    callBack: this.re_getQuantifyBasicInformation,
    errorHandler: this.error_getQuantifyBasicInformation
  })
}
root.methods.re_getQuantifyBasicInformation = function (data) {
  typeof data === 'string' && (data = JSON.parse(data))
  if (!data) {return}
  console.log("量化展示_量化基本信息get=====",data)
  this.totalAmount = data.data.recode.totalAmount //挖矿总数
  this.reward = data.data.recode.reward     //挖矿奖励
  this.createdate = data.data.recode.createdate   //挖矿日期
  this.quantStartEndTime = data.data.recode.quantStartEndTime    //量化起止时间
  this.fut_amt = data.data.recode.fut_amt    //配套总量
  this.miningProgress = data.data.recode.miningProgress * 10 //挖矿进度 0.95
  this.doSendReward = data.data.recode.doSendReward  //已释放的矿源奖励
  this.fdesc = data.data.recode.fdesc  //已释放的矿源奖励
  this.numminingProgress = this.$globalFunc.accFixed((this.miningProgress * 10),2)
  // console.log('this.numminingProgress======',this.$globalFunc.accFixed((0.9999 * 100),2))
}
root.methods.error_getQuantifyBasicInformation = function (err) {
  console.log("this.error_getQuantifyBasicInformation=====",err)
}

//跳转首页
root.methods.goToHomePage = function () {
  this.$router.push({name: 'home'})
}
//关闭蒙层弹框
root.methods.goToParticipateNow = function () {
  // this.buyConfirmSuccess = false
  this.$router.push({name: 'officialQuantitativeRegistration'})

}

root.methods.isAppQuery = function (query) {
  if(this.$route.query.isApp) {
    this.isApp = true
  } else {
    this.isApp = false
  }
}

// 判断是否是ios打开
root.methods.isIOSQuery = function () {
  if(this.$route.query.isIOS) {
    this.isIOS = true
  } else {
    this.isIOS = false
  }
}

// 格式化时间
root.methods.formatDateUitl = function (time) {
  return this.$globalFunc.formatDateUitl(Number(time), 'YYYY-MM-DD')
}


/*---------------------- 保留小数 begin ---------------------*/
root.methods.toFixed = function (num, acc = 2) {
  return this.$globalFunc.accFixed(num, acc)
}
export default root
