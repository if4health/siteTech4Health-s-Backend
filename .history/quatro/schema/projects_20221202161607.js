const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
	tittle : {
        type : String,
        default : undefined,
        required : true
    },

	description : {
        type : String,
        default : undefined,
        required : true
    },

    vigency : {
        type : String,
        default : undefined,
        required : true
    },

    status : {
        type : String,
        default : undefined,
        required : true
    },

    members : {
        type : String,
        default : undefined,
        required : true
    },

    coordinator1 : {
        type : String,
        default : undefined,
        required : true
    },

    coordinator2 : {
        type : String,
        default : undefined,
        required : true
    },

    coordinator3 : {
        type : String,
        default : undefined,
        required : true
    },

    scholar1 : {
        type : String,
        default : undefined,
        required : true
    },
    scholar2 : String,
    scholar3 : String,
    scholar4 : String,
    scholar5 : String,
})

module.exports = mongoose.model('projects',projectSchema)