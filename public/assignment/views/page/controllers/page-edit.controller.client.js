/**
 * Created by aniru on 2/14/2017.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("PageEditController", PageEditController);

    function PageEditController($routeParams, $location, PageService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.deletePage = deletePage;
        vm.updatePage = updatePage;

        function init() {
            PageService.findPageByWebsiteId(vm.websiteId)
                .success(function (pages) {
                    vm.pages = pages;
                });
            PageService.findPageById(vm.pageId)
                .success(function (page) {
                    vm.page = page;
                });
        }
        init();

        function deletePage () {
            PageService.deletePage(vm.pageId)
                .success(function () {
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                });
        };

        function updatePage(newPage){
            if(!newPage || !newPage.name){
                vm.error = "Page name is required.";
                return;
            }
            delete vm.error;
            PageService.updatePage(vm.pageId, newPage)
                .success(function () {
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                });
        };
    }
})();