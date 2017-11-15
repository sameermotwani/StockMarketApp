/**
 * Created by aniru on 3/21/2017.
 */
module.exports = function () {

    var mongoose = require('mongoose');
    var PageSchema = require('./page.schema.server.js')();
    var Page = mongoose.model('Page', PageSchema);

    var api = {
        createPage: createPage,
        findAllPagesForWebsite: findAllPagesForWebsite,
        findPageById: findPageById,
        updatePage: updatePage,
        deletePage: deletePage
    };
    return api;

    function createPage(websiteId, page) {
        page._website = websiteId;
        return Page.create(page);
    }

    function findAllPagesForWebsite(websiteId) {
        return Page.find({_website: websiteId});
    }

    function findPageById(pageId) {
        return Page.findById({_id: pageId});
    }

    function updatePage(pageId, page) {
        return Page
            .update({_id: pageId}, {
                $set: {
                    name: page.name,
                    title: page.title,
                    widgets: page.widgets
                }
            });
    }

    function deletePage(pageId) {
        return Page.remove({_id: pageId});
    }
};