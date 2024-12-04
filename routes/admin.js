const express = require('express')

// controller functions
const { loginAdmin, signupAdmin, updateAdminPassword } = require('../controllers/adminController')

const router = express.Router()

// signup route
router.post('/signup', signupAdmin)

// login route
router.post('/login', loginAdmin)

// update password route
router.post('/update-password', updateAdminPassword)

module.exports = router
