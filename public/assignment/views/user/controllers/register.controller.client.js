/**
 * Created by aniru on 2/13/2017.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("registerController", registerController);

    function registerController($location, UserService, $rootScope) {
        var vm = this;
        vm.createUser = createUser;


        function createUser (user) {
            if(!user){
                vm.error = "Please enter username and password";
            }
            else if(!user.username){
                vm.error = "Please enter username";
            }
            else if(!user.password || !user.vpassword){
                vm.error = "Please enter a password";
            }
            else if(user.password !== user.vpassword){
                vm.error = "Password and Verify Password don't match";
            }
            else {
                delete user.vpassword;
                UserService
                    .register(user)
                    .then(
                        function (response) {
                            var user = response.data;
                            $rootScope.currentUser = user;
                            $location.url("/user/"+user._id);
                        },
                        function (err) {
                            vm.error = err;
                        }

                    );
            }
        };
    }
})();