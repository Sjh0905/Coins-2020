const root = {}
root.name = 'PersonalInformation'
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
    godInfo:{},
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
  this.postPersonalrHistory()
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
root.computed.userId = function () {
  return this.$store.state.authMessage.userId ? this.$store.state.authMessage.userId : 0
}

/*------------------------------ 观察 -------------------------------*/
root.watch = {}
/*------------------------------ 方法 -------------------------------*/
root.methods = {}

// 返回个人页面
root.methods.jumpToFollowTradeStrategy = function () {
  this.$router.go(-1)
}

//昵称
root.methods.goToNickName = function () {
  this.$router.push({name:'changeNickName',query:{isSwitchOrder:this.isSwitchOrder,godInfoNickName:this.godInfo.nickName}})
}
//个性签名
root.methods.goToPersonalSignature = function () {
  this.$router.push({name:'personalSignature',query:{isSwitchOrder:this.isSwitchOrder,godInfolabel:this.godInfo.label}})
}

//个人操作记录
root.methods.postPersonalrHistory = function () {
  let params = {
    followId: this.userId,
    type: this.isSwitchOrder,
  }
  this.$http.send('POST_BROTHER_ORDER_SELF', {
    bind: this,
    params: params,
    callBack: this.re_postPersonalrHistory,
    errorHandler: this.error_postPersonalrHistory
  })
}
root.methods.re_postPersonalrHistory = function (data) {
  typeof data === 'string' && (data = JSON.parse(data))
  this.loading = false
  this.newContract = new Date().getTime()
  this.godInfo = data.dataMap.godInfo || {}
}
root.methods.error_postPersonalrHistory = function (err) {
  console.log("this.err=====",err)
}









// 点击正面照
root.methods.click_front = function () {
  this.$refs.imgFront_0.click()

}
//身份证正面照
root.methods.frontOnChange = function () {
  this.frontImgWA_0 = '0'
  let file = this.$refs.imgFront_0.files[0]
  let text = this.testImg(file)
  console.warn('this is text', text)
  if (text !== '') {

    this.popType = 0
    this.popText = text
    this.popOpen = true

    document.getElementById('imgFrontContainer_0').innerHTML = ''
    let $file = $(".imgFront_0").eq(0);
    $file.after($file.clone().val(""));
    $file.remove();
    this.frontImgMsg_0 = text
    console.warn("what", this.frontImgMsg_0)
    return false
  }
  let reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = function (e) {
    this.src = e.target.result

    let src = e.target.result
    // console.info('src-=======',src)
    document.getElementById('imgFrontContainer_0').innerHTML = `<img src="${this.result}" width="100%" height="100%">`
  }
  this.frontImgMsg_0 = ''

}
// 检测图片
root.methods.testImg = function (file) {
  if (!file) {
    return this.$t('testImg_1')
  }
  if (!/image\/\w+/.test(file.type)) {
    // alert("请传图片！");
    return this.$t('testImg_1')
  }
  if (file.type.split('/')[1] !== 'jpg' && file.type.split('/')[1] !== 'jpeg' && file.type.split('/')[1] !== 'png') {
    return this.$t('imageMsg_0')
  }
  // console.warn("file type", file.type)
  // if ((file.size / 1024) > this.imgSize) {
  //   return this.$t('testImg_2')
  // }
  return ''

}




// 昵称头像签名
root.methods.postNickname = function () {


  let frontImg = this.$refs.imgFront_0.files[0]
  let formData = new FormData()
  if (frontImg) {
    if (this.frontImgWA_0 !== '2') {
      if ((frontImg.size / 1024) > this.minZipSize) {
        this.handleImg(frontImg, (data) => {
          this.sendFrontImg = data
          // console.warn('压缩前')
          this.sendInfo()
        })
      } else {
        this.sendFrontImg = frontImg
        this.sendInfo()

      }
    }
  }
  // console.info('frontImg=====',frontImg)

  // let formData = new FormData()
  let frontImgInfo = this.$refs.imgFront_0.value
  let frontImgTypeArr = frontImgInfo.split('.')
  let frontImgType = frontImgTypeArr[frontImgTypeArr.length - 1].toLocaleLowerCase()
  // console.info('1111',('headImage', this.sendFrontImg))
  !frontImg?formData.append('identityStr', JSON.stringify({
      'nickName': this.godInfo.nickName,
      'label': this.godInfo.label,
      'type': this.isSwitchOrder,
      'headImage': this.godInfoImg || '',
    })):
    formData.append('identityStr', JSON.stringify({
      'nickName': this.godInfo.nickName,
      'label': this.godInfo.label,
      'type': this.isSwitchOrder,
    }))

  !frontImg?'':this.sendFrontImg && formData.append('file', this.sendFrontImg, 'certificate_positive.' + frontImgType)

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


root.methods.sendInfo = function () {

  let canSend = true
  if (this.sendFrontImg && this.sendFrontImg.size / 1024 > this.imgSize) {
    this.frontImgMsg_0 = this.$t('testImg_2')
    canSend = false
  }
  if (this.sendFrontImg && this.sendFrontImg.size / 1024 > this.minZipSize) {
    this.frontImgMsg_1 = this.$t('testImg_2')
    canSend = false
  }
  // let formData = new FormData()
  // let frontImgInfo = this.$refs.imgFront_0.value
  // let frontImgTypeArr = frontImgInfo.split('.')
  // let frontImgType = frontImgTypeArr[frontImgTypeArr.length - 1].toLocaleLowerCase()
  // this.sendFrontImg && formData.append('file', this.sendFrontImg, 'certificate_positive.' + frontImgType)
  // console.info('444',('headImage', this.sendFrontImg))
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
