const mongo = require('mongoose');

const Model = mongo.Schema({
    company: { type: String, required: true },
    icon: { type: String },
    background: { type: String },
    describe: { type: String },
    projectIds: [{ type: mongo.Schema.Types.ObjectId, ref: 'Project' }],
    createdTime: {
        type: Date,
        default: Date.now,
    },
})
module.exports = mongo.model('Company', Model);