import { Customer, CustomerStats, CustomerActivity } from '../types';

export const generateMockCustomers = (count: number = 10): Customer[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `cust-${i + 1}`,
    name: `Customer ${i + 1}`,
    email: `customer${i + 1}@example.com`,
    phone: `+91${Math.floor(Math.random() * 9000000000) + 1000000000}`,
    totalOrders: Math.floor(Math.random() * 50) + 1,
    totalSpent: Math.floor(Math.random() * 100000) + 1000,
    lastOrderDate: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
    status: Math.random() > 0.2 ? 'active' : 'inactive',
    address: {
      street: `${Math.floor(Math.random() * 100) + 1} Main Street`,
      city: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata'][Math.floor(Math.random() * 5)],
      state: ['Maharashtra', 'Delhi', 'Karnataka', 'Tamil Nadu', 'West Bengal'][Math.floor(Math.random() * 5)],
      country: 'India',
      zipCode: String(Math.floor(Math.random() * 900000) + 100000),
    },
  }));
};

export const generateMockCustomerStats = (customers: Customer[]): CustomerStats => {
  const activeCustomers = customers.filter((c) => c.status === 'active').length;
  const totalSpent = customers.reduce((sum, c) => sum + c.totalSpent, 0);
  const totalOrders = customers.reduce((sum, c) => sum + c.totalOrders, 0);

  return {
    totalCustomers: customers.length,
    activeCustomers,
    averageOrderValue: totalOrders > 0 ? totalSpent / totalOrders : 0,
    customerRetentionRate: (activeCustomers / customers.length) * 100,
  };
};

export const generateMockCustomerActivities = (customerId: string, count: number = 5): CustomerActivity[] => {
  const activityTypes: CustomerActivity['type'][] = ['order', 'support', 'review', 'refund'];
  const descriptions = {
    order: 'Placed an order',
    support: 'Contacted customer support',
    review: 'Left a product review',
    refund: 'Requested a refund',
  };

  return Array.from({ length: count }, (_, i) => {
    const type = activityTypes[Math.floor(Math.random() * activityTypes.length)];
    return {
      id: `act-${customerId}-${i + 1}`,
      customerId,
      type,
      description: descriptions[type],
      date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      metadata: type === 'order'
        ? { orderId: `ord-${Math.floor(Math.random() * 1000)}`, amount: Math.floor(Math.random() * 10000) + 100 }
        : undefined,
    };
  });
};
