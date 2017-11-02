const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const householdSchema = new Schema({
  headOfHousehold: [{
    firstName: String,
    lastName: String,
    relationship: String
  }],
});
