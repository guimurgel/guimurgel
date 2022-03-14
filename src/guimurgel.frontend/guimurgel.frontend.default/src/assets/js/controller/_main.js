/*
|--------------------------------------------------------------------------
| Controller
|--------------------------------------------------------------------------
*/

APP.controller.Main = {

  init: function () {

    this.setup();
    this.main();

  },

  setup: function () {

  },

  //Global
  onUserLoaded: function () { },

  //Main
  main: function () {

    APP.controller.Main.base();
    APP.controller.Main.modules();
    APP.controller.Main.sections();
    APP.controller.Main.helpers();

  },

  //Init Base Configs
  base: function () {


  },

  //Init Modules
  modules: function () {
  
  },

  //Init Section
  sections: function () {

  },

  //Init Helpers
  helpers: function () {
    
  },

};