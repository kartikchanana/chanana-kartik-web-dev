(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    var widgets = [
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": '<p class="first-text">Investing in undersea internet cables has been a <a href="http://gizmodo.com/why-more-technology-giants-are-paying-to-lay-their-own-1703904291">big part of data strategy </a>plans for tech giants in recent years. Now Microsoft and Facebook are teaming up for the mother of all cables: A 4,100-mile monster that can move 160 Tbps, which will make it the highest-capacity cable on Earth. The cable even has a name, MAREA, and it will break ground (break waves?) later this year. Hopefully it can handle all your selfies.</p>'},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];

    function WidgetService() {
        var api = {
            findWidgetsForPageId:findWidgetsForPageId,
            createWidget:createWidget,
            findWidgetById:findWidgetById,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget
        };
        return api;

        function deleteWidget(widgetId) {
            for(var i in widgets)
            {
                if(widgetId===widgets[i]._id) {
                    widgets.splice(i, 1);
                    return true;
                }
            }
            return false;
        }

        function updateWidget(widget,id) {
            for (var i in widgets) {
                console.log(id);
                console.log(widgets[i]._id);
                if (widgets[i]._id === id ) {
                    console.log(widgets[i].widgetType);
                    switch (widgets[i].widgetType) {
                        case "HEADER":
                            widgets[i].size = widget.size;
                            widgets[i].text = widget.text;
                            return true
                            break;

                        case "IMAGE":
                            widgets[i].width = widget.width;
                            widgets[i].url = widget.url;
                            return true;
                            break;
                        case "YOUTUBE":
                            widgets[i].width = widget.width;
                            widgets[i].url = widget.url;
                            return true;
                            break;
                    }
                }
            }
        }

        function findWidgetById(id)
        {
            for(var i in widgets)
            {
                if(widgets[i]._id===id)
                {
                    return widgets[i];
                }
            }
            return null;
        }


            function findWidgetsForPageId(pageId) {
            return widgets;
        }
        function createWidget(pageId, arg){
            if(arg == "heading") {
                var newWidget={
                    _id: (new Date()).getTime()+"",
                    widgetType: "HEADER",
                    pageId: pageId
                };
                widgets.push(newWidget);
                return newWidget;
            }
            if(arg == "image") {
                var newWidget={
                    _id: (new Date()).getTime()+"",
                    widgetType: "IMAGE",
                    pageId: pageId
            };
                widgets.push(newWidget);
                return newWidget;
            }
            if(arg == "youtube") {
                var newWidget={
                    _id: (new Date()).getTime()+"",
                    widgetType: "YOUTUBE",
                    pageId:  pageId
            };
                widgets.push(newWidget);
                return newWidget;
            }
        }
    }
})();