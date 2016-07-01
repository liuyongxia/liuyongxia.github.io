//引入模板
var tplIndex = require('../templates/index.string');
//定义视图
SPA.defineView('index', { //index定义视图名
  //装载模板
  html: tplIndex,

//插件使用必须添加
plugins:["delegated"], //实现点击事件

//绑定子视图，添加到index页面中
  modules:[{
    name:"content",   //自定义
    views:["home","classify","search","shoppingCart","my"], //定义视图名一样
    defaultTag:"home",   //首页
    container:".l-container" //盒名
 }],

  //点击事件
  bindActions:{
    'switch.tabs':function(e,data){    //在点击的元素上添加   action-type = "switch.tabs"
      //console.log(e);            //上面的  plugins:["delegated"],必加  //它返回的是一个对象  如 el:li
      $(e.el).addClass("active").siblings().removeClass("active"); //高亮
      //切换子视图
      this.modules.content.launch(data.tag);   //this指的是视图defineView,点击元素上添加  data-tag ="home"
    }
  }
});
