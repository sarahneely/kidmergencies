const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const householdMemberSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    relationship: { type: String, required: true },
    contactPhone: {type: String},
    medical: [{
      conditions: {type: String},
      allergies: {type: String}
    }]
});

module.exports = mongoose.model('HouseholdMember', householdMemberSchema);
