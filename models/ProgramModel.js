const mongo = require('mongoose');

// status 1正常 2禁用
const Model = mongo.Schema({
    name: { type: String, required: true },
    cover: { type: String, required: true },
    videoIsIframe: { type: Boolean, default: false },
    video: { type: String },
    content: { type: String },
    softwareId: [{ type: mongo.Schema.Types.ObjectId, ref: 'Software' }],
    artId: [{ type: mongo.Schema.Types.ObjectId, ref: 'Art' }],

    createdTime: {
        type: Date,
        default: Date.now,
    },
})
module.exports = mongo.model('Program', Model);