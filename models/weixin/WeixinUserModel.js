const mongo = require('mongoose');

// status 1正常 2禁用
const Model = mongo.Schema({
    openid: { type: String },
    username: { type: String },
    avatarUrl: { type: String },
    status: { type: Number, default: 1 },
    createdTime: {
        type: Date,
        default: Date.now,
    },
})
module.exports = mongo.model('Wuser', Model);