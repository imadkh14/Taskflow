import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const TaskListForm = ({
  initialData = null,
  onSubmit,
  isLoading = false,
  submitText = "Create Project",
}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [errors, setErrors] = useState({});
  const [focused, setFocused] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
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
      onSubmit(formData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
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
          Project Name <span className="text-rose-500">*</span>
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
          placeholder="e.g., Website Redesign"
        />
        {errors.title && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 text-sm text-rose-600 flex items-center gap-1"
          >
            <span className="w-1 h-1 rounded-full bg-rose-500" />
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
          placeholder="Describe your project goals and objectives..."
        />
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

export default TaskListForm;
