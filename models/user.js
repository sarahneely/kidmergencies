const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },

  // TODO: Break out Household as it's own model, and Household members as a separate model. Reg form has two parts - part one user info, part 2 household info.

  // contacts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Contact' }]
  // userSchema.virtual('fullAddress').get(function () {
  // return this.address.streetAddress + ', ' + this.address.city + ', ' + this.address.state + ' ' + this.address.zip;
  // });
});

module.exports = mongoose.model('User', userSchema);
