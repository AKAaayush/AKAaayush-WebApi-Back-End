const express = require('express');
const router = express.Router();
const Checkout = require('../model/checkout_model');
const auth = require("../middleware/auth")
// const auth = require("../middleware/auth")
var ObjectID = require('mongodb').ObjectID; 


router.post('/checkout', auth.verifyUser, function(req, res){

    const checkoutdata = {
        userId: ObjectID(req.body.userId),
        products : req.body.products
    }

    console.log(checkoutdata)
    // console.log(checkoutdata)
    const Add = new Checkout(
        checkoutdata)
    Add.save().then(function () {
        res.send("product has been added")
    }).catch(function (e) {
        res.send(e)
    })
    console.log(Add)
})





module.exports = router