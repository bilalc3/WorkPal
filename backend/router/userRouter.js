const express = require('express')
const {loginUser, signupUser} = require('../Controllers/UserController')
const router = express.Router()


//loggin in user
router.post('/login', loginUser)


// singing up user
router.post('/signup', signupUser)


module.exports = router 