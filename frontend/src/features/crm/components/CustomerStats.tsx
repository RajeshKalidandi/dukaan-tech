import React from 'react';
import { CustomerStats as CustomerStatsType } from '../types';
import { UsersIcon, CurrencyRupeeIcon, ChartBarIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { Card } from '../../../components/common/Card';

interface Props {
  stats: CustomerStatsType;
}

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

export const CustomerStats: React.FC<Props> = ({ stats }) => {
  const statItems = [
    {
      name: 'Total Customers',
      value: stats.totalCustomers.toLocaleString(),
      icon: UsersIcon,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
      ringColor: 'ring-blue-600/20 dark:ring-blue-500/20',
    },
    {
      name: 'Active Customers',
      value: stats.activeCustomers.toLocaleString(),
      icon: ChartBarIcon,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
      ringColor: 'ring-green-600/20 dark:ring-green-500/20',
    },
    {
      name: 'Average Order Value',
      value: `₹${stats.averageOrderValue.toLocaleString()}`,
      icon: CurrencyRupeeIcon,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30',
      ringColor: 'ring-purple-600/20 dark:ring-purple-500/20',
    },
    {
      name: 'Retention Rate',
      value: `${stats.customerRetentionRate.toFixed(1)}%`,
      icon: ArrowTrendingUpIcon,
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-100 dark:bg-orange-900/30',
      ringColor: 'ring-orange-600/20 dark:ring-orange-500/20',
    },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
    >
      {statItems.map((item) => (
        <motion.div
          key={item.name}
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          className="group"
        >
          <Card className="relative overflow-hidden px-4 pb-12 pt-5 sm:px-6 sm:pt-6 hover:shadow-lg transition-all duration-300">
            <dt>
              <div className={`absolute rounded-xl ${item.bgColor} p-3 ring-1 ${item.ringColor} transition-colors duration-200`}>
                <item.icon className={`h-6 w-6 ${item.color} transition-colors duration-200`} aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-600 dark:text-gray-400 transition-colors duration-200">
                {item.name}
              </p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900 dark:text-white transition-colors duration-200">
                {item.value}
              </p>
            </dd>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};
