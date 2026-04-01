require('dotenv').config({ path: __dirname + '/.env' });
const mongoose = require('mongoose');
const path = require('path');
const xlsx = require('xlsx');

// Use the Student model
const Student = require('./models/Student');

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Read Excel file
    const excelPath = path.join(__dirname, '..', 'data.xlsx');
    const wb = xlsx.readFile(excelPath);
    const ws = wb.Sheets[wb.SheetNames[0]];
    const rawData = xlsx.utils.sheet_to_json(ws);

    console.log(`Found ${rawData.length} rows in Excel`);

    // Delete existing students
    const deleteResult = await Student.deleteMany({});
    console.log(`Deleted ${deleteResult.deletedCount} existing students`);

    // Map Excel data to Student schema
    const students = rawData.map((row) => ({
      name: (row['Student name'] || '').trim(),
      mobileNumber: String(row['Mobile number'] || '').trim(),
      email: (row['Email'] || '').trim(),
      country: (row['Country '] || row['Country'] || '').trim(),
      examType: (row['Exam type'] || '').trim(),
      result: String(row['Result'] || '').trim(),
      photo: row['Student Photo attachement'] || '',
    }));

    // Insert all students
    const inserted = await Student.insertMany(students);
    console.log(`Successfully seeded ${inserted.length} students`);

    // Print summary
    const countries = [...new Set(inserted.map(s => s.country))];
    const examTypes = [...new Set(inserted.filter(s => s.examType).map(s => s.examType))];
    console.log('\n--- Summary ---');
    console.log(`Countries: ${countries.join(', ')}`);
    console.log(`Exam Types: ${examTypes.join(', ')}`);
    console.log('Seed completed successfully!');

  } catch (error) {
    console.error('Seed failed:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

seedDatabase();
