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
        vm.unfollowUser =unfollowUser;
        vm.getAllScores = getAllScores;
        vm.getAllUsers = getAllUsers;
        vm.getUser = getUser;

        function init() {
            UserService
                .findUserById(id)
                .then(function(response){
                    vm.user = response.data;
                    if(vm.user.username === "charlie"){
                        vm.admin = 1;
                        vm.sheetsflag = 0;
                        vm.followedflag = 0;
                        console.log("sheet flag " + vm.sheetsflag);
                        console.log("profileflag " + vm.profileflag);
                        console.log("admin " + vm.admin);
                        console.log("followedflag " + vm.followedflag);
                    }
                });
        }
        init();

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
        function setProfileFlag() {
            vm.profileflag = 1;
            vm.sheetsflag = 0;
            vm.likedflag =0;
            vm.followedflag = 0;
            vm.allusersflag = 0;
            vm.allscores = 0;
            vm.editingUserflag = 0;
        }
        function unfollowUser(user) {
            if($rootScope.currentUser == null){
                vm.returnData = "Log in to continue";
            }else{
                console.log(user);
                if(user._id){
                    NoteService
                        .unfollowUser(user._id, $rootScope.currentUser._id)
                        .then(function (response) {
                            vm.userFollowed = 0;
                            console.log("unfollowed" + vm.userFollowed);
                            console.log(response);
                        });
                }else if(user.id){
                    NoteService
                        .unfollowUser(user.id, $rootScope.currentUser._id)
                        .then(function (response) {
                            vm.userFollowed = 0;
                            console.log("unfollowed" + vm.userFollowed);
                            console.log(response);
                        });
                }
                // if(user.id.length < 10){
                //     NoteService
                //         .unfollowUser(user.id, $rootScope.currentUser._id)
                //         .then(function (response) {
                //             vm.userFollowed = 0;
                //             console.log("unfollowed" + vm.userFollowed);
                //             console.log(response);
                //         });
                // }else if(user.uid.length >10){
                //     NoteService
                //         .unfollowOwnUser(user.uid, $rootScope.currentUser._id)
                //         .then(function (response) {
                //             vm.userFollowed = 0;
                //             console.log("unfollowed" + vm.userFollowed);
                //             console.log(response);
                //         });
                // }

            }
        }

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
        function viewFollowed() {
            vm.followedflag = 1;
            vm.likedflag = 0;
            vm.profileflag = 0;
            vm.sheetsflag = 0;
            vm.allusersflag =0;
            vm.allscores = 0;
            vm.editingUserflag = 0;
            console.log("sheet flag " + vm.sheetsflag);
            console.log("profileflag " + vm.profileflag);
            console.log("likedflag flag " + vm.likedflag);
            console.log("followedflag " + vm.followedflag);
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
                                    console.log(data);
                                    vm.followedd.push(data);
                                });
                        }
                    }
                });
        }
        function viewLiked() {
            vm.likedflag = 1;
            vm.profileflag = 0;
            vm.sheetsflag = 0;
            vm.followedflag = 0;
            vm.allusersflag =0;
            vm.allscores= 0;
            vm.editingUserflag = 0;
            UserService
                .findLiked($rootScope.currentUser._id)
                .then(function (response) {
                    if(response.data == null){
                        vm.likecount = 0;
                        console.log("nothing to display");
                    }else{
                        console.log("this one");
                        var liked = response.data.liked;
                        console.log(liked);
                        for(i=0; i<liked.length; i++){
                            NoteService
                                .findNote(liked[i]+"")
                                .then(function (response) {
                                    vm.apiNotes.push(response.data);
                                    console.log("sheet found: ");
                                    console.log(response);
                                });
                        }
                    }
                })
        }
        function viewSheets() {
            vm.likedflag = 0;
            vm.profileflag = 0;
            vm.sheetsflag = 1;
            vm.followedflag = 0;
            vm.allusersflag =0;
            vm.allscores = 0;
            vm.editingUserflag = 0;
            console.log("sheet flag " + vm.sheetsflag);
            console.log("profileflag " + vm.profileflag);
            UserService
                .findOwnScores($rootScope.currentUser._id)
                .then(function (user) {
                    if(user.data != null){
                        var compositions = user.data.composed;
                        console.log(compositions);
                        var sheets=[];
                        for(i=0; i<compositions.length; i++){
                            NoteService
                                .findUserScore(compositions[i])
                                .then(function (response) {
                                    vm.apiNotes.push(response.data);
                                    console.log(vm.apiNotes);
                                });
                        }
                    }else {
                        vm.sheetcount = 0;
                    }

                });
        }
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