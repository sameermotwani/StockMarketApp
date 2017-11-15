/**
 * Created by aniru on 2/13/2017.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("loginController", loginController);

    function loginController(UserService, $location, $rootScope) {
        var vm = this;
        vm.login = login;

        function login(user) {
            $('input').removeClass("invalid-input");
            if(!user || (!user.username && !user.password)){
                vm.error = 'Please enter both Username and Password';
                $('input[placeholder=username]').addClass("invalid-input");
                $('input[placeholder=password]').addClass("invalid-input");
            }
            else if(!user.username){
                vm.error = 'Please enter Username';
                $('input[placeholder=username]').addClass("invalid-input");
            }
            else if(!user.password){
                vm.error = 'Please enter Password';
                $('input[placeholder=password]').addClass("invalid-input");
            }
            else{
                UserService
                    .login(user)
                    .then(
                        function (response) {
                            var user = response.data;
                            $rootScope.currentUser = user;
                            $location.url("/user/"+user._id);
                        },
                        function (err) {
                            if(err.status == 401){
                                vm.error = 'Invalid Username and Password. Please try again!'
                            }
                            else{
                                vm.error = err;
                            }
                        }
                    );
            }
        }
    }
})();