const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const adminSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

// static signup method
adminSchema.statics.signup = async function(username, password) {
    // validation
    if (!username || !password) {
        throw Error('All fields must be filled')
    }

    // check if username exists
    const exists = await this.findOne({ username })
    if (exists) {
        throw Error('Username already in use')
    }

    // hash the password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    // create the admin
    const admin = await this.create({ username, password: hash })

    return admin
}

// static login method
adminSchema.statics.login = async function(username, password) {
    if (!username || !password) {
        throw Error('All fields must be filled')
    }

    const admin = await this.findOne({ username })

    if (!admin) {
        throw Error('Incorrect username')
    }

    const match = await bcrypt.compare(password, admin.password)

    if (!match) {
        throw Error('Incorrect password')
    }

    return admin
}

module.exports = mongoose.model('Admin', adminSchema)
