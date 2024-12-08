import { useEffect, useRef } from 'react';
import { Chart } from 'chart.js';
import { SalesMapProps } from '../types';

export default function SalesMap({ data, isLoading }: SalesMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!canvasRef.current || isLoading) return;

    // Clean up previous chart
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    // Create new chart
    chartRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.map(item => item.region),
        datasets: [
          {
            label: 'Sales by Region',
            data: data.map(item => item.sales),
            backgroundColor: 'rgba(59, 130, 246, 0.5)',
            borderColor: 'rgb(59, 130, 246)',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const dataIndex = context.dataIndex;
                const growth = data[dataIndex].growth;
                return [
                  `Sales: ₹${context.parsed.y.toLocaleString()}`,
                  `Growth: ${growth}`
                ];
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.05)'
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      }
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [data, isLoading]);

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 w-1/4 bg-gray-200 rounded mb-4"></div>
        <div className="h-64 bg-gray-200 rounded"></div>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Sales by Region</h3>
      <div className="h-64">
        <canvas ref={canvasRef}></canvas>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {data.map((item) => (
          <div key={item.region} className="rounded-lg bg-white p-4 text-center shadow">
            <dt className="truncate text-sm font-medium text-gray-500">{item.region}</dt>
            <dd className="mt-1 text-lg font-semibold text-gray-900">₹{item.sales.toLocaleString()}</dd>
            <dd className={`mt-1 text-sm font-medium ${
              item.growth.startsWith('-') ? 'text-red-600' : 'text-green-600'
            }`}>
              {item.growth}
            </dd>
          </div>
        ))}
      </div>
    </div>
  );
}
