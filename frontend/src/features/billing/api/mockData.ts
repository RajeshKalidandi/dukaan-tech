import { Invoice, BillingStats, Transaction } from '../types';

export const generateMockInvoices = (count: number = 10): Invoice[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `inv-${i + 1}`,
    invoiceNumber: `INV-${2024}${String(i + 1).padStart(4, '0')}`,
    customerName: `Customer ${i + 1}`,
    amount: Math.floor(Math.random() * 100000) + 1000,
    status: ['paid', 'pending', 'overdue'][Math.floor(Math.random() * 3)] as Invoice['status'],
    dueDate: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000).toISOString(),
  }));
};

export const generateMockBillingStats = (invoices: Invoice[]): BillingStats => {
  const stats = invoices.reduce(
    (acc, invoice) => {
      acc.totalRevenue += invoice.amount;
      if (invoice.status === 'pending') {
        acc.pendingAmount += invoice.amount;
        acc.pendingInvoices++;
      } else if (invoice.status === 'overdue') {
        acc.overdueAmount += invoice.amount;
        acc.overdueInvoices++;
      } else if (invoice.status === 'paid') {
        acc.paidInvoices++;
      }
      return acc;
    },
    {
      totalRevenue: 0,
      pendingAmount: 0,
      overdueAmount: 0,
      paidInvoices: 0,
      pendingInvoices: 0,
      overdueInvoices: 0,
    }
  );

  return stats;
};

export const generateMockTransactions = (count: number = 10): Transaction[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `txn-${i + 1}`,
    invoiceId: `inv-${Math.floor(Math.random() * 10) + 1}`,
    amount: Math.floor(Math.random() * 100000) + 1000,
    paymentMethod: ['credit_card', 'debit_card', 'upi', 'bank_transfer'][
      Math.floor(Math.random() * 4)
    ],
    status: ['success', 'failed', 'pending'][Math.floor(Math.random() * 3)] as Transaction['status'],
    date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
  }));
};
