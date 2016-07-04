var tplDetail = require("../templates/detail.string");

SPA.defineView("detail",{
  html:tplDetail,

  plugins:['delegated',{
    name:'avalon',
    options:function (vm) {
      vm.imgsrc = "";
      vm.title1 = "";
      vm.title2 = "";
      vm.price = "";
      vm.isShowLoading = true; //显示 （loading加载）
    }
  }],

  init:{
    vm:null
  },

    bindActions:{
      'back.tab':function () {  //点击返回箭
        this.hide();
      }
    },
    bindEvents:{
      'show':function () {
      // var that =this;
      // console.log(this.param);  //拿到点击home中的图片时，传过来的数据(第一种方法)
      // console.log(this.param.data);      //(第二种方法)
      // console.log(d.id);
      var vm = this.getVM();
      var d = this.param.data;
      // console.log(d);
      console.log(d);
      $.ajax({
        // url:'/project/mock/detail.json',
        url:'/api/getLiveDetail.php',
        data:{
          id:d.id
        },
        success:function (rs) {
          console.log(rs.data);
          setTimeout(function () {
            vm.imgsrc = rs.data.imgsrc;
            vm.title1 = rs.data.title1;
            vm.title2 = rs.data.title2;
            vm.price = rs.data.price;
            vm.isShowLoading = false;
          },100);
        }
      });
      }
    }
});
