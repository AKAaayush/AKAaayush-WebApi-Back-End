const mongose = require('mongoose')

const employeeDetails = mongose.model('employeeDetails',{
    employe_name: {
        type: String,
        require: true,
        trim: true
    },

    employe_address: {
        type: String,
        trim: true
    },
    employe_phone:{
        type:String,
        require:true,
        trim :true
    },
    employe_gender: {
        type: String,
        require: true,
        trim: true
    },
    employe_dob: {
        type: String,
        require: true,
        trim: true
    },
    employe_email: {
        type: String,
        require: true,
        unique: true
    }
    ,
    employe_password: {
        type: String,
        require: true,
        trim: true
    },

    // tokens: [{
    //     token: {
    //         type: String,
    //     }
    // }]
}
    
) 

module.exports=employeeDetails