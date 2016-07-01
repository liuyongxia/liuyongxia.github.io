var tplHome = require("../templates/home.string");

SPA.defineView("home",{
  html:tplHome,

  //插件使用必须添加
  plugins:["delegated", //实现点击事件
   {                   //avalon ajax 3(1)
     name:"avalon",
     options:function(vm){
       vm.livelist = [];  //定义一个空数组 第一组
       vm.machinery = [];  //第二组
     }
   }],


   //封装方法
   init:{
     vm:null,
     mySwiper:null,  //点击切换或swiper方法
     formatData:function (arr){       //5(1)
        // console.log(arr);
        var tempArr = [];         //5(2)
        for (var i = 0; i < Math.ceil(arr.length/2); i++) {
          tempArr[i] = [];
          tempArr[i].push(arr[2*i]);
          tempArr[i].push(arr[2*i+1]);
        }
        return tempArr;
     }
   },

   //点击事件
   bindActions:{
     'kind.tabs':function(e,data){    //在点击的元素上添加   action-type = "kind.tabs"
       //console.log(e);            //上面的  plugins:["delegated"],必加  //它返回的是一个对象  如 el:li
       $(e.el).addClass("active").siblings().removeClass("active"); //高亮
       this.mySwiper.slideTo($(e.el).index());  //点击切换
     },

     //点击图片到详情页
     'goto.detail':function(e,data){
      //  console.log(data);
       SPA.open('detail',{   //点击图片时打开另一个页面(详情页)
         //param:data        //将数据传到另一个页面 (第一种方法)
         param:{
           data:data      //(第二种方法)
         }
       });
     },
     //点击导航图片到列表
     'goto.kind':function(e,data){
       SPA.open('kind');       //点击时种类打开另一个页面
     }
   },

  //视图事件的绑定
    bindEvents: {
         //动画结束之前
         'beforeShow':function(){

            var that = this;
            that.vm = that.getVM();   //获取vm对象   3(2)

            //第一组
           //ajax调用数据1
            $.ajax({
              url:'/project/mock/livelist.json',  //一般2json
              // url:'/api/getLivelist.php',   //形如2 //最后
              type:'get',
              data: {              //data往后端穿的参数
                rtype:'origin'
              },
              success:function(rs) {  //成功时返回的数据rs
                //console.log(rs);    //得到数据后利用avalonjs渲染数据
                //vm.livelist = rs.data; //  3(3) 获得数据rs.data
                //4(1)先给ul添加一个属性ms-repeat-value="livelist"；并且livelist必须是前面绑定的名称  即定义空数组
                //4(2)给里面的元素添加属性如img，h3,h5。分别添加ms-src="value.imgsrc"，ms-text="value.title1"，
                //ms-text="value.title2"。
                //5问题：每次循环的是ul，因此每次ul获取数组时内部的所有li取相同的值，解决：将一改为二，三维等数组；
                //5(1)先封装一个方法在init中，上面
                // console.log(that.formatData(rs.data));
                that.livelistArray = rs.data;
                that.vm.livelist=that.formatData(rs.data); //6改页面
                //7隐藏多余的lims-class-hide="!value[1]"
              }
            });

           //第二组
           $.ajax({
             url:'/project/mock/machinery.json',
            //  url:'/api/getLivelist.php',
             type:'get',
             data:{
               rtype:'machinery-origin'
             },
             success:function (rs) {
              //  console.log(rs);
               that.machineryArray = rs.data;
               that.vm.machinery = that.formatData(rs.data);
             }
           });

         },

         //动画结束之后
        'show': function () {


          //吸顶菜单 在大框上添加data-scroll-id="homeHotScroll"
          var fixScroll = this.widgets.homeHotScroll;
          fixScroll.on('scroll', function () {
              //console.log(this.y);
            if(this.y <= -300) {
              if($('.box').siblings().length > 2){
                ;
              } else {
                $('.box').after($('.nav-content').clone(true).addClass('fixed'));  //克隆一个相同的，将样式拿出总框box
              }
            } else {
              $('.nav-content.fixed').remove();
            }
          });

          //轮播图
          this.mySwiper = new Swiper ('#banner-swiper', {
          	  loop: true,
          		 autoplay:1000,  //该行注释则不会自动轮播，可以滑动
          		 // 如果需要分页器
          		pagination: '.swiper-pagination',
          });
          //种类滑动切换
          this.mySwiper = new Swiper ('#kind-swiper', {
              //  preventClicks : false,
              effect : 'fade',
              onSlideChangeStart: function(swiper){
                // console.log(swiper.activeIndex);
                var index = swiper.activeIndex;
                var $li = $(".nav-content .nav li");
                $li.eq(index).addClass("active").siblings().removeClass("active");
              }
          });



          //下拉刷新，上拉加载更多 siction上添加data-scroll-id="homeHotScroll"
          var that = this;
          var scrollSize = 30;
          var myScroll = this.widgets.homeHotScroll;
          myScroll.scrollBy(0, -scrollSize);

          var head = $('.head img'),
          topImgHasClass = head.hasClass('up');
          var foot = $('.foot img'),
          bottomImgHasClass = head.hasClass('down');
          myScroll.on('scroll', function () {
              var y = this.y,
                  maxY = this.maxScrollY - y;
              if (y >= 0) {
                  !topImgHasClass && head.addClass('up');
                  return '';
              }
              if (maxY >= 0) {
                  !bottomImgHasClass && foot.addClass('down');
                  return '';
              }
          });
          myScroll.on('scrollEnd', function () {
              if (this.y >= -scrollSize && this.y < 0) {
                  myScroll.scrollTo(0, -scrollSize);
                  head.removeClass('up');
              } else if (this.y >= 0) {
                  head.attr('src', '/project/images/ajax-loader.gif');

                  // ajax下拉刷新数据
                  $.ajax({
                    url:'/project/mock/livelist.json',
                    // url: '/api/getLivelist.php',
                    data: {
                      rtype: 'refresh'
                    },
                    success: function (rs) {
                      var newArray = rs.data.concat(that.livelistArray);
                      that.vm.livelist = that.formatData(newArray);
                      that.livelistArray = newArray;

                      myScroll.scrollTo(0, -scrollSize);
                      head.removeClass('up');
                      head.attr('src', '/project/images/arrow.png');
                    }
                  })
              }

              var maxY = this.maxScrollY - this.y;
              var self = this;
              if (maxY > -scrollSize && maxY < 0) {
                  myScroll.scrollTo(0, self.maxScrollY + scrollSize);
                  foot.removeClass('down')
              } else if (maxY >= 0) {
                  foot.attr('src', '/project/images/ajax-loader.gif');

                  // ajax上拉加载数据
                  $.ajax({
                    url:'/project/mock/livelist.json',
                    // url: '/api/getLivelist.php',
                    data: {
                      rtype: 'more'
                    },
                    success: function (rs) {
                      var newArray = that.livelistArray.concat(rs.data);
                      that.vm.livelist = that.formatData(newArray);
                      that.livelistArray = newArray;
                      myScroll.refresh();

                      myScroll.scrollTo(0, self.y + scrollSize);
                      foot.removeClass('down');
                      foot.attr('src', '/project/images/arrow.png');
                    }
                  });
              }
          });
        }
     }
});
