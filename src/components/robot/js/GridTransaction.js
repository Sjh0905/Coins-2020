const root = {}
root.name = 'gridTransaction'
/*------------------------------ 组件 ------------------------------*/
root.components = {
 'PopupWindow': resolve => require(['../../vue/PopupWindow'], resolve),
}
/*------------------------------ data -------------------------------*/
root.data = function () {
  return {
    detailsType:1,
    openStopTheRobot:false,
    openSetStopLoss:false,
    distinguishPrice:false, //辨别价格
    modifyPrice:'', //止损价格
    winPrice:'', //止盈价格
  }
}
/*------------------------------ 生命周期 -------------------------------*/
root.created = function () {}
root.mounted = function () {}
root.beforeDestroy = function () {}
/*------------------------------ 计算 -------------------------------*/
root.computed = {}
/*------------------------------ 观察 -------------------------------*/
root.watch = {}
/*------------------------------ 方法 -------------------------------*/
root.methods = {}

root.methods.gridDetails = function (type) {
  this.detailsType = type
}
//停止机器人
root.methods.popStopTheRobot = function () {
  this.openStopTheRobot = false
}
//打开停止机器人
root.methods.StopTheRobot = function () {
  this.openStopTheRobot = true
}
//关闭止损价格弹窗
root.methods.popSetStopLoss = function () {
  this.openSetStopLoss = false
}
//打开止损价格弹窗
root.methods.clickSetStopLoss = function () {
  this.openSetStopLoss = true
  this.distinguishPrice = true
}
//打开自动止盈价格弹窗
root.methods.clickAutomaticStopProfit = function () {
  this.openSetStopLoss = true
  this.distinguishPrice = false
}
export default root
