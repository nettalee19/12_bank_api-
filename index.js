const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port =8001;
const usersRoute = require('./routes/users.routes');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/bank/users',usersRoute);

app.listen(port,()=>{
    console.log(`bank's app start at ${port}`)
})