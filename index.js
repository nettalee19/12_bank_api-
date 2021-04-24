const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const usersRoute = require('./routes/users.routes');
const port =5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// const cors = require('cors');

// const db=fs.readFileSync('../data/users.json').toString()
// dbb=JSON.parse(db)

//app.use(cors());
app.use('/bank/users',usersRoute);

//mongoose.connect('mongodb://127.0.0.1:27017/bank', {
// mongoose.connect('mongodb+srv://nettalee19:dM_HqsyqT9K8LK.@cluster0.u9jns.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false,
//     useCreateIndex: true
// }).then(() => {
//     console.log("database connect")
// });
app.get('/', (req,res) =>{
    res.send("test")
})

app.listen(process.env.PORT || 5000, () => {
    console.log(`application start at ${process.env.PORT || 5000}`)
})


// app.get('/',(req,res)=>{
//     //return res.json({success : {id:12,email : 'nully@gmail.com'}})
//     //return res.send({success : "API IS WORKING!"})
//     console.log("this")
//     return res.json({success : {dbb}})
//  })


// app.listen(port,()=>{
//     console.log(`bank's app start at ${port}`)
// })
