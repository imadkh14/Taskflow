import { motion } from "framer-motion";

const LoadingSpinner = ({ size = "md", fullScreen = false }) => {
  const sizeClasses = {
    sm: "w-5 h-5",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  const spinner = (
    <div className="relative">
      {/* Outer glow */}
      <div
        className={`absolute inset-0 ${sizeClasses[size]} rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 blur-md opacity-40`}
      />

      {/* Spinner */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className={`relative ${sizeClasses[size]}`}
      >
        <svg className="w-full h-full" viewBox="0 0 24 24">
          <circle
            className="stroke-slate-200"
            cx="12"
            cy="12"
            r="10"
            fill="none"
            strokeWidth="2.5"
          />
          <circle
            className="stroke-indigo-600"
            cx="12"
            cy="12"
            r="10"
            fill="none"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="31.416"
            strokeDashoffset="10"
          />
        </svg>
      </motion.div>
    </div>
  );

  if (fullScreen) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm z-50"
      >
        {spinner}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-sm text-slate-500 font-medium"
        >
          Loading...
        </motion.p>
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-16">
      {spinner}
      <p className="mt-4 text-sm text-slate-500 font-medium">Loading...</p>
    </div>
  );
};

export default LoadingSpinner;
