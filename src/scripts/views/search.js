var tplSearch = require("../templates/search.string");

SPA.defineView("search",{
  html:tplSearch,
  plugins:["delegated"],
  bindActions:{
    'back.tab':function (e,data) {
      SPA.getView('index',function (view) {
        console.log(view);
        view.modules.content.launch('home');
      })
    }
  }
});
