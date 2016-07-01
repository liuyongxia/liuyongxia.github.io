var tplShoppingCart = require("../templates/shoppingCart.string");

SPA.defineView("shoppingCart",{
  html:tplShoppingCart,
  plugins:["delegated"], //实现点击事件
  bindActions:{
    'back.tab':function(e,data) {
      SPA.getView('index',function (view) {
        // console.log(view);
        view.modules.content.launch('home');
      })
    }
  }
});
