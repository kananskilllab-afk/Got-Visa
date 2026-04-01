import { motion } from 'framer-motion';
import { HiSearch } from 'react-icons/hi';

const SearchBar = ({ value, onChange, placeholder = 'Search...', className = '' }) => {
  return (
    <motion.div
      className={`relative group ${className}`}
      whileHover={{ scale: 1.01 }}
    >
      <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
        <HiSearch className="w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors duration-300" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-2xl text-sm font-medium
          focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary
          hover:border-gray-300 transition-all duration-300
          placeholder:text-gray-400 placeholder:font-normal
          bg-white/80 backdrop-blur-sm"
      />
      {/* Animated focus underline */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-secondary to-lime scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500 rounded-full"
      />
    </motion.div>
  );
};

export default SearchBar;
