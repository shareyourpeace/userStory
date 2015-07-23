/* 
 * let a user create a story.
 * they login, get a token, bypass middleware, redirect to homepage, post story, save to DB 
 */

var mongoose = require('mongoose');

// create variable.

var Schema = mongoose.Schema;

// create a story schema
//  add data fields
//  in order in mongoDB to link schema to another schema we have to REFER IT = ref: ˙it
//  type is userID  if you look in user.js you will not see _id but it was autocreated
// refer it to a User Model  ??
//  manipulate the data below and test it using Postman


var StorySchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId, 
        ref:'User'
    },
    content: String,
    created:{
        type: Date, 
        default: Date.now
        }
});

module.exports = mongoose.model('Story', StorySchema);