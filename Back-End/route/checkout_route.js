const express = require('express');
const router = express.Router();
const Checkout = require('../model/checkout_model');
const auth = require("../middleware/auth")
const { check, validationResult } = require('express-validator');
const { json } = require('body-parser');




router.post('/add/fav',
    [
        check('userId', "userId must be filled").not().isEmpty(),
        check('productId', "productId must be filled").not().isEmpty()
    ],
    
     (req, res) => {
        const errros = validationResult(req);
        if (errros.isEmpty()) {
            console.log("here")
            var post_data = req.body
            var userId = post_data.userId/////check it and ask
            var productId = post_data.productId
            console.log(userId)
            var data = Checkout({ userId: userId, productId: productId})
            data.save().then(function () {
                console.log("success")
                res.status(201).json({ success: true, msg: "Added In Fav" })
            }).catch(function (e) {
                res.status(200).json({ success: false, msg: "error" })
            })
        }
        else {
            res.status(200).json({ succes: false, msg:"error here" })
        }
    })
router.get('/fav/profuct/:id',
    auth.verifyUser,
     (req, res) => {
        const userId = req.params.id
        Checkout.find({ userId: userId }).then(function (data) {
            console.log(data)
            res.status(200).json({ success: true, data: data })
        }).catch(function (e) {
            res.status(201).json({ success: false, msg: "Some Error Occurs" })
        })
    })



router.get('/fav/product/by/:id'),
    auth.verifyUser,
     (req, res) => {
        const userId = req.params.id
        const productId = req.body.productId
        Checkout.find({ userId: userId, productId: productId }).then(function (data) {
            console.log(data)
            res.status(200).json({ success: true, data: data })
        }).catch(function (e) {

            res.status(201).json({ success: false, msg: "Some Error Occurs" })
        })
    }

/////// hernu prni chis
router.delete('/delete/bookmark/:PId',
    auth.verifyUser,
    
    (req, res) => {
        const PId = req.params.PId;
        Checkout.deleteOne({ productId: PId  }).then(function () {
            console.log("here")
            res.status(200).json({ success: true, msg: "Bookmark Successfully deleted" })
        }).catch(function (e) {
            res.status(201).json({ success: false, msg: "error" })
        })
    })

module.exports = router

module.exports = router