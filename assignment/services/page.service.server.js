/**
 * Created by aniru on 2/28/2017.
 */
module.exports = function (app, models) {
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    var pageModel = models.pageModel;

    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params.websiteId;

        pageModel
            .findAllPagesForWebsite(websiteId)
            .then(
                function (pages) {
                    res.json(pages);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function createPage(req, res){
        var page = req.body;

        pageModel
            .createPage(req.params.websiteId, page)
            .then(
                function (page) {
                    res.json(page);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function findPageById(req, res){
        var pid = req.params.pageId;

        pageModel
            .findPageById(pid)
            .then(
                function (page) {
                    res.json(page);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function updatePage(req, res){
        var pageId = req.params.pageId;
        var newPage = req.body;

        pageModel
            .updatePage(pageId, newPage)
            .then(
                function (page) {
                    res.json(page);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function deletePage(req, res) {
        var pageId = req.params.pageId;

        pageModel
            .deletePage(pageId)
            .then(
                function (page) {
                    res.json(page);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

};