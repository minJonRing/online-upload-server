const mongo = require('mongoose');

// status 1正常 2禁用
const Model = mongo.Schema({
    uuid: { type: mongo.Schema.Types.ObjectId, ref: 'Wuser' },
    label: { type: String },
    skin: { type: String },
    entry: [String],
    skinType: { type: String },
    equipType: { type: String },
    createdTime: {
        type: Date,
        default: Date.now,
    },
})
module.exports = mongo.model('Equip', Model);