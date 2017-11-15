/**
 * Created by aniru on 4/12/2017.
 */
(function () {
    angular
        .module('StockExchApp')
        .controller('GraphController', GraphController);

    function GraphController($sce, $rootScope, $scope, $location, $anchorScroll, QuandlService, SharedService) {
        var vm = this;
        vm.getTrustedHtml = getTrustedHtml;

        var tickerListener = $rootScope.$watch("ticker",function (newVal) {
            if(newVal && newVal != vm.ticker) {
                vm.ticker = newVal;
                getStockData(newVal);
            }
        });

        $scope.$on('$destroy', function () {
            tickerListener();
            console.log("Destroyed Ticker listener in graph");
        });

        function getStockData(ticker) {
            QuandlService
                .getFinancialData(ticker)
                .then(function successCallback(response) {
                    console.log(response);

                    var data = response.data.dataset.data;

                    var chartData = [];

                    data.forEach(function (value) {
                        chartData.push({
                            x:new Date(value[0]).getTime(),
                            y:value[1]
                        })
                    });

                    $('#chartContainer').highcharts('StockChart', {
                        rangeSelector: {
                            selected: 1
                        },
                        title: {
                            text: response.data.dataset.name
                        },

                        plotOptions: {
                            series: {
                                cursor: 'pointer',
                                point: {
                                    events: {
                                        click: function () {
                                            findNewsOnDate(this.x);
                                        }
                                    }
                                }
                            }
                        },

                        series: [{
                            name: response.data.dataset.dataset_code,
                            data: chartData,
                            tooltip: {
                                valueDecimals: 2
                            },
                            turboThreshold: 10000
                        }]
                    });


                }, function errorCallback(response) {
                    console.log(response);
                });

        }

        function getTrustedHtml(html) {
            return $sce.trustAsHtml(html);
        }

        function findNewsOnDate(date) {
            $rootScope.$emit("dateChanged", {
                newsDate: date
            });
            $('html, body').animate({
                scrollTop: $("#specific_news").offset().top
            }, 1000);
        }

    }
})();