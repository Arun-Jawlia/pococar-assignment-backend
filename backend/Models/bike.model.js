const mongoose = require('mongoose')

const BikeSchema = mongoose.Schema({
    bikename: {
        type : String,
        required : true,
        
    },
    img:{
        required : true,
        type : String,

    },
    brand:{
        required : true,
        type : String,
    },
    price:{
        required : true,
        type : String,
    }

})


const BikeModel = mongoose.model('pococarebike', BikeSchema)
module.exports = { BikeModel }