/**
 * Created by aniru on 2/14/2017.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController", WidgetEditController);

    function WidgetEditController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;
        vm.getEditorTemplateUrl = getEditorTemplateUrl;
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        function init() {
            WidgetService.findWidgetById(vm.widgetId)
                .success(function (widget) {
                    vm.widget = widget;
                    if(!vm.widget) {
                        vm.widget = {widgetType: vm.widgetId};
                    }
                });

        }
        init();

        function getEditorTemplateUrl(type) {
            return 'views/widget/templates/editors/widget-'+type+'-editor.view.client.html';
        }

        function updateWidget(widget){
            if(!widget || !widget.text){
                vm.error = "Widget Text is required";
                return;
            }
            delete vm.error;
            WidgetService.updateWidget(vm.widgetId, widget)
                .success(function () {
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
                });
        }

        function deleteWidget(){
            WidgetService.deleteWidget(vm.widgetId)
                .success(function () {
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
                });
        }

    }
})();