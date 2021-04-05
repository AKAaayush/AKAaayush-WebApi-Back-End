const mongoose=require('mongoose')
const checkout = mongoose.model('CheckOutDetails', {
    userId:{
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
    }
}],
delivery_status:{
    type:String,
    default:'pending'
}
})
module.exports= checkout