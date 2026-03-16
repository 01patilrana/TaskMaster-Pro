import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, User, LogOut, Monitor } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../contexts/AuthContext';

const Navbar = ({ onMenuToggle }) => {
  const location = useLocation();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left side */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onMenuToggle}
              className="md:hidden p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle menu"
            >
              <Menu className="h-6 w-6" />
            </button>
            <Link
              to="/"
              className="flex items-center space-x-3 group"
            >
              <motion.div
                whileHover={{ rotate: 15 }}
                className="text-2xl"
              >
                📋
              </motion.div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent group-hover:from-primary-700 group-hover:to-purple-700 transition-all">
                TaskMaster Pro
              </span>
            </Link>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-3">
            <ThemeToggle />
            
            {/* Admin System Monitor Link */}
            {user?.role === 'admin' && (
              <Link
                to="/monitor"
                className="p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                title="System Monitor"
              >
                <Monitor className="h-5 w-5" />
              </Link>
            )}
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors group"
              onClick={handleLogout}
            >
              <div className="p-1.5 rounded-lg bg-primary-100 dark:bg-primary-900/30 group-hover:bg-primary-200 dark:group-hover:bg-primary-800/50 transition-colors">
                <User className="h-5 w-5 text-primary-600 dark:text-primary-400" />
              </div>
              <div className="hidden sm:block">
                <p className="text-xs text-gray-500 dark:text-gray-400">Signed in as</p>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-200 truncate max-w-[120px]">
                  {user?.email || 'User'}
                </p>
              </div>
              <LogOut className="h-4 w-4 text-gray-500 dark:text-gray-400 group-hover:text-red-500 transition-colors" />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
