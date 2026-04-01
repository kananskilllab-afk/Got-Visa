import { motion } from 'framer-motion';
import Modal from '../ui/Modal';
import Badge from '../ui/Badge';
import { HiOutlineAcademicCap, HiOutlineLocationMarker, HiOutlineMail, HiOutlinePhone, HiOutlineClipboardCheck, HiOutlineUser } from 'react-icons/hi';

const InfoRow = ({ icon: Icon, label, value, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, x: -15 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, type: 'spring', stiffness: 500 }}
    className="flex items-start gap-3.5 group"
  >
    <motion.div
      whileHover={{ scale: 1.1, rotate: 5 }}
      className={`w-11 h-11 rounded-xl ${color} flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-xl transition-shadow`}
    >
      <Icon className="w-5.5 h-5.5 text-white" />
    </motion.div>
    <div className="flex-1">
      <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">{label}</p>
      <p className="font-bold text-gray-800 mt-0.5 text-base">{value}</p>
    </div>
  </motion.div>
);

const StudentModal = ({ student, isOpen, onClose }) => {
  if (!student) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Student Profile" maxWidth="max-w-4xl">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Photo Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotateY: -10 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="w-full lg:w-2/5 flex-shrink-0"
        >
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 shadow-2xl shadow-primary/20 ring-4 ring-primary/10">
            {student.photo ? (
              <motion.img
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                src={student.photo}
                alt={student.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 via-sky/10 to-secondary/20">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <HiOutlineUser className="w-24 h-24 text-primary/30" />
                </motion.div>
              </div>
            )}

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>

          {/* Quick info cards */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 gap-3 mt-4"
          >
            <div className="p-3 bg-gradient-to-br from-primary/10 to-sky/10 rounded-2xl border border-primary/20 text-center">
              <p className="text-xs text-gray-500 font-bold uppercase">Exam</p>
              <p className="text-sm font-black text-primary mt-1">{student.examType || 'N/A'}</p>
            </div>
            <div className="p-3 bg-gradient-to-br from-secondary/10 to-lime/10 rounded-2xl border border-secondary/20 text-center">
              <p className="text-xs text-gray-500 font-bold uppercase">Score</p>
              <p className="text-sm font-black text-secondary mt-1">{student.result || 'N/A'}</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Details Section */}
        <div className="flex-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-3xl font-black text-gray-800 mb-4 tracking-tight">{student.name}</h3>

            <div className="flex flex-wrap gap-2.5 mb-8">
              {student.examType && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3, type: 'spring' }}
                >
                  <Badge variant="blue" className="shadow-lg">{student.examType}</Badge>
                </motion.div>
              )}
              {student.result && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.35, type: 'spring' }}
                >
                  <Badge variant="success">
                    Score: {student.result}
                  </Badge>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Info rows */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <InfoRow
              icon={HiOutlineLocationMarker}
              label="Destination Country"
              value={student.country}
              color="bg-gradient-to-br from-primary to-primary-light"
              delay={0.45}
            />
            {student.mobileNumber && (
              <InfoRow
                icon={HiOutlinePhone}
                label="Mobile Number"
                value={student.mobileNumber}
                color="bg-gradient-to-br from-orange to-gold"
                delay={0.5}
              />
            )}
            {student.email && (
              <InfoRow
                icon={HiOutlineMail}
                label="Email"
                value={student.email}
                color="bg-gradient-to-br from-violet to-accent"
                delay={0.55}
              />
            )}
            {student.examType && (
              <InfoRow
                icon={HiOutlineAcademicCap}
                label="Exam Type"
                value={student.examType}
                color="bg-gradient-to-br from-sky to-primary"
                delay={0.6}
              />
            )}
            {student.result && (
              <InfoRow
                icon={HiOutlineClipboardCheck}
                label="Result / Score"
                value={String(student.result)}
                color="bg-gradient-to-br from-secondary to-lime"
                delay={0.65}
              />
            )}
          </motion.div>
        </div>
      </div>
    </Modal>
  );
};

export default StudentModal;
