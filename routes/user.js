const express = require('express')

// controller functions
const { signupUser, loginUser, getAllUsers } = require('../controllers/userController')

const router = express.Router()


// get all users route
router.get('/all', getAllUsers)

// signup route
router.post('/signup', signupUser)
router.post('/login', loginUser)


module.exports = router