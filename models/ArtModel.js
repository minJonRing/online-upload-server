const mongo = require('mongoose');

// status 1正常 2禁用
const Model = mongo.Schema({
    name: { type: String, required: true },
    icon: { type: String },
    describe: { type: String },
    link: { type: String },
    sort: { type: Number, default: 1, unique: true },
    createdTime: {
        type: Date,
        default: Date.now,
    },
})
module.exports = mongo.model('Art', Model);