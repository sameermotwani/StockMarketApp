/**
 * Created by aniru on 4/10/2017.
 */
(function () {
    angular
        .module('StockExchApp')
        .controller('OpinionController', OpinionController);

    function OpinionController($scope, $anchorScroll, $location, $rootScope, $routeParams, OpinionService) {
        var vm = this;
        vm.userId = $routeParams.uid;

        vm.addOpinion=addOpinion;
        vm.updateOpinion=updateOpinion;
        vm.deleteOpinion=deleteOpinion;
        vm.cancelUpdate=cancelUpdate;
        vm.editOpinion=editOpinion;
        vm.findAllOpinionsForTicker=findAllOpinionsForTicker;

        vm.editAccess = $rootScope.currentUser && $rootScope.currentUser.role == "ANALYST";

        var tickerListener = $rootScope.$watch("ticker",function (newVal) {
            if(newVal && newVal != vm.ticker){
                vm.ticker = newVal;
                findAllOpinionsForTicker(newVal);
            }
        });

        $scope.$on('$destroy', function () {
            tickerListener();
            console.log("Destroyed Ticker listener in opinion");
        });

        function addOpinion(opinion){
            if(!opinion || !opinion.comment){
                vm.error = "Please add a comment";
                return;
            }
            else if(!vm.ticker) {
                vm.error = "Error in fetching the ticker";
                return;
            }
            opinion.ticker = vm.ticker;
            opinion._user = vm.userId;
            OpinionService
                .addOpinion(opinion)
                .then(function (response) {
                    displayAllOpinions(response.data);
                    delete vm.opinion;
                });
        }

        function updateOpinion(opinion) {
            OpinionService
                .updateOpinion(opinion._id, opinion)
                .success(function (response) {
                    displayAllOpinions(response);
                    scrollToLocation('op' + opinion._user._id);
                    delete vm.opinion;
                    delete vm.editMode;
                });
        }

        function editOpinion(opinion){
            vm.opinion = opinion;
            vm.editMode=true;
            scrollToLocation('form');
        }

        function cancelUpdate(opinion) {
            delete vm.opinion;
            delete vm.editMode;
            scrollToLocation('op' + opinion._user._id);
        }

        function deleteOpinion(opinionId) {
            OpinionService
                .deleteOpinion(opinionId)
                .success(function (response) {
                    findAllOpinionsForTicker(vm.ticker);
                });
        }
        
        function findAllOpinionsForTicker(ticker) {
            OpinionService
                .findOpinionByTicker(ticker)
                .success(function (response) {
                    displayAllOpinions(response);
                });
        }

        function scrollToLocation(hash) {
            if($location.hash() !== hash) {
                $location.hash(hash);
            }
            else {
                $anchorScroll();
            }
        }

        function displayAllOpinions(opinions) {
            vm.opinions = opinions;
            if(opinions && opinions.length){
                delete vm.noOpinion;
            }
            else {
                vm.noOpinion = "No Opinion on this Security";
            }
        }

    }
})();