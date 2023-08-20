const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Tool = new Schema({
    tool_title:String
});


module.exports = mongoose.model('Tools', Tool); 