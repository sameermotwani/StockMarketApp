/**
 * Created by aniru on 2/14/2017.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetNewController", WidgetNewController);

    function WidgetNewController($routeParams, $location, WidgetService) {

        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetTypes = ["HTML","HEADING","YOUTUBE","IMAGE","TEXT"];
        vm.createWidget = createWidget;


        function createWidget(widgetType){
            WidgetService.createWidget(vm.pageId, {type: widgetType})
                .success(function (widget) {
                    vm.widget = widget;
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+widget._id);
                });
        }
    }
})();