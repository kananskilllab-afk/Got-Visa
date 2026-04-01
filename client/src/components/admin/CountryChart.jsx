import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { HiOutlineChartPie, HiOutlineChartBar } from 'react-icons/hi';
import { CHART_COLORS } from '../../utils/constants';

const CountryChart = ({ data }) => {
  const [chartType, setChartType] = useState('pie');

  if (!data?.length) return null;

  const chartData = data.map((item) => ({ name: item._id, value: item.count }));
  const total = chartData.reduce((sum, d) => sum + d.value, 0);

  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null;
    const pct = ((payload[0].value / total) * 100).toFixed(1);
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/95 backdrop-blur-xl px-4 py-3 rounded-2xl shadow-xl border border-gray-100 text-sm"
      >
        <p className="font-bold text-gray-800">{payload[0].name || payload[0].payload.name}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-gray-500 font-medium">{payload[0].value} students</span>
          <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs font-bold">{pct}%</span>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl shadow-gray-200/50 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-sky flex items-center justify-center shadow-lg">
            {chartType === 'pie' ? (
              <HiOutlineChartPie className="w-5 h-5 text-white" />
            ) : (
              <HiOutlineChartBar className="w-5 h-5 text-white" />
            )}
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-lg">Students by Country</h3>
            <p className="text-xs text-gray-400 font-medium">{total} total students</p>
          </div>
        </div>
        <motion.div
          className="flex bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 rounded-xl p-1 border border-gray-200 shadow-sm"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setChartType('pie')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all duration-300 cursor-pointer border-none ${
              chartType === 'pie'
                ? 'bg-white shadow-md text-primary ring-2 ring-primary/20'
                : 'text-gray-400 hover:text-gray-600 bg-transparent'
            }`}
          >
            <HiOutlineChartPie className="w-4 h-4" />
            Pie
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setChartType('bar')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all duration-300 cursor-pointer border-none ${
              chartType === 'bar'
                ? 'bg-white shadow-md text-primary ring-2 ring-primary/20'
                : 'text-gray-400 hover:text-gray-600 bg-transparent'
            }`}
          >
            <HiOutlineChartBar className="w-4 h-4" />
            Bar
          </motion.button>
        </motion.div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={chartType}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          <ResponsiveContainer width="100%" height={320}>
            {chartType === 'pie' ? (
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={4}
                  dataKey="value"
                  stroke="none"
                >
                  {chartData.map((_, i) => (
                    <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  verticalAlign="bottom"
                  height={50}
                  wrapperStyle={{
                    paddingTop: '20px',
                  }}
                />
              </PieChart>
            ) : (
              <BarChart data={chartData} barGap={8}>
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11, fill: '#6b7280', fontWeight: 600 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  allowDecimals={false}
                  tick={{ fontSize: 11, fill: '#6b7280', fontWeight: 600 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="value"
                  radius={[8, 8, 0, 0]}
                  animationDuration={500}
                >
                  {chartData.map((_, i) => (
                    <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            )}
          </ResponsiveContainer>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default CountryChart;
