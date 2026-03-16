import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Server, Cpu, HardDrive, Activity, Users, Clock } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const SystemMonitor = () => {
  const [metrics, setMetrics] = useState({
    cpu: 45,
    memory: 68,
    disk: 32,
    network: 120,
    activeUsers: 24,
    tasksProcessed: 1247,
    uptime: '99.98%',
    responseTime: 42
  });

  const [cpuData, setCpuData] = useState([]);
  const [taskStats, setTaskStats] = useState([
    { name: 'Pending', value: 24, color: '#3b82f6' },
    { name: 'Processing', value: 12, color: '#f59e0b' },
    { name: 'Completed', value: 89, color: '#10b981' },
    { name: 'Failed', value: 3, color: '#ef4444' }
  ]);

  useEffect(() => {
    // Simulate real-time metrics updates
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        cpu: Math.floor(Math.random() * 30) + 30,
        memory: Math.floor(Math.random() * 40) + 50,
        network: Math.floor(Math.random() * 200) + 50,
        activeUsers: Math.floor(Math.random() * 10) + 20,
        responseTime: Math.floor(Math.random() * 30) + 25
      }));

      // Update CPU data for chart
      setCpuData(prev => {
        const newData = [...prev, { 
          time: new Date().toLocaleTimeString(), 
          usage: Math.floor(Math.random() * 30) + 30 
        }];
        return newData.slice(-20); // Keep last 20 data points
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const MetricCard = ({ title, value, icon: Icon, color, unit = '' }) => (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
            {value}{unit}
          </p>
        </div>
        <div className={`p-3 rounded-lg bg-${color}-100 dark:bg-${color}-900/30`}>
          <Icon className={`h-6 w-6 text-${color}-600 dark:text-${color}-400`} />
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">System Monitor</h1>
        <p className="text-gray-500 dark:text-gray-400">Real-time infrastructure metrics and performance monitoring</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard title="CPU Usage" value={metrics.cpu} icon={Cpu} color="blue" unit="%" />
        <MetricCard title="Memory" value={metrics.memory} icon={HardDrive} color="purple" unit="%" />
        <MetricCard title="Active Users" value={metrics.activeUsers} icon={Users} color="green" />
        <MetricCard title="Response Time" value={metrics.responseTime} icon={Clock} color="yellow" unit="ms" />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* CPU Usage Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">CPU Usage Over Time</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={cpuData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="time" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    borderColor: '#374151',
                    borderRadius: '8px'
                  }}
                  itemStyle={{ color: '#f9fafb' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="usage" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Task Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Task Distribution</h3>
          <div className="h-80 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={taskStats}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {taskStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    borderColor: '#374151',
                    borderRadius: '8px'
                  }}
                  itemStyle={{ color: '#f9fafb' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-4 flex-wrap">
            {taskStats.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-sm text-gray-600 dark:text-gray-300">{item.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* System Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">System Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Server Status</p>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="font-medium text-gray-900 dark:text-white">Operational</span>
            </div>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Uptime</p>
            <p className="font-medium text-gray-900 dark:text-white mt-1">{metrics.uptime}</p>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Tasks Processed</p>
            <p className="font-medium text-gray-900 dark:text-white mt-1">{metrics.tasksProcessed.toLocaleString()}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SystemMonitor;
