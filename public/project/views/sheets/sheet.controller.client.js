(function () {
    angular
        .module("NoteScorer")
        .controller("SheetController", SheetController);

    function SheetController($location,$routeParams, NoteService, UserService, $rootScope) {
        var vm = this;
        
        vm.sheetNo = $routeParams.sheetNo;
        vm.noteId = $routeParams.noteId;
        vm.noteSecret= $routeParams.noteSecret;
        vm.searchText = $routeParams.searchText;
        vm.pageNo = $routeParams.pageNo;
        vm.searchNotes = searchNotes;
        vm.followUser = followUser;
        vm.unfollowUser = unfollowUser;
        vm.likeSheet = likeSheet;
        vm.unlikeSheet = unlikeSheet;
        vm.logout = logout;
        vm.Comment = Comment;
        vm.userFollowed = 0;
        vm.userLiked = 0;

        function init() {
            if($rootScope.currentUser == null){
                vm.flag = 0;
            }else{
                vm.flag = 1;
            }
            console.log("followed status: " + vm.userFollowed);
            console.log("liked status: " + vm.userLiked);
            NoteService
                .findNote(vm.noteId)
                .then(
                    function (response) {
                        vm.note = response.data;
                        var parts = vm.note.metadata.parts;
                        var partsData = [];
                        for(i=0; i<parts.length; i++){
                            partsData.push(parts[i].part.name);
                        }
                        vm.ipartsData=partsData.join();
                        NoteService
                            .loadComments(vm.noteId)
                            .then(function (response) {
                                var noteData = response.data;
                                if(noteData != null){
                                    vm.comments = noteData.comments;
                                    console.log(vm.comments);
                                }
                            });
                    }
                );
        }
        init();

        function Comment(comment) {
            if($rootScope.currentUser == null){
                vm.returnData = "Log in to continue";
            }else{
                NoteService
                    .Comment(comment,vm.noteId, $rootScope.currentUser._id)
                    .then(function (response) {
                        console.log("Successful");
                    });
            }
        }
        
        function logout() {
            UserService
                .logout()
                .then(
                    function (response) {
                        $location.url("/results/" + vm.searchText + "/" + vm.pageNo + "/sheet/" + vm.noteId + "/" + vm.noteSecret + "/" + vm.pageNo);
                        vm.flag = 0;
                    },
                    function () {
                        $location.url("/results/" + vm.searchText + "/" + vm.pageNo + "/sheet/" + vm.noteId + "/" + vm.noteSecret + "/" + vm.pageNo);
                        vm.flag = 1;
                    }
                )
        }
        function likeSheet() {
            if($rootScope.currentUser == null){
                vm.returnData = "Log in to continue";
            }else{
                NoteService
                    .checkIfUserLiked(vm.noteId, $rootScope.currentUser._id)
                    .then(function (response) {
                        if(response.data == null){
                            NoteService
                                .likeSheet(vm.noteId)
                                .then(function (response) {
                                    vm.userLiked = 1;
                                    console.log("Successful return to controller");
                                },function (error) {
                                    console.log(error);
                                });
                        }else{
                            var likers = response.data.liker;
                            console.log("response is: ");
                            console.log(response.data.liker);
                            for(i=0; i<likers.length ; i++){
                                if(likers[i] == $rootScope.currentUser._id){
                                    vm.userLiked = 1;
                                }
                            }if(vm.userLiked == 0){
                                NoteService
                                    .likeSheet(vm.noteId)
                                    .then(function (response) {
                                        vm.userLiked = 1;
                                        console.log("Successful return to controller");
                                    },function (error) {
                                        console.log(error);
                                    });
                            }
                        }
                        
                    });
            }
        }

        function followUser() {
            if($rootScope.currentUser == null){
                vm.returnData = "Log in to continue";
            }else{
                console.log(vm.note.user);
                NoteService
                    .checkIfUserFollowed(vm.note.user.uid, $rootScope.currentUser._id)
                    .then(function (response) {
                        var followed = response.data;
                        if(response.data == null){
                            console.log("empty");
                            NoteService
                                .followUser(vm.note.user.uid)
                                .then(function (response) {
                                    console.log("Successful");
                                    vm.userFollowed = 1;
                                });
                            console.log("followed" + vm.note.user.username);}
                        else{
                            for(i=0 ; i<followed.length ; i++){
                                if(followed[i] == vm.note.user.uid){
                                    console.log("he has already followed him");
                                    vm.userFollowed = 1;
                                }
                            }if(vm.userFollowed = 0){
                                NoteService
                                    .followUser(vm.note.user.uid)
                                    .then(function (response) {
                                        console.log("Successful");
                                    });
                                console.log("followed" + vm.note.user.username);
                            }
                        }
                    });
            }
        }
        function unfollowUser() {
                if($rootScope.currentUser == null){
                    vm.returnData = "Log in to continue";
                }else{
                NoteService
                .unfollowUser(vm.note.user.uid, $rootScope.currentUser._id)
                .then(function (response) {
                    vm.userFollowed = 0;
                    console.log("unfollowed" + vm.userFollowed);
                    console.log(response);
                });}
        }
        function unlikeSheet() {
            if($rootScope.currentUser == null){
                vm.returnData = "Log in to continue";
            }else{
                NoteService
                    .unlikeSheet(vm.noteId,$rootScope.currentUser._id)
                    .then(function (response) {
                        vm.userLiked = 0;
                    })
            }
        }
        function searchNotes(searchText, page) {
            $location.url("/results/"+searchText+ "/" +page);
        }
    }
})();