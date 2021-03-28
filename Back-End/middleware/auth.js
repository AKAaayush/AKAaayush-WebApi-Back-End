const jwt = require('jsonwebtoken')// token handle
const User = require('../model/user_model') // user model

// auth token verify function
module.exports.verifyUser = function(req,res,next){
    try{
        const token = req.headers.authorization.split(" ")[1]; //token only
        console.log(token)
        const decodeData = jwt.verify(token, 'secretkey')
        User.findOne({_id : decodeData.userId})
        .then(function(result){
            //success
            req.user = result
            next()
            
           
        }
    )
        .catch(function(err){
            res.status(401).json({message : err})
        })
    }
    catch(err){
        res.status(401).json({message : "Unauthorized access!!"})
    }
}
