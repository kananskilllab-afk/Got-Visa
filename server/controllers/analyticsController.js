const Student = require('../models/Student');

exports.getAnalytics = async (req, res, next) => {
  try {
    const [
      totalStudents,
      byCountry,
      byExamType,
      monthlyRegistrations,
    ] = await Promise.all([
      Student.countDocuments(),
      Student.aggregate([
        { $group: { _id: '$country', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),
      Student.aggregate([
        { $match: { examType: { $ne: '' } } },
        { $group: { _id: '$examType', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),
      Student.aggregate([
        {
          $group: {
            _id: {
              year: { $year: '$createdAt' },
              month: { $month: '$createdAt' },
            },
            count: { $sum: 1 },
          },
        },
        { $sort: { '_id.year': -1, '_id.month': -1 } },
        { $limit: 12 },
      ]),
    ]);

    const countriesCount = byCountry.length;

    res.json({
      success: true,
      data: {
        totalStudents,
        countriesCount,
        byCountry,
        byExamType,
        monthlyRegistrations: monthlyRegistrations.reverse(),
      },
    });
  } catch (error) {
    next(error);
  }
};
