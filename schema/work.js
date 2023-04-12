const mongoose = require('mongoose')

const author = new mongoose.Schema({
    name : {
        type : String,
        default : undefined,
        required : true
    }, 
});

const coorientador = new mongoose.Schema({
    name : {
        type : String,
        default : undefined,
        required : true
    }, 
});

const workSchema = new mongoose.Schema({
	titulo : {
		type : String,
		required : true
	},
	
	tipo : {
		type : String,
		required : true
	},

	periodico : {
		type : String,
		required : true
	},

	local : {
		type : String,
		required : true
	},

	date : {
        type : String,
        default : undefined,
        required : true
    },

	link : {
		type : String,
		required : false
	},

	orientador : {
		type : String,
		required: true
	},

	coorientadores : [ coorientador ],

	authors : [ author ],

	mywork : {
		type : String,
		required : true,
		default : undefined
	}
})

module.exports = mongoose.model('works',workSchema)