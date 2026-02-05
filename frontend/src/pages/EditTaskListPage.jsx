import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, Pencil, FolderOpen } from "lucide-react";
import { useTaskList, useUpdateTaskList } from "../hooks";
import { TaskListForm, LoadingSpinner } from "../components";

const EditTaskListPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: taskList, isLoading } = useTaskList(id);
  const updateTaskListMutation = useUpdateTaskList();

  const handleSubmit = (data) => {
    updateTaskListMutation.mutate(
      { id, data },
      {
        onSuccess: () => {
          navigate("/");
        },
      },
    );
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!taskList) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-16"
      >
        <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
          <FolderOpen className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">
          Project not found
        </h3>
        <p className="text-sm text-slate-500 mb-6">
          The project you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to projects
        </Link>
      </motion.div>
    );
  }

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
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/25">
            <Pencil className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Edit Project</h1>
            <p className="text-sm text-slate-500">Update {taskList.title}</p>
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
          initialData={taskList}
          onSubmit={handleSubmit}
          isLoading={updateTaskListMutation.isPending}
          submitText="Update Project"
        />
      </motion.div>
    </div>
  );
};

export default EditTaskListPage;
