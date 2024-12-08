import React, { useState, useEffect } from 'react';
import { reportsApi } from '../api/reportsApi';
import { ReportsState, TimeRange } from '../types';
import { SalesChart } from './SalesChart';
import { ReportStats } from './ReportStats';
import { DocumentArrowDownIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { Card } from '../../../components/common/Card';

const timeRangeOptions: { value: TimeRange; label: string }[] = [
  { value: '24h', label: 'Last 24 Hours' },
  { value: '7d', label: 'Last 7 Days' },
  { value: '30d', label: 'Last 30 Days' },
  { value: '90d', label: 'Last 90 Days' },
];

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

export const Reports: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('7d');
  const [reportsData, setReportsData] = useState<ReportsState>({
    sales: {
      totalSales: 0,
      averageOrderValue: 0,
      totalOrders: 0,
      salesGrowth: 0,
      timeSeriesData: [],
    },
    inventory: {
      totalProducts: 0,
      lowStockItems: 0,
      outOfStockItems: 0,
      topCategories: [],
    },
    customers: {
      newCustomers: 0,
      totalCustomers: 0,
      customerGrowth: 0,
      customerRetention: 0,
      customerSegments: [],
    },
    revenueByChannel: [],
    filters: { timeRange: '7d' },
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    fetchReports();
  }, [timeRange]);

  const fetchReports = async () => {
    try {
      const response = await reportsApi.getReports({ timeRange });
      setReportsData(response.data);
    } catch (error) {
      setReportsData((prev) => ({
        ...prev,
        error: 'Failed to fetch reports',
        isLoading: false,
      }));
    }
  };

  const handleExport = async (type: 'sales' | 'inventory' | 'customers', format: 'csv' | 'pdf') => {
    try {
      const blob = await reportsApi.exportReport(type, { timeRange }, format);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${type}-report.${format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Failed to export report:', error);
    }
  };

  if (reportsData.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500 dark:border-primary-400"></div>
      </div>
    );
  }

  if (reportsData.error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600 dark:text-red-400">Error: {reportsData.error}</div>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 px-4 sm:px-6 lg:px-8"
    >
      <motion.div variants={itemVariants} className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Reports & Analytics
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            View detailed reports and analytics about your business performance.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            onClick={() => handleExport('sales', 'csv')}
            type="button"
            className="inline-flex items-center rounded-lg bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 dark:bg-primary-500 dark:hover:bg-primary-400 transition-colors duration-200"
          >
            <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
            Export Report
          </button>
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="p-6">
          <div className="mb-4">
            <label htmlFor="timeRange" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Time Range
            </label>
            <select
              id="timeRange"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as TimeRange)}
              className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-400 dark:focus:ring-primary-400 sm:text-sm transition-colors duration-200"
            >
              {timeRangeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-8">
            <ReportStats sales={reportsData.sales} customers={reportsData.customers} />
          </div>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Sales Trend</h2>
          <SalesChart data={reportsData.sales.timeSeriesData} />
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Top Categories</h2>
          <div className="space-y-4">
            {reportsData.inventory.topCategories.map((category) => (
              <div key={category.name} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{category.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{category.productCount} products</p>
                </div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  ₹{category.value.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Revenue by Channel</h2>
          <div className="space-y-4">
            {reportsData.revenueByChannel.map((channel) => (
              <div key={channel.channel} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{channel.channel}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{channel.percentage}% of total revenue</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    ₹{channel.revenue.toLocaleString()}
                  </p>
                  <p
                    className={`text-sm ${
                      channel.growth > 0 ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {channel.growth > 0 ? '+' : ''}
                    {channel.growth.toFixed(1)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};
