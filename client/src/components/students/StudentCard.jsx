import { motion } from 'framer-motion';
import { HiOutlineLocationMarker, HiOutlineAcademicCap, HiOutlineArrowRight } from 'react-icons/hi';
import Badge from '../ui/Badge';

const StudentCard = ({ student, onClick, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, y: -20 }}
      transition={{ delay: index * 0.05, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ y: -12, transition: { duration: 0.35, ease: 'easeOut' } }}
      onClick={onClick}
      className="group bg-white rounded-3xl shadow-lg shadow-gray-200/50 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 cursor-pointer overflow-hidden border border-gray-100 hover:border-primary/30"
    >
      {/* Photo Container */}
      <div className="relative h-64 overflow-hidden">
        {student.photo ? (
          <motion.img
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            src={student.photo}
            alt={student.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 via-sky/10 to-secondary/10">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-sky flex items-center justify-center shadow-xl"
            >
              <span className="text-4xl font-black text-white">
                {student.name.charAt(0).toUpperCase()}
              </span>
            </motion.div>
          </div>
        )}

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

        {/* Shine effect on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.6 }}
        />

        {/* Badges */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start gap-2">
          {student.examType && (
            <Badge variant="blue" className="backdrop-blur-md shadow-lg">
              {student.examType}
            </Badge>
          )}
          {student.result && (
            <Badge variant="success" className="backdrop-blur-md shadow-lg ml-auto">
              Score: {student.result}
            </Badge>
          )}
        </div>

        {/* Arrow indicator */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileHover={{ opacity: 1, scale: 1 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <div className="w-14 h-14 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <HiOutlineArrowRight className="w-6 h-6 text-primary" />
          </div>
        </motion.div>
      </div>

      {/* Info Section */}
      <div className="p-5">
        <motion.h3
          className="font-bold text-gray-800 text-lg mb-3 truncate group-hover:text-primary transition-colors duration-300"
          whileHover={{ x: 5 }}
        >
          {student.name}
        </motion.h3>

        <div className="flex items-center gap-2.5 text-sm text-gray-500">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-7 h-7 rounded-full bg-gradient-to-br from-primary/20 to-sky/20 flex items-center justify-center flex-shrink-0"
          >
            <HiOutlineLocationMarker className="w-4 h-4 text-primary" />
          </motion.div>
          <span className="font-semibold">{student.country}</span>
        </div>

        {/* Hover reveal line */}
        <motion.div
          className="h-1.5 rounded-full bg-gradient-to-r from-primary via-secondary to-lime mt-4 w-0 group-hover:w-full transition-all duration-700 ease-out"
        />
      </div>
    </motion.div>
  );
};

export default StudentCard;
