(function() {
    'use strict';

    angular
        .module('app.timer')
        .controller('Timer', Timer);

    function Timer(timerCountService, COUNTER_STATUSES, localStorageService) {

        /*jshint validthis: true */
        var vm = this;
        vm.COUNTER_STATUSES = COUNTER_STATUSES;
        vm.onTimerClick = onTimerClick;
        vm.deleteCounter = deleteCounter;

        function activate() {
            vm.counter = timerCountService.newCounter();
            vm.finishedCounters = [];
            readCounters();
        }

        activate();
        ///////////////////////////////////////////////////////////////

        function onTimerClick(counter) {
            if (counter.status === COUNTER_STATUSES.stopped) {
                vm.counter = timerCountService.startCounter(vm.counter.task || 'Default name');
            }
            if (counter.status === COUNTER_STATUSES.started) {
                timerCountService.stopCounter();
                vm.finishedCounters.push(angular.copy(vm.counter));
                vm.counter = timerCountService.newCounter();
            }
            saveCounters();
        }

        function deleteCounter($index) {
            vm.finishedCounters.splice($index, 1);
            saveCounters();
        }

        function saveCounters() {
            localStorageService.set('counters', countersToString());
        }

        function readCounters() {
            var str = localStorageService.get('counters');
            countersFromString(str);
        }

        function countersToString() {
            return JSON.stringify(vm.finishedCounters);
        }

        function countersFromString(str) {
            vm.finishedCounters = JSON.parse(str) || [];
        }
    }
})();