const Software = require("../models/SoftwareModel");



module.exports = {
    getDataAll: async (ctx) => {
        return await Software.find({})
    },
    getDataById: async (id) => {
        return await Software.findById(id)
    },
    addData: async (user) => {
        return await Software.create(user)
    },
    updateData: async (id, data) => {
        return await Software.updateOne({ _id: id }, data)
    },
    deleteData: async (id) => {
        return await Software.deleteOne({ _id: id })
    },
};