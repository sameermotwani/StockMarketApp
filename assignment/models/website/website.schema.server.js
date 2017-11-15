/**
 * Created by aniru on 3/21/2017.
 */
module.exports = function () {

    var mongoose = require('mongoose');
    var PageSchema = require("../page/page.schema.server.js")(mongoose);

    var WebsiteSchema = mongoose.Schema({
        _user: {type: mongoose.Schema.ObjectId, ref:"User"},
        name: {type: String, required: true},
        description: String,
        pages: [PageSchema],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "assignment.website"});

    return WebsiteSchema;
};