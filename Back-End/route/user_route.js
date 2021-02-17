const express = require('express'); //third party
const router = express.Router();
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const UserRegistration = require('../model/user_model');
const { route } = require('./admin_route');

// Add User
router.post('/user/add',
//validation
[
    check('email', "Invalid Email Address ").isEmail(),
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
            const me = new UserRegistration({name : name,  address:address,  email:email, password:hash});
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

//display
router.get('/user/display', function(req,res){
   
    UserRegistration.find().then(function(data){
        res.send(data)
    
    })
})

module.exports = router;