const mongoose = require('mongoose')
const accountSchema = new mongoose.Schema({
	name : {
        type : String,
        default : undefined,
        required : true
    },

	email : {
        type : String,
        default : undefined,
        required : true
    },
})

module.exports = mongoose.model('accounts', accountSchema)