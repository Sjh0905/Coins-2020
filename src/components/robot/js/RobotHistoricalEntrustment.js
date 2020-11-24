const root = {}
root.name = 'gridTransaction'
/*------------------------------ 组件 ------------------------------*/
root.components = {
 'PopupWindow': resolve => require(['../../vue/PopupWindow'], resolve),
}
/*------------------------------ data -------------------------------*/
root.data = function () {
  return {
    openDetails:true,
    popWindowOpenDetails:true,
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

root.methods.clickDetails = function () {
  this.popWindowOpenDetails = true
}
root.methods.popWindowCloseDetails = function () {
  this.popWindowOpenDetails = false
}
export default root
