/* 
 * export all of the data to be used 
 * you will require this file inside of server.js
 */


module.exports = {
    "database": "mongodb://udemyUser:2014monL@ds035027.mongolab.com:35027/userstory",
    "port" : process.env.PORT || 3000,
    "secretKey" : "mySecretKey"
}