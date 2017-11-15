/**
 * Created by aniru on 4/2/2017.
 */
module.exports = function () {

    var mongoose = require('mongoose');
    var StockSchema = require('./stock.schema.server.js')();
    var Stock = mongoose.model('Stock', StockSchema);

    var api = {
        findStockById: findStockById,
        findStockByTicker: findStockByTicker,
        findStockByName: findStockByName,
        findAllStocks: findAllStocks
    };
    return api;

    function findStockById(stockId) {
        console.log(stockId);
        return Stock.findOne({_id: stockId});
    }

    function findStockByTicker(ticker) {
        return Stock.findOne({ticker: ticker});
    }

    function findStockByName(name) {
        return Stock.findOne({name: name});
    }

    function findAllStocks() {
        return Stock.find();
    }
};