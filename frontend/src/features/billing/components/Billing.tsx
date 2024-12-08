import React, { useState, useEffect } from 'react';
import { BillingStats } from './BillingStats';
import { InvoiceList } from './InvoiceList';
import { billingApi } from '../api/billingApi';
import { BillingState, BillingFilters } from '../types';
import { DocumentPlusIcon } from '@heroicons/react/24/outline';
import { Card } from '../../../components/common/Card';

export const Billing: React.FC = () => {
  const [billingData, setBillingData] = useState<BillingState>({
    invoices: [],
    stats: {
      totalRevenue: 0,
      pendingAmount: 0,
      overdueAmount: 0,
      paidInvoices: 0,
      pendingInvoices: 0,
      overdueInvoices: 0,
    },
    filters: {},
    isLoading: true,
    error: null,
  });

  const [filters, setFilters] = useState<BillingFilters>({});

  useEffect(() => {
    fetchBillingData();
  }, [filters]);

  const fetchBillingData = async () => {
    try {
      const response = await billingApi.getBillingData(filters);
      setBillingData(response.data);
    } catch (error) {
      setBillingData((prev) => ({
        ...prev,
        error: 'Failed to fetch billing data',
        isLoading: false,
      }));
    }
  };

  const handleDownload = async (invoiceId: string) => {
    try {
      const blob = await billingApi.downloadInvoice(invoiceId);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `invoice-${invoiceId}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Failed to download invoice:', error);
    }
  };

  if (billingData.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 dark:border-indigo-400"></div>
      </div>
    );
  }

  if (billingData.error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600 dark:text-red-400">Error: {billingData.error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Billing</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            View and manage your invoices, payments, and billing statistics.
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 transition-colors duration-200"
        >
          <DocumentPlusIcon className="h-5 w-5 mr-2" />
          Create Invoice
        </button>
      </div>

      <Card className="p-6">
        <BillingStats stats={billingData.stats} />
      </Card>

      <Card className="p-6">
        <InvoiceList invoices={billingData.invoices} onDownload={handleDownload} />
      </Card>
    </div>
  );
};
