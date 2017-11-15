const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const householdSchema = new Schema({
  user: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: [{
    streetAddress: { type: String, required: true },
    aptNumber: { type: String, required: false },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true }
  }],
});

module.exports = mongoose.model('Household', householdSchema);