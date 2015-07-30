(function() {
    'use strict';

    angular
        .module('app.timer')
        .run(appRun);

    appRun.$inject = ['routehelper'];

    /* @ngInject */
    function appRun(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/',
                config: {
                    templateUrl: 'app/timer/timer.html',
                    controller: 'Timer',
                    controllerAs: 'vm',
                    title: 'Таймер'
                }
            }
        ];
    }
})();
