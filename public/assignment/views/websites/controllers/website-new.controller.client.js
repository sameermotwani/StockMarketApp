/**
 * Created by aniru on 2/14/2017.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController", WebsiteNewController);

    function WebsiteNewController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.createWebsite = createWebsite;

        function init() {
            WebsiteService.findWebsitesByUser(vm.userId)
                .success(function(websites){
                    vm.websites = websites;
                });
        }
        init();

        function createWebsite (website) {
            if(!website || !website.name){
                vm.error = "Website name is required";
                return;
            }
            delete vm.error;
            WebsiteService.createWebsite(vm.userId, website)
                .success(function () {
                    $location.url("/user/"+vm.userId+"/website");
                });
        };
    }
})();