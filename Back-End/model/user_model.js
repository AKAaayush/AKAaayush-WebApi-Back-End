const mongoose = require('mongoose') // database connection
const userRegistration = mongoose.model('UserDetails', {
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

module.exports = userRegistration;