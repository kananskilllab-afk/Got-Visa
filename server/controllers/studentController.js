const Student = require('../models/Student');

const toBase64 = (file) => {
  const mime = file.mimetype;
  const b64 = file.buffer.toString('base64');
  return `data:${mime};base64,${b64}`;
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

    // New detailed filters
    if (req.query.intake) {
      filter.intake = new RegExp(req.query.intake, 'i');
    }

    if (req.query.program) {
      filter.program = new RegExp(req.query.program, 'i');
    }

    if (req.query.email) {
      filter.email = new RegExp(req.query.email, 'i');
    }

    if (req.query.mobile) {
      filter.$or = [
        { mobileNumber: new RegExp(req.query.mobile, 'i') },
        { currentMobileNumber: new RegExp(req.query.mobile, 'i') }
      ];
    }

    if (req.query.pincode) {
      filter.pincode = new RegExp(req.query.pincode, 'i');
    }

    if (req.query.area) {
      filter.areaLandmark = new RegExp(req.query.area, 'i');
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
      data.photo = toBase64(req.file);
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
      req.body.photo = toBase64(req.file);
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

    await Student.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Student deleted' });
  } catch (error) {
    next(error);
  }
};
