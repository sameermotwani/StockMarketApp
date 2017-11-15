/**
 * Created by aniru on 3/21/2017.
 */
module.exports = function () {

    var models = {
        userModel: require("./user/user.model.server.js")(),
        websiteModel: require("./website/website.model.server.js")(),
        pageModel: require("./page/page.model.server.js")(),
        widgetModel: require("./widget/widget.model.server.js")(),
        personModel: require("./person/person.model.server.js")(),
        stockModel: require("./stock/stock.model.server.js")(),
        opinionModel:  require("./opinion/opinion.model.server.js")()
    }
    return models;
};