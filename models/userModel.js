const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
  activeStatus: {
    type: String,
    default: 'none',  // Default value for activeStatus
  },
  longitude: {
    type: Number,
    default: 0, // Default value for longitude
  },
  latitude: {
    type: Number,
    default: 0, // Default value for latitude
  }
});

// static signup method
userSchema.statics.signup = async function(username, password) {
  const exists = await this.findOne({ username });

  if (exists) {
    throw Error('username already in use');
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  // Create the user with defaults for activeStatus, longitude, and latitude
  const user = await this.create({ username, password: hash });

  return user;
};

// static login method
userSchema.statics.login = async function(username, password) {
  if (!username || !password) {
    throw Error('All fields must be filled');
  }

  const user = await this.findOne({ username });
  if (!user) {
    throw Error('Incorrect email or phone number');
  }

  let match = false;
  if (password.startsWith('$2b$')) {
    // Stored password is already hashed (likely bcrypt)
    match = (password === user.password);
  } else {
    // Stored password is plaintext, hash it before comparison
    match = await bcrypt.compare(password, user.password);
  }

  if (!match) {
    throw new Error('Incorrect password');
  }

  return user;
};

// static getAllUsers method
userSchema.statics.getAllUsers = async function() {
  try {
    const users = await this.find({}, { password: 0 });
    return users;
  } catch (error) {
    throw Error('Error fetching users');
  }
};

module.exports = mongoose.model('user', userSchema, 'users');