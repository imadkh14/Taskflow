import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { formatDistanceToNow, isPast, format } from "date-fns";
import {
  Check,
  Calendar,
  Pencil,
  Trash2,
  AlertCircle,
  Clock,
  Flag,
} from "lucide-react";

const TaskItem = ({
  task,
  taskListId,
  onToggleComplete,
  onDelete,
  isToggling = false,
}) => {
  const { id, title, description, dueDate, priority, status } = task;
  const isCompleted = status === "CLOSED";

  const getPriorityConfig = () => {
    const configs = {
      HIGH: {
        label: "High",
        bg: "bg-rose-50",
        text: "text-rose-700",
        border: "border-rose-200",
        icon: "text-rose-500",
      },
      MEDIUM: {
        label: "Medium",
        bg: "bg-amber-50",
        text: "text-amber-700",
        border: "border-amber-200",
        icon: "text-amber-500",
      },
      LOW: {
        label: "Low",
        bg: "bg-emerald-50",
        text: "text-emerald-700",
        border: "border-emerald-200",
        icon: "text-emerald-500",
      },
    };
    return configs[priority] || configs.MEDIUM;
  };

  const priorityConfig = getPriorityConfig();

  const formatDueDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    const isOverdue = isPast(date) && !isCompleted;

    return {
      relative: formatDistanceToNow(date, { addSuffix: true }),
      absolute: format(date, "MMM d, yyyy • h:mm a"),
      isOverdue,
    };
  };

  const dueDateInfo = dueDate ? formatDueDate(dueDate) : null;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      whileHover={{ scale: 1.005 }}
      transition={{ duration: 0.2 }}
      className={`group relative bg-white/80 backdrop-blur-sm rounded-xl border transition-all duration-200
        ${
          isCompleted
            ? "border-emerald-200/60 bg-emerald-50/30"
            : "border-slate-200/60 hover:border-slate-300/60 hover:shadow-lg hover:shadow-slate-200/40"
        }`}
    >
      <div className="p-4 flex items-start gap-4">
        {/* Checkbox */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => onToggleComplete(task)}
          disabled={isToggling}
          className={`relative shrink-0 w-5 h-5 mt-0.5 rounded-full border-2 flex items-center justify-center transition-all duration-200
            ${
              isCompleted
                ? "bg-gradient-to-br from-emerald-400 to-teal-500 border-transparent"
                : "border-slate-300 hover:border-indigo-500 hover:bg-indigo-50"
            } ${isToggling ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
        >
          {isCompleted && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              <Check className="w-3 h-3 text-white" strokeWidth={3} />
            </motion.div>
          )}
        </motion.button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h4
              className={`font-medium transition-all duration-200 ${isCompleted ? "text-slate-400 line-through" : "text-slate-900"}`}
            >
              {title}
            </h4>

            {/* Priority Badge */}
            <span
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${priorityConfig.bg} ${priorityConfig.text} border ${priorityConfig.border}`}
            >
              <Flag className={`w-3 h-3 ${priorityConfig.icon}`} />
              {priorityConfig.label}
            </span>

            {/* Completed Badge */}
            {isCompleted && (
              <motion.span
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200"
              >
                <Check className="w-3 h-3" />
                Done
              </motion.span>
            )}
          </div>

          {description && (
            <p
              className={`text-sm line-clamp-2 mb-2 ${isCompleted ? "text-slate-400" : "text-slate-500"}`}
            >
              {description}
            </p>
          )}

          {dueDateInfo && (
            <div
              className={`flex items-center gap-2 text-xs ${dueDateInfo.isOverdue ? "text-rose-600" : "text-slate-500"}`}
            >
              {dueDateInfo.isOverdue ? (
                <AlertCircle className="w-3.5 h-3.5" />
              ) : (
                <Clock className="w-3.5 h-3.5" />
              )}
              <span className="font-medium">
                {dueDateInfo.isOverdue ? "Overdue" : "Due"}
              </span>
              <span>{dueDateInfo.relative}</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-400">{dueDateInfo.absolute}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="shrink-0 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Link
            to={`/task-lists/${taskListId}/tasks/${id}/edit`}
            className="p-2 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
            title="Edit task"
          >
            <Pencil className="w-4 h-4" />
          </Link>
          <button
            onClick={() => onDelete(id)}
            className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
            title="Delete task"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskItem;
