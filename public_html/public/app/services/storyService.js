angular.module('storyService', [])
        .factory('Story',function($http){
            
            var storyFactory = {};
    
            storyFactory.allStories = function(){
                return $http.get('/api/all_stories');
            };
            
            storyFactory.all = function(){
                return $http.get('/api/');
            };
    
            storyFactory.create = function(storyData){
                return $http.post('/api/', storyData);
            };
            return storyFactory;
})

// LECTURE 31.
// code the factory to use socket.io
// code the function as on: function()
// the normal way is to declare a variable storyFactory and then
// add a method for instance above storyfactory.all = function()
// and return the storyFactory object
// but below we are RETURNING the FUNCTION ITSELF
// the below code is 3rd party written by Brandon ??

    .factory('socketio', function($rootScope){
            var socket = io.connect();
    
    return {
        on: function(eventName, callback) {
            socket.on(eventName, function(){
                var args = arguments;
                $rootScope.$apply(function(){
                    callback.apply(socket, args);
                });
            });
        },
        emit: function(eventName, data, callback){
            socket.emit(eventName, data, function(){
                var args = arguments;
                $rootScope.apply(function(){
                    if(callback){
                        callback.apply(socket, args);
                    }
                });
            });     
        }
    };
});