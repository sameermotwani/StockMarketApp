/**
 * Created by aniru on 2/14/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .service("WidgetService", WidgetService);

    function WidgetService($http) {

        var api = {
            "createWidget": createWidget,
            "findWidgetById": findWidgetById,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget,
            "findWidgetsByPageId": findWidgetsByPageId,
            "reorderWidgets": reorderWidgets
        };
        return api;

        function findWidgetById(widgetId) {
            return $http.get("/api/widget/"+widgetId);
        }

        function findWidgetsByPageId(pageId) {
            return $http.get("/api/page/"+pageId+"/widget");
        }

        function updateWidget(widgetId, newWidget) {
            return $http.put("/api/widget/"+widgetId, newWidget);

        }
        function deleteWidget(widgetId) {
            return $http.delete("/api/widget/"+widgetId);
        }

        function createWidget(pageId, widget) {
            return $http.post("/api/page/"+pageId+"/widget", widget);
        }

        function reorderWidgets(pageId, start, end) {
            return $http.put("/api/page/"+pageId+"/widget?initial="+start+"&final="+end);
        }
    }
})();