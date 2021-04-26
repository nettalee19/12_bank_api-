const mongoose = require('mongoose')

const Transctions = mongoose.model('transactions',{
    fromAccount:{
        type: String,
        required: false,
        
    },
    toAccount:{
        type: String,
        required: false,
        
    },
    operationName: {
        type: String, 
        required: true,
    
    },
    amount: {
		type: Number,
		required: true,
	},
    date:{
        type: Date,
        default: Date.now()
    },
    owner:{
        type: mongoose.Schema.Types.ObjectID,
        required: true,
        ref: 'accounts'
    }

    
})


module.exports= Transctions;