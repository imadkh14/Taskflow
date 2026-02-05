import { motion } from "framer-motion";
import { ClipboardList, Inbox, FolderOpen, Plus } from "lucide-react";

const EmptyState = ({
  title = "No items found",
  description = "Get started by creating a new item.",
  action,
  icon,
  type = "default", // 'default', 'tasks', 'projects'
}) => {
  const icons = {
    default: Inbox,
    tasks: ClipboardList,
    projects: FolderOpen,
  };

  const IconComponent = icon || icons[type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center py-16 px-4"
    >
      {/* Icon with animated background */}
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-violet-500/20 rounded-full blur-2xl scale-150" />
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200/60 flex items-center justify-center shadow-sm"
        >
          <IconComponent className="w-8 h-8 text-slate-400" strokeWidth={1.5} />
        </motion.div>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="text-center max-w-sm"
      >
        <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
        <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
      </motion.div>

      {/* Action Button */}
      {action && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-6"
        >
          {action}
        </motion.div>
      )}
    </motion.div>
  );
};

export default EmptyState;
