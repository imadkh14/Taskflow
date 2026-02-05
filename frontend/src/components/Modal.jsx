import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";

const Modal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  confirmVariant = "danger",
}) => {
  const confirmButtonClasses = {
    danger:
      "bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 shadow-lg shadow-rose-500/25",
    primary:
      "bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 shadow-lg shadow-indigo-500/25",
    success:
      "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg shadow-emerald-500/25",
  };

  const iconBgClasses = {
    danger: "bg-rose-50 text-rose-600",
    primary: "bg-indigo-50 text-indigo-600",
    success: "bg-emerald-50 text-emerald-600",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 text-center">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
              onClick={onClose}
            />

            {/* Modal Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="relative bg-white rounded-2xl shadow-2xl shadow-slate-900/10 max-w-md w-full mx-auto overflow-hidden"
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute right-4 top-4 p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-6">
                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-xl ${iconBgClasses[confirmVariant]} flex items-center justify-center mb-4`}
                >
                  <AlertTriangle className="w-6 h-6" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {message}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3 px-6 py-4 bg-slate-50/50 border-t border-slate-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={onConfirm}
                  className={`flex-1 px-4 py-2.5 text-sm font-medium text-white rounded-xl transition-all duration-200 ${confirmButtonClasses[confirmVariant]}`}
                >
                  {confirmText}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
