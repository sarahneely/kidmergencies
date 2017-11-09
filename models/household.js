const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const householdSchema = new Schema({
  headOfHousehold: [{
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    relationship: { type: String, required: true }
  }],
});

module.exports = mongoose.model('Household', householdSchema);
