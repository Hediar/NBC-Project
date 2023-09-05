'use client';

import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
  titles: string[];
  runtimes: number[];
};

const MovieRuntimeGraph = ({ titles, runtimes }: Props) => {
  const data = {
    labels: titles,
    datasets: [
      {
        label: '관람 시간(hour)',
        data: runtimes,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  return (
    <div className="flex flex-col justify-center items-center gap-3 bg-gray-100 w-2/3 h-full rounded-2xl p-8">
      <Doughnut data={data} />
    </div>
  );
};

export default MovieRuntimeGraph;
