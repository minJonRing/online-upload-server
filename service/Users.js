const Users = require("../models/UsersModel");

module.exports = {
    getUserAll: async () => {
        return await Users.find({})
    },
    getUserById: async (id) => {
        return await Users.findById(id)
    },
    addUser: async (user) => {
        return await Users.create(user)
    },
    updateUser: async (id, user) => {
        return await Users.updateOne({ _id: id }, user)
    },
    deleteUser: async (id) => {
        return await Users.deleteOne({ _id: id })
    }
};