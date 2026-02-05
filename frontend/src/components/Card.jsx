import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MoreHorizontal,
  Pencil,
  Trash2,
  FolderOpen,
  CheckCircle2,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import ProgressBar from "./ProgressBar";

const Card = ({ taskList, onDelete }) => {
  const { id, title, description, progress, count } = taskList;
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const percentage = Math.round((progress || 0) * 100);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getProgressColor = () => {
    if (percentage === 100) return "from-emerald-500 to-teal-500";
    if (percentage >= 50) return "from-indigo-500 to-violet-500";
    return "from-amber-500 to-orange-500";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group relative"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-violet-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 overflow-hidden">
        {/* Progress indicator bar at top */}
        <div className="h-1 bg-slate-100">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`h-full bg-gradient-to-r ${getProgressColor()}`}
          />
        </div>

        <Link to={`/task-lists/${id}/tasks`} className="block p-5">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-xl bg-gradient-to-br ${getProgressColor()} bg-opacity-10 flex items-center justify-center`}
              >
                <FolderOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                  {title}
                </h3>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    {count || 0} tasks
                  </span>
                  <span className="text-xs font-medium text-slate-500">
                    · {percentage}% complete
                  </span>
                </div>
              </div>
            </div>

            {/* Menu Button */}
            <div ref={menuRef} className="relative">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowMenu(!showMenu);
                }}
                className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors opacity-0 group-hover:opacity-100"
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>

              {/* Dropdown Menu */}
              {showMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -5 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="absolute right-0 top-full mt-1 w-36 bg-white rounded-xl border border-slate-200 shadow-lg shadow-slate-200/50 py-1 z-10"
                >
                  <Link
                    to={`/task-lists/${id}/edit`}
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    Edit
                  </Link>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onDelete(id);
                      setShowMenu(false);
                    }}
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Delete
                  </button>
                </motion.div>
              )}
            </div>
          </div>

          {description && (
            <p className="text-sm text-slate-500 line-clamp-2 mb-4 pl-[52px]">
              {description}
            </p>
          )}

          {/* Progress Bar */}
          <div className="mt-4">
            <ProgressBar progress={progress || 0} showLabel={false} size="sm" />
          </div>
        </Link>
      </div>
    </motion.div>
  );
};

export default Card;
