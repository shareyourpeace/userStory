/* 
 * i created a config.js file and modified the below to reflect its usage
 * modify the below
 * app.listen(3000,function(err){
 * to this:
 * app.listen(config.port
 * 
 * if you want to call a file in the same directory use ./
 */

var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var config =require('./config');  //.js optional

// to call the DB  to connect nodejs to the  DB
// you need to use mongoose. it has to be install npm install mongoose --save
var mongoose = require('mongoose');

//create a new instance of express object 
////so we can use the object to run the server

var app = express();

// LECTURE 31
// below we have to npm install socket.io so we have Real-Time Capabilities
// below the var http = to  require http FILE and .server and pass in  the Express Instance of Express app.

// then require the socket.io file, pass the http into the IO
// go further down in the code to this line 
// app.listen(config.port,function(err){
// and change it to this:
// http.listen(config.port,function(err){
// and in the api.js file change this code:
// module.exports = function(app, express) {
// to this:
//  module.exports = function(app, express, io) {
// to pass in the IO object so we can use it later on.
// and change this:
// var api = require('./app/routes/api')(app, express);
// to this:
// var api = require('./app/routes/api')(app, express, io);
// and in api.js find your Home Route and add in the code:
// io.emit(' ')  and pass ('story',  newStory)
// look at additional notes in api.js    app.routes
// add the io script to index.html
// got to storyServices to build the factory for socket.io

var http = require('http').Server(app);

var io = require('socket.io')(http);

// we configured it in config.js -  now connect it to DB
mongoose.connect(config.database,function(err){
    if (err) {
        console.log(err);
    }else{
        console.log('connected to the Database');
    }
})
// 
// add middleware  app.use
// extended true so any values on specific route can be images videos string
// so if you put it as false it will only parse a string
//
//  parse json values 
app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());
// use morgan so you can log all requests to the console
// browser output shown below.  200 is success
//GET / 200 8.270 ms - 471
//GET /favicon.ico 200 1.868 ms - 471

app.use(morgan('dev'));
//app.listen(3000,function(err){
// change to the below

// the below line of code does this.  any route that you want to follow
// lets say going to a route 'home' or contact route for example localhost:3000/contact
// 
// it will localhost will always go hello universe because the * is localhost:3000

// to run api.js you create a new var calle api
// you will need to require this file 
// you are calling express method which is router so you need the below (app,express)

// express.static is Middleware to render all 'public' static files
// it has to be above the Route
// what this line does will 'render' all the css anc js files
// there will be no way for html to render css and js
// if you don't put this line your index.html will not be able to render the files.
// pass in app and express OBJECTS  the express method is router.
// if we don't pass them in it will treat express as a local variable

// the below middleware loads all of the static files

app.use(express.static(__dirname + '/public'));


var api = require('./app/routes/api')(app, express, io);
// add middleware .use ('api' and pass in api)
// /api is the prefix to all of the  api in the api.js file
// so when we sign up we need to use code in 
app.use('/api', api);


app.get('*', function(req, res){
    res.sendFile(__dirname + '/public/app/views/index.html');
    
});
//app.listen(config.port,function(err){
http.listen(config.port,function(err)   {
    if(err){
        console.log(err);
    }else{
        console.log('listening on port 3000');
    }
});