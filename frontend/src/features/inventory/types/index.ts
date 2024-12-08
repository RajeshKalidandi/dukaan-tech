export interface Product {
  id: number;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  minStock: number;
  supplier: string;
  lastUpdated: string;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

export interface InventoryFilters {
  search?: string;
  category?: string;
  status?: Product['status'];
  supplier?: string;
}

export interface ProductFormData extends Omit<Product, 'id' | 'lastUpdated' | 'status'> {}

export interface InventoryStats {
  totalProducts: number;
  lowStockProducts: number;
  outOfStockProducts: number;
  totalValue: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

export interface InventoryState {
  products: Product[];
  stats: InventoryStats;
  filters: InventoryFilters;
  isLoading: boolean;
  error: string | null;
}

export interface Category {
  id: number;
  name: string;
  productCount: number;
}

export interface Supplier {
  id: number;
  name: string;
  productCount: number;
  reliability: number;
}
