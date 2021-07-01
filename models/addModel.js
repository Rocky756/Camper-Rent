const { UnavailableForLegalReasons } = require('http-errors');
const mongoose = require('mongoose');
const Schema = require('mongoose');

const addSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  brand: String,
  model: String,
  color: String,
  year: Number,
  sleepingPlace: String,
  country: String,
  condition: String,
  driverLicense: String,
  price: {
    type: Number,
    required: true,
  },
  description: String, 
  region: String,
  mainImage: String,
  image1: String,
  image2: String,
  image3: String,
  image4: String,
  category: String,
  author: String,
  favorites: {
    type: Number,
    default: 0,
  },
  contacts: {
    type: String,
    required: true,
  },
  statusActive: {
    type: Boolean,
    default: true,
  },
  // status: {
  //   type: String,
  //   default: 'active',
  // },
},
{
  timestamps: true,
})


const AddModel = mongoose.model('Adds', addSchema);
module.exports = AddModel;


