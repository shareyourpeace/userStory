//function(Story)   we have to pass in the Object which is Story because we 
// we just inject storyService so we can use this Story
// you have to pass in the OBJECT Story into the .controller('StoryController', function(Story){
// use the promise .success
// var vm = this means 
// then create a story - a new method  vm.create = 
// pass in the user data so vm.storyData  current is which is a Local Variable
// so once we enter value and it is success and it goes to the api, and it shows 
// 200 meaning success, then it will clear out the form
// then vm.message    
// we want to push the story so we can see it in an instance

angular.module('storyCtrl',['storyService'])
        .controller('StoryController', function(Story, socketio){
            
            var vm = this;
    
            Story.all()
                .success(function(data){
                    vm.stories = data;
                });
                
            vm.createStory = function() {
                vm.processing = true;
                
                vm.message = '';
                
                Story.create(vm.storyData)
                        .success(function(data){
                            
                            vm.processing = false;
                            // clear out the form
//                            vm.storyData = '';
                            vm.storyData = {};
                            // declare the message above with var
                            vm.message = data.message;
                            // cut the below line and move it into socketio.on block
//                            vm.stories.push(data);
                });       
            };
            
            // everytime you create a story   you are going to immediately push it to all stories
            // it is event listening
            socketio.on('story', function(data){
                    vm.stories.push(data);
            });
})

        .controller('AllStoriesController', function(stories, socketio){
            var vm = this;
    
            vm.stories = stories.data;
            
            socketio.on('story', function(data){
                    vm.stories.push(data);
            });
    
});