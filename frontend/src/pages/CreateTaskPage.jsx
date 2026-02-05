import { useNavigate, useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, PlusCircle } from "lucide-react";
import { useCreateTask, useTaskList } from "../hooks";
import { TaskForm, LoadingSpinner } from "../components";

const CreateTaskPage = () => {
  const { taskListId } = useParams();
  const navigate = useNavigate();
  const { data: taskList, isLoading } = useTaskList(taskListId);
  const createTaskMutation = useCreateTask(taskListId);

  const handleSubmit = (data) => {
    createTaskMutation.mutate(data, {
      onSuccess: () => {
        navigate(`/task-lists/${taskListId}/tasks`);
      },
    });
  };

  if (isLoading) {
    return <LoadingSpinner />;
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
          to={`/task-lists/${taskListId}/tasks`}
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors group"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to {taskList?.title || "Tasks"}
        </Link>
      </motion.div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/25">
            <PlusCircle className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Create Task</h1>
            <p className="text-sm text-slate-500">
              Add a new task to "{taskList?.title}"
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
        <TaskForm
          onSubmit={handleSubmit}
          isLoading={createTaskMutation.isPending}
          submitText="Create Task"
        />
      </motion.div>
    </div>
  );
};

export default CreateTaskPage;
