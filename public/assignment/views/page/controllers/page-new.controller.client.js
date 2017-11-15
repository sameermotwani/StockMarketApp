/**
 * Created by aniru on 2/14/2017.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("PageNewController", PageNewController);

    function PageNewController($routeParams, $location, PageService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.createPage = createPage;

        function init() {
            PageService.findPageByWebsiteId(vm.websiteId)
                .success(function (pages) {
                    vm.pages = pages;
                });
        }
        init();

        function createPage (page) {
            if(!page || !page.name){
                vm.error = "Page name is required.";
                return;
            }
            delete vm.error;
            PageService.createPage(vm.websiteId, page)
                .success(function () {
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                });
        };
    }
})();