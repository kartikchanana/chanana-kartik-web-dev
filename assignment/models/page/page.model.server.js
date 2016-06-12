module.exports = function () {

    var mongoose = require("mongoose");
    var PageSchema = require("./page.schema.server")(mongoose);
    var Page = mongoose.model("Page", PageSchema);

    var api={
        findAllPagesForWebsite: findAllPagesForWebsite,
        createPage: createPage,
        findPageById: findPageById,
        deletePage: deletePage,
        updatePage: updatePage
    }
    return api;

    function updatePage(pageId, page){
        delete page._id;
        return Page
            .update({_id: pageId},{
                $set: {
                    name: page.name,
                    title: page.title
                }
            });
    }
    function deletePage(pageId) {
        return Page.remove({_id: pageId});
    }
    function findPageById(pageId) {
        return Page.findById(pageId);
    }
    function createPage(websiteId, page) {
        page._website = websiteId;
        return Page.create(page);
    }
    function findAllPagesForWebsite(websiteId) {
        return Page.find({"_website": websiteId});
    }
}