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

const other_author = new mongoose.Schema({
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
	data : {
		type : Date,
		required : true,
		default : () => new Date.now()
	},
	day : {
		type : Number,
		required : true
	},
	month : {
		type : Number,
		required : true
	},
	year : {
		type : Number,
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

	myWork : {
		type : String,
		
	}
})

module.exports = mongoose.model('works',workSchema)