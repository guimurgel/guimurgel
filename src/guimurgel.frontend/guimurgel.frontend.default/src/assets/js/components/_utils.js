/*
|--------------------------------------------------------------------------
| Utils
|--------------------------------------------------------------------------
*/

APP.component.Utils = {

  init : function () {
      this.setup();
  },

  setup : function () {



  },

  getController: function () {

      var controller = document.querySelector('meta[name="controller"]').content
      return controller ? controller : false;

  },

  getPage: function () {

      var page = document.querySelector('meta[name="page"]').content
      return page ? page : false;
  
  },

};

