(function() {
    'use strict';

    angular
        .module('app.shared')
        .factory('locationService', locationService);

    function locationService($location) {

        return {
            getParams: getParams,
            navigate: navigate,
            navigateExact: navigateExact
        };

        function navigateExact(path, params) {
            //alert('navigate ' + path + '  ' + angular.toJson(params));
            if (!!path) {
                $location.path(path);
            }
            if (!!params) {
                $location.search(params);
            }
        }

        function getParams() {
            return $location.search();
        }

        function navigate(paramsData) {
            var params = getParams();
            if (!!paramsData.add && angular.isObject(paramsData.add)) {
                Object.getOwnPropertyNames(paramsData.add).forEach(function(name) {
                    params[name] = paramsData.add[name].toString();
                });
            }
            if (!!paramsData.remove && angular.isArray(paramsData.remove)) {
                paramsData.remove.forEach(function(name) {
                    delete params[name];
                });
            }
            navigateExact(null, params);
        }

    }

})();

