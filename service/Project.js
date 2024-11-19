const Project = require("../models/ProjectModel");
const { paginate, removeFromArray } = require('../utils/dao')

module.exports = {
    getDataAll: async (ctx) => {
        const { pageNum = 1, pageSize = 10, companyId } = ctx.request.query;
        const query = {}; // 标题包含 'Post'
        const options = { sort: { createdAt: -1 } }; // 按时间降序
        if (companyId) {
            query.companyId = companyId
        }

        return await paginate(Project, query, pageNum, pageSize, options);
        // return await Project.find({})
    },
    getDataById: async (id) => {
        return await Project.findById(id)
    },
    addData: async (user) => {
        return await Project.create(user)
    },
    updateData: async (id, data) => {
        return await Project.updateOne({ _id: id }, data)
    },
    deleteData: async (id) => {
        return await Project.deleteOne({ _id: id })
    },
    deleteFilesToItem: async (id, body) => {
        const { versionId } = body;
        return await removeFromArray(Project, { _id: id }, 'files', { _id: versionId })
    },
    getDataBySign: async (param) => {
        const { sign } = param;
        return await Project.findOne({ sign })
    },
};