const mongoose = require('mongoose');
const setting = require('../setting');

const statrDB = () => {
  mongoose.set('strictQuery', false);
  mongoose.connect(setting.mongodbHost)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));;
}

module.exports = statrDB;