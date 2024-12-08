import { CurrencyRupeeIcon, ShoppingBagIcon, ExclamationTriangleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { InventoryStats as InventoryStatsType } from '../types';

interface InventoryStatsProps {
  stats: InventoryStatsType;
}

export default function InventoryStats({ stats }: InventoryStatsProps) {
  const statCards = [
    {
      name: 'Total Products',
      value: stats.totalProducts,
      icon: ShoppingBagIcon,
      iconBackground: 'bg-blue-500',
    },
    {
      name: 'Low Stock Products',
      value: stats.lowStockProducts,
      icon: ExclamationTriangleIcon,
      iconBackground: 'bg-yellow-500',
    },
    {
      name: 'Out of Stock',
      value: stats.outOfStockProducts,
      icon: XCircleIcon,
      iconBackground: 'bg-red-500',
    },
    {
      name: 'Total Value',
      value: `₹${stats.totalValue.toLocaleString()}`,
      icon: CurrencyRupeeIcon,
      iconBackground: 'bg-green-500',
    },
  ];

  return (
    <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {statCards.map((card) => (
        <div
          key={card.name}
          className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6"
        >
          <dt>
            <div className={`absolute rounded-md ${card.iconBackground} p-3`}>
              <card.icon className="h-6 w-6 text-white" aria-hidden="true" />
            </div>
            <p className="ml-16 truncate text-sm font-medium text-gray-500">{card.name}</p>
          </dt>
          <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
            <p className="text-2xl font-semibold text-gray-900">{card.value}</p>
          </dd>
        </div>
      ))}
    </div>
  );
}
