/**
 * Created by aniru on 3/21/2017.
 */
module.exports = function () {

    var mongoose = require('mongoose');

    var UserSchema = mongoose.Schema({
        username: {type: String, required: true},
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        role: {type: String, enum: ['USER', 'ANALYST', 'ADMIN'], default: 'USER'},
        dateCreated: {type: Date, default: Date.now},
        facebook: {
            id:    String,
            token: String
        }
    }, {collection: "assignment.user"});

    return UserSchema
};