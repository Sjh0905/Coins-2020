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
    openStopTheRobot:true,
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
export default root
