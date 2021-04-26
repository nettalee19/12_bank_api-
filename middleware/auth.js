const jwt = require('jsonwebtoken')
const accounts= require('../models/accounts.models')

const auth = async(req,res,next) =>{
     console.log('auth middleware2')
    // next()

    try{
        const token = req.header('Authorization').replace('Bearer ','')
        const decoded = jwt.verify(token, 'mynameisnetta') //token valid and not expired
        const user = await accounts.findOne({ _id:  decoded._id, 'tokens.token': token}) //find user with an id to match the auth token
        //console.log(token)
        if(!user){
            //return res.status(404).send("No such user in the system");
            throw new Error()
        }

        req.token = token
        req.user = user
        next()
    } catch(e){
        res.status(401).send({ error: 'Please authenticate.' })
        //return res.status(401).send(e)
    }
}



module.exports = auth



