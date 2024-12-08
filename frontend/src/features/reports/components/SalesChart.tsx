import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { format, parseISO } from 'date-fns';
import { SalesReport } from '../types';
import { useTheme } from '../../../context/ThemeContext';

interface Props {
  data: SalesReport['timeSeriesData'];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  const { theme } = useTheme();
  if (active && payload && payload.length) {
    return (
      <div className={`
        p-4 rounded-lg shadow-lg border
        ${theme === 'dark' 
          ? 'bg-gray-800 border-gray-700 text-white' 
          : 'bg-white border-gray-200 text-gray-900'
        }
      `}>
        <p className="text-sm font-medium mb-2">
          {format(parseISO(label), 'MMM d, yyyy')}
        </p>
        {payload.map((entry: any, index: number) => (
          <p
            key={index}
            className={`text-sm ${
              entry.dataKey === 'sales' 
                ? 'text-indigo-500 dark:text-indigo-400' 
                : 'text-emerald-500 dark:text-emerald-400'
            }`}
          >
            {entry.dataKey === 'sales'
              ? new Intl.NumberFormat('en-IN', {
                  style: 'currency',
                  currency: 'INR',
                  maximumFractionDigits: 0,
                }).format(entry.value)
              : `${entry.value} Orders`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const SalesChart: React.FC<Props> = ({ data }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const chartColors = {
    text: isDark ? '#9CA3AF' : '#4B5563',
    grid: isDark ? '#374151' : '#E5E7EB',
    sales: {
      stroke: isDark ? '#818CF8' : '#6366F1',
      fill: isDark ? 'rgba(99, 102, 241, 0.1)' : 'rgba(99, 102, 241, 0.1)',
    },
    orders: {
      stroke: isDark ? '#34D399' : '#10B981',
      fill: isDark ? 'rgba(16, 185, 129, 0.1)' : 'rgba(16, 185, 129, 0.1)',
    },
  };

  return (
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={chartColors.grid}
            vertical={false}
          />
          <XAxis
            dataKey="date"
            tickFormatter={(date) => format(parseISO(date), 'MMM d')}
            stroke={chartColors.text}
            tick={{ fill: chartColors.text }}
          />
          <YAxis
            yAxisId="left"
            stroke={chartColors.text}
            tick={{ fill: chartColors.text }}
            tickFormatter={(value) =>
              new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'INR',
                notation: 'compact',
                maximumFractionDigits: 1,
              }).format(value)
            }
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke={chartColors.text}
            tick={{ fill: chartColors.text }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{
              paddingTop: '1rem',
              color: chartColors.text,
            }}
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="sales"
            name="Sales (₹)"
            stroke={chartColors.sales.stroke}
            fill={chartColors.sales.fill}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6, fill: chartColors.sales.stroke }}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="orders"
            name="Orders"
            stroke={chartColors.orders.stroke}
            fill={chartColors.orders.fill}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6, fill: chartColors.orders.stroke }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
