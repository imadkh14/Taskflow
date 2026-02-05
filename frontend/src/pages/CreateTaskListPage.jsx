import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, FolderPlus } from "lucide-react";
import { useCreateTaskList } from "../hooks";
import { TaskListForm } from "../components";

const CreateTaskListPage = () => {
  const navigate = useNavigate();
  const createTaskListMutation = useCreateTaskList();

  const handleSubmit = (data) => {
    createTaskListMutation.mutate(data, {
      onSuccess: () => {
        navigate("/");
      },
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-6"
      >
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors group"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to Projects
        </Link>
      </motion.div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
            <FolderPlus className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Create Project
            </h1>
            <p className="text-sm text-slate-500">
              Start a new project to organize your tasks
            </p>
          </div>
        </div>
      </motion.div>

      {/* Form Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-sm p-6"
      >
        <TaskListForm
          onSubmit={handleSubmit}
          isLoading={createTaskListMutation.isPending}
          submitText="Create Project"
        />
      </motion.div>
    </div>
  );
};

export default CreateTaskListPage;
