const root = {}
root.name = 'LockAndMine'
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
  this.getLockMining()
}
root.mounted = function () {}
root.beforeDestroy = function () {}
/*------------------------------ 计算 -------------------------------*/
root.computed = {}

root.computed.computedRecord = function () {
  return this.records || []
}
// 获取userId
root.computed.userId = function () {
  return this.$store.state.authMessage.userId
}
/*------------------------------ 观察 -------------------------------*/
root.watch = {}
/*------------------------------ 方法 -------------------------------*/
root.methods = {}

// 解锁锁仓
root.methods.unLockHouse = function (item) {
  this.$http.send("UNLOCK_MINING", {
    bind: this,
    params: {
      userId:this.userId,
      lockId: item.id
    },
    callBack: this.re_unLockHouse,
    errorHandler: this.error_unLockHouse
  })
}
root.methods.re_unLockHouse = function (data) {
  typeof (data) === 'string' && (data = JSON.parse(data))
  this.popOpen = true
  if(data.errorCode){
    if(data.errorCode == 2 ) {
      this.popType = 0
      this.popText = this.$t('未找到记录')
      return
    }
    if(data.errorCode == 3 ) {
      this.popType = 0
      this.popText = this.$t('用户已解锁')
      return
    }
    if(data.errorCode == 4 ) {
      this.popType = 0
      this.popText = this.$t('解锁失败')
      return
    }
    if(data.errorCode == 5 ) {
      this.popType = 0
      this.popText = this.$t('未满锁仓到期日')
      return
    }
    this.popType = 0
    this.popText = this.$t('unLockTips_3')
    return
  }
  if(data.result == 'SUCCESS') {
    this.popType = 1
    this.popText = this.$t('lockSuccess')
    this.$eventBus.notify({key: 'UN_LOCK'})
    this.getLockMining()
    return
  }

  // console.log(data)
}
root.methods.error_unLockHouse = function ( err ) {
  console.log(err)
}

// 获取锁仓挖矿记录
root.methods.getLockMining = function () {
  this.$http.send("LOCK_LOCK_LIST", {
    bind: this,
    urlFragment: `${this.userId}/0`,
    callBack: this.re_getLockMining,
    errorHandler: this.error_getLockMining,
  })
}
// 获取记录返回，类型为{}
root.methods.re_getLockMining = function (data) {
  typeof data === 'string' && (data = JSON.parse(data))
  if (!data) return
  console.info('data===',data)
  this.records = data.data || []
  if (this.records.length < this.limit) {
    this.loadingMoreShow = false
  }
  this.loadingMoreShowing = false
  this.loading = false
}
// 获取记录出错
root.methods.error_getLockMining = function (err) {
  console.warn("锁仓学习获取成功", err)
}

root.methods.loadingMore = function () {
  this.limit += this.limitNum
  this.loadingMoreShowing = true
  this.getLockMining()
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
