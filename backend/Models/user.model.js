const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    email: {
        type : String,
        required : true,
        unique : true,
        max:50
        
    },
    password:{
        required : true,
        type : String,
        min:6

    }
})


const UserModel = mongoose.model('pococareuser', UserSchema)
module.exports = { UserModel }