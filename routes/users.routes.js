const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controller')

router.get('/', async (req,res) =>{
    //return res.status(200).json({users : users})
    console.log("this is users")
   await userController.getAllUsers(req,res)
    console.log("this is bank")
})
// .post('/', (req,res) =>{
//     userController.addUser(req,res)
// }).get('/:id/user',(req,res) =>{
//     userController.getUserById(req,res)
// }).put('/:id/deposit', (req,res) =>{
//     userController.deposit(req,res)
// }).put('/:id/credit', (req,res) =>{
//     userController.updateCredit(req,res)
// }).put('/:id/withdraw', (req,res) =>{
//     userController.withdrawMoney(req,res)
// }).put('/transfer',(req,res)=>{
//     userController.transferMoney(req,res)
// }).get('/alltransactions',(req,res)=>{
//     userController.getAllTransactions(req,res)
// })

module.exports = router;