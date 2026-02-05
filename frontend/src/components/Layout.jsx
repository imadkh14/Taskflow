import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  ListTodo,
  Plus,
  Settings,
  ChevronLeft,
  Menu,
  X,
} from "lucide-react";
import logoImage from "../assets/logo.png";

const Sidebar = ({
  isCollapsed,
  setIsCollapsed,
  isMobileOpen,
  setIsMobileOpen,
}) => {
  const location = useLocation();

  const navItems = [{ icon: LayoutDashboard, label: "Dashboard", path: "/" }];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          width: isCollapsed ? 80 : 280,
          x: isMobileOpen
            ? 0
            : typeof window !== "undefined" && window.innerWidth < 1024
              ? -280
              : 0,
        }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className={`fixed left-0 top-0 h-screen bg-white/80 backdrop-blur-xl border-r border-slate-200/60 z-50 flex flex-col
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200/60">
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src={logoImage}
              alt="Taskflow Logo"
              className="w-9 h-9 object-contain group-hover:scale-110 transition-transform"
            />
            <AnimatePresence mode="wait">
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="font-bold text-lg text-slate-900"
                >
                  Taskflow
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          {/* Collapse button - desktop only */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex w-8 h-8 rounded-lg hover:bg-slate-100 items-center justify-center text-slate-400 hover:text-slate-600 transition-colors"
          >
            <ChevronLeft
              className={`w-4 h-4 transition-transform duration-300 ${isCollapsed ? "rotate-180" : ""}`}
            />
          </button>

          {/* Close button - mobile only */}
          <button
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group
                ${
                  isActive(item.path)
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
            >
              <item.icon
                className={`w-5 h-5 shrink-0 ${isActive(item.path) ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-600"}`}
              />
              <AnimatePresence mode="wait">
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="font-medium text-sm"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          ))}
        </nav>

        {/* Create Button */}
        <div className="p-3 border-t border-slate-200/60">
          <Link
            to="/task-lists/create"
            onClick={() => setIsMobileOpen(false)}
            className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-medium text-sm shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-200 btn-premium
              ${isCollapsed ? "px-2.5" : "px-4"}`}
          >
            <Plus className="w-4 h-4" />
            <AnimatePresence mode="wait">
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  New Project
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        </div>
      </motion.aside>
    </>
  );
};

const Layout = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      {/* Main Content */}
      <motion.main
        initial={false}
        animate={{ marginLeft: isCollapsed ? 80 : 280 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="min-h-screen hidden lg:block"
      >
        <div className="max-w-6xl mx-auto px-8 py-8">{children}</div>
      </motion.main>

      {/* Mobile Main Content */}
      <main className="lg:hidden min-h-screen">
        {/* Mobile Header */}
        <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 px-4 h-16 flex items-center justify-between">
          <button
            onClick={() => setIsMobileOpen(true)}
            className="w-10 h-10 rounded-xl hover:bg-slate-100 flex items-center justify-center text-slate-600"
          >
            <Menu className="w-5 h-5" />
          </button>
          <Link to="/" className="flex items-center gap-2">
            <img
              src={logoImage}
              alt="Taskflow Logo"
              className="w-8 h-8 object-contain"
            />
            <span className="font-bold text-slate-900">Taskflow</span>
          </Link>
          <div className="w-10" /> {/* Spacer */}
        </div>
        <div className="px-4 py-6">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
