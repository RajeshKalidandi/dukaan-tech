import { TopProduct } from '../types';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/20/solid';
import { useMemo } from 'react';

interface TopProductsProps {
  products: TopProduct[];
  isLoading: boolean;
}

export default function TopProducts({ products, isLoading }: TopProductsProps) {
  const sortedProducts = useMemo(() => 
    [...products].sort((a, b) => b.revenue - a.revenue).slice(0, 5),
    [products]
  );

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-6 animate-pulse">
        <div className="h-6 w-1/3 bg-gray-200 rounded mb-6"></div>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="mb-4 last:mb-0">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-gray-200 rounded"></div>
              <div className="flex-1">
                <div className="h-4 w-1/3 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 w-1/4 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-6">Top Products</h3>
      <div className="space-y-4">
        {sortedProducts.map((product) => (
          <div key={product.id} className="flex items-center gap-4">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="h-12 w-12 rounded object-cover"
              />
            ) : (
              <div className="h-12 w-12 rounded bg-gray-100 flex items-center justify-center text-gray-400">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            )}
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-900">{product.name}</h4>
                <div className="flex items-center gap-1">
                  {product.growth >= 0 ? (
                    <ArrowUpIcon className="h-4 w-4 text-green-500" />
                  ) : (
                    <ArrowDownIcon className="h-4 w-4 text-red-500" />
                  )}
                  <span
                    className={`text-sm ${
                      product.growth >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {Math.abs(product.growth).toFixed(1)}%
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-sm text-gray-500">
                  {product.quantity} units sold
                </span>
                <span className="text-sm font-medium text-gray-900">
                  ₹{product.revenue.toLocaleString()}
                </span>
              </div>
              <div className="mt-2 w-full bg-gray-100 rounded-full h-1.5">
                <div
                  className="bg-primary-600 h-1.5 rounded-full"
                  style={{
                    width: `${(product.revenue / sortedProducts[0].revenue) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
