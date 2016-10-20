(function () {
    angular
        .module("NoteScorer")
        .controller("SheetEditController", SheetEditController);

    function SheetEditController($location,$routeParams, NoteService, UserService, $rootScope) {
        var vm = this;

        vm.noteId = $routeParams.noteId;
        vm.logout = logout;
        vm.deleteComment = deleteComment;
        vm.deleteNote = deleteNote;
        vm.updateNote= updateNote;

        //check if user logged in on-load and then
        // load the sheet for editing
        function init() {
            if($rootScope.currentUser == null){
                vm.flag = 0;
            }else{
                vm.flag = 1;
            }
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
                            },
                            function (error) {
                                console.log(error);
                            });
                    }
                );
        }
        init();

        //Remove the current score from database
        function deleteNote() {
            NoteService
                .deleteNote(vm.noteId)
                .then(function (response) {
                    console.log(response);
                });
        }

        //Update the current score
        function updateNote(note) {
            NoteService
                .updateNote(vm.noteId, vm.note)
                .then(function (response) {
                    console.log(response);
                });
        }

        //Delete the comment on a score, only for admin
        function deleteComment(comment) {
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
                        $location.url("/results/" + vm.searchText + "/" + vm.pageNo);
                        vm.flag = 0;
                    },
                    function () {
                        $location.url("/results/" + vm.searchText + "/" + vm.pageNo);
                        vm.flag = 1;
                    }
                )
        }

        //Add the score to liked list for Current user
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

        //Add the composer to followed list for Current user
        function followUser() {
            if($rootScope.currentUser == null){
                vm.returnData = "Log in to continue";
            }else{
                NoteService
                    .checkIfUserFollowed(vm.note.user.uid, $rootScope.currentUser._id)
                    .then(function (response) {
                        var followed = response.data;
                        if(response.data == null){
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

        //remove the composer from followed list for Current user
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

        //Remove the score from liked list for Current user
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

        //Search nodes for keyword
        function searchNotes(searchText, page) {
            $location.url("/results/"+searchText+ "/" +page);
        }
    }
})();