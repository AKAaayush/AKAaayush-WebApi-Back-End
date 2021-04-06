const express = require('express'); //third party
const router = express.Router();
const Table = require('../model/table_model');
const auth = require('../middleware/auth')


router.post('/addtable',auth.verifyUser, function(req, res){
   
    const user_email = req.body.user_email
    const date = req.body.date
    const people = req.body.people
    const time = req.body.time
    

    const table = new Table({user_email:user_email, date:date,people:people,time:time })
    // menu_image : req.file.filename
    table.save()

    .then(function(result){
        // success insert
        res.status(200).json({success : true, a : "table Added"});

    })
    .catch(function(err){
        res.status(201).json({  success : false, message : err})
    });
    console.log("Menu Added");

})
module.exports = router;