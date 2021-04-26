const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs')

const app = express();
const usersRoute = require('./routes/users.routes');

// app.use((req, res, next)=>{
//     // console.log(req.method, req.path)
//     // next()

//     if(req.method === 'GET'){
//         res.send('GET requsets are disabled')
//     }else{
//         next()
//     }
// })
// app.use((req, res, next)=>{
//     //if(req.method === 'GET' || req.method === 'POST' || req.method === 'PUT'){
//     res.status(503).send('Site temporerly under constraction. Please come back soon')
    
// })



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use('/bank/users',usersRoute);

mongoose.connect('mongodb://localhost/somecollection', {
//mongoose.connect('mongodb+srv://nettalee19:dM_HqsyqT9K8LK.@cluster0.u9jns.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => {
    console.log("database connected")
})

app.use('/',(req,res)=>{
    res.json({success : 'Bank API'})
    
})

app.listen(process.env.PORT || 5000, () => {
    console.log(`application start at ${process.env.PORT || 5000}`)
})










// const multer = require('multer')

// const upload = multer({
//     dest: 'images',
//     limits:{
//         fileSize: 1000000
//     },
//     fileFilter(req, file, cb){
//         //if(!file.originalname.endsWith('.pdf')){
//         if(!file.originalname.match(/\.(doc|docx)$/)){
//             return cb(new Error('Please upload a Word document'))
//         }

//         cb(undefined, true)

//         // cb(new Error('File must be a PDF'))
//         // cb(undefined, true)
//         // cb(undefined, false)
//     }
// })

// // const errorMiddleware = (req, res, next) =>{
// //     throw new Error ('From my middleware')
// // }

// //app.post('/upload', errorMiddleware, (req,res) =>{
// app.post('/upload', upload.single('upload'), (req,res) =>{
//     res.send()
// }, (error, req, res, next) =>{
//     res.status(400).send({error: error.message})
// })










// const Trans = require('./models/transaction.models')
// const accounts = require('./models/accounts.models')


// const main= async() =>{
//     // const trans = await Trans.findById('608650754f9cb53ff45c8887')
//     // await trans.populate('owner').execPopulate()
//     // console.log(trans.owner)
    
//     // const user = await accounts.findById('60864e59e6d3c832f4cfbc27')
//     // await user.populate('trans').execPopulate()
//     // console.log(user.trans)

// }

// main()



// const pet = {
//     name: 'hal'
// }

// pet.toJSON = function (){
//     // console.log(this)
//     // return this
//     return {}
// }

// console.log(JSON.stringify(pet))



// const jwt = require('jsonwebtoken')

// const myFunction = async () =>{
//     const token = jwt.sign({ _id: 'abc123' }, 'thismynewpro', {expiresIn: '7 days'})
//     console.log(token)

//     const data = jwt.verify(token, 'thismynewpro')
//     console.log(data)
// }
// myFunction()










// const myFunction = async () =>{
//     const password = "Red12345!"
//     const hashedPassword = await bcrypt.hash(password, 8)

//     console.log(password)
//     console.log(hashedPassword)

//     const isMatch = await bcrypt.compare('Red12345!', hashedPassword)
//     console.log(isMatch)
// }



// app.get('/',(req,res)=>{
//     //return res.json({success : {id:12,email : 'nully@gmail.com'}})
//     //return res.send({success : "API IS WORKING!"})
//     console.log("this")
//     return res.json({success : {dbb}})
//  })

