var tplClassify = require("../templates/classify.string");


// var util = require('../utils/fn.js');


SPA.defineView("classify",{
  html:tplClassify,

  //插件使用必须添加
  plugins:["delegated"], //实现点击事件

  init:{
    mySwiper:null,
    setFocus:function (e) {
      $(e.el).addClass("active").siblings().removeClass("active");
    }
  },


  //点击事件
  bindActions:{
    'switch.tabs':function(e,data){    //在点击的元素上添加   action-type = "switch.tabs"
      // console.log(util);                              //上面的  plugins:["delegated"],必加  //它返回的是一个对象  如 el:li
      this.setFocus(e.el); // 高亮 调用了自己定义的框架（方法）
      this.mySwiper.slideTo($(e.el).index());  //点击切换
    },
    //点击返回
    'back.tabs':function(e,data){
      // console.log(this);  //指向classify(发现)视图
      // console.log(this.parentView);  //指向他的父视图，即index视图
      // this.parentView.modules.content.launch('home'); //第一种方法
      SPA.getView('index',function (view) {
        // console.log(view);
        view.modules.content.launch('home');
      })
    }
  },

  //滑动事件
  bindEvents:{
    'show':function () {
      //种类切换
      this.mySwiper = new Swiper ('#classify-swiper', {
           preventClicks : false,
          // effect:'fade',
          onSlideChangeStart: function(swiper){
            // console.log(swiper.activeIndex);
            var index = swiper.activeIndex;
            var $li = $(".m-classify .classify li");
            $li.eq(index).addClass("active").siblings().removeClass("active");
          }
      });
    }
  }
});
