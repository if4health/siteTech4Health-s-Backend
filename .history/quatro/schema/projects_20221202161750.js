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

    member1 : {
        type : String,
        default : undefined,
        required : true
    },

    coordinator1 : {
        type : String,
        default : undefined,
        required : true
    },

    scholar : {
        type : String,
        default : undefined,
        required : true
    },
})

module.exports = mongoose.model('projects',projectSchema)