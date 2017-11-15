/**
 * Created by aniru on 4/1/2017.
 */
(function() {
    angular
        .module("StockExchApp")
        .config(configuration);

    function configuration($routeProvider, $httpProvider) {

        $httpProvider.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8';

        $routeProvider
            .when("/", {
                redirectTo: '/home'
            })
            .when("/home", {
                templateUrl: "views/home/templates/home.view.client.html",
                controller: 'HomeController',
                controllerAs: 'model'
            })
            .when("/admin", {
                templateUrl: "views/admin/templates/admin.view.client.html",
                controller: 'AdminController',
                controllerAs: 'model',
                resolve: { loggedin: checkAdmin }
            })
            .when("/login", {
                templateUrl: "views/user/templates/login.view.client.html",
                controller: 'LoginController',
                controllerAs: 'model'
            })
            .when("/register", {
                templateUrl: "views/user/templates/register.view.client.html",
                controller: 'RegisterController',
                controllerAs: 'model'
            })
            .when("/user/:uid", {
                templateUrl: "views/user/templates/profile.view.client.html",
                controller: 'ProfileController',
                controllerAs: 'model',
                resolve: { loggedin: checkLoggedin }

            })
            .when("/user/:uid/main", {
                templateUrl: "views/home/templates/main.view.client.html",
                controller: 'MainController',
                controllerAs: 'model',
                resolve: { loggedin: checkLoggedin }

            })
            .otherwise({
                    redirectTo: '/home',
                    //resolve: { loggedin: checkLoggedin }

                }
            );
    }


    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();
        $http.get('/api/project/loggedin').success(function(user) {
            console.log(user);
            $rootScope.errorMessage = null;
            if (user !== '0') {
                $rootScope.currentUser = user;
                console.log("HERESS");
                deferred.resolve();
            } else {
                console.log("HERESSaa");
                deferred.reject();
                $location.url('/');
            }
        });
        return deferred.promise;
    };

    var checkAdmin = function($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();
        $http.get('/api/project/loggedin').success(function(user) {
            console.log(user);
            $rootScope.errorMessage = null;
            if (user.role == 'ADMIN') {
                $rootScope.currentUser = user;
                console.log("HERESS");
                deferred.resolve();
            } else {
                console.log("HERESSaa");
                deferred.reject();
                $location.url('/user/'+user._id+'/main');
            }
        });
        return deferred.promise;
    };

})();