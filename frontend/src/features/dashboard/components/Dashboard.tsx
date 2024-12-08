import { useState, useEffect } from 'react';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/20/solid';
import {
  CurrencyRupeeIcon,
  ShoppingBagIcon,
  UserGroupIcon,
  ChartBarIcon,
  DocumentArrowDownIcon,
  FunnelIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Card } from '../../../components/common/Card';
import { Stats } from '../../../components/common/Stats';
import { useTheme } from '../../../context/ThemeContext';
import { motion } from 'framer-motion';
import { TimeRange, ChartData } from '../types';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const chartVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

export const Dashboard = () => {
  const { theme } = useTheme();
  const [timeRange, setTimeRange] = useState<TimeRange>('7d');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const stats = [
    {
      title: 'Total Revenue',
      value: '₹2,45,000',
      icon: <CurrencyRupeeIcon />,
      change: 12,
      trend: 'up' as const,
    },
    {
      title: 'Total Orders',
      value: '356',
      icon: <ShoppingBagIcon />,
      change: 8,
      trend: 'up' as const,
    },
    {
      title: 'Total Customers',
      value: '1,245',
      icon: <UsersIcon />,
      change: -2,
      trend: 'down' as const,
    },
    {
      title: 'Average Order Value',
      value: '₹688',
      icon: <ChartBarIcon />,
      change: 5,
      trend: 'up' as const,
    },
  ];

  const chartData: ChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Revenue',
        data: [12000, 19000, 15000, 22000, 18000, 25000, 21000],
        borderWidth: 2,
        fill: true,
        backgroundColor: theme === 'dark' 
          ? 'rgba(59, 130, 246, 0.1)'
          : 'rgba(59, 130, 246, 0.1)',
        borderColor: theme === 'dark'
          ? 'rgb(96, 165, 250)'
          : 'rgb(59, 130, 246)',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: theme === 'dark' ? '#374151' : '#ffffff',
        titleColor: theme === 'dark' ? '#ffffff' : '#111827',
        bodyColor: theme === 'dark' ? '#ffffff' : '#111827',
        borderColor: theme === 'dark' ? '#4B5563' : '#E5E7EB',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        titleFont: {
          size: 14,
          weight: 'bold'
        },
        bodyFont: {
          size: 13
        },
        displayColors: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: theme === 'dark' ? '#9CA3AF' : '#6B7280',
          font: {
            size: 12
          }
        },
      },
      y: {
        grid: {
          color: theme === 'dark' ? '#374151' : '#F3F4F6',
          drawBorder: false,
        },
        ticks: {
          color: theme === 'dark' ? '#9CA3AF' : '#6B7280',
          font: {
            size: 12
          },
          padding: 8,
        },
        border: {
          dash: [4, 4]
        }
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
    animation: {
      duration: 1000,
    },
  };

  if (!mounted) {
    return null;
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div 
        variants={itemVariants}
        className="flex items-center justify-between"
      >
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Dashboard Overview
        </h1>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value as TimeRange)}
          className="rounded-xl border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm focus:border-primary-500 focus:ring-primary-500 transition-all duration-200 hover:border-primary-400 dark:hover:border-primary-500"
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
        </select>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            variants={itemVariants}
            custom={index}
          >
            <Stats {...stat} />
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <motion.div variants={chartVariants}>
          <Card className="p-6 hover:shadow-lg transition-shadow duration-200">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Revenue Overview</h2>
            <Line data={chartData} options={chartOptions} />
          </Card>
        </motion.div>

        <motion.div variants={chartVariants}>
          <Card className="p-6 hover:shadow-lg transition-shadow duration-200">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Orders Overview</h2>
            <Bar 
              data={{
                ...chartData,
                datasets: [{
                  ...chartData.datasets[0],
                  label: 'Orders',
                  data: [45, 62, 58, 71, 63, 82, 76],
                }],
              }} 
              options={chartOptions} 
            />
          </Card>
        </motion.div>
      </div>

      {/* Recent Orders */}
      <motion.div variants={itemVariants}>
        <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
          <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Recent Orders</h2>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {[1, 2, 3, 4, 5].map((order, index) => (
              <motion.div
                key={order}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200"
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <ShoppingBagIcon className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Order #{order}23456</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">2 items • ₹1,234</p>
                  </div>
                </div>
                <span className="inline-flex items-center rounded-full bg-green-100 dark:bg-green-900/30 px-3 py-1 text-xs font-medium text-green-800 dark:text-green-300 ring-1 ring-green-600/20 dark:ring-green-500/20">
                  Completed
                </span>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};
