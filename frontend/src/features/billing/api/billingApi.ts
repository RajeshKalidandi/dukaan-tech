import axios from 'axios';
import { ApiResponse } from '../../dashboard/types';
import { BillingState, BillingFilters, Invoice, Transaction } from '../types';
import { generateMockBillingStats, generateMockInvoices, generateMockTransactions } from './mockData';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
const USE_MOCK_DATA = true;

export const billingApi = {
  async getBillingData(filters?: BillingFilters): Promise<ApiResponse<BillingState>> {
    if (USE_MOCK_DATA) {
      const invoices = generateMockInvoices();
      return {
        success: true,
        data: {
          invoices,
          stats: generateMockBillingStats(invoices),
          filters: filters || {},
          isLoading: false,
          error: null,
        },
      };
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/billing`, { params: filters });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch billing data');
    }
  },

  async createInvoice(data: Omit<Invoice, 'id' | 'createdAt'>): Promise<ApiResponse<Invoice>> {
    if (USE_MOCK_DATA) {
      return {
        success: true,
        data: {
          ...data,
          id: `inv-${Date.now()}`,
          createdAt: new Date().toISOString(),
        },
      };
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/billing/invoices`, data);
      return response.data;
    } catch (error) {
      throw new Error('Failed to create invoice');
    }
  },

  async getTransactions(): Promise<ApiResponse<Transaction[]>> {
    if (USE_MOCK_DATA) {
      return {
        success: true,
        data: generateMockTransactions(),
      };
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/billing/transactions`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch transactions');
    }
  },

  async downloadInvoice(invoiceId: string): Promise<Blob> {
    if (USE_MOCK_DATA) {
      const mockInvoice = generateMockInvoices(1)[0];
      const content = `Invoice #${mockInvoice.invoiceNumber}\nAmount: ₹${mockInvoice.amount}\nStatus: ${mockInvoice.status}`;
      return new Blob([content], { type: 'text/plain' });
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/billing/invoices/${invoiceId}/download`, {
        responseType: 'blob',
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to download invoice');
    }
  },
};
