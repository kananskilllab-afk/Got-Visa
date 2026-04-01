import { motion, AnimatePresence } from 'framer-motion';
import { HiX } from 'react-icons/hi';

const Modal = ({ isOpen, onClose, title, children, maxWidth = 'max-w-2xl', showCloseButton = true }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="absolute inset-0 bg-gradient-to-br from-primary/30 via-accent/20 to-secondary/20 backdrop-blur-md"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40, rotateX: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40, rotateX: 10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 400, duration: 0.4 }}
            className={`relative bg-white rounded-3xl shadow-2xl shadow-primary/20 w-full ${maxWidth} max-h-[90vh] overflow-y-auto z-10 border border-white/50`}
          >
            {/* Gradient top border */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-secondary to-lime rounded-t-3xl" />

            {/* Header */}
            <div className="sticky top-0 bg-white/90 backdrop-blur-xl flex items-center justify-between px-6 sm:px-8 py-5 border-b border-gray-100 rounded-t-3xl z-10">
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl font-bold text-gray-800 tracking-tight"
              >
                {title}
              </motion.h2>
              {showCloseButton && (
                <motion.button
                  whileHover={{ scale: 1.15, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2.5 rounded-2xl hover:bg-gradient-to-br hover:from-primary/10 hover:to-secondary/10 transition-all duration-300 cursor-pointer bg-transparent border-none group"
                >
                  <HiX className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
                </motion.button>
              )}
            </div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.3 }}
              className="p-6 sm:p-8"
            >
              {children}
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
