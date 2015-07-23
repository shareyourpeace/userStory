/* 
 * Objective is to Fetch the Data
 *  Use the API from NodeJS   which is API.JS !!!!
 *  This is used to sign up a user from the browser.
 *  This is a DIFFERENT file and functionality than app/MODELS/user.js
 *  rather than userFactory.get 
 *  userFactory.create
 *  
 *  You need to create another file in CONTROLLERS called userCtrl.js
 *  
 *  callback function ($http)  we don't need $window now
 *  
 *  we can use userFactory.post or userFactory.create
 */

angular.module('userService', [])

        .factory('User', function($http){
            
            var userFactory = {};
    
            userFactory.create = function(userData){
                return $http.post('/api/signup', userData);
                
            }
//            create another factory and get all of the users
            userFactory.all = function() {
                return $http.get('/api/users');
            }
//            return the userFactory object
//            go to controllers and make userCrl
            return userFactory;
});

