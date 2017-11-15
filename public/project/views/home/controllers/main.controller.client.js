/**
 * Created by aniru on 4/12/2017.
 */
(function () {
    angular
        .module('StockExchApp')
        .controller('MainController', MainController);

    function MainController($scope, $rootScope,$routeParams,$location,PersonService, SharedService) {
        var vm = this;

        vm.getStockWidgetTemplateUrl = getStockWidgetTemplateUrl;
        vm.selectedStock = selectedStock;
        vm.logout=logout;
        vm.addToFavs=addToFavs;
        vm.deleteFromFavs=deleteFromFavs;
        vm.getStockPageforFav=getStockPageforFav;
        vm.updateUser=updateUser;

        vm.userId = $routeParams["uid"];
        vm.user = $rootScope.currentUser;
        var user=$rootScope.currentUser;

        vm.stockWidgets = [
            'views/graph/templates/graph.view.client.html',
            'views/opinion/templates/opinion.view.client.html'
        ];

        $rootScope.ticker = $rootScope.ticker || 'NDAQ';
        showFavorites();
        console.log("The ticker in rootScope is "+$rootScope.ticker);

        function updateUser(newUser) {
            PersonService
                .updateUser(vm.userId, newUser)
                .success(function (user) {
                    if(user != null) {
                        vm.message = "User Successfully Updated!";
                    } else {
                        vm.error = "Unable to update user";
                    }
                });
        }

        function getStockWidgetTemplateUrl(stockWidget) {
            return stockWidget;
        }

        function logout() {
            PersonService
                .logout()
                .then(
                    function(response) {
                        $rootScope.currentUser = null;
                        $location.url("/");
                    })
        }

        function selectedStock(stock) {
            console.log("Yes");
            console.log(stock);
            if(stock){
                var ticker = stock.originalObject.ticker;
                $rootScope.ticker = ticker;
                showFavorites();
            }
        }

        function getStockPageforFav(stock) {
            console.log("Yes");
            console.log(stock);
            if(stock){
                //var ticker = stock.originalObject.ticker;
                $rootScope.ticker = stock;
                showFavorites();
            }
        }
        
        function showFavorites() {
            var stocks = $rootScope.currentUser && $rootScope.currentUser.stocks;
            vm.showAddToFav = stocks.some(containsTicker);
            if(stocks && stocks.length) {
                delete vm.noFavs;
            }
            else {
                vm.noFavs = "No Favorites";
            }
        }

        function deleteFromFavs() {
            var index = $rootScope.currentUser.stocks.findIndex(containsTicker);
            if(index != -1){
                $rootScope.currentUser.stocks.splice(index, 1);
                updateUser($rootScope.currentUser);
                showFavorites();
            }
        }

        function addToFavs () {
            console.log("Here");
            if($rootScope.currentUser.stocks.some(containsTicker)){
                console.log("Security Already Present");
                return;
            }

            vm.userId = $routeParams["uid"];
            PersonService
                .addToFavs(vm.userId,$rootScope.ticker)
                .then(
                    function(response) {
                        getUserStocks();
                    })
        }

        function getUserStocks() {
            var userId = $routeParams["uid"];
            PersonService
                .getStocksForUser(userId)
                .then(function(res){
                    $rootScope.currentUser = res.data;
                    showFavorites();
                });
        }

        function containsTicker(element){
            return element && element.ticker == $rootScope.ticker;
        }
    }
})();