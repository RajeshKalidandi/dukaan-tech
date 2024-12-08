export interface Invoice {
  id: string;
  invoiceNumber: string;
  customerName: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  dueDate: string;
  createdAt: string;
}

export interface BillingStats {
  totalRevenue: number;
  pendingAmount: number;
  overdueAmount: number;
  paidInvoices: number;
  pendingInvoices: number;
  overdueInvoices: number;
}

export interface BillingFilters {
  status?: Invoice['status'];
  startDate?: string;
  endDate?: string;
  search?: string;
}

export interface BillingState {
  invoices: Invoice[];
  stats: BillingStats;
  filters: BillingFilters;
  isLoading: boolean;
  error: string | null;
}

export interface PaymentMethod {
  id: string;
  type: 'credit_card' | 'debit_card' | 'upi' | 'bank_transfer';
  lastFourDigits?: string;
  expiryDate?: string;
  isDefault: boolean;
}

export interface Transaction {
  id: string;
  invoiceId: string;
  amount: number;
  paymentMethod: string;
  status: 'success' | 'failed' | 'pending';
  date: string;
}
