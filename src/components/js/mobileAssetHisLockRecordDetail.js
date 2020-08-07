const root = {}
root.name = 'mobileAssetHisLockRecordDetail'

import Clipboard from "clipboard";

root.props = {}


root.data = function () {
  return {
    statusObj:{
      "SUCCESS":"成功",
      "FAILED":"失败"
    },

    // toast窗口是否显示
    toastWindowFlag: false,

    // 弹窗
    popOpen: false,
    popType: 0,
    popText: '系统繁忙',

    // ajax请求撤销
    ajaxCancelFlag: false,

  }
}

root.components = {
  'PopupPrompt': resolve => require(['../vue/PopupPrompt'], resolve),
}

root.created = function () {
  // this.$store.commit('changeMobileHeaderTitle', this.$store.state.mobileRechargeRecordData.currency + '提现详情')
  if(this.$store.state.changemobileLockRecordData && !this.$store.state.changemobileLockRecordData.currency) {
    this.$router.push({name: 'MobileLockHouseRecord'})
  }
}

root.computed = {}
root.computed.rechargeDetailData = function () {
  return this.$store.state.mobileLockRecordData
}
root.computed.userId = function () {
  return this.$store.state.authMessage.userId
}
root.methods = {};
// 回锁仓记录页
root.methods.gotoLockHouse = function () {
  this.$router.push({name:'MobileLockHouseRecord',query:{id:1,currency:this.$route.query.name}})
}

root.methods.yesClick = function () {
  // if (this.ajaxCancelFlag === true) {
  //   return
  // }
  // this.$http.send('POST_CANCEL_WITHDRAWALS', {
  //   bind: this,
  //   params: {
  //     withdrawRequestId: this.rechargeDetailData.id
  //   },
  //   callBack: this.re_confirmCancel,
  //   errorHandler: this.error_confirmCancel,
  // })
  // this.ajaxCancelFlag = true
}

// 点击撤销返回
root.methods.re_confirmCancel = function (data) {
}

// 点击撤销错误
root.methods.error_confirmCancel = function (err) {
}


root.methods.closeClick = function () {
  this.toastWindowFlag = false
}

// 点击复制按钮
root.methods.copyValue = function () {
  let copyBtn = new Clipboard('.container-box-copy-btn');
  let that = this
  copyBtn.on('success', function (e) {
    e.clearSelection();
    that.popOpen = true
    that.popType = 1
    that.popText = '复制成功'
    copyBtn.destroy()
  })
  copyBtn.on('error', function (e) {
    that.popOpen = true
    that.popType = 0
    that.popText = '复制失败'
    copyBtn.destroy()
  })
}

// 保留小数点后8位
root.methods.toFixed = function (num, acc = 8) {
  return this.$globalFunc.accFixed(num, acc)
}

// 关闭pop提示
root.methods.popClose = function () {
  this.popOpen = false
}

export default root
