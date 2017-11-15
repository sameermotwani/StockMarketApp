/**
 * Created by samy on 3/21/2017.
 */
module.exports = function () {

    var mongoose = require('mongoose');

    var PersonSchema = mongoose.Schema({
        username: {type: String, required: true},
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        url: String,
        stocks:  [{type: mongoose.Schema.ObjectId, ref: 'Stock'}],
        role: {type: String, enum: ['USER', 'ANALYST', 'ADMIN'], default: 'USER'},
        dateCreated: {type: Date, default: Date.now},
        facebook: {
            id:    String,
            token: String
        }
    }, {collection: "project.person"});

    return PersonSchema
};