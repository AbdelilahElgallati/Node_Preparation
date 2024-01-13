const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usernameSchema = new Schema({
    username: String
});

const Mydata = mongoose.model('Mydata', usernameSchema);

module.exports = Mydata;