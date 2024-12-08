export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
  status: 'active' | 'inactive';
  address?: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
}

export interface CustomerStats {
  totalCustomers: number;
  activeCustomers: number;
  averageOrderValue: number;
  customerRetentionRate: number;
}

export interface CustomerFilters {
  search?: string;
  status?: Customer['status'];
  sortBy?: 'name' | 'totalOrders' | 'totalSpent' | 'lastOrderDate';
  sortOrder?: 'asc' | 'desc';
}

export interface CRMState {
  customers: Customer[];
  stats: CustomerStats;
  filters: CustomerFilters;
  isLoading: boolean;
  error: string | null;
}

export interface CustomerActivity {
  id: string;
  customerId: string;
  type: 'order' | 'support' | 'review' | 'refund';
  description: string;
  date: string;
  metadata?: Record<string, any>;
}
