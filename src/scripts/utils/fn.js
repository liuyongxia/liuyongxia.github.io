var Util ={
  setFocus:function (e) {
    $(e).addClass("active").siblings().removeClass("active");
  }
}
//暴露接口
module.export = Util;
