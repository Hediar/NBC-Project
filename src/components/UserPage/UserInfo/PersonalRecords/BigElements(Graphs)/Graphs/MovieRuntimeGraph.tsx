'use client';

import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import trimArrayToLength from '@/util/tripArrayToLength';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  indexAxis: 'y' as const,
  elements: {
    bar: {
      borderWidth: 2
    }
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom' as const
    }
  }
};

type Props = {
  titles: string[];
  runtimes: number[];
};

const MovieRuntimeGraph = ({ titles, runtimes }: Props) => {
  const clonedTitles = structuredClone(titles);
  const clonedRuntimes = structuredClone(runtimes);
  trimArrayToLength(clonedTitles, 5);
  trimArrayToLength(clonedRuntimes, 5);

  const data = {
    labels: clonedTitles,
    datasets: [
      {
        label: '관람 시간(hour)',
        data: clonedRuntimes,
        backgroundColor: [
          'rgba(111, 165, 252, 0.5)',
          'rgba(255, 99, 132, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(56, 198, 143, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(255, 159, 64, 0.5)',
          '#13b3cf80',
          '#bb3b7680',
          '#dbc07180'
        ],
        borderColor: [
          'rgba(111, 165, 252, 1)',
          'rgba(240, 116, 63, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(56, 198, 143, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 159, 64, 1)',
          '#13b3cf',
          '#bb3b76',
          '#dbc071'
        ],
        borderWidth: 1,
        barThickness: 10,
        categorySpacing: 20
      }
    ]
  };

  return <Bar data={data} options={options} />;
};

export default MovieRuntimeGraph;
