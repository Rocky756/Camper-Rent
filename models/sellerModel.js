const mongoose = require('mongoose');
const Schema = require('mongoose');

const sellerSchema = mongoose.Schema({
  login: {
    type: String,
    unique: true,
  },
  email: String,
  password: String, 
  status: String,
  favorites: Number,
  },
  {
    timestamps: true,
  });
sellerSchema.statics.checkUniqueLogin = async function(login) {
  const users = await this.find().lean();
  if( users) {
    let userLogin = users.find(item => item.login == login);
    return userLogin;
  };
}
sellerSchema.statics.checkUniqueEmail = async function(email) {
  const users = await this.find();
  if (email) {
    let userEmail = users.find(item => item.email == email);
    return userEmail;

  }
}
const SellerModel = mongoose.model('Sellers', sellerSchema);
module.exports = SellerModel;

