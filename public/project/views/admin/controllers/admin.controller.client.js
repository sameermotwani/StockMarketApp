(function () {
    angular
        .module('StockExchApp')
        .controller('AdminController', AdminController);
    
    function AdminController($location,$rootScope, $window, PersonService) {
        var model = this;

        model.deleteUser = deleteUser;
        model.updateUser = updateUser;
        model.register = register;
        model.logout=logout;

        function init() {
            user= $rootScope.currentUser;
            console.log("init");
            console.log(user);
            findAllUsers(user);
        }
        init();

        function updateUser(user) {
            PersonService
                .updateUserfromAdmin(user._id,user)
                .then(findAllUsers);
        }

        function register(user) {
            PersonService
                .register(user)
                .then(findAllUsers);
            //$routeScope.reload();
        }

        function logout() {
            PersonService
                .logout()
                .then(
                    function(response) {
                        $rootScope.currentUser = null;
                        $location.url("/");
                    })
        }

        // function moveToAdminPage()
        // {
        //     $location.url("/admin");
        // }
        function findAllUsers() {
            PersonService.findAllUsers()
                .then(function callback(response) {
                    console.log("success");
                    model.users = response.data;
                });
        }

        function deleteUser(user) {
            PersonService
                .deleteUser(user._id)
                .then(findAllUsers);
        }
    }
})();