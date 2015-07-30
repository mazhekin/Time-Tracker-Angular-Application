(function() {
    'use strict';

    angular
        .module('app.auth')
        .factory('authService', authService);

    function authService($rootScope, logger, API_URLS, apiService, base64Service, $route, locationService,
                         cookiesService) {

        init();

        var service = {
            loginPost: loginPost,
            logout: logout,
            getCurrentUser: getCurrentUser,
            getAuthorizationHeader: getAuthorizationHeader
        };

        return service;

        /////////////////////////////////////////////////////

        function init() {

            $rootScope.$on('$routeChangeStart', function(event, next/*, current*/) {

                var currentUser = $rootScope.currentUser;

                if (next.$$route && next.$$route.data) {
                    var requireLogin = next.$$route.data.requireLogin;
                    if (requireLogin && !$rootScope.currentUser) {
                        logger.error('Вы должны быть авторизованы!.');
                        event.preventDefault();
                        locationService.navigateExact('/login', {});
                        return;
                    }

                    if (requireLogin && $rootScope.currentUser) {
                        var areaId = next.$$route.data.areaId;
                        if (areaId) {
                            var allowed = !!currentUser.permissions[areaId] || !!currentUser.permissions['all'];
                            if (!allowed) {
                                logger.error('У вас нет прав для просмотра страницы!');
                                event.preventDefault();
                                return;
                            }
                        }
                    }
                }
            });

            // auto login if we remembered the user while login
            if (cookiesService.get('accessToken')) {
                apiService.get('loginProgress', API_URLS.user).then(function(user) {
                    initCurrentUser(user);
                });
            } else {
                $route.reload(); // to trigger event $routeChangeStart when reloading has been made
            }
        }

        function initCurrentUser(user) {
            // fix: map for frontend
            user.displayName = user.displayName || user.username;
            if (user.permissions.campaign) {
                user.permissions['advert_campaigns'] = user.permissions.campaign;
                delete user.permissions.campaign;
            }
            $rootScope.currentUser = user;
            $rootScope.currentUser.accessToken = base64Service.encode(user.accessToken + ':""');
        }

        function loginPost(credentials) {
            cookiesService.remove('accessToken');
            return apiService.post('loginProgress', API_URLS.login, credentials)
                .then(function(response) {
                    if (response.success) {
                        initCurrentUser(response.data/*user*/);
                        if (credentials.rememberMe) {
                            cookiesService.put('accessToken', $rootScope.currentUser.accessToken);
                        }
                    }
                    return response;
                });
        }

        function logout() {
            cookiesService.remove('accessToken');
            $rootScope.currentUser = null;
            locationService.navigateExact('/login', {});
        }

        function isAuthenticated() {
            return !!$rootScope.currentUser;
        }

        function getCurrentUser() {
            return $rootScope.currentUser;
        }

        function getAuthorizationHeader() {
            if ($rootScope.currentUser) {
                return 'Basic ' + $rootScope.currentUser.accessToken;
            }  else {
                var cookieAccessToken = cookiesService.get('accessToken');
                if (cookieAccessToken) {
                    return 'Basic ' + cookieAccessToken;
                }
            }
        }

        function isAuthorized(authorizedRoles) {
            if (!angular.isArray(authorizedRoles)) {
                authorizedRoles = [authorizedRoles];
            }
            return (isAuthenticated() &&
            authorizedRoles.indexOf($rootScope.currentUser.userRole) !== -1);
        }
    }
})();