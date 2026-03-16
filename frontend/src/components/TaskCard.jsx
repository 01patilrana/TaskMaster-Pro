import { motion } from 'framer-motion';
import { Edit, Trash2, Calendar } from 'lucide-react';
import { PRIORITY_COLORS, STATUS_COLORS } from '../utils/constants';

const TaskCard = ({ task, onEdit, onDelete }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
    >
      {/* Priority badge with subtle glow */}
      <div className="flex justify-between items-start mb-4">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className={`px-3 py-1.5 rounded-full text-sm font-semibold shadow-sm ${
            PRIORITY_COLORS[task.priority] || PRIORITY_COLORS.medium
          }`}
        >
          {task.priority?.toUpperCase()}
        </motion.div>
        
        {/* Action buttons */}
        <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onEdit(task)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            aria-label="Edit task"
          >
            <Edit className="h-4 w-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onDelete(task._id)}
            className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-gray-500 hover:text-red-600 dark:hover:text-red-400 transition-colors"
            aria-label="Delete task"
          >
            <Trash2 className="h-4 w-4" />
          </motion.button>
        </div>
      </div>

      {/* Title */}
      <motion.h3
        className="font-bold text-lg text-gray-900 dark:text-white mb-3 leading-tight group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors"
        whileHover={{ x: 2 }}
      >
        {task.title}
      </motion.h3>

      {/* Description */}
      {task.description && (
        <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed line-clamp-2">
          {task.description}
        </p>
      )}

      {/* Footer with status and due date */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
        <motion.span
          whileHover={{ scale: 1.05 }}
          className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
            STATUS_COLORS[task.status] || STATUS_COLORS.pending
          }`}
        >
          {task.status.replace('-', ' ')}
        </motion.span>
        
        {task.dueDate && (
          <div className="flex items-center space-x-1.5 text-gray-500 dark:text-gray-400">
            <Calendar className="h-4 w-4" />
            <span className="text-xs font-medium">
              {new Date(task.dueDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
              })}
            </span>
          </div>
        )}
      </div>

      {/* Subtle hover highlight effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-50/0 via-primary-50/10 to-primary-50/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"></div>
    </motion.div>
  );
};

export default TaskCard;
