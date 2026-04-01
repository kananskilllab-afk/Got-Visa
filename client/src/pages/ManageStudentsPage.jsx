import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { HiPlus, HiOutlineUsers, HiOutlineSearch } from 'react-icons/hi';
import api from '../api/axios';
import SearchBar from '../components/ui/SearchBar';
import Button from '../components/ui/Button';
import Loader from '../components/ui/Loader';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import ViewToggle from '../components/admin/ViewToggle';
import AdminStudentCard from '../components/admin/AdminStudentCard';
import StudentTable from '../components/admin/StudentTable';

const ManageStudentsPage = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [view, setView] = useState('card');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchStudents = useCallback(async () => {
    try {
      setLoading(true);
      const params = search ? { search } : {};
      const { data } = await api.get('/students', { params });
      setStudents(data.students);
    } catch {
      toast.error('Failed to load students');
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    const timer = setTimeout(fetchStudents, search ? 300 : 0);
    return () => clearTimeout(timer);
  }, [fetchStudents, search]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await api.delete(`/students/${deleteTarget._id}`);
      toast.success('Student deleted successfully');
      setDeleteTarget(null);
      fetchStudents();
    } catch {
      toast.error('Failed to delete student');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-sky flex items-center justify-center shadow-lg shadow-primary/30">
            <HiOutlineUsers className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-gray-800 tracking-tight">Manage Students</h1>
            <p className="text-gray-500 font-medium text-sm mt-0.5">
              {students.length} {students.length === 1 ? 'student' : 'students'} recorded
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <ViewToggle view={view} onViewChange={setView} />
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500, delay: 0.2 }}
          >
            <Button onClick={() => navigate('/admin/students/add')} size="lg" icon={HiPlus}>
              Add Student
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative"
      >
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search students by name..."
          className="max-w-md"
        />
        {search && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full"
          >
            <HiOutlineSearch className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-bold text-primary">Searching...</span>
          </motion.div>
        )}
      </motion.div>

      {/* Content */}
      {loading ? (
        <Loader />
      ) : !students.length ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-20 bg-gradient-to-br from-white to-gray-50 rounded-3xl border-2 border-dashed border-gray-200"
        >
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-sky/20 flex items-center justify-center mb-6">
            <HiOutlineUsers className="w-10 h-10 text-primary/40" />
          </div>
          <p className="text-xl font-bold text-gray-700 mb-2">No students yet</p>
          <p className="text-sm text-gray-400 font-medium mb-6">Start building your success stories database</p>
          <Button onClick={() => navigate('/admin/students/add')} icon={HiPlus}>
            Add Your First Student
          </Button>
        </motion.div>
      ) : view === 'card' ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          {students.map((student, i) => (
            <AdminStudentCard
              key={student._id}
              student={student}
              index={i}
              onEdit={(id) => navigate(`/admin/students/edit/${id}`)}
              onDelete={setDeleteTarget}
            />
          ))}
        </motion.div>
      ) : (
        <StudentTable
          students={students}
          onEdit={(id) => navigate(`/admin/students/edit/${id}`)}
          onDelete={setDeleteTarget}
        />
      )}

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        loading={deleting}
        variant="danger"
        title="Delete Student"
        confirmLabel="Delete"
        message={`Are you sure you want to delete ${deleteTarget?.name}? This action cannot be undone.`}
      />
    </div>
  );
};

export default ManageStudentsPage;
