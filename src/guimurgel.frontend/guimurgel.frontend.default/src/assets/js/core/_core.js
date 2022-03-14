/*
|--------------------------------------------------------------------------
| Core
|--------------------------------------------------------------------------
*/

APP.core.Main = {

    init: function () {
        APP.controller.General.init();
        this.loadPageController();
    },

    loadPageController: function () {
        var ctrl = APP.component.Utils.getController();
        if (ctrl != '' && APP.controller[ctrl] !== undefined) {
            APP.controller[ctrl].init();
        }
    }

};

/*
|--------------------------------------------------------------------------
| Chamada
|--------------------------------------------------------------------------
*/
document.addEventListener("DOMContentLoaded", function(){
    APP.core.Main.init();
});