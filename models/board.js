const mongoose = require('mongoose');

const BoardSchema = new mongoose.Schema({
  id_user: {
    type: String,
    required: true,
    unique:false
  },
  name: {
    type: String,
    required: true,
    unique:false
  },
  description: {
    type: String,
    required: true,
    unique:false
  }
});

module.exports = mongoose.model('Board', BoardSchema);
