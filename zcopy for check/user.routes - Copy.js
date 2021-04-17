const express = require('express');
const router = express.Router();

const users = [
    {
        id: 0,
        name: "netta lee",
        capsule:1
    }
]

router.get('/', (req,res) =>{
    return res.status(200).json({users : users})
})

module.exports = router;