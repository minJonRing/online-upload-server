const Project = require("../models/ProjectModel");

module.exports = {
    getDataAll: async () => {
        return await Project.find({})
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
    }
};