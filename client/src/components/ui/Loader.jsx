import { motion } from 'framer-motion';

const Loader = ({ size = 'md', text = 'Loading...' }) => {
  const sizeMap = { sm: 48, md: 64, lg: 96 };
  const s = sizeMap[size];

  return (
    <div className="flex flex-col items-center justify-center py-20 gap-6">
      <div className="relative" style={{ width: s, height: s }}>
        {/* Outer glow ring */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            boxShadow: [
              '0 0 0 0 rgba(40, 70, 149, 0.2)',
              '0 0 0 20px rgba(40, 70, 149, 0)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
        />
        {/* Primary ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-primary/15"
        />
        {/* Spinning gradient ring */}
        <motion.div
          className="absolute inset-1 rounded-full"
          style={{
            background: 'conic-gradient(from 0deg, transparent, var(--color-primary), var(--color-secondary), var(--color-lime), transparent)',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        />
        {/* Inner white circle */}
        <motion.div
          className="absolute inset-3 rounded-full bg-white"
          animate={{ scale: [1, 0.95, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Center dot */}
        <div
          className="absolute inset-0 m-auto w-3 h-3 rounded-full"
          style={{
            background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
          }}
        />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-2"
      >
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="text-sm font-semibold text-gray-500 tracking-wide"
        >
          {text}
        </motion.p>
        {/* Dots animation */}
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-secondary"
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Loader;
