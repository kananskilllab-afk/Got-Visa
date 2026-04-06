import { motion } from 'framer-motion';
import { HiOutlineGlobe } from 'react-icons/hi';
import logo from '../../assets/Kanan New Logo.png';

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-secondary via-secondary-dark to-primary mt-auto overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-lime rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3"
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="w-48 h-16"
            >
              <img
                src={logo}
                alt="Kanan.co Logo"
                className="w-full h-full object-contain"
              />
            </motion.div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-white">Kanan.co</span>
              <span className="text-xs text-white/60 font-medium">Empowering Dreams</span>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-6"
          >
            <div className="text-center">
              <p className="text-2xl font-black text-white">500+</p>
              <p className="text-xs text-white/60 font-medium">Success Stories</p>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div className="text-center">
              <p className="text-2xl font-black text-white">20+</p>
              <p className="text-xs text-white/60 font-medium">Countries</p>
            </div>
          </motion.div>

          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-white/60 text-sm font-medium"
          >
            &copy; {new Date().getFullYear()} Kanan.co. All rights reserved.
          </motion.p>
        </div>

        {/* Bottom accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-lime to-sky"
        />
      </div>
    </footer>
  );
};

export default Footer;
