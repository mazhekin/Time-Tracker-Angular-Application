(function() {
    'use strict';

    angular.module('app', [
        'app.core',
        'app.auth',
        'app.shared',

        'app.timer',

        // third party
        'LocalStorageModule'
    ]);

})();