// Directive manage the visibility of the html element according user permissions
// Usage: <div my-is-authorized="areaName"></div>
(function() {
    'use strict';

    angular
        .module('app.auth')
        .directive('myIsAuthorized', myIsAuthorized);

    function myIsAuthorized($rootScope) {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        ///////////////////////////////////////

        function link(scope, element, attrs) {
            $rootScope.$watch('currentUser', function (newVal) {
                if (!!newVal) {
                    if (newVal.permissions['all']) {
                        element.css('display', 'block');
                        return;
                    }
                    for (var areaName in newVal.permissions) {
                        // check the full equality like 'advert_campains'
                        // and check partial equality  'advert_' (for parent elements)
                        if (attrs.myIsAuthorized === areaName || areaName.startsWith(attrs.myIsAuthorized + '_')) {
                            element.css('display', 'block');
                            return;
                        }
                    }
                }
                element.css('display', 'none');
            });
        }
    }
})();