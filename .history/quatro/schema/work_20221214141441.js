const mongoose = require('mongoose')

const member = new mongoose.Schema({
    name : {
        type : String,
        default : undefined,
        required : true
    }, 
});

const scholar = new mongoose.Schema({ 
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

	authors :[String],

	// IM LAZY ABOUT IMPLEMENT THIS COMPLEX SCHEMA BELOW
	// authors :{
	// 	autor1 : {
	// 		type : String,
	// 		required : true
	// 	},
	// 	orientador : {
	// 		type : String,
	// 		required : true
	// 	},
	// 	coorientador : String,
	// 	other_authors : [String]
	// },
	// mywork : {
	// 	type : String,
	// 	required : true
	// }
})

module.exports = mongoose.model('works',workSchema)