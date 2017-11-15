/**
 * Created by aniru on 2/14/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService($http) {
        var api = {
            "createWebsite": createWebsite,
            "findWebsiteById": findWebsiteById,
            "updateWebsite": updateWebsite,
            "deleteWebsite": deleteWebsite,
            "findWebsitesByUser": findWebsitesByUser
        };
        return api;

        function findWebsiteById(wid) {
            return $http.get("/api/website/"+wid);
        }
        function updateWebsite(websiteId, newWebsite) {
            return $http.put("/api/website/"+websiteId, newWebsite);
        }
        function deleteWebsite(websiteId) {
            return $http.delete("/api/website/"+websiteId);
        }

        function createWebsite(userId, website) {
            return $http.post("/api/user/"+userId+"/website", website);
        }

        function findWebsitesByUser(userId) {
            return $http.get("/api/user/"+userId+"/website");
        }
    }
})();