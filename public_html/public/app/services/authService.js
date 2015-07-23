/* 
 * Call all of the auth APIs that we wrote in routes- api.js:  
 * call the  TOKENS, the ROUTES api.get and put them in authService.js
 * angular will Call all the json values from Server and render it to html
 * 
 * SERVICES will FETCH all the data and we pass it to the CONTROLLER which will do logic
 * and it will PASS it to a ROUTE and it route will RENDER the VIEW - html
 * normal mvc pattern
 * 
 * most useful method is factory. it is organized
 * we get $http from http Request and pass in AuthToken
 * AuthToken will be a factory later on
 * create AuthFactory using a var  ; all of the API routes called using http will be put in AuthFactory var
 * authfactory.login will get api from  api.post ./login and it will login user and save it to frontend
* the prefix in nodeJS is the API  /login  the url is /api/login
* this is how to fetch data from server
* return a closure: username password
* success is a promise function
* like a callback function(res,req)
* this (data) is the Promise Object and the success will pass it Auth and put it into data.token
* and we are going to fetch the token and put it into 
* 
* AuthToken will be a factory created later
* 
* authFactory will login the user and save it to the frontend
* return a closure username: username and password: password
* pass in token so you can get to other things.
* 
* check if user is logged in or not; every http request check is user is logged in
* have a function to see if you have a token or not; much like middleware but for frontend
* 
* to get the user id and name and info about user we authFactory.getUser
* 
* you will return a route or url or api (all the same)  api.get and put it here /api/me
* 
* create AuthTokenFactory
* 
* authFactory.login will login in the user and save it to the frontend.
* 
* .success is a promise function
* (data) is the promise object
* 
* create a new service called authService
* the FACTORY below is call AUTH
* $http $q AuthToken
* so AuthToken above is another FACTORY OBJECT created later on below
* 
* create the variable authFactory to use all of the methods
* 
*/

angular.module('authService',[])
        .factory('Auth',function($http, $q, AuthToken){
            var authFactory = {};
    
            authFactory.login = function(username, password){
                return $http.post('/api/login', {
                    username: username,
                    password: password
                })
//                below you pass in something
                .success(function(data){
                    AuthToken.setToken(data.token);
                    return data;
            });
          };
  
  // this following will clear the token
authFactory.logout = function(){
            AuthToken.setToken();
        }
  // check if user is logged in  and if user has the token on the front-end    
         
authFactory.isLoggedIn = function(){
    if(AuthToken.getToken())
        return true;
    else
        return false;
    }
   
 // to get the information about the user
 // you return the url or the route
 // else return promise object $q and you will be rejected if the token doesn't exist
            
authFactory.getUser = function(){
        if(AuthToken.getToken())
            return $http.get('/api/me');
        else
            return $q.reject({message: "user has no token"});
    }
    return authFactory;
})

// chaining so no :
// create the next Factory.  window is a way to get the token from the browser
    
    .factory('AuthToken', function($window){
        
        var authTokenFactory = {};

        authTokenFactory.getToken = function(){
                return $window.localStorage.getItem('token');
        }
        authTokenFactory.setToken = function(token){
                if(token)
                    $window.localStorage.setItem('token', token);
                else
                    $window.localStorage.removeItem('token');
            }  
            return authTokenFactory;
    })
    
    // the following method you check every request to see if token exists in local storage.
    // say it exists 
    // 
    // if you go to another url and it requires you to login in, it will check if token exists
    // it will check config
    // config - the headers -  in postman when you want to login you have to pass it in
    
    // $q $location AuthToken   AuthToken is used because
    
    .factory('AuthInterceptor', function($q, $location, AuthToken){
            var interceptorFactory = {};
    
    // this method checks the request
    // param of config
    // if token exists in local story then config.headers ....
    
            interceptorFactory.request = function(config){
                var token = AuthToken.getToken();
                if(token) {
                    config.headers['x-access-token'] = token;                  
                }
                return config;
        };
        // if you do not have a token when you login in it will redirect you to the home page
        // add error checking in case the user does not have a token and it tries to go to page where you have to login        
        // add in error checking ; if you try to access a homepage w/o token
        // and you are not logged in it will redirect you to the login page
        
        // we have to create a main controller
        
        interceptorFactory.responseError = function(response) {
            if(response.status == 403)
                $location.path('/login');
            return $q.reject(response);
        }  
        return interceptorFactory;
    });
