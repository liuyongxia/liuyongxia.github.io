var tplKind = require("../templates/kind.string");

SPA.defineView("kind",{
  html:tplKind,


plugins:['delegated',{
  name:"avalon",
  options:function(vm){
    vm.kind = [];  //定义一个空数组
    vm.seed = [];
  }
}],


init:{
  mySwiper:null
},

  bindActions:{
    //点击返回
    'back.tab':function () {
      this.hide();
    },

    //点击横导航事件
    'kind.tabs':function(e,data){    //在点击的元素上添加   action-type = "kind.tabs"
      //console.log(e);            //上面的  plugins:["delegated"],必加  //它返回的是一个对象  如 el:li
      $(e.el).addClass("active").siblings().removeClass("active"); //高亮
      this.mySwiper.slideTo($(e.el).index());  //点击切换
    },
    //点击竖导航事件
    'vertical.tabs':function(e,data){    //在点击的元素上添加   action-type = "kind.tabs"
      //console.log(e);            //上面的  plugins:["delegated"],必加  //它返回的是一个对象  如 el:li
      $(e.el).addClass("active").siblings().removeClass("active"); //高亮
    }
  },

  bindEvents:{
    'beforeShow':function () {
      var that = this;
      that.vm = that.getVM();

      //调用Ajax第一组
      $.ajax({
        url:'/project/mock/livelist.json',
        // url:'/api/getLivelist.php',
        type:'get',
        data:{
          rtype:'origin'
        },
        success:function (rs) {
          // console.log(rs);
          that.vm.kind = rs.data;
        }
      });

      //调用Ajax第二组
      $.ajax({
        url:'/project/mock/machinery.json',
        // url:'/api/getLivelist.php',
        type:'get',
        data:{
          rtype:'machinery-origin'
        },
        success:function (rs) {
          // console.log(rs);
          that.vm.seed = rs.data;
        }
      });
    },

    'show':function () {
      //种类切换
      this.mySwiper = new Swiper ('#ki-swiper', {
           preventClicks : false,
          // effect : 'fade',
          onSlideChangeStart: function(swiper){
            // console.log(swiper.activeIndex);
            var index = swiper.activeIndex;
            var $li = $(".m-kind .kind li");
            $li.eq(index).addClass("active").siblings().removeClass("active");
          }
      });
    }
  }
});
