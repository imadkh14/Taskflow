import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus, AlertCircle, FolderPlus } from "lucide-react";
import { useTaskLists, useDeleteTaskList } from "../hooks";
import { Card, LoadingSpinner, EmptyState, Modal } from "../components";
import logoImage from "../assets/logo.png";

const TaskListsPage = () => {
  const { data: taskLists, isLoading, error } = useTaskLists();
  const deleteTaskListMutation = useDeleteTaskList();
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });

  const handleDelete = (id) => {
    setDeleteModal({ isOpen: true, id });
  };

  const confirmDelete = () => {
    if (deleteModal.id) {
      deleteTaskListMutation.mutate(deleteModal.id);
    }
    setDeleteModal({ isOpen: false, id: null });
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-16"
      >
        <div className="w-16 h-16 rounded-2xl bg-rose-50 flex items-center justify-center mb-4">
          <AlertCircle className="w-8 h-8 text-rose-500" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">
          Failed to load projects
        </h3>
        <p className="text-sm text-slate-500 mb-6">
          Something went wrong. Please try again later.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors"
        >
          Try again
        </button>
      </motion.div>
    );
  }

  return (
    <div>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <img
            src={logoImage}
            alt="Logo"
            className="w-10 h-10 object-contain"
          />
          <div>
            <h1 className="text-2xl font-bold text-slate-900">My Projects</h1>
            <p className="text-sm text-slate-500">
              Organize and track your tasks efficiently
            </p>
          </div>
        </div>
      </motion.div>

      {/* Stats Bar */}
      {taskLists?.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200/60 p-4">
            <p className="text-2xl font-bold text-slate-900">
              {taskLists?.length}
            </p>
            <p className="text-xs text-slate-500 font-medium">Total Projects</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200/60 p-4">
            <p className="text-2xl font-bold text-emerald-600">
              {taskLists?.filter((t) => t.progress === 1).length || 0}
            </p>
            <p className="text-xs text-slate-500 font-medium">Completed</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200/60 p-4">
            <p className="text-2xl font-bold text-amber-600">
              {taskLists?.filter((t) => t.progress > 0 && t.progress < 1)
                .length || 0}
            </p>
            <p className="text-xs text-slate-500 font-medium">In Progress</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200/60 p-4">
            <p className="text-2xl font-bold text-slate-600">
              {taskLists?.reduce((acc, t) => acc + (t.count || 0), 0) || 0}
            </p>
            <p className="text-xs text-slate-500 font-medium">Total Tasks</p>
          </div>
        </motion.div>
      )}

      {taskLists?.length === 0 ? (
        <EmptyState
          type="projects"
          title="No projects yet"
          description="Create your first project to start organizing your tasks and boost your productivity."
          action={
            <Link
              to="/task-lists/create"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-violet-600 rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-200"
            >
              <FolderPlus className="w-4 h-4" />
              Create Project
            </Link>
          }
        />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
        >
          {taskLists?.map((taskList, index) => (
            <motion.div
              key={taskList.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card taskList={taskList} onDelete={handleDelete} />
            </motion.div>
          ))}
        </motion.div>
      )}

      <Modal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: null })}
        onConfirm={confirmDelete}
        title="Delete Project"
        message="Are you sure you want to delete this project? All tasks within it will also be deleted. This action cannot be undone."
        confirmText="Delete"
        confirmVariant="danger"
      />
    </div>
  );
};

export default TaskListsPage;
