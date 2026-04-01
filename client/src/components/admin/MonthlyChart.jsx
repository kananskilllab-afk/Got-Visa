import { motion } from 'framer-motion';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts';
import { HiOutlineChartBar } from 'react-icons/hi';
import { getMonthName } from '../../utils/formatDate';

const MonthlyChart = ({ data }) => {
  if (!data?.length) return null;

  const chartData = data.map((item) => ({
    name: `${getMonthName(item._id.month).slice(0, 3)} ${item._id.year}`,
    students: item.count,
  }));

  const totalApprovals = chartData.reduce((sum, d) => sum + d.students, 0);

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/95 backdrop-blur-xl px-4 py-3 rounded-2xl shadow-xl border border-gray-100 text-sm"
      >
        <p className="font-bold text-gray-800">{label}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-gray-500 font-medium">{payload[0].value} approvals</span>
          <span className="px-2 py-0.5 bg-secondary/10 text-secondary rounded-full text-xs font-bold">
            {((payload[0].value / totalApprovals) * 100).toFixed(1)}%
          </span>
        </div>
      </motion.div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl p-6 shadow-xl shadow-gray-200/50 border border-gray-100"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-secondary to-lime flex items-center justify-center shadow-lg">
            <HiOutlineChartBar className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-lg">Monthly Visa Approvals</h3>
            <p className="text-xs text-gray-400 font-medium">{totalApprovals} total approvals tracked</p>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#009846" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#009846" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradientStroke" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#009846" stopOpacity={1} />
              <stop offset="100%" stopColor="#B0CB1F" stopOpacity={1} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e5e7eb"
            vertical={false}
          />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 10, fill: '#6b7280', fontWeight: 600 }}
            axisLine={false}
            tickLine={false}
            dy={10}
          />
          <YAxis
            allowDecimals={false}
            tick={{ fontSize: 11, fill: '#6b7280', fontWeight: 600 }}
            axisLine={false}
            tickLine={false}
            dx={-10}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="students"
            stroke="url(#gradientStroke)"
            strokeWidth={3}
            fill="url(#colorStudents)"
            dot={{
              fill: '#009846',
              strokeWidth: 2,
              stroke: '#fff',
              r: 5,
            }}
            activeDot={{
              r: 7,
              strokeWidth: 3,
              stroke: '#009846',
              fill: '#fff',
            }}
            animationDuration={1000}
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default MonthlyChart;
