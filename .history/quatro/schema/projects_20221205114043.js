const mongoose = require('mongoose')

const member = new mongoose.Schema({ name : String });

const coordinator = new mongoose.Schema({ name : String });

const scholar = new mongoose.Schema({ name : String });

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

    members : [ member ],

    coordinators : [ 
        coordinator 
        require
    ],

    scholars : [ scholar ],
})

module.exports = mongoose.model('projects',projectSchema)