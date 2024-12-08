import { SalesReport, InventoryReport, CustomerReport, RevenueByChannel, TimeRange } from '../types';
import { subDays, format } from 'date-fns';

export const generateTimeSeriesData = (timeRange: TimeRange) => {
  const days = timeRange === '24h' ? 1 : timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
  const data = [];
  const now = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = subDays(now, i);
    data.push({
      date: format(date, 'yyyy-MM-dd'),
      sales: Math.floor(Math.random() * 50000) + 10000,
      orders: Math.floor(Math.random() * 100) + 20,
    });
  }

  return data;
};

export const generateMockSalesReport = (timeRange: TimeRange): SalesReport => {
  const timeSeriesData = generateTimeSeriesData(timeRange);
  const totalSales = timeSeriesData.reduce((sum, day) => sum + day.sales, 0);
  const totalOrders = timeSeriesData.reduce((sum, day) => sum + day.orders, 0);

  return {
    totalSales,
    averageOrderValue: totalSales / totalOrders,
    totalOrders,
    salesGrowth: Math.random() * 30 - 10,
    timeSeriesData,
  };
};

export const generateMockInventoryReport = (): InventoryReport => {
  const categories = [
    'Electronics',
    'Clothing',
    'Food & Beverages',
    'Home & Kitchen',
    'Beauty & Personal Care',
  ];

  return {
    totalProducts: Math.floor(Math.random() * 1000) + 500,
    lowStockItems: Math.floor(Math.random() * 50) + 10,
    outOfStockItems: Math.floor(Math.random() * 20) + 5,
    topCategories: categories.map((name) => ({
      name,
      productCount: Math.floor(Math.random() * 200) + 50,
      value: Math.floor(Math.random() * 500000) + 100000,
    })),
  };
};

export const generateMockCustomerReport = (): CustomerReport => {
  const segments = [
    { name: 'New', percentage: 20 },
    { name: 'Regular', percentage: 45 },
    { name: 'VIP', percentage: 25 },
    { name: 'Inactive', percentage: 10 },
  ];

  const totalCustomers = Math.floor(Math.random() * 5000) + 1000;

  return {
    newCustomers: Math.floor(Math.random() * 200) + 50,
    totalCustomers,
    customerGrowth: Math.random() * 20 - 5,
    customerRetention: Math.random() * 30 + 60,
    customerSegments: segments.map((segment) => ({
      name: segment.name,
      percentage: segment.percentage,
      count: Math.floor((totalCustomers * segment.percentage) / 100),
    })),
  };
};

export const generateMockRevenueByChannel = (): RevenueByChannel[] => {
  const channels = [
    { name: 'Online Store', percentage: 45 },
    { name: 'Physical Store', percentage: 30 },
    { name: 'Marketplace', percentage: 15 },
    { name: 'Social Media', percentage: 10 },
  ];

  const totalRevenue = Math.floor(Math.random() * 1000000) + 500000;

  return channels.map((channel) => ({
    channel: channel.name,
    revenue: Math.floor((totalRevenue * channel.percentage) / 100),
    percentage: channel.percentage,
    growth: Math.random() * 40 - 10,
  }));
};
