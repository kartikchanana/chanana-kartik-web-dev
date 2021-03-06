(function () {
    angular
        .module("NoteScorer")
        .controller("OwnSheetController", OwnSheetController);

    function OwnSheetController($location,$routeParams, NoteService, UserService, $rootScope) {
        var vm = this;

        //Data coming from URL
        vm.sheetNo = $routeParams.sheetNo;
        vm.noteId = $routeParams.noteId;
        vm.noteSecret= $routeParams.noteSecret;
        vm.searchText = $routeParams.searchText;
        vm.pageNo = $routeParams.pageNo;
        
        //Function requests from view
        vm.searchNotes = searchNotes;
        vm.followUser = followUser;
        vm.unfollowUser = unfollowUser;
        vm.likeSheet = likeSheet;
        vm.unlikeSheet = unlikeSheet;
        vm.logout = logout;
        vm.Comment = Comment;
        
        vm.userFollowed = 0;
        vm.userLiked = 0;

        //check if user logged in on-load and then load the score details
        function init() {
            if($rootScope.currentUser == null){
                vm.flag = 0;
            }else{
                vm.flag = 1;
            }
            if(vm.noteId.length<10){
                NoteService
                    .findNote(vm.noteId)
                    .then(function (response) {
                        vm.note=response.data;
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
                    })
            }else{
                NoteService
                    .findUserScore(vm.noteId)
                    .then(
                        function (response) {
                            vm.note = response.data;
                            vm.ipartsData = vm.note.metadata.parts;
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
        }
        init();

        //Add comment on the score
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

        //Logout the current user
        function logout() {
            UserService
                .logout()
                .then(
                    function (response) {
                        $location.url("/results/ownsheet/" + vm.noteId);
                        vm.flag = 0;
                    },
                    function () {
                        $location.url("/results/ownsheet/" + vm.noteId);
                        vm.flag = 1;
                    }
                )
        }
        
        //Like the sheet for current user
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

        //Unlike the sheet for current user
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
        
        //Follow the composer for current user
        function followUser() {
            if($rootScope.currentUser == null){
                vm.returnData = "Log in to continue";
            }else{
                NoteService
                    .checkIfUserFollowed(vm.note.user.uid, $rootScope.currentUser._id)
                    .then(function (response) {
                        var followed = response.data;
                        console.log(response.data);
                        if(response.data == null || response.data == ""){
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
                            }
                        }
                    }, function (error) {
                        console.log(error);
                    });
            }
        }

        //Unfollow the composer for current user
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
        
        //Embedded search bar on page
        function searchNotes(searchText, page) {
            $location.url("/results/"+searchText+ "/" +page);
        }
    }
})();