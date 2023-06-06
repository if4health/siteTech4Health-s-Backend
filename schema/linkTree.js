const mongoose = require('mongoose')

const link = new mongoose.Schema({
    name : {
        type : String,
        default : undefined,
        required : true
    },
    
    url : {
        type : String,
        default : undefined,
        required : true
    }
});

const linkTreeSchema = new mongoose.Schema({
	tittle : {
        type : String,
        default : undefined,
        required : true
    },

    links : [ link ],
})

module.exports = mongoose.model('linkTree', linkTreeSchema);