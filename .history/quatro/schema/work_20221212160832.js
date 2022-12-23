const mongoose = require('mongoose')

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
	// data : {
	// 	type : Date,
	// 	required : false,
	// 	default : () => new Date.now()
	// },
	day : {
		type : int,
		required : true
	},
	month : {
		type : int,
		required : true
	},
	year : {
		type : int,
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