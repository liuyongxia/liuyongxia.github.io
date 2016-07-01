var tplRegister = require("../templates/register.string");

SPA.defineView("register",{
  html:tplRegister,

  plugins:['delegated'],

  bindActions:{
    'back.logon':function () {  //点击返回箭
      SPA.open('logon');
      this.hide();
    }
  }
});
