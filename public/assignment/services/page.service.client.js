/**
 * Created by aniru on 2/14/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService($http) {

        var api = {
            "createPage": createPage,
            "findPageById": findPageById,
            "updatePage": updatePage,
            "deletePage": deletePage,
            "findPageByWebsiteId": findPageByWebsiteId
        };
        return api;

        function findPageById(pid) {
            return $http.get("/api/page/"+pid);
        }
        function updatePage(pageId, newPage) {
            return $http.put("/api/page/"+pageId, newPage);
        }
        function deletePage(pageId) {
            return $http.delete("/api/page/"+pageId);
        }
        function createPage(websiteId, page) {
            return $http.post("/api/website/"+websiteId+"/page", page);
        }
        function findPageByWebsiteId(websiteId) {
            return $http.get("/api/website/"+websiteId+"/page");
        }
    }
})();
