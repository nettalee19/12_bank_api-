const mongoose = require('mongoose')

const Accounts = mongoose.model('accounts',{
    id:{
        type: String,
        required: true,
        unique: true
    },
    cash:{
        type: Number,
        required: false,
        default: 0,
        unique: false
    },
    credit:{
        type: Number,
        required: true,
        default: 0,
        unique: false
    }
})

// const user = new Accounts({ 
//     user_id: "df213sdfs34fs",
//     cash: 20000,
//     credit: 100
// })

// user.save().then(() =>{  
//     console.log(user)
// }).catch((error) =>{
//     console.log('Error:', error)
// })


module.exports= Accounts;