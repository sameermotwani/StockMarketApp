/**
 * Created by aniru on 4/2/2017.
 */
(function () {
    angular
        .module("StockExchApp")
        .factory("XigniteService", XigniteService);

    //var key = "A865922A6D9D4AF3B07CE02BA5F43D55";
    var key= "0C9534C046A54BE6A9022CC67370B2CF"
    var baseURL= 'https://globalnews.xignite.com/xGlobalNews.json/GetHistoricalReleasesBySecurity?IdentifierType=Symbol&Identifier=';

    function XigniteService($http,$sce) {
        var api = {
            getNewsData: getNewsData,
            dateToYMD:dateToYMD
        };
        return api;


        function dateToYMD(date) {
            var d = date.getUTCDate();
            var m = date.getUTCMonth() + 1;
            var y = date.getFullYear();
            return '' + y + '/' + (m<=9 ? '0' + m : m) + '/' + (d <= 9 ? '0' + d : d);
        }

        function getNewsData(date,ticker) {
            console.log('Date');
            var startDate = dateToYMD(new Date(date.setDate(date.getDate()-15)));
            var endDate = dateToYMD(new Date(date.setDate(date.getDate()+30)));

            var url = baseURL + "ticker" + '&StartDate=' + "STARTDATE" + '&EndDate='+ "ENDDATE" + '&_token=API_KEY&_callback=JSON_CALLBACK';
            url = url
                .replace("API_KEY", key)
                .replace("STARTDATE", startDate)
                .replace("ENDDATE", endDate)
                .replace("ticker", ticker);
            console.log(url);
            $sce.trustAsResourceUrl(url);
            return $http({
                method: 'JSONP',
                url: url,
                params: {
                    format: 'jsonp',
                    json_callback: 'JSON_CALLBACK'
                }
            })

        }



    }

})();