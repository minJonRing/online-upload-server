const mongo = require('mongoose');

const Model = mongo.Schema({
    name: String,
    username: String,
    password: String,
    email: String,
    cover: String
})
module.exports = mongo.model('Users', Model);