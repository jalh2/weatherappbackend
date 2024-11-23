const express = require('express')

// controller functions
const { loginAdmin, signupAdmin } = require('../controllers/adminController')

const router = express.Router()

// signup route
router.post('/signup', signupAdmin)

// login route
router.post('/login', loginAdmin)

module.exports = router
