/**
 * Created by aniru on 4/2/2017.
 */
(function () {
    angular
        .module("StockExchApp")
        .factory("QuandlService", QuandlService);

    var key = "S1RVzQ6zeZ-QAbjQUyi6";
    var baseURL = 'https://www.quandl.com/api/v3/';

    function QuandlService($http) {
        var api = {
            getFinancialData: getFinancialData
        }
        return api;

        function getFinancialData(code) {
            var url = baseURL + 'datasets/DATABASE/DATA_CODE.json?start_date=2015-01-01&order=asc&auth_token=API_KEY';
            url = url
                .replace("API_KEY", key)
                .replace("DATABASE", 'WIKI')
                .replace("DATA_CODE", code);
            return $http.get(url);
        }

    }
})();