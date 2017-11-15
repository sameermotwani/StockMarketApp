/**
 * Created by aniru on 2/13/2017.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("profileController", profileController);

    function profileController($routeParams, UserService, $location, $rootScope) {
        var vm = this;

        vm.update = updateUser;
        vm.logout = logout;
        vm.user = $rootScope.currentUser;

        var userId = $routeParams['uid'];

        function updateUser(newUser) {
            UserService
                .updateUser(userId, newUser)
                .then(
                    function (user) {
                        if(user == null) {
                            vm.error = "Unable to update user";
                        } else {
                            vm.message = "User successfully updated";
                        }
                    }
                );
        };

        function logout() {
            UserService
                .logout()
                .then(function (response) {
                    $rootScope.currentUser = null;
                    $location.url('/login');
                });
        }

    }
})();