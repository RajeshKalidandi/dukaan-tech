import React from 'react';
import { BillingStats as BillingStatsType } from '../types';
import { CurrencyRupeeIcon, DocumentIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';

interface Props {
  stats: BillingStatsType;
}

export const BillingStats: React.FC<Props> = ({ stats }) => {
  const statItems = [
    {
      name: 'Total Revenue',
      value: `₹${stats.totalRevenue.toLocaleString()}`,
      icon: CurrencyRupeeIcon,
      lightColor: 'text-green-600',
      darkColor: 'dark:text-green-400',
      lightBgColor: 'bg-green-100',
      darkBgColor: 'dark:bg-green-900/30',
      metric: `${stats.paidInvoices} paid invoices`
    },
    {
      name: 'Pending Amount',
      value: `₹${stats.pendingAmount.toLocaleString()}`,
      icon: DocumentIcon,
      lightColor: 'text-yellow-600',
      darkColor: 'dark:text-yellow-400',
      lightBgColor: 'bg-yellow-100',
      darkBgColor: 'dark:bg-yellow-900/30',
      metric: `${stats.pendingInvoices} pending invoices`
    },
    {
      name: 'Overdue Amount',
      value: `₹${stats.overdueAmount.toLocaleString()}`,
      icon: ExclamationCircleIcon,
      lightColor: 'text-red-600',
      darkColor: 'dark:text-red-400',
      lightBgColor: 'bg-red-100',
      darkBgColor: 'dark:bg-red-900/30',
      metric: `${stats.overdueInvoices} overdue invoices`
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
      {statItems.map((item) => (
        <div
          key={item.name}
          className="relative overflow-hidden rounded-lg bg-white dark:bg-gray-800 px-4 pb-12 pt-5 shadow-sm ring-1 ring-gray-900/5 dark:ring-gray-700 transition-all duration-200 hover:shadow-md sm:px-6 sm:pt-6"
        >
          <dt>
            <div className={`absolute rounded-md ${item.lightBgColor} ${item.darkBgColor} p-3`}>
              <item.icon className={`h-6 w-6 ${item.lightColor} ${item.darkColor}`} aria-hidden="true" />
            </div>
            <p className="ml-16 truncate text-sm font-medium text-gray-500 dark:text-gray-400">{item.name}</p>
          </dt>
          <dd className="ml-16 flex flex-col gap-1">
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">{item.value}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{item.metric}</p>
          </dd>
        </div>
      ))}
    </div>
  );
};
