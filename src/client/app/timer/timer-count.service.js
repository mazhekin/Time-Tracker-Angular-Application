(function() {
    'use strict';

    angular.module('app.timer')
        .factory('timerCountService', timerCountService);

    function timerCountService($interval, COUNTER_STATUSES) {

        /*jshint validthis: true */
        var vm = this;

        return {
            newCounter: newCounter,
            startCounter: startCounter,
            stopCounter: stopCounter
        };

        /////////////////////////////////////////////

        function newCounter() {
            return {
                start: new Date(),
                finish: new Date(),
                status: COUNTER_STATUSES.stopped,
                diff: 0
            };
        }

        function startCounter() {
            vm.counter = newCounter();
            vm.counter.status = COUNTER_STATUSES.started;
            vm.interval = $interval(function() {
                vm.counter.finish = new Date();
                vm.counter.diff = Math.round((vm.counter.finish - vm.counter.start) / 1000);
            }, 1000);
            return vm.counter;
        }

        function stopCounter() {
            $interval.cancel(vm.interval);
        }
    }
})();