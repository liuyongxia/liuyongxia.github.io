var tplLogon = require("../templates/logon.string");

SPA.defineView("logon",{
  html:tplLogon,

  plugins:['delegated'],

  bindActions:{
    'tab.register':function () {  //点击返回箭
      SPA.open('register');
      this.hide();
    }
  }
});
