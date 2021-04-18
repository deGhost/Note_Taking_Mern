const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const labelSchema = new Schema({
  labelname: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
}, {
  timestamps: true,
});

const Label = mongoose.model('Label', labelSchema);

module.exports = Label;