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
        vm.getNiceDate = getNiceDate;
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
                document.getElementById("commentArea").focus();
                NoteService
                    .Comment(comment,vm.noteId, $rootScope.currentUser.username)
                    .then(function (response) {
                        console.log("Successful");
                        init();
                    });
            }
        }
        
        function logout() {
            UserService
                .logout()
                .then(
                    function (response) {
                        vm.flag = 0;
                        $location.url("/results/" + vm.searchText + "/" + vm.pageNo + "/sheet/" + vm.noteId + "/" + vm.noteSecret + "/" + vm.pageNo);

                    },
                    function () {
                        vm.flag = 1;
                        $location.url("/results/" + vm.searchText + "/" + vm.pageNo + "/sheet/" + vm.noteId + "/" + vm.noteSecret + "/" + vm.pageNo);

                    }
                )
        }

        function getNiceDate(date) {
            
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
                            for(i=0; i<likers.length ; i++){
                                if(likers[i] == $rootScope.currentUser._id){
                                    vm.userLiked = 1;
                                }
                            }if(vm.userLiked == 0){
                                NoteService
                                    .likeSheet(vm.noteId)
                                    .then(function (response) {
                                        vm.userLiked = 1;
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
                NoteService
                    .checkIfUserFollowed(vm.note.user.uid, $rootScope.currentUser._id)
                    .then(function (response) {
                        console.log(response);
                        var followed = response.data;
                        if(response.data == null || response.data == ""){
                            NoteService
                                .followUser(vm.note.user.uid)
                                .then(function (response) {
                                    console.log("Successful");
                                    vm.userFollowed = 1;
                                });
                        }
                        else{
                            for(i=0 ; i<followed.length ; i++){
                                if(followed[i] == vm.note.user.uid){
                                    vm.userFollowed = 1;
                                }
                            }if(vm.userFollowed = 0){
                                NoteService
                                    .followUser(vm.note.user.uid)
                                    .then(function (response) {
                                        console.log("Successful");
                                    });
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
                    console.log(response);
                });}
        }
        function unlikeSheet() {
            if($rootScope.currentUser == null){
                vm.returnData = "Log in to continue";
            }else{
                UserService
                    .unlikeSheetUser(vm.noteId,$rootScope.currentUser._id)
                    .then(function (response) {
                        NoteService
                            .unlikeSheet(vm.noteId,$rootScope.currentUser._id)
                            .then(function (response) {
                                console.log(response);
                            });
                        console.log(response);
                        vm.userLiked = 0;
                    });
            }
        }
        function searchNotes(searchText, page) {
            $location.url("/results/"+searchText+ "/" +page);
        }
    }
})();