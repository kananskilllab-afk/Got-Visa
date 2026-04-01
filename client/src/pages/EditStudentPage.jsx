import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiArrowLeft, HiOutlinePencil } from 'react-icons/hi';
import toast from 'react-hot-toast';
import api from '../api/axios';
import StudentForm from '../components/admin/StudentForm';
import Loader from '../components/ui/Loader';

const EditStudentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const { data } = await api.get(`/students/${id}`);
        setStudent(data.student);
      } catch {
        toast.error('Student not found');
        navigate('/admin/students');
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, [id, navigate]);

  if (loading) return <Loader />;

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
            <h1 className="text-3xl font-black text-gray-800 tracking-tight">Edit Student</h1>
            <p className="text-gray-500 font-medium text-sm mt-0.5">Update student information</p>
          </div>
        </div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500, delay: 0.2 }}
          className="hidden sm:flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-primary to-primary-light rounded-xl shadow-lg shadow-primary/30"
        >
          <HiOutlinePencil className="w-5 h-5 text-white" />
          <span className="text-sm font-bold text-white">Edit Mode</span>
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
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-lime flex items-center justify-center shadow-lg">
            <HiOutlinePencil className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-gray-800 text-lg">Update Information</h2>
            <p className="text-sm text-gray-400 font-medium">Modify the student record</p>
          </div>
        </div>
        {student && <StudentForm initialData={student} />}
      </motion.div>
    </div>
  );
};

export default EditStudentPage;
