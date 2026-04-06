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
  crmId: {
    type: String,
    trim: true,
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
  currentFaculty: {
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
  intake: {
    type: String,
    trim: true,
    default: '',
  },
  collegeName: {
    type: String,
    trim: true,
    default: '',
  },
  address: {
    type: String,
    trim: true,
    default: '',
  },
  currentAddress: {
    type: String,
    trim: true,
    default: '',
  },
  areaLandmark: {
    type: String,
    trim: true,
    default: '',
  },
  pincode: {
    type: String,
    trim: true,
    default: '',
  },
  currentMobileNumber: {
    type: String,
    trim: true,
    default: '',
  },
  program: {
    type: String,
    trim: true,
    default: '',
  },
}, { timestamps: true });

studentSchema.index({ country: 1 });
studentSchema.index({ examType: 1 });
studentSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Student', studentSchema);
