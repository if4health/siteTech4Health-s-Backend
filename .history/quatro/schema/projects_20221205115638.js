const mongoose = require('mongoose')

const member = new mongoose.Schema({
     name : String 
     default : undefined,
        required : true
    });

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

    coordinators : [ coordinator ],

    scholars : [ scholar ],
    
    mypic : {
        type : String,
        default : undefined,
        required: true,
    },
})

module.exports = mongoose.model('projects',projectSchema)