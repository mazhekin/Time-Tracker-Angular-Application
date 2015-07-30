(function() {
    'use strict';

    angular
        .module('app.timer')
        .constant('COUNTER_STATUSES', {
            stopped: 'stopped',
            started: 'started'
        });
})();