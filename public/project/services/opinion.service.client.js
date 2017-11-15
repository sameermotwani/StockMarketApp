/**
 * Created by aniru on 4/10/2017.
 */
(function () {
    angular
        .module("StockExchApp")
        .factory("OpinionService", OpinionService);

    function OpinionService($http) {

        var api = {
            "addOpinion": addOpinion,
            "updateOpinion": updateOpinion,
            "findOpinionById": findOpinionById,
            "findOpinionByTicker": findOpinionByTicker,
            "deleteOpinion": deleteOpinion
        };
        return api;

        function addOpinion(opinion) {
            return $http.post("/api/project/opinion", opinion);
        }

        function updateOpinion(opinionId, opinion) {
            return $http.put("/api/project/opinion/" + opinionId, opinion);
        }

        function findOpinionById(oid) {
            return $http.get("/api/project/opinion/" + oid);
        }

        function findOpinionByTicker(ticker) {
            return $http.get("/api/project/opinion?ticker=" + ticker);
        }

        function deleteOpinion(uid) {
            return $http.delete("/api/project/opinion/" + uid);
        }
    }
})();