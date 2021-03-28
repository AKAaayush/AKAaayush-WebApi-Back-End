const mongoose=require('mongoose')
const checkout = mongoose.model('CheckOutDetails', {
    userId:{
        type:String,
        required:true
    },
    productId:{
        type:String,
        required:true
    }
    
})
module.exports= checkout