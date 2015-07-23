

// we have to use mongoose method()  schema

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

// first schema object

var UserSchema = new Schema({
    name : String,
    // the below has a condition true
    // index  - no duplicates
    // password select: false  when query user we don't want to query
    // password as well
    username : {type: String, required: true, index: {unique:true}},
    password :{type: String, required: true, select: false}   
});

// export the user object so we can use it later on in API
// User is User.js ????  
// UserSchema is the Object created above

// then use mongoose method to hash password even before we save it to DB
// pre is the method()
// next
// this   refers to UserSchema Object
// then some validation  if user password is not modified then return next
// next indicates go to next matching route because if validation is true
// we do not want it to stop we want it to continue


UserSchema.pre('save',function(next){
    var user = this;
    
    if(!user.isModified('password'))return next();
    
    // we npm installed bcrypt-nodejs
    // we required it above
    // now we want to use bcrytp method()  hash
    // you have to pass in userpassword, null, null, callback function()
    // callback function (err,hash);  hash is
    // if err you don't want to stop - go to the 'next' matching route
    // if no error hash the user password
    bcrypt.hash(user.password, null, null, function(err, hash){
        if(err)return next(err);
        user.password = hash;
        // we don't want to stop - go to next matching route
        next();
});
});

UserSchema.methods.comparePassword = function(password) {
    var user = this;
    return bcrypt.compareSync(password, user.password);
}

module.exports = mongoose.model('User', UserSchema);

