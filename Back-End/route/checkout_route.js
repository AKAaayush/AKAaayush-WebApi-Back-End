const express = require('express');
const router = express.Router();
const Checkout = require('../model/checkout_model');
const auth = require("../middleware/auth")
const { check, validationResult } = require('express-validator');
const { json } = require('body-parser');
var ObjectID = require('mongodb').ObjectID; 


router.post('/checkout', function(req, res){

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