const root = {}
root.name = 'propertyAssets'
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

    loadingMoreShow: true,
    loadingMoreShowing: false,

    popType: 0,
    popText: '',
    popOpen: false
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
/*------------------------------ 观察 -------------------------------*/
root.watch = {}
/*------------------------------ 方法 -------------------------------*/
root.methods = {}

// 解锁锁仓
root.methods.unLockHouse = function (item) {
  // console.log(item.id)
  this.$http.send("", {
    bind: this,
    params: {
    },
    callBack: this.re_unLockHouse,
    errorHandler: this.error_unLockHouse
  })
}

root.methods.re_unLockHouse = function ( data ) {
  typeof (data) === 'string' && (data = JSON.parse(data))
  this.popOpen = true
  if(data.errorCode){
    if(data.errorCode == 1 ) {
      this.popType = 0
      this.popText = this.$t('unLockTips')
      return
    }
    if(data.errorCode == 2 ) {
      this.popType = 0
      this.popText = this.$t('unLockTips_1')
      return
    }
    if(data.errorCode == 3 ) {
      this.popType = 0
      this.popText = this.$t('unLockTips_2')
      return
    }
    if(data.errorCode == 4 ) {
      this.popType = 0
      this.popText = this.$t('unLockTips_3')
      return
    }
    if(data.errorCode == 5 ) {
      this.popType = 0
      this.popText = this.$t('unLockTips_4')
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
    this.getLockCur()
    return
  }

  // console.log(data)
}
root.methods.error_unLockHouse = function ( err ) {
  console.log(err)
}

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
