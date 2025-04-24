import React from 'react';
import styles from './LineChart.module.css';

const LineChart = ({ data }) => {
  if (!data || data.length === 0) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min;
  const normalizedData = range > 0 
    ? data.map(value => ((value - min) / range) * 50 + 25)
    : Array(data.length).fill(50);

  const points = normalizedData.map((value, index) => {
    const x = (index / (normalizedData.length - 1)) * 100;
    return `${x},${100 - value}`;
  }).join(' ');

  const isPositive = data[data.length - 1] >= data[0];
  const strokeColor = isPositive ? '#16c784' : '#ea3943';

  return (
    <svg viewBox="0 0 100 100" className={styles.chart}>
      <polyline
        fill="none"
        stroke={strokeColor}
        strokeWidth="2"
        points={points}
      />
    </svg>
  );
};

export default LineChart;