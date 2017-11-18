const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const Household = require('../models/household');

const userSchema = new Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    validate: {
      validator: function (v) { 
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v);
      }, 
      message: 'Not a valid email.'} 
      },
  password: { 
    type: String, 
    required: true,
    validate: {
      validator: function(p) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,16}$/.test(p);
      },
      message: 'Password must be at least 8 characters and must contain at least one each of uppercase and lowercase letters, numbers and special characters.'
    }
   },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },

  // contacts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Contact' }]
  // userSchema.virtual('fullAddress').get(function () {
  // return this.address.streetAddress + ', ' + this.address.city + ', ' + this.address.state + ' ' + this.address.zip;
  // });
});

userSchema.pre('save', function (next) {
  bcrypt.hash(this.password, 10, (err, hash) => {
    if (err) return next(err);
    this.password = hash;
    next();
  });
});

userSchema.pre('remove', function (next) {
  console.log('arrived to pre');
  Household.findOneAndRemove({user: this._id}, (err, household) => {
    if (err) {
      console.log("household find one failed");
    } else {
      console.log('Household deleted');
    }
  })
  Contact.remove({ user: this._id }, (err, contact) => {
    if (err) {
      console.log("contact remove all failed");
    } else {
      console.log('Contacts deleted');
    }
  })
  console.log("pre test");
  next();
});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
