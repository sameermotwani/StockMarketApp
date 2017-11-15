/**
 * Created by aniru on 4/2/2017.
 */
module.exports = function (app, models) {
    app.get("/api/project/stock", findStock);
    app.get("/api/project/news", getNews);
    app.get("/api/project/stockName/:stockID", findStockName);

    var stockModel = models.stockModel;

    function getNews(req,res){
        console.log("HERE");
        var https = require("https");
        var ticker=req.query.ticker;
        var date=new Date(req.query.time);
        //console.log(date);
        //var startDate = date.setMonth(date.getMonth()-1);
        //var endDate = date.setMonth(date.getMonth()+1);
        //console.log(startDate);
        //console.log(endDate);
        //console.log(date);
        var username = process.env.INTRINIO_USERNAME;
        var password = process.env.INTRINIO_PASSWORD;
        var auth = "Basic " + new Buffer(username + ':' + password).toString('base64');
        var count=0;
       // https://api.intrinio.com/companies?identifier=AA
        var request = https.request({
            method: "GET",
            host: "api.intrinio.com",
            path: "/news?identifier=" + ticker + "&page_size=10",
            headers: {
                "Authorization": auth
            }
        }, function(response) {
            var json = "";
           // console.log(request);
            response.on('data', function (chunk) {
                json += chunk;
            });
            response.on('end', function() {
               var company = JSON.parse(json);
                //console.log(company);
                   //res.sendStatus(200);
                res.json(company);
            });
        });
       request.end();
       //res.json(company);
       //res.sendStatus(200);
    }

    function findStockName(req,res) {
        var tickr = req.params.stockID;
        console.log("YAYAYYA");
        stockModel
            .findStockById(tickr)
            .then(
                function (stock) {
                    res.json(stock.ticker);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }


    function findStock(req, res) {
        var searchTerm = req.query.search;
        stockModel
            .findAllStocks()
            .then(
                function (stocks) {
                    var matches = [];
                    stocks.forEach(function (stock) {
                        if(stock.ticker.toLowerCase().indexOf(searchTerm.toString().toLowerCase()) >= 0 ||
                            stock.name.toLowerCase().indexOf(searchTerm.toString().toLowerCase()) >= 0) {
                            matches.push(stock);
                        }
                    });
                    res.json({results:matches});
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }
};
