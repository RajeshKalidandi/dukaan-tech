import axios from 'axios';
import { ApiResponse } from '../../dashboard/types';
import { ReportsState, ReportFilters } from '../types';
import {
  generateMockSalesReport,
  generateMockInventoryReport,
  generateMockCustomerReport,
  generateMockRevenueByChannel,
} from './mockData';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
const USE_MOCK_DATA = true;

export const reportsApi = {
  async getReports(filters: ReportFilters): Promise<ApiResponse<ReportsState>> {
    if (USE_MOCK_DATA) {
      return {
        success: true,
        data: {
          sales: generateMockSalesReport(filters.timeRange),
          inventory: generateMockInventoryReport(),
          customers: generateMockCustomerReport(),
          revenueByChannel: generateMockRevenueByChannel(),
          filters,
          isLoading: false,
          error: null,
        },
      };
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/reports`, { params: filters });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch reports');
    }
  },

  async exportReport(
    type: 'sales' | 'inventory' | 'customers',
    filters: ReportFilters,
    format: 'csv' | 'pdf'
  ): Promise<Blob> {
    if (USE_MOCK_DATA) {
      let data;
      switch (type) {
        case 'sales':
          data = generateMockSalesReport(filters.timeRange);
          break;
        case 'inventory':
          data = generateMockInventoryReport();
          break;
        case 'customers':
          data = generateMockCustomerReport();
          break;
      }

      const csvContent = 'data:text/csv;charset=utf-8,' + JSON.stringify(data, null, 2);
      return new Blob([csvContent], { type: format === 'csv' ? 'text/csv' : 'application/pdf' });
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/reports/${type}/export`, {
        params: { ...filters, format },
        responseType: 'blob',
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to export report');
    }
  },
};
