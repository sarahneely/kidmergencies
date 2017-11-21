const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const contactSchema = new Schema({
  phone: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  relationship: { type: String, required: true },
  image: { type: String, required: true },
  user: { type: String, required: true }
});

module.exports = mongoose.model('Contact', contactSchema);
