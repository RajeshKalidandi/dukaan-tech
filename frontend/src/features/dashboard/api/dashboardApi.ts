import axios from 'axios';
import { ApiResponse, DashboardState, TimeRange, FilterChangeEvent } from '../types';
import { generateMockData, generateMockRealtimeMetrics } from './mockData';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
const USE_MOCK_DATA = true; // Toggle this to switch between mock and real API

export const dashboardApi = {
  async getDashboardData(timeRange: TimeRange, filters?: FilterChangeEvent): Promise<ApiResponse<DashboardState>> {
    if (USE_MOCK_DATA) {
      return {
        success: true,
        data: generateMockData(timeRange),
      };
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/dashboard`, {
        params: {
          timeRange,
          ...filters,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch dashboard data');
    }
  },

  async getRealtimeMetrics(): Promise<ApiResponse<{
    activeUsers: number;
    salesToday: number;
    pendingOrders: number;
  }>> {
    if (USE_MOCK_DATA) {
      return {
        success: true,
        data: generateMockRealtimeMetrics(),
      };
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/dashboard/realtime`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch realtime metrics');
    }
  },

  async exportDashboardData(timeRange: TimeRange, format: 'csv' | 'pdf'): Promise<Blob> {
    if (USE_MOCK_DATA) {
      const mockData = generateMockData(timeRange);
      const csvContent = 'data:text/csv;charset=utf-8,' + 
        'Date,Revenue\n' +
        mockData.salesData.labels.map((label, i) => 
          `${label},${mockData.salesData.datasets[0].data[i]}`
        ).join('\n');
      const blob = new Blob([csvContent], { type: format === 'csv' ? 'text/csv' : 'application/pdf' });
      return blob;
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/dashboard/export`, {
        params: { timeRange, format },
        responseType: 'blob',
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to export dashboard data');
    }
  },

  async getTopProducts(timeRange: TimeRange): Promise<ApiResponse<{
    id: string;
    name: string;
    sales: number;
    revenue: number;
    growth: number;
    quantity: number;
    image?: string;
  }[]>> {
    if (USE_MOCK_DATA) {
      return {
        success: true,
        data: Array.from({ length: 5 }, (_, i) => ({
          id: `product-${i + 1}`,
          name: `Product ${i + 1}`,
          sales: Math.floor(Math.random() * 1000) + 100,
          revenue: Math.floor(Math.random() * 100000) + 10000,
          growth: Math.random() * 40 - 20,
          quantity: Math.floor(Math.random() * 500) + 50,
        })),
      };
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/dashboard/top-products`, {
        params: { timeRange },
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch top products');
    }
  },
};
