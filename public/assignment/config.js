/**
 * Created by aniru on 2/13/2017.
 */
(function() {
    angular
        .module("WebAppMaker")
        .config(configuration);

    function configuration($routeProvider, $httpProvider) {

        $httpProvider.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8';

        $routeProvider
            .when("/", {
                redirectTo: '/login'
            })
            .when("/login", {
                templateUrl: "views/user/templates/login.view.client.html",
                controller: 'loginController',
                controllerAs: 'model'
            })
            .when("/register", {
                templateUrl: "views/user/templates/register.view.client.html",
                controller: 'registerController',
                controllerAs: 'model'
            })
            .when("/user", {
                templateUrl: "views/user/templates/profile.view.client.html",
                controller: 'profileController',
                controllerAs: 'model',
                resolve: {
                    loggedin: checkLogin
                }
            })
            .when("/user/:uid", {
                templateUrl: "views/user/templates/profile.view.client.html",
                controller: 'profileController',
                controllerAs: 'model',
                resolve: {
                    loggedin: checkLogin
                }
            })
            .when("/user/:uid/website", {
                templateUrl: "views/websites/templates/website-list.view.client.html",
                controller: 'WebsiteListController',
                controllerAs: 'model',
                resolve: {
                    loggedin: checkLogin
                }
            })
            .when("/user/:uid/website/new", {
                templateUrl: "views/websites/templates/website-new.view.client.html",
                controller: 'WebsiteNewController',
                controllerAs: 'model',
                resolve: {
                    loggedin: checkLogin
                }
            })
            .when("/user/:uid/website/:wid", {
                templateUrl: "views/websites/templates/website-edit.view.client.html",
                controller: 'WebsiteEditController',
                controllerAs: 'model',
                resolve: {
                    loggedin: checkLogin
                }
            })
            .when("/user/:uid/website/:wid/page", {
                templateUrl: "views/page/templates/page-list.view.client.html",
                controller: 'PageListController',
                controllerAs: 'model',
                resolve: {
                    loggedin: checkLogin
                }
            })
            .when("/user/:uid/website/:wid/page/new", {
                templateUrl: "views/page/templates/page-new.view.client.html",
                controller: 'PageNewController',
                controllerAs: 'model',
                resolve: {
                    loggedin: checkLogin
                }
            })
            .when("/user/:uid/website/:wid/page/:pid", {
                templateUrl: "views/page/templates/page-edit.view.client.html",
                controller: 'PageEditController',
                controllerAs: 'model',
                resolve: {
                    loggedin: checkLogin
                }
            })
            .when("/user/:uid/website/:wid/page/:pid/widget", {
                templateUrl: "views/widget/templates/widget-list.view.client.html",
                controller: 'WidgetListController',
                controllerAs: 'model',
                resolve: {
                    loggedin: checkLogin
                }
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/new", {
                templateUrl: "views/widget/templates/widget-chooser.view.client.html",
                controller: 'WidgetNewController',
                controllerAs: 'model',
                resolve: {
                    loggedin: checkLogin
                }
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/:wgid", {
                templateUrl: "views/widget/templates/widget-edit.view.client.html",
                controller: 'WidgetEditController',
                controllerAs: 'model',
                resolve: {
                    loggedin: checkLogin
                }
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/:wgid/flickr", {
                templateUrl: "views/widget/templates/widget-flickr-search.view.client.html",
                controller: 'FlickrImageSearchController',
                controllerAs: 'model',
                resolve: {
                    loggedin: checkLogin
                }
            })
            .otherwise({
                redirectTo: '/login'
            });
    }

    function checkLogin($q, $http, $location, $rootScope) {
        var deferred = $q.defer();
        $http.get('/api/loggedin')
            .success(function(user) {
                $rootScope.errorMessage = null;
                console.log("Already Logged in "+user);
                if(user != '0') {
                    $rootScope.currentUser = user;
                    deferred.resolve();
                } else {
                    $location.url('/');
                    deferred.reject();
                }
            });
        return deferred.promise;
    }
})();