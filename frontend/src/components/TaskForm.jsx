import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2, Flag, Calendar, AlertCircle } from "lucide-react";

const PRIORITIES = ["LOW", "MEDIUM", "HIGH"];

const TaskForm = ({
  initialData = null,
  onSubmit,
  isLoading = false,
  submitText = "Create Task",
}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "MEDIUM",
    status: "OPEN",
  });
  const [errors, setErrors] = useState({});
  const [focused, setFocused] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        dueDate: initialData.dueDate ? initialData.dueDate.slice(0, 16) : "",
        priority: initialData.priority || "MEDIUM",
        status: initialData.status || "OPEN",
      });
    }
  }, [initialData]);

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const submitData = {
        ...formData,
        dueDate: formData.dueDate
          ? new Date(formData.dueDate).toISOString()
          : null,
      };
      onSubmit(submitData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const getPriorityConfig = (priority) => {
    const configs = {
      HIGH: {
        bg: "bg-rose-50",
        text: "text-rose-700",
        border: "border-rose-200",
        ring: "ring-rose-500/20",
      },
      MEDIUM: {
        bg: "bg-amber-50",
        text: "text-amber-700",
        border: "border-amber-200",
        ring: "ring-amber-500/20",
      },
      LOW: {
        bg: "bg-emerald-50",
        text: "text-emerald-700",
        border: "border-emerald-200",
        ring: "ring-emerald-500/20",
      },
    };
    return configs[priority] || configs.MEDIUM;
  };

  const inputClasses = (fieldName) => `
    w-full px-4 py-3 rounded-xl border bg-white/50 backdrop-blur-sm
    text-slate-900 placeholder:text-slate-400
    transition-all duration-200 ease-out
    ${
      errors[fieldName]
        ? "border-rose-300 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10"
        : "border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
    }
    ${focused[fieldName] ? "shadow-lg shadow-slate-200/50" : ""}
  `;

  const labelClasses = (fieldName) => `
    block text-sm font-medium mb-2 transition-colors duration-200
    ${focused[fieldName] ? "text-indigo-600" : "text-slate-700"}
  `;

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div>
        <label htmlFor="title" className={labelClasses("title")}>
          Task Name <span className="text-rose-500">*</span>
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          onFocus={() => setFocused((f) => ({ ...f, title: true }))}
          onBlur={() => setFocused((f) => ({ ...f, title: false }))}
          className={inputClasses("title")}
          placeholder="e.g., Design homepage mockups"
        />
        {errors.title && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 text-sm text-rose-600 flex items-center gap-1.5"
          >
            <AlertCircle className="w-3.5 h-3.5" />
            {errors.title}
          </motion.p>
        )}
      </div>

      <div>
        <label htmlFor="description" className={labelClasses("description")}>
          Description
          <span className="text-slate-400 font-normal ml-1">(optional)</span>
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          value={formData.description}
          onChange={handleChange}
          onFocus={() => setFocused((f) => ({ ...f, description: true }))}
          onBlur={() => setFocused((f) => ({ ...f, description: false }))}
          className={`${inputClasses("description")} resize-none`}
          placeholder="Add more details about this task..."
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="dueDate" className={labelClasses("dueDate")}>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              Due Date
            </span>
          </label>
          <input
            type="datetime-local"
            id="dueDate"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            onFocus={() => setFocused((f) => ({ ...f, dueDate: true }))}
            onBlur={() => setFocused((f) => ({ ...f, dueDate: false }))}
            className={inputClasses("dueDate")}
          />
        </div>

        <div>
          <label htmlFor="priority" className={labelClasses("priority")}>
            <span className="flex items-center gap-1.5">
              <Flag className="w-4 h-4" />
              Priority
            </span>
          </label>
          <div className="flex gap-2">
            {PRIORITIES.map((priority) => {
              const config = getPriorityConfig(priority);
              const isSelected = formData.priority === priority;
              return (
                <button
                  key={priority}
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, priority }))}
                  className={`flex-1 py-2.5 px-3 rounded-xl border text-sm font-medium transition-all duration-200
                    ${
                      isSelected
                        ? `${config.bg} ${config.text} ${config.border} ring-2 ${config.ring}`
                        : "bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                >
                  {priority.charAt(0) + priority.slice(1).toLowerCase()}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="px-5 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all duration-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-violet-600 rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Processing...
            </>
          ) : (
            submitText
          )}
        </button>
      </div>
    </motion.form>
  );
};

export default TaskForm;
