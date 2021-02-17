const mongoose = require('mongoose') // database connection
const adminRegistration = mongoose.model('AdminDetails', {
    name: {
        type: String,
        require: true,
        trim: true
    },

    address: {
        type: String,
        trim: true
    },

    email: {
        type: String,
        require: true,
        unique: true
    }
    ,
    password: {
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

module.exports = adminRegistration;