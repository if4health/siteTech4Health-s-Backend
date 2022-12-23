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
        required : false
    },

    coordinator3 : {
        type : String,
        default : undefined,
        required : false
    },

    scholar1 : {
        type : String,
        default : undefined,
        required : true
    },

    scholar2 : {
        type : String,
        default : undefined,
        required : false
    },

    scholar3 : {
        type : String,
        default : undefined,
        required : false
    },

    scholar4 : {
        type : String,
        default : undefined,
        required : false
    },

    scholar5 : {
        type : String,
        default : undefined,
        required : false
    },
})

module.exports = mongoose.model('projects',projectSchema)