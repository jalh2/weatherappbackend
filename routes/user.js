const express = require('express')
const { signupUser, loginUser, getAllUsers, deleteUser } = require('../controllers/userController')

const router = express.Router()

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

// get all users route
router.get('/all', getAllUsers)

// delete user route
router.delete('/:id', deleteUser)

module.exports = router