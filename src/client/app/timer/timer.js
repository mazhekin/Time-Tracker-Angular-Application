(function() {
    'use strict';

    angular
        .module('app.timer')
        .controller('Timer', Timer);

    function Timer(timerCountService, COUNTER_STATUSES) {

        /*jshint validthis: true */
        var vm = this;
        vm.COUNTER_STATUSES = COUNTER_STATUSES;
        vm.onTimerClick = onTimerClick;
        vm.counter = timerCountService.newCounter();
        vm.finishedCounters = [];

        ///////////////////////////////////////////////////////////////

        function onTimerClick(counter) {
            if (counter.status === COUNTER_STATUSES.stopped) {
                vm.counter = timerCountService.startCounter();
            }
            if (counter.status === COUNTER_STATUSES.started) {
                timerCountService.stopCounter();
                vm.finishedCounters.push(angular.copy(vm.counter));
                vm.counter = timerCountService.newCounter();

            }
        }

    }
})();