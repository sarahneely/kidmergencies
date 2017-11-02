const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  address: [{
    streetAddress: String,
    city: String,
    state: String,
    zip: String
  }],
  contacts: [{
    name: String,
    image: String,
    phone: String
  }],
  userSchema.virtual('fullAddress').get(function () {
  return this.address.streetAddress + ', ' + this.address.city + ', ' + this.address.state + ' ' + this.address.zip;
  });
});
