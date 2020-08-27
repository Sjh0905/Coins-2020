const root = {};

root.name = 'MobileForecastJoinRecord';

root.components = {
  'Loading': resolve => require(['../../vue/Loading'], resolve),
}

root.data = function () {
  return {
    loading: true,
    dataList: [
      // {
      //   participateTime:23132142342,
      //   countId:12,
      //   userName:'2570167180@qq.com'
      // }
    ],

    currency: '',
    isApp:false,
    isIOS:false,
    winningBool:false
  }
}

root.created = function () {
  // if(!(this.$route.query.projectId && this.$route.query.periodNumber && this.$route.query.currency)) {
  //   this.$router.replace({name:'treasureBox'})
  //   return
  // }

  this.currency = this.$route.query.currency

  // console.info(this.$route.query.blockContractUrl)

  this.$store.commit('changeMobileHeaderTitle', '本期参与');
  if(this.$route.query.isIOS) {
    window.postMessage(JSON.stringify({
      method: 'revertHeader'
    }))
    window.postMessage(JSON.stringify({
        method: 'setTitle',
        parameters: '本期参与('+this.$route.query.currency+this.$route.query.periodNumber+')'
      })
    );
    window.postMessage(JSON.stringify({
      method: 'setH5Back',
      parameters: {
        canGoH5Back:true
      }
    }))
  }

  this.isIOSQuery()

  // this.getInitPage()
  this.getPeriodRecord()
}

root.computed = {};
// root.computed.computedwinningNumber = function () {
//   this.dataList.forEach(v=>{
//     console.info('vvvv========',v)
//     if(v.ticketStatus == 5){
//       return this.winningNumber = v.predictNumber
//     }
//   })
// }
// root.computed.winningNumber = function () {
//   console.info(this.$router.query.winNumber)
//   return this.$router.query.winNumber
// }

root.watch = {};


root.methods = {};

root.methods.goToBlocks = function () {
  window.open(this.$route.query.blockContractUrl)
}

root.methods.ReturnToActivePage = function () {
  if(this.$route.query.winNumber){
    this.$router.push('/static/mobileForecastRewardRecord?projectId=1')
    return
  }
  this.$router.push({name:'treasureBox'})
}

// root.methods.getInitPage = function () {
//   this.$http.send('POST_LUCKY_GUESS_CURRENT_PERIOD_PARTAKE', {
//     bind: this,
//     params: {
//       projectId: this.$route.query.projectId,
//       periodNumber: this.$route.query.periodNumber,
//     },
//     callBack: this.re_getInitPage
//   })
// }
//
// root.methods.re_getInitPage = function (res) {
//
//   typeof(res) == 'string' && (res = JSON.parse(res));
//
//   if (res.result != 'FAIL') {
//     console.info(res)
//     this.dataList = res.dataMap.currentPeriodPartakeList;
//   }
//
//   this.loading = false
// }

// 获取历史期数记录
root.methods.getPeriodRecord = function () {
  this.$http.send('GET_PERIOD_RECORD', {
    bind: this,
    query: {
      projectId: this.$route.query.projectId,
      periodNumber: this.$route.query.periodNumber,
      currency: this.$route.query.currency,
    },
    callBack: this.re_getPeriodRecord
  })
}
root.methods.re_getPeriodRecord = function (res) {

  typeof(res) == 'string' && (res = JSON.parse(res));

  if (res.result != 'FAIL') {
    this.dataList = res.dataMap.lotteryRecordList
  }
  // this.dataList.forEach(v=>{
  //   if(v.ticketStatus == 5){

    // }
  // })
  this.loading = false
}


root.methods.changeUser = function (userName) {
  if(this.$globalFunc.testEmail(userName)){
    let newUserName = userName.split('@')
    return newUserName[0].substr(0,2) + '****' + newUserName[0].substr(newUserName[0].length-2,2) + '@' + newUserName[1]
  } else {
    let newUserName = userName
    return newUserName.substr(0,3) + '****' + newUserName.substr(newUserName.length-2,2)
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

export default root;
