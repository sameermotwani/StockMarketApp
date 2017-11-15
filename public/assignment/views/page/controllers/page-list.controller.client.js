/**
 * Created by aniru on 2/14/2017.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController($routeParams, PageService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;

        function init() {
            var promise = PageService.findPageByWebsiteId(vm.websiteId);;
            promise.success(function(pages){
                vm.pages = pages;
            });
        }
        init();
    }
})();