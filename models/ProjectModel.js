const mongo = require('mongoose');

const filesSchema = new mongo.Schema({
    version: String,
    describe: String,
    build: String,
    renderer: String,
    dist: String,
    views: String,
    createdTime: {
        type: Date,
        default: Date.now,
    }
});

const Model = mongo.Schema({
    name: { type: String, required: true },
    sign: { type: String, required: true, unique: true },
    describe: { type: String },
    files: { type: [filesSchema], default: [] },
    companyId: { type: mongo.Schema.Types.ObjectId, ref: 'Company' },
    createdTime: {
        type: Date,
        default: Date.now,
    },
})
module.exports = mongo.model('Project', Model);