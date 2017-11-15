/**
 * Created by aniru on 3/21/2017.
 */
module.exports = function () {

    var mongoose = require('mongoose');

    var OpinionSchema = mongoose.Schema({
        comment: {type: String, required: true},
        _user: {type: mongoose.Schema.ObjectId, ref:"Person"},
        ticker: {type: String, required: true},
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "project.opinion"});

    return OpinionSchema;
};