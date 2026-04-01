import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineFilter, HiOutlineX, HiOutlineRefresh } from 'react-icons/hi';
import SearchBar from '../ui/SearchBar';
import Select from '../ui/Select';
import { COUNTRIES, EXAM_TYPES } from '../../utils/constants';

const FilterBar = ({ filters, onFilterChange }) => {
  const [showFilters, setShowFilters] = useState(false);

  const updateFilter = (key, value) => {
    const next = { ...filters, [key]: value };
    onFilterChange(next);
  };

  const clearFilters = () => {
    onFilterChange({ search: '', country: '', examType: '' });
  };

  const hasActiveFilters = filters.country || filters.examType;
  const activeCount = [filters.country, filters.examType].filter(Boolean).length;

  return (
    <div className="mb-12">
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <SearchBar
            value={filters.search}
            onChange={(v) => updateFilter('search', v)}
            placeholder="Search student by name..."
          />
        </motion.div>
        <motion.button
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 cursor-pointer border-2 shadow-lg
            ${showFilters || hasActiveFilters
              ? 'bg-gradient-to-r from-primary to-primary-light text-white border-primary shadow-xl shadow-primary/30'
              : 'bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary hover:shadow-lg'
            }`}
        >
          <motion.div
            animate={{ rotate: showFilters ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <HiOutlineFilter className="w-4 h-4" />
          </motion.div>
          Filters
          {activeCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="bg-white/25 text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold"
            >
              {activeCount}
            </motion.span>
          )}
        </motion.button>
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0, y: -20 }}
            animate={{ height: 'auto', opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="mt-5 p-6 bg-white/80 backdrop-blur-xl rounded-3xl border-2 border-gray-100 shadow-xl shadow-gray-200/50">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 }}
                >
                  <Select
                    value={filters.country}
                    onChange={(e) => updateFilter('country', e.target.value)}
                    options={[{ value: '', label: 'All Countries' }, ...COUNTRIES.map((c) => ({ value: c, label: c }))]}
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Select
                    value={filters.examType}
                    onChange={(e) => updateFilter('examType', e.target.value)}
                    options={[{ value: '', label: 'All Exam Types' }, ...EXAM_TYPES.map((v) => ({ value: v, label: v }))]}
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="flex items-center"
                >
                  {hasActiveFilters && (
                    <motion.button
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={clearFilters}
                      className="flex items-center gap-2 text-xs text-red-500 hover:text-red-600 cursor-pointer bg-red-50 hover:bg-red-100 px-4 py-2 rounded-xl font-bold transition-colors border-none shadow-sm"
                    >
                      <HiOutlineRefresh className="w-3.5 h-3.5" />
                      Reset All
                    </motion.button>
                  )}
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FilterBar;
