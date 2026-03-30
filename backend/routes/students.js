const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const mongoose = require('mongoose');

// In-memory fallback for testing
let memoryStudents = [];

// Get all students or search by name, dob, visa year
router.get('/', async (req, res) => {
  try {
    const { name, dob, visaYear } = req.query;
    let query = {};

    if (name) {
      query.name = { $regex: name, $options: 'i' };
    }
    if (dob) {
      const dobDate = new Date(dob);
      const nextDay = new Date(dobDate);
      nextDay.setDate(nextDay.getDate() + 1);
      query.dob = { $gte: dobDate, $lt: nextDay };
    }
    if (visaYear) {
      query.visaGotYear = parseInt(visaYear);
    }

    // Check if connected, otherwise use memory
    if (mongoose.connection.readyState === 1) {
      const students = await Student.find(query);
      res.json(students);
    } else {
      console.warn('MongoDB not connected, using in-memory fallback for GET');
      let filtered = [...memoryStudents];
      if (name) filtered = filtered.filter(s => s.name.toLowerCase().includes(name.toLowerCase()));
      if (visaYear) filtered = filtered.filter(s => s.visaGotYear === parseInt(visaYear));
      res.json(filtered);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create new student
router.post('/', async (req, res) => {
  const studentData = {
    name: req.body.name,
    dob: req.body.dob,
    visaGotYear: req.body.visaGotYear,
    photoUrl: req.body.photoUrl,
    quote: req.body.quote
  };

  try {
    if (mongoose.connection.readyState === 1) {
      const student = new Student(studentData);
      const newStudent = await student.save();
      res.status(201).json(newStudent);
    } else {
      console.warn('MongoDB not connected, using in-memory fallback for POST');
      const newStudent = { ...studentData, _id: Date.now().toString() };
      memoryStudents.push(newStudent);
      res.status(201).json(newStudent);
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;

