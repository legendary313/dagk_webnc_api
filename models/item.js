const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  id_board: {
    type: String,
    required: true
  },
  id_column: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Item', ItemSchema);