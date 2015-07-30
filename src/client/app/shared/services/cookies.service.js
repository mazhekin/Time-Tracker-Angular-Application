// $cookies service wrapper
// because it was the issue when signature of service $cookies was changed after upgrade
// and it had been causing a lot of refactoring efforts
(function() {
    'use strict';

    angular
        .module('app.shared')
        .factory('cookiesService', cookiesService);

    function cookiesService($cookies) {
        var service = {
            get: get,
            put: put,
            remove: remove
        };

        return service;

        ////////////////////////////////////////////////////////////////////////

        function get (key) {
            return $cookies.get(key);
        }

        function put (key, value) {
            $cookies.put(key, value);
        }

        function remove(key) {
            $cookies.remove(key);
        }

    }

})();

