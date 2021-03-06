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

    function WidgetService($http) {
        var api = {
            findWidgetsForPageId:findWidgetsForPageId,
            createWidget:createWidget,
            findWidgetById:findWidgetById,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget,
            reorderWidgets: reorderWidgets
        };
        return api;

        function reorderWidgets(pageId,start,end)
        {
            console.log("at client service " +start);
            console.log("at client service " +end);
            console.log("at client service " +pageId);
            var url = "/api/page/"+pageId+"/widget?start="+start+"&end="+end;
            return $http.put(url);
        }

        function deleteWidget(widgetId,pageId,widgetNumber) {
            var url= "/api/widget/"+widgetId+"?pageId="+pageId+"&widgetNumber="+widgetNumber;
            return $http.delete(url);
        }



            function updateWidget(widget,id) {
            var url = "/api/widget/" + id;
            return $http.put(url, widget);
        }

        function findWidgetById(id) {
            var url = "/api/widget/"+id;
            return $http.get(url);
        }


            function findWidgetsForPageId(pageId) {
                var url = "/api/page/" + pageId + "/widget";
                return $http.get(url);
        }
        function createWidget(pageId, arg, length){
            if(arg == "heading") {
                var newWidget={
                    type: "HEADER",
                    widgetNumber: length,
                    _page: pageId
                };
                return $http.post("/api/page/" +pageId +"/widget", newWidget);
            }
            if(arg == "image") {
                var newWidget={
                    type: "IMAGE",
                    widgetNumber: length,
                    _page: pageId
            };
                return $http.post("/api/page/" +pageId +"/widget", newWidget);
            }
            if(arg == "youtube") {
                var newWidget = {
                    type: "YOUTUBE",
                    widgetNumber: length,
                    _page: pageId
                };
                return $http.post("/api/page/" +pageId +"/widget", newWidget);
            }
            if(arg == "html") {
                var newWidget = {
                    type: "HTML",
                    widgetNumber: length,
                    _page: pageId
                };
                return $http.post("/api/page/" +pageId +"/widget", newWidget);
            }

            if(arg == "text") {
                var newWidget={
                    type: "TEXT",
                    widgetNumber: length,
                    _page: pageId
            };
                return  $http.post("/api/page/" +pageId +"/widget", newWidget);
                console.log(newWidget);
            }
        }
    }
})();