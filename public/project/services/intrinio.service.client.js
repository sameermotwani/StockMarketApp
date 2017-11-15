/**
 * Created by samym on 4/6/2017.
 */
(function () {
    angular
        .module("StockExchApp")
        .factory("IntrinioService", IntrinioService);

    function IntrinioService($http) {
        var api = {
            getNewsData: getNewsData
        }
        return api;

        function getNewsData(ticker) {
            return $http.get("/api/project/news?ticker="+ticker);
        }
    }
})();