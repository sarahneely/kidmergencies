const mongoose = require('mongoose');
// mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
// const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  // address: [{
  //   streetAddress: { type: String, required: true },
  //   aptNumber: { type: String, required: false },
  //   city: { type: String, required: true },
  //   state: { type: String, required: true },
  //   zip: { type: String, required: true }
  // }],
  // contacts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Contact' }]
  // userSchema.virtual('fullAddress').get(function () {
  // return this.address.streetAddress + ', ' + this.address.city + ', ' + this.address.state + ' ' + this.address.zip;
  // });
});

module.exports = mongoose.model('User', userSchema);
