import { motion } from 'framer-motion';
import { HiArrowLeft, HiOutlinePlus, HiOutlineUserAdd } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import StudentForm from '../components/admin/StudentForm';

const AddStudentPage = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/admin/students')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10 text-gray-600 hover:text-primary font-semibold transition-all duration-300 cursor-pointer border border-gray-200 hover:border-primary/30 shadow-sm"
          >
            <HiArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back</span>
          </motion.button>
          <div>
            <h1 className="text-3xl font-black text-gray-800 tracking-tight">Add New Student</h1>
            <p className="text-gray-500 font-medium text-sm mt-0.5">Record a new success story</p>
          </div>
        </div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500, delay: 0.2 }}
          className="hidden sm:flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-secondary to-lime rounded-xl shadow-lg shadow-secondary/30"
        >
          <HiOutlinePlus className="w-5 h-5 text-white" />
          <span className="text-sm font-bold text-white">New Record</span>
        </motion.div>
      </motion.div>

      {/* Form Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="bg-white rounded-3xl p-8 shadow-xl shadow-gray-200/50 border border-gray-100"
      >
        <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-100">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-sky flex items-center justify-center shadow-lg">
            <HiOutlineUserAdd className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-gray-800 text-lg">Student Information</h2>
            <p className="text-sm text-gray-400 font-medium">Fill in the details below</p>
          </div>
        </div>
        <StudentForm />
      </motion.div>
    </div>
  );
};

export default AddStudentPage;
