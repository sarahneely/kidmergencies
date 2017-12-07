const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const historySchema = new Schema({
  user_id: { type: String, required: true },
  date: { type: Date, required: true },
  message: { type: String, required: true }
});

// Todo: upon deletion of user, also delete user's history
module.exports = mongoose.model('History', historySchema);
