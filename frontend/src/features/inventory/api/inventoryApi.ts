import axios from 'axios';
import { ApiResponse, Product, InventoryState, ProductFormData, InventoryFilters } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const inventoryApi = {
  async getInventoryData(filters?: InventoryFilters): Promise<ApiResponse<InventoryState>> {
    try {
      const response = await axios.get(`${API_BASE_URL}/inventory`, {
        params: filters,
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch inventory data');
    }
  },

  async addProduct(product: ProductFormData): Promise<ApiResponse<Product>> {
    try {
      const response = await axios.post(`${API_BASE_URL}/inventory/products`, product);
      return response.data;
    } catch (error) {
      throw new Error('Failed to add product');
    }
  },

  async updateProduct(id: number, product: Partial<ProductFormData>): Promise<ApiResponse<Product>> {
    try {
      const response = await axios.patch(`${API_BASE_URL}/inventory/products/${id}`, product);
      return response.data;
    } catch (error) {
      throw new Error('Failed to update product');
    }
  },

  async deleteProduct(id: number): Promise<ApiResponse<void>> {
    try {
      const response = await axios.delete(`${API_BASE_URL}/inventory/products/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to delete product');
    }
  },

  async updateStock(id: number, quantity: number): Promise<ApiResponse<Product>> {
    try {
      const response = await axios.patch(`${API_BASE_URL}/inventory/products/${id}/stock`, {
        quantity,
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to update stock');
    }
  },

  async exportInventory(format: 'csv' | 'pdf'): Promise<Blob> {
    try {
      const response = await axios.get(`${API_BASE_URL}/inventory/export`, {
        params: { format },
        responseType: 'blob',
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to export inventory data');
    }
  },
};
