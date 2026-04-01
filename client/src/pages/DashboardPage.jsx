import { motion } from 'framer-motion';
import { HiOutlineChartBar, HiOutlineTrendingUp } from 'react-icons/hi';
import useAnalytics from '../hooks/useAnalytics';
import StatsCards from '../components/admin/StatsCards';
import CountryChart from '../components/admin/CountryChart';
import MonthlyChart from '../components/admin/MonthlyChart';
import Loader from '../components/ui/Loader';

const DashboardPage = () => {
  const { data, loading, error } = useAnalytics();

  if (loading) return <Loader />;
  if (error) return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-20 text-red-500"
    >
      <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
      </div>
      <p className="text-lg font-bold">Failed to load dashboard data</p>
      <p className="text-sm text-gray-500 mt-1">{error}</p>
    </motion.div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-black text-gray-800 tracking-tight">Dashboard</h1>
          <p className="text-gray-500 font-medium mt-1">Overview of student visa approvals</p>
        </div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500, delay: 0.2 }}
          className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-secondary/10 to-lime/10 rounded-xl border border-secondary/20"
        >
          <HiOutlineTrendingUp className="w-5 h-5 text-secondary" />
          <span className="text-sm font-bold text-secondary">Tracking Success</span>
        </motion.div>
      </motion.div>

      {/* Stats Cards */}
      <StatsCards data={data} />

      {/* Charts */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-3xl p-6 shadow-xl shadow-gray-200/50 border border-gray-100"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center">
              <HiOutlineChartBar className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Approvals by Country</h3>
              <p className="text-xs text-gray-400 font-medium">Distribution across destinations</p>
            </div>
          </div>
          <CountryChart data={data?.byCountry} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-3xl p-6 shadow-xl shadow-gray-200/50 border border-gray-100"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-secondary to-lime flex items-center justify-center">
              <HiOutlineChartBar className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Monthly Registrations</h3>
              <p className="text-xs text-gray-400 font-medium">Trend over time</p>
            </div>
          </div>
          <MonthlyChart data={data?.monthlyRegistrations} />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default DashboardPage;
