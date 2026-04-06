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

          {/* Info rows organized by section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {/* Academic Section */}
            <div className="space-y-3">
              <h4 className="text-xs font-black text-primary uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                <span className="w-6 h-px bg-primary/30"></span> Admission Details
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {student.collegeName && (
                  <InfoRow
                    icon={HiOutlineAcademicCap}
                    label="College Name"
                    value={student.collegeName}
                    color="bg-gradient-to-br from-secondary to-lime"
                    delay={0.45}
                  />
                )}
                {student.program && (
                  <InfoRow
                    icon={HiOutlineAcademicCap}
                    label="Program / Course"
                    value={student.program}
                    color="bg-gradient-to-br from-primary to-sky"
                    delay={0.5}
                  />
                )}
                {student.intake && (
                  <InfoRow
                    icon={HiOutlineClipboardCheck}
                    label="Intake"
                    value={student.intake}
                    color="bg-gradient-to-br from-orange to-gold"
                    delay={0.55}
                  />
                )}
                {student.examType && (
                  <InfoRow
                    icon={HiOutlineAcademicCap}
                    label="Exam Type"
                    value={`${student.examType} (${student.result || 'N/A'})`}
                    color="bg-gradient-to-br from-violet to-accent"
                    delay={0.6}
                  />
                )}
              </div>
            </div>

            {/* Contact Section */}
            <div className="space-y-3">
              <h4 className="text-xs font-black text-secondary uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                <span className="w-6 h-px bg-secondary/30"></span> Contact Details
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {student.mobileNumber && (
                  <InfoRow
                    icon={HiOutlinePhone}
                    label="Primary Mobile"
                    value={student.mobileNumber}
                    color="bg-gradient-to-br from-gray-700 to-gray-900"
                    delay={0.65}
                  />
                )}
                {student.currentMobileNumber && (
                  <InfoRow
                    icon={HiOutlinePhone}
                    label="Current Mobile"
                    value={student.currentMobileNumber}
                    color="bg-gradient-to-br from-gray-700 to-gray-900"
                    delay={0.68}
                  />
                )}
                {student.email && (
                  <InfoRow
                    icon={HiOutlineMail}
                    label="Email Address"
                    value={student.email}
                    color="bg-gradient-to-br from-orange to-red"
                    delay={0.7}
                  />
                )}
              </div>
            </div>

            {/* Address Section */}
            <div className="space-y-3">
              <h4 className="text-xs font-black text-lime uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                <span className="w-6 h-px bg-lime/30"></span> Location & Address
              </h4>
              <div className="grid grid-cols-1 gap-4">
                <InfoRow
                  icon={HiOutlineLocationMarker}
                  label="Destination Country"
                  value={student.country}
                  color="bg-gradient-to-br from-sky to-primary"
                  delay={0.75}
                />
                {student.address && (
                  <InfoRow
                    icon={HiOutlineHome}
                    label="Permanent Address"
                    value={student.address}
                    color="bg-gradient-to-br from-lime to-secondary"
                    delay={0.8}
                  />
                )}
                {student.currentAddress && (
                  <InfoRow
                    icon={HiOutlineHome}
                    label="Current Address"
                    value={student.currentAddress}
                    color="bg-gradient-to-br from-lime to-secondary"
                    delay={0.83}
                  />
                )}
                {(student.areaLandmark || student.pincode) && (
                  <InfoRow
                    icon={HiOutlineLocationMarker}
                    label="Area / Landmark / Pincode"
                    value={`${student.areaLandmark}${student.areaLandmark && student.pincode ? ', ' : ''}${student.pincode}`}
                    color="bg-gradient-to-br from-gray-400 to-gray-600"
                    delay={0.86}
                  />
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Modal>
  );
};

export default StudentModal;
