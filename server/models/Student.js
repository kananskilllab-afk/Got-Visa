const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  photo: {
    type: String,
    default: '',
  },
  photoPublicId: {
    type: String,
    default: '',
  },
  mobileNumber: {
    type: String,
    trim: true,
    default: '',
  },
  email: {
    type: String,
    trim: true,
    default: '',
  },
  country: {
    type: String,
    required: true,
    trim: true,
  },
  examType: {
    type: String,
    trim: true,
    default: '',
  },
  result: {
    type: String,
    trim: true,
    default: '',
  },
}, { timestamps: true });

studentSchema.index({ country: 1 });
studentSchema.index({ examType: 1 });
studentSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Student', studentSchema);
