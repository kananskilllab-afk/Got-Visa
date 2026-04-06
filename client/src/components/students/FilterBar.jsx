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

  const hasActiveFilters = 
    filters.country || 
    filters.examType || 
    filters.intake || 
    filters.program || 
    filters.email || 
    filters.mobile || 
    filters.pincode || 
    filters.area;

  const activeCount = Object.values(filters).filter(Boolean).length;
  // Subtract 1 if the main search is active to focus count on side filters
  const filterCount = activeCount - (filters.search ? 1 : 0);

  const clearFilters = () => {
    onFilterChange({ 
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
  };

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
            ${showFilters || filterCount > 0
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
          Advanced Filters
          {filterCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="bg-white/25 text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold"
            >
              {filterCount}
            </motion.span>
          )}
        </motion.button>
      </div>

      <AnimatePresence mode="wait">
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0, y: -10 }}
            animate={{ height: 'auto', opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 0, y: -10 }}
            className="overflow-hidden"
          >
            <div className="mt-5 p-8 bg-white rounded-3xl border-2 border-gray-100 shadow-2xl shadow-gray-200/40">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Academic Filters */}
                <div className="space-y-4">
                  <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] px-1">🎓 Academic</p>
                  <Select
                    value={filters.examType}
                    onChange={(e) => updateFilter('examType', e.target.value)}
                    options={[{ value: '', label: 'Select Exam Type' }, ...EXAM_TYPES.map((v) => ({ value: v, label: v }))]}
                  />
                  <input
                    type="text"
                    value={filters.program}
                    onChange={(e) => updateFilter('program', e.target.value)}
                    placeholder="Search by Program..."
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-2xl text-sm focus:bg-white focus:border-primary/30 transition-all outline-none"
                  />
                  <input
                    type="text"
                    value={filters.intake}
                    onChange={(e) => updateFilter('intake', e.target.value)}
                    placeholder="Search by Intake (e.g. Sep 2024)"
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-2xl text-sm focus:bg-white focus:border-primary/30 transition-all outline-none"
                  />
                </div>

                {/* Contact Filters */}
                <div className="space-y-4">
                  <p className="text-[10px] font-black text-secondary uppercase tracking-[0.2em] px-1">📞 Contact</p>
                  <input
                    type="text"
                    value={filters.email}
                    onChange={(e) => updateFilter('email', e.target.value)}
                    placeholder="Email Address..."
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-2xl text-sm focus:bg-white focus:border-secondary/30 transition-all outline-none"
                  />
                  <input
                    type="text"
                    value={filters.mobile}
                    onChange={(e) => updateFilter('mobile', e.target.value)}
                    placeholder="Mobile Number..."
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-2xl text-sm focus:bg-white focus:border-secondary/30 transition-all outline-none"
                  />
                </div>

                {/* Location Filters */}
                <div className="space-y-4">
                  <p className="text-[10px] font-black text-sky uppercase tracking-[0.2em] px-1">📍 Location</p>
                  <Select
                    value={filters.country}
                    onChange={(e) => updateFilter('country', e.target.value)}
                    options={[{ value: '', label: 'Select Country' }, ...COUNTRIES.map((c) => ({ value: c, label: c }))]}
                  />
                  <input
                    type="text"
                    value={filters.area}
                    onChange={(e) => updateFilter('area', e.target.value)}
                    placeholder="Area / Landmark..."
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-2xl text-sm focus:bg-white focus:border-sky/30 transition-all outline-none"
                  />
                  <input
                    type="text"
                    value={filters.pincode}
                    onChange={(e) => updateFilter('pincode', e.target.value)}
                    placeholder="Pincode..."
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-2xl text-sm focus:bg-white focus:border-sky/30 transition-all outline-none"
                  />
                </div>
              </div>

              {/* Reset Footer */}
              <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
                {filterCount > 0 && (
                  <motion.button
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={clearFilters}
                    className="flex items-center gap-2 text-xs text-red-500 bg-red-50 hover:bg-red-100 px-6 py-2.5 rounded-xl font-black transition-all shadow-sm uppercase tracking-widest"
                  >
                    <HiOutlineRefresh className="w-3.5 h-3.5" />
                    Reset All Filters
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FilterBar;
