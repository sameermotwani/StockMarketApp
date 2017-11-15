/**
 * Created by aniru on 4/12/2017.
 */
(function () {
    angular
        .module('StockExchApp')
        .controller('LatestController', LatestController);

    function LatestController($rootScope, $scope, IntrinioService) {
        var vm = this;

        var tickerListener = $rootScope.$watch('ticker',function (newData) {
            if(newData && newData != vm.ticker) {
                delete vm.noHeadlines;
                vm.ticker = newData;
                getLatestNewsFeed(newData);
            }
        });

        $scope.$on('$destroy', function () {
            tickerListener();
            console.log("Destroyed Ticker listener in latest");
        });

        function getLatestNewsFeed(ticker) {
            IntrinioService
                .getNewsData(ticker)
                .then(function (response) {
                    console.log(response.data.data);
                    vm.recentheadlines = response.data.data;
                    if(!vm.recentheadlines.length){
                        vm.noHeadlines = "No news found for this security.";
                    }
                }, function (response) {
                    console.log("error");
                    vm.noHeadlines = "Error while fetching latest news";
                    console.log(response);
                });
        }

    }
})();

