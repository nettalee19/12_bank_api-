//const fs = require("fs");
//const users = require('../data/users.json')

const accounts = require('../models/accounts.models')

const addUser = (req,res)=>{
   
    const {id, cash, credit}  = req.body
    
        const newUser = new accounts({
            "id" : id, 
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


const deposit = async (req, res) =>{
    const updates = Object.keys(req.body)
    const allowedUpdate = ["cash"]
    const isValidOperation = updates.every((update) => allowedUpdate.includes(update))

    if(!isValidOperation) {
        return res.status(400).send({error: 'Updates most only be regarding cash amount'})
    }
    
    try{
        const user = await accounts.findByIdAndUpdate(req.params.id, {$inc: {cash: req.body.cash}}, {new:true, runValidators: true })
    
        if(!user){
            return res.status(404).send("Account does not exist in the system")
    
        }
        if(req.body.cash <0){
            return res.status(400).send({error: 'Depoist must be a positive value'})
        }
        return res.status(200).json(user)

    } catch(error){
        res.status(400).send({"error":error})
    }

}

const updateCredit = async (req, res) =>{
    // // const updates = Object.keys(req.body)
    // // const allowedUpdate = ["credit"]
    // // const isValidOperation = updates.every((update) => allowedUpdate.includes(update))
    // const { _id } = req.params;
    // const { credit } = req.body;

    // // if(!isValidOperation) {
    // //     return res.status(400).send({error: 'Updates most only be regarding credit amount'})
    // // }
    // try {
        
    //     const user = await accounts.findByIdAndUpdate(_id,  {credit: credit }, {new:true, runValidators: true })
    //     //console.log(user)
    //     if(!user){
    //         return res.status(404).json("No such account in the system")
    //     }
        
    //     return res.status(200).json({"success":user})

    // } catch(error){
    //     return res.status(400).json({"error":error})
    // }
    const { amount } = req.body;
    try {
        const account = await accounts.findByIdAndUpdate(req.params.id, { $inc: { "credit": amount } }, { new: true, runValidators: true });
        console.log(account, 'account');
        if (!account) {
            return res.status(404).send({ error: 'Account not found' })
        }
    }
    catch (error) {
        res.status(400).json(error)
    }
}

const withdrawMoney = (req, res) =>{
    const updates = Object.keys(req.body)
    const allowedUpdate = ["cash"]
    const isValidOperation = updates.every((update) => allowedUpdate.includes(update))
    const { _id } = req.params;
    const { withdraw } = req.body;

    //const {id} = req.params
    if(!isValidOperation) {
        return res.status(400).send({error: 'Updates most only be regarding withdraw amount'})
    }

    if(withdraw < 0 ){
        res.status(404).send("Withdraw must be a positive amount")
    }

    else{

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