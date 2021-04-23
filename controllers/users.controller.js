//const fs = require("fs");
//const users = require('../data/users.json')

const accounts = require('../models/accounts.models')

const addUser = (req,res)=>{
   
    const {id, cash, credit}  = req.body

    // let user = users.users.find((u) =>{
    //     return u.id == id})

    // if(user){
    //     return res.status(200).send("User exists")
    // } 
    // else if(cash < 0 || credit < 0){
    //     return res.status(200).send("Cash amount and Credit amount should be positive")
    // }
    //else {
        const newUser = new accounts({
            "user_id" : id, 
            "cash": cash, 
            "credit": credit
        })
        newUser.save((err) => {
            if (err) return res.json({"error--": err})
            return res.json({"success": newUser})
        });

    //}

}

const getAllUsers = async (req,res)=>{
    const users = await accounts.find()
    return res.send(users)

}

const getUserById = async (req, res) =>{
    const {id} = req.params
    
    const user = await accounts.find({user_id: `${id}`})

    if(!user){
        return res.send("Account does not exist in the system")

    }
    return res.send(user)  
 
}


const deposit = (req, res) =>{
    const updates = Object.keys(req.body)
    const allowedUpdate = ["cash"]
    const isValidOperation = updates.every((update) => allowedUpdate.includes(update))
    const { user_id } = req.params;
    const { cash } = req.body;


    if(!isValidOperation) {
        return res.status(400).send({error: 'Updates most only be regarding cash amount'})
    }
    try {
        const user = accounts.findByIdAndUpdate(req.params, {cash: cash }, {new:true, runValidators: true })
        
        if(!user){
            res.status(404).send("No such account in the system")
        }
        
        return res.send({"success":user})

    } catch{
        res.status(400).send({"error":error})
    }



    // if(cash >0){

    //     const user = await accounts.find({_id: `${id}`})

    //     if(user){
    //         user.cash +=  cash
    //         res.status(200).send(`You have just deposited ${cash}$ into your account. Your balance in total: ${user.cash}$`)
            
    //         console.log(user)
    //     }else{
    //         return res.status(404).send("User does not exsist")
    //     }
    
            
    // }else{
    //     return res.status(400).send("Not a valid request. Amount of deposite must be positive")
    // }
    

}

const updateCredit = async (req, res) =>{
    const updates = Object.keys(req.body)
    const allowedUpdate = ["credit"]
    const isValidOperation = updates.every((update) => allowedUpdate.includes(update))
    
    // const {user_id} = req.params
    const {credit} = req.body

    if(!isValidOperation) {
        return res.status(400).send({error: 'Updates most only be regarding credit value'})
    }
    try {
        const user = await accounts.findByIdAndUpdate( req.params, { credit: credit }, {new:true, runValidators: true })
        
        if(!user){
            res.status(404).send("No such account in the system")
        }
        
        return res.send({"success":user})

    } catch (error){
        res.status(400).send({"error":error})
    }
}

const withdrawMoney = (req, res) =>{
    const {id} = req.params
    const {withdraw} = req.body

    if(withdraw < 0 ){
        res.status(404).send("Withdraw must be a positive amount")
    }
    else{

        let user = users.users.find((u) =>{
            return u.id == id
        })
        console.log(user)
        
    
        if(withdraw <= user.cash){//if the withdraw amount is below the cash
            user.cash = user.cash-withdraw
            console.log(user.cash)
            fs.writeFileSync('./data/users.json', JSON.stringify(users))
            res.status(200).send(`${withdraw}$ were withdrawen out of the account. Current balance is: ${user.cash}$`)
        } else if(withdraw > user.cash && withdraw <= (user.cash + user.credit)){
            user.cash -= withdraw;
            fs.writeFileSync('./data/users.json', JSON.stringify(users))
            res.status(200).send(`${withdraw}$ were withdrawen out of the account. Current balance is: ${user.cash}$`)
        } else{
            res.status(200).send(`This action is not allowed. You are over your credit limit`)
        }   
    }

}

const transferMoney = (req, res) =>{
    const {sendingId, reciveingId, amount} = req.body

    if(amount < 0 || sendingId < 0 || reciveingId < 0){
        return res.status(200).send("Cash amount to transfer and ID's should be positive")
    }else if(reciveingId == sendingId){
        return res.status(200).send("Transfer should accour between two different users")
    }
    //Todo
    // else if(!(users.find((u) =>{u.id == sendingId}))|| !(users.find((u) =>{u.id == reciveingId}))){
    //     return res.status(200).send("One or more users do not exist")
    // }
    else{
        users.users.forEach(u =>{
            if(u.id == sendingId){
                u.cash -= amount
            }
            else if(u.id == reciveingId){
                u.cash += amount
            }
        })
        fs.writeFileSync('./data/users.json', JSON.stringify(users))
        res.send(`${amount}$ were transfered from accout ID: ${sendingId} to account ID: ${reciveingId}`) 

    }

     
}


module.exports = {
    getAllUsers,
    addUser,
    getUserById,
    deposit,
    updateCredit,
    withdrawMoney,
    transferMoney
}