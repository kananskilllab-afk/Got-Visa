import { motion } from 'framer-motion';
import { HiPencil, HiTrash, HiOutlineAcademicCap } from 'react-icons/hi';
import Badge from '../ui/Badge';

const StudentTable = ({ students, onEdit, onDelete }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden"
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-gray-50 via-gray-50/80 to-gray-50 border-b-2 border-gray-100">
              <th className="text-left px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-wider">Student</th>
              <th className="text-left px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-wider">Country</th>
              <th className="text-left px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-wider">Mobile</th>
              <th className="text-left px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-wider">Exam</th>
              <th className="text-left px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-wider">Result</th>
              <th className="text-right px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {students.map((student, index) => (
              <motion.tr
                key={student._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.03 }}
                whileHover={{ backgroundColor: 'rgba(40, 70, 149, 0.03)' }}
                className="transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50 flex-shrink-0 ring-2 ring-gray-100">
                      {student.photo ? (
                        <img src={student.photo} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-sky/10 text-primary font-bold text-sm">
                          {student.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-sm text-gray-800">{student.name}</p>
                      {student.email && (
                        <p className="text-xs text-gray-400 font-medium">{student.email}</p>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary/20 to-sky/20 flex items-center justify-center">
                      <svg className="w-3 h-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-sm font-semibold text-gray-600">{student.country}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-600 font-medium">{student.mobileNumber || '—'}</span>
                </td>
                <td className="px-6 py-4">
                  {student.examType ? (
                    <Badge variant="blue" className="shadow-md">
                      {student.examType}
                    </Badge>
                  ) : (
                    <span className="text-xs text-gray-400 font-medium">—</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  {student.result ? (
                    <div className="flex items-center gap-1.5 text-sm text-gray-600 font-bold">
                      <HiOutlineAcademicCap className="w-4 h-4 text-secondary" />
                      {student.result}
                    </div>
                  ) : (
                    <span className="text-xs text-gray-400 font-medium">—</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onEdit(student._id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-sky/10 to-primary/10 hover:from-sky hover:to-primary text-sky hover:text-white transition-all duration-300 cursor-pointer border-none"
                    >
                      <HiPencil className="w-4 h-4" />
                      <span className="text-xs font-bold">Edit</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onDelete(student)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-red/10 to-orange/10 hover:from-red-500 hover:to-red-600 text-red-500 hover:text-white transition-all duration-300 cursor-pointer border-none"
                    >
                      <HiTrash className="w-4 h-4" />
                      <span className="text-xs font-bold">Delete</span>
                    </motion.button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default StudentTable;
