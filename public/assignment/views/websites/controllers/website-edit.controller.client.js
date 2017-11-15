/**
 * Created by aniru on 2/14/2017.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", WebsiteEditController);

    function WebsiteEditController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.deleteWebsite = deleteWebsite;
        vm.updateWebsite = updateWebsite;

        function init() {
            WebsiteService.findWebsitesByUser(vm.userId)
                .success(function(websites){
                    vm.websites = websites;
                });
            WebsiteService.findWebsiteById(vm.websiteId)
                .success(function (website) {
                    vm.website = website;
                });
        }
        init();

        function deleteWebsite () {
            WebsiteService.deleteWebsite(vm.websiteId)
                .success(function(){
                    $location.url("/user/"+vm.userId+"/website");
                })
        };

        function updateWebsite(newWebsite){
            if(!newWebsite || !newWebsite.name){
                vm.error = "Website name is required";
                return;
            }
            delete vm.error;
            WebsiteService.updateWebsite(vm.websiteId, newWebsite)
                .success(function () {
                    $location.url("/user/"+vm.userId+"/website");
                });

        }
    }
})();