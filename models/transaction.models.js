const mongoose = require('mongoose')

const Accounts = mongoose.model('accounts',{
    from:{
        type: String,
        required: true,
        
    },
    to:{
        type: String,
        required: true,
        
    },
    operationType: {
        type: String, 
        required: true,
    
    },
    amount: {
		type: Number,
		required: true,
	}
    
})


module.exports= Accounts;