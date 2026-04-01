import { motion } from 'framer-motion';

const variants = {
  success: 'bg-gradient-to-r from-secondary/15 to-lime/15 text-secondary border border-secondary/30 shadow-sm shadow-secondary/10',
  info: 'bg-gradient-to-r from-sky/15 to-primary/15 text-sky border border-sky/30 shadow-sm shadow-sky/10',
  warning: 'bg-gradient-to-r from-orange/15 to-gold/15 text-orange border border-orange/30 shadow-sm shadow-orange/10',
  purple: 'bg-gradient-to-r from-violet/15 to-accent/15 text-violet border border-violet/30 shadow-sm shadow-violet/10',
  blue: 'bg-gradient-to-r from-primary/15 to-sky/15 text-primary border border-primary/30 shadow-sm shadow-primary/10',
  lime: 'bg-gradient-to-r from-lime/20 to-secondary/15 text-lime border border-lime/30 shadow-sm shadow-lime/10',
  gold: 'bg-gradient-to-r from-gold/15 to-orange/15 text-gold border border-gold/30 shadow-sm shadow-gold/10',
  accent: 'bg-gradient-to-r from-accent/15 to-violet/15 text-accent border border-accent/30 shadow-sm shadow-accent/10',
  red: 'bg-gradient-to-r from-red/15 to-orange/15 text-red border border-red/30 shadow-sm shadow-red/10',
};

const Badge = ({ children, variant = 'success', className = '', icon: Icon, animate = false }) => {
  const content = (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold tracking-wide ${variants[variant]} ${className}`}>
      {Icon && <Icon className="w-3.5 h-3.5" />}
      {children}
    </span>
  );

  if (animate) {
    return (
      <motion.span
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        {content}
      </motion.span>
    );
  }

  return content;
};

export default Badge;
