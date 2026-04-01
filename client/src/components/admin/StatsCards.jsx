import { motion } from 'framer-motion';
import { HiOutlineUsers, HiOutlineGlobe, HiOutlineAcademicCap, HiOutlineCalendar } from 'react-icons/hi';

const cards = [
  {
    key: 'totalStudents',
    label: 'Total Students',
    icon: HiOutlineUsers,
    gradient: 'from-primary to-primary-light',
    bg: 'bg-gradient-to-br from-primary/10 to-sky/10',
    border: 'border-primary/20',
    textColor: 'text-primary',
    shadow: 'shadow-primary/20',
  },
  {
    key: 'countriesCount',
    label: 'Countries',
    icon: HiOutlineGlobe,
    gradient: 'from-secondary to-lime',
    bg: 'bg-gradient-to-br from-secondary/10 to-lime/10',
    border: 'border-secondary/20',
    textColor: 'text-secondary',
    shadow: 'shadow-secondary/20',
  },
  {
    key: 'examTypesCount',
    label: 'Exam Types',
    icon: HiOutlineAcademicCap,
    gradient: 'from-sky to-primary',
    bg: 'bg-gradient-to-br from-sky/10 to-primary/10',
    border: 'border-sky/20',
    textColor: 'text-sky',
    shadow: 'shadow-sky/20',
  },
  {
    key: 'thisMonth',
    label: 'This Month',
    icon: HiOutlineCalendar,
    gradient: 'from-orange to-gold',
    bg: 'bg-gradient-to-br from-orange/10 to-gold/10',
    border: 'border-orange/20',
    textColor: 'text-orange',
    shadow: 'shadow-orange/20',
  },
];

const StatsCards = ({ data }) => {
  if (!data) return null;

  // Calculate "this month" from monthly registrations
  const now = new Date();
  const thisMonthData = data.monthlyRegistrations?.find(
    (m) => m._id.year === now.getFullYear() && m._id.month === now.getMonth() + 1
  );
  const values = {
    ...data,
    examTypesCount: data.byExamType?.length || 0,
    thisMonth: thisMonthData?.count || 0,
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      {cards.map(({ key, label, icon: Icon, gradient, bg, border, textColor, shadow }, i) => (
        <motion.div
          key={key}
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: i * 0.1, duration: 0.5, type: 'spring' }}
          whileHover={{ y: -8, scale: 1.02 }}
          className={`bg-white rounded-3xl p-6 border ${border} shadow-xl ${shadow} transition-all duration-300 overflow-hidden relative group`}
        >
          {/* Background gradient orb */}
          <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full ${bg} blur-3xl opacity-50 group-hover:opacity-70 transition-opacity`} />

          <div className="relative flex items-start justify-between">
            <div className="flex-1">
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">{label}</p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1 + 0.2 }}
                className={`text-4xl font-black ${textColor} mt-2 tracking-tight`}
              >
                {values[key] ?? 0}
              </motion.p>
            </div>
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}
            >
              <Icon className="w-7 h-7 text-white" />
            </motion.div>
          </div>

          {/* Bottom accent line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: i * 0.1 + 0.3, duration: 0.5 }}
            className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${gradient}`}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default StatsCards;
