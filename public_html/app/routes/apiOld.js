/* 
 * we are going to call all packages( var User var Config var secretKey
 * and to manipulate the userSchema Object we Require user.js by creating var User....
 * (..) goes to parent folder
 * Require config.js
 * we are reguiring the config file to use the Secret Key so we can use it for login later on
 * Write first api   model.exports = function(app, express)
 * call express()  called express router called var api
 * 
 * Later we write code in services/users.js  so we can CREATE a USER in the BROWSER
 * 
 * We FETCH the DATA from 2 URLs :  /users   and /signup
 * 
 * the api.post and the api.get
 **/

var User = require('../models/user');

// objective is to be able to add posts to db.
// require storySchema; add the variable at top of code

var Story = require('../models/story');


var config = require('../../config');
var secretKey = config.secretKey;
var jsonwebtoken = require('jsonwebtoken');

// create a separate function outside of module.exports
// pass in 'local' user object  (user)
// use jsonwebtoken and function .sign

        function createToken(user){
        var token = jsonwebtoken.sign({
//            _id: user._id,
                id: user._id,
                name: user.name,
                username: user.username
            }, secretKey, {
                expiresInMinute: 1440
        });
      
        // to return the entire object above create it as a vartoen so you can pass in 
        return token;
        }
    
    // module.exports exports entire api; it is a function
    // this is a fetch.  we don't want to put sign up here 
    // new file in services user.js
    // express function is express.Router()
module.exports = function(app, express, io) {
    var api = express.Router();
    
    // LECTURE 32 get All Stories. compare Real Time Capabilites between this browser and another browser
    // create another Route
    // 
    api.get('/all_stories',function(req,res){
        Story.find({},function(err, stories){
            if(err){
                res.send(err);
                return;
            }
            res.json(stories);
        });
    });
    
    
    
    api.post('/signup',function(req,res){
        // call the below which is data from user.js
        // .body is bodyParser because later on to read the value
        // to read the value on website we need something called bodyParser
        // req.body and name of value
        // save it to db
        // send the token with res.json
        var user = new User({
            name: req.body.name,
            username: req.body.username,
            password: req.body.password
        });
        
        var token = createToken(user);
          // save it to db
        
        user.save(function(err){
              if(err) {
                  res.send(err);
                  return;
              }
              
              res.json({
                  success: true,
                  message:  "user has been created",
                  token: token
              });
          });
    });
//    lecture 11 or 12  to Fetch Users from DB
//  .find is a Mongoose Method to find all the User Objects in DB

    api.get('/users', function(req,res){
        User.find({}, function(err, users) {
            if(err) {
                res.send(err);
                return;
            }
            res.json(users);   
    });
});
// lecture 13
// find is a mongoose method to find all User Objects in database
// type in another api object api.post
// .post the value to server
// User.findOne  findOne of User
// findOne is specific user Object;  searches if user exists or not.
// so you have to Pass in something so it can find what you want to look at
// req.body.username is what you type in
// .select
// .exec
// create a variable validPassword   and us function() .comparePassword
// check if password is valid
// execute a functionm on User.findOne
// 

    api.post('/login', function(req, res){
        User.findOne({
            username: req.body.username,  
        })
            .select('name username password').exec(function(err,user){
            if(err)throw err;
            if(!user) {
                res.send({ message:  "user does not exist"});
            }else if(user) {
                var validPassword = user.comparePassword(req.body.password);
             if(!validPassword){
                 res.send({message: "invalid password"});
             }else{
                 // create a token if valid so decode all info in the token
                 // we need the jsonwebtoken lib; to decode token. needed sudo
                 // require it
                 // if you login successfully you return following info and token
                 // so you can decode all information in the token
             
            var token = createToken(user);
            res.json({
                username: req.body.username,
                success:  true,
                message: "successful login",
                token: token
            });
           }
        }
    });
});
    //after login in - add the MIDDLEWARE..] to verify
    // bodyParser is middleware. morgan is middleware
    // they act as bridge from one destination to another destination.  demo of car on road with roadblock
    // do you have a legitamate token or not
    // all of the code after module.exports is destination A
    // after login in - add the middleware
    
    api.use(function(req,res, next){
        console.log("somebody just entered our app a minute ago");
        
        // check the token. fetch it from body (not headers) 
        // req.param is a way to get token
        // for postman we use x-access-token
        
        
        var token = req.body.token || req.param('token') || req.headers['x-access-token'];
        // check if token exists  verify it
        // jsonwebtoken is police officer  secretKey is what the officer checks  pass in callback(err,decoded)
        // jsonwebtoken.verify  .verity is function()
        
        if(token) {
            jsonwebtoken.verify(token, secretKey, function(err, decoded){
                if(err){
                    res.status(403).send({ success:false, message: "failed to authenticate user"});
                }else{
                    // if success go do the 'next' route  
                    //  next destination which is below the middleware next()
                    req.decoded = decoded;
                    next();   
                }
            });   
        }else{
            res.status(403).send({success: false, message: "no token provided"});
        }
    });
    
    // go to DESTINATION B - you have to provide a legitamate token
    // test the middleware
    // create a Home API
    // login in and go to home pages
    
    // delete the below code and rewrite chaining methods
    // objective is to be able to add posts to db.
    // require storySchema; add the variable at top of code
    // delete below which was just for testing
    // 
//    api.get('/',function(req,res){
//        res.json("hello universe");
//    });
    // do do multiple http methods on a single route;  '/' is home
    
    api.route('/')
            .post(function(req,res){
                var story = new Story({
                    // add some data
                    // how can we put id of user into story.js
                    // so far what we did in sign up is request .body to get value of something
                    // to get value of current user - check the middleware, if you bypass
                    // you will get request.decoded
                    // we store id and username
                    // to get id we type in req.decoded.id
                    // current user is logged in
            creator: req.decoded.id,  
            content: req.body.content
                });
                
                // save value to db
                // 
                
                // in LECTURE 31 I did the follow.
                // the below lines of code are now modified.
                // i added this:
                // io.emit('story', newStory);
                // and changed this:
                // story.save(function(err){
                // to this:
                // story.save(function(err. newStory){
                // because we want to add a New Instance of the story below in story.save
                // now whenever you create a newStory it will Render It
                // then go to index.html to add the script for the socket.io file
                
                story.save(function(err, newStory){
                    if(err){
                                // do validation
                                res.send(err);
                                return;
                            }
                            io.emit('story', newStory);
                            res.json({message: "new story created"});
                });
    })
    // get all the stories created by a user
    // go to postman and post another story  key content value hello from Batman ; new story created
    // go to postman and get  you will see the story
    
            .get(function(req,res){
                Story.find({creator: req.decoded.id}, function(err, stories) {
                        if(err) {
                            res.send(err);
                            return;
                        }
                        res.json(stories);
                });
            });
    
    // build this api to use for Angular later
    // you cannot use api.use above because it is middleware; it is not a route
    
    // use this separate api we can fetch  login user data
    // then call it later on in front-end;  we need to get id and username and user data
    // so we put it in a separate api that we can call on the front-end
    
    // the below is testing  comment it out to and include a CHAINING METHOD
    // on ONE ROUTE.  do multiple methods on a single route below
    // ****
    
    // the above api.use is not fetching the data
    // it is middleware
    // we use this so we can fetch the data  username and password
    // later on we just have to call this api on the front end
    api.get('/me',function(req,res){
        res.json(req.decoded);
    });

 //****
 // to get the id of the user from story.js   in api.sign we used request.body etc.
 // looking at the middleware.  if you bypass the middleware everything is decoded
 // we store id and username so in order to get id we type in req.decoded.id
 // which means it is the CURRENT USER who is logged in.
 
 api.route('/')
         .post(function(req,res){
             var story = new Story(
             {
                 creator: req.decoded.id,
                 content: req.body.content
             });
             story.save(function(err){
                 if(err) {
                     res.send(err);
                     return;
                 }
                 res.json(
                 {
                     message: "New Story Created"
                 });
               });
 })
 // get all stories created by user
         .get(function(req, res){
             Story.find(
             {
                 creator: req.decoded.id
             },
                 function(err,stories){
                     if(err){
                         res.send(err);
                         return;
                     }
             res.json(stories);
         });
     });
    return api;
    };