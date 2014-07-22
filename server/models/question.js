var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionSchema = new Schema({
    description : {
        type : String
    },
    points : {
        type : Number
    },
    answers : {
        type : []
    },
    givenAnswer : {
        type : String
    }
});

module.exports = mongoose.model('Question',questionSchema);