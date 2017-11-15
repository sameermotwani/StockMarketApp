/**
 * Created by aniru on 4/1/2017.
 */
(function () {
    angular
        .module('StockExchApp')
        .controller('HomeController', HomeController);

    function HomeController($rootScope,$location,PersonService,SharedService) {
        var vm = this;

        vm.getStockWidgetTemplateUrl = getStockWidgetTemplateUrl;
        vm.selectedStock = selectedStock;
        vm.register=register;

        vm.login=login;

        vm.stockWidgets = [
            'views/graph/templates/graph.view.client.html',
            'views/opinion/templates/opinion.view.client.html'
        ];

        function init() {
            $rootScope.ticker = $rootScope.ticker || 'NDAQ';
            console.log("The ticker in rootScope is "+$rootScope.ticker);
        }
        init();

        function getStockWidgetTemplateUrl(stockWidget) {
            return stockWidget;
        }

        function login(user) {
            if(user)
            {
                PersonService
                    .login(user)
                    .success(function (user) {
                        if (user) {
                            console.log("here");
                            $('#myModal').modal('hide');
                            $('body').removeClass('modal-open');
                            $('.modal-backdrop').remove();
                            if(user.role == "ADMIN")
                            {
                                $rootScope.currentUser = user;
                                $location.url("/admin");
                                console.log("Create User");
                                SharedService.user = user;
                            }
                            else{
                                $rootScope.currentUser = user;
                                SharedService.user = user;
                                console.log("Create User");
                                $location.url("/user/" + user._id +"/main");
                            }

                        } else {
                            console.log("here2");
                            vm.error = "User not found";
                        }
                    })
                    .error(function (err) {
                        // console.log("In .error")
                        vm.error = "User not found";
                    });
            }
            else
            {
                vm.error1 = "Please enter the required fields";
            }
        }

        function register(user) {
            if (user.password != user.verifypwd) {
                // $window.alert("Passwords do not match");
                vm.error1 = "Passwords do not match";

            }
            else {
                PersonService
                    .findUserByUsername(user.username)
                    .success(function (user) {
                        vm.message = "Username taken, please try another username";
                    })
                    .error(function (err) {
                        console.log("Test");
                        PersonService
                            .register(user)
                            .success(function (newuser) {
                                vm.message = "Username created succesfully";
                                $('#myModal1').modal('hide');
                                $('body').removeClass('modal-open');
                                $('.modal-backdrop').remove();
                                $location.url("/user/" + newuser._id +"/main");
                            });
                    });
            }
        }




        function selectedStock(stock) {
            if(stock){
                var ticker = stock.originalObject.ticker;
                $rootScope.ticker = ticker;
            }
        }



    }
})();