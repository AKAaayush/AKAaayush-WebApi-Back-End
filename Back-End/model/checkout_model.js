const mongoose=require('mongoose')
var now = new Date();
const checkout = mongoose.model('CheckOutDetails', {
    userId:{
        type: mongoose.Schema.ObjectId,
        ref :'UserDetails',
        type:String,
        required:true
    },
    products:[{
        product_id:{
        type:String,
        required:true
    },
    quantity:{
        type:String,
        required:true
    },
    
    date:{
        type : Date, 
        default: now 
    }
}],
delivery_status:{
    type:String,
    default:'pending'
}
})
module.exports= checkout