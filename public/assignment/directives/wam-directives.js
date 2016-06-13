(function(){
    angular.module("wamDirectives",[])
        .directive("wamSortable",wamSortable);

    function wamSortable()
    {

        function linker(scope,element,attribute)
        {
            var myScope = scope;
            var startIndex=-1;
            var stopIndex=-1;
            $(element)
                .find(".container")
                .sortable({
                    axis:'y',
                    start:function(event,ui)
                    {
                        startIndex=ui.item.index();
                    },
                    stop:function(event,ui)
                    {

                        stopIndex=ui.item.index();
                        //console.log([startIndex,stopIndex]);
                        console.log(myScope.data);
                        myScope.callback({start:startIndex,end:stopIndex});
                        // var reorderedElement=myScope.data.splice(startIndex,1)[0];
                        // console.log(reorderedElement);
                        //myScope.data.splice(stopIndex,0,reorderedElement);
                        //myScope.$apply();
                    }
                });

        }
        return {
            templateUrl:"views/widget/wam-sortable.view.client.html",
            scope:
            {
                data:"=data",
                callback:"&",
                model:"="
            },
            link:linker
        }
    }

})();