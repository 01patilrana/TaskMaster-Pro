import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Filter } from 'lucide-react';
import TaskCard from './TaskCard.jsx';
import TaskForm from './TaskForm.jsx';

const DEFAULT_TASKS = [
  {
    _id: '1',
    title: 'Complete TaskMaster Pro',
    description: 'Build full-stack MERN task app with auth, CRUD, and dark mode',
    priority: 'high',
    status: 'in-progress',
    dueDate: '2026-04-15',
  },
  {
    _id: '2',
    title: 'Design UI components',
    description: 'Create reusable card, form, and navbar components with Tailwind',
    priority: 'medium',
    status: 'pending',
    dueDate: '2026-03-30',
  },
  {
    _id: '3',
    title: 'Deploy to Vercel/Render',
    description: 'Set up CI/CD pipeline and deploy frontend + backend',
    priority: 'low',
    status: 'completed',
    dueDate: '2026-03-10',
  },
  {
    _id: '4',
    title: 'Write API documentation',
    description: 'Document all REST endpoints with request/response examples',
    priority: 'medium',
    status: 'pending',
  },
  {
    _id: '5',
    title: 'Add unit tests',
    description: 'Write tests for auth routes and task CRUD operations',
    priority: 'high',
    status: 'pending',
    dueDate: '2026-04-01',
  },
];

function loadTasks() {
  const stored = localStorage.getItem('demoTasks');
  if (stored) {
    return JSON.parse(stored);
  }
  localStorage.setItem('demoTasks', JSON.stringify(DEFAULT_TASKS));
  return DEFAULT_TASKS;
}

function saveTasks(tasks) {
  localStorage.setItem('demoTasks', JSON.stringify(tasks));
}

const Dashboard = () => {
  const [tasks, setTasks] = useState(loadTasks);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const stats = {
    pending: tasks.filter(t => t.status === 'pending').length,
    'in-progress': tasks.filter(t => t.status === 'in-progress').length,
    completed: tasks.filter(t => t.status === 'completed').length,
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase()) ||
      (task.description || '').toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filterStatus === 'all' || task.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleCreate = (data) => {
    const newTask = { ...data, _id: String(Date.now()) };
    setTasks([newTask, ...tasks]);
  };

  const handleUpdate = (data) => {
    setTasks(tasks.map(t => t._id === editingTask._id ? { ...t, ...data } : t));
  };

  const handleSave = (data) => {
    if (editingTask) {
      handleUpdate(data);
    } else {
      handleCreate(data);
    }
    setShowForm(false);
    setEditingTask(null);
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter(t => t._id !== id));
  };

  const openNewTask = () => {
    setEditingTask(null);
    setShowForm(true);
  };

  // Stat card variants for animation
  const statVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto relative">
      {/* Background overlay for better readability */}
      <div className="absolute inset-0 bg-white/5 dark:bg-gray-900/5 -z-10"></div>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"
      >
        <div>
          <motion.h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
            whileHover={{ scale: 1.02 }}
          >
            Dashboard
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 dark:text-gray-400 mt-2"
          >
            Manage your tasks efficiently
          </motion.p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={openNewTask}
          className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>New Task</span>
        </motion.button>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8"
        initial="hidden"
        animate="visible"
      >
        {[
          { key: 'pending', label: 'Pending', count: stats.pending, color: 'blue', icon: '⏳' },
          { key: 'in-progress', label: 'In Progress', count: stats['in-progress'], color: 'yellow', icon: '🔄' },
          { key: 'completed', label: 'Completed', count: stats.completed, color: 'green', icon: '✅' }
        ].map((stat, i) => (
          <motion.button
            key={stat.key}
            custom={i}
            variants={statVariants}
            onClick={() => setFilterStatus(filterStatus === stat.key ? 'all' : stat.key)}
            className={`relative bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-left transition-all border-2 hover:shadow-xl ${
              filterStatus === stat.key
                ? `border-${stat.color}-500 ring-2 ring-${stat.color}-500/20`
                : 'border-transparent hover:border-gray-200 dark:hover:border-gray-700'
            }`}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  {stat.label}
                </h3>
                <p className={`text-3xl font-bold text-${stat.color}-600`}>{stat.count}</p>
              </div>
              <span className="text-2xl">{stat.icon}</span>
            </div>
            
            {/* Animated underline */}
            {filterStatus === stat.key && (
              <motion.div
                layoutId="activeStat"
                className={`absolute bottom-0 left-0 right-0 h-1 bg-${stat.color}-500 rounded-full`}
                initial={false}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </motion.div>

      {/* Search and Filter Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-8 flex flex-col sm:flex-row gap-4"
      >
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 focus:outline-none shadow-sm transition-all"
          />
        </div>
        
        {filterStatus !== 'all' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-lg"
          >
            <Filter className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm text-blue-700 dark:text-blue-300">
              Filtered by: <span className="font-semibold capitalize">{filterStatus.replace('-', ' ')}</span>
            </span>
            <button
              onClick={() => setFilterStatus('all')}
              className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium ml-2"
            >
              Clear
            </button>
          </motion.div>
        )}
      </motion.div>

      {/* Task Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {filteredTasks.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">📋</div>
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              {search || filterStatus !== 'all'
                ? 'No tasks match your search/filter.'
                : 'No tasks yet. Create your first task!'}
            </p>
            {!search && filterStatus === 'all' && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={openNewTask}
                className="mt-4 bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Create Task
              </motion.button>
            )}
          </motion.div>
        ) : (
          <AnimatePresence>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              layout
            >
              {filteredTasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </motion.div>

      {/* Task Form Modal */}
      <TaskForm
        isOpen={showForm}
        onClose={() => { setShowForm(false); setEditingTask(null); }}
        task={editingTask}
        onSave={handleSave}
      />
    </div>
  );
};

export default Dashboard;
