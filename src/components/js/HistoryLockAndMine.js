const root = {}
root.name = 'HistoryLockAndMine'
/*------------------------------ 组件 ------------------------------*/
root.components = {
  'Loading': resolve => require(['../vue/Loading'], resolve),
  'PopupPrompt': resolve => require(['../vue/PopupPrompt'], resolve),
}
/*------------------------------ data -------------------------------*/
root.data = function () {
  return {
    loading: true,

    limit: 10,
    limitNum: 10,

    records: [],

    loadingMoreShow: true,
    loadingMoreShowing: false,

    popType: 0,
    popText: '',
    popOpen: false
  }
}
/*------------------------------ 生命周期 -------------------------------*/
root.created = function () {
  this.getLockHistoryList()
}
root.mounted = function () {}
root.beforeDestroy = function () {}
/*------------------------------ 计算 -------------------------------*/
root.computed = {}
root.computed.computedRecord = function () {
  return this.records
}
// 获取userId
root.computed.userId = function () {
  return this.$store.state.authMessage.userId
}
/*------------------------------ 观察 -------------------------------*/
root.watch = {}
/*------------------------------ 方法 -------------------------------*/
root.methods = {}

// 获取记录
root.methods.getLockHistoryList= function () {
  this.$http.send("LOCK_HIS_LOCK_LIST", {
    bind: this,
    urlFragment: `${this.userId}/0`,
    callBack: this.re_getLockHistoryList,
    errorHandler: this.error_getLockHistoryList
  })
}
// 获取记录返回，类型为{}
root.methods.re_getLockHistoryList = function (data) {
  typeof data === 'string' && (data = JSON.parse(data))
  if (!data) return
  this.records = data.data || []
  if (this.records.length < this.limit) {
    this.loadingMoreShow = false
  }
  this.loadingMoreShowing = false
  this.loading = false
}
// 获取记录出错
root.methods.error_getLockHistoryList = function (err) {
  console.warn("充值获取记录出错！", err)
}

// 点击拷贝
root.methods.clickCopy = function (id) {
  let input = this.$refs[id][0]
  input.select()
  document.execCommand("copy")
  this.popType = 1
  this.popText = this.$t('copyRight')
  this.popOpen = true
}

// 状态
root.methods.state = function (item) {

  let msg = ''

  switch (item.status) {
    case 'PENDING':
      msg = this.$t('recharge_status_1') + `(${item.confirms}/${item.minimumConfirms})`
      break;
    case 'DEPOSITED':
      msg = this.$t('recharge_status_2')
      break;
    case 'CANCELLED':
      msg = this.$t('recharge_status_3')
      break;
    case 'WAITING_FOR_APPROVAL':
      msg = this.$t('recharge_status_4')
      break;
    case 'DENIED':
      msg = this.$t('recharge_status_5')
      break;
    default:
      msg = '---'
  }
  return msg
}

root.methods.loadingMore = function () {
  this.limit += this.limitNum
  this.loadingMoreShowing = true
  this.getRecord()
}

root.methods.popClose = function () {
  this.popOpen = false
}

/*---------------------- 保留小数 begin ---------------------*/
root.methods.toFixed = function (num, acc = 8) {
  return this.$globalFunc.accFixed(num, acc)
}
/*---------------------- 保留小数 end ---------------------*/
// 格式化时间
root.methods.formatDateUitl = function (time) {
  typeof time === 'string' && (time = Number(time))
  return this.$globalFunc.formatDateUitl(time, 'YYYY-MM-DD hh:mm:ss')
}
export default root
