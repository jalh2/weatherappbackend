const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

// get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.getAllUsers()
    res.status(200).json(users)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// login a user
const loginUser = async (req, res) => {
  const {username, password} = req.body
  console.log(username);
  console.log(password);
  try {
    const user = await User.login(username, password)

    // create a token
    const token = createToken(user._id)

    const returnObj = {
      token,
      ...user._doc
    }

    res.status(200).json(returnObj)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// signup a user
const signupUser = async (req, res) => {
  const {username, password} = req.body

  try {
    const user = await User.signup(username, password)

    // create a token
    const token = createToken(user._id)

    const returnObj = {
      token,
      ...user._doc
    }

    res.status(200).json(returnObj)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

module.exports = { signupUser, loginUser, getAllUsers }