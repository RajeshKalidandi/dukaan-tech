import React from 'react';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/20/solid';
import { SalesReport, CustomerReport } from '../types';

interface Props {
  sales: SalesReport;
  customers: CustomerReport;
}

export const ReportStats: React.FC<Props> = ({ sales, customers }) => {
  const stats = [
    {
      name: 'Total Sales',
      value: new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
      }).format(sales.totalSales),
      change: sales.salesGrowth,
    },
    {
      name: 'Average Order Value',
      value: new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
      }).format(sales.averageOrderValue),
      change: 0,
    },
    {
      name: 'Total Orders',
      value: sales.totalOrders.toLocaleString(),
      change: 0,
    },
    {
      name: 'Customer Retention',
      value: `${customers.customerRetention.toFixed(1)}%`,
      change: customers.customerGrowth,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.name}
          className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6"
        >
          <dt>
            <p className="truncate text-sm font-medium text-gray-500">{stat.name}</p>
          </dt>
          <dd className="flex items-baseline pb-6 sm:pb-7">
            <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
            {stat.change !== 0 && (
              <p
                className={`ml-2 flex items-baseline text-sm font-semibold ${
                  stat.change > 0 ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {stat.change > 0 ? (
                  <ArrowUpIcon className="h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" />
                ) : (
                  <ArrowDownIcon className="h-5 w-5 flex-shrink-0 text-red-500" aria-hidden="true" />
                )}
                {Math.abs(stat.change).toFixed(1)}%
              </p>
            )}
          </dd>
        </div>
      ))}
    </div>
  );
};
