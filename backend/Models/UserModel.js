const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema 
const validator = require('validator')


const userSchema = new Schema( {
    email: {
        type: String, 
        required: true, 
        unique: true
    }, 
    password: {
        type: String, 
        required: true, 
    }
})

// static method on User 
userSchema.statics.signup = async function(email, password) {

    if (!email || !password) {
        throw Error("All field are required")
    } 
    if (!validator.isEmail(email)) {
        throw Error("Unvalid Email")
    }
    if (!validator.isStrongPassword(password)) {
        throw Error("Password not strong enough")
    }

    // check if email is already exisiting 
    const exists = await this.findOne({email})
    if (exists) {
        throw Error('Email already exists')
    }

    // hash password using bcrypt 
    const salt = await bcrypt.genSalt(10) // get a salt
    const hash = await bcrypt.hash(password, salt)

    const newUser = {email, password: hash}

    // create in database 
    const user = await this.create(newUser)
    return user 
}


// static method on User 
userSchema.statics.login = async function(email, password) {
    //not email or password given
    if (!email || !password) {
        throw Error("All field are required")
    } 

    // find user in data
    const user = await this.findOne({email})

    if(!user) {
        throw Error("Invalid Email")
    }

    // comapre the pass with hash pass in data
    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error ("incorrect password")
    }

    return user
}



module.exports = mongoose.model('User', userSchema)