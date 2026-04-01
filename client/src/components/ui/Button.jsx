import { motion } from 'framer-motion';

const variantStyles = {
  primary: 'bg-gradient-to-r from-primary via-primary-light to-primary hover:from-primary-dark hover:via-primary hover:to-primary-light text-white shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40',
  secondary: 'bg-gradient-to-r from-secondary to-secondary-dark hover:from-secondary-dark hover:to-secondary text-white shadow-lg shadow-secondary/30 hover:shadow-xl hover:shadow-secondary/40',
  accent: 'bg-gradient-to-r from-accent to-violet hover:from-violet hover:to-accent text-white shadow-lg shadow-accent/30 hover:shadow-xl hover:shadow-accent/40',
  danger: 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40',
  outline: 'border-2 border-primary/30 text-primary hover:bg-primary hover:text-white hover:border-primary hover:shadow-lg hover:shadow-primary/20',
  ghost: 'text-gray-600 hover:text-primary hover:bg-primary/5',
  success: 'bg-gradient-to-r from-secondary via-lime to-secondary hover:from-secondary-dark hover:via-lime hover:to-secondary-dark text-white shadow-lg shadow-secondary/30 hover:shadow-xl hover:shadow-secondary/40',
  gold: 'bg-gradient-to-r from-gold to-orange hover:from-orange hover:to-gold text-white shadow-lg shadow-gold/30 hover:shadow-xl hover:shadow-gold/40',
};

const sizes = {
  sm: 'px-4 py-2 text-xs font-semibold',
  md: 'px-6 py-2.5 text-sm font-semibold',
  lg: 'px-8 py-3.5 text-base font-bold',
};

const Button = ({ children, variant = 'primary', size = 'md', loading = false, className = '', disabled, icon: Icon, ...props }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      {...props}
      className={`inline-flex items-center justify-center gap-2.5 font-semibold rounded-2xl transition-all duration-500
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none cursor-pointer
        active:scale-95 ${variantStyles[variant]} ${sizes[size]} ${className}`}
      disabled={loading || disabled}
    >
      {loading ? (
        <motion.svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </motion.svg>
      ) : Icon ? (
        <Icon className="w-5 h-5" />
      ) : null}
      <span className="tracking-wide">{children}</span>
    </motion.button>
  );
};

export default Button;
