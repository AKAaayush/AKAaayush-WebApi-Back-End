const express = require('express'); //third party
const router = express.Router();
const upload = require ('../middleware/upload');
const foodItem = require('../model/foodItem_model');

//adding  FoodItems
router.post('/foodadd', upload.single('food_image'), function(req, res){

    const food_name = req.body.food_name
    const food_price = req.body.food_price
    const food_desc =req.body.food_desc
    
    const food = new foodItem({
        food_name : food_name,
        food_price : food_price,
        food_desc : food_desc,
        food_image : req.file.filename
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

module.exports = router;