import { DashboardState, OrderStatus, TimeRange } from '../types';

export const generateMockData = (timeRange: TimeRange): DashboardState => {
  const now = new Date();
  const labels = Array.from({ length: timeRange === '24h' ? 24 : timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90 }, (_, i) => {
    const date = new Date(now);
    if (timeRange === '24h') {
      date.setHours(now.getHours() - i);
      return date.toLocaleTimeString('en-US', { hour: 'numeric' });
    } else {
      date.setDate(now.getDate() - i);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  }).reverse();

  return {
    stats: [
      {
        id: 1,
        name: 'Total Revenue',
        stat: '₹74,897',
        icon: () => null,
        change: '4.75%',
        changeType: 'increase',
      },
      {
        id: 2,
        name: 'Total Orders',
        stat: '245',
        icon: () => null,
        change: '54.02%',
        changeType: 'increase',
      },
      {
        id: 3,
        name: 'Pending Orders',
        stat: '12',
        icon: () => null,
        change: '-19.00%',
        changeType: 'decrease',
      },
      {
        id: 4,
        name: 'Low Stock Items',
        stat: '23',
        icon: () => null,
        change: '10.05%',
        changeType: 'decrease',
      },
    ],
    salesData: {
      labels,
      datasets: [
        {
          label: 'Sales',
          data: Array.from({ length: labels.length }, () => Math.floor(Math.random() * 10000) + 5000),
          borderWidth: 2,
        },
      ],
    },
    categoryData: {
      labels: ['Electronics', 'Clothing', 'Food', 'Books', 'Others'],
      datasets: [
        {
          label: 'Sales by Category',
          data: [12000, 8000, 6000, 4000, 2000],
          borderWidth: 1,
        },
      ],
    },
    recentOrders: Array.from({ length: 5 }, (_, i): OrderStatus => ({
      id: i + 1,
      customer: `Customer ${i + 1}`,
      amount: `₹${(Math.random() * 1000 + 500).toFixed(2)}`,
      status: ['Completed', 'Processing', 'Pending'][Math.floor(Math.random() * 3)] as OrderStatus['status'],
      date: new Date(now.getTime() - Math.random() * 86400000 * 7).toLocaleDateString(),
    })),
    isLoading: false,
    error: null,
  };
};

export const generateMockRealtimeMetrics = () => ({
  activeUsers: Math.floor(Math.random() * 100) + 50,
  salesToday: Math.floor(Math.random() * 50000) + 10000,
  pendingOrders: Math.floor(Math.random() * 20) + 5,
});
