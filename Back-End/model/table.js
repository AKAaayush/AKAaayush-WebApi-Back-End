const mongoose = require('mongoose') // database connection

//attributes of database and create model
const table = mongoose.model('Table', {      
    user_email :{
        type :String,
        require:true,
        trim: true
    },  
     table: {
        type: String,
        require:true,
        trim: true
    },
    people: {
        type: String,
        require:true,
        trim: true
    },
    
    date:{
        type: String,
        trim: true
    },
    
    
  })

  module.exports = table