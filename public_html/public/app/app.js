/* 
 * this file is required for Angular to load in the browser
 * to use child html 
 * and service
 * You need to include all of the dependencies
 * 
 * 
 *  You need to add all of the dependencies from the services
 */

angular.module('MyApp', ['appRoutes', 'mainCtrl', 'authService','userCtrl', 'userService', 'storyCtrl','storyService', 'reverseDirective' ])
//constantly push our token to the http request
// the below is from AuthService.js
        .config(function($httpProvider){
            $httpProvider.interceptors.push('AuthInterceptor');
});