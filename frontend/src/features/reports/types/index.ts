export type TimeRange = '24h' | '7d' | '30d' | '90d';

export interface SalesReport {
  totalSales: number;
  averageOrderValue: number;
  totalOrders: number;
  salesGrowth: number;
  timeSeriesData: {
    date: string;
    sales: number;
    orders: number;
  }[];
}

export interface InventoryReport {
  totalProducts: number;
  lowStockItems: number;
  outOfStockItems: number;
  topCategories: {
    name: string;
    productCount: number;
    value: number;
  }[];
}

export interface CustomerReport {
  newCustomers: number;
  totalCustomers: number;
  customerGrowth: number;
  customerRetention: number;
  customerSegments: {
    name: string;
    count: number;
    percentage: number;
  }[];
}

export interface RevenueByChannel {
  channel: string;
  revenue: number;
  percentage: number;
  growth: number;
}

export interface ReportFilters {
  timeRange: TimeRange;
  startDate?: string;
  endDate?: string;
}

export interface ReportsState {
  sales: SalesReport;
  inventory: InventoryReport;
  customers: CustomerReport;
  revenueByChannel: RevenueByChannel[];
  filters: ReportFilters;
  isLoading: boolean;
  error: string | null;
}
