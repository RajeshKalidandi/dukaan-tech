import { IconType } from 'react-icons';

export type TimeRange = '24h' | '7d' | '30d' | '90d';

export type ChangeType = 'increase' | 'decrease';

export interface StatCard {
  id: number;
  name: string;
  stat: string;
  icon: IconType;
  change: string;
  changeType: ChangeType;
}

export interface SalesDataPoint {
  date: string;
  value: number;
}

export interface CategorySalesData {
  category: string;
  value: number;
}

export interface ChartDataset {
  label: string;
  data: number[];
  fill?: boolean;
  borderColor?: string;
  backgroundColor?: string | string[];
  tension?: number;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderWidth?: number;
  }[];
}

export interface OrderStatus {
  id: number;
  customer: string;
  amount: string;
  status: 'Completed' | 'Processing' | 'Pending';
  date: string;
}

export interface DashboardProps {
  initialTimeRange?: TimeRange;
  onTimeRangeChange?: (range: TimeRange) => void;
}

export interface DashboardState {
  stats: StatCard[];
  salesData: ChartData;
  categoryData: ChartData;
  recentOrders: OrderStatus[];
  isLoading: boolean;
  error: string | null;
}

export interface DashboardFilters {
  timeRange: TimeRange;
  category?: string;
  status?: OrderStatus['status'];
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

export interface SalesMetrics {
  totalRevenue: number;
  totalOrders: number;
  newCustomers: number;
  averageOrderValue: number;
  revenueGrowth: string;
  ordersGrowth: string;
  customersGrowth: string;
  avgOrderGrowth: string;
}

export interface TopProducts {
  id: number;
  name: string;
  sales: number;
  revenue: number;
  growth: string;
}

export interface CustomerMetrics {
  totalCustomers: number;
  activeCustomers: number;
  repeatCustomers: number;
  averageLifetimeValue: number;
}

// Theme and Styling Types
export interface ChartTheme {
  backgroundColor: string[];
  borderColor: string[];
  pointBackgroundColor: string[];
  pointBorderColor: string[];
}

export interface StatusTheme {
  Completed: {
    bg: string;
    text: string;
  };
  Processing: {
    bg: string;
    text: string;
  };
  Pending: {
    bg: string;
    text: string;
  };
}

// Utility Types
export type DateRange = {
  startDate: Date;
  endDate: Date;
};

export type SortOrder = 'asc' | 'desc';

export interface SortConfig {
  field: keyof OrderStatus;
  order: SortOrder;
}

export interface PaginationConfig {
  page: number;
  limit: number;
  total: number;
}

// Event Handler Types
export interface ChartClickEvent {
  datasetIndex: number;
  index: number;
  value: number;
  label: string;
}

export type ChartClickHandler = (event: ChartClickEvent) => void;

export interface FilterChangeEvent {
  timeRange?: TimeRange;
  category?: string;
  status?: OrderStatus['status'];
}

export type FilterChangeHandler = (event: FilterChangeEvent) => void;

// Notification Types
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'warning' | 'error' | 'info';
  timestamp: string;
  read: boolean;
}

export interface NotificationsProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
}

// Sales Map Types
export interface RegionalSalesData {
  region: string;
  sales: number;
  growth: string;
}

export interface SalesMapProps {
  data: RegionalSalesData[];
  isLoading: boolean;
}

// Top Products Types
export interface TopProductsProps {
  products: TopProducts[];
  isLoading: boolean;
}

// New types for dashboard components
export interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  totalProducts: number;
  revenueGrowth: number;
  ordersGrowth: number;
}

export interface TopProduct {
  id: string;
  name: string;
  revenue: number;
  quantity: number;
  growth: number;
  image?: string;
}

export interface SalesLocation {
  city: string;
  state: string;
  revenue: number;
  orders: number;
  coordinates: [number, number];
}
