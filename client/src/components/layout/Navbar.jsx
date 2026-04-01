import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineShieldCheck, HiOutlineMenu, HiX } from 'react-icons/hi';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (location.pathname.startsWith('/admin')) return null;

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'glass shadow-xl shadow-primary/10 border-b border-white/30'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 no-underline group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="w-12 h-12">
                  <img
                    src="/src/assets/Kanan New Logo.png"
                    alt="Company Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
              </motion.div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight">
                  Company Name
                </span>
                <p className="text-[10px] text-gray-500 font-bold tracking-[0.2em] uppercase -mt-0.5">Success Stories</p>
              </div>
            </Link>

            {/* Desktop Admin Link */}
            <motion.div className="hidden sm:flex items-center">
              <Link
                to="/admin/login"
                className="group flex items-center gap-2.5 px-5 py-2.5 text-sm font-semibold text-gray-600
                  hover:text-white no-underline transition-all duration-300"
              >
                <motion.div
                  className="flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-gray-200
                    group-hover:border-primary/50 group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-primary-light
                    transition-all duration-300 shadow-sm group-hover:shadow-lg group-hover:shadow-primary/30"
                >
                  <HiOutlineShieldCheck className="w-4 h-4 transition-transform group-hover:scale-110" />
                  <span>Admin</span>
                </motion.div>
              </Link>
            </motion.div>

            {/* Mobile menu button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setMobileMenuOpen(true)}
              className="sm:hidden p-2.5 rounded-xl hover:bg-white/50 transition-colors"
            >
              <HiOutlineMenu className="w-6 h-6 text-gray-600" />
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-white z-50 shadow-2xl"
            >
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-800">Menu</span>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-xl hover:bg-gray-100"
                  >
                    <HiX className="w-6 h-6 text-gray-500" />
                  </motion.button>
                </div>
              </div>
              <div className="p-6">
                <Link
                  to="/admin/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-primary to-primary-light text-white font-semibold shadow-lg shadow-primary/30"
                >
                  <HiOutlineShieldCheck className="w-5 h-5" />
                  Admin Portal
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
