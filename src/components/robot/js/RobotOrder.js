import axios from "axios";

const root = {}
root.name = 'OrderPage'
root.components = {
  'Datepicker': resolve => require(['vuejs-datepicker'], resolve),
}

root.data = function () {
  return {
    startTime: new Date(),
    endTime: new Date(),



  }
}


root.created = function () {
  this.getUSDThl();
}

//  组件销毁
// _cc 组件销毁前清除获取汇率定时器
root.beforeDestroy = function () {
}

root.methods = {}

//sss===

//获取USDT汇率
root.methods.getUSDThl = function(){

}


export default root
