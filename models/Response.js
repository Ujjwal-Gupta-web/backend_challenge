const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Response = new Schema({
    form: {
        type: Schema.Types.ObjectId,
        ref: 'Forms'
    },
    answers: [{
        type: Schema.Types.ObjectId,
        ref: 'Answers'
    }]
});


module.exports = mongoose.model('Responses', Response); 