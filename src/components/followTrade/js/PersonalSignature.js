const root = {}
root.name = 'ChangeNickName'
/*------------------------------ 组件 ------------------------------*/
root.components = {
  'Loading': resolve => require(['../../vue/Loading'], resolve),
  'PopupPrompt': resolve => require(['../../vue/PopupPrompt'], resolve),
  'PopupWindow': resolve => require(['../../vue/PopupWindow'], resolve),
}
/*------------------------------ data -------------------------------*/
root.data = function () {
  return {
    loading:false,
    textareaPersonality: this.$route.query.godInfolabel,

  }

}
/*------------------------------ 生命周期 -------------------------------*/
root.created = function () {
  if(this.$route.query.isApp) {
    /*window.postMessage(JSON.stringify({
        method: 'setTitle',
        parameters: this.userId
      })
    );*/
    window.postMessage(JSON.stringify({
      method: 'setH5Back',
      parameters: {
        canGoH5Back:true
      }
    }))
  }
  // 我的跟单
}

root.mounted = function () {}
root.beforeDestroy = function () {}
/*------------------------------ 计算 -------------------------------*/
root.computed = {}
// 检验是否是APP
root.computed.isApp = function () {
  return this.$route.query.isApp ? true : false
}
// 检验是否是安卓
root.computed.isAndroid = function () {
  return this.$store.state.isAndroid
}
//什么类型的跟单
root.computed.isSwitchOrder = function () {
  return this.$route.query.isSwitchOrder;
}

root.computed.textareaNumber = function () {
  return 60 - this.textareaPersonality.length
}
/*------------------------------ 观察 -------------------------------*/
root.watch = {}
/*------------------------------ 方法 -------------------------------*/
root.methods = {}

// 返回个人页面
root.methods.jumpToFollowTradeStrategy = function () {
  this.$router.go(-1)
}
root.methods.prevent = function (e) {
  if (e.keyCode === 13) {
    e.preventDefault();
  }
}


// 昵称头像签名
root.methods.postNickname = function () {

  let formData = new FormData()
  formData.append('identityStr', JSON.stringify({
    'nickName': this.textareaNickname || '',
    'label': this.textareaPersonality,
    'type': this.isSwitchOrder,
    'headImage': this.godInfoImg || '',
  }))

  this.$http.sendFile('POST_NICKNAME', formData, {
    bind: this,
    callBack: this.re_postNickname,
    errorHandler: this.error_postNickname
  })

}
root.methods.re_postNickname = function (data) {
  typeof data === 'string' && (data = JSON.parse(data))
  if(!data && !data.dataMap) return
  if (data.errorCode == 0) {
    this.$router.go(-1)
  }
}
root.methods.error_postNickname = function (err) {
  console.log('err===',err)
}












/*---------------------- 保留小数 begin ---------------------*/
root.methods.toFixed = function (num, acc = 8) {
  return this.$globalFunc.accFixed(num, acc)
}

/*---------------------- 保留小数 end ---------------------*/

/*---------------------- 格式化时间 begin ---------------------*/
root.methods.formatDateUitl = function (time) {
  return this.$globalFunc.formatDateUitl(time, 'YYYY-MM-DD hh:mm:ss')
}
/*---------------------- 格式化时间 end ---------------------*/
export default root
