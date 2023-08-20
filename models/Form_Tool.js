const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Form_Tool = new Schema({
    form: {
        type: Schema.Types.ObjectId,
        ref: 'Forms'
    },
    tool: {
        type: Schema.Types.ObjectId,
        ref: 'Tools'
    },
    question:{
        type: Schema.Types.ObjectId,
        ref: 'Questions'
    },
    isPluggedIn:{
        type:Boolean,
        default:false
    }
});


module.exports = mongoose.model('Form_Tools', Form_Tool); 