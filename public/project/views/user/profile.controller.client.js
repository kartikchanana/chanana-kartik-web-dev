(function(){
    angular
        .module("NoteScorer")
        .controller("ProfileController", ProfileController);

    function ProfileController($location, $routeParams,$rootScope, UserService, NoteService) {
        var vm = this;
        vm.updateUser = updateUser;
        vm.unregister = unregister;
        vm.logout = logout;
        vm.flag = 0;
        var id = $rootScope.currentUser._id;

        //To load page as per following flags
        vm.viewSheets = viewSheets;
        vm.viewLiked = viewLiked;
        vm.setProfileFlag = setProfileFlag; 
        vm.viewFollowed = viewFollowed;
        vm.profileflag = 1;
        vm.sheetsflag = 0;
        vm.followedflag = 0;
        vm.admin = 0;
        vm.allusersflag =0;
        vm.allscores = 0;
        vm.editingUserflag = 0;
        vm.apiNotes=[];
        vm.likedNotes=[];
        vm.unfollowUser =unfollowUser;
        vm.getAllScores = getAllScores;
        vm.getAllUsers = getAllUsers;
        vm.getUser = getUser;
        vm.unlike = unlike;

        //Different initialisation depending on flags
        function init() {
            UserService
                .findUserById(id)
                .then(function(response){
                    vm.user = response.data;
                    if(vm.user.username === "charlie"){
                        vm.admin = 1;
                        vm.sheetsflag = 0;
                        vm.followedflag = 0;
                        vm.editingUserflag = 0;
                        vm.profileflag = 1;
                        vm.allusersflag =0;
                        vm.allscores = 0;
                    }
                });
        }
        init();

        //Find current loggedIn user details
        function getUser(userId) {
            UserService
                .findUserById(userId)
                .then(function (response) {
                    vm.editingUser = response.data;
                    vm.editingUserflag = 1;
                    vm.profileflag = 0;
                    vm.sheetsflag = 0;
                    vm.followedflag = 0;
                    vm.allusersflag =0;
                    vm.allscores = 0;
                });

        }

        //All users details, only for admin
        function getAllUsers() {
            vm.profileflag = 0;
            vm.sheetsflag = 0;
            vm.followedflag = 0;
            vm.allusersflag= 1;
            vm.allscores = 0;
            vm.editingUserflag = 0;
            UserService
                .getAllUsers()
                .then(function (response) {
                    if(response.data == null){
                        vm.allUsersCount = 0;
                    }else{
                        vm.allUsers = response.data;
                        console.log(vm.allUsers);
                    }
                });
        }

        //All scores details to delete noisy uploads, only for admin
        function getAllScores() {
            vm.profileflag = 0;
            vm.sheetsflag = 0;
            vm.followedflag = 0;
            vm.allusersflag= 0;
            vm.allscores = 1;
            vm.editingUserflag = 0;
            NoteService
                .getAllScores()
                .then(function (response) {
                    if(response.data == null){
                        vm.allScoreCount = 0;
                    }else{
                        vm.allScores = response.data;
                    }
                })
        }

        //To show user profile
        function setProfileFlag() {
            vm.profileflag = 1;
            vm.sheetsflag = 0;
            vm.likedflag =0;
            vm.followedflag = 0;
            vm.allusersflag = 0;
            vm.allscores = 0;
            vm.editingUserflag = 0;
        }
        
        //Remove user from followed composers
        function unfollowUser(user) {
            if($rootScope.currentUser == null){
                vm.returnData = "Log in to continue";
            }else{
                if(user._id){
                    NoteService
                        .unfollowUser(user._id, $rootScope.currentUser._id)
                        .then(function (response) {
                            vm.userFollowed = 0;
                            console.log(response);
                        });
                }else if(user.id){
                    NoteService
                        .unfollowUser(user.id, $rootScope.currentUser._id)
                        .then(function (response) {
                            vm.userFollowed = 0;
                            console.log(response);
                        });
                }
            }
        }

        //Remove score from liked scores
        function unlike(note) {
            if(note._id){
                var noteId = note._id;
                console.log(noteId);
            }else if(note.id){
                var noteId = note.id+"";
                console.log(noteId);
            }
            UserService
                .unlikeSheetUser(noteId,$rootScope.currentUser._id)
                .then(function (response) {
                    NoteService
                        .unlikeSheet(noteId,$rootScope.currentUser._id)
                        .then(function (response) {
                            console.log(response);
                        });
                    console.log(response);
                    vm.userLiked = 0;
                });
        }
        
        //Log the current user out
        function logout() {
            UserService
                .logout()
                .then(
                    function (response) {
                        $location.url("/login");
                    },
                    function () {
                        $location.url("/login");
                    }
                )
        }
        
        //To show followed composers for current user
        function viewFollowed() {
            vm.followedflag = 1;
            vm.likedflag = 0;
            vm.profileflag = 0;
            vm.sheetsflag = 0;
            vm.allusersflag =0;
            vm.allscores = 0;
            vm.editingUserflag = 0;
            vm.followedd =[];
            UserService
                .viewFollowed($rootScope.currentUser._id)
                .then(function (response) {
                    if(response.data == null){
                        vm.followcount = 0;
                    }else{
                        var followed = response.data.followed;
                        for(i=0; i<followed.length; i++){
                            UserService
                                .findUserById(followed[i]+"")
                                .then(function (response) {
                                    var data = response.data;
                                    vm.followedd.push(data);
                                });
                        }
                    }
                });
        }

        //To show liked noted for current user
        function viewLiked() {
            vm.likedflag = 1;
            vm.profileflag = 0;
            vm.sheetsflag = 0;
            vm.followedflag = 0;
            vm.allusersflag =0;
            vm.allscores= 0;
            vm.editingUserflag = 0;
            vm.likedNotes=[];
            UserService
                .findLiked($rootScope.currentUser._id)
                .then(function (response) {
                    if(response.data == null){
                        vm.likecount = 0;
                    }else{
                        var liked = response.data.liked;
                        console.log(liked);
                        for(i=0; i<liked.length; i++){
                            if(liked[i].length <10){
                                NoteService
                                    .findNote(liked[i])
                                    .then(function (response) {
                                        console.log(response.data);
                                        vm.likedNotes.push(response.data);
                                    });
                            }else{
                                NoteService
                                    .findUserScore(liked[i])
                                    .then(function (response) {
                                        vm.likedNotes.push(response.data);
                                    });
                            }

                        }
                    }
                })
        }
        
        //Show all scores created locally
        function viewSheets() {
            vm.likedflag = 0;
            vm.profileflag = 0;
            vm.sheetsflag = 1;
            vm.followedflag = 0;
            vm.allusersflag =0;
            vm.allscores = 0;
            vm.editingUserflag = 0;
            vm.apiNotes=[];
            UserService
                .findOwnScores($rootScope.currentUser._id)
                .then(function (user) {
                    if(user.data != null){
                        var compositions = user.data.composed;
                        var sheets=[];
                        for(i=0; i<compositions.length; i++){
                            NoteService
                                .findUserScore(compositions[i])
                                .then(function (response) {
                                    vm.apiNotes.push(response.data);
                                });
                        }
                    }else {
                        vm.sheetcount = 0;
                    }

                });
        }
        
        //Remove the current user from the database
        function unregister(){
            UserService
                .deleteUser(id)
                .then(
                    function(){
                        $location.url("/login");
                    }, function(){
                        vm.error= "Unable to remove user";
                    });
        }
        
        
        //Update current user details
        function updateUser(newUser) {
            UserService
                .updateUser(id, newUser)
                .then(
                    function(response){
                        vm.success = "Profile saved successfully";
                    },
                    function(error){
                        vm.error = "Profile save failed";
                    });
            vm.flag = 1;
        }
    }

})();