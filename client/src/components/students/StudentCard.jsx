import { motion } from 'framer-motion';
import { HiOutlineLocationMarker, HiOutlineAcademicCap, HiOutlineArrowRight, HiOutlineCalendar } from 'react-icons/hi';

const StudentCard = ({ student, onClick, index = 0 }) => {
  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -20 }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -15, scale: 1.02 }}
      onClick={onClick}
      className="group relative bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:shadow-[0_45px_70px_rgba(37,99,235,0.15)] transition-all duration-700 cursor-pointer overflow-hidden border border-gray-100/50 hover:border-primary/20"
    >
      {/* Photo Container */}
      <div className="relative h-72 overflow-hidden">
        {student.photo ? (
          <motion.img
            whileHover={{ scale: 1.15 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            src={student.photo}
            alt={student.name}
            className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 via-sky/10 to-secondary/10">
            <motion.div
              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="w-32 h-32 rounded-full bg-gradient-to-br from-primary via-primary-light to-sky flex items-center justify-center shadow-2xl border-8 border-white/30"
            >
              <span className="text-5xl font-black text-white drop-shadow-lg">
                {student.name.charAt(0).toUpperCase()}
              </span>
            </motion.div>
          </div>
        )}

        {/* Premium Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-30 transition-opacity duration-500" />

        {/* Status Badges Overlay */}
        <div className="absolute top-6 right-6 flex flex-col items-end gap-3">
          {student.result && (
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="px-4 py-2 bg-emerald-500 backdrop-blur-xl rounded-xl text-[11px] font-black text-white border border-white/20 shadow-xl"
            >
              ★ Score: {student.result}
            </motion.div>
          )}
        </div>

        {/* Action Button Label */}
        <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-1"
          >
            {student.examType && (
              <p className="text-white/60 text-[10px] font-black uppercase tracking-[0.2em]">{student.examType} ACHIEVER</p>
            )}
            <h4 className="text-white text-3xl font-black tracking-tight leading-tight group-hover:scale-105 transition-transform origin-left">{student.name}</h4>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-2xl shadow-white/20 group-hover:bg-primary transition-all duration-500"
          >
            <HiOutlineArrowRight className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
          </motion.div>
        </div>
      </div>

      {/* Details Section */}
      <div className="relative p-8 bg-gradient-to-br from-white to-gray-50/50">
        <div className="space-y-4">
          {/* INTAKE - NOW PROMINENT */}
          {student.intake && (
            <motion.div 
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              className="flex items-center gap-4 group/item pb-2 border-b border-gray-100"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-orange-500/20">
                <HiOutlineCalendar className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] text-orange-500 font-black uppercase tracking-widest leading-none mb-1">Intake</p>
                <p className="text-lg font-black text-gray-900 tracking-tight">{student.intake}</p>
              </div>
            </motion.div>
          )}

          {student.program && (
            <motion.div 
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              transition={{ delay: 0.1 }}
              className="flex items-center gap-4 group/item"
            >
              <div className="w-10 h-10 rounded-2xl bg-primary/5 flex items-center justify-center flex-shrink-0 group-hover/item:bg-primary/10 transition-colors">
                <HiOutlineAcademicCap className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest leading-none mb-1">Enrolled Program</p>
                <p className="text-sm font-bold text-gray-800 line-clamp-1">{student.program}</p>
              </div>
            </motion.div>
          )}

          <motion.div 
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            transition={{ delay: 0.2 }}
            className="flex items-center gap-4 group/item"
          >
            <div className="w-10 h-10 rounded-2xl bg-secondary/5 flex items-center justify-center flex-shrink-0 group-hover/item:bg-secondary/10 transition-colors">
              <HiOutlineLocationMarker className="w-5 h-5 text-secondary" />
            </div>
            <div className="flex-1">
              <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest leading-none mb-1">Destination</p>
              <p className="text-sm font-bold text-gray-800">{student.country}</p>
            </div>
          </motion.div>

          {(student.collegeName || student.currentFaculty) && (
            <motion.div 
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              transition={{ delay: 0.3 }}
              className="flex items-center gap-4 group/item"
            >
              <div className="w-10 h-10 rounded-2xl bg-lime/5 flex items-center justify-center flex-shrink-0 group-hover/item:bg-lime/10 transition-colors">
                <HiOutlineAcademicCap className="w-5 h-5 text-lime" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest leading-none mb-1">Institution</p>
                <p className="text-sm font-bold text-gray-800 line-clamp-1">{student.collegeName || student.currentFaculty}</p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      </div>
    </motion.div>
  );
};

export default StudentCard;
