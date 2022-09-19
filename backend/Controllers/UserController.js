const User = require('../Models/UserModel')
const jwt = require('jsonwebtoken')
require("dotenv").config()


const createToken = (_id) => {
    // first {payload non sensit4ive info}, second {secret}, {expiry token}
    return jwt.sign({ _id: _id }, process.env.SECRET, { expiresIn: '3d' })
}


const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.login(email, password)
        const token = createToken(user._id)
        res.status(200).json({ email, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const signupUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // signup using static method then returning json
        const user = await User.signup(email, password)
        const token = createToken(user._id)
        res.status(200).json({ email, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

module.exports = { loginUser, signupUser }