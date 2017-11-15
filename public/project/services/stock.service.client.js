/**
 * Created by samym on 4/14/2017.
 */
/**
 * Created by aniru on 2/13/2017.
 */
(function(){
    angular
        .module("StockExchApp")
        .factory('StockService', StockService);

    function StockService($http) {

        var api = {
            "findStockById":findStockById
        };
        return api;

        function findStockById(stockID) {
            console.log("InClient");
            console.log(stockID);
            return $http.get("/api/project/stockName/"+stockID);
        }
    }
})();