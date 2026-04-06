import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { HiOutlineGlobe, HiOutlineAcademicCap, HiOutlineSparkles } from 'react-icons/hi';
import FilterBar from '../components/students/FilterBar';
import StudentGrid from '../components/students/StudentGrid';
import StudentModal from '../components/students/StudentModal';
import useStudents from '../hooks/useStudents';

const AnimatedCounter = ({ value, label, icon: Icon, color, delay = 0 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView || !value) return;
    let start = 0;
    const duration = 1500;
    const step = Math.max(1, Math.floor(value / (duration / 16)));
    const timer = setInterval(() => {
      start += step;
      if (start >= value) { setCount(value); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay, duration: 0.7, type: 'spring' }}
      className="flex flex-col items-center gap-3 group"
    >
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        className={`w-16 h-16 rounded-2xl flex items-center justify-center ${color} shadow-xl shadow-black/20 group-hover:shadow-2xl transition-shadow`}
      >
        <Icon className="w-8 h-8 text-white" />
      </motion.div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.3 }}
        className="text-4xl sm:text-5xl font-black text-white tracking-tight"
      >
        {count}
      </motion.span>
      <span className="text-sm text-white/80 font-bold tracking-wider uppercase">{label}</span>
    </motion.div>
  );
};

const FloatingShape = ({ className, delay = 0, duration = 3 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0, rotate: 0 }}
    animate={{
      opacity: 0.15,
      scale: 1,
      rotate: 360,
      y: [0, -20, 0],
    }}
    transition={{
      delay,
      duration: duration,
      rotate: { duration: duration * 2, repeat: Infinity, ease: 'linear' },
      y: { duration: duration, repeat: Infinity, ease: 'easeInOut' },
    }}
    className={`absolute rounded-full backdrop-blur-sm ${className}`}
  />
);

const HomePage = () => {
  const [filters, setFilters] = useState({
    search: '', 
    country: '', 
    examType: '',
    intake: '',
    program: '',
    email: '',
    mobile: '',
    pincode: '',
    area: '',
  });

  const [selectedStudent, setSelectedStudent] = useState(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  const memoizedFilters = useMemo(() => filters, [filters]);

  const { students, loading } = useStudents(memoizedFilters);

  const uniqueCountries = useMemo(() => {
    const set = new Set(students.map((s) => s.country));
    return set.size;
  }, [students]);

  const uniqueExams = useMemo(() => {
    const set = new Set(students.filter((s) => s.examType).map((s) => s.examType));
    return set.size;
  }, [students]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden min-h-[85vh]">
        {/* Animated Gradient Background */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-accent gradient-animate"
        />

        {/* Enhanced floating shapes */}
        <FloatingShape className="w-96 h-96 bg-secondary -top-40 -right-40" delay={0.2} duration={4} />
        <FloatingShape className="w-64 h-64 bg-sky -bottom-20 -left-20" delay={0.4} duration={5} />
        <FloatingShape className="w-40 h-40 bg-orange top-32 right-1/4" delay={0.6} duration={6} />
        <FloatingShape className="w-32 h-32 bg-violet bottom-40 left-1/3" delay={0.8} duration={7} />
        <FloatingShape className="w-24 h-24 bg-lime top-1/2 left-32" delay={1} duration={5} />
        <FloatingShape className="w-48 h-48 bg-gold top-1/4 left-1/2" delay={1.2} duration={8} />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />

        {/* Mesh gradient overlay */}
        <div className="absolute inset-0 opacity-30 bg-gradient-to-tr from-white/20 via-transparent to-white/10" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 pb-56">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 500 }}
              className="inline-flex items-center gap-2.5 bg-white/15 backdrop-blur-md rounded-full px-6 py-3 mb-8 border border-white/30 shadow-xl shadow-black/10"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              >
                <HiOutlineSparkles className="w-5 h-5 text-gold" />
              </motion.div>
              <span className="text-sm text-white font-bold tracking-wide">Trusted by hundreds of students worldwide</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-white mb-8 leading-tight tracking-tight"
            >
              Our{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary via-lime to-sky bg-[length:200%_auto] animate-gradient">
                Success
              </span>
              <br />
              Stories
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed font-medium"
            >
              Meet the students who turned their dreams into reality. Every card represents a journey of dedication, perseverance, and ultimate success.
            </motion.p>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="mt-12 flex flex-col items-center gap-2"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center p-2"
              >
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-1.5 h-1.5 rounded-full bg-white/80"
                />
              </motion.div>
              <span className="text-xs text-white/50 font-medium tracking-wider">SCROLL TO EXPLORE</span>
            </motion.div>
          </motion.div>

          {/* Animated Stats */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.8, type: 'spring' }}
            className="grid grid-cols-3 max-w-2xl mx-auto gap-6 sm:gap-12 relative z-20"
          >
            <AnimatedCounter
              value={students.length}
              label="Students"
              icon={HiOutlineAcademicCap}
              color="bg-gradient-to-br from-secondary to-lime"
              delay={0.8}
            />
            <AnimatedCounter
              value={uniqueCountries}
              label="Countries"
              icon={HiOutlineGlobe}
              color="bg-gradient-to-br from-sky to-primary"
              delay={0.9}
            />
            <AnimatedCounter
              value={uniqueExams}
              label="Exam Types"
              icon={HiOutlineAcademicCap}
              color="bg-gradient-to-br from-orange to-gold"
              delay={1}
            />
          </motion.div>
        </div>

        {/* Wave separator with gradient */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
            <path
              d="M0 60L48 52C96 44 192 28 288 24C384 20 480 28 576 40C672 52 768 68 864 72C960 76 1056 68 1152 56C1248 44 1344 28 1392 20L1440 12V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V60Z"
              fill="url(#wave-gradient)"
            />
            <defs>
              <linearGradient id="wave-gradient" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
                <stop stopColor="#f8fafc" />
                <stop offset="0.5" stopColor="#ffffff" />
                <stop offset="1" stopColor="#f1f5f9" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl font-black text-gray-800 mb-3 tracking-tight">
            Explore Success Stories
          </h2>
          <p className="text-gray-500 font-medium">
            Search and filter through our inspiring journeys
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <FilterBar filters={filters} onFilterChange={setFilters} />
        </motion.div>

        <StudentGrid
          students={students}
          loading={loading}
          onStudentClick={setSelectedStudent}
        />
      </div>

      {/* Student Detail Modal */}
      <StudentModal
        student={selectedStudent}
        isOpen={!!selectedStudent}
        onClose={() => setSelectedStudent(null)}
      />
    </div>
  );
};

export default HomePage;
