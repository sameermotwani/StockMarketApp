/**
 * Created by aniru on 4/10/2017.
 */
module.exports = function (app, models) {
    app.post("/api/project/opinion", createOpinion);
    app.get("/api/project/opinion/:opinionId", findOpinionById);
    app.put("/api/project/opinion/:opinionId", updateOpinion);
    app.delete("/api/project/opinion/:opinionId", deleteOpinion);
    app.get("/api/project/opinion", findAllOpinionsForTicker);
    app.get("/api/project/opinion?ticker=ticker", findAllOpinionsForTicker);

    var opinionModel = models.opinionModel;

    function findAllOpinionsForTicker(req, res) {
        var ticker = req.query.ticker;

        getResponseForTicker(ticker, res);
    }

    function getResponseForTicker(ticker, res){
        opinionModel
            .findAllOpinionsForTicker(ticker)
            .then(
                function (opinions) {
                    res.json(opinions);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function createOpinion(req, res){
        var opinion = req.body;
        opinionModel
            .createOpinion(opinion)
            .then(
                function (opinion) {
                    getResponseForTicker(opinion.ticker, res);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function findOpinionById(req, res){
        var pid = req.params.opinionId;

        opinionModel
            .findOpinionById(pid)
            .then(
                function (opinion) {
                    res.json(opinion);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function updateOpinion(req, res){
        var opinionId = req.params.opinionId;
        var newOpinion = req.body;

        opinionModel
            .updateOpinion(opinionId, newOpinion)
            .then(
                function (response) {
                    getResponseForTicker(newOpinion.ticker, res);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function deleteOpinion(req, res) {
        var opinionId = req.params.opinionId;
        console.log(res.body);
        opinionModel
            .deleteOpinion(opinionId)
            .then(
                function (opinion) {
                    res.json(opinion);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }
};