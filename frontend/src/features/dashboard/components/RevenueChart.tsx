import { useEffect, useRef } from 'react';
import { Chart, ChartConfiguration } from 'chart.js';
import { ChartData } from '../types';

interface RevenueChartProps {
  data: ChartData;
  isLoading: boolean;
  timeRange: string;
}

export default function RevenueChart({ data, isLoading, timeRange }: RevenueChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!canvasRef.current || isLoading) return;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    const gradientFill = ctx.createLinearGradient(0, 0, 0, 400);
    gradientFill.addColorStop(0, 'rgba(59, 130, 246, 0.2)');
    gradientFill.addColorStop(1, 'rgba(59, 130, 246, 0)');

    const config: ChartConfiguration = {
      type: 'line',
      data: {
        ...data,
        datasets: data.datasets.map(dataset => ({
          ...dataset,
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: gradientFill,
          tension: 0.4,
          fill: true,
          pointBackgroundColor: 'rgb(59, 130, 246)',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
        })),
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          intersect: false,
          mode: 'index',
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: 'rgb(17, 24, 39)',
            titleColor: 'rgb(243, 244, 246)',
            bodyColor: 'rgb(243, 244, 246)',
            padding: 12,
            borderColor: 'rgb(75, 85, 99)',
            borderWidth: 1,
            displayColors: false,
            callbacks: {
              label: (context) => `₹${context.parsed.y.toLocaleString()}`,
            },
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              font: {
                size: 12,
              },
              color: 'rgb(107, 114, 128)',
            },
          },
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.05)',
            },
            ticks: {
              font: {
                size: 12,
              },
              color: 'rgb(107, 114, 128)',
              callback: (value) => `₹${value.toLocaleString()}`,
            },
          },
        },
      },
    };

    chartRef.current = new Chart(ctx, config);

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
        <div className="h-[400px] bg-gray-200 rounded"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">Revenue Overview</h3>
        <p className="text-sm text-gray-500">Last {timeRange}</p>
      </div>
      <div className="h-[400px]">
        <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  );
}
