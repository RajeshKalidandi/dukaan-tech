import axios from 'axios';
import { ApiResponse } from '../../dashboard/types';
import { CRMState, CustomerFilters, Customer, CustomerActivity } from '../types';
import { generateMockCustomerActivities, generateMockCustomers, generateMockCustomerStats } from './mockData';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
const USE_MOCK_DATA = true;

export const crmApi = {
  async getCustomers(filters?: CustomerFilters): Promise<ApiResponse<CRMState>> {
    if (USE_MOCK_DATA) {
      const customers = generateMockCustomers();
      return {
        success: true,
        data: {
          customers,
          stats: generateMockCustomerStats(customers),
          filters: filters || {},
          isLoading: false,
          error: null,
        },
      };
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/customers`, { params: filters });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch customers');
    }
  },

  async getCustomerDetails(customerId: string): Promise<ApiResponse<Customer>> {
    if (USE_MOCK_DATA) {
      const customer = generateMockCustomers(1)[0];
      customer.id = customerId;
      return {
        success: true,
        data: customer,
      };
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/customers/${customerId}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch customer details');
    }
  },

  async getCustomerActivities(customerId: string): Promise<ApiResponse<CustomerActivity[]>> {
    if (USE_MOCK_DATA) {
      return {
        success: true,
        data: generateMockCustomerActivities(customerId),
      };
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/customers/${customerId}/activities`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch customer activities');
    }
  },

  async updateCustomer(customerId: string, data: Partial<Customer>): Promise<ApiResponse<Customer>> {
    if (USE_MOCK_DATA) {
      const customer = generateMockCustomers(1)[0];
      return {
        success: true,
        data: { ...customer, ...data, id: customerId },
      };
    }

    try {
      const response = await axios.patch(`${API_BASE_URL}/customers/${customerId}`, data);
      return response.data;
    } catch (error) {
      throw new Error('Failed to update customer');
    }
  },
};
