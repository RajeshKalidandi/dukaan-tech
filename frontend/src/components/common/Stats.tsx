import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/20/solid';
import { Card } from './Card';
import clsx from 'clsx';

interface StatsProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  change?: number;
  trend?: 'up' | 'down';
}

const numberVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const trendVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      delay: 0.2,
      ease: "easeOut"
    }
  }
};

const iconVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      delay: 0.1,
      ease: "easeOut"
    }
  }
};

export const Stats: React.FC<StatsProps> = ({ title, value, icon, change, trend }) => {
  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-300 group">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm font-medium text-gray-600 dark:text-gray-400"
          >
            {title}
          </motion.p>
          <motion.p 
            variants={numberVariants}
            initial="initial"
            animate="animate"
            className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white tracking-tight"
          >
            {value}
          </motion.p>
          {change !== undefined && trend && (
            <motion.div 
              variants={trendVariants}
              initial="initial"
              animate="animate"
              className="mt-2 flex items-center text-sm"
            >
              {trend === 'up' ? (
                <motion.div
                  whileHover={{ y: -2 }}
                  className="flex items-center text-green-500 dark:text-green-400"
                >
                  <ArrowUpIcon className="h-4 w-4" />
                  <span className="ml-1 font-medium">
                    {Math.abs(change)}%
                  </span>
                </motion.div>
              ) : (
                <motion.div
                  whileHover={{ y: 2 }}
                  className="flex items-center text-red-500 dark:text-red-400"
                >
                  <ArrowDownIcon className="h-4 w-4" />
                  <span className="ml-1 font-medium">
                    {Math.abs(change)}%
                  </span>
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
        <motion.div 
          variants={iconVariants}
          initial="initial"
          animate="animate"
          whileHover={{ scale: 1.1 }}
          className={clsx(
            "rounded-xl p-3 transition-all duration-300 group-hover:shadow-md",
            trend === 'up' 
              ? "bg-green-50 dark:bg-green-900/20 ring-1 ring-green-500/20" 
              : trend === 'down'
              ? "bg-red-50 dark:bg-red-900/20 ring-1 ring-red-500/20"
              : "bg-primary-50 dark:bg-primary-900/20 ring-1 ring-primary-500/20"
          )}
        >
          <div className={clsx(
            "h-6 w-6 transition-colors duration-300",
            trend === 'up'
              ? "text-green-600 dark:text-green-400"
              : trend === 'down'
              ? "text-red-600 dark:text-red-400"
              : "text-primary-600 dark:text-primary-400"
          )}>
            {icon}
          </div>
        </motion.div>
      </div>
    </Card>
  );
};
