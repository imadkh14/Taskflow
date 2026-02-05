import { motion } from "framer-motion";

const ProgressBar = ({ progress = 0, showLabel = true, size = "md" }) => {
  const percentage = Math.round(progress * 100);

  const sizeClasses = {
    sm: "h-1.5",
    md: "h-2",
    lg: "h-3",
  };

  const getGradient = () => {
    if (percentage === 100) return "from-emerald-400 to-teal-500";
    if (percentage >= 75) return "from-indigo-400 to-violet-500";
    if (percentage >= 50) return "from-blue-400 to-indigo-500";
    if (percentage >= 25) return "from-amber-400 to-orange-500";
    return "from-rose-400 to-pink-500";
  };

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between mb-2">
          <span className="text-xs font-medium text-slate-500">Progress</span>
          <span className="text-xs font-semibold text-slate-700">
            {percentage}%
          </span>
        </div>
      )}
      <div
        className={`w-full bg-slate-100 rounded-full ${sizeClasses[size]} overflow-hidden`}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className={`${sizeClasses[size]} rounded-full bg-gradient-to-r ${getGradient()} relative`}
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 overflow-hidden rounded-full">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/25 to-transparent" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProgressBar;
