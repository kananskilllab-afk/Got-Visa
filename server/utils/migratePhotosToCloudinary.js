require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
require('dns').setServers(['8.8.8.8', '8.8.4.4']);
const connectDB = require('../config/db');
const Student = require('../models/Student');
const cloudinary = require('../config/cloudinary');

const migrate = async () => {
  await connectDB();

  const students = await Student.find({ photo: /^data:/ });
  console.log(`Found ${students.length} students with base64 photos to migrate.\n`);

  let success = 0;
  let failed = 0;

  for (const student of students) {
    try {
      const result = await cloudinary.uploader.upload(student.photo, {
        folder: 'got-visa/students',
        public_id: `student_${student._id}`,
        overwrite: true,
      });
      await Student.findByIdAndUpdate(student._id, {
        photo: result.secure_url,
        photoPublicId: result.public_id,
      });
      console.log(`✓  ${student.name}`);
      success++;
    } catch (err) {
      console.error(`✗  ${student.name} — ${err.message}`);
      failed++;
    }
  }

  console.log(`\nDone. ${success} migrated, ${failed} failed.`);
  process.exit(0);
};

migrate().catch((err) => {
  console.error(err);
  process.exit(1);
});
