

const accounts = require('../models/accounts.models')
const transactions = require('../models/transaction.models')


const addUser = (req,res)=>{
   
    const {id, cash, credit}  = req.body
    
        const newUser = new accounts({
            "id" : id, 
            "cash": cash, 
            "credit": credit
        })
        console.log(newUser)
        newUser.save((err) => {
            if (err) return res.status(400).send({"error": err})
            return res.status(200).send({"success": newUser})
        });

    //}

}

// const getAllUsers = async (req,res)=>{
//     const users = await accounts.find()
//     return res.send(users)

// }

const getAllTransactions = async (req,res)=>{
    const actions = await transactions.find()
    return res.send(actions)

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
        const transaction = new transactions({
            //to : req.params.id, 
            toAccount : user.id, 
            operationName: "deposit", 
            amount: req.body.cash
        })
        transaction.save((err) => {
            if (err) return res.json({"error": err})
            return res.json({"success": transaction})
        })

        //return res.status(200).json(user)

    } catch(error){
        res.status(400).send({"error":error})
    }

}

const updateCredit = async (req, res) =>{
    const updates = Object.keys(req.body)
    const allowedUpdate = ["credit"]
    const isValidOperation = updates.every((update) => allowedUpdate.includes(update))

    if(!isValidOperation) {
        return res.status(400).send({error: 'Updates most only be regarding credit amount'})
    }
    
    try{
        const user = await accounts.findByIdAndUpdate(req.params.id, {credit: req.body.credit}, {new:true, runValidators: true })
    
        if(!user){
            return res.status(404).send("Account does not exist in the system")
    
        }
        if(req.body.credit <0){
            return res.status(400).send({error: 'Credit must be a positive value'})
        }

        const transaction = new transactions({
            //to : req.params.id, 
            toAccount : user.id, 
            operationName: "Credit update", 
            amount: req.body.credit
        })
        transaction.save((err) => {
            if (err) return res.json({"error": err})
            return res.json({"success": transaction})
        })
        //return res.status(200).json(user)

    } catch(error){
        res.status(400).send({"error":error})
    }

}

const withdrawMoney = async(req, res) =>{

    try{
        const user = await accounts.findById(req.params.id)
    
        if(!user){
            return res.status(404).send("Account does not exist in the system")
    
        }
        if(req.body.withdraw <0){
            return res.status(400).send({error: 'Withdraw must be a positive value'})
        }

        // const transaction = new transactions({
        //     //to : req.params.id, 
        //     toAccount : user.id, 
        //     operationName: "Credit update", 
        //     amount: req.body.credit
        // })
        // transaction.save((err) => {
        //     if (err) return res.json({"error": err})
        //     return res.json({"success": transaction})
        // })
        //return res.status(200).json(user)

    } catch(error){
        res.status(400).send({"error":error})
    }

    // const {id} = req.params.id
    // //const {withdraw} = req.body.withdraw
    // const user = await accounts.findById({id})
    // console.log(user)

    // if(!user){
    //     return res.status(404).send("Account does not exist in the system")

    // }

    // const {id} = req.params

    // const user = await accounts.find({user_id: `${id}`})
    // const {_id} = req.params.id
    // const user = await accounts.findById(req.params.id)

    // if(!user){
    //     return res.status(404).send("Account does not exist in the system")

    // }
    // if(req.body.withdraw <= 0){
    //     return res.status(400).send("Withdraw amount must be positive")
    // }else if(req.body.withdraw <= user.cash){
    //     console.log("yay")
    //     user = await accounts.updateOne(_id, {$inc:{cash: - req.body.withdraw}})
    // }
    // console.log(user.credit)
    // return res.send(user)

    //const user = await 

    // const updates = Object.keys(req.body)
    // const allowedUpdate = ["credit"]
    // const isValidOperation = updates.every((update) => allowedUpdate.includes(update))

    // if(!isValidOperation) {
    //     return res.status(400).send({error: 'Updates most only be regarding credit amount'})
    // }

    // const {_id} = req.params
    
    // try{
    //     const user = await accounts.find({user_id: `${_id}`})
    
    //     if(!user){
    //         return res.status(404).send("Account does not exist in the system")
    
    //     }
    //     // if(req.body.credit <0){
    //     //     return res.status(400).send({error: 'Credit must be a positive value'})
    //     // }
    //     return res.status(200).json(user)

    // } catch(error){
    //     res.status(400).send({"error":error})
    // }






    // const updates = Object.keys(req.body)
    // const allowedUpdate = ["cash"]
    // const isValidOperation = updates.every((update) => allowedUpdate.includes(update))
    // const { _id } = req.params;
    // const { withdraw } = req.body;

    // //const {id} = req.params
    // if(!isValidOperation) {
    //     return res.status(400).send({error: 'Updates most only be regarding withdraw amount'})
    // }

    // if(withdraw < 0 ){
    //     res.status(404).send("Withdraw must be a positive amount")
    // }

    // else{

    //     if(withdraw <= user.cash){//if the withdraw amount is below the cash
    //         user.cash = user.cash-withdraw
    //         console.log(user.cash)
    //         fs.writeFileSync('./data/users.json', JSON.stringify(users))
    //         res.status(200).send(`${withdraw}$ were withdrawen out of the account. Current balance is: ${user.cash}$`)
    //     } else if(withdraw > user.cash && withdraw <= (user.cash + user.credit)){
    //         user.cash -= withdraw;
    //         fs.writeFileSync('./data/users.json', JSON.stringify(users))
    //         res.status(200).send(`${withdraw}$ were withdrawen out of the account. Current balance is: ${user.cash}$`)
    //     } else{
    //         res.status(200).send(`This action is not allowed. You are over your credit limit`)
    //     }   
    // }

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
    transferMoney,

    getAllTransactions
}