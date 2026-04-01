import { motion } from 'framer-motion';

const Input = ({ label, error, className = '', icon: Icon, ...props }) => {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-bold text-gray-700 mb-2 tracking-wide">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          className={`w-full px-4 py-3 border-2 rounded-2xl text-sm font-medium transition-all duration-300
            focus:outline-none focus:ring-4 focus:border-primary
            placeholder:text-gray-400 placeholder:font-normal
            ${Icon ? 'pl-11' : ''}
            ${error
              ? 'border-red-300 hover:border-red-400 focus:border-red-500 focus:ring-red-500/20 bg-red-50/30'
              : 'border-gray-200 hover:border-gray-300 focus:border-primary focus:ring-primary/20 bg-white/80'
            }`}
          {...props}
        />
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <Icon className="w-5 h-5" />
          </div>
        )}
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

export default Input;
