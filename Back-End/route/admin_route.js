const express = require('express'); //third party
const router = express.Router();
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const Admin = require('../model/admin_model');
const auth = require('../middleware/auth');


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
            const me = new Admin({name : name,  address:address,  email:email, password:hash});
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

//admin login
// router.post('/admin/login',function(req,res){
//   const email = req.body.email
//   const password = req.body.password
//   // console.log(req.body.email)

//   Admin.findOne({email : email})
//   .then(function(AdminData){
//       if(AdminData==null){
//           return res.status(403).json({message : "Invalid User!!"})
//       }
//       bcrypt.compare(password,AdminData.password, function(err, result){
//           if(result==false){
//               const token = ""  
//               console.log(token)  
//               return res.status(201).json({success:false,message : "Invalid User!!", token: token}) 
                  
//             }
//           //   res.send("authenticated!!!")

//  const token = jwt.sign({adminId :AdminData._id},'secretkey' );
//           res.status(200).json({
//               success: true,
//               message: "login success",
//               token : token,
//               id:AdminData._id
//           })
//           // console.log("HERE")

//       })
      
//   })
//   .catch(function(e){
//       res.send(e)
//   })
  

// })
// router.post('/admin/login', function (req, res) {
//   const email = req.body.email
//   const password = req.body.password

//   Admin.findOne({ email: email })
//     .then(function (userData) {
//       if(userData==null){
//         console.log("Invalid User")
//           return res.status(403).json({success: false, message : "Invalid User!!"})
          
//       }
//       bcrypt.compare(password, userData.password, function (err, result) {
//         if (result == false) {
//           const token= "";
//           return res.status(403).json({ success: false, message: "Invalid Admin!!", token:token })
//         }
//         //   res.send("authenticated!!!")
//         const token = jwt.sign({ userId: userData._id }, 'secretkey');
//         console.log(userData._id)
//         res.status(200).json({
//           success: true,
//           message: "admin login success",
//           token: token,
//           id: userData._id
//         })

//       })

//     })
//     .catch()



// })
router.post('/admin/login', async function (req, res) {
  try{
    const email = req.body.email
    const password = req.body.password
    const Users = await Admin.checkCrediantialsDb(email,
      password)
  const token = await Users.generateAuthToken()
      res.status(200).json({
        success: true,
        message: "admin login success",
        token: token,
        id: Users._id
      })
    }
    catch(e){
      res.status(200).json({
        success:false,
        message:"invalid credential"
      })
    }
  })

router.put('/admin/update', function(req,res){
    const name = req.body.name
    const address = req.body.address
    const email = req.body.email
    const id = req.body.id

    Admin.updateOne({_id : id}, {
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

  // Admin profile check
  router.get('/checklogin',auth.verifyAdmin, async function(req,res) {
    // res.send(req.data)
   
        res.send(req.user)
    
    


})
//admin logout
// router.delete('/logout')
module.exports = router;