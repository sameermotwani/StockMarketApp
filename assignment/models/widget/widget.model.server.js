/**
 * Created by aniru on 3/21/2017.
 */
module.exports = function () {

    var mongoose = require('mongoose');
    var WidgetSchema = require('./widget.schema.server.js')();
    var Widget = mongoose.model('Widget', WidgetSchema);

    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        reorderWidget: reorderWidget
    };
    return api;

    // Creates a new widget instance for user whose _id is pageId
    function createWidget(pageId, widget) {
        widget._page = pageId;
        return Widget
            .find({_page: pageId})
            .then(
                function (widgets) {
                    var priority = widgets.length;
                    widget.priority = priority;
                    return Widget.create(widget);
                });
    }

    // Retrieves all widget instances for user whose  _id is pageId
    function findAllWidgetsForPage(pageId) {
        return Widget.find({_page: pageId}).sort({priority: 1});
    }

    // Retrieves single widget instance whose _id is widgetId
    function findWidgetById(widgetId) {
        return Widget.findById({_id: widgetId});
    }

    // Updates widget instance whose _id is widgetId
    function updateWidget(widgetId, widget) {
        console.log(widget);
        if (widget.type === "HEADING") {
            return Widget
                .update({_id: widgetId}, {
                    $set: {
                        name: widget.name,
                        text: widget.text,
                        size: widget.size
                    }
                });
        } else if (widget.type === "IMAGE") {
            return Widget
                .update({_id: widgetId}, {
                    $set: {
                        name: widget.name,
                        text: widget.text,
                        url: widget.url,
                        width: widget.width,
                        fileName: widget.fileName
                    }
                });
        } else if (widget.type === "YOUTUBE") {
            return Widget
                .update({_id: widgetId}, {
                    $set: {
                        name: widget.name,
                        text: widget.text,
                        url: widget.url,
                        width: widget.width
                    }
                });
        } else if (widget.type === "TEXT") {
            return Widget
                .update({_id: widgetId}, {
                    $set: {
                        name: widget.name,
                        text: widget.text,
                        rows: widget.rows,
                        placeholder: widget.placeholder,
                        formatted: widget.formatted
                    }
                });
        } else {
            return Widget
                .update({_id: widgetId}, {
                    $set: {
                        name: widget.name,
                        text: widget.text
                    }
                });
        }
    }

    // Removes widget instance whose _id is widgetId
    function deleteWidget(widgetId) {
        return Widget.remove({_id: widgetId});
    }

    //    Modifies the order of widget at position start into final position end in page whose _id is pageId
    function reorderWidget(pageId, start, end) {
        console.log("Reordering");
        return Widget
            .find({_page: pageId})
            .then(function (widgets) {
                widgets.forEach(function (widget) {
                    console.log("Testing for widget "+widget.priority+start+end);
                    if (start > end) {
                        if (widget.priority >= end && widget.priority < start) {
                            widget.priority++;
                            widget.save();
                        } else if (widget.priority == start) {
                            widget.priority = end;
                            widget.save();
                        }
                    } else {
                        if (widget.priority > start && widget.priority <= end) {
                            widget.priority--;
                            widget.save();
                        } else if (widget.priority == start) {
                            widget.priority = end;
                            widget.save();
                        }
                    }
                });
            });
    }
};