const mongoose = require('mongoose');
const Schema = require('mongoose');

const userSchema = mongoose.Schema({
  login: {
    type: String,
    unique: true,
  },
  email: String,
  password: String, 
  status: String,
  chosen: {
    type: Array,
    default: [],
  }
  },
  {
    timestamps: true,
  });
userSchema.statics.checkUniqueLogin = async function(login) {
  const users = await this.find().lean();
  if( users) {
    let userLogin = users.find(item => item.login == login);
    return userLogin;
  };
}
userSchema.statics.checkUniqueEmail = async function(email) {
  const users = await this.find();
  if (email) {
    let userEmail = users.find(item => item.email == email);
    return userEmail;

  }
}
const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;

