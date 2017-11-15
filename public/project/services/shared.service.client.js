/**
 * Created by aniru on 4/13/2017.
 */
(function() {
    angular
        .module("StockExchApp")
        .service('SharedService', SharedService);

    function SharedService($http) {
        this.sharedData = {
            ticker: 'NDAQ',
            newsDate: undefined,
            inFavs: false
        };
        this.user = {};
        this.stocks=[];
    }
})();