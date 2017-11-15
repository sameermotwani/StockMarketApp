/**
 * Created by aniru on 3/21/2017.
 */
module.exports = function () {

    var mongoose = require('mongoose');

    var WidgetSchema = mongoose.Schema({
        _page: {type: mongoose.Schema.ObjectId, ref:"Page"},
        type: {type: String, enum: ['HEADING', 'IMAGE', 'YOUTUBE', 'HTML', 'TEXT']},
        name: String,
        priority: Number,
        text: String,
        placeholder: String,
        description: String,
        url: String,
        width: {type: String, default: '100%'},
        height: String,
        rows: Number,
        size: Number,
        class: String,
        icon: String,
        deletable: Boolean,
        formatted: Boolean,
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "assignment.widget"});

    return WidgetSchema;
};