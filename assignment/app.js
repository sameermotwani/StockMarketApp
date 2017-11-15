/**
 * Created by aniru on 2/28/2017.
 */
module.exports = function(app) {

    var mongoose = require("mongoose");

    // create a default connection string
    var connectionString = 'mongodb://127.0.0.1:27017/cs5610';

    // use remote connection string
    // if running in remote server
    if (process.env.MLAB_PASSWORD) {
        connectionString = process.env.MLAB_USERNAME + ":" +
            process.env.MLAB_PASSWORD + "@" +
            process.env.MLAB_HOST + ':' +
            process.env.MLAB_PORT + '/' +
            process.env.MLAB_APP_NAME;
        // connect to the database -- on OPENSHIFT
        mongoose.connect(connectionString);
    } else {
        // connect to local database
        mongoose.connect(connectionString);
    }

    var models = require("./models/model.server.js")();


    require("./services/user.service.server.js")(app, models);
    require("./services/website.service.server.js")(app, models);
    require("./services/page.service.server.js")(app, models);
    require("./services/widget.service.server.js")(app, models);
    require("./services/stock.service.server.js")(app, models);
    require("./services/opinion.service.server.js")(app, models);
    require("./services/person.service.server.js")(app, models);
};
