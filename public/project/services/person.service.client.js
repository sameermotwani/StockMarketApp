/**
 * Created by aniru on 2/13/2017.
 */
(function(){
    angular
        .module("StockExchApp")
        .factory('PersonService', personService);

    function personService($http) {

        var api = {
            "updateUser": updateUser,
            "findAllUsers":findAllUsers,
            "createUser": createUser,
            "deleteUser": deleteUser,
            "updateUserfromAdmin":updateUserfromAdmin,
            "getStocksForUser":getStocksForUser,
            "findUserByCredentials": findUserByCredentials,
            "findUserById": findUserById,
            "findUserByUsername": findUserByUsername,
            "login": login,
            "logout": logout,
            "register": register,
            "loggedIn": loggedIn,
            "addToFavs":addToFavs
        };
        return api;

        function createUser(user) {
            return $http.post("/api/project/person/",user);
        }

        function addToFavs(userId,tickr) {
            console.log(tickr);
            var obj={
                id:userId,
                tickr:tickr
            }
            return $http.post("/api/project/favs/",obj);
        }

        function updateUser(userId, newUser) {
            return $http.put("/api/project/person/"+userId, newUser);
        }

        function updateUserfromAdmin(userId,user) {
            return $http.put("/api/project/person/"+userId, user);
        }
        function findUserById(uid) {
            return $http.get("/api/project/person/"+uid);
        }

        function findUserByUsername(userName) {
            console.log("Yes");
            return $http.get("/api/project/person?username="+userName);
        }

        function findUserByCredentials(username, password) {
            return $http.get("/api/project/person?username="+username+"&password="+password);
        }

        function deleteUser(uid) {
            return $http.delete("/api/project/person/"+uid);
        }

        function getStocksForUser(userid)
        {
            return $http.get("/api/project/stocks/"+userid);
        }
        function login(user) {
            return $http.post("/api/project/login", user);
        }
        
        function logout() {
            return $http.post("/api/project/logout");
        }

        function findAllUsers(user) {
            return $http.get("/api/project/all", user);
        }
        function register(newUser) {
            return $http.post("/api/project/register", newUser);
        }
        
        function loggedIn() {
            return $http.get("/api/project/loggedin");
        }
    }
})();