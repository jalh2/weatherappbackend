const mongoose = require('mongoose');
const crypto = require('crypto');

const Schema = mongoose.Schema;

// Encryption settings
const ENCRYPTION_KEY = Buffer.from('12345678901234567890123456789012'); // 32 bytes key
const IV_LENGTH = 16;

// Helper function to validate key length
function validateKey() {
  console.log('Key length:', ENCRYPTION_KEY.length);
  if (ENCRYPTION_KEY.length !== 32) {
    throw Error(`Encryption key must be exactly 32 characters long (current length: ${ENCRYPTION_KEY.length})`);
  }
}

function encrypt(text) {
  if (!text) throw Error('Text to encrypt cannot be empty');
  validateKey();

  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decrypt(text) {
  if (!text) throw Error('Text to decrypt cannot be empty');
  if (!text.includes(':')) throw Error('Invalid encrypted text format');
  validateKey();

  const textParts = text.split(':');
  const iv = Buffer.from(textParts.shift(), 'hex');
  const encryptedText = Buffer.from(textParts.join(':'), 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

const userSchema = new Schema({
  username: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
    select: true  // This ensures password is included by default
  },
  activeStatus: {
    type: Boolean,
    default: false,  // Default value for activeStatus
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

  const encryptedPassword = encrypt(password);
  // Create the user with defaults for activeStatus, longitude, and latitude
  const user = await this.create({ username, password: encryptedPassword });

  return user;
};

// static login method
userSchema.statics.login = async function(username, password) {
  if (!username || !password) {
    throw Error('All fields must be filled');
  }

  const user = await this.findOne({ username });
  if (!user) {
    throw Error('Incorrect username');
  }

  try {
    const decryptedPassword = decrypt(user.password);
    if (password !== decryptedPassword) {
      throw Error('Incorrect password');
    }
    return user;
  } catch (error) {
    throw Error('Incorrect password');
  }
};

// static getAllUsers method
userSchema.statics.getAllUsers = async function() {
  try {
    const users = await this.find({}).select('+password');
    return users.map(user => {
      try {
        // Try to decrypt the password
        const decryptedPassword = decrypt(user.password);
        return {
          ...user.toObject(),
          password: decryptedPassword
        };
      } catch (error) {
        // If decryption fails, return the user without modifying the password
        return {
          ...user.toObject(),
          password: 'Password encrypted with old method'
        };
      }
    });
  } catch (error) {
    throw Error('Error fetching users');
  }
};

// static deleteUser method
userSchema.statics.deleteUser = async function(userId) {
  try {
    const deletedUser = await this.findByIdAndDelete(userId);
    if (!deletedUser) {
      throw Error('User not found');
    }
    return deletedUser;
  } catch (error) {
    throw Error('Error deleting user');
  }
};

module.exports = mongoose.model('user', userSchema, 'users');