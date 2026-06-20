const cloudinary = require('../config/cloudinary');
const Student = require('../models/Student');

const uploadToCloudinary = (buffer) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'got-visa/students', resource_type: 'image' },
      (err, result) => (err ? reject(err) : resolve(result))
    );
    stream.end(buffer);
  });

exports.getStudents = async (req, res, next) => {
  try {
    const filter = {};

    if (req.query.country) filter.country = new RegExp(`^${req.query.country}$`, 'i');
    if (req.query.search)   filter.name = new RegExp(req.query.search, 'i');
    if (req.query.examType) filter.examType = new RegExp(req.query.examType, 'i');
    if (req.query.intake)   filter.intake = new RegExp(req.query.intake, 'i');
    if (req.query.program)  filter.program = new RegExp(req.query.program, 'i');
    if (req.query.email)    filter.email = new RegExp(req.query.email, 'i');
    if (req.query.pincode)  filter.pincode = new RegExp(req.query.pincode, 'i');
    if (req.query.area)     filter.areaLandmark = new RegExp(req.query.area, 'i');
    if (req.query.mobile) {
      filter.$or = [
        { mobileNumber: new RegExp(req.query.mobile, 'i') },
        { currentMobileNumber: new RegExp(req.query.mobile, 'i') },
      ];
    }

    // Exclude raw base64 photos from list — only Cloudinary URLs (short strings) are included
    const students = await Student.find(filter).sort({ createdAt: -1 }).lean();

    const sanitized = students.map((s) => {
      if (s.photo && s.photo.startsWith('data:')) s.photo = '';
      return s;
    });

    res.json({ success: true, count: sanitized.length, students: sanitized });
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
        await cloudinary.uploader.destroy(student.photoPublicId).catch(() => {});
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
      await cloudinary.uploader.destroy(student.photoPublicId).catch(() => {});
    }
    await Student.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Student deleted' });
  } catch (error) {
    next(error);
  }
};
