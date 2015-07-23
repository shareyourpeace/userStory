/* 
 * You need this file in conjuction with
 * services/user.js
 * 
 * create this new angular.module and name it userCtrl
 * pass in userCtrl and inject userService just created
 * 
 * .controller - give it a name 'UserController'
 * 
 * inject the service userService
 * 
 * below function(User) is because in user.js we used the name User
 * 
 * and call a function(User) because in user.js we create a factory using User
 * 
 * !!!!!!!!!  summary fetching the data from node api
 * use the data and render it to html which is the view
 * 
 * created a new method to signupUser so once you click the button
 * pass in user data and then it will store the token in the browser
 * and it will redirect you to the home page
 * 
 * then create a signup file.  signup.html
 * and in app.routes.js create a new route  .when
 */

angular.module('userCtrl', ['userService'])

        .controller('UserController', function(User){
            var vm = this;
//            vm.processing = true;
            // the above for validation later on. but we change it and use this code instead
            // vm.users = data; because if we have gotten 'all' the users we have success
            // 
            //you have to use the 'same' one as your 'service method' which is .all
            //the method  .all
            //if we manage to get all of the users the return SUCCESS and put it in data
            // put data in the Users Object  vm.users = data
            
            User.all()
                    .success(function(data){
                        vm.users = data;                    
            })
        })    
            // we Create a New Method which is create User  capability
            // so when you click a button it will create a user.
            // create a SIGN UP capability
            // create another controller to just Create the users
            // add a location and after you are redirected to home page.
            // 
        .controller('UserCreateController',function(User, $location, $window){
            var vm = this;
            vm.signupUser = function(){
            vm.message = "";
                    
                    // create a PROMISE OBJECT  which is .THEN
                    // and clear the form after signup.
                    // after you create it it will Store the Token in the browser
                    // and it will redirect you to a homepage
                    // now create signup.html
                    // pass in the data which is userData
                    
            User.create(vm.userData)
                .then(function(response){
                    // clear the message when done
                    vm.userData = {};
                    vm.message = response.data.message;
                                
                    //   store the token which is different than authentication Service 
                    //   which we used in authService
                    // if you have the token it directs you to the home path
                                
                    $window.localStorage.setItem('token', response.data.token);
                    $location.path('/');           
                    })
                }                      
            })             

