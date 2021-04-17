const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const port = 8001;

const userRoute = require('./routes/user.routes')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use('/api/users', userRoute)

app.listen(port, () =>{
    console.log(`netta's app is at ${port}`)
})
