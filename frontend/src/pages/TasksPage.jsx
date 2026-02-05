import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  Plus,
  Trash2,
  CheckCircle2,
  Circle,
  ListTodo,
  BarChart3,
} from "lucide-react";
import {
  useTaskList,
  useTasks,
  useDeleteTask,
  useDeleteTaskList,
  useToggleTaskComplete,
} from "../hooks";
import {
  LoadingSpinner,
  ProgressBar,
  TaskItem,
  EmptyState,
  Modal,
} from "../components";

const TasksPage = () => {
  const { taskListId } = useParams();
  const navigate = useNavigate();

  const { data: taskList, isLoading: isLoadingTaskList } =
    useTaskList(taskListId);
  const { data: tasks, isLoading: isLoadingTasks } = useTasks(taskListId);
  const deleteTaskMutation = useDeleteTask(taskListId);
  const deleteTaskListMutation = useDeleteTaskList();
  const toggleCompleteMutation = useToggleTaskComplete(taskListId);

  const [deleteTaskModal, setDeleteTaskModal] = useState({
    isOpen: false,
    id: null,
  });
  const [deleteListModal, setDeleteListModal] = useState(false);

  const handleDeleteTask = (taskId) => {
    setDeleteTaskModal({ isOpen: true, id: taskId });
  };

  const confirmDeleteTask = () => {
    if (deleteTaskModal.id) {
      deleteTaskMutation.mutate(deleteTaskModal.id);
    }
    setDeleteTaskModal({ isOpen: false, id: null });
  };

  const handleDeleteTaskList = () => {
    setDeleteListModal(true);
  };

  const confirmDeleteTaskList = () => {
    deleteTaskListMutation.mutate(taskListId, {
      onSuccess: () => {
        navigate("/");
      },
    });
    setDeleteListModal(false);
  };

  const handleToggleComplete = (task) => {
    toggleCompleteMutation.mutate({ taskId: task.id, task });
  };

  if (isLoadingTaskList || isLoadingTasks) {
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
          <ListTodo className="w-8 h-8 text-slate-400" />
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

  const completedTasks =
    tasks?.filter((task) => task.status === "CLOSED").length || 0;
  const totalTasks = tasks?.length || 0;
  const progress = totalTasks > 0 ? completedTasks / totalTasks : 0;
  const percentage = Math.round(progress * 100);

  return (
    <div>
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
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-slate-900 mb-1">
              {taskList.title}
            </h1>
            {taskList.description && (
              <p className="text-slate-500">{taskList.description}</p>
            )}
          </div>
          <Link
            to={`/task-lists/${taskListId}/tasks/create`}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-violet-600 rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-200 shrink-0"
          >
            <Plus className="w-4 h-4" />
            Add Task
          </Link>
        </div>
      </motion.div>

      {/* Progress Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 p-5 mb-6 shadow-sm"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/10 to-violet-500/10 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <p className="font-semibold text-slate-900">Overall Progress</p>
              <p className="text-xs text-slate-500">
                {completedTasks} of {totalTasks} tasks completed
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-slate-900">{percentage}%</p>
          </div>
        </div>
        <ProgressBar progress={progress} showLabel={false} size="md" />

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mt-5 pt-5 border-t border-slate-100">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5 text-slate-600 mb-1">
              <Circle className="w-3.5 h-3.5" />
              <span className="text-xs font-medium">Open</span>
            </div>
            <p className="text-lg font-bold text-slate-900">
              {tasks?.filter((t) => t.status === "OPEN").length || 0}
            </p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5 text-emerald-600 mb-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span className="text-xs font-medium">Done</span>
            </div>
            <p className="text-lg font-bold text-emerald-600">
              {completedTasks}
            </p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5 text-slate-600 mb-1">
              <ListTodo className="w-3.5 h-3.5" />
              <span className="text-xs font-medium">Total</span>
            </div>
            <p className="text-lg font-bold text-slate-900">{totalTasks}</p>
          </div>
        </div>
      </motion.div>

      {/* Tasks List */}
      {tasks?.length === 0 ? (
        <EmptyState
          type="tasks"
          title="No tasks yet"
          description="Start adding tasks to track your progress and stay organized."
          action={
            <Link
              to={`/task-lists/${taskListId}/tasks/create`}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-violet-600 rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-200"
            >
              <Plus className="w-4 h-4" />
              Add Task
            </Link>
          }
        />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-3"
        >
          <AnimatePresence mode="popLayout">
            {tasks?.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                taskListId={taskListId}
                onToggleComplete={handleToggleComplete}
                onDelete={handleDeleteTask}
                isToggling={toggleCompleteMutation.isPending}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Danger Zone */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-12 pt-8 border-t border-slate-200/60"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-900">Danger Zone</p>
            <p className="text-xs text-slate-500">
              Delete this project permanently
            </p>
          </div>
          <button
            onClick={handleDeleteTaskList}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-rose-600 bg-rose-50 border border-rose-200 rounded-xl hover:bg-rose-100 hover:border-rose-300 transition-all duration-200"
          >
            <Trash2 className="w-4 h-4" />
            Delete Project
          </button>
        </div>
      </motion.div>

      {/* Delete task modal */}
      <Modal
        isOpen={deleteTaskModal.isOpen}
        onClose={() => setDeleteTaskModal({ isOpen: false, id: null })}
        onConfirm={confirmDeleteTask}
        title="Delete Task"
        message="Are you sure you want to delete this task? This action cannot be undone."
        confirmText="Delete"
        confirmVariant="danger"
      />

      {/* Delete task list modal */}
      <Modal
        isOpen={deleteListModal}
        onClose={() => setDeleteListModal(false)}
        onConfirm={confirmDeleteTaskList}
        title="Delete Project"
        message="Are you sure you want to delete this entire project? All tasks within it will also be deleted. This action cannot be undone."
        confirmText="Delete"
        confirmVariant="danger"
      />
    </div>
  );
};

export default TasksPage;
