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
        borderWidth: 1
      }
    ]
  };

  return <Doughnut data={data} />;
};

export default MovieRuntimeGraph;
