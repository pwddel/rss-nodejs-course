const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  login: String,
  password: String,
  _id: {
    type: String,
    default: uuid
  }
});

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

userSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.statics.toResponse = user => {
  if (!user) return {};
  const { id, name, login } = user;
  return { id, name, login };
};

const User = mongoose.model('User', userSchema);

/* class User {
  constructor({
    id = uuid(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd'
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  static toDB(user) {
    if (!user) return {};
    const { id, name, login, password } = user;
    return { id, name, login, password };
  }

  static toResponse(user) {
    if (!user) return {};
    const { id, name, login } = user;
    return { id, name, login };
  }
}*/

module.exports = User;
