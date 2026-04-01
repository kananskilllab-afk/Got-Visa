import { motion } from 'framer-motion';
import { HiOutlineViewGrid, HiOutlineViewList } from 'react-icons/hi';

const ViewToggle = ({ view, onViewChange }) => {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="flex bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 rounded-xl p-1.5 border border-gray-200 shadow-sm"
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onViewChange('card')}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 cursor-pointer border-none ${
          view === 'card'
            ? 'bg-white shadow-md text-primary ring-2 ring-primary/20'
            : 'text-gray-400 hover:text-gray-600 bg-transparent'
        }`}
      >
        <HiOutlineViewGrid className="w-5 h-5" />
        <span className="hidden sm:inline">Cards</span>
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onViewChange('table')}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 cursor-pointer border-none ${
          view === 'table'
            ? 'bg-white shadow-md text-primary ring-2 ring-primary/20'
            : 'text-gray-400 hover:text-gray-600 bg-transparent'
        }`}
      >
        <HiOutlineViewList className="w-5 h-5" />
        <span className="hidden sm:inline">Table</span>
      </motion.button>
    </motion.div>
  );
};

export default ViewToggle;
