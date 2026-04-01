import { motion } from 'framer-motion';

const Select = ({ label, options, error, className = '', icon: Icon, ...props }) => {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-bold text-gray-700 mb-2 tracking-wide">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          className={`w-full px-4 py-3 border-2 rounded-2xl text-sm font-medium transition-all duration-300 bg-white appearance-none cursor-pointer
            bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20width%3d%2214%22%20height%3d%2214%22%20viewBox%3d%220%200%2024%2024%22%20fill%3d%22none%22%20stroke%3d%22%23284695%22%20stroke-width%3d%223%22%20stroke-linecap%3d%22round%22%20stroke-linejoin%3d%22round%22%3e%3cpolyline%20points%3d%226%209%2012%2015%2018%209%22%3e%3c/polyline%3e%3c/svg%3e')]
            bg-[length:18px_18px] bg-[right_14px_center] bg-no-repeat pr-12
            focus:outline-none focus:ring-4 focus:border-primary
            ${Icon ? 'pl-11' : ''}
            ${error
              ? 'border-red-300 hover:border-red-400 focus:border-red-500 focus:ring-red-500/20 bg-red-50/30'
              : 'border-gray-200 hover:border-gray-300 focus:border-primary focus:ring-primary/20'
            }`}
          {...props}
        >
          {options.map((opt) =>
            typeof opt === 'string' ? (
              <option key={opt} value={opt}>{opt}</option>
            ) : (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            )
          )}
        </select>
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            <Icon className="w-5 h-5" />
          </div>
        )}
        {/* Gradient accent on focus */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          initial={{ boxShadow: 'none' }}
          whileFocus={{ boxShadow: '0 0 0 4px rgba(40, 70, 149, 0.1)' }}
        />
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-xs text-red-500 font-semibold flex items-center gap-1.5"
        >
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </motion.p>
      )}
    </div>
  );
};

export default Select;
