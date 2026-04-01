import { motion } from 'framer-motion';
import { HiPencil, HiTrash, HiOutlineLocationMarker, HiOutlineAcademicCap } from 'react-icons/hi';
import Badge from '../ui/Badge';

const AdminStudentCard = ({ student, onEdit, onDelete, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.04, duration: 0.4, type: 'spring' }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 overflow-hidden group hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30 transition-all duration-300"
    >
      {/* Photo Section */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        {student.photo ? (
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
            src={student.photo}
            alt={student.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 via-sky/10 to-secondary/10">
            <motion.span
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-5xl font-black text-primary/20"
            >
              {student.name.charAt(0)}
            </motion.span>
          </div>
        )}

        {/* Exam Type Badge */}
        {student.examType && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
            className="absolute top-3 right-3"
          >
            <Badge variant="blue" className="shadow-lg backdrop-blur-md">
              {student.examType}
            </Badge>
          </motion.div>
        )}

        {/* Hover overlay with actions */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end justify-center gap-3 p-4"
        >
          <motion.button
            whileHover={{ scale: 1.1, y: -3 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onEdit(student._id)}
            className="flex items-center gap-2 px-4 py-2.5 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg hover:bg-sky hover:text-white transition-colors cursor-pointer border-none"
          >
            <HiPencil className="w-4 h-4" />
            <span className="text-xs font-bold">Edit</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1, y: -3 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onDelete(student)}
            className="flex items-center gap-2 px-4 py-2.5 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg hover:bg-red-500 hover:text-white transition-colors cursor-pointer border-none"
          >
            <HiTrash className="w-4 h-4" />
            <span className="text-xs font-bold">Delete</span>
          </motion.button>
        </motion.div>
      </div>

      {/* Info Section */}
      <div className="p-4">
        <h3 className="font-bold text-gray-800 text-base truncate group-hover:text-primary transition-colors">
          {student.name}
        </h3>

        <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary/20 to-sky/20 flex items-center justify-center flex-shrink-0">
            <HiOutlineLocationMarker className="w-3.5 h-3.5 text-primary" />
          </div>
          <span className="font-semibold">{student.country}</span>
        </div>

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
          {student.examType ? (
            <Badge variant="blue" className="shadow-md">
              {student.examType}
            </Badge>
          ) : (
            <span className="text-xs text-gray-400 font-medium">No exam</span>
          )}
          {student.result && (
            <div className="flex items-center gap-1.5 text-xs text-gray-500 font-bold">
              <HiOutlineAcademicCap className="w-3.5 h-3.5 text-secondary" />
              Score: {student.result}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default AdminStudentCard;
