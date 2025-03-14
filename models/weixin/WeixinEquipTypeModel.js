const mongo = require('mongoose');

// status 1正常 2禁用
const Model = mongo.Schema({
    key: { type: String },
    label: { type: String },
    child: [{ key: String, label: String, skins: [{ key: String, link: String }] }],
    status: { type: Number, default: 1 },
    createdTime: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongo.model('EquipType', Model);