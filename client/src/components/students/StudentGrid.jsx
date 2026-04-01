import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import StudentCard from './StudentCard';
import Loader from '../ui/Loader';
import { HiOutlineSearchCircle } from 'react-icons/hi';

const StudentGrid = ({ students, loading, onStudentClick }) => {
  if (loading) return <Loader />;

  if (!students.length) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-24 text-gray-400"
      >
        <div className="w-20 h-20 rounded-full bg-primary/5 flex items-center justify-center mb-5">
          <HiOutlineSearchCircle className="w-10 h-10 text-primary/40" />
        </div>
        <p className="text-xl font-bold text-gray-500">No students found</p>
        <p className="text-sm text-gray-400 mt-1">Try adjusting your search or filters</p>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
      <AnimatePresence mode="popLayout">
        {students.map((student, i) => (
          <StudentCard
            key={student._id}
            student={student}
            index={i}
            onClick={() => onStudentClick(student)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default StudentGrid;
