import React, { useState, useEffect } from 'react';
import { CustomerStats } from './CustomerStats';
import { CustomerList } from './CustomerList';
import { crmApi } from '../api/crmApi';
import { CRMState } from '../types';
import { motion } from 'framer-motion';
import { Card } from '../../../components/common/Card';

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

export const Customers: React.FC = () => {
  const [crmData, setCrmData] = useState<CRMState>({
    customers: [],
    stats: {
      totalCustomers: 0,
      activeCustomers: 0,
      averageOrderValue: 0,
      customerRetentionRate: 0,
    },
    filters: {},
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    fetchCRMData();
  }, []);

  const fetchCRMData = async () => {
    try {
      const response = await crmApi.getCustomers();
      setCrmData(response.data);
    } catch (error) {
      setCrmData((prev) => ({
        ...prev,
        error: 'Failed to fetch CRM data',
        isLoading: false,
      }));
    }
  };

  if (crmData.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500 dark:border-primary-400"></div>
      </div>
    );
  }

  if (crmData.error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600 dark:text-red-400">Error: {crmData.error}</div>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 px-4 py-8 sm:px-6 lg:px-8"
    >
      <motion.div variants={itemVariants}>
        <div className="sm:flex sm:items-center mb-8">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Customer Management
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Manage your customers, view their history, and track their engagement.
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="p-6">
          <CustomerStats stats={crmData.stats} />
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="overflow-hidden">
          <CustomerList />
        </Card>
      </motion.div>
    </motion.div>
  );
};
