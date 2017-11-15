(function () {
    angular
        .module('WebAppMaker')
        .directive('wbdvSortable', sortableDir);

    function sortableDir() {
        function linkFunc(scope, element, attributes) {
            var startIndex = -1;
            var stopIndex = -1;
            element.sortable({
                axis: 'y',
                handle: '.glyphicon-align-justify',
                start: function (event, ui) {
                    startIndex = ui.item.index();
                },
                stop: function (event, ui) {
                    stopIndex = ui.item.index();
                    scope.reorderWidgets({start: startIndex, end: stopIndex});
                }
            });
        }
        return {
            scope: {
                reorderWidgets: "&"
            },
            link: linkFunc
        };
    }
    
})();