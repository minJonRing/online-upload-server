const Art = require("../models/ArtModel");

module.exports = {
    getDataAll: async (ctx) => {
        return await Art.find({})
    },
    getDataById: async (id) => {
        return await Art.findById(id)
    },
    addData: async (user) => {
        return await Art.create(user)
    },
    updateData: async (id, data) => {
        return await Art.updateOne({ _id: id }, data)
    },
    deleteData: async (id) => {
        return await Art.deleteOne({ _id: id })
    },
};