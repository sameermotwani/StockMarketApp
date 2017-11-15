/**
 * Created by aniru on 2/28/2017.
 */
module.exports = function (app, models) {
    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.put("/api/page/:pageId/widget", reorderWidgets);
    app.post ("/api/upload", upload.single('myFile'), uploadImage);

    var widgetModel = models.widgetModel;

    function findAllWidgetsForPage(req, res){
        var pageId = req.params.pageId;

        widgetModel
            .findAllWidgetsForPage(pageId)
            .then(
                function (widgets) {
                    res.json(widgets);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function createWidget(req, res){
        var widget = req.body;
        widget.pageId = req.params.pageId;
        widgetModel
            .createWidget(req.params.pageId, widget)
            .then(
                function (widget) {
                    res.json(widget);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        widgetModel
            .findWidgetById(widgetId)
            .then(
                function (widget) {
                    res.json(widget);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function updateWidget(req, res) {
        var newWidget = req.body;
        var widgetId = req.params.widgetId;
        widgetModel
            .updateWidget(widgetId, newWidget)
            .then(
                function (widget) {
                    res.json(widget);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        widgetModel
            .deleteWidget(widgetId)
            .then(
                function (widget) {
                    res.json(widget);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function reorderWidgets(req, res) {
        var start = req.query.initial;
        var end = req.query.final;
        var pageId = req.params.pageId;

        widgetModel
            .reorderWidget(pageId, start, end)
            .then(
                function (widget) {
                    res.json(widget);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );

        /*var widgetArr = [];

        for(var w = widgets.length-1; w >= 0; w--) {
            console.log(w);
            if(widgets[w].pageId == pageId) {
                widgetArr.splice(0, 0, (widgets.splice(w, 1)[0]));
            }
        }

        console.log(widgetArr);

        if(start < end){
            widgetArr.splice(start, 0, widgetArr.splice(end, 1)[0]);
        }
        else if(start > end){
            widgetArr.splice(start-1, 0, widgetArr.splice(end, 1)[0]);
        }

        console.log("################################");
        console.log(widgetArr);

        console.log("################################");

        widgets = widgets.concat(widgetArr);

        console.log(widgets);

        console.log("Page Id "+pageId+":"+start+":"+end);
        res.sendStatus(200);*/
    }

    function uploadImage(req, res) {
        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var myFile        = req.file;


        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var pageId = req.body.pageId;

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        var widget = {};
        widget.url = '/uploads/'+filename;
        widget.width = width || "100%";
        widget.type = "IMAGE";

        widgetModel
            .updateWidget(widgetId, widget)
            .then(
                function (widget) {
                    var callbackUrl = "/assignment/#/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget";
                    res.redirect(callbackUrl);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }
};