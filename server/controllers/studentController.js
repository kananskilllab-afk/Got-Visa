const Student = require('../models/Student');
const cloudinary = require('../config/cloudinary');

const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'got-visa/students' },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    stream.end(buffer);
  });
};

exports.getStudents = async (req, res, next) => {
  try {
    const filter = {};

    if (req.query.country) {
      filter.country = new RegExp(`^${req.query.country}$`, 'i');
    }

    if (req.query.search) {
      filter.name = new RegExp(req.query.search, 'i');
    }

    if (req.query.examType) {
      filter.examType = new RegExp(req.query.examType, 'i');
    }

    const students = await Student.find(filter).sort({ createdAt: -1 });

    res.json({ success: true, count: students.length, students });
  } catch (error) {
    next(error);
  }
};

exports.getStudent = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      res.status(404);
      throw new Error('Student not found');
    }
    res.json({ success: true, student });
  } catch (error) {
    next(error);
  }
};

exports.createStudent = async (req, res, next) => {
  try {
    const data = { ...req.body };

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      data.photo = result.secure_url;
      data.photoPublicId = result.public_id;
    }

    const student = await Student.create(data);
    res.status(201).json({ success: true, student });
  } catch (error) {
    next(error);
  }
};

exports.updateStudent = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      res.status(404);
      throw new Error('Student not found');
    }

    if (req.file) {
      if (student.photoPublicId) {
        await cloudinary.uploader.destroy(student.photoPublicId);
      }
      const result = await uploadToCloudinary(req.file.buffer);
      req.body.photo = result.secure_url;
      req.body.photoPublicId = result.public_id;
    }

    const updated = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({ success: true, student: updated });
  } catch (error) {
    next(error);
  }
};

exports.deleteStudent = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      res.status(404);
      throw new Error('Student not found');
    }

    if (student.photoPublicId) {
      await cloudinary.uploader.destroy(student.photoPublicId);
    }

    await Student.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Student deleted' });
  } catch (error) {
    next(error);
  }
};
