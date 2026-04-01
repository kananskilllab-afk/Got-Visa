import { useState } from 'react';
import { Outlet, NavLink, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineChartBar, HiOutlineUsers, HiOutlineLogout, HiOutlineMenu, HiX, HiOutlineHome } from 'react-icons/hi';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { to: '/admin', icon: HiOutlineChartBar, label: 'Dashboard', end: true },
  { to: '/admin/students', icon: HiOutlineUsers, label: 'Students', end: false },
];

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-white/15">
        <Link to="/" className="flex items-center gap-3 no-underline group">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-10 h-10"
          >
            <img
              src="/src/assets/Kanan New Logo.png"
              alt="Company Logo"
              className="w-full h-full object-contain"
            />
          </motion.div>
          <div>
            <h1 className="text-white font-bold text-lg m-0 tracking-tight">Admin Portal</h1>
            <p className="text-white/50 text-xs m-0 font-medium">Dashboard</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map(({ to, icon: Icon, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 no-underline group
              ${isActive
                ? 'bg-gradient-to-r from-white/25 to-white/15 text-white shadow-lg shadow-black/10 border border-white/20'
                : 'text-white/70 hover:bg-white/10 hover:text-white hover:translate-x-1'
              }`
            }
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors"
            >
              <Icon className="w-5 h-5" />
            </motion.div>
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-white/15">
        <motion.button
          whileHover={{ scale: 1.02, x: -4 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold text-white/70 hover:bg-red-500/20 hover:text-red-300 transition-all duration-300 w-full cursor-pointer bg-transparent border-none"
        >
          <div className="w-9 h-9 rounded-lg bg-red-500/20 flex items-center justify-center">
            <HiOutlineLogout className="w-5 h-5" />
          </div>
          Logout
        </motion.button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="h-full bg-gradient-to-b from-secondary to-secondary-dark shadow-2xl">
          <SidebarContent />
        </div>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed inset-y-0 left-0 w-64 bg-gradient-to-b from-secondary to-secondary-dark z-50 lg:hidden shadow-2xl"
            >
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="lg:pl-64 flex-1 flex flex-col">
        {/* Top bar (mobile) */}
        <motion.div
          className="lg:hidden bg-white/80 backdrop-blur-xl shadow-sm px-4 py-3 flex items-center gap-3 sticky top-0 z-30 border-b border-gray-100"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
        >
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setSidebarOpen(true)}
            className="p-2.5 rounded-xl hover:bg-gradient-to-br hover:from-primary/10 hover:to-secondary/10 transition-colors"
          >
            <HiOutlineMenu className="w-5 h-5 text-gray-600" />
          </motion.button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8">
              <img
                src="/src/assets/Kanan New Logo.png"
                alt="Company Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-bold text-gray-800 tracking-tight">Admin Dashboard</span>
          </div>
        </motion.div>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
