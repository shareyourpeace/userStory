/* 
 * .config below is different than service 
 * 
 * .config configures Current Application
 * 
 * this is the routing service so that when you type a url after localhost:3000/whatever
 * you land on that page not the index.html page
 * 
 * these below to ng-route OBJECT:  routeProvider and locationProvider
 * when you go to ./ route use templeUrl  'app/views/pages/home.html'
 * index.html will act as Main File
 * all other files will be under Main html file
 * 
 * $routeProvider and $locationProvider belong to ngRoute
 * $locationProvider.html5Mode(true);
 * using controllerAs: 'main' is a nickname
 */


angular.module('appRoutes', ['ngRoute'])

        .config(function($routeProvider,$locationProvider){
            
            $routeProvider
            .when('/',{
                templateUrl: 'app/views/pages/home.html',
                controller: 'MainController',
                controllerAs: 'main'
            })
            .when('/login',{
                templateUrl: 'app/views/pages/login.html'
            })
            .when('/signup',{
                templateUrl: 'app/views/pages/signup.html'
            })
            .when('/allStories',{
                templateUrl: 'app/views/pages/allStories.html',
                controller: 'AllStoriesController',
                controllerAs: 'story',
                resolve: {
                    stories: function(Story){
                        return Story.allStories();
                    }
                }
            })
      
            
            // LECTURE 32.  GETTING ALL STORIES.
            // we use the above code with resolve so that we render as we refresh.
            // the Story.allStories() is from the SERVICE
            // we have to create a New Service  IN storyService.js
            // as such
//            storyFactory.allStories = function(){
//                return $http.get('/api/all_stories');
//            }
//              in the storyCtrl 
            
            
            
    // if you want this to work and give you the login form you need a location provider
    // locationProvider configures how the application Linking Paths are Stored
    // linking paths are /login  or /signup
    // login angular will handle it using $locationProvider
    // .html5Mode

    $locationProvider.html5Mode(true);
});

