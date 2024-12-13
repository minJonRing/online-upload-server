const mongo = require('mongoose');

// status 1正常 2禁用
const Model = mongo.Schema({
    name: { type: String, required: true },
    icon: { type: String },
    describe: { type: String },
    createdTime: {
        type: Date,
        default: Date.now,
    },
})
module.exports = mongo.model('Software', Model);