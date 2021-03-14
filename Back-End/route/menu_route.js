const express = require('express'); //third party
const router = express.Router();
const menuAdd = require('../model/menu_model');
const upload = require ('../middleware/upload')

//adding menu
router.post('/addmenu',upload.single('menu_image'),function(req, res){

    const menu_name = req.body.menu_name
    const menu_title = req.body.menu_title
    const menu_price = req.body.menu_price
    const menu_desc = req.body.menu_desc
    const menu_image = req.body.menu_image

    const menu = new menuAdd({menu_name : menu_name, menu_title: menu_title, menu_price:menu_price, menu_desc:menu_desc, menu_image : req.file.filename})
    menu.save()

    .then(function(result){
        // success insert
        res.status(200).json({success : true, a : "Menu Added"});

    })
    .catch(function(err){
        res.status(201).json({  success : false, message : err})
    });
    console.log("Menu Added");



})

//display menu
router.get('/menu/display', function(req,res){
    menuAdd.find()
        .then(function (menudisplay) {
            res.status(200).json({
              success: true,
              data: menudisplay,
            });
          })
          .catch(function (error) {
            res.status(500).json({ success: false, message: error });
          });
    
    })

    //MENU EDIT
    router.put('/menu/update',upload.single('menu_image'), function(req,res){
      const menu_name = req.body.menu_name
      const menu_price = req.body.menu_price
      const menu_desc = req.body.menu_desc
      const menu_title = req.body.menu_title
      const menu_image = req.body.menu_image
      const id = req.body.id

      menuAdd.updateOne({_id : id}, {menu_name:menu_name,menu_price:menu_price,menu_desc:menu_desc,menu_title:menu_title,menu_image : req.file.filename }
        )
      .then(function(result){
        res.status(200).json({message:"Menu Updated",success: true,})
        // console.log("Menu Updated")
      })
      
      .catch(function(e){
        res.status(500).json ({message : e});
    })
    

    })




module.exports = router;
