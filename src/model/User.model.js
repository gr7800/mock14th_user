const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    email : {type: String, required: true},
    password : {type: String, required: true}, 
})

const UserModel = mongoose.model("usermock14", userSchema)

module.exports = { UserModel }