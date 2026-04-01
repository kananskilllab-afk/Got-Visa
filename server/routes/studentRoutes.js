const express = require('express');
const router = express.Router();
const {
  getStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
} = require('../controllers/studentController');
const protect = require('../middleware/auth');
const upload = require('../middleware/upload');

router.route('/')
  .get(getStudents)
  .post(protect, upload.single('photo'), createStudent);

router.route('/:id')
  .get(getStudent)
  .put(protect, upload.single('photo'), updateStudent)
  .delete(protect, deleteStudent);

module.exports = router;
