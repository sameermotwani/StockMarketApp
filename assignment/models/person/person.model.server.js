/**
 * Created by aniru on 3/21/2017.
 */
module.exports = function () {

    var mongoose = require('mongoose');
    var PersonSchema = require('./person.schema.server.js')();
    var Person = mongoose.model('Person', PersonSchema);

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByCredentials: findUserByCredentials,
        findAllUsers:findAllUsers,
        findUserByUsername: findUserByUsername,
        updateUser: updateUser,
        deleteUser: deleteUser,
        addTickr:addTickr,
        findUserByFacebookId: findUserByFacebookId
    };
    return api;

    function createUser(user) {
        user.url="/uploads/ac38118406bac7d64f6c4dc405859fc1";
        return Person.create(user);
    }

    function findUserById(userId) {
        return Person.findById({_id: userId}).populate('stocks');
    }

    function findUserByCredentials(username, password) {
        return Person.findOne({username: username, password: password});
    }

    function findUserByUsername(username) {
        return Person.findOne({username: username});
    }

    function findAllUsers() {
        return Person.find();
    }

    function addTickr(userId,stock){
        console.log("INSIDE");
        console.log(userId);
        return Person
            .findById(userId, function (err, person) {
                person.stocks.push(stock);
                person.save();
            });

    }

    function updateUser(userId, user) {
        return Person
            .update({_id: userId}, {
                $set: {
                    firstName: user.firstName,
                    username: user.username,
                    lastName: user.lastName,
                    email: user.email,
                    phone: user.phone,
                    role: user.role,
                    url: user.url,
                    stocks: user.stocks
                }
            });
    }

    // Removes user instance whose _id is equal to parameter userId
    function deleteUser(userId) {
        return Person.remove({_id: userId});
    }

    function findUserByFacebookId(facebookId) {
        return Person.findOne({'facebook.id': facebookId});
    }
};