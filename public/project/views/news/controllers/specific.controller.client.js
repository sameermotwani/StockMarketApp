/**
 * Created by aniru on 4/12/2017.
 */
(function () {
    angular
        .module('StockExchApp')
        .controller('SpecificController', SpecificController);

    function SpecificController($rootScope, $scope, XigniteService, SharedService) {
        var vm = this;

        var tickerListener = $rootScope.$watch('ticker', function (newData, oldData) {
            console.log("Specific ticker changed" + newData + oldData);
            vm.ticker = newData;
            delete vm.headlines;
            vm.header = "No News";
            vm.noHeadlines = "Please select a date on the graph for searching news on that date.";
        });

        var dateListener = $rootScope.$on('dateChanged', function (event, data) {
            var date = new Date(data.newsDate);
            console.log("Specific: date changed event fired" + date);
            vm.header = "News around " + dateToDMY(date);
            getNewsOnDate(date);
            $scope.$apply();
        });

        $scope.$on('$destroy', function () {
            tickerListener();
            dateListener();
            console.log("Destroyed Ticker listener in specific");
        });

        function getNewsOnDate(date) {
            XigniteService
                .getNewsData(date,vm.ticker)
                .then(function callback(response)
                {
                    vm.headlines=response.data.Headlines;
                    console.log(response);
                    if(!vm.headlines || !vm.headlines.length){
                        vm.noHeadlines = "No news found for this date.";
                    }
                    else {
                        delete vm.noHeadlines;
                    }
                }, function errorCallback(response) {
                    console.log("error");
                    vm.noHeadlines = "Error while fetching news.";
                    console.log(response);
                });
        }

        function dateToDMY(date) {
            var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
            ];
            var d = date.getUTCDate();
            var m = monthNames[date.getUTCMonth()];
            var y = date.getFullYear();
            return '' + (d <= 9 ? '0' + d : d) + ' ' + m + ' ' + y;
        }



    }
})();

