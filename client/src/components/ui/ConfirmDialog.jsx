import { motion } from 'framer-motion';
import { HiOutlineExclamation } from 'react-icons/hi';
import Modal from './Modal';
import Button from './Button';

const ConfirmDialog = ({ isOpen, onClose, onConfirm, title = 'Confirm Action', message = 'Are you sure?', confirmLabel = 'Confirm', variant = 'danger', loading, icon }) => {
  const variantStyles = {
    danger: 'from-red-500 to-red-600 shadow-red-500/30',
    success: 'from-secondary to-secondary-dark shadow-secondary/30',
    warning: 'from-orange to-orange/90 shadow-orange/30',
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="max-w-md">
      <div className="flex flex-col items-center text-center">
        {/* Warning icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30, delay: 0.1 }}
          className={`w-16 h-16 rounded-full bg-gradient-to-br ${variantStyles[variant]} flex items-center justify-center mb-4 shadow-lg`}
        >
          {icon || <HiOutlineExclamation className="w-8 h-8 text-white" />}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 text-base mb-6 leading-relaxed"
        >
          {message}
        </motion.p>

        <div className="flex gap-3 w-full">
          <Button
            variant="ghost"
            onClick={onClose}
            className="flex-1"
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            variant={variant}
            onClick={onConfirm}
            loading={loading}
            className="flex-1"
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;
