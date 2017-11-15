/**
 * Created by aniru on 4/10/2017.
 */
(function(){
    angular
        .module("StockExchApp")
        .factory('UserService', userService);

    function userService($http) {

        var api = {
            "updateUser": updateUser,
            "createUser": createUser,
            "deleteUser": deleteUser,
            "findUserByCredentials": findUserByCredentials,
            "findUserById": findUserById,
            "findUserByUsername": findUserByUsername,
            "login": login,
            "logout": logout,
            "register": register,
            "loggedIn": loggedIn
        };
        return api;

        function createUser(user) {
            return $http.post("/api/user/",user);
        }

        function updateUser(userId, newUser) {
            return $http.put("/api/user/"+userId, newUser);
        }

        function findUserById(uid) {
            return $http.get("/api/user/"+uid);
        }

        function findUserByUsername(userName) {
            return $http.get("/api/user?username="+userName);
        }

        function findUserByCredentials(username, password) {
            return $http.get("/api/user?username="+username+"&password="+password);
        }

        function deleteUser(uid) {
            return $http.delete("/api/user/"+uid);
        }

        function login(user) {
            return $http.post("/api/login", user);
        }

        function logout() {
            return $http.post("/api/logout");
        }

        function register(newUser) {
            return $http.post("/api/register", newUser);
        }

        function loggedIn() {
            return $http.get("/api/loggedin");
        }
    }
})();