/* 
 * this is the routing system
 * controller is a way to MANIPULATE the data
 * give it to views (so the Views can Render the Data)
 * callback function($rootScope, $location, Auth  from authService.js
 *  Auth is the factory
 *   .factory('Auth', function($http, $q, AuthToken){
 *  'this' refers to this controller   .controller so in the views
 *  insert the controller in one of the html tags and you can use it as MainController
 *  
 *   you will get Auth is user is loggedIn
 *  $rootScope.$on('$routeChangeStart', function)  is event Listener
 *  if the route is changing we want to put vm.loggedIn = Auth.isLoggedIn()
 *  
 *  if logged in then get user's information
 *  
 *  .then adds functionality to get a validation error 
 *  
 *  if the route changes we want to check if the user is logged in.
 *  then get the users information
 */

angular.module('mainCtrl', [])
        .controller('MainController', function($rootScope, $location, Auth){
            var vm = this;
            vm.loggedIn = Auth.isLoggedIn();
            $rootScope.$on('$routeChangeStart', function(){
                vm.loggedIn = Auth.isLoggedIn();
                
                Auth.getUser()
                        .then(function(data){
                            vm.user = data.data;
                });
//                console.log(data);  this returns error data not defined
            });
            
            // create new method for this controller
            // whenever you hit submit  we have to put ?? into html tag
            // 
            // Auth.Login is from auth.login
            // once logged in return promise object and return data
            // we need this function in our html tag later on
            // Auth.login is from the factory  which returns success with data
            // error will get message from api.js
            // vm.error = data.message
            
            vm.doLogin = function() {
                vm.processing = true;
                vm.error = '';
                Auth.login(vm.loginData.username, vm.loginData.password)
                        .success(function(data){
                            vm.processing = false;
                    Auth.getUser()
                            .then(function(data){
                                vm.user = data.data;
                    });
                    if(data.success)
                        $location.path('/');
                    else
                        vm.error = data.message;
                });
            };
            vm.doLogout = function(){
                Auth.logout();
                $location.path('/logout');
            };
            // we don't have to return here ??      
});
