const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  visaGotYear: {
    type: Number,
    required: true,
  },
  photoUrl: {
    type: String,
    required: true,
  },
  quote: {
    type: String,
    default: 'Successfully Got Visa!'
  }
});

module.exports = mongoose.model('Student', StudentSchema);
