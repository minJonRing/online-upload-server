const Program = require("../models/ProgramModel");
const { paginate } = require('../utils/dao')

module.exports = {
    getDataAll: async (ctx) => {
        const { pageNum = 1, pageSize = 10, companyId } = ctx.request.query;
        const query = {}; // 标题包含 'Post'
        const options = { sort: { createdAt: -1 } }; // 按时间降序
        if (companyId) {
            query.companyId = companyId
        }

        return await paginate(Program, query, pageNum, pageSize, options);
        // return await Program.find({})
    },
    getDataById: async (id) => {
        return await Program.findById(id)
    },
    addData: async (user) => {
        return await Program.create(user)
    },
    updateData: async (id, data) => {
        return await Program.updateOne({ _id: id }, data)
    },
    deleteData: async (id) => {
        return await Program.deleteOne({ _id: id })
    },
    getDataAllBySoftwareId: async (ctx) => {
        const { id } = ctx.request.query;
        const condition = { ["softwareId"]: id }; // 单值查询
        return await Program.find(condition).populate("artId")
    },
    getDataByClient: async (id) => {
        return await Program.findById(id).populate("artId")
    },
};