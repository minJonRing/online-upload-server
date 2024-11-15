const Company = require("../models/companyModel");

module.exports = {
    getDataAll: async () => {
        return await Company.find({})
    },
    getDataById: async (id) => {
        return await Company.findById(id)
    },
    addData: async (user) => {
        return await Company.create(user)
    },
    updateData: async (id, data) => {
        return await Company.updateOne({ _id: id }, data)
    },
    deleteData: async (id) => {
        return await Company.deleteOne({ _id: id })
    }
};