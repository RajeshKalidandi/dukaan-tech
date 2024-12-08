import { useState, useCallback } from 'react';
import { InventoryState, ProductFormData, InventoryFilters, Product } from '../types';
import { inventoryApi } from '../api/inventoryApi';

const initialState: InventoryState = {
  products: [],
  stats: {
    totalProducts: 0,
    lowStockProducts: 0,
    outOfStockProducts: 0,
    totalValue: 0,
  },
  filters: {},
  isLoading: false,
  error: null,
};

export function useInventory() {
  const [state, setState] = useState<InventoryState>(initialState);
  const [isExporting, setIsExporting] = useState(false);

  const fetchInventoryData = useCallback(async (filters?: InventoryFilters) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const response = await inventoryApi.getInventoryData(filters);
      setState(prev => ({
        ...prev,
        ...response.data,
        isLoading: false,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'An error occurred',
      }));
    }
  }, []);

  const addProduct = async (product: ProductFormData) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const response = await inventoryApi.addProduct(product);
      setState(prev => ({
        ...prev,
        products: [...prev.products, response.data],
        isLoading: false,
      }));
      return response.data;
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'An error occurred',
      }));
      throw error;
    }
  };

  const updateProduct = async (id: number, product: Partial<ProductFormData>) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const response = await inventoryApi.updateProduct(id, product);
      setState(prev => ({
        ...prev,
        products: prev.products.map(p => (p.id === id ? response.data : p)),
        isLoading: false,
      }));
      return response.data;
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'An error occurred',
      }));
      throw error;
    }
  };

  const deleteProduct = async (id: number) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      await inventoryApi.deleteProduct(id);
      setState(prev => ({
        ...prev,
        products: prev.products.filter(p => p.id !== id),
        isLoading: false,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'An error occurred',
      }));
      throw error;
    }
  };

  const updateStock = async (id: number, quantity: number) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const response = await inventoryApi.updateStock(id, quantity);
      setState(prev => ({
        ...prev,
        products: prev.products.map(p => (p.id === id ? response.data : p)),
        isLoading: false,
      }));
      return response.data;
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'An error occurred',
      }));
      throw error;
    }
  };

  const exportInventory = async (format: 'csv' | 'pdf') => {
    setIsExporting(true);
    try {
      const blob = await inventoryApi.exportInventory(format);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `inventory-${new Date().toISOString()}.${format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Failed to export inventory:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const updateFilters = (newFilters: InventoryFilters) => {
    setState(prev => ({
      ...prev,
      filters: { ...prev.filters, ...newFilters },
    }));
    fetchInventoryData(newFilters);
  };

  return {
    state,
    isExporting,
    addProduct,
    updateProduct,
    deleteProduct,
    updateStock,
    exportInventory,
    updateFilters,
  };
}
