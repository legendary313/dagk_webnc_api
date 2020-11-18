const mongoose = require('mongoose');

const ColumnSchema = new mongoose.Schema({
  id_board: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Column', ColumnSchema);
