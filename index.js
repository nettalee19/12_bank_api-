const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port =8001;
const usersRoute = require('./routes/users.routes');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db=fs.readFileSync('../data/users.json').toString()
dbb=JSON.parse(db)

app.use('/bank/users',usersRoute);

// app.listen(port,()=>{
//     console.log(`bank's app start at ${port}`)
// })

app.get('/',(req,res)=>{
    //return res.json({success : {id:12,email : 'nully@gmail.com'}})
    //return res.send({success : "API IS WORKING!"})
    console.log("this")
    return res.json({success : {dbb}})
 })

app.listen(process.env.PORT || 5000)