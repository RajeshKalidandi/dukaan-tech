import { useState, useEffect, useCallback } from 'react';
import { DashboardState, TimeRange, FilterChangeEvent } from '../types';
import { dashboardApi } from '../api/dashboardApi';

export function useDashboard(initialTimeRange: TimeRange = '7d') {
  const [state, setState] = useState<DashboardState>({
    stats: [],
    salesData: { labels: [], datasets: [] },
    categoryData: { labels: [], datasets: [] },
    recentOrders: [],
    isLoading: true,
    error: null,
  });

  const [timeRange, setTimeRange] = useState<TimeRange>(initialTimeRange);
  const [filters, setFilters] = useState<FilterChangeEvent>({});
  const [isExporting, setIsExporting] = useState(false);
  const [realtimeMetrics, setRealtimeMetrics] = useState({
    activeUsers: 0,
    salesToday: 0,
    pendingOrders: 0,
  });

  const fetchDashboardData = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const response = await dashboardApi.getDashboardData(timeRange, filters);
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
  }, [timeRange, filters]);

  const fetchRealtimeMetrics = useCallback(async () => {
    try {
      const response = await dashboardApi.getRealtimeMetrics();
      setRealtimeMetrics(response.data);
    } catch (error) {
      console.error('Failed to fetch realtime metrics:', error);
    }
  }, []);

  const exportDashboard = async (format: 'csv' | 'pdf') => {
    setIsExporting(true);
    try {
      const blob = await dashboardApi.exportDashboardData(timeRange, format);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `dashboard-${timeRange}.${format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Failed to export dashboard:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const updateFilters = (newFilters: FilterChangeEvent) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // Fetch realtime metrics every 30 seconds
  useEffect(() => {
    fetchRealtimeMetrics();
    const interval = setInterval(fetchRealtimeMetrics, 30000);
    return () => clearInterval(interval);
  }, [fetchRealtimeMetrics]);

  return {
    state,
    timeRange,
    setTimeRange,
    filters,
    updateFilters,
    isExporting,
    exportDashboard,
    realtimeMetrics,
  };
}
