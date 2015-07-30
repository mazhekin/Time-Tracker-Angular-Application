(function() {
    'use strict';

    angular
        .module('app.auth')
        .config(config);

    function config($httpProvider) {
        $httpProvider.interceptors.push(['$q', 'locationService', '$rootScope', 'cookiesService',
            function($q, locationService, $rootScope, cookiesService) {
            return {
                'request': function (config) {
                    config.headers = config.headers || {};
                    if ($rootScope.currentUser) {
                        config.headers['Authorization'] = 'Basic ' + $rootScope.currentUser.accessToken;
                    } else {
                        var cookieAccessToken = cookiesService.get('accessToken');
                        if (!!cookieAccessToken) {
                            config.headers['Authorization'] = 'Basic ' + cookieAccessToken;
                        }
                    }
                    return config;
                },
                'responseError': function(response) {
                    if (response.status === 401 || response.status === 403) {
                        locationService.navigateExact('/login');
                    }
                    return $q.reject(response);
                }
            };
        }]);
    }
})();