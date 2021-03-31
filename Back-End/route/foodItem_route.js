const express = require('express'); //third party
const router = express.Router();
const upload = require ('../middleware/upload');
const foodItem = require('../model/foodItem_model');
const auth = require("../middleware/auth")
//adding  FoodItems
router.post('/foodadd', upload.single('food_image'), function(req, res){

    const food_name = req.body.food_name
    const food_price = req.body.food_price
    const food_desc =req.body.food_desc
    const userId = req.body.userId;
    
    const food = new foodItem({
        food_name : food_name,
        food_price : food_price,
        food_desc : food_desc,
        food_image : req.file.filename,
        userId: userId
    })
    food.save()
    .then(function(result){
        res.status(200).json({success: true, result, Message:"Food Successfully Added"})
        console.log(food_name + " Successfully Added!!")
    } )
    .catch(function(err){
        res.status(500).json(success=false, err)
    })
})

//display all food item
router.get('/fooditem/display',function(req,res){
    foodItem.find()
    .then(function (fooditemdisplay) {
        res.status(200).json({
          success: true,
          data: fooditemdisplay,
        });
      })
      .catch(function (error) {
        res.status(500).json({ success: false, message: error });
      });
})

router.get('/food/:id',
    auth.verifyUser,
     (req, res) => {
        const id = req.params.id
        foodItem.find({ _id: id }).then(function (result) {
            console.log(result)
            res.status(200).json({ success: true, result: result })
        }).catch(function (e) {
            res.status(201).json({ success: false, message: "something went wrong" })
        })
    })

    //search
    router.get("/search", async (req, res) => {
        // create query object to hold search value and category value
        const query = {};
        // assign search value to query.name
        if (req.query.search) {
            query.name = {
                $regex: req.query.search,
                $options: 'i'
            };
            // assigne category value to query.category
            if (req.query.category && req.query.category != 'All') {
                query.category = req.query.category;
            }
        }
        try {
            let products = await foodItem.find(query).select('-photo');
            res.json(products);
    
        } catch (error) {
            console.log(error)
            res.status(500).send('Error to get products')
        }
    
    })

module.exports = router;