/**
 * Created by aniru on 4/2/2017.
 */
module.exports = function () {

    var mongoose = require('mongoose');

    var StockSchema = mongoose.Schema({
        name: {type: String, required: true},
        ticker: {type: String, required: true}
    }, {collection: "project.stock"});

    return StockSchema;
};