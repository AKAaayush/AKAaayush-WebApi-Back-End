const express = require('express'); //third party
const router = express.Router();
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const Registration = require('../model/admin_model');

// Add Admin
router.post('/admin/add',
//validation
[
    check('email', "Invalid Emial Address ").isEmail(),
    check('name', "You must enter name").not().isEmpty(),
    check('address', "You must enter Address").not().isEmpty()
],
function(req,res){
    const  errors = validationResult(req)
    console.log(errors.array())
    if(!errors.isEmpty()){
        res.status(400).json(errors.array())
    }
    // if (!errors.isEmail()) {
    //     res.status(400).json(errors.array())
        
    // }
     else {
        
        const name = req.body.name
        const address = req.body.address
        const email = req.body.email
        const password = req.body.password

        bcrypt.hash(password,10, function(err, hash){
            console.log(hash)
            const me = new Registration({name : name,  address:address,  email:email, password:hash});
            me.save()
            .then(function(result){
                // success insert
                res.status(201).json({a : "Registered success"});

            })
            .catch(function(err){
                res.status(500).json({message : err})
            });
            console.log("Sucessfully Registered");
        })

    
        
    }
})

router.put('/admin/update', function(req,res){
    const name = req.body.name
    const address = req.body.address
    const email = req.body.email
    const id = req.body.id

    Registration.updateOne({_id : id}, {
        name:name,
        address:address,
        email:email
    }
      )
    .then(function(result){
      res.status(200).json({message:"Menu Updated",success: true,})
    })
    console.log("here")
    .catch(function(e){
      res.status(500).json({
        message:e,success: false
      })
    })

  })
module.exports = router;